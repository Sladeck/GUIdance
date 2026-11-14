(() => {
  // GUIdance targets check. The first run registers it as window.__gd.targets; later runs on the same
  // page (after resizing, switching theme) can call __gd.targets() instead of sending this code again.
  const run = () => {
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
};
  (window.__gd = window.__gd || {}).targets = run;
  return run();
})()
