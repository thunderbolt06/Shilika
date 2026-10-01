import type { FreeTool } from './types';

export const EVERYDAY_TOOLS: FreeTool[] = [
  {
    slug: 'utm-builder',
    name: 'UTM Link Builder',
    group: 'everyday',
    blurb: 'Tag campaign links for GA4 in seconds, with presets and a saved history.',
    title: 'Free UTM Link Builder for GA4 Campaign Tracking',
    description:
      'Free UTM link builder. Add utm_source, medium and campaign tags with one-click presets, keep your existing parameters and copy clean links. No signup.',
    h1: ['Build ', 'clean', ' UTM links.'],
    intro:
      'Tag any link with UTM parameters so GA4 shows exactly which post, email or ad sent the visit. Built for founders and lean marketing teams.',
    howto: [
      'Paste the page URL you want to send people to.',
      'Pick a preset or type your source, medium and campaign.',
      'Copy the link, save it, or turn it into a QR code.',
    ],
    faqs: [
      {
        q: 'What are UTM parameters?',
        a: 'UTM parameters are tags added to the end of a URL, such as utm_source=linkedin. Analytics tools like GA4 read them to attribute a visit to a specific channel and campaign. The three you should always set are source, medium and campaign.',
      },
      {
        q: 'Are UTM parameters case sensitive?',
        a: 'Yes. GA4 treats "LinkedIn" and "linkedin" as two different sources, which splits your reports. Keep every value lowercase and use one separator, either hyphens or underscores, across the whole team.',
      },
      {
        q: 'Should I use UTM links on internal links?',
        a: 'No. UTM tags on links inside your own site start a new session and overwrite the original source, so you lose the real attribution. Use them only on links that point to your site from somewhere else, like social posts, emails, ads and partner pages.',
      },
    ],
    related: [
      { href: '/playbook/how-to-measure-pr-roi-2026', label: 'How to measure PR ROI' },
      { href: '/tools/gtm-planner', label: 'GTM planner' },
      { href: '/services/ai-startup-pr', label: 'AI startup PR' },
    ],
    category: 'BusinessApplication',
  },
  {
    slug: 'meta-title-description-checker',
    name: 'Meta Title and Description Checker',
    group: 'everyday',
    blurb: 'See how your title and description look in Google before you publish.',
    title: 'Free Meta Title and Description Checker (Pixel Width)',
    description:
      'Free meta title and description checker. Measure pixel width, catch truncation and preview your Google result on desktop and mobile. No signup needed.',
    h1: ['Check your ', 'Google', ' snippet.'],
    intro:
      'Test your page title and meta description against the pixel limits Google uses, then preview the result on desktop and mobile.',
    howto: [
      'Type your page title, meta description and URL.',
      'Add the keyword you want to rank for.',
      'Fix anything flagged, then copy the HTML tags.',
    ],
    faqs: [
      {
        q: 'How long should a meta title be in 2026?',
        a: 'Google cuts titles by pixel width, at roughly 600 pixels on desktop. That is usually 50 to 60 characters, but wide letters like W and M use more room. Keep the main keyword near the start so it survives any cut.',
      },
      {
        q: 'How long should a meta description be?',
        a: 'Aim for 120 to 155 characters. Desktop shows roughly 920 pixels, about 158 characters, while mobile often cuts closer to 120. Google rewrites many descriptions anyway, so make the first sentence carry the point.',
      },
      {
        q: 'Does the meta description affect rankings?',
        a: 'Not directly. Google has said the description is not a ranking factor. It does affect click-through rate, and a clear, specific description that matches the search intent earns more clicks from the same position.',
      },
    ],
    related: [
      { href: '/playbook/aeo-vs-seo-startups-2026', label: 'AEO vs SEO for startups' },
      { href: '/playbook/how-to-build-ai-search-visibility-geo-2026', label: 'Build AI search visibility' },
      { href: '/services/content-writing', label: 'Content writing' },
    ],
    category: 'BusinessApplication',
  },
  {
    slug: 'headline-analyzer',
    name: 'Headline Analyzer',
    group: 'everyday',
    blurb: 'Score any headline for length, word balance and click appeal.',
    title: 'Free Headline Analyzer: Score Your Headline Instantly',
    description:
      'Free headline analyzer. Score blog titles, email subjects and social hooks for length, power words, emotion and clarity, then compare versions. No signup.',
    h1: ['Write a ', 'sharper', ' headline.'],
    intro:
      'Score a headline on length, word balance, emotion and format, and get specific fixes. Test up to five versions side by side.',
    howto: [
      'Pick the headline type and type your headline.',
      'Read the score and the checks that need work.',
      'Try a new version and compare the scores.',
    ],
    faqs: [
      {
        q: 'What makes a good headline?',
        a: 'A good headline is specific, promises a clear benefit and is easy to scan. Most strong blog headlines run 6 to 12 words and 50 to 70 characters. A number, a concrete outcome and one or two emotional words usually lift clicks.',
      },
      {
        q: 'What are power words in headlines?',
        a: 'Power words are terms that trigger curiosity or urgency, such as proven, simple, mistake or secret. One or two help a headline stand out. Too many make it read like clickbait and can hurt trust.',
      },
      {
        q: 'Do numbers in headlines really work?',
        a: 'Yes, in most tests list headlines with a number get more clicks because they set a clear expectation. Odd and specific numbers like 7 or 23 tend to feel more credible than round ones. Use digits, not words, so the number stands out.',
      },
    ],
    related: [
      { href: '/playbook/how-to-build-founder-thought-leadership-2026', label: 'Founder thought leadership' },
      { href: '/playbook/op-eds-vs-press-releases', label: 'Op-eds vs press releases' },
      { href: '/services/content-writing', label: 'Content writing' },
    ],
    category: 'BusinessApplication',
  },
  {
    slug: 'character-counter',
    name: 'Character and Word Counter',
    group: 'everyday',
    blurb: 'Count characters and words against every social and SEO limit at once.',
    title: 'Free Character Counter for X, LinkedIn and Instagram',
    description:
      'Free character and word counter. Check your text against X, LinkedIn, Instagram, TikTok, YouTube, SMS and meta tag limits, with reading time. No signup.',
    h1: ['Count every ', 'character', '.'],
    intro:
      'Paste your text and see characters, words and reading time, plus how it fits the limits on X, LinkedIn, Instagram, TikTok and more.',
    howto: [
      'Paste or type your text in the box.',
      'Check the platform limits and fold points.',
      'Trim where a meter turns red, then copy.',
    ],
    faqs: [
      {
        q: 'How many characters can a LinkedIn post have?',
        a: 'A LinkedIn post can be up to 3,000 characters. Only about the first 210 show before the "see more" link, so the opening line has to earn the click. Headlines allow 220 characters and the About section 2,600.',
      },
      {
        q: 'What is the character limit on X?',
        a: 'A standard post on X allows 280 characters. Links always count as 23 characters, and emoji and most Chinese, Japanese and Korean characters count as 2. Premium accounts can post longer, but only the first 280 show in the feed.',
      },
      {
        q: 'How long is an Instagram caption allowed to be?',
        a: 'Instagram captions can run to 2,200 characters, but only around the first 125 show before the caption is cut. Bios are limited to 150 characters. Put the hook and any call to action in that first line.',
      },
    ],
    related: [
      { href: '/playbook/linkedin-strategy-founders-2026', label: 'LinkedIn strategy for founders' },
      { href: '/playbook/personal-brand-startup-founder-2026', label: 'Founder personal brand' },
      { href: '/services/founder-profiling', label: 'Founder profiling' },
    ],
    category: 'BusinessApplication',
  },
  {
    slug: 'qr-code-generator',
    name: 'QR Code Generator',
    group: 'everyday',
    blurb: 'Make static QR codes for links, WiFi, contacts and more. PNG or SVG.',
    title: 'Free QR Code Generator: PNG and SVG, No Expiry',
    description:
      'Free QR code generator for URLs, WiFi, vCards, email, SMS and text. Custom colours, high-res PNG and SVG downloads, and codes that never expire. No signup.',
    h1: ['Make a ', 'QR code', '.'],
    intro:
      'Create a static QR code for a link, WiFi network, contact card, email or text message. Download it as PNG or SVG for print and slides.',
    howto: [
      'Pick the type and fill in the details.',
      'Set colours, size and error correction.',
      'Download the PNG or SVG and test it with a phone.',
    ],
    faqs: [
      {
        q: 'Do free QR codes expire?',
        a: 'Static QR codes like the ones made here never expire because the content is stored in the code itself. Codes from "dynamic" QR services point to a redirect link that can stop working if you cancel a subscription. If the destination may change, link to a page you control.',
      },
      {
        q: 'What size should a printed QR code be?',
        a: 'A good rule is a minimum of 2 x 2 cm (about 0.8 inches) for close scanning, and roughly one tenth of the scanning distance for posters. Leave a quiet zone of empty space around it and keep strong contrast, dark on light.',
      },
      {
        q: 'Which error correction level should I choose?',
        a: 'M (15%) suits most uses. Choose Q (25%) or H (30%) if the code will be printed small, on rough surfaces, or with a logo placed over it. Higher levels make the code denser, so only go up when you need to.',
      },
    ],
    related: [
      { href: '/tools/utm-builder', label: 'UTM link builder' },
      { href: '/tools/marketing-checklist', label: 'Marketing checklist' },
      { href: '/services/kol-marketing', label: 'KOL marketing' },
    ],
    category: 'MultimediaApplication',
  },
  {
    slug: 'hashtag-generator',
    name: 'Hashtag Generator',
    group: 'everyday',
    blurb: 'Get broad, niche and keyword hashtags sized for each platform.',
    title: 'Free Hashtag Generator for Instagram, LinkedIn and X',
    description:
      'Free hashtag generator. Get broad, niche and keyword hashtags for AI, Web3, SaaS and more, sized for Instagram, LinkedIn, X and TikTok. No signup.',
    h1: ['Find the ', 'right', ' hashtags.'],
    intro:
      'Generate a balanced set of broad, niche and custom hashtags for your topic, then copy the right number for each platform.',
    howto: [
      'Type your topic and pick a niche and platform.',
      'Tap hashtags to add or remove them.',
      'Copy the selected set into your post.',
    ],
    faqs: [
      {
        q: 'How many hashtags should I use on Instagram in 2026?',
        a: 'Instagram allows 30, but it now recommends 3 to 5 relevant hashtags. A small, specific set helps the post get categorised correctly. Mix one or two broad tags with a few niche ones that match the content.',
      },
      {
        q: 'Do hashtags still work on LinkedIn?',
        a: 'They help a little with discovery but are no longer a major reach driver. Use 3 to 5 at the end of the post, chosen for the topic rather than for size. Clear writing and strong comments matter far more.',
      },
      {
        q: 'Which hashtags should I avoid?',
        a: 'Avoid engagement-bait tags such as #followforfollow or #like4like, and any tag that has been restricted for spam. They can limit reach and attract low-quality accounts. Check a tag on the platform before using it for the first time.',
      },
    ],
    related: [
      { href: '/playbook/linkedin-strategy-founders-2026', label: 'LinkedIn strategy for founders' },
      { href: '/services/kol-marketing', label: 'KOL marketing' },
      { href: '/services/web3-pr-campaigns', label: 'Web3 PR campaigns' },
    ],
    category: 'BusinessApplication',
  },
  {
    slug: 'bio-and-caption-generator',
    name: 'Instagram and LinkedIn Bio and Caption Generator',
    group: 'everyday',
    blurb: 'Write Instagram bios, LinkedIn headlines and captions in your voice.',
    title: 'Free Instagram and LinkedIn Bio and Caption Generator',
    description:
      'Free bio and caption generator. Write Instagram bios, LinkedIn headlines, About sections and post captions in your tone, with live character counts. No signup.',
    h1: ['Write a bio that ', 'sounds', ' like you.'],
    intro:
      'Turn a few facts about you into Instagram bios, LinkedIn headlines, About sections and captions. Every version shows its character count.',
    howto: [
      'Add your name, role, who you help and one proof point.',
      'Pick a tab and a personality.',
      'Copy the version you like and edit it to taste.',
    ],
    faqs: [
      {
        q: 'What should I put in my LinkedIn headline?',
        a: 'Say what you do, who you do it for and one proof point, in up to 220 characters. "Fractional CMO for seed-stage AI startups | 40+ launches" works better than a job title alone. The first 60 or so characters show in comments and search, so lead with the most important part.',
      },
      {
        q: 'How do I write a good Instagram bio?',
        a: 'You have 150 characters. Cover what you do, who it is for, one reason to trust you and a clear next step, like a link or a DM keyword. Line breaks and one or two emoji make it easier to scan.',
      },
      {
        q: 'How long should a LinkedIn About section be?',
        a: 'You can use up to 2,600 characters, but 200 to 300 words is plenty for most founders. Open with who you help and the problem you solve, add two or three proof points, and end with how to reach you.',
      },
    ],
    related: [
      { href: '/playbook/personal-brand-startup-founder-2026', label: 'Founder personal brand' },
      { href: '/services/founder-profiling', label: 'Founder profiling' },
      { href: '/playbook/linkedin-strategy-founders-2026', label: 'LinkedIn strategy for founders' },
    ],
    category: 'BusinessApplication',
  },
  {
    slug: 'email-subject-line-tester',
    name: 'Email Subject Line Tester and Spam Word Checker',
    group: 'everyday',
    blurb: 'Score subject lines and scan emails for spam trigger words.',
    title: 'Free Email Subject Line Tester and Spam Word Checker',
    description:
      'Free email subject line tester. Score length, mobile cut-off and tone, and scan your subject and body for 200+ spam trigger words. No signup needed.',
    h1: ['Test your ', 'subject', ' line.'],
    intro:
      'Score a subject line, preview it in a desktop and mobile inbox, and scan the email for words that push it toward spam.',
    howto: [
      'Type your subject line and preview text.',
      'Paste the email body to scan it for spam words.',
      'Fix the flagged items and check the inbox preview.',
    ],
    faqs: [
      {
        q: 'What is the best length for an email subject line?',
        a: 'Aim for 30 to 50 characters, or about 4 to 9 words. Mobile inboxes often show only the first 35 to 40 characters, so put the key words first. Short subject lines are easier to scan and less likely to be cut.',
      },
      {
        q: 'Do spam trigger words still matter in 2026?',
        a: 'Less than they used to. Gmail and Outlook rely mostly on sender reputation, authentication (SPF, DKIM, DMARC) and engagement. Heavy use of phrases like "free money" or "act now" can still add risk, and it lowers trust with readers.',
      },
      {
        q: 'Should I use emoji in subject lines?',
        a: 'One relevant emoji can help a subject stand out, especially for consumer brands. More than one tends to look promotional, and some clients render them poorly. Never let an emoji replace the actual message.',
      },
    ],
    related: [
      { href: '/playbook/founder-led-diy-pr-2026', label: 'Founder-led DIY PR' },
      { href: '/playbook/crypto-media-relations-guide-2026', label: 'Crypto media relations' },
      { href: '/services/content-writing', label: 'Content writing' },
    ],
    category: 'BusinessApplication',
  },
];
