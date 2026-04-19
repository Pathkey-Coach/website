# Services Page Redesign — Capability Catalog

**Date:** 2026-04-19
**Status:** Draft

## Summary

Replace the current 5-tab Services page with a static two-section layout sourced from the Pathkey Capability Catalog PDF: an "How we engage" strip (Think / Build / Teach) followed by a 2×2 grid of audience-targeted capabilities (Leaders / Engineers / Products / Operations-Heavy Teams). Drop the "Customise a Product" service entirely and remove the Products entry from the site nav (header + footer), while leaving `/products/` buildable in code.

## Background

The current `/services/` page presents 5 service types as clickable tabs (AI Strategy & Roadmapping, Idea to Product 0→1, Hands-on Implementation, Customise a Product, Team Enablement). The new Capability Catalog reframes the offering around two axes: **how** Pathkey engages (3 modes) and **who** Pathkey serves (4 audiences with 2–3 specific capabilities each).

Gap analysis: 4 of the 5 current services are subsets of the catalog content. The exception, "Customise a Product" (which links to `/products/`), is being dropped from services per the user's decision to also unlink the Products page from nav.

## Goals

- Mirror the catalog's two-axis structure on `/services/`.
- Keep the page scannable: visitors should be able to find the relevant capability without clicking through tabs.
- Preserve the existing page intro line and contact section.
- Unlink `/products/` from site nav without deleting the page.

## Non-goals

- Redesigning the `/products/` page itself.
- Pixel-replicating the PDF visual style. The page should use existing site typography and color palette.
- Rewriting capability copy. Descriptions are copied verbatim from the catalog.
- Adding the catalog's "WHO WE ARE" section to `/services/` — it's covered by the existing page intro and other site pages (values, people).

## Page anatomy

```
[Page header]   Services + intro line (unchanged from current)

[Section A]     "How we engage"
                Intro: "Three modes, used individually or woven
                together as the work demands."
                ┌──────┐ ┌──────┐ ┌──────┐
                │ 01   │ │ 02   │ │ 03   │
                │ Think│ │ Build│ │ Teach│
                │ desc │ │ desc │ │ desc │
                └──────┘ └──────┘ └──────┘

[Section B]     "What you can call us for"
                Intro: "Four audiences inside your company. Different
                problems, same operating principle: the shortest path
                to real value."
                ┌────────────────┐ ┌────────────────┐
                │ FOR LEADERS    │ │ FOR ENGINEERS  │
                │ • capability 1 │ │ • capability 1 │
                │ • capability 2 │ │ • capability 2 │
                │ • capability 3 │ │                │
                └────────────────┘ └────────────────┘
                ┌────────────────┐ ┌────────────────┐
                │ FOR PRODUCTS   │ │ FOR OPS-HEAVY  │
                │ • capability 1 │ │ • capability 1 │
                │ • capability 2 │ │ • capability 2 │
                │ • capability 3 │ │ • capability 3 │
                └────────────────┘ └────────────────┘

[Contact]       Unchanged from current page
```

Each capability shows a bold title plus a 2–3 sentence description, both copied verbatim from the catalog.

## File changes

### `content/services/_index.md` (rewrite front-matter)

- Remove existing `services:` array (5 items including "Customise a Product").
- Keep `title`, `intro`, `contact_title`, `contact_subtitle`.
- Update the SEO `description` field — current copy ("AI strategy, product development, implementation, and enablement") references the old framing. Replace with a one-liner that reflects the new audience/engagement-mode framing, e.g.: `"Pathkey works with leaders, engineers, product teams, and operations-heavy teams to find the shortest path from AI ideas to real value."`
- Add two new top-level keys: `engagement_section` and `audiences_section`.

Front-matter shape:

```yaml
engagement_section:
  title: "How we engage"
  intro: "Three modes, used individually or woven together as the work demands."
  modes:
    - number: "01"
      title: "Think with us"
      description: "Short, opinionated conversations backed by experience. Clear points of view on where AI earns its keep and where it does not."
    - number: "02"
      title: "Build with us"
      description: "Working with your stakeholders on 0 → 1 to prove an idea and get it to where your team can carry it forward."
    - number: "03"
      title: "Teach with us"
      description: "Workshops, patterns and rituals. When we step out of an engagement, the AI-native way of working stays with your team."

audiences_section:
  title: "What you can call us for"
  intro: "Four audiences inside your company. Different problems, same operating principle: the shortest path to real value."
  audiences:
    - label: "For Leaders"
      capabilities:
        - title: "Honest thinking partner"
          description: "On strategy, build vs buy, and roadmap calls. Clear points of view backed by experience, not slideware. And we'll tell you when the right answer is \"don't do it.\""
        - title: "Working prototype as a sounding board"
          description: "When an idea needs pressure-testing before a decision, we can usually stand up something clickable in a day or two. It turns abstract debates into something real."
        - title: "AI-native leadership workshops"
          description: "Focused sessions that start with the leader's own day-to-day work. Not an intro lecture. A working space where leaders learn to let AI quietly handle the noise so they can spend their energy on the decisions that matter."
    - label: "For Engineers"
      capabilities:
        - title: "AI-native engineering processes"
          description: "Setting up AI-native ways of working around tools like Claude Code and Codex: spec-driven and test-driven development, AI-assisted code review, and agentic skills that quietly automate the redundant work in your engineers' day-to-day."
        - title: "Building AI and agentic features in your apps"
          description: "Hands-on with your engineers on the craft side of AI engineering: agent design, orchestration patterns, tool use and function calling, memory and state, prompting for production, and the shift from writing deterministic code to shaping systems that think."
    - label: "For Products"
      capabilities:
        - title: "Prototype → production AI features"
          description: "Where to place guardrails, how to balance cost against latency, when a smaller model is the right call, and where AI should not go at all. Hard-won lessons from production, including the mistakes we've watched others make."
        - title: "Choosing the right building blocks"
          description: "Build vs buy across models, vector stores, agent frameworks, and orchestration platforms. We've made these calls before, and know which ones age badly."
        - title: "Rebuilding how product gets built"
          description: "Sprints, backlogs, and planning rhythms reworked so the whole team ships AI-natively, not a traditional team with AI tools bolted on."
    - label: "For Operations-Heavy Teams"
      capabilities:
        - title: "AI triage for manual workflows"
          description: "A clear-eyed look at where your team is spending time on repetitive, rules-based work that AI can quietly absorb. We map the work before we recommend anything, and we will tell you when the answer is to leave it alone."
        - title: "Thin-layer automation, not a platform overhaul"
          description: "Most operational wins do not require a year-long build. We find where a simple AI layer on your existing tools, whether that is document extraction, invoice matching, or reconciliation checks, gets you the majority of the value at a fraction of the cost."
        - title: "Accountability-first AI design"
          description: "In regulated environments, someone is always liable. We help you draw the right line between what AI handles and what a person signs off on, so your team moves faster without taking on risk they should not be carrying."
```

### `layouts/services/list.html` (rewrite body)

- Remove the `pk-tabs-bar` block (tab buttons + icon SVG switch).
- Remove the `pk-tab-panel` `range` block.
- Remove the `<script>` at the bottom that wires up tab clicks.
- Add two new `range` blocks:
  - One for `.Params.engagement_section.modes` rendering the 3 mode cards.
  - One for `.Params.audiences_section.audiences` rendering the 2×2 audience grid; nested `range` for each audience's `capabilities`.
- Keep page header (`pk-page-header`) and contact section (`pk-contact-section`) unchanged.

### `hugo.toml` (comment two blocks)

- Comment out lines 148–151 (header menu Products entry).
- Comment out lines 178–181 (footer menu Products entry).
- Match the comment style already used for the hidden "Case Studies" entries.
- Do **not** delete; commenting preserves history and makes it trivial to re-link later.

### Files unchanged

- `content/products/_index.md` — page still builds and is reachable by direct URL.
- `layouts/products/` and any product layouts — unchanged.

## Styling

Add new CSS classes for the new sections. Likely added to wherever existing `pk-*` styles live (check `assets/scss/` or `themes/`). The exact location is determined during implementation.

New classes needed:

- `.pk-engagement-grid` — flex/grid container for the 3 mode cards
- `.pk-engagement-card` — individual mode card with large number, title, description
- `.pk-audience-grid` — grid container for the 2×2 audience cards
- `.pk-audience-card` — individual audience card with label header and capability list
- `.pk-audience-cap` — individual capability inside a card (title + description)

Visual approach:

- Use existing site typography (font family, sizes, colors).
- Use existing border / spacing conventions seen in other `pk-*` components.
- Engagement mode cards: large display number ("01"), bold title, short description below. Horizontal strip on desktop.
- Audience cards: small uppercase label header ("FOR LEADERS"), separator, vertical list of capabilities (each: bold title + paragraph description).
- No icons on either section. Numbers serve the engagement cards; labels serve the audience cards.

Responsive:

- 3-card engagement strip → stacks to 1 column below ~768px.
- 2×2 audience grid → 1 column below ~768px.
- Reuse existing breakpoints from the site.

## Testing

- Run `hugo server` and visit `/services/`. Verify:
  - Page header and intro render.
  - 3 engagement mode cards render with numbers, titles, descriptions.
  - 4 audience cards render in a 2×2 grid with all listed capabilities.
  - Capability counts: Leaders 3, Engineers 2, Products 3, Ops-Heavy 3.
  - Contact section renders at the bottom with email mailto behavior intact.
  - Header nav no longer shows "Products".
  - Footer nav no longer shows "Products".
  - Direct visit to `/products/` still renders the products page.
- Resize browser to mobile width: both sections collapse to single-column without overflow or visual breakage.
- Cross-check copy against the PDF for typos.

## Out of scope

- Redesigning `/products/`.
- Adding analytics or visitor tracking for the new sections.
- A/B testing the catalog framing vs the previous service framing.
- Restoring the Products nav entry — this design assumes it stays unlinked until a future decision.
