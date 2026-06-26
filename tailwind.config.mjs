/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        // Single restrained accent; value is driven by CSS vars so it adapts
        // to light/dark and supports alpha modifiers (accent/10, accent/20...).
        accent: 'rgb(var(--accent) / <alpha-value>)',
      },
      screens: {
        smallLandscapeScreen: {
          raw: '(max-height: 450px)',
        },
      },
      animation: {
        fade: 'fadeIn 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
