# Opening a page

`inspect`, `check` and `audit` take a page in any form: a route (`/settings`), a page or component file (`app/settings/page.tsx`, `Settings.vue`), a plain description ("the pricing page"), a local address, or nothing (the page the user is working on, from recent changes). These are local pages in a coding session, not public websites.

1. Map it to a route: read the router (file-based routes in `app/`, `pages/`, `src/routes/`, or the route table) to find where that file or description renders. A component with no page of its own: find a page that uses it, or a story (Storybook) if the project has one.
2. Find the dev server: the `dev` or `start` script in package.json (or the framework's usual command), and its port from the script, the framework config or `.env`. Check whether it already answers on that port.
3. Not running: tell the user, then start it with the project's own command in the background, and stop it when done if you started it. Static HTML: open the file directly. A page behind a login: ask the user to sign in in the browser, never type passwords.
**A public URL** (a live site, a competitor, a staging deploy) also works, but only with a real browser: your browser tool, a browser MCP such as Playwright MCP, or the user's own browser with DevTools. Never measure from fetched HTML (web fetch, curl): many sites build the page with JavaScript, so the downloaded HTML can be nearly empty or missing styles, and any findings would be wrong. If no browser is available, say that, and either hand the user the check files for DevTools or stop. Even in a browser, say the result is a snapshot: cookie banners, A/B tests, lazy-loaded sections, ads and the signed-out state can differ from what users see. Wait for the page to finish loading and scroll it once before measuring. Do not sign in or submit anything on a public site.

4. Open it with your browser tool. To measure a width, resize the window (or viewport) to it and wait for the layout to settle. Without a browser tool, give the user the check file and these steps: DevTools, device toolbar, set the width, paste into the Console, send back the result. Without any browser, read the styles in the code instead and label the findings "read from code, not measured".

| Command | Does |
| --- | --- |
| `/guidance` | Lists these commands in a few lines. Nothing else. |
| `/guidance setup` | Learns what the project is (asks if unclear), proposes two colour palettes with a live preview, then writes or fixes design tokens and colours in the project. |
| `/guidance build <what>` | Builds or changes UI following the rules and the project's tokens. |
| `/guidance audit [target]` | Full review of a file, folder, component or page: code, tokens and measurements, with findings and fixes. |
| `/guidance inspect [page]` | Opens a page at mobile, tablet, desktop and its own breakpoint widths and lists every inconsistency it measures (spacing, borders, corners, shadows, icons, colours, type, overflow, keyboard and focus), most serious first, each with why and how to fix. |
| `/guidance fix [which]` | Fixes findings from the last inspect, audit or check (all, by number or by severity): shows the plan, applies it, then measures again to confirm. |
| `/guidance check [page]` | Quick measured pass on a page: targets, typography and contrast numbers only, no code review. |
