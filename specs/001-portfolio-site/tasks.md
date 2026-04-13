---
description: "Task list for Personal Portfolio Site implementation"
---

# Tasks: Personal Portfolio Site

**Input**: Design documents from `specs/001-portfolio-site/`
**Prerequisites**: plan.md ✅ | spec.md ✅ | data-model.md ✅ | contracts/ ✅ | research.md ✅ | quickstart.md ✅

**Tests**: Not requested in spec — no test tasks generated.

**Organization**: Tasks are grouped by user story to enable independent implementation
and testing of each story. Each story phase delivers a complete, independently testable
increment.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US4)
- File paths are relative to repository root

---

## Phase 1: Setup

**Purpose**: Project initialization and tooling configuration

- [x] T001 Initialize Astro 4.x project at repository root using pnpm (`pnpm create astro@latest .` — select "empty" template, enable TypeScript strict mode)
- [x] T002 Install and configure Tailwind CSS v3 (`@astrojs/tailwind` integration) — run `pnpm astro add tailwind`
- [x] T003 [P] Install Astro Icon and Iconify (`astro-icon`, `@iconify-json/mdi` or `@iconify-json/ph`) for SVG icons
- [x] T004 [P] Configure `astro.config.mjs` — set `site: 'https://obadadeg.github.io'`, add tailwind integration, set `markdown.shikiConfig.theme: 'github-dark-dimmed'`
- [x] T005 [P] Configure `tailwind.config.mjs` — extend `theme.fontFamily` with `syne: ['Syne', 'sans-serif']` and `mono: ['IBM Plex Mono', 'monospace']`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared infrastructure that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Create `src/styles/global.css` — declare all 7 CSS custom properties (`--color-bg: #0a0a0f`, `--color-surface: #111118`, `--color-border: #1e1e2e`, `--color-text: #e2e2e8`, `--color-muted: #6b6b80`, `--color-accent: #7efff5`, `--color-accent-dim: #7efff520`), custom scrollbar (thin, accent-colored via `::-webkit-scrollbar`), base body font reset (`font-family: 'IBM Plex Mono'`), and heading font (`font-family: 'Syne'`)
- [x] T007 Create `src/content/config.ts` — define 3 Content Collections with Zod schemas exactly as specified in `specs/001-portfolio-site/contracts/content-schema.md`: `projects` (title, description max-280, tech min-1, github URL, demo URL optional, featured bool, date), `writeups` (title, ctf, category enum 6 values, difficulty enum 3 values, date, tags default[], excerpt max-280), `blog` (title, date, tags default[], excerpt max-280)
- [x] T008 [P] Create `src/components/TagPill.astro` — accepts props `label: string` and optional `href?: string`; renders accent-styled pill as `<a href={href}>` when href provided or `<span>` when absent; use `--color-accent-dim` background and `--color-accent` text
- [x] T009 [P] Create `src/components/Footer.astro` — one-line minimal footer: "Built by Obada Daghlas · GitHub ↗ · © 2026"; GitHub link opens `target="_blank"` with `↗` icon
- [x] T010 Create `src/components/Nav.astro` — sticky top nav with 1px bottom border in `--color-border`; desktop: "Obada Daghlas" logo-link left, nav links right (Projects, Writeups, Blog, Contact, Resume ↗); mobile: CSS-only hamburger using hidden `<input type="checkbox">` + `<label>` toggle (no JavaScript); active page highlighted with `--color-accent`; aria-label on hamburger button
- [x] T011 Create `src/layouts/Base.astro` — `<head>` with charset, viewport, title/description props, Google Fonts preconnect + stylesheet for Syne (400,600,700) and IBM Plex Mono (400,500), favicon link, ViewTransitions component; renders Nav + `<slot />` + Footer; applies global.css
- [x] T012 Create `src/layouts/Page.astro` — wraps Base.astro; constrains content to `max-w-[1100px]` centered with horizontal padding; accepts title and description props
- [x] T013 Create `src/layouts/Post.astro` — wraps Base.astro; constrains prose to `max-w-[768px]` centered; accepts `title`, `description`, and `headings` props (type: `{ depth: number; slug: string; text: string }[]`); renders `headings` filtered to depth 2 as a sticky Table of Contents `<nav>` alongside main content; adds "← Back" link at top
- [x] T014 Create `.github/workflows/deploy.yml` — GitHub Actions workflow per `specs/001-portfolio-site/quickstart.md`: trigger on push to `main` + `workflow_dispatch`; permissions `contents:read, pages:write, id-token:write`; `build` job: `actions/checkout@v4`, `pnpm/action-setup@v3` (version 8), `actions/setup-node@v4` (node 20, cache pnpm), `pnpm install`, `pnpm build`, `actions/upload-pages-artifact@v3` (path: dist); `deploy` job: environment `github-pages`, `actions/deploy-pages@v4`

**Checkpoint**: Foundation complete — all user story phases can now begin

---

## Phase 3: User Story 1 — Recruiter Evaluates Candidate (Priority: P1) 🎯 MVP

**Goal**: Home page conveys Obada's identity, skills, and featured work at a glance.
Projects page lists all projects. Contact page has contact info.

**Independent Test**: Open home page → see Obada's full name, title "Software Engineer · Security Researcher", bio, and GitHub CTA above the fold at 1440px. Navigate Projects → see 3 project cards each with tech tags and GitHub link. Navigate Contact → see email, GitHub, LinkedIn, and Resume link without any form.

### Implementation for User Story 1

- [x] T015 [P] [US1] Create 3 seed project Markdown files in `src/content/projects/` — use Obada's real projects: `pipeline-orchestrator.md` (title: "Pipeline Orchestrator", description: webhook-driven task processing, tech: TypeScript/Node.js/BullMQ/Redis/PostgreSQL/Docker, github: placeholder URL, featured: true, date: 2026-01-15), `chirpy-api.md` (Chirpy API, JWT auth REST API, TypeScript/Express/PostgreSQL/Drizzle ORM, featured: true), `blog-aggregator.md` (BlogAggregator CLI, TypeScript/PostgreSQL/Drizzle ORM, featured: true) — add 1-paragraph body to each
- [x] T016 [P] [US1] Create `src/components/ProjectCard.astro` — props: `{ title, description, tech: string[], github, demo?: string, featured?: boolean }`; renders: bold name, description (1-2 lines clamped), tech TagPill components (one per tech item), "↗ GitHub" link (`target="_blank"`), optional "↗ Demo" link, optional "Featured" badge with accent color; card background `--color-surface`, 1px border `--color-border`
- [x] T017 [US1] Create `src/pages/projects.astro` — uses Page.astro layout (title: "Projects"); queries `getCollection('projects')` sorted by `date` descending; renders 2-column CSS grid on desktop (`grid-cols-2`), 1-column on mobile; maps each entry to ProjectCard with all props spread from `data`
- [x] T018 [US1] Create `src/pages/contact.astro` — uses Page.astro layout (title: "Contact"); renders: short intro line from spec ("I'm open to internship opportunities, collaborations, and interesting conversations."); GitHub link (`https://github.com/obadaDeg`), email as text (`obada [at] example [dot] com` — placeholder), LinkedIn placeholder, note about CTF collaboration via GitHub; Resume ↗ link placeholder (`#`); all external links `target="_blank"` with ↗ icon; no form element
- [x] T019 [US1] Create `src/pages/404.astro` — uses Base.astro layout (title: "404 — Page Not Found"); centered content: "404", "This page doesn't exist.", link back to home `← Back to Home`; styled in `--color-muted` with accent home link
- [x] T020 [US1] Create `src/pages/index.astro` — uses Page.astro layout (title: "Obada Daghlas"); sections in order: (1) Hero: asymmetric layout — name "Obada Daghlas" large left using Syne display size, right column: subtitle "Software Engineer · Security Researcher" + 3-line bio + GitHub CTA button; static terminal `<pre>` block with `> whoami` / `> cat interests.txt` styled in `--color-surface` with accent `>` decorator — NOT animated; (2) Featured Projects: query `getCollection('projects')` filter `featured: true` limit 3, render ProjectCard grid; (3) Recent Writeups: query `getCollection('writeups')` sort date desc limit 3, render WriteupCard (component created in US2 — import may be stubbed or use simple link list if US2 not yet complete); (4) Recent Blog Posts: query `getCollection('blog')` sort date desc limit 2, render BlogCard (stub if US3 not yet done); each section has generous vertical spacing and subtle section separator

**Checkpoint**: US1 complete — recruiter flow is independently functional and testable

---

## Phase 4: User Story 2 — CTF Community Member Reads a Writeup (Priority: P2)

**Goal**: Writeups listing, category filter navigation, and individual writeup pages with
metadata header, Table of Contents, syntax-highlighted code, and copy button all work.

**Independent Test**: Visit `/writeups` → see listing with CTF name, category, difficulty. Click "Web" category tag → only Web writeups shown at `/writeups/category/web`. Click a writeup → see metadata block (CTF/category/difficulty/date), Table of Contents from `##` headings, code block with Shiki highlighting and a copy button that copies to clipboard.

### Implementation for User Story 2

- [x] T021 [P] [US2] Create 1 seed writeup Markdown file `src/content/writeups/example-ctf.md` — frontmatter: title "JWT Algorithm Confusion", ctf "PicoCTF 2025", category "Web", difficulty "Medium", date 2025-03-10, tags ["jwt", "web"], excerpt per schema; body MUST include at least 3 `##` headings (Introduction, Exploitation, Conclusion) and 1 fenced code block with a language tag for Shiki to highlight
- [x] T022 [P] [US2] Create `src/components/WriteupCard.astro` — props: `{ title, ctf, category, difficulty, date: Date, slug: string }`; renders: challenge name as `<a href="/writeups/{slug}">`, CTF name in `--color-muted`, category TagPill (href: `/writeups/category/{category.toLowerCase()}`), difficulty TagPill (static, no href), formatted date; 1px border card or list-item style
- [x] T023 [P] [US2] Create `src/components/CopyButton.astro` — `client:load` island; on mount, queries all `<pre>` elements within the `.prose` content wrapper and appends a copy `<button>` to each; on button click, reads `pre.textContent`, calls `navigator.clipboard.writeText()`, changes button label to "Copied!" for 2 seconds then reverts; button positioned absolutely top-right of `<pre>` using CSS; styled with `--color-accent` on hover
- [x] T024 [US2] Create `src/pages/writeups/index.astro` — uses Page.astro layout (title: "Writeups"); queries `getCollection('writeups')` sorted by date descending; renders category filter tag links at top (Web, Pwn, Crypto, Forensics, Misc, OSINT — each linking to `/writeups/category/{name.toLowerCase()}`); renders list (single column, not grid) of WriteupCard components; shows `<p>No writeups yet — check back soon.</p>` when collection is empty
- [x] T025 [US2] Create `src/pages/writeups/[...slug].astro` — implements `getStaticPaths()` using `getCollection('writeups')`; for each entry: calls `entry.render()` to get `Content` and `headings`; renders with Post.astro layout passing `headings` for ToC; renders metadata header block above content (CTF name, category TagPill, difficulty TagPill, formatted date) in `--color-surface` card style; renders `<Content />` in prose wrapper class; renders `<CopyButton />` after content; adds "← All Writeups" back link at top
- [x] T026 [US2] Create `src/pages/writeups/category/[category].astro` — implements `getStaticPaths()` returning all 6 category paths (`web`, `pwn`, `crypto`, `forensics`, `misc`, `osint`) with params; filters `getCollection('writeups')` by matching category (case-insensitive); uses Page.astro layout (title: "{Category} Writeups"); renders same filter tag links as index plus heading showing active category; renders filtered WriteupCard list; links back to `/writeups`

**Checkpoint**: US2 complete — CTF reader flow is independently functional and testable

---

## Phase 5: User Story 3 — Blog Reader Reads a Technical Post (Priority: P3)

**Goal**: Blog listing and individual blog post pages with full markdown rendering.

**Independent Test**: Visit `/blog` → see listing with title, date, tags, excerpt. Click a post → full content renders: headings, lists, code blocks with syntax highlighting and copy button, blockquotes.

### Implementation for User Story 3

- [x] T027 [P] [US3] Create 1 seed blog post `src/content/blog/example-post.md` — frontmatter: title "Setting Up a Secure Home Lab on a Budget", date 2025-11-20, tags ["homelab", "linux", "security"], excerpt per schema; body MUST include `##` headings, a code block (bash commands), a blockquote, and a bullet list to demonstrate full markdown rendering
- [x] T028 [P] [US3] Create `src/components/BlogCard.astro` — props: `{ title, date: Date, tags: string[], excerpt, slug: string }`; renders: post title as `<a href="/blog/{slug}">`, formatted date in `--color-muted`, tag TagPills (static, no category filter for blog), excerpt text; consistent card/list-item style with WriteupCard
- [x] T029 [US3] Create `src/pages/blog/index.astro` — uses Page.astro layout (title: "Blog"); queries `getCollection('blog')` sorted by date descending; renders list of BlogCard components; shows `<p>No posts yet — check back soon.</p>` when empty
- [x] T030 [US3] Create `src/pages/blog/[...slug].astro` — implements `getStaticPaths()` using `getCollection('blog')`; calls `entry.render()` for `Content` and `headings`; renders with Post.astro layout passing `headings`; renders `<Content />` in prose wrapper; renders `<CopyButton />` after content; adds "← All Posts" back link at top

**Checkpoint**: US3 complete — blog reader flow is independently functional and testable

---

## Phase 6: User Story 4 — Content Author Publishes New Content (Priority: P4)

**Goal**: Deployment pipeline is confirmed working end-to-end; favicon is in place.

**Independent Test**: Push a commit adding a 2nd writeup file to `main` → GitHub Actions "Deploy to GitHub Pages" workflow runs and completes → new writeup appears at its URL on `https://obadadeg.github.io` within 5 minutes.

### Implementation for User Story 4

- [x] T031 [US4] Create `public/favicon.svg` — SVG monogram "OD" using accent color `#7efff5` on transparent background; reference in Base.astro `<head>` as `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`; keep design minimal (letters in Syne-style geometric font or simple sans-serif)
- [x] T032 [US4] Verify deployment configuration — confirm `astro.config.mjs` has `site: 'https://obadadeg.github.io'` with no `base` path (root deployment); confirm `.github/workflows/deploy.yml` matches requirements exactly (pnpm 8, Node.js 20, correct permissions, correct artifact path `dist`); confirm GitHub Pages is set to "GitHub Actions" source in repository settings

**Checkpoint**: US4 complete — authoring and deployment workflow confirmed end-to-end

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Quality gates and final verification across all user stories

- [x] T033 Run `pnpm build` from repository root — MUST complete with zero errors and zero warnings; fix any TypeScript type errors, missing content schema fields, or broken imports before proceeding
- [x] T034 [P] Visual verification at 375px width — open dev server (`pnpm dev`), resize browser to 375px; check all 6 pages (Home, Projects, Writeups, Writeups category filter, Blog, Contact) for: no horizontal overflow, hamburger menu opens/closes, no overlapping text or elements
- [x] T035 [P] Visual verification at 1440px width — verify all pages respect max-width constraints (prose at 768px, layout at 1100px), consistent spacing, no layout gaps or misaligned components
- [x] T036 [P] Audit all internal navigation links — click every link in Nav (Home, Projects, Writeups, Blog, Contact), every "← Back" link in Post layout, every category filter link; confirm all resolve without 404
- [x] T037 Verify Shiki syntax highlighting — open the seed writeup and seed blog post in browser; confirm code blocks render with colored tokens (not plain text); check that language tag is detected correctly
- [x] T038 Verify CopyButton — click the copy button on a code block in a writeup page; paste into a text editor; confirm the exact code text is copied; confirm "Copied!" feedback appears and reverts
- [x] T039 [P] Verify page transitions — navigate between pages using the nav links; confirm a subtle opacity fade animation plays; confirm no flash of unstyled content or layout jump
- [x] T040 [P] Verify accent color usage — audit the entire site: confirm `--color-accent` appears ONLY on active nav link, link hover states, TagPill components, and terminal `>` decorator; no other elements use the cyan color

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Foundational — can start immediately after Phase 2
- **US2 (Phase 4)**: Depends on Foundational — can start after Phase 2 (parallel with US1)
- **US3 (Phase 5)**: Depends on Foundational — can start after Phase 2 (parallel with US1, US2)
- **US4 (Phase 6)**: Depends on Phase 2 (deploy.yml is already created in T014)
- **Polish (Phase 7)**: Depends on all prior phases complete

### User Story Dependencies

- **US1**: No dependencies on other user stories (home page stubs WriteupCard/BlogCard sections gracefully if empty)
- **US2**: No dependencies on US1 or US3 — independently testable at `/writeups`
- **US3**: No dependencies on US1 or US2 — independently testable at `/blog`
- **US4**: Depends on T014 (deploy.yml created in Foundation)

### Within Each User Story

- Seed content files `[P]` and card components `[P]` run in parallel
- Page files depend on their card components being complete
- Index pages depend on seed content files existing (so Astro has content to query)

### Parallel Opportunities

- T003, T004, T005 can all run in parallel (Phase 1)
- T008, T009 can run in parallel with T010 (Phase 2)
- T015, T016 can run in parallel (Phase 3 setup tasks)
- T021, T022, T023 can all run in parallel (Phase 4 setup tasks)
- T027, T028 can run in parallel (Phase 5 setup tasks)
- T034, T035, T036, T039, T040 can run in parallel (Phase 7)

---

## Implementation Strategy

### MVP First (US1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: US1 (home + projects + contact)
4. **STOP and VALIDATE**: Open home page, verify recruiter flow, run `pnpm build`
5. Push to `main` → first live deployment

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. US1 → home + projects + contact → **MVP live**
3. US2 → writeups with category filter → writeup reader flow live
4. US3 → blog → blog reader flow live
5. US4 + Polish → deployment confirmed, favicon, quality gates
6. Each phase adds value without breaking previous phases

---

## Notes

- `[P]` tasks = different files, no dependencies — safe to implement simultaneously
- `[Story]` label maps task to user story for traceability
- No test tasks generated (not requested in spec)
- All content filenames: lowercase, hyphen-separated, no special characters
- Seed content uses Obada's real projects from his CV — placeholder URLs need updating after actual repos are confirmed
- Home page (T020) references WriteupCard and BlogCard — import these components and render empty sections with "check back soon" messages if Phase 4/5 not yet complete; do not block US1 on US2/US3
