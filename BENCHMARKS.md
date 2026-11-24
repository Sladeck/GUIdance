# Benchmarks: Claude with and without GUIdance

Each test gives Claude a small project with known problems planted in it and scores the answer against a fixed answer key. It runs with GUIdance and without it, on the same model, files and tools. Without GUIdance each test ran three times; the column shows the lowest and the highest score.

| Test | What it checks | Without GUIdance | With GUIdance |
| --- | --- | --- | --- |
| Review a landing page | Finds 21 planted contrast, zoom, focus, layout, form and target-size problems across a page's HTML and CSS. | 19.5 - 54 / 55 | 55 / 55 |
| Review a Next.js and MUI page | Finds 12 planted problems on an invoices page, three of them in the MUI theme's overrides. | 22 - 25 / 35 | 35 / 35 |
| Review a Vite and shadcn/ui page | Finds 12 planted problems on a staff page, four of them in shadcn's CSS variables and `components/ui` files. | 18 - 19 / 33 | 33 / 33 |
| Review a Vue page | Finds 13 planted problems on a Vue class-booking page, five of them in the tokens file and shared base components. | 33 - 36 / 36 | 36 / 36 |
| Review a React Native (Expo) screen | Finds 12 planted problems on a plant-watering screen, five of them in the theme, the shared text component, the swipe component and the app config. | 19 - 26 / 31 | 31 / 31 |
| WCAG check, Next.js and MUI | Finds 14 planted WCAG 2.2 failures on a login page, half of them in the shared layout, header, theme and global CSS. | 30 - 37 / 40 | 40 / 40 |
| Token setup, Next.js and MUI | Turns a messy MUI theme with three brand blues and competing colour sources into one set of tokens without rescaling existing spacing. | 12.5 - 14 / 17 | 17 / 17 |
| Build a page, Next.js and MUI | Builds an invoice detail page on the theme, names the contrast and focus failures it inherits, and confirms delete properly. | 7 - 8 / 10 | 10 / 10 |
| Plain spacing request | Gives the dashboard cards one step more room under MUI's 4px spacing unit, on that page only. | 3 - 5 / 6 | 6 / 6 |
| Design questions | Answers eight common UI questions with the right number or verdict. | 7 - 7 / 8 | 8 / 8 |
| WCAG check, input and pointer | Finds 14 keyboard, pointer, gesture and motion failures in one small HTML page. | 39 - 39 / 39 | 39 / 39 |
| WCAG check, SwiftUI | Finds 8 failures in a SwiftUI list view, one of them in the app's Info.plist. | 19 - 19 / 22 | 22 / 22 |

**Scoring.** A planted problem earns 3, 2 or 1 points by severity when the answer names it at the right place with a correct reason; reporting a decoy costs points. GUIdance's own extras are not scored here: a result for every WCAG criterion, a rule and source for every finding, asking before risky changes. Model: Claude Sonnet 5.5 for both sides.

**Limits.** With-plugin scores are one run each, from GUIdance 1.6.0 to 1.10.0. Without the plugin, the score mostly depends on which files Claude happens to open: the landing-page review went from 19.5 to 54 the one time it read the stylesheet, and the MUI, shadcn and Next.js tests moved with the theme and global CSS files. GUIdance reads them every time. Where both sides tie (the input and pointer check), every problem sits in the one file named in the prompt. GUIdance costs 2 to 17 times more per task, since it reads its rules and checks more files.
