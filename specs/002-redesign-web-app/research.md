# Research: Visual Redesign with Animations

**Feature**: 002-redesign-web-app  
**Phase**: 0 — Research  
**Date**: 2026-04-13

---

## Decision 1: Page Transition Implementation

**Decision**: Customize the existing Astro `<ViewTransitions />` opacity fade via `::view-transition-old(root)` and `::view-transition-new(root)` CSS pseudo-elements in `global.css`.

**Rationale**: `<ViewTransitions />` is already installed in `Base.astro`. Overriding the default CSS gives precise control over duration and easing without any additional dependencies. The opacity-only constraint from Constitution III is fully compatible with this approach.

**Implementation detail**:
```css
/* Override default Astro ViewTransitions timing */
::view-transition-old(root) {
  animation-duration: 200ms;
  animation-timing-function: ease-in;
}
::view-transition-new(root) {
  animation-duration: 250ms;
  animation-timing-function: ease-out;
}
```

**Alternatives considered**:
- Manual route change listener + CSS class toggle — rejected (duplicates ViewTransitions, breaks browser back/forward navigation)
- Astro slide/flip transitions — rejected (prohibited by Constitution III; opacity fade only)

---

## Decision 2: Scroll-triggered Entrance Animations

**Decision**: Use the native `IntersectionObserver` browser API via a `<script>` tag in `Base.astro`.

**Pattern**:
1. Elements intended to animate get the `.animate-on-scroll` class at build time, and initial CSS sets them to `opacity: 0; transform: translateY(16px)`.
2. A small `<script>` (~35 lines) in `Base.astro` registers an `IntersectionObserver` on all `.animate-on-scroll` elements and adds `.in-view` when they cross a 10% intersection threshold.
3. CSS transitions on `.in-view` handle the visual change: `opacity: 1; transform: none`.
4. The script checks `prefers-reduced-motion` before activating; if reduce-motion is active, `.in-view` is added immediately to all elements (no animation plays, content remains visible).
5. The observer uses `astro:page-load` event to re-query elements after ViewTransitions page swaps.

**Constitution justification (Principle I)**: This is a native browser API placed in a standard Astro `<script>` tag, not a third-party library. The constitution restricts `client:load` islands, not native `<script>` tags in layouts. No viable CSS-only cross-browser scroll trigger exists: `animation-timeline: view()` requires Chrome 115+ and has incomplete Safari support as of early 2026 — it cannot be used as the primary mechanism.

**Alternatives considered**:
- CSS `animation-timeline: view()` — rejected (incomplete browser support; Safari lacks it)
- Astro `client:visible` island per section — rejected (would convert every section component to a client island; excessive JS surface)
- No scroll animations — rejects a core feature requirement (FR-004)

---

## Decision 3: Hero Section Entrance Stagger

**Decision**: Pure CSS `@keyframes fade-up` with staggered `animation-delay` on each hero child element. No JavaScript involved.

**Rationale**: The hero section is always in the first viewport — no scroll trigger is needed. CSS-only is the correct solution here.

**Animation schedule**:
| Element | Delay | Duration |
|---------|-------|----------|
| Hero name (h1) | 0ms | 500ms |
| Terminal block / role subtitle | 150ms | 500ms |
| Bio text | 300ms | 500ms |
| CTA link | 450ms | 500ms |

**Easing**: `ease-out` — fast initial motion that decelerates smoothly, matching the cyberpunk "snap into position" feel.

**Alternatives considered**:
- JS-driven stagger (GSAP-style) — rejected (no third-party animation libraries permitted; CSS achieves identical result)

---

## Decision 4: Card Hover Micro-interactions

**Decision**: CSS `transition` upgrades on existing project and writeup cards — add `transform: translateY(-3px)` lift + `box-shadow` accent glow on hover.

**ProjectCard upgrade**:
```css
.project-card {
  transition: border-color 0.2s ease, transform 0.2s ease-out, box-shadow 0.2s ease;
}
.project-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(126, 255, 245, 0.07);
}
```

**WriteupCard upgrade**: Add a subtle left-border grow + background tint on row hover (replaces the current title-only color change).

**Rationale**: The lift + accent glow is a standard "cyberpunk card" pattern — immediately communicates interactivity while staying within the dark palette. Pure CSS, zero JS.

---

## Decision 5: Category Filter Transition (Writeups Page)

**Decision**: Retain the existing page-navigation approach (TagPill links to `/writeups/category/[cat]`). ViewTransitions (Decision 1) handles the smooth fade between category pages.

**Rationale**: Client-side filtering would require a `client:load` island with filter state — adds JS complexity for marginal UX improvement. The existing route-based approach with ViewTransitions provides comparable smoothness and is fully compatible with static generation.

**Alternative considered**: `client:load` JavaScript filter island — rejected per Constitution I (JavaScript only when no static alternative exists; page navigation is a fully viable alternative here).

---

## Decision 6: Animation Timing & Easing Standards

| Animation type | Duration | Easing | Delay |
|----------------|----------|--------|-------|
| Page transition (fade out) | 200ms | ease-in | — |
| Page transition (fade in) | 250ms | ease-out | — |
| Hero entrance stagger | 500ms | ease-out | 0–450ms per element |
| Scroll entrance | 400ms | ease-out | 0ms (trigger-based) |
| Card hover (lift + glow) | 200ms | ease-out | — |
| Nav / link hover | 150ms | ease | — |

All durations are under the 500ms success criterion (SC-002).

---

## Decision 7: `prefers-reduced-motion` Compliance

**Decision**: Two-layer implementation — CSS and JavaScript.

**CSS layer** (`global.css`):
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

**JS layer** (Base.astro `<script>`): Before registering IntersectionObserver, check `window.matchMedia('(prefers-reduced-motion: reduce)').matches`. If true, add `.in-view` immediately to all `.animate-on-scroll` elements (content remains visible instantly, no animation).

**Rationale**: CSS layer handles all CSS-driven animations. JS layer handles the IntersectionObserver-controlled animation class pattern. Both must be covered for full compliance (SC-005, FR-008).

---

## Decision 8: Glow Accent Values

The accent color `#7efff5` in RGBA is `rgba(126, 255, 245, N)`. Box-shadow and background tints use low opacity (0.05–0.10) to create glow without washing out the dark palette.

The CSS variable `--color-accent-dim: #7efff520` (hex with 12% opacity) is already defined and should be used for background tints. For box-shadow, use `rgba(126, 255, 245, 0.07)` directly since `box-shadow` does not accept CSS custom properties with hex+alpha shorthand in all browsers.
