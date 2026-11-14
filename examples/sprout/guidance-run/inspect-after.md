# `/guidance review` on Sprout (after)

Page: `after/index.html`, served over http, same snippets as the first run. Its breakpoints are now 600px and 800px, so both sides of each were measured too. Raw output: [`inspect-after.json`](inspect-after.json).

| Width | Inspect | Contrast | Tap targets | Keyboard |
| --- | --- | --- | --- | --- |
| 320 | 0 findings | | | |
| 390 (mobile) | 0 findings | 0 fails of 39 texts | 0 fail, 0 warn | |
| 600 and 601 (breakpoint) | 0 findings | | | |
| 768 (tablet) | 0 findings | | | |
| 800 and 801 (breakpoint) | 0 findings | | | |
| 1440 (desktop) | 0 findings | 0 fails | 0 fail, 0 warn | 0 fail, 0 warn over 17 Tab stops |
| 390, dark theme | 0 findings | 0 fails | | |

No findings. Nothing overflows at any width, every value is on the scale and comes from a token, every button shows focus, and the page passes contrast in light and dark.
