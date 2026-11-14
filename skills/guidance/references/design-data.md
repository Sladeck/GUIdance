# Design data

Every number GUIdance builds with, verified against its source on the date given. **Use these values directly. Do not search the web for them.** Re-verify only when a source is more than a year older than today, or when the user asks.

Verified 2026-11-02 (rules) and 2026-11-14 (colour, stack formats). Source keys match `sources.md`.

---

## 1. Accessibility thresholds [WCAG 2.2, tier S]

| What | Value |
| --- | --- |
| Normal text contrast (1.4.3, AA) | 4.5:1 |
| Large text contrast (1.4.3, AA) | 3:1. Large = 24px regular, or 18.66px (14pt) bold |
| Non-text contrast (1.4.11, AA) | 3:1 for anything needed to identify a control or its state, meaningful icons, chart marks |
| Rounding | None: 4.499:1 fails |
| Target size (2.5.8, AA) | 24x24 CSS px, or a 24px circle centred on the target that does not overlap others |
| Target size exceptions | Inline links in text, equivalent control elsewhere, user-agent controls, essential sizing |
| Keyboard (2.1.1, A) | Everything that works with a pointer works from the keyboard |
| Focus order (2.4.3, A) | Tab order follows the meaning and reading order of the page |
| Focus visible (2.4.7, AA) | Any keyboard-operable interface has a mode where the focus indicator is visible |
| Focus not obscured (2.4.11, AA) | A focused component is never entirely hidden by author content (sticky header or footer, non-modal dialog). Partly hidden passes AA. Fix with `scroll-padding` (technique C43); failure F110 |
| Line length (1.4.8, AAA) | 80 characters max (40 for CJK) |
| Reflow (1.4.10, AA) | No two-direction scrolling at 320 CSS px wide (= 1280px at 400% zoom), or 256 CSS px high for horizontal content. Exceptions: maps, diagrams, video, games, presentations, data tables, toolbars that must stay visible |
| Reduced motion (2.3.3, AAA; technique C39) | Honour `prefers-reduced-motion` |
| New in 2.2 (A/AA) | 2.4.11 focus not obscured, 2.5.7 dragging alternative, 2.5.8 target size, 3.2.6 consistent help, 3.3.7 redundant entry, 3.3.8 accessible authentication |

Contrast formula: `(L1 + 0.05) / (L2 + 0.05)` with relative luminance `L = 0.2126 R + 0.7152 G + 0.0722 B` on linearised sRGB (`c <= 0.04045 ? c/12.92 : ((c+0.055)/1.055)^2.4`).

## 2. Platform sizes [Apple HIG, Android, tier A]

| Platform | Default control | Minimum | Spacing |
| --- | --- | --- | --- |
| iOS / iPadOS | 44x44 pt | 28x28 pt | ~12 pt around bezeled, ~24 pt around unbezeled |
| macOS | 28x28 pt | 20x20 pt | same |
| Android / Material | 48x48 dp (~9 mm) | | 8 dp between targets |

Apple text: iOS body 17 pt (min 11), macOS body 13 pt (min 10). Apple's contrast guidance uses the same WCAG AA values. Apple has 11 text styles (Large Title, Title 1 to 3, Headline, Body, Callout, Subheadline, Footnote, Caption 1 and 2).

## 3. Material 3 spacing [M3-SPACING]

8dp base (`space100` = 8dp). Tokens (dp): 0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 32, 36, 40, 48, 56, 64, 72. Main units are multiples of 8; 2, 4, 6, 10 are nested units. Padding and gaps on the parent, not margins on children. System spacing tokens are published for Jetpack Compose only.

## 4. Material 3 shape [M3-SHAPE]

| Step | Radius |
| --- | --- |
| None | 0 |
| Extra small | 4dp |
| Small | 8dp |
| Medium | 12dp (cards, small FAB) |
| Large | 16dp |
| Large increased | 20dp |
| Extra large | 28dp |
| Extra large increased | 32dp |
| Extra extra large | 48dp |
| Full | fully rounded (buttons by default) |

Optical roundness for nested shapes: inner radius = outer radius - padding (example 48 - 14 = 34). Avoid large or full corners on information-dense containers.

## 5. Material 3 type scale [M3-TYPE]

Major Second ratio (1.125), key size 14. 15 baseline styles (plus 15 emphasized with heavier weight since the Expressive update). No product uses all; Material's example keeps 5. Web unit: rem = sp / 16.

| Style | Size | Line height | Weight | Tracking |
| --- | --- | --- | --- | --- |
| display-large | 3.5625rem (57) | 4rem (64) | 400 | -0.015625rem |
| display-medium | 2.8125rem (45) | 3.25rem (52) | 400 | 0 |
| display-small | 2.25rem (36) | 2.75rem (44) | 400 | 0 |
| headline-large | 2rem (32) | 2.5rem (40) | 400 | 0 |
| headline-medium | 1.75rem (28) | 2.25rem (36) | 400 | 0 |
| headline-small | 1.5rem (24) | 2rem (32) | 400 | 0 |
| title-large | 1.375rem (22) | 1.75rem (28) | 400 | 0 |
| title-medium | 1rem (16) | 1.5rem (24) | 500 | 0.009375rem |
| title-small | 0.875rem (14) | 1.25rem (20) | 500 | 0.00625rem |
| body-large | 1rem (16) | 1.5rem (24) | 400 | 0.03125rem |
| body-medium | 0.875rem (14) | 1.25rem (20) | 400 | 0.015625rem |
| body-small | 0.75rem (12) | 1rem (16) | 400 | 0.025rem |
| label-large | 0.875rem (14) | 1.25rem (20) | 500 | 0.00625rem |
| label-medium | 0.75rem (12) | 1rem (16) | 500 | 0.03125rem |
| label-small | 0.6875rem (11) | 1rem (16) | 500 | 0.03125rem |

Line height by script: Material groups scripts by height (small: Latin, Cyrillic, Greek, Hebrew; medium, about 7% taller: Japanese, Chinese, Korean, Arabic, Thai, Vietnamese, Hindi and most others; large, about 30%: Burmese, Telugu; extra large, about 100%: Nastaliq).

GUIdance default subset (judgment, body 16px for the web): headline 32/40, title 22/28, body 16/24, body-sm 14/20, label 12/16 (500).

## 6. Material 3 motion [M3-MOTION]

Durations: short 50, 100, 150, 200 ms; medium 250, 300, 350, 400 ms; long 450, 500, 550, 600 ms; extra long 700, 800, 900, 1000 ms. Examples: selection controls 200 ms standard; FAB to sheet 400 ms emphasized; card to full screen 500 ms emphasized; ambient carousel 1000 ms.

| Easing | CSS |
| --- | --- |
| standard | `cubic-bezier(0.2, 0, 0, 1)` |
| standard decelerate | `cubic-bezier(0, 0, 0, 1)` |
| standard accelerate | `cubic-bezier(0.3, 0, 1, 1)` |
| emphasized decelerate (enter) | `cubic-bezier(0.05, 0.7, 0.1, 1)` |
| emphasized accelerate (exit) | `cubic-bezier(0.3, 0, 0.8, 0.15)` |
| emphasized | no CSS equivalent; use standard |

M3 Expressive components now use spring physics; durations and easing still apply to transitions but are no longer maintained.

## 7. Material 3 colour [M3-COLOR]

**System.** One source colour gives five key colours, each a tonal palette (tone 0 to 100). Tones are assigned to 26 standard roles in light and dark. Tone is CIE L*, so contrast between two roles depends only on their tones: tones 50 and 98 give 3:1; tones 30 and 98 give 7:1. Material's colour space is HCT (CAM16 hue and chroma, L* tone).

**Roles.** Primary (most prominent: FAB, high-emphasis buttons, active states), secondary (less prominent: filter chips, tonal buttons), tertiary (contrasting accents: badges, some inputs), error, surface (backgrounds, containers), outline. "On" roles are text and icons on their pair; "container" roles are fills, never text. Outline is for important boundaries (text field borders: needs 3:1); outline variant is decorative (dividers), never the only boundary of a target. Error stays static under dynamic colour but adapts to light and dark.

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

Vibrant rotations, breakpoints [0, 41, 61, 101, 131, 181, 251, 301, 360]: secondary [18, 15, 10, 12, 15, 18, 15, 12, 12], tertiary [35, 30, 20, 25, 30, 35, 30, 25, 25]. Expressive breakpoints [0, 21, 51, 121, 151, 191, 271, 321, 360]: secondary [45, 95, 45, 20, 45, 90, 45, 45, 45], tertiary [120, 120, 20, 45, 20, 15, 20, 120, 120]. Expressive moves primary away from the brand hue: use it only when there is no brand colour.

**GUIdance additions (judgment).** Success (green) and warning (amber) use the same tones as error. Chart colours: five hues from the primary hue (+0, +150, +60, +250, +310), tone 48 in light and 72 in dark, which clears 3:1 on every surface. The palette tables compute hue and chroma in OKLCH (CIE LCh turns blues purple as they lighten) and matches tone exactly in L*, so contrast holds; colours can differ slightly from Material's own HCT tools.

## 8. Research numbers [tier A and B]

| What | Value | Source |
| --- | --- | --- |
| Response limits | 0.1 s instant; 1 s flow kept; over 1 s show progress; over 10 s percent-done and cancel | NNG-RESPONSE |
| Loading indicator | nothing under 1 s; skeleton for page loads of about 2 to 10 s; spinner for one module; progress bar for processes or over 10 s | NNG-SKELETON |
| Line length | 50 to 75 characters, 80 max (40 CJK) | BAY-LINE |
| `ch` unit | width of "0", wider than an average letter: 65ch renders about 81 to 85 characters in Arial (GUIdance test). Use 55 to 60ch and measure | judgment, measured |
| Form layout | single column; one logical unit may share a row | BAY-COLUMNS |
| Inline validation | long forms: on blur, clear errors as soon as fixed (Baymard); short or one-question-per-page: on submit only (GOV.UK) | BAY-INLINE, GOVUK-VALID |
| Qualitative sample | 5 users find problems; quantitative claims need 40+ | NNG-SAMPLE |
| Baymard scale | 200,000+ research hours, 4,400+ moderated sessions on 240+ sites, 1,000+ people per quantitative study | BAY-METHOD |

## 9. Stack formats (for writing tokens)

**Tailwind v4** [TW-THEME, TW-DARK]
- Tokens live in a top-level `@theme { }` block (not nested in selectors or media queries). Namespaces: `--color-*`, `--font-*`, `--text-*` (plus `--text-*--line-height`, `--text-*--letter-spacing`, `--text-*--font-weight`), `--font-weight-*`, `--tracking-*`, `--leading-*`, `--breakpoint-*`, `--container-*`, `--spacing-*`, `--radius-*`, `--shadow-*`, `--inset-shadow-*`, `--drop-shadow-*`, `--blur-*`, `--perspective-*`, `--aspect-*`, `--ease-*`, `--animate-*`. No duration namespace.
- `--spacing: 0.25rem` is the default base (p-1 = 4px, p-2 = 8px): already on the Material grid.
- Utilities reference the variable (`bg-primary` is `background-color: var(--color-primary)`), so dark values are plain CSS overrides of the same variables under a selector or media query, outside `@theme`.
- `@theme inline` makes utilities use the value instead of the variable (for tokens that reference other variables). `@theme static` emits all variables.
- Dark variant: follows `prefers-color-scheme` by default. Data attribute: `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));`. Class: `@custom-variant dark (&:where(.dark, .dark *));`.

**Tailwind v3**: tokens in a preset (`presets: [require('./guidance.preset.js')]`), values under `theme.extend` so defaults stay; CSS variables injected with a plugin calling `addBase`.

**MUI** [MUI-DARK, MUI-CSSVARS]
- Theme keys: `spacing` (number, multiplied: `theme.spacing(2)` = 16px at 8), `shape.borderRadius` (one number for all components), `typography` (h1 to h6, subtitle1/2, body1/2, caption, overline, button), `transitions.duration` (shortest, shorter, short, standard, complex, enteringScreen, leavingScreen) and `transitions.easing` (easeInOut, easeOut, easeIn, sharp).
- Colours: `colorSchemes: { light: { palette }, dark: { palette } }` (MUI v6+; light is on by default). If `palette` and `colorSchemes` are both given, `palette` wins. `palette` needs literal colours (MUI computes shades; `var()` breaks it).
- `cssVariables: { colorSchemeSelector: 'class' | 'data' | '.mode-%s' | '[data-%s]' }`; `useColorScheme()` reads and sets the mode (`mode` is `undefined` on first render).
- Merge with `deepmerge` from `@mui/utils`.

**Sass**: `@use "./guidance" as *;` for `$` variables; the same values as CSS custom properties for runtime theming.

**shadcn/ui** [SHADCN-THEME]
- Colour variables on `:root` and `.dark`: `--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--destructive`, `--border`, `--input`, `--ring`, `--chart-1` to `--chart-5`, `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-accent`, `--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring`.
- The default values are `oklch()`, but any CSS colour works: Tailwind v4 maps them in `@theme inline` (`--color-primary: var(--primary);`). Dark: `@custom-variant dark (&:is(.dark *));` with `.dark` on `<html>`.
- Radius: one `--radius` (default 0.625rem = 10px) and derived steps: sm = x0.6, md = x0.8, lg = x1, xl = x1.4, 2xl = x1.8, 3xl = x2.2, 4xl = x2.6. A 0.75rem base gives 7.2, 9.6, 12, 16.8px, so steps land off the 4px grid; set the steps explicitly instead (see formats/shadcn.md).
- New colours: add the variable on `:root` and `.dark`, then `--color-<name>: var(--<name>);` in `@theme inline`.

**Bootstrap 5.3** [BS-SASS, BS-COLOR-MODES]
- Sass: overrides go after `functions` and before `variables` (Option B), or before the single `bootstrap` import (Option A). Every variable is `!default`. Dark-only values (`$body-bg-dark`, `$body-color-dark`, `$border-color-dark`, `$link-color-dark`, `$primary-text-emphasis-dark`, `$primary-bg-subtle-dark`, ...) go after `variables-dark` and before `maps` and `root`.
- Theme colours: set `$primary`, `$secondary`, `$success`, `$info`, `$warning`, `$danger`, `$light`, `$dark`; `primary`, `success` and `danger` must exist. Button text comes from `color-contrast()` with `$min-contrast-ratio: 4.5`. Theme colours do not change in dark mode; only the `-dark` variables do.
- Defaults that break the rules: `$body-tertiary-color` is the body colour at 50% opacity (fails 4.5:1); inputs use `$border-color` (`$gray-300`, about 1.3:1 on white, fails 1.4.11); `$focus-ring-color` is primary at 25% opacity; `$border-radius` .375rem (6px) and `-xxl` 2rem are off the Material scale; shadows are off (`$enable-shadows: false`).
- Spacing map `$spacers`: 0, 4, 8, 16, 24, 48px (`$spacer` 1rem): already on the Material grid. Radius: `$border-radius`, `-sm`, `-lg`, `-xl`, `-xxl`, `-pill`. Shadows: `$box-shadow`, `-sm`, `-lg`, `-inset`. Type: `$font-size-base` 1rem, `$h1-font-size` to `$h6-font-size` (2.5, 2, 1.75, 1.5, 1.25, 1 x base).
- Dark mode: `data-bs-theme="dark"` on `<html>` (or on one component). `$color-mode-type: media-query` follows the OS instead, but disables per-component themes.
- CSS-only Bootstrap (CDN, no Sass): `--bs-body-bg`, `--bs-body-color`, `--bs-secondary-color`, `--bs-border-color`, `--bs-link-color`... can be overridden under `[data-bs-theme=light]` and `[data-bs-theme=dark]`, but buttons read their own `--bs-btn-*` variables set per class (`.btn-primary`), so recolour those too.

## 10. Working with a brand colour (no code needed)

**Find the table row: HSL hue.** For a hex `#rrggbb`:
1. r, g, b = each pair / 255. max = largest, min = smallest, d = max - min.
2. If d is 0, or saturation is under 12%, use the `grey` row. Saturation = d / (1 - |max + min - 1|).
3. Hue: if max is r: 60 x (((g - b) / d) mod 6); if max is g: 60 x ((b - r) / d + 2); if max is b: 60 x ((r - g) / d + 4). Add 360 if negative.
4. Round to the nearest multiple of 5 (357.5 and above becomes 0). That is the row: `h000` to `h355`.

Example: `#e8590c` gives r 0.910, g 0.349, b 0.047; max r, d 0.863; hue 60 x ((0.349 - 0.047) / 0.863) = 21.0, row `h020`.

**Exact brand colour (fidelity): which role it takes.** Start from the `tonal_spot` row, then decide with the brand's relative luminance:
1. Each channel c (0..255): v = c / 255; linear = v / 12.92 if v <= 0.04045, else ((v + 0.055) / 1.055) ^ 2.4.
2. L = 0.2126 R + 0.7152 G + 0.0722 B (linear values).
3. If L <= 0.13: the brand becomes light `primary` and `on-primary` is `#ffffff` (it then reads at 4.5:1 on every light surface and under white text).
4. Otherwise it becomes light `primary-container`, with `on-primary-container` = `#ffffff` if L <= 0.179, else `#000000`.
5. Dark theme keeps the row's values. If L is within 0.005 of a threshold, trust the label the preview page shows ("exact brand as ...").

Example: `#e8590c` has L of about 0.24, so it becomes `primary-container` with `#000000` text.

**Contrast of any two colours by hand** (for existing project colours): compute L for both as above, then (lighter + 0.05) / (darker + 0.05). Show the working and round down. When a browser is available, the snippets in `browser-checks.md` measure rendered pages exactly.

## 11. Elevation and shadows [M3-ELEVATION]

| Level | Height | Key shadow (30% opacity) | Ambient shadow (15% opacity) | Typical use |
| --- | --- | --- | --- | --- |
| 0 | 0dp | none | none | Flat surfaces, filled and outlined cards |
| 1 | 1dp | 0 1px 2px 0 | 0 1px 3px 1px | Elevated cards, search bars, resting buttons with a shadow |
| 2 | 3dp | 0 1px 2px 0 | 0 2px 6px 2px | Menus, top app bar on scroll, hovered level 1 |
| 3 | 6dp | 0 1px 3px 0 | 0 4px 8px 3px | Dialogs, floating action buttons, popovers |
| 4 | 8dp | 0 2px 3px 0 | 0 6px 10px 4px | Hover state of level 3 only |
| 5 | 12dp | 0 4px 4px 0 | 0 8px 12px 6px | Dragged items only |

- Shadow colour: the shadow role (black in both themes). CSS: `box-shadow: 0 1px 2px 0 rgb(0 0 0 / .3), 0 1px 3px 1px rgb(0 0 0 / .15);` (level 1).
- Resting states use levels 0 to 3. Levels 4 and 5 are for hover and drag.
- In Material 3, most separation comes from tonal surfaces (`surface-container-*`), not shadows. In dark themes shadows barely show, so a raised surface also steps up one surface-container tone.
- Judgment (GUIdance): a surface is separated by one cue, a border or a shadow or a tone change, not a border plus a strong shadow. Use at most three shadow levels on one screen.

## 12. Icons [M3-ICONS, APPLE-TYPE]

- Material Symbols: 24px is the default size; optical sizes run from 20 to 48dp (20, 24, 40, 48). 20 fits dense UI and 14px text, 24 sits beside 16px body text and in buttons, 40 and 48 are for large display use.
- Weight 100 to 700 should match the text weight next to it; grade adjusts weight finely (about -25 for light icons on dark backgrounds).
- Apple SF Symbols scale with the text style they sit beside (small, medium, large), so an icon's size follows its label rather than a fixed pixel value.
- Judgment (GUIdance): one icon set per product, one style (outlined or filled; filled marks the selected state), at most two sizes per screen (for example 20 inline and 24 in controls), centred on the text line they sit on. An icon button's tap area is still 44 to 48px even if the glyph is 24.

## 13. Window size classes and breakpoints [M3-WINDOW]

| Class | Width | Typical layout |
| --- | --- | --- |
| Compact | under 600dp | Phone portrait: one pane, bottom navigation |
| Medium | 600 to 839dp | Tablet portrait, foldables: one pane (two possible), navigation rail |
| Expanded | 840 to 1199dp | Tablet landscape, small laptops: two panes, navigation rail |
| Large | 1200 to 1599dp | Desktop: two panes, rail or drawer |
| Extra-large | 1600dp and up | Large desktop: up to three panes |

Height classes: compact under 480dp, medium 480 to 899, expanded 900 and up.

Check layouts on both sides of each edge, where they break: 599 and 600, 839 and 840, 1199 and 1200. `/guidance inspect` uses 320 (WCAG reflow), 390 (phone), 599, 768 (tablet), 839, 1199 and 1440.
