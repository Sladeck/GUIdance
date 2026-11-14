# Browser checks

Five self-contained JavaScript snippets that measure a rendered page. They need no install: run them with your browser tool's JavaScript execution on the page, or ask the user to paste one into the browser's DevTools console and send back the result. Each returns an object with a one-line `summary` plus details.

They measure what the browser actually rendered (computed styles and boxes), so they work on any stack, including pages built by JavaScript. They need a real browser: fetched HTML is not enough (see "Opening a page" in SKILL.md).

| Snippet | Used by | Run at |
| --- | --- | --- |
| 1. Target size | check, inspect | 390 and desktop (the 44px check is mobile only) |
| 2. Typography | check, audit | desktop, then 390 |
| 3. Rendered contrast | check, inspect | one width per theme |
| 4. Inspect (consistency and layout) | inspect, audit, fix | 390x844, 768x1024, 1440x900, 320, and both sides of each breakpoint it reports |
| 5. Keyboard and focus | inspect, audit, fix | desktop, after one real Tab key press |

To change the width, resize the browser window or viewport (DevTools device toolbar for the user), wait for the layout to settle, then run the snippet again.

Open pages over http (the dev server, or a preview server for static files), not as `file://`: browsers block scripts from reading linked stylesheets on file pages, so snippet 4 would miss the project's tokens and breakpoints. It warns when that happens. Snippets 3, 4 and 5 return INCONCLUSIVE while CSS transitions are running (for example right after switching theme): wait half a second and run again.

If no browser is available, say so, ask the user to run the snippets in DevTools, and meanwhile review the code against the rules, labelling those findings as read from code.

## 1. Target size (rule 2, WCAG 2.5.8)

FAIL: under 24x24 CSS px with no exception (spacing and inline-link exceptions are applied). WARN: under 44x44 at mobile width. NOTE: unstyled native controls. Not detectable: "equivalent control elsewhere" and "essential" exceptions.

```js
(() => {
  // GUIdance target-size check (WCAG 2.2 SC 2.5.8 + touch comfort). Run on the page.
  const items = (() => {
    const SEL = 'a[href], button, input:not([type=hidden]), select, textarea, summary, label[for], ' +
      '[role=button], [role=link], [role=checkbox], [role=radio], [role=switch], [role=tab], ' +
      '[role=menuitem], [role=option], [onclick], [tabindex]:not([tabindex="-1"])';
    const nodes = [...document.querySelectorAll(SEL)];

    const visible = el => {
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none' || Number(cs.opacity) === 0) return false;
      if (el.closest('[aria-hidden="true"], [inert]')) return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    };

    // Hit area as a list of rects (inline elements that wrap have several).
    // An input with a <label> uses the label's area too.
    const rectsOf = el => {
      const list = [...el.getClientRects()].filter(r => r.width && r.height);
      return list.length ? list : [el.getBoundingClientRect()];
    };
    const box = el => {
      let rects = rectsOf(el);
      if (el.matches('input, select, textarea') && el.labels) {
        for (const l of el.labels) rects = rects.concat(rectsOf(l));
      }
      rects = rects.map(r => ({ x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height }));
      const main = rects.reduce((a, b) => (b.w * b.h > a.w * a.h ? b : a));
      return { ...main, rects };
    };

    const path = el => {
      if (el.id) return `#${CSS.escape(el.id)}`;
      const parts = [];
      let e = el;
      while (e && e.nodeType === 1 && parts.length < 4) {
        let s = e.tagName.toLowerCase();
        if (e.classList.length) s += '.' + [...e.classList].slice(0, 2).map(c => CSS.escape(c)).join('.');
        const p = e.parentElement;
        if (p) {
          const same = [...p.children].filter(c => c.tagName === e.tagName);
          if (same.length > 1) s += `:nth-of-type(${same.indexOf(e) + 1})`;
        }
        parts.unshift(s);
        if (e.id) { parts[0] = `#${CSS.escape(e.id)}`; break; }
        e = p;
      }
      return parts.join(' > ');
    };

    const label = el => (el.getAttribute('aria-label') || el.innerText || el.value || el.title ||
      el.getAttribute('alt') || el.getAttribute('placeholder') || '').trim().replace(/\s+/g, ' ').slice(0, 60);

    // Inline exception: a link that sits in a run of text.
    const isInline = el => {
      if (!el.matches('a')) return false;
      const cs = getComputedStyle(el);
      if (!cs.display.startsWith('inline')) return false;
      const parent = el.parentElement;
      if (!parent) return false;
      const own = [...parent.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join('');
      return own.length >= 10;
    };

    // Native controls nobody restyled (user agent exception).
    const isNativeUnstyled = el => {
      if (!el.matches('input[type=checkbox], input[type=radio], input[type=range], input[type=color]')) return false;
      return getComputedStyle(el).appearance !== 'none';
    };

    const seen = new Set();
    const items = [];
    for (const el of nodes) {
      if (!visible(el)) continue;
      // Skip elements nested inside another target already counted (icon inside a button).
      if (el.parentElement && el.parentElement.closest('a[href], button, [role=button], [role=link]')) continue;
      const key = el;
      if (seen.has(key)) continue;
      seen.add(key);
      items.push({ el, b: box(el) });
    }

    // Spacing exception: 24px circles centred on undersized targets must not
    // hit any other target box or another undersized target's circle.
    const R = 12;
    const centre = b => ({ cx: b.x + b.w / 2, cy: b.y + b.h / 2 });
    const circleHitsRect = (c, b) => {
      const nx = Math.max(b.x, Math.min(c.cx, b.x + b.w));
      const ny = Math.max(b.y, Math.min(c.cy, b.y + b.h));
      return (c.cx - nx) ** 2 + (c.cy - ny) ** 2 < R * R;
    };
    const circleHitsBox = (c, b) => b.rects.some(r => circleHitsRect(c, r));
    const small = items.filter(i => i.b.w < 24 || i.b.h < 24);

    return items.map(i => {
      const { el, b } = i;
      const under = b.w < 24 || b.h < 24;
      let spacingOk = false;
      if (under) {
        const c = centre(b);
        const hitsBox = items.some(o => o !== i && circleHitsBox(c, o.b));
        const hitsCircle = small.some(o => {
          if (o === i) return false;
          const d = centre(o.b);
          return (c.cx - d.cx) ** 2 + (c.cy - d.cy) ** 2 < (2 * R) ** 2;
        });
        spacingOk = !hitsBox && !hitsCircle;
      }
      return {
        selector: path(el),
        tag: el.tagName.toLowerCase(),
        text: label(el),
        width: Math.round(b.w * 10) / 10,
        height: Math.round(b.h * 10) / 10,
        under24: under,
        spacingOk,
        inline: isInline(el),
        native: under && isNativeUnstyled(el),
      };
    });
  })();
  const mobile = innerWidth < 600, COMFORT = 44;
  const out = { viewport: innerWidth + 'x' + innerHeight, targets: items.length, fail: [], warn: [], note: [] };
  for (const t of items) {
    const tag = `${t.selector}${t.text ? ' "' + t.text + '"' : ''} ${t.width}x${t.height}`;
    if (t.under24 && !t.inline && !t.spacingOk) (t.native ? out.note : out.fail).push(tag + (t.native ? ' (unstyled native control)' : ' under 24x24, no exception (2.5.8)'));
    else if (mobile && !t.inline && (t.width < COMFORT || t.height < COMFORT)) out.warn.push(tag + ' under 44x44 on mobile');
  }
  out.summary = `${out.fail.length} FAIL, ${out.warn.length} WARN, ${out.note.length} NOTE of ${out.targets} targets at ${out.viewport}` + (mobile ? '' : ' (resize to 390px wide for the touch check)');
  return out;
})()
```

## 2. Typography (rule 3)

Font sizes by share of text, body size, light weights at 16px or below, near-identical size steps, line height under 1.4 on multi-line blocks, and real characters per rendered line (40 maximum for CJK, 80 for others).

```js
(() => {
  // GUIdance typography check. Run on the page.
  const data = (() => {
    const CJK = /[぀-ヿ㐀-鿿가-힯＀-￯]/;
    const blocks = [];
    const sizes = new Map();

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: n => n.textContent.trim().length ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT,
    });
    const parents = new Set();
    let n;
    while ((n = walker.nextNode())) {
      const el = n.parentElement;
      if (!el || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE'].includes(el.tagName)) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none') continue;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      const fs = Math.round(parseFloat(cs.fontSize) * 10) / 10;
      const chars = n.textContent.trim().length;
      const s = sizes.get(fs) || { chars: 0, weights: new Set(), sample: '' };
      s.chars += chars;
      s.weights.add(cs.fontWeight);
      if (!s.sample) s.sample = n.textContent.trim().slice(0, 40);
      sizes.set(fs, s);
      parents.add(el);
    }

    const path = el => {
      const parts = [];
      let e = el;
      while (e && e.nodeType === 1 && parts.length < 3) {
        let s = e.tagName.toLowerCase();
        if (e.id) { parts.unshift(`#${e.id}`); break; }
        if (e.classList.length) s += '.' + [...e.classList].slice(0, 2).join('.');
        parts.unshift(s);
        e = e.parentElement;
      }
      return parts.join(' > ');
    };

    // Text blocks: elements whose own text wraps onto several lines.
    for (const el of parents) {
      const cs = getComputedStyle(el);
      const text = el.innerText ? el.innerText.trim() : '';
      if (text.length < 120) continue;
      const fs = parseFloat(cs.fontSize);
      let lh = cs.lineHeight === 'normal' ? fs * 1.2 : parseFloat(cs.lineHeight);
      const r = el.getBoundingClientRect();
      const lines = Math.round(r.height / lh);
      if (lines < 3) continue;
      // Count real characters per rendered line: walk the block's text,
      // read each character's line position, take the median full line.
      const perLine = new Map();
      let seen = 0;
      let lastKey = null;
      let prevSpace = false;
      const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let t;
      const range = document.createRange();
      while ((t = tw.nextNode()) && seen < 2000) {
        const str = t.textContent;
        for (let i = 0; i < str.length && seen < 2000; i++) {
          seen++;
          if (/\s/.test(str[i])) {
            // Collapsed whitespace counts once, on the line it follows.
            if (!prevSpace && lastKey !== null) perLine.set(lastKey, perLine.get(lastKey) + 1);
            prevSpace = true;
            continue;
          }
          prevSpace = false;
          range.setStart(t, i); range.setEnd(t, i + 1);
          const rr = range.getClientRects()[0];
          if (!rr) continue;
          const key = Math.round(rr.top / (lh / 2));
          perLine.set(key, (perLine.get(key) || 0) + 1);
          lastKey = key;
        }
      }
      const counts = [...perLine.values()];
      if (counts.length > 1) counts.pop();               // last line is usually short
      counts.sort((a, b) => a - b);
      const median = counts.length ? counts[Math.floor(counts.length / 2)] : 0;
      const sample = text.slice(0, 400).replace(/\s+/g, ' ');
      const isCjk = CJK.test(sample);
      const cpl = median;
      blocks.push({
        selector: path(el), fontSize: fs, lineHeight: Math.round((lh / fs) * 100) / 100,
        lines, charsPerLine: cpl, cjk: isCjk, sample: sample.slice(0, 50),
      });
    }

    return {
      sizes: [...sizes.entries()].map(([size, v]) => ({
        size, chars: v.chars, weights: [...v.weights].sort(), sample: v.sample,
      })).sort((a, b) => b.size - a.size),
      blocks,
    };
  })();
  const total = data.sizes.reduce((s, x) => s + x.chars, 0) || 1;
  const body = [...data.sizes].sort((a, b) => b.chars - a.chars)[0];
  const f = [];
  const meaningful = data.sizes.filter(s => s.chars / total >= 0.01);
  if (meaningful.length > 5) f.push(`WARN ${meaningful.length} font sizes each carry 1%+ of the text; expected a named subset of about 5 (rule 3.1)`);
  const near = [];
  for (let i = 1; i < meaningful.length; i++) if (meaningful[i - 1].size - meaningful[i].size <= 1) near.push(`${meaningful[i - 1].size}/${meaningful[i].size}`);
  if (near.length) f.push(`WARN near-identical sizes ${near.join(', ')}px (rule 3.1)`);
  if (body) { if (body.size < 13) f.push(`FAIL body text ${body.size}px (rule 3.2)`); else if (body.size < 16) f.push(`WARN body text ${body.size}px; 16px is the web default (rule 3.2, judgment)`); }
  for (const s of data.sizes) { const light = s.weights.filter(w => +w < 400); if (light.length && s.size <= 16) f.push(`WARN weight ${light.join('/')} at ${s.size}px "${s.sample}" (rule 3.3)`); }
  for (const b of data.blocks) {
    const cap = b.cjk ? 40 : 80;
    if (b.charsPerLine > cap) f.push(`FAIL ~${b.charsPerLine} characters per line (max ${cap}) in ${b.selector} (rule 3.4)`);
    else if (!b.cjk && b.charsPerLine > 75) f.push(`WARN ~${b.charsPerLine} characters per line (target 50 to 75) in ${b.selector} (rule 3.4)`);
    if (b.lineHeight < 1.4) f.push(`WARN line height ${b.lineHeight} on a ${b.lines}-line block in ${b.selector} (rule 3.5)`);
  }
  return { bodySize: body && body.size, sizes: data.sizes.map(s => `${s.size}px ${(100 * s.chars / total).toFixed(1)}% w${s.weights.join(',')}`), findings: f,
           summary: `${f.filter(x => x.startsWith('FAIL')).length} FAIL, ${f.filter(x => x.startsWith('WARN')).length} WARN; body ${body ? body.size + 'px' : 'n/a'}; ${data.sizes.length} sizes in use` };
})()
```

## 3. Rendered contrast (rule 1.1, WCAG 1.4.3)

For every visible text element: its colour against the real background behind it (walking up the page and blending transparent layers), at 4.5:1, or 3:1 for large text (24px, or 18.66px bold) and for symbols used as icons (no letters or digits, judged as graphics under WCAG 1.4.11). Disabled controls are skipped. Text over images or gradients is listed for a check by eye.

```js
(() => {
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
})()
```

## 4. Inspect: consistency and layout (rules 1.2, 3.1, 4.1 to 4.5, 5.1 to 5.4)

Measures the page at the current width and returns `findings`, already ordered Hard, Strong, Default. Each finding has `severity`, `rule`, `kind`, `where` (short selector plus visible text), `value` (what was measured), `expected`, `why` and `fix`. Scales come from the project's own CSS custom properties when it has at least three of a kind (spacing, radius, type; any variable holding a colour counts as a colour token; `@import`ed files are followed), otherwise from Material 3 (`design-data.md`). `breakpoints` lists the width pairs to test next: both sides of each width media query in the page's CSS, or Material 3's window-class edges (599/600, 839/840, 1199/1200) when there are none.

| Kind | Severity | Finds |
| --- | --- | --- |
| horizontal-scroll | Hard | The page is wider than the screen, with the deepest elements causing it |
| overflows-container | Hard | Content sticking out of its card or bordered box |
| clipped-content | Hard | Content cut off by overflow: hidden with no ellipsis |
| faint-field | Hard | Input, select or textarea whose border and fill are both under 3:1 against the page |
| uneven-gaps | Strong | Three or more items in a row or column with different gaps between them |
| heading-proximity | Strong | A heading closer to the section above than to its own content |
| spacing-off-scale | Default | Padding, margin and gap values off the scale, grouped by value with counts |
| component-drift | Default | Elements with the same classes in the same kind of parent that differ in padding, radius, border or font size |
| radius-off-scale, radius-count | Default | Corner radii off the scale, or more than 5 different radii (pills and circles excluded) |
| nested-radius | Default | Inner corners that are not concentric with their container (inner = outer - padding) |
| border-widths | Default | More than 3 border widths |
| near-duplicate-colour | Default | Two colours a few units apart, unless both are exact tokens |
| colour-off-token | Default | Colours not in the project's tokens (only when the project has 6 or more colour tokens) |
| type-off-scale, weight-count | Default | Text sizes off the type scale (icon glyphs ignored), more than 3 font weights |
| near-alignment | Default | Stacked siblings whose left edges miss by 1 to 3px (full-bleed bars and centred containers excluded) |
| border-and-shadow | Default | A bordered surface that also has a strong shadow (blur 8px or more, or offset 4px or more) |
| shadow-count | Default | More than 3 different shadows on the page (rings and inset lines are borders, not elevation) |
| dark-shadow-only | Default | On a dark page, a surface separated from its background only by a shadow |
| icon-size-off, icon-size-count | Default | Icons (SVG up to 64px, icon-font classes, symbol glyphs in buttons) at sizes outside 16, 18, 20, 24, 32, 36, 40, 48, or more than 2 icon sizes |
| icon-stroke-mix | Default | Outline SVG icons with different stroke widths (usually two icon libraries) |
| icon-misaligned | Default | An icon whose centre is 2 to 12px off its label's centre |

Identical findings on repeated components are merged into one with a count. The snippet measures; you judge. Confirm each finding in the code before reporting it, drop the ones that are clearly intended, and trace the rest to `file:line`. Set `window.__GD_OVERLAY = true` before running it to outline every finding on the page with its number (for a screenshot); reload to clear.

```js
(() => {
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
  const add = (sev, rule, kind, el, value, expected, why, fix, extra = {}) => F.push({ severity: sev, rule, kind, where: el ? where(el) : '(page)', value, expected, why, fix, el, ...extra });

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
      add('Hard', '4.4', 'horizontal-scroll', el, `page is ${sw}px wide in a ${innerWidth}px viewport${why}`, `no horizontal scroll at ${innerWidth}px`,
        'Content wider than the screen forces sideways scrolling and hides content; WCAG 1.4.10 (Reflow) requires none at 320px.', 'Constrain the element: max-width: 100%, min-width: 0 on flex/grid children, wrap long words (overflow-wrap: anywhere), or let tables scroll inside their own container.' + hint);
    }
  }

  // 3b. Content cut off inside its box (overflow hidden or clip, no ellipsis on purpose)
  for (const { el, cs, r } of els) {
    if (!/hidden|clip/.test(cs.overflowX + cs.overflowY) || cs.textOverflow === 'ellipsis' || el.matches('input, textarea, select, img, video, canvas, iframe')) continue;
    if (/^-?webkit-box$/.test(cs.display) || cs.webkitLineClamp && cs.webkitLineClamp !== 'none') continue;
    const over = Math.max(el.scrollWidth - el.clientWidth, /hidden|clip/.test(cs.overflowY) ? el.scrollHeight - el.clientHeight : 0);
    if (over <= 2 || !(el.innerText || '').trim()) continue;
    if ([...el.querySelectorAll('*')].some(c => c.scrollWidth > el.clientWidth * 1.5)) continue;   // carousels and sliders
    add('Hard', '4.4', 'clipped-content', el, `content ${Math.round(over)}px larger than its box (overflow: ${cs.overflowX === cs.overflowY ? cs.overflowX : cs.overflowX + ' ' + cs.overflowY})`, 'content fits, or is truncated on purpose',
      'Part of the content is cut off with no sign it is there, so people miss information or controls.', 'Let the box grow (min-width: 0 on flex/grid children, no fixed width or height), wrap the content, or truncate deliberately with text-overflow: ellipsis and the full text in a tooltip or title.');
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
      add('Hard', '4.4', 'overflows-container', el, `sticks out ${Math.round(out)}px past ${path(a)}`, 'inside its container with its padding',
        'Content that crosses the edge of its card looks broken and can cover neighbouring content or become unreadable.', 'Make it fit at this width: smaller size or fewer items on small screens, let it wrap (flex-wrap), or give the container min-width: auto / more room. Avoid fixed widths.');
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
    add('Default', '4.1', 'spacing-off-scale', g.els[0], `${v}px used ${g.n} time${g.n > 1 ? 's' : ''}`, `${nearest(v, 'spacing')}px (${S.spacing.from} scale)`,
      'Spacing outside the scale makes rhythm uneven and stacks small differences the eye reads as sloppiness.', `Use the nearest scale step (${nearest(v, 'spacing')}px) through a spacing token.`, { also: g.els.slice(1).map(where) });

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
      add('Strong', '4.2', 'uneven-gaps', p, `gaps ${gaps.join(', ')}px between ${kids.length} ${sameRow ? 'items in a row' : 'stacked items'}`, `one gap (${common}px)`,
        'Items of the same group should sit at equal distances; uneven gaps break the grouping and look unfinished (proximity).', `Set the spacing once on the parent (gap: ${common}px) and remove per-item margins.`);
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
      add('Default', '4.5', 'component-drift', odd.el, `${prop} differs between ${list.length} "${key.split(' > ')[1].split('.').slice(1).join('.')}" elements: ${sorted.map(([v, n]) => `${v} (x${n})`).join(', ')}`, `${sorted[0][0]} on all`,
        'The same component should look the same everywhere; small variations read as mistakes and erode trust.', `Give every instance the component's ${prop} (${sorted[0][0]}) from one shared style, or make the difference an explicit variant.`);
    }
  }

  // 7. Headings closer to the section above than to their own content
  for (const e of els) {
    if (!/^H[1-6]$/.test(e.el.tagName) && e.el.getAttribute('role') !== 'heading') continue;
    const prev = info.get(e.el.previousElementSibling), next = info.get(e.el.nextElementSibling);
    if (!prev || !next) continue;
    const above = Math.round(e.r.top - prev.r.bottom), below = Math.round(next.r.top - e.r.bottom);
    if (above >= 0 && below > above + 2)
      add('Strong', '4.2', 'heading-proximity', e.el, `${above}px above, ${below}px below`, 'more space above than below',
        'A heading belongs to the content under it; when it sits closer to the previous section, readers group it with the wrong block.', `Increase the space above the heading and reduce the space below (for example ${Math.max(below, 24)}px above, ${Math.min(above, 8) || 8}px below).`);
  }

  // 8. Corner radius: off-scale values, too many values, nested corners not concentric
  const radii = new Map();
  for (const e of els) {
    const r = px(e.cs.borderTopLeftRadius); if (r === null || r <= 0) continue;
    if (r >= Math.min(e.r.width, e.r.height) / 2 - 1) continue;   // pills and circles
    const g = radii.get(r) || { n: 0, el: e.el }; g.n++; radii.set(r, g);
  }
  for (const [r, g] of radii) if (!onScale(r, 'radius'))
    add('Default', '5.1', 'radius-off-scale', g.el, `${r}px corner radius (x${g.n})`, `${nearest(r, 'radius')}px (${S.radius.from} scale)`,
      'Corner radii outside the scale make shapes look slightly different for no reason.', `Use ${nearest(r, 'radius')}px from the radius tokens.`);
  if (radii.size > 5)
    add('Default', '5.1', 'radius-count', null, `${radii.size} different corner radii: ${[...radii.keys()].sort((a, b) => a - b).join(', ')}px`, '3 or 4 steps',
      'Too many radii make the interface feel assembled from different kits.', 'Map every radius to 3 or 4 named steps (small controls, inputs and cards, sheets and dialogs, full).');
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
      add('Default', '5.2', 'nested-radius', e.el, `${rc}px inside a ${rp}px parent with ${Math.round(inset)}px padding`, `about ${want}px (outer - padding)`,
        'Nested corners that are not concentric look pinched or bulging next to their container.', `Set the inner radius to ${want}px, or change the padding so outer minus padding lands on a scale step.`);
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
      add('Hard', '1.2', 'faint-field', e.el, `border ${borderR.toFixed(2)}:1, fill ${fillR.toFixed(2)}:1 against the page`, '3:1 for the border or the fill',
        'People cannot see where to click or type when a field has no visible edge (WCAG 1.4.11).', 'Use the outline token (3:1) for field borders, or give the field a fill that contrasts 3:1 with the page.');
  }
  const bws = new Set(els.filter(e => e.cs.borderTopStyle !== 'none' && px(e.cs.borderTopWidth) > 0).map(e => px(e.cs.borderTopWidth)));
  if (bws.size > 3) add('Default', '4.5', 'border-widths', null, `${bws.size} border widths: ${[...bws].sort((a, b) => a - b).join(', ')}px`, '1 or 2 widths (hairline, focus/emphasis)',
    'Mixed border weights make the hierarchy noisy.', 'Use one hairline width for dividers and containers and one heavier width for focus and errors.');

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
      add('Default', '4.5', 'near-duplicate-colour', drop.el, `rgb(${drop.rgb.slice(0, 3).map(Math.round).join(',')}) next to rgb(${keep.rgb.slice(0, 3).map(Math.round).join(',')})`, 'one colour',
        'Two almost identical colours are never intentional; they come from hard-coded values and make surfaces look patchy.', 'Replace both with the same colour token.');
    }
  }
  if (tok.colour.length >= 6) {
    const off = list.filter(([, g]) => !isTok(g.rgb) && !(g.rgb[0] === g.rgb[1] && g.rgb[1] === g.rgb[2] && (g.rgb[0] === 0 || g.rgb[0] === 255)));
    for (const [, g] of off.sort((a, b) => b[1].n - a[1].n).slice(0, 8))
      add('Default', '1.4', 'colour-off-token', g.el, `rgb(${g.rgb.slice(0, 3).map(Math.round).join(',')}) used ${g.n} time${g.n > 1 ? 's' : ''}`, 'a colour from the project tokens',
        'Hard-coded colours bypass the palette: they will not follow dark mode or a rebrand, and their contrast was never checked.', 'Replace it with the closest colour role token (surface, on-surface, primary, outline...).');
  }

  // 11. Type: off-scale sizes, too many weights
  const sizes = new Map(), weights = new Set();
  for (const { el, cs } of els) {
    if (![...el.childNodes].some(n => n.nodeType === 3 && /[\p{L}\p{N}]{2}/u.test(n.textContent))) continue;   // real words, not icon glyphs
    const s = Math.round(parseFloat(cs.fontSize) * 10) / 10; const g = sizes.get(s) || { n: 0, el }; g.n++; sizes.set(s, g); weights.add(cs.fontWeight);
  }
  for (const [s, g] of sizes) if (!onScale(s, 'type'))
    add('Default', '3.1', 'type-off-scale', g.el, `${s}px text (x${g.n})`, `${nearest(s, 'type')}px (${S.type.from} scale)`,
      'Font sizes outside the type scale blur the hierarchy and multiply styles to maintain.', `Use the nearest type style (${nearest(s, 'type')}px) from the type tokens.`);
  if (weights.size > 3) add('Default', '3.1', 'weight-count', null, `${weights.size} font weights: ${[...weights].sort().join(', ')}`, '3 weights at most (regular, medium, bold)',
    'Many weights compete with each other and weaken emphasis.', 'Keep regular for text, one medium for labels and buttons, one bold for headings.');

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
      if (d >= 1 && d <= 3) { add('Default', '4.5', 'near-alignment', b.el, `left edge ${d}px off from the element above`, 'the same left edge',
        'Edges that almost line up look like errors; the eye notices 1 to 3px misses.', 'Align both to the same edge: equal padding on the parent, no per-item offsets.'); break; }
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
      add('Default', '5.3', 'border-and-shadow', el, `${cs.borderTopWidth} border plus a ${blur}px shadow`, 'one cue: a border, a shadow or a tonal step',
        'Two separators for one surface look heavy and dated; Material separates with tone first, then one shadow level.', 'Keep the border and drop the shadow for resting cards, or keep an elevation token (level 1 to 3) and drop the border.');
    if (pageDark && !bordered && Math.abs(L(bgOf(el)) - L(bgOf(el.parentElement || document.body))) < 0.01)
      add('Default', '5.3', 'dark-shadow-only', el, 'separated from its background only by a shadow, on a dark theme', 'a lighter surface-container tone as well',
        'Shadows barely show on dark backgrounds, so the surface melts into the page.', 'Give raised surfaces the next surface-container tone up in dark mode, and keep the shadow token.');
  }
  if (shadows.size > 3)
    add('Default', '5.3', 'shadow-count', [...shadows.values()][0].el, `${shadows.size} different shadows on the page`, 'three elevation levels at most, from tokens',
      'Shadows invented per component make the depth order unreadable: nothing says what is in front of what.', 'Map every shadow to the Material elevation tokens (levels 0 to 3 at rest, 4 and 5 for hover and drag).', { also: [...shadows.keys()].slice(0, 6) });

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
      add('Default', '5.4', 'icon-size-off', g.el, `${s}px icons (x${g.n})`, '20 or 24px (16, 18, 32, 40, 48 for special cases)',
        'Icon sets are drawn for specific sizes; in between, strokes blur and icons look mismatched next to each other.', `Use ${[20, 24].reduce((a, b) => Math.abs(b - s) < Math.abs(a - s) ? b : a)}px, through an icon size token.`);
    if (bySize.size > 2)
      add('Default', '5.4', 'icon-size-count', null, `${bySize.size} icon sizes: ${[...bySize].sort((a, b) => a[0] - b[0]).map(([s, g]) => `${s}px x${g.n}`).join(', ')}`, 'two sizes per screen',
        'Many icon sizes make the screen look assembled from different kits.', 'Use 20px inline and in dense UI, 24px in buttons and navigation.');
    const strokes = new Map(); iconEls.filter(i => i.stroke && i.outline).forEach(i => { const k = String(parseFloat(i.stroke)); const g = strokes.get(k) || { n: 0, el: i.el }; g.n++; strokes.set(k, g); });
    if (strokes.size > 1)
      add('Default', '5.4', 'icon-stroke-mix', [...strokes.values()][1].el, `outline icons with stroke widths ${[...strokes].map(([k, g]) => `${k} (x${g.n})`).join(', ')}`, 'one stroke width (one icon set)',
        'Different stroke weights usually mean two icon libraries mixed together; they read as inconsistent at a glance.', 'Pick one icon set and replace the others, or set one stroke-width for all outline icons.');
    for (const i of iconEls) {
      const p = i.el.parentElement; if (!p || !/flex|grid/.test(getComputedStyle(p).display)) continue;
      const tn = [...p.childNodes].find(n => n.nodeType === 3 && n.textContent.trim()) || [...p.children].find(c => c !== i.el && !/absolute|fixed/.test(getComputedStyle(c).position) && c.childNodes.length === 1 && c.firstChild.nodeType === 3 && c.textContent.trim());
      if (!tn) continue;
      const range = document.createRange(); range.selectNodeContents(tn); const rects = [...range.getClientRects()]; if (rects.length !== 1) continue;
      const d = Math.abs((i.r.top + i.r.bottom) / 2 - (rects[0].top + rects[0].bottom) / 2);
      if (d > 2 && d < 12) { add('Default', '5.4', 'icon-misaligned', i.el, `icon centre ${d.toFixed(1)}px off its label's centre`, 'centred on the text line',
        'An icon riding high or low next to its label looks like a rendering bug.', 'align-items: center on the row, and display: block (or vertical-align: middle) on the icon to drop the baseline gap.'); }
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
})()

```

## 5. Keyboard and focus (rules 12.1 and 12.5; WCAG 2.1.1, 2.4.3, 2.4.7, 2.4.11, 1.4.11)

Walks the page in Tab order (positive tabindex first, then document order) by focusing each stop, then restores focus and scroll. Press Tab once in the page before running it: after a mouse click, browsers hide `:focus-visible` styles for scripted focus, and the snippet answers INCONCLUSIVE instead of reporting false failures.

| Result | Severity | Finds |
| --- | --- | --- |
| FAIL | Hard | No visible change on focus (on the element, its container or the visible stand-in of a hidden checkbox); focused element completely hidden by sticky or fixed content; positive tabindex; something that looks clickable (onclick, role, or cursor: pointer) that Tab cannot reach; focusable with no size |
| WARN | Strong | Focus ring under 3:1 against its background; focus shown only by a colour change; focused element mostly hidden; focusable while off-screen (closed drawers; skip links excepted); Tab jumping back up the page; CSS order or reverse directions on containers of focusable items |

```js
(() => {
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
})()

```
