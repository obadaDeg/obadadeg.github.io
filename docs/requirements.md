# Portfolio Website Spec — Obada Daghlas
> Claude Code build spec. Follow every section precisely.

---

## 1. Project Overview

Build a personal portfolio and content hub for **Obada Daghlas**, a software engineering intern and cybersecurity enthusiast. The site serves two audiences simultaneously:

- **Recruiters / hiring managers** — looking for a quick read on skills and projects
- **CTF / security community** — looking for writeups, technical depth, and credibility

The site must feel like it was designed by someone who cares about craft, not generated from a template.

**GitHub handle:** `obadaDeg`  
**Live URL target:** `https://obadadeg.github.io` (GitHub Pages)

---

## 2. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Astro 4.x** | Static output, Markdown-native, fast |
| Styling | **Tailwind CSS v3** | Utility-first, easy dark theme |
| Syntax highlighting | **Shiki** (Astro built-in) | Beautiful code blocks, many themes |
| Markdown | **Astro Content Collections** | Type-safe frontmatter, structured content |
| Icons | **Astro Icon + Iconify** | SVG icons, no extra JS |
| Deployment | **GitHub Pages** via GitHub Actions | Free, automatic on push to `main` |
| Package manager | **pnpm** | Fast, modern |

No React, no Vue, no unnecessary JS. Pure Astro components with TypeScript.

---

## 3. Design System

### 3.1 Aesthetic Direction
**Dark with color accents — refined technical.**

Not a hacker terminal aesthetic. Think: a senior engineer's personal site. Dark backgrounds, precise typography, one strong accent color used sparingly. The design should feel intentional and calm, not loud.

**Mood reference:** dark IDE + technical documentation + subtle editorial layout.

### 3.2 Color Palette
```
--color-bg:          #0a0a0f   (near-black, slightly blue-tinted)
--color-surface:     #111118   (card/section backgrounds)
--color-border:      #1e1e2e   (subtle borders)
--color-text:        #e2e2e8   (primary text)
--color-muted:       #6b6b80   (secondary text, dates, tags)
--color-accent:      #7efff5   (cyan — used for links, highlights, hover states)
--color-accent-dim:  #7efff520 (accent with low opacity, for backgrounds/glows)
```

### 3.3 Typography
- **Display / headings:** `Syne` (Google Fonts) — geometric, technical character
- **Body:** `IBM Plex Mono` — monospace body text gives the site a code-native feel without being a terminal gimmick
- **Code blocks:** inherit IBM Plex Mono, styled via Shiki

Font sizes follow a clean modular scale (text-sm, text-base, text-lg, text-2xl, text-4xl, text-6xl via Tailwind).

### 3.4 Layout Principles
- Max content width: `768px` for prose (writeups/blog), `1100px` for layout
- Generous vertical spacing — sections breathe
- Subtle `1px` borders in `--color-border` to separate sections
- No box shadows — use borders and background contrast instead
- Accent color appears ONLY on: active nav link, links on hover, tag pills, terminal-style decorators (`>_` etc.)
- Grid-breaking element: the hero section should have an asymmetric layout (name large left, short bio + status right)

### 3.5 Micro-details
- Custom scrollbar (thin, accent-colored)
- Page transitions: simple opacity fade via Astro's `<ViewTransitions />`
- Code blocks: Shiki with `github-dark-dimmed` theme, copy button
- All external links open in `_blank` with a small `↗` icon

---

## 4. Site Structure

```
src/
├── components/
│   ├── Nav.astro
│   ├── Footer.astro
│   ├── ProjectCard.astro
│   ├── WriteupCard.astro
│   ├── BlogCard.astro
│   ├── TagPill.astro
│   └── CopyButton.astro        ← client-side JS for code blocks
├── content/
│   ├── config.ts               ← Content Collections schema
│   ├── projects/
│   │   └── example-project.md
│   ├── writeups/
│   │   └── example-ctf.md
│   └── blog/
│       └── example-post.md
├── layouts/
│   ├── Base.astro              ← <head>, nav, footer, ViewTransitions
│   ├── Page.astro              ← standard page wrapper
│   └── Post.astro              ← prose layout for writeups/blog
├── pages/
│   ├── index.astro             ← Hero + featured sections
│   ├── projects.astro          ← All projects
│   ├── writeups/
│   │   ├── index.astro         ← Writeup listing
│   │   └── [...slug].astro     ← Dynamic writeup page
│   ├── blog/
│   │   ├── index.astro         ← Blog listing
│   │   └── [...slug].astro     ← Dynamic blog post page
│   └── contact.astro
└── styles/
    └── global.css              ← CSS variables, scrollbar, base resets
```

---

## 5. Pages & Content

### 5.1 Home (`/`)

**Hero section:**
- Large display: `Obada Daghlas`
- Subtitle line: `Software Engineer · Security Researcher`
- A 2–3 line bio. Use this text:
  > "I build things and break them. Software engineering intern by day, CTF player and security researcher by night. Interested in full-stack development, cloud infrastructure, and web application security."
- GitHub link: `https://github.com/obadaDeg` — prominent CTA button
- A subtle animated terminal-style element showing something like:
  ```
  > whoami
  obada@daghlas ~ software engineer, security researcher
  > cat interests.txt
  fullstack development, penetration testing, CTFs, cloud infra
  ```
  This should be a static styled `<pre>` block, NOT an animated typewriter (avoid cliché).

**Featured Projects:** Show 3 pinned projects (cards, pulled from content collection, `featured: true`)

**Recent Writeups:** Show 3 most recent writeups (cards with CTF name, category tag, date)

**Recent Blog Posts:** Show 2 most recent posts

No separate "Skills" section — skills emerge naturally from projects and content.

---

### 5.2 Projects (`/projects`)

- Grid layout (2 columns desktop, 1 mobile)
- Each project is a `ProjectCard` component
- Cards contain:
  - Project name (bold)
  - Short description (1–2 lines)
  - Tech stack pills (TagPill components)
  - GitHub repo link (`↗ GitHub`)
  - Optional: live demo link
  - Optional: `featured` badge

**Content frontmatter schema:**
```yaml
---
title: "Project Name"
description: "One sentence description"
tech: ["TypeScript", "PostgreSQL", "Docker"]
github: "https://github.com/obadaDeg/repo"
demo: ""           # optional
featured: false
date: 2025-01-01
---
```
Body of the `.md` file = extended description (rendered on project detail page if you want one, but not required at launch — linking to GitHub is enough).

**Seed with 3 placeholder projects** that Obada can fill in.

---

### 5.3 CTF Writeups (`/writeups`)

- List layout (not grid — prose content benefits from single column)
- Each writeup shows: CTF name, challenge name, category tag, difficulty tag, date
- Filterable by category via tag links (Web, Pwn, Crypto, Forensics, Misc) — no JS filtering needed, just tag-based navigation pages
- Clicking a writeup goes to `/writeups/[slug]` — full prose page with Post layout

**Content frontmatter schema:**
```yaml
---
title: "Challenge Name"
ctf: "CTF Event Name"           # e.g. "PicoCTF 2025"
category: "Web"                 # Web | Pwn | Crypto | Forensics | Misc | OSINT
difficulty: "Medium"            # Easy | Medium | Hard
date: 2025-01-01
tags: ["sql-injection", "authentication"]
excerpt: "One sentence summary shown on listing page"
---
```

**Post layout for writeups should include:**
- Back link `← All Writeups`
- Frontmatter header block (CTF, category, difficulty, date) styled like a card
- Auto-generated Table of Contents from `##` headings
- Prose content with excellent code block styling

**Seed with 1 placeholder writeup** showing the format.

---

### 5.4 Blog (`/blog`)

Same structure as writeups but simpler — for broader technical writing (not CTF-specific).

**Content frontmatter schema:**
```yaml
---
title: "Post Title"
date: 2025-01-01
tags: ["devops", "security"]
excerpt: "One sentence summary"
---
```

**Seed with 1 placeholder post.**

---

### 5.5 Contact (`/contact`)

No contact form (no backend). Keep it simple:

- Short line: *"I'm open to internship opportunities, collaborations, and interesting conversations."*
- GitHub: `https://github.com/obadaDeg`
- Email: display as text (Obada will fill in), e.g. `obada [at] example [dot] com`
- LinkedIn: placeholder link (Obada will fill in)
- Optional: note that for security research / CTF collaboration, GitHub is the best place

---

### 5.6 Resume

No dedicated page. Just a nav link labeled `Resume ↗` that links to a PDF. Use `#` as placeholder — Obada will replace with a Google Drive or GitHub-hosted PDF link.

---

## 6. Navigation

**Desktop nav (top, sticky):**
```
Obada Daghlas    Projects   Writeups   Blog   Contact   Resume ↗
```
- `Obada Daghlas` on the left = logo/home link
- Links on the right
- Active link highlighted with accent color
- Subtle `border-bottom: 1px solid --color-border` separator

**Mobile nav:**
- Hamburger menu → slide-in drawer or simple dropdown
- Same links

---

## 7. Footer

Minimal. One line:
```
Built by Obada Daghlas · GitHub ↗ · © 2025
```

---

## 8. GitHub Actions Deployment

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install
      - run: pnpm build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

Also set in `astro.config.mjs`:
```js
export default defineConfig({
  site: 'https://obadadeg.github.io',
  integrations: [tailwind()],
});
```

---

## 9. README

Include a `README.md` at the root with:
- What the site is
- How to run locally (`pnpm install && pnpm dev`)
- How to add content (writeups, projects, blog posts) with frontmatter examples
- How deployment works (push to main → auto deploy)

---

## 10. Quality Checklist

Before finishing, verify:
- [ ] `pnpm build` runs with zero errors
- [ ] All pages render without layout breaks on mobile (375px) and desktop (1440px)
- [ ] Code blocks have syntax highlighting and copy button
- [ ] All internal links work
- [ ] Writeup and blog post pages render Markdown correctly (headings, lists, code, blockquotes)
- [ ] GitHub Actions workflow file is valid YAML
- [ ] No placeholder text left except fields explicitly marked for Obada to fill in (email, LinkedIn, resume PDF link)
- [ ] Favicon set (can be a simple SVG monogram `OD` in accent color)