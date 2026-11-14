---
name: guidance
description: Evidence-cited UI rules for building, auditing, inspecting, fixing or checking interfaces, and setting up design tokens and colour palettes with a live preview (/guidance setup, build, audit, inspect, fix, check). Inspect measures a local page at mobile, tablet and desktop widths for spacing, border, corner, colour and layout inconsistencies. Sources ranked by weight (WCAG, Apple, Material, Baymard, GOV.UK, NN/g). Needs no Python or Node.
---

# GUIdance

Design rules you can defend. Each rule in `references/rules.md` states a number or a behaviour, its sources with their weight, and when to break it. Where sources disagree, the rule says who wins. Taste is allowed; it just has to be labelled as taste.

You do all the work yourself with your own file tools: reading the project, choosing values, writing files. Nothing needs Python, Node or a network connection. Where exact maths is needed, the skill carries it as data:

| File | Use |
| --- | --- |
| `references/rules.md` | The rules, with sources, severity and when to break them |
| `references/design-data.md` | Every verified number (WCAG, platform sizes, Material 3 spacing, shape, type, motion, colour tones) and the brand-colour procedures. Use it instead of searching the web |
| `references/palettes/<variant>.md` | Precomputed, WCAG-checked colour palettes: one line per hue, light and dark |
| `references/formats/<stack>.md` | Worked token files (css, tailwind4, tailwind3, mui, scss) to model any stack on |
| `references/browser-checks.md` | JavaScript snippets that measure a rendered page (targets, typography, contrast, consistency) |
| `assets/preview.html` | Colour preview page that computes and checks palettes in the browser; edit only its CONFIG block |
| `references/sources.md` | Sources, ranked |

Read only what the current command needs.

## Source weight

Sources are ranked in `references/sources.md`:

- **S**: W3C WCAG 2.2. Legal and consensus standard. Wins every conflict it covers.
- **A**: Apple HIG and Google Material 3 (platform authority: what users already expect), Baymard and GOV.UK (large-scale published research).
- **B**: Nielsen Norman Group (decades of mostly small qualitative studies: strong on problems, weaker on exact numbers).
- **C**: secondary summaries. Never decisive.
- **Judgment**: no source. Always labelled.

Conflict rule: higher tier wins. Same tier, context decides (Apple on Apple platforms, Material on Android, Baymard for commerce and long forms, GOV.UK for public or one-question-per-page services). Nothing below S can relax an S requirement.

## Commands

The first word after `/guidance` picks the command. Plain requests map the same way ("set up design tokens" is setup, "review this code" is audit, "check this page for inconsistencies" or "does this look right on mobile" is inspect, "build a settings screen" is build).

### Opening a page

`inspect`, `check` and `audit` take a page in any form: a route (`/settings`), a page or component file (`app/settings/page.tsx`, `Settings.vue`), a plain description ("the pricing page"), a local address, or nothing (the page the user is working on, from recent changes). These are local pages in a coding session, not public websites.

1. Map it to a route: read the router (file-based routes in `app/`, `pages/`, `src/routes/`, or the route table) to find where that file or description renders. A component with no page of its own: find a page that uses it, or a story (Storybook) if the project has one.
2. Find the dev server: the `dev` or `start` script in package.json (or the framework's usual command), and its port from the script, the framework config or `.env`. Check whether it already answers on that port.
3. Not running: tell the user, then start it with the project's own command in the background, and stop it when done if you started it. Static HTML: open the file directly. A page behind a login: ask the user to sign in in the browser, never type passwords.
**A public URL** (a live site, a competitor, a staging deploy) also works, but only with a real browser: your browser tool, a browser MCP such as Playwright MCP, or the user's own browser with DevTools. Never measure from fetched HTML (web fetch, curl): many sites build the page with JavaScript, so the downloaded HTML can be nearly empty or missing styles, and any findings would be wrong. If no browser is available, say that, and either hand the user the snippets for DevTools or stop. Even in a browser, say the result is a snapshot: cookie banners, A/B tests, lazy-loaded sections, ads and the signed-out state can differ from what users see. Wait for the page to finish loading and scroll it once before measuring. Do not sign in or submit anything on a public site.

4. Open it with your browser tool. To measure a width, resize the window (or viewport) to it and wait for the layout to settle. Without a browser tool, give the user the snippet and these steps: DevTools, device toolbar, set the width, paste into the Console, send back the result. Without any browser, read the styles in the code instead and label the findings "read from code, not measured".

| Command | Does |
| --- | --- |
| `/guidance` | Lists these commands in a few lines. Nothing else. |
| `/guidance setup` | Learns what the project is (asks if unclear), proposes two colour palettes with a live preview, then writes or fixes design tokens and colours in the project. |
| `/guidance build <what>` | Builds or changes UI following the rules and the project's tokens. |
| `/guidance audit [target]` | Full review of a file, folder, component or page: code, tokens and measurements, with findings and fixes. |
| `/guidance inspect [page]` | Opens a page at mobile, tablet, desktop and its own breakpoint widths and lists every inconsistency it measures (spacing, borders, corners, shadows, icons, colours, type, overflow, keyboard and focus), most serious first, each with why and how to fix. |
| `/guidance fix [which]` | Fixes findings from the last inspect, audit or check (all, by number or by severity): shows the plan, applies it, then measures again to confirm. |
| `/guidance check [page]` | Quick measured pass on a page: targets, typography and contrast numbers only, no code review. |

### `/guidance setup`

**A. Understand the project.** Read, do not guess:
1. Find the project root and work out where styling lives, whatever the stack: a global stylesheet, a Tailwind entry CSS, a theme object (`createTheme`, a Chakra or Mantine theme), Sass variables, a component library's variables (shadcn's `--primary`, Bootstrap's `$primary`), or native theme code (SwiftUI asset catalog or `Color` extension, Compose `ColorScheme`, Flutter `ThemeData`, React Native theme). Tokens go where the project already defines styling, in its own format and naming. `design-data.md` section 9 lists traps for common stacks (MUI, Tailwind, shadcn, Bootstrap); read the matching one before writing.
2. List the existing tokens: CSS custom properties, Sass variables, theme objects and token files (`tokens.ts`, `theme.ts`, `*.tokens.json`). Follow aliases (`$space-sm: var(--x-space-sm)`) to the real value and the file that defines it. Compare spacing, radius, type and durations with `design-data.md` sections 3 to 6, and note each off-scale value with its nearest scale value.
3. Learn what the product is from the README, PRODUCT.md or DESIGN.md, the package description, page titles and metadata. Collect brand colours: tokens named brand, primary, accent or main, and colours in logo or favicon SVGs.
4. Tell the user in a few lines what you found. If the product, its users or the brand are unclear, ask in one question set: what it is, who uses it, the feel (calm, bold, playful, serious, premium), light or dark first, any brand colour. Skip what the project already answered.

**B. Colour wizard** (skip if the user keeps their colours)
5. Pick two directions, one line each on why. With a brand colour: `tonal_spot` (calm) and `fidelity` (exact brand kept) or `vibrant`. Without one: two hues that fit the product, as `tonal_spot` and `neutral` (or `expressive` for playful products). Mood is judgment: say so.
6. Find the row for each brand colour with `design-data.md` section 10 (HSL hue rounded to 5, or `grey`). For fidelity, also decide the brand's role there (primary or primary-container).
7. Preview: copy `assets/preview.html` to a scratch location (never into the project unless asked) and edit only its CONFIG block: title, then one entry per palette with `name`, `row`, `variant` and, for fidelity, `brand`. The page computes the same colours as the tables, checks 120 role pairs, shows the result and flags any failure. Show it: publish it as an artifact where artifacts exist; otherwise open the file in the user's browser or give them the path. Say it shows sample components, not their app.
8. Ask which one (A, B, adjust, or none). Adjusting means another row or variant and a new preview, never hand-edited hex values.

**C. Write the tokens**
9. **Project already has tokens**: do not add a parallel set. List off-scale values with their nearest scale value and ask which to move (one question, multi-select): moving radius or durations changes how the app looks. Edit values where they are defined (the token source file, not aliases). Add only missing categories, following the project's naming. For the chosen palette, map its roles onto existing colour names where they match and add the rest.
10. **No token system yet**: create one token file in the stack's own format, next to where styling lives, with every category: spacing, radius, elevation, type, motion, targets, focus and the chosen palette's colour roles for light and dark (values from `design-data.md` and the palette row, copied exactly, with the fidelity substitution if chosen). `references/formats/` has complete worked examples for plain CSS, Tailwind v4 and v3, MUI and Sass: use the closest one as the model (names, sections, dark-mode wiring) and translate it for other stacks. Show the file and the wiring line before writing; never overwrite an existing file. Then add the wiring line to their entry file.
11. Put a short comment in the token file recording the palette: variant, row and brand colour, so it can be regenerated.
12. Check: every colour you wrote must match the table row character for character. If a browser is available, open the app and run the contrast snippet from `browser-checks.md`.
13. Finish with what changed (files and values) and what to verify visually. Do not commit.

### `/guidance build <what>`

1. Read the `references/rules.md` sections relevant to what you are building. Do not apply all of it for a one-component change.
2. Use the project's design system (tokens, DESIGN.md, theme file). The rules set floors and ratios, not a brand. Only flag a project value when it breaks a **Hard** rule. If the project has no tokens, suggest `/guidance setup` once, then build with the values in `design-data.md`.
3. Express decisions as tokens (spacing, radius, type scale, durations), never one-off raw values.
4. After building, run the audit checklist on what you made and fix what fails. If the page can be opened in a browser, run the snippets in `browser-checks.md`.
5. Report only the rules you deliberately broke and why.

### `/guidance audit [target]`

Target: a file, folder, component or page (see Opening a page). Without one, audit the files changed in the working tree (from version control); if there are none, ask what to audit.

1. Measure, do not guess. If the page can be opened, run `/guidance inspect` on it and use its findings, plus the typography snippet from `browser-checks.md`. For colours in code, compute contrast with `design-data.md` section 10 and show the working. Read code and screenshots for everything else.
2. Go through the audit checklist below, section by section.
3. Report findings in the finding format, ordered by severity, quoting measured numbers. End with the counts and the three fixes with the most impact.
4. Do not change code during an audit. Offer to fix after.

### `/guidance inspect [page]`

Finds what makes a page look inconsistent or broken, at the sizes people actually use.

1. Open the page (see Opening a page).
2. Measure with the snippets in `browser-checks.md`:
   - **Snippet 4 (inspect)** at **mobile 390x844, tablet 768x1024, desktop 1440x900** and **320 wide** (WCAG reflow). Its result lists `breakpoints`: the widths where this page's layout switches, read from its own media queries (Material 3's 600, 840 and 1200 if it has none). Run snippet 4 again on both sides of each one (for example 799 and 800): layouts break right before they switch.
   - **Snippet 1 (targets)** and **snippet 3 (contrast)** at 390 and 1440.
   - **Snippet 5 (keyboard)** once at desktop width. Press Tab once in the page first (a real key press with your browser tool); the snippet says INCONCLUSIVE otherwise.
   - **Dark theme**, if the app has one: switch to it, wait for the colours to settle, then run snippets 3, 4 and 5 at one width.
   - If a snippet returns INCONCLUSIVE, do what it says and run it again. If snippet 4 warns that stylesheets could not be read, the page was opened as a file: serve the folder over http (the project's dev server, or your browser tool's preview server) and run again, or the project's tokens and breakpoints are missed.
3. Merge: the same finding (same kind, element and value) at several widths is one finding, tagged with where it happens: "all sizes", "mobile only", "mobile and tablet"... Width-specific findings matter most: say so.
4. Trace each finding to the code: search the project for the class, component or value and give `file:line`. Use the project's token names in the fix.
5. Judge before reporting. The snippet measures; you decide. Drop a finding when the code shows it is intended (a documented optical adjustment, a deliberate variant, a decorative element). Look at a screenshot when a finding is unclear.
6. Reply with one numbered list, most serious first: Hard, then Strong, then Default; within a level, findings that break layout or appear at more widths and more places come first. Each item:
   ```
   1. [Hard] Stars stick out of the rating card (mobile and tablet)
      Where: RatingCard.tsx:14, .stars (10px past the card at 390px)
      Why: content crossing its card looks broken and can hide the next element. Rule 4.4, WCAG 1.4.10 (S).
      Fix: font-size: var(--text-body) under 900px, or let the stars wrap.
   ```
7. End with the counts per severity and per width, and offer `/guidance fix`. Change nothing until the user says so.

### `/guidance fix [which]`

Fixes findings from the last `inspect`, `audit` or `check` in this conversation, then measures again. Without a previous report, run `/guidance inspect` first (ask which page if it is unclear).

`which` picks the findings: numbers (`1-5`, `2,7`), a severity (`hard`, `strong`), or nothing for all of them.

1. For each finding, find the code (`file:line`) and decide the change from its Fix line and the project's tokens. Fix at the source: a token value, the shared component or the parent's `gap` beats patching each instance. One change often fixes several findings; group them.
2. Show the plan before touching anything: per file, each change as before and after, with the finding numbers it fixes. Flag changes that alter how the app looks everywhere (a radius token, a colour role, a type step). Ask once: apply all, pick some, or stop.
3. Apply exactly those edits. No unrelated changes, no reformatting, no new dependencies.
4. Measure again with the same snippets at the same widths (and in dark if it was measured). Report each finding as fixed or still failing, plus anything new the change caused. Try once more on what still fails; if it still fails, explain why and stop.
5. Finish with the files changed, the counts (fixed, remaining, new) and anything to check by eye. Do not commit.

### `/guidance check [page]`

A fast, numbers-only pass on a page.

1. Open the page (see Opening a page) and run snippets 1, 2 and 3 from `browser-checks.md`; run snippet 1 again at 390px wide.
2. Without a browser tool, give the user the snippets to paste into DevTools and ask for the results.
3. Reply with one short table per check (FAIL and WARN only) and a one-line verdict. No code review, no fixes. Suggest `/guidance audit` for the full review.

## Severity

- **Hard**: WCAG AA (or A) requirement. Fails are bugs.
- **Strong**: backed by tier A research, or tier A and B agreeing. Break only with a stated reason.
- **Default**: a platform convention or system value. Deviate freely if consistent.

## Finding format

```
[Hard|Strong|Default] <what is wrong, where (file:line or screen area)>
Rule: <the rule, with the number>
Source: <key (tier) + link from references/sources.md>
Fix: <concrete change, using the project's tokens where they exist>
```

Never cite a source for a claim it does not make. Your own reasoning is `Source: judgment`.

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
