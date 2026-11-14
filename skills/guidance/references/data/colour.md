# Colour: the Material 3 system and working with a brand colour

Verified 2026-11-14 and 2026-11-15; use directly. Keys match `sources.md`.

## System [M3-COLOR]

One source colour gives five key colours, each a tonal palette (tone 0 to 100), assigned to 26 standard roles in light and dark. Tone is CIE L*, so contrast between two roles depends only on their tones: tones 50 and 98 give 3:1; 30 and 98 give 7:1. Material's colour space is HCT (CAM16 hue and chroma, L* tone).

**Roles.** Primary (most prominent: FAB, high-emphasis buttons, active states), secondary (less prominent: filter chips, tonal buttons), tertiary (contrasting accents: badges, some inputs), error, surface (backgrounds, containers), outline. "On" roles are text and icons on their pair; "container" roles are fills, never text. Outline marks important boundaries (text field borders: 3:1); outline variant is decorative (dividers), never a target's only boundary. Error stays static under dynamic colour but adapts to light and dark.

**Tones per role** (spec 2021, default contrast; material-color-utilities `color_spec_2021`):

| Role | Light | Dark |
| --- | --- | --- |
| primary / secondary / tertiary / error | 40 | 80 |
| on-primary / on-secondary / on-tertiary / on-error | 100 | 20 |
| *-container | 90 | 30 |
| on-*-container | 30 | 90 |
| surface | 98 | 6 |
| surface-container-lowest | 100 | 4 |
| surface-container-low | 96 | 10 |
| surface-container | 94 | 12 |
| surface-container-high | 92 | 17 |
| surface-container-highest | 90 | 22 |
| on-surface | 10 | 90 |
| on-surface-variant | 30 | 80 |
| outline | 50 | 60 |
| outline-variant | 80 | 30 |
| inverse-surface | 20 | 90 |
| inverse-on-surface | 95 | 20 |
| inverse-primary | 80 | 40 |

Surfaces come from the neutral palette; on-surface-variant and outlines from neutral variant.

**Scheme variants** (palette chroma, spec 2021; hue = source hue unless rotated):

| Variant | Primary | Secondary | Tertiary | Neutral | Neutral variant |
| --- | --- | --- | --- | --- | --- |
| tonal spot (default) | 36 | 16 | 24, hue +60 | 6 | 8 |
| neutral | 12 | 8 | 16 | 2 | 2 |
| vibrant | 200 (max) | 24, rotated | 32, rotated | 10 | 12 |
| expressive | 40, hue +240 | 24, rotated | 32, rotated | 8, hue +15 | 12, hue +15 |
| fidelity | keeps the source colour as primary container | | | | |

Vibrant rotations, breakpoints [0, 41, 61, 101, 131, 181, 251, 301, 360]: secondary [18, 15, 10, 12, 15, 18, 15, 12, 12], tertiary [35, 30, 20, 25, 30, 35, 30, 25, 25]. Expressive breakpoints [0, 21, 51, 121, 151, 191, 271, 321, 360]: secondary [45, 95, 45, 20, 45, 90, 45, 45, 45], tertiary [120, 120, 20, 45, 20, 15, 20, 120, 120]. Expressive moves primary away from the brand hue: only when there is no brand colour.

**GUIdance additions (judgment).** Success (green) and warning (amber) use error's tones. Chart colours: five hues from the primary hue (+0, +150, +60, +250, +310), tone 48 light and 72 dark, clearing 3:1 on every surface. The tables compute hue and chroma in OKLCH (CIE LCh turns blues purple as they lighten) and match tone exactly in L*, so contrast holds; colours can differ slightly from Material's HCT tools.

## Brand colour to table row (no code needed)

**HSL hue of `#rrggbb`:**
1. r, g, b = each pair / 255. max = largest, min = smallest, d = max - min.
2. If d is 0, or saturation is under 12%, use the `grey` row. Saturation = d / (1 - |max + min - 1|).
3. Hue: max is r: 60 x (((g - b) / d) mod 6); max is g: 60 x ((b - r) / d + 2); max is b: 60 x ((r - g) / d + 4). Add 360 if negative.
4. Round to the nearest multiple of 5 (357.5 and above becomes 0): row `h000` to `h355`.

Example: `#e8590c` gives r 0.910, g 0.349, b 0.047; max r, d 0.863; hue 60 x ((0.349 - 0.047) / 0.863) = 21.0, row `h020`.

**Exact brand colour (fidelity): its role.** Start from the `tonal_spot` row, then use the brand's relative luminance:
1. Each channel c (0..255): v = c / 255; linear = v / 12.92 if v <= 0.04045, else ((v + 0.055) / 1.055) ^ 2.4.
2. L = 0.2126 R + 0.7152 G + 0.0722 B (linear values).
3. L <= 0.13: the brand becomes light `primary`, `on-primary` = `#ffffff` (4.5:1 on every light surface and under white text).
4. Otherwise light `primary-container`, with `on-primary-container` = `#ffffff` if L <= 0.179, else `#000000`.
5. Dark keeps the row's values. Within 0.005 of a threshold, trust the preview's label ("exact brand as ...").

Example: `#e8590c` has L of about 0.24: `primary-container` with `#000000` text.

**Contrast of two colours by hand** (existing project colours): L for both as above, then (lighter + 0.05) / (darker + 0.05); show the working and round down. With a browser, `checks/contrast.js` measures rendered pages exactly.

## Neutral surfaces (recommended for products)

Material tints every surface with the brand hue. Large product design systems keep backgrounds near grey and spend colour on actions [PRIMER-COLOR, CARBON-COLOR, RADIX-COMPOSE]:
- GitHub Primer: page `#ffffff`, muted background `#f6f8fa` (OKLCH chroma 0.003), text `#1f2328`, muted text `#59636e`, border `#d1d9e0`, one accent `#0969da`.
- IBM Carbon: "the neutral gray family is dominant", one blue for primary actions, other colours "used sparingly and purposefully"; dark background `#161616`.
- Radix: pure gray works with any accent; for warmth, a gray tinted toward the accent's hue (slate for blue, sage for green, mauve for purple and red, sand for yellow and orange).
- A `tonal_spot` surface tinted by a green brand has chroma 0.021, six times GitHub's; the `neutral` table's surfaces sit near 0.007, like Radix's tinted grays.

How: keep the accent roles from the chosen variant's row; take these from the **same row of `palettes/neutral.md`**: `surface`, `surface-container-lowest`, `-low`, `surface-container`, `-high`, `-highest`, `on-surface`, `on-surface-variant`, `outline`, `outline-variant`, `inverse-surface`, `inverse-on-surface`. Tones are identical in every table and contrast depends only on tone, so all 120 pairs still pass. Preview: add `surfaces: "neutral"` to a palette. Keep tinted surfaces for expressive, brand-heavy products (games, kids, marketing pages).

## Two-tone palettes

The `two_tone` table pairs a deep, muted brand colour (`primary`, low colourfulness) with one bright accent in the `secondary` roles, like admin templates using forest green with lime. Accent hue: the brand hue moved 45 degrees toward OKLCH 125 (lime, the hues that stay most colourful when light); a brand within 45 degrees of 125 takes 125 itself (green gets lime); within 20 degrees it moves 45 degrees away instead. Surfaces are already neutral. Unlike Material, the accent container stays bright in dark mode (tone 85 with tone 20 text). Use the accent for one kind of thing (selected states, the main call to action on a dark hero, a chart's second series), not everywhere.
