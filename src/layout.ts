// Layout = two stages. (1) clusters are placed first as bodies sized from their
// members, with real collision, so folders/projects land apart. (2) notes relax
// inside their cluster zone under links, repulsion and collision, then the
// layout is FROZEN and cached. Camera movement never touches these positions.
import { forceCollide, forceLink, forceManyBody, forceSimulation } from 'd3-force-3d';
import type { GraphData } from './types';

export type PosCache = Record<string, [number, number, number]>;

interface SimNode {
  index: number;
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  fx?: number | null; fy?: number | null; fz?: number | null;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

export interface LayoutOptions {
  dim: 2 | 3;
  spread: number; // overall spacing multiplier
  brain: number; // 0..1 pull toward a two-lobed cloud silhouette (3D only)
  useMicro: boolean; // reserve room for the heading halo around each note
}

export class LayoutRun {
  readonly pos: Float32Array;
  done = false;
  progress = 0;
  private sim: any = null;
  private nodes: SimNode[] = [];
  private ticksLeft = 0;
  private totalTicks = 1;
  private incremental = false;

  constructor(private g: GraphData, private o: LayoutOptions, cache?: PosCache) {
    const n = g.n;
    this.pos = new Float32Array(n * 3);
    const dim = o.dim;
    const rnd = mulberry32(0x9e3779b9 ^ n);

    // cached positions ------------------------------------------------------
    const have = new Uint8Array(n);
    let haveCount = 0;
    if (cache) {
      for (let i = 0; i < n; i++) {
        const c = cache[g.ids[i]];
        if (c) {
          this.pos[i * 3] = c[0]; this.pos[i * 3 + 1] = c[1]; this.pos[i * 3 + 2] = dim === 3 ? c[2] : 0;
          have[i] = 1; haveCount++;
        }
      }
    }
    if (haveCount === n) { this.done = true; this.progress = 1; return; }
    this.incremental = haveCount >= n * 0.6;

    // collision radius per node
    const sp = o.spread;
    const cr = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      cr[i] = o.useMicro
        ? (Math.max(g.radius[i] * 1.9, g.microRadius[i] * 0.9) + 1.4) * Math.sqrt(sp)
        : (g.radius[i] * (dim === 2 ? 2.6 : 2.0) + 3) * sp;
    }

    const cl = this.placeClusters(rnd, have, cr);
    const anchors = cl.anchors;

    // node bodies -------------------------------------------------------------
    const nodes: SimNode[] = new Array(n);
    for (let i = 0; i < n; i++) {
      let x: number, y: number, z: number;
      if (this.incremental && have[i]) {
        x = this.pos[i * 3]; y = this.pos[i * 3 + 1]; z = this.pos[i * 3 + 2];
      } else {
        const a = anchors[g.cluster[i]];
        let nx = a[0], ny = a[1], nz = a[2];
        if (this.incremental) {
          let sx = 0, sy = 0, sz = 0, c = 0;
          for (let k = g.adjStart[i]; k < g.adjStart[i + 1]; k++) {
            const nb = g.adjNode[k];
            if (have[nb]) { sx += this.pos[nb * 3]; sy += this.pos[nb * 3 + 1]; sz += this.pos[nb * 3 + 2]; c++; }
          }
          if (c) { nx = sx / c; ny = sy / c; nz = sz / c; }
        }
        const j = this.incremental ? 10 : cl.rad[g.cluster[i]] * 0.6;
        x = nx + (rnd() * 2 - 1) * j; y = ny + (rnd() * 2 - 1) * j; z = dim === 3 ? nz + (rnd() * 2 - 1) * j : 0;
      }
      nodes[i] = { index: i, x, y, z, vx: 0, vy: 0, vz: 0 };
      if (this.incremental && have[i]) { nodes[i].fx = x; nodes[i].fy = y; nodes[i].fz = dim === 3 ? z : 0; }
    }
    this.nodes = nodes;

    // forces -----------------------------------------------------------------
    const links: { source: number; target: number; mega: boolean }[] = [];
    for (let i = 0; i < g.e; i++) {
      const a = g.eSrc[i], b = g.eDst[i];
      links.push({ source: a, target: b, mega: g.mega[a] === 1 || g.mega[b] === 1 });
    }
    const deg = g.degree;
    const linkForce = forceLink(links)
      .id((d: SimNode) => d.index)
      .distance((l: any) => (l.mega ? 90 : 26 + 2.2 * Math.min(6, Math.sqrt(Math.min(deg[l.source.index], deg[l.target.index])))) * sp)
      .strength((l: any) => (l.mega ? 0.015 : 0.5 / Math.min(deg[l.source.index] || 1, deg[l.target.index] || 1)));
    const charge = forceManyBody().strength(-30 * sp).theta(0.92).distanceMax(260 * sp);
    const collide = forceCollide().radius((d: SimNode) => cr[d.index]).strength(0.85).iterations(1);

    const brain = o.brain;
    const R = cl.extent;
    const clusterPull = (alpha: number) => {
      const k = 0.1 * alpha + (dim === 2 ? 0.022 : 0.006); // small steady term: loose nodes fill the body instead of ringing its rim
      for (let i = 0; i < n; i++) {
        const nd = nodes[i];
        if (nd.fx != null) continue;
        const a = anchors[g.cluster[i]];
        nd.vx += (a[0] - nd.x) * k;
        nd.vy += (a[1] - nd.y) * k;
        if (dim === 3) nd.vz += (a[2] - nd.z) * k;
      }
    };
    const contain = () => {
      for (let i = 0; i < n; i++) {
        const nd = nodes[i];
        if (nd.fx != null) continue;
        if (dim === 3) {
          const cx = nd.x < 0 ? -0.26 * R[0] : 0.26 * R[0];
          const qx = (nd.x - cx) / (0.78 * R[0]), qy = nd.y / R[1], qz = nd.z / R[2];
          const d = Math.sqrt(qx * qx + qy * qy + qz * qz);
          if (d > 1) {
            const k = 0.035 * (0.4 + brain) * (d - 1);
            nd.vx += (cx - nd.x) * k; nd.vy -= nd.y * k; nd.vz -= nd.z * k;
          }
        } else {
          const qx = nd.x / R[0], qy = nd.y / R[1];
          const d = Math.sqrt(qx * qx + qy * qy);
          if (d > 1) { const k = 0.04 * (d - 1); nd.vx -= nd.x * k; nd.vy -= nd.y * k; }
        }
      }
    };
    // soft per-cluster capsule: a folder stays a rounded body instead of smearing into a ribbon
    const capsule = () => {
      for (let i = 0; i < n; i++) {
        const nd = nodes[i];
        if (nd.fx != null) continue;
        const c = g.cluster[i], a = anchors[c];
        const dx = nd.x - a[0], dy = nd.y - a[1], dz = dim === 3 ? nd.z - a[2] : 0;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const lim = cl.rad[c] * 1.05;
        if (d > lim) {
          const k = (0.06 * (d - lim)) / d;
          nd.vx -= dx * k; nd.vy -= dy * k; if (dim === 3) nd.vz -= dz * k;
        }
      }
    };
    (capsule as any).initialize = () => {};
    (clusterPull as any).initialize = () => {};
    (contain as any).initialize = () => {};

    this.totalTicks = this.incremental ? 120 : 320;
    this.ticksLeft = this.totalTicks;
    this.sim = forceSimulation(nodes, dim)
      .force('link', linkForce)
      .force('charge', charge)
      .force('collide', collide)
      .force('cluster', clusterPull)
      .force('contain', contain)
      .force('capsule', capsule)
      .alphaDecay(1 - Math.pow(0.001, 1 / this.totalTicks))
      .velocityDecay(0.42)
      .stop();
    if (this.incremental) this.sim.alpha(0.5);
  }

  /** Stage 1: cluster bodies sized from their members. */
  private placeClusters(rnd: () => number, have: Uint8Array, cr: Float32Array) {
    const g = this.g, dim = this.o.dim, sp = this.o.spread;
    const K = g.clusters.length;
    const sum = new Float64Array(K);
    for (let i = 0; i < g.n; i++) sum[g.cluster[i]] += dim === 3 ? cr[i] ** 3 : cr[i] ** 2;
    const rad = Array.from(sum, (s) => (dim === 3 ? Math.cbrt(s / 0.26) : Math.sqrt(s / 0.34)) + 6);
    const bodies: SimNode[] = g.clusters.map((_, i) => {
      let sx = 0, sy = 0, sz = 0, c = 0;
      if (this.incremental) {
        for (let k = 0; k < g.n; k++) if (g.cluster[k] === i && have[k]) { sx += this.pos[k * 3]; sy += this.pos[k * 3 + 1]; sz += this.pos[k * 3 + 2]; c++; }
      }
      const R = 50 * sp * Math.cbrt(K);
      const x = c ? sx / c : (rnd() * 2 - 1) * R;
      const y = c ? sy / c : (rnd() * 2 - 1) * R;
      const z = dim === 3 ? (c ? sz / c : (rnd() * 2 - 1) * R) : 0;
      const b: SimNode = { index: i, x, y, z, vx: 0, vy: 0, vz: 0 };
      if (c) { b.fx = x; b.fy = y; b.fz = dim === 3 ? z : 0; }
      return b;
    });
    const w = new Map<number, number>();
    for (let i = 0; i < g.e; i++) {
      if (g.mega[g.eSrc[i]] || g.mega[g.eDst[i]]) continue;
      const a = g.cluster[g.eSrc[i]], b = g.cluster[g.eDst[i]];
      if (a === b) continue;
      const key = Math.min(a, b) * 4096 + Math.max(a, b);
      w.set(key, (w.get(key) ?? 0) + 1);
    }
    const clinks = [...w.entries()].map(([k, c]) => ({ source: Math.floor(k / 4096), target: k % 4096, c }));
    const gap = 10 * sp;
    // gravity toward the centre: lonely clusters must not drift to the rim and stretch the frame
    const gravity = (alpha: number) => {
      const k = 0.09 * alpha;
      for (const b of bodies) {
        if (b.fx != null) continue;
        b.vx -= b.x * k; b.vy -= b.y * k * (dim === 3 ? 1.25 : 1); if (dim === 3) b.vz -= b.z * k;
      }
    };
    (gravity as any).initialize = () => {};
    const sim = forceSimulation(bodies, dim)
      .force('link', forceLink(clinks).id((d: SimNode) => d.index)
        .distance((l: any) => rad[l.source.index] + rad[l.target.index] + gap)
        .strength((l: any) => Math.min(0.5, 0.05 * Math.sqrt(l.c))))
      .force('charge', forceManyBody().strength((d: SimNode) => -30 - rad[d.index] * 2.5))
      .force('collide', forceCollide().radius((d: SimNode) => rad[d.index] + gap * 0.5).strength(1).iterations(3))
      .force('gravity', gravity)
      .alphaDecay(0.02)
      .velocityDecay(0.35)
      .stop();
    for (let t = 0; t < 300; t++) sim.tick();
    // extent of the cluster field → containment ellipsoid for the node stage
    let ex = 1, ey = 1, ez = 1;
    for (const b of bodies) {
      ex = Math.max(ex, Math.abs(b.x) + rad[b.index] * 0.8);
      ey = Math.max(ey, Math.abs(b.y) + rad[b.index] * 0.8);
      ez = Math.max(ez, Math.abs(b.z) + rad[b.index] * 0.8);
    }
    return {
      anchors: bodies.map((b) => [b.x, b.y, dim === 3 ? b.z : 0] as [number, number, number]),
      rad,
      extent: [ex * 1.08, ey * 1.08, ez * 1.08] as [number, number, number],
    };
  }

  /** Run ticks for up to `ms` milliseconds. Returns true when finished. */
  step(ms: number): boolean {
    if (this.done) return true;
    const t0 = performance.now();
    while (this.ticksLeft > 0 && performance.now() - t0 < ms) {
      this.sim.tick();
      this.ticksLeft--;
    }
    this.progress = 1 - this.ticksLeft / this.totalTicks;
    this.write();
    if (this.ticksLeft <= 0) this.finish();
    return this.done;
  }

  private write() {
    const n = this.g.n, p = this.pos, nodes = this.nodes;
    for (let i = 0; i < n; i++) {
      p[i * 3] = nodes[i].x; p[i * 3 + 1] = nodes[i].y; p[i * 3 + 2] = this.o.dim === 3 ? nodes[i].z : 0;
    }
  }

  private finish() {
    // recentre (full runs only: incremental runs keep the existing frame of reference)
    if (!this.incremental) {
      const n = this.g.n, p = this.pos;
      let cx = 0, cy = 0, cz = 0;
      for (let i = 0; i < n; i++) { cx += p[i * 3]; cy += p[i * 3 + 1]; cz += p[i * 3 + 2]; }
      cx /= n || 1; cy /= n || 1; cz /= n || 1;
      for (let i = 0; i < n; i++) { p[i * 3] -= cx; p[i * 3 + 1] -= cy; p[i * 3 + 2] -= cz; }
    }
    this.sim.stop();
    this.nodes = [];
    this.sim = null;
    this.done = true;
    this.progress = 1;
  }

  toCache(): PosCache {
    const out: PosCache = {};
    const r = (v: number) => Math.round(v * 100) / 100;
    for (let i = 0; i < this.g.n; i++) out[this.g.ids[i]] = [r(this.pos[i * 3]), r(this.pos[i * 3 + 1]), r(this.pos[i * 3 + 2])];
    return out;
  }
}

/** Deterministic Fibonacci-sphere offsets for the heading neurons around a note. */
export function microOffsets(g: GraphData, dim: 2 | 3): Float32Array {
  const out = new Float32Array(g.m * 3);
  const count = new Uint16Array(g.n);
  for (let k = 0; k < g.m; k++) count[g.mParent[k]]++;
  const seen = new Uint16Array(g.n);
  const GA = Math.PI * (3 - Math.sqrt(5));
  for (let k = 0; k < g.m; k++) {
    const p = g.mParent[k];
    const idx = seen[p]++;
    const tot = count[p];
    const r = hashStr(g.ids[p] + ':' + idx);
    const jitter = 0.78 + 0.44 * ((r & 1023) / 1023);
    const rho = g.microRadius[p] * jitter;
    if (dim === 3) {
      const y = tot === 1 ? 0 : 1 - (idx / (tot - 1)) * 2;
      const rr = Math.sqrt(Math.max(0, 1 - y * y));
      const th = GA * idx + ((r >>> 10) & 255) / 255;
      out[k * 3] = Math.cos(th) * rr * rho; out[k * 3 + 1] = y * rho; out[k * 3 + 2] = Math.sin(th) * rr * rho;
    } else {
      const th = (idx / tot) * Math.PI * 2 + ((r >>> 10) & 255) / 255;
      out[k * 3] = Math.cos(th) * rho; out[k * 3 + 1] = Math.sin(th) * rho; out[k * 3 + 2] = 0;
    }
  }
  return out;
}
