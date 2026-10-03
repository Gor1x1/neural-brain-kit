// Dev-only: reads a vault (a folder of .md files) from disk and writes dev/graph.json + dev/graph.js
// in the same "RawVault" shape the plugin builds from Obsidian's metadataCache.
// dev/graph.js (window.__GRAPH__ = ...) is what the dev page dev/index.html loads.
//
// Usage: node scripts/export-graph.mjs <vaultPath>
//   e.g. node scripts/export-graph.mjs ./.demo-vault      (the synthetic demo vault, see `npm run demo`)
// The vault path can also come from the NB_VAULT environment variable.
import fs from 'node:fs';
import path from 'node:path';

const arg = process.argv[2] || process.env.NB_VAULT;
if (!arg || arg === '-h' || arg === '--help') {
  console.error('Usage: node scripts/export-graph.mjs <vaultPath>\n  e.g.  node scripts/export-graph.mjs ./.demo-vault\n(or set the NB_VAULT environment variable)');
  process.exit(arg ? 0 : 1);
}
const vault = path.resolve(arg);
if (!fs.existsSync(vault) || !fs.statSync(vault).isDirectory()) {
  console.error(`Vault folder not found: ${vault}`);
  process.exit(1);
}
const out = path.join(import.meta.dirname, '..', 'dev', 'graph.json');
const SKIP = new Set(['.obsidian', '.git', '.trash', 'node_modules', '.obsidian-backup-3d']);

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.toLowerCase().endsWith('.md')) files.push(p);
  }
})(vault);

const rel = (p) => path.relative(vault, p).split(path.sep).join('/');
const byBase = new Map();
for (const f of files) {
  const r = rel(f);
  const base = path.posix.basename(r, '.md').toLowerCase();
  if (!byBase.has(base)) byBase.set(base, []);
  byBase.get(base).push(r);
}
const byPath = new Map(files.map((f) => [rel(f).toLowerCase().replace(/\.md$/, ''), rel(f)]));

const resolved = {};
const unresolved = {};
const nodes = [];
for (const f of files) {
  const r = rel(f);
  let text = fs.readFileSync(f, 'utf8');
  const fm = {};
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (m) {
    for (const line of m[1].split(/\r?\n/)) {
      const kv = line.match(/^([\w-]+):\s*(.*)$/);
      if (kv) fm[kv[1]] = kv[2];
    }
    text = text.slice(m[0].length);
  }
  const clean = text.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
  const headings = [];
  for (const h of clean.matchAll(/^(#{1,6})\s+(.+?)\s*#*\s*$/gm)) headings.push({ h: h[2], l: h[1].length });
  const tags = [...clean.matchAll(/(?:^|\s)#([\p{L}\p{N}_/-]+)/gu)].map((x) => x[1]);
  nodes.push({ path: r, headings, tags, fm });
  for (const l of clean.matchAll(/!?\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/g)) {
    const target = l[1].trim();
    const key = target.toLowerCase().replace(/\.md$/, '');
    let dst = byPath.get(key);
    if (!dst) {
      const cands = byBase.get(path.posix.basename(key)) || [];
      if (cands.length) dst = cands.find((c) => c !== r) || cands[0];
    }
    if (dst) {
      if (dst === r) continue;
      (resolved[r] ||= {})[dst] = (resolved[r][dst] || 0) + 1;
    } else {
      (unresolved[r] ||= {})[target] = (unresolved[r][target] || 0) + 1;
    }
  }
}

fs.mkdirSync(path.dirname(out), { recursive: true });
const payload = JSON.stringify({ files: nodes, resolved, unresolved });
fs.writeFileSync(out, payload);
fs.writeFileSync(path.join(path.dirname(out), 'graph.js'), 'window.__GRAPH__ = ' + payload + ';');
const nl = Object.values(resolved).reduce((a, o) => a + Object.keys(o).length, 0);
const nu = new Set(Object.values(unresolved).flatMap((o) => Object.keys(o))).size;
const nh = nodes.reduce((a, n) => a + n.headings.length, 0);
console.log(`notes=${nodes.length} resolvedLinks=${nl} unresolvedTargets=${nu} headings=${nh} -> ${out}`);
