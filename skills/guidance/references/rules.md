# Rules

Format: rule (severity) [source key + tier, see `sources.md`], then when to break it. Conflicts say who wins. Load only the sections you need.

Sections: 1 Contrast and colour · 2 Target size · 3 Typography · 4 Spacing and grouping · 5 Shape, elevation, icons · 6 Hierarchy · 7 Forms · 8 Feedback and loading · 9 Errors · 10 Destructive actions · 11 Motion · 12 Keyboard, focus and input

## 1. Contrast and colour

**1.1 Text contrast** (Hard) [WCAG-1.4.3 S, APPLE-A11Y A]
- Normal text 4.5:1; large text 3:1 (24px regular, or about 18.5px bold: 18pt / 14pt bold). Apple's inspector uses the same AA values (4.5:1 up to 17pt, 3:1 from 18pt or bold).
- No rounding: 4.499:1 fails. Check light and dark.
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

## 2. Target size

**2.1 Minimum** (Hard) [WCAG-2.5.8 S]
- Every pointer target at least 24x24 CSS px, or spaced so a 24px circle centred on it overlaps no other target or small target's circle.
- Exempt: links in a sentence, a same-function control elsewhere that meets the size, browser-drawn controls, essential sizes (dense map pins).

**2.2 Platform sizes** (Default, on that platform) [APPLE-A11Y A, ANDROID-TARGET A]
- iOS / iPadOS: default control 44x44pt, minimum 28x28pt. macOS: default 28x28pt, minimum 20x20pt. Android / Material: 48x48dp (about 9mm).
- Spacing: Apple, about 12pt around bezeled controls and 24pt around unbezeled ones; Android, at least 8dp between targets.
- The hit area can exceed the visible element (a 24dp icon in a 48dp hit area is fine).
- Who wins: WCAG's 24px is the floor everywhere; above it, the platform's number on that platform. Responsive web: 44 to 48px on touch layouts; desktop pointer layouts 24 to 32px.

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

**3.3 Avoid light weights at small sizes** (Default) [APPLE-TYPE A]
- Prefer Regular, Medium, Semibold, Bold; avoid Thin, Light, Ultralight for small text. A thin custom font needs a larger size.

**3.4 Line length** (Strong) [BAY-LINE A, WCAG-1.4.8 S-AAA]
- Body text 50 to 75 characters per line; ceiling 80 (40 for Chinese, Japanese, Korean).
- CSS `ch` misleads: `1ch` is the width of the digit 0, wider than an average letter in most sans-serif fonts; `max-width: 65ch` in Arial measured 81 to 85 characters. Start at `55ch` to `60ch` and measure with the typography check (`browser-checks.md`) (measured, judgment).
- Break: short UI strings, tables, code.

**3.5 Line height** (Default) [APPLE-TYPE A, M3-TYPE A]
- About 1.5 for paragraphs and wide columns. Tight leading only for one or two lines in constrained rows, never at three lines or more.
- Japanese, Chinese, Korean and many other scripts are about 7% taller than Latin; Material adapts line height by language. Do not reuse Latin line heights for JA blindly.

**3.6 Respect user text size** (Strong) [APPLE-A11Y A, APPLE-TYPE A]
- Text can grow to at least 200%: Dynamic Type on iOS, rem on the web. Hierarchy survives the growth; meaningful icons scale with text.

## 4. Spacing and grouping

**4.1 One spacing scale** (Default) [M3-SPACING A]
- Material 3: 8dp base (space100 = 8dp). Tokens 0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 32, 36, 40, 48, 56, 64, 72dp; main units are multiples of 8, while 2, 4, 6 and 10 are for tight component internals.
- Layout: 8, 16, 24, 32, 48, 64. Inside components: 4, 8, 12, 16.
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
- Desktop: 24px inside cards, 24 to 32px between. Mobile: 16px inside, 16 to 24px between. Dense tables and toolbars can go tighter; showcases and dashboards should not.
- Text at least 16px for content, 14px for labels; 12px only for captions and metadata.
- Cramped screen: remove or move a component before shrinking spacing.

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

## 7. Forms

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

**7.4 Do not ask twice** (Hard, Level A) [WCAG-2.2 S]
- Information already entered in the same process is prefilled or selectable (3.3.7).

**7.5 Login without puzzles** (Hard) [WCAG-2.2 S]
- No cognitive test at login without an alternative: allow paste and password managers (3.3.8).

## 8. Feedback and loading

**8.1 Response time limits** (Strong) [NNG-RESPONSE B]
- Under 0.1s feels instant; under 1s keeps the flow (no indicator); over 1s show the system is working; over 10s percent-done progress or a time estimate, plus cancel.
- Long-standing HCI research; NN/g's most stable numbers.

**8.2 Which indicator** (Strong) [NNG-SKELETON B]
- Start an indicator only if the load is still running after about 1s, so fast responses never flash one.
- Full page expected to take about 2 to 10s: skeleton of the real layout, never frame-only.
- One module loading (a card, a chart): spinner in that module.
- Processes (upload, export, conversion) or anything over 10s: progress bar.

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
