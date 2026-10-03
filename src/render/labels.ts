// Labels live on ONE 2D canvas (no DOM per node). Semantic zoom decides how many
// are eligible; a greedy collision pass keeps them from piling up; per-label
// alpha eases so they fade in/out instead of flickering.
import type { GraphData, VisualParams } from '../types';
import { hexToRgb } from '../palette';

export interface LabelInput {
  g: GraphData;
  w: number; h: number;
  sx: Float32Array; sy: Float32Array; dist: Float32Array; vis: Uint8Array; rpx: Float32Array;
  zoomK: number; // camera distance / framing distance (1 = whole graph fits)
  frameDist: number;
  focus: number; sel: number;
  params: VisualParams;
  clusterXY: Float32Array; // sx, sy, visible per cluster (x3)
  mode: 'neural' | 'daily';
}

interface Placed { i: number; x: number; y: number; size: number; align: 'l' | 'r'; forced: boolean }

const smooth = (a: number, b: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export class LabelLayer {
  readonly canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private dpr = 1;
  private alpha = new Map<number, number>();
  private last = new Map<number, Placed>();
  private widths = new Map<string, number>();
  private font = 'system-ui, "Segoe UI", sans-serif';
  private clusterAlpha: number[] = [];

  constructor(host: HTMLElement) {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'nb-labels';
    host.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')!;
    try {
      const f = getComputedStyle(document.body).getPropertyValue('--font-interface').trim();
      if (f) this.font = `${f}, "Sylfaen", "Noto Sans Armenian", sans-serif`;
    } catch { /* keep default */ }
  }

  resize(w: number, h: number, dpr: number) {
    this.dpr = dpr;
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = h + 'px';
    this.widths.clear();
  }

  clear() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.alpha.clear(); this.last.clear();
  }

  private textW(text: string, size: number): number {
    const key = size + '|' + text;
    let w = this.widths.get(key);
    if (w === undefined) {
      this.ctx.font = `${size}px ${this.font}`;
      w = this.ctx.measureText(text).width;
      if (this.widths.size > 4000) this.widths.clear();
      this.widths.set(key, w);
    }
    return w;
  }

  draw(f: LabelInput) {
    const { g, w, h, params } = f;
    const ctx = this.ctx;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round';

    const focusNode = f.focus >= 0 ? f.focus : f.sel;

    // ---- cluster names: the only text visible when zoomed far out -------------
    const clusterRects = params.clusterLabels ? this.drawClusters(f) : [];

    // ---- eligibility by semantic zoom -----------------------------------------
    // far: cluster names + a handful of hubs; note names appear only as you move in
    const zNear = f.mode === 'daily' ? 0.1 : 0.2;
    const z = Math.max(0, Math.min(1, (1.0 - f.zoomK) / (1.0 - zNear)));
    const budget = Math.round(params.labelDensity * (4 * smooth(1.5, 0.95, f.zoomK) + 76 * Math.pow(z, 1.3)));

    const placed: Placed[] = [];
    const grid = new Map<number, number[]>();
    const rects: number[] = []; // x0,y0,x1,y1
    const CELL = 80;
    const block = (x0: number, y0: number, x1: number, y1: number) => {
      const ri = rects.length;
      rects.push(x0, y0, x1, y1);
      for (let cx = Math.floor(x0 / CELL); cx <= Math.floor(x1 / CELL); cx++) for (let cy = Math.floor(y0 / CELL); cy <= Math.floor(y1 / CELL); cy++) {
        const k = cx * 4096 + cy;
        (grid.get(k) ?? grid.set(k, []).get(k)!).push(ri);
      }
    };
    for (let k = 0; k < clusterRects.length; k += 4) block(clusterRects[k], clusterRects[k + 1], clusterRects[k + 2], clusterRects[k + 3]);
    const tryPlace = (i: number, size: number, forced: boolean): Placed | null => {
      const text = g.labels[i];
      const tw = this.textW(text, size);
      const th = size + 2;
      const r = f.rpx[i] * 0.5 + 6;
      const x = f.sx[i], y = f.sy[i];
      const opts: [number, number, 'l' | 'r'][] = [
        [x + r, y, 'l'], [x - r - tw, y, 'r'], [x - tw / 2, y - r - th * 0.6, 'l'], [x - tw / 2, y + r + th * 0.6, 'l'],
      ];
      for (const [px, py, al] of opts) {
        const x0 = px, y0 = py - th / 2, x1 = px + tw, y1 = py + th / 2;
        if (x0 < 4 || x1 > w - 4 || y0 < 4 || y1 > h - 4) continue;
        let hit = false;
        const cx0 = Math.floor(x0 / CELL), cx1 = Math.floor(x1 / CELL), cy0 = Math.floor(y0 / CELL), cy1 = Math.floor(y1 / CELL);
        outer: for (let cx = cx0; cx <= cx1; cx++) {
          for (let cy = cy0; cy <= cy1; cy++) {
            const lst = grid.get(cx * 4096 + cy);
            if (!lst) continue;
            for (const ri of lst) {
              if (x0 < rects[ri + 2] + 4 && x1 > rects[ri] - 4 && y0 < rects[ri + 3] + 2 && y1 > rects[ri + 1] - 2) { hit = true; break outer; }
            }
          }
        }
        if (hit && !forced) continue;
        const ri = rects.length;
        rects.push(x0, y0, x1, y1);
        for (let cx = cx0; cx <= cx1; cx++) for (let cy = cy0; cy <= cy1; cy++) {
          const k = cx * 4096 + cy;
          (grid.get(k) ?? grid.set(k, []).get(k)!).push(ri);
        }
        return { i, x: px, y: py, size, align: al, forced };
      }
      return null;
    };

    // forced: hovered / selected / neighbours of the focus
    const forced: number[] = [];
    if (f.focus >= 0) forced.push(f.focus);
    if (f.sel >= 0 && f.sel !== f.focus) forced.push(f.sel);
    if (focusNode >= 0) {
      const nb: number[] = [];
      for (let k = g.adjStart[focusNode]; k < g.adjStart[focusNode + 1]; k++) nb.push(g.adjNode[k]);
      nb.sort((a, b) => g.importance[b] - g.importance[a]);
      for (const x of nb.slice(0, Math.round(6 + 10 * params.labelDensity))) if (f.vis[x]) forced.push(x);
    }
    const isForced = new Set(forced);
    for (const i of forced) {
      if (!f.vis[i]) continue;
      const main = i === f.focus || i === f.sel;
      const p = tryPlace(i, main ? 14 : 11.5, main);
      if (p) placed.push(p);
    }

    // eligible by importance + proximity to view centre
    if (budget > 0) {
      const cands: { i: number; s: number }[] = [];
      const thr = 1 - (0.2 + 0.8 * Math.pow(z, 0.8)); // importance threshold falls as we zoom in
      const cx = w / 2, cy = h / 2, diag = Math.hypot(w, h) * 0.5;
      for (let i = 0; i < g.n; i++) {
        if (!f.vis[i] || isForced.has(i)) continue;
        const imp = g.importance[i] + (g.accent[i] ? 0.2 : 0);
        const centre = 1 - Math.min(1, Math.hypot(f.sx[i] - cx, f.sy[i] - cy) / diag);
        const score = imp * 0.7 + centre * 0.3 * z;
        if (imp < thr && z < 0.98 && score < thr * 0.75) continue;
        cands.push({ i, s: score });
      }
      cands.sort((a, b) => b.s - a.s);
      let count = 0;
      for (const c of cands) {
        if (count >= budget) break;
        const size = 10.5 + 3 * g.importance[c.i];
        const p = tryPlace(c.i, size, false);
        if (p) { placed.push(p); count++; }
      }
    }

    // ---- fade bookkeeping ------------------------------------------------------
    const now = new Set<number>();
    for (const p of placed) { now.add(p.i); this.last.set(p.i, p); }
    for (const [i, a] of this.alpha) if (!now.has(i)) { const na = a - 0.09; if (na <= 0.02) { this.alpha.delete(i); this.last.delete(i); } else this.alpha.set(i, na); }
    for (const p of placed) this.alpha.set(p.i, Math.min(1, (this.alpha.get(p.i) ?? 0) + (p.forced ? 0.35 : 0.14)));

    for (const [i, a] of this.alpha) {
      const p = this.last.get(i)!;
      const depthFade = f.mode === 'neural' ? 1 - 0.5 * smooth(0.9, 1.7, f.dist[i] / f.frameDist) : 1;
      this.paint(g, p, a * depthFade, f);
    }
    ctx.globalAlpha = 1;
  }

  private paint(g: GraphData, p: Placed, a: number, f: LabelInput) {
    const ctx = this.ctx;
    const focusNode = f.focus >= 0 ? f.focus : f.sel;
    const main = p.i === f.focus || p.i === f.sel;
    ctx.font = `${main ? 600 : 400} ${p.size}px ${this.font}`;
    const text = g.labels[p.i];
    ctx.globalAlpha = Math.max(0, Math.min(1, a)) * (focusNode >= 0 && !main && !p.forced ? 0.5 : 1);
    ctx.lineWidth = 3.2;
    ctx.strokeStyle = 'rgba(5,8,14,0.92)';
    ctx.strokeText(text, p.x, p.y);
    const [r, gg, b] = hexToRgb(g.clusters[g.cluster[p.i]].color);
    const k = main ? 0.0 : 0.72; // white-ish text, tinted by the cluster colour
    ctx.fillStyle = `rgb(${Math.round(r + (255 - r) * (main ? 1 : k))},${Math.round(gg + (255 - gg) * (main ? 1 : k))},${Math.round(b + (255 - b) * (main ? 1 : k))})`;
    if (g.kind[p.i] === 1) ctx.fillStyle = 'rgb(160,175,205)';
    ctx.fillText(text, p.x, p.y);
  }

  private drawClusters(f: LabelInput): number[] {
    const { g, params } = f;
    const ctx = this.ctx;
    const base = f.mode === 'daily' ? 1 : 1;
    const a0 = smooth(0.22, 0.5, f.zoomK) * (1 - smooth(2.2, 3.8, f.zoomK)) * base;
    const maxSize = Math.max(...g.clusters.map((c) => c.size), 1);
    const rects: number[] = [];
    const solid: number[] = []; // rects of labels that are actually visible: node labels keep clear of them
    const order = g.clusters.map((_, i) => i).sort((a, b) => g.clusters[b].size - g.clusters[a].size);
    ctx.save();
    (ctx as unknown as { letterSpacing: string }).letterSpacing = '3px';
    while (this.clusterAlpha.length < g.clusters.length) this.clusterAlpha.push(0);
    for (const c of order) {
      const cl = g.clusters[c];
      const vis = f.clusterXY[c * 3 + 2];
      let target = vis && cl.size >= 2 ? a0 : 0;
      const size = 10.5 + 7 * Math.sqrt(cl.size / maxSize);
      const text = cl.label.toUpperCase();
      const tw = this.textW(text, size) + text.length * 3;
      const x = f.clusterXY[c * 3] - tw / 2, y = f.clusterXY[c * 3 + 1];
      const x0 = x, x1 = x + tw, y0 = y - size, y1 = y + size;
      for (let k = 0; k < rects.length; k += 4) if (x0 < rects[k + 2] && x1 > rects[k] && y0 < rects[k + 3] && y1 > rects[k + 1]) { target = 0; break; }
      if (target > 0) rects.push(x0, y0, x1, y1);
      this.clusterAlpha[c] += (target - this.clusterAlpha[c]) * 0.15;
      const a = this.clusterAlpha[c];
      if (a < 0.02) continue;
      if (a > 0.25) solid.push(x0, y0, x1, y1);
      ctx.font = `500 ${size}px ${this.font}`;
      ctx.globalAlpha = a * 0.7;
      const [r, gg, b] = hexToRgb(cl.color);
      ctx.fillStyle = `rgb(${r},${gg},${b})`;
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(5,8,14,0.55)';
      ctx.strokeText(text, x, y);
      ctx.fillText(text, x, y);
    }
    ctx.restore();
    ctx.textBaseline = 'middle';
    void params;
    return solid;
  }
}
