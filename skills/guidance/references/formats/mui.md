# Token format: MUI (Material UI) v6 or later

**File to create:** guidanceTheme.ts (or .js) next to the file that calls `createTheme`. Never overwrite an existing file: if it exists, ask, or merge only what is missing.

**Wiring:** Wrap the existing options: `createTheme(deepmerge(existingOptions, guidanceThemeOptions))` with `import { deepmerge } from '@mui/utils';`. Put `guidanceThemeOptions` second to let it win, first to only fill gaps. If the existing options have a top-level `palette`, MUI lets it override `colorSchemes`: move those colours into the palette tables' roles or remove it. For `.js`, drop the `type GuidanceThemeOptions` line and the `: GuidanceThemeOptions` and `as const` annotations.

**Filling it in**
- Fixed values (spacing, radius, type, motion, targets, focus, measure) are already filled from `../data/scales.md` and `../data/accessibility.md`. Keep them unless the user chose otherwise.
- `{L.role}` and `{D.role}` are the light and dark colours of that role. Copy them exactly from the chosen row of `../palettes/<variant>.md` (the `light:` and `dark:` halves). With an exact brand colour (fidelity), replace the one or two light roles the setup step decided (see SKILL.md), nothing else.
- `{palette name}` is the name the user picked.
- Without a chosen palette, delete every colour block and keep the rest.
- Type: this template has the 5-style subset. For all 15 styles, take the type table in `../data/scales.md`.

```ts
/*
GUIdance design tokens.
Sources: Material 3 spacing, shape, type and motion tokens; WCAG 2.2 (2.5.8, focus);
Apple HIG accessibility. Colours: palette "{palette name}" from GUIdance's palette tables
(every text pair 4.5:1, every boundary and chart colour 3:1). Edit values freely; keep the names.

Merge into your theme:
  import { deepmerge } from '@mui/utils';
  import { guidanceThemeOptions } from './guidanceTheme';
  const theme = createTheme(deepmerge(yourOptions, guidanceThemeOptions));
Putting guidanceThemeOptions second lets it win. Put it first to keep your existing values
and only fill gaps. This changes heading sizes, the corner radius and button casing app-wide:
review the diff before shipping.
*/
import { createTheme } from '@mui/material/styles';

// Typed from createTheme so it compiles on MUI v6 and v7 (v6's ThemeOptions type lacks colorSchemes).
type GuidanceThemeOptions = NonNullable<Parameters<typeof createTheme>[0]>;

export const guidanceThemeOptions: GuidanceThemeOptions = {
  // MUI multiplies this: theme.spacing(1) = 8px, (2) = 16px, (0.5) = 4px. Material 3 base is 8.
  spacing: 8,
  // One radius drives buttons, inputs, cards. 8 = Material 3 'small'. Use 12 for card-heavy UIs.
  shape: { borderRadius: 8 },
  // Elevation: MUI's theme.shadows is indexed by dp, so Material 3 levels 1-5 are elevation={1}, {3}, {6}, {8}, {12}
  // on Paper and Card. Rest at 0-3 (0, 1, 3, 6); 8 and 12 only for hover and drag. Keep MUI's shadow array.
  typography: {
    htmlFontSize: 16,
    fontSize: 14, // MUI's base for body2 and components; body1 is set to 16 below.
    h1: { fontSize: '2rem', lineHeight: '2.5rem', fontWeight: 400 },
    h2: { fontSize: '1.75rem', lineHeight: '2.25rem', fontWeight: 400 },
    h3: { fontSize: '1.5rem', lineHeight: '2rem', fontWeight: 400 },
    h4: { fontSize: '1.375rem', lineHeight: '1.75rem', fontWeight: 400 },
    h5: { fontSize: '1rem', lineHeight: '1.5rem', fontWeight: 500 },
    h6: { fontSize: '0.875rem', lineHeight: '1.25rem', fontWeight: 500 },
    subtitle1: { fontSize: '1rem', lineHeight: '1.5rem', fontWeight: 500 },
    subtitle2: { fontSize: '0.875rem', lineHeight: '1.25rem', fontWeight: 500 },
    body1: { fontSize: '1rem', lineHeight: '1.5rem', fontWeight: 400 },
    body2: { fontSize: '0.875rem', lineHeight: '1.25rem', fontWeight: 400 },
    caption: { fontSize: '0.75rem', lineHeight: '1rem', fontWeight: 400 },
    overline: { fontSize: '0.6875rem', lineHeight: '1rem', fontWeight: 500, textTransform: 'uppercase' as const },
    button: { fontSize: '0.875rem', lineHeight: '1.25rem', fontWeight: 500, textTransform: 'none' as const }, // Material 3 labels are sentence case
  },
  transitions: {
    duration: { shortest: 100, shorter: 150, short: 200, standard: 300, complex: 400, enteringScreen: 300, leavingScreen: 200 },
    easing: {
      easeInOut: 'cubic-bezier(0.2, 0, 0, 1)', // M3 standard
      easeOut: 'cubic-bezier(0.05, 0.7, 0.1, 1)', // M3 emphasized decelerate (entering)
      easeIn: 'cubic-bezier(0.3, 0, 0.8, 0.15)', // M3 emphasized accelerate (exiting)
      sharp: 'cubic-bezier(0.3, 0, 1, 1)', // M3 standard accelerate
    },
  },
  // Colours: Material 3 roles mapped to MUI. colorSchemes needs MUI v6 or later.
  // If your createTheme options also have a top-level palette, MUI lets that palette win: remove it.
  // Switch with useColorScheme(); add cssVariables: { colorSchemeSelector: 'data-theme' } to follow <html data-theme>.
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '{L.primary}', contrastText: '{L.on-primary}' },
        secondary: { main: '{L.secondary}', contrastText: '{L.on-secondary}' },
        info: { main: '{L.tertiary}', contrastText: '{L.on-tertiary}' },
        error: { main: '{L.error}', contrastText: '{L.on-error}' },
        warning: { main: '{L.warning}', contrastText: '{L.on-warning}' },
        success: { main: '{L.success}', contrastText: '{L.on-success}' },
        background: { default: '{L.surface}', paper: '{L.surface-container-low}' },
        text: { primary: '{L.on-surface}', secondary: '{L.on-surface-variant}' },
        divider: '{L.outline-variant}',
      },
    },
    dark: {
      palette: {
        primary: { main: '{D.primary}', contrastText: '{D.on-primary}' },
        secondary: { main: '{D.secondary}', contrastText: '{D.on-secondary}' },
        info: { main: '{D.tertiary}', contrastText: '{D.on-tertiary}' },
        error: { main: '{D.error}', contrastText: '{D.on-error}' },
        warning: { main: '{D.warning}', contrastText: '{D.on-warning}' },
        success: { main: '{D.success}', contrastText: '{D.on-success}' },
        background: { default: '{D.surface}', paper: '{D.surface-container-low}' },
        text: { primary: '{D.on-surface}', secondary: '{D.on-surface-variant}' },
        divider: '{D.outline-variant}',
      },
    },
  },
};
```
