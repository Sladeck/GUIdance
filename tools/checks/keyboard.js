(() => {
  // GUIdance keyboard check. The first run registers it as window.__gd.keyboard; later runs on the same
  // page (after resizing, switching theme) can call __gd.keyboard() instead of sending this code again.
  const run = () => {
  // GUIdance keyboard and focus check: walks the page in Tab order and measures each stop.
  // Returns { summary, fail[], warn[], order[] }. Rules 12.1 and 12.5 (WCAG 2.1.1, 2.4.3, 2.4.7, 2.4.11, 1.4.11).
  // Colours or layout still transitioning (theme switch, hover) would be measured half-way: wait and run again
  if (document.getAnimations && document.getAnimations().some(a => typeof CSSTransition !== 'undefined' && a instanceof CSSTransition && a.playState === 'running'))
    return { inconclusive: true, summary: 'INCONCLUSIVE: CSS transitions are still running (for example after a theme switch). Wait half a second and run again.' };
  const startX = scrollX, startY = scrollY, startFocus = document.activeElement;
  const visible = el => { const cs = getComputedStyle(el), r = el.getBoundingClientRect(); return cs.display !== 'none' && cs.visibility !== 'hidden' && r.width > 0 && r.height > 0; };
  const name = el => (el.getAttribute('aria-label') || el.innerText || el.value || el.placeholder || el.title || el.getAttribute('alt') || '').trim().replace(/\s+/g, ' ').slice(0, 40);
  const path = el => { const p = []; let e = el; while (e && e !== document.body && p.length < 3) { let s = e.tagName.toLowerCase(); const c = [...e.classList].filter(x => x.length < 30).slice(0, 2); if (e.id) { p.unshift('#' + e.id); break; } if (c.length) s += '.' + c.join('.'); p.unshift(s); e = e.parentElement; } return p.join(' > '); };
  const where = el => `${path(el)}${name(el) ? ` "${name(el)}"` : ''}`;
  const parse = c => { const m = String(c).match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1]; };
  const lin = v => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const L = c => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
  const over = (f, b) => [0, 1, 2].map(i => f[i] * f[3] + b[i] * (1 - f[3])).concat(1);
  const ratio = (a, b) => (Math.max(L(a), L(b)) + 0.05) / (Math.min(L(a), L(b)) + 0.05);
  const bgOf = el => { const layers = []; for (let e = el; e; e = e.parentElement) { const c = parse(getComputedStyle(e).backgroundColor); if (c && c[3] > 0) { layers.push(c); if (c[3] >= 1) break; } } let bg = [255, 255, 255, 1]; for (const c of layers.reverse()) bg = over(c, bg); return bg; };

  // 1. The Tab sequence: positive tabindex first (ascending), then document order
  const SEL = 'a[href], area[href], button, input:not([type=hidden]), select, textarea, summary, iframe, [contenteditable=""], [contenteditable=true], [tabindex]';
  const all = [...document.querySelectorAll(SEL)].filter(el => !el.disabled && el.tabIndex >= 0 && !el.closest('[inert], fieldset:disabled') && !(el.closest('details:not([open])') && el.tagName !== 'SUMMARY'));
  const radiosSeen = new Set();
  const seq = all.filter(el => { if (el.type === 'radio' && el.name) { const k = el.form + '|' + el.name; if (radiosSeen.has(k)) return false; radiosSeen.add(k); } return true; });
  const positive = seq.filter(el => el.tabIndex > 0).sort((a, b) => a.tabIndex - b.tabIndex);
  const order = positive.concat(seq.filter(el => el.tabIndex === 0));

  const fail = [], warn = [], steps = [];
  for (const el of positive) fail.push(`${where(el)}: tabindex="${el.tabIndex}" moves it ahead of the page order (2.4.3). Use 0 and fix the DOM order instead.`);

  // 2. Visit each stop
  const PROPS = ['outlineStyle', 'outlineWidth', 'outlineColor', 'boxShadow', 'borderTopColor', 'borderBottomColor', 'borderTopWidth', 'backgroundColor', 'color', 'textDecorationLine'];
  let prev = null, pointerMode = 0;
  for (const el of order) {
    if (!visible(el)) {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      if (cs.display !== 'none' && cs.visibility !== 'hidden' && !el.closest('[aria-hidden=true]') && (r.width === 0 || r.height === 0) && el.tagName !== 'INPUT') fail.push(`${where(el)}: focusable but has no size, so focus lands on nothing visible (2.4.7).`);
      continue;
    }
    if (document.activeElement && document.activeElement !== document.body) document.activeElement.blur();
    // Focus can be drawn on the element, its container (:focus-within) or a visible sibling (custom checkboxes, switches)
    const around = [el, el.parentElement, el.parentElement && el.parentElement.parentElement, el.nextElementSibling].filter(x => x && x !== document.body);
    const snap = () => around.map(x => { const c = getComputedStyle(x); return Object.fromEntries(PROPS.map(p => [p, c[p]])); });
    const beforeAll = snap(), b = beforeAll[0];
    el.focus();
    if (document.activeElement !== el) continue;
    const cs = getComputedStyle(el), r = el.getBoundingClientRect();
    if (!el.matches(':focus-visible')) pointerMode++;
    steps.push({ el, r: { top: r.top + scrollY, left: r.left + scrollX } });

    const afterAll = snap();
    const changedAround = around.map((x, i) => PROPS.filter(p => afterAll[i][p] !== beforeAll[i][p] && !(p === 'outlineWidth' && afterAll[i].outlineStyle === 'none')));
    const shownBy = changedAround.findIndex((c, i) => i > 0 && c.length);
    // Visually hidden native input with a styled stand-in (custom checkbox or switch)
    if ((cs.opacity === '0' || r.width <= 1 || r.height <= 1) && /checkbox|radio/.test(el.type || '')) {
      if (shownBy < 0) fail.push(`${where(el)}: hidden ${el.type} with no visible focus on its stand-in (2.4.7). Style input:focus-visible + .track (or the label).`);
      continue;
    }
    // Off-screen while focusable (closed drawers, visually hidden links)
    if (r.right < 0 || r.bottom < 0 || r.left > document.documentElement.scrollWidth || cs.opacity === '0' || cs.clipPath === 'inset(50%)' || (r.width <= 1 && r.height <= 1)) {
      if (!/skip|main content|jump/i.test(name(el))) warn.push(`${where(el)}: focusable while off-screen or invisible. Make it appear on focus (skip links), or remove it from the Tab order until it is shown (inert, hidden).`);
      continue;
    }

    // Visible focus: something must change, and an outline or ring needs 3:1
    const changed = changedAround[0];
    const outline = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0;
    const ring = cs.boxShadow !== 'none' && cs.boxShadow !== b.boxShadow;
    if (!changed.length && shownBy > 0) { /* focus drawn on the container or sibling: accepted */ }
    else if (!changed.length) fail.push(`${where(el)}: no visible change on focus (2.4.7). Add a :focus-visible outline, for example 2px solid var(--focus-ring-color) with 2px offset.`);
    else if (outline || ring) {
      const col = parse(outline ? cs.outlineColor : (cs.boxShadow.match(/rgba?\([^)]*\)/) || [''])[0]);
      const around = bgOf(el.parentElement || document.body);
      if (col && col[3] > 0) { const rr = ratio(over(col, around), around); if (rr < 3) warn.push(`${where(el)}: focus indicator ${rr.toFixed(2)}:1 against the background, under 3:1 (1.4.11). Use a darker ring or the primary colour.`); }
    } else if (changed.every(p => /Color$|^color$/.test(p) && p !== 'outlineColor')) warn.push(`${where(el)}: focus shown only by a colour change (${changed.join(', ')}). Check it reaches 3:1 against the unfocused state, or add an outline.`);

    // Obscured: sample points; all covered by other content = fail, most covered = warn
    const pts = [[0.5, 0.5], [0.15, 0.2], [0.85, 0.2], [0.15, 0.8], [0.85, 0.8]].map(([fx, fy]) => [r.left + r.width * fx, r.top + r.height * fy]).filter(([x, y]) => x >= 0 && y >= 0 && x < innerWidth && y < innerHeight);
    if (pts.length) {
      const covered = pts.filter(([x, y]) => { const hit = document.elementFromPoint(x, y); return hit && hit !== el && !el.contains(hit) && !hit.contains(el); });
      const cover = covered.length && document.elementFromPoint(covered[0][0], covered[0][1]);
      if (covered.length === pts.length) fail.push(`${where(el)}: completely hidden by ${cover ? path(cover) : 'other content'} when focused (2.4.11). Add scroll-padding-top/bottom equal to the sticky bar's height.`);
      else if (covered.length >= 3) warn.push(`${where(el)}: mostly hidden by ${cover ? path(cover) : 'other content'} when focused (2.4.11 passes, but users lose track of focus). Add scroll-padding.`);
    }

    // Order: a backward jump upward that is not a move to a new column
    if (prev) {
      const up = prev.r.top - (r.top + scrollY);
      if (up > 120 && (r.left + scrollX) <= prev.r.left + 8) warn.push(`${where(el)}: Tab jumps back up ${Math.round(up)}px from ${where(prev.el)} (2.4.3). Check the DOM order matches the visual order.`);
    }
    prev = steps[steps.length - 1];
  }

  // 3. CSS that reorders focusable content
  for (const el of document.body.querySelectorAll('*')) {
    const cs = getComputedStyle(el);
    if (!/flex|grid/.test(cs.display) || !el.querySelector(SEL)) continue;
    const rev = /reverse/.test(cs.flexDirection) || /reverse/.test(cs.flexWrap);
    const reordered = [...el.children].some(c => getComputedStyle(c).order !== '0');
    if (!rev && !reordered) continue;
    // Only a problem if the focusable items appear on screen in a different order than Tab visits them
    const items = [...el.children].filter(c => visible(c) && (c.matches(SEL) || c.querySelector(SEL)));
    const rect = c => c.getBoundingClientRect();
    const onScreen = items.slice().sort((a, b) => Math.abs(rect(a).top - rect(b).top) > 4 ? rect(a).top - rect(b).top : rect(a).left - rect(b).left);
    if (items.some((c, i) => c !== onScreen[i])) warn.push(`${path(el)}: ${rev ? cs.flexDirection : 'CSS order'} shows its focusable items in a different order than Tab visits them (2.4.3). Reorder the HTML instead.`);
  }

  // 4. Clickable things the keyboard cannot reach
  const focusable = new Set(all);
  for (const el of document.body.querySelectorAll('div, span, li, img, svg, td, p, i, section, article')) {
    if (!visible(el) || focusable.has(el)) continue;
    const cs = getComputedStyle(el);
    const clicky = el.hasAttribute('onclick') || (cs.cursor === 'pointer' && getComputedStyle(el.parentElement).cursor !== 'pointer') || /^(button|link|tab|menuitem|checkbox|switch|option)$/.test(el.getAttribute('role') || '');
    if (!clicky || el.closest(SEL) || el.querySelector(SEL) || el.closest('label')) continue;
    fail.push(`${where(el)}: looks clickable (${el.hasAttribute('onclick') ? 'onclick' : el.getAttribute('role') ? 'role=' + el.getAttribute('role') : 'cursor: pointer'}) but cannot be reached with Tab (2.1.1). Use a <button> or <a href>.`);
  }

  // Restore
  if (document.activeElement) document.activeElement.blur();
  if (startFocus && startFocus !== document.body) startFocus.focus({ preventScroll: true });
  scrollTo(startX, startY);
  const uniq = a => [...new Set(a)];
  // After a mouse click the browser stops showing :focus-visible for script focus, which would fake 'no visible focus' failures
  if (steps.length && pointerMode > steps.length / 2)
    return { viewport: `${innerWidth}x${innerHeight}`, inconclusive: true, summary: 'INCONCLUSIVE: the page is in mouse mode, so :focus-visible styles do not show for scripted focus. Press Tab once in the page (a real key press), then run this again.' };
  return { viewport: `${innerWidth}x${innerHeight}`, stops: steps.length, fail: uniq(fail), warn: uniq(warn), order: steps.slice(0, 40).map(s => where(s.el)),
           summary: `${uniq(fail).length} FAIL, ${uniq(warn).length} WARN over ${steps.length} Tab stops at ${innerWidth}x${innerHeight}` };
};
  (window.__gd = window.__gd || {}).keyboard = run;
  return run();
})()
