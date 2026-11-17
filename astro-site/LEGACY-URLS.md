# Legacy URL inventory and retirement decisions

The legacy sitemap contains **25,224 URLs** on the www host. Cloudflare production went live on 2026-11-17 with an agency homepage, two service pages, Resources and supporting editorial pages. There are 18 built pages and 11 indexable sitemap URLs.

Reproduce the archived inventory: `cd astro-site && node scripts/legacy-inventory.mjs --csv legacy-url-inventory.csv --probe <site URL> --sample 220`. Classify performance CSVs with `node scripts/gsc-classify.mjs --pages Pages.csv [--links "Top linked pages.csv"]`. Generated CSVs are gitignored.

## Current mapping

| Legacy family | Legacy URLs | Cloudflare behavior | Decision |
|---|---:|---|---|
| Homepage `/` | 1 | 200 | Keep the same URL |
| `/index`, `/sitemap.xml` | 2 aliases | 301 to `/`, `/sitemap-index.xml` | Keep aliases, preserve query |
| Specialty hubs | 8 | 404 | Retire |
| State hubs | 408 | 404 | Retire |
| State guides | 800 | 404 | Retire |
| City landing pages | 8,000 | 404 | Retire |
| City guides | 16,000 | 404 | Retire |
| Legacy blog posts | 4 | 404 | Retire |
| `/pricing`, `/city-guide` | 2 | 404 | Retire stub/template pages |
| `/physical-therapy/pod` | Outside sitemap | 404 | Owner explicitly approved retirement on 2026-11-10 |
| `/404.html` | Built error document | 307 to `/404`, then 200/noindex | Workers HTML normalization; missing routes still return 404 |

An earlier hosted-preview sample covered 231 legacy URLs from every family with no status mismatches. Release-day checks confirm real 404 responses for `/dental`, `/pricing`, `/physical-therapy/pod`, `/blog/x` and a nonexistent path. No legacy archive is included in Worker assets.

## Search Console evidence obtained on 2026-11-17

The owner's existing service account accessed `sc-domain:medical-rank.com`. Final web-search page data for **2025-07-17 through 2026-11-14** returned **12 URLs, 1 click and 18,368 impressions**. This is a performance report, not an indexed-page count or a complete backlink inventory. Local JSON/CSV backups are under `research/cloudflare-cutover/` and are not committed.

`gsc-classify.mjs` flagged nine paths with clicks or at least ten impressions:

| Path | Clicks | Impressions | Release decision |
|---|---:|---:|---|
| `/med-spa` | 1 | 9,753 | Keep agreed 404; no replacement med-spa page was built |
| `/` | 0 | 101 | Same URL, new agency homepage |
| `/audiologists` | 0 | 3,086 | Keep agreed 404; no replacement specialty page |
| `/blog/10-tips` | 0 | 233 | Keep agreed 404; no matching replacement article |
| `/blog/how-to-get-more-patient-referrals` | 0 | 427 | Keep agreed 404; no matching replacement article |
| `/blog/how-to-get-more-patients` | 0 | 2,986 | Keep agreed 404; new guide answers a different question |
| `/chiropractors` | 0 | 373 | Keep agreed 404; no replacement specialty page |
| `/doctors` | 0 | 1,383 | Keep agreed 404; no replacement specialty page |
| `/physical-therapy/pod` | 0 | 18 | Explicit owner retirement decision retained |

The new general service pages do not recreate the old specialty/location offers or old article topics. The approved retirement rules remain in effect. Add a future 301 only after naming a replacement that serves the same purpose and reviewing the URL's traffic/link evidence; do not use the homepage as a blanket fallback.

## Evidence still unavailable

The Search Console API workflow used here does not provide the Links > Top linked pages export or a complete Page indexing > Indexed list. **External links remain unknown**; the classifier's default `links=0` when no links CSV is supplied is not evidence of zero links. Owner-channel referrers such as YouTube/Facebook were not inspected.

Future link/indexed-page exports can be classified with the same script. If they establish a relevant exception, document its replacement before adding a redirect. Existing Search Console verification TXT records were preserved, and the new sitemap index was submitted successfully through the service account on release day.
