# `/guidance review [target]`

Finds where an interface breaks the rules, and says why each rule exists and where it comes from. Change nothing; offer `/guidance fix` at the end.

## 1. Scope

Read `commands/scope.md`: what is reviewed for each target, and the app-wide orientation check in a native app.

## 2. Read the project's choices first

Read `design-decisions.md` at the project root (or, in older projects without it, the token file's `density:` and `shape:` comments) and the token file's scales: the themes, style, density, shape, and anything recorded as tuned, left as is or accepted. Those are the user's decisions: a value that follows them is not a finding. List them in one line under the report.

## 3. Review the code

Go through the checklist in `commands/checklist.md` on the code in scope, section by section, finding the rules in the index, `references/rules.md`, and reading only the section files in `references/rules/` you need. For each candidate finding, read the rule itself before reporting it: its number, severity, sources and its "Break" line.


A browser tool is optional and only for looking: if one is available and the page can be opened, open it at 320, 390, 768 and 1440 wide to confirm what the code suggests (something overflowing, a target that looks small). Never type a password; ask the user to sign in. Label each finding "read from code" or "seen on the page".

## 4. Judge

- The same finding in several places is one finding, with the places listed.
- Give each finding its `file:line`. Use the project's token names in the fix.
- Drop a finding when the code shows it is intended (a documented optical adjustment, a deliberate variant, a decorative element), or when `design-decisions.md` (or the token file, in older projects) lists it as tuned, left as is or accepted.
- Never report a rule as broken when its "Break" line covers the case.

## 5. Report

One numbered list in the format of `commands/report-format.md`, then the counts per severity, the three fixes with the most impact, and an offer of `/guidance fix`.
