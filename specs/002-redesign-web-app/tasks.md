# Tasks: Visual Redesign with Animations

**Branch**: `002-redesign-web-app`  
**Input**: `specs/002-redesign-web-app/plan.md`, `spec.md`, `research.md`, `quickstart.md`  
**Generated**: 2026-04-19

**Tests**: Not requested in spec — no test tasks included.

**Organization**: Tasks grouped by user story. Each phase is independently testable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel with other [P] tasks (different files, no shared dependencies)
- **[Story]**: User story this task serves (US1, US2, US3)
- Each task includes exact file paths

---

## Phase 1: Setup — Animation System Foundation

**Purpose**: Establish all shared CSS primitives that every subsequent task depends on. These all land in `src/styles/global.css` and must be complete before any component task begins.

- [x] T001 Add `@keyframes fade-up` (opacity 0 + translateY(20px) → opacity 1 + translateY(0)) and `@keyframes fade-in` (opacity 0 → opacity 1) at the bottom of `src/styles/global.css`, inside a clearly marked "Animation Keyframes" comment block
- [x] T002 Add `.animate-on-scroll` base class (opacity: 0, transform: translateY(20px), transition: opacity 0.4s ease-out + transform 0.4s ease-out) and `.animate-on-scroll.in-view` resolved state (opacity: 1, transform: none) to `src/styles/global.css` — these classes are applied to elements in markup and toggled by the IntersectionObserver script
- [x] T003 Add `@media (prefers-reduced-motion: reduce)` block to `src/styles/global.css` that sets `animation-duration: 0.01ms !important`, `animation-iteration-count: 1 !important`, `transition-duration: 0.01ms !important`, and `scroll-behavior: auto !important` on `*, *::before, *::after`

---

## Phase 2: Foundational — Page Transitions & Scroll Engine

**Purpose**: Core infrastructure that ALL user story animations depend on. Must be complete before Phase 3+.

**⚠️ CRITICAL**: Both tasks must be complete before any scroll-triggered or page-transition task in Phases 3–5 can work correctly.

- [x] T004 [P] Add `::view-transition-old(root)` (animation-duration: 180ms, animation-timing-function: ease-in) and `::view-transition-new(root)` (animation-duration: 240ms, animation-timing-function: ease-out) CSS rules to `src/styles/global.css`, in a comment block labelled "ViewTransitions Override" — this refines the default Astro fade timing
- [x] T005 [P] Add `<script>` tag to `src/layouts/Base.astro` (before `</body>`) containing `initScrollAnimations()` — the function: (1) checks `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and if true immediately adds `.in-view` to all `.animate-on-scroll` elements and returns; (2) otherwise creates an `IntersectionObserver` with `{ threshold: 0.1 }` that adds `.in-view` to each intersecting element and then unobserves it; (3) queries all `.animate-on-scroll` elements and observes them; register the function on `document.addEventListener('astro:page-load', initScrollAnimations)` so it re-runs after every ViewTransitions page swap

**Checkpoint**: Load any page in `pnpm dev`. Navigate between pages — there should be a smooth 180ms/240ms opacity fade. Scroll down on the home page — `.animate-on-scroll` elements should fade up as they enter the viewport. Enable `prefers-reduced-motion` in DevTools — all content should appear instantly with no animation.

---

## Phase 3: User Story 1 — Recruiter Forms Instant Impression (Priority: P1) 🎯 MVP

**Goal**: The home page hero animates in on load (staggered sequence), below-fold sections reveal on scroll, and project cards respond with a lift + glow on hover — giving a recruiter an immediate polished first impression.

**Independent Test**: Open `http://localhost:4321/obadaDeg/`, hard-refresh, and observe: (1) name fades up first, then terminal + role, then bio, then CTA; (2) scroll down — Featured Projects section fades up; (3) hover a project card — it lifts 3px with a faint teal glow.

### Implementation for User Story 1

- [x] T006 In `src/styles/global.css`, add scoped hero stagger CSS: `.hero-name { animation: fade-up 0.5s ease-out 0.00s both; }`, `.hero-term { animation: fade-up 0.5s ease-out 0.15s both; }`, `.hero-role { animation: fade-up 0.5s ease-out 0.15s both; }`, `.hero-bio { animation: fade-up 0.5s ease-out 0.30s both; }`, `.hero-cta { animation: fade-up 0.5s ease-out 0.45s both; }` — place in a comment block labelled "Hero Entrance Stagger"
- [x] T007 [US1] In `src/pages/index.astro`, add animation class attributes to each hero element: add `class="hero-name"` (or append to existing) on the `<h1>`, `class="hero-term"` on `.terminal-block`, `class="hero-role"` on `.hero-title` paragraph, `class="hero-bio"` on `.hero-bio` paragraph, `class="hero-cta"` on the GitHub CTA anchor
- [x] T008 [US1] In `src/pages/index.astro`, wrap each below-fold section (`<!-- Featured Projects -->`, `<!-- Recent Writeups -->`, `<!-- Recent Blog Posts -->`) with `class="animate-on-scroll"` added to the outermost `<section>` element of each — the IntersectionObserver from T005 will trigger the fade-up as they scroll into view
- [x] T009 [P] [US1] In `src/components/ProjectCard.astro`, upgrade the `.project-card` CSS: add `transform` and `box-shadow` to the `transition` value (e.g., `transition: border-color 0.2s ease, transform 0.2s ease-out, box-shadow 0.2s ease-out`), and add `transform: translateY(-3px)` and `box-shadow: 0 8px 24px rgba(126, 255, 245, 0.07)` to the `.project-card:hover` rule — keep the existing `border-color: var(--color-accent)` hover rule

**Checkpoint**: After T006–T009, User Story 1 should be fully functional and independently verifiable per the Independent Test above. Hard-refresh the home page, scroll through, and hover project cards.

---

## Phase 4: User Story 2 — CTF Community Member Navigates Writeups (Priority: P2)

**Goal**: Writeup cards have visual hover feedback, TagPills have a micro-interaction, and the writeup listing reveals smoothly on scroll. Page-to-page navigation (e.g., clicking category pills) uses the smooth ViewTransitions fade established in Phase 2.

**Independent Test**: Navigate to `http://localhost:4321/obadaDeg/writeups/`, scroll through writeup rows and hover each row — it should gain a background tint and slight left-shift. Click a category pill — the category page loads with a smooth opacity fade. Open a writeup — the back-link and content fade in on load.

### Implementation for User Story 2

- [x] T010 [P] [US2] In `src/components/WriteupCard.astro`, upgrade `.writeup-card` CSS: add `border-radius: 4px`, `padding-left: 0.5rem`, `margin-left: -0.5rem` (to offset the padding without causing layout shift) to the base rule, add `transition: background 0.15s ease, padding-left 0.15s ease` to the base rule, and add `.writeup-card:hover { background: var(--color-surface); padding-left: 0.75rem; }` — the existing title color hover transition can remain
- [x] T011 [P] [US2] In `src/components/TagPill.astro`, read the file to understand its current structure, then add `transition: transform 0.15s ease` to the tag pill's base CSS rule and `transform: scale(1.05)` on its hover rule (do not change colors — only add scale)
- [x] T012 [P] [US2] In `src/pages/writeups/index.astro`, add `class="animate-on-scroll"` to the `<div class="writeup-list">` wrapper and to the `<div class="category-filter">` div — this ensures both the filter pills and the list reveal on scroll
- [x] T013 [P] [US2] In `src/layouts/Post.astro`, add a `<style>` block (scoped) with `animation: fade-in 0.35s ease-out 0.1s both` on `.back-link` and `animation: fade-in 0.45s ease-out 0.2s both` on `.post-content` — this gives post/writeup detail pages a subtle content entrance; the `fade-in` keyframe was defined in T001

**Checkpoint**: After T010–T013, navigate to the writeups page, hover each row, click a category pill (smooth fade to category page), and open a writeup. All four interactions should have visible motion enhancement.

---

## Phase 5: User Story 3 — Polished Overall Experience (Priority: P3)

**Goal**: Every page feels cohesive — nav links have animated underline indicators, blog cards match project cards, remaining pages have scroll-reveal, and post layout feels complete.

**Independent Test**: Tab through the site using keyboard only — focus indicators should be visible. Hover each nav link on desktop — a teal underline slides in. Hover blog cards — they lift. Scroll the projects and blog pages — cards reveal on scroll.

### Implementation for User Story 3

- [x] T014 [P] [US3] In `src/components/Nav.astro`, add a `::after` pseudo-element to `.nav-link`: `content: ''`, `display: block`, `height: 1px`, `background: var(--color-accent)`, `transform: scaleX(0)`, `transform-origin: left`, `transition: transform 0.2s ease` — with `transform: scaleX(1)` applied on `.nav-link:hover::after` and `.nav-link.active::after`; confirm this does not interfere with the mobile menu (pseudo-element only needed on `.nav-link`, not `.mobile-link`)
- [x] T015 [P] [US3] In `src/components/BlogCard.astro`, read the file first, then add hover background tint + left-padding shift (matching WriteupCard pattern for row-based cards): `background: var(--color-surface)` and `padding-left: 1rem` on hover, `transition: background 0.15s ease, padding-left 0.15s ease` on base state
- [x] T016 [P] [US3] In `src/pages/projects.astro`, read the file first, then add `class="animate-on-scroll"` to the page-level `<section>` or the projects grid wrapper so project cards reveal on scroll (the individual card hover effect from T009 already applies via the component)
- [x] T017 [P] [US3] In `src/pages/blog/index.astro`, read the file first, then add `class="animate-on-scroll"` to the blog listing wrapper/section so blog cards reveal on scroll

**Checkpoint**: After T014–T017, browse the full site — nav underlines, blog card hovers, and scroll reveals should all work consistently across all pages.

---

## Phase 6: Polish & Verification

**Purpose**: Validate that nothing broke, animations meet performance targets, and reduced-motion compliance is complete.

- [x] T018 Run `pnpm build` from the repository root (`d:/Projects/obadaDeg`) and confirm zero errors and zero warnings in the output — fix any TypeScript or build errors before proceeding
- [ ] T019 Open `pnpm preview` at `http://localhost:4321/obadaDeg/`, test manually at 375px, 768px, and 1440px viewport widths — verify: no layout overflow on mobile, hero stacks correctly, project cards don't break, animations play correctly at each breakpoint
- [ ] T020 In Chrome DevTools → Rendering tab → enable "Emulate CSS media feature prefers-reduced-motion: reduce" — reload the home page and navigate through the site; verify: hero appears instantly with full opacity, no scroll animations play, page transitions are instant, card hovers have no transform/scale
- [ ] T021 Perform the full recruiter journey in `pnpm preview`: open home → hero animates in → scroll through sections → hover project card → click nav to Projects → scroll projects → click nav to Writeups → hover writeup row → click category pill → return → open a writeup → verify smooth entrance — confirm the complete flow feels intentional and polished

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately; tasks are sequential within the phase (same file)
- **Phase 2 (Foundational)**: Requires Phase 1 complete; T004 and T005 are parallelizable (different files); BLOCKS Phase 3+
- **Phase 3 (US1)**: Requires Phase 2 complete; T006 sequential (global.css); T007, T008, T009 can start after T006 (T009 is [P] with T007/T008 since different file)
- **Phase 4 (US2)**: Requires Phase 2 complete; T010, T011, T012, T013 are all [P] (all different files)
- **Phase 5 (US3)**: Requires Phase 2 complete; T014, T015, T016, T017 are all [P] (all different files)
- **Phase 6 (Polish)**: Requires ALL phases complete; T018 → T019 → T020 → T021 are sequential

### User Story Dependencies

- **US1 (P1)**: Depends on Phases 1 + 2 only. Independently testable after T009.
- **US2 (P2)**: Depends on Phases 1 + 2 only (ViewTransitions for category page fades). Independently testable after T013. Does NOT depend on US1.
- **US3 (P3)**: Depends on Phases 1 + 2 only. Independently testable after T017. Does NOT depend on US1 or US2.

Phases 3, 4, and 5 can proceed in parallel once Phase 2 is complete.

---

## Parallel Execution Examples

### Phase 2 (run together)
```
Task T004: Add ViewTransitions CSS override to src/styles/global.css
Task T005: Add IntersectionObserver script to src/layouts/Base.astro
```

### Phase 4 (all run together after Phase 2)
```
Task T010: WriteupCard row hover — src/components/WriteupCard.astro
Task T011: TagPill scale hover — src/components/TagPill.astro
Task T012: Writeups index scroll reveal — src/pages/writeups/index.astro
Task T013: Post layout fade-in — src/layouts/Post.astro
```

### Phase 5 (all run together after Phase 2)
```
Task T014: Nav underline animation — src/components/Nav.astro
Task T015: BlogCard hover lift — src/components/BlogCard.astro
Task T016: Projects page scroll reveal — src/pages/projects.astro
Task T017: Blog index scroll reveal — src/pages/blog/index.astro
```

---

## Implementation Strategy

### MVP First (US1 Only — Fastest to Ship)

1. Complete Phase 1 (T001–T003) — CSS foundation
2. Complete Phase 2 (T004–T005) — Engine in place
3. Complete Phase 3 (T006–T009) — Hero + home page + project card hovers
4. **STOP and validate**: Hard-refresh home page, scroll, hover project cards
5. This alone delivers a noticeably more polished hero experience for recruiters

### Full Delivery (All User Stories)

1. Phase 1 → Phase 2 → Phase 3 (US1)
2. Phase 4 (US2) + Phase 5 (US3) in parallel after Phase 2
3. Phase 6 — build verification + viewport + reduced-motion testing
4. Merge to `main` → GitHub Actions deploys to GitHub Pages

---

## Notes

- [P] marks tasks with no file conflicts — safe to run as parallel Claude Code sub-agents
- Hero stagger (T006–T007) uses pure CSS `animation-delay`, no JS required
- Scroll reveals (T008, T012, T016, T017) require Phase 2 (T005 IntersectionObserver) to be complete
- The ViewTransitions page fade (T004) covers category filter navigation "for free" — no additional category-filter JS needed
- All `animation: X Y Z both` use `animation-fill-mode: both` to hold the final state after the animation completes
- If `pnpm build` fails in T018 due to TypeScript errors, check that no new `class` attributes break Astro's type system (they should not — HTML class attributes are untyped)
