// Makes a verified backup copy of a vault (hidden files and folders included) NEXT TO it, never inside it.
//   node scripts/backup-vault.mjs <vaultPath> [--to <parentFolder>]
//
// - backup folder name: <vault-name>-backup-YYYY-MM-DD (a -2, -3 ... suffix is added if that name is taken)
// - refuses to put the backup inside the vault
// - verifies: same list of files (hidden ones too), same sizes, same SHA-256 for every .md file
// - never deletes or overwrites anything
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

import { cleanArgs } from './lib-args.mjs';
if (Number(process.versions.node.split('.')[0]) < 18) { console.error(`Node ${process.versions.node} is too old; use Node 18 or newer, or make the backup by hand (docs/ORGANIZE.md section 1.3).`); process.exit(5); }

const args = cleanArgs(process.argv.slice(2));
const toIdx = args.indexOf('--to');
const to = toIdx >= 0 ? args[toIdx + 1] : null;
const vault = args.find((a, i) => !a.startsWith('--') && (toIdx < 0 || i !== toIdx + 1));
if (!vault || !fs.existsSync(vault) || !fs.statSync(vault).isDirectory()) {
  console.error('Usage: node scripts/backup-vault.mjs <vaultPath> [--to <parentFolder>]');
  process.exit(1);
}
const src = path.resolve(vault.replace(/[\\/]+$/, '') || vault);
const parent = path.resolve(to ?? path.dirname(src));
const inside = (dir, p) => { const r = path.relative(dir, p); return r === '' || (!r.startsWith('..') && !path.isAbsolute(r)); };
if (inside(src, parent)) { console.error('The backup folder must be outside the vault.'); process.exit(1); }
if (!fs.existsSync(parent)) { console.error(`${parent} does not exist.`); process.exit(1); }

const day = new Date().toISOString().slice(0, 10);
let dest = path.join(parent, `${path.basename(src)}-backup-${day}`);
for (let n = 2; fs.existsSync(dest); n++) dest = path.join(parent, `${path.basename(src)}-backup-${day}-${n}`);

console.log(`Copying ${src}\n     to ${dest} ...`);
fs.cpSync(src, dest, { recursive: true, errorOnExist: true, force: false });

const list = (root) => {
  const m = new Map();
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.isFile()) m.set(path.relative(root, p).split(path.sep).join('/'), p);
    }
  })(root);
  return m;
};
const sha = (p) => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const a = list(src); const b = list(dest);
const problems = [];
let bytes = 0;
for (const [rel, p] of a) {
  const q = b.get(rel);
  if (!q) { problems.push(`missing in backup: ${rel}`); continue; }
  const sa = fs.statSync(p).size; bytes += sa;
  if (sa !== fs.statSync(q).size) problems.push(`size differs: ${rel}`);
  else if (rel.toLowerCase().endsWith('.md') && sha(p) !== sha(q)) problems.push(`content differs: ${rel}`);
}
for (const rel of b.keys()) if (!a.has(rel)) problems.push(`extra in backup: ${rel}`);

if (problems.length) {
  console.error(`BACKUP NOT VERIFIED - ${problems.length} problem(s):`);
  for (const p of problems.slice(0, 20)) console.error('  ' + p);
  console.error(`The backup folder was left in place: ${dest}`);
  process.exit(2);
}
console.log(`BACKUP OK: ${a.size} files (hidden ones included), ${(bytes / 1048576).toFixed(1)} MB, all .md files identical by SHA-256.`);
console.log(`Backup folder: ${dest}`);
