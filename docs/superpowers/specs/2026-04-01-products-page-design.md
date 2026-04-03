# Products Page Design Spec

**Date:** 2026-04-01
**Status:** Pending approval

## Overview

Add a "Products" page to the Pathkey website showcasing 7 products built by the team. The page is accessible via a new navbar tab placed beside "Services".

## Navigation & Routing

- New menu item **"Products"** in `hugo.toml` header menu with weight **25** (between Services at 20 and People at 30)
- Route: `/products/`
- Content file: `content/products/_index.md`
- Layout template: `layouts/products/list.html`
- Follows the same pattern as Services, People, Values pages

## Page Layout

### Page Header
- Standard `pk-page-header` pattern: title "Products" + short intro subtitle
- Subtitle: "Things we've built — some for clients, some for ourselves."

### Product Grid
- CSS grid: `grid-template-columns: repeat(auto-fit, minmax(350px, 1fr))`
- 2 columns on desktop, 1 on mobile
- Consistent with existing grid patterns on the site

### Product Card — Collapsed State
- Product name (h3)
- One-line tagline
- "Read the journey" toggle with chevron icon

### Product Card — Expanded State
- Everything from collapsed, plus:
- **Screenshot slider** — horizontal carousel (16:9 aspect ratio) with left/right arrows. Shows "Screenshots coming soon" placeholder until images are added. Images will live in `static/images/products/<slug>/`
- **Journey text** — 2-3 paragraph placeholder (~150-200 words per product)
- Smooth CSS expand/collapse animation
- Chevron rotates to indicate expanded state

### Slider Implementation
- Vanilla JS, no external dependencies
- Left/right arrow navigation cycling through images
- Images referenced from frontmatter `screenshots` array
- Graceful fallback when no screenshots are provided

## Styling

- Extends existing `pk-card` class with product-specific styles
- Sage color palette (CSS custom properties from `_variables.scss`)
- Headings: Newsreader (serif), Body: Nunito Sans (sans-serif)
- Animations: `.pk-animate-in` with staggered delays via Intersection Observer
- No GitHub repo links (keeping consistent since not all products are on GitHub)

## Content Structure

7 products in this order, defined in `content/products/_index.md` frontmatter:

### 1. Kodeskan
- **Tagline:** Unified code security scanning CLI
- **Slug:** kodeskan
- **Placeholder journey:** ~150-200 words about building a Go CLI that unifies SAST, SCA, secrets scanning, IaC scanning, and code quality checks with self-contained HTML reporting. Designed for client-site deployment on Linux VMs.

### 2. FP&Aos
- **Tagline:** Indian Transfer Pricing compliance OS
- **Slug:** fpaos
- **Placeholder journey:** ~150-200 words about building a compliance OS for Indian Transfer Pricing — intercompany agreements, Safe Harbor calculations, Form 3CEB filing, reconciliation, TP study autogeneration, and audit-ready evidence vault.

### 3. SpecEaze
- **Tagline:** PRD preparation tool for business experts
- **Slug:** speceaze
- **Placeholder journey:** ~150-200 words about building a tool that helps business experts prepare well-thought-out Product Requirements Documents with a spec engine and document upload capability.

### 4. TalentEaze
- **Tagline:** Talent discovery and outreach automation
- **Slug:** talenteaze
- **Placeholder journey:** ~150-200 words about building a talent discovery platform with browser-based agent architecture and plugins for multiple Indian job portals (Naukri, LinkedIn, Instahyre, etc.).

### 5. SAPos
- **Tagline:** SAP Material Master Data validation engine
- **Slug:** sapos
- **Placeholder journey:** ~150-200 words about building a validation engine for SAP MATMAS IDoc payloads with configurable rulesets, data stewardship workflows, and full audit trails.

### 6. CatalogEaze
- **Tagline:** Effortless Shopify catalog management
- **Slug:** catalogeaze
- **Placeholder journey:** ~150-200 words about building a tool that helps businesses update and manage their Shopify catalog with ease, on a multi-tenant Railway-deployed architecture.

### 7. AuditEaze
- **Tagline:** Automated compliance auditing against any framework
- **Slug:** auditeaze
- **Placeholder journey:** ~150-200 words about building a multi-tenant platform that audits uploaded documents against any compliance framework (ISO, GST, Companies Act, POSH, NGO, etc.) using Gemini AI, with PDF report generation.

## Files to Create/Modify

| File | Action |
|------|--------|
| `hugo.toml` | Add Products menu item (weight 25) |
| `content/products/_index.md` | New — frontmatter with all 7 products + placeholder journey text |
| `layouts/products/list.html` | New — page template with grid, cards, slider, expand/collapse |
| `assets/css/pathkey.css` | Extend — product card styles, slider styles, expand animation |
| `static/images/products/` | New directory — empty, ready for screenshots |

## Out of Scope

- Actual screenshot images (placeholder only)
- Final journey copy (placeholder only, user will write)
- Per-product sub-pages
- GitHub repo links
- Category grouping
