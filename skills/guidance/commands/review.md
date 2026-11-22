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

Go through the checklist below on the code in scope, section by section, finding the rules in the index, `references/rules.md`, and reading only the section files in `references/rules/` you need. For each candidate finding, read the rule itself before reporting it: its number, severity, sources and its "Break" line.

- Colours: compute contrast by hand with `references/data/colour/contrast.md` and show the working. Say that ratios are computed by hand, and name those within 0.3 of their threshold.
- Sizes and spacing: follow tokens and aliases to the real value before judging it, and find it in the scale file's list (`references/data/scales/`) before calling it off the scale: a value in the list is on it. In a component library, convert the library's units first (MUI `sx` spacing multiplies `theme.spacing`; `sx` `borderRadius` multiplies `shape.borderRadius`).
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

The items follow the sections of the rules (index: `references/rules.md`); each rule number, in parentheses, covers the clauses before it, back to the previous rule number. Hard is the label the rule's section file gives it, not every rule that cites WCAG. The checklist is a reminder of what to look for, not the rule: read the rule before reporting (step 3).

1. **Contrast and colour**: text 4.5:1, large text 3:1, in both themes, disabled controls exempt (1.1, Hard); control cues, project-defined focus styles, meaningful icons and chart marks 3:1, in both themes, inactive controls exempt (1.2, Hard). Status, errors, required fields, chart series and links have a second cue besides colour (1.3, Hard). Colours named by role, text only on its pair, outline for control boundaries (1.4, 1.5). One or two chart series in brand shades, no rainbow for one measure (1.6). Status values as chips that keep a sign or a word (1.7). Follows the system theme; where the product picks, reading-heavy surfaces start light (1.8).
2. **Target size**: 24x24 CSS px or spaced (2.1, Hard); 44pt iOS, 48dp Android, 44 to 48px on touch web layouts; swipe actions also have a button (2.2; Hard under 12.2).
3. **Typography**: a named subset of the platform scale, about three sizes per screen (3.1); body at the platform default (3.2); no light weights at small sizes (3.3); 50 to 75 characters per line (3.4); line height about 1.5 for paragraphs (3.5); at 200% text size nothing is clipped, truncated or hidden, form controls resize, no text sized only in viewport units, zoom not blocked (3.6, Hard); paragraphs keep the font's letter and word spacing (3.7).
4. **Spacing and grouping**: one scale, padding and gaps on parents (4.1); tighter inside groups than between, actions next to what they affect (4.2); space before borders and dividers (4.3); nothing overflows, clips or scrolls sideways at 320, 390, 768 and desktop: read the media queries, fixed widths, `overflow` and flex or grid children without `min-width: 0`; visible truncation with the full text reachable is fine, and maps, diagrams and data tables scrolling in their own container are exempt (4.4, Hard); the same component looks the same everywhere, edges align exactly, at most two border widths (4.5); components have room (4.6); one density within a page (the project's, or the page's own override), with dialogs, menus and alerts at default in compact (4.7).
5. **Shape, elevation and icons**: one radius scale (5.1); concentric nested corners (5.2); elevation from the six Material levels, one separation cue per surface (5.3); one icon set and style, two sizes (5.4); components on the project's radius roles where it has them (5.5).
6. **Hierarchy**: one clear primary action, in the same place across pages (6.1); squint test passes (6.2); navigation, search and account where that kind of page usually has them, few distinct colours and alignments per screen (6.3).
7. **Forms**: single column (7.1); visible labels, no placeholder used as a label or a hint (7.2; Hard when the placeholder is the only label); validation timing matched to form type (long form: on blur; short or one-per-page: on submit), errors clear when fixed (7.3); nothing asked twice in one process (7.4, Hard); login allows paste and password managers, no puzzle without an alternative (7.5, Hard); format rules and required fields stated before submission (7.6).
8. **Feedback and loading**: past 1s something shows the system is working; past 10s progress with cancel; no precise countdown when the duration cannot be predicted (8.1); the indicator starts only after about 1s: skeleton for page loads, spinner for a module, progress bar for processes (8.2); safe actions update at once and roll back visibly on failure (8.3).
9. **Errors**: next to the cause, plus a summary on submit for multi-field forms, never by colour alone (9.1); plain and specific, no bare codes (9.2); input preserved and a fix offered (9.3).
10. **Destructive actions**: undo over confirmation; a toast that is the only way to undo does not disappear by itself (10.1; Hard under 12.4); confirmations specific, buttons named by outcome, Cancel never the default (10.2).
11. **Motion**: platform durations and easing (11.1); reduced motion honoured: fades instead of slides and zooms (11.2, Strong); nothing flashes more than three times a second (11.2, Hard; W3C exempts flashes under its thresholds, which code cannot show).
12. **Keyboard, focus and input**: visible, unobscured focus (12.1, Hard); non-drag and non-gesture alternatives (12.2, Hard); help in the same place across pages (12.3, Hard); time limits can be turned off, adjusted or extended; audio that starts by itself can be paused or stopped, or has its own volume control; moving or self-updating content beside other content can be paused, stopped or hidden, unless essential (a loading indicator in one module is a question, not a finding); no message that disappears by itself when it is the only place for its information or action (12.4, Hard); everything works from the keyboard, clickable `div`s and `span`s are `button` or `a`, every control has a name (icon-only buttons and links, switches, checkboxes, fields; text beside a control is not its name), focus order follows meaning, no positive `tabindex`, hidden content not focusable (12.5, Hard); a project-defined focus indicator at least a 2px solid outline on or outside the edge, with a 3:1 change (12.6).
13. **Platforms**: no orientation lock or "rotate your device" screen, unless essential (13.1, Hard); multi-finger and path gestures have a single-pointer alternative, unless essential; sliders and plain drags belong to 12.2 (13.2, Hard); a press can be cancelled: nothing irreversible fires on the down-event, unless essential (13.3, Hard); shake and tilt also have a control and can be switched off (13.4, Hard); fields about the user state their purpose, on the web with `autocomplete` (13.5, Hard); the keyboard matches the content and does not cover the field (13.5); hover and focus popups can be dismissed, hovered and stay put (13.6, Hard); controls stay clear of safe areas and system bars (13.7); custom gestures do not fight the system's edge gestures (13.8); under 600 wide a bottom bar with three to five destinations or a modal rail, above it a rail or sidebar; tab bar rules on Apple platforms (13.9); on Apple platforms one sheet at a time, closed with Cancel or Done; Material modal bottom sheets on mobile only (13.10).
