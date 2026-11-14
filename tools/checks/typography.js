(() => {
  // GUIdance typography check. The first run registers it as window.__gd.typography; later runs on the same
  // page (after resizing, switching theme) can call __gd.typography() instead of sending this code again.
  const run = () => {
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
};
  (window.__gd = window.__gd || {}).typography = run;
  return run();
})()
