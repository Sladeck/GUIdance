# Token format: SwiftUI (iOS, iPadOS, macOS)

**Contents:** files to create, wiring, filling it in; then the template: spacing, targets, density roles, radius, shape roles, colour roles, type, motion, and how a view uses them.

**Files to create:** `GuidanceTokens.swift` next to the project's existing theme or style code, and one colour set per colour role in the asset catalog, each with an Any and a Dark appearance. Never overwrite an existing file. A project that already has colour sets or a `Color` extension keeps them: map the roles onto its names and add only what is missing.

**Wiring:** `.tint(Palette.primary)` on the root view, so system buttons, toggles and links take the brand colour.

**Filling it in**
- Fixed values (spacing, radius, motion, targets) are filled from `../data/scales/` and `../data/accessibility.md`, in points.
- Density and shape roles are filled for the default density and the soft shape. For another preset, take the values from the Density and Shape presets tables in `../data/scales/spacing-density.md` and `../data/scales/shape.md`. The preset is recorded in `design-decisions.md` (`decisions.md`), not here. `card` and `page` hold the iPhone-width values: take them from the Phone widths line of `../data/scales/spacing-density.md` (card 12, 16, 24; page 16), and the table's values go in `wide`, for iPad and Mac.
- Control and row heights are the preset's height, never under the platform's default control size (rules 2.2, 4.7): on iOS and iPadOS 44, 44 and 48 for compact, default and comfortable; on macOS 32, 40 and 48. Apply them with `.frame(minHeight:)`, never a fixed height, so text can grow (rule 3.6).
- A page with its own density (rule 4.7): `.environment(\.spaceRoles, ...)` on that page with the other preset. The same modifier on a sheet's content keeps it at default in a compact product.
- Shape "full" (pills) is `Capsule()`, not a number: a role set to full uses that shape where it is applied.
- Colours: `{L.role}` goes in the Any appearance of the role's colour set and `{D.role}` in its Dark appearance, from the colour set built in setup (`../data/colour/building.md`). `Color("name")` reads a colour set by name and follows light and dark by itself. The roles live in a `Palette` namespace because SwiftUI already defines `Color.primary` and `Color.secondary`. The file format of a colour set was not checked: copy one the project already has as the model, or let the user create them in Xcode.
- Type: Apple platforms use the system text styles, not the Material sizes (rule 3.1). They follow Dynamic Type without extra work (rule 3.6). The mapping of GUIdance's five styles onto them is judgment. `TypeRole.headline` is GUIdance's largest style and maps to `.largeTitle`; it is not Apple's `.headline` text style.
- Not in this file, with the reason: shadow tokens (Material's six levels are an Android and web convention; Apple platforms separate surfaces with system backgrounds and materials, and rule 5.3's one cue per surface still applies; judgment); focus indicators (drawn by the system); line length (rule 3.4 applies, but the width depends on the font).
- Checked on Apple's documentation on 2026-11-17: `Color(_:bundle:)`, `Font.TextStyle` and its cases, `Animation.timingCurve(_:_:_:_:duration:)`, `ScaledMetric` with `relativeTo:`, and the environment values `accessibilityReduceMotion` and `colorScheme`. The code block below was type-checked with the Swift compiler against the macOS SDK on the same day.

```swift
// GUIdance design tokens. Density and shape presets and tuning: design-decisions.md.
// Sources: Material 3 spacing, shape and motion tokens; WCAG 2.2; Apple HIG.
import SwiftUI

enum Space {
    static let s0: CGFloat = 0,   s25: CGFloat = 2,   s50: CGFloat = 4,   s75: CGFloat = 6
    static let s100: CGFloat = 8, s125: CGFloat = 10, s150: CGFloat = 12, s175: CGFloat = 14
    static let s200: CGFloat = 16, s250: CGFloat = 20, s300: CGFloat = 24, s400: CGFloat = 32
    static let s450: CGFloat = 36, s500: CGFloat = 40, s600: CGFloat = 48, s700: CGFloat = 56
    static let s800: CGFloat = 64, s900: CGFloat = 72
}

// Targets: 24pt is the WCAG 2.5.8 floor; the default control size is 44pt on iOS and iPadOS, 28pt on macOS.
enum Target {
    static let min: CGFloat = 24
    #if os(macOS)
    static let control: CGFloat = 28
    #else
    static let control: CGFloat = 44
    #endif
}

// Density roles (rule 4.7). Change with /guidance spacing; roles point at scale steps.
struct SpaceRoles {
    var inline: CGFloat, control: CGFloat, stack: CGFloat, field: CGFloat
    var card: CGFloat, group: CGFloat, section: CGFloat, page: CGFloat
    var controlHeight: CGFloat, rowHeight: CGFloat // minimum heights

    static let standard = SpaceRoles(
        inline: Space.s100, control: Space.s200, stack: Space.s100, field: Space.s200,
        card: Space.s200, group: Space.s300, section: Space.s400, page: Space.s200,
        controlHeight: max(40, Target.control), rowHeight: max(40, Target.control)
    )

    // iPad and Mac widths: card and page take the Density table's values (rule 4.6).
    var wide: SpaceRoles {
        var roles = self
        roles.card = Space.s300
        roles.page = Space.s300
        return roles
    }
}

private struct SpaceRolesKey: EnvironmentKey {
    static let defaultValue = SpaceRoles.standard
}

extension EnvironmentValues {
    var spaceRoles: SpaceRoles {
        get { self[SpaceRolesKey.self] }
        set { self[SpaceRolesKey.self] = newValue }
    }
}

// Radius: Material 3 corner scale. Nested corners: inner = outer - padding (rule 5.2).
enum Radius {
    static let none: CGFloat = 0, xs: CGFloat = 4, sm: CGFloat = 8, md: CGFloat = 12, lg: CGFloat = 16
    static let lgIncreased: CGFloat = 20, xl: CGFloat = 28, xlIncreased: CGFloat = 32, xxl: CGFloat = 48
}

// Shape roles (rule 5.5). Change with /guidance shape. One shape for the product, so these are constants.
enum RadiusRole {
    static let button = Radius.sm
    static let field = Radius.sm
    static let chip = Radius.sm
    static let card = Radius.sm
    static let overlay = Radius.md
}

// Colour roles: one colour set per role in the asset catalog, Any and Dark appearances.
enum Palette {
    static let primary = Color("primary"), onPrimary = Color("on-primary")
    static let primaryContainer = Color("primary-container"), onPrimaryContainer = Color("on-primary-container")
    // The same four for secondary, tertiary, error, success and warning.
    static let surface = Color("surface")
    static let surfaceContainerLowest = Color("surface-container-lowest")
    static let surfaceContainerLow = Color("surface-container-low")
    static let surfaceContainer = Color("surface-container")
    static let surfaceContainerHigh = Color("surface-container-high")
    static let surfaceContainerHighest = Color("surface-container-highest")
    static let onSurface = Color("on-surface"), onSurfaceVariant = Color("on-surface-variant")
    static let outline = Color("outline"), outlineVariant = Color("outline-variant")
    static let inverseSurface = Color("inverse-surface"), inverseOnSurface = Color("inverse-on-surface")
    static let inversePrimary = Color("inverse-primary")
    static let chart = [Color("chart-1"), Color("chart-2"), Color("chart-3"), Color("chart-4"), Color("chart-5")]
}

// Type: system text styles (rule 3.1). Mapping from GUIdance's subset is judgment.
enum TypeRole {
    static let headline = Font.TextStyle.largeTitle
    static let title = Font.TextStyle.title2
    static let body = Font.TextStyle.body
    static let bodySmall = Font.TextStyle.subheadline
    static let label = Font.TextStyle.caption
}

// Motion: Material 3 durations in seconds and easing (rule 11.1).
enum Motion {
    static let short1 = 0.05, short2 = 0.1, short3 = 0.15, short4 = 0.2
    static let medium1 = 0.25, medium2 = 0.3, medium3 = 0.35, medium4 = 0.4
    static let long1 = 0.45, long2 = 0.5, long3 = 0.55, long4 = 0.6
    static func standard(_ duration: Double = short4) -> Animation {
        .timingCurve(0.2, 0, 0, 1, duration: duration)
    }
    static func standardDecelerate(_ duration: Double = short4) -> Animation {
        .timingCurve(0, 0, 0, 1, duration: duration)
    }
    static func standardAccelerate(_ duration: Double = short4) -> Animation {
        .timingCurve(0.3, 0, 1, 1, duration: duration)
    }
    static func enter(_ duration: Double = medium2) -> Animation {
        .timingCurve(0.05, 0.7, 0.1, 1, duration: duration)
    }
    static func exit(_ duration: Double = short4) -> Animation {
        .timingCurve(0.3, 0, 0.8, 0.15, duration: duration)
    }
}

// How a view uses them.
struct ExampleCard: View {
    @Environment(\.spaceRoles) private var space
    @Environment(\.accessibilityReduceMotion) private var reduceMotion // rule 11.2: fade, do not move, when true
    @ScaledMetric(relativeTo: .body) private var iconSize: CGFloat = 24 // a custom size that follows Dynamic Type

    var body: some View {
        Text("Example")
            .font(.system(TypeRole.body))
            .foregroundStyle(Palette.onSurface)
            .padding(space.card)
            .frame(minHeight: space.rowHeight)
            .background(Palette.surfaceContainer, in: RoundedRectangle(cornerRadius: RadiusRole.card))
            .animation(reduceMotion ? nil : Motion.standard(), value: iconSize)
    }
}
```

**Platform rules that touch this file:** content and controls stay inside the safe area (rule 13.7); custom gestures do not conflict with system gestures, and a hierarchy keeps its Back button (rule 13.8); a tab bar for top-level sections, a sidebar where there is room (rule 13.9); sheets one at a time, closed with Cancel or Done (rule 13.10).
