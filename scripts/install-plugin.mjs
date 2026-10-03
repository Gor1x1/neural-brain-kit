// Installs / updates the Neural Brain plugin into an Obsidian vault.
//   node scripts/install-plugin.mjs <vaultPath> [--dry-run] [--init]
//
// - copies main.js, manifest.json, styles.css from ../plugin into <vault>/.obsidian/plugins/neural-brain/
// - NEVER touches data.json or layout-*.json there (your settings and the cached layout stay)
// - adds "neural-brain" to <vault>/.obsidian/community-plugins.json (other plugins stay; a .bak copy is made first)
// - nothing else inside the vault is changed
// - --init: create the .obsidian folder if the folder has none yet (use it for a brand-new vault you just made,
//   or for a plain folder of notes that was never opened in Obsidian). Without --init a missing .obsidian is an error.
// Everything is validated BEFORE anything is written, so a failure leaves the vault untouched.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cleanArgs } from './lib-args.mjs';

const major = Number(process.versions.node.split('.')[0]);
if (major < 18) { console.error(`Node ${process.versions.node} is too old; install Node 18 or newer, or use the manual steps in docs/PLUGIN.md.`); process.exit(5); }

const args = cleanArgs(process.argv.slice(2));
const dry = args.includes('--dry-run');
const init = args.includes('--init');
let vault = args.find((a) => !a.startsWith('--'));
if (vault) vault = vault.replace(/[\\/]+$/, '') || vault;
const kitPlugin = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'plugin');
const ID = 'neural-brain';

if (!vault || !fs.existsSync(vault) || !fs.statSync(vault).isDirectory()) {
  console.error('Usage: node scripts/install-plugin.mjs <vaultPath> [--dry-run] [--init]');
  process.exit(1);
}
const obs = path.join(path.resolve(vault), '.obsidian');
const hadObsidian = fs.existsSync(obs);
if (!hadObsidian && !init) {
  console.error(`No .obsidian folder in ${vault}. Either open this folder in Obsidian once ("Open folder as vault") and close Obsidian, then run again, or run again with --init to create the folder yourself.`);
  process.exit(2);
}
for (const f of ['main.js', 'manifest.json', 'styles.css']) {
  if (!fs.existsSync(path.join(kitPlugin, f))) { console.error(`Missing ${path.join(kitPlugin, f)} - is the kit folder complete?`); process.exit(3); }
}

const readJson = (p, what) => {
  try { return JSON.parse(fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '')); }
  catch (e) { console.error(`${what} (${p}) is not valid JSON (${e.message}). Nothing was changed.`); process.exit(4); }
};
const dest = path.join(obs, 'plugins', ID);
const cp = path.join(obs, 'community-plugins.json');
const oldManifest = fs.existsSync(path.join(dest, 'manifest.json')) ? readJson(path.join(dest, 'manifest.json'), 'The installed plugin manifest') : null;
const newManifest = readJson(path.join(kitPlugin, 'manifest.json'), 'The kit plugin manifest');
let list = [];
if (fs.existsSync(cp)) {
  list = readJson(cp, 'community-plugins.json');
  if (!Array.isArray(list)) { console.error(`community-plugins.json is not a list - not touching it. Add "${ID}" by hand. Nothing was changed.`); process.exit(4); }
}

console.log(oldManifest ? `Updating plugin ${oldManifest.version} -> ${newManifest.version}` : `Installing plugin ${newManifest.version}`);
if (!fs.existsSync(obs)) console.log('  create .obsidian (--init)');
if (!dry) fs.mkdirSync(dest, { recursive: true });
for (const f of ['main.js', 'manifest.json', 'styles.css']) {
  const have = path.join(dest, f);
  const same = fs.existsSync(have) && fs.readFileSync(have).equals(fs.readFileSync(path.join(kitPlugin, f)));
  console.log(`  copy ${f}${same ? ' (already identical)' : ''}`);
  if (!dry) fs.copyFileSync(path.join(kitPlugin, f), path.join(dest, f));
}
for (const keep of ['data.json', 'layout-neural.json', 'layout-daily.json']) {
  if (fs.existsSync(path.join(dest, keep))) console.log(`  kept ${keep} (not touched)`);
}

if (list.includes(ID)) console.log('  community-plugins.json already lists neural-brain');
else {
  console.log('  add "neural-brain" to community-plugins.json');
  if (!dry) {
    if (fs.existsSync(cp)) fs.copyFileSync(cp, `${cp}.bak-${new Date().toISOString().replace(/[:.]/g, '-')}`);
    fs.writeFileSync(cp, JSON.stringify([...list, ID], null, 2) + '\n');
  }
}
console.log(dry ? '\nDry run: nothing was written.' : `\nDone. In Obsidian: ${hadObsidian ? '' : 'choose "Open folder as vault" and pick this folder, then '}Settings > Community plugins > turn on community plugins if asked, enable "Neural Brain", then restart Obsidian.`);
