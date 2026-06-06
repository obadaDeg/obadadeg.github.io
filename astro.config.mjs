import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import pdfThumbnailGenerator from './src/integrations/pdf-thumbnail-generator.ts';

export default defineConfig({
  site: 'https://obadadeg.github.io',
  integrations: [
    mdx(),
    tailwind(),
    icon(),
    sitemap(),
    pdfThumbnailGenerator(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
});
