# Elevation [M3-ELEVATION]

| Level | Height | Key shadow (30% opacity) | Ambient shadow (15% opacity) | Typical use |
| --- | --- | --- | --- | --- |
| 0 | 0dp | none | none | Flat surfaces, filled and outlined cards |
| 1 | 1dp | 0 1px 2px 0 | 0 1px 3px 1px | Elevated cards, search bars, resting buttons with a shadow |
| 2 | 3dp | 0 1px 2px 0 | 0 2px 6px 2px | Menus, top app bar on scroll, hovered level 1 |
| 3 | 6dp | 0 1px 3px 0 | 0 4px 8px 3px | Dialogs, floating action buttons, popovers |
| 4 | 8dp | 0 2px 3px 0 | 0 6px 10px 4px | Hover state of level 3 only |
| 5 | 12dp | 0 4px 4px 0 | 0 8px 12px 6px | Dragged items only |

- Shadow colour: the shadow role (black in both themes). Level 1 in CSS: `box-shadow: 0 1px 2px 0 rgb(0 0 0 / .3), 0 1px 3px 1px rgb(0 0 0 / .15);`. Rest at 0 to 3; 4 and 5 for hover and drag.
- Material separates mostly with tonal surfaces (`surface-container-*`). Dark themes barely show shadows: a raised surface also steps up one surface-container tone.
- Judgment: one cue per surface (border, shadow or tone), never a border plus a strong shadow; at most three shadow levels per screen.

Ant Design [ANTD-SHADOW, ANTD-SOURCE]: its spec names four levels in the same order, none (inputs), low (a card on hover), medium (dropdowns) and high (dialogs). The antd 6.7.2 library draws two shadows: a card on hover takes the low one, and dropdowns and modals share one (`boxShadow`, `boxShadowSecondary`: `0 6px 16px 0 rgb(0 0 0 / .08), 0 3px 6px -4px rgb(0 0 0 / .12), 0 9px 28px 8px rgb(0 0 0 / .05)`); the spec's high level is not used [ANTD-SOURCE]. In an antd project a custom surface takes the shadow antd draws for its kind, rather than Material's (rule 5.3).
