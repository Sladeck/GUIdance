# 16. Writing

Scope: interface text in Latin-script languages, like the rest of the rules. The numbers come from English-language guidance.

**16.1 Plain language** (Strong; Default: the reading-level bullet) [GOVUK-STYLE A, NNG-PLAIN B, ANTD-WRITING B]
- Write for a reading level of US grades 6 to 8 for a general audience, 10 to 12 for experts; plain language helps experts too [NNG-PLAIN B].
- Short sentences: NN/g says no more than 15 to 20 words [NNG-PLAIN B]; GOV.UK checks any sentence over 25 words for a split [GOVUK-STYLE A]. Paragraphs of one or two sentences are fine on screen [NNG-PLAIN B].
- Active voice, the words the audience already uses, no jargon [GOVUK-STYLE A, NNG-PLAIN B]. Leave out words that repeat what people already know [ANTD-WRITING B].
- Interface verbs that fit the device: on the web, "select", not "click" [GOVUK-STYLE A]; on Apple platforms, the device's own gesture, such as "tap" on iPhone and iPad, never "click" there [APPLE-WRITING A].
- Break: specialist tools may use the field's own terms, when those are the words its users know [NNG-PLAIN B].

**16.2 Labels say what happens** (Hard: the 2.4.4 part of the link bullet; Strong: the rest; Default: the promise bullet) [APPLE-WRITING A, GOVUK-BUTTON A, NNG-LINKS B, USWDS-BUTTON B, ANTD-BUTTONS B, ANTD-WRITING B, WCAG-2.4.4 S]
- A button label starts with a verb and names the action it performs, kept short: "Send", "Save and continue", not "Let's do it!" or "Submit" when something more specific is true [APPLE-WRITING A, GOVUK-BUTTON A, USWDS-BUTTON B, ANTD-BUTTONS B]. Confirmations follow rule 10.2.
- A link says where it leads. Never "Click here" [APPLE-WRITING A]; a bare "Learn more" has the same problem, because people may read only the link [NNG-LINKS B]. The Hard minimum is weaker: the purpose of each link can be told from its text together with its sentence, paragraph, list item or table cell (2.4.4, Hard; what to look for is under 2.4.4 in `data/wcag-criteria.md`). A "Learn more" whose context tells it apart passes 2.4.4 and is still a Strong finding here.
- The label promises only what the next screen delivers [NNG-LINKS B].
- One word per step across a flow: pick "Continue" or "Next" and keep it; "Get started" to begin, "Done" to finish [APPLE-WRITING A]. The same action has the same name everywhere (rule 4.5), and the page it opens carries that name as its title [ANTD-WRITING B].
- Break: a well-known icon-only control (close, search) needs no visible label, but still has a name (rule 12.5).

**16.3 One capitalisation style** (Default) [M3-WRITING A, APPLE-WRITING A, GOVUK-STYLE A, USWDS-BUTTON B, ANTD-WRITING B]
- Web and Android: sentence case for everything, titles, headings, labels, menus, navigation and buttons included; product and brand names keep their capitals [M3-WRITING A, GOVUK-STYLE A, USWDS-BUTTON B, ANTD-WRITING B]. Avoid capitals for whole words or phrases; abbreviations keep theirs [ANTD-WRITING B].
- Apple platforms: choose a style for each kind of element (title case for all alerts, say, or sentence case for all headlines) and apply it everywhere [APPLE-WRITING A].
- Never mixed styles within one kind of element (judgment, from both).
- Break: a brand's established house style, applied consistently.
