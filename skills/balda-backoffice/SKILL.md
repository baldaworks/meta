---
name: balda-backoffice
description: Design, implement, or audit Balda Backoffice UI changes using the canonical Stitch screens, then verify the matching QA states with Playwright.
---

# Balda Backoffice

The source of truth for the Backoffice UI is the **Balda · Backoffice** Stitch project, ID `4792710364374043045`. Its screens and design system define layout, copy, component states and responsive behavior. The Go templates implement that design. [Open the project](https://stitch.withgoogle.com/projects/4792710364374043045)

1. Look up the affected route and state with Stitch. Read the current screen, its design system and any relevant variants. The initial import uses QA route paths as screen titles. Record the screen IDs so subsequent edits use the same references.
2. For a design change, correct the screen in Stitch first. Check the resulting preview, including focus, errors, empty states or mobile layout where relevant. Keep unrelated screens intact. For an implementation-only defect, use the current Stitch screen as the reference.
3. Implement the design in a Balda project worktree. Preserve real navigation targets, accessible names, keyboard behavior and server-side authorization. Use the QA gallery with synthetic data and Playwright to compare the affected routes and states to Stitch at desktop and mobile widths. Exercise controls whose state a static preview cannot show.
4. Report the affected routes, canonical Stitch screen IDs and verification results. Treat local HTML and screenshots as comparison artifacts. Reimport an implementation only when explicitly asked to establish a new baseline.
