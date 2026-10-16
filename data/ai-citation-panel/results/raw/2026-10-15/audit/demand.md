# Paid search demand signals (Google Ads) - shilikajain.com AI SEO audit

Pulls: first written 2026-10-15, refreshed and corrected 2026-10-16 (this version). The 2026-10-16 numbers supersede the 2026-10-15 ones wherever they differ.
Window: last 90 days, which for this account equals its entire history (a `last_2yearsT` lookback returns the same two campaigns and nothing before July 2026).
Account: 619-659-6141 "Shilika Jain" (currency INR, timezone Asia/Calcutta). Account 376-597-0613 "Meru trophy" was ignored as instructed.
Scope: READ ONLY. Only `get_fields`, `get_options` and `get_data` were called on Windsor connector `google_ads`. No `execute_action` or other write tool was used. Nothing inside the repo was modified (only a local scratch copy of one live page was saved under the scratchpad). Ahrefs and Search Console were not used.

## 0. What changed in the 2026-10-16 refresh

A fresh `get_data` pull found a new Search delivery day, 2026-10-15, that the earlier report did not have: 98 impressions, 2 clicks, INR 9,054.24, both clicks from the UAE on the search term "coinzilla" (matched to keyword "crypto pr agency" BROAD, now REMOVED). That single day is 34.4% of all Search spend. Consequences:

- Search totals moved from 312 impr / 5 clicks / INR 17,290.82 to 410 impr / 7 clicks / INR 26,345.06 (avg CPC INR 3,763.58, CTR 1.71%), still 0 conversions.
- The earlier verdict (too small to validate or refute AI SEO) is unchanged. The wasted-spend picture is sharper: 3 of the 4 distinct click-producing search terms with a visible name are navigational searches for other companies.
- Keyword statuses changed: "crypto pr agency" BROAD, "crypto pr agency" PHRASE, "apac pr agency" PHRASE and "pr crypto" BROAD are now REMOVED, and "apac pr agency" BROAD is PAUSED. Someone has already pruned the keywords that produced 58.5% of spend. I did not verify who or when.
- Live-site HTTP checks that were unverifiable on 2026-10-15 (sandbox had no network) were re-run successfully on 2026-10-16 (section 3).
- Rolling-window note: the 90-day window now starts 2026-07-18, so the PMax day 2026-07-17 (575 impr, 18 clicks, INR 409.28, seen in the 2026-10-15 pull) has rolled out of `last_90d` but is still in the account lifetime. Lifetime figures are used below.

## 1. Verdict in one paragraph

The account has data, but it is tiny and very young, so it cannot validate or refute the AI SEO work. Account lifetime (all of it inside the last 90 days apart from three zero-click impressions): 1,476 impressions, 31 clicks, INR 26,832.76 of spend (roughly US$300-316, assuming 85-89 INR per USD, my assumption) and zero conversions. The only Search campaign with any delivery started on 2026-10-02 and delivered on 9 days up to 2026-10-15; it has 410 impressions, 7 clicks and INR 26,345.06 of spend (average CPC INR 3,764, roughly US$42-44). A Performance Max campaign (now paused) delivered on 5 days in July and September, US only, and produced 1,066 impressions, 24 clicks, INR 487.70 and no conversions. Of the 24 campaigns in the account, 22 are paused and have never delivered an impression. What the data usefully tells us is qualitative: which queries Google matched, which geographies show English-language demand, and that most visible search demand is navigational searches for named competitor agencies and vendors, not category searches. That is a signal for comparison pages and for the panel design, not proof of lead demand.

## 2. Evidence: calls made and results

All calls: connector `google_ads`, accounts `["619-659-6141"]`, filters `impressions > 0`. Presets used: `last_90dT`, `last_2yearsT`, and explicit dates for the 2026-10-15 day. Windsor refuses to combine `search_term`, keyword fields, or geographic fields in one request ("need the geographic_view report, which cannot return: search_term"), so each was pulled separately; I confirmed this again on 2026-10-16.

### 2.1 Field discovery

`get_fields(connector=google_ads)` returned 2,622 fields (saved by the harness as `/Users/thunderbolt/.claude/projects/-Users-thunderbolt-Documents-projects-Shilika/c0dc2b3b-3b31-46db-9535-df2409eb89af/tool-results/mcp-2d9b90a4-e193-4cb0-8665-0088c66b01f1-get_fields-1792090094002.txt`, probed with `python3 -I`). Fields used: `campaign`, `campaign_status`, `date`, `impressions`, `clicks`, `cost`, `conversions`, `all_conversions`, `average_cpc`, `ctr`, `search_term`, `keyword_text`, `keyword_match_type`, `keyword_status`, `country`, `expanded_final_url`, `ad_responsive_search_ad_headlines`, `ad_strength`, `budget_amount`, `search_impression_share`, `search_budget_lost_impression_share`, `search_rank_lost_impression_share`. Custom conversion fields exist (`conversions_book_calendar`, `conversions_contact_shilikajain_com_`, `conversions_submit_lead_form_shilikajain_com_`, `conversions_whatsapp_lead`, a Telegram page-load action) but all returned null.

### 2.2 Campaign performance (lifetime = last 90 days for practical purposes)

| Campaign | Status | Impr | Clicks | Cost (INR) | Conv | Avg CPC (INR) | CTR |
|---|---|---|---|---|---|---|---|
| Performance Max | PAUSED | 1,066 | 24 | 487.70 | 0 | 20.32 | 2.25% |
| Search / APAC Web3 PR / KR JP SG AE | ENABLED | 410 | 7 | 26,345.06 | 0 | 3,763.58 | 1.71% |
| 22 other campaigns (Brand x2, Fractional PR, Crypto & Web3 PR x2, AI Startup PR, Token Launch & TGE, Cybersecurity PR, AI + Cybersecurity PR, Competitor Alternatives, APAC & MENA Regional PR, Leads-Search-26-09-26, Events E01 to E10) | PAUSED | 0 | 0 | 0 | 0 | n/a | n/a |

The list of 22 paused campaigns is from the 2026-10-15 pull and was not re-read on 2026-10-16. A strict 90-day window as of 2026-10-16 (from 2026-07-18) gives 898 impr / 13 clicks / INR 26,423.48 for the account.

Search campaign settings read on 2026-10-15 (not re-read except budget and impression share): bidding strategy `TARGET_SPEND` (Maximize Clicks), AI Max enabled, geo setting `PRESENCE_OR_INTEREST`, Search partners off, Display off. Targeted locations: Hong Kong, Japan, South Korea, Singapore, United Arab Emirates, United Kingdom. Languages: English, Japanese, Korean. The campaign name says "KR JP SG AE" but the location list also holds Hong Kong and the United Kingdom.

Budget: `budget_amount` returned 3,905.86 on each of 2026-10-12 to 2026-10-15 (read as the daily campaign budget in INR; that reading is my interpretation). Daily cost on 2026-10-15 was INR 9,054.24, which is 2.32 times that figure. Google's usual rule is that a day can run up to twice the daily budget (about INR 7,812), so either the budget was changed in the interval, the field means something other than the daily budget, or there is a cost-reporting quirk. UNVERIFIED; check the budget in the Ads UI.

Daily impression share: 70.3% (10-12), 33.3% (10-13), 34.7% (10-14), 55.4% (10-15); share lost to budget 0%, 31.9%, 50.0%, 1.1%; lost to rank 29.7%, 34.8%, 15.3%, 43.5%. Values swing widely because each day has only tens of impressions.

### 2.3 Timeline (daily rows with impressions)

```
2026-07-17 PMax  575 impr 18 clk INR 409.28   (rolled out of last_90d on 10-16; from 10-15 pull)
2026-07-19 PMax   18 impr  1 clk INR  14.48
2026-09-25 PMax  396 impr  4 clk INR  57.09
2026-09-26 PMax   74 impr  1 clk INR   6.85
2026-10-02 Search   4 impr 0 clk
2026-10-03 Search  11 impr 0 clk
2026-10-04 Search  85 impr 0 clk
2026-10-05 Search  25 impr 2 clk INR 6,396.84
2026-10-06 Search   3 impr 1 clk INR 1,624.56
2026-10-12 Search  74 impr 0 clk
2026-10-13 Search  38 impr 1 clk INR 4,730.64
2026-10-14 Search  72 impr 1 clk INR 4,538.78
2026-10-15 Search  98 impr 2 clk INR 9,054.24
```

The Search campaign delivered on 9 days. There was no delivery from 2026-10-07 to 2026-10-11 (reason unknown). Nothing here is a trend.

### 2.4 Keyword level (lifetime, keyword_text x match type x current status)

Impressions sum to 410 and cost to INR 26,345.06, matching the campaign row.

| Keyword | Match | Status now | Impr | Clicks | Cost (INR) | Share of spend |
|---|---|---|---|---|---|---|
| crypto pr agency | BROAD | REMOVED | 22 | 2 | 9,054.24 | 34.4% |
| crypto marketing agency | PHRASE | ENABLED | 65 | 2 | 6,396.84 | 24.3% |
| apac pr agency | BROAD | PAUSED | 7 | 1 | 4,730.64 | 18.0% |
| crypto pr agencies | BROAD | ENABLED | 9 | 1 | 4,538.78 | 17.2% |
| apac pr agency | PHRASE | REMOVED | 109 | 1 | 1,624.56 | 6.2% |
| crypto pr agency | PHRASE | REMOVED | 69 | 0 | 0 | 0% |
| crypto pr | BROAD | ENABLED | 59 | 0 | 0 | 0% |
| web3 marketing agency | PHRASE | ENABLED | 34 | 0 | 0 | 0% |
| web3 pr agency | BROAD | ENABLED | 17 | 0 | 0 | 0% |
| crypto press release | BROAD | ENABLED | 12 | 0 | 0 | 0% |
| pr crypto | BROAD | REMOVED | 2 | 0 | 0 | 0% |
| crypto pr firms | BROAD | ENABLED | 2 | 0 | 0 | 0% |
| crypto pr services / pr agency crypto / crypto pr packages | BROAD | ENABLED | 1 each | 0 | 0 | 0% |

Three of the five click-producing keyword rows are BROAD match (INR 18,323.66, 69.6% of spend); 100% of spend came from keywords with no conversion. Negative keywords on the live campaign (from the 2026-10-15 pull, 12 rows): tickets, free, job, jobs, cheap, press release distribution (phrase), course, coin price, salary, internship, reddit, price prediction. No competitor-brand negatives and no "newswire" negatives, although "newswire" matched 6 impressions.

### 2.5 Search terms (lifetime, aggregated)

Raw rows saved at `/private/tmp/claude-504/-Users-thunderbolt-Documents-projects-Shilika/c0dc2b3b-3b31-46db-9535-df2409eb89af/scratchpad/audit/demand_terms_2026-10-16.tsv` and recomputed with `python3 -I demand_terms_calc.py` (same folder). Result: 92 visible terms, 242 impressions = 59.0% of the campaign's 410; 168 impressions (41.0%) are hidden by Google's privacy threshold, so every share below is a share of the visible part only. 5 of the 7 clicks have a visible term; 2 clicks (INR 9,269.42, 35.2% of spend) do not.

Terms that produced clicks:

| Search term | Matched | Clicks | Cost (INR) | Date, country | What it is |
|---|---|---|---|---|---|
| coinzilla | via "crypto pr agency" BROAD | 2 | 9,054.24 | 2026-10-15, UAE | Navigational. Appears to be a crypto ad network (my general knowledge, not verified here). |
| cryptic crypto marketing agency | PHRASE | 2 | 6,396.84 | 2026-10-05, UAE | Navigational search for the agency Cryptic. |
| iris pr dubai | NEAR_PHRASE | 1 | 1,624.56 | 2026-10-06, UAE | Navigational search for a Dubai PR agency. |
| (hidden) | "apac pr agency" BROAD | 1 | 4,730.64 | 2026-10-13, Singapore | Term not disclosed. |
| (hidden) | "crypto pr agencies" BROAD | 1 | 4,538.78 | 2026-10-14, UK | Term not disclosed. |

Visible-term spend: INR 17,075.64 = 64.8% of Search spend, and all of it went to navigational searches for other companies. All visible-term clicks came from the UAE.

Heuristic intent split of the 242 visible impressions (my judgement; a few small names are uncertain):

| Bucket | Impr | Share |
|---|---|---|
| Named agency or vendor (navigational) | about 172 | about 71% |
| Generic category (agency-category wording 41, wire/distribution 12, other 1) | about 54 | about 22% |
| Unclear ("kim than") | 16 | about 7% |

Within the generic bucket the wording matters: "marketing" terms ("crypto marketing agency" 13, "web3 marketing agency" 6, "crypto marketing firm" 3, "crypto marketing agencies" 2, "best web3 marketing agencies" 2, "crypto marketing services" 1, "crypto marketing company" 1) total 28 impressions; PR-wording agency-category terms ("pr firm hong kong" 2, "best pr agency" 2, "advertising agency pr" 2, "public relations team" 2, "hong kong pr firms" 1, "pr agency hk" 1, "pr agency malaysia" 1, "best pr firm in the world" 1, "bitcoin pr" 1) total 13. So marketing wording outnumbers PR wording about 2 to 1 in the visible generic terms (the 2026-10-15 report said 4 to 1 on a smaller sample). Wire terms: newswire 6, pr newswire apac 2, crypto pr distribution 2, pr newswire singapore 1, newswire asia 1.

Largest named clusters (visible impressions): Luna PR 37 (luna pr 21, luna pr dubai 5, lunapr 4, lunapr io 4, luna public relations 2, luna pr photos 1); Cryptic 14; SPRG (Singapore, HK) 7; The PR People Asia 7; Lunar Strategy 6; thekollab 6; We Communications Singapore 4; Outset PR 4; X10 Agency 4; Press Loft 4; Coinbound 3; Luvkaizen 3; Pathos 3; EAK Digital 2; Coinzilla 2.

### 2.6 Geography, device, landing page

| Country | Impr | Share | Clicks | Cost (INR) |
|---|---|---|---|---|
| Singapore | 110 | 26.8% | 1 | 4,730.64 |
| United Kingdom | 105 | 25.6% | 1 | 4,538.78 |
| United Arab Emirates | 94 | 22.9% | 5 | 17,075.64 |
| Hong Kong | 63 | 15.4% | 0 | 0 |
| Japan | 19 | 4.6% | 0 | 0 |
| South Korea | 19 | 4.6% | 0 | 0 |
| (PMax) United States | 1,066 | n/a | 24 | 487.70 |

The UAE is 22.9% of impressions but 71.4% of Search clicks and 64.8% of Search spend. Korea plus Japan are 38 of 410 impressions (9.3%) with zero clicks, even though the ad copy leans on Korea and Japan. Device split on 2026-10-15 pull (Search, 312 impr then): mobile 115 impr / 4 clicks, desktop 186 / 1, tablet 11; not re-pulled.

Landing page: all 7 Search clicks (INR 26,345.06) landed on `https://www.shilikajain.com/services/apac-pr` (with `gad_source`, `gad_campaignid` and `gbraid` parameters). One responsive search ad, ad strength EXCELLENT, all 12 headline asset performance labels PENDING. Headlines read on 2026-10-16: "APAC Web3 PR", "Korea & Japan Crypto PR", "Singapore & Dubai Web3 PR", "Native-Language Placements", "BloomingBit, TokenPost, Jinse", "Book a 30-Min PR Teardown", "200+ Vetted APAC KOLs", "One Operator, 6 Time Zones", "PR Around Token2049 & KBW", "Regulator-Aware PR Plans", "Replies Within 24 Hours", "Senior Operator, Not an Agency".

PMax (from the 2026-10-15 pull): US only, mobile 809 of 1,063 impressions and 23 of 24 clicks, average CPC INR 20.32 (about US$0.23-0.24), landing mostly `https://shilikajain.com/` (non-www) plus auto-expanded URLs such as `/pages/ai-pr-agency`, `/pages/ai-publicist`, `/pages/ai-thought-leadership-agency`, `/pages/web3-pr-agency-india`, `/blog/...`, `/playbook`, `/testimonials`, `/press`. Zero conversions. Paused.

### 2.7 Conversions

`conversions` and `all_conversions` are 0 for both campaigns on every day returned, including the 2026-10-16 refresh and the two-year lookback. The conversion-action metadata request returned an empty set via Windsor on 2026-10-15, so which actions are enabled or primary is UNVERIFIED. The per-action custom fields all came back null. Their existence suggests those conversion actions exist in the account, but that is an inference. With 7 clicks, zero conversions is neither a failure nor a pass.

## 3. Evidence: repo and live-site checks (re-run 2026-10-16, all read-only)

```
git log -1 --format='%h %ad %s' --date=short -- app/compare      # 30dd8aa 2026-10-15 Add agency comparison pages for top crypto and AI PR firms
sed -n 5,9p app/layout.tsx                                         # GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID ?? 'AW-18324652879'
grep -hoE "slug: *['\"][a-z0-9-]+['\"]" app/compare/_data/*.ts     # bospar, coinbound, highwire-pr, hotwire, inkhouse, luna-pr, marketacross, melrose-pr, shift-communications, wachsman
ls data/ai-citation-panel/results/                                 # _TEMPLATE.csv, chatgpt, serp-discoverability, zz-fixture-2026-08-04.csv
ls data/ai-citation-panel/results/serp-discoverability             # 2026-08-04, 08-14, 08-31, 09-25 (.csv)
curl -s -m 15 -o /dev/null -w "%{http_code}" https://www.shilikajain.com/services/apac-pr                       # 200
curl ... /compare/shilika-jain-vs-luna-pr                           # 200
curl ... /compare/shilika-jain-vs-coinbound                         # 200
curl ... /compare/shilika-jain-vs-{eak-digital,lunar-strategy,cryptic,outset-pr,coinzilla,press-loft}   # 404 each
curl -sI https://shilikajain.com/                                   # HTTP/2 307 (redirect to www)
curl -s https://www.shilikajain.com/services/apac-pr | text-extract # 31,384 characters of visible text; grep results below
```

Landing-page message match, checked on the live HTML on 2026-10-16: "time zone" 0 hits, "6 time" 0, "Replies Within" 0, "One Operator" 0, "24 hour" 1 hit (about translation turnaround within the first 24 hours of a campaign, not about reply time), "200+" 1 hit (a related-link card "KOL Marketing: 200+ vetted creators"). The page names BloomingBit, TokenPost, CryptoTimes JP, ChainCatcher and Jinse. The Calendly link `https://calendly.com/shilikajain/30min/` appears 3 times with the label "Book a 30-minute teardown". (The 2026-10-15 report said a single Calendly link; 3 anchors is the correct count.)

Findings:

- Sitewide Google Ads tag and a thank-you-page conversion router are present in code (`app/layout.tsx` loads gtag and `/assets/conversions.js`; carried from the 2026-10-15 read of `public/assets/conversions.js` and `public/assets/ads.js`). Whether the Ads account counts `/thank-you` as a primary conversion is unverified. With 0 conversions on 7 clicks, tracking can be neither confirmed nor ruled out from the data.
- `/ads` is a noindex Calendly landing page with its own click conversion tags (per the 2026-10-15 read), but the campaign sends traffic to `/services/apac-pr`, a long editorial page, instead.
- Compare coverage versus paid demand: live pages exist for Luna PR (37 visible impressions, the largest cluster) and Coinbound (3). No page exists for Cryptic (14 and 2 clicks), SPRG (7), The PR People Asia (7), Lunar Strategy (6), thekollab (6), Outset PR (4), X10 (4), Press Loft (4), We Communications (4), Luvkaizen (3), EAK Digital (2), Coinzilla (2). The compare route was committed on 2026-10-15, so no organic history can exist yet.
- The apex host answers with a 307 (temporary) redirect to www. A permanent redirect (301 or 308) is the usual choice for host consolidation. This is a Vercel domain setting, outside the repo.
- Panel data: the only engine with real result rows is `serp-discoverability` (latest 2026-09-25; 13 of 25 prompts surface a Shilika URL per the 2026-10-15 read). `results/chatgpt/` holds a single `zz-fixture` file, so the AI-platform columns of the panel README are not populated. `prompts.json` holds 25 prompts. That is outside this task but limits any AI-platform cross-reading of paid data.

## 4. How the paid data maps to site pages and panel keyphrases

Panel prompts are 25 conversational "who is the best / how much / how do I" questions in 5 buckets (`data/ai-citation-panel/prompts.json`). The paid data is query-level, so the mapping is by topic:

| Panel bucket | Paid evidence | Site page that serves it | Read |
|---|---|---|---|
| A. Fractional PR positioning | 0 impressions. No fractional keywords exist in the live campaign. | `/`, `/services/web3-pr-campaigns` | No paid signal either way. |
| B. Web3 / crypto PR (best agencies, media, TGE, KOL) | "crypto pr agency/agencies/pr/web3 pr agency/crypto press release/firms/services": 195 impressions across those keywords, 3 clicks (all on broad variants, with navigational or hidden terms). "crypto marketing agency" and "web3 marketing agency" keywords: 99 impressions, 2 clicks. | `/playbook/best-web3-pr-agencies-2026`, `/services/token-launch-pr`, `/services/kol-marketing` | Real but small demand; visible terms skew to "marketing agency" wording and to competitor names. The panel has no prompt using "marketing agency" wording. |
| C. AI startup PR | 0 impressions. | `/services/ai-startup-pr` | No paid signal. |
| D. Cybersecurity PR | 0 impressions. | `/services/cybersecurity-pr` | No paid signal. |
| E. Regional (Korea, Japan, APAC, Dubai/MENA, India) | "apac pr agency" family: 116 impressions (28% of Search). Singapore, UK, UAE and Hong Kong carry 90.7% of impressions; Korea and Japan 9.3%. India not targeted. | `/services/apac-pr` (the landing page), `/singapore`, `/dubai-mena`, `/korea`, `/japan`, `/india` | English-language demand is visible for Singapore, UAE and Hong Kong; Korea and Japan show little English-language demand. Native-language demand is untested. |

Cross-check with the panel's competitor set (`competitor_brands_to_track` for A1: EAK Digital, Lunar Strategy, Coinbound, Outset PR, Wachsman, MarketAcross, Serotonin): Coinbound 3, Lunar Strategy 6, Outset PR 4, EAK Digital 2 and "serotonin web3" 1 impression appear as search terms; Wachsman and MarketAcross do not appear. The 2026-09-25 SERP rollup also lists crypticweb3.com and luvkaizen.com as top SERP competitors, and both names are in the paid terms (Cryptic 14, Luvkaizen 3). The panel's competitor list is a fair reflection of who buyers search for by name, with the largest paid-demand name, Luna PR (37), and Cryptic (14) being the ones that most deserve a deliberate decision.

## 5. What is working, what is not

Working (none of this is a conversion result):

1. The campaign is serving and the ad is accepted: 410 impressions, 1.71% CTR, ad strength EXCELLENT, impression share between 33% and 70% by day in a niche auction.
2. Visible search terms independently confirm the competitor set already tracked in the AI citation panel (Coinbound, Lunar Strategy, Outset PR, EAK Digital, Cryptic, Luvkaizen).
3. The largest named cluster (Luna PR, 37 impressions) already has a live compare page, as does Coinbound.
4. Tracking plumbing exists in code (Google tag AW-18324652879 sitewide, contact actions routed to `/thank-you`). Whether it fires is unverified.
5. Someone has begun pruning: the broad and phrase "crypto pr agency" and "apac pr agency" variants that produced 58.5% of spend are REMOVED or PAUSED as of this pull.
6. Landing-page claims about outlets (BloomingBit, TokenPost, Jinse and others) are supported by page text.

Not working:

1. No outcome signal: 0 conversions from 410 impressions and 7 clicks. The sample is far too small to say anything about lead quality.
2. CPC is very high and uncontrolled: INR 3,764 average (about US$42-44), range INR 1,625 to 4,731 per click, under Maximize Clicks with broad match and AI Max. About INR 376,000 (roughly US$4,200-4,400) would buy 100 clicks at this rate, the order of magnitude needed for any statistical read.
3. Wasted spend: 100% of Search spend is conversion-free. Visible attribution is competitor navigation or an ad network: INR 17,075.64 (64.8%) went to five clicks on "coinzilla" (INR 9,054.24), "cryptic crypto marketing agency" (INR 6,396.84) and "iris pr dubai" (INR 1,624.56), all from the UAE. A further INR 9,269.42 (35.2%) went to two broad-match clicks with hidden terms (Singapore, UK). No clicked term matches a panel prompt or a landing-page claim.
4. Targeting drift and budget anomaly: UK and Hong Kong are in the location list although the campaign is named KR JP SG AE; the UK click cost INR 4,538.78 (17.2%). Korea and Japan, the markets the ad copy emphasises, are 9.3% of impressions with zero clicks. The 2026-10-15 cost of INR 9,054.24 is 2.32 times the 3,905.86 budget figure (unverified, see 2.2).
5. Four of five panel buckets and all 22 paused campaigns have no paid data, so the account gives no demand evidence for fractional PR, AI startup PR, cybersecurity PR, token launch PR or the KOL pages.
6. The PMax test (US only, 23 of 24 clicks on mobile, INR 20 per click, homepage landing, 0 conversions) produced low-intent traffic and was paused.
7. Message match: the ad promises "One Operator, 6 Time Zones" and "Replies Within 24 Hours", which the landing page does not state, and the landing page is about 31,000 characters long, while a short purpose-built `/ads` page exists unused for this campaign.
8. Minor: apex-to-www redirect is a 307; PMax used the non-www homepage as its final URL.

## 6. Implications for organic and AI targeting

- Treat paid as a query-mining instrument, not as proof. Do not read "0 conversions" as evidence that AI SEO pages do not convert, and do not read the AI SEO work as validated by paid data.
- Buyers in the APAC and MENA English market search by company name. About 71% of visible impressions are navigational. For organic and AI answers this argues for honest comparison and alternatives content for the names actually searched, written from first-hand differentiation and not templated at scale (the 2026-09-24 spam update is relevant, and the panel summary already warns against per-variant pages). Demand is concentrated: Luna PR and Cryptic are 21% of visible impressions, and most other names have 2 to 7.
- "Marketing" wording outnumbers "PR" wording about 2 to 1 among visible generic agency terms. Panel prompts and several page titles use "PR". The site already has marketing-agency pages (for example `pages__best-web3-marketing-agency-body.html` and others under `app/_partials`), but the panel never tests that wording, so their AI visibility is unmeasured.
- Geography: Singapore, UK, UAE and Hong Kong produced the English-language demand. Korea and Japan produced almost none in English. The newly added ko and ja locales are the only place Korean and Japanese demand could be captured, and the paid campaign has English-only keywords and ads, so native-language demand is unmeasured, not shown to be absent.
- Clicks at about US$42-44 in a thin auction suggest a high-value, low-volume niche. Organic and AI citations here are worth more than the paid cost implies, but expect modest absolute traffic.
- "newswire" and "pr newswire" terms (12 visible impressions) are informational or vendor searches, not agency-hiring searches; they are not a target for AI SEO pages.

## 7. Limits and unverified items

- Window and size: 9 delivery days of Search data, 7 clicks. Any ratio (CTR, CPC, share) has wide uncertainty.
- The privacy threshold hides 41.0% of Search impressions and the search terms behind 2 of the 7 clicks.
- Intent classification is my heuristic. Brand status of small names ("nnc sharjah", "kim than", "thekollab", "coinzilla") is uncertain; "coinzilla" as an ad network is from general knowledge.
- INR to USD conversions assume 85-89 INR per USD; the real rate was not checked.
- Enabled, primary and firing conversion actions are unverified; Windsor returned no conversion-action rows.
- The budget field reading (3,905.86 daily INR) is my interpretation and conflicts with the 2026-10-15 cost, so it is flagged unverified.
- Campaign settings (bidding, negatives, locations), device split and the list of 22 paused campaigns come from the 2026-10-15 pull and were not re-read on 2026-10-16.
- No Google Search Console or Ahrefs data was used, so nothing here says how the site ranks organically.

## 8. Recommended actions (for the owner; I made no changes)

1. Do not use this account as the validation channel for AI SEO. Use it to mine queries, and set a decision rule up front (for example at least 100 clicks and a defined lead action) before judging it.
2. If the campaign continues: put a CPC ceiling on or replace Maximize Clicks, switch off AI Max, keep broad match off the "crypto pr agency" family, add competitor-brand and "newswire" negatives (or isolate competitor names in a separate, deliberately budgeted campaign), and make the location list match the intent (UK and Hong Kong decision). These are account changes for Shilika to make.
3. Check the real daily budget in the Ads UI and why 2026-10-15 spend was 2.3 times the 3,905.86 figure.
4. Confirm conversion tracking end to end: list enabled and primary conversion actions in Ads, then complete one test contact action and watch `/thank-you` fire in Tag Assistant.
5. Route the ad to a short, single-CTA page (the existing `/ads` or an APAC variant) and align headline claims with page copy, or drop the unsupported "6 Time Zones" and "24 Hours" claims.
6. Extend compare content only where demand and first-hand differentiation both exist; data-backed candidates are Cryptic (14 impressions, 2 clicks), Lunar Strategy (6), Outset PR (4), EAK Digital (2) and Luvkaizen (3), keeping within the spam-update guidance. Do not build pages for names with 1 to 3 impressions on volume alone.
7. Add 3 to 5 panel prompts using "marketing agency" and competitor-name wording, so AI visibility of the marketing-agency pages and compare pages is measured.
8. Connect Google Search Console (Windsor has a connector) to get real organic query and page data, which is the missing half of this analysis, and test native-language Korean and Japanese ads and landing pages before concluding those markets have no demand.
