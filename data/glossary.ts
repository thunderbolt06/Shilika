// Glossary data. Plan Wk8 8.1: short, first-hand definitional entries that
// answer the "what is X" queries Web3 and AI founders type into AI search.
// Written as operator-voice, non-commodity content (Google AI Optimization
// Guide, last updated 2026-06-15), not dictionary boilerplate.

export type GlossaryFaq = { q: string; a: string };

export type GlossaryTerm = {
  slug: string;
  term: string; // the canonical term, e.g. "Fractional PR"
  title: string; // H1 / page title, question form
  metaTitle: string; // <= 60 chars where possible
  metaDescription: string;
  deck: string; // one-line standfirst under the H1
  answer: string; // front-loaded ~50-word direct definition (answer-engine bait)
  bodyHtml: string; // prose body, rendered inside .prose-shilika
  faqs: GlossaryFaq[];
  related: { href: string; label: string }[];
  keywords: string[];
  about: string[]; // schema.org about Things
  datePublished: string;
  dateModified: string;
  tag: string;
};

export const GLOSSARY: GlossaryTerm[] = [
  {
    slug: 'what-is-fractional-pr',
    term: 'Fractional PR',
    title: 'What is fractional PR?',
    metaTitle: 'What Is Fractional PR? Definition & Cost (2026)',
    metaDescription:
      'Fractional PR explained: a senior PR operator who runs your media strategy part-time, embedded like a team member, for a fraction of an agency retainer. Cost, fit, and when to use it in 2026.',
    deck: 'A senior operator on your team part-time, not a junior account at an agency.',
    answer:
      'Fractional PR is a senior public relations operator who runs your media and communications strategy on a part-time, embedded basis, for a fraction of a full agency retainer. You get one experienced person doing the work directly, instead of a layered agency team or a full-time in-house hire.',
    bodyHtml: `
<h2>How fractional PR works in 2026</h2>
<p>In a fractional model, one senior operator takes ownership of your PR the way a part-time head of comms would. They set the narrative, build the media list, write the pitches, run the outreach, and brief the founder, usually for a fixed number of days or hours a month. There is no account manager relaying messages to a junior who relays them to a freelancer. The person you hire is the person who does the work.</p>
<p>The model became common with Web3 and AI startups because most are funded but pre-scale: a token or a model launch needs senior PR judgment, but the company is not ready to pay an agency retainer or carry a full-time comms salary plus benefits and equity.</p>
<h2>Fractional PR vs agency vs in-house</h2>
<p>A traditional <a href="/playbook/best-web3-pr-agencies-2026">Web3 PR agency</a> sells you a team and bandwidth. That works at scale, but founder access is thin and execution often drops to junior staff. A full-time in-house hire gives you dedication and context, but it is slow to recruit and expensive once equity is counted. Fractional sits in the middle: senior judgment and direct access, scoped to what an early-stage company actually needs. The <a href="/playbook/fractional-vs-agency">fractional vs agency decision tree</a> walks through which one fits.</p>
<h2>What it costs</h2>
<p>Fractional engagements in Web3 and AI PR typically run roughly $5,000 to $12,000 a month, against $15,000 to $45,000 for a full agency retainer. The gap is not lower quality; it is fewer layers and no idle bandwidth. The full breakdown is in <a href="/playbook/crypto-pr-cost-2026">how much crypto PR costs in 2026</a>.</p>
<h2>Who fractional PR is for</h2>
<p>It fits funded Web3, AI and cybersecurity startups that have real news to make (a raise, a mainnet, a model, a partnership) but no in-house comms lead, and founders who want a senior partner rather than a vendor. It is the wrong fit for a company that needs ten people on a daily newsroom, or one with no news and no spokesperson willing to show up.</p>
`,
    faqs: [
      {
        q: 'How much does fractional PR cost?',
        a: 'Fractional PR for Web3 and AI startups usually runs roughly $5,000 to $12,000 a month, compared with $15,000 to $45,000 for a full agency retainer. You pay for senior time scoped to what an early-stage company needs, not for a layered team or idle bandwidth.',
      },
      {
        q: 'What is the difference between fractional PR and a freelancer?',
        a: 'A freelancer usually executes a defined task, like writing a release or pitching one story. A fractional PR operator owns the strategy: positioning, media list, outreach, founder prep and measurement, on a recurring embedded basis. Think part-time head of comms rather than a per-project contractor.',
      },
      {
        q: 'Is fractional PR a good fit for a pre-launch startup?',
        a: 'Yes, if there is a dated news hook to build toward, such as a raise, a mainnet or a token launch, and a founder willing to be the spokesperson. Fractional works well pre-launch because the run-up needs senior judgment more than headcount.',
      },
      {
        q: 'When should a company move from fractional PR to an agency?',
        a: 'When the volume of simultaneous workstreams outgrows one senior person: multiple regional launches at once, a daily newsroom, or a crisis that needs a standing team. At that point bandwidth matters more than founder access, and an agency or in-house team becomes the better structure.',
      },
    ],
    related: [
      { href: '/services', label: 'PR services' },
      { href: '/playbook/fractional-vs-agency', label: 'Fractional PR vs agency' },
      { href: '/playbook/crypto-pr-cost-2026', label: 'How much crypto PR costs in 2026' },
      { href: '/services/web3-pr-campaigns', label: 'Web3 PR campaigns' },
    ],
    keywords: [
      'what is fractional PR',
      'fractional PR definition',
      'fractional PR meaning',
      'fractional PR cost',
      'fractional head of comms',
      'fractional PR vs agency',
      'Web3 fractional PR',
      'AI startup fractional PR',
    ],
    about: ['Fractional PR', 'Public relations', 'Startup communications'],
    datePublished: '2026-06-22',
    dateModified: '2026-06-22',
    tag: 'Operations',
  },
  {
    slug: 'what-is-geo-generative-engine-optimization',
    term: 'GEO (Generative Engine Optimization)',
    title: 'What is GEO (Generative Engine Optimization)?',
    metaTitle: 'What Is GEO? Generative Engine Optimization (2026)',
    metaDescription:
      'GEO, or generative engine optimization, is structuring content and earned media so AI engines like ChatGPT, Perplexity, Gemini and AI Overviews cite your brand by name. How it works for Web3 and AI brands in 2026.',
    deck: 'Getting cited by AI engines, not just ranked by search engines.',
    answer:
      'GEO, or generative engine optimization, is the practice of structuring your content and earned media so AI engines such as ChatGPT, Perplexity, Gemini, Claude and Google AI Overviews cite your brand by name when buyers ask questions. It is the AI-search counterpart to SEO, focused on being the cited source rather than the blue link.',
    bodyHtml: `
<h2>Why GEO matters in 2026</h2>
<p>Buyers increasingly ask an AI engine before they ever open a list of links. When a founder types "best Web3 PR consultant" or "fractional AI PR services" into ChatGPT or Perplexity, the answer names a handful of sources. GEO is the work of being one of those named sources. For a funded startup with little Google presence, getting cited inside an AI answer can matter more than ranking page one.</p>
<h2>What Google actually says about GEO</h2>
<p>Worth being honest here. Google's own position is that "GEO" and "AEO" are not separate disciplines: from Google's view, optimizing for AI Overviews and AI Mode is still SEO, because those features run on the same Search index and ranking systems. Google also says you can ignore tricks like llms.txt files, content chunking and chasing inauthentic mentions. So GEO that works is not a set of hacks. It is strong, crawlable, first-hand content plus genuine earned media, which is exactly what good PR produces.</p>
<h2>How brands actually get cited</h2>
<p>AI engines reward content that is genuinely useful and verifiable: a clear front-loaded answer, original data or named examples a model can quote, and authoritative third-party coverage that corroborates your claims. That is why <a href="/services/ai-startup-pr">AI startup PR</a> and GEO overlap so heavily. A founder Op-Ed in a tier-1 outlet, a named case study, and a clean definition page all give engines something to cite. Ignoring this is one of the <a href="/playbook/web3-pr-agency-mistakes">most common Web3 PR mistakes</a> in 2026.</p>
<h2>GEO for Web3, AI and cybersecurity</h2>
<p>The playbooks differ by vertical. AI buyers lean on mainstream tech credibility, so citations from outlets and analysts carry weight, covered in the <a href="/playbook/ai-startup-pr-2026">AI startup PR playbook</a>. Cybersecurity buyers trust analyst and threat-research sources, covered in the <a href="/playbook/cybersecurity-pr-2026">cybersecurity PR playbook</a>. In both, the durable GEO asset is the same: first-hand expertise that an engine can attribute to a named person and company.</p>
`,
    faqs: [
      {
        q: 'What is the difference between GEO and SEO?',
        a: 'SEO aims to rank your page in a list of search results. GEO aims to get your brand cited inside an AI-generated answer. Google itself treats them as the same work, since AI Overviews run on the Search index, but the goal shifts from earning the click to being the named source.',
      },
      {
        q: 'Is GEO the same as AEO?',
        a: 'They are close. AEO (answer engine optimization) focuses on owning direct question-and-answer responses; GEO (generative engine optimization) focuses on being cited inside longer AI-generated answers. In practice both come down to clear, first-hand, verifiable content plus credible earned media.',
      },
      {
        q: 'Can you pay to be cited by AI engines?',
        a: 'No, and trying to is a poor strategy. Both Google and the major AI engines lean on quality and spam systems, and chasing inauthentic mentions does not reliably move citations. Earned coverage, original data and genuinely useful pages are what get attributed.',
      },
      {
        q: 'How do you measure GEO?',
        a: 'Run a fixed panel of buyer questions across ChatGPT, Perplexity, Gemini and Claude on a schedule, and log where your brand is cited versus missing and which sources the engines pull from. Track that citation share over time alongside normal organic search metrics.',
      },
    ],
    related: [
      { href: '/services/ai-startup-pr', label: 'AI startup PR' },
      { href: '/playbook/ai-startup-pr-2026', label: 'AI startup PR playbook 2026' },
      { href: '/playbook/cybersecurity-pr-2026', label: 'Cybersecurity PR in 2026' },
      { href: '/playbook/web3-pr-agency-mistakes', label: '7 Web3 PR mistakes' },
    ],
    keywords: [
      'what is GEO',
      'generative engine optimization',
      'GEO meaning',
      'GEO vs SEO',
      'GEO vs AEO',
      'AI search optimization',
      'get cited by ChatGPT',
      'AI Overviews citations',
      'GEO for Web3',
      'GEO for AI startups',
    ],
    about: ['Generative engine optimization', 'Answer engine optimization', 'AI search', 'Search engine optimization'],
    datePublished: '2026-06-22',
    dateModified: '2026-06-22',
    tag: 'AI search',
  },
  {
    slug: 'what-is-a-tge-comms-plan',
    term: 'TGE Comms Plan',
    title: 'What is a TGE comms plan?',
    metaTitle: 'What Is a TGE Comms Plan? Token Launch PR (2026)',
    metaDescription:
      'A TGE comms plan is the dated communications sequence around a token generation event: narrative, media, KOLs, exchange comms and crisis prep across the weeks before and after listing. Explained for 2026.',
    deck: 'The dated communications sequence that surrounds a token launch.',
    answer:
      'A TGE comms plan is the dated communications sequence built around a token generation event (TGE). It maps the narrative, media outreach, KOL waves, exchange and community comms, and crisis preparation across the weeks before and after a token goes live, so the launch lands as a story rather than a scramble.',
    bodyHtml: `
<h2>What "TGE" means</h2>
<p>TGE stands for token generation event: the moment a Web3 project creates and distributes its token, usually alongside exchange listings. It is the single highest-stakes moment in a crypto project's public life. A TGE comms plan is the communications layer that surrounds it, distinct from a generic PR plan because it is built backward from a fixed, immovable launch date.</p>
<h2>What a TGE comms plan includes</h2>
<p>A working plan runs in phases across roughly an eight-week run-up and the weeks after. It covers the token narrative and category story, a single source-of-truth fact sheet, founder and spokesperson prep, tiered media outreach under embargo, a vetted KOL wave, regional and exchange-aligned comms, a launch-week run of show, and pre-written crisis statements for the things that go wrong on listing day. The full step-by-step version is the <a href="/playbook/pre-token-launch-pr-checklist">pre-token-launch PR checklist</a>.</p>
<h2>Who needs one and when</h2>
<p>Any project heading into a TGE needs one, and the right time to start is six to twelve weeks out, not the week of listing. Narrative, embargo conversations and KOL vetting all take lead time. Founders who start late end up buying coverage instead of earning it, and skip the crisis prep that listing day almost always requires. This work is the core of <a href="/services/token-launch-pr">token launch PR</a>.</p>
<h2>The regional dimension</h2>
<p>Liquidity and attention for most token launches sit in Asia and the Middle East, not only the US. A strong TGE comms plan sequences regional outlets and KOLs across time zones so the story carries through the windows the English-language desk sleeps through. The regional playbook is in the <a href="/playbook/apac-pr-playbook-2026">APAC PR playbook</a>.</p>
`,
    faqs: [
      {
        q: 'What does TGE stand for?',
        a: 'TGE stands for token generation event: the point at which a Web3 project creates and distributes its token, usually alongside exchange listings. A TGE comms plan is the dated communications sequence built around that event.',
      },
      {
        q: 'When should you start a TGE comms plan?',
        a: 'Six to twelve weeks before the listing date. Narrative development, embargoed media conversations and KOL vetting all need lead time. Starting the week of launch forces you to buy coverage rather than earn it, and leaves no room for crisis preparation.',
      },
      {
        q: 'How is a TGE comms plan different from a normal PR plan?',
        a: 'It is built backward from one fixed, immovable date and concentrated into a short window. It also adds elements a standard plan does not need: embargo coordination across outlets, a KOL wave, exchange and community comms, and pre-written crisis statements for listing-day failures.',
      },
      {
        q: 'What goes wrong without a TGE comms plan?',
        a: 'Launches land with no narrative, coverage clusters in one time zone and misses Asian and Middle Eastern liquidity windows, KOLs post unvetted or contradictory messaging, and the team has no prepared response when something breaks on listing day. The result is a one-day blip instead of a durable story.',
      },
    ],
    related: [
      { href: '/services/token-launch-pr', label: 'Token launch PR' },
      { href: '/playbook/pre-token-launch-pr-checklist', label: 'Pre-token-launch PR checklist' },
      { href: '/playbook/apac-pr-playbook-2026', label: 'APAC PR playbook' },
      { href: '/playbook/crypto-pr-cost-2026', label: 'Crypto PR cost in 2026' },
    ],
    keywords: [
      'what is a TGE comms plan',
      'TGE communications plan',
      'token generation event PR',
      'token launch comms',
      'TGE PR plan',
      'crypto launch communications',
      'pre token launch PR',
      'token listing PR',
    ],
    about: ['Token generation event', 'Crypto communications', 'Token launch public relations'],
    datePublished: '2026-06-22',
    dateModified: '2026-06-22',
    tag: 'Launch',
  },
  {
    slug: 'what-is-aeo-answer-engine-optimization',
    term: 'AEO (Answer Engine Optimization)',
    title: 'What is AEO (Answer Engine Optimization)?',
    metaTitle: 'What Is AEO? Answer Engine Optimization (2026)',
    metaDescription:
      'AEO, or answer engine optimization, is structuring content so AI answer engines like ChatGPT, Perplexity, Gemini and Google AI Overviews use it as the direct answer to a question. How it works for Web3 and AI brands in 2026.',
    deck: 'Being the answer an AI gives, not just a link it might show.',
    answer:
      'AEO, or answer engine optimization, is the practice of structuring content so AI answer engines such as ChatGPT, Perplexity, Gemini and Google AI Overviews pull it directly into the answer they give a user. It focuses on question-form queries and front-loaded, verifiable answers, so your brand becomes the response rather than one of ten blue links.',
    bodyHtml: `
<h2>What an answer engine actually is</h2>
<p>An answer engine is any tool that returns a synthesized answer instead of a list of links: Google's AI Overviews and AI Mode, ChatGPT, Perplexity, Gemini and Claude. A founder asking "how much does crypto PR cost" or "what is a fractional head of comms" now reads one composed answer that names a few sources. AEO is the work of being named in that answer. With most informational searches ending without a click in 2026, being the cited answer often matters more than ranking a page nobody opens.</p>
<h2>What Google actually says about AEO</h2>
<p>Be honest about this, because it is where most "AEO" advice goes wrong. Google's own <a href="https://developers.google.com/search/docs/fundamentals/ai-optimization-guide" rel="nofollow">AI optimization guide</a> states plainly that, from Google's view, optimizing for AI Overviews and AI Mode is still SEO. The same guide says you can skip the tricks: special AI text files, content chunking, AI-specific rewrites and chasing inauthentic mentions do not help. So AEO that works is not a separate hack stack. It is clear, crawlable, genuinely useful content that answers a real question, which is the same thing good SEO has always rewarded.</p>
<h2>How to actually win answer-engine placement</h2>
<p>The pattern is consistent across engines. Lead with a direct answer in the first 50 words, before any preamble. Use question-form headings that mirror how people ask. Make claims an engine can lift and attribute: original data, named examples, specific numbers. Back them with credible third-party coverage so the answer is verifiable. This is why PR and AEO overlap so heavily: a named case study, a founder Op-Ed in a tier-1 outlet and a clean definition page all give engines something safe to quote. The deeper comparison is in the <a href="/playbook/aeo-vs-seo-startups-2026">AEO vs SEO breakdown</a>, and the citation mechanics in <a href="/playbook/how-to-get-cited-by-chatgpt-2026">how to get cited by ChatGPT</a>.</p>
<h2>AEO vs GEO vs SEO</h2>
<p>The three terms describe one job seen from three angles. SEO earns the ranked link. AEO earns the direct answer to a question. <a href="/glossary/what-is-geo-generative-engine-optimization">GEO</a> earns the citation inside a longer generative response. In practice the inputs are identical: front-loaded answers, first-hand expertise, structured pages and real earned media. For a funded Web3 or AI startup with little Google presence, the fastest route to all three is the same, strong content paired with genuine coverage, which is the core of <a href="/services/ai-startup-pr">AI startup PR</a>.</p>
`,
    faqs: [
      {
        q: 'What is the difference between AEO and SEO?',
        a: 'SEO aims to rank your page in a list of results. AEO aims to make your content the direct answer an AI engine gives. Google itself treats them as the same work, since AI Overviews run on the Search index, but AEO shifts the goal from earning the click to being the answer the user reads.',
      },
      {
        q: 'Is AEO the same as GEO?',
        a: 'They overlap heavily. AEO (answer engine optimization) focuses on owning direct question-and-answer responses; GEO (generative engine optimization) focuses on being cited inside longer AI-generated answers. Both come down to the same inputs: clear front-loaded answers, first-hand verifiable content and credible earned media.',
      },
      {
        q: 'Do you need special schema or an llms.txt file for AEO?',
        a: 'No. Google says AI-specific files, content chunking and AI rewrites are not needed for its generative features. Structured data can help with rich results, but the durable win is genuinely useful, crawlable content that answers a real question. Skip the hacks and write the better answer.',
      },
      {
        q: 'How do you measure AEO?',
        a: 'Run a fixed panel of buyer questions across ChatGPT, Perplexity, Gemini, Claude and Google AI Overviews on a schedule, and log where your brand appears in the answer versus where it is missing, and which sources the engines pull from. Track that presence over time alongside normal organic search metrics.',
      },
    ],
    related: [
      { href: '/glossary/what-is-geo-generative-engine-optimization', label: 'What is GEO?' },
      { href: '/playbook/aeo-vs-seo-startups-2026', label: 'AEO vs SEO for startups' },
      { href: '/playbook/how-to-get-cited-by-chatgpt-2026', label: 'How to get cited by ChatGPT' },
      { href: '/services/ai-startup-pr', label: 'AI startup PR' },
    ],
    keywords: [
      'what is AEO',
      'answer engine optimization',
      'AEO meaning',
      'AEO vs SEO',
      'AEO vs GEO',
      'AI answer engines',
      'Google AI Overviews optimization',
      'get cited by AI',
      'AEO for Web3',
      'AEO for AI startups',
    ],
    about: ['Answer engine optimization', 'Generative engine optimization', 'AI search', 'Search engine optimization'],
    datePublished: '2026-06-28',
    dateModified: '2026-06-28',
    tag: 'AI search',
  },
  {
    slug: 'what-is-a-kol-wave',
    term: 'KOL Wave',
    title: 'What is a KOL wave?',
    metaTitle: 'What Is a KOL Wave? Crypto Launch Marketing (2026)',
    metaDescription:
      'A KOL wave is a timed, sequenced activation of vetted key opinion leaders around a launch, released in coordinated phases rather than all at once. How it works for Web3 and AI token launches in 2026.',
    deck: 'A sequenced rollout of vetted creators, not a one-day spray of paid posts.',
    answer:
      'A KOL wave is a timed, sequenced activation of vetted key opinion leaders (influential creators) around a launch, released in coordinated phases rather than all at once. A typical structure runs credibility anchors before the event, broad activation on launch day, and sustained deep-dive content after, so attention compounds instead of spiking and vanishing.',
    bodyHtml: `
<h2>What "KOL" means</h2>
<p>KOL stands for key opinion leader: a creator whose audience trusts their read on a category, on X, YouTube, Telegram, Farcaster or regional platforms. In Web3 and AI, KOLs often move attention faster than trade press. A KOL wave is the structured way to use them, the opposite of paying twenty influencers to post the same day and hoping something sticks.</p>
<h2>How a KOL wave is sequenced</h2>
<p>A working wave runs in three phases around a dated moment. <strong>Wave one (roughly T-72 hours):</strong> a small set of high-credibility anchors signal that something real is coming, without giving away the launch. <strong>Wave two (T+0):</strong> broad activation across a vetted creator set, regionally segmented, on the launch date. <strong>Wave three (T+24 hours to T+7 days):</strong> sustained, deeper content, reviews, explainers and AMAs that carry the story past the one-day spike. Each phase has its own brief and disclosure language. This is the core of <a href="/services/kol-marketing">KOL and influencer marketing</a> and a key workstream in any <a href="/glossary/what-is-a-tge-comms-plan">TGE comms plan</a>.</p>
<h2>Why vetting comes before sequencing</h2>
<p>A wave is only as good as the creators in it. Before anyone is briefed, each KOL should pass a fraud and quality audit: real engagement versus bots, audience geography, on-chain track record and brand-partner references. Skipping this is one of the most expensive <a href="/playbook/web3-pr-agency-mistakes">Web3 PR mistakes</a>, because a launch amplified by fake audiences buys impressions, not wallets. The vetting method is covered in <a href="/playbook/how-to-vet-crypto-kols-2026">how to vet crypto KOLs</a>.</p>
<h2>The regional dimension</h2>
<p>Liquidity and attention for most token launches sit in Asia and the Middle East, not only the US. A strong KOL wave segments by market, with native-language briefs and per-market disclosure compliance, so the launch carries through Korean, Japanese and other time-zone windows the English-language desk sleeps through. The regional creator map is in the <a href="/playbook/apac-pr-playbook-2026">APAC PR playbook</a>.</p>
`,
    faqs: [
      {
        q: 'What does KOL stand for?',
        a: 'KOL stands for key opinion leader: an influential creator whose audience trusts their take on a category. A KOL wave is a timed, phased activation of vetted KOLs around a launch, rather than a single same-day burst of paid posts.',
      },
      {
        q: 'Why sequence a KOL campaign in waves instead of all at once?',
        a: 'A single-day burst spikes and disappears. Sequencing into pre-launch anchors, launch-day activation and post-launch deep-dives lets attention compound: each phase gives the next a reason to talk, and the story carries past day one instead of dying with the news cycle.',
      },
      {
        q: 'How many KOLs are in a typical wave?',
        a: 'It varies by budget and goal, but a launch wave often runs a handful of high-credibility anchors before the event and roughly 40 to 120 vetted creators on the launch date, segmented by region and audience size, followed by a smaller set producing sustained deeper content afterward.',
      },
      {
        q: 'How do you keep a KOL wave compliant?',
        a: 'Use clear disclosure language tuned to each market, avoid price predictions and investment framing, and brief every creator from one fact sheet so messaging stays consistent. In crypto, disclosure and no-financial-advice rules vary by region, so the brief and compliance language are set per market.',
      },
    ],
    related: [
      { href: '/services/kol-marketing', label: 'KOL & influencer marketing' },
      { href: '/playbook/how-to-vet-crypto-kols-2026', label: 'How to vet crypto KOLs' },
      { href: '/playbook/kol-campaign-token-launch-2026', label: 'KOL campaign for a token launch' },
      { href: '/glossary/what-is-a-tge-comms-plan', label: 'What is a TGE comms plan?' },
    ],
    keywords: [
      'what is a KOL wave',
      'KOL wave meaning',
      'KOL marketing crypto',
      'crypto influencer launch',
      'key opinion leader',
      'token launch KOL strategy',
      'crypto KOL campaign',
      'Web3 influencer waves',
    ],
    about: ['Key opinion leader', 'Influencer marketing', 'Crypto marketing', 'Token launch'],
    datePublished: '2026-06-28',
    dateModified: '2026-06-28',
    tag: 'KOL',
  },
];

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY.find((t) => t.slug === slug);
}
