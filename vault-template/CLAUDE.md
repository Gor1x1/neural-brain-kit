# Wiki schema

This is the governing document of the knowledge base. It is built on Andrej
Karpathy's method ("LLM Wiki", April 2026). Any Claude session opened in this
folder must follow the rules written below.

> [!info] Root check
> This schema applies only at the root of its own folder. If the catalog
> (`index.md`) or `log.md` is missing, stop and tell the user: Claude is
> probably open in the wrong folder.

> [!note] If the user already had their own files
> The schema may be named `WIKI-SCHEMA.md` (the user's own `CLAUDE.md` was not
> overwritten), the catalog `wiki-index.md` (the user's own `index.md` was not
> overwritten), and the log `wiki-log.md` (the user's own `log.md` was not
> overwritten). In that case "`CLAUDE.md`", "`index.md`" and "`log.md`" below
> mean exactly those files. The skills read them the same way. The line below
> says which names apply here; `/setup` edits it when they differ.
>
> **File names in this vault:** schema = CLAUDE.md, catalog = index.md, log = log.md, templates = templates/

## Language

**Wiki language:** English

All wiki pages are written in the wiki language above, even when the source is
in another language. `/setup` replaces `English` with the language the user
chose (by default, the language they write in). Frontmatter keys and status
values (`draft`, `working`, `stable`, `outdated`) always stay in English,
because tools read them (as do the statuses `unprocessed`, `processed`,
`discarded` of inbox captures and `rejected` of dropped ideas). Section headings (`## Related`,
`## Concepts` and so on, in pages and in the catalog) are **not** read by any tool:
translate them into the wiki language.
At first mention, keep a term in the original in
parentheses: "inferencia (inference)" in a Spanish-language wiki.

<!-- /setup may change the "Wiki language" line above if the user chose another language -->

---

## 1. Three layers

The method is built on a compiler analogy: `raw/` is the source code, Claude is
the compiler, `wiki/` is the compiled output, `lint` is the tests, and queries
are execution.

| Layer | Folder | Who writes | Rule |
|---|---|---|---|
| Raw | `raw/` | the human; Claude only **adds** new source cards (`/wiki-ingest`) | **immutable.** Existing files are never edited, overwritten or deleted |
| Wiki | `wiki/` | only Claude | everything here is derived from `raw/` and conversations |
| Schema | `CLAUDE.md` | both | this file: changed deliberately, by agreement |

There are four more items at the root:

- `index.md` — the catalog of everything in the wiki
- `log.md` — a chronological log of operations (append-only)
- `inbox/` — quick captures that have not been processed yet (a file with no `status` line counts as `unprocessed`; processed or set-aside ones move to `inbox/processed/`)
- `templates/` — Obsidian templates (`wiki-templates/` if the user already had a templates folder)

**Iron rule.** Nothing in `raw/` is overwritten. If a source is wrong, record
that on the wiki page instead of correcting the raw file.

> [!note] One-time deposit
> When the user's old materials are moved into `raw/` (by the kit's `/organize`,
> run from the kit folder), that is a one-time deposit. After that, those files are immutable too.

---

## 2. Organizing pages

```
wiki/sources/    one page per digested source
wiki/concepts/   ideas, methods, techniques: anything that can be explained
wiki/entities/   people, companies, tools, products
wiki/projects/   the user's own projects
wiki/projects/drafts/   saved drafts of texts (`/wiki-draft`); lint does not count them as orphans
```

Other folders (for example, a journal, or the user's **old folders** that were
not moved) may exist at the root. They are not part of the method, and Claude
does not move or edit them without explicit permission.

**Old folders still hold knowledge.** If the catalog has an "Old folders" section,
read-only searches (`/wiki-query`, `/wiki-idea`, `/wiki-draft`) look there too when
the wiki itself has no answer. Say clearly that the answer comes from an
un-digested old note, and offer `/wiki-ingest` to bring it in.

### File names

- Lowercase, hyphens instead of spaces; letters of the wiki language are
  allowed: `wiki/concepts/sleep-hygiene.md`
- Source pages get a date prefix: `wiki/sources/2026-10-03-name.md`
- Raw cards get the **`src-` prefix**: `raw/src-2026-10-03-name.md`

> [!warning] Names are unique across the whole collection
> Obsidian resolves a `[[link]]` by file name, without the folder. Two files with
> the same name in different folders make the link ambiguous. That is why raw
> cards have `src-`: without it the card and the source page would be named
> the same. Before creating a new page, check that no file with that name
> exists yet.

- File name = page name. Do not rename a file without updating its links.
- Wrap link examples in documents in `backticks` or a code block; otherwise
  they become broken links and clutter the graph.

### Required header block of every page

```markdown
---
type: source | concept | entity | project
created: 2026-10-03
updated: 2026-10-03
tags: [tag1, tag2]
status: draft | working | stable | outdated
---

# Page title

One sentence explaining what this is. It goes word for word into index.md.
```

Keys (`type`, `created`, ...) and status values are always written in English:
tools read them. Other values (for example, tags) are written in the wiki
language. Optional: `pinned: true` or `accent: true` marks the page in the
Neural Brain graph as an important node.

What the statuses mean: `draft` is just written, not checked yet; `working` is in use and
checked against a source; `stable` is verified and has not needed changes for a while;
`outdated` has been refuted or replaced (the page stays, with a note on why).
`status: rejected` is used only on idea and project pages that were examined and
dropped (see `/wiki-idea`): the page stays, with the reason.

**`origin: user`.** A page with this key came from the user's own old notes
(the kit's `/organize` adds it). Its text is the user's: never rewrite it. When new facts
or links belong on such a page, only **append** them (a new section at the end,
for example `## Added from [[source]]`), and leave the existing text as it is.
Allowed on such a page: adding missing header keys (including `status: outdated`)
and appending a section or links at the end (for example in `## Related`).
Not allowed: rewriting, reordering or deleting anything the user wrote.

### Links

- Only Obsidian wiki-links: `[[file-name]]` or `[[file-name|label]]`. Not
  markdown links; otherwise the graph will not see them.
- Every page must have **at least one incoming link**, otherwise it is an
  orphan (`lint` catches this).
- At the bottom of every page: a `## Related` section with a list of links.

### Provenance: where a claim comes from

This is an addition to the method; without it a wiki rots. Every claim is
marked with where it comes from:

- `[[source]]` next to the fact, if it was taken from a specific source
- `> [!info] From conversation 2026-10-03` — if the user said it in conversation
- `> [!warning] Unverified` — if it is Claude's inference, not a fact from a source

Never mix a source's fact with your own inference without marking it.

### New page or edit an existing one

- A concept is mentioned in **three or more places** → create a separate page
- A source is digested → **always** a new page in `sources/`
- A new fact about an existing concept → **edit the existing page**, do not
  create a duplicate
- When in doubt, edit the existing page. Duplicates are worse than long pages.

---

## 3. Operations

The three main and three auxiliary operations are performed by skills
(`.claude/skills/`). A skill can be invoked as `/name` or in plain words.

| Operation | Skill | What it does |
|---|---|---|
| Digest a source | `/wiki-ingest` | article, link, document → raw card + source page + updated concepts |
| Ask the wiki | `/wiki-query` | an answer with links to the pages it came from |
| Health check | `/wiki-lint` | contradictions, outdated claims, orphans, broken links: report first, then fixes |
| Quick capture | `/wiki-capture` | a thought into `inbox/` in a second, without analysis |
| Develop an idea | `/wiki-idea` | testing an idea against accumulated knowledge |
| Assemble a text | `/wiki-draft` | a post/script/article from wiki material |

Detailed steps are in each skill's `SKILL.md`. General principles:

- **A human is required in ingest** (before writing the page, state 3–5 key
  takeaways and ask which of them matters to this particular user).
- **Do not invent in query:** if the wiki has no answer, simply say "the wiki
  does not have this."
- **Lint never fixes anything silently:** report first, then fixes with permission.

---

## 4. index.md

A content-oriented catalog divided into categories. Each line has a link, a
dash, and a one-line description taken from the page's header block.

```markdown
## Concepts
- [[sleep-hygiene]] — how to get good sleep without pills
```

It is updated **every time** a page is created or renamed. A mismatch between
index.md and the files is a defect that `lint` catches.

## 5. log.md

Append at the end only. Never edit earlier entries. The line format is strict,
so the log can be read with plain grep:

```markdown
## [2026-10-03] ingest | Source title
What changed: which pages were created/updated.
```

Action prefixes: `ingest`, `query`, `lint`, `capture`, `idea`, `draft`,
`organize`, `update`, `note`.

---

## 6. Working style

- **Do not bloat.** A 300-word page that gets read is better than a 3000-word
  one nobody opens.
- **Do not invent connections.** Put a link only if the connection is real.
- **Write so that it is clear a year later.** No "as we discussed above."
- **Show first, then do.** For bulk changes (more than 5 files), first give a
  list of what will change.
- **Git is insurance.** Commit after every finished operation:
  `ingest: name`, `lint: description`. Only if the folder is a git repository; otherwise skip it quietly.

  **The commit form** (every skill uses it): two separate commands, not joined with `&&`:
  ```bash
  git add -A -- . ':(exclude).obsidian' ':(exclude).trash'
  git commit -m "ingest: name"
  ```
  - If `.obsidian/` or `.trash/` is in `.gitignore`, `git add` prints "The following paths are ignored" and
    exits with 1, even though it staged everything else. That is harmless, so do not chain the commit with `&&`;
    check with `git status --short` and commit.
  - If the commit fails with "Author identity unknown" (git has no name or email on this machine), repeat it as
    `git -c user.name="Neural Brain Kit" -c user.email="kit@localhost" commit -m "…"`. Never change the
    global git settings.
- **The file name explains the content.** Not "continuing", but what is in it.

## 7. What not to do

- Do not edit, overwrite or delete anything that already exists in `raw/` (only `/wiki-ingest` adds new cards)
- Do not delete pages without explicit permission; only mark `status: outdated`
- Do not overwrite `log.md`
- Do not create a "just in case" page when there is no content
- Do not change the text of the user's old notes; a header block may only be
  **added** (never change existing keys)
- Do not touch the `.obsidian/`, `.git/`, `.trash/` folders (exception: `/setup`
  and `/update`, which work only with `.obsidian/plugins/neural-brain/` and
  `community-plugins.json`)
