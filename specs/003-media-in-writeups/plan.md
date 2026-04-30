# Implementation Plan: Media Support in Writeups

**Branch**: `003-media-in-writeups` | **Date**: 2026-04-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/003-media-in-writeups/spec.md`

## Summary

The goal is to support embedding images and videos within writeups and blog posts. Content will be organized using "Page Bundles," meaning each writeup will have its own directory containing the markdown file (e.g., `index.md`) and associated media assets (e.g., images and videos). This ensures easy content management and prevents a messy global media folder.

## Technical Context

**Language/Version**: TypeScript, Astro 4.x
**Primary Dependencies**: Astro
**Storage**: Local file system (Markdown files and media assets)
**Testing**: Astro build verification, manual visual testing
**Target Platform**: Static site (GitHub Pages)
**Project Type**: Static Portfolio Website
**Performance Goals**: Optimized images (Astro's `<Image />` component) to maintain fast page loads
**Constraints**: Fully static site; no server-side rendering
**Scale/Scope**: Dozens to hundreds of writeups

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Code Quality & TypeScript Discipline**: Writeups will continue using markdown. If any custom components are needed for media (e.g., for videos or optimized images), they will be Astro components. (PASS)
- **II. Testing & Build Integrity**: The build (`pnpm build`) must succeed, and all embedded media must render correctly without breaking the layout. (PASS)
- **III. User Experience Consistency**: Embedded media must be responsive, ensuring no layout breaks on mobile or desktop. (PASS)
- **IV. Performance & Deployment Standards**: The site will remain fully static. Astro's image optimization can be used during build to ensure fast load times. (PASS)

## Project Structure

### Documentation (this feature)

```text
specs/003-media-in-writeups/
├── plan.md              # This file
├── research.md          # Phase 0 output
└── data-model.md        # Phase 1 output
```

### Source Code (repository root)

```text
src/
└── content/
    ├── writeups/
    │   ├── writeup-1/
    │   │   ├── index.md
    │   │   └── images/
    │   │       └── diagram.png
    │   └── writeup-2/
    │       ├── index.md
    │       └── video.mp4
    └── config.ts        # Content Collections schema updates if necessary
```

**Structure Decision**: The content organization will shift from single markdown files (`writeup.md`) to directories containing an `index.md` file and media assets (Page Bundles). This aligns perfectly with Astro's Content Collections which natively supports this structure.
