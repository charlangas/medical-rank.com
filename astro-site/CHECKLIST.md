# Your ordered checklist: Cloudflare, Porkbun, Netlify

The owner authorized this Cloudflare migration on 2026-11-16; production cutover completed 2026-11-17. Current IDs and evidence are in `LAUNCH.md`. Unavailable exports and unperformed header checks remain explicit below. Mail records were preserved exactly.

## Before you start (do these first, any order)
- [x] **Alias.** Owner confirmed on 2026-11-17 that `info@medical-rank.com` receives and sends mail successfully after the nameserver change.
- [x] **Search Console page performance:** owner's service account accessed the domain property; 16-month page data exported locally and classified. Retirement decisions recorded in `LEGACY-URLS.md`.
- [ ] **Additional Search Console evidence:** Links > Top linked pages and the complete indexed-page list are unavailable through this API workflow. Do not infer zero external links from the page report.
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
- [x] Cloudflare zone is **Active**; registry/public resolvers confirm delegation. Netlify kept serving during this stage, before the later Worker cutover.
- [x] Owner confirms inbound/outbound mail works after nameserver migration. Header-level SPF/DKIM inspection is not claimed; existing DNS records were preserved exactly.
- [x] Universal SSL is **Active** for apex and wildcard, expires 2027-02-14. Always Use HTTPS enabled.
- [ ] Optional dry run: attach `staging.medical-rank.com` as a custom domain of the **preview** Worker only; check it loads over HTTPS with the noindex header; remove it afterwards.

## D. Cut over (only after A to C are done and you have a quiet hour)
- [x] Production Worker `medical-rank` created without targets from `10c02fd156e6`, version `f6568b8a-e599-4d5b-abad-07f256dac30e`. Strict production verification passed; workers.dev and version URLs are off.
- [x] Apex custom domain committed in `wrangler.jsonc` and deployed at `1ef314136185`, version `6c472774-3f9a-4e7c-a48c-6924f5803ea4`. Only the conflicting Netlify apex CNAME was replaced; mail and verification records preserved.
- [x] www replaced with proxied `A 192.0.2.0`; Redirect Rule `1fa7ec3d342c4a759a5d5e3df1f205ab` enabled: exact www hostname, dynamic HTTPS apex + path, 301, query preserved. The prior DNS-only warning was resolved by the proxy change before deploying normally.
- [x] Both domain assignments and old deploy left in Netlify; automatic publishing locked.

## E. Verify (right after D)
- [x] TLS verification result 0 for apex (200) and www (301). HTTP for both redirects to HTTPS apex.
- [x] HTTP and HTTPS www preserve `/guides/x/?a=1&b=2` in a 301 to HTTPS apex.
- [x] All 18 built pages checked remotely; 11 indexable sitemap URLs, correct canonicals/robots, no preview headers, real retired/missing 404s, intended slash and legacy alias redirects. Production build verification passed.
- [x] All six mail/verification records match the registrar backup after hosting cutover: DNS-only, TTL 600. Owner confirmed inbound/outbound delivery on release day.
- [ ] Message-header SPF/DKIM inspection and a separate post-hosting-cutover mail exchange have not been performed by the agent.
- [x] Domain-property API access confirmed as Full user; sitemap-index.xml submitted (204), then retrieved (200) with matching submission timestamp. Google processing was pending at the check.

## F. If anything fails: roll back to Netlify (minutes)
- [ ] If rollback is needed: remove the Worker's apex custom-domain binding; restore apex `CNAME apex-loadbalancer.netlify.com` and `www CNAME medicalrank.netlify.app`, both **DNS-only**, and disable the Redirect Rule. Re-run E against the old site. Mail records are untouched.
- [ ] Netlify certificates expire **2026-12-20** and may not renew while DNS points elsewhere: **end the rollback window by 2026-12-01**, or re-issue the Netlify certificates before staying longer.

## G. After the window closes (not before)
- [ ] When Cloudflare is stable and the window has closed: delete the Netlify site (this also stops `medicalrank.netlify.app` serving the old pages). Then delete the `medical-rank-preview` Worker and any staging domain.
