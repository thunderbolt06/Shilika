export type RegionKey = 'us' | 'eu' | 'cn' | 'kr' | 'jp' | 'sea' | 'in' | 'me';

/** 2 = native, in-house media relationships. 1 = partial, partner or wire-led. 0 = not evident. */
export type Coverage = 0 | 1 | 2;

export type RowKey =
  | 'whoPitches'
  | 'seniority'
  | 'network'
  | 'regions'
  | 'asia'
  | 'pricing'
  | 'feeGoesTo'
  | 'contract'
  | 'strategy'
  | 'speed'
  | 'scope';

export interface Agency {
  slug: string;
  name: string;
  short: string;
  category: 'web3' | 'ai';
  rank: number;
  url: string;
  hq: string;
  founded: string;
  team: string;
  /** Short answer to "who pitches the journalist", used in the at-a-glance cards. */
  whoShort: string;
  /** One line used on the hub list. */
  bestFor: string;
  /** One line used on the hub list. */
  watchOut: string;
  /** Page H1 hook, finishes "Shilika Jain vs <name>: ..." */
  hook: string;
  intro: string;
  verdict: string;
  services: string[];
  clients: string[];
  strengths: string[];
  limits: string[];
  pricing: { label: string; low: number; high: number; note: string };
  coverage: Record<RegionKey, Coverage>;
  rows: Record<RowKey, string>;
  /** Three reasons, tailored to this agency, that a founder would pick Shilika instead. */
  edges: { title: string; body: string }[];
  whenAgency: string[];
  whenShilika: string[];
  faqs: { q: string; a: string }[];
  sources: { label: string; url: string }[];
}
