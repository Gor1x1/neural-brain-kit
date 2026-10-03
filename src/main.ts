import { App, Notice, Plugin, PluginSettingTab, Setting, debounce } from 'obsidian';
import { DEFAULT_RULES, mergeSettings } from './settings';
import type { Mode, PluginSettings } from './types';
import { NeuralBrainView, VIEW_TYPE } from './view';

export default class NeuralBrainPlugin extends Plugin {
  cfg!: PluginSettings;
  saveSoon = debounce(() => { void this.saveData(this.cfg); }, 700, true);

  async onload() {
    this.cfg = mergeSettings(await this.loadData());
    this.registerView(VIEW_TYPE, (leaf) => new NeuralBrainView(leaf, this));
    this.addRibbonIcon('brain-circuit', 'Open Neural Brain', () => void this.activate());
    this.addCommand({ id: 'open', name: 'Open Neural Brain', callback: () => void this.activate() });
    this.addCommand({ id: 'mode-neural', name: 'Switch to Neural (3D showcase) mode', callback: () => void this.setMode('neural') });
    this.addCommand({ id: 'mode-daily', name: 'Switch to Daily (flat, readable) mode', callback: () => void this.setMode('daily') });
    this.addCommand({ id: 'relayout', name: 'Re-layout the neural graph', callback: () => void this.eachView((v) => v.engine?.relayout()) });
    this.addSettingTab(new NeuralBrainSettingTab(this.app, this));
  }

  onunload() {
    void this.saveData(this.cfg);
  }

  async activate() {
    const existing = this.app.workspace.getLeavesOfType(VIEW_TYPE)[0];
    const leaf = existing ?? this.app.workspace.getLeaf('tab');
    if (!existing) await leaf.setViewState({ type: VIEW_TYPE, active: true });
    void this.app.workspace.revealLeaf(leaf);
  }

  async setMode(mode: Mode) {
    await this.activate();
    await this.eachView((v) => v.engine?.switchMode(mode));
  }

  async eachView(fn: (v: NeuralBrainView) => unknown) {
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE)) {
      if (leaf.view instanceof NeuralBrainView) await fn(leaf.view);
    }
  }
}

class NeuralBrainSettingTab extends PluginSettingTab {
  constructor(app: App, private plugin: NeuralBrainPlugin) {
    super(app, plugin);
  }

  display() {
    const { containerEl: c } = this;
    c.empty();
    const s = this.plugin.cfg;
    const apply = () => { this.plugin.saveSoon(); void this.plugin.eachView((v) => v.engine && v.engine.raw && v.engine.setRaw(v.engine.raw, false, true)); };

    c.createEl('p', { text: 'Most controls (sliders, Neural / Daily mode) live in the gear-icon panel inside the graph view. This page holds the structural options.', cls: 'setting-item-description' });

    new Setting(c).setName('Open notes in').setDesc('Where a double-click opens the note. Ctrl/Cmd + double-click always opens to the side.')
      .addDropdown((d) => d.addOptions({ tab: 'New tab', split: 'Split (to the side)', window: 'New window' }).setValue(s.openIn)
        .onChange((v) => { s.openIn = v as PluginSettings['openIn']; this.plugin.saveSoon(); }));

    new Setting(c).setName('Hidden files').setDesc('Comma-separated vault paths to leave out of the graph (e.g. log.md). Notes themselves are never changed.')
      .addText((t) => t.setPlaceholder('log.md, Untitled.md').setValue(s.hideFiles.join(', '))
        .onChange((v) => { s.hideFiles = v.split(',').map((x) => x.trim()).filter(Boolean); apply(); }));

    c.createEl('h3', { text: 'Folder colours' });
    c.createEl('p', { text: 'Longest matching path prefix wins; "*" is the fallback for root files. Same family = same colour everywhere.', cls: 'setting-item-description' });
    s.rules.forEach((r, i) => {
      new Setting(c).setName(r.prefix === '*' ? 'Root files (*)' : r.prefix)
        .addColorPicker((p) => p.setValue(r.color).onChange((v) => { r.color = v; apply(); }))
        .addExtraButton((b) => b.setIcon('trash').setTooltip('Remove rule').onClick(() => { s.rules.splice(i, 1); apply(); this.display(); }));
    });
    let np = '';
    new Setting(c).setName('Add folder rule').addText((t) => t.setPlaceholder('Folder/Sub').onChange((v) => (np = v.trim())))
      .addButton((b) => b.setButtonText('Add').onClick(() => {
        if (!np) return;
        s.rules.push({ prefix: np, color: '#5ec8ff', name: np });
        apply(); this.display();
      }));
    new Setting(c).setName('Reset folder colours').addButton((b) => b.setButtonText('Reset').onClick(() => {
      s.rules = DEFAULT_RULES.map((r) => ({ ...r })); apply(); this.display();
    }));

    c.createEl('h3', { text: 'Layout' });
    new Setting(c).setName('Re-layout').setDesc('Positions are cached so the graph stays identical between sessions. Recompute only when you want a fresh arrangement.')
      .addButton((b) => b.setButtonText('Re-layout now').onClick(() => { void this.plugin.eachView((v) => v.engine?.relayout()); new Notice('Neural Brain: re-layout started'); }));
  }
}


