---
description: "Task list template for feature implementation"
---

# Tasks: Certificates Integration

**Input**: Design documents from `/specs/005-certificates-integration/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic dependencies

- [x] T001 Install `pdf-to-img` dependency in `package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Define `certificates` collection schema in `src/content/config.ts` (Title, issuer, date, ID, URL, assetPath, draft)
- [x] T003 Update existing schemas (`blog`, `writeups`, `series`, `projects`) in `src/content/config.ts` with `relatedCertificates` array reference
- [x] T004 Implement `pdf-thumbnail-generator.ts` custom Astro integration in `src/integrations/pdf-thumbnail-generator.ts`
- [x] T005 Wire the new integration into `astro.config.mjs`

**Checkpoint**: Foundation ready - schemas and thumbnail generation are established.

---

## Phase 3: User Story 1 - Viewing Earned Certificates (Priority: P1) 🎯 MVP

**Goal**: As a visitor, I want to see a dedicated section displaying the certificates the author has earned.

**Independent Test**: Can be fully tested by navigating to `/certificates` and viewing the generated thumbnails and details.

### Implementation for User Story 1

- [x] T006 [P] [US1] Create template Markdown file for certificates in `src/content/certificates/_template.md`
- [x] T007 [P] [US1] Create `CertificateCard.astro` component in `src/components/CertificateCard.astro`
- [x] T008 [US1] Implement certificates listing page in `src/pages/certificates/index.astro` (filtering out `draft` items)
- [x] T009 [US1] Implement certificate detail page layout in `src/pages/certificates/[slug].astro`
- [x] T010 [US1] Add "Certificates" link to the main navigation header in `src/components/Nav.astro`

**Checkpoint**: At this point, User Story 1 should be fully functional. The portfolio displays certificates properly.

---

## Phase 4: User Story 2 - Discovering Related Content from a Certificate (Priority: P2)

**Goal**: As a visitor viewing a certificate, I want to see links to blogs/writeups where the author applied these skills.

**Independent Test**: Can be fully tested by adding a `relatedCertificates` link to a blog post, then viewing the certificate page to see the blog post listed.

### Implementation for User Story 2

- [x] T011 [US2] Update `src/pages/certificates/[slug].astro` to query all `blog`, `writeups`, `series`, and `projects` that reference this certificate's slug.
- [x] T012 [US2] Add a "Related Work" visual section at the bottom of the certificate detail page to display these items using existing UI cards.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Certificates link forward to the projects that use them.

---

## Phase 5: User Story 3 - Validating Expertise in a Blog/Writeup (Priority: P2)

**Goal**: As a visitor reading a technical post, I want to see a badge indicating the author holds a relevant certificate.

**Independent Test**: Can be fully tested by opening a blog post that has a linked certificate and verifying the badge/link is visible.

### Implementation for User Story 3

- [x] T013 [P] [US3] Create `CertificateBadge.astro` component in `src/components/CertificateBadge.astro`
- [x] T014 [US3] Update post rendering layouts (e.g. `src/layouts/Post.astro` or individual pages) to fetch the referenced certificate data and display the badge at the top/bottom of the article.
- [x] T015 [US3] Ensure the badge correctly links back to `/certificates/[slug]`.

**Checkpoint**: All user stories should now be independently functional. Bi-directional linking is complete.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T016 Add the actual `ai-hacking-101` certificate PDF and frontmatter to `src/content/certificates/`
- [x] T017 Test the entire build pipeline (`pnpm build`) to ensure the integration correctly fires and `_routes` behaves properly.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Depends on US1 (needs the detail page `[slug].astro` to exist)
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent of US2, but relies on schema.

### Parallel Opportunities

- T006 and T007 can be executed simultaneously.
- User Story 3 (T013) can be built in parallel with User Story 2.

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2
2. Complete Phase 3: User Story 1
3. **STOP and VALIDATE**: Test `/certificates` route.
4. Deploy/demo if ready

### Incremental Delivery

1. Foundation ready
2. Add User Story 1 → Test independently
3. Add User Story 2 → See related blogs on certificates
4. Add User Story 3 → See "Certified In" badges on blogs.
