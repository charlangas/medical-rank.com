---
id: ads-bookings-check
title: "Ads-to-bookings check: worksheet"
status: published
description: "A printable worksheet for comparing your Google Ads report with your clinic booking report. Desk-checked on hypothetical reports; not yet tried by a practice."
---
# Ads-to-bookings check — worksheet

**Start here: which path do you need?**

| If this is true | Fill in | Print |
|---|---|---|
| You have **totals only**: your clinic system doesn't automatically store a click ID or ad tracking value with each request, or you don't know | Sections 1, 2 and 3, then **4A (Path 1, totals only)**, then 5 | **Quick check** (Sections 1, 2, 3, 4A, 5) |
| Your clinic system **does** store a click ID automatically. (For a cost you will also need click date and campaign for those clicks: see Step 2) | Sections 1, 2 and 3, then **4B (Path 2, booking-level)**, plus 4A for any route without a link, then 5 | **Everything** |
| You're **not sure** | Sections 1, 2 and 3. Section 3 decides which path | Quick check first |

**Totals only, or not sure? Send your Google Ads agency this message now.** You don't need to finish the worksheet first. Attach the Google Ads report for the period you are checking.

> Hello, I'm checking what our Google Ads numbers can and can't tell us about appointment requests. Using the attached report for [dates], could you answer five questions?
>
> 1. Which conversion actions are primary, and what exactly does each one count?
> 2. Which goal type does each campaign use (account-default, campaign-specific or custom), and does that explain any gap between the Conversions total and the primary actions?
> 3. What are the count settings (One or Every), and what is the minimum call length?
> 4. What date does the report count each conversion on?
> 5. Can you export individual call details, and individual form conversions with their times?

**Start with two reports you already have:** the Google Ads report and the booking report from your clinic management system. You do not need the front desk to log anything new to begin.

Write **counts and notes only** on this sheet. Individual patient or caller records stay inside the practice.

Practice / reviewer: ______________________  Date completed: ____________

*Desk-checked on hypothetical report sets by AI reviewers (not people). No practice has tried it yet.*

<div class="no-start">

**Words used on this sheet**

| Word | Means |
|---|---|
| Event | One thing Google Ads counted (a form submit, a call over the minimum length, an imported event). Not a person. |
| Request | One submission or call asking for an appointment. The same person can make several. |
| Person | One individual. Count each person once. |
| Booking | An appointment placed on the schedule for a person. Some reports call these "appointments." |
| Attended | The person came to the appointment. |
| Ads numbers | The figures in your Google Ads report. |

</div>

---

## 1. The Google Ads report

**1a. Basics**

| | Write down |
|---|---|
| Period covered | |
| Date basis (ad-click date / conversion date / other / don't know) | |
| Total cost | |
| Campaigns included | |

**1b. Conversion actions** (one row per action, including secondary ones)

| Action name | What event it counts (form, call over N seconds, tap on a number, imported from Analytics, other) | Primary or secondary, **as printed in the report** | Count setting (One / Every) | Count |
|---|---|---|---|---|
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |

**1c. Totals**

| | |
|---|---|
| "Conversions" column total | |
| "All conversions" column total | |
| Sum of the rows marked **primary** | |
| Difference (Conversions total minus that sum) | |

If the difference is not zero, write it down. It is a **net** figure: a custom goal can add some events and drop others, so don't assign it to one cause. You may write a guess, marked **unconfirmed**, and ask the agency to confirm. Never change a count because of a guess. Google Ads lets each campaign use **account-default goals**, **campaign-specific goals**, or a **custom goal**. A custom goal counts every action in it, whether primary or secondary. Actions created through Analytics start as secondary.

**1d. By campaign** (if the report shows it)

| Campaign | Goal type (account-default / campaign-specific / custom / unknown) | Conversions | Cost |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

**1e. Cost per event (a platform figure, your own division):** Total cost ÷ "Conversions" total = ______ . This is a cost per **event**, not per person, request or booking.

---

## 2. The booking report from the clinic system

**2a. Basics**

| | Write down |
|---|---|
| Report name | |
| Period covered (if different for different parts, write each) | |
| Date basis (date requested / date booked / appointment date / other) | |
| What counts as a "new patient" | |
| Statuses shown (attended, no-show, cancelled, upcoming) | |
| Date you pulled the report | |

**2b. What the system keeps**

| Question | Answer |
|---|---|
| Is there a **source / referral** field? Is it filled **automatically** or **chosen by staff**? | |
| Does any record carry a **click ID** or other ad tracking value captured automatically? | |
| Is there a **request log** that links requests to bookings? | |
| Can the report be pulled by the **date the request was made**, over the same period as the Ads report? | |

**2c. Totals** (bookings, not people). If the report counts appointments by **appointment date**, say so here: bookings made in other months may be included or missed.

| New-patient bookings | Attended | No-show | Cancelled | Upcoming |
|---|---|---|---|---|
| | | | | |

---

## 3. Which path? (one row per action in the Ads report)

A route is on **Path 2** only if each booking, or the request that produced it, carries a click ID or other ad tracking value **captured automatically when the person made the request**. A source field chosen by staff is **not enough on its own**: it records what someone remembered or typed, not a link to an ad.

**Having a click ID is not enough to put a booking in a cost.** A cost needs each counted booking to trace to a click that happened **inside the Ads spend period**, in a **campaign included in that spend**. That means matching click IDs to a click-level Ads export (Section 4B, Step 2). If you don't have that export, use the counts you can and leave cost blank; with no click ID at all, use Section 4A (totals only).

Write "secondary" next to any action printed as secondary. Secondary actions appear in "All conversions". A tap on a phone number on a mobile site counts the click, not a call. Actions in a custom goal are used for reporting and bidding whether primary or secondary, so a custom goal can change what "Conversions" shows for a campaign: if you see one, ask the agency.

| Action from 1b | Link captured automatically? (yes / no / unknown) | Path |
|---|---|---|
| | | |
| | | |
| | | |
| | | |

- If every row is **no or unknown**, complete **Section 4A** only.
- If a row is **yes**, complete **Section 4B** for it and **4A** for the others (write the names of the no/unknown rows at the top of 4A, and fill 4A only for those).

---

## 4A. Path 1 — totals only (rows marked no or unknown: ______________)

**What each report measures**

| Report | Measures | Does not measure |
|---|---|---|
| Ads "Conversions" | Events counted by the primary actions (and any custom-goal actions) in the period | People, requests, bookings, or patients |
| Booking report | New-patient bookings by the date basis in 2a | Where each person came from, unless a link was captured automatically |
| Source field (if staff-chosen) | A label someone chose | A verified link to an ad |

**What remains unknown** (tick what applies)

- [ ] Which bookings, if any, came from an ad click
- [ ] Whether the people behind ad events and the people in bookings overlap
- [ ] Whether Ads call events are the calls that led to bookings
- [ ] How many events are repeats by the same person
- [ ] Whether the source field is accurate

**Do not** estimate ad-attributed bookings from totals, from the source field, or from how closely monthly Ads numbers and booking counts rise and fall together. Counts that move together are not a link.

**Questions to send**

*To the agency (the same five questions as in the starting message):* (1) Which conversion actions are primary, and what exactly does each one count? (2) Which goal type does each campaign use (account-default, campaign-specific or custom), and does that explain any gap between the Conversions total and the primary actions? (3) What are the count settings (One or Every), and what is the minimum call length? (4) What date does the report count each conversion on? (5) Can you export individual call details, and individual form conversions with their times?

*To the clinic software provider:* (1) Can the request form store a click ID or ad parameter automatically with each request, and keep it through to the booking? (2) Can the report show requests separately from bookings? (3) Can the source field be set automatically instead of chosen by staff? (4) Can the report be pulled by date requested and by appointment date?

**What you can conclude from totals:** what each report counts, what is unknown, and which questions to ask. You may quote the cost per event from 1e. **You cannot state ad spend per booking.**

For the rows on this path, your ceiling (Section 5) has no use yet: it is for when you have ad spend per verified booking.

**While you wait for answers (no new front-desk entry needed):** save both reports each month so a record exists; ask the agency whether it can supply call details; ask the provider for the click ID capture. Hold spending changes you were planning because of the Ads numbers for one cycle.

---

## 4B. Path 2 — booking-level evidence (rows marked yes)

**Step 1. Define the cohort by the click, not the request.** Clicks made between ____ and ____ (exactly the Ads spend period), in these campaigns: ______________ (exactly the campaigns in the spend). Follow the resulting requests until ____ (the date you pulled the report). Bookings still upcoming on that date are **upcoming**, not failures. Requests made *after* the spend period from clicks *inside* it count too if your pull includes them. If your pull stops at the end of the period, say so: the count is then a floor.

**Step 2. Count requests with a click ID, then check each click.**

| Requests in the pull (total: ____ ). Read the rows as a funnel: only requests with a click ID are checked | Count |
|---|---|
| Carry a click ID | |
| Click ID **matched** to a click-level Ads export, if you have one (it must show click date and campaign) | |
| ...click **inside** the spend period and campaign **in** the spend → **eligible** | |
| ...click **before** the period (for example, the month before) → not eligible | |
| ...campaign **not in** the spend, or campaign **unknown** → not eligible | |
| Click ID **not found** in the export → not eligible | |

Only **eligible** requests go forward. The others stay in the sheet as "link present, click not eligible" and are kept out of every cost. If you have **no click-level export**, stop here for cost purposes: write under Step 8 "Missing: click date and campaign for each click ID", fill in the counts you can, and **leave cost blank**.

*Asking for the export.* Ask the agency **whether it can provide the click ID, click date and campaign for the relevant clicks**: the clicks in your spend period, in the campaigns in your spend. Two things to keep apart:
- **What Google documents:** the Google Ads API's `click_view` reference lists the click ID (`gclid`), a date segment, and `campaign` as a resource you can select alongside it. Queries must be limited to one day each and reach back at most 90 days. Click IDs aren't available for some app campaign types. Both pages are for API version v26, the current version on 2026-11-08 ([field reference](https://developers.google.com/google-ads/api/fields/v26/click_view) and [ClickView reference](https://developers.google.com/google-ads/api/reference/rpc/v26/ClickView)). Google retires older API versions on a schedule, so the version in these links will change. That is a documented API capability, not a promise about what your agency can run.
- **What you have:** an export someone has actually produced for your clicks. Until you hold one, treat it as **not obtained**. Whether your agency can run it, how, and with which fields is theirs to confirm, and the help-center pages we read don't describe this report.

*Booking-level follow-up message (Path 2 only).* This is separate from the starting message at the top: send it in addition, not instead. If your clinic system already stores a click ID with each request, you can send the agency this. It asks only whether they can do it. If they say yes, how any click IDs are shared is up to your practice's own approved process; this worksheet doesn't tell you to send them.

> Hello, our clinic system already stores a Google click ID with each appointment request. For clicks dated [start] to [end] in [campaigns], can you confirm whether you can provide the click date and the campaign for each of those click IDs? If you can't do it for some of them, please tell us which and why, and what you would need from us. We aren't asking you to change any tracking.

*Do not attach any click IDs to this first message.*

Ask early: a 90-day reach means each click needs exporting within 90 days of its click date. If the answer is no, or the export lacks click date or campaign, keep the **totals-only fallback**: complete Section 4A, send its questions, and leave cost blank.

**Step 3. Count people, not requests.** (A person whose booking is later excluded as not a new patient still counts as an eligible ad-linked person; only the booking is excluded.) The same person submitting twice is one person. If one person has requests with different click dates, count the person only if the request that led to the booking has an eligible click. Repeats removed: ____ . **Unique eligible ad-linked people: ____ .**

**Step 4. Follow those people to bookings.**

| | Count (people / bookings) |
|---|---|
| Unique eligible ad-linked people | |
| Not booked (reasons: unreachable / declined / out of area / other) | |
| Booked | |
| − Booked but **not a new patient** (exclude) | |
| **Verified new-patient bookings created** (any status: attended, no-show, cancelled and upcoming all count) | |
| of which attended | |
| of which no-show | |
| of which cancelled | |
| of which upcoming | |

Bookings from requests with **no** click ID, or with a click ID that was **not eligible**: ____ . Keep them out of the verified count, and list the reason for each. Some may be ad visitors whose click ID was lost or whose click is outside this period, so the verified count is a **floor** for this period's clicks.

**Step 5. What the link covers**

| Ads events on rows marked yes | Eligible requests (Step 2) | Written note |
|---|---|---|
| | | |

Write both numbers. If they differ, you may list possible reasons marked **unconfirmed** (for example, timing, repeat submissions, or lost click IDs), but do not change any count because of them.

Rows without a link stay **unknown**. Do not count their bookings, and do not credit the staff source field.

**Step 6. Alignment (check before any cost).**

| Question | Answer |
|---|---|
| Does **every** booking in the verified count trace to a click dated inside the spend period, in a campaign included in the spend? Write where the evidence came from (the export, with its file name and date if it has them). A missing file name doesn't matter. A booking whose click date or campaign can't be confirmed comes out of the count (see below). | |
| Spend by click date, and the cohort chosen by click date (Step 1): same dates? If spend is by conversion date or another basis, write that. | |
| Did the booking pull include requests made after the spend period? (If not, the count is a floor: that is acceptable for the upper bound in Step 7. Say so.) | |
| Does spend include routes the link does **not** cover (for example calls, taps, clicks that never converted)? | |
| Can spend be split by route? (Usually not.) | |

If the first answer is "no" or "can't tell" for a particular booking, **take that booking out of the count** and list it as "click not verified". If you have **no** click-level export at all, so you can't answer it for any booking, **leave cost blank** and write what is missing. If the dates differ, or bookings are only available by appointment date, leave cost blank and re-pull.

**Step 7. Costs**

*What this figure covers (write it out):*
- Spend: $______ for Google Ads clicks dated ____ to ____ in the campaigns ______________ , across **all** routes (calls, taps, forms, clicks with no conversion).
- Outcomes: **verified bookings**, meaning new-patient bookings **created** from requests whose click ID matched an eligible click, counted once per person, in **any** status as of ____ (cancelled, no-show and upcoming included).
- Not covered: phone bookings, requests with no click ID, requests with an ineligible click, bookings from this period's clicks requested after your pull.

**Ad spend per verified booking** = Spend ÷ verified bookings = $______ . Arithmetic on the scope above, nothing more.

**What the upper bound applies to.** Some bookings that really came from clicks in the spend period may be missing from the verified count: a lost click ID, an export that couldn't find the click, or a request made after your pull. So the true ad spend per *eligible* booking (every new-patient booking created from clicks in the spend period, in the campaigns in the spend) is **no higher than** the figure above. It is an upper bound on that, only if each verified booking truly met the rules in Step 2. It is **not** a bound on what the ads caused, on calls, taps or phone bookings, or on any other period. If the figure is **above** your ceiling, it is **inconclusive**, because the missing bookings could bring the true figure down.

**Ad spend per attended first visit** = Spend ÷ attended = $______ . A **different** measure: it counts only people who came. Label it **provisional** while any bookings are upcoming. It depends on no-shows as well as ads, and has its own ceiling (optional, Section 5).

**Small numbers:** with only a handful of bookings, one or two more or fewer changes these costs a lot. Treat them as a reading to repeat next period, not a result.

**Step 8. What remains unknown:** ____________________________________________

---

## 5. Next step (write in once)

**Your ceiling, defined:** the most you'd pay for one new-patient booking **created**, if cancelled, no-show and upcoming bookings **all count** as bookings: ______ . **Optional, separate:** the most you'd pay per **attended** first visit: ______ . These are your own numbers, from your own economics. On Path 1 you can leave them blank for now: they have no use until you have ad spend per verified booking. Compare the booking cost only to the booking ceiling and the attended cost only to the attended ceiling.

| What you found | Next step |
|---|---|
| Every row is Path 1 | Hold changes you were planning because of the Ads numbers. Send the questions in 4A. Repeat after one cycle. Whether to reduce spend while you measure is a risk choice about what you can afford to lose; it isn't a finding about performance. |
| Path 2 for some rows, and ad spend per verified booking is **at or below** your ceiling | Descriptive only: over the scope written in Step 7 of Section 4B, the upper bound on spend per eligible booking is no higher than your ceiling, if each verified booking met the Step 2 rules (Section 4B). This does not show the ads caused the bookings, and says nothing about routes the link doesn't cover. Repeat next period before treating it as settled. |
| A mix: Path 2 for some rows, Path 1 for others | Use the Path 2 row above for the covered rows. For the Path 1 rows, hold planned changes and send the 4A questions. |
| Path 2 for some rows, and ad spend per verified booking is **above** your ceiling | **Inconclusive.** Eligible bookings may be missing from the verified count, and uncovered routes may hold more. Don't call the campaign poor. Close the gaps (unverified clicks, late requests, uncovered routes), then repeat. If it is still above your ceiling once the gaps are closed, that is a reason to review the campaign with your agency, not yet a verdict. |
| Ad spend per attended first visit is above your optional per-attended ceiling, but ad spend per verified booking is not | Inconclusive on its own. An upcoming booking may still attend, and the attended count may be missing eligible visits, in the same way the booking count may be, and it also depends on no-shows and cancellations, not only on the ads. Look at reminders and rescheduling before changing the campaign, and repeat next period. |
| Spend and cohort aren't aligned | No cost figure. Re-pull on matching dates first. |

**Conclusion in three lines**
- What is counted: ____________________________________________
- What remains unknown: ____________________________________________
- What the evidence supports doing: ____________________________________________
