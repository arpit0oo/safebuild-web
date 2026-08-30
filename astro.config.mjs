// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [
    tailwind({
      // Use our custom config at the root
      configFile: './tailwind.config.mjs',
      // Don't inject base styles — we manage them in global.css
      applyBaseStyles: false,
    }),
  ],
});
