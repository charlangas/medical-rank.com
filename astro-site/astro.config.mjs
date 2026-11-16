import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Apex is the primary host (decision recorded in the recovery audit). Static output: works on Cloudflare
// static assets without an adapter. Pages that carry a noindex tag (worksheets, hubs with nothing published yet) are kept out of the sitemap
// by scripts/prune-sitemap.mjs after the build.
export default defineConfig({
  site: 'https://medical-rank.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/worksheets/') })],
});
