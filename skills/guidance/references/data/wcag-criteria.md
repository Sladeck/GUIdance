# WCAG 2.2 success criteria, Level A and AA

**Contents:** how to read this file; then the 55 Level A and AA criteria of WCAG 2.2, by principle: 1 Perceivable, 2 Operable, 3 Understandable, 4 Robust; then 4.1.1, which 2.2 removed.

Used by `/guidance wcag`. Read on 2026-11-19 from the WCAG 2.2 Recommendation of 12 December 2024 [WCAG-22-SPEC S]: 31 criteria at Level A, 24 at Level AA, 31 at Level AAA (not listed here), and 4.1.1 marked obsolete. Re-check when W3C publishes a new 2.x version.

## How to read an entry

- **Asks**: what the criterion requires, in short. Paraphrased; the exact wording, notes and exceptions are on its Understanding page, `https://www.w3.org/WAI/WCAG22/Understanding/<slug>.html`, with the slug given in each heading.
- **Rule**: the GUIdance rule that already covers it. When there is one, read that rule and judge from it: it holds the exemptions, the numbers and the "Break" line. A rule's Strong or Default bullets are not WCAG failures; report only what the criterion itself requires.
- **Look for**: what to search the code for. These are common failure patterns (judgment), not W3C's list of failures; a pattern found is a candidate, confirmed by reading the code around it.
- **From code**: how much reading the code can settle.
  - *Yes*: the code shows a pass or a fail.
  - *Partly*: the code shows likely failures, but a pass needs a person (wording quality, what a screen reader announces, what the page looks like).
  - *No*: needs a person with the page, the media or assistive technology. Report it under "Check by hand".
- The source key for every criterion is `WCAG-<number>` (tier S), for example `WCAG-1.1.1 S`.

## 1 Perceivable

### 1.1.1 Non-text content (A) · `non-text-content`
- Asks: every image, icon, chart and other non-text content that carries meaning has a text alternative serving the same purpose; controls and inputs have a name that says what they do; decoration is hidden from assistive technology. CAPTCHAs say what they are and offer a form in another sense.
- Look for: `<img>` with no `alt`; `alt` that repeats the file name or says "image"; decorative images with non-empty `alt` (use `alt=""`); icon-only buttons and links with no text, `aria-label` or visually hidden text; inline `<svg>` that carries meaning without `role="img"` and a name, or that is decorative without `aria-hidden="true"`; meaning carried only by a CSS background image; charts with no text summary or data table.
- From code: Partly. Presence is in the code; whether the text is equivalent needs reading it in context.

### 1.2.1 Audio-only and video-only, prerecorded (A) · `audio-only-and-video-only-prerecorded`
- Asks: prerecorded audio alone has a text alternative (a transcript); prerecorded video alone has a text alternative or an audio track that gives the same information. Exempt: media that is itself the alternative to text and labelled so.
- Look for: `<audio>`, `<video>` without sound, podcast or embedded players; a transcript link near them.
- From code: Partly. Whether the transcript is equivalent needs a person. No media: Not present.

### 1.2.2 Captions, prerecorded (A) · `captions-prerecorded`
- Asks: prerecorded video with sound has captions.
- Look for: `<video>` without `<track kind="captions">` (or `subtitles` carrying the dialogue); embedded YouTube, Vimeo or other players, whose captions live on that platform.
- From code: Partly. A track or a platform setting shows captions exist; their accuracy and sync need a person. No video with sound: Not present.

### 1.2.3 Audio description or media alternative, prerecorded (A) · `audio-description-or-media-alternative-prerecorded`
- Asks: prerecorded video with sound has audio description of what is only shown, or a full text alternative.
- Look for: `<track kind="descriptions">`, a described version, a full transcript that includes what is shown.
- From code: No. Whether the visuals carry information the soundtrack does not needs someone to watch it.

### 1.2.4 Captions, live (AA) · `captions-live`
- Asks: live video with sound has captions.
- Look for: live streams, webinars, live embeds.
- From code: No. The result is usually Not present; when live media is there, it needs a person.

### 1.2.5 Audio description, prerecorded (AA) · `audio-description-prerecorded`
- Asks: prerecorded video with sound has audio description (at AA a text alternative alone is not enough).
- Look for: as 1.2.3.
- From code: No.

### 1.3.1 Info and relationships (A) · `info-and-relationships`
- Asks: structure shown visually (headings, lists, tables, labels, groups, required fields) is in the code too, or is stated in text.
- Look for: headings drawn with styled `div`s or `span`s instead of `h1` to `h6`; heading levels picked for their look so the levels misstate the structure; lists not in `ul`, `ol` or `dl`; data tables without `th` (and `scope` where it is ambiguous); layout tables that carry data-table markup (`th`, `caption`, `scope`, `headers`, a non-empty `summary`) [WCAG-F46 S]. WCAG does not forbid layout tables themselves: one with none of that markup (or `role="presentation"`) passes 1.3.1, and its reading order belongs to 1.3.2; avoiding them is rule 14.1, Strong; inputs whose visible label is not tied to them (`label for`/`id`, a wrapping `label`, or `aria-labelledby`); radio and checkbox groups without `fieldset` and `legend` or `role="group"` with a name; a required marker with no `required` or `aria-required`. Skipped heading levels and missing landmarks are best practice, not failures of 1.3.1 on their own: mention them under the report, outside the criterion results (judgment).
- From code: Yes for markup; Partly for whether everything visual is reflected.
- Rule: 14.1 for data tables.

### 1.3.2 Meaningful sequence (A) · `meaningful-sequence`
- Asks: where order matters, the reading order in the code matches the meaning.
- Look for: CSS that reorders content (`order`, `flex-direction: *-reverse`, grid placement, absolute positioning) so the code order differs from the visual one; content placed visually before the thing it introduces.
- From code: Yes. Same checks as the focus-order part of rule 12.5, for all content, not only focusable elements.

### 1.3.3 Sensory characteristics (A) · `sensory-characteristics`
- Asks: instructions do not rely only on shape, colour, size, position, orientation or sound ("press the round button", "see the panel on the right").
- Look for: interface copy and help text with "left", "right", "above", "below", "round", "green", "red", "the icon", "when you hear".
- From code: Yes, in the copy the code holds. Text from a CMS or an API needs a person.

### 1.3.4 Orientation (AA) · `orientation`
- Rule: 13.1.

### 1.3.5 Identify input purpose (AA) · `identify-input-purpose`
- Rule: 13.5.

### 1.4.1 Use of colour (A) · `use-of-color`
- Rule: 1.3.

### 1.4.2 Audio control (A) · `audio-control`
- Rule: 12.4.

### 1.4.3 Contrast, minimum (AA) · `contrast-minimum`
- Rule: 1.1. Compute ratios with `references/data/colour/contrast.md`.

### 1.4.4 Resize text (AA) · `resize-text`
- Rule: 3.6, first bullet.

### 1.4.5 Images of text (AA) · `images-of-text`
- Asks: text is real text, not a picture of text, where the technology can show it. Exempt: logos, and images of text that are essential or that people can restyle.
- Look for: banners, buttons, headings or quotes shipped as PNG, JPG or SVG with text in them (file names, `alt` that reads like a sentence or a headline); text drawn into `<canvas>`.
- From code: Partly. File names and `alt` suggest it; opening the image settles it.

### 1.4.10 Reflow (AA) · `reflow`
- Rule: 4.4.

### 1.4.11 Non-text contrast (AA) · `non-text-contrast`
- Rule: 1.2.

### 1.4.12 Text spacing (AA) · `text-spacing`
- Asks: nothing is lost when a person overrides text spacing to line height 1.5 times the font size, space after paragraphs 2 times, letter spacing 0.12 times and word spacing 0.16 times. The product does not have to use these values; it has to survive them.
- Look for: fixed `height` (or `max-height` with `overflow: hidden`) on boxes holding text: buttons, cards, tabs, badges, table cells; `white-space: nowrap` with `overflow: hidden` on labels; text positioned absolutely over other text. `min-height` and letting boxes grow pass.
- From code: Partly. With a browser, add a style with those four values to the page and look for clipped or overlapping text.

### 1.4.13 Content on hover or focus (AA) · `content-on-hover-or-focus`
- Rule: 13.6.

## 2 Operable

### 2.1.1 Keyboard (A) · `keyboard`
- Rule: 12.5.

### 2.1.2 No keyboard trap (A) · `no-keyboard-trap`
- Asks: wherever keyboard focus can go, it can leave with the keyboard; if leaving needs more than Tab, Shift+Tab, arrows or another standard key, the user is told how.
- Look for: modals and menus that hold focus with no Escape and no close button reachable by keyboard; key handlers that call `preventDefault()` on Tab; embedded editors, maps, video players and iframes that keep focus.
- From code: Partly. A focus trap with an Escape handler and a close control passes; third-party embeds need a person with a keyboard.

### 2.1.4 Character key shortcuts (A) · `character-key-shortcuts`
- Asks: a shortcut that uses only a letter, number, punctuation or symbol key can be turned off, remapped to include Ctrl, Alt or similar, or works only while its component has focus.
- Look for: `keydown`, `keypress` or hotkey-library bindings on `document` or `window` for single printable keys (`/`, `?`, `j`, `k`, `s`) without a modifier, and no setting to turn them off or remap them.
- From code: Yes.

### 2.2.1 Timing adjustable (A) · `timing-adjustable`
- Rule: 12.4.

### 2.2.2 Pause, stop, hide (A) · `pause-stop-hide`
- Rule: 12.4.

### 2.3.1 Three flashes or below threshold (A) · `three-flashes-or-below-threshold`
- Rule: 11.2, the flashing bullet.

### 2.4.1 Bypass blocks (A) · `bypass-blocks`
- Asks: a way to skip content repeated on every page (header, navigation) and reach the main content.
- Look for: a "Skip to main content" link first in the page that moves focus to `main`; or landmarks (`header`, `nav`, `main`) and headings at the start of sections. W3C lists the skip link, landmarks and headings among its sufficient techniques.
- From code: Yes. Check that a skip link is not hidden for keyboard users too (it should appear on focus).

### 2.4.2 Page titled (A) · `page-titled`
- Asks: each page has a title that says its topic or purpose.
- Look for: a missing or empty `<title>`; the same title on every route of a single-page app; how the framework sets it (`document.title`, Next.js `metadata`, a head component) and whether each route does.
- From code: Yes.

### 2.4.3 Focus order (A) · `focus-order`
- Rule: 12.5.

### 2.4.4 Link purpose, in context (A) · `link-purpose-in-context`
- Asks: what a link does can be told from its text, or from its text with its sentence, paragraph, list item or table cell.
- Look for: several "Read more", "Click here", "Learn more" or "here" links with different targets and nothing in their context to tell them apart (`aria-label` or visually hidden text can add it); icon-only links with no name; links whose name is a URL.
- From code: Partly.
- Rule: 16.2.

### 2.4.5 Multiple ways (AA) · `multiple-ways`
- Asks: more than one way to find a page in a set of pages (navigation, search, a site map, links between pages). Exempt: a page that is a step in a process or the result of one.
- Look for: site-wide navigation plus search, a site map or related links.
- From code: Partly. Depends on the whole site; say what was seen in scope.

### 2.4.6 Headings and labels (AA) · `headings-and-labels`
- Asks: headings and labels that exist describe their topic or purpose. It does not require headings or labels to exist; 1.3.1 and 3.3.2 cover that.
- Look for: generic headings ("Section 1", "Details" repeated), labels that do not say what goes in the field.
- From code: Partly. Wording is a judgment; flag only clear cases.

### 2.4.7 Focus visible (AA) · `focus-visible`
- Rule: 12.1.

### 2.4.11 Focus not obscured, minimum (AA) · `focus-not-obscured-minimum`
- Rule: 12.1.
- Look for: a sticky or fixed bar (`position: sticky` or `fixed`, a library app bar set to sticky, a cookie banner) with no `scroll-padding-top` or `scroll-padding-bottom` of at least its height on the scrolling element. With such a bar and no padding, the result is Check by hand at least, never No issue found: code cannot show where focus lands when the page scrolls.

### 2.5.1 Pointer gestures (A) · `pointer-gestures`
- Rule: 13.2.

### 2.5.2 Pointer cancellation (A) · `pointer-cancellation`
- Rule: 13.3.

### 2.5.3 Label in name (A) · `label-in-name`
- Asks: when a control shows a text label, its accessible name contains that text; W3C advises starting with it. Speech users say what they see.
- Look for: `aria-label` or `aria-labelledby` that replaces the visible text with other words (visible "Send", name "Submit message"); a name that puts other words before the visible text.
- From code: Yes.

### 2.5.4 Motion actuation (A) · `motion-actuation`
- Rule: 13.4.

### 2.5.7 Dragging movements (AA) · `dragging-movements`
- Rule: 12.2.

### 2.5.8 Target size, minimum (AA) · `target-size-minimum`
- Rule: 2.1.

## 3 Understandable

### 3.1.1 Language of page (A) · `language-of-page`
- Asks: the page's main language is in the code.
- Look for: `<html lang="...">` missing, empty or wrong (a French page with `lang="en"`); the template or framework config that sets it.
- From code: Yes.

### 3.1.2 Language of parts (AA) · `language-of-parts`
- Asks: passages in another language carry their own language in the code. Exempt: proper names, technical terms, words of no clear language, and words that have entered the surrounding language.
- Look for: quotes, testimonials or a language switcher showing other languages ("Deutsch", "Español") without `lang` on them.
- From code: Partly.

### 3.2.1 On focus (A) · `on-focus`
- Asks: moving focus to something never changes the context by itself (a new page, a new window, a submit, focus moved elsewhere, content rearranged so the page means something else).
- Look for: `onfocus` or `focus` handlers that navigate, submit, open windows or dialogs, or move focus.
- From code: Yes.

### 3.2.2 On input (A) · `on-input`
- Asks: changing a control's value (choosing an option, ticking a box, typing) does not change the context by itself, unless people were told before using it.
- Look for: a `select` or radio group whose `change` handler navigates or submits; forms that submit when the last field is filled; checkboxes that reload the page. Filters that update a list in place are a change of content, not of context, and pass (judgment from the definition of change of context).
- From code: Yes.

### 3.2.3 Consistent navigation (AA) · `consistent-navigation`
- Asks: navigation repeated across pages comes in the same relative order each time, unless the user changes it.
- Look for: one shared layout or navigation component used by every page passes; navigation written separately per page, or items reordered by page, needs comparing.
- From code: Yes when pages share a component; Partly otherwise.

### 3.2.4 Consistent identification (AA) · `consistent-identification`
- Asks: things that do the same job across pages are labelled and pictured the same way.
- Look for: the same action named differently ("Search" and "Find", "Basket" and "Cart"), or the same icon given different names, across pages.
- From code: Partly.

### 3.2.6 Consistent help (A) · `consistent-help`
- Rule: 12.3.

### 3.3.1 Error identification (A) · `error-identification`
- Asks: when an input error is detected automatically, the field in error is identified and the error is described in text.
- Look for: errors shown only as a red border or an icon; one generic "There was an error" with no field named; error text not tied to its field (`aria-describedby`, `aria-invalid="true"`), which falls under 1.3.1. Rule 9.1 covers placement.
- From code: Yes.

### 3.3.2 Labels or instructions (A) · `labels-or-instructions`
- Asks: where input is needed, labels or instructions are given.
- Look for: fields with no visible label and no instructions; fields whose only label is a placeholder. The criterion's text does not mention placeholders, but W3C's Understanding page asks that labels stay available while people fill the field, and a placeholder disappears when they type: report it as Fails, and say in the finding that this reads 3.3.2 through that page (rule 7.2). W3C allows a clear icon in context (a send button beside a chat box) as the label. A visually hidden label or `aria-label` added to such a field does not settle 3.3.2 without that icon or a visible label. A placeholder usually still gives the field an accessible name, so do not also fail 4.1.2 for it.
- From code: Yes.

### 3.3.3 Error suggestion (AA) · `error-suggestion`
- Asks: when an input error is detected and a correction is known, it is suggested, unless that would undermine security or the purpose of the content.
- Look for: messages like "Invalid date" or "Invalid value" where the expected format or range is known ("Enter a date like 27 3 2026"). Rule 9.2 covers wording.
- From code: Yes.

### 3.3.4 Error prevention, legal, financial, data (AA) · `error-prevention-legal-financial-data`
- Asks: for submissions that create legal commitments or financial transactions, change or delete user data, or submit test answers, at least one of: the submission can be reversed, input is checked and people can correct it, or there is a step to review and confirm before it is final.
- Look for: payments, orders, contract or account changes, deletions that complete in one step with no review, no undo and no input check. Rule 10 covers undo and confirmation design.
- From code: Yes.

### 3.3.7 Redundant entry (A) · `redundant-entry`
- Rule: 7.4.

### 3.3.8 Accessible authentication, minimum (AA) · `accessible-authentication-minimum`
- Rule: 7.5.

## 4 Robust

### 4.1.2 Name, role, value (A) · `name-role-value`
- Asks: every interface component has a name and role that assistive technology can read; states, properties and values people can set can be set by it too; changes are announced. Native HTML controls used as specified pass.
- Look for: clickable `div`s and `span`s with no `role`, no `tabindex` and no key handling (also rule 12.5); custom checkboxes, switches, tabs, menus, accordions and comboboxes without their role and state (`aria-checked`, `aria-selected`, `aria-expanded`, `aria-controls`); `aria-hidden="true"` on something focusable or on a parent of one; buttons and fields with no accessible name (also rule 12.5); `role` values that contradict the element. Components from a maintained accessible library (Radix, React Aria, Headless UI, MUI) usually handle this; check only how the project uses them (judgment).
- From code: Partly. A screen reader confirms what is announced.

### 4.1.3 Status messages (AA) · `status-messages`
- Asks: status messages that appear without taking focus (saved, added to cart, 12 results, upload progress, an error summary that does not get focus) are exposed through a role or property so assistive technology announces them.
- Look for: toasts, snackbars, result counts and inline confirmations rendered with no `role="status"`, `role="alert"` or `aria-live`. In practice the live region has to be in the page before its text changes; one rendered together with its message is often not announced (judgment).
- From code: Yes for the markup; Partly for whether it is announced.

## Removed in 2.2

### 4.1.1 Parsing
- Obsolete and removed in WCAG 2.2; W3C says assistive technology no longer parses HTML directly. Never report it.
