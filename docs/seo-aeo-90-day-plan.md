# shilikajain.com: 90-day SEO and AEO plan

**Window:** Monday 2 Nov 2026 to Sunday 31 Jan 2027 (13 weeks).
**Built on:** the GSC audit (`docs/gsc-audit-2026-10-30.md`) and the AI-SEO audit (`data/ai-citation-panel/summary/2026-10-15-ai-seo-audit.md`).
**Supersedes** the 30/60/90 sequence in section 5.2 of the 15 Oct audit. This document is now the one calendar for the site, the "Seo shilika" routine and Shilika's off-site work.

## 1. Where we start

**Google (GSC, 1-28 Oct):**
- 64 clicks and 10,563 impressions in 28 days, up from 33 and 9,029.
- 76% of sitemap URLs indexed (623 of 821). 42 are "crawled, not indexed".
- Rankings are improving like for like (fixed-pair average position 15.3 → 13.3).
- Clicks are the gap: 0.45% CTR outside the homepage. About half the impressions look machine-generated.

**AI answer engines (panel, 15 Oct):**
- Cited on ChatGPT 19/25 prompts, Perplexity 14/17, Gemini 10/25 and Claude 2/25.
- Bing is the strongest classic surface (16/25 top 10). Cybersecurity is the weakest bucket.
- She is named on 0 of 46 third-party list pages that engines cite.
- 6 of 47 brand facts that engines repeat are wrong or outdated.

**What the evidence says moves AEO:**
- Off-site mentions on the pages engines already cite. Ahrefs found branded mentions correlate with AI visibility at ~0.66-0.71, against ~0.3 for domain rating.
- Consistent facts about her.
- Dated pages dense with prices and evidence.

JSON-LD, llms.txt and markdown twins are hygiene, not levers. The site already has more than enough pages. **The next 90 days are about quality, proof and mentions, not volume.**

## 2. Goals and how we'll measure them

Targets are direction plus thresholds, not forecasts. The click base is tiny, the AI panel noise band is about ±11 points at 5 runs per prompt, and no lead attribution exists yet.

| Area | Metric | Baseline | Day-90 threshold |
|---|---|---|---|
| Google | Clicks to non-homepage pages (28 days, final data) | 46 | ≥ 100 |
| Google | Total clicks (28 days) | 64 | ≥ 130 |
| Google | Sitemap URLs indexed | 623 / 821 (76%) | ≥ 90% of a smaller, pruned sitemap |
| Google | Crawled, not indexed | 42 | ≤ 15 |
| Google | Fixed-pair position (47 query+page pairs) | 13.3 | ≤ 10 |
| Google | DeFi cluster clicks (best-defi-pr-agency) | 0 | ≥ 5 per 28 days |
| AEO | ChatGPT / Gemini / Claude prompts cited (25) | 19 / 10 / 2 | hold ChatGPT; Gemini ≥ 14; Claude ≥ 6 |
| AEO | Cybersecurity bucket (D), any engine | weakest bucket, 0 on Claude and Gemini | ≥ 1 engine citing on 3 of 5 D prompts, or narrow the cyber claims (decision in week 4) |
| AEO | Third-party pages naming her (disclosed) | 0 of 46 | ≥ 8 live |
| AEO | Brand-probe facts outdated or inaccurate | 6 of 47 | 0 |
| AEO | Engines quoting one consistent price | 0 of 3 | 3 of 3 |
| Tracking | AI-referral sessions and AI-crawler hits per week | not tracked | logging live by end of week 3; baseline set at day 30 |
| Tracking | Leads with a recorded source | 0% | 100% of new leads |

**Checkpoints.** Each one combines the AI panel (25 prompts, 5 runs per engine, misses re-run too, a SHA on every row) with a GSC re-run of today's audit scripts. They replace the dates in both earlier documents. A full panel is 125 answers per engine, so spread each checkpoint over 3-4 days. The first audit used up a whole usage window, and engines throw CAPTCHAs after 12-40 queries; stop at a CAPTCHA, never bypass it.
- **Day 30**: week of 30 Nov.
- **Day 60**: week of 4 Jan. It is moved a week to avoid the holiday dip.
- **Day 90**: week of 25 Jan, ending with a continue/stop call per content program.

## 3. Rules for the whole 90 days

1. **Bulk content is frozen.**
   - No Excel bulk import (`/api/admin/blog/excel/commit`), no new `/pages` variants, no new locales.
   - New posts: at most **3 a week**, published one at a time from the admin. Each one must be on an ICP topic (Web3, AI, cyber, APAC PR), carry first-hand evidence, and get a link from an existing indexed page on the day it goes live.
2. **One change class per week, deployed in logged batches.** Log the SHA and time of every deploy, and check `vercel ls shilika` after each push.
3. **Cosmetic edits don't touch dates.** No sweeps that move `updated_at` or `lastmod` on dozens of posts. Bundle typo or style fixes into a real content update instead.
4. **Changes to the top pages only add.** That means the playbook winners (cost, fractional-vs-agency, best-web3-pr-agencies, the Cointelegraph and TechCrunch pitch guides) and anything with impressions. Never delete or redirect a page with impressions without a mapped 301.
5. **Disclosure on every off-site item.** Label paid items as sponsored and record each one. No unlabelled list slots, no self-ranked lists under other names, no seeded reviews.
6. **Facts beat freshness.** Only show a dated stamp when the content really changed. Event dates come from the event's own site, re-checked before publishing.

## 4. Carry-over from the 15 Oct audit

| # | Action | Status 30 Oct | Where it goes |
|---|---|---|---|
| 1 | Deploy pending files, fix wrong dated facts | Mostly done (runs 88-97, `b06b6fc`, `974266a`). Re-grep needed. | Week 1 check |
| 2 | Crawler access + first-party data | GSC connected and working (667 successful Googlebot fetches, 1 stale 4xx). Vercel challenge for AI bots unverified. Bing Webmaster not visible in repo (confirm: may be DNS). | Weeks 1-2 |
| 3 | One price ladder | **Open.** The homepage alone shows $3K-7K, $4K-10K, $5k-10k (meta) and $6K-14K a month. | Shilika decides by 9 Nov, ship in week 3 |
| 4 | Claims, bio, entity facts | Partly done: rating markup removed (run 102), /compare disclosure (run 101). Open: canonical bio, title, location, LinkedIn name, Muck Rack, sameAs. | Weeks 1-4 |
| 5 | Third-party inclusion | **Not started** (as far as the repo shows). | Weeks 2-7 and 10-13 |
| 6 | AI-crawler and AI-referral logging, lead source | **Open.** The middleware matcher still covers only `/admin`. | Weeks 2-3 |
| 7 | Link winners to money pages | Done (run 96), verify on the live site. | Week 1 check |
| 8 | Freeze, then prune | Freeze broken (100 posts on 28 Oct). Its gate is met: we now have 28+ days of GSC data and per-URL inspection. | Freeze now; prune in weeks 3-5 |
| 9 | Crawler-facing defects | Done: raw-HTML JSON-LD (`114864f`), blog caching (`b23d42f`), html lang (`d6f4c42`), schema errors (`d12c485`). Left: 307→308 apex redirect check, sitemap speed. | Week 6 |
| 10 | Evidence assets, rebuild "best X" pages | **Open.** | Weeks 8-12 |

## 5. Plan by phase

Owners: **S** = Shilika (decisions, her accounts, outreach). **R** = Rahil with Claude (code, content edits, deploys). **Routine** = the daily "Seo shilika" cloud routine.

### Phase 1: Fix, freeze and measure (weeks 1-4, 2-29 Nov)

| Week | Task | Owner | Done when |
|---|---|---|---|
| 1 (2-8 Nov) | In GSC: resubmit the sitemap. Request indexing for the 4 deindexed playbooks, `/authors/shilika-jain` and `/pages/crypto-content-marketing-agency`. "Validate fix" on Crawled-not-indexed and on Events. | S | Submitted date shows 2 Nov or later |
| 1 | Check Security & Manual Actions in GSC | S | Screenshot "No issues" in Notion |
| 1 | Freeze: disable or guard the Excel bulk-import route (admin confirm plus a 10-row cap) and tell the routine (section 6) | R + S | The route refuses more than 10 rows |
| 1 | Re-grep the known-wrong strings from the 15 Oct audit (KBW dates, Token2049 Dubai "attended", Blockworks as a live news desk, "this week") | R | 0 hits live |
| 1 | Shilika decision session: one price ladder, one title, one location, one short bio | S | Canonical facts sheet in `data/` |
| 2 (9-15 Nov) | Verify Bing Webmaster Tools (DNS or meta), submit the sitemap, add IndexNow pings on publish | R + S | Bing shows the sitemap read |
| 2 | Vercel Firewall: confirm there are no challenges for verified bots (Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-User) | R | Firewall log view saved |
| 2 | DeFi cluster: rewrite the title and description of `/playbook/best-defi-pr-agency-2026` for the click. Merge `/pages/defi-pr-agency` into it, or differentiate the two. | R | Live, with a GSC annotation |
| 2-3 | Logging: widen the middleware to log AI-crawler hits and AI referrers (chatgpt.com, perplexity.ai, gemini, claude.ai, copilot). Add a lead `source` field and a required "how did you hear about us" question. Test on a preview first. | R | Weekly counts readable. First lead with a source. |
| 3 (16-22 Nov) | Ship the price ladder everywhere: the page body, the meta descriptions (including the homepage `$5k-10k`), JSON-LD offers and llms.txt. Publish one dated pricing page. | R | 1 range across the site (grep) |
| 3 | Entity cleanup: the canonical bio on About, `/authors`, the Person JSON-LD (one `@id`, sameAs adding HackerNoon, Muck Rack, YouTube and dev.to, and dropping Calendly and Telegram) | R | Rich Results test is clean, and the facts match the sheet |
| 3 | Her own profiles: change the LinkedIn display name to "Shilika Jain" and put the category words in the headline. Claim Muck Rack and fix its location. Update the CryptoDaily author bio and link the site. | S | All four match the facts sheet |
| 3-4 | Prune and consolidate, using the per-URL inspection CSV and GSC: keep any URL with impressions or a Bing top 10. Merge the `/pages` vs `/playbook` pairs (DeFi, fractional CMO, Web3 PR agency, cybersecurity). Noindex off-ICP or thin posts until they're edited. Drop thin locale pages from the sitemap. | R (S approves the list) | Redirect map reviewed, one deploy, 0 ranking URLs lost |
| 4 (23-29 Nov) | Service pages: add exact-anchor internal links from the ranking playbooks and blog posts to `/services/cybersecurity-pr`, `/services/ai-startup-pr` and `/services/kol-marketing`, and bring the editorial pages' proof onto them | R | Each service page has at least 5 contextual inlinks |
| 4 | Cyber decision: either a real, sourced cyber case, or narrower cyber claims | S | Decision logged |
| 2-4 | Off-site wave 1 (see section 7): CryptoDaily APAC roundup pitch, cybersecuritymarketingagencies.com submission, MarketerHire application, CryptoJobsList profile | S | 4 submissions sent |

Timely: the 15 Oct audit gave dates for SG Fintech Festival (18-20 Nov) and Korea Fintech Week (25-27 Nov). Re-verify both on the official sites before updating `/singapore` or `/korea`, and do a post-event refresh only where Shilika has first-hand notes.

### Phase 2: Strengthen pages and earn mentions (weeks 5-8, 30 Nov-27 Dec)

| Week | Task | Owner | Done when |
|---|---|---|---|
| 5 (30 Nov-6 Dec) | **Day-30 checkpoint**: AI panel and brand probe re-run, GSC audit re-run, and a review of the first AI-referral and crawler counts | R | Checkpoint report in `data/ai-citation-panel/summary/` |
| 5 | Geo hubs: retitle `/india`, `/apac`, `/singapore`, `/korea`, `/japan` and `/dubai-mena` around "Web3/crypto/AI PR in <market>". Add the named local outlets, real placements and pricing. Today they rank for "<country> blockchain market" research queries. | R | Titles and H1s live, queries re-checked at day 60 |
| 5-6 | Refresh the top 15 pages by impressions, in place (no new URLs): dated facts, prices, named sources, one first-hand example each, and an FAQ that answers the buyer prompts in 40-60 words | R + S | 15 refreshed, dates moved only on these |
| 6 (7-13 Dec) | Technical leftovers: check the apex redirect is 308, sitemap TTFB under 1 s. Add a `content_updated_at` field so the sitemap lastmod moves only on real edits. | R | Done |
| 6 | Locales: keep the ja, ko and zh pages that have human review and inlinks. Noindex the rest until they're reviewed. | S decides, R ships | The locale sitemap only lists reviewed pages |
| 6 | GITEX and Abu Dhabi Finance Week (7-11 Dec per the 15 Oct audit; re-verify): a `/dubai-mena` update only if there is first-hand material | S + R | Optional |
| 5-7 | Off-site wave 2: a Clutch profile with LinkedIn recommendations converted to verified reviews, a DesignRush profile, an Everything-PR pitch built on the citation-panel data, and 2 LinkedIn Pulse articles with a stated interest | S | 4 live or pending |
| 7 (14-20 Dec) | Weekly GSC pull automated: a script plus a scheduled run, with the service-account key in an env var or a local path, never the repo | R | A CSV a week appears in `data/gsc-audit/` |
| 8 (21-27 Dec) | Holiday week: internal work only. Interlink audit (orphan pages, depth over 3 clicks) and a review of noindexed posts | R | Orphan count is 0 |

### Phase 3: Evidence assets and authority (weeks 9-13, 28 Dec-31 Jan)

| Week | Task | Owner | Done when |
|---|---|---|---|
| 9 (28 Dec-3 Jan) | Draft the **crypto/AI PR cost benchmark 2027** from real proposals and retainers (anonymised, with method stated). It replaces the stale competitor pricing pages engines cite (for example coinbound.io's April 2024 page). | S provides data, R builds | Draft ready |
| 10 (4-10 Jan) | **Day-60 checkpoint** (panel, brand probe, GSC) | R | Report |
| 10-11 | Publish the cost benchmark as a dated page with a downloadable table and pitch it to trade press (Everything-PR, CryptoDaily, and outlets Shilika already works with). This is digital PR for links and mentions. | S + R | Live, and 3 or more pitches sent |
| 10-12 | Rebuild the 11 "best X" playbooks that name no firms. Each one gets named firms, criteria, sourced prices and a disclosed conflict, following the `best-web3-pr-agencies-2026` pattern. Redirect any that can't be sourced honestly. | R + S review | 11 rebuilt or redirected |
| 11-12 | A placement-to-outcome ledger for the 6 named case studies (outlet, date, link, outcome), with links to each case page | S + R | Ledger live |
| 10-13 | Off-site wave 3: follow up on every pending listing, plus 2 guest bylines (disclosed) on outlets engines cite for APAC/Web3 PR | S | ≥ 8 third-party pages naming her (cumulative) |
| 13 (25-31 Jan) | **Day-90 checkpoint.** The full panel, GSC, AI referrals, leads by source. Continue or stop per program (blog, locales, tools, YouTube explainers, syndication). Write the next 90-day plan. | R + S | Decision memo |

## 6. Automation guardrails (recommendations, to approve)

These change systems outside the site, so each one needs your approval before it's applied.

| System | Today | For the next 90 days |
|---|---|---|
| "Seo shilika" daily routine (cloud, 3 AM IST) | Runs refreshes and sweeps. Bulk Supabase patches around runs 95-102 moved lastmod on ~169 posts (103 to 25 Oct, 66 to 29 Oct). | Work from this plan's weekly table, not its own backlog. No site-wide sweeps. At most one change class a day. Stop and log a stale fact or broken link rather than bulk-editing. Write the run's SHA into its summary. |
| Admin Excel bulk import | Published 100 posts at once (1, 15 and 28 Oct) | Guard with a row cap and a confirm step, or disable until day 60 |
| `shilika-content-publisher` (syndication to Medium, dev.to, LinkedIn, Substack) | Daily, sets the canonical to the site | Keep the canonical check. Slow dev.to: the 15 Oct audit flagged 60 posts in 4 days as a scaled pattern. Favour LinkedIn Pulse and the CryptoDaily byline, which engines cite. |
| YouTube explainers (110 queued, daily from 31 Oct) | Bulk scheduled | Fine for the channel, but link each video description to its canonical article and add VideoObject only where the video is embedded on the page |

## 7. Off-site targets (AEO feeders), in order

These come from the 15 Oct audit's feeder analysis: the sites engines cite most where a legitimate route exists. Competitor self-ranked lists (coinbound, cracklepr, icoda, chainpeak and others) have no route; outrank them with dated, sourced pages instead.

1. **CryptoDaily**: she is already a contributor. Fix the bio and pitch a disclosed "solo and fractional options" APAC roundup.
2. **LinkedIn**: display name, headline, 2-3 Pulse articles, named recommendations.
3. **Muck Rack**: claim it, fix the location, link the site.
4. **cybersecuritymarketingagencies.com**: `/submit-agency`. Check the methodology and solo eligibility first.
5. **Clutch**: profile, plus verified reviews from existing recommenders.
6. **MarketerHire**: application (read the terms first).
7. **CryptoJobsList** talent profile, **DesignRush** free profile.
8. **Everything-PR**: an editorial pitch built on the citation-panel or cost-benchmark data.

## 8. Weekly operating rhythm

- **Monday**: read GSC (finalized last 7 days vs the prior 7) and the AI-referral and crawler counts. Choose the week's single change class.
- **During the week**: ship that change in one logged deploy and check the Vercel deploy.
- **Friday**: a 5-line log in Notion (shipped, SHA, metrics moved, blockers, decision needed from Shilika).
- **Monthly**: export the GSC Generative AI report and Bing AI performance by hand into `data/ai-citation-panel/results/`.

## 9. Not doing

- More locales, `/pages` variants or bulk posts.
- Markdown twins, a rebuilt `llms-full.txt`, or more schema types for their own sake.
- Paid list slots without a sponsored label, and reviews we didn't earn.
- Chasing tool-page rankings (`/tools/*` stays as lead magnets).
- Average-position targets (use the fixed-pair set).

## 10. Risks

| Risk | Watch | Response |
|---|---|---|
| Google's site-level quality verdict worsens after 321 October posts | Crawled-not-indexed count; whether the 28 Oct batch indexes | Extend the freeze, noindex the weakest third, prune at day 30 |
| A core or spam update lands mid-plan | Google status dashboard | Annotate it, and judge changes only on fixed pairs and final data |
| Shilika's decision bandwidth | Week-1 and week-4 decisions slip | Each blocked item has a fallback: keep the current range on new pages only, keep cyber claims narrow |
| Off-site work stalls over the holidays | Week 7-9 submissions | Front-load waves 1-2 in November and early December |
| Panel noise reads as progress | Changes under ±11 points | Treat a change as real only if it exceeds the noise band, persists at the next checkpoint and matches GSC or Bing impressions |
