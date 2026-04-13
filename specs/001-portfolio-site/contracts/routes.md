# Route Contracts: Personal Portfolio Site

**Branch**: `001-portfolio-site` | **Date**: 2026-04-13

All routes are static — generated at build time. No dynamic server-side routing.

---

## Route Map

| Route | Source File | Description | Layout |
|-------|-------------|-------------|--------|
| `/` | `src/pages/index.astro` | Home: hero, featured projects, recent writeups, recent posts | Page.astro |
| `/projects` | `src/pages/projects.astro` | All projects grid | Page.astro |
| `/writeups` | `src/pages/writeups/index.astro` | All writeups listing (newest first) | Page.astro |
| `/writeups/[slug]` | `src/pages/writeups/[...slug].astro` | Individual writeup | Post.astro |
| `/writeups/category/[category]` | `src/pages/writeups/category/[category].astro` | Category-filtered writeups | Page.astro |
| `/blog` | `src/pages/blog/index.astro` | All blog posts listing (newest first) | Page.astro |
| `/blog/[slug]` | `src/pages/blog/[...slug].astro` | Individual blog post | Post.astro |
| `/contact` | `src/pages/contact.astro` | Contact info page | Page.astro |
| `/404` | `src/pages/404.astro` | Custom 404 page | Base.astro |

---

## Category Routes

The following category routes are generated statically via `getStaticPaths()`:

| Route | Category |
|-------|----------|
| `/writeups/category/web` | Web |
| `/writeups/category/pwn` | Pwn |
| `/writeups/category/crypto` | Crypto |
| `/writeups/category/forensics` | Forensics |
| `/writeups/category/misc` | Misc |
| `/writeups/category/osint` | OSINT |

Note: Category values in URLs are lowercase; display values are title-case.

---

## Navigation Links

The persistent navigation bar links to:

| Label | Destination | Opens in new tab? |
|-------|-------------|-------------------|
| Obada Daghlas (logo) | `/` | No |
| Projects | `/projects` | No |
| Writeups | `/writeups` | No |
| Blog | `/blog` | No |
| Contact | `/contact` | No |
| Resume ↗ | External PDF URL | Yes |

---

## External Links

| Location | Target | Behavior |
|----------|--------|----------|
| Nav: Resume | External PDF | `target="_blank"` + `↗` icon |
| Home hero: GitHub CTA | `https://github.com/obadaDeg` | `target="_blank"` + `↗` icon |
| Contact: GitHub | `https://github.com/obadaDeg` | `target="_blank"` + `↗` icon |
| Contact: LinkedIn | Placeholder (Obada to fill) | `target="_blank"` + `↗` icon |
| Contact: Email | `mailto:` link | Standard |
| Project cards: GitHub | Per-project GitHub URL | `target="_blank"` + `↗` icon |
| Project cards: Demo | Per-project demo URL (if present) | `target="_blank"` + `↗` icon |

---

## 404 Behavior

Any URL not matching a generated static route serves `src/pages/404.astro`.
Astro generates a `404.html` at build time; GitHub Pages serves it automatically
for unmatched paths.
