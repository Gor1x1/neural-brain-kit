// Neural impulses: tiny comets that travel source -> target along the real link
// curves. A fixed pool of slots is written by a CPU scheduler; the GPU does the
// motion (quadratic Bezier in the vertex shader), so cost is O(pool), not O(edges).
// Arrival at the target fires a short pulse on that neuron.
import * as THREE from 'three';
import type { GraphData, VisualParams } from '../types';
import * as S from './shaders';
import type { Uniforms } from './layers';

const TRAIL = 3; // vertices per impulse (head + 2 trail points)

export class Impulses {
  readonly points: THREE.Points;
  pulse: Float32Array;
  private geo = new THREE.BufferGeometry();
  private cap: number;
  private head = 0;
  private acc = 0;
  private g!: GraphData;
  private pos!: Float32Array;
  private ctrl!: Float32Array;
  private nodeCol!: Float32Array;
  private cum = new Float32Array(0);
  private arrivals: { t: number; node: number }[] = [];
  private A: THREE.BufferAttribute; private C: THREE.BufferAttribute; private B: THREE.BufferAttribute;
  private T: THREE.BufferAttribute; private Col: THREE.BufferAttribute;
  private dirty = false;
  private active: number[] = [];

  constructor(private U: Uniforms, capacity: number, nodeCount: number) {
    this.cap = capacity;
    const v = capacity * TRAIL;
    const mk = (n: number) => new THREE.BufferAttribute(new Float32Array(v * n), n).setUsage(THREE.DynamicDrawUsage);
    this.A = mk(3); this.C = mk(3); this.B = mk(3); this.T = mk(4); this.Col = mk(3);
    // park everything in the past
    const t = this.T.array as Float32Array;
    for (let i = 0; i < v; i++) { t[i * 4] = -1e6; t[i * 4 + 1] = 1; t[i * 4 + 2] = i % TRAIL; t[i * 4 + 3] = 1; }
    this.geo.setAttribute('position', this.A);
    this.geo.setAttribute('aC', this.C);
    this.geo.setAttribute('aB', this.B);
    this.geo.setAttribute('aT', this.T);
    this.geo.setAttribute('aColor', this.Col);
    this.points = new THREE.Points(this.geo, new THREE.ShaderMaterial({
      uniforms: U as unknown as Record<string, THREE.IUniform>,
      vertexShader: S.IMPULSE_VERT, fragmentShader: S.IMPULSE_FRAG,
      transparent: true, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending,
    }));
    this.points.frustumCulled = false;
    this.points.renderOrder = 5;
    this.pulse = new Float32Array(nodeCount);
  }

  setGraph(g: GraphData, pos: Float32Array, ctrl: Float32Array, nodeCol: Float32Array) {
    this.g = g; this.pos = pos; this.ctrl = ctrl; this.nodeCol = nodeCol;
    // background traffic is biased toward important, non-mega edges
    this.cum = new Float32Array(g.e);
    let s = 0;
    for (let i = 0; i < g.e; i++) {
      const a = g.eSrc[i], b = g.eDst[i];
      const w = (0.35 + g.importance[a] + g.importance[b]) * (g.mega[a] || g.mega[b] ? 0.08 : 1) * (g.kind[a] === 1 || g.kind[b] === 1 ? 0.3 : 1);
      s += w; this.cum[i] = s;
    }
    this.clear();
    if (this.pulse.length !== g.n) this.pulse = new Float32Array(g.n);
  }

  clear() {
    const t = this.T.array as Float32Array;
    for (let i = 0; i < this.cap * TRAIL; i++) t[i * 4] = -1e6;
    this.T.needsUpdate = true;
    this.arrivals.length = 0;
    this.pulse?.fill(0);
    this.active.length = 0;
  }

  private pickBackground(rnd: number): number {
    const c = this.cum, n = c.length;
    if (!n) return -1;
    const x = rnd * c[n - 1];
    let lo = 0, hi = n - 1;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (c[mid] < x) lo = mid + 1; else hi = mid; }
    return lo;
  }

  private spawn(edge: number, now: number, speed: number, size: number, forceDir: number) {
    const g = this.g, pos = this.pos;
    let from = g.eSrc[edge], to = g.eDst[edge];
    const flip = forceDir !== 0 ? forceDir < 0 : g.eBi[edge] ? Math.random() < 0.5 : false;
    if (flip) { const t = from; from = to; to = t; }
    const ax = pos[from * 3], ay = pos[from * 3 + 1], az = pos[from * 3 + 2];
    const bx = pos[to * 3], by = pos[to * 3 + 1], bz = pos[to * 3 + 2];
    const len = Math.hypot(bx - ax, by - ay, bz - az);
    const dur = Math.max(0.9, Math.min(7, len / (32 * speed)));
    const slot = this.head; this.head = (this.head + 1) % this.cap;
    const c = this.nodeCol;
    const r = (c[from * 3] + c[to * 3]) * 0.5, gg = (c[from * 3 + 1] + c[to * 3 + 1]) * 0.5, b = (c[from * 3 + 2] + c[to * 3 + 2]) * 0.5;
    const A = this.A.array as Float32Array, C = this.C.array as Float32Array, B = this.B.array as Float32Array;
    const T = this.T.array as Float32Array, Col = this.Col.array as Float32Array;
    for (let k = 0; k < TRAIL; k++) {
      const v = slot * TRAIL + k;
      A[v * 3] = ax; A[v * 3 + 1] = ay; A[v * 3 + 2] = az;
      C[v * 3] = this.ctrl[edge * 3]; C[v * 3 + 1] = this.ctrl[edge * 3 + 1]; C[v * 3 + 2] = this.ctrl[edge * 3 + 2];
      B[v * 3] = bx; B[v * 3 + 1] = by; B[v * 3 + 2] = bz;
      T[v * 4] = now; T[v * 4 + 1] = dur; T[v * 4 + 2] = k; T[v * 4 + 3] = size * (0.9 + g.importance[from] * 0.5);
      Col[v * 3] = r; Col[v * 3 + 1] = gg; Col[v * 3 + 2] = b;
    }
    this.dirty = true;
    this.arrivals.push({ t: now + dur, node: to });
  }

  /** focus: node whose neighbourhood lights up (-1 none). Returns true if pulse attribute needs upload. */
  update(now: number, dt: number, focus: number, p: VisualParams): boolean {
    this.U.uImpSize.value = p.impulseSize;
    if (!p.impulses || !this.g || !this.g.e) { this.points.visible = false; return false; }
    this.points.visible = true;
    const g = this.g;
    const bgRate = 18 * p.impulseBackground * p.impulseDensity;
    const fRate = focus >= 0 ? 28 * p.impulseDensity : 0;
    this.acc += dt * (bgRate + fRate);
    let guard = 24;
    while (this.acc >= 1 && guard-- > 0) {
      this.acc -= 1;
      const useFocus = focus >= 0 && Math.random() < fRate / (fRate + bgRate + 1e-6);
      if (useFocus) {
        const deg = g.adjStart[focus + 1] - g.adjStart[focus];
        if (deg > 0) {
          const k = g.adjStart[focus] + Math.floor(Math.random() * deg);
          const e = g.adjEdge[k];
          // real link direction: focus -> neighbour if the focus is the source
          const dir = g.eBi[e] ? 0 : g.eSrc[e] === focus ? 1 : -1;
          this.spawn(e, now, p.impulseSpeed, 1.15, dir);
          continue;
        }
      }
      const e = this.pickBackground(Math.random());
      if (e >= 0) this.spawn(e, now, p.impulseSpeed, 1, 0);
    }
    if (this.acc > 4) this.acc = 4;
    if (this.dirty) {
      for (const a of [this.A, this.C, this.B, this.T, this.Col]) a.needsUpdate = true;
      this.dirty = false;
    }

    // firing at arrival + decay
    let pd = false;
    if (this.arrivals.length) {
      let w = 0;
      for (let i = 0; i < this.arrivals.length; i++) {
        const a = this.arrivals[i];
        if (a.t <= now) { if (this.pulse[a.node] < 0.02) this.active.push(a.node); this.pulse[a.node] = Math.min(1, this.pulse[a.node] + 0.65); pd = true; }
        else this.arrivals[w++] = a;
      }
      this.arrivals.length = w;
    }
    if (this.active.length) {
      const k = Math.exp(-dt * 2.4);
      let w = 0;
      for (let i = 0; i < this.active.length; i++) {
        const n = this.active[i];
        this.pulse[n] *= k;
        if (this.pulse[n] < 0.02) this.pulse[n] = 0; else this.active[w++] = n;
      }
      this.active.length = w;
      pd = true;
    }
    return pd;
  }

  dispose() {
    this.geo.dispose();
    (this.points.material as THREE.Material).dispose();
  }
}
