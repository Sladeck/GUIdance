# Breakpoints [M3-WINDOW]

| Class | Width | Typical layout |
| --- | --- | --- |
| Compact | under 600dp | Phone portrait: one pane, bottom navigation |
| Medium | 600 to 839dp | Tablet portrait, foldables: one pane (two possible), navigation rail |
| Expanded | 840 to 1199dp | Tablet landscape, small laptops: two panes, navigation rail |
| Large | 1200 to 1599dp | Desktop: two panes, rail or drawer |
| Extra-large | 1600dp and up | Large desktop: up to three panes |

Height classes: compact under 480dp, medium 480 to 899, expanded 900 and up.

Layouts break right before they switch: test both sides of each edge (599 and 600, 839 and 840, 1199 and 1200). `/guidance review` reads the code for 320 (WCAG reflow), 390, 768 and 1440, and for both sides of the page's own media queries, falling back to these Material edges when the page has none.

Navigation by window size [M3-NAVBAR, M3-NAVRAIL]: compact windows use a navigation bar (three to five destinations, each with icon and label) or a modal rail behind a menu icon, never a standard rail; medium to extra-large windows use a navigation rail, collapsed or expanded, and a medium window with few destinations may keep the bar. Apple: tab bar for top-level sections, sidebar where there is room, in general at most two levels in it [APPLE-TABBAR, APPLE-SIDEBAR] (rule 13.9).
