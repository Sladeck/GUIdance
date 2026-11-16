# Token format: MUI (Material UI) v6 or later

**File to create:** guidanceTheme.ts (or .js) next to the file that calls `createTheme`. Never overwrite an existing file: if it exists, ask, or merge only what is missing.

**Wiring:** Wrap the existing options: `createTheme(deepmerge(existingOptions, guidanceThemeOptions))` with `import { deepmerge } from '@mui/utils';`. Put `guidanceThemeOptions` second to let it win, first to only fill gaps. If the existing options have a top-level `palette`, MUI lets it override `colorSchemes`: move those colours into the colour roles below or remove it. For `.js`, drop the `type GuidanceThemeOptions` line and the `: GuidanceThemeOptions` and `as const` annotations.

**Filling it in**
- Fixed values (spacing, radius, type, motion, targets, focus, measure) are already filled from `../data/scales.md` and `../data/accessibility.md`. Keep them unless the user chose otherwise.
- MUI's palette has no slot for the container roles, the surface levels, `outline`, the inverse roles or the chart colours. They are in `guidanceExtraColors`, as `{L.role}` and `{D.role}` like the palette: use the light or dark set with the project's own dark-mode mechanism.
- Reduced motion (rule 11.2): by default MUI does not shorten its transitions. From v9.1.0, set `theme.motion.reducedMotion` to `'system'` and MUI follows the user's setting. On earlier versions, `guidanceRoles.reducedMotion` holds the shorter duration; read the setting with `useMediaQuery('(prefers-reduced-motion: reduce)')` from `@mui/material/useMediaQuery` and pass that duration to transitions that move, or swap a slide for a fade.
- Density and shape roles are filled for the default density and the soft shape. For another preset, repoint them with the Density and Shape presets tables in `../data/scales.md` (and its Phone widths line for card padding), and update the `density:` and `shape:` notes.
- `{L.role}` and `{D.role}` are the light and dark colours of that role, from the colour set built in setup (`../data/colour.md`, Building a colour set from a brand colour).
- When the user keeps their own colours, delete every colour block and keep the rest.
- Type: this template has the 5-style subset. For all 15 styles, take the type table in `../data/scales.md`.

```ts
/*
GUIdance design tokens.
Sources: Material 3 spacing, shape, type and motion tokens; WCAG 2.2 (2.5.8, focus);
Apple HIG accessibility. Colours: built from the brand colour with GUIdance's colour rules
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

// density: default (rule 4.7), shape: soft (rule 5.5). Change with /guidance spacing and /guidance shape.
// Spacing roles are multiples for theme.spacing(): theme.spacing(guidanceRoles.space.group) = 24px.
// Phone widths (rule 4.6): sx={{ p: { xs: guidanceRoles.phone.card, sm: guidanceRoles.space.card } }}.
// Radius roles are px strings, because a number in sx is multiplied by theme.shape.borderRadius:
// sx={{ borderRadius: guidanceRoles.radius.card }}.
// MUI's own components do not read these roles: they keep theme.shape.borderRadius and their default sizes
// until you map them in components.<Name>.styleOverrides (for example MuiButton root: borderRadius, minHeight).
export const guidanceRoles = {
  space: { inline: 1, control: 2, stack: 1, field: 2, card: 3, group: 3, section: 4, page: 3 },
  phone: { card: 2, page: 2 },
  radius: { button: '8px', field: '8px', chip: '8px', card: '8px', overlay: '12px' },
  controlHeight: 40,
  rowHeight: 40,
  // Targets: 24px is the WCAG 2.5.8 floor; 44px is the touch size (rule 2.2). Use as minWidth and minHeight.
  target: { min: 24, touch: 44 },
  // Focus ring: the colour must reach 3:1 against what it sits on (WCAG 1.4.11).
  focusRing: { width: 2, offset: 2, color: 'Highlight' }, // set the colour to your accent
  scrollPaddingTop: 0, // px; set to the sticky header height (WCAG 2.4.11)
  measure: '60ch', // readable line length (rule 3.4)
  reducedMotion: { duration: 150 }, // ms, for transitions that move (rule 11.2)
} as const;

// Roles MUI's palette has no slot for. Same placeholders as the palette above.
export const guidanceExtraColors = {
  light: {
    primaryContainer: '{L.primary-container}', onPrimaryContainer: '{L.on-primary-container}',
    secondaryContainer: '{L.secondary-container}', onSecondaryContainer: '{L.on-secondary-container}',
    tertiaryContainer: '{L.tertiary-container}', onTertiaryContainer: '{L.on-tertiary-container}',
    errorContainer: '{L.error-container}', onErrorContainer: '{L.on-error-container}',
    successContainer: '{L.success-container}', onSuccessContainer: '{L.on-success-container}',
    warningContainer: '{L.warning-container}', onWarningContainer: '{L.on-warning-container}',
    surfaceContainerLowest: '{L.surface-container-lowest}', surfaceContainer: '{L.surface-container}',
    surfaceContainerHigh: '{L.surface-container-high}', surfaceContainerHighest: '{L.surface-container-highest}',
    outline: '{L.outline}',
    inverseSurface: '{L.inverse-surface}', inverseOnSurface: '{L.inverse-on-surface}', inversePrimary: '{L.inverse-primary}',
    chart: ['{L.chart-1}', '{L.chart-2}', '{L.chart-3}', '{L.chart-4}', '{L.chart-5}'],
  },
  dark: {
    primaryContainer: '{D.primary-container}', onPrimaryContainer: '{D.on-primary-container}',
    secondaryContainer: '{D.secondary-container}', onSecondaryContainer: '{D.on-secondary-container}',
    tertiaryContainer: '{D.tertiary-container}', onTertiaryContainer: '{D.on-tertiary-container}',
    errorContainer: '{D.error-container}', onErrorContainer: '{D.on-error-container}',
    successContainer: '{D.success-container}', onSuccessContainer: '{D.on-success-container}',
    warningContainer: '{D.warning-container}', onWarningContainer: '{D.on-warning-container}',
    surfaceContainerLowest: '{D.surface-container-lowest}', surfaceContainer: '{D.surface-container}',
    surfaceContainerHigh: '{D.surface-container-high}', surfaceContainerHighest: '{D.surface-container-highest}',
    outline: '{D.outline}',
    inverseSurface: '{D.inverse-surface}', inverseOnSurface: '{D.inverse-on-surface}', inversePrimary: '{D.inverse-primary}',
    chart: ['{D.chart-1}', '{D.chart-2}', '{D.chart-3}', '{D.chart-4}', '{D.chart-5}'],
  },
} as const;
```
