# D13 title length fix (16 Nov 2026)

Rule: brand suffix ' | Shilika Jain' only when the full title fits in 60 chars. Otherwise the suffix is dropped. 38 blog titles and 1 playbook title that were over 60 even without the suffix got a shorter SEO title (H1 and OG unchanged).

Result on the local production build, 831 crawled URLs: titles over 60 chars went from 369 to 0. Pages whose title changed: 383. Non-200 responses: 0.

Mechanism: `fitTitle()` in lib/site-metadata.ts, used by blog, courses, glossary, tools, locale pages and the AI SEO pages. 126 static `metadata` titles were wrapped in `{ absolute }` by scripts/seo-fit-titles.mjs. Blog overrides live in lib/blog-seo-titles.ts.

## Before and after, top changed pages by 90-day GSC impressions

| Impr | URL | Before | After |
|---|---|---|---|
| 3644 | /playbook/how-to-pitch-cointelegraph-2026 | How to Pitch Cointelegraph in 2026: Pitch Guide / Shilika Jain | How to Pitch Cointelegraph in 2026: Pitch Guide |
| 1136 | /playbook/best-defi-pr-agency-2026 | Best DeFi PR Agencies in 2026: an Honest Comparison / Shilika Jain | Best DeFi PR Agencies in 2026: 5 Options Compared |
| 1028 | /services/kol-marketing | Web3 KOL Marketing 2026: 200+ Vetted Creators, FTC-Safe / Shilika Jain | Web3 KOL Marketing 2026: 200+ Vetted Creators, FTC-Safe |
| 919 | /work/fluence | Fluence Network Case Study: Making DePIN a Tier-1 Beat / Shilika Jain | Fluence Network Case Study: Making DePIN a Tier-1 Beat |
| 770 | /tools/headline-analyzer | Free Headline Analyzer: Score Your Headline Instantly / Shilika Jain | Free Headline Analyzer: Score Your Headline Instantly |
| 699 | /playbook/crypto-pr-cost-2026 | How Much Does Crypto PR Cost in 2026? Honest Pricing / Shilika Jain | How Much Does Crypto PR Cost in 2026? Honest Pricing |
| 538 | /services/cybersecurity-pr | Cybersecurity PR in 2026: Fractional Senior Operator / Shilika Jain | Cybersecurity PR in 2026: Fractional Senior Operator |
| 350 | /playbook/fractional-vs-agency | Fractional PR vs Web3 PR Agency: How to Choose in 2026 / Shilika Jain | Fractional PR vs Web3 PR Agency: How to Choose in 2026 |
| 303 | /services/ai-startup-pr | AI Startup PR in 2026: Fractional Senior Operator / Shilika Jain | AI Startup PR in 2026: Fractional Senior Operator |
| 236 | /services/token-launch-pr | Token Launch PR 2026: TGE Comms, Exchange & KOL Waves / Shilika Jain | Token Launch PR 2026: TGE Comms, Exchange & KOL Waves |
| 188 | /japan | Japan Web3 & AI PR 2026: CoinPost, Nikkei, WebX Tokyo / Shilika Jain | Japan Web3 & AI PR 2026: CoinPost, Nikkei, WebX Tokyo |
| 185 | /blog/ai-startup-gtm-strategy-2026 | AI Startup GTM Strategy: 7 Motions That Work in 2026 / Shilika Jain | AI Startup GTM Strategy: 7 Motions That Work in 2026 |
| 171 | /services/apac-pr | APAC Crypto PR 2026: Korea, Japan, Vietnam, India, MENA / Shilika Jain | APAC Crypto PR 2026: Korea, Japan, Vietnam, India, MENA |
| 158 | /playbook | Playbooks: Field Guides From Inside Web3, AI & Cyber PR / Shilika Jain | Playbooks: Field Guides From Inside Web3, AI & Cyber PR |
| 158 | /playbook/ai-startup-pr-2026 | AI Startup PR Strategy 2026: The Full Founder Playbook / Shilika Jain | AI Startup PR Strategy 2026: The Full Founder Playbook |
| 158 | /testimonials | Testimonials - What clients say about Shilika Jain / Shilika Jain | Testimonials - What clients say about Shilika Jain |
| 149 | /blog/vietnam-web3-pr-playbook-2026 | Vietnam Web3 PR Playbook: The Licensed-Exchange Window / Shilika Jain | Vietnam Web3 PR Playbook: The Licensed-Exchange Window |
| 139 | /dubai-mena | Dubai & MENA Web3 / AI PR 2026: VARA, ADGM, RAK DAO / Shilika Jain | Dubai & MENA Web3 / AI PR 2026: VARA, ADGM, RAK DAO |
| 131 | /playbook/best-crypto-press-release-services-2026 | Best Crypto Press Release Services Compared in 2026 / Shilika Jain | Best Crypto Press Release Services Compared in 2026 |
| 126 | /playbook/get-featured-coindesk-2026 | How to Get Featured in CoinDesk in 2026: Pitch Guide / Shilika Jain | How to Get Featured in CoinDesk in 2026: Pitch Guide |
| 116 | /pages/defi-pr-agency | DeFi PR Agency 2026 / Protocol & Governance Comms / Shilika Jain | DeFi PR Agency 2026 / Protocol & Governance Comms |
| 112 | /tools/email-subject-line-tester | Free Email Subject Line Tester and Spam Word Checker / Shilika Jain | Free Email Subject Line Tester and Spam Word Checker |
| 112 | /work/web3auth | Web3Auth Case Study: Google Cloud Meets Web3 Wallets / Shilika Jain | Web3Auth Case Study: Google Cloud Meets Web3 Wallets |
| 111 | /tools/utm-builder | Free UTM Link Builder for GA4 Campaign Tracking / Shilika Jain | Free UTM Link Builder for GA4 Campaign Tracking |
| 100 | /pages/cybersecurity-marketing-agency | Cybersecurity Marketing Agency 2026 / Analyst-Literate / Shilika Jain | Cybersecurity Marketing Agency 2026 / Analyst-Literate |
