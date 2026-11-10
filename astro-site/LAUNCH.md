# Medical Rank launch handoff: Astro on Cloudflare Workers (static assets)

Astro is the production codebase and Cloudflare is the production host. The Netlify deployment is untouched and stays the rollback target. This file is the handoff; `CUTOVER.md` is the runbook. **Production hostnames, DNS and nameservers are unchanged.**

## Release revision
- Branch `release/astro-cloudflare` (local, not pushed). Release revision **`7d8292fbe3d6`** (full: `7d8292fbe3d6…`, run `git rev-parse 7d8292fbe3d6`). Docs-only commits after it do not change the build (checked by rebuilding: dist manifest hash `f817919ac4db…` for the production build before and after).
- Reproduce: `cd astro-site && nvm use && npm ci && npm run build && node scripts/verify-dist.mjs production` (Node 24, Wrangler pinned 4.159.0, lockfile committed).
- Deploy commands (one script, refuses a dirty tree, tags the Worker version with the commit): `npm run release:preview` and `npm run release:production`. `node scripts/release.mjs production --dry-run` shows the command without running it.

## Hosted preview
- URL: **https://medical-rank-preview.carlos-e05.workers.dev** (Worker `medical-rank-preview`, workers.dev only, no custom domain; account `e0590b0e…`).
- Cloudflare **deployment ID `4ed056c7-4676-4f09-84f8-966139998f7f`**, version ID `45816e36-1765-4cfe-8d60-e65ede33fe6c`, version tag `7d8292fbe3d6`, uploaded 2026-11-10T03:17:22Z.
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

## Decisions I still need from you
1. **Podcast route `/physical-therapy/pod`:** currently a 404 here. Retire it, or build a page for it before cutover (the one retired URL with a reason to keep).
2. **Go-live date:** the guide's `published:` is still the placeholder 2026-11-08. Commit the real date before the production release (the release script needs a clean tree; this creates a new revision, so re-run the preview first).
3. **Authorize the Cloudflare zone and nameserver stage** (it needs your Porkbun and Cloudflare logins; I cannot do it).
4. **Old `medicalrank.netlify.app` after rollback:** my recommendation is to delete the Netlify site once the rollback window closes (see `CUTOVER.md`); say if you prefer the redirect stub.
5. **Mailbox test and author bio** (unchanged): test `info@medical-rank.com` from an outside address; replace the bio sentence in `src/lib/authors.ts` if you have approved text.
