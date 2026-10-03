// Engine = everything that is not Obsidian-specific: model → layout → scene → HUD.
// The Obsidian view and the standalone dev harness both drive this same class.
import { buildGraph, structureHash } from './graph-model';
import { Hud } from './hud';
import { LayoutOptions, LayoutRun, microOffsets, PosCache } from './layout';
import { NeuralScene } from './render/scene';
import { DAILY_PARAMS, NEURAL_PARAMS } from './settings';
import type { GraphData, Mode, PluginSettings, RawVault, VisualParams } from './types';

export interface EngineHost {
  readCache(mode: Mode): Promise<PosCache | null>;
  writeCache(mode: Mode, c: PosCache): void;
  saveSettings(): void;
  openNote(path: string, how: 'tab' | 'split' | 'window' | 'same'): void;
}

const LAYOUT: Record<Mode, LayoutOptions> = {
  neural: { dim: 3, spread: 1, brain: 0.6, useMicro: true },
  daily: { dim: 2, spread: 1.35, brain: 0, useMicro: false },
};

const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

export class Engine {
  readonly scene: NeuralScene;
  readonly hud: Hud;
  graph: GraphData | null = null;
  raw: RawVault | null = null;
  private hash = '';
  private layouts: Partial<Record<Mode, Float32Array>> = {};
  private token = 0;
  private disposed = false;

  constructor(public root: HTMLElement, private host: EngineHost, public settings: PluginSettings) {
    this.scene = new NeuralScene(root, {
      onSelect: (i) => this.hud.showInfo(i),
      onOpen: (i, ev) => {
        const g = this.graph;
        if (g) this.host.openNote(g.ids[i], ev.ctrlKey || ev.metaKey ? 'split' : this.settings.openIn);
      },
      onHover: () => {},
      onQuality: (m) => this.hud.toast(m),
    });
    this.hud = new Hud(root, this);
  }

  get mode(): Mode { return this.settings.mode; }
  get params(): VisualParams { return this.settings[this.settings.mode]; }

  private buildOpts() {
    const p = this.settings.neural; // shared flags live on both sets
    return { rules: this.settings.rules, showUnresolved: p.showUnresolved, showOrphans: p.showOrphans, hideFiles: this.settings.hideFiles };
  }

  /** (Re)load the vault model. initial = first show (plays the ignition intro). */
  async setRaw(raw: RawVault, initial: boolean, force = false) {
    this.raw = raw;
    const g = buildGraph(raw, this.buildOpts());
    const hash = structureHash(g);
    // an unchanged structure must not touch the token: it would silently cancel an in-flight layout / mode switch
    if (!initial && !force && hash === this.hash) { this.graph = g; return; }
    const token = ++this.token;
    this.hash = hash;
    if (!g.n) { this.hud.setBusy('The vault has no notes to show yet.'); return; }
    const mode = this.mode;
    this.hud.setBusy('Mapping neurons…', 0);
    const pos = await this.layoutFor(mode, g, token);
    if (!pos || token !== this.token || this.disposed) return;
    this.graph = g;
    this.layouts = { [mode]: pos };
    const dim = LAYOUT[mode].dim;
    this.scene.setGraph(g, pos, microOffsets(g, dim), dim, this.params, mode, { intro: initial, keepCamera: !initial });
    this.scene.start();
    this.hud.onGraph(g);
    this.hud.setBusy(null);
  }

  private async layoutFor(mode: Mode, g: GraphData, token: number, useCache = true): Promise<Float32Array | null> {
    const cache = useCache ? await this.host.readCache(mode) : null;
    const run = new LayoutRun(g, LAYOUT[mode], cache ?? undefined);
    const fresh = !run.done;
    while (!run.done) {
      run.step(10);
      this.hud.setBusy('Mapping neurons…', run.progress);
      await nextFrame();
      if (token !== this.token || this.disposed) return null;
    }
    if (fresh) this.host.writeCache(mode, run.toCache());
    return run.pos;
  }

  async switchMode(mode: Mode) {
    if (mode === this.settings.mode && this.layouts[mode]) return;
    const g = this.graph;
    this.settings.mode = mode;
    this.host.saveSettings();
    this.hud.refresh();
    if (!g) return;
    const token = ++this.token;
    let pos = this.layouts[mode] ?? null;
    if (!pos) {
      this.hud.setBusy('Mapping neurons…', 0);
      pos = await this.layoutFor(mode, g, token);
      this.hud.setBusy(null);
      if (!pos || token !== this.token) return;
      this.layouts[mode] = pos;
    }
    const dim = LAYOUT[mode].dim;
    this.scene.setMode(mode, this.params);
    this.scene.morphTo(pos, dim, microOffsets(g, dim), 1.2);
  }

  /** Throw away the cached layout of the active mode and compute a fresh one. */
  async relayout() {
    const g = this.graph;
    if (!g) return;
    const mode = this.mode;
    const token = ++this.token;
    this.hud.setBusy('Re-mapping neurons…', 0);
    const pos = await this.layoutFor(mode, g, token, false);
    this.hud.setBusy(null);
    if (!pos || token !== this.token) return;
    this.layouts = { [mode]: pos };
    const dim = LAYOUT[mode].dim;
    this.scene.morphTo(pos, dim, microOffsets(g, dim), 1.4);
  }

  setParam<K extends keyof VisualParams>(key: K, value: VisualParams[K]) {
    const shared = key === 'showUnresolved' || key === 'showOrphans';
    if (shared) { (this.settings.neural as VisualParams)[key] = value; (this.settings.daily as VisualParams)[key] = value; }
    else (this.settings[this.mode] as VisualParams)[key] = value;
    this.host.saveSettings();
    if (shared) { if (this.raw) void this.setRaw(this.raw, false, true); return; }
    this.scene.applyParams(this.params, this.mode);
  }

  resetModeDefaults() {
    const d = this.mode === 'neural' ? NEURAL_PARAMS : DAILY_PARAMS;
    const keepShared = { showUnresolved: this.params.showUnresolved, showOrphans: this.params.showOrphans };
    this.settings[this.mode] = { ...d, ...keepShared };
    this.host.saveSettings();
    this.scene.applyParams(this.params, this.mode);
    this.hud.refresh();
  }

  resetView() { this.scene.resetCamera(true); }

  persist() { this.host.saveSettings(); }

  openSelected(how: 'tab' | 'split' | 'window' | 'same') {
    const g = this.graph, i = this.scene.selected;
    if (g && i >= 0 && g.kind[i] === 0) this.host.openNote(g.ids[i], how);
  }

  dispose() {
    this.disposed = true;
    this.token++;
    this.hud.dispose();
    this.scene.dispose();
  }
}
