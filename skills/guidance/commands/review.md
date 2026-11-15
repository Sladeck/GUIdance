# `/guidance review [target] [quick]`

Finds what is wrong with an interface: in its code, on the rendered page at every width, or both. Change nothing; offer `/guidance fix` at the end.

## 1. Scope

The target decides what to do:

| Target | Code review | Page measurement |
| --- | --- | --- |
| nothing | the files changed in the working tree (version control) | the pages those files render on |
| a file, folder or component | that code | the page it renders on, if one can be found |
| a page: route (`/settings`), page file, description, local address | the code behind the page | the page |

With no changes and no target, ask what to review. Opening a page: `commands/open-page.md`. No browser at all: review the code only and label the report "read from code, not measured".

`quick` (or "quick check"): measure only, with `targets.js`, `typography.js` and `contrast.js` at 1440 and 390 (`__gd.<name>()` for the second width). Reply with one short table per check (FAIL and WARN only) and a one-line verdict. No code review, no fixes. Stop there.

## 2. Measure the page

Read `references/browser-checks.md` once for how to run the checks in `checks/`. Send each check's file once per page; at the next width or theme, call it again with `__gd.<name>()`.

- **`inspect.js`** at **mobile 390x844, tablet 768x1024, desktop 1440x900** and **320 wide** (WCAG reflow). Its result lists `breakpoints`: the widths where the layout switches, read from the page's own media queries (Material's 600, 840 and 1200 if it has none). Run it again on both sides of each one (for example 799 and 800): layouts break right before they switch.
- **`targets.js`** and **`contrast.js`** at 390 and 1440; **`typography.js`** at 1440 and 390.
- **`keyboard.js`** once at desktop width, after pressing Tab once in the page (a real key press with your browser tool); it says INCONCLUSIVE otherwise.
- **Dark theme**, if the app has one: switch, wait for the colours to settle, then run contrast, inspect and keyboard again at one width.
- INCONCLUSIVE: do what it says and run again. If inspect warns that stylesheets could not be read, the page was opened as a file: serve it over http (the dev server, or your browser tool's preview server) and run again.

## 3. Review the code

Go through the checklist below on the code in scope, section by section, skipping what the measurements already cover. Colours that were not measured: compute contrast by hand with `references/data/colour.md` and show the working.

## 4. Merge, trace, judge

- The same finding (same kind, element and value) at several widths is one finding, tagged with where it happens: "all sizes", "mobile only", "mobile and tablet". Width-specific findings matter most: say so. A measured finding and a code finding about the same thing are one finding.
- Give each finding its `file:line`: search the project for the class, component or value. Use the project's token names in the fix.
- The checks measure; you decide. Take Why and Fix for measured findings from the kind table in `browser-checks.md`, adapted to the values. Drop a finding when the code shows it is intended (a documented optical adjustment, a deliberate variant, a decorative element). Look at a screenshot when a finding is unclear.

## 5. Report

One numbered list in the format of `commands/report-format.md`, then the counts per severity (and per width when measured), the three fixes with the most impact, and an offer of `/guidance fix`.

## Checklist

1. **Contrast**: text 4.5:1 (large 3:1); control cues, focus rings, meaningful icons and chart marks 3:1. Both themes. Disabled controls exempt.
2. **Targets**: 24x24 CSS px or spaced (Hard); 44pt iOS, 48dp Android, 44 to 48px on touch web layouts.
3. **Colour alone**: status, errors, series and links always have a second cue.
4. **Type**: a named subset of the platform scale; about three sizes per screen; body at platform default; 50 to 75 characters per line; no light weights small; text can grow to 200%.
5. **Spacing and grouping**: one scale; tighter inside groups than between; padding and gaps on parents; actions next to what they affect; one density within a page (the project's, or the page's own override), with dialogs, menus and alerts at default in compact (rule 4.7).
6. **Radius, elevation and icons**: one radius scale with concentric nested corners; elevation from the six Material levels, one separation cue per surface; one icon set and style, two sizes.
7. **Hierarchy**: one clear primary action; squint test passes.
8. **Forms**: single column, visible labels, validation timing matched to form type (long form: on blur; short or one-per-page: on submit), errors clear when fixed, input preserved.
9. **Feedback**: indicator only after about 1s; skeleton for page loads, spinner for a module, progress bar over 10s.
10. **Errors**: next to the cause, plus summary on submit; plain and specific; a way out.
11. **Destructive actions**: undo over confirmation; confirmations specific, outcome-named buttons, Cancel never default.
12. **Motion**: platform durations; honour reduced motion (fades instead of slides and zooms).
13. **Layout at every width**: nothing overflows, clips or scrolls sideways at 320, 390, 768 and desktop; the same component looks the same everywhere; edges align exactly.
14. **Keyboard and focus**: visible, unobscured focus; non-drag and non-gesture alternatives; no auto-dismiss timers.
