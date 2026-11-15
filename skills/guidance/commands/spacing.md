# `/guidance spacing [preset or what to change] [page|all]`

Sets or changes density: how much room the interface gives its content. The project has one density, written as spacing role tokens, so the whole app moves together; a page can override it, and single roles can be tuned on top of a preset. Rule 4.7 in `references/rules.md` says what may and may not change; the values are in the Density section of `references/data/scales.md`. Read both first.

## What the user can say

Read the whole request, in any order, for three things:

| Part | Forms |
| --- | --- |
| **What** | A preset: `compact`, `default`, `comfortable`. Or a change in plain words: "more room between the cards", "tighter lists", "bigger buttons". Or a role and a number: `card 20`, `stack 4`. Or nothing. |
| **Where** | `all` or nothing: the project. A page: a route (`/reports`), a page file, "on the reports page", or the name of a page that exists when nothing else in the request explains the word (`settings`). The bare word `page`: ask which page. |
| **How much** | Nothing, "a bit", "slightly": one step. "a lot", "much", "way": two steps. There is no cap beyond the limits of step 5: asking again moves it again. A move of the whole scope to another preset is always one preset, whatever the amount asked. |

- A phrase with a direction word (more, less, tighter, looser, bigger, smaller, wider, narrower, taller, shorter, denser, airier, roomier) is a change, never a page name.
- A preset word next to a named part is a change to that part, not a preset: "compact tables" is tighter tables, "comfortable forms" is roomier forms.
- A complaint or wish without a direction word ("too cramped", "feels empty", "make it tight", "airy"): take the direction it implies and say which you took. If it could go either way, ask.
- A change that names no part ("denser", "more breathing room", "too cramped"): move the whole scope one preset in that direction. Already at the end (compact asked to be denser): say so and offer the roles that can still move.
- Nothing to change (`/guidance spacing`, `/guidance spacing all`, `/guidance spacing /reports`): report the current state for that scope and propose two directions (step 2). Change nothing until the user picks.

**Plain words to roles.** People do not know the role names and never need to type them:

| They say | Role |
| --- | --- |
| stacked items with a gap between them: cards in a list, menu items, chips, "between the results" | `space-stack` |
| rows that touch: table rows, lists with dividers; "taller rows", "tighter table" | `row-height` |
| the form, between fields or inputs | `space-field` |
| inside cards, boxes, panels, tiles; "the padding" | `space-card` |
| between cards, blocks, columns; the grid | `space-group` |
| between sections or parts of the page; above headings | `space-section` |
| page edges, sides, margins | `space-page` |
| button, input and select height; "bigger buttons" | `control-height` |
| inside buttons, left and right; button width | `space-control` |
| an icon and its label; a label and its field | `space-inline` |

"The list" or "the rows" alone: look at the page. Items separated by a gap are `space-stack`; rows that touch are `row-height`. If the words fit two roles, or none, do not guess: name the two candidates by what they are on the user's page ("the gap between the three stat cards, or the padding inside each one?") and ask once. In everything you show the user, describe a role by what it is ("space inside cards"), with the token name after it.

**One step** is the next value in this list, in that direction: 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72 (the spacing scale from 4 up, without 6, 10, 14 and 36, so no move is smaller than 4px). The ends are limits: at 4 or 72, say there is no further step. The two heights are not spacing: they move by 4px (Material's density step) and need not be on the scale. A role and a number (`card 20`) must be a value of that list; for a height, a multiple of 4.

**A tuning is a distance, not a value**: "section one step above its preset". It is recorded with the value it gives (`section +1 (40)`), and it travels with the role when the preset changes, at phone width, and into every preset of a switchable setting.

## Steps

1. **Find the tokens.** Locate where styling lives and list the spacing tokens, as in `commands/setup.md` steps 1 and 2. Look for the role tokens (`space-stack`, `space-field`, `space-group`, `space-section` and the others in the Density table, under the project's own naming), for a `density:` comment in the token file, and for page overrides (a density attribute or class, a nested theme).
   - Role tokens exist: the current preset is the one named in the `density:` comment, or else the column most of their desktop values match (the phone-width values of step 4 do not count). Roles that differ from that column are tuned: list them. Fewer than half matching any column: "custom".
   - Scale tokens only, or no tokens: there is no density yet. Step 4 adds the roles, for a page scope and for a single tuned role too: there must be roles to change.
2. **Decide what changes.**
   - **A preset was given**: check it against the Density table's "Use for" row and say so in one line if it is a poor fit (compact on a touch-first product, comfortable on a dense data tool). If roles are tuned, ask whether the tunings carry over to the new preset or reset; carried-over tunings are checked against step 5 again, and one that no longer fits is dropped, with a line saying so. The user decides.
   - **A change was given**: resolve it to roles and new values with the tables above. Then check the limits of step 5 before showing anything: if the new value collides with a neighbour in the order, say which and offer to move both.
   - **Nothing was given: propose two directions.** A direction is a preset plus one or two tuned roles, built for this product or page, with one line on why. Read what the product is and how it is used (README, the page's content, the "Use for" row), then compose:
     - reading or editorial content: wider `space-section`, so parts of the page separate clearly;
     - data tools: tighter `space-stack` or lower `row-height`, sections kept, so dense content stays in clear blocks;
     - form-heavy products: wider `space-field` and `space-group` together, since field alone would reach group;
     - touch-first consumer apps: wider `space-stack`, so stacked items are easier to tell apart and to hit (control heights already sit at the touch size on phones, so raising them shows on desktop only);
     - marketing and landing pages: wider `space-section` and `space-page`.
   
     The two must look different: different presets, or the same preset tuned in opposite ways on at least two roles. A tuned role in a direction moves two steps (8px for a height), or the picture will not show it. Where two steps would break a limit of step 5, move one and tune a second role in the same direction to make up for it. Check each direction against step 5 before showing it; one that breaks a limit is rebuilt, not shown. Name them A and B by their effect ("A: default with airier sections"), give each a table of the roles that differ from its own preset, and always offer a third choice: the untuned preset that fits the product best, named. Say that the choice between them is judgment: the sources fix the limits, not the mood.
   
     Preview, if a browser is available and the page already uses role tokens as CSS variables: set each direction's values in the browser only (nothing written to files), on the element that defines the roles for the scope (the root, or the wrapper of a page that has an override), take a screenshot at 1440 and at 390, then clear them. For a page scope with no override yet, use the page's content wrapper, not the root, so the shared shell does not move. At 390 set the phone-width values for the page gutter and `space-card` (the phone value plus the direction's distance for a tuned `space-card`), since values set this way outrank the stylesheet's own phone rules. Show current, A and B. Otherwise show the tables and say the picture comes after applying.
   
     Ask: A, B, the plain preset, adjust, or stop.
3. **Measure, then show the plan, before touching anything.**
   - If a browser is available, open the page (project scope: one that has a form, a list or table, and cards; see `commands/open-page.md`), run `inspect.js` and `targets.js` at 390 and 1440 (see `references/browser-checks.md`) and take a screenshot at 1440. For a page scope, also take a screenshot of one other page at 1440. Keep the results: they are the baseline for step 6.
   - One table: what it is in plain words, role, value now, value after, and where it is used (file, count of uses).
   - What does not move: font sizes, line heights, the spacing scale itself, radius and target floors. Going to compact, also dialogs, menus, popovers and snackbars (rule 4.7).
   - Project scope: say plainly how far it reaches (a preset changes every screen; a tuned role changes every place that role is used), and list the pages that override the density, asking whether each keeps its override or follows the project. A kept override is checked against step 5 again with the new project values. A page that only tunes roles holds distances from the project's preset: rewrite its values from the new preset and update its record.
   - Ask once: apply, adjust, or stop. Picking A or B in step 2 chose a direction; it did not approve the plan.
4. **Apply at the source.**
   - **Project, role tokens exist**: point each changed role at a different scale token (`--space-group: var(--space-300)` becomes `var(--space-200)`), in the file that defines the roles. Never edit the scale tokens themselves: every other use of the scale would move.
   - **Project, no role tokens**: add them next to the spacing scale, in the project's format and naming, pointing at scale tokens, never at raw numbers. Then offer, as a separate question, to replace raw scale uses with roles: list the candidates per role (gaps between stacked list items, stacked field gaps, card padding, gaps between cards, section margins, page gutter, control and row heights) with `file:line`, and replace only the ones the user accepts. A value whose role is unclear stays as it is. Where a current value differs from its role's value in the chosen preset (card padding of 16 in a project going to default, where the role is 24), adopting the role moves it: show each one in the plan as a change, even when the preset is the one the project already resembles. In Tailwind v4, use a role through the variable form (`gap-(--space-group)`), as the token file does for `min-h-(--target-touch)`.
   - **Page**: redefine the roles on the page's root element, in the way the stack scopes values: a `[data-density="compact"]` block (or class) in the token file plus the attribute on the page's wrapper for CSS variables, a nested theme for theme objects (MUI `ThemeProvider`, a Compose or SwiftUI environment value). The project's tunings carry into a page that overrides the preset, at the same distance, unless the user says that page starts untuned. A page that only tunes a role or two redefines just those, scoped by a selector the page already has (its wrapper's class or id) or by `data-density` with the page's name. The override covers the page's content only: the shared shell (navigation, header, sidebar, footer) keeps the project's density, so it does not shift when people move between pages (judgment). Parts of the page still using raw scale steps will not follow: list them and offer to move them to roles. A page asked to take the project's own values gets its override removed, not a second copy of the same values.
   - **Compact, either scope**: dialogs, menus, popovers and snackbars keep the default column. Redefine the roles at their default values on those components' roots, or on the portal container they render into, in the shared component or the token file. If the project has no shared root for them, list where they are and say they will follow compact until one exists.
   - **Touch floor**: control and row heights are at least the touch target size under 600px wide or on a coarse pointer, in every preset; the Density section gives the CSS. Put it as a minimum height on the shared control and row styles, not in the token block, where a page override would outrank it. Native stacks: the same minimum on the shared control style.
   - **Phone widths**: under 600px the page gutter and `space-card` take the phone values from the Density section, in every preset and scope. Write them once, with the roles; an overriding page needs its own phone values for `space-card`. A tuned `space-card` keeps its distance at phone width (one step above its preset on desktop, one step above the phone value on phones). The page gutter is 16 on phones even when `space-page` is tuned.
   - **The product wants a setting people can switch**: write all three presets, default on the root as the starting value and the other two under the attribute or class, each with the project's tunings applied at the same distance (dropped in a preset where step 5 does not allow them, with a line saying so), and say where the control should live. The control itself keeps default target sizes. A product that was compact or comfortable until now therefore starts on default once it has a switch: say so in the plan.
   - Record it in a comment in the token file: the preset and the tuned roles (`density: default, tuned: section +1 (40), stack -1 (4)`), and one line per overriding page, in the same form (`density /reports: compact`, `density /reports: default, tuned: stack -1 (4)`). A role that comes back to its preset value is no longer tuned: remove it from the record.
5. **Keep the limits**, for presets and tuned roles alike.
   - Every spacing value is a value of the step list above, between 4 and 72. A number that is not (`card 18`, `card 36`): offer the two nearest values of the list. Heights are exempt: multiples of 4.
   - The order holds, each strictly smaller than the next: stack, field, group, section; and inline stays smaller than field (rule 4.2).
   - Heights: nothing under 24 CSS px (rule 2.1), and the touch floor of step 4.
   - Check these again whenever a preset changes under a kept tuning or a kept page override.
   - One density within a page's content: no mixing of presets between its sections (rule 4.7). Tuning a role moves it everywhere in the scope, never in one section only.
6. **Check against the baseline.** Run the same checks at the same widths and take the same screenshot; show before and after. Compared with step 3: no new `uneven-gaps`, `heading-proximity` or `spacing-off-scale` findings, no new target FAIL, and no more target WARN at 390 than before. For a page scope, also open one other page and confirm it did not change. No browser: check the values by reading the token file and say "read from code, not measured".
7. **Finish** with the scope, the preset and tuned roles in plain words, the files changed, and what to look at by eye (dense tables, forms on mobile, anything that now wraps, the seam between the shell and an overridden page). Do not commit.
