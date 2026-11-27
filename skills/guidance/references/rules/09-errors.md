# 9. Errors

**9.1 Placement and visibility** (Strong) [NNG-ERR B, GOVUK-VALID A, ANTD-FEEDBACK B]
- Error next to its cause, plus a summary on submit for multi-field forms. Visible through icon, border and text, never colour or animation alone.
- Match severity: inline for minor issues, modal only for blocking problems. A failure the person must act on is never shown only in a toast that disappears by itself: inline where it happened, or a dialog when it blocks. Ant Design also keeps important failures out of short-lived messages [ANTD-FEEDBACK B].

**9.2 Wording** (Strong) [APPLE-ALERTS A, NNG-ERR B, ANTD-WRITING B]
- Plain, specific about what happened and how to fix it; neutral tone, no blame, no jokes. Ant Design: say what to do next, solve rather than blame, "unable to complete" rather than a cold "failure" [ANTD-WRITING B]. Never a bare "Error" or "Error 329347 occurred"; codes go in a details toggle for support.

**9.3 Recovery** (Strong) [GOVUK-VALID A, NNG-ERR B]
- Preserve what the user entered, including the answer that failed, and say how to fix it [GOVUK-VALID A]. Offer the fix (suggestions, retry, a link) and prevent likely mistakes up front [NNG-ERR B].
