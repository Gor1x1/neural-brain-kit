// In-view control panel: mode switch, sliders, legend, selection card, status.
// Plain DOM, styled by styles.css. Everything persists through Engine.setParam.
import type { Engine } from './engine';
import type { GraphData, Mode, VisualParams } from './types';

type NumKey = { [K in keyof VisualParams]: VisualParams[K] extends number ? K : never }[keyof VisualParams];
type BoolKey = { [K in keyof VisualParams]: VisualParams[K] extends boolean ? K : never }[keyof VisualParams];

interface SliderDef { key: NumKey; label: string; min: number; max: number; step: number; hint?: string }
interface ToggleDef { key: BoolKey; label: string }

const SECTIONS: { title: string; sliders: SliderDef[]; toggles?: ToggleDef[] }[] = [
  {
    title: 'Neurons',
    sliders: [
      { key: 'nodeSize', label: 'Node size', min: 0.4, max: 3, step: 0.05 },
      { key: 'glow', label: 'Glow', min: 0, max: 2, step: 0.05 },
      { key: 'bloom', label: 'Bloom', min: 0, max: 2, step: 0.05 },
      { key: 'microAmount', label: 'Heading neurons', min: 0, max: 1, step: 0.05 },
    ],
    toggles: [{ key: 'microNodes', label: 'Show heading neurons' }],
  },
  {
    title: 'Links',
    sliders: [
      { key: 'linkOpacity', label: 'Link opacity', min: 0, max: 3, step: 0.05 },
      { key: 'linkCurve', label: 'Link curvature', min: 0, max: 0.4, step: 0.01 },
    ],
  },
  {
    title: 'Neural flow',
    sliders: [
      { key: 'impulseDensity', label: 'Density', min: 0, max: 3, step: 0.05 },
      { key: 'impulseSpeed', label: 'Speed', min: 0.2, max: 3, step: 0.05 },
      { key: 'impulseSize', label: 'Size', min: 0.4, max: 3, step: 0.05 },
      { key: 'impulseBackground', label: 'Background traffic', min: 0, max: 1, step: 0.05, hint: '0 = only on hover / selection' },
    ],
    toggles: [{ key: 'impulses', label: 'Impulses on' }],
  },
  {
    title: 'Atmosphere',
    sliders: [
      { key: 'ambient', label: 'Ambient dust', min: 0, max: 2, step: 0.05 },
      { key: 'depthFog', label: 'Depth fog', min: 0, max: 1, step: 0.05 },
      { key: 'autoRotate', label: 'Auto-rotate', min: 0, max: 1.5, step: 0.05 },
    ],
  },
  {
    title: 'Labels & content',
    sliders: [{ key: 'labelDensity', label: 'Label density', min: 0, max: 1.5, step: 0.05 }],
    toggles: [
      { key: 'clusterLabels', label: 'Folder names' },
      { key: 'showUnresolved', label: 'Unresolved links' },
      { key: 'showOrphans', label: 'Orphan notes' },
    ],
  },
];

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}

export class Hud {
  private root: HTMLElement;
  private panel: HTMLElement;
  private body: HTMLElement;
  private info: HTMLElement;
  private status: HTMLElement;
  private legend: HTMLElement;
  private toastEl: HTMLElement;
  private seg: Record<Mode, HTMLButtonElement>;
  private inputs = new Map<string, HTMLInputElement>();
  private outputs = new Map<string, HTMLElement>();
  private toastT = 0;

  constructor(host: HTMLElement, private engine: Engine) {
    const root = (this.root = el('div', 'nb-hud'));
    // pointer events inside the HUD must not reach the 3D canvas
    for (const ev of ['pointerdown', 'pointerup', 'dblclick', 'wheel']) root.addEventListener(ev, (e) => e.stopPropagation());

    const top = el('div', 'nb-top');
    const segWrap = el('div', 'nb-seg');
    const mk = (m: Mode, label: string) => {
      const b = el('button', 'nb-seg-btn', label);
      b.addEventListener('click', () => void engine.switchMode(m));
      segWrap.appendChild(b);
      return b;
    };
    this.seg = { neural: mk('neural', 'Neural'), daily: mk('daily', 'Daily') };
    const gear = el('button', 'nb-icon-btn', '⚙');
    gear.title = 'Visualization controls';
    gear.addEventListener('click', () => this.togglePanel());
    const reset = el('button', 'nb-icon-btn', '⌖');
    reset.title = 'Reset view';
    reset.addEventListener('click', () => engine.resetView());
    top.append(segWrap, reset, gear);

    this.panel = el('div', 'nb-panel');
    this.body = el('div', 'nb-panel-body');
    this.panel.appendChild(this.body);
    this.buildPanel();

    this.info = el('div', 'nb-info');
    this.info.hidden = true;
    this.status = el('div', 'nb-status');
    this.status.hidden = true;
    this.legend = el('div', 'nb-legend');
    this.toastEl = el('div', 'nb-toast');
    this.toastEl.hidden = true;

    root.append(top, this.panel, this.info, this.legend, this.status, this.toastEl);
    host.appendChild(root);
    this.panel.hidden = !engine.settings.panelOpen;
    this.refresh();
  }

  private togglePanel() {
    this.panel.hidden = !this.panel.hidden;
    this.engine.settings.panelOpen = !this.panel.hidden;
    this.engine.persist();
  }

  private buildPanel() {
    const e = this.engine;
    for (const sec of SECTIONS) {
      const box = el('div', 'nb-sec');
      box.appendChild(el('div', 'nb-sec-title', sec.title));
      for (const s of sec.sliders) {
        const row = el('label', 'nb-row');
        const name = el('span', 'nb-row-name', s.label);
        const val = el('span', 'nb-row-val');
        const inp = el('input');
        inp.type = 'range'; inp.min = String(s.min); inp.max = String(s.max); inp.step = String(s.step);
        inp.addEventListener('input', () => {
          const v = parseFloat(inp.value);
          val.textContent = v.toFixed(2);
          e.setParam(s.key, v as never);
        });
        if (s.hint) row.title = s.hint;
        row.append(name, val, inp);
        box.appendChild(row);
        this.inputs.set(s.key, inp);
        this.outputs.set(s.key, val);
      }
      for (const t of sec.toggles ?? []) {
        const row = el('label', 'nb-check');
        const inp = el('input');
        inp.type = 'checkbox';
        inp.addEventListener('change', () => e.setParam(t.key, inp.checked as never));
        row.append(inp, el('span', undefined, t.label));
        box.appendChild(row);
        this.inputs.set(t.key, inp);
      }
      this.body.appendChild(box);
    }
    const fpsRow = el('label', 'nb-row nb-row-select');
    fpsRow.appendChild(el('span', 'nb-row-name', 'Frame cap'));
    const sel = el('select');
    for (const v of [30, 60]) { const o = el('option', undefined, `${v} fps`); o.value = String(v); sel.appendChild(o); }
    sel.addEventListener('change', () => e.setParam('fpsCap', parseInt(sel.value, 10)));
    fpsRow.appendChild(sel);
    this.inputs.set('fpsCap', sel as unknown as HTMLInputElement);
    this.body.appendChild(fpsRow);

    const btns = el('div', 'nb-btns');
    const relayout = el('button', 'nb-btn', 'Re-layout');
    relayout.title = 'Compute a fresh layout (the current one is cached and stays stable otherwise)';
    relayout.addEventListener('click', () => void e.relayout());
    const defaults = el('button', 'nb-btn', 'Reset defaults');
    defaults.addEventListener('click', () => e.resetModeDefaults());
    btns.append(relayout, defaults);
    this.body.appendChild(btns);
  }

  /** sync controls with the active mode's parameters */
  refresh() {
    const p = this.engine.params;
    for (const [k, inp] of this.inputs) {
      const v = (p as unknown as Record<string, unknown>)[k];
      if (inp.type === 'checkbox') inp.checked = !!v;
      else inp.value = String(v);
      const out = this.outputs.get(k);
      if (out && typeof v === 'number') out.textContent = v.toFixed(2);
    }
    const m = this.engine.mode;
    this.seg.neural.classList.toggle('on', m === 'neural');
    this.seg.daily.classList.toggle('on', m === 'daily');
    this.root.dataset.mode = m;
  }

  setBusy(text: string | null, progress?: number) {
    if (text === null) { this.status.hidden = true; return; }
    this.status.hidden = false;
    this.status.textContent = progress === undefined ? text : `${text} ${Math.round(progress * 100)}%`;
  }

  toast(msg: string) {
    this.toastEl.textContent = msg;
    this.toastEl.hidden = false;
    window.clearTimeout(this.toastT);
    this.toastT = window.setTimeout(() => (this.toastEl.hidden = true), 6000);
  }

  onGraph(g: GraphData) {
    this.legend.textContent = '';
    const counts = new Map<number, number>();
    for (let i = 0; i < g.n; i++) counts.set(g.family[i], (counts.get(g.family[i]) ?? 0) + 1);
    const items = [...counts.entries()].sort((a, b) => b[1] - a[1]);
    for (const [fi, c] of items) {
      const f = g.families[fi];
      const chip = el('span', 'nb-chip');
      const dot = el('i', 'nb-dot');
      dot.style.background = f.color;
      dot.style.boxShadow = `0 0 8px ${f.color}`;
      const name = f.key === '*' ? 'core' : f.key.replace(/^wiki\//, '');
      chip.append(dot, el('span', undefined, `${name} · ${c}`));
      this.legend.appendChild(chip);
    }
    this.info.hidden = true;
  }

  showInfo(i: number) {
    const g = this.engine.graph;
    if (!g || i < 0) { this.info.hidden = true; return; }
    this.info.textContent = '';
    this.info.hidden = false;
    const c = g.clusters[g.cluster[i]];
    const title = el('div', 'nb-info-title', g.labels[i]);
    title.style.color = c.color;
    let heads = 0;
    for (let k = 0; k < g.m; k++) if (g.mParent[k] === i) heads++;
    const meta = el('div', 'nb-info-meta', `${g.kind[i] === 1 ? 'unresolved link' : g.ids[i]}`);
    const stats = el('div', 'nb-info-stats', `${g.degree[i]} links${heads ? ` · ${heads} headings` : ''}`);
    this.info.append(title, meta, stats);
    if (g.kind[i] === 0) {
      const row = el('div', 'nb-btns');
      const open = el('button', 'nb-btn nb-primary', 'Open note');
      open.addEventListener('click', () => this.engine.openSelected(this.engine.settings.openIn));
      const side = el('button', 'nb-btn', 'Open to the side');
      side.addEventListener('click', () => this.engine.openSelected('split'));
      row.append(open, side);
      this.info.appendChild(row);
    }
  }

  dispose() {
    window.clearTimeout(this.toastT);
    this.root.remove();
  }
}
