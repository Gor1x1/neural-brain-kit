---
name: wiki-lint
description: "Knowledge base health check: contradictions, outdated claims, orphan pages, broken links, catalog mismatches. Use when the user says 'lint the wiki', 'check the wiki', 'check my knowledge base health', 'tidy up the base', 'run lint', 'what has gone stale', or 'clean up the knowledge base'."
---

# Lint — wiki health check

The wiki root is the folder where Claude is open. The schema is `CLAUDE.md`
(or `WIKI-SCHEMA.md`), the catalog is `index.md` (or `wiki-index.md`), the log is
`log.md` (or `wiki-log.md`); below, "`index.md`" means the catalog file, whatever
it is called (the schema's line "File names in this vault" says which). Run it
every 1–2 weeks or after a batch of new sources.

**Main rule: report first, then fixes. Never fix anything silently.**

## What to check

### Mechanics (fast, by script)

If bash is available (macOS/Linux, Git Bash):

```bash
grep -rho '\[\[[^]|#]*' wiki/ <catalog> | sed 's/\[\[//' | sort -u   # all links
find . -name '*.md' -not -path './.*' | sed 's|.*/||; s|\.md$||' | sort -u   # all notes in the vault
```

(`<catalog>` is `index.md`, or `wiki-index.md` if that is the catalog's name here.)
A link may point to a note **outside** `wiki/` (an old note the user did not move), so check links
against the notes of the whole vault, not only `wiki/`; orphans and catalog mismatches concern `wiki/` only.

If there is no bash, do the same with `Glob` and `Grep`. Keep in mind that links
inside code blocks and `backticks` are not real links.

- **Broken links.** A `[[name]]` with no matching file
- **Orphans.** A file in `wiki/` that nobody links to (saved drafts in `wiki/projects/drafts/` are not counted)
- **Catalog mismatches.** In `wiki/` but not in `index.md`, or the other way around
- **Empty pages.** The header block is there, the content is not
- **Broken header block.** `type`, `created`, `updated`, `tags` or `status` is missing
- **Duplicate file names** in different folders (they make links ambiguous)

### Meaning (slow, by reading)

This is the main reason lint exists. A script can do the mechanics, but not this:

- **Contradictions.** Two pages claim different things about the same subject. Resolve it
  in favor of the one that has a source, not the one that is more recent.
- **Rot.** A claim that a newer source has refuted, but the old page does not know about it.
- **Missing concepts.** A term appears in three or more places but has no page
  of its own: a candidate to split out.
- **Missed connections.** Two pages are obviously about the same thing but do not link to each other.
- **Gaps.** A declared topic with no content: an "Open questions" section that nobody has closed.
- **Unmarked provenance.** A confident claim with no source and no "unverified" note: the most dangerous thing that can happen in a base.

## Report

Group it by importance:

```
IMPORTANT   contradictions, claims without provenance
MINOR       outdated claims, broken links, catalog mismatches
TRIVIAL     orphans, missed connections, header block cosmetics
```

For each item: file, line, what the problem is, what is proposed.

## Fixes

Wait for the user's decision. Then:

- **Do not delete** pages: only `status: outdated` with a note on why
- After the fixes: a line in `log.md`: `## [date] lint | what was checked`
- Commit (if git), using the commit form of the schema §6: `lint: description`
