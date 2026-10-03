// Shared helpers for the screenshot scripts: find Chrome, launch it with a real GPU, make sure the
// dev server is up, and play a list of "steps" against the dev page in one headless session.
//
// Environment:
//   NB_CHROME       full path to a Chrome / Chromium / Edge executable (otherwise standard locations are tried)
//   NB_SOFTWARE_GL  set to 1 to force the software WebGL fallback (SwiftShader) when the GPU is unavailable
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import puppeteer from 'puppeteer-core';

export const ROOT = path.resolve(import.meta.dirname, '..');
export const BASE = 'http://127.0.0.1:8765';

export function findChrome() {
  const env = process.env.NB_CHROME;
  if (env) {
    if (!fs.existsSync(env)) throw new Error(`NB_CHROME points to a missing file: ${env}`);
    return env;
  }
  const e = process.env;
  const candidates = {
    win32: [
      path.join(e.PROGRAMFILES || 'C:\\Program Files', 'Google/Chrome/Application/chrome.exe'),
      path.join(e['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)', 'Google/Chrome/Application/chrome.exe'),
      path.join(e.LOCALAPPDATA || '', 'Google/Chrome/Application/chrome.exe'),
      path.join(e['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)', 'Microsoft/Edge/Application/msedge.exe'),
      path.join(e.PROGRAMFILES || 'C:\\Program Files', 'Microsoft/Edge/Application/msedge.exe'),
    ],
    darwin: [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    ],
    linux: [
      '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser',
      '/snap/bin/chromium', '/usr/bin/microsoft-edge',
    ],
  };
  const list = candidates[process.platform] || candidates.linux;
  const hit = list.find((p) => p && fs.existsSync(p));
  if (!hit) throw new Error('Chrome not found. Set the NB_CHROME environment variable to the path of a Chrome/Chromium executable.');
  return hit;
}

export async function launchBrowser(w, h) {
  const software = process.env.NB_SOFTWARE_GL === '1';
  const gpu = software
    ? ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']
    : process.platform === 'win32'
      ? ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist']
      : ['--enable-gpu', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader'];
  return puppeteer.launch({
    executablePath: findChrome(),
    headless: true,
    args: [...gpu, `--window-size=${w},${h}`, '--hide-scrollbars'],
    defaultViewport: { width: w, height: h },
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function ping() {
  try { return (await fetch(`${BASE}/dev/index.html`)).ok; } catch { return false; }
}

/** Starts scripts/serve.mjs unless something already answers on the port. Returns a stop() function. */
export async function ensureServer() {
  if (await ping()) return () => {};
  const child = spawn(process.execPath, [path.join(ROOT, 'scripts', 'serve.mjs')], { stdio: 'ignore', windowsHide: true });
  let exited = false;
  child.on('exit', () => { exited = true; });
  for (let i = 0; i < 50; i++) {
    if (await ping()) return () => { if (!exited) child.kill(); };
    if (exited) break;
    await sleep(200);
  }
  child.kill();
  throw new Error(`Could not start the dev server on ${BASE} (is the port busy?)`);
}

/**
 * Opens a fresh page, waits for the graph, then plays cfg.steps = [{ eval?, wait?, pixel?, shot? }].
 * cfg = { query?: "?mode=daily", w?, h?, initialWait?: ms after the graph is ready (default 6000), steps: [...] }
 * Returns the list of PNG files written.
 */
export async function runSteps(browser, cfg, outDir) {
  const W = cfg.w || 1600, H = cfg.h || 900;
  fs.mkdirSync(outDir, { recursive: true });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H });
  const logs = [];
  page.on('console', (m) => { if (!/404/.test(m.text())) logs.push(`[${m.type()}] ${m.text()}`); });
  page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));
  page.on('requestfailed', (r) => { if (!/favicon/.test(r.url())) logs.push(`[requestfailed] ${r.url()}`); });
  await page.goto(`${BASE}/dev/index.html${cfg.query || ''}`);

  const gl = await page.evaluate(() => {
    const c = document.createElement('canvas');
    const ctx = c.getContext('webgl2') || c.getContext('webgl');
    if (!ctx) return null;
    const ext = ctx.getExtension('WEBGL_debug_renderer_info');
    return ext ? ctx.getParameter(ext.UNMASKED_RENDERER_WEBGL) : 'webgl (renderer hidden)';
  });
  console.log(`webgl: ${gl ?? 'NOT AVAILABLE'}`);

  // wait until the layout is finished and the graph is handed to the scene, then let the intro play out
  try {
    await page.waitForFunction('!!(window.engine && window.engine.graph)', { timeout: 60000, polling: 250 });
  } catch {
    console.log('warning: the graph was not ready after 60 s');
  }
  await sleep(cfg.initialWait ?? 6000);

  const written = [];
  for (const st of cfg.steps || []) {
    if (st.eval) {
      const r = await page.evaluate(st.eval);
      if (r !== undefined) console.log('eval =>', JSON.stringify(r));
    }
    if (st.wait) await sleep(st.wait);
    if (st.pixel) {
      const b64 = await page.screenshot({ encoding: 'base64' });
      const px = await page.evaluate(async (data, pts) => {
        const img = new Image(); img.src = 'data:image/png;base64,' + data; await img.decode();
        const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
        const x = c.getContext('2d'); x.drawImage(img, 0, 0);
        return pts.map(([a, b]) => Array.from(x.getImageData(a, b, 1, 1).data).slice(0, 3));
      }, b64, st.pixel);
      console.log('pixel', JSON.stringify(st.pixel), '=>', JSON.stringify(px));
    }
    if (st.shot) {
      const file = path.join(outDir, `${st.shot}.png`);
      await page.screenshot({ path: file });
      written.push(file);
      console.log(`shot ${st.shot} (${(fs.statSync(file).size / 1024).toFixed(0)} KB)`);
    }
  }
  console.log(logs.slice(0, 30).join('\n') || '(no console output)');
  await page.close();
  return written;
}
