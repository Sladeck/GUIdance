# 3. Typography

**3.1 Use the platform type scale** (Default) [APPLE-TYPE A, M3-TYPE A over NNG-HIER B]
- Apple: 11 text styles (Large Title to Caption 2). Material 3: 15 baseline styles (Display Large to Label Small), Major Second ratio (1.125) anchored at 14.
- Neither expects all of them in one product (Material's example keeps five): pick a subset and name it.
- Per screen, about three sizes carry the hierarchy (header, subheader, body) and no more than two large elements compete [NNG-HIER B]; guidance for one view, not a cap on the scale.
- Scale steps differ clearly; no near-identical steps [M3-TYPE A].

**3.2 Body size** (Default) [APPLE-A11Y A, APPLE-TYPE A, M3-TYPE A, NNG-HIER B]
- iOS body 17pt (minimum 11pt). macOS body 13pt (minimum 10pt). Material base body 14 (scale anchor).
- Web: 16px is the browser default and the safe body size; NN/g gives 14 to 16px.
- Dense dashboards at 13 to 14px: judgment only, with strong contrast and working zoom. Body text below 13px: no source supports it.
- Web reading pages (articles, docs, help) benefit from more. In an eye-tracking study of 104 people reading Wikipedia at 10, 12, 14, 18, 22 and 26, reading got easier with every step up to 18, comprehension was lower at 10 and 12 than at 18, nothing improved past 22, and 26 was rated less readable than 18. The authors recommend at least 18 for the body text of websites [SCI-FONTSIZE B, full text read].
- The paper calls its sizes points but set them in CSS, and it also calls the browsers' default of 16 "points", so its sizes are most likely CSS pixels (judgment). It tested one font (Arial) on a 17-inch desktop monitor at about 60cm, and its authors say phones and tablets need their own studies.
- So long-form body on desktop web goes to 18px, and up to about 22px where the layout allows (judgment); phones keep the 16px above, since the study did not cover them. Web application UI stays at 16px; native apps keep Apple's and Material's body sizes above.

**3.3 Avoid light weights at small sizes** (Default) [APPLE-TYPE A]
- Prefer Regular, Medium, Semibold, Bold; avoid Thin, Light, Ultralight for small text. A thin custom font needs a larger size.

**3.4 Line length** (Strong) [BAY-LINE A, WCAG-1.4.8 S-AAA]
- Body text 50 to 75 characters per line; ceiling 80 (40 for Chinese, Japanese, Korean).
- CSS `ch` misleads: `1ch` is the width of the digit 0, wider than an average letter in most sans-serif fonts; `max-width: 65ch` in Arial measured 81 to 85 characters. Start at `55ch` to `60ch` and count the characters of a real line (measured, judgment).
- Break: short UI strings, tables, code.

**3.5 Line height** (Default) [APPLE-TYPE A, M3-TYPE A]
- About 1.5 for paragraphs and wide columns. Tight leading only for one or two lines in constrained rows, never at three lines or more.
- Avoid extremes. The same study tested line spacing in units where 1.0 is the browser default, 120% of the font size, so its 0.8, 1.0, 1.4 and 1.8 are CSS `line-height` 0.96, 1.2, 1.68 and 2.16. Line spacing did not change how easily people read, but comprehension scores were lower at 0.96 than at the three others, and people rated their own comprehension lower at 2.16 than at 1.2 [SCI-FONTSIZE B, full text read]. The authors advise staying near the default and say 1.5 spacing may do as well. So paragraphs sit between about 1.2 and 1.7, never under 1 (judgment for the range).
- Japanese, Chinese, Korean and many other scripts are about 7% taller than Latin; Material adapts line height by language. Do not reuse Latin line heights for JA blindly.

**3.6 Respect user text size** (Hard: the first bullet; Default: the rest) [WCAG-1.4.4 S, APPLE-A11Y A, APPLE-TYPE A]
- Hard, Level AA: text can be resized up to 200% without loss of content or function (1.4.4). Exempt: captions and images of text. Browser zoom counts: W3C's own example sizes text in px and reaches 200% by zooming, so a px font size is not itself a failure. What fails, by W3C's listed failures: text, images or controls clipped, truncated or obscured at 200% (F69); text form controls that do not resize with the text (F80); text sized only in viewport units (F94); a viewport meta that prevents zoom, such as `user-scalable=no` (W3C test rule "Meta viewport allows for zoom").
- Dynamic Type on iOS [APPLE-TYPE A]; rem on the web, so text also follows the browser's font-size setting (judgment). Hierarchy survives the growth; meaningful icons scale with text [APPLE-A11Y A].
- Readers differ: across 352 crowdsourced readers, each reading in five of 16 common fonts at matched sizes, speed was 35% higher in a person's fastest font than in their slowest, with no loss of comprehension. No one font suited everyone, and neither preference nor familiarity predicted speed: people read 14% faster in their fastest font than in the one they preferred [SCI-FONTS B, paper read]. Never block user font overrides or reader modes.

**3.7 Letter and word spacing near default** (Default) [SCI-SPACING B, SCI-DYSLEXIA B]
- Paragraphs keep the font's own letter and word spacing. In two online studies (102 and 113 readers), character spacing of -0.1em or 0.4em and word spacing of -0.2em or 1.5em caused significant drops in speed, comprehension and preference; faster readers slowed most at wide spacing [SCI-SPACING B].
- Larger text and character spacing helped people with and without dyslexia read faster (92 people, eye tracking) [SCI-DYSLEXIA B]: a small opening up is safe, extremes are not.
- Tracking on display headings and all-caps labels is a design choice (judgment), never on paragraphs. User-chosen spacing always wins.
