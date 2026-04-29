# Implementation Plan: Visual Redesign with Animations

**Branch**: `002-redesign-web-app` | **Date**: 2026-04-13 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/002-redesign-web-app/spec.md`

## Summary

Enhance the existing dark cyberpunk portfolio with purposeful motion: staggered hero entrance animation, scroll-triggered section reveals, page-to-page fade transitions, and card hover micro-interactions. The dark color palette and typography remain unchanged. All animations comply with `prefers-reduced-motion`. No new JavaScript libraries are introduced — CSS-first with a single IntersectionObserver script in the base layout.

## Technical Context

**Language/Version**: TypeScript / Astro 4.x component model  
**Primary Dependencies**: Astro 4.x (ViewTransitions built-in), Tailwind CSS v3, astro-icon  
**Storage**: N/A — fully static site  
**Testing**: `pnpm build` (zero errors, zero warnings); manual viewport testing at 375px, 768px, 1440px; `prefers-reduced-motion` verification in browser DevTools  
**Target Platform**: GitHub Pages — static HTML/CSS with minimal JS (`<script>` tags, no runtime framework)  
**Project Type**: Static portfolio web application  
**Performance Goals**: Lighthouse Performance ≥ 85 on desktop after animation changes; all animations complete in ≤ 500ms  
**Constraints**: Opacity-only page transitions (Constitution III); CSS-first animations; no third-party animation libraries; `prefers-reduced-motion` required at both CSS and JS layers  
**Scale/Scope**: 6 page types, 19 source files; animation changes affect ~8 components and 2 layouts

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked post-design below.*

### Pre-research Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Code Quality & TypeScript Discipline | PASS | No new frameworks. IntersectionObserver is a native browser API in a `<script>` tag (not a `client:load` island). No island justification required. TypeScript prop interfaces unchanged. |
| II. Testing & Build Integrity | PASS | `pnpm build` must complete with zero errors. All pages tested at 375px and 1440px. No placeholder text introduced. |
| III. UX Consistency | PARTIAL — constraint documented | Page transitions MUST be opacity fade only. Spec mentioned "slide" as an option — **this is prohibited by Constitution III**. Implementation is restricted to opacity fade via ViewTransitions CSS. All CSS custom properties retained; no inline style overrides introduced. Accent color usage rules apply unchanged. |
| IV. Performance & Deployment Standards | PASS | Site remains fully static. Build output is deployable to GitHub Pages unchanged. `astro.config.mjs` is not modified. No external scripts beyond existing Google Fonts CDN. |

**Constitution III constraint propagated to spec**: FR-005 and the writeup category transition (FR-009) are satisfied by ViewTransitions opacity fade — not slide/crossfade.

### Post-design Re-check

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Code Quality | PASS | One `<script>` tag added to Base.astro (IntersectionObserver, ~35 lines). No new islands. |
| II. Build Integrity | PASS | No new routes, no schema changes, no content changes. `pnpm build` expected to pass. |
| III. UX Consistency | PASS | ViewTransitions opacity fade retained; CSS custom properties used exclusively (no inline style additions); accent color usage stays within permitted elements. |
| IV. Performance & Deployment | PASS | All animation is CSS-driven; no runtime fetch, no SSR, no serverless. |

## Project Structure

### Documentation (this feature)

```text
specs/002-redesign-web-app/
├── plan.md              ← This file
├── research.md          ← Phase 0 output (8 decisions)
├── quickstart.md        ← Phase 1 output (testing guide)
├── checklists/
│   └── requirements.md  ← Spec quality validation (all pass)
└── tasks.md             ← Phase 2 output (/speckit.tasks)
```

### Source Code — Files Modified by This Feature

```text
src/
├── styles/
│   └── global.css              ← ADD: @keyframes, .animate-on-scroll, ::view-transition-* CSS,
│                                         prefers-reduced-motion block
├── layouts/
│   └── Base.astro              ← ADD: IntersectionObserver <script> tag (astro:page-load aware)
├── pages/
│   └── index.astro             ← ADD: .animate-on-scroll classes on hero children and section wrappers
├── components/
│   ├── ProjectCard.astro       ← UPGRADE: hover lift + box-shadow glow
│   ├── WriteupCard.astro       ← UPGRADE: row hover background tint + left border indicator
│   ├── TagPill.astro           ← UPGRADE: hover scale micro-animation
│   ├── BlogCard.astro          ← UPGRADE: hover lift (match ProjectCard pattern)
│   └── Nav.astro               ← UPGRADE: active indicator underline animation, logo glow
└── layouts/
    └── Post.astro              ← UPGRADE: post-content entrance animation (back-link + article fade-in)
```

**No new files created in src/**. No new routes. No schema changes.

**Data-model**: N/A — this feature introduces no new data entities.  
**Contracts**: N/A — no new API routes, external interfaces, or content schema changes.

## Animation System Design

### CSS Keyframes (added to `global.css`)

```css
@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

### Scroll-trigger Pattern

```css
/* Initial state — set at build time */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}

/* In-view state — added by IntersectionObserver JS */
.animate-on-scroll.in-view {
  opacity: 1;
  transform: translateY(0);
}
```

### Hero Stagger (pure CSS, no JS)

```css
.hero-name    { animation: fade-up 0.5s ease-out 0.00s both; }
.hero-term    { animation: fade-up 0.5s ease-out 0.15s both; }  /* terminal block */
.hero-role    { animation: fade-up 0.5s ease-out 0.15s both; }  /* role subtitle */
.hero-bio     { animation: fade-up 0.5s ease-out 0.30s both; }
.hero-cta     { animation: fade-up 0.5s ease-out 0.45s both; }
```

### ViewTransitions Customization

```css
::view-transition-old(root) {
  animation-duration: 180ms;
  animation-timing-function: ease-in;
}
::view-transition-new(root) {
  animation-duration: 240ms;
  animation-timing-function: ease-out;
}
```

### prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### IntersectionObserver Script (Base.astro)

```js
// Placed in Base.astro <script> tag
function initScrollAnimations() {
  // Respect user motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('in-view');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// Run on first load and after every ViewTransitions page swap
document.addEventListener('astro:page-load', initScrollAnimations);
```

## Component-level Changes

### `ProjectCard.astro`

Upgrade hover from border-color-only to lift + glow:
```css
.project-card {
  transition: border-color 0.2s ease, transform 0.2s ease-out, box-shadow 0.2s ease-out;
}
.project-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(126, 255, 245, 0.07);
}
```

### `WriteupCard.astro`

Upgrade row hover from title-only color change to full-row visual:
```css
.writeup-card {
  transition: background 0.15s ease, padding-left 0.15s ease;
  border-radius: 4px;
  padding-left: 0.5rem;
  margin-left: -0.5rem;  /* compensate to avoid layout shift */
}
.writeup-card:hover {
  background: var(--color-surface);
  padding-left: 0.75rem;
}
```

### `TagPill.astro`

Add subtle scale on hover:
```css
.tag-pill {
  transition: transform 0.15s ease, background 0.15s ease;
}
.tag-pill:hover {
  transform: scale(1.05);
}
```

### `Nav.astro`

Add sliding underline indicator to active/hover nav links:
```css
.nav-link::after {
  content: '';
  display: block;
  height: 1px;
  background: var(--color-accent);
  transform: scaleX(0);
  transition: transform 0.2s ease;
}
.nav-link:hover::after,
.nav-link.active::after {
  transform: scaleX(1);
}
```

## Complexity Tracking

No Constitution violations. No complexity table required.

## Risk Register

| Risk | Likelihood | Mitigation |
|------|------------|-----------|
| IntersectionObserver causes FOUC (Flash of Unstyled Content) if CSS loads after JS | Low | `.animate-on-scroll` initial state set in `global.css` (loaded synchronously in `<head>`); JS only adds `.in-view` |
| ViewTransitions breaks IntersectionObserver re-registration | Low | Script uses `astro:page-load` event (fires after each VT page swap) to re-query elements |
| Animation performance drop on low-end devices | Low | CSS `transition` is GPU-accelerated (opacity + transform only); no JS animation loop |
| Box-shadow glow makes cards look "too bright" | Medium | Use very low opacity (0.07); test on actual dark display |
| `prefers-reduced-motion` not covering all animation paths | Low | CSS `!important` block covers all transitions/animations globally; JS layer covers IntersectionObserver trigger |
