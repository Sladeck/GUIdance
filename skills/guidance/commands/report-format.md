# Report format

Used by audit, inspect, fix and check.

## Severity

- **Hard**: WCAG AA (or A) requirement. Fails are bugs.
- **Strong**: backed by tier A research, or tier A and B agreeing. Break only with a stated reason.
- **Default**: a platform convention or system value. Deviate freely if consistent.

## Finding format

```
[Hard|Strong|Default] <what is wrong, where (file:line or screen area)>
Rule: <the rule, with the number>
Source: <key (tier) + link from references/sources.md>
Fix: <concrete change, using the project's tokens where they exist>
```

Never cite a source for a claim it does not make. Your own reasoning is `Source: judgment`.
