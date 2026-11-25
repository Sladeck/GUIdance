# What GUIdance adds to your project

Design tokens: named values your whole UI uses instead of numbers picked by eye. Claude writes them in your stack's own format (CSS variables, a Tailwind theme, an MUI theme, Sass variables...) and uses them from then on.

| Tokens | What you get | Based on |
| --- | --- | --- |
| **Colours** | A colour set built from your brand colour: 37 colour roles in light and dark (see below), plus chart colours. Every text and boundary pair is checked against its contrast threshold before it is written | Material 3 roles, WCAG 2.2 |
| **Spacing** | 18 steps on an 8px grid: 0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 32 ... 72px | Material 3 |
| **Density** | Spacing roles (field, card, group, section, page gutter, control height...) in three presets: compact, default, comfortable | Material 3 density, SAP Fiori, AWS Cloudscape; preset values are judgment |
| **Corner radius** | 0, 4, 8, 12, 16, 20, 28, 32, 48px and full (pills) | Material 3 |
| **Shape** | Radius roles (button, field, chip, card, overlay) in three presets: sharp, soft, round | Material 3 shape; preset values are judgment |
| **Elevation** | 6 shadow levels, from flat to dragged | Material 3 |
| **Type** | Headline 32, title 22, body 16, small body 14, label 12px, with line heights and weights | Material 3, Apple |
| **Motion** | Durations from 50 to 600ms, 5 easing curves, shorter versions for reduced motion | Material 3, WCAG |
| **Targets and focus** | 24px minimum and 44px touch target sizes, focus ring width and offset, readable line length | WCAG 2.2, Apple |

## Colour roles

A colour role is a colour named after its job, not its look: your code says `--color-primary` or `--color-on-surface` instead of `#5a3ee4`. Change a role's value and every button, background and text colour that uses it follows, in light and dark.

| Group | Roles | Count |
| --- | --- | --- |
| **Brand colours:** primary, secondary, tertiary | Each comes as four: the colour (a filled button), *on*-colour (the text on it), a soft *container* version (a tinted card or chip) and *on-container* (the text on that) | 12 |
| **Status:** error, success, warning | The same four each | 12 |
| **Backgrounds** | `surface` plus 5 container levels, from the page to raised panels | 6 |
| **Text on backgrounds** | `on-surface` (main text), `on-surface-variant` (secondary text) | 2 |
| **Lines** | `outline` (field borders, 3:1 contrast), `outline-variant` (dividers) | 2 |
| **Inverse** | Dark-on-light flips for things like snackbars | 3 |

## Example

A few of the tokens it writes:

```css
--space-200: 16px;      --radius-md: 12px;     --text-body: 1rem;
--space-300: 24px;      --radius-lg: 16px;     --duration-short-4: 200ms;
--color-primary: #5a3ee4;           --color-on-primary: #ffffff;
--elevation-1: 0 1px 2px 0 rgb(0 0 0 / 0.3), 0 1px 3px 1px rgb(0 0 0 / 0.15);
```
