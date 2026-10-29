import type { FreeTool } from './types';

export const PR_TOOLS: FreeTool[] = [
  {
    slug: 'press-release-generator',
    name: 'Press Release Generator',
    group: 'pr',
    blurb: 'Write an AP-style release for launches, funding, partnerships and TGEs.',
    title: 'Free Press Release Generator with AP-Style Template',
    description:
      'Free press release generator. Write an AP-style release for a launch, funding round, partnership or token launch, with headlines and quotes. No signup.',
    h1: ['Write the ', 'release', ' in minutes.'],
    intro:
      'Turn your announcement into a clean, AP-style press release with a dateline, quotes, boilerplate and headline options. Built for startup founders and lean comms teams.',
    howto: [
      'Pick the announcement type and fill in the facts.',
      'Choose a headline and swap the draft quote for a real one.',
      'Copy the release or download it as text or Markdown.',
    ],
    faqs: [
      {
        q: 'How long should a press release be?',
        a: 'Most news releases land between 400 and 600 words. That is long enough for a lede, context, one or two quotes and a boilerplate, and short enough that a reporter reads to the end. Funding and launch releases rarely need more than 500 words.',
      },
      {
        q: 'What is the format of an AP-style press release?',
        a: 'It opens with FOR IMMEDIATE RELEASE or an embargo line, then a headline, an optional subhead and a dateline with the city and date. The first paragraph answers who, what, when, where and why. Quotes, supporting facts, an About section, a media contact and ### to mark the end follow.',
      },
      {
        q: 'Do press releases still work in 2026?',
        a: 'Yes, but rarely on their own. A release on a wire gives you a source of record that reporters and AI search tools can find and cite. Coverage still comes from pitching a specific journalist with a specific angle, with the release as the backup document.',
      },
    ],
    related: [
      { href: '/playbook/how-to-write-crypto-press-release-2026', label: 'How to write a crypto press release' },
      { href: '/playbook/op-eds-vs-press-releases', label: 'Op-eds vs press releases' },
      { href: '/services/ai-startup-pr', label: 'AI startup PR' },
    ],
    category: 'BusinessApplication',
  },
  {
    slug: 'journalist-pitch-email-builder',
    name: 'Journalist Pitch Email Builder',
    group: 'pr',
    blurb: 'Three pitch angles with subject lines and a follow-up, under 150 words.',
    title: 'Free Journalist Pitch Email Template Builder',
    description:
      'Free media pitch email builder. Write a short, personal pitch to a journalist in three angles, with subject lines and a follow-up email. No signup needed.',
    h1: ['Pitch ', 'journalists', ' who reply.'],
    intro:
      'Write a short, personal pitch email to a reporter in three angles: an exclusive, a data story and a founder interview. Each comes with subject lines and a follow-up.',
    howto: [
      'Add the journalist, their beat and a recent story they wrote.',
      'Fill in your hook, why it matters now and your best proof point.',
      'Pick the angle that fits, copy it and send from your own inbox.',
    ],
    faqs: [
      {
        q: 'How long should a pitch email to a journalist be?',
        a: 'Keep it under 150 words. Reporters scan pitches on their phones, so the news, the proof and the ask should all fit on one screen. Put anything longer in a linked press kit.',
      },
      {
        q: 'When is the best time to pitch a journalist?',
        a: "Tuesday to Thursday mornings in the reporter's time zone tend to get the most opens. For time-sensitive news, pitch 5 to 10 days ahead under embargo so they have time to report. Avoid Friday afternoons and major holidays.",
      },
      {
        q: 'How many times should you follow up on a media pitch?',
        a: 'Once, three to four business days after the first email, in the same thread. Add one new detail rather than asking if they saw it. If there is still no reply, move on to the next reporter.',
      },
    ],
    related: [
      { href: '/playbook/how-to-get-ai-startup-in-techcrunch-2026', label: 'How to get your AI startup in TechCrunch' },
      { href: '/playbook/crypto-media-relations-guide-2026', label: 'Crypto media relations guide' },
      { href: '/playbook/founder-led-diy-pr-2026', label: 'Founder-led DIY PR' },
    ],
    category: 'BusinessApplication',
  },
  {
    slug: 'media-kit-builder',
    name: 'Media Kit Builder',
    group: 'pr',
    blurb: 'Build a one-page press kit and save it as PDF, HTML or Markdown.',
    title: 'Free Media Kit Builder: Online Press Kit Template',
    description:
      'Free media kit builder. Add your boilerplate, metrics, founders, coverage and brand colors, then print to PDF or download HTML and Markdown. No signup needed.',
    h1: ['Build your ', 'media kit', '.'],
    intro:
      'Put everything a journalist needs on one page: boilerplate, key facts, founders, coverage, brand colors and contacts. Your draft saves in this browser as you type.',
    howto: [
      'Fill in company details, metrics and your leadership team.',
      'Add recent coverage, milestones and links to logos and photos.',
      'Print to PDF, or download the kit as HTML or Markdown.',
    ],
    faqs: [
      {
        q: 'What should a media kit include?',
        a: 'At minimum: a short and long boilerplate, key facts and metrics, founder bios with photos, recent coverage, logo files and a press contact. Startups should add funding details and milestones. Keep it to one page with links to the downloads.',
      },
      {
        q: 'What is the difference between a media kit and a press kit?',
        a: 'In PR the terms are used interchangeably. Publishers also use media kit to mean an advertising rate card, while press kit always means material for journalists. For a startup, both mean the same one-page resource.',
      },
      {
        q: 'Should a media kit be a PDF or a web page?',
        a: 'Have both. A page at /press is easy to update and can be read by search engines and AI assistants. A PDF is handy to link in pitches, but never attach it to a cold email.',
      },
    ],
    related: [
      { href: '/services/founder-profiling', label: 'Founder profiling' },
      { href: '/playbook/founder-led-diy-pr-2026', label: 'Founder-led DIY PR' },
      { href: '/tools/marketing-checklist', label: 'Marketing checklist' },
    ],
    category: 'BusinessApplication',
  },
  {
    slug: 'personal-brand-bio-writer',
    name: 'Personal Brand Bio Writer',
    group: 'pr',
    blurb: 'Six bio lengths, from a one-liner to a speaker intro, in your tone.',
    title: 'Free Professional Bio Generator for Founders',
    description:
      'Free professional bio generator. Write a one-liner, short, medium and long bio plus a speaker intro, in first or third person, with correct pronouns. No signup.',
    h1: ['Write a bio ', 'worth', ' reading.'],
    intro:
      'Turn your role, expertise and proof points into a one-liner, short, medium and long bio, a first-person version and a speaker intro. Made for founders, speakers and executives.',
    howto: [
      'Add your role, what you are known for and two or three proof points.',
      'Pick pronouns, tone and where the bio will be used.',
      'Copy the version you need, or copy them all.',
    ],
    faqs: [
      {
        q: 'How long should a professional bio be?',
        a: 'Keep a one-liner under 25 words for bylines and social profiles. A short bio of about 50 words suits podcast notes and event pages, and 100 to 200 words works for a website About page or a conference program.',
      },
      {
        q: 'Should a bio be written in first or third person?',
        a: 'Use third person for press, speaker bios and company websites, because someone else is introducing you. Use first person on LinkedIn, X and your personal site, where you speak directly to the reader.',
      },
      {
        q: 'What makes a founder bio credible?',
        a: 'Specific proof. Numbers, named companies and concrete results do more than adjectives like passionate or visionary. One line about life outside work helps people remember you.',
      },
    ],
    related: [
      { href: '/services/founder-profiling', label: 'Founder profiling' },
      { href: '/playbook/personal-brand-startup-founder-2026', label: 'Personal brand for founders' },
      { href: '/playbook/how-to-build-founder-thought-leadership-2026', label: 'Founder thought leadership' },
    ],
    category: 'BusinessApplication',
  },
  {
    slug: 'content-calendar-template',
    name: 'Content Calendar Template',
    group: 'pr',
    blurb: 'Plan weeks of posts by channel and pillar, then export to Sheets or ICS.',
    title: 'Free Content Calendar Template and Generator',
    description:
      'Free content calendar generator. Plan 4 to 12 weeks of posts by channel and pillar, then export to Google Sheets, Excel or your calendar app. No signup.',
    h1: ['Plan a month of ', 'posts', '.'],
    intro:
      'Generate a posting plan that rotates your content pillars and formats across every channel, with launch content around key dates. Export it to a spreadsheet or your calendar.',
    howto: [
      'Pick a start date, a length and the channels you post on.',
      'Set your content pillars and any key dates, like a launch.',
      'Download the CSV for Sheets or Excel, or the .ics for your calendar.',
    ],
    faqs: [
      {
        q: 'How often should a startup post on LinkedIn?',
        a: 'Three to five posts a week is a sustainable rhythm for most founders, and consistency matters more than volume. Posting more than once a day tends to cut reach per post, so leave at least 12 hours between posts.',
      },
      {
        q: 'What are content pillars?',
        a: 'Content pillars are the three to five themes you post about again and again, such as education, proof, behind the scenes and point of view. They keep your feed focused, make planning faster and teach your audience what to expect from you.',
      },
      {
        q: 'How far ahead should you plan a content calendar?',
        a: 'Plan four to eight weeks ahead and review it every week. That gives enough runway to prepare launches and longer pieces while leaving room for timely posts about news in your space.',
      },
    ],
    related: [
      { href: '/playbook/linkedin-strategy-founders-2026', label: 'LinkedIn strategy for founders' },
      { href: '/services/content-writing', label: 'Content writing' },
      { href: '/tools/gtm-planner', label: 'GTM planner' },
    ],
    category: 'BusinessApplication',
  },
  {
    slug: 'social-image-resizer',
    name: 'Social Media Image Resizer',
    group: 'pr',
    blurb: 'Resize one image for every social platform at once, in your browser.',
    title: 'Free Social Media Image Resizer for Every Platform',
    description:
      'Free social media image resizer. Crop one image to Instagram, LinkedIn, X, YouTube, TikTok and Open Graph sizes at once, in your browser. No upload, no signup.',
    h1: ['One image, ', 'every', ' size.'],
    intro:
      'Drop in one image and get correctly sized versions for Instagram, LinkedIn, X, Facebook, YouTube, TikTok, Pinterest and link previews. Nothing is uploaded.',
    howto: [
      'Drop in your image and choose the sizes you need.',
      'Pick crop or fit, and click the image to set the focus point.',
      'Download each size, or download them all at once.',
    ],
    faqs: [
      {
        q: 'What size should a LinkedIn post image be?',
        a: '1200 x 627 pixels works for link and landscape posts. For single-image posts, a square 1080 x 1080 or a portrait 1080 x 1350 takes up more of the screen on mobile, which is where most LinkedIn browsing happens.',
      },
      {
        q: 'What is the best Instagram post size in 2026?',
        a: "A 1080 x 1350 portrait (4:5) is the safest feed size, since Instagram's profile grid moved to taller thumbnails in 2025. Use 1080 x 1920 for Stories and Reels, and keep text away from the top and bottom 250 pixels.",
      },
      {
        q: 'What size is an Open Graph image?',
        a: 'Use 1200 x 630 pixels, a 1.91:1 ratio. LinkedIn, Facebook, Slack and most messaging apps use it for link previews, and X shows it in large cards. Keep the file under 5 MB and keep key text away from the edges.',
      },
    ],
    related: [
      { href: '/playbook/linkedin-strategy-founders-2026', label: 'LinkedIn strategy for founders' },
      { href: '/services/kol-marketing', label: 'KOL marketing' },
      { href: '/tools/marketing-checklist', label: 'Marketing checklist' },
    ],
    category: 'MultimediaApplication',
  },
  {
    slug: 'image-compressor-converter',
    name: 'Image Compressor and Format Converter',
    group: 'pr',
    blurb: 'Shrink images in bulk and convert to WebP or AVIF. Nothing is uploaded.',
    title: 'Free Image Compressor and WebP Converter',
    description:
      'Free image compressor and converter. Shrink JPG, PNG and WebP files in bulk or convert them to WebP and AVIF, right in your browser. No upload, no signup.',
    h1: ['Make images ', 'lighter', '.'],
    intro:
      'Compress and convert images in bulk so your pages load faster. Everything runs in your browser, so your files are never uploaded anywhere.',
    howto: [
      'Drop in one or more images.',
      'Pick an output format, a quality and an optional max size.',
      'Download the smaller files one by one or all at once.',
    ],
    faqs: [
      {
        q: 'Is WebP or AVIF better?',
        a: 'AVIF files are usually 20 to 30% smaller than WebP at the same visual quality, but they are slower to encode. Every major browser supports both in 2026. WebP is the safe default, and AVIF is worth it when every kilobyte counts.',
      },
      {
        q: 'What image quality setting should I use for the web?',
        a: 'A quality of 75 to 85 for JPEG or WebP is hard to tell apart from the original for photos and often cuts file size by 60 to 80%. Use PNG only for screenshots, logos and images that need sharp edges or transparency.',
      },
      {
        q: 'How big should images be for a website?',
        a: 'Aim for under 200 KB for most content images and under 500 KB for a full-width hero. Resize to the largest size the image will display, often 1600 to 2000 pixels wide, before compressing. Heavy images are one of the most common causes of a slow Largest Contentful Paint.',
      },
    ],
    related: [
      { href: '/playbook/how-to-build-ai-search-visibility-geo-2026', label: 'How to build AI search visibility' },
      { href: '/tools/marketing-checklist', label: 'Marketing checklist' },
      { href: '/services/content-writing', label: 'Content writing' },
    ],
    category: 'MultimediaApplication',
  },
];
