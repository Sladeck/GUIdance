# `/guidance review [target]`

Finds where an interface breaks the rules, and says why each rule exists and where it comes from. Change nothing; offer `/guidance fix` at the end.

## 1. Scope

| Target | What is reviewed |
| --- | --- |
| nothing | the files changed in the working tree (version control) |
| a file, folder or component | that code |
| a page: route (`/settings`), page file or description | the code behind that page: its template, styles and the components it uses |

With no changes and no target, ask what to review.

## 2. Read the project's choices first

Read the token file: the scales it defines, its `density:` and `shape:` comments, and anything recorded as tuned or accepted. Those are the user's decisions: a value that follows them is not a finding. List them in one line under the report.

## 3. Review the code

Go through the checklist below on the code in scope, section by section, reading only the `references/rules.md` sections you need. For each candidate finding, read the rule itself before reporting it: its number, severity, sources and its "Break" line.

- Colours: compute contrast by hand with `references/data/colour.md` and show the working. Say that ratios are computed by hand, and name those within 0.3 of their threshold.
- Sizes and spacing: follow tokens and aliases to the real value before judging it.
- Responsive behaviour: read the media queries and what changes at each one.

A browser tool is optional and only for looking: if one is available and the page can be opened, open it at 320, 390, 768 and 1440 wide to confirm what the code suggests (something overflowing, a target that looks small). Never type a password; ask the user to sign in. Label each finding "read from code" or "seen on the page".

## 4. Judge

- The same finding in several places is one finding, with the places listed.
- Give each finding its `file:line`. Use the project's token names in the fix.
- Drop a finding when the code shows it is intended (a documented optical adjustment, a deliberate variant, a decorative element), or when the token file lists it as tuned or accepted.
- Never report a rule as broken when its "Break" line covers the case.

## 5. Report

One numbered list in the format of `commands/report-format.md`, then the counts per severity, the three fixes with the most impact, and an offer of `/guidance fix`.

## Checklist

1. **Contrast**: text 4.5:1 (large 3:1); control cues, focus rings, meaningful icons and chart marks 3:1. Both themes. Disabled controls exempt.
2. **Targets**: 24x24 CSS px or spaced (Hard); 44pt iOS, 48dp Android, 44 to 48px on touch web layouts.
3. **Colour alone**: status, errors, series and links always have a second cue.
4. **Type**: a named subset of the platform scale; about three sizes per screen; body at platform default; 50 to 75 characters per line; no light weights small; at 200% text size nothing is clipped, truncated or hidden (Hard).
5. **Spacing and grouping**: one scale; tighter inside groups than between; padding and gaps on parents; actions next to what they affect; one density within a page (the project's, or the page's own override), with dialogs, menus and alerts at default in compact (rule 4.7).
6. **Radius, elevation and icons**: one radius scale with concentric nested corners, components on the project's radius roles where it has them (rule 5.5); elevation from the six Material levels, one separation cue per surface; one icon set and style, two sizes.
7. **Hierarchy**: one clear primary action; squint test passes.
8. **Forms**: single column, visible labels, validation timing matched to form type (long form: on blur; short or one-per-page: on submit), errors clear when fixed, input preserved.
9. **Feedback**: indicator only after about 1s; skeleton for page loads, spinner for a module, progress bar over 10s.
10. **Errors**: next to the cause, plus summary on submit; plain and specific; a way out.
11. **Destructive actions**: undo over confirmation; confirmations specific, outcome-named buttons, Cancel never default.
12. **Motion**: platform durations; honour reduced motion (fades instead of slides and zooms); nothing flashes more than three times a second (Hard; W3C exempts flashes under its thresholds, which code cannot show).
13. **Layout at every width**: nothing overflows, clips or scrolls sideways at 320, 390, 768 and desktop (read the media queries, fixed widths, `overflow` and flex or grid children without `min-width: 0`); the same component looks the same everywhere; edges align exactly.
14. **Keyboard, focus and timing**: visible, unobscured focus; non-drag and non-gesture alternatives; time limits can be turned off or extended, autoplaying audio and moving content can be paused or stopped (Hard); no message that disappears by itself when it is the only place for its information or action (Hard).
