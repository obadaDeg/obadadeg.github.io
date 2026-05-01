# Feature Specification: Certificates Integration

**Feature Branch**: `005-certificates-integration`  
**Created**: 2026-05-01  
**Status**: Draft  
**Input**: User description: "adding some the certificates i added as well, here's some of the certificates I've earned at the docs, and lets think of how to link them with other content like blogs, and serise, maybe some writeups as well. give me your thoughts in the specs as well and deliver the best combination you see"

## Clarifications

### Session 2026-05-01
- Q: Certificate Thumbnail Generation → A: Auto-Generation (Option B). The build system will automatically convert the first page of the PDF into an image thumbnail.
- Q: Draft Certificate Behavior → A: Certificates will support a `draft` boolean flag to allow hiding incomplete entries from production while remaining visible locally.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Viewing Earned Certificates (Priority: P1)

As a visitor to the portfolio, I want to see a dedicated section or page displaying the certificates the author has earned, so I can verify their formal qualifications and ongoing learning.

**Why this priority**: Showcasing credentials is the primary goal of this feature and establishes trust and authority.

**Independent Test**: Can be fully tested by navigating to the certificates listing and viewing the certificate details (like issuer, date, and credential link).

**Acceptance Scenarios**:

1. **Given** the portfolio is loaded, **When** the visitor navigates to the Certificates section, **Then** a grid or list of certificates is displayed.
2. **Given** a specific certificate card, **When** the visitor clicks it, **Then** they can view the certificate image/PDF and details like credential ID and issue date.

---

### User Story 2 - Discovering Related Content from a Certificate (Priority: P2)

As a visitor viewing a specific certificate (e.g., "AI Hacking 101"), I want to see links to blogs, series, or writeups where the author applied these skills, so I can see practical proof of their knowledge.

**Why this priority**: Linking credentials to practical output (blogs/writeups) creates a powerful narrative that the author doesn't just collect certificates, but actually applies the knowledge.

**Independent Test**: Can be fully tested by opening a certificate detail page and verifying that related posts (blogs/writeups) are listed and clickable.

**Acceptance Scenarios**:

1. **Given** a certificate detail page, **When** related content exists, **Then** a "Related Work" section displays links to the relevant blogs, series, or writeups.
2. **Given** a certificate with no related content, **When** viewing the detail page, **Then** the "Related Work" section is gracefully hidden.

---

### User Story 3 - Validating Expertise in a Blog/Writeup (Priority: P2)

As a visitor reading a technical blog post or writeup, I want to see a badge or link indicating the author holds a relevant certificate in this topic, so I can trust the technical accuracy of the content.

**Why this priority**: This cross-links content in the reverse direction, adding authority to individual posts.

**Independent Test**: Can be fully tested by opening a blog post that has a linked certificate and verifying the certificate badge/link is visible in the post metadata.

**Acceptance Scenarios**:

1. **Given** a blog post or writeup associated with a certificate, **When** reading the post, **Then** a "Certified In" badge or link is visible near the top or bottom of the content.

### Edge Cases

- What happens if a linked blog post is deleted or marked as draft? (The build system should ignore it or gracefully hide the link on the certificate page).
- What happens if a certificate has no asset (PDF/Image) attached? (The UI should display a default placeholder or hide the asset viewer link).
- What happens if the automated PDF-to-image conversion fails during the build? (The build should warn the developer and fallback to a default placeholder image, rather than crashing the entire build).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST support a new content type/collection for "Certificates" with metadata for Title, Issuer, Issue Date, Credential ID, Credential URL, and an asset link (PDF/Image).
- **FR-002**: System MUST generate a listing view of all certificates, ordered by issue date (newest first).
- **FR-003**: System MUST allow cross-linking between certificates and other content collections (`blog`, `writeups`, `series`, `projects`).
- **FR-004**: Content detail pages (blogs, writeups) MUST optionally display badges or links to associated certificates.
- **FR-005**: Certificate detail pages MUST optionally display a list of associated content (blogs, writeups, series, projects) where the skills were applied.
- **FR-006**: System MUST embed the certificate directly in the webpage, allowing users to click the embed to view the full PDF.
- **FR-007**: System MUST automatically generate an image thumbnail from the provided PDF asset during the build process to optimize page load speeds.
- **FR-008**: System MUST support a `draft` boolean flag on certificates to hide them from production builds while keeping them visible in development.

### Key Entities

- **Certificate**: Represents an earned credential. Attributes: `title`, `issuer`, `issueDate`, `credentialId`, `credentialUrl`, `assetPath`, `draft`, `relatedContent` (array of slugs).
- **ContentItem (Blog/Writeup/Series/Project)**: Existing entities updated to include a `relatedCertificates` attribute (array of slugs).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Visitors can seamlessly navigate from a certificate to at least one piece of applied practical content (if linked) without encountering broken links.
- **SC-002**: The build system correctly resolves cross-linked relationships between the `certificates` collection and other collections without build errors.
- **SC-003**: Certificates section loads with optimized assets (images/PDF links) without significantly impacting the homepage load time.

## Assumptions

- We will use Astro Content Collections to manage the `certificates` data.
- The cross-linking relationship will be managed via frontmatter arrays (e.g., storing the slug of the related item).
- The provided PDF (`certificate-of-completion-for-ai-hacking-101.pdf`) and future certificates will be stored in a public assets folder or within the content collection folder.
- Certificates do not strictly require a long-form markdown body; the frontmatter metadata is the primary content.
