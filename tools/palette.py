#!/usr/bin/env python3
"""
Colour palettes for GUIdance: project context, palette generation, checks.

  python3 palette.py context  <project_dir> [--json]
  python3 palette.py generate --seed "#034BB8" [--variant tonal_spot|neutral|vibrant|expressive|fidelity]
                              [--name "Calm blue"] [--out palette.json] [--json]

context
  Gathers what a palette should fit: product name and description (package.json,
  README, PRODUCT.md / DESIGN.md, page metadata), existing colour tokens that look
  like brand colours, and colours used in logo / favicon SVGs. Claude reads this to
  decide whether it knows enough or must ask the user.

generate
  Builds a full role-based palette in light and dark from one seed colour, using
  the Material 3 colour system [M3-COLOR A]:
    - tonal palettes per Material's scheme variants (chroma and hue rotation per
      variant, from material-color-utilities, spec 2021)
    - each role takes Material's tone in light and dark (primary 40 / 80,
      surface 98 / 6, on-surface 10 / 90, outline 50 / 60 ...)
  Tone is CIE L* lightness. Because WCAG contrast depends only on luminance and
  L* is a function of luminance alone, the tone pairs Material uses keep their
  contrast exactly. Hue and chroma come from OKLCH instead of Material's
  CAM16-based HCT (both keep hue steady as lightness changes; plain CIE LCh turns
  blues purple), so colours can differ slightly from Material's own tools; tones
  and contrast are exact up to 8-bit rounding.

  Extra roles (judgment, not Material core): success and warning as fixed hues on
  the same tones as error; chart-1..5 categorical colours at tones that reach 3:1
  against the surfaces (WCAG 1.4.11).
  Variant "fidelity" keeps the seed itself in light theme: as primary when it
  reaches 4.5:1 on every surface and its label reads on it, otherwise as
  primary-container. For brands that must show the exact colour.

  Every role pair the UI relies on is checked against WCAG (4.5:1 text, 3:1
  non-text) after rounding. Exit code 1 if any check fails.
"""
import argparse
import json
import math
import os
import re
import sys

# ---------------- colour math (sRGB <-> CIE Lab, D65) ----------------

WHITE = (0.95047, 1.0, 1.08883)


def srgb_to_linear(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def linear_to_srgb(c):
    return 12.92 * c if c <= 0.0031308 else 1.055 * c ** (1 / 2.4) - 0.055


def hex_to_rgb(h):
    h = h.strip().lstrip("#")
    if len(h) == 3:
        h = "".join(ch * 2 for ch in h)
    return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))


def rgb_to_hex(rgb):
    return "#" + "".join(f"{max(0, min(255, round(c * 255))):02x}" for c in rgb)


def rgb_to_xyz(rgb):
    r, g, b = (srgb_to_linear(c) for c in rgb)
    return (0.4124564 * r + 0.3575761 * g + 0.1804375 * b,
            0.2126729 * r + 0.7151522 * g + 0.0721750 * b,
            0.0193339 * r + 0.1191920 * g + 0.9503041 * b)


def xyz_to_linear_rgb(xyz):
    x, y, z = xyz
    return (3.2404542 * x - 1.5371385 * y - 0.4985314 * z,
            -0.9692660 * x + 1.8760108 * y + 0.0415560 * z,
            0.0556434 * x - 0.2040259 * y + 1.0572252 * z)


def _f(t):
    return t ** (1 / 3) if t > 216 / 24389 else (24389 / 27 * t + 16) / 116


def _finv(t):
    return t ** 3 if t ** 3 > 216 / 24389 else (116 * t - 16) / (24389 / 27)


def rgb_to_lch(rgb):
    x, y, z = rgb_to_xyz(rgb)
    fx, fy, fz = _f(x / WHITE[0]), _f(y / WHITE[1]), _f(z / WHITE[2])
    L, a, b = 116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)
    return L, math.hypot(a, b), math.degrees(math.atan2(b, a)) % 360


def lch_to_linear(L, C, H):
    a, b = C * math.cos(math.radians(H)), C * math.sin(math.radians(H))
    fy = (L + 16) / 116
    fx, fz = fy + a / 500, fy - b / 200
    return xyz_to_linear_rgb((WHITE[0] * _finv(fx), WHITE[1] * _finv(fy), WHITE[2] * _finv(fz)))


# OKLab: used for hue and chroma, because CIE LCh bends blues toward purple as
# they get lighter. Tone (CIE L*) is still matched exactly.
def linear_to_oklab(r, g, b):
    l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
    m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
    s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
    l, m, s = (math.copysign(abs(v) ** (1 / 3), v) for v in (l, m, s))
    return (0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
            1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
            0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s)


def oklab_to_linear(L, a, b):
    l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
    m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
    s = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3
    return (4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
            -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
            -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s)


def rgb_to_oklch(rgb):
    L, a, b = linear_to_oklab(*(srgb_to_linear(c) for c in rgb))
    return L, math.hypot(a, b), math.degrees(math.atan2(b, a)) % 360


def _lstar_from_y(y):
    return 116 * _f(y) - 16


OK_PER_CHROMA = 0.0034   # Material (CAM16) chroma units to OKLCH chroma, approximate


def _ok_at_tone(okc, hue, tone):
    """OK lightness giving CIE L* == tone for this OK chroma and hue (L* rises with OK L)."""
    a, b = okc * math.cos(math.radians(hue)), okc * math.sin(math.radians(hue))
    lo, hi = 0.0, 1.0
    for _ in range(40):
        mid = (lo + hi) / 2
        r, g, bl = oklab_to_linear(mid, a, b)
        y = 0.2126729 * r + 0.7151522 * g + 0.0721750 * bl
        if _lstar_from_y(max(y, 0.0)) < tone:
            lo = mid
        else:
            hi = mid
    return (lo + hi) / 2, a, b


def tone_color(hue, chroma, tone):
    """Colour at L* = tone (exact), OKLCH hue, and the highest chroma <= target in sRGB gamut.
    `chroma` is in Material's units and converted to OKLCH."""
    if tone <= 0:
        return "#000000"
    if tone >= 100:
        return "#ffffff"
    def at(c):
        L, a, b = _ok_at_tone(c, hue, tone)
        return oklab_to_linear(L, a, b)
    def ok(c):
        return all(-1e-7 <= v <= 1 + 1e-7 for v in at(c))
    target = chroma * OK_PER_CHROMA
    lo, hi = 0.0, target
    if ok(hi):
        lo = hi
    else:
        for _ in range(30):
            mid = (lo + hi) / 2
            if ok(mid):
                lo = mid
            else:
                hi = mid
    return rgb_to_hex(tuple(linear_to_srgb(max(0.0, min(1.0, v))) for v in at(lo)))


def luminance(hexc):
    r, g, b = (srgb_to_linear(c) for c in hex_to_rgb(hexc))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(a, b):
    la, lb = luminance(a), luminance(b)
    return (max(la, lb) + 0.05) / (min(la, lb) + 0.05)


# ---------------- Material 3 scheme (spec 2021) ----------------

def _rotate(hue, breaks, rots):
    for i in range(len(breaks) - 1):
        if breaks[i] <= hue < breaks[i + 1]:
            return (hue + rots[i]) % 360
    return hue


def accent_hue(hue, target=125.0, step=45.0, near=20.0):
    """Two-tone accent: move the hue 45 degrees toward OKLCH ~125 (lime, the hues that stay
    colourful at light tones). Within 45 degrees of it, use 125 itself (green gets lime). Within
    20 degrees, the brand already is yellow-green: move 45 degrees away so the accent stays distinct."""
    d = (target - hue + 540) % 360 - 180          # signed shortest distance, -180..180
    if abs(d) < near:
        return (hue - step) % 360 if d >= 0 else (hue + step) % 360
    if abs(d) <= step:
        return target
    return (hue + (step if d > 0 else -step)) % 360


def palettes_for(hue, variant):
    """(hue, chroma) per tonal palette, from material-color-utilities spec 2021."""
    if variant in ("tonal_spot", "fidelity"):
        p = {"primary": (hue, 36), "secondary": (hue, 16), "tertiary": ((hue + 60) % 360, 24),
             "neutral": (hue, 6), "neutral_variant": (hue, 8)}
    elif variant == "two_tone":
        # judgment (GUIdance): deep, muted brand plus a bright accent 45 degrees toward yellow-green
        # (OKLCH ~110, the hues that stay most colourful at light tones), with near-neutral surfaces
        p = {"primary": (hue, 24), "secondary": (accent_hue(hue), 40), "tertiary": (accent_hue(hue), 20),
             "neutral": (hue, 2), "neutral_variant": (hue, 2)}
    elif variant == "neutral":
        p = {"primary": (hue, 12), "secondary": (hue, 8), "tertiary": (hue, 16),
             "neutral": (hue, 2), "neutral_variant": (hue, 2)}
    elif variant == "vibrant":
        b = [0, 41, 61, 101, 131, 181, 251, 301, 360]
        p = {"primary": (hue, 200), "secondary": (_rotate(hue, b, [18, 15, 10, 12, 15, 18, 15, 12, 12]), 24),
             "tertiary": (_rotate(hue, b, [35, 30, 20, 25, 30, 35, 30, 25, 25]), 32),
             "neutral": (hue, 10), "neutral_variant": (hue, 12)}
    elif variant == "expressive":
        b = [0, 21, 51, 121, 151, 191, 271, 321, 360]
        p = {"primary": ((hue + 240) % 360, 40),
             "secondary": (_rotate(hue, b, [45, 95, 45, 20, 45, 90, 45, 45, 45]), 24),
             "tertiary": (_rotate(hue, b, [120, 120, 20, 45, 20, 15, 20, 120, 120]), 32),
             "neutral": ((hue + 15) % 360, 8), "neutral_variant": ((hue + 15) % 360, 12)}
    else:
        raise ValueError(variant)
    p["error"] = (25, 84)          # Material's error palette (red), hue in OKLCH degrees
    p["success"] = (150, 48)       # judgment: green, same tones as error
    p["warning"] = (70, 60)        # judgment: amber, same tones as error
    return p


# role: (palette, light tone, dark tone)   [M3 color_spec_2021, default contrast]
ROLES = {
    "primary": ("primary", 40, 80), "on-primary": ("primary", 100, 20),
    "primary-container": ("primary", 90, 30), "on-primary-container": ("primary", 30, 90),
    "secondary": ("secondary", 40, 80), "on-secondary": ("secondary", 100, 20),
    "secondary-container": ("secondary", 90, 30), "on-secondary-container": ("secondary", 30, 90),
    "tertiary": ("tertiary", 40, 80), "on-tertiary": ("tertiary", 100, 20),
    "tertiary-container": ("tertiary", 90, 30), "on-tertiary-container": ("tertiary", 30, 90),
    "error": ("error", 40, 80), "on-error": ("error", 100, 20),
    "error-container": ("error", 90, 30), "on-error-container": ("error", 30, 90),
    "success": ("success", 40, 80), "on-success": ("success", 100, 20),
    "success-container": ("success", 90, 30), "on-success-container": ("success", 30, 90),
    "warning": ("warning", 40, 80), "on-warning": ("warning", 100, 20),
    "warning-container": ("warning", 90, 30), "on-warning-container": ("warning", 30, 90),
    "surface": ("neutral", 98, 6),
    "surface-container-lowest": ("neutral", 100, 4), "surface-container-low": ("neutral", 96, 10),
    "surface-container": ("neutral", 94, 12), "surface-container-high": ("neutral", 92, 17),
    "surface-container-highest": ("neutral", 90, 22),
    "on-surface": ("neutral", 10, 90), "on-surface-variant": ("neutral_variant", 30, 80),
    "outline": ("neutral_variant", 50, 60), "outline-variant": ("neutral_variant", 80, 30),
    "inverse-surface": ("neutral", 20, 90), "inverse-on-surface": ("neutral", 95, 20),
    "inverse-primary": ("primary", 80, 40),
}
SURFACES = ["surface", "surface-container-lowest", "surface-container-low", "surface-container",
            "surface-container-high", "surface-container-highest"]
CHART_TONES = (48, 72)   # light: L* 48 reaches 3:1+ on surface 100..90; dark: 72 on 4..22


def chart_hues(hue):
    # Five well-separated hues starting from the brand hue; neighbours never only
    # red vs green (still pair with labels or shapes: rule 1.3).
    steps = [0, 150, 60, 250, 310]
    return [(hue + s) % 360 for s in steps]


def build(seed, variant):
    L, _, _ = rgb_to_lch(hex_to_rgb(seed))
    _, okc, H = rgb_to_oklch(hex_to_rgb(seed))
    C = okc / OK_PER_CHROMA
    pal = palettes_for(H, variant)
    if variant == "vibrant":
        pal["primary"] = (H, max(C, 60))
    out = {"light": {}, "dark": {}}
    for role, (p, lt, dt) in ROLES.items():
        h, c = pal[p]
        out["light"][role] = tone_color(h, c, lt)
        out["dark"][role] = tone_color(h, c, dt)
    if variant == "two_tone":
        # judgment: the accent stays bright in dark mode (a dark accent container loses the point of two-tone)
        h, c = pal["secondary"]
        out["dark"]["secondary-container"] = tone_color(h, c, 85)
        out["dark"]["on-secondary-container"] = tone_color(h, c, 20)
    if variant == "fidelity":
        # Keep the exact brand colour where contrast allows (Material's fidelity idea):
        # as primary when it reads on the light surfaces and its label reads on it,
        # otherwise as the light primary container with a readable label.
        light = out["light"]
        on = "#ffffff" if contrast(seed, "#ffffff") >= contrast(seed, "#000000") else "#000000"
        ok_as_primary = (min(contrast(seed, light[s_]) for s_ in SURFACES) >= 4.5 and contrast(on, seed) >= 4.5)
        if ok_as_primary:
            light["primary"], light["on-primary"] = seed.lower(), on
        else:
            light["primary-container"], light["on-primary-container"] = seed.lower(), on
        out["fidelity_role"] = "primary" if ok_as_primary else "primary-container"
    for i, h in enumerate(chart_hues(pal["primary"][0]), 1):
        out["light"][f"chart-{i}"] = tone_color(h, 60, CHART_TONES[0])
        out["dark"][f"chart-{i}"] = tone_color(h, 50, CHART_TONES[1])
    out["seed"] = {"hex": seed.lower(), "tone": round(L, 1), "chroma": round(C, 1), "hue": round(H, 1)}
    out["palettes"] = {k: {"hue": round(h, 1), "chroma": c} for k, (h, c) in pal.items()}
    notes = []
    def dist(x, y):
        d = abs(x - y) % 360
        return min(d, 360 - d)
    for role in ("error", "success", "warning"):
        if dist(pal["primary"][0], pal[role][0]) < 30 and pal["primary"][1] >= 12:
            notes.append(f"primary hue is close to {role}: {role} states must carry an icon and a word, never colour alone (rule 1.3); consider tertiary or a neutral variant for big brand areas")
    out["notes"] = notes
    return out


def checks(scheme):
    """Pairs the UI relies on, with WCAG minimums."""
    pairs = []
    for s in SURFACES:
        pairs += [("on-surface", s, 4.5, "text"), ("on-surface-variant", s, 4.5, "text"),
                  ("primary", s, 3.0, "non-text (buttons, focus, links need 4.5 below)"),
                  ("outline", s, 3.0, "non-text (field borders)"),
                  ("error", s, 4.5, "text (error messages)")]
    pairs += [("primary", "surface", 4.5, "text (links)")]
    for g in ("primary", "secondary", "tertiary", "error", "success", "warning"):
        pairs += [(f"on-{g}", g, 4.5, "text"), (f"on-{g}-container", f"{g}-container", 4.5, "text")]
    pairs += [("inverse-on-surface", "inverse-surface", 4.5, "text"), ("inverse-primary", "inverse-surface", 3.0, "non-text")]
    for i in range(1, 6):
        for s in ("surface", "surface-container-low", "surface-container-lowest"):
            pairs.append((f"chart-{i}", s, 3.0, "non-text (chart marks)"))
    res = []
    for theme in ("light", "dark"):
        for fg, bg, need, kind in pairs:
            r = contrast(scheme[theme][fg], scheme[theme][bg])
            res.append({"theme": theme, "fg": fg, "bg": bg, "ratio": round(r, 2), "need": need,
                        "kind": kind, "pass": r >= need})
    return res


# ---------------- project context ----------------

SKIP = {"node_modules", ".git", ".next", "dist", "build", "out", ".nuxt", ".svelte-kit", "coverage",
        ".turbo", ".vercel", ".cache", "vendor", ".venv", "venv", "__pycache__"}


def read(p, n=60000):
    try:
        with open(p, encoding="utf-8", errors="replace") as fh:
            return fh.read(n)
    except OSError:
        return ""


def walk(root, pred, limit=3000):
    out = []
    for d, dirs, files in os.walk(root):
        dirs[:] = [x for x in dirs if x not in SKIP and not x.startswith(".")]
        for f in files:
            if pred(f, d):
                out.append(os.path.join(d, f))
                if len(out) >= limit:
                    return out
    return out


HEX_RE = re.compile(r"#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b")


def context(root):
    root = os.path.abspath(root)
    ctx = {"root": root, "name": None, "description": None, "docs": [], "metadata": [],
           "brand_tokens": [], "logo_colours": [], "all_colour_tokens": 0}
    pkg = read(os.path.join(root, "package.json"))
    if pkg:
        try:
            j = json.loads(pkg)
            ctx["name"], ctx["description"] = j.get("name"), j.get("description")
            ctx["keywords"] = j.get("keywords")
        except json.JSONDecodeError:
            pass
    for name in ("PRODUCT.md", "DESIGN.md", "README.md", "readme.md", "docs/README.md", "documentation/README.md"):
        p = os.path.join(root, name)
        if os.path.exists(p):
            txt = read(p, 6000)
            lines = [l.strip() for l in txt.splitlines() if l.strip() and not l.strip().startswith(("![", "<", "```", "|", "[!["))]
            ctx["docs"].append({"file": name, "excerpt": "\n".join(lines[:25])[:1800]})
    # Page metadata (Next.js metadata objects, <title>, meta description)
    for f in walk(root, lambda f, d: f in ("layout.tsx", "layout.jsx", "layout.js", "index.html", "_document.tsx", "app.html", "nuxt.config.ts"), 20):
        t = read(f, 20000)
        for m in re.finditer(r"(title|description)\s*:\s*['\"`]([^'\"`]{4,200})['\"`]", t):
            ctx["metadata"].append(f"{m.group(1)}: {m.group(2)}")
        for m in re.finditer(r"<title>([^<]{2,120})</title>|<meta\s+name=['\"]description['\"]\s+content=['\"]([^'\"]{4,300})", t):
            ctx["metadata"].append((m.group(1) or m.group(2)).strip())
    ctx["metadata"] = list(dict.fromkeys(ctx["metadata"]))[:8]
    # Existing colour tokens that look like brand colours
    brand_words = ("brand", "primary", "accent", "main", "blue", "red", "green", "purple", "orange", "teal", "pink", "gold")
    style_files = walk(root, lambda f, d: f.endswith((".css", ".scss", ".sass")) or re.search(r"(^|[-_.])(tokens?|theme)\.(ts|js|json)$", f))
    seen = set()
    count = 0
    for f in style_files:
        txt = read(f, 200000)
        for m in re.finditer(r"(--[\w-]+|\$[\w-]+|['\"]?[A-Za-z][\w-]*['\"]?)\s*:\s*['\"]?(#[0-9a-fA-F]{3,8})\b", txt):
            name = m.group(1).strip("'\"")
            count += 1
            low = name.lower()
            if any(w in low for w in ("text", "bg", "background", "surface", "border", "shadow", "tint", "ink")):
                continue
            if any(w in low for w in brand_words) and (name, m.group(2).lower()) not in seen:
                seen.add((name, m.group(2).lower()))
                ctx["brand_tokens"].append({"name": name, "value": m.group(2).lower(), "file": os.path.relpath(f, root)})
    rank = lambda t: next((i for i, w in enumerate(brand_words) if w in t["name"].lower()), 99)
    ctx["brand_tokens"] = sorted(ctx["brand_tokens"], key=rank)[:20]
    ctx["all_colour_tokens"] = count
    # Logo / favicon SVG colours
    logos = walk(os.path.join(root), lambda f, d: f.endswith(".svg") and re.search(r"(logo|favicon|icon|brand|mark)", f, re.I), 30)
    tally = {}
    for f in logos:
        for c in HEX_RE.findall(read(f, 200000)):
            c = c.lower()
            if len(c) == 4:
                c = "#" + "".join(ch * 2 for ch in c[1:])
            _, okc, _ = rgb_to_oklch(hex_to_rgb(c))
            if okc < 0.03:     # skip greys, black, white
                continue
            tally[c] = tally.get(c, 0) + 1
    ctx["logo_colours"] = [{"hex": c, "uses": n} for c, n in sorted(tally.items(), key=lambda x: -x[1])[:8]]
    ctx["logo_files"] = [os.path.relpath(f, root) for f in logos[:10]]
    known = bool(ctx["description"] or ctx["docs"] or ctx["metadata"])
    ctx["enough_to_infer"] = known
    return ctx


# ---------------- CLI ----------------

def main():
    ap = argparse.ArgumentParser(description="GUIdance palettes")
    ap.add_argument("command", choices=["context", "generate"])
    ap.add_argument("project", nargs="?", default=".")
    ap.add_argument("--seed")
    ap.add_argument("--variant", default="tonal_spot", choices=["tonal_spot", "neutral", "vibrant", "expressive", "two_tone", "fidelity"])
    ap.add_argument("--name")
    ap.add_argument("--out")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args()

    if a.command == "context":
        ctx = context(a.project)
        if a.json:
            print(json.dumps(ctx, indent=2, ensure_ascii=False))
            return
        print(f"Project: {ctx['root']}")
        print(f"Name: {ctx['name'] or '?'}   Description: {ctx['description'] or '?'}")
        for m in ctx["metadata"]:
            print(f"  meta  {m}")
        for d in ctx["docs"]:
            print(f"\n--- {d['file']} ---\n{d['excerpt'][:900]}")
        print(f"\nColour tokens in styles: {ctx['all_colour_tokens']}")
        for t in ctx["brand_tokens"]:
            print(f"  brand-like  {t['name']}: {t['value']}  ({t['file']})")
        for c in ctx["logo_colours"]:
            print(f"  logo colour {c['hex']} x{c['uses']}")
        print(f"\nEnough to infer the product: {'yes' if ctx['enough_to_infer'] else 'no, ask the user'}")
        return

    if not a.seed or not re.fullmatch(r"#?[0-9a-fA-F]{6}|#?[0-9a-fA-F]{3}", a.seed.strip()):
        ap.error("--seed #rrggbb is required")
    seed = "#" + a.seed.strip().lstrip("#")
    scheme = build(seed, a.variant)
    res = checks(scheme)
    fails = [r for r in res if not r["pass"]]
    doc = {"name": a.name or f"{a.variant} {seed}", "variant": a.variant, "source": "Material 3 color roles and tones (spec 2021); tone = CIE L*, hue and chroma in OKLCH (approximation of HCT)",
           **scheme, "checks": {"total": len(res), "failed": fails}}
    if a.out:
        with open(a.out, "w", encoding="utf-8") as fh:
            json.dump(doc, fh, indent=2)
    if a.json or not a.out:
        if a.json:
            print(json.dumps(doc, indent=2))
            sys.exit(1 if fails else 0)
    print(f"{doc['name']}  (seed {seed}, tone {scheme['seed']['tone']}, chroma {scheme['seed']['chroma']}, hue {scheme['seed']['hue']})")
    for theme in ("light", "dark"):
        keys = ["primary", "on-primary", "primary-container", "secondary-container", "tertiary", "surface",
                "surface-container", "on-surface", "on-surface-variant", "outline", "error", "success", "warning"]
        print(f"  {theme:5} " + "  ".join(f"{k}={scheme[theme][k]}" for k in keys))
    print(f"  checks: {len(res) - len(fails)}/{len(res)} pass")
    for n in scheme.get("notes", []):
        print(f"  note: {n}")
    for f in fails:
        print(f"  FAIL {f['theme']} {f['fg']} on {f['bg']}: {f['ratio']}:1 (need {f['need']})")
    if a.out:
        print(f"  written: {a.out}")
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
