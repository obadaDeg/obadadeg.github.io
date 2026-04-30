# Data Model: Media Support in Writeups

## Content Collections Schema
The existing `src/content/config.ts` might not need structural changes for images since Markdown handles image references directly, but we must ensure the schema supports any frontmatter fields like `coverImage` correctly referencing local images.

```typescript
// Example config.ts update
import { z, defineCollection } from 'astro:content';

const writeupsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(),
    // Use the `image()` helper for optimized cover images
    cover: image().optional(), 
    tags: z.array(z.string()).optional(),
  }),
});
```

## State Transitions
N/A - This is a static site content structure update.
