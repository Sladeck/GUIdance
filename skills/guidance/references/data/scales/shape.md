# Shape [M3-SHAPE]

None 0 · extra small 4dp · small 8dp · medium 12dp (cards, small FAB) · large 16dp · large increased 20dp · extra large 28dp · extra large increased 32dp · extra extra large 48dp · full (buttons by default).

Nested shapes (optical roundness): inner = outer - padding (48 - 14 = 34). No large or full corners on information-dense containers.

**Shape presets.** Each maps the same radius roles to steps of the scale above. One preset for the product (rule 5.5); `/guidance shape` changes it.

| Role | Use | sharp | soft | round |
| --- | --- | --- | --- | --- |
| `radius-button` | buttons | 4 | 8 | full |
| `radius-field` | inputs, selects, text boxes | 4 | 8 | 12 |
| `radius-chip` | chips, tags, badges | 4 | 8 | full |
| `radius-card` | cards, panels; menus, popovers, tooltips | 4 | 8 | 12 |
| `radius-overlay` | dialogs, sheets | 8 | 12 | 28 |
| Use for | | tools, data, finance, developer and admin products; a precise, serious feel | most products | consumer, touch-first and playful products; a friendly feel |

Values in CSS px. Roles point at scale tokens (`--radius-card: var(--radius-sm)`), in the project's own naming.

- Sourced [M3-SHAPE]: every value is on the scale. Round follows Material's own defaults where its shape page states them: buttons full, cards medium (12). Remapping a component to another step is allowed: "by default, buttons are mapped to the full corner radius shape style. If your product needs a less rounded shape, remap the token to another style in the shape scale, such as small or medium." Products should use their shape styles consistently, with customization for hero moments or custom components.
- Judgment: the sharp and soft columns, the field, chip and overlay values of round, and which product suits which preset. No study in the sources measures corner radius.
- Tuning: a project may give single roles another value of the scale. Recorded in the project's `design-decisions.md` (`../../formats/decisions.md`, rule 5.5): `Shape: soft; tuned: button full, card 16`, with any risk the user accepted on the Accepted risks line. Tuned roles keep their values when the preset changes, unless the user resets them.
- Menus, popovers and tooltips sit with cards, not dialogs: they are small or hold lists, so past 12 they are a risk to confirm (judgment). A list item or thumbnail close to a card's edge takes the nested value (inner = outer - padding), not the card role; further in, it is never rounder than the card.
- Circles (avatars, round icon buttons) are not part of the presets.
