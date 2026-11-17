# 1. Contrast and colour

**1.1 Text contrast** (Hard) [WCAG-1.4.3 S, APPLE-A11Y A]
- Normal text 4.5:1; large text 3:1 (18pt regular, 24px; or 14pt bold, 18.66px). W3C rounds the bold size to "approximately 18.5px"; 14pt is 18.66px, so treat bold text under 14pt (18.66px) as normal text. Apple's table gives 4.5:1 up to 17pt, and 3:1 at 18pt and for bold text, and calls these WCAG Level AA values. WCAG itself is stricter and wins wherever it applies: bold text under 18.66px still needs 4.5:1, and regular text under 24px too. Apple's sizes are in Apple points, WCAG's in CSS points (W3C: 1pt = 1.333px); no source read here converts one into the other, so on the web use WCAG's pixel sizes and on Apple platforms treat Apple's table as the minimum (judgment).
- No rounding: 4.499:1 fails. Check light and dark.
- Measured cost: reduced contrast and unclear links consistently slowed people and increased search effort, while unclear icons had mixed effects, which the authors read as people falling back on the text labels (102 computer science students, static page mock-ups, eye tracking) [SCI-GUIDE-COST B, paper read].
- Exempt: disabled controls, decoration, text in photos, logotypes. Break: never for readable content.

**1.2 Non-text contrast** (Hard) [WCAG-1.4.11 S]
- 3:1 against adjacent colours for whatever identifies a control or its state (checkbox outlines, toggle states, focus indicators), meaningful icons, chart lines, bars and slices.
- Fields: the "this is a field" cue needs 3:1, as a border or as the field's background against the page. W3C requires a boundary only when nothing else identifies the control (visible text or a contrasting icon can be enough); a field with no border and no contrasting background fails.
- Exempt: inactive controls, icons beside a text label saying the same, charts whose values are also given as text.

**1.3 Never colour alone** (Hard, Level A) [WCAG-1.4.1 S, APPLE-A11Y A, NNG-ERR B]
- Status, errors, required fields, chart series and links get a second cue: icon, shape, word, pattern, underline or weight. Apple flags red-green and blue-orange as the most confused pairs.

**1.4 Palette by role** (Default) [NNG-HIER B, APPLE-A11Y A, judgment]
- About 2 primary and 2 secondary colours (NN/g), counting brand and emphasis colours only (judgment): status colours and chart palettes carry meaning, not emphasis.
- Name colours by role, not hue: primary, secondary, surface, on-surface, error and the other roles of rule 1.5 (`references/data/colour/roles-tones.md` has the full list).
- Warm saturated colours, red especially, only for warnings and errors [NNG-HIER B].
- On Apple platforms prefer system colours: they adapt to Increase Contrast and dark mode [APPLE-A11Y A].

**1.5 Colour roles in light and dark** (Strong) [M3-COLOR A, WCAG-1.4.3 S, WCAG-1.4.11 S]
- Roles, not hues: primary for the most prominent actions, secondary for quieter ones, tertiary for contrasting accents, error for errors, surfaces for backgrounds, outline for control boundaries.
- Text only in its pair: on-X on X; on-surface and on-surface-variant on any surface. Containers are fills, never text.
- Outline (3:1) for borders that identify a control; outline variant only for decorative dividers or when the content inside provides the contrast.
- Both themes from the start. In Material, dark is not an inversion: each role has its own tone (`references/data/colour/roles-tones.md`).
- Build the colour set from the brand colour and prove every pair with the contrast formula (`references/data/colour/building.md`, `references/data/colour/contrast.md`). Mood ("calm", "playful") is judgment: colour-psychology evidence is weak, so justify colours by roles and contrast.
- Backgrounds stay near-neutral in products; colour goes on actions, selection and status: near-grey surfaces with the brand's accents (`references/data/colour/building.md`) [M3-COLOR A for roles; PRIMER-COLOR B, CARBON-COLOR B, RADIX-COMPOSE B for neutral backgrounds]. Tinted surfaces are a choice for expressive, brand-heavy products.

**1.6 Charts in brand shades** (Default) [M3-COLOR A, judgment]
- One or two series use brand shades: `primary` for the main one, `primary-container` or the second accent, if the product has one, for the second, so the chart belongs to the product.
- `chart-1` to `chart-5` only for three or more unrelated categories, still with labels or a legend by the marks (rule 1.3).
- Never a rainbow for one measure over time: one colour, vary height, not hue.

**1.7 Status values as tinted chips** (Default) [M3-COLOR A, judgment; the colour-alone part is rule 1.3]
- Changes and states ("+2.7%", "-1.7%", "Paid", "Late") in a pill: `success-container` with `on-success-container` text for good, `error-container` with `on-error-container` for bad, `warning-container` for attention. Each pair must reach 4.5:1.
- Keep the sign or a word ("+", "-", "Late"): colour alone never carries the meaning.

**1.8 Light by default for reading, dark as a choice** (Default) [SCI-POLARITY-READ A, SCI-POLARITY B, SCI-LUMINANCE B, SCI-POL-SIZE B, SCI-POL-AGE B, SCI-VIS-POL B]
- Dark text on a light background was read reliably faster than dark mode, for glances and for paragraphs, in two studies with 459 people; paragraph readers did not prefer light mode despite the gain [SCI-POLARITY-READ A].
- The light-mode advantage held in darkness and in office light [SCI-POLARITY B], for younger and older adults [SCI-POL-AGE B], and grew as text got smaller [SCI-POL-SIZE B]. It comes from the brighter screen, not polarity itself: at equal luminance it disappeared [SCI-LUMINANCE B].
- In the character-size study (160 people proofreading at 8, 10, 12 and 14pt from 50cm) the advantage grew steadily as the text got smaller. Each person saw one mode only. Those in dark mode reported more blur and more trouble moving from one line to the next, but on other questions, such as how well they could focus on the text, the two groups answered alike; the authors suggest people may not notice what a display costs them [SCI-POL-SIZE B, paper read].
- Charts are personal: which mode gave better analysis varied by person, often not the one they preferred. Averaged over everyone, no difference between the modes could be measured; per person, time differed by about a third between them, as much as between chart types (104 people analysed, half of them aged 60 or over) [SCI-VIS-POL B, full text read]. Offer both.
- So: follow the system setting and ship both themes (rule 1.5). Where the product picks the default, reading-heavy surfaces start light. In dark mode keep text at body size or above where possible: small captions and dense labels lose the most (judgment from SCI-POL-SIZE, which tested light against dark at small sizes).
- Break: media, video and night-use products, where dark is the expected default (judgment). The character-size authors add one sourced case: a bright display reduces the eyes' adaptation to the dark, which matters for screens used while driving at night [SCI-POL-SIZE B].
