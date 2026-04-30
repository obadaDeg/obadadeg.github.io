# Feature Specification: Post Series (Playlists)

**Feature Branch**: `004-post-series-playlists`
**Created**: 2026-04-30
**Status**: Draft
**Input**: User description: "Add a series feature that lets me group related blog posts and CTF writeups together into an ordered, navigable playlist."

## Clarifications

### Session 2026-04-30

- Q: Which content types can be included in a series? → A: All three — blog posts, CTF writeups, and projects.
- Q: Where should the Series Navigator appear on project pages? → A: At the bottom of the project detail page, same position as on blog posts and writeups.
- Q: Do individual project detail pages currently exist? → A: No — they must be created as part of this feature.
- Q: Should project files support a prose Markdown body? → A: Yes — project files support a full prose body (case study / devlog) rendered on the detail page.
- Q: Should a `draft` field be added to the projects schema? → A: Yes — add `draft: boolean (default false)` to the projects content collection schema.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Browse & Discover Series (Priority: P1)

A visitor arrives at the portfolio and can discover curated series of content from a dedicated `/series` index page. Each series is presented with its title, description, and the number of posts it contains, so the visitor can decide whether to explore the full series.

**Why this priority**: The discovery page is the entry point for all series-related functionality. Without it, the feature has no visible surface area for visitors. It also serves as a useful anchor for sharing "start here" links.

**Independent Test**: Can be fully tested by creating a single published series entry and verifying that `/series` renders a card for it showing the correct title, description, and post count.

**Acceptance Scenarios**:

1. **Given** at least one published series exists, **When** a visitor navigates to `/series`, **Then** they see a list of all published series, each showing title, description, and post count.
2. **Given** a series has `draft: true`, **When** a visitor navigates to `/series`, **Then** that series does NOT appear in the list.
3. **Given** no published series exist, **When** a visitor navigates to `/series`, **Then** they see a friendly empty-state message.

---

### User Story 2 — View a Series Detail Page (Priority: P1)

A visitor clicks into a specific series and sees an ordered table of contents listing every item in that series — with clear visual distinction between blog posts, CTF writeups, and projects — and can navigate directly to any item in the series from that page.

**Why this priority**: The detail page is the "playlist view" that justifies the feature. It lets visitors see the full arc of a series before committing to any individual post.

**Independent Test**: Can be fully tested by creating a series with 2–3 entries and verifying that `/series/[slug]` renders an ordered list with correct titles, types (Blog / Writeup / Project), and working links, without visiting any individual item.

**Acceptance Scenarios**:

1. **Given** a series with three ordered items (one blog post, one writeup, one project), **When** a visitor navigates to `/series/[slug]`, **Then** they see all three listed in the defined order, each with its title, type badge (Blog / Writeup / Project), and a working link.
2. **Given** a post in the series has `draft: true`, **When** the series detail page renders, **Then** that post is excluded from the list and the count adjusts accordingly.
3. **Given** a series with a single post, **When** the series detail page renders, **Then** it shows correctly without breaking navigation or layout.

---

### User Story 3 — In-Post Series Navigator (Priority: P2)

A reader is partway through a series and sees a "Series Navigator" component at the bottom of the post they are currently reading. It tells them which part they are on, shows the series title, and provides previous/next navigation links so they can move through the series without returning to the series index.

**Why this priority**: The navigator is the core UX touchpoint that makes the series feel like a cohesive journey rather than a loose collection of links. It depends on the series collection (US1/US2) being in place but can be built and tested independently on any single post.

**Independent Test**: Can be tested by adding `series: "series-slug"` to a post's frontmatter and confirming the navigator component renders at the bottom with accurate position text ("Part X of Y"), correct series title, and working previous/next links.

**Acceptance Scenarios**:

1. **Given** a post belongs to a series and is not the first item, **When** the post page renders, **Then** a Series Navigator appears at the bottom showing the series title, "Part X of Y", and a working "← Previous" link.
2. **Given** a post belongs to a series and is not the last item, **When** the post page renders, **Then** the navigator shows a working "Next →" link.
3. **Given** a post is the first item in a series, **When** the post page renders, **Then** the "← Previous" link is absent or visually disabled.
4. **Given** a post is the last item in a series, **When** the post page renders, **Then** the "Next →" link is absent or visually disabled.
5. **Given** a post does NOT belong to any series, **When** the post page renders, **Then** no Series Navigator is shown.

---

### User Story 4 — Author Creates a Series (Priority: P1)

As the site author, I can create a new series by adding a single Markdown file to `src/content/series/`, define the series title, description, and ordered list of post slugs in frontmatter, and have the site automatically build all series pages and inject the navigator into referenced posts at build time.

**Why this priority**: The authoring workflow must be simple and co-located with the rest of the content authoring experience. If this is painful, the feature will never be used.

**Independent Test**: Can be tested by creating a minimal series file with two slugs and running `pnpm build`, confirming zero errors and that both the `/series/[slug]` detail page and in-post navigators are generated correctly.

**Acceptance Scenarios**:

1. **Given** a valid series file at `src/content/series/my-series.md`, **When** the site is built, **Then** `/series/my-series` is generated with no errors.
2. **Given** a series file references a non-existent post slug, **When** the site is built, **Then** the build either skips the missing entry gracefully or surfaces a clear warning — it must never silently produce a broken link.
3. **Given** a series file exists with `draft: true`, **When** the site is built, **Then** no `/series/[slug]` page is generated for it.

---

### User Story 5 — View an Individual Project Detail Page (Priority: P1, prerequisite for US3 on projects)

A visitor following a series encounters a project entry. They click through to a dedicated project detail page at `/projects/[slug]` that displays the project’s full information: title, description, tech stack, links (GitHub, demo), and a prose case study rendered from the project’s Markdown body — plus the Series Navigator at the bottom if the project belongs to a series. The prose body is optional; projects without body content still render a valid detail page from their structured metadata.

**Why this priority**: This page is a prerequisite for the Series Navigator appearing on projects at all. Without individual project pages, projects in a series cannot host the navigator UI. The page also benefits the site independently as a richer project showcase.

**Independent Test**: Can be tested by navigating to `/projects/[slug]` for any existing project and verifying it renders the project title, description, tech stack, GitHub link, and (if applicable) Series Navigator, without any series data present.

**Acceptance Scenarios**:

1. **Given** a project entry exists, **When** a visitor navigates to `/projects/[slug]`, **Then** they see a detail page showing title, description, tech stack, and links.
2. **Given** a project belongs to a series, **When** its detail page renders, **Then** the Series Navigator appears at the bottom.
3. **Given** a project does NOT belong to any series, **When** its detail page renders, **Then** no Series Navigator is shown.

---

### Edge Cases

- What happens when a post is referenced in two different series? (Assumption: allowed; navigator shows the first matching series by definition order.)
- What happens when all posts in a series are drafts? (The series detail page renders as empty or is hidden entirely.)
- What happens when the series `posts` array is empty? (The series is excluded from the index listing.)
- What happens when a project in a series has `draft: true`? (It is excluded from series listings, detail pages, and navigator position counts, identical to blog posts and writeups.)

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a new `series` content collection at `src/content/series/`, where each entry defines `title`, `description`, `draft`, and an ordered `items` array of slug references in the format `blog/slug`, `writeups/slug`, or `projects/slug`.
- **FR-002**: System MUST expose a `/series` index page listing all published (non-draft) series with their title, description, and count of published items.
- **FR-003**: System MUST expose a `/series/[slug]` detail page displaying the full ordered list of published items for that series, with each entry showing its title, content-type badge (Blog / Writeup / Project), and a direct link to the item.
- **FR-004**: Individual blog posts, CTF writeups, and projects MUST support an optional `series` frontmatter field containing a series slug string.
- **FR-005**: Any blog post, writeup, or project with a `series` field MUST display a Series Navigator component at the bottom of its detail page, showing: series title, current position ("Part X of Y"), and previous/next navigation links. Placement is consistent across all three content types.
- **FR-006**: The Series Navigator MUST be absent on any content item that does not belong to any series.
- **FR-007**: Content items marked `draft: true` MUST be excluded from series listings, series detail pages, item counts, and Series Navigator position calculations.
- **FR-008**: Series marked `draft: true` MUST be excluded from the `/series` index and MUST NOT have a `/series/[slug]` page generated.
- **FR-009**: All series pages and navigator data MUST be resolved entirely at build time — no client-side data fetching is permitted.
- **FR-010**: The Series Navigator component MUST use the project's existing CSS custom properties (`--color-surface`, `--color-border`, `--color-accent`, etc.) and MUST NOT use inline styles.
- **FR-011**: System MUST provide a `src/content/series/_template.md` file containing AI agent authoring instructions for creating new series.
- **FR-012**: The feature MUST be compatible with the existing Page Bundle folder structure (content items may be either `collection/slug.md` or `collection/slug/index.md`).
- **FR-013**: The feature MUST create individual project detail pages at `/projects/[slug]`, displaying the project’s title, description, tech stack, links (GitHub and optional demo), and optional prose Markdown body rendered as a case study. Projects without a prose body render a valid metadata-only detail page. These pages did not previously exist and are in scope for this feature.
- **FR-014**: The projects content collection schema MUST be updated to include a `draft` boolean field (defaulting to `false`). Projects marked `draft: true` MUST be excluded from all series listings, series detail pages, item counts, navigator position calculations, and the projects listing page.

### Key Entities

- **Series**: A curated, ordered grouping of content. Attributes: slug, title, description, draft, items (ordered array of content references).
- **Content Reference**: A pointer from a series to a specific blog post, CTF writeup, or project. Format: `blog/slug`, `writeups/slug`, or `projects/slug`. Resolves to the matching Astro Content Collection entry.
- **Series Navigator**: A UI component rendered at the bottom of a content item’s detail page that contextualises the item within its parent series and provides sequential navigation.
- **Project Detail Page**: A new page at `/projects/[slug]` rendering a project’s structured metadata and optional prose case study body. Created as part of this feature.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new series can be created by adding a single Markdown file with the correct frontmatter — no additional configuration files or code changes required.
- **SC-002**: The site builds to completion with zero errors when at least one published series with at least one published post exists.
- **SC-003**: All series pages (`/series`, `/series/[slug]`) and in-post navigators are generated at build time with no client-side requests for series data.
- **SC-004**: Draft series and draft posts are completely invisible to visitors — they do not appear in any listing, detail page, or navigator — without manual cache clearing.
- **SC-005**: The Series Navigator renders correctly and is fully accessible on all viewport sizes supported by the existing site design (mobile-first, responsive).
- **SC-006**: A visitor can navigate through every post in a series using only the in-post navigator — without returning to the `/series` index — in a linear forward or backward direction.

---

## Assumptions

- All three of the site's existing content collections — `blog`, `writeups`, and `projects` — may be included in a series. A series may mix content types freely.
- A post may belong to at most one series in the navigator UI. If referenced in multiple series files, only the first matched series is used for the in-post navigator.
- Series order is defined explicitly via the `posts` array in the series frontmatter file; chronological ordering is not used.
- The `/series` route does not conflict with any existing pages in the project.
- The existing `src/styles/global.css` and CSS custom properties are available to the Series Navigator component without importing additional stylesheets.
- The AI agent template for series follows the same `_template.md` naming convention already established for blog and writeups collections.
