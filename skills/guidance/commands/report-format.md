# Report format

Used by review and fix.

## Severity

- **Hard**: WCAG AA (or A) requirement. Fails are bugs.
- **Strong**: backed by tier A research, or tier A and B agreeing. Break only with a stated reason.
- **Default**: a platform convention or system value. Deviate freely if consistent.

## Findings

One numbered list, most serious first: Hard, then Strong, then Default. Within a level, findings that break layout or appear at more widths and more places come first. Quote measured numbers.

```
1. [Hard] Stars stick out of the rating card (mobile and tablet)
   Where: RatingCard.tsx:14, .stars (10px past the card at 390px)
   Why: content crossing its card looks broken and can hide the next element. Rule 4.4, WCAG 1.4.10 (S).
   Fix: font-size: var(--text-body) under 900px, or let the stars wrap.
```

Why names the rule number and its source key with tier from `references/sources.md`. Never cite a source for a claim it does not make; your own reasoning is "judgment". Fix uses the project's tokens where they exist.
