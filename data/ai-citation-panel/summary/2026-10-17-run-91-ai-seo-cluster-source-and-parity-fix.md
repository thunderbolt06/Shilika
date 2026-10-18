# Run 91 - 2026-10-17 - AI SEO cluster: source accuracy + FAQ parity + WebPage dates

LOCAL / UNPUSHED.

## Why
The new /services/ai-seo cluster (commit 69ce8b9) shipped with 1 FAQ parity defect and several stats
that were wrong or unsourced. Google's gen-AI content guide (updated 2026-10-01) asks for fact-checked
content and metadata. Wrong numbers on an AI SEO sales page hurt trust with the exact buyers it targets.

## Fixes (verified against the primary Ahrefs pages)
- "0.66, Ahrefs 2026" -> 0.664, Ahrefs May 2025 (ahrefs.com/blog/ai-overview-brand-correlation/). Linked.
- "44% of ChatGPT answers cite list-style pages" -> 43.8% of pages ChatGPT cited on "best X" prompts were list posts,
  Ahrefs Dec 2025 (ahrefs.com/blog/best-lists-research/). Added the Aug 2026 shift toward official sources.
- "345x to 210x, shrinking every month" -> scoped to the 2025 Ahrefs AI traffic study (ahrefs.com/blog/ai-traffic-increase/).
- "0.25% of all web traffic" -> "of the average site's traffic" (what the study measures).
- 2.87x 404 stat: now sourced (ahrefs.com/blog/how-often-do-ai-assistants-hallucinate-links/, Sep 2025).
- AI Overviews mention-share chart: updated to Ahrefs' Sep 2026 data (3M+ US queries; YouTube 22.9, Reddit 18.5,
  Facebook 10.1, Google 8.8, Instagram 5.6, Quora 4.7, Wikipedia 4.0, TikTok 3.3, Amazon 3.3). Old "2.96M prompts" removed.
- FAQ parity: web3-ai-startups visible question now matches schema. Repo-wide audit: 0 defects.
- WebPage node (datePublished 2026-10-16, dateModified 2026-10-17) added to hub, web3, industrial JSON-LD.
- Offers with priceSpecification on the web3 Service node (same prices as the hub, visible on page).
- Sitemap lastmod 2026-10-17 for the 3 edited URLs. Visible label "UPDATED 17 OCTOBER 2026".

## Files
- app/_partials/services__ai-seo-body.html, services__ai-seo-jsonld.json
- app/_partials/services__ai-seo__web3-ai-startups-body.html, -jsonld.json
- app/_partials/services__ai-seo__industrial-inbound-body.html, -jsonld.json
- app/sitemap.ts

## Gates
FAQ parity 0 defects. tsc clean. JSON valid. 0 em/en dashes in edited bodies. No new client claims or prices.

## Flag for Rahil / Shilika (not changed)
Plans promise "100 / 200 AI-feed pages" a month. Google's AI optimization guide says mass-producing pages
for query variations to influence AI answers is scaled content abuse. Consider reframing as
"up to N reviewed pages" or outcome-based wording.
