# Roles [M3-COLOR]

A colour role is a colour named after its job, not its look. Material 3 assigns 26 standard roles in light and dark.

Primary (most prominent: high-emphasis buttons, active states), secondary (less prominent: filter chips, tonal buttons), tertiary (contrasting accents: badges, some inputs), error, surface (backgrounds, containers), outline. "On" roles are text and icons on their pair; "container" roles are fills, never text. Outline marks important boundaries (text field borders: 3:1); outline variant is decorative (dividers), never a target's only boundary. Dark is not an inversion of light: each role has its own tone.

## Tones per role [M3-COLOR-SPEC]

Tone is lightness (CIE L*), from 0 (black) to 100 (white). Contrast between two roles depends only on their tones: tones 50 and 98 give at least 3:1; 30 and 98 at least 7:1. The last two columns are the relative luminance each tone corresponds to, the number the contrast formula (`references/data/colour/contrast.md`) uses.

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
