// Copy for every baked graphic. All claims come from the live site (homepage stats,
// page titles and H1s, the About "recently on stage" list). House rules from
// docs/humanization-guide.md apply: no em dashes, no arrows, no AI filler.
//
// Photo ids refer to lib/media/catalog.json. `pos` is a CSS object-position over the
// upright photo, so `50% 40%` keeps the point 40% down the image in the same place
// in the frame. `scale` zooms in around that point.

export const FORMATS = {
  og: {
    W: 1200,
    H: 630,
    vars: '--pad:52px;--h1:58px;--sub:21px;--eyebrow:14px;--pill:14px;--url:14px;--mark:54px;--gap:20px;',
  },
  poster: {
    W: 1080,
    H: 1350,
    vars: '--pad:64px;--h1:96px;--sub:30px;--eyebrow:18px;--pill:18px;--url:17px;--mark:76px;--gap:26px;--num:300px;--label:70px;--copyW:100%;',
  },
  story: {
    W: 1080,
    H: 1920,
    vars: '--pad:76px;--h1:118px;--sub:34px;--eyebrow:20px;--pill:20px;--url:19px;--mark:88px;--gap:30px;--copyW:100%;',
  },
  linkedin: {
    W: 1584,
    H: 396,
    vars: '--pad:36px 40px 36px 360px;--h1:46px;--sub:19px;--eyebrow:13px;--pill:13px;--url:13px;--gap:14px;--panelJ:center;',
  },
  x: {
    W: 1500,
    H: 500,
    vars: '--pad:40px 44px 40px 330px;--h1:52px;--sub:21px;--eyebrow:14px;--pill:14px;--url:14px;--gap:16px;--panelJ:center;',
  },
  youtube: {
    W: 2560,
    H: 1440,
    vars: '--pad:420px 60px 420px 507px;--h1:104px;--sub:38px;--eyebrow:26px;--pill:25px;--url:24px;--gap:30px;--panelJ:center;',
  },
  newsletter: {
    W: 1200,
    H: 400,
    vars: '--pad:36px 36px 36px 52px;--h1:48px;--sub:20px;--eyebrow:13px;--pill:13px;--url:13px;--gap:14px;--panelJ:center;',
  },
};


// -- Photo choices ------------------------------------------------------------
// One row per graphic: which photo, where to look (`pos` = CSS object-position over the
// upright photo), zoom (`scale`, around `origin` which defaults to `pos`), and layout flips.
// Region rule: Korea, India, Japan and MENA graphics only use photos whose catalog place
// is "event" or "neutral" (press-lounge, stablecoin-summit, stage-a/b, library, lounge).
const PICK = {
  // share cards
  'og-home':            { photo: 'sg-marina-a', pos: '46% 29%', scale: 1.1 },
  'og-about':           { photo: 'lounge', pos: '62% 22%', scale: 1.15 },
  'og-services':        { photo: 'sg-bridge-b', pos: '31% 22%', scale: 1.1 },
  'og-work':            { photo: 'press-lounge', pos: '50% 60%', scale: 1 },
  'og-web3':            { photo: 'sg-marina-c', pos: '45% 100%', scale: 1.1 },
  'og-ai':              { photo: 'stage-a', pos: '41% 0%', scale: 1 },
  'og-cyber':           { photo: 'library', pos: '50% 67%', scale: 1.1 },
  'og-token-launch':    { photo: 'token2049-hall', pos: '50% 40%', scale: 1 },
  'og-kol':             { photo: 'sg-river-a', pos: '58% 15%', scale: 1.2 },
  'og-founder':         { photo: 'sg-marina-c', pos: '45% 100%', scale: 1.15 },
  'og-content':         { photo: 'sg-river-b', pos: '51% 37%', scale: 1.2 },
  'og-apac':            { photo: 'sg-marina-d', pos: '43% 100%', scale: 1 },
  'og-singapore':       { photo: 'sg-marina-b', pos: '45% 100%', scale: 1 },
  'og-korea':           { photo: 'stage-b', pos: '41% 0%', scale: 1 },
  'og-india':           { photo: 'stablecoin-summit', pos: '56% 50%', origin: '56% 44%', scale: 1.7 },
  'og-japan':           { photo: 'library', pos: '50% 67%', scale: 1.1, flip: true },
  'og-mena':            { photo: 'press-lounge', pos: '50% 60%', scale: 1, flip: true },
  'og-playbook':        { photo: 'sg-bridge-b', pos: '31% 22%', scale: 1.2, flip: true },
  'og-compare':         { photo: 'sg-marina-c', pos: '45% 100%', scale: 1.15, flip: true },
  'og-glossary':        { photo: 'lounge', pos: '62% 22%', scale: 1.15, flip: true },
  'og-tools':           { photo: 'sg-marina-a', pos: '46% 29%', scale: 1.2 },
  'og-press':           { photo: 'press-lounge', pos: '50% 60%', scale: 1, flip: true },
  'og-speaker':         { photo: 'stage-a', pos: '41% 0%', scale: 1.1 },
  'og-testimonials':    { photo: 'sg-river-a', pos: '58% 15%', scale: 1.1, flip: true },
  'og-contact':         { photo: 'lounge', pos: '62% 22%', scale: 1.1 },
  'og-faq':             { photo: 'library', pos: '50% 67%', scale: 1.2, flip: true },
  'og-blog':            { photo: 'depin-day-hk', pos: '47% 55%', scale: 1.1 },
  'og-resources':       { photo: 'stablecoin-summit', pos: '56% 50%', origin: '56% 44%', scale: 1.7, flip: true },
  'og-work-rari-chain': { photo: 'sg-marina-d', pos: '43% 100%', scale: 1.05 },
  'og-work-mantra-chain': { photo: 'sg-river-b', pos: '51% 37%', scale: 1.1, flip: true },
  'og-work-gaia-ai':    { photo: 'sg-marina-b', pos: '45% 100%', scale: 1.05 },
  'og-work-web3auth':   { photo: 'sg-bridge-b', pos: '31% 22%', scale: 1.2, flip: true },
  'og-work-fluence':    { photo: 'depin-day-hk', pos: '47% 55%', scale: 1.2 },
  'og-work-bullieverse': { photo: 'lounge', pos: '62% 22%', scale: 1.15, flip: true },
  // stat posters (photo on top 58%)
  'poster-stat-placements': { photo: 'sg-marina-b', pos: '45% 74%' },
  'poster-stat-tier1':      { photo: 'sg-river-a', pos: '55% 55%' },
  'poster-stat-impressions': { photo: 'sg-marina-d', pos: '43% 74%' },
  'poster-stat-launches':   { photo: 'depin-day-hk', pos: '47% 61%' },
  'poster-stat-countries':  { photo: 'stage-a', pos: '41% 14%' },
  // posters
  'poster-web3-pr':         { photo: 'sg-marina-a', pos: '46% 50%' },
  'poster-teardown':        { photo: 'library', pos: '50% 53%' },
  'poster-apac':            { photo: 'sg-marina-a', pos: '46% 50%', align: 'top', scrim: 'top' },
  'poster-singapore':       { photo: 'sg-bridge-b', pos: '31% 50%', align: 'top', scrim: 'top' },
  'poster-korea':           { photo: 'stage-a', pos: '41% 0%' },
  'poster-india':           { photo: 'press-lounge', pos: '44% 100%', origin: '80% 100%', scale: 1.25 },
  'poster-japan':           { photo: 'lounge', pos: '62% 52%' },
  'poster-mena':            { photo: 'stablecoin-summit', pos: '56% 40%', origin: '56% 44%', scale: 1.7 },
  'poster-speaker':         { photo: 'stage-b', pos: '41% 0%' },
  'poster-founder-profiling': { photo: 'sg-marina-b', pos: '45% 50%', align: 'top', scrim: 'top' },
  'poster-token-launch':    { photo: 'token2049-hall', pos: '50% 40%', align: 'top', scrim: 'top' },
  'poster-kol':             { photo: 'sg-river-b', pos: '51% 50%', align: 'top', scrim: 'top' },
  'poster-ai-pr':           { photo: 'sg-marina-c', pos: '45% 50%', align: 'top', scrim: 'top' },
  'poster-cybersecurity':   { photo: 'sg-marina-d', pos: '43% 50%', align: 'top', scrim: 'top' },
  'poster-retainer':        { photo: 'sg-river-a', pos: '55% 50%', align: 'top', scrim: 'top' },
  // stories (9:16)
  'story-teardown':         { photo: 'lounge', pos: '62% 50%', origin: '62% 100%', scale: 1.15 },
  'story-web3-pr':          { photo: 'stage-b', pos: '41% 0%' },
  'story-apac':             { photo: 'sg-bridge-b', pos: '31% 50%', origin: '31% 100%', scale: 1.15 },
  // social covers (square tile on the right)
  'cover-linkedin':         { photo: 'sg-marina-a', pos: '46% 47%', scale: 1.5, photoW: '25%' },
  'cover-x':                { photo: 'sg-river-b', pos: '51% 50%', scale: 1.4, photoW: '33.3%' },
  'cover-youtube':          { photo: 'stage-a', pos: '41% 30%', scale: 1.1, photoW: '34%' },
  'cover-newsletter':       { photo: 'lounge', pos: '62% 40%', scale: 1.5, photoW: '33.3%' },
};

const CTA = 'Book a 30-min call';
const URL = 'shilikajain.com';

// -- Share cards, 1200x630 --------------------------------------------------
const og = (id, rest) => ({
  id: `og-${id}`,
  out: `og/${id}`,
  group: 'og',
  format: 'og',
  template: 'split',
  jpgQuality: 85,
  ...PICK[`og-${id}`],
  ...rest,
});

const OG = [
  og('home', {
    eyebrow: 'Shilika Jain',
    headline: 'Tier-1 PR for <em>Web3 &amp; AI</em> founders.',
    sub: 'Coverage in Forbes, CoinDesk, Economic Times and Yahoo Finance.',
    cta: CTA, url: URL,
  }),
  og('about', {
    eyebrow: 'About',
    headline: 'The operator behind the <em>Tier-1</em> placement.',
    sub: 'Six years of PR for Web3, crypto and AI startups.',
    cta: CTA, url: URL,
  }),
  og('services', {
    eyebrow: 'Services',
    headline: 'Web3 &amp; AI PR, <em>founder profiling</em>, KOL marketing.',
    sub: 'Fractional PR from a senior operator.',
    cta: CTA, url: URL,
  }),
  og('work', {
    eyebrow: 'Selected work',
    headline: 'Tier-1 Web3 &amp; AI PR <em>case studies</em>.',
    sub: 'RARI Chain, Gaia AI, MANTRA, Web3Auth, Fluence and Bullieverse.',
    cta: CTA, url: URL,
  }),
  og('web3', {
    eyebrow: 'Web3 PR',
    headline: 'Web3 PR that lands <em>Tier-1</em> headlines.',
    sub: 'Forbes, CoinDesk, Cointelegraph, Decrypt and The Block.',
    cta: CTA, url: URL,
  }),
  og('ai', {
    eyebrow: 'AI PR',
    headline: 'AI PR with <em>analyst-grade</em> credibility.',
    sub: 'Tier-1 AI coverage, plus the AI-search work that gets you cited.',
    cta: CTA, url: URL,
  }),
  og('cyber', {
    eyebrow: 'Cybersecurity PR',
    headline: 'Cybersecurity PR from a <em>senior operator</em>.',
    sub: 'Fractional, hands-on, built for security founders.',
    cta: CTA, url: URL,
  }),
  og('token-launch', {
    eyebrow: 'Token launch PR',
    headline: 'Token launch PR: <em>TGE</em> comms, exchange and KOL waves.',
    cta: CTA, url: URL,
  }),
  og('kol', {
    eyebrow: 'KOL marketing',
    headline: 'Web3 KOL marketing with <em>200+</em> vetted creators.',
    sub: 'FTC-safe campaigns.',
    cta: CTA, url: URL,
  }),
  og('founder', {
    eyebrow: 'Founder profiling',
    headline: 'Founder profiling: op-eds, podcasts, <em>category voice</em>.',
    cta: CTA, url: URL,
  }),
  og('content', {
    eyebrow: 'Content writing',
    headline: 'Content writing for founders: <em>op-eds</em>, whitepapers.',
    sub: 'For Web3 and AI teams.',
    cta: CTA, url: URL,
  }),
  og('apac', {
    eyebrow: 'APAC PR',
    headline: 'APAC PR that is not a <em>translated</em> press release.',
    sub: 'Korea, Japan, India, Singapore and MENA.',
    cta: CTA, url: URL,
  }),
  og('singapore', {
    eyebrow: 'Singapore',
    headline: 'Singapore PR: the <em>MAS frame</em> is paragraph one.',
    sub: 'BT, DealStreetAsia and Token2049.',
    cta: CTA, url: URL,
  }),
  og('korea', {
    eyebrow: 'Korea',
    headline: 'Korea PR: the <em>FSC frame</em> is paragraph one.',
    sub: 'BloomingBit, TokenPost and KBW Seoul.',
    cta: CTA, url: URL,
  }),
  og('india', {
    eyebrow: 'India',
    headline: 'India PR: own the <em>home market</em> first.',
    sub: 'Inc42, Economic Times and Forbes India.',
    cta: CTA, url: URL,
  }),
  og('japan', {
    eyebrow: 'Japan',
    headline: 'Japan PR: the <em>FSA frame</em> is paragraph one.',
    sub: 'CoinPost, Nikkei and WebX Tokyo.',
    cta: CTA, url: URL,
  }),
  og('mena', {
    eyebrow: 'Dubai &amp; MENA',
    headline: 'Dubai and MENA PR: <em>VARA</em> is paragraph one.',
    sub: 'VARA, ADGM and RAK DAO.',
    cta: CTA, url: URL,
  }),
  og('playbook', {
    eyebrow: 'Playbook',
    headline: 'The PR playbook for <em>Web3 &amp; AI</em> founders.',
    sub: 'Guides on Tier-1 pitching, launch PR, KOLs and AI-search citations.',
    cta: CTA, url: URL,
  }),
  og('compare', {
    eyebrow: 'Compare',
    headline: 'Which PR agency to hire for <em>crypto and AI</em>.',
    sub: 'Side-by-side comparisons with the trade-offs spelled out.',
    cta: CTA, url: URL,
  }),
  og('glossary', {
    eyebrow: 'Glossary',
    headline: 'The Web3 &amp; AI <em>PR glossary</em>.',
    sub: 'Plain-English definitions for founders and comms leads.',
    cta: CTA, url: URL,
  }),
  og('tools', {
    eyebrow: 'Free tools',
    headline: 'Free tools for <em>founders</em>: GTM planner, budget calculator.',
    sub: 'Plus a marketing checklist.',
    cta: CTA, url: URL,
  }),
  og('press', {
    eyebrow: 'Press &amp; coverage',
    headline: 'Where the stories <em>land</em>.',
    sub: 'Forbes, CoinDesk, Cointelegraph, Decrypt, The Block and more.',
    cta: CTA, url: URL,
  }),
  og('speaker', {
    eyebrow: 'Speaker',
    headline: 'Keynotes on Web3, AI &amp; <em>cybersecurity PR</em>.',
    sub: 'Binary Summit Bangkok, India Blockchain Week 2024, Web3 Conf Goa.',
    cta: 'Book a keynote', url: URL,
  }),
  og('testimonials', {
    eyebrow: 'Testimonials',
    headline: 'What <em>clients</em> say about Shilika Jain.',
    cta: CTA, url: URL,
  }),
  og('contact', {
    eyebrow: 'Contact',
    headline: 'Book a 30-min Web3 &amp; AI PR <em>teardown</em>.',
    sub: 'I come prepped with a teardown of your current press footprint.',
    cta: CTA, url: URL,
  }),
  og('faq', {
    eyebrow: 'FAQ',
    headline: 'Fractional Web3 &amp; AI PR: <em>scope</em>, cost, regions.',
    cta: CTA, url: URL,
  }),
  og('blog', {
    eyebrow: 'Field notes',
    headline: 'Field notes on <em>Web3 &amp; AI PR</em>.',
    cta: CTA, url: URL,
  }),
  og('resources', {
    eyebrow: 'Resources',
    headline: 'Free PR <em>templates</em>, checklists and playbooks.',
    sub: 'Press kit, media list and journalist pitch templates.',
    cta: 'Browse resources', url: URL,
  }),
  og('work-rari-chain', {
    eyebrow: 'Case study: RARI Chain',
    headline: '<em>11 Tier-1</em> placements in 24 hours.',
    sub: 'RARI Chain mainnet launch.',
    cta: CTA, url: URL,
  }),
  og('work-mantra-chain', {
    eyebrow: 'Case study: MANTRA Chain',
    headline: '$11M RWA raise with a <em>Middle East</em> angle.',
    cta: CTA, url: URL,
  }),
  og('work-gaia-ai', {
    eyebrow: 'Case study: Gaia AI',
    headline: 'How we placed the <em>Stripe for AI agents</em>.',
    cta: CTA, url: URL,
  }),
  og('work-web3auth', {
    eyebrow: 'Case study: Web3Auth',
    headline: 'Google Cloud meets <em>Web3 wallets</em>.',
    cta: CTA, url: URL,
  }),
  og('work-fluence', {
    eyebrow: 'Case study: Fluence',
    headline: 'Making <em>DePIN</em> a Tier-1 beat.',
    cta: CTA, url: URL,
  }),
  og('work-bullieverse', {
    eyebrow: 'Case study: Bullieverse',
    headline: 'A <em>$4M</em> Web3 gaming raise in India.',
    cta: CTA, url: URL,
  }),
];

// -- Posters, 1080x1350 -----------------------------------------------------
const stat = (id, rest) => ({
  id: `poster-stat-${id}`,
  out: `posters/stat-${id}`,
  group: 'poster',
  format: 'poster',
  template: 'stat',
  webp: true,
  jpgQuality: 84,
  eyebrow: 'Shilika Jain',
  cta: CTA,
  url: URL,
  ...PICK[`poster-stat-${id}`],
  ...rest,
});

const poster = (id, rest) => ({
  id: `poster-${id}`,
  out: `posters/${id}`,
  group: 'poster',
  format: 'poster',
  template: 'cover',
  webp: true,
  jpgQuality: 84,
  eyebrow: 'Shilika Jain',
  scrim: 'bottom',
  align: 'bottom',
  ...PICK[`poster-${id}`],
  ...rest,
});

const POSTERS = [
  stat('placements', { num: '500<sup>+</sup>', headline: 'Media placements <em>secured</em>.' }),
  stat('tier1', { num: '150<sup>+</sup>', headline: 'Tier-1 publications <em>landed</em>.' }),
  stat('impressions', { num: '5B<sup>+</sup>', headline: 'Estimated media <em>impressions</em>.' }),
  stat('launches', { num: '50<sup>+</sup>', headline: 'Product launches <em>supported</em>.' }),
  stat('countries', { num: '25<sup>+</sup>', headline: 'Countries reached via <em>earned media</em>.' }),

  poster('web3-pr', {
    headline: 'Web3 PR &amp; AI PR that lands <em>Tier-1</em> headlines.',
    sub: 'Coverage in Forbes, CoinDesk, Economic Times and Yahoo Finance.',
    cta: CTA, url: URL,
  }),
  poster('teardown', {
    headline: 'Book a 30-min PR <em>teardown</em>.',
    sub: 'I come prepped with a teardown of your current press footprint.',
    cta: 'Book a call', url: 'calendly.com/shilikajain',
  }),
  poster('apac', {
    align: 'top', scrim: 'top', vars: '--h1:84px;',
    headline: 'APAC PR for founders who refuse to ship a <em>translated</em> press release.',
    sub: 'Korea, Japan, India, Singapore and MENA.',
    cta: CTA, url: URL,
  }),
  poster('singapore', {
    align: 'top', scrim: 'top',
    headline: 'Singapore PR: the <em>MAS frame</em> is paragraph one.',
    sub: 'BT, DealStreetAsia and Token2049.',
    cta: CTA, url: URL,
  }),
  poster('korea', {
    headline: 'Korea PR: the <em>FSC frame</em> is paragraph one.',
    sub: 'BloomingBit, TokenPost and KBW Seoul.',
    cta: CTA, url: URL,
  }),
  poster('india', {
    vars: '--h1:88px;',
    headline: 'India PR: win the <em>home market</em> before the re-report.',
    sub: 'Inc42, Economic Times and Forbes India.',
    cta: CTA, url: URL,
  }),
  poster('japan', {
    vars: '--h1:88px;',
    headline: 'Japan PR: the <em>FSA frame</em> and the named partner come first.',
    sub: 'CoinPost, Nikkei and WebX Tokyo.',
    cta: CTA, url: URL,
  }),
  poster('mena', {
    headline: 'Dubai and MENA PR: <em>VARA</em> is paragraph one.',
    sub: 'VARA, ADGM and RAK DAO.',
    cta: CTA, url: URL,
  }),
  poster('speaker', {
    eyebrow: 'Recently on stage', vars: '--h1:88px;',
    headline: 'Keynotes on Web3, AI &amp; <em>cybersecurity PR</em>.',
    sub: 'Binary Summit Bangkok, India Blockchain Week 2024, Web3 Conf Goa and EpicWeb3 Summit.',
    cta: 'Book a keynote', url: URL,
  }),
  poster('founder-profiling', {
    eyebrow: 'Founder profiling',
    headline: 'Op-eds, podcasts and a <em>category voice</em>.',
    cta: CTA, url: URL,
  }),
  poster('token-launch', {
    align: 'top', scrim: 'top', eyebrow: 'Token launch PR',
    headline: '<em>TGE</em> comms, exchange news and KOL waves.',
    cta: CTA, url: URL,
  }),
  poster('kol', {
    eyebrow: 'KOL marketing',
    headline: 'Web3 KOL marketing with <em>200+</em> vetted creators.',
    sub: 'FTC-safe campaigns.',
    cta: CTA, url: URL,
  }),
  poster('ai-pr', {
    eyebrow: 'AI PR',
    headline: 'AI PR with <em>analyst-grade</em> credibility.',
    sub: 'Plus the AI-search work that gets you cited.',
    cta: CTA, url: URL,
  }),
  poster('cybersecurity', {
    eyebrow: 'Cybersecurity PR',
    headline: 'Cybersecurity PR from a <em>senior operator</em>.',
    cta: CTA, url: URL,
  }),
  poster('retainer', {
    eyebrow: 'Fractional PR',
    headline: 'Retainers run <em>$5k-10k</em> a month.',
    sub: 'Senior-operator PR for Web3, crypto and AI startups.',
    cta: CTA, url: URL,
  }),
];

// -- Stories, 1080x1920 -----------------------------------------------------
const story = (id, rest) => ({
  id: `story-${id}`,
  out: `posters/story-${id}`,
  group: 'story',
  format: 'story',
  template: 'cover',
  webp: true,
  jpgQuality: 84,
  eyebrow: 'Shilika Jain',
  scrim: 'bottom',
  align: 'bottom',
  ...PICK[`story-${id}`],
  ...rest,
});

const STORIES = [
  story('teardown', {
    headline: 'Book a 30-min PR <em>teardown</em>.',
    sub: 'I come prepped with a teardown of your current press footprint.',
    cta: 'Book a call', url: 'calendly.com/shilikajain',
  }),
  story('web3-pr', {
    headline: 'Web3 PR &amp; AI PR that lands <em>Tier-1</em> headlines.',
    sub: 'Coverage in Forbes, CoinDesk, Economic Times and Yahoo Finance.',
    cta: CTA, url: URL,
  }),
  story('apac', {
    vars: '--h1:104px;',
    headline: 'APAC PR for founders who refuse to ship a <em>translated</em> press release.',
    sub: 'Korea, Japan, India, Singapore and MENA.',
    cta: CTA, url: URL,
  }),
];

// -- Social covers ------------------------------------------------------------
// Dark text panel with a square photo tile on the right. Left padding leaves room for
// the avatar that LinkedIn / X overlay on the cover, and YouTube's 1546x423 safe area.
const cover = (id, out, format, rest) => ({
  id: `cover-${id}`,
  out: `covers/${out}`,
  group: 'cover',
  format,
  template: 'split',
  flip: true,
  mark: false,
  jpgQuality: 88,
  eyebrow: 'Shilika Jain',
  ...PICK[`cover-${id}`],
  ...rest,
});

const COVERS = [
  cover('linkedin', 'linkedin-1584x396', 'linkedin', {
    headline: 'Web3 PR &amp; AI PR that lands <em>Tier-1</em> headlines.',
    sub: 'Forbes, CoinDesk, Economic Times, Yahoo Finance.',
  }),
  cover('x', 'x-1500x500', 'x', {
    headline: 'Web3 PR &amp; AI PR that lands <em>Tier-1</em> headlines.',
    sub: 'Forbes, CoinDesk, Economic Times, Yahoo Finance.',
  }),
  cover('youtube', 'youtube-2560x1440', 'youtube', {
    headline: 'Web3 PR &amp; AI PR that lands <em>Tier-1</em> headlines.',
    sub: 'Fractional PR for Web3 and AI founders.',
  }),
  cover('newsletter', 'newsletter-1200x400', 'newsletter', {
    eyebrow: 'Field notes',
    headline: 'Web3 &amp; AI PR, <em>field-tested</em>.',
  }),
];

export const GRAPHICS = [...OG, ...POSTERS, ...STORIES, ...COVERS];
