# 2. Target size

**2.1 Minimum** (Hard) [WCAG-2.5.8 S]
- Every pointer target is at least 24 by 24 CSS px. A smaller one passes when a 24px circle centred on it touches no other target and no other small target's circle.
- A slider, a colour picker or a text area counts as one target, not one per position.
- Exempt: links in a sentence and targets limited by the line height of surrounding text; a control elsewhere on the page that does the same thing and meets the size; controls sized by the browser and not restyled; a presentation that is essential or legally required (dense map pins).

**2.2 Platform sizes** (Default, on that platform) [APPLE-A11Y A, ANDROID-TARGET A]
- iOS / iPadOS: default control 44x44pt, minimum 28x28pt. macOS: default 28x28pt, minimum 20x20pt. Android / Material: 48x48dp (about 9mm).
- Spacing: Apple, about 12pt around bezeled controls and 24pt around unbezeled ones; Android, at least 8dp between targets.
- The hit area can exceed the visible element (a 24dp icon in a 48dp hit area is fine).
- Who wins: WCAG's 24px is the floor everywhere; above it, the platform's number on that platform. Responsive web: 44 to 48px on touch layouts; desktop pointer layouts 24 to 32px.
- Evidence behind the platform numbers: for one-handed thumb use, error rates stopped improving at 9.6mm for single taps and 7.7mm for taps in sequence; the study recommends 9.2mm and 9.6mm (20 right-handed people, standing, on an HP iPAQ PDA, in a study run in 2005) [SCI-THUMB B, full text read]. Android's 48dp is 7.6mm at the nominal 160dpi (1dp = 1/160in) and about 9mm as Google describes it: at or just under the study's recommendation, not above it, so treat 48dp as a floor on touch layouts.
- Where on the screen: for single taps in the same study, right-handed people rated the centre most comfortable and the two left corners least; taking the ratings and the scatter of taps together, the authors name the left side and the bottom-right corner as the hardest. Taps in the right column landed right of the target's centre, so they advise letting targets on the thumb's side run to the screen edge. Location had no significant main effect on error rates [SCI-THUMB B].
- Position matters as well as size: 120 million taps from 91,731 installs showed error rates vary with target size and screen location, and touches land systematically off-centre [SCI-TAPS A]. Give targets near screen edges and corners extra room (judgment: the study does not say which locations are worst).
- Swipe-operated targets (swipe to delete, carousels) had longer times, more errors and shifted touch points than taps, so tap-size guidance may not cover them [SCI-SWIPE B]. Make swipeable rows full width and at least the platform size tall (judgment), and keep a button alternative (rule 12.2).
