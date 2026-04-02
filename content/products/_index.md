---
title: "Products"
description: "Things we've built — some for clients, some for ourselves."
draft: false
intro: "Things we've built — some for clients, some for ourselves."
products:
  - name: "Kodeskan"
    tagline: "Unified code security scanning package"
    slug: "kodeskan"
    screenshots: []
    journey: |
      Kodeskan was developed as a result of innovation partnership with a founder who runs an IT GRC cyber security services business. We got to know from his about strict code-review policies of enterprises and existing expensive tools for the same in the market. We were able to design and develop a prototype a tool containing 5 types of scanners (SAST, SCA, Secrets Detection, License Compliance, and IaC security) within a day of the meeting. Over a week, we worked closely with the founder partner to improve the rules and make it ready for his customers. The tool is a tar archive, which allows is to run practically anywhere (Developer machines, VMs, Self-hosted CI/CD pipelines etc.) with no access to the external network, hence making it reliable and safe to process confidential codebases. 
      
      Kodeskan is a great example of AI delivering value, without actually having any AI in the final product. Having an AI-based code scanner tool would have meant either opening up the network, dealing with security questions, or consider some local LLMs which could limit hosting options and/or quality of the scan. Instead, we just built the tool from scratch rapidly using Claude Code. With our experience of engineering Claude Code to its best, our innovation partners can see their ideas coming to life in a matter of hours or days.

  - name: "FP&Aos"
    tagline: "Indian Transfer Pricing compliance OS"
    slug: "fpaos"
    screenshots: []
    journey: |
      FP&Aos is an umbrella product for everything related to Financial Planning and Analysis processes. This specific topic is close to Suyog's experience of handling financial and compliance operations of Rapid Circle. As Rapid Circle's parent company is based in the Netherlands, Rapid Circle India, and hence Suyog, was always subject to scrutiny from the regulators due to Transfer Pricing (TP) regulations. TP, combined with other day to day financial operations, made Suyog realize how fragile this space is due to presence of so many tools but nothing still helps handle things 100%. Suyog, then took it on himself, to bring all of his experience into action. 
      
      He first started with TP related features (from entity setup through questionnaire responses, Safe Harbor eligibility, benchmarking, markup selection, invoice generation, and filing). Upon showing his work to some CAs, he realized even though he solved just one problem, there are still many gaps in FP&A. At of today, FP&Aos is one of the products Suyog is actively working on to expand into other financial processes while working closely with CAs and financial firms for continuous feedback.

  - name: "SpecEaze"
    tagline: "PRD preparation tool for business experts"
    slug: "speceaze"
    screenshots: []
    journey: |
      SpecEaze started as an internal tool for Rohan and Suyog to help them bridge the gap between requirements and implementation. The vision was, you give Claude Code a document, and ask it to start working. At the end of it, whatever Claude Code builds, should run as expected in the first shot without needing any iterations. But this means that the requirements of the product needs to be very thorough, well-thought, inclusive of inputs of various domains at various levels, and the output should be an AI-friendly document. SpecEaze asks the user for what they're trying to build, and then takes them through a journey of pointed questions to, first, make the user think thoroughly, and second, to structure the requirements well. One thing at a time, but in the end, everything comes together. 
      
      Upon showing this to friends and innovation partners, we realized this tool can take various shapes due to its innate nature of asking high quality questions. An innovation partner wants it to use as a requirement-screening chatbot on websites so that it saves his team and his customers from the first "discovery call" with the customers. As of today, we have given this tool to our friends to help them optimize their AI-development workflows, while we continue to build domain specific versions of this for innovation partners.

  - name: "AuditEaze"
    tagline: "Automated compliance auditing against any framework"
    slug: "auditeaze"
    screenshots: []
    journey: |
      AuditEaze started as a potential partnership opportunity with friends and partners working in GRC domain. Upon hearing their inputs about how a typical audit looks like, we thought building a prototype while working closely with the partners to include domain-specific operations in the tool. We learnt that compliance audits are tedious by nature. An auditor collects documents, maps them to controls, evaluates each one, writes up findings, and produces a report. It is important work, but the mechanical parts of it. The mapping and the initial evaluation are exactly the kind of thing AI should handle.

      AuditEaze is framework-agnostic by design. We started with NGO compliance (106 controls across 8 categories), but the same engine works for any control set. You define the framework, upload the documents, and let the system do the first pass. The auditor's job shifts from grunt work to judgement. Auditors get to review a detailed PDF report generated by AuditEaze. It is not just a tool for auditors, but can be run by internal operations teams or founders for continuous posture monitoring. If an external audit comes up by regulators, an organization will be always prepared for it. As of today, it comes with the following preset frameworks: ISO 27k1, ISO 42k1, NGO compliance, GST Operational Compliance, Labour Law Compliance, DPDPA 2023, POSH, and Companies Act.

  - name: "FAQEaze"
    tagline: "Turn your own website's content into knowledge source for your chatbot"
    slug: "faqeaze"
    screenshots: []
    journey: |
      Inspired from a known problem in the travel industry - All the itineraries and details are in the website, yet people reach out to the agency to ask the same questions. The problem is not with the people, but its more about website content being spread across many pages. Our idea was to just simply turn the existing website content into the knowledge source for a bot. This bot can be then used as a widget in your own website. Your bot, your existing content as knowledge source. 

      We showed this to our friends running a travel agency, and got positive response, as well as more use cases from them to work on. This is a great example of how proactively solving a small problem can help founders and decision makers think what else is biting them which can solved quickly with partners like us.

  - name: "TalentEaze"
    tagline: "Talent discovery and outreach automation"
    slug: "talenteaze"
    screenshots: []
    journey: |
      Another high-impact use case that came out of Suyog's experience and years of pain - High quality recruitment. Recruitment, when delegated to agencies, often become just a numbers game. Suyog wanted to build a tool that can find candidates like how a startup founder would - Not just by titles or resumes, but based on skills and existing work. TalenEaze behind the scenes is a smart browser automation, which looks up information across multiple sources, to find high quality candiates against a given job description.

  - name: "CatalogEaze"
    tagline: "Effortless Shopify catalog management"
    slug: "catalogeaze"
    screenshots: []
    journey: |
      While chatting with one of the relatives who runs a BPO business, we got to know that many E-Commerce sellers struggle with maintaining their catalog data, specially before and after a sale or another big event. This is because they are expected to work within the restrictions of schema laid by the platforms like Shopify, and also ensure that the data itself is accurate.
      
      For example, starting a clearance sale (20% off on "Winter Collection", 40% off on "Kids Collection" and so on) requires careful data manipulation in the CSV which Shopify expects. To see what we can do about this, we built a quick prototype for Shopify businesses to simply upload their CSVs, choose an option about what they want to do- Start a Sale, Round off prices, Increase prices etc. while always staying compliant to Shopify's schema rules.
---
