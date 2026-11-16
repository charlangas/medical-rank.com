# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Doctors, practice owners and medical practice operators (practice managers, administrators) in the United States. Independent physicians, specialty clinics and small multi-location practices that depend on new patients finding them online. They are not marketers. They arrive with a decision to make: whether their SEO or ads are working, what to spend, which agency to hire, why the phones are quiet.

## Product Purpose

Medical Rank is a content-driven resource that helps medical practices make better marketing decisions, and a small practice-marketing firm that takes on clients. It covers five areas:

- Medical SEO and local search visibility
- Google Ads and patient acquisition
- Website conversion and appointment generation
- Marketing measurement, budgets and agency selection
- Specialty-specific growth challenges

Success: practices read, trust and return to the content; search engines index and show it; some readers contact Medical Rank about services. The long-term aim is a world-class medical marketing content operation.

## Positioning

Guidance written for the practice's side of the table: what a report actually counts, what a claim can and can't support, what to ask an agency. Medical Rank sells services under its own name and says so; the content is not a sales page in disguise. It does not promise rankings.

## Operating Context

- Readers evaluate with the tools they already have: Google Ads reports, Google Business Profile, their booking or practice-management system, agency invoices and reports.
- Some content ships with printable worksheets meant to be filled in at a desk or taken to an agency meeting.
- Healthcare advertising and privacy rules (Google healthcare ad policies, HIPAA, FTC) are part of the subject matter.

## Capabilities and Constraints

- Astro static site on Cloudflare Workers static assets. Apex `medical-rank.com` is the canonical host; trailing slashes always.
- Two content streams: hand-built guides (`/guides/`, `src/content/posts`, with sourced evidence notes and a build gate) and articles written by the SEO engine (`/blog/`, `src/content/blog`, auto-published twice a week).
- Topic hubs for the first four areas above; specialty hubs under `/specialties/`. The old paths (`/dental`, `/chiropractors` and the rest) stay retired as 404s.
- Contact is a short form (name, practice, website, message) handled by a Cloudflare Worker that emails the owner. It needs spam protection and a privacy page. Contact address: `info@medical-rank.com`.
- History: the domain ran 25,225 location-swapped template pages from August 2024 and was largely de-indexed. Nothing on the new site may resemble that: no city or state page families, no templated near-duplicates.
- Undecided: which specialties launch first; the go-live date; whether a pricing or services page exists at launch.

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

1. Help the practice decide. Every page ends in something the reader can check, ask or do.
2. Say what the evidence supports and where it stops. Sources are named; limits are disclosed.
3. One good page beats a thousand thin ones. Nothing is published to fill a grid.
4. Commercial interest is stated, not hidden. Services are offered openly and kept separate from guidance.
5. Written for clinicians and operators, not marketers: no jargon without a plain explanation.

## Accessibility & Inclusion

WCAG 2.2 AA. Readers include older clinicians and people reading between patients on a phone; guides and worksheets must print cleanly.
