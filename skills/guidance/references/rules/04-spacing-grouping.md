# 4. Spacing and grouping

**4.1 One spacing scale** (Default) [M3-SPACING A]
- Material 3: 8dp base (space100 = 8dp). Tokens 0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 32, 36, 40, 48, 56, 64, 72dp; main units are multiples of 8, while 2, 4, 6 and 10 are for tight component internals.
- Layout: 8, 16, 24, 32, 48, 64. Inside components: 4, 8, 12, 16. Density roles use the scale from 4 up without 6, 10, 14 and 36 (rule 4.7; judgment).
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
- Text at least 16px for content; 14px (`body-sm`) for form labels and secondary text; 12px (the `label` step) only for captions, metadata and short interface labels such as badges and table headers.
- Cramped screen: remove or move a component before shrinking spacing.

**4.7 One density for the product, one per page** (Default) [M3-DENSITY A, FIORI-DENSITY B, CLOUDSCAPE-DENSITY B]
- The product has one density: compact, default or comfortable (values in `references/data/scales.md`, Density), expressed through role tokens so the whole app moves together.
- A page may override it when its content calls for it: a report table in a default product, a welcome page in a compact one. Material says density can change with context and that not every layout needs it [M3-DENSITY A]. Fiori and Cloudscape disagree: both set density for the whole application and Cloudscape says not to apply compact to individual pages or components [FIORI-DENSITY B, CLOUDSCAPE-DENSITY B]. Material is the higher tier, so overrides are permitted, but keep them few.
- One density within a page's content: no mixing of presets between its sections [FIORI-DENSITY B]. Two exceptions, both judgment: the shared shell (navigation, header) keeps the product's density on an overridden page, and one self-contained dense component (a data grid, a code editor) may run compact, in line with Material's per-component density scale [M3-DENSITY A].
- Compact: data-rich products where people scan and compare a lot, such as dashboards, tables and financial tools [M3-DENSITY A], on devices used with a mouse and keyboard [FIORI-DENSITY B]. Comfortable: products that put a focused message, less information or easier navigation first [M3-DENSITY A]. Default: everything else.
- A product may ship compact as its only density when it needs high information density [FIORI-DENSITY B]. A product that lets people choose always offers default as well, and starts on it [CLOUDSCAPE-DENSITY B, which calls that level "comfortable"].
- A preset changes spacing and control height only. Font size stays the same [FIORI-DENSITY B]; so do the scale, radius and the target floors. Accessible targets keep their minimum size even when the visible element is smaller [M3-DENSITY A]: by default, on touch layouts (under 600px wide or a coarse pointer) control and row heights are at least the touch size in every preset (rule 2.2). Nothing drops under 24x24 CSS px (rule 2.1).
- Do not densify focused tasks such as choosing from a menu, or components that alert people to a change, such as snackbars and dialogs [M3-DENSITY A]. By default they keep the default values in a compact product or page.
- Density does not change by itself across breakpoints or orientation; only the person changes it [M3-DENSITY A]. If the product offers a density setting, its control keeps default target sizes [M3-DENSITY A].
- Who wins: Fiori forces its touch-size mode on phones while Material says density should not switch automatically. Rule 2.2 settles the default: spacing roles stay as chosen, control and row heights rise to the touch size on touch layouts. That is a target-size floor, not a density change (judgment).
- Single roles may be tuned on top of the preset, so products of the same density do not all share one rhythm: wider sections for reading, tighter lists for data (judgment). The user decides. A pick becomes a risk where it leaves the spacing scale (rule 4.1; control and row heights move by Material's 4dp density step instead [M3-DENSITY A]), stops being tighter inside a group than between groups (rule 4.2), or goes under the touch size on touch layouts (rule 2.2): the command says why, and an accepted risk is recorded in the token file. Only the 24px target floor (rule 2.1, Hard) is not open to choice.
- No study in the sources says which density performs best; the preset values beyond Material's and Fiori's numbers, and every tuning, are judgment.
