# obadaDeg Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-04-30

## Active Technologies
- TypeScript / Astro 4.x component model + Astro 4.x (ViewTransitions built-in), Tailwind CSS v3, astro-icon (002-redesign-web-app)
- N/A — fully static site (002-redesign-web-app)
- TypeScript (Astro 4.x component model) + Astro 4.x, Tailwind CSS v3, Shiki (Astro built-in), (001-portfolio-site)
- Astro Content Collections (`type: 'content'`), Zod schema validation, `getCollection`/`getEntry` build-time data resolution (004-post-series-playlists)

## Project Structure

```text
src/
  content/
    series/       ← NEW: series collection (004)
    blog/
    writeups/
    projects/
  pages/
    series/       ← NEW: /series and /series/[slug] pages (004)
    projects/     ← CONVERTED: projects listing + new /projects/[slug] (004)
    blog/
    writeups/
  components/
    SeriesNavigator.astro  ← NEW: navigator component (004)
```

## Commands

pnpm build && pnpm dev

## Code Style

TypeScript (Astro 4.x component model): Follow standard conventions

## Recent Changes
- 004-post-series-playlists: Added `series` content collection, `SeriesNavigator` component, individual project detail pages at `/projects/[slug]`, and `draft` field to projects schema.
- 002-redesign-web-app: Added TypeScript / Astro 4.x component model + Astro 4.x (ViewTransitions built-in), Tailwind CSS v3, astro-icon
- 001-portfolio-site: Added TypeScript (Astro 4.x component model) + Astro 4.x, Tailwind CSS v3, Shiki (Astro built-in)

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
