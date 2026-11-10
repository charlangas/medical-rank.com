# Your ordered checklist: Cloudflare, Porkbun, Netlify

You do every step here; nothing has been changed. Stop and ask for help at any step that does not match. Tick only when the "Done when" line is true. Never edit or delete mail records (MX, TXT, DKIM CNAMEs) at any step.

## Before you start (do these first, any order)
- [ ] **Alias.** Create `info@medical-rank.com` as an alias where your mail is hosted (the MX points to Google). Send to it from an outside account (not a medical-rank.com address) and confirm it arrives. *Done when:* the message is in the inbox that receives the alias.
- [ ] **Search Console exports** (see `LEGACY-URLS.md`): Performance > Pages (16 months), Links > Top linked pages, Page indexing > Indexed list. Run `node scripts/gsc-classify.mjs --pages … --links …` in `astro-site/`, or send me the files. Add a redirect only for a URL that has traffic or links **and** a genuinely relevant new page.
- [ ] **Go-live date.** Decide the guide's `published:` date (cutover day is the real first public release). Needs a commit and a preview re-run before the production release.
- [ ] **Netlify rollback target.** In Netlify > Deploys, write down the current Production deploy. Check whether the site is Git-linked; if it is, lock auto publishing. Do not change anything else in Netlify.

## A. Export the DNS at Porkbun (changes nothing)
- [ ] Porkbun > Domain Management > medical-rank.com > DNS Records. Save the full table (screenshot plus copy of every row). It must include: both apex A records, `www`, **all MX, all TXT, every `_domainkey` and sending-provider CNAME** (SPF names MailerLite, so expect some), `_dmarc`, any other CNAME/TXT/SRV/CAA. *Done when:* every row is saved, including TTLs. Do not continue without this.

## B. Stage the zone on Cloudflare (still no visitor impact)
- [ ] Cloudflare > Add a domain > `medical-rank.com` (full setup, free plan). Cloudflare shows two nameservers: write them down. **Do not change nameservers yet.**
- [ ] Recreate every record from step A. Apex A `75.2.60.5` and `99.83.231.61`, and `www` CNAME `medicalrank.netlify.app`, all **DNS only (grey cloud)**. All mail records DNS only and identical (value, priority, TTL).
- [ ] Diff the Cloudflare list against the Porkbun table row by row. *Done when:* the counts match and every value is identical. Have a second person check the mail rows.

## C. Change the nameservers (separate sitting; Netlify still serves the site)
- [ ] Porkbun > Authoritative Nameservers: replace the four Porkbun nameservers with the two Cloudflare gave you. (There is no DNSSEC/DS record to remove.)
- [ ] Wait until Cloudflare shows the zone **Active** (up to 48 hours; old NS TTL is 86400). Meanwhile check `dig NS medical-rank.com +short` and that `https://medical-rank.com/` still loads (still the old site).
- [ ] Re-test mail: send an outside message to `info@medical-rank.com` and one outbound message; confirm both arrive. Check SPF and DKIM pass in the message headers.
- [ ] Cloudflare > SSL/TLS > Edge Certificates: *Done when* Universal SSL shows **Active**. If it is still pending, wait; do not cut over.
- [ ] Optional dry run: attach `staging.medical-rank.com` as a custom domain of the **preview** Worker only; check it loads over HTTPS with the noindex header; remove it afterwards.

## D. Cut over (only after A to C are done and you have a quiet hour)
- [ ] Ask me (or run yourself) the production release: `npm run release:production` from a clean commit. This creates Worker `medical-rank` (no domain, workers.dev off). Write down the deployment ID and commit.
- [ ] Add `medical-rank.com` as the Worker's custom domain (dashboard, or add `"routes": [{"pattern": "medical-rank.com", "custom_domain": true}]` to `wrangler.jsonc` and commit). If Cloudflare says a record conflicts, remove only the two apex A records.
- [ ] `www`: delete the CNAME to Netlify; add a **proxied** placeholder `A 192.0.2.0` (or `AAAA 100::`); add a Redirect Rule: hostname equals `www.medical-rank.com` > dynamic redirect to `concat("https://medical-rank.com", http.request.uri.path)`, **301**, preserve query string.
- [ ] Do **not** remove either domain from Netlify.

## E. Verify (right after D)
- [ ] `curl -sv https://medical-rank.com/ -o /dev/null 2>&1 | grep -iE "issuer|expire|verify"`: verifies; same for `www.medical-rank.com`. Also `http://` for both ends at `https://medical-rank.com/`.
- [ ] `curl -sI "https://www.medical-rank.com/guides/x/?a=1&b=2"`: `301` and `location: https://medical-rank.com/guides/x/?a=1&b=2`.
- [ ] `/`, the guide and the worksheet return 200; `/dental`, `/pricing`, `/physical-therapy/pod` return 404; `/sitemap-index.xml` lists the homepage and guide only; `/robots.txt` allows crawling; **no `x-robots-tag` on the production hostname** (`curl -sI https://medical-rank.com/ | grep -i x-robots` prints nothing); the worksheet has `noindex,follow`.
- [ ] Mail again (inbound to the alias and outbound). Search Console: the domain property still verifies; submit `https://medical-rank.com/sitemap-index.xml`.

## F. If anything fails: roll back to Netlify (minutes)
- [ ] Cloudflare DNS: remove the Worker custom domain from the apex; re-create `A 75.2.60.5` and `A 99.83.231.61` and `www CNAME medicalrank.netlify.app`, all **DNS only**; disable the Redirect Rule. Re-run E against the old site. Mail records are untouched.
- [ ] Netlify certificates expire **2026-12-20** and may not renew while DNS points elsewhere: **end the rollback window by 2026-12-01**, or re-issue the Netlify certificates before staying longer.

## G. After the window closes (not before)
- [ ] When Cloudflare is stable and the window has closed: delete the Netlify site (this also stops `medicalrank.netlify.app` serving the old pages). Then delete the `medical-rank-preview` Worker and any staging domain.
