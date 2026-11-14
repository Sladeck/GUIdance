(() => {
  // GUIdance contrast check. The first run registers it as window.__gd.contrast; later runs on the same
  // page (after resizing, switching theme) can call __gd.contrast() instead of sending this code again.
  const run = () => {
  // GUIdance rendered-contrast check (WCAG 1.4.3). Run on the page.
  // Colours or layout still transitioning (theme switch, hover) would be measured half-way: wait and run again
  if (document.getAnimations && document.getAnimations().some(a => typeof CSSTransition !== 'undefined' && a instanceof CSSTransition && a.playState === 'running'))
    return { inconclusive: true, summary: 'INCONCLUSIVE: CSS transitions are still running (for example after a theme switch). Wait half a second and run again.' };
  const parse = c => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1]; };
  const lin = v => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const L = c => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
  const over = (fg, bg) => [0, 1, 2].map(i => fg[i] * fg[3] + bg[i] * (1 - fg[3])).concat(1);
  function background(el) {
    const layers = [];
    for (let e = el; e; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.backgroundImage && cs.backgroundImage !== 'none') return { unknown: true };
      const c = parse(cs.backgroundColor);
      if (c && c[3] > 0) { layers.push(c); if (c[3] >= 1) break; }
    }
    let bg = [255, 255, 255, 1];
    for (const c of layers.reverse()) bg = over(c, bg);
    return { bg };
  }
  const fails = [], unknown = []; let checked = 0;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: n => n.textContent.trim() ? 1 : 2 });
  const seen = new Set(); let n;
  while ((n = walker.nextNode())) {
    const el = n.parentElement; if (!el || seen.has(el)) continue; seen.add(el);
    const cs = getComputedStyle(el), r = el.getBoundingClientRect();
    if (!r.width || !r.height || cs.visibility === 'hidden' || +cs.opacity === 0) continue;
    if (el.closest('button:disabled, [aria-disabled=true], input:disabled')) continue;
    const b = background(el); const text = n.textContent.trim().slice(0, 40);
    if (b.unknown) { unknown.push(text); continue; }
    let fg = parse(cs.color); if (!fg) continue; if (fg[3] < 1) fg = over(fg, b.bg);
    const ratio = (Math.max(L(fg), L(b.bg)) + 0.05) / (Math.min(L(fg), L(b.bg)) + 0.05);
    const size = parseFloat(cs.fontSize), bold = +cs.fontWeight >= 700;
    const icon = !/[\p{L}\p{N}]/u.test(n.textContent);   // a symbol used as an icon: graphical object, 3:1 (WCAG 1.4.11)
    const need = icon || size >= 24 || (bold && size >= 18.66) ? 3 : 4.5;
    checked++;
    if (ratio < need) fails.push(`${ratio.toFixed(2)}:1 (need ${need}${icon ? ', icon' : ''}) "${text}" ${cs.color} on rgb(${b.bg.slice(0, 3).map(Math.round).join(',')})`);
  }
  return { checked, fails, unknownBackground: unknown.slice(0, 10),
           summary: `${fails.length} FAIL of ${checked} text elements` + (unknown.length ? `; ${unknown.length} over images or gradients, check by eye` : '') };
};
  (window.__gd = window.__gd || {}).contrast = run;
  return run();
})()
