---
type: regex
target:
  source: file
  path: delete-dialog.html
pattern: '<button[^>]*>\s*(Yes|No|OK)\s*</button>'
flags: i
match: not_contains
---
