# Research numbers [tier A and B]

First table verified 2026-11-02; use directly. Keys match `sources.md`.

| What | Value | Source |
| --- | --- | --- |
| Response limits | 0.1 s instant; 1 s flow kept; over 1 s show progress; over 10 s percent-done and cancel | NNG-RESPONSE |
| Loading indicator | nothing under 1 s; skeleton for page loads of about 2 to 10 s; spinner for one module; progress bar for processes or over 10 s | NNG-SKELETON |
| Line length | 50 to 75 characters, 80 max (40 CJK) | BAY-LINE |
| `ch` unit | width of "0", wider than an average letter: 65ch renders about 81 to 85 characters in Arial (GUIdance test). Use 55 to 60ch and measure | judgment, measured |
| Form layout | single column; one logical unit may share a row | BAY-COLUMNS |
| Inline validation | long forms: on blur, clear errors as soon as fixed (Baymard); short or one-question-per-page: on submit only (GOV.UK) | BAY-INLINE, GOVUK-VALID |
| Qualitative sample | 5 users find problems; quantitative claims need 40+ | NNG-SAMPLE |
| Baymard scale | 200,000+ research hours, 4,400+ moderated sessions on 240+ sites, 1,000+ people per quantitative study | BAY-METHOD |

## Peer-reviewed studies

Found 2026-11-15; numbers from the published abstracts. Tier A: 400+ people or field data at scale; tier B: smaller controlled experiments.

| What | Value | Source |
| --- | --- | --- |
| Thumb target size | error rates stop improving at 9.6mm (single taps) and 7.7mm (taps in sequence); recommended 9.2mm and 9.6mm | SCI-THUMB (B) |
| Tap accuracy at scale | 120,626,225 touch events, 91,731 installs: error rate varies with size and screen location; touches systematically skewed; a correction cut errors by 7.79% | SCI-TAPS (A) |
| Swipe vs tap | swipe targets: longer times, more errors, shifted touch points | SCI-SWIPE (B) |
| First impression speed | complexity and prototypicality affect appeal within 17 to 50ms; low complexity plus familiar layout most appealing | SCI-VC-PT (B) |
| What drives appeal | complexity, colourfulness, age and education explain about half the variance after 500ms (548 people, 450 sites) | SCI-FIRSTIMP (A) |
| Preferences by audience | 2.4 million ratings, nearly 40,000 people: peak colourfulness and complexity vary by gender, education, country | SCI-PREF (A) |
| Highest-rated factors | symmetry, low complexity, blue hue, medium brightness, medium to high saturation; structure outweighs colour (194 people) | SCI-STRUCT (B) |
| Reading font size | readability rises with size; comprehension better at 18 and 26 points; 18+ recommended for text-heavy sites (104 people) | SCI-FONTSIZE (B) |
| Line spacing extremes | marginal effects suggest 0.8 and 1.8 impair readability; unit may differ from CSS `line-height` | SCI-FONTSIZE (B) |
| Font choice | 35% reading speed difference between a reader's fastest and slowest font, comprehension unchanged | SCI-FONTS (B) |
| Letter and word spacing | character -0.1em or 0.4em and word -0.2em or 1.5em drop speed, comprehension and preference (102 and 113 readers) | SCI-SPACING (B) |
| Dyslexia | larger text and character spacing read faster, with and without dyslexia (92 people) | SCI-DYSLEXIA (B) |
| Light vs dark text | light mode read reliably faster, glance and paragraph (459 people); paragraph readers did not prefer it | SCI-POLARITY-READ (A) |
| Why light reads faster | brighter screen; no advantage at equal luminance; independent of room light; larger at small sizes; holds for older adults | SCI-POLARITY, SCI-LUMINANCE, SCI-POL-SIZE, SCI-POL-AGE (B) |
| Charts light vs dark | better mode varies per person, time difference around 36% (134 people) | SCI-VIS-POL (B) |
| Wait feedback | no display feels longer; elapsed time less frustrating than countdown (425 people, 10 to 60s waits) | SCI-WAIT-CLOCK (A) |
| Loading animation | animated beats static on perceived wait, four experiments of 198 to 411 people; weaker under high task involvement or practical goals | SCI-WAIT-ANIM (A) |
| Form error timing | errors after the whole form best, immediate worst (77 and 90 people) | SCI-FORM-ERR (B) |
| Form guidelines combined | faster completion, fewer submission attempts, higher satisfaction (65 people) | SCI-FORMS (B) |
| Cost of breaking guidelines | low contrast and unclear links slow people and raise search effort (102 people) | SCI-GUIDE-COST (B) |
