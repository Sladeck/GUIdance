#!/usr/bin/env node
// Maintainer tool: minify the page checks for the skill.
//
//   npm i --no-save terser        (once, in this folder)
//   node tools/build_checks.mjs
//
// Reads the readable sources in tools/checks/*.js and writes minified copies to
// skills/guidance/checks/*.js. The skill ships only the minified files: Claude reads one and
// passes it to the browser, so smaller code means fewer tokens on every page check.
// tools/selftest.py runs both versions on the same pages and requires identical results.

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(join(here, 'package.json'));
let minify;
try { ({ minify } = require('terser')); }
catch { console.error('terser is missing: run "npm i --no-save terser" in tools/ first.'); process.exit(1); }

const src = join(here, 'checks');
const out = join(here, '..', 'skills', 'guidance', 'checks');
mkdirSync(out, { recursive: true });

for (const f of readdirSync(src).filter(n => n.endsWith('.js')).sort()) {
  const code = readFileSync(join(src, f), 'utf8');
  const res = await minify(code, {
    ecma: 2020,
    compress: { passes: 2, expression: true },   // keep the final value: it is what the browser tool returns
    mangle: true,                  // local names only; property names and returned keys are kept
    format: { comments: false, ascii_only: false },
  });
  const name = f.replace(/\.js$/, '');
  const body = `// GUIdance ${name} check, minified. Readable source: tools/checks/${f}\n${res.code}\n`;
  writeFileSync(join(out, f), body);
  console.log(`${f}: ${code.length} -> ${body.length} bytes`);
}
