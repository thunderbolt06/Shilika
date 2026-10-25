import type { ChannelId } from './channels';

export type CategoryId =
  | 'ai-devtools'
  | 'b2b-ai-saas'
  | 'vertical-ai'
  | 'ai-infra'
  | 'consumer-ai'
  | 'ai-agents'
  | 'web3-protocol';
export type StageId = 'pre-seed' | 'seed' | 'series-a' | 'series-b';
export type BuyerId = 'developers' | 'business' | 'enterprise' | 'consumers' | 'crypto';
export type MotionId = 'plg' | 'founder-led' | 'sales-led' | 'community' | 'partner';

export interface PlanPhases {
  w1: string[]; // weeks 1-2
  w3: string[]; // weeks 3-4
  w5: string[]; // weeks 5-8
  w9: string[]; // weeks 9-12
}

type Scores = Partial<Record<ChannelId, number>>;

export interface Category {
  id: CategoryId;
  label: string;
  frame: string;
  pain: string;
  alternative: string;
  proof: string;
  questions: string[];
  channels: Scores;
  plan: PlanPhases;
  northStar: { metric: string; why: string };
  metrics: string[];
  /** [early-stage risk, later-stage risk] */
  risks: [string, string];
}

export interface Stage {
  id: StageId;
  label: string;
  channels: Scores;
  plan: PlanPhases;
  metric: string;
  risk: string;
  focus: string;
}

export interface Buyer {
  id: BuyerId;
  label: string;
  phrase: string;
  verifies: string;
  channels: Scores;
}

export interface Motion {
  id: MotionId;
  label: string;
  channels: Scores;
  plan: PlanPhases;
  metric: string;
  risk: string;
  angle: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'ai-devtools',
    label: 'AI devtools / API',
    frame: 'developer tool or API',
    pain: 'lose days wiring models, evals and infra together before they can ship one feature',
    alternative: 'building it in-house on top of an open-source library',
    proof: 'a working code sample and a public benchmark',
    questions: [
      'What can a developer do in the first 10 minutes with your API that takes a day without it?',
      'Which open-source project or in-house script are you really replacing, and why would a senior engineer admit it is worse?',
      'What number on your benchmark or latency page would make a skeptical engineer share it in Slack?',
    ],
    channels: {
      seo: 7, geo: 8, reddit: 7, 'x-organic': 8, youtube: 6, communities: 7,
      'product-hunt': 7, partnerships: 7, email: 5, 'google-ads': 4, podcasts: 5, pr: 5,
      'linkedin-organic': 3, influencers: 4, events: 4, referral: 4,
    },
    plan: {
      w1: [
        'Instrument time-to-first-successful-call: signup, API key created, first 200 response. This is your activation event.',
        'Rewrite the docs quickstart so a developer copies one snippet and gets a real result in under 5 minutes.',
      ],
      w3: [
        'Publish 3 comparison pages ("[you] vs [open-source library]", "[you] vs building in-house", "[you] vs [closest competitor]") with honest trade-offs.',
        'Ship 2 starter templates or example repos on GitHub that solve a real use case end to end.',
      ],
      w5: [
        'Post a Show HN or technical deep dive on how you solved one hard problem (latency, cost, eval quality). Engineers share engineering, not features.',
        'Ship one integration with a framework your users already use (LangChain, LlamaIndex, Vercel AI SDK, a popular vector DB) and get listed in its docs.',
      ],
      w9: [
        'Publish a public benchmark or cost comparison with reproducible methodology, and pitch it to 5 developer newsletters.',
        'Review which docs pages and templates lead to activation, then turn the top 3 into SEO and AI search landing pages.',
      ],
    },
    northStar: {
      metric: 'Weekly active API keys making production calls',
      why: 'Signups lie in devtools. A key that keeps calling in production means a developer shipped something on you.',
    },
    metrics: [
      'Time to first successful API call (median minutes)',
      'Docs-to-signup conversion rate',
    ],
    risks: [
      'Developers try you once and churn because the quickstart breaks, the error messages are vague, or pricing is unclear. Fix the first 10 minutes before buying any traffic.',
      'A model provider or cloud platform ships your core feature for free. Your moat has to move to workflow, reliability and integrations, and your messaging has to say so before analysts do.',
    ],
  },
  {
    id: 'b2b-ai-saas',
    label: 'B2B AI SaaS',
    frame: 'AI-powered workflow product',
    pain: 'still do a repetitive, high-volume task by hand or with brittle spreadsheets',
    alternative: 'their current tool plus a ChatGPT tab',
    proof: 'a before and after time or cost number from a real customer workflow',
    questions: [
      'Which job does your buyer do every week that your product removes, and how many hours does it cost them today?',
      'Why is "our current tool plus ChatGPT" not good enough, in one sentence a team lead could repeat to their boss?',
      'Which existing budget line does your product come out of, and who signs it?',
    ],
    channels: {
      seo: 7, geo: 7, 'linkedin-organic': 8, 'linkedin-ads': 6, email: 7, 'google-ads': 6,
      partnerships: 6, podcasts: 5, pr: 6, 'product-hunt': 5, events: 5, youtube: 5, referral: 4,
      reddit: 4, 'x-organic': 4, communities: 4,
    },
    plan: {
      w1: [
        'Interview 8 to 10 users or prospects and write down the exact words they use for the problem. These words become your headline, ad copy and SEO targets.',
        'Pick one workflow to lead with (not five) and rebuild the homepage hero around it with a quantified outcome.',
      ],
      w3: [
        'Publish 4 "how to [job] with AI" pages and 2 alternative pages targeting the incumbent tool your buyers already use.',
        'Record a 90-second product demo of that one workflow and use it on the homepage, in sales emails and on LinkedIn.',
      ],
      w5: [
        'Turn 2 customer conversations into short case notes with a before and after number (time saved, tickets closed, hours cut). Get written approval.',
        'Launch a template gallery or free mini-tool that solves a slice of the job without signup, and gate the full workflow.',
      ],
      w9: [
        'Run a webinar or live teardown with a partner who shares your buyer, and follow up every registrant within 48 hours.',
        'Audit which pages and channels created opportunities (not just signups) and cut the bottom two channels.',
      ],
    },
    northStar: {
      metric: 'Weekly active teams completing the core workflow',
      why: 'B2B AI products churn when they are a novelty. Teams repeating the workflow weekly is the leading signal for renewal and expansion.',
    },
    metrics: [
      'Trial or pilot to paid conversion rate',
      'Seats or workspaces added per account after 60 days',
    ],
    risks: [
      'Your product reads as a feature a big platform will add next quarter. Without a sharp workflow wedge and proof, buyers will wait instead of buying.',
      'AI-washing fatigue: buyers have seen 50 "AI copilots" this year. Messaging that leads with the model instead of the outcome will stop converting even as spend rises.',
    ],
  },
  {
    id: 'vertical-ai',
    label: 'Vertical AI (health / legal / fintech)',
    frame: 'specialist AI product for a regulated industry',
    pain: 'face slow, expensive, compliance-heavy work that generic AI tools are not allowed to touch',
    alternative: 'outsourced staff, legacy industry software, or doing nothing because of risk',
    proof: 'a compliance posture (SOC 2, HIPAA, data residency) and a named expert or institution vouching for accuracy',
    questions: [
      'What would a compliance officer or general counsel need to see before letting your product near real data?',
      'Which industry insider (doctor, lawyer, CFO) is on your team or advisory board, and can they front your content?',
      'What is the cost of an error in your domain, and how does your product make errors less likely than the current process?',
    ],
    channels: {
      pr: 8, events: 8, partnerships: 8, 'linkedin-organic': 7, 'linkedin-ads': 6, seo: 6, geo: 7,
      podcasts: 6, email: 6, 'google-ads': 4, communities: 4, youtube: 3, referral: 4,
    },
    plan: {
      w1: [
        'Write a one-page trust brief: data handling, model choices, human review steps, certifications in progress. Sales and PR both need it.',
        'List the 3 industry associations, 2 trade publications and 2 conferences your buyers trust. These replace general tech media for you.',
      ],
      w3: [
        'Publish a plain-language explainer on how your AI handles accuracy and liability in your domain. This page will get forwarded internally by buyers.',
        'Get your domain expert co-founder or advisor bylined in one trade publication on a problem (not on your product).',
      ],
      w5: [
        'Run a small paid or design-partner pilot with clear success criteria and agree in advance what you can say publicly about it.',
        'Approach one channel partner (a consultancy, EHR or practice-management vendor, core banking provider) about a referral or integration arrangement.',
      ],
      w9: [
        'Speak on or host a session at one industry event, and bring the trust brief and pilot results as leave-behinds.',
        'Build a compliance FAQ and security page aimed at both buyers and AI search engines, since procurement teams now ask chatbots first.',
      ],
    },
    northStar: {
      metric: 'Qualified pilots converted to annual contracts',
      why: 'Sales cycles in regulated industries are long. Pilot-to-contract conversion tells you whether trust and value are both landing.',
    },
    metrics: [
      'Average days from first meeting to signed pilot',
      'Share of deals that stall at security or compliance review',
    ],
    risks: [
      'One public accuracy failure or a data incident can end the company in a regulated market. Do not let marketing claims run ahead of what the product and compliance team can defend.',
      'Procurement and compliance reviews stretch cycles to 6 to 12 months, so marketing spend can look wasted for two quarters. Track pipeline stages, not just closed revenue.',
    ],
  },
  {
    id: 'ai-infra',
    label: 'AI infrastructure',
    frame: 'infrastructure layer for AI workloads',
    pain: 'are overpaying for GPUs, fighting latency, or blocked by unreliable training and inference pipelines',
    alternative: 'a hyperscaler (AWS, GCP, Azure) or a self-managed open-source stack',
    proof: 'published price-performance numbers and named reference architectures',
    questions: [
      'What is your price-performance or reliability claim, and can an engineer reproduce it in an afternoon?',
      'Why would a platform team take on the risk of a vendor smaller than AWS? What do you do that a hyperscaler cannot or will not?',
      'Who in the account feels the pain first (ML engineer, platform lead, CFO looking at the GPU bill) and who signs?',
    ],
    channels: {
      pr: 7, events: 7, partnerships: 9, seo: 6, geo: 7, 'x-organic': 6, podcasts: 6, 'linkedin-organic': 6,
      'linkedin-ads': 5, communities: 5, youtube: 5, reddit: 5, email: 5, 'google-ads': 4,
    },
    plan: {
      w1: [
        'Define 2 workloads you win on (for example, fine-tuning 7B to 70B models, or high-throughput inference) and stop marketing to everything else.',
        'Build a cost calculator or price-performance table versus the hyperscaler default, with methodology linked.',
      ],
      w3: [
        'Publish one technical deep dive per workload with real numbers, and submit it to engineering newsletters and relevant subreddits.',
        'Apply to the startup or partner program of at least one cloud, model lab or chip vendor that shares your buyer.',
      ],
      w5: [
        'Run a credits or migration offer for teams switching from a hyperscaler, with a named engineer assigned to each one.',
        'Brief 5 infrastructure analysts and reporters on your benchmark. Infra buyers check analyst notes and trade press before they shortlist.',
      ],
      w9: [
        'Host a side event or workshop at one AI or infra conference with a partner, and book technical meetings ahead of it.',
        'Turn the first migrations into reference architectures (with customer approval) that sales can send during evaluations.',
      ],
    },
    northStar: {
      metric: 'Monthly committed compute or usage revenue',
      why: 'Infra revenue is usage-driven. Committed spend shows whether teams trust you with production, not just experiments.',
    },
    metrics: [
      'Time from first workload to production usage',
      'Net revenue retention on usage accounts',
    ],
    risks: [
      'You are selling against free credits from hyperscalers. If your only story is price, a single credit program can wipe out your pipeline overnight.',
      'GPU supply and pricing swing fast. A margin or availability shock can turn a price-led brand into a broken promise, so lead with reliability and workflow, not only cost.',
    ],
  },
  {
    id: 'consumer-ai',
    label: 'Consumer AI app',
    frame: 'AI app for everyday users',
    pain: 'want a specific result (a photo, a plan, a study answer, a companion) without learning prompts or tools',
    alternative: 'ChatGPT, Gemini, or the free feature inside an app they already have',
    proof: 'a share-worthy output and visible social proof (ratings, creator videos)',
    questions: [
      'What is the single output a user would screenshot and send to a friend in the first session?',
      'Why would someone pay for this instead of asking ChatGPT, in words a 19-year-old would use?',
      'What brings a user back on day 7 without a push notification?',
    ],
    channels: {
      tiktok: 9, influencers: 8, 'meta-ads': 7, referral: 7, 'product-hunt': 6, youtube: 6, reddit: 6,
      'x-organic': 5, pr: 6, seo: 5, geo: 5, communities: 4, email: 4, whatsapp: 4,
    },
    plan: {
      w1: [
        'Find your "wow output" and make it the first screen after signup. Measure share rate on it from day one.',
        'Set up attribution (app store analytics, UTMs, a creator link tool) so every later experiment can be read.',
      ],
      w3: [
        'Produce 30 short vertical videos showing real outputs, post daily on TikTok, Reels and Shorts, and note which hooks hold attention past 3 seconds.',
        'Seed the app with 10 micro-creators (10K to 100K followers) who already make content in your niche. Pay a flat fee plus a bonus for installs.',
      ],
      w5: [
        'Put Meta and TikTok ad budget behind the top 3 organic hooks only, with a strict cost-per-activated-user ceiling.',
        'Add a referral or share loop at the moment of the wow output (watermark, share card, invite credit).',
      ],
      w9: [
        'Launch on Product Hunt and app-store featuring channels with a new feature or version, and pitch consumer tech reporters with usage data.',
        'Cut acquisition on any channel whose day-30 retained users cost more than 3 months of expected revenue per user.',
      ],
    },
    northStar: {
      metric: 'Day-30 retained users',
      why: 'Consumer AI downloads spike and vanish. Retained users are the only number investors and app stores reward.',
    },
    metrics: [
      'Share or invite rate per active user',
      'Cost per activated user by channel',
    ],
    risks: [
      'Viral spikes without retention. Paid growth on a leaky product burns the round and poisons ad accounts with bad signals.',
      'A free feature from OpenAI, Google or Apple copies your core output. You need a brand, a community or a data advantage that a default feature does not have.',
    ],
  },
  {
    id: 'ai-agents',
    label: 'AI agents',
    frame: 'AI agent that does the work end to end',
    pain: 'are buried in multi-step tasks that need judgment, not just autocomplete',
    alternative: 'hiring another person, an offshore team, or stitching together Zapier and a chatbot',
    proof: 'a recorded run of the agent doing a real task with the success rate shown',
    questions: [
      'What job does your agent finish without a human, and what share of runs succeed today?',
      'Where does a human stay in the loop, and how do you say that honestly without scaring the buyer?',
      'Is your price compared against software seats or against a salary? Pick one and price the story around it.',
    ],
    channels: {
      'x-organic': 8, 'linkedin-organic': 7, youtube: 7, geo: 7, seo: 6, pr: 7, podcasts: 6,
      'product-hunt': 7, partnerships: 6, 'linkedin-ads': 5, email: 5, communities: 5, events: 5,
      'google-ads': 4, reddit: 5, influencers: 4,
    },
    plan: {
      w1: [
        'Pick the one task your agent completes most reliably and publish its success rate internally. Market only that task for 90 days.',
        'Record 3 unedited screen captures of the agent completing a real task from start to finish. Raw beats polished for agents.',
      ],
      w3: [
        'Write an honest "what our agent does and does not do" page. It reduces bad-fit signups and gets cited by AI search.',
        'Launch a usage-based or outcome-based pricing test and show the comparison to the cost of doing the task by hand.',
      ],
      w5: [
        'Run a public build-in-public thread on X and LinkedIn showing weekly success-rate improvements and failure cases you fixed.',
        'Integrate with the system of record your buyer lives in (CRM, ticketing, ERP, inbox) and co-announce it.',
      ],
      w9: [
        'Pitch a reporter on a data story from agent runs (time saved, tasks completed, failure patterns) rather than a product announcement.',
        'Launch on Product Hunt or Show HN with a live demo the visitor can trigger, and track runs per visitor.',
      ],
    },
    northStar: {
      metric: 'Tasks completed successfully per week',
      why: 'Agents are bought on outcomes. Completed tasks combine adoption and reliability in one number.',
    },
    metrics: [
      'Task success rate without human correction',
      'Share of accounts running the agent on a schedule or trigger',
    ],
    risks: [
      'The demo outruns the product. If prospects see a 95% success demo and get 60% in production, word spreads fast in small founder and operator circles.',
      'Agent pricing and liability questions slow enterprise deals. Without clear guardrails, audit logs and a story for when the agent is wrong, security reviews will stall.',
    ],
  },
  {
    id: 'web3-protocol',
    label: 'Web3 protocol',
    frame: 'onchain protocol',
    pain: 'are stuck with fragmented liquidity, slow settlement or trust assumptions they cannot verify',
    alternative: 'an established protocol with deeper liquidity, or a centralized service',
    proof: 'onchain data (TVL, volume, active addresses), audits and credible backers',
    questions: [
      'What can a user or developer do onchain with you that they cannot do elsewhere, in one sentence without jargon?',
      'Which ecosystem (Ethereum L2s, Solana, Cosmos, Bitcoin L2s) is your home, and who are the 10 accounts that ecosystem listens to?',
      'What is your story if the token price drops 60% the week after launch?',
    ],
    channels: {
      'x-organic': 9, communities: 9, influencers: 7, pr: 8, events: 7, partnerships: 8, podcasts: 6,
      geo: 5, seo: 4, email: 4, referral: 6, youtube: 4, reddit: 5, whatsapp: 3,
    },
    plan: {
      w1: [
        'Write the narrative doc: the problem, why onchain, why now, why this team. Every thread, pitch and AMA pulls from it.',
        'Audit your X, Discord and Telegram for bots, dead channels and unanswered questions. Clean community health before you grow it.',
      ],
      w3: [
        'Publish a plain-English explainer and a technical litepaper section, and get one respected researcher or builder to review it publicly.',
        'Map 15 ecosystem partners (wallets, bridges, DEXs, data platforms) and propose one co-marketing or integration each.',
      ],
      w5: [
        'Run a KOL wave with 5 to 10 credible voices sized to your ecosystem, with disclosure and staggered timing. Avoid pure shill accounts.',
        'Host weekly X Spaces or community calls with builders using the protocol, and publish a short recap each week.',
      ],
      w9: [
        'Line up crypto media (The Block, CoinDesk, Decrypt, Blockworks) around a real milestone such as mainnet, audit completion or a major integration.',
        'Plan a side event at the next major conference in your ecosystem and publish onchain metrics before and after.',
      ],
    },
    northStar: {
      metric: 'Monthly active onchain addresses (excluding sybil and bot wallets)',
      why: 'Price and follower counts are noisy. Real addresses using the protocol are what partners, exchanges and serious investors check.',
    },
    metrics: [
      'TVL or volume retained 30 days after incentives end',
      'Developer or integration count building on the protocol',
    ],
    risks: [
      'Mercenary users: airdrop and points farmers inflate numbers and leave the day incentives stop. Design rewards around usage you want to keep.',
      'Regulatory or market shocks (an exchange delisting, an enforcement action, a bear week) can drown your milestone news. Keep a crisis comms plan and an always-on builder narrative.',
    ],
  },
];

export const STAGES: Stage[] = [
  {
    id: 'pre-seed',
    label: 'Pre-seed',
    channels: { 'google-ads': -3, 'meta-ads': -3, 'linkedin-ads': -3, events: -2, influencers: -1, 'x-organic': 2, 'linkedin-organic': 2, communities: 1, 'product-hunt': 1, reddit: 1 },
    plan: {
      w1: ['Founder blocks 6 hours a week for marketing. At pre-seed, the founder is the channel.'],
      w3: ['Set up a simple weekly scorecard in a spreadsheet: one row per channel, columns for effort, leads and learnings.'],
      w5: ['Send a short monthly update to angels and advisors with one ask. Warm intros are your cheapest channel.'],
      w9: ['Package what worked into a one-page GTM memo for your seed raise: channels tested, numbers, what you will scale.'],
    },
    metric: 'Number of conversations with target users per week',
    risk: 'Spreading a founder’s limited time across too many channels. Two channels done well beat six done poorly at pre-seed.',
    focus: 'finding the first channel that works without paid budget',
  },
  {
    id: 'seed',
    label: 'Seed',
    channels: { 'google-ads': -1, 'meta-ads': -1, 'linkedin-ads': -1, 'product-hunt': 1, seo: 1, geo: 1, pr: 1 },
    plan: {
      w1: ['Decide who owns marketing: founder, first marketing hire, or fractional support. Write down the owner per channel.'],
      w3: ['Set up basic attribution: UTMs on every link, a "how did you hear about us" field, and a CRM or spreadsheet that ties leads to source.'],
      w5: ['Run one paid test with a fixed budget and a written kill rule, so you learn whether paid can work before Series A.'],
      w9: ['Write the Series A story: which 1 to 2 channels are repeatable, current CAC, and what more budget would buy.'],
    },
    metric: 'Repeatable pipeline or signups from the top 2 channels',
    risk: 'Hiring a senior marketing leader before you know which channel works. They will build a plan for the wrong motion and you will lose 6 months.',
    focus: 'proving one or two channels are repeatable',
  },
  {
    id: 'series-a',
    label: 'Series A',
    channels: { 'google-ads': 1, 'linkedin-ads': 2, events: 2, pr: 2, partnerships: 1, 'product-hunt': -1, reddit: -1 },
    plan: {
      w1: ['Map the full funnel with conversion rates at each step and agree on one shared definition of a qualified lead with sales.'],
      w3: ['Build a content engine with a fixed cadence (for example, 2 SEO pages, 1 founder post series, 1 customer story per month).'],
      w5: ['Launch a named category narrative with a PR moment, a report or a flagship piece of research tied to it.'],
      w9: ['Review channel CAC payback by month and move 20% of budget from the worst performer to the best.'],
    },
    metric: 'Marketing-sourced pipeline as a share of total pipeline',
    risk: 'Scaling spend faster than the funnel can convert. CAC climbs quietly while top-of-funnel numbers look great in board decks.',
    focus: 'scaling the channels that work and building a category narrative',
  },
  {
    id: 'series-b',
    label: 'Series B',
    channels: { 'linkedin-ads': 2, events: 3, pr: 2, partnerships: 2, 'google-ads': 1, 'product-hunt': -2, reddit: -1, tiktok: -1 },
    plan: {
      w1: ['Segment the plan by market or vertical. One generic message for every segment stops working at this stage.'],
      w3: ['Stand up an analyst and AI-search program so you show up in shortlists, comparison reports and chatbot answers.'],
      w5: ['Launch an account-based program for the top 100 target accounts with sales, ads and events coordinated.'],
      w9: ['Plan the next 12 months of brand moments (launches, reports, events) and tie each to a revenue target.'],
    },
    metric: 'CAC payback period in months',
    risk: 'Brand drift as the team grows. Ten people writing copy produce ten positionings unless you lock a messaging house and train everyone on it.',
    focus: 'efficiency, segmentation and category leadership',
  },
];

export const BUYERS: Buyer[] = [
  {
    id: 'developers',
    label: 'Developers',
    phrase: 'developers and engineering teams',
    verifies: 'GitHub, docs, Hacker News and peer recommendations',
    channels: { seo: 2, geo: 2, reddit: 2, 'x-organic': 2, youtube: 2, communities: 2, 'product-hunt': 1, 'linkedin-ads': -2, 'meta-ads': -3, tiktok: -3, influencers: -1, events: -1, whatsapp: -2 },
  },
  {
    id: 'business',
    label: 'Business teams',
    phrase: 'operations, marketing, sales and finance teams',
    verifies: 'peer reviews, LinkedIn, case studies and free trials',
    channels: { 'linkedin-organic': 2, seo: 2, email: 2, 'google-ads': 2, 'linkedin-ads': 1, podcasts: 1, tiktok: -2, communities: -1 },
  },
  {
    id: 'enterprise',
    label: 'Enterprise execs',
    phrase: 'enterprise leaders who own budget and risk',
    verifies: 'trade press, analyst notes, peer networks and security documentation',
    channels: { pr: 3, events: 3, 'linkedin-ads': 2, 'linkedin-organic': 2, podcasts: 2, partnerships: 2, 'meta-ads': -3, tiktok: -3, reddit: -2, 'product-hunt': -3, referral: -2, influencers: -2 },
  },
  {
    id: 'consumers',
    label: 'Consumers',
    phrase: 'everyday users',
    verifies: 'creator videos, app store ratings and what their friends use',
    channels: { tiktok: 3, influencers: 3, 'meta-ads': 3, referral: 3, youtube: 2, whatsapp: 2, 'linkedin-ads': -4, 'linkedin-organic': -3, events: -3, partnerships: -2 },
  },
  {
    id: 'crypto',
    label: 'Crypto-native users',
    phrase: 'crypto-native users and builders',
    verifies: 'X, Discord, Telegram, onchain data and trusted KOLs',
    channels: { 'x-organic': 3, communities: 3, influencers: 2, podcasts: 1, events: 1, 'google-ads': -3, 'meta-ads': -3, 'linkedin-ads': -3, 'linkedin-organic': -2, seo: -1 },
  },
];

export const MOTIONS: Motion[] = [
  {
    id: 'plg',
    label: 'Product-led',
    channels: { seo: 2, geo: 1, 'product-hunt': 2, referral: 3, email: 2, youtube: 1, events: -2, 'linkedin-ads': -1 },
    plan: {
      w1: ['Define the activation event (the moment a user gets value) and remove every step before it that is not legally required.'],
      w3: ['Add in-product prompts that move users from first value to a second, stickier action within 7 days.'],
      w5: ['Identify product-qualified leads (usage thresholds that predict upgrade) and send them a personal founder email.'],
      w9: ['Run 2 pricing or packaging experiments on the upgrade page and measure free-to-paid conversion by cohort.'],
    },
    metric: 'Signup to activation rate',
    risk: 'Free users who never activate. Traffic will rise while revenue stays flat unless onboarding is treated as a marketing channel.',
    angle: 'Let the product make the first impression: no demo call required.',
  },
  {
    id: 'founder-led',
    label: 'Founder-led sales',
    channels: { 'linkedin-organic': 3, 'x-organic': 2, podcasts: 2, events: 1, pr: 1, email: 1, 'meta-ads': -2, tiktok: -1 },
    plan: {
      w1: ['Build a list of 100 dream accounts and the 1 to 2 people in each who feel the problem most.'],
      w3: ['Founder sends 20 personal, research-backed messages a week and logs every objection word for word.'],
      w5: ['Turn the 5 most common objections into content: a post, a FAQ answer, and a slide each.'],
      w9: ['Document the sales script that closed the first deals so the first sales hire can repeat it.'],
    },
    metric: 'Meetings booked per week from founder outreach and content',
    risk: 'Everything depends on the founder’s calendar. If fundraising or hiring eats their time, pipeline drops to zero within a month.',
    angle: 'Sell the founder’s point of view first, then the product.',
  },
  {
    id: 'sales-led',
    label: 'Sales-led',
    channels: { 'linkedin-ads': 3, events: 3, email: 2, pr: 1, partnerships: 1, 'google-ads': 1, 'product-hunt': -2, tiktok: -2, reddit: -1 },
    plan: {
      w1: ['Agree with sales on an ideal customer profile, lead scoring rules and a service level for follow-up (for example, under 24 hours).'],
      w3: ['Build a sales kit: one-pager, deck, security brief, ROI sheet and 3 short proof stories.'],
      w5: ['Run an account-based campaign on the top 50 accounts combining LinkedIn ads, direct mail or gifting, and SDR outreach.'],
      w9: ['Review win and loss reasons for every closed deal and feed them into messaging and content.'],
    },
    metric: 'Sales-accepted opportunities per month',
    risk: 'Marketing and sales disagree on what a good lead is. Without a shared definition, marketing optimises for volume and sales ignores the leads.',
    angle: 'Make the buyer’s internal business case easy to write.',
  },
  {
    id: 'community',
    label: 'Community-led',
    channels: { communities: 4, 'x-organic': 2, reddit: 2, events: 1, referral: 2, youtube: 1, 'google-ads': -2, 'linkedin-ads': -2 },
    plan: {
      w1: ['Choose one home for the community (Discord, Slack, Telegram or a forum) and write 3 rules and a clear reason to join.'],
      w3: ['Recruit the first 50 members by hand and give the top 10 a role, early access or recognition.'],
      w5: ['Run a recurring ritual (weekly office hours, demo day, challenge) and publish highlights outside the community.'],
      w9: ['Launch a contributor or ambassador program with clear, non-cash rewards tied to helping other members.'],
    },
    metric: 'Weekly active community members who post or help others',
    risk: 'A community that becomes a support queue or a ghost town. Without a ritual and a host, engagement collapses within weeks.',
    angle: 'Give users a reason to talk to each other, not only to you.',
  },
  {
    id: 'partner',
    label: 'Partner-led',
    channels: { partnerships: 5, events: 1, email: 1, pr: 1, podcasts: 1, 'meta-ads': -2, tiktok: -2, 'google-ads': -1 },
    plan: {
      w1: ['List 20 potential partners whose customers are your buyers, and rank them by audience fit and ease of integration.'],
      w3: ['Sign 2 partners with a written co-marketing plan: joint announcement, marketplace listing, shared webinar.'],
      w5: ['Train partner sales or customer success teams with a 20-minute enablement session and a one-page cheat sheet.'],
      w9: ['Measure partner-sourced pipeline per partner and double down on the top one. Most partnerships produce nothing; one or two produce most of it.'],
    },
    metric: 'Partner-sourced pipeline or signups per month',
    risk: 'Partnerships that look good in a press release and produce no leads. Every partner needs a named owner and a quarterly number.',
    angle: 'Show up where your buyer already works, inside tools they trust.',
  },
];

export const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c])) as Record<CategoryId, Category>;
export const STAGE_BY_ID = Object.fromEntries(STAGES.map((s) => [s.id, s])) as Record<StageId, Stage>;
export const BUYER_BY_ID = Object.fromEntries(BUYERS.map((b) => [b.id, b])) as Record<BuyerId, Buyer>;
export const MOTION_BY_ID = Object.fromEntries(MOTIONS.map((m) => [m.id, m])) as Record<MotionId, Motion>;

/** Mismatch warnings between buyer and motion. Shown as a risk when relevant. */
export const MISMATCHES: { buyer: BuyerId; motion: MotionId; risk: string }[] = [
  { buyer: 'consumers', motion: 'sales-led', risk: 'A sales-led motion rarely pays back on consumer price points. Unless each customer is worth thousands, move to product-led or community-led acquisition.' },
  { buyer: 'consumers', motion: 'founder-led', risk: 'Founder-led selling does not scale to consumers. Use the founder for content and community instead of one-to-one sales.' },
  { buyer: 'enterprise', motion: 'plg', risk: 'Enterprise execs rarely self-serve. Keep the product-led entry point for end users, but plan a sales assist for security review and procurement.' },
  { buyer: 'enterprise', motion: 'community', risk: 'Enterprise buyers do not join vendor communities to buy. Use community for practitioners and a separate executive program for budget holders.' },
  { buyer: 'crypto', motion: 'sales-led', risk: 'Crypto-native users distrust outbound sales. Reserve sales for exchanges, funds and institutional partners, and lead with community for everyone else.' },
  { buyer: 'developers', motion: 'sales-led', risk: 'Developers avoid "talk to sales" walls. Keep a free tier or sandbox open, and let sales engage once usage shows intent.' },
];
