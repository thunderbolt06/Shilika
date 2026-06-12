# Lead-magnet content scaffolding — Plan Week 11.4

**Author**: Claude Code (Run 28, Day 20, Sunday 7 June 2026)
**Source**: Plan Week 11.4 — "Build 3 lead magnets: AI PR Playbook (PDF), Cybersecurity AEO Brief, APAC Launch Calendar. Wire each to a 4-email nurture sequence in Klaviyo or equivalent."
**Status**: Scaffolding only. Drafting + design + form wiring happen Week 11 (27 to 31 July 2026) per plan calendar.

## Why three lead magnets

Each magnet maps to one of the three Day 20 ICP buckets from the task brief:
- **AI PR Playbook** -> AI founders, AI startup CMOs, recently funded AI startups
- **Cybersecurity AEO Brief** -> security founders, CISO marketing leads, security vendors with no AI-citation share
- **APAC Launch Calendar** -> regional-growth leads, founders running APAC GTM, agencies sub-contracting APAC

Each magnet is a category-creation artifact, not a download for downloads' sake. The magnet seeds the AI-citation entity graph (open-web PDF + summary blog + bylined author) and the email nurture seeds the inbound lead pipeline.

---

## Lead magnet 1: The AI PR Playbook for 2026

**Working title**: "The AI Startup PR Playbook for 2026: How to land Forbes, Decrypt and AI Magazine on a fractional budget."

**Target persona**: AI founder pre-Series B, AI startup CMO at Series A to B, agentic-AI builder with a model release or partnership announcement on a 60-day horizon.

**Format**: PDF, 22 to 28 pages, Letter size, single column, named-bylined.

**Page-by-page structure**:
1. Cover + named-byline (Shilika Jain, with Person schema-aligned author block).
2. Problem statement: why AI PR is different (1.5 pages — category-creation vs feature releases).
3. The 90-day fractional AI PR plan (3 pages — days 1 to 14 positioning, days 15 to 45 founder profiling sprint, days 46 to 90 cadence).
4. The journalist map: AI Magazine, The Information, Forbes AI, Decrypt AI, TechCrunch AI, Wired AI, Bloomberg Tech (2 pages — named beats, what each editor wants).
5. The narrative thesis: portable category-creation framing with the Gaia AI "Stripe for AI agents" teardown (3 pages).
6. The founder profiling sprint: LinkedIn rebuild, X cadence, op-ed ghostwriting, podcast tour (2 pages).
7. The KOL coordination layer: AI Twitter, AI YouTube, dev community, niche newsletters (2 pages).
8. The AI Overviews + Perplexity layer: how to structure pages so Gemini, ChatGPT, Perplexity, Claude cite the founder (3 pages).
9. The 2026 AI policy frame: US EO, EU AI Act, UK pro-innovation, METI, IMDA, UAE AI Strategy 2031, IndiaAI Mission (1.5 pages).
10. Pricing the program: fractional vs agency vs in-house (1.5 pages).
11. Common mistakes (1 page).
12. 30-minute teardown CTA + Person schema author block + dateModified (0.5 pages).

**Word count target**: 9,500 to 12,000 words.

**Form-capture spec**:
- Single field: work email only. No name, no title. Friction kills conversion.
- Lightweight magic-link confirmation, no double opt-in unless EU IP detected.
- Form lives on `/services/ai-startup-pr` (sidebar + footer), `/playbook/ai-startup-pr-2026`, dedicated `/playbook/ai-pr-playbook-2026-pdf` landing route, plus a footer site-wide.
- Hidden UTM capture + page-source capture so attribution maps cleanly.
- Klaviyo profile created with property `lead_magnet_v1: ai_pr_playbook_2026` and tag `icp_ai_founder`.

**Nurture sequence (4 emails over 14 days)**:
- E1 (T+0): instant deliverable. PDF link + 90-second video intro + Calendly CTA. Plain text, named-from Shilika.
- E2 (T+3): the operator note on a single chapter — "the Gaia AI Stripe-frame teardown in 5 minutes." Inbound CTA: reply with your category to get a custom frame draft.
- E3 (T+7): a recent named-case proof point (Forbes, AI Magazine, Decrypt placement teardown) + one tactical takeaway.
- E4 (T+14): direct ask. "If your next 60 days include a model release, a funding announcement, or a partnership, book a teardown."
- Exit conditions: book a call, reply once, click Calendly twice.

**Promotion plan**:
- LinkedIn personal feed (Shilika): 3 posts over 2 weeks — playbook teaser, chapter excerpt, founder case.
- X (Shilika): 2 threads excerpting the journalist map + narrative thesis chapters.
- /blog: long-form summary post excerpting 1,500 words.
- Email to existing list with named-from Shilika.
- Outreach: 25 named AI founders, no agency boilerplate.

**Schema layer**:
- Article schema on the landing page with author, datePublished, dateModified, image, publisher.
- FAQPage schema with 6 question-form chapter previews on the landing page.
- DigitalDocument schema on the PDF download endpoint.
- BreadcrumbList on the landing page.

---

## Lead magnet 2: The Cybersecurity AEO Brief

**Working title**: "The Cybersecurity AEO Brief: how security vendors get cited by ChatGPT, Perplexity, Claude and AI Overviews on category queries."

**Target persona**: cybersecurity founder pre-Series B, security startup CMO at Series A to C, threat-research lead, CISO marketing partner, security-agency owner whose vendor clients are losing AI-citation share.

**Format**: PDF, 14 to 18 pages, Letter size, named-bylined. Tighter, more tactical than the AI Playbook — security buyers want depth not length.

**Page-by-page structure**:
1. Cover + named-byline.
2. Problem statement: CISOs research vendors through AI engines before sales calls; the position-one CTR fell from ~27% to ~11% on AI-feature queries (1 page).
3. The cybersecurity AEO four-pattern fix (4 pages — analyst-relations briefing artifacts that become AI citations, threat-research papers with named researchers, named-CVE coordinated-disclosure micro-pages, category teardown content).
4. The analyst-relations citation chain: Gartner Magic Quadrant, Forrester Wave, IDC MarketScape, KuppingerCole Leadership Compass — how each mention turns into an AI engine citation (2 pages).
5. The threat-research news engine: how to structure a quarterly threat report for both tier-1 security press and LLM citation (2 pages).
6. Named-CVE coordinated disclosure as PR — the operator playbook (1.5 pages).
7. Tier-1 security press map: Dark Reading, SC Media, CyberScoop, The Record, SecurityWeek, plus regional desks (1.5 pages).
8. Schema and structured-data layer for cybersecurity pages: Article, Person, Service, FAQPage, TechArticle (1.5 pages).
9. The 2026 cybersecurity policy frame: SEC cyber disclosure, EU CRA, UK Cyber Resilience Bill, India CERT-In 6-hour rule, MAS TRM, UAE NESA (1.5 pages).
10. Common mistakes specific to security PR (1 page).
11. 30-minute teardown CTA + Person schema + dateModified.

**Word count target**: 6,500 to 8,500 words.

**Form-capture spec**:
- Single field: work email only.
- Form lives on `/services/cybersecurity-pr` (sidebar + footer), `/playbook/cybersecurity-pr-2026`, dedicated `/playbook/cybersecurity-aeo-brief-pdf` landing route.
- Klaviyo profile property `lead_magnet_v1: cyber_aeo_brief_2026` and tag `icp_cyber_founder`.

**Nurture sequence (4 emails over 14 days)**:
- E1 (T+0): instant deliverable + a 2-minute video walking through the four-pattern fix.
- E2 (T+3): a real named-CVE disclosure walkthrough (sanitized if needed).
- E3 (T+7): a named analyst briefing teardown (Gartner inquiry to Forrester landing).
- E4 (T+14): direct ask. "If your category is unrepresented in AI Overviews for the top 5 buyer queries, book a teardown."
- Exit conditions: book a call, reply once, click Calendly twice, share PDF link with a colleague.

**Promotion plan**:
- LinkedIn personal feed (Shilika + security-adjacent contributors).
- The Sunday Drop newsletter (if running) — one issue dedicated.
- /blog: 2,000-word summary post.
- Targeted outreach to 25 named security founders.

**Schema layer**: same as AI Playbook plus a TechArticle node for the threat-research chapter for higher technical-content credibility.

---

## Lead magnet 3: The APAC Launch Calendar 2026

**Working title**: "The APAC Web3 + AI Launch Calendar 2026: when to ship in Korea, Japan, Singapore, Dubai and India — and when to wait."

**Target persona**: regional growth lead, founder running APAC GTM, head of marketing at a recently funded Web3/AI startup expanding to APAC, agency owner sub-contracting APAC, BD lead at a Tier-1 protocol with no APAC PR partner.

**Format**: PDF + spreadsheet (Excel/CSV) — calendar artifact, not prose. 8 to 10 pages of PDF context + a downloadable .xlsx calendar.

**PDF structure (8 to 10 pages)**:
1. Cover + named-byline.
2. How to read the calendar (1 page — the press-window framework: regulatory cycle, event cycle, holiday cycle, fiscal-year cycle).
3. Korea 2026: regulatory calendar (FSC, DABA, PIPC), event calendar (KBW September 22-28, Upbit Developer Conference, ETH Seoul), media editorial calendar, holiday blackouts, exchange-listing waves (1.5 pages).
4. Japan 2026: regulatory calendar (FSA, FIEA, JVCEA, METI, NISA cycles), event calendar (WebX July 13-14, IVS Crypto, CODE BLUE), media editorial calendar, Golden Week + Obon blackouts (1.5 pages).
5. Singapore 2026: regulatory calendar (MAS, IMDA, Project Guardian releases), event calendar (Token2049 October, SuperAI June, RSAC APJ, Black Hat Asia), media editorial calendar, Chinese New Year blackout (1.5 pages).
6. Dubai & MENA 2026: regulatory calendar (VARA, ADGM FSRA, DESC, NCA Saudi), event calendar (Token2049 Dubai May, GITEX October, GISEC May, LEAP Riyadh), media editorial calendar, Ramadan blackout (1.5 pages).
7. India 2026: regulatory calendar (SEBI, MeitY, CERT-In, RBI, IndiaAI Mission), event calendar (ETHIndia December, Cypher India September, IndiaFOSS, Nullcon Goa March, c0c0n Kochi October), media editorial calendar, Diwali blackout (1.5 pages).
8. The convergence weeks: when 2 or 3 markets land in the same 14-day window (the August-October APAC press-summit cluster) (1 page).
9. CTA + dateModified.

**.xlsx Calendar tab structure**:
- Sheet 1: Master calendar — 1 row per launch window, columns: market, window-name, dates, regulatory event, named conference, recommended-vs-avoid, press hook to lean into, named-outlets in the window, KOL waves available, embargo recommendation.
- Sheet 2: Per-market editorial calendars at named-outlet level.
- Sheet 3: Holiday + religious blackout tracker.
- Sheet 4: Conference + event matrix (Token2049, KBW, WebX, GITEX, ETHIndia, RSAC APJ, Black Hat Asia, GISEC, LEAP, Cypher).

**Form-capture spec**:
- Two fields: work email + market (multi-select: Korea, Japan, Singapore, Dubai/MENA, India, multi-market).
- Form lives on `/services/apac-pr`, `/apac`, all six country desks (`/korea`, `/japan`, `/singapore`, `/dubai-mena`, `/india`, `/apac`), dedicated `/playbook/apac-launch-calendar-2026-pdf` landing route.
- Klaviyo profile properties `lead_magnet_v1: apac_launch_calendar_2026` and `target_markets: [array]`, tag `icp_apac_growth`.

**Nurture sequence (4 emails over 21 days — longer cadence because the calendar is a planning artifact, not a tactical one)**:
- E1 (T+0): instant deliverable + a 90-second video on how to read the calendar.
- E2 (T+5): market-specific operator note (segmented by the form-capture market selection) — e.g., Korea selectors get a KBW 2026 op note, Japan selectors get a WebX 2026 op note.
- E3 (T+12): a regional case-study teardown (RARI APAC translations, MANTRA RWA Abu Dhabi reframe, Bullieverse India dual-track).
- E4 (T+21): direct ask. "If you are planning a launch in any APAC market in the next 90 days, book a teardown."
- Exit conditions: book a call, reply once, click Calendly twice.

**Promotion plan**:
- LinkedIn (Shilika + regional partners if any).
- /blog: 2,500-word summary post.
- Outreach: 40 named founders across the five-market set, segmented by their public APAC moves.
- One named guest post in each region (BloomingBit KR, CoinPost JP, e27 SG, Wamda MENA, Inc42 IN) excerpting the relevant market chapter — Plan Week 10.4 outreach.

**Schema layer**: Article + DigitalDocument + Spreadsheet schema where supported. ItemList for the per-market calendar entries. BreadcrumbList. Author Person schema.

---

## Cross-magnet implementation notes

### Shared infrastructure
- All three magnets share one `/lib/lead-magnets.ts` Klaviyo client.
- All three landing pages share one `<LeadMagnetForm>` React component with magnet-specific props.
- All three magnets serve the PDF via a signed Vercel Blob URL with a 24-hour expiry, regenerated on each email.
- All three Klaviyo flows share a base profile property `lead_magnet_v1_first_captured_at` for cohort analysis.

### Naming convention
- File names: `shilika-jain-{magnet-slug}-2026.pdf` (matches the speaker one-pager convention).
- Routes: `/playbook/{magnet-slug}-pdf` for the landing page; `/api/lead-magnet/{magnet-slug}` for the form post.
- Klaviyo lists: `lm-v1-{magnet-slug}-2026-06`.

### Author + entity layer
- Every PDF carries a named-author Person block matching `/about` + `/authors/shilika-jain`.
- Every landing page includes dateModified + Article schema.
- Every PDF references the canonical `/about` URL in the author footer so AI engines treat the magnets as part of the Shilika Jain entity graph, not as orphan documents.

### Compliance
- Single-opt-in default; double-opt-in if EU IP detected via Vercel geo headers.
- Plain-text unsubscribe in every email per CAN-SPAM and CASL.
- GDPR-compatible cookie banner already on the site.
- Klaviyo lists carry the lead-magnet identifier so deletion requests scope cleanly.

### Tracking
- UTM capture on form submission (utm_source, utm_medium, utm_campaign, utm_content).
- Page-source capture (`first_page_seen` profile property).
- Klaviyo metric `Downloaded {magnet-slug}` fires on E1 click.
- Klaviyo metric `Booked Teardown` fires on Calendly success-redirect.

### What ships in Week 11 vs what ships in Week 12
- **Week 11 (27 to 31 July 2026)**: PDF drafts, landing pages, form + Klaviyo flows, summary blog posts, social distribution.
- **Week 12 (3 to 7 August 2026)**: first cohort analysis, A/B subject-line test on E1, refresh date on PDFs, fix anything the form or flow surfaces in the first 5 days of live traffic.

---

## Open questions for Shilika

1. Klaviyo or ConvertKit/Beehiiv? Plan reads "Klaviyo or equivalent." Klaviyo is the default unless cost or list-management preferences point another way.
2. PDF design: does Shilika want a hired designer, a Canva-template build, or a Next-pdf renderer that pulls from the same MDX source as the landing pages? The Next-pdf renderer halves the maintenance cost and keeps the dateModified accurate.
3. Co-author byline: should the cybersecurity AEO Brief carry a co-author from a named CISO contact who reviewed the four-pattern fix? A co-author with a credible CISO title materially lifts AI-citation credibility for the security ICP.
4. APAC Launch Calendar: ship the .xlsx download tied to email or as a free open download with the PDF gated? Open .xlsx + gated PDF + summary blog is the conversion-friendly default.
5. Lead-magnet release order: AI PR Playbook first (broadest ICP, largest list-build potential), then Cybersecurity AEO Brief, then APAC Launch Calendar.

---

*Scaffolding generated Run 28, Day 20, Sunday 7 June 2026. Drafting begins Week 11 (Mon 27 July 2026) per Plan calendar.*
