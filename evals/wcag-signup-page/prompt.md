---
description: A WCAG check of a sign-up page finds failures outside the design rules (language, alt text, label in name, paste blocked, a div used as a button, an unannounced status message), cites the criteria, and does not claim the page conforms.
max_turns: 30
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill]
---

Can you check this sign-up page against WCAG 2.2 AA before we launch?

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sign up</title>
  <style>
    body { font: 16px/1.5 system-ui, sans-serif; color: #1f2328; background: #ffffff; margin: 0; padding: 24px; }
    label { display: block; margin-top: 16px; }
    input { display: block; font: inherit; padding: 8px 12px; min-height: 44px; border: 1px solid #6e7781; border-radius: 8px; }
    button, .primary { font: inherit; min-height: 44px; padding: 0 16px; border-radius: 8px; border: 1px solid #6e7781; background: #ffffff; color: #1f2328; }
    .primary { display: inline-flex; align-items: center; margin-top: 24px; background: #0b57d0; color: #ffffff; border: none; cursor: pointer; }
  </style>
</head>
<body>
  <img src="/logo.png" width="120" height="32">
  <h1>Create your account</h1>
  <form id="signup">
    <label for="email">Email</label>
    <input id="email" type="email" autocomplete="email" required>
    <button type="button" aria-label="Verify">Send code</button>

    <label for="password">Password</label>
    <input id="password" type="password" autocomplete="new-password" required onpaste="return false">

    <div class="primary" onclick="createAccount()">Create account</div>
  </form>
  <div id="message"></div>
  <script>
    function createAccount() {
      document.getElementById('message').textContent = 'Account created. Check your email.';
    }
  </script>
</body>
</html>
```
