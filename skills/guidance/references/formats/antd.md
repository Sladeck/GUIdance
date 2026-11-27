# Token format: Ant Design (antd) v6

**Contents:** file to create, wiring, filling it in, how antd draws colour, checking the rendered colours, known gaps; then the template: the theme for light and dark (colours, focus, type, density, radius, motion, per-component values), the GUIdance roles, and the roles antd has no token for.

Written against antd 6.7.2 [ANTD-SOURCE]. On v5, check each token in that version's theme documentation before writing it.

**File to create:** guidanceTheme.ts (or .js) next to the file that renders `ConfigProvider`. Never overwrite an existing file: if it exists, ask, or merge only what is missing.

**Wiring:** `<ConfigProvider theme={guidanceTheme({ mode, reducedMotion, touch })}>` at the root.
- `mode`: `'light'` or `'dark'`, from the project's own dark-mode switch.
- `reducedMotion`: the `(prefers-reduced-motion: reduce)` media query; `touch`: `(max-width: 599px), (pointer: coarse)` (rule 2.2). Read both on the client and update them on the query's `change` event. `window` does not exist during server rendering, so start both at `false` there.

If the project already passes a `theme`, merge key by key:
- `token`: spread the project's after GUIdance's to keep its values, or before to let GUIdance win.
- `components`: per component, never as one object. Where both name a component (`Modal`, `Button`...), spread the project's object over GUIdance's (or the reverse), so neither loses its keys.
- `algorithm`: keep the project's, with `darkAlgorithm` in dark mode. If it holds `compactAlgorithm`, say so and ask to remove it (below).
- `cssVar`, `hashed`, `inherit`, `zeroRuntime` and any other key: keep the project's.

`Modal.confirm`, `message` and `notification` called as static functions do not read the `ConfigProvider` theme and render antd's defaults [ANTD-SOURCE]. Wrap the app in antd's `<App>` inside the `ConfigProvider` and call them through `App.useApp()`, or give them the theme with `ConfigProvider.config({ holderRender: (children) => <ConfigProvider theme={...}>{children}</ConfigProvider> })`. Report static calls the project makes.

For `.js`, drop the `import type` line and the type annotations.

**Filling it in**
- `{L.role}` and `{D.role}` are the light and dark colours of that role, from the colour set built in setup (`../data/colour/building.md`). Setup computes two more kinds of colour, each by mixing channel by channel in sRGB (judgment):
  - `{X.primary-hover}` and `{X.primary-pressed}` (and the error ones): the role mixed 10% and 20% toward `{X.on-surface}`, which is darker than the role in light mode and lighter in dark mode. The mix moves away from the middle, so the role's pairs with its on-colour and with the surface both get stronger. Not toward `on-*-container`: with a brand of luminance above 0.13, light `primary-container` is the brand itself and its on-colour is white (`../data/colour/building.md`).
  - `{X.primary-tint}` and `{X.primary-tint-hover}`: the primary at 12% and 20% over `colorBgContainer`. `{X.error-tint}`, `{X.error-tint-hover}` and `{X.error-tint-pressed}`: the error at 8%, 12% and 16%. A danger filled Button keeps its label in `colorError` while hovered and pressed, and a 28% error tint measured 3.86:1 under it. These are the selected and filled backgrounds. They stay close to the surface, so the role and on-surface both read on them. `primary-container` cannot do this job: it can be a mid tone. When the user keeps their own colours, delete every colour line except the four focus lines (`colorPrimaryBorder`, `controlOutline`, `colorErrorOutline`, `colorWarningOutline`), which then point at the project's own primary, error and warning.
- Body size (rule 3.2): 16 by default, as for any web application. antd derives its type scale from it, with line height size + 8 (14, 16, 18, 22, 28, 34, 42) [ANTD-SOURCE]. Use 14 for dense admin tools and dashboards, Ant Design's own base for enterprise products [ANTD-FONT B] (12, 14, 16, 20, 24, 30, 38). Body size is chosen on its own, not by density (rule 4.7).
- Density: the `density` object holds the default preset. For compact or comfortable, take `control`, `row`, `card` and `field` from the Density presets table in `../data/scales/spacing-density.md`, and `controlSM` and `controlLG` from the comment beside them. antd reads them through the control heights, table cell padding, card padding and form item spacing. Dropdown menu items and Select, Cascader and TreeSelect options stay at the default height in every preset (rule 4.7); the navigation Menu and Tree follow the product's density at row height. antd's spacing steps (sizeUnit 4, sizeStep 4: 4, 8, 12, 16, 20, 24, 32, 48) are already on the spacing scale, so the template keeps them.
- Shape: the template holds the soft preset. For another, set each radius line to the role its comment names, from the Shape presets table in `../data/scales/shape.md`. A role at full is written `9999`.
- The preset is recorded in `design-decisions.md` (`decisions.md`), not here.
- Do not use antd's `compactAlgorithm`. It sets the control height to `controlHeight` minus 4 whatever the template says, and it drops the base font to `fontSizeSM`: 14 from 16, 12 from 14 [ANTD-SOURCE]. Density leaves font size alone (rule 4.7). The compact preset is the `density` values.
- Elevation: antd's components draw their own shadows [ANTD-SHADOW B], so the template leaves them as they are (rule 5.3, `../data/scales/elevation.md`).

**How antd draws colour, and what the template does about it**
- A few seed colours (`colorPrimary`, `colorSuccess`, `colorWarning`, `colorError`, `colorInfo`, `colorLink`) feed antd's algorithm, which derives their hover, active, background and border tints [ANTD-THEME]. Seeds cannot be overridden after the algorithm runs: antd drops them from the overrides [ANTD-SOURCE]. In light mode, the main colour of each is the seed itself. In dark mode, `darkAlgorithm` mixes each seed with a fixed #141414, so it renders a little darker than the value passed.
- antd uses `colorPrimary` and `colorError` both as text and as fills with white text or marks on them. In dark mode no single colour can do both at 4.5:1: white text needs a luminance of 0.18 or less, and text on #141414 needs 0.21 or more. The template keeps GUIdance's dark roles, a light primary that reads as text. Components that draw white on a primary, error or status fill get the matching on-colour instead: Button, Checkbox, Radio, Switch, Steps, DatePicker, Calendar, Tree, TreeSelect, Cascader, Progress, Badge, Tag, Tour, Dropdown and the dark Menu, the ones found in the 6.7.2 source [ANTD-SOURCE]. The rendered check below is what confirms them. An override inside `components` reaches both what the component draws and the component tokens antd derives from it. Tooltips, image previews, the Layout trigger and other white-on-dark text keep white.
- Focus: antd draws two kinds. Buttons and most controls take an outline of `lineWidthFocus` (3px) in `colorPrimaryBorder`. Inputs, selects, radios and pagination take a 1px border change plus a ring in `controlOutline` (2px), which is a faint tint by default. The template sets both to the primary, so every focus indicator is a solid ring (rules 12.1 and 12.6). The tint-free `controlOutline` would otherwise also draw a 2px line under primary buttons, so Button's `primaryShadow` and `dangerShadow` are turned off.
- States: antd derives hover, pressed and selected colours as tints that fail contrast (in dark mode a pressed fill reaches about 3.7:1 with its text, link hover about 2.9:1). These are derived tokens, so the template sets them: hover and pressed from the computed mixes above, and selected and filled backgrounds (`colorPrimaryBg`, `colorPrimaryBgHover`, `colorErrorBg`, `colorErrorBgFilledHover`, `colorErrorBgActive`) from the tints. `colorPrimaryBg` is also antd's selected-item background (options, tree nodes, table rows, a pressed Menu item, the finished Steps icon). The Menu's selected item keeps the primary container pair, which it draws as its own.
- `colorTextQuaternary` (black or white at 25%) draws the unchecked Switch track, the Select and DatePicker icons and disabled text: the template sets it to the outline role, which reaches 3:1. Two places use it as text: the Switch's label on its unchecked track and DatePicker and Calendar dates outside the month, which can be clicked. Those two components take `on-surface-variant` instead.

**Checking the rendered colours.** After writing the file, print what antd will render with `theme.getDesignToken(guidanceTheme({ mode: 'dark' }))` (a short Node script in the project, with antd installed), and the same for light. Then check every pair on those values (rule 1.1), not on the values passed:
- as text, against `colorBgContainer` and `colorBgElevated`: `colorPrimary`, `colorPrimaryHover`, `colorLink`, `colorLinkHover`, `colorError`, `colorWarning` (form warnings are drawn in it), `colorSuccess`;
- as fills, against the on-colour the template gives them: `colorPrimary`, `colorPrimaryHover` and `colorPrimaryActive` against on-primary; `colorError`, `colorErrorHover` and `colorErrorActive` against on-error; `colorSuccess` and `colorInfo` against on-primary (Progress);
- selected and filled: `colorPrimary` and `colorText` on `colorPrimaryBg` and `colorPrimaryBgHover`; `colorError` on `colorErrorBg`, `colorErrorBgFilledHover` and `colorErrorBgActive`; the Menu's on-primary-container on primary-container;
- the Switch label and knob (on-primary) on on-surface-variant;
- boundaries at 3:1: `colorBorder`, `colorTextQuaternary` and `colorPrimaryBorderHover` (Slider hover) against `colorBgContainer`.

If a pair fails, move that seed or mix one tone away from the colour it is read against and check again. Report the rendered values. Then open a page that shows the components in both modes and check it with `/guidance wcag` where a browser tool is available: the token check cannot see what each component pairs.

**Known gaps (judgment).** Each is a trade-off antd's structure forces, so tell the user rather than hide it:
- While pressed, a `color="primary"` Button in the `filled` or `text` variant shows its label on the primary colour: antd uses `colorPrimaryBorder` for that pressed background and for the focus outline. Visible focus wins (rule 12.1). Where those variants are used, the user may set Button's own `colorPrimaryBorder` to `{X.primary-container}`, which brings the pressed state back but turns the Button focus outline into a faint tint.
- Slider draws its track and active dots in `colorPrimaryBorder`, so they take the primary colour. Its handle would too and then look the same focused or not (measured), so the template gives the handle the outline role and its focus, hover and pressed ring a solid primary.
- Solid Tags, Badges and Ribbons with a preset colour (`color="blue"`...) keep antd's preset backgrounds; in dark mode their text is dark too. Give them a colour from the roles instead.
- A loading Switch draws its spinner in a fixed black at 65% while unchecked, with no token for it. In dark mode the knob is the dark on-primary, so the spinner is faint on it (1.44:1 computed). Where loading Switches appear, colour `.ant-switch:not(.ant-switch-checked) .ant-switch-loading-icon` with `{D.primary}` in dark mode.
- A `theme="dark"` Menu keeps antd's #001529 in both modes, so in light mode its focus ring (the light primary) fails (2.85:1 measured). Wrap such a Menu in a nested `ConfigProvider` whose `theme.components.Menu` sets `colorPrimaryBorder` to `{D.primary}`.
- `BackTop` (deprecated) ignores its component override in 6.7.2 and keeps a white icon on a light fill in dark mode (1.69:1 measured). Use `FloatButton.BackTop`, which passes with no override.
- TreeSelect's virtual list assumes rows of `controlHeightSM` + 4 and does not read `titleHeight`, so its scrollbar and scroll-to-selected can be off until the rows are measured. Pass `listItemHeight={44}` (the 40px node plus its 4px margin; 48 with `touch`) on long trees.
- The Previous and Next buttons of a primary-type Tour are ordinary antd Buttons and keep the global colours, so in dark mode they fail. Use the default Tour type in dark mode.
- Buttons inside a Modal or Drawer follow the product's control height. Rule 4.7 keeps dialogs at the default density, and antd has no per-container height, so in a compact product they are compact.
- `space-control` does not reach antd: Button and Input keep their own horizontal padding (15px and 12px plus the border). Phone card padding (rule 4.6) does not either: Card keeps `density.card` under 600px unless the project passes a smaller `bodyPadding` there.
- Table rows come out 1px taller than `row-height`: the padding formula keeps padding on whole pixels and each cell adds a 1px bottom border.

```ts
/*
GUIdance design tokens for Ant Design (antd v6; written against 6.7.2).
Sources: Ant Design font, proximity and shadow guidance; Material 3 spacing and shape scales;
WCAG 2.2 (contrast, 2.5.8, focus). Colours: built from the brand colour with GUIdance's colour
rules (every text pair 4.5:1, every boundary 3:1). antd mixes dark seed colours with #141414:
check what it renders with theme.getDesignToken(guidanceTheme({ mode: 'dark' })).
Edit values freely; keep the names.

  <ConfigProvider theme={guidanceTheme({ mode, reducedMotion, touch })}>

This changes control heights, body size, corner radius, padding and several text, border and
focus colours app-wide: review the diff before shipping.
*/
import { theme } from 'antd';
import type { ThemeConfig } from 'antd';

type Mode = 'light' | 'dark';

const palette = {
  light: {
    primary: '{L.primary}', onPrimary: '{L.on-primary}', tertiary: '{L.tertiary}',
    error: '{L.error}', onError: '{L.on-error}', success: '{L.success}', warning: '{L.warning}',
    onSurface: '{L.on-surface}', onSurfaceVariant: '{L.on-surface-variant}',
    surface: '{L.surface}', container: '{L.surface-container-lowest}', elevated: '{L.surface-container-lowest}',
    outline: '{L.outline}', outlineVariant: '{L.outline-variant}',
    inverseSurface: '{L.inverse-surface}', inverseOnSurface: '{L.inverse-on-surface}',
    primaryContainer: '{L.primary-container}', onPrimaryContainer: '{L.on-primary-container}',
    primaryHover: '{L.primary-hover}', primaryPressed: '{L.primary-pressed}',
    errorHover: '{L.error-hover}', errorPressed: '{L.error-pressed}',
    primaryTint: '{L.primary-tint}', primaryTintHover: '{L.primary-tint-hover}',
    errorTint: '{L.error-tint}', errorTintHover: '{L.error-tint-hover}', errorTintPressed: '{L.error-tint-pressed}',
    menuDarkError: '{D.error}', // a theme="dark" Menu is dark in both modes
  },
  dark: {
    primary: '{D.primary}', onPrimary: '{D.on-primary}', tertiary: '{D.tertiary}',
    error: '{D.error}', onError: '{D.on-error}', success: '{D.success}', warning: '{D.warning}',
    onSurface: '{D.on-surface}', onSurfaceVariant: '{D.on-surface-variant}',
    surface: '{D.surface}', container: '{D.surface-container-low}', elevated: '{D.surface-container-high}', // popups sit lighter in dark
    outline: '{D.outline}', outlineVariant: '{D.outline-variant}',
    inverseSurface: '{D.inverse-surface}', inverseOnSurface: '{D.inverse-on-surface}',
    primaryContainer: '{D.primary-container}', onPrimaryContainer: '{D.on-primary-container}',
    primaryHover: '{D.primary-hover}', primaryPressed: '{D.primary-pressed}',
    errorHover: '{D.error-hover}', errorPressed: '{D.error-pressed}',
    primaryTint: '{D.primary-tint}', primaryTintHover: '{D.primary-tint-hover}',
    errorTint: '{D.error-tint}', errorTintHover: '{D.error-tint-hover}', errorTintPressed: '{D.error-tint-pressed}',
    menuDarkError: '{D.error}',
  },
} as const;

// Type (rule 3.2): 16 for web applications; 14 for dense admin tools and dashboards.
const fontSize = 16;

// Density, default (rule 4.7). compact: control 32, controlSM 24, controlLG 40, row 32, card 16, field 12.
// comfortable: control 48, controlSM 40, controlLG 56, row 48, card 32, field 24.
// controlSM and controlLG (one 8px step either side) are judgment: antd would derive 0.75 and 1.25 times
// the control height, off the 4px grid. antd's own default control height is 32, GUIdance's compact.
const density = { control: 40, controlSM: 32, controlLG: 48, row: 40, card: 24, field: 16 };

// Shape, soft (rule 5.5). Each value names its role; full is 9999.
const radius = { button: 8, field: 8, chip: 8, card: 8, overlay: 12, small: 4 };

export function guidanceTheme({
  mode,
  reducedMotion = false,
  touch = false,
}: { mode: Mode; reducedMotion?: boolean; touch?: boolean }): ThemeConfig {
  const c = palette[mode];
  // Touch layouts (rule 2.2): controls and rows at least 44px.
  const h = (px: number) => (touch ? Math.max(px, 44) : px);
  const onPrimary = { colorTextLightSolid: c.onPrimary, colorWhite: c.onPrimary };
  // Popup options at 40px: padding x 2 + line height (fontSize + 8).
  const optionPad = Math.max(Math.round((h(40) - (fontSize + 8)) / 2), 0);

  return {
    algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      // Seeds: antd derives hover, active and tint colours from these.
      colorPrimary: c.primary,
      colorInfo: c.tertiary,
      colorSuccess: c.success,
      colorWarning: c.warning,
      colorError: c.error,
      colorLink: c.primary, // otherwise follows colorInfo
      // Derived colours whose defaults fail contrast.
      colorText: c.onSurface,
      colorTextSecondary: c.onSurfaceVariant,
      colorTextTertiary: c.onSurfaceVariant, // default black at 45%, 3.36:1 on white: help text and icons
      colorTextPlaceholder: c.onSurfaceVariant, // default black at 25%, 1.84:1
      colorTextQuaternary: c.outline, // Switch track, Select and DatePicker icons, disabled text: 3:1
      colorBgLayout: c.surface,
      colorBgContainer: c.container,
      colorBgElevated: c.elevated,
      colorBorder: c.outline, // control boundaries need 3:1; default #d9d9d9 is 1.41:1
      colorBorderSecondary: c.outlineVariant, // cards and dividers; colorSplit follows it
      // States (derived tokens, so they can be set): mixes computed in setup, and the container pair.
      colorPrimaryHover: c.primaryHover,
      colorPrimaryActive: c.primaryPressed,
      colorLinkHover: c.primaryHover,
      colorLinkActive: c.primaryPressed,
      colorErrorHover: c.errorHover,
      colorErrorActive: c.errorPressed,
      colorPrimaryBorderHover: c.primaryHover, // Slider hover
      colorPrimaryBg: c.primaryTint, // selected options, nodes and rows, filled buttons
      colorPrimaryBgHover: c.primaryTintHover,
      colorErrorBg: c.errorTint, // danger filled buttons, error alerts
      colorErrorBgFilledHover: c.errorTintHover,
      colorErrorBgActive: c.errorTintPressed,
      // Focus (rules 12.1, 12.6): solid rings instead of antd's pale tints.
      colorPrimaryBorder: c.primary, // the 3px focus outline of buttons and most controls
      controlOutline: c.primary, // the 2px focus ring of inputs, selects, radios, pagination
      colorErrorOutline: c.error,
      colorWarningOutline: c.warning,
      // Type, density, shape, motion.
      fontSize,
      controlHeight: h(density.control),
      controlHeightSM: h(density.controlSM),
      controlHeightLG: h(density.controlLG),
      borderRadius: radius.field, // inputs and selects
      borderRadiusLG: radius.card, // cards and dropdown panels
      borderRadiusSM: radius.small, // checkboxes and small internals, small in every preset
      borderRadiusXS: 2,
      motion: !reducedMotion, // false sets every antd duration to 0s (rule 11.2)
    },
    components: {
      Button: {
        primaryColor: c.onPrimary,
        dangerColor: c.onError,
        primaryShadow: 'none',
        dangerShadow: 'none',
        borderRadius: radius.button,
        borderRadiusSM: radius.button,
        borderRadiusLG: radius.button,
      },
      // White text or marks on primary, error and status fills become the matching on-colour.
      Checkbox: onPrimary,
      Radio: onPrimary,
      Switch: { colorTextLightSolid: c.onPrimary, handleBg: c.onPrimary, colorTextQuaternary: c.onSurfaceVariant }, // label, knob, unchecked track
      Steps: onPrimary,
      DatePicker: { ...onPrimary, colorTextDisabled: c.onSurfaceVariant }, // dates outside the month can be clicked
      Calendar: { ...onPrimary, colorTextDisabled: c.onSurfaceVariant },
      Tree: { ...onPrimary, titleHeight: h(density.row) },
      // Options in popups keep the default density (rule 4.7). Not Cascader's controlHeight: it also sizes the field.
      TreeSelect: { ...onPrimary, titleHeight: h(40) },
      Cascader: { ...onPrimary, optionPadding: `${optionPad}px 12px` },
      Progress: { colorWhite: c.onPrimary }, // text inside the bar, on the info or success colour
      Tour: onPrimary,
      Tag: { colorTextLightSolid: c.onPrimary, borderRadiusSM: radius.chip },
      Badge: { colorTextLightSolid: c.onError },
      Dropdown: {
        colorTextLightSolid: c.onError, // a danger item while hovered
        paddingBlock: optionPad, // items keep the default density (rule 4.7)
      },
      Menu: {
        itemHeight: h(density.row), // the navigation follows the product's density, at row height (judgment)
        itemSelectedColor: c.onPrimaryContainer,
        itemSelectedBg: c.primaryContainer,
        darkItemSelectedColor: c.onPrimary,
        darkDangerItemSelectedColor: c.onError,
        darkDangerItemColor: c.menuDarkError,
        darkDangerItemHoverColor: c.menuDarkError,
      },
      Avatar: { colorTextPlaceholder: c.inverseSurface, colorTextLightSolid: c.inverseOnSurface },
      Select: {
        optionHeight: h(40), // options keep the default density (rule 4.7)
        borderRadiusSM: radius.chip, // multi-select chips (options take it too)
      },
      // Density beyond control height. Row height = padding x 2 + line height (fontSize + 8) + 1px border.
      // Rounded to whole pixels, so rows come out 1px over row-height (judgment).
      Table: { cellPaddingBlock: Math.max(Math.round((h(density.row) - (fontSize + 8)) / 2), 0) },
      Card: { bodyPadding: density.card, headerPadding: density.card },
      Form: { itemMarginBottom: density.field },
      Tooltip: { borderRadius: radius.card },
      // Focus on the handle (rule 12.1): a neutral handle at rest, a solid primary ring when focused, hovered or pressed.
      Slider: { handleColor: c.outline, handleActiveColor: c.primary, handleActiveOutlineColor: c.primary },
      Modal: { borderRadiusLG: radius.overlay },
    },
  };
}

// Density (rule 4.7) and shape (rule 5.5) roles for your own layout; presets and tuning: design-decisions.md.
// Change with /guidance spacing and /guidance shape. antd's components read the theme above, not these:
// keep both in step.
// Phone widths (rule 4.6): use phone.card and phone.page under 600px.
export const guidanceRoles = {
  space: { inline: 8, control: 16, stack: 8, field: 16, card: 24, group: 24, section: 32, page: 24 },
  phone: { card: 16, page: 16 },
  radius,
  controlHeight: density.control,
  rowHeight: density.row,
  // Targets: 24px is the WCAG 2.5.8 floor; 44px is the touch size (rule 2.2), applied above when touch is true.
  target: { min: 24, touch: 44 },
  // antd's focus outline: lineWidthFocus (3px) in colorPrimaryBorder, offset 1px. Custom controls match it.
  focusRing: { width: 3, offset: 1 },
  scrollPaddingTop: 0, // px; set to the sticky header height (WCAG 2.4.11)
  measure: '60ch', // readable line length (rule 3.4)
} as const;

// Roles antd has no token for. Same placeholders as above.
export const guidanceExtraColors = {
  light: {
    primaryContainer: '{L.primary-container}', onPrimaryContainer: '{L.on-primary-container}',
    errorContainer: '{L.error-container}', onErrorContainer: '{L.on-error-container}',
    successContainer: '{L.success-container}', onSuccessContainer: '{L.on-success-container}',
    warningContainer: '{L.warning-container}', onWarningContainer: '{L.on-warning-container}',
    chart: ['{L.chart-1}', '{L.chart-2}', '{L.chart-3}', '{L.chart-4}', '{L.chart-5}'],
  },
  dark: {
    primaryContainer: '{D.primary-container}', onPrimaryContainer: '{D.on-primary-container}',
    errorContainer: '{D.error-container}', onErrorContainer: '{D.on-error-container}',
    successContainer: '{D.success-container}', onSuccessContainer: '{D.on-success-container}',
    warningContainer: '{D.warning-container}', onWarningContainer: '{D.on-warning-container}',
    chart: ['{D.chart-1}', '{D.chart-2}', '{D.chart-3}', '{D.chart-4}', '{D.chart-5}'],
  },
} as const;
```
