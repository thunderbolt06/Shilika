import type { Metadata } from 'next';
import { EditorialScripts } from '@/components/site/EditorialScripts';
import { EditorialShell } from '@/components/site/EditorialChrome';
import ToolIndex, { type IndexGroup } from './_components/free/ToolIndex';
import { JsonLd } from './_components/ToolSections';
import { FREE_TOOLS, GROUPS } from './_data/free';
import { SITE_URL } from './_lib/seo';
import '../blog/blog.css';
import './tools.css';
import './free-tools.css';

const PLANNING: IndexGroup = {
  id: 'planning',
  label: 'Planning',
  blurb: 'Plan the launch before you spend.',
  tools: [
    {
      href: '/tools/gtm-planner',
      name: 'AI Startup GTM Planner',
      blurb: 'Positioning, a ranked channel mix and a 90-day plan for your stage.',
    },
    {
      href: '/tools/marketing-budget-calculator',
      name: 'Startup Marketing Budget Calculator',
      blurb: 'Size your budget from burn and estimate leads, CAC and payback.',
    },
    {
      href: '/tools/marketing-checklist',
      name: 'Startup Marketing Checklist',
      blurb: 'Every launch phase plus the basics for 20 channels.',
    },
  ],
};

const INDEX: IndexGroup[] = [
  ...GROUPS.map((g) => ({
    id: g.id,
    label: g.label,
    blurb: g.blurb,
    tools: FREE_TOOLS.filter((t) => t.group === g.id).map((t) => ({
      href: `/tools/${t.slug}`,
      name: t.name,
      blurb: t.blurb,
    })),
  })),
  PLANNING,
];

const COUNT = INDEX.reduce((a, g) => a + g.tools.length, 0);
const TITLE = 'Free Marketing Tools: SEO, PR, Social and Calculators';
const DESCRIPTION = `${COUNT} free marketing tools with no signup: UTM builder, SERP preview, schema and llms.txt generators, ROAS and A/B test calculators, press release generator and more.`;

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

function buildJsonLd() {
  const all = INDEX.flatMap((g) => g.tools);
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
          itemListElement: all.map((t, i) => ({
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
        <main className="blog-page tool-page ft-page">
          <div className="blog-page-inner">
            <section className="blog-index-hero">
              <div>
                <p className="blog-index-kicker">
                  <span className="dot" /> Free tools · {COUNT}
                </p>
                <h1 className="blog-index-title">
                  Free <em>tools</em>.
                </h1>
              </div>
              <div className="blog-index-blurb">
                <p>Marketing, SEO and PR tools that run in your browser. No signup.</p>
              </div>
            </section>

            <ToolIndex groups={INDEX} />

            <section className="ft-cta no-print" aria-label="Work with Shilika">
              <p>
                Need more than a tool? I run PR and growth for AI and Web3 founders.{' '}
                <a href="/contact" data-magnet>
                  Book a free 30-minute teardown →
                </a>
              </p>
            </section>
          </div>
        </main>
      </EditorialShell>
      <EditorialScripts />
    </>
  );
}
