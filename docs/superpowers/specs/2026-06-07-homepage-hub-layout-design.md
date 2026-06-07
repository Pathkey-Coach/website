# Homepage "Hub" Layout — Design

**Date:** 2026-06-07
**Status:** Approved (pending spec review)
**Area:** `layouts/_default/home.html`, `assets/css/pathkey.css`, `content/home/home.md`

## Goal

Reshape the homepage from a long vertical scroll into a compact **two-row, two-column "hub"** that surfaces the four most important things about Pathkey on one page, each linking out to its full page. The homepage becomes a self-contained intro to the studio; every other page stays exactly as it is.

## Why

Today's homepage is six stacked sections (Hero → Why → Sound familiar? → What we do → Case Studies → Closing). It buries the human story and the people behind the studio far down the page. The hub layout pairs **what Pathkey does** with **who Pathkey is**, side by side, so a first-time visitor grasps both the offering and the people in two screens.

## Layout

Two full-height rows, each split into **even 50/50 halves**. The column logic is consistent (not alternating):

- **Left column = what Pathkey *does*:** Hero (Row 1) → "What we actually do" (Row 2)
- **Right column = who Pathkey *is*:** "Why we started Pathkey" (Row 1) → "People" (Row 2)

```
┌──────────────────────┬──────────────────────┐
│  HERO                 │  WHY WE STARTED       │   Row 1
│  (headline, sub,      │  PATHKEY              │   (full viewport
│   1 CTA → /services)  │  (3 paragraphs)       │    height)
├──────────────────────┼──────────────────────┤
│  WHAT WE ACTUALLY DO  │  PEOPLE               │   Row 2
│  (4 items + links to  │  (partner photos +    │   (full viewport
│   /services /products)│   "Meet The Patkis →")│    height)
└──────────────────────┴──────────────────────┘
        CLOSING STRIP: hello@pathkey.in  (homepage only)
```

Each **row** is `min-height: ~90–100vh` so the visitor scrolls once between Row 1 and Row 2 (decision: full-height rows, not a single cramped screen).

## Panels

All copy already exists — this is a rearrangement, not new content.

### 1. Hero — Row 1, left
- Source: `content/home/home.md` → `hero` front matter
- `headline_1` + `headline_2` (accent), `subheadline`
- **Single CTA:** "See what we do →" → `/services` (the `cta2` "See our products" button is dropped here; the Products link lives in the "What we actually do" panel below, so two CTAs to the same destinations on one screen was redundant)

### 2. Why we started Pathkey — Row 1, right
- Source: `home.md` → `why` front matter
- `why.headline` + all three `why.paragraphs`

### 3. What we actually do — Row 2, left
- Source: `home.md` → `services` front matter
- `services.headline` + the four `services.items` (icon + title + description): Think / Build / Teach / Use a product
- **Two links:** "Services →" → `/services`, "Products →" → `/products`

### 4. People — Row 2, right
- Source: **`content/people/_index.md`** → `partners` front matter (read cross-page from the home layout via `site.GetPage "/people"`)
- A row of the four partner photos (small circular avatars), a one-line intro (`people` `intro`), and the CTA "Meet The Patkis →" → `/the-patkis`
- Rationale: the partners list is maintained on the People page; reading it there keeps a single source of truth rather than duplicating partner data into `home.md`

### Closing strip — homepage only
- The contact line: *"If any of this resonates, we're easy to reach. Say hello@pathkey.in"*
- Rendered at the bottom of the homepage **only** (not the site-wide global footer). Uses the existing obfuscated-email markup (`pk-email` / `data-u` / `data-d`) from the current `closing` param.
- Source: `home.md` → `closing` (lightly reworded from "sounds like you" to "resonates")

## Dropped from the homepage

- **"Sound familiar?"** (the `problem` section) — removed from the layout. The `problem` front matter can stay in `home.md` unused, or be deleted; deletion preferred to avoid dead data.
- **Case Studies** preview grid — removed from the homepage layout. (Case study content/pages, if any, are unaffected.)

## Responsive behaviour

- **Desktop / tablet (≥ ~900px):** the 2×2 grid as drawn.
- **Below ~900px:** each row's two halves stack to a single column. Reading order top-to-bottom: **Hero → Why → What we do → People → closing strip**. Rows drop their forced full-viewport height on mobile so panels size to their content.

## Implementation

1. **`layouts/_default/home.html`** — rewrite. Remove the `pk-problem` and case-studies sections. Emit a `.pk-home-grid` container with two `.pk-home-row` rows, each holding two `.pk-home-panel` halves. Add a People panel that reads `site.GetPage "/people"` params. Keep the closing strip at the end.
2. **`assets/css/pathkey.css`** — add grid styles (`.pk-home-grid`, `.pk-home-row`, `.pk-home-panel`, panel variants for the dark hero / light why / light what-we-do / dark people treatment) and the mobile stacking breakpoint. Reuse existing `pk-hero`, button, and typography styles where possible.
3. **`content/home/home.md`** — drop one hero CTA (keep single `cta`), optionally remove the now-unused `problem` block, reword `closing` ("resonates").

No JavaScript, no routing changes, no new dependencies. Clicks are ordinary links to existing pages.

## Out of scope

- Visual skin / colour direction (which prototype style to adopt) — this spec defines **structure**, not final styling. Panel colours shown in mockups are illustrative.
- Any change to the Services, Products, People, or The Patkis pages themselves.
- Restoring Case Studies elsewhere.

## Open question carried forward

- Final hero CTA wording/target is "See what we do → /services" by default; revisit if a contact-oriented CTA is preferred once the page is seen live.
