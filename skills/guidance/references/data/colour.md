# Colour: roles, tones and contrast

Verified 2026-11-14 and 2026-11-15; use directly. Keys match `sources.md`.

## Roles [M3-COLOR]

A colour role is a colour named after its job, not its look. Material 3 assigns 26 standard roles in light and dark.

Primary (most prominent: high-emphasis buttons, active states), secondary (less prominent: filter chips, tonal buttons), tertiary (contrasting accents: badges, some inputs), error, surface (backgrounds, containers), outline. "On" roles are text and icons on their pair; "container" roles are fills, never text. Outline marks important boundaries (text field borders: 3:1); outline variant is decorative (dividers), never a target's only boundary. Dark is not an inversion of light: each role has its own tone.

## Tones per role [M3-COLOR-SPEC]

Tone is lightness (CIE L*), from 0 (black) to 100 (white). Contrast between two roles depends only on their tones: tones 50 and 98 give at least 3:1; 30 and 98 at least 7:1. The last two columns are the relative luminance each tone corresponds to, the number the contrast formula below uses.

| Role | Light tone | Dark tone | Light luminance | Dark luminance |
| --- | --- | --- | --- | --- |
| primary / secondary / tertiary / error | 40 | 80 | 0.113 | 0.567 |
| on-primary / on-secondary / on-tertiary / on-error | 100 | 20 | 1.000 | 0.030 |
| *-container | 90 | 30 | 0.763 | 0.062 |
| on-*-container | 30 | 90 | 0.062 | 0.763 |
| surface | 98 | 6 | 0.949 | 0.007 |
| surface-container-lowest | 100 | 4 | 1.000 | 0.004 |
| surface-container-low | 96 | 10 | 0.900 | 0.011 |
| surface-container | 94 | 12 | 0.853 | 0.014 |
| surface-container-high | 92 | 17 | 0.807 | 0.023 |
| surface-container-highest | 90 | 22 | 0.763 | 0.035 |
| on-surface | 10 | 90 | 0.011 | 0.763 |
| on-surface-variant | 30 | 80 | 0.062 | 0.567 |
| outline | 50 | 60 | 0.184 | 0.281 |
| outline-variant | 80 | 30 | 0.567 | 0.062 |
| inverse-surface | 20 | 90 | 0.030 | 0.763 |
| inverse-on-surface | 95 | 20 | 0.876 | 0.030 |
| inverse-primary | 80 | 40 | 0.567 | 0.113 |

Luminance from tone: ((tone + 16) / 116) cubed, for tones above 8; tone / 903.3 below.

GUIdance additions (judgment), not Material roles: success (green) and warning (amber) take error's tones. Amber at the light `warning` luminance (0.113) reads as brown: the price of a value that works as text and icons. Where a warning should look amber, use the chip of rule 1.7 (`warning-container` with `on-warning-container`). A brighter `warning` is a risk the user may accept in setup: it fails 4.5:1 as text and 3:1 as an icon on light surfaces. Chart colours: up to five distinct hues, each 3:1 against every surface it sits on.

## Contrast of two colours, by hand [WCAG-1.4.3]

1. Each channel c (0 to 255): v = c / 255; linear = v / 12.92 if v <= 0.04045, else ((v + 0.055) / 1.055) ^ 2.4.
2. Luminance L = 0.2126 R + 0.7152 G + 0.0722 B (linear values).
3. Ratio = (lighter L + 0.05) / (darker L + 0.05). Show the working and round down: 4.499 fails 4.5.

This is arithmetic done by hand: say so when you report ratios, and name the pairs within 0.3 of their threshold so the user can verify those themselves.

Keep the work small: compute each colour's luminance once and keep it in the table, then every ratio is one division. A colour used on several surfaces only needs checking against the surface closest to it in luminance: the others have more contrast.

## Building a colour set from a brand colour

No table and no generator: pick values, then prove them with the formula above.

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
