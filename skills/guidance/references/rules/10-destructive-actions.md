# 10. Destructive actions

**10.1 Undo first, alerts rarely** (Strong) [APPLE-ALERTS A, NNG-CONFIRM B]
- Prefer undo (soft delete, a toast with Undo, a recycle bin). A toast that is the only way to undo does not disappear by itself (rule 12.4). No confirmation for common undoable actions such as deleting an email; confirm only uncommon actions that cannot be undone. Frequent confirmations train click-through.

**10.2 Confirmation wording and defaults** (Strong) [APPLE-ALERTS A over NNG-CONFIRM B]
- Say exactly what happens ("Delete 3 projects and their 128 briefs?"), not "Are you sure?".
- Buttons named by outcome ("Delete", "Erase", "Keep projects"); always "Cancel" for cancel; no Yes / No; OK only in purely informational alerts.
- Defaults (Apple wins over NN/g's "no default ever"): never Cancel as default. If the user did not directly choose the destructive action, style it as destructive with no default so people read first. If they deliberately chose it (Empty Trash), it can be the default so Return confirms, without destructive styling.
- Rare, catastrophic actions: require typing the item name [NNG-CONFIRM B].
