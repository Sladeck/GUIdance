# Rules

This file is the index. The rules themselves are in `references/rules/`, one file per section. Find the rules you need here, then read their section file: the text there holds the numbers, exemptions and when to break each rule. Never apply or cite a rule from its title alone.

Format of each rule in the section files: rule (severity) [source key + tier, see `references/sources.md`], then when to break it. Conflicts say who wins. Rules refer to each other by number; this index says which file holds each one.

| Section | File | Look here for |
| --- | --- | --- |
| 1 Contrast and colour | `references/rules/01-contrast-colour.md` | text and non-text contrast, colour alone, colour roles, light and dark, charts, status chips |
| 2 Target size | `references/rules/02-target-size.md` | the 24px minimum, platform touch sizes, spacing between targets, swipe targets |
| 3 Typography | `references/rules/03-typography.md` | type scale, body size, weights, line length, line height, text resize, letter spacing |
| 4 Spacing and grouping | `references/rules/04-spacing-grouping.md` | spacing scale, proximity, dividers, reflow at 320px, consistency, component room, density |
| 5 Shape, elevation and icons | `references/rules/05-shape-elevation-icons.md` | radius scale, nested corners, shadows, icons, the product's shape |
| 6 Hierarchy | `references/rules/06-hierarchy.md` | primary action, emphasis, squint test, visual complexity |
| 7 Forms | `references/rules/07-forms.md` | columns, labels and placeholders, when to validate, prefill, login, formats and required fields |
| 8 Feedback and loading | `references/rules/08-feedback-loading.md` | response times, spinners, skeletons, progress bars, optimistic updates, empty states |
| 9 Errors | `references/rules/09-errors.md` | where errors show, wording, recovery |
| 10 Destructive actions | `references/rules/10-destructive-actions.md` | undo, confirmations, button wording and defaults |
| 11 Motion | `references/rules/11-motion.md` | durations, easing, reduced motion, flashing |
| 12 Keyboard, focus and input | `references/rules/12-keyboard-focus-input.md` | focus indicators and their size, drag alternatives, consistent help, time limits, autoplay, toasts, keyboard and focus order, accessible names of controls, hover, pressed and disabled states |
| 13 Platforms: phone, tablet, desktop and native | `references/rules/13-platforms.md` | orientation, gestures, pointer cancellation, device motion, autocomplete and keyboards, hover content, safe areas, system gestures, navigation by window size, sheets |
| 14 Tables | `references/rules/14-tables.md` | table markup, captions, number alignment, sticky headers, sorting, filters, tables on small screens, row height |
| 15 Navigation and search | `references/rules/15-navigation-search.md` | breadcrumbs, pagination, infinite scroll and Load more, search field, no-results pages |
| 16 Writing | `references/rules/16-writing.md` | plain language, sentence length, button and link labels, capitalisation |

## Rules by section

1. 1.1 Text contrast (Hard) · 1.2 Non-text contrast (Hard) · 1.3 Never colour alone (Hard, Level A) · 1.4 Palette by role (Default) · 1.5 Colour roles in light and dark (Strong) · 1.6 Charts in brand shades (Default) · 1.7 Status values as tinted chips (Default) · 1.8 Light by default for reading, dark as a choice (Default)
2. 2.1 Minimum (Hard) · 2.2 Platform sizes (Default, on that platform)
3. 3.1 Use the platform type scale (Default) · 3.2 Body size (Default) · 3.3 Avoid light weights at small sizes (Default) · 3.4 Line length (Strong) · 3.5 Line height (Default) · 3.6 Respect user text size (Hard: the first bullet; Default: the rest) · 3.7 Letter and word spacing near default (Default)
4. 4.1 One spacing scale (Default) · 4.2 Proximity decides grouping (Strong) · 4.3 Space before lines (Default) · 4.4 Content fits at every width (Hard) · 4.5 Same thing, same look (Default) · 4.6 Give each component room (Default) · 4.7 One density for the product, one per page (Default)
5. 5.1 One radius scale (Default) · 5.2 Concentric nested corners (Default, wins over 5.1) · 5.3 Elevation: one cue, few levels (Default) · 5.4 Icons: one set, one style, two sizes (Default) · 5.5 One shape for the product (Default)
6. 6.1 One primary action (Strong) · 6.2 Squint test (Default) · 6.3 Simple and familiar beats novel (Default)
7. 7.1 Single column (Strong) · 7.2 Visible labels, not placeholders (Hard, Level A: a placeholder as the only label; Strong: the rest) · 7.3 When to validate (Strong) · 7.4 Do not ask twice (Hard, Level A) · 7.5 Login without puzzles (Hard) · 7.6 State formats and required fields up front (Default)
8. 8.1 Response time limits (Strong) · 8.2 Which indicator (Default) · 8.3 Optimistic state (Default) · 8.4 Empty states (Strong: the first two bullets; Default: the rest)
9. 9.1 Placement and visibility (Strong) · 9.2 Wording (Strong) · 9.3 Recovery (Strong)
10. 10.1 Undo first, alerts rarely (Strong) · 10.2 Confirmation wording and defaults (Strong)
11. 11.1 Durations and easing (Default) · 11.2 Reduced motion and flashing (Hard: the flashing bullet; Strong: the rest)
12. 12.1 Focus visible and unobscured (Hard) · 12.2 Alternatives to dragging and gestures (Hard) · 12.3 Consistent help (Hard, Level A) · 12.4 Time limits and things that start by themselves (Hard: the first four bullets; Default: the last) · 12.5 Everything works from the keyboard, in order (Hard, Level A) · 12.6 A focus indicator big enough to see (Default) · 12.7 Every control shows its state (Strong: the disabled bullets; Default: the rest)
13. 13.1 Works in both orientations (Hard, Level AA) · 13.2 Every gesture has a simple alternative (Hard: the first bullet; Default, on Apple platforms: the rest) · 13.3 Presses can be cancelled (Hard: the first bullet; the second is judgment) · 13.4 Device motion is never the only way (Hard, Level A) · 13.5 Tell the system what each field is for (Hard: the first bullet; Default: the rest) · 13.6 Content shown on hover or focus (Hard: the first two bullets; the last is judgment) · 13.7 Keep content clear of system areas (Default, on that platform) · 13.8 Leave the system's gestures alone (Default, on that platform) · 13.9 Navigation follows the window size (Default) · 13.10 Sheets (Default, on that platform)
14. 14.1 Table structure and numbers (Hard: the first bullet; Strong: the second and third; Default: the rest) · 14.2 Long and wide tables (Default)
15. 15.1 Breadcrumbs (Default) · 15.2 Pagination and long lists (Strong: the first bullet; Default: the rest) · 15.3 Search (Hard: the field and button have names; Strong: the no-results bullet; Default: the rest)
16. 16.1 Plain language (Strong; Default: the reading-level bullet) · 16.2 Labels say what happens (Hard: the 2.4.4 part of the link bullet; Strong: the rest; Default: the promise bullet) · 16.3 One capitalisation style (Default)
