// GLSL for every layer. Everything is additive points / lines / quads: no
// sorting, no depth writes, cheap on old GPUs. State values (per node/edge):
// 0 dim · 1 normal · 2 neighbour · 3 hover · 4 selected. Two copies (prev/next)
// are crossfaded by uFade so highlight changes ease in instead of popping.

const HALO = 5.0; // sprite diameter / core diameter

const FOG = /* glsl */ `
float fogK(float dist){ return 1.0 - uFog * smoothstep(uFogNear, uFogFar, dist); }
float introK(vec3 p){ return clamp(uIntro * 1.8 - length(p) / uRadius * 0.8, 0.0, 1.0); }
`;

export const NODE_VERT = /* glsl */ `
uniform float uTime, uFade, uPxRatio, uScale, uSizeMul, uMinPx, uMaxPx, uDim, uFog, uFogNear, uFogFar, uIntro, uRadius, uMinPxK, uAlphaK;
attribute float aSize;
attribute vec3 aColor;
attribute float aS0;
attribute float aS1;
attribute float aPulse;
attribute float aSeed;
attribute float aHot;
varying vec3 vColor;
varying float vAlpha;
varying float vHot;
varying float vPx;
${FOG}
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  float dist = max(1.0, -mv.z);
  float st = mix(aS0, aS1, uFade);
  float sel = smoothstep(3.5, 4.0, st);
  float act = clamp(st - 1.0, 0.0, 2.0);
  float ik = introK(position);
  float tw = 0.88 + 0.12 * sin(uTime * 0.9 + aSeed * 60.0);
  float breathe = sel * (0.5 + 0.5 * sin(uTime * 2.4));
  float px = aSize * uSizeMul * uScale / dist;
  px *= 1.0 + 0.22 * act + 0.55 * aPulse + 0.3 * breathe;
  px = clamp(px, uMinPx * uMinPxK, uMaxPx) * ik;
  gl_PointSize = max(1.0, px * uPxRatio * ${HALO.toFixed(1)});
  vPx = gl_PointSize * 0.5;
  float dimK = mix(uDim, 1.0, clamp(st, 0.0, 1.0));
  vAlpha = uAlphaK * dimK * fogK(dist) * tw * ik * (1.0 + 0.45 * aPulse + 0.35 * act + 0.35 * breathe);
  vColor = aColor;
  vHot = clamp(aHot + 0.22 * act + 0.4 * sel + 0.55 * aPulse, 0.0, 1.0);
  gl_Position = projectionMatrix * mv;
}`;

export const NODE_FRAG = /* glsl */ `
precision highp float;
uniform float uGlow, uSharp;
varying vec3 vColor;
varying float vAlpha;
varying float vHot;
varying float vPx;
void main(){
  float r = length(gl_PointCoord - 0.5) * 2.0;
  if (r > 1.0 || vAlpha < 0.004) discard;
  float rp = r * vPx;                       // distance from the centre in device pixels
  float cs = max(0.8, vPx * 0.17);          // core sigma: never thinner than ~1.5 px, grows with the node
  float coreG = exp(-(rp * rp) / (cs * cs));
  float coreD = 1.0 - smoothstep(cs * 1.1, cs * 1.5, rp);
  float core = mix(coreG, coreD, uSharp);
  float halo = exp(-r * r * 7.0) * 0.26 * uGlow * (1.0 - smoothstep(0.78, 1.0, r));
  vec3 col = vColor * (core + halo) + vec3(1.0) * core * vHot * 0.28;
  gl_FragColor = vec4(col, vAlpha);
}`;

export const EDGE_VERT = /* glsl */ `
uniform float uFade, uLinkAlpha, uDim, uFog, uFogNear, uFogFar, uIntro, uRadius, uCross;
attribute vec3 aColor;
attribute float aS0;
attribute float aS1;
attribute float aBase;
attribute float aCross;
varying vec4 vC;
${FOG}
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  float dist = max(1.0, -mv.z);
  float st = mix(aS0, aS1, uFade);
  float act = clamp((st - 1.0) * 0.5, 0.0, 1.0); // incident edges of the focus are driven to 3
  float dimK = mix(uDim * 0.5, 1.0, clamp(st, 0.0, 1.0));
  float a = aBase * mix(1.0, uCross, aCross) * uLinkAlpha * dimK * fogK(dist) * introK(position);
  a = a + act * 0.55 * introK(position);
  vC = vec4(aColor * (1.0 + act * 1.4), a);
  gl_Position = projectionMatrix * mv;
}`;

export const EDGE_FRAG = /* glsl */ `
precision highp float;
varying vec4 vC;
void main(){ gl_FragColor = vC; }`;

export const IMPULSE_VERT = /* glsl */ `
uniform float uTime, uPxRatio, uScale, uImpSize, uFog, uFogNear, uFogFar, uMinPx, uMaxPx;
attribute vec3 aC;
attribute vec3 aB;
attribute vec4 aT;      // start, duration, trail index, size scale
attribute vec3 aColor;
varying vec3 vColor;
varying float vAlpha;
${FOG.replace('float introK(vec3 p){ return clamp(uIntro * 1.8 - length(p) / uRadius * 0.8, 0.0, 1.0); }', '')}
void main(){
  float age = (uTime - aT.x) / aT.y;
  if (age < 0.0 || age > 1.0) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); gl_PointSize = 0.0; vAlpha = 0.0; vColor = vec3(0.0); return; }
  float tt = clamp(age - aT.z * 0.05, 0.0, 1.0);
  vec3 p = mix(mix(position, aC, tt), mix(aC, aB, tt), tt);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float dist = max(1.0, -mv.z);
  float env = pow(sin(3.14159265 * age), 0.55);
  float trail = 1.0 - aT.z * 0.32;
  float px = clamp(uImpSize * aT.w * uScale * 0.55 / dist * trail, uMinPx, uMaxPx);
  gl_PointSize = px * uPxRatio * 4.0;
  vAlpha = env * trail * fogK(dist);
  vColor = aColor;
  gl_Position = projectionMatrix * mv;
}`;

export const IMPULSE_FRAG = /* glsl */ `
precision highp float;
varying vec3 vColor;
varying float vAlpha;
void main(){
  float r = length(gl_PointCoord - 0.5) * 2.0;
  if (r > 1.0 || vAlpha < 0.004) discard;
  float core = exp(-pow(r / 0.2, 2.0));
  float halo = exp(-r * r * 5.0) * 0.3;
  vec3 col = mix(vColor, vec3(1.0), 0.45) * core * 0.95 + vColor * halo;
  gl_FragColor = vec4(col, vAlpha);
}`;

export const AMBIENT_VERT = /* glsl */ `
uniform float uTime, uPxRatio, uAmbient, uFog, uFogNear, uFogFar;
attribute vec4 aSeed;
attribute vec3 aColor;
varying vec3 vColor;
varying float vAlpha;
${FOG.replace('float introK(vec3 p){ return clamp(uIntro * 1.8 - length(p) / uRadius * 0.8, 0.0, 1.0); }', '')}
void main(){
  vec3 d = vec3(sin(uTime * 0.05 * aSeed.x + aSeed.y * 6.283), sin(uTime * 0.043 * aSeed.y + aSeed.z * 6.283), sin(uTime * 0.037 * aSeed.z + aSeed.x * 6.283)) * 9.0;
  vec4 mv = modelViewMatrix * vec4(position + d, 1.0);
  float dist = max(1.0, -mv.z);
  gl_PointSize = (0.8 + aSeed.w * 1.7) * uPxRatio * clamp(500.0 / dist, 0.55, 1.6);
  float tw = 0.5 + 0.5 * sin(uTime * (0.25 + aSeed.x * 0.4) + aSeed.w * 30.0);
  vAlpha = uAmbient * (0.1 + 0.28 * tw) * (0.4 + 0.6 * aSeed.w) * mix(1.0, fogK(dist), 0.6);
  vColor = aColor;
  gl_Position = projectionMatrix * mv;
}`;

export const AMBIENT_FRAG = /* glsl */ `
precision highp float;
varying vec3 vColor;
varying float vAlpha;
void main(){
  float r = length(gl_PointCoord - 0.5) * 2.0;
  if (r > 1.0) discard;
  float a = exp(-r * r * 3.5);
  gl_FragColor = vec4(vColor * a, vAlpha);
}`;

export const NEBULA_VERT = /* glsl */ `
uniform float uIntro, uRadius, uNebula;
attribute vec3 aCenter;
attribute float aScale;
attribute vec3 aColor;
attribute float aAlpha;
varying vec3 vColor;
varying float vAlpha;
varying vec2 vUv;
void main(){
  vec4 mv = modelViewMatrix * vec4(aCenter, 1.0);
  mv.xy += position.xy * aScale;
  vUv = position.xy * 2.0;
  vColor = aColor;
  vAlpha = aAlpha * uNebula * clamp(uIntro * 1.4, 0.0, 1.0);
  gl_Position = projectionMatrix * mv;
}`;

export const NEBULA_FRAG = /* glsl */ `
precision highp float;
varying vec3 vColor;
varying float vAlpha;
varying vec2 vUv;
void main(){
  float r = length(vUv);
  if (r > 1.0) discard;
  float a = exp(-r * r * 3.2) * (1.0 - smoothstep(0.7, 1.0, r));
  gl_FragColor = vec4(vColor * a, vAlpha);
}`;
