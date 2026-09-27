# Homepage Restructure — Design

**Date:** 2026-09-27
**Status:** Approved in conversation (pending spec review)
**Branch:** `homepage-restructure` (carries the uncommitted "Firms we've built for" clients work from `main`)
**Area:** `content/home/home.md`, `layouts/_default/home.html`, `assets/css/pathkey.css`, `hugo.toml`, new `static/js/pk-client-carousel.js`

## Goal

Borrow the strongest ideas from the static single-page site (branch `static-site`) into the Hugo homepage, while keeping the Hugo site, its other pages and its "AI-native software studio" voice.

Three things come across:

1. **Fewer, clearer sections.** Four overlapping sections become one "What we do".
2. **A "Work in practice" section** showing real workflows by area.
3. **The client logo slider**, placed under the hero.

The page should also make clear that Pathkey's conversations are about what AI changes in the work (impact), not about adopting AI for its own sake. Per the copy rules, this is shown through specifics rather than the word "impact".

## Out of scope

- Hero copy and buttons stay as they are.
- Products, The Patkis, blog, values and all other pages are untouched.
- No tabs, hero animation, JSON-LD, privacy page or font changes from the static site.
- No "01 / 02 / 03" numbering, no slogan-style headlines.

## Page order

```
Hero                     (unchanged)
Client slider            (new — logos scrolling)
What we do               (merged — id="services")
Work in practice         (new — id="work")
Firms we've built for    (clients list with one-liners — id="clients", as on main)
Why we started Pathkey + the people   (id="people")
Closing                  (unchanged)
```

Removed as separate sections: "Why we started Pathkey" (moves into the people section), "Sound familiar?", "How we engage", "Who we work with", and the standalone "Explore our products" CTA strip (the product card in "What we do" replaces it).

## 1. Client slider

- Sits directly under the hero. No visible heading (the detailed list below already has one); the group carries `aria-label="Firms we've built for"`.
- **Single source of data:** reads the same `clients.items` list in `home.md` as the detailed clients section. Adding a client in one place updates both.
- Firms with a `logo` show the image; firms with a `mark` (GKCA) show the text mark, as the clients list already does.
- Each logo links to the firm's site (new tab, `rel="noopener"`).
- Behaviour ported from the static site's `client-carousel.js` into `static/js/pk-client-carousel.js`:
  - The script duplicates the list itself so the loop is seamless; the markup lists each firm once.
  - Pauses on hover, keyboard focus, touch, when scrolled off screen and when the tab is hidden.
  - Visible pause/play button.
  - Visitors with "reduce motion" set get a still row and a Play button.
  - Duplicated copies are `aria-hidden` and not focusable, so screen readers announce each firm once.
- Without JavaScript the logos show as a still, horizontally scrollable row.

## 2. What we do (merged)

**Intro line** (draft, confirm in review):

> Every conversation starts with a piece of work that's taking too long or going wrong. We judge what we build by how much of that it fixes.

**Four cards.** Copy is reused from the current sections; only repeats are cut.

| Card | Lead-in (from "Sound familiar?") | Body content comes from |
|---|---|---|
| Think with us | "You've been pitched AI solutions for problems that didn't need AI." | Services "Think with us" + For Leaders: honest thinking partner, a clickable prototype in a day or two, leadership workshops. Opens on the impact question: which task, what it costs today, whether fixing it is worth it. |
| Build with us | "You have a product idea but hiring even one good engineer costs more than your runway allows." | Services "Build with us" + For Practitioners: map where the time goes, a thin layer not a platform overhaul, a clear line between what's automated and what a person approves. |
| Teach with us | "Your team has deep expertise but no AI skills to match." | Services "Teach with us" + How we engage "Teach": the team runs and extends what we built without waiting on us. |
| Use a product we've built | — | Existing card, links to `/products/`. |

"Including when the answer is 'don't build it'" appears once (Think with us), not three times.

## 3. Work in practice

- Heading: "Work in practice", with a one-sentence intro.
- Four cards in a 2×2 grid on desktop, stacked on mobile. All visible; no tabs, no JavaScript.
- Each card: area name, one sentence, and one workflow strip — **Input → Automation (or AI-assisted) → Human review → What changed**.
- The last step states what changed in the work. Only the audit card carries a figure ("1–2 hours", already public). No other figures until a client approves one.
- No client names. The clients section below says who; this section says how.

| Area | Workflow (from real work) |
|---|---|
| Business systems | Inventory tracker for a distributor (unnamed): closing stock worked out from scanned invoices and the factory's WhatsApp messages. |
| Process automation | Vendor invoices read, TDS and GST worked out, flagged items checked by a person, posted to Zoho Books as bills without re-typing. |
| Finance & compliance | Large TDS audits: totals recomputed by section and differences flagged; the auditor reviews only the exceptions. A niche audit that took a long time by hand now takes 1–2 hours. |
| Private AI | A firm's own AI assistant for reconciliations, document conversions and research, with a person checking the output. |

Content lives in a new `work:` block in `home.md` (`headline`, `intro`, `items[]` with `area`, `summary`, `steps[]` of `{label, text}`, `outcome`).

## 4. Why we started Pathkey + the people

- Section heading: "Why we started Pathkey".
- The three existing "why" paragraphs follow, word for word.
- Then the existing team intro line ("Pathkey is three people…") as the bridge into the bios.
- Bios, photos, roles, LinkedIn links and "Meet The Patkis →" unchanged.
- In `home.md`, `why` moves under `team` (`team.why.paragraphs`).

## Navigation

Header menu: Home, Services (`/#services`), **Our work (`/#work`, new)**, Products, People, Clients (pending on main), The Patkis, Values. Footer menu gets the same "Our work" entry.

## States and accessibility

- Slider: pause control reachable by keyboard with a visible focus ring; reduced-motion respected; logos have the firm name as link text for screen readers.
- Work cards: steps marked up as an ordered list so the sequence is read in order.
- All sections render fully without JavaScript.
- Text contrast meets WCAG AA using the existing palette variables.

## Verification

- `hugo` build with no errors or warnings.
- Browser check (Claude in Chrome) at 1440 px, 768 px and 390 px: slider loops, pauses on hover/focus, pause button works, reduced-motion shows a still row; all anchors (`#services`, `#work`, `#clients`, `#people`) land correctly under the fixed header; no horizontal page scroll on mobile.
- Products, The Patkis and a blog post still render (shared CSS changed).
