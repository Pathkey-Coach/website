---
title: "Products"
description: "Things we've built — some for clients, some for ourselves."
draft: false
intro: "Things we've built — some for clients, some for ourselves."
products:
  - name: "Kodeskan"
    tagline: "Unified code security scanning CLI"
    slug: "kodeskan"
    screenshots: []
    journey: |
      Kodeskan was born from a recurring frustration: every security engagement meant stitching together half a dozen tools, each with its own output format and quirks. We wanted one command that could run SAST, SCA, secrets detection, IaC scanning, and license compliance — and produce a single, self-contained HTML report you could hand to a client.

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
