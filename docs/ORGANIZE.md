# Folder organization (ORGANIZE)

This is Claude's playbook: how to bring the user's existing notes and folders into the structure of Karpathy's method
(`raw/`, `wiki/`, `inbox/`), **without losing anything**.
The user can read it too: it lists everything Claude will do, and everything Claude will never do.

Helper scripts used below (all in `scripts/`, all need Node 18+; every one of them has a manual fallback):

| Script | What it does |
|---|---|
| `backup-vault.mjs` | verified backup next to the vault (§1.3) |
| `vault-scan.mjs` | read-only scan; `--snapshot` / `--compare` link and file checks (§2, §4B, §5) |
| `add-frontmatter.mjs` | adds a missing top block to wiki pages, body untouched (§6) |
| `install-plugin.mjs` | installs the Neural Brain plugin (`docs/PLUGIN.md`) |
| `kit-state.mjs` | records what was installed; later tells which skills the user changed (`docs/UPDATE.md`) |

---

## Iron rules

These do not loosen, even if the user says "just do it however you like".
In that case remind the user of the rule and propose a plan.

1. **Delete nothing.** No file, no folder (not even an empty one). Never empty `.trash/`.
2. **Do not change the text of a note.** The only thing allowed is **adding** a frontmatter block (the properties block at the very top of a note) at the start of a file (see §6).
3. **Read first, then plan, then the user's "yes", then action.** No move without an approved plan.
4. **Backup.** Before the first change: a copy of the whole vault **outside the vault**, plus verification.
5. **Do not touch** `.obsidian/` (except for installing the plugin: `scripts/install-plugin.mjs` writes only
   `plugins/neural-brain/` and `community-plugins.json`, which it copies to a `.bak-…` file first; and only for a new or
   never-opened-in-Obsidian folder it may create `.obsidian/` itself, with `--init`), `.git/`, `.trash/`, nor any
   non-md files (images, PDFs, attachments) without separate approval.
6. **Do not rename.** A file's name stays the same, otherwise links break. Exception: the user's direct request.
7. **In batches (up to 25 files; a whole folder counts as one batch, §4B.2), with a check.** After every batch: a link check.
8. **On error, stop**, tell the user what happened, and offer a rollback (§8).
9. **No push, no internet actions.** In this work git is only a local safety net.
10. **You do not click anything in Obsidian.** You only tell the user what to click.
11. **The target exists → do not overwrite it.** This goes for every file the kit would create (`CLAUDE.md`, `index.md`,
    `log.md`, `.gitignore`, a templates folder, a skill folder): use the alternate name from §4, or skip it and say so.

---

## 1. Preparation

### 1.1 Find the vault

Ask the user **where their folder with notes is**. Help find it (for example, look in `Documents` for a folder
that contains `.obsidian`). If there is no `.obsidian`, it is a plain folder;
Obsidian can open it as a vault, and that is fine.

Also ask (one sentence each, plain words):
- what this vault is for (study, work, a project, everything together),
- which language new wiki pages should be written in (default: the language the user writes in),
- whether the folder is synced through OneDrive/iCloud/Dropbox/Google Drive (see §9).

### 1.2 Close Obsidian

For mode B (with moves): ask the user to **close Obsidian** while the batches run.
Obsidian does not update links for moves made on disk
(`alwaysUpdateLinks` only works for moves made inside Obsidian).

### 1.3 Backup

```bash
node scripts/backup-vault.mjs "<vault>"
```

It copies the **whole** vault (hidden files and folders included) into a neighbouring folder
`<name>-backup-YYYY-MM-DD` (a `-2`, `-3`… suffix if that name is taken), refuses to put it inside the vault, and
**verifies** the copy: the same list of files, the same sizes, the same SHA-256 for every `.md` file.
It must end with `BACKUP OK`. Tell the user **where the backup is**.

No Node? Copy by hand and verify by hand:

```powershell
Copy-Item -Recurse -Force "<vault>" "<parent>\<name>-backup-2026-10-03"
(Get-ChildItem -Recurse -File -Force "<vault>").Count        # the same number in both folders
(Get-ChildItem -Recurse -File -Force "<backup>").Count
```
```bash
cp -a "<vault>" "<parent>/<name>-backup-2026-10-03"
find "<vault>" -type f | wc -l      # the same number in both folders
find "<backup>" -type f | wc -l
```

You **never delete** the backup; only the user will. If there is not enough space, ask the user.

### 1.4 git (safety net)

Look at `git status` first.

- It is already a git repository → if there are uncommitted changes, **ask** whether they can be committed as a
  "baseline"; do not do it silently. If someone else's changes show up in the middle of the work (the user kept
  editing), stop and ask before committing them.
- No git → offer it (with approval):
  ```bash
  git init
  git config core.autocrlf false      # otherwise git rewrites line endings of the user's notes
  ```
  Add a `.gitignore` from `vault-template/.gitignore` (if the vault has none), then the first commit:
  `baseline: before Neural Brain Kit`.
- **Always commit like this** ("the commit form"), so that plugins, keys and settings in `.obsidian/` and the
  user's `.trash/` never get into the history:
  ```bash
  git add -A -- . ':(exclude).obsidian' ':(exclude).trash'
  git commit -m "organize: …"
  ```
  Run these as **two separate commands, never joined with `&&`**: if `.obsidian/` or `.trash/` is listed in the
  `.gitignore`, `git add` prints "The following paths are ignored" and exits with 1 even though it staged everything
  else, and a chained commit would be silently skipped. After the commit, `git status --short` should show nothing but
  the excluded folders (`?? .obsidian/`, `?? .trash/`); that is expected.
- git is not installed → do not install it. Tell the user that in this case the verified backup (§1.3) is the only
  rollback, and go on without commits.
- If `git config user.name` or `git config user.email` prints nothing (a commit would say "Author identity unknown"), start with this form instead of trying a plain commit, and use it only for the
  commits of this work: `git -c user.name="Neural Brain Kit" -c user.email="kit@localhost" commit …`.
  Do not change the global settings. (The vault's skills use the same form.)
- Remember the hash of the baseline commit (`git rev-parse HEAD`); it is the rollback point.

---

## 2. Scan (read-only)

```bash
node scripts/vault-scan.mjs "<vault>" --snapshot auto
```

`--snapshot auto` writes the snapshot into the OS temp folder (never inside the vault or this kit) and keeps the
**first** one for this vault as the *baseline*; later you compare against it with `--compare baseline`.
The baseline belongs to **this** run of the work. In a later session (the vault has changed since), take a new
snapshot to a path of your own, as in mode B, instead of comparing with an old baseline.
The scan writes nothing into the vault. Hidden folders (`.obsidian`, `.git`, `.claude`…) are not counted, like in Obsidian.
If Node is missing (`node -v` gives an error), do not install it; do the same with `Glob`/`Grep` (folder tree, number
of md files, `[[links]]`), telling the user that the numbers are approximate.

Read the output carefully, especially these lines:

- **`PATH-DEPENDENT`**: Dataview queries by folder, `.canvas` files, the Daily notes folder, the Templates / Templater
  folder. Moving those folders breaks things (§3).
- **`Template name conflicts`**: notes the user already has that are named like a file the kit wants to create
  (`index`, `log`, `claude`, `source`, `concept`…). Those get the alternate names or are skipped (§4A).
- **Duplicate note names**: dangerous for `[[links]]`; they are left alone.

Also read (read-only):
- `.obsidian/app.json`: `newLinkFormat`, `useMarkdownLinks`, `alwaysUpdateLinks`
- `.obsidian/community-plugins.json` (Dataview, Templater, Daily notes…) and `.obsidian/daily-notes.json`
- the user's own `CLAUDE.md`, if there is one
- the beginnings of 10–15 notes **from different folders**, to understand what they are (a project? a class? a clipping? a journal?)

Tell the user in 5–8 lines, in plain words (not a wall of numbers): how many notes there are, what folders, what is good
(for example, lots of links), and what is a problem (for example, repeated names, broken links).

---

## 3. Plan (classification)

Ask which mode the user wants (§4) **first**, then show the plan for that mode:
in mode A the plan is the new folders plus the "Old folders" map; in mode B it is the list of moves below.

Classify **folder by folder**, not file by file. Moving a whole folder (with its internal
structure) is simpler to verify and to roll back. The one exception is a **mixed folder** (something like `Misc/` with
ideas, scraps, a canvas and a list in it): do not move it as a whole; list its notes one by one in the plan, and leave
whatever you are not sure about in place.

| Where | What goes there |
|---|---|
| `raw/` | **other people's or original material:** web clippings (Clippings, Readwise, Pocket), exports, transcripts of recordings, notes with a `source:`/`url:` frontmatter block. PDFs and other non-note files belong here by nature, but iron rule 5 applies: they move only if the user approves that **separately**; the default is that they stay where they are |
| `wiki/projects/` | the user's own projects, plans, goals |
| `wiki/concepts/` | the user's own notes about ideas, methods, topics (class notes usually go here) |
| `wiki/entities/` | people, companies, tools, products (`People/`, `Contacts/`) |
| `wiki/sources/` | **not moved.** New source pages are created only by `/wiki-ingest`. Exception: the user's own summary of a single book/article/course |
| `inbox/` | only junk that is clearly unfinished: notes named "Untitled…" and empty ones. A short note (under 200 bytes) is **not** junk by itself: it goes to the "Questions for you" list |
| (stays in place) | journals (`Daily/`, `Journal/`, notes named by date): a journal is not knowledge, it is a log; attachments (images, PDFs embedded in notes); template folders the user already uses with Templater or Obsidian's Templates |

For each folder write: **current path → new path, number of notes, reason in one line, confidence (high/medium/low)**.
Low confidence is not moved; it goes to the "Questions for you" list (up to 10 questions, grouped by folder, not by file).

**Collisions.** Before showing the plan, check:
- Does the move **create a new repeated name** (`Ideas.md` in two places)? If yes, you do not move those files;
  you ask the user. **Repeats that already exist** you leave
  in place, and you say that they are dangerous for links.
- Is the folder **tied to another tool:** Dataview queries (`FROM "Projects"`), the Daily Notes
  folder, the Templater templates folder, `.canvas` files (they link to notes by path).
  You do not move such folders without a separate word from the user; say what would break.

Show the plan to the user; they approve it **folder by folder** ("yes" / "no" / "somewhere else").

---

## 4. Two modes

Ask the user (in plain words) which one they want. The default, and your recommendation, is **A**.

### Mode A: soft adoption (default)

The old folders **do not move**. The structure is added alongside.

1. Create `raw/`, `wiki/{sources,concepts,entities,projects}/`, `inbox/` (whatever does not exist yet) by copying them
   from `vault-template/`, **with their hidden `.gitkeep` files** (that is what lets git keep an empty folder).
   If a folder with such a name already exists (in any letter case), use it; overwrite nothing.
2. Schema: copy `vault-template/CLAUDE.md` into the vault root:
   - **No `CLAUDE.md`** → copy it as `CLAUDE.md`.
   - **The user's `CLAUDE.md` exists** → do not overwrite it. Copy as `WIKI-SCHEMA.md` and, with the user's approval,
     add one line at the end of their `CLAUDE.md`: `@WIKI-SCHEMA.md` (show the change).
   - Set the `**Wiki language:**` line to the language the user chose.
3. Catalog and log: `index.md`, `log.md` from the template. **If the user already has one of them, do not overwrite it:**
   - `index.md` exists → install the catalog as `wiki-index.md`;
   - `log.md` exists → install the log as `wiki-log.md`.
   Do **not** search-and-replace file names inside the schema (a blind replace of `index.md` turns the existing
   `wiki-index.md` mentions into `wiki-wiki-index.md`). Instead, edit the single line
   `**File names in this vault:** …` in the copied schema so that it lists the names actually used, for example:
   ```
   **File names in this vault:** schema = WIKI-SCHEMA.md, catalog = wiki-index.md, log = wiki-log.md, templates = templates/
   ```
   Every skill reads the schema first and follows that line. Keep the `templates = …` part and change it in step 5
   if the templates folder gets another name.
4. In the catalog add one line under the title saying what the vault is for (the user's answer from §1.1), and a
   section **"Old folders"**: for each existing folder, one line (name, how many notes, what it is about, based on
   the §2 samples). It is a map, not `[[links]]` to pages that do not exist. Write these headings and lines in the
   **wiki language**; folder names and keys stay as they are. (The skills use this map to look in the old folders too.)
5. Templates: copy `vault-template/templates/*` into `<vault>/templates/`.
   - A file whose name is in the scan's **"Template name conflicts"** (the user already has a note `source.md`,
     `project.md`…) is **skipped**, and you tell the user (two files with one name make `[[links]]` ambiguous).
   - If the vault already has a templates folder under any case (`Templates/`, used by Obsidian's Templates or
     Templater), do **not** put the kit's files into it: use `wiki-templates/` instead, and change the `File names`
     line of the schema to `… templates = wiki-templates/`.
6. `.gitignore`: if the vault has none, copy `vault-template/.gitignore`. If it has one, **skip** it, show the user
   the lines the kit would have added, and ask. If they agree, append only the missing lines to their file (this is
   an addition, not an overwrite). The commit form of §1.4 already keeps `.obsidian/` and `.trash/` out of the history
   either way.
7. Skills: copy `vault-template/.claude/skills/*` to `<vault>/.claude/skills/`; do not overwrite an existing
   skill folder.
8. Log: append `## [date] organize | soft adoption: …` (what was added, what was left alone, where the backup is)
   to the log file. Do this **before** the commit, so that the whole adoption is one commit.
9. Record what was installed (`docs/UPDATE.md`; running it twice is harmless):
   ```bash
   node scripts/kit-state.mjs record "<vault>" --mode A --language "<wiki language>"
   ```
   It records a skill only if the vault's copy is exactly the kit's; one that was already there stays unrecorded.
10. Commit **once** (§1.4 form): `organize: soft adoption`. ("Nothing to commit" is fine, not an error.) Then do §5 (the numbers) and report (§7.5–7.6).

Afterwards the old notes are absorbed **as they are touched**: when the user works with an old note or
asks about it, offer to digest it (`/wiki-ingest`) or move it. You can switch to mode B
at any time: run `/organize` again (the structure is already there, so mode B starts at its step 1; see there).

### Mode B: full reorganization

Only with an **approved plan**, after the user's explicit word.

1. First do steps 1–10 of A (structure, schema, skills; it ends with its own commit, and you skip its report), then the
   moves. **Skip A's steps 1–7 if the kit is already installed** (the scan says `kit schema installed: yes`, or
   `<vault>/.neural-brain-kit.json` exists): a repeat of `/organize` must not copy, rename or append anything
   again (and skip step 8's log line too, unless something was really added). Do back up (§1.3) and take a **fresh snapshot** right before the
   first move, to compare against later:
   ```bash
   node scripts/vault-scan.mjs "<vault>" --snapshot auto
   ```
   It prints `Snapshot saved: <file>` (a new file in the OS temp folder, named by the vault and the time). Remember
   that path: it is the `<snapshot>` below.
2. Move **whole folders** (a folder is one batch, however many files it holds; it is easy to verify and to roll
   back, and it is the one exception to iron rule 7's 25-file limit) or batches of up to 25 files for anything else
   (a mixed folder, single files). For moving use plain
   `Move-Item` / `mv`: no renaming, no overwriting. If a file with that name already exists at the destination,
   **stop** (do not overwrite).
3. After every batch:
   ```bash
   node scripts/vault-scan.mjs "<vault>" --compare "<snapshot>"
   ```
   The verdict must be `OK`: no file lost or renamed, none of the previously working links broke (wikilinks, markdown
   links, canvas files), no Dataview folder lost notes, no new repeated name (new ones are named in the output).
   `PROBLEM` → stop, show what broke, offer to move that batch back.
4. **Markdown-style links** (`[text](path/file.md)`): these break after a move. The scan prints the list of them
   (`Markdown-style links to .md`); show it to the user and fix them **only with permission**: what changes is the
   link's path, not the note's text.
5. Commit after every batch (§1.4 form): `organize: batch N — <folder>`.
6. At the end: §6 (frontmatter, if the user wants it) and §7.

---

## 5. Sanity-check numbers

At the start and at the end of the work, compare with `vault-scan.mjs --compare` and tell the user the result:

- **files:** not fewer than before (soft adoption adds files, that is fine), and **lost or renamed: 0**
  (it lists any file that disappeared or changed its name; the number alone could hide a swap);
- **links:** none of the previously resolved links are broken, resolved links no fewer;
- **repeated names:** no more than before.

If a file was lost or a link broke, that is a problem: stop.

---

## 6. Adding frontmatter (optional)

Only with the user's approval and only to **wiki pages** (the `wiki/` folder); **never to files in `raw/`**.
Always through the script, which does it safely (it keeps the file's own line endings and BOM, never touches the body,
checks that the body is byte-for-byte the same, skips files that are not valid UTF-8):

```bash
# 1. dry run: prints what would change, writes nothing
node scripts/add-frontmatter.mjs "<vault>" wiki/concepts --type concept --origin user
# 2. after the user's yes
node scripts/add-frontmatter.mjs "<vault>" wiki/concepts --type concept --origin user --apply
```

- `--type` by folder: `concept`, `entity`, `project` (or `source`).
- `--origin user` adds `origin: user`: it marks pages that came from the **user's own old notes**. Later skills treat
  such pages carefully: facts and links are only **appended**, the user's text is never rewritten. Use it only on
  folders that hold the user's own notes (what you moved there from the old folders). Do not use it on a folder where
  Claude has written pages (for example after `/wiki-ingest`).
- The file has no frontmatter → the script adds `type`, `created` (file creation date), `updated` (modification date),
  `tags: []`, `status: draft`.
- Frontmatter already exists → it adds **only the missing keys** inside the same block and does not touch the existing ones.
- At most 25 files per run (`--limit`); run it again for the rest. Commit after each folder (§1.4 form):
  `organize: frontmatter — <folder>`.
- Do **not** write frontmatter by hand with PowerShell `Set-Content`/`Out-File`: they add a trailing line break and can
  change the encoding, which changes the note. Without Node, use the editor tool to insert the block at the very
  start of the file and leave everything else as it is.

---

## 7. Finishing

(Mode A already did items 1–4 in its own steps 4, 8, 9 and 10; do them here after mode B's moves, or after §6.)

1. Update the catalog (`index.md`, or `wiki-index.md`): add the moved pages in their categories with a one-line
   description (the note's first meaningful sentence).
2. Log (`log.md`, or `wiki-log.md`): `## [date] organize | what was done` (moved folders, numbers, where the backup is).
3. Refresh the record, with the mode that was really used: `node scripts/kit-state.mjs record "<vault>" --mode <A|B>`.
4. Commit (§1.4 form): `organize: finish`.
5. **Report to the user** (plain words): what was moved, what stayed in place and why, what questions are open,
   where the backup is, how to roll back, and the next steps (open Obsidian, enable Neural Brain,
   try `/wiki-capture`).
6. Finally, **after opening Obsidian** the user checks for themselves: the notes open, the links
   work. If something is wrong, they say so.

---

## 8. Rollback

On a problem, **stop** and tell the user what happened. Roll back only on their word. Start with `git status`:
if the user edited notes after the last commit, those edits are not in any commit yet. Offer to save them first as
a snapshot commit (`snapshot: your latest edits`, with the `-c user.name…` options of §1.4), with their consent; never discard them.

- **One batch (best):** `git log --oneline` → find that batch's commit → revert it. Always use the form below: git has no
  identity on a student's machine (§1.4 forbids changing the global settings), and the directory-rename detection
  can otherwise drag unrelated files around when later batches wrote into the same folders.
  ```bash
  git -c user.name="Neural Brain Kit" -c user.email="kit@localhost" -c merge.directoryRenames=false revert --no-edit <hash>
  ```
  History stays, and the other batches stay. If git reports a conflict (a later commit touched the same files, for
  example the catalog or the log, or the user edited a file after the batch added it), do **not** widen the revert to
  the newer commits: that would throw away the user's later edits. Resolve it by hand instead:
  ```bash
  git <the -c options> revert --abort
  git <the -c options> -c merge.directoryRenames=false revert --no-commit <hash>
  git status --short
  ```
  `UD` means "the batch added this file and the user edited it later": **keep the user's version**; it is already in
  the folder, so just run `git add <path>`. `UU`/`AA` (both sides changed): keep both and ask the user. Never `git rm`
  or `git checkout --` a file the user touched. When no conflicts are left, `git <the -c options> revert --continue
  --no-edit` (if it answers "nothing to commit", the revert became empty: run `git <the -c options> revert --skip`).
  Show the user what the result will undo before you finish.
  After a revert, the catalog and the log still describe the undone work: append a log line
  (`## [date] organize | rolled back batch N`) and, with the user's yes, fix the catalog lines.
- **Everything:** `git log --oneline` → the baseline commit (§1.4); **after the snapshot commit above, and showing the
  user what will be lost**, `git reset --hard <baseline>`. Do not delete new untracked files (`git clean`) without
  separate approval.
- **What stays after a rollback** (git cannot undo it, and we delete nothing): the plugin in `.obsidian/plugins/` and
  its entry in `community-plugins.json` (plus the `.bak` copy) and the backup folder. (git does not keep empty folders,
  so after a revert or a reset the folders the kit created may be gone too; the user's old folders are not touched.)
  `.neural-brain-kit.json` is in git, so a full rollback removes it. Say so; if the user wants the plugin gone too,
  follow "Remove the plugin" in `docs/PLUGIN.md`.
- **From the backup:** the user closes Obsidian, and you (with their permission) move the old folder
  aside (not delete it) and copy the backup into its place.

---

## 9. Edge cases

- **Cloud sync** (OneDrive, iCloud, Dropbox, Google Drive): moves can
  cause conflict copies. Ask the user to pause syncing while the batches run.
- **Large vault** (1500+ notes): work folder by folder, over several sessions; there is no need
  to try everything in one day.
- **Names that differ only by case** (they are the same on Windows/macOS): treat as a repeat.
- **Long paths** (Windows, 260+ characters) or **locked files:** do not force it, report it.
- **Symbolic links**, submodules with `.git` inside: do not touch.
- **Non-UTF-8 files:** do not add frontmatter, report it.
- **A note and a folder with the same name:** careful, the link is ambiguous.
- **Plugin folders** (`.obsidian/plugins/*`): never touch.
- **Node is older than 18 or missing:** every helper script refuses to run and says so. Do not install Node for the
  user. Manual fallbacks: backup → §1.3 commands; scan → `Glob`/`Grep` (§2); frontmatter → §6 (editor tool, insert only);
  plugin → `docs/PLUGIN.md` "Manual install"; the batch check (`--compare`) → count files and `[[links]]` before and after
  by hand and look for any file name that disappeared; skills state → treat every skill as `unknown` (`docs/UPDATE.md`).
- **The user has second thoughts:** this is normal; see §8.
