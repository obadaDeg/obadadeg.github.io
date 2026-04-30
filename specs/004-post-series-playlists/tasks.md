# Tasks: Post Series (Playlists)

**Feature**: `004-post-series-playlists`
**Input**: Design documents from `specs/004-post-series-playlists/`
**Branch**: `004-post-series-playlists`

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1–US5)
- Exact file paths included in every task description

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Schema updates and new collection scaffolding that all subsequent phases depend on.

- [x] T001 Add `draft: z.boolean().default(false)` and `series: z.string().optional()` fields to the `projects` collection schema in `src/content/config.ts`
- [x] T002 Add `series: z.string().optional()` field to the `blog` collection schema in `src/content/config.ts`
- [x] T003 Add `series: z.string().optional()` field to the `writeups` collection schema in `src/content/config.ts`
- [x] T004 Add the `series` content collection to `src/content/config.ts` — define `seriesItem` (`collection`, `slug`) and `series` schema (`title`, `description`, `draft`, `items` array) using Zod; export in `collections`
- [x] T005 Create the `src/content/series/` directory with a `.gitkeep` placeholder so the collection path exists
- [x] T006 Rename `src/pages/projects.astro` → `src/pages/projects/index.astro` to allow `/projects/[slug]` to coexist (no content changes to the file, just the move)

**Checkpoint**: ✅ `npm run build` passes with zero errors after T001–T006.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The `SeriesNavigator` component is used by US3, US4, and US5. Build it first so it can be dropped in independently.

- [x] T007 Create `src/components/SeriesNavigator.astro` — accept props `seriesTitle: string`, `seriesSlug: string`, `currentIndex: number` (0-based), `total: number`, `prevItem?: { title: string; href: string }`, `nextItem?: { title: string; href: string }`. Render a styled container using only `--color-surface`, `--color-border`, `--color-accent`, `--color-text`, `--color-muted` CSS vars. Show: series label linking to `/series/[seriesSlug]`, "Part X of Y" in Syne font, prev/next navigation links. No inline styles. Responsive at 375px and 1440px.

**Checkpoint**: ✅ Component file exists and builds with no type errors.

---

## Phase 3: User Story 1 — Browse & Discover Series (Priority: P1) 🎯 MVP

**Goal**: Visitors can navigate to `/series` and see a list of all published series with title, description, and post count.

**Independent Test**: Create a single series file at `src/content/series/test-series.md` with `draft: false` and two items. Run `npm run build`. Navigate to `/series` in the built output and confirm the series card renders with the correct title, description, and item count.

- [x] T008 [US1] Create `src/pages/series/index.astro` — call `getCollection('series', s => !s.data.draft)`, for each series resolve its published items by calling `getCollection` for each referenced collection and filtering out drafts, compute the published item count. Render a list of series cards showing title, description, and count. Use existing `Page` layout. Match site dark aesthetic using CSS vars only. Include empty-state for zero series.
- [x] T009 [US1] Create `src/content/series/_template.md` — AI agent authoring template with frontmatter placeholders and `🤖 AI AGENT INSTRUCTIONS` comment block explaining: `items` array format (`collection: blog/writeups/projects`, `slug`), draft flag behavior, and how the series navigator will automatically appear on referenced pages once the series is published.

**Checkpoint**: ✅ `/series` route renders correctly.

---

## Phase 4: User Story 2 — View Series Detail Page (Priority: P1)

**Goal**: Visitors can click a series and see a `/series/[slug]` detail page listing every published item in order, with type badges (Blog / Writeup / Project) and working links.

- [x] T010 [US2] Create `src/pages/series/[slug].astro` — implement `getStaticPaths()` calling `getCollection('series', s => !s.data.draft)`. For each series, resolve every item in `items` via `getEntry(item.collection, item.slug)`, filter out `null` (missing) and draft entries. Return `params: { slug }` and `props: { series, resolvedItems }`. In the page component, render the series title, description, and an ordered list with each item showing: position number, title (linked to the correct collection URL), and a content-type badge (Blog / Writeup / Project).

**Checkpoint**: ✅ `/series/[slug]` renders with ordered items, correct badges, working links.

---

## Phase 5: User Story 4 — Author Creates a Series (Priority: P1)

**Goal**: A new series is fully functional by adding one Markdown file to `src/content/series/`. No additional code changes required.

- [x] T011 [US4] Create an example series entry at `src/content/series/example-series.md` (with `draft: true`) that references the existing `grid-equalization-quickselect` blog post.
- [x] T012 [US4] Verify `npm run build` succeeds with the example series file — ✅ 17 pages built, zero errors.

**Checkpoint**: ✅ Author workflow confirmed — one `.md` file is all that is needed.

---

## Phase 6: User Story 3 — In-Post Series Navigator on Blog & Writeups (Priority: P2)

**Goal**: Blog posts and writeups that belong to a series display the `SeriesNavigator` component at the bottom of their prose content.

- [x] T013 [P] [US3] Update `src/pages/blog/[...slug].astro` — in `getStaticPaths()`, load `getCollection('series', s => !s.data.draft)`. For each post, find a matching series, resolve published items, compute `currentIndex`, `total`, `prevItem`, `nextItem`. Render `<SeriesNavigator>` conditionally below prose.
- [x] T014 [P] [US3] Update `src/pages/writeups/[...slug].astro` — apply the identical series context resolution pattern from T013.

**Checkpoint**: ✅ Series Navigator renders on blog and writeup pages that belong to a series.

---

## Phase 7: User Story 5 — Individual Project Detail Pages (Priority: P1)

**Goal**: Each project has a detail page at `/projects/[slug]` showing structured metadata plus optional prose body. The navigator renders on project pages that belong to a series.

- [x] T015 [US5] Create `src/pages/projects/[slug].astro` — implement `getStaticPaths()` with series context resolution. Render project title, description, tech stack pills, GitHub/demo links (`↗`), optional prose `<Content />`, and `<SeriesNavigator>` when applicable. Use `Post` layout.
- [x] T016 [US5] Update `src/pages/projects/index.astro` — add draft filter and `href` prop to `<ProjectCard>` linking to `/projects/[project.slug]`.

**Checkpoint**: ✅ `/projects/[slug]` renders for all existing projects. Projects listing links to detail pages.

---

## Phase 8: Polish & Cross-Cutting Concerns

- [x] T017 [P] Add "Series" link to site navigation in `src/components/Nav.astro` pointing to `/series`.
- [x] T018 [P] Add "Recent Series" section to `src/pages/index.astro` — conditionally renders when published series exist.
- [x] T019 Confirm `series` collection exported in `collections` object in `src/content/config.ts` — ✅ confirmed included in T004.
- [x] T020 Run full `npm run build` — ✅ **17 pages built, zero errors, zero warnings.**
- [ ] T021 [P] Visual review at 375px (mobile) and 1440px (desktop) for: `SeriesNavigator`, `/series` index, `/series/[slug]` detail, `/projects/[slug]` detail.
- [x] T022 Confirm `example-series.md` has `draft: true` — ✅ series is invisible to visitors.
- [x] T023 [P] Update `src/content/blog/_template/index.md` and `src/content/writeups/_template/index.md` AI agent instructions to mention the `series` frontmatter field.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 (T001–T006 complete) — **BLOCKS** Phases 6, 7
- **Phase 3 (US1 — `/series` index)**: Depends on Phase 1 only (no navigator needed)
- **Phase 4 (US2 — `/series/[slug]`)**: Depends on Phase 3 (needs series collection working)
- **Phase 5 (US4 — Author workflow)**: Depends on Phases 3 + 4 (needs both series pages)
- **Phase 6 (US3 — Blog/Writeup Navigator)**: Depends on Phase 2 (needs SeriesNavigator component)
- **Phase 7 (US5 — Project detail pages)**: Depends on Phase 2 (needs SeriesNavigator component)
- **Phase 8 (Polish)**: Depends on all previous phases

---

## Notes

- All tasks produce clean `npm run build` output — ✅ 17 pages, zero errors
- No client-side JS introduced; all series data is build-time only
- CSS vars only — `--color-surface`, `--color-border`, `--color-accent`, `--color-muted`, `--color-text`
- External links (GitHub, demo) use `target="_blank"` + `↗` indicator per constitution III
- Draft items are filtered before computing navigator position indices
