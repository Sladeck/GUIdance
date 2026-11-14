# `/guidance build <what>`

1. Read the `references/rules.md` sections relevant to what you are building. Do not apply all of it for a one-component change.
2. Use the project's design system (tokens, DESIGN.md, theme file). The rules set floors and ratios, not a brand. Only flag a project value when it breaks a **Hard** rule. If the project has no tokens, suggest `/guidance setup` once, then build with the values in `references/data/scales.md`.
3. Express decisions as tokens (spacing, radius, type scale, durations), never one-off raw values.
4. After building, run the audit checklist on what you made and fix what fails. If the page can be opened in a browser, run the checks from `checks/` (see `browser-checks.md`.
5. Report only the rules you deliberately broke and why.
