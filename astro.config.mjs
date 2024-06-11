import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: 'https://felipego.com',
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
});