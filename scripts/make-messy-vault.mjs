// Builds a deliberately MESSY fake vault for testing /organize (never real data).
//   node scripts/make-messy-vault.mjs <outDir>
// Contains: non-ASCII names (Café-notes/), spaces in names, duplicate note names, untitled scraps, web clippings,
// date-named journal notes, markdown-style links, an unresolved link, a pre-existing CLAUDE.md, index.md, log.md
// and .gitignore, another community plugin, a Dataview query (FROM "Projects"), a Daily-notes folder setting,
// a Templates folder, a .canvas file, attachments, a .trash folder.
import fs from 'node:fs';
import path from 'node:path';

const out = process.argv[2];
if (!out) { console.error('Usage: node scripts/make-messy-vault.mjs <outDir>'); process.exit(1); }
const root = path.resolve(out);
if (fs.existsSync(root) && fs.readdirSync(root).length) { console.error(`${root} is not empty - refusing to write into it.`); process.exit(2); }

const put = (rel, text = '') => { const p = path.join(root, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, text, typeof text === 'string' ? 'utf8' : undefined); };
const clip = (n, url) => put(`Clippings/${n}.md`, `---\nsource: ${url}\nclipped: 2026-0${1 + (n.length % 8)}-1${n.length % 9}\n---\n# ${n}\n\nArticle excerpt (clipped from the web). ${n}. Two or three sentences about the material.\n`);

put('.obsidian/app.json', JSON.stringify({ alwaysUpdateLinks: true, newLinkFormat: 'shortest', useMarkdownLinks: false }, null, 2));
put('.obsidian/community-plugins.json', JSON.stringify(['dataview']));
put('.obsidian/plugins/dataview/manifest.json', JSON.stringify({ id: 'dataview', name: 'Dataview', version: '0.5.0' }));
put('.trash/old-deleted.md', '# deleted long ago\n');
put('CLAUDE.md', '# My own Claude notes\n\nAlways answer briefly. I study programming and languages.\n');
put('index.md', '# My index\n\nMy own table of contents.\n\n- [[Home]]\n- [[Plan]]\n- [[Reading list]]\n');

put('Home.md', '# Home\n\n- [[Lecture 1 - Intro]]\n- [[Plan]]\n- [[Reading list]]\n- [[Daily/2026-09-01]]\n- [[Ideas]]\n- [[Café menu]]\n- [[Missing page]]\n');
put('TODO.md', '- [ ] finish [[Plan]]\n- [ ] read clippings\n');

for (let i = 1; i <= 8; i++) {
  put(`Lectures/Lecture ${i} - ${['Intro', 'Variables', 'Loops', 'Functions', 'Files', 'Errors', 'Modules', 'Review'][i - 1]}.md`,
    `# Lecture ${i}\n\n## Notes\nSubject notes about the lesson. ${i > 1 ? `Previous: [[Lecture ${i - 1} - ${['Intro', 'Variables', 'Loops', 'Functions', 'Files', 'Errors', 'Modules', 'Review'][i - 2]}]]` : ''}\n\n## Questions\n`);
}
for (let d = 1; d <= 10; d++) {
  const day = String(d).padStart(2, '0');
  put(`Daily/2026-09-${day}.md`, `# 2026-09-${day}\n\nToday I learned ${d} new thing${d === 1 ? '' : 's'}. See [[Plan]]${d % 3 === 0 ? ' and [[Reading list]]' : ''}.\n`);
}
put('Projects/Plan.md', '---\ntitle: Plan\n---\n# Plan\n\n## Goals\nFinish the course.\n\n## Links\nSee [the ideas](../Misc/Ideas.md) and [[Lecture 8 - Review]].\n');
put('Projects/Ideas.md', '# Ideas (projects)\n\nProject ideas. [[Plan]]\n');
put('Projects/Website redesign.md', '---\ntags: [work]\n---\n# Website redesign\n\n## Scope\n## Status\nWaiting for feedback. [[Plan]]\n');
put('Projects/Old/Plan 2025.md', '# Plan 2025\n\nOld plan. See [[Plan]].\n');
put('Projects/Old/Budget.md', '# Budget\n\nMonthly expenses.\n');
put('Misc/Ideas.md', '# Ideas (misc)\n\nOther thoughts about studying.\n');
put('Misc/Untitled.md', 'todo?\n');
put('Misc/Untitled 1.md', 'a thought\n');
put('Misc/Reading list.md', '# Reading list\n\n- Thinking in Systems\n- Atomic Habits\n\nSee [the plan](Projects/Plan.md).\n');
put('Misc/Study methods.md', '# Study methods\n\n## Spaced repetition\n## Active recall\n[[Lecture 2 - Variables]]\n');
put('Misc/Mind map.canvas', JSON.stringify({
  nodes: [
    { id: 'n1', type: 'text', text: 'Learning', x: 0, y: 0, width: 200, height: 60 },
    { id: 'n2', type: 'file', file: 'Projects/Plan.md', x: 320, y: 0, width: 300, height: 200 },
  ],
  edges: [{ id: 'e1', fromNode: 'n1', toNode: 'n2' }],
}, null, 2));
put('People/Anna.md', '# Anna\n\nMentor. We meet every Friday. [[Plan]]\n');
put('Projects/Dashboard.md', '# Dashboard\n\n```dataview\nLIST FROM "Projects"\n```\n');
put('log.md', '# My log\n\nMy own running log.\n');
put('.gitignore', '.DS_Store\n');
put('.obsidian/daily-notes.json', JSON.stringify({ folder: 'Daily', format: 'YYYY-MM-DD' }));
put('Templates/Daily template.md', '# {{date}}\n\n## Today\n');
put('Café-notes/Café menu.md', '# Café menu\n\nNotes about a neighbourhood café. See [[Plan]].\n');
put('Café-notes/Résumé tips.md', '# Résumé tips\n\nKeep it to one page.\n');
clip('How spaced repetition works', 'https://example.org/spaced-repetition');
clip('Sleep and memory', 'https://example.org/sleep-memory');
clip('Intro to Python modules', 'https://example.org/python-modules');
clip('How to learn fast', 'https://example.org/learn-fast');
clip('Habit loops', 'https://example.org/habit-loops');
clip('Deep work summary', 'https://example.org/deep-work');
put('PDF/course-syllabus.pdf', Buffer.from('%PDF-1.4 fake syllabus\n'));
put('PDF/paper-memory.pdf', Buffer.from('%PDF-1.4 fake paper\n'));
put('Attachments/diagram.png', Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
put('Attachments/photo-board.png', Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
console.log(`messy vault written: ${root}`);
