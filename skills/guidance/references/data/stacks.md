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
