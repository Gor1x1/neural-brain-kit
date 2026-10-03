// Records and checks what the kit installed into a vault (works with or without git, also for a ZIP download).
//   node scripts/kit-state.mjs record <vaultPath> [--mode A|B|C] [--language <name or code>]
//   node scripts/kit-state.mjs skills <vaultPath>
//
// record : writes <vault>/.neural-brain-kit.json (versions, kit commit if known, language, mode and the SHA-256
//          of every installed skill file, so a later /update can tell which skills the user changed)
// skills : compares each kit skill with the vault copy and the recorded hash:
//          current   - vault copy equals the kit's           (nothing to do)
//          update    - vault copy is untouched, kit is newer (safe to replace)
//          modified  - the user edited it                    (put the kit's version next to it as SKILL.new.md)
//          new       - not in the vault yet                  (copy it)
//          unknown   - no recorded hash                      (treat as modified)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { cleanArgs } from './lib-args.mjs';
if (Number(process.versions.node.split('.')[0]) < 18) { console.error(`Node ${process.versions.node} is too old; use Node 18 or newer, or follow the manual steps in docs/UPDATE.md.`); process.exit(5); }

const [cmd, vaultArg, ...rest] = cleanArgs(process.argv.slice(2));
const opt = (n) => { const i = rest.indexOf(n); return i >= 0 ? rest[i + 1] : null; };
if (!['record', 'skills'].includes(cmd) || !vaultArg || !fs.existsSync(vaultArg)) {
  console.error('Usage: node scripts/kit-state.mjs record <vaultPath> [--mode A|B|C] [--language <name or code>]\n       node scripts/kit-state.mjs skills <vaultPath>');
  process.exit(1);
}
const kit = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const vault = path.resolve(vaultArg);
const stateFile = path.join(vault, '.neural-brain-kit.json');
const sha = (p) => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const skillsDir = (root) => path.join(root, 'vault-template', '.claude', 'skills');
const kitSkills = fs.readdirSync(skillsDir(kit)).filter((n) => fs.existsSync(path.join(skillsDir(kit), n, 'SKILL.md')));
const vaultSkill = (n) => path.join(vault, '.claude', 'skills', n, 'SKILL.md');
const read = () => { try { return JSON.parse(fs.readFileSync(stateFile, 'utf8')); } catch { return null; } };

if (cmd === 'record') {
  const old = read() ?? {};
  let commit = null;
  try { commit = execFileSync('git', ['-C', kit, 'rev-parse', 'HEAD'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { /* ZIP download or no commits */ }
  const today = new Date().toISOString().slice(0, 10);
  const skills = { ...(old.skills ?? {}) };
  // Record a skill's hash ONLY when the vault copy is exactly the kit's copy (i.e. the kit installed it).
  // A copy the user edited, or one that was already there before the kit, keeps its old hash (or none), so that
  // `skills` keeps reporting it as modified / unknown and /update never overwrites it silently.
  const notRecorded = [];
  for (const n of kitSkills) {
    if (!fs.existsSync(vaultSkill(n))) continue;
    if (sha(vaultSkill(n)) === sha(path.join(skillsDir(kit), n, 'SKILL.md'))) skills[n] = sha(vaultSkill(n));
    else notRecorded.push(n);
  }
  const state = {
    kit_commit: commit,
    kit_version: JSON.parse(fs.readFileSync(path.join(kit, 'package.json'), 'utf8')).version,
    plugin_version: JSON.parse(fs.readFileSync(path.join(kit, 'plugin', 'manifest.json'), 'utf8')).version,
    installed: old.installed ?? today,
    updated: today,
    language: opt('--language') ?? old.language ?? null,
    mode: opt('--mode') ?? old.mode ?? null,
    skills,
  };
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2) + '\n');
  console.log(`Recorded ${stateFile}${commit ? '' : ' (kit commit unknown: no git history; skill hashes are used instead)'}`);
  if (notRecorded.length) console.log(`Not recorded (the vault copy differs from the kit's, so it stays "modified"/"unknown"): ${notRecorded.join(', ')}`);
} else {
  const rec = read()?.skills ?? {};
  for (const n of kitSkills) {
    const kitHash = sha(path.join(skillsDir(kit), n, 'SKILL.md'));
    let status;
    if (!fs.existsSync(vaultSkill(n))) status = 'new';
    else {
      const v = sha(vaultSkill(n));
      status = v === kitHash ? 'current' : !rec[n] ? 'unknown' : v === rec[n] ? 'update' : 'modified';
    }
    console.log(`${n.padEnd(14)} ${status}`);
  }
}
