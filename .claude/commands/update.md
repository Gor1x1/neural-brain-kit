---
description: Update the Neural Brain plugin and skills to the new version without touching your notes
---

Run **`/update`** following `docs/UPDATE.md`. Read it in full before doing anything.

Sequence: check that this repo is up to date (`git pull` with the user's permission, or a fresh ZIP) → compare the
installed version with `.neural-brain-kit.json` → update the plugin (`scripts/install-plugin.mjs`; `data.json` and
`layout-*.json` are not touched) → skills: `node scripts/kit-state.mjs skills "<vault>"`, replace only the unmodified
ones, put `SKILL.new.md` next to the modified ones → never overwrite the schema, only show the difference →
`node scripts/kit-state.mjs record "<vault>"` and a new line in the log (`log.md`, or `wiki-log.md`).

Iron rules: do not touch the notes, delete nothing, do not change `origin`, no push.
Speak the user's language, in plain words. Extra instructions: $ARGUMENTS
