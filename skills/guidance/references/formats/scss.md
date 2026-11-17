# Token format: Sass (SCSS)

**Contents:** file to create, wiring, filling it in; then the template: Sass variables (spacing, density roles, radius, shape roles, elevation and the rest), the same values as CSS custom properties, phone widths, reduced motion, colours (light and dark).

**File to create:** _guidance.scss next to the global .scss. Never overwrite an existing file: if it exists, ask, or merge only what is missing.

**Wiring:** Add `@use "./guidance" as *;` at the top of the global .scss (or any file that needs the variables).

**Filling it in**
- Fixed values (spacing, radius, elevation, type, motion, targets, focus, measure) are already filled from `../data/scales/` and `../data/accessibility.md`. Keep them unless the user chose otherwise.
- Density and shape roles are filled for the default density and the soft shape. For another preset, repoint them with the Density and Shape presets tables in `../data/scales/spacing-density.md` and `../data/scales/shape.md` (and the Phone widths line of the first, for card padding), and update the `density:` and `shape:` notes.
- `{L.role}` and `{D.role}` are the light and dark colours of that role, from the colour set built in setup (`../data/colour/building.md`).
- When the user keeps their own colours, delete every colour block and keep the rest.
- Type: this template has the 5-style subset. For all 15 styles, take the type table in `../data/scales/type.md`.

```scss
/*
GUIdance design tokens.
Sources: Material 3 spacing, shape, type and motion tokens; WCAG 2.2 (2.5.8, focus);
Apple HIG accessibility. Colours: built from the brand colour with GUIdance's colour rules
(every text pair 4.5:1, every boundary and chart colour 3:1). Edit values freely; keep the names.
*/

$space-0: 0px;
$space-25: 2px;
$space-50: 4px;
$space-75: 6px;
$space-100: 8px;
$space-125: 10px;
$space-150: 12px;
$space-175: 14px;
$space-200: 16px;
$space-250: 20px;
$space-300: 24px;
$space-400: 32px;
$space-450: 36px;
$space-500: 40px;
$space-600: 48px;
$space-700: 56px;
$space-800: 64px;
$space-900: 72px;
// Density roles (rule 4.7). density: default. Change with /guidance spacing; roles point at scale tokens.
$space-inline: $space-100;
$space-control: $space-200;
$space-stack: $space-100;
$space-field: $space-200;
$space-card: $space-300;
$space-group: $space-300;
$space-section: $space-400;
$space-page: $space-300;
$control-height: 40px;
$row-height: 40px;

$radius-none: 0;
$radius-xs: 4px;
$radius-sm: 8px;
$radius-md: 12px;
$radius-lg: 16px;
$radius-lg-plus: 20px;
$radius-xl: 28px;
$radius-xl-plus: 32px;
$radius-2xl: 48px;
$radius-full: 9999px;
// Shape roles (rule 5.5). shape: soft. Change with /guidance shape; roles point at scale tokens.
$radius-button: $radius-sm;
$radius-field: $radius-sm;
$radius-chip: $radius-sm;
$radius-card: $radius-sm;
$radius-overlay: $radius-md;

// Elevation: Material 3 levels 0-5 (0, 1, 3, 6, 8, 12dp). Rest at 0-3; 4 and 5 only for hover and drag.
$elevation-0: none;
$elevation-1: 0 1px 2px 0 rgb(0 0 0 / 0.3), 0 1px 3px 1px rgb(0 0 0 / 0.15);
$elevation-2: 0 1px 2px 0 rgb(0 0 0 / 0.3), 0 2px 6px 2px rgb(0 0 0 / 0.15);
$elevation-3: 0 1px 3px 0 rgb(0 0 0 / 0.3), 0 4px 8px 3px rgb(0 0 0 / 0.15);
$elevation-4: 0 2px 3px 0 rgb(0 0 0 / 0.3), 0 6px 10px 4px rgb(0 0 0 / 0.15);
$elevation-5: 0 4px 4px 0 rgb(0 0 0 / 0.3), 0 8px 12px 6px rgb(0 0 0 / 0.15);

$text-headline: 2rem;  $text-headline-line-height: 2.5rem;  $text-headline-weight: 400;
$text-title: 1.375rem;  $text-title-line-height: 1.75rem;  $text-title-weight: 400;
$text-body: 1rem;  $text-body-line-height: 1.5rem;  $text-body-weight: 400;
$text-body-sm: 0.875rem;  $text-body-sm-line-height: 1.25rem;  $text-body-sm-weight: 400;
$text-label: 0.75rem;  $text-label-line-height: 1rem;  $text-label-weight: 500;

$duration-short-1: 50ms;
$duration-short-2: 100ms;
$duration-short-3: 150ms;
$duration-short-4: 200ms;
$duration-medium-1: 250ms;
$duration-medium-2: 300ms;
$duration-medium-3: 350ms;
$duration-medium-4: 400ms;
$duration-long-1: 450ms;
$duration-long-2: 500ms;
$duration-long-3: 550ms;
$duration-long-4: 600ms;
$ease-standard: cubic-bezier(0.2, 0, 0, 1);
$ease-standard-decelerate: cubic-bezier(0, 0, 0, 1);
$ease-standard-accelerate: cubic-bezier(0.3, 0, 1, 1);
$ease-emphasized-decelerate: cubic-bezier(0.05, 0.7, 0.1, 1);
$ease-emphasized-accelerate: cubic-bezier(0.3, 0, 0.8, 0.15);
$target-min: 24px;
$target-touch: 44px;
$measure: 60ch;

// The same values as CSS custom properties, for runtime theming.


$color-primary: var(--color-primary);
$color-on-primary: var(--color-on-primary);
$color-primary-container: var(--color-primary-container);
$color-on-primary-container: var(--color-on-primary-container);
$color-secondary: var(--color-secondary);
$color-on-secondary: var(--color-on-secondary);
$color-secondary-container: var(--color-secondary-container);
$color-on-secondary-container: var(--color-on-secondary-container);
$color-tertiary: var(--color-tertiary);
$color-on-tertiary: var(--color-on-tertiary);
$color-tertiary-container: var(--color-tertiary-container);
$color-on-tertiary-container: var(--color-on-tertiary-container);
$color-error: var(--color-error);
$color-on-error: var(--color-on-error);
$color-error-container: var(--color-error-container);
$color-on-error-container: var(--color-on-error-container);
$color-success: var(--color-success);
$color-on-success: var(--color-on-success);
$color-success-container: var(--color-success-container);
$color-on-success-container: var(--color-on-success-container);
$color-warning: var(--color-warning);
$color-on-warning: var(--color-on-warning);
$color-warning-container: var(--color-warning-container);
$color-on-warning-container: var(--color-on-warning-container);
$color-surface: var(--color-surface);
$color-surface-container-lowest: var(--color-surface-container-lowest);
$color-surface-container-low: var(--color-surface-container-low);
$color-surface-container: var(--color-surface-container);
$color-surface-container-high: var(--color-surface-container-high);
$color-surface-container-highest: var(--color-surface-container-highest);
$color-on-surface: var(--color-on-surface);
$color-on-surface-variant: var(--color-on-surface-variant);
$color-outline: var(--color-outline);
$color-outline-variant: var(--color-outline-variant);
$color-inverse-surface: var(--color-inverse-surface);
$color-inverse-on-surface: var(--color-inverse-on-surface);
$color-inverse-primary: var(--color-inverse-primary);
$color-chart-1: var(--color-chart-1);
$color-chart-2: var(--color-chart-2);
$color-chart-3: var(--color-chart-3);
$color-chart-4: var(--color-chart-4);
$color-chart-5: var(--color-chart-5);
:root {
  /* Spacing: Material 3 tokens, 8px base (space-100), nested 2/4/6/10 for component internals. */
  --space-0: 0px;
  --space-25: 2px;
  --space-50: 4px;
  --space-75: 6px;
  --space-100: 8px;
  --space-125: 10px;
  --space-150: 12px;
  --space-175: 14px;
  --space-200: 16px;
  --space-250: 20px;
  --space-300: 24px;
  --space-400: 32px;
  --space-450: 36px;
  --space-500: 40px;
  --space-600: 48px;
  --space-700: 56px;
  --space-800: 64px;
  --space-900: 72px;

  /* Density roles (rule 4.7). density: default. Change with /guidance spacing; roles point at scale tokens. */
  --space-inline: var(--space-100);
  --space-control: var(--space-200);
  --space-stack: var(--space-100);
  --space-field: var(--space-200);
  --space-card: var(--space-300);
  --space-group: var(--space-300);
  --space-section: var(--space-400);
  --space-page: var(--space-300);
  --control-height: 40px;
  --row-height: 40px;

  /* Radius: Material 3 corner scale. Nested corners: inner = outer - padding. */
  --radius-none: 0;
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-lg-plus: 20px;
  --radius-xl: 28px;
  --radius-xl-plus: 32px;
  --radius-2xl: 48px;
  --radius-full: 9999px;

  /* Shape roles (rule 5.5). shape: soft. Change with /guidance shape; roles point at scale tokens. */
  --radius-button: var(--radius-sm);
  --radius-field: var(--radius-sm);
  --radius-chip: var(--radius-sm);
  --radius-card: var(--radius-sm);
  --radius-overlay: var(--radius-md);
  /* Elevation: Material 3 levels 0-5 (0, 1, 3, 6, 8, 12dp). Rest at 0-3; 4 and 5 only for hover and drag. */
  --elevation-0: none;
  --elevation-1: 0 1px 2px 0 rgb(0 0 0 / 0.3), 0 1px 3px 1px rgb(0 0 0 / 0.15);
  --elevation-2: 0 1px 2px 0 rgb(0 0 0 / 0.3), 0 2px 6px 2px rgb(0 0 0 / 0.15);
  --elevation-3: 0 1px 3px 0 rgb(0 0 0 / 0.3), 0 4px 8px 3px rgb(0 0 0 / 0.15);
  --elevation-4: 0 2px 3px 0 rgb(0 0 0 / 0.3), 0 6px 10px 4px rgb(0 0 0 / 0.15);
  --elevation-5: 0 4px 4px 0 rgb(0 0 0 / 0.3), 0 8px 12px 6px rgb(0 0 0 / 0.15);

  /* Type: Material 3 scale (product subset of 5). Body 16px. */
  --text-headline: 2rem;
  --text-headline-line-height: 2.5rem;
  --text-headline-weight: 400;
  --text-title: 1.375rem;
  --text-title-line-height: 1.75rem;
  --text-title-weight: 400;
  --text-body: 1rem;
  --text-body-line-height: 1.5rem;
  --text-body-weight: 400;
  --text-body-sm: 0.875rem;
  --text-body-sm-line-height: 1.25rem;
  --text-body-sm-weight: 400;
  --text-label: 0.75rem;
  --text-label-line-height: 1rem;
  --text-label-weight: 500;
  --leading-prose: 1.5;
  --measure: 60ch; /* about 70 to 75 characters in most sans fonts */

  /* Motion: Material 3 durations and easing. */
  --duration-short-1: 50ms;
  --duration-short-2: 100ms;
  --duration-short-3: 150ms;
  --duration-short-4: 200ms;
  --duration-medium-1: 250ms;
  --duration-medium-2: 300ms;
  --duration-medium-3: 350ms;
  --duration-medium-4: 400ms;
  --duration-long-1: 450ms;
  --duration-long-2: 500ms;
  --duration-long-3: 550ms;
  --duration-long-4: 600ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-standard-decelerate: cubic-bezier(0, 0, 0, 1);
  --ease-standard-accelerate: cubic-bezier(0.3, 0, 1, 1);
  --ease-emphasized-decelerate: cubic-bezier(0.05, 0.7, 0.1, 1);
  --ease-emphasized-accelerate: cubic-bezier(0.3, 0, 0.8, 0.15);

  /* Targets: 24px is the WCAG 2.5.8 floor; 44px is the touch comfort size (Apple 44pt, Material 48dp). */
  --target-min: 24px;
  --target-touch: 44px;

  /* Focus: colour must reach 3:1 against what it sits on (WCAG 1.4.11). Set it to your accent. */
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;
  --focus-ring-color: Highlight;
  --scroll-padding-top: 0px; /* set to the sticky header height (WCAG 2.4.11) */
}

/* Phone widths: page gutter and card padding (rule 4.6). Responsive layout, not a density change. */
@media (max-width: 599px) {
  :root {
    --space-page: var(--space-200);
    --space-card: var(--space-200);
  }
}

/* Reduced motion: shorten movement, keep fades (Apple HIG, WCAG C39). */
@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-medium-1: 150ms;
    --duration-medium-2: 150ms;
    --duration-medium-3: 150ms;
    --duration-medium-4: 150ms;
    --duration-long-1: 150ms;
    --duration-long-2: 150ms;
    --duration-long-3: 150ms;
    --duration-long-4: 150ms;
  }
}

/* Colours: Material 3 colour roles, light and dark.
   Every text pair reaches 4.5:1 and every boundary or chart colour 3:1 (checked by hand in setup; confirm close pairs with a contrast checker).
   Dark follows the OS unless data-theme="light" or data-theme="dark" is set on <html>. */
:root {
  color-scheme: light dark;
  --color-primary: {L.primary};
  --color-on-primary: {L.on-primary};
  --color-primary-container: {L.primary-container};
  --color-on-primary-container: {L.on-primary-container};
  --color-secondary: {L.secondary};
  --color-on-secondary: {L.on-secondary};
  --color-secondary-container: {L.secondary-container};
  --color-on-secondary-container: {L.on-secondary-container};
  --color-tertiary: {L.tertiary};
  --color-on-tertiary: {L.on-tertiary};
  --color-tertiary-container: {L.tertiary-container};
  --color-on-tertiary-container: {L.on-tertiary-container};
  --color-error: {L.error};
  --color-on-error: {L.on-error};
  --color-error-container: {L.error-container};
  --color-on-error-container: {L.on-error-container};
  --color-success: {L.success};
  --color-on-success: {L.on-success};
  --color-success-container: {L.success-container};
  --color-on-success-container: {L.on-success-container};
  --color-warning: {L.warning};
  --color-on-warning: {L.on-warning};
  --color-warning-container: {L.warning-container};
  --color-on-warning-container: {L.on-warning-container};
  --color-surface: {L.surface};
  --color-surface-container-lowest: {L.surface-container-lowest};
  --color-surface-container-low: {L.surface-container-low};
  --color-surface-container: {L.surface-container};
  --color-surface-container-high: {L.surface-container-high};
  --color-surface-container-highest: {L.surface-container-highest};
  --color-on-surface: {L.on-surface};
  --color-on-surface-variant: {L.on-surface-variant};
  --color-outline: {L.outline};
  --color-outline-variant: {L.outline-variant};
  --color-inverse-surface: {L.inverse-surface};
  --color-inverse-on-surface: {L.inverse-on-surface};
  --color-inverse-primary: {L.inverse-primary};
  --color-chart-1: {L.chart-1};
  --color-chart-2: {L.chart-2};
  --color-chart-3: {L.chart-3};
  --color-chart-4: {L.chart-4};
  --color-chart-5: {L.chart-5};
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-primary: {D.primary};
    --color-on-primary: {D.on-primary};
    --color-primary-container: {D.primary-container};
    --color-on-primary-container: {D.on-primary-container};
    --color-secondary: {D.secondary};
    --color-on-secondary: {D.on-secondary};
    --color-secondary-container: {D.secondary-container};
    --color-on-secondary-container: {D.on-secondary-container};
    --color-tertiary: {D.tertiary};
    --color-on-tertiary: {D.on-tertiary};
    --color-tertiary-container: {D.tertiary-container};
    --color-on-tertiary-container: {D.on-tertiary-container};
    --color-error: {D.error};
    --color-on-error: {D.on-error};
    --color-error-container: {D.error-container};
    --color-on-error-container: {D.on-error-container};
    --color-success: {D.success};
    --color-on-success: {D.on-success};
    --color-success-container: {D.success-container};
    --color-on-success-container: {D.on-success-container};
    --color-warning: {D.warning};
    --color-on-warning: {D.on-warning};
    --color-warning-container: {D.warning-container};
    --color-on-warning-container: {D.on-warning-container};
    --color-surface: {D.surface};
    --color-surface-container-lowest: {D.surface-container-lowest};
    --color-surface-container-low: {D.surface-container-low};
    --color-surface-container: {D.surface-container};
    --color-surface-container-high: {D.surface-container-high};
    --color-surface-container-highest: {D.surface-container-highest};
    --color-on-surface: {D.on-surface};
    --color-on-surface-variant: {D.on-surface-variant};
    --color-outline: {D.outline};
    --color-outline-variant: {D.outline-variant};
    --color-inverse-surface: {D.inverse-surface};
    --color-inverse-on-surface: {D.inverse-on-surface};
    --color-inverse-primary: {D.inverse-primary};
    --color-chart-1: {D.chart-1};
    --color-chart-2: {D.chart-2};
    --color-chart-3: {D.chart-3};
    --color-chart-4: {D.chart-4};
    --color-chart-5: {D.chart-5};
  }
}
[data-theme="dark"] {
  --color-primary: {D.primary};
  --color-on-primary: {D.on-primary};
  --color-primary-container: {D.primary-container};
  --color-on-primary-container: {D.on-primary-container};
  --color-secondary: {D.secondary};
  --color-on-secondary: {D.on-secondary};
  --color-secondary-container: {D.secondary-container};
  --color-on-secondary-container: {D.on-secondary-container};
  --color-tertiary: {D.tertiary};
  --color-on-tertiary: {D.on-tertiary};
  --color-tertiary-container: {D.tertiary-container};
  --color-on-tertiary-container: {D.on-tertiary-container};
  --color-error: {D.error};
  --color-on-error: {D.on-error};
  --color-error-container: {D.error-container};
  --color-on-error-container: {D.on-error-container};
  --color-success: {D.success};
  --color-on-success: {D.on-success};
  --color-success-container: {D.success-container};
  --color-on-success-container: {D.on-success-container};
  --color-warning: {D.warning};
  --color-on-warning: {D.on-warning};
  --color-warning-container: {D.warning-container};
  --color-on-warning-container: {D.on-warning-container};
  --color-surface: {D.surface};
  --color-surface-container-lowest: {D.surface-container-lowest};
  --color-surface-container-low: {D.surface-container-low};
  --color-surface-container: {D.surface-container};
  --color-surface-container-high: {D.surface-container-high};
  --color-surface-container-highest: {D.surface-container-highest};
  --color-on-surface: {D.on-surface};
  --color-on-surface-variant: {D.on-surface-variant};
  --color-outline: {D.outline};
  --color-outline-variant: {D.outline-variant};
  --color-inverse-surface: {D.inverse-surface};
  --color-inverse-on-surface: {D.inverse-on-surface};
  --color-inverse-primary: {D.inverse-primary};
  --color-chart-1: {D.chart-1};
  --color-chart-2: {D.chart-2};
  --color-chart-3: {D.chart-3};
  --color-chart-4: {D.chart-4};
  --color-chart-5: {D.chart-5};
}
[data-theme="light"] { color-scheme: light; }
[data-theme="dark"] { color-scheme: dark; }
```
