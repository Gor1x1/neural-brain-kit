// GPU layers: nodes, heading micro-neurons, curved edges, ambient dust, nebulae.
// Positions are CPU-written once per layout change; per-frame work is uniforms only.
import * as THREE from 'three';
import type { GraphData, VisualParams } from '../types';
import * as S from './shaders';

export type Uniforms = Record<string, THREE.IUniform<number>>;

export function makeUniforms(): Uniforms {
  const u = (v: number) => ({ value: v });
  return {
    uTime: u(0), uFade: u(1), uPxRatio: u(1), uScale: u(900), uSizeMul: u(1), uMinPx: u(1.1), uMaxPx: u(28),
    uDim: u(0.1), uFog: u(0.5), uFogNear: u(300), uFogFar: u(1400), uIntro: u(0), uRadius: u(200),
    uGlow: u(1), uSharp: u(0), uMinPxK: u(1), uAlphaK: u(1), uCross: u(0.7), uLinkAlpha: u(1), uImpSize: u(1), uAmbient: u(1), uNebula: u(1),
  };
}

const linear = (hex: string): [number, number, number] => {
  const c = new THREE.Color(hex);
  return [c.r, c.g, c.b];
};

function mat(vs: string, fs: string, U: Uniforms): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: U as unknown as Record<string, THREE.IUniform>,
    vertexShader: vs, fragmentShader: fs,
    transparent: true, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending,
  });
}

function dyn(arr: Float32Array, size: number): THREE.BufferAttribute {
  return new THREE.BufferAttribute(arr, size).setUsage(THREE.DynamicDrawUsage);
}

function rand01(seed: number): number {
  let t = (seed + 0x6d2b79f5) >>> 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export class Layers {
  readonly group = new THREE.Group();
  g!: GraphData;
  segs = 8;
  /** edge curve control points (e*3) - impulses ride the same curves */
  ctrl = new Float32Array(0);
  nodeCol = new Float32Array(0); // linear rgb per macro node
  /** 1 = full 3D edge bending, 0 = in-plane (daily layout); tweened during mode morphs */
  flat = 1;
  private microOff: Float32Array = new Float32Array(0);
  private microFrom: Float32Array = new Float32Array(0);
  private microTo: Float32Array = new Float32Array(0);
  private pos: Float32Array = new Float32Array(0);
  private edgeRand = new Float32Array(0);
  private curve = 0.16;
  private nodes!: THREE.Points;
  private micro!: THREE.Points;
  private edges!: THREE.LineSegments;
  private ambient!: THREE.Points;
  private nebula!: THREE.Mesh;
  private nS0 = new Float32Array(0); private nS1 = new Float32Array(0);
  private mS0 = new Float32Array(0); private mS1 = new Float32Array(0);
  private eS0 = new Float32Array(0); private eS1 = new Float32Array(0);
  private fade = 1;
  private nPulse = new Float32Array(0);
  private cNeb = new Float32Array(0);
  private nebCount = 0;
  private accentIdx: number[] = [];
  private visibleMicro = 0;

  constructor(private U: Uniforms) {}

  setParams(p: VisualParams) {
    this.curve = p.linkCurve;
  }

  build(g: GraphData, dim: 2 | 3, pos: Float32Array, microOff: Float32Array, p: VisualParams) {
    this.disposeObjects();
    this.g = g; this.flat = dim === 2 ? 0 : 1; this.pos = pos; this.microOff = new Float32Array(microOff); this.curve = p.linkCurve;
    const n = g.n, m = g.m, e = g.e;
    this.segs = e > 6000 ? 4 : 8;

    // colours -------------------------------------------------------------------
    this.nodeCol = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const c = linear(g.clusters[g.cluster[i]].color);
      this.nodeCol[i * 3] = c[0]; this.nodeCol[i * 3 + 1] = c[1]; this.nodeCol[i * 3 + 2] = c[2];
    }

    // nodes ---------------------------------------------------------------------
    const nGeo = new THREE.BufferGeometry();
    const nSize = new Float32Array(n), nHot = new Float32Array(n), nSeed = new Float32Array(n), nCol = new Float32Array(n * 3);
    this.accentIdx = [];
    for (let i = 0; i < n; i++) {
      nSize[i] = g.radius[i];
      nHot[i] = (g.accent[i] ? 0.5 : 0) + g.importance[i] * 0.2;
      nSeed[i] = rand01(i * 7 + 3);
      const w = g.accent[i] ? 0.28 : 0;
      for (let k = 0; k < 3; k++) nCol[i * 3 + k] = this.nodeCol[i * 3 + k] * (1 - w) + w;
      if (g.accent[i]) this.accentIdx.push(i);
    }
    this.nS0 = new Float32Array(n).fill(1); this.nS1 = new Float32Array(n).fill(1);
    this.nPulse = new Float32Array(n);
    nGeo.setAttribute('position', dyn(new Float32Array(n * 3), 3));
    nGeo.setAttribute('aSize', new THREE.BufferAttribute(nSize, 1));
    nGeo.setAttribute('aColor', new THREE.BufferAttribute(nCol, 3));
    nGeo.setAttribute('aHot', new THREE.BufferAttribute(nHot, 1));
    nGeo.setAttribute('aSeed', new THREE.BufferAttribute(nSeed, 1));
    nGeo.setAttribute('aS0', dyn(this.nS0, 1));
    nGeo.setAttribute('aS1', dyn(this.nS1, 1));
    nGeo.setAttribute('aPulse', dyn(this.nPulse, 1));
    this.nodes = new THREE.Points(nGeo, mat(S.NODE_VERT, S.NODE_FRAG, this.U));
    this.nodes.frustumCulled = false; this.nodes.renderOrder = 4;

    // micro (heading) neurons -----------------------------------------------------
    const mGeo = new THREE.BufferGeometry();
    const mSize = new Float32Array(m), mSeed = new Float32Array(m), mCol = new Float32Array(m * 3), mHot = new Float32Array(m);
    for (let k = 0; k < m; k++) {
      const par = g.mParent[k];
      mSize[k] = 0.5 + (4 - Math.min(4, g.mLevel[k])) * 0.07;
      mSeed[k] = rand01(k * 13 + 5);
      for (let c = 0; c < 3; c++) mCol[k * 3 + c] = this.nodeCol[par * 3 + c] * 0.8 + 0.2;
    }
    this.mS0 = new Float32Array(m).fill(1); this.mS1 = new Float32Array(m).fill(1);
    mGeo.setAttribute('position', dyn(new Float32Array(m * 3), 3));
    mGeo.setAttribute('aSize', new THREE.BufferAttribute(mSize, 1));
    mGeo.setAttribute('aColor', new THREE.BufferAttribute(mCol, 3));
    mGeo.setAttribute('aHot', new THREE.BufferAttribute(mHot, 1));
    mGeo.setAttribute('aSeed', new THREE.BufferAttribute(mSeed, 1));
    mGeo.setAttribute('aS0', dyn(this.mS0, 1));
    mGeo.setAttribute('aS1', dyn(this.mS1, 1));
    mGeo.setAttribute('aPulse', new THREE.BufferAttribute(new Float32Array(m), 1));
    this.micro = new THREE.Points(mGeo, mat(S.NODE_VERT, S.NODE_FRAG, { ...this.U, uMinPxK: { value: 0.72 }, uAlphaK: { value: 0.7 } }));
    this.micro.frustumCulled = false; this.micro.renderOrder = 3;

    // edges ---------------------------------------------------------------------
    const vcount = e * this.segs * 2;
    const eGeo = new THREE.BufferGeometry();
    const eCol = new Float32Array(vcount * 3), eBase = new Float32Array(vcount), eCross = new Float32Array(vcount);
    this.edgeRand = new Float32Array(e * 3);
    this.ctrl = new Float32Array(e * 3);
    for (let i = 0; i < e; i++) {
      const s = g.eSrc[i], t = g.eDst[i];
      this.edgeRand[i * 3] = rand01(i * 3 + 1) * 2 - 1;
      this.edgeRand[i * 3 + 1] = rand01(i * 3 + 2) * 2 - 1;
      this.edgeRand[i * 3 + 2] = rand01(i * 3 + 3);
      const mega = g.mega[s] || g.mega[t];
      const unres = g.kind[s] === 1 || g.kind[t] === 1;
      const base = 0.2 * (0.8 + 0.25 * Math.min(2, g.eWeight[i] - 1)) * (mega ? 0.22 : 1) * (unres ? 0.6 : 1);
      for (let k = 0; k < this.segs; k++) {
        for (let h = 0; h < 2; h++) {
          const v = (i * this.segs + k) * 2 + h;
          const u = (k + h) / this.segs;
          for (let c = 0; c < 3; c++) eCol[v * 3 + c] = this.nodeCol[s * 3 + c] * (1 - u) + this.nodeCol[t * 3 + c] * u;
          eBase[v] = base;
          eCross[v] = g.cluster[s] === g.cluster[t] ? 0 : 1;
        }
      }
    }
    this.eS0 = new Float32Array(vcount).fill(1); this.eS1 = new Float32Array(vcount).fill(1);
    eGeo.setAttribute('position', dyn(new Float32Array(vcount * 3), 3));
    eGeo.setAttribute('aColor', new THREE.BufferAttribute(eCol, 3));
    eGeo.setAttribute('aBase', new THREE.BufferAttribute(eBase, 1));
    eGeo.setAttribute('aCross', new THREE.BufferAttribute(eCross, 1));
    eGeo.setAttribute('aS0', dyn(this.eS0, 1));
    eGeo.setAttribute('aS1', dyn(this.eS1, 1));
    this.edges = new THREE.LineSegments(eGeo, mat(S.EDGE_VERT, S.EDGE_FRAG, this.U));
    this.edges.frustumCulled = false; this.edges.renderOrder = 2;

    // nebula ---------------------------------------------------------------------
    this.buildNebula();

    this.group.add(this.nebula, this.edges, this.micro, this.nodes);
    this.writePositions();
  }

  private buildNebula() {
    const g = this.g;
    const count = g.clusters.length + this.accentIdx.length;
    this.nebCount = count;
    const plane = new THREE.PlaneGeometry(1, 1);
    const geo = new THREE.InstancedBufferGeometry();
    geo.index = plane.index;
    geo.setAttribute('position', plane.attributes.position);
    this.cNeb = new Float32Array(count * 3);
    const col = new Float32Array(count * 3), sc = new Float32Array(count), al = new Float32Array(count);
    g.clusters.forEach((c, i) => {
      const l = new THREE.Color(c.color);
      col.set([l.r, l.g, l.b], i * 3);
      al[i] = (0.028 + 0.04 * Math.min(1, c.size / 24)) * (c.key === 'unresolved' ? 0.3 : 1); // small clusters stay faint: no milky blobs
    });
    this.accentIdx.forEach((ni, k) => {
      const i = g.clusters.length + k;
      col.set(this.nodeCol.subarray(ni * 3, ni * 3 + 3), i * 3);
      al[i] = 0.10;
      sc[i] = g.radius[ni] * 9;
    });
    geo.setAttribute('aCenter', new THREE.InstancedBufferAttribute(this.cNeb, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('aScale', new THREE.InstancedBufferAttribute(sc, 1).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('aColor', new THREE.InstancedBufferAttribute(col, 3));
    geo.setAttribute('aAlpha', new THREE.InstancedBufferAttribute(al, 1));
    geo.instanceCount = count;
    const m = mat(S.NEBULA_VERT, S.NEBULA_FRAG, this.U);
    m.side = THREE.DoubleSide;
    this.nebula = new THREE.Mesh(geo, m);
    this.nebula.frustumCulled = false; this.nebula.renderOrder = 0;
  }

  /** Ambient dust, built once per radius change. */
  buildAmbient(radius: number, count: number) {
    if (this.ambient) { this.group.remove(this.ambient); this.ambient.geometry.dispose(); (this.ambient.material as THREE.Material).dispose(); }
    const pos = new Float32Array(count * 3), seed = new Float32Array(count * 4), col = new Float32Array(count * 3);
    const tints = [new THREE.Color('#5ec8ff'), new THREE.Color('#8f7bff'), new THREE.Color('#3fe0d0'), new THREE.Color('#6fa0ff')];
    for (let i = 0; i < count; i++) {
      // 55% inside the cloud (faint haze), 45% in a far shell for parallax depth
      const inner = rand01(i * 5 + 1) < 0.55;
      const r = inner ? radius * 0.95 * Math.cbrt(rand01(i * 5 + 2)) : radius * (1.25 + 1.5 * rand01(i * 5 + 2));
      const th = rand01(i * 5 + 3) * Math.PI * 2, ph = Math.acos(2 * rand01(i * 5 + 4) - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th) * 1.15;
      pos[i * 3 + 1] = r * Math.cos(ph) * 0.8;
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
      seed[i * 4] = 0.4 + rand01(i * 11 + 1); seed[i * 4 + 1] = rand01(i * 11 + 2); seed[i * 4 + 2] = rand01(i * 11 + 3); seed[i * 4 + 3] = rand01(i * 11 + 4);
      const t = tints[i % tints.length];
      col.set([t.r, t.g, t.b], i * 3);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 4));
    geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
    this.ambient = new THREE.Points(geo, mat(S.AMBIENT_VERT, S.AMBIENT_FRAG, this.U));
    this.ambient.frustumCulled = false; this.ambient.renderOrder = 1;
    this.group.add(this.ambient);
  }

  /** Re-write every position-dependent buffer from this.pos (cheap, used for morphs too). */
  writePositions() {
    const g = this.g, pos = this.pos;
    const np = (this.nodes.geometry.attributes.position as THREE.BufferAttribute);
    (np.array as Float32Array).set(pos); np.needsUpdate = true;

    const mp = (this.micro.geometry.attributes.position as THREE.BufferAttribute);
    const ma = mp.array as Float32Array;
    for (let k = 0; k < g.m; k++) {
      const p = g.mParent[k] * 3;
      ma[k * 3] = pos[p] + this.microOff[k * 3];
      ma[k * 3 + 1] = pos[p + 1] + this.microOff[k * 3 + 1];
      ma[k * 3 + 2] = pos[p + 2] + this.microOff[k * 3 + 2];
    }
    mp.needsUpdate = true;

    const ep = this.edges.geometry.attributes.position as THREE.BufferAttribute;
    const ea = ep.array as Float32Array;
    const S_ = this.segs, curve = this.curve, flat = this.flat;
    for (let i = 0; i < g.e; i++) {
      const a = g.eSrc[i] * 3, b = g.eDst[i] * 3;
      const ax = pos[a], ay = pos[a + 1], az = pos[a + 2], bx = pos[b], by = pos[b + 1], bz = pos[b + 2];
      const dx = bx - ax, dy = by - ay, dz = bz - az;
      const len = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
      // perpendicular to the edge from a fixed random vector; z part fades out in the flat layout
      const rx = this.edgeRand[i * 3], ry = this.edgeRand[i * 3 + 1], rz = this.edgeRand[i * 3 + 2] * 2 - 1;
      let px = dy * rz - dz * ry, py = dz * rx - dx * rz, pz = (dx * ry - dy * rx) * flat;
      if (px * px + py * py + pz * pz < len * len * 1e-4) { const s = rx < 0 ? -1 : 1; px = -dy * s; py = dx * s; pz = 0; }
      const pl = Math.sqrt(px * px + py * py + pz * pz) || 1;
      const bend = len * curve * (0.55 + 0.45 * Math.abs(this.edgeRand[i * 3 + 2])) / pl;
      const cx = (ax + bx) * 0.5 + px * bend, cy = (ay + by) * 0.5 + py * bend, cz = (az + bz) * 0.5 + pz * bend;
      this.ctrl[i * 3] = cx; this.ctrl[i * 3 + 1] = cy; this.ctrl[i * 3 + 2] = cz;
      let o = i * S_ * 6;
      let lx = ax, ly = ay, lz = az;
      for (let k = 1; k <= S_; k++) {
        const t = k / S_, mt = 1 - t;
        const x = mt * mt * ax + 2 * mt * t * cx + t * t * bx;
        const y = mt * mt * ay + 2 * mt * t * cy + t * t * by;
        const z = mt * mt * az + 2 * mt * t * cz + t * t * bz;
        ea[o++] = lx; ea[o++] = ly; ea[o++] = lz; ea[o++] = x; ea[o++] = y; ea[o++] = z;
        lx = x; ly = y; lz = z;
      }
    }
    ep.needsUpdate = true;

    // nebula centres = cluster centroids
    const K = g.clusters.length;
    const sum = new Float64Array(K * 3), cnt = new Uint32Array(K);
    for (let i = 0; i < g.n; i++) { const c = g.cluster[i]; sum[c * 3] += pos[i * 3]; sum[c * 3 + 1] += pos[i * 3 + 1]; sum[c * 3 + 2] += pos[i * 3 + 2]; cnt[c]++; }
    const cen = this.nebula.geometry.attributes.aCenter as THREE.InstancedBufferAttribute;
    const scl = this.nebula.geometry.attributes.aScale as THREE.InstancedBufferAttribute;
    const vr = new Float64Array(K);
    for (let c = 0; c < K; c++) { const k = cnt[c] || 1; this.cNeb[c * 3] = sum[c * 3] / k; this.cNeb[c * 3 + 1] = sum[c * 3 + 1] / k; this.cNeb[c * 3 + 2] = sum[c * 3 + 2] / k; }
    for (let i = 0; i < g.n; i++) {
      const c = g.cluster[i];
      const dx = pos[i * 3] - this.cNeb[c * 3], dy = pos[i * 3 + 1] - this.cNeb[c * 3 + 1], dz = pos[i * 3 + 2] - this.cNeb[c * 3 + 2];
      vr[c] += dx * dx + dy * dy + dz * dz;
    }
    for (let c = 0; c < K; c++) (scl.array as Float32Array)[c] = Math.min(60 + 26 * Math.sqrt(cnt[c] || 1), Math.max(36, 3.6 * Math.sqrt(vr[c] / (cnt[c] || 1)) + 20));
    this.accentIdx.forEach((ni, k) => this.cNeb.set(pos.subarray(ni * 3, ni * 3 + 3), (K + k) * 3));
    cen.needsUpdate = true; scl.needsUpdate = true;
  }

  beginMicroMorph(to: Float32Array) {
    this.microFrom = this.microOff.slice();
    this.microTo = to.slice();
  }

  lerpMicro(k: number) {
    const a = this.microFrom, b = this.microTo, o = this.microOff;
    for (let i = 0; i < o.length; i++) o[i] = a[i] + (b[i] - a[i]) * k;
  }

  /** world-space centroid of cluster c (valid after writePositions) */
  clusterCentre(c: number): [number, number, number] {
    return [this.cNeb[c * 3], this.cNeb[c * 3 + 1], this.cNeb[c * 3 + 2]];
  }

  setMicroVisible(show: boolean, amount: number) {
    this.micro.visible = show && this.g.m > 0;
    if (!this.micro.visible) return;
    const want = Math.max(0, Math.min(this.g.m, Math.round(this.g.m * amount)));
    if (want !== this.visibleMicro) {
      this.visibleMicro = want;
      this.micro.geometry.setDrawRange(0, want);
    }
  }

  setNodeCount(show: boolean) { this.nodes.visible = show; }

  /** Retarget highlight states with a smooth crossfade. */
  setFocus(focus: number, sel: number) {
    const g = this.g, n = g.n, e = g.e, S_ = this.segs;
    this.snapshot();
    const nT = new Float32Array(n), mT = new Float32Array(g.m), eT = new Float32Array(e);
    const f = focus >= 0 ? focus : sel;
    if (f < 0) { nT.fill(1); mT.fill(1); eT.fill(1); }
    else {
      nT[f] = f === sel ? 4 : 3;
      for (let k = g.adjStart[f]; k < g.adjStart[f + 1]; k++) { nT[g.adjNode[k]] = 2; eT[g.adjEdge[k]] = 3; }
      if (sel >= 0) nT[sel] = 4;
      for (let k = 0; k < g.m; k++) { const p = g.mParent[k]; mT[k] = p === f ? 2 : nT[p] === 2 ? 1 : 0; }
    }
    this.nS1.set(nT); this.mS1.set(mT);
    for (let i = 0; i < e; i++) this.eS1.fill(eT[i], i * S_ * 2, (i + 1) * S_ * 2);
    this.fade = 0;
    this.U.uFade.value = 0;
    this.flagStates();
  }

  private snapshot() {
    const f = this.fade;
    if (f >= 1) { this.nS0.set(this.nS1); this.mS0.set(this.mS1); this.eS0.set(this.eS1); return; }
    const mix = (a: Float32Array, b: Float32Array) => { for (let i = 0; i < a.length; i++) a[i] = a[i] + (b[i] - a[i]) * f; };
    mix(this.nS0, this.nS1); mix(this.mS0, this.mS1); mix(this.eS0, this.eS1);
  }

  private flagStates() {
    for (const o of [this.nodes, this.micro, this.edges]) {
      (o.geometry.attributes.aS0 as THREE.BufferAttribute).needsUpdate = true;
      (o.geometry.attributes.aS1 as THREE.BufferAttribute).needsUpdate = true;
    }
  }

  /** advance crossfade; returns true while still animating */
  tickFade(dt: number): boolean {
    if (this.fade >= 1) return false;
    this.fade = Math.min(1, this.fade + dt / 0.38);
    const e = this.fade;
    this.U.uFade.value = e * e * (3 - 2 * e);
    return this.fade < 1;
  }

  /** Neuron firing: lift pulse values for the nodes that just received an impulse. */
  applyPulses(pulse: Float32Array) {
    this.nPulse.set(pulse);
    (this.nodes.geometry.attributes.aPulse as THREE.BufferAttribute).needsUpdate = true;
  }

  private disposeObjects() {
    for (const o of [this.nodes, this.micro, this.edges, this.nebula]) {
      if (!o) continue;
      this.group.remove(o);
      o.geometry.dispose();
      (o.material as THREE.Material).dispose();
    }
  }

  dispose() {
    this.disposeObjects();
    if (this.ambient) { this.group.remove(this.ambient); this.ambient.geometry.dispose(); (this.ambient.material as THREE.Material).dispose(); }
  }
}

