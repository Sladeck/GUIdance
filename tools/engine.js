/* GUIdance palette engine (browser). Same algorithm as tools/palette.py and the
   precomputed tables: Material 3 role tones, tone = CIE L*, hue/chroma in OKLCH. */
const GD = (() => {
  const WHITE = [0.95047, 1.0, 1.08883];
  const toLin = c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const toSrgb = c => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
  const hexToRgb = h => { h = h.replace('#', ''); if (h.length === 3) h = [...h].map(c => c + c).join(''); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255); };
  // Python's round() is round-half-even; match it so hex values agree with the tables.
  const pyRound = x => { const f = Math.floor(x), d = x - f; if (d > 0.5) return f + 1; if (d < 0.5) return f; return f % 2 === 0 ? f : f + 1; };
  const rgbToHex = rgb => '#' + rgb.map(c => Math.max(0, Math.min(255, pyRound(c * 255))).toString(16).padStart(2, '0')).join('');
  const f = t => (t > 216 / 24389 ? Math.cbrt(t) : (24389 / 27 * t + 16) / 116);
  const xyz = rgb => { const [r, g, b] = rgb.map(toLin); return [0.4124564 * r + 0.3575761 * g + 0.1804375 * b, 0.2126729 * r + 0.7151522 * g + 0.0721750 * b, 0.0193339 * r + 0.1191920 * g + 0.9503041 * b]; };
  const lstar = rgb => 116 * f(xyz(rgb)[1] / WHITE[1]) - 16;
  const cbrt = v => Math.sign(v) * Math.abs(v) ** (1 / 3);
  function linToOklab(r, g, b) {
    let l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b, m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b, s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
    l = cbrt(l); m = cbrt(m); s = cbrt(s);
    return [0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s, 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s];
  }
  function oklabToLin(L, a, b) {
    const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3, m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3, s = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3;
    return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s];
  }
  const oklch = rgb => { const [L, a, b] = linToOklab(...rgb.map(toLin)); return [L, Math.hypot(a, b), ((Math.atan2(b, a) * 180 / Math.PI) % 360 + 360) % 360]; };
  const K = 0.0034;
  function okAtTone(okc, hue, tone) {
    const a = okc * Math.cos(hue * Math.PI / 180), b = okc * Math.sin(hue * Math.PI / 180);
    let lo = 0, hi = 1;
    for (let i = 0; i < 40; i++) {
      const mid = (lo + hi) / 2, [r, g, bl] = oklabToLin(mid, a, b);
      const y = 0.2126729 * r + 0.7151522 * g + 0.0721750 * bl;
      if (116 * f(Math.max(y, 0)) - 16 < tone) lo = mid; else hi = mid;
    }
    return [(lo + hi) / 2, a, b];
  }
  function toneColor(hue, chroma, tone) {
    if (tone <= 0) return '#000000';
    if (tone >= 100) return '#ffffff';
    const at = c => { const [L, a, b] = okAtTone(c, hue, tone); return oklabToLin(L, a, b); };
    const ok = c => at(c).every(v => v >= -1e-7 && v <= 1 + 1e-7);
    const target = chroma * K;
    let lo = 0, hi = target;
    if (ok(hi)) lo = hi; else for (let i = 0; i < 30; i++) { const mid = (lo + hi) / 2; if (ok(mid)) lo = mid; else hi = mid; }
    return rgbToHex(at(lo).map(v => toSrgb(Math.max(0, Math.min(1, v)))));
  }
  const lum = hex => { const [r, g, b] = hexToRgb(hex).map(toLin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
  const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  const rot = (h, br, rs) => { for (let i = 0; i < br.length - 1; i++) if (br[i] <= h && h < br[i + 1]) return (h + rs[i]) % 360; return h; };
  function palettesFor(hue, v) {
    let p;
    if (v === 'tonal_spot' || v === 'fidelity') p = { primary: [hue, 36], secondary: [hue, 16], tertiary: [(hue + 60) % 360, 24], neutral: [hue, 6], neutral_variant: [hue, 8] };
    else if (v === 'neutral') p = { primary: [hue, 12], secondary: [hue, 8], tertiary: [hue, 16], neutral: [hue, 2], neutral_variant: [hue, 2] };
    else if (v === 'vibrant') { const b = [0, 41, 61, 101, 131, 181, 251, 301, 360]; p = { primary: [hue, 200], secondary: [rot(hue, b, [18, 15, 10, 12, 15, 18, 15, 12, 12]), 24], tertiary: [rot(hue, b, [35, 30, 20, 25, 30, 35, 30, 25, 25]), 32], neutral: [hue, 10], neutral_variant: [hue, 12] }; }
    else if (v === 'expressive') { const b = [0, 21, 51, 121, 151, 191, 271, 321, 360]; p = { primary: [(hue + 240) % 360, 40], secondary: [rot(hue, b, [45, 95, 45, 20, 45, 90, 45, 45, 45]), 24], tertiary: [rot(hue, b, [120, 120, 20, 45, 20, 15, 20, 120, 120]), 32], neutral: [(hue + 15) % 360, 8], neutral_variant: [(hue + 15) % 360, 12] }; }
    else if (v === 'grey') p = { primary: [250, 0], secondary: [250, 0], tertiary: [250, 0], neutral: [250, 0], neutral_variant: [250, 0] };
    else throw new Error('unknown variant ' + v);
    p.error = [25, 84]; p.success = [150, 48]; p.warning = [70, 60];
    return p;
  }
  const ROLES = {
    'primary': ['primary', 40, 80], 'on-primary': ['primary', 100, 20], 'primary-container': ['primary', 90, 30], 'on-primary-container': ['primary', 30, 90],
    'secondary': ['secondary', 40, 80], 'on-secondary': ['secondary', 100, 20], 'secondary-container': ['secondary', 90, 30], 'on-secondary-container': ['secondary', 30, 90],
    'tertiary': ['tertiary', 40, 80], 'on-tertiary': ['tertiary', 100, 20], 'tertiary-container': ['tertiary', 90, 30], 'on-tertiary-container': ['tertiary', 30, 90],
    'error': ['error', 40, 80], 'on-error': ['error', 100, 20], 'error-container': ['error', 90, 30], 'on-error-container': ['error', 30, 90],
    'success': ['success', 40, 80], 'on-success': ['success', 100, 20], 'success-container': ['success', 90, 30], 'on-success-container': ['success', 30, 90],
    'warning': ['warning', 40, 80], 'on-warning': ['warning', 100, 20], 'warning-container': ['warning', 90, 30], 'on-warning-container': ['warning', 30, 90],
    'surface': ['neutral', 98, 6], 'surface-container-lowest': ['neutral', 100, 4], 'surface-container-low': ['neutral', 96, 10], 'surface-container': ['neutral', 94, 12],
    'surface-container-high': ['neutral', 92, 17], 'surface-container-highest': ['neutral', 90, 22], 'on-surface': ['neutral', 10, 90], 'on-surface-variant': ['neutral_variant', 30, 80],
    'outline': ['neutral_variant', 50, 60], 'outline-variant': ['neutral_variant', 80, 30], 'inverse-surface': ['neutral', 20, 90], 'inverse-on-surface': ['neutral', 95, 20], 'inverse-primary': ['primary', 80, 40],
  };
  const SURFACES = ['surface', 'surface-container-lowest', 'surface-container-low', 'surface-container', 'surface-container-high', 'surface-container-highest'];
  function hslSeed(h) {   // row seed: hsl(h, 75%, 45%), same as the tables
    const s = 0.75, l = 0.45, c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = l - c / 2;
    const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
    return rgbToHex([r + m, g + m, b + m]);
  }
  // row: HSL hue multiple of 5, or 'grey'. brand: optional exact brand hex (fidelity).
  function build({ row, variant = 'tonal_spot', brand = null }) {
    const isGrey = row === 'grey';
    const seed = isGrey ? '#666666' : hslSeed(+row);
    const [, okc, H] = oklch(hexToRgb(seed));
    const pal = palettesFor(isGrey ? 250 : H, isGrey ? 'grey' : (variant === 'fidelity' ? 'tonal_spot' : variant));
    if (variant === 'vibrant' && !isGrey) pal.primary = [H, Math.max(okc / K, 60)];
    const out = { light: {}, dark: {} };
    for (const [role, [p, lt, dt]] of Object.entries(ROLES)) { const [h, c] = pal[p]; out.light[role] = toneColor(h, c, lt); out.dark[role] = toneColor(h, c, dt); }
    const ch = [0, 150, 60, 250, 310].map(s => ((isGrey ? 250 : pal.primary[0]) + s) % 360);
    ch.forEach((h, i) => { out.light['chart-' + (i + 1)] = toneColor(h, 60, 48); out.dark['chart-' + (i + 1)] = toneColor(h, 50, 72); });
    if (brand) {
      brand = brand.toLowerCase();
      const on = contrast(brand, '#ffffff') >= contrast(brand, '#000000') ? '#ffffff' : '#000000';
      const asPrimary = Math.min(...SURFACES.map(s => contrast(brand, out.light[s]))) >= 4.5 && contrast(on, brand) >= 4.5;
      if (asPrimary) { out.light.primary = brand; out.light['on-primary'] = on; } else { out.light['primary-container'] = brand; out.light['on-primary-container'] = on; }
      out.brandRole = asPrimary ? 'primary' : 'primary-container';
    }
    const d = (a, b) => { const x = Math.abs(a - b) % 360; return Math.min(x, 360 - x); };
    out.notes = isGrey ? [] : ['error', 'success', 'warning'].filter(r => d(pal.primary[0], pal[r][0]) < 30 && pal.primary[1] >= 12)
      .map(r => `primary hue is close to ${r}: ${r} states need an icon and a word, never colour alone`);
    out.checks = checks(out);
    return out;
  }
  function checks(s) {
    const pairs = [];
    for (const sf of SURFACES) pairs.push(['on-surface', sf, 4.5], ['on-surface-variant', sf, 4.5], ['primary', sf, 3], ['outline', sf, 3], ['error', sf, 4.5]);
    pairs.push(['primary', 'surface', 4.5]);
    for (const g of ['primary', 'secondary', 'tertiary', 'error', 'success', 'warning']) pairs.push(['on-' + g, g, 4.5], [`on-${g}-container`, `${g}-container`, 4.5]);
    pairs.push(['inverse-on-surface', 'inverse-surface', 4.5], ['inverse-primary', 'inverse-surface', 3]);
    for (let i = 1; i <= 5; i++) for (const sf of ['surface', 'surface-container-low', 'surface-container-lowest']) pairs.push(['chart-' + i, sf, 3]);
    const res = [];
    for (const t of ['light', 'dark']) for (const [fg, bg, need] of pairs) { const r = contrast(s[t][fg], s[t][bg]); res.push({ theme: t, fg, bg, need, ratio: Math.round(r * 100) / 100, pass: r >= need }); }
    return res;
  }
  return { build, contrast, hslSeed };
})();
if (typeof module !== 'undefined') module.exports = GD;
