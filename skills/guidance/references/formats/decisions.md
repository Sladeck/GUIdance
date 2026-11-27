# Design decisions record

The file `design-decisions.md` at the project root holds the product's design decisions in one place. `/guidance setup` writes it; `/guidance spacing` and `/guidance shape` update their lines; `/guidance review` and `build` read it, and what it lists is intended, not a finding. Fix and wcag do not use it.

- One line per decision, `Key: value`, then where it came from in brackets: `(found in code)`, `(README)`, `(asked)` or `(judgment)`.
- Keep the keys below, as spelled, and their order. Add a line only for a decision the user made that no key covers.
- GUIdance's record is the block that starts with the line `Written by GUIdance.`, in the file or in a section of it. A `design-decisions.md` without that line is the project's own: never overwrite it. Ask, with the command's other questions and before its plan, whether to add the record as a section at the end (`## Design decisions (GUIdance)`, then the second line of the template); the plan then names that section. Later runs find the record by that line and edit only that section.
- A command that writes the file keeps every line it did not change. Setup run again reads the file first and rewrites only what this run found or the user answered: tuned roles, pages and accepted risks stay.
- Spacing or shape that finds no file creates it with only what it knows: the first two lines, its own Density or Shape line, Accepted risks when there are any, and any line moved from a token-file comment. Setup fills the rest later. The command's plan names the new file.
- Left as is and Accepted risks hold only what the user chose: a value they kept when offered a change, a risk they accepted. Files a command did not touch are not decisions: say them in the finish instead.
- Older projects record decisions in token-file comments instead: `density:` and `shape:` lines, page lines (`density /reports: compact`), and setup's comment with the brand colour, the colour choices and accepted risks. Read them all when the record is missing. The next command that writes a decision moves every one of them into the record, under its keys, says so in its plan, and leaves one comment line in the token file pointing at it.

## Template

```
# Design decisions
Written by GUIdance. Edit a line here or run /guidance spacing or shape to change it. Review treats what is listed as intended.

- Product: <what it is>, for <who>, used on <desk, touch, both> (README)
- Platforms: <web, iOS, Android, macOS, Windows> (found in code)
- Stack: <framework and UI library with versions> (found in code; `(asked)` for a library picked in setup's starting point)
- Style: <design language followed: Material through MUI, Apple HIG, Fluent, a house style, GUIdance tokens> (found in code; `(asked)` when picked in setup's starting point)
- Light theme: <yes | no> (found in code)
- Dark theme: <yes | no>; switched by <system setting | toggle | both>; default <light | dark | system> (found in code)
- Feel: <calm, bold, playful, serious, premium> (asked)
- Brand colour: <hex> as <primary | primary-container> (asked)
- Surfaces: <near-grey | tinted>; accents: <one | two> (asked)
- Density: <compact | default | comfortable>; tuned: <role value, ... | none>; pages: </reports compact, ... | none> (asked)
- Shape: <sharp | soft | round>; tuned: <role value, ... | none> (asked)
- Token source: <files where values are defined> (found in code)
- Off-scale values moved: <radius, durations, type, spacing | none> (asked)
- Left as is: <values the user chose to keep when offered a change, and why | none> (asked)
- Accepted risks: <each risk the user accepted, with its rule | none> (asked)
```
