# Implementation Plan: Enhance Certificates Section

**Branch**: `001-enhance-certificates` | **Date**: 2026-05-12 | **Spec**: [spec.md](./spec.md)

## Summary

Add `skills[]` and `category` fields to the certificates schema, update the 5 existing certificate files, surface skills as chips and a verified badge on the card component, group the index page by category with a stats row, and add a 2-item certifications teaser to the home page.

## Technical Context

**Language/Version**: TypeScript / Astro 4.x  
**Primary Dependencies**: Astro Content Collections (Zod schemas), Astro static pages  
**Storage**: Markdown frontmatter (file-based content)  
**Testing**: `pnpm build` zero-error gate; manual visual check at 375px and 1440px  
**Target Platform**: Static GitHub Pages  
**Project Type**: Static portfolio site  
**Performance Goals**: Zero runtime JS added — all changes are build-time  
**Constraints**: No client-side filtering; fully static output required  
**Scale/Scope**: 5 certificates, grows gradually  

## Constitution Check

| Principle | Status | Notes |
|---|---|---|
| I. TypeScript Discipline | ✅ | New schema fields fully typed via Zod; no untyped frontmatter |
| II. Build Integrity | ✅ | `pnpm build` verified before merge; no placeholder text added |
| III. UX Consistency | ✅ | Skill chips use existing `--color-accent` / `--color-border` tokens; `Syne` / `IBM Plex Mono` fonts only |
| IV. Performance & Deployment | ✅ | Zero client-side JS islands added; all data resolved at build time |

## Project Structure

### Documentation (this feature)

```text
specs/001-enhance-certificates/
├── spec.md
├── plan.md              ← this file
└── checklists/
    └── requirements.md
```

### Source Code Changes

```text
src/
  content/
    config.ts                              ← add skills[], category to certificates schema
    certificates/
      ai-100-fundamentals/index.md         ← add skills + category
      ai-hacking-101/index.md              ← add skills + category
      git-github-practical-guide/index.md  ← add skills + category
      practical-web-hacking/index.md       ← add skills + category
      titan-shield-web-assessor/index.md   ← add skills + category
  components/
    CertificateCard.astro                  ← skill chips + verified badge
  pages/
    certificates/index.astro               ← stats row + category grouping
    index.astro                            ← certifications teaser section
```

## Implementation Phases

### Phase 1 — Schema & Content (no UI yet, build must pass)

1. Add `skills: z.array(z.string()).default([])` and `category: z.enum([...])` to the `certificates` collection in `src/content/config.ts`.
2. Update all 5 certificate `.md` files with appropriate `skills` and `category` values.
3. Run `pnpm build` — must pass with zero errors.

### Phase 2 — Card Component

4. Add `skills`, `credentialUrl`, and `hasCredential` props to `CertificateCard.astro`.
5. Render skill chips below the date using `.skill-chip` elements styled with `--color-border` / `--color-text`.
6. Render a `✓ Verified` badge anchored to the top-right card corner when `credentialUrl` is set; the badge links to the URL.
7. Run `pnpm build` — must pass.

### Phase 3 — Index Page

8. In `src/pages/certificates/index.astro`, compute stats (count, unique issuers, date range) from the certificates array.
9. Render stats as a single `<p class="certs-stats">` line above the grids.
10. Group certificates by category using a Map, render one `<section>` per category with a category heading and its own 2-column grid.
11. Pass `skills` and `credentialUrl` through to `CertificateCard`.
12. Run `pnpm build` — must pass.

### Phase 4 — Home Page Teaser

13. In `src/pages/index.astro`, fetch the certificates collection, filter non-drafts, sort by `issueDate` descending, take the first 2.
14. Add a "Certifications" section following the exact pattern of "From the Blog" — using `.writeup-list` / `.writeup-item` classes, showing title and issuer as metadata.
15. Section renders only when at least one certificate exists.
16. Run `pnpm build` — must pass.
