---
name: wiki-draft
description: "Assemble a text (post, script, article, letter, description) from the personal knowledge base, with links to the pages used. Use when the user says 'write a post about', 'draft an article', 'make a script from my notes', 'write this up as a text', 'turn this into an article', or 'write it from our notes'."
---

# Draft — assemble a text from the wiki

The wiki root is the folder where Claude is open. The schema is `CLAUDE.md` (or
`WIKI-SCHEMA.md`), the catalog is `index.md` (or `wiki-index.md`); below,
"`index.md`" means the catalog file, whatever it is called, and "`log.md`" means
the log (`wiki-log.md` if the user had their own `log.md`); the schema's line
"File names in this vault" says which names apply.

The point: a knowledge base should not only accumulate, it should also **give**.
A text assembled from your own verified notes comes out more concrete, with
details that people writing from a blank page do not have.

## Steps

### 1. Pin down the scope: briefly

No more than three questions: **who it is for**, **how long**, **where it will
be published**. If the user has already said, do not repeat the question.

### 2. Gather the material

- `index.md` → the pages you need → read them in full
- Pull out the concrete: numbers, cases, mistakes, details. **This is the wiki's
  main value for a text:** a model writes general reasoning without the base too,
  while the user's own cases exist only here
- Note what is missing for the text, and say so before writing

### 3. Write

- Language: the wiki language set in the schema (`**Wiki language:**`), unless told otherwise
- Start with the concrete, not with "in the modern world"
- The wiki's personal experience goes first; cut the generalities
- Do not carry `[!warning] Unverified` notes into the text as fact. Either verify or do not use them
- Length: as agreed; do not stretch it

### 4. Show the provenance

Under the text, a service block for the user (not part of the publication):

```
Assembled from: [[page-1]], [[page-2]]
Not enough: what exactly is missing in the base
Unverified: claims that must be confirmed before publishing
```

### 5. Save

The finished text goes to `wiki/projects/drafts/YYYY-MM-DD-name.md` with the usual header block
(`type: project`, `status: draft`) and a `## Related` section linking the pages it was assembled from.
Drafts are saved too: half a year later they are more useful than they seem.

- `index.md`: a line in the "Projects" section (a draft is a page like any other)
- `log.md` — `## [date] draft | title`
- Commit (if git), using the commit form of the schema §6: `draft: title`

### 6. Close the loop

If, while writing, it turned out that the base has a hole, offer to fill it with
`wiki-ingest` or `wiki-capture`. Writing a text is the best way to discover what
you do not actually know.
