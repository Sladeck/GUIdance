# Research numbers [tier A and B]

Verified 2026-11-02; use directly. Keys match `sources.md`.

| What | Value | Source |
| --- | --- | --- |
| Response limits | 0.1 s instant; 1 s flow kept; over 1 s show progress; over 10 s percent-done and cancel | NNG-RESPONSE |
| Loading indicator | nothing under 1 s; skeleton for page loads of about 2 to 10 s; spinner for one module; progress bar for processes or over 10 s | NNG-SKELETON |
| Line length | 50 to 75 characters, 80 max (40 CJK) | BAY-LINE |
| `ch` unit | width of "0", wider than an average letter: 65ch renders about 81 to 85 characters in Arial (GUIdance test). Use 55 to 60ch and measure | judgment, measured |
| Form layout | single column; one logical unit may share a row | BAY-COLUMNS |
| Inline validation | long forms: on blur, clear errors as soon as fixed (Baymard); short or one-question-per-page: on submit only (GOV.UK) | BAY-INLINE, GOVUK-VALID |
| Qualitative sample | 5 users find problems; quantitative claims need 40+ | NNG-SAMPLE |
| Baymard scale | 200,000+ research hours, 4,400+ moderated sessions on 240+ sites, 1,000+ people per quantitative study | BAY-METHOD |
