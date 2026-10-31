import type { Program } from './types';

export const publicRelationsWorkshopForStudents: Program = {
  slug: 'public-relations-workshop-for-students',
  title: 'Public relations workshop for students: how PR, newsrooms and reputation actually work',
  cardTitle: 'PR fundamentals workshop for students',
  metaTitle: 'Public Relations Workshop for Students | PR Fundamentals',
  metaDescription:
    'A PR fundamentals workshop for college students by Shilika Jain: newsrooms, earned vs paid media, ethics, PR careers and AI search. 1-hour, 3-day or 6-module.',
  deck: "The ideas behind the job: what PR is, how newsrooms decide, where the ethical lines sit and how careers in comms start.",
  answer:
    "The public relations workshop for students is a PR fundamentals program for university and college students. It covers what PR is, how newsrooms pick stories, earned versus paid media, ethics and disclosure, PR careers and how AI search changes the work. It runs as a one-hour masterclass, a three-day workshop or a six-module course.",
  kind: 'Workshop',
  primaryAudience: 'students',
  audiences: ['students', 'operators', 'c-suite'],
  bestFor: 'Mass communication, journalism, business and marketing students meeting PR for the first time.',
  outcomes: [
    'Explain the difference between PR, marketing and advertising in two sentences each.',
    'Look at any article and say whether it is earned, owned, sponsored or paid, and how you can tell.',
    'Describe how an editor decides what runs, from the pitch inbox to the published story.',
    'Spot a disclosure problem in a sponsored post, a paid KOL campaign or a ghostwritten op-ed.',
    'Map the main PR career paths: agency, in-house, corporate comms, investor relations and public affairs.',
    'Trace which outlets an AI assistant cites when it answers a question about a brand.',
  ],
  proof: [
    {
      text: 'Taught "Mastering the ABCs of Web3 PR" at India Blockchain Week 2024 and moderated its PR panel.',
      href: 'https://lu.ma/mpt4119r',
    },
    {
      text: 'Spoke to students at SJCC, Bengaluru, on Web3 and blockchain in August 2026.',
      href: 'https://x.com/Shilika_jain/status/2089950553740816776',
    },
    {
      text: 'Ran a PR workshop for the XRPL Labs Accelerator with Tenity and presented in the Myosin Learns series.',
      href: 'https://x.com/Shilika_jain/status/1943244949035847987',
    },
    {
      text: 'Has worked both sides of the interview: APAC PR lead at Myosin, previously at CoinMarketCap, and an interviewer for CryptoDaily UK at TOKEN2049 and Solana Breakpoint.',
    },
  ],
  quote: {
    text: "PR isn't magic. It works over the long term, through relationships and ongoing conversations with journalists.",
    href: 'https://x.com/Shilika_jain/status/1684288075827150848',
    date: 'Jul 2023',
  },
  masterclass: {
    summary:
      "One deck that gives a lecture hall the mental model of PR in an hour. Built for guest slots in mass communication, journalism and business programs, where students want to know what the job is before they choose it.",
    slides: [
      { title: 'What PR is not', point: "PR isn't buying articles, sending press releases into the void or posting more on X. It's earning attention from people you don't pay.", minutes: 4 },
      { title: 'What PR is', point: 'PR is managing the relationship between an organisation and the people whose opinion shapes it: reporters, customers, investors, regulators and staff.', minutes: 5 },
      { title: 'PR, marketing, advertising', point: "Advertising is space you buy. Marketing is the whole job of selling. PR is reputation you earn through third parties who don't work for you.", minutes: 5 },
      { title: 'Earned, owned, paid', point: 'Earned is a story an editor chose to run. Owned is your blog and channels. Paid is anything you bought, including sponsored articles that look like news.', minutes: 4 },
      { title: 'How a newsroom decides', point: 'An editor asks three things: is it new, does it matter to our readers, and can we prove it. A story that fails any one of them gets cut.', minutes: 5 },
      { title: 'Journalists serve readers', point: "A reporter is paid by the publication, not by the company in the story. That's why earned coverage carries weight and why you can't order it.", minutes: 5 },
      { title: 'Spot the sponsored story', point: "Bullieverse's $4M raise ran as earned news in Economic Times, Inc42 and YourStory. Its CoinDesk piece was sponsored. Same news, two very different signals.", minutes: 4 },
      { title: 'Ethics and disclosure', point: 'If money changed hands, the reader deserves to know. Undisclosed paid posts, fake reviews and invented quotes break trust and, in many markets, the law.', minutes: 5 },
      { title: 'Research can be news', point: "Elastos commissioned research showing 67% of Nigerians trusted Bitcoin for life savings over traditional methods, and Cryptonews ran the finding as its own story. Original data gives reporters something new to cover.", minutes: 4 },
      { title: 'Comms is more than media', point: 'Corporate communications covers media, internal comms, investor relations, crisis and public affairs. Press is one channel out of five.', minutes: 5 },
      { title: 'Careers in PR', point: 'Most people start at an agency or in-house as an associate, learning to research reporters and draft copy. Writing and judgment move you up, not job titles.', minutes: 4 },
      { title: 'AI search changes the job', point: 'ChatGPT, Perplexity and Google AI Overviews answer questions by citing articles. The outlets that cover a brand now shape what AI tells people about it.', minutes: 4 },
      { title: 'Your PR lens', point: 'Leave with four questions for any story you read: who earned it, who paid, who benefits, and what would an AI assistant repeat from it.', minutes: 6 },
    ],
  },
  workshop: {
    summary:
      "Three days of PR fundamentals for a university immersion week. Students study real coverage, sit in the editor's chair, argue through ethics cases and map their own career path. It's conceptual by design. The hands-on writing and pitching lab is the practical PR workshop for students.",
    days: [
      {
        day: 1,
        theme: 'What PR is and how media works',
        sessions: [
          { time: '09:30 to 11:00', title: 'PR in one definition', detail: "Students write their own definition of PR, then test it against ten real examples. Most first drafts describe advertising. By the end of the session they don't." },
          { time: '11:15 to 12:45', title: 'PR, marketing and advertising sort', detail: "Groups sort 30 real brand activities into PR, marketing or advertising and defend the edge cases, such as a sponsored podcast or a paid KOL thread." },
          { time: '13:45 to 15:15', title: 'Inside a newsroom', detail: 'Roles from reporter to editor, how a story gets assigned, what a news meeting sounds like and why most pitches never get a reply.' },
          { time: '15:30 to 17:00', title: "The editor's chair", detail: "Students act as editors of a business desk. They get 20 incoming pitches, pick three to run and explain what made the other 17 fail." },
        ],
        deliverable: "A one-page definition of PR in the student's own words, plus a ranked list of what made pitches run or fail in the editor exercise.",
      },
      {
        day: 2,
        theme: 'Earned media, credibility and ethics',
        sessions: [
          { time: '09:30 to 11:00', title: 'Earned, owned, sponsored, paid', detail: "How to tell them apart on the page: bylines, labels, disclosure lines and where the article sits on the site. The Bullieverse raise shows earned and sponsored coverage of the same news." },
          { time: '11:15 to 12:45', title: 'Coverage teardown', detail: 'Each group takes one real campaign, such as RARI Chain in CoinDesk, The Block and Cointelegraph the same week, and maps the outlets, the angle and why it ran.' },
          { time: '13:45 to 15:15', title: 'Ethics and disclosure cases', detail: 'Six short cases: an undisclosed paid post, a ghostwritten op-ed, an exaggerated user number, an embargo break, a request to delete a story, a journalist offered a gift.' },
          { time: '15:30 to 17:00', title: 'Debate: should this have run?', detail: 'Teams argue for and against publishing in two of the cases. The rest of the room votes, then hears what disclosure rules would actually require.' },
        ],
        deliverable: 'A coverage audit of one real campaign and a short ethics memo explaining the call on one disclosure case.',
      },
      {
        day: 3,
        theme: 'Careers, corporate comms and AI search',
        sessions: [
          { time: '09:30 to 11:00', title: 'The five jobs inside comms', detail: 'Media relations, internal comms, investor relations, crisis and public affairs. What each one does on a Tuesday and which skills it rewards.' },
          { time: '11:15 to 12:45', title: 'How PR careers start', detail: "Agency versus in-house, generalist versus sector specialist, and how a portfolio of writing beats a list of courses. Shilika's own route from Toastmasters to CoinMarketCap and Myosin is one example, not a template." },
          { time: '13:45 to 15:15', title: 'AI search audit', detail: 'Students ask ChatGPT and Perplexity about a brand they know, then trace every outlet cited in the answers. They compare that list with what the brand publishes itself.' },
          { time: '15:30 to 17:00', title: 'The PR lens and next steps', detail: 'Students present their audit findings, then plan the next step: an internship, a student publication, or the practical PR workshop where they write and pitch.' },
        ],
        deliverable: 'A personal comms career map and an AI search audit showing which outlets shape what assistants say about one brand.',
      },
    ],
  },
  course: {
    summary:
      'Six modules for a semester elective or a student society. Each module has a slide deck, an analytical activity and a short quiz. The capstone is a reputation audit of a real organisation.',
    cadence: '6 weekly modules. 75 minutes live, plus about 90 minutes of reading and activity work per week.',
    modules: [
      {
        title: 'Module 1: What public relations is',
        deck: 'Deck 1: PR, marketing, advertising and reputation',
        summary: "What PR is responsible for, how it differs from marketing and advertising, and why reputation is built by people the organisation doesn't control.",
        activity: 'Collect ten brand activities from one week of news and social feeds. Label each one PR, marketing or advertising and write one sentence defending every label.',
        quiz: [
          { q: 'A brand pays a newspaper for a full-page spread. Which discipline is this?', options: ['Public relations', 'Advertising', 'Media relations', 'Earned media'], answer: 1, why: 'Bought space is advertising. PR works through third parties who decide for themselves whether to cover you.' },
          { q: 'Which best describes the core job of PR?', options: ['Writing press releases', 'Running ads on social media', 'Managing how key audiences see and trust an organisation', 'Selling more products this quarter'], answer: 2, why: 'Press releases are one tool. The job is the relationship between an organisation and the people whose opinion shapes it.' },
          { q: 'Why do reporters, investors and customers often trust earned coverage more than ads?', options: ['A third party chose to cover it', 'It is longer', 'It appears on more websites', 'It uses better images'], answer: 0, why: "Earned coverage passed an editor's judgment. An ad only passed a payment." },
        ],
      },
      {
        title: 'Module 2: How newsrooms work',
        deck: 'Deck 2: Reporters, editors and the news decision',
        summary: 'The roles inside a newsroom, how stories get assigned, and the questions an editor uses to decide what runs. Why a journalist owes the reader, not the source.',
        activity: "Read the last 15 stories in one section of a news site. For each, note the likely trigger (announcement, data, event, reaction) and who the reporter quoted.",
        quiz: [
          { q: 'Who pays a staff journalist?', options: ['The companies they write about', 'PR agencies', 'Their publication', 'Readers who share the story'], answer: 2, why: "Reporters are on the publication's payroll. That independence is what makes their coverage worth earning." },
          { q: 'An editor gets a pitch about a minor app redesign. What usually happens?', options: ['It runs as a lead story', 'It gets passed to the ads team', 'It is ignored because readers gain nothing from it', 'It is published as written'], answer: 2, why: "Editors filter for what is new and matters to their readers. A small product tweak rarely clears either bar." },
          { q: 'Which of these gives a reporter the strongest reason to cover a company?', options: ['A logo refresh', 'Original data that shows something new about the market', 'A CEO birthday post', 'A list of features'], answer: 1, why: 'Fresh data gives the reporter a finding readers have not seen. Elastos earned a Cryptonews story this way with its Nigeria research.' },
        ],
      },
      {
        title: 'Module 3: Earned, owned, sponsored and paid',
        deck: 'Deck 3: Reading coverage like a PR professional',
        summary: 'How to tell earned, owned, sponsored and paid content apart on the page, and why the difference matters to readers, regulators and search engines.',
        activity: 'Audit 20 articles about one company. Label each earned, owned, sponsored or paid, and list the clue that told you: byline, label, URL path or disclosure line.',
        quiz: [
          { q: "Bullieverse's $4M raise appeared in Economic Times, Inc42 and CoinDesk. Which placement was sponsored?", options: ['Economic Times', 'Inc42', 'CoinDesk', 'None of them'], answer: 2, why: 'The Indian business coverage was earned. The CoinDesk piece was sponsored, which is why reading the label matters more than the logo.' },
          { q: "A company publishes a detailed report on its own blog. What kind of media is that?", options: ['Earned', 'Owned', 'Paid', 'Sponsored'], answer: 1, why: "The company controls its own blog. It becomes earned only when an outlet decides to report on it." },
          { q: 'What is the most reliable sign an article is sponsored?', options: ['It mentions a company by name', 'It is positive', 'It has quotes from the CEO', 'It has a disclosure label or a sponsored-content section'], answer: 3, why: 'Earned stories can be positive and quote CEOs too. A label or a sponsored section is the clue that money changed hands.' },
        ],
      },
      {
        title: 'Module 4: Ethics, disclosure and trust',
        deck: 'Deck 4: Where the lines sit in PR',
        summary: "Disclosure for sponsored content and paid influencers, honesty in claims and numbers, embargoes, ghostwriting, and how to answer a journalist's hard questions.",
        activity: "Write a one-page decision memo on one ethics case from the deck: what happened, who could be harmed, what disclosure was owed and what you'd advise.",
        quiz: [
          { q: 'An influencer is paid to post about a token but leaves out that it was paid. What is the main problem?', options: ['The post is too short', 'The token might go up', 'It used the wrong hashtag', 'Readers cannot judge the claim because the payment is hidden'], answer: 3, why: 'Disclosure lets readers weigh a claim. Hiding payment turns an endorsement into a deception, and many regulators treat it that way.' },
          { q: 'A reporter keeps sending specific questions about a problem at your company. What is the best move?', options: ['Ignore them until they stop', 'Answer accurately and sooner rather than later', 'Ask them to remove the story', 'Threaten legal action first'], answer: 1, why: 'A reporter asking detailed questions is likely to publish anyway. A timely, accurate answer gets your side into the story.' },
          { q: 'Is it ethical for an executive to publish an op-ed drafted by a ghostwriter?', options: ['Yes, if the views are genuinely the executive\'s and they approve every word', 'Never', 'Only if the ghostwriter is credited as co-author in all cases', 'Only on social media'], answer: 0, why: 'Ghostwriting is common. The line is whether the ideas and approval are really the named author\'s.' },
        ],
      },
      {
        title: 'Module 5: Corporate communications and PR careers',
        deck: 'Deck 5: The jobs inside comms and how people get them',
        summary: 'Media relations, internal comms, investor relations, crisis and public affairs. Agency versus in-house, generalist versus sector specialist, and what entry-level work looks like.',
        activity: "Find three real PR or comms job ads. Break down the skills each asks for, mark the ones you already have, and plan one piece of work to close the biggest gap.",
        quiz: [
          { q: 'Which comms function speaks mainly to shareholders and analysts?', options: ['Internal communications', 'Public affairs', 'Social media', 'Investor relations'], answer: 3, why: 'Investor relations explains performance and strategy to the people who fund the company.' },
          { q: 'What usually matters most when hiring a junior PR associate?', options: ['A long list of certificates', 'Clear writing and sound judgment shown in real work', 'Number of social followers', 'Knowing every editor personally'], answer: 1, why: 'Entry-level PR is research and writing. A portfolio that shows both beats credentials.' },
          { q: 'What is a typical difference between agency and in-house PR?', options: ['Agencies work on several clients; in-house teams work on one organisation', 'In-house teams never speak to media', 'Agencies only write ads', 'There is no difference'], answer: 0, why: 'Agency roles give breadth across clients. In-house roles give depth inside one business.' },
        ],
      },
      {
        title: 'Module 6: PR in the age of AI search',
        deck: 'Deck 6: How AI assistants learn what to say about a brand',
        summary: 'How ChatGPT, Perplexity and Google AI Overviews pick sources, why earned coverage in trusted outlets now feeds AI answers, and what GEO and AEO mean for PR.',
        activity: "Ask two AI assistants the same five questions about one brand. List every source they cite and compare it with the brand's own website and newsroom.",
        quiz: [
          { q: 'Why does earned coverage matter for AI search?', options: ['AI assistants only read ads', 'AI assistants often cite trusted publications when they answer questions', 'It does not matter', 'AI assistants only read press releases'], answer: 1, why: "Assistants lean on sources they consider credible. Coverage in those outlets shapes what they repeat about a brand." },
          { q: 'Tangem\'s self-custody survey ran in English, Korean, Japanese and Dutch editions. What made it travel?', options: ['A clear finding reporters could lead with', 'A large ad budget', 'A celebrity quote', 'A long press release'], answer: 0, why: 'A single clear data point is easy to headline in any language, so each edition could run it on its own terms.' },
          { q: "An AI assistant describes a brand using a two-year-old article, while the brand's own site says something newer. What is the most effective fix?", options: ['Rewrite the homepage again', 'Buy a sponsored post on a crypto site', 'Issue a wire release to 200 syndication sites', 'Earn fresh coverage in outlets the assistant already cites'], answer: 3, why: "Assistants repeat sources they treat as credible. New earned coverage in those outlets gives them something more current to cite than the brand's own pages." },
        ],
      },
    ],
    capstone:
      "A reputation audit of one real organisation: how it describes itself, how earned and sponsored coverage describe it, which outlets AI assistants cite about it, one ethics risk and a career reflection on which comms role suits you. Shilika reviews each audit.",
  },
  tailoring: {
    students:
      "For university and college students the workshop stays conceptual and uses public case studies (Bullieverse, RARI Chain, Elastos, Tangem). It pairs with the practical PR workshop for students, where they write a release, build a media list and pitch.",
    'c-suite':
      'For executives new to PR it becomes a briefing on how newsrooms work and what earned coverage can and cannot do, drawing on founder interview prep for GAIA, Fluence and MANTRA. The careers day is replaced by working with a comms team.',
    operators:
      'For founders and early operators the same fundamentals are applied to their own company: which of their past coverage was earned, which was paid, and what AI assistants say about them today.',
  },
  faqs: [
    {
      q: 'What is covered in a public relations workshop for students?',
      a: 'What PR is and is not, how newsrooms decide what runs, earned, owned and paid media, PR versus marketing and advertising, ethics and disclosure, careers in comms, and how AI search changes PR.',
    },
    {
      q: 'How is this different from the practical PR workshop for students?',
      a: 'This workshop teaches the concepts: how media, ethics and careers work. The practical PR workshop for students is a hands-on lab where every session produces an artifact, such as a press release, a media list or a pitch.',
    },
    {
      q: 'Do students need any PR or marketing background?',
      a: 'No. It starts from a definition of PR and suits first-year mass communication, journalism, business and marketing students as well as student societies.',
    },
    {
      q: 'Is the PR workshop for college students online or in person?',
      a: 'Both. The one-hour masterclass and the six-module course run well online. The three-day workshop works best in person as a campus immersion week.',
    },
    {
      q: 'How much does a public relations workshop for students cost?',
      a: 'It is quoted per cohort, based on format, group size and location. Student and non-profit sessions are often considered pro bono. Book a call to scope it.',
    },
    {
      q: 'Will the workshop help students get a job in PR?',
      a: 'It shows how PR careers are structured and what entry-level work looks like, and students leave with a career map. It does not promise placements or internships.',
    },
  ],
  related: [
    { href: '/courses/practical-pr-workshop-for-students', label: 'Practical PR workshop for students' },
    { href: '/courses/pr-guest-speaker', label: 'PR guest speaker for universities' },
    { href: '/playbook/earned-vs-paid-media-web3-2026', label: 'Earned vs paid media' },
    { href: '/glossary/what-is-aeo-answer-engine-optimization', label: 'What is AEO (answer engine optimization)?' },
    { href: '/speaker', label: 'Shilika Jain as a speaker' },
  ],
  keywords: [
    'public relations workshop for students',
    'PR workshop for college students',
    'PR workshop for university students',
    'PR fundamentals workshop',
    'public relations basics for students',
    'earned vs paid media',
    'careers in public relations',
  ],
  about: ['Public relations', 'Media relations', 'Earned media', 'Media ethics', 'Corporate communications'],
  datePublished: '2026-10-31',
  dateModified: '2026-10-31',
};
