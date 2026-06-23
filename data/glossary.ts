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
];

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY.find((t) => t.slug === slug);
}
