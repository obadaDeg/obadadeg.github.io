import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import pdfThumbnailGenerator from './src/integrations/pdf-thumbnail-generator.ts';

export default defineConfig({
  site: 'https://obadadeg.github.io',
  integrations: [
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
