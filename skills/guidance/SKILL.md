---
name: guidance
description: Evidence-ranked UI design rules with sources (WCAG 2.2, Apple, Material 3, Baymard, GOV.UK, NN/g). Sets up design tokens, builds, reviews and fixes web and native UI, and checks code or a live page against WCAG 2.2 AA. Also use it to answer any UI design question with the rule and its source, even one that seems like general knowledge, such as "why 16px body text?", "is 14px fine for my dashboard?", "is this contrast enough?" or "how much space between sections?". Covers spacing, layout, corner radius, font sizes and typography, colour, contrast, touch targets, forms, errors, loading, motion, keyboard and focus, accessibility.
---

# GUIdance

Design rules you can defend: each rule in `references/rules/` (indexed in `references/rules.md`) states a number or a behaviour, its sources with their weight, and when to break it. The skill is text only: no scripts, nothing generated. You do the work by reading and editing the project, and you always tell the user why: the rule, its source and tier. When the user wants something a rule advises against, say what the risk is and where that comes from, then let them decide. Read only what the current command needs.

## Commands

The first word after `/guidance` picks the command. Installed as a plugin, each command is also its own entry (`/guidance:setup`, `/guidance:review`); in this skill, `/guidance <command>` means either form. When you were started from a `/guidance:<command>` entry, write any command you suggest in that form (`/guidance:fix`), since the space form does not exist there. Plain requests map the same way: "set up design tokens" is setup, "make it denser", "more breathing room", "tighter lists on the reports page" or "change the spacing" is spacing, "rounder corners", "sharper buttons" or "too boxy" is shape, "build a settings screen" is build, "review this code" or "check this page for inconsistencies" is review, "check WCAG", "accessibility audit" or "is this page accessible?" is wcag, "fix those" after a report is fix.

**Before acting, read the command's file.** It lists the other files it needs.

| Command | Does | Read |
| --- | --- | --- |
| `/guidance` | Lists these commands in a few lines. Nothing else. | |
| `/guidance setup` | Learns what the project is, builds colour roles from the brand colour and checks every pair for contrast, asks for density and shape, then writes or fixes design tokens in the project. | `commands/setup.md` |
| `/guidance spacing [preset or what to change] [page\|all]` | Sets or changes density, for the whole project (`all`, or no scope) or one page. Takes a preset (`compact`, `default`, `comfortable`), a change in plain words ("more room between the cards") or nothing, in which case it shows a table of choices to answer. Risky picks are explained and confirmed. Applies at the token source. | `commands/spacing.md` |
| `/guidance shape [preset or what to change]` | Sets or changes how rounded the product's corners are. Takes a preset (`sharp`, `soft`, `round`), a change in plain words ("rounder buttons") or nothing, in which case it shows a table of choices to answer. Risky picks are explained and confirmed. Applies at the token source. | `commands/shape.md` |
| `/guidance build <what>` | Builds or changes UI following the rules and the project's tokens. | `commands/build.md` |
| `/guidance review [target]` | Reviews code (a file, folder, component, page, or the uncommitted changes) against the rules; one ordered list of findings with where, why (rule and source) and fix. | `commands/review.md` |
| `/guidance wcag [target] [A\|AA]` | Checks code, or a live page by URL (needs a browser tool), against every WCAG 2.2 Level A and AA criterion (AA by default): a finding per failure, a result per criterion, and what a person must test by hand. Not a conformance claim. | `commands/wcag.md` |
| `/guidance fix [which]` | Fixes findings from the last review or wcag report, then checks them again. | `commands/fix.md` |

Commands that report findings also read `commands/report-format.md`. A question with no command ("why 16px body text?", "is this contrast enough?") is answered from the rule's section file (find it in the index, `references/rules.md`) and its sources, with the rule number, the source key and its tier.

## Source weight

Sources are ranked in `references/sources.md`:

- **S**: W3C WCAG 2.2. Legal and consensus standard. Wins every conflict it covers.
- **A**: Apple HIG and Google Material 3 (platform authority: what users already expect), Baymard and GOV.UK (large-scale published research), peer-reviewed studies with 400+ people or field data (`SCI-*`).
- **B**: Nielsen Norman Group (decades of mostly small qualitative studies: strong on problems, weaker on exact numbers), smaller peer-reviewed experiments (`SCI-*`).
- **C**: secondary summaries. Never decisive.
- **Judgment**: no source. Always labelled.

Conflict rule: higher tier wins. Same tier, context decides (Apple on Apple platforms, Material on Android, Baymard for commerce and long forms, GOV.UK for public or one-question-per-page services). Nothing below S can relax an S requirement.

## Files

Every file the commands use, so you can open any of them directly. Read only what the current task needs.

**Rules.** `references/rules.md` is the index: every rule by number, title and severity, and which file holds it. The rules themselves, with sources, severity and when to break them:
- `references/rules/01-contrast-colour.md`, `02-target-size.md`, `03-typography.md`, `04-spacing-grouping.md`, `05-shape-elevation-icons.md`, `06-hierarchy.md`, `07-forms.md`, `08-feedback-loading.md`, `09-errors.md`, `10-destructive-actions.md`, `11-motion.md`, `12-keyboard-focus-input.md`, `13-platforms.md` (all in `references/rules/`)

**Values.** Every verified number, so you never search the web. Use them directly: Material 3 values verified 2026-11-02 to 2026-11-15, colour 2026-11-14 and 2026-11-15, GUIdance judgment marked as such. Keys match `references/sources.md`.
- `references/data/scales/spacing-density.md`: the spacing scale; density presets with role values, tuning, touch floor, phone widths
- `references/data/scales/shape.md`: the radius scale, nested corners; shape presets with role values and tuning
- `references/data/scales/type.md`: the 15 Material type styles, line height by script, the 5-style subset
- `references/data/scales/motion.md`: durations and easing
- `references/data/scales/elevation.md`: the six shadow levels
- `references/data/scales/icons.md`: icon sizes, weight, grade
- `references/data/scales/breakpoints.md`: window size classes, widths a review checks, navigation by window size
- `references/data/colour/roles-tones.md`: Material colour roles, the tones table with luminance per role, success, warning and chart colours
- `references/data/colour/contrast.md`: computing a contrast ratio by hand
- `references/data/colour/building.md`: building a colour set from a brand colour and checking every pair; neutral surfaces; one accent or two
- `references/data/accessibility.md`: WCAG and platform sizes
- `references/data/wcag-criteria.md`: every WCAG 2.2 Level A and AA criterion, what it asks, what to look for in code, and the rule that covers it
- `references/data/stacks.md`: framework traps
- `references/data/research.md`: research numbers and peer-reviewed study findings behind the rules

**Token files.** Worked examples to model any stack on: `references/formats/css.md`, `tailwind4.md`, `tailwind3.md`, `mui.md`, `scss.md`, `swiftui.md`, `compose.md` (all in `references/formats/`).

**Sources.** `references/sources.md`: every source key with its tier and link.
