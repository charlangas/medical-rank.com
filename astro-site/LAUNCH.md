# Medical Rank release: Astro on Cloudflare Workers

The owner approved the agency homepage and selected Cloudflare, following `CUTOVER.md`, on 2026-11-16. Release branch: `codex/medical-rank-agency-homepage`. [PR #1](https://github.com/charlangas/medical-rank.com/pull/1) includes the Astro site and agency changes. The root legacy archive is not deployed to Cloudflare.

## Current cutover state (2026-11-17)

- Full authenticated Porkbun DNS table saved locally: **8 records**, TTLs and screenshot, under `research/cloudflare-cutover/`. Operational backups are not committed or deployed.
- Cloudflare Free zone: `64b1b5f76fd3a28920b2df26038f0b97`, existing account `e0590b0eb502819bdd19ec5ca9533e71`.
- All 8 records imported **DNS-only, TTL 600**. Scripted comparison and independent review passed: no missing or extra records; MX priorities, SPF, verification TXT and existing DKIM hostname unchanged.
- The registrar's apex is an **ALIAS to `apex-loadbalancer.netlify.com`**, not two literal A records. Staged as an apex CNAME to the same target using Cloudflare's automatic apex flattening. Direct queries to both Cloudflare nameservers match Porkbun for A, MX, TXT, DKIM CNAME and www CNAME.
- Porkbun nameservers changed to **`dalary.ns.cloudflare.com` and `ray.ns.cloudflare.com`**. Saved registrar values, `.com` registry delegation, `1.1.1.1` and `8.8.8.8` confirm the update. No DS record existed immediately before the change.
- Cloudflare zone is **Active** and Universal SSL is **Active** for `medical-rank.com` and `*.medical-rank.com` (expires 2027-02-14). Always Use HTTPS is enabled. Production Worker `medical-rank` is deployed at `10c02fd156e6`, version `f6568b8a-e599-4d5b-abad-07f256dac30e`, with no targets. The apex custom-domain configuration is now committed for cutover; web DNS still points to Netlify until deployment attaches it.
- Owner confirmed on 2026-11-17 that `info@medical-rank.com` receives and sends mail successfully. `PUBLIC_CONTACT_ENDPOINT` is unset, so contact uses an email link.
- Netlify automatic publishing is **locked** to rollback deployment `67100d3f4b48fd000882034f`. Owner's chosen SEO-engine service account can read the Search Console domain property; Google currently reports Restricted user, and the owner has been asked to change it to Full for sitemap submission. Existing credentials are outside this repo. The available 16-month page report contains 12 URLs and one click; local CSV and JSON backups are saved. Existing retirement rules remain in effect. Links and complete indexed-page exports are not available through the API used here.
- The www redirect is prepared in the Cloudflare editor: exact hostname filter, dynamic HTTPS apex + original path, 301, query preserved. It is **not saved**. Automatic approval review rejected proceeding past Cloudflare's DNS-only warning. Cancelled that dialog; save/deploy the rule only after the planned proxied www record resolves the prerequisite. Do not retry the warning bypass.

## Agency site

The homepage presents **local SEO and Google Ads for US medical practice owners and decision makers**. Service enquiries are primary; educational material supports the offer lower on the page.

- Commercial pages: `/services/local-seo/`, `/services/google-ads/`.
- Editorial entry point: `/resources/`; existing published guides, worksheets, topic and article routes remain available.
- Navigation, About, contact copy and reading-page CTAs describe the agency. No fabricated proof, credentials or prices. Missing images are omitted.
- Guide publication date: **2026-11-17**, updated for the actual cutover day. Rebuild and recheck preview before production.

## Verified preview

- **https://medical-rank-preview.carlos-e05.workers.dev**, Worker `medical-rank-preview`.
- Revision/tag **`10c02fd156e6`**; Cloudflare version **`644bc2a2-9e5c-4732-80bc-171c9ad63ad4`**, deployed 2026-11-17.
- Clean release: `npm ci`, build, preview hardening, strict verification, deploy. Dependency audit: zero vulnerabilities.
- Deployed guide date checked remotely. Preview returns `X-Robots-Tag: noindex, nofollow` and disallow robots.txt.
- Hosted checks passed for homepage, both services, Resources, contact, guide and worksheet (200), slash normalization (307), `/index` (301), and retired/missing URLs (404).

## Validation and commands

Use Node 24, the committed lockfile and pinned project-local Wrangler **4.159.0**. From `astro-site/`:

```sh
npm run release:preview
node scripts/release.mjs production --dry-run
npm run release:production
```

The release script refuses a dirty Astro tree, installs dependencies, builds the selected target, verifies it and tags the version with its commit. Production dry run passed at `3d1ef07d9e10`; no Worker was deployed by that command.

Strict verification covers all 18 pages, commercial structure, both sitemap directions, canonicals, internal links/assets/declared anchors, draft and legacy exclusion, missing-image handling and target-specific indexing. Browser checks passed at desktop, 375px and 320px, including keyboard FAQ expansion, service-to-contact and Resources-to-guide-to-worksheet navigation. Worksheet runtime anchor and three print controls were checked; earlier print checks passed.

Static assets use real 404 responses and trailing-slash normalization. Production disables workers.dev and version preview URLs. Only preview adds global noindex headers and disallow robots.txt; production verification rejects either protection in a production build.

## Rollback and remaining checks

- Keep Netlify and both domain assignments intact. Current rollback deployment **`67100d3f4b48fd000882034f`**, `main@716ad9737`, published 2024-10-16.
- Mailbox, Netlify lock, zone activation and Universal SSL are confirmed. Finish the dated preview and production release, attach the apex custom domain, then configure proxied www and its redirect per `CUTOVER.md`. Check Search Console through the owner's chosen service account.
- Verify production TLS, path/query redirects, status codes, sitemap, canonicals, robots and worksheet noindex; repeat mail checks and submit the sitemap in Search Console.
- Netlify certificates expire **2026-12-20**. Close rollback window by **2026-12-01**, or re-provision certificates before extending it. Delete Netlify and the preview Worker only after the window; neither is deleted now.

Legacy retirement rules and outstanding Search Console evidence: `LEGACY-URLS.md`. Local research and operational backups stay out of release assets.
