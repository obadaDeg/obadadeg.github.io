# Data Model: Post Series (Playlists)

**Feature**: 004-post-series-playlists
**Date**: 2026-04-30

---

## 1. New Collection: `series`

**File location**: `src/content/series/[slug].md`
**Collection type**: `'content'` (allows optional prose body + frontmatter)

### Zod Schema (`src/content/config.ts`)

```typescript
const seriesItem = z.object({
  collection: z.enum(['blog', 'writeups', 'projects']),
  slug: z.string(),
});

const series = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(280),
    draft: z.boolean().default(false),
    items: z.array(seriesItem).min(1),
  }),
});
```

### Example entry (`src/content/series/web-security-path.md`)

```markdown
---
title: "Web Security Learning Path"
description: "A curated roadmap through web security concepts — from JWT pitfalls to real-world CTF challenges."
draft: false
items:
  - collection: blog
    slug: grid-equalization-quickselect
  - collection: writeups
    slug: example-ctf
  - collection: projects
    slug: chirpy-api
---

Optional prose intro about the series here.
```

---

## 2. Modified Collection: `projects`

### Schema change (`src/content/config.ts`)

```diff
 const projects = defineCollection({
   type: 'content',
   schema: ({ image }) => z.object({
     title: z.string(),
     description: z.string().max(280),
     tech: z.array(z.string()).min(1),
     github: z.string().url(),
     demo: z.string().url().optional(),
     featured: z.boolean().default(false),
     date: z.coerce.date(),
+    draft: z.boolean().default(false),
+    series: z.string().optional(),
     coverImage: image().optional(),
   }),
 });
```

---

## 3. Modified Collections: `blog` and `writeups`

Both need the `series` optional frontmatter field added to their Zod schemas:

```diff
+    series: z.string().optional(),
```

---

## 4. SeriesNavigator Component Props

**File**: `src/components/SeriesNavigator.astro`

```typescript
interface SeriesNavItem {
  title: string;
  href: string;
}

interface Props {
  seriesTitle: string;
  seriesSlug: string;
  currentIndex: number;   // 0-based, among published items only
  total: number;          // count of published items in series
  prevItem?: SeriesNavItem;
  nextItem?: SeriesNavItem;
}
```

---

## 5. Build-Time Navigator Context Shape

Computed in `getStaticPaths` of each `[...slug].astro` and passed as props:

```typescript
type SeriesContext = {
  seriesTitle: string;
  seriesSlug: string;
  currentIndex: number;
  total: number;
  prevItem?: { title: string; href: string };
  nextItem?: { title: string; href: string };
} | null; // null when the item is not part of any series
```

---

## 6. Route Map (new pages)

| Route | File | Description |
|-------|------|-------------|
| `/series` | `src/pages/series/index.astro` | Lists all published series |
| `/series/[slug]` | `src/pages/series/[slug].astro` | Detail page — ordered item list |
| `/projects/[slug]` | `src/pages/projects/[slug].astro` | Individual project detail page |
| `/projects` | `src/pages/projects/index.astro` | ← Renamed from `projects.astro` |

---

## 7. Entity Relationships

```
Series (1) ──── has ordered items ──── (*) SeriesItem
                                           │
                                ┌──────────┼──────────┐
                                ▼          ▼          ▼
                              Blog     Writeups    Projects
                            (existing) (existing) (existing)

Blog/Writeup/Project (*) ──── belongs to (0..1) ──── Series
  via frontmatter `series: "series-slug"` field
```

**Constraint**: A content item's `series` frontmatter field is the canonical binding. The series `items` array defines the order. Both must agree — if an item lists `series: "x"` but is not in series `x`'s items array, the navigator is silently absent (the series array takes precedence).
