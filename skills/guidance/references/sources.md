# Sources, ranked

**Contents:** how sources are weighted (the tiers), the conflict rule, then the source list: every key with its tier, source and link, and notes on when each group was checked.

Checked between 2026-11-02 and 2026-11-17; the Notes give the date per group. Keys match the tags in the rules.

## How sources are weighted

A source's weight comes from two things: how its guidance is produced (sample size, method, published evidence) and how much users depend on it (a platform convention that billions of people already know carries weight even when its research is not published).

| Tier | What it means | Sources |
| --- | --- | --- |
| **S: Standard** | International consensus standard, referenced by law (EU European Accessibility Act via EN 301 549, US ADA and Section 508 practice). Wins every conflict it covers. | W3C WCAG 2.2 |
| **A: Platform authority** | Defines what users already expect on that platform, backed by large internal research and use on billions of devices. Research mostly unpublished, so weight comes from scale and convention. Wins on its own platform. | Apple HIG, Google Material 3 and Android accessibility |
| **A: Large-scale research** | Published methodology with large samples. | Baymard Institute (200,000+ research hours, 4,400+ moderated test sessions on 240+ sites, quantitative surveys of 1,000+ people per study; e-commerce focused). GOV.UK Design System (patterns validated before inclusion, evidence from user research plus analytics on national services used by millions; transactional public services) |
| **A: Peer-reviewed, large sample** | Peer-reviewed studies with 400 or more participants, or field data at scale. Measured effects, but each is one study: a number from it is evidence, not a platform standard. | `SCI-*` keys marked A |
| **B: Expert research** | Decades of studies, but most are qualitative with small samples (NN/g itself says 5 users find problems but do not produce reliable numbers; quantitative claims need 40+). Strong on what goes wrong, weaker on exact thresholds. Some articles are expert guidelines rather than single studies. | Nielsen Norman Group |
| **B: Peer-reviewed experiments** | Controlled, peer-reviewed experiments with smaller samples (tens to a few hundred people). Good on the direction of an effect, weaker on exact thresholds. | `SCI-*` keys marked B |
| **B: Product design systems** | How large products solved a problem, documented by their own teams. Shows established practice, not measured evidence, and they can disagree with each other. | GitHub Primer, IBM Carbon, SAP Fiori, AWS Cloudscape |
| **C: Secondary** | Summaries or tutorials of other sources. Used only where they add a formula or a clean statement; never decisive. | Laws of UX, 30 seconds of code |
| **Judgment** | No source; reasoning from the rules above. Lowest weight; always labelled. | (none) |

## Conflict rule

1. Higher tier wins.
2. Same tier: context decides. Apple on Apple platforms, Material on Android, Baymard for commerce and long forms, GOV.UK for public or one-question-per-page services, WCAG plus research for the general web.
3. A tier A or B rule can never relax a tier S requirement, only add to it.

## Source list

| Key | Tier | Source | Link |
| --- | --- | --- | --- |
| WCAG-1.3.4 | S | W3C, Understanding SC 1.3.4 Orientation (Level AA) | https://www.w3.org/WAI/WCAG22/Understanding/orientation.html |
| WCAG-1.3.5 | S | W3C, Understanding SC 1.3.5 Identify Input Purpose (Level AA) | https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html |
| WCAG-1.4.1 | S | W3C, Understanding SC 1.4.1 Use of Color (Level A) | https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html |
| WCAG-1.4.2 | S | W3C, Understanding SC 1.4.2 Audio Control (Level A) | https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html |
| WCAG-1.4.3 | S | W3C, Understanding SC 1.4.3 Contrast (Minimum) | https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html |
| WCAG-1.4.11 | S | W3C, Understanding SC 1.4.11 Non-text Contrast | https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html |
| WCAG-1.4.4 | S | W3C, Understanding SC 1.4.4 Resize Text (Level AA) | https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html |
| WCAG-1.4.8 | S (AAA) | W3C, Understanding SC 1.4.8 Visual Presentation (line length) | https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html |
| WCAG-1.4.10 | S | W3C, Understanding SC 1.4.10 Reflow | https://www.w3.org/WAI/WCAG22/Understanding/reflow.html |
| WCAG-1.4.13 | S | W3C, Understanding SC 1.4.13 Content on Hover or Focus (Level AA) | https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html |
| WCAG-2.1.1 | S | W3C, Understanding SC 2.1.1 Keyboard (Level A) | https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html |
| WCAG-2.2.1 | S | W3C, Understanding SC 2.2.1 Timing Adjustable (Level A) | https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html |
| WCAG-2.2.2 | S | W3C, Understanding SC 2.2.2 Pause, Stop, Hide (Level A) | https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html |
| WCAG-2.3.1 | S | W3C, Understanding SC 2.3.1 Three Flashes or Below Threshold (Level A) | https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html |
| WCAG-2.4.3 | S | W3C, Understanding SC 2.4.3 Focus Order (Level A) | https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html |
| WCAG-2.4.7 | S | W3C, Understanding SC 2.4.7 Focus Visible | https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html |
| WCAG-2.4.11 | S | W3C, Understanding SC 2.4.11 Focus Not Obscured (Minimum) | https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html |
| WCAG-2.5.1 | S | W3C, Understanding SC 2.5.1 Pointer Gestures (Level A) | https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html |
| WCAG-2.5.2 | S | W3C, Understanding SC 2.5.2 Pointer Cancellation (Level A) | https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html |
| WCAG-2.5.4 | S | W3C, Understanding SC 2.5.4 Motion Actuation (Level A) | https://www.w3.org/WAI/WCAG22/Understanding/motion-actuation.html |
| WCAG-2.5.8 | S | W3C, Understanding SC 2.5.8 Target Size (Minimum) | https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html |
| WCAG-2.2 | S | W3C, What's New in WCAG 2.2 | https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22 |
| WCAG-C39 | S (AAA) | W3C Technique C39, prefers-reduced-motion (SC 2.3.3) | https://www.w3.org/WAI/WCAG22/Techniques/css/C39.html |
| APPLE-A11Y | A | Apple HIG, Accessibility (control sizes, spacing, contrast, reduce motion) | https://developer.apple.com/design/human-interface-guidelines/accessibility |
| APPLE-TYPE | A | Apple HIG, Typography | https://developer.apple.com/design/human-interface-guidelines/typography |
| APPLE-ALERTS | A | Apple HIG, Alerts | https://developer.apple.com/design/human-interface-guidelines/alerts |
| APPLE-LAYOUT | A | Apple HIG, Layout (safe areas, layout guides) | https://developer.apple.com/design/human-interface-guidelines/layout |
| APPLE-TABBAR | A | Apple HIG, Tab bars | https://developer.apple.com/design/human-interface-guidelines/tab-bars |
| APPLE-SIDEBAR | A | Apple HIG, Sidebars | https://developer.apple.com/design/human-interface-guidelines/sidebars |
| APPLE-SHEETS | A | Apple HIG, Sheets | https://developer.apple.com/design/human-interface-guidelines/sheets |
| APPLE-GESTURES | A | Apple HIG, Gestures | https://developer.apple.com/design/human-interface-guidelines/gestures |
| APPLE-KEYBOARDS | A | Apple HIG, Virtual keyboards | https://developer.apple.com/design/human-interface-guidelines/virtual-keyboards |
| ANDROID-TARGET | A | Google, Android Accessibility Help: Touch target size | https://support.google.com/accessibility/android/answer/7101858 |
| ANDROID-EDGE | A | Android Developers, Display content edge-to-edge | https://developer.android.com/develop/ui/views/layout/edge-to-edge |
| ANDROID-GESTURENAV | A | Android Developers, Ensure compatibility with gesture navigation | https://developer.android.com/develop/ui/views/touch-and-input/gestures/gesturenav |
| M3-DENSITY | A | Material Design 3, Grids & spacing: Density | https://m3.material.io/foundations/layout/grids-spacing/density |
| M3-SPACING | A | Material Design 3, Spacing (overview, tokens) and Grids & spacing | https://m3.material.io/styles/spacing/tokens |
| M3-SHAPE | A | Material Design 3, Corner radius scale | https://m3.material.io/styles/shape/corner-radius-scale |
| M3-TYPE | A | Material Design 3, Type scale and tokens | https://m3.material.io/styles/typography/type-scale-tokens |
| M3-COLOR | A | Material Design 3, Color roles and How the system works | https://m3.material.io/styles/color/roles |
| M3-COLOR-SPEC | A | material-color-utilities: role tones (color_spec_2021) | https://github.com/material-foundation/material-color-utilities |
| M3-MOTION | A | Material Design 3, Easing and duration tokens | https://m3.material.io/styles/motion/easing-and-duration/tokens-specs |
| M3-ELEVATION | A | Material Design 3 elevation: levels and shadow values from Google's Material Web source (elevation and md-sys-elevation tokens) | https://material-web.dev/components/elevation |
| M3-ICONS | A | Google Fonts, Material Symbols guide (sizes, weight, grade) | https://developers.google.com/fonts/docs/material_symbols |
| M3-WINDOW | A | Android Developers, Use window size classes (Material 3 breakpoints) | https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes |
| M3-NAVBAR | A | Material Design 3, Navigation bar guidelines | https://m3.material.io/components/navigation-bar/guidelines |
| M3-NAVRAIL | A | Material Design 3, Navigation rail guidelines | https://m3.material.io/components/navigation-rail/guidelines |
| M3-SHEETS | A | Material Design 3, Bottom sheets guidelines | https://m3.material.io/components/bottom-sheets/guidelines |
| BAY-COLUMNS | A | Baymard Institute, Avoid Multi-Column Forms | https://baymard.com/research-articles/avoid-multi-column-forms |
| BAY-INLINE | A | Baymard Institute, Inline Form Validation | https://baymard.com/research-articles/inline-form-validation |
| BAY-LINE | A | Baymard Institute, Line Length Readability | https://baymard.com/research-articles/line-length-readability |
| BAY-METHOD | A | Baymard Institute, Research methodology | https://baymard.com/research/methodology |
| GOVUK-VALID | A | GOV.UK Design System, Recover from validation errors | https://design-system.service.gov.uk/patterns/validation |
| GOVUK-INPUT | A | GOV.UK Design System, Text input (labels, no placeholder text) | https://design-system.service.gov.uk/components/text-input/ |
| NNG-RESPONSE | B | NN/g, Response Times: The 3 Important Limits | https://www.nngroup.com/articles/response-times-3-important-limits/ |
| NNG-SKELETON | B | NN/g, Skeleton Screens 101 | https://www.nngroup.com/articles/skeleton-screens/ |
| NNG-ERR | B | NN/g, Error-Message Guidelines | https://www.nngroup.com/articles/error-message-guidelines/ |
| NNG-PROX | B | NN/g, Proximity Principle in Visual Design | https://www.nngroup.com/articles/gestalt-proximity/ |
| NNG-HIER | B | NN/g, Visual Hierarchy in UX | https://www.nngroup.com/articles/visual-hierarchy-ux-definition/ |
| NNG-CONFIRM | B | NN/g, Confirmation Dialogs | https://www.nngroup.com/articles/confirmation-dialog/ |
| NNG-PLACEHOLDER | B | NN/g, Placeholders in Form Fields Are Harmful | https://www.nngroup.com/videos/placeholders-form-fields/ |
| NNG-SAMPLE | B | NN/g, 5 Test Users: Okay for Qual, Wrong for Quant | https://www.nngroup.com/articles/5-test-users-qual-quant/ |
| SCI-TAPS | A | Henze et al., 100,000,000 taps, MobileHCI 2011 (120,626,225 touch events from 91,731 installs) | https://doi.org/10.1145/2037373.2037395 |
| SCI-THUMB | B | Parhi et al., Target size study for one-handed thumb use on small touchscreen devices, MobileHCI 2006 | https://doi.org/10.1145/1152215.1152260 ; free copy: https://www.microsoft.com/en-us/research/?p=155150 |
| SCI-SWIPE | B | Yamanaka et al., Behavioral Differences between Tap and Swipe, CHI 2024 (crowdsourced) | https://doi.org/10.1145/3613904.3642272 |
| SCI-FIRSTIMP | B | Reinecke et al., Predicting users' first impressions of website aesthetics, CHI 2013 (242 people rated appeal, 548 over three experiments, 450 sites) | https://doi.org/10.1145/2470654.2481281 ; free copy: https://kgajos.seas.harvard.edu/papers/reinecke13aesthetics.pdf |
| SCI-PREF | A | Reinecke et al., Quantifying visual preferences around the world, CHI 2014 (2.4 million ratings, nearly 40,000 people) | https://doi.org/10.1145/2556288.2557052 ; free copy: https://kgajos.seas.harvard.edu/papers/reinecke14visual.pdf |
| SCI-VC-PT | B | Tuch et al., The role of visual complexity and prototypicality regarding first impression of websites, IJHCS 2012 | https://doi.org/10.1016/j.ijhcs.2012.06.003 ; free copy: https://research.google.com/pubs/archive/38315.pdf |
| SCI-STRUCT | B | Seckler et al., Linking objective design factors with subjective aesthetics, Computers in Human Behavior 2015 (194 people) | https://doi.org/10.1016/j.chb.2015.02.056 |
| SCI-FONTSIZE | B | Rello et al., Make It Big!, CHI 2016 (104 people, eye tracking) | https://doi.org/10.1145/2858036.2858204 |
| SCI-FONTS | B | Wallace et al., Towards Individuated Reading Experiences, ACM TOCHI 2022 (352 crowdsourced readers) | https://doi.org/10.1145/3502222 ; free copy: https://jeffhuang.com/papers/Readability_TOCHI22.pdf |
| SCI-SPACING | B | Wallace et al., Space for Readability, Journal of Vision 2022 (102 and 113 readers) | https://doi.org/10.1167/jov.22.14.3349 |
| SCI-DYSLEXIA | B | Rello et al., How to present more readable text for people with dyslexia, UAIS 2015 (92 people, eye tracking) | https://doi.org/10.1007/s10209-015-0438-8 ; free copy: https://repositori.upf.edu/items/e0ca6f40-a0fa-490f-9d03-53d043270deb |
| SCI-POLARITY-READ | A | Palmén et al., How bold can we be? Font grade in light and dark polarities, CHI 2023 (459 people) | https://doi.org/10.1145/3544548.3581552 |
| SCI-POLARITY | B | Buchner et al., Text-background polarity affects performance irrespective of ambient illumination and colour contrast, Ergonomics 2007 | https://doi.org/10.1080/00140130701306413 |
| SCI-LUMINANCE | B | Buchner et al., The advantage of positive text-background polarity is due to high display luminance, Ergonomics 2009 | https://doi.org/10.1080/00140130802641635 |
| SCI-POL-SIZE | B | Piepenbrock et al., Positive display polarity is particularly advantageous for small character sizes, Human Factors 2013 | https://doi.org/10.1177/0018720813515509 ; free copy: https://docserv.uni-duesseldorf.de/servlets/DerivateServlet/Derivate-31413 |
| SCI-POL-AGE | B | Piepenbrock et al., Positive display polarity is advantageous for both younger and older adults, Ergonomics 2013 | https://doi.org/10.1080/00140139.2013.790485 ; free copy: https://docserv.uni-duesseldorf.de/servlets/DerivateServlet/Derivate-31413 |
| SCI-VIS-POL | B | While et al., Dark Mode or Light Mode? Contrast polarity and visualization performance between age groups, IEEE VIS 2024 (104 people analysed) | https://doi.org/10.1109/vis55277.2024.00050 ; free copy: https://arxiv.org/abs/2409.10841 |
| SCI-WAIT-CLOCK | A | Tan et al., Counting the Wait: Effects of Temporal Feedback on Downstream Task Performance and Perceived Wait-Time Experience during System-Imposed Delays, CHI 2026 (425 people) | https://doi.org/10.1145/3772318.3790475 ; free copy: https://arxiv.org/abs/2602.04138 |
| SCI-WAIT-ANIM | A | Wang et al., Website Loading Animation and Perceived Waiting Time, JTAER 2025 (four experiments, 198 to 411 people each) | https://doi.org/10.3390/jtaer20040306 |
| SCI-FORM-ERR | B | Bargas-Avila et al., Usable error message presentation in the World Wide Web: Do not show errors right away, Interacting with Computers 2007 (77 and 90 people) | https://doi.org/10.1016/j.intcom.2007.01.003 ; free copy: https://edoc.unibas.ch/entities/publication/b7cc4232-bd8e-4573-afd9-313e02dea377 |
| SCI-FORMS | B | Seckler et al., Designing usable web forms, CHI 2014 (65 people, eye tracking) | https://doi.org/10.1145/2556288.2557265 ; free copy: https://research.google.com/pubs/archive/42513.pdf |
| SCI-GUIDE-COST | B | Falkowska et al., Utilization of Eye-Tracking Metrics to Evaluate User Experiences, Sensors 2025 (102 computer science students) | https://doi.org/10.3390/s25196101 ; free copy: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12526729/ |
| TW-THEME | stack | Tailwind CSS v4, Theme variables | https://tailwindcss.com/docs/theme |
| TW-DARK | stack | Tailwind CSS v4, Dark mode | https://tailwindcss.com/docs/dark-mode |
| MUI-DARK | stack | MUI, Dark mode | https://mui.com/material-ui/customization/dark-mode/ |
| MUI-CSSVARS | stack | MUI, CSS theme variables configuration | https://mui.com/material-ui/customization/css-theme-variables/configuration/ |
| SHADCN-THEME | stack | shadcn/ui, Theming | https://ui.shadcn.com/docs/theming |
| BS-SASS | stack | Bootstrap 5.3, Sass customization and _variables.scss | https://getbootstrap.com/docs/5.3/customize/sass/ |
| BS-COLOR-MODES | stack | Bootstrap 5.3, Color modes | https://getbootstrap.com/docs/5.3/customize/color-modes/ |
| COMPOSE-M3 | stack | Android Developers, androidx.compose.material3 reference (lightColorScheme, darkColorScheme, Shapes, Typography) | https://developer.android.com/reference/kotlin/androidx/compose/material3/package-summary |
| COMPOSE-CUSTOM | stack | Android Developers, Custom design systems in Compose | https://developer.android.com/develop/ui/compose/designsystems/custom |
| SWIFTUI-DOCS | stack | Apple Developer Documentation, SwiftUI (Color, Font.TextStyle, Animation, ScaledMetric, EnvironmentValues) | https://developer.apple.com/documentation/swiftui |
| PRIMER-COLOR | B | GitHub Primer, Color primitives (neutral backgrounds, one accent) | https://primer.style/foundations/primitives/color |
| CARBON-COLOR | B | IBM Carbon Design System, Color overview | https://carbondesignsystem.com/elements/color/overview/ |
| FIORI-DENSITY | B | SAP Fiori for Web, Content Density (Cozy and Compact) | https://www.sap.com/design-system/fiori-design-web/v1-154/foundations/visual/cozy-compact |
| CLOUDSCAPE-DENSITY | B | AWS Cloudscape Design System, Content density | https://cloudscape.design/foundation/visual-foundation/content-density/ |
| RADIX-COMPOSE | B | Radix Colors, Composing a palette (accent and gray pairing) | https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette |
| LAWS-PROX | C | Laws of UX, Law of Proximity | https://lawsofux.com/law-of-proximity/ |
| NESTED-RADIUS | C | 30 seconds of code, Nested border radius | https://30secondsofcode.org/css/s/nested-border-radius |

"stack" sources are documentation for writing tokens in a given framework, not design evidence. The values taken from every source are in `data/`.

Notes:
- Replaced earlier secondary citations (DAISY summaries of WCAG, a Flutter constant for Apple's 44pt) with the primary W3C and Apple pages.
- Material 3 and Apple pages were read directly on 2026-11-02; colour, type-scale and stack pages on 2026-11-14.
- Read in a browser on 2026-11-17: W3C Understanding pages for 1.4.1, 1.4.8, 2.1.1 and 2.4.3 (1.4.8 replaces the earlier citation through Baymard), 1.4.3 again for the large-text sizes, and the GOV.UK validation and text input pages. Also 1.4.2, 1.4.4, 2.2.1, 2.2.2 and 2.3.1, which moved parts of rules 3.6, 11.2 and 12.4 to Hard.
- Platform pages for section 13 were read in a browser on 2026-11-17: W3C 1.3.4, 1.3.5, 1.4.13, 2.5.1, 2.5.2 and 2.5.4; Apple HIG Layout, Tab bars, Sidebars, Sheets, Gestures and Virtual keyboards; Material 3 Navigation bar, Navigation rail and Bottom sheets; Android edge-to-edge and gesture navigation.
- Re-check yearly: WCAG 3, Material and Apple HIG all move.
- `SCI-*` studies were found through Consensus on 2026-11-15. Numbers first came from the published abstracts. Twelve papers were then read on 2026-11-17 and the rules corrected from them. Read end to end: SCI-FONTSIZE, SCI-PREF, SCI-FORMS, SCI-WAIT-CLOCK, SCI-FIRSTIMP, SCI-THUMB, SCI-VIS-POL. Read for methods, results and limitations: SCI-WAIT-ANIM, SCI-VC-PT, SCI-GUIDE-COST, SCI-FONTS, and SCI-POL-SIZE (in the first author's dissertation). The other ten still rest on their abstracts: SCI-TAPS, SCI-SWIPE, SCI-STRUCT, SCI-SPACING, SCI-DYSLEXIA, SCI-POLARITY-READ, SCI-POLARITY, SCI-LUMINANCE, SCI-POL-AGE, SCI-FORM-ERR. SCI-FIRSTIMP moved from tier A to B: its appeal ratings came from 242 people, under the 400 that tier A asks for. Links are DOIs, checked against Crossref on 2026-11-17, with a free copy where one was found (author, university or company repository, arXiv, PubMed Central). ACM papers are free to read on the ACM Digital Library since 2026-01-01; the Journal of Vision and MDPI papers are open access at their DOI. No free copy was found for SCI-STRUCT, SCI-POLARITY and SCI-LUMINANCE; for SCI-POL-SIZE and SCI-POL-AGE the free copy is the first author's dissertation, which covers both studies.
- Density pages were read on 2026-11-15: Material 3 and SAP Fiori in a browser (both block plain fetches), Cloudscape through a page fetch.
- The Material 3 corner radius page was read again in a browser on 2026-11-15 for the shape presets (buttons full by default, remapping allowed, no large corners on information-dense components).
