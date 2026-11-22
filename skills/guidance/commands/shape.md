# `/guidance shape [preset or what to change]`

Sets or changes how rounded the product's corners are. The project has one shape, written as radius role tokens that point at the radius scale, so every button, card and dialog moves together. Rules 5.1, 5.2 and 5.5 in `references/rules/05-shape-elevation-icons.md` give the limits and their sources; the values are in `references/data/scales/shape.md`. Read both first.

The user decides. Your job is to show the choices as a table, say what is risky and why, and apply exactly what they picked. No pictures, no previews: tables and questions.

## What the user can say

| Part | Forms |
| --- | --- |
| **What** | A preset: `sharp`, `soft`, `round`. Or a change in plain words: "rounder buttons", "less rounded cards", "pill-shaped tags". Or a role and a value: `card 16`, `button full`. Or nothing. |
| **Where** | Nothing: the whole product. A page (a route, a page file, "on the pricing page"): the one-page risk of step 3. |
| **How much** | Nothing, "a bit", "slightly": one step. "a lot", "much", "way": two steps. "pill", "fully rounded": full. "square": 0. |

- Direction words: rounder, softer, curvier, more rounded; sharper, squarer, boxier, less rounded.
- A preset word next to a named part gives that part the preset's value for it, and nothing else moves: "round buttons" on a soft product sets buttons to full.
- "Pill" next to a part means full for that part ("make the buttons pills").
- A change that names no part ("rounder", "too boxy"): move the whole product one preset in that direction. Already at the end: say so and show the choice table.
- Nothing, or a request you cannot resolve: show the choice table (step 2) and wait.

**Plain words to roles.** People never need to type a role name:

| They say | Role |
| --- | --- |
| buttons | `radius-button` |
| inputs, fields, text boxes, search box, the closed select | `radius-field` |
| tags, chips, badges, labels | `radius-chip` |
| cards, boxes, panels, tiles; menus, popovers, tooltips, the open list of a select | `radius-card` |
| dialogs, modals, popups, sheets | `radius-overlay` |

"Dropdowns" can mean the closed control or its open list: ask which. If the words fit two roles, or none ("the corners of the sidebar"), do not guess: name the candidates by what they are on the user's page and ask once. A part with no role (an avatar, a one-off hero) is not this command's job: say so, and that a single custom component can be shaped on its own (rule 5.5). In everything you show the user, describe a role by what it is ("corners of cards"), with the token name after it.

**One step** is the next value of the radius scale: 0, 4, 8, 12, 16, 20, 28, 32, 48, then full. A step down from full is the largest scale step under half the component's height (16 for a 40px button): anything larger still draws as a pill. So when the current value is already half the component's height or more, "rounder" changes nothing on screen: say that plainly first, then offer full (the same look, written as a role) or stopping.

## Steps

1. **Find the tokens.** Locate where styling lives and list the radius tokens, as in `commands/setup.md` steps 1 and 2. Look for the role tokens (`radius-button`, `radius-field`, `radius-chip`, `radius-card`, `radius-overlay`, under the project's own naming) and for a `shape:` comment in the token file.
   - Role tokens exist: the current preset is the one named in the comment, or else the column most of them match. Roles that differ from it are tuned. Fewer than three matching any column: "custom".
   - Scale tokens only, or no tokens: there is no shape yet. Read what buttons, inputs, chips, cards and dialogs use today and name the closest preset. Step 4 adds the roles.
2. **Show the choices** when the request did not settle them. One table, then wait for the answer:

   | What | Now | sharp | soft | round |
   | --- | --- | --- | --- | --- |
   | Corners of buttons (`radius-button`) | 8 | 4 | 8 | full |
   | ... one row per role, values from the Shape presets table | | | | |

   - Under it: the other values a role may take (0, 4, 8, 12, 16, 20, 28, 32, 48, full) and the preset you recommend in one line with the reason ("Use for" row of the Shape presets table). Before recommending, learn what the product is and who uses it, as in `commands/setup.md` step 3 (README, PRODUCT.md or DESIGN.md, package description, page titles), and name it in the reason. Say the recommendation is judgment.
   - The user answers freely: a preset ("round"), single rows ("buttons full, cards 12"), or both ("soft, but pill buttons"). Take single rows as tunings on top of the preset.
   - A request that was already clear (a preset, a resolved change) skips the table and goes to step 3.
3. **Show the plan and its risks, then ask once.**
   - One table: what it is in plain words, role, value now, value after, where it is used (file, count of uses).
   - No role tokens yet (step 1): the plan adds all five radius roles, in the project's format, pointing at scale values, and the changed role is one of them. Adding them is part of this change, not a later option; only replacing raw uses with roles is a separate question (step 4). Never write a raw value where a role belongs.
   - Nested corners that will follow (step 4), each with its `file:line` and new value.
   - **Risks.** Say what the pick is and why it is a risk (the rule and its source, in a sentence). The user may still choose it. Each has a safer value, shown beside the pick in the plan:

     | Pick | Why it is a risk | Safer value |
     | --- | --- | --- |
     | Corners of 16 or more, or full, on cards and panels that hold tables, lists or forms, and on menus | Material warns against large or full corners on information-dense components [M3-SHAPE A]: they clip content (rule 5.1) | 12 |
     | Dialogs and sheets at full | A large surface with full corners clips its content (judgment) | 28 |
     | Dialogs and sheets less round than cards | The larger container reads as the rounder one (judgment) | The card value |
     | Fields at full when some are multi-line | A text box with full corners clips its text (judgment) | 12 |
     | More than four different values across the roles | Rule 5.1 asks for three or four steps for most of the product; count nested corners and the radii the project already uses | The last tuned role takes the nearest value already in use |
     | A value outside the radius scale | Off the scale (rule 5.1); `/guidance review` will report it | The nearest step, the lower one on a tie |

     One risk concerns the whole request: **a shape for one page only**. The same component should look the same everywhere (rule 4.5), and Material asks for consistent shape [M3-SHAPE A]. Ask a direct yes or no before showing the plan; on no, offer the product-wide change or stop.

   - Also say which current values already meet a risk (16px corners on a card that holds a form) and offer the fix as its own line.
   - What does not move: the radius scale itself, spacing, sizes, colours, and circles (avatars, round icon buttons).
   - Say that a preset changes every screen. Ask once: apply, adjust, or stop. A bare "apply" uses the safer value on every risky line; a risky value is applied only when the answer names it ("apply, including the 16px cards").
4. **Apply at the source.**
   - **Role tokens exist**: point each changed role at a different scale token (`--radius-card: var(--radius-sm)` becomes `var(--radius-md)`), in the file that defines the roles. Never edit the scale tokens themselves.
   - **No role tokens**: add them next to the radius scale, in the project's format and naming, pointing at scale tokens, never at raw numbers. Then offer, as a separate question, to replace raw scale uses with roles: list the candidates per role with `file:line` and replace only the ones the user accepts. A value whose role is unclear stays as it is. Where a current value differs from its role's value in the chosen preset, adopting the role moves it: show each one in the plan as a change. In Tailwind v4, use a role through the variable form (`rounded-(--radius-card)`).
   - **Nested corners**: where a rounded element sits inside a rounded container close to its edge (an inset of 2 to 32px and under 0.6 times the outer radius; judgment), set the inner radius to the outer radius minus the padding between them (rule 5.2). A result off the scale is kept. Do not change padding to make it land on the scale: that is a spacing change. Write it as a calculation from the role where the stack allows (`calc(var(--radius-card) - var(--space-100))`); a result of 0 or less becomes 0 or 4px. A list item or thumbnail inside a card takes this derived value. Elements further from the edge keep their own role; one with no role (a thumbnail, an inner box) takes the `radius-card` value when it is rounder than the card it sits in.
   - **One page only** (a risk the user accepted): scope the roles on that page's wrapper, as `commands/spacing.md` step 4 does for a page.
   - **Record it** in a comment in the token file: the preset, the tuned roles with their values, and the risks the user accepted (`shape: soft, tuned: button full, card 16; accepted: 16px corners on dense cards`). `/guidance review` reads this line and treats what it lists as intended.
5. **When the preset changes later**, tuned roles keep their values unless the user resets them. Check them against the risk table again and show any new risk.
6. **Check** by reading what you changed: the roles point at the values of the plan, every nested corner of the plan has its new value, at most four values are in use or the extra is listed as accepted, and nothing else moved. A browser tool is optional and only for looking at the page afterwards.
7. **Finish** with the preset and tuned roles in plain words, the accepted risks, the files changed, and what to look at by eye (images clipped by rounder corners, focus rings on pill buttons, elements nested inside cards). Do not commit.
