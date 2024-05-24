import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

import icon from "astro-icon";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon()],
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
});

