# Scales: spacing, shape, type, motion, elevation, icons, breakpoints

Verified Material 3 values (plus GUIdance judgment where marked); use them directly. Verified 2026-11-02 to 2026-11-15. Keys match `sources.md`.

## Spacing [M3-SPACING]

8dp base (`space100` = 8dp). Tokens (dp): 0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 32, 36, 40, 48, 56, 64, 72. Main units are multiples of 8; 2, 4, 6, 10 are nested units. Padding and gaps on the parent, not margins on children. System spacing tokens are published for Jetpack Compose only.

## Shape [M3-SHAPE]

None 0 · extra small 4dp · small 8dp · medium 12dp (cards, small FAB) · large 16dp · large increased 20dp · extra large 28dp · extra large increased 32dp · extra extra large 48dp · full (buttons by default).

Nested shapes (optical roundness): inner = outer - padding (48 - 14 = 34). No large or full corners on information-dense containers.

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

Layouts break right before they switch: test both sides of each edge (599 and 600, 839 and 840, 1199 and 1200). `/guidance review` tests 320 (WCAG reflow), 390, 768 and 1440, plus both sides of the page's own breakpoints, falling back to these Material edges when the page has none.
