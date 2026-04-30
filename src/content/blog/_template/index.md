---
title: "[Blog Post Title]"
date: 2026-01-01
tags: ["tag1", "tag2"]
excerpt: "[Short 1-2 sentence description of the post.]"
draft: true
series: ""  # Optional: set to the series slug (e.g. "web-security-path") to link this post to a series
---

<!-- 
🤖 AI AGENT INSTRUCTIONS:
When the user asks you to create a new blog post, use this file as your primary blueprint and template.
The user will provide the core idea and some explanations.
Your task is to frame the content using the following structure and guidelines:

1. Maintain a professional yet accessible technical tone.
2. Structure the post logically with clear headings (e.g. The Problem, Deep Dive / Analysis, Solution).
3. Media (Images): The user uses a Page Bundle architecture. Place images in the `./images/` folder relative to the post's `index.md` and reference them natively: `![Description](./images/filename.png)`.
4. Media (Videos): Place videos in the global `public/videos/` directory and reference them using: `<video src="/obadaDeg/videos/filename.mp4" controls></video>`.
5. DO NOT apply inline styles (like `width: 100%`) to media tags; the global CSS `.prose img, .prose video` handles responsiveness automatically.
6. Code Blocks: Use standard markdown fenced code blocks with the appropriate language tag.
7. Update the frontmatter above with the appropriate metadata. Ensure the `draft: true` flag remains until the user explicitly asks to publish it.
8. Series: If the user mentions this post is part of a series, set `series: "series-slug"` in the frontmatter (where the slug matches the filename of the series entry in `src/content/series/`). The Series Navigator component will automatically appear at the bottom of the post.
-->

## The Problem / Concept
[Introduce the core problem, concept, or algorithm the post is about.]

![Example Image syntax](./images/diagram.png)

## Deep Dive / Analysis
[Break down the technical details, mathematical facts, or key observations.]

<video src="/obadaDeg/videos/sample.mp4" controls></video>

## Solution / Implementation
[Provide the solution or implementation details. Use TypeScript/JavaScript, Python, or whatever language is appropriate.]

```typescript
// Example code block format
function example() {
  return true;
}
```

## Key Takeaways
[Summarize the most important points the reader should remember.]
- [Takeaway 1]
- [Takeaway 2]
