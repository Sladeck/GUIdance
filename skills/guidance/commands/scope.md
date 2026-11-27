# Scope

Used by `/guidance review` (step 1) and `/guidance wcag` (step 1).

| Target | What is reviewed |
| --- | --- |
| nothing | the files changed in the working tree (version control) |
| a file, folder or component | that code |
| a page: route (`/settings`), page file or description | the code behind that page: its template, styles and the components it uses |

With no changes and no target, ask what to review.

In a native app (Expo or React Native, SwiftUI, Compose, Flutter), whatever the target, also read where orientation is set for the whole app (rule 13.1 lists the config files and code calls): a lock there applies to every screen. Skip this when reviewing uncommitted changes that touch none of those files. If they are not in the working directory, say 13.1 needs checking by hand and name the file to open.
