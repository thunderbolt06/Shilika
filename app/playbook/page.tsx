import type { Metadata } from 'next';
import { EditorialScripts } from '@/components/site/EditorialScripts';
import { EditorialShell } from '@/components/site/EditorialChrome';
import '../blog/blog.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Playbooks — Field guides from inside Web3, AI & Cyber PR',
  description:
    'Ten long-form playbooks: the tier-1 PR trap, APAC PR playbook 2026, founder profiling sprint, crypto PR pricing, CoinDesk pitch guide, fractional vs agency, best Web3 PR agencies, crypto PR vs AI PR, the 2026 AI startup PR playbook, and cybersecurity PR in 2026.',
  alternates: { canonical: `${SITE_URL}/playbook` },
  openGraph: {
    title: 'Shilika Jain — Playbooks',
    description: 'Ten long-form playbooks from inside Web3, AI & cybersecurity PR.',
    url: `${SITE_URL}/playbook`,
    type: 'website',
  },
};

const PLAYBOOKS = [
  {
    n: 1,
    slug: 'tier-1-pr-trap',
    title: 'The Tier-1 PR Trap: Why Web3 Founders Chase the Wrong Outlets',
    description:
      'An 8-minute breakdown of why a Forbes mention can be worse than a niche placement, and how to read which publications actually move a roadmap.',
    tag: 'Pitfalls',
    time: 8,
  },
  {
    n: 2,
    slug: 'apac-pr-playbook-2026',
    title: 'APAC PR Playbook 2026: Korea, Japan, Vietnam, India',
    description:
      'An 11-minute regional teardown of which outlets matter (BloomingBit, CryptoTimes JP, ChainCatcher, Jinse, Inc42), how to pitch them, and what most agencies miss.',
    tag: 'APAC',
    time: 11,
  },
  {
    n: 3,
    slug: 'founder-profiling-sprint',
    title: 'Founder Profiling Sprint: 90 Days to Category Voice',
    description:
      'A 6-minute founder profiling sprint covering cadence, calendar, and the four hand-offs that turn a technical founder into a category-defining voice.',
    tag: 'Founder',
    time: 6,
  },
  {
    n: 4,
    slug: 'crypto-pr-cost-2026',
    title: 'How Much Does Crypto PR Cost in 2026? Honest Pricing',
    description:
      'What crypto PR actually costs in 2026: agency retainers, fractional models, single-launch sprints, KOL waves, and the hidden line items most contracts bury.',
    tag: 'Pricing',
    time: 9,
  },
  {
    n: 5,
    slug: 'get-featured-coindesk-2026',
    title: 'How to Get Featured in CoinDesk in 2026: Pitch Guide',
    description:
      'What CoinDesk editors filter for, pitch templates that land, embargo etiquette, and three worked examples from a senior Web3 PR operator’s 2026 playbook.',
    tag: 'Tier-1',
    time: 10,
  },
  {
    n: 6,
    slug: 'fractional-vs-agency',
    title: 'Fractional PR vs Web3 PR Agency: How to Choose in 2026',
    description:
      'Cost, speed, founder access, bandwidth, and accountability. A decision tree for Web3 and AI founders weighing the two engagement models.',
    tag: 'Operations',
    time: 7,
  },
  {
    n: 7,
    slug: 'best-web3-pr-agencies-2026',
    title: 'Best Web3 PR Agencies and Consultants in 2026: an Honest Field Guide',
    description:
      'A criteria-led 2026 ranking of Web3 PR firms — Lunar Strategy, EAK Digital, Coinbound, Outset PR, High Vibe PR — and a fractional senior-operator alternative.',
    tag: 'Field guide',
    time: 12,
  },
  {
    n: 8,
    slug: 'crypto-pr-vs-ai-pr',
    title: 'Crypto PR vs AI PR in 2026: How the Playbooks Differ',
    description:
      'A side-by-side teardown of the two PR playbooks. Crypto runs on speed and crypto-native outlets; AI runs on credibility and mainstream tech press.',
    tag: 'Strategy',
    time: 9,
  },
  {
    n: 9,
    slug: 'ai-startup-pr-2026',
    title: 'PR Strategy for AI Startups in 2026: The Playbook',
    description:
      'A 14-minute pillar on positioning, narrative architecture, journalist mapping (Forbes, The Information, TechCrunch, VentureBeat), AI Overviews citations, KOL waves and measurement — with the Gaia AI "Stripe for AI agents" worked example.',
    tag: 'AI',
    time: 14,
  },
  {
    n: 10,
    slug: 'cybersecurity-pr-2026',
    title: 'Cybersecurity PR in 2026: How Vendors Get Cited by Analysts and AI Engines',
    description:
      'A 12-minute pillar on the analyst-first, threat-research-led PR program. Gartner, Forrester and IDC briefing cadence, named security desks (Dark Reading, SC Media, CyberScoop, SecurityWeek), and the AI Mode citation tactics that move a vendor shortlist.',
    tag: 'Cyber',
    time: 12,
  },
];

export default function PlaybookIndexPage() {
  return (
    <>
      <EditorialShell active="playbook">
        <main className="blog-page">
          <div className="blog-page-inner">
            <section className="blog-index-hero">
              <div>
                <p className="blog-index-kicker">
                  <span className="dot" /> Playbook · 10 field guides
                </p>
                <h1 className="blog-index-title">
                  Field <em>guides</em>.
                </h1>
              </div>
              <div className="blog-index-blurb">
                <p>
                  The long-form playbooks that sit behind the practice. Pitch guides, regional
                  teardowns, pricing breakdowns, and the trade-offs every founder weighing PR
                  should know before signing.
                </p>
              </div>
            </section>

            <div className="blog-list">
              {PLAYBOOKS.map((p) => (
                <a
                  key={p.n}
                  href={`/playbook/${p.slug}`}
                  className="blog-card"
                  data-magnet
                  aria-label={`Read playbook ${p.n}: ${p.title}`}
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
                      {String(p.n).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="blog-card-meta">
                    <span>Playbook {String(p.n).padStart(2, '0')}</span>
                    <span className="blog-card-tag">{p.tag}</span>
                    <span className="blog-card-tag subtle">{p.time} min</span>
                  </div>
                  <h2 className="blog-card-title">{p.title}</h2>
                  <p className="blog-card-blurb">{p.description}</p>
                  <span className="blog-card-cta">Read playbook →</span>
                </a>
              ))}
            </div>
          </div>
        </main>
      </EditorialShell>
      <EditorialScripts />
    </>
  );
}
