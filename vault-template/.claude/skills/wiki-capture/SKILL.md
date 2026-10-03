---
name: wiki-capture
description: "Quickly capture a thought, idea, link or observation into the knowledge base inbox without analyzing it now. Use when the user says 'capture this', 'save for later', 'note this down', 'drop it in the inbox', 'don't let me forget this', 'jot this down', or throws in a link with no explanation."
---

# Capture — quick note

The wiki root is the folder where Claude is open. Captures land in `inbox/`.
If the catalog is named `wiki-index.md` (the user had their own `index.md`),
then "`index.md`" below means that file; likewise "`log.md`" means `wiki-log.md`
if the user had their own `log.md`. The schema's line "File names in this vault"
says which names apply.

The point is **not to slow the user down**. A capture should take seconds and
require no decisions. Analysis comes later, with the `wiki-ingest` skill.

## How

One file per capture: `inbox/YYYY-MM-DD-HHMM-short-name.md`

```markdown
---
captured: 2026-10-03 14:32
status: unprocessed
source: link / conversation / thought
---

# What it's about

<the user's text verbatim; do not rephrase>

## Why it was captured

<if the user said why: write it; if not: leave it empty>
```

## Rules

- **Do not edit the user's wording.** A capture keeps the raw thought; combing it
  kills what it was written for.
- **Do not ask questions.** At most, clarify a single word if it is unclear what
  it relates to. The rest will be sorted out during analysis.
- **Do not build links and do not touch `index.md`.** The inbox is outside the wiki until it is analyzed.
- Add to `log.md`: `## [date] capture | short name`
- Reply in one line: where it was saved. Nothing else.

## Processing what has accumulated

If the user asks to "process the inbox," go through the files with
`status: unprocessed` (a file in `inbox/` with no `status` line, for example a scrap moved there
by `/organize`, counts as unprocessed too) and for each one ask: into the wiki, into a project, or
set aside. Digest the processed ones with `wiki-ingest`, then mark
`status: processed` and move them to `inbox/processed/`. Something set aside gets
`status: discarded` and goes to `inbox/processed/` as well: nothing is deleted.

If the inbox has grown past 20 files, say so without waiting to be asked.
