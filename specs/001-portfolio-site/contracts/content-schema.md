# Content Schema Contracts: Personal Portfolio Site

**Branch**: `001-portfolio-site` | **Date**: 2026-04-13

These contracts define the required and optional frontmatter fields for each
content type. Authors MUST follow these schemas; the build will fail if required
fields are missing or have invalid values.

---

## Project Schema

**File location**: `src/content/projects/<slug>.md`
**Defined in**: `src/content/config.ts` (projects collection)

```typescript
// Zod schema (implemented in config.ts)
{
  title: z.string(),
  description: z.string().max(280),
  tech: z.array(z.string()).min(1),
  github: z.string().url(),
  demo: z.string().url().optional(),
  featured: z.boolean().default(false),
  date: z.coerce.date(),
}
```

**Required fields**: `title`, `description`, `tech`, `github`, `date`
**Optional fields**: `demo`, `featured` (defaults to `false`)

---

## Writeup Schema

**File location**: `src/content/writeups/<slug>.md`
**Defined in**: `src/content/config.ts` (writeups collection)

```typescript
// Zod schema (implemented in config.ts)
{
  title: z.string(),
  ctf: z.string(),
  category: z.enum(['Web', 'Pwn', 'Crypto', 'Forensics', 'Misc', 'OSINT']),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  excerpt: z.string().max(280),
}
```

**Required fields**: `title`, `ctf`, `category`, `difficulty`, `date`, `excerpt`
**Optional fields**: `tags` (defaults to `[]`)

---

## BlogPost Schema

**File location**: `src/content/blog/<slug>.md`
**Defined in**: `src/content/config.ts` (blog collection)

```typescript
// Zod schema (implemented in config.ts)
{
  title: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  excerpt: z.string().max(280),
}
```

**Required fields**: `title`, `date`, `excerpt`
**Optional fields**: `tags` (defaults to `[]`)

---

## Component Contracts

### ProjectCard.astro

**Props**:
```typescript
interface Props {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
  featured?: boolean;
}
```

**Renders**: Name (bold), description (1–2 lines), tech stack TagPills,
GitHub link with ↗, optional demo link with ↗, optional "Featured" badge.

---

### WriteupCard.astro

**Props**:
```typescript
interface Props {
  title: string;
  ctf: string;
  category: string;
  difficulty: string;
  date: Date;
  slug: string;
}
```

**Renders**: Challenge name (linked to writeup page), CTF name, category TagPill,
difficulty TagPill, formatted date.

---

### BlogCard.astro

**Props**:
```typescript
interface Props {
  title: string;
  date: Date;
  tags: string[];
  excerpt: string;
  slug: string;
}
```

**Renders**: Post title (linked), formatted date, tag TagPills, excerpt.

---

### TagPill.astro

**Props**:
```typescript
interface Props {
  label: string;
  href?: string;  // If provided, renders as <a>; otherwise <span>
}
```

**Renders**: Styled pill. When `href` is provided (category filter links),
renders as a navigable anchor. When absent, renders as a static display tag.
