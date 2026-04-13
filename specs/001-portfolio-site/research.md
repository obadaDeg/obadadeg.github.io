# Research: Personal Portfolio Site

**Branch**: `001-portfolio-site` | **Date**: 2026-04-13

## Decision Log

---

### Decision 1: Category Filtering for Writeups

**Decision**: Static tag-based navigation pages rendered at build time.
Each category gets its own route (`/writeups/category/[category]`) generated
via Astro's `getStaticPaths()`. Clicking a category tag navigates to that route.

**Rationale**: The spec (FR-007) and constitution (Principle IV) both require
no client-side data fetching at page load. Static pages satisfy GitHub Pages
constraints, require zero JavaScript, and are fully crawlable by search engines.

**Alternatives considered**:
- Client-side JavaScript filtering (rejected — violates Principle IV, adds unnecessary JS)
- Server-side filtering via query params (rejected — no SSR on GitHub Pages)

---

### Decision 2: Copy-to-Clipboard Button

**Decision**: `CopyButton.astro` as an Astro `client:load` island. This is
the only client-side JS island in the project.

**Rationale**: The Clipboard API (`navigator.clipboard.writeText()`) is
browser-only and cannot be executed at build time. An Astro island with
`client:load` hydrates the component after page load with minimal JS overhead.
This is the exact use case Astro islands were designed for.

**Alternatives considered**:
- No copy button (rejected — required by spec FR-011 and constitution Principle II)
- Inline `onclick` script tag (rejected — violates Principle I, harder to maintain)

---

### Decision 3: Table of Contents Generation

**Decision**: Use Astro Content Collections' built-in `headings` property returned
by `entry.render()`. When rendering a writeup with `const { Content, headings } =
await entry.render()`, Astro provides a typed `headings` array
`{ depth, slug, text }[]`. Filter to `depth === 2` (## headings) and render as
a `<nav>` list in the Post layout.

**Rationale**: Zero additional dependencies. Build-time, fully static. Accurate
because Astro parses the actual markdown AST. Consistent with Principle I
(no unnecessary dependencies).

**Alternatives considered**:
- remark-toc plugin (rejected — adds dependency, generates ToC inline in content,
  harder to style independently)
- Client-side DOM scanning (rejected — violates Principle IV)

---

### Decision 4: Page Transitions

**Decision**: Astro's `<ViewTransitions />` component in `Base.astro` with
`transition:animate="fade"` on the main content wrapper.

**Rationale**: Native browser View Transitions API with Astro's fallback polyfill.
Gracefully degrades to instant navigation in unsupported browsers. Strictly limited
to opacity fade per constitution Principle III. Zero additional dependencies.

**Alternatives considered**:
- CSS transition libraries (rejected — unnecessary JS dependency)
- No transitions (acceptable fallback, but ViewTransitions is free given Astro built-in)

---

### Decision 5: Font Loading

**Decision**: Google Fonts CDN via `<link>` preconnect + `<link>` stylesheet in
`Base.astro` `<head>`. Load `Syne` (400, 600, 700) and `IBM Plex Mono` (400, 500).

**Rationale**: Permitted explicitly by constitution Principle IV ("Google Fonts CDN
is permitted"). Simplest approach — no self-hosting setup, no build-time font
optimization needed for a portfolio site at this scale.

**Alternatives considered**:
- Self-hosted fonts via `@fontsource` npm packages (viable but adds install overhead;
  acceptable future upgrade if performance becomes a concern)

---

### Decision 6: GitHub Actions Deployment

**Decision**: Use the official `withastro/action` GitHub Action for the build step,
combined with `actions/deploy-pages` for deployment. Exact workflow from
`docs/requirements.md` Section 8.

**Rationale**: The requirements document specifies the exact workflow and versions.
Using `withastro/action` handles pnpm detection automatically and sets up the
correct build environment.

---

### Decision 7: Mobile Navigation

**Decision**: CSS-only hamburger menu using a hidden `<input type="checkbox">` toggle
pattern. No JavaScript. Menu slides in/out via CSS transitions on the checkbox state.

**Rationale**: No JS means no hydration, no event listeners, no flash. Astro's
island model makes JS trivially easy to add, but the CSS toggle pattern is proven
and accessible when implemented with proper `<label>` and `aria-*` attributes.

**Alternatives considered**:
- Astro `client:load` island for menu toggle (acceptable but unnecessary when CSS
  alone suffices)

---

### Decision 8: Syntax Highlighting

**Decision**: Shiki via Astro's built-in markdown processor. Theme:
`github-dark-dimmed`. Configured in `astro.config.mjs`:
```js
markdown: { shikiConfig: { theme: 'github-dark-dimmed' } }
```

**Rationale**: Zero-dependency, build-time, no client JS. Required by requirements.md
Section 3.5 and enforced by constitution Principle I (no external Prism/highlight.js).
