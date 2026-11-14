// Maintainer tool (used by selftest.py): runs every readable check in tools/checks/ and its minified
// copy in skills/guidance/checks/ on the same pages and requires identical results. Needs Playwright.
//   node tools/check_equivalence.js [page.html ...]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const pages = process.argv.slice(2).length ? process.argv.slice(2) : [
  path.join(root, 'skills/guidance/assets/preview.html'),
  path.join(root, 'examples/sprout/before/index.html'),
  path.join(root, 'examples/sprout/after/index.html'),
];
(async () => {
  const b = await chromium.launch();
  let fails = 0, runs = 0;
  for (const name of fs.readdirSync(path.join(__dirname, 'checks')).filter(f => f.endsWith('.js'))) {
    const src = fs.readFileSync(path.join(__dirname, 'checks', name), 'utf8');
    const min = fs.readFileSync(path.join(root, 'skills/guidance/checks', name), 'utf8');
    for (const page of pages) for (const w of [390, 1440]) {
      const run = async code => {
        const p = await b.newPage({ viewport: { width: w, height: 900 } });
        await p.goto('file://' + path.resolve(page)); await p.waitForTimeout(150);
        if (name === 'keyboard.js') await p.keyboard.press('Tab');
        const r = await p.evaluate(code);
        const reuse = await p.evaluate(`window.__gd && typeof window.__gd['${name.replace('.js', '')}'] === 'function'`);
        await p.close(); return { r, reuse };
      };
      const a = await run(src), m = await run(min); runs++;
      if (!m.r || !m.reuse || JSON.stringify(a.r) !== JSON.stringify(m.r)) { fails++; console.log(`DIFF ${name} ${path.basename(path.dirname(page))}/${path.basename(page)} @${w}`); }
    }
  }
  await b.close();
  console.log(`${runs} runs, ${fails} differences`);
  process.exit(fails ? 1 : 0);
})();
