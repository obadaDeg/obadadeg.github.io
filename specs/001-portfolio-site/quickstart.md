# Quickstart: Personal Portfolio Site

**Branch**: `001-portfolio-site` | **Date**: 2026-04-13

## Prerequisites

- Node.js 20+
- pnpm 8+

## Local Development

```bash
# Install dependencies
pnpm install

# Start dev server (hot reload)
pnpm dev
# → http://localhost:4321
```

## Build & Preview

```bash
# Production build (outputs to dist/)
pnpm build

# Preview production build locally
pnpm preview
# → http://localhost:4321
```

**Build gate**: `pnpm build` must complete with **zero errors and zero warnings**.
Any error is a blocker. Do not merge to `main` with a failing build.

## Adding Content

### Add a Project

1. Create `src/content/projects/<slug>.md`
2. Add required frontmatter (see [content-schema.md](contracts/content-schema.md)):

```markdown
---
title: "Your Project Name"
description: "One or two sentence description of what the project does."
tech: ["TypeScript", "PostgreSQL", "Docker"]
github: "https://github.com/obadaDeg/your-repo"
demo: ""           # optional — remove line if no demo
featured: false    # set true to show on home page (max 3 featured)
date: 2026-01-01
---

Extended project description goes here (rendered on detail page if added later).
```

3. Push to `main` → site deploys automatically (≤5 minutes).

### Add a CTF Writeup

1. Create `src/content/writeups/<slug>.md`
2. Add required frontmatter:

```markdown
---
title: "Challenge Name"
ctf: "CTF Event Name"
category: "Web"          # Web | Pwn | Crypto | Forensics | Misc | OSINT
difficulty: "Medium"     # Easy | Medium | Hard
date: 2026-01-01
tags: ["sql-injection", "authentication"]   # optional
excerpt: "One sentence summary shown on listing page."
---

## Introduction

Your writeup content here. Use `##` headings — they appear in the Table of Contents.

## Reconnaissance

...

## Exploitation

```bash
curl -X POST https://target.ctf/login \
  -d "username=admin' OR 1=1--&password=x"
\```

## Conclusion

...
```

3. Push to `main` → writeup appears at `/writeups/<slug>`.

### Add a Blog Post

1. Create `src/content/blog/<slug>.md`
2. Add required frontmatter:

```markdown
---
title: "Your Post Title"
date: 2026-01-01
tags: ["security", "linux"]   # optional
excerpt: "One sentence summary shown on listing page."
---

## Your Content

Write your post here using standard Markdown.
```

3. Push to `main` → post appears at `/blog/<slug>`.

## Deployment

Deployment is fully automatic:

1. Push any commit to `main`
2. GitHub Actions builds the site (`pnpm build`)
3. Deploys `dist/` to GitHub Pages
4. Live at `https://obadadeg.github.io` within ~3 minutes

To trigger manually: GitHub → Actions → "Deploy to GitHub Pages" → Run workflow.

## Validation Checklist (run before merging to main)

- [ ] `pnpm build` completes with zero errors
- [ ] All pages render without layout breaks at 375px (mobile)
- [ ] All pages render without layout breaks at 1440px (desktop)
- [ ] All internal navigation links resolve correctly
- [ ] Code blocks show syntax highlighting and copy button
- [ ] No unintended placeholder text visible in production
