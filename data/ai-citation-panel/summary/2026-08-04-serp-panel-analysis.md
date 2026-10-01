# SERP discoverability panel + top winning pages - 2026-08-04 (Day 78, Week 12, Tue)

Operator: Claude Code (Cowork, scheduled). Mode: local code + measurement only. Push is manual (SJ).

## What this is (and the honest caveat)

Plan calendar for Tue 4 Aug: (1) re-run the 25-prompt AI citation panel vs the Week 9 baseline, and (2) identify the top 5 winning pages. Both are normally external-data tasks. As in Runs 44 to 50, the live connectors are down in a non-interactive run:

- Ahrefs MCP returns `Insufficient plan` on every endpoint (Brand Radar, Site Explorer, GSC, Web Analytics). Verified again today, including the free subscription endpoint.
- GSC / GA4 direct OAuth cannot be completed without an interactive session.
- The 4-engine AI-citation panel (ChatGPT, Perplexity, Claude, Gemini) needs browser sessions and cannot run headless here. It has never been run with real data; only the infrastructure exists (Run 25).

So I ran the one measurement surface that is actually live and is the correct proxy: **Google organic SERP discoverability across all 25 buyer prompts**. Per Google's own AI Optimization Guide (updated 2026-07-10), AI Overviews and AI Mode are grounded in the core Search index via retrieval-augmented generation. If a page does not surface in Google organic for a buyer query, it is not in the retrieval set that feeds Google's generative answers. SERP presence is therefore a real, defensible leading indicator of AI-answer eligibility, and it directly identifies the winning pages.

This is a proxy, not the 4-engine citation panel. It measures Google-index discoverability, not verbatim citation inside ChatGPT/Perplexity/Claude/Gemini answers. Treat it as the SERP layer of the panel until the AI-engine layer and GSC are unblocked.

## Method

- Ran each of the 25 `prompts.json` queries once through live web search on 2026-08-04.
- Logged, per prompt: did any shilikajain.com URL surface in the top ~8-10 organic results, which URL(s), and the top competitor domains.
- Data: `results/serp-discoverability/2026-08-04.csv`. Machine rollup: `summary/2026-08-04-rollup.md` (via `scripts/ai-citation-rollup.mjs`).

## Headline numbers

- Shilika surfaced on **9 of 25 buyer prompts (36%)**. 9 distinct URLs surfaced.
- By bucket: fractional PR 3/5 (60%), AI startup PR 2/5 (40%), regional PR 2/5 (40%), Web3 PR 1/5 (20%), cybersecurity PR 1/5 (20%).
- This is the first dated panel run with real data, so it is the true baseline for the SERP layer. No Week 9 numbers exist to diff against (Week 9 panel was never run; only scaffolded).

## Top 5 winning pages (today's deliverable #2)

Ranked by buyer-intent value = number of prompts surfaced x commercial weight of the page.

1. **/playbook/fractional-cmo-web3-2026** - surfaces on A1 and A3 (fractional positioning + cost). Shilika's strongest asset. Two head-of-funnel fractional queries both pull it.
2. **/playbook/cybersecurity-pr-agency-pricing-2026** - surfaces on A3 and D4. The only cybersecurity surface in the whole panel. Pricing intent is where Shilika beats the cyber listicle farms.
3. **/playbook/enterprise-ai-pr-2026** - surfaces on C2 and C4. Carries the entire AI bucket on specific, opinionated enterprise-AI-PR intent.
4. **/services/ai-startup-pr** - surfaces on A4. A core commercial service page (not just a playbook) ranking for a buyer's fractional-vs-agency decision. High conversion value.
5. **/services/kol-marketing** - surfaces on B5. The only Web3-bucket surface and a core commercial service page. Ranks ~5 for its exact-intent query.

Runners-up worth refreshing Wednesday: /playbook/crypto-pr-cost-2026 (A3), /singapore (E3), /playbook/crypto-pr-dubai-mena-2026 (E4), /blog/ai-startup-pr-techcrunch-the-information-forbes-2026 (C2).

## The pattern: where Shilika wins vs loses

Wins: specific, opinionated, non-commodity long-tail. Pricing pages, the fractional-model pages, enterprise/vertical-specific AI pages, and two exact-intent service pages. This is exactly the content Google's AI guide rewards (unique point of view, non-commodity, experience-led).

Loses: the head "best X PR agency 2026" terms. A2, B1, B2, C1, D1, D5, E1, E5 all failed. These SERPs are owned by listicle farms (EAK Digital, Lunar Strategy, ICODA, Coinbound, High Vibe PR, OTReniX, istanbulblockchainweek, badenbower, 9figuremedia) and by local specialists (Paradigm PR in Korea, BlockBuzz PR in India). Notably, Shilika's own `/playbook/best-web3-pr-agencies-2026` did NOT surface for B1, and `/playbook/get-featured-coindesk-2026` did NOT surface for B2. Those two cornerstone pages exist but are not ranking for their target head terms.

Two prompts are effectively mis-targeted for a buyer panel and inflate the "loss" count: C3 (AI founder Op-Ed how-to) and E2 (Japan FIEA/ETF) both return news/education intent, not "who runs PR" intent. Consider revising E2 to a buyer-intent phrasing (for example "who runs crypto PR in Japan for a token launch in 2026") in the next panel version.

## Competitor share of voice (SERP)

By number of prompts a domain appeared on: **High Vibe PR (8)**, luvkaizen (5), eakwire / eakdigital / OTReniX / Crackle PR (4 each), ICODA / MarketerHire / Istanbul Blockchain Week / OBA PR / Analytics Insight / SecuritySenses (3 each).

High Vibe PR is the standout. It appears across Web3, AI, cybersecurity, and regional buckets, and it explicitly markets "LLMO / GEO / AI Search Visibility" plus a tool that scores client presence in ChatGPT and Gemini. It is the closest competitor to Shilika's own GEO/AEO positioning and should be the #1 brand to track when the AI-engine panel goes live.

## Recommended actions (feed Wed 5 Aug "update top 5 pages")

1. Refresh the 5 winning pages above: honest dateModified only if content is actually updated, add 1 to 2 new FAQ pairs at exact-intent, tighten the 50-word answer lede, add 2 to 3 internal links from the winners to the non-surfacing flagship pages (web3-pr-campaigns, cybersecurity-pr) to pass them authority.
2. Fix the two cornerstone pages that should rank but do not: `/playbook/best-web3-pr-agencies-2026` (B1) and `/playbook/get-featured-coindesk-2026` (B2). Audit title/H1 exact-match, internal links in, and comparison-table depth vs the listicles that beat them.
3. Head "best of" terms will not be won on-page alone. They need off-site inclusion in the listicles themselves (SJ outreach, Plan Week 9.3) or a materially stronger own comparison page. Log as SJ task, not a CC on-page fix.
4. Regional: /singapore and /dubai-mena playbook surface; /korea and /india do not. Korea and India lose to local specialists. Strengthen those two desks with more named local outlets/regulators and exact-intent FAQ, or accept they need local backlinks.

## Still blocked / for SJ

- Push the Run 5 to 50 working tree so these pages can actually be re-crawled and the GSC "Generative AI performance report" (Google's official AI-visibility measure) starts collecting.
- Authorise the Ahrefs API-tier plan and connect GSC in an interactive session to unlock real clicks/impressions and the Brand Radar AI-mention data.
- Schedule a browser-enabled session to run the true 4-engine AI-citation panel; the rollup engine will merge it automatically (it already reads the AI-engine CSV schema).
- Delete `data/ai-citation-panel/results/chatgpt/zz-fixture-2026-08-04.csv` (a header-only, skip-safe scaffold left from a schema self-test; the sandbox blocked its deletion). It does not affect the rollup.

## Files this run

- `data/ai-citation-panel/results/serp-discoverability/2026-08-04.csv` - 25-row SERP probe log (new).
- `scripts/ai-citation-rollup.mjs` - reusable rollup + baseline-diff engine, reads both the SERP schema and the 4-engine AI-citation schema (new).
- `data/ai-citation-panel/summary/2026-08-04-rollup.md` - machine rollup (generated).
- `data/ai-citation-panel/summary/2026-08-04-serp-panel-analysis.md` - this note.
- `data/ai-citation-panel/results/chatgpt/zz-fixture-2026-08-04.csv` - header-only scaffold, ignored by the rollup, safe to delete on push.
