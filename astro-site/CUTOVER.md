# Cutover and rollback runbook: Netlify to Cloudflare Workers

Nothing here has been run. Stop points: nameservers, DNS records and the production custom domain are untouched. Netlify keeps serving production until the final step.

## Measured current state (2026-11-09, from outside; `dig`, `curl`)
- Registrar and DNS host: Porkbun. Nameservers `fortaleza`, `maceio`, `salvador`, `curitiba` `.ns.porkbun.com`. **No DNSSEC** (no DS record), so moving nameservers needs no DS change.
- Apex `A 75.2.60.5` and `A 99.83.231.61` (Netlify). No AAAA, CAA or apex CNAME seen. `www CNAME medicalrank.netlify.app`.
- Mail: `MX 1 smtp.google.com.` and `MX 15 4x5o4fg4…mx-verification.google.com.`; `TXT v=spf1 a mx include:_spf.mlsend.com include:_spf.google.com ~all`; `TXT google-site-verification=…`; `TXT openai-domain-verification=…`. `_spf.mlsend.com` means an email-marketing sender (MailerLite) is in use, so **DKIM/other CNAME or TXT records probably exist** that `dig` cannot find by guessing (no `_dmarc` record was found).
- Netlify serves `www` with a 301 to the apex; apex sends HSTS `max-age=31536000`. Both hostnames use a Let's Encrypt certificate that **expires 2026-12-20**.

## 1. Full Porkbun DNS export (needed before anything else)
`dig` cannot list a zone. In Porkbun, open the domain's DNS records and save every record (screenshot plus copy of the table; the page also has an export/copy option). It must include: apex A records, `www`, **all MX**, **all TXT** (SPF, Google and OpenAI verification, any DMARC), **every `_domainkey` CNAME/TXT** and any sending-provider CNAMEs (MailerLite or others), `autodiscover`/`mail`-style subdomains, SRV and CAA records, plus any URL-forward or parking records Porkbun added. Cloudflare's zone import can also scan Porkbun's live records, but treat the Porkbun table as the source of truth and diff against it.

## 2. Stage the zone on Cloudflare (no traffic change)
1. In Cloudflare add `medical-rank.com` as a zone (full setup) in the account that holds the Worker. Free plan is enough for this.
2. Recreate every record from step 1 exactly, with apex A and `www` pointing at Netlify as **DNS-only (grey cloud)**. Mail records are always DNS-only. Turn proxying off on everything for now.
3. Diff the Cloudflare record list against the Porkbun export, line by line. Have a second person check the mail records.
4. Cloudflare will show the two assigned nameservers. Do **not** change them yet.
5. Optional end-to-end test of Cloudflare's custom domain, TLS and redirect machinery without touching production hostnames: after step 7 below, attach `staging.medical-rank.com` as a custom domain of the **preview** Worker `medical-rank-preview` (noindex build). Delete it afterwards.

## 3. Nameserver change (separate step, still serving Netlify)
Pick a quiet hour. At Porkbun replace the four nameservers with the two Cloudflare gave you. Traffic keeps reaching Netlify because the staged records point there. Old NS TTL is 86400, so propagation can take up to 48 hours. Verify while waiting: `dig NS medical-rank.com`, `dig MX medical-rank.com +short`, `dig TXT medical-rank.com +short` against both the old and the new nameservers; the site and mail must work exactly as before; send and receive a test at `info@medical-rank.com`. Proceed only when Cloudflare shows the zone **Active** and **Universal SSL is active** (SSL/TLS > Edge Certificates; whether it issues before proxying is on, confirm in the dashboard).

## 4. Production release and cutover (do not start without sign-off)
1. Commit the go-live date; `npm run release:preview`, retest; then `npm run release:production` (creates Worker `medical-rank` with no domain and workers.dev off). Record the deployment ID and commit.
2. Add the Worker's custom domain for `medical-rank.com`. Add `routes: [{ "pattern": "medical-rank.com", "custom_domain": true }]` to `wrangler.jsonc` and commit it, so the config stays the source of truth (Cloudflare docs: a custom domain cannot be created on a hostname with a CNAME; remove the two apex A records if Cloudflare prompts).
3. For `www`: delete the CNAME to Netlify, create a **proxied** placeholder record (`A 192.0.2.0` or `AAAA 100::`, per Cloudflare docs) and a Redirect Rule: when hostname equals `www.medical-rank.com`, dynamic redirect to `concat("https://medical-rank.com", http.request.uri.path)`, status **301**, **preserve query string**. A Redirect Rule is zone-level because `_redirects` cannot match hostnames.
4. Keep `medical-rank.com` and `www` assigned in Netlify and leave its deploys alone.

## 5. Verification after cutover
- TLS: `curl -sv https://medical-rank.com/ -o /dev/null 2>&1 | grep -iE "issuer|expire|verify"` and the same for `www.`; both must verify. Test `http://` for both ends at `https://medical-rank.com/`.
- www redirect with path and query: `curl -sI "https://www.medical-rank.com/guides/x/?a=1&b=2"` must show `301` and `location: https://medical-rank.com/guides/x/?a=1&b=2`; repeat with `http://www…`.
- Pages: `/`, guide, worksheet 200; `/sitemap-index.xml` lists homepage and guide only; `/robots.txt` allows crawling; worksheet has `noindex,follow`; **no `x-robots-tag` header on the production hostname**; canonicals are the apex.
- Real 404 for `/dental`, `/pricing`, `/blog/x`.
- Mail: send and receive a test at `info@medical-rank.com`; check SPF/DKIM pass in message headers; confirm Google Search Console still verifies the domain.
- Then submit `https://medical-rank.com/sitemap-index.xml`.

## 6. Rollback to Netlify
Save the Cloudflare DNS list and the Porkbun export before step 4.
- **Fast (minutes), while Netlify still has both domains:** in Cloudflare DNS remove the Worker custom domain from the apex, re-create `A 75.2.60.5` and `A 99.83.231.61` and `www CNAME medicalrank.netlify.app` (all DNS-only), disable the Redirect Rule. Re-run the step 5 checks against the old site. Mail records are never touched.
- **Content-only** (Worker is live but a release is bad): `wrangler rollback` or Dashboard > Worker > Deployments > Rollback restores a previous Worker version across all routes. This needs a previous version, so it does not apply to the very first production release.
- **Full (slow):** restore the four Porkbun nameservers. Up to 48 hours; use only if Cloudflare DNS itself fails.
- **Certificate caveat:** Netlify's certificates expire 2026-12-20. Once DNS points at Cloudflare, Netlify may not be able to renew them, so a rollback after about mid-December could land on an expired or about-to-expire certificate. **Close the rollback window by 2026-12-01**, or re-provision the Netlify certificates first if you plan to stay longer. HSTS is set on the live site, so an invalid certificate would block visitors entirely.

## 7. The old `medicalrank.netlify.app` hostname
It serves the old site with a 200 and no redirect today, a duplicate host. After the rollback window closes: **delete the Netlify site** (recommended; the hostname then stops serving). Alternative that keeps a redirect: before the final cutover, deploy to Netlify a `_redirects` rule `https://medicalrank.netlify.app/* https://medical-rank.com/:splat 301!` (the Netlify docs describe this host-level form and require the source host to be assigned to the site; the netlify.app case is inferred, not tested; `http://` needs its own rule). Do not leave the old site serving indefinitely.

## Only verifiable after cutover
Real 301 from `www` with path and query, TLS on both hostnames, Universal SSL timing, live 404 and 307 behaviour on medical-rank.com, mail delivery and DKIM, Search Console verification, Google honouring the worksheet `noindex`, inbound links to the podcast route, and the effect of removing the Netlify site.
