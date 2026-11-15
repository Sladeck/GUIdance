---
name: guidance
description: Evidence-cited UI rules for building, reviewing and fixing interfaces, and setting up design tokens and colour palettes with a live preview (/guidance setup, spacing, shape, build, review, fix). Review checks code and measures a local page at mobile, tablet and desktop widths for spacing, border, corner, colour, contrast, target, keyboard and layout problems. Sources ranked by weight (WCAG, Apple, Material, Baymard, GOV.UK, NN/g).
---

# GUIdance

Design rules you can defend: each rule in `references/rules.md` states a number or a behaviour, its sources with their weight, and when to break it. You do all the work with your own tools. Read only what the current command needs.

## Commands

The first word after `/guidance` picks the command. Plain requests map the same way: "set up design tokens" is setup, "make it denser", "more breathing room", "tighter lists on the reports page" or "change the spacing" is spacing, "rounder corners", "sharper buttons" or "too boxy" is shape, "build a settings screen" is build, "review this code", "check this page for inconsistencies" or "does this look right on mobile" is review, "fix those" after a report is fix.

**Before acting, read the command's file.** It lists the other files it needs.

| Command | Does | Read |
| --- | --- | --- |
| `/guidance` | Lists these commands in a few lines. Nothing else. | |
| `/guidance setup` | Learns what the project is, proposes two colour palettes with a live preview, then writes or fixes design tokens and colours in the project. | `commands/setup.md` |
| `/guidance spacing [preset or what to change] [page\|all]` | Sets or changes density, for the whole project (`all`, or no scope) or one page. Takes a preset (`compact`, `default`, `comfortable`), a change in plain words ("more room between the cards") or nothing, in which case it proposes two directions built for the product. Shows the plan, applies it at the token source, then measures. | `commands/spacing.md` |
| `/guidance shape [preset or what to change]` | Sets or changes how rounded the product's corners are. Takes a preset (`sharp`, `soft`, `round`), a change in plain words ("rounder buttons") or nothing, in which case it proposes two directions. Shows the plan, applies it at the token source, then measures. | `commands/shape.md` |
| `/guidance build <what>` | Builds or changes UI following the rules and the project's tokens. | `commands/build.md` |
| `/guidance review [target] [quick]` | Reviews code (a file, folder, component, or the uncommitted changes) and measures its page at mobile, tablet, desktop and breakpoint widths; one ordered list of findings with why and fix. `quick`: target, type and contrast numbers only. | `commands/review.md` |
| `/guidance fix [which]` | Fixes findings from the last review, then measures again. | `commands/fix.md` |

Commands that open a page also read `commands/open-page.md`; commands that report findings also read `commands/report-format.md`.

## Source weight

Sources are ranked in `references/sources.md`:

- **S**: W3C WCAG 2.2. Legal and consensus standard. Wins every conflict it covers.
- **A**: Apple HIG and Google Material 3 (platform authority: what users already expect), Baymard and GOV.UK (large-scale published research), peer-reviewed studies with 400+ people or field data (`SCI-*`).
- **B**: Nielsen Norman Group (decades of mostly small qualitative studies: strong on problems, weaker on exact numbers), smaller peer-reviewed experiments (`SCI-*`).
- **C**: secondary summaries. Never decisive.
- **Judgment**: no source. Always labelled.

Conflict rule: higher tier wins. Same tier, context decides (Apple on Apple platforms, Material on Android, Baymard for commerce and long forms, GOV.UK for public or one-question-per-page services). Nothing below S can relax an S requirement.

## Files

| File | Use |
| --- | --- |
| `references/rules.md` | The rules, with sources, severity and when to break them |
| `references/data/` | Every verified number, so you never search the web: `accessibility.md` (WCAG, platform sizes), `scales.md` (spacing, density presets, shape and shape presets, type, motion, elevation, icons, breakpoints), `colour.md` (Material roles and tones, brand colour to palette row, neutral surfaces, two-tone), `stacks.md` (framework traps), `research.md` |
| `references/palettes/<variant>.md` | WCAG-checked palettes, one line per hue. Large: search for the one row you need, never read a whole file |
| `references/formats/<stack>.md` | Worked token files (css, tailwind4, tailwind3, mui, scss) to model any stack on |
| `references/browser-checks.md` | How to run the page checks and what each finding means |
| `checks/*.js` | The page checks themselves (minified) |
| `assets/preview.html` | Colour preview page; edit only its CONFIG block |
| `references/sources.md` | Sources, ranked |
