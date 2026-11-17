---
name: guidance
description: Evidence-cited UI design rules and the commands to apply them (/guidance setup, spacing, shape, build, review, fix). Installs the rules in a project as design tokens, builds UI that follows them, reviews code against them and fixes what breaks them, always saying why a rule exists and where it comes from. Use for spacing, corners, type, colour and contrast, targets, forms, motion, layout and accessibility questions, on the web (desktop, tablet, phone) and in native iOS and Android apps. Sources ranked by weight (WCAG, Apple, Material, Baymard, GOV.UK, NN/g, peer-reviewed studies).
---

# GUIdance

Design rules you can defend: each rule in `references/rules/` (indexed in `references/rules.md`) states a number or a behaviour, its sources with their weight, and when to break it. The skill is text only: no scripts, nothing generated. You do the work by reading and editing the project, and you always tell the user why: the rule, its source and tier. When the user wants something a rule advises against, say what the risk is and where that comes from, then let them decide. Read only what the current command needs.

## Commands

The first word after `/guidance` picks the command. Installed as a plugin, each command is also its own entry (`/guidance:setup`, `/guidance:review`); in this skill, `/guidance <command>` means either form. When you were started from a `/guidance:<command>` entry, write any command you suggest in that form (`/guidance:fix`), since the space form does not exist there. Plain requests map the same way: "set up design tokens" is setup, "make it denser", "more breathing room", "tighter lists on the reports page" or "change the spacing" is spacing, "rounder corners", "sharper buttons" or "too boxy" is shape, "build a settings screen" is build, "review this code" or "check this page for inconsistencies" is review, "fix those" after a report is fix.

**Before acting, read the command's file.** It lists the other files it needs.

| Command | Does | Read |
| --- | --- | --- |
| `/guidance` | Lists these commands in a few lines. Nothing else. | |
| `/guidance setup` | Learns what the project is, builds colour roles from the brand colour and checks every pair for contrast, asks for density and shape, then writes or fixes design tokens in the project. | `commands/setup.md` |
| `/guidance spacing [preset or what to change] [page\|all]` | Sets or changes density, for the whole project (`all`, or no scope) or one page. Takes a preset (`compact`, `default`, `comfortable`), a change in plain words ("more room between the cards") or nothing, in which case it shows a table of choices to answer. Risky picks are explained and confirmed. Applies at the token source. | `commands/spacing.md` |
| `/guidance shape [preset or what to change]` | Sets or changes how rounded the product's corners are. Takes a preset (`sharp`, `soft`, `round`), a change in plain words ("rounder buttons") or nothing, in which case it shows a table of choices to answer. Risky picks are explained and confirmed. Applies at the token source. | `commands/shape.md` |
| `/guidance build <what>` | Builds or changes UI following the rules and the project's tokens. | `commands/build.md` |
| `/guidance review [target]` | Reviews code (a file, folder, component, page, or the uncommitted changes) against the rules; one ordered list of findings with where, why (rule and source) and fix. | `commands/review.md` |
| `/guidance fix [which]` | Fixes findings from the last review, then checks them again. | `commands/fix.md` |

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

| File | Use |
| --- | --- |
| `references/rules.md` | Index: every rule by number, title and severity, and which section file holds it |
| `references/rules/` | The rules, one file per section, with sources, severity and when to break them |
| `references/data/` | Every verified number, so you never search the web: `accessibility.md` (WCAG, platform sizes), `scales.md` (spacing, density presets, shape and shape presets, type, motion, elevation, icons, breakpoints), `colour.md` (Material roles and tones, the contrast formula, building a colour set from a brand colour, neutral surfaces), `stacks.md` (framework traps), `research.md` |
| `references/formats/<stack>.md` | Worked token files (css, tailwind4, tailwind3, mui, scss, swiftui, compose) to model any stack on |
| `references/sources.md` | Sources, ranked |
