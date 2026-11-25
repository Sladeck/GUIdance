# Commands

Written here as with a manual copy. Installed as a plugin, put a colon in place of the space (`/guidance:setup`, `/guidance:spacing compact`), and list the commands with `/guidance:guidance`.

| Command | What it does |
| --- | --- |
| `/guidance` | Lists the commands. |
| `/guidance setup` | Learns what the project is, builds the colour roles from your brand colour and checks every pair for contrast, asks which density and shape you want, then writes or fixes design tokens (spacing, radius, type, motion, colours) in your stack's format. Never overwrites a file, and shows every change before making it. |
| `/guidance spacing [preset or what to change] [page\|all]` | Sets or changes density. A preset: `/guidance spacing compact` changes the whole project, `/guidance spacing compact /reports` one page. Plain words: `/guidance spacing more room between the cards`. Nothing: it shows a table of choices (every role, its value now, the three presets) and you answer. Risky picks are explained and need your confirmation. |
| `/guidance shape [preset or what to change]` | Sets or changes how rounded the corners are. A preset: `/guidance shape round`. Plain words: `/guidance shape rounder buttons`. Nothing: it shows a table of choices and you answer. Risky picks are explained and need your confirmation. Keeps nested corners concentric. |
| `/guidance build <what>` | Builds or changes UI with your tokens and the rules, then checks the result. |
| `/guidance review [target]` | Finds what breaks the rules. Give it a page (a route like `/settings`, a page file or a description), a file, folder or component, or nothing for your uncommitted changes. Each finding comes with where it is, why it matters (rule and source) and a fix. Changes nothing. |
| `/guidance wcag [target] [A\|AA]` | Checks the same targets as review, or one live page by its URL (`/guidance wcag https://example.com/signup`), against every WCAG 2.2 success criterion at Level AA (or `A` only): one finding per failure, a table with a result for every criterion, and a list of what to test by hand with a keyboard or screen reader. Changes nothing. |
| `/guidance fix [which]` | Fixes the findings of the last review or wcag check: all of them, by number (`1-5`) or by severity (`hard`). Shows the plan first, applies it, then checks again and reports what is fixed, what is left and anything new. |

