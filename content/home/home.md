---
title: "Home"
type: "home"
draft: false
# The homepage is rendered by layouts/_default/home.html as a standalone page
# (its own header, footer, styles in static/pk/). Everything below is its copy.
seo:
  title: "Pathkey — AI advisory, automation & software for businesses"
  description: "Pathkey is an AI advisory and software studio. We find where AI saves your team real time, then build it: automation, custom software and private AI assistants."
  og_description: "Independent AI advice and hands-on delivery. We find where AI saves your team real time, then build the tools your people use every day."
nav:
  - name: "Approach"
    url: "#approach"
    section: "approach"
  - name: "Our work"
    url: "#work"
    section: "work"
  - name: "People"
    url: "#people"
    section: "people"
  - name: "The Patkis"
    url: "the-patkis/"
  - name: "Values"
    url: "values/"
hero:
  headline_1: "What can AI actually do"
  headline_2: "for your business?"
  # First line answers the headline; it is set slightly stronger than the rest.
  position: "We help you find out, then build it."
  copy:
    - "Pathkey is an AI advisory and software studio. We look at how your team works and where AI would save real time, then build the tools your people use every day."
  cta_text: "Bring us your challenge"
  link_text: "Explore our work"
approach:
  eyebrow: "Our approach"
  headline_1: "Clarity first."
  headline_2: "Then a step forward."
  intro: "We take on only a few clients at a time and work directly with their teams, so what we build fits the way they already work."
  services:
    - id: "ai-advisory"
      label: "AI advisory"
      title: "Think clearly."
      description: "Where AI fits, what to build or buy, and what to leave alone. We help you compare established and newer models, quality and running costs, cloud or self-hosted deployment, and privacy and DPDP considerations."
      audience: "For owners & leadership teams"
    - id: "implementation"
      label: "Automation & implementation"
      title: "Make it work."
      description: "Custom systems built around your work. We use rule-based automation where defined rules are sufficient, and AI where interpretation or changing context calls for it. We choose the approach for each step, balancing reliability, control and ongoing cost, with human review where needed. We hand you the keys when it’s done."
      audience: "For the people doing the work"
clients:
  intro: "Working alongside accounting, compliance and professional-services teams"
  # Add each firm once; the slider repeats the list itself.
  # Give a firm a `logo` (with its real pixel width and height), or `mark_lines` when it has no usable logo.
  # `work` is not shown on the page; it records what we built for each firm.
  items:
    - name: "FiNOPS"
      url: "https://finopsindia.net/"
      logo: "pk/img/clients/finops.webp"
      width: 640
      height: 162
      work: "An ongoing partnership to rethink how the firm works, with AI built in. At its centre is a private AI assistant that takes on day-to-day accounting work, from reconciliations and document conversions to analysis and research, alongside custom tools that help each team get more done."
    - name: "C.S. Kelkar & Associates"
      url: "https://kelkarcs.com/"
      logo: "pk/img/clients/kelkar.png"
      width: 1840
      height: 294
      work: "Modernising how the practice runs, one process at a time. So far: automated compliance reminders to clients, Director's Report drafting, and tasks created straight from client emails."
    - name: "A N Gawade & Co LLP"
      url: "https://angca.com/"
      logo: "pk/img/clients/gawade.webp"
      width: 600
      height: 118
      work: "Vendor invoices read automatically and posted to Zoho Books as bills, with TDS and GST worked out."
    - name: "HMA & Associates"
      url: "https://www.hmaca.in/"
      logo: "pk/img/clients/hma.png"
      width: 260
      height: 47
      logo_class: "hma-logo"
      work: "A tool built to take on large TDS audits."
    - name: "Gita Kulkarni & Associates"
      url: "https://www.gkca.co.in/"
      mark_lines: ["Gita Kulkarni", "& Associates"]
      work: "Re-thinking the practice's long-standing processes with modern tools. It started with a niche audit that took a long time by hand and now takes 1–2 hours."
work:
  eyebrow: "Work in practice"
  headline: "Proof in the everyday."
  intro: "Every workflow here is live. We built and deployed it, and a client team uses it every day."
  # Each area: one headline, a short paragraph, three tags, a one-line `outcome`, and one real workflow (client not named).
  # Label steps "AI-assisted" only where AI is involved.
  areas:
    - tab: "Business systems"
      title: "Software that fits how you work."
      description: "Client portals and custom CRMs that bring records, responsibilities and progress into one view. Connected tools for inventory management, payroll and performance management."
      tags: ["Client portals", "Inventory & ERP", "People operations"]
      outcome: "Built around your process. Handed over to your team."
      workflow:
        title: "Stock records for a distributor."
        steps:
          - label: "Input"
            text: "Scanned purchase invoices & the factory's WhatsApp messages"
          - label: "Automation"
            text: "Read quantities & work out closing stock"
          - label: "Human review"
            text: "Check any product whose numbers don't add up"
        result: "Closing stock for every product, without adding it up by hand."
    - tab: "Process automation"
      title: "Let repeatable work run."
      description: "Business process automation across the software you already use. Send client reminders and follow-ups on a schedule, move data between systems so no one re-types it, and handle everyday PDF work in-house instead of on free online sites."
      tags: ["Reminders & follow-ups", "Data between systems", "Documents & PDFs"]
      outcome: "Routine steps automated. Approval stays with you."
      workflow:
        title: "Client reminders that follow up on their own."
        steps:
          - label: "Input"
            text: "What's due this cycle & which clients it applies to"
          - label: "Automation"
            text: "Once a partner approves, send each reminder & follow-up on schedule"
          - label: "Human review"
            text: "The team marks a client done when they respond"
        result: "Every client is reminded and followed up, without anyone sending each email by hand."
    - tab: "Finance & compliance"
      title: "Less preparation. More judgement."
      description: "Audits, reporting and invoice booking in Tally or Zoho Books. Compliance trackers bring due dates, task owners and filing status together, with Directors’ Reports."
      tags: ["Schedule III & MIS", "Invoice booking", "DPT-3 · FLA · KYC"]
      outcome: "Audit workings that took days by hand now take seconds."
      workflow:
        title: "Vendor invoices into Zoho Books."
        steps:
          - label: "Input"
            text: "Vendor invoices, as they arrive"
          - label: "AI-assisted"
            text: "Read each invoice & work out TDS and GST"
          - label: "Human review"
            text: "Check the bills before they're final"
        result: "Bills posted to Zoho Books without anyone re-typing them."
    - tab: "Private AI"
      title: "Your own AI assistant, paid for by use."
      description: "An AI assistant set up for your business, in place of a ChatGPT or Claude licence for every person. You pay for what the team actually uses, it works with your own systems and templates, and staff sign in with their work accounts."
      tags: ["Pay for use", "Your systems & templates", "Work sign-in"]
      outcome: "Management can see and govern how AI is used."
      workflow:
        title: "Reconciliations, done by the team."
        steps:
          - label: "Input"
            text: "Two sets of records, like the books & a supplier statement or Form 26AS"
          - label: "AI-assisted"
            text: "Match the entries & list every difference with its likely cause"
          - label: "Human review"
            text: "The accountant checks the differences before anything is corrected"
        result: "Routine accounting work now takes minutes, without building or buying another tool."
people:
  eyebrow: "The people"
  headline: "Experience you can talk to."
  intro: "Independent professionals with a shared history of building companies, shaping teams, and bringing software into the real world."
  patkis_text: "Want to know the story behind Pathkey? Meet The Patkis"
  patkis_url: "the-patkis/"
  members:
    - id: "suyog-patki"
      name: "Suyog Patki"
      role: "Strategy & mentorship"
      image: "pk/img/suyog.webp"
      linkedin: "https://www.linkedin.com/in/suyogpatki"
      width: 300
      height: 214
      bio: "Co-founded Rapid Circle India and helped build a 200+ person cloud consultancy over two decades. Angel investor and mentor to founders."
    - id: "avani-patki"
      name: "Avani Patki"
      role: "People & culture"
      image: "pk/img/avani.webp"
      linkedin: "https://www.linkedin.com/in/avanipatki"
      width: 225
      height: 300
      bio: "Rapid Circle India co-founder. Spent over a decade shaping its people and culture. Brings that experience to how teams adopt change."
    - id: "rohan-nevrikar"
      name: "Rohan Nevrikar"
      role: "Technology & delivery"
      image: "pk/img/rohan.webp"
      linkedin: "https://www.linkedin.com/in/rohannevrikar"
      width: 160
      height: 200
      bio: "Cloud and AI specialist, with experience at Rapid Circle and as Head of Technology at a German startup. Turns ideas into useful software and automation."
contact:
  eyebrow: "Start with a conversation"
  headline_1: "What’s taking up"
  headline_2: "too much of your day?"
  copy_1: "An AI decision, a process to improve, a team ready to learn."
  copy_2: "Tell us where you’d like to start."
  email: "hello@pathkey.in"
footer_links:
  - name: "The Patkis"
    url: "the-patkis/"
  - name: "Values"
    url: "values/"
  - name: "Blog"
    url: "blog/"
  - name: "Privacy & cookies"
    url: "privacy/"
---
