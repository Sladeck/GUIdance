# 12. Keyboard, focus and input

**12.1 Focus visible and unobscured** (Hard) [WCAG-2.4.7 S, WCAG-1.4.11 S, WCAG-2.4.11 S]
- Every interactive element shows a focus indicator (2.4.7). A focus style the project defines needs 3:1 contrast (1.4.11); the browser's default focus style is exempt. A focused element is never fully hidden by sticky headers, cookie bars or overlays (2.4.11); use `scroll-padding-top` for sticky headers.

**12.2 Alternatives to dragging and gestures** (Hard) [WCAG-2.2 S, APPLE-A11Y A]
- Anything done by dragging also works with single clicks or taps (2.5.7); custom gestures (swipe to delete) also get an on-screen button.

**12.3 Consistent help** (Hard, Level A) [WCAG-2.2 S]
- Help links or contact options repeated across pages keep the same relative place (3.2.6).

**12.4 Time limits and things that start by themselves** (Hard: the first four bullets; Default: the last) [WCAG-2.2.1 S, WCAG-1.4.2 S, WCAG-2.2.2 S, APPLE-A11Y A]
- Hard, Level A: a time limit set by the product can be turned off before people meet it, adjusted before they meet it to at least ten times the default, or extended: a warning before time runs out, at least 20 seconds to extend with a simple action, and at least ten extensions (2.2.1). A time limit is anything that happens without the user after a set time: a session timeout, a timed step, a page refresh, or a prompt that expires before people can react. Exempt: real-time events with no possible alternative (an auction), limits that are essential because extending them would invalidate the activity, limits over 20 hours.
- Hard, Level A: a message that disappears on a timer is such a time limit when it is the only place its information or action exists (2.2.1). A toast with Undo, where nothing else offers the undo (rule 10.1), stays until dismissed or meets the bullet above. Where the same information or action is available another way (W3C's example: a new-mail toast, with the mail visible in the inbox), the disappearance is not a time limit.
- Hard, Level A: audio that plays automatically for more than 3 seconds has a pause or stop control, or its own volume control (1.4.2). W3C discourages starting sound automatically at all.
- Hard, Level A: anything moving, blinking or scrolling that starts by itself, lasts more than 5 seconds and sits beside other content (a carousel, an autoplaying video, an animated background) can be paused, stopped or hidden. Content that updates by itself beside other content can be paused, stopped or hidden, or its frequency controlled (2.2.2). Exempt in both cases: what is essential to the activity. Loading indicators: W3C treats an animation as essential when nobody can interact during the load and showing no progress would make the page look frozen, and an indicator that is the only content on the page is not beside other content. A spinner or skeleton in one module while the rest of the page works is not settled by that text: raise it as a question, not a Hard finding (judgment).
- Default: other views that auto-dismiss on a timer (their content is available another way) are still better dismissed with an explicit action [APPLE-A11Y A].

**12.5 Everything works from the keyboard, in order** (Hard, Level A) [WCAG-2.1.1 S, WCAG-2.4.3 S, judgment]
- Everything a mouse can do works from the keyboard (2.1.1), except input that depends on the path of the movement, such as freehand drawing. In practice (judgment): controls are reached with Tab, or with arrow keys inside composite widgets (tabs, radio groups, menus), and work with Enter or Space; clickable `div`s and `span`s become `button` or `a`.
- Focus order preserves meaning and operability (2.4.3). In practice (judgment): no positive `tabindex`, no backward jumps from CSS reordering (`order`, `flex-direction: row-reverse`, grid placement).
- Hidden content (closed menus, off-screen drawers) is not focusable until it opens (judgment).
