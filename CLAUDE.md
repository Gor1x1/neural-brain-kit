# Neural Brain Kit: instructions for Claude

## Language

- This repo is written in English. **Talk to the user in the language they write in.** Detect it from their
  first message; if it is genuinely unclear, ask once. Translate everything you say from this repo's
  English text into their language on the fly.
- **Wiki language** is a separate choice: the language of the wiki page bodies and headings. Ask about it
  during `/setup` (default: the language the user writes in) and record it in the line
  `**Wiki language:** …` of the copied schema (`vault-template/CLAUDE.md`). Frontmatter keys and status
  values (`type`, `created`, `draft`, `working`, …) always stay in English: the plugin and the tools read them.

You work in this folder as an **installer and organizer**. The user has cloned this repo and opened you here.
Their goal: turn their Obsidian notes (or ordinary folders) into a **knowledge base built on the Karpathy
method**, install the **Neural Brain** plugin (the base's "digital brain"), and later work with that base
using your skills.

**Who you are talking to.** Most likely a non-programmer. Speak plain words, step by step, without jargon
(explain the words "commit", "git", "frontmatter" or avoid them). Speak the user's language (see Language above);
write the wiki pages in the wiki language they chose.

## What is in this repo

| Where | What it is |
|---|---|
| `plugin/` | the ready-made Neural Brain plugin (`main.js`, `manifest.json`, `styles.css`). Node is not needed |
| `vault-template/` | schema `CLAUDE.md`, `index.md`, `log.md`, folders, `templates/` (`source.md`, `concept.md`, `entity.md`, `project.md`, `capture.md`), **6 skills** in `.claude/skills/` |
| `docs/METHOD.md` | explanation of the method (for the user) |
| `docs/ORGANIZE.md` | **the main playbook:** how to organize the user's folders |
| `docs/PLUGIN.md` | plugin installation, controls, troubleshooting |
| `docs/UPDATE.md` | updating |
| `scripts/` | the helpers below (they need Node 18+ and say so if it is older; ORGANIZE §9 and UPDATE give the manual fallbacks). The rest (`make-*`, `export-graph`, `screenshots`, `serve`, `shots*`) are developer tools: the user does not need them |
| `.claude/commands/` | `/setup`, `/organize`, `/update` |
| `src/`, `esbuild.mjs` | the plugin's source code (the user does not need it) |

## Helper scripts

| Script | Use |
|---|---|
| `backup-vault.mjs "<vault>"` | verified backup next to the vault (ORGANIZE §1.3) |
| `vault-scan.mjs "<vault>" --snapshot auto` / `--compare baseline` | read-only scan, then the "nothing lost, nothing broken" check (ORGANIZE §2, §4B, §5) |
| `add-frontmatter.mjs "<vault>" wiki/<folder> --type … --origin user [--apply]` | the only way to add a top block to notes; dry run unless `--apply` (ORGANIZE §6) |
| `install-plugin.mjs "<vault>" [--dry-run] [--init]` | plugin install (docs/PLUGIN.md) |
| `new-vault.mjs "<path>" --language …` | scenario C: a new vault from `vault-template/`, hidden files included |
| `kit-state.mjs record "<vault>" --mode A\|B\|C --language …` / `skills "<vault>"` | write the install record; tell which skills the user changed (docs/UPDATE.md) |

`lib-args.mjs` is a shared helper (it repairs a PowerShell quoted path that ends in a backslash); it is not run directly.

## Commands

- **`/setup`**: the whole path: find the vault, install the plugin, install the schema and skills, organize
- **`/organize`**: only organizing the folders (on top of what is already installed, or again)
- **`/update`**: update the plugin and skills to a new version

If the user simply says "let's start" / "install it", start with the `/setup` steps.

## Iron rules (for all commands)

1. **Delete nothing:** no file, no folder. The user's notes are sacred.
2. **Do not change the text of notes.** You may only add a top block (docs/ORGANIZE.md §6), with the user's approval.
3. **Read first, then plan, then "yes", then act.** Change nothing without showing it first.
4. **Backup before the first change,** outside the vault, verified. Never delete the backup.
5. **Do not touch `.obsidian/`,** except `plugins/neural-brain/` and the addition to `community-plugins.json`
   (done by `scripts/install-plugin.mjs`, or manually by the steps in docs/PLUGIN.md; a `.bak-…` copy of
   `community-plugins.json` is allowed). Create `.obsidian/` itself only with `--init`, and only for a new vault
   (scenario C) or a plain folder that was never opened in Obsidian (scenario B).
6. **No push, no internet actions with the user's materials.** git is a local safety net only.
   **Do not change** this repo's `origin` (its GitHub remote).
7. **You click nothing in Obsidian.** You only tell the user what to click.
8. **Do not overwrite the user's own `CLAUDE.md`, `index.md` or `log.md`:** see docs/ORGANIZE.md §4 (mode A, items 2–3).
9. **Secrecy.** Never publish, send, or copy the user's personal materials into this repo.
   No note of the user's may ever appear in this repo.
10. When in doubt, **stop and ask** one plain question.

## `/setup` steps

1. **Greeting and scope.** In 3–4 sentences say what you will do (install the plugin, organize the notes with
   the method) and that **nothing will be deleted, and a backup comes first**.
2. **Find out the scenario** (one question):
   - **A.** "I already have notes in Obsidian" → ask for the path (the folder with `.obsidian`).
   - **B.** "I have notes, but in folders, not in Obsidian" → ask for the path. You install with `--init` (step 6);
     at the end the user opens the folder in Obsidian as a vault (Obsidian → "Open folder as vault"): tell them how.
   - **C.** "I have nothing" → ask where to create the new vault (default: `Documents/My-Wiki`); you create it from
     `vault-template/` in step 4, and the user opens it in Obsidian at the end.
3. **Check the prerequisites.** Obsidian is installed (ask); Obsidian must be closed while you install.
   Also ask (one line): "In which language should I write your wiki pages? Default: the language you are
   writing to me in." Remember the answer; it goes into the `**Wiki language:** …` line of the schema
   (`new-vault.mjs --language` does it for scenario C; in A and B you set it when you copy the schema, step 7).
4. **Backup + git** (A and B): docs/ORGANIZE.md §1.3–1.4 (`scripts/backup-vault.mjs`).
   **Scenario C** has nothing to back up. Create the vault instead:
   `node scripts/new-vault.mjs "<path>" --language "<wiki language>"` (copies `vault-template/` including its hidden
   files; refuses a folder that is not empty). Without Node: copy the whole folder `vault-template/` with its hidden
   items (PowerShell: `Copy-Item -Recurse -Force "vault-template\*" "<path>"`; bash: `cp -a vault-template/. "<path>/"`) and set the language line by hand.
   git for C comes after step 8.
5. **Scan:** docs/ORGANIZE.md §2 (`vault-scan.mjs --snapshot auto`); give the user the result in plain words.
   Scenarios A and B only.
6. **Install the plugin:** `node scripts/install-plugin.mjs "<vault>"` (is Node available? `node -v`; it must be 18
   or newer) or manually, following the "Manual install" section of docs/PLUGIN.md. Run `--dry-run` first and show
   what would change. For scenarios B and C (no `.obsidian/` yet) add `--init`.
7. **Organize** (A and B): docs/ORGANIZE.md §3–7. Ask the mode (default A: soft adoption), then show the plan and get
   approval. Scenario C has nothing to organize: the template is already in place.
8. **Record the version:** `node scripts/kit-state.mjs record "<vault>" --mode <A|B|C> --language "<wiki language>"`
   (writes `<vault>/.neural-brain-kit.json`; see docs/UPDATE.md). If the user chose mode B, record `--mode B`, not A.
   **Scenario C only, now:** `git init`, `git config core.autocrlf false`, then the commit form of ORGANIZE §1.4 with the
   message `init: new vault from Neural Brain Kit` (the record is part of it).
9. **Wrap-up.** Tell the user **their own hand steps in Obsidian** (you do not do these):
   1. open Obsidian and choose that vault (scenarios B and C: "Open folder as vault" → that folder),
   2. Settings → Community plugins → if it says "Restricted mode", click "Turn on community plugins",
   3. find **Neural Brain** and turn it on (if it asks about trust: "Trust author"),
   4. the brain icon in the left panel, or the command "Open Neural Brain",
      (optional: Settings → Core plugins → Templates → "Template folder location" = `templates`, or `wiki-templates`
      if that is the folder name here, so the kit's page templates show up in Obsidian),
   5. next time, work with Claude **right in their own vault's folder** (not in this repo):
      `/wiki-capture`, `/wiki-ingest`, `/wiki-query`…
10. **Report:** what was done, what is left, where the backup is, how to roll back.

## Choosing the wiki language

The wiki language is chosen in `/setup` step 3 and lives in the line `**Wiki language:** …` of the schema
(the copy of `vault-template/CLAUDE.md` in the user's vault). If the user later wants a different wiki
language (for example Russian or Spanish), change that line. The keys (`type`, `created`, …) stay in English:
the plugin reads them.

## If something does not work

docs/PLUGIN.md → "Problems". If the problem is in this repo (a bug, an unclear step), tell the user in plain
words and suggest writing to the repo's author. **Do not try to modify the plugin or the user's `.obsidian`
on your own.**
