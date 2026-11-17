# 7. Forms

Applying 19 of 20 published form guidelines together to three real newspaper registration forms meant fewer submission attempts on all three and completion times 18 to 33% shorter, significant on two of the three; usability ratings rose by up to 16% (65 people in a lab, eye tracking) [SCI-FORMS B, full text read]. The authors say longer forms, shops and mobile still need testing. The rules below are the ones with the strongest sources.

**7.1 Single column** (Strong) [BAY-COLUMNS A]
- One field per row; users skip or misfill multi-column layouts.
- Exception: fields forming one logical unit share a row (city / postcode, expiry / CVC, day / month / year).
- Prefer one "Full name" field over first + last.

**7.2 Visible labels, not placeholders** (Strong) [GOVUK-INPUT A, NNG-PLACEHOLDER B]
- Labels and instructions outside the input, always visible. Never a placeholder in place of a label.
- Example formats go in hint text outside the input: GOV.UK rules placeholders out "for hints or examples" as well [GOVUK-INPUT A].

**7.3 When to validate** (Strong) [BAY-INLINE A vs GOVUK-VALID A: same tier, context decides]
- Baymard (e-commerce, long forms): validate when the user leaves a field or completes a fixed-length value; check marks on valid fields. Use for long multi-field forms (checkout, sign-up, settings with many fields).
- GOV.UK (public services, one question per page): validate on submit only; "do not validate when the user moves away from a field", since early validation hurts slower typists. Use for short forms, one-question-per-page flows, and audiences with many slow or assistive-technology users.
- Both, and NN/g, agree: no error while the user is still typing; clear an error once fixed; error summary on submit; preserve what was entered.
- Peer-reviewed lab evidence leans to submit-time: in two studies (77 and 90 people), showing errors after the whole form was completed performed best and immediate feedback worst; people filling a form often ignored immediate messages [SCI-FORM-ERR B]. Tier B and from 2007, so it does not overturn Baymard for long forms, but it adds weight to GOV.UK's approach for short ones.

**7.4 Do not ask twice** (Hard, Level A) [WCAG-2.2 S]
- Information already entered in the same process is prefilled or selectable (3.3.7).

**7.5 Login without puzzles** (Hard) [WCAG-2.2 S]
- No cognitive test at login without an alternative: allow paste and password managers (3.3.8).

**7.6 State formats and required fields up front** (Default) [SCI-FORMS B]
- A field that needs a specific format (password rules, a date format, a length) says so before submission, beside the field; rule 7.2 puts it in hint text.
- Required and optional fields are clearly told apart, with a marker that is not colour alone (rule 1.3).
- These were the two changes people noticed most in the study above. On the original forms, missing format rules and unclear required fields were the most frequent complaints, and on two of the three forms most people needed more than one attempt to submit [SCI-FORMS B, full text read].
