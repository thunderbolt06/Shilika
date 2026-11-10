# Keyword-to-URL ownership map (shilikajain.com)

GSC `sc-domain:shilikajain.com`, web search, **2026-08-10 to 2026-11-07** (90 days, dataState final), pulled 4 Nov 2026 by `scripts/gsc-ownership-map.py`; raw pulls in `data/seo-30d/gsc-l90/`. Crawl (inlinks, near-duplicate flag) from the DataForSEO crawl of 3 Nov 2026. Coverage from the 30 Oct URL-inspection CSV. Built by `scripts/keyword-ownership-build.py`. **Proposal only: nothing on the site was changed.**

## How to read this

- **Page impr / clicks / pos** = page totals from GSC (all queries, including anonymised ones). These drive the ">= 20 impressions = not a 301" rule.
- **Fam impr @ pos** = impressions on queries matching the family regex only (query x page rows; GSC hides low-volume queries, so this undercounts). These drive the owner choice.
- Scraper/operator queries (quoted operators, `@gmail`, `open to work`) and very long prompt-style queries are excluded from every family; ordinary questions ('how much do crypto pr agencies charge?') are kept. They inflate several pages' totals (`/blog/vietnam-web3-pr-playbook-2026`, `/playbook/best-web3-pr-agencies-2026`, `/blog/japan-web3-pr-...`).
- Inlinks 831 (`/services/*`) and 737 (hubs, `/services`) are sitewide nav/footer links, not editorial signals. The near-duplicate flag on `/services/*` and hubs is likely template similarity.
- **KEEP** = distinct intent, no change. **DIFFERENTIATE** = has impressions but overlaps: keep, retitle/re-angle, link to owner. **MERGE-301** = move any unique copy into the target, then 301. "EXCEPTION" marks the few 301s of URLs with >= 20 impressions, each with its reason. All 301 targets are indexed 200 URLs that are not themselves redirected (no chains).

## Summary

| Family | Owner URL | Owner page impr / clicks / pos | Owner fam impr @ pos | Family impr (matched) | # competing URLs | # 301s |
|---|---|---|---|---|---|---|
| Crypto PR agency / firm | `/playbook/best-web3-pr-agencies-2026` | 843 / 2 / 12.4 | 0 @ - | 394 | 23 | 7 |
| Web3 PR agency / firm | `/playbook/best-web3-pr-agencies-2026` | 843 / 2 / 12.4 | 90 @ 25.9 | 185 | 9 | 0 |
| Blockchain PR | `/playbook/best-web3-pr-agencies-2026` | 843 / 2 / 12.4 | 0 @ - | 13 | 4 | 2 |
| AI PR agency / AI startup PR / PR for AI startups | `/services/ai-startup-pr` | 303 / 1 / 23.4 | 72 @ 52.6 | 212 | 21 | 8 |
| Cybersecurity PR | `/services/cybersecurity-pr` | 538 / 0 / 43.2 | 341 @ 60.6 | 535 | 10 | 2 |
| DeFi PR | `/playbook/best-defi-pr-agency-2026` | 1136 / 0 / 8.8 | 1090 @ 9.0 | 1200 | 4 | 1 |
| Crypto KOL / KOL marketing | `/services/kol-marketing` | 1028 / 3 / 15.0 | 116 @ 27.5 | 405 | 19 | 4 |
| Token launch / TGE marketing | `/playbook/best-token-launch-marketing-agencies-2026` | 328 / 3 / 10.7 | 151 @ 13.8 | 181 | 13 | 6 |
| Fractional PR / CMO / head of PR | `/playbook/fractional-vs-agency` | 350 / 0 / 10.3 | 206 @ 5.9 | 362 | 13 | 3 |
| Web3 / crypto marketing agency | `/playbook/top-crypto-marketing-agencies-2026` | 102 / 1 / 10.4 | 1 @ 7.0 | 5 | 6 | 3 |
| Crypto press release | `/playbook/best-crypto-press-release-services-2026` | 131 / 1 / 8.8 | 31 @ 5.2 | 49 | 6 | 2 |
| Geo: crypto/web3 PR + India | `/playbook/best-web3-pr-agency-india-2026` | 84 / 1 / 6.8 | 0 @ - | 0 | 4 | 2 |
| Geo: crypto/web3 PR + Singapore | `/playbook/best-crypto-pr-agency-singapore-2026` | 68 / 1 / 16.5 | 0 @ - | 0 | 3 | 1 |
| Geo: crypto/web3 PR + Korea | `/pages/crypto-pr-agency-korea` | 14 / 1 / 5.9 | 0 @ - | 0 | 4 | 2 |
| Geo: crypto/web3 PR + Japan | `/playbook/crypto-pr-japan-2026` | 45 / 0 / 15.2 | 0 @ - | 0 | 4 | 2 |
| Geo: crypto/web3 PR + Dubai / UAE / MENA | `/playbook/crypto-pr-dubai-mena-2026` | 6 / 0 / 4.3 | 0 @ - | 0 | 6 | 4 |
| Geo: crypto/web3 PR + UK | `/pages/crypto-pr-agency-uk` | 5 / 0 / 5.6 | 0 @ - | 0 | 0 | 0 |
| Geo: crypto/web3 PR + USA | `/playbook/best-web3-pr-agency-usa-2026` | 24 / 0 / 9.6 | 0 @ - | 0 | 1 | 1 |
| Geo: crypto/web3 PR + Vietnam | `/playbook/crypto-pr-vietnam-2026` | 22 / 0 / 5.5 | 0 @ - | 0 | 3 | 1 |
| Geo: crypto/web3 PR + APAC (multi-market) | `/services/apac-pr` | 171 / 0 / 31.8 | 0 @ - | 0 | 2 | 1 |
| Other near-duplicate /pages (no family above) | (none) | | | | 5 | 4 |

**Total 301s proposed: 56** (from 56 URLs; 4 are flagged exceptions with >= 20 impressions).

## Crypto PR agency / firm  (`crypto-pr-agency`)

**Owner: `/playbook/best-web3-pr-agencies-2026`.** No URL earns impressions for 'crypto pr agency' itself (0 matched rows in 90 days; DataForSEO 3 Nov: not in US top 30), so this owner is chosen on intent, not on a GSC win. The US SERP is listicles ('Top 11 Web3 & Crypto PR Agencies', 'Best Crypto PR Agencies') plus agency homepages. best-web3-pr-agencies-2026 is the strongest commercial-listicle URL on the site (843 impr at #12.4 in the 10 Aug to 7 Nov window, 37 real inlinks, named firms) and already wins the web3 twin of this term, so crypto and web3 PR agency share ONE owner. Required change is additive only (top-page rule): add 'and Crypto' to title/H1 (e.g. 'Best Web3 & Crypto PR Agencies in 2026') and a 'Crypto PR agencies' H2 section. If S rejects any title edit on this top page, fallback owner = /services/web3-pr-campaigns (the transactional page; sitewide nav already points to it).

Query regex: `\b(crypto\|cryptocurrency)\b.*\b(pr\|public relations\|publicist)\b\|\b(pr\|public relations)\b.*\bcrypto` (excluding `press release\|kol\|india\|indian\|singapore\|dubai\|uae\|mena\|abu dhabi\|saudi\|korea\|korean\|japan\|japanese\|\buk\b\|london\|united kingdom\|\busa\b\|\bus\b\|america\|vietnam\|apac\|asia`)

| URL | Page impr | Clicks | Pos | Fam impr @ pos | Inlinks | Near-dup | Coverage 30 Oct | Rec | Target | Top family queries (impr@pos) | Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/playbook/best-web3-pr-agencies-2026` | 843 | 2 | 12.4 | 0 @ - | 37 | yes | indexed | **OWNER** |  | high vibe pr alternatives 326@3; eak digital alternatives 62@9; web3 pr agencies 33@16 | Owner (see note above). |
| `/services/web3-pr-campaigns` | 282 | 3 | 27.2 | 0 @ - | 831 | yes | indexed | **DIFFERENTIATE** | `/playbook/best-web3-pr-agencies-2026` | web3 public relations 31@65; pr for web3 startup 20@14; web3 pr 11@37 | Transactional companion: keep for 'web3/crypto PR services' and 'pr for web3 startup' (25@13). Add a 'compare agencies' link to the owner; owner links back with 'crypto PR services'. Inlinks 831 = sitewide nav, not an editorial signal. |
| `/playbook/crypto-pr-cost-2026` | 699 | 6 | 22.1 | 270 @ 46.5 | 49 | no | indexed | **KEEP** |  | crypto pr packages 60@67; crypto pr 59@63; cryptocurrency pr 47@63 | Pricing intent ('crypto pr pricing' #11, 'crypto pr packages'). Top page: only add. Also holds the bare 'crypto pr' impressions (#72-75) - leave them. |
| `/playbook/crypto-pr-vs-ai-pr` | 94 | 0 | 60.7 | 64 @ 76.8 | 22 | no | indexed | **DIFFERENTIATE** |  | crypto pr 51@82; pr crypto 13@56 | 101 impr, almost all bare 'crypto pr' at #83-84. Comparison intent; keep, make title clearly 'vs AI PR', add link to owner. |
| `/playbook/crypto-pr-agency-comparison-2026` | 17 | 0 | 12.1 | 0 @ - | 4 | no | indexed | **KEEP** |  |  | Evaluation/how-to-compare intent (18 impr). Receives the checklist 301 below; links to owner. |
| `/playbook/how-to-choose-web3-pr-agency-checklist-2026` | 3 | 0 | 3.0 | 0 @ - | 6 | yes | indexed | **MERGE-301** | `/playbook/crypto-pr-agency-comparison-2026` |  | 3 impr, near-duplicate flag; same 'how to choose/compare an agency' intent as the comparison playbook. |
| `/playbook/web3-pr-agency-mistakes` | 6 | 0 | 9.8 | 0 @ - | 22 | yes | indexed | **KEEP** |  | how do web3 companies reach buyers through ai search in 2026? 1@28 | Distinct intent (mistakes), 22 inlinks. Link to owner. |
| `/playbook/web3-pr-agency-reviews-clutch-2026` | 300 | 0 | 7.8 | 0 @ - | 5 | no | indexed | **KEEP** |  | clutch review meaning 2@11; how do market entry pr agencies compare on client reviews? 2@1; clutch pr 1@10 | 309 impr on Clutch-review queries; distinct intent. |
| `/pages/best-crypto-pr-agency` | 1 | 0 | 10.0 | 0 @ - | 5 | yes | indexed | **MERGE-301** | `/playbook/best-web3-pr-agencies-2026` |  | 1 impr, near-duplicate; identical 'best crypto PR agency' intent as owner. |
| `/pages/crypto-pr-agency-for-startups` | 12 | 0 | 19.2 | 9 @ 24.0 | 4 | yes | indexed | **MERGE-301** | `/services/web3-pr-campaigns` | pr for crypto startup 9@24 | 12 impr, near-duplicate. Its only query 'pr for crypto startup' (9@24) is the twin of 'pr for web3 startup' which the service page already holds at #13. |
| `/pages/affordable-crypto-pr-agency` | 3 | 0 | 9.0 | 0 @ - | 6 | no | indexed | **MERGE-301** | `/playbook/crypto-pr-small-budget-2026` | small and senior pr agency 1@17 | 4 impr; budget intent = small-budget playbook (not dup-flagged, 10 inlinks). |
| `/pages/crypto-pr-agency-small-budget` | 1 | 0 | 6.0 | 0 @ - | 5 | no | indexed | **MERGE-301** | `/playbook/crypto-pr-small-budget-2026` |  | 1 impr; same budget intent. |
| `/playbook/crypto-pr-small-budget-2026` | 3 | 0 | 6.3 | 0 @ - | 10 | no | indexed | **KEEP** |  |  | Budget-intent owner; link it to crypto-pr-cost-2026. |
| `/pages/crypto-pr-consultant` | 2 | 0 | 4.0 | 0 @ - | 4 | yes | indexed | **MERGE-301** | `/services/web3-pr-campaigns` |  | 2 impr, near-duplicate; 'hire a senior crypto PR consultant' = the service page (title already 'Senior Operator'). |
| `/pages/crypto-publicist` | 1 | 0 | 11.0 | 0 @ - | 4 | yes | indexed | **MERGE-301** | `/playbook/crypto-publicist-vs-agency-2026` |  | 1 impr, near-duplicate; same publicist intent as the publicist-vs-agency playbook (indexed, not dup). |
| `/playbook/crypto-publicist-vs-agency-2026` | 0 | 0 | - | 0 @ - | 6 | no | indexed | **KEEP** |  |  | Publicist-vs-agency comparison; receives /pages/crypto-publicist. |
| `/playbook/best-crypto-press-release-services-2026` | 131 | 1 | 8.8 | 19 @ 3.6 | 5 | yes | indexed | **KEEP** |  | chainwire vs pr newswire for crypto announcements 19@4 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/playbook/best-crypto-pr-agency-singapore-2026` | 68 | 1 | 16.5 | 10 @ 29.5 | 11 | yes | indexed | **KEEP** |  | crypto pr 10@30 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/services/token-launch-pr` | 236 | 1 | 18.2 | 6 @ 12.7 | 831 | yes | indexed | **KEEP** |  | crypto pr for token launch 6@13 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/playbook/crypto-press-release-distribution-2026` | 65 | 0 | 6.9 | 5 @ 5.4 | 12 | yes | indexed | **KEEP** |  | chainwire vs pr newswire for crypto announcements 5@5 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/blog/web3-bear-market-pr-strategy` | 2 | 0 | 7.5 | 2 @ 7.5 | 4 | no | indexed | **KEEP** |  | what are the best practices for managing public relations during a cryptocurrency market downturn? 2@8 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/blog/token-launch-pr-service-whats-included` | 19 | 1 | 3.8 | 1 @ 5.0 | 6 | no | indexed | **KEEP** |  | crypto pr for token launch 1@5 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/playbook/best-web3-pr-agency-usa-2026` | 24 | 0 | 9.6 | 1 @ 9.0 | 5 | yes | indexed | **KEEP** |  | what are the latest trends in public relations for cryptocurrency startups? 1@9 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/blog/web3-pr-metrics-board-reporting-dashboard` | 3 | 0 | 3.7 | 1 @ 4.0 | 8 | yes | indexed | **KEEP** |  | what metrics should marketing directors track to measure pr campaign success in cryptocurrency? 1@4 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |

## Web3 PR agency / firm  (`web3-pr-agency`)

**Owner: `/playbook/best-web3-pr-agencies-2026`.** Wins the family outright: 'web3 pr firms' 34@28, 'web3 pr agencies', 'top web3 pr agency' (#3-17). Same owner as crypto PR agency.

Query regex: `\bweb ?3\b.*\b(pr\|public relations)\b\|\b(pr\|public relations)\b.*\bweb ?3\b` (excluding `kol\|fractional\|india\|indian\|singapore\|dubai\|uae\|mena\|abu dhabi\|saudi\|korea\|korean\|japan\|japanese\|\buk\b\|london\|united kingdom\|\busa\b\|\bus\b\|america\|vietnam\|apac\|asia`)

| URL | Page impr | Clicks | Pos | Fam impr @ pos | Inlinks | Near-dup | Coverage 30 Oct | Rec | Target | Top family queries (impr@pos) | Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/playbook/best-web3-pr-agencies-2026` | 843 | 2 | 12.4 | 90 @ 25.9 | 37 | yes | indexed | **OWNER** |  | web3 pr agencies 33@16; web3 pr firms 26@26; top web3 pr agency 17@24 | Owner (see note above). |
| `/services/web3-pr-campaigns` | 282 | 3 | 27.2 | 72 @ 43.1 | 831 | yes | indexed | **DIFFERENTIATE** | `/playbook/best-web3-pr-agencies-2026` | web3 public relations 31@65; pr for web3 startup 20@14; web3 pr 11@37 | Holds 'web3 public relations' (#72) and 'pr for web3 startup' (#13). Keep as the hire/services page; don't retitle toward 'agency'. |
| `/pages/web3-pr-agency` | 34 | 0 | 12.3 | 13 @ 17.0 | 17 | no | indexed | **DIFFERENTIATE** | `/playbook/best-web3-pr-agencies-2026` | web3 pr agency 5@29; web3 pr firms 5@3; web3 pr firm 2@2 | 29 impr (>=20) and it outranks the owner on its own long-tail ('web3 pr firm' #2, 'web3 pr firms' #3). Not a 301 now: retitle away from 'Best Web3 PR Agency' (that's the owner's title) to a 'fractional alternative to a Web3 PR firm' angle, link to owner. Re-check 28 Nov; 301 to owner if it stops earning its own queries. |
| `/playbook/web3-pr-agency-reviews-clutch-2026` | 300 | 0 | 7.8 | 0 @ - | 5 | no | indexed | **KEEP** |  | clutch review meaning 2@11; how do market entry pr agencies compare on client reviews? 2@1; clutch pr 1@10 | Clutch-review intent. |
| `/blog/web3-pr-agency-rfp-template` | 15 | 1 | 8.9 | 0 @ - | 4 | no | indexed | **KEEP** |  | blockchain rfp template 7@14; blockchain infrastructure rfp template 1@1 | RFP template intent; link to owner. |
| `/blog/web3-pr-retainer-scope-of-work-breakdown-2026` | 17 | 0 | 7.2 | 0 @ - | 9 | no | indexed | **KEEP** |  |  | Retainer scope intent; link to owner. |
| `/playbook/best-web3-pr-agency-usa-2026` | 24 | 0 | 9.6 | 4 @ 23.5 | 5 | yes | indexed | **KEEP** |  | web3 pr agencies 2@13; web3 pr agency 2@34 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/faq` | 59 | 0 | 15.0 | 2 @ 7.5 | 831 | no | indexed | **KEEP** |  | pr for web3 startup 2@8 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/playbook/best-web3-pr-agency-india-2026` | 84 | 1 | 6.8 | 2 @ 10.5 | 7 | no | indexed | **KEEP** |  | web3 pr 1@11; web3 pr agency 1@10 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/blog/how-to-break-into-web3-communications-career` | 9 | 0 | 20.2 | 2 @ 49.0 | 5 | no | URL is unknown to Google | **KEEP** |  | web3 public relations 2@49 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |

## Blockchain PR  (`blockchain-pr`)

**Owner: `/playbook/best-web3-pr-agencies-2026`.** Only 18 matched impressions; the one real query is a cost question (owned by crypto-pr-cost-2026). 'blockchain pr agency' is the same listicle intent as crypto/web3 PR agency, so it shares that owner (add 'blockchain' to the owner's intro copy, not its title).

Query regex: `\bblockchain\b.*\b(pr\|public relations)\b\|\b(pr\|public relations)\b.*\bblockchain\b` (excluding `kol\|india\|indian\|singapore\|dubai\|uae\|mena\|abu dhabi\|saudi\|korea\|korean\|japan\|japanese\|\buk\b\|london\|united kingdom\|\busa\b\|\bus\b\|america\|vietnam\|apac\|asia`)

| URL | Page impr | Clicks | Pos | Fam impr @ pos | Inlinks | Near-dup | Coverage 30 Oct | Rec | Target | Top family queries (impr@pos) | Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/playbook/best-web3-pr-agencies-2026` | 843 | 2 | 12.4 | 0 @ - | 37 | yes | indexed | **OWNER** |  | high vibe pr alternatives 326@3; eak digital alternatives 62@9; web3 pr agencies 33@16 | Owner (see note above). |
| `/playbook/crypto-pr-cost-2026` | 699 | 6 | 22.1 | 12 @ 1.8 | 49 | no | indexed | **KEEP** |  | what's the typical cost for blockchain pr services? 12@2 | 'what's the typical cost for blockchain pr services?' 12 impr - pricing intent stays here. |
| `/pages/blockchain-gaming-pr-agency` | 0 | 0 | - | 0 @ - | 4 | yes | indexed | **MERGE-301** | `/playbook/blockchain-gaming-pr-2026` |  | 0 impr, near-duplicate; gaming PR intent = blockchain-gaming playbook. |
| `/pages/layer2-pr-agency` | 2 | 0 | 7.5 | 0 @ - | 5 | yes | indexed | **MERGE-301** | `/blog/l1-l2-blockchain-pr-narrative-differentiation-playbook` |  | 2 impr, near-duplicate; L2 PR intent = the L1/L2 PR playbook post. |
| `/playbook/top-crypto-marketing-agencies-2026` | 102 | 1 | 10.4 | 1 @ 6.0 | 6 | yes | indexed | **KEEP** |  | top blockchain pr firms for getting coverage in coindesk and cointelegraph 1@6 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |

## AI PR agency / AI startup PR / PR for AI startups  (`ai-pr`)

**Owner: `/services/ai-startup-pr`.** With geo-tagged queries excluded, the service page narrowly leads on family impressions (54 @60 vs the India playbook's 52 @10). The India playbook ranks far better but its intent is geo (India) and its generic-query impressions are likely India-localised; retitling it global would break the top-page rule. /services/ai-startup-pr is the only commercial, non-geo URL ranking for the head term and the ONLY shilikajain.com URL in any US top 30 in the 3 Nov DataForSEO check ('pr for ai startups' #29). It needs links with exact anchors (it sits #55-64 in GSC). 'enterprise ai pr' (95@11) is a separate sub-intent owned by /playbook/enterprise-ai-pr-2026.

Query regex: `\bai\b.*\b(pr\|publicist\|public relations)\b\|\b(pr\|publicist\|public relations)\b.*\bai\b` (excluding `generator\|bio\|enterprise\|india\|indian\|singapore\|dubai\|uae\|mena\|abu dhabi\|saudi\|korea\|korean\|japan\|japanese\|\buk\b\|london\|united kingdom\|\busa\b\|\bus\b\|america\|vietnam\|apac\|asia`)

| URL | Page impr | Clicks | Pos | Fam impr @ pos | Inlinks | Near-dup | Coverage 30 Oct | Rec | Target | Top family queries (impr@pos) | Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/services/ai-startup-pr` | 303 | 1 | 23.4 | 72 @ 52.6 | 831 | no | indexed | **OWNER** |  | pr for ai startups 46@44; ai+startup+pr 7@60; ai startup pr agency 6@64 | Owner (see note above). |
| `/playbook/ai-startup-pr-agency-india-2026` | 243 | 2 | 9.1 | 53 @ 9.4 | 15 | no | indexed | **KEEP** |  | pr for ai startup 30@9; pr agency for ai startups 22@10; ai startup pr agency 1@4 | Geo-India owner (249 impr, 3 clicks; 'ai-powered pr agency in india'). Keep its India title; add a link to the owner with 'AI startup PR'. |
| `/playbook/enterprise-ai-pr-2026` | 134 | 0 | 9.8 | 0 @ - | 16 | no | indexed | **KEEP** |  | enterprise ai pr 93@10; which agency can manage gartner and forrester analyst relations for a b2b tech company? 1@8 | Owns 'enterprise ai pr' (95@11). Distinct buyer (enterprise). |
| `/playbook/ai-startup-pr-2026` | 158 | 0 | 7.5 | 0 @ - | 31 | yes | indexed | **DIFFERENTIATE** | `/services/ai-startup-pr` | bindu reddy x twitter ai agents tweets 2026 3@6 | 165 impr, 31 inlinks, near-dup flag. Guide intent: keep, make the title clearly a how-to guide, link to owner. |
| `/pages/ai-pr-agency` | 21 | 0 | 6.4 | 0 @ - | 8 | yes | Crawled - currently not indexed | **MERGE-301** | `/services/ai-startup-pr` | best pr agencies with ex-techcrunch reporters on staff 3@7 | EXCEPTION (21 impr): same commercial intent as the owner, and Google already dropped it (Crawled - currently not indexed on 30 Oct), so the 21 impressions are historical. |
| `/pages/generative-ai-pr-agency` | 23 | 0 | 7.3 | 0 @ - | 5 | yes | indexed | **MERGE-301** | `/services/ai-startup-pr` |  | 18 impr, near-duplicate; generative-AI PR = AI startup PR intent. |
| `/pages/ai-startup-pr-agency` | 11 | 0 | 11.1 | 0 @ - | 4 | yes | indexed | **MERGE-301** | `/services/ai-startup-pr` |  | 11 impr, near-duplicate; identical intent to owner. |
| `/pages/ai-pr-consultant` | 6 | 1 | 5.8 | 0 @ - | 5 | yes | indexed | **MERGE-301** | `/services/ai-startup-pr` |  | 6 impr (1 click), near-duplicate; hire-a-consultant intent = service page. |
| `/pages/ai-publicist` | 10 | 0 | 6.4 | 0 @ - | 4 | yes | indexed | **MERGE-301** | `/playbook/what-is-an-ai-publicist-2026` | we are launching a new fund and need a firm that can pitch business media, startup media, and investor-focused outlets with a coherent story. who is good at vc pr? 4@8 | 10 impr, near-duplicate; publicist intent = the AI publicist playbook (40 impr). |
| `/playbook/what-is-an-ai-publicist-2026` | 39 | 0 | 7.0 | 0 @ - | 5 | yes | indexed | **KEEP** |  |  | AI publicist explainer; receives /pages/ai-publicist. |
| `/pages/enterprise-ai-pr-agency` | 3 | 0 | 5.0 | 0 @ - | 7 | yes | Crawled - currently not indexed | **MERGE-301** | `/playbook/enterprise-ai-pr-2026` | pr agency that targets enterprise buyers 1@4 | 3 impr, near-duplicate, not indexed; enterprise AI PR intent. |
| `/pages/healthcare-ai-pr-agency` | 1 | 0 | 8.0 | 0 @ - | 4 | yes | indexed | **MERGE-301** | `/services/ai-startup-pr` |  | 1 impr, near-duplicate; no healthcare-AI page with impressions. |
| `/pages/ai-pr-agency-india` | 5 | 0 | 12.6 | 0 @ - | 4 | no | indexed | **MERGE-301** | `/playbook/ai-startup-pr-agency-india-2026` |  | 5 impr; same India AI PR intent as the India playbook. |
| `/pages/fintech-ai-pr-agency` | 17 | 0 | 8.5 | 10 @ 5.8 | 4 | yes | indexed | **KEEP** |  | ai-native pr agency for fintech 10@6 | 16 impr incl. its own query ('ai-native pr agency for fintech' 7@6). Distinct vertical. |
| `/playbook/ai-pr-agency-pricing-packages-2026` | 52 | 0 | 5.8 | 0 @ - | 6 | yes | indexed | **KEEP** |  |  | Pricing intent (53 impr). |
| `/blog/why-ai-companies-invest-in-communications` | 67 | 0 | 8.3 | 50 @ 9.2 | 4 | no | URL is unknown to Google | **KEEP** |  | pr for ai startups 27@10; hard numbers for ai startup pr and media relations 14@4; pr for ai companies 5@11 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/playbook/best-b2b-saas-pr-agencies-2026` | 1635 | 0 | 12.0 | 11 @ 6.2 | 21 | yes | indexed | **KEEP** |  | how to evaluate pr firms for rapid product launches in ai and saas? 4@2; boutique pr agencies for series a and b tech startups that focus on ai citation not vanity metrics 3@11; which pr agency specializes in b2b saas and ai startups? 3@8 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/blog/how-to-measure-pr-results-startups` | 26 | 0 | 9.2 | 10 @ 5.7 | 13 | no | indexed | **KEEP** |  | how to assess pr firms' success with venture-backed ai companies? 7@6; what is the best way to measure pr impact on brand equity for ai startups? 3@6 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/blog/pr-vs-marketing-for-ai-startups` | 5 | 0 | 15.6 | 3 @ 16.0 | 5 | no | indexed | **KEEP** |  | pr for ai startup 2@20; what differentiates top b2b pr agencies serving ai startups from generalist firms? 1@7 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/blog/ai-startup-pr-technical-founders-business-press` | 15 | 0 | 8.6 | 1 @ 30.0 | 7 | no | indexed | **KEEP** |  | pr for ai startup 1@30 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/blog/apac-expansion-pr-for-ai-startups` | 33 | 0 | 10.8 | 1 @ 42.0 | 7 | yes | indexed | **KEEP** |  | pr for ai startup 1@42 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/blog/ai-startup-marketing-plan-step-by-step-by-category` | 20 | 1 | 7.2 | 1 @ 10.0 | 8 | no | indexed | **KEEP** |  | what should be included in a pr package for b2b ai startups? 1@10 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |

## Cybersecurity PR  (`cybersecurity-pr`)

**Owner: `/services/cybersecurity-pr`.** Wins on impressions (319 family impr: 'cybersecurity pr' 173, 'cyber security pr' 54, 'pr for cybersecurity company' 34) but at #51-68. The playbook has 49 family impr at #11 ('cybersecurity pr firm' 41@10). Owner stays the service page (audit item 7): it needs exact-anchor links from the playbook and blogs.

Query regex: `cyber ?security.*\b(pr\|public relations\|marketing)\b\|\binfosec\b\|\b(pr\|marketing)\b.*cyber ?security` (excluding `professionals`)

| URL | Page impr | Clicks | Pos | Fam impr @ pos | Inlinks | Near-dup | Coverage 30 Oct | Rec | Target | Top family queries (impr@pos) | Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/services/cybersecurity-pr` | 538 | 0 | 43.2 | 341 @ 60.6 | 831 | yes | indexed | **OWNER** |  | cybersecurity pr 187@66; cyber security pr 57@52; pr for cybersecurity company 34@52 | Owner (see note above). |
| `/playbook/cybersecurity-pr-2026` | 405 | 1 | 7.7 | 56 @ 12.8 | 17 | no | indexed | **DIFFERENTIATE** | `/services/cybersecurity-pr` | cybersecurity pr firm 41@10; cybersecurity and pr 8@20; cyber security pr 4@26 | 49 family impr at #11 ('cybersecurity pr firm' 41@10). Keep (>=20, top-page). Retitle toward 'guide' and add 'cybersecurity PR firm' link to the owner. |
| `/pages/cybersecurity-marketing-agency` | 100 | 0 | 4.5 | 81 @ 3.2 | 5 | yes | indexed | **DIFFERENTIATE** |  | cybersecurity marketing partner to build analyst-ready content. 81@3 | 50 impr; owns 'marketing' variants (37 impr). Distinct from PR; keep, link to owner for PR. |
| `/playbook/best-cybersecurity-marketing-agencies-2026` | 95 | 0 | 11.6 | 21 @ 5.2 | 4 | yes | indexed | **KEEP** |  | what are the top marketing agencies that specialize in cybersecurity companies? 13@6; how to choose a digital marketing agency for a series b cybersecurity startup? 5@2; best cyber security marketing agencies? 1@12 | Listicle for marketing agencies (75 impr). Keep. |
| `/pages/infosec-pr-agency` | 22 | 0 | 24.8 | 21 @ 25.5 | 8 | yes | Crawled - currently not indexed | **DIFFERENTIATE** | `/services/cybersecurity-pr` | infosec pr agency 15@23; infosec pr firm 6@33 | 22 impr incl. 'infosec pr agency/firm'. Keep (>=20, own term), retitle around 'InfoSec PR', link to owner. |
| `/pages/cybersecurity-pr-agency` | 2 | 0 | 6.0 | 0 @ - | 9 | yes | Crawled - currently not indexed | **MERGE-301** | `/services/cybersecurity-pr` |  | 2 impr, near-duplicate; identical intent. |
| `/pages/cybersecurity-pr-agency-usa` | 1 | 0 | 62.0 | 0 @ - | 7 | no | Crawled - currently not indexed | **MERGE-301** | `/services/cybersecurity-pr` |  | 1 impr at #62; US is the default market for the owner. |
| `/pages/cybersecurity-analyst-relations-agency` | 26 | 0 | 5.8 | 0 @ - | 9 | no | indexed | **KEEP** |  | which analyst relations agencies help with magic quadrant strategy? 2@1; gartner analytst relations agency 1@7 | Analyst relations is a distinct service (27 impr). |
| `/pages/threat-intelligence-pr-agency` | 5 | 0 | 5.2 | 0 @ - | 6 | no | indexed | **KEEP** |  |  | Distinct niche (threat-research PR), not dup-flagged. |
| `/blog/cybersecurity-startup-series-a-pr-six-month-plan` | 32 | 1 | 7.3 | 13 @ 7.6 | 4 | no | indexed | **KEEP** |  | pr for cybersecurity startup 13@8 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/blog/fractional-pr-cybersecurity-startup-vs-agency` | 17 | 0 | 4.7 | 2 @ 1.0 | 4 | yes | indexed | **KEEP** |  | better cybersecurity content partner than traditional pr agencies. 2@1 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |

## DeFi PR  (`defi-pr`)

**Owner: `/playbook/best-defi-pr-agency-2026`.** Clear winner: 1,092 of 1,196 family impressions ('defi pr agency' 578, 'defi pr' 502) at #9-11.

Query regex: `\bdefi\b.*\b(pr\|public relations\|marketing)\b\|\b(pr\|public relations)\b.*\bdefi\b`

| URL | Page impr | Clicks | Pos | Fam impr @ pos | Inlinks | Near-dup | Coverage 30 Oct | Rec | Target | Top family queries (impr@pos) | Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/playbook/best-defi-pr-agency-2026` | 1136 | 0 | 8.8 | 1090 @ 9.0 | 5 | no | indexed | **OWNER** |  | defi pr 491@8; defi pr agency 465@10; defi pr agencies 116@7 | Owner (see note above). |
| `/pages/defi-pr-agency` | 116 | 0 | 12.7 | 109 @ 11.7 | 5 | no | indexed | **MERGE-301** | `/playbook/best-defi-pr-agency-2026` | defi pr agency 103@11; defi pr agencies 6@28 | EXCEPTION (110 impr): ranks for the SAME queries ('defi pr agency', 'defi pr agencies') at the SAME #11 as the owner, so the two split one SERP slot; plan week 2 names this exact pair. Merge its unique copy into the owner first, then 301. S approves. |
| `/playbook/defi-protocol-pr-strategy-2026` | 14 | 0 | 4.9 | 0 @ - | 7 | yes | indexed | **KEEP** |  |  | Strategy/how-to intent. |
| `/blog/defi-exploit-communications-first-72-hours` | 34 | 1 | 3.7 | 0 @ - | 5 | yes | indexed | **KEEP** |  | which defi protocols handled hack communications well? 17@2 | Crisis-comms intent. |
| `/blog` | 543 | 0 | 45.5 | 1 @ 1.0 | 832 | no | indexed | **KEEP** |  | which pr firms have experience with defi protocol launches? 1@1 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |

## Crypto KOL / KOL marketing  (`kol`)

**Owner: `/services/kol-marketing`.** Split signal: the listicle has more family impressions (180@24 vs 118@27) but the service page has 1,067 total impressions, the only clicks (3), no near-dup flag, and wins the web3 variants ('web3 kol marketing' 47@21, 'web3 kol' 40@27). Owner = service page; listicle keeps the 'best agencies' comparison intent.

Query regex: `\bkols?\b\|crypto influencer\|influencer marketing.*(crypto\|web3)`

| URL | Page impr | Clicks | Pos | Fam impr @ pos | Inlinks | Near-dup | Coverage 30 Oct | Rec | Target | Top family queries (impr@pos) | Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/services/kol-marketing` | 1028 | 3 | 15.0 | 116 @ 27.5 | 831 | no | indexed | **OWNER** |  | web3 kol marketing 46@20; web3 kol 41@26; web3 kol services 11@28 | Owner (see note above). |
| `/playbook/best-crypto-kol-marketing-agencies-2026` | 411 | 0 | 15.7 | 203 @ 22.4 | 8 | yes | indexed | **DIFFERENTIATE** | `/services/kol-marketing` | crypto kol marketing agency 54@25; crypto kol marketing services 31@22; crypto kol agency 21@16 | 180 family impr ('crypto kol marketing agency' 48@26). >=20 so not a 301. Keep as the 'best crypto KOL agencies' listicle; link to owner with 'crypto KOL marketing'. |
| `/pages/crypto-kol-marketing-agency` | 16 | 0 | 14.6 | 1 @ 30.0 | 9 | no | indexed | **MERGE-301** | `/services/kol-marketing` | crypto kol marketing services 1@30 | 15 impr; hire-an-agency intent identical to the service page. |
| `/pages/web3-kol-agency` | 20 | 0 | 5.9 | 0 @ - | 7 | no | indexed | **DIFFERENTIATE** | `/services/kol-marketing` |  | 20 impr (at threshold), no visible queries. Hold: re-check 28 Nov, 301 to owner if no own queries. |
| `/pages/crypto-influencer-marketing-agency` | 9 | 0 | 5.8 | 0 @ - | 7 | no | Crawled - currently not indexed | **MERGE-301** | `/services/kol-marketing` |  | 9 impr, not indexed; influencer = KOL intent. |
| `/pages/crypto-twitter-kol-marketing` | 9 | 0 | 4.7 | 0 @ - | 5 | no | Crawled - currently not indexed | **MERGE-301** | `/services/kol-marketing` |  | 9 impr, not indexed; X/Twitter KOL is part of the service. |
| `/pages/crypto-youtube-influencer-agency` | 15 | 0 | 6.5 | 0 @ - | 5 | no | indexed | **KEEP** |  |  | Distinct channel (YouTube), indexed, 14 impr. |
| `/pages/crypto-kol-agency-korea` | 8 | 0 | 8.4 | 0 @ - | 4 | no | indexed | **MERGE-301** | `/pages/korea-kol-marketing-agency` |  | 8 impr; twin of the Korea KOL page (9 impr). |
| `/pages/korea-kol-marketing-agency` | 8 | 0 | 8.6 | 0 @ - | 4 | no | indexed | **KEEP** |  | mediaplus native marketing agency 1@19 | Korea KOL transactional page; receives its twin. |
| `/playbook/crypto-kol-marketing-korea-2026` | 27 | 1 | 13.1 | 0 @ - | 6 | no | indexed | **KEEP** |  |  | Korea KOL guide (28 impr, 1 click). |
| `/pages/crypto-kol-agency-japan` | 4 | 0 | 8.0 | 0 @ - | 5 | no | indexed | **KEEP** |  |  | Only Japan KOL page. |
| `/playbook/how-to-vet-crypto-kols-2026` | 23 | 0 | 7.8 | 0 @ - | 12 | yes | indexed | **KEEP** |  |  | Vetting intent. |
| `/pages/best-web3-marketing-agency` | 76 | 0 | 19.5 | 25 @ 16.2 | 5 | no | indexed | **KEEP** |  | web3 kol marketing agency 11@14; web3 kol agency 9@17; best web3 kol agencies 3@15 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/blog/micro-kol-vs-macro-kol-token-launch-budget` | 70 | 0 | 6.2 | 24 @ 6.7 | 4 | no | indexed | **KEEP** |  | macro kol 21@6; kol deals 1@19; kol macro 1@4 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/playbook/top-crypto-marketing-agencies-2026` | 102 | 1 | 10.4 | 22 @ 10.7 | 6 | yes | indexed | **KEEP** |  | top kol crypto marketing agency 9@17; best web3 kol agencies 7@5; top web3 kol agencies 3@13 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/playbook/best-crypto-pr-agency-singapore-2026` | 68 | 1 | 16.5 | 5 @ 51.4 | 11 | yes | indexed | **KEEP** |  | gaming kol agency sea 5@51 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/blog/crypto-kol-pricing-2026-tier-rate-card` | 58 | 0 | 7.6 | 5 @ 27.6 | 4 | no | indexed | **KEEP** |  | kol crypto 2@63; kol rate 2@3; kol fees 1@6 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/blog/crypto-kol-vetting-checklist-fraud-audit` | 17 | 0 | 6.7 | 2 @ 8.0 | 6 | no | indexed | **KEEP** |  | kol scam 2@8 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/blog/crypto-kol-brief-template-web3` | 27 | 0 | 12.0 | 1 @ 1.0 | 7 | no | indexed | **KEEP** |  | kol list template 1@1 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/blog/crypto-kol-campaign-roi-metrics` | 53 | 0 | 5.6 | 1 @ 7.0 | 5 | no | indexed | **KEEP** |  | kol marketing roi tracker 1@7 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |

## Token launch / TGE marketing  (`token-launch`)

**Owner: `/playbook/best-token-launch-marketing-agencies-2026`.** 124 family impr ('hire token launch marketing agency' 25@9, 'token launch marketing agency' 25@14), 3 clicks. /services/token-launch-pr keeps the PR sub-intent ('crypto pr for token launch' 6@13). The 158-impr 'depin wearable token launch playbook' query is DePIN intent and stays on /playbook/depin-pr-strategy-2026 (note: that page was 'Crawled - currently not indexed' on 30 Oct).

Query regex: `token launch\|\btge\b\|token generation event\|presale\|launchpad` (excluding `depin\|eigenlayer\|referral`)

| URL | Page impr | Clicks | Pos | Fam impr @ pos | Inlinks | Near-dup | Coverage 30 Oct | Rec | Target | Top family queries (impr@pos) | Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/playbook/best-token-launch-marketing-agencies-2026` | 328 | 3 | 10.7 | 151 @ 13.8 | 17 | no | indexed | **OWNER** |  | best crypto marketing agency for token launch 36@11; token launch marketing 31@13; token launch marketing agency 27@13 | Owner (see note above). |
| `/services/token-launch-pr` | 236 | 1 | 18.2 | 12 @ 30.1 | 831 | yes | indexed | **DIFFERENTIATE** |  | crypto pr for token launch 6@13; launch token generation event 2@80; press release for token launch 1@22 | Owns 'token launch PR / TGE PR'. Keep; link to owner for 'marketing agency' intent. |
| `/pages/token-launch-marketing-agency` | 26 | 0 | 14.9 | 2 @ 15.5 | 5 | no | indexed | **MERGE-301** | `/playbook/best-token-launch-marketing-agencies-2026` | token launch marketing agency for startups 2@16 | EXCEPTION (24 impr): exact owner intent ('token launch marketing agency for startups') at #16-63 vs owner #9-14; its biggest query is junk ('token launch referral' #63). |
| `/pages/crypto-token-launch-marketing-agency` | 1 | 0 | 6.0 | 0 @ - | 5 | no | indexed | **MERGE-301** | `/playbook/best-token-launch-marketing-agencies-2026` |  | 1 impr; identical intent. |
| `/pages/token-launch-pr-agency` | 3 | 0 | 6.7 | 0 @ - | 12 | no | indexed | **MERGE-301** | `/services/token-launch-pr` |  | 3 impr; token launch PR = service page. |
| `/pages/tge-pr-agency` | 3 | 0 | 5.7 | 0 @ - | 5 | no | indexed | **MERGE-301** | `/services/token-launch-pr` |  | 3 impr; TGE PR = service page. |
| `/pages/apac-token-launch-pr` | 1 | 0 | 2.0 | 0 @ - | 6 | no | indexed | **MERGE-301** | `/services/token-launch-pr` |  | 1 impr; token launch PR intent. |
| `/pages/crypto-presale-marketing-agency` | 3 | 0 | 4.7 | 0 @ - | 5 | no | indexed | **MERGE-301** | `/playbook/crypto-presale-launchpad-marketing-2026` |  | 3 impr; presale marketing intent = presale playbook (22 impr). |
| `/pages/ico-ido-marketing-agency` | 10 | 0 | 7.3 | 8 @ 7.6 | 4 | no | indexed | **DIFFERENTIATE** |  | hire token launch marketing agency 8@8 | Ranks #8 for 'hire token launch marketing agency' (8 impr) - better than owner. Keep, keep ICO/IDO framing, link to owner. |
| `/playbook/depin-pr-strategy-2026` | 162 | 0 | 9.2 | 0 @ - | 8 | no | Crawled - currently not indexed | **KEEP** |  | depin wearable token launch playbook small team 129@10 | DePIN intent; fix its indexing (not indexed 30 Oct despite 169 impr). |
| `/pages/token-launch-pr-agency-india` | 12 | 0 | 14.3 | 3 @ 7.7 | 5 | no | indexed | **KEEP** |  | token launch marketing agency 2@10; token launch pr 1@2 | Geo India token PR (12 impr). |
| `/blog/token-launch-pr-service-whats-included` | 19 | 1 | 3.8 | 2 @ 7.5 | 6 | no | indexed | **KEEP** |  | crypto pr for token launch 1@5; whats tge 1@10 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/blog/web3-startup-marketing-checklist` | 6 | 0 | 5.7 | 2 @ 3.0 | 8 | no | indexed | **KEEP** |  | protocol tge launch checklist 2@3 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/blog/apac-expansion-pr-for-ai-startups` | 33 | 0 | 10.8 | 1 @ 9.0 | 7 | yes | indexed | **KEEP** |  | best strategic launchpads for ai governance startups aiming to enter the asian corporate market. 1@9 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |

## Fractional PR / CMO / head of PR  (`fractional`)

**Owner: `/playbook/fractional-vs-agency`.** Wins: 209 family impr at #5.9 ('fractional pr vs pr agency cost' 155@4, 'fractional pr' 32@11, 'fractional pr services' 21@12). Sub-owner for 'web3 fractional cmo' is /playbook/fractional-cmo-web3-2026 (91@7).

Query regex: `fractional` (excluding `cybersecurity and growth`)

| URL | Page impr | Clicks | Pos | Fam impr @ pos | Inlinks | Near-dup | Coverage 30 Oct | Rec | Target | Top family queries (impr@pos) | Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/playbook/fractional-vs-agency` | 350 | 0 | 10.3 | 206 @ 5.9 | 49 | no | indexed | **OWNER** |  | fractional pr vs pr agency cost 151@4; fractional pr 33@11; fractional pr services 21@12 | Owner (see note above). |
| `/playbook/fractional-cmo-web3-2026` | 121 | 0 | 6.8 | 107 @ 6.9 | 5 | no | indexed | **KEEP** |  | web3 fractional cmo 107@7 | Owns 'web3 fractional cmo' (91@7). Distinct role (CMO). |
| `/pages/fractional-cmo-web3` | 45 | 0 | 9.8 | 22 @ 13.1 | 4 | no | indexed | **MERGE-301** | `/playbook/fractional-cmo-web3-2026` | web3 fractional cmo 21@13; fractional cmo services for scaling blockchain and web3 projects. 1@10 | EXCEPTION (20 impr): same query 'web3 fractional cmo' at #16 vs playbook #7; plan names this pair. |
| `/blog/fractional-head-of-pr-vs-agency-vs-in-house` | 27 | 0 | 6.6 | 22 @ 4.9 | 11 | yes | indexed | **DIFFERENTIATE** | `/playbook/fractional-vs-agency` | fractional pr vs pr agency cost 22@5 | 27 impr, ranks #5 next to owner (#4) on the same query; double listing may help, so keep. Retitle toward the 'head of PR' role comparison; link to owner. |
| `/pages/fractional-head-of-pr` | 36 | 0 | 6.2 | 0 @ - | 7 | no | indexed | **KEEP** |  |  | 39 impr; role term 'fractional head of PR' (queries anonymised). |
| `/playbook/fractional-pr-cost-pricing-2026` | 37 | 0 | 5.3 | 0 @ - | 6 | no | indexed | **KEEP** |  |  | Pricing intent (40 impr). |
| `/playbook/fractional-pr-vs-in-house-hire-2026` | 17 | 0 | 8.7 | 0 @ - | 7 | no | indexed | **KEEP** |  |  | In-house comparison (20 impr). |
| `/blog/fractional-pr-vs-crypto-agency-retainer-web3` | 19 | 0 | 4.8 | 2 @ 7.0 | 5 | yes | indexed | **KEEP** |  | fractional pr vs pr agency cost 2@7 | 16 impr; crypto-agency-retainer angle. |
| `/blog/fractional-pr-vs-crypto-pr-agency-cost-benefit` | 4 | 0 | 8.5 | 0 @ - | 4 | yes | indexed | **MERGE-301** | `/playbook/fractional-vs-agency` |  | 4 impr, near-duplicate; same 'fractional vs agency cost' intent as owner. |
| `/pages/fractional-pr-consultant-web3` | 3 | 0 | 2.7 | 0 @ - | 6 | yes | indexed | **MERGE-301** | `/playbook/best-fractional-pr-consultant-web3-2026` |  | 3 impr, near-duplicate; same 'fractional PR consultant web3' intent. |
| `/pages/fractional-pr-consultant` | 3 | 0 | 3.0 | 0 @ - | 7 | no | indexed | **KEEP** |  |  | 3 impr, not dup-flagged; leave. |
| `/blog/fractional-pr-for-ai-startups-how-it-works` | 38 | 0 | 3.2 | 1 @ 10.0 | 14 | yes | indexed | **KEEP** |  | fractional pr 1@10 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/playbook/best-b2b-saas-pr-agencies-2026` | 1635 | 0 | 12.0 | 1 @ 10.0 | 21 | yes | indexed | **KEEP** |  | fractional pr vs pr agency cost 1@10 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |
| `/blog/web3-pr-campaign-service-explained` | 3 | 0 | 28.7 | 1 @ 12.0 | 5 | no | indexed | **KEEP** |  | web3 fractional cmo 1@12 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |

## Web3 / crypto marketing agency  (`web3-marketing-agency`)

**Owner: `/playbook/top-crypto-marketing-agencies-2026`.** Thin family (most 'web3 marketing' impressions are 'apac web3 marketing market', a market-sizing query on /apac). The listicle has the most matched impressions and the only click (101 impr, 1 click, #10.8).

Query regex: `(web ?3\|crypto\|blockchain) marketing (agenc\|firm\|compan\|service)\|marketing agenc\w* (for )?(web ?3\|crypto)` (excluding `token launch\|kol\|market$`)

| URL | Page impr | Clicks | Pos | Fam impr @ pos | Inlinks | Near-dup | Coverage 30 Oct | Rec | Target | Top family queries (impr@pos) | Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/playbook/top-crypto-marketing-agencies-2026` | 102 | 1 | 10.4 | 1 @ 7.0 | 6 | yes | indexed | **OWNER** |  | which crypto marketing agencies are actually worth the retainer 1@7 | Owner (see note above). |
| `/pages/best-web3-marketing-agency` | 76 | 0 | 19.5 | 0 @ - | 5 | no | indexed | **DIFFERENTIATE** | `/playbook/top-crypto-marketing-agencies-2026` | best ai marketing web3 agency near me 13@10; web3 kol marketing agency 11@14; web3 kol agency 9@17 | 74 impr (>=20), mostly 'web3 kol agency' queries. Keep; retitle toward 'Web3 KOL & growth agency', link to owner and to /services/kol-marketing. |
| `/pages/web3-marketing-agency` | 6 | 0 | 6.8 | 1 @ 10.0 | 4 | yes | indexed | **MERGE-301** | `/playbook/top-crypto-marketing-agencies-2026` | how to vet a web3 marketing agency before hiring 1@10 | 4 impr, near-duplicate; same agency-shopping intent. |
| `/pages/top-crypto-marketing-agency` | 34 | 0 | 8.4 | 0 @ - | 5 | no | indexed | **MERGE-301** | `/playbook/top-crypto-marketing-agencies-2026` | koinpr 1@2 | 0 impr; identical title intent to owner. |
| `/playbook/web3-marketing-agency-guide-2026` | 3 | 0 | 3.0 | 0 @ - | 8 | yes | indexed | **MERGE-301** | `/playbook/top-crypto-marketing-agencies-2026` |  | 2 impr, near-duplicate; same agency-choice intent. |
| `/blog/web3-agency-truths-before-you-sign` | 6 | 0 | 6.5 | 3 @ 8.0 | 23 | no | indexed | **KEEP** |  | how to vet a web3 marketing agency before hiring 3@8 | Vetting intent, 23 inlinks. |
| `/pages/crypto-marketing-agency-india` | 8 | 0 | 19.2 | 0 @ - | 5 | no | indexed | **KEEP** |  |  | Geo India. |

## Crypto press release  (`crypto-press-release`)

**Owner: `/playbook/best-crypto-press-release-services-2026`.** Most matched impressions at the best position ('best crypto press release distribution services 2026' #2, 'chainwire vs pr newswire' #4). 'cointelegraph submit press release' (3,204 impr) is a navigational query owned by the top page /playbook/how-to-pitch-cointelegraph-2026 and is excluded so it doesn't decide this owner (no change to that page).

Query regex: `(crypto\|web ?3\|token\|blockchain\|chainwire\|cointelegraph\|coindesk).*press release\|press release.*(crypto\|token\|web ?3\|blockchain\|cointelegraph)\|chainwire\|wire distribution` (excluding `cointelegraph submit press release`)

| URL | Page impr | Clicks | Pos | Fam impr @ pos | Inlinks | Near-dup | Coverage 30 Oct | Rec | Target | Top family queries (impr@pos) | Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/playbook/best-crypto-press-release-services-2026` | 131 | 1 | 8.8 | 31 @ 5.2 | 5 | yes | indexed | **OWNER** |  | chainwire vs pr newswire for crypto announcements 19@4; cointelegraph press release cost 7@12; best crypto press release distribution services 2026 5@2 | Owner (see note above). |
| `/playbook/crypto-press-release-distribution-2026` | 65 | 0 | 6.9 | 13 @ 6.8 | 12 | yes | indexed | **DIFFERENTIATE** |  | chainwire vs pr newswire for crypto announcements 5@5; native distribution vs wire distribution 5@3; cointelegraph press release cost 3@16 | 65 impr; overlaps on 'chainwire vs pr newswire'. Keep as the how-distribution-works guide, link to owner for 'services'. |
| `/pages/crypto-press-release-distribution-service` | 6 | 0 | 6.3 | 3 @ 3.7 | 6 | no | indexed | **MERGE-301** | `/playbook/crypto-press-release-distribution-2026` | crypto wire distribution 3@4 | 6 impr; 'crypto wire distribution' intent = distribution playbook. |
| `/pages/crypto-press-release-service` | 0 | 0 | - | 0 @ - | 5 | no | Crawled - currently not indexed | **MERGE-301** | `/playbook/best-crypto-press-release-services-2026` |  | 0 impr, not indexed; same services intent. |
| `/playbook/how-to-write-crypto-press-release-2026` | 2 | 0 | 4.5 | 0 @ - | 16 | no | indexed | **KEEP** |  |  | Writing intent, 16 inlinks. |
| `/playbook/how-to-pitch-cointelegraph-2026` | 3644 | 7 | 8.8 | 0 @ - | 24 | yes | indexed | **KEEP** |  | cointelegraph submit press release 3211@9; yes 1@5; cointelegraph magazine 1@9 | Top page; owns the navigational 'cointelegraph submit press release' (3,204 impr). Only add. |
| `/services/token-launch-pr` | 236 | 1 | 18.2 | 2 @ 28.0 | 831 | yes | indexed | **KEEP** |  | press release for token launch 1@22; token launch press release 1@34 | Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant. |

## Geo: crypto/web3 PR + India  (`geo-india`)

**Owner: `/playbook/best-web3-pr-agency-india-2026`.** Best-positioned PR-intent URL (45 impr, #7, 1 click). /india has 1,257 impr but it is market-sizing traffic ('india blockchain ai market') at #49, 1 click.

Query regex: `(?=.*\b(india\|indian))(?=.*\b(crypto\|web ?3\|blockchain)\b)(?=.*\b(pr\|public relations\|agenc\w*\|firms?\|publicist\|media\|press\|outlets?)\b)` (excluding `kol\|market\b`)

| URL | Page impr | Clicks | Pos | Fam impr @ pos | Inlinks | Near-dup | Coverage 30 Oct | Rec | Target | Top family queries (impr@pos) | Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/playbook/best-web3-pr-agency-india-2026` | 84 | 1 | 6.8 | 0 @ - | 7 | no | indexed | **OWNER** |  | inc42 alternatives 48@6; apac web3 in retail market 2@31; india web3 in retail market 1@4 | Owner (see note above). |
| `/india` | 1236 | 1 | 49.2 | 0 @ - | 737 | no | indexed | **DIFFERENTIATE** |  | india web3 in retail market 145@20; india blockchain ai market 127@47; india web 3 0 blockchain market 69@61 | Hub: market-research impressions. Retarget title/H1 to 'Web3 & crypto PR in India' (audit item 8) and link to owner. |
| `/pages/web3-pr-agency-india` | 14 | 0 | 6.4 | 0 @ - | 6 | no | indexed | **MERGE-301** | `/playbook/best-web3-pr-agency-india-2026` |  | 16 impr; same India agency intent. |
| `/pages/india-crypto-pr-agency` | 2 | 0 | 9.5 | 0 @ - | 4 | no | indexed | **MERGE-301** | `/playbook/best-web3-pr-agency-india-2026` |  | 2 impr; same intent. |
| `/blog/india-web3-pr-playbook-inc42-et-tech-business-standard` | 2 | 0 | 13.5 | 0 @ - | 6 | no | indexed | **KEEP** |  |  | Outlet playbook. |

## Geo: crypto/web3 PR + Singapore  (`geo-singapore`)

**Owner: `/playbook/best-crypto-pr-agency-singapore-2026`.** 68 impr, 1 click, #16; the only Singapore URL with PR-intent clicks.

Query regex: `(?=.*\b(singapore))(?=.*\b(crypto\|web ?3\|blockchain)\b)(?=.*\b(pr\|public relations\|agenc\w*\|firms?\|publicist\|media\|press\|outlets?)\b)` (excluding `kol\|market\b`)

| URL | Page impr | Clicks | Pos | Fam impr @ pos | Inlinks | Near-dup | Coverage 30 Oct | Rec | Target | Top family queries (impr@pos) | Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/playbook/best-crypto-pr-agency-singapore-2026` | 68 | 1 | 16.5 | 0 @ - | 11 | yes | indexed | **OWNER** |  | crypto pr 10@30; gaming kol agency sea 5@51; which public relations company in singapore is best for building corporate credibility with institutional investors? 1@7 | Owner (see note above). |
| `/singapore` | 634 | 0 | 35.5 | 0 @ - | 737 | no | indexed | **DIFFERENTIATE** |  | web 3 singapore 92@89; bitcoin xai in singapore 6@44; bitcoin xai singapore 2@53 | Hub: 'web 3 singapore' market traffic at #36. Retarget H1 to PR-in-Singapore; link to owner. |
| `/pages/crypto-pr-agency-singapore` | 4 | 0 | 5.8 | 0 @ - | 5 | no | indexed | **MERGE-301** | `/playbook/best-crypto-pr-agency-singapore-2026` |  | 4 impr; same intent. |
| `/blog/singapore-web3-pr-mas-dtsp-token2049-playbook` | 5 | 0 | 4.4 | 0 @ - | 4 | no | indexed | **KEEP** |  |  | Regulatory/event angle. |

## Geo: crypto/web3 PR + Korea  (`geo-korea`)

**Owner: `/pages/crypto-pr-agency-korea`.** Near tie on impressions (playbook 15 vs /pages twins 14 each); /pages/crypto-pr-agency-korea has the better position (#5.9 vs #10.8), the only click and no near-dup flag, so it owns the agency term. Only its twin is redirected.

Query regex: `(?=.*\b(korea))(?=.*\b(crypto\|web ?3\|blockchain)\b)(?=.*\b(pr\|public relations\|agenc\w*\|firms?\|publicist\|media\|press\|outlets?)\b)` (excluding `kol\|market\b`)

| URL | Page impr | Clicks | Pos | Fam impr @ pos | Inlinks | Near-dup | Coverage 30 Oct | Rec | Target | Top family queries (impr@pos) | Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/pages/crypto-pr-agency-korea` | 14 | 1 | 5.9 | 0 @ - | 5 | no | indexed | **OWNER** |  |  | Owner (see note above). |
| `/korea` | 490 | 1 | 21.2 | 0 @ - | 737 | no | indexed | **DIFFERENTIATE** |  | south korea blockchain identity management market 25@66; south korea blockchain iot market 9@74; korea blockchain week logo 1@59 | Hub: market-sizing traffic. Retarget to 'crypto PR in Korea'; link to owner. |
| `/playbook/crypto-pr-korea-2026` | 12 | 0 | 12.8 | 0 @ - | 11 | yes | indexed | **DIFFERENTIATE** | `/pages/crypto-pr-agency-korea` |  | 15 impr, near-dup flag, 11 inlinks. Keep as the Korea outlets/KOL guide; link to owner. |
| `/pages/korea-crypto-pr-agency` | 13 | 0 | 7.3 | 0 @ - | 4 | no | indexed | **MERGE-301** | `/pages/crypto-pr-agency-korea` |  | 14 impr; twin of the owner (same title intent), worse position (#7.4). |
| `/pages/korea-japan-crypto-pr` | 8 | 0 | 5.8 | 0 @ - | 5 | no | indexed | **MERGE-301** | `/services/apac-pr` |  | 8 impr; multi-market intent = APAC service. |

## Geo: crypto/web3 PR + Japan  (`geo-japan`)

**Owner: `/playbook/crypto-pr-japan-2026`.** 46 impr at #15, most of any Japan PR URL.

Query regex: `(?=.*\b(japan))(?=.*\b(crypto\|web ?3\|blockchain)\b)(?=.*\b(pr\|public relations\|agenc\w*\|firms?\|publicist\|media\|press\|outlets?)\b)` (excluding `kol\|market\b`)

| URL | Page impr | Clicks | Pos | Fam impr @ pos | Inlinks | Near-dup | Coverage 30 Oct | Rec | Target | Top family queries (impr@pos) | Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/playbook/crypto-pr-japan-2026` | 45 | 0 | 15.2 | 0 @ - | 7 | no | indexed | **OWNER** |  |  | Owner (see note above). |
| `/japan` | 188 | 0 | 43.6 | 0 @ - | 737 | no | indexed | **DIFFERENTIATE** |  | japan web3 in retail market 58@40; japan web 3 0 blockchain market 27@65; japan blockchain ai market 8@55 | Hub: 'japan web3 in retail market' traffic. Retarget; link to owner. |
| `/pages/crypto-pr-agency-japan` | 7 | 0 | 8.1 | 0 @ - | 5 | no | indexed | **MERGE-301** | `/playbook/crypto-pr-japan-2026` |  | 7 impr; same intent. |
| `/pages/japan-crypto-pr-agency` | 3 | 0 | 5.3 | 0 @ - | 4 | no | indexed | **MERGE-301** | `/playbook/crypto-pr-japan-2026` |  | 3 impr; twin page. |
| `/blog/japan-web3-pr-coinpost-crypto-times-fsa-2026` | 61 | 0 | 8.2 | 0 @ - | 5 | no | indexed | **KEEP** |  | coinpost japan 1@14; crypto 1@10 | Outlet guide (impressions are mostly scraper queries). |

## Geo: crypto/web3 PR + Dubai / UAE / MENA  (`geo-dubai-mena`)

**Owner: `/playbook/crypto-pr-dubai-mena-2026`.** Playbook preferred (6 impr at #4.3, 6 inlinks). The /blog service post has more impressions (17) but at #16 and is a blog; the hub is #57 market traffic.

Query regex: `(?=.*\b(dubai\|uae\|mena\|abu dhabi\|saudi))(?=.*\b(crypto\|web ?3\|blockchain)\b)(?=.*\b(pr\|public relations\|agenc\w*\|firms?\|publicist\|media\|press\|outlets?)\b)` (excluding `kol\|market\b`)

| URL | Page impr | Clicks | Pos | Fam impr @ pos | Inlinks | Near-dup | Coverage 30 Oct | Rec | Target | Top family queries (impr@pos) | Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/playbook/crypto-pr-dubai-mena-2026` | 6 | 0 | 4.3 | 0 @ - | 6 | no | indexed | **OWNER** |  |  | Owner (see note above). |
| `/dubai-mena` | 139 | 0 | 56.8 | 0 @ - | 737 | no | indexed | **DIFFERENTIATE** |  | rak dao web3 license 8@97; rak dao web3 entity setup 2@97; arabianchain technology 1@84 | Hub; retarget to 'crypto PR in Dubai & MENA'; link to owner. |
| `/blog/dubai-mena-crypto-pr-service` | 18 | 0 | 15.6 | 0 @ - | 4 | no | indexed | **DIFFERENTIATE** | `/playbook/crypto-pr-dubai-mena-2026` |  | 17 impr; service-description post. Keep, link to owner. |
| `/pages/crypto-pr-agency-dubai` | 2 | 0 | 5.0 | 0 @ - | 6 | yes | indexed | **MERGE-301** | `/playbook/crypto-pr-dubai-mena-2026` |  | 2 impr, near-duplicate. |
| `/pages/mena-crypto-pr-agency` | 2 | 0 | 7.5 | 0 @ - | 5 | no | indexed | **MERGE-301** | `/playbook/crypto-pr-dubai-mena-2026` |  | 2 impr; same intent. |
| `/pages/web3-pr-agency-uae` | 3 | 0 | 9.3 | 0 @ - | 5 | no | indexed | **MERGE-301** | `/playbook/crypto-pr-dubai-mena-2026` |  | 3 impr; same intent. |
| `/blog/mena-crypto-pr-playbook-uae-saudi-token2049-dubai` | 7 | 0 | 15.4 | 0 @ - | 7 | yes | indexed | **MERGE-301** | `/playbook/crypto-pr-dubai-mena-2026` |  | 6 impr, near-duplicate of the owner playbook. |

## Geo: crypto/web3 PR + UK  (`geo-uk`)

**Owner: `/pages/crypto-pr-agency-uk`.** Only UK URL (5 impr, #5.6). Keep as-is.

Query regex: `(?=.*\b(\buk\b\|london\|united kingdom\|britain))(?=.*\b(crypto\|web ?3\|blockchain)\b)(?=.*\b(pr\|public relations\|agenc\w*\|firms?\|publicist\|media\|press\|outlets?)\b)` (excluding `kol\|market\b`)

| URL | Page impr | Clicks | Pos | Fam impr @ pos | Inlinks | Near-dup | Coverage 30 Oct | Rec | Target | Top family queries (impr@pos) | Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/pages/crypto-pr-agency-uk` | 5 | 0 | 5.6 | 0 @ - | 5 | no | indexed | **OWNER** |  |  | Owner (see note above). |

## Geo: crypto/web3 PR + USA  (`geo-usa`)

**Owner: `/playbook/best-web3-pr-agency-usa-2026`.** 26 impr at #10.

Query regex: `(?=.*\b(\busa?\b\|america\|united states))(?=.*\b(crypto\|web ?3\|blockchain)\b)(?=.*\b(pr\|public relations\|agenc\w*\|firms?\|publicist\|media\|press\|outlets?)\b)` (excluding `kol\|market\b`)

| URL | Page impr | Clicks | Pos | Fam impr @ pos | Inlinks | Near-dup | Coverage 30 Oct | Rec | Target | Top family queries (impr@pos) | Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/playbook/best-web3-pr-agency-usa-2026` | 24 | 0 | 9.6 | 0 @ - | 5 | yes | indexed | **OWNER** |  | web3 pr agencies 2@13; web3 pr agency 2@34; what are the latest trends in public relations for cryptocurrency startups? 1@9 | Owner (see note above). |
| `/pages/web3-pr-agency-usa` | 5 | 0 | 5.4 | 0 @ - | 5 | no | indexed | **MERGE-301** | `/playbook/best-web3-pr-agency-usa-2026` |  | 5 impr; same intent. |

## Geo: crypto/web3 PR + Vietnam  (`geo-vietnam`)

**Owner: `/playbook/crypto-pr-vietnam-2026`.** 24 impr at #5.8.

Query regex: `(?=.*\b(vietnam))(?=.*\b(crypto\|web ?3\|blockchain)\b)(?=.*\b(pr\|public relations\|agenc\w*\|firms?\|publicist\|media\|press\|outlets?)\b)` (excluding `kol\|market\b`)

| URL | Page impr | Clicks | Pos | Fam impr @ pos | Inlinks | Near-dup | Coverage 30 Oct | Rec | Target | Top family queries (impr@pos) | Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/playbook/crypto-pr-vietnam-2026` | 22 | 0 | 5.5 | 0 @ - | 5 | no | indexed | **OWNER** |  |  | Owner (see note above). |
| `/pages/crypto-pr-agency-vietnam` | 4 | 0 | 15.5 | 0 @ - | 5 | no | indexed | **MERGE-301** | `/playbook/crypto-pr-vietnam-2026` |  | 5 impr; same intent. |
| `/blog/vietnam-web3-pr-playbook-2026` | 149 | 1 | 12.8 | 0 @ - | 5 | yes | indexed | **KEEP** |  |  | 143 impr but ~all scraper queries ('web3 "community lead" @gmail'); near-dup flag. Keep; review in prune. |
| `/blog/web3-pr-southeast-asia-vietnam-indonesia-thailand` | 41 | 0 | 7.6 | 0 @ - | 5 | no | indexed | **KEEP** |  | apac web3 marketing market 14@11 | SEA angle. |

## Geo: crypto/web3 PR + APAC (multi-market)  (`geo-apac`)

**Owner: `/services/apac-pr`.** Service page for multi-market APAC PR (175 impr).

Query regex: `(?=.*\b(apac\|asia))(?=.*\b(crypto\|web ?3\|blockchain)\b)(?=.*\b(pr\|public relations\|agenc\w*\|firms?\|publicist\|media\|press\|outlets?)\b)` (excluding `kol\|market\b`)

| URL | Page impr | Clicks | Pos | Fam impr @ pos | Inlinks | Near-dup | Coverage 30 Oct | Rec | Target | Top family queries (impr@pos) | Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/services/apac-pr` | 171 | 0 | 31.8 | 0 @ - | 831 | no | indexed | **OWNER** |  | apac web3 in retail market 30@96; apac crypto 3@36; apac blockchain fintech market 1@94 | Owner (see note above). |
| `/apac` | 579 | 0 | 28.4 | 0 @ - | 737 | yes | indexed | **DIFFERENTIATE** |  | apac web3 marketing market 129@65; apac web3 in retail market 103@37; apac geofencing market 10@70 | 611 impr, near-dup flag, mostly 'apac web3 marketing market'. Keep; link to owner. |
| `/pages/apac-crypto-pr-agency` | 3 | 0 | 12.0 | 0 @ - | 6 | no | indexed | **MERGE-301** | `/services/apac-pr` | media placement apac 3@12 | 3 impr; same intent. |

## Other near-duplicate /pages (no family above)  (`other-near-dups`)

| URL | Page impr | Clicks | Pos | Fam impr @ pos | Inlinks | Near-dup | Coverage 30 Oct | Rec | Target | Top family queries (impr@pos) | Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/pages/b2b-saas-pr-agency` | 0 | 0 | - | 0 @ - | 8 | yes | Crawled - currently not indexed | **MERGE-301** | `/playbook/best-b2b-saas-pr-agencies-2026` |  | 0 impr, near-duplicate; listicle has 1,128 impr. |
| `/pages/b2b-tech-pr-agency` | 5 | 0 | 7.8 | 0 @ - | 7 | yes | indexed | **MERGE-301** | `/playbook/b2b-tech-pr-guide-2026` | b2b tech analysts 1@13; what are the best pr services for securing coverage in tech trades (techcrunch, venturebeat) for saas? 1@11 | 6 impr, near-duplicate; B2B tech PR guide has 25 impr at #5.6. |
| `/pages/pr-agency-for-tech-startups` | 0 | 0 | - | 0 @ - | 7 | yes | Crawled - currently not indexed | **MERGE-301** | `/playbook/pr-for-tech-startups-guide-2026` |  | 0 impr, near-duplicate; same intent. |
| `/pages/op-ed-ghostwriting-service` | 6 | 0 | 4.5 | 0 @ - | 7 | yes | indexed | **MERGE-301** | `/playbook/op-ed-ghostwriting-executives-2026` |  | 7 impr, near-duplicate; op-ed ghostwriting playbook has 15 impr, 13 inlinks. |
| `/pages/founder-personal-branding-agency` | 21 | 0 | 6.6 | 0 @ - | 7 | yes | indexed | **DIFFERENTIATE** | `/services/founder-profiling` |  | 21 impr (>=20). Keep; link to /services/founder-profiling; avoid 'agency' overlap with /playbook/best-founder-personal-branding-agencies-2026. |

## Proposed redirect map

Add to `next.config.ts` `redirects()` as `permanent: true` in one deploy (plan week 3-4), after moving any unique copy into the target. S approves rows marked EXCEPTION.

Tier A = 0-5 impressions (near-zero). Tier B = 6-19 (low; same intent as a stronger URL). Tier C = EXCEPTION (>= 20, reason given; S approves). **Before deploy, check Bing Webmaster Tools: per plan weeks 3-4, do not redirect any URL that holds a Bing top-10 position** (no Bing data was available for this map). 301s that carry clicks: `/pages/ai-pr-consultant` (1).

| Tier | From | To | 90d impr (from) | Clicks | Family | To = family owner? | Reason |
|---|---|---|---|---|---|---|---|
| A | `/pages/ai-pr-agency-india` | `/playbook/ai-startup-pr-agency-india-2026` | 5 | 0 | ai-pr | no (intent-matched sibling) | 5 impr; same India AI PR intent as the India playbook. |
| A | `/pages/enterprise-ai-pr-agency` | `/playbook/enterprise-ai-pr-2026` | 3 | 0 | ai-pr | no (intent-matched sibling) | 3 impr, near-duplicate, not indexed; enterprise AI PR intent. |
| A | `/pages/healthcare-ai-pr-agency` | `/services/ai-startup-pr` | 1 | 0 | ai-pr | yes | 1 impr, near-duplicate; no healthcare-AI page with impressions. |
| A | `/pages/blockchain-gaming-pr-agency` | `/playbook/blockchain-gaming-pr-2026` | 0 | 0 | blockchain-pr | no (intent-matched sibling) | 0 impr, near-duplicate; gaming PR intent = blockchain-gaming playbook. |
| A | `/pages/layer2-pr-agency` | `/blog/l1-l2-blockchain-pr-narrative-differentiation-playbook` | 2 | 0 | blockchain-pr | no (intent-matched sibling) | 2 impr, near-duplicate; L2 PR intent = the L1/L2 PR playbook post. |
| A | `/pages/affordable-crypto-pr-agency` | `/playbook/crypto-pr-small-budget-2026` | 3 | 0 | crypto-pr-agency | no (intent-matched sibling) | 4 impr; budget intent = small-budget playbook (not dup-flagged, 10 inlinks). |
| A | `/pages/best-crypto-pr-agency` | `/playbook/best-web3-pr-agencies-2026` | 1 | 0 | crypto-pr-agency | yes | 1 impr, near-duplicate; identical 'best crypto PR agency' intent as owner. |
| A | `/pages/crypto-pr-agency-small-budget` | `/playbook/crypto-pr-small-budget-2026` | 1 | 0 | crypto-pr-agency | no (intent-matched sibling) | 1 impr; same budget intent. |
| A | `/pages/crypto-pr-consultant` | `/services/web3-pr-campaigns` | 2 | 0 | crypto-pr-agency | no (intent-matched sibling) | 2 impr, near-duplicate; 'hire a senior crypto PR consultant' = the service page (title already 'Senior Operator'). |
| A | `/pages/crypto-publicist` | `/playbook/crypto-publicist-vs-agency-2026` | 1 | 0 | crypto-pr-agency | no (intent-matched sibling) | 1 impr, near-duplicate; same publicist intent as the publicist-vs-agency playbook (indexed, not dup). |
| A | `/playbook/how-to-choose-web3-pr-agency-checklist-2026` | `/playbook/crypto-pr-agency-comparison-2026` | 3 | 0 | crypto-pr-agency | no (intent-matched sibling) | 3 impr, near-duplicate flag; same 'how to choose/compare an agency' intent as the comparison playbook. |
| A | `/pages/crypto-press-release-service` | `/playbook/best-crypto-press-release-services-2026` | 0 | 0 | crypto-press-release | yes | 0 impr, not indexed; same services intent. NOTE: target is a best-X page with no named firms (see dependency section). |
| A | `/pages/cybersecurity-pr-agency` | `/services/cybersecurity-pr` | 2 | 0 | cybersecurity-pr | yes | 2 impr, near-duplicate; identical intent. |
| A | `/pages/cybersecurity-pr-agency-usa` | `/services/cybersecurity-pr` | 1 | 0 | cybersecurity-pr | yes | 1 impr at #62; US is the default market for the owner. |
| A | `/blog/fractional-pr-vs-crypto-pr-agency-cost-benefit` | `/playbook/fractional-vs-agency` | 4 | 0 | fractional | yes | 4 impr, near-duplicate; same 'fractional vs agency cost' intent as owner. |
| A | `/pages/fractional-pr-consultant-web3` | `/playbook/best-fractional-pr-consultant-web3-2026` | 3 | 0 | fractional | no (intent-matched sibling) | 3 impr, near-duplicate; same 'fractional PR consultant web3' intent. NOTE: target is a best-X page with no named firms (see dependency section). |
| A | `/pages/apac-crypto-pr-agency` | `/services/apac-pr` | 3 | 0 | geo-apac | yes | 3 impr; same intent. |
| A | `/pages/crypto-pr-agency-dubai` | `/playbook/crypto-pr-dubai-mena-2026` | 2 | 0 | geo-dubai-mena | yes | 2 impr, near-duplicate. |
| A | `/pages/mena-crypto-pr-agency` | `/playbook/crypto-pr-dubai-mena-2026` | 2 | 0 | geo-dubai-mena | yes | 2 impr; same intent. |
| A | `/pages/web3-pr-agency-uae` | `/playbook/crypto-pr-dubai-mena-2026` | 3 | 0 | geo-dubai-mena | yes | 3 impr; same intent. |
| A | `/pages/india-crypto-pr-agency` | `/playbook/best-web3-pr-agency-india-2026` | 2 | 0 | geo-india | yes | 2 impr; same intent. NOTE: target is a best-X page with no named firms (see dependency section). |
| A | `/pages/japan-crypto-pr-agency` | `/playbook/crypto-pr-japan-2026` | 3 | 0 | geo-japan | yes | 3 impr; twin page. |
| A | `/pages/crypto-pr-agency-singapore` | `/playbook/best-crypto-pr-agency-singapore-2026` | 4 | 0 | geo-singapore | yes | 4 impr; same intent. NOTE: target is a best-X page with no named firms (see dependency section). |
| A | `/pages/web3-pr-agency-usa` | `/playbook/best-web3-pr-agency-usa-2026` | 5 | 0 | geo-usa | yes | 5 impr; same intent. NOTE: target is a best-X page with no named firms (see dependency section). |
| A | `/pages/crypto-pr-agency-vietnam` | `/playbook/crypto-pr-vietnam-2026` | 4 | 0 | geo-vietnam | yes | 5 impr; same intent. |
| A | `/pages/b2b-saas-pr-agency` | `/playbook/best-b2b-saas-pr-agencies-2026` | 0 | 0 | other-near-dups | no (intent-matched sibling) | 0 impr, near-duplicate; listicle has 1,128 impr. NOTE: target is a best-X page with no named firms (see dependency section). |
| A | `/pages/b2b-tech-pr-agency` | `/playbook/b2b-tech-pr-guide-2026` | 5 | 0 | other-near-dups | no (intent-matched sibling) | 6 impr, near-duplicate; B2B tech PR guide has 25 impr at #5.6. |
| A | `/pages/pr-agency-for-tech-startups` | `/playbook/pr-for-tech-startups-guide-2026` | 0 | 0 | other-near-dups | no (intent-matched sibling) | 0 impr, near-duplicate; same intent. |
| A | `/pages/apac-token-launch-pr` | `/services/token-launch-pr` | 1 | 0 | token-launch | no (intent-matched sibling) | 1 impr; token launch PR intent. |
| A | `/pages/crypto-presale-marketing-agency` | `/playbook/crypto-presale-launchpad-marketing-2026` | 3 | 0 | token-launch | no (intent-matched sibling) | 3 impr; presale marketing intent = presale playbook (22 impr). |
| A | `/pages/crypto-token-launch-marketing-agency` | `/playbook/best-token-launch-marketing-agencies-2026` | 1 | 0 | token-launch | yes | 1 impr; identical intent. NOTE: target is a best-X page with no named firms (see dependency section). |
| A | `/pages/tge-pr-agency` | `/services/token-launch-pr` | 3 | 0 | token-launch | no (intent-matched sibling) | 3 impr; TGE PR = service page. |
| A | `/pages/token-launch-pr-agency` | `/services/token-launch-pr` | 3 | 0 | token-launch | no (intent-matched sibling) | 3 impr; token launch PR = service page. |
| A | `/playbook/web3-marketing-agency-guide-2026` | `/playbook/top-crypto-marketing-agencies-2026` | 3 | 0 | web3-marketing-agency | yes | 2 impr, near-duplicate; same agency-choice intent. NOTE: target is a best-X page with no named firms (see dependency section). |
| B | `/pages/ai-pr-consultant` | `/services/ai-startup-pr` | 6 | 1 | ai-pr | yes | 6 impr (1 click), near-duplicate; hire-a-consultant intent = service page. |
| B | `/pages/ai-publicist` | `/playbook/what-is-an-ai-publicist-2026` | 10 | 0 | ai-pr | no (intent-matched sibling) | 10 impr, near-duplicate; publicist intent = the AI publicist playbook (40 impr). |
| B | `/pages/ai-startup-pr-agency` | `/services/ai-startup-pr` | 11 | 0 | ai-pr | yes | 11 impr, near-duplicate; identical intent to owner. |
| B | `/pages/generative-ai-pr-agency` | `/services/ai-startup-pr` | 23 | 0 | ai-pr | yes | 18 impr, near-duplicate; generative-AI PR = AI startup PR intent. |
| B | `/pages/crypto-pr-agency-for-startups` | `/services/web3-pr-campaigns` | 12 | 0 | crypto-pr-agency | no (intent-matched sibling) | 12 impr, near-duplicate. Its only query 'pr for crypto startup' (9@24) is the twin of 'pr for web3 startup' which the service page already holds at #13. |
| B | `/pages/crypto-press-release-distribution-service` | `/playbook/crypto-press-release-distribution-2026` | 6 | 0 | crypto-press-release | no (intent-matched sibling) | 6 impr; 'crypto wire distribution' intent = distribution playbook. |
| B | `/blog/mena-crypto-pr-playbook-uae-saudi-token2049-dubai` | `/playbook/crypto-pr-dubai-mena-2026` | 7 | 0 | geo-dubai-mena | yes | 6 impr, near-duplicate of the owner playbook. |
| B | `/pages/web3-pr-agency-india` | `/playbook/best-web3-pr-agency-india-2026` | 14 | 0 | geo-india | yes | 16 impr; same India agency intent. NOTE: target is a best-X page with no named firms (see dependency section). |
| B | `/pages/crypto-pr-agency-japan` | `/playbook/crypto-pr-japan-2026` | 7 | 0 | geo-japan | yes | 7 impr; same intent. |
| B | `/pages/korea-crypto-pr-agency` | `/pages/crypto-pr-agency-korea` | 13 | 0 | geo-korea | yes | 14 impr; twin of the owner (same title intent), worse position (#7.4). |
| B | `/pages/korea-japan-crypto-pr` | `/services/apac-pr` | 8 | 0 | geo-korea | yes | 8 impr; multi-market intent = APAC service. |
| B | `/pages/crypto-influencer-marketing-agency` | `/services/kol-marketing` | 9 | 0 | kol | yes | 9 impr, not indexed; influencer = KOL intent. |
| B | `/pages/crypto-kol-agency-korea` | `/pages/korea-kol-marketing-agency` | 8 | 0 | kol | no (intent-matched sibling) | 8 impr; twin of the Korea KOL page (9 impr). |
| B | `/pages/crypto-kol-marketing-agency` | `/services/kol-marketing` | 16 | 0 | kol | yes | 15 impr; hire-an-agency intent identical to the service page. |
| B | `/pages/crypto-twitter-kol-marketing` | `/services/kol-marketing` | 9 | 0 | kol | yes | 9 impr, not indexed; X/Twitter KOL is part of the service. |
| B | `/pages/op-ed-ghostwriting-service` | `/playbook/op-ed-ghostwriting-executives-2026` | 6 | 0 | other-near-dups | no (intent-matched sibling) | 7 impr, near-duplicate; op-ed ghostwriting playbook has 15 impr, 13 inlinks. |
| B | `/pages/top-crypto-marketing-agency` | `/playbook/top-crypto-marketing-agencies-2026` | 34 | 0 | web3-marketing-agency | yes | 0 impr; identical title intent to owner. NOTE: target is a best-X page with no named firms (see dependency section). |
| B | `/pages/web3-marketing-agency` | `/playbook/top-crypto-marketing-agencies-2026` | 6 | 0 | web3-marketing-agency | yes | 4 impr, near-duplicate; same agency-shopping intent. NOTE: target is a best-X page with no named firms (see dependency section). |
| C | `/pages/ai-pr-agency` | `/services/ai-startup-pr` | 21 | 0 | ai-pr | yes | EXCEPTION (21 impr): same commercial intent as the owner, and Google already dropped it (Crawled - currently not indexed on 30 Oct), so the 21 impressions are historical. |
| C | `/pages/defi-pr-agency` | `/playbook/best-defi-pr-agency-2026` | 116 | 0 | defi-pr | yes | EXCEPTION (110 impr): ranks for the SAME queries ('defi pr agency', 'defi pr agencies') at the SAME #11 as the owner, so the two split one SERP slot; plan week 2 names this exact pair. Merge its unique copy into the owner first, then 301. S approves. NOTE: target is a best-X page with no named firms (see dependency section). |
| C | `/pages/fractional-cmo-web3` | `/playbook/fractional-cmo-web3-2026` | 45 | 0 | fractional | no (intent-matched sibling) | EXCEPTION (20 impr): same query 'web3 fractional cmo' at #16 vs playbook #7; plan names this pair. |
| C | `/pages/token-launch-marketing-agency` | `/playbook/best-token-launch-marketing-agencies-2026` | 26 | 0 | token-launch | yes | EXCEPTION (24 impr): exact owner intent ('token launch marketing agency for startups') at #16-63 vs owner #9-14; its biggest query is junk ('token launch referral' #63). NOTE: target is a best-X page with no named firms (see dependency section). |

## Dependency on the best-X rebuild (plan weeks 10-12)

Only `/playbook/best-web3-pr-agencies-2026` names firms (numbered firm h2s in the 3 Nov crawl). The plan rebuilds the "best X" playbooks that name no firms, or redirects any that cannot be sourced honestly. The URLs below are owners or 301 targets in this map, so they must be **rebuilt, not redirected**, or the map must switch to the fallback (otherwise redirects chain and owners orphan).

| URL | Role in this map | Fallback if it is redirected |
|---|---|---|
| `/playbook/best-defi-pr-agency-2026` | 301 target from 1 URL(s); owner: defi-pr | none - 1,139 impr top page: must be rebuilt, not redirected. Hold the /pages/defi-pr-agency 301 until the rebuild is committed. |
| `/playbook/best-token-launch-marketing-agencies-2026` | 301 target from 2 URL(s); owner: token-launch | `/services/token-launch-pr` |
| `/playbook/top-crypto-marketing-agencies-2026` | 301 target from 3 URL(s); owner: web3-marketing-agency | `/pages/best-web3-marketing-agency` |
| `/playbook/best-crypto-press-release-services-2026` | 301 target from 1 URL(s); owner: crypto-press-release | `/playbook/crypto-press-release-distribution-2026` |
| `/playbook/best-crypto-pr-agency-singapore-2026` | 301 target from 1 URL(s); owner: geo-singapore | `/singapore` |
| `/playbook/best-web3-pr-agency-india-2026` | 301 target from 2 URL(s); owner: geo-india | `/india` |
| `/playbook/best-web3-pr-agency-usa-2026` | 301 target from 1 URL(s); owner: geo-usa | `/playbook/best-web3-pr-agencies-2026` |
| `/playbook/best-fractional-pr-consultant-web3-2026` | 301 target from 1 URL(s) | `/playbook/fractional-vs-agency` |
| `/playbook/best-b2b-saas-pr-agencies-2026` | 301 target from 1 URL(s) | none - 1,128 impr top page: must be rebuilt, not redirected. |
| `/playbook/best-crypto-kol-marketing-agencies-2026` | member (DIFFERENTIATE/KEEP) | `/services/kol-marketing` |

## Internal links to add

For each owner: existing pages indexed on 30 Oct (not proposed for a 301), ranked by family-query impressions, then topical match, then page impressions. Add one contextual in-body link per source with the anchor shown (rotate anchors; don't use the same exact-match anchor on every source). Check each source doesn't already link to the owner before adding.

### Crypto PR agency / firm -> `/playbook/best-web3-pr-agencies-2026` (also owner for: web3-pr-agency, blockchain-pr)

- `/services/web3-pr-campaigns` (282 impr) - anchor: "crypto PR agencies"
- `/playbook/crypto-pr-vs-ai-pr` (94 impr) - anchor: "best Web3 PR agencies"
- `/playbook/crypto-pr-agency-comparison-2026` (17 impr) - anchor: "crypto PR agency"
- `/playbook/web3-pr-agency-mistakes` (6 impr) - anchor: "Web3 PR firms"
- `/playbook/crypto-pr-cost-2026` (699 impr) - anchor: "top Web3 and crypto PR agencies"
- `/playbook/web3-pr-agency-reviews-clutch-2026` (300 impr) - anchor: "blockchain PR agencies"
- `/playbook/best-crypto-press-release-services-2026` (131 impr) - anchor: "crypto PR agencies"
- `/playbook/best-defi-pr-agency-2026` (1136 impr) - anchor: "best Web3 PR agencies"
- `/blog/vietnam-web3-pr-playbook-2026` (149 impr) - anchor: "crypto PR agency"
- `/playbook/best-crypto-pr-agency-singapore-2026` (68 impr) - anchor: "Web3 PR firms"

### AI PR agency / AI startup PR / PR for AI startups -> `/services/ai-startup-pr`

- `/playbook/ai-startup-pr-agency-india-2026` (243 impr) - anchor: "AI startup PR"
- `/playbook/ai-startup-pr-2026` (158 impr) - anchor: "PR for AI startups"
- `/playbook/enterprise-ai-pr-2026` (134 impr) - anchor: "AI PR agency"
- `/blog/open-source-ai-model-launch-pr-dual-audience-playbook` (215 impr) - anchor: "AI startup PR agency"
- `/blog/ai-startup-pr-techcrunch-the-information-forbes-2026` (289 impr) - anchor: "PR for AI companies"
- `/blog/ai-startup-gtm-strategy-2026` (185 impr) - anchor: "AI startup PR"
- `/work/gaia-ai` (117 impr) - anchor: "PR for AI startups"
- `/playbook/ai-pr-agency-pricing-packages-2026` (52 impr) - anchor: "AI PR agency"
- `/pages/fintech-ai-pr-agency` (17 impr) - anchor: "AI startup PR agency"
- `/blog/analyst-relations-ai-startup-gartner-forrester-idc` (103 impr) - anchor: "PR for AI companies"

### Cybersecurity PR -> `/services/cybersecurity-pr`

- `/playbook/cybersecurity-pr-2026` (405 impr) - anchor: "cybersecurity PR"
- `/pages/cybersecurity-marketing-agency` (100 impr) - anchor: "cybersecurity PR firm"
- `/pages/infosec-pr-agency` (22 impr) - anchor: "cybersecurity PR agency"
- `/playbook/best-cybersecurity-marketing-agencies-2026` (95 impr) - anchor: "cyber security PR"
- `/blog/rsa-conference-black-hat-cybersecurity-pr-sprint` (205 impr) - anchor: "cybersecurity PR"
- `/blog/kuppingercole-vs-gartner-vs-forrester-cybersecurity-startup` (196 impr) - anchor: "cybersecurity PR firm"
- `/blog/how-to-pitch-dark-reading-cyberscoop-sc-media-the-record-2026` (266 impr) - anchor: "cybersecurity PR agency"
- `/blog/cybersecurity-startup-mainstream-press-wired-mit-bloomberg` (113 impr) - anchor: "cyber security PR"
- `/pages/cybersecurity-analyst-relations-agency` (26 impr) - anchor: "cybersecurity PR"
- `/blog/cybersecurity-startup-series-a-pr-six-month-plan` (32 impr) - anchor: "cybersecurity PR firm"

### DeFi PR -> `/playbook/best-defi-pr-agency-2026`

- `/blog/defi-exploit-communications-first-72-hours` (34 impr) - anchor: "DeFi PR agency"
- `/playbook/defi-protocol-pr-strategy-2026` (14 impr) - anchor: "DeFi PR agencies"
- `/blog/web3-protocol-post-hack-trust-recovery-90-day-communications-playbook` (25 impr) - anchor: "DeFi PR"
- `/playbook/rwa-tokenization-pr-2026` (24 impr) - anchor: "DeFi PR agency"
- `/blog/stablecoin-rwa-pr-institutional-bloomberg-ft-wsj` (17 impr) - anchor: "DeFi PR agencies"
- `/blog/stablecoin-rwa-pr-bloomberg-ft-institutional-press` (12 impr) - anchor: "DeFi PR"
- `/pages/rwa-tokenization-pr-agency` (10 impr) - anchor: "DeFi PR agency"
- `/blog/stablecoin-payments-pr-genius-act-communications-playbook` (9 impr) - anchor: "DeFi PR agencies"
- `/playbook/stablecoin-launch-pr-2026` (7 impr) - anchor: "DeFi PR"
- `/blog/restaking-protocol-pr-narrative-journalists` (7 impr) - anchor: "DeFi PR agency"

### Crypto KOL / KOL marketing -> `/services/kol-marketing`

- `/playbook/best-crypto-kol-marketing-agencies-2026` (411 impr) - anchor: "crypto KOL marketing"
- `/pages/web3-kol-agency` (20 impr) - anchor: "Web3 KOL marketing"
- `/playbook/best-token-launch-marketing-agencies-2026` (328 impr) - anchor: "KOL marketing agency"
- `/blog/micro-kol-vs-macro-kol-token-launch-budget` (70 impr) - anchor: "crypto KOL agency"
- `/playbook/top-crypto-marketing-agencies-2026` (102 impr) - anchor: "KOL campaigns"
- `/playbook/crypto-kol-marketing-korea-2026` (27 impr) - anchor: "crypto KOL marketing"
- `/playbook/how-to-vet-crypto-kols-2026` (23 impr) - anchor: "Web3 KOL marketing"
- `/pages/crypto-youtube-influencer-agency` (15 impr) - anchor: "KOL marketing agency"
- `/blog/crypto-kol-pricing-2026-tier-rate-card` (58 impr) - anchor: "crypto KOL agency"
- `/pages/best-web3-marketing-agency` (76 impr) - anchor: "KOL campaigns"

### Token launch / TGE marketing -> `/playbook/best-token-launch-marketing-agencies-2026`

- `/services/token-launch-pr` (236 impr) - anchor: "token launch marketing agency"
- `/pages/ico-ido-marketing-agency` (10 impr) - anchor: "token launch marketing agencies"
- `/pages/token-launch-pr-agency-india` (12 impr) - anchor: "TGE marketing"
- `/pages/crypto-exchange-listing-pr` (77 impr) - anchor: "token launch marketing"
- `/blog/token2049-singapore-pr-playbook-earned-media` (75 impr) - anchor: "token launch marketing agency"
- `/blog/web3-conference-speaking-slot-pr-strategy-token2049-ethdenver-consensus` (70 impr) - anchor: "token launch marketing agencies"
- `/blog/micro-kol-vs-macro-kol-token-launch-budget` (70 impr) - anchor: "TGE marketing"
- `/blog/crypto-exchange-listing-pr-30-day-sequence` (66 impr) - anchor: "token launch marketing"
- `/blog/airdrop-eligibility-announcement-pr-farming-narrative` (63 impr) - anchor: "token launch marketing agency"
- `/blog/pitch-korean-crypto-journalists-blockmedia-bloomingbit-tokenpost` (44 impr) - anchor: "token launch marketing agencies"

### Fractional PR / CMO / head of PR -> `/playbook/fractional-vs-agency`

- `/blog/fractional-head-of-pr-vs-agency-vs-in-house` (27 impr) - anchor: "fractional PR vs agency"
- `/playbook/fractional-cmo-web3-2026` (121 impr) - anchor: "fractional PR"
- `/playbook/web3-pr-agency-reviews-clutch-2026` (300 impr) - anchor: "fractional PR services"
- `/playbook/best-defi-pr-agency-2026` (1136 impr) - anchor: "fractional PR vs PR agency cost"
- `/playbook/ai-startup-pr-agency-india-2026` (243 impr) - anchor: "fractional PR vs agency"
- `/pages/cybersecurity-marketing-agency` (100 impr) - anchor: "fractional PR"
- `/playbook/fractional-pr-cost-pricing-2026` (37 impr) - anchor: "fractional PR services"
- `/pages/fractional-head-of-pr` (36 impr) - anchor: "fractional PR vs PR agency cost"
- `/blog/fractional-pr-vs-crypto-agency-retainer-web3` (19 impr) - anchor: "fractional PR vs agency"
- `/playbook/best-web3-pr-agency-india-2026` (84 impr) - anchor: "fractional PR"

### Web3 / crypto marketing agency -> `/playbook/top-crypto-marketing-agencies-2026`

- `/pages/best-web3-marketing-agency` (76 impr) - anchor: "crypto marketing agencies"
- `/playbook/web3-pr-agency-reviews-clutch-2026` (300 impr) - anchor: "top crypto marketing agencies"
- `/playbook/best-web3-pr-agencies-2026` (843 impr) - anchor: "Web3 marketing agency"
- `/playbook/best-token-launch-marketing-agencies-2026` (328 impr) - anchor: "crypto marketing agencies"
- `/playbook/best-defi-pr-agency-2026` (1136 impr) - anchor: "top crypto marketing agencies"
- `/playbook/best-crypto-kol-marketing-agencies-2026` (411 impr) - anchor: "Web3 marketing agency"
- `/playbook/best-web3-pr-agency-india-2026` (84 impr) - anchor: "crypto marketing agencies"
- `/blog/web3-agency-truths-before-you-sign` (6 impr) - anchor: "top crypto marketing agencies"
- `/blog/micro-kol-vs-macro-kol-token-launch-budget` (70 impr) - anchor: "Web3 marketing agency"
- `/playbook/best-crypto-pr-agency-singapore-2026` (68 impr) - anchor: "crypto marketing agencies"

### Crypto press release -> `/playbook/best-crypto-press-release-services-2026`

- `/playbook/crypto-press-release-distribution-2026` (65 impr) - anchor: "crypto press release services"
- `/playbook/how-to-pitch-cointelegraph-2026` (3644 impr) - anchor: "crypto press release distribution services"
- `/blog/how-to-pitch-coindesk-the-block-blockworks-decrypt-2026` (358 impr) - anchor: "best crypto press release services"
- `/playbook/get-featured-coindesk-2026` (126 impr) - anchor: "crypto press release services"
- `/blog/airdrop-eligibility-announcement-pr-farming-narrative` (63 impr) - anchor: "crypto press release distribution services"
- `/playbook/how-to-write-crypto-press-release-2026` (2 impr) - anchor: "best crypto press release services"
- `/blog/web3-founder-ghostwriting-bylined-op-ed-coindesk-decrypt-forbes` (42 impr) - anchor: "crypto press release services"
- `/blog/press-release-vs-pitch-vs-exclusive` (30 impr) - anchor: "crypto press release distribution services"
- `/blog/op-ed-pitch-email-coindesk-cointelegraph-decrypt` (30 impr) - anchor: "best crypto press release services"
- `/blog/embargo-exclusive-briefing-web3-pr-decision-framework` (28 impr) - anchor: "crypto press release services"

### Geo: crypto/web3 PR + India -> `/playbook/best-web3-pr-agency-india-2026`

- `/india` (1236 impr) - anchor: "crypto PR in India"
- `/playbook/ai-startup-pr-agency-india-2026` (243 impr) - anchor: "Web3 PR agency in India"
- `/blog/apac-web3-x-strategy-korea-japan-india` (90 impr) - anchor: "crypto PR in India"
- `/blog/india-web3-pr-playbook-inc42-et-tech-business-standard` (2 impr) - anchor: "Web3 PR agency in India"
- `/blog/apac-web3-pr-localisation-mistakes-korea-japan-india` (22 impr) - anchor: "crypto PR in India"
- `/playbook/token-launch-marketing-agency-india-2026` (12 impr) - anchor: "Web3 PR agency in India"
- `/pages/token-launch-pr-agency-india` (12 impr) - anchor: "crypto PR in India"
- `/blog/apac-web3-pr-playbook-korea-japan-vietnam-india` (10 impr) - anchor: "Web3 PR agency in India"
- `/pages/crypto-marketing-agency-india` (8 impr) - anchor: "crypto PR in India"
- `/blog/regional-web3-marketing-india-korea` (8 impr) - anchor: "Web3 PR agency in India"

### Geo: crypto/web3 PR + Singapore -> `/playbook/best-crypto-pr-agency-singapore-2026`

- `/singapore` (634 impr) - anchor: "crypto PR in Singapore"
- `/blog/token2049-singapore-pr-playbook-earned-media` (75 impr) - anchor: "Web3 PR agency in Singapore"
- `/blog/singapore-web3-pr-mas-dtsp-token2049-playbook` (5 impr) - anchor: "crypto PR in Singapore"
- `/playbook/best-web3-pr-agencies-2026` (843 impr) - anchor: "Web3 PR agency in Singapore"
- `/services/web3-pr-campaigns` (282 impr) - anchor: "crypto PR in Singapore"

### Geo: crypto/web3 PR + Korea -> `/pages/crypto-pr-agency-korea`

- `/korea` (490 impr) - anchor: "crypto PR in Korea"
- `/playbook/crypto-pr-korea-2026` (12 impr) - anchor: "Web3 PR agency in Korea"
- `/blog/apac-web3-x-strategy-korea-japan-india` (90 impr) - anchor: "crypto PR in Korea"
- `/blog/pitch-korean-crypto-journalists-blockmedia-bloomingbit-tokenpost` (44 impr) - anchor: "Web3 PR agency in Korea"
- `/playbook/crypto-kol-marketing-korea-2026` (27 impr) - anchor: "crypto PR in Korea"
- `/blog/korea-blockchain-week-pr-playbook` (27 impr) - anchor: "Web3 PR agency in Korea"
- `/blog/apac-web3-pr-localisation-mistakes-korea-japan-india` (22 impr) - anchor: "crypto PR in Korea"
- `/blog/apac-web3-pr-playbook-korea-japan-vietnam-india` (10 impr) - anchor: "Web3 PR agency in Korea"
- `/pages/korea-kol-marketing-agency` (8 impr) - anchor: "crypto PR in Korea"
- `/blog/regional-web3-marketing-india-korea` (8 impr) - anchor: "Web3 PR agency in Korea"

### Geo: crypto/web3 PR + Japan -> `/playbook/crypto-pr-japan-2026`

- `/japan` (188 impr) - anchor: "crypto PR in Japan"
- `/blog/japan-web3-pr-coinpost-crypto-times-fsa-2026` (61 impr) - anchor: "Web3 PR agency in Japan"
- `/blog/apac-web3-x-strategy-korea-japan-india` (90 impr) - anchor: "crypto PR in Japan"
- `/blog/apac-web3-pr-localisation-mistakes-korea-japan-india` (22 impr) - anchor: "Web3 PR agency in Japan"
- `/blog/apac-web3-pr-playbook-korea-japan-vietnam-india` (10 impr) - anchor: "crypto PR in Japan"
- `/blog/apac-pr-service-korea-japan-india` (8 impr) - anchor: "Web3 PR agency in Japan"
- `/blog/apac-crypto-kol-strategy-korea-japan-southeast-asia` (7 impr) - anchor: "crypto PR in Japan"
- `/pages/crypto-kol-agency-japan` (4 impr) - anchor: "Web3 PR agency in Japan"

### Geo: crypto/web3 PR + Dubai / UAE / MENA -> `/playbook/crypto-pr-dubai-mena-2026`

- `/dubai-mena` (139 impr) - anchor: "crypto PR in Dubai"
- `/blog/dubai-mena-crypto-pr-service` (18 impr) - anchor: "Web3 PR agency in Dubai"
- `/playbook/best-web3-pr-agencies-2026` (843 impr) - anchor: "crypto PR in Dubai"
- `/services/web3-pr-campaigns` (282 impr) - anchor: "Web3 PR agency in Dubai"
- `/playbook/crypto-pr-cost-2026` (699 impr) - anchor: "crypto PR in Dubai"

### Geo: crypto/web3 PR + UK -> `/pages/crypto-pr-agency-uk`

- `/playbook/best-web3-pr-agencies-2026` (843 impr) - anchor: "crypto PR in UK"
- `/services/web3-pr-campaigns` (282 impr) - anchor: "Web3 PR agency in UK"
- `/playbook/crypto-pr-cost-2026` (699 impr) - anchor: "crypto PR in UK"
- `/playbook/crypto-pr-agency-comparison-2026` (17 impr) - anchor: "Web3 PR agency in UK"
- `/playbook/web3-pr-agency-mistakes` (6 impr) - anchor: "crypto PR in UK"

### Geo: crypto/web3 PR + USA -> `/playbook/best-web3-pr-agency-usa-2026`

- `/playbook/best-web3-pr-agencies-2026` (843 impr) - anchor: "crypto PR in USA"
- `/services/web3-pr-campaigns` (282 impr) - anchor: "Web3 PR agency in USA"
- `/playbook/crypto-pr-cost-2026` (699 impr) - anchor: "crypto PR in USA"
- `/playbook/crypto-pr-agency-comparison-2026` (17 impr) - anchor: "Web3 PR agency in USA"
- `/playbook/web3-pr-agency-mistakes` (6 impr) - anchor: "crypto PR in USA"

### Geo: crypto/web3 PR + Vietnam -> `/playbook/crypto-pr-vietnam-2026`

- `/blog/vietnam-web3-pr-playbook-2026` (149 impr) - anchor: "crypto PR in Vietnam"
- `/blog/web3-pr-southeast-asia-vietnam-indonesia-thailand` (41 impr) - anchor: "Web3 PR agency in Vietnam"
- `/blog/apac-web3-pr-playbook-korea-japan-vietnam-india` (10 impr) - anchor: "crypto PR in Vietnam"
- `/playbook/best-web3-pr-agencies-2026` (843 impr) - anchor: "Web3 PR agency in Vietnam"
- `/services/web3-pr-campaigns` (282 impr) - anchor: "crypto PR in Vietnam"

### Geo: crypto/web3 PR + APAC (multi-market) -> `/services/apac-pr`

- `/apac` (579 impr) - anchor: "crypto PR in APAC"
- `/blog/apac-web3-x-strategy-korea-japan-india` (90 impr) - anchor: "Web3 PR agency in APAC"
- `/blog/apac-conference-pr-calendar-kbw-webx-token2049-ibw` (43 impr) - anchor: "crypto PR in APAC"
- `/blog/web3-pr-southeast-asia-vietnam-indonesia-thailand` (41 impr) - anchor: "Web3 PR agency in APAC"
- `/blog/apac-expansion-pr-for-ai-startups` (33 impr) - anchor: "crypto PR in APAC"
- `/blog/apac-web3-pr-localisation-mistakes-korea-japan-india` (22 impr) - anchor: "Web3 PR agency in APAC"
- `/blog/apac-regulatory-messaging-vaupa-fsa-mas-web3-pr` (15 impr) - anchor: "crypto PR in APAC"
- `/blog/apac-web3-pr-playbook-korea-japan-vietnam-india` (10 impr) - anchor: "Web3 PR agency in APAC"
- `/blog/apac-pr-service-korea-japan-india` (8 impr) - anchor: "crypto PR in APAC"
- `/blog/apac-crypto-kol-strategy-korea-japan-southeast-asia` (7 impr) - anchor: "Web3 PR agency in APAC"

## Notes and caveats

- GSC query x page data only covers non-anonymised queries; most `/pages/*` URLs show page impressions but no queries. Their intent was read from slug/title/H1.
- Pages 'Crawled - currently not indexed' on 30 Oct that still had impressions: `/playbook/depin-pr-strategy-2026` (169), `/playbook/crypto-influencer-pricing-rates-2026` (228), `/pages/ai-pr-agency` (21). Fix the first two via indexing requests; they are not consolidation candidates.
- Re-check DIFFERENTIATE-hold rows (`/pages/web3-pr-agency`, `/pages/web3-kol-agency`) on 28 Nov with fresh GSC; 301 them to their owner if they stop earning their own queries.
- Geo families: 0 matched queries combine crypto/web3 + a market + PR/agency wording in 90 days. All geo impressions in GSC are market-sizing queries ('india blockchain ai market', 'web 3 singapore') landing on the hubs at #20-57 with ~0 clicks, so geo owners were picked on page totals, position and intent.
- Respect the content freeze: every change here edits or redirects existing URLs; no new `/pages` URLs.
