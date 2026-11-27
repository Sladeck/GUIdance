<h1>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/header-dark.png">
    <img src="assets/header-light.png" alt="GUIdance" width="280">
  </picture>
</h1>

Design rules with their sources, for Claude. Set up tokens with `setup`, tune them with `spacing` and `shape`, check your UI with `review` and `wcag`, and clean it up with `fix`. Every rule says where it comes from and when it is fine to break it.

In a Claude Code session:

```
/plugin install guidance --marketplace Sladeck/GUIdance
```

Then run `/guidance:setup` in your project. Works in Claude Code, the Claude desktop app and, as an uploaded skill, the Claude web app. [Other ways to install](#installation).

| 12 tests, 332 points | Claude alone | Claude with GUIdance |
| --- | --- | --- |
| Lowest to highest of three runs | **229 - 289** (69% - 87%) | **321 - 332** (97% - 100%) |

Same model (Claude Sonnet 5.5), same files, same tools. Each test is a small project with problems planted in it: reviews of plain HTML, Next.js and MUI, shadcn/ui, Vue and Expo pages, WCAG checks, a token setup, a build, a spacing request and design questions. Without GUIdance, the score mostly depends on which files Claude happens to open; GUIdance reads the theme and global CSS every time. [Every test and score](docs/benchmarks.md).

## Why

How much space between sections? Which corner radius? Is 14px fine for body text? Does this grey pass contrast on that blue? I kept searching for the same answers on every project. They exist, spread across Apple's guidelines, Material Design, the W3C and years of usability research, but ask an agent and you get a plausible number, a different one next time, and no source. So I gathered them in one place, ranked by evidence, settled the cases where sources disagree, and wrote them for Claude.

- **Rules with their sources.** Spacing, corners, type, colour, contrast, target sizes, forms, errors, empty states, tables, navigation and search, interface writing, motion, layout, keyboard and focus. Each one names its source, and the reviewer cites it, so you can always ask why.
- **Tokens in your stack.** Plain CSS, Tailwind, MUI, Ant Design, shadcn/ui, Bootstrap, Sass, SwiftUI or Jetpack Compose. Colours are built from your brand colour, in light and dark, and every text pair's contrast is shown before anything is written.
- **A reviewer that ranks what matters.** One list, most serious first, each finding with where it is, the rule, its source and the fix. `wcag` goes through all 55 Level A and AA criteria of WCAG 2.2.

GUIdance is not a UI kit: no components, no templates, no scripts. Your components, framework and design stay yours; GUIdance makes them consistent. On an existing project, start with one page:

```
/guidance:review /settings
```

## How it works

Run `/guidance:setup` once per project. It reads your code, asks only what it can't tell (what the product is, who uses it, the feel, your brand colour), shows the choices for density and shape as tables, and writes the tokens once you have answered. It never overwrites a file and shows every change first. Your choices go in `design-decisions.md` at the project root, which every later command reads, so a risk you accepted is not flagged again. [What it writes](docs/tokens.md).

Then name a command and a target:

```
/guidance:guidance
/guidance:setup
/guidance:build an invoice detail page
/guidance:review /settings
/guidance:spacing more room between the cards
/guidance:shape rounder buttons
/guidance:wcag https://example.com/signup
/guidance:fix hard
```

Or just ask: "make it denser", "is this contrast enough?", "why is 16px the body size?". Plain requests reach the same commands.

### 8 commands

| Step | Command | What it does |
| --- | --- | --- |
| **Help** | `guidance` | Lists the commands in Claude |
| **Set up** | `setup` | Writes tokens and colour roles in your stack's format |
| **Set up** | `spacing` | Sets density: `compact`, `default`, `comfortable`, or plain words |
| **Set up** | `shape` | Sets corners: `sharp`, `soft`, `round`, or plain words, and keeps nested corners concentric |
| **Build** | `build` | Makes or changes UI with your tokens and the rules, then checks its own work |
| **Check** | `review` | Finds what breaks the rules in a page, file, folder, component or your uncommitted changes. Changes nothing |
| **Check** | `wcag` | Checks the same targets, or a live page by URL, against every WCAG 2.2 A and AA criterion. Changes nothing |
| **Fix** | `fix` | Fixes the last review's or WCAG check's findings at the source (a token, the shared component, the parent's spacing): all, by number or by severity, then checks again |

With a manual copy, use a space instead of the colon: `/guidance review`. Every option and example: [docs/commands.md](docs/commands.md).

## Installation

In a Claude Code session:

```
/plugin install guidance --marketplace Sladeck/GUIdance
```

Type `/guidance:` to see the commands. Update with `/plugin marketplace update guidance`.

Nothing else is required. A browser Claude can drive is optional: with one, Claude can look at the page it reviewed in the code, and `/guidance:wcag` can check a live page by its URL.

<details>
<summary><b>Older Claude Code versions, and auto-update</b></summary>

On versions before 2.1.275, add the marketplace first:

```
/plugin marketplace add Sladeck/GUIdance
/plugin install guidance@guidance
```

Updates are not automatic by default. To receive new versions on their own, run `claude` in a terminal, open `/plugin`, go to Marketplaces, select `guidance` and turn on auto-update. The desktop app has no auto-update switch for marketplaces.

</details>

<details>
<summary><b>Claude desktop app</b></summary>

1. Open Settings, then Customize, then Plugins.
2. Click Add in the top right corner, then Add marketplace.
3. Choose Add from a repository and enter `Sladeck/GUIdance`.
4. Install GUIdance from the marketplace and make sure its toggle is on.

To update, open GUIdance in the plugin list and click Update. The app does not update it on its own; to turn on auto-update, use the terminal steps above.

</details>

<details>
<summary><b>Manual copy for Claude Code</b></summary>

A manual copy takes a space instead of the colon: `/guidance setup`, `/guidance review`.

```bash
git clone https://github.com/Sladeck/GUIdance.git
cp -r GUIdance/skills/guidance ~/.claude/skills/guidance     # all your projects
# or: cp -r GUIdance/skills/guidance .claude/skills/guidance  (one project)
```

</details>

<details>
<summary><b>Claude apps (web, desktop) as a custom skill</b></summary>

Zip the `guidance` folder itself, so the zip holds a `guidance/` folder with `SKILL.md` inside:

```bash
cd GUIdance/skills && zip -r guidance.zip guidance
```

Upload `guidance.zip` as a custom skill, then turn it on in Customize > Skills. Custom skills need code execution turned on in Claude's settings.

</details>

## Good to know

**Sources.** Ranked by evidence: WCAG 2.2 first, then Apple, Material 3, Baymard, GOV.UK and large studies, then Nielsen Norman Group and smaller studies. Rules without a source are labelled `judgment`. GUIdance is not affiliated with or endorsed by any of them; it cites their public guidance and stores the numeric values it uses, not their text. [How sources are weighted and the full list](docs/sources.md).

**Scope.** Written for Latin-script interfaces read left to right (English, French, Spanish, German and the like). The WCAG rules hold in any language. [Why, and what that means for your product](docs/scope.md).

**Live pages.** `wcag` can check any page by its URL, but its findings can only be fixed when that page's code is in the project. It is a review, not a conformance certificate.

**Cost.** GUIdance reads its rules and checks more files than Claude alone, so a task costs 2 to 17 times more. [Run the evals yourself](docs/benchmarks.md#run-the-evals-yourself).

## License

[MIT](LICENSE). Use it, change it, ship it.

---

Made by [gmmoulin.com](https://gmmoulin.com)
