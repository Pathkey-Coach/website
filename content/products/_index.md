---
title: "Products"
description: "Shaped by our experiences and real conversations, built as micro-SaaS products anyone can use."
draft: false
intro: "Shaped by our experiences and real conversations, built as micro-SaaS products anyone can use."
products:
  - name: "ShieldEaze"
    tagline: "Unified code security scanning package"
    slug: "ShieldEaze"
    screenshots: []
    report_url: "/reports/shieldeaze/sample-report.html"
    report_label: "View Sample Scan Report"
    journey: |
      Enterprise code security is a fragmented space. Organizations enforce strict code-review policies, but doing so typically means stitching together expensive, overlapping tools: separate products for SAST, SCA, secrets detection, license compliance, and IaC security. ShieldEaze unifies these essentials into a single package. ShieldEaze runs 5 scanner types: SAST, SCA, Secrets Detection, License Compliance, and IaC Security. It ships as a tar archive, so it runs practically anywhere (developer machines, VMs, self-hosted CI/CD pipelines) with no external network access. This makes it reliable and safe for processing confidential codebases.
      
      ShieldEaze is a great example of AI delivering value without any AI in the final product. An AI-based scanner would have meant opening up the network, fielding security questions, or running local LLMs that limit hosting options and scan quality. Instead, we built the tool from scratch using Claude Code. With our experience of engineering Claude Code to its best, ideas like these come to life in hours or days.

  # HIDDEN: FP&Aos - temporarily hidden, may re-enable soon
  # - name: "FP&Aos"
  #   tagline: "Indian Transfer Pricing compliance OS"
  #   slug: "fpaos"
  #   screenshots: []
  #   journey: |
  #     FP&Aos is an umbrella product for everything related to Financial Planning and Analysis. This topic is close to Suyog's experience handling financial and compliance operations. TP, combined with day-to-day financial operations, made Suyog realize how fragile this space is. Many tools exist, but none handle things end to end. So he took it on himself to bring all of his experience into action.
  #     
  #     He started with TP-related features: entity setup, questionnaire responses, Safe Harbor eligibility, benchmarking, markup selection, invoice generation, and filing. After showing his work to CAs, he realized that even with TP solved, many gaps remain across FP&A. As of today, FP&Aos is one of the products Suyog is actively expanding into other financial processes, working closely with CAs and financial firms for continuous feedback.

  - name: "SpecEaze"
    tagline: "PRD preparation tool for business experts"
    slug: "speceaze"
    screenshots:
      - "screenshot-1.png"
      - "screenshot-2.png"
    journey: |
      SpecEaze started as an internal tool for Rohan and Suyog to bridge the gap between requirements and implementation. The vision was simple: give Claude Code a document and ask it to build. Whatever it builds should run as expected on the first shot, without needing iterations. But this demands requirements that are thorough, well-thought-out, inclusive of inputs across domains and levels, and structured in an AI-friendly format. SpecEaze asks the user what they're trying to build, then walks them through pointed questions. First, to make the user think thoroughly. Second, to structure the requirements well. One thing at a time, but in the end, everything comes together.
      
      After showing this to friends and innovation partners, we realized the tool can take various shapes due to its innate nature of asking high-quality questions. One innovation partner wants to use it as a requirement-screening chatbot on his website, saving his team and customers from the initial discovery call. As of today, we have given this tool to friends to help them optimize their AI-development workflows, while we continue building domain-specific versions for innovation partners.

  - name: "AuditEaze"
    tagline: "Automated compliance auditing against any framework"
    slug: "auditeaze"
    screenshots:
      - "screenshot-1.png"
      - "screenshot-2.png"
      - "screenshot-3.png"
      - "screenshot-4.png"
      - "screenshot-5.png"
      - "screenshot-6.png"
      - "screenshot-7.png"
    journey: |
      AuditEaze comes directly from Suyog's experience of running a business that needs to be compliant in multiple ways for multiple regulators. Compliance audits are tedious by nature. An auditor collects documents, maps them to controls, evaluates each one, writes up findings, and produces a report. It is important work, but the mechanical parts of it (the mapping and initial evaluation) are exactly what AI should handle.

      AuditEaze is framework-agnostic by design. We started with NGO compliance (106 controls across 8 categories), but the same engine works for any control set. You define the framework, upload the documents, and let the system do the first pass. The auditor's job shifts from grunt work to judgement. They review a detailed PDF report generated by AuditEaze. It is not just a tool for auditors. Internal operations teams or founders can run it for continuous posture monitoring. When regulators call for an external audit, the organization is always prepared. Preset frameworks include: ISO 27001, ISO 42001, NGO compliance, GST Operational Compliance, Labour Law Compliance, DPDPA 2023, POSH, and Companies Act.

  - name: "FAQEaze"
    tagline: "Turn your own website's content into knowledge source for your chatbot"
    slug: "faqeaze"
    screenshots:
      - "screenshot-1.png"
      - "screenshot-2.png"
      - "screenshot-3.png"
      - "screenshot-4.png"
      - "screenshot-5.png"
    journey: |
      FAQEaze was inspired by a known problem in the travel industry. All the itineraries and details are on the website, yet people still reach out to the agency to ask the same questions. The problem is not with the people. It is about website content being spread across too many pages. Our idea was simple: turn existing website content into the knowledge source for a bot. This bot can be used as a widget on the website itself. Your bot, your content, your knowledge source.

      We showed this to friends running a travel agency and got a positive response, along with more use cases to explore. This is a great example of how proactively solving a small problem can help founders and decision-makers think about what else is biting them that can be solved quickly with partners like us.

  # HIDDEN: TalentEaze - temporarily hidden, may re-enable soon
  # - name: "TalentEaze"
  #   tagline: "Talent discovery and outreach automation"
  #   slug: "talenteaze"
  #   screenshots: []
  #   journey: |
  #     Another high-impact use case born from Suyog's years of pain: high-quality recruitment. When delegated to agencies, recruitment often becomes just a numbers game. Suyog wanted to build a tool that finds candidates the way a startup founder would. Not by titles or resumes, but based on skills and existing work. Behind the scenes, TalentEaze is a smart browser automation that looks up information across multiple sources to find high-quality candidates against a given job description.

  - name: "CatalogEaze"
    tagline: "Effortless Shopify catalog management"
    slug: "catalogeaze"
    screenshots:
      - "screenshot-1.png"
      - "screenshot-2.png"
      - "screenshot-3.png"
      - "screenshot-4.png"
      - "screenshot-5.png"
      - "screenshot-6.png"
    journey: |
      Through a few recent conversations, we learned how tedious e-commerce catalog operations really are. The sellers struggle with maintaining their catalog data, especially before and after sales or other big events. They are expected to work within the schema restrictions set by platforms like Shopify while ensuring the data itself is accurate.
      
      For example, starting a clearance sale (20% off on "Winter Collection", 40% off on "Kids Collection", and so on) requires careful data manipulation in Shopify's expected CSV format. To help with this, we built a quick prototype for Shopify businesses. They simply upload their CSVs, choose what they want to do (start a sale, round off prices, increase prices, etc.), and the tool handles it while staying compliant with Shopify's schema rules.
---
