# `/guidance inspect` on Sprout (before)

Page: `before/index.html`, served over http. Measured with the snippets from `browser-checks.md`:
- inspect (snippet 4) at 390x844 (mobile), 768x1024 (tablet), 1440x900 (desktop), 320 wide (WCAG reflow), and 800/801, both sides of the page's only breakpoint (`max-width: 800px`);
- targets and contrast (snippets 1 and 3) at 390 and 1440;
- keyboard (snippet 5) at desktop, after one Tab key press.

The project has no tokens, so scales come from Material 3. Raw output: [`inspect-before.json`](inspect-before.json).

**Result: 17 findings**, merged from 33 inspect results across all widths, 7 contrast failures, 10 buttons with no visible focus and 14 small tap targets. 6 Hard, 3 Strong, 8 Default. Two only show up on small screens, which is exactly what a desktop check would miss.

## Hard

1. **[Hard] The stat cards push the page sideways (mobile and 320)**
   Where: `styles.css:30-32`, `.stats` is a non-wrapping flex row and each `.stat` has `min-width: 210px`. At 390px the page is 688px wide.
   Why: content wider than the screen forces sideways scrolling and hides the third card. Rule 4.4, WCAG 1.4.10 Reflow (S).
   Fix: a grid that fits the screen: `display: grid; grid-template-columns: repeat(3, minmax(0, 1fr))`, and drop the `min-width`.

2. **[Hard] At 320px the plant list and the avatar also break out (320 only)**
   Where: `styles.css:47-56` (`.plant` rows cannot wrap, so the list reaches 366px) and the top bar, `styles.css:12-24` (the avatar sticks out 39px past the header).
   Why: same as above, at the width WCAG requires to work. Rule 4.4, WCAG 1.4.10 (S).
   Fix: `flex-wrap: wrap` on `.plant` with the buttons in their own group, `min-width: 0` on `.plant-info`; let the nav wrap to its own line under 600px.

3. **[Hard] "Water now" is cut off inside its button (all sizes)**
   Where: `styles.css:64-65`, `.water { width: 96px; overflow: hidden }`, on 3 buttons. The label is 3px wider than the box.
   Why: part of the label is clipped with no sign it is there. Rule 4.4 (judgment on top of WCAG 1.4.10).
   Fix: remove the fixed width and `overflow: hidden`; size with padding (`0 var(--space-200)`).

4. **[Hard] 7 pieces of text are below 4.5:1 contrast (all sizes)**
   Where:
   - `styles.css:27` and `:43`: the date and the section intro in `#999` on the page background, 2.67:1;
   - `:61`: plant details in `#8a8a8a` on white, 3.45:1;
   - `:62`: "2 days late" in `#e05a47`, 3.67:1;
   - `:24`: the avatar initials, 4.21:1;
   - `:90`: the tip text, 4.31:1.
   Why: people with low vision or on a bright screen cannot read it. Rule 1.1, WCAG 1.4.3 (S).
   Fix: use the `on-surface-variant` role for secondary text and `error` for late plants. Both reach 4.5:1 on every surface in the palette tables.

5. **[Hard] Form fields have almost invisible edges (all sizes)**
   Where: `styles.css:85`, `border: 1px solid #e9e9e9` on 2 inputs and the select: 1.21:1 against the card, with a white fill on a white card.
   Why: people cannot see where to click or type. Rule 1.2, WCAG 1.4.11 (S).
   Fix: `border: 1px solid var(--color-outline)` (3:1 or more in every palette).

6. **[Hard] Keyboard users cannot see which button they are on (all sizes)**
   Where: `styles.css:76`, `outline: none` on `.water`, `.icon-btn` and `.primary` with nothing in its place: all 9 buttons in the plant list and "Add plant".
   Why: tabbing through the list, focus disappears, so keyboard and switch users lose their place. Rule 12.1, WCAG 2.4.7 Focus Visible (S).
   Fix: delete the rule and add one global `:focus-visible { outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: var(--focus-ring-offset); }`. It only shows for keyboard users, so mouse clicks stay clean.

## Strong

7. **[Strong] Headings sit closer to what is above them than to their own content (all sizes)**
   Where:
   - `styles.css:44`: "To water today" has the intro line 6px above it and 20px below it;
   - `styles.css:27-28`: "Good morning, Mina" is 6px under the date and 22px above the stats.
   Why: readers group the heading with the wrong block. Rule 4.2, Material 3 spacing (A), NN/g proximity (B).
   Fix: put the heading first, its intro right under it, and wrap the pair (`.section-head`, gap 4px, 16px below). Group the date and the greeting the same way, as one page header.

8. **[Strong] Uneven gaps in the same list (all sizes)**
   Where:
   - `styles.css:55` and `:57`: the plant rows are 10px apart, but `.late` adds 18px;
   - `styles.css:81` and `:90`: the form fields are 14px apart, but the button adds 4px of margin;
   - `styles.css:26-30`: the page blocks are 6px, 22px and 30px apart.
   Why: equal items at unequal distances look unfinished and suggest a grouping that does not exist. Rule 4.2 (A, B).
   Fix: set the spacing once on the parent (`gap` on `.plants`, `.form` and `.page`) and remove the margins on the children.

9. **[Strong] Late plants use a thicker border instead of the shared style (all sizes)**
   Where: `styles.css:57`, `.plant.late { border-width: 2px }`, which also makes 1px and 2px card borders.
   Why: the same component should look the same; the late state is already shown by the red text. Rule 4.5 (A, B, judgment).
   Fix: drop the 2px border; keep the late state in the text colour and wording.

## Default

10. **[Default] Spacing off the scale (all sizes)**
   Where:
   - 18px ×12 (`styles.css:21`, `:57`, `:89`);
   - 13px ×6 (`:51`);
   - 9px ×6 (`:67`);
   - 26px ×4 and 22px ×3 (`:14-15`);
   - 30px ×3 (`:26`, `:30`).
   Why: values picked by eye make the rhythm uneven. Rule 4.1, Material 3 spacing (A).
   Fix: the nearest steps: 16, 12, 8, 24, 24 and 32px, through spacing tokens.

11. **[Default] Six corner radii, three of them off the scale (all sizes)**
    Where:
    - 14px on the stat cards (`styles.css:36`);
    - 10px on the thumbnails and the Add button (`:58`, `:90`);
    - 6px on the fields (`:86`);
    - plus 8, 12 and 16px elsewhere.
    Why: shapes look slightly different for no reason. Rule 5.1, Material 3 shape (A).
    Fix: three steps: `--radius-sm` (8) for fields, `--radius-md` (12) for thumbnails and the tip, `--radius-lg` (16) for every card. Buttons are pills (`--radius-full`).

12. **[Default] The tip box nests a 12px corner inside a 12px corner with 6px padding (all sizes)**
    Where: `styles.css:91-92`.
    Why: corners that are not concentric look pinched. Rule 5.2 (A, C).
    Fix: the inner box is not needed. Make the tip one box with `--radius-md`.

13. **[Default] One stat card has its own padding (all sizes)**
    Where: `index.html:27`, `style="padding:20px"` on "Healthy", while the others have 18px.
    Why: same component, different look. Rule 4.5.
    Fix: remove the inline style.

14. **[Default] Near-duplicate greens and greys (all sizes)**
    Where:
    - `#2f7e4b` (`styles.css:40`, `:90`) next to the brand `#2f7d4a`;
    - `#e9e9e9` (`:85`) next to `#e6e6e6`.
    Why: copied hex values that drifted. Rule 4.5.
    Fix: one colour per role: `--color-primary` and `--color-outline-variant`.

15. **[Default] Text sizes off the type scale, and 4 font weights (all sizes)**
    Where:
    - sizes: 19px (logo and h2, `styles.css:19`, `:44`), 13px ×13 (labels and meta), 30px (h1, `:28`), 15px (body, `:6`);
    - weights: 300, 400, 600 and 700. The 300 is the 30px heading (`:28`).
    Why: sizes between scale steps blur the hierarchy; light weights read poorly on low-quality screens. Rules 3.1 and 3.3, Material 3 type (A), Apple typography (A).
    Fix: headline 32, title 22, body 16, body-sm 14, label 12; weights 400, 500 and 700 only.

16. **[Default] Tap targets under 44px on mobile (mobile only)**
    Where:
    - "Water now" is 35px tall (`styles.css:67`);
    - Edit and Delete are 22x22 (`:77`);
    - the nav links are 17px tall (`:22`).
    All pass the WCAG 24px minimum thanks to spacing, but they are small for thumbs.
    Why: Apple asks for 44pt and Material for 48dp on touch screens. Rule 2.2 (A).
    Fix: `min-height: var(--target-touch)` on buttons and nav links; 44x44 icon buttons.

17. **[Default] Icons drawn at 13px (all sizes)**
    Where: `styles.css:77`, the ✎ and ✕ glyphs in the Edit and Delete buttons (6 icons).
    Why: icons are drawn for 20 and 24px; at 13px they look faint and smaller than the text beside them. Rule 5.4, Material Symbols sizes (A).
    Fix: 16 to 20px glyphs, centred in a 44px button.

Summary: 6 Hard, 3 Strong, 8 Default.

By width:
- 1, 2 and 16 are mobile only (2 at 320 only);
- nothing changes between 800 and 801px, the page's one breakpoint;
- everything else appears at every size.

The three fixes with the most impact:
1. the stats grid and the wrapping plant rows (Hard 1 and 2);
2. moving colours to roles (fixes Hard 4 and 5, and Default 14);
3. spacing on the parents with `gap` (Strong 7 and 8, and most of Default 10).
