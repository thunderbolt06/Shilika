import type { FreeTool } from './types';

export const SEO_TOOLS: FreeTool[] = [
  {
    slug: 'schema-markup-generator',
    name: 'Schema Markup Generator',
    group: 'seo',
    blurb: 'JSON-LD for FAQ, Article, Person and Organization pages.',
    title: 'Free Schema Markup Generator (JSON-LD)',
    description:
      'Free schema markup generator. Build valid JSON-LD for FAQ, Article, Person and Organization pages with Google checks built in. No signup needed.',
    h1: ['Write ', 'clean', ' schema markup.'],
    intro:
      'Fill in a short form and get JSON-LD you can paste straight into your page. Built for founders who want Google and AI engines to understand who they are.',
    howto: [
      'Pick a schema type: FAQ, Article, Person or Organization.',
      'Fill in the fields. Empty fields are left out of the code.',
      'Copy the script tag into your page and test it in the Rich Results Test.',
    ],
    faqs: [
      {
        q: 'What is schema markup?',
        a: 'Schema markup is structured data, usually written in JSON-LD, that tells search engines what a page is about. It names the author, the organisation, the dates and the questions answered. Google uses it for rich results and AI engines use it to trust and cite a page.',
      },
      {
        q: 'Does schema markup help with ChatGPT and AI Overviews?',
        a: 'It helps engines read your page correctly, which makes it easier to cite. Organization and Person schema with sameAs links tie your brand to one entity. Article schema with an author and dateModified signals a fresh, accountable source.',
      },
      {
        q: 'Do FAQ rich results still show in Google?',
        a: 'Since August 2023 Google shows FAQ rich results mostly for well-known government and health sites. FAQPage markup is still valid and still read by Bing, Perplexity and other AI engines. Keep it if the Q&A is visible on the page.',
      },
    ],
    related: [
      { href: '/playbook/how-to-get-cited-by-chatgpt-2026', label: 'How to get cited by ChatGPT' },
      { href: '/services/founder-profiling', label: 'Founder profiling' },
      { href: '/tools/llms-txt-generator', label: 'llms.txt generator' },
    ],
    category: 'DeveloperApplication',
  },
  {
    slug: 'llms-txt-generator',
    name: 'llms.txt Generator',
    group: 'seo',
    blurb: 'Build an llms.txt file that points AI tools at your best pages.',
    title: 'Free llms.txt Generator for AI Search',
    description:
      'Free llms.txt generator. Write a spec-compliant llms.txt file that points ChatGPT, Claude and Perplexity at your key pages. No signup, runs in your browser.',
    h1: ['Make your site ', 'AI', '-readable.'],
    intro:
      'Create an llms.txt file in the format from llmstxt.org. It gives AI tools a short summary of your site and a list of the pages that matter.',
    howto: [
      'Add your site name, URL and a one-paragraph summary.',
      'Group your key pages into sections with a short note for each link.',
      'Download llms.txt and upload it to your site root.',
    ],
    faqs: [
      {
        q: 'What is llms.txt?',
        a: 'llms.txt is a plain markdown file at the root of a website that summarises the site for large language models. It starts with an H1 name and a blockquote summary, then lists key links under H2 sections. The format was proposed in 2024 at llmstxt.org.',
      },
      {
        q: 'Do ChatGPT and Google actually use llms.txt?',
        a: 'No major engine has confirmed it as a ranking signal as of 2026. Some AI coding tools and agents do read it, and it costs about ten minutes to publish. Treat it as cheap insurance next to the work that matters most: clear pages and earned citations.',
      },
      {
        q: 'What is the difference between llms.txt and llms-full.txt?',
        a: 'llms.txt is a short index with links. llms-full.txt holds the full text of your key pages in one file, so an AI tool can read everything without crawling. Many docs sites publish both.',
      },
    ],
    related: [
      { href: '/playbook/how-to-build-ai-search-visibility-geo-2026', label: 'AI search visibility (GEO)' },
      { href: '/playbook/aeo-vs-seo-startups-2026', label: 'AEO vs SEO for startups' },
      { href: '/tools/robots-txt-sitemap-generator', label: 'Robots.txt and sitemap generator' },
    ],
    category: 'DeveloperApplication',
  },
  {
    slug: 'robots-txt-sitemap-generator',
    name: 'Robots.txt and Sitemap Generator',
    group: 'seo',
    blurb: 'Control AI crawlers and export a clean sitemap.xml.',
    title: 'Free Robots.txt and Sitemap Generator',
    description:
      'Free robots.txt and sitemap.xml generator. Allow or block GPTBot, ClaudeBot, PerplexityBot and other AI crawlers in one click. No signup, no install.',
    h1: ['Decide who ', 'crawls', ' your site.'],
    intro:
      'Build a robots.txt that lets AI search engines cite you while keeping training bots out, if you want. Then turn a list of URLs into a valid sitemap.xml.',
    howto: [
      'Set your default policy and the paths to keep private.',
      'Pick a preset or toggle each AI crawler on or off.',
      'Copy or download robots.txt, then switch tabs to build sitemap.xml.',
    ],
    faqs: [
      {
        q: 'Should I block GPTBot in robots.txt?',
        a: 'GPTBot only collects training data. Blocking it does not remove you from ChatGPT search, which uses OAI-SearchBot and ChatGPT-User. Many brands block GPTBot and allow the search bots so they still get cited.',
      },
      {
        q: 'Does Google-Extended affect my Google rankings?',
        a: 'No. Google-Extended only controls whether your content trains Gemini models. Google Search, including AI Overviews, still uses Googlebot, so blocking Google-Extended has no effect on rankings.',
      },
      {
        q: 'How many URLs can a sitemap hold?',
        a: 'One sitemap file can hold up to 50,000 URLs and 50 MB uncompressed. Larger sites split URLs across several sitemaps and list them in a sitemap index file. Submit the sitemap in Google Search Console and reference it in robots.txt.',
      },
    ],
    related: [
      { href: '/playbook/how-to-get-cited-by-chatgpt-2026', label: 'How to get cited by ChatGPT' },
      { href: '/tools/ai-citability-checker', label: 'AI citability checker' },
      { href: '/services/ai-startup-pr', label: 'AI startup PR' },
    ],
    category: 'DeveloperApplication',
  },
  {
    slug: 'open-graph-preview',
    name: 'Open Graph and Social Card Preview',
    group: 'seo',
    blurb: 'See how a link looks on LinkedIn, X, Slack and WhatsApp.',
    title: 'Free Open Graph Preview and Meta Tag Checker',
    description:
      'Free Open Graph preview tool. See how your link card looks on LinkedIn, X, Facebook, Slack and WhatsApp, fix the tags, and copy them. No signup needed.',
    h1: ['Preview every ', 'share', ' card.'],
    intro:
      'Fetch any page or type the tags by hand and see the share card on each major platform. Catch a missing image or a cut-off title before you post.',
    howto: [
      'Paste a URL and press Fetch, or fill in the fields yourself.',
      'Check the previews and fix anything flagged in red or amber.',
      'Copy the generated meta tags into your page head.',
    ],
    faqs: [
      {
        q: 'What size should an Open Graph image be?',
        a: 'Use 1200 x 630 pixels, a 1.91:1 ratio, and keep the file under 5 MB. Keep text and logos away from the edges because some platforms crop to a square. Serve it over https.',
      },
      {
        q: 'Why is LinkedIn showing an old preview of my link?',
        a: 'LinkedIn caches link previews for about seven days. Paste the URL into the LinkedIn Post Inspector to force a fresh scrape. Facebook has a similar Sharing Debugger.',
      },
      {
        q: 'Do I need Twitter card tags if I have Open Graph tags?',
        a: 'X falls back to og:title, og:description and og:image, but it still needs twitter:card to pick a layout. Without it you may get a small summary card instead of the large image. Add twitter:card="summary_large_image" for the big format.',
      },
    ],
    related: [
      { href: '/playbook/linkedin-strategy-founders-2026', label: 'LinkedIn strategy for founders' },
      { href: '/services/content-writing', label: 'Content writing' },
      { href: '/tools/schema-markup-generator', label: 'Schema markup generator' },
    ],
    category: 'DeveloperApplication',
  },
  {
    slug: 'keyword-density-checker',
    name: 'Keyword Density Checker',
    group: 'seo',
    blurb: 'Count keywords and phrases and spot stuffing before you publish.',
    title: 'Free Keyword Density Checker',
    description:
      'Free keyword density checker. See top words and 2 to 3 word phrases, check your target keyword density and catch keyword stuffing. No signup required.',
    h1: ['Check your ', 'keyword', ' balance.'],
    intro:
      'Paste a draft and see which words and phrases it leans on. Add a target keyword to check its density and where it first appears.',
    howto: [
      'Paste your text into the box.',
      'Add the keyword or phrase you want to rank for.',
      'Review density and the phrase tables, then edit until it reads naturally.',
    ],
    faqs: [
      {
        q: 'What is a good keyword density?',
        a: 'Most pages that rank well use the main keyword at 0.5% to 2.5% of total words. Above 3% the copy usually reads as stuffed. Google has said there is no ideal number, so use density as a sanity check, not a target.',
      },
      {
        q: 'Is keyword stuffing still penalised?',
        a: "Yes. Google's spam policies list keyword stuffing as a violation, and its systems can demote pages that repeat terms unnaturally. AI answer engines also skip copy that reads like it was written for a crawler.",
      },
      {
        q: 'Where should my main keyword appear?',
        a: 'Put it in the title tag, the H1 and the first 100 words. Use it again in one or two subheadings and the meta description. After that, write naturally and use related terms.',
      },
    ],
    related: [
      { href: '/playbook/aeo-vs-seo-startups-2026', label: 'AEO vs SEO for startups' },
      { href: '/services/content-writing', label: 'Content writing' },
      { href: '/tools/readability-checker', label: 'Readability checker' },
    ],
    category: 'BusinessApplication',
  },
  {
    slug: 'ai-citability-checker',
    name: 'AI Citability Checker',
    group: 'seo',
    blurb: 'Score a page on how likely ChatGPT and Perplexity are to cite it.',
    title: 'Is My Site AI-Citable? Free Checker',
    description:
      'Free AI citability checker. Score any page for ChatGPT, Perplexity and AI Overviews on crawler access, schema, structure and trust, with top fixes. No signup.',
    h1: ['Can AI ', 'cite', ' your site?'],
    intro:
      'Enter a URL and get a 0 to 100 score for how ready the page is to be quoted by AI search engines. Every failed check comes with a one-line fix.',
    howto: [
      'Paste the URL of a page you want AI engines to cite.',
      'Press Check and wait a few seconds for the scan.',
      'Start with the top three fixes, then re-check the page.',
    ],
    faqs: [
      {
        q: 'How do I get my website cited by ChatGPT?',
        a: 'Let OAI-SearchBot and ChatGPT-User crawl your site, answer questions directly in the first paragraph, and use clear headings and schema. Then earn mentions on sites ChatGPT already trusts, such as trade press and review sites. Earned coverage drives most citations.',
      },
      {
        q: 'Does blocking AI crawlers hurt my visibility?',
        a: 'Blocking search and user bots like OAI-SearchBot, PerplexityBot and Claude-User removes you from their answers. Blocking training bots like GPTBot or CCBot does not affect live search citations. Decide per bot, not with one blanket rule.',
      },
      {
        q: 'What makes a page easy for AI to quote?',
        a: 'A direct 30 to 80 word answer near the top, question-style headings, lists or tables, a named author and a recent update date. Pages with at least 600 words and two or more cited sources tend to perform better.',
      },
    ],
    related: [
      { href: '/playbook/how-to-get-cited-by-chatgpt-2026', label: 'How to get cited by ChatGPT' },
      { href: '/playbook/how-to-build-ai-search-visibility-geo-2026', label: 'AI search visibility (GEO)' },
      { href: '/services/ai-startup-pr', label: 'AI startup PR' },
    ],
    category: 'BusinessApplication',
  },
  {
    slug: 'readability-checker',
    name: 'Readability Score Checker',
    group: 'seo',
    blurb: 'Flesch, grade level, long sentences and passive voice in one view.',
    title: 'Free Readability Score Checker (Flesch)',
    description:
      'Free readability checker. Get Flesch Reading Ease, grade level, Gunning Fog and SMOG scores, and highlight long sentences and passive voice. No signup.',
    h1: ['Make it ', 'easy', ' to read.'],
    intro:
      'Paste any draft and see how hard it is to read, with six standard scores. Long sentences and passive voice are highlighted so you know what to cut.',
    howto: [
      'Paste your text into the box.',
      'Read the grade level and Flesch score.',
      'Fix highlighted sentences until the grade is 8 or lower.',
    ],
    faqs: [
      {
        q: 'What is a good Flesch Reading Ease score?',
        a: 'Aim for 60 to 70 for general web copy, which matches plain English that most adults read easily. Scores above 80 are very easy. Below 50 reads like academic or legal text.',
      },
      {
        q: 'What grade level should website copy be?',
        a: 'Grade 7 to 9 suits most websites, landing pages and press releases. Technical buyers can handle grade 10 to 12, but shorter sentences still convert better. Many top news outlets write at around grade 8.',
      },
      {
        q: 'Does readability affect SEO?',
        a: 'Readability is not a direct Google ranking factor. Clear copy keeps readers on the page longer and is easier for AI engines to quote as a direct answer. Both help indirectly.',
      },
    ],
    related: [
      { href: '/services/content-writing', label: 'Content writing' },
      { href: '/playbook/how-to-write-crypto-press-release-2026', label: 'How to write a crypto press release' },
      { href: '/tools/keyword-density-checker', label: 'Keyword density checker' },
    ],
    category: 'BusinessApplication',
  },
];
