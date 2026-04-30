---
title: "[Series Title]"
description: "[Short 1-2 sentence description of what this series covers and who it's for.]"
draft: true
items:
  - collection: blog        # Options: blog, writeups, projects
    slug: your-post-slug
  - collection: writeups
    slug: your-writeup-slug
  - collection: projects
    slug: your-project-slug
---

<!--
🤖 AI AGENT INSTRUCTIONS:
When the user asks you to create a new series, use this file as your primary blueprint and template.
The user will provide a theme, a list of related content pieces, and a brief description of the journey.
Your task is to frame the series using the following structure and guidelines:

FRONTMATTER:
- `title`: A concise, evocative name for the series (e.g. "Web Security From Zero", "Building a Pipeline Orchestrator")
- `description`: A 1-2 sentence description. Should tell readers what they'll learn and why the series is valuable.
- `draft`: Keep `true` until the user explicitly asks to publish.
- `items`: An ordered array of content references. Each item must have:
    - `collection`: one of `blog`, `writeups`, or `projects`
    - `slug`: the exact file slug (filename without .md, or directory name for page bundles)

ORDERING:
- Order items to form a logical progression — from foundational to advanced, or chronologically.
- A series can mix content types (blog + writeups + projects) freely.

CROSS-REFERENCING:
- After creating the series file, remind the user to add `series: "this-series-slug"` to the frontmatter
  of each referenced post/writeup/project so the Series Navigator appears on those pages.
- The series slug is the filename of this file (e.g., `web-security-path` for `web-security-path.md`).

OPTIONAL PROSE BODY:
- You may add an introductory paragraph below the frontmatter to describe the series arc in more detail.
- This body text is optional and is not currently rendered on any page, but may be used in the future.

DRAFT BEHAVIOR:
- When `draft: true`, this series is completely invisible to visitors — no listing, no detail page, no navigators.
- Individual items with `draft: true` are excluded from the series navigator counts, even if the series itself is published.
-->

Optional introduction about this series — what the journey looks like, who it's for, and what the reader will take away.
