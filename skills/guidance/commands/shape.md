# `/guidance shape [preset or what to change]`

Sets or changes how rounded the product's corners are. The project has one shape, written as radius role tokens that point at the radius scale, so every button, card and dialog moves together. Rules 5.1, 5.2 and 5.5 in `references/rules.md` say what may and may not change; the values are in the Shape section of `references/data/scales.md`. Read both first.

Shape is set for the whole product, never for one page: the same component must look the same everywhere (rule 4.5). If the user names a page, say so and offer the project-wide change or nothing.

## What the user can say

| Part | Forms |
| --- | --- |
| **What** | A preset: `sharp`, `soft`, `round`. Or a change in plain words: "rounder buttons", "less rounded cards", "pill-shaped tags". Or a role and a value: `card 16`, `button full`. Or nothing. |
| **How much** | Nothing, "a bit", "slightly": one step. "a lot", "much", "way": two steps. "pill", "fully rounded": full. "square": 0. |

- Direction words: rounder, softer, curvier, more rounded; sharper, squarer, boxier, less rounded.
- A preset word next to a named part gives that part the preset's value for it, and nothing else moves: "round buttons" on a soft product sets buttons to full, "soft buttons" sets them to 8.
- "Pill" next to a part means full for that part ("make the buttons pills").
- Asked to go rounder at full, or sharper at 0: say there is no further step.
- A change that names no part ("rounder", "too boxy", "friendlier corners"): move the whole product one preset in that direction. Already at the end: say so and offer the roles that can still move.
- Nothing to change (`/guidance shape`): report the current shape and propose two directions (step 2). Change nothing until the user picks.

**Plain words to roles.** People never need to type a role name:

| They say | Role |
| --- | --- |
| buttons | `radius-button` |
| inputs, fields, text boxes, search box, the closed select | `radius-field` |
| tags, chips, badges, labels | `radius-chip` |
| cards, boxes, panels, tiles; menus, popovers, tooltips, the open list of a select | `radius-card` |
| dialogs, modals, popups, sheets | `radius-overlay` |

"Dropdowns" can mean the closed control or its open list: ask which. If the words fit two roles, or none ("the corners of the sidebar"), do not guess: name the candidates by what they are on the user's page and ask once. A part with no role (an avatar, a one-off hero) is not this command's job: say so, and that a single custom component can be shaped on its own (rule 5.5). In everything you show the user, describe a role by what it is ("corners of cards"), with the token name after it.

**One step** is the next value of the radius scale in that direction: 0, 4, 8, 12, 16, 20, 28, 32, 48, then full.

**Two kinds of tuning.** A relative change ("rounder cards") is a distance from the preset, recorded with the value it gives (`card +1 (12)`); it travels with the role when the preset changes. An explicit value (a number, pill, square, a preset word next to a part) is recorded as that value (`button full`, `card 16`) and kept under any preset until the user changes it.

A step down from full is the largest scale step under half the component's height (16 for a 40px button): anything larger still draws as a pill. It is recorded as a value.

## Steps

1. **Find the tokens.** Locate where styling lives and list the radius tokens, as in `commands/setup.md` steps 1 and 2. Look for the role tokens (`radius-button`, `radius-field`, `radius-chip`, `radius-card`, `radius-overlay`, under the project's own naming) and for a `shape:` comment in the token file.
   - Role tokens exist: the current preset is the one named in the comment, or else the column most of them match. Roles that differ are tuned: list them. Fewer than three matching any column: "custom".
   - Scale tokens only, or no tokens: there is no shape yet. Read what the components use today (the radius of buttons, inputs, chips, cards and dialogs in the code, or measured on the page) and name the closest preset. Step 4 adds the roles.
   - Either way, say which current values already break a limit of step 5 (16px corners on a card that holds a form) and include the fix in the plan as its own line, for the user to accept or leave.
2. **Decide what changes.**
   - **A preset was given**: check it against the Shape table's "Use for" row and say so in one line if it is a poor fit. If roles are tuned, ask whether the tunings carry over or reset; carried-over tunings are checked against step 5 again, and one that no longer fits is dropped, with a line saying so.
   - **A change was given**: resolve it to roles and new values with the tables above, then check the limits of step 5 before showing anything. If a limit stops it ("rounder cards" on cards that hold tables), say which and offer what is allowed.
   - **Nothing was given: propose two directions.** A direction is a preset, or a preset plus one tuned role, built for this product, with one line on why. Read what the product is, who uses it and how dense its screens are (README, the pages, the "Use for" row, the density in the token file). The two must differ in what the eye catches first, the shape of buttons: one with pill buttons and one without, or sharp against round. Two directions that differ only by a step on cards or fields look the same in a picture. Check each against step 5 before showing it. Name them A and B by their effect ("A: soft, with pill buttons"), give each a table of role and value, and always offer a third choice: keep the current shape. Say that the choice between them is judgment: the sources fix the limits, not the mood.
   
     Preview, if a browser is available and the page already uses role tokens as CSS variables: set each direction's values on the page root in the browser only (nothing written to files), take a screenshot at 1440, then clear them. Show current, A and B. Otherwise show the tables and say the picture comes after applying.
   
     Ask: A, B, keep the current shape, adjust, or stop.
3. **Measure, then show the plan, before touching anything.**
   - If a browser is available, open a page that has buttons, a form and cards (`commands/open-page.md`), run `inspect.js` at 390 and 1440 (see `references/browser-checks.md`) and take a screenshot at 1440. Keep the results: they are the baseline for step 6.
   - One table: what it is in plain words, role, value now, value after, and where it is used (file, count of uses).
   - Nested corners that will need to follow (step 5), each with its `file:line` and new value.
   - What does not move: the radius scale itself, spacing, sizes, colours, and circles (avatars, round icon buttons).
   - Say plainly that this changes how every screen looks. Ask once: apply, adjust, or stop. Picking A or B in step 2 chose a direction; it did not approve the plan.
4. **Apply at the source.**
   - **Role tokens exist**: point each changed role at a different scale token (`--radius-card: var(--radius-sm)` becomes `var(--radius-md)`), in the file that defines the roles. Never edit the scale tokens themselves.
   - **No role tokens**: add them next to the radius scale, in the project's format and naming, pointing at scale tokens, never at raw numbers. Then offer, as a separate question, to replace raw scale uses with roles: list the candidates per role with `file:line` and replace only the ones the user accepts. A value whose role is unclear stays as it is. Where a current value differs from its role's value in the chosen preset, adopting the role moves it: show each one in the plan as a change. In Tailwind v4, use a role through the variable form (`rounded-(--radius-card)`).
   - **Nested corners**: where a rounded element sits inside a rounded container close to its edge (an inset of 2 to 32px and under 0.6 times the outer radius, the range the page check looks at), set the inner radius to the outer radius minus the padding between them (rule 5.2). A result off the scale is kept and listed in the plan as a nested corner. Do not change padding to make it land on the scale: that is a spacing change, for `/guidance spacing`. Write it as a calculation from the role where the stack allows (`calc(var(--radius-card) - var(--space-100))`), so it follows the next shape change by itself; a result of 0 or less becomes 0 or 4px, the on-scale choices rule 5.2 allows. A list item or thumbnail inside a card takes this derived value, never the card role itself. Elements further from the edge keep their own role; one with no role (a thumbnail, an inner box, a tip) takes the `radius-card` value when it is rounder than the card it sits in, so nothing inside a card is rounder than the card. List these in the plan.
   - Record it in a comment in the token file: the preset and the tuned roles (`shape: soft, tuned: button full, card +1 (12)`). A distance that comes back to zero is no longer a tuning: remove it from the record. An explicit value stays in the record even when a preset happens to match it.
5. **Keep the limits**, for presets and tuned roles alike.
   - Every value is a step of the radius scale (rule 5.1). A number that is not (`card 10`): offer the two nearest steps.
   - At most four different values across the roles, full not counted. Rule 5.1's three or four steps are for the whole product, which the page check measures: it counts every radius on the page and flags more than five, so derived nested values and radii the page already has (a checkbox, a progress bar) count too. If the plan would pass five, drop a tuning.
   - No large (16 and up) or full corners on information-dense containers: cards and panels that hold tables, lists or forms, and menus, which are lists (rule 5.1). Look at what uses `radius-card` before raising it past 12; if any of it is dense, say so and stop at 12.
   - `radius-overlay` is never full, and is at least as round as `radius-card` (judgment: the larger container is the rounder one).
   - `radius-field` is full only when every field is a single line; a multi-line text box with full corners clips its text (judgment).
   - Nested corners stay concentric (rule 5.2).
6. **Check against the baseline.** Run `inspect.js` again at the same widths and take the same screenshot; show before and after. Compared with step 3: no new `radius-count`, `nested-radius` or `component-drift` findings, and no new `radius-off-scale` finding other than a nested corner listed in the step 3 plan (rule 5.2 wins over the scale: say so in the report). The check reports an off-scale value with one element and a count, so before excusing one, confirm on the page that every element with that value is a nested corner from the plan. No browser: check the values by reading the token file and say "read from code, not measured".
7. **Finish** with the preset and tuned roles in plain words, the files changed, and what to look at by eye (images and thumbnails clipped by rounder corners, focus rings on pill buttons, elements nested inside cards). Do not commit.
