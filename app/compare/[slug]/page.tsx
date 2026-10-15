import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { EditorialScripts } from '@/components/site/EditorialScripts';
import { EditorialShell } from '@/components/site/EditorialChrome';
import ComparisonTable from '../_components/ComparisonTable';
import CoverageCost from '../_components/CoverageCost';
import { AGENCIES, agencyBySlug, comparePath } from '../_data/agencies';
import {
  CALENDLY,
  LAST_VERIFIED,
  LAST_VERIFIED_ISO,
  SHILIKA_COVERAGE,
  SHILIKA_PROOF,
} from '../_data/shilika';
import { money } from '../_components/shared';
import '../../blog/blog.css';
import '../compare.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';
const PREFIX = 'shilika-jain-vs-';

export const dynamicParams = false;

export function generateStaticParams() {
  return AGENCIES.map((a) => ({ slug: `${PREFIX}${a.slug}` }));
}

function load(slug: string) {
  if (!slug.startsWith(PREFIX)) return undefined;
  return agencyBySlug(slug.slice(PREFIX.length));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = load((await params).slug);
  if (!a) return {};
  const url = `${SITE_URL}${comparePath(a)}`;
  const title = `Shilika Jain vs ${a.name} (2026): Cost, Team & Market Reach`;
  const description = `${a.name} or a senior fractional PR operator? Side-by-side on who pitches, which markets each reaches, and what it costs. ${a.pricing.label} vs $3K–$7K a month.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
    },
  };
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const a = load((await params).slug);
  if (!a) notFound();

  const url = `${SITE_URL}${comparePath(a)}`;
  const others = AGENCIES.filter((x) => x.slug !== a.slug);
  const sameCategory = a.category === 'web3' ? 'crypto & Web3' : 'AI & tech';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: `Shilika Jain vs ${a.name}`,
        description: a.intro,
        inLanguage: 'en',
        dateModified: LAST_VERIFIED_ISO,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: [
          { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: 'Shilika Jain', url: `${SITE_URL}/about` },
          { '@type': 'Organization', name: a.name, url: a.url },
        ],
        author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: 'Shilika Jain' },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: a.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Compare', item: `${SITE_URL}/compare` },
          { '@type': 'ListItem', position: 3, name: `Shilika Jain vs ${a.name}`, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id={`compare-${a.slug}-jsonld`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EditorialShell>
        <main className="blog-page cmp-page">
          <div className="blog-page-inner">
            <header className="cmp-hero">
              <p className="cmp-kicker">
                <a href="/compare">Compare</a>
                <span className="sep">/</span>
                <span>{a.category === 'web3' ? 'Crypto & Web3 PR' : 'AI & tech PR'}</span>
              </p>
              <h1 className="cmp-h1">
                Shilika Jain vs {a.name}: <em>{a.hook}</em>
              </h1>
              <p className="cmp-lede">{a.intro}</p>
              <div className="cmp-hero-meta">
                <a href={CALENDLY} target="_blank" rel="noopener" className="cmp-btn cmp-btn-lime" data-magnet>
                  Book a 30-min call
                </a>
                <a href="#calculator" className="cmp-btn cmp-btn-ghost">
                  Run the cost comparison
                </a>
                <span className="cmp-verified">Last verified {LAST_VERIFIED}</span>
              </div>

              <div className="cmp-verdict">
                <p className="cmp-label">The short version</p>
                <p className="cmp-verdict-text">{a.verdict}</p>
              </div>
            </header>

            <section className="cmp-section" aria-labelledby="glance">
              <p className="cmp-label" id="glance">
                At a glance
              </p>
              <div className="cmp-glance">
                <Glance
                  title="Who pitches"
                  them={a.whoShort}
                  us="Shilika, on every pitch"
                  name={a.short}
                />
                <Glance title="Monthly cost" them={a.pricing.label} us="$3K–$7K retainer" name={a.short} />
                <Glance
                  title="Native markets"
                  them={`${Object.values(a.coverage).filter((c) => c === 2).length} of 8 we track`}
                  us={`${Object.values(SHILIKA_COVERAGE).filter((c) => c === 2).length} of 8 we track`}
                  name={a.short}
                />
                <Glance title="Firms to manage" them="1, plus regional agencies for gaps" us="1 operator, 1 plan" name={a.short} />
              </div>
            </section>

            <section className="cmp-section" aria-labelledby="edges">
              <p className="cmp-label">The difference</p>
              <h2 className="cmp-h2" id="edges">
                What Shilika handles that {a.short} <em>leaves to you</em>
              </h2>
              <div className="cmp-cards">
                {a.edges.map((e, i) => (
                  <article key={e.title} className={`cmp-card${i === 0 ? ' is-dark' : ''}`}>
                    <span className="cmp-card-num">0{i + 1}</span>
                    <h3>{e.title}</h3>
                    <p>{e.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="cmp-section" aria-labelledby="side-by-side">
              <p className="cmp-label">Side by side</p>
              <h2 className="cmp-h2" id="side-by-side">
                {a.name} vs Shilika Jain, <em>line by line</em>
              </h2>
              <p className="cmp-sub">Filter by what matters most to you. On mobile, each row stacks.</p>
              <ComparisonTable agencyName={a.name} agencyRows={a.rows} />
            </section>

            <section className="cmp-section" id="calculator" aria-labelledby="calc">
              <p className="cmp-label">Interactive</p>
              <h2 className="cmp-h2" id="calc">
                Your markets, your budget, <em>your call</em>
              </h2>
              <p className="cmp-sub">
                Pick the markets your launch needs. The tool shows where {a.short} has in-house reach, where you would
                need a second firm, and what each route costs over the engagement.
              </p>
              <CoverageCost agencyName={a.short} coverage={a.coverage} pricing={a.pricing} />
            </section>

            <section className="cmp-callout" aria-labelledby="subcontract">
              <h2 id="subcontract">Agencies already hire Shilika. You can skip the middle.</h2>
              <p>
                When an agency wins a client that needs Korean, Japanese, Chinese or Gulf coverage and it has no desk
                there, it subcontracts the work. Shilika is regularly that subcontractor. Hiring her directly means
                the same relationships and the same pitches, without an agency margin on top or a strategy that gets
                relayed second-hand.
              </p>
            </section>

            <section className="cmp-section" aria-labelledby="profile">
              <p className="cmp-label">Fair is fair</p>
              <h2 className="cmp-h2" id="profile">
                What {a.short} <em>does well</em>
              </h2>
              <div className="cmp-profile">
                <div className="cmp-profile-facts">
                  <dl>
                    <dt>Website</dt>
                    <dd>
                      <a href={a.url} target="_blank" rel="noopener nofollow">
                        {a.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                      </a>
                    </dd>
                    <dt>Headquarters</dt>
                    <dd>{a.hq}</dd>
                    <dt>Founded</dt>
                    <dd>{a.founded}</dd>
                    <dt>Team</dt>
                    <dd>{a.team}</dd>
                    <dt>Pricing</dt>
                    <dd>
                      {a.pricing.label}. {a.pricing.note}
                    </dd>
                    <dt>Services</dt>
                    <dd>{a.services.join(', ')}</dd>
                    {a.clients.length > 0 && (
                      <>
                        <dt>Named clients</dt>
                        <dd>{a.clients.join(', ')}</dd>
                      </>
                    )}
                  </dl>
                </div>
                <div className="cmp-profile-lists">
                  <div>
                    <h3>Strengths</h3>
                    <ul>
                      {a.strengths.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3>Where founders hit limits</h3>
                    <ul>
                      {a.limits.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="cmp-section" aria-labelledby="when">
              <p className="cmp-label">Decision</p>
              <h2 className="cmp-h2" id="when">
                When {a.short} is enough, and when you need <em>Shilika</em>
              </h2>
              <div className="cmp-when">
                <div>
                  <h3>Choose {a.short} if</h3>
                  <ul>
                    {a.whenAgency.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="is-us">
                  <h3>Choose Shilika if</h3>
                  <ul>
                    {a.whenShilika.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
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
                “Her network is outstanding. Outlets that once felt out of reach became regular coverage, both in
                crypto and mainstream tech media.”
              </p>
              <cite>Gafoor Khan, Web3 &amp; AI founder, advisor and angel investor</cite>
            </blockquote>

            <section className="cmp-section" aria-labelledby="faq">
              <p className="cmp-label">FAQ</p>
              <h2 className="cmp-h2" id="faq">
                Common questions about {a.short} and <em>Shilika</em>
              </h2>
              <div className="cmp-faq">
                {a.faqs.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="post-cta cmp-cta" aria-label="Work with Shilika">
              <h3>
                Skip the account team. Work with the <em>operator</em>.
              </h3>
              <p>
                Send your launch date and target markets. You get a reply within 24 hours with the outlets Shilika
                would go after first, in which order, and what it costs. Retainers run {money(3000)}–{money(7000)} a
                month; launch sprints run {money(15000)}–{money(40000)}.
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

            <section className="cmp-section" aria-labelledby="more">
              <p className="cmp-label">More comparisons</p>
              <h2 className="cmp-h2" id="more">
                Comparing other <em>{sameCategory}</em> agencies?
              </h2>
              <nav className="cmp-more" aria-label="Other comparisons">
                {[...others.filter((o) => o.category === a.category), ...others.filter((o) => o.category !== a.category)].map((o) => (
                  <a key={o.slug} href={comparePath(o)}>
                    <span>vs {o.name}</span>
                    <span>{o.category === 'web3' ? 'Web3' : 'AI'}</span>
                  </a>
                ))}
                <a href="/compare">
                  <span>All comparisons</span>
                  <span>Hub</span>
                </a>
              </nav>
            </section>

            <footer className="cmp-sources">
              <p>
                Information about {a.name} comes from its public website, published case studies, review platforms and
                press coverage, checked {LAST_VERIFIED}. Agencies change their teams and pricing; if anything here is
                out of date, email <a href="mailto:shilika498@gmail.com">shilika498@gmail.com</a> and it will be
                corrected.
              </p>
              <ul>
                {a.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener nofollow">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </footer>
          </div>
        </main>
      </EditorialShell>
      <EditorialScripts />
    </>
  );
}

function Glance({ title, them, us, name }: { title: string; them: string; us: string; name: string }) {
  return (
    <div className="cmp-glance-card">
      <h3>{title}</h3>
      <dl>
        <div>
          <dt>{name}</dt>
          <dd>{them}</dd>
        </div>
        <div>
          <dt>Shilika Jain</dt>
          <dd className="is-us">{us}</dd>
        </div>
      </dl>
    </div>
  );
}
