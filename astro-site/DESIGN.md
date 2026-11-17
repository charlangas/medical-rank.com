---
name: Medical Rank
description: An agency homepage for local SEO and Google Ads for US medical practices, with a clear service hierarchy and an editorial resources area.
colors:
  blue: "#0023b0"
  blue-bright: "#355fec"
  ink: "#1c2233"
  muted: "#4a5368"
  line: "#dfe4f1"
  tint: "#f3f6ff"
  on-blue: "#dfe6ff"
  white: "#fff"
typography:
  display:
    fontFamily: "'Literata Variable', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.7rem, 5.8vw, 5rem)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.03em"
  headline-page:
    fontFamily: "'Literata Variable', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.3rem, 5vw, 4.2rem)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Literata Variable', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2rem, 4vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'Literata Variable', Georgia, 'Times New Roman', serif"
    fontSize: "1.6rem"
    fontWeight: 400
    lineHeight: 1.15
  lede:
    fontFamily: "'Atkinson Hyperlegible Next Variable', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.15rem, 1.6vw, 1.45rem)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "'Atkinson Hyperlegible Next Variable', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "tabular-nums"
  reading:
    fontFamily: "'Literata Variable', Georgia, 'Times New Roman', serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "'Atkinson Hyperlegible Next Variable', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.06em"
  meta:
    fontFamily: "'Atkinson Hyperlegible Next Variable', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  none: "0"
spacing:
  gutter: "clamp(16px, 4vw, 64px)"
  row: "1.05rem"
  column-gap: "clamp(2rem, 5vw, 4.5rem)"
  section: "clamp(3rem, 6vw, 5rem)"
  read: "44rem"
  wide: "82rem"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "0.95rem 1.4rem"
  button-primary-hover:
    backgroundColor: "{colors.blue-bright}"
    textColor: "{colors.white}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.blue}"
    rounded: "{rounded.none}"
    padding: "0.95rem 1.4rem"
  button-quiet-hover:
    backgroundColor: "{colors.tint}"
    textColor: "{colors.blue}"
  button-small:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "0.65rem 1rem"
  nav-link:
    textColor: "{colors.ink}"
    padding: "0.4rem 0"
  nav-link-active:
    textColor: "{colors.blue}"
  index-row:
    textColor: "{colors.muted}"
    typography: "{typography.title}"
    padding: "1.05rem 1.6rem 1.1rem 0"
  answer-box:
    backgroundColor: "{colors.tint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1.4rem 1.6rem 1.5rem"
  band:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.on-blue}"
    padding: "clamp(3rem, 6vw, 5rem) 0"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.8rem 0.9rem"
---

# Design System: Medical Rank

## Overview

**Creative North Star: "A clear practice-marketing agency"**

Medical Rank introduces its agency offer on the first screen: local SEO and Google Ads for medical practices, followed by a clear enquiry action. A serif nameplate sits above the blue masthead rule, the headline names the services and audience, and two service sections explain the work. The process, buying questions and final conversation invitation support a decision to contact the agency. The existing typography, white paper, deep blue, dark ink and hairline rules carry this commercial hierarchy.

The homepage gives services and contact more prominence than publishing. It may include a small featured resource below the commercial argument. The resource hub, guides and articles keep an editorial rhythm: generous at section openings, tight inside ruled lists, with serif titles over plain sans descriptions. A full-bleed blue band carries a focused conversation invitation; tinted asides give a brief answer or next step. Reading pages narrow to a single measured serif column.

The surface stays flat and square: no shadows, gradients or rounded corners. Typography and whitespace provide structure. Images are optional and must be real, approved assets when used. Missing images are omitted rather than displayed as empty production placeholders.

Motion is nearly absent and always structural: the masthead rule draws in once on load, and index rows shift their title into blue with an arrow on hover and focus. Both stop under reduced-motion.

**Key Characteristics:**
- White ground, one deep blue, dark blue-grey ink; a brighter blue appears only on hover and focus.
- Literata at regular weight for every headline and row title; Atkinson Hyperlegible Next for interface, labels and summaries.
- Rules, not boxes: a 3px blue rule for the masthead, footer and tinted asides; 1px ink under list headings; 1px pale line between rows.
- Square corners everywhere, no shadows, no gradients.
- Ruled index lists in place of cards.
- Two widths: an 82rem page and a 46rem reading column whose running text is capped at 36rem (65 to 75 characters).

## Colors

A single-hue palette: white paper, one deep blue doing the work of brand, link and structure, and a family of blue-grey neutrals.

### Primary
- **Journal Blue** (`blue`, #0023b0): The nameplate, links, primary buttons, uppercase list labels, step numerals, the 3px masthead and footer rules, the top edge of tinted asides, the text selection colour, and the full-bleed band background.
- **Interaction Blue** (`blue-bright`, #355fec): Hover colour for links and filled buttons, and the 3px focus outline. Never a resting colour.

### Neutral
- **Ink** (`ink`, #1c2233): Headlines, row titles, body text, navigation links at rest, and the 1px rule under list headings.
- **Muted Slate** (`muted`, #4a5368): Ledes, row descriptions, metadata, footer text, and the 1px input border.
- **Pale Line** (`line`, #dfe4f1): The 1px rule between list rows, above each section, and around table cells.
- **Tint** (`tint`, #f3f6ff): The field behind the short-answer box, the closing aside, the methodology block, table header cells, and the hover fill of the quiet button.
- **On-Blue** (`on-blue`, #dfe6ff): Paragraph text on the blue band. Headings and links on the band are white.
- **Paper** (`white`, #fff): The page ground, text on blue, and input backgrounds.

Dividers on the blue band are white at 35% opacity (1px).

### Named Rules
**The One Blue Rule.** Blue is the only hue. Journal Blue carries brand, links and structure; Interaction Blue exists only for hover and focus. The sole exceptions in the build are the contact form's error and success messages, which are states, not palette.

**The Rule Weight Rule.** Three rules, three meanings. 3px Journal Blue marks the masthead, footer, service columns and the top of a tinted aside. 1px Ink sits under the heading of a list. 1px Pale Line separates rows and sections. 2px Journal Blue is reserved for interactive edges: the button border and the active navigation underline.

## Typography

**Display Font:** Literata Variable (with Georgia, Times New Roman, serif)
**Body Font:** Atkinson Hyperlegible Next Variable (with system-ui, -apple-system, Segoe UI, sans-serif)

**Character:** A clear text serif set large and light against a plain, highly legible sans. The serif names the agency offer, services and section arguments and carries long reading; the sans explains scope, process and actions. Numerals are tabular throughout.

### Hierarchy
- **Display** (400, clamp(2.7rem, 5.8vw, 5rem), 1.06, -0.03em): The agency offer on the homepage. It names local SEO, Google Ads and medical practices before the primary enquiry action. Below 36rem, the homepage uses clamp(2.5rem, 9vw, 3.2rem).
- **Headline, page** (400, clamp(2.3rem, 5vw, 4.2rem), 1.06, -0.02em): The h1 of hubs, listings and simple pages, capped at 54rem wide. Reading pages use a slightly smaller cut (clamp(2.1rem, 4.6vw, 3.4rem)).
- **Headline** (400, clamp(2rem, 4vw, 3.25rem), 1.06, -0.02em): Section headings.
- **Title** (400, 1.6rem, 1.15): Row titles in ruled lists, the three tenets on the band, the closing aside heading. Wide lists scale to clamp(1.5rem, 2.4vw, 2rem); definition and step rows sit at 1.5rem/1.2; reading-column h2 is 1.75rem and h3 1.3rem.
- **Lede** (sans 400, clamp(1.15rem, 1.6vw, 1.45rem), 1.45): The summary under a display or page headline; Muted Slate under the display headline, Ink under a page headline. Section intros are 1.2rem/1.5. Max width 42–46rem.
- **Body** (sans 400, 1.0625rem, 1.6): Interface and descriptive text. Row descriptions drop to 1rem/1.45.
- **Reading** (serif 400, 1.125rem, 1.65): Guides, articles and prose pages. Paragraphs and lists are capped at 36rem; headings, the short-answer box and tables use the full 46rem column. Worksheets switch the column to the sans at 1rem/1.5.
- **Label** (sans 700, 0.875rem, 0.06em, uppercase): The heading of a ruled list and the label inside the short-answer box, in Journal Blue; footer column headings, in Ink.
- **Meta** (sans 400, 0.9375rem): Bylines (which carry the topic link), dates, form hints. The smallest size in the system on `site.css` surfaces.

### Named Rules
**The Regular Serif Rule.** Literata is always weight 400 on screen. Headlines gain emphasis by size and tight tracking, never by weight. Bold belongs to the sans: buttons at 600, labels at 700.

**The Label Is A Heading Rule.** The uppercase blue label is the heading of a ruled list or the label of a tinted box. It is never stacked above a larger headline as an introduction to it.

## Layout

A centred page of 82rem with a fluid gutter (clamp(16px, 4vw, 64px)). The homepage opens with the agency headline, supporting copy and contact action. The two core services use equal columns, followed by a starting-point invitation, delivery process, buying questions and a smaller resources section. Sections stack full width, each separated by a 1px Pale Line and padded clamp(3rem, 6vw, 5rem) top and bottom. Paired content uses two equal columns with a clamp(2rem, 5vw, 4.5rem) gap. Editorial resource layouts can use an asymmetric 1.55fr-to-1fr lead and ruled index.

Text never runs the full page width: ledes and notes are capped between 42rem and 46rem, running text at 36rem, and reading pages are one 46rem column (prose pages 36rem) aligned to the left edge of the page, not centred.

List rhythm is fixed: rows are padded 1.05rem top and bottom (1.4rem in wide lists) and separated by a rule, with no gap between them.

Responsive behaviour is collapse, not rearrangement. Below 60rem the starting-point invitation stacks and the navigation wraps onto its own full-width row under the nameplate. There is no menu button. Below 52rem, two- and three-column groups stack and the tenets' vertical hairlines become horizontal; the footer drops from four columns to two. Below 640px, tables in the reading column scroll horizontally.

Print is a first-class output: masthead, footer and the closing aside are removed, the column goes full width, and worksheets keep compact metrics so their page counts hold.

## Elevation & Depth

Flat. There is no `box-shadow` anywhere in the build, and no gradient. Nothing floats, overlaps or casts. Depth is conveyed by three devices only: rule weight, the Tint field behind an aside, and the full-bleed blue band. The only layered elements are functional: the skip link and the worksheet's sticky jump bar, both flat.

### Named Rules
**The Paper Rule.** Surfaces are ink on paper. A thing is set apart by a rule above it or a tint behind it, never by a shadow or a lift, at rest or on hover.

## Shapes

Square. Every corner is 0: buttons, inputs, tinted boxes, table cells, the band. Form controls set `border-radius: 0` explicitly to defeat browser defaults. Borders are straight lines used as typographic rules: usually a top or bottom edge, a full outline only on buttons, inputs, table cells and the methodology block. The hover arrow on index rows is a chevron made from two 2px blue borders rotated 45 degrees. Icons are unnecessary; any images must follow the approved-asset rule above.

## Components

### Buttons
Plain, solid and rectangular; they read as part of the page, not as a call-out.
- **Shape:** Square (0 radius), 2px Journal Blue border, sans 600 at 1.0625rem.
- **Primary:** Journal Blue fill, white text, padding 0.95rem 1.4rem.
- **Hover / Focus:** Fill and border move to Interaction Blue over 0.2s; focus shows the global 3px Interaction Blue outline at 3px offset.
- **Quiet:** Transparent fill, Journal Blue text and border; hover fills with Tint. Used as the second action beside a primary.
- **Small:** Padding 0.65rem 1rem at 1rem; the masthead “Talk about your practice” and the closing aside.

### Ruled Index (signature)
The system's replacement for cards. An uppercase blue label with a 1px Ink rule beneath it heads a list whose rows are separated by 1px Pale Lines. Each row is a serif Title in Ink over a sans description in Muted Slate, optionally followed by a Meta line (kind, topic, date). Linked rows are a single link: on hover and focus the title turns Journal Blue and slides 0.35rem right while a blue chevron fades in at the right edge (0.2s colour, 0.3s transform, cubic-bezier(0.16, 1, 0.3, 1)). The wide variant enlarges titles and row padding for full-width listings. Unlinked variants share the row rhythm: definition rows, numbered steps (a blue serif numeral in a 2.6rem column), serif question lists and plain sans lists.

### Short-Answer Box
The tinted aside: Tint field, 3px Journal Blue rule across the top, no other border, padding 1.4rem 1.6rem 1.5rem, max 44rem, sans at 1.15rem/1.5 with an uppercase blue Label on its own line. The closing "work with us" aside on reading pages uses the same field and top rule with a serif heading and a small button.

### Band
A full-bleed Journal Blue section. Headings and links are white, paragraphs On-Blue, dividers white at 35%. Selection and focus outline invert to white inside it. The agency homepage uses it for the final conversation invitation. Its action must retain clear contrast against blue.

### Inputs / Fields
- **Style:** White field, 1px Muted Slate border, square, padding 0.8rem 0.9rem, inheriting the body sans. Labels sit above in sans 600; hints in Meta size, Muted Slate. Fields stack in one column, max 36rem.
- **Focus:** 3px Interaction Blue outline flush to the field (0 offset) and a Journal Blue border.
- **Error / Disabled:** A polite status line under the form: error in dark red (#a31621), success in dark green (#14613a) at 600. The submit button drops to 60% opacity while sending.

### Navigation
- **Masthead:** Serif nameplate in Journal Blue (1.75rem, -0.01em) at the left; Local SEO, Google Ads, About and Resources links; and a “Talk about your practice” primary action. Beneath it, a 3px Journal Blue rule spanning the page width, which scales in from the left once on load (0.9s).
- **States:** Hover and current page turn the link Journal Blue with a 2px blue underline.
- **Mobile:** Below 60rem the links wrap onto a full-width second row; nameplate drops to 1.5rem. No hamburger.
- **Footer:** Opens with a 3px Journal Blue rule; nameplate and a description of the local SEO and Google Ads agency, then grouped service, resource and company links under Ink labels. Links are Muted Slate, turning blue and underlined on hover.

### Reading Column
Serif at 1.125rem/1.65 in a 46rem column. The h1 comes first, with nothing above it; a sans byline that carries the topic link and a 1.3rem sans summary follow. Tables are sans at 0.9375rem with 1px Pale Line cells and Tint header cells. FAQs are ruled disclosure rows under a 1px Ink rule. Blockquotes carry a 1px left rule and Muted Slate text.

## Do's and Don'ts

### Do:
- **Do** keep every corner square (0 radius) and every surface flat: no shadows, no gradients.
- **Do** present collections as ruled lists: uppercase blue label, 1px Ink rule, rows separated by 1px Pale Lines, serif title over sans description.
- **Do** set every headline and row title in Literata at weight 400 and let size carry the hierarchy.
- **Do** use the 3px Journal Blue rule for the masthead, footer, service columns and top edge of a tinted aside.
- **Do** cap running text at 36rem and keep reading pages to one left-aligned column.
- **Do** make the two core services and enquiry action easy to find. Keep guide headlines, dates, worksheets and the topic index within the resources hierarchy.
- **Don't** put a breadcrumb or label line above a page's h1.
- **Do** place approved images through `Figure.astro`: square corners, no shadow, a fixed aspect ratio and an optional Muted Slate caption. Omit an image when no approved source exists. Empty image slots must not reach production.
- **Do** keep the global focus outline (3px Interaction Blue, 3px offset; white on the band).
- **Do** honour reduced motion: every animation and transition is removed under `prefers-reduced-motion`.
- **Do** keep reading pages and worksheets printable: masthead, footer and closing aside are hidden in print.

### Don't:
- **Don't** introduce a second hue. Blue is the only colour; red and green appear only as form status text.
- **Don't** use Interaction Blue (#355fec) as a resting colour. It is for hover and focus.
- **Don't** put guides, topics or services in cards, tiles or shadowed panels.
- **Don't** set serif headings in bold on screen.
- **Don't** stack an uppercase label above a larger headline as an eyebrow; a label heads a list or a tinted box.
- **Don't** round corners on buttons, inputs or boxes.
- **Don't** add motion beyond the masthead rule's single draw-in and the 0.2–0.3s hover transitions.
