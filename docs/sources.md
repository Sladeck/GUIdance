# Sources and how they are weighted

Every rule names its sources. [`sources.md`](../skills/guidance/references/sources.md) in the skill lists each one with its link and tier, and when each group was checked.

## Tiers

| Tier | Sources | Why |
| --- | --- | --- |
| **S** | W3C WCAG 2.2 | International standard, referenced by law. Wins every conflict it covers. |
| **A** | Apple Human Interface Guidelines, Google Material Design 3 | Define what users already expect on their platforms. |
| **A** | Baymard Institute, GOV.UK Design System | Large-scale published research (Baymard: 200,000+ research hours, 4,400+ test sessions). |
| **A** | Peer-reviewed studies with 400+ people or field data | Measured at scale (up to 120 million taps and 2.4 million ratings). One study each, so evidence rather than a standard. |
| **B** | Nielsen Norman Group | Decades of mostly small qualitative studies: strong on what goes wrong, weaker on exact numbers. |
| **B** | Smaller peer-reviewed experiments | Controlled and measured; good on the direction of an effect, weaker on exact thresholds. |
| **C** | Secondary summaries | Used for a formula or a clear statement, never decisive. |

Rules without a source are labelled `judgment`. Where sources disagree, the higher tier wins; at the same tier, context decides (Apple on Apple platforms, Material on Android, Baymard for shops and long forms, GOV.UK for public services and one-question-per-page forms).

## The main sources

- **Standards:** W3C WCAG 2.2 (the Understanding documents for each success criterion the rules use).
- **Platforms:** Apple Human Interface Guidelines, Google Material Design 3, Android Developers.
- **Research:** Baymard Institute, GOV.UK Design System, Nielsen Norman Group, and 22 peer-reviewed studies on touch, reading, light and dark mode, waiting, forms and first impressions. Twelve of the papers were then read, seven end to end and five for their methods, results and limitations, and the rules corrected from them; the other ten rest on their abstracts, and the skill's `sources.md` says which is which.
- **Design systems:** GitHub Primer, IBM Carbon, Radix Colors, SAP Fiori, AWS Cloudscape.
- **Framework documentation**, for writing tokens only: Tailwind CSS, MUI, shadcn/ui, Bootstrap, Jetpack Compose, SwiftUI.

Every value taken from these sources is stored in [`skills/guidance/references/data/`](../skills/guidance/references/data/).

GUIdance is not affiliated with or endorsed by Apple, Google, the W3C, Baymard Institute, GOV.UK or Nielsen Norman Group. It cites their public guidance and stores the numeric values it uses, not their text.
