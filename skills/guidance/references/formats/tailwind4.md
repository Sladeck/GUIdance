# Token format: Tailwind CSS v4

**File to create:** guidance.css next to the CSS file that has `@import "tailwindcss";`. Never overwrite an existing file: if it exists, ask, or merge only what is missing.

**Wiring:** Add `@import "./guidance.css";` right after `@import "tailwindcss";`. For a `dark:` variant that follows `data-theme`, also add `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));`.

**Filling it in**
- Fixed values (spacing, radius, elevation, type, motion, targets, focus, measure) are already filled from `../data/scales.md` and `../data/accessibility.md`. Keep them unless the user chose otherwise.
- `{L.role}` and `{D.role}` are the light and dark colours of that role. Copy them exactly from the chosen row of `../palettes/<variant>.md` (the `light:` and `dark:` halves). With an exact brand colour (fidelity), replace the one or two light roles the setup step decided (see SKILL.md), nothing else.
- `{palette name}` is the name the user picked.
- Without a chosen palette, delete every colour block and keep the rest.
- Type: this template has the 5-style subset. For all 15 styles, take the type table in `../data/scales.md`.

```css
/*
GUIdance design tokens.
Sources: Material 3 spacing, shape, type and motion tokens; WCAG 2.2 (2.5.8, focus);
Apple HIG accessibility. Colours: palette "{palette name}" from GUIdance's palette tables
(every text pair 4.5:1, every boundary and chart colour 3:1). Edit values freely; keep the names.
Import this file right after @import "tailwindcss".
Utilities: rounded-ui-md, shadow-elevation-1, text-ui-body, ease-standard, min-h-(--target-touch) ...
Spacing: Tailwind's default --spacing (0.25rem = 4px) already matches the Material 3
4/8px grid (p-2 = 8px, p-4 = 16px, p-6 = 24px). It is left unchanged.
*/

@theme {
  --radius-ui-none: 0;
  --radius-ui-xs: 4px;
  --radius-ui-sm: 8px;
  --radius-ui-md: 12px;
  --radius-ui-lg: 16px;
  --radius-ui-lg-plus: 20px;
  --radius-ui-xl: 28px;
  --radius-ui-xl-plus: 32px;
  --radius-ui-2xl: 48px;
  --radius-ui-full: 9999px;

  /* Elevation: Material 3 levels 0-5 (0, 1, 3, 6, 8, 12dp). Rest at 0-3; 4 and 5 only for hover and drag. Utilities: shadow-elevation-1 ... */
  --shadow-elevation-0: none;
  --shadow-elevation-1: 0 1px 2px 0 rgb(0 0 0 / 0.3), 0 1px 3px 1px rgb(0 0 0 / 0.15);
  --shadow-elevation-2: 0 1px 2px 0 rgb(0 0 0 / 0.3), 0 2px 6px 2px rgb(0 0 0 / 0.15);
  --shadow-elevation-3: 0 1px 3px 0 rgb(0 0 0 / 0.3), 0 4px 8px 3px rgb(0 0 0 / 0.15);
  --shadow-elevation-4: 0 2px 3px 0 rgb(0 0 0 / 0.3), 0 6px 10px 4px rgb(0 0 0 / 0.15);
  --shadow-elevation-5: 0 4px 4px 0 rgb(0 0 0 / 0.3), 0 8px 12px 6px rgb(0 0 0 / 0.15);

  --text-ui-headline: 2rem;
  --text-ui-headline--line-height: 2.5rem;
  --text-ui-headline--font-weight: 400;
  --text-ui-title: 1.375rem;
  --text-ui-title--line-height: 1.75rem;
  --text-ui-title--font-weight: 400;
  --text-ui-body: 1rem;
  --text-ui-body--line-height: 1.5rem;
  --text-ui-body--font-weight: 400;
  --text-ui-body-sm: 0.875rem;
  --text-ui-body-sm--line-height: 1.25rem;
  --text-ui-body-sm--font-weight: 400;
  --text-ui-label: 0.75rem;
  --text-ui-label--line-height: 1rem;
  --text-ui-label--font-weight: 500;

  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-standard-decelerate: cubic-bezier(0, 0, 0, 1);
  --ease-standard-accelerate: cubic-bezier(0.3, 0, 1, 1);
  --ease-emphasized-decelerate: cubic-bezier(0.05, 0.7, 0.1, 1);
  --ease-emphasized-accelerate: cubic-bezier(0.3, 0, 0.8, 0.15);

  /* Colours (light). Utilities: bg-primary, text-on-surface, border-outline ... */
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

/* Dark colours: follow the OS unless data-theme is set on <html>.
   To make Tailwind's dark: variant follow data-theme too, add to your entry CSS:
   @custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *)); */
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

/* Values Tailwind has no theme namespace for (durations, targets, focus, measure).
   Named so they do not collide with Tailwind's own --radius-*, --text-* or --ease-* variables. */
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
  --leading-prose: 1.5;
  --measure: 60ch; /* about 70 to 75 characters in most sans fonts; check with the typography snippet in browser-checks.md */

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

  /* Targets: 24px is the WCAG 2.5.8 floor; 44px is the touch comfort size (Apple 44pt, Material 48dp). */
  --target-min: 24px;
  --target-touch: 44px;

  /* Focus: colour must reach 3:1 against what it sits on (WCAG 1.4.11). Set it to your accent. */
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;
  --focus-ring-color: Highlight;
  --scroll-padding-top: 0px; /* set to the sticky header height (WCAG 2.4.11) */
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
```
