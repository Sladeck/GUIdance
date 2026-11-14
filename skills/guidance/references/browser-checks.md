# Browser checks

Five self-contained JavaScript checks that measure a rendered page, in `checks/` (minified to save tokens). They need no install.

**How to run one:** read the file (for example `checks/inspect.js`) and pass its whole content to your browser tool's JavaScript execution; or ask the user to paste it into the browser's DevTools console and send back the result. Each returns an object with a one-line `summary` plus details.

**Run it again cheaply:** the first run registers the check on the page as `window.__gd.<name>`. After resizing the window or switching theme on the same page, run `__gd.inspect()` (or `__gd.targets()`, `__gd.contrast()`...) instead of sending the file again. After a navigation or reload, `__gd` is gone: send the file again.

They measure what the browser actually rendered (computed styles and boxes), so they work on any stack, including pages built by JavaScript. They need a real browser: fetched HTML is not enough (see "Opening a page" in SKILL.md).

| Check (file) | Used by | Run at |
| --- | --- | --- |
| 1. Target size (`targets.js`) | check, inspect | 390 and desktop (the 44px check is mobile only) |
| 2. Typography (`typography.js`) | check, audit | desktop, then 390 |
| 3. Rendered contrast (`contrast.js`) | check, inspect | one width per theme |
| 4. Inspect (`inspect.js`) | inspect, audit, fix | 390x844, 768x1024, 1440x900, 320, and both sides of each breakpoint it reports |
| 5. Keyboard and focus (`keyboard.js`) | inspect, audit, fix | desktop, after one real Tab key press |

To change the width, resize the browser window or viewport (DevTools device toolbar for the user), wait for the layout to settle, then run the snippet again.

Open pages over http (the dev server, or a preview server for static files), not as `file://`: browsers block scripts from reading linked stylesheets on file pages, so snippet 4 would miss the project's tokens and breakpoints. It warns when that happens. Snippets 3, 4 and 5 return INCONCLUSIVE while CSS transitions are running (for example right after switching theme): wait half a second and run again.

If no browser is available, say so, ask the user to run the snippets in DevTools, and meanwhile review the code against the rules, labelling those findings as read from code.

## 1. Target size (rule 2, WCAG 2.5.8)

FAIL: under 24x24 CSS px with no exception (spacing and inline-link exceptions are applied). WARN: under 44x44 at mobile width. NOTE: unstyled native controls. Not detectable: "equivalent control elsewhere" and "essential" exceptions.

Code: [`checks/targets.js`](../checks/targets.js) (minified; readable source in the repo at `tools/checks/targets.js`). Re-run on the same page: `__gd.targets()`.

## 2. Typography (rule 3)

Font sizes by share of text, body size, light weights at 16px or below, near-identical size steps, line height under 1.4 on multi-line blocks, and real characters per rendered line (40 maximum for CJK, 80 for others).

Code: [`checks/typography.js`](../checks/typography.js) (minified; readable source in the repo at `tools/checks/typography.js`). Re-run on the same page: `__gd.typography()`.

## 3. Rendered contrast (rule 1.1, WCAG 1.4.3)

For every visible text element: its colour against the real background behind it (walking up the page and blending transparent layers), at 4.5:1, or 3:1 for large text (24px, or 18.66px bold) and for symbols used as icons (no letters or digits, judged as graphics under WCAG 1.4.11). Disabled controls are skipped. Text over images or gradients is listed for a check by eye.

Code: [`checks/contrast.js`](../checks/contrast.js) (minified; readable source in the repo at `tools/checks/contrast.js`). Re-run on the same page: `__gd.contrast()`.

## 4. Inspect: consistency and layout (rules 1.2, 3.1, 4.1 to 4.5, 5.1 to 5.4)

Measures the page at the current width and returns `findings`, already ordered Hard, Strong, Default. Each finding has `severity`, `rule`, `kind`, `where` (short selector plus visible text), `value` (what was measured), `expected` and `count`, plus `cause` for horizontal scroll. The why and fix for each kind are in the table below, not in the result: write them into the report from here. Scales come from the project's own CSS custom properties when it has at least three of a kind (spacing, radius, type; any variable holding a colour counts as a colour token; `@import`ed files are followed), otherwise from Material 3 (`data/scales.md`). `breakpoints` lists the width pairs to test next: both sides of each width media query in the page's CSS, or Material 3's window-class edges (599/600, 839/840, 1199/1200) when there are none.

| Kind | Severity | Finds | Why it matters | Fix |
| --- | --- | --- | --- | --- |
| horizontal-scroll | Hard | The page is wider than the screen, with the deepest elements causing it | Content wider than the screen forces sideways scrolling and hides content; WCAG 1.4.10 (Reflow) requires none at 320px. | Constrain the element: max-width: 100%, min-width: 0 on flex/grid children, wrap long words (overflow-wrap: anywhere), or let tables scroll inside their own container. |
| overflows-container | Hard | Content sticking out of its card or bordered box | Content that crosses the edge of its card looks broken and can cover neighbouring content or become unreadable. | Make it fit at this width: smaller size or fewer items on small screens, let it wrap (flex-wrap), or give the container min-width: auto / more room. Avoid fixed widths. |
| clipped-content | Hard | Content cut off by overflow: hidden with no ellipsis | Part of the content is cut off with no sign it is there, so people miss information or controls. | Let the box grow (min-width: 0 on flex/grid children, no fixed width or height), wrap the content, or truncate deliberately with text-overflow: ellipsis and the full text in a tooltip or title. |
| faint-field | Hard | Input, select or textarea whose border and fill are both under 3:1 against the page | People cannot see where to click or type when a field has no visible edge (WCAG 1.4.11). | Use the outline token (3:1) for field borders, or give the field a fill that contrasts 3:1 with the page. |
| uneven-gaps | Strong | Three or more items in a row or column with different gaps between them | Items of the same group should sit at equal distances; uneven gaps break the grouping and look unfinished (proximity). | Set the spacing once on the parent (gap: the `expected` value) and remove per-item margins. |
| heading-proximity | Strong | A heading closer to the section above than to its own content | A heading belongs to the content under it; when it sits closer to the previous section, readers group it with the wrong block. | Increase the space above the heading and reduce the space below (more above than below). |
| spacing-off-scale | Default | Padding, margin and gap values off the scale, grouped by value with counts | Spacing outside the scale makes rhythm uneven and stacks small differences the eye reads as sloppiness. | Use the nearest scale step (px) through a spacing token. |
| component-drift | Default | Elements with the same classes in the same kind of parent that differ in padding, radius, border or font size | The same component should look the same everywhere; small variations read as mistakes and erode trust. | Give every instance the component's majority value (`expected`) from one shared style, or make the difference an explicit variant. |
| radius-off-scale, radius-count | Default | Corner radii off the scale, or more than 5 different radii (pills and circles excluded) | Corner radii outside the scale make shapes look slightly different for no reason. / Too many radii make the interface feel assembled from different kits. | Use px from the radius tokens. / Map every radius to 3 or 4 named steps (small controls, inputs and cards, sheets and dialogs, full). |
| nested-radius | Default | Inner corners that are not concentric with their container (inner = outer - padding) | Nested corners that are not concentric look pinched or bulging next to their container. | Set the inner radius to the `expected` value, or change the padding so outer minus padding lands on a scale step. |
| border-widths | Default | More than 3 border widths | Mixed border weights make the hierarchy noisy. | Use one hairline width for dividers and containers and one heavier width for focus and errors. |
| near-duplicate-colour | Default | Two colours a few units apart, unless both are exact tokens | Two almost identical colours are never intentional; they come from hard-coded values and make surfaces look patchy. | Replace both with the same colour token. |
| colour-off-token | Default | Colours not in the project's tokens (only when the project has 6 or more colour tokens) | Hard-coded colours bypass the palette: they will not follow dark mode or a rebrand, and their contrast was never checked. | Replace it with the closest colour role token (surface, on-surface, primary, outline...). |
| type-off-scale, weight-count | Default | Text sizes off the type scale (icon glyphs ignored), more than 3 font weights | Font sizes outside the type scale blur the hierarchy and multiply styles to maintain. / Many weights compete with each other and weaken emphasis. | Use the nearest type style (px) from the type tokens. / Keep regular for text, one medium for labels and buttons, one bold for headings. |
| near-alignment | Default | Stacked siblings whose left edges miss by 1 to 3px (full-bleed bars and centred containers excluded) | Edges that almost line up look like errors; the eye notices 1 to 3px misses. | Align both to the same edge: equal padding on the parent, no per-item offsets. |
| border-and-shadow | Default | A bordered surface that also has a strong shadow (blur 8px or more, or offset 4px or more) | Two separators for one surface look heavy and dated; Material separates with tone first, then one shadow level. | Keep the border and drop the shadow for resting cards, or keep an elevation token (level 1 to 3) and drop the border. |
| shadow-count | Default | More than 3 different shadows on the page (rings and inset lines are borders, not elevation) | Shadows invented per component make the depth order unreadable: nothing says what is in front of what. | Map every shadow to the Material elevation tokens (levels 0 to 3 at rest, 4 and 5 for hover and drag). |
| dark-shadow-only | Default | On a dark page, a surface separated from its background only by a shadow | Shadows barely show on dark backgrounds, so the surface melts into the page. | Give raised surfaces the next surface-container tone up in dark mode, and keep the shadow token. |
| icon-size-off, icon-size-count | Default | Icons (SVG up to 64px, icon-font classes, symbol glyphs in buttons) at sizes outside 16, 18, 20, 24, 32, 36, 40, 48, or more than 2 icon sizes | Icon sets are drawn for specific sizes; in between, strokes blur and icons look mismatched next to each other. / Many icon sizes make the screen look assembled from different kits. | Use px, through an icon size token. / Use 20px inline and in dense UI, 24px in buttons and navigation. |
| icon-stroke-mix | Default | Outline SVG icons with different stroke widths (usually two icon libraries) | Different stroke weights usually mean two icon libraries mixed together; they read as inconsistent at a glance. | Pick one icon set and replace the others, or set one stroke-width for all outline icons. |
| icon-misaligned | Default | An icon whose centre is 2 to 12px off its label's centre | An icon riding high or low next to its label looks like a rendering bug. | align-items: center on the row, and display: block (or vertical-align: middle) on the icon to drop the baseline gap. |

Identical findings on repeated components are merged into one with a count. The snippet measures; you judge. Confirm each finding in the code before reporting it, drop the ones that are clearly intended, and trace the rest to `file:line`. Set `window.__GD_OVERLAY = true` before running it to outline every finding on the page with its number (for a screenshot); reload to clear.

Code: [`checks/inspect.js`](../checks/inspect.js) (minified; readable source in the repo at `tools/checks/inspect.js`). Re-run on the same page: `__gd.inspect()`.

## 5. Keyboard and focus (rules 12.1 and 12.5; WCAG 2.1.1, 2.4.3, 2.4.7, 2.4.11, 1.4.11)

Walks the page in Tab order (positive tabindex first, then document order) by focusing each stop, then restores focus and scroll. Press Tab once in the page before running it: after a mouse click, browsers hide `:focus-visible` styles for scripted focus, and the snippet answers INCONCLUSIVE instead of reporting false failures.

| Result | Severity | Finds |
| --- | --- | --- |
| FAIL | Hard | No visible change on focus (on the element, its container or the visible stand-in of a hidden checkbox); focused element completely hidden by sticky or fixed content; positive tabindex; something that looks clickable (onclick, role, or cursor: pointer) that Tab cannot reach; focusable with no size |
| WARN | Strong | Focus ring under 3:1 against its background; focus shown only by a colour change; focused element mostly hidden; focusable while off-screen (closed drawers; skip links excepted); Tab jumping back up the page; CSS order or reverse directions on containers of focusable items |

Code: [`checks/keyboard.js`](../checks/keyboard.js) (minified; readable source in the repo at `tools/checks/keyboard.js`). Re-run on the same page: `__gd.keyboard()`.
