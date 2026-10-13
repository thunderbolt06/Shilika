# Run 85 - 2026-10-12 - Serve the "recently funded, no Google presence" ICP

Type: post-plan cadence. One content upgrade on an existing page plus an internal-link pass. No new URLs. LOCAL / UNPUSHED.

## Why
- ICP includes funded Web3 and AI startups with no Google presence. The best-fit page,
  /playbook/ai-series-a-funding-announcement-pr-2026, had no section for that buyer and only
  index-level inbound links (playbook hub, sitemap).
- September 2026 spam update finished around Oct 8 to 9. Google's AI guide (updated 2026-07-10)
  warns against scaled pages for query variants, so this run improves an existing page instead of adding one.

## Shipped
1. article-56 (funding announcement playbook): new H2 "Raised, but invisible on Google? Fix that before
   the announcement" with a 5-step pre-embargo checklist, outbound link to Google's AI optimization guide,
   links to /services/ai-startup-pr and /services/web3-pr-campaigns.
2. New FAQ pair (visible + FAQPage schema, parity kept): newly funded startup with no Google presence.
3. Honest freshness: visible "UPDATED OCT 2026", JSON-LD dateModified 2026-10-12, sitemap lastModified
   2026-10-12, OG publishedTime/modifiedTime.
4. Contextual inbound links to the playbook from: /services/ai-startup-pr (launch-sprint table),
   /playbook/ai-startup-pr-2026 (Phase 2 fund), /pages/ai-startup-pr-agency (AEO answer),
   /pages/web3-investor-relations-agency (worked examples).

## Files
- app/_partials/article-56-body.html, app/_partials/article-56-jsonld.json
- app/playbook/ai-series-a-funding-announcement-pr-2026/page.tsx
- app/sitemap.ts
- app/_partials/services__ai-startup-pr-body.html, article-9-body.html,
  pages__ai-startup-pr-agency-body.html, pages__web3-investor-relations-agency-body.html

## Gates
- faq-parity-audit: 258/258 in parity, 0 defects.
- tsc --noEmit: exit 0.
- 0 em/en dashes in new copy. No new numbers or client claims.
