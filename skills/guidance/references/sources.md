# Sources, ranked

Checked on 2026-11-02. Keys match the tags in the rules.

## How sources are weighted

A source's weight comes from two things: how its guidance is produced (sample size, method, published evidence) and how much users depend on it (a platform convention that billions of people already know carries weight even when its research is not published).

| Tier | What it means | Sources |
| --- | --- | --- |
| **S: Standard** | International consensus standard, referenced by law (EU European Accessibility Act via EN 301 549, US ADA and Section 508 practice). Wins every conflict it covers. | W3C WCAG 2.2 |
| **A: Platform authority** | Defines what users already expect on that platform, backed by large internal research and use on billions of devices. Research mostly unpublished, so weight comes from scale and convention. Wins on its own platform. | Apple HIG, Google Material 3 and Android accessibility |
| **A: Large-scale research** | Published methodology with large samples. | Baymard Institute (200,000+ research hours, 4,400+ moderated test sessions on 240+ sites, quantitative surveys of 1,000+ people per study; e-commerce focused). GOV.UK Design System (patterns validated before inclusion, evidence from user research plus analytics on national services used by millions; transactional public services) |
| **B: Expert research** | Decades of studies, but most are qualitative with small samples (NN/g itself says 5 users find problems but do not produce reliable numbers; quantitative claims need 40+). Strong on what goes wrong, weaker on exact thresholds. Some articles are expert guidelines rather than single studies. | Nielsen Norman Group |
| **C: Secondary** | Summaries or tutorials of other sources. Used only where they add a formula or a clean statement; never decisive. | Laws of UX, 30 seconds of code |
| **Judgment** | No source; reasoning from the rules above. Lowest weight; always labelled. | (none) |

## Conflict rule

1. Higher tier wins.
2. Same tier: context decides. Apple on Apple platforms, Material on Android, Baymard for commerce and long forms, GOV.UK for public or one-question-per-page services, WCAG plus research for the general web.
3. A tier A or B rule can never relax a tier S requirement, only add to it.

## Source list

| Key | Tier | Source | Link |
| --- | --- | --- | --- |
| WCAG-1.4.3 | S | W3C, Understanding SC 1.4.3 Contrast (Minimum) | https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html |
| WCAG-1.4.11 | S | W3C, Understanding SC 1.4.11 Non-text Contrast | https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html |
| WCAG-1.4.8 | S (AAA) | W3C, SC 1.4.8 Visual Presentation (line length), as cited by Baymard | https://baymard.com/research-articles/line-length-readability |
| WCAG-1.4.10 | S | W3C, Understanding SC 1.4.10 Reflow | https://www.w3.org/WAI/WCAG22/Understanding/reflow.html |
| WCAG-2.4.7 | S | W3C, Understanding SC 2.4.7 Focus Visible | https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html |
| WCAG-2.4.11 | S | W3C, Understanding SC 2.4.11 Focus Not Obscured (Minimum) | https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html |
| WCAG-2.5.8 | S | W3C, Understanding SC 2.5.8 Target Size (Minimum) | https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html |
| WCAG-2.2 | S | W3C, What's New in WCAG 2.2 | https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22 |
| WCAG-C39 | S (AAA) | W3C Technique C39, prefers-reduced-motion (SC 2.3.3) | https://www.w3.org/WAI/WCAG22/Techniques/css/C39.html |
| APPLE-A11Y | A | Apple HIG, Accessibility (control sizes, spacing, contrast, reduce motion) | https://developer.apple.com/design/human-interface-guidelines/accessibility |
| APPLE-TYPE | A | Apple HIG, Typography | https://developer.apple.com/design/human-interface-guidelines/typography |
| APPLE-ALERTS | A | Apple HIG, Alerts | https://developer.apple.com/design/human-interface-guidelines/alerts |
| ANDROID-TARGET | A | Google, Android Accessibility Help: Touch target size | https://support.google.com/accessibility/android/answer/7101858 |
| M3-SPACING | A | Material Design 3, Spacing (overview, tokens) and Grids & spacing | https://m3.material.io/styles/spacing/tokens |
| M3-SHAPE | A | Material Design 3, Corner radius scale | https://m3.material.io/styles/shape/corner-radius-scale |
| M3-TYPE | A | Material Design 3, Type scale and tokens | https://m3.material.io/styles/typography/type-scale-tokens |
| M3-COLOR | A | Material Design 3, Color roles and How the system works | https://m3.material.io/styles/color/roles |
| M3-COLOR-SPEC | A | material-color-utilities: role tones (color_spec_2021) and scheme variants (dynamic_scheme) | https://github.com/material-foundation/material-color-utilities |
| M3-MOTION | A | Material Design 3, Easing and duration tokens | https://m3.material.io/styles/motion/easing-and-duration/tokens-specs |
| M3-ELEVATION | A | Material Design 3 elevation: levels and shadow values from Google's Material Web source (elevation and md-sys-elevation tokens) | https://material-web.dev/components/elevation |
| M3-ICONS | A | Google Fonts, Material Symbols guide (sizes, weight, grade) | https://developers.google.com/fonts/docs/material_symbols |
| M3-WINDOW | A | Android Developers, Use window size classes (Material 3 breakpoints) | https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes |
| BAY-COLUMNS | A | Baymard Institute, Avoid Multi-Column Forms | https://baymard.com/research-articles/avoid-multi-column-forms |
| BAY-INLINE | A | Baymard Institute, Inline Form Validation | https://baymard.com/research-articles/inline-form-validation |
| BAY-LINE | A | Baymard Institute, Line Length Readability | https://baymard.com/research-articles/line-length-readability |
| BAY-METHOD | A | Baymard Institute, Research methodology | https://baymard.com/research/methodology |
| GOVUK-VALID | A | GOV.UK Design System, Recover from validation errors | https://design-system.service.gov.uk/patterns/validation |
| NNG-RESPONSE | B | NN/g, Response Times: The 3 Important Limits | https://www.nngroup.com/articles/response-times-3-important-limits/ |
| NNG-SKELETON | B | NN/g, Skeleton Screens 101 | https://www.nngroup.com/articles/skeleton-screens/ |
| NNG-ERR | B | NN/g, Error-Message Guidelines | https://www.nngroup.com/articles/error-message-guidelines/ |
| NNG-PROX | B | NN/g, Proximity Principle in Visual Design | https://www.nngroup.com/articles/gestalt-proximity/ |
| NNG-HIER | B | NN/g, Visual Hierarchy in UX | https://www.nngroup.com/articles/visual-hierarchy-ux-definition/ |
| NNG-CONFIRM | B | NN/g, Confirmation Dialogs | https://www.nngroup.com/articles/confirmation-dialog/ |
| NNG-PLACEHOLDER | B | NN/g, Placeholders in Form Fields Are Harmful | https://www.nngroup.com/videos/placeholders-form-fields/ |
| NNG-SAMPLE | B | NN/g, 5 Test Users: Okay for Qual, Wrong for Quant | https://www.nngroup.com/articles/5-test-users-qual-quant/ |
| TW-THEME | stack | Tailwind CSS v4, Theme variables | https://tailwindcss.com/docs/theme |
| TW-DARK | stack | Tailwind CSS v4, Dark mode | https://tailwindcss.com/docs/dark-mode |
| MUI-DARK | stack | MUI, Dark mode | https://mui.com/material-ui/customization/dark-mode/ |
| MUI-CSSVARS | stack | MUI, CSS theme variables configuration | https://mui.com/material-ui/customization/css-theme-variables/configuration/ |
| SHADCN-THEME | stack | shadcn/ui, Theming | https://ui.shadcn.com/docs/theming |
| BS-SASS | stack | Bootstrap 5.3, Sass customization and _variables.scss | https://getbootstrap.com/docs/5.3/customize/sass/ |
| BS-COLOR-MODES | stack | Bootstrap 5.3, Color modes | https://getbootstrap.com/docs/5.3/customize/color-modes/ |
| PRIMER-COLOR | B | GitHub Primer, Color primitives (neutral backgrounds, one accent) | https://primer.style/foundations/primitives/color |
| CARBON-COLOR | B | IBM Carbon Design System, Color overview | https://carbondesignsystem.com/elements/color/overview/ |
| RADIX-COMPOSE | B | Radix Colors, Composing a palette (accent and gray pairing) | https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette |
| LAWS-PROX | C | Laws of UX, Law of Proximity | https://lawsofux.com/law-of-proximity/ |
| NESTED-RADIUS | C | 30 seconds of code, Nested border radius | https://30secondsofcode.org/css/s/nested-border-radius |

"stack" sources are documentation for writing tokens in a given framework, not design evidence. The values taken from every source are in `data/`.

Notes:
- Replaced earlier secondary citations (DAISY summaries of WCAG, a Flutter constant for Apple's 44pt) with the primary W3C and Apple pages.
- Material 3 and Apple pages were read directly on 2026-11-02; colour, type-scale and stack pages on 2026-11-14.
- Re-check yearly: WCAG 3, Material and Apple HIG all move.
