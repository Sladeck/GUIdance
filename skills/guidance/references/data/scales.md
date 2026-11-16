# Scales: spacing, density, shape and shape presets, type, motion, elevation, icons, breakpoints

Verified Material 3 values (plus GUIdance judgment where marked); use them directly. Verified 2026-11-02 to 2026-11-15. Keys match `sources.md`.

## Spacing [M3-SPACING]

8dp base (`space100` = 8dp). Tokens (dp): 0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 32, 36, 40, 48, 56, 64, 72. Main units are multiples of 8; 2, 4, 6, 10 are nested units. Padding and gaps on the parent, not margins on children. System spacing tokens are published for Jetpack Compose only.

## Density [M3-DENSITY, FIORI-DENSITY, CLOUDSCAPE-DENSITY]

Three presets. Each maps the same spacing roles to steps of the scale above, so nothing goes off scale. One preset for the product, which a page may override (rule 4.7); `/guidance spacing` changes either.

| Role | Use | compact | default | comfortable |
| --- | --- | --- | --- | --- |
| `space-inline` | icon to label, label to its field, chip and badge internals | 4 | 8 | 8 |
| `space-control` | horizontal padding of buttons and inputs | 12 | 16 | 20 |
| `space-stack` | between stacked items of one kind: list rows that are cards, menu items, chips | 4 | 8 | 12 |
| `space-field` | between stacked form fields | 12 | 16 | 24 |
| `space-card` | padding inside cards and panels | 16 | 24 | 32 |
| `space-group` | between groups or cards | 16 | 24 | 32 |
| `space-section` | between sections | 24 | 32 | 48 |
| `space-page` | page gutter at desktop width | 16 | 24 | 32 |
| `control-height`, `row-height` | buttons, inputs, selects; table and list rows | 32 | 40 | 48 |
| Use for | | data-heavy screens used with a mouse and keyboard: dashboards, tables, admin and financial tools | most products | content, marketing, onboarding, a focused message, touch-first consumer apps |

Values in CSS px. Roles point at scale tokens (`--space-group: var(--space-300)`), in the project's own naming.

- Sourced: every step is on the Material scale [M3-SPACING]. Density is applied in steps of 4dp on padding or height, numbered 0, -1, -2, -3 [M3-DENSITY]; the presets' heights are 8px apart, two such steps. Compact rows of 32px match SAP Fiori's compact mode, whose cozy touch area is 44px [FIORI-DENSITY]. Which products suit high or low density [M3-DENSITY, FIORI-DENSITY, CLOUDSCAPE-DENSITY].
- No source sets a minimum gap: the only requirement is the order, tighter inside a group than between groups (rule 4.2), so stack stays under field, field under group, group under section. A project may point a role at a smaller step as long as that order holds.
- Tuning: a project may give single roles another value of the step list 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72 (the scale from 4 up without 6, 10, 14 and 36); the two heights move by 4px, Material's density step [M3-DENSITY], and need not be on the spacing scale. Recorded with the preset, the values and any risk the user accepted (rule 4.7): `density: default, tuned: section 48, stack 4; accepted: compact dialogs`. Tuned roles keep their values when the preset changes, unless the user resets them. Which roles to tune for which product is judgment.
- Judgment: which step each role takes, a default height of 40px, and the whole comfortable column. No source publishes a preset above its default. Card and group values in the default column are rule 4.6's. Cloudscape names its two levels comfortable (its default) and compact: its comfortable is this table's default.
- Fixed in every preset: font sizes and line heights (Fiori: in compact "the font size stays the same"), the scale, radius and the 24px target floor. By default, also at least `target-touch` for control and row heights on touch layouts: under 600px wide (Material's first breakpoint) or a coarse pointer, for example `min-height: max(var(--control-height), var(--target-touch))` inside `@media (max-width: 599px), (pointer: coarse)`.
- Phone widths (under 600px): page gutter 16 in every preset and `space-card` at 12, 16, 24, which gives rule 4.6's mobile values at default. The other roles keep their values, so field stays under group. This is responsive layout, not a density change (judgment).
- By default, dialogs, menus, popovers and snackbars keep the default column in a compact product or page (rule 4.7).
- The two defaults above are risks the user may accept in `/guidance spacing`; the 24px floor is not.

## Shape [M3-SHAPE]

None 0 · extra small 4dp · small 8dp · medium 12dp (cards, small FAB) · large 16dp · large increased 20dp · extra large 28dp · extra large increased 32dp · extra extra large 48dp · full (buttons by default).

Nested shapes (optical roundness): inner = outer - padding (48 - 14 = 34). No large or full corners on information-dense containers.

**Shape presets.** Each maps the same radius roles to steps of the scale above. One preset for the product (rule 5.5); `/guidance shape` changes it.

| Role | Use | sharp | soft | round |
| --- | --- | --- | --- | --- |
| `radius-button` | buttons | 4 | 8 | full |
| `radius-field` | inputs, selects, text boxes | 4 | 8 | 12 |
| `radius-chip` | chips, tags, badges | 4 | 8 | full |
| `radius-card` | cards, panels; menus, popovers, tooltips | 4 | 8 | 12 |
| `radius-overlay` | dialogs, sheets | 8 | 12 | 28 |
| Use for | | tools, data, finance, developer and admin products; a precise, serious feel | most products | consumer, touch-first and playful products; a friendly feel |

Values in CSS px. Roles point at scale tokens (`--radius-card: var(--radius-sm)`), in the project's own naming.

- Sourced [M3-SHAPE]: every value is on the scale. Round follows Material's own defaults where its shape page states them: buttons full, cards medium (12). Remapping a component to another step is allowed: "by default, buttons are mapped to the full corner radius shape style. If your product needs a less rounded shape, remap the token to another style in the shape scale, such as small or medium." Products should use their shape styles consistently, with customization for hero moments or custom components.
- Judgment: the sharp and soft columns, the field, chip and overlay values of round, and which product suits which preset. No study in the sources measures corner radius.
- Tuning: a project may give single roles another value of the scale. Recorded with the preset, the values and any risk the user accepted (rule 5.5): `shape: soft, tuned: button full, card 16; accepted: 16px corners on dense cards`. Tuned roles keep their values when the preset changes, unless the user resets them.
- Menus, popovers and tooltips sit with cards, not dialogs: they are small or hold lists, so past 12 they are a risk to confirm (judgment). A list item or thumbnail close to a card's edge takes the nested value (inner = outer - padding), not the card role; further in, it is never rounder than the card.
- Circles (avatars, round icon buttons) are not part of the presets.

## Type [M3-TYPE]

Major Second ratio (1.125), key size 14. 15 baseline styles (plus 15 emphasized, heavier, since the Expressive update); no product uses all, Material's example keeps 5. Web: rem = sp / 16.

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

Line height by script (Material groups): small (Latin, Cyrillic, Greek, Hebrew); medium, about 7% taller (Japanese, Chinese, Korean, Arabic, Thai, Vietnamese, Hindi and most others); large, about 30% (Burmese, Telugu); extra large, about 100% (Nastaliq).

GUIdance default subset (judgment, web body 16px): headline 32/40, title 22/28, body 16/24, body-sm 14/20, label 12/16 (500).

## Motion [M3-MOTION]

Durations (ms): short 50, 100, 150, 200; medium 250, 300, 350, 400; long 450, 500, 550, 600; extra long 700, 800, 900, 1000. Examples: selection controls 200 ms standard; FAB to sheet 400 ms emphasized; card to full screen 500 ms emphasized; ambient carousel 1000 ms.

Easing: standard `cubic-bezier(0.2, 0, 0, 1)`; standard decelerate `cubic-bezier(0, 0, 0, 1)`; standard accelerate `cubic-bezier(0.3, 0, 1, 1)`; emphasized decelerate (enter) `cubic-bezier(0.05, 0.7, 0.1, 1)`; emphasized accelerate (exit) `cubic-bezier(0.3, 0, 0.8, 0.15)`; emphasized: no CSS equivalent, use standard.

M3 Expressive components now use spring physics; durations and easing still apply to transitions but are no longer maintained.

## Elevation [M3-ELEVATION]

| Level | Height | Key shadow (30% opacity) | Ambient shadow (15% opacity) | Typical use |
| --- | --- | --- | --- | --- |
| 0 | 0dp | none | none | Flat surfaces, filled and outlined cards |
| 1 | 1dp | 0 1px 2px 0 | 0 1px 3px 1px | Elevated cards, search bars, resting buttons with a shadow |
| 2 | 3dp | 0 1px 2px 0 | 0 2px 6px 2px | Menus, top app bar on scroll, hovered level 1 |
| 3 | 6dp | 0 1px 3px 0 | 0 4px 8px 3px | Dialogs, floating action buttons, popovers |
| 4 | 8dp | 0 2px 3px 0 | 0 6px 10px 4px | Hover state of level 3 only |
| 5 | 12dp | 0 4px 4px 0 | 0 8px 12px 6px | Dragged items only |

- Shadow colour: the shadow role (black in both themes). Level 1 in CSS: `box-shadow: 0 1px 2px 0 rgb(0 0 0 / .3), 0 1px 3px 1px rgb(0 0 0 / .15);`. Rest at 0 to 3; 4 and 5 for hover and drag.
- Material separates mostly with tonal surfaces (`surface-container-*`). Dark themes barely show shadows: a raised surface also steps up one surface-container tone.
- Judgment: one cue per surface (border, shadow or tone), never a border plus a strong shadow; at most three shadow levels per screen.

## Icons [M3-ICONS, APPLE-TYPE]

- Material Symbols: default 24px; optical sizes 20 to 48dp (20, 24, 40, 48). 20 for dense UI and 14px text, 24 beside 16px body and in buttons, 40 and 48 for large display.
- Weight 100 to 700 matches the adjacent text; grade fine-tunes it (about -25 for light icons on dark backgrounds).
- Apple SF Symbols scale with their text style (small, medium, large): size follows the label, not a fixed pixel value.
- Judgment: one set, one style (outlined; filled marks selection), at most two sizes per screen (for example 20 inline, 24 in controls), centred on the text line. Icon buttons keep a 44 to 48px tap area even with a 24 glyph.

## Breakpoints [M3-WINDOW]

| Class | Width | Typical layout |
| --- | --- | --- |
| Compact | under 600dp | Phone portrait: one pane, bottom navigation |
| Medium | 600 to 839dp | Tablet portrait, foldables: one pane (two possible), navigation rail |
| Expanded | 840 to 1199dp | Tablet landscape, small laptops: two panes, navigation rail |
| Large | 1200 to 1599dp | Desktop: two panes, rail or drawer |
| Extra-large | 1600dp and up | Large desktop: up to three panes |

Height classes: compact under 480dp, medium 480 to 899, expanded 900 and up.

Layouts break right before they switch: test both sides of each edge (599 and 600, 839 and 840, 1199 and 1200). `/guidance review` reads the code for 320 (WCAG reflow), 390, 768 and 1440, and for both sides of the page's own media queries, falling back to these Material edges when the page has none.

Navigation by window size [M3-NAVBAR, M3-NAVRAIL]: compact windows use a navigation bar (three to five destinations, each with icon and label) or a modal rail behind a menu icon, never a standard rail; medium to extra-large windows use a navigation rail, collapsed or expanded, and a medium window with few destinations may keep the bar. Apple: tab bar for top-level sections, sidebar where there is room, in general at most two levels in it [APPLE-TABBAR, APPLE-SIDEBAR] (rule 13.9).
