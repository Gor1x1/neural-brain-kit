// Adds a missing frontmatter block (or only the missing keys) to wiki pages WITHOUT touching the note body.
//   node scripts/add-frontmatter.mjs <vaultPath> <folder-inside-vault> --type <concept|entity|project|source>
//        [--origin user] [--limit 25] [--apply]
//
// - dry run by default: prints what would change; nothing is written without --apply
// - only folders under wiki/ are allowed (never raw/); at most --limit files (default 25) per run
// - keys added when missing: type, created (file creation date), updated (file modified date), tags: [], status: draft
//   and, with --origin user, origin: user  (marks pages that came from the user's own old notes)
// - existing keys are never changed; the body (everything after the frontmatter) is verified to be byte-identical
// - keeps the file's own line endings (LF or CRLF) and BOM; skips files that are not valid UTF-8
import fs from 'node:fs';
import path from 'node:path';

import { cleanArgs } from './lib-args.mjs';
if (Number(process.versions.node.split('.')[0]) < 18) { console.error(`Node ${process.versions.node} is too old; use Node 18 or newer, or follow the manual steps in docs/ORGANIZE.md section 6.`); process.exit(5); }

const args = cleanArgs(process.argv.slice(2));
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const VALUE = ['--type', '--origin', '--limit'];
const pos = args.filter((a, i) => !a.startsWith('--') && !VALUE.includes(args[i - 1]));
const [vaultArg, folderArg] = pos;
const type = opt('--type'); const origin = opt('--origin'); const apply = args.includes('--apply');
const limit = Number(opt('--limit') ?? 25);
if (!vaultArg || !folderArg || !['concept', 'entity', 'project', 'source'].includes(type)) {
  console.error('Usage: node scripts/add-frontmatter.mjs <vaultPath> <folder-inside-vault> --type <concept|entity|project|source> [--origin user] [--limit 25] [--apply]');
  process.exit(1);
}
const root = path.resolve(vaultArg);
const folder = path.resolve(root, folderArg);
const relFolder = path.relative(root, folder).split(path.sep).join('/');
if (relFolder.startsWith('..') || path.isAbsolute(relFolder) || !(relFolder === 'wiki' || relFolder.startsWith('wiki/'))) {
  console.error(`Only folders inside wiki/ are allowed (got "${relFolder}"). Never raw/.`); process.exit(1);
}
if (!fs.existsSync(folder) || !fs.statSync(folder).isDirectory()) { console.error(`${folder} is not a folder.`); process.exit(1); }
if (limit > 25) { console.error('--limit may not exceed 25 (batch size rule).'); process.exit(1); }

const mds = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p); else if (e.isFile() && e.name.toLowerCase().endsWith('.md')) mds.push(p);
  }
})(folder);
mds.sort();

const day = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
// a frontmatter block (an empty one too); its lines must look like YAML, otherwise a leading '---' is just a horizontal rule
const FM = /^---[ \t]*\r?\n(?:([\s\S]*?)\r?\n)?---[ \t]*(?:\r?\n|$)/;
const YAML_LINE = /^(?:\s*$|\s*#|\s*-\s|\s+\S|[^\s:][^:]*:(?:\s|$))/;
const looksYaml = (block) => (block ?? '').split(/\r?\n/).every((l) => YAML_LINE.test(l));
let changed = 0; let skipped = 0; let already = 0;
for (const p of mds) {
  if (changed >= limit) { console.log(`(batch limit ${limit} reached; run again for the rest)`); break; }
  const buf = fs.readFileSync(p);
  let text;
  try { text = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(buf); } catch { console.log(`skip (not UTF-8): ${path.relative(root, p)}`); skipped++; continue; }
  const bom = text.startsWith('﻿') ? '﻿' : '';
  const content = bom ? text.slice(1) : text;
  const eol = content.includes('\r\n') ? '\r\n' : '\n';
  const st = fs.statSync(p);
  // the earlier of creation and modification time: a copied or cloned vault has the copy day as its "creation" date
  const created = day(new Date(Math.min(st.birthtimeMs > 0 ? st.birthtimeMs : Infinity, st.mtimeMs)));
  const wanted = [['type', type], ['created', created], ['updated', day(st.mtime)], ['tags', '[]'], ['status', 'draft']];
  if (origin) wanted.push(['origin', origin]);
  let m = content.match(FM);
  if (m && !looksYaml(m[1])) m = null; // "---" text "---" that is not YAML: the note has no frontmatter, it is a horizontal rule
  let out; let body; let bodyAfter;
  if (m) {
    const have = new Set((m[1] ?? '').split(/\r?\n/).map((l) => l.match(/^([A-Za-z0-9_-]+)\s*:/)?.[1]).filter(Boolean));
    const add = wanted.filter(([k]) => !have.has(k));
    if (!add.length) { already++; continue; }
    const headEnd = m[0].length;
    const closeIdx = m[0].lastIndexOf('---');
    const head = m[0].slice(0, closeIdx).replace(/(\r?\n)?$/, eol) + add.map(([k, v]) => `${k}: ${v}`).join(eol) + eol + m[0].slice(closeIdx);
    out = bom + head + content.slice(headEnd);
    body = content.slice(headEnd);
    const nm = out.slice(bom.length).match(FM);
    bodyAfter = out.slice(bom.length + nm[0].length);
  } else {
    const head = '---' + eol + wanted.map(([k, v]) => `${k}: ${v}`).join(eol) + eol + '---' + eol;
    out = bom + head + content;
    body = content;
    bodyAfter = out.slice(bom.length + head.length);
  }
  if (body !== bodyAfter) { console.error(`ABORT: body would change in ${path.relative(root, p)}; nothing written for this file.`); skipped++; continue; }
  console.log(`${apply ? 'add' : 'would add'} frontmatter: ${path.relative(root, p)}`);
  if (apply) {
    const tmp = p + '.nbk-tmp';
    fs.writeFileSync(tmp, out, 'utf8');
    fs.renameSync(tmp, p);
  }
  changed++;
}
console.log(`${apply ? 'Changed' : 'Would change'}: ${changed}; already complete: ${already}; skipped: ${skipped}.${apply ? '' : ' Dry run: nothing was written. Add --apply to write.'}`);
