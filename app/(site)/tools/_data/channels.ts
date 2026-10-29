/**
 * The 20 marketing channels shared by every tool on /tools.
 * Cost-per-lead ranges are rough planning estimates in USD, not benchmarks.
 * The budget calculator lets users overwrite them.
 */

export type ChannelId =
  | 'seo'
  | 'geo'
  | 'google-ads'
  | 'meta-ads'
  | 'linkedin-ads'
  | 'reddit'
  | 'x-organic'
  | 'linkedin-organic'
  | 'youtube'
  | 'tiktok'
  | 'email'
  | 'whatsapp'
  | 'communities'
  | 'product-hunt'
  | 'pr'
  | 'podcasts'
  | 'influencers'
  | 'partnerships'
  | 'events'
  | 'referral';

export type Goal = 'awareness' | 'pipeline' | 'signups' | 'token';

export interface Channel {
  id: ChannelId;
  name: string;
  /** Paid media channels get penalised at very small budgets / early stages. */
  paid: boolean;
  /** One concrete first move for this channel. */
  play: string;
  /** Planning estimate: cost per lead in USD, low and high end. */
  cplLow: number;
  cplHigh: number;
  /** 0 to 5, how well the channel serves each goal. */
  goalWeights: Record<Goal, number>;
}

export const CHANNELS: Channel[] = [
  {
    id: 'seo',
    name: 'SEO',
    paid: false,
    play: 'Publish 8 to 12 pages that answer bottom-of-funnel queries (comparisons, alternatives, pricing, integrations) before writing any thought leadership.',
    cplLow: 40,
    cplHigh: 150,
    goalWeights: { awareness: 2, pipeline: 4, signups: 4, token: 1 },
  },
  {
    id: 'geo',
    name: 'GEO / AI search',
    paid: false,
    play: 'Run your top 30 buyer questions through ChatGPT, Perplexity, Gemini and Claude, log who gets cited, and earn mentions on those exact source pages.',
    cplLow: 50,
    cplHigh: 180,
    goalWeights: { awareness: 3, pipeline: 4, signups: 3, token: 2 },
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    paid: true,
    play: 'Start with exact-match competitor and problem keywords only, one landing page per ad group, and a hard daily cap until cost per qualified lead is known.',
    cplLow: 80,
    cplHigh: 250,
    goalWeights: { awareness: 1, pipeline: 4, signups: 4, token: 0 },
  },
  {
    id: 'meta-ads',
    name: 'Meta Ads',
    paid: true,
    play: 'Test 6 short video hooks against one broad audience, kill anything above 2x target cost per signup after 3 days, and scale the winner slowly.',
    cplLow: 20,
    cplHigh: 90,
    goalWeights: { awareness: 3, pipeline: 1, signups: 5, token: 1 },
  },
  {
    id: 'linkedin-ads',
    name: 'LinkedIn Ads',
    paid: true,
    play: 'Run thought leader ads from the founder profile to a named account list of 300 to 1,000 companies, then retarget engagers with a lead form.',
    cplLow: 120,
    cplHigh: 400,
    goalWeights: { awareness: 2, pipeline: 5, signups: 1, token: 0 },
  },
  {
    id: 'reddit',
    name: 'Reddit',
    paid: false,
    play: 'Pick 5 subreddits where your buyer already complains about the problem, answer threads from a real founder account for 4 weeks before ever posting a link.',
    cplLow: 30,
    cplHigh: 120,
    goalWeights: { awareness: 3, pipeline: 2, signups: 4, token: 2 },
  },
  {
    id: 'x-organic',
    name: 'X / Twitter organic',
    paid: false,
    play: 'Post daily from the founder account: one build-in-public update, one sharp opinion on your category, and replies to 10 larger accounts in your niche.',
    cplLow: 25,
    cplHigh: 100,
    goalWeights: { awareness: 4, pipeline: 2, signups: 3, token: 5 },
  },
  {
    id: 'linkedin-organic',
    name: 'LinkedIn organic',
    paid: false,
    play: 'Founder posts 3 times a week: one customer problem story, one data point from your product, one contrarian take. Comment on buyers’ posts daily.',
    cplLow: 30,
    cplHigh: 120,
    goalWeights: { awareness: 3, pipeline: 4, signups: 2, token: 1 },
  },
  {
    id: 'youtube',
    name: 'YouTube',
    paid: false,
    play: 'Record 6 screen-share tutorials that solve one job each, titled with the exact search phrase, and link them from docs and onboarding emails.',
    cplLow: 50,
    cplHigh: 200,
    goalWeights: { awareness: 4, pipeline: 2, signups: 3, token: 2 },
  },
  {
    id: 'tiktok',
    name: 'TikTok / Shorts',
    paid: false,
    play: 'Shoot 20 vertical clips in one session showing a before and after with your product, post one a day across TikTok, Reels and Shorts, and double down on the top 3.',
    cplLow: 15,
    cplHigh: 80,
    goalWeights: { awareness: 5, pipeline: 0, signups: 4, token: 2 },
  },
  {
    id: 'email',
    name: 'Email',
    paid: false,
    play: 'Write a 5-email onboarding sequence tied to the activation event, plus a monthly changelog email to every lead who has not converted.',
    cplLow: 10,
    cplHigh: 50,
    goalWeights: { awareness: 1, pipeline: 4, signups: 3, token: 3 },
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    paid: false,
    play: 'Use a WhatsApp Business channel or broadcast list for launch alerts and high-intent follow-ups in markets where buyers live there (India, MENA, LATAM, SEA).',
    cplLow: 10,
    cplHigh: 60,
    goalWeights: { awareness: 2, pipeline: 3, signups: 3, token: 3 },
  },
  {
    id: 'communities',
    name: 'Communities (Discord, Slack, Telegram)',
    paid: false,
    play: 'Join or host one community where your buyers already gather, run a weekly office hour, and route every product question to a public answer.',
    cplLow: 20,
    cplHigh: 90,
    goalWeights: { awareness: 3, pipeline: 2, signups: 4, token: 5 },
  },
  {
    id: 'product-hunt',
    name: 'Product Hunt / launch sites',
    paid: false,
    play: 'Plan one launch day across Product Hunt, Hacker News (Show HN), BetaList and relevant directories, with a hunter lined up and 50 supporters briefed in advance.',
    cplLow: 15,
    cplHigh: 70,
    goalWeights: { awareness: 4, pipeline: 1, signups: 5, token: 2 },
  },
  {
    id: 'pr',
    name: 'PR / earned media',
    paid: false,
    play: 'Build a list of 25 reporters who covered your category in the last 90 days, pitch one exclusive tied to a real milestone, and turn the coverage into sales and investor assets.',
    cplLow: 80,
    cplHigh: 300,
    goalWeights: { awareness: 5, pipeline: 3, signups: 2, token: 4 },
  },
  {
    id: 'podcasts',
    name: 'Podcasts',
    paid: false,
    play: 'Pitch the founder to 15 niche podcasts your buyers listen to, with three specific episode angles each, and clip every appearance into short video.',
    cplLow: 60,
    cplHigh: 250,
    goalWeights: { awareness: 4, pipeline: 3, signups: 2, token: 3 },
  },
  {
    id: 'influencers',
    name: 'Influencers / KOLs',
    paid: true,
    play: 'Shortlist 20 creators by audience overlap rather than follower count, start with 3 paid tests with unique tracking links, and keep only the ones who drive activations.',
    cplLow: 30,
    cplHigh: 150,
    goalWeights: { awareness: 5, pipeline: 1, signups: 4, token: 5 },
  },
  {
    id: 'partnerships',
    name: 'Partnerships & integrations',
    paid: false,
    play: 'Ship one integration with a tool your buyers already pay for, get listed in their marketplace, and co-market the launch to both user bases.',
    cplLow: 50,
    cplHigh: 200,
    goalWeights: { awareness: 2, pipeline: 5, signups: 3, token: 4 },
  },
  {
    id: 'events',
    name: 'Events / conferences',
    paid: true,
    play: 'Skip the booth. Host a 30-person dinner or side event during one conference your buyers already attend, and book meetings before you fly.',
    cplLow: 150,
    cplHigh: 500,
    goalWeights: { awareness: 3, pipeline: 5, signups: 1, token: 4 },
  },
  {
    id: 'referral',
    name: 'Referral programs',
    paid: false,
    play: 'Add a two-sided referral reward at the moment users hit value (not at signup), and track invites sent per active user weekly.',
    cplLow: 20,
    cplHigh: 80,
    goalWeights: { awareness: 1, pipeline: 3, signups: 5, token: 3 },
  },
];

export const CHANNEL_BY_ID: Record<ChannelId, Channel> = CHANNELS.reduce(
  (acc, c) => {
    acc[c.id] = c;
    return acc;
  },
  {} as Record<ChannelId, Channel>,
);
