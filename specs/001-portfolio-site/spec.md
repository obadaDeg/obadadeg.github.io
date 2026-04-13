# Feature Specification: Personal Portfolio Site

**Feature Branch**: `001-portfolio-site`
**Created**: 2026-04-13
**Status**: Draft
**Input**: Build a personal portfolio site for Obada Daghlas with CTF writeups, projects, and blog — deployed to GitHub Pages

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Recruiter Evaluates Candidate (Priority: P1)

A recruiter or hiring manager lands on the site and needs to quickly assess Obada's identity,
background, and technical credibility. They expect to find a bio, a summary of skills (through
projects), and clear contact paths — all without reading walls of text.

**Why this priority**: Recruiters are the primary conversion audience. If this flow fails, the
site fails its core purpose.

**Independent Test**: A person unfamiliar with Obada can open the home page cold and within 30
seconds find his name, role title, a brief bio, at least one featured project, and a link to
contact him or view his GitHub — without scrolling past the visible viewport on desktop.

**Acceptance Scenarios**:

1. **Given** a recruiter arrives at the home page, **When** the page loads, **Then** they see
   Obada's full name, professional title, a 2–3 sentence bio, and a prominent GitHub link above
   the fold on desktop.
2. **Given** a recruiter wants to see project work, **When** they scroll the home page or click
   Projects, **Then** they see project cards with name, short description, and tech tags for
   each project.
3. **Given** a recruiter wants to reach out, **When** they navigate to the Contact page, **Then**
   they see at least one working contact method (email, LinkedIn, or GitHub) without filling in
   a form.

---

### User Story 2 — CTF Community Member Reads a Writeup (Priority: P2)

A security researcher or CTF player finds the site through a search or shared link and wants to
read a specific challenge writeup. They need structured technical content with code examples,
a clear metadata header (CTF name, category, difficulty), and easy navigation within long posts.

**Why this priority**: This is the secondary audience that builds Obada's technical credibility
in the security community — a key differentiator versus other candidates.

**Independent Test**: A user can navigate from the writeups listing page to a full writeup page
in at most 2 clicks, and on the writeup page immediately see the CTF name, category, difficulty,
and a table of contents.

**Acceptance Scenarios**:

1. **Given** a user visits the Writeups listing, **When** the page loads, **Then** they see a
   list of writeups each showing challenge name, CTF event, category tag, difficulty, and date.
2. **Given** a user wants to find writeups by category, **When** they click a category tag
   (e.g., "Web"), **Then** only writeups of that category are shown.
3. **Given** a user clicks a writeup, **When** the writeup page loads, **Then** they see a
   metadata block (CTF, category, difficulty, date), an auto-generated table of contents from
   section headings, and formatted prose with syntax-highlighted code blocks.
4. **Given** a user is reading a writeup, **When** they want to copy a code snippet, **Then**
   a copy button is present on every code block and successfully copies the code to clipboard.

---

### User Story 3 — Blog Reader Reads a Technical Post (Priority: P3)

A developer or security enthusiast finds a blog post linked externally and wants to read a
longer-form technical piece outside the CTF writeup format.

**Why this priority**: Blog content broadens reach and SEO discoverability, but is lower
priority than writeups at launch.

**Independent Test**: A user can navigate from the Blog listing to a full post and read
formatted markdown content (headings, lists, code, blockquotes) without layout issues.

**Acceptance Scenarios**:

1. **Given** a user visits the Blog listing, **When** the page loads, **Then** they see posts
   each showing title, date, tags, and a one-sentence excerpt.
2. **Given** a user clicks a post, **When** the post page loads, **Then** the full markdown
   content renders correctly including headings, lists, code blocks, and blockquotes.

---

### User Story 4 — Content Author Publishes New Content (Priority: P4)

Obada (the site owner) wants to publish a new project, writeup, or blog post without touching
any build configuration — only by adding a Markdown file with the correct metadata and pushing
to the main branch.

**Why this priority**: Sustainable content authorship is essential for the site to grow over
time, but it is not a launch blocker.

**Independent Test**: Obada can add a new writeup Markdown file with the documented frontmatter
format, push to main, and the writeup appears on the live site within 5 minutes — with no other
changes required.

**Acceptance Scenarios**:

1. **Given** Obada creates a new project Markdown file with the required metadata fields,
   **When** he pushes to the main branch, **Then** the project appears on the Projects page
   automatically.
2. **Given** Obada creates a new writeup Markdown file, **When** he pushes to main, **Then**
   the writeup appears on the Writeups listing and is accessible at its own URL.
3. **Given** Obada creates a new blog post Markdown file, **When** he pushes to main, **Then**
   the post appears on the Blog listing and is accessible at its own URL.

---

### Edge Cases

- What happens when the writeups list is empty? The listing page MUST display a friendly
  "No writeups yet" message rather than a blank or broken layout.
- What happens when a project has no demo link? The project card MUST render correctly
  without a demo link — the field is optional.
- What happens when a blog post has no tags? The post MUST display without a tag section
  rather than an empty tag area.
- What happens when a user visits an invalid URL (e.g., `/writeups/nonexistent`)? A
  user-friendly 404 page MUST be served.
- What happens on a very narrow screen (375px)? All pages MUST render without horizontal
  overflow or overlapping elements.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The home page MUST display the owner's full name, professional title, and a
  2–3 sentence bio.
- **FR-002**: The home page MUST display a prominent link to the owner's GitHub profile.
- **FR-003**: The home page MUST show up to 3 featured projects (cards), up to 3 recent
  writeups (cards), and up to 2 recent blog posts (cards).
- **FR-004**: The Projects page MUST display all projects in a grid layout, each card showing
  name, short description, tech stack tags, and a GitHub link.
- **FR-005**: Project cards MUST optionally show a live demo link and a "featured" badge.
- **FR-006**: The Writeups listing MUST display all writeups sorted by date (newest first),
  each entry showing challenge name, CTF event name, category tag, difficulty tag, and date.
- **FR-007**: The Writeups listing MUST support filtering by category via tag links; clicking
  a category tag MUST show only writeups of that category.
- **FR-008**: Each individual writeup page MUST include: a metadata header block (CTF name,
  category, difficulty, date), an auto-generated table of contents derived from section
  headings, and the full prose body with formatted code blocks.
- **FR-009**: The Blog listing MUST display all posts sorted by date (newest first), each
  entry showing title, date, tags, and a one-sentence excerpt.
- **FR-010**: Each individual blog post page MUST render full markdown content (headings,
  lists, code blocks, blockquotes) within a readable prose layout.
- **FR-011**: Every code block in writeups and blog posts MUST include syntax highlighting
  and a one-click copy-to-clipboard button.
- **FR-012**: The Contact page MUST display contact information (email, GitHub, LinkedIn)
  without a form.
- **FR-013**: The Contact page MUST include a navigation link to the owner's resume (PDF),
  opening in a new tab.
- **FR-014**: A persistent navigation bar MUST be visible on all pages, linking to: Home,
  Projects, Writeups, Blog, Contact, and Resume.
- **FR-015**: The active page MUST be visually indicated in the navigation bar.
- **FR-016**: Navigation MUST be accessible and functional on mobile screens (375px) via a
  collapsed menu.
- **FR-017**: All external links MUST open in a new browser tab with a visual indicator
  (e.g., an arrow icon).
- **FR-018**: Page transitions MUST use a subtle animation that does not disrupt reading.
- **FR-019**: The site MUST deploy automatically when the main branch is updated, with no
  manual build or upload steps required.
- **FR-020**: A content author MUST be able to add a new project, writeup, or blog post by
  creating a single Markdown file with the documented metadata fields and pushing to main.
- **FR-021**: The site MUST serve a user-friendly 404 page for any unrecognized URL.

### Key Entities

- **Project**: title, short description, tech stack tags (list), GitHub URL, demo URL
  (optional), featured flag (boolean), publication date
- **Writeup**: challenge title, CTF event name, category (Web | Pwn | Crypto | Forensics |
  Misc | OSINT), difficulty (Easy | Medium | Hard), publication date, tags (list), one-sentence
  excerpt, full body content
- **BlogPost**: title, publication date, tags (list), one-sentence excerpt, full body content

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can identify Obada's name, role, and GitHub link within
  10 seconds of the home page loading, without scrolling on a 1440px desktop screen.
- **SC-002**: A user can reach a specific writeup from the writeups listing in 2 clicks or
  fewer.
- **SC-003**: A new piece of content (project, writeup, or blog post) becomes publicly
  accessible on the live site within 5 minutes of the author pushing the change.
- **SC-004**: All pages render without layout breaks or horizontal overflow at both 375px
  (mobile) and 1440px (desktop) screen widths.
- **SC-005**: Every code block in content pages offers a working copy-to-clipboard action
  with a single click.
- **SC-006**: The site build completes with zero errors, confirming no broken pages or
  missing content.

## Assumptions

- The site is public and read-only — no authentication, admin interface, or user accounts
  are in scope.
- Obada is the sole content author; multi-author workflows are out of scope.
- The contact page uses static links only (email address, LinkedIn URL, GitHub URL) —
  no server-side form submission.
- The resume is hosted as an external PDF (Google Drive or similar); only the link is
  in scope, not PDF generation or hosting.
- Email address, LinkedIn URL, and resume PDF link are placeholders at launch and will be
  filled in by Obada before publishing.
- The site launches with seed content (placeholder projects, writeups, and blog posts) to
  demonstrate the layout; real content will be added incrementally.
- Category filtering for writeups uses static tag-based navigation pages — no client-side
  JavaScript filtering.
- The site is deployed to a public GitHub Pages URL (`https://obadadeg.github.io`) and
  no custom domain is in scope at launch.
- A minimal footer with the owner's name and GitHub link is sufficient.
