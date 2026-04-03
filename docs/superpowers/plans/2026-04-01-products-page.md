# Products Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Products" page with 7 expandable product cards (with screenshot slider placeholders) accessible via a new navbar tab beside "Services".

**Architecture:** Hugo content-driven page following existing patterns — frontmatter in `_index.md`, layout in `layouts/products/list.html`, styles in `pathkey.css`. Expand/collapse and slider use vanilla JS inlined in the template.

**Tech Stack:** Hugo, Bootstrap 5, SCSS/CSS custom properties, vanilla JS

---

### Task 1: Add Products menu entry to hugo.toml

**Files:**
- Modify: `hugo.toml:143-145` (after Services header entry) and `hugo.toml:172-174` (after Services footer entry)

- [ ] **Step 1: Add header menu entry**

In `hugo.toml`, after the Services header menu block (line 145), add:

```toml
[[languages.en.menus.header]]
name = "Products"
URL = "/products/"
weight = 2.5
```

Also update the weights of People, The Patkis, and Values to 4, 5, 6 respectively (from 3, 4, 5) to keep clean integer spacing. Actually — Hugo supports float weights, so `2.5` will sort between Services (2) and People (3) without renumbering.

- [ ] **Step 2: Add footer menu entry**

In `hugo.toml`, after the Services footer menu block (line 173), add:

```toml
[[languages.en.menus.footer]]
name = "Products"
URL = "/products/"
weight = 2.5
```

- [ ] **Step 3: Verify menu renders**

Run: `cd /Users/rohannevrikar/Work/repos/pathkey-website/website && hugo server`

Expected: "PRODUCTS" appears in the navbar between "SERVICES" and "PEOPLE". Clicking it navigates to `/products/` (will 404 until content exists — that's fine).

- [ ] **Step 4: Commit**

```bash
git add hugo.toml
git commit -m "feat: add Products to header and footer navigation menus"
```

---

### Task 2: Create Products content file with frontmatter

**Files:**
- Create: `content/products/_index.md`

- [ ] **Step 1: Create the content directory and file**

Create `content/products/_index.md` with this content:

```yaml
---
title: "Products"
description: "Things we've built — some for clients, some for ourselves."
draft: false
intro: "Things we've built — some for clients, some for ourselves."
products:
  - name: "ShieldEaze"
    tagline: "Unified code security scanning CLI"
    slug: "ShieldEaze"
    screenshots: []
    journey: |
      ShieldEaze was born from a recurring frustration: every security engagement meant stitching together half a dozen tools, each with its own output format and quirks. We wanted one command that could run SAST, SCA, secrets detection, IaC scanning, and license compliance — and produce a single, self-contained HTML report you could hand to a client.

      We built it in Go because the tool needed to run on air-gapped Linux VMs where installing dependencies was not an option. A single binary, no runtime, no internet required. Under the hood it orchestrates Opengrep, Nuclei, Trivy, and Syft, but the user never has to think about that.

      The hardest part was not the scanning — it was the reporting. Making an HTML report that was genuinely useful, not just a wall of findings. We iterated on that more than anything else.

  - name: "FP&Aos"
    tagline: "Indian Transfer Pricing compliance OS"
    slug: "fpaos"
    screenshots: []
    journey: |
      Transfer Pricing compliance in India is one of those domains where the complexity is not in the technology — it is in the rules. Safe Harbour thresholds, Form 3CEB filing workflows, intercompany agreement templates, reconciliation between what was agreed and what actually happened. Every consulting firm we spoke to was doing this in spreadsheets.

      FP&Aos started as a conversation with a tax advisory firm that wanted to manage multiple clients without losing their minds. We built the reconciliation engine first, because that was where the most time was being wasted. Then layered on TP study auto-generation and the assessment tracker.

      The goal was never to replace the tax expert — it was to give them a system that remembers what they would otherwise forget.

  - name: "SpecEaze"
    tagline: "PRD preparation tool for business experts"
    slug: "speceaze"
    screenshots: []
    journey: |
      Most product requirements documents are either too vague to build from or too detailed to read. SpecEaze came from watching business experts struggle to translate what they knew into something an engineering team could act on.

      The idea was simple: guide the user through a structured conversation, ask the right questions in the right order, and produce a spec that covers the bases — user stories, constraints, success criteria, edge cases. Not a template to fill in, but an interactive process that adapts to what you are building.

      We are still evolving this one. The latest addition is a security assessment intake flow for our Coditing practice, which turned out to be a natural extension of the same "structured intake" pattern.

  - name: "TalentEaze"
    tagline: "Talent discovery and outreach automation"
    slug: "talenteaze"
    screenshots: []
    journey: |
      Hiring in India means searching across Naukri, LinkedIn, Instahyre, CutShort, iimjobs, and half a dozen other portals — each with its own interface, login, and rate limits. Recruiters were spending more time navigating portals than actually evaluating candidates.

      TalentEaze uses a browser-based agent architecture with plugins for each portal. It handles session management, rate limiting, task queuing, and caching so the recruiter can focus on the human part of hiring. The agent logs into each portal, runs searches, and aggregates results into a single view.

      The trickiest engineering challenge was respecting each portal's rate limits without getting accounts flagged, while still being fast enough to be useful. We built a per-portal throttling layer that adapts based on response patterns.

  - name: "SAPos"
    tagline: "SAP Material Master Data validation engine"
    slug: "sapos"
    screenshots: []
    journey: |
      In large retail and manufacturing enterprises, Material Master Data is the backbone of everything — procurement, pricing, inventory, logistics. When a MATMAS IDoc arrives with bad data, the ripple effects are expensive and hard to trace.

      SAPos ingests IDoc payloads in XML or JSON, validates each material against configurable rulesets modelled on SAP's own domain tables — MARA, MARC, MVKE, MBEW, MEAN — and flags violations before they propagate. Data stewards can review, approve, or send back materials through a Draft-Validated-Approved workflow with full audit trails.

      The key insight was that validation rules vary wildly between organisations. So we made the ruleset engine configurable rather than hardcoded, letting each deployment define what "correct" means for their context.

  - name: "CatalogEaze"
    tagline: "Effortless Shopify catalog management"
    slug: "catalogeaze"
    screenshots: []
    journey: |
      Managing a Shopify catalog should not require a computer science degree. But for businesses with hundreds or thousands of products, keeping listings accurate, consistent, and up-to-date is a genuine operational burden.

      CatalogEaze helps businesses validate and update their Shopify catalogs with minimal friction. Bulk edits, consistency checks, and a clean interface that respects the way non-technical operators actually work. Built on a multi-tenant architecture so agencies can manage multiple client stores from one place.

      We started this as a micro-SaaS experiment — a deliberately small product to test whether we could ship, market, and support a product end-to-end. The lessons from that process shaped how we think about all our other products.

  - name: "AuditEaze"
    tagline: "Automated compliance auditing against any framework"
    slug: "auditeaze"
    screenshots: []
    journey: |
      Compliance audits are tedious by nature. An auditor collects documents, maps them to controls, evaluates each one, writes up findings, and produces a report. It is important work, but the mechanical parts of it — the mapping and the initial evaluation — are exactly the kind of thing AI should handle.

      AuditEaze lets organisations upload programme documents and evaluate them against any compliance framework: ISO 27001, GST, Companies Act, POSH, NGO regulations, and more. The system maps documents to the relevant controls, runs an initial pass/fail evaluation with maturity scoring, and generates a downloadable PDF report.

      The framework-agnostic design was deliberate. We started with NGO compliance (106 controls across 8 categories), but the same engine works for any control set. You define the framework, upload the documents, and let the system do the first pass. The auditor's job shifts from grunt work to judgement.
---
```

- [ ] **Step 2: Verify content is picked up by Hugo**

Run: `cd /Users/rohannevrikar/Work/repos/pathkey-website/website && hugo list all | grep products`

Expected: `content/products/_index.md` appears in the list.

- [ ] **Step 3: Commit**

```bash
git add content/products/_index.md
git commit -m "feat: add Products content with 7 product entries and placeholder journeys"
```

---

### Task 3: Create the Products page layout template

**Files:**
- Create: `layouts/products/list.html`

- [ ] **Step 1: Create the layout directory and template**

Create `layouts/products/list.html`:

```html
{{ define "main" }}

<div class="pk-page-header">
  <h1>{{ .Title }}</h1>
  <p class="pk-subtitle">{{ .Params.intro }}</p>
</div>

<div class="container" style="max-width: 960px;">
  <div class="pk-products-grid">
    {{ range $index := .Params.products }}
    <div class="pk-product-card pk-animate-in pk-animate-delay-{{ add (mod $index 4) 1 }}" data-product="{{ .slug }}">
      <div class="pk-product-header" onclick="toggleProduct(this)">
        <div>
          <h3 class="pk-product-name">{{ .name }}</h3>
          <p class="pk-product-tagline">{{ .tagline }}</p>
        </div>
        <span class="pk-product-chevron">&#9662;</span>
      </div>
      <div class="pk-product-body">
        <!-- Screenshot Slider -->
        <div class="pk-product-slider">
          {{ if .screenshots }}
          <div class="pk-slider-track">
            {{ range .screenshots }}
            <div class="pk-slider-slide">
              <img src="{{ printf "/images/products/%s/%s" $.slug . | relURL }}" alt="{{ $.name }} screenshot" loading="lazy">
            </div>
            {{ end }}
          </div>
          <button class="pk-slider-arrow pk-slider-prev" onclick="slideProduct(this, -1)" aria-label="Previous screenshot">&lsaquo;</button>
          <button class="pk-slider-arrow pk-slider-next" onclick="slideProduct(this, 1)" aria-label="Next screenshot">&rsaquo;</button>
          <div class="pk-slider-dots">
            {{ range $i, $s := .screenshots }}
            <span class="pk-slider-dot{{ if eq $i 0 }} active{{ end }}" onclick="goToSlide(this, {{ $i }})"></span>
            {{ end }}
          </div>
          {{ else }}
          <div class="pk-slider-placeholder">
            <span>Screenshots coming soon</span>
          </div>
          {{ end }}
        </div>
        <!-- Journey -->
        <div class="pk-product-journey">
          {{ .journey | markdownify }}
        </div>
      </div>
    </div>
    {{ end }}
  </div>
</div>

<script>
function toggleProduct(header) {
  const card = header.closest('.pk-product-card');
  card.classList.toggle('expanded');
}

function slideProduct(btn, direction) {
  const slider = btn.closest('.pk-product-slider');
  const track = slider.querySelector('.pk-slider-track');
  const slides = track.querySelectorAll('.pk-slider-slide');
  const dots = slider.querySelectorAll('.pk-slider-dot');
  if (slides.length === 0) return;

  let current = parseInt(track.dataset.current || '0', 10);
  current = (current + direction + slides.length) % slides.length;
  track.dataset.current = current;
  track.style.transform = 'translateX(-' + (current * 100) + '%)';

  dots.forEach(function(dot, i) {
    dot.classList.toggle('active', i === current);
  });
}

function goToSlide(dot, index) {
  const slider = dot.closest('.pk-product-slider');
  const track = slider.querySelector('.pk-slider-track');
  const dots = slider.querySelectorAll('.pk-slider-dot');

  track.dataset.current = index;
  track.style.transform = 'translateX(-' + (index * 100) + '%)';

  dots.forEach(function(d, i) {
    d.classList.toggle('active', i === index);
  });
}
</script>

{{ end }}
```

- [ ] **Step 2: Verify the page renders**

Run: `cd /Users/rohannevrikar/Work/repos/pathkey-website/website && hugo server`

Expected: Navigate to `/products/`. Page renders with title, subtitle, and 7 product cards in collapsed state. Clicking "Read the journey" area expands the card (styling will be rough until Task 4).

- [ ] **Step 3: Commit**

```bash
git add layouts/products/list.html
git commit -m "feat: add Products page layout template with expandable cards and slider"
```

---

### Task 4: Add product page styles to pathkey.css

**Files:**
- Modify: `assets/css/pathkey.css` (append at end, before the animation section at line 1267)

- [ ] **Step 1: Add product styles**

Append the following CSS before the `/* --- Smooth entry animation --- */` section (line 1267) in `assets/css/pathkey.css`:

```css
/* --- Products Page --- */
.pk-products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  padding: 32px 0 64px;
}

.pk-product-card {
  background: var(--pk-surface);
  border: 1px solid var(--pk-border);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.pk-product-card:hover {
  border-color: var(--pk-border-strong);
  box-shadow: 0 4px 24px rgba(44, 62, 45, 0.06);
}

.pk-product-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 28px 24px;
  cursor: pointer;
  user-select: none;
}

.pk-product-name {
  font-family: var(--pk-font-heading) !important;
  font-size: 1.3rem;
  font-weight: 400;
  margin-bottom: 4px;
}

.pk-product-tagline {
  font-size: 0.9rem;
  color: var(--pk-text-secondary);
  line-height: 1.5;
  margin-bottom: 0;
}

.pk-product-chevron {
  font-size: 1.2rem;
  color: var(--pk-text-muted);
  transition: transform 0.3s ease;
  flex-shrink: 0;
  margin-left: 16px;
  margin-top: 4px;
}

.pk-product-card.expanded .pk-product-chevron {
  transform: rotate(180deg);
}

.pk-product-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
}

.pk-product-card.expanded .pk-product-body {
  max-height: 2000px;
}

.pk-product-journey {
  padding: 0 24px 28px;
}

.pk-product-journey p {
  font-size: 0.95rem;
  color: var(--pk-text);
  line-height: 1.8;
  margin-bottom: 16px;
}

.pk-product-journey p:last-child {
  margin-bottom: 0;
}

/* Screenshot Slider */
.pk-product-slider {
  position: relative;
  margin: 0 24px 24px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--pk-bg-alt);
}

.pk-slider-track {
  display: flex;
  transition: transform 0.3s ease;
}

.pk-slider-slide {
  flex: 0 0 100%;
}

.pk-slider-slide img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
}

.pk-slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(44, 62, 45, 0.7);
  color: var(--pk-bg);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.pk-slider-arrow:hover {
  background: rgba(44, 62, 45, 0.9);
}

.pk-slider-prev {
  left: 8px;
}

.pk-slider-next {
  right: 8px;
}

.pk-slider-dots {
  display: flex;
  justify-content: center;
  gap: 6px;
  padding: 10px 0;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.pk-slider-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(44, 62, 45, 0.3);
  cursor: pointer;
  transition: background 0.2s ease;
}

.pk-slider-dot.active {
  background: var(--pk-primary);
}

.pk-slider-placeholder {
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--pk-text-muted);
  font-size: 0.9rem;
  font-style: italic;
}

@media (max-width: 768px) {
  .pk-products-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Verify styling**

Run: `cd /Users/rohannevrikar/Work/repos/pathkey-website/website && hugo server`

Expected: Products page at `/products/` shows:
- Page header with title and subtitle
- 7 product cards in a 2-column grid (1 column on mobile)
- Each card shows product name, tagline, and chevron
- Clicking a card expands it smoothly, showing the placeholder slider box and journey text
- Chevron rotates on expand
- Sage color palette, Newsreader headings, Nunito Sans body text

- [ ] **Step 3: Commit**

```bash
git add assets/css/pathkey.css
git commit -m "feat: add product card, slider, and expand/collapse styles"
```

---

### Task 5: Create screenshot image directories

**Files:**
- Create: `static/images/products/ShieldEaze/.gitkeep`
- Create: `static/images/products/fpaos/.gitkeep`
- Create: `static/images/products/speceaze/.gitkeep`
- Create: `static/images/products/talenteaze/.gitkeep`
- Create: `static/images/products/sapos/.gitkeep`
- Create: `static/images/products/catalogeaze/.gitkeep`
- Create: `static/images/products/auditeaze/.gitkeep`

- [ ] **Step 1: Create directories with .gitkeep files**

```bash
for slug in ShieldEaze fpaos speceaze talenteaze sapos catalogeaze auditeaze; do
  mkdir -p static/images/products/$slug
  touch static/images/products/$slug/.gitkeep
done
```

- [ ] **Step 2: Commit**

```bash
git add static/images/products/
git commit -m "feat: add empty screenshot directories for each product"
```

---

### Task 6: End-to-end verification

- [ ] **Step 1: Run Hugo build to check for errors**

Run: `cd /Users/rohannevrikar/Work/repos/pathkey-website/website && hugo build`

Expected: Build succeeds with no errors. `public/products/index.html` is generated.

- [ ] **Step 2: Run Hugo server and manually verify**

Run: `cd /Users/rohannevrikar/Work/repos/pathkey-website/website && hugo server`

Verify all of the following:
1. "PRODUCTS" appears in the navbar between "SERVICES" and "PEOPLE"
2. "PRODUCTS" appears in the footer navigation
3. Clicking "PRODUCTS" navigates to `/products/`
4. Page shows title "Products" and subtitle
5. 7 product cards render in a 2-column grid
6. Each card shows name, tagline, and chevron
7. Clicking a card expands it with smooth animation
8. Expanded card shows "Screenshots coming soon" placeholder
9. Expanded card shows journey text (3 paragraphs)
10. Clicking again collapses the card
11. On mobile viewport (resize to <768px), cards stack to 1 column
12. Animations (fade-in on scroll) work on the cards

- [ ] **Step 3: Commit any fixes if needed**
