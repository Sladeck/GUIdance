# `/guidance audit [target]`

Target: a file, folder, component or page (see `commands/open-page.md`). Without one, audit the files changed in the working tree (from version control); if there are none, ask what to audit.

1. Measure, do not guess. If the page can be opened, run `/guidance inspect` on it and use its findings, plus `checks/typography.js` (see `browser-checks.md`. For colours in code, compute contrast by hand with `references/data/colour.md` and show the working. Read code and screenshots for everything else.
2. Go through the audit checklist at the end of this file, section by section.
3. Report findings in the finding format (`commands/report-format.md`), ordered by severity, quoting measured numbers. End with the counts and the three fixes with the most impact.
4. Do not change code during an audit. Offer to fix after.

## Audit checklist

1. **Contrast**: text 4.5:1 (large 3:1); control cues, focus rings, meaningful icons and chart marks 3:1. Both themes. Disabled controls exempt.
2. **Targets**: 24x24 CSS px or spaced (Hard); 44pt iOS, 48dp Android, 44 to 48px on touch web layouts.
3. **Colour alone**: status, errors, series and links always have a second cue.
4. **Type**: a named subset of the platform scale; about three sizes per screen; body at platform default; 50 to 75 characters per line; no light weights small; text can grow to 200%.
5. **Spacing and grouping**: one scale; tighter inside groups than between; padding and gaps on parents; actions next to what they affect.
6. **Radius, elevation and icons**: one radius scale with concentric nested corners; elevation from the six Material levels, one separation cue per surface; one icon set and style, two sizes.
7. **Hierarchy**: one clear primary action; squint test passes.
8. **Forms**: single column, visible labels, validation timing matched to form type (long form: on blur; short or one-per-page: on submit), errors clear when fixed, input preserved.
9. **Feedback**: indicator only after about 1s; skeleton for page loads, spinner for a module, progress bar over 10s.
10. **Errors**: next to the cause, plus summary on submit; plain and specific; a way out.
11. **Destructive actions**: undo over confirmation; confirmations specific, outcome-named buttons, Cancel never default.
12. **Motion**: platform durations; honour reduced motion (fades instead of slides and zooms).
13. **Layout at every width**: nothing overflows, clips or scrolls sideways at 320, 390, 768 and desktop; the same component looks the same everywhere; edges align exactly.
14. **Keyboard and focus**: visible, unobscured focus; non-drag and non-gesture alternatives; no auto-dismiss timers.
