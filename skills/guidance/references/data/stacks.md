# Stack notes: traps when writing tokens

Read only your stack's section. Worked token files: `../formats/`.

## Tailwind v4 [TW-THEME, TW-DARK]
- Tokens in a top-level `@theme { }` block (not inside selectors or media queries). Namespaces: `--color-*`, `--font-*`, `--text-*` (plus `--text-*--line-height`, `--text-*--letter-spacing`, `--text-*--font-weight`), `--font-weight-*`, `--tracking-*`, `--leading-*`, `--breakpoint-*`, `--container-*`, `--spacing-*`, `--radius-*`, `--shadow-*`, `--inset-shadow-*`, `--drop-shadow-*`, `--blur-*`, `--perspective-*`, `--aspect-*`, `--ease-*`, `--animate-*`. No duration namespace.
- Default `--spacing: 0.25rem` (p-1 = 4px, p-2 = 8px) is already on the Material grid.
- Utilities reference the variable (`bg-primary` is `background-color: var(--color-primary)`): dark values are plain overrides of the same variables under a selector or media query, outside `@theme`.
- `@theme inline` makes utilities use the value instead of the variable (for tokens referencing other variables); `@theme static` emits all variables.
- Dark follows `prefers-color-scheme` by default. Data attribute: `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));`. Class: `@custom-variant dark (&:where(.dark, .dark *));`.

## Tailwind v3
Tokens in a preset (`presets: [require('./guidance.preset.js')]`) under `theme.extend` so defaults stay; CSS variables injected by a plugin calling `addBase`.

## MUI [MUI-DARK, MUI-CSSVARS]
- Keys: `spacing` (multiplied: `theme.spacing(2)` = 16px at 8), `shape.borderRadius` (one number for all components), `typography` (h1 to h6, subtitle1/2, body1/2, caption, overline, button), `transitions.duration` (shortest, shorter, short, standard, complex, enteringScreen, leavingScreen), `transitions.easing` (easeInOut, easeOut, easeIn, sharp).
- Colours: `colorSchemes: { light: { palette }, dark: { palette } }` (MUI v6+, light on by default). With both `palette` and `colorSchemes`, `palette` wins. `palette` needs literal colours (MUI computes shades; `var()` breaks it).
- `cssVariables: { colorSchemeSelector: 'class' | 'data' | '.mode-%s' | '[data-%s]' }`; `useColorScheme()` reads and sets the mode (`mode` is `undefined` on first render).
- Merge with `deepmerge` from `@mui/utils`.
- Focus: set it in the theme, `components.MuiButtonBase.styleOverrides.root['&.Mui-focusVisible']` (an `outline` and `outlineOffset`). ButtonBase is the root of buttons, icon buttons, switches, checkboxes, radios, tabs and menu items, so one rule covers them. A global `:focus-visible` rule does not reach them: ButtonBase sets `outline: 0` on its own class, which wins, and the native input inside a switch or checkbox has `opacity: 0`. With `disableRipple`, there is no focus style at all until this rule exists; contained buttons keep only an elevation shadow (checked in a browser with MUI 9.5.0 and Next.js 16, 2026-11-21). `CssBaseline` sets the body colour and background after a global stylesheet, so a `globals.css` body rule is overridden.

## Sass
`@use "./guidance" as *;` for `$` variables; the same values as CSS custom properties for runtime theming.

## shadcn/ui [SHADCN-THEME]
- Colour variables on `:root` and `.dark`: `--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--destructive`, `--border`, `--input`, `--ring`, `--chart-1` to `--chart-5`, `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-accent`, `--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring`.
- Defaults are `oklch()`, but any CSS colour works: Tailwind v4 maps them in `@theme inline` (`--color-primary: var(--primary);`). Dark: `@custom-variant dark (&:is(.dark *));` with `.dark` on `<html>`.
- Radius: one `--radius` (default 0.625rem = 10px) with derived steps sm x0.6, md x0.8, lg x1, xl x1.4, 2xl x1.8, 3xl x2.2, 4xl x2.6; a 0.75rem base gives 7.2, 9.6, 12, 16.8px, off the 4px grid. Set the steps explicitly to the Material radius scale instead.
- New colours: the variable on `:root` and `.dark`, then `--color-<name>: var(--<name>);` in `@theme inline`.

## Bootstrap 5.3 [BS-SASS, BS-COLOR-MODES]
- Sass overrides: after `functions`, before `variables` (Option B), or before the single `bootstrap` import (Option A); every variable is `!default`. Dark-only values (`$body-bg-dark`, `$body-color-dark`, `$border-color-dark`, `$link-color-dark`, `$primary-text-emphasis-dark`, `$primary-bg-subtle-dark`, ...) after `variables-dark`, before `maps` and `root`.
- Theme colours: `$primary`, `$secondary`, `$success`, `$info`, `$warning`, `$danger`, `$light`, `$dark`; `primary`, `success` and `danger` must exist. Button text from `color-contrast()` with `$min-contrast-ratio: 4.5`. Theme colours do not change in dark mode; only `-dark` variables do.
- Defaults that break the rules: `$body-tertiary-color` is body colour at 50% opacity (fails 4.5:1); inputs use `$border-color` (`$gray-300`, about 1.3:1 on white, fails 1.4.11); `$focus-ring-color` is primary at 25% opacity; `$border-radius` .375rem (6px) and `-xxl` 2rem are off the Material scale; shadows off (`$enable-shadows: false`).
- `$spacers`: 0, 4, 8, 16, 24, 48px (`$spacer` 1rem), already on the Material grid. Radius: `$border-radius`, `-sm`, `-lg`, `-xl`, `-xxl`, `-pill`. Shadows: `$box-shadow`, `-sm`, `-lg`, `-inset`. Type: `$font-size-base` 1rem, `$h1-font-size` to `$h6-font-size` (2.5, 2, 1.75, 1.5, 1.25, 1 x base).
- Dark mode: `data-bs-theme="dark"` on `<html>` (or one component). `$color-mode-type: media-query` follows the OS but disables per-component themes.
- CSS-only Bootstrap (CDN, no Sass): override `--bs-body-bg`, `--bs-body-color`, `--bs-secondary-color`, `--bs-border-color`, `--bs-link-color`... under `[data-bs-theme=light]` and `[data-bs-theme=dark]`; buttons read their own `--bs-btn-*` variables per class (`.btn-primary`), so recolour those too.

## Ant Design (antd) v6 [ANTD-THEME, ANTD-SOURCE]
- Theme through `ConfigProvider`'s `theme` prop: `token` (any global token, seed or derived), `components` (per component, e.g. `components: { Modal: { borderRadiusLG: 12 } }`), `algorithm` (`theme.defaultAlgorithm`, `theme.darkAlgorithm`, `theme.compactAlgorithm`, or an array of them), `cssVar`. Read tokens in code with `theme.useToken()`.
- Seed tokens (`colorPrimary`, `colorSuccess`, `colorWarning`, `colorError`, `colorInfo`, `colorLink`, `fontSize`, `controlHeight`, `borderRadius`, `motion`...) feed the algorithm and cannot be overridden after it: antd drops them from the overrides. Derived tokens (`colorText`, `colorBorder`, `controlHeightSM`...) can be set directly.
- Dark mode is `darkAlgorithm`. It mixes each seed colour with a fixed #141414, whatever the project's dark surfaces, so the primary, error and link colours it renders differ from the dark values passed: check pairs on `theme.getDesignToken({ algorithm: theme.darkAlgorithm, token })`, not on the values you wrote (`../formats/antd.md`).
- Defaults that break the rules (contrast measured on white): `colorTextTertiary` black at 45% (3.36:1, fails 4.5:1; used for help text, descriptions and icons); `colorTextPlaceholder` black at 25% (1.84:1); `colorBorder` #d9d9d9 (1.41:1, fails 1.4.11 on input boundaries); white text on `colorPrimary` #1677ff (4.10:1) and on `colorError` #ff4d4f (3.27:1), both under 4.5:1 for the 14px button labels; `colorSuccess` #52c41a and `colorWarning` #faad14 at 2.27:1 and 1.90:1 as text. The focus outline is `lineWidthFocus` (3px) in `colorPrimaryBorder`, a light tint of the primary: measure it against 3:1. Inputs, selects, radios and pagination show focus another way: a 1px border change plus a 2px ring in `controlOutline`, a faint tint by default (fails rule 12.6). Setting `colorPrimaryBorder` to the primary fixes the outline, gives Slider tracks and handles the primary colour, and hides the pressed label of filled and text primary Buttons. `colorTextLightSolid` and `colorWhite` (white) are drawn on primary and error fills and also on tooltips and dark overlays: change them per component, never globally (`../formats/antd.md`).
- In dark mode antd uses `colorPrimary` both as text and as a fill with white on it; no colour does both at 4.5:1 on #141414.
- `borderRadius` 6 (SM 4, LG 8, XS 2) is off the Material radius scale. Cards, dropdowns and modals use `borderRadiusLG`; tags and checkboxes `borderRadiusSM`.
- `controlHeight` 32 is GUIdance's compact height. SM and LG are 0.75 and 1.25 times it: at 40 that gives 30 and 50, off the 4px grid, so set `controlHeightSM` and `controlHeightLG` too.
- `compactAlgorithm` sets the control height to `controlHeight` minus 4 (28 by default) and the base font to `fontSizeSM` (12 from 14), whatever the tokens say; density should not touch font size (rule 4.7). Do not use it: set the control heights instead.
- Type: base `fontSize` 14 with line height (size + 8) / size; headings 38, 30, 24, 20, 16. Spacing (`sizeUnit` 4, `sizeStep` 4: 4, 8, 12, 16, 20, 24, 32, 48) is on the spacing scale. Motion: 0.1, 0.2, 0.3s; `motion: false` sets every duration to 0s, which is how to honour reduced motion.
- Breakpoints: `screenXS` 480, `screenSM` 576, `screenMD` 768, `screenLG` 992, `screenXL` 1200, `screenXXL` 1600, `screenXXXL` 1920.
- `Modal.confirm` and `Popconfirm` label their buttons "OK" and "Cancel" by default: set `okText` to the outcome (rule 10.2).

## Jetpack Compose [COMPOSE-M3, COMPOSE-CUSTOM]
- Material's colour roles are the parameters of `lightColorScheme` and `darkColorScheme`. Roles outside Material (`success`, `warning`, chart colours) and spacing tokens have no slot in `MaterialTheme`: provide them with `staticCompositionLocalOf` and `CompositionLocalProvider`.
- `Shapes` has five slots (`extraSmall`, `small`, `medium`, `large`, `extraLarge`), fewer than the radius scale: keep the full scale and the roles as your own values.
- Text sizes in `sp`, everything else in `dp`. Control and row heights are minimums and never under 48dp (rule 2.2).
- Stock Material components keep their default shapes unless a `shape` is passed. A theme with dynamic colour replaces the checked colours on Android 12 and later.
- `background` and `onBackground` need values too: Material screens paint with them.

## SwiftUI [SWIFTUI-DOCS]
- `Color.primary` and `Color.secondary` already exist and mean label colours: put the roles in their own namespace.
- Colours live in asset-catalog colour sets with Any and Dark appearances, read with `Color("name")`.
- Use the system text styles (`Font.TextStyle`), which follow Dynamic Type; scale custom numbers with `ScaledMetric`.
- Control and row heights are minimums: never under 44pt on iOS and iPadOS; macOS follows the density table (rule 2.2).
- Set `.tint` on the root view, or system controls keep the default accent colour.
- Spacing roles go through the environment, so a page or a sheet can take another density.
