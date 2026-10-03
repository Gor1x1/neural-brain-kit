---
name: wiki-idea
description: "Develop a raw idea against the personal knowledge base: find what is related, honestly stress-test it, and shape it into a project page. Use when the user says 'I have an idea', 'here's an idea', 'help me think through', 'brainstorm with me', 'think this through with me', 'is this worth doing', 'help me flesh this out', or 'develop this idea'."
---

# Idea — develop an idea against the base

The wiki root is the folder where Claude is open. The catalog is `index.md`
(or `wiki-index.md`); below, "`index.md`" means the catalog file, whatever it is called,
and "`log.md`" means the log (`wiki-log.md` if the user had their own `log.md`); the schema's
line "File names in this vault" says which names apply.

The point of this skill: an idea checked against accumulated knowledge is much
better than one invented from a blank page. Here the wiki is not an archive but
a conversation partner.

## Steps

### 1. Hear the idea out

Let the user finish. **Do not start evaluating from the first sentence:** a raw idea
almost always sounds bad, worse than it is. If the wording is blurry, ask one
question: "what should come out at the end?"

### 2. Pull up what is related from the wiki

- `index.md`, then `Grep` in `wiki/` by the topic, neighboring topics and synonyms
- Look at `wiki/projects/` separately: does it overlap with work already in progress?
- Look at `inbox/` separately: pieces of this same thought may be sitting there

Show what you found: "here is what you already have on the topic." Often half of
the idea was already thought through a month ago.

### 3. Stress-test it: honestly

This is the valuable part; do not skip it and do not soften it:

- **What in the wiki contradicts this.** Name the pages directly, if there are any
- **What has already been tried.** Check `log.md` and the project pages
- **Where the weakest spot is.** One, the main one, not a list of ten small things
- **What must be true for the idea to work.** Explicit assumptions
- **What the base lacks in order to settle it.** Put this as a question, not as a reason to postpone

Neither go along with it nor demolish it. The goal: after the analysis, the user
understands the idea better than before.

### 4. Shape it

Only if the idea held up and the user wants to keep it:

`wiki/projects/idea-name.md` with `type: project`, `status: draft`.

```markdown
# Title

One sentence: what this is and why.

## Where it grew from
Links to the wiki pages the idea was assembled from.

## How it should work
## Assumptions: what must be true
## Weak spot
## First step
One concrete action that can be done this week.

## Related
```

Put links **in both directions**: from the new page to its sources, and from the
affected pages to the new one.

### 5. Record it

- `index.md` — a line in the "Projects" section
- `log.md` — `## [date] idea | title`
- Commit (if git), using the commit form of the schema §6: `idea: title`

## If the idea did not hold up

Write it down anyway: in `wiki/projects/` with `status: rejected` and a "Why it
did not work" section. Rejected ideas save time when the same thought comes back
half a year later.
