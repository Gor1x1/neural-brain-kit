# Update (UPDATE)

This repo receives new versions over time (plugin fixes, skill improvements).
`/update` brings them into your vault **without touching your notes**.

## What gets updated and what never does

| What | How |
|---|---|
| Plugin (`main.js`, `manifest.json`, `styles.css`) | replaced with the new one |
| Plugin `data.json`, `layout-*.json` | **never touched** (your settings and saved layout) |
| Skills (`.claude/skills/wiki-*`) | replaced only if **you have not modified** them; next to a modified one, `SKILL.new.md` is added |
| Schema (`CLAUDE.md` / `WIKI-SCHEMA.md`) | **never overwritten** (you may have changed it); Claude shows the difference and asks what to accept |
| Notes, `raw/`, `wiki/`, `inbox/` | **never** |

## Steps (for Claude)

1. **Update the repo.** If this folder is a git clone, then with the user's permission: `git pull` (it only downloads
   from `origin`, nothing is sent). If git complains about local changes, **stop** and tell
   the user; do not use `--force`, `reset --hard` or `stash` without asking.
   If the user downloaded a ZIP (no `.git`), ask them to download the new ZIP and unpack it over this folder
   (or into a new folder, and open Claude there); the steps below do not need git history.
2. **Read the installed record:** `<vault>/.neural-brain-kit.json`. If the file is missing,
   the vault was installed without a record: tell the user; every skill will then show up as `unknown`,
   which is treated as "possibly modified" (always `SKILL.new.md`).
3. **What changed?** Compare `plugin_version` / `kit_version` in the record with `plugin/manifest.json` and
   `package.json`. If `kit_commit` in the record is a real hash **and** this folder is a git clone, also run
   `git log --oneline <kit_commit>..HEAD` and `git diff --stat <kit_commit>..HEAD -- plugin vault-template`.
   Tell the user in 3–5 lines, in plain words, what is new. **Equal version numbers do not prove nothing changed**
   (the number is not raised for every fix): always run steps 4 and 5; they compare real file contents and are safe
   to repeat. Finish early only if the plugin step says every file is "already identical" and every skill is `current`.
4. **Plugin.** Obsidian must be closed (ask the user).
   ```bash
   node scripts/install-plugin.mjs "<vault>" --dry-run
   node scripts/install-plugin.mjs "<vault>"
   ```
   (or by hand: docs/PLUGIN.md → "Manual install": only the three files, do not touch `data.json`).
5. **Skills.** Ask the script what the state of each skill is:
   ```bash
   node scripts/kit-state.mjs skills "<vault>"
   ```
   It prints one status per skill, comparing the vault's copy with the kit's copy and with the hash recorded at
   install time (works for a ZIP too):
   - `current`: the same as the kit's. Nothing to do.
   - `update`: the vault's copy is untouched, the kit's is newer → replace it with the new one.
   - `modified`: the user changed it → put the new one alongside as `SKILL.new.md`, show the difference, let the user choose.
   - `unknown`: no recorded hash → treat as `modified`.
   - `new`: not in the vault yet → copy it.
   - a skill that was removed from the template → **do not delete it**, tell the user. (`kit-state skills` does not report this: compare the folder names in `vault-template/.claude/skills/` and in the vault's `.claude/skills/` yourself.)
   - After the user has decided on a `modified` skill: if they took the new version, first save theirs next to it as
     `SKILL.mine.md`, then put the new text into `SKILL.md`; if they kept theirs, leave `SKILL.md` alone. The
     temporary `SKILL.new.md` is then no longer needed: tell the user it can be deleted, but do not delete it yourself.
   - No Node? Treat every skill as `unknown` (always `SKILL.new.md` for any skill whose text differs).
6. **Schema.** Compare the new `vault-template/CLAUDE.md` with the user's schema (`CLAUDE.md` or `WIKI-SCHEMA.md`).
   If this folder is a git clone and `kit_commit` is known, `git diff <kit_commit>..HEAD -- vault-template/CLAUDE.md`
   shows exactly what the kit changed. Without git history (a ZIP) you can only compare the two files, and you cannot
   tell the user's edits from the kit's changes: show every difference and ask about each one. Show the changes in plain words, let the user decide which points to accept;
   merge the accepted ones into their schema **by hand, carefully, without losing their own additions** (their
   `**Wiki language:**` and `**File names in this vault:**` lines stay as they are).
7. **Record.** Refresh the record and add to the log (`log.md`, or `wiki-log.md`): `## [date] update | Neural Brain Kit <version>`.
   ```bash
   node scripts/kit-state.mjs record "<vault>"
   ```
   (mode and language are kept from the old record; a skill the user changed keeps its old hash on purpose, so it
   still shows as `modified` next time). Commit (if it is git) with the commit form of `docs/ORGANIZE.md` §1.4 (two separate commands:
   `git add -A -- . ':(exclude).obsidian' ':(exclude).trash'`, then `git commit -m "update: …"`, with the `-c user.name…`
   options if git has no identity). Without Node, edit the record by hand and set
   `updated`, `kit_version` and `plugin_version` (leave `skills` as it is).
8. **Tell the user:** restart Obsidian (or toggle the plugin off and on).

## `.neural-brain-kit.json`

A small record in the vault root (Obsidian does not show hidden files), written by `scripts/kit-state.mjs record`.

```json
{
  "kit_commit": "<git rev-parse HEAD in this repo, or null for a ZIP download>",
  "kit_version": "0.1.0",
  "plugin_version": "0.1.0",
  "installed": "2026-10-03",
  "updated": "2026-10-03",
  "language": "Spanish",
  "mode": "A",
  "skills": { "wiki-ingest": "<SHA-256 of the installed SKILL.md>", "…": "…" }
}
```

- `mode` is `A` (soft adoption), `B` (full reorganization) or `C` (a new vault made from the template).
- `language` is the wiki language chosen in `/setup`.
- `skills` holds the hash of every skill file as it was installed, so a later `/update` can tell whether the user
  changed a skill, with or without git.

The file contains nothing from your notes.

## If the update broke something

- The plugin: close Obsidian, replace `.obsidian/plugins/neural-brain/main.js` with the previous version
  (from a git clone: `git show <old_commit>:plugin/main.js`, write it into the file) or remove the plugin as described
  in docs/PLUGIN.md.
- The skills: the old copy is in git if the vault is a git repo (`git show`), and `SKILL.new.md` is always alongside.
- This process did not touch the notes, so they are safe.
