# Maintainer tools

Not needed to use GUIdance. These regenerate the data the skill ships with, and test it.

| File | Does |
| --- | --- |
| `build_tables.py` | Rebuilds `skills/guidance/references/palettes/*.md` (5 variants x 73 hues + grey), failing if any row misses a WCAG pair |
| `palette.py` | The palette engine (Material 3 role tones, CIE L* tone, OKLCH hue and chroma) used by `build_tables.py` |
| `engine.js` | The same engine in JavaScript, embedded in `skills/guidance/assets/preview.html` |
| `checks/*.js` | Readable sources of the page checks (targets, typography, contrast, inspect, keyboard) |
| `build_checks.mjs` | Minifies `checks/*.js` into `skills/guidance/checks/` (needs `npm i --no-save terser` here) |
| `check_equivalence.js` | Runs each readable check and its minified copy on the same pages; results must be identical |
| `setup.py` | Token file generator used to produce `references/formats/*.md` |
| `preview.py` | Source of the preview layout embedded in `assets/preview.html` |
| `contrast.py`, `targets.js`, `type-audit.js` | Older command-line versions of some checks, for CI |
| `selftest.py` | Runs all of the above on throwaway projects |

Requirements: Python 3.8+; Node 18+ and Playwright for the page tools.

- After changing `palette.py`, rebuild the tables and check that `engine.js` (and the copy in `assets/preview.html`) still matches them row for row.
- After changing a check in `checks/`, run `node build_checks.mjs`, then `selftest.py`. Keep the "why" and "fix" text for each finding kind in `skills/guidance/references/browser-checks.md`, not in the check: the check's code is sent to the browser on every page, the docs are read once.
- Keep `SKILL.md` short: it loads on every `/guidance` call. Command steps live in `skills/guidance/commands/`.
