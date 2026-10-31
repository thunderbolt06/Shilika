import type { Program } from './types';

export const practicalPrWorkshopForStudents: Program = {
  slug: 'practical-pr-workshop-for-students',
  title: 'Practical PR workshop for students: a hands-on lab where every session ends in finished work',
  cardTitle: 'Practical PR workshop for students',
  metaTitle: 'Practical PR Workshop for Students: Hands-On PR Lab',
  metaDescription:
    'A hands-on PR workshop for students by Shilika Jain: write a release, build a media list, pitch, take a mock journalist call, run a crisis drill. 3 formats.',
  deck: 'Write the release, build the list, take the call. Students leave with a PR portfolio, not lecture notes.',
  answer:
    'The practical PR workshop for students is a hands-on public relations lab for university students. Every session produces an artifact: a press release, a media list built from bylines, a pitch, a mock journalist call, a crisis holding statement and a portfolio piece. It runs as a one-hour masterclass, a three-day workshop or a six-module course.',
  kind: 'Workshop',
  primaryAudience: 'students',
  audiences: ['students', 'operators', 'c-suite'],
  bestFor: 'Mass communication, journalism and business students who want PR work samples, not just theory.',
  outcomes: [
    'Write a 400-word press release with a news headline, a dateline and a quote that holds an opinion.',
    'Build a 25-name media list from real bylines, with each reporter\'s last relevant story logged.',
    'Write a pitch under 150 words and a single follow-up that adds something new.',
    'Take a ten-minute mock journalist call and land three prepared messages without reading them.',
    'Draft a crisis holding statement in 20 minutes that says what you know, what you are doing and when you will update.',
    'Assemble a one-page PR portfolio piece you can attach to an internship or agency application.',
  ],
  proof: [
    {
      text: 'Interviewed founders for CryptoDaily UK at TOKEN2049 and Solana Breakpoint in 2024, so the mock calls are run from the journalist\'s side of the table.',
      href: 'https://x.com/Shilika_jain/status/1828436310408692042',
    },
    {
      text: 'Ran launch PR for Rari Chain mainnet in January 2024, framed around NFT royalties. CoinDesk, The Block and Cointelegraph covered it the same week.',
      href: '/work/rari-chain',
    },
    {
      text: 'Ran a PR workshop for the XRPL Labs Accelerator with Tenity in July 2025 and presented one in the Myosin Learns series in July 2024.',
      href: 'https://x.com/Shilika_jain/status/1943244949035847987',
    },
    {
      text: 'Spoke to students at SJCC, Bengaluru, on Web3 and blockchain in August 2026.',
      href: 'https://x.com/Shilika_jain/status/2089950553740816776',
    },
  ],
  quote: {
    text: 'Answering journalists\' questions properly, and on time, is PR 101.',
    href: 'https://x.com/Shilika_jain/status/1717132399086280886',
    date: 'Oct 2023',
  },
  masterclass: {
    summary:
      'A one-hour lab, not a lecture. Students write as they go: a headline, a first paragraph, a byline log entry, a pitch and a holding statement, then pin it all to a one-page portfolio before they leave. Built for a single class period or a guest slot inside a PR or journalism course.',
    slides: [
      { title: 'This is a lab, not a lecture', point: 'Today you write five things and leave with a portfolio page. If you want the theory of what PR is, that is the public relations workshop for students.', minutes: 3 },
      { title: 'Journalists work for their readers', point: 'A reporter is on the publication\'s payroll, not the company\'s. Every line you write today has to answer what their readers get from it.', minutes: 4 },
      { title: 'The headline formula', point: 'Who did what, plus why it matters, in under 15 words. "RARI Foundation launches Rari Chain to protect NFT royalties" beats "RARI announces exciting milestone".', minutes: 5 },
      { title: 'The first-paragraph test', point: 'Cover everything below the first paragraph. If a reader still knows who, what, when and why it matters, the release works. Write yours now.', minutes: 5 },
      { title: 'A quote with a view', point: 'A good quote names a problem and takes a side. "We are thrilled" tells a reporter nothing they can use.', minutes: 4 },
      { title: 'The byline log', point: 'Five columns: outlet, reporter, last relevant story, date, the angle they keep returning to. A media list is a record of who covers what, not a list of logos.', minutes: 5 },
      { title: 'Spot the sponsored placement', point: 'Bullieverse\'s $4M raise ran as earned news in Economic Times, Inc42 and YourStory, but its CoinDesk piece was sponsored. Learn to tell the two apart before you log a story.', minutes: 4 },
      { title: 'The 150-word pitch', point: 'News in line one, why now in line two, one proof point, one offer. No attachments, no "hope this finds you well".', minutes: 5 },
      { title: 'Answer the query first', point: 'When a reporter asks a question, a fast and specific answer beats a perfect one sent tomorrow. Deadlines do not move for you.', minutes: 4 },
      { title: 'The mock call: three answers ready', point: 'Before any interview, write three messages and one proof for each. Then practise saying them in your own words, not reading them out.', minutes: 5 },
      { title: 'The holding statement', point: 'What we know, what we are doing, when we will update. Three sentences, out within the hour, no guessing about causes you have not confirmed.', minutes: 5 },
      { title: 'The coverage log', point: 'Record every result: outlet, link, earned or sponsored, and what it changed. A screenshot folder is not a result.', minutes: 4 },
      { title: 'Your portfolio page', point: 'Headline, first paragraph, one pitch, one holding statement and one line on what you learned, on a single page. Finished before you leave the room.', minutes: 7 },
    ],
  },
  workshop: {
    summary:
      'Three days, twelve sessions, and every session ends with something handed in. Students write a release, build a media list, pitch Shilika in the role of a reporter, take a mock journalist call, run a crisis drill and leave with a portfolio. Built for university immersion weeks and PR electives that want graded work samples.',
    days: [
      {
        day: 1,
        theme: 'The press release lab',
        sessions: [
          { time: '09:30 to 11:00', title: 'Read like an editor', detail: 'Students get the public facts of the Rari Chain mainnet launch and five real releases, then rank which ones an editor would open first and why. Output: a one-page teardown of the five releases.' },
          { time: '11:15 to 12:45', title: 'Headline and first paragraph', detail: 'Each student writes ten headlines for the same news, picks the best, then writes a first paragraph that stands alone. The room votes on the clearest. Output: a headline and a standalone first paragraph.' },
          { time: '13:45 to 15:15', title: 'Quotes, dateline and boilerplate', detail: 'Rewrite a flat "we are excited" quote until it holds a view, add a dateline and cut the boilerplate to three lines. Output: the full release draft.' },
          { time: '15:30 to 17:00', title: 'Edit swap', detail: 'Partners swap drafts and cut a third of each other\'s words without losing a fact. Shilika marks up three drafts live on screen. Output: a revised release with the edit history attached.' },
        ],
        deliverable: 'A finished 400-word press release built on public case facts, plus the marked-up first draft.',
      },
      {
        day: 2,
        theme: 'Media list and pitch',
        sessions: [
          { time: '09:30 to 11:00', title: 'Byline research', detail: 'Use site search on CoinDesk, The Block, Economic Times or a campus paper to find who covered the story\'s category in the last 90 days. Flag anything sponsored. Output: a byline log of 40 stories.' },
          { time: '11:15 to 12:45', title: 'Build the 25-name list', detail: 'Turn the byline log into a tiered list by fit, with each reporter\'s last relevant story and preferred angle. Output: a 25-name tiered media list.' },
          { time: '13:45 to 15:15', title: 'Pitch writing lab', detail: 'Write two pitches under 150 words for two different reporters on the list, each with a different angle. Partners cut every sentence that does not earn its place. Output: two pitches.' },
          { time: '15:30 to 17:00', title: 'Pitch the reporter', detail: 'Students send their pitch to Shilika playing the reporter, who replies the way a busy journalist would: a pass, a question or a request. Students write one follow-up. Output: a pitch thread with a follow-up.' },
        ],
        deliverable: 'A 25-name media list from real bylines, two pitches and one follow-up written in response to a reporter\'s reply.',
      },
      {
        day: 3,
        theme: 'Mock call, crisis drill and portfolio',
        sessions: [
          { time: '09:30 to 11:00', title: 'Mock journalist call', detail: 'Each student plays the spokesperson in a ten-minute call with Shilika as the reporter, using the questions she asked founders as a CryptoDaily UK interviewer. Output: a recorded call and a self-scored transcript.' },
          { time: '11:15 to 12:45', title: 'Crisis drill', detail: 'A fictional campus fintech app reports a data leak at 11:20. Teams get drip-fed facts and a reporter\'s repeated questions, and must answer sooner rather than later. Output: a holding statement and a reporter Q&A sheet.' },
          { time: '13:45 to 15:15', title: 'Coverage log and results', detail: 'Score the week\'s mock coverage by outlet, earned or sponsored, and what each piece would change for the company. Output: a one-page coverage log.' },
          { time: '15:30 to 17:00', title: 'Portfolio build and critique', detail: 'Students assemble their best release, pitch, statement and call notes into a portfolio piece, then present it for two minutes and take feedback. Output: a finished PR portfolio piece.' },
        ],
        deliverable: 'A recorded mock call, a crisis holding statement and a finished PR portfolio piece ready for internship applications.',
      },
    ],
  },
  course: {
    summary:
      'Six modules, each with its own slide deck, one hands-on activity that produces a work sample, and a three-question quiz. The capstone is the portfolio itself, reviewed by Shilika.',
    cadence: '6 weekly modules. 90 minutes live, plus about 2 hours of activity work per week.',
    modules: [
      {
        title: 'Module 1: The press release lab',
        deck: 'Deck 1: Headline, first paragraph, quote, boilerplate',
        summary: 'How editors read a release in seconds, the headline formula, the first-paragraph test and how to write a quote that holds an opinion. Students work from public case facts such as the Rari Chain mainnet launch.',
        activity: 'Write a release for the Rari Chain mainnet launch from its public facts, then cut it by a third. Output: a 400-word release and the uncut first draft.',
        quiz: [
          { q: 'You cover everything below the first paragraph of your release. What should a reader still know?', options: ['The company\'s founding story', 'Who did what, when, and why it matters', 'The full list of partners', 'The CEO\'s background'], answer: 1, why: 'Many readers and AI engines take only the first paragraph. If the news is not there, it is effectively not in the release.' },
          { q: 'Which headline is strongest?', options: ['RARI announces exciting new milestone', 'A new era for NFTs begins today', 'RARI Foundation launches Rari Chain to protect NFT royalties', 'Big news from the RARI community'], answer: 2, why: 'It names who, what and why it matters in one line. The others ask the reader to guess what happened.' },
          { q: 'Your draft quote says "We are thrilled to launch." What is the best fix?', options: ['Add more exclamation marks', 'Delete all quotes from the release', 'Make the quote longer', 'Replace it with a sentence that names a problem and takes a position'], answer: 3, why: 'Reporters lift quotes that say something. Excitement is not information they can use.' },
        ],
      },
      {
        title: 'Module 2: Media lists from bylines',
        deck: 'Deck 2: The byline log and the tiered list',
        summary: 'How to find the reporters who actually cover a topic, how to log their recent stories, how to tell earned coverage from sponsored posts, and how to tier a list by fit rather than by logo.',
        activity: 'Pick a category, search three outlets for stories from the last 90 days, and log 40 bylines. Mark any sponsored piece. Output: a byline log and a 25-name tiered media list.',
        quiz: [
          { q: 'Which is the best starting point for a media list?', options: ['Reporters who wrote about this topic in the last 90 days', 'A purchased database of 3,000 emails', 'Every editor-in-chief at the top ten outlets', 'Journalists with the most followers'], answer: 0, why: 'A reporter who covered the topic recently already has a reason to care. A generic list produces generic silence.' },
          { q: 'Bullieverse\'s raise ran in Economic Times and Inc42, and also on CoinDesk as sponsored content. How should the CoinDesk piece go in your log?', options: ['As earned coverage, since CoinDesk is tier-1', 'As sponsored, kept separate from earned coverage', 'Left out entirely', 'As the headline result'], answer: 1, why: 'Sponsored placements are paid. Logging them as earned misleads whoever reads your report later.' },
          { q: 'What is the most useful column to add next to each reporter\'s name?', options: ['Their follower count on X', 'Their outlet\'s monthly traffic', 'Their last relevant story and the angle they keep returning to', 'How many times you have emailed them'], answer: 2, why: 'Knowing what a reporter just wrote tells you how to frame a pitch they will actually read.' },
        ],
      },
      {
        title: 'Module 3: Pitching and follow-up',
        deck: 'Deck 3: The 150-word pitch and the one follow-up',
        summary: 'Writing a pitch with the news in the first line, tailoring the angle to one reporter, responding to queries quickly, and sending a single follow-up that adds something.',
        activity: 'Write two pitches for two reporters from your list with different angles, send them to Shilika playing the reporter, and answer her reply. Output: two pitches and a follow-up thread.',
        quiz: [
          { q: 'Where should the news go in a pitch email?', options: ['In an attached PDF', 'In the closing paragraph', 'In the first line', 'Only in the subject line'], answer: 2, why: 'Reporters decide in seconds. If the opening line does not hold the news, the rest is rarely read.' },
          { q: 'A reporter replies asking for one data point by 4pm. It is 2pm. What do you do?', options: ['Send the best accurate answer you can before 4pm', 'Wait until you have a perfect answer tomorrow', 'Ask them to push their deadline', 'Send the full press kit instead'], answer: 0, why: 'Answering a journalist\'s query quickly and specifically is basic PR. A late perfect answer misses the story.' },
          { q: 'Your pitch got no reply after four days. What is a good follow-up?', options: ['Resend the same email with "Bumping this"', 'Call their personal phone', 'Email their editor to complain', 'One short note that adds a new fact or angle'], answer: 3, why: 'One follow-up with something new is useful to a reporter. Repeated chasing burns the relationship.' },
        ],
      },
      {
        title: 'Module 4: The journalist call',
        deck: 'Deck 4: Interviews from both sides of the table',
        summary: 'How a reporter prepares questions, what they listen for, and how a spokesperson prepares three messages with proof. Taught from Shilika\'s own interviewing at TOKEN2049 and Solana Breakpoint for CryptoDaily UK.',
        activity: 'Prepare three messages for a case company, then take a ten-minute recorded mock call with Shilika as the reporter. Output: the recording and a transcript scored against your three messages.',
        quiz: [
          { q: 'You are asked a question you cannot answer, such as unreleased revenue figures. What is the best response?', options: ['Guess a number so you sound confident', 'Ask the reporter to skip it and not mention it', 'Say you cannot share that, then bridge to something you can stand behind', 'Hang up'], answer: 2, why: 'Bridging is honest about the limit and moves the conversation to ground you can speak to.' },
          { q: 'Why prepare exactly three messages before an interview?', options: ['Interviews only allow three answers', 'Three is easy to recall under pressure and each can carry a proof point', 'Reporters ask for three in advance', 'It is a legal requirement'], answer: 1, why: 'More than three blur together when you are nervous. Three, each with a proof, gives you something solid to return to.' },
          { q: 'What does a reporter most want from a 10-minute call?', options: ['A specific, quotable view and a fact they did not already have', 'A recap of the press release', 'The company history from the beginning', 'Praise for their publication'], answer: 0, why: 'Reporters already have the release. The call is worth their time only if it gives them something new to quote.' },
        ],
      },
      {
        title: 'Module 5: The crisis drill',
        deck: 'Deck 5: The first hour, the holding statement and repeat questions',
        summary: 'What to say when facts are incomplete, how to write a holding statement, how to keep one source of truth, and why you answer a reporter who keeps asking specific questions sooner rather than later. All scenarios are fictional.',
        activity: 'Run a timed drill on a fictional campus app data leak with facts released every ten minutes. Output: a holding statement, a reporter Q&A sheet and a timeline of decisions.',
        quiz: [
          { q: 'Thirty minutes into an incident you do not know the cause. What goes in the holding statement?', options: ['A likely cause, so it sounds complete', 'Nothing until the cause is confirmed', 'What you know, what you are doing, and when you will update', 'A denial'], answer: 2, why: 'A holding statement buys time honestly. Guessing a cause risks a correction later, and silence lets others fill the gap.' },
          { q: 'An investigative reporter emails three times with specific questions. What should the team do?', options: ['Answer sooner, with the facts you can confirm', 'Ignore them until they stop', 'Threaten legal action', 'Post on social media first'], answer: 0, why: 'Specific repeat questions mean the story is running. Answering early gets your facts into it.' },
          { q: 'Who should approve the statement during the drill?', options: ['Anyone on the team who is free', 'One named approver agreed before the drill started', 'The whole company by vote', 'The reporter'], answer: 1, why: 'A single approver keeps one version of the facts. Several people editing at once produces contradictions.' },
        ],
      },
      {
        title: 'Module 6: Results and the portfolio piece',
        deck: 'Deck 6: The coverage log and the one-page portfolio',
        summary: 'How to log results honestly, separate earned from sponsored, judge coverage by what it changed, and present your work in a one-page portfolio that an agency or comms team can review quickly.',
        activity: 'Build a coverage log for the course\'s mock results, then assemble your best release, pitch, statement and call notes onto one page. Output: a coverage log and a draft portfolio page.',
        quiz: [
          { q: 'Tangem\'s self-custody survey ran in English, Korean, Japanese and Dutch editions. What made it travel?', options: ['A separate agency in each country', 'Paid placement in every market', 'A celebrity quote', 'One clear stat reporters could lead with'], answer: 3, why: 'A single strong number, two thirds of users backing self-custody, is easy to headline in any language.' },
          { q: 'Which line belongs in a coverage log?', options: ['Outlet, link, date, earned or sponsored, and what it led to', '"Huge buzz online"', '"40 syndicated links"', 'A screenshot with no context'], answer: 0, why: 'A log someone else can check is useful. Vague buzz and raw link counts hide what actually happened.' },
          { q: 'What should a student PR portfolio page lead with?', options: ['A long personal statement', 'Your strongest finished work sample, such as the release or the pitch', 'A list of software you have used', 'Your grades'], answer: 1, why: 'Hiring managers want to see how you write. Put the best sample first and keep the rest short.' },
        ],
      },
    ],
    capstone:
      'A PR portfolio built from the course work: the release, the media list, two pitches with the follow-up thread, the mock call transcript, the crisis holding statement and the coverage log, introduced on one page. Shilika reviews each portfolio and marks the one change that would make it stronger.',
  },
  tailoring: {
    students:
      'For undergraduate and postgraduate students in mass communication, journalism or business, every exercise uses public case facts (Rari Chain, MANTRA, Tangem, Bullieverse) and a fictional crisis. Pitches go to Shilika in role, with a campus outlet as an optional real target.',
    'c-suite':
      'For executive teams the release and list labs shrink, and the mock call and crisis drill grow into rehearsals for the leaders themselves, using the interview prep run for GAIA, Fluence and MANTRA founders. The output is a recorded call and a signed-off holding statement template.',
    operators:
      'For founders and first comms hires every lab uses their own company: a real release for their next announcement, a media list for their category and pitches they can send the following week. The crisis drill uses a scenario they choose.',
  },
  faqs: [
    {
      q: 'What do students actually do in a practical PR workshop?',
      a: 'They write. Each session ends with a work sample: a press release, a byline log and media list, two pitches, a recorded mock journalist call, a crisis holding statement and a portfolio page.',
    },
    {
      q: 'How is this different from the public relations workshop for students?',
      a: 'The public relations workshop for students covers concepts: what PR is, how newsrooms work, ethics and careers. This one is the hands-on lab where students produce the work. Many universities run the fundamentals first and this second.',
    },
    {
      q: 'Do students pitch real journalists during the workshop?',
      a: 'No. Pitches and mock calls go to Shilika playing the reporter, drawing on her own interviewing for CryptoDaily UK. A campus paper can be an optional real target if the faculty agrees.',
    },
    {
      q: 'Is the practical PR workshop online or in person?',
      a: 'Both. The one-hour masterclass and the six-module course run well online. The three-day workshop works best in person, because the edit swaps, mock calls and crisis drill rely on fast back-and-forth in the room.',
    },
    {
      q: 'How much does a hands-on PR workshop for students cost?',
      a: 'Pricing is quoted per cohort, based on format, group size and location. Student and non-profit sessions are often considered pro bono. Book a call to scope it.',
    },
    {
      q: 'Can students use the work in internship or job applications?',
      a: 'Yes. The capstone is a one-page PR portfolio with a release, pitches, a holding statement and a coverage log, built from public case facts so it can be shared freely.',
    },
  ],
  related: [
    { href: '/courses/public-relations-workshop-for-students', label: 'Public relations workshop for students (fundamentals)' },
    { href: '/playbook/how-to-write-crypto-press-release-2026', label: 'How to write a crypto press release' },
    { href: '/playbook/crypto-media-relations-guide-2026', label: 'Media relations guide' },
    { href: '/playbook/crypto-crisis-communications-2026', label: 'Crisis communications playbook' },
    { href: '/work/rari-chain', label: 'Case study: Rari Chain mainnet launch' },
    { href: '/speaker', label: 'Speaking and guest sessions' },
  ],
  keywords: [
    'practical PR workshop for students',
    'hands-on public relations workshop',
    'press release writing workshop for students',
    'media pitching exercise for students',
    'PR crisis simulation for students',
    'mock press interview training',
    'PR portfolio for students',
  ],
  about: ['Public relations', 'Press release', 'Media relations', 'Crisis communication', 'Experiential learning'],
  datePublished: '2026-10-31',
  dateModified: '2026-10-31',
};
