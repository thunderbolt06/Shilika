# Measurement and attribution readiness audit (AI + organic visibility)

Site: shilikajain.com / www.shilikajain.com. Audit date: 2026-10-15. Auditor: read-only code and data review.
Scope: instrumentation.ts, instrumentation-client.ts, middleware.ts, lib/axiom.ts, app/layout.tsx, analytics and conversion plumbing, lib/integrations, supabase/migrations, data/ai-citation-panel.
Nothing inside /Users/thunderbolt/Documents/projects/Shilika was modified (git status shows the same 34 entries as at session start: 32 modified, 2 untracked). All drafts live under the scratchpad (see section 8).

Revision note (2026-10-16 resume after a usage-limit interruption): the first pass of this report was written while the live site was unreachable. On resume the site answered, so section 1 now carries direct live-production evidence (served tags, verification meta, cache headers, a GPTBot-UA fetch) and Q5 now carries first-hand evidence from Google's own help page (opened this time, not just search excerpts). Every other claim was re-checked against the working tree; nothing contradicted the first pass. The drafts in audit/proposed/ were re-validated (tsc exit 0, classifier and attribution tests pass).

## 0. Verdict

Measurement health: **3 / 10**.

The site is well instrumented for one thing, paid-click conversions on Calendly and the contact channels (Google Ads tag + a /thank-you router + PostHog autocapture). It is essentially blind to the thing the GEO program was built for. Specifically:

1. No AI crawler is logged anywhere (no UA detection exists in any runtime path).
2. No AI referral (chatgpt.com, perplexity.ai, gemini.google.com, claude.ai, copilot) is captured into a lead, a form, or Supabase. Only utm_* and gclid are stashed, in sessionStorage, and only re-appended to Calendly links.
3. Leads go to Notion + email only. There is no leads table in Supabase and no attribution field beyond a page path.
4. There is no conversion event that knows a visitor came from an AI assistant.
5. The 4-engine citation panel (the README's core KPI) has never produced real data. Only a Google SERP proxy exists.
6. The GSC and GA daily pulls exist as code but are not scheduled (crons removed 2026-09-25) and GA4 has no tag in the code at all.
7. Search Console verification cannot be confirmed from outside the account. Evidence: a `google-site-verification` DNS TXT record exists at the apex (Domain-property method), no meta-tag verification is served, and a service account is configured. Google's help page (opened 2026-10-16) confirms the Generative AI performance report is rolled out to all sites as of 2026-08-31, but it is impressions-only, has a UI export and no documented API or BigQuery access, and may not appear for sites with too few AI impressions. Status: "probably verified, report probably available, never used".

The good news: everything needed to fix this is free and already half wired (Axiom token present, Supabase present, PostHog live, GSC service account present). The minimal stack is about 6 files changed, 3 new files, 1 migration. Drafts were typechecked (tsc exit 0) and unit-tested in the scratchpad.

## 1. Environment limits (what is UNVERIFIED and why)

- First pass (2026-10-15 19:40 local): the live site could not be reached; `curl` to www.shilikajain.com timed out (30 s, then 20 s with `-4`) while `curl https://example.com/` returned 200 in 0.13 s. Cause was most likely a Vercel Firewall challenge, see the next bullet.
- Resume pass (2026-10-16): the site now answers (`curl` home: http 200 in 0.14 s), so the following are now VERIFIED against production, using 6 single requests:
  - Served tags on the homepage (218,924 bytes, `x-vercel-cache: HIT`, `age: 23667`): exactly one Google tag, `gtag('config','AW-18324652879',{allow_enhanced_conversions:true})`. No `G-` GA4 measurement ID, no `GTM-` container, in the served HTML.
  - Served first-party scripts: `/assets/analytics.js` (PostHog), `/assets/conversions.js`, `/assets/site.js`, `/assets/intro-cards.js`, plus the Apollo tracker snippet. No `attribution.js` (not built yet).
  - No `google-site-verification`, `msvalidate` or `ahrefs-site-verification` meta tag is served. So any GSC verification is by DNS TXT (present) or another method, not by meta tag.
  - No link to a privacy, cookie or terms page in the homepage HTML (grep returned only the youtube-nocookie host).
  - Inline Calendly widget in production: `data-url="https://calendly.com/shilikajain/30min/?hide_gdpr_banner=1"` (no UTM).
  - robots.txt allows OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, GPTBot, ClaudeBot, Google-Extended (each with the same Disallow list for /admin, /api/admin, /api/cron).
  - The logging blind spot is proven live, not only inferred: a request with a GPTBot User-Agent to `/llms.txt` returned `200`, `x-vercel-cache: HIT`, `age: 182`, and a PerplexityBot-UA request to `/playbook/crypto-pr-cost-2026` returned `200`, `x-vercel-cache: HIT`, `age: 23846`. Cached responses never reach a function, and the current middleware matcher is admin-only, so neither request could have been recorded anywhere (Axiom, Supabase or app code). Only a middleware that matches public routes, or Vercel's own request logs, can see them. (These 2 UA requests are my own test traffic and would show in any future bot log as test hits from this machine.)
  - `/thank-you?via=calendly` returns 200 `x-vercel-cache: MISS` (dynamic, so it does reach a function and OTel could trace it).
  - `POST /api/track` currently returns 404, i.e. the proposed endpoint does not exist in production, as expected.
  Still UNVERIFIED: whether production matches the working tree (the 2026-10-01 note says production lags the tree), and everything that needs a dashboard login (section 1, last bullets).
- Likely cause (corroborated by sibling audit artifacts in the same scratchpad, not by my own request): Vercel's Firewall answers bursts from this shared IP with a "Vercel Security Checkpoint" challenge (`403`, `x-vercel-mitigated: challenge`). See `audit/crawl.md` (finding H2: triggered after about 120 requests, IP-based, lasted about 8 minutes, hit `/robots.txt` too) and `audit/live_home.html` (a saved copy that is the checkpoint page, not the site). The same sibling run's `audit/ua/ua_results.txt` shows 19 user agents (GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Claude-SearchBot, Googlebot, Bingbot, Google-Extended string, browser, curl) each receiving identical 200 responses (same byte size and md5) for 8 URLs at 17:38 local, before the challenge fired. I did not independently reproduce either result. Measurement relevance: a request blocked by the firewall never reaches middleware, so middleware logging cannot see challenged or denied crawlers. The free place to see those is the Vercel Firewall traffic view (section 10, item 6).
- Ahrefs API and Google Search Console were not used (per instructions). The service-account credentials in .env.local were NOT used to call Google or Supabase.
- Supabase, Axiom, PostHog, Notion, Google Ads and Calendly dashboards were not queried. So row counts, last cron runs, whether PostHog contains any AI-referred sessions, and whether Ads counts duplicate conversions are UNVERIFIED. SQL and click paths to check each are given in section 9.
- The 2026-10-01 production-state note says production lags the working tree; the 34 local modifications are not necessarily live.

## 2. Direct answers to the six questions

### Q1. Is there any logging of AI crawler hits?

**No.** Evidence:

- middleware.ts matcher is only `['/admin/:path*', '/api/admin/:path*']`. It never runs for public pages, and it does no UA inspection.
- instrumentation.ts registers an OpenTelemetry trace exporter to Axiom (nodejs runtime, only if AXIOM_TOKEN and AXIOM_DATASET are set) and `onRequestError` (errors only). lib/axiom.ts defines a logger, but the only call sites of `logger` are `onRequestError` and the `/api/axiom` proxy. There are zero `logger.info` calls in app/, lib/, components/.
- instrumentation-client.ts sends only `window.error` and `unhandledrejection` to `/api/axiom`.
- Repo-wide grep for crawler names in executable code (excluding node_modules, .next, worktrees) hits only: app/robots.ts (allow rules), the free tools (RobotsSitemapGenerator, AiCitabilityChecker, page-scan, which analyse other people's sites), and a comment in app/api/markdown/blog/[slug]/route.ts. No code reads `user-agent` from an incoming page request.
- Most pages are static partials read with readFileSync, so on Vercel they are served from cache and never reach a function. Even OTel spans would not see them. Only middleware (which runs before the cache) can.
- Important fact: **Google-Extended can never be logged.** It is a robots.txt control token, not a User-Agent. Gemini grounding and AI Overviews crawl as Googlebot. The measurement for that is Search Console, not server logs.
- No Supabase table exists for bot hits (tables used in code: content_ideas, blog_posts, knowledge_base, llm_batches, analytics_search_console, cron_runs, content_metrics, authors).

### Q2. Is AI referral traffic captured into leads / forms / Supabase?

**No.**

- Repo-wide grep for `chatgpt.com|perplexity.ai|gemini.google|claude.ai|copilot.microsoft|utm_source=chatgpt|document.referrer|get('referer')` in code returns nothing outside data/ai-citation-panel and one Perplexity API endpoint. `document.referrer` is never read by any first-party script.
- public/assets/site.js (lines 236-262) and public/assets/ads.js (lines 31-50) stash `gclid` and `utm_source|medium|campaign|term|content` in **sessionStorage** (lost when the tab closes) and use them only to decorate `<a href*="calendly.com">` links. They are never added to the form payloads.
- The inline Calendly widgets on the homepage and /contact have a static `data-url="https://calendly.com/shilikajain/30min/?hide_gdpr_banner=1"` (app/_partials/homepage-body.html:692, contact-body.html:90). decorateCalendlyLinks() only touches anchors, so a booking made inside those widgets carries no UTM unless the Calendly embed itself forwards the host-page query string (UNVERIFIED). Only /ads builds a tagged URL for its widget.
- A visitor from Perplexity, Claude, Gemini or Copilot normally has no utm_* at all (referrer only), so the existing stash captures nothing for them. ChatGPT is reported to append utm_source=chatgpt.com to many (not all) outbound links, without utm_medium (third-party sources, see Sources; UNVERIFIED by me against OpenAI documentation). That one case is stashed but then dropped at form time.
- PostHog (public/assets/analytics.js) autocaptures `$referrer`, `$referring_domain` and utm_* as default event properties, so AI referrals should already exist in PostHog as raw referrer data (UNVERIFIED: I could not open the project). There is no AI classification and no join to the lead.

### Q3. Is lead-source attribution stored in the contact flow?

**Barely, and not for the main form.**

| Entry point | Payload `source` | utm / referrer / gclid | Stored where |
|---|---|---|---|
| #contact-form (site.js:189-195, homepage + /contact, 2 partials) | none sent | none | Notion + email |
| #intent-form (pages.js:117-129, 106 landing pages) | `data-source` (hard-coded page path) or pathname | none | Notion + email |
| Free tools email-result (app/api/tools/email-result/route.ts) | `Tool: <name> (<url>)` | none | Notion + email |
| Calendly links | n/a | utm_* + gclid appended to link (session only) | Calendly only |

- app/api/contact/route.ts accepts `source` (300 chars), writes it to the Notion `Source` rich_text and the email row "Came from". There is no Supabase write at all. No `leads` table exists in supabase/migrations 0001-0007.
- No PostHog `identify` and no distinct_id stored with the lead, so a lead cannot be joined back to its PostHog session.
- Locale pages (es, zh, ko, ja, ru) do not pass the language into the payload, and the intent form sends the English `data-source`, so locale performance by lead is not separable.

### Q4. Are there conversion events for AI-referred visitors?

**No.**

- PostHog: `contact_conversion {via}` (conversions.js:39), `talk_popup_shown`, `tool_email_result`, `video_play`, `hero_reel_unmute`. None carries an AI-source property.
- Google Ads: one conversion label `AW-18324652879/pGrNCImphYUdEM-G8KFE` is fired from site.js:279-320 and ads.js:63-86 for three different things with three values: Calendly link click USD 40, `calendly.profile_page_viewed` USD 80, `calendly.event_scheduled` USD 400. The /thank-you page is also described in conversions.js and app/thank-you/page.tsx as "the URL Google Ads counts as the conversion". Possible double or triple counting of one visitor (UNVERIFIED without the Ads UI), and the value mix is not a clean signal.
- Ads only credits ad clicks, so these events say nothing about AI visitors anyway.
- There is no GA4 tag. app/layout.tsx:85 runs only `gtag('config', 'AW-18324652879', {allow_enhanced_conversions:true})`. No `G-` measurement ID and no GTM container exist anywhere in the code (grep returned nothing); `NEXT_PUBLIC_GTAG_ID` is not defined in .env.local or .env.example (default hard-coded in the layout). A GA4 stream could only exist if it was attached to the Google tag as a destination in the Google tag settings UI (UNVERIFIED). .env.local has GA_PROPERTY_ID and GA_SERVICE_ACCOUNT_JSON both EMPTY, so lib/integrations/ga.ts and the ga-daily-pull cron have never been able to run locally.
- enhanced conversions flag is on, but no `user_data` is ever set (grep: none). Harmless but pointless.

### Q5. Is Search Console verified, and can the Generative AI performance report be used?

**Probably verified; report probably available; usage UNVERIFIED and currently unused by the pipeline.**

Evidence for verification:
- `dig +short TXT shilikajain.com` returned a `google-site-verification=...` record (plus an SPF record). That is the Domain-property method. It proves a token exists at the apex, not which Google account owns it.
- .env.local: `GSC_SITE_URL=sc-domain:shilikajain.com`, `GSC_SERVICE_ACCOUNT_JSON` set and parses (has client_email and private_key, SA domain rahil-jain.iam.gserviceaccount.com). Whether that service account was added as a user on the property is UNVERIFIED (if not, every pull returns 403).
- No `google-site-verification` meta tag is in app/layout.tsx, app/robots.ts or any partial (grep none). The live HTML could not be fetched.
- No Bing verification anywhere (`msvalidate` not found, no BingSiteAuth, DNS TXT shows only Google + SPF).

Evidence for the report (first-hand this time: I fetched https://support.google.com/webmasters/answer/16984139?hl=en on 2026-10-16 and summarised it; the launch blog URL returned only site navigation, so the blog text itself was not read):
- Coverage: impressions from AI Overviews and AI Mode on Google Search. Discover is not included (it has a separate generative AI report). Search Labs experiments are excluded.
- Metrics: **impressions only**, no clicks. Dimensions: page (final URL mapped to canonical), country, date (Pacific Time), device. Filter by search type: Web text-based or Web multimodal (Lens, Circle to Search).
- Table limits: the standard 1,000-row limit applies. Export: an export button downloads chart and table data; cells shown as "~" or "-" export as zeros.
- API and BigQuery: **not mentioned** on the help page. So treat as UI-only. (One third-party check on 2026-08-11 also found no API exposure, UNVERIFIED by me.) Data retention: not stated.
- Eligibility: "may not appear if the site lacks enough generative AI impressions", and sites excluded from Search generative AI features have no data. As of 2026-08-31 the report is available to all websites worldwide.
- Consequence: the Generative AI report can be used by SJ now (assuming she has owner or full-user access to the property), but only as a monthly manual CSV export of impressions per page. It cannot feed the existing `gsc-daily-pull` cron, and it cannot show clicks or leads. AI Mode clicks and impressions may also appear in the normal Performance report under the Web search type (third-party reports, UNVERIFIED by me).
- data/ai-citation-panel/summary/2026-10-01-production-state-verification.md lists "Enable the Search Console Generative AI performance report" as an open SJ action, and day90 report says GSC was "not connectable headless". No file records that anyone opened the report.

Pipeline status:
- app/api/cron/gsc-daily-pull and ga-daily-pull exist, write to analytics_search_console and content_metrics, and are idempotent upserts.
- **They are not scheduled.** vercel.json has no `crons` array. `git log` shows commit 6344f75 (2026-09-25) "Pause all Vercel cron jobs" removed all 8 crons because hourly jobs exceeded the Hobby plan limit. SETUP.md section 7 still documents them as active. So analytics_search_console, if it has data, is stale since about 2026-09-25 and the queue-filler's `gscOpportunityQueries()` feed is starved.
- The GSC pull dimensions are query, page, date only. Nothing AI specific.

### Q6. Which KPIs remain unmeasured?

See section 6. Short version: every engine-level AI citation KPI in README.md (4 engines x 25 prompts x 3 runs) is unmeasured; the Day-90 lead KPI, GSC ranking-page KPIs, referring-domain KPI and brand-search KPI are all unmeasured; only a Google-SERP proxy exists.

## 3. Instrumentation inventory (what exists)

| Layer | Component | Status |
|---|---|---|
| Web analytics | PostHog EU, key in public/assets/analytics.js, autocapture + pageview + pageleave, `person_profiles: identified_only`, loaded `lazyOnload` | Present. CTA events likely never bind (defect D3). Project data unverified |
| Ads | gtag AW-18324652879, 1 conversion label, 3 values | Present. Design issues (D5) |
| GA4 | none in code | Absent (D4) |
| Apollo | website tracker appId 6a44e09c... in layout.tsx:90 | Present (visitor identification, outside scope) |
| Conversions | conversions.js routes every contact action to /thank-you?via=... | Present, good design for URL-based conversions |
| Errors/traces | Axiom (OTel traces + client error proxy) | Present, env set locally, production unverified |
| Leads | Notion DB + SMTP email | Present, no attribution (D2) |
| Search | GSC service-account pull + analytics_search_console | Code present, unscheduled (D6) |
| GA data | ga.ts + content_metrics | Code present, no GA4, env empty (D4) |
| AI panel | scripts/ai-citation-rollup.mjs, 4 dated SERP CSVs | Proxy only (D7) |
| Bot logging | none | Absent (D1) |
| Consent / privacy | none found in app/ (no privacy, terms or cookie route or link) | Absent (D8) |

## 4. Defects, ranked

| ID | Severity | Finding | Evidence |
|---|---|---|---|
| D1 | critical | No AI crawler logging and no AI referral logging; GEO work cannot be attributed to any machine or human visit | middleware.ts matcher admin-only; no logger.info calls; grep results above |
| D2 | high | Lead attribution absent. Main form sends no source; no utm/referrer/gclid in any payload; no Supabase leads table | site.js:189-195, pages.js:117-129, route.ts, migrations 0001-0007 |
| D3 | medium | PostHog named CTA events (`contact_form_submit`, `calendly_click`, `resume_click`) are bound inside `window.addEventListener('DOMContentLoaded', ...)`, but analytics.js is loaded with `strategy="lazyOnload"` (layout.tsx:77), i.e. after window load. DOMContentLoaded has already fired, so these handlers almost certainly never run. Code-reading conclusion, not runtime-verified | analytics.js:39-56, layout.tsx:77 |
| D4 | high | GA4 not installed (no G- ID) and GA env empty; ga-daily-pull cannot run; any "GA4 + Calendly + form attribution" KPI is unmeasurable via GA | layout.tsx:85, .env.local names check |
| D5 | medium | Google Ads: one conversion label shared by click (40), profile view (80), booked (400), plus /thank-you URL conversion; likely duplicate counting and inflated value (UNVERIFIED in Ads). Also site.js is loaded by two different URLs (`?v=hash` on the homepage vs plain on EditorialScripts routes), so a client-side navigation between them could double-register listeners (UNVERIFIED, test in browser) | site.js:279-320, ads.js:63-86, conversions.js, app/page.tsx:70 vs EditorialScripts.tsx:11 |
| D6 | high | All crons removed 2026-09-25; GSC pull stale; SETUP.md out of date | commit 6344f75, vercel.json |
| D7 | high | No real 4-engine citation data ever collected. results/ has chatgpt/zz-fixture-2026-08-04.csv (header row only) and 4 google_serp CSVs of 25 rows; no perplexity, claude, gemini folders | `ls -R data/ai-citation-panel/results`, day90 report "Blocked / not run" |
| D8 | medium | No privacy policy, no consent banner/consent mode while running PostHog autocapture, Google Ads tag and Apollo tracker, for an APAC/EU-facing audience. Storing referrer host + PostHog id in leads (proposed) should be disclosed | grep for consent/privacy: none |
| D9 | low | `/api/axiom` is an unauthenticated public proxy into the Axiom dataset (createProxyRouteHandler), so anyone can inject rows or burn ingest quota | app/api/axiom/route.ts |
| D10 | low | Inline Calendly widgets (home, /contact) carry no attribution | partials above |

## 5. What is working (do not break)

- /thank-you?via=<channel> router (conversions.js) is a clean, single funnel for every contact action, excludes /admin and /thank-you, uses capture phase, and handles Cmd/Ctrl-click. Keep it; extend it (section 8).
- UTM and gclid are stashed and passed to Calendly links, so paid attribution inside Calendly works for link clicks.
- Lead email + Notion run in parallel with allSettled so one failure does not lose the lead.
- Cron runs are ledgered in cron_runs (when they run).
- robots.ts explicitly allows OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, GPTBot, ClaudeBot, Google-Extended, CCBot; so the crawl door is open, there is just no one watching it.
- The SERP-proxy panel is honestly labelled a proxy in every report, and the rollup script is reusable for real engine CSVs.

## 6. KPI measurability matrix

Sources: data/ai-citation-panel/README.md (Targets, Methodology) and summary/2026-08-14-day90-report.md (rollup table).

| KPI | Measured today? | Evidence | After proposed stack |
|---|---|---|---|
| 8-15 cited mentions across 25 prompts x 4 engines (100 cells) | **No** | results/ has no engine CSVs; day90: "never run with real data" | Manual monthly panel (SJ) or API-assisted for Perplexity; CSV schema already defined |
| Perplexity citation rate >= 30% on Bucket A | **No** | no perplexity results | same |
| Gemini and ChatGPT citation rate >= 15% on Bucket E | **No** | no gemini or chatgpt results (fixture is header only) | same |
| >= 1 citation in Buckets B, C, D per engine | **No** (SERP proxy says B 3/5, C 2/5, D 1/5 surfaced in Google organic on 2026-09-25, that is not engine citation) | 2026-09-25-rollup.md | same |
| Citation rank and competitor share per engine | **No** (only google_serp competitor domains) | rollup | same |
| 3 runs per prompt variance control | **No** | never run | monthly protocol |
| 25+ ranking pages (top 100) in GSC | **No** | day90: "Blocked to verify"; cron paused | gsc-daily-pull restored + monthly check |
| 8+ pages in top 20 for primary keywords | Partial proxy only (SERP top-10 probe) | day90 table | GSC data |
| 15+ new referring domains | **No** | Ahrefs API "Insufficient plan" | Ahrefs Webmaster Tools (free for verified own site; UNVERIFIED that it is set up) |
| 6+ qualified inbound leads per month from organic + AI | **No** (no channel on any lead) | D2 | leads.channel + conversion_events by ai_source |
| Brand search volume "Shilika Jain" up | **No** | day90: blocked | GSC query filter on brand terms (data already pulled by cron once restored) |
| AI-referred visits (sessions) | **No** | D1, Q2 | Axiom ai_referral_hit + PostHog ai_source |
| AI crawler coverage (which bots fetch which pages, llms.txt, /blog/*.md) | **No** | D1 | Axiom ai_crawler_hit |
| Google AI Overview / AI Mode impressions | **No** (report not used) | 10-01 note | GSC Generative AI report monthly CSV |
| Copilot / Bing AI citations | **No** (no Bing Webmaster verification) | grep, DNS | Bing Webmaster Tools AI Performance (CSV export) |
| SERP proxy (Google organic, 25 prompts) | Yes, 4 dated runs: 9/25 (08-04), 7/25 (08-14), 7/25 (08-31), 13/25 (09-25) | rollups | keep as leading indicator |

## 7. Minimal free measurement stack

Everything below is free and already present in the project, except Bing Webmaster Tools and Ahrefs Webmaster Tools (both free, owner action).

| Question | Tool | How |
|---|---|---|
| Which AI bots fetch which pages? | Axiom (token already configured) | Edge middleware logs only matching UAs (`ai_crawler_hit`), includes Googlebot as baseline |
| Do humans arrive from AI assistants? | Axiom (server, JS-independent) + PostHog (client, super-property `ai_source`) | Middleware logs `ai_referral_hit`; attribution.js classifies and registers `ai_source` |
| Which leads came from AI? | Supabase `leads` + `conversion_events` | New migration, `/api/contact` and `/api/track` write channel + ai_source + full attribution JSON; Notion and email get a compact `Source` string with no schema change |
| Do AI visitors convert? | PostHog funnels (`contact_conversion` filtered by `ai_source`) + `conversion_events` SQL | no new vendor |
| Google AI Overviews / AI Mode visibility | Search Console Generative AI performance report | Monthly UI CSV export saved under data/ai-citation-panel/results/gsc-genai/ |
| Classic rankings and brand queries | Search Console via restored daily cron | Restore only `gsc-daily-pull` (1 job, daily) |
| Copilot / Bing citations | Bing Webmaster Tools AI Performance report | Verify (can import from GSC), monthly CSV export |
| Engine-level citations | Manual 4-engine panel with the existing CSV schema; optional Perplexity API script reusing lib/integrations/perplexity.ts (PERPLEXITY_API_KEY is set; Perplexity API usage is paid, small) | monthly |
| Backlinks / referring domains | Ahrefs Webmaster Tools (free for own verified site) | owner setup |

Do not add: GA4 (optional only), paid GEO tools, extra vendors. If GA4 is wanted later, add `gtag('config','G-XXXX')` next to the AW config in layout.tsx:85 and create a GA4 custom channel group above Referral matching source on `chatgpt\.com|chat\.openai\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com`, because utm-only hits without a medium can fall into Unassigned (third-party reports, UNVERIFIED against Google docs).

## 8. Exact code changes (not applied)

Validated drafts are in `/private/tmp/claude-504/-Users-thunderbolt-Documents-projects-Shilika/c0dc2b3b-3b31-46db-9535-df2409eb89af/scratchpad/audit/proposed/`:

```
lib/ai-traffic.ts                          NEW
lib/attribution.ts                         NEW
app/api/track/route.ts                     NEW
app/api/contact/route.ts                   REPLACEMENT (adds ~25 lines)
middleware.ts                              REPLACEMENT (admin gating kept verbatim)
public/assets/attribution.js               NEW
supabase/migrations/0008_leads_attribution.sql   NEW
assets.patch                               unified diff for conversions.js, analytics.js, site.js, pages.js
```

Validation performed in the scratchpad (node_modules symlinked, repo untouched):
- `tsc -p tsconfig.json` over middleware.ts, lib/ai-traffic.ts, lib/attribution.ts, app/api/track/route.ts, app/api/contact/route.ts: **exit 0**, no errors.
- `node --check` on attribution.js and all four patched assets: OK.
- Classifier unit test (GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Claude-SearchBot, Googlebot, a plain Chrome UA, a fake "Google-Extended" UA; referrers chatgpt.com, utm_source=chatgpt.com, www.perplexity.ai, gemini, claude, copilot, plain google.com, Hacker News, utm "newsletter", utm "openai"): ALL PASSED.
- attribution.js VM simulation: AI landing records ai_source=chatgpt and tags the Calendly inline widget with utm_source/utm_medium/utm_campaign; a later internal navigation keeps the AI attribution; a direct visitor leaves the widget untouched; a Perplexity referrer with no utm is classified. All as intended.
- Re-run on resume (2026-10-16): `tsc -p proposed/tsconfig.json --noEmit` exit 0; `node --experimental-strip-types proposed/rt/test-classify.mjs` prints "ALL CLASSIFIER TESTS PASSED"; `node proposed/rt/test-attr.mjs` shows the four expected scenarios (AI landing tags the Calendly widget with utm_source/utm_medium=ai_referral/utm_campaign=ai_chatgpt; AI attribution persists across internal navigation; direct visitor leaves the widget untouched; Perplexity referrer without utm is classified); `node --check` OK on attribution.js and the four patched assets.
- Static Edge-compatibility check of the Axiom SDK: `@axiomhq/js` 1.6.1 (installed) has no `fs/path/http/zlib/stream/crypto` imports in dist/esm or src and uses `fetch` (src/fetchClient.ts, src/httpClient.ts). Next is 15.5.18. This makes it plausible, not proven, that it runs in the Edge middleware runtime; the fallback (plain `fetch` POST to the Axiom ingest URL inside `event.waitUntil`) remains the safe plan if the preview build complains.
- NOT validated: `next build`, actual Edge-runtime execution of the logger inside middleware, real Supabase insert, Notion. These need a preview deploy (section 9). I deliberately did not run `next build` because it writes into the project's `.next` directory.

### 8.1 middleware.ts (Priority 1)

What: (a) matcher widened from admin-only to all page routes excluding `_next/`, `assets/` and static file extensions, so cached pages, /llms.txt, /llms-full.txt, /robots.txt, /sitemap.xml and /blog/*.md are all seen; (b) signature gains `event: NextFetchEvent`; (c) after the existing admin gates, if the UA matches an AI bot log `ai_crawler_hit {bot, vendor, purpose, path, method, ip, country, ua}`, else if it is a GET navigation whose Referer host or utm_source is an AI assistant log `ai_referral_hit {ai_source, path, referer, utm_source, country}`; flush with `event.waitUntil(logger.flush())`. Only matches are logged, so volume stays small. Uses `x-forwarded-for` and `x-vercel-ip-country` because `NextRequest.ip` and `.geo` were removed in Next 15 (installed: 15.5.18).

Core of the new block (full file in the proposed dir):

```ts
const bot = classifyAiBot(ua);
if (bot) {
  logger.info('ai_crawler_hit', { event: 'ai_crawler_hit', bot: bot.bot, vendor: bot.vendor,
    purpose: bot.purpose, path: pathname, method: req.method,
    ip: h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
    country: h.get('x-vercel-ip-country'), ua: ua.slice(0, 200) });
  event.waitUntil(logger.flush());
} else if (req.method === 'GET' && h.get('sec-fetch-dest') !== 'image') {
  const ai = classifyAiReferral(h.get('referer'), req.nextUrl.searchParams.get('utm_source'));
  if (ai) { logger.info('ai_referral_hit', { event: 'ai_referral_hit', ai_source: ai, path: pathname,
    referer: h.get('referer'), utm_source: req.nextUrl.searchParams.get('utm_source'),
    country: h.get('x-vercel-ip-country') }); event.waitUntil(logger.flush()); }
}
```

Limits to state honestly: middleware runs before the response, so HTTP status codes are not logged; User-Agents can be spoofed (optional hardening: compare IPs with the vendors' published ranges); Google-Extended cannot appear; if `@axiomhq/js` proves incompatible with the Edge runtime, fall back to a plain `fetch` POST to the Axiom ingest endpoint inside `event.waitUntil`.

### 8.2 lib/ai-traffic.ts (NEW)

Shared classifier: `classifyAiBot(ua)` (20 UA tokens with vendor and purpose search/user_fetch/training/other), `aiSourceFromHost()`, `classifyAiReferral(referer, utm_source)`. Edge-safe, no Node imports. Keep its host list in sync with attribution.js (comment in both).

### 8.3 public/assets/attribution.js (NEW) and app/layout.tsx

```diff
       <body suppressHydrationWarning>
+        <Script src="/assets/attribution.js" strategy="beforeInteractive" />
         <Script src="/assets/analytics.js" strategy="lazyOnload" />
```

attribution.js: first-touch and last-non-direct touch, 90-day localStorage (try/catch), stores host + landing path only (no query strings, no full referrer URL), classifies AI source from referrer host or utm_source, exposes `window.__sjAttribution()` (ai_source, first_/last_ ref host, landing, utm_*, gclid, PostHog distinct_id `ph_id`, page lang), and tags `.calendly-inline-widget[data-url]` with utm_source/utm_medium/utm_campaign before Calendly's lazy widget script initialises (closes D10).

### 8.4 public/assets/analytics.js, conversions.js, site.js, pages.js (patches in assets.patch)

- analytics.js: after `posthog.init`, `posthog.register({ai_source, first_landing, first_ref_host, last_ref_host})` so **every** PostHog event, including `contact_conversion`, becomes filterable by AI source. Fix D3 by running `bindCtaEvents()` immediately when `document.readyState !== 'loading'`.
- conversions.js `goThankYou`: `navigator.sendBeacon('/api/track', {kind: via, path, attribution})` for every non-form channel (calendly click, booked, telegram, twitter, linkedin, email). One insertion covers all conversion types, independent of PostHog and ad blockers.
- site.js (#contact-form): add `source: window.location.pathname` and `attribution: window.__sjAttribution()` to the payload.
- pages.js (#intent-form, 106 pages): add `attribution`.
- components `app/tools/_components/free/EmailResult.tsx`: add `attribution: window.__sjAttribution?.()` to the POST body; `app/api/tools/email-result/route.ts`: `normaliseAttribution(data.attribution)` and append `attributionSummary()` to `lead.source` (it already slices to the Notion limit through LeadPayload).

### 8.5 app/api/contact/route.ts and app/api/track/route.ts

- contact: `normaliseAttribution(data.attribution)`; `source` becomes `"<form source> | [ai_chatgpt] | landed /playbook/... | ref chatgpt.com | utm chatgpt.com/- | ph <id>"` (300 char cap) so **Notion Source and the email "Came from" row gain attribution with zero Notion schema change** (adding unknown Notion properties would make `pages.create` throw, so do not add columns in code first); third parallel `allSettled` task inserts into Supabase `leads` with `channel`, `ai_source` and the full attribution JSON; failure is logged, never blocks the lead.
- track: new POST endpoint, allowlisted `kind`, ignores AI bots, inserts into `conversion_events`, always answers 204.
- lib/attribution.ts: clamps every client field to 200 chars, `channelOf()` returns paid_google | ai_<name> | paid_other | organic_search | social | referral | campaign | direct.

### 8.6 supabase/migrations/0008_leads_attribution.sql (NEW)

Tables `leads` (uuid pk, contact fields, form_source, channel, ai_source, attribution jsonb, country) and `conversion_events` (bigserial, kind, path, channel, ai_source, attribution jsonb, country), indexes on created_at and (channel|ai_source, created_at), RLS enabled with no anon policy (service role only, same pattern as cron_runs). Run in the Supabase SQL editor or via the project's migration process before deploying the route changes (the inserts fail soft until then).

### 8.7 vercel.json

```diff
   "redirects": [ ... ],
+  "crons": [
+    { "path": "/api/cron/gsc-daily-pull", "schedule": "0 4 * * *" }
+  ]
```

Restore only this one daily job. The pause commit says hourly jobs exceeded the Hobby limit; one daily job should fit (UNVERIFIED against current Vercel plan limits). Do not restore ga-daily-pull until a GA4 tag and GA_* env exist. Before enabling, confirm the service account client_email is a user on the sc-domain:shilikajain.com property, otherwise the job will log 403 into cron_runs. Update SETUP.md section 7 to match.

### 8.8 Optional

- Replace the open `/api/axiom` proxy with an origin check or a small rate limit (D9).
- Ads: split the single label into separate conversion actions (Primary: `calendly.event_scheduled`; Secondary: click and profile view), remove the redundant gtag fire if the /thank-you URL conversion stays primary, and drop `allow_enhanced_conversions` or feed it `user_data` (D5). This is mostly Ads UI work (owner SJ).
- Add a privacy page and consent handling (D8) before storing PostHog ids and referrers in leads.
- Optional script `scripts/ai-citation-api-panel.mjs` reusing `perplexitySignals()` to log Perplexity citations for the 25 prompts into the existing CSV schema (small paid API use).

## 9. Rollout and verification

1. Run migration 0008 on Supabase.
2. Apply changes, `npx tsc --noEmit`, `npm run build`, deploy to a Vercel **preview** first (middleware matcher change is the only change with wide blast radius).
3. Bot logging test: `curl -A 'Mozilla/5.0 (compatible; GPTBot/1.2; +https://openai.com/gptbot)' https://<preview>/llms.txt` and `-A 'PerplexityBot/1.0'` on `/playbook/crypto-pr-cost-2026`, then in Axiom (field names may be nested depending on the transport, check one row first):
   ```
   ['<AXIOM_DATASET>'] | where event == 'ai_crawler_hit' | summarize hits=count(), pages=dcount(path) by bot, purpose, bin(_time, 1d)
   ['<AXIOM_DATASET>'] | where event == 'ai_crawler_hit' and path in ('/llms.txt','/llms-full.txt','/robots.txt','/sitemap.xml') | summarize count() by bot, path
   ['<AXIOM_DATASET>'] | where event == 'ai_referral_hit' | summarize count() by ai_source, path
   ```
4. Referral test: open `<preview>/?utm_source=chatgpt.com` in a clean browser, confirm an `ai_referral_hit` row, confirm `localStorage.sj_attr_v1` has `ai: "chatgpt"`, and in the console `window.__sjAttribution()` returns `ai_source: "chatgpt"`.
5. Lead test from the preview with `?utm_source=chatgpt.com`; then in Supabase: `select channel, ai_source, form_source, attribution from leads order by created_at desc limit 1;` expect `ai_chatgpt`. Delete the test row and test Notion page afterwards.
6. Conversion test: click a Calendly link on the preview, then `select kind, channel, ai_source from conversion_events order by id desc limit 3;`.
7. Confirm PostHog events carry `ai_source` (Live events view), and that `calendly_click` and `contact_form_submit` now fire (D3 fix).
8. Monthly report queries:
   ```sql
   select channel, count(*) from leads where created_at > now() - interval '30 days' group by 1 order by 2 desc;
   select ai_source, kind, count(*) from conversion_events where ai_source is not null group by 1, 2 order by 3 desc;
   ```

## 10. Actions only SJ can do (no code)

1. Zero-code baseline today: in PostHog (EU) open Web analytics or an Insight on `$pageview` broken down by `$referring_domain` for the last 90 days and filter for chatgpt.com, perplexity.ai, gemini.google.com, claude.ai, copilot.microsoft.com, plus `utm_source = chatgpt.com`. This reveals whether any AI-referred human traffic exists at all, before shipping anything.
2. Search Console: open the `shilikajain.com` Domain property, confirm ownership, confirm the service account (`client_email` in GSC_SERVICE_ACCOUNT_JSON) is listed under Settings > Users and permissions, open the Generative AI performance report, export the CSV monthly into `data/ai-citation-panel/results/gsc-genai/YYYY-MM-DD.csv`. Record impressions per page; there are no clicks in this report.
3. Bing Webmaster Tools: verify the site (import from GSC is the fastest route) and open the AI Performance report; export CSV monthly (no API, per third-party reports). Gives Copilot and Bing AI citation counts, cited pages and grounding queries.
4. Ahrefs Webmaster Tools (free for verified own sites) for referring domains, since the paid API tier is blocked.
5. Run the 4-engine panel on the first business day of each month using prompts.json and the CSV header already in results/chatgpt/zz-fixture-2026-08-04.csv, 3 fresh sessions per prompt per engine. Without this, every AI-citation KPI in the README stays at zero data.
6. Vercel: (a) open Firewall > Traffic (Security events), filter outcome = challenge or deny, group by user agent and IP, and confirm verified AI and search crawlers are not being challenged by a rate-limit or Bot Protection rule; this is the only place to measure bots blocked before middleware runs. (b) confirm the plan and the cron limit; (c) confirm production env has GSC_*, AXIOM_*, SUPABASE_* (names are set in .env.local, production unverified).
7. Google Ads: check conversion-action settings for the duplicate counting described in D5.
8. Decide on privacy page and consent approach for APAC/EU visitors.

## 11. Risks of the proposed changes

- Widening the middleware matcher adds an edge invocation per page request. Cost is small at this traffic; the code returns immediately for non-matching requests. Test on a preview first; revert path is one line (restore the old matcher).
- localStorage attribution is first-party and per-device. Cross-device journeys and mobile-app in-app browsers that strip referrers (some ChatGPT/Claude app clicks arrive as "direct") will still be undercounted. Treat AI-referred counts as a floor.
- Storing the PostHog distinct_id and referrer host in leads is personal-data processing; disclose it (D8).
- Search Console Generative AI data is impressions only and may not be API-exportable; it measures visibility, not leads.
- UA-based bot counts include impersonators; label them "claimed AI bot hits".

## 12. Appendix: commands run and key output

All commands were run read-only from /Users/thunderbolt/Documents/projects/Shilika unless noted.

```
$ ls lib lib/integrations supabase/migrations
lib/integrations: ahrefs.ts cross-post.ts ga.ts google-auth.ts gsc.ts perplexity.ts
supabase/migrations: 0001_blog_foundation.sql ... 0007_llm_batches.sql   (no leads or bot table)

$ grep -rn "from('" lib app | grep -oE "from\('[a-z_]+'\)" | sort | uniq -c
  26 content_ideas | 26 blog_posts | 8 knowledge_base | 3 llm_batches | 3 analytics_search_console
   2 cron_runs | 2 content_metrics | 1 authors

$ grep -rniE "chatgpt\.com|perplexity\.ai|gemini\.google|claude\.ai|copilot\.microsoft|utm_source=chatgpt|document\.referrer|get\('referer" (code, excl data/ai-citation-panel)
lib/integrations/perplexity.ts:16:const ENDPOINT = 'https://api.perplexity.ai/chat/completions';     <- only hit

$ grep -rn "gtag('config'" app components public/assets
app/layout.tsx:85  ... gtag('config','${GTAG_ID}',{allow_enhanced_conversions:true}) ...   (GTAG_ID default AW-18324652879)
$ grep for G-XXXXXXXXXX measurement IDs / GTM-: none

$ git log --oneline --follow -- vercel.json | head -1
6344f75 Pause all Vercel cron jobs        (2026-09-25; removed the whole crons block)

$ .env.local names (values not printed): GSC_SERVICE_ACCOUNT_JSON set, GSC_SITE_URL set (sc-domain:shilikajain.com),
  GA_PROPERTY_ID EMPTY, GA_SERVICE_ACCOUNT_JSON EMPTY, AXIOM_TOKEN/DATASET/HOST set, CRON_SECRET set,
  PERPLEXITY_API_KEY set, no OPENAI key, NEXT_PUBLIC_GTAG_ID absent

$ dig +short TXT shilikajain.com
"google-site-verification=<token present>"
"v=spf1 include:_spf.google.com ~all"
$ dig +short NS shilikajain.com
ns1.vercel-dns.com. ns2.vercel-dns.com.

$ curl -sS -m 30 https://www.shilikajain.com/        -> curl: (28) Connection timed out after 30005 milliseconds
$ curl -4 -m 20 https://www.shilikajain.com/robots.txt -> timed out ; curl https://example.com/ -> 200 in 0.13s   (so live checks UNVERIFIED)

$ ls -R data/ai-citation-panel/results
chatgpt/zz-fixture-2026-08-04.csv (header only)  serp-discoverability/{2026-08-04,2026-08-14,2026-08-31,2026-09-25}.csv (26 lines each)

$ scripts: tsc -p proposed/tsconfig.json  -> exit 0 ; classifier tests -> ALL PASSED ; node --check on 5 JS files -> OK
$ git status --porcelain | wc -l -> 34 (unchanged from session start)
```

Resume-pass commands (2026-10-16) and key output:

```
$ curl -sS -m 25 -D home.hdr -o home.html https://www.shilikajain.com/
HTTP/2 200 | server: Vercel | x-vercel-cache: HIT | age: 23667 | x-nextjs-prerender: 1 | content-length: 218924
$ grep -oE "AW-[0-9]+|G-[A-Z0-9]{8,12}|GTM-[A-Z0-9]+|gtag\('config'[^)]*\)" home.html | sort | uniq -c
   2 AW-18324652879
   1 gtag('config','AW-18324652879',{allow_enhanced_conversions:true})        (no G- ID, no GTM-)
$ grep -oiE '<meta[^>]*(google-site-verification|msvalidate|ahrefs-site-verification)[^>]*>' home.html
   (no output)
$ grep -oE '/assets/[A-Za-z0-9_.?=-]+\.js' home.html | sort | uniq -c
   1 /assets/analytics.js | 2 /assets/conversions.js | 2 /assets/intro-cards.js | 2 /assets/site.js
$ curl -sS -D - -o /dev/null -A 'Mozilla/5.0 (compatible; GPTBot/1.2; +https://openai.com/gptbot)' https://www.shilikajain.com/llms.txt
HTTP/2 200 | content-type: text/markdown | x-vercel-cache: HIT | age: 182
$ curl -sS -D - -o /dev/null -A 'PerplexityBot/1.0' https://www.shilikajain.com/playbook/crypto-pr-cost-2026
HTTP/2 200 | x-matched-path: /playbook/crypto-pr-cost-2026 | x-vercel-cache: HIT | age: 23846
$ curl -sS -D - -o /dev/null 'https://www.shilikajain.com/thank-you?via=calendly'
HTTP/2 200 | x-vercel-cache: MISS | age: 0
$ curl -sS -o /dev/null -w "%{http_code}" -X POST https://www.shilikajain.com/api/track
404
$ dig +short TXT shilikajain.com
"google-site-verification=<token present>"  "v=spf1 include:_spf.google.com ~all"
$ env presence check on .env.local (values not printed)
GA_PROPERTY_ID: present but EMPTY | GA_SERVICE_ACCOUNT_JSON: present but EMPTY | GSC_SITE_URL: set | GSC_SERVICE_ACCOUNT_JSON: set
AXIOM_TOKEN: set | AXIOM_DATASET: set | NEXT_PUBLIC_GTAG_ID: ABSENT
$ grep -rnE "logger\.(info|warn|error|debug)|flushLogs" app lib components middleware.ts instrumentation*.ts
lib/axiom.ts:25 (flushLogs definition) | instrumentation-client.ts:12,20 (window.error, unhandledrejection)    <- no server logger.info anywhere
$ grep -c crons vercel.json -> 0     (git show 6344f75: "Pause all Vercel cron jobs", 2026-09-25, removed gsc-daily-pull 0 4 * * * and ga-daily-pull 30 4 * * *, among 8)
$ wc -l data/ai-citation-panel/results/chatgpt/*.csv -> 1 (header only); results has no perplexity, claude or gemini dir
$ ls data/ai-citation-panel/summary | tail -3 -> run-86, run-87, run-88 (no measurement or attribution content in 87 and 88)
$ WebFetch https://support.google.com/webmasters/answer/16984139?hl=en  -> impressions only; pages/countries/dates/devices; export button; API and BigQuery not mentioned; all sites as of 2026-08-31
$ WebFetch https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports -> navigation text only (body not retrieved)
```

Panel numbers quoted (from repo files, SERP proxy only): surfaced prompts 9/25 (2026-08-04), 7/25 (2026-08-14), 7/25 (2026-08-31), 13/25 (2026-09-25); google_serp row-level 36/100 on the latest rollup.

## Sources (web; the Google help page was opened on 2026-10-16, the rest are search excerpts only and were not opened)

- Google Search Central Blog, Introducing Search Generative AI performance reports in Search Console (fetch returned navigation only, body not read): https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports
- Search Console Help, Generative AI performance report (Search) (OPENED, source of the first-hand bullets in Q5): https://support.google.com/webmasters/answer/16984139?hl=en
- Search Engine Journal, Google Search Console AI Reports Rolled Out Worldwide: https://www.searchenginejournal.com/google-search-console-ai-reports-rolled-out-worldwide/587836/
- Search Engine Journal, How To Track Google AI Mode Traffic In Search Console: https://www.searchenginejournal.com/how-to-track-google-ai-mode-traffic-in-search-console/586194/
- Search Engine Land, Bing Webmaster Tools testing new AI Performance report: https://searchengineland.com/bing-webmaster-tools-testing-new-ai-performance-report-468039
- Search Influence, Inside Bing's New AI Performance Report: https://www.searchinfluence.com/blog/bing-ai-performance-report-copilot-citations/
- Theme Isle, Track AI referral traffic in GA4 (utm_source=chatgpt.com behaviour, vendor blog, unverified): https://themeisle.com/blog/track-ai-referral-traffic-ga4/
- Clickport, Why ChatGPT traffic shows as Direct in GA4 (vendor blog, unverified): https://clickport.io/blog/chatgpt-direct-traffic-ga4
