import type { Metadata } from 'next';
import Script from 'next/script';
import { EditorialScripts } from '@/components/site/EditorialScripts';
import { EditorialShell } from '@/components/site/EditorialChrome';
import '../blog/blog.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

type Resource = {
  slug: string;
  file: string;
  title: string;
  description: string;
  format: 'PDF' | 'Excel';
  meta: string;
  tag: string;
};

const RESOURCES: Resource[] = [
  {
    slug: 'startup-marketing-checklist',
    file: '/resources/startup-marketing-checklist.pdf',
    title: 'The Startup Marketing Checklist',
    description:
      '115 checkbox items across Foundations, Pre-launch, Launch week, First 90 days and Always-on, from ICP and SPF/DKIM/DMARC to quarterly messaging refreshes. Includes a one-page summary of all 20 channels.',
    format: 'PDF',
    meta: 'PDF · 10 pages',
    tag: 'Checklist',
  },
  {
    slug: '20-marketing-channels-playbook',
    file: '/resources/20-marketing-channels-playbook.pdf',
    title: 'The 20 Marketing Channels Playbook',
    description:
      'An overview matrix of cost, time to first result and skill needed, then each channel in depth: when it fits, the first three actions, the metric to watch and the common mistake. Ends with a "pick 3 channels by stage" page.',
    format: 'PDF',
    meta: 'PDF · 11 pages',
    tag: 'Playbook',
  },
  {
    slug: 'ai-startup-gtm-canvas',
    file: '/resources/ai-startup-gtm-canvas.pdf',
    title: 'The AI Startup GTM Canvas',
    description:
      'A one-page go-to-market canvas (market, ICP, problem, alternatives, positioning, pricing, motion, channels, metrics, risks), a 90-day plan worksheet and an illustrative filled example.',
    format: 'PDF',
    meta: 'PDF · 5 pages',
    tag: 'Canvas',
  },
  {
    slug: 'marketing-budget-template',
    file: '/resources/marketing-budget-template.xlsx',
    title: 'Marketing Budget Template',
    description:
      'A 12-month workbook with low, mid and high scenarios, a line for all 20 channels plus people, tools, events, PR and contingency, a channel test tracker with kill criteria, and a CAC, LTV and payback calculator.',
    format: 'Excel',
    meta: 'Excel (.xlsx) · 4 sheets',
    tag: 'Template',
  },
  {
    slug: 'press-kit-and-launch-pr-template',
    file: '/resources/press-kit-and-launch-pr-template.pdf',
    title: 'Press Kit and Launch PR Template',
    description:
      'Press kit checklist, boilerplate, fact sheet and founder bio templates, an annotated press release, an embargo note and a launch timeline from T-21 to T+7.',
    format: 'PDF',
    meta: 'PDF · 6 pages',
    tag: 'PR',
  },
  {
    slug: 'journalist-pitch-email-templates',
    file: '/resources/journalist-pitch-email-templates.pdf',
    title: 'Journalist Pitch Email Templates',
    description:
      'Twelve short pitch templates (exclusive, embargo, funding, data, reactive, op-ed, podcast, follow-up, thank you and more), subject-line formulas and the do and don’t rules reporters care about.',
    format: 'PDF',
    meta: 'PDF · 7 pages',
    tag: 'PR',
  },
  {
    slug: 'icp-and-positioning-worksheet',
    file: '/resources/icp-and-positioning-worksheet.pdf',
    title: 'ICP and Positioning Worksheet',
    description:
      'Firmographics, trigger events, pains, buying committee and disqualifiers, then a positioning canvas, a positioning statement template and a messaging hierarchy.',
    format: 'PDF',
    meta: 'PDF · 6 pages',
    tag: 'Worksheet',
  },
  {
    slug: 'product-launch-checklist',
    file: '/resources/product-launch-checklist.pdf',
    title: 'The Product Launch Checklist',
    description:
      'T-28 to T+14, tagged by workstream: Product Hunt, Show HN, waitlist conversion, press, social, community and email, sequenced so each piece feeds the next.',
    format: 'PDF',
    meta: 'PDF · 5 pages',
    tag: 'Checklist',
  },
  {
    slug: '30-day-founder-content-calendar',
    file: '/resources/30-day-founder-content-calendar.pdf',
    title: '30-Day Founder Content Calendar',
    description:
      'Thirty LinkedIn and X prompts with a post type for each day, ten hook formulas and a 90-minute weekly batching routine.',
    format: 'PDF',
    meta: 'PDF · 5 pages',
    tag: 'Calendar',
  },
  {
    slug: 'geo-ai-search-checklist',
    file: '/resources/geo-ai-search-checklist.pdf',
    title: 'The GEO and AI Search Checklist',
    description:
      'How to get cited by ChatGPT, Perplexity, Claude, Gemini and AI Overviews: entity consistency, Organization and Person schema, citable paragraphs, FAQ, llms.txt, earned mentions, forums and a monthly measurement routine.',
    format: 'PDF',
    meta: 'PDF · 6 pages',
    tag: 'GEO',
  },
  {
    slug: 'pr-agency-evaluation-scorecard',
    file: '/resources/pr-agency-evaluation-scorecard.pdf',
    title: 'PR Agency Evaluation Scorecard',
    description:
      'Twenty-five questions to ask a PR agency or consultant, grouped by team, results, process, pricing and contract, with a 1 to 5 scoring grid and a red flags list.',
    format: 'PDF',
    meta: 'PDF · 5 pages',
    tag: 'Scorecard',
  },
  {
    slug: 'media-list-template',
    file: '/resources/media-list-template.xlsx',
    title: 'Media List Template',
    description:
      'Outlet, tier, journalist, beat, recent article, contact method, last contacted, status and embargo reliability, with dropdowns, plus a pitch tracker sheet with follow-up dates and hit rate.',
    format: 'Excel',
    meta: 'Excel (.xlsx) · 3 sheets',
    tag: 'Template',
  },
];

const TOOLS = [
  {
    href: '/tools/gtm-planner',
    title: 'GTM Planner',
    blurb: 'Work through your go-to-market decisions in the browser, from ICP to channels.',
  },
  {
    href: '/tools/marketing-budget-calculator',
    title: 'Marketing Budget Calculator',
    blurb: 'Model marketing spend by channel and see the totals as you go.',
  },
  {
    href: '/tools/marketing-checklist',
    title: 'Interactive Marketing Checklist',
    blurb: 'Tick through the startup marketing checklist in the browser.',
  },
];

const ENCODING: Record<Resource['format'], string> = {
  PDF: 'application/pdf',
  Excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

export const metadata: Metadata = {
  title: 'Free Marketing & PR Resources for Startups: Templates and Checklists',
  description:
    'Free downloads for Web3, AI and cybersecurity founders: startup marketing checklist, 20-channel playbook, GTM canvas, budget template, press kit, pitch templates and more.',
  alternates: { canonical: `${SITE_URL}/resources` },
  openGraph: {
    title: 'Free Marketing & PR Resources for Startups',
    description:
      'Checklists, templates and worksheets written by a senior PR operator. Free PDF and Excel downloads.',
    url: `${SITE_URL}/resources`,
    type: 'website',
  },
};

function buildJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/resources`,
        url: `${SITE_URL}/resources`,
        name: 'Free Marketing & PR Resources',
        description:
          'Free checklists, templates and worksheets for Web3, AI and cybersecurity founders, covering marketing foundations, channels, launches, PR and AI search.',
        inLanguage: 'en',
        mainEntity: { '@id': `${SITE_URL}/resources#list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/resources#list`,
        name: 'Free marketing and PR resources',
        numberOfItems: RESOURCES.length,
        itemListElement: RESOURCES.map((r, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'DigitalDocument',
            name: r.title,
            description: r.description,
            url: `${SITE_URL}${r.file}`,
            encodingFormat: ENCODING[r.format],
            isAccessibleForFree: true,
            author: { '@type': 'Person', name: 'Shilika Jain', url: `${SITE_URL}/about` },
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Resources', item: `${SITE_URL}/resources` },
        ],
      },
    ],
  };
}

export default function ResourcesPage() {
  const jsonLd = JSON.stringify(buildJsonLd());
  return (
    <>
      <Script
        id="resources-collection-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <EditorialShell active="playbook">
        <main className="blog-page">
          <div className="blog-page-inner">
            <section className="blog-index-hero">
              <div>
                <p className="blog-index-kicker">
                  <span className="dot" /> Resources · {RESOURCES.length} free downloads
                </p>
                <h1 className="blog-index-title">
                  Take the <em>templates</em>.
                </h1>
              </div>
              <div className="blog-index-blurb">
                <p>
                  The checklists, worksheets and templates used on real launches for Web3, AI and cybersecurity
                  founders. Free PDF and Excel downloads, no email gate. Want them interactive? Try the{' '}
                  <a href="/tools" style={{ color: 'inherit', textDecoration: 'underline' }}>
                    free tools
                  </a>
                  .
                </p>
              </div>
            </section>

            <div className="blog-list">
              {RESOURCES.map((r, i) => (
                <a
                  key={r.slug}
                  id={r.slug}
                  href={r.file}
                  download
                  className="blog-card"
                  data-magnet
                  aria-label={`Download ${r.title} (${r.meta})`}
                >
                  <div className="blog-card-media" aria-hidden>
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'grid',
                        placeItems: 'center',
                        fontFamily: 'var(--font-display)',
                        fontStyle: 'italic',
                        fontSize: 'clamp(48px, 5vw, 80px)',
                        color: 'var(--ink)',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="blog-card-meta">
                    <span>{r.meta}</span>
                    <span className="blog-card-tag">{r.tag}</span>
                  </div>
                  <h2 className="blog-card-title">{r.title}</h2>
                  <p className="blog-card-blurb">{r.description}</p>
                  <span className="blog-card-cta">Download {r.format === 'PDF' ? 'PDF' : '.xlsx'}</span>
                </a>
              ))}
            </div>

            <section
              className="blog-index-hero"
              style={{ marginTop: 96, borderBottom: 'none', borderTop: '1px solid var(--line)', paddingTop: 60 }}
            >
              <div>
                <p className="blog-index-kicker">
                  <span className="dot" /> Interactive tools
                </p>
                <h2 className="blog-card-title" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
                  Prefer to <em>click</em> than print?
                </h2>
              </div>
              <div className="blog-index-blurb">
                <p>
                  Three of these resources also exist as free browser tools. Same thinking, with the maths done for
                  you. Browse them all at <a href="/tools" style={{ color: 'inherit', textDecoration: 'underline' }}>/tools</a>.
                </p>
              </div>
            </section>

            <div className="blog-list" style={{ marginTop: 32 }}>
              {TOOLS.map((t) => (
                <a key={t.href} href={t.href} className="blog-card" data-magnet aria-label={`Open ${t.title}`}>
                  <div className="blog-card-meta">
                    <span>Interactive tool</span>
                    <span className="blog-card-tag subtle">Free</span>
                  </div>
                  <h2 className="blog-card-title">{t.title}</h2>
                  <p className="blog-card-blurb">{t.blurb}</p>
                  <span className="blog-card-cta">Open tool</span>
                </a>
              ))}
              <a href="/contact" className="blog-card" data-magnet aria-label="Book a 30-minute teardown">
                <div className="blog-card-meta">
                  <span>Work with Shilika</span>
                  <span className="blog-card-tag">30 minutes</span>
                </div>
                <h2 className="blog-card-title">Want a senior operator on your launch?</h2>
                <p className="blog-card-blurb">
                  Book a 30-minute teardown of your launch plan, positioning or last campaign. Six years in Web3, AI
                  and cybersecurity PR, 50+ protocols, coverage in Forbes, CoinDesk, Cointelegraph, Decrypt, The
                  Block, Blockworks and AI Magazine.
                </p>
                <span className="blog-card-cta">Book a teardown</span>
              </a>
            </div>
          </div>
        </main>
      </EditorialShell>
      <EditorialScripts />
    </>
  );
}
