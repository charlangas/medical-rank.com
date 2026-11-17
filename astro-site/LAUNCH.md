# Medical Rank: production release

**Live at https://medical-rank.com/ on Cloudflare Workers, 2026-11-17.** The owner approved the agency homepage and selected the existing Cloudflare cutover plan. [PR #1](https://github.com/charlangas/medical-rank.com/pull/1) contains the Astro site and agency changes; the root legacy archive is excluded from Worker assets.

## Production

- Worker `medical-rank`, account `e0590b0eb502819bdd19ec5ca9533e71`, zone `64b1b5f76fd3a28920b2df26038f0b97`.
- Deployed revision/tag **`1ef314136185`**, version **`6c472774-3f9a-4e7c-a48c-6924f5803ea4`**. Later documentation-only commits do not change the deployed assets.
- Apex custom domain is declared in `wrangler.jsonc`. Production workers.dev and version preview URLs are off.
- `www` uses proxied `A 192.0.2.0`. Enabled Redirect Rule **`1fa7ec3d342c4a759a5d5e3df1f205ab`** matches only `www.medical-rank.com`, sends a 301 to HTTPS apex + original path, and preserves the query string.
- Zone and Universal SSL are active; Always Use HTTPS is on. Both hostnames pass real TLS verification. Universal certificate observed expiring 2027-02-14.
- Guide first-publication date is **2026-11-17**.

## Agency site

The homepage presents **local SEO and Google Ads for US medical practice owners and decision makers**, with service enquiries as the primary action and educational material lower on the page.

- Dedicated pages: `/services/local-seo/`, `/services/google-ads/`; editorial entry point: `/resources/`.
- Navigation, About, contact and reading-page CTAs describe the agency. No fabricated results, testimonials, credentials or prices. Missing images are omitted.
- Contact uses a prefilled email link to `info@medical-rank.com`; no form endpoint is configured. Owner confirmed inbound/outbound delivery on release day. Live browser check confirmed the CTA reaches contact and its prefilled mailto remains intact.

## DNS and rollback

- Full Porkbun table and screenshot backed up locally under `research/cloudflare-cutover/`: 8 records, TTLs included. Operational backups and credentials are not committed or deployed.
- All 8 records were staged DNS-only at TTL 600, checked by script and an independent reviewer, then queried directly on both Cloudflare nameservers before delegation changed.
- The actual registrar apex was an ALIAS to `apex-loadbalancer.netlify.com`, staged as an equivalent flattened apex CNAME. That web record was replaced by the Worker-managed apex record during cutover; www was replaced separately. The **six mail/verification records still match the backup exactly**, DNS-only, TTL 600.
- Nameservers: `dalary.ns.cloudflare.com`, `ray.ns.cloudflare.com`. Registry and public resolver checks passed. No DS record existed at migration.
- Netlify automatic publishing is **locked** to deployment **`67100d3f4b48fd000882034f`**, `main@716ad9737`, published 2024-10-16. Both domain assignments and the deployment remain intact for rollback.
- Rollback instructions: `CUTOVER.md`. Netlify certificates expire 2026-12-20; close rollback window by **2026-12-01**, or re-provision them before extending it. Netlify and the preview Worker are not deleted during this release.

## Search Console

- Owner chose existing service account `seo-engine-reader@reviews-451317.iam.gserviceaccount.com`; no new key or personal Google account sign-in was required. Credentials remain outside this repo.
- API confirms **Full user** on `sc-domain:medical-rank.com`.
- Submitted **https://medical-rank.com/sitemap-index.xml** at **2026-11-17 16:42:29 UTC**. API returned **204**, then GET returned **200** and the matching submission time. Google processing was pending at that check; submission does not establish indexing.
- Available 16-month performance data and per-URL retirement decisions are recorded in `LEGACY-URLS.md`. Links and complete indexed-page exports are still unavailable through this API workflow.

## Verification

- Clean preview and production releases: locked dependencies, Node 24, pinned Wrangler 4.159.0, audit zero vulnerabilities, strict build verification.
- Remote production: all **18 built pages** checked; canonicals and intended robots metadata match; no inherited preview noindex headers. The **11 indexable sitemap URLs** are present; worksheets, empty hubs and 404 are excluded.
- HTTP and HTTPS www redirects preserve path and query; apex HTTP upgrades to HTTPS. Slashless service returns 307; `/index` and `/sitemap.xml` return 301; retired/missing paths return real 404.
- `/404.html` normalizes to `/404`, which is the built noindex page (200); this does not change missing-route 404 responses.
- Live browser: desktop and 375px mobile, no horizontal overflow, primary CTA/contact path, intact prefilled mailto, keyboard FAQ expansion. Earlier preview checks also covered 320px, service/resource/guide/worksheet navigation and print controls.
- Mail/verification DNS parity passed after hosting cutover. Owner confirmed actual mail delivery; message-header SPF/DKIM inspection is not claimed.
- Local research, reviewer simulations, new unrelated draft content and legacy archives are excluded from the release checkout and deployed assets.

## Preview and repeatable release

- Preview: https://medical-rank-preview.carlos-e05.workers.dev
- Preview revision/tag **`10c02fd156e6`**, version **`644bc2a2-9e5c-4732-80bc-171c9ad63ad4`**, deployed 2026-11-17. Same page content as production; preview blocks indexing with a global header and disallow robots.txt.
- Production was built from a clean isolated checkout at `/private/tmp/medical-rank-production-release`, preserving unrelated untracked work in the main workspace.
- From `astro-site/`: `npm run release:preview`, `node scripts/release.mjs production --dry-run`, `npm run release:production`. The script refuses a dirty Astro tree, installs locked dependencies, builds, verifies and tags the version with its commit.
- Static assets use real 404 handling and trailing-slash normalization. Strict verification checks sitemap completeness, self-canonicals, links/assets/anchors, draft/legacy exclusion, imagery and target-specific indexing protections.
