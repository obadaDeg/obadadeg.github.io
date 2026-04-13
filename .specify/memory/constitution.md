<!--
SYNC IMPACT REPORT
Version change: template (unversioned) → 1.0.0
Bump type: MINOR — initial population of all principles and sections from blank template.

Modified principles:
  [PRINCIPLE_1_NAME] → I. Code Quality & TypeScript Discipline (new)
  [PRINCIPLE_2_NAME] → II. Testing & Build Integrity (new)
  [PRINCIPLE_3_NAME] → III. User Experience Consistency (new)
  [PRINCIPLE_4_NAME] → IV. Performance & Deployment Standards (new)
  [PRINCIPLE_5_NAME] → removed (4 principles cover the project scope)

Added sections:
  - Technology Constraints
  - Quality Gates & Workflow
  - Governance (populated from template stub)

Removed sections:
  - [SECTION_2_NAME] / [SECTION_3_NAME] placeholders replaced with named sections above

Templates requiring updates:
  - .specify/templates/plan-template.md ✅ aligned — Constitution Check is a per-feature
    placeholder; no hardcoded principle names to update.
  - .specify/templates/spec-template.md ✅ aligned — no constitution-specific references.
  - .specify/templates/tasks-template.md ✅ aligned — no constitution-specific references.
  - No command files found under .specify/templates/commands/ — N/A.

Deferred TODOs: None — all placeholders resolved.
-->

# ObadaDeg Portfolio Constitution

## Core Principles

### I. Code Quality & TypeScript Discipline

All source files MUST be authored in Astro components or TypeScript. React, Vue, and
any third-party JS framework components are prohibited. JavaScript is permitted only for
Astro-native client-side interactivity (e.g., `client:load` islands) when no static
alternative exists — every island MUST be individually justified in the implementation
plan. Content Collections schema MUST be fully typed in `src/content/config.ts`;
untyped or loosely-typed frontmatter fields are prohibited.

**Rationale**: The project explicitly targets "no unnecessary JS" and pure Astro static
output (`docs/requirements.md` Section 2). TypeScript enforcement catches schema drift
in content frontmatter at build time, preventing broken page renders in production.

### II. Testing & Build Integrity

- `pnpm build` MUST complete with zero errors and zero warnings before any merge to `main`.
- All pages MUST render without layout breaks at 375px (mobile) and 1440px (desktop).
- All internal navigation links MUST resolve to valid routes
  (`/`, `/projects`, `/writeups`, `/blog`, `/contact`).
- Markdown content (writeups, blog posts) MUST correctly render headings, lists,
  code blocks, and blockquotes using the Post layout.
- Code blocks MUST display Shiki syntax highlighting (`github-dark-dimmed` theme)
  and MUST include a functional copy button.
- No placeholder text may appear in production builds, except fields explicitly annotated
  for manual completion (email address, LinkedIn URL, resume PDF link).

**Rationale**: `docs/requirements.md` Section 10 defines these as ship-blocking quality
gates. Any unverified item risks a broken experience for the primary audiences
(recruiters and the CTF/security community), directly undermining the site's purpose.

### III. User Experience Consistency

The design system in `docs/requirements.md` Section 3 is the authoritative source of
truth and MUST be applied uniformly across all pages and components:

- CSS custom properties (`--color-bg`, `--color-surface`, `--color-border`,
  `--color-text`, `--color-muted`, `--color-accent`, `--color-accent-dim`) MUST be
  declared in `src/styles/global.css` and MUST NOT be overridden via inline styles
  or arbitrary Tailwind values.
- Accent color (`#7efff5`) MUST appear ONLY on: active nav links, link hover states,
  tag pills, and terminal-style decorators (`>_` etc.). No other usage is permitted.
- Typography MUST use `Syne` for headings and `IBM Plex Mono` for body and code;
  no other font families are permitted.
- Maximum content width: `768px` for prose layouts, `1100px` for all other layouts.
- External links MUST open in `target="_blank"` and MUST include a `↗` indicator icon.
- Page transitions MUST use Astro's `<ViewTransitions />` with an opacity fade only;
  slide, bounce, or flip transitions are prohibited.

**Rationale**: The site's credibility with recruiters and the security community depends
on a cohesive, intentional aesthetic. Design inconsistency signals carelessness —
the opposite of "designed by someone who cares about craft"
(`docs/requirements.md` Section 1).

### IV. Performance & Deployment Standards

- The site MUST be fully static — no server-side rendering, no serverless functions,
  and no data fetched client-side at page load are permitted.
- `pnpm build` output (`dist/`) MUST be directly deployable to GitHub Pages without
  post-build modification.
- The GitHub Actions workflow (`.github/workflows/deploy.yml`) MUST trigger on every
  push to `main` using the Node.js and pnpm versions specified in
  `docs/requirements.md` Section 8.
- `astro.config.mjs` MUST declare `site: 'https://obadadeg.github.io'` at all times;
  removing or changing this value constitutes a breaking change requiring a MAJOR
  version bump to this constitution.
- No third-party analytics scripts, tracking pixels, or external font sources beyond
  Google Fonts CDN (as specified in requirements) are permitted.

**Rationale**: GitHub Pages enforces a strict static-only constraint — dynamic runtime
dependencies break deployment silently. Page load performance also directly affects
first impressions for recruiters visiting the site.

## Technology Constraints

- **Framework**: Astro 4.x — no downgrades permitted; minor/patch upgrades do not
  require a constitution amendment.
- **Styling**: Tailwind CSS v3 — utility classes only; no alternative CSS frameworks
  or CSS-in-JS solutions.
- **Package manager**: pnpm — `npm` and `yarn` lock files MUST NOT be committed.
- **Syntax highlighting**: Shiki via Astro built-in — external Prism or highlight.js
  integrations are prohibited.
- **Icons**: Astro Icon + Iconify — icon fonts that load external resources (e.g.,
  Font Awesome CDN) are prohibited.
- **Deployment target**: GitHub Pages at `https://obadadeg.github.io` — migrating to
  an alternative hosting platform requires a MAJOR constitution amendment.

## Quality Gates & Workflow

Before any feature branch is merged to `main`, the implementer MUST verify all items
in the Quality Checklist (`docs/requirements.md` Section 10). Implementation plans MUST
include a Constitution Check section that explicitly validates compliance with
Principles I–IV before Phase 0 research begins and re-validates after Phase 1 design.

**Amendment procedure**:

1. Propose the change on a dedicated branch with a written rationale.
2. Increment `CONSTITUTION_VERSION` following semantic versioning rules
   (MAJOR: principle removal/redefinition; MINOR: new principle or section added;
   PATCH: clarification or wording fix).
3. Update `LAST_AMENDED_DATE` to the ISO date of the amendment.
4. Propagate changes to all `.specify/templates/*.md` files that reference amended
   principles or sections.
5. Commit with message: `docs: amend constitution to vX.Y.Z (<one-line summary>)`.

**Compliance review**: Every implementation plan's Constitution Check section MUST
confirm compliance with each of the four Core Principles before work begins.

## Governance

This constitution supersedes all other development practices and conventions for the
ObadaDeg Portfolio project. All implementation decisions MUST be traceable to one or
more of the four Core Principles. Complexity introduced without a principle-backed
justification MUST be removed or refactored before merge.

`docs/requirements.md` remains the authoritative runtime specification for content
schemas, page structure, design tokens, and deployment configuration. This constitution
governs *how* the project is built; requirements.md governs *what* is built.

**Version**: 1.0.0 | **Ratified**: 2026-04-13 | **Last Amended**: 2026-04-13
