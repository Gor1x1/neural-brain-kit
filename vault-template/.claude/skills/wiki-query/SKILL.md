---
name: wiki-query
description: "Answer a question from the personal knowledge base, with links to the pages. Use when the user asks 'what do we know about...', 'what have I written about...', 'ask the wiki', 'what do I know about...', 'search my wiki', 'check my notes', 'find it in the base', or asks a question whose answer might be in their wiki."
---

# Query — ask the wiki

The wiki root is the folder where Claude is open (it should contain a schema,
`CLAUDE.md` or `WIKI-SCHEMA.md`, and a catalog, `index.md` or `wiki-index.md`).
Below, "`index.md`" means the catalog file, whatever it is called, and "`log.md`"
means the log (`wiki-log.md` if the user had their own `log.md`); the schema's
line "File names in this vault" says which names apply.

## Steps

### 1. Find

Start with `index.md`: it is a catalog, and it gives a map faster than any
search. Then `Grep` inside `wiki/`. Look in `raw/` (the source cards, `src-*.md`) only when the wiki
has nothing: that is raw material, not conclusions, so say so if the answer comes from there. Search by synonyms too: the wiki may call a concept something
different from the question.

If `wiki/` has nothing and the catalog has an "Old folders" section, search those
folders too (read-only). An answer found there is the user's un-digested old
note: cite it, say so, and offer `/wiki-ingest` for it.

### 2. Read in full

Pages are read **in full**, not just the matching lines. The meaning is often in
the "Related" section and in the provenance notes, not in the paragraph that was
found. If the topic requires it, follow wiki-links one step deeper.

### 3. Answer

- Every claim gets a link to the page it was taken from
- Distinguish levels of confidence: present a source's fact, the user's own words and
  an "unverified" note differently; do not mix them
- If pages contradict each other, **show both versions and say that there is an
  inconsistency**; do not quietly pick one
- If the wiki has no answer, say so plainly: "the wiki does not have this." You may answer
  from general knowledge, but you must state that it is not from the base

### 4. Close the loop

If answering produced something that was not in the wiki, offer to create a page
or to extend an existing one. This is the difference from search: the base should
grow from use.

For a notable addition, add a line to `log.md`: `## [date] query | topic`.
