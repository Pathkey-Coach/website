---
title: "Products"
type: "products"
draft: false
description: "Deterministic tools for professional firms, grouped by profession. Live tools for CA & audit firms today, more rolling out for CS and legal firms. Pay per output, first one free, nothing stored. Cloud or self-hosted."
suite_eyebrow: "The Pathkey suite"
headline: "Tools built for your profession."
intro: >
  Each tool opens in the browser, takes your files, and hands back the
  finished workpaper — deterministic accounting logic, no AI in the output,
  nothing stored. Cloud or self-hosted. Find your profession below; you only
  pay for what you produce.

audiences:
  - id: "ca-audit"
    title: "For CA & Audit Firms"
    eyebrow: "Live today"
    intro: >
      Two tools in production, used on live client files.
    products:
      - name: "TDS Audit"
        state: "Ready to review and sign"
        does: >
          Reconciles the TDS return against the books and flags every item that
          doesn't match or isn't per tax rules. You review the exceptions and
          sign — no line-by-line lookup.
        detail:
          - "Auto-matches the 26Q conso to your Tally / Zoho ledger — even when party names differ and GST skews the amounts. Most match in seconds; the rest come to you."
          - "Flags what turns into notices — taxable spend past the threshold with missed or short deduction, and TDS that doesn't match the books. 194Q GST gross-vs-net is reversed so goods purchases still reconcile."
          - "Nothing dropped silently — every party it can't confidently match goes to a flags list with the reason."
          - "Each row shows how it was matched — a position you can defend to a senior or an officer, not 'trust the software.'"
        demo:
          kind: "component"
          ref: "tds"

      - name: "Schedule III"
        state: "Most of the work, done for you"
        does: >
          Schedule III, Division I financials with page setup, mapping and
          formatting handled. You're left with light finishing before you send.
        detail:
          - "Classify each group once — the figure flows into the Balance Sheet, P&L, Cash Flow and every Note together. Re-tag one group and all of them re-add automatically."
          - "Works straight off your Tally or Zoho trial balance — reads both layouts and lays them out ready to classify. No reformatting."
          - "Built-in balance check — confirms assets equal equity plus liabilities, and that nothing is left unclassified, before you send."
          - "Forgotten groups don't hide — anything unclassified is flagged, never left silently at zero."
        demo:
          kind: "component"
          ref: "s3"

  - id: "cs"
    title: "For CS Firms"
    eyebrow: "In the works"
    roadmap:
      body: "Coming soon."
    products: []

  - id: "legal"
    title: "For Legal Firms"
    eyebrow: "In the works"
    roadmap:
      body: "Coming soon."
    products: []
---
