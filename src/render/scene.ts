// Scene orchestrator: renderer + bloom composer, camera/controls, interaction
// (hover / click / double-click / fly-to), frame loop with FPS cap and adaptive
// quality. The camera moves; the layout never does.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import type { GraphData, Mode, VisualParams } from '../types';
import { Impulses } from './impulses';
import { LabelLayer } from './labels';
import { Layers, makeUniforms } from './layers';

export interface SceneHooks {
  onSelect(i: number): void;
  onOpen(i: number, ev: MouseEvent): void;
  onHover(i: number): void;
  onQuality?(msg: string): void;
}

const BG = { neural: 0x080b11, daily: 0x10141b } as const;

export class NeuralScene {
  readonly stats = { fps: 0, frameMs: 0, points: 0 };
  private host: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private composer: EffectComposer;
  private bloom: UnrealBloomPass;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(50, 1, 1, 60000);
  private controls: OrbitControls;
  private U = makeUniforms();
  private layers = new Layers(this.U);
  private impulses!: Impulses;
  private labels: LabelLayer;
  private vignette: HTMLDivElement;

  private g!: GraphData;
  private pos = new Float32Array(0);
  private dim: 2 | 3 = 3;
  private mode: Mode = 'neural';
  private p!: VisualParams;
  private w = 1; private h = 1; private dpr = 1;
  private frameDist = 600; private radius = 200;
  private cx = 0; private cy = 0; private cz = 0;

  private running = false; private raf = 0;
  private last = 0; private lastRender = 0; private t0 = performance.now() / 1000;
  private lastInteract = 0;
  private reduced = false;
  private pendingPick: { x: number; y: number } | null = null;
  private hover = -1; private sel = -1; private appliedFocus = [-2, -2];
  private down: { x: number; y: number; t: number } | null = null;
  private projDirty = true;
  private lastView = new THREE.Matrix4();
  private sx = new Float32Array(0); private sy = new Float32Array(0); private dist = new Float32Array(0);
  private vis = new Uint8Array(0); private rpx = new Float32Array(0); private clusterXY = new Float32Array(0);
  private fly: { target: THREE.Vector3; dist: number } | null = null;
  private morph: { from: Float32Array; to: Float32Array; t: number; dur: number } | null = null;
  private intro = 1; private introDur = 0;
  private qLevel = 0; private slowFrames = 0; private fpsAcc = 0; private fpsN = 0; private fpsT = 0;
  private ro: ResizeObserver;
  private mq: MediaQueryList | null = null;
  private ownerWin: Window;

  constructor(host: HTMLElement, private hooks: SceneHooks) {
    this.host = host;
    this.ownerWin = host.ownerDocument.defaultView ?? window;
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'high-performance', stencil: false });
    this.renderer.setClearColor(0x000000, 1);
    this.scene.background = new THREE.Color(BG.neural); // via scene.background: renderer.setClearColor skips the linear conversion inside the composer
    const cv = this.renderer.domElement;
    cv.className = 'nb-canvas';
    host.appendChild(cv);
    this.vignette = host.ownerDocument.createElement('div');
    this.vignette.className = 'nb-vignette';
    host.appendChild(this.vignette);
    this.labels = new LabelLayer(host);

    this.scene.add(this.layers.group);
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.6, 0.55, 0.25);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());

    this.controls = new OrbitControls(this.camera, cv);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.09;
    this.controls.zoomSpeed = 0.9;
    this.controls.rotateSpeed = 0.65;
    this.controls.zoomToCursor = true;
    this.controls.screenSpacePanning = true;
    this.controls.minDistance = 12;
    this.controls.addEventListener('start', () => { this.fly = null; this.markInteract(); });
    this.controls.addEventListener('change', () => { this.projDirty = true; });

    cv.addEventListener('pointermove', this.onMove);
    cv.addEventListener('pointerdown', this.onDown);
    cv.addEventListener('pointerup', this.onUp);
    cv.addEventListener('pointerleave', this.onLeave);
    cv.addEventListener('dblclick', this.onDbl);
    cv.addEventListener('wheel', () => this.markInteract(), { passive: true });

    this.mq = this.ownerWin.matchMedia?.('(prefers-reduced-motion: reduce)') ?? null;
    this.reduced = !!this.mq?.matches;
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(host);
    this.resize();
  }

  // ---------------------------------------------------------------- graph/params
  setGraph(g: GraphData, pos: Float32Array, micro: Float32Array, dim: 2 | 3, p: VisualParams, mode: Mode, opts: { intro: boolean; keepCamera?: boolean }) {
    const intro = opts.intro;
    this.g = g; this.dim = dim; this.mode = mode; this.p = p;
    this.camera.fov = mode === 'daily' ? 32 : 50;
    this.camera.updateProjectionMatrix();
    this.pos = pos.slice();
    this.hover = -1; this.sel = -1; this.appliedFocus = [-2, -2];
    this.sx = new Float32Array(g.n); this.sy = new Float32Array(g.n); this.dist = new Float32Array(g.n);
    this.vis = new Uint8Array(g.n); this.rpx = new Float32Array(g.n); this.clusterXY = new Float32Array(g.clusters.length * 3);
    this.layers.build(g, dim, this.pos, micro, p);
    this.measure();
    this.layers.buildAmbient(this.radius, 1500);
    if (!this.impulses) {
      this.impulses = new Impulses(this.U, 420, g.n);
      this.scene.add(this.impulses.points);
    }
    this.impulses.setGraph(g, this.pos, this.layers.ctrl, this.layers.nodeCol);
    this.applyParams(p, mode);
    if (!opts.keepCamera) this.resetCamera(false);
    this.labels.clear();
    this.intro = intro ? 0 : 1; this.introDur = intro ? 2.6 : 0;
    this.U.uIntro.value = this.intro;
    this.projDirty = true;
    this.stats.points = g.n + g.m;
  }

  /** Smoothly move the whole graph to a new layout (mode switch, relayout). */
  morphTo(pos: Float32Array, dim: 2 | 3, micro: Float32Array, dur = 1.1) {
    this.layers.beginMicroMorph(micro);
    this.morphDim = dim;
    this.morph = { from: this.pos.slice(), to: pos.slice(), t: 0, dur };
    this.impulses?.clear();
    this.fly = null;
  }
  private morphDim: 2 | 3 = 3;

  setMode(mode: Mode, p: VisualParams) {
    this.mode = mode;
    this.applyParams(p, mode);
  }

  applyParams(p: VisualParams, mode: Mode) {
    const first = !this.p;
    this.p = p; this.mode = mode;
    const U = this.U, daily = mode === 'daily';
    U.uSizeMul.value = p.nodeSize;
    U.uGlow.value = p.glow;
    U.uSharp.value = daily ? 0.8 : 0.0;
    U.uDim.value = daily ? 0.16 : 0.1;
    U.uFog.value = p.depthFog;
    U.uAmbient.value = this.reduced ? 0 : p.ambient;
    U.uNebula.value = daily ? 0.3 : 0.45;
    U.uCross.value = daily ? 0.4 : 0.7;
    U.uMinPx.value = daily ? 2.1 : 1.1;
    U.uMaxPx.value = daily ? 20 : 20;
    (this.scene.background as THREE.Color).set(daily ? BG.daily : BG.neural);
    this.vignette.classList.toggle('nb-vignette-daily', daily);
    this.camera.fov = daily ? 32 : 50;
    this.camera.updateProjectionMatrix();
    this.bloom.strength = p.bloom;
    this.bloom.radius = 0.38;
    this.bloom.threshold = 0.5;
    this.bloom.enabled = p.bloom > 0.01 && this.qLevel < 2;
    if (this.g) {
      this.layers.setParams(p);
      this.layers.setMicroVisible(p.microNodes, p.microAmount);
      if (!first) this.layers.writePositions();
    }
    this.controls.enableRotate = !daily;
    this.controls.mouseButtons = daily
      ? { LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN }
      : { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };
    this.controls.touches = daily ? { ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.DOLLY_PAN } : { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
    this.controls.autoRotateSpeed = p.autoRotate * 0.8;
    this.updatePixelRatio();
    this.projDirty = true;
  }

  private updatePixelRatio() {
    const want = Math.min(this.ownerWin.devicePixelRatio || 1, this.p?.pixelRatioCap ?? 1.5, this.qLevel >= 1 ? 1 : 9);
    if (Math.abs(want - this.dpr) > 0.01) { this.dpr = want; this.resize(); }
  }

  // ---------------------------------------------------------------- geometry/camera
  private measure() {
    const pos = this.pos, n = this.g.n;
    let cx = 0, cy = 0, cz = 0;
    for (let i = 0; i < n; i++) { cx += pos[i * 3]; cy += pos[i * 3 + 1]; cz += pos[i * 3 + 2]; }
    cx /= n || 1; cy /= n || 1; cz /= n || 1;
    this.cx = cx; this.cy = cy; this.cz = cz;
    const ds: number[] = [];
    let ex = 1, ey = 1;
    for (let i = 0; i < n; i++) {
      const dx = pos[i * 3] - cx, dy = pos[i * 3 + 1] - cy, dz = pos[i * 3 + 2] - cz;
      ds.push(Math.hypot(dx, dy, dz));
      if (Math.abs(dx) > ex) ex = Math.abs(dx);
      if (Math.abs(dy) > ey) ey = Math.abs(dy);
    }
    ds.sort((a, b) => a - b);
    this.radius = Math.max(60, ds[Math.floor(ds.length * 0.9)] ?? 100);
    const tanH = Math.tan((this.camera.fov * Math.PI) / 360);
    if (this.dim === 3) this.frameDist = (this.radius / tanH) * 1.12;
    else this.frameDist = Math.max(ey / tanH, ex / (tanH * this.camera.aspect)) * 1.12;
    this.U.uRadius.value = this.radius;
    this.U.uFogNear.value = this.frameDist * 0.75;
    this.U.uFogFar.value = this.frameDist * 2.3;
    this.controls.maxDistance = this.frameDist * 5;
    this.camera.far = this.frameDist * 12;
    this.camera.updateProjectionMatrix();
  }

  resetCamera(animate = true) {
    const c = new THREE.Vector3(this.cx, this.cy, this.cz);
    const dir = this.dim === 3 ? new THREE.Vector3(0.28, 0.3, 1).normalize() : new THREE.Vector3(0, 0, 1);
    if (this.dim === 2) this.camera.up.set(0, 1, 0);
    if (animate && !this.reduced) {
      this.fly = { target: c, dist: this.frameDist };
      this.flyDir = dir;
    } else {
      this.controls.target.copy(c);
      this.camera.position.copy(c).addScaledVector(dir, this.frameDist);
      this.controls.update();
    }
    this.markInteract();
  }
  private flyDir: THREE.Vector3 | null = null;

  flyTo(i: number) {
    if (i < 0 || !this.g) return;
    const g = this.g, pos = this.pos;
    let rr = 0;
    for (let k = g.adjStart[i]; k < g.adjStart[i + 1]; k++) {
      const nb = g.adjNode[k];
      if (g.mega[nb]) continue;
      rr = Math.max(rr, Math.hypot(pos[nb * 3] - pos[i * 3], pos[nb * 3 + 1] - pos[i * 3 + 1], pos[nb * 3 + 2] - pos[i * 3 + 2]));
    }
    rr = Math.min(Math.max(rr * 0.8, g.microRadius[i] * 3.2, 26), this.radius * 0.7);
    const tanH = Math.tan((this.camera.fov * Math.PI) / 360);
    const d = Math.max(30, (rr / tanH) * (this.dim === 2 ? 1.3 : 1.45));
    this.fly = { target: new THREE.Vector3(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]), dist: d };
    this.flyDir = null;
    this.markInteract();
  }

  select(i: number, fly = true) {
    this.sel = i;
    this.syncFocus();
    if (fly && i >= 0) this.flyTo(i);
  }

  private syncFocus() {
    if (!this.g) return;
    if (this.appliedFocus[0] === this.hover && this.appliedFocus[1] === this.sel) return;
    this.appliedFocus = [this.hover, this.sel];
    this.layers.setFocus(this.hover, this.sel);
    this.projDirty = true;
  }

  private markInteract() {
    this.lastInteract = performance.now();
  }

  // ---------------------------------------------------------------- input
  private rel(e: PointerEvent | MouseEvent) {
    const r = this.renderer.domElement.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }
  private onMove = (e: PointerEvent) => {
    if (e.buttons) return;
    this.pendingPick = this.rel(e);
    this.markInteract();
  };
  private onDown = (e: PointerEvent) => {
    const p = this.rel(e);
    this.down = { x: p.x, y: p.y, t: performance.now() };
    this.markInteract();
  };
  private onUp = (e: PointerEvent) => {
    const d = this.down; this.down = null;
    if (!d || e.button !== 0) return;
    const p = this.rel(e);
    if (Math.hypot(p.x - d.x, p.y - d.y) > 5 || performance.now() - d.t > 600) return;
    this.projectNow();
    const hit = this.pick(p.x, p.y);
    this.select(hit, hit >= 0);
    this.hooks.onSelect(hit);
  };
  private onLeave = () => { this.pendingPick = null; if (this.hover !== -1) { this.hover = -1; this.syncFocus(); this.hooks.onHover(-1); this.renderer.domElement.style.cursor = ''; } };
  private onDbl = (e: MouseEvent) => {
    const p = this.rel(e);
    this.projectNow();
    const hit = this.pick(p.x, p.y);
    if (hit >= 0 && this.g.kind[hit] === 0) this.hooks.onOpen(hit, e);
  };

  /** Nearest node under the cursor in screen space (size-aware). */
  private pick(x: number, y: number): number {
    const g = this.g;
    if (!g) return -1;
    let best = -1, bs = 1;
    for (let i = 0; i < g.n; i++) {
      if (!this.vis[i]) continue;
      const rr = Math.max(9, this.rpx[i] * 0.9 + 5);
      const dx = this.sx[i] - x, dy = this.sy[i] - y;
      const s = (dx * dx + dy * dy) / (rr * rr);
      if (s < bs || (s < 1 && best >= 0 && Math.abs(s - bs) < 0.05 && this.dist[i] < this.dist[best])) { bs = s; best = i; }
    }
    return best;
  }

  // ---------------------------------------------------------------- projection
  private projectNow() {
    if (!this.g) return;
    this.camera.updateMatrixWorld();
    const m = new THREE.Matrix4().multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
    const e = m.elements, v = this.camera.matrixWorldInverse.elements;
    const g = this.g, pos = this.pos, w = this.w, h = this.h;
    const scale = h / (2 * Math.tan((this.camera.fov * Math.PI) / 360));
    for (let i = 0; i < g.n; i++) {
      const x = pos[i * 3], y = pos[i * 3 + 1], z = pos[i * 3 + 2];
      const cw = e[3] * x + e[7] * y + e[11] * z + e[15];
      if (cw <= 0.01) { this.vis[i] = 0; continue; }
      const nx = (e[0] * x + e[4] * y + e[8] * z + e[12]) / cw;
      const ny = (e[1] * x + e[5] * y + e[9] * z + e[13]) / cw;
      const sx = (nx * 0.5 + 0.5) * w, sy = (1 - (ny * 0.5 + 0.5)) * h;
      this.sx[i] = sx; this.sy[i] = sy;
      const dz = -(v[2] * x + v[6] * y + v[10] * z + v[14]);
      this.dist[i] = dz;
      this.rpx[i] = (g.radius[i] * this.U.uSizeMul.value * scale) / Math.max(1, dz);
      this.vis[i] = sx > -20 && sx < w + 20 && sy > -20 && sy < h + 20 ? 1 : 0;
    }
    for (let c = 0; c < g.clusters.length; c++) {
      const [x, y, z] = this.layers.clusterCentre(c);
      const cw = e[3] * x + e[7] * y + e[11] * z + e[15];
      if (cw <= 0.01) { this.clusterXY[c * 3 + 2] = 0; continue; }
      const nx = (e[0] * x + e[4] * y + e[8] * z + e[12]) / cw, ny = (e[1] * x + e[5] * y + e[9] * z + e[13]) / cw;
      this.clusterXY[c * 3] = (nx * 0.5 + 0.5) * w; this.clusterXY[c * 3 + 1] = (1 - (ny * 0.5 + 0.5)) * h;
      this.clusterXY[c * 3 + 2] = 1;
    }
    this.lastView.copy(this.camera.matrixWorldInverse);
    this.projDirty = false;
  }

  // ---------------------------------------------------------------- loop
  resize() {
    const w = Math.max(1, this.host.clientWidth), h = Math.max(1, this.host.clientHeight);
    this.w = w; this.h = h;
    if (!this.dpr || this.dpr === 1) this.dpr = Math.min(this.ownerWin.devicePixelRatio || 1, this.p?.pixelRatioCap ?? 1.5);
    this.renderer.setPixelRatio(this.dpr);
    this.renderer.setSize(w, h, false);
    this.renderer.domElement.style.width = '100%'; this.renderer.domElement.style.height = '100%';
    this.composer.setPixelRatio(this.dpr);
    this.composer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.U.uPxRatio.value = this.dpr;
    this.U.uScale.value = h / (2 * Math.tan((this.camera.fov * Math.PI) / 360));
    this.labels.resize(w, h, Math.min(2, this.ownerWin.devicePixelRatio || 1));
    this.projDirty = true;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now() / 1000;
    const loop = () => {
      if (!this.running) return;
      this.raf = this.ownerWin.requestAnimationFrame(loop);
      this.frame();
    };
    this.raf = this.ownerWin.requestAnimationFrame(loop);
  }
  stop() {
    this.running = false;
    this.ownerWin.cancelAnimationFrame(this.raf);
  }

  private frame() {
    if (!this.g || !this.p) return; // the loop may start (view became visible) before the first graph arrives
    const nowMs = performance.now();
    const now = nowMs / 1000;
    const idle = nowMs - this.lastInteract > 3500;
    const focused = this.ownerWin.document.hasFocus();
    const cap = !focused ? 10 : idle ? Math.min(this.p.fpsCap, 30) : this.p.fpsCap;
    if (now - this.lastRender < 1 / cap - 0.003) return;
    const dt = Math.min(0.1, now - this.last);
    this.last = now; this.lastRender = now;
    const t0 = performance.now();

    // time (rebased so float32 stays precise over long sessions)
    let t = now - this.t0;
    if (t > 30000) { this.t0 = now; t = 0; this.impulses.clear(); }
    this.U.uTime.value = t;

    // intro ignition
    if (this.intro < 1) {
      this.intro = Math.min(1, this.intro + dt / Math.max(0.01, this.introDur));
      const e = this.intro;
      this.U.uIntro.value = e * e * (3 - 2 * e);
    } else this.U.uIntro.value = 1;

    // layout morph (CPU lerp of positions; edges follow their nodes)
    if (this.morph) {
      const m = this.morph;
      m.t = Math.min(1, m.t + dt / m.dur);
      const k = m.t * m.t * (3 - 2 * m.t);
      for (let i = 0; i < this.pos.length; i++) this.pos[i] = m.from[i] + (m.to[i] - m.from[i]) * k;
      this.layers.flat = this.morphDim === 2 ? 1 - k : k;
      this.layers.lerpMicro(k);
      this.layers.writePositions();
      this.projDirty = true;
      if (m.t >= 1) {
        this.morph = null;
        this.dim = this.morphDim;
        this.measure();
        this.impulses.setGraph(this.g, this.pos, this.layers.ctrl, this.layers.nodeCol);
        this.layers.buildAmbient(this.radius, 1500);
        this.resetCamera(true);
      }
    }

    // fly-to
    if (this.fly) {
      const k = this.reduced ? 1 : 1 - Math.exp(-dt * 3.4);
      const c = this.controls.target;
      c.lerp(this.fly.target, k);
      const dir = this.flyDir ?? this.camera.position.clone().sub(c).normalize();
      const cur = this.camera.position.distanceTo(c);
      const nd = cur + (this.fly.dist - cur) * k;
      this.camera.position.copy(c).addScaledVector(dir, nd);
      if (c.distanceTo(this.fly.target) < 0.4 && Math.abs(nd - this.fly.dist) < 0.8) this.fly = null;
      this.projDirty = true;
    }

    // auto rotation only when nothing is being looked at
    this.controls.autoRotate = !this.reduced && this.p.autoRotate > 0 && this.mode === 'neural' && idle && this.sel < 0 && this.hover < 0 && !this.fly && !this.morph;
    this.controls.update(dt);
    if (this.controls.autoRotate) this.projDirty = true;

    // hover picking (needs fresh projection)
    this.camera.updateMatrixWorld();
    if (this.projDirty || !this.lastView.equals(this.camera.matrixWorldInverse)) this.projectNow();
    if (this.pendingPick) {
      const hit = this.pick(this.pendingPick.x, this.pendingPick.y);
      this.pendingPick = null;
      if (hit !== this.hover) {
        this.hover = hit;
        this.syncFocus();
        this.hooks.onHover(hit);
        this.renderer.domElement.style.cursor = hit >= 0 ? 'pointer' : '';
      }
    }

    // zoom-dependent line strength: faint when far, clearer when close
    const camDist = this.camera.position.distanceTo(this.controls.target);
    const zoomK = camDist / this.frameDist;
    const lf = 0.5 + 0.5 * (1 - Math.max(0, Math.min(1, (zoomK - 0.25) / 1.1)));
    this.U.uLinkAlpha.value = this.p.linkOpacity * lf;
    this.layers.tickFade(dt);

    // neural impulses
    const focus = this.hover >= 0 ? this.hover : this.sel;
    if (!this.morph && this.intro >= 0.6) {
      const eff = this.reduced ? { ...this.p, impulseDensity: this.p.impulseDensity * 0.35 } : this.p;
      const pulsed = this.impulses.update(t, dt, focus, eff);
      if (pulsed) this.layers.applyPulses(this.impulses.pulse);
    } else this.impulses.points.visible = false;

    // labels
    this.labels.draw({
      g: this.g, w: this.w, h: this.h, sx: this.sx, sy: this.sy, dist: this.dist, vis: this.vis, rpx: this.rpx,
      zoomK, focus: this.hover, sel: this.sel, params: this.p, clusterXY: this.clusterXY, mode: this.mode, frameDist: this.frameDist,
    });

    this.composer.render(dt);

    // stats + adaptive quality
    const ms = performance.now() - t0;
    this.stats.frameMs = this.stats.frameMs * 0.9 + ms * 0.1;
    this.fpsAcc += dt; this.fpsN++;
    if (this.fpsAcc >= 1) {
      this.stats.fps = Math.round(this.fpsN / this.fpsAcc);
      if (focused && !idle && this.p.fpsCap >= 30) {
        if (this.stats.fps < 24) this.slowFrames++; else this.slowFrames = Math.max(0, this.slowFrames - 1);
        if (this.slowFrames >= 4 && this.qLevel < 2) {
          this.qLevel++; this.slowFrames = 0;
          this.hooks.onQuality?.(this.qLevel === 1 ? 'Slow GPU: resolution lowered' : 'Slow GPU: glow (bloom) turned off');
          this.applyParams(this.p, this.mode);
        }
      }
      this.fpsAcc = 0; this.fpsN = 0;
    }
  }

  // ---------------------------------------------------------------- misc API
  get selected() { return this.sel; }
  get quality() { return this.qLevel; }
  get graph() { return this.g; }
  setPositionsInstant(pos: Float32Array) { this.pos.set(pos); this.layers.writePositions(); this.projDirty = true; }

  dispose() {
    this.stop();
    this.ro.disconnect();
    this.controls.dispose();
    this.layers.dispose();
    this.impulses?.dispose();
    this.composer.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.renderer.domElement.remove();
    this.labels.canvas.remove();
    this.vignette.remove();
  }
}
