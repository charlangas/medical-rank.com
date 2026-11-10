import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Apex is the primary host (decision recorded in the recovery audit). Static output: works on Cloudflare
// static assets without an adapter. Homepage lives in public/ and is listed explicitly in the sitemap.
export default defineConfig({
  site: 'https://medical-rank.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap({ customPages: ['https://medical-rank.com/'], filter: (page) => !page.includes('/worksheets/') })],
});
