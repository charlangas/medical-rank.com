# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Medical practice owners and people with authority to choose or recommend a marketing provider in the United States. The audience includes independent physicians, specialty-clinic owners and decision makers at small multi-location practices. They need nearby patients to find their practice and a clear way to decide what marketing work is worth doing.

## Product Purpose

Medical Rank is an agency offering two core services to US medical practices:

- Local SEO: Google Business Profile, local listing accuracy and relevant practice website pages.
- Google Ads: search campaign management, ad copy, landing pages and enquiry reporting.

Website and landing page improvements and measurement support those services. They are not separate primary offers in the homepage navigation.

The homepage helps owners understand the offer, judge fit and start a conversation. Success means qualified service enquiries and appropriate sales conversations. Guides, articles and worksheets support that goal by demonstrating the agency's approach and attracting relevant readers. Content engagement is a supporting measure, not the homepage's primary conversion.

## Positioning

Local SEO and Google Ads for medical practices. Medical Rank carries out the work, agrees on priorities and explains what the available reports show. The voice is plain and practical, aimed at owners and decision makers.

The agency identity appears in the homepage, navigation, service pages and About page. Editorial resources remain useful whether or not the reader becomes a client; sources and limits are stated, and the commercial interest is disclosed. Medical Rank does not promise rankings or patient outcomes.

## Operating Context

- Readers evaluate with the tools they already have: Google Ads reports, Google Business Profile, their booking or practice-management system, agency invoices and reports.
- Some content ships with printable worksheets meant to be filled in at a desk or taken to an agency meeting.
- Healthcare advertising and privacy rules (Google healthcare ad policies, HIPAA, FTC) are part of the subject matter.

## Capabilities and Constraints

- Astro static site on Cloudflare Workers static assets. Apex `medical-rank.com` is the canonical host; trailing slashes always.
- Commercial service pages live at `/services/local-seo/` and `/services/google-ads/`. Global navigation leads with these two services, followed by About, Resources and the enquiry action.
- `/resources/` brings together two content streams: hand-built guides (`/guides/`, `src/content/posts`, with sourced evidence notes and a build gate) and articles written by the SEO engine (`/blog/`, `src/content/blog`, auto-published twice a week). Existing guide and article URLs are preserved.
- Educational topic hubs cover local SEO, Google Ads, websites and marketing measurement. Specialty hubs live under `/specialties/`. The old paths (`/dental`, `/chiropractors` and the rest) stay retired as 404s.
- Contact offers a short form when its Cloudflare Worker endpoint is configured; otherwise it offers an email link. The form needs spam protection and a privacy page. Contact address: `info@medical-rank.com`. Do not imply a scheduling or audit-delivery workflow that does not exist.
- History: the domain ran 25,225 location-swapped template pages from August 2024 and was largely de-indexed. Nothing on the new site may resemble that: no city or state page families, no templated near-duplicates.
- Undecided: specialty rollout, actual service fees, contract terms, reporting cadence and additional approved proof. Do not invent these details.

## Brand Commitments

- Name: Medical Rank. Existing logo at `public/img/logo.svg` and favicons.
- Voice already established in the guide: plain, exact, says what can't be concluded as readily as what can. "We don't promise rankings."
- Run by Carlos Ochoa, named as author.

## Evidence on Hand

- One published guide with primary sources: `src/content/posts/is-google-ads-bringing-in-booked-appointments.mdx`, and its worksheet.
- Author: Carlos Ochoa. A real bio is to be supplied or approved by him; today the only approved sentence is "Medical Rank is run by Carlos Ochoa."
- Client results: permissioned case studies or figures exist in principle but none has been supplied yet. Do not write, estimate or imply any until the owner provides them.
- Not available, never to be fabricated: testimonials, clinician reviewers, client logos, benchmarks, rankings claims, awards. `sample-benchmark-cost-per-event.mdx` is a layout sample with invented numbers and must not be published.

## Product Principles

1. Make the agency offer and next step clear. The homepage leads with local SEO and Google Ads, and the primary action is “Talk about your practice.”
2. Say what the evidence supports and where it stops. Sources are named; limits are disclosed.
3. One good page beats a thousand thin ones. Nothing is published to fill a grid.
4. Commercial interest is stated, not hidden. The agency leads the site; guides and articles sit within a clear resources area.
5. Written for clinicians and operators, not marketers: no jargon without a plain explanation.

## Accessibility & Inclusion

WCAG 2.2 AA. Readers include older clinicians and people reading between patients on a phone; guides and worksheets must print cleanly.
