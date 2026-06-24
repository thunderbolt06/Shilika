export const meta = {
  name: 'gen-landing-pages',
  description: 'Generate 99 commercial-intent /pages landing pages (body.html + jsonld.json) cloned from the web3-pr-agency gold template',
  phases: [{ title: 'Generate', detail: 'one subagent per landing page' }],
};

const ROOT = '/Users/thunderbolt/Documents/projects/Shilika';
const topics = [{"n": 93, "slug": "crypto-pr-agency-for-startups", "h1": "Crypto PR agency for early startups", "title": "Crypto PR Agency for Startups 2026 | Lean, Senior, Effective", "deck": "PR that fits an early startup: when to start, what to spend, and what actually earns coverage.", "serviceKey": "web3", "service": "Web3 PR", "cat": "WEB3 PR", "servicePage": "/services/web3-pr-campaigns", "region": "Global", "vertical": "General", "intent": "Decision", "links": ["/playbook/pr-for-tech-startups-2026", "/playbook/crypto-pr-small-budget-2026", "/services/web3-pr-campaigns", "/pages/affordable-crypto-pr-agency"]}, {"n": 94, "slug": "affordable-crypto-pr-agency", "h1": "Affordable crypto PR that still earns coverage", "title": "Affordable Crypto PR Agency 2026 | Lean Budget, Real Results", "deck": "What affordable PR really buys, the models that fit a small budget, and the cheap traps to avoid.", "serviceKey": "web3", "service": "Web3 PR", "cat": "WEB3 PR", "servicePage": "/services/web3-pr-campaigns", "region": "Global", "vertical": "General", "intent": "Decision", "links": ["/playbook/affordable-pr-tech-startup-2026", "/playbook/crypto-pr-small-budget-2026", "/services/web3-pr-campaigns", "/pages/crypto-pr-agency-small-budget"]}, {"n": 95, "slug": "crypto-pr-agency-small-budget", "h1": "Crypto PR on a small budget", "title": "Crypto PR Agency Small Budget 2026 | High-Leverage Moves", "deck": "The high-leverage PR moves a lean team can run, and where to spend the first dollar.", "serviceKey": "web3", "service": "Web3 PR", "cat": "WEB3 PR", "servicePage": "/services/web3-pr-campaigns", "region": "Global", "vertical": "General", "intent": "Decision", "links": ["/playbook/crypto-pr-small-budget-2026", "/playbook/founder-led-diy-pr-2026", "/services/web3-pr-campaigns", "/pages/affordable-crypto-pr-agency"]}, {"n": 96, "slug": "b2b-tech-pr-agency", "h1": "B2B tech PR for a buying committee", "title": "B2B Tech PR Agency 2026 | Category, Analysts, Proof", "deck": "B2B PR that sells to a committee, not a crowd, with category narrative and customer proof.", "serviceKey": "ai", "service": "AI Startup PR", "cat": "AI PR", "servicePage": "/services/ai-startup-pr", "region": "Global", "vertical": "B2B", "intent": "Decision", "links": ["/playbook/b2b-tech-pr-guide-2026", "/playbook/best-b2b-saas-pr-agencies-2026", "/services/ai-startup-pr", "/pages/b2b-saas-pr-agency"]}, {"n": 97, "slug": "pr-agency-for-tech-startups", "h1": "PR agency for tech startups, demystified", "title": "PR Agency for Tech Startups 2026 | A Founder's Guide", "deck": "The whole PR picture for an early tech startup, and the fractional alternative to a full agency.", "serviceKey": "ai", "service": "AI Startup PR", "cat": "AI PR", "servicePage": "/services/ai-startup-pr", "region": "Global", "vertical": "General", "intent": "Decision", "links": ["/playbook/pr-for-tech-startups-2026", "/playbook/fractional-vs-agency", "/services/ai-startup-pr", "/pages/crypto-pr-agency-for-startups"]}, {"n": 98, "slug": "web3-marketing-agency", "h1": "Web3 marketing agency, the buyer's guide", "title": "Web3 Marketing Agency 2026 | Vetting Questions & Red Flags", "deck": "The questions that expose real depth, the red flags, and how to match model to stage.", "serviceKey": "web3", "service": "Web3 PR", "cat": "WEB3 PR", "servicePage": "/services/web3-pr-campaigns", "region": "Global", "vertical": "General", "intent": "Decision", "links": ["/playbook/web3-marketing-agency-guide-2026", "/playbook/web3-pr-agency-mistakes", "/services/web3-pr-campaigns", "/pages/best-web3-marketing-agency"]}, {"n": 99, "slug": "crypto-publicist", "h1": "A crypto publicist vs a PR agency", "title": "Crypto Publicist 2026 | Senior Attention vs Agency Bench", "deck": "What a solo publicist gives you that an agency cannot, and which fits your stage and budget.", "serviceKey": "web3", "service": "Web3 PR", "cat": "WEB3 PR", "servicePage": "/services/web3-pr-campaigns", "region": "Global", "vertical": "General", "intent": "Decision", "links": ["/playbook/crypto-publicist-vs-agency-2026", "/glossary/what-is-fractional-pr", "/services/web3-pr-campaigns", "/pages/crypto-pr-consultant"]}, {"n": 100, "slug": "token-launch-marketing-agency", "h1": "Token launch marketing agency, chosen well", "title": "Token Launch Marketing Agency 2026 | Criteria & Alternative", "deck": "Criteria for picking a token-launch partner, the trade-offs of each model, and a fractional alternative.", "serviceKey": "tge", "service": "Token Launch / TGE PR", "cat": "TOKEN LAUNCH", "servicePage": "/services/token-launch-pr", "region": "Global", "vertical": "Token launch", "intent": "Decision", "links": ["/playbook/best-token-launch-marketing-agencies-2026", "/playbook/fractional-vs-agency", "/services/token-launch-pr", "/pages/token-launch-pr-agency"]}];
if (!topics.length) throw new Error('no topics');

const RESULT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    slug: { type: 'string' },
    ok: { type: 'boolean' },
    notes: { type: 'string' },
  },
  required: ['slug', 'ok'],
};

const BRIEF = [
'You are building one commercial-intent LANDING PAGE for shilikajain.com, the fractional PR practice of Shilika Jain (Web3, AI, DePIN and cybersecurity founders). This is a lead-generation page optimised for GEO/AEO (getting cited by ChatGPT, Perplexity and Google AI Mode) and for converting founders who are ready to hire. It must follow Google E-E-A-T and read like a senior operator, not a content mill.',
'',
'STEP 1 — STUDY THE GOLD TEMPLATE. Read these two files in full:',
'  ' + ROOT + '/app/_partials/pages__web3-pr-agency-body.html',
'  ' + ROOT + '/app/_partials/pages__web3-pr-agency-jsonld.json',
'Your output must mirror this template section for section.',
'',
'STEP 2 — COPY VERBATIM (do not change a character except where noted):',
'  - the entire <style>...</style> block',
'  - <div class="scroll-progress">...',
'  - the entire <nav class="nav">...</nav>',
'  - the entire <section class="trust">...</section> (the outlet trust bar)',
'  - the entire <section class="lead-section" id="lead" ...>...</section> EXCEPT: on the <form id="intent-form">, set data-service to YOUR page service value and data-source to "/pages/YOUR-slug". Leave all form fields/options identical.',
'  - the entire <footer class="footer">...</footer>',
'Keep every data-reveal, data-magnet, data-count, id and class attribute intact so the animations and form keep working.',
'',
'STEP 3 — CUSTOMISE THESE SECTIONS for your topic (keep the same HTML classes/structure, swap the copy):',
'  - <header class="lp-hero">: crumb third item = your page name; lp-meta = your CATEGORY eyebrow + an intent chip (e.g. "Hire / decision") + "· Updated June 2026"; lp-h1 = a punchy headline with exactly one <em>phrase</em> (the lime underline); lp-sub = 2-3 sentence standfirst; answer-box = a front-loaded "Direct answer" (2-4 sentences) that directly answers the core commercial query, with 1-2 <strong> figures; the two CTA buttons stay (#lead and the Calendly link).',
'  - "Why this page exists" section: keep the lp-eyebrow/lp-h2/lp-lead pattern and the .aeo-demo block. Write a realistic "Ask AI" query for your topic and a short cited answer that names Shilika Jain and a real proof point.',
'  - advantages section: 6 .adv-card items (numbered 01-06) specific to this service/vertical/region.',
'  - "how it runs" steps: 4 .step items.',
'  - proof stats: keep the 4 .stat blocks with the data-count counters (50+ protocols, 11 RARI placements, 100K+ mentions/quarter, 6 APAC markets) and the lp-prose proof paragraph (you may adapt which case studies you cite from: RARI Chain, MANTRA Chain, Gaia AI, Fluence, Web3Auth, Bullieverse).',
'  - cross-links section: 4 .xlink cards using the EXACT hrefs provided in your assignment (label each Playbook / Service / Case study / Page as appropriate). These internal links are mandatory.',
'  - FAQ: 5 <details> items answering what a buyer of THIS service (in this region/vertical) actually asks: what it is / who it is for, cost, which outlets or deliverables, process or timeline, and how to start. First one open. Front-load each answer; 1 inline internal link is good.',
'  - cta-strip <h3>: a topic-relevant headline with one <em> word.',
'',
'VOICE + E-E-A-T (critical):',
'  - First-person senior operator, plain-spoken, specific, confident. Concrete named outlets, real numbers, real time windows.',
'  - NO em dashes (—). Use commas, colons or full stops. Hard rule.',
'  - No buzzword soup, no hype with no proof, no "Here is the uncomfortable truth" openers, no invented statistics, quotes, client names or URLs.',
'  - Accurate pricing anchors: full agency $15K-$45K/mo; fractional senior operator $5K-$12K/mo; launch sprint $15K-$40K; KOL tiers nano $200-$1.5K, micro $500-$5K, mid $10K-$30K, macro $25K-$100K+.',
'  - Real proof points only: RARI (11 tier-1 placements in 24h), MANTRA ($11M raise, CoinDesk exclusive, Middle East RWA), Gaia AI (Forbes "Stripe for AI agents", Decrypt, Benzinga, 6-podcast tour), Fluence (made DePIN a tier-1 beat, Tom Trowbridge CoinDesk Opinion), Web3Auth (Google Cloud x Firebase, multilingual), Bullieverse ($4M seed, India dual-track).',
'  - Two CTAs everywhere: the intent form (#lead) and the Calendly link https://calendly.com/shilikajain/30min/ . Both already in the template; keep them.',
'',
'STEP 4 — JSON-LD: model on the template jsonld with @graph = [Service, BreadcrumbList, FAQPage]. Set @id/url to https://www.shilikajain.com/pages/YOUR-slug, name/serviceType to your service, a fresh description, areaServed appropriate to your region (use ["Global", ...] for global pages), the Person provider block identical, and a FAQPage whose questions/answers EXACTLY match your body FAQ. Valid JSON only (no comments, no trailing commas).',
'',
'WRITE EXACTLY TWO FILES (overwrite if present), then stop:',
].join('\n');

phase('Generate');

const results = await parallel(topics.map((t) => () => {
  const bodyPath = ROOT + '/app/_partials/pages__' + t.slug + '-body.html';
  const jsonPath = ROOT + '/app/_partials/pages__' + t.slug + '-jsonld.json';
  const linkList = (t.links || []).map((l) => '  ' + l).join('\n');
  const prompt = [
    BRIEF,
    '  ' + bodyPath,
    '  ' + jsonPath,
    '',
    '=== YOUR ASSIGNMENT ===',
    'Slug (URL = /pages/' + t.slug + '): ' + t.slug,
    'Page H1 idea (make it punchy with one <em>): ' + t.h1,
    'Meta title: ' + t.title,
    'Standfirst / blurb: ' + t.deck,
    'SERVICE value for the form data-service (use EXACTLY this string): ' + t.service,
    'CATEGORY eyebrow (uppercase): ' + t.cat,
    'Intent: ' + t.intent,
    'Region focus: ' + t.region,
    'Vertical focus: ' + t.vertical,
    'Primary service page: ' + t.servicePage,
    'Cross-link hrefs to use in the 4 xlink cards (mandatory, exact):',
    linkList,
    '',
    'Set the form: data-service="' + t.service + '" data-source="/pages/' + t.slug + '".',
    'When both files are written and valid, return { slug: "' + t.slug + '", ok: true, notes: "<short>" }.',
  ].join('\n');

  return agent(prompt, {
    label: 'lp-' + t.slug,
    phase: 'Generate',
    schema: RESULT_SCHEMA,
    model: 'sonnet',
    effort: 'medium',
  }).then((r) => r || { slug: t.slug, ok: false, notes: 'agent returned null' });
}));

const ok = results.filter((r) => r && r.ok);
const bad = results.filter((r) => !r || !r.ok);
log('generated ' + ok.length + '/' + topics.length + ' landing pages; failures: ' + bad.length);

return {
  total: topics.length,
  ok: ok.length,
  failed: bad.map((r) => ({ slug: r && r.slug, notes: r && r.notes })),
};
