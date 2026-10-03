---
name: wiki-ingest
description: "Digest a source into the knowledge base using Karpathy's method: an article, link, video, PDF, document or conversation notes. Use when the user says 'ingest this', 'add to the wiki', 'process this source', 'put this in the wiki', 'save this to my knowledge base', 'study this and write it up', or sends a link asking for it to be analyzed."
---

# Ingest — digest a source

The wiki root is the folder where Claude is open. **First check that it contains
a schema (`CLAUDE.md` or `WIKI-SCHEMA.md`) and a catalog (`index.md` or
`wiki-index.md`), and read the schema, and only then write.** If they are
missing, stop and tell the user the folder is wrong. Below, "`CLAUDE.md`" and
"`index.md`" mean those two files, whatever they are called at the root; the
same goes for `log.md` (it may be `wiki-log.md`). The line "File names in this
vault" in the schema says which names apply.

## Steps

### 1. Get the source

- Link → `WebFetch`. If the content came back as a retelling and you need
  details, follow up on the same link with targeted questions.
- File on disk → read it. For a PDF, use the `pdf` skill if there is one.
- Conversation/thought → the conversation itself is the source.

### 2. Keep the raw material in `raw/`

File `raw/src-YYYY-MM-DD-short-name.md` with this header block: `url`, `author`,
`published`, `captured`, `type`, `language`. The `src-` prefix is mandatory:
without it the name would collide with the page in `wiki/sources/` and links
would become ambiguous.

**Do not copy someone else's text in full.** Keep a summary in your own words and
a link to the original. Quotes: short and in quotation marks. At the top of the
file put a note that this is a summary, not a copy.

> If the user provided their own file (PDF, document), copy it into `raw/` under
> its own name, as is, and create a card next to it in the format above.

### 3. Discuss with the user: do not skip

This is the only step where the method requires a human. Briefly state 3–5 key
takeaways and ask **which of them matters to this particular user** and for what
problem. The answer decides what goes onto the page and what does not.

If the user said outright "just save it, don't ask," skip the step, but note on
the page that the selection was not agreed with them.

### 4. Write the source page

`wiki/sources/YYYY-MM-DD-name.md` in the format from `CLAUDE.md`. Required:

- header block with `type: source`
- one sentence under the title: it goes word for word into `index.md`
- a link to the raw card in `raw/`
- provenance for every non-trivial claim
- a `## Related` section

### 5. Spread it across the wiki

This is what the method exists for; do not stop halfway:

- Every concept mentioned for the **third time** across the whole wiki gets its own page in `wiki/concepts/`
- People, companies, tools → `wiki/entities/`
- Existing pages that the new source touches: **update them.** Add the fact, put in a link.
  If the source contradicts what is written, do not delete the old text; record the contradiction explicitly.
  A page with `origin: user` in its header block is the user's own text: only **append**
  (a new section at the end), never rewrite or reorder what the user wrote
- Add backlinks so the new page does not stay an orphan

Before creating a new page, check (Glob `**/name.md`) that no file with that name exists yet.

### 6. Catalog and log

- `index.md` — add lines, update the counters in the header
- `log.md` — append at the end: `## [date] ingest | Title`

### 7. Commit (if the folder is a git repo)

Use the commit form from the schema (§6): two separate commands, not joined with `&&`
(`git add` can exit with 1 on harmless "paths are ignored" warnings):

```bash
git add -A -- . ':(exclude).obsidian' ':(exclude).trash'
git commit -m "ingest: title"
```

If the commit says "Author identity unknown", repeat it with
`git -c user.name="Neural Brain Kit" -c user.email="kit@localhost" commit -m "ingest: title"`.
If there is no git, skip it quietly.

## Report to the user

In one block: which pages were created, which were updated, which contradictions
came up, what the source lacked. Do not retell the source: it is already written.
