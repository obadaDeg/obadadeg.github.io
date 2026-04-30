# Research: Media Support in Writeups

## 1. Astro Page Bundles (Images)
**Decision**: Use Astro Content Collections with directory-based organization.
**Rationale**: Astro natively supports collocated images. If a content entry is a directory (e.g., `src/content/writeups/my-writeup/index.md`), it can reference images in the same directory using relative paths (e.g., `![Alt](./image.png)` or `![Alt](./images/image.png)`). Astro automatically optimizes these images during the build.
**Alternatives considered**: Using a global `public/images/` folder (rejected due to poor organization).

## 2. Video Support in Markdown
**Decision**: Use standard HTML `<video>` tags within Markdown/MDX, or place video files in the `public` directory.
**Rationale**: Standard Markdown doesn't have a specific syntax for videos. Astro allows HTML in Markdown, so `<video src="/videos/video.mp4" controls></video>` works. However, Astro's asset pipeline currently does not automatically process videos collocated in Content Collections the way it does for images. Videos may need to be stored in `public/` or imported explicitly in MDX if MDX is configured. If keeping videos in the writeup folder is strictly required, MDX and Vite's asset handling must be used. We will stick to `public/` for videos or evaluate an MDX component if the need arises.
**Alternatives considered**: Hosting videos externally (e.g., YouTube) and embedding them. While better for performance, the user requested the ability to include videos locally.
