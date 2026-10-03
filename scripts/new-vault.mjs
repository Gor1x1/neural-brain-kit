// Creates a brand-new vault from vault-template/ (hidden files and folders included).
//   node scripts/new-vault.mjs <targetFolder> [--language "<wiki language>"]
//
// - the target must not exist yet, or must be an empty folder; nothing existing is ever overwritten
// - copies schema, catalog, log, templates/, raw/, wiki/, inbox/, the 6 skills in .claude/skills/ and .gitignore
// - sets the "**Wiki language:**" line of the schema when --language is given
// - does NOT install the plugin, record the install or start git: do those next (see CLAUDE.md, scenario C)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cleanArgs } from './lib-args.mjs';

if (Number(process.versions.node.split('.')[0]) < 18) { console.error(`Node ${process.versions.node} is too old; use Node 18 or newer, or copy vault-template/ by hand (CLAUDE.md, scenario C).`); process.exit(5); }

const args = cleanArgs(process.argv.slice(2));
const li = args.indexOf('--language');
const language = li >= 0 ? args[li + 1] : null;
let target = args.find((a, i) => !a.startsWith('--') && (li < 0 || i !== li + 1));
const USAGE = 'Usage: node scripts/new-vault.mjs <targetFolder> [--language "<wiki language>"]';
if (!target || (li >= 0 && !language)) { console.error(USAGE); process.exit(1); }
target = path.resolve(target.replace(/[\\/]+$/, '') || target);

const kit = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const template = path.join(kit, 'vault-template');
if (!fs.existsSync(path.join(template, 'CLAUDE.md'))) { console.error(`${template} is missing or incomplete; is the kit folder complete?`); process.exit(3); }
const rel = path.relative(kit, target);
if (rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel))) { console.error('The new vault must be outside the kit folder.'); process.exit(2); }
if (fs.existsSync(target) && (!fs.statSync(target).isDirectory() || fs.readdirSync(target).length)) {
  console.error(`${target} already exists and is not empty. Nothing was changed. Choose another folder.`); process.exit(2);
}

fs.mkdirSync(target, { recursive: true });
fs.cpSync(template, target, { recursive: true, errorOnExist: true, force: false });

const schema = path.join(target, 'CLAUDE.md');
if (language) {
  const text = fs.readFileSync(schema, 'utf8');
  if (!/\*\*Wiki language:\*\* .*/.test(text)) { console.error('Could not find the "**Wiki language:**" line in the schema; set it by hand.'); }
  else fs.writeFileSync(schema, text.replace(/(\*\*Wiki language:\*\* ).*/, `$1${language.replace(/\$/g, '$$$$')}`));
}

const count = (dir) => fs.readdirSync(dir, { withFileTypes: true }).reduce((n, e) => n + (e.isDirectory() ? count(path.join(dir, e.name)) : 1), 0);
console.log(`New vault created: ${target} (${count(target)} files, hidden ones included)`);
console.log(language ? `Wiki language: ${language}` : 'Wiki language left as in the template (English); edit the "**Wiki language:**" line to change it.');
console.log('Next: install the plugin with --init, record the install, then start git (CLAUDE.md, scenario C).');
