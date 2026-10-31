import type { Program } from './types';

export const prWorkshopForAiFounders: Program = {
  slug: 'pr-workshop-for-ai-founders',
  title: 'PR workshop for AI founders: category narrative, claims discipline, tech press and AI search',
  cardTitle: 'PR workshop for AI founders',
  metaTitle: 'PR Workshop for AI Founders: Narrative, Claims & Press',
  metaDescription:
    'PR workshop for AI startup founders by Shilika Jain: category narrative, benchmark claims, tech press, funding news and AI search. 1-hour, 3-day or 6-module.',
  deck: 'Practical PR for AI startups, built on the founder visibility run that took GAIA into Forbes, Decrypt and Benzinga.',
  answer:
    'The PR workshop for AI founders is practical PR training for AI startup founders and early operators. It covers category narrative over model specs, benchmark and claims discipline, mainstream tech versus trade press, founder visibility, funding announcements, AI search citations and trust and safety questions. It runs as a one-hour masterclass, a three-day workshop or a six-module course.',
  kind: 'Workshop',
  primaryAudience: 'operators',
  audiences: ['operators', 'c-suite', 'students'],
  bestFor: 'Pre-seed to Series A AI founders and the first hire who will own comms.',
  outcomes: [
    'Replace a spec-led pitch with a category narrative a non-technical reporter can repeat.',
    'Build a claims sheet that backs every benchmark, accuracy figure and "first" with evidence you would show a journalist.',
    'Turn one announcement into two pitches: one for mainstream tech press, one for trade press.',
    'Plan 90 days of founder interviews, podcasts, commentary and a funding announcement around one narrative.',
    'Check what ChatGPT, Perplexity and Google AI Overviews say about your category and fix the sources they pull from.',
    'Answer trust and safety questions on data, privacy, errors and misuse in writing before a reporter asks.',
  ],
  proof: [
    {
      text: 'Ran founder-led visibility for GAIA from Dec 2024 to Apr 2025: podcasts and interviews that compounded into Forbes, Decrypt and Benzinga.',
      href: '/work/gaia-ai',
    },
    {
      text: 'Placed Fluence co-founder Tom Trowbridge as a DePIN voice, from a CoinDesk op-ed in April 2025 to newsjacking the global Microsoft outage in e27.',
      href: '/work/fluence',
    },
    {
      text: 'Sat on the other side of the table too, interviewing founders for CryptoDaily UK at TOKEN2049 and Solana Breakpoint in 2024.',
    },
    {
      text: 'Ran a PR workshop for the XRPL Labs Accelerator with Tenity (Jul 2025) and advised founders on PR while judging a Stellar cohort run by Myosin (May 2026).',
    },
  ],
  quote: {
    text: 'So many AI companies raise big rounds and still have bad PR.',
    href: 'https://x.com/Shilika_jain/status/2055524495641985466',
    date: 'May 2026',
  },
  masterclass: {
    summary:
      'One deck that moves an AI founder from "we have a great model" to a one-page PR plan a reporter would take seriously. Built for accelerator demo weeks and founder sessions where the room has an hour and a launch coming up.',
    slides: [
      { title: 'Your model is not the story', point: 'Reporters rarely cover parameter counts. They cover what changes for their readers, so lead with the problem your AI removes and who it removes it for.', minutes: 4 },
      { title: 'Category narrative over spec sheet', point: 'Pick one phrase for the category you want to be named in and argue for it everywhere. GAIA\'s press ran on decentralized AI agents, not a feature list.', minutes: 5 },
      { title: 'The claim you can defend', point: 'What breaks in today\'s AI stack, what you\'re betting on, and one number a reporter can check. If you can\'t back the number, it isn\'t ready to pitch.', minutes: 5 },
      { title: 'Benchmarks are claims, not headlines', point: 'Someone will try to break every benchmark you publish. State the test, the date, what you compared against and where the result stops holding.', minutes: 5 },
      { title: 'Words that get you fact-checked', point: '"First", "only", "human-level" and "replaces" invite scrutiny. Use them only when you can hand a reporter the evidence the same day.', minutes: 4 },
      { title: 'Two press maps, one announcement', point: 'Mainstream tech press wants the market, the money and a founder who talks plainly. Trade press wants the technical detail. Same news, two different pitches.', minutes: 5 },
      { title: 'Founder visibility compounds', point: 'GAIA\'s founders did interviews and podcasts from Dec 2024 to Apr 2025 around one narrative. That body of work is what Forbes, Decrypt and Benzinga could find and build on.', minutes: 5 },
      { title: 'A number beats an adjective', point: 'GAIA used node count as proof, and Binance Square ran it as 400K nodes in April 2025. Give reporters one figure they can repeat without checking your deck.', minutes: 4 },
      { title: 'Funding is a story, not a template', point: '"Raised $X to build the leading AI platform" is a one-day story. MANTRA\'s $11M ran wider in CoinDesk because it carried a category word and a regional angle.', minutes: 5 },
      { title: 'Comment on the AI news cycle', point: 'When a big launch or outage dominates the day, a founder with a sharp view gets quoted. Fluence tied the Microsoft outage to decentralized compute in e27; Magna\'s Worldcoin commentary got a B2B brand into Decrypt.', minutes: 4 },
      { title: 'Be the source AI engines cite', point: 'ChatGPT, Perplexity and Google AI Overviews lean on earned coverage and clear, answer-first pages. Use the same category phrase on your site, in bios and in every interview.', minutes: 5 },
      { title: 'Trust and safety questions are coming', point: 'Training data, consent, privacy, wrong answers and misuse will come up in interviews. Write your answers before the first one, and reply to investigative reporters sooner rather than later.', minutes: 5 },
      { title: 'Your one-page AI PR plan', point: 'Category phrase, claims sheet, two press maps, three stories for the next 90 days and a trust and safety Q&A. Filled in before people leave the room.', minutes: 4 },
    ],
  },
  workshop: {
    summary:
      'Three days that end with an AI founder holding a narrative one-pager, a claims sheet, two media lists, a funding announcement draft and a trust and safety Q&A. Built for AI accelerator cohorts and founding teams with a raise or launch inside the next quarter.',
    days: [
      {
        day: 1,
        theme: 'Narrative and claims discipline',
        sessions: [
          { time: '09:30 to 11:00', title: 'How AI news gets made', detail: 'What a tech reporter filters for in the first few lines, why spec-led pitches go unanswered, and how earned, sponsored and paid placements differ. Bullieverse is the warning: its CoinDesk piece was sponsored, not earned.' },
          { time: '11:15 to 12:45', title: 'Category phrase lab', detail: 'Each founder writes the phrase they want reporters and AI engines to attach to their company. The room checks it against what outlets already cover and cuts anything nobody searches for.' },
          { time: '13:45 to 15:15', title: 'Claims audit', detail: 'Go through the website, deck and launch copy line by line. Flag every "first", "only", benchmark and accuracy figure, then attach evidence or cut it.' },
          { time: '15:30 to 17:00', title: 'Benchmark disclosure', detail: 'Write a short methods note for your headline result: test set, date, baseline and limits. Then explain the result to a non-technical reporter in two sentences.' },
        ],
        deliverable: 'A narrative one-pager and a claims sheet with evidence behind every number you plan to say in public.',
      },
      {
        day: 2,
        theme: 'Press, founder voice and funding',
        sessions: [
          { time: '09:30 to 11:00', title: 'Two press maps', detail: 'Build a mainstream tech list (TechCrunch, The Information, VentureBeat, Forbes) and a trade list for your sector from the bylines of the last 90 days. Note each reporter\'s last relevant story.' },
          { time: '11:15 to 12:45', title: 'Founder visibility plan', detail: 'Use GAIA as the worked example: interviews, podcasts and commentary from Dec 2024 to Apr 2025 around one narrative. Map your own 90 days of appearances the same way.' },
          { time: '13:45 to 15:15', title: 'Funding announcement clinic', detail: 'Pick the angle beyond the round size, decide between an exclusive and a wide release, set the embargo, and decide what investor and customer quotes add. Write the first paragraph until it stands alone.' },
          { time: '15:30 to 17:00', title: 'Reactive commentary', detail: 'Take this week\'s biggest AI story and write a 100-word expert comment a reporter could quote today. Fluence and Magna show how commentary on someone else\'s news earns a slot.' },
        ],
        deliverable: 'Two tiered media lists, a 90-day founder visibility calendar and a funding announcement draft.',
      },
      {
        day: 3,
        theme: 'AI search and trust',
        sessions: [
          { time: '09:30 to 11:00', title: 'AI search baseline', detail: 'Ask ChatGPT, Perplexity and Google AI Overviews the questions your buyers ask about your category. Record who gets named and which sources get cited.' },
          { time: '11:15 to 12:45', title: 'Citable pages', detail: 'Rewrite the homepage, about page and FAQ answer-first. Align the category phrase across founder bios, profiles and press kit so every source says the same thing.' },
          { time: '13:45 to 15:15', title: 'Trust and safety press drill', detail: 'A mock interview on training data, privacy, wrong outputs, misuse and jobs, with investigative follow-ups. Each founder reviews the recording against their written answers.' },
          { time: '15:30 to 17:00', title: '90-day AI PR plan', detail: 'Sequence three stories, set who signs off on claims and quotes, and agree the numbers that show PR is working: AI search citations, inbound from buyers and investor replies.' },
        ],
        deliverable: 'An AI search baseline, a trust and safety Q&A, a recorded mock interview and a 90-day AI PR plan.',
      },
    ],
  },
  course: {
    summary:
      'Six modules, each with its own deck, a hands-on activity and a three-question quiz. AI founders finish with a capstone: a launch or funding pack reviewed line by line, with every claim checked.',
    cadence: '6 weekly modules. 90 minutes live, plus about 2 hours of activity work per week.',
    modules: [
      {
        title: 'Module 1: Category narrative over model specs',
        deck: 'Deck 1: Why reporters skip the spec sheet',
        summary: 'Why AI pitches that lead with parameters, architecture or benchmark tables rarely get answered, and how to replace them with a category narrative. Uses GAIA\'s decentralized AI agents narrative as the worked example.',
        activity: 'Collect the last ten AI stories in your category. For each, write down the phrase the reporter used to describe the category and whether any spec appeared above the fold. Then draft your own category phrase.',
        quiz: [
          { q: "Which pitch opening is most likely to get a reply from a mainstream tech reporter?", options: ["The customer problem the product removes and who has it", "The model's parameter count and architecture", "A list of the startup's investors", "The team's academic publications"], answer: 0, why: "A mainstream reporter writes for readers who care what changes for them. Specs can support the story, but they rarely open it." },
          { q: "What is a category narrative?", options: ["A full list of product features", "An advertising tagline", "A phrase and an argument about where the market is going that the company wants to be named for", "A technical whitepaper"], answer: 2, why: "A category narrative gives reporters and AI engines a slot to put you in. Features change every release; the category argument holds." },
          { q: "What was GAIA's coverage organized around?", options: ["Leaderboard benchmark scores", "A celebrity investor", "A token price target", "One narrative, decentralized AI agents, with node count as proof"], answer: 3, why: "One consistent narrative plus one checkable number gave reporters across Forbes, Decrypt and Benzinga the same story to build on." },
        ],
      },
      {
        title: 'Module 2: Benchmarks and claims discipline',
        deck: 'Deck 2: Benchmarks, demos and the words that get fact-checked',
        summary: 'How to talk about benchmarks, accuracy and demos without overclaiming. Covers the words that trigger scrutiny, how to write a methods note, and what to do when a reporter asks for evidence you can\'t share.',
        activity: 'Audit your website, deck and last announcement. List every claim with a number or a superlative, attach the evidence, and rewrite or cut each claim you can\'t support.',
        quiz: [
          { q: "You beat a competitor on one public benchmark. What is the most defensible way to say it?", options: ["\"The most accurate model in the world\"", "The score, the benchmark, the test date, the models compared and the known limits", "\"Industry-leading accuracy\"", "Leave benchmarks out of all press"], answer: 1, why: "A specific, dated, scoped claim survives a fact-check. A superlative invites someone to find the test you lose." },
          { q: "Which word in a launch release is most likely to draw a fact-check?", options: ["\"Launches\"", "\"Available\"", "\"First\"", "\"Partners with\""], answer: 2, why: "\"First\" is a factual claim a reporter can disprove with one search. Use it only with proof ready to send." },
          { q: "A reporter asks for the evaluation set behind your accuracy figure, and you can't share it. What is the best response?", options: ["Explain what you can share (method, size, date) and why the rest stays private", "Ignore the request", "Repeat the figure more firmly", "Ask the reporter to drop the number"], answer: 0, why: "Being open about method and honest about limits keeps trust. Silence or pressure usually ends up in the story." },
        ],
      },
      {
        title: 'Module 3: Mainstream tech press vs trade press',
        deck: 'Deck 3: Two press maps for one announcement',
        summary: 'What mainstream tech outlets such as TechCrunch, The Information, VentureBeat and Forbes look for, how that differs from sector and developer trade press, and how to cut one announcement into two pitches.',
        activity: 'Build two lists of 15 reporters each from bylines in the last 90 days. Write one pitch for each list on the same news and compare what changed.',
        quiz: [
          { q: "Your news is an inference speed-up that matters mostly to developers. Where does the first pitch go?", options: ["A general business outlet's markets desk", "A lifestyle magazine", "Every outlet at once", "A trade or developer publication, or a reporter who covers AI infrastructure"], answer: 3, why: "Technical news lands first where readers understand why it matters. Wider coverage can follow once there is a story about the market." },
          { q: "What does a mainstream tech reporter usually need that a trade reporter might not?", options: ["The full benchmark table", "Market context, why now, who pays, and a founder who speaks plainly", "Access to the source code", "A zipped press kit"], answer: 1, why: "Mainstream readers need the business story. The technical detail supports it but rarely carries it." },
          { q: "What is the best source for an AI media list?", options: ["Reporters who wrote about your category in the last 90 days", "A purchased database export", "Every AI editor at the ten biggest outlets", "Your investors' press contacts only"], answer: 0, why: "A reporter who covered your category recently already has a reason to care. Generic lists produce generic silence." },
        ],
      },
      {
        title: 'Module 4: Founder visibility',
        deck: 'Deck 4: Interviews, podcasts and commentary that compound',
        summary: 'How a steady run of founder interviews, podcasts and quick commentary builds the body of work tier-1 reporters look for. Walks through GAIA from Dec 2024 to Apr 2025 and the Fluence and Magna newsjacking examples.',
        activity: 'Plan 90 days of founder appearances around your category phrase: target podcasts, two op-ed ideas and a list of news events you could comment on. Write one 100-word comment on this week\'s AI news.',
        quiz: [
          { q: "Why did GAIA's founder interviews compound into tier-1 coverage?", options: ["One large press release", "Paid placements", "A steady cadence of interviews around one narrative that reporters could find", "A rebrand halfway through"], answer: 2, why: "Each interview added to a searchable record of the founder saying the same thing well. Reporters build on that." },
          { q: "A major model launch dominates today's news. What is the best move for an early AI founder?", options: ["Stay quiet until it passes", "Issue a release about your own roadmap", "Post a meme about it", "Send a short, specific expert take to reporters covering it, within hours"], answer: 3, why: "Reporters need informed voices on the day. Magna's Worldcoin commentary got a B2B brand into Decrypt this way." },
          { q: "Which podcasts tend to help an early AI founder most?", options: ["The biggest show, regardless of audience", "Shows whose listeners are your buyers, investors or developers", "Any show that charges for a slot", "Video-only shows"], answer: 1, why: "Fit beats reach early on. A small show your buyers listen to does more than a big one they skip." },
        ],
      },
      {
        title: 'Module 5: Funding announcements and launches',
        deck: 'Deck 5: Raises and launches that run longer than a day',
        summary: 'How to give a funding round or launch an angle beyond the number, when to offer an exclusive, how embargoes work, and why earned and sponsored placements are not the same result.',
        activity: 'Draft the announcement for your next raise or launch: angle, target outlet for an exclusive, embargo time, first paragraph and two quotes that each say something new.',
        quiz: [
          { q: "Which funding angle gives a reporter the most to work with?", options: ["\"Raised $X to build the leading AI platform\"", "A list of every investor", "The round, the specific problem it funds and one proof point or market angle", "The founder's favourite quote about the future"], answer: 2, why: "MANTRA's $11M ran wider because it carried a category word and a regional angle. A number alone is a one-day story." },
          { q: "Why does it matter whether a funding story was earned or sponsored?", options: ["Sponsored pieces are labelled and carry less weight with readers, investors and editors", "It makes no difference", "Sponsored pieces always rank higher", "Earned pieces cost more"], answer: 0, why: "Bullieverse's raise ran in Economic Times and Inc42, while its CoinDesk piece was sponsored content. Know which is which before you quote either in a deck or a pitch." },
          { q: "When does offering an exclusive make sense?", options: ["Offer it to five outlets at once", "After the news is already public", "Never", "Offer it to the single best-fit outlet, then go wider after it runs"], answer: 3, why: "An exclusive is a private offer to one reporter. Offering it to several, or after a public release, removes what made it worth taking." },
        ],
      },
      {
        title: 'Module 6: AI search citations and trust and safety questions',
        deck: 'Deck 6: Getting cited by AI engines and answering the hard questions',
        summary: 'How ChatGPT, Perplexity and Google AI Overviews decide whom to name, how GEO and AEO work for an AI startup, and how to prepare written answers on data, privacy, errors and misuse before a reporter asks.',
        activity: 'Run an AI search baseline on five category questions and log the sources cited. Then write a one-page trust and safety Q&A and test it in a mock interview.',
        quiz: [
          { q: "What is a sensible first step in GEO or AEO for an AI startup?", options: ["Buy backlinks in bulk", "Ask AI engines your category questions and record which sources they cite", "Redesign the logo", "Publish 100 auto-generated blog posts"], answer: 1, why: "You can't fix what you haven't measured. The cited sources show which outlets and pages to earn or improve." },
          { q: "An investigative journalist has emailed three times with specific questions about your training data. What should you do?", options: ["Answer sooner rather than later with what you can confirm, in writing", "Ignore it and hope it goes away", "Threaten legal action", "Post a rebuttal on X first"], answer: 0, why: "Repeated, specific questions mean the story is being written. A clear, early answer is your best chance to shape it." },
          { q: "Which habit most helps AI engines name your company for a category query?", options: ["New positioning every quarter", "Hiding product details behind a demo form", "The same category phrase across your site, bios and earned coverage", "Stuffing keywords into the footer"], answer: 2, why: "AI engines name companies that many credible sources describe the same way. Consistency is what they can ground an answer on." },
        ],
      },
    ],
    capstone:
      'A launch or funding pack for one real announcement: narrative one-pager, claims sheet with evidence, two media lists, two pitches, a release draft, an AI search baseline and a trust and safety Q&A. Shilika reviews each pack line by line, starting with the claims.',
  },
  tailoring: {
    students:
      'For computer science, business and journalism students the program uses public AI launches and the GAIA case study instead of their own company. The capstone is a claims sheet and press plan for an AI startup they pick, with extra time on how tech reporters verify claims.',
    'c-suite':
      'For AI company executives the list-building sessions shrink and claims sign-off, trust and safety interview drills and funding announcement roles grow. The prep mirrors the founder interview work behind GAIA and Fluence, and the capstone is a recorded interview plus a claims approval process.',
    operators:
      'For AI founders and first comms hires every exercise uses their own product, benchmarks and target outlets. They leave with a claims sheet, two pitches ready to send and a funding or launch draft.',
  },
  faqs: [
    {
      q: 'What does a PR workshop for AI founders cover?',
      a: 'Category narrative over model specs, benchmark and claims discipline, mainstream tech versus trade press, founder visibility, funding announcements, AI search citations and trust and safety questions from reporters. Each session uses the founder\'s own company.',
    },
    {
      q: 'How is PR for AI startups different from general startup PR?',
      a: 'AI founders face more fact-checking on benchmarks and claims, tougher questions on data and safety, and buyers who research through ChatGPT and Perplexity. The workshop spends most of its time on those three problems.',
    },
    {
      q: 'Can PR training help my AI startup show up in ChatGPT answers?',
      a: 'It teaches you to measure what AI engines say about your category, which sources they cite, and how to make your pages and coverage easier to cite. Results depend on your coverage and consistency over time.',
    },
    {
      q: 'Will the workshop get my AI startup into TechCrunch?',
      a: 'No workshop can honestly promise placement. You leave with pitches built for the right reporters and claims that hold up. Coverage depends on your news and your timing.',
    },
    {
      q: 'Is the AI founder PR workshop online or in person?',
      a: 'Both. The one-hour masterclass and the six-module course work well online. The three-day workshop works best in person, for example inside an accelerator week or a team offsite.',
    },
    {
      q: 'How is the PR workshop for AI founders priced?',
      a: 'Pricing is quoted per cohort, based on format, group size and location. Student and non-profit sessions are often considered pro bono. Book a call to scope it.',
    },
  ],
  related: [
    { href: '/services/ai-startup-pr', label: 'AI startup PR' },
    { href: '/work/gaia-ai', label: 'GAIA case study: founder-led AI visibility' },
    { href: '/playbook/ai-startup-pr-2026', label: 'PR strategy for AI startups in 2026' },
    { href: '/playbook/ai-series-a-funding-announcement-pr-2026', label: 'AI Series A funding announcement PR' },
    { href: '/glossary/what-is-geo-generative-engine-optimization', label: 'What is GEO (generative engine optimization)?' },
    { href: '/courses/founder-pr-course', label: 'Founder PR course' },
  ],
  keywords: [
    'PR workshop for AI founders',
    'practical PR workshop for AI founders',
    'PR for AI startups training',
    'AI startup PR training',
    'AI funding announcement PR',
    'AI benchmark claims PR',
    'GEO for AI startups',
  ],
  about: ['Public relations', 'Artificial intelligence', 'Startup company', 'Media relations', 'Generative engine optimization'],
  datePublished: '2026-10-31',
  dateModified: '2026-10-31',
};
