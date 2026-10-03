// Builds the Obsidian plugin (CJS, obsidian external) and the dev harness (browser bundle).
import esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';

const dev = process.argv.includes('dev');
const outDir = process.env.NB_OUT || path.join(import.meta.dirname, 'plugin');
fs.mkdirSync(outDir, { recursive: true });

const common = { bundle: true, target: 'es2021', logLevel: 'info', legalComments: 'none', minify: !dev, sourcemap: dev ? 'inline' : false };

const plugin = {
  ...common,
  entryPoints: ['src/main.ts'],
  outfile: path.join(outDir, 'main.js'),
  format: 'cjs',
  platform: 'browser',
  external: ['obsidian', 'electron'],
};
const harness = {
  ...common,
  minify: false,
  sourcemap: 'inline',
  entryPoints: ['dev/harness.ts'],
  outfile: 'dev/harness.js',
  format: 'iife',
  platform: 'browser',
};

await esbuild.build(plugin);
fs.copyFileSync('manifest.json', path.join(outDir, 'manifest.json'));
fs.copyFileSync('styles.css', path.join(outDir, 'styles.css'));
if (fs.existsSync('dev/harness.ts')) await esbuild.build(harness);
