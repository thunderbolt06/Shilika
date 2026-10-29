import type { Metadata } from 'next';
import { EditorialScripts } from '@/components/site/EditorialScripts';
import { EditorialShell } from '@/components/site/EditorialChrome';
import MarketFinder from './_components/MarketFinder';
import { AGENCIES, comparePath } from './_data/agencies';
import { CALENDLY, CORE_REASONS, DISCLOSURE, LAST_VERIFIED, LAST_VERIFIED_ISO, PUBLISHED_ISO, SHILIKA_PROOF } from './_data/shilika';
import type { Agency } from './_data/types';
import { PhotoBand } from '@/components/site/Media';
import { articleNode } from '@/lib/article-schema';
import { ogImage } from '@/lib/i18n/og';
import '../blog/blog.css';
import './compare.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';
const URL = `${SITE_URL}/compare`;
const CARD = ogImage('/compare', SITE_URL);
const TITLE = 'Best Crypto & AI PR Agencies 2026, Compared | Shilika Jain';
const DESCRIPTION =
  'The top 5 crypto PR agencies and top 5 AI PR agencies in 2026, compared on who pitches, markets reached and cost, plus the senior fractional alternative.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: 'website',
    images: [CARD],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: CARD.url, alt: CARD.alt }],
  },
};

const FAQS = [
  {
    q: 'What is the best crypto PR agency in 2026?',
    a: 'It depends on where your users are. Wachsman leads for institutional and regulatory work, Coinbound for influencer-led retail campaigns, MarketAcross for placement volume in English-language crypto media, Luna PR for the Gulf and MENA, and Melrose for US business press. If your launch needs the US plus Korea, Japan, China or the Gulf in one coordinated plan, a senior operator like Shilika Jain covers all of them for $3K–$7K a month instead of two agencies at $10K–$15K+ each.',
  },
  {
    q: 'What is the best AI PR agency in 2026?',
    a: 'Highwire PR, Bospar, Inkhouse, Hotwire and SHIFT Communications are among the most hired AI and tech PR firms, mostly for US and UK coverage. Most are built around US and UK media, with Hotwire the main exception in Asia. They suit later-stage companies with large budgets. AI startups that need tier-1 tech coverage plus Asian markets on a seed or Series A budget usually get more from a senior fractional operator who pitches personally.',
  },
  {
    q: 'How much do crypto and AI PR agencies cost?',
    a: 'Most established crypto and tech PR agencies charge $10K–$15K a month at the entry level, and $20K–$40K+ for multi-market programs, usually with a 3 to 6 month minimum. Shilika Jain works on a $3K–$7K monthly retainer, or a $15K–$40K sprint for a single launch.',
  },
  {
    q: 'Why hire an individual instead of an agency?',
    a: 'Because at most agencies the senior people sell the account and junior staff run it. With Shilika, the person on the first call writes every pitch and owns every journalist relationship. She also covers the US, China, Korea, Japan, the Middle East and Southeast Asia herself, so you run one strategy instead of coordinating two or three firms.',
  },
  {
    q: 'Do agencies really subcontract freelancers?',
    a: 'Yes. Agencies routinely subcontract specialists for markets or beats they cannot cover in-house, especially Korean, Japanese, Chinese and Gulf media. Hiring a specialist directly removes the agency margin and the extra hand-off.',
  },
];

export default function CompareHub() {
  const web3 = AGENCIES.filter((a) => a.category === 'web3').sort((a, b) => a.rank - b.rank);
  const ai = AGENCIES.filter((a) => a.category === 'ai').sort((a, b) => a.rank - b.rank);

  const itemList = (name: string, list: Agency[]) => ({
    '@type': 'ItemList',
    name,
    numberOfItems: list.length,
    itemListElement: list.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `Shilika Jain vs ${a.name}`,
      url: `${SITE_URL}${comparePath(a)}`,
    })),
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${URL}#collection`,
        url: URL,
        name: 'Best crypto and AI PR agencies 2026, compared',
        description: DESCRIPTION,
        inLanguage: 'en',
        dateModified: LAST_VERIFIED_ISO,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: 'Shilika Jain', url: `${SITE_URL}/about` },
        hasPart: [itemList('Top crypto and Web3 PR agencies 2026', web3), itemList('Top AI PR agencies 2026', ai)],
      },
      articleNode({
        url: URL,
        headline: 'Best crypto and AI PR agencies 2026, compared',
        description: DESCRIPTION,
        datePublished: PUBLISHED_ISO,
        dateModified: LAST_VERIFIED_ISO,
        about: `${URL}#collection`,
      }),
      {
        '@type': 'FAQPage',
        '@id': `${URL}#faq`,
        mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Compare', item: URL },
        ],
      },
    ],
  };

  return (
    <>
      <script id="compare-hub-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EditorialShell>
        <main className="blog-page cmp-page">
          <div className="blog-page-inner">
            <header className="cmp-hero">
              <p className="cmp-kicker">
                <a href="/">Shilika Jain</a>
                <span className="sep">/</span>
                <span>Compare</span>
              </p>
              <h1 className="cmp-h1">
                The best crypto and AI PR agencies, <em>compared honestly</em>.
              </h1>
              <p className="cmp-lede">
                Ten agencies founders shortlist most often in 2026: five for crypto and Web3, five for AI. Each one is
                compared on the three things that decide whether PR works: who actually pitches the journalist, which
                markets they can reach, and what you pay for it. Then the option most shortlists leave out.
              </p>
              <div className="cmp-jump">
                <a href="#crypto" className="cmp-btn cmp-btn-ghost">
                  Top crypto PR agencies
                </a>
                <a href="#ai" className="cmp-btn cmp-btn-ghost">
                  Top AI PR agencies
                </a>
                <a href="#finder" className="cmp-btn cmp-btn-ghost">
                  Market coverage tool
                </a>
                <a href={CALENDLY} target="_blank" rel="noopener" className="cmp-btn cmp-btn-lime" data-magnet>
                  Book a 30-min call
                </a>
              </div>
              <div className="cmp-verdict">
                <p className="cmp-label">The short version</p>
                <p className="cmp-verdict-text">
                  Every agency below does good work for the right client. But most are built around one or two
                  regions and a pyramid of junior staff. If you want a senior operator on every pitch and one plan
                  across the US, China, Korea, Japan, the Middle East and Southeast Asia, work with Shilika directly.
                </p>
              </div>
            </header>

            <PhotoBand
              id="lounge"
              eyebrow="Compare"
              title={
                <>
                  Ten agencies, <em>one honest read</em>.
                </>
              }
              sub="Who pitches, which markets, what it costs."
              sizes="(min-width: 1344px) 1280px, 100vw"
            />

            <section className="cmp-section" id="crypto" aria-labelledby="crypto-h">
              <p className="cmp-label">Crypto &amp; Web3 · Updated {LAST_VERIFIED}</p>
              <h2 className="cmp-h2" id="crypto-h">
                Top 5 crypto PR agencies <em>in 2026</em>
              </h2>
              <p className="cmp-sub">
                Ranked by visibility in founder shortlists, public client rosters and tier-1 crypto media track
                record. Click any agency for the full side-by-side.
              </p>
              <RankList list={web3} />
            </section>

            <section className="cmp-section" id="ai" aria-labelledby="ai-h">
              <p className="cmp-label">AI &amp; tech · Updated {LAST_VERIFIED}</p>
              <h2 className="cmp-h2" id="ai-h">
                Top 5 AI PR agencies <em>in 2026</em>
              </h2>
              <p className="cmp-sub">
                The firms AI startups hire most for tech, business and trade press. Strong in the US and UK, with
                varying reach beyond.
              </p>
              <RankList list={ai} />
            </section>

            <section className="cmp-section" id="finder" aria-labelledby="finder-h">
              <p className="cmp-label">Interactive</p>
              <h2 className="cmp-h2" id="finder-h">
                How many firms would your launch <em>actually need</em>?
              </h2>
              <p className="cmp-sub">
                Most agencies are strong in one or two regions. Pick your markets and see how many firms it takes to
                cover them with each option.
              </p>
              <MarketFinder
                agencies={[...web3, ...ai].map(({ slug, name, category, coverage }) => ({ slug, name, category, coverage }))}
              />
            </section>

            <section className="cmp-section" aria-labelledby="why">
              <p className="cmp-label">The alternative</p>
              <h2 className="cmp-h2" id="why">
                Why founders end up working with <em>Shilika directly</em>
              </h2>
              <div className="cmp-cards">
                {CORE_REASONS.map((r, i) => (
                  <article key={r.title} className={`cmp-card${i === 0 ? ' is-dark' : ''}`}>
                    <span className="cmp-card-num">0{i + 1}</span>
                    <h3>{r.title}</h3>
                    <p>{r.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <div className="cmp-proof" aria-label="Track record">
              {SHILIKA_PROOF.map((p) => (
                <div key={p.label}>
                  <strong>{p.value}</strong>
                  <span>{p.label}</span>
                </div>
              ))}
            </div>
            <blockquote className="cmp-quote">
              <p>
                “She’s built strong relationships with top journalists and publications around the world, which gives
                her a real edge when it comes to getting stories placed.”
              </p>
              <cite>Nicole Rochette, Web3 BD and fractional CMO, ex-Dapper Labs</cite>
            </blockquote>

            <section className="cmp-section" aria-labelledby="faq">
              <p className="cmp-label">FAQ</p>
              <h2 className="cmp-h2" id="faq">
                Choosing a PR partner, <em>answered</em>
              </h2>
              <div className="cmp-faq">
                {FAQS.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="post-cta cmp-cta" aria-label="Work with Shilika">
              <h3>
                Before you sign a $15K retainer, <em>talk to the operator</em>.
              </h3>
              <p>
                30 minutes, no deck. Bring your launch date, target markets and the agency proposal you are weighing.
                You leave with the outlets worth chasing first and an honest read on whether you need an agency at all.
              </p>
              <div className="tool-cta-links" style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <a href={CALENDLY} target="_blank" rel="noopener" data-magnet>
                  Book a 30-minute call
                </a>
                <a href="/contact" data-magnet style={{ background: 'transparent', color: 'var(--paper)', border: '1px solid rgba(255,255,255,0.4)' }}>
                  Send a project brief
                </a>
              </div>
            </section>

            <footer className="cmp-sources">
              <p>
                Agency details come from each firm’s public website, case studies, review platforms and press
                coverage, checked {LAST_VERIFIED}. Rankings reflect how often each firm appears in founder shortlists
                and public rankings, not a paid placement. Spot something out of date? Email{' '}
                <a href="mailto:shilika498@gmail.com">shilika498@gmail.com</a>.
              </p>
              <p>{DISCLOSURE}</p>
            </footer>
          </div>
        </main>
      </EditorialShell>
      <EditorialScripts />
    </>
  );
}

function RankList({ list }: { list: Agency[] }) {
  return (
    <div className="cmp-rank">
      {list.map((a, i) => (
        <article key={a.slug} className="cmp-rank-item">
          <span className="cmp-rank-num">{i + 1}</span>
          <div>
            <h3>{a.name}</h3>
            <p className="cmp-rank-meta">
              {a.hq} · Founded {a.founded} · {a.pricing.label}
            </p>
            <div className="cmp-rank-grid">
              <p>
                <b>Best for</b>
                {a.bestFor}
              </p>
              <p>
                <b>Watch out for</b>
                {a.watchOut}
              </p>
              <p>
                <b>Who pitches</b>
                {a.whoShort}
              </p>
            </div>
          </div>
          <a href={comparePath(a)} className="cmp-btn">
            vs Shilika
          </a>
        </article>
      ))}
      <article className="cmp-rank-item is-us">
        <span className="cmp-rank-num">+</span>
        <div>
          <h3>The alternative: Shilika Jain</h3>
          <p className="cmp-rank-meta">Senior fractional PR · US, China, Korea, Japan, Middle East, SEA · $3K–$7K/mo</p>
          <div className="cmp-rank-grid">
            <p>
              <b>Best for</b>
              Web3 and AI founders who want tier-1 coverage in the US and Asia from one senior operator.
            </p>
            <p>
              <b>Watch out for</b>
              One operator, so capacity is limited. A handful of clients at a time.
            </p>
            <p>
              <b>Who pitches</b>
              Shilika, personally, using 400+ journalist relationships built over six years.
            </p>
          </div>
        </div>
        <a href={CALENDLY} target="_blank" rel="noopener" className="cmp-btn cmp-btn-lime" data-magnet>
          Book a call
        </a>
      </article>
    </div>
  );
}
