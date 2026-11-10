# Legacy URL inventory and retirement recommendation

Reproduce: `cd astro-site && node scripts/legacy-inventory.mjs --csv legacy-url-inventory.csv --probe <preview URL> --sample 220` (reads the old `../sitemap.xml`; the CSV is gitignored). With Search Console exports: `node scripts/gsc-classify.mjs --pages Pages.csv --links "Top linked pages.csv"`.

## What exists today versus the new site
The old sitemap lists **25,224 URLs** (all on the `www` host). The new site serves a homepage, one guide and one noindex worksheet. Probed 231 of the old URLs (every family, seeded sample) on the hosted preview:

| Family | Old URLs | Live today | New site | Recommendation |
|---|---|---|---|---|
| Homepage `/` | 1 | 200 | 200 (same URL) | keep |
| `/index`, `/sitemap.xml` | 2 | 200 | 301 to `/` and to `/sitemap-index.xml` | keep (aliases) |
| Specialty hubs (`/dental`, `/chiropractors`, …) | 8 | 200, "SEO Services for Dentists" sales pages | **404** | retire (see below) |
| State hubs | 408 | 200 | 404 | retire |
| State guides | 800 | 200; their nav links are broken (`…-seo.html`) | 404 | retire |
| City landing pages | 8,000 | 200; canonical has a double slash (`/dental//colorado/…`) | 404 | retire |
| City guides (SEO, patients) | 16,000 | 200; canonical points at `/blog/how-to-get-more-patients` | 404 | retire |
| Blog posts | 4 | 200; three canonicalise to `/blog/how-to-get-more-patients` | 404 | retire |
| `/pricing` | 1 | 200 stub, "MediRank", canonical = homepage | 404 | retire |
| `/city-guide` | 1 | 200 unfilled template ("Dental SEO Guide for {City}") | 404 | retire |
| `/physical-therapy/pod` (not in the sitemap) | 1 | 200; canonical is `/physical-therapy/oregon` | 404 | **retire (your decision, 2026-11-10)** |
| `/404` | 1 | 200 | 200, noindex (a Workers-assets quirk: `/404` maps to `404.html`; every other missing path is a real 404) | accept |

Probe result: 231 URLs checked, 0 mismatches against the expected statuses (after making `/404.html` noindex; the earlier mismatch was `/404`).

## `/dental` and the other hubs
`/dental` is a live "SEO Services for Dentists" sales page. The new site has no dentistry or SEO-services page. The guide covers whether Google Ads produces booked appointments, which does not answer the hub's query, and the homepage is a general patient-acquisition page. **I recommend a 404, not a redirect.** Redirecting retired pages to the homepage is what Google tends to read as a soft 404, and the earlier audit estimated roughly 10 indexed URLs and zero clicks. The one exception worth considering is a hub that shows real external links in Search Console: a single 301 to `/` would be defensible for it, as the nearest page for the same business purpose. Decide that per URL from the export.

## Search Console traffic and links: not available to me
- The repo has no Search Console exports, no treg tool is connected to your Search Console, and the built-in browser is not signed in (it showed the signed-out marketing page). So I have **no traffic or link data**, and I will not guess at it.
- Every figure above about indexing comes from the earlier audit, which used your own figures (about 10 indexed, about 0 clicks), not exports.
- What you can do: in Search Console, open the Domain property > Performance > Pages, set 16 months, export the CSV; open Links > Top linked pages > Export; and from Page indexing > Indexed save the list of indexed URLs. Then run `gsc-classify.mjs` on them (or give me the files). It lists only URLs with clicks, 10 or more impressions or an external link, and states for each what the new site returns.
- Decision rule: **404 by default.** A URL earns a 301 only if it has clicks or external links **and** a new page genuinely answers the same query. Today the only mapped URLs are `/`, `/index` and `/sitemap.xml`; if the export shows an exception, name its replacement before adding any rule (the 2,000-rule `_redirects` limit is not a concern).
- Referrers from your own channels (YouTube and Facebook) are not visible in the repo. Check those profiles for links to the old podcast page and update them.
