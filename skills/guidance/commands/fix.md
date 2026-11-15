# `/guidance fix [which]`

Fixes findings from the last `review` in this conversation, then checks them again. Without a previous report, run `/guidance review` first (ask which page if it is unclear).

`which` picks the findings: numbers (`1-5`, `2,7`), a severity (`hard`, `strong`), or nothing for all of them.

1. For each finding, find the code (`file:line`) and decide the change from its Fix line and the project's tokens. Fix at the source: a token value, the shared component or the parent's `gap` beats patching each instance. One change often fixes several findings; group them.
2. Show the plan before touching anything: per file, each change as before and after, with the finding numbers it fixes. Flag changes that alter how the app looks everywhere (a radius token, a colour role, a type step). Ask once: apply all, pick some, or stop.
3. Apply exactly those edits. No unrelated changes, no reformatting, no new dependencies.
4. Check again by reading the changed code against the same rules. Report each finding as fixed or still failing, plus anything new the change caused. Try once more on what still fails; if it still fails, explain why and stop.
5. Finish with the files changed, the counts (fixed, remaining, new) and anything to check by eye. Do not commit.
