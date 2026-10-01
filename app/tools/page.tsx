import type { Metadata } from 'next';
import { EditorialScripts } from '@/components/site/EditorialScripts';
import { EditorialShell } from '@/components/site/EditorialChrome';
import { JsonLd, ToolCta } from './_components/ToolSections';
import { SITE_URL } from './_lib/seo';
import '../blog/blog.css';
import './tools.css';

const TITLE = 'Free Marketing Tools for AI and Web3 Startups';
const DESCRIPTION =
  'Free, no-signup tools for AI and Web3 founders: a GTM planner, a startup marketing budget calculator and an interactive marketing checklist covering 20 channels.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/tools` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/tools`,
    type: 'website',
  },
};

const TOOLS = [
  {
    href: '/tools/gtm-planner',
    name: 'AI Startup GTM Planner',
    tag: 'Planner',
    blurb:
      'Pick your category, stage, buyer, motion and budget. Get a positioning prompt, a ranked channel mix with dollar amounts, a 90-day plan, metrics and top risks.',
    cta: 'Build your plan',
  },
  {
    href: '/tools/marketing-budget-calculator',
    name: 'Startup Marketing Budget Calculator',
    tag: 'Calculator',
    blurb:
      'Size your marketing budget from burn, split it across people, programs and tools, allocate it to channels, and estimate leads, CAC, LTV:CAC and payback.',
    cta: 'Run the numbers',
  },
  {
    href: '/tools/marketing-checklist',
    name: 'Startup Marketing Checklist',
    tag: 'Checklist',
    blurb:
      'Foundations, pre-launch, launch week, the first 90 days and always-on habits, plus concrete basics for 20 channels. Progress saves in your browser.',
    cta: 'Open the checklist',
  },
];

function buildJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/tools`,
        url: `${SITE_URL}/tools`,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: 'en',
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: TOOLS.map((t, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${SITE_URL}${t.href}`,
            name: t.name,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: `${SITE_URL}/tools` },
        ],
      },
    ],
  };
}

export default function ToolsIndexPage() {
  return (
    <>
      <JsonLd id="tools-collection-jsonld" data={buildJsonLd()} />
      <EditorialShell active="playbook">
        <main className="blog-page tool-page">
          <div className="blog-page-inner">
            <section className="blog-index-hero">
              <div>
                <p className="blog-index-kicker">
                  <span className="dot" /> Free tools · {TOOLS.length} and counting
                </p>
                <h1 className="blog-index-title">
                  Free <em>tools</em>.
                </h1>
              </div>
              <div className="blog-index-blurb">
                <p>
                  The planning tools I wish every founder opened before their first launch call. No signup, no email
                  gate, and everything runs in your browser.
                </p>
              </div>
            </section>

            <div className="blog-list">
              {TOOLS.map((t, i) => (
                <a key={t.href} href={t.href} className="blog-card" data-magnet aria-label={`Open ${t.name}`}>
                  <div className="blog-card-media" aria-hidden>
                    <div className="tool-card-num">{String(i + 1).padStart(2, '0')}</div>
                  </div>
                  <div className="blog-card-meta">
                    <span>Tool {String(i + 1).padStart(2, '0')}</span>
                    <span className="blog-card-tag">{t.tag}</span>
                  </div>
                  <h2 className="blog-card-title">{t.name}</h2>
                  <p className="blog-card-blurb">{t.blurb}</p>
                  <span className="blog-card-cta">{t.cta}</span>
                </a>
              ))}
              <a href="/resources" className="blog-card" data-magnet aria-label="Browse free downloadable resources">
                <div className="blog-card-media" aria-hidden>
                  <div className="tool-card-num">+</div>
                </div>
                <div className="blog-card-meta">
                  <span>Downloads</span>
                  <span className="blog-card-tag subtle">Resources</span>
                </div>
                <h2 className="blog-card-title">Templates and downloads</h2>
                <p className="blog-card-blurb">
                  Downloadable templates and guides for founders planning PR, launches and marketing. Pairs well
                  with the tools above.
                </p>
                <span className="blog-card-cta">Browse resources</span>
              </a>
            </div>

            <ToolCta />
          </div>
        </main>
      </EditorialShell>
      <EditorialScripts />
    </>
  );
}
