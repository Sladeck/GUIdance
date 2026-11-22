# `/guidance spacing [preset or what to change] [page|all]`

Sets or changes density: how much room the interface gives its content. The project has one density, written as spacing role tokens, so the whole app moves together; a page can override it, and single roles can be tuned on top of a preset. Rule 4.7 in `references/rules/04-spacing-grouping.md` gives the limits and their sources; the values are in `references/data/scales/spacing-density.md`. Read both first.

The user decides. Your job is to show the choices as a table, say what is risky and why, and apply exactly what they picked. No pictures, no previews: tables and questions.

Write nothing before the user answers the apply question of step 3, given after the plan was shown. An answer to an earlier question (which list, which page, a preset, the yes or no on a whole-request risk) is a choice, not the go-ahead: show the plan next.

## What the user can say

| Part | Forms |
| --- | --- |
| **What** | A preset: `compact`, `default`, `comfortable`. Or a change in plain words: "more room between the cards", "tighter lists", "bigger buttons". Or a role and a number: `card 20`. Or nothing. |
| **Where** | `all` or nothing: the project. A page: a route (`/reports`), a page file, "on the reports page", or the name of a page that exists (`settings`). The bare word `page`: ask which page. |
| **How much** | Nothing, "a bit", "slightly": one step. "a lot", "much", "way": two steps. |

- A phrase with a direction word (more, less, tighter, looser, bigger, smaller, wider, narrower, taller, shorter, denser, airier, roomier) is a change, never a page name.
- A preset word next to a named part is a change to that part: "compact tables" is tighter tables.
- A complaint or wish without a direction word ("too cramped", "feels empty"): take the direction it implies and say which you took. If it could go either way, ask.
- A change that names no part ("denser", "more breathing room"): move the whole scope one preset in that direction. Already at the end: say so and show the choice table.
- Nothing, or a request you cannot resolve: show the choice table (step 2) and wait.

**Plain words to roles.** People never need to type a role name:

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

"The list" or "the rows" alone: look at the code. Items separated by a gap are `space-stack`; rows that touch are `row-height`. People call tables lists, so a table is "the list" too: with only one of them in scope, take it; with both, and a role for each (items with gaps beside a table), the words fit two roles. If the words fit two roles, or none, do not guess: name every candidate by what it is on the user's page ("the gap between the items in Activity, or the height of the rows in the Orders table?") and ask once. In everything you show the user, describe a role by what it is ("space inside cards"), with the token name after it.

**One step** is the next value in this list: 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72 (the spacing scale from 4 up, without 6, 10, 14 and 36). The ends are limits. The two heights move by 4px (Material's density step) and need not be on the scale.

## Steps

1. **Find the tokens.** Locate where styling lives and list the spacing tokens, as in `commands/setup.md` steps 1 and 2. Look for the role tokens (`space-stack`, `space-field`, `space-group`, `space-section` and the others in the Density table, under the project's own naming), for the Density line of `design-decisions.md` (in older projects, a `density:` comment in the token file), and for page overrides (a density attribute or class, a nested theme).
   - Role tokens exist: the current preset is the one named in `design-decisions.md` (or, in older projects, a token-file comment), or else the column most of their desktop values match. Roles that differ from it are tuned. Fewer than half matching any column: "custom".
   - Scale tokens only, or no tokens: there is no density yet. Read what the components use today and name the closest preset. Step 4 adds the roles.
2. **Show the choices** when the request did not settle them. One table, then wait for the answer:

   | What | Now | compact | default | comfortable |
   | --- | --- | --- | --- | --- |
   | Space between list items (`space-stack`) | 8 | 4 | 8 | 12 |
   | ... one row per role, values from the Density table | | | | |

   - Under it: the other values a role may take (the step list; multiples of 4 for the heights), the scope it will apply to, and the preset you recommend in one line with the reason ("Use for" row of the Density table). Before recommending, learn what the product is and how it is used (touch or mouse), as in `commands/setup.md` step 3 (README, PRODUCT.md or DESIGN.md, package description, page titles), and name it in the reason. Say the recommendation is judgment.
   - The user answers freely: a preset ("compact"), single rows ("cards 20, sections 48"), or both ("default, but tighter lists"). Take single rows as tunings on top of the preset.
   - A request that was already clear (a preset, a resolved change) skips the table and goes to step 3.
3. **Show the plan and its risks, then ask once.**
   - One table: what it is in plain words, role, value now, value after, where it is used (file, count of uses).
   - No role tokens yet (step 1): the plan adds the spacing roles, in the project's format, pointing at scale tokens, and the changed role is one of them. Adding them is part of this change, not a later option; only replacing raw uses with roles is a separate question (step 4).
   - The record: the lines that change in `design-decisions.md`, and, when the file is missing, that it will be created, with any token-file `density:` or `shape:` comment moved into it (`references/formats/decisions.md`).
   - **Risks.** Two kinds. Say what the pick is and why it is a risk (the rule and its source, in a sentence). The user may still choose it.

     Risks of the whole request: ask a direct yes or no before showing the plan. On no, stop or let the user pick something else.

     | Request | Why it is a risk |
     | --- | --- |
     | Compact on a product used by touch | Compact is meant for mouse and keyboard [FIORI-DENSITY B]; touch targets get close together |
     | Comfortable on a dense data tool | Fewer rows on screen where people scan and compare [M3-DENSITY A] |
     | A page with its own density | Fiori and Cloudscape set density for the whole application; Material allows it by context (rule 4.7). Keep such pages few |

     A request that names a page ("on the dashboard", a route) is page scope even when the project has no roles yet, and even when the value is used only on that page: ask the page yes or no before the plan. On yes, the roles added for the project take its current values and the page redefines only the changed role (step 4, Page); on no, the change is project-wide.

     Risks of a single value: each has a safer value, shown beside the pick in the plan.

     | Pick | Why it is a risk | Safer value |
     | --- | --- | --- |
     | A role as large as or larger than the next in the order (stack, field, group, section; inline under field) | Space inside a group must be clearly smaller than between groups, or the grouping is lost (rule 4.2, Strong) | The largest list value under the next role |
     | Compact applied to dialogs, menus, popovers or snackbars | Material says not to densify focused tasks and alerts [M3-DENSITY A] | They keep the default column |
     | A control or row height under the touch size (44px) on touch layouts | Rule 2.2: targets are harder to hit | Heights rise to the touch size under 600px or on a coarse pointer |
     | A spacing value outside the density step list | Either off the spacing scale (rule 4.1), which `/guidance review` will report, or one of its in-between steps (6, 10, 14, 36), which the density roles leave out | The nearest list value |
     | A height that is not a multiple of 4 | Off Material's 4dp density step [M3-DENSITY A] | The nearest multiple of 4 |

   - **Not available, whatever the answer**: a control or row height under 24 CSS px. Rule 2.1 is a WCAG requirement (Hard). Say so and offer 24.
   - What does not move: font sizes, line heights, the spacing scale itself, radius and target floors.
   - Project scope: say how far it reaches (a preset changes every screen; a tuned role changes every place that role is used), and list the pages that override the density, asking whether each keeps its override.
   - Ask once: apply, adjust, or stop. A bare "apply" uses the safer value on every risky line; a risky value is applied only when the answer names it ("apply, including the compact dialogs").
4. **Apply at the source.**
   - **Project, role tokens exist**: point each changed role at a different scale token (`--space-group: var(--space-300)` becomes `var(--space-200)`), in the file that defines the roles. Never edit the scale tokens themselves.
   - **Project, no role tokens**: add them next to the spacing scale, in the project's format and naming, pointing at scale tokens, never at raw numbers. Then offer, as a separate question, to replace raw scale uses with roles: list the candidates per role with `file:line` and replace only the ones the user accepts. A value whose role is unclear stays as it is. Where a current value differs from its role's value in the chosen preset, adopting the role moves it: show each one in the plan as a change. In Tailwind v4, use a role through the variable form (`gap-(--space-group)`).
   - **Page**: redefine the roles on the page's root element, in the way the stack scopes values: a `[data-density="compact"]` block (or class) in the token file plus the attribute on the page's wrapper for CSS variables, a nested theme for theme objects. A page that only tunes a role or two redefines just those, scoped by a selector the page already has. The shared shell (navigation, header, sidebar, footer) keeps the project's density (judgment). Parts of the page still using raw scale steps will not follow: list them. A page asked to take the project's own values gets its override removed.
   - **Compact**: unless the user accepted that risk, dialogs, menus, popovers and snackbars keep the default column: redefine the roles at their default values on those components' roots or on the portal container they render into. No shared root for them: list where they are and say they will follow compact until one exists.
   - **Touch floor**: unless the user accepted that risk, control and row heights are at least the touch size under 600px wide or on a coarse pointer; the Density section gives the CSS. Put it on the shared control and row styles, not in the token block.
   - **Phone widths**: under 600px the page gutter is 16 and `space-card` takes the phone value from the Density section. A tuned `space-card` goes one step under its desktop value on phones.
   - **A setting people can switch**: write all three presets, default on the root and the other two under the attribute or class. Tuned roles keep their value in every preset. The control itself keeps default target sizes.
   - **Record it** in `design-decisions.md` as `references/formats/decisions.md` says: the Density line takes the preset, the tuned roles with their values and each overriding page (`Density: default; tuned: section 48, stack 4; pages: /reports compact (asked)`); each risk the user accepted goes on the Accepted risks line with its rule (`compact dialogs, rule 4.7`). `/guidance review` reads both lines and treats what they list as intended.
5. **When the preset changes later**, tuned roles keep their values unless the user resets them. Check them against the risk table again with the new preset and show any new risk.
6. **Check** by reading what you changed: the roles point at the values of the plan, the order holds or is listed as accepted, the phone values and the touch floor are in place, and nothing else moved. A browser tool is optional and only for looking at the page afterwards.
7. **Finish** with the scope, the preset and tuned roles in plain words, the accepted risks, the files changed, and what to look at by eye (dense tables, forms on mobile, anything that now wraps). Do not commit.
