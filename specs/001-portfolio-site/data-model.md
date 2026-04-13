# Data Model: Personal Portfolio Site

**Branch**: `001-portfolio-site` | **Date**: 2026-04-13

All content is stored as Markdown files with typed frontmatter. There is no database.
The schemas below map directly to Zod definitions in `src/content/config.ts`.

---

## Entity: Project

**Collection**: `src/content/projects/`
**Route**: Featured items on `/`, all items on `/projects`

| Field | Type | Required | Constraints | Notes |
|-------|------|----------|-------------|-------|
| title | string | Yes | Non-empty | Display name |
| description | string | Yes | Max 280 chars | Shown on card |
| tech | string[] | Yes | Min 1 item | Tech stack tag pills |
| github | string (URL) | Yes | Valid URL | GitHub repo link |
| demo | string (URL) | No | Valid URL if present | Live demo link |
| featured | boolean | No | Default: false | Shows on home page |
| date | Date | Yes | ISO date | Used for sorting |

**Frontmatter example**:
```yaml
---
title: "Pipeline Orchestrator"
description: "Webhook-driven task processing platform with async queuing and delivery tracking."
tech: ["TypeScript", "Node.js", "BullMQ", "Redis", "PostgreSQL", "Docker"]
github: "https://github.com/obadaDeg/pipeline-orchestrator"
demo: ""
featured: true
date: 2026-01-15
---
```

**Validation rules**:
- `tech` array must have at least 1 item
- `github` must be a valid URL starting with `https://`
- `demo`, if present, must be a valid URL

---

## Entity: Writeup

**Collection**: `src/content/writeups/`
**Routes**: Listing on `/writeups`, individual on `/writeups/[slug]`,
  category-filtered on `/writeups/category/[category]`

| Field | Type | Required | Constraints | Notes |
|-------|------|----------|-------------|-------|
| title | string | Yes | Non-empty | Challenge name |
| ctf | string | Yes | Non-empty | CTF event name |
| category | enum | Yes | See values below | Used for filtering |
| difficulty | enum | Yes | Easy \| Medium \| Hard | Shown on card/header |
| date | Date | Yes | ISO date | Used for sorting |
| tags | string[] | No | Default: [] | Additional topic tags |
| excerpt | string | Yes | Max 280 chars | Shown on listing card |

**Category values**: `Web` | `Pwn` | `Crypto` | `Forensics` | `Misc` | `OSINT`

**Frontmatter example**:
```yaml
---
title: "JWT Algorithm Confusion"
ctf: "PicoCTF 2025"
category: "Web"
difficulty: "Medium"
date: 2025-03-10
tags: ["jwt", "authentication", "algorithm-confusion"]
excerpt: "Exploiting a JWT library that accepts 'none' as a valid algorithm to forge admin tokens."
---
```

**Validation rules**:
- `category` must be one of the 6 defined enum values (case-sensitive)
- `difficulty` must be exactly `Easy`, `Medium`, or `Hard`
- `excerpt` required and max 280 characters

---

## Entity: BlogPost

**Collection**: `src/content/blog/`
**Routes**: Listing on `/blog`, individual on `/blog/[slug]`

| Field | Type | Required | Constraints | Notes |
|-------|------|----------|-------------|-------|
| title | string | Yes | Non-empty | Post title |
| date | Date | Yes | ISO date | Used for sorting |
| tags | string[] | No | Default: [] | Topic tags |
| excerpt | string | Yes | Max 280 chars | Shown on listing card |

**Frontmatter example**:
```yaml
---
title: "How I Set Up a Secure Home Lab on a Budget"
date: 2025-11-20
tags: ["homelab", "security", "linux"]
excerpt: "A walkthrough of my home lab setup using a repurposed laptop, Proxmox, and pfSense."
---
```

**Validation rules**:
- `excerpt` required and max 280 characters

---

## Content Relationships

```text
Home Page
  ├── Projects (featured: true, sorted by date desc, limit 3)
  ├── Writeups (sorted by date desc, limit 3)
  └── BlogPosts (sorted by date desc, limit 2)

Writeups Category Page
  └── Writeups (filtered by category, sorted by date desc)
```

---

## Slug Generation

Slugs are derived automatically from the filename by Astro Content Collections:
- `src/content/writeups/jwt-algorithm-confusion.md` → slug: `jwt-algorithm-confusion`
- URL: `/writeups/jwt-algorithm-confusion`

Filename conventions:
- Lowercase, hyphen-separated
- Descriptive of the content
- No special characters or spaces
