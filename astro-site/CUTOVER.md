# Medical Rank cutover plan (review only; nothing here has been run)

Measured 2026-11-08 from outside: nameservers are Porkbun (`fortaleza/maceio/salvador/curitiba.ns.porkbun.com`, TTL 86400). Apex A records `75.2.60.5` and `99.83.231.61` (Netlify, TTL ~300). `www` is a CNAME to `medicalrank.netlify.app` (TTL 600). Netlify answers `www` with a 301 to the apex. The apex sends `strict-transport-security: max-age=31536000`, so **HTTPS must work on the apex and `www` from the first minute of cutover**. `medicalrank.netlify.app` answers 200 with the old site and does not redirect. Other records seen: MX `1 smtp.google.com.` and `15 …mx-verification.google.com.`, TXT SPF `v=spf1 a mx include:_spf.mlsend.com include:_spf.google.com ~all`, `google-site-verification=…`, `openai-domain-verification=…`. No DMARC or `google._domainkey` TXT was found by `dig`, but `dig` cannot list a zone: **export the full zone from Porkbun** and copy every record.

## Deploy target
Workers static assets: `astro-site/wrangler.jsonc` (`assets.directory ./dist`, `not_found_handling: "404-page"`). Checked in Wrangler's local Workers runtime (`wrangler dev --local`), not on Cloudflare. Pages is also viable; Cloudflare's comparison page does not name a default for new projects.

## www redirect (zone level, not in `_redirects`)
`_redirects` cannot match hostnames. Use a Cloudflare Redirect Rule: if hostname equals `www.medical-rank.com`, redirect with status 301 to `https://medical-rank.com` plus the original path, preserving the query string. Cloudflare's own example uses a wildcard `https://www.*` rule with 301 and "preserve query string". Redirect rules apply to traffic through Cloudflare, so the `www` DNS record must be **proxied**. A proxied placeholder record for `www` is commonly used; confirm in the dashboard (not verified from the docs I could read). A Worker Custom Domain cannot be created on a hostname that has a CNAME, so delete the old `www` CNAME first.

## Old Netlify hostname (`medicalrank.netlify.app`)
Cloudflare cannot control it. Options: (a) leave the Netlify site untouched through the rollback window, then (b) either delete the Netlify site (the hostname then stops serving) or deploy a stub with `/* https://medical-rank.com/:splat 301!` in `_redirects` (standard Netlify syntax; confirm in Netlify docs, my docs fetch did not cover it). **Recommended:** keep it intact for the rollback window, then delete it. The old site is a duplicate host with `www` canonicals, so do not leave it serving indefinitely. Decision needed from you.

## Order of operations (rollback in minutes, not a day)
1. **Review the build on `workers.dev`** after your first `wrangler deploy`. No DNS change.
2. **Add the domain as a Cloudflare zone and import the records exactly**, with apex and `www` pointing at Netlify as DNS-only. Diff the records against the Porkbun export. Nothing changes for visitors or mail yet.
3. **Change the nameservers at Porkbun.** Traffic still reaches Netlify. This is the slow step (NS TTL is 86400), so allow up to 48 hours. Check mail and the Netlify site afterwards.
4. **Cutover:** attach `medical-rank.com` as the Worker Custom Domain (delete the two apex A records it conflicts with if prompted), switch `www` to a proxied record, add the redirect rule.
5. **Verify** (below). Keep the Netlify site, its domains and its deploys unchanged.

## Exact rollback
Before step 4, screenshot the Cloudflare DNS list and save the Porkbun export.
- **Fast rollback (minutes):** in Cloudflare DNS, remove the Worker Custom Domain on the apex, re-create `A 75.2.60.5` and `A 99.83.231.61` (DNS-only), restore `www CNAME medicalrank.netlify.app` (DNS-only), disable the www redirect rule. Netlify serves the old site again. This works only while Netlify still has both custom domains attached.
- **Content-only rollback:** redeploy the previous version of the Worker (`wrangler rollback` exists for Workers versions; confirm before relying on it).
- **Full rollback to Porkbun DNS:** set the four Porkbun nameservers back at the registrar. Slow (NS TTL 86400, up to 48 hours), so use only if the fast rollback fails.
- Do not remove `medical-rank.com` or `www` from Netlify until the rollback window ends.

## Can only be verified after cutover
- A real 301 from `https://www.medical-rank.com/anything?x=1` to the apex with the path and query kept; valid TLS certificates on both hostnames from the first request (HSTS is set).
- Live 404 status and body for retired URLs, and the 307 for slashless URLs (checked only locally).
- Mail still delivered: send and receive a test at info@medical-rank.com after the nameserver change.
- Search Console: the domain property still verifies after the nameserver change (TXT record carried over); submit `https://medical-rank.com/sitemap-index.xml`; remove the old `www` sitemap; watch "Not found (404)" rise and decay, as expected.
- Google honouring `noindex` on the worksheet and indexing the guide: only visible after a crawl. `robots.txt` does not block the worksheet, so the directive can be seen.
- What happens to `medicalrank.netlify.app` and to any inbound links to `/physical-therapy/pod`.
