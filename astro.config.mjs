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
  image: {
    // Authorize the external avatar host so <Image> can process it.
    remotePatterns: [{ protocol: 'https', hostname: 'storage.hectorolea.dev' }]
  },
  integrations: [tailwind(), icon(), sitemap()]
});