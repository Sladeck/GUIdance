# Token format: Tailwind CSS v3

**File to create:** guidance.preset.js at the project root. Never overwrite an existing file: if it exists, ask, or merge only what is missing.

**Wiring:** In `tailwind.config.js`, add `presets: [require('./guidance.preset.js')],`. Values are under `theme.extend`, so default utilities keep working.

**Filling it in**
- Fixed values (spacing, radius, elevation, type, motion, targets, focus, measure) are already filled from `../data/scales.md` and `../data/accessibility.md`. Keep them unless the user chose otherwise.
- Density and shape roles are filled for the default density and the soft shape. For another preset, repoint them with the Density and Shape presets tables in `../data/scales.md` (and its Phone widths line for card padding), and update the `density:` and `shape:` notes.
- `{L.role}` and `{D.role}` are the light and dark colours of that role, from the colour set built in setup (`../data/colour.md`, Building a colour set from a brand colour).
- When the user keeps their own colours, delete every colour block and keep the rest.
- Type: this template has the 5-style subset. For all 15 styles, take the type table in `../data/scales.md`.

```js
/*
GUIdance design tokens.
Sources: Material 3 spacing, shape, type and motion tokens; WCAG 2.2 (2.5.8, focus);
Apple HIG accessibility. Colours: built from the brand colour with GUIdance's colour rules
(every text pair 4.5:1, every boundary and chart colour 3:1). Edit values freely; keep the names.
Add to tailwind.config: presets: [require('./guidance.preset.js')]
Spacing: Tailwind's default 4px step already matches the Material 3 grid, so it is unchanged.
*/
module.exports = {
  theme: {
    extend: {
      borderRadius: {
        'ui-none': '0',
        'ui-xs': '4px',
        'ui-sm': '8px',
        'ui-md': '12px',
        'ui-lg': '16px',
        'ui-lg-plus': '20px',
        'ui-xl': '28px',
        'ui-xl-plus': '32px',
        'ui-2xl': '48px',
        'ui-full': '9999px',
        // shape: soft (rule 5.5). Utilities: rounded-card, rounded-button. Change with /guidance shape.
        'button': '8px',
        'field': '8px',
        'chip': '8px',
        'card': '8px',
        'overlay': '12px'
      },
      // Elevation: Material 3 levels 0-5 (0, 1, 3, 6, 8, 12dp). Rest at 0-3; 4 and 5 only for hover and drag.
      boxShadow: {
        'elevation-0': 'none',
        'elevation-1': '0 1px 2px 0 rgb(0 0 0 / 0.3), 0 1px 3px 1px rgb(0 0 0 / 0.15)',
        'elevation-2': '0 1px 2px 0 rgb(0 0 0 / 0.3), 0 2px 6px 2px rgb(0 0 0 / 0.15)',
        'elevation-3': '0 1px 3px 0 rgb(0 0 0 / 0.3), 0 4px 8px 3px rgb(0 0 0 / 0.15)',
        'elevation-4': '0 2px 3px 0 rgb(0 0 0 / 0.3), 0 6px 10px 4px rgb(0 0 0 / 0.15)',
        'elevation-5': '0 4px 4px 0 rgb(0 0 0 / 0.3), 0 8px 12px 6px rgb(0 0 0 / 0.15)'
      },
      fontSize: {
        'ui-headline': ['2rem', { lineHeight: '2.5rem', fontWeight: '400' }],
        'ui-title': ['1.375rem', { lineHeight: '1.75rem', fontWeight: '400' }],
        'ui-body': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'ui-body-sm': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
        'ui-label': ['0.75rem', { lineHeight: '1rem', fontWeight: '500' }]
      },
      transitionDuration: {
        'short-1': '50ms',
        'short-2': '100ms',
        'short-3': '150ms',
        'short-4': '200ms',
        'medium-1': '250ms',
        'medium-2': '300ms',
        'medium-3': '350ms',
        'medium-4': '400ms',
        'long-1': '450ms',
        'long-2': '500ms',
        'long-3': '550ms',
        'long-4': '600ms'
      },
      transitionTimingFunction: {
        'standard': 'cubic-bezier(0.2, 0, 0, 1)',
        'standard-decelerate': 'cubic-bezier(0, 0, 0, 1)',
        'standard-accelerate': 'cubic-bezier(0.3, 0, 1, 1)',
        'emphasized-decelerate': 'cubic-bezier(0.05, 0.7, 0.1, 1)',
        'emphasized-accelerate': 'cubic-bezier(0.3, 0, 0.8, 0.15)'
      },
      // density: default (rule 4.7). Utilities: gap-group, p-card, px-control-x, h-control. Change with /guidance spacing.
      // Phone widths: p-card-phone and px-page-phone below your phone breakpoint (rule 4.6), for example p-card-phone sm:p-card (sm is 640px by default; add a 600px screen for the exact width).
      spacing: {
        'inline': '8px',
        'control-x': '16px',
        'stack': '8px',
        'field': '16px',
        'card': '24px',
        'group': '24px',
        'section': '32px',
        'page': '24px',
        'card-phone': '16px',
        'page-phone': '16px'
      },
      height: { control: '40px', row: '40px' },
      minWidth: { target: '24px', touch: '44px' },
      minHeight: { target: '24px', touch: '44px', control: '40px', row: '40px' },
      maxWidth: { measure: '60ch' },
      colors: {
        'primary': 'var(--color-primary)',
        'on-primary': 'var(--color-on-primary)',
        'primary-container': 'var(--color-primary-container)',
        'on-primary-container': 'var(--color-on-primary-container)',
        'secondary': 'var(--color-secondary)',
        'on-secondary': 'var(--color-on-secondary)',
        'secondary-container': 'var(--color-secondary-container)',
        'on-secondary-container': 'var(--color-on-secondary-container)',
        'tertiary': 'var(--color-tertiary)',
        'on-tertiary': 'var(--color-on-tertiary)',
        'tertiary-container': 'var(--color-tertiary-container)',
        'on-tertiary-container': 'var(--color-on-tertiary-container)',
        'error': 'var(--color-error)',
        'on-error': 'var(--color-on-error)',
        'error-container': 'var(--color-error-container)',
        'on-error-container': 'var(--color-on-error-container)',
        'success': 'var(--color-success)',
        'on-success': 'var(--color-on-success)',
        'success-container': 'var(--color-success-container)',
        'on-success-container': 'var(--color-on-success-container)',
        'warning': 'var(--color-warning)',
        'on-warning': 'var(--color-on-warning)',
        'warning-container': 'var(--color-warning-container)',
        'on-warning-container': 'var(--color-on-warning-container)',
        'surface': 'var(--color-surface)',
        'surface-container-lowest': 'var(--color-surface-container-lowest)',
        'surface-container-low': 'var(--color-surface-container-low)',
        'surface-container': 'var(--color-surface-container)',
        'surface-container-high': 'var(--color-surface-container-high)',
        'surface-container-highest': 'var(--color-surface-container-highest)',
        'on-surface': 'var(--color-on-surface)',
        'on-surface-variant': 'var(--color-on-surface-variant)',
        'outline': 'var(--color-outline)',
        'outline-variant': 'var(--color-outline-variant)',
        'inverse-surface': 'var(--color-inverse-surface)',
        'inverse-on-surface': 'var(--color-inverse-on-surface)',
        'inverse-primary': 'var(--color-inverse-primary)',
        'chart-1': 'var(--color-chart-1)',
        'chart-2': 'var(--color-chart-2)',
        'chart-3': 'var(--color-chart-3)',
        'chart-4': 'var(--color-chart-4)',
        'chart-5': 'var(--color-chart-5)'
      },
    },
  },
  plugins: [
    // Colour variables, light and dark (dark follows the OS unless data-theme is set).
    function ({ addBase }) {
      addBase({
        ':root': {"--color-primary": "{L.primary}", "--color-on-primary": "{L.on-primary}", "--color-primary-container": "{L.primary-container}", "--color-on-primary-container": "{L.on-primary-container}", "--color-secondary": "{L.secondary}", "--color-on-secondary": "{L.on-secondary}", "--color-secondary-container": "{L.secondary-container}", "--color-on-secondary-container": "{L.on-secondary-container}", "--color-tertiary": "{L.tertiary}", "--color-on-tertiary": "{L.on-tertiary}", "--color-tertiary-container": "{L.tertiary-container}", "--color-on-tertiary-container": "{L.on-tertiary-container}", "--color-error": "{L.error}", "--color-on-error": "{L.on-error}", "--color-error-container": "{L.error-container}", "--color-on-error-container": "{L.on-error-container}", "--color-success": "{L.success}", "--color-on-success": "{L.on-success}", "--color-success-container": "{L.success-container}", "--color-on-success-container": "{L.on-success-container}", "--color-warning": "{L.warning}", "--color-on-warning": "{L.on-warning}", "--color-warning-container": "{L.warning-container}", "--color-on-warning-container": "{L.on-warning-container}", "--color-surface": "{L.surface}", "--color-surface-container-lowest": "{L.surface-container-lowest}", "--color-surface-container-low": "{L.surface-container-low}", "--color-surface-container": "{L.surface-container}", "--color-surface-container-high": "{L.surface-container-high}", "--color-surface-container-highest": "{L.surface-container-highest}", "--color-on-surface": "{L.on-surface}", "--color-on-surface-variant": "{L.on-surface-variant}", "--color-outline": "{L.outline}", "--color-outline-variant": "{L.outline-variant}", "--color-inverse-surface": "{L.inverse-surface}", "--color-inverse-on-surface": "{L.inverse-on-surface}", "--color-inverse-primary": "{L.inverse-primary}", "--color-chart-1": "{L.chart-1}", "--color-chart-2": "{L.chart-2}", "--color-chart-3": "{L.chart-3}", "--color-chart-4": "{L.chart-4}", "--color-chart-5": "{L.chart-5}"},
        '@media (prefers-color-scheme: dark)': { ':root:not([data-theme="light"])': {"--color-primary": "{D.primary}", "--color-on-primary": "{D.on-primary}", "--color-primary-container": "{D.primary-container}", "--color-on-primary-container": "{D.on-primary-container}", "--color-secondary": "{D.secondary}", "--color-on-secondary": "{D.on-secondary}", "--color-secondary-container": "{D.secondary-container}", "--color-on-secondary-container": "{D.on-secondary-container}", "--color-tertiary": "{D.tertiary}", "--color-on-tertiary": "{D.on-tertiary}", "--color-tertiary-container": "{D.tertiary-container}", "--color-on-tertiary-container": "{D.on-tertiary-container}", "--color-error": "{D.error}", "--color-on-error": "{D.on-error}", "--color-error-container": "{D.error-container}", "--color-on-error-container": "{D.on-error-container}", "--color-success": "{D.success}", "--color-on-success": "{D.on-success}", "--color-success-container": "{D.success-container}", "--color-on-success-container": "{D.on-success-container}", "--color-warning": "{D.warning}", "--color-on-warning": "{D.on-warning}", "--color-warning-container": "{D.warning-container}", "--color-on-warning-container": "{D.on-warning-container}", "--color-surface": "{D.surface}", "--color-surface-container-lowest": "{D.surface-container-lowest}", "--color-surface-container-low": "{D.surface-container-low}", "--color-surface-container": "{D.surface-container}", "--color-surface-container-high": "{D.surface-container-high}", "--color-surface-container-highest": "{D.surface-container-highest}", "--color-on-surface": "{D.on-surface}", "--color-on-surface-variant": "{D.on-surface-variant}", "--color-outline": "{D.outline}", "--color-outline-variant": "{D.outline-variant}", "--color-inverse-surface": "{D.inverse-surface}", "--color-inverse-on-surface": "{D.inverse-on-surface}", "--color-inverse-primary": "{D.inverse-primary}", "--color-chart-1": "{D.chart-1}", "--color-chart-2": "{D.chart-2}", "--color-chart-3": "{D.chart-3}", "--color-chart-4": "{D.chart-4}", "--color-chart-5": "{D.chart-5}"} },
        '[data-theme="dark"]': {"--color-primary": "{D.primary}", "--color-on-primary": "{D.on-primary}", "--color-primary-container": "{D.primary-container}", "--color-on-primary-container": "{D.on-primary-container}", "--color-secondary": "{D.secondary}", "--color-on-secondary": "{D.on-secondary}", "--color-secondary-container": "{D.secondary-container}", "--color-on-secondary-container": "{D.on-secondary-container}", "--color-tertiary": "{D.tertiary}", "--color-on-tertiary": "{D.on-tertiary}", "--color-tertiary-container": "{D.tertiary-container}", "--color-on-tertiary-container": "{D.on-tertiary-container}", "--color-error": "{D.error}", "--color-on-error": "{D.on-error}", "--color-error-container": "{D.error-container}", "--color-on-error-container": "{D.on-error-container}", "--color-success": "{D.success}", "--color-on-success": "{D.on-success}", "--color-success-container": "{D.success-container}", "--color-on-success-container": "{D.on-success-container}", "--color-warning": "{D.warning}", "--color-on-warning": "{D.on-warning}", "--color-warning-container": "{D.warning-container}", "--color-on-warning-container": "{D.on-warning-container}", "--color-surface": "{D.surface}", "--color-surface-container-lowest": "{D.surface-container-lowest}", "--color-surface-container-low": "{D.surface-container-low}", "--color-surface-container": "{D.surface-container}", "--color-surface-container-high": "{D.surface-container-high}", "--color-surface-container-highest": "{D.surface-container-highest}", "--color-on-surface": "{D.on-surface}", "--color-on-surface-variant": "{D.on-surface-variant}", "--color-outline": "{D.outline}", "--color-outline-variant": "{D.outline-variant}", "--color-inverse-surface": "{D.inverse-surface}", "--color-inverse-on-surface": "{D.inverse-on-surface}", "--color-inverse-primary": "{D.inverse-primary}", "--color-chart-1": "{D.chart-1}", "--color-chart-2": "{D.chart-2}", "--color-chart-3": "{D.chart-3}", "--color-chart-4": "{D.chart-4}", "--color-chart-5": "{D.chart-5}"},
      });
    },
  ]
};
```
