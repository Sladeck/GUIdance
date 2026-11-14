#!/usr/bin/env python3
"""
Preview palettes as a compact component showcase, one screen per palette.

  python3 preview.py palette-a.json [palette-b.json ...] --out preview.html [--title "..."] [--png shot.png]

A bento grid in the spirit of design-system showcases: task card on primary,
status chips, date picker with a range, stepper, accordion, alert, switches,
checkboxes and a toggle group, icon tabs, buttons, range slider, outlined text
fields (normal and error), badge, number stepper, rating, media card with a
pattern generated from the palette, snackbar. A strip of colour roles with hex
(click copies) sits on top. Palette switcher and light/dark toggle. Interactive,
self-contained (no network). Components follow GUIdance rules: 36px+ controls
(40px+ for primary actions), visible focus, labels outside or floating on
fields, status never by colour alone.

--png saves one screenshot per palette and theme: shot-a-light.png, shot-a-dark.png,
shot-b-light.png ... (needs Python Playwright: pip install playwright && playwright
install chromium). --open shows it in the default browser with nothing to install.
Otherwise publish it as an artifact where artifacts exist.
"""
import argparse
import html
import json
import os
import sys

SWATCHES = ["primary", "on-primary", "primary-container", "secondary-container", "tertiary", "tertiary-container",
            "surface", "surface-container", "on-surface", "on-surface-variant", "outline", "error", "success",
            "warning", "chart-1", "chart-2", "chart-3"]

BODY = r"""
<header class="bar">
  <div class="title"><span class="logo" aria-hidden="true"></span><h1>__TITLE__</h1><span class="sub" id="meta"></span></div>
  <div class="ctrls">
    <div class="seg" role="group" aria-label="Palette" id="pals"></div>
    <div class="seg" role="group" aria-label="Theme">
      <button type="button" data-theme-btn="light" aria-pressed="true">Light</button>
      <button type="button" data-theme-btn="dark" aria-pressed="false">Dark</button>
    </div>
  </div>
</header>
<div class="strip" id="swatches" aria-label="Colour roles"></div>

<main class="bento">
  <!-- column 1 -->
  <div class="col">
    <section class="hero" aria-label="Task card">
      <span class="date">&#9719; Due March 25th</span>
      <h2>Ship the new onboarding flow</h2>
      <div class="who"><span class="av big">LS</span><div><small>Assigned to</small><b>Lucie Simon</b></div></div>
      <div class="prog"><span class="track"><span style="width:62%"></span></span><b>62%</b></div>
    </section>
    <div class="chips">
      <span class="chip c-primary">Design</span><span class="chip c-warn">&#9888; Review</span><span class="chip c-ok">&#10003; Done</span><span class="chip c-bad">&#10005; Blocked</span><span class="chip c-plain">Backlog</span>
    </div>
    <section class="card cal" aria-label="Date picker">
      <div class="calhead"><b id="calmonth">Month</b><span><button class="icon" aria-label="Previous month">&#8249;</button><button class="icon" aria-label="Next month">&#8250;</button></span></div>
      <div class="grid7" id="calgrid"></div>
      <div class="row end"><button class="btn text">Cancel</button><button class="btn text">OK</button></div>
    </section>
  </div>

  <!-- column 2 -->
  <div class="col">
    <section class="card stepper" aria-label="Stepper">
      <span class="st done"><i>&#10003;</i>Account</span><span class="ln"></span>
      <span class="st on"><i>2</i>Workspace</span><span class="ln"></span>
      <span class="st"><i>3</i>Invite</span>
    </section>
    <section class="card acc" aria-label="Accordion">
      <div class="ai open"><button class="ah" aria-expanded="true">Usage <span>&#8963;</span></button><p>Components read their colours from roles, so one palette change restyles every screen.</p></div>
      <div class="ai"><button class="ah" aria-expanded="false">Globals <span>&#8964;</span></button></div>
      <div class="ai dis"><button class="ah" disabled>Archived <span>&#8964;</span></button></div>
    </section>
    <div class="alert"><b>&#10003;</b> Palette applied to 42 components</div>
    <section class="card toggles" aria-label="Toggles">
      <label class="switch"><input type="checkbox" checked role="switch" aria-label="On"><span class="track"><span class="thumb"></span></span></label>
      <label class="switch"><input type="checkbox" role="switch" aria-label="Off"><span class="track"><span class="thumb"></span></span></label>
      <input type="checkbox" class="cb" checked aria-label="Checked">
      <input type="checkbox" class="cb" aria-label="Unchecked">
      <span class="tgl" role="group" aria-label="Align"><button aria-pressed="true" aria-label="Left">&#8676;</button><button aria-pressed="false" aria-label="Center">&#8596;</button><button aria-pressed="false" aria-label="Right">&#8677;</button></span>
    </section>
    <section class="card itabs" role="tablist" aria-label="Icon tabs">
      <button role="tab" aria-selected="true"><span>&#9750;</span>Home</button>
      <button role="tab" aria-selected="false"><span>&#9733;</span>Saved</button>
      <button role="tab" aria-selected="false"><span>&#9881;</span>Settings</button>
    </section>
  </div>

  <!-- column 3 -->
  <div class="col">
    <div class="row">
      <button class="btn filled">&#8615; Install</button><button class="btn outlined">&#8615; Install</button><button class="btn tonal">Later</button>
    </div>
    <section class="card range" aria-label="Range slider">
      <div class="row between"><span class="lbl">Price range</span><b id="rangeval">&euro;20 to &euro;60</b></div>
      <div class="rs"><span class="rail"></span><span class="fill" style="left:20%;right:40%"></span><span class="knob" style="left:20%"></span><span class="knob" style="left:60%"></span></div>
      <div class="row between ticks"><span>&euro;0</span><span>&euro;50</span><span>&euro;100</span></div>
    </section>
    <label class="ofld"><span>Component library</span><input value="GUIdance"></label>
    <label class="ofld err"><span>Email</span><input value="lucie@" aria-invalid="true"><small>&#9888; Enter a full email address</small></label>
    <div class="row three">
      <section class="card mini"><span class="bell" aria-label="3 notifications"><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Zm7-6V11a7 7 0 0 0-5.5-6.84V3.5a1.5 1.5 0 0 0-3 0v.66A7 7 0 0 0 5 11v5l-2 2v1h18v-1l-2-2Z"/></svg><i>3</i></span></section>
      <section class="card mini"><span class="step"><button aria-label="Decrease">&minus;</button><b>2</b><button aria-label="Increase">+</button></span></section>
      <section class="card mini"><span class="stars" aria-label="3.5 out of 5">&#9733;&#9733;&#9733;<span class="half">&#9733;</span><span class="off">&#9733;</span></span></section>
    </div>
    <section class="card media" aria-label="Media card">
      <div class="mh"><span class="av">KY</span><div><b>Kyoto trip</b><small>12 photos &middot; shared</small></div><button class="icon" aria-label="More">&#8942;</button></div>
      <svg class="art" id="pattern" viewBox="0 0 320 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true"></svg>
      <div class="row ctrl"><button class="icon o" aria-label="Previous">&#9198;</button><button class="play" aria-label="Play">&#9654;</button><button class="icon o" aria-label="Next">&#9197;</button><span class="grow"></span><span class="snack">Saved <button class="btn text inv">Undo</button></span></div>
    </section>
  </div>
</main>
"""

CSS = r"""
*{box-sizing:border-box;margin:0}
html,body{background:var(--surface-container-low)}
body{font:14px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:var(--on-surface);padding:16px 24px 24px;transition:background .2s,color .2s}
button{font:inherit;cursor:pointer;color:inherit}
:focus-visible{outline:2px solid var(--primary);outline-offset:2px}
.bar{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
.title{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.title h1{font-size:22px;line-height:28px;font-weight:500}
.sub{font-size:12px;color:var(--on-surface-variant)}
.logo{width:26px;height:26px;border-radius:8px;background:conic-gradient(var(--primary) 0 25%,var(--tertiary) 0 50%,var(--primary-container) 0 75%,var(--secondary-container) 0)}
.ctrls{display:flex;gap:8px;flex-wrap:wrap}
.seg{display:inline-flex;border:1px solid var(--outline);border-radius:999px;overflow:hidden}
.seg button{border:0;background:transparent;padding:0 14px;min-height:36px;font-weight:500;font-size:12px}
.seg button+button{border-left:1px solid var(--outline)}
.seg button[aria-pressed=true]{background:var(--secondary-container);color:var(--on-secondary-container)}
.strip{display:grid;grid-template-columns:repeat(17,1fr);gap:4px;margin:12px 0 14px}
.sw{border:0;border-radius:8px;min-height:44px;padding:4px 6px;text-align:left;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}
.sw .n{font-size:11px;font-weight:500;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sw .h{font:11px ui-monospace,Menlo,monospace}
.sw.edge{box-shadow:inset 0 0 0 1px var(--outline-variant)}
.bento{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;align-items:start}
.col{display:flex;flex-direction:column;gap:12px;min-width:0}
.card{background:var(--surface);border:1px solid var(--outline-variant);border-radius:16px;padding:14px;min-width:0}
.row{display:flex;gap:8px;align-items:center}.between{justify-content:space-between}.end{justify-content:flex-end}.grow{flex:1}
.lbl{font-size:12px;font-weight:500;color:var(--on-surface-variant)}
.av{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;font-weight:500;font-size:12px;background:var(--primary-container);color:var(--on-primary-container);flex:none}
.icon{width:36px;height:36px;border-radius:50%;border:0;background:transparent;color:var(--primary);font-size:20px;display:inline-grid;place-items:center}
.icon.o{border:1px solid var(--outline);color:var(--on-surface-variant);font-size:20px;width:40px;height:40px}
/* hero */
.hero{background:var(--primary);color:var(--on-primary);border-radius:20px;padding:20px;display:flex;flex-direction:column;gap:14px}
.date{font-size:12px;font-weight:500;opacity:.92}
.hero h2{font-size:22px;line-height:28px;font-weight:500}
.who{display:flex;gap:10px;align-items:center}.who small{display:block;font-size:12px;opacity:.85}
.av.big{width:44px;height:44px;background:var(--primary-container);color:var(--on-primary-container);box-shadow:0 0 0 3px var(--on-primary)}
.prog{display:flex;align-items:center;gap:12px}
.prog .track{flex:1;height:6px;border-radius:999px;background:color-mix(in srgb,var(--on-primary) 30%,transparent);overflow:hidden}
.prog .track span{display:block;height:100%;background:var(--on-primary);border-radius:999px}
/* chips */
.chips{display:flex;flex-wrap:wrap;gap:6px}
.chip{display:inline-flex;align-items:center;gap:4px;border-radius:999px;padding:0 12px;min-height:30px;font-size:12px;font-weight:500;border:1px solid transparent}
.c-primary{background:var(--primary-container);color:var(--on-primary-container)}
.c-warn{background:var(--warning-container);color:var(--on-warning-container)}
.c-ok{background:var(--success-container);color:var(--on-success-container)}
.c-bad{background:var(--error-container);color:var(--on-error-container)}
.c-plain{border-color:var(--outline);color:var(--on-surface-variant)}
/* calendar */
.cal{display:flex;flex-direction:column;gap:8px}
.calhead{display:flex;justify-content:space-between;align-items:center}.calhead b{font-size:16px;font-weight:500}
.grid7{display:grid;grid-template-columns:repeat(7,1fr);text-align:center;gap:2px 0}
.grid7 .dh{font-size:12px;color:var(--on-surface-variant);font-weight:500;padding:4px 0}
.grid7 .d{border:0;background:transparent;width:34px;height:34px;border-radius:50%;justify-self:center;font-size:12px}
.grid7 .d.today{box-shadow:inset 0 0 0 1px var(--primary);color:var(--primary);font-weight:500}
.grid7 .d.sel{background:var(--primary);color:var(--on-primary);font-weight:500}
.grid7 .d.inr{background:var(--secondary-container);color:var(--on-secondary-container);border-radius:0;width:100%}
/* buttons */
.btn{border:0;border-radius:999px;padding:0 16px;min-height:40px;font-weight:500;white-space:nowrap}
.btn.filled{background:var(--primary);color:var(--on-primary)}
.btn.outlined{background:transparent;border:1px solid var(--outline);color:var(--primary)}
.btn.tonal{background:var(--secondary-container);color:var(--on-secondary-container)}
.btn.text{background:transparent;color:var(--primary);padding:0 12px}
.btn.inv{color:var(--inverse-primary);min-height:32px}
/* stepper */
.stepper{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:500}
.st{display:flex;align-items:center;gap:6px;white-space:nowrap;color:var(--on-surface-variant)}
.st i{font-style:normal;width:24px;height:24px;border-radius:50%;display:grid;place-items:center;font-size:12px;background:var(--surface-container-highest);color:var(--on-surface-variant)}
.st.done,.st.on{color:var(--on-surface)}.st.done i,.st.on i{background:var(--primary);color:var(--on-primary)}
.ln{flex:1;height:1px;background:var(--outline-variant);min-width:12px}
/* accordion */
.acc{padding:0;overflow:hidden}
.ai+.ai{border-top:1px solid var(--outline-variant)}
.ah{width:100%;border:0;background:transparent;display:flex;justify-content:space-between;align-items:center;padding:0 16px;min-height:48px;font-weight:500;text-align:left}
.ah span{color:var(--on-surface-variant);font-size:20px;line-height:1}
.ai p{padding:0 16px 14px;color:var(--on-surface-variant);font-size:12px}
.ai.dis{background:var(--surface-container)}.ai.dis .ah{color:color-mix(in srgb,var(--on-surface) 38%,transparent);cursor:not-allowed}
/* alert */
.alert{background:var(--primary-container);color:var(--on-primary-container);border-radius:12px;padding:12px 14px;font-weight:500;display:flex;gap:10px;align-items:center}
.alert b{width:22px;height:22px;border-radius:50%;background:var(--primary);color:var(--on-primary);display:grid;place-items:center;font-size:12px}
/* toggles */
.toggles{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}
.switch{display:inline-flex;cursor:pointer}
.switch input{position:absolute;opacity:0;width:1px;height:1px}
.switch .track{width:52px;height:32px;border-radius:999px;border:2px solid var(--outline);background:var(--surface-container-highest);position:relative;transition:background .2s}
.thumb{position:absolute;top:50%;left:6px;width:16px;height:16px;border-radius:50%;background:var(--outline);transform:translateY(-50%);transition:left .2s cubic-bezier(.2,0,0,1),width .2s,height .2s}
.switch input:checked+.track{background:var(--primary);border-color:var(--primary)}
.switch input:checked+.track .thumb{left:24px;width:24px;height:24px;background:var(--on-primary)}
.switch input:focus-visible+.track{outline:2px solid var(--primary);outline-offset:2px}
.cb{width:22px;height:22px;accent-color:var(--primary);margin:0 4px}
.tgl{display:inline-flex;border:1px solid var(--outline);border-radius:8px;overflow:hidden}
.tgl button{border:0;background:transparent;width:40px;height:40px;color:var(--on-surface-variant);font-size:20px}
.tgl button+button{border-left:1px solid var(--outline)}
.tgl button[aria-pressed=true]{background:var(--secondary-container);color:var(--on-secondary-container)}
/* icon tabs */
.itabs{display:grid;grid-template-columns:repeat(3,1fr);padding:0;overflow:hidden}
.itabs button{border:0;background:transparent;display:flex;flex-direction:column;align-items:center;gap:2px;padding:10px 0 8px;min-height:60px;font-size:12px;font-weight:500;letter-spacing:.04em;text-transform:uppercase;color:var(--on-surface-variant);border-bottom:3px solid transparent}
.itabs button span{font-size:24px;line-height:1}
.itabs button[aria-selected=true]{color:var(--primary);border-bottom-color:var(--primary)}
/* range */
.range{display:flex;flex-direction:column;gap:12px}
.rs{position:relative;height:24px}
.rs .rail,.rs .fill{position:absolute;top:50%;height:6px;transform:translateY(-50%);border-radius:999px}
.rs .rail{left:0;right:0;background:var(--secondary-container)}
.rs .fill{background:var(--primary)}
.knob{position:absolute;top:50%;width:22px;height:22px;border-radius:50%;background:var(--primary);border:3px solid var(--surface);transform:translate(-50%,-50%);box-shadow:0 1px 3px rgba(0,0,0,.25)}
.ticks{font-size:12px;color:var(--on-surface-variant)}
/* outlined fields */
.ofld{position:relative;display:flex;flex-direction:column;gap:4px}
.ofld span{position:absolute;top:-8px;left:12px;padding:0 4px;background:var(--surface-container-low);font-size:12px;font-weight:500;color:var(--on-surface-variant)}
.ofld input{font:inherit;font-size:16px;color:var(--on-surface);background:transparent;border:1px solid var(--outline);border-radius:8px;padding:0 14px;min-height:52px}
.ofld input:focus{outline:none;border:2px solid var(--primary);padding:0 12px}
.ofld:focus-within span{color:var(--primary)}
.ofld.err input{border:2px solid var(--error);padding:0 12px}.ofld.err span{color:var(--error)}
.ofld.err input:focus{border-width:3px;padding:0 11px}
.ofld small{color:var(--error);font-size:12px;font-weight:500;padding-left:14px}
/* minis */
.three{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.mini{display:grid;place-items:center;min-height:64px;padding:8px}
.bell{position:relative;display:inline-grid;color:var(--on-surface-variant)}
.bell i{position:absolute;top:-6px;right:-10px;font-style:normal;min-width:18px;height:18px;padding:0 4px;border-radius:999px;background:var(--error);color:var(--on-error);font-size:11px;font-weight:500;display:grid;place-items:center}
.step{display:inline-flex;align-items:center;border:1px solid var(--outline);border-radius:8px;overflow:hidden}
.step button{border:0;background:transparent;width:36px;height:36px;color:var(--primary);font-size:20px}
.step b{min-width:28px;text-align:center;border-left:1px solid var(--outline);border-right:1px solid var(--outline);line-height:36px}
.stars{color:var(--warning);font-size:16px;letter-spacing:0;white-space:nowrap}
.stars .half{background:linear-gradient(90deg,var(--warning) 50%,var(--outline) 50%);-webkit-background-clip:text;background-clip:text;color:transparent}
.stars .off{color:var(--outline)}
/* media */
.media{padding:0;overflow:hidden}
.mh{display:flex;align-items:center;gap:10px;padding:12px 12px 10px}
.mh div{flex:1;display:flex;flex-direction:column}.mh small{font-size:12px;color:var(--on-surface-variant)}
.art{display:block;width:100%;height:110px;background:var(--surface-container)}
.ctrl{padding:10px 12px}
.play{width:48px;height:48px;border-radius:12px;border:0;background:var(--primary);color:var(--on-primary);font-size:20px}
.snack{background:var(--inverse-surface);color:var(--inverse-on-surface);border-radius:8px;padding:2px 2px 2px 12px;font-size:12px;display:flex;align-items:center;gap:4px}
.snack :focus-visible{outline-color:var(--inverse-primary)}
@media (max-width:1100px){.bento{grid-template-columns:1fr 1fr}.strip{grid-template-columns:repeat(9,1fr)}}
@media (max-width:720px){.bento{grid-template-columns:1fr}.strip{grid-template-columns:repeat(5,1fr)}}
@media (max-width:360px){.three{grid-template-columns:1fr 1fr}.three>:last-child{grid-column:span 2}.stepper{gap:4px}.stepper .ln{display:none}.stepper{justify-content:space-between}}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
"""

SCRIPT = r"""
const PALETTES = __PALETTES__;
const SWATCHES = __SWATCHES__;
let cur = 0, theme = 'light';
const root = document.documentElement;
function lum(h) { const c = [1,3,5].map(i => parseInt(h.slice(i, i+2), 16) / 255).map(x => x <= .04045 ? x/12.92 : ((x+.055)/1.055) ** 2.4); return .2126*c[0] + .7152*c[1] + .0722*c[2]; }
function cr(a, b) { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); }

function apply() {
  const p = PALETTES[cur], s = p[theme];
  for (const [k, v] of Object.entries(s)) root.style.setProperty('--' + k, v);
  root.style.colorScheme = theme;
  document.querySelectorAll('[data-pal]').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.pal === cur)));
  document.querySelectorAll('[data-theme-btn]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.themeBtn === theme)));
  const total = p.checks ? p.checks.total : 0, failed = p.checks ? p.checks.failed.length : 0;
  document.getElementById('meta').textContent = `${p.seed.hex} · ${p.variant}` +
    (p.fidelity_role ? ` · exact brand as ${p.fidelity_role}` : '') +
    (total ? ` · ${total - failed}/${total} pairs pass WCAG` : '');
  strip(s); pattern(p.seed.hex);
}

function strip(s) {
  const el = document.getElementById('swatches'); el.innerHTML = '';
  for (const r of SWATCHES) {
    if (!s[r]) continue;
    const b = document.createElement('button'); b.type = 'button'; b.className = 'sw';
    b.style.background = s[r];
    const txt = cr('#000000', s[r]) >= cr('#ffffff', s[r]) ? '#000000' : '#ffffff';
    b.style.color = txt;
    if (cr(s[r], s['surface-container-low']) < 1.3) b.classList.add('edge');
    b.innerHTML = `<span class="n">${r}</span><span class="h">${s[r]}</span>`;
    b.title = r + ' ' + s[r] + ' (click to copy)';
    b.onclick = () => { navigator.clipboard && navigator.clipboard.writeText(s[r]); const h = b.querySelector('.h'); h.textContent = 'copied'; setTimeout(() => h.textContent = s[r], 900); };
    el.append(b);
  }
}

function rng(seed) { let x = parseInt(seed.slice(1), 16) || 1; return () => (x = (x * 1103515245 + 12345) % 2147483648) / 2147483648; }
function pattern(seedHex) {
  const svg = document.getElementById('pattern'); if (!svg) return;
  const r = rng(seedHex), S = 40, cols = 8, rows = 3;
  const fills = ['var(--primary)', 'var(--tertiary)', 'var(--primary-container)', 'var(--secondary-container)',
                 'var(--tertiary-container)', 'var(--chart-2)', 'var(--chart-3)', 'var(--surface-container-high)'];
  const pick = () => fills[Math.floor(r() * fills.length)];
  let out = '';
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const X = x * S, Y = y * S, bg = pick(); let fg = pick(); if (fg === bg) fg = fills[(fills.indexOf(bg) + 3) % fills.length];
    out += `<rect x="${X}" y="${Y}" width="${S}" height="${S}" fill="${bg}"/>`;
    const t = Math.floor(r() * 5), c = Math.floor(r() * 4);
    if (t === 0) out += `<path d="M${X + (c % 2) * S} ${Y + (c > 1 ? S : 0)} m0 0 ${c % 2 ? 'h' + -S : 'h' + S} a${S} ${S} 0 0 ${c === 1 || c === 2 ? 0 : 1} ${c % 2 ? S : -S} ${c > 1 ? -S : S} z" fill="${fg}"/>`;
    else if (t === 1) out += `<circle cx="${X + S/2}" cy="${Y + S/2}" r="${S/3}" fill="${fg}"/>`;
    else if (t === 2) out += `<path d="M${X} ${Y + S} L${X + S} ${Y + S} L${X + (c % 2 ? S : 0)} ${Y} Z" fill="${fg}"/>`;
    else if (t === 3) out += `<path d="M${X} ${Y + S/2} A${S/2} ${S/2} 0 0 1 ${X + S} ${Y + S/2} Z" fill="${fg}"/>`;
    else out += `<rect x="${X + S/4}" y="${Y + S/4}" width="${S/2}" height="${S/2}" rx="4" fill="${fg}"/>`;
  }
  svg.innerHTML = out;
}

function calendar() {
  const now = new Date(), y = now.getFullYear(), m = now.getMonth(), today = now.getDate();
  document.getElementById('calmonth').textContent = now.toLocaleString('en', { month: 'long', year: 'numeric' });
  const g = document.getElementById('calgrid');
  g.innerHTML = ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => `<span class="dh">${d}</span>`).join('');
  const first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate();
  const a = Math.min(today + 3, days - 3), b = Math.min(a + 3, days);
  for (let i = 0; i < first; i++) g.insertAdjacentHTML('beforeend', '<span></span>');
  for (let d = 1; d <= days; d++) {
    const cls = d === a || d === b ? 'sel' : (d > a && d < b ? 'inr' : (d === today ? 'today' : ''));
    g.insertAdjacentHTML('beforeend', `<button class="d ${cls}" aria-label="Day ${d}">${d}</button>`);
  }
}

const pals = document.getElementById('pals');
PALETTES.forEach((p, i) => {
  const b = document.createElement('button'); b.type = 'button'; b.dataset.pal = i;
  b.textContent = String.fromCharCode(65 + i) + '. ' + p.name; b.onclick = () => { cur = i; apply(); }; pals.append(b);
});
document.querySelectorAll('[data-theme-btn]').forEach(b => b.onclick = () => { theme = b.dataset.themeBtn; apply(); });
document.querySelectorAll('[role=tablist]').forEach(l => l.querySelectorAll('[role=tab]').forEach(t => t.onclick = () => l.querySelectorAll('[role=tab]').forEach(o => o.setAttribute('aria-selected', String(o === t)))));
document.querySelectorAll('.tgl button').forEach(t => t.onclick = () => t.parentElement.querySelectorAll('button').forEach(o => o.setAttribute('aria-pressed', String(o === t))));
document.querySelectorAll('.ah:not([disabled])').forEach(h => h.onclick = () => { const it = h.parentElement, open = it.classList.toggle('open'); h.setAttribute('aria-expanded', String(open)); let p = it.querySelector('p'); if (open && !p) { p = document.createElement('p'); p.textContent = 'Shared tokens: spacing, radius, type scale and motion, set once for the whole app.'; it.append(p); } if (p) p.hidden = !open; h.querySelector('span').innerHTML = open ? '&#8963;' : '&#8964;'; });
const st = document.querySelector('.step b');
document.querySelectorAll('.step button').forEach((b, i) => b.onclick = () => { st.textContent = Math.max(0, +st.textContent + (i ? 1 : -1)); });
calendar();
const h = new URLSearchParams(location.hash.slice(1));
cur = Math.min(+(h.get('p') || 0), PALETTES.length - 1); theme = h.get('t') === 'dark' ? 'dark' : 'light';
apply();
"""


def main():
    ap = argparse.ArgumentParser(description="Preview palettes as a component sheet.")
    ap.add_argument("palettes", nargs="+", help="palette JSON files from palette.py generate --out")
    ap.add_argument("--out", required=True)
    ap.add_argument("--title", default="Palette preview")
    ap.add_argument("--png", help="base path for screenshots, one per palette and theme")
    ap.add_argument("--open", action="store_true", help="open the page in the default browser (no extra install)")
    a = ap.parse_args()

    pals = []
    for p in a.palettes:
        with open(p, encoding="utf-8") as fh:
            d = json.load(fh)
        pals.append({k: d.get(k) for k in ("name", "variant", "seed", "light", "dark", "checks", "notes", "fidelity_role")})

    script = SCRIPT.replace("__PALETTES__", json.dumps(pals)).replace("__SWATCHES__", json.dumps(SWATCHES))
    page = ("<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\">"
            "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">"
            f"<title>{html.escape(a.title)}</title><style>{CSS}</style></head><body>"
            + BODY.replace("__TITLE__", html.escape(a.title))
            + f"<script>{script}</script></body></html>")
    with open(a.out, "w", encoding="utf-8") as fh:
        fh.write(page)
    print(f"Wrote {a.out} ({len(pals)} palette{'s' if len(pals) > 1 else ''}).")
    if a.open:
        import webbrowser
        opened = webbrowser.open("file://" + os.path.abspath(a.out))
        print("Opened in the default browser." if opened else "Could not open a browser here; open the file yourself.")

    if a.png:
        try:
            from playwright.sync_api import sync_playwright
        except ImportError:
            sys.exit("--png needs Python Playwright: pip install playwright && playwright install chromium")
        url = "file://" + os.path.abspath(a.out)
        base, ext = os.path.splitext(a.png)
        ext = ext or ".png"
        shots = []
        with sync_playwright() as p:
            br = p.chromium.launch()
            pg = br.new_page(viewport={"width": 1400, "height": 900}, device_scale_factor=2)
            for i in range(len(pals)):
                for t in ("light", "dark"):
                    pg.goto(f"{url}#p={i}&t={t}")
                    pg.reload()
                    pg.wait_for_timeout(150)
                    path = f"{base}-{chr(97 + i)}-{t}{ext}"
                    pg.screenshot(path=path, full_page=True)
                    shots.append(path)
            br.close()
        print("Wrote " + ", ".join(shots))


if __name__ == "__main__":
    main()
