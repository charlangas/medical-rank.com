# Your ordered checklist: Cloudflare, Porkbun, Netlify

The owner authorized this Cloudflare migration on 2026-11-16. Current execution details are in `LAUNCH.md`. Tick only when the "Done when" line is true. Never edit or delete mail records (MX, TXT, DKIM CNAMEs) at any step.

## Before you start (do these first, any order)
- [x] **Alias.** Owner confirmed on 2026-11-17 that `info@medical-rank.com` receives and sends mail successfully after the nameserver change.
- [ ] **Search Console exports** (see `LEGACY-URLS.md`): Performance > Pages (16 months), Links > Top linked pages, Page indexing > Indexed list. Run `node scripts/gsc-classify.mjs --pages … --links …` in `astro-site/`, or send me the files. Add a redirect only for a URL that has traffic or links **and** a genuinely relevant new page.
- [x] **Go-live date.** 2026-11-17 committed and deployed to preview at `10c02fd156e6`; guide date, main routes and preview noindex checked remotely before production release.
- [x] **Netlify rollback target.** Production `main@716ad9737`, deployment `67100d3f4b48fd000882034f`. Automatic publishing locked on 2026-11-17; UI confirms “Auto Publishing Locked.” Both domain assignments and deploys preserved.

## A. Export the DNS at Porkbun (changes nothing)
- [x] Full authenticated Porkbun table and screenshot saved locally: 8 records, TTL 600. Actual apex is an ALIAS to Netlify; all MX, TXT and the existing DKIM CNAME are included. No other rows were present.

## B. Stage the zone on Cloudflare (still no visitor impact)
- [x] Full Free zone created. Nameservers: `dalary.ns.cloudflare.com`, `ray.ns.cloudflare.com`.
- [x] All 8 records recreated DNS-only, TTL 600. Apex ALIAS represented by apex CNAME to the same Netlify target; www unchanged. All mail values and priorities identical.
- [x] Scripted comparison and independent reviewer passed: no missing or extra records. Direct queries to both Cloudflare nameservers match Porkbun for A, MX, TXT, DKIM and www.

## C. Change the nameservers (separate sitting; Netlify still serves the site)
- [x] Nameservers updated at Porkbun; saved values, .com registry and 1.1.1.1 / 8.8.8.8 confirm Cloudflare delegation. No DS record was present immediately before the change.
- [x] Cloudflare zone is **Active**; registry and public resolvers show Cloudflare delegation. Website DNS still resolves to Netlify.
- [x] Owner confirms inbound/outbound mail works after nameserver migration. Header-level SPF/DKIM inspection is not claimed; existing DNS records were preserved exactly.
- [x] Universal SSL is **Active** for apex and wildcard, expires 2027-02-14. Always Use HTTPS enabled.
- [ ] Optional dry run: attach `staging.medical-rank.com` as a custom domain of the **preview** Worker only; check it loads over HTTPS with the noindex header; remove it afterwards.

## D. Cut over (only after A to C are done and you have a quiet hour)
- [x] Production Worker `medical-rank` created without targets from `10c02fd156e6`, version `f6568b8a-e599-4d5b-abad-07f256dac30e`. Strict production verification passed; workers.dev and version URLs are off.
- [ ] Add `medical-rank.com` as the Worker's custom domain (dashboard, or add `"routes": [{"pattern": "medical-rank.com", "custom_domain": true}]` to `wrangler.jsonc` and commit). Replace only the staged apex CNAME to Netlify; preserve mail and verification records.
- [ ] `www`: delete the CNAME to Netlify; add a **proxied** placeholder `A 192.0.2.0` (or `AAAA 100::`); add a Redirect Rule: hostname equals `www.medical-rank.com` > dynamic redirect to `concat("https://medical-rank.com", http.request.uri.path)`, **301**, preserve query string.
- [ ] Do **not** remove either domain from Netlify.

## E. Verify (right after D)
- [ ] `curl -sv https://medical-rank.com/ -o /dev/null 2>&1 | grep -iE "issuer|expire|verify"`: verifies; same for `www.medical-rank.com`. Also `http://` for both ends at `https://medical-rank.com/`.
- [ ] `curl -sI "https://www.medical-rank.com/guides/x/?a=1&b=2"`: `301` and `location: https://medical-rank.com/guides/x/?a=1&b=2`.
- [ ] `/`, both `/services/` pages, `/resources/`, the guide and the worksheet return 200; `/dental`, `/pricing`, `/physical-therapy/pod` return 404. The sitemap includes every built indexable page (including both service pages and Resources) and excludes worksheets, empty noindex hubs and 404. `/robots.txt` allows crawling; **no `x-robots-tag` on the production hostname** (`curl -sI https://medical-rank.com/ | grep -i x-robots` prints nothing); the worksheet has `noindex,follow`. Run `npm run verify:production` for the full route checks.
- [ ] Mail again (inbound to the alias and outbound). Search Console: the domain property still verifies; submit `https://medical-rank.com/sitemap-index.xml`.

## F. If anything fails: roll back to Netlify (minutes)
- [ ] If rollback is needed: remove the Worker's apex custom-domain binding; restore apex `CNAME apex-loadbalancer.netlify.com` and `www CNAME medicalrank.netlify.app`, both **DNS-only**, and disable the Redirect Rule. Re-run E against the old site. Mail records are untouched.
- [ ] Netlify certificates expire **2026-12-20** and may not renew while DNS points elsewhere: **end the rollback window by 2026-12-01**, or re-issue the Netlify certificates before staying longer.

## G. After the window closes (not before)
- [ ] When Cloudflare is stable and the window has closed: delete the Netlify site (this also stops `medicalrank.netlify.app` serving the old pages). Then delete the `medical-rank-preview` Worker and any staging domain.
