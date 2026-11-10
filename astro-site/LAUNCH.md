# Medical Rank launch handoff: Astro on Cloudflare Workers (static assets)

Astro is the production codebase and Cloudflare is the production host. The Netlify deployment is untouched and stays the rollback target. This file is the handoff; `CUTOVER.md` is the runbook. **Production hostnames, DNS and nameservers are unchanged.**

## Release revision
- Branch `release/astro-cloudflare` (local, not pushed). **Release revision `78dac0221948`** (full `78dac02219484b2ce63d23586fdd917d05b066b8`). Earlier preview build: `7d8292fbe3d6`. Docs-only commits do not change the build.
- Reproduce: `cd astro-site && nvm use && npm ci && npm run build && node scripts/verify-dist.mjs production` (Node 24, Wrangler pinned 4.159.0, lockfile committed; 17 checks).
- One script deploys (refuses a dirty tree, tags the Worker version with the commit): `npm run release:preview`, `npm run release:production`; `node scripts/release.mjs production --dry-run` shows the command without running it.

## Hosted preview
- **https://medical-rank-preview.carlos-e05.workers.dev** (Worker `medical-rank-preview`, workers.dev only, no custom domain, account `e0590b0e…`).
- Current Cloudflare **deployment ID `560ff1ec-d458-4bd6-ab90-3597b4b97fd0`**, version `d393210a-7dbd-4bec-81ff-05dea90b2c10`, tag `78dac0221948`, deployed 2026-11-10. Previous: deployment `4ed056c7-4676-4f09-84f8-966139998f7f`, version `45816e36-…`, tag `7d8292fbe3d6`.
- The production Worker `medical-rank` has **not** been created.

## Workers static assets configuration (checked against current Cloudflare docs)
`wrangler.jsonc` (production) and `wrangler.preview.jsonc` set `assets.directory ./dist`, `not_found_handling: "404-page"` (serves `404.html` with status 404), `html_handling: "auto-trailing-slash"` (explicit; docs: folder indexes keep the slash, `/folder` gets a 307 to `/folder/`). No Worker script. `_redirects` (two 301 rules) and `_headers` are read from `dist/`. Production sets `workers_dev: false` and `preview_urls: false`, so it is never reachable on an indexable workers.dev duplicate. The docs I read describe `404-page` and `html_handling` on the routing pages; the 404 behaviour was confirmed on the deployed preview below.

## Results on the deployed preview
| Check | Result |
|---|---|
| Homepage, guide, worksheet | PASS 200 |
| Slashless guide and worksheet | PASS 307 to the slash form (same host) |
| `/index` | PASS 301 to `/` |
| `/sitemap.xml` and `/sitemap.xml?x=1` | PASS 301 to `/sitemap-index.xml` (query kept) |
| `/sitemap-index.xml`, `/sitemap-0.xml` | PASS 200; lists homepage and guide only |
| Worksheet absent from sitemap, `noindex,follow` in page | PASS |
| Canonicals (homepage, guide, worksheet) | PASS, all `https://medical-rank.com/…` (apex, not the preview host) |
| Homepage links to the guide; no GA tag | PASS |
| Real 404 (status and `404.html` body) | PASS: `/dental`, `/dental.html`, `/pricing`, `/blog/x`, `/physical-therapy/pod`, benchmark guide, `/guides/?x=1`, `/nope` |
| Print modes via headless Chrome on the preview | PASS: worksheet start 1 page, quick 6, all 9; guide 5 |
| Benchmark, QA, legacy archive in output | PASS: absent (`verify-dist.mjs`, 16 checks pass for both targets) |

Not testable on a workers.dev host: `www` redirect, TLS on medical-rank.com, mail (see `CUTOVER.md`).

## Preview indexing, and how production avoids it
Cloudflare's Version URL page does not mention any noindex behaviour, so I did not rely on one. The **preview build** (`npm run build:host-preview`) adds `dist/_headers` with `X-Robots-Tag: noindex, nofollow` and a `Disallow: /` `robots.txt`; the deployed preview returns that header on every response. Preview and production builds differ in only those two files (byte-compared). The **production build never runs the hardening step**, and `verify-dist.mjs production` fails if `dist/_headers` exists or `robots.txt` disallows `/`. The preview Worker is separate (`medical-rank-preview`) and is deleted after launch.

## Content kept out of the deployed output
The legacy archive (about 33,000 files at the repo root), the hypothetical benchmark route (draft; its source file remains in `src/content/posts/` and is not built) and every QA/pilot file under `research/` are not in `dist/`. `research/` is not committed to this branch.

## Decisions recorded (2026-11-10)
1. **`/physical-therapy/pod` retired**: real 404 (no redirect). The old page was canonicalised to `/physical-therapy/oregon`; the podcast stays on YouTube and Facebook.
2. **Guide date 2026-11-08 accepted for now. Flag:** the guide cannot have been publicly readable before cutover, so on the production commit the date should be the **actual first public release date** (cutover day). Until then the build prints a reminder. Changing it needs a new commit and a preview re-run.
3. **Cloudflare and Porkbun changes are yours.** `CHECKLIST.md` is the ordered list. I make no changes there.
4. **Delete the old Netlify site only after the rollback window closes and Cloudflare is stable.** Not deleted; it is the rollback target.
5. **Mail:** you create the `info@medical-rank.com` alias and test it from an outside account before launch. Every existing mail record (MX, SPF, DKIM, DMARC, verification TXT) must be copied unchanged.
6. **Author bio unchanged** ("Medical Rank is run by Carlos Ochoa."). Hypothetical benchmark excluded from the build (source file stays in the repo, draft).

## Legacy URLs
See `LEGACY-URLS.md`. All 25,224 old sitemap URLs map to a real 404 except `/` (same), `/index` and `/sitemap.xml` (301). A 231-URL probe of every family on the preview had no mismatches. No Search Console traffic or link data was available to me, so the retirement list is by rule, pending your exports.
