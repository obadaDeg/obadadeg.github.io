# Quickstart: Visual Redesign with Animations

**Feature**: 002-redesign-web-app  
**Branch**: `002-redesign-web-app`

## What This Feature Changes

This feature adds motion and visual polish to the existing portfolio site. **No data, routes, or content schemas change.** Only CSS, layout scripts, and component hover styles are modified.

## Local Development

```bash
# Ensure you're on the feature branch
git checkout 002-redesign-web-app

# Install dependencies (if not already done)
pnpm install

# Start dev server
pnpm dev
# → http://localhost:4321/obadaDeg/
```

## How to Test Animations

### 1. Hero entrance stagger (home page)
- Open `http://localhost:4321/obadaDeg/`
- Hard-refresh (Ctrl+Shift+R / Cmd+Shift+R) to replay the entrance animation
- Expected: Name fades up first, then terminal block + role, then bio, then CTA — 500ms each with 150ms stagger

### 2. Scroll-triggered sections (home page)
- Open the home page, scroll down slowly past "Featured Projects" and "Recent Writeups"
- Expected: Each section fades up (opacity + slight translateY) as it enters the viewport
- Note: Animation triggers once per element per page load (IntersectionObserver unobserves after first trigger)

### 3. Page transitions
- Click any nav link (Projects, Writeups, Blog, Contact)
- Expected: Current page content fades out (180ms), new page content fades in (240ms)
- Should feel smooth, not jarring

### 4. Card hover micro-interactions
- Hover over a project card → Expected: lifts 3px, subtle teal glow box-shadow, border highlights
- Hover over a writeup row → Expected: light background tint + slight left padding increase
- Hover over a TagPill → Expected: 5% scale up

### 5. Nav underline indicator
- Hover over nav links on desktop → Expected: teal underline slides in from center
- Active page link → underline is always visible

## Testing prefers-reduced-motion

**Chrome DevTools**:
1. Open DevTools → Rendering tab (via three-dot menu → More tools → Rendering)
2. Check "Emulate CSS media feature prefers-reduced-motion: reduce"
3. Reload the page
4. Expected: No animations play. Hero loads with full opacity immediately. No scroll effects. Page transitions are instant. All content is fully visible.

**OS level (Windows)**:
- Settings → Accessibility → Visual effects → Turn off animation effects

## Viewport Testing

Test these breakpoints manually:

| Width | Test |
|-------|------|
| 375px | Mobile: hamburger nav, hero stacks vertically, cards stack, no layout overflow |
| 768px | Tablet: hero switches to single column, project grid adjusts |
| 1440px | Desktop: full two-column hero, project grid 3-up, ToC visible in posts |

## Build Verification

```bash
pnpm build
# Expected: 0 errors, 0 warnings
# Output in dist/ should be deployable directly to GitHub Pages

# Optional: preview the production build locally
pnpm preview
# → http://localhost:4321/obadaDeg/
```

## Files Changed in This Feature

| File | Change |
|------|--------|
| `src/styles/global.css` | @keyframes, .animate-on-scroll, ::view-transition-*, prefers-reduced-motion |
| `src/layouts/Base.astro` | IntersectionObserver `<script>` tag |
| `src/pages/index.astro` | .animate-on-scroll on hero children and section wrappers |
| `src/components/ProjectCard.astro` | Hover lift + box-shadow glow |
| `src/components/WriteupCard.astro` | Row hover background tint |
| `src/components/TagPill.astro` | Hover scale micro-animation |
| `src/components/BlogCard.astro` | Hover lift (matches ProjectCard) |
| `src/components/Nav.astro` | Sliding underline indicator on hover/active |
| `src/layouts/Post.astro` | Entrance animation on post content |
