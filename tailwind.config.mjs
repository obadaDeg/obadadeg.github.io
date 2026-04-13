/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        bg: '#0a0a0f',
        surface: '#111118',
        border: '#1e1e2e',
        text: '#e2e2e8',
        muted: '#6b6b80',
        accent: '#7efff5',
        'accent-dim': '#7efff520',
      },
      maxWidth: {
        prose: '768px',
        layout: '1100px',
      },
    },
  },
  plugins: [],
};
