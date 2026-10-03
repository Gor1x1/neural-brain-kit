// Standalone dev harness: same Engine as the plugin, fed from dev/graph.js
// (exported from the real vault) so visuals can be iterated in a plain browser.
import { Engine } from '../src/engine';
import { mergeSettings } from '../src/settings';
import type { RawVault } from '../src/types';

declare global { interface Window { __GRAPH__: RawVault; engine: Engine } }

const root = document.getElementById('root')!;
root.className = 'nb-root';
const params = new URLSearchParams(location.search);
const settings = mergeSettings(null);
if (params.get('mode') === 'daily') settings.mode = 'daily';
settings.panelOpen = params.get('panel') === '1';

const engine = new Engine(root, {
  readCache: async () => null,
  writeCache: () => {},
  saveSettings: () => {},
  openNote: (p, how) => console.log('open note', p, how),
}, settings);
window.engine = engine;
void engine.setRaw(window.__GRAPH__, true);
