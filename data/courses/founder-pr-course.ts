import type { Program } from './types';

export const founderPrCourse: Program = {
  slug: 'founder-pr-course',
  title: 'Founder PR course: positioning, media outreach, press releases and storytelling',
  cardTitle: 'Founder PR course',
  metaTitle: 'Founder PR Course: Positioning, Pitching & Press Releases',
  metaDescription:
    'A practical PR course for founders: founder positioning, media outreach, press release writing and storytelling. Taught as a 1-hour, 3-day or 6-module program.',
  deck: 'Run your own PR with the same playbook used for GAIA, Fluence, RARI and MANTRA.',
  answer:
    'The founder PR course teaches founders and early operators to run their own press: how to position the founder as a voice, find and pitch the right journalists, write a press release reporters will read, and tell the company story in a way that survives an interview. It runs as a one-hour masterclass, a three-day workshop or a six-module course with activities and quizzes.',
  kind: 'Course',
  primaryAudience: 'operators',
  audiences: ['operators', 'c-suite', 'students'],
  bestFor: 'Seed to Series A founders and the first marketing hire who will own PR.',
  outcomes: [
    'Write a three-sentence founder thesis that a journalist can quote.',
    'Build a 30-name media list from bylines, not from a database export.',
    'Write a pitch under 150 words with the news in the first line.',
    'Draft a press release with a real headline, a dateline and a quote that says something.',
    'Turn a product update into a story with a reason to run this week.',
    'Measure coverage by what it moved, not by how many links it produced.',
  ],
  proof: [
    {
      text: 'Ran founder-led visibility for GAIA from Dec 2024 to Apr 2025, from podcasts to Forbes and Decrypt.',
      href: '/work/gaia-ai',
    },
    {
      text: 'Placed Fluence co-founder Tom Trowbridge as a DePIN voice, including a CoinDesk op-ed in April 2025.',
      href: '/work/fluence',
    },
    {
      text: 'Framed MANTRA Chain\'s $11M raise around RWA and a Middle East angle for CoinDesk in March 2024.',
      href: '/work/mantra-chain',
    },
    {
      text: 'Taught PR to accelerator founders at the XRPL Labs Accelerator with Tenity and in the Myosin Learns series.',
    },
  ],
  quote: {
    text: 'Most projects think PR means asking a publication to write about them. It is the storyline, the messaging, targeted pitches, and the follow-up.',
    href: 'https://x.com/Shilika_jain/status/1646381477620482054',
    date: 'Apr 2023',
  },
  masterclass: {
    summary:
      'One deck that takes a founder from "we need press" to a one-page PR plan. Built for accelerator sessions and founder dinners where the room has an hour and wants something to use on Monday.',
    slides: [
      { title: 'PR is not a press release', point: 'Earned coverage comes from a story a reporter wants to tell, not from a document you paid to distribute.', minutes: 4 },
      { title: 'Journalists work for their readers', point: 'A reporter is on the publication\'s payroll, not yours. Every pitch has to answer what their readers get from it.', minutes: 4 },
      { title: 'The founder is the story', point: 'Early companies rarely have tier-1 news. Founders with a sharp view do. Coverage follows people before it follows products.', minutes: 5 },
      { title: 'The three-sentence thesis', point: 'What is broken, what you believe that others do not, and the proof you have. If it takes four sentences, it is not ready.', minutes: 5 },
      { title: 'Pick one category word', point: 'RARI owned "royalties", MANTRA owned "RWA", Fluence owned "DePIN". One word reporters already cover beats a new term nobody searches.', minutes: 5 },
      { title: 'What counts as news', point: 'Raise, launch, partner, data, hire, or a sharp take on someone else\'s news. Everything else is an update for your blog.', minutes: 4 },
      { title: 'Build the list from bylines', point: 'Search the outlet for your category, read who wrote the last five stories, and pitch them. Thirty right names beat 3,000 emails.', minutes: 5 },
      { title: 'The 150-word pitch', point: 'News in line one, why now in line two, one proof point, one offer (exclusive, data, interview). No attachments.', minutes: 5 },
      { title: 'Press release anatomy', point: 'Headline with the news, dateline, a first paragraph that stands alone, a quote with an opinion, and a boilerplate that fits in three lines.', minutes: 5 },
      { title: 'Newsjacking', point: 'Fluence tied a global Microsoft outage to the case for decentralized compute and ran in e27. Live news gives a quiet company a reason to be quoted.', minutes: 4 },
      { title: 'Data travels', point: 'Tangem\'s self-custody survey gave reporters one stat to lead with, and it ran in English, Korean, Japanese and Dutch editions.', minutes: 4 },
      { title: 'Measure what moved', point: 'Track the placements that brought inbound, investor replies or AI search citations. A 40-link syndication report is not a result.', minutes: 4 },
      { title: 'Your one-page PR plan', point: 'Thesis, category word, three stories for the next 90 days, 30 names, and who says yes to quotes. Filled in before people leave.', minutes: 6 },
    ],
  },
  workshop: {
    summary:
      'Three days that end with a founder holding a finished positioning doc, a media list, pitches ready to send and a press release draft. Built for accelerator cohorts and founding teams who want to leave with work done, not notes.',
    days: [
      {
        day: 1,
        theme: 'Founder positioning and narrative',
        sessions: [
          { time: '09:30 to 11:00', title: 'How newsrooms decide', detail: 'What an editor filters for in the first 15 seconds, the difference between earned, sponsored and paid placements, and why most founder pitches never get opened.' },
          { time: '11:15 to 12:45', title: 'The founder thesis', detail: 'Each founder writes a three-sentence thesis, then the room tears it apart. Rewrites until a stranger can repeat it back.' },
          { time: '13:45 to 15:15', title: 'Category word and message house', detail: 'Pick the one word you want attached to your name, then build three supporting messages with a proof point under each.' },
          { time: '15:30 to 17:00', title: 'Story mining', detail: 'Go through the next six months of roadmap, hires and data and pull out every possible news hook. Rank them by what a reporter would care about.' },
        ],
        deliverable: 'A one-page positioning doc: thesis, category word, message house and a ranked list of six story hooks.',
      },
      {
        day: 2,
        theme: 'Media outreach',
        sessions: [
          { time: '09:30 to 11:00', title: 'Byline research', detail: 'Use site search on CoinDesk, Decrypt, TechCrunch or your sector\'s trade press to find the reporters who covered your category in the last 90 days.' },
          { time: '11:15 to 12:45', title: 'Build the 30-name list', detail: 'Tier the list by fit, not by logo. Note each reporter\'s last relevant story and the angle they keep returning to.' },
          { time: '13:45 to 15:15', title: 'Pitch writing lab', detail: 'Write three pitches under 150 words for three different reporters. Swap with a partner, cut every sentence that does not earn its place.' },
          { time: '15:30 to 17:00', title: 'Exclusives, embargoes and follow-up', detail: 'When to offer an exclusive, how an embargo works across time zones, and the one follow-up that is polite rather than pushy.' },
        ],
        deliverable: 'A tiered 30-name media list and three pitches ready to send.',
      },
      {
        day: 3,
        theme: 'Press releases and storytelling',
        sessions: [
          { time: '09:30 to 11:00', title: 'Press release clinic', detail: 'Write a release for your strongest hook: headline, dateline, standalone first paragraph, a quote with a view, and a short boilerplate.' },
          { time: '11:15 to 12:45', title: 'Storytelling for interviews', detail: 'Turn the thesis into a two-minute story with a moment, a tension and a turn. Practise it until it sounds like talking, not reading.' },
          { time: '13:45 to 15:15', title: 'Mock interview', detail: 'Each founder takes a ten-minute mock interview with tough follow-ups, then reviews the recording against the message house.' },
          { time: '15:30 to 17:00', title: '90-day PR plan and measurement', detail: 'Map three stories onto the next quarter, set who approves quotes, and agree on the three numbers that show PR is working.' },
        ],
        deliverable: 'A press release draft, a rehearsed two-minute founder story and a 90-day PR plan.',
      },
    ],
  },
  course: {
    summary:
      'Six modules, each with its own slide deck, a hands-on activity and a short quiz. Founders finish with a capstone: a full launch pack reviewed line by line.',
    cadence: '6 weekly modules. 90 minutes live, plus about 2 hours of activity work per week.',
    modules: [
      {
        title: 'Module 1: How PR works in 2026',
        deck: 'Deck 1: Earned, owned, paid and AI search',
        summary: 'What a newsroom wants, why press releases alone rarely earn coverage, and how AI assistants now pick up and repeat what tier-1 and trade outlets publish.',
        activity: 'Audit the last ten stories in your category. For each, note the outlet, the reporter, the hook and whether it was earned or sponsored.',
        quiz: [
          { q: "Who does a journalist work for?", options: ["Their publication and its readers", "The company that pitched them", "The PR agency", "The investors in the story"], answer: 0, why: "Reporters are paid by their publication to serve its readers. A pitch that does not serve those readers gets ignored." },
          { q: "Which is earned media?", options: ["A sponsored article on a crypto site", "A wire release syndicated to 200 sites", "A reporter quoting your founder in a story they chose to write", "A paid newsletter mention"], answer: 2, why: "Earned media is coverage an editor chose to run. You cannot buy it, which is why readers and AI engines trust it more." },
          { q: "What usually happens to a wire release with no story behind it?", options: ["It gets picked up by tier-1 outlets", "It ranks first on Google", "It gets an automatic interview request", "It lands on syndication sites that few people read"], answer: 3, why: "Distribution without a story produces links on low-traffic syndication pages, not editorial coverage." },
        ],
      },
      {
        title: 'Module 2: Founder positioning',
        deck: 'Deck 2: The thesis, the category word and the message house',
        summary: 'How to position a founder as a voice in a category: one belief worth arguing, one category word reporters already cover, and three messages with proof.',
        activity: 'Write your three-sentence thesis and a message house. Test the thesis on three people outside your industry and rewrite it after each one.',
        quiz: [
          { q: "What are the three parts of a founder thesis?", options: ["Vision, mission, values", "What is broken, what you believe others do not, your proof", "Product, price, place", "Team, traction, tokenomics"], answer: 1, why: "A thesis names a problem, takes a position and backs it with evidence. That is what makes it quotable." },
          { q: "Why did RARI Chain lead with \"royalties\" rather than \"new L2\"?", options: ["Royalties was shorter", "L2s were banned from CoinDesk", "Reporters already covered creator royalties as a beat", "It was cheaper"], answer: 2, why: "A word editors already cover gives a launch a slot to fit into. \"Another L2\" competes with dozens of launches that week." },
          { q: "A message house should have how many supporting messages under the main one?", options: ["Three", "One", "Seven", "As many as features"], answer: 0, why: "Three messages are easy to remember under pressure and each can carry its own proof point." },
        ],
      },
      {
        title: 'Module 3: Finding stories',
        deck: 'Deck 3: News hooks, newsjacking and data stories',
        summary: 'The six types of news a reporter will run, how to react to someone else\'s news with a useful view, and how to turn your own data into a headline.',
        activity: 'List every possible hook in your next six months. Pick one live news event this week and write a 100-word expert comment you could send a reporter today.',
        quiz: [
          { q: "Fluence ran in e27 by tying its story to what?", options: ["A token unlock", "A conference keynote", "A celebrity endorsement", "A global Microsoft outage"], answer: 3, why: "Newsjacking a mainstream outage gave an infrastructure company a reason to be quoted outside crypto media." },
          { q: "Why did Tangem's self-custody survey travel across markets?", options: ["It was translated by an agency", "It gave reporters one clear stat to lead with", "It was paid placement", "It was announced at a conference"], answer: 1, why: "A single strong number (two thirds of users back self-custody) is easy to headline in any language." },
          { q: "Which of these is weakest as a news hook?", options: ["A minor UI update", "A funding round", "A new partnership with a known brand", "Original survey data"], answer: 0, why: "A small product tweak matters to users, not to readers of a news outlet. Put it on your blog." },
        ],
      },
      {
        title: 'Module 4: Media outreach',
        deck: 'Deck 4: Lists, pitches, exclusives and follow-up',
        summary: 'Building a media list from bylines, writing a pitch under 150 words, when to offer an exclusive, how embargoes work and how to follow up once.',
        activity: 'Build a 30-name list with each reporter\'s last relevant story. Write and send three pitches, then log replies, opens and what you would change.',
        quiz: [
          { q: "Where should the news go in a pitch?", options: ["In the attachment", "In the last paragraph", "In the first line", "In the subject line only"], answer: 2, why: "Reporters decide in seconds. If line one does not hold the news, the rest is rarely read." },
          { q: "What is the best source for a media list?", options: ["A purchased database export", "Every editor at the top ten outlets", "Your investors' contacts only", "Reporters who recently wrote about your category"], answer: 3, why: "A reporter who covered your category last month already has a reason to care. Generic lists produce generic silence." },
          { q: "How many follow-ups is reasonable for an unanswered pitch?", options: ["None", "One, with something new", "Five, daily", "Until they reply"], answer: 1, why: "One follow-up that adds a fact or a new angle is helpful. Repeated chasing burns the relationship." },
        ],
      },
      {
        title: 'Module 5: Press release development',
        deck: 'Deck 5: Writing a release reporters can use',
        summary: 'Release structure from headline to boilerplate, how to write a quote that says something, and when a release helps versus when a pitch alone is better.',
        activity: 'Write a press release for your strongest hook. Cut the first draft by a third, then rewrite the quote until it holds an opinion.',
        quiz: [
          { q: "What should the first paragraph of a release do?", options: ["Thank partners", "Describe company history", "State the news so it stands alone", "List every feature"], answer: 2, why: "Many readers and AI engines only take the first paragraph. It must carry who, what, when and why it matters." },
          { q: "Which quote is stronger?", options: ["\"Creators lose royalties on most marketplaces today. We built a chain where that cannot happen.\"", "\"We are thrilled to announce this partnership.\"", "\"This is a milestone for our community.\"", "\"We look forward to the future.\""], answer: 0, why: "A good quote names a problem and takes a position. Excitement is not information." },
          { q: "When is a pitch alone often better than a release?", options: ["When you have a funding round", "Never", "When the news is long", "When you want an exclusive with one reporter"], answer: 3, why: "An exclusive is a private offer to one reporter. A public release removes what made it exclusive." },
        ],
      },
      {
        title: 'Module 6: Storytelling, interviews and measurement',
        deck: 'Deck 6: The two-minute story, the interview and the scorecard',
        summary: 'Turning the thesis into a story with a moment and a turn, handling interviews and podcasts, and measuring PR by inbound, investor interest and AI citations.',
        activity: 'Record a two-minute founder story and a ten-minute mock interview. Score the recording against your message house and set three PR metrics for the quarter.',
        quiz: [
          { q: "What made GAIA's founder visibility compound into Forbes coverage?", options: ["One big press release", "A steady run of interviews around one narrative", "Paid placements", "A rebrand"], answer: 1, why: "Repeated founder interviews on decentralized AI agents built a body of work that tier-1 reporters could find and cite." },
          { q: "Which metric says the most about PR working?", options: ["Inbound from the right buyers or investors after a placement", "Number of syndicated links", "Total impressions claimed by an agency", "Press release word count"], answer: 0, why: "Coverage matters when it changes who contacts you. Link counts and inflated impressions do not." },
          { q: "In an interview, what do you do with a question you should not answer?", options: ["Say \"no comment\" and stop", "Make something up", "Acknowledge it and bridge to a message you can stand behind", "End the interview"], answer: 2, why: "Bridging respects the question and moves to ground you can speak to honestly." },
        ],
      },
    ],
    capstone:
      'A launch pack for one real story: positioning doc, 30-name tiered list, three sent pitches with results, a press release, and a recorded two-minute founder story. Shilika reviews each pack line by line.',
  },
  tailoring: {
    students:
      'For business, journalism and mass communication students the course uses public case studies (RARI, MANTRA, Fluence) instead of their own company, and the capstone is a launch pack for a real startup they pick.',
    'c-suite':
      'For executives the outreach modules shrink and the thesis, message house and interview modules grow. The capstone becomes a recorded interview and a 90-day visibility plan for the leadership team.',
    operators:
      'For founders and first marketing hires every exercise uses their own company, roadmap and target outlets. They leave with pitches sent and a release ready for their next announcement.',
  },
  faqs: [
    {
      q: 'Who is the founder PR course for?',
      a: 'Seed to Series A founders, the first marketing or comms hire, and accelerator cohorts. It also runs for students and executive teams with the changes described in the audience section.',
    },
    {
      q: 'Do founders need PR experience before the course?',
      a: 'No. Module 1 starts with how newsrooms work. Founders who have pitched before skip ahead faster in the outreach and release modules.',
    },
    {
      q: 'Will the course get my company press coverage?',
      a: 'The course teaches you to earn coverage yourself and ends with pitches sent. Placement depends on your news and your timing, so no course can promise it honestly.',
    },
    {
      q: 'Is it online or in person?',
      a: 'Both. The one-hour masterclass and the six-module course work well online. The three-day workshop works best in person, for example inside an accelerator or offsite.',
    },
    {
      q: 'How is the founder PR course priced?',
      a: 'Pricing is quoted per cohort, based on format, group size and location. Student and non-profit sessions are often considered pro bono. Book a call to scope it.',
    },
  ],
  related: [
    { href: '/services/founder-profiling', label: 'Founder profiling and op-eds' },
    { href: '/playbook/founder-profiling-sprint', label: 'Founder profiling sprint: 90 days to category voice' },
    { href: '/playbook/op-eds-vs-press-releases', label: 'Op-eds vs press releases' },
    { href: '/playbook/how-to-write-crypto-press-release-2026', label: 'How to write a crypto press release' },
    { href: '/pages/founder-media-training', label: 'Founder media training' },
  ],
  keywords: [
    'founder PR course',
    'PR course for founders',
    'founder positioning',
    'media outreach training',
    'press release writing course',
    'storytelling for founders',
    'startup PR workshop',
  ],
  about: ['Public relations', 'Founder positioning', 'Media relations', 'Press release', 'Storytelling'],
  datePublished: '2026-10-31',
  dateModified: '2026-10-31',
};
