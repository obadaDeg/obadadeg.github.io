# Implementation Plan: Post Series (Playlists)

**Branch**: `004-post-series-playlists` | **Date**: 2026-04-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/004-post-series-playlists/spec.md`

## Summary

Add a "Series" feature that lets the author group blog posts, CTF writeups, and projects into ordered, navigable playlists. This involves: (1) a new `series` Astro Content Collection, (2) `/series` and `/series/[slug]` static pages, (3) a `SeriesNavigator` Astro component injected into blog, writeup, and project detail pages, and (4) new individual project detail pages at `/projects/[slug]` which are a prerequisite for the navigator on projects. All data is resolved at build time with zero client-side JS.

## Technical Context

**Language/Version**: TypeScript / Astro 4.x
**Primary Dependencies**: Astro Content Collections, `astro:content` (`getCollection`, `getEntry`), Zod schema validation
**Storage**: File-based — `.md` files under `src/content/series/`
**Testing**: `pnpm build` (zero errors/warnings); visual verification at 375px and 1440px
**Target Platform**: GitHub Pages static site
**Project Type**: Static web application (Astro)
**Performance Goals**: All series data resolved at build time — zero runtime requests
**Constraints**: No client-side JS for data fetching; no inline styles; CSS vars only; no React/Vue
**Scale/Scope**: Small personal portfolio — tens of series, tens of posts each at most

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| **I. Code Quality & TypeScript** | ✅ Pass | New `series` collection fully typed in `config.ts`. `SeriesNavigator` is a pure Astro component. All frontmatter fields typed via Zod. No React/Vue. |
| **II. Testing & Build Integrity** | ✅ Pass | Plan includes a `pnpm build` zero-error gate as final verification. All new routes (`/series`, `/series/[slug]`, `/projects/[slug]`) must render at 375px and 1440px. |
| **III. UX Consistency** | ✅ Pass | `SeriesNavigator` uses only `--color-surface`, `--color-border`, `--color-accent`, `--color-text`, `--color-muted` from global CSS. No inline styles. Syne + IBM Plex Mono typography enforced. External links with `↗` indicator. |
| **IV. Performance & Deployment** | ✅ Pass | Fully static — all series lookups are build-time `getCollection()` calls. No serverless functions, no client-side fetching. Output goes directly to `dist/` for GitHub Pages. |

No constitution violations. No complexity justification required.

## Project Structure

### Documentation (this feature)

```text
specs/004-post-series-playlists/
├── plan.md              ← This file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
└── tasks.md             ← Phase 2 output (/speckit-tasks)
```

### Source Code Changes

```text
src/
├── content/
│   ├── config.ts                          MODIFY — add series collection + draft to projects
│   └── series/
│       ├── _template.md                   NEW — AI agent authoring template
│       └── [example-series].md            NEW — example/demo series entry
│
├── pages/
│   ├── series/
│   │   ├── index.astro                    NEW — /series listing page
│   │   └── [slug].astro                   NEW — /series/[slug] detail page
│   └── projects/
│       └── [slug].astro                   NEW — /projects/[slug] detail page
│                                               (converts projects.astro from flat to nested)
│
└── components/
    └── SeriesNavigator.astro              NEW — in-content navigator component

src/pages/
├── projects.astro                         MODIFY — add draft filter; add link to detail page
├── writeups/[...slug].astro               MODIFY — inject SeriesNavigator
└── blog/[...slug].astro                   MODIFY — inject SeriesNavigator

src/content/config.ts                      MODIFY — add draft field to projects schema
```

**Structure Decision**: Single Astro project, extending the existing flat `src/pages/` structure. A new `src/pages/series/` directory handles the two series pages. A new `src/pages/projects/` directory handles individual project pages — the existing `src/pages/projects.astro` remains as the listing page (renamed to `src/pages/projects/index.astro`).

## Complexity Tracking

No constitution violations to justify.

---
