# Launch handoff: in-place on the existing Netlify project

Recommendation: **launch in place on Netlify.** Cloudflare stays a separate, later migration (see `CUTOVER.md`). Nothing here has been run against production or DNS.

## What was verified, and how

| Requirement | Evidence | Kind |
|---|---|---|
| `www` redirects to apex | Live today: `https://www.medical-rank.com/` returns 301 to `https://medical-rank.com/`. Netlify docs: the redirect follows the project's **primary domain** setting (apex primary, `www` redirects). It is a domain setting, not part of a deploy, so a new deploy does not change it. | Observed live + docs |
| Homepage, guide, worksheet | `netlify-cli dev --dir dist` (local emulation): all 200 | Local |
| Real 404 for retired routes | Local emulation: `/dental`, `/dental.html`, `/pricing`, `/blog/x`, `/physical-therapy/pod`, the benchmark guide and an unknown path all return **404 with the `404.html` body**. Live today an unknown path already returns a real 404 | Local + live |
| Sitemap | `/sitemap-index.xml` and `/sitemap-0.xml` 200; `/sitemap.xml` 301 to the index; contents are homepage + guide only | Local + file check |
| Worksheet noindex, not in sitemap | `noindex,follow` in the page, absent from the sitemap (`verify-dist.mjs`, 15/15) | Build check |
| `robots.txt` | Present in build (live site has none today: 404) | Local |

**Not verified** (can only be checked on Netlify itself; run the draft deploy below): `/guides/…` and `/worksheets/…` **without** a trailing slash (the local emulator returns 200, Netlify may 301 to the slash form; either is acceptable); `/index` (local 200, the `_redirects` rule may or may not fire on Netlify; harmless); TLS/HSTS after deploy; whether the project is Git-linked (see step 0). `410` is not used; retired routes are plain 404.

The previous live behavior changes on purpose: today `/dental` and the rest of the old site return 200; after the deploy they return 404.

## Final build

`astro-site/dist/` (132 KB, 13 files). Rebuild after setting the date: `cd astro-site && npm run build && node scripts/verify-dist.mjs`.
Files: `index.html`, `home.css`, `img/*`, guide, worksheet, `404.html`, `robots.txt`, `_redirects`, `sitemap-index.xml`, `sitemap-0.xml`. No benchmark or QA files.

## Shortest deploy sequence

0. **Before anything:** in Netlify > Deploys, note the current Production deploy (this is the rollback target). In Site configuration > Build & deploy, check whether the site is **linked to Git**. If it is, click **Lock to stop auto publishing** now: otherwise any push to `main` rebuilds the old root site and overwrites the Astro deploy. Do not push `astro-site/` to `main` as part of this launch.
1. **Set the go-live date.** Edit `published:` in `src/content/posts/is-google-ads-bringing-in-booked-appointments.mdx` to the real date (currently the placeholder 2026-11-08; the build refuses a future date). If go-live is more than a few days after 2026-11-08, re-read the eight Google pages in its Sources list and update their `checked:` dates.
2. `cd astro-site && npm run build && node scripts/verify-dist.mjs` (expect 15 PASS).
3. **Draft deploy** (not production, unique URL): `npx netlify-cli deploy --dir=dist` (log in and link to the existing site when prompted). On the draft URL check: `/`, the guide link from the homepage, the guide, the worksheet, `/sitemap-index.xml`, `/robots.txt`, and that `/dental` and `/pricing` return 404 (`curl -sI`).
4. **Production:** `npx netlify-cli deploy --prod --dir=dist`.
5. **Post-deploy curl checks:** `https://medical-rank.com/` 200; `https://www.medical-rank.com/` 301 to the apex; `http://` forms end at the apex HTTPS URL; guide and worksheet 200; `/dental` 404; `/sitemap-index.xml` 200; worksheet source has `noindex`.

## Rollback

Netlify > Deploys > the production deploy noted in step 0 > **Publish deploy**. Atomic and instant (no build); the old deploy is kept. If the site is Git-linked, keep auto publishing **locked** afterwards. Domain, DNS and the `www` redirect are untouched by either direction. Not tested here: this relies on Netlify's documented behavior for deploys made from the CLI.

## Owner decisions

1. **Mailbox test:** send a test message to `info@medical-rank.com` from an outside address and confirm it arrives. Both homepage contact links are `mailto:` to it; delivery cannot be checked from here.
2. **Podcast route:** `/physical-therapy/pod` becomes a 404 in this build (listed in `legacy-route-map.csv` as the one URL with a reason to preserve). Decide to retire it, or give it a home before launch.
3. **Go-live date** (step 1) and the **author bio**: the byline note is the existing homepage sentence; replace it in `src/lib/authors.ts` if you have approved text.
