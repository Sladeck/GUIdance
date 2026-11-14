# `/guidance inspect [page]`

Finds what makes a page look inconsistent or broken, at the sizes people actually use.

1. Open the page (see `commands/open-page.md`).
2. Measure with the checks in `checks/` (read `references/browser-checks.md` once for how to run them). Send each check's file once per page; at the next width or theme, call it again with `__gd.<name>()` instead of resending the file:
   - **`inspect.js`** at **mobile 390x844, tablet 768x1024, desktop 1440x900** and **320 wide** (WCAG reflow). Its result lists `breakpoints`: the widths where this page's layout switches, read from its own media queries (Material 3's 600, 840 and 1200 if it has none). Run it again on both sides of each one (for example 799 and 800): layouts break right before they switch.
   - **`targets.js`** and **`contrast.js`** at 390 and 1440.
   - **`keyboard.js`** once at desktop width. Press Tab once in the page first (a real key press with your browser tool); the check says INCONCLUSIVE otherwise.
   - **Dark theme**, if the app has one: switch to it, wait for the colours to settle, then run contrast, inspect and keyboard again at one width.
   - If a check returns INCONCLUSIVE, do what it says and run it again. If inspect warns that stylesheets could not be read, the page was opened as a file: serve the folder over http (the project's dev server, or your browser tool's preview server) and run again, or the project's tokens and breakpoints are missed.
3. Merge: the same finding (same kind, element and value) at several widths is one finding, tagged with where it happens: "all sizes", "mobile only", "mobile and tablet"... Width-specific findings matter most: say so.
4. Trace each finding to the code: search the project for the class, component or value and give `file:line`. Use the project's token names in the fix.
5. Judge before reporting. The check measures; you decide. Take each finding's Why and Fix from its kind in the `browser-checks.md` table, adapted to the measured values. Drop a finding when the code shows it is intended (a documented optical adjustment, a deliberate variant, a decorative element). Look at a screenshot when a finding is unclear.
6. Reply with one numbered list, most serious first: Hard, then Strong, then Default; within a level, findings that break layout or appear at more widths and more places come first. Each item:
   ```
   1. [Hard] Stars stick out of the rating card (mobile and tablet)
      Where: RatingCard.tsx:14, .stars (10px past the card at 390px)
      Why: content crossing its card looks broken and can hide the next element. Rule 4.4, WCAG 1.4.10 (S).
      Fix: font-size: var(--text-body) under 900px, or let the stars wrap.
   ```
7. End with the counts per severity and per width, and offer `/guidance fix`. Change nothing until the user says so.
