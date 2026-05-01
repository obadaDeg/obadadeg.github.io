# Implementation Plan: Certificates Integration

**Branch**: `005-certificates-integration` | **Date**: 2026-05-01 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-certificates-integration/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command.

## Summary

Implement a new `certificates` Astro Content Collection to display earned credentials. Certificates will automatically have their PDF assets converted into WebP/PNG thumbnails during the build process to ensure maximum frontend performance. The architecture utilizes bi-directional cross-linking via Astro's `reference()` schema validation, allowing blogs and writeups to easily show "Certified In" badges, while certificate detail pages can list all related practical work.

## Technical Context

**Language/Version**: TypeScript / Astro 4.16+
**Primary Dependencies**: `zod`, `astro:content`, `pdf-to-img` (or similar PDF parser for the Astro Integration)
**Storage**: Markdown frontmatter in `src/content/certificates/`
**Testing**: Astro build strictness, TypeScript type-checking
**Target Platform**: GitHub Pages (Static Site Generation)
**Project Type**: Static Web Portfolio
**Performance Goals**: Zero runtime impact from PDFs. Thumbnail images must be generated at build time.
**Constraints**: Must run smoothly on GitHub Actions Ubuntu runners. No dynamic SSR permitted.
**Scale/Scope**: ~10-20 certificates, integrated bi-directionally with dozens of blog posts/writeups.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **I. Code Quality & TypeScript Discipline**: `certificates` schema will be strictly typed in `src/content/config.ts` using Zod. No React/Vue allowed.
- [x] **II. Testing & Build Integrity**: The `relatedCertificates` relationship uses Astro's `reference()` to guarantee that if a linked certificate is missing, the build will purposefully fail instead of pushing a broken link.
- [x] **III. User Experience Consistency**: Badges and grid layouts will reuse existing Tailwind utility classes and the accent color (`#7efff5`). Fonts remain IBM Plex Mono/Syne.
- [x] **IV. Performance & Deployment Standards**: No server-side rendering is introduced. PDFs are processed *at build time* in a custom Astro integration to ensure the final output is 100% static images and HTML, exactly as required by GitHub Pages.

## Project Structure

### Documentation (this feature)

```text
specs/005-certificates-integration/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   └── CertificateCard.astro
├── content/
│   ├── config.ts
│   └── certificates/
│       ├── _template.md
│       └── ai-hacking-101/
│           ├── index.md
│           └── certificate-of-completion-for-ai-hacking-101.pdf
├── integrations/
│   └── pdf-thumbnail-generator.ts
└── pages/
    ├── certificates/
    │   ├── index.astro
    │   └── [slug].astro
    └── api/ (Optional, for build hooks if not using an integration file directly)
```

**Structure Decision**: Standard Astro Content Collections layout with a dedicated route (`/certificates`) and a custom integration script in `src/integrations` to hook into the build pipeline.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| *None* | N/A | N/A |
