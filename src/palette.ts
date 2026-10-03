// Colour helpers. Families keep one hue; sub-clusters get a small lightness /
// hue drift so a project stays recognisable but its folders stay distinguishable.

export function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h.slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function rgbToHex(r: number, g: number, b: number): string {
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
  return `#${c(r)}${c(g)}${c(b)}`;
}

export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  const l = (mx + mn) / 2;
  let h = 0, s = 0;
  if (mx !== mn) {
    const d = mx - mn;
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    if (mx === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (mx === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return [h, s, l];
}

export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  if (s === 0) return [l * 255, l * 255, l * 255];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const f = (t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [f(h + 1 / 3) * 255, f(h) * 255, f(h - 1 / 3) * 255];
}

/** Deterministic variant i of n of a base colour. */
export function shade(hex: string, i: number, n: number): string {
  if (n <= 1) return hex;
  const [r, g, b] = hexToRgb(hex);
  let [h, s, l] = rgbToHsl(r, g, b);
  const k = i / (n - 1) - 0.5; // -0.5 .. 0.5
  h = (h + k * 0.05 + 1) % 1;
  l = Math.max(0.42, Math.min(0.8, l + k * 0.16));
  s = Math.max(0.35, Math.min(1, s - Math.abs(k) * 0.12));
  const [rr, gg, bb] = hslToRgb(h, s, l);
  return rgbToHex(rr, gg, bb);
}

/** Colour for a folder with no rule: golden-angle hue, fixed luminous saturation. */
export function autoColor(key: string): string {
  let hsh = 2166136261;
  for (let i = 0; i < key.length; i++) hsh = Math.imul(hsh ^ key.charCodeAt(i), 16777619);
  const hue = ((hsh >>> 0) % 360) / 360;
  const [r, g, b] = hslToRgb(hue, 0.72, 0.62);
  return rgbToHex(r, g, b);
}

export function lerpHex(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  return rgbToHex(ar + (br - ar) * t, ag + (bg - ag) * t, ab + (bb - ab) * t);
}
