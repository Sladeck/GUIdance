# Token format: Jetpack Compose (Android, Material 3)

**Contents:** file to create, wiring, filling it in; then the template: spacing, targets, density roles, radius, shape roles, Material shapes, elevation, motion, typography, light and dark colour schemes, extended colours, and the `GuidanceTheme` composable.

**File to create:** `GuidanceTheme.kt` in the package that holds the project's theme (often `ui/theme`). Never overwrite an existing file. A project that already calls `MaterialTheme(` with its own `colorScheme` keeps its theme: edit its values where they are defined and add only what is missing.

**Wiring:** wrap the app's content in `GuidanceTheme { ... }` where the project sets its content.

**Filling it in**
- Fixed values (spacing, radius, elevation, type, motion, targets) are filled from `../data/scales/` and `../data/accessibility.md`.
- Density and shape roles are filled for the default density and the soft shape. For another preset, take the values from the Density and Shape presets tables in `../data/scales/spacing-density.md` and `../data/scales/shape.md`. The preset is recorded in `design-decisions.md` (`decisions.md`), not here. `card` and `page` hold the phone-width values: take them from the Phone widths line of `../data/scales/spacing-density.md` (card 12, 16, 24; page 16), and the table's values go in `wide()`.
- Control and row heights are minimums and never go under 48dp, Android's touch size (rules 2.2, 4.7): compact and default 48, comfortable 48. Apply them as a minimum height, never a fixed one, so text can grow (rule 3.6).
- `{L.role}` and `{D.role}` are the light and dark colours of that role, from the colour set built in setup (`../data/colour/building.md`). Write each as `Color(0xFFRRGGBB)`.
- Material's roles are parameters of `lightColorScheme` and `darkColorScheme`. `background` and `onBackground` take the `surface` and `on-surface` values, because Material's screens paint with them; `surfaceVariant` takes `surface-container-highest` (judgment). `surfaceDim`, `surfaceBright` and `scrim` keep Material's defaults. `success`, `warning` and the chart colours are not Material roles: they go in `ExtendedColors`.
- Dynamic colour: if the existing theme switches to a wallpaper-based scheme on Android 12 and later (look for `dynamicColor`), the colours checked in setup are replaced on those devices. Say so and ask whether to turn it off.
- Shape roles reach a component only where they are passed: give `shape = RadiusRole.button` and the others at the call site or in the project's own wrappers. Stock Material components keep their own default shapes otherwise; which `Shapes` slot each one reads was not checked, so do not rely on `GuidanceShapes` to move them.
- A page with its own density (rule 4.7): wrap it in `CompositionLocalProvider(LocalSpace provides ...)` with the other preset. The same provider on a dialog's content keeps it at default in a compact product.
- Sizes are in `sp` so text follows the system font size (rule 3.6).
- Not in this file, with the reason: focus indicators (drawn by the system and the components); line length (rule 3.4 applies, but the width depends on the font); a reduced-motion switch (rule 11.2 names the web and Apple mechanisms only; the Android one was not checked).
- Import from `androidx.compose.material3`, never `androidx.compose.material`: both have `Typography`, `Shapes` and `MaterialTheme`. `Color` is `androidx.compose.ui.graphics.Color`.
- Checked on the Android reference on 2026-11-17: `lightColorScheme` and its parameter names, `darkColorScheme`, `MaterialTheme(colorScheme, shapes, typography, content)`, the `Typography` parameter names, `Shapes(extraSmall, small, medium, large, extraLarge)`, `RoundedCornerShape(size: Dp)`, `CircleShape`, `CubicBezierEasing`, `staticCompositionLocalOf`, `CompositionLocalProvider`, `isSystemInDarkTheme`, `@Immutable`. Not checked: the import paths below, and compilation (no Kotlin compiler was available).

```kotlin
// GUIdance design tokens. Density and shape presets and tuning: design-decisions.md.
// Sources: Material 3 spacing, shape, type and motion tokens; WCAG 2.2; Android accessibility.
import androidx.compose.animation.core.CubicBezierEasing
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Shapes
import androidx.compose.material3.Typography
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

object Space {
    val s0 = 0.dp;   val s25 = 2.dp;   val s50 = 4.dp;   val s75 = 6.dp
    val s100 = 8.dp; val s125 = 10.dp; val s150 = 12.dp; val s175 = 14.dp
    val s200 = 16.dp; val s250 = 20.dp; val s300 = 24.dp; val s400 = 32.dp
    val s450 = 36.dp; val s500 = 40.dp; val s600 = 48.dp; val s700 = 56.dp
    val s800 = 64.dp; val s900 = 72.dp
}

// Targets: 24dp is the WCAG 2.5.8 floor, 48dp the Android touch size.
object Target { val min = 24.dp; val touch = 48.dp }

// Density roles (rule 4.7). Change with /guidance spacing; roles point at scale steps.
@Immutable
data class SpaceRoles(
    val inline: Dp, val control: Dp, val stack: Dp, val field: Dp,
    val card: Dp, val group: Dp, val section: Dp, val page: Dp,
    val controlHeight: Dp, val rowHeight: Dp, // minimum heights
) {
    // From 600dp wide: card and page take the Density table's values (rule 4.6).
    fun wide() = copy(card = Space.s300, page = Space.s300)
}

val DefaultSpace = SpaceRoles(
    inline = Space.s100, control = Space.s200, stack = Space.s100, field = Space.s200,
    card = Space.s200, group = Space.s300, section = Space.s400, page = Space.s200,
    controlHeight = Target.touch, rowHeight = Target.touch,
)

val LocalSpace = staticCompositionLocalOf { DefaultSpace }

// Radius: Material 3 corner scale. Nested corners: inner = outer - padding (rule 5.2).
object Radius {
    val none = 0.dp; val xs = 4.dp; val sm = 8.dp; val md = 12.dp; val lg = 16.dp
    val lgIncreased = 20.dp; val xl = 28.dp; val xlIncreased = 32.dp; val xxl = 48.dp
}

// Shape roles (rule 5.5). Change with /guidance shape. "full" is CircleShape. Pass them as shape = ...
object RadiusRole {
    val button = RoundedCornerShape(Radius.sm)
    val field = RoundedCornerShape(Radius.sm)
    val chip = RoundedCornerShape(Radius.sm)
    val card = RoundedCornerShape(Radius.sm)
    val overlay = RoundedCornerShape(Radius.md)
}

// The radius scale in Material's five slots.
val GuidanceShapes = Shapes(
    extraSmall = RoundedCornerShape(Radius.xs),
    small = RoundedCornerShape(Radius.sm),
    medium = RoundedCornerShape(Radius.md),
    large = RoundedCornerShape(Radius.lg),
    extraLarge = RoundedCornerShape(Radius.xl),
)

// Elevation heights of the six Material levels (rule 5.3).
object Elevation {
    val level0 = 0.dp; val level1 = 1.dp; val level2 = 3.dp
    val level3 = 6.dp; val level4 = 8.dp; val level5 = 12.dp
}

// Motion: Material 3 durations in ms and easing (rule 11.1).
object Motion {
    const val short1 = 50;   const val short2 = 100;  const val short3 = 150;  const val short4 = 200
    const val medium1 = 250; const val medium2 = 300; const val medium3 = 350; const val medium4 = 400
    const val long1 = 450;   const val long2 = 500;   const val long3 = 550;   const val long4 = 600
    val standard = CubicBezierEasing(0.2f, 0f, 0f, 1f)
    val standardDecelerate = CubicBezierEasing(0f, 0f, 0f, 1f)
    val standardAccelerate = CubicBezierEasing(0.3f, 0f, 1f, 1f)
    val emphasizedDecelerate = CubicBezierEasing(0.05f, 0.7f, 0.1f, 1f)
    val emphasizedAccelerate = CubicBezierEasing(0.3f, 0f, 0.8f, 0.15f)
}

// Type: the 5-style subset of the Material scale (rule 3.1). All 15 styles: ../data/scales/type.md.
val GuidanceTypography = Typography(
    headlineLarge = TextStyle(fontSize = 32.sp, lineHeight = 40.sp, fontWeight = FontWeight.Normal),
    titleLarge = TextStyle(fontSize = 22.sp, lineHeight = 28.sp, fontWeight = FontWeight.Normal),
    bodyLarge = TextStyle(fontSize = 16.sp, lineHeight = 24.sp, fontWeight = FontWeight.Normal),
    bodyMedium = TextStyle(fontSize = 14.sp, lineHeight = 20.sp, fontWeight = FontWeight.Normal),
    labelMedium = TextStyle(fontSize = 12.sp, lineHeight = 16.sp, fontWeight = FontWeight.Medium),
)

val LightColors = lightColorScheme(
    primary = {L.primary}, onPrimary = {L.on-primary},
    primaryContainer = {L.primary-container}, onPrimaryContainer = {L.on-primary-container},
    secondary = {L.secondary}, onSecondary = {L.on-secondary},
    secondaryContainer = {L.secondary-container}, onSecondaryContainer = {L.on-secondary-container},
    tertiary = {L.tertiary}, onTertiary = {L.on-tertiary},
    tertiaryContainer = {L.tertiary-container}, onTertiaryContainer = {L.on-tertiary-container},
    error = {L.error}, onError = {L.on-error},
    errorContainer = {L.error-container}, onErrorContainer = {L.on-error-container},
    background = {L.surface}, onBackground = {L.on-surface},
    surface = {L.surface}, onSurface = {L.on-surface},
    surfaceVariant = {L.surface-container-highest}, onSurfaceVariant = {L.on-surface-variant},
    surfaceContainerLowest = {L.surface-container-lowest}, surfaceContainerLow = {L.surface-container-low},
    surfaceContainer = {L.surface-container}, surfaceContainerHigh = {L.surface-container-high},
    surfaceContainerHighest = {L.surface-container-highest},
    outline = {L.outline}, outlineVariant = {L.outline-variant},
    inverseSurface = {L.inverse-surface}, inverseOnSurface = {L.inverse-on-surface},
    inversePrimary = {L.inverse-primary},
)

// DarkColors: the same call with darkColorScheme( and the {D.role} values.

@Immutable
data class ExtendedColors(
    val success: Color, val onSuccess: Color,
    val successContainer: Color, val onSuccessContainer: Color,
    val warning: Color, val onWarning: Color,
    val warningContainer: Color, val onWarningContainer: Color,
    val chart: List<Color>, // chart-1 to chart-5
)

val LightExtended = ExtendedColors(/* {L.success} ... {L.chart-5} */)
val DarkExtended = ExtendedColors(/* {D.success} ... {D.chart-5} */)

val LocalExtendedColors = staticCompositionLocalOf { LightExtended }

@Composable
fun GuidanceTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    space: SpaceRoles = DefaultSpace, // pass DefaultSpace.wide() from 600dp wide
    content: @Composable () -> Unit,
) {
    CompositionLocalProvider(
        LocalExtendedColors provides if (darkTheme) DarkExtended else LightExtended,
        LocalSpace provides space,
    ) {
        MaterialTheme(
            colorScheme = if (darkTheme) DarkColors else LightColors,
            shapes = GuidanceShapes,
            typography = GuidanceTypography,
            content = content,
        )
    }
}
```

**Platform rules that touch this file:** scrolling content draws behind the system bars and controls stay clear of them (rule 13.7); custom swipe areas do not fight the back and home gestures (rule 13.8); a navigation bar under 600dp wide, a rail above (rule 13.9); modal bottom sheets on phones only (rule 13.10).
