# Accessibility thresholds and platform sizes

Verified values; use them directly, do not search the web. Re-verify only if a source is over a year older than today or the user asks. Verified 2026-11-02 and 2026-11-15. Keys match `sources.md`.

## WCAG 2.2 [tier S]

| What | Value |
| --- | --- |
| Normal text contrast (1.4.3, AA) | 4.5:1 |
| Large text contrast (1.4.3, AA) | 3:1. Large = 24px regular, or 18.66px (14pt) bold |
| Non-text contrast (1.4.11, AA) | 3:1 for anything identifying a control or its state, meaningful icons, chart marks |
| Rounding | None: 4.499:1 fails |
| Target size (2.5.8, AA) | 24x24 CSS px, or a 24px circle centred on the target overlapping no other |
| Target size exceptions | Inline links in text, equivalent control elsewhere, user-agent controls, essential sizing |
| Keyboard (2.1.1, A) | Everything that works with a pointer works from the keyboard |
| Focus order (2.4.3, A) | Tab order follows the page's meaning and reading order |
| Focus visible (2.4.7, AA) | Keyboard-operable interfaces have a mode where the focus indicator is visible |
| Focus not obscured (2.4.11, AA) | A focused component is never entirely hidden by author content (sticky header or footer, non-modal dialog); partly hidden passes AA. Fix: `scroll-padding` (technique C43); failure F110 |
| Line length (1.4.8, AAA) | 80 characters max (40 for CJK) |
| Reflow (1.4.10, AA) | No two-direction scrolling at 320 CSS px wide (= 1280px at 400% zoom), or 256 CSS px high for horizontal content. Exceptions: maps, diagrams, video, games, presentations, data tables, toolbars that must stay visible |
| Reduced motion (2.3.3, AAA; technique C39) | Honour `prefers-reduced-motion` |
| New in 2.2 (A/AA) | 2.4.11 focus not obscured, 2.5.7 dragging alternative, 2.5.8 target size, 3.2.6 consistent help, 3.3.7 redundant entry, 3.3.8 accessible authentication |

Contrast: `(L1 + 0.05) / (L2 + 0.05)`, relative luminance `L = 0.2126 R + 0.7152 G + 0.0722 B` on linearised sRGB (`c <= 0.04045 ? c/12.92 : ((c+0.055)/1.055)^2.4`). By hand: see `colour.md`.

## Platform sizes [Apple HIG, Android, tier A]

| Platform | Default control | Minimum | Spacing |
| --- | --- | --- | --- |
| iOS / iPadOS | 44x44 pt | 28x28 pt | ~12 pt around bezeled, ~24 pt around unbezeled |
| macOS | 28x28 pt | 20x20 pt | same |
| Android / Material | 48x48 dp (~9 mm) | | 8 dp between targets |

Apple text: iOS body 17 pt (min 11), macOS body 13 pt (min 10); contrast guidance uses the WCAG AA values. 11 text styles: Large Title, Title 1 to 3, Headline, Body, Callout, Subheadline, Footnote, Caption 1 and 2.
