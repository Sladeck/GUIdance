---
description: A design review of a small card finds the failing text contrast and the two undersized buttons that touch, and cites rules and sources.
max_turns: 30
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill]
---

Can you check this settings card for design problems before I ship it?

```html
<div class="card" style="padding:24px;border-radius:8px;background:#ffffff">
  <h2 style="font-size:22px;color:#1f2328">Notifications</h2>
  <p style="font-size:14px;color:#999999">Choose which emails you get from us.</p>
  <div style="display:flex;gap:0">
    <button style="width:16px;height:16px;padding:0;border:none" aria-label="Edit">e</button>
    <button style="width:16px;height:16px;padding:0;border:none" aria-label="Close">x</button>
  </div>
</div>
```
