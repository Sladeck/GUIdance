# 14. Tables

**14.1 Table structure and numbers** (Hard: the first bullet; Strong: the second and third; Default: the rest) [WCAG-1.3.1 S, GOVUK-TABLE A, USWDS-TABLE B, ANTD-FONT B, ANTD-DATA B]
- A data table is a real table: a header row in `th`, `scope="col"` or `scope="row"` where it could be ambiguous, never a grid of `div`s that only looks like a table (1.3.1, Hard; what to look for is under 1.3.1 in `data/wcag-criteria.md`).
- Never use a table for page layout [GOVUK-TABLE A, USWDS-TABLE B]. A `caption` names the table the way a heading would [GOVUK-TABLE A]; USWDS also puts the source or last-updated date there [USWDS-TABLE B].
- Numbers that people compare are right-aligned, header included [GOVUK-TABLE A, USWDS-TABLE B]. Text stays left-aligned (judgment).
- Digits line up: USWDS suggests a monospace font for numerical data [USWDS-TABLE B]. The same alignment without changing the font: `font-variant-numeric: tabular-nums`, which Ant Design recommends [ANTD-FONT B].
- One unit and one format per column [USWDS-TABLE B].
- An empty cell shows a dash, not a blank; time, status and action cells stay on one line [ANTD-DATA B].
- Only content that is or looks like a table is a 14.1 finding. Data shown as text, a list or cards is not; suggesting a table for it is judgment, reported as Default at most (judgment).
- Break: a short list of two or three values needs no table; a table that is really a list of cards can be a list.

**14.2 Long and wide tables** (Default) [NNG-TABLES B, USWDS-TABLE B, CARBON-TABLE B]
- Design for four tasks: finding records, comparing them, viewing or editing one row, and acting on several [NNG-TABLES B]. The default column order follows the importance of the data [NNG-TABLES B].
- Larger than the screen: freeze the header row (and the first column when rows are identified by it) [NNG-TABLES B]. USWDS prefers its sticky header for long tables with many rows [USWDS-TABLE B].
- Sort where it helps, on individual columns of long tables, with the current direction shown; not on tables with merged cells [USWDS-TABLE B, CARBON-TABLE B]. Filters are easy to find, and the table shows clearly when one is active [NNG-TABLES B].
- Small screens: a table of more than two columns either scrolls sideways in its own container or stacks each row [USWDS-TABLE B]. A container that scrolls is reachable from the keyboard (`tabindex="0"`, with a name) [USWDS-TABLE B; rule 12.5, Hard]. Rule 4.4 exempts data tables that scroll in their own container; the page around them still may not scroll sideways.
- Row height follows the page's density (rule 4.7). Carbon's row sizes are 24, 32, 40 (its default), 48 and 64px, with the header row and toolbar matching the row height [CARBON-TABLE B].
- Loading: Carbon shows a skeleton of the rows rather than a spinner [CARBON-TABLE B]; rule 8.2's spinner for one module is the other option. Pick one for every table in the product (judgment).
- Nothing to show: the empty state replaces the table, header row included (rule 8.4) [CARBON-EMPTY B].
- More rows than people need at once: pagination where it helps (rule 15.2); a table that scrolls instead keeps its header frozen.
- Break: a small table that fits the screen needs no sorting, filters or frozen header.
