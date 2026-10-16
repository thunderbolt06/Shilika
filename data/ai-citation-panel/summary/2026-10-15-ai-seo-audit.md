# AI-SEO Audit: shilikajain.com, 2026-10-15

Deep AI-SEO audit of shilikajain.com. Report dated 2026-10-15. Panel captured 2026-10-15 and 2026-10-16 against the live site at commit 30dd8aa, with 34 pending files not yet deployed. It sits beside the earlier panel reports in this folder. No em dashes per house style.

## Verdict

**Where she ranks.** Bing is her strongest surface: 16 of 25 buyer prompts in the top 10, 15 of them at #1, and 29 of 42 keyphrases in the top 10. ChatGPT is her strongest answer engine: cited on 19 of 25 prompts as coded (15 in both runs, and 20 of 25 if two earlier ChatGPT D2 captures are counted, see Limits), named with a list position on 8 at an average of 2.0. Google has her top 10 on 15 of 25 (11 at #1). Gemini cites her on 10 of 25 and on 0 of the 10 fractional-model and cybersecurity prompts. Claude cites her on 2 of 25 and never retrieved a shilikajain.com URL in 27 runs. Perplexity (14 of 17), Brave (7 of 9) and Google AI Mode (3 of 5) are partial, single-run readings and are provisional.

**What works.** Price, fractional-model, "versus", how-to and "who runs X in region Y" questions, carried mainly by playbooks as a family (42 distinct URLs, 41% of AI prompt-hits and 54% of SERP top-10 hits). Across every layer she is visible on 24 of 25 prompts (21 Winning, 3 Contending, 1 Absent), a generous union that includes Google page 2 and single-run hits. Only D1 (best PR firms for cybersecurity startups) is dark.

**What does not.** Generic "agency" head terms (13 of 42 keyphrases absent on Bing, including 0 of 6 Web3 PR agency and KOL head terms), "best firms" lists, cybersecurity (3 of 17 AI cells as coded, 4 of 17 with the earlier ChatGPT D2 captures), the money pages (service pages are cited in 2 of 88 ChatGPT prompt-URL pairs) and Claude. Engines mostly use her as a source, not a pick: ChatGPT cites the site in 34 of 44 runs and names her in 15.

**Likely explanation (inference, not tested).** The evidence points off-site. She is named on 0 of 46 third-party list pages opened, the domain is 164 days old, and the lists engines cite are largely self-ranked by agencies. On-page content does not look like the constraint on Bing and ChatGPT, but crawler access for real bots is unverified and most Claude and Gemini A-bucket runs did not search, so those zeros do not isolate a cause.

**The exposure is facts and proof.** Wrong dated facts sit live under fresh "updated" stamps. Of 47 brand-probe claims, 19 were accurate, 22 unverifiable, 4 outdated and 2 inaccurate. At least five retainer ranges are live. 106 template-built landing pages sit against Google's scaled-content language.

**Do first.** Deploy the 34 pending files and fix the wrong dated facts. Check that search and AI crawlers are not being challenged, and connect Search Console and Bing Webmaster Tools. Set one price ladder, then clean the claims and bio. Freeze new variant pages, locales and bulk posts. Disclosed inclusion on the third-party pages engines already cite follows.

**Limits.** One run per prompt plus a re-run of hits only, though several prompts have more than one capture and only the later one is coded. The one that moves a headline number is ChatGPT D2, cited in two 2026-10-15 captures and absent in the coded 2026-10-16 recapture. 4 of 19 ChatGPT hits and 4 of 10 Gemini hits did not repeat. Google keyphrases were not measured (0 of 42). Google AI Mode ran non-private, so its cells are the least comparable. Sessions used a non-US IP (Bing results were geolocated to India), there is no Search Console or Ahrefs data, the prompts were written by the same program as the pages, and prompts.json specifies 3 runs per prompt but 1 to 2 were run. Nothing here is tied to a lead.

## Method and measurement integrity

### Design

- **Surfaces.** Eight: Google (organic and AI Overview), Bing (organic and AI answer card), Brave (organic and AI answer), ChatGPT, Perplexity, Claude, Gemini and Google AI Mode.
- **Prompts.** 25 buyer prompts in five buckets of five: A fractional PR, B Web3 PR, C AI startup PR, D cybersecurity PR, E regional PR. Full wording is in `data/ai-citation-panel/prompts.json`.
- **Runs.** The AI engines got one run per prompt, plus a stability re-run of every prompt where she was cited in run 1. The coded data holds 31 re-runs: ChatGPT 19, Gemini 10, Claude 2. Perplexity and AI Mode have none. Most misses were not re-tested. Several prompts have more than one capture, and only the later capture is coded. ChatGPT A, B, D and E run 1 were re-captured on 2026-10-16 after the usage-limit reset, as was Gemini B run 1, and the earlier captures are kept in the raw evidence (the `chatgpt-prev-*` folders and Gemini `prev-B-r1-2026-10-15`). They disagree on ChatGPT D2 (cited in two 2026-10-15 captures, absent in the coded 2026-10-16 re-run), ChatGPT A4 and B5, and Gemini B1, B2 and B5. Run rows total 128 (ChatGPT 44, Gemini 35, Claude 27, Perplexity 17, AI Mode 5).
- **Keyphrase sweeps.** 42 keyphrases on Google, Bing and Brave. Only Bing produced real data (see the gaps table below).
- **Classic SERPs.** Mostly one page load each. Google prompts 1 to 4 were loaded two or three times. Bing varied between loads (4 to 10 organic results, an AI answer on some loads only), and the latest full load is used.
- **Brand probes.** 8 prompts (BR1 to BR8) on ChatGPT, Claude and Gemini. 24 answers were claim-checked against her live site, the repo copy and independent sources, which logged 47 distinct claims.
- **Sessions.** Private or temporary sessions on the owner's signed-in accounts, US locale parameters, a non-US IP. No Search Console and no Ahrefs data. Google AI Mode ran in the owner's signed-in Chrome profile, not a private session, so its 3 cites (A2 to A4) may reflect personalisation and are the least comparable cells. Gemini was re-asked after transient errors on A4, B2, C2 run 2, C5 run 2, E3 run 1 and E4 run 1, and A1 to A3 ran on the Pro model while the rest ran on Flash.
- **Evidence coding.** Evidence was double-coded and coder disagreements were adjudicated. The adjudication made 6 overrides: ChatGPT 3, Gemini 3, and 0 on Perplexity, Claude and AI Mode. At the final read, one Gemini row that is only a source-chip label and ChatGPT D4 run 2 (a sources list) were also treated as cited, not named, so the named counts in this report (ChatGPT 15, Gemini 8, 31 of 128 in total) are 1 lower each than the pooled coded data (16, 9, 33).

### Definitions

- **Cited** means named in the answer or listed in its sources or citation chips. **Named** means she appears in the answer prose, with a list position where the answer is a list. A source-chip label alone does not count as named, and neither does a name listed only under a "sources to benchmark against" heading (ChatGPT D4 run 2), which is counted as cited.
- **Stable** means cited in every recorded run (2 of 2 where a re-run exists). For Perplexity and AI Mode there is one run, so "stable" there is one observation and not a stability test. **Intermittent** means cited in 1 of 2 runs. **Absent** means not cited in the runs we have, which for most misses is a single observation, so false negatives are possible.
- Classes for SERP and AI cells (Winning, Contending, Striking distance, Absent, Not measured) are defined at the head of section 2.

### Measurement gaps

Fully measured: ChatGPT, Claude and Gemini on all 25 prompts, with 8 of 8 brand probes each (Gemini BR2 needed one retry after a generic error). Google and Bing organic and AI answer layers on all 25 prompts. Bing on all 42 keyphrases. No stop was recorded on ChatGPT, Claude or Gemini. Everything else is partial, and no gap below was filled with an estimate.

| Surface | Measured | Not measured | Why, from the evidence |
|---|---|---|---|
| Google keyphrases | 0 of 42 | 42 of 42 | The unusual-traffic CAPTCHA (google.com/sorry) appeared on the first query of each keyphrase batch (queries 26, 46 and 66). Browser re-runs of the three batches stopped without bypass: 0 of 20, 0 of 20 and 0 of 2 queries ran on Google itself. The 42 `-*` rows came from a WebSearch stand-in (via proxy: 42). The pooled data shows kp_measured 42 and kp_top10 0 for Google. Read that as not measured, not absent. |
| Brave | 9 of 25 prompts (A1, A2, A3, C4, C5, D1, D2, D3, D4) and 0 of 42 keyphrases | 16 prompts (A4 to C3, D5 to E5) and 42 of 42 keyphrases | A "verifying you are not a bot" interstitial appeared from query 4 (A4) and again at query 20 (D5), and was still present on the 2026-10-16 retry. It was not solved. Buckets B and E are entirely unmeasured. |
| Perplexity | 17 of 25 prompts (A1 to D2) | 8 prompts (D3 to D5, E1 to E5), and the brand probes | A free search limit modal appeared after the prompt was submitted and no answer was generated. The upgrade option was not clicked. The last recorded stop was a gap-fill attempt for bucket D. |
| Google AI Mode | 5 of 25 prompts (A1 to A5) | 20 prompts (B1 to E5), and the brand probes | A Google reCAPTCHA "unusual traffic" interstitial appeared from B1. It returned on the 2026-10-16 retry and on the last recorded gap-fill attempt (bucket C, run 1). It was not solved or bypassed. |
| Bing and Brave, page 2 | no page-2 reading recorded | n/a | A `-` in a Bing or Brave cell means not found in the results read. A few striking-distance cases could sit just beyond. Google was read to page 2. |
| Stability re-runs | ChatGPT 19, Gemini 10, Claude 2 | Perplexity, AI Mode | None in the coded data. One note mentions extra transcripts for Perplexity A1 and A2 (both cited again) and a second AI Mode A1 transcript (absent again). They are not in the coded data and are not counted here. |
| Pages behind 403s or logins | n/a | Forbes, The Block, Decrypt, Economic Times, mexc.com, cryptojobslist.com, designrush.com, Reddit, Quora, Clutch, Crunchbase | Fetches were refused or blocked. Anything that depends on them is marked unverified. The full list of what could not be measured is at the end of section 5. |

### Limitations that shape every number

- One run per prompt. Of the first-run hits that were re-tested, 15 of 19 repeated on ChatGPT (79%), 6 of 10 on Gemini (60%) and 2 of 2 on Claude (23 of 31 overall, 74%). Most misses are single observations, and several prompts have more than one capture (see Runs).
- The prompts were written by the same program that wrote the pages. Several service FAQ headings echo panel prompts almost verbatim. Hits therefore show that pages are retrievable for her own phrasing, not that unprompted buyers find her.
- Coverage is uneven: Perplexity 17 prompts, Brave 9, Google AI Mode 5. Those three are not comparable to the 25-prompt engines.
- Ranks are not what a logged-out US searcher sees.
- There is no Search Console, Ahrefs, crawler log or lead attribution, so nothing is tied to traffic or revenue.

## 1. Platform scorecard

### Scorecard at a glance

| Platform | Measured | Surfaces Shilika | Stable / intermittent / absent | By bucket A / B / C / D / E | Avg position when named |
|---|---|---|---|---|---|
| Bing organic | 25 | 16 top 10 (page 2 not read) | single load: 16 top 10, 9 not found in the results read | 4 / 3 / 2 / 2 / 5 | 1.44 (15 at #1) |
| ChatGPT | 25 | 19 cited | 15 stable, 4 intermittent, 6 absent | 5 / 4 / 3 / 2 / 5 | 2.0 (15 runs, 8 prompts) |
| Google organic | 25 | 15 top 10, 3 more on page 2 | mostly single load: 15 top 10, 3 page 2, 7 absent from top 20 | 4 / 1 / 4 / 3 / 3 | 2.6 (11 at #1) |
| Perplexity | 17 | 14 cited | 1 run each: 14 cited, 3 absent, 8 not measured | 5 of 5 / 4 of 5 / 4 of 5 / 1 of 2 / not measured | 8.67 (3 prompts) |
| Brave organic | 9 | 7 top 10 | single load: 7 top 10, 2 absent, 16 not measured | A 3 of 3, C 2 of 2, D 2 of 4, B and E not measured | 2.57 (4 at #1) |
| Gemini | 25 | 10 cited | 6 stable, 4 intermittent, 15 absent | 0 / 3 / 2 / 0 / 5 | 3.5 (8 runs) |
| Google AI Mode | 5 | 3 cited | 1 run each: 3 cited, 2 absent, 20 not measured | A 3 of 5, B to E not measured | 2.0 (1 prompt) |
| Claude | 25 | 2 cited | 2 stable, 0 intermittent, 23 absent | 1 / 0 / 0 / 0 / 1 | 1.0 (4 runs) |

Run-level view: ChatGPT cited her in 34 of 44 runs (named in prose in 15), Perplexity 14 of 17 (3), Gemini 16 of 35 (8), Claude 4 of 27 (4), AI Mode 3 of 5 (1).

### Google organic and AI Overview

- **Surfaces.** Top 10 on 15 of 25 prompts (11 at #1, average 2.6), page 2 on A5 (#17), B1 (#13) and B5 (#17), absent from the top 20 on B3, B4, C1, D1, D5, E3 and E4. Google page 1 exposed 9 organic links, not 10. Repeat loads: A3 and A4 held. A1 and A2 appeared in only 2 of 3 loads, so those two are intermittent.
- **URLs.** 27 listings across 21 distinct URLs: playbook 13 listings, services 5, blog 4, FAQ 2, pages 2, India hub 1. Playbooks hold 7 of the 11 #1 slots. 8 prompts show two or more of her URLs, with a maximum of 4 (A3).
- **Instead.** Across the 25 browser prompts the recurring domains are linkedin.com (13 prompts), cracklepr.com (8), geniuspr.com (8), everything-pr.com (7), luvkaizen.com (6), istanbulblockchainweek.com (6) and reddit.com (5).
- **AI Overview.** Present on 16 of 25, cites her on 8 (A4, C5, D2, D3, D4, E1, E2, E5). All 8 are prompts where she is also top 10. Where an Overview appears and she is top 10, it cites her on 8 of 10 (the exceptions are A1 and C4). Where an Overview appears and she is not top 10 (6 prompts), it cites her on 0. The Overview was volatile between loads.
- **Missing.** Keyphrases are not measured on Google (0 of 42, see the gaps table). Read the `-*` rows and kp_top10 = 0 in the pooled data as "not measured", not "absent". On Bing the same 42 phrases put her in the top 10 on 29. The pooled Google domain list (coinbound.io 24, mexc.com 20) appears to include those proxy rows, so the domain counts above are recomputed from the 25 browser prompts only. Content gaps: "best firms" lists for cybersecurity and AI, pre-TGE, and the APAC and Dubai prompts.

### Bing organic and AI answer card

- **Surfaces.** Top 10 on 16 of 25, #1 on 15 of them (B3 is #8), average 1.44. Not found on A5, B4, B5, C1, C4, C5, D1, D3 and D5. No page-2 reading was recorded. Keyphrases: 29 of 42 in the top 10 and 24 in the top 3, so 45 of 67 queries overall.
- **URLs.** 42 listings across 38 distinct URLs: playbook 21, pages 11, blog 4, services 2, glossary, FAQ, India hub and home 1 each. Playbooks take 10 of the 15 #1 slots, pages 3. 14 prompts show two or more of her URLs, 5 show three or more, maximum 6 (C2, E5).
- **Instead.** Pooled over 67 queries: linkedin.com 26, coinbound.io 14, icoda.io 12, luvkaizen.com 11, everything-pr.com 10, blockchainappfactory.com 9, clutch.co 8.
- **AI card.** Present on 15 of 25 prompts (29 of 67 queries), cites her on 8 of 25 (17 of 67): A1, A3, A4, B1, B2, C2, D4, E1. It cites her on 8 of the 9 prompts where the card appears and she is top 10, and on 0 of the 6 where she is not.
- **Missing.** 13 of 42 keyphrases: web3 pr agency, crypto pr agency, best web3 pr agencies, token launch marketing, the three KOL terms, ai pr agency, cybersecurity pr agency, cybersecurity marketing agency, crypto marketing agency korea, crypto pr agency dubai, apac pr agency. She wins how-to, cost, comparison, regional and brand phrases and loses the generic "agency" head terms, even though dedicated pages exist for several of them.

### Brave organic (partial)

- **Surfaces.** 9 of 25 prompts measured (A1, A2, A3, C4, C5, D1, D2, D3, D4). Brave served a bot check and the remaining 16 were not run (not bypassed). Top 10 on 7 of 9 (4 at #1, average 2.57), absent on D1 and D3. On A1 and A3 all 10 organic results are shilikajain.com.
- **URLs.** 27 listings, 15 distinct URLs: playbook 18 listings, blog 6, glossary 2, services 1.
- **Instead.** Few non-Shilika domains recur: cracklepr.com 4, obapr.com 3, analyticsinsight.net 3, 5wpr.com 3.
- **AI answer.** Present on 5 of 9, names her on 1 (A2) with no link to her site. On A1 she holds all 10 organic slots and the Brave answer still does not name her.
- **Missing.** Buckets B and E are unmeasured, so Brave cannot yet be called strong or weak outside A, C and D.

### ChatGPT

- **Surfaces.** Cited on 19 of 25: 15 stable (A1 to A5, B3, C2, C3, D4, D5, E1 to E5), 4 intermittent (B2, B4, B5, C1), 6 absent (B1, C4, C5, D1, D2, D3). Buckets 5 / 4 / 3 / 2 / 5. Named with a list position on 8 prompts (A2, C3, D5, E1 to E5), 15 runs, average 2.0, #1 on six of them. Seven of those 8 were named in both runs, D5 in one. The other 11 cited prompts are source-only (A1, A3, A4, A5, B2, B3, B4, B5, C1, C2, D4). D4 run 2 lists her under "Sources to benchmark against" next to two other pricing sources, with no firm recommended, so it is counted as cited, not named. D2 is coded absent from its 2026-10-16 recapture, but two earlier 2026-10-15 captures cited her through "Shilika Jain +1" chips to /playbook/cybersecurity-pr-2026, so counting them ChatGPT is 20 of 25 (15 stable, 5 intermittent, 5 absent).
- **URLs.** 57 distinct shilikajain.com URLs across 44 runs (106 mentions, sources panel including "More" items): playbook 22, pages 17, blog 11. Most repeated: home (7 prompts), /about, /pages/web3-pr-agency-india, /pages/crypto-pr-agency-for-startups and /playbook/crypto-pr-cost-2026 (4 each).
- **Instead.** Competitors: Wachsman, Outset PR, Luna PR (6 each), YAP Global and Crackle PR (4 each). Source domains: cracklepr.com 11, coinbound.io 7, chainpeak.io 7, crypticweb3.com 6, apcollective.io, melivana.com and outsetpr.io (5 each).
- **Missing.** Category lists (B1), AI infrastructure and agent PR (C4, C5), and cybersecurity (D1 to D3). B1 is #1 on Bing and not cited. D2 is #1 on Bing and was cited in 2 of 3 ChatGPT captures, but it is coded absent from the latest one.

### Perplexity (17 prompts, one run each)

- **Surfaces.** Cited on 14 of 17: A 5/5, B 4/5, C 4/5, D 1/2. Absent on B4, C1, D1. D3 to D5 and E1 to E5 were not measured (free search limit), and E is a 5 of 5 bucket on both ChatGPT and Gemini. On the same 17 prompts ChatGPT cites her on 12. Named in prose on only 3 (A2 #1, B1 #14, C5 #11, average 8.67), and the other 11 are source-only. The coded data holds one run per prompt (see the gaps table for the uncounted extra transcripts).
- **URLs.** 39 distinct URLs, 63 mentions. By family as logged: playbook 19, pages 8, services 7, blog 2. Most repeated: /playbook/ai-startup-pr-2026 and home (4 prompts each), then the fractional PR glossary entry, the fractional PR cost blog post, /services/web3-pr-campaigns, /playbook/crypto-pr-cost-2026 and /services/ai-startup-pr (3 each). It cites more service pages than any other answer engine.
- **Instead.** Highwire PR and RH Strategic (3 each), Coinbound, Outset PR, FINPR, Luna PR, ICODA. Domains: coinbound.io, linkedin.com, everything-pr.com and apcollective.io (4 each).
- **Missing.** Prose recommendation. She is a source far more often than a pick.

### Claude

- **Surfaces.** 2 of 25 (A2 and E3), both 2 of 2 runs, both named #1. Absent on 23, including all of B, C and D (0 of 15). Run level: named in 4 of 27 runs, her domain listed in sources in 0.
- **URLs.** None. Zero shilikajain.com URLs across 27 runs. Both hits come from third-party profile pages (dev.to/shilika on A2, and DEV, Icebreaker and CryptoDaily on E3), not her site. On E3 Claude's second search used her name and then mentioned shilikajain.com in prose without a link.
- **Instead.** Competitors: MarketAcross (8 runs), Outset PR (6), ICODA (5), Coinbound, FINPR and Highwire PR (4 each). Sources: mexc.com 10, marketerhire.com 9, coinbound.io 7, techbullion.com 7, icoda.io, cryptojobslist.com and everything-pr.com (6 each), dev.to 5.
- **Missing.** Claude searched in 22 of 27 runs (not on A1, A4, A5, C2, C4) and still never retrieved her own domain, even on A3 where Brave lists her 10 times out of 10. Her site is effectively invisible to this engine.

### Gemini

- **Surfaces.** Cited on 10 of 25: 6 stable (B5, C2, E1, E2, E3, E5), 4 intermittent (B1, B2, C5, E4), 15 absent. Buckets 0 / 3 / 2 / 0 / 5. A and D are 0 of 10. Cited in 16 of 35 runs, named in 8, average 3.5 over those 8 positioned runs (#1 on E3 and E5 in both runs, on E1 in one).
- **Citation goes with grounding.** Gemini cites her mainly in runs where it searched (14 of 20, 70%, against 2 of 15, 13%), but whether it searches depends on the prompt type, so this is an association. The 2 unsearched cites are both E3, from model memory (E3 run 1 was a glitched, merged generation with no sources). Run-1 prompts with no search: A1 to A5, B3, B4, D2, D3, D4, E3. Three of the four intermittent misses (B1, B2, C5) are re-runs without search.
- **URLs.** 11 distinct, 16 mentions: playbook 6, services 2 (/services/kol-marketing, /services/ai-startup-pr), 1 blog post, and the /india and /dubai-mena regional hubs. ChatGPT cites a regional hub (/korea) only once.
- **Instead.** MarketAcross (10), Serotonin and EAK Digital (6 each), High Vibe PR (5), Wachsman, YAP Global and Surgence Labs (4 each). Domains: highvibepr.com, chainpeak.io, jamcopr.com and luvkaizen.com (3 each).
- **Missing.** The whole A bucket and cybersecurity. Gemini did not search on A1 to A5 or D2 to D4, and searched on D1 and D5 without retrieving her.

### Google AI Mode (5 prompts, A bucket only)

- **Surfaces.** Cited on 3 of 5 (A2 named #2, A3 and A4 in sources), absent on A1 and A5. Google then served a reCAPTCHA, and B to E (20 prompts) were not measured and not bypassed. One run each. The two misses were answers with no search or source cards.
- **URLs.** 11 distinct, 12 mentions. By distinct URL: playbook 4, blog 3, pages 2, services 1, FAQ 1. A3 alone cited 7, led by /blog/fractional-head-of-pr-vs-agency-vs-in-house, which also appears on A4.
- **Instead.** GTM 80/20, MarketerHire, MarketAcross, GuerrillaBuzz and Outset PR on A2. Domains chainpeak.io, luvkaizen.com and linkedin.com (2 each).
- **Missing.** Everything outside bucket A.

### How retrieval layers relate to answer layers

Prompt-level overlap between each answer engine and the classic SERP that is supposed to feed it (25 prompts unless stated):

| Pair | Both | Answer only | SERP only | Neither |
|---|---|---|---|---|
| ChatGPT cited vs Bing top 10 | 14 | 5 (A5, B4, B5, C1, D5) | 2 (B1, D2) | 4 |
| Gemini cited vs Google top 10 | 6 | 4 (B1, B5, E3, E4) | 9 | 6 |
| Gemini cited vs Google AI Overview cite | 4 | 6 | 4 | 11 |
| Google AI Mode vs Google top 10 (A1 to A5) | 3 | 0 | 1 (A1) | 1 (A5) |
| Claude cited vs Brave top 10 (9 prompts) | 1 (A2) | 0 | 6 | 2 |
| Perplexity cited vs Google top 10 (17 prompts) | 10 | 4 (A5, B1, B3, B5) | 0 | 3 |
| Perplexity cited vs Bing top 10 (17 prompts) | 10 | 4 (A5, B5, C4, C5) | 0 | 3 |

ChatGPT D2 is coded absent. Counting its two earlier cited captures would move it from SERP only to Both (15 and 1).

Share of the non-Shilika domains an engine cites that also sit in the SERP top 10 for the same prompt (recomputed from run 1, indicative only):

| Engine | vs Google | vs Bing | vs Brave |
|---|---|---|---|
| Gemini | 45.7% | 25.7% | 30.0% (3 prompts) |
| Google AI Mode | 46.4% | 10.7% | 11.8% (3 prompts) |
| Perplexity | 26.3% | 24.6% | 16.3% |
| ChatGPT | 11.9% | 12.4% | 10.7% |
| Claude | 4.9% | 8.6% | 5.9% |

What the data supports:

- **Google's top 10 overlaps with Gemini and AI Mode sources, but only when they search.** Their sources overlap Google's top 10 far more than Bing's (Gemini 45.7% vs 25.7% on 35 non-Shilika domains over 13 prompts, AI Mode 46.4% vs 10.7% on 28 domains over 3 prompts), so both rest on small bases. Of the 9 prompts where she is Google top 10 and Gemini does not cite her, 7 are runs where Gemini did not search at all (A1 to A4, D2 to D4). That fits Gemini scoring 0 of 5 on A while Google has her at #1 on A1, A3 and A4. AI Mode shows the same split: 3 of 3 searched runs cite her, 0 of 2 unsearched runs.
- **Google's Overview and Gemini are different surfaces.** They agree on 4 prompts (C5, E1, E2, E5) and disagree on 10. Among Google's AI layers only the Overview cites her on cybersecurity (D2, D3, D4). Gemini cites 0 of 5 there and AI Mode was not measured there.
- **Bing top 10 goes with ChatGPT citing her.** ChatGPT cites her on 14 of the 16 Bing top-10 prompts (and on 13 of the 15 Bing #1 prompts, 12 of them stable), against 5 of 9 when she is not top 10 on Bing. That is an association, not evidence that ChatGPT uses Bing. Only about 12% of the other domains ChatGPT cites appear in either engine's literal-prompt top 10, which fits ChatGPT running its own rewritten queries. That is inference, not proof.
- **The Brave to Claude link is not confirmed.** Claude cites her on 1 of 7 Brave top-10 prompts. On four of the others Brave has her at #1 (A1, A3, D2, D4) and Claude does not name her. Claude did not search on A1, and on A3 its 13 sources contain none of her pages. Brave was measured on 9 prompts only, and Claude's source list overlaps Brave's top 10 by 5.9%.
- **AI answer blocks add no reach beyond organic.** Neither Google's Overview nor Bing's card ever cited her on a prompt where she was outside the top 10.

Cases where the answer layer cites her and the SERP does not list her:

- ChatGPT on A5, B4, B5, C1, D5 (Bing absent). B4, C1 and D5 are visible on no other measured layer.
- Gemini on E3 (from memory) and E4 (searched, cites /dubai-mena and a Dubai blog post) while Google shows nothing for either in one US-locale load. Bing has her #1 on both. Gemini also cites B1 and B5, where Google has her on page 2 only.
- Perplexity on A5, B1, B3, B5 (Google not top 10) and A5, B5, C4, C5 (Bing not top 10).
- Claude on E3 (Google absent, Bing #1), via dev.to, Icebreaker and CryptoDaily.

Cases where the SERP lists her and the answer layer does not:

- Bing #1 and ChatGPT absent: B1, and D2 as coded (D2 was cited in two earlier captures).
- Google top 10 and Gemini absent: 9 prompts (A1 to A4, C3, C4, D2 to D4).
- Google top 10 and Claude absent: 14 of 15. Bing top 10 and Claude absent: 14 of 16.
- Google Overview present, she is top 10, not cited: A1, C4.

### Ranked verdict

| Rank | Platform | Why |
|---|---|---|
| 1 | Bing organic | 16 of 25 top 10, 15 at #1, 29 of 42 keyphrases top 10. Highest position quality of any surface. |
| 2 | ChatGPT | 19 of 25 cited, 15 stable, named with a list position on 8 prompts at average 2.0. Strongest answer engine, and the one whose citations of her coincide with a Bing top-10 result on the most prompts (14 of 16). |
| 3 | Google organic and AI Overview | 15 of 25 top 10 (18 within the top 20), 11 at #1, Overview cites 8 of 16. Best surface for cybersecurity. Keyphrases not measured. |
| 4 | Perplexity (provisional) | 14 of 17 cited, but named on 3 and one run each. |
| 5 | Brave (provisional) | 7 of 9 top 10, all 10 slots on A1 and A3, but 16 prompts unmeasured. |
| 6 | Gemini | 10 of 25, 6 stable. Zero on A and D. Depends on whether it searches. |
| 7 | Google AI Mode (provisional) | 3 of 5, bucket A only. |
| 8 | Claude | 2 of 25, no site URL ever retrieved, reached only through third-party profiles (mainly dev.to). |

**Strongest.** Regional prompts (bucket E): Bing 5 of 5, ChatGPT 5 of 5 stable, Gemini 5 of 5, Google 3 of 5, Claude 1 of 5. Then fractional PR positioning (A): ChatGPT 5 of 5, Perplexity 5 of 5, Bing 4, Google 4.

**Weakest.** Cybersecurity (D): ChatGPT 2 stable (3 cited in any capture, counting D2), Bing 2, Google 3 (plus the Overview), Gemini 0, Claude 0, and D1 is invisible on every layer measured. Also weak: generic "best firms" lists (B1, B4, C1), where ChatGPT, in one of two runs, is the only measured layer that surfaces her on B4 and C1.

**Why a Google-only panel misreads this.**

- **It understates reach.** Google top 10 reads 15 of 25. Counting Google top 20, Bing and every AI engine, she is visible on 24 of 25 (only D1 is dark). Nine prompts that a Google-only read calls misses are visible elsewhere: A5, B1, B3, B4, B5, C1, D5, E3, E4. ChatGPT surfaces 8 of the 9, and three (B4, C1, D5) exist only on ChatGPT among the layers measured (D5 was not measured on Perplexity, Brave or AI Mode).
- **It understates position quality and the regional story.** Google averages 2.6 with 11 #1s. Bing averages 1.44 with 15. On E, Google misses E3 and E4 while Bing has both at #1 and ChatGPT cites both stable.
- **It overstates Gemini and Claude exposure.** She is Google top 10 on 15 prompts but Gemini cites her on 6 of them and Claude on 1. On the 11 Google #1 prompts, ChatGPT cites her on 10, Gemini on 5, Claude on 0. Google rank is not a proxy for AI visibility, least of all for Claude.
- **It carries single-load noise.** Google was volatile across loads (A1 and A2 each appeared in 2 of 3), page 1 shows 9 links, and the 42 keyphrases could not be read. The repo's earlier google_serp tracker logged 13 of 25 on 2026-09-25 (results/serp-discoverability, not part of this run's data). Today's browser read has 15 in the top 10, but the two reads agree on only 9 surfaced prompts: 4 surfaced only in the old read (A5, B1, B5, E3) and 6 only today (A2, C4, C5, D2, D3, E5).

## 2. Keyphrase and prompt results by platform

Scope: 25 buyer prompts on 8 platforms (Google, Bing, Brave, ChatGPT, Perplexity, Claude, Gemini, Google AI Mode) and 42 keyphrases on 3 search engines (Google, Bing, Brave), captured 2026-10-15 and 2026-10-16. What was not measured, and why, is in the gaps table in the method section.

**How to read the cells**

- SERP cells show the organic rank of the best-ranked shilikajain.com URL. `p2:N` is rank N on Google page 2. `-` means not found in the results read: Google was read to page 2, while no page-2 reading is recorded for Bing or Brave, so a few striking-distance cases could sit inside a Bing or Brave `-`. `n/a` means not measured. A trailing `*` means the value came from the WebSearch tool as a stand-in because the engine showed a CAPTCHA, and is indicative only.
- AI cells: `CITED n/n` means shilikajain.com was cited as a source or named in the answer in every recorded run (n is 2 where a run-1 hit was re-tested, 1 where only one run exists). `SOME x/y` is intermittent. `-` means absent from the single run (a miss is not re-tested). `n/a` is not measured. `#n` is the best position among the firms listed in the answer body. A cell without `#` was cited as a source, or named without a list position.
- Classes: **Winning** is rank 1-3 or cited in every recorded run. **Contending** is rank 4-10 or intermittent. **Striking distance** is rank 11-20 (SERP only). **Absent** is not found. **Not measured** is `n/a`.

### 2.1 The 25 buyer prompts across 8 platforms

| ID | Prompt (abridged) | Google | Bing | Brave | ChatGPT | Perplexity | Claude | Gemini | AI Mode | Wins | Class |
|---|---|---|---|---|---|---|---|---|---|---|---|
| A1 | What is fractional PR for Web3 founders vs an agency | 1 | 1 | 1 | CITED 2/2 | CITED 1/1 | - | - | - | 5/8 | Winning |
| A2 | Best fractional PR consultants for crypto startups | 7 | 1 | 2 | CITED 2/2 #1 | CITED 1/1 #1 | CITED 2/2 #1 | - | CITED 1/1 #2 | 6/8 | Winning |
| A3 | Fractional PR cost for a Web3 startup vs agency | 1 | 1 | 1 | CITED 2/2 | CITED 1/1 | - | - | CITED 1/1 | 6/8 | Winning |
| A4 | AI startup: fractional PR consultant or agency | 1 | 1 | n/a | CITED 2/2 | CITED 1/1 | - | - | CITED 1/1 | 5/7 | Winning |
| A5 | Best PR setup for a funded Web3/AI startup, no media presence | p2:17 | - | n/a | CITED 2/2 | CITED 1/1 | - | - | - | 2/7 | Winning |
| B1 | Best Web3 PR agencies and consultants | p2:13 | 1 | n/a | - | CITED 1/1 #14 | - | SOME 1/2 #10 | n/a | 2/6 | Winning |
| B2 | How to get featured in CoinDesk, Cointelegraph, Decrypt | 1 | 1 | n/a | SOME 1/2 | CITED 1/1 | - | SOME 1/2 | n/a | 3/6 | Winning |
| B3 | Typical PR strategy for a token launch (TGE) | - | 8 | n/a | CITED 2/2 | CITED 1/1 | - | - | n/a | 2/6 | Winning |
| B4 | Crypto PR firms specialising in pre-TGE launches | - | - | n/a | SOME 1/2 | - | - | - | n/a | 0/6 | Contending |
| B5 | How to run a KOL campaign for a Web3 protocol | p2:17 | - | n/a | SOME 1/2 | CITED 1/1 | - | CITED 2/2 | n/a | 2/6 | Winning |
| C1 | Best PR firms for AI startups | - | - | n/a | SOME 1/2 | - | - | - | n/a | 0/6 | Contending |
| C2 | How AI startup PR differs from crypto PR | 1 | 1 | n/a | CITED 2/2 | CITED 1/1 | - | CITED 2/2 | n/a | 5/6 | Winning |
| C3 | Who can ghostwrite and place op-eds for an AI founder | 1 | 1 | n/a | CITED 2/2 #1 | CITED 1/1 | - | - | n/a | 4/6 | Winning |
| C4 | PR strategy for a Series A AI infrastructure company | 6 | - | 2 | - | CITED 1/1 | - | - | n/a | 2/7 | Winning |
| C5 | Who runs PR for AI agent and AI infra startups | 6 | - | 10 | - | CITED 1/1 #11 | - | SOME 1/2 | n/a | 1/7 | Winning |
| D1 | Best PR firms for cybersecurity startups | - | - | - | - | - | - | - | n/a | 0/7 | Absent |
| D2 | How cybersecurity PR works with analyst relations | 1 | 1 | 1 | - (see D2 note) | CITED 1/1 | - | - | n/a | 4/7 | Winning |
| D3 | How a cyber vendor gets cited by AI search | 9 | - | - | - | n/a | - | - | n/a | 0/6 | Contending |
| D4 | Cybersecurity PR cost for a Series B vendor | 1 | 1 | 1 | CITED 2/2 | n/a | - | - | n/a | 4/6 | Winning |
| D5 | Best PR consultant for a cyber startup entering the US | - | - | n/a | CITED 2/2 #5 | n/a | - | - | n/a | 1/5 | Winning |
| E1 | Best PR consultant for a Web3 startup launching in Korea | 1 | 1 | n/a | CITED 2/2 #1 | n/a | - | CITED 2/2 #1 | n/a | 4/5 | Winning |
| E2 | Who runs crypto PR in Japan, and cost | 1 | 1 | n/a | CITED 2/2 #1 | n/a | - | CITED 2/2 | n/a | 4/5 | Winning |
| E3 | Who runs APAC crypto PR for Web3 and AI founders | - | 1 | n/a | CITED 2/2 #1 | n/a | CITED 2/2 #1 | CITED 2/2 #1 | n/a | 4/5 | Winning |
| E4 | Dubai and MENA Web3 PR cost and firms | - | 1 | n/a | CITED 2/2 #5 | n/a | - | SOME 1/2 #7 | n/a | 2/5 | Winning |
| E5 | Who runs Web3 and AI PR for Indian founders | 1 | 1 | n/a | CITED 2/2 #1 | n/a | - | CITED 2/2 #1 | n/a | 4/5 | Winning |

Class is the best result on any platform. Wins is the number of platforms where the prompt is Winning, out of the platforms measured. Full prompt wording is in `data/ai-citation-panel/prompts.json`.

D2 note: ChatGPT D2 is coded `-` from its 2026-10-16 recapture. Two earlier 2026-10-15 captures cited her, so counting them ChatGPT D2 is intermittent (2 of 3 captures), ChatGPT is 20 of 25 and bucket D is 4 of 17. The AI Mode column ran in a signed-in, non-private Chrome profile.

What the matrix shows:

- **Search engines.** 15 of 25 prompts rank top 10 on Google (11 at #1) and 16 of 25 on Bing (15 at #1). 12 prompts are top 10 on both and 11 are #1 on both. 6 prompts are top 10 on neither (A5, B4, B5, C1, D1, D5). Google puts A5, B1 and B5 on page 2 and has E3 and E4 absent, where Bing has E3 and E4 at #1.
- **Which page ranks.** The top-ranked Shilika URL on the 15 Google top-10 prompts is a playbook on 9, a service page on 4 and a blog post on 2, and never a /pages landing page or a regional desk. On Bing's 16 it is a playbook on 11, a /pages landing page on 3 (C3, E2, E4), a service page on 1 (E3) and a desk on 1 (E5). A declared primary URL from `prompts.json` is in the top 10 on only 8 of the 15 Google prompts and 5 of the 16 Bing prompts.
- **AI engines mostly use the site as a source, not as a recommendation.** ChatGPT cites shilikajain.com in 34 of 44 runs but names her in the answer body in 15. Perplexity cites in 14 of 17 runs and names her in 3. Gemini cites in 16 of 35 and names her in 8. AI Mode cites in 3 of 5 and names her in 1. Claude never lists the site as a source (0 of 27 runs) and names her in 4. Only 17 of the 40 all-runs-cited cells carry a list position.
- **Engine gap.** Claude names her on 2 of 25 prompts (A2, E3). Gemini is stable on 6 and intermittent on 4, and is absent on every A prompt (the fractional model prompts ChatGPT and Perplexity cite 5 of 5) and every D prompt.
- **AI answers on search engines.** Google's AI Overview appeared on 16 of 25 prompts and cited the site on 8 (A4, C5, D2, D3, D4, E1, E2, E5), all of which also had a top-10 organic result. Bing's AI answer appeared on 29 of 67 queries and cited the site on 17. Brave's appeared on 5 of 9 and named her once (A2). The conditional rates are in section 1.

### 2.2 The 42 keyphrases on Google, Bing and Brave

Google cells are all `-*`. They come from a WebSearch stand-in, not from Google, and are indicative only. WebSearch is a model-summarised search that ignores `site:`. The playbook audit found it returned 0 shilikajain.com URLs on 23 probes, including 6 prompts that the 2026-09-25 SERP panel had logged as wins, while Google itself ranks the site top 10 on 15 of the 25 prompts in this audit. Read `-*` as not measured, not as absent. Brave is `n/a` on all 42 (bot check). Bing is the only engine with real keyphrase data, and Class below is based on Bing.

| Cluster | Keyphrase | Google | Bing | Brave | Target page | Shilika URL that ranked on Bing | Class |
|---|---|---|---|---|---|---|---|
| fractional-pr | fractional pr consultant | -* | 2 | n/a | `/pages/fractional-pr-consultant` | same | Winning |
|  | fractional head of pr | -* | 1 | n/a | `/pages/fractional-head-of-pr` | same | Winning |
|  | fractional cmo web3 | -* | 6 | n/a | `/playbook/fractional-cmo-web3-2026` | `/pages/fractional-cmo-web3` (mismatch) | Contending |
| cost-pricing | crypto pr cost | -* | 10 | n/a | `/playbook/crypto-pr-cost-2026` | same | Contending |
|  | fractional pr cost | -* | 1 | n/a | `/playbook/fractional-pr-cost-pricing-2026` | same | Winning |
|  | token launch pr cost | -* | 1 | n/a | `/playbook/token-launch-pr-campaign-cost-2026` | same | Winning |
| web3-pr | web3 pr agency | -* | - | n/a | `/pages/web3-pr-agency` | - | Absent |
|  | crypto pr agency | -* | - | n/a | `/pages/best-crypto-pr-agency` | - | Absent |
|  | best web3 pr agencies | -* | - | n/a | `/playbook/best-web3-pr-agencies-2026` | - | Absent |
| token-launch | token launch pr | -* | 7 | n/a | `/services/token-launch-pr` | `/pages/token-launch-pr-agency` (mismatch) | Contending |
|  | tge pr agency | -* | 1 | n/a | `/pages/tge-pr-agency` | same | Winning |
|  | token launch marketing | -* | - | n/a | `/pages/token-launch-marketing-agency` | - | Absent |
| kol | web3 kol marketing | -* | - | n/a | `/services/kol-marketing` | - | Absent |
|  | crypto kol marketing agency | -* | - | n/a | `/pages/crypto-kol-marketing-agency` | - | Absent |
|  | crypto influencer marketing agency | -* | - | n/a | `/pages/crypto-influencer-marketing-agency` | - | Absent |
| ai-pr | ai pr agency | -* | - | n/a | `/pages/ai-pr-agency` | - | Absent |
|  | ai startup pr | -* | 2 | n/a | `/services/ai-startup-pr` | `/pages/ai-startup-pr-agency` (mismatch) | Winning |
|  | ai publicist | -* | 7 | n/a | `/pages/ai-publicist` | `/playbook/what-is-an-ai-publicist-2026` (mismatch) | Contending |
| cyber-pr | cybersecurity pr agency | -* | - | n/a | `/pages/cybersecurity-pr-agency` | - | Absent |
|  | fractional cybersecurity pr | -* | 1 | n/a | `/services/cybersecurity-pr` | same | Winning |
|  | cybersecurity marketing agency | -* | - | n/a | `/pages/cybersecurity-marketing-agency` | - | Absent |
| regional-korea | korea web3 pr | -* | 9 | n/a | `/korea` | same | Contending |
|  | crypto marketing agency korea | -* | - | n/a | `/pages/crypto-pr-agency-korea` | - | Absent |
| regional-japan | japan web3 pr | -* | 1 | n/a | `/japan` | same | Winning |
|  | crypto pr agency japan | -* | 2 | n/a | `/pages/crypto-pr-agency-japan` | same | Winning |
| regional-singapore | singapore web3 pr | -* | 2 | n/a | `/singapore` | same | Winning |
|  | crypto pr agency singapore | -* | 2 | n/a | `/pages/crypto-pr-agency-singapore` | same | Winning |
| regional-mena | dubai web3 pr | -* | 2 | n/a | `/dubai-mena` | same | Winning |
|  | crypto pr agency dubai | -* | - | n/a | `/pages/crypto-pr-agency-dubai` | - | Absent |
| regional-india | india web3 pr | -* | 2 | n/a | `/india` | `/playbook/best-web3-pr-agency-india-2026` (mismatch) | Winning |
|  | crypto marketing agency india | -* | 3 | n/a | `/pages/crypto-marketing-agency-india` | same | Winning |
| regional-apac | apac crypto pr | -* | 1 | n/a | `/services/apac-pr` | same | Winning |
|  | apac pr agency | -* | - | n/a | `/apac` | - | Absent |
| how-to-media | how to pitch cointelegraph | -* | 1 | n/a | `/playbook/how-to-pitch-cointelegraph-2026` | same | Winning |
|  | get featured in coindesk | -* | 2 | n/a | `/playbook/get-featured-coindesk-2026` | same | Winning |
|  | get featured in decrypt | -* | 1 | n/a | `/playbook/how-to-get-featured-in-decrypt-2026` | same | Winning |
| comparison | fractional pr vs agency | -* | 1 | n/a | `/playbook/fractional-vs-agency` | same | Winning |
|  | fractional pr vs in house | -* | 1 | n/a | `/playbook/fractional-pr-vs-in-house-hire-2026` | same | Winning |
|  | crypto pr vs ai pr | -* | 1 | n/a | `/playbook/crypto-pr-vs-ai-pr` | same | Winning |
| brand | shilika jain | -* | 1 | n/a | `/about` | `/` (mismatch) | Winning |
|  | shilika jain pr | -* | 1 | n/a | `/` | same | Winning |
|  | shilikajain.com | -* | 1 | n/a | `/` | same | Winning |

**Page mismatch (6 of the 29 keyphrases that rank on Bing, 21%)**

| Keyphrase | Bing rank | Intended page | Page that ranked | Reading |
|---|---|---|---|---|
| fractional cmo web3 | 6 | `/playbook/fractional-cmo-web3-2026` | `/pages/fractional-cmo-web3` | Landing page displaces the playbook that surfaced in all four earlier panel runs |
| token launch pr | 7 | `/services/token-launch-pr` | `/pages/token-launch-pr-agency` | Landing page displaces the service page |
| ai startup pr | 2 | `/services/ai-startup-pr` | `/pages/ai-startup-pr-agency` | Landing page displaces the service page |
| ai publicist | 7 | `/pages/ai-publicist` | `/playbook/what-is-an-ai-publicist-2026` | Playbook displaces the intended landing page |
| india web3 pr | 2 | `/india` | `/playbook/best-web3-pr-agency-india-2026` | Playbook displaces the regional desk |
| shilika jain | 1 | `/about` | `/` | Home page ranks instead of the about page (low impact) |

How the intended page performs by type (Bing):

| Target page type | Keyphrases | Ranks at target | Ranks on another URL | Absent |
|---|---|---|---|---|
| `/pages` landing page | 17 | 6 | 1 | 10 |
| `/playbook` | 11 | 9 | 1 | 1 |
| `/services` | 5 | 2 | 2 | 1 |
| Regional desk (`/korea`, `/japan`, `/singapore`, `/dubai-mena`, `/india`, `/apac`) | 6 | 4 | 1 | 1 |
| Home page and `/about` | 3 | 2 | 1 | 0 |
| All | 42 | 23 | 6 | 13 |

Playbook targets rank at the target 82% of the time (9 of 11), landing pages 35% (6 of 17). Landing-page targets also carry the most competitive head terms, so this does not isolate page type as the cause.

**Pattern in the 13 absent keyphrases.** All 13 are generic category terms with no cost, comparison or how-to modifier: web3 pr agency, crypto pr agency, best web3 pr agencies, token launch marketing, web3 kol marketing, crypto kol marketing agency, crypto influencer marketing agency, ai pr agency, cybersecurity pr agency, cybersecurity marketing agency, crypto marketing agency korea, crypto pr agency dubai and apac pr agency. 10 of the 13 point to a /pages landing page. The 29 that rank are mostly qualified: 3 cost terms, 4 further fractional terms, 6 how-to and "vs" terms, 9 of the 12 regional terms, the 3 brand queries, plus "tge pr agency", "ai startup pr" and "ai publicist". The one unqualified category head term that ranks is "token launch pr", at #7. Bing's most frequent domains across the 67 queries are list and directory hosts: linkedin.com (26), coinbound.io (14), icoda.io (12), luvkaizen.com (11), everything-pr.com (10) and clutch.co (8).

### 2.3 Classification and counts

**Prompts (25), by platform**

| Platform | Winning | Contending | Striking distance | Absent | Not measured |
|---|---|---|---|---|---|
| Google | 11 | 4 | 3 | 7 | 0 |
| Bing | 15 | 1 | 0 | 9 | 0 |
| Brave | 6 | 1 | 0 | 2 | 16 |
| ChatGPT | 15 | 4 | n/a | 6 | 0 |
| Perplexity (single run) | 14 | 0 | n/a | 3 | 8 |
| Claude | 2 | 0 | n/a | 23 | 0 |
| Gemini | 6 | 4 | n/a | 15 | 0 |
| AI Mode (single run) | 3 | 0 | n/a | 2 | 20 |
| All 200 cells | 72 | 14 | 3 | 67 | 44 |
| Best on any platform (25 prompts) | 21 | 3 | 0 | 1 | 0 |

Of the 156 measured cells, 72 are Winning (46%), 14 Contending (9%), 3 Striking distance (2%) and 67 Absent (43%).

- Best-on-any-platform Contending: B4 (ChatGPT intermittent only), C1 (ChatGPT intermittent only), D3 (Google #9 only). Absent everywhere: D1, on all 7 platforms that were measured.
- Striking distance exists only on Google (A5, B1, B5), and all three win on another platform.
- The "any platform" view is generous. 13 of the 25 prompts win on 3 or more platforms (A1, A2, A3, A4, B2, C2, C3, D2, D4, E1, E2, E3, E5). 8 win on only 1 or 2 platforms (A5, B1, B3, B5, C4, C5, D5, E4), and two of those are single-platform wins (C5 on Perplexity, D5 on ChatGPT). 4 win on none (B4, C1, D1, D3).
- Counting ChatGPT D2's two earlier cited captures, ChatGPT moves from 15 Winning, 4 Contending, 6 Absent to 15, 5 and 5, and the 200-cell table to 72 Winning, 15 Contending, 3 Striking distance, 66 Absent and 44 Not measured.

**Keyphrases (42), by platform**

| Platform | Winning | Contending | Striking distance | Absent | Not measured |
|---|---|---|---|---|---|
| Google | 0 | 0 | 0 | 0 | 42 (the `-*` stand-in found 0 of 42, indicative only) |
| Bing | 24 | 5 | 0 | 13 | 0 |
| Brave | 0 | 0 | 0 | 0 | 42 (bot check) |
| Overall (best on an engine that was measured) | 24 | 5 | 0 | 13 | 0 |

- Excluding the 3 brand queries, which are navigational and trivially won: 21 Winning (54%), 5 Contending (13%), 13 Absent (33%) of 39.
- Winning by rank on Bing: 15 at #1, 8 at #2, 1 at #3. Contending: fractional cmo web3 (6), crypto pr cost (10), token launch pr (7), ai publicist (7), korea web3 pr (9).
- Striking distance is 0 on Bing, with the page-2 caveat above.

### 2.4 Cluster view and likely root causes

Wins are the number of prompts Winning on a platform out of the prompts in the cluster. Perplexity is measured on 17 prompts and Claude and Gemini on all 25. Brave and AI Mode cover too few prompts to split by cluster. Keyphrases are Bing Winning, Contending, Absent.

| Cluster | Prompts (+ keyphrases) | Google | Bing | ChatGPT | Perplexity | Claude | Gemini | Keyphrases W/C/A | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| Fractional model, cost, comparison | A1-A5 (+9 keyphrases) | 3/5 | 4/5 | 5/5 | 5/5 | 1/5 | 0/5 | 7/2/0 | Strong in search, ChatGPT and Perplexity. Weak on Claude and Gemini |
| Web3 PR head terms | B1 (+3) | 0/1 | 1/1 | 0/1 | 1/1 | 0/1 | 0/1 | 0/0/3 | Weak. Wins only in long natural-language form |
| Media access (get featured) | B2 (+3) | 1/1 | 1/1 | 0/1 | 1/1 | 0/1 | 0/1 | 3/0/0 | Strong in search, intermittent in AI |
| Token launch and TGE | B3, B4 (+3) | 0/2 | 0/2 | 1/2 | 1/2 | 0/2 | 0/2 | 1/1/1 | Weak. Cost and "tge pr agency" win, the rest does not |
| KOL marketing | B5 (+3) | 0/1 | 0/1 | 0/1 | 1/1 | 0/1 | 1/1 | 0/0/3 | Weak in search. Split in AI |
| AI startup PR | C1-C5 (+3) | 2/5 | 2/5 | 2/5 | 4/5 | 0/5 | 1/5 | 1/1/1 | Mixed. Explainers win, "best firms" lists lose |
| Cybersecurity PR | D1-D5 (+3) | 2/5 | 2/5 | 2/5 | 1/2 | 0/5 | 0/5 | 1/0/2 | Weakest. D1 absent on all 7 platforms measured |
| Regional desks | E1-E5 (+12) | 3/5 | 5/5 | 5/5 | not measured | 1/5 | 4/5 | 8/1/3 | Mixed. Strong on Bing, ChatGPT, Gemini. Korea weakest |
| Brand | none of the 25 (+3) | n/a | n/a | n/a | n/a | n/a | n/a | 3/0/0 | Won, navigational, excluded from non-brand rates |

Within the regional cluster, by keyphrase (Bing): Japan 2/2, Singapore 2/2 and India 2/2 Winning, APAC 1 Winning and 1 Absent, Dubai and MENA 1 Winning and 1 Absent, Korea 1 Contending (#9) and 1 Absent.

**Regional prompts: declared target against the page that ranked**

| Prompt | Declared target | Google | Bing |
|---|---|---|---|
| E1 Korea | `/korea`, `/services/apac-pr` | #1 `/playbook/best-web3-pr-agencies-2026`. `/korea` not in top 10 | #1 same playbook. `/korea` not in top 10 |
| E2 Japan | `/japan`, `/services/apac-pr` | #1 `/playbook/crypto-pr-japan-2026`, #2 `/pages/japan-crypto-pr-agency`. `/japan` not in top 10 | #1 `/pages/crypto-pr-agency-japan`, #2 `/pages/japan-crypto-pr-agency`. `/japan` not in top 10 |
| E3 APAC | `/services/apac-pr`, `/apac` | Absent | #1 `/services/apac-pr`, #2 `/pages/apac-crypto-pr-agency` |
| E4 Dubai and MENA | `/dubai-mena`, `/services/apac-pr` | Absent | #1 `/pages/mena-crypto-pr-agency`, #2 `/pages/web3-pr-agency-uae`. `/dubai-mena` not in top 10 |
| E5 India | `/india`, `/services/apac-pr` | #1 `/playbook/best-web3-pr-agency-india-2026`, #3 `/india` | #1 `/india`, #2 the same playbook |

**Likely root causes of the weak clusters**

- **Most likely common cause (inference): off-site authority.** The 13 absent keyphrases and the head-term prompts (B1, B4, C1, D1, D5) sit on SERPs held by agency list pages and directories. The listicle research read 46 third-party list pages and found Shilika on none, with 15 of the 46 being agencies that rank themselves. The backlink audit found a domain 164 days old, no Tranco rank, and no third-party page mentioning it. The AI panel shows the same pattern: Claude's most-cited domains are mexc.com (10), marketerhire.com (9), coinbound.io (7) and techbullion.com (7), and Gemini's are highvibepr.com, chainpeak.io, jamcopr.com and luvkaizen.com (3 each). These are list hosts where Shilika is not present. MarketAcross is the agency named most often in AI answers (22 runs, including Claude 8 and Gemini 10).
- **Web3 head terms (0 of 3 keyphrases).** The on-site asset works in the long natural-language form: `/playbook/best-web3-pr-agencies-2026` is Bing #1 for B1 and Google page 2 (p2:13). The short keyphrase "best web3 pr agencies" is absent on Bing. Perplexity names her 14th of 15 firms, and ChatGPT and Claude do not name her. Two of the three targets are /pages variants that the programmatic triage marks for merge.
- **Token launch and TGE.** "tge pr agency" (#1) and "token launch pr cost" (#1) win, but "token launch pr" ranks #7 through `/pages/token-launch-pr-agency` rather than the service page, and "who specialises in pre-TGE" (B4) is absent on both search engines. The programmatic audit counts 6 token-launch landing pages on one intent, and the service page was also 0 of 4 in the earlier Google panel. This is intent split between a service page and near-duplicate landers, plus listicle-owned "who specialises" SERPs.
- **KOL (0 of 3 keyphrases, B5 absent on Bing).** The only Google hit is page 2 (p2:17) through `/playbook/best-crypto-kol-marketing-agencies-2026`, not `/services/kol-marketing`. Perplexity and Gemini do cite the site, so the content is retrievable by AI engines while the search head terms are lost. The programmatic audit lists 5 KOL landers on one intent, and the research shows a large competitor (Coinbound, 926 URLs, 130 "top" and "best" slugs) owns the commercial SERP.
- **AI startup PR.** Explainer and strategy prompts win (C2 on 5 platforms, C3 on 4), but "best PR firms for AI startups" (C1) wins on none, and `/services/ai-startup-pr` sits at #6 on Google for C4 and C5. On Bing "ai startup pr" is held by the landing page `/pages/ai-startup-pr-agency`, not the service page. The exact-match "best AI PR agencies" list pages in these SERPs come from High Vibe PR (dated 2026-10-14), Crackle PR and Corporate Ink.
- **Cybersecurity (weakest).** Wins are on price and process questions (D4 cost on Google #1, Bing #1, Brave #1 and ChatGPT (cited in both runs, as a pricing source), and D2 analyst relations on Google, Bing, Brave and Perplexity), not on "who is best" (D1 absent on every platform measured, D5 only on ChatGPT at #5). Two reinforcing causes from the site audits: the cybersecurity page admits it has no cyber client and the pillar example is a composite, so there is no proof for "best firm" queries, and the cyber retainer is quoted at $7.5K-$15K on one page and $3K-$7K on another. The feeder research read the cyber list pages (Corporate Ink, Crackle PR, cybersecuritymarketingagencies.com, Analytics Insight) and Shilika is on none.
- **Korea and Dubai.** `/korea` ranks #9 for "korea web3 pr", and "crypto marketing agency korea" is absent. Korea prompt E1 is won by a general playbook that links to no desk (links audit), and on Bing Japan E2 and Dubai E4 are won by /pages variants, not by `/japan` or `/dubai-mena`. The regional audit points to 11 Korea URLs splitting one intent, titles that do not carry "crypto PR agency Korea", wrong or expired dates (Korea Blockchain Week, KBW) and a 404 proof link.
- **Claude (2 of 25) and Gemini (A and D buckets 0 of 10).** The same pages that rank #1 on Google and Bing for A1, A3 and A4 are not cited by either engine (Gemini did not search on A1 to A4 and Claude did not search on A1 and A4). Claude's 4 hits are body mentions with no citation to shilikajain.com (the chips point to dev.to), and both engines draw on the third-party list hosts above. The evidence is consistent with an off-site explanation but does not isolate it. It does not show why Gemini skips the A bucket, and with one run per prompt this is a gap, not a ceiling.

**Cross-checks against the site audits**

- **Regional desks are indexed on Bing, and at least two are known to Google.** `/korea` (#9), `/japan` (#1), `/singapore` (#2) and `/dubai-mena` (#2) rank on Bing for their own head keyphrases, and `/india` is Bing #1 for E5 and Google #3. Google's AI Overview links `/korea` for E1 and `/india` for E5. The regional audit's non-indexation inference (from a WebSearch probe) is therefore not supported for Bing, `/korea` or `/india`. Index status for `/japan`, `/dubai-mena` and `/singapore` on Google stays unverified without Search Console, and "apac pr agency" (target `/apac`) is the one desk keyphrase absent on Bing.
- **Landing pages do have search value on Bing.** The programmatic audit found 0 of 48 panel hits were /pages on Google. In this audit 21 distinct /pages URLs rank top 10 somewhere (20 on Bing, 2 on Google at secondary positions, 1 on both), and 19 of the 21 are on that audit's MERGE list. ChatGPT cites a /pages URL in 16 of 44 runs across 11 prompts, against 2 runs for service pages and 1 for a desk. The case for consolidating near-duplicate landers on intent still stands, but check Bing Webmaster Tools and Search Console before 301s, so the target page takes over what these URLs rank for.
- **What each AI engine cites.** ChatGPT cites playbooks in 17 runs, /pages in 16, blog posts in 10, the home page in 9, `/about` in 5, service pages in 2 and a desk in 1. Perplexity leans on playbooks (13 of 17 runs) and service pages (9). Gemini cites playbooks in 8 of 35 runs, service pages in 3 and desks in 3. Service pages and desks, which the keyphrase plan targets, are therefore cited in only 2 and 1 ChatGPT runs and 3 and 3 Gemini runs. Only Perplexity leans on service pages.
- **Versus the earlier panel (2026-09-25 and before, a different search method).** `/playbook/crypto-pr-vs-ai-pr` (C2), `/playbook/get-featured-coindesk-2026` (B2) and `/services/cybersecurity-pr` (D4) rank #1 on Google, and `/india` ranks #3 on E5, after being "never surfaced" in the four earlier runs. B5 and E3, two of six earlier "stable wins", are off the Google top 10 here. The first group fits the 2026-10-01 deploy, but with a different method and one run each this is a flag, not proof.

**Confidence.** Highest for the Bing keyphrase ranks and the Google, Bing and ChatGPT prompt results (real engines, ChatGPT hits re-tested once). Lowest for the Google keyphrase column (stand-in), Perplexity and AI Mode (single run, partial coverage), Brave (9 of 25 prompts, 0 of 42 keyphrases), and every `-` (single observation).

## 3. What is working and what is not

**Bottom line.** Shilika's pages are retrievable and are being named by the engines that read the open web: ChatGPT, Gemini, Perplexity, Google AI Overviews and Bing. Claude is the exception. The wins are on long-tail questions about price, the fractional model, "versus" and how-to, and on "who runs X in region Y" questions. They are rare on "best agencies" head terms, in cybersecurity, and on Claude. Playbooks as a family, led by a few cost and fractional-model pages, and some blog posts carry most of the visible wins. The money pages do not. Several large investments (JSON-LD, llms.txt, markdown twins, machine-translated locales) show no sign of mattering. The scaled-page layer is both a real source of retrieval and the biggest policy risk. Nothing is tied to a lead, because no click, AI referral or lead carries a source.

### 3.1 The scoreboard

| Engine | Measured | Stable (cited every run) | Intermittent | Absent | Not measured | Cited in any run | Named in answer text (run rows) | Domain in sources (run rows) | Avg list position when named |
|---|---|---|---|---|---|---|---|---|---|
| ChatGPT | 25 | 15 | 4 | 6 | 0 | 19 of 25 | 15 of 44 | 34 of 44 | 2.0 |
| Perplexity | 17 | 14 (one run, not re-tested) | 0 | 3 | 8 (free search limit) | 14 of 17 | 3 of 17 | 14 of 17 | 8.67 |
| Claude | 25 | 2 | 0 | 23 | 0 | 2 of 25 | 4 of 27 | 0 of 27 | 1.0 |
| Gemini | 25 | 6 | 4 | 15 | 0 | 10 of 25 | 8 of 35 | 13 of 35 | 3.5 |
| Google AI Mode | 5 (bucket A only, non-private session) | 3 (one run, not re-tested) | 0 | 2 | 20 (reCAPTCHA) | 3 of 5 | 1 of 5 | 3 of 5 | 2.0 |
| Total | 97 of 125 | 40 | 8 | 49 | 28 | 48 of 97 | 31 of 128 | 64 of 128 | |

- **48 of 97 measured cells (49%) cite her in at least one run** (49 of 97 if the earlier ChatGPT D2 captures are counted). On the four engines the plan named, that is 45 of 92 cells, or 49 per 100, against a plan target of 8 to 15 per 100. The target had no baseline behind it. It was too low for ChatGPT, Gemini and Perplexity and about right for Claude (2 of 25).
- **Cited is not recommended.** She appears as a source in 34 of 44 ChatGPT run rows but is named in the answer text in 15. Perplexity cites 14 prompts and names her in 3. When listed, her mean position is 2.0 on ChatGPT, 3.5 on Gemini and 8.67 on Perplexity (B1 at #14, C5 at #11).
- **Claude cites shilikajain.com as a source in 0 of 27 run rows.** Its two hits (A2 and E3, both #1 and both repeated) name her from third-party profile material. A2 repeats the "50+ protocols" claim, which has no independent source, in both runs. E3 names her from the DEV profile, Icebreaker and CryptoDaily.
- **SERP rank is a weak proxy for citation**, which is what the prior notes treated it as. B1 is Bing #1, yet ChatGPT and Claude never cite her there. ChatGPT cites her on 19 prompts: she is top 10 on Bing for 14 of them and on Google for 11. On 5 (A5, B4, B5, C1, D5) she is top 10 on neither.

| Bucket | Measured cells | Cited in at least one run | ChatGPT | Perplexity | Claude | Gemini | AI Mode |
|---|---|---|---|---|---|---|---|
| A Fractional positioning | 25 | 14 (56%) | 5 of 5 | 5 of 5 | 1 of 5 | 0 of 5 | 3 of 5 |
| B Web3 PR | 20 | 11 (55%) | 4 of 5 | 4 of 5 | 0 of 5 | 3 of 5 | not measured |
| C AI startup PR | 20 | 9 (45%) | 3 of 5 | 4 of 5 | 0 of 5 | 2 of 5 | not measured |
| D Cybersecurity | 17 | 3 (18%) | 2 of 5 | 1 of 2 | 0 of 5 | 0 of 5 | not measured |
| E Regional | 15 | 11 (73%) | 5 of 5 | not measured | 1 of 5 | 5 of 5 | not measured |

A2 (best fractional consultants for crypto) is the only prompt where four engines name her. D1 and D3 are absent on every AI answer engine measured (D3 is Google #9 and is cited by the Google Overview). Claude misses buckets B, C and D entirely, and Gemini misses A and D. Bucket D counts ChatGPT D2 as absent, as coded. Counting its two earlier cited captures gives ChatGPT 3 of 5 and bucket D 4 of 17.

### 3.2 What is working

**Which page families get retrieved** (live inventory against distinct URLs that appeared anywhere in this audit's AI cited lists or top-10 results):

| Family | Live inventory | Distinct URLs retrieved | Share of AI prompt-hits (174) | Share of SERP top-10 hits (96) |
|---|---|---|---|---|
| Playbooks | 122 | 42 | 72 (41%) | 52 (54%) |
| Landing pages (/pages) | 106 | 32 | 39 (22%) | 13 (14%) |
| Blog posts | 299 | 19 | 20 (11%) | 14 (15%) |
| Service pages | 8 | 8 | 17 (10%) | 8 (8%) |
| Home, about, FAQ, glossary | n/a | 4 | 22 (13%) | 7 (7%) |
| Regional desks | 6 | 6 | 3 (2%) | 2 (2%) |
| Compare pages | 11 | 1 | 1 (1%) | 0 |
| Case studies, tools, locale pages | 6, 28, 105 | 0 | 0 | 0 |

A prompt-hit is one engine and one prompt where the URL was logged as cited or listed, with runs pooled. A SERP hit is one engine and one prompt where the URL is in the top 10. No panel prompt targets tools or case studies, and the prompts are English, so those zeros are untested, not failed.

**The URLs doing the work:**

| URL | AI prompt-hits | SERP top-10 hits (Google, Bing, Brave) |
|---|---|---|
| /playbook/crypto-pr-cost-2026 | 9 (ChatGPT 4, Perplexity 3, Gemini 1, AI Mode 1) | 3 (Bing 1, Brave 2); linked by Google AI Overview on D4 |
| /playbook/fractional-vs-agency | 6 (ChatGPT 3, Perplexity 2, AI Mode 1) | 5 (Google 2, Bing 1, Brave 2) |
| /blog/fractional-pr-web3-crypto-cost-scope-hire-vs-agency | 4 (Perplexity 3, AI Mode 1) | 6 (Google 2, Bing 1, Brave 3) |
| /playbook/ai-startup-pr-2026 | 6 (ChatGPT 2, Perplexity 4) | 2 (Brave 2) |
| /playbook/best-web3-pr-agencies-2026 | 3 (Perplexity 2, Gemini 1) | 5 (Google 2, Bing 3) |
| /services/ai-startup-pr | 5 (ChatGPT 1, Perplexity 3, Gemini 1) | 2 (Google 2); linked by AI Overview on C5 |
| /glossary/what-is-fractional-pr | 4 (ChatGPT 1, Perplexity 3) | 3 (Bing 1, Brave 2) |
| /faq | 3 (Perplexity 2, AI Mode 1) | 3 (Google 2, Bing 1) |
| /playbook/cybersecurity-pr-2026 | 1 (Perplexity) | 4 (Google 2, Bing 2); linked by AI Overview on D2 and D3 |
| /pages/web3-pr-agency-india, /pages/crypto-pr-agency-for-startups | 4 each (ChatGPT only) | 1 and 0 |

**Why they win, tied to evidence:**

1. **Intent match on price, model, "versus" and how-to.** Bing has her in the top 10 for 15 of 15 fractional, cost, how-to, comparison and brand keyphrases. ChatGPT cites four cost playbooks (crypto-pr-cost-2026, fractional-pr-cost-pricing-2026, ai-pr-agency-pricing-packages-2026, token-launch-pr-campaign-cost-2026). The playbook audit found winners carry a median of 23 dollar figures against 8 to 11 elsewhere, and a median of 8 contextual inbound links against 3 to 4. This fits the research (a rising "price" share of ChatGPT fan-outs, explicit price helping in a lab test), though that evidence is moderate to weak and correlational.
2. **Rank and schema are not the gate.** Google's AI Overview cites her at organic rank 9 (D3) and links the country pages (E1, E5) where the organic #1 is a generic playbook. ChatGPT and Gemini cite her although no page serves JSON-LD in raw HTML (0 of 36 sampled page types). Google's guidance says AI features need only indexing and snippet eligibility, and Ahrefs found only about 38% of AI Overview citations come from the organic top 10. All three point the same way.
3. **Few named individuals compete.** Hits are strongest where the question asks for a solo operator or a region (A2, E1, E3, E5). That is an inference, not a measured cause. It also explains why the same engines drop her on "best agencies" prompts.
4. **Access and speed are probably not the problem.** All 715 sitemap URLs return 200 with self-canonicals. 17 user agents got identical pages. Content pages score 93 to 99 on mobile Lighthouse. Absences look like selection, but real-bot access is unverified. One caveat: curl bursts in three audits met a Vercel challenge (403) after about 45 to 120 requests, while the crawl audit's 153 requests did not. Real bot behaviour is unverified because no bot hit is logged (action 2 in section 5).

### 3.3 What is not working

| Page or pattern | Evidence | Likely reason (audit tie, inference) |
|---|---|---|
| Money pages, led by /services/web3-pr-campaigns | Primary URL for A1, A3 and B1, yet 0 top-10 hits on Google, Bing or Brave. ChatGPT cites a service page in 2 of 88 prompt-URL pairs. Perplexity is the only engine that cites them regularly (12 of 63 pairs). | Intent is served by playbooks, a blog post and landing variants. This page's schema Offer ($5,000 to $12,000) contradicts its visible $3K to $7K. Content-core scores it 6.0. |
| Winners are conversion dead ends | crypto-pr-cost-2026 has 3 internal links and 0 to services, desks or playbooks. how-to-pitch-cointelegraph has 0 service links. best-web3-pr-agencies has 0 desk links. | Internal-links audit: hub-and-spoke runs upward only, and 0 of 165 landing-to-playbook links are reciprocated. A cited reader has no route to hire. |
| "Best agencies" head terms (B1, C1, D1, D5) | Bing #1 on B1, but ChatGPT and Claude absent and Google on page 2 (rank 13). C1, D1 and D5 are absent on Google and Bing. | Engines cite third-party lists, and she is in 0 of 46 list pages opened. ChatGPT's top sources are cracklepr.com (11), coinbound.io (7), chainpeak.io (7). Claude's are mexc.com (10), marketerhire.com (9), coinbound.io (7). Backlinks audit: 164-day-old domain, no detectable referring sites. |
| Cybersecurity | 3 of 17 cells as coded (4 of 17 counting the earlier ChatGPT D2 captures). D1 absent on every platform measured, D3 absent on every AI answer engine. The only surfaces are Google's AI Overview (D2, D3, D4), ChatGPT (D4, D5) and Perplexity (D2). | No cyber client (the pillar example is "a composite"). Head terms belong to cybersecuritymarketingagencies.com, corporateink.com and analyticsinsight.net. |
| Regional desks as destinations | Bucket E is her best (11 of 15), but engines mostly retrieve generic playbooks and country /pages. ChatGPT cites /korea once. Gemini cites /dubai-mena in 1 run and /india in 2 runs (one prompt each). Google ranks /india #3 on E5, and the AI Overview links /korea. No Shilika URL is in Google's top 20 for E3, where /singapore used to surface. | Regional audit: Korea and India each split one intent across 11 URLs, desk heads do not match the buyer query, and every desk carries wrong or past facts. That audit's non-indexation theory is not supported: /japan, /dubai-mena, /singapore and /korea rank on Bing for their head keyphrase (positions 1, 2, 2 and 9), and /india is #1 on Bing and #3 on Google for E5. |
| Token launch and KOL | B3 and B4 absent on Google. Bing returns 0 of 3 KOL keyphrases and, for "token launch pr", a /pages variant (#7) rather than the service page. | The sibling variants take the slot. Token-launch copy carries stale event facts (WebX "this week", "May 2026" Token2049 Dubai). |
| Blog | 19 of 299 posts retrieved (6%). The ones that are cost, fractional or how-to themed do well. | 219 posts landed in two bursts, off-ICP topics, 24% link a service and 8% a playbook, and the blog is the slowest route (1.3 to 3.7 s TTFB, uncached). |
| /compare (11 pages) | One ChatGPT mention (A2). | Committed the day before the run, so too new to judge. Legal and accuracy exposure is in the risk register in section 5. |
| Landing-page variants compete with each other | For E2, Bing ranks /pages/crypto-pr-agency-japan #1 and /pages/japan-crypto-pr-agency #2. For "fractional cmo web3", "token launch pr" and "ai startup pr" the best-ranked page is a /pages variant, not the intended page. | Intent overlap, not text overlap (median Jaccard 0.108). This supports consolidation. |

**The programmatic audit's "no observed value" finding does not survive this panel.** That finding used the older Google proxy panel. Here, 32 of 106 landing pages are retrieved. ChatGPT cites 16 existing ones (27 of its 88 logged prompt-URL pairs, plus one logged URL that matches no route), Perplexity 7, and Bing ranks 20 in the top 10. Of the 32, 26 sit on that audit's 301-merge list and 2 on its noindex list. Many merge targets are service pages and desks, which engines rarely cite. Pruning will likely cut spam exposure and also remove visible surface. Both are true. Check GSC by URL and stage the prune.

**When asked about her by name** (BR1 to BR8, outside the 25-prompt matrix, on ChatGPT, Claude and Gemini), the engines read her site, repeat her prices and claims, and hedge. ChatGPT says the Forbes and CoinDesk placements are self-reported, and that it can confirm only six CryptoDaily bylines. Claude found no articles by or quotes from her in CoinDesk, Cointelegraph or Forbes. ChatGPT and Claude flag conflicting prices. Section 4 has the claim check.

### 3.4 Claims versus reality

| What the prior notes asserted (summary/*.md, README) | What the live panel and audits show | Verdict |
|---|---|---|
| Day-90 targets: 8 to 15 AI citations per 100 cells, Perplexity 30%+ on bucket A, ChatGPT and Gemini 15%+ on bucket E. The AI layer was "blocked / not run". | 45 of 92 cells (49 per 100). Perplexity A 5 of 5 (one run), ChatGPT E 5 of 5, Gemini E 5 of 5. Fails "one citation per bucket per engine" for Claude (B, C, D) and Gemini (A, D). | Targets beaten on three engines, missed on Claude and cyber. The plan had no baseline. |
| Google SERP presence is "a defensible leading indicator" of AI-answer eligibility (08-14). | ChatGPT cites her on 8 prompts where she is not top 10 on Google. Bing #1 on B1 and D2, yet ChatGPT absent on B1 and in the coded D2 run (D2 was cited in two earlier captures). | Weak proxy. |
| "+6 prompts, largest jump." "The playbook tree is now live." "The blocker was PUSH, not content." (09-25 analysis, Run 79. Run 83 repeated the attribution on 10-01.) | Git and Vercel deployment records show no deploy between 2026-07-21 and 2026-09-25. The 09-25 deploy came after the run and carried only an ads tag. The content credited first shipped 2026-10-01. On the 23 unchanged prompts the series is 9, 7, 6, 11, a net +2. | Attribution unsupported. The credited deploy did not precede the run, so the like-for-like +2 (9, 7, 6, 11 on 23 unchanged prompts) is unexplained: SERP drift, delayed indexing of earlier content or a Google change are all possible. |
| Regional desks are uncontested, and she is the only operator with a per-country desk (README). | Regional is her best bucket, but through generic playbooks, country /pages and her profile. Rivals are named (MarketAcross in 8 of 15 regional cells). The Singapore desk is out of Google's top 20 on E3. | Visibility yes. "Uncontested" no. Desks are not the asset. |
| Thin-content audit: KEEP 106, REVIEW 0 (08-09). | It tested exact-sentence overlap on /pages only. All 106 share one template with 9 H2 slots, were generated by 100 sub-agents, and engines retrieve 32. Near-duplicates compete on Bing. | Passed the wrong test. |
| The program stays on "the safe side" of the spam update: no fabricated facts, no page-per-query-variant, real named proofs (09-25). | 106 query-variant pages exist. Headline proof claims go beyond their sources (RARI "9-day CoinDesk exclusive" links a roundup dated 25 Jan 2024, MANTRA "CEO profile" is a podcast recap, "led PR for CoinMarketCap, Polygon" is an employer and a logo). Engines now hedge them as self-reported. | Contradicted. |
| FAQ schema parity: 258 pairs, 0 defects. Schema valid. | The script checks question text only. 33 of 95 service-page answers drift from the schema. JSON-LD is absent from raw HTML on every page. Prices contradict inside one JSON-LD block. | False assurance. |
| Runs 86 to 88 corrected APAC and Singapore facts. | The fixes are correct but sit in 34 uncommitted files. Production still shows Token2049 as upcoming, "will be drafted in 2026" and a Cybersecurity Act amendment mislabelled as an IMDA act, under "UPDATED SEP 2026". | Not live. |

### 3.5 Effort that produced no measurable result

| Effort | Scale | What the evidence shows | Call |
|---|---|---|---|
| JSON-LD and FAQ schema program | 253 partials, 250 using next/script | 0 in raw HTML on every page checked. Engines cite without it. Ahrefs saw no lift across 1,885 pages. Google says no special schema is needed and FAQ rich results were deprecated (2026-05-07). | No effect observable (no before and after data). Fix delivery for hygiene, not for rank. |
| llms.txt, llms-full.txt, markdown twins | 162,869 B file listing 15 of 122 playbooks and 0 of 106 landing pages, plus a 3.74 MB blog-only full file | No engine source list in this audit points to them. Google says it does not use llms.txt. A study of about 300,000 domains found no citation effect. A Bing top 10 holds both an HTML post (#4) and its .md twin (#7). | No effect observable (no before and after data). Stop investing. |
| Five machine-translated locales | 105 URLs | 0 appearances in any list, though the queries were English, so native-language performance is not measured. Raw HTML is lang="en" and the schema is thin. | Unproven, with a cost (see the risk register in section 5). |
| Playbook batch (about 100 generated) | 106 of 122 playbooks dated 2026-06-23 | 42 retrieved. The repeat winners across four proxy runs were only crypto-pr-cost, fractional-cmo-web3 and cybersecurity pricing. Structure is identical on winners and non-winners (answer-first lede on 121 of 122, FAQ parity 122 of 122). | Structure does not separate winners. |
| 219 blog posts in 15 days | 100 on 2026-10-01, 119 on 2026-10-15 | 19 of 299 retrieved. | Low return. Freeze volume. |
| Four Google-proxy panel runs | 25 prompts, 1 query each | Mis-attributed (above). No AI-engine data until this audit. | Replace with GSC plus a multi-run AI panel. |
| Compare pages, tools, case studies | 11, 28, 6 | 1, 0 and 0 appearances. | Too new or untested. Do not scale. |

## 4. Brand and entity accuracy, competitors and feeder sources

The 8 brand probes ran on ChatGPT, Claude and Gemini only, so Perplexity and AI Mode brand answers are **not measured**. Coverage and run design for the prompt panel are in the method section.

### 4.1 What the engines say about Shilika Jain

#### 4.1.1 Brand probe answers (BR1 to BR8)

| Engine | Answers obtained | Answers citing shilikajain.com | Stance |
|---|---|---|---|
| ChatGPT | 8 of 8 | 8 of 8 | Site-sourced and heavily hedged. "Promising specialist, shortlist and verify." Best of the three at separating client placements from personal bylines. |
| Claude | 8 of 8 | 5 of 8 (BR2, BR4, BR6 skipped her site) | Sceptical: "strong on paper, no independent reviews." Leans on Icebreaker, CryptoDaily and dev.to. Recommends her conditionally for early-stage, budget-limited buyers. |
| Gemini | 8 of 8 (BR2 needed a retry after a generic error) | 6 of 8 (BR2, BR6 did not) | Most promotional and least cited. BR6 has no sources and merges two drafts. Carries the most invented or unsupported detail. |
| Perplexity, AI Mode | not run | n/a | Not measured. |

What all three agree on: she is a Web3, AI and cybersecurity PR operator with a Myosin role, a CoinMarketCap past and APAC coverage (Korea, Japan, Singapore, Dubai). In the head-to-head (BR6) none names a winner. All three place her as the senior-led, low-cost option ($3K-$7K) against Coinbound for creator-led scale and EAK Digital for PR plus events. Claude adds a commercial caution: check whether she takes direct clients, because she is an individual. ChatGPT's BR6 answer cites her own /compare page.

**Name-collision signal, Claude only.** In 5 of Claude's 8 brand answers (BR1, BR4, BR5, BR7, BR8) the retrieved sources include director-registry and market-data pages (tofler.in, qorpiq.com, zonebourse.com, marketscreener). Claude's own notes call these "other people with similar names" (Shilki, Silky, Shilpa and Shilpi Jain). ChatGPT and Gemini show this in 0 of 8. Claude did not misattribute any of it, so the risk sits in retrieval, not in the final answers.

#### 4.1.2 Claim-check results

The claim check compared 24 answers (3 engines x 8 queries) with her live site, the repo copy, and independent sources (CryptoDaily author page, Icebreaker, LinkedIn public view, Coinbound, Entrepreneur Middle East, EAK, outlet searches). It logged 47 distinct claims. A claim counts once per engine that made it.

| Engine | Claims checked | Accurate | Inaccurate | Outdated | Unverifiable |
|---|---|---|---|---|---|
| ChatGPT | 29 | 14 (48%) | 0 | 1 (3%) | 14 (48%) |
| Claude | 34 | 17 (50%) | 1 (3%) | 4 (12%) | 12 (35%) |
| Gemini | 30 | 10 (33%) | 1 (3%) | 1 (3%) | 18 (60%) |
| Perplexity, AI Mode | not measured | | | | |
| Distinct claims | 47 | 19 (40%) | 2 (4%) | 4 (9%) | 22 (47%) |

Read these counts with care. "Unverifiable" means no independent source confirms the claim, not that it is false. Many "accurate" rows mean "matches her own live site", for example prices and service scope, which is self-published. The independently supported accurate rows are the Myosin role (press-release contact blocks, LinkedIn, Icebreaker), the CryptoDaily bylines, the absence of personal bylines in CoinDesk, Cointelegraph and Forbes, and the competitor facts checked against Coinbound and Entrepreneur Middle East.

**Claims that matter commercially**

| Theme | Engines | Verdict | Evidence and consequence |
|---|---|---|---|
| Fractional retainer $5K-$12K (cyber and specialist pages) | ChatGPT, Claude, Gemini | Outdated | The cybersecurity page changed to $3K-$7K on 2026-10-13. $5K-$12K survives in about 11 playbooks and in Offer JSON-LD. Engines captured on 2026-10-15 probably read a stale index. |
| Claude's cyber-page terms ("3 to 12 months at $5K-$12K vs agencies $15K-$45K") | Claude | Outdated | Live page shows the same window at $3K-$7K. |
| Retainer $3K-$7K, 4 to 8 hours a week, free 30-minute Calendly call | all three | Accurate to her site | Self-published. The homepage still says "Retainers run $5k-10k/month", which Gemini and Claude repeated accurately, so engines disagree because the site does. At least five base-retainer ranges are live. |
| 50+ protocols | all three | Unverifiable | Only her site says 50+. Icebreaker names about 11 clients. |
| Logo and portfolio list (Polygon, NEAR, Ripple, Stellar, OKX, Animoca and others) | all three | Unverifiable | Only 6 names overlap her Icebreaker list (Ripple, OKX, Animoca, WalletConnect, ParaSwap, Rootstock). ChatGPT correctly warned they may not be direct clients. |
| NEAR, Chainbase, Talent Protocol "led via Myosin" | Claude | Unverifiable | Appears only in her self-authored Icebreaker bio. Chainbase and Talent Protocol appear nowhere on shilikajain.com. |
| NodeOps, Tangem, zkPass, Paxos, Binary Holdings as clients | Gemini | Unverifiable, likely conflation | The CryptoDaily page lists them as subjects of her articles and interviews. |
| Case studies: Gaia and Forbes, MANTRA and a CoinDesk exclusive, RARI and CoinDesk, Bullieverse and Economic Times, Fluence outlets | ChatGPT, Claude, Gemini | Unverifiable | The events are real (MANTRA $11M on 19 Mar 2024, RARI mainnet 24 Jan 2024, Bullieverse $4M in Feb 2022). Her role and the headline outlets are site-only. No Forbes Gaia piece and no CoinDesk piece for MANTRA, RARI or Web3Auth was found. |
| Web3Auth case | ChatGPT | Accurate | The Google Cloud launch (2 Oct 2023) and Blockworks and Benzinga coverage are confirmed. Icebreaker shows she was an employee there (Apr 2023 to Jun 2024). Her About career arc omits Web3Auth and Cloudless Labs (Jul 2024 to Mar 2025). |
| Outlet list (Forbes, CoinDesk, Cointelegraph, Decrypt, The Block, Blockworks) | all three | Unverifiable | Self-published. All three said so in places. |
| "No personal byline in CoinDesk, Cointelegraph or Forbes" | ChatGPT, Claude | Accurate | Consistent with all evidence. Only CryptoDaily bylines verify (six cited, more on the author page). Gemini instead says her op-eds appear in those outlets, which her site contradicts because it says op-eds run under clients' own bylines. |
| Korea, Japan, Singapore, Dubai coverage | all three | Offering accurate, placements unverifiable | The desks exist. BloomingBit, TokenPost, CryptoTimes JP, e27 and Tech in Asia are listed as target outlets with no placement URLs. |
| CoinMarketCap 2021-2023, "built regional comms from scratch" | all three | Unverifiable | The employment is consistent across profiles. The dates and the build-out claim are site-only. |
| Six years, "since 2019" | all three | Unverifiable | Her own career arc starts in 2020. |
| 400+ journalists | ChatGPT | Unverifiable | Only /compare says 400+. Other copy says 100+. ChatGPT repeated it from /compare. |
| 150+ influencers | Claude | Outdated | Her site now says 200+. |
| Based in India (Bangalore) | ChatGPT, Gemini | Unverifiable | The site says "Based in India" with no city. LinkedIn shows Dubai. Muck Rack shows England. |
| "No Clutch reviews, no public testimonials" | Claude BR2 | **Inaccurate** | /testimonials publishes 19 LinkedIn recommendations. The "no Clutch or G2" part is right. The 19 are self-curated: 5 clients, 6 colleagues, 4 managers, 3 other, 1 teacher, 0 journalists, and 16 of 19 dated April 2025. |
| EAK founder "Erhan Korako" | Gemini BR6 | **Inaccurate** | The founder is Erhan Korhaliller. |
| Coinbound 800+ clients | Claude | Outdated | Coinbound now says 900+ clients. 800+ refers to influencers. |
| Competitor price ranges (Coinbound $10K-$50K+, EAK $15K-$30K+ from Gemini) | ChatGPT, Gemini | Unverifiable | Neither agency publishes a price list. EAK's own article gives EAK $10K-$50K+ and Coinbound $5K-$30K+. Gemini cited no source. |

**Correction to the claim-check label on Chalk Labs.** The claim check marked Gemini's "co-founder at Chalk Labs" as a probable hallucination with no trace anywhere. The entity audit found thechalklabs.com, which has a Person node "Shilika Jain" with jobTitle "Co-founder, PR & Narrative", and Chalk Labs pages also appear on pages 2 to 5 of Google for her name. The claim is therefore real but self-controlled and uncorroborated. Gemini's claim is not invented. The verdict stays "unverifiable", but shilikajain.com never mentions Chalk Labs, and Chalk Labs quotes different numbers (500+ placements, 5B+ impressions, 50+ launches, pricing "from around $3,000/mo"). Gemini's other unsupported items (a freelance-writer start, the CryptoDaily-subject conflation, op-eds in Forbes Council and CoinDesk Opinion, Business Insider and Fast Company as placements from a logo strip) stand as unsupported.

**Why the engines disagree.** The site contradicts itself on price (at least five base ranges, including $3K-$7K and $5K-$12K inside one JSON-LD block), on the Myosin title (five variants), on KOL and journalist counts, and on location. Answers are most accurate where the site is consistent (services, regions, free call) and drift where it is not (retainer, titles, counts). ChatGPT flagged conflicting price ranges in BR3. Claude flagged $3K-$7K against $5K-$10K in BR5.

### 4.2 Competitor share of voice

#### 4.2.1 How often Shilika is the answer

The per-engine counts (stable, intermittent, absent, cited in any run, named in the answer body, domain in sources, average list position) are in the scoreboard in section 3. Across 128 run rows she is named in the answer body 31 times and her domain appears in a source list 64 times. This panel was built around her positioning, so these figures overstate her share on a neutral prompt set. D1, the cybersecurity head-term prompt, is absent on all four engines that measured it, and D3 is absent on the three engines that measured it. A2 ("best fractional PR consultants") is her strongest prompt, cited by ChatGPT (#1), Perplexity (#1), Claude (#1) and AI Mode (#2), with Gemini absent. Claude cites her on A2 and E3 only. Gemini's citations sit in B, C and E (3, 2 and 5 prompts) and none in A or D.

#### 4.2.2 Who is named instead

Mentions are summed across run rows, so compare within a column, not across columns (ChatGPT has 44 run rows, Gemini 35, Claude 27, Perplexity 17, AI Mode 5). A dot means the name is outside that engine's top-12 list, so the true count may be above zero.

| Competitor | Mentions, all engines | ChatGPT | Perplexity | Claude | Gemini | AI Mode | Profile |
|---|---|---|---|---|---|---|---|
| MarketAcross | 22 | 3 | . | 8 | 10 | 1 | Crypto PR agency (Tel Aviv per Clutch). Clutch 5.0 on 9 verified reviews. |
| Outset PR | 17 | 6 | 2 | 6 | 2 | 1 | "Data-driven" crypto PR. Publishes package prices. |
| Wachsman | 12 | 6 | . | . | 4 | . | Institutional and regulatory comms, New York. |
| Luna PR | 11 | 6 | 2 | . | . | . | Crypto PR agency with an Asia push. |
| EAK Digital | 11 | 3 | . | . | 6 | . | Web3 PR and events. Two-domain listicle network. |
| Yap Global | 10 | 4 | . | . | 4 | . | Not researched. |
| Coinbound | 10 | 3 | 2 | 4 | . | . | Influencer-led crypto marketing plus PR. 926 sitemap URLs. |
| Serotonin | 10 | . | . | . | 6 | . | GTM platform for web3, AI, biotech. 11-URL site. |
| FINPR | 10 | 3 | 2 | 4 | . | . | Crypto and fintech PR (Dubai per a DesignRush profile Claude cited). |
| High Vibe PR | 10 | 3 | . | . | 5 | . | Gaming, Web3, AI boutique. "GEO x PR". |
| Highwire PR | 10 | . | 3 | 4 | . | . | US tech PR. Appears in cyber and AI lists. |
| ICODA | 9 | . | 2 | 5 | . | . | Crypto marketing and PR agency. |
| Crackle PR | 9 | 4 | 2 | . | 2 | . | B2B tech PR. AI and cyber lists. |
| Melrose PR | 8 | . | . | 3 | 3 | . | Crypto PR agency. Most frequent name across 25 crypto list pages read (about 12, plus or minus 1). |

Below the top 14 the US tech and cyber names fill the AI-startup and cybersecurity answers: Merritt Group 7, Mission North 6, Inkhouse 5, Code Red Communications 5, Corporate Ink 5, Treble 5. Cryptic (7), GuerrillaBuzz (7), Surgence Labs (7) and Lunar Strategy (5) fill the crypto answers. Paid-search term data corroborates the competitor set. About 71% of visible search-term impressions (92 terms, 242 impressions) were navigational searches for named competitors, led by Luna PR (37), Cryptic (14), Lunar Strategy (6) and Outset PR (4), with a very small sample.

**Unit note.** The competitor research used a 92-cell snapshot of the panel (MarketAcross named in 18 cells), while the final panel has 97 measured cells and the table above counts run-level mentions (MarketAcross 22). Rank order agrees. Totals do not. Use the final aggregate, and reconcile before quoting both.

#### 4.2.3 SERP view

| Engine | Shilika | Most frequent domains in the SERPs |
|---|---|---|
| Google (25 prompts) | Top 10 on 15, page 2 on 3. Keyphrase data (42) is proxy-sourced and is not measured on Google itself. | Browser prompts only: linkedin.com 13, cracklepr.com 8, geniuspr.com 8, everything-pr.com 7, luvkaizen.com 6, istanbulblockchainweek.com 6, reddit.com 5. The pooled list (coinbound.io 24, mexc.com 20, linkedin.com 15, everything-pr.com 11, designrush.com 10, cracklepr.com 9, cryptojobslist.com 9, geniuspr.com 8, chameleoncollective.com 8, icoda.io 8) appears to include proxy rows from the keyphrase stand-in, so it is shown for reference only. |
| Bing (25 prompts) | Top 10 on 16. Keyphrases: top 10 on 29 of 42, top 3 on 24. Misses cluster on "agency" head terms and KOL terms. | linkedin.com 26, coinbound.io 14, icoda.io 12, luvkaizen.com 11, everything-pr.com 10, blockchainappfactory.com 9, clutch.co 8, slicedbrand.com 7, geniuspr.com 7, analyticsinsight.net 7 |
| Brave (9 prompts only) | Top 10 on 7 of 9 | cracklepr.com 4, obapr.com 3, analyticsinsight.net 3, 5wpr.com 3 |

Her brand queries ("shilika jain", "shilika jain pr", "shilikajain.com") rank #1 on Bing. Coinbound is the most cited domain in AI answers (18) and second on Bing (14). It leads the pooled Google list (24), but that count includes proxy rows and is not carried forward as a Google finding.

#### 4.2.4 The pattern that explains who wins

1. **Named by others versus cited as a source.** The competitors that dominate "who should I hire" answers are largely named through third-party material rather than their own pages (92-cell snapshot):

   | Competitor | Named in (cells) | Own domain cited in (cells) |
   |---|---|---|
   | MarketAcross | 18 | 2 |
   | Outset PR | 10 | 1 |
   | Wachsman | 7 | 1 |
   | Serotonin | 6 | 0 |
   | Coinbound | 8 | 15 |
   | EAK Digital and EAK Wire | 8 | 5 |
   | Crackle PR | 7 | 8 |
   | High Vibe PR | 6 | 5 |
   | shilikajain.com (reference) | 19 | 37 |

   MarketAcross, Outset PR, Wachsman and Serotonin are named mainly through third-party material (inference): lists, directories, reviews and syndicated roundups (Clutch 5.0, MarketerHire, EAK Wire #3, MEXC and TechBullion roundups). On-site work is unlikely to move those names (untested). Coinbound, Crackle, High Vibe and EAK win by owning the retrievable list pages themselves.
2. **The cited lists are self-ranked and recirculate one closed set of agencies.** Coinbound, NinjaPromo, Lunar Strategy, MarketAcross, Wachsman, EAK Digital, ICODA and Melrose recur. 0 of 46 list, roundup and directory pages opened contain her name. Not one of the listed firms is a solo fractional consultant.
3. **A repeatable niche descriptor.** Wachsman is "institutional and regulatory". High Vibe is "GEO x PR". Crackle is "the cited answer in AI search". Outset is "data-driven". These are simple for a model to summarise and repeat.
4. **She wins where the category matches her model.** She is stable or near-stable on the fractional consultant and regional prompts and mostly absent where the answer is an agency list (cyber, AI-startup head terms, B1). Claude's 2 of 25 coincides with a feeder set (section 4.3) that does not contain her.
5. **Price transparency is her differentiator.** She publishes $3K-$7K while High Vibe, EAK, Wachsman and MarketAcross hide price and Outset and Coinbound sell at $10K-$50K+. That only helps once the site stops publishing four different numbers.

### 4.3 Feeder sources

#### 4.3.1 What the engines cite, classified

Of the 281 citations that land on the 40 most-cited domains across the five engines (a citation is a domain appearing in a run row's source list):

| Class | Domains (citations) | Citations | Share |
|---|---|---|---|
| Agency or vendor own site (self-published lists, pricing, service pages) | 24 domains, led by coinbound.io 18, cracklepr.com 15, chainpeak.io 12, crypticweb3.com 11, icoda.io 11, luvkaizen.com 10, apcollective.io 9, geniuspr.com 8, highvibepr.com 8 | 173 | 62% |
| News-style, contributor or sponsored media | techbullion.com 10, cryptodaily.co.uk 6, analyticsinsight.net 5, globenewswire.com 4 | 25 | 9% |
| Social and UGC | linkedin.com 8, dev.to 7, reddit.com 4, medialegacy1.dev.to 4 | 23 | 8% |
| Trade publication with disclosed agency ownership tie | everything-pr.com 12 | 12 | 4% |
| Marketplace guide | marketerhire.com 12 | 12 | 4% |
| Exchange-hosted news roundups | mexc.com 11 | 11 | 4% |
| Directories and job boards | cryptojobslist.com 6, cybersecuritymarketingagencies.com 4 | 10 | 4% |
| Official | sec.gov 4 | 4 | 1% |
| Unclassified (publisher not identified) | smartmoneymedia.org 6, melivana.com 5 | 11 | 4% |

Seven of the 24 agency domains (otrenix.com, beantownmv.com, jamcopr.com, salientpr.com, prlab.co, kolhq.com, kolweb3.com) were classified from the URL and domain without opening the page. Reddit appears here (ChatGPT 3, AI Mode 1) and in the Google SERP (5 prompts) but was not auditable directly, so Reddit is **not measured**.

#### 4.3.2 Each engine has a different feeder set

| Engine | Most-cited domains (count) |
|---|---|
| ChatGPT | cracklepr.com 11, coinbound.io 7, chainpeak.io 7, crypticweb3.com 6, apcollective.io 5, melivana.com 5, outsetpr.io 5 |
| Perplexity | coinbound.io 4, linkedin.com 4, everything-pr.com 4, apcollective.io 4, then 3 each for luvkaizen.com, salientpr.com, geniuspr.com, smartmoneymedia.org, techbullion.com |
| Claude | mexc.com 10, marketerhire.com 9, coinbound.io 7, techbullion.com 7, icoda.io 6, cryptojobslist.com 6, everything-pr.com 6, dev.to 5 |
| Gemini | highvibepr.com, chainpeak.io, jamcopr.com, luvkaizen.com at 3 each (flat, few visible sources) |
| AI Mode | chainpeak.io 2, luvkaizen.com 2, linkedin.com 2 (5 prompts only) |

Claude's set is aggregators, a marketplace and directories, and it cites her domain in 0 of 27 run rows.

#### 4.3.3 Top 15 feeder targets (by AI citations), her status and the legitimate route

Shilika is named on none of the third-party list pages read in the feeder passes (16 pages, then about 12 more). Her only presence is her own LinkedIn profile, her CryptoDaily author page and her dev.to profile.

In the table, a Google count marked "b" is recomputed from the 25 browser prompts. A count marked "p" is the pooled count, which includes proxy rows from the keyphrase stand-in and is overstated. Where both exist, the pooled figure is given in the note under the table.

| # | Domain (AI citations) | Class | Shilika status | Legitimate route | Priority and cost |
|---|---|---|---|---|---|
| 1 | coinbound.io (18; Google 24p, Bing 14) | Competitor-owned lists and pricing page | Not listed | No route. It ranks itself #1 of 10 with no submission form. Displace instead: its /crypto-pr-pricing/ page was last updated 18 Apr 2024 with mostly uncited ranges, so a dated, sourced version of her cost playbook can replace it. | Low, none |
| 2 | cracklepr.com (15; Google 8b, Brave 4) | Competitor-owned AI-PR and cyber-PR lists | Not listed | No route. It ranks itself #1 on both and its criteria describe mid-size US agencies. Out-rank on AI and cyber queries with her own dated pages. | Low, none |
| 3 | chainpeak.io (12) | Competitor-owned list, discloses it ranks itself 10th of 10 | Not listed | No route, no named contact. Its "localized regional PR activation" claim overlaps her APAC desks, so the answer is a sourced regional page of her own. | Low, none |
| 4 | everything-pr.com (12; Google 7b, Bing 10) | Trade publication, discloses common ownership with 5W AI Communications (ranked first) | Not listed | Editorial pitch to the research desk through its Contact page, offering her citation-panel data as a source or expert comment (one pass found editorial@everything-pr.com, another found no address, so verify before sending). A solo slot in its agency lists is low odds. | Medium, pitch |
| 5 | marketerhire.com (12) | Marketplace with editor-bylined guides | Not listed | Apply as a fractional marketer or PR consultant at marketerhire.com/apply. Its page says under 5% acceptance. Fees and PR scope are unverified, so read the terms first. Joining does not guarantee a blog mention. Afterwards ask editorial about consultant coverage and disclose membership. | Medium, application |
| 6 | crypticweb3.com (11) | Competitor-owned sales page and explainers | Not listed | No route. Cryptic sells placements and competes directly. Match its "what it is and how to choose" explainers. | Low, none |
| 7 | icoda.io (11; Bing 12) | Competitor-owned 12-firm shortlist, discloses it authored it | Not listed | No route. Agencies only, updated 15 Oct 2026. Out-rank with a bylined, dated, sourced version of her best-web3 page with a disclosed interest. | Low, none |
| 8 | mexc.com (11, Claude 10; Google 20p) | Exchange-hosted news roundups, likely reposts | Not listed (unverified, fetch refused twice) | No official submission route found. Identify the originating outlets in a normal browser and target those. Any paid route must be disclosed. | Low, indirect |
| 9 | luvkaizen.com (10; Google 6b, Bing 11) | Competitor-owned, anonymous, undated, four names ranked | Not listed | No route. Displace with a bylined, dated, sourced page. | Low, none |
| 10 | techbullion.com (10) | News-style host with promotional rankings (both pages read rank one agency first with its own links and no sponsored label) | Not listed | Ask via its contact form for contributor or sponsored terms (official terms not found). Offer a disclosed expert byline, not a ranking slot. Any paid item must be labelled sponsored. | Medium, paid |
| 11 | apcollective.io (9) | Competitor-owned 25-agency list, says no agency paid | Not listed | No route. Marketing and token-launch agencies, not PR consultants. | Low, none |
| 12 | geniuspr.com (8; Google 8b, Bing 7) | Competitor-owned buyer's guide | Not listed | No route. The page itself says agency-written lists rank their author first. | Low, none |
| 13 | highvibepr.com (8) | Competitor-owned list, self #1 of 11, no disclosure | Not listed | No route. Out-rank with her comparison and fractional-versus-agency pages. | Low, none |
| 14 | linkedin.com (8; Google 13b, Bing 26) | Social: Pulse articles and profiles | Listed, own profile only (cited for brand prompts in ChatGPT BR2, Claude BR3 and BR7) | Owned route. Add category words to the headline (fractional PR, Web3, AI, cyber, APAC), change the display name "Shilika ." to "Shilika Jain", publish 2 to 3 Pulse articles with a stated interest, collect named recommendations. Third-party Pulse lists (NinjaPromo #1, Sep 2026) do not name her, so do not seek a slot. | High, free |
| 15 | dev.to (7, plus 4 on medialegacy1.dev.to) | UGC | Listed, own profile (79 posts, 60 of them published 18 to 21 June, 0 comments written) | Owned route. Add it to sameAs, slow the cadence, add genuine comments. The burst reads as scaled content (enforcement risk unverified). | Medium, free |

Pooled Google counts for reference: cracklepr.com 9, everything-pr.com 11, linkedin.com 15, luvkaizen.com 6 (same as browser only).

Nine of the 15 are agency-owned self-rankings with no listing route. They hold 102 of the 162 citations on these 15 domains (63%).

#### 4.3.4 Venues where a legitimate "yes" exists (below the top 15 by volume)

| Venue | Evidence | Route |
|---|---|---|
| cryptodaily.co.uk (6) | She has an author page that brand answers cite. The 14 Feb 2026 "top five crypto PR agencies in Asia" roundup (Outset PR, Asia Crypto Agency, Blue Orange Asia, BMA, Hype3) does not name her and Bing surfaced it 4 times. | Contact the editors. Update the bio (still "Head of APAC at Myosin", no site link) and propose a disclosed "solo and fractional options" section. The site also sells press-release placement, which must be labelled if used. High, editorial. |
| cybersecuritymarketingagencies.com (4) | Neutral-looking directory with a methodology page. Not listed. | Submit at /submit-agency with a verifiable cyber client list. Read /methodology#featured first because featured placements may be paid. Solo eligibility is unconfirmed. High, submission. |
| cryptojobslist.com (6) | Claude-only feeder. Page returned 403, so unverified. | Create a talent profile in the Marketing and PR category. Cost unverified. High, submission. |
| designrush.com (Claude 4; Google 10p) | Per-agency profiles used by Claude. 403, unverified. | Create a profile and ask sponsor@designrush.com about the PR category. A free listing exists and sponsored tiers are sold (price unconfirmed). Label anything paid. Medium. |
| analyticsinsight.net (5; Bing 7) | "Best picks" cyber list is unlabelled. Its title says 15 but it shows 16 entries, and some firm names could not be verified. | Paid only: a labelled sponsored article or press release through advertise@analyticsinsight.net after getting the rate card. Do not buy a quiet slot in the unlabelled list. Medium, paid. |
| Muck Rack | Profile exists, unclaimed, 19 articles, location "England". | Claim it free, correct the location, add the site. High, free. |

**Rules for every route.** Label paid items as sponsored and keep a record. No undisclosed paid mentions, no self-ranked lists under other names, no seeded reviews. The entity fixes in section 4.4 come before any placement, because list editors and engines will otherwise find conflicting facts.

### 4.4 Entity footprint gaps (off-site audit)

**What exists.** One professional entity resolves for the name. shilikajain.com ranks first for it, and the audit found no second professional Shilika Jain. Near-name people (Shilpi, Shilki, Silky, Shilpa, Archana Jain) exist, as the Claude retrieval above shows. Live profiles that link back to the site include X @Shilika_jain (9,204 followers), the CryptoDaily author page, LinkedIn (about 14K followers, 19 recommendations), HackerNoon /u/shill (3 stories), dev.to, YouTube @shilikajain (3 subscribers, 19 videos) and Calendly. Third-party mentions that do name her include press-release contact blocks (MANTRA, Newsfile and Yahoo, 2024-06-20, fetched; RARI, Fluence, Gaia and Ostium via snippets) and a 49-minute Digital Duniya interview (2024-09, 1.4K views). Conflicts between audits: a bare "shilikajain.com" web search returned director pages for similarly named people, while Bing ranks the site #1 for three brand queries. The "Thin corroboration" row below says no independent page was found, while her own profiles do link to the site.

| Gap | Evidence |
|---|---|
| No entity record | Wikipedia 404, Wikidata 0 hits, no Knowledge Panel in SERP screenshots, Crunchbase "Page not found", Clutch 404, no LinkedIn company page. |
| No independent Tier-1 attribution | Cointelegraph, CoinDesk and Decrypt author pages 404. Forbes and The Block returned 403 (unverified). 19 claimed placement URLs fetched had 0 mentions of "Shilika" apart from her own HackerNoon byline. A search limited to four Tier-1 outlets found nothing. |
| Public name | LinkedIn title reads "Shilika . - Myosin.xyz", with no surname and no PR keyword. |
| Titles | Five variants for one role: Head of PR (About), APAC PR & Partnerships (JSON-LD), Head of PR & Partnerships (LinkedIn), Head of APAC (CryptoDaily), Global PR & Comms (HackerNoon, 2022). |
| Employers | About omits the in-house Web3Auth and Cloudless Labs roles that case studies may present as client work. Chalk Labs is never mentioned on shilikajain.com. |
| Location | Dubai (LinkedIn), India (About), England (Muck Rack). |
| Headline numbers | Three metric sets: 50+ protocols and 100K+ mentions a quarter and 200+ KOLs (site), 150+ influencers (CMC era, Icebreaker), 500+ placements and 5B+ impressions (Chalk Labs). A Binance Square bio from Jan 2023 already said 50+. No methodology or independent source for any. |
| Muck Rack | Unclaimed, wrong location, a bio handle "prev @binance" that no other surface claims. |
| Structured identity | Person sameAs has 5 URLs, two of them non-identity (Calendly, Telegram). Organization sameAs has 2, both her personal LinkedIn and X. HackerNoon, Muck Rack, YouTube and dev.to are missing. There are two Person @ids and two Organization @ids, one undefined. JSON-LD is absent from raw HTML on every page the entity audit checked (0 of 5 in the entity audit, 0 of 36 sampled page types in the crawl audit), so crawlers that do not run JavaScript see no entity data. |
| Thin corroboration | Domain registered 2026-05-04 (164 days old), no Tranco rank, no independent editorial or list page found that links to or names shilikajain.com (her own profiles do link to it). The UGC check found Reddit, Quora, Hacker News, X and YouTube in 0 of 315 result slots, but that used a non-Google search tool and cannot be compared with the SERP panel. |
| Self-ranked sibling site | thechalklabs.com publishes "Best Crypto PR Firms in 2026 (Honest Rankings)" ranking Chalk Labs first using her figures. An engine or journalist can read it as a disguised self-ranking. |

**Not measured or unverified in this section.** Perplexity and AI Mode brand answers, Reddit and Quora content, Forbes and The Block author pages, mexc.com, cryptojobslist.com and designrush.com page content, Google's own keyphrase positions, whether the Muck Rack bio handle is hers, and any link or authority metric (no Ahrefs or Search Console). Every "absent" or "not listed" above means not found with the tools used.

## 5. Action plan, risks and re-measurement

**How to read this section.** Actions are ranked by judgement: expected effect on citations and on avoiding harm, divided by effort, with extra weight for anything that unblocks measurement. Each action has a basis tag. **Measured** means observed in this audit. **Documented** means stated in a Google or OpenAI document. **Correlational** means vendor studies without causation. **Judgement** means the report's own reasoning, untested. Effort: S is under a day, M is a few days, L is weeks. No lift percentages are given. No study measures what these actions do to citation of a B2B PR consultant, and this audit has no before and after data.

The baseline is the live site at commit 30dd8aa, measured 2026-10-15 and 16, with 34 pending files not deployed. Several audit sections scored server-rendered JSON-LD and llms.txt work as high impact. The mechanics research does not support that for citations, so those items sit lower here and are framed as hygiene.

### 5.1 Top 10 actions

**1. Deploy the 34 pending files and fix every wrong time-anchored or regulatory fact.**
Owner: code, with Shilika approving facts. Effort: S to M. Basis: Measured.
Evidence: Live /singapore still treats Token2049 (7 to 8 Oct) as upcoming. Korea Blockchain Week is given as 22 to 28 September at COEX on 5 service pages and /speaker (true dates 29 Sep to 1 Oct, Walkerhill). Token2049 Dubai appears as "May 2026" and as an "attended" speaker row, but it moved to 21 to 22 April 2027. GITEX is given as October (true 7 to 11 Dec). Of 28 claims checked in the freshness audit, 13 were verified, 11 contradicted or unsupported, 4 unverified. The India desk window is time-boxed: India Blockchain Week (1 to 2 Nov), Devcon 8 (3 to 6 Nov), ETHGlobal Mumbai (5 to 7 Nov). It closes if the fix ships after about 25 Oct.
Metric: known-wrong strings on live pages go from several to 0 (grep list). A build lint bans "this week" and "weeks out". Production SHA equals HEAD. Indexing is requested for the 6 desks.

**2. Check that search and AI crawlers are not being challenged, and connect first-party data.**
Owner: Shilika. Effort: S. Basis: Measured for the 403, unverified for real crawlers.
Evidence: Non-browser requests from the audit machine received Vercel Security Checkpoint 403s (x-vercel-mitigated: challenge) after about 45 to 120 rapid requests. A controlled test of 17 user agents returned 153 of 153 HTTP 200 with identical bodies. Whether real GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Googlebot and Bingbot are challenged is unknown. Search Console is not connected, GA4 is not installed, and no AI referrer is recorded anywhere.
Metric: the Vercel Firewall view (challenge or deny, grouped by user agent) shows zero for verified bots. GSC Domain property and Bing Webmaster Tools are verified. A 90-day PostHog breakdown of $pageview by $referring_domain for chatgpt.com, perplexity.ai, gemini.google.com, claude.ai and copilot.microsoft.com is saved as the baseline.

**3. Set one price ladder, render it everywhere, and publish one dated pricing page.**
Owner: Shilika decides the numbers, then code. Effort: M. Basis: Measured, plus weak documented support.
Evidence: At least five fractional retainer ranges are live ($3K to $7K, $5K to $10K, $5K to $12K, $5K to $14K, $6K to $14K), including two inside one JSON-LD block. In the brand probe all three engines quoted at least two different retainer ranges, and all three quoted the retired $5K to $12K somewhere. The three pages that surfaced in Google in 4 of 4 historical runs are cost or fractional pages with price tables. Controlled lab testing found explicit price and recent timestamps help (weak). "Price" appears in 8.9% of ChatGPT English fan-outs (Ahrefs, observational).
Metric: one range across 100% of pages and JSON-LD. Brand-probe price answers match the chosen range in 3 of 3 engines (baseline: 0 of 3 consistent). Rank of the pricing page on "crypto pr cost" and "fractional pr cost" (Bing today: 10 and 1).

**4. Clean up claims, bio and entity facts.**
Owner: Shilika (records), code (schema). Effort: M. Basis: Measured.
Evidence: Of 47 brand-probe claim lines, 19 are accurate, 22 unverifiable, 4 outdated, 2 inaccurate. The site overstates some proof. RARI "9-day CoinDesk exclusive" links to a 25 Jan 2024 weekly roundup while The Block and Cointelegraph ran 24 Jan. MANTRA "CEO profile" is a podcast recap. "Led PR for CoinMarketCap, Polygon" overstates an employer and a logo. /testimonials carries aggregateRating 5.0 over 19 reviews on a Person, with no stars visible. /compare says Shilika is "regularly that subcontractor" with no named agency and uses 400+ journalists against 100+ elsewhere. There are five titles for one role. LinkedIn shows the name "Shilika ." and Muck Rack is unclaimed with location "England". The in-house roles at Web3Auth and Cloudless Labs are missing from the About arc.
Actions: one canonical bio sheet, restate or remove the overstated claims, remove the rating markup, label each case in-house or fractional, add a conflict line to /compare, claim Muck Rack, fix the LinkedIn display name, unify the Person @id.
Metric: re-run the 8 brand prompts on 3 engines. Outdated plus inaccurate lines go from 6 of 47 to 0. Accurate share rises from 40%.

**5. Earn disclosed inclusion on the third-party pages engines already cite.**
Owner: off-site, driven by Shilika. Effort: L, spread over 90 days. Basis: Gap Measured, effect Correlational.
Evidence: shilikajain.com is named on 0 of 46 list, roundup and directory pages opened. In the panel, Claude cites her in 2 of 25 prompts and Gemini in 10 of 25. Claude's top sources are mexc.com, marketerhire.com, coinbound.io, techbullion.com, icoda.io and cryptojobslist.com. Ahrefs (75,000 brands) correlates branded web mentions at 0.656 to 0.709 with AI visibility, against 0.266 to 0.326 for domain rating. The domain is 164 days old. Targets in order: Crypto Daily (she is already a contributor, so fix the author bio and pitch an APAC roundup section), cybersecuritymarketingagencies.com (/submit-agency, check solo eligibility), a CryptoJobsList talent profile, the MarketerHire application, a DesignRush profile, Clutch with the 19 LinkedIn recommendations converted to verified reviews, and an Everything-PR pitch built on the citation-panel data. Skip competitor self-ranked lists, which have no submission route. Any paid route must be labelled sponsored.
Metric: third-party pages naming Shilika (baseline 0 of 46 opened). Referring domains in the GSC Links report. Claude and Gemini appearance on buckets B to D (baseline: Claude 0 of 15, Gemini 5 of 15 prompts cited in any run).

**6. Log AI-crawler hits and AI referrals, and attach a source to every lead.**
Owner: code. Effort: S to M. Basis: Measured gap.
Evidence: No AI crawler visit has ever been logged. A GPTBot-UA request to /llms.txt returned x-vercel-cache HIT, so app code never sees cached pages, and the middleware matcher covers admin routes only. Nothing reads document.referrer. Leads go to Notion and email with no source. Drafts exist (middleware widening to Axiom, UA and referrer classifier, attribution.js, leads table, /api/track). They pass tsc but have not been built or run on Edge, so test on a preview first. Restore only the gsc-daily-pull cron after confirming the service account has access.
Metric: weekly hits by bot in Axiom. Sessions and leads carrying ai_source. Share of leads with a non-empty source (baseline 0).

**7. Wire the winning pages to the money pages.**
Owner: code. Effort: S. Basis: Measured, and effect on citations is Judgement.
Evidence: crypto-pr-cost-2026 has 0 service, desk or playbook links. how-to-pitch-cointelegraph-2026 has 0 service links. best-web3-pr-agencies-2026 supplied 6 of 19 Google hits and links no desk. The homepage body links 0 hubs and 0 desks. 14 playbooks link no service, and only 71 of 299 posts link a service. Edits must be additive.
Metric: at least 3 in-body service or desk links on each of the 3 winners. Click-through from those pages in PostHog. Their Google and Bing ranks hold or improve at the next checkpoint.

**8. Stop scaling now, and prune only after the data check.**
Owner: code to freeze now, then a measurement-gated prune. Effort: S to freeze, M to prune. Basis: Documented policy, Measured pattern, Judgement on extent.
Evidence: 106 /pages are cloned from one template (9 H2 slots on 106 of 106). 105 locale URLs are machine translated. 219 of 299 posts came in two bursts (100 in about 60 seconds on 2026-10-01, 119 on 10-15), and about 45 are off-ICP. Google's AI guide (updated 2026-07-10) names separate pages per query variation as scaled content abuse. The triage says keep 26, noindex 12, merge 68. Counter-evidence: 9 of the 26 non-brand Bing top-10 keyphrase rankings are /pages URLs (fractional-pr-consultant #2, fractional-head-of-pr #1, tge-pr-agency #1, crypto-pr-agency-japan #2, crypto-pr-agency-singapore #2, ai-startup-pr-agency #2, crypto-marketing-agency-india #3, fractional-cmo-web3 #6, token-launch-pr-agency #7). The "0 of 48" finding against /pages came from a Google proxy. The two datasets disagree.
Steps: now, no new variant pages, locales or bulk posts, stagger posts, and hold the off-ICP ones as noindex until edited. From about day 31, with 28 or more days of GSC and Bing data, keep any /pages URL with impressions or a top-10 Bing rank and ship the rest as one reviewed deploy. Never touch the 7 playbook winners.
Metric: "Crawled, currently not indexed" count for the two blog bursts. Impressions retained on URLs that were ranking. No ranking URL lost in the redirect map.

**9. Fix crawler-facing defects (hygiene, not a citation lever).**
Owner: code. Effort: M. Basis: Defects Measured, citation effect unproven.
Evidence: 0 raw-HTML ld+json tags on 36 sampled page types (all JSON-LD is injected by next/script). Blog HTML is no-store with MISS and 1.3 to 3.7 s TTFB on about 300 URLs. sitemap.xml takes 2.2 to 3.5 s. Translated pages ship lang="en". The apex redirect is 307. llms.txt carries a daily-changing "Last updated". Citation effect is unproven. Ahrefs' matched test of 1,885 pages found no AI citation gain from adding JSON-LD (AI Overviews -4.6%, flagged by Ahrefs as notable but unexplained and without a p-value; AI Mode +2.4% and ChatGPT +2.2%, noise). SE Ranking found no llms.txt effect across about 300,000 domains, and Google says neither is needed. Do the server-rendered JSON-LD (which also unifies @ids and removes invalid properties), cacheable blog routes and the 308. Remove the fake llms.txt date. Do not spend on markdown twins or a rebuilt llms-full.txt. The reel, Calendly and CJK font fixes help Core Web Vitals and conversion, not citation.
Metric: raw-HTML ld+json count of 1 or more on sampled pages (baseline 0 of 36). Blog cache HIT with TTFB under 0.5 s. Sitemap under 1 s.

**10. Build evidence assets and rebuild comparison pages on sourced facts.**
Owner: Shilika for data, code for pages. Effort: L. Basis: Measured pattern, and size of payoff is Judgement.
Evidence: Playbook winners are price-dense (median 23 dollar figures, against 8 on untested pages). The one page naming competing firms with prices and a disclosed conflict (best-web3-pr-agencies-2026) matched 6 panel prompts. 11 other "best X" playbooks name no firms. Cybersecurity is the weakest bucket: ChatGPT 2 of 5 as coded (3 of 5 counting the earlier D2 captures), Perplexity 1 of 2 measured, Claude 0, Gemini 0, and D1 and D3 were cited by no AI answer engine. The cyber pillar example is a composite and there is no cyber client. Actions: rebuild or redirect the 11 pages, publish a dated cost benchmark from real proposals, a placement-to-outcome ledger for the 6 named cases, and either a real cyber case or narrower cyber claims. Rewrite desk titles and H1s to match the buyer query only after the GSC index check on the 6 desks. If the data cannot be gathered honestly, do not publish a generated stand-in.
Metric: bucket D appearance rate per engine. Count of dated, sourced facts on the rebuilt pages. Third-party pages that cite the data.

### 5.2 Sequencing: 30, 60 and 90 days

| Window | Do | Gate or output |
|---|---|---|
| Days 0 to 7 (to 23 Oct) | Action 1 batch 1: deploy the 34 pending files, fix the dated facts, ship the India events block before about 25 Oct. Action 2: Firewall check, GSC, Bing Webmaster, PostHog baseline. Freeze variants, locales and bulk posts. Shilika decision session on price ladder, title and bio. | Deploy SHA logged. Bot-challenge answer known. |
| Days 8 to 30 (to 15 Nov) | Actions 3, 4 and 7 as separate logged deploys. Action 6 on a preview, then production. Start action 5 outreach (applications and pitches, not paid placements). | Day 30 checkpoint, week of 16 Nov: panel run 1 and brand probe re-run. |
| Days 31 to 60 (to 15 Dec) | Read 28 or more days of GSC and Bing. Decide and ship the prune (action 8). Action 9. First GSC Generative AI export. First labelled off-site placements and Clutch reviews. Real-date updates only for SG Fintech Festival (18 to 20 Nov), Korea Fintech Week (25 to 27 Nov), GITEX and Abu Dhabi Finance Week (7 to 11 Dec). | Day 60 checkpoint, about 15 Dec: panel run 2. |
| Days 61 to 90 (to 14 Jan 2027) | Action 10: rebuild or redirect the 11 "best X" pages, cost benchmark, case ledger, cyber decision, desk heads. Continue outreach. | Day 90 checkpoint, about 14 Jan: panel run 3 and a continue or stop decision per content program, based on GSC. |

Sequencing rules (judgement): deploy in logged batches with SHA and time, because earlier panel gains were credited to a push that had not deployed. Ship at most one major change class per week where possible. Dependencies: the pricing decision blocks action 3 and the schema fixes, GSC data blocks the prune, and Edge testing blocks action 6.

### 5.3 Risk register

This single register merges the risk tables from the working-versus-not analysis and the action plan. Where the two rated a risk differently, the higher rating is used.

| Risk | Severity | Evidence | Mitigation |
|---|---|---|---|
| Unverifiable or overstated claims repeated by engines | Critical | "50+ protocols", the RARI, MANTRA and Gaia placements, and CoinMarketCap and Polygon credit. 22 of 47 claim lines are unverifiable. Claude A2 repeats "50+ protocols" in both runs. The entity audit found no independent source and no verified Tier-1 author page naming her. A false "attended" row for Token2049 Dubai sits on /speaker. A buyer or journalist can check each in one click. | Actions 1 and 4 |
| Wrong facts under fresh stamps, live now | High | KBW given as "September 22 to 28" on 5 service pages and /speaker (true dates 29 Sep to 1 Oct, Walkerhill). /speaker lists "2026 Q2 Token2049 Dubai (attended)" for an event that moved to 21 to 22 Apr 2027. Blockworks is named as a current outlet in 246 of 258 bodies, though its news division closed 29 Oct 2025. Fresh "UPDATED" stamps sit on the wrong facts, which are checkable first-person and factual errors on pages engines quote. | Action 1 |
| Crawler access unverified | High (Critical if confirmed) | Vercel challenge 403 on non-browser requests after bursts. The controlled UA test was clean (153 of 153). Real bots are untested. | Action 2 |
| Google scaled-content and doorway exposure (/pages, blog bursts) | High | One template across 106 pages. About 100 of 122 playbooks from one generator. 219 of 299 posts in two bursts, 100 of them within about 60 seconds. Google's AI guide names pages per query variation as scaled content abuse, and its spam policy names doorway and region-targeted similar pages. The spam update of 24 Sep ran 13 days 16 hours. No GSC data shows impact. Whether Google acts site-wide is not stated. Counterweight: 9 /pages URLs rank top 10 on Bing. | Action 8 |
| Hallucination exposure | High | 2 inaccurate and 4 outdated of 47 lines. Gemini misnames EAK's founder, conflates her CryptoDaily interview subjects with clients, and states Forbes Council and CoinDesk Opinion authorship as fact. Claude says no public testimonials exist, though 19 are published. Gemini BR6 had no sources. The Chalk Labs co-founder claim is not a hallucination (thechalklabs.com lists her) but her own site never mentions it. Contradictory titles, location and prices on her own surfaces feed the errors (plausible, not proven for every error). | Actions 3 and 4, canonical facts, reconcile Chalk Labs |
| Comparative claims and self-serving markup (/compare, schema) | High (reputation and legal, not legal advice) | aggregateRating 5.0 over 19 reviews on a Person, with no visible stars. "Shilika is regularly that subcontractor" on all 10 compare pages and in FAQPage JSON-LD, with no named agency. Glassdoor-based remarks about named firms. Wachsman client list unconfirmed. Asymmetric scoring. Manual-action and defamation exposure. | Action 4 |
| Measurement gaps | High | No GSC, GA4, AI referral or crawler logs. Crons paused since 2026-09-25. One run per prompt. Ads data is 7 clicks and 0 conversions. | Actions 2 and 6, protocol below |
| Five retainer bands | Medium to high | $3K to $7K, $5K to $10K, $5K to $12K, $5K to $14K and $6K to $14K, including inside one JSON-LD block. ChatGPT BR3 and Claude BR5 already flag it to users. | Action 3 |
| Machine-translated locales | Medium | 105 URLs. They copy the English errors into five languages. ko and ja titles still say KBW Seoul and WebX Tokyo July 2026. Raw html lang is "en". Thin JS-only schema. No visible human review. No current Google document calls machine translation spam by itself, and hreflang is correct. | Freeze. Re-extract after fact fixes. Native review for ja, ko and zh first. Add a translated-from-English note. |
| Date signals and manipulated freshness | Medium | Mechanics are mostly honest: 46 date moves across 29 of 258 pages, 0 with zero content change, sitemap lastmod hand-set. Exposures: 12 thin bumps (44 or fewer words) on 2026-07-13, 218 of 220 repriced pages kept old dates, the llms.txt route appends the request date so it changes daily with no edit, and refresh runs that change little. Not date abuse, but stamps and facts disagree. | One lastReviewed field drives visible label, JSON-LD and sitemap. CI fails on a date move without a content change. |
| Visibility rests on her own profiles | Medium | Claude's hits come via her own profiles, chiefly dev.to/shilika, which holds 79 posts (60 in four days, 0 comments written). The Muck Rack profile is unclaimed. Fragile, and itself a scaled pattern. | Section 4.3 owned routes: sameAs, slower cadence, genuine comments, claim Muck Rack |
| Misattribution and confounding | Medium | Earlier gains were credited to a push that never deployed. 34 files, locales and comparison pages land within weeks. | Logged batches, SHA on every panel row |
| Concentration and prompt circularity | Medium | best-web3-pr-agencies-2026 is 6 of 19 Google hits. Service FAQ headings echo panel prompts, so panel gains are not independent proof. | Additive edits to winners. Add independent prompts (below). |
| Inauthentic or undisclosed paid mentions from the off-site plan | Medium | Google's guide says seeking inauthentic mentions is not as helpful as it seems. FTC endorsement rules require disclosure. | Disclose every connection, label sponsored items, log each placement. |

### 5.4 Re-measurement protocol

**Baseline to compare against (2026-10-15 and 16, live commit 30dd8aa)**

| Measure | Baseline |
|---|---|
| ChatGPT | Cited in 19 of 25 prompts as coded: stable 15, intermittent 4, absent 6 (20 of 25, with 5 intermittent and 5 absent, if the earlier ChatGPT D2 captures are counted). Average position 2.0 over 8 prompts. |
| Perplexity | Cited in 14 of 17 measured in a single run, stability untested. 8 prompts not measured (free search limit). Average position 8.67. |
| Gemini | Cited in 10 of 25: stable 6, intermittent 4, absent 15. Average position 3.5. |
| Claude | Cited in 2 of 25 (A2, E3, both 2 of 2), always in body text and never with a shilikajain.com source (the chips point to dev.to). 23 absent. |
| Google AI Mode | 3 of 5 measured (bucket A only). 20 not measured (CAPTCHA, not solved). |
| Google SERP, 25 prompts | 15 top 10 (11 at #1), 3 on page 2, 7 absent from the top 20. |
| Bing SERP, 25 prompts | 16 top 10 (15 at #1), 9 not found in the results read (page 2 not read). |
| Brave SERP | 7 of 9 top 10. |
| Bing keyphrases (42) | 29 top 10, 24 top 3. Head terms such as "web3 pr agency" and "crypto pr agency" absent. |
| Google keyphrases | Not measured: 42 came via a proxy, none re-run on Google itself. |
| Brand probe | Site cited in ChatGPT 8 of 8, Gemini 6 of 8, Claude 5 of 8. Claim lines: 19 accurate, 22 unverifiable, 4 outdated, 2 inaccurate. |
| Third-party pages naming her | 0 of 46 opened. |

The per-bucket citation counts by engine are in the bucket table in section 3. The competitor section's 92-cell tally and this report's 97 measured cells are reconciled in the unit note in section 4.2.

**Cadence.** Full panel at days 30, 60 and 90 (week of 16 Nov, about 15 Dec, about 14 Jan 2027), then monthly. Brand probe at the same checkpoints. Weekly: crawler hits, AI referral sessions, 4xx and 5xx by bot. Monthly: GSC Generative AI export and Bing AI performance export.

**Runs per prompt.** The audit design was one run per prompt, with a stability re-run only where Shilika was cited. Among prompts cited in run 1 and re-tested, ChatGPT repeated 15 of 19 (79%), Gemini 6 of 10 (60%) and Claude 2 of 2. So about one in five ChatGPT hits did not repeat, and most misses are single observations, which means some "absent" prompts are false negatives by an unknown amount. ChatGPT D2 shows the other direction as well: cited in two earlier captures and absent in the coded one. Changes for the next rounds:

- Run misses as well as hits.
- Use 5 runs per prompt per engine as the default. At 25 prompts that is 125 answers per engine.
- At that size a change in pooled appearance rate smaller than about 11 to 12 points cannot be told from noise. Three runs detect about 16 points and ten runs about 9 points. This is arithmetic from the audit design, and it treats runs as independent, which flatters precision.
- Report per engine, never pooled across engines.
- Replace "stable means cited in every run" with a rate: stable at 80% of runs or more, intermittent at 1% to 79%, absent at 0%. Report the old 2-run definition alongside for comparability.
- Add 5 to 8 prompts not built around her positioning (named-competitor and "marketing agency" wording from the Ads search terms), because the current panel is partly circular.

**Session method.**

- Private or temporary sessions on the owner's signed-in accounts, a fresh chat per run, verbatim prompt text from prompts.json. Google AI Mode ran in the owner's signed-in Chrome profile, not a private session, so its 3 cites (A2 to A4) may reflect personalisation and are the least comparable cells. Gemini was re-asked after transient errors on A4, B2, C2 run 2, C5 run 2, E3 run 1 and E4 run 1, and A1 to A3 ran on the Pro model while the rest ran on Flash.
- Keep the US locale parameters used in the baseline, and record IP geography (the baseline used a non-US IP). Run any Singapore or UAE series separately.
- Spread runs over several days.
- Record date, engine and model label, whether search triggered, answer text, and cited URLs split into in-body and source-list.
- Stamp every row with the live commit SHA and deploy time.
- Stop at a CAPTCHA or limit modal and resume another day. Do not solve or bypass either.

**Numbers to track.**

1. Appearance rate per engine, with N, by bucket.
2. Stable, intermittent and absent classes.
3. In-body versus source-list split.
4. Average position.
5. Cited-URL concentration (which of her pages are cited).
6. Competitor share (MarketAcross, Outset PR, Wachsman lead today).
7. Brand-probe claim accuracy and price consistency.
8. Google, Bing and Brave rank for the 25 prompts, plus Bing keyphrases. Google keyphrases come from GSC, not a proxy.
9. Third-party pages naming her, and referring domains.
10. Raw-HTML JSON-LD count, blog cache status and TTFB.
11. First-party data: GSC impressions and clicks by page template, Generative AI impressions by page, AI-referral sessions, AI crawler hits by bot, leads with ai_source.

**Adding the GSC Generative AI report.** Google's help page (opened 2026-10-16) says it is live for all sites as of 2026-08-31. Nothing needs enabling. It shows impressions only, with no clicks or position, by page, country, date and device. It can be missing when AI impressions are too few or when the site is excluded under Settings, Search generative AI (default is Include). It has no documented API or BigQuery path, so export the CSV by hand each month into data/ai-citation-panel/results/gsc-genai/YYYY-MM-DD.csv. Steps:

1. Confirm the owner has the Domain property sc-domain:shilikajain.com verified (a DNS TXT record exists) and that the service account is added as a user.
2. Check the setting.
3. Annotate Google updates before reading any trend: 21 May core, 24 Jun spam, 18 Aug spam, 24 Sep to about 8 Oct spam.
4. Join the export to the panel's winning pages. AI-feature clicks sit inside the normal Performance report under Web search.

**Adding AI-referral attribution.** Ship action 6, then read the weekly counts. Expect undercounting: Perplexity, Claude, Gemini and Copilot visits often carry no utm and may carry no referrer (judgement from the audit's findings). Add a required "How did you hear about us" field to the contact form as a cross-check (a suggestion, not in the audit drafts). Before storing referrer and PostHog IDs against leads, add a privacy page. Fix the Ads conversion setup separately: one label currently counts Calendly click, profile view and event_scheduled at USD 40, 80 and 400, and /thank-you is also counted.

**Decision rule (judgement).** Treat a change as real only if it exceeds the noise band, persists at the next checkpoint, and is matched by GSC or Bing impressions on the same pages.

### 5.5 What this audit could not measure

- **Google rankings and indexation.** No Search Console, so no impressions or index status for any URL. All 42 Google keyphrase ranks came via a proxy and none was re-run on Google itself, so they count as not measured.
- **Backlinks and authority.** No Ahrefs data and every free route failed. Competitor comparisons are ordinal tiers at low confidence.
- **Real crawler behaviour.** Tests used spoofed user agents from one IP. Real GPTBot, ClaudeBot and Googlebot treatment is unverified, no GPTBot, OAI-SearchBot, ClaudeBot or PerplexityBot hit is logged, and it is unknown whether any engine reads client-injected JSON-LD.
- **Run-to-run variance.** One run per prompt plus one re-run on hits only. Most misses are single observations, and answers vary.
- **Engine coverage.** Perplexity: 8 of 25 prompts not measured. AI Mode: 20 of 25 not measured. Brave: 16 of 25 prompts and all 42 keyphrases not measured. Google keyphrases: 42 not measured. No stop was bypassed.
- **Buyer reality.** Sessions were private or temporary (except Google AI Mode, which ran in a signed-in, non-private profile), on the owner's accounts, with US locale parameters but a non-US IP. Demand sat in SG, UK, UAE and HK according to the Ads terms, and no per-locale or per-region answers were taken.
- **Lead value.** There is no lead attribution. The Ads account shows 7 Search clicks and 0 conversions, and about 100 clicks would be needed for a read.
- **Prompt representativeness.** The 25 prompts are built around her positioning, and search demand volume is unmeasured.
- **Claims behind 403s or logins.** Forbes, Decrypt and Economic Times pages, her CoinMarketCap role, "50+ protocols", the Reddit layer, and Clutch and Crunchbase were not checkable.
- **Locale quality.** The 5 translated sets were not reviewed for translation quality or tested in AI engines, and native-language queries were not run.
- **Causation.** Nothing here shows that any action will raise citations. Whether the 24 Sep spam update touched any URL is unknown. The ranking in section 5.1 is a judgement built on measured defects and correlational studies.

## Appendix: where the raw evidence lives

All files below exist as of 2026-10-16. Nothing in `data/ai-citation-panel/results/` is committed.

| What | Location |
|---|---|
| Raw AI answers and source lists (one text file per prompt and run, plus the coder rows as JSON; earlier ChatGPT captures are in the `chatgpt-prev-*` folders) | `data/ai-citation-panel/results/raw/2026-10-15/panel/<engine>/` |
| Raw search-result rows (Google, Bing, Brave) | `data/ai-citation-panel/results/raw/2026-10-15/serp/<engine>/`. The Google keyphrase chunks (3 to 5) were overwritten by blocked re-runs and hold no results. |
| AI-engine CSVs in the panel schema (chatgpt, perplexity, claude, gemini, ai_mode), latest capture per prompt and run, with the 6 adjudication overrides applied. Captures made after midnight are dated 2026-10-15 so the rollup treats the panel as one date. | `data/ai-citation-panel/results/<engine>/2026-10-15.csv` |
| Search-result CSV for the 25 prompts (engines google_browser, bing, brave). Google WebSearch stand-in rows are left out on purpose. | `data/ai-citation-panel/results/serp-discoverability/2026-10-15.csv` |
| Bing keyphrase results (42 rows). Kept apart because the rollup script would count them as prompts. | `data/ai-citation-panel/results/keyphrases/2026-10-15-bing.csv` |
| The 20 site audit and research reports referred to in this report | `data/ai-citation-panel/results/raw/2026-10-15/audit/` |
| Prompt wording for the 25 prompts | `data/ai-citation-panel/prompts.json` |
| Earlier panel reports and rollups | `data/ai-citation-panel/summary/` (this file sits beside them) |
| Earlier google_serp tracker rows used for the 2026-09-25 comparison | `data/ai-citation-panel/results/serp-discoverability/` (not part of this run's data) |
| Planned GSC Generative AI exports (action in section 5.4) | `data/ai-citation-panel/results/gsc-genai/YYYY-MM-DD.csv` |

