// On-record teaching and speaking history, paraphrased from public posts on
// @Shilika_jain (see data/author-evidence.json and data/knowledge/portfolio.json).
// Nothing here is invented: no attendee counts, ratings or fees.

export type TeachingItem = { date: string; text: string; href: string };

export const TEACHING_RECORD: TeachingItem[] = [
  {
    date: 'Aug 2026',
    text: 'Spoke to students at SJCC, Bengaluru, on Web3 and blockchain.',
    href: 'https://x.com/Shilika_jain/status/2089950553740816776',
  },
  {
    date: 'May 2026',
    text: 'Judged a Stellar founder cohort run by Myosin and advised founders on PR strategy.',
    href: 'https://x.com/Shilika_jain/status/2056635001123508384',
  },
  {
    date: 'Jul 2025',
    text: 'Ran a PR workshop for the XRPL Labs Accelerator with Tenity, for PayFi and tokenisation founders.',
    href: 'https://x.com/Shilika_jain/status/1943244949035847987',
  },
  {
    date: 'Jan 2025',
    text: 'Invited to speak at an IIT event.',
    href: 'https://x.com/Shilika_jain/status/1876893339724763399',
  },
  {
    date: 'Dec 2024',
    text: 'Moderated the PR panel at India Blockchain Week.',
    href: 'https://x.com/Shilika_jain/status/1866139605634027962',
  },
  {
    date: 'Dec 2024',
    text: 'Spoke on "Mastering the ABCs of Web3 PR" at India Blockchain Week 2024.',
    href: 'https://lu.ma/mpt4119r',
  },
  {
    date: 'Jul 2024',
    text: 'Presented a PR workshop in the Myosin Learns series.',
    href: 'https://x.com/Shilika_jain/status/1814216829633462350',
  },
  {
    date: 'Jul 2022',
    text: 'Panelist at the Poloniex India launch event on the state of crypto exchanges in India.',
    href: 'https://x.com/Shilika_jain/status/1548977532384342016',
  },
];

export const BOOKING_URL = 'https://calendly.com/shilikajain/30min/';

// Three formats, described once so the hub and every program page say the same thing.
export const FORMATS = [
  {
    id: 'masterclass',
    name: 'One-hour masterclass',
    length: '60 minutes',
    iso: 'PT1H',
    shape: 'A single slide deck, taught live, with Q&A built in.',
    bestFor: 'Guest lectures, conference sessions, team lunch-and-learns, accelerator demo weeks.',
    takeaway: 'One framework and a checklist people can use the next morning.',
  },
  {
    id: 'workshop',
    name: 'Three-day workshop',
    length: '3 days, about 6 hours a day',
    iso: 'P3D',
    shape: 'Twelve sessions of teaching plus live exercises, with a deliverable at the end of each day.',
    bestFor: 'Accelerator cohorts, leadership offsites, university immersion weeks, in-house comms teams.',
    takeaway: 'Finished work: a narrative, a media list, pitches, a release, a rehearsed spokesperson.',
  },
  {
    id: 'course',
    name: 'Multi-module course',
    length: '6 modules, usually one a week',
    iso: 'P6W',
    shape: 'Six slide decks, one activity and one quiz per module, and a capstone reviewed by Shilika.',
    bestFor: 'Semester electives, cohort programs, founders who want to run their own PR after the course.',
    takeaway: 'A skill that sticks, checked by quizzes and a graded capstone.',
  },
] as const;
