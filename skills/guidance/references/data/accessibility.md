# Accessibility thresholds and platform sizes

Verified values; use them directly, do not search the web. Re-verify only if a source is over a year older than today or the user asks. Verified 2026-11-02, 2026-11-15 and 2026-11-17. Keys match `sources.md`.

## WCAG 2.2 [tier S]

| What | Value |
| --- | --- |
| Orientation (1.3.4, AA) | View and operation are not restricted to one orientation, unless that orientation is essential (bank check, piano app, projector slides) |
| Identify input purpose (1.3.5, AA) | Fields collecting information about the user state their purpose in code (HTML `autocomplete`), where the technology supports it |
| Use of colour (1.4.1, A) | Colour is never the only visual means of conveying information, indicating an action, prompting a response or distinguishing an element |
| Audio control (1.4.2, A) | Audio playing automatically for more than 3 seconds can be paused or stopped, or has its own volume control |
| Normal text contrast (1.4.3, AA) | 4.5:1 |
| Large text contrast (1.4.3, AA) | 3:1. Large = 18pt regular (24px), or 14pt bold (18.66px; W3C says "approximately 18.5px", use 14pt) |
| Resize text (1.4.4, AA) | Text resizes up to 200% without loss of content or function. Exempt: captions, images of text. Failures: F69 text, images or controls clipped, truncated or obscured; F80 text form controls that do not resize; F94 text sized in viewport units; a viewport meta that prevents zoom |
| Non-text contrast (1.4.11, AA) | 3:1 for anything identifying a control or its state, meaningful icons, chart marks |
| Rounding | None: 4.499:1 fails |
| Content on hover or focus (1.4.13, AA) | Dismissible without moving pointer or focus (unless it reports an input error or covers nothing), hoverable, persistent until the trigger is left, it is dismissed or it is no longer valid. Exempt: content drawn by the browser unmodified |
| Pointer gestures (2.5.1, A) | Multipoint and path-based gestures also work with a single pointer and no path, unless essential. Not for gestures of the browser or assistive technology |
| Pointer cancellation (2.5.2, A) | The down-event triggers nothing; or completion is on the up-event with abort or undo; or the up-event reverses the down-event; or the down-event is essential (keyboard and keypad keys) |
| Motion actuation (2.5.4, A) | What device or body motion operates also works through interface components, and the response to motion can be disabled. Exempt: accessibility-supported interfaces, essential motion |
| Target size (2.5.8, AA) | 24x24 CSS px, or a 24px circle centred on the target overlapping no other |
| Target size exceptions | Inline links in text, equivalent control elsewhere, user-agent controls, essential sizing |
| Keyboard (2.1.1, A) | All functionality is operable through a keyboard, except input that depends on the path of the movement (freehand drawing) |
| Timing adjustable (2.2.1, A) | A time limit is any process that happens without user initiation after a set time, including a prompt or message that expires; not one whose information or function is available another way. It can be turned off or adjusted (to at least ten times the default) before it is met, or extended: warning, at least 20 seconds to extend with a simple action, at least ten times. Exempt: real-time events, essential limits, limits over 20 hours |
| Pause, stop, hide (2.2.2, A) | Moving, blinking or scrolling content that starts automatically, lasts more than 5 seconds and is shown with other content can be paused, stopped or hidden; auto-updating content also, or its frequency controlled. Exempt: essential |
| Three flashes (2.3.1, A) | Nothing flashes more than three times in any one second, unless below the general and red flash thresholds (area and luminance; not measurable from code) |
| Focus order (2.4.3, A) | Focusable components receive focus in an order that preserves meaning and operability |
| Focus visible (2.4.7, AA) | Keyboard-operable interfaces have a mode where the focus indicator is visible |
| Focus not obscured (2.4.11, AA) | A focused component is never entirely hidden by author content (sticky header or footer, non-modal dialog); partly hidden passes AA. Fix: `scroll-padding` (technique C43); failure F110 |
| Focus appearance (2.4.13, AAA) | A focus indicator the author defines covers at least the area of a 2 CSS px perimeter of the unfocused component, and those pixels change by 3:1 between states. A solid 2px outline on or outside the edge meets the area; one inset away from the edge needs 3px. Exempt: the browser's indicator unmodified, with its background unmodified |
| Line length (1.4.8, AAA) | 80 characters max (40 for CJK) |
| Reflow (1.4.10, AA) | No two-direction scrolling at 320 CSS px wide (= 1280px at 400% zoom), or 256 CSS px high for horizontal content. Exceptions: maps, diagrams, video, games, presentations, data tables, toolbars that must stay visible |
| Reduced motion (2.3.3, AAA; technique C39) | Honour `prefers-reduced-motion` |
| All criteria | Every Level A and AA criterion, with what to look for in code: `wcag-criteria.md` |
| New in 2.2 (A/AA) | 2.4.11 focus not obscured, 2.5.7 dragging alternative, 2.5.8 target size, 3.2.6 consistent help, 3.3.7 redundant entry, 3.3.8 accessible authentication |

Contrast: `(L1 + 0.05) / (L2 + 0.05)`, relative luminance `L = 0.2126 R + 0.7152 G + 0.0722 B` on linearised sRGB (`c <= 0.04045 ? c/12.92 : ((c+0.055)/1.055)^2.4`). By hand: see `colour/contrast.md`.

## Platform sizes [Apple HIG, Android, tier A]

| Platform | Default control | Minimum | Spacing |
| --- | --- | --- | --- |
| iOS / iPadOS | 44x44 pt | 28x28 pt | ~12 pt around bezeled, ~24 pt around unbezeled |
| macOS | 28x28 pt | 20x20 pt | same |
| Android / Material | 48x48 dp (~9 mm) | | 8 dp between targets |

Apple text: iOS body 17 pt (min 11), macOS body 13 pt (min 10); contrast table: 4.5:1 up to 17 pt, 3:1 at 18 pt and for bold text, which Apple calls WCAG Level AA values (rule 1.1 says where WCAG is stricter). 11 text styles: Large Title, Title 1 to 3, Headline, Body, Callout, Subheadline, Footnote, Caption 1 and 2.
