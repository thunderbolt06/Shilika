// Intro copy for the seven hub pages (SEO 30d D15). Each intro says who the hub is for, what is
// in it, and links to three items. Blog, playbook, services and tools link to their top three
// pages by GSC impressions (10 Aug to 7 Nov 2026, data/seo-30d/gsc-l90/page.csv). Glossary has
// two terms with impressions, so the third is picked by hand. Resources are file downloads with
// no page of their own, and /press has no child pages, so those links are picked by hand too.

export type HubKey = 'blog' | 'playbook' | 'services' | 'tools' | 'press' | 'resources' | 'glossary';

type HubIntro = { label: string; paragraphs: string[] };

const a = (href: string, text: string) => `<a href="${href}">${text}</a>`;

export const HUB_INTROS: Record<HubKey, HubIntro> = {
  blog: {
    label: 'About this blog',
    paragraphs: [
      'This blog is for founders and marketing leads at Web3, AI and cybersecurity startups who run PR themselves or manage the person who does. Each post takes one problem from launch work and answers it in full: which desk to pitch, when an embargo helps, what to send after a reporter says no. Shilika Jain writes them from her own campaigns, so the advice names real outlets and real steps.',
      `The three posts that show up most in Google search are ${a(
        '/blog/how-to-pitch-coindesk-the-block-blockworks-decrypt-2026',
        'how to pitch CoinDesk, The Block, Blockworks and Decrypt',
      )}, ${a(
        '/blog/ai-startup-pr-techcrunch-the-information-forbes-2026',
        'AI startup PR for TechCrunch, The Information and Forbes',
      )}, and ${a(
        '/blog/how-to-pitch-dark-reading-cyberscoop-sc-media-the-record-2026',
        'how to pitch Dark Reading, CyberScoop, SC Media and The Record',
      )}. For longer guides on pricing and agency choice, go to the ${a('/playbook', 'playbook')}.`,
    ],
  },
  playbook: {
    label: 'About the playbook',
    paragraphs: [
      'The playbook is for founders who are about to spend money on PR and want to check the facts first. It holds the long guides: how to pitch one outlet, what PR costs, how agencies compare, and how each APAC market works. Every guide is written to be read once and used the same week. Read one before you sign a retainer, brief an agency or plan a launch.',
      `Start with the three guides people find most often in Google: ${a(
        '/playbook/how-to-pitch-cointelegraph-2026',
        'how to pitch Cointelegraph',
      )}, ${a('/playbook/best-b2b-saas-pr-agencies-2026', 'the best B2B SaaS PR agencies')}, and ${a(
        '/playbook/best-defi-pr-agency-2026',
        'how to choose a DeFi PR agency',
      )}. Shorter notes from current campaigns are on the ${a('/blog', 'blog')}, and the ${a(
        '/services',
        'services page',
      )} shows how Shilika works with founders.`,
    ],
  },
  services: {
    label: 'About these services',
    paragraphs: [
      'These services are for Web3, AI and cybersecurity startups that need press coverage and do not want a full agency team. Shilika Jain does the work herself as a fractional PR consultant: she plans the story, writes the pitch, talks to reporters and reports back to the founder. Retainers are sized to the work, and founders deal with her directly.',
      `Each service has its own page with scope, process and common questions. The three that people look for most are ${a(
        '/services/kol-marketing',
        'KOL marketing',
      )}, ${a('/services/cybersecurity-pr', 'cybersecurity PR')} and ${a(
        '/services/ai-startup-pr',
        'AI startup PR',
      )}. If you are not sure which one fits, read the ${a(
        '/work',
        'case studies',
      )} to see what past campaigns looked like, or ${a('/contact', 'send a short brief')}.`,
    ],
  },
  tools: {
    label: 'About these tools',
    paragraphs: [
      'These tools are for founders, marketers and PR people who need a quick answer and do not want to open a spreadsheet. Each one does a single job: score a headline, check a test result, build a tracking link, write a short bio. They run in your browser, they are free, and you do not need an account.',
      `The three most searched tools are the ${a('/tools/headline-analyzer', 'headline analyzer')}, the ${a(
        '/tools/ab-test-significance-calculator',
        'A/B test significance calculator',
      )} and the ${a(
        '/tools/personal-brand-bio-writer',
        'personal brand bio writer',
      )}. The full list below is grouped by task, so you can scan for what you need. If you would rather print something and fill it in by hand, the ${a(
        '/resources',
        'resources page',
      )} has checklists and templates to download.`,
    ],
  },
  press: {
    label: 'About this page',
    paragraphs: [
      'This page is for founders checking a track record, and for reporters and event organisers who need proof before they say yes. It lists published stories Shilika Jain placed for clients in outlets such as Forbes, CoinDesk, Cointelegraph, Decrypt, Blockworks and The Block. Each logo links to the article on the outlet’s own site, so you can read the coverage yourself.',
      `To see the campaign behind a story, read the case studies. The three that show up most in search are ${a(
        '/work/fluence',
        'Fluence',
      )}, ${a('/work/mantra-chain', 'MANTRA Chain')} and ${a(
        '/work/gaia-ai',
        'Gaia',
      )}. Further down the page is a media kit with posters and share cards you can use when you write about Shilika or introduce her on stage. For what clients say in their own words, go to ${a(
        '/testimonials',
        'testimonials',
      )}.`,
    ],
  },
  resources: {
    label: 'About these resources',
    paragraphs: [
      'These downloads are for founders at an early stage and first marketing hires who need a working document today. Each file is a checklist, worksheet or template that Shilika Jain uses with clients, saved as a PDF or an Excel sheet. They are free, and you do not have to give an email address to get them.',
      `If your goal is press coverage, start with these three: the ${a(
        '/resources/press-kit-and-launch-pr-template.pdf',
        'press kit and launch PR template',
      )}, the ${a(
        '/resources/journalist-pitch-email-templates.pdf',
        'journalist pitch email templates',
      )} and the ${a(
        '/resources/media-list-template.xlsx',
        'media list template',
      )}. The rest cover marketing plans, budgets, positioning and launch checklists. Some of them also exist as ${a(
        '/tools',
        'free browser tools',
      )} that do the maths for you, and the ${a('/playbook', 'playbook')} explains the thinking behind each one.`,
    ],
  },
  glossary: {
    label: 'About this glossary',
    paragraphs: [
      'This glossary is for founders who hear a PR or marketing term in a call and want a plain answer before the next one. Each entry starts with a short definition you can repeat to your team. After that it explains how the idea works on a real campaign, what it costs in time or money, and where people get it wrong.',
      `Good places to start are ${a('/glossary/what-is-a-kol-wave', 'what a KOL wave is')}, ${a(
        '/glossary/what-is-fractional-pr',
        'what fractional PR means',
      )} and ${a(
        '/glossary/what-is-geo-generative-engine-optimization',
        'what GEO, or generative engine optimization, is',
      )}. The list is short on purpose. When you want the full method behind a definition, the ${a(
        '/playbook',
        'playbook',
      )} has the long guides.`,
    ],
  },
};

/** Intro as an HTML string. `section` adds page gutters for the partial-based hubs. */
export function hubIntroHtml(hub: HubKey, variant: 'inline' | 'section' = 'inline'): string {
  const intro = HUB_INTROS[hub];
  const cls = variant === 'section' ? 'hub-intro hub-intro--section' : 'hub-intro';
  const body = intro.paragraphs.map((p) => `<p>${p}</p>`).join('');
  return `<section class="${cls}" aria-label="${intro.label}">${body}</section>`;
}

/** Puts the intro right after the first `.section-head` block of a body partial. */
export function withHubIntro(html: string, hub: HubKey): string {
  const start = html.indexOf('<div class="section-head">');
  if (start === -1) return html;
  const end = html.indexOf('</div>', start);
  if (end === -1) return html;
  const cut = end + '</div>'.length;
  return html.slice(0, cut) + hubIntroHtml(hub, 'section') + html.slice(cut);
}
