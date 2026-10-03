import { autoColor, shade } from './palette';
import { Cluster, Family, FamilyRule, GraphData, KIND_NOTE, KIND_UNRESOLVED, RawVault } from './types';

export interface BuildOptions {
  rules: FamilyRule[];
  showUnresolved: boolean;
  showOrphans: boolean;
  hideFiles: string[];
}

const MEGA_DEG = 60; // index.md / log.md style hubs: they touch everything and drown the layout
const MAX_MICRO_PER_NOTE = 36;
const SPLIT_FAMILY_OVER = 35; // big folders split into sub-clusters by 2nd path segment

function matchRule(path: string, rules: FamilyRule[]): FamilyRule | null {
  let best: FamilyRule | null = null;
  for (const r of rules) {
    if (r.prefix === '*') continue;
    if (path === r.prefix || path.startsWith(r.prefix + '/')) {
      if (!best || r.prefix.length > best.prefix.length) best = r;
    }
  }
  return best;
}

function baseName(path: string): string {
  const f = path.slice(path.lastIndexOf('/') + 1);
  return f.replace(/\.md$/i, '');
}

export function buildGraph(raw: RawVault, o: BuildOptions): GraphData {
  const hidden = new Set(o.hideFiles);
  const ids: string[] = [];
  const kinds: number[] = [];
  const idx = new Map<string, number>();
  const fileByPath = new Map(raw.files.map((f) => [f.path, f]));

  for (const f of raw.files) {
    if (hidden.has(f.path)) continue;
    idx.set(f.path, ids.length);
    ids.push(f.path);
    kinds.push(KIND_NOTE);
  }
  const addUnresolved = (name: string): number => {
    const id = '?' + name;
    let i = idx.get(id);
    if (i === undefined) {
      i = ids.length;
      idx.set(id, i);
      ids.push(id);
      kinds.push(KIND_UNRESOLVED);
    }
    return i;
  };

  // undirected edge map, direction of first sighting
  const emap = new Map<number, { s: number; t: number; w: number; bi: boolean }>();
  const addEdge = (a: number, b: number, w: number) => {
    if (a === b) return;
    const lo = Math.min(a, b), hi = Math.max(a, b);
    const key = lo * 1_000_003 + hi;
    const ex = emap.get(key);
    if (!ex) emap.set(key, { s: a, t: b, w, bi: false });
    else {
      ex.w += w;
      if (ex.s !== a) ex.bi = true;
    }
  };
  for (const [src, o2] of Object.entries(raw.resolved)) {
    const a = idx.get(src);
    if (a === undefined) continue;
    for (const [dst, c] of Object.entries(o2)) {
      const b = idx.get(dst);
      if (b !== undefined) addEdge(a, b, c);
    }
  }
  if (o.showUnresolved) {
    for (const [src, o2] of Object.entries(raw.unresolved)) {
      const a = idx.get(src);
      if (a === undefined) continue;
      for (const [name, c] of Object.entries(o2)) addEdge(a, addUnresolved(name), c);
    }
  }

  // orphan filtering → reindex
  let keep: number[] = ids.map((_, i) => i);
  if (!o.showOrphans) {
    const has = new Uint8Array(ids.length);
    for (const e of emap.values()) { has[e.s] = 1; has[e.t] = 1; }
    keep = keep.filter((i) => has[i]);
  }
  const remap = new Int32Array(ids.length).fill(-1);
  keep.forEach((old, i) => (remap[old] = i));
  const n = keep.length;
  const nid = keep.map((i) => ids[i]);
  const nkind = Uint8Array.from(keep.map((i) => kinds[i]));

  const edges = [...emap.values()].filter((e) => remap[e.s] >= 0 && remap[e.t] >= 0);
  const e = edges.length;
  const eSrc = new Uint32Array(e), eDst = new Uint32Array(e), eBi = new Uint8Array(e), eWeight = new Float32Array(e);
  const degree = new Uint16Array(n), inDegree = new Uint16Array(n);
  edges.forEach((ed, i) => {
    eSrc[i] = remap[ed.s];
    eDst[i] = remap[ed.t];
    eBi[i] = ed.bi ? 1 : 0;
    eWeight[i] = 1 + Math.log1p(ed.w - 1) * 0.6;
    degree[eSrc[i]]++; degree[eDst[i]]++;
    inDegree[eDst[i]]++;
    if (ed.bi) inDegree[eSrc[i]]++;
  });

  // CSR adjacency
  const adjStart = new Uint32Array(n + 1);
  for (let i = 0; i < e; i++) { adjStart[eSrc[i] + 1]++; adjStart[eDst[i] + 1]++; }
  for (let i = 0; i < n; i++) adjStart[i + 1] += adjStart[i];
  const fill = adjStart.slice(0, n);
  const adjNode = new Uint32Array(e * 2), adjEdge = new Uint32Array(e * 2);
  for (let i = 0; i < e; i++) {
    const a = eSrc[i], b = eDst[i];
    adjNode[fill[a]] = b; adjEdge[fill[a]++] = i;
    adjNode[fill[b]] = a; adjEdge[fill[b]++] = i;
  }

  // families & clusters
  const topSeg = (p: string) => (p.includes('/') ? p.slice(0, p.indexOf('/')) : null);
  const clusterKeyRaw: string[] = new Array(n);
  const topCount = new Map<string, number>();
  for (let i = 0; i < n; i++) {
    const id = nid[i];
    if (nkind[i] === KIND_UNRESOLVED) { clusterKeyRaw[i] = 'unresolved'; continue; }
    const t = topSeg(id);
    if (!t) { clusterKeyRaw[i] = 'core'; continue; }
    const key = id.startsWith('wiki/') ? id.split('/').slice(0, 2).join('/') : t;
    clusterKeyRaw[i] = key;
    topCount.set(key, (topCount.get(key) ?? 0) + 1);
  }
  for (let i = 0; i < n; i++) {
    const key = clusterKeyRaw[i];
    if ((topCount.get(key) ?? 0) > SPLIT_FAMILY_OVER && !key.includes('/')) {
      const parts = nid[i].split('/');
      if (parts.length > 2) clusterKeyRaw[i] = parts[0] + '/' + parts[1];
    }
  }

  const families: Family[] = [];
  const famIndex = new Map<string, number>();
  const familyOf = (i: number): number => {
    const id = nid[i];
    let key: string, color: string;
    if (nkind[i] === KIND_UNRESOLVED) { key = 'unresolved'; color = '#6f7fa3'; }
    else {
      const r = matchRule(id, o.rules);
      if (r) { key = r.prefix; color = r.color; }
      else {
        const t = topSeg(id);
        if (!t) {
          const star = o.rules.find((x) => x.prefix === '*');
          key = '*'; color = star?.color ?? '#cfe0ff';
        } else { key = t; color = autoColor(t); }
      }
    }
    let fi = famIndex.get(key);
    if (fi === undefined) { fi = families.length; famIndex.set(key, fi); families.push({ key, color }); }
    return fi;
  };
  const family = new Uint16Array(n);
  for (let i = 0; i < n; i++) family[i] = familyOf(i);

  const clusterIndex = new Map<string, number>();
  const clusters: Cluster[] = [];
  const cluster = new Uint16Array(n);
  for (let i = 0; i < n; i++) {
    const key = clusterKeyRaw[i];
    let ci = clusterIndex.get(key);
    if (ci === undefined) {
      ci = clusters.length;
      clusterIndex.set(key, ci);
      clusters.push({ key, label: key.slice(key.lastIndexOf('/') + 1), family: family[i], size: 0, color: families[family[i]].color });
    }
    clusters[ci].size++;
    cluster[i] = ci;
  }
  // shade sub-clusters of one family
  const byFam = new Map<number, number[]>();
  clusters.forEach((c, ci) => { (byFam.get(c.family) ?? byFam.set(c.family, []).get(c.family)!).push(ci); });
  for (const list of byFam.values()) list.forEach((ci, k) => (clusters[ci].color = shade(families[clusters[ci].family].color, k, list.length)));

  // importance / sizing
  const mega = new Uint8Array(n);
  let maxScore = 0;
  const score = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    if (degree[i] > MEGA_DEG) mega[i] = 1;
    score[i] = Math.log1p(inDegree[i] + 0.5 * (degree[i] - inDegree[i]));
    if (!mega[i] && score[i] > maxScore) maxScore = score[i];
  }
  const importance = new Float32Array(n), radius = new Float32Array(n), microRadius = new Float32Array(n);
  const labels: string[] = new Array(n);
  for (let i = 0; i < n; i++) {
    importance[i] = mega[i] ? 0.6 : Math.min(1, Math.pow(score[i] / (maxScore || 1), 0.9));
    labels[i] = nkind[i] === KIND_UNRESOLVED ? nid[i].slice(1) : baseName(nid[i]);
    radius[i] = nkind[i] === KIND_UNRESOLVED ? 0.95 : 1.25 + 2.7 * importance[i];
  }

  // accents: bookmarks + pinned frontmatter + top inbound hubs
  const accent = new Uint8Array(n);
  const bm = new Set(raw.bookmarks ?? []);
  for (let i = 0; i < n; i++) {
    const fm = fileByPath.get(nid[i])?.fm;
    if (bm.has(nid[i]) || fm?.pinned === 'true' || fm?.accent === 'true') accent[i] = 1;
  }
  [...Array(n).keys()]
    .filter((i) => !mega[i] && nkind[i] === KIND_NOTE)
    .sort((a, b) => inDegree[b] - inDegree[a])
    .slice(0, 6)
    .forEach((i) => (accent[i] = 1));

  // heading micro-neurons
  const mParent: number[] = [], mLevel: number[] = [], mText: string[] = [];
  const mCount = new Uint16Array(n);
  for (let i = 0; i < n; i++) {
    if (nkind[i] !== KIND_NOTE) continue;
    const f = fileByPath.get(nid[i]);
    if (!f) continue;
    let c = 0;
    for (const h of f.headings) {
      if (h.l < 2 || !h.h.trim()) continue;
      if (c++ >= MAX_MICRO_PER_NOTE) break;
      mParent.push(i); mLevel.push(h.l); mText.push(h.h.trim());
    }
    mCount[i] = c;
  }
  for (let i = 0; i < n; i++) microRadius[i] = radius[i] * 1.3 + 2.6 + Math.cbrt(mCount[i]);

  return {
    n, ids: nid, labels, kind: nkind, family, cluster, degree, inDegree, importance, accent, radius, microRadius, mega,
    families, clusters, e, eSrc, eDst, eBi, eWeight, adjStart, adjNode, adjEdge,
    m: mParent.length, mParent: Uint32Array.from(mParent), mLevel: Uint8Array.from(mLevel), mText,
  };
}

/** Cheap structural fingerprint: used to skip rebuilds when only note bodies changed. */
export function structureHash(g: GraphData): string {
  let h = 2166136261;
  const mix = (v: number) => { h = Math.imul(h ^ v, 16777619); };
  mix(g.n); mix(g.e); mix(g.m);
  for (let i = 0; i < g.e; i++) { mix(g.eSrc[i]); mix(g.eDst[i]); }
  for (let i = 0; i < g.n; i++) for (let k = 0; k < g.ids[i].length; k++) mix(g.ids[i].charCodeAt(k));
  return (h >>> 0).toString(36);
}
