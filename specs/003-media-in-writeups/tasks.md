# Tasks: Media Support in Writeups

**Input**: Design documents from `specs/003-media-in-writeups/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Verify Astro Content Collections exist in `src/content/writeups/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Update `src/content/config.ts` to include the `image()` helper in the schema for cover images

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 3 - Organize Content Using Page Bundles (Priority: P1) 🎯 MVP

**Goal**: Organize each writeup and its associated media files within its own dedicated folder.
Note: US3 is prioritized here because the folder structure is required before adding media.

**Independent Test**: Can be verified by moving an entire writeup folder to a different category directory and ensuring all media links remain intact without manual changes.

### Implementation for User Story 3

- [x] T003 [P] [US3] Create a sample writeup folder `src/content/writeups/sample-bundle/`
- [x] T004 [US3] Move an existing markdown writeup (if any) or create `src/content/writeups/sample-bundle/index.md`

**Checkpoint**: At this point, User Story 3 should be fully functional and testable independently

---

## Phase 4: User Story 1 - Add Images to a Writeup (Priority: P1)

**Goal**: Include images in writeups to provide visual context.

**Independent Test**: Can be fully tested by creating a writeup directory, placing an image in it, referencing it in the markdown, and verifying it renders correctly on the frontend.

### Implementation for User Story 1

- [x] T005 [P] [US1] Add a sample image `src/content/writeups/sample-bundle/images/diagram.png`
- [x] T006 [US1] Update `src/content/writeups/sample-bundle/index.md` to reference `![Diagram](./images/diagram.png)`
- [x] T007 [US1] Run Astro dev server and visually verify the image renders and is optimized by Astro

**Checkpoint**: At this point, User Stories 3 AND 1 should both work independently

---

## Phase 5: User Story 2 - Add Videos to a Writeup (Priority: P2)

**Goal**: Embed videos in writeups.

**Independent Test**: Can be tested by placing a video file in the writeup directory or public folder and embedding it in the markdown.

### Implementation for User Story 2

- [x] T008 [P] [US2] Add a sample video file to `public/videos/sample.mp4`
- [x] T009 [US2] Update `src/content/writeups/sample-bundle/index.md` to include `<video src="/videos/sample.mp4" controls></video>`
- [x] T010 [US2] Verify the video plays correctly in the browser and is responsive

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T011 [P] Ensure all media (images and videos) dynamically resize to prevent horizontal scrolling on mobile viewports by checking CSS in `src/styles/global.css`
- [x] T012 Run full production build `pnpm build` to verify zero errors and warnings

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - Proceed sequentially in priority order (US3 -> US1 -> US2)

### Parallel Opportunities

- Creating sample images and videos can happen in parallel.
- CSS verification can happen in parallel.
