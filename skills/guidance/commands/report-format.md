# Report format

Used by review, wcag and fix.

## Severity

- **Hard**: WCAG AA (or A) requirement. Fails are bugs.
- **Strong**: backed by tier A research, or tier A and B agreeing. Break only with a stated reason.
- **Default**: a platform convention or system value. Deviate freely if consistent.

## Findings

One numbered list, most serious first: Hard, then Strong, then Default. Within a level, findings that break layout or appear in more places come first. Quote the values you read.

```
1. [Hard] Stars stick out of the rating card under 400px
   Where: RatingCard.tsx:14, .stars (five 80px stars in a 390px card with no wrap; read from code)
   Why: content crossing its card looks broken and can hide the next element. Rule 4.4, WCAG 1.4.10 (S).
   Fix: font-size: var(--text-body) under 900px, or let the stars wrap.
```

Why names the rule number and its source key with tier, as the rule gives them (`WCAG-1.4.3 S`); do not open `references/sources.md` for this. Never cite a source for a claim it does not make; your own reasoning is "judgment". Fix uses the project's tokens where they exist. Where ends with "read from code" or "seen on the page".
