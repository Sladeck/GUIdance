# Sources, ranked

Checked on 2026-11-02. Keys match the tags in the rules.

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
| M3-DENSITY | A | Material Design 3, Grids & spacing: Density | https://m3.material.io/foundations/layout/grids-spacing/density |
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
| SCI-TAPS | A | Henze et al., 100,000,000 taps, MobileHCI 2011 (120,626,225 touch events from 91,731 installs) | https://consensus.app/papers/details/w:c498eb74-279c-4fa9-9f5b-c9d150dc3919/ |
| SCI-THUMB | B | Parhi et al., Target size study for one-handed thumb use on small touchscreen devices, MobileHCI 2006 | https://consensus.app/papers/details/w:e2bdf7b7-a7b1-41d5-8409-eddaaf21d30c/ |
| SCI-SWIPE | B | Yamanaka et al., Behavioral Differences between Tap and Swipe, CHI 2024 (crowdsourced) | https://consensus.app/papers/details/w:42218538-5a60-4b13-800d-0784735f4a7c/ |
| SCI-FIRSTIMP | A | Reinecke et al., Predicting users' first impressions of website aesthetics, CHI 2013 (548 people, 450 sites) | https://consensus.app/papers/details/w:c542c130-f681-4f51-9f51-f8df9b6a7aa5/ |
| SCI-PREF | A | Reinecke et al., Quantifying visual preferences around the world, CHI 2014 (2.4 million ratings, nearly 40,000 people) | https://consensus.app/papers/details/w:fa53f007-d546-44a3-a225-49a2974d1cb4/ |
| SCI-VC-PT | B | Tuch et al., The role of visual complexity and prototypicality regarding first impression of websites, IJHCS 2012 | https://consensus.app/papers/details/w:64c01ca4-5200-48e1-966f-12b6054e7f73/ |
| SCI-STRUCT | B | Seckler et al., Linking objective design factors with subjective aesthetics, Computers in Human Behavior 2015 (194 people) | https://consensus.app/papers/details/w:91daa016-41f7-432f-b423-91a0f8988484/ |
| SCI-FONTSIZE | B | Rello et al., Make It Big!, CHI 2016 (104 people, eye tracking) | https://consensus.app/papers/details/w:c450318c-b710-404a-9091-77c2f5e420bb/ |
| SCI-FONTS | B | Wallace et al., Towards Individuated Reading Experiences, ACM TOCHI 2022 (hundreds of crowdsourced readers) | https://consensus.app/papers/details/w:97e9d83b-53ef-496e-bdea-0113a38ef93d/ |
| SCI-SPACING | B | Wallace et al., Space for Readability, Journal of Vision 2022 (102 and 113 readers) | https://consensus.app/papers/details/w:ebeab8aa-4155-4967-ac1d-45115be5d985/ |
| SCI-DYSLEXIA | B | Rello et al., How to present more readable text for people with dyslexia, UAIS 2015 (92 people, eye tracking) | https://consensus.app/papers/details/w:5970367e-3bb3-422a-8c85-2db03bf8bcca/ |
| SCI-POLARITY-READ | A | Palmén et al., How bold can we be? Font grade in light and dark polarities, CHI 2023 (459 people) | https://consensus.app/papers/details/w:0615a93d-471e-4418-a5e8-e3dfbbcecb8d/ |
| SCI-POLARITY | B | Buchner et al., Text-background polarity affects performance irrespective of ambient illumination and colour contrast, Ergonomics 2007 | https://consensus.app/papers/details/w:091b9f63-90f9-435c-a880-9e5779cc7d7b/ |
| SCI-LUMINANCE | B | Buchner et al., The advantage of positive text-background polarity is due to high display luminance, Ergonomics 2009 | https://consensus.app/papers/details/w:b62a5d16-6b5f-4a1c-a7af-34f1a1df8089/ |
| SCI-POL-SIZE | B | Piepenbrock et al., Positive display polarity is particularly advantageous for small character sizes, Human Factors 2013 | https://consensus.app/papers/details/w:48fdf521-5105-4b9e-b1e1-790f73678555/ |
| SCI-POL-AGE | B | Piepenbrock et al., Positive display polarity is advantageous for both younger and older adults, Ergonomics 2013 | https://consensus.app/papers/details/w:882ab7e7-e2e7-403a-b1ec-ba387e2da412/ |
| SCI-VIS-POL | B | While et al., Dark Mode or Light Mode? Contrast polarity and visualization performance between age groups, IEEE VIS 2024 (134 people) | https://consensus.app/papers/details/w:41493219-ef46-4a27-8e49-9181e17fdb1f/ |
| SCI-WAIT-CLOCK | A | Tan et al., Counting the Wait: Effects of Temporal Feedback on Downstream Task Performance and Perceived Wait-Time Experience during System-Imposed Delays, CHI 2026 (425 people) | https://consensus.app/papers/details/w:c81e24ee-626a-43f3-b726-17bcf9449605/ |
| SCI-WAIT-ANIM | A | Wang et al., Website Loading Animation and Perceived Waiting Time, JTAER 2025 (four experiments, 198 to 411 people each) | https://consensus.app/papers/details/w:bbd4a9b0-5b33-41fd-a11b-c40655b2701f/ |
| SCI-FORM-ERR | B | Bargas-Avila et al., Usable error message presentation in the World Wide Web: Do not show errors right away, Interacting with Computers 2007 (77 and 90 people) | https://consensus.app/papers/details/w:74ac86cf-5c9b-4ff7-8707-bcab95c7495e/ |
| SCI-FORMS | B | Seckler et al., Designing usable web forms, CHI 2014 (65 people, eye tracking) | https://consensus.app/papers/details/w:b97b4351-73fd-4f9f-86e4-db37676cbfd5/ |
| SCI-GUIDE-COST | B | Falkowska et al., Utilization of Eye-Tracking Metrics to Evaluate User Experiences, Sensors 2025 (102 people) | https://consensus.app/papers/details/w:3c2584ba-6ae1-4e50-8c47-353d69f79cf5/ |
| TW-THEME | stack | Tailwind CSS v4, Theme variables | https://tailwindcss.com/docs/theme |
| TW-DARK | stack | Tailwind CSS v4, Dark mode | https://tailwindcss.com/docs/dark-mode |
| MUI-DARK | stack | MUI, Dark mode | https://mui.com/material-ui/customization/dark-mode/ |
| MUI-CSSVARS | stack | MUI, CSS theme variables configuration | https://mui.com/material-ui/customization/css-theme-variables/configuration/ |
| SHADCN-THEME | stack | shadcn/ui, Theming | https://ui.shadcn.com/docs/theming |
| BS-SASS | stack | Bootstrap 5.3, Sass customization and _variables.scss | https://getbootstrap.com/docs/5.3/customize/sass/ |
| BS-COLOR-MODES | stack | Bootstrap 5.3, Color modes | https://getbootstrap.com/docs/5.3/customize/color-modes/ |
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
- Re-check yearly: WCAG 3, Material and Apple HIG all move.
- `SCI-*` studies were found through Consensus on 2026-11-15. Numbers come from the published abstracts; full texts were not read. Links go to each paper's Consensus page, which links to the publisher.
- Density pages were read on 2026-11-15: Material 3 and SAP Fiori in a browser (both block plain fetches), Cloudscape through a page fetch.
