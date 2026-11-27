# 15. Navigation and search

**15.1 Breadcrumbs** (Default) [GOVUK-BREADCRUMBS A, BAY-BREADCRUMBS A, NNG-BREADCRUMBS B, USWDS-BREADCRUMB B, ANTD-NAV B]
- Use them on sites of several levels, to show where the page sits in the hierarchy. Not on flat sites, and not to show progress through a form or other linear journey [GOVUK-BREADCRUMBS A, USWDS-BREADCRUMB B]. With a side navigation that already shows the position, check whether they add anything [GOVUK-BREADCRUMBS A]; Ant Design avoids them then [ANTD-NAV B].
- The trail is the hierarchy, not the session history [NNG-BREADCRUMBS B, USWDS-BREADCRUMB B]. It starts with Home and sits at the top of the page, before `main` [GOVUK-BREADCRUMBS A, NNG-BREADCRUMBS B]. Not on the homepage itself [USWDS-BREADCRUMB B].
- The current page is never a link. GOV.UK ends the trail at the parent of the current page [GOVUK-BREADCRUMBS A]; NN/g ends it with the current page as plain text [NNG-BREADCRUMBS B]. Either works; if it is included, mark it `aria-current="page"` (as USWDS does in its markup) [USWDS-BREADCRUMB B].
- Small screens: keep the trail to one line by showing only the parent [USWDS-BREADCRUMB B, NNG-BREADCRUMBS B], or only the first and last items [GOVUK-BREADCRUMBS A]. Each crumb keeps its target size (rule 2.1).
- Shops: a product page reached from search or a filtered list also needs a history-based "Back to results" link beside the hierarchy trail. In Baymard's 2013 benchmark of 50 major e-commerce sites, 68% had sub-par breadcrumbs, most by offering only one of the two kinds [BAY-BREADCRUMBS A].
- Break: apps with a single level of navigation, or a tab bar or sidebar that already shows the position (rule 13.9).

**15.2 Pagination and long lists** (Strong: the first bullet; Default: the rest) [GOVUK-PAGINATION A, NNG-INFINITE B, USWDS-PAGINATION B, ANTD-NAV B]
- No infinite scroll where people look for something specific, compare items or come back to one: use pagination or a Load more button [GOVUK-PAGINATION A, NNG-INFINITE B]. Infinite scroll suits browsing a feed of similar items with no particular goal [NNG-INFINITE B]. No option wins everywhere; Load more fixes some of infinite scroll's problems at the cost of one press per batch [NNG-INFINITE B].
- Paginate only if it helps, typically when most people need only the first page or first few [GOVUK-PAGINATION A]; a short list can show everything at once [USWDS-PAGINATION B].
- Show the first page, the current page and its neighbours, and the last page when the set has one; replace skipped pages with a non-selectable ellipsis; highlight the current page [GOVUK-PAGINATION A, USWDS-PAGINATION B]. USWDS caps the control at seven slots and one line [USWDS-PAGINATION B]. No Previous on the first page, no Next on the last [GOVUK-PAGINATION A, USWDS-PAGINATION B]. In data tables, Ant Design adds a jump-to-page field past 5 pages and lets people choose the page size when there are many rows [ANTD-NAV B].
- Put the page number in the page `title` [GOVUK-PAGINATION A]. A URL for a page that no longer exists goes to the first page [GOVUK-PAGINATION A].
- Not for steps of a form or another linear journey: use Continue buttons or a step indicator [GOVUK-PAGINATION A, USWDS-PAGINATION B].
- Break: social and media feeds built for browsing, where infinite scroll is the expected pattern [NNG-INFINITE B].

**15.3 Search** (Hard: the field and button have names; Strong: the no-results bullet; Default: the rest) [NNG-SEARCH B, USWDS-SEARCH B, BAY-NORESULTS A, WCAG-4.1.2 S]
- A site with more than a few pages has search [USWDS-SEARCH B]. On the homepage it is a field, not a link to a search page [NNG-SEARCH B, USWDS-SEARCH B], at the top of the page, usually on the right [NNG-SEARCH B].
- The field fits a typical query: at least 27 characters wide, more on multilingual sites, where Romance languages run about 20% longer than English [USWDS-SEARCH B; NNG-SEARCH B gives no number].
- The field and its button have names (rule 12.5, Hard). A visually hidden field label is enough only when a visible Search button or magnifying-glass icon beside the field shows its purpose (the exception in rule 7.2); a field with only a placeholder and no such button needs a visible label or a visible Search button (rule 7.2, Hard). USWDS also puts the word "Search" in the button, as its text or its name when it shows only the magnifying-glass icon [USWDS-SEARCH B; Default].
- The query stays in the field on the results page; advanced search is never the default [USWDS-SEARCH B].
- No results: never a dead end. Offer related categories, alternative searches, popular items and a way to get help; search tips alone are rarely read. Baymard reports that nearly 50% of e-commerce sites give no effective way to recover from a search with no results [BAY-NORESULTS A]. The empty state follows rule 8.4, which makes a dead end Strong as well.
- Break: a single page or a very small site can do without search [USWDS-SEARCH B].
