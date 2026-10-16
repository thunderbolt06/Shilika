# Run 87 - 2026-10-14 - /services/apac-pr regulatory accuracy refresh

Type: post-plan cadence. Accuracy + freshness on an existing page. No new URLs. LOCAL / UNPUSHED.

## Why
/services/apac-pr (flagship Obj-3 regional service page) was last updated July 2026 and framed everything around a
"Q2 2026 regulatory window" that is now past. It also had wrong or stale event facts: Token2049 Dubai listed for May
(moved to 21 to 22 April 2027), KBW 2026 listed as Sep 22 to 28 at COEX (actual: Walkerhill, 29 Sep to 1 Oct), WebX
"running this week" (July). Same "Q2 2026" wording sat on the homepage, services hub, llms intro, /apac schema and the
KOL page. Google's AI optimization + gen-AI content guides favour accurate, people-first content on existing pages.

## Facts used (sources)
- Japan FIEA amendment passed the Diet 15 Jul 2026, insider-trading rules: https://english.adnkronos.com/2026/07/15/japan-enacts-bill-to-boost-crypto-assets-regulation/
- HKMA first stablecoin issuer licences 10 Apr 2026 (HSBC, Anchorpoint): https://cointelegraph.com/news/hong-kong-first-stablecoin-licenses-issued
- Australia Digital Assets Framework bill passed 1 Apr 2026, AFSL, ~12 months after Royal Assent: https://www.theblock.co/post/396009/australia-passes-crypto-bill
- Token2049 Dubai moved to April 2027 and KBW dates: already verified in Runs 62 and 86.

## Shipped
- /services/apac-pr: H2 rewritten to "The 2026 APAC regulatory picture: what is now law, and what it means for press copy"
  (4 markets, 3 cited sources, links to /korea and /japan). Event circuit, workstreams, table, subhead, answer box and
  "how to start" de-staled. FAQ "Q2 2026 regulatory deadlines" replaced by "Which 2026 APAC crypto rules change what a
  press release can say?" (visible + schema). Korea, Japan, MENA, Greater China per-country FAQs corrected (visible + schema).
  UPDATED OCT 2026, sitemap lastmod 2026-10-14.
- Homepage + services hub APAC card, homepage JSON-LD, /apac JSON-LD, llms-intro, KOL related card: "Q2 2026" removed.
- i18n: home + services catalogues re-extracted; new segments translated for zh, ko, ja, es, ru; stale pruned.

## Gates
FAQ parity 258/258. i18n check: all locales complete. tsc --noEmit clean. JSON valid. 0 new em/en dashes.
