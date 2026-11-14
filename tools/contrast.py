#!/usr/bin/env python3
"""
WCAG contrast checker for CSS design tokens.

Reads CSS custom properties (--name: value) from one or more CSS/SCSS files,
groups them by theme block (:root, [data-theme="dark"], .dark,
@media (prefers-color-scheme: dark) ...), resolves var() references and
checks foreground/background pairs against WCAG 2.2:

  text      4.5:1  (SC 1.4.3, normal text)
  large     3:1    (SC 1.4.3, 24px+ or ~18.5px+ bold)
  non-text  3:1    (SC 1.4.11, borders, focus rings, icons, chart marks)

Usage
  python3 contrast.py app/globals.css
  python3 contrast.py tokens.css --pair ink-mute:panel --pair rule-strong:panel:nontext
  python3 contrast.py tokens.css --json
  python3 contrast.py --colors "#979797" "#272727"

Without --pair, pairs are guessed from token names:
  foregrounds: names containing text, ink, fg, foreground, on-, label, muted, link, accent, primary
  backgrounds: names containing bg, background, surface, panel, ground, card, canvas, base, paper
  boundaries:  names containing border, rule, line, outline, divider, stroke, focus, ring
Foreground x background pairs are checked at 4.5:1. "on-X" tokens pair only with X.
"disabled" tokens are skipped (inactive controls are exempt). Border tokens are
checked at 3:1 but reported as CHECK, because decorative dividers are exempt and
only control-identifying borders must pass.
Guessed pairs are a starting point: confirm which pairs the UI really uses.

Thresholds are not rounded (4.499 fails), as WCAG requires.
Alpha colours are composited over the background they are checked against.
Exit code 1 if any checked pair fails, so it can run in CI.
"""
import argparse
import colorsys
import json
import re
import signal
import sys

if hasattr(signal, "SIGPIPE"):   # not on Windows
    signal.signal(signal.SIGPIPE, signal.SIG_DFL)

NAMED = {
    "black": "#000000", "white": "#ffffff", "transparent": "#00000000",
    "red": "#ff0000", "green": "#008000", "blue": "#0000ff", "gray": "#808080",
    "grey": "#808080", "silver": "#c0c0c0", "yellow": "#ffff00", "orange": "#ffa500",
}

FG_HINTS = ("text", "ink", "fg", "foreground", "on-", "label", "muted", "mute", "link", "accent", "primary", "heading", "title", "body")
BG_HINTS = ("bg", "background", "surface", "panel", "ground", "card", "canvas", "base", "paper", "sheet", "elevated", "raised")
BORDER_HINTS = ("border", "rule", "line", "outline", "divider", "stroke", "focus", "ring", "separator")
SKIP_HINTS = ("shadow", "radius", "font", "size", "space", "gap", "dur", "ease", "z-", "width", "height", "opacity", "weight", "leading", "tracking", "blur")

THRESH = {"text": 4.5, "large": 3.0, "nontext": 3.0, "boundary": 3.0}


# ---------- colour parsing ----------

def _clamp(x, lo=0.0, hi=1.0):
    return max(lo, min(hi, x))


def parse_color(value):
    """Return (r, g, b, a) with r,g,b in 0..255 and a in 0..1, or None."""
    if value is None:
        return None
    v = value.strip().lower()
    v = re.sub(r"\s*!important$", "", v)
    if v in NAMED:
        v = NAMED[v]
    m = re.fullmatch(r"#([0-9a-f]{3,8})", v)
    if m:
        h = m.group(1)
        if len(h) in (3, 4):
            h = "".join(c * 2 for c in h)
        if len(h) not in (6, 8):
            return None
        r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
        a = int(h[6:8], 16) / 255 if len(h) == 8 else 1.0
        return (r, g, b, a)
    m = re.fullmatch(r"rgba?\((.*)\)", v)
    if m:
        parts = re.split(r"[\s,/]+", m.group(1).strip())
        parts = [p for p in parts if p]
        if len(parts) < 3:
            return None
        def ch(p):
            return float(p[:-1]) * 2.55 if p.endswith("%") else float(p)
        try:
            r, g, b = (ch(p) for p in parts[:3])
            a = 1.0
            if len(parts) >= 4:
                a = float(parts[3][:-1]) / 100 if parts[3].endswith("%") else float(parts[3])
        except ValueError:
            return None
        return (r, g, b, _clamp(a))
    m = re.fullmatch(r"hsla?\((.*)\)", v)
    if m:
        parts = re.split(r"[\s,/]+", m.group(1).strip())
        parts = [p for p in parts if p]
        if len(parts) < 3:
            return None
        try:
            h = float(re.sub(r"deg$", "", parts[0])) / 360
            s = float(parts[1].rstrip("%")) / 100
            l = float(parts[2].rstrip("%")) / 100
            a = 1.0
            if len(parts) >= 4:
                a = float(parts[3][:-1]) / 100 if parts[3].endswith("%") else float(parts[3])
        except ValueError:
            return None
        r, g, b = colorsys.hls_to_rgb(h % 1, l, s)
        return (r * 255, g * 255, b * 255, _clamp(a))
    return None


def composite(fg, bg):
    """Alpha-composite fg over an opaque bg."""
    a = fg[3]
    return (fg[0] * a + bg[0] * (1 - a), fg[1] * a + bg[1] * (1 - a), fg[2] * a + bg[2] * (1 - a), 1.0)


def luminance(c):
    def lin(x):
        x = x / 255
        return x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4
    return 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2])


def ratio(fg, bg):
    if bg[3] < 1:
        bg = composite(bg, (255, 255, 255, 1.0))
    if fg[3] < 1:
        fg = composite(fg, bg)
    l1, l2 = luminance(fg), luminance(bg)
    hi, lo = max(l1, l2), min(l1, l2)
    return (hi + 0.05) / (lo + 0.05)


def hexify(c):
    return "#{:02x}{:02x}{:02x}".format(*(int(round(_clamp(x, 0, 255))) for x in c[:3]))


# ---------- CSS token extraction ----------

def strip_comments(css):
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    css = re.sub(r"(^|[^:])//[^\n]*", r"\1", css)  # SCSS line comments, not urls
    return css


def theme_name(selector_stack):
    """Turn the chain of selectors/at-rules around a block into a theme label."""
    joined = " ".join(selector_stack).lower()
    if "prefers-color-scheme: dark" in joined or "prefers-color-scheme:dark" in joined:
        return "dark (media)"
    joined = re.sub(r":not\([^)]*\)", "", joined)   # :root:not([data-theme=light]) is not the light theme
    m = re.search(r"data-theme\s*=\s*['\"]?([\w-]+)", joined)
    if m:
        return m.group(1)
    m = re.search(r"data-mode\s*=\s*['\"]?([\w-]+)", joined)
    if m:
        return m.group(1)
    if "prefers-color-scheme: dark" in joined or "prefers-color-scheme:dark" in joined:
        return "dark (media)"
    if "prefers-color-scheme: light" in joined:
        return "light (media)"
    m = re.search(r"\.(dark|light|theme-[\w-]+)\b", joined)
    if m:
        return m.group(1)
    return "default"


def extract_tokens(css):
    """Return {theme: {token: raw_value}} by walking braces."""
    css = strip_comments(css)
    themes = {}
    stack = []
    buf = ""
    i = 0
    while i < len(css):
        ch = css[i]
        if ch == "{":
            stack.append(buf.strip())
            buf = ""
        elif ch == "}":
            if stack:
                stack.pop()
            buf = ""
        elif ch == ";":
            decl = buf.strip()
            m = re.match(r"(--[\w-]+)\s*:\s*(.+)$", decl, flags=re.S)
            if m and stack:
                name = m.group(1)[2:]
                themes.setdefault(theme_name(stack), {})[name] = m.group(2).strip()
            buf = ""
        else:
            buf += ch
        i += 1
    return themes


def resolve(name, scope, base, depth=0):
    """Resolve var() chains; scope overrides base (theme over default)."""
    if depth > 20:
        return None
    raw = scope.get(name, base.get(name))
    if raw is None:
        return None
    m = re.fullmatch(r"var\(\s*--([\w-]+)\s*(?:,\s*(.+))?\)", raw.strip())
    if m:
        got = resolve(m.group(1), scope, base, depth + 1)
        if got is None and m.group(2):
            return m.group(2).strip()
        return got
    return raw


def colour_tokens(themes):
    """Return {theme: {token: rgba}} for tokens that resolve to colours."""
    base = themes.get("default", {})
    out = {}
    for theme, toks in themes.items():
        names = set(base) | set(toks)
        resolved = {}
        for n in names:
            if any(h in n for h in SKIP_HINTS):
                continue
            c = parse_color(resolve(n, toks, base) or "")
            if c:
                resolved[n] = c
        if resolved:
            out[theme] = resolved
    return out


def classify(name):
    n = name.lower()
    if any(h in n for h in BORDER_HINTS):
        return "border"
    if any(h in n for h in BG_HINTS):
        return "bg"
    if any(h in n for h in FG_HINTS):
        return "fg"
    return None


M3_SURFACES = ["surface", "surface-container-lowest", "surface-container-low", "surface-container",
               "surface-container-high", "surface-container-highest", "surface-dim", "surface-bright"]


def m3_pairs(tokens):
    """Material 3 role names (on-surface, surface-container, outline...): check the
    pairs the roles are meant for, not every name against every name."""
    pre = next((n[: -len("on-surface")] for n in tokens if n.endswith("on-surface")), None)
    if pre is None:
        return None
    t = lambda r: pre + r
    has = lambda r: t(r) in tokens
    pairs = []
    for sfc in [x for x in M3_SURFACES if has(x)]:
        for fg, kind in (("on-surface", "text"), ("on-surface-variant", "text"), ("primary", "nontext"),
                         ("outline", "nontext"), ("error", "text")):
            if has(fg):
                pairs.append((t(fg), t(sfc), kind))
        for i in range(1, 9):
            if has(f"chart-{i}"):
                pairs.append((t(f"chart-{i}"), t(sfc), "nontext"))
    for n in tokens:
        if n.startswith(pre + "on-") and n not in (t("on-surface"), t("on-surface-variant")):
            base = pre + n[len(pre) + 3:]
            if base in tokens:
                pairs.append((n, base, "text"))
    if has("inverse-on-surface") and has("inverse-surface"):
        pairs.append((t("inverse-on-surface"), t("inverse-surface"), "text"))
    if has("outline-variant"):
        pairs += [(t("outline-variant"), t(sfc), "boundary") for sfc in M3_SURFACES[:3] if has(sfc)]
    return pairs


def guess_pairs(tokens):
    """Guess pairs from names.

    - "on-X" tokens are text drawn on X, so they pair only with X.
    - "disabled" tokens are skipped: WCAG exempts inactive controls.
    - Border-like tokens are reported as "boundary": they only need 3:1 when the
      border is what identifies a control (an input outline, a checkbox), not
      for decorative dividers. Those are shown as CHECK, not counted as fails.
    """
    m3 = m3_pairs(tokens)
    if m3:
        return m3
    names = [n for n in tokens if "disabled" not in n]
    # "on-X" may carry a prefix: --color-on-primary pairs with --color-primary.
    def on_target(n):
        m = re.match(r"^(.*?)on-(.+)$", n)
        return (m.group(1) + m.group(2)) if m and (m.group(1) == "" or m.group(1).endswith("-")) else None
    on = [n for n in names if on_target(n)]
    fgs = [n for n in names if classify(n) == "fg" and n not in on]
    bgs = [n for n in names if classify(n) == "bg"]
    borders = [n for n in names if classify(n) == "border" and n not in on]
    pairs = [(f, b, "text") for f in sorted(fgs) for b in sorted(bgs)]
    pairs += [(n, on_target(n), "text") for n in sorted(on) if on_target(n) in tokens]
    pairs += [(f, b, "boundary") for f in sorted(borders) for b in sorted(bgs)]
    return pairs


# ---------- main ----------

def main():
    ap = argparse.ArgumentParser(description="WCAG contrast checker for CSS tokens.")
    ap.add_argument("files", nargs="*", help="CSS/SCSS files with custom properties")
    ap.add_argument("--pair", action="append", default=[],
                    help="fg:bg[:text|large|nontext]  (nontext = must pass 3:1, e.g. an input border) using token names without --")
    ap.add_argument("--colors", nargs=2, metavar=("FG", "BG"), help="check two raw colours")
    ap.add_argument("--theme", action="append", help="only these themes")
    ap.add_argument("--json", action="store_true", help="machine-readable output")
    ap.add_argument("--fails", action="store_true", help="only print failing pairs")
    args = ap.parse_args()

    if args.colors:
        fg, bg = parse_color(args.colors[0]), parse_color(args.colors[1])
        if not fg or not bg:
            sys.exit("Could not parse colours.")
        r = ratio(fg, bg)
        res = {k: r >= t for k, t in THRESH.items()}
        if args.json:
            print(json.dumps({"ratio": round(r, 2), "pass": res}))
        else:
            print(f"{args.colors[0]} on {args.colors[1]}: {r:.2f}:1  "
                  f"text {'PASS' if res['text'] else 'FAIL'}  "
                  f"large/non-text {'PASS' if res['nontext'] else 'FAIL'}")
        sys.exit(0 if res["text"] else 1)

    if not args.files:
        ap.error("give CSS files or --colors")

    css = ""
    for f in args.files:
        with open(f, encoding="utf-8", errors="replace") as fh:
            css += fh.read() + "\n"
    themes = colour_tokens(extract_tokens(css))
    if not themes:
        sys.exit("No colour tokens found (looking for --name: <colour> declarations).")
    if args.theme:
        themes = {k: v for k, v in themes.items() if k in args.theme}

    explicit = []
    for p in args.pair:
        bits = p.split(":")
        if len(bits) < 2:
            sys.exit(f"Bad --pair {p!r}; use fg:bg[:kind]")
        kind = bits[2] if len(bits) > 2 else "text"
        if kind not in THRESH:
            sys.exit(f"Unknown kind {kind!r}; use text, large or nontext")
        explicit.append((bits[0].lstrip("-"), bits[1].lstrip("-"), kind))

    def lookup(name, toks):
        # Accept names with or without a common prefix: on-surface finds --color-on-surface.
        if name in toks:
            return name
        for pre in ("color-", "colour-", "c-", "clr-"):
            if pre + name in toks:
                return pre + name
        return name

    results = []
    for theme, toks in themes.items():
        pairs = explicit or guess_pairs(toks)
        for fg, bg, kind in pairs:
            if explicit:
                fg, bg = lookup(fg, toks), lookup(bg, toks)
            if fg not in toks or bg not in toks:
                if explicit and (fg in toks or bg in toks):
                    results.append({"theme": theme, "fg": fg, "bg": bg, "kind": kind, "error": "token not found"})
                continue
            r = ratio(toks[fg], toks[bg])
            results.append({
                "theme": theme, "fg": fg, "bg": bg, "kind": kind,
                "fg_value": hexify(toks[fg]), "bg_value": hexify(toks[bg]),
                "ratio": round(r, 2), "required": THRESH[kind],
                "pass": r >= THRESH[kind] if kind != "boundary" else (True if r >= THRESH[kind] else None),
            })

    failed = [r for r in results if r.get("pass") is False]
    checks = [r for r in results if r.get("pass") is None and "ratio" in r]
    if args.json:
        print(json.dumps({"guessed_pairs": not explicit, "results": results,
                          "failures": len(failed), "checks": len(checks)}, indent=2))
    else:
        if not explicit:
            print("Pairs guessed from token names. Confirm which pairs the UI actually uses.\n")
        for theme in themes:
            rows = [r for r in results if r["theme"] == theme and (not args.fails or r.get("pass") is not True)]
            if not rows:
                continue
            print(f"== theme: {theme}")
            order = {False: 0, None: 1, True: 2}
            for r in sorted(rows, key=lambda x: (order[x.get("pass", True)], x.get("ratio", 99))):
                if "error" in r:
                    print(f"  ??   --{r['fg']} on --{r['bg']}: {r['error']}")
                    continue
                tag = {True: "PASS", False: "FAIL", None: "CHECK"}[r["pass"]]
                sc = "1.4.11" if r["kind"] in ("nontext", "boundary") else "1.4.3"
                print(f"  {tag} {r['ratio']:>6.2f}:1 (need {r['required']}:1, {r['kind']}, SC {sc})  "
                      f"--{r['fg']} {r['fg_value']} on --{r['bg']} {r['bg_value']}")
            print()
        print(f"{len(failed)} failing of {len([r for r in results if 'ratio' in r])} checked pairs.")
        if checks:
            print(f"{len(checks)} border pairs under 3:1 marked CHECK: they fail SC 1.4.11 only if that border "
                  "is what identifies a control (input outline, checkbox) and no contrasting fill does the job.")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
