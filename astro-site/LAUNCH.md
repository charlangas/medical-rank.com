# Medical Rank launch handoff: Astro on Cloudflare Workers (static assets)

Astro is the release codebase and Cloudflare is the planned production host. As checked on 2026-11-16, the live domain still points to Netlify through Porkbun DNS and the production Worker has not been created. This file is the handoff; `CUTOVER.md` is the domain migration runbook.

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

## Redesign in the working tree (2026-11-15, uncommitted, not deployed)
Historical snapshot below. The journal redesign was subsequently committed as `76dd2ee46`; the agency release described next replaces its homepage direction.
Everything above describes release revision `78dac0221948`. The working tree now holds a full redesign that has **not** been committed, previewed on Cloudflare or released:
- New shell and design ("Journal Front Page"): `src/layouts/Base.astro`, `src/styles/site.css`, self-hosted Literata and Atkinson Hyperlegible Next. `public/index.html` and `public/home.css` are removed; the homepage is `src/pages/index.astro`.
- New pages: four topic hubs (`/medical-seo/`, `/google-ads/`, `/website-conversion/`, `/marketing-measurement/`), `/guides/`, `/blog/`, `/about/`, `/methodology/`, `/contact/`, `/privacy/`, `/specialties/`.
- New `blog` collection (`src/content/blog`), written by the SEO engine (`~/Documents/seo-engine/configs/medical-rank.yaml`). Draft files and future-dated files are not built.
- A page with a `noindex` tag (worksheets, a hub or index with nothing published) is removed from the sitemap by `scripts/prune-sitemap.mjs`, which every build script now runs.
- `scripts/verify-dist.mjs` was updated: 28 checks on the current tree, including that every sitemap URL is built, indexable and self-canonical and that no retired legacy path is built.
- Checked locally: production and preview builds, `verify-dist` for both targets, worksheet print (1, 6 and 9 pages) and guide print (5 pages).
- Image placeholders: `src/components/Figure.astro` holds room for images on the homepage (2), each topic hub, the about page and the guide. `verify-dist.mjs production` **fails while any placeholder remains**, so supply the images (or remove the slots) before a production release; preview builds allow them. Guides and articles take `image` and `imageAlt` in frontmatter.
- Not done: the contact form's Worker endpoint (the page shows an email button until `PUBLIC_CONTACT_ENDPOINT` is set at build), specialty hub content, an approved author bio, and a new Cloudflare preview deploy. `CHECKLIST.md` section E still lists the old sitemap expectation ("homepage and guide only").

## Agency homepage release (2026-11-16)

- Branch: `codex/medical-rank-agency-homepage`. Homepage introduces local SEO and Google Ads for US medical practice owners and decision makers. Service enquiries are primary; the published guide is supporting material lower on the page.
- New commercial routes: `/services/local-seo/` and `/services/google-ads/`. New editorial entry point: `/resources/`. Existing guide, worksheet, topic and article URLs are preserved.
- Global navigation, About, contact copy and reading-page CTAs describe the agency. Product and design instructions use the same priority. Unavailable imagery is omitted, so no empty image slots ship.
- Contact uses an email link with a suggested enquiry outline while `PUBLIC_CONTACT_ENDPOINT` is unset. No form delivery or mailbox-delivery claim has been made.
- Validation: production build, strict release verification including both sitemap directions and local links/declared anchors; browser checks at desktop, 375px and 320px; FAQ keyboard expansion; service-to-contact navigation; Resources-to-guide-to-worksheet path; worksheet runtime anchor and three print controls.
- Local Wrangler runtime caches are ignored and removed from version control. Release assets are built from `astro-site/`; the root legacy archive and local research outputs stay out of deployment.
- Production migration prerequisites in `CUTOVER.md` still apply. The latest observed production DNS was Porkbun nameservers, Netlify apex A records, and `www CNAME medicalrank.netlify.app`. A production-domain release requires the hosting choice and applicable cutover steps.

### Deployed agency preview

- URL: https://medical-rank-preview.carlos-e05.workers.dev
- Code revision/tag: `c85b0ba3e1ad`.
- Cloudflare version: `f34daf5d-2beb-4352-97e8-58f66e0e508e`, deployed 2026-11-16.
- Rebuilt from the clean commit using `node scripts/release.mjs preview` (`npm ci`, strict build, preview hardening, verification, then deploy). Dependency audit reported no vulnerabilities.
- Remote verification passed for the homepage, both service pages, Resources, contact, guide and worksheet (200); slash normalization (307); `/index` (301); and retired/missing URLs (404). Every checked preview response carries `X-Robots-Tag: noindex, nofollow`.
- Documentation-only commits after this tag do not change the deployed site. Production is still the legacy Netlify site pending the hosting decision and domain cutover.

## Cloudflare cutover preparation (2026-11-16)

- Owner selected Cloudflare following the existing release plan.
- Authenticated account access confirmed. No zone or Worker custom domain for `medical-rank.com` exists in the target account yet.
- Registrar sign-in is required to obtain the complete authoritative DNS export. Public DNS queries alone cannot establish the full set of mail and verification records.
- The guide's planned first production release date is 2026-11-16. If the actual cutover happens on another day, update that date and rebuild before the production-domain release.
- Production DNS changes remain gated on the complete registrar export, a matching staged Cloudflare zone and the other prerequisites in `CUTOVER.md`.
- Production build preparation passed from `3d1ef07d9e10` using `node scripts/release.mjs production --dry-run`. All 18 pages build and production verification passes; this command did not deploy a Worker.
- Netlify rollback deployment observed in the deployment dashboard: `67100d3f4b48fd000882034f`, production `main@716ad9737`, published 2024-10-16. Public dashboard access identifies the deployment but does not permit locking automatic publishing.
- Read-only public DNS baseline saved locally under `research/cloudflare-cutover/public-dns-before.json`. It is explicitly incomplete and is not a substitute for the registrar export.
