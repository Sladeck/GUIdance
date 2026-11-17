# Building a colour set from a brand colour

No table and no generator: pick values, then prove them with the contrast formula (`references/data/colour/contrast.md`). In steps 2 to 4, "the table" and "the role's column" mean the tones table in `references/data/colour/roles-tones.md`; the table of step 5 is the pair table built in that step.

1. **No brand colour?** Propose two hues that fit the product, one line each on why (judgment), and let the user pick one. It becomes the brand colour.
2. **The brand's role.** Compute the brand colour's luminance.
   - At 0.13 or under it is light `primary`, with white `on-primary` (4.5:1 on every light surface).
   - Above 0.13 it is light `primary-container`, and this replaces the table for that role and its text: `on-primary-container` is white up to 0.179 and black above. Light `primary` is then a darker colour of the same hue, at the table's luminance.
   - Every dark role follows the table. Tell the user which case applies and why.
3. **Each role's value.** Keep the brand's hue for the primary roles and choose a colour whose luminance is as close to the role's column as you can get. The column is the target; the pair check of step 5 is the proof. Secondary: the same hue, less colourful. Tertiary: a neighbouring hue. Error: red; success: green; warning: amber.
   - Two accents (see below): the secondary roles take the second hue, at the same luminance targets.
4. **Surfaces.** Near grey by default (see below), at the table's targets. The levels keep their order and stay visibly apart: in light, `surface-container-lowest` is the lightest, then `surface`, low, container, high, highest; in dark, the same order from darkest to lightest.
5. **Check every pair**, light and dark, and show the table with its ratios:
   - each on-X on its X, and each on-X-container on its container: 4.5:1;
   - on-surface and on-surface-variant on the surface levels: 4.5:1;
   - `inverse-on-surface` and `inverse-primary` on `inverse-surface`: 4.5:1;
   - any role used as text or icons on a surface (primary for links, error for messages, and secondary, tertiary, success or warning where the project does so): 4.5:1;
   - outline on the surfaces it borders, and each chart colour on its surface: 3:1;
   - the focus ring against what it sits on: 3:1.
6. A pair that fails is fixed before anything is shown as final: move the failing colour toward its luminance target and compute again.

The project's existing colours are checked the same way: list its text and boundary pairs, compute, and report the failures with the nearest value that passes.

## Neutral surfaces (recommended for products)

Material tints every surface with the brand hue. Large product design systems keep backgrounds near grey and spend colour on actions [PRIMER-COLOR, CARBON-COLOR, RADIX-COMPOSE]:
- GitHub Primer: page `#ffffff`, muted background `#f6f8fa`, text `#1f2328`, muted text `#59636e`, border `#d1d9e0`, one accent `#0969da`.
- IBM Carbon: "the neutral gray family is dominant", one blue for primary actions, other colours "used sparingly and purposefully"; dark background `#161616`.
- Radix: pure gray works with any accent; for warmth, a gray tinted toward the accent's hue (slate for blue, sage for green, mauve for purple and red, sand for yellow and orange).

Keep tinted surfaces for expressive, brand-heavy products (games, kids, marketing pages).

## One accent or two (judgment)

Most products use one accent on near-grey surfaces. A second, brighter accent in the secondary roles suits products that want one strong highlight (selected states, the main call to action, a chart's second series): use it for one kind of thing, not everywhere. Its hue is the user's choice; if they have none, propose one that stays clearly apart from the brand hue (judgment).
