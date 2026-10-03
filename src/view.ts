import { ItemView, TFile, WorkspaceLeaf, debounce } from 'obsidian';
import { Engine, EngineHost } from './engine';
import type { PosCache } from './layout';
import type NeuralBrainPlugin from './main';
import { readVault } from './obsidian-source';
import type { Mode } from './types';

export const VIEW_TYPE = 'neural-brain-view';
/** bump whenever layout.ts changes shape so stale cached positions are dropped */
const LAYOUT_CACHE_V = 2;

export class NeuralBrainView extends ItemView {
  engine: Engine | null = null;
  private io: IntersectionObserver | null = null;
  private writeTimers = new Map<Mode, number>();

  constructor(leaf: WorkspaceLeaf, private plugin: NeuralBrainPlugin) {
    super(leaf);
    this.navigation = false;
  }

  getViewType() { return VIEW_TYPE; }
  getDisplayText() { return 'Neural Brain'; }
  getIcon() { return 'brain-circuit'; }

  private cachePath(mode: Mode) {
    return `${this.plugin.manifest.dir}/layout-${mode}.json`;
  }

  private host(): EngineHost {
    const adapter = this.app.vault.adapter;
    return {
      readCache: async (mode) => {
        try {
          const p = this.cachePath(mode);
          if (!(await adapter.exists(p))) return null;
          const j = JSON.parse(await adapter.read(p)) as { v: number; pos: PosCache };
          return j.v === LAYOUT_CACHE_V ? j.pos : null;
        } catch { return null; }
      },
      writeCache: (mode, c) => {
        window.clearTimeout(this.writeTimers.get(mode));
        this.writeTimers.set(mode, window.setTimeout(() => {
          void adapter.write(this.cachePath(mode), JSON.stringify({ v: LAYOUT_CACHE_V, pos: c })).catch(() => {});
        }, 400));
      },
      saveSettings: () => this.plugin.saveSoon(),
      openNote: (path, how) => {
        const f = this.app.vault.getAbstractFileByPath(path);
        if (!(f instanceof TFile)) return;
        const leaf = how === 'same' ? this.leaf : how === 'split' ? this.app.workspace.getLeaf('split') : how === 'window' ? this.app.workspace.getLeaf('window') : this.app.workspace.getLeaf('tab');
        void leaf.openFile(f);
      },
    };
  }

  async onOpen() {
    const root = this.contentEl;
    root.empty();
    root.addClass('nb-root');
    try {
      this.engine = new Engine(root, this.host(), this.plugin.cfg);
    } catch (e) {
      root.createEl('div', { text: 'Neural Brain could not start WebGL: ' + String(e), cls: 'nb-status' });
      return;
    }
    // stop rendering when the tab is not visible
    this.io = new IntersectionObserver((entries) => {
      const vis = entries.some((en) => en.isIntersecting);
      if (!this.engine) return;
      if (vis) this.engine.scene.start(); else this.engine.scene.stop();
    });
    this.io.observe(root);

    const refresh = debounce(() => { if (this.engine) void this.engine.setRaw(readVault(this.app), false); }, 2500, true);
    this.registerEvent(this.app.metadataCache.on('resolved', refresh));
    this.registerEvent(this.app.vault.on('delete', refresh));
    this.registerEvent(this.app.vault.on('rename', refresh));

    this.app.workspace.onLayoutReady(() => {
      void this.engine?.setRaw(readVault(this.app), true);
    });
  }

  async onClose() {
    this.io?.disconnect();
    this.io = null;
    for (const t of this.writeTimers.values()) window.clearTimeout(t);
    this.engine?.dispose();
    this.engine = null;
  }
}

