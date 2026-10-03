# The Karpathy method in plain words

This explains **why** your vault is built the way it is and what Claude does with it.
The method's author is Andrej Karpathy ("LLM Wiki", April 2026). The original:
<https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f>. Below is a retelling in our own words,
as the method is applied in this kit.

## What problem it solves

The usual "ask your documents" approach digs the answer out of the pile of papers again every time:
knowledge is **never accumulated** anywhere. Karpathy proposes the opposite: the model digests a source
**once** and writes the result into a **persistent wiki**, and afterwards only refines it. The base is not
rebuilt on every question, it **grows**.

The main observation: the heavy part of maintaining a knowledge base is not reading and thinking, it is
**bookkeeping**: keeping links fresh, noticing when old and new information contradict each other, updating
summaries. People get tired of it within a month. For a model it is cheap work. What stays with you is
**choice and meaning**: what matters to you.

## Three layers

```
raw/    ←  your original material (articles, PDFs, clippings, transcripts of recordings)
wiki/   ←  the pages Claude writes and maintains, built from raw/ and from conversations
CLAUDE.md ← the rules Claude follows in your base
```

Think of a compiler: `raw/` is the source code, Claude is the compiler, `wiki/` is the compiled output,
checking (`lint`) is the tests, and your questions are the running program.

**`raw/` is immutable.** Claude reads there and only **adds** new source cards (when you digest a source); it never edits or deletes an existing file. If a source is wrong, that is written on a wiki page,
and the original material stays as it was. That way you can always go back to the original source.

Inside `wiki/` there are four kinds of page:

| Folder | What it is |
|---|---|
| `wiki/sources/` | one page per digested source (what it says, what matters to you) |
| `wiki/concepts/` | ideas, methods, topics: whatever can be explained |
| `wiki/entities/` | people, companies, tools, products |
| `wiki/projects/` | your own projects |

And three supporting items: `index.md` (the catalog of everything), `log.md` (what was done and when),
`inbox/` (quick captures not yet processed).

## Three operations and three helpers

| Skill | When | Result |
|---|---|---|
| `/wiki-ingest` | you send an article, a link, a PDF, or tell Claude something | raw card → source page → updated concepts → catalog and log |
| `/wiki-query` | you ask "what do I know about this" | an answer with links to the pages it came from; if the base has nothing, it **says so** |
| `/wiki-lint` | every 1–2 weeks | a report: contradictions, outdated material, orphan pages, broken links (report first, fixes only with your permission) |
| `/wiki-capture` | a thought came up and you don't want to stop | a note in `inbox/` in one second, no analysis |
| `/wiki-idea` | "I have an idea" | an honest check of the idea against what you have accumulated: the weak spot, what must be true, the first step |
| `/wiki-draft` | you need a post / script / article | a text built from your own material, with links to what it was built from |

**Why Claude asks you during ingest.** It is the one step where the method needs a human. Before digesting a
source, Claude states 3–5 takeaways and asks which of them matters to you (for what problem?). Your answer
decides what goes onto the page. Without it the base fills up with other people's conclusions.

## Provenance: where it came from

This is our addition to the method. Without it the wiki rots: Claude writes confidently, and three months
later you don't know whether something is a fact, your own words, or Claude's assumption. That is why
everything unverified is marked:

- `[[source]]` next to a fact: taken from a specific source
- `> [!info] From conversation 2026-10-03`: you said it
- `> [!warning] Unverified`: Claude's conclusion, not a fact from a source

## How it works day to day

- **Every day:** a thought → `/wiki-capture` (seconds).
- **When you have material:** `/wiki-ingest` (an article, a lesson, a book). Several sources: one at a time,
  not in a heap.
- **When you have a question:** `/wiki-query`, before searching the internet.
- **Every 1–2 weeks:** `/wiki-lint`. By Karpathy's observation, the system's value grows not with the amount
  of material ingested but with **how regularly it is checked**: without that the base turns into a dump,
  like a handwritten diary.
- **When you need to write:** `/wiki-draft`. A text built from your own notes is concrete.

## Honest limits

- The author tried it at the scale of about 100 sources, a few hundred pages and ~400,000 words: a "medium"
  size. There is no talk of millions of documents.
- It is not discussed how the method works when sources **systematically contradict** each other (competing
  opinions instead of facts). That is why provenance marks and lint matter.
- Claude can be wrong. The wiki is under your control: check important claims against the source (`raw/`).

## What we added in this kit

- **Provenance marks** (above).
- **The `src-` prefix** for raw cards: they don't coincide with source page names, so `[[links]]` don't
  become ambiguous.
- **Strict formats** for `index.md` and `log.md` (so they can be searched with grep).
- **Soft adoption:** old folders may stay where they are; the structure is added alongside (docs/ORGANIZE.md).
- **Neural Brain:** a visual map of the base in Obsidian (docs/PLUGIN.md).
