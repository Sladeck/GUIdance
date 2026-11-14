---
name: guidance
description: Evidence-cited UI rules for building, auditing, inspecting, fixing or checking interfaces, and setting up design tokens and colour palettes with a live preview (/guidance setup, build, audit, inspect, fix, check). Inspect measures a local page at mobile, tablet and desktop widths for spacing, border, corner, colour and layout inconsistencies. Sources ranked by weight (WCAG, Apple, Material, Baymard, GOV.UK, NN/g). Needs no Python or Node.
---

# GUIdance

Design rules you can defend: each rule in `references/rules.md` states a number or a behaviour, its sources with their weight, and when to break it. You do all the work with your own tools; nothing needs Python, Node or the network. Read only what the current command needs.

## Commands

The first word after `/guidance` picks the command. Plain requests map the same way: "set up design tokens" is setup, "build a settings screen" is build, "review this code" is audit, "check this page for inconsistencies" or "does this look right on mobile" is inspect, "fix those" after a report is fix.

**Before acting, read the command's file.** It lists the other files it needs.

| Command | Does | Read |
| --- | --- | --- |
| `/guidance` | Lists these commands in a few lines. Nothing else. | |
| `/guidance setup` | Learns what the project is, proposes two colour palettes with a live preview, then writes or fixes design tokens and colours in the project. | `commands/setup.md` |
| `/guidance build <what>` | Builds or changes UI following the rules and the project's tokens. | `commands/build.md` |
| `/guidance audit [target]` | Full review of a file, folder, component or page: code, tokens and measurements, with findings and fixes. | `commands/audit.md` |
| `/guidance inspect [page]` | Opens a page at mobile, tablet, desktop and its own breakpoint widths and lists every inconsistency it measures, most serious first, each with why and how to fix. | `commands/inspect.md` |
| `/guidance fix [which]` | Fixes findings from the last inspect, audit or check, then measures again. | `commands/fix.md` |
| `/guidance check [page]` | Quick measured pass: targets, typography and contrast numbers only. | `commands/check.md` |

Commands that open a page also read `commands/open-page.md`; commands that report findings also read `commands/report-format.md`.

## Source weight

Sources are ranked in `references/sources.md`:

- **S**: W3C WCAG 2.2. Legal and consensus standard. Wins every conflict it covers.
- **A**: Apple HIG and Google Material 3 (platform authority: what users already expect), Baymard and GOV.UK (large-scale published research).
- **B**: Nielsen Norman Group (decades of mostly small qualitative studies: strong on problems, weaker on exact numbers).
- **C**: secondary summaries. Never decisive.
- **Judgment**: no source. Always labelled.

Conflict rule: higher tier wins. Same tier, context decides (Apple on Apple platforms, Material on Android, Baymard for commerce and long forms, GOV.UK for public or one-question-per-page services). Nothing below S can relax an S requirement.

## Files

| File | Use |
| --- | --- |
| `references/rules.md` | The rules, with sources, severity and when to break them |
| `references/data/` | Every verified number, so you never search the web: `accessibility.md` (WCAG, platform sizes), `scales.md` (spacing, shape, type, motion, elevation, icons, breakpoints), `colour.md` (Material roles and tones, brand colour to palette row, neutral surfaces, two-tone), `stacks.md` (framework traps), `research.md` |
| `references/palettes/<variant>.md` | WCAG-checked palettes, one line per hue. Large: search for the one row you need, never read a whole file |
| `references/formats/<stack>.md` | Worked token files (css, tailwind4, tailwind3, mui, scss) to model any stack on |
| `references/browser-checks.md` | How to run the page checks and what each finding means |
| `checks/*.js` | The page checks themselves (minified) |
| `assets/preview.html` | Colour preview page; edit only its CONFIG block |
| `references/sources.md` | Sources, ranked |
