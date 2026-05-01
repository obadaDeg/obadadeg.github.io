# Phase 0: Research & Architecture Decisions

## 1. Automated PDF Thumbnail Generation
**Decision**: Use `pdf-to-img` (or similar `pdfjs-dist` wrapper) within an Astro Integration.
**Rationale**: The user wants to drop PDF certificates into the project and have the build system automatically extract a thumbnail image for the website to display (to avoid heavy PDF embeds hurting performance). `pdf-to-img` works natively in Node.js without requiring legacy system dependencies like Ghostscript. By wrapping this in a custom Astro Integration (hooking into `astro:config:setup` or `astro:build:start`), we can automatically process any new PDFs in `src/content/certificates/` and output optimized WebP/PNG images into `public/images/certificates/`.
**Alternatives considered**: 
- Manual screenshotting (rejected by user to improve DX).
- Client-side rendering via `pdf.js` in the browser (rejected due to massive performance penalty and bundle size bloat, violating Principle IV).
- System-level Ghostscript conversion via `pdf2pic` (rejected because it adds CI complexity, though it's a valid fallback if pure-JS canvas fails).

## 2. Content Collection Structure
**Decision**: Create a new `certificates` collection in `src/content/config.ts`.
**Rationale**: Certificates are standalone entities with unique metadata (Issuer, Issue Date, Credential ID) that don't fit perfectly into `projects` or `writeups`. Treating them as a first-class collection allows us to strongly type the frontmatter using Zod (satisfying Principle I).
**Alternatives considered**: 
- Just putting them in a JSON file (rejected because it doesn't allow easy markdown content if the user ever wants to add notes, and doesn't align with the existing Astro content architecture).

## 3. Bi-Directional Cross-Linking
**Decision**: Store a `relatedCertificates: reference('certificates').array().optional()` field in the schema for `blog`, `writeups`, `series`, and `projects`.
**Rationale**: Astro 2.5+ supports Content Collection references. This allows us to link a blog post to a certificate and have Astro validate the relationship at build time (e.g., if a certificate is deleted or a slug is typo'd, the build will fail immediately instead of pushing a broken link to production, perfectly satisfying Principle II).
**Alternatives considered**: 
- Storing string arrays without `reference()` (rejected because it lacks build-time validation).
