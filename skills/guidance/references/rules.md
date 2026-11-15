# Rules

Format: rule (severity) [source key + tier, see `sources.md`], then when to break it. Conflicts say who wins. Load only the sections you need.

Sections: 1 Contrast and colour · 2 Target size · 3 Typography · 4 Spacing and grouping · 5 Shape, elevation, icons · 6 Hierarchy · 7 Forms · 8 Feedback and loading · 9 Errors · 10 Destructive actions · 11 Motion · 12 Keyboard, focus and input

## 1. Contrast and colour

**1.1 Text contrast** (Hard) [WCAG-1.4.3 S, APPLE-A11Y A]
- Normal text 4.5:1; large text 3:1 (24px regular, or about 18.5px bold: 18pt / 14pt bold). Apple's inspector uses the same AA values (4.5:1 up to 17pt, 3:1 from 18pt or bold).
- No rounding: 4.499:1 fails. Check light and dark.
- Measured cost: reduced contrast and unclear links consistently slowed people and increased search effort (102 people, eye tracking) [SCI-GUIDE-COST B].
- Exempt: disabled controls, decoration, text in photos, logotypes. Break: never for readable content.

**1.2 Non-text contrast** (Hard) [WCAG-1.4.11 S]
- 3:1 against adjacent colours for whatever identifies a control or its state (checkbox outlines, toggle states, focus indicators), meaningful icons, chart lines, bars and slices.
- Fields: the "this is a field" cue needs 3:1, as a border or as the field's background against the page. W3C requires a boundary only when nothing else identifies the control (visible text or a contrasting icon can be enough); a field with no border and no contrasting background fails.
- Exempt: inactive controls, icons beside a text label saying the same, charts whose values are also given as text.

**1.3 Never colour alone** (Hard) [WCAG-1.4.11 S, APPLE-A11Y A, NNG-ERR B]
- Status, errors, required fields, chart series and links get a second cue: icon, shape, word, pattern, underline or weight. Apple flags red-green and blue-orange as the most confused pairs.

**1.4 Palette by role** (Default) [NNG-HIER B, APPLE-A11Y A, judgment]
- About 2 primary and 2 secondary colours (NN/g), counting brand and emphasis colours only (judgment): status colours and chart palettes carry meaning, not emphasis.
- Name colours by role (primary, accent, surface, text levels, status), not hue.
- Warm saturated colours, red especially, only for warnings and errors [NNG-HIER B].
- On Apple platforms prefer system colours: they adapt to Increase Contrast and dark mode [APPLE-A11Y A].

**1.5 Colour roles in light and dark** (Strong) [M3-COLOR A, WCAG-1.4.3 S, WCAG-1.4.11 S]
- Roles, not hues: primary for the most prominent actions, secondary for quieter ones, tertiary for contrasting accents, error for errors, surfaces for backgrounds, outline for control boundaries.
- Text only in its pair: on-X on X; on-surface and on-surface-variant on any surface. Containers are fills, never text.
- Outline (3:1) for borders that identify a control; outline variant only for decorative dividers or when the content inside provides the contrast.
- Both themes from the start. In Material, dark is not an inversion: each role has its own tone (`data/colour.md`).
- Take colours from the `palettes/` tables (every role from one hue, checked pair by pair). Mood ("calm", "playful") is judgment: colour-psychology evidence is weak, so justify palettes by roles and contrast.
- Backgrounds stay near-neutral in products; colour goes on actions, selection and status: neutral surfaces with the chosen variant's accents (`data/colour.md`) [M3-COLOR A for roles; PRIMER-COLOR B, CARBON-COLOR B, RADIX-COMPOSE B for neutral backgrounds]. Tinted surfaces are a choice for expressive, brand-heavy products.

**1.6 Charts in brand shades** (Default) [M3-COLOR A, judgment]
- One or two series use brand shades: `primary` for the main one, `primary-container` or the accent (`secondary-container` in two-tone) for the second, so the chart belongs to the product.
- `chart-1` to `chart-5` only for three or more unrelated categories, still with labels or a legend by the marks (rule 1.3).
- Never a rainbow for one measure over time: one colour, vary height, not hue.

**1.7 Status values as tinted chips** (Default) [M3-COLOR A, judgment; the colour-alone part is rule 1.3]
- Changes and states ("+2.7%", "-1.7%", "Paid", "Late") in a pill: `success-container` with `on-success-container` text for good, `error-container` with `on-error-container` for bad, `warning-container` for attention. Every pair is 4.5:1 in every palette.
- Keep the sign or a word ("+", "-", "Late"): colour alone never carries the meaning.

**1.8 Light by default for reading, dark as a choice** (Default) [SCI-POLARITY-READ A, SCI-POLARITY B, SCI-LUMINANCE B, SCI-POL-SIZE B, SCI-POL-AGE B, SCI-VIS-POL B]
- Dark text on a light background was read reliably faster than dark mode, for glances and for paragraphs, in two studies with 459 people; paragraph readers did not prefer light mode despite the gain [SCI-POLARITY-READ A].
- The light-mode advantage held in darkness and in office light [SCI-POLARITY B], for younger and older adults [SCI-POL-AGE B], and grew as text got smaller [SCI-POL-SIZE B]. It comes from the brighter screen, not polarity itself: at equal luminance it disappeared [SCI-LUMINANCE B].
- Charts are personal: which mode gave better analysis varied by person, often not the one they preferred, with time differences around 36% [SCI-VIS-POL B]. Offer both.
- So: follow the system setting and ship both themes (rule 1.5). Where the product picks the default, reading-heavy surfaces start light. In dark mode keep text at body size or above where possible: small captions and dense labels lose the most (judgment from SCI-POL-SIZE, which tested light against dark at small sizes).
- Break: media, video and night-use products, where dark is the expected default (judgment).

## 2. Target size

**2.1 Minimum** (Hard) [WCAG-2.5.8 S]
- Every pointer target at least 24x24 CSS px, or spaced so a 24px circle centred on it overlaps no other target or small target's circle.
- Exempt: links in a sentence, a same-function control elsewhere that meets the size, browser-drawn controls, essential sizes (dense map pins).

**2.2 Platform sizes** (Default, on that platform) [APPLE-A11Y A, ANDROID-TARGET A]
- iOS / iPadOS: default control 44x44pt, minimum 28x28pt. macOS: default 28x28pt, minimum 20x20pt. Android / Material: 48x48dp (about 9mm).
- Spacing: Apple, about 12pt around bezeled controls and 24pt around unbezeled ones; Android, at least 8dp between targets.
- The hit area can exceed the visible element (a 24dp icon in a 48dp hit area is fine).
- Who wins: WCAG's 24px is the floor everywhere; above it, the platform's number on that platform. Responsive web: 44 to 48px on touch layouts; desktop pointer layouts 24 to 32px.
- Evidence behind the platform numbers: for one-handed thumb use, error rates stopped improving at 9.6mm for single taps and 7.7mm for taps in sequence; the study recommends 9.2mm and 9.6mm [SCI-THUMB B]. Android's 48dp is 7.6mm at the nominal 160dpi (1dp = 1/160in) and about 9mm as Google describes it: at or just under the study's recommendation, not above it, so treat 48dp as a floor on touch layouts.
- Position matters as well as size: 120 million taps from 91,731 installs showed error rates vary with target size and screen location, and touches land systematically off-centre [SCI-TAPS A]. Give targets near screen edges and corners extra room (judgment: the study does not say which locations are worst).
- Swipe-operated targets (swipe to delete, carousels) had longer times, more errors and shifted touch points than taps, so tap-size guidance may not cover them [SCI-SWIPE B]. Make swipeable rows full width and at least the platform size tall (judgment), and keep a button alternative (rule 12.2).

## 3. Typography

**3.1 Use the platform type scale** (Default) [APPLE-TYPE A, M3-TYPE A over NNG-HIER B]
- Apple: 11 text styles (Large Title to Caption 2). Material 3: 15 baseline styles (Display Large to Label Small), Major Second ratio (1.125) anchored at 14.
- Neither expects all of them in one product (Material's example keeps five): pick a subset and name it.
- Per screen, about three sizes carry the hierarchy (header, subheader, body) and no more than two large elements compete [NNG-HIER B]; guidance for one view, not a cap on the scale.
- Scale steps differ clearly; no near-identical steps [M3-TYPE A].

**3.2 Body size** (Default) [APPLE-A11Y A, APPLE-TYPE A, M3-TYPE A, NNG-HIER B]
- iOS body 17pt (minimum 11pt). macOS body 13pt (minimum 10pt). Material base body 14 (scale anchor).
- Web: 16px is the browser default and the safe body size; NN/g gives 14 to 16px.
- Dense dashboards at 13 to 14px: judgment only, with strong contrast and working zoom. Body text below 13px: no source supports it.
- Web reading pages (articles, docs, help) benefit from more: in a 104-person eye-tracking study on Wikipedia, readability rose with font size and comprehension was better at 18 and 26 points; the authors recommend 18 or larger for text-heavy sites [SCI-FONTSIZE B]. The study reports points: if typographic points, 18pt is 24px. So long-form body on the web goes above 16px, at 18px at least and larger where the layout allows (judgment). Web application UI stays at 16px; native apps keep Apple's and Material's body sizes above.

**3.3 Avoid light weights at small sizes** (Default) [APPLE-TYPE A]
- Prefer Regular, Medium, Semibold, Bold; avoid Thin, Light, Ultralight for small text. A thin custom font needs a larger size.

**3.4 Line length** (Strong) [BAY-LINE A, WCAG-1.4.8 S-AAA]
- Body text 50 to 75 characters per line; ceiling 80 (40 for Chinese, Japanese, Korean).
- CSS `ch` misleads: `1ch` is the width of the digit 0, wider than an average letter in most sans-serif fonts; `max-width: 65ch` in Arial measured 81 to 85 characters. Start at `55ch` to `60ch` and measure with the typography check (`browser-checks.md`) (measured, judgment).
- Break: short UI strings, tables, code.

**3.5 Line height** (Default) [APPLE-TYPE A, M3-TYPE A]
- About 1.5 for paragraphs and wide columns. Tight leading only for one or two lines in constrained rows, never at three lines or more.
- Avoid extremes: marginal effects suggested line spacing of 0.8 and 1.8 impair readability [SCI-FONTSIZE B]. The study's line-spacing unit may not equal CSS `line-height`, so read it as direction, not a threshold.
- Japanese, Chinese, Korean and many other scripts are about 7% taller than Latin; Material adapts line height by language. Do not reuse Latin line heights for JA blindly.

**3.6 Respect user text size** (Strong) [APPLE-A11Y A, APPLE-TYPE A]
- Text can grow to at least 200%: Dynamic Type on iOS, rem on the web. Hierarchy survives the growth; meaningful icons scale with text.
- Readers differ: across hundreds of crowdsourced readers, speed differed by 35% between their fastest and slowest fonts with no loss of comprehension, and no one font suited everyone [SCI-FONTS B]. Never block user font overrides or reader modes.

**3.7 Letter and word spacing near default** (Default) [SCI-SPACING B, SCI-DYSLEXIA B]
- Paragraphs keep the font's own letter and word spacing. In two online studies (102 and 113 readers), character spacing of -0.1em or 0.4em and word spacing of -0.2em or 1.5em caused significant drops in speed, comprehension and preference; faster readers slowed most at wide spacing [SCI-SPACING B].
- Larger text and character spacing helped people with and without dyslexia read faster (92 people, eye tracking) [SCI-DYSLEXIA B]: a small opening up is safe, extremes are not.
- Tracking on display headings and all-caps labels is a design choice (judgment), never on paragraphs. User-chosen spacing always wins.

## 4. Spacing and grouping

**4.1 One spacing scale** (Default) [M3-SPACING A]
- Material 3: 8dp base (space100 = 8dp). Tokens 0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 32, 36, 40, 48, 56, 64, 72dp; main units are multiples of 8, while 2, 4, 6 and 10 are for tight component internals.
- Layout: 8, 16, 24, 32, 48, 64. Inside components: 4, 8, 12, 16. Density roles may take any step of the scale (rule 4.7).
- Padding and gaps on the parent, not margins on children.
- Desktop can be more generous than mobile; dense reads serious and focused, spacious reads calm.
- Break: documented optical adjustments of 1 to 2px.

**4.2 Proximity decides grouping** (Strong) [M3-SPACING A, NNG-PROX B, LAWS-PROX C]
- Space inside a group is clearly smaller than between groups. Proximity groups implicitly; outlines, dividers and shadows group explicitly.
- A label sits closer to its field than to the next label; a heading closer to its content than to the section above; buttons close to what they affect.
- Similar elements get identical spacing and sizing; leading thumbnails, avatars and icons align.
- Groups must survive responsive reflow.

**4.3 Space before lines** (Default) [M3-SPACING A, NNG-HIER B]
- Group with whitespace first; borders, dividers or tinted backgrounds only when space is not enough.

**4.4 Content fits at every width** (Hard) [WCAG-1.4.10 S]
- At 320 CSS px wide (a 1280px screen at 400% zoom) the page scrolls one way only, losing no content or function. Check 320, 390 (phone), 768 (tablet) and desktop.
- Nothing sticks out of its card, gets cut off by overflow: hidden, or pushes the page sideways. Flex and grid children need min-width: 0 to shrink; long words need overflow-wrap: anywhere.
- WCAG exceptions: content needing two-dimensional layout (maps, diagrams, video, games, presentations, data tables scrolling in their own container, toolbars that must stay visible).
- Deliberate truncation is fine when visible (ellipsis) and the full text is reachable.

**4.5 Same thing, same look** (Default) [M3-SPACING A, NNG-PROX B, judgment]
- One component, one look: same padding, radius, border, type. A real difference is a named variant, not an override.
- Edges that should line up line up exactly; 1 to 3px misses read as mistakes.
- At most two border widths: a hairline for containers and dividers, a heavier one for focus, selection and errors.
- One colour per role: near-identical greys or tints are hard-coded values that should be a token.

**4.6 Give each component room** (Default) [M3-SPACING A, judgment]
- Desktop: 24px inside cards, 24 to 32px between. Mobile: 16px inside, 16 to 24px between. These are the default density; the compact and comfortable presets, or a tuned role, move them (rule 4.7). Dense tables and toolbars can go tighter; showcases should not.
- Text at least 16px for content, 14px for labels; 12px only for captions and metadata.
- Cramped screen: remove or move a component before shrinking spacing.

**4.7 One density for the product, one per page** (Default) [M3-DENSITY A, FIORI-DENSITY B, CLOUDSCAPE-DENSITY B]
- The product has one density: compact, default or comfortable (values in `data/scales.md`, Density), expressed through role tokens so the whole app moves together.
- A page may override it when its content calls for it: a report table in a default product, a welcome page in a compact one. Material says density can change with context and that not every layout needs it [M3-DENSITY A]. Fiori and Cloudscape disagree: both set density for the whole application and Cloudscape says not to apply compact to individual pages or components [FIORI-DENSITY B, CLOUDSCAPE-DENSITY B]. Material is the higher tier, so overrides are permitted, but keep them few.
- One density within a page's content: no mixing of presets between its sections [FIORI-DENSITY B]. Two exceptions, both judgment: the shared shell (navigation, header) keeps the product's density on an overridden page, and one self-contained dense component (a data grid, a code editor) may run compact, in line with Material's per-component density scale [M3-DENSITY A].
- Compact: data-rich products where people scan and compare a lot, such as dashboards, tables and financial tools [M3-DENSITY A], on devices used with a mouse and keyboard [FIORI-DENSITY B]. Comfortable: products that put a focused message, less information or easier navigation first [M3-DENSITY A]. Default: everything else.
- A product may ship compact as its only density when it needs high information density [FIORI-DENSITY B]. A product that lets people choose always offers default as well, and starts on it [CLOUDSCAPE-DENSITY B, which calls that level "comfortable"].
- A preset changes spacing and control height only. Font size stays the same [FIORI-DENSITY B]; so do the scale, radius and the target floors. Accessible targets keep their minimum size even when the visible element is smaller [M3-DENSITY A]: on touch layouts (under 600px wide or a coarse pointer) control and row heights are at least the touch size in every preset (rule 2.2), and nothing drops under 24x24 CSS px (rule 2.1).
- Never densify focused tasks such as choosing from a menu, or components that alert people to a change, such as snackbars and dialogs [M3-DENSITY A]. In a compact product or page they keep the default values.
- Density does not change by itself across breakpoints or orientation; only the person changes it [M3-DENSITY A]. If the product offers a density setting, its control keeps default target sizes [M3-DENSITY A].
- Who wins: Fiori forces its touch-size mode on phones while Material says density should not switch automatically. Rule 2.2 settles it: spacing roles stay as chosen, control and row heights rise to the touch size on touch layouts. That is a target-size floor, not a density change (judgment).
- Single roles may be tuned on top of the preset, so products of the same density do not all share one rhythm: wider sections for reading, tighter lists for data (judgment). The limits are sourced and do not move: spacing on scale steps only (rule 4.1; control and row heights move by Material's 4dp density step instead [M3-DENSITY A]), tighter inside a group than between groups (rule 4.2), the target floors (rules 2.1 and 2.2). A tuned role changes everywhere in its scope, never in one section of a page.
- No study in the sources says which density performs best; the preset values beyond Material's and Fiori's numbers, and every tuning, are judgment.

## 5. Shape, elevation and icons

**5.1 One radius scale** (Default) [M3-SHAPE A]
- Material 3: 0, 4, 8, 12, 16, 20, 28, 32, 48dp, and full. Use three or four steps for most of the product.
- Steps name roundness, not component size. Material maps buttons to full and cards to medium (12dp) by default; remapping a component is allowed.
- No large or full corners on information-dense containers.

**5.2 Concentric nested corners** (Default, wins over 5.1) [M3-SHAPE A, NESTED-RADIUS C]
- Inner radius = outer radius minus the padding between them (Material's "optical roundness": 48 - 14 = 34). Never the same radius for nested objects.
- The result can fall off the scale (Material's own 34dp does). Prefer padding that lands it on the scale (24 outer, 8 padding, 16 inner); otherwise the derived value wins: concentricity beats scale purity.
- Result 0 or negative: use 0 or 2 to 4px inside.

**5.3 Elevation: one cue, few levels** (Default) [M3-ELEVATION A, judgment]
- The six Material levels (`data/scales.md`) as tokens, never per-component shadows. Rest at levels 0 to 3; 4 and 5 only for hover and drag.
- One cue per surface: a border, a shadow or a tonal step. A border plus a strong shadow is two cues for one job (judgment).
- At most three shadow levels per screen; higher always means "in front of" (a dialog above a menu above a card).
- Dark themes: shadows barely show, so raised surfaces also take a lighter surface-container tone.
- Break: a brand with one signature shadow used consistently.

**5.4 Icons: one set, one style, two sizes** (Default) [M3-ICONS A, APPLE-TYPE A, judgment]
- One icon set. Outlined everywhere; filled only for a selected or active state.
- Optical sizes: 20px inline and dense, 24px in buttons and navigation, 40 to 48 for display only. At most two sizes per screen (judgment).
- Icon weight follows the adjacent text; icons centre on the text line.
- A 20 to 24px glyph still has a 44 to 48px tap area on touch (rule 2.2) and at least 24px everywhere (rule 2.1).
- Meaningful icons: 3:1 contrast (rule 1.2) and an accessible name when they stand alone.

## 6. Hierarchy

**6.1 One primary action** (Strong) [NNG-HIER B, M3-SPACING A]
- The most important content or action gets the most prominence: size, contrast, the brightest surface, generous space.
- Everything emphasised means nothing is. No more than three contrast variations in a complex view.
- Key actions keep a consistent location across pages.

**6.2 Squint test** (Default) [NNG-HIER B]
- Blur the screen (or squint): the intended order of importance stays visible.

**6.3 Simple and familiar beats novel** (Default) [SCI-VC-PT B, SCI-FIRSTIMP A, SCI-PREF A, SCI-STRUCT B]
- People judge a screen's appeal within 17 to 50ms, first by its visual complexity, then by prototypicality (how much it looks like others of its kind); low complexity with a familiar layout was rated most appealing [SCI-VC-PT B].
- Complexity and colourfulness, with age and education, explained about half the variance in appeal after 500ms (548 people, 450 sites) [SCI-FIRSTIMP A]. The authors note, from earlier work, that this first impression later colours judgments of usability and trust.
- Symmetry, low complexity, blue hue, medium brightness and medium-to-high saturation rated highest, and structure mattered more than colour (194 people) [SCI-STRUCT B]. Not palette advice: colours still come from roles and contrast (rule 1.5).
- The best level varies by audience: 2.4 million ratings from nearly 40,000 people showed peak appeal for colourfulness and complexity shifting with gender, education and country [SCI-PREF A]. Check with the product's real audience.
- In practice (judgment): fewer distinct elements, colours and alignments per screen; the platform's usual layout for that kind of page (navigation, search, account where people expect them).
- Break: expressive brand and campaign pages, by choice and tested.

## 7. Forms

Applying 20 form guidelines together to real company forms gave faster completion, fewer submission attempts, fewer eye movements and higher satisfaction (65 people, eye tracking) [SCI-FORMS B]. The rules below are the ones with the strongest sources.

**7.1 Single column** (Strong) [BAY-COLUMNS A]
- One field per row; users skip or misfill multi-column layouts.
- Exception: fields forming one logical unit share a row (city / postcode, expiry / CVC, day / month / year).
- Prefer one "Full name" field over first + last.

**7.2 Visible labels, not placeholders** (Strong) [NNG-PLACEHOLDER B]
- Labels and instructions outside the input, always visible. Placeholders show an example format only.

**7.3 When to validate** (Strong) [BAY-INLINE A vs GOVUK-VALID A: same tier, context decides]
- Baymard (e-commerce, long forms): validate when the user leaves a field or completes a fixed-length value; check marks on valid fields. Use for long multi-field forms (checkout, sign-up, settings with many fields).
- GOV.UK (public services, one question per page): validate on submit only; "do not validate when the user moves away from a field", since early validation hurts slower typists. Use for short forms, one-question-per-page flows, and audiences with many slow or assistive-technology users.
- Both, and NN/g, agree: no error while the user is still typing; clear an error once fixed; error summary on submit; preserve what was entered.
- Peer-reviewed lab evidence leans to submit-time: in two studies (77 and 90 people), showing errors after the whole form was completed performed best and immediate feedback worst; people filling a form often ignored immediate messages [SCI-FORM-ERR B]. Tier B and from 2007, so it does not overturn Baymard for long forms, but it adds weight to GOV.UK's approach for short ones.

**7.4 Do not ask twice** (Hard, Level A) [WCAG-2.2 S]
- Information already entered in the same process is prefilled or selectable (3.3.7).

**7.5 Login without puzzles** (Hard) [WCAG-2.2 S]
- No cognitive test at login without an alternative: allow paste and password managers (3.3.8).

## 8. Feedback and loading

**8.1 Response time limits** (Strong) [NNG-RESPONSE B, SCI-WAIT-CLOCK A]
- Under 0.1s feels instant; under 1s keeps the flow (no indicator); over 1s show the system is working; over 10s percent-done progress, plus cancel.
- Showing time over 10s: elapsed time, not a countdown. A remaining-time display increased frustration compared with elapsed time (425 people) [SCI-WAIT-CLOCK A], which outranks NN/g's "time estimate".
- Long-standing HCI research; NN/g's most stable numbers.

**8.2 Which indicator** (Strong) [NNG-SKELETON B]
- Start an indicator only if the load is still running after about 1s, so fast responses never flash one.
- Full page expected to take about 2 to 10s: skeleton of the real layout, never frame-only.
- One module loading (a card, a chart): spinner in that module.
- Processes (upload, export, conversion) or anything over 10s: progress bar.
- Never wait in silence: across 10, 30 and 60 second waits, no time display made waits feel longer, and an elapsed-time display caused less frustration than a remaining-time countdown (425 people) [SCI-WAIT-CLOCK A]. A percent-done bar stays the default (rule 8.1).
- An animated indicator made waits feel shorter than a static one across four experiments of 198 to 411 people each, though less so when people are focused on a task or have a practical goal, which covers most product UI [SCI-WAIT-ANIM A]. Under reduced motion keep a progress cue that does not move continuously (rule 11.2).

**8.3 Optimistic state** (Default) [judgment]
- Reflect safe actions immediately (toggle, like, reorder), reconcile on response, roll back visibly on failure.

## 9. Errors

**9.1 Placement and visibility** (Strong) [NNG-ERR B, GOVUK-VALID A]
- Error next to its cause, plus a summary on submit for multi-field forms. Visible through icon, border and text, never colour or animation alone.
- Match severity: inline for minor issues, modal only for blocking problems.

**9.2 Wording** (Strong) [APPLE-ALERTS A, NNG-ERR B]
- Plain, specific about what happened and how to fix it; neutral tone, no blame, no jokes. Never a bare "Error" or "Error 329347 occurred"; codes go in a details toggle for support.

**9.3 Recovery** (Strong) [NNG-ERR B]
- Preserve what the user entered, offer the fix (suggestions, retry, a link), prevent likely mistakes up front.

## 10. Destructive actions

**10.1 Undo first, alerts rarely** (Strong) [APPLE-ALERTS A, NNG-CONFIRM B]
- Prefer undo (soft delete, a toast with Undo, a recycle bin). No confirmation for common undoable actions such as deleting an email; confirm only uncommon actions that cannot be undone. Frequent confirmations train click-through.

**10.2 Confirmation wording and defaults** (Strong) [APPLE-ALERTS A over NNG-CONFIRM B]
- Say exactly what happens ("Delete 3 projects and their 128 briefs?"), not "Are you sure?".
- Buttons named by outcome ("Delete", "Erase", "Keep projects"); always "Cancel" for cancel; no Yes / No; OK only in purely informational alerts.
- Defaults (Apple wins over NN/g's "no default ever"): never Cancel as default. If the user did not directly choose the destructive action, style it as destructive with no default so people read first. If they deliberately chose it (Empty Trash), it can be the default so Return confirms, without destructive styling.
- Rare, catastrophic actions: require typing the item name [NNG-CONFIRM B].

## 11. Motion

**11.1 Durations and easing** (Default) [M3-MOTION A]
- Material 3 durations: short 50 to 200ms (small utility transitions; selection controls 200ms), medium 250 to 400ms (moves across a medium area), long 450 to 600ms (large expressive transitions), extra long 700 to 1000ms (rare, ambient, no user input).
- CSS easing: standard `cubic-bezier(0.2, 0, 0, 1)` for small transitions; emphasized decelerate `cubic-bezier(0.05, 0.7, 0.1, 1)` for entering; emphasized accelerate `cubic-bezier(0.3, 0, 0.8, 0.15)` for exiting.
- M3 Expressive components now use spring physics; the duration and easing system still works for transitions but is no longer maintained.

**11.2 Reduced motion** (Strong) [APPLE-A11Y A, WCAG-C39 S-AAA]
- Honour `prefers-reduced-motion` on the web and Reduce Motion on Apple platforms.
- When reduced: fades instead of slides and zooms, springs without bounce, no animated blur or depth, fewer automatic and repetitive animations [APPLE-A11Y A].
- No fast blinking or flashing in any mode.

## 12. Keyboard, focus and input

**12.1 Focus visible and unobscured** (Hard) [WCAG-2.2 S]
- Every interactive element shows a focus indicator with 3:1 contrast. A focused element is never fully hidden by sticky headers, cookie bars or overlays (2.4.11); use `scroll-padding-top` for sticky headers.

**12.2 Alternatives to dragging and gestures** (Hard) [WCAG-2.2 S, APPLE-A11Y A]
- Anything done by dragging also works with single clicks or taps (2.5.7); custom gestures (swipe to delete) also get an on-screen button.

**12.3 Consistent help** (Hard, Level A) [WCAG-2.2 S]
- Help links or contact options repeated across pages keep the same relative place (3.2.6).

**12.4 No timers on content** (Default) [APPLE-A11Y A]
- No views that auto-dismiss on a timer: dismiss with an explicit action. No autoplay audio or video without controls.

**12.5 Everything works from the keyboard, in order** (Hard, Level A) [WCAG-2.2 S, judgment]
- Every control a mouse can use is reachable with Tab and works with Enter or Space (2.1.1); clickable `div`s and `span`s become `button` or `a`.
- Tab order follows reading order (2.4.3): no positive `tabindex`, no backward jumps from CSS reordering (`order`, `flex-direction: row-reverse`, grid placement).
- Hidden content (closed menus, off-screen drawers) is not focusable until it opens.
