import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://hectorolea.dev',
  devToolbar: {
    enabled: false
  },
  integrations: [tailwind(), icon(), sitemap()]
});