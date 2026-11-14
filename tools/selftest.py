#!/usr/bin/env python3
"""
GUIdance self-test: checks that the skill works on this machine.

  python3 selftest.py [--keep]

Runs every script against small throwaway projects in a temporary folder:
palette generation (all variants), the preview page (self-contained, no network
links), setup detection and token generation for every target (css, tailwind4,
tailwind3, mui, scss) with and without a palette, and contrast checks on the
written colours. If Node.js and Playwright are available it also runs the page
audits (targets.js, type-audit.js) on the preview; otherwise it reports them as
skipped, with the install command.

Nothing outside the temporary folder is touched. --keep leaves it for inspection.
Exit code 0 when everything that could run passed.
"""
import json
import os
import shutil
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
PY = sys.executable or "python3"
results = []


def run(args, cwd=None, expect=0):
    p = subprocess.run(args, cwd=cwd, capture_output=True, text=True)
    return p.returncode == expect, (p.stdout + p.stderr).strip()


def check(name, ok, detail=""):
    results.append((name, ok, detail))
    print(f"  {'PASS' if ok else 'FAIL'}  {name}" + (f"\n        {detail.splitlines()[-1][:160]}" if detail and not ok else ""))


def skip(name, why):
    results.append((name, None, why))
    print(f"  SKIP  {name}\n        {why}")


def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(text)


def main():
    keep = "--keep" in sys.argv
    tmp = tempfile.mkdtemp(prefix="guidance-selftest-")
    print(f"GUIdance self-test in {tmp}\nPython {sys.version.split()[0]}\n")
    S = lambda name: os.path.join(HERE, name)

    # 1. Palettes
    print("Palettes")
    pal = os.path.join(tmp, "a.json")
    for v in ("tonal_spot", "neutral", "vibrant", "expressive", "fidelity"):
        out = pal if v == "tonal_spot" else os.path.join(tmp, f"{v}.json")
        ok, log = run([PY, S("palette.py"), "generate", "--seed", "#3366cc", "--variant", v, "--name", v, "--out", out])
        check(f"palette {v}: all WCAG pairs pass", ok and os.path.exists(out), log)
    for seed in ("#ffcc00", "#000000", "#ffffff", "#e11d48"):
        ok, log = run([PY, S("palette.py"), "generate", "--seed", seed, "--variant", "fidelity"])
        check(f"palette edge case {seed}", ok, log)

    # 2. Preview
    print("\nPreview")
    html_out = os.path.join(tmp, "preview.html")
    ok, log = run([PY, S("preview.py"), pal, os.path.join(tmp, "neutral.json"), "--out", html_out, "--title", "Self-test"])
    check("preview page written", ok and os.path.exists(html_out), log)
    if os.path.exists(html_out):
        page = open(html_out, encoding="utf-8").read()
        external = [t for t in ("http://", "https://", "//cdn", "@import url") if t in page]
        check("preview is self-contained (no network links)", not external, f"found {external}")

    # 3. Setup on throwaway projects
    print("\nSetup")
    projects = {
        "css": ({"package.json": '{"dependencies":{"next":"15"}}', "app/globals.css": ":root{--brand:#123456}\n"}, "app/guidance.css"),
        "tailwind4": ({"package.json": '{"devDependencies":{"tailwindcss":"^4.1.0"}}', "src/app.css": '@import "tailwindcss";\n'}, "src/guidance.css"),
        "tailwind3": ({"package.json": '{"devDependencies":{"tailwindcss":"^3.4.0"}}', "tailwind.config.js": "module.exports={content:[]};\n",
                       "src/input.css": "@tailwind base;\n@tailwind utilities;\n"}, "guidance.preset.js"),
        "mui": ({"package.json": '{"dependencies":{"@mui/material":"^7.0.0","react":"^19"},"devDependencies":{"typescript":"^5"}}',
                 "src/theme.ts": "import { createTheme } from '@mui/material/styles';\nexport const theme = createTheme({});\n"}, "src/guidanceTheme.ts"),
        "scss": ({"package.json": '{"devDependencies":{"sass":"^1.80.0"}}', "src/styles/globals.scss": ".a{color:red}\n"}, None),
    }
    for target, (files, expected) in projects.items():
        root = os.path.join(tmp, "proj-" + target)
        for rel, text in files.items():
            write(os.path.join(root, rel), text)
        ok, log = run([PY, S("setup.py"), "detect", root, "--json"])
        detected = None
        if ok:
            try:
                detected = json.loads(log)["recommended_target"]
            except (ValueError, KeyError):
                ok = False
        if target == "scss":
            check(f"detect {target} project", ok, log)   # plain Sass may be detected as css: both are valid
        else:
            check(f"detect {target} project -> {detected}", ok and detected == target, log)
        args = [PY, S("setup.py"), "generate", root, "--target", target, "--palette", pal, "--write"]
        ok, log = run(args)
        written = os.path.join(root, expected) if expected else None
        if not written:
            for d, _, fs in os.walk(root):
                for f in fs:
                    if "guidance" in f:
                        written = os.path.join(d, f)
        check(f"generate {target} with palette", ok and written and os.path.exists(written), log)
        ok2, log2 = run(args, expect=1)
        check(f"generate {target} refuses to overwrite", ok2, log2)
        if written and written.endswith((".css", ".scss")):
            ok, log = run([PY, S("contrast.py"), written, "--fails"])
            check(f"contrast on {target} colours: no failures", ok, log)

    # 4. Contrast basics
    print("\nContrast")
    check("contrast #767676 on white passes 4.5", run([PY, S("contrast.py"), "--colors", "#767676", "#ffffff"])[0])
    check("contrast #777777 on white fails 4.5", run([PY, S("contrast.py"), "--colors", "#777777", "#ffffff"], expect=1)[0])

    # 5. Page audits (optional)
    print("\nPage audits")
    node = shutil.which("node")
    if not node:
        skip("targets.js / type-audit.js", "Node.js not found. Install Node 18+ to run the command-line checks.")
    else:
        probe = subprocess.run([node, "-e", "try{require('playwright')}catch(e){try{require('module').createRequire(process.cwd()+'/')('playwright')}catch(e){process.exit(3)}}"],
                               capture_output=True, text=True, cwd=os.getcwd())
        if probe.returncode == 3:
            skip("targets.js / type-audit.js", "Playwright not found. In a project: npm i -D playwright && npx playwright install chromium")
        else:
            url = "file://" + html_out
            p = subprocess.run([node, S("targets.js"), url, "--json"], capture_output=True, text=True)
            check("targets.js runs on the preview", p.returncode in (0, 1) and '"viewports"' in p.stdout, p.stderr)
            p = subprocess.run([node, S("type-audit.js"), url, "--json"], capture_output=True, text=True)
            check("type-audit.js runs on the preview", p.returncode in (0, 1) and '"sizes"' in p.stdout, p.stderr)
            p = subprocess.run([node, S("check_equivalence.js")], capture_output=True, text=True)
            check("minified checks match their readable sources", p.returncode == 0, p.stdout + p.stderr)

    failed = [r for r in results if r[1] is False]
    skipped = [r for r in results if r[1] is None]
    passed = [r for r in results if r[1] is True]
    print(f"\n{len(passed)} passed, {len(failed)} failed, {len(skipped)} skipped.")
    if keep:
        print(f"Kept {tmp}")
    else:
        shutil.rmtree(tmp, ignore_errors=True)
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
