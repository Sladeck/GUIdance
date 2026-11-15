# `/guidance build <what>`

1. Read the `references/rules.md` sections relevant to what you are building. Do not apply all of it for a one-component change.
2. Use the project's design system (tokens, DESIGN.md, theme file). The rules set floors and ratios, not a brand. Only flag a project value when it breaks a **Hard** rule. If the project has no tokens, suggest `/guidance setup` once, then build with the values in `references/data/scales.md`.
3. Express decisions as tokens (spacing, radius, type scale, durations), never one-off raw values. When the project has spacing role tokens (`space-field`, `space-group`, `space-section`, see rule 4.7), use the role, not the scale step, so the screen follows the project's density.
4. After building, go through the checklist in `commands/review.md` on what you made and fix what fails. If the page can be opened in a browser, run the checks from `checks/` (see `references/browser-checks.md`).
5. Report only the rules you deliberately broke and why.
