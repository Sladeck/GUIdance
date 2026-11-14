# Maintainer tools

Not needed to use GUIdance. These regenerate the data the skill ships with, and test it.

| File | Does |
| --- | --- |
| `build_tables.py` | Rebuilds `skills/guidance/references/palettes/*.md` (4 variants x 73 hues + grey), failing if any row misses a WCAG pair |
| `palette.py` | The palette engine (Material 3 role tones, CIE L* tone, OKLCH hue and chroma) used by `build_tables.py` |
| `engine.js` | The same engine in JavaScript, embedded in `skills/guidance/assets/preview.html` |
| `setup.py` | Token file generator used to produce `references/formats/*.md` |
| `preview.py` | Source of the preview layout embedded in `assets/preview.html` |
| `contrast.py`, `targets.js`, `type-audit.js` | Command-line versions of the checks, for CI |
| `selftest.py` | Runs the command-line tools on throwaway projects |

Requirements: Python 3.8+; Node 18+ and Playwright for the page tools. After changing `palette.py`, rebuild the tables and check that `engine.js` still matches them row for row.
