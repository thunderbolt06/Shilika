# Backlink and referring-domain estimate for shilikajain.com (no Ahrefs, no GSC)

Date of audit: 2026-10-15 (first pass), refined 2026-10-16 after a usage-limit reset. Method: free public routes only, applied the same way to shilikajain.com and 4 competitors (highvibepr.com, eakdigital.com, coinbound.io, outsetpr.io).
Raw data: `/private/tmp/claude-504/-Users-thunderbolt-Documents-projects-Shilika/c0dc2b3b-3b31-46db-9535-df2409eb89af/scratchpad/audit/bl/` (previous agent), `.../audit/bl2/` (first pass: Tranco JSON, OpenLinkProfiler HTML) and `.../audit/bl3/` (this refinement: Common Crawl retries, script `retry_cc.sh`).
Tool calls used: about 36 in total (about 29 in the first pass plus 7 in the refinement, one of which was wasted on a zsh word-splitting bug in a loop). That is at the budget ceiling, so no further lookups were made.

## 1. Bottom line

1. **No authority score (DR, DA, Authority Score, Trust Flow) and no backlink or referring-domain count could be obtained for any of the five domains.** Every free route that returns one was form-only, behind a captcha, blocked, unreachable from this machine or key-gated. Any figure I gave would be invented, so I give none. All "estimates" below are ordinal tiers (0 to 3) inferred from indirect signals, labelled as such, low confidence.
2. **Indirect evidence says shilikajain.com has a negligible backlink profile today.** The domain was registered 2026-05-04 (164 days old at the audit date). It has no Tranco rank, no off-site page found by search that mentions the domain, no Wayback 200 captures, and Common Crawl first saw it in the crawl of 2026-08-07 to 08-20 (2 URLs), then 348 URLs in the September 2026 crawl. All 10 crawls from 2025-51 to 2026-30 other than the August one returned "No Captures found" (now confirmed, see 3.2).
3. **All four competitors look stronger on most indirect signals measured**, with coinbound.io clearly the strongest (Tranco median ~729k, 5,000+ archived URLs, agency-directory placements, 7.5 year old domain). highvibepr.com is the smallest competitor (31 archived URLs, no Tranco rank) but is still older, listed on several directories and has an awards press release.
4. **The only candidate inbound links to shilikajain.com I found are founder profile pages** (DEV Community, Icebreaker) surfaced by a name search. I could NOT verify that either links to shilikajain.com, nor the rel attribute (section 3.4). Treat as unverified.
5. Off-site authority is the largest visible gap versus competitors, and on-site GEO changes cannot close it. This evidence cannot say whether the GEO work is "working"; it can only say the link side starts from near zero.

## 2. What was tried, and what happened (provenance)

| Route | Result | Status |
|---|---|---|
| Ahrefs API / MCP | Not retried (brief: "Insufficient plan") | Not available |
| Ahrefs free backlink checker `https://ahrefs.com/backlink-checker?input=shilikajain.com&mode=subdomains` (WebFetch) | Only the input form plus Ahrefs-wide index stats (493B pages, 285M domains, 35T backlinks). No domain data. Real data needs a live session and captcha, which I did not attempt to bypass | Failed |
| Ahrefs free website authority checker `https://www.ahrefs.com/website-authority-checker` | `curl` HTTP 301 only (same form-only product) | Failed |
| Semrush `https://www.semrush.com/website/coinbound.io/overview/` | WebFetch `connect ECONNREFUSED 34.120.45.191:443`; `curl` http=000 size=0. Unreachable from this environment | Failed |
| Similarweb `https://www.similarweb.com/website/coinbound.io/` | WebFetch `connect ECONNREFUSED 13.127.247.216:443`; `curl` http=000. Unreachable from this environment | Failed |
| Moz `https://moz.com/domain-analysis` | HTTP 403 (login-gated in any case) | Failed |
| Open PageRank (domcop) | `curl` HTTP 301 only; the API needs a key I do not have | Not obtained |
| OpenLinkProfiler (free, SEO PowerSuite crawler) | Old report URL `/r/<domain>` now HTTP 404. Homepage is a POST form with a `cf-turnstile-response` field (Cloudflare Turnstile bot check). I did not attempt to bypass it | Failed |
| seomcp.io `/domains/<domain>/referring-domains` (third-party, found via search) | HTTP 500 for both coinbound.io and shilikajain.com | Failed |
| Search for third-party DR figures `coinbound.io domain rating referring domains backlinks` | Only generic definitions and unrelated domains. Nothing usable | Failed |
| Ubersuggest | Login-gated, not attempted | Not obtained |
| Tranco rank API `https://tranco-list.eu/api/ranks/domain/<domain>` | Worked (section 3.1). One repeat call got HTTP 429 (saved in `bl2/tranco_eakdigital.com.json`), a later retry succeeded (`bl2/tranco_eak2.json`) | Partial |
| Common Crawl index, first pass (previous agent) | Worked for 3 of 5 domains in crawl 39 and 4 of 5 in crawl 34; several 502, 504 and connection errors | Partial |
| Common Crawl index, retry this pass (`bl3/retry_cc.sh`) | All 6 retried lookups returned cleanly (HTTP 200 with rows, or HTTP 404 "No Captures found"). Closes the earlier "unverified" cells (section 3.2) | Worked |
| Wayback CDX (previous agent) | Worked for all 5 (section 3.3) | Partial |
| RDAP (previous agent) | Worked for all 5 (domain age) | Worked |
| Wikipedia `exturlusage` and HN Algolia (previous agent) | 0 hits for shilikajain.com, highvibepr.com, eakdigital.com, outsetpr.io. coinbound.io: 1 http hit on a Wikipedia user talk page, and 3 HN hits that are `blog.coinfund.io` posts (a different domain, so a false match) | Worked, no signal |
| WebSearch operator and name queries | Worked but the tool is general web search, not a link index. `-site:` exclusion only partly honoured (section 3.4) | Partial |
| Majestic Million bulk CSV | Deliberately NOT downloaded (a bulk file download I had no approval to pull; size from memory, not checked). It is the cheapest next step for a link-derived rank on the competitors | Skipped |

## 3. Evidence

### 3.1 Domain age and Tranco rank

RDAP (`.../bl/rdap.txt`, `.../bl/rdap_io_parsed.txt`):

| Domain | Registered | Age at 2026-10-15 |
|---|---|---|
| shilikajain.com | 2026-05-04 (expires 2029-05-04) | 164 days |
| outsetpr.io | 2023-04-05 | ~3.5 years |
| highvibepr.com | 2020-06-29 | ~6.3 years |
| coinbound.io | 2019-05-01 | ~7.5 years |
| eakdigital.com | 2016-05-31 | ~10.4 years |

Tranco, command `curl -s "https://tranco-list.eu/api/ranks/domain/$d"`:

| Domain | Result |
|---|---|
| shilikajain.com, www.shilikajain.com | `{"ranks": [], "domain": ...}` (not ranked) |
| highvibepr.com | `{"ranks": []}` (not ranked) |
| outsetpr.io | `{"ranks": []}` (not ranked) |
| eakdigital.com | 38 days (2026-09-07 to 2026-10-14): median 1,552,675, best 1,531,269, worst 1,811,819, latest 1,752,219 (`bl2/tranco_eak2.json`) |
| coinbound.io | 38 days (2026-09-07 to 2026-10-14): median 729,104, best 723,232, worst 904,236, latest 864,967 (`bl2/tranco_coinbound.io.json`) |

Caveats: ranks above 1,000,000 appear, so the list behind this API is larger than the classic top 1M; I did not verify its length or source mix. "Not ranked" means below the cut or absent, not "zero links". Tranco is a traffic and popularity ranking, so it is a weak link proxy.

### 3.2 Common Crawl (pages Common Crawl fetched FROM the domain itself)

This is NOT a backlink list. It is used only as a visibility proxy (Common Crawl crawl selection is understood to use link-graph signals; not re-verified this session). Index query used: `https://index.commoncrawl.org/<crawl>-index?url=<domain>&matchType=domain&output=json&fl=url,status,timestamp`.

shilikajain.com across the last 10 crawls (`.../bl/cc_index2.txt`, retries in `.../bl3/`):

| Crawl | Result |
|---|---|
| CC-MAIN-2026-39 (2026-09-04 to 09-17) | 348 URLs, all on `www.shilikajain.com`, all HTTP 200 |
| CC-MAIN-2026-34 (2026-08-07 to 08-20) | 2 URLs: `/playbook/cybersecurity-pr-2026` and `/robots.txt`, both 200 |
| CC-MAIN-2026-30, 2026-25, 2026-21, 2026-12, 2025-51 | `No Captures found for: shilikajain.com` |
| CC-MAIN-2026-17, 2026-08, 2026-04 | Earlier 502 or connection error. **Retried this pass: HTTP 404 `No Captures found for: shilikajain.com` for all three** (now confirmed, no longer unverified) |

Note that crawls 04, 08, 12 and 17 end before the RDAP registration date (2026-05-04), so empty results there are expected. Crawl 21 (2026-05-08 to 05-21) began 4 days after registration. The first real sighting is 3 months after registration.

Competitors, with HTTP status mix from the local jsonl files (`.../bl/` and `.../bl3/`):

| Domain | Crawl 39 URLs (status mix) | Crawl 34 URLs (status mix) |
|---|---|---|
| coinbound.io | 356 (328 x 200, 26 x 308, 1 x 307, 1 x 404; hosts coinbound.io 348, newsletter.coinbound.io 8) | 282 (259 x 200, 20 x 301, 1 x 307, 2 x 404) |
| shilikajain.com | 348 (348 x 200) | 2 (2 x 200) |
| outsetpr.io | **42 (38 x 200, 2 x 301, 2 x 404)**, retry succeeded this pass | 51 (46 x 200, 4 x 301, 1 x 404) |
| highvibepr.com | 25 (21 x 200, 2 x 302, 1 x 301, 1 x 404) | 1 (robots.txt, HTTP 403) |
| eakdigital.com | **10 (7 x 403, 2 x 200, 1 x 301)**, retry succeeded this pass | **7 (6 x 403, 1 x 200)**, retry succeeded this pass |

Reading:
- 348 vs 356 for coinbound.io is NOT evidence of parity. Page count per crawl mostly reflects how many URLs a site exposes (the brief lists ~120 playbooks, ~106 landing pages and 28 tools for shilikajain.com) and crawl budget, and September is the first meaningful visit. Earlier "No Captures" results are as consistent with a 3 month old domain as with missing inbound links. Weak signal either way.
- eakdigital.com is mostly 403 to Common Crawl (13 of 17 rows across the two crawls), so its low CC count reflects a bot block, not a small site (Wayback shows 2,865 archived 200 URLs). CC counts are not comparable for that domain. Inference, not verified: a WAF or hosting rule blocks CCBot.
- Contrast with shilikajain.com: its robots.txt explicitly allows CCBot, and all 348 fetches were 200. That is good for AI-training and index inclusion, but says nothing about inbound links.

### 3.3 Wayback Machine (CDX)

From `.../bl/wb_all.txt` and `.../bl/wb_200_<domain>.json` (unique URLs with HTTP 200, `collapse=urlkey`, limit 5000):

| Domain | Unique 200 URLs archived | Note |
|---|---|---|
| shilikajain.com | 0 (file is `[]`) | Only 301 captures seen: `http://shilikajain.com/` 2025-02-12 and 2025-07-13; `x.shilikajain.com` 2025-01-31 and 2025-02-08 |
| highvibepr.com | 31 | |
| outsetpr.io | 1,153 | |
| eakdigital.com | 2,865 | |
| coinbound.io | 5,000 (hit the limit, true count higher) | |

Caveats: (a) the "first/last capture" lines in `wb.sh` use `limit=1` / `limit=-3`, which CDX returns in URL-key order, not chronological order, so they are not a reliable date range (highvibepr.com's "last" captures show 2021 login URLs). (b) The shilikajain.com 301 captures from 2025 pre-date the RDAP registration date of 2026-05-04. Inference (unverified): the domain was previously held by someone else and lapsed or was re-registered. If so, any link history belongs to the previous owner, may be irrelevant or spammy, and cannot be seen without a real backlink index. Check this in Search Console's Links report once connected.

### 3.4 Search-engine operator queries (WebSearch tool, US-only, `-site:` unreliable)

| Query | Result |
|---|---|
| `"shilikajain.com" -site:shilikajain.com` | Zero pages mentioning the domain. Results were name collisions (Shilpi Jain, Shilki Jain, Silky Jain director profiles on qorpiq.com, tofler.in, marketscreener.com) |
| `"shilikajain.com"` | Same, zero relevant pages |
| `"coinbound.io" -site:coinbound.io` | Off-site: Clutch profile, Bitmedia comparison article (`bitmedia.io/blog/bitmedia-vs-coinbound`). Trustpilot "Coinbound Gaming" is a different business. Own pages leaked past the exclusion |
| `"outsetpr.io" -site:outsetpr.io` | Off-site: Clutch profile, a Coingape review (`coingape.com/outset-pr-review/`), a MEXC news item, a Publish0x post, a cryptodaily.co.uk ranking article. Own pages leaked past the exclusion |
| `"eakdigital.com" -site:eakdigital.com` | Off-site: many CB Insights profile and compare pages (profile unclaimed). Exclusion honoured |
| `"highvibepr.com" -site:highvibepr.com` | Off-site: DesignRush profile, web3.career and cryptojobslist job listings, a Hackernoon author page, superbcompanies.com, a syndicated press release about the PR Net Next Gen Awards 2026 |

Caveat: these are pages that MENTION the brand. Whether each carries a followed link to the domain is not verified. The search tool is not a link index, so absence is weak evidence. The contrast (zero versus 1 to 6 distinct third-party sources per competitor under an identical query) is like for like, but the counts do not rank the competitors (coinbound.io has a low count yet is strongest elsewhere, because its own pages crowded out the results).

Name query `"Shilika Jain" PR consultant Web3 crypto AI cybersecurity` surfaced `dev.to/shilika`, a second DEV mirror (`medialegacy1.dev.to/...`) and an Icebreaker profile (`app.icebreaker.xyz/profiles/linkedin-shilika`). The search tool's summary text said her profile lists `shilikajain.com`. Verification attempts:
- Icebreaker: `curl` fetched the page (HTTP 200, 228KB, saved as `bl/ice.html`). `grep -i shilikajain` found 0 matches in the raw HTML (a client-rendered Next.js page). Link NOT confirmed. Wayback CDX has no snapshots of that URL (`[]`).
- DEV: `dev.to` is unreachable from this environment (`curl` connect timeouts to 151.101.x.x; WebFetch "Command failed with no output"). Wayback availability returned `{"archived_snapshots": {}}` and CDX `[]`, so no archived copy either. Not verified.

So: possible inbound links from a DEV profile and an Icebreaker profile, **unverified**, rel attribute **unknown**. Profile links on community sites are often nofollow or ugc, so even if present they would carry little ranking value (general pattern, not checked for these two).

### 3.5 Referral tags in archived URLs (proxy for where tracked links come from)

Local analysis of the Wayback URL lists: `utm_source` / `ref` values found in archived URLs (a tagged URL in the archive means someone published a link carrying that tag, hinting at referring sources the owner controls or encouraged):

| Domain | Tagged URLs | Sources seen |
|---|---|---|
| shilikajain.com | 0 (no 200 archive) | none |
| highvibepr.com | 2 | chatgpt.com (2) |
| outsetpr.io | 9 | chatgpt.com (5), bitzo, cd, cryptonews, icoda.io |
| eakdigital.com | 18 | spaziocrypto.com language subdomains (de, en, es, fr, ja, ko, ru, zh), chatgpt.com (2), attirer.io, cryptoslate, luma, twitter, hs_email |
| coinbound.io | 65 | newsletter.coinbound.io (18, own), t.co and twitter, coinscribble (own), hackernoon.com (3), reddit (3), nomics (2), openai (2), chatgpt.com (2), themanifest.com, agencyvista.com, topdesignfirms.com, upcity, blockspot, cryptobrowser, cryptwerk, blog.coinhako.com, lunarblog |

Takeaways: (1) competitors appear on agency directories and crypto media (themanifest, agencyvista, topdesignfirms, upcity, cryptwerk, hackernoon, cryptoslate, cryptonews). (2) chatgpt.com shows as a utm_source on all 4 competitors in the archive, which is evidence of AI referral traffic landing on those sites; nothing comparable can be checked for shilikajain.com because it has no archive. (3) This is a sample of tags, not a count of backlinks.

## 4. Like-for-like comparison (ALL ESTIMATE TIERS, none measured)

Tier scale: 0 negligible, 1 low, 2 moderate, 3 established. Tiers are my judgment from the indirect signals above, low confidence. They are NOT DR or DA values and must not be quoted as such.

| Signal | shilikajain.com | highvibepr.com | outsetpr.io | eakdigital.com | coinbound.io |
|---|---|---|---|---|---|
| Domain age | 164 days | ~6.3 y | ~3.5 y | ~10.4 y | ~7.5 y |
| Tranco (38-day median) | not ranked | not ranked | not ranked | ~1.55M | ~729k |
| Wayback unique 200 URLs | 0 | 31 | 1,153 | 2,865 | 5,000+ (limit) |
| CC URLs, crawl 39 (of which HTTP 200) | 348 (348) | 25 (21) | 42 (38) | 10 (2; 7 are 403, bot block) | 356 (328) |
| Distinct third-party sources via operator search | 0 | 6 | 5 | 1 (CB Insights, many pages) | 2 |
| Authority score obtained | none | none | none | none | none |
| Backlink or ref-domain count obtained | none | none | none | none | none |
| Estimated tier | 0 | 1 | 2 | 2 | 3 |

Why those tiers: coinbound.io is highest on traffic rank, archive depth, directory presence and age. outsetpr.io has a deep archive and press and review coverage but no Tranco rank. eakdigital.com is old and large (programmatic listicles) but ranks poorly on Tranco and its only search-visible third-party presence is an unclaimed CB Insights profile. highvibepr.com is a small site but older, listed on several directories, with an awards press release. shilikajain.com has nothing detectable beyond possible profile links. The shilikajain.com page counts in Common Crawl are high only because the site exposes hundreds of pages; they do not indicate link strength and the tier stays 0.

## 5. Notable referring domains and anchor themes

- **shilikajain.com:** nothing verified. Unverified candidates only: DEV Community profile, Icebreaker profile. No anchor text data is obtainable without a backlink index.
- **Competitors:** no anchor data for any. Referral-source themes observed (tagged URLs and search): agency directories and review sites (Clutch, DesignRush, themanifest, agencyvista, topdesignfirms, upcity, cryptwerk, superbcompanies, CB Insights), crypto media and syndication (hackernoon, cryptoslate, cryptonews, coingape, cryptodaily.co.uk, MEXC news, publish0x, spaziocrypto translations), job boards (web3.career, cryptojobslist) and their own newsletters.

## 6. Interpretation and risks

- "Undetectable by free tools" is not "zero links". Free routes under-count, especially for a 5 month old domain, because link indexes take weeks to months to discover new links.
- The machine-translated locales and the large programmatic page set grow the site far faster than links can, so the pages-to-referring-domains ratio is likely extreme (hypothesis, unverified). That can limit how much crawl and ranking credit the new pages earn.
- `x.shilikajain.com` currently returns a Vercel 404 `DEPLOYMENT_NOT_FOUND` (`.../bl/live_headers_robots.txt`) and was archived as a 301 in Jan and Feb 2025. A DNS record pointing at a platform with no deployment is a small hygiene and subdomain-takeover risk. Not a backlink issue; flagged because it surfaced in the evidence.
- Apex `https://shilikajain.com/` returns 307 (temporary) to `https://www.shilikajain.com/` (live headers, `x-vercel-id` bom1). The plain `http://` form returns 308 to `https://shilikajain.com/`, so an http link takes a two-hop chain (308 then 307). Observed in headers only; a permanent redirect (308 or 301) for the apex to www is the cleaner signal for links to the non-www form. No ranking impact was measured.

## 7. Recommended next steps

1. Connect Google Search Console. Its Links report (top linking sites, top linked pages, top anchor text) is the only authoritative free source for this domain.
2. Run the Ahrefs free checker and the Moz and Semrush web UIs manually in a normal browser for all five domains (about 10 minutes). They need a live session or captcha, which this audit did not and should not bypass.
3. Verify the DEV and Icebreaker profile links and rel attributes in a browser, and set the website field on LinkedIn, X and other profiles to `https://www.shilikajain.com/`.
4. Pursue the placement types competitors show: Clutch, DesignRush, The Manifest, crypto and AI agency directories, plus bylines and quotes in crypto media. These are where competitors' tagged links come from.
5. Switch the apex redirect from 307 to 308 or 301 (or set the primary domain at Vercel domain level).
6. Remove or repoint the dangling `x.shilikajain.com` DNS record.
7. Re-run this comparison in 60 to 90 days once link indexes have had time to find the domain, and optionally add the Majestic Million lookup for the competitors (needs explicit approval for the bulk file).

## 8. Commands run (summary)

```
ls .../audit/bl/                                          # previous agent data
curl -s https://tranco-list.eu/api/ranks/domain/<domain>  # 6 hostnames, plus repeats for coinbound.io and eakdigital.com
curl -s -o /dev/null -w "%{http_code}" <semrush|similarweb|moz|domcop|ahrefs|openlinkprofiler URLs>
curl -s https://app.icebreaker.xyz/profiles/linkedin-shilika | grep -i shilikajain   # 0 matches
curl "https://archive.org/wayback/available?url=dev.to/shilika"                       # {"archived_snapshots": {}}
curl "https://index.commoncrawl.org/CC-MAIN-2026-39-index?url=shilikajain.com&matchType=domain&output=json&showNumPages=true"   # {"pages": 1, ...}
bl3/retry_cc.sh   # 6 retries of CC index lookups, output:
  CC-MAIN-2026-39 outsetpr.io     http=200 lines=42
  CC-MAIN-2026-39 eakdigital.com  http=200 lines=10
  CC-MAIN-2026-34 eakdigital.com  http=200 lines=7
  CC-MAIN-2026-17 shilikajain.com http=404 "No Captures found for: shilikajain.com"
  CC-MAIN-2026-08 shilikajain.com http=404 "No Captures found for: shilikajain.com"
  CC-MAIN-2026-04 shilikajain.com http=404 "No Captures found for: shilikajain.com"
python3 -I (parse utm_source/ref from bl/wb_200_*.json; tally CC status and host mix from jsonl files)
WebSearch x8 (7 operator or name queries, 1 DR query); WebFetch x8 (Ahrefs form-only; Semrush, Similarweb, DEV, OpenLinkProfiler x2, seomcp.io x2 failed)
```
