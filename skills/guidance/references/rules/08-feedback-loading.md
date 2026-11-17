# 8. Feedback and loading

**8.1 Response time limits** (Strong) [NNG-RESPONSE B, SCI-WAIT-CLOCK A]
- Under 0.1s feels instant; under 1s keeps the flow (no indicator); over 1s show the system is working; over 10s percent-done progress, plus cancel.
- Showing a time during the wait is a trade-off, not a rule. In an online experiment (425 people, waits of 10, 30 and 60s, plain numeric timers with no progress bar), a countdown of remaining time caused slightly more frustration and less pleasantness than a count of elapsed time. But waits with no time shown felt longer than waits with a countdown, and nothing changed how well people performed afterwards [SCI-WAIT-CLOCK A, full text read].
- The authors give considerations, not rules: remaining time when uncertainty is the main concern, elapsed time for a calmer wait, and no precise countdown when the duration cannot be predicted. The study had no progress bars, so it leaves NN/g's percent-done advice untouched.
- Long-standing HCI research; NN/g's most stable numbers.

**8.2 Which indicator** (Default) [NNG-SKELETON B; showing that the system is working is rule 8.1, Strong]
- Start an indicator only if the load is still running after about 1s, so fast responses never flash one.
- Full page expected to take about 2 to 10s: skeleton of the real layout, never frame-only.
- One module loading (a card, a chart): spinner in that module.
- Processes (upload, export, conversion) or anything over 10s: progress bar.
- Never wait in silence: with no time shown, waits felt longer than with a countdown, and doubts about whether the system was still working were most frequent in the longer waits [SCI-WAIT-CLOCK A]. A percent-done bar stays the default (rule 8.1).
- A moving loading indicator made a 15-second wait feel shorter than the same indicator frozen, in four online experiments of 198 to 411 people each, on desktop: a rotating ring in the first, moving dots or a small ring in the others, and in two of them beside a progress bar that both versions showed. The effect was large when people were browsing casually and small, though still present, when they were focused on a task or had a practical goal, which covers most product UI [SCI-WAIT-ANIM A, paper read]. Under reduced motion keep a progress cue that does not move continuously (rule 11.2).

**8.3 Optimistic state** (Default) [judgment]
- Reflect safe actions immediately (toggle, like, reorder), reconcile on response, roll back visibly on failure.
