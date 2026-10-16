# Audit: historical SERP discoverability panel (2026-08-04 to 2026-09-25)

Audit date: 2026-10-16 (data last updated 2026-09-25, 21 days ago). Repo untouched: `git status --short` still shows the same 34 entries as at session start (32 modified, 2 untracked run notes). All scratch output is under `/private/tmp/claude-504/-Users-thunderbolt-Documents-projects-Shilika/c0dc2b3b-3b31-46db-9535-df2409eb89af/scratchpad/audit/work/`.

Scope: `data/ai-citation-panel/README.md`, `prompts.json`, `results/serp-discoverability/{2026-08-04,2026-08-14,2026-08-31,2026-09-25}.csv`, all 14 files in `summary/`, plus read-only git history (`git log`, `git reflog show origin/main`). Ahrefs and GSC were not touched (not available).

---

## 0. Bottom line

1. **What the panel is.** A Google-SERP proxy: 25 prompts x 1 query x 1 "engine" (`google_serp`) per run, 4 runs. The AI-answer layer the README is built around (ChatGPT, Perplexity, Claude, Gemini x 3 runs, 100 to 300 cells per run) has never been run. Zero direct evidence about AI citations exists in this panel. The only AI-answer-level observation in 100 rows is one note on 08-31 (E3: "Shilika Jain also named as individual APAC specialist in AI-summary body"), not repeated on 09-25.
2. **What the data shows.** Surfaced prompts: 9, 7, 7, 13 of 25 (36%, 28%, 28%, 52%). On the 23 prompts whose text never changed it is 9, 7, 6, 11 (39%, 30%, 26%, 48%): net +2 vs baseline, not the +4 (headline) or +6 (rollup "baseline delta") that the summaries quote. 6 prompts are stable wins (4 of 4), 6 appeared late and are unproven, 1 flaps, 2 were lost, 10 have never surfaced.
3. **The causal story in the notes is contradicted by git and by Vercel's own deployment records.** The notes attribute the 09-25 jump to "the tree" being pushed. `git reflog show origin/main` (real push timestamps) shows **zero pushes between 2026-07-21 12:48 and 2026-09-25 19:09**, and the GitHub Deployments API shows **no production deployment between 2026-07-21T07:19:50Z (`cbbeb73`) and 2026-09-25T13:52:00Z (`6344f75`)**, a 66-day gap. Every one of the four runs saw the same live commit (`cbbeb73`). The content the notes credit (best-web3 comparison matrix + FAQ, op-ed who-blocks, regional desk ledes) was first pushed on **2026-10-01 13:09** (`89b25f5`), after the last panel. So all movement 08-04 to 09-25 happened with no on-site change: it is a measured noise-plus-Google-side floor, not a push effect.
4. **Nothing has been measured since the big 10-01 push** (180 files, +6136/-371) or the 10-13 i18n rollout, so whether any of that work moved anything is unknown.

Health score for this area: **4 / 10** (infrastructure and arithmetic are sound and the trend is positive, but the proxy is thin, attribution is wrong, and the AI layer is unmeasured).

---

## 1. Method and reproducibility

Commands run (all read-only):

```
cat README.md prompts.json results/serp-discoverability/*.csv summary/*.md
git log --format='%h %ad %s' --date=short            # 102 commits
git reflog show origin/main --date=iso-strict         # actual push times
git diff / git show / git ls-tree between cbbeb73, 76bf634, 89b25f5, HEAD
node scripts/ai-citation-rollup.mjs > scratchpad/audit/work/rollup-rerun.md   # stdout only, no --write
python3 scratchpad/audit/work/analyze.py   # main analysis, output in analysis-output.txt
python3 scratchpad/audit/work/extras.py    # positions, concentration
python3 scratchpad/audit/work/livecheck.py # 31 live URLs: status, canonical, robots
```

Integrity checks that passed:

- All four CSVs parse with exactly 8 columns x 26 lines (header + 25). Row order and bucket labels match `prompts.json`. `shilika_surfaced == true` iff `shilika_urls` is non-empty on all 100 rows (asserted in code).
- Re-running the repo's own rollup script reproduces `summary/2026-09-25-rollup.md` byte for byte except the footer date (`RERUN MATCHES`). The surfaced counts, bucket counts, winning-page counts and competitor share-of-voice figures in all four rollups reproduce exactly from the CSVs. **No rollup arithmetic is wrong.** The problems are labelling, comparability and attribution (section 9).
- CSV mtimes match their run dates (08-04 10:49, 08-14 03:14, 08-31 08:07, 09-25 13:42 IST). Caveat: the panel files were only first committed on 2026-10-01 (`89b25f5`), so git cannot prove nothing was edited after the fact.

Deployment provenance was checked two independent ways: `git reflog show origin/main` (push times) and the GitHub Deployments API for `thunderbolt06/Shilika` (`gh api repos/thunderbolt06/Shilika/deployments`, read-only GET; the records are created by `vercel[bot]` and each has a `success` status). They agree (section 7.1).

Limits I could not remove: blog posts are served from a database (`getPostBySlug`), so blog publishes and cron-written content are invisible to git and to the deployment records; I cannot verify the Google update dates quoted in the notes.

---

## 2. Headline and like-for-like rates

| metric | 08-04 | 08-14 | 08-31 | 09-25 |
|---|---|---|---|---|
| surfaced prompts /25 (headline) | 9 (36%) | 7 (28%) | 7 (28%) | 13 (52%) |
| like-for-like, 23 prompts with unchanged text (excl C3, E2) | 9/23 (39%) | 7/23 (30%) | 6/23 (26%) | 11/23 (48%) |
| rollup "per engine" figure (cumulative rows, not the latest run) | 9/25 (36.0%) | 16/50 (32.0%) | 23/75 (30.7%) | 36/100 (36.0%) |
| change vs previous run | n/a | -2 | 0 | +6 |
| change vs 08-04 baseline, headline | n/a | -2 | -2 | +4 |
| change vs 08-04 baseline, like-for-like | n/a | -2 | -3 | +2 |

Why the like-for-like row matters: `prompts.json` v1.1 ("revised 2026-08-16") rewrote C3 and E2, so the 08-04 and 08-14 runs used different text for those two prompts than 08-31 and 09-25. E2 flipped to true on 08-31 and C3 on 09-25, both after their rewrite. The 09-25 analysis header says "Same panel and prompts.json (v1.1) as 08-04 / 08-14 / 08-31", which is false for the first two dates. The CSVs record no prompt text, so the wording actually used on each date cannot be verified. README text for C2, C3, E2 also differs from `prompts.json` (C2 wording differs with no revision note).

Prompt-level state flips between consecutive runs: 08-04 to 08-14 lost C4, E4 (gained none); 08-14 to 08-31 gained E2, lost C2; 08-31 to 09-25 gained A5, B1, B2, C2, C3, E1 (lost none). Total **10 flips of 75** possible (13%) with no on-site change in the whole window.

### Bucket rates (unique prompts surfaced / 5)

| bucket | 08-04 | 08-14 | 08-31 | 09-25 | like-for-like (excl C3, E2) |
|---|---|---|---|---|---|
| A fractional_pr_positioning | 3 (60%) | 3 (60%) | 3 (60%) | 4 (80%) | 3/3/3/4 of 5 |
| B web3_pr | 1 (20%) | 1 (20%) | 1 (20%) | 3 (60%) | 1/1/1/3 of 5 |
| C ai_startup_pr | 2 (40%) | 1 (20%) | 0 (0%) | 2 (40%) | 2/1/0/1 of 4 |
| D cybersecurity_pr | 1 (20%) | 1 (20%) | 1 (20%) | 1 (20%) | 1/1/1/1 of 5 |
| E regional_pr | 2 (40%) | 1 (20%) | 2 (40%) | 3 (60%) | 2/1/1/2 of 4 |

Cybersecurity has been exactly 1 of 5 on every run (always the same page). Web3 jumped only on the last run. On a like-for-like basis the AI bucket is 1 of 4 on 09-25 against 2 of 4 at baseline, i.e. below baseline.

---

## 3. Full per-prompt table

Pattern key: `S` surfaced, `.` not surfaced, order 08-04, 08-14, 08-31, 09-25. Prompt text is `prompts.json` v1.1 (C3 and E2 ran with different text on 08-04 and 08-14: README text was "How does a founder of an AI startup get an Op-Ed published in 2026?" and "What does crypto PR look like in Japan in 2026 with the FIEA reclassification and the spot ETF NISA channel?"). URL aliases: pb = /playbook/, svc = /services/, blog:ai-startup-pr = /blog/ai-startup-pr-techcrunch-the-information-forbes-2026, pb:cyber-pricing = cybersecurity-pr-agency-pricing-2026, pb:pitch-cointelegraph = how-to-pitch-cointelegraph-2026, pb:fractional-cmo = fractional-cmo-web3-2026, pb:best-web3 = best-web3-pr-agencies-2026.

| ID | Bucket | Prompt (prompts.json v1.1) | 08-04 | 08-14 | 08-31 | 09-25 | Pattern | Class | Shilika URLs surfaced (per run) | Top competitor domains (4-run count) | SERP character (from notes) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| A1 | fractional | What is fractional PR for Web3 founders and how does it differ from a traditional PR agency? | Y | Y | Y | Y | `SSSS` | stable win | 08-04: pb:fractional-cmo / 08-14: pb:fractional-cmo / 08-31: pb:fractional-cmo / 09-25: pb:fractional-cmo,pb:best-web3 | cycle.agency (4), tokenminds.co (3), icoda.io (2) | fractional-CMO vendor pages + agency listicles hold head; Shilika wins via fractional playbook |
| A2 | fractional | Who are the best fractional PR consultants for crypto startups in 2026? | - | - | - | - | `....` | never | none in any run | marketerhire.com (4), badenbower.com (4), istanbulblockchainweek.com (4) | "best fractional/crypto PR" listicles (marketerhire, badenbower, gtm8020, 9figuremedia) |
| A3 | fractional | How much does fractional PR cost for a Web3 startup in 2026 versus a full-service agency? | Y | Y | Y | Y | `SSSS` | stable win | 08-04: pb:fractional-cmo,pb:crypto-pr-cost,pb:cyber-pricing / 08-14: pb:fractional-cmo,pb:crypto-pr-cost / 08-31: pb:fractional-cmo,pb:crypto-pr-cost,svc:ai-startup-pr / 09-25: pb:fractional-cmo,pb:crypto-pr-cost,pb:best-web3 | gtm8020.com (4), marketerhire.com (3), eakwire.com (3) | pricing-intent stronghold; 2 to 3 Shilika URLs per run |
| A4 | fractional | Should an AI startup hire a fractional PR consultant or a PR agency? | Y | Y | Y | Y | `SSSS` | stable win | svc:ai-startup-pr on all 4 runs | verifiedcomms.com (4), cracklepr.com (4), mitchell-communications.com (3) | service page holds ~4 to 7 for fractional-vs-agency AI intent |
| A5 | fractional | What is the best PR setup for a recently funded Web3 or AI startup with no media presence? | - | - | - | Y | `...S` | emerged (1 run) | 09-25: pb:best-web3 | highvibepr.com (3), the-square.co (3), finpr.agency (2) | agency guides; first win 09-25 via best-web3 only |
| B1 | web3 | Who are the best Web3 PR agencies and consultants in 2026? | - | - | - | Y | `...S` | emerged (1 run) | 09-25: pb:best-web3 | lunarstrategy.com (4), istanbulblockchainweek.com (4), eakdigital.com (4) | listicle farms (lunar, icoda, eak, high vibe, luvkaizen); first win 09-25 via best-web3 ~6 |
| B2 | web3 | How do you get featured in CoinDesk, Cointelegraph and Decrypt in 2026? | - | - | - | Y | `...S` | emerged (1 run) | 09-25: pb:pitch-cointelegraph | coinledger.io (4), ninjapromo.io (4), 9figuremedia.com (3) | "best crypto news sites" + crypto-tax tool pages; win via pitch-cointelegraph, not the declared get-featured-coindesk |
| B3 | web3 | What is the typical PR strategy for a token launch (TGE) in 2026? | - | - | - | - | `....` | never | none in any run | cryptodaily.co.uk (4), lunarstrategy.com (4), blockchainappfactory.com (4) | agency guides + Medium; token-launch-pr never surfaces |
| B4 | web3 | Which crypto PR firms specialize in pre-token-generation-event launches? | - | - | - | - | `....` | never | none in any run | cryptodaily.co.uk (4), eakdigital.com (4), luvkaizen.com (4) | agency listicles + LinkedIn; token-launch-pr and /work/mantra-chain never surface |
| B5 | web3 | How do you run a KOL marketing campaign for a Web3 protocol in 2026? | Y | Y | Y | Y | `SSSS` | stable win | svc:kol-marketing on all 4 runs | blockchainappfactory.com (4), lever.io (4), disence.com (4) | KOL service page stable ~4 to 6 |
| C1 | ai | Who are the best PR firms for AI startups in 2026? | - | - | - | - | `....` | never | none in any run | shadow.inc (4), boltpr.com (4), highvibepr.com (4) | listicles (High Vibe, Level Up, Bolt, DesignRush) |
| C2 | ai | How does AI startup PR differ from crypto PR, and what makes the playbooks different? | Y | Y | - | Y | `SS.S` | flapping | 08-04: pb:enterprise-ai,blog:ai-startup-pr / 08-14: blog:ai-startup-pr / 09-25: blog:ai-startup-pr,svc:ai-startup-pr | obapr.com (3), cbinsights.com (3), openpr.com (2) | mixed: enterprise-ai (08-04), blog (3 of 4), service (09-25); declared primary crypto-pr-vs-ai-pr never |
| C3 | ai | Who can ghostwrite and place op-eds for an AI startup founder in 2026? **[text changed 08-16]** | - | - | - | Y | `...S` | emerged (1 run) | 09-25: svc:content-writing,svc:ai-startup-pr | fi.co (2), techbullion.com (2), startupcookie.com (2) | old text: news/education SERP; new text: ghostwriting-service listicles; 09-25 win on content-writing ~4 |
| C4 | ai | What is the right PR strategy for a Series A AI infrastructure company in 2026? | Y | - | - | - | `S...` | lost | 08-04: pb:enterprise-ai | obapr.com (4), businessplusai.com (3), madridmetropolitan.com (2) | one win (08-04, enterprise-ai ~5); later infra directories, PR stats, comms recruiters |
| C5 | ai | Who runs PR for AI agent startups and AI infrastructure companies in 2026? | - | - | - | - | `....` | never | none in any run | wellows.com (3), tgvp.vc (3), highvibepr.com (3) | AI landscape/funding research SERP, not PR firms |
| D1 | cyber | Who are the best PR firms for cybersecurity startups in 2026? | - | - | - | - | `....` | never | none in any run | analyticsinsight.net (4), securitysenses.com (4), corporateink.com (4) | cyber PR listicles (Analytics Insight, OTReniX, Corporate Ink, SecuritySenses) |
| D2 | cyber | How does cybersecurity PR work with analyst relations in 2026? | - | - | - | - | `....` | never | none in any run | opencart.com (4), analyticsinsight.net (4), securitysenses.com (4) | analyst-relations guides; identical ordered 6-domain competitor list on 08-04, 08-14 and 08-31 |
| D3 | cyber | How does a cybersecurity vendor get cited by AI search engines in 2026? | - | - | - | - | `....` | never | none in any run | gracker.ai (4), 5wpr.com (4), everything-pr.com (4) | AI-visibility benchmark reports (GrackerAI, 5W, Everything-PR) |
| D4 | cyber | What does cybersecurity PR cost for a Series B vendor in 2026? | Y | Y | Y | Y | `SSSS` | stable win | pb:cyber-pricing on all 4 runs | f4.fund (3), otrenix.com (3), analyticsinsight.net (2) | pricing playbook ~5, 5, 6, 3; the 09-25 SERP flipped to generic cybersecurity-cost pages (0 domain overlap with 08-31) |
| D5 | cyber | Who is the best PR consultant for a cybersecurity startup looking to break into the US market? | - | - | - | - | `....` | never | none in any run | beantownmv.com (4), corporateink.com (4), prlab.co (3) | US-market cyber PR (PRLab, Corporate Ink, Inkhouse per notes) |
| E1 | regional | Who is the best PR consultant for a Web3 startup launching in Korea in 2026? | - | - | - | Y | `...S` | emerged (1 run) | 09-25: pb:best-web3 | istanbulblockchainweek.com (4), eakdigital.com (4), highvibepr.com (4) | Korea: global listicles + KR specialist (Paradigm PR per notes); /korea never; 09-25 win via best-web3 ~5 |
| E2 | regional | Who runs crypto PR in Japan in 2026 and what does it cost to hire them? **[text changed 08-16]** | - | - | Y | Y | `..SS` | emerged (2 runs, after rewrite) | 08-31: pb:crypto-pr-cost / 09-25: pb:crypto-pr-cost | techtimes.com (2), blockhead.co (2), crypto-economy.com (2) | old text: Japan FIEA/ETF news SERP; new text: crypto-pr-cost ~5 then ~3; /japan never |
| E3 | regional | Who runs APAC crypto PR for Web3 and AI founders in 2026? | Y | Y | Y | Y | `SSSS` | stable win | /singapore on all 4 runs (+ pb:best-web3 on 09-25) | eakdigital.com (4), pony.studio (2), coingape.com (2) | /singapore desk, ~8, 7, 4, 3 |
| E4 | regional | What does Dubai and MENA Web3 PR cost and which firms run it? | Y | - | - | - | `S...` | lost | 08-04: pb:dubai-mena | clutch.co (3), bitget.com (3), cryptodaily.co.uk (3) | dubai-mena playbook 08-04 only; /dubai-mena desk never |
| E5 | regional | Who runs Web3 and AI PR for Indian founders in 2026? | - | - | - | - | `....` | never | none in any run | raisesummit.com (3), 5wpr.com (2), goodfirms.co (2) | startup directories + IN agencies (BlockBuzz, Advent, Madchatter, Adfactors per notes); /india never |

Class counts: stable win 6 (A1, A3, A4, B5, D4, E3); emerged late 6 (A5, B1, B2, C3, E1, E2; five of them seen once); flapping 1 (C2); lost 2 (C4, E4); never 10 (A2, B3, B4, C1, C5, D1, D2, D3, D5, E5). 15 of 25 prompts have surfaced at least once.

---

## 4. Page-level win counts over time (URL -> prompts it surfaced on)

| URL | 08-04 | 08-14 | 08-31 | 09-25 | total hits | runs present |
|---|---|---|---|---|---|---|
| /playbook/fractional-cmo-web3-2026 | 2 [A1,A3] | 2 [A1,A3] | 2 [A1,A3] | 2 [A1,A3] | 8 | 4 |
| /services/ai-startup-pr | 1 [A4] | 1 [A4] | 2 [A3,A4] | 3 [A4,C2,C3] | 7 | 4 |
| /playbook/best-web3-pr-agencies-2026 | 0 | 0 | 0 | 6 [A1,A3,A5,B1,E1,E3] | 6 | 1 |
| /playbook/crypto-pr-cost-2026 | 1 [A3] | 1 [A3] | 2 [A3,E2] | 2 [A3,E2] | 6 | 4 |
| /playbook/cybersecurity-pr-agency-pricing-2026 | 2 [A3,D4] | 1 [D4] | 1 [D4] | 1 [D4] | 5 | 4 |
| /services/kol-marketing | 1 [B5] | 1 [B5] | 1 [B5] | 1 [B5] | 4 | 4 |
| /singapore | 1 [E3] | 1 [E3] | 1 [E3] | 1 [E3] | 4 | 4 |
| /blog/ai-startup-pr-techcrunch-the-information-forbes-2026 | 1 [C2] | 1 [C2] | 0 | 1 [C2] | 3 | 3 |
| /playbook/enterprise-ai-pr-2026 | 2 [C2,C4] | 0 | 0 | 0 | 2 | 1 |
| /playbook/crypto-pr-dubai-mena-2026 | 1 [E4] | 0 | 0 | 0 | 1 | 1 |
| /playbook/how-to-pitch-cointelegraph-2026 | 0 | 0 | 0 | 1 [B2] | 1 | 1 |
| /services/content-writing | 0 | 0 | 0 | 1 [C3] | 1 | 1 |

Distinct URLs per run: 9, 7, 6, 10 (12 ever). (prompt, URL) pairs per run: 12, 8, 9, 19.

Observations:

- **12 distinct URLs have ever surfaced, out of roughly 248 live content routes** (122 playbooks, 106 /pages landing pages, 6 case studies, 8 services, 6 regional desks, counted at `cbbeb73`). **0 of 106 /pages landing pages, 0 of 6 case studies, and no tools, glossary or compare URLs surfaced in any run**, including /pages/ai-startup-pr-agency and /pages/ai-pr-consultant which look semantically aimed at C1/A2-type queries and were pushed 2026-06-24. (Caveat: 25 prompts can only test a sliver of 248 URLs.)
- **Concentration risk on 09-25:** best-web3-pr-agencies-2026 supplies 6 of the 19 (prompt, URL) hits and is the **only** surfaced URL for A5, B1 and E1. It has a single observation.
- **Declared primary URLs rarely surface.** Of the surfaced prompts only A4 and B5 (and C3 on 09-25) surfaced a URL listed in that prompt's `primary_urls`: 2 of 9, 2 of 7, 2 of 7, 3 of 13. Wins come from informational playbooks (fractional-cmo, crypto-pr-cost, best-web3) that no prompt lists as primary; the commercial service pages and regional desks that do convert mostly do not surface (token-launch-pr, cybersecurity-pr, apac-pr, web3-pr-campaigns, founder-profiling, /korea, /japan, /india, /dubai-mena, /apac, /work/*: all 0 of 4).
- **Declared primaries that never surfaced in any run:** /playbook/crypto-pr-vs-ai-pr, /playbook/get-featured-coindesk-2026, /playbook/cybersecurity-pr-2026, /playbook/ai-startup-pr-2026, /services/token-launch-pr, /services/cybersecurity-pr, /services/web3-pr-campaigns, /services/founder-profiling, /services/apac-pr, /korea, /japan, /india, /dubai-mena, /apac, /work/mantra-chain, /work/gaia-ai. A live check on 2026-10-16 shows all of them return HTTP 200, self-referencing canonical, `index, follow`, no `X-Robots-Tag` (31 URLs checked), so this is ranking, not an obvious indexability block.

### Approximate positions quoted in the notes (self-reported "~N", each verified present in the note text)

| prompt | URL | 08-04 | 08-14 | 08-31 | 09-25 |
|---|---|---|---|---|---|
| A1 | pb:fractional-cmo | ~9 | ~7 | ~6 | ~3 |
| A1 | pb:best-web3 | - | - | - | ~7 |
| A4 | svc:ai-startup-pr | ~5 | ~4 | ~7 | ~6 |
| A5, B1 | pb:best-web3 | - | - | - | ~6 |
| B2 | pb:pitch-cointelegraph | - | - | - | ~6 |
| B5 | svc:kol-marketing | ~5 | ~6 | ~4 | ~5 |
| C2 | blog:ai-startup-pr | yes (no pos) | ~9 | - | ~2 |
| C2 | svc:ai-startup-pr | - | - | - | ~4 |
| C3 | svc:content-writing / svc:ai-startup-pr | - | - | - | ~4 / ~2 |
| C4 | pb:enterprise-ai | ~5 | - | - | - |
| D4 | pb:cyber-pricing | ~5 | ~5 | ~6 | ~3 |
| E1 | pb:best-web3 | - | - | - | ~5 |
| E2 | pb:crypto-pr-cost | - | - | ~5 | ~3 |
| E3 | /singapore | ~8 | ~7 | ~4 | ~3 |

Mean approximate position of the five single-position stable wins (A1, A4, B5, D4, E3): **6.4, 5.8, 5.4, 4.0**. Positions improved steadily on pages with no on-site change (A1 9 to 3, E3 8 to 3, D4 5 to 3), while A4 and B5 were flat. Rows that surfaced with no position logged (cannot be rank-tracked): 08-04 A3, C2, E4; 08-14 A3; 08-31 A3; 09-25 A3. Positions are integers typed by an operator from a single query, so treat differences of 1 to 2 as noise.

---

## 5. Competitor domain share over time

Counts are distinct prompts (of 25) on which a domain appeared in `top_competitor_domains`.

| domain | 08-04 | 08-14 | 08-31 | 09-25 | total |
|---|---|---|---|---|---|
| highvibepr.com | 8 | 8 | 3 | 6 | 25 |
| luvkaizen.com | 5 | 4 | 5 | 5 | 19 |
| eakdigital.com | 4 | 6 | 4 | 4 | 18 |
| cryptodaily.co.uk | 2 | 3 | 4 | 6 | 15 |
| obapr.com | 3 | 4 | 4 | 4 | 15 |
| otrenix.com | 4 | 4 | 4 | 3 | 15 |
| cracklepr.com | 4 | 4 | 2 | 4 | 14 |
| eakwire.com | 4 | 3 | 4 | 3 | 14 |
| istanbulblockchainweek.com | 3 | 3 | 4 | 3 | 13 |
| analyticsinsight.net | 3 | 2 | 4 | 3 | 12 |
| everything-pr.com | 2 | 2 | 4 | 3 | 11 |
| beantownmv.com | 2 | 4 | 3 | 2 | 11 |
| businessplusai.com | 1 | 2 | 1 | 5 | 9 |
| aikenhouse.com | 0 | 0 | 2 | 5 | 7 |
| crypticweb3.com | 0 | 2 | 2 | 3 | 7 |

- The field is fragmented: **184 distinct domains** over 4 runs; the top 10 domains hold only 29.7%, 31.2%, 28.0%, 27.6% of competitor slots. No single competitor dominates. High Vibe PR is the largest (appeared on 10 distinct prompts across runs: 3 in C, 3 in E, 2 in B, 2 in A) but its count swings 8, 8, 3, 6, so one run's "#1 competitor" ranking is not stable either.
- Rising entrants on the last run: cryptodaily.co.uk (2 to 6), aikenhouse.com (0 to 5), businessplusai.com (1 to 5), crypticweb3.com (0 to 3).
- Heuristic category split (my own domain-name list, unverified): roughly 40%, 43%, 46%, 44% of logged competitor slots are news, exchange, directory, tax-tool or other non-PR-agency domains (55/138, 60/138, 66/143, 72/163). Many "competitors" are media or listicle sites that Shilika must be included in, not rival firms.
- **The structured competitor column undercounts the specialists.** The free-text notes name 12 firms that appear in no `top_competitor_domains` list: Paradigm PR (3 rows), BlockBuzz PR (2), Ironclad (3), Inkhouse (2), Weber Shandwick (2), Mission North, Edelman, CoinsPR, Crowdcreate, Kooc Media, Wachsman, Serotonin (1 each). These are the Korea, India, Dubai and US-cyber specialists that beat the desks, so competitor "share of voice" from the CSV columns understates regional and cyber specialist competition.
- Per-bucket leaders over 4 runs: A marketerhire.com and gtm8020.com (9 each); B luvkaizen.com (16); C highvibepr.com (9); D otrenix.com (14) and analyticsinsight.net (12); E eakdigital.com (8) and highvibepr.com (7).
- **The tracking list is stale.** `prompts.json` names 39 competitor brands to track; by domain-name match only 6 ever appear in the logged domains (EAK Digital 18 + eakwire.com 14, Lunar Strategy 8, Coinbound 4, MarketAcross 2, Outset PR 1, Adfactors PR 1). High Vibe PR (25 hits), luvkaizen (19), OBA PR, OTReniX, Crackle PR, Beantown, Corporate Ink, Everything-PR and the local specialists the notes keep naming (Paradigm PR for Korea, BlockBuzz PR, Advent PR, Madchatter) are not in `prompts.json` at all (grep count 0 for paradigm, blockbuzz, high vibe).
- **SERP churn is real, which supports run independence:** mean Jaccard overlap of the competitor-domain set per prompt between consecutive runs is 0.55 (10 days apart), 0.51 (17 days), 0.39 (25 days). Overlap falls as the gap grows. Exceptions to check: identical ordered competitor lists on A2, B1, D2 between 08-04 and 08-14, and D2 identical on 08-04, 08-14 and 08-31 (27 days). Possible but worth confirming it was not carried forward (unverified).
- D4 and C5 had **0.00 overlap** between 08-31 and 09-25, i.e. the whole SERP changed. D4's 6 to 3 "gain" happened in a SERP the note itself describes as "generic cybersecurity-cost pages, not PR firms".
- Logging depth rose on the last run: 138, 138, 143, 163 competitor slots (5.5, 5.5, 5.7, 6.5 per prompt; 09-25 min 5). All logged Shilika positions stay at or below ~9, so depth alone does not explain the gain, but "top ~8-10" is not a fixed cut-off.

---

## 6. Stability of each win

| prompt | URL | pattern | verdict |
|---|---|---|---|
| A1 | pb:fractional-cmo | `SSSS` | stable |
| A3 | pb:fractional-cmo | `SSSS` | stable |
| A3 | pb:crypto-pr-cost | `SSSS` | stable |
| A4 | svc:ai-startup-pr | `SSSS` | stable |
| B5 | svc:kol-marketing | `SSSS` | stable |
| D4 | pb:cyber-pricing | `SSSS` | stable |
| E3 | /singapore | `SSSS` | stable |
| C2 | blog:ai-startup-pr | `SS.S` | flapping (returns) |
| E2 | pb:crypto-pr-cost | `..SS` | emerged, 2 runs |
| A3 | pb:cyber-pricing; svc:ai-startup-pr | `S...`; `..S.` | one-off |
| C2, C4 | pb:enterprise-ai | `S...` | one-off, never returned |
| E4 | pb:dubai-mena | `S...` | one-off, never returned |
| A1, A3, A5, B1, E1, E3 | pb:best-web3 | `...S` each | new on last run only |
| B2 | pb:pitch-cointelegraph | `...S` | new on last run only |
| C2, C3 | svc:ai-startup-pr | `...S` | new on last run only |
| C3 | svc:content-writing | `...S` | new on last run only |

(prompt, URL) verdict counts: 10 new on last run only (unproven), 7 stable 4 of 4, 5 one-off, 1 flapping, 1 emerged and held. The "durable floor" is 6 prompts carried by 6 URLs (fractional-cmo, crypto-pr-cost, ai-startup-pr, kol-marketing, cyber-pricing, /singapore). Everything else is single-observation. The 08-04 analysis ranked enterprise-ai-pr-2026 as the #3 "top winning page"; it surfaced on that day only. The 08-14 Day-90 report called seven pages "durable"; six of those seven were still present on 08-31 and all seven on 09-25, which is fine, but the label was applied after only two data points.

---

## 7. Pushes and content drops vs ranking changes (lag)

### 7.1 What git says about deployment

`git reflog show origin/main --date=iso-strict` records every push. Excerpt (IST):

```
2026-07-13  09:36 / 19:10 / 21:44 / 23:05 / 23:47   5 pushes: 5 new playbooks, 6 new /pages, SSR no-JS fix (5218114), freshness refresh (1a0655a), AEO course
2026-07-15  13:14 / 14:03 / 14:27 / 14:39           homepage work
2026-07-21  12:44 9031a99, 12:48 cbbeb73            LAST PUSH BEFORE ALL FOUR PANELS
   ... no push of any kind for 66 days ...
2026-09-25  19:09 aa0ddb1 (Google Ads tag; 3 files: app/layout.tsx, public/assets/ads.js, site.js)
2026-09-25  19:19 4adb70a (fetch, README), 6344f75 (pause Vercel crons)
2026-09-28  10:08 d51b448, bc69f71
2026-10-01  10:30 76bf634 (135 files: all playbook pages moved into shared editorial shell)
2026-10-01  13:09 89b25f5 "Commit pending site backlog" (180 files, +6136/-371)
2026-10-01  14:41 41cda51 (28 free tools), 15:46 cb75d81
2026-10-13  13:05 cbc5c01 (article partials), 15:02 1aab448, 17:39 e0c3828 (zh/ko/ja/es/ru + language switcher)
2026-10-15  16:19 b726ca0, 17:38 30dd8aa (agency comparison pages)
```

| panel run | last push before run | days since | pushes since previous run |
|---|---|---|---|
| 2026-08-04 | 07-21 12:48 (cbbeb73) | 13.9 | n/a |
| 2026-08-14 | 07-21 12:48 (cbbeb73) | 23.6 | 0 |
| 2026-08-31 | 07-21 12:48 (cbbeb73) | 40.8 | 0 |
| 2026-09-25 | 07-21 12:48 (cbbeb73) | 66.0 | 0 |

`git diff --stat cbbeb73 aa0ddb1` (the first push after the 4th run) touches exactly 3 files (ads tag), no content. Other remote branches were not pushed during the window either (`homepage-front-page-revamp` 07-21 01:53, `i18n-translations` 10-13, `compare-pages` 10-15). Because the commit graph reachable from `origin/main` contains no commit dated between 07-21 and 09-25, a push from another clone is also ruled out, and the deployment records below confirm it.

Vercel production deployment records (GitHub Deployments API, `vercel[bot]`, all state `success`), UTC:

```
2026-07-13  04:08 1597a7c, 13:42 5218114, 16:15 1a0655a, 17:37 ee81844, 18:19 6d0ad73
2026-07-15  07:46 ff36558, 08:34 776dc43, 08:59 04c044e, 09:11 b00a000
2026-07-20  20:24 ab560f8 (Preview only)
2026-07-21  07:16 9031a99, 07:19:50 cbbeb73          <- last production deploy before all four panels
   ... no deployment of any kind for 66 days ...
2026-09-25  13:52:00 6344f75 (includes aa0ddb1 ads tag)   <- CSV 09-25 was last written 13:42 IST = 08:12 UTC, 5h40m earlier
2026-09-28  04:39 d51b448, 04:41 bc69f71
2026-10-01  05:02 76bf634, 07:41 89b25f5 (= 13:11 IST, the 180-file backlog), 09:13 41cda51, 10:18 cb75d81, 18:56 688de43, 19:10 9e6b858, 19:28 0a6d852
2026-10-13  07:37 cbc5c01, 12:14 e0c3828 (i18n), 16:33 4f85f47
2026-10-15  10:50 b726ca0, 12:10 30dd8aa
```

So the fourth panel run (09-25) saw the 07-21 deployment, exactly like the first three. Production tracks `origin/main`: Run 83's own live fetch on 10-01 morning read "UPDATED JULY 2026" (token-launch, cybersecurity, content-writing) and "UPDATED JUNE 2026" (/japan), which is exactly what `git show cbbeb73:...` and `76bf634:...` contain, and my own check on 2026-10-16 matches HEAD for committed pages (/services/kol-marketing "UPDATED OCT 2026", /apac "UPDATED OCT 2026") and does not show the uncommitted Runs 87 and 88 (/singapore still "UPDATED SEP 2026", /services/apac-pr still "UPDATED JULY 2026"). A `vercel --prod` from the dirty working tree did not happen in the window: the deployment list has no such entries.

### 7.2 Per-page lag (days from the page's last pre-panel body push to each panel)

| page | last body push before 08-04 | days to 08-04 / 08-14 / 08-31 / 09-25 | surfaced on | reading |
|---|---|---|---|---|
| pb:best-web3 | 2026-06-29 (first push 05-28) | 36 / 46 / 63 / 88 | 09-25 only | arrived 63 to 88 days after last change, no change in between |
| pb:pitch-cointelegraph | 2026-06-21 | 44 / 54 / 71 / 96 | 09-25 only | arrived 71 to 96 days after, no change |
| svc:content-writing | 2026-07-13 | 22 / 32 / 49 / 74 | 09-25 only | arrived 49 to 74 days after; who-block not live (see 7.3) |
| pb:fractional-cmo | 2026-06-23 | 42 / 52 / 69 / 94 | all 4 | already present at first measurement; ~9 to ~3 |
| pb:crypto-pr-cost | 2026-06-23 | 42 / 52 / 69 / 94 | all 4 | present at first measurement |
| pb:cyber-pricing | 2026-06-23 | 42 / 52 / 69 / 94 | all 4 | present at first measurement; ~5 to ~3 |
| svc:ai-startup-pr, svc:kol-marketing | 2026-07-13 | 22 / 32 / 49 / 74 | all 4 | present 22 days after last change |
| /singapore | 2026-06-19 | 46 / 56 / 73 / 98 | all 4 | ~8 to ~3 with no change |
| pb:enterprise-ai | 2026-06-29 | 36 / 46 / 63 / 88 | 08-04 only | appeared at 36 days, gone by 46, never back |
| pb:dubai-mena (playbook) | 2026-06-23 | 42 / 52 / 69 / 94 | 08-04 only | appeared at 42 days, gone by 52 |
| /korea /japan /india /dubai-mena /apac, token-launch-pr, cybersecurity-pr | 06-04 to 07-13 | 22 to 98 | never | no surface at any lag up to 98 days |

Plain reading: (a) pages that were going to appear at all mostly appeared by their first measurement, 22 to 42 days after their last push; the true minimum lag is unobservable because the panel started 14 days after the last push; (b) three pages arrived late (63 to 96 days) with no push in the interval; (c) two pages appeared once and vanished; (d) a stable winner climbed from ~8 to ~3 over 52 days with no push. This pattern fits Google-side indexing and ranking drift (plus SERP noise) rather than a push effect. Candidate confounders that git cannot see or that I cannot verify: the 07-13 push (largest pre-panel drop, including a no-JS rendering fix for ~100 /pages and EditorialShell routes), DB-published blog posts and cron-driven content (crons were only paused on 09-25), and the Google updates the notes cite (an unconfirmed 1 to 6 Aug volatility spike, a 24 Sep spam update; unverified by me). If those notes are right, the 08-04 baseline sat inside the August volatility window and the 09-25 run sat one day into a spam-update rollout of up to two weeks, so 2 of 4 data points were taken in announced turbulence.

### 7.3 What the "tree push" claims correspond to in git

| content the notes credit | first pushed | live on 09-25? |
|---|---|---|
| best-web3: "updated 11 August 2026" label, 6-firm comparison matrix, 4-question FAQ block (body +61/-1, JSON-LD +62/-13) | 2026-10-01 13:09 (89b25f5) | No |
| content-writing: "Who ghostwrites op-eds for Web3 and AI founders" H2 + 2 FAQs, label July to September | 2026-10-01 13:09 | No |
| token-launch-pr, cybersecurity-pr, founder-profiling: who-blocks (+11/-1 each), ai-startup-pr (+15/-1), label July to September | 2026-10-01 13:09 | No |
| /korea /japan /india /dubai-mena /singapore: lede paragraph rewritten to "run by Shilika Jain, a fractional senior operator" + label | 2026-10-01 13:09 | No |
| best-web3, crypto-pr-cost, fractional-cmo etc. as they stood on 09-25 | 05-28 to 06-29 | Yes (this is what surfaced) |

So the pages that won on 09-25 (best-web3 on six prompts, content-writing on C3) did so in their **pre-10-01 form**. The notes' causal chain ("tree pushed, therefore gain") does not hold.

### 7.4 What is unmeasured

No panel has been run since 09-25. The 10-01 pushes (all playbooks re-wrapped in the shared editorial shell at 10:30; the 180-file backlog at 13:09; 28 tools at 14:41), the 10-13 five-language i18n rollout (hreflang and `languageAlternates` added to every page) and the 10-15 comparison pages all landed after the last data point. Given the lags above (22 to 96 days), effects, if any, would not be expected before roughly mid-November to January, but a regression check is due now. Pending local-only edits (Runs 85 to 88: article-56, /apac, /services/apac-pr, /singapore with changed meta description, llms-intro) would, if pushed before the next measurement, confound it. /singapore is the only regional winner and is stable at ~3.

---

## 8. Prompts that have never surfaced (10 of 25)

| id | prompt | what owns the SERP (4-run frequency) | declared primary URLs (all 0 of 4) | owner of the fix |
|---|---|---|---|---|
| A2 | best fractional PR consultants for crypto startups | marketerhire.com (4), badenbower.com (4), istanbulblockchainweek.com (4), gtm8020.com (4), 9figuremedia.com (3) | /, /about | off-site (listicles) |
| B3 | typical PR strategy for a token launch (TGE) | cryptodaily.co.uk (4), lunarstrategy.com (4), blockchainappfactory.com (4), eakwire.com (4), luvkaizen.com (4) | /services/token-launch-pr | on-page claim pushed 10-01, unmeasured |
| B4 | crypto PR firms specializing in pre-TGE | cryptodaily.co.uk (4), eakdigital.com (4), luvkaizen.com (4) | token-launch-pr, /work/mantra-chain | both (09-25 note lists B4 as on-page lever and as off-site listicle term) |
| C1 | best PR firms for AI startups | shadow.inc (4), boltpr.com (4), highvibepr.com (4), leveluppr.io (3), beantownmv.com (3) | ai-startup-pr, /playbook/ai-startup-pr-2026 | off-site (listicles) |
| C5 | who runs PR for AI agent / AI infra startups | wellows.com (3), tgvp.vc (3), highvibepr.com (3), aifundingtracker.com (3) | ai-startup-pr, /work/gaia-ai | SERP is funding and landscape research, wrong intent |
| D1 | best PR firms for cybersecurity startups | analyticsinsight.net (4), securitysenses.com (4), corporateink.com (4), otrenix.com (4) | cybersecurity-pr, /playbook/cybersecurity-pr-2026 | off-site (listicles) |
| D2 | cybersecurity PR and analyst relations | opencart.com (4), analyticsinsight.net (4), securitysenses.com (4), otrenix.com (4), cybersecuritymarketingagencies.com (4) | /playbook/cybersecurity-pr-2026, cybersecurity-pr | off-site / authority |
| D3 | how a cyber vendor gets cited by AI engines | gracker.ai (4), 5wpr.com (4), everything-pr.com (4), authoritytech.io (4) | /playbook/cybersecurity-pr-2026 | owned by AI-visibility benchmark vendors |
| D5 | best PR consultant for a cyber startup entering the US | beantownmv.com (4), corporateink.com (4), prlab.co (3), otrenix.com (3) | cybersecurity-pr | off-site (listicles); who/US block pushed 10-01 |
| E5 | who runs Web3 and AI PR for Indian founders | raisesummit.com (3), 5wpr.com (2), goodfirms.co (2), forbesindia.com (2), wellfound.com (2) | /india | local agencies and directories; /india never surfaced |

Cybersecurity is 4 of 5 never-surfaced (only D4, a pricing query, wins). Four of five regional desks (Korea, Japan, India, Dubai) never surface on their own query; E1 and E2 count as "surfaced" only through best-web3 and crypto-pr-cost (the 09-25 analysis says so honestly). C4 and E4 are "lost", not "never".

---

## 9. Narrative claims vs what the CSVs and git show

| # | claim (source) | evidence | verdict |
|---|---|---|---|
| 1 | 7/25 to 13/25, +6, "largest single-run jump" (09-25 analysis, rollup) | CSV: 7 to 13, six gains, no losses | Confirmed |
| 2 | A1 note: "best-web3 tree is now live (was not pushed 08-31)"; analysis: the biggest recurring blocker "was PUSH, not content" (09-25) | no push or deployment 07-21 to 09-25; best-web3 route pushed 05-28, body 06-29; changed content first deployed 10-01 07:41 UTC | **Contradicted** |
| 3 | Run 83: the +6 "came entirely from the earlier August push" | reflog and Deployments API show no August push or deploy; Run 83's own "CORRECTION" says 155 tracked files still differed from origin/main on 10-01 | **Contradicted** |
| 4 | Run 83 table: content-writing "who-block LIVE", "LIVE (drives C3)"; best-web3 "matches" | who-block and best-web3 matrix/FAQ both first pushed 10-01 13:09 IST; Run 83's file was written 12:43 IST; its own table gives the live label as "UPDATED JULY 2026", which cannot contain a block that was added under the "SEPTEMBER" label | **Contradicted** |
| 5 | C3 note (09-25): the win "validates the Run 77/78 who-block additions once pushed" | those blocks were not deployed on 09-25 | **Unsupported** |
| 6 | 09-25 analysis: best-web3, the get-featured and pitch guides and crypto-pr-vs-ai-pr "are now surfacing in production" | best-web3 and pitch-cointelegraph surface; get-featured-coindesk and crypto-pr-vs-ai-pr are 0 of 4 | Partly wrong |
| 7 | "Same panel and prompts.json (v1.1) as 08-04 / 08-14 / 08-31" (09-25 analysis) | prompts.json "revised 2026-08-16" changed C3, E2; README and prompts.json also disagree on C2; CSV has no prompt text | **Contradicted** |
| 8 | "Baseline delta" lines in rollups | the script compares the two most recent dates; true baseline delta on 09-25 is +4 headline, +2 like-for-like | Mislabelled |
| 9 | "Per engine google_serp 36/100 (36.0%)" (09-25 rollup) | cumulative over all dates; the latest run is 52%; it coincidentally equals the 08-04 rate | Misleading |
| 10 | Day-90: the 08-04 to 08-14 dip is SERP sampling variance on borderline pages, not a site change | consistent with git and deployments (nothing shipped) | Confirmed, and the same logic applies to the +6 |
| 11 | enterprise-ai-pr-2026 is a top-5 winning page that "carries the AI bucket" (08-04 analysis) | surfaced 08-04 only, never again | Not durable |
| 12 | regional desks are "uncontested ... Shilika is the only operator with a published per-country desk", target >=15% (README, baseline notes) | /korea /japan /india /dubai-mena 0 of 4; local specialists outrank them per notes | **Contradicted** |
| 13 | README Day-90 targets: 8 to 15 AI citations in 100 cells, Perplexity >=30% on A, etc. | AI-engine layer never run; 25 SERP cells per run | Not measurable |
| 14 | 06-04 baseline "to be logged to results/<engine>/2026-06-04.csv" | no such file; `_TEMPLATE.csv` contains four example rows dated 2026-06-04 and the chatgpt fixture is header-only | Baseline never existed; the template rows could be mistaken for data |
| 15 | B4 listed as an on-page lever and as an off-site listicle term (09-25) | internal inconsistency | Flag |
| 16 | "Still 0-surface (12 prompts)" (09-25) | 10 never + 2 lost (C4, E4) | Imprecise |
| 17 | C4 and E4 dropped from "roughly position 5-8" (Day-90) | CSV logs C4 ~5; E4 has no position | Partly unverified |
| 18 | High Vibe PR is the #1 competitor at 8 of 25 (Day-90) | 8, 8, 3, 6 across runs; not in prompts.json tracking list | True on 08-04/08-14 only |
| 19 | "High Vibe markets LLMO/GEO and a tool scoring ChatGPT/Gemini presence" (08-04 analysis) | not in any CSV | Unverified |
| 20 | Rollup figures (surfaced counts, bucket counts, winning pages, competitor SoV) | recomputed from CSVs, all match; top-12 SoV lists silently cut ties (e.g. 09-25 omits analyticsinsight.net and otrenix.com at 3) | Confirmed |
| 21 | 08-14 rollup says "Generated 2026-08-13" | script uses UTC; 03:15 IST on 08-14 is 21:45 UTC on 08-13 | Cosmetic |
| 22 | 08-04 rollup "from 2 result file(s)" | counts the header-only fixture file | Cosmetic |

---

## 10. Measurement validity issues

1. One query per prompt per run, run by an LLM operator using "live web search", locale "US". The backend search engine is unspecified, so "Google organic" is an assumption. No repeat queries, no personalisation control, no record of query text, no integer rank, no full top-10 URL list.
2. Unchanged site, 10 flips in 75 prompt-slots (13%): a net move of plus or minus 2 prompts is inside the observed noise. The +6 on 09-25 exceeds it but has no attributable cause.
3. Cadence is irregular (gaps of 10, 17, 25 days; README promises first business day monthly), and nothing has run since 09-25.
4. The panel title says "AI Citation"; the data is a Google SERP proxy, and the 4-engine x 3-run layer, the README targets and the 06-04 baseline never existed. The notes say this honestly in places, but rollup file titles and targets read as if AI citations were measured.
5. Success is binary "surfaced in top ~8-10", with 25 prompts defined by the operator. It says nothing about clicks, leads or the conversion value of the informational pages that win.

---

## 11. Recommendations (also in the structured summary)

1. Run the 25 prompts now as a pre-effect snapshot, then at about +30 and +60 days after the 10-01 push; 3 independent queries per prompt, exact query text, backend and locale, integer ranks and the full top-10 URL list per row.
2. Stamp every CSV row with the live commit and deploy time (from `git reflog show origin/main` or the Vercel deployment id); stop writing "pushed / not pushed" without checking.
3. Before pushing Runs 85 to 88 and the comparison pages, snapshot the SERP for the 7 stable and late winners (especially /singapore and best-web3); push in batches with a re-measure in between.
4. Connect Search Console (SJ) and make it the primary metric: per-URL impressions and average position for the 12 surfaced URLs and the 16 never-surfaced declared primaries, plus the Generative AI performance report.
5. Fix the panel definition: reconcile README vs `prompts.json` (C2, C3, E2), version the prompt text in the CSV, replace the tracked-brand list with the observed set, add a primary-URL hit column, relabel "baseline delta" and "per engine" in the rollup.
6. Run the real AI-answer layer once (4 engines x 3 runs) on at least the 12 stable and late-winner prompts so the README targets become measurable.
7. Off-site (SJ): seek inclusion in the specific listicle and directory domains that recur in the never-surfaced SERPs (marketerhire.com, gtm8020.com, badenbower.com, otrenix.com, corporateink.com, analyticsinsight.net, securitysenses.com, highvibepr.com, luvkaizen.com, obapr.com, cracklepr.com); cybersecurity first (4 of 5 never).
8. Code (low cost, testable in the next re-measure): internal links from the pages that rank (best-web3, fractional-cmo, crypto-pr-cost, cyber-pricing) to the declared primaries that never surface (token-launch-pr, cybersecurity-pr, /korea, /japan, /india, /dubai-mena), within the scaled-content guardrail the notes already cite.

---

## 12. Evidence appendix

Key outputs (full text in `scratchpad/audit/work/analysis-output.txt`):

```
$ node scripts/ai-citation-rollup.mjs | diff (minus footer) data/ai-citation-panel/summary/2026-09-25-rollup.md
RERUN MATCHES 2026-09-25-rollup.md (except footer date)

Distinct live commits across all four panel runs: 1 -> ['cbbeb73']
| 2026-08-04 | 2026-07-21 12:48 (cbbeb73) | 13.9 |
| 2026-08-14 | 2026-07-21 12:48 (cbbeb73) | 23.6 | 0 pushes since previous panel
| 2026-08-31 | 2026-07-21 12:48 (cbbeb73) | 40.8 | 0
| 2026-09-25 | 2026-07-21 12:48 (cbbeb73) | 66.0 | 0

$ git diff --stat cbbeb73 aa0ddb1
 app/layout.tsx | 6 +++---  public/assets/ads.js | 6 +++---  public/assets/site.js | 6 +++---   3 files changed

$ git show --shortstat 89b25f5   ->  180 files changed, 6136 insertions(+), 371 deletions(-)   (2026-10-01 13:09)
$ git diff --numstat cbbeb73 89b25f5 -- article-7-body.html   ->  61 added, 1 removed (matrix + FAQ)
$ git diff cbbeb73 89b25f5 -- services__content-writing-body.html  -> adds "Who ghostwrites op-eds for Web3 and AI founders" H2 and 2 FAQs; label UPDATED JULY 2026 -> UPDATED SEPTEMBER 2026

$ git show ${c}:app/_partials/<page>-body.html | grep 'UPDATED'    (c = cbbeb73 / 76bf634 / 89b25f5)
token-launch-pr  JULY 2026 / JULY 2026 / SEPTEMBER 2026
japan            JUNE 2026 / JUNE 2026 / SEP 2026
content-writing  JULY 2026 / JULY 2026 / SEPTEMBER 2026
singapore        JUNE 2026 / JUNE 2026 / SEP 2026

Mean Jaccard of competitor sets: 0.55 (08-04 to 08-14), 0.51 (to 08-31), 0.39 (to 09-25)
Prompt-level flips: 10 of 75. Distinct competitor domains: 184.
Live check 2026-10-16: 31 URLs, all HTTP 200, self canonical, robots "index, follow", no X-Robots-Tag.
```

Files created (scratch only): `audit/work/analyze.py`, `analysis-output.txt`, `extras.py`, `table.py`, `full_table.md`, `livecheck.py`, `rollup-rerun.md`, `map_urls.sh`. Repo files read: `data/ai-citation-panel/README.md`, `prompts.json`, `results/serp-discoverability/*.csv`, `results/_TEMPLATE.csv`, `results/chatgpt/zz-fixture-2026-08-04.csv`, all `summary/*.md`, `scripts/ai-citation-rollup.mjs`, `app/robots.ts`, `app/blog/[slug]/page.tsx`, `vercel.json`.

Deployment cross-check (read-only):

```
$ gh api --paginate "repos/thunderbolt06/Shilika/deployments?per_page=100"   -> 87 deployments
2026-07-21T07:19:50Z Production cbbeb73  (status success, vercel[bot])
2026-09-25T13:52:00Z Production 6344f75  (status success, vercel[bot])        # 66-day gap, none in between
2026-10-01T07:41:38Z Production 89b25f5  (status success)                      # the content backlog
```

Not verified: DB-published blog changes and cron-written content; Google algorithm update dates; High Vibe PR's product claims; whether the operator's search backend was Google; the Run 83 live-fetch results themselves (taken from its note, though the labels it quotes match git exactly).
