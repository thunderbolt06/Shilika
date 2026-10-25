import type { Coverage, RegionKey, RowKey } from './types';

export const LAST_VERIFIED = 'October 2026';
export const LAST_VERIFIED_ISO = '2026-10-15';

export const REGIONS: { key: RegionKey; label: string; cluster: string }[] = [
  { key: 'us', label: 'United States', cluster: 'West' },
  { key: 'eu', label: 'UK & Europe', cluster: 'West' },
  { key: 'cn', label: 'China & Hong Kong', cluster: 'North Asia' },
  { key: 'kr', label: 'South Korea', cluster: 'North Asia' },
  { key: 'jp', label: 'Japan', cluster: 'North Asia' },
  { key: 'sea', label: 'Southeast Asia', cluster: 'South & Southeast Asia' },
  { key: 'in', label: 'India', cluster: 'South & Southeast Asia' },
  { key: 'me', label: 'Middle East', cluster: 'Middle East' },
];

export const SHILIKA_COVERAGE: Record<RegionKey, Coverage> = {
  us: 2,
  eu: 1,
  cn: 2,
  kr: 2,
  jp: 2,
  sea: 2,
  in: 2,
  me: 2,
};

/** Fractional retainer range used across the site (see ToolCta, /pages). */
export const SHILIKA_PRICING = { low: 3000, high: 7000, sprintLow: 15000, sprintHigh: 40000 };

export const ROW_GROUPS: { id: string; label: string; rows: { key: RowKey; label: string }[] }[] = [
  {
    id: 'team',
    label: 'Who does the work',
    rows: [
      { key: 'whoPitches', label: 'Who pitches the journalist' },
      { key: 'seniority', label: 'Senior time on your account' },
      { key: 'scope', label: 'What you get' },
    ],
  },
  {
    id: 'reach',
    label: 'Media reach',
    rows: [
      { key: 'network', label: 'Journalist network' },
      { key: 'regions', label: 'Where they are strongest' },
      { key: 'asia', label: 'China, Korea, Japan, Middle East' },
    ],
  },
  {
    id: 'cost',
    label: 'Cost & contract',
    rows: [
      { key: 'pricing', label: 'Typical monthly cost' },
      { key: 'feeGoesTo', label: 'Where the fee goes' },
      { key: 'contract', label: 'Contract' },
    ],
  },
  {
    id: 'strategy',
    label: 'Strategy & speed',
    rows: [
      { key: 'strategy', label: 'Cross-market strategy' },
      { key: 'speed', label: 'Speed to first pitch' },
    ],
  },
];

export const SHILIKA_ROWS: Record<RowKey, string> = {
  whoPitches:
    'Shilika, personally. The person on the intro call is the person writing the pitch and following up with the editor.',
  seniority:
    '100%. Six years running Web3 and AI PR, including building CoinMarketCap’s APAC PR function and leading PR at Myosin.',
  scope:
    'Narrative, tier-1 pitching, embargo strategy, founder profiling, op-eds, KOL waves and APAC localisation from one operator.',
  network:
    '400+ working journalists across the US, China, Korea, Japan, the Middle East and Southeast Asia, plus 200+ vetted Web3 KOLs.',
  regions:
    'Global by design: US crypto and tech press plus native-language desks across North Asia, Southeast Asia, India and the Gulf.',
  asia:
    'Direct, in-language relationships: BloomingBit and TokenPost (Korea), CoinPost and CryptoTimes (Japan), ChainCatcher (China), Gulf business press.',
  pricing: '$3K–$7K a month retainer, or a $15K–$40K launch sprint for a TGE, mainnet or raise.',
  feeGoesTo: 'Senior strategy and execution. No account-management layer, no agency markup on junior hours.',
  contract: 'Bounded engagements tied to named outlets and dates. Month-to-month after the first cycle.',
  strategy:
    'One narrative, sequenced across every market from a single plan, so the Korean story and the CoinDesk story reinforce each other.',
  speed: 'Pitching inside the first week. No onboarding team, no internal hand-offs.',
};

/** The four core reasons, used on the hub and as the default edge cards. */
export const CORE_REASONS = [
  {
    title: 'A senior operator, not a junior account team',
    body: 'Agencies win business with partners and principals, then staff day-to-day work with account executives and coordinators. With Shilika, the person who pitched you is the person pitching the journalist.',
  },
  {
    title: 'One network across six regions',
    body: '400+ journalists across the US, China, Korea, Japan, the Middle East and Southeast Asia. Most agencies are strong in one or two of those, so founders end up hiring a second agency and refereeing between them.',
  },
  {
    title: 'The person agencies call for hard markets',
    body: 'When agencies lack access to Korean, Japanese, Chinese or Gulf media, they often subcontract that work. Shilika is regularly that subcontractor. Hiring her directly removes a layer of margin and a layer of telephone.',
  },
  {
    title: 'Top-tier work without the stacked fee',
    body: 'Agency retainers of $10K–$15K+ a month pay for account managers, consultants, writers and overhead billed separately. Shilika runs the same scope for $3K–$7K a month.',
  },
];

export const SHILIKA_PROOF = [
  { value: '50+', label: 'Web3 & AI protocols placed' },
  { value: '400+', label: 'journalists across 6 regions' },
  { value: '11', label: 'tier-1 placements in 24h (RARI Chain)' },
  { value: '6 yrs', label: 'senior Web3 & AI PR' },
];

export const CALENDLY = 'https://calendly.com/shilikajain/30min/';
