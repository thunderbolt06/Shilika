import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { EditorialScripts } from '@/components/site/EditorialScripts';
import { EditorialShell } from '@/components/site/EditorialChrome';
import '../blog/blog.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Playbooks: Field Guides From Inside Web3, AI & Cyber PR',
  description:
    '114 long-form playbooks on Web3 PR, AI startup comms and cybersecurity PR. Pricing, pitch guides for CoinDesk and Cointelegraph, a pre-token-launch checklist, agency-selection mistakes, op-eds vs press releases, regional teardowns and the trade-offs founders should weigh.',
  alternates: { canonical: `${SITE_URL}/playbook` },
  openGraph: {
    title: 'Shilika Jain — Playbooks',
    description: '114 long-form playbooks from inside Web3, AI & cybersecurity PR.',
    url: `${SITE_URL}/playbook`,
    type: 'website',
  },
};

const PLAYBOOKS = [
  {
    n: 1,
    slug: 'tier-1-pr-trap',
    title: 'The Tier-1 PR Trap: Why Web3 Founders Chase the Wrong Outlets',
    description:
      'An 8-minute breakdown of why a Forbes mention can be worse than a niche placement, and how to read which publications actually move a roadmap.',
    tag: 'Pitfalls',
    time: 8,
  },
  {
    n: 2,
    slug: 'apac-pr-playbook-2026',
    title: 'APAC PR Playbook 2026: Korea, Japan, Vietnam, India',
    description:
      'An 11-minute regional teardown of which outlets matter (BloomingBit, CryptoTimes JP, ChainCatcher, Jinse, Inc42), how to pitch them, and what most agencies miss.',
    tag: 'APAC',
    time: 11,
  },
  {
    n: 3,
    slug: 'founder-profiling-sprint',
    title: 'Founder Profiling Sprint: 90 Days to Category Voice',
    description:
      'A 6-minute founder profiling sprint covering cadence, calendar, and the four hand-offs that turn a technical founder into a category-defining voice.',
    tag: 'Founder',
    time: 6,
  },
  {
    n: 4,
    slug: 'crypto-pr-cost-2026',
    title: 'How Much Does Crypto PR Cost in 2026? Honest Pricing',
    description:
      'What crypto PR actually costs in 2026: agency retainers, fractional models, single-launch sprints, KOL waves, and the hidden line items most contracts bury.',
    tag: 'Pricing',
    time: 9,
  },
  {
    n: 5,
    slug: 'get-featured-coindesk-2026',
    title: 'How to Get Featured in CoinDesk in 2026: Pitch Guide',
    description:
      'What CoinDesk editors filter for, pitch templates that land, embargo etiquette, and three worked examples from a senior Web3 PR operator’s 2026 playbook.',
    tag: 'Tier-1',
    time: 10,
  },
  {
    n: 6,
    slug: 'fractional-vs-agency',
    title: 'Fractional PR vs Web3 PR Agency: How to Choose in 2026',
    description:
      'Cost, speed, founder access, bandwidth, and accountability. A decision tree for Web3 and AI founders weighing the two engagement models.',
    tag: 'Operations',
    time: 7,
  },
  {
    n: 7,
    slug: 'best-web3-pr-agencies-2026',
    title: 'Best Web3 PR Agencies and Consultants in 2026: an Honest Field Guide',
    description:
      'A criteria-led 2026 ranking of Web3 PR firms — Lunar Strategy, EAK Digital, Coinbound, Outset PR, High Vibe PR — and a fractional senior-operator alternative.',
    tag: 'Field guide',
    time: 12,
  },
  {
    n: 8,
    slug: 'crypto-pr-vs-ai-pr',
    title: 'Crypto PR vs AI PR in 2026: How the Playbooks Differ',
    description:
      'A side-by-side teardown of the two PR playbooks. Crypto runs on speed and crypto-native outlets; AI runs on credibility and mainstream tech press.',
    tag: 'Strategy',
    time: 9,
  },
  {
    n: 9,
    slug: 'ai-startup-pr-2026',
    title: 'PR Strategy for AI Startups in 2026: The Playbook',
    description:
      'A 14-minute pillar on positioning, narrative architecture, journalist mapping (Forbes, The Information, TechCrunch, VentureBeat), AI Overviews citations, KOL waves and measurement — with the Gaia AI "Stripe for AI agents" worked example.',
    tag: 'AI',
    time: 14,
  },
  {
    n: 10,
    slug: 'cybersecurity-pr-2026',
    title: 'Cybersecurity PR in 2026: How Vendors Get Cited by Analysts and AI Engines',
    description:
      'A 12-minute pillar on the analyst-first, threat-research-led PR program. Gartner, Forrester and IDC briefing cadence, named security desks (Dark Reading, SC Media, CyberScoop, SecurityWeek), and the AI Mode citation tactics that move a vendor shortlist.',
    tag: 'Cyber',
    time: 12,
  },
  {
    n: 11,
    slug: 'web3-pr-agency-mistakes',
    title: '7 Mistakes Web3 Founders Make With PR Agencies in 2026',
    description:
      'A 9-minute field guide to the seven most expensive Web3 PR mistakes — chasing the logo, generalist agencies, junior execution, no news hook, English-only reach, ignoring AI search, and vanity metrics — with the fix for each.',
    tag: 'Pitfalls',
    time: 9,
  },
  {
    n: 12,
    slug: 'pre-token-launch-pr-checklist',
    title: 'The Pre-Token Launch PR Checklist for 2026: 25 Steps Before TGE',
    description:
      'A 10-minute, 25-item checklist across five phases over an eight-week run-up: foundation and positioning, narrative and assets, media and KOL outreach, launch week, and post-TGE follow-through. Free one-page PDF download.',
    tag: 'Launch',
    time: 10,
  },
  {
    n: 13,
    slug: 'how-to-pitch-cointelegraph-2026',
    title: 'How to Pitch Cointelegraph in 2026: Pitch Guide',
    description:
      'A 9-minute pitch guide to Cointelegraph: how the newsroom is structured (news desk, Markets, Magazine, Opinion, Sponsored), the dated news peg, the under-150-word pitch, the editorial firewall, and using the multilingual editions for APAC reach. Sister guide to the CoinDesk playbook.',
    tag: 'Tier-1',
    time: 9,
  },
  {
    n: 14,
    slug: 'op-eds-vs-press-releases',
    title: 'Op-Eds vs Press Releases for Web3 Founders in 2026',
    description:
      'An 8-minute comparison of the two content-led PR tools: what each does, which earns coverage, why op-eds get cited by AI engines while releases do not, ghostwriting cost, and how to sequence both around a launch.',
    tag: 'Content',
    time: 8,
  },
  // AUTO-PLAYBOOKS-15-114 — generated from data/playbook-topics.json
  {
    n: 15,
    slug: 'how-to-get-featured-in-decrypt-2026',
    title: 'How to Get Featured in Decrypt in 2026: Pitch Guide',
    description: 'What Decrypt\'s editors filter for, the explainer-friendly angle that lands, and a pitch template from a senior Web3 operator\'s playbook.',
    tag: 'Tier-1',
    time: 9,
  },
  {
    n: 16,
    slug: 'how-to-get-covered-the-block-blockworks-2026',
    title: 'How to Get Covered by The Block and Blockworks in 2026',
    description: 'The two outlets that move institutional crypto. What their reporters cover, why data and primary sourcing win, and how to pitch each.',
    tag: 'Tier-1',
    time: 9,
  },
  {
    n: 17,
    slug: 'how-to-get-bloomberg-crypto-coverage-2026',
    title: 'How to Get Bloomberg Crypto Coverage in 2026',
    description: 'Bloomberg is the hardest room in crypto. What clears the bar, the data and named-source threshold, and a realistic path for a startup.',
    tag: 'Tier-1',
    time: 9,
  },
  {
    n: 18,
    slug: 'how-to-get-crypto-project-into-forbes-2026',
    title: 'How to Get Your Crypto Project Into Forbes in 2026',
    description: 'Forbes staff vs Forbes Councils vs contributors, what each is worth, and how to earn a real editorial feature instead of a pay-to-play byline.',
    tag: 'Tier-1',
    time: 10,
  },
  {
    n: 19,
    slug: 'crypto-press-release-distribution-2026',
    title: 'Crypto Press Release Distribution in 2026: What Actually Works',
    description: 'Wires, crypto-native PR networks, and direct pitching compared. Where distribution helps, where it is theatre, and what editors actually read.',
    tag: 'Strategy',
    time: 9,
  },
  {
    n: 20,
    slug: 'best-crypto-press-release-services-2026',
    title: 'Best Crypto Press Release Services Compared in 2026',
    description: 'A criteria-led look at the main crypto PR-distribution services, what they really deliver, and the cheaper earned-media alternative.',
    tag: 'Pricing',
    time: 8,
  },
  {
    n: 21,
    slug: 'free-token-listing-press-sites-2026',
    title: 'Free Token Listing and Press Release Sites: Worth It in 2026?',
    description: 'The honest read on free listing and PR sites: what they do for visibility, where they hurt credibility, and what to use instead.',
    tag: 'Launch',
    time: 7,
  },
  {
    n: 22,
    slug: 'press-coverage-startup-without-investors-2026',
    title: 'How to Get Press Coverage for a Startup Without Investors',
    description: 'No raise, no logo, no problem. The angles that earn coverage when you cannot lead with funding, drawn from real launches.',
    tag: 'Strategy',
    time: 9,
  },
  {
    n: 23,
    slug: 'press-coverage-startup-reddit-2026',
    title: 'How to Get Press Coverage for a Startup: What Reddit Gets Right and Wrong',
    description: 'The most-upvoted PR advice on Reddit, fact-checked by an operator. What holds up, what wastes your time, and what to do instead.',
    tag: 'Strategy',
    time: 8,
  },
  {
    n: 24,
    slug: 'crypto-media-relations-guide-2026',
    title: 'Crypto Media Relations in 2026: Building Real Journalist Relationships',
    description: 'Coverage is a relationship, not a transaction. How to build a real journalist network, what to never do, and how trust compounds.',
    tag: 'Strategy',
    time: 9,
  },
  {
    n: 25,
    slug: 'binance-listing-announcement-pr-2026',
    title: 'How to Announce a Binance Listing: PR Strategy for 2026',
    description: 'An exchange listing is a 24-hour window. How to coordinate the announcement, the embargo, and the KOL wave so the listing actually lands.',
    tag: 'Launch',
    time: 10,
  },
  {
    n: 26,
    slug: 'exchange-listing-pr-best-practices-2026',
    title: 'Crypto Exchange Listing Announcement PR: Best Practices for 2026',
    description: 'Binance, OKX, Bybit, KuCoin and the rest. The repeatable listing-announcement playbook and the compliance lines you cannot cross.',
    tag: 'Launch',
    time: 9,
  },
  {
    n: 27,
    slug: 'token-launch-pr-campaign-cost-2026',
    title: 'What a Token Launch PR Campaign Costs in 2026',
    description: 'Sprint vs retainer vs full launch-plus-tail, what each tier buys, and the hidden line items in a TGE budget.',
    tag: 'Pricing',
    time: 9,
  },
  {
    n: 28,
    slug: 'best-token-launch-marketing-agencies-2026',
    title: 'Best Token Launch Marketing Agencies in 2026: a Field Guide',
    description: 'A criteria-led look at token-launch and TGE agencies, the trade-offs of each model, and a fractional-operator alternative.',
    tag: 'Field guide',
    time: 10,
  },
  {
    n: 29,
    slug: 'crypto-presale-launchpad-marketing-2026',
    title: 'Crypto Presale and Launchpad Marketing Playbook for 2026',
    description: 'Launchpads bring liquidity, not narrative. How to build demand and credibility around a presale without the usual hype-cycle damage.',
    tag: 'Launch',
    time: 9,
  },
  {
    n: 30,
    slug: 'stablecoin-launch-pr-2026',
    title: 'PR for a Stablecoin Launch in 2026',
    description: 'Stablecoins are a trust product. How to run comms that lead with reserves, audits and regulation instead of yield, and earn serious coverage.',
    tag: 'Strategy',
    time: 9,
  },
  {
    n: 31,
    slug: 'nft-project-pr-2026',
    title: 'PR for an NFT Project in 2026: Beyond the Hype Cycle',
    description: 'NFTs grew up. How to earn coverage for utility, IP and culture now that the speculative wave is over, with named outlets and angles.',
    tag: 'Strategy',
    time: 8,
  },
  {
    n: 32,
    slug: 'tge-communications-timeline-2026',
    title: 'The TGE Communications Timeline for 2026: Week by Week',
    description: 'An eight-week, dated comms timeline into and out of a token generation event, mapping narrative, media, KOLs and crisis prep to the calendar.',
    tag: 'Launch',
    time: 10,
  },
  {
    n: 33,
    slug: 'crypto-airdrop-pr-strategy-2026',
    title: 'Airdrop PR and Comms Strategy for 2026',
    description: 'Airdrops are a comms event, not just a distribution mechanic. How to message eligibility, avoid a farming-only narrative, and earn real coverage.',
    tag: 'Launch',
    time: 8,
  },
  {
    n: 34,
    slug: 'post-tge-pr-first-90-days-2026',
    title: 'Post-TGE PR: The First 90 Days After Listing',
    description: 'Most teams go quiet after the token lands. The sustained-coverage playbook that keeps momentum, sentiment and AI-citation share alive.',
    tag: 'Launch',
    time: 9,
  },
  {
    n: 35,
    slug: 'defi-protocol-pr-strategy-2026',
    title: 'How to Get Media Coverage for a DeFi Protocol in 2026',
    description: 'DeFi coverage rewards mechanism clarity and real TVL. How to pitch a protocol without sounding like every other yield story.',
    tag: 'Strategy',
    time: 9,
  },
  {
    n: 36,
    slug: 'best-defi-pr-agency-2026',
    title: 'Best DeFi PR Agencies in 2026: an Honest Comparison',
    description: 'A criteria-led look at agencies that actually understand DeFi, the trade-offs of each, and when a fractional operator beats all of them.',
    tag: 'Field guide',
    time: 9,
  },
  {
    n: 37,
    slug: 'depin-pr-strategy-2026',
    title: 'PR Strategy for a DePIN Project in 2026',
    description: 'DePIN had to become a beat before it could become a story. How to make decentralized-infrastructure coverage land, with the Fluence playbook.',
    tag: 'Strategy',
    time: 10,
  },
  {
    n: 38,
    slug: 'blockchain-gaming-pr-2026',
    title: 'Blockchain Gaming PR in 2026: How to Promote a Web3 Game',
    description: 'Web3 games have two audiences who hate each other\'s language. How to run dual-track PR for gamers and crypto media without alienating either.',
    tag: 'Strategy',
    time: 9,
  },
  {
    n: 39,
    slug: 'web3-infrastructure-pr-2026',
    title: 'PR for a Web3 Infrastructure Startup in 2026',
    description: 'Infra has no token hype and no consumer story. How to make wallets, RPCs, oracles and middleware newsworthy, with the Web3Auth playbook.',
    tag: 'Strategy',
    time: 9,
  },
  {
    n: 40,
    slug: 'crypto-exchange-pr-2026',
    title: 'PR for a Crypto Exchange in 2026',
    description: 'Exchanges live and die on trust. How to run comms across listings, security, regulation and regional access without one breach erasing it all.',
    tag: 'Strategy',
    time: 9,
  },
  {
    n: 41,
    slug: 'rwa-tokenization-pr-2026',
    title: 'PR for an RWA and Tokenization Project in 2026',
    description: 'Real-world assets is where TradFi credibility meets crypto distribution. How to earn coverage that institutions and crypto media both take seriously.',
    tag: 'Strategy',
    time: 9,
  },
  {
    n: 42,
    slug: 'restaking-pr-2026',
    title: 'PR for a Restaking and Intents Project in 2026',
    description: 'The hardest narratives in crypto are the most technical. How to make restaking, intents and shared security legible to editors and AI engines.',
    tag: 'Strategy',
    time: 9,
  },
  {
    n: 43,
    slug: 'crypto-crisis-communications-2026',
    title: 'Crypto Crisis Communications in 2026: Exploits, Hacks and Depegs',
    description: 'The first hour decides the story. A field guide to running comms through an exploit, hack or depeg, with the holding-statement template.',
    tag: 'Pitfalls',
    time: 10,
  },
  {
    n: 44,
    slug: 'ai-x-crypto-agent-pr-2026',
    title: 'PR for AI x Crypto and Agentic Projects in 2026',
    description: 'Projects at the AI-and-crypto seam need both playbooks at once. How to run credibility-led AI PR and speed-led crypto PR in parallel.',
    tag: 'AI',
    time: 9,
  },
  {
    n: 45,
    slug: 'best-web3-pr-agency-india-2026',
    title: 'Best Web3 PR Agencies in India in 2026',
    description: 'India is a home market, not an afterthought. The outlets that matter (Inc42, YourStory, ET), the agencies that get it, and the fractional alternative.',
    tag: 'Regional',
    time: 9,
  },
  {
    n: 46,
    slug: 'best-web3-pr-agency-usa-2026',
    title: 'Best Web3 PR Agencies in the USA in 2026',
    description: 'The US crypto press is the most crowded room in the world. How to choose a US-focused agency and what separates access from noise.',
    tag: 'Field guide',
    time: 9,
  },
  {
    n: 47,
    slug: 'best-crypto-pr-agency-singapore-2026',
    title: 'Best Crypto PR Agencies in Singapore in 2026',
    description: 'Singapore is APAC\'s crypto capital and a Token2049 anchor. The outlets, the event-led access, and how to choose an agency that has both.',
    tag: 'Regional',
    time: 9,
  },
  {
    n: 48,
    slug: 'crypto-pr-korea-2026',
    title: 'Crypto PR in Korea in 2026: Outlets, KOLs and Access',
    description: 'Korea is roughly half of Asia\'s crypto media traffic. The native outlets, the KOL culture, and the compliance shifts you cannot ignore.',
    tag: 'Regional',
    time: 10,
  },
  {
    n: 49,
    slug: 'crypto-pr-japan-2026',
    title: 'Crypto PR in Japan in 2026: Outlets and Approach',
    description: 'Japan rewards patience, precision and process. The native outlets, the regulatory migration, and why Western pitch habits fail here.',
    tag: 'Regional',
    time: 9,
  },
  {
    n: 50,
    slug: 'crypto-pr-dubai-mena-2026',
    title: 'Crypto PR in Dubai and MENA in 2026',
    description: 'MENA pairs real capital with friendly regulation. How to use Token2049 Dubai, VARA clarity and regional outlets to build a credible story.',
    tag: 'Regional',
    time: 9,
  },
  {
    n: 51,
    slug: 'crypto-pr-vietnam-2026',
    title: 'Crypto PR in Vietnam in 2026',
    description: 'Vietnam is one of the highest crypto-adoption markets on earth and one of the least understood by Western agencies. The outlets and the access.',
    tag: 'Regional',
    time: 8,
  },
  {
    n: 52,
    slug: 'token-launch-marketing-agency-india-2026',
    title: 'Token Launch Marketing Agencies in India in 2026',
    description: 'Launching a token with an Indian home base or audience. The agencies, the compliance reality, and the dual-track launch that works here.',
    tag: 'Regional',
    time: 8,
  },
  {
    n: 53,
    slug: 'ai-startup-pr-agency-india-2026',
    title: 'Best AI Startup PR Agencies in India in 2026',
    description: 'India\'s AI startup scene is global-facing from day one. How to run PR that earns both Indian and international tech coverage.',
    tag: 'Regional',
    time: 8,
  },
  {
    n: 54,
    slug: 'apac-press-windows-2026',
    title: 'The Three APAC Press Windows: Timing Crypto News for Asia in 2026',
    description: 'Asia does not read your news when you publish it. The three regional press windows, the translation lag, and how to time a launch across them.',
    tag: 'APAC',
    time: 9,
  },
  {
    n: 55,
    slug: 'ai-product-launch-pr-2026',
    title: 'PR Strategy for an AI Product Launch in 2026',
    description: 'AI launches drown in their own category noise. How to earn coverage by leading with a concrete use case, not \'AI-native autonomous agents\'.',
    tag: 'AI',
    time: 10,
  },
  {
    n: 56,
    slug: 'ai-series-a-funding-announcement-pr-2026',
    title: 'AI Startup Series A Funding Announcement PR in 2026',
    description: 'A raise is a commodity until you frame it. How to turn an AI Series A into a category story instead of another funding-round line item.',
    tag: 'AI',
    time: 9,
  },
  {
    n: 57,
    slug: 'ai-thought-leadership-pr-2026',
    title: 'AI Thought Leadership in 2026: Executive Positioning That Works',
    description: 'In AI, credibility is the whole game. How to position a technical founder as a category authority across op-eds, podcasts and analyst rooms.',
    tag: 'Founder',
    time: 9,
  },
  {
    n: 58,
    slug: 'enterprise-ai-pr-2026',
    title: 'PR for an Enterprise AI Company in 2026',
    description: 'Enterprise buyers trust analysts and peers, not hype. How to run AI PR that lands in the rooms a CIO actually reads, including analyst relations.',
    tag: 'AI',
    time: 9,
  },
  {
    n: 59,
    slug: 'healthcare-ai-pr-2026',
    title: 'PR for a Healthcare AI Startup in 2026',
    description: 'Healthcare AI carries a trust and regulatory burden no consumer app does. How to run comms that respects evidence, the FDA and skeptical reporters.',
    tag: 'AI',
    time: 9,
  },
  {
    n: 60,
    slug: 'what-is-an-ai-publicist-2026',
    title: 'What an AI Publicist Actually Does in 2026',
    description: 'Half buzzword, half real role. What an AI publicist is, what they should deliver, and how to tell a specialist from a rebadged generalist.',
    tag: 'AI',
    time: 8,
  },
  {
    n: 61,
    slug: 'how-to-get-ai-startup-in-techcrunch-2026',
    title: 'How to Get Your AI Startup Into TechCrunch in 2026',
    description: 'TechCrunch still sets the startup agenda. What its reporters cover, the exclusive-vs-embargo call, and a pitch that does not get deleted.',
    tag: 'AI',
    time: 9,
  },
  {
    n: 62,
    slug: 'how-to-get-covered-the-information-2026',
    title: 'How to Get Covered by The Information in 2026',
    description: 'The Information is the hardest, highest-credibility tech room. What clears its bar, why scoops and sourcing rule, and when to even try.',
    tag: 'AI',
    time: 8,
  },
  {
    n: 63,
    slug: 'ai-pr-agency-pricing-packages-2026',
    title: 'AI PR Agency Pricing and Packages in 2026',
    description: 'What AI PR actually costs across agency, fractional and project models, what each tier buys, and the line items founders miss.',
    tag: 'Pricing',
    time: 9,
  },
  {
    n: 64,
    slug: 'best-b2b-saas-pr-agencies-2026',
    title: 'Best B2B SaaS PR Agencies Ranked in 2026',
    description: 'B2B SaaS PR is a different sport from consumer. A criteria-led look at the field, what separates the best, and the fractional alternative.',
    tag: 'Field guide',
    time: 9,
  },
  {
    n: 65,
    slug: 'how-to-build-founder-thought-leadership-2026',
    title: 'How to Build Founder Thought Leadership in 2026',
    description: 'Thought leadership is earned, not posted. The cadence, the channels and the author-entity build that turns a founder into a cited authority.',
    tag: 'Founder',
    time: 10,
  },
  {
    n: 66,
    slug: 'personal-brand-crypto-founder-2026',
    title: 'How to Build a Personal Brand as a Crypto Founder in 2026',
    description: 'The Twitter-and-LinkedIn playbook for crypto founders who would rather ship. What to post, what to never post, and how to sound like yourself.',
    tag: 'Founder',
    time: 9,
  },
  {
    n: 67,
    slug: 'personal-brand-startup-founder-2026',
    title: 'How to Build a Personal Brand as a Startup Founder in 2026',
    description: 'For AI and tech founders. The content cadence, the platform choices, and the line between useful authority and LinkedIn cringe.',
    tag: 'Founder',
    time: 9,
  },
  {
    n: 68,
    slug: 'how-to-get-podcast-interviews-founder-2026',
    title: 'How to Get Podcast Interviews as a Founder in 2026',
    description: 'Podcasts are the most underrated founder channel. How to build a target list, pitch hosts, and turn one tour into a quarter of authority.',
    tag: 'Founder',
    time: 8,
  },
  {
    n: 69,
    slug: 'how-to-submit-op-ed-techcrunch-2026',
    title: 'How to Submit an Op-Ed to TechCrunch (and Where Else) in 2026',
    description: 'TechCrunch rarely runs outside op-eds, so where do founder essays actually land? The real opinion-desk map and a submission that works.',
    tag: 'Founder',
    time: 8,
  },
  {
    n: 70,
    slug: 'op-ed-ghostwriting-executives-2026',
    title: 'Op-Ed Ghostwriting for Executives in 2026: How It Works',
    description: 'The founder\'s name, the founder\'s thinking, an editor-ready piece. What ghostwriting actually involves, what it costs, and how to keep it authentic.',
    tag: 'Content',
    time: 8,
  },
  {
    n: 71,
    slug: 'how-to-get-speaking-slots-crypto-conferences-2026',
    title: 'How to Get Speaking Slots at Crypto Conferences in 2026',
    description: 'Consensus, Token2049, ETHDenver and the rest. How conference programming actually works and how founders earn a real slot, not a side stage.',
    tag: 'Founder',
    time: 9,
  },
  {
    n: 72,
    slug: 'best-founder-personal-branding-agencies-2026',
    title: 'Best Founder Personal Branding Agencies in 2026',
    description: 'A criteria-led look at the founder-branding field, what separates real positioning from ghostwritten LinkedIn spam, and the fractional model.',
    tag: 'Field guide',
    time: 9,
  },
  {
    n: 73,
    slug: 'linkedin-strategy-founders-2026',
    title: 'LinkedIn Strategy for Web3 and AI Founders in 2026',
    description: 'LinkedIn\'s 2026 algorithm rewards substance and consistency. The posting system that builds authority without turning into a motivational account.',
    tag: 'Founder',
    time: 8,
  },
  {
    n: 74,
    slug: 'how-to-get-into-forbes-councils-2026',
    title: 'How to Get Into a Forbes Council in 2026 (and Whether You Should)',
    description: 'Forbes Councils are pay-to-publish, and that changes what they are worth. The honest cost-benefit, the credibility trap, and the alternatives.',
    tag: 'Founder',
    time: 8,
  },
  {
    n: 75,
    slug: 'best-fractional-pr-consultant-tech-2026',
    title: 'Best Fractional PR Consultants for Tech Startups in 2026',
    description: 'What a fractional PR consultant is, how to evaluate one, and why a senior operator part-time often beats a junior-staffed agency full-time.',
    tag: 'Operations',
    time: 9,
  },
  {
    n: 76,
    slug: 'best-fractional-pr-consultant-web3-2026',
    title: 'Best Fractional PR Consultant for a Web3 Startup in 2026',
    description: 'Web3 moves too fast for agency layers. Why fractional fits crypto founders, what to look for, and the trade-offs to weigh honestly.',
    tag: 'Operations',
    time: 9,
  },
  {
    n: 77,
    slug: 'fractional-pr-cost-pricing-2026',
    title: 'Fractional PR Cost and Monthly Retainer Pricing in 2026',
    description: 'What fractional PR really costs, what a retainer should include, and how to tell a fair price from an underqualified one.',
    tag: 'Pricing',
    time: 8,
  },
  {
    n: 78,
    slug: 'fractional-cmo-web3-2026',
    title: 'Fractional CMO for a Web3 Startup in 2026: When It Makes Sense',
    description: 'A fractional CMO owns the whole growth function, not just PR. When a Web3 startup needs one, when it needs fractional PR instead, and the overlap.',
    tag: 'Operations',
    time: 8,
  },
  {
    n: 79,
    slug: 'fractional-pr-vs-in-house-hire-2026',
    title: 'Fractional PR vs Hiring an In-House PR Lead in 2026',
    description: 'The build-vs-rent decision for comms. Cost, speed, seniority and risk compared, with a decision tree for founders at each stage.',
    tag: 'Operations',
    time: 8,
  },
  {
    n: 80,
    slug: 'when-to-hire-fractional-pr-2026',
    title: 'When Should a Startup Hire Fractional PR in 2026?',
    description: 'Too early wastes money; too late wastes momentum. The signals that say it is time, and the milestones that should trigger a comms hire.',
    tag: 'Operations',
    time: 7,
  },
  {
    n: 81,
    slug: 'best-crypto-kol-marketing-agencies-2026',
    title: 'Best Crypto KOL Marketing Agencies in 2026',
    description: 'A criteria-led look at KOL agencies, the fraud problem nobody audits, and how to choose one that vets creators before it bills you.',
    tag: 'Field guide',
    time: 9,
  },
  {
    n: 82,
    slug: 'kol-campaign-token-launch-2026',
    title: 'How to Run a KOL Campaign for a Token Launch in 2026',
    description: 'The three-wave KOL sequence that actually moves a launch: credibility anchors, broad activation, sustained deep-dives, with timing and briefs.',
    tag: 'KOL',
    time: 9,
  },
  {
    n: 83,
    slug: 'crypto-influencer-pricing-rates-2026',
    title: 'Crypto Influencer and KOL Pricing: 2026 Rates',
    description: 'What KOLs actually charge in 2026 by tier and platform, the all-in budget multiplier, and where creator spend quietly leaks.',
    tag: 'Pricing',
    time: 8,
  },
  {
    n: 84,
    slug: 'crypto-kol-marketing-korea-2026',
    title: 'Crypto KOL Marketing in Korea in 2026',
    description: 'Korea\'s KOL scene runs by its own rules, rates and platforms. How to activate Korean creators credibly without importing Western playbooks.',
    tag: 'Regional',
    time: 8,
  },
  {
    n: 85,
    slug: 'how-to-vet-crypto-kols-2026',
    title: 'How to Vet Crypto KOLs in 2026 (and Spot Fake Engagement)',
    description: 'Most KOL spend is wasted on bought audiences. The independent-audit checklist that catches bots, fake reach and dead engagement before you sign.',
    tag: 'KOL',
    time: 9,
  },
  {
    n: 86,
    slug: 'web3-kol-agency-vs-in-house-2026',
    title: 'Web3 KOL Agency vs Building Your Own Creator List in 2026',
    description: 'Rent the network or build it. The cost, control and risk trade-offs of a KOL agency versus an in-house creator program.',
    tag: 'KOL',
    time: 8,
  },
  {
    n: 87,
    slug: 'top-crypto-marketing-agencies-2026',
    title: 'Top Crypto Marketing Agencies in 2026: How to Compare Them',
    description: 'Marketing, PR, KOL and growth get lumped together and shouldn\'t be. A map of the field and how to choose by what you actually need.',
    tag: 'Field guide',
    time: 9,
  },
  {
    n: 88,
    slug: 'web3-marketing-agency-guide-2026',
    title: 'How to Choose a Web3 Marketing Agency in 2026',
    description: 'A buyer\'s guide to picking a Web3 marketing partner: the questions that expose depth, the red flags, and how to match model to stage.',
    tag: 'Strategy',
    time: 9,
  },
  {
    n: 89,
    slug: 'cybersecurity-pr-agency-pricing-2026',
    title: 'Cybersecurity PR Agency Retainer Pricing in 2026',
    description: 'What cybersecurity PR costs, why analyst relations changes the math, and how a fractional model compares to a median Series B retainer.',
    tag: 'Pricing',
    time: 8,
  },
  {
    n: 90,
    slug: 'how-to-get-covered-dark-reading-2026',
    title: 'How to Get Covered by Dark Reading in 2026',
    description: 'Dark Reading rewards research, not pitches. What its editors run, why threat findings beat product news, and a pitch that respects the desk.',
    tag: 'Cyber',
    time: 9,
  },
  {
    n: 91,
    slug: 'cybersecurity-analyst-relations-2026',
    title: 'Cybersecurity Analyst Relations in 2026: Gartner, Forrester and IDC',
    description: 'Analysts shape the shortlist before press ever runs. The briefing cadence, the Magic Quadrant and Wave reality, and how vendors earn inclusion.',
    tag: 'Cyber',
    time: 10,
  },
  {
    n: 92,
    slug: 'cybersecurity-threat-research-pr-2026',
    title: 'Turning Threat Research Into Coverage in 2026',
    description: 'A good vulnerability report is the best PR a security vendor has. How to package research for coverage without crossing disclosure lines.',
    tag: 'Cyber',
    time: 9,
  },
  {
    n: 93,
    slug: 'cybersecurity-breach-crisis-comms-2026',
    title: 'Cybersecurity Breach and Crisis Communications in 2026',
    description: 'When you are the breach, not the researcher. The first-hour playbook, the holding statement, and how to communicate through an incident.',
    tag: 'Cyber',
    time: 9,
  },
  {
    n: 94,
    slug: 'best-cybersecurity-marketing-agencies-2026',
    title: 'Best Marketing Agencies for Cybersecurity Firms in 2026',
    description: 'Cybersecurity marketing is a credibility game most agencies misread. A criteria-led field guide and the analyst-aware alternative.',
    tag: 'Field guide',
    time: 9,
  },
  {
    n: 95,
    slug: 'how-to-build-ai-search-visibility-geo-2026',
    title: 'How to Build AI Search Visibility (GEO) for a Startup in 2026',
    description: 'When buyers ask ChatGPT instead of Google, getting cited is the win. The earned-media and content moves that make AI engines name your brand.',
    tag: 'AI Search',
    time: 10,
  },
  {
    n: 96,
    slug: 'how-to-get-cited-by-chatgpt-2026',
    title: 'How to Get Your Brand Cited by ChatGPT and Perplexity in 2026',
    description: 'Citations come from trust signals AI engines can extract. The concrete tactics that turn earned coverage into answer-engine mentions.',
    tag: 'AI Search',
    time: 9,
  },
  {
    n: 97,
    slug: 'aeo-vs-seo-startups-2026',
    title: 'AEO vs SEO: What Startups Actually Need in 2026',
    description: 'Answer-engine optimization is not a replacement for SEO, it\'s a layer on top. What\'s different, what overlaps, and where to spend first.',
    tag: 'AI Search',
    time: 8,
  },
  {
    n: 98,
    slug: 'how-to-measure-pr-roi-2026',
    title: 'How to Measure PR ROI and Share of Voice in 2026',
    description: 'Impressions are vanity. The metrics that actually map PR to pipeline, the share-of-voice method, and what to report to a board.',
    tag: 'Strategy',
    time: 9,
  },
  {
    n: 99,
    slug: 'share-of-voice-crypto-2026',
    title: 'Share of Voice in Crypto: How to Track It in 2026',
    description: 'Share of voice is the one metric that survives a bear market. How to define your set, measure it, and use it to steer a comms program.',
    tag: 'Strategy',
    time: 8,
  },
  {
    n: 100,
    slug: 'how-to-choose-web3-pr-agency-checklist-2026',
    title: 'How to Choose a Web3 PR Agency in 2026: The Checklist',
    description: 'A founder-ready checklist for evaluating Web3 PR agencies: the questions that expose real access, the red flags, and the model-fit test.',
    tag: 'Field guide',
    time: 9,
  },
  {
    n: 101,
    slug: 'web3-pr-agency-reviews-clutch-2026',
    title: 'Web3 PR Agency Reviews on Clutch in 2026: How to Read Them',
    description: 'Review sites are gameable. How to read Clutch, G2 and Trustpilot ratings for PR agencies without being misled by curated testimonials.',
    tag: 'Field guide',
    time: 7,
  },
  {
    n: 102,
    slug: 'pr-for-tech-startups-guide-2026',
    title: 'PR for Tech Startups in 2026: A Founder\'s Guide',
    description: 'The whole PR picture for an early tech startup: when to start, what to spend, what to do yourself, and what actually earns coverage.',
    tag: 'Strategy',
    time: 10,
  },
  {
    n: 103,
    slug: 'b2b-tech-pr-guide-2026',
    title: 'B2B Tech PR in 2026: What\'s Different',
    description: 'B2B PR sells to a buying committee, not a crowd. How category narrative, analyst relations and customer proof replace consumer-style hype.',
    tag: 'Strategy',
    time: 9,
  },
  {
    n: 104,
    slug: 'earned-vs-paid-media-web3-2026',
    title: 'Earned vs Paid Media in Web3 in 2026',
    description: 'Paid buys reach; earned builds belief. Where each fits in a Web3 budget, why credibility outlasts impressions, and how to blend them.',
    tag: 'Strategy',
    time: 8,
  },
  {
    n: 105,
    slug: 'crypto-pr-small-budget-2026',
    title: 'Crypto PR on a Small Budget in 2026: What\'s Actually Possible',
    description: 'You do not need a $40K sprint to earn coverage. The high-leverage moves a lean team can run themselves, and where to spend the first dollar.',
    tag: 'Pricing',
    time: 9,
  },
  {
    n: 106,
    slug: 'affordable-pr-tech-startup-2026',
    title: 'Affordable PR for Tech Startups in 2026',
    description: 'What \'affordable PR\' really buys, the models that fit a small budget, and how to avoid cheap services that quietly cost you credibility.',
    tag: 'Pricing',
    time: 8,
  },
  {
    n: 107,
    slug: 'crypto-publicist-vs-agency-2026',
    title: 'Crypto Publicist vs PR Agency in 2026: Which Do You Need?',
    description: 'A solo publicist gives you senior attention; an agency gives you bench. The honest trade-offs and which fits your stage and budget.',
    tag: 'Operations',
    time: 8,
  },
  {
    n: 108,
    slug: 'how-to-write-crypto-press-release-2026',
    title: 'How to Write a Crypto Press Release That Gets Picked Up in 2026',
    description: 'Most releases die in the inbox. The structure, the dated news peg, and the compliance lines that make a release pickup-ready.',
    tag: 'Content',
    time: 8,
  },
  {
    n: 109,
    slug: 'crypto-pr-agency-comparison-2026',
    title: 'How to Compare Crypto PR Agencies in 2026',
    description: 'A practical framework for comparing crypto PR agencies side by side: access, seniority, model, reporting and price, with a scoring rubric.',
    tag: 'Field guide',
    time: 8,
  },
  {
    n: 110,
    slug: 'web3-pr-bear-market-2026',
    title: 'Web3 PR in a Bear Market in 2026',
    description: 'Bear markets are when share of voice is cheapest to win. How to keep building narrative and credibility when budgets and attention contract.',
    tag: 'Strategy',
    time: 8,
  },
  {
    n: 111,
    slug: 'crypto-newsjacking-2026',
    title: 'Newsjacking for Crypto Brands in 2026',
    description: 'The fastest free coverage is a smart reaction to breaking news. How to newsjack responsibly, where it backfires, and how to move in minutes.',
    tag: 'Strategy',
    time: 8,
  },
  {
    n: 112,
    slug: 'founder-led-diy-pr-2026',
    title: 'DIY PR in 2026: How Founders Can Run Their Own Comms',
    description: 'Before you can afford help, you can still earn coverage. The founder-run PR system: news hooks, a media list, pitching and a posting cadence.',
    tag: 'Strategy',
    time: 9,
  },
  {
    n: 113,
    slug: 'token-launch-pr-mistakes-2026',
    title: 'The Most Common Token Launch PR Mistakes in 2026',
    description: 'The avoidable errors that quietly sink a TGE: no news hook, hype with no proof, ignoring APAC, KOL fraud, and going silent after launch.',
    tag: 'Pitfalls',
    time: 9,
  },
  {
    n: 114,
    slug: 'coindesk-vs-cointelegraph-where-to-pitch-2026',
    title: 'CoinDesk vs Cointelegraph in 2026: Where to Pitch What',
    description: 'Two flagship outlets, two different newsrooms. Which story belongs where, how their desks differ, and how to sequence a pitch across both.',
    tag: 'Tier-1',
    time: 9,
  },
];

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/playbook-jsonld.json'), 'utf8');
}

export default function PlaybookIndexPage() {
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script
        id="playbook-collection-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <EditorialShell active="playbook">
        <main className="blog-page">
          <div className="blog-page-inner">
            <section className="blog-index-hero">
              <div>
                <p className="blog-index-kicker">
                  <span className="dot" /> Playbook · 114 field guides
                </p>
                <h1 className="blog-index-title">
                  Field <em>guides</em>.
                </h1>
              </div>
              <div className="blog-index-blurb">
                <p>
                  The long-form playbooks that sit behind the practice. Pitch guides, regional
                  teardowns, pricing breakdowns, and the trade-offs every founder weighing PR
                  should know before signing. New to the terms? Start with the{' '}
                  <a href="/glossary">PR glossary</a>.
                </p>
              </div>
            </section>

            <div className="blog-list">
              {PLAYBOOKS.map((p) => (
                <a
                  key={p.n}
                  href={`/playbook/${p.slug}`}
                  className="blog-card"
                  data-magnet
                  aria-label={`Read playbook ${p.n}: ${p.title}`}
                >
                  <div className="blog-card-media" aria-hidden>
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'grid',
                        placeItems: 'center',
                        fontFamily: 'var(--font-display)',
                        fontStyle: 'italic',
                        fontSize: 'clamp(48px, 5vw, 80px)',
                        color: 'var(--ink)',
                      }}
                    >
                      {String(p.n).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="blog-card-meta">
                    <span>Playbook {String(p.n).padStart(2, '0')}</span>
                    <span className="blog-card-tag">{p.tag}</span>
                    <span className="blog-card-tag subtle">{p.time} min</span>
                  </div>
                  <h2 className="blog-card-title">{p.title}</h2>
                  <p className="blog-card-blurb">{p.description}</p>
                  <span className="blog-card-cta">Read playbook →</span>
                </a>
              ))}
            </div>
          </div>
        </main>
      </EditorialShell>
      <EditorialScripts />
    </>
  );
}
