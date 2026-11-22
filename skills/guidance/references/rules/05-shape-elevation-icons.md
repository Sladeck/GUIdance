# 5. Shape, elevation and icons

**5.1 One radius scale** (Default) [M3-SHAPE A]
- Material 3: 0, 4, 8, 12, 16, 20, 28, 32, 48dp, and full. Use three or four steps for most of the product.
- Steps name roundness, not component size. Material maps buttons to full and cards to medium (12dp) by default; remapping a component is allowed.
- No large or full corners on information-dense containers.

**5.2 Concentric nested corners** (Default, wins over 5.1) [M3-SHAPE A, NESTED-RADIUS C]
- Inner radius = outer radius minus the padding between them (Material's "optical roundness": 48 - 14 = 34). Never the same radius for nested objects.
- The result can fall off the scale (Material's own 34dp does). Prefer padding that lands it on the scale (24 outer, 8 padding, 16 inner); otherwise the derived value wins: concentricity beats scale purity.
- Result 0 or negative: use 0 or 2 to 4px inside.

**5.3 Elevation: one cue, few levels** (Default) [M3-ELEVATION A, judgment]
- The six Material levels (`references/data/scales/elevation.md`) as tokens, never per-component shadows. Rest at levels 0 to 3; 4 and 5 only for hover and drag.
- One cue per surface: a border, a shadow or a tonal step. A border plus a strong shadow is two cues for one job (judgment).
- At most three shadow levels per screen; higher always means "in front of" (a dialog above a menu above a card).
- Dark themes: shadows barely show, so raised surfaces also take a lighter surface-container tone.
- Break: a brand with one signature shadow used consistently.

**5.4 Icons: one set, one style, two sizes** (Default) [M3-ICONS A, APPLE-TYPE A, judgment]
- One icon set. Outlined everywhere; filled only for a selected or active state.
- Optical sizes: 20px inline and dense, 24px in buttons and navigation, 40 to 48 for display only. At most two sizes per screen (judgment).
- Icon weight follows the adjacent text; icons centre on the text line.
- A 20 to 24px glyph still has a 44 to 48px tap area on touch (rule 2.2) and at least 24px everywhere (rule 2.1).
- Meaningful icons: 3:1 contrast (rule 1.2). An icon that stands alone as a control needs an accessible name: that is rule 12.5 (Hard), not this one.

**5.5 One shape for the product** (Default) [M3-SHAPE A, judgment]
- The product has one shape: sharp, soft or round (values in `references/data/scales/shape.md`, Shape presets), expressed through radius role tokens for buttons, fields, chips, cards and overlays (dialogs and sheets), so a change moves every instance together.
- Material assigns steps to components by how round they should look and allows a product to remap them: buttons are full by default and may be moved to small or medium; products should then use their shape consistently [M3-SHAPE A]. So the preset is the product's, not a page's: a shape for one page goes against rule 4.5 and is applied only as a risk the user accepted. Hero moments and custom components may take their own shape [M3-SHAPE A].
- Single roles may be tuned on top of the preset: pill buttons on a soft product, rounder cards (judgment). The user decides. A pick becomes a risk where it leaves the scale or passes four values in all (rule 5.1), or puts large or full corners on information-dense containers [M3-SHAPE A]: the command says why, and an accepted risk is recorded in `design-decisions.md`. Nested corners stay concentric either way (rule 5.2).
- Also flagged as risks (judgment): dialogs and sheets at full or less round than cards; fields at full when some are multi-line. Menus, popovers and tooltips take the card value, since they are small or hold lists.
- No source measures which shape performs or rates best; which preset fits which product is judgment.
- Break: a brand with a defined corner style keeps it, mapped to the nearest scale steps.
