// Multi-step screenshots of the dev page in one headless session.
// Usage: node scripts/shots.mjs <steps.json>
//   steps.json = { "query": "?panel=1", "w": 1600, "h": 900, "initialWait": 6000,
//                  "steps": [ { "eval": "js", "wait": 1500, "shot": "name" } ] }
// Output folder: NB_SHOTS, or ./.shots. Chrome: NB_CHROME (see shots-lib.mjs).
// The dev page needs dev/graph.js and dev/harness.js (npm run demo && node esbuild.mjs); the dev server is
// started automatically when it is not running.
import fs from 'node:fs';
import path from 'node:path';
import { ensureServer, launchBrowser, runSteps } from './shots-lib.mjs';

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/shots.mjs <steps.json>');
  process.exit(1);
}
const cfg = JSON.parse(fs.readFileSync(file, 'utf8'));
const outDir = path.resolve(process.env.NB_SHOTS || './.shots');

const stopServer = await ensureServer();
const browser = await launchBrowser(cfg.w || 1600, cfg.h || 900);
try {
  await runSteps(browser, cfg, outDir);
} finally {
  await browser.close();
  stopServer();
}
