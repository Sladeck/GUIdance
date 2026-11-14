(() => {
  // GUIdance inspect check. The first run registers it as window.__gd.inspect; later runs on the same
  // page (after resizing, switching theme) can call __gd.inspect() instead of sending this code again.
  const run = () => {
  // GUIdance inspect: visual consistency of the rendered page at the current width.
  // Returns { viewport, scales, findings[], summary }. Set window.__GD_OVERLAY = true first to outline findings on the page.
  // Colours or layout still transitioning (theme switch, hover) would be measured half-way: wait and run again
  if (document.getAnimations && document.getAnimations().some(a => typeof CSSTransition !== 'undefined' && a instanceof CSSTransition && a.playState === 'running'))
    return { inconclusive: true, summary: 'INCONCLUSIVE: CSS transitions are still running (for example after a theme switch). Wait half a second and run again.' };
  const M3 = {
    spacing: [0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 32, 36, 40, 48, 56, 64, 72, 80, 96, 112, 128],
    radius: [0, 4, 8, 12, 16, 20, 28, 32, 48],
    type: [11, 12, 14, 16, 22, 24, 28, 32, 36, 45, 57],
  };
  const px = v => { v = String(v).trim(); let m = v.match(/^(-?[\d.]+)px$/); if (m) return +m[1]; m = v.match(/^(-?[\d.]+)rem$/); if (m) return +m[1] * 16; return null; };

  // 1. Project scales from custom properties on :root / html (fallback: Material 3)
  const vars = {}; let unreadable = 0;
  for (const sheet of [...document.styleSheets]) {
    let rules; try { rules = sheet.cssRules; } catch (e) { unreadable++; continue; }
    const walk = list => { for (const r of list) { if (r.styleSheet) { try { walk(r.styleSheet.cssRules); } catch (e) { unreadable++; } continue; } if (r.cssRules && !r.selectorText) walk(r.cssRules); else if (r.selectorText && /(^|,)\s*(:root|html)\b/.test(r.selectorText)) for (const n of r.style) if (n.startsWith('--')) vars[n] = r.style.getPropertyValue(n).trim(); } };
    walk(rules);
  }
  for (const n of document.documentElement.style) if (n.startsWith('--')) vars[n] = document.documentElement.style.getPropertyValue(n).trim();   // set by script (theme providers)
  // Layout switch points: the project's own width media queries; Material 3 window classes if there are none
  const bps = new Map();
  const toPx = (n, u) => u === 'px' ? +n : +n * 16;
  for (const sheet of [...document.styleSheets]) {
    let rules; try { rules = sheet.cssRules; } catch (e) { continue; }
    const walk = list => { for (const r of list) { if (r.styleSheet) { try { walk(r.styleSheet.cssRules); } catch (e) {} continue; } if (r.cssRules) walk(r.cssRules);
      const cond = r.conditionText || (r.media && r.media.mediaText) || '';
      for (const m of cond.matchAll(/(min|max)-width\s*:\s*([\d.]+)(px|em|rem)/g)) { const v = toPx(m[2], m[3]); const edge = m[1] === 'min' ? [Math.ceil(v) - 1, Math.ceil(v)] : [Math.floor(v), Math.floor(v) + 1]; bps.set(edge.join('/'), edge); }
      for (const m of cond.matchAll(/([\d.]+)(px|em|rem)\s*(<=|<|>=|>)\s*width|width\s*(<=|<|>=|>)\s*([\d.]+)(px|em|rem)/g)) { const v = toPx(m[1] || m[5], m[2] || m[6]); const e = [Math.floor(v) - 1, Math.floor(v)]; bps.set(e.join('/'), e); } } };
    walk(rules);
  }
  const edges = [...bps.values()].filter(e => e[0] >= 300 && e[1] <= 2000).sort((a, b) => a[0] - b[0]);
  const breakpoints = edges.length ? { from: 'project media queries', widths: edges } : { from: 'Material 3 window classes', widths: [[599, 600], [839, 840], [1199, 1200]] };
  const rootCs = getComputedStyle(document.documentElement);
  const tok = { spacing: [], radius: [], type: [], colour: [] };
  for (const n of Object.keys(vars)) {
    const v = rootCs.getPropertyValue(n).trim(), p = px(v), low = n.toLowerCase();
    if (/^(#[0-9a-f]{3,8}$|rgba?\(|hsla?\(|oklch\(|oklab\(|lab\(|lch\(|color\()/i.test(v)) tok.colour.push(v);   // any variable holding a colour
    else if (p !== null && p >= 0) {
      if (/radius|rounded|corner/.test(low)) tok.radius.push(p);
      else if (/font-size|text-|fs-|type/.test(low) && !/line-height|leading|weight|tracking|letter-spacing/.test(low)) tok.type.push(p);
      else if (/space|spacing|gap|gutter|pad|inset/.test(low)) tok.spacing.push(p);
    }
  }
  const scale = k => { const t = [...new Set(tok[k])]; return t.length >= 3 ? { values: [...new Set([0, ...t])].sort((a, b) => a - b), from: 'project tokens' } : { values: M3[k], from: 'Material 3' }; };
  const S = { spacing: scale('spacing'), radius: scale('radius'), type: scale('type') };
  const onScale = (v, k) => S[k].values.some(s => Math.abs(s - v) < 0.6);
  const nearest = (v, k) => S[k].values.reduce((a, b) => (Math.abs(b - v) < Math.abs(a - v) ? b : a));

  // 2. Visible elements
  const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'META', 'LINK', 'BR', 'HEAD', 'svg', 'SVG', 'PATH']);
  const els = [];
  for (const el of document.body.querySelectorAll('*')) {
    if (SKIP.has(el.tagName) || el.closest('svg') && el.tagName.toLowerCase() !== 'svg') continue;
    if (el.closest('[data-gd-overlay]')) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) continue;
    els.push({ el, cs, r });
    if (els.length > 4000) break;
  }
  const info = new Map(els.map(e => [e.el, e]));
  const path = el => {
    if (el.id) return '#' + el.id;
    const parts = []; let e = el;
    while (e && e.nodeType === 1 && e !== document.body && parts.length < 3) {
      let s = e.tagName.toLowerCase();
      const cls = [...e.classList].filter(c => c.length < 30).slice(0, 2);
      if (cls.length) s += '.' + cls.join('.');
      parts.unshift(s); if (e.id) { parts[0] = '#' + e.id; break; } e = e.parentElement;
    }
    return parts.join(' > ');
  };
  const label = el => (el.getAttribute('aria-label') || el.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 40);
  const where = el => { const t = label(el); return path(el) + (t ? ` "${t}"` : ''); };

  const F = [];
  // why and fix text per kind: browser-checks.md (kept out of the code so it is not sent to the browser every time)
  const add = (sev, rule, kind, el, value, expected, extra = {}) => F.push({ severity: sev, rule, kind, where: el ? where(el) : '(page)', value, expected, el, ...extra });

  // 3. Horizontal overflow
  const sw = document.documentElement.scrollWidth;
  if (sw > innerWidth + 1) {
    // The break-out point: elements wider than the screen whose parent still fits. Grouped by parent.
    const wide = els.filter(e => e.r.right > innerWidth + 1 && e.cs.position !== 'fixed');
    const breakers = wide.filter(e => { const p = info.get(e.el.parentElement); return !p || p.r.right <= innerWidth + 1 || p.el === document.body; });
    const byParent = new Map(); for (const b of breakers) (byParent.get(b.el.parentElement) || byParent.set(b.el.parentElement, []).get(b.el.parentElement)).push(b);
    const groups = [...byParent].sort((a, b) => Math.max(...b[1].map(x => x.r.right)) - Math.max(...a[1].map(x => x.r.right))).slice(0, 3);
    if (!groups.length) groups.push([null, []]);
    for (const [par, kids] of groups) {
      const el = kids.length === 1 ? kids[0].el : par;
      const why = kids.length > 1 ? ` (${kids.length} children of ${path(par)} reach ${Math.round(Math.max(...kids.map(k => k.r.right)))}px)` : '';
      const cs0 = kids[0] && getComputedStyle(kids[0].el);
      const hint = cs0 && px(cs0.minWidth) > 0 ? ` Its children have min-width: ${cs0.minWidth}; let them wrap or stack (flex-wrap: wrap, or a grid with minmax).` : '';
      add('Hard', '4.4', 'horizontal-scroll', el, `page is ${sw}px wide in a ${innerWidth}px viewport${why}`, `no horizontal scroll at ${innerWidth}px`, { cause: hint.trim() || undefined });
    }
  }

  // 3b. Content cut off inside its box (overflow hidden or clip, no ellipsis on purpose)
  for (const { el, cs, r } of els) {
    if (!/hidden|clip/.test(cs.overflowX + cs.overflowY) || cs.textOverflow === 'ellipsis' || el.matches('input, textarea, select, img, video, canvas, iframe')) continue;
    if (/^-?webkit-box$/.test(cs.display) || cs.webkitLineClamp && cs.webkitLineClamp !== 'none') continue;
    const over = Math.max(el.scrollWidth - el.clientWidth, /hidden|clip/.test(cs.overflowY) ? el.scrollHeight - el.clientHeight : 0);
    if (over <= 2 || !(el.innerText || '').trim()) continue;
    if ([...el.querySelectorAll('*')].some(c => c.scrollWidth > el.clientWidth * 1.5)) continue;   // carousels and sliders
    add('Hard', '4.4', 'clipped-content', el, `content ${Math.round(over)}px larger than its box (overflow: ${cs.overflowX === cs.overflowY ? cs.overflowX : cs.overflowX + ' ' + cs.overflowY})`, 'content fits, or is truncated on purpose');
  }

  // 3c. Content sticking out of its card or box (nearest ancestor with a border or background)
  const painted = cs => (px(cs.borderTopWidth) > 0 && cs.borderTopStyle !== 'none') || (parseFloat((cs.backgroundColor.match(/[\d.]+/g) || [0, 0, 0, 0])[3] ?? 1) > 0 && cs.backgroundColor !== 'rgba(0, 0, 0, 0)');
  const spilled = new Set();
  for (const { el, cs, r } of els) {
    if (/absolute|fixed|sticky/.test(cs.position) || !(el.innerText || '').trim() && !el.matches('img, svg, button, input')) continue;
    let a = el.parentElement, ai;
    while (a && a !== document.body && !((ai = info.get(a)) && painted(ai.cs))) a = a.parentElement;
    if (!ai || a === document.body || spilled.has(a)) continue;
    const out = Math.max(r.right - ai.r.right, ai.r.left - r.left, r.bottom - ai.r.bottom);
    if (out > 2 && !/hidden|clip|auto|scroll/.test(ai.cs.overflowX + ai.cs.overflowY)) {
      spilled.add(a);
      add('Hard', '4.4', 'overflows-container', el, `sticks out ${Math.round(out)}px past ${path(a)}`, 'inside its container with its padding');
    }
  }

  // 4. Spacing values off the scale (grouped by value)
  const offSpace = new Map();
  for (const { el, cs } of els) {
    const vals = [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft, cs.marginTop, cs.marginBottom];
    if (/flex|grid/.test(cs.display)) vals.push(cs.rowGap, cs.columnGap);
    for (const raw of vals) {
      const v = px(raw); if (v === null || v < 2 || onScale(Math.abs(v), 'spacing')) continue;
      const k = Math.round(Math.abs(v) * 10) / 10;
      const g = offSpace.get(k) || { n: 0, els: [] }; g.n++; if (g.els.length < 3) g.els.push(el); offSpace.set(k, g);
    }
  }
  for (const [v, g] of [...offSpace].sort((a, b) => b[1].n - a[1].n).slice(0, 12))
    add('Default', '4.1', 'spacing-off-scale', g.els[0], `${v}px used ${g.n} time${g.n > 1 ? 's' : ''}`, `${nearest(v, 'spacing')}px (${S.spacing.from} scale)`, { also: g.els.slice(1).map(where) });

  // 5. Uneven gaps between siblings in the same list, row or grid
  const parents = new Set(els.map(e => e.el.parentElement).filter(Boolean));
  for (const p of parents) {
    const kids = [...p.children].map(c => info.get(c)).filter(k => k && !/absolute|fixed/.test(k.cs.position));
    if (kids.length < 3) continue;
    const sameRow = kids.every(k => Math.abs(k.r.top - kids[0].r.top) < 4);
    const sameCol = kids.every(k => Math.abs(k.r.left - kids[0].r.left) < 4);
    if (!sameRow && !sameCol) continue;
    const gaps = [];
    for (let i = 1; i < kids.length; i++) gaps.push(Math.round(sameRow ? kids[i].r.left - kids[i - 1].r.right : kids[i].r.top - kids[i - 1].r.bottom));
    if (gaps.some(g => g < 0)) continue;
    if (/space-|center|end/.test(getComputedStyle(p).justifyContent) && sameRow) continue;   // distributed on purpose
    const med = gaps.slice().sort((x, y) => x - y)[Math.floor((gaps.length - 1) / 2)];
    if (Math.max(...gaps) > 48 && Math.max(...gaps) > 4 * Math.max(med, 1) && gaps.filter(g => g === Math.max(...gaps)).length === 1) continue;   // one spacer (margin: auto) pushing groups apart
    const mn = Math.min(...gaps), mx = Math.max(...gaps);
    if (mx - mn > 2 && mx - mn >= mn * 0.25) {
      const common = gaps.slice().sort((a, b) => gaps.filter(x => x === b).length - gaps.filter(x => x === a).length)[0];
      add('Strong', '4.2', 'uneven-gaps', p, `gaps ${gaps.join(', ')}px between ${kids.length} ${sameRow ? 'items in a row' : 'stacked items'}`, `one gap (${common}px)`);
    }
  }

  // 6. Same component, different look: elements with identical tag and classes whose padding, radius, border or size differ (inline styles, overrides)
  const groups = new Map();
  for (const e of els) {
    const cls = [...e.el.classList].sort();
    if (!cls.length) continue;
    const par = e.el.parentElement, pk = par ? par.tagName + '.' + [...par.classList].sort().join('.') : '';
    const key = pk + ' > ' + e.el.tagName + '.' + cls.join('.');
    (groups.get(key) || groups.set(key, []).get(key)).push(e);
  }
  for (const [key, list] of groups) {
    if (list.length < 2) continue;
    for (const [prop, get, rule] of [
      ['padding', e => [e.cs.paddingTop, e.cs.paddingRight, e.cs.paddingBottom, e.cs.paddingLeft].join(' '), '4.1'],
      ['corner radius', e => e.cs.borderTopLeftRadius, '5.1'],
      ['border', e => e.cs.borderTopWidth + ' ' + e.cs.borderTopStyle, '4.5'],
      ['font size', e => e.cs.fontSize, '3.1'],
    ]) {
      const counts = new Map(); list.forEach(e => counts.set(get(e), (counts.get(get(e)) || 0) + 1));
      if (counts.size < 2) continue;
      const sorted = [...counts].sort((a, b) => b[1] - a[1]);
      const odd = list.find(e => get(e) !== sorted[0][0]);
      add('Default', '4.5', 'component-drift', odd.el, `${prop} differs between ${list.length} "${key.split(' > ')[1].split('.').slice(1).join('.')}" elements: ${sorted.map(([v, n]) => `${v} (x${n})`).join(', ')}`, `${sorted[0][0]} on all`);
    }
  }

  // 7. Headings closer to the section above than to their own content
  for (const e of els) {
    if (!/^H[1-6]$/.test(e.el.tagName) && e.el.getAttribute('role') !== 'heading') continue;
    const prev = info.get(e.el.previousElementSibling), next = info.get(e.el.nextElementSibling);
    if (!prev || !next) continue;
    const above = Math.round(e.r.top - prev.r.bottom), below = Math.round(next.r.top - e.r.bottom);
    if (above >= 0 && below > above + 2)
      add('Strong', '4.2', 'heading-proximity', e.el, `${above}px above, ${below}px below`, 'more space above than below');
  }

  // 8. Corner radius: off-scale values, too many values, nested corners not concentric
  const radii = new Map();
  for (const e of els) {
    const r = px(e.cs.borderTopLeftRadius); if (r === null || r <= 0) continue;
    if (r >= Math.min(e.r.width, e.r.height) / 2 - 1) continue;   // pills and circles
    const g = radii.get(r) || { n: 0, el: e.el }; g.n++; radii.set(r, g);
  }
  for (const [r, g] of radii) if (!onScale(r, 'radius'))
    add('Default', '5.1', 'radius-off-scale', g.el, `${r}px corner radius (x${g.n})`, `${nearest(r, 'radius')}px (${S.radius.from} scale)`);
  if (radii.size > 5)
    add('Default', '5.1', 'radius-count', null, `${radii.size} different corner radii: ${[...radii.keys()].sort((a, b) => a - b).join(', ')}px`, '3 or 4 steps');
  for (const e of els) {
    const rc = px(e.cs.borderTopLeftRadius); if (!rc || rc >= Math.min(e.r.width, e.r.height) / 2 - 1) continue;
    let p = e.el.parentElement, pe;
    while (p && !(pe = info.get(p) && px(info.get(p).cs.borderTopLeftRadius) > 0 ? info.get(p) : null)) p = p.parentElement;
    if (!pe) continue;
    const rp = px(pe.cs.borderTopLeftRadius); if (rp >= Math.min(pe.r.width, pe.r.height) / 2 - 1) continue;
    const inset = Math.min(e.r.left - pe.r.left, e.r.top - pe.r.top);
    if (inset < 2 || inset > 32 || inset > rp * 0.6) continue;   // wide padding: the corners are far apart, any small inner radius works
    const want = Math.max(rp - inset, 0);
    if (Math.abs(rc - want) > 3 && rc >= want)
      add('Default', '5.2', 'nested-radius', e.el, `${rc}px inside a ${rp}px parent with ${Math.round(inset)}px padding`, `about ${want}px (outer - padding)`);
  }

  // 9. Field borders too faint, and too many border widths
  const parseC = c => { const m = String(c).match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1]; };
  const lin = v => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const L = c => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
  const over = (fg, bg) => [0, 1, 2].map(i => fg[i] * fg[3] + bg[i] * (1 - fg[3])).concat(1);
  const ratio = (a, b) => (Math.max(L(a), L(b)) + 0.05) / (Math.min(L(a), L(b)) + 0.05);
  const bgOf = el => { const layers = []; for (let e = el; e; e = e.parentElement) { const c = parseC(getComputedStyle(e).backgroundColor); if (c && c[3] > 0) { layers.push(c); if (c[3] >= 1) break; } } let bg = [255, 255, 255, 1]; for (const c of layers.reverse()) bg = over(c, bg); return bg; };
  for (const e of els) {
    if (!e.el.matches('input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=hidden]), select, textarea') || e.el.disabled) continue;
    const page = bgOf(e.el.parentElement || document.body), own = bgOf(e.el);
    const bw = px(e.cs.borderBottomWidth) || 0, bc = parseC(e.cs.borderBottomColor);
    const borderR = bw > 0 && bc ? ratio(over(bc, own), page) : 0, fillR = ratio(own, page);
    if (Math.max(borderR, fillR) < 3)
      add('Hard', '1.2', 'faint-field', e.el, `border ${borderR.toFixed(2)}:1, fill ${fillR.toFixed(2)}:1 against the page`, '3:1 for the border or the fill');
  }
  const bws = new Set(els.filter(e => e.cs.borderTopStyle !== 'none' && px(e.cs.borderTopWidth) > 0).map(e => px(e.cs.borderTopWidth)));
  if (bws.size > 3) add('Default', '4.5', 'border-widths', null, `${bws.size} border widths: ${[...bws].sort((a, b) => a - b).join(', ')}px`, '1 or 2 widths (hairline, focus/emphasis)');

  // 10. Colours: near-duplicates and colours outside the token set
  const used = new Map();
  const note = (c, el) => { const p = parseC(c); if (!p || p[3] === 0) return; const k = p.slice(0, 3).map(Math.round).join(','); const g = used.get(k) || { n: 0, el, rgb: p }; g.n++; used.set(k, g); };
  for (const { el, cs } of els) { note(cs.backgroundColor, el); if (el.childNodes.length && [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) note(cs.color, el); if (px(cs.borderTopWidth) > 0 && cs.borderTopStyle !== 'none') note(cs.borderTopColor, el); }
  const list = [...used.entries()];
  const toks = tok.colour.map(c => { const d = document.createElement('i'); d.style.color = c; document.body.append(d); const v = parseC(getComputedStyle(d).color); d.remove(); return v; }).filter(Boolean);
  const isTok = (rgb, tol = 2) => toks.some(t => Math.max(...[0, 1, 2].map(x => Math.abs(t[x] - rgb[x]))) <= tol);
  const reported = new Set();
  for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
    const [ka, a] = list[i], [kb, b] = list[j];
    const d = Math.max(...[0, 1, 2].map(x => Math.abs(a.rgb[x] - b.rgb[x])));
    if (d > 0 && d <= 6 && !(isTok(a.rgb, 0.5) && isTok(b.rgb, 0.5)) && !reported.has(ka) && !reported.has(kb)) {
      reported.add(ka); reported.add(kb);
      const [keep, drop] = a.n >= b.n ? [a, b] : [b, a];
      add('Default', '4.5', 'near-duplicate-colour', drop.el, `rgb(${drop.rgb.slice(0, 3).map(Math.round).join(',')}) next to rgb(${keep.rgb.slice(0, 3).map(Math.round).join(',')})`, 'one colour');
    }
  }
  if (tok.colour.length >= 6) {
    const off = list.filter(([, g]) => !isTok(g.rgb) && !(g.rgb[0] === g.rgb[1] && g.rgb[1] === g.rgb[2] && (g.rgb[0] === 0 || g.rgb[0] === 255)));
    for (const [, g] of off.sort((a, b) => b[1].n - a[1].n).slice(0, 8))
      add('Default', '1.4', 'colour-off-token', g.el, `rgb(${g.rgb.slice(0, 3).map(Math.round).join(',')}) used ${g.n} time${g.n > 1 ? 's' : ''}`, 'a colour from the project tokens');
  }

  // 11. Type: off-scale sizes, too many weights
  const sizes = new Map(), weights = new Set();
  for (const { el, cs } of els) {
    if (![...el.childNodes].some(n => n.nodeType === 3 && /[\p{L}\p{N}]{2}/u.test(n.textContent))) continue;   // real words, not icon glyphs
    const s = Math.round(parseFloat(cs.fontSize) * 10) / 10; const g = sizes.get(s) || { n: 0, el }; g.n++; sizes.set(s, g); weights.add(cs.fontWeight);
  }
  for (const [s, g] of sizes) if (!onScale(s, 'type'))
    add('Default', '3.1', 'type-off-scale', g.el, `${s}px text (x${g.n})`, `${nearest(s, 'type')}px (${S.type.from} scale)`);
  if (weights.size > 3) add('Default', '3.1', 'weight-count', null, `${weights.size} font weights: ${[...weights].sort().join(', ')}`, '3 weights at most (regular, medium, bold)');

  // 12. Almost aligned: stacked siblings whose left edges miss by 1 to 3px
  for (const p of parents) {
    const kids = [...p.children].map(c => info.get(c)).filter(k => k && !/absolute|fixed/.test(k.cs.position) && !/inline/.test(k.cs.display));
    if (kids.length < 2) continue;
    for (let i = 1; i < kids.length; i++) {
      const a = kids[i - 1], b = kids[i];
      if (b.r.top < a.r.bottom - 1) continue;
      const pr = info.get(p), padR = pr ? pr.r.right - px(pr.cs.paddingRight) - px(pr.cs.borderRightWidth) : 0;
      if (pr && Math.abs(b.r.right - padR) < 1 && b.r.width < pr.r.width * 0.8) continue;   // right-aligned on purpose
      const pR = p.getBoundingClientRect(), spans = e => e.r.left <= pR.left + 1 && e.r.right >= pR.right - 1;
      if ((spans(a) && b.r.width < a.r.width - 4) || (spans(b) && a.r.width < b.r.width - 4)) continue;   // full-bleed bar next to a narrower centred container: no shared edge
      const centred = e => { const ml = px(e.cs.marginLeft), mr = px(e.cs.marginRight); return ml > 0 && Math.abs(ml - mr) < 1; };
      if (centred(a) || centred(b)) continue;   // centred with auto margins: its edge depends on the window width
      const d = Math.abs(Math.round(b.r.left - a.r.left));
      if (d >= 1 && d <= 3) { add('Default', '4.5', 'near-alignment', b.el, `left edge ${d}px off from the element above`, 'the same left edge'); break; }
    }
  }

  // 13. Elevation: too many shadows, border plus strong shadow, shadow-only separation in dark
  const shadowLen = sh => (sh.match(/-?[\d.]+px/g) || []).map(parseFloat);   // x, y, blur, spread of the first shadow
  const shadows = new Map(); const pageDark = L(bgOf(document.body)) < 0.2;
  for (const { el, cs } of els) {
    const sh = cs.boxShadow; if (!sh || sh === 'none' || el.matches(':focus, :focus-visible')) continue;
    const [x = 0, y = 0, blur = 0] = shadowLen(sh);
    if (blur === 0 || /^inset/.test(sh.trim())) continue;   // hard rings and inset lines draw borders or focus, not elevation
    const key = sh.replace(/rgba?\([^)]*\)/g, c => c.replace(/\s/g, ''));
    const g = shadows.get(key) || { n: 0, el }; g.n++; shadows.set(key, g);
    const bordered = px(cs.borderTopWidth) > 0 && cs.borderTopStyle !== 'none';
    if (bordered && (blur >= 8 || Math.abs(y) >= 4))
      add('Default', '5.3', 'border-and-shadow', el, `${cs.borderTopWidth} border plus a ${blur}px shadow`, 'one cue: a border, a shadow or a tonal step');
    if (pageDark && !bordered && Math.abs(L(bgOf(el)) - L(bgOf(el.parentElement || document.body))) < 0.01)
      add('Default', '5.3', 'dark-shadow-only', el, 'separated from its background only by a shadow, on a dark theme', 'a lighter surface-container tone as well');
  }
  if (shadows.size > 3)
    add('Default', '5.3', 'shadow-count', [...shadows.values()][0].el, `${shadows.size} different shadows on the page`, 'three elevation levels at most, from tokens', { also: [...shadows.keys()].slice(0, 6) });

  // 14. Icons: sizes, stroke widths, alignment with their label
  const ICON_SIZES = [16, 18, 20, 24, 32, 36, 40, 48];
  const iconEls = [];
  const ICON_CLASS = /(^|\s)(material-symbols[\w-]*|material-icons[\w-]*|icons?|(fa|bi|ti|ph|lucide|icon|mdi|ri)-[\w-]+)(\s|$)/;
  const pushIcon = (el, size, r) => {
    const isSvg = el.tagName.toLowerCase() === 'svg', shape = isSvg && el.querySelector('path, line, circle, polyline, polygon, rect, ellipse');
    iconEls.push({ el, size, r, stroke: isSvg ? (el.getAttribute('stroke-width') || (shape && shape.getAttribute('stroke-width')) || (shape && getComputedStyle(shape).stroke !== 'none' ? getComputedStyle(shape).strokeWidth : null)) : null,
                   outline: isSvg && ((el.getAttribute('fill') || (shape && shape.getAttribute('fill'))) === 'none') });
  };
  for (const el of document.body.querySelectorAll('svg')) {
    if (el.parentElement.closest('svg') || el.closest('[data-gd-overlay]')) continue;
    const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
    if (r.width < 8 || r.width > 64 || r.height > 64 || cs.display === 'none' || cs.visibility === 'hidden') continue;
    pushIcon(el, Math.round(Math.max(r.width, r.height)), r);
  }
  for (const { el, cs, r } of els) {
    if (el.children.length) continue;
    const cls = typeof el.className === 'string' ? el.className : '';
    if (ICON_CLASS.test(cls) && !/btn|button/.test(cls.match(ICON_CLASS)[2]) && el.textContent.trim().length < 40) pushIcon(el, Math.round(parseFloat(cs.fontSize)), r);
    else if (el.closest('button, a, [role=button]') && /^\s*[^\p{L}\p{N}\s]{1,2}\s*$/u.test(el.textContent)) pushIcon(el, Math.round(parseFloat(cs.fontSize)), r);
  }
  if (iconEls.length) {
    const bySize = new Map(); iconEls.forEach(i => { const g = bySize.get(i.size) || { n: 0, el: i.el }; g.n++; bySize.set(i.size, g); });
    for (const [s, g] of bySize) if (!ICON_SIZES.includes(s))
      add('Default', '5.4', 'icon-size-off', g.el, `${s}px icons (x${g.n})`, '20 or 24px (16, 18, 32, 40, 48 for special cases)');
    if (bySize.size > 2)
      add('Default', '5.4', 'icon-size-count', null, `${bySize.size} icon sizes: ${[...bySize].sort((a, b) => a[0] - b[0]).map(([s, g]) => `${s}px x${g.n}`).join(', ')}`, 'two sizes per screen');
    const strokes = new Map(); iconEls.filter(i => i.stroke && i.outline).forEach(i => { const k = String(parseFloat(i.stroke)); const g = strokes.get(k) || { n: 0, el: i.el }; g.n++; strokes.set(k, g); });
    if (strokes.size > 1)
      add('Default', '5.4', 'icon-stroke-mix', [...strokes.values()][1].el, `outline icons with stroke widths ${[...strokes].map(([k, g]) => `${k} (x${g.n})`).join(', ')}`, 'one stroke width (one icon set)');
    for (const i of iconEls) {
      const p = i.el.parentElement; if (!p || !/flex|grid/.test(getComputedStyle(p).display)) continue;
      const tn = [...p.childNodes].find(n => n.nodeType === 3 && n.textContent.trim()) || [...p.children].find(c => c !== i.el && !/absolute|fixed/.test(getComputedStyle(c).position) && c.childNodes.length === 1 && c.firstChild.nodeType === 3 && c.textContent.trim());
      if (!tn) continue;
      const range = document.createRange(); range.selectNodeContents(tn); const rects = [...range.getClientRects()]; if (rects.length !== 1) continue;
      const d = Math.abs((i.r.top + i.r.bottom) / 2 - (rects[0].top + rects[0].bottom) / 2);
      if (d > 2 && d < 12) { add('Default', '5.4', 'icon-misaligned', i.el, `icon centre ${d.toFixed(1)}px off its label's centre`, 'centred on the text line'); }
    }
  }

  // Merge identical findings on repeated components (same kind, same measured value, same tag and classes)
  const sig = el => el ? el.tagName + '.' + [...el.classList].sort().join('.') : '';
  const merged = new Map();
  for (const f of F) { const k = f.kind + '|' + f.value + '|' + sig(f.el); const m = merged.get(k);
    if (m) { m.count++; if (m.others.length < 3) m.others.push(where(f.el)); } else merged.set(k, Object.assign(f, { count: 1, others: f.also || [] })); }
  F.length = 0; for (const f of merged.values()) { delete f.also; if (f.count > 1) f.value += ` (on ${f.count} elements)`; F.push(f); }

  // Order and summary
  const rank = { Hard: 0, Strong: 1, Default: 2 };
  const breaks = { 'horizontal-scroll': 0, 'overflows-container': 1, 'clipped-content': 2 };   // layout breaks first within a level
  F.sort((a, b) => rank[a.severity] - rank[b.severity] || (breaks[a.kind] ?? 9) - (breaks[b.kind] ?? 9) || b.count - a.count);
  if (window.__GD_OVERLAY) {
    document.querySelectorAll('[data-gd-overlay]').forEach(n => n.remove());
    const byEl = new Map(); F.forEach((f, i) => { if (f.el) (byEl.get(f.el) || byEl.set(f.el, []).get(f.el)).push([i + 1, f.severity]); });
    for (const [el, list] of byEl) { const r = el.getBoundingClientRect(); const sev = list.some(x => x[1] === 'Hard') ? '#d00' : list.some(x => x[1] === 'Strong') ? '#e80' : '#06c';
      const box = document.createElement('div'); box.dataset.gdOverlay = '';
      box.style.cssText = `position:absolute;left:${r.left + scrollX}px;top:${r.top + scrollY}px;width:${r.width}px;height:${r.height}px;outline:2px solid ${sev};z-index:2147483647;pointer-events:none`;
      const tag = document.createElement('span'); tag.textContent = list.map(x => x[0]).join(', '); tag.style.cssText = `position:absolute;top:-10px;left:-10px;background:${sev};color:#fff;font:600 11px system-ui;padding:1px 5px;border-radius:8px;white-space:nowrap`;
      box.append(tag); document.body.append(box); }
  }
  const findings = F.map(({ el, ...f }, i) => ({ n: i + 1, ...f }));
  const c = s => findings.filter(f => f.severity === s).length;
  const sheetNote = unreadable ? ` WARNING: ${unreadable} stylesheet(s) could not be read (file:// page or cross-origin CSS), so project tokens and breakpoints may be missing; serve the folder over http and run again.` : '';
  return { viewport: `${innerWidth}x${innerHeight}`, breakpoints, scales: { spacing: S.spacing.from, radius: S.radius.from, type: S.type.from }, findings,
           unreadableStylesheets: unreadable,
           summary: `${findings.length} findings at ${innerWidth}px: ${c('Hard')} Hard, ${c('Strong')} Strong, ${c('Default')} Default (scales from ${S.spacing.from})` + sheetNote };
};
  (window.__gd = window.__gd || {}).inspect = run;
  return run();
})()
