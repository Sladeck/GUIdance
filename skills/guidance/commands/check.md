# `/guidance check [page]`

A fast, numbers-only pass on a page.

1. Open the page (see `commands/open-page.md`) and run `targets.js`, `typography.js` and `contrast.js` from `checks/` (how: `references/browser-checks.md`); run targets again at 390px wide with `__gd.targets()`.
2. Without a browser tool, give the user the check files to paste into DevTools and ask for the results.
3. Reply with one short table per check (FAIL and WARN only) and a one-line verdict. No code review, no fixes. Suggest `/guidance audit` for the full review.
