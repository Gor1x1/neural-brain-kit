// One command: README screenshots of the demo vault -> docs/img/*.png
//   npm run demo && node esbuild.mjs && npm run screenshots
// Starts the dev server if needed, plays four captures in headless Chrome, then stops what it started.
// Environment: NB_CHROME (browser path), NB_SHOTS (output folder, default docs/img), NB_SOFTWARE_GL=1 (SwiftShader).
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, ensureServer, launchBrowser, runSteps } from './shots-lib.mjs';

const outDir = path.resolve(process.env.NB_SHOTS || path.join(ROOT, 'docs', 'img'));

// --- preconditions: the dev page must show the DEMO vault, never somebody's real notes
for (const f of ['dev/graph.js', 'dev/harness.js']) {
  if (!fs.existsSync(path.join(ROOT, f))) {
    console.error(`Missing ${f}. Run:  npm run demo  &&  node esbuild.mjs`);
    process.exit(1);
  }
}
if (process.env.NB_ALLOW_ANY_GRAPH !== '1') {
  const g = JSON.parse(fs.readFileSync(path.join(ROOT, 'dev', 'graph.json'), 'utf8'));
  const isDemo = g.files.some((f) => f.path.startsWith('journal/')) && g.files.some((f) => f.path === 'index.md');
  if (!isDemo) {
    console.error('dev/graph.js does not look like the demo vault. Run `npm run demo` first (or set NB_ALLOW_ANY_GRAPH=1).');
    process.exit(1);
  }
}

// Zoom: fly the camera to one tight cluster (public API: window.engine.scene.flyTo(nodeIndex)).
// flyTo frames a node together with its farthest neighbour, so it needs a note whose links stay inside its own
// cluster: in the demo vault that is the study-materials index. Fallback: the best-connected note.
const ZOOM = `(() => {
  const e = window.engine, g = e && e.graph;
  if (!g || !e.scene || typeof e.scene.flyTo !== 'function') return 'no engine API';
  let best = g.ids.findIndex((id) => id.endsWith('/exercise-collection.md'));
  if (best < 0) {
    let bd = -1;
    for (let i = 0; i < g.n; i++) {
      if (g.kind[i] !== 0 || g.mega[i]) continue;
      if (g.degree[i] > bd) { bd = g.degree[i]; best = i; }
    }
  }
  if (best < 0) return 'no node';
  e.scene.flyTo(best);
  return g.ids[best];
})()`;

const CAPTURES = [
  { query: '', steps: [{ shot: 'neural' }] },
  { query: '?mode=daily', steps: [{ shot: 'daily' }] },
  { query: '?panel=1', steps: [{ shot: 'panel' }] },
  { query: '', steps: [{ eval: ZOOM }, { wait: 5500 }, { shot: 'zoom' }] },
];

const stopServer = await ensureServer();
const browser = await launchBrowser(1600, 900);
const written = [];
try {
  for (const c of CAPTURES) {
    console.log(`--- ${c.query || '(neural)'} ${c.steps.map((s) => s.shot || '').join('')}`);
    written.push(...(await runSteps(browser, { w: 1600, h: 900, initialWait: 7000, ...c }, outDir)));
  }
} finally {
  await browser.close();
  stopServer();
}
console.log('\nWritten:');
for (const f of written) {
  const kb = fs.statSync(f).size / 1024;
  console.log(`  ${path.relative(ROOT, f)}  ${kb.toFixed(0)} KB${kb > 1500 ? '  (larger than 1.5 MB!)' : ''}`);
}
