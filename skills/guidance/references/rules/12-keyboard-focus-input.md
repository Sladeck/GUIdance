# 12. Keyboard, focus and input

**12.1 Focus visible and unobscured** (Hard) [WCAG-2.4.7 S, WCAG-1.4.11 S, WCAG-2.4.11 S]
- Every interactive element shows a focus indicator (2.4.7). A focus style the project defines needs 3:1 contrast (1.4.11); the browser's default focus style is exempt. A focused element is never fully hidden by sticky headers, cookie bars or overlays (2.4.11); use `scroll-padding-top` for sticky headers.

**12.2 Alternatives to dragging and gestures** (Hard) [WCAG-2.5.7 S, APPLE-A11Y A]
- Anything done by dragging also works with single clicks or taps, without dragging (2.5.7): W3C's examples: a sortable list where a tapped item gets move up and move down controls, a slider whose track can be clicked to move the thumb there, a draggable map with arrow buttons. The alternative cannot be a swipe either (rule 13.2). Exempt: dragging that is essential, and scrolling or dragging the browser itself provides.
- Custom gestures (swipe to delete) also get an on-screen button [APPLE-A11Y A].

**12.3 Consistent help** (Hard, Level A) [WCAG-3.2.6 S]
- Help repeated across pages (contact details, a contact form or chat, a help or FAQ page, an automated assistant) comes in the same order relative to the rest of the page each time, at the same window size and zoom (3.2.6). It does not have to be on every page; where it appears, it is in the same place in the order.

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

**12.6 A focus indicator big enough to see** (Default) [WCAG-2.4.13 S-AAA]
- A focus indicator the project defines covers at least the area of a 2 CSS px line around the unfocused component, and those pixels change by at least 3:1 between unfocused and focused (2.4.13). This is WCAG's AAA level: rule 12.1 is the AA requirement, this one makes focus easy to find.
- The simple way to meet it: a solid outline at least 2px thick, drawn on or outside the component's edge (`outline` with `outline-offset`), in a colour with 3:1 against the background it is drawn over. The project's focus tokens (2px wide, 2px offset) meet it when their colour does. W3C's figures show a 2px line drawn inside the component, away from its edge, failing; it needs 3px.
- Weaker indicators fail it: a 1px outline, a background tint that changes by less than 3:1. Likely to fail, depending on their area (judgment): a 2px dotted or dashed outline, a thin underline. Shadows and glows outside the component do not count toward the area. W3C gives the minimum area of a rectangle as 4 x (width + height) square px.
- Exempt: the browser's own focus indicator, where neither it nor the background behind it is changed by the author.
- Break: a product that commits to AA only may keep a smaller indicator; it still meets rule 12.1.
