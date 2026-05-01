# Phase 1: Data Model & Contracts

## Entities

### 1. `certificates` Collection Schema
Defined in `src/content/config.ts`.
- `title` (String): The name of the certificate (e.g., "AI Hacking 101").
- `issuer` (String): The organization that issued it (e.g., "The Docs").
- `issueDate` (Date): When it was earned.
- `credentialId` (String, Optional): The verification ID.
- `credentialUrl` (String/URL, Optional): External link to verify the credential.
- `assetPath` (String): Relative path to the PDF or image file (e.g., `"./assets/certificate-of-completion-for-ai-hacking-101.pdf"`).
- `draft` (Boolean, Default: false): If true, hides the certificate from production builds.

### 2. Updated Existing Collections
Defined in `src/content/config.ts` for `blog`, `writeups`, `series`, `projects`.
- Add field: `relatedCertificates: z.array(reference('certificates')).optional()`.
- Validates at build time that any linked certificate slug actually exists in the `certificates` collection.

## File System Structure

```text
src/
├── content/
│   ├── certificates/
│   │   ├── _template.md
│   │   ├── ai-hacking-101/
│   │   │   ├── index.md (frontmatter)
│   │   │   └── certificate-of-completion-for-ai-hacking-101.pdf
```

## System Contracts
- **Integration Build Hook**: A custom Astro integration (e.g., `src/integrations/pdf-thumbnailer.ts`) will listen for the `astro:build:start` hook. It will scan `src/content/certificates/**/*.pdf`, generate PNG thumbnails, and write them to `public/images/certificates/`. The frontend will compute the thumbnail URL by replacing the `.pdf` extension with `.png` and pointing to the `/images/certificates/` public route.
