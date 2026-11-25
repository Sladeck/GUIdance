# Benchmarks: Claude with and without GUIdance

Each test gives Claude a small project with known problems planted in it and scores the answer against a fixed answer key. It runs with GUIdance and without it, on the same model, files and tools. Each test ran three times on each side; the columns show the lowest and the highest score.

## Total score

| | Claude alone | Claude with GUIdance |
| --- | --- | --- |
| **12 tests, 332 points** | **229 - 289** (69% - 87%) | **321 - 332** (97% - 100%) |

Each total adds up every test's lowest, then highest, score. Claude with GUIdance scores from 11% higher (its lowest total against Claude alone's highest) to 45% higher (the other way round).

## By test

| Test | What it checks | Without GUIdance | With GUIdance |
| --- | --- | --- | --- |
| Review a landing page | Finds 21 planted contrast, zoom, focus, layout, form and target-size problems across a page's HTML and CSS. | 19.5 - 54 / 55 | 55 - 55 / 55 |
| Review a Next.js and MUI page | Finds 12 planted problems on an invoices page, three of them in the MUI theme's overrides. | 22 - 25 / 35 | 35 - 35 / 35 |
| Review a Vite and shadcn/ui page | Finds 12 planted problems on a staff page, four of them in shadcn's CSS variables and `components/ui` files. | 18 - 19 / 33 | 30 - 33 / 33 |
| Review a Vue page | Finds 13 planted problems on a Vue class-booking page, five of them in the tokens file and shared base components. | 33 - 36 / 36 | 33 - 36 / 36 |
| Review a React Native (Expo) screen | Finds 12 planted problems on a plant-watering screen, five of them in the theme, the shared text component, the swipe component and the app config. | 19 - 26 / 31 | 27 - 31 / 31 |
| WCAG check, Next.js and MUI | Finds 14 planted WCAG 2.2 failures on a login page, half of them in the shared layout, header, theme and global CSS. | 30 - 37 / 40 | 39 - 40 / 40 |
| Token setup, Next.js and MUI | Turns a messy MUI theme with three brand blues and competing colour sources into one set of tokens without rescaling existing spacing. | 12.5 - 14 / 17 | 17 - 17 / 17 |
| Build a page, Next.js and MUI | Builds an invoice detail page on the theme, names the contrast and focus failures it inherits, and confirms delete properly. | 7 - 8 / 10 | 10 - 10 / 10 |
| Plain spacing request | Gives the dashboard cards one step more room under MUI's 4px spacing unit, on that page only. | 3 - 5 / 6 | 6 - 6 / 6 |
| Design questions | Answers eight common UI questions with the right number or verdict. | 7 - 7 / 8 | 8 - 8 / 8 |
| WCAG check, input and pointer | Finds 14 keyboard, pointer, gesture and motion failures in one small HTML page. | 39 - 39 / 39 | 39 - 39 / 39 |
| WCAG check, SwiftUI | Finds 8 failures in a SwiftUI list view, one of them in the app's Info.plist. | 19 - 19 / 22 | 22 - 22 / 22 |
| **Total** | | **229 - 289 / 332** | **321 - 332 / 332** |

**Scoring.** A planted problem earns 3, 2 or 1 points by severity when the answer names it at the right place with a correct reason; reporting a decoy costs points. GUIdance's own extras are not scored here: a result for every WCAG criterion, a rule and source for every finding, asking before risky changes. Model: Claude Sonnet 5.5 for both sides.

**Limits.** With the plugin, the first run of each test used GUIdance 1.6.0 to 1.10.0 and the other two 1.10.1. It lost points in two ways. Five review problems were missed (or half found) in one or two runs and found in the others: a table row that opens only on click, a low-contrast field border, a status shown by a coloured dot, a search field with no label and an 11px caption. And twice the Next.js WCAG check said a button had no focus indicator when it keeps one. Without the plugin, the score mostly depends on which files Claude happens to open: the landing-page review went from 19.5 to 54 the one time it read the stylesheet, and the MUI, shadcn and Next.js tests moved with the theme and global CSS files. GUIdance reads them every time. Both sides tie on the input and pointer check, where every problem sits in the one file named in the prompt, and the Vue review has the same range on both sides. GUIdance costs 2 to 17 times more per task, since it reads its rules and checks more files.

## Run the evals yourself

`evals/` holds test cases for `claude plugin eval`: a review, a WCAG check, a question, a build and a request the skill should ignore. Run them from the repository root; the build case needs the Write tool:

```bash
claude plugin eval . --allow-tools Write
```

Each case runs three times with the plugin and three times without it, and every run is a model call on your account. Results go to `evals/results/`, which is not committed.
