#!/usr/bin/env node
/*
 * Target size audit (WCAG 2.2 SC 2.5.8 + platform touch sizes).
 *
 * Loads a page in Playwright at desktop and mobile widths and measures every
 * visible interactive element.
 *
 *   FAIL  under 24x24 CSS px and not saved by an exception (SC 2.5.8, Hard)
 *   WARN  passes 2.5.8 but under 44x44 at the mobile viewport (Apple 44pt /
 *         Material 48dp comfort size, Default)
 *
 * Exceptions applied automatically:
 *   - spacing: a 24px circle centred on the target does not intersect another
 *     target or another undersized target's circle
 *   - inline: links inside a sentence or block of text
 *   - user agent: unstyled native controls are flagged only as NOTE
 * Not detectable (check by hand): "equivalent control elsewhere" and
 * "essential" (e.g. dense map pins).
 *
 * Usage
 *   node targets.js <url> [--mobile-only|--desktop-only] [--json] [--comfort 44]
 *   node targets.js http://localhost:3000/settings --json > targets.json
 *
 * Needs Playwright (require('playwright')). Exit code 1 if any FAIL.
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
  console.error('Usage: node targets.js <url> [--mobile-only|--desktop-only] [--json] [--comfort 44]');
  process.exit(2);
}
const flag = n => args.includes(n);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const COMFORT = Number(opt('--comfort', 44));
const viewports = [];
if (!flag('--mobile-only')) viewports.push({ name: 'desktop', width: 1440, height: 900, isMobile: false });
if (!flag('--desktop-only')) viewports.push({ name: 'mobile', width: 390, height: 844, isMobile: true });

async function audit(page) {
  return page.evaluate(() => {
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
  });
}

(async () => {
  const browser = await chromium.launch();
  const report = { url, viewports: [] };
  let fails = 0;
  try {
    for (const vp of viewports) {
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height }, isMobile: vp.isMobile, hasTouch: vp.isMobile,
        deviceScaleFactor: vp.isMobile ? 3 : 1,
      });
      const page = await ctx.newPage();
      await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => page.goto(url, { waitUntil: 'load' }));
      await page.waitForTimeout(500);
      const items = await audit(page);
      const findings = [];
      for (const t of items) {
        let status = 'PASS';
        let why = '';
        if (t.under24) {
          if (t.inline) { status = 'PASS'; why = 'inline text link exception'; }
          else if (t.spacingOk) { status = 'PASS'; why = 'spacing exception (24px circle clear)'; }
          else if (t.native) { status = 'NOTE'; why = 'unstyled native control (user agent exception); a larger custom control is better'; }
          else { status = 'FAIL'; why = 'under 24x24 CSS px with no exception (WCAG 2.5.8)'; }
        }
        if (status === 'PASS' && vp.name === 'mobile' && !t.inline && (t.width < COMFORT || t.height < COMFORT)) {
          status = 'WARN';
          why = `under ${COMFORT}x${COMFORT} on mobile (Apple 44pt / Material 48dp comfort size)`;
        }
        if (status === 'FAIL') fails++;
        findings.push({ ...t, status, why });
      }
      report.viewports.push({ name: vp.name, width: vp.width, targets: findings.length, findings });
      await ctx.close();
    }
  } finally {
    await browser.close();
  }

  if (flag('--json')) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(`Target size audit: ${url}\n`);
    for (const vp of report.viewports) {
      const rows = vp.findings.filter(f => f.status !== 'PASS');
      const c = s => vp.findings.filter(f => f.status === s).length;
      console.log(`== ${vp.name} (${vp.width}px): ${vp.targets} targets, ${c('FAIL')} FAIL, ${c('WARN')} WARN, ${c('NOTE')} NOTE`);
      const order = { FAIL: 0, NOTE: 1, WARN: 2 };
      rows.sort((a, b) => order[a.status] - order[b.status] || a.width * a.height - b.width * b.height);
      for (const f of rows.slice(0, 60)) {
        console.log(`  ${f.status.padEnd(4)} ${String(f.width).padStart(5)}x${String(f.height).padEnd(5)} ${f.selector}` +
          `${f.text ? `  "${f.text}"` : ''}\n        ${f.why}`);
      }
      if (rows.length > 60) console.log(`  ... ${rows.length - 60} more (use --json)`);
      console.log();
    }
    console.log('Not checked automatically: "equivalent control elsewhere" and "essential" exceptions.');
  }
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e.message || e); process.exit(2); });
