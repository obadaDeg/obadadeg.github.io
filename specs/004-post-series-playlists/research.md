# Research: Post Series (Playlists)

**Feature**: 004-post-series-playlists
**Date**: 2026-04-30

## Decision 1: Series Collection Schema Format

**Decision**: Use a `series` Astro Content Collection with type `'data'` (not `'content'`), storing all configuration in frontmatter YAML. Each series file is a `.yaml` or `.md` file defining `title`, `description`, `draft`, and an ordered `items` array.

**Rationale**: Since series metadata is structured (a list of references, not prose), `type: 'data'` is more appropriate than `type: 'content'`. However, for consistency with the existing `_template.md` authoring convention and to allow an optional intro body, `type: 'content'` is used to remain author-friendly. The `items` array in frontmatter is all that's needed — the markdown body is optional flavor text.

**Format chosen for `items` array entries**:
```yaml
items:
  - collection: blog
    slug: my-post-slug
  - collection: writeups
    slug: my-ctf-writeup
  - collection: projects
    slug: my-project
```
This structured format (vs. a flat `blog/slug` string) is preferred because:
- It is unambiguous for Zod validation
- It maps directly to Astro's `getEntry('collection', 'slug')` signature
- It avoids fragile string-splitting at build time

**Alternatives considered**:
- Flat string format `blog/slug` — simpler to author but requires parsing and is more error-prone
- Separate YAML files per collection type — too much fragmentation

---

## Decision 2: Build-Time Series Lookup Strategy

**Decision**: In each blog/writeup/project page's `getStaticPaths()`, load the full `series` collection once, filter to find the series that contains the current item's slug, compute the item's position, and pass navigator data as props. No runtime lookups.

**Rationale**: Astro's `getStaticPaths` runs at build time. Loading `getCollection('series')` inside `getStaticPaths` is idiomatic and efficient for a small dataset (tens of series). The computed position (`prev`, `next`, `currentIndex`, `totalCount`) is passed as props alongside the existing content data, keeping the page component clean.

**Pattern**:
```typescript
// In getStaticPaths of [...slug].astro:
const allSeries = await getCollection('series', s => !s.data.draft);
const seriesForItem = allSeries.find(s =>
  s.data.items.some(i => i.collection === 'blog' && i.slug === post.slug)
);
// Resolve nav context, pass as props
```

**Alternatives considered**:
- Client-side fetch — prohibited by constitution (IV)
- Separate build script — overkill for this scale

---

## Decision 3: Project Detail Page Route Conflict

**Decision**: Convert `src/pages/projects.astro` → `src/pages/projects/index.astro` to allow the new `src/pages/projects/[slug].astro` to coexist without route conflicts.

**Rationale**: Astro does not allow both `pages/projects.astro` and `pages/projects/` to exist simultaneously. Moving the listing page to `index.astro` inside a `projects/` directory is the standard Astro pattern and preserves the `/projects` URL without any redirect needed.

**Alternatives considered**:
- Keep `projects.astro` and use a different route like `/project/[slug]` — creates inconsistency with the `writeups/[...slug]` pattern
- Delete the listing page — unacceptable, breaks existing navigation

---

## Decision 4: SeriesNavigator Component Design

**Decision**: `SeriesNavigator.astro` is a pure Astro component accepting typed props: `seriesTitle`, `seriesSlug`, `currentIndex` (0-based), `total`, `prevItem` (optional), `nextItem` (optional). Each `item` prop carries `{ title, href }`.

**Rationale**: Keeping all data resolved upstream (in `getStaticPaths`) and passing simple scalar/object props to the component makes it fully testable in isolation and avoids any data-fetching logic inside the component itself. The component is purely presentational.

**Visual design**:
- Container: `background: var(--color-surface)`, `border: 1px solid var(--color-border)`, `border-radius: 8px`, `padding: 1.25rem`
- Series label: small caps using `--color-muted`, links to `/series/[slug]`
- Position: "Part X of Y" — `font-family: Syne`, `color: var(--color-accent)`
- Prev/Next: flex row, `color: var(--color-muted)` with hover → `var(--color-accent)`

---

## Decision 5: Draft Filtering in Series Items

**Decision**: When building the series navigator context, filter out draft items from the `items` array before computing `currentIndex`, `total`, `prev`, and `next`. This ensures "Part 2 of 5" reflects only published items — a draft post in the middle does not create a broken gap.

**Rationale**: FR-007 explicitly requires draft items to be excluded from position calculations. The filter happens in `getStaticPaths`, not in the component.

**Edge case**: If all non-draft items in a series resolve to a single item, the navigator shows "Part 1 of 1" with no prev/next links.
