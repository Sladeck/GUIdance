#!/usr/bin/env node
/*
 * Typography audit.
 *
 * Loads a page in Playwright and measures the rendered text:
 *
 *   sizes        distinct font sizes in use, with how much text each carries.
 *                More than ~5 on one page suggests no type scale (M3 keeps a
 *                subset; NN/g: about 3 carry the hierarchy per screen).
 *   body size    the size carrying the most text. Under 16px on the web is
 *                flagged as a judgment call; under 13px as a problem.
 *   light small  weights under 400 at 16px or below (Apple HIG: avoid light
 *                weights at small sizes).
 *   line length  characters per line for multi-line text blocks. Over 80 fails
 *                the WCAG 1.4.8 ceiling (AAA); 50 to 75 is the Baymard target.
 *                CJK text uses a 40-character ceiling.
 *   line height  multi-line paragraphs under 1.4.
 *   near steps   sizes within 1px of each other (M3: avoid small differences).
 *
 * Usage
 *   node type-audit.js <url> [--mobile] [--json]
 *
 * Needs Playwright. Exit code 1 if any line length over the ceiling or body
 * text under 13px.
 */
// Find Playwright next to this script, or in the project you run it from.
function loadPlaywright() {
  try { return require('playwright'); } catch (_) {}
  try { return require('module').createRequire(process.cwd() + '/')('playwright'); } catch (_) {}
  console.error('Playwright not found. In your project run: npm i -D playwright && npx playwright install chromium');
  process.exit(2);
}
const { chromium } = loadPlaywright();

const args = process.argv.slice(2);
const url = args.find(a => !a.startsWith('--'));
if (!url) {
  console.error('Usage: node type-audit.js <url> [--mobile] [--json]');
  process.exit(2);
}
const mobile = args.includes('--mobile');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext(mobile
    ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 }
    : { viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => page.goto(url, { waitUntil: 'load' }));
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
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
  });
  await browser.close();

  const total = data.sizes.reduce((s, x) => s + x.chars, 0) || 1;
  const body = [...data.sizes].sort((a, b) => b.chars - a.chars)[0];
  const findings = [];
  const add = (status, msg, rule) => findings.push({ status, msg, rule });

  const meaningful = data.sizes.filter(s => s.chars / total >= 0.01);
  if (meaningful.length > 5) add('WARN', `${meaningful.length} distinct font sizes each carry 1%+ of the text; expected a named subset of about 5 or fewer`, '3.1 (M3-TYPE A, NNG-HIER B)');
  const near = [];
  for (let i = 1; i < meaningful.length; i++) {
    const a = meaningful[i - 1], b = meaningful[i];
    if (a.size - b.size <= 1) near.push(`${a.size}/${b.size}`);
  }
  if (near.length) add('WARN', `near-identical sizes in use: ${near.join(', ')}px; merge each pair into one step`, '3.1 (M3-TYPE A)');
  if (body) {
    if (body.size < 13) add('FAIL', `body text (most-used size) is ${body.size}px; no source supports body under 13px`, '3.2');
    else if (body.size < 16) add('WARN', `body text is ${body.size}px; 16px is the web default, 13 to 15px is a judgment call for dense UIs`, '3.2 (judgment)');
  }
  for (const s of data.sizes) {
    const light = s.weights.filter(w => Number(w) < 400);
    if (light.length && s.size <= 16) add('WARN', `weight ${light.join('/')} at ${s.size}px ("${s.sample}")`, '3.3 (APPLE-TYPE A)');
  }
  for (const b of data.blocks) {
    const ceiling = b.cjk ? 40 : 80;
    if (b.charsPerLine > ceiling) add('FAIL', `~${b.charsPerLine} characters per line (ceiling ${ceiling}) in ${b.selector} "${b.sample}"`, '3.4 (WCAG-1.4.8 AAA, BAY-LINE A)');
    else if (!b.cjk && b.charsPerLine > 75) add('WARN', `~${b.charsPerLine} characters per line (target 50 to 75) in ${b.selector}`, '3.4 (BAY-LINE A)');
    if (b.lineHeight < 1.4) add('WARN', `line height ${b.lineHeight} on a ${b.lines}-line block in ${b.selector}`, '3.5 (APPLE-TYPE A)');
  }

  const out = { url, viewport: mobile ? 'mobile' : 'desktop', bodySize: body && body.size, ...data, findings };
  if (args.includes('--json')) {
    console.log(JSON.stringify(out, null, 2));
  } else {
    console.log(`Typography audit: ${url} (${out.viewport})\n`);
    console.log('Font sizes in use (share of visible text):');
    for (const s of data.sizes) {
      const pct = (100 * s.chars / total).toFixed(1).padStart(5);
      console.log(`  ${String(s.size).padStart(5)}px ${pct}%  weights ${s.weights.join(',')}  "${s.sample}"`);
    }
    console.log(`\nBody size (most text): ${body ? body.size + 'px' : 'n/a'}`);
    console.log(`Multi-line text blocks measured: ${data.blocks.length}\n`);
    if (!findings.length) console.log('No findings.');
    for (const f of findings) console.log(`  ${f.status.padEnd(4)} ${f.msg}\n        rule ${f.rule}`);
    console.log('\nCharacters per line: median rendered line, spaces included (trailing space at each wrap counted, so true count may be 1 lower).');
  }
  process.exit(findings.some(f => f.status === 'FAIL') ? 1 : 0);
})().catch(e => { console.error(e.message || e); process.exit(2); });
