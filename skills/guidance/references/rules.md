# Rules

Each rule: the rule, severity, source keys with tier (see `sources.md`), and when to break it. Where sources disagree, the rule says who wins and why. Load only the sections you need.

Contents: 1 Contrast and colour · 2 Target size · 3 Typography · 4 Spacing and grouping · 5 Shape and radius · 6 Hierarchy · 7 Forms · 8 Feedback and loading · 9 Errors · 10 Destructive actions · 11 Motion · 12 Keyboard, focus and input

---

## 1. Contrast and colour

**1.1 Text contrast** (Hard) [WCAG-1.4.3 S, APPLE-A11Y A]
- Normal text: at least 4.5:1 against its background.
- Large text: at least 3:1. Large means 24px regular or about 18.5px bold (18pt / 14pt bold). Apple's inspector applies the same WCAG AA values (4.5:1 up to 17pt, 3:1 from 18pt or bold).
- Thresholds are not rounded: 4.499:1 fails.
- Exempt: disabled controls, pure decoration, text inside photos, logotypes.
- Check both light and dark themes.
- Break: never for readable content.

**1.2 Non-text contrast** (Hard) [WCAG-1.4.11 S]
- At least 3:1 against adjacent colours for anything needed to identify a control or its state (checkbox outlines, toggle states, focus indicators), icons that carry meaning, and chart lines, bars and slices.
- Input fields: the cue that shows "this is a field" needs 3:1. That cue can be the border or the field's background against the page. W3C says a boundary is only required when nothing else visually identifies the control (visible text or a contrasting icon can be enough), but a field with no border and no contrasting background fails.
- Exempt: inactive controls, icons next to a text label that says the same thing, charts whose values are also given as text.

**1.3 Never colour alone** (Hard) [WCAG-1.4.11 S, APPLE-A11Y A, NNG-ERR B]
- Status, errors, required fields, chart series and links need a second cue: icon, shape, word, pattern, underline or weight. Apple calls out red-green and blue-orange as the pairs people confuse most.

**1.4 Palette by role** (Default) [NNG-HIER B, APPLE-A11Y A, judgment]
- NN/g suggests about 2 primary and 2 secondary colours. Apply that to brand and emphasis colours only (judgment): status colours (error, warning, success) and chart palettes do not count toward it, since they carry meaning rather than emphasis.
- Name colours by role (primary, accent, surface, text levels, status), not by hue.
- Keep warm, saturated colours (red especially) for warnings and errors [NNG-HIER B].
- Prefer platform system colours on Apple platforms; they adapt to Increase Contrast and dark mode [APPLE-A11Y A].

**1.5 Colour roles in light and dark** (Strong) [M3-COLOR A, WCAG-1.4.3 S, WCAG-1.4.11 S]
- Assign colours by role, not by hue: primary for the most prominent actions, secondary for quieter ones, tertiary for contrasting accents, error for errors, surfaces for backgrounds, outline for control boundaries.
- Text only in its intended pair: on-X on X, on-surface and on-surface-variant on any surface. Container colours are fills, never text.
- Outline (3:1) for borders that identify a control; outline variant only for decorative dividers or when the content inside already provides the contrast.
- Define both themes from the start. In Material, dark is not an inversion: each role has its own tone (values in `design-data.md`).
- Pick colours from the precomputed palette tables (`palettes/`), which build every role from one hue and are checked pair by pair. Mood ("calm", "playful") is judgment: the evidence for colour psychology is weak, so justify palettes by roles and contrast.

**1.6 Charts in brand shades** (Default) [M3-COLOR A, judgment]
- One or two data series use the brand's own shades: `primary` for the main series, `primary-container` or the accent (`secondary-container` in two-tone) for the second. The chart then belongs to the product instead of looking pasted in.
- The categorical colours (`chart-1` to `chart-5`) are for three or more unrelated categories only, and still need labels or a legend next to the marks (rule 1.3).
- Never a rainbow for one measure over time; use one colour and vary height, not hue.

**1.7 Status values as tinted chips** (Default) [M3-COLOR A, judgment; the colour-alone part is rule 1.3]
- Changes and states ("+2.7%", "-1.7%", "Paid", "Late") sit in a pill: `success-container` background with `on-success-container` text for good, `error-container` with `on-error-container` for bad, `warning-container` for attention. Each pair is already 4.5:1 in every palette.
- Keep the sign or a word in the text ("+", "-", "Late"): colour alone never carries the meaning.

## 2. Target size
- Backgrounds stay near-neutral in products; colour goes on actions, selection and status. Use neutral surfaces with the accents of the chosen variant (`design-data.md` section 10) [M3-COLOR A for roles; PRIMER-COLOR B, CARBON-COLOR B, RADIX-COMPOSE B for neutral backgrounds]. Tinted surfaces are a choice for expressive, brand-heavy products.

**2.1 Minimum** (Hard) [WCAG-2.5.8 S]
- Every pointer target at least 24x24 CSS px, or spaced so that a 24px circle centred on it does not overlap another target or another small target's circle.
- Exempt: links inside a sentence, a same-function control elsewhere that meets the size, browser-drawn controls, sizes that are essential (dense map pins).

**2.2 Platform sizes** (Default, on that platform) [APPLE-A11Y A, ANDROID-TARGET A]
- iOS / iPadOS: default control 44x44pt, minimum 28x28pt.
- macOS: default 28x28pt, minimum 20x20pt.
- Android / Material: 48x48dp (about 9mm).
- Spacing: Apple suggests about 12pt of padding around bezeled controls and about 24pt around unbezeled ones; Android asks for at least 8dp between targets.
- The hit area can exceed the visible element: a 24dp icon in a 48dp hit area is fine.
- Who wins: WCAG's 24px is the floor everywhere. Above it, use the platform's number on that platform. For the responsive web, aim for 44 to 48px on touch layouts; desktop pointer layouts can sit at 24 to 32px.

## 3. Typography

**3.1 Use the platform type scale** (Default) [APPLE-TYPE A, M3-TYPE A over NNG-HIER B]
- Apple: 11 built-in text styles (Large Title to Caption 2). Material 3: 15 baseline styles (Display Large to Label Small) on a Major Second ratio (1.125) anchored at 14.
- Neither expects all of them in one product. Material's own example keeps five. Pick a subset and name it.
- Within a single screen, about three sizes carry the hierarchy (header, subheader, body) and no more than two large elements compete [NNG-HIER B]. This is guidance for one view, not a cap on the scale.
- Sizes on the scale should differ clearly; avoid near-identical steps [M3-TYPE A].

**3.2 Body size** (Default) [APPLE-A11Y A, APPLE-TYPE A, M3-TYPE A, NNG-HIER B]
- iOS body 17pt (minimum 11pt). macOS body 13pt (minimum 10pt). Material's base body size is 14 (scale anchor).
- Web: 16px is the browser default and the safe body size; NN/g gives 14 to 16px.
- Dense dashboards at 13 to 14px: judgment only, acceptable when contrast is strong and zoom works. Below 13px for body text is not supported by any source here.

**3.3 Avoid light weights at small sizes** (Default) [APPLE-TYPE A]
- Prefer Regular, Medium, Semibold, Bold. Avoid Thin, Light, Ultralight for small text. A thin custom font needs a larger size.

**3.4 Line length** (Strong) [BAY-LINE A, WCAG-1.4.8 S-AAA]
- Body text 50 to 75 characters per line; 80 is the ceiling (40 for Chinese, Japanese, Korean).
- In CSS, do not trust `ch` blindly: `1ch` is the width of the digit 0, wider than an average letter in most sans-serif fonts. In testing, `max-width: 65ch` in Arial rendered 81 to 85 characters per line. Start around `55ch` to `60ch` and measure with the typography snippet in `browser-checks.md` (measured, judgment).
- Break: short UI strings, tables, code.

**3.5 Line height** (Default) [APPLE-TYPE A, M3-TYPE A]
- Loose leading (about 1.5) for paragraphs and wide columns. Tight leading only for one or two lines in constrained rows; avoid it at three lines or more.
- Japanese, Chinese, Korean and many other scripts are about 7% taller than Latin; Material adapts line height by language. Do not reuse Latin line heights for JA blindly.

**3.6 Respect user text size** (Strong) [APPLE-A11Y A, APPLE-TYPE A]
- Allow text to enlarge to at least 200%. Support Dynamic Type on iOS; use rem on the web. Keep hierarchy intact when text grows; scale meaningful icons with text.

## 4. Spacing and grouping

**4.1 One spacing scale** (Default) [M3-SPACING A]
- Material 3 measures spacing on an 8dp scale (space100 = 8dp). Token set: 0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 32, 36, 40, 48, 56, 64, 72dp. Main units are multiples of 8; 2, 4, 6 and 10 are nested units for tight component internals.
- In practice: 8, 16, 24, 32, 48, 64 for layout; 4, 8, 12, 16 inside components.
- Put padding and gaps on the parent container instead of margins on children.
- Desktop can use more generous spacing than mobile; denser layouts read as serious and focused, spacious ones as calm.
- Break: optical adjustments of 1 to 2px are fine if documented.

**4.2 Proximity decides grouping** (Strong) [M3-SPACING A, NNG-PROX B, LAWS-PROX C]
- Space inside a group is clearly smaller than space between groups. Close proximity groups implicitly; outlines, dividers and shadows group explicitly.
- A label sits closer to its own field than to the next label. A heading sits closer to the content below it than to the section above.
- Buttons sit close to the content they affect.
- Similar elements get identical spacing and sizing; leading thumbnails, avatars and icons align.
- Check that groups survive responsive reflow.

**4.3 Space before lines** (Default) [M3-SPACING A, NNG-HIER B]
- Group with whitespace first. Add borders, dividers or tinted backgrounds only when space alone is not enough.

**4.4 Content fits at every width** (Hard) [WCAG-1.4.10 S]
- At 320 CSS px wide (a 1280px screen at 400% zoom) the page scrolls in one direction only, with no loss of content or function. Check 320, 390 (phone), 768 (tablet) and desktop.
- Nothing sticks out of its card, gets cut off by overflow: hidden, or pushes the page sideways. Flex and grid children need min-width: 0 to shrink; long words need overflow-wrap: anywhere.
- Exceptions (WCAG): content that needs two-dimensional layout, such as maps, diagrams, video, games, presentations, data tables (scroll inside their own container) and toolbars that must stay visible.
- Truncating on purpose is fine when it is visible (ellipsis) and the full text is reachable.

**4.5 Same thing, same look** (Default) [M3-SPACING A, NNG-PROX B, judgment]
- One component looks the same everywhere: same padding, radius, border and type. A real difference becomes a named variant, not an override.
- Edges that should line up line up exactly; 1 to 3px misses read as mistakes.
- At most two border widths: a hairline for containers and dividers, a heavier one for focus, selection and errors.
- One colour per role: two near-identical greys or tints are a hard-coded value that should be a token.

**4.6 Give each component room** (Default) [M3-SPACING A, judgment]
- Desktop: 24px inside cards and 24 to 32px between them. Mobile: 16px inside and 16 to 24px between. Dense tables and toolbars can go tighter; showcases and dashboards should not.
- Text at least 16px for content and 14px for labels; 12px only for captions and metadata.
- When a screen feels cramped, remove or move a component before shrinking the spacing.

## 5. Shape and radius

**5.1 One radius scale** (Default) [M3-SHAPE A]
- Material 3 scale: 0, 4, 8, 12, 16, 20, 28, 32, 48dp, and full.
- Steps are named for roundness, not component size. Material maps buttons to full by default and cards to medium (12dp); remapping a component to another step is allowed.
- Avoid large or full corners on information-dense containers.
- Pick three or four steps for most of the product.

**5.2 Concentric nested corners** (Default, wins over 5.1) [M3-SHAPE A, NESTED-RADIUS C]
- Inner radius = outer radius minus the padding between them ("optical roundness" in Material: 48 - 14 = 34). Never reuse the same radius for nested objects.
- Conflict with 5.1: the formula can produce values off the scale (Material's own 34dp example is). Prefer choosing padding so the result lands on the scale (24 outer, 8 padding, 16 inner). If it cannot, the derived value is allowed: concentricity beats scale purity.
- If the result is 0 or negative, use 0 or 2 to 4px on the inner element.

**5.3 Elevation: one cue, few levels** (Default) [M3-ELEVATION A, judgment]
- Use the six Material levels (`design-data.md` section 11) as tokens, not shadows invented per component. Resting surfaces stay at levels 0 to 3; levels 4 and 5 are only for hover and drag.
- Separate a surface with one cue: a border, a shadow or a tonal step. A border plus a strong shadow is two cues for one job (judgment).
- At most three shadow levels on one screen, and a higher level always means "in front of" (a dialog above a menu above a card).
- Dark themes: shadows barely show, so raised surfaces also take a lighter surface-container tone.
- Break: a brand that uses one signature shadow consistently.

**5.4 Icons: one set, one style, two sizes** (Default) [M3-ICONS A, APPLE-TYPE A, judgment]
- One icon set per product. Outlined everywhere, filled only to show a selected or active state.
- Sizes from the set's optical sizes: 20px inline and dense, 24px in buttons and navigation, 40 to 48 only for display use. At most two sizes on one screen (judgment).
- Icon weight follows the text next to it; icons sit centred on the text line.
- The glyph can be 20 to 24px, but its tap area is still 44 to 48px on touch (rule 2.2) and at least 24px everywhere (rule 2.1).
- Meaningful icons have 3:1 contrast (rule 1.2) and an accessible name when they stand alone.

## 6. Hierarchy

**6.1 One primary action** (Strong) [NNG-HIER B, M3-SPACING A]
- The most important content or action gets the most visual prominence: size, contrast, the brightest surface and generous space around it.
- If everything is emphasised, nothing is. No more than three contrast variations in a complex view.
- Keep key actions in a consistent location across pages.

**6.2 Squint test** (Default) [NNG-HIER B]
- Blur the screen (or squint). The intended order of importance should still be visible.

## 7. Forms

**7.1 Single column** (Strong) [BAY-COLUMNS A]
- One field per row in a single column. Users skip or misfill fields in multi-column layouts.
- Exception: fields that form one logical unit can share a row (city / postcode, expiry / CVC, day / month / year).
- Prefer one "Full name" field over first + last where possible.

**7.2 Visible labels, not placeholders** (Strong) [NNG-PLACEHOLDER B]
- Labels and instructions stay outside the input and stay visible. Placeholders may show an example format only.

**7.3 When to validate** (Strong) [BAY-INLINE A vs GOVUK-VALID A: same tier, context decides]
- The two large-scale sources disagree:
  - Baymard (e-commerce, long forms): validate when the user leaves a field or when a fixed-length value is complete; show check marks on valid fields.
  - GOV.UK (public services, one question per page): validate on submit only; "do not validate when the user moves away from a field", because early validation hurts slower typists.
- Use Baymard's approach for long multi-field forms (checkout, sign-up, settings pages with many fields).
- Use GOV.UK's approach for short forms, one-question-per-page flows, and audiences with many slow or assistive-technology users.
- Both agree, and so does NN/g: never show an error while the user is still typing; clear an error as soon as the value is fixed; keep an error summary on submit; preserve what was entered.

**7.4 Do not ask twice** (Hard, Level A) [WCAG-2.2 S]
- Information already entered in the same process is prefilled or selectable (3.3.7).

**7.5 Login without puzzles** (Hard) [WCAG-2.2 S]
- No cognitive test at login without an alternative: allow paste and password managers (3.3.8).

## 8. Feedback and loading

**8.1 Response time limits** (Strong) [NNG-RESPONSE B]
- Under 0.1s: feels instant.
- Under 1s: flow kept; no indicator needed.
- Over 1s: show that the system is working.
- Over 10s: percent-done progress or a time estimate, and a way to cancel.
- These limits come from long-standing HCI research and are the most stable numbers NN/g publishes.

**8.2 Which indicator** (Strong) [NNG-SKELETON B]
- Start any indicator only if the load is still running after about 1s, so fast responses never flash a skeleton or spinner.
- Full page load expected to take about 2 to 10s: skeleton showing the real layout. No frame-only skeletons.
- One module loading (a card, a chart): spinner in that module.
- Processes (upload, export, conversion) or anything over 10s: progress bar.

**8.3 Optimistic state** (Default) [judgment]
- Reflect the user's action immediately where safe (toggle, like, reorder) and reconcile on response; roll back visibly on failure.

## 9. Errors

**9.1 Placement and visibility** (Strong) [NNG-ERR B, GOVUK-VALID A]
- Show the error next to its cause, plus a summary on submit for multi-field forms. Make it visible with icon, border and text, never colour or animation alone.
- Match severity: inline for minor issues, modal only for blocking problems.

**9.2 Wording** (Strong) [APPLE-ALERTS A, NNG-ERR B]
- Plain language, specific about what happened and how to fix it. Neutral tone, no blame, no jokes. Never a bare "Error" or "Error 329347 occurred"; keep codes in a details toggle for support.

**9.3 Recovery** (Strong) [NNG-ERR B]
- Preserve what the user entered. Offer the fix (suggestions, retry, a link). Prevent likely mistakes before they happen.

## 10. Destructive actions

**10.1 Undo first, alerts rarely** (Strong) [APPLE-ALERTS A, NNG-CONFIRM B]
- Prefer undo (soft delete, a toast with Undo, a recycle bin). Do not show a confirmation for common destructive actions that can be undone, such as deleting an email. Confirm only uncommon actions that cannot be undone.
- Frequent confirmations train users to click through.

**10.2 Confirmation wording and defaults** (Strong) [APPLE-ALERTS A over NNG-CONFIRM B]
- Say exactly what will happen ("Delete 3 projects and their 128 briefs?"), not "Are you sure?".
- Buttons named by outcome ("Delete", "Erase", "Keep projects"); always "Cancel" for the cancel action; avoid Yes / No and avoid OK except in purely informational alerts.
- Defaults (Apple wins over NN/g's "no default ever"):
  - Never make Cancel the default.
  - If the destructive action was not what the user directly chose, style it as destructive and set no default, so people read before confirming.
  - If the user deliberately chose the destructive action (Empty Trash), that button can be the default so Return confirms it, without destructive styling.
- For rare, catastrophic actions, require typing the item name [NNG-CONFIRM B].

## 11. Motion

**11.1 Durations and easing** (Default) [M3-MOTION A]
- Material 3 duration tokens: short 50 to 200ms (small utility transitions; selection controls use 200ms), medium 250 to 400ms (moves across a medium area), long 450 to 600ms (large expressive transitions), extra long 700 to 1000ms (rare, ambient, no user input).
- Easing in CSS: standard `cubic-bezier(0.2, 0, 0, 1)` for small transitions; emphasized decelerate `cubic-bezier(0.05, 0.7, 0.1, 1)` for entering; emphasized accelerate `cubic-bezier(0.3, 0, 0.8, 0.15)` for exiting.
- M3 Expressive components now use spring physics; the duration and easing system still works for transitions but is no longer maintained.

**11.2 Reduced motion** (Strong) [APPLE-A11Y A, WCAG-C39 S-AAA]
- Respect the user's setting: `prefers-reduced-motion` on the web, Reduce Motion on Apple platforms.
- When reduced: replace slides and zooms with fades, tighten springs to remove bounce, avoid animating blur and depth, reduce automatic and repetitive animations [APPLE-A11Y A].
- Avoid fast blinking or flashing in any mode.

## 12. Keyboard, focus and input

**12.1 Focus visible and unobscured** (Hard) [WCAG-2.2 S]
- Every interactive element shows a focus indicator with 3:1 contrast. A focused element is never fully hidden by sticky headers, cookie bars or overlays (2.4.11). Use `scroll-padding-top` for sticky headers.

**12.5 Everything works from the keyboard, in order** (Hard, Level A) [WCAG-2.2 S, judgment]
- Every control a mouse can use is reachable with Tab and works with Enter or Space (2.1.1). Clickable `div`s and `span`s need to become `button` or `a`.
- Tab order follows the reading order (2.4.3): no positive `tabindex`, no jumps backwards because of CSS reordering (`order`, `flex-direction: row-reverse`, grid placement).
- Hidden content (closed menus, off-screen drawers) is not focusable until it opens.

**12.2 Alternatives to dragging and gestures** (Hard) [WCAG-2.2 S, APPLE-A11Y A]
- Anything done by dragging also works with single clicks or taps (2.5.7). Custom gestures (swipe to delete) also have an on-screen button.

**12.3 Consistent help** (Hard, Level A) [WCAG-2.2 S]
- Help links or contact options repeated across pages stay in the same relative place (3.2.6).

**12.4 No timers on content** (Default) [APPLE-A11Y A]
- Avoid views that auto-dismiss on a timer; dismiss with an explicit action. Do not autoplay audio or video without controls.
