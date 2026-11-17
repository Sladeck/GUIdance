# 13. Platforms: phone, tablet, desktop and native

These rules apply on the web and in native apps unless a rule names its platform. Target sizes are rule 2.2, type sizes 3.1 and 3.2, widths 4.4, breakpoints `references/data/scales/breakpoints.md`.

**13.1 Works in both orientations** (Hard, Level AA) [WCAG-1.3.4 S]
- Content does not restrict its view and operation to portrait or landscape: no orientation lock, no "rotate your device" screen. A control that switches to the other orientation also passes.
- A layout that changes with the width of the screen is fine: W3C leaves changes due to display size out of this criterion.
- Exempt: an orientation that is essential (W3C's examples: a bank check, a piano app, slides for a projector or television, virtual reality).

**13.2 Every gesture has a simple alternative** (Hard: the first bullet; Default, on Apple platforms: the rest) [WCAG-2.5.1 S, APPLE-GESTURES A]
- Hard, Level A: anything done with several fingers (pinch, two-finger rotate) or along a path (a swipe, a drawn shape) also works with a single pointer and no path: a tap, a click, a button (2.5.1). Exempt: gestures that are essential, and gestures that belong to the browser, the system or assistive technology. A slider or a drag that only needs a start and an end point is dragging, not a path gesture: that is rule 12.2.
- A custom gesture is not the only way to perform an important action, and shortcut gestures add to the standard ones without replacing them [APPLE-GESTURES A].
- Standard gestures keep their standard meaning: avoid a familiar gesture such as tap or swipe for an action unique to the product [APPLE-GESTURES A].

**13.3 Presses can be cancelled** (Hard: the first bullet; the second is judgment) [WCAG-2.5.2 S]
- Hard, Level A: for anything a single pointer operates, one of these holds: the press (down-event) triggers nothing; the action completes on release and can be aborted before or undone after; release reverses what the press did; or acting on the press is essential (2.5.2). Keys of an on-screen keyboard or keypad count as essential.
- In practice (judgment, a hint and not a finding by itself): buttons and links act on click or release, so sliding off before lifting cancels. A drag that starts on press and can be aborted, a press-and-hold that release reverses, and on-screen keys all pass.

**13.4 Device motion is never the only way** (Hard, Level A) [WCAG-2.5.4 S]
- Anything operated by moving the device or the body (shake to undo, tilt to scroll) also works through a control on screen, and the response to motion can be switched off; a system setting that disables it counts (2.5.4).
- Exempt: motion used through an accessibility-supported interface, and motion that is essential to the function. Not covered: pointing a camera at a code or document, and movement registered by geolocation.

**13.5 Tell the system what each field is for** (Hard: the first bullet; Default: the rest) [WCAG-1.3.5 S, APPLE-KEYBOARDS A]
- Hard, Level AA: a field that collects information about the user (name, email, phone, address and the other purposes W3C lists) states its purpose in code, where the technology supports it (1.3.5). On the web that is the `autocomplete` attribute with its defined values.
- The on-screen keyboard matches the content being typed: a numeric keyboard for numbers, and so on. Give the field its semantic meaning and the system picks the keyboard [APPLE-KEYBOARDS A]. On the web the field's `type` and `inputmode` do this (judgment: not from the sources read).
- The field being typed in and the controls needed with it stay visible while the keyboard is up [APPLE-KEYBOARDS A].

**13.6 Content shown on hover or focus** (Hard: the first two bullets; the last is judgment) [WCAG-1.4.13 S]
- Hard, Level AA: tooltips, hover cards and menus that open on hover or focus can be dismissed without moving the pointer or the focus (Escape, by convention), the pointer can move onto them without their disappearing, and they stay until the trigger loses hover or focus, the user dismisses them, or their information stops being valid (1.4.13).
- Exempt: content the browser draws unmodified (a `title` tooltip), and, for the dismissal part, content that reports an input error or covers nothing else.
- Touch screens have no hover, so nothing should be reachable by hover alone (judgment, not part of 1.4.13).

**13.7 Keep content clear of system areas** (Default, on that platform) [APPLE-LAYOUT A, ANDROID-EDGE A]
- Apple platforms: respect the system's safe areas, margins and layout guides, so that hardware features such as the Dynamic Island and system bars do not cover content and controls [APPLE-LAYOUT A].
- Android: an app targeting SDK 35 is displayed edge to edge on Android 15 and later, drawing behind the status and navigation bars, and must handle insets so that nothing is obscured. Bottom bars stretch to the bottom edge and scrolling content shows behind the navigation bar [ANDROID-EDGE A]; what must stay clear of the bars is the controls and the end of the content (judgment).
- Web pages shown full-bleed on a phone (judgment: not from the sources read): pad fixed headers, footers and bottom bars with the CSS `env(safe-area-inset-*)` values.

**13.8 Leave the system's gestures alone** (Default, on that platform) [APPLE-GESTURES A, ANDROID-GESTURENAV A]
- Apple platforms: avoid custom gestures that conflict with the ones that open system UI. In a hierarchy of views people expect a Back button in the toolbar even when a shortcut gesture exists [APPLE-GESTURES A].
- Android: back is an inward swipe from the left or right edge. An app can opt specific elements on those edges out of it, and the standard drawer and seek bar components do so by themselves. Home and app switching are swipes at the bottom edge and cannot be opted out of [ANDROID-GESTURENAV A].
- So (judgment): a custom swipe area at the left or right edge either opts out or moves inward, and nothing custom starts at the bottom edge.

**13.9 Navigation follows the window size** (Default) [M3-NAVBAR A, M3-NAVRAIL A, M3-WINDOW A, APPLE-TABBAR A, APPLE-SIDEBAR A]
- Compact windows, under 600 wide (phones): a navigation bar at the bottom with three to five top-level destinations, each with an icon and a text label, or a modal navigation rail opened from a menu icon [M3-NAVBAR A]. Never a standard, always-visible rail [M3-NAVRAIL A].
- Medium windows and up, from 600 wide (tablets, desktop): a navigation rail, collapsed or expanded; a medium window with few destinations may keep the navigation bar [M3-NAVRAIL A]. Panes per window size are in `references/data/scales/breakpoints.md` [M3-WINDOW A].
- More than five destinations on a phone: tabs inside a page, or the modal rail behind a menu icon [M3-NAVBAR A].
- Apple platforms: a tab bar is for moving between top-level sections, not for actions; it stays visible as people move between sections, except under a modal view; its buttons are not disabled or hidden, an empty section explains itself; avoid an overflow "More" tab; fewer tabs are easier to navigate. On iPad, prefer a tab bar, which may offer to convert to a sidebar [APPLE-TABBAR A].
- Apple sidebars need a lot of room: where space is limited a tab bar may serve better; in general show no more than two levels of hierarchy; consider letting people hide the sidebar [APPLE-SIDEBAR A].
- Who wins: Apple on Apple platforms, Material on Android. On the web (judgment): a bottom bar under 600 wide, a rail or sidebar above, the same destinations in both.

**13.10 Sheets** (Default, on that platform) [APPLE-SHEETS A, M3-SHEETS A]
- Apple platforms: a sheet is for a scoped task closely related to the current context. One sheet at a time: when something in a sheet opens another, close the first before showing the second. Cancel or Close dismisses without saving; Done dismisses after completing or saving; Back moves inside a multi-step sheet and does not dismiss it [APPLE-SHEETS A].
- Material: a modal bottom sheet blocks the app until it is confirmed or dismissed, and suits a long list of actions or items that need descriptions, in place of an inline menu or simple dialog. A standard bottom sheet co-exists with the main content and both stay usable. Modal bottom sheets are for mobile; on larger windows Material gives bottom sheets a maximum width and uses side sheets on desktop [M3-SHEETS A].

No source read here supports a rule on where to place primary actions for thumb reach. The thumb study in rule 2.2 found the centre of the screen most comfortable, but location did not change error rates significantly, and it tested 20 people on a PDA in 2005: too thin for a rule, so the skill gives none.
