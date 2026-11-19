---
type: llm
---

The page has six seeded failures. PASS if the reply reports at least five of them as problems:
1. The `<html>` element has no `lang` attribute (WCAG 3.1.1 Language of Page).
2. The logo `<img>` has no `alt` attribute (1.1.1 Non-text Content).
3. The button that shows "Send code" has `aria-label="Verify"`, so its accessible name does not contain its visible text (2.5.3 Label in Name).
4. The password field blocks paste (`onpaste="return false"`), which stops password managers and copy and paste at sign-up or sign-in (3.3.8 Accessible Authentication; also acceptable if tied to a password manager or paste argument under another criterion).
5. "Create account" is a `div` with only a click handler: no button role, not focusable, not operable from the keyboard (2.1.1 Keyboard and/or 4.1.2 Name, Role, Value).
6. The "Account created" message is written into a plain `div` with no `role="status"`, `role="alert"` or `aria-live`, so screen readers do not announce it (4.1.3 Status Messages).

FAIL if fewer than five are reported, or if the reply states that the page passes, conforms to or is compliant with WCAG 2.2 AA.
