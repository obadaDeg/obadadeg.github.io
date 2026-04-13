# Implementation Plan: Personal Portfolio Site

**Branch**: `001-portfolio-site` | **Date**: 2026-04-13 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/001-portfolio-site/spec.md`

## Summary

Build a fully static personal portfolio and content hub for Obada Daghlas, deployed to
GitHub Pages. The site serves two primary audiences: recruiters assessing his background,
and the CTF/security community reading technical writeups. Content is managed through
Markdown files with typed frontmatter; new content is published by pushing a file to `main`.

The site is a pure static web application: Astro 4.x for static generation, Tailwind CSS v3
for styling, Astro Content Collections for type-safe content schema enforcement, and Shiki
for syntax highlighting. The only client-side JavaScript is a clipboard copy button (Astro
island). GitHub Actions handles CI/CD, deploying `dist/` to GitHub Pages on every `main`
push.

## Technical Context

**Language/Version**: TypeScript (Astro 4.x component model)
**Primary Dependencies**: Astro 4.x, Tailwind CSS v3, Shiki (Astro built-in),
  Astro Icon + Iconify, Astro Content Collections
**Storage**: Markdown files on filesystem (no database); `src/content/projects/`,
  `src/content/writeups/`, `src/content/blog/`
**Testing**: Manual build verification (`pnpm build` — zero errors/warnings),
  visual checks at 375px and 1440px, internal link audit
**Target Platform**: Static web, GitHub Pages (`https://obadadeg.github.io`)
**Project Type**: Static website
**Performance Goals**: All pages load within 3 seconds on broadband;
  build completes with zero errors
**Constraints**: Static-only output — no SSR, no serverless functions, no client-side
  data fetching at page load; pnpm only (no npm/yarn lock files)
**Scale/Scope**: ~6 pages, ~10 seed content items at launch; grows as content is added

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Check | Status |
|-----------|-------|--------|
| I. Code Quality & TypeScript Discipline | Pure Astro/TS components only; Content Collections schema fully typed in `src/content/config.ts`; no React/Vue; CopyButton is the only JS island and is justified (clipboard API requires browser runtime) | ✅ PASS |
| II. Testing & Build Integrity | Plan includes: `pnpm build` zero-error gate before any merge; visual verification at 375px (mobile) and 1440px (desktop); all internal routes audited; Shiki copy button present on all code blocks | ✅ PASS |
| III. User Experience Consistency | Design tokens defined in `src/styles/global.css`; accent color (#7efff5) restricted to active nav, hover states, tag pills, decorators; Syne + IBM Plex Mono only; 768px prose / 1100px layout max-widths enforced; ViewTransitions fade only | ✅ PASS |
| IV. Performance & Deployment Standards | Fully static `dist/` output; GitHub Actions workflow on `main` push; `astro.config.mjs` locks `site: 'https://obadadeg.github.io'`; no tracking scripts or unauthorized external resources | ✅ PASS |

**Gate Result**: All principles satisfied. No complexity violations. No Complexity Tracking needed.

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-site/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   ├── routes.md        # URL route contracts
│   └── content-schema.md # Content Collections schema contracts
└── tasks.md             # Phase 2 output (/speckit.tasks — NOT created here)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── Nav.astro             # Sticky navigation bar (desktop + mobile hamburger)
│   ├── Footer.astro          # Minimal one-line footer
│   ├── ProjectCard.astro     # Card: name, description, tech tags, GitHub link
│   ├── WriteupCard.astro     # Card: CTF name, challenge, category, difficulty, date
│   ├── BlogCard.astro        # Card: title, date, tags, excerpt
│   ├── TagPill.astro         # Reusable styled tag chip
│   └── CopyButton.astro      # client:load island for clipboard copy on code blocks
├── content/
│   ├── config.ts             # Content Collections schema (Zod — fully typed)
│   ├── projects/             # One .md file per project
│   ├── writeups/             # One .md file per CTF writeup
│   └── blog/                 # One .md file per blog post
├── layouts/
│   ├── Base.astro            # <head>, Nav, Footer, ViewTransitions
│   ├── Page.astro            # Standard page wrapper (max-w-[1100px])
│   └── Post.astro            # Prose layout for writeups/blog (max-w-[768px]) + ToC
├── pages/
│   ├── index.astro           # Home: hero + featured projects + recent writeups + recent posts
│   ├── projects.astro        # Projects grid (all projects)
│   ├── writeups/
│   │   ├── index.astro       # Writeups listing (all, newest first)
│   │   ├── [...slug].astro   # Dynamic writeup page
│   │   └── category/
│   │       └── [category].astro  # Category-filtered writeup listing (static)
│   ├── blog/
│   │   ├── index.astro       # Blog listing (all, newest first)
│   │   └── [...slug].astro   # Dynamic blog post page
│   ├── contact.astro         # Contact info (no form)
│   └── 404.astro             # Custom 404 page
└── styles/
    └── global.css            # CSS variables, custom scrollbar, base resets

.github/
└── workflows/
    └── deploy.yml            # GitHub Actions: build + deploy to GitHub Pages

astro.config.mjs              # Astro config: site URL, integrations
tailwind.config.mjs           # Tailwind config: font families, color extensions
</text>

**Structure Decision**: Single static web project at repository root. No backend, no
separate frontend folder. All source under `src/`. Content is data, not code — managed
entirely through Markdown files under `src/content/`.
```

## Complexity Tracking

> No violations — no entries required.
