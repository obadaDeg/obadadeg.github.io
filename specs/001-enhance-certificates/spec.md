# Feature Specification: Enhance Certificates Section

**Feature Branch**: `001-enhance-certificates`  
**Created**: 2026-05-12  
**Status**: Draft  
**Input**: User description: improve the Certificates section in terms of content and design

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Skills Visible Without Clicking (Priority: P1)

A portfolio visitor lands on the certificates index page and wants to quickly assess what skills each certification covers. Currently they must open each certificate's detail page to find this out. With this feature, each card exposes the relevant skill tags directly, letting visitors scan all certificates at a glance.

**Why this priority**: Directly addresses the core content gap — certificates are currently opaque on the listing page. Delivering skill chips alone produces a meaningfully more useful listing page.

**Independent Test**: Can be tested by loading `/certificates`, verifying that each card shows at least one skill chip below the issuer/date, without navigating to any detail page.

**Acceptance Scenarios**:

1. **Given** a visitor is on the certificates listing page, **When** they view a certificate card, **Then** they see a horizontal row of labelled skill chips (e.g., `OWASP Top 10`, `Burp Suite`) below the issuer and date.
2. **Given** a certificate has more skills than fit on one line, **When** rendered on a narrow screen, **Then** skill chips wrap to a second line without overflow.
3. **Given** a certificate has no skills defined, **When** rendered, **Then** the card displays correctly with no chip row visible.

---

### User Story 2 - Certificates Grouped by Category (Priority: P2)

A visitor who cares specifically about the site owner's security credentials (vs. development credentials) wants to jump straight to that group. With category grouping, the index page renders a labelled section per category rather than a flat undifferentiated grid.

**Why this priority**: Adds navigational hierarchy that becomes more valuable as the number of certificates grows. Depends on P1's schema additions being in place.

**Independent Test**: Can be tested by loading `/certificates` and confirming that at least two labelled category sections appear, each containing only the certificates belonging to that category.

**Acceptance Scenarios**:

1. **Given** certificates exist in more than one category, **When** the index page loads, **Then** each category renders as a distinct labelled section with its own card grid.
2. **Given** all certificates belong to a single category, **When** the index page loads, **Then** the page renders a single section with that category label.
3. **Given** a certificate is categorised as `Security`, **When** displayed, **Then** it appears only under the "Security" section, not under any other.

---

### User Story 3 - Verified Credentials Identifiable at a Glance (Priority: P3)

A visitor evaluating credentials wants to know immediately which certificates can be independently verified online. Currently no visual signal exists on the listing page. A `✓ Verified` badge on cards that have a `credentialUrl` provides this signal without requiring the visitor to open each detail page.

**Why this priority**: High trust signal. Low implementation effort. Dependent on `credentialUrl` already being in the schema.

**Independent Test**: Can be tested by confirming that cards with a `credentialUrl` show a `✓ Verified` badge in the card corner, and that cards without one show no badge.

**Acceptance Scenarios**:

1. **Given** a certificate has a `credentialUrl`, **When** its card is rendered, **Then** a `✓ Verified` badge is visible on the card.
2. **Given** a certificate has no `credentialUrl`, **When** its card is rendered, **Then** no verification badge appears.
3. **Given** a visitor clicks the `✓ Verified` badge, **When** the link is activated, **Then** the credential verification page opens in a new tab.

---

### User Story 4 - Stats Summary at a Glance (Priority: P4)

A visitor landing on the certificates page immediately sees a one-line summary: total count, number of distinct issuers, and the date span. This frames the scope of the learning record before the visitor scrolls into individual cards.

**Why this priority**: Minimal implementation effort; adds professional polish and gives context without reading every card.

**Independent Test**: Can be tested by verifying a summary line is present at the top of `/certificates` showing the correct total count, issuer count, and date range derived from actual certificate data.

**Acceptance Scenarios**:

1. **Given** 5 certificates from 3 issuers spanning Nov 2025 – Apr 2026, **When** the index page loads, **Then** the summary reads "5 certificates · 3 issuers · Nov 2025 – Apr 2026" (or equivalent wording).
2. **Given** only 1 certificate exists, **When** the index page loads, **Then** the summary reads "1 certificate · 1 issuer · [month year]".
3. **Given** all certificates share the same issue month, **When** the index page loads, **Then** the date span shows a single month rather than a range.

---

### User Story 5 - Certificates Discoverable From Home Page (Priority: P5)

A visitor to the portfolio home page can see the 2 most recently earned certificates in a "Recent Certifications" teaser section, mirroring the existing "From the Blog" and "Series" teasers. This prevents the certificates section from being invisible unless the visitor actively navigates to `/certificates`.

**Why this priority**: Increases discoverability of the certifications. Low effort given the existing teaser pattern. Depends on nothing else in this feature.

**Independent Test**: Can be tested by loading the home page and confirming a "Certifications" section appears, showing the 2 most recent certificates with title and issuer, and a link to `/certificates`.

**Acceptance Scenarios**:

1. **Given** at least one published certificate exists, **When** the home page loads, **Then** a "Certifications" teaser section appears.
2. **Given** 5 certificates exist, **When** the home page loads, **Then** only the 2 most recently issued appear in the teaser.
3. **Given** no published certificates exist, **When** the home page loads, **Then** the certifications section does not render.

---

### Edge Cases

- What happens when a certificate's `skills` array is empty or missing? Card renders without the chip row — no broken layout.
- What happens when only one category exists across all certificates? Index shows a single section with no empty category headers.
- What happens if the earliest and latest certificate share the same month? Stats row shows a single month, not a dash-separated range.
- What if all certificates have the same issuer? Stats row shows "1 issuer" correctly.
- What if a `credentialUrl` is present but the remote page is down? The badge still renders — URL validity is not checked at build time.
- How does a 5-column skill chip row behave on a 320px screen? Chips wrap; no horizontal scroll or clipping.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The certificate content schema MUST include a `skills` field accepting a list of skill label strings, optional with an empty default.
- **FR-002**: The certificate content schema MUST include a `category` field restricted to `Security`, `Development`, `DevOps`, or `Other`.
- **FR-003**: Each of the 5 existing certificate content files MUST be updated to include values for `skills` and `category`.
- **FR-004**: The certificate card component MUST render skill chips below the issuer and date when the certificate has one or more skills defined.
- **FR-005**: The certificate card component MUST display a `✓ Verified` indicator when the certificate has a `credentialUrl`.
- **FR-006**: The certificates index page MUST group certificate cards under labelled category sections rather than rendering a single flat grid.
- **FR-007**: The certificates index page MUST display a summary line above the category sections showing the total certificate count, distinct issuer count, and issue date range.
- **FR-008**: The home page MUST include a "Certifications" teaser section showing up to 2 of the most recently issued certificates, each displaying title and issuer, with a link to the full certificates listing.
- **FR-009**: The "Certifications" teaser section on the home page MUST NOT render when zero published certificates exist.

### Key Entities

- **Certificate**: A credential earned by completing a course or passing an exam. Key attributes: `title`, `issuer`, `issueDate`, `category` (new), `skills[]` (new), `credentialId` (optional), `credentialUrl` (optional), `assetPath`, `draft`.
- **Category**: An enum grouping of certificates — one of `Security`, `Development`, `DevOps`, `Other`. Determines the section header under which a certificate appears on the index page.
- **Skill**: A short label string (e.g., `OWASP Top 10`, `Burp Suite`) associated with a certificate. Rendered as a chip on both the card and the detail page.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor can identify the skills covered by any certificate without leaving the certificates listing page.
- **SC-002**: Certificates are visually separated into at least two labelled groups on the index page (given certificates from multiple categories exist).
- **SC-003**: Verifiable certificates (those with a public credential URL) are distinguishable from non-verifiable ones on the listing page without clicking.
- **SC-004**: The home page communicates that certifications exist without the visitor needing to navigate to `/certificates` first.
- **SC-005**: The summary stats line on the index page accurately reflects the current state of published certificates at every build.
- **SC-006**: All 5 existing certificate pages load without errors after schema and content changes are applied.

## Assumptions

- The site remains a fully static build (Astro); no client-side filtering or search is required for this feature.
- `category` is a fixed enum for now; adding new category values requires a code change, not just content editing.
- Skill labels are free-form strings — no normalisation or deduplication across certificates is required.
- The `✓ Verified` badge on the card links to the `credentialUrl` directly (same behavior as the button on the detail page).
- The home page teaser follows the existing "From the Blog" / "Series" row pattern (title + metadata, no thumbnail image) rather than rendering full `CertificateCard` components.
- Richer markdown body content for each certificate (narrative description of what was covered) is out of scope for this feature pass — that is editorial work done separately.
- The timeline view idea is explicitly deferred and out of scope for this feature.
