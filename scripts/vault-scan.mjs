// Read-only scan of an Obsidian vault / plain folder of notes.
//   node scripts/vault-scan.mjs <vaultPath> [--json] [--snapshot <file|auto>] [--compare <file|baseline>]
//
// --snapshot  save the state of every link and every file name to a file OUTSIDE the vault (and outside this kit).
//             "auto" writes it into the OS temp folder and keeps the first one as the "baseline".
// --compare   compare the vault now against a saved snapshot ("baseline" = the first auto snapshot of this vault).
//             Reports: files lost or renamed, wiki-links / markdown links / canvas files / Dataview folders that
//             worked before and are broken now, and new duplicate note names.
// Nothing inside the vault is ever written. Hidden folders (.obsidian, .git, .claude, ...) are skipped, like Obsidian does.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

import { cleanArgs } from './lib-args.mjs';
if (Number(process.versions.node.split('.')[0]) < 18) { console.error(`Node ${process.versions.node} is too old; use Node 18 or newer, or follow the manual steps in docs/ORGANIZE.md.`); process.exit(5); }

const args = cleanArgs(process.argv.slice(2));
const VALUE_FLAGS = ['--snapshot', '--compare'];
const flag = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : null; };
const asJson = args.includes('--json');
let snapshotFile = flag('--snapshot');
let compareFile = flag('--compare');
const vault = args.find((a, i) => !a.startsWith('--') && (i === 0 || !VALUE_FLAGS.includes(args[i - 1])));
const USAGE = 'Usage: node scripts/vault-scan.mjs <vaultPath> [--json] [--snapshot <file|auto>] [--compare <file|baseline>]';
if (!vault || !fs.existsSync(vault) || !fs.statSync(vault).isDirectory()) { console.error(USAGE); process.exit(1); }
const root = path.resolve(vault);
const kitRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rel = (p) => path.relative(root, p).split(path.sep).join('/');
const isInside = (dir, p) => { const r = path.relative(dir, path.resolve(p)); return r === '' || (!r.startsWith('..') && !path.isAbsolute(r)); };

// snapshot location: never inside the vault, never inside this kit (it holds the user's note names)
const vaultId = crypto.createHash('sha1').update(root.toLowerCase()).digest('hex').slice(0, 8);
const tmpDir = path.join(os.tmpdir(), 'neural-brain-kit');
const baselinePath = path.join(tmpDir, `${vaultId}-baseline.json`);
let autoSnapshot = false;
if (snapshotFile === 'auto') { autoSnapshot = true; snapshotFile = path.join(tmpDir, `${vaultId}-${new Date().toISOString().replace(/[:.]/g, '-')}.json`); }
if (compareFile === 'baseline') compareFile = baselinePath;
if (snapshotFile && (isInside(root, snapshotFile) || isInside(kitRoot, snapshotFile))) {
  console.error(`Refusing to write the snapshot inside the vault or inside the kit folder (${snapshotFile}). Use --snapshot auto or a path in the OS temp folder.`);
  process.exit(1);
}

// ---- walk (hidden entries are skipped) ----
const files = []; // { rel, ext, size }
const hiddenTop = [];
const allDirs = []; // every visible folder, empty ones too
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'node_modules') { if (dir === root) hiddenTop.push(e.name); continue; }
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { allDirs.push(rel(p)); walk(p); }
    else if (e.isFile()) files.push({ rel: rel(p), ext: path.extname(e.name).toLowerCase(), size: fs.statSync(p).size });
  }
})(root);

const md = files.filter((f) => f.ext === '.md');
const baseOf = (r) => r.slice(r.lastIndexOf('/') + 1);
const noExt = (r) => r.replace(/\.md$/i, '');
const fileSet = new Set(files.map((f) => f.rel.toLowerCase()));
const dirSet = new Set(allDirs.map((d) => d.toLowerCase()));
for (const f of files) { const parts = f.rel.split('/'); for (let i = 1; i < parts.length; i++) dirSet.add(parts.slice(0, i).join('/').toLowerCase()); }

// name indexes for link resolution (Obsidian-like: by path suffix, else by file name)
const mdByBase = new Map();
for (const f of md) {
  const b = noExt(baseOf(f.rel)).toLowerCase();
  (mdByBase.get(b) ?? mdByBase.set(b, []).get(b)).push(f.rel);
}
const allByName = new Map(files.map((f) => [baseOf(f.rel).toLowerCase(), f.rel]));
const mdPaths = md.map((f) => noExt(f.rel).toLowerCase());
const resolveTarget = (target) => {
  const t = target.trim().toLowerCase();
  if (!t) return null;
  if (/\.[a-z0-9]{2,5}$/.test(t) && !t.endsWith('.md')) return allByName.get(baseOf(t)) ?? null; // attachment embed
  const key = t.replace(/\.md$/, '');
  if (key.includes('/')) return mdPaths.find((p) => p === key || p.endsWith('/' + key)) ?? null;
  return mdByBase.get(key)?.[0] ?? null;
};

const stripCode = (s) => s.replace(/```[\s\S]*?```/g, '').replace(/~~~[\s\S]*?~~~/g, '').replace(/`[^`\n]*`/g, '');
const WIKI = /!?\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/g;
const MDLINK = /\]\((?:<([^>\n]+?\.md)(?:#[^>\n]*)?>|([^)\s]+?\.md)(?:#[^)]*)?)\)/gi; // [x](a/b.md) and [x](<a b/c.md>)
const DV_FROM = /\bFROM\s+"([^"\n]+)"/gi;
const DV_PAGES = /dv\.pages\(\s*['"`]\s*"?([^'"`\n)]+?)"?\s*['"`]/gi;

const noFrontmatter = []; let tiny = 0; let untitled = 0; let daily = 0;
let mdLinkTotal = 0; let mdLinkBroken = 0; const mdLinks = [];
let wikiTotal = 0; let wikiResolved = 0;
const unresolved = new Map(); // target -> count
const dvFolders = new Set();
const state = {};             // link state: "noteBase->target" = 1 resolved / 0 broken; prefixes md: canvas: dv:
for (const f of md) {
  const text = fs.readFileSync(path.join(root, f.rel), 'utf8');
  const noteBase = noExt(baseOf(f.rel)).toLowerCase();
  if (!/^---\r?\n[\s\S]*?\r?\n---/.test(text)) noFrontmatter.push(f.rel);
  if (f.size < 200) tiny++;
  if (/^(untitled|unnamed)/i.test(baseOf(f.rel))) untitled++;
  if (/^\d{4}-\d{2}-\d{2}/.test(baseOf(f.rel))) daily++;
  for (const m of text.matchAll(DV_FROM)) dvFolders.add(m[1].trim().replace(/^\/+|\/+$/g, ''));
  for (const m of text.matchAll(DV_PAGES)) { const v = m[1].trim(); if (v && !v.startsWith('#') && !/\s(and|or)\s/i.test(v)) dvFolders.add(v.replace(/^\/+|\/+$/g, '')); }
  const body = stripCode(text);
  for (const m of body.matchAll(MDLINK)) {
    const raw = m[1] ?? m[2];
    if (/^[a-z][a-z0-9+.-]*:/i.test(raw)) continue; // http:, mailto: ...
    let dec = raw; try { dec = decodeURIComponent(raw); } catch { /* keep raw */ }
    // Obsidian accepts all three forms: relative to the note, a path from the vault root, and the shortest name
    const relTarget = dec.startsWith('/') ? dec.slice(1) : path.posix.normalize(path.posix.join(path.posix.dirname(f.rel), dec));
    const ok = fileSet.has(relTarget.toLowerCase()) || fileSet.has(dec.replace(/^\/+/, '').toLowerCase()) || resolveTarget(dec) !== null;
    mdLinkTotal++; if (!ok) mdLinkBroken++;
    mdLinks.push({ note: f.rel, target: raw, ok });
    state[`md:${noteBase}->${raw.toLowerCase()}`] = ok ? 1 : 0;
  }
  for (const m of body.matchAll(WIKI)) {
    wikiTotal++;
    const target = m[1].trim();
    const ok = resolveTarget(target) !== null;
    if (ok) wikiResolved++; else unresolved.set(target, (unresolved.get(target) ?? 0) + 1);
    state[`${noteBase}->${target.toLowerCase()}`] = ok ? 1 : 0;
  }
}
for (const d of dvFolders) state[`dv:${d.toLowerCase()}`] = (dirSet.has(d.toLowerCase()) || fileSet.has(d.toLowerCase()) || fileSet.has(d.toLowerCase() + '.md')) ? 1 : 0;
// a Dataview query FROM "Folder" also breaks when notes leave that folder, so remember how many notes it holds
const dvCounts = {};
for (const d of dvFolders) { const k = d.toLowerCase(); dvCounts[k] = md.filter((f) => f.rel.toLowerCase().startsWith(k + '/') || f.rel.toLowerCase() === k + '.md' || f.rel.toLowerCase() === k).length; }

// canvas files point at notes by path
const canvases = files.filter((f) => f.ext === '.canvas');
let canvasRefs = 0;
for (const c of canvases) {
  try {
    const j = JSON.parse(fs.readFileSync(path.join(root, c.rel), 'utf8'));
    for (const n of j.nodes ?? []) if (n.type === 'file' && typeof n.file === 'string') {
      canvasRefs++;
      state[`canvas:${baseOf(c.rel).toLowerCase()}->${n.file.toLowerCase()}`] = fileSet.has(n.file.toLowerCase()) ? 1 : 0;
    }
  } catch { /* unreadable canvas: ignore */ }
}

// duplicate names (case-insensitive) - they make [[links]] ambiguous
const dups = [...mdByBase.entries()].filter(([, v]) => v.length > 1).map(([name, v]) => ({ name, paths: v }));

// per top-level folder
const tops = new Map();
for (const f of files) {
  const t = f.rel.includes('/') ? f.rel.split('/')[0] : '(root)';
  const o = tops.get(t) ?? { folder: t, files: 0, md: 0, bytes: 0 };
  o.files++; o.bytes += f.size; if (f.ext === '.md') o.md++;
  tops.set(t, o);
}
const ext = new Map();
for (const f of files) ext.set(f.ext || '(none)', (ext.get(f.ext || '(none)') ?? 0) + 1);

// file-name multiset (to catch lost or renamed files)
const names = {};
for (const f of files) { const k = baseOf(f.rel).toLowerCase(); names[k] = (names[k] ?? 0) + 1; }

const readJson = (p) => { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return null; } };
const obsDir = path.join(root, '.obsidian');
const settings = readJson(path.join(obsDir, 'app.json')) ?? {};
const community = readJson(path.join(obsDir, 'community-plugins.json'));
const toolFolders = {
  dailyNotes: readJson(path.join(obsDir, 'daily-notes.json'))?.folder || null,
  templatesCore: readJson(path.join(obsDir, 'templates.json'))?.folder || null,
  templater: readJson(path.join(obsDir, 'plugins', 'templater-obsidian', 'data.json'))?.templates_folder || null,
};
const cloud = /onedrive|dropbox|icloud|google drive|googledrive|yandex\.disk|mega/i.test(root);

// root files of the kit that must never overwrite the user's own
const rootFile = (n) => fs.existsSync(path.join(root, n));
const kitMarker = (n) => { try { return fs.readFileSync(path.join(root, n), 'utf8').includes('**Wiki language:**'); } catch { return false; } };
const TEMPLATE_NAMES = ['index', 'log', 'claude', 'wiki-schema', 'wiki-index', 'wiki-log', 'source', 'concept', 'entity', 'project', 'capture'];
const nameConflicts = TEMPLATE_NAMES.filter((n) => mdByBase.has(n)).map((n) => ({ name: n, paths: mdByBase.get(n) }));

const report = {
  root,
  isObsidianVault: fs.existsSync(obsDir),
  kitSchemaInstalled: rootFile('WIKI-SCHEMA.md') || kitMarker('CLAUDE.md'),
  rootFiles: { 'CLAUDE.md': rootFile('CLAUDE.md'), 'index.md': rootFile('index.md'), 'log.md': rootFile('log.md'), '.gitignore': rootFile('.gitignore'), '.git': rootFile('.git') },
  hasKitFolders: ['raw', 'wiki', 'inbox'].filter((d) => dirSet.has(d)),
  hiddenTopLevel: hiddenTop,
  cloudSyncSuspected: cloud,
  files: files.length, markdown: md.length, megabytes: +(files.reduce((a, f) => a + f.size, 0) / 1048576).toFixed(1),
  extensions: Object.fromEntries([...ext.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12)),
  topFolders: [...tops.values()].sort((a, b) => b.files - a.files),
  largest: [...files].sort((a, b) => b.size - a.size).slice(0, 8).map((f) => ({ file: f.rel, kb: Math.round(f.size / 1024) })),
  markdownWithoutFrontmatter: noFrontmatter.length,
  noFrontmatterSample: noFrontmatter.slice(0, 8),
  tinyNotesUnder200Bytes: tiny, untitledNotes: untitled, dailyNoteLikeFiles: daily,
  links: {
    wikilinks: wikiTotal, resolved: wikiResolved, unresolved: wikiTotal - wikiResolved,
    unresolvedTop: [...unresolved.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([t, c]) => ({ target: t, count: c })),
    markdownStyleLinksToMd: mdLinkTotal, markdownStyleLinksBroken: mdLinkBroken, markdownLinkList: mdLinks,
  },
  pathDependent: {
    dataviewFolders: [...dvFolders].slice(0, 20), canvasFiles: canvases.length, canvasFileRefs: canvasRefs,
    communityPlugins: community, toolFolders,
  },
  duplicateNames: dups.slice(0, 20), duplicateNameCount: dups.length,
  templateNameConflicts: nameConflicts,
  templateFolders: allDirs.filter((d) => /^(wiki-)?templates?$/i.test(d)),
  obsidian: { alwaysUpdateLinks: settings.alwaysUpdateLinks ?? null, newLinkFormat: settings.newLinkFormat ?? null, useMarkdownLinks: settings.useMarkdownLinks ?? null },
};

if (snapshotFile) {
  fs.mkdirSync(path.dirname(path.resolve(snapshotFile)), { recursive: true });
  const body = JSON.stringify({ created: new Date().toISOString(), root, state, names, dvCounts, dupNames: dups.map((d) => d.name), fileCount: files.length, duplicateNameCount: dups.length });
  fs.writeFileSync(snapshotFile, body);
  report.snapshotWritten = path.resolve(snapshotFile);
  if (autoSnapshot && !fs.existsSync(baselinePath)) { fs.writeFileSync(baselinePath, body); report.baselineWritten = baselinePath; }
}
if (compareFile) {
  if (!fs.existsSync(compareFile)) { console.error(`No snapshot to compare with: ${compareFile}`); process.exit(1); }
  const before = JSON.parse(fs.readFileSync(compareFile, 'utf8'));
  const group = (k) => (k.startsWith('md:') ? 'markdownLinks' : k.startsWith('canvas:') ? 'canvas' : k.startsWith('dv:') ? 'dataview' : 'wikilinks');
  const broken = { wikilinks: [], markdownLinks: [], canvas: [], dataview: [] };
  let fixed = 0;
  for (const [k, was] of Object.entries(before.state)) {
    const now = state[k];
    if (was === 1 && now === 0) broken[group(k)].push(k);
    else if (was === 1 && now === undefined) broken[group(k)].push(k + '  (note or link disappeared)');
    else if (was === 0 && now === 1) fixed++;
  }
  for (const [d, c] of Object.entries(before.dvCounts ?? {})) { const n = dvCounts[d] ?? 0; if (n < c) broken.dataview.push(`dv:${d}  (notes in that folder: ${c} -> ${n})`); }
  const lost = [];
  for (const [n, c] of Object.entries(before.names ?? {})) if ((names[n] ?? 0) < c) lost.push(`${n} (${c} -> ${names[n] ?? 0})`);
  const brokenTotal = Object.values(broken).reduce((a, v) => a + v.length, 0);
  report.compare = {
    againstSnapshot: path.resolve(compareFile),
    filesBefore: before.fileCount, filesNow: files.length,
    filesLostOrRenamed: lost.length, lostSample: lost.slice(0, 15),
    broken: Object.fromEntries(Object.entries(broken).map(([g, v]) => [g, v.length])), brokenSample: Object.values(broken).flat().slice(0, 15),
    fixedSinceSnapshot: fixed,
    duplicateNamesBefore: before.duplicateNameCount, duplicateNamesNow: dups.length,
    newDuplicateNames: dups.map((d) => d.name).filter((n) => !(before.dupNames ?? []).includes(n)),
    verdict: brokenTotal === 0 && lost.length === 0 && dups.length <= before.duplicateNameCount && files.length >= before.fileCount ? 'OK' : 'PROBLEM',
  };
}

if (asJson) { console.log(JSON.stringify(report, null, 2)); process.exit(0); }
const L = report.links; const P = report.pathDependent;
console.log(`Vault: ${report.root}`);
console.log(`Obsidian vault: ${report.isObsidianVault ? 'yes' : 'no (.obsidian missing)'} | kit schema installed: ${report.kitSchemaInstalled ? 'yes' : 'no'} | kit folders: ${report.hasKitFolders.join(', ') || 'none'}${report.cloudSyncSuspected ? ' | CLOUD SYNC SUSPECTED' : ''}`);
console.log(`Root files present: ${Object.entries(report.rootFiles).filter(([, v]) => v).map(([k]) => k).join(', ') || 'none'}`);
console.log(`Files (hidden folders skipped): ${report.files} (${report.markdown} markdown), ${report.megabytes} MB`);
console.log(`Extensions: ${Object.entries(report.extensions).map(([e, c]) => `${e}:${c}`).join(' ')}`);
console.log('Top folders:'); for (const t of report.topFolders.slice(0, 15)) console.log(`  ${t.folder.padEnd(32)} files ${String(t.files).padStart(5)}  md ${String(t.md).padStart(5)}  ${(t.bytes / 1048576).toFixed(1)} MB`);
console.log(`Without frontmatter: ${report.markdownWithoutFrontmatter}/${report.markdown}; tiny(<200B): ${tiny}; untitled: ${untitled}; date-named: ${daily}`);
console.log(`Wikilinks: ${L.wikilinks} (resolved ${L.resolved}, unresolved ${L.unresolved}); markdown-style links to .md: ${L.markdownStyleLinksToMd} (broken ${L.markdownStyleLinksBroken})`);
console.log(`PATH-DEPENDENT (moving these folders can break things): Dataview folders: ${P.dataviewFolders.join(', ') || 'none'} | canvas files: ${P.canvasFiles} (${P.canvasFileRefs} note refs) | Daily notes folder: ${P.toolFolders.dailyNotes ?? '-'} | Templates folder: ${P.toolFolders.templatesCore ?? '-'} | Templater folder: ${P.toolFolders.templater ?? '-'} | Folders named templates: ${report.templateFolders.join(', ') || '-'}`);
console.log(`Community plugins: ${(P.communityPlugins ?? []).join(', ') || 'none'}`);
if (mdLinks.length) { console.log('Markdown-style links to .md (these do NOT update when a note moves on disk):'); for (const l of mdLinks.slice(0, 20)) console.log(`  [${l.ok ? 'ok' : 'BROKEN'}] ${l.note} -> ${l.target}`); if (mdLinks.length > 20) console.log(`  ... and ${mdLinks.length - 20} more (use --json for the full list)`); }
console.log(`Duplicate note names: ${report.duplicateNameCount}${dups.length ? ' -> ' + dups.slice(0, 5).map((d) => d.name).join(', ') : ''}`);
if (report.templateNameConflicts.length) console.log(`Template name conflicts (${report.kitSchemaInstalled ? 'the kit is already installed here, so some of these may be its own files' : 'do not overwrite; use the alternate names'}): ${report.templateNameConflicts.map((c) => `${c.name} [${c.paths.join(', ')}]`).join('; ')}`);
console.log(`Obsidian link settings: alwaysUpdateLinks=${report.obsidian.alwaysUpdateLinks ?? '-'} newLinkFormat=${report.obsidian.newLinkFormat ?? '-'} useMarkdownLinks=${report.obsidian.useMarkdownLinks ?? '-'}`);
if (report.snapshotWritten) console.log(`Snapshot saved: ${report.snapshotWritten}${report.baselineWritten ? `  (also kept as the baseline: ${report.baselineWritten})` : ''}`);
if (report.compare) {
  const c = report.compare;
  console.log(`COMPARE: ${c.verdict} - files ${c.filesBefore} -> ${c.filesNow}, lost or renamed: ${c.filesLostOrRenamed}, broken since snapshot: wikilinks ${c.broken.wikilinks}, markdown links ${c.broken.markdownLinks}, canvas ${c.broken.canvas}, dataview ${c.broken.dataview}; fixed: ${c.fixedSinceSnapshot}; duplicate names ${c.duplicateNamesBefore} -> ${c.duplicateNamesNow}`);
  if (c.newDuplicateNames.length) console.log('  new duplicate names: ' + c.newDuplicateNames.join(', '));
  for (const b of c.lostSample) console.log('  lost/renamed: ' + b);
  for (const b of c.brokenSample) console.log('  broken: ' + b);
}
