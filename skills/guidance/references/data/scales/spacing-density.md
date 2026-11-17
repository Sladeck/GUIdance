# Spacing [M3-SPACING]

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
