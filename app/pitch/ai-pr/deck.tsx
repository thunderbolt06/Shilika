'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import '../deck.css';

const NOTES: string[][] = [
  [
    'This is my plan to make your AI startup the one the press, and the AI models, talk about. Hover any dotted term on screen for my talking point.',
    'Everything in this deck is real: real placements, real outlets, real timelines from campaigns I ran personally.',
  ],
  [
    'The core shift: buyers and investors no longer just Google you, they ask ChatGPT and Perplexity about you. Those models answer from earned media, not from your homepage.',
    'Ahrefs studied ~75K brands: branded media mentions correlate with AI visibility at 0.66, three times stronger than backlinks. PR is now an AI-distribution channel.',
  ],
  [
    'Quick background: six-plus years leading PR and comms for AI and deep-tech companies, with 200+ direct media and journalist relationships across global and APAC markets.',
    'The client list matters less than the pattern: deep-tech stories, translated into coverage that compounds.',
  ],
  [
    'Two things clients say they hired me for. First: I lead point on strategy and execution myself, including the journalist relationships and punctual follow-ups. Second: direct media relationships in every regional market, one tight strategy instead of juggling agencies in every market.',
  ],
  [
    'Organic is hard: an editor has to choose your story. That is exactly why it carries credibility and brand authority.',
    'Paid is easy: you pay, it publishes within a week, it says "sponsored", and readers, journalists and AI models discount it accordingly. I work organic-first, and craft paid media strategies only if you insist on fast-tracking coverage.',
  ],
  [
    'If a raise is anywhere on your roadmap, founder profiling is the highest-leverage PR you can do. Investors diligence founders in public long before the data room opens.',
    'At Gaia we profiled both founders in parallel, CEO and COO, which doubled the surface area for podcasts, commentary and interviews.',
  ],
  [
    'Gaia is decentralized AI infrastructure, a hard, technical story. Fourteen earned placements and interviews in four months, anchored by Forbes, The Boss Code and a podcast with Rug Radio.',
    'Note the shape: it starts with founder commentary in December, compounds into features, and by month four the outlets are more open to accepting key announcements from the company.',
  ],
  [
    'This is a subset of my full publication list, outlets where I can secure articles for AI projects today, through relationships, not a paid wire.',
  ],
  [
    'This is the monthly engine. Nothing exotic, the edge is senior execution at every step and punctual follow-through with individual journalists.',
  ],
  [
    'One retainer, scoped by cadence and founder-profiling depth. Paid placements are an optional add-on, quoted transparently per outlet. For APAC markets I put together custom plans.',
  ],
  [
    'Bring your PR and credibility goals to the call, whether that is a launch or a fundraise timeline, and I will map the strategy on how to move ahead before you commit to anything.',
  ],
];

type Slide = { ink?: boolean; node: ReactNode };

const SLIDES: Slide[] = [
  // 01 · Hero
  {
    ink: true,
    node: (
      <>
        <div className="s-head">
          <span className="s-wordmark">
            Shilika<span className="slash">/</span>Jain
          </span>
          <span className="s-stamp">Digital PR · AI Startups</span>
        </div>
        <div className="s-body" style={{ justifyContent: 'center' }}>
          <p className="s-kicker" style={{ marginBottom: '2cqh' }}>
            A digital PR plan for your AI startup
          </p>
          <h1 className="s-h1">
            In the age of AI,
            <br />
            attention is cheap.
            <br />
            <span className="acc">Credibility isn&apos;t.</span>
          </h1>
          <p className="s-lead" style={{ marginTop: '3cqh' }}>
            Organic, earned media for AI startups - global and regional, executed personally.
          </p>
        </div>
      </>
    ),
  },
  // 02 · Why digital PR
  {
    node: (
      <>
        <div className="s-head">
          <h2 className="s-h2">
            Why digital PR,
            <br />
            why now.
          </h2>
          <span className="s-num">02 / 11</span>
        </div>
        <div className="s-body" style={{ justifyContent: 'center', gap: '3.5cqh' }}>
          <div className="flow">
            <div className="flow-item">
              <div className="flow-n">01</div>
              <div className="flow-name">Everyone claims “AI-powered”</div>
              <div className="flow-line">
                Demos are cheap and launches are weekly. Earned coverage is proof that someone
                with{' '}
                <span className="term">
                  no individual stake in your business
                  <span className="tip">
                    A journalist who chose your story is a third-party endorsement. An ad or a
                    sponsored post is you talking about yourself.
                  </span>
                </span>{' '}
                vouched for you.
              </div>
            </div>
            <div className="flow-item">
              <div className="flow-n">02</div>
              <div className="flow-name">AI answers are the new front page</div>
              <div className="flow-line">
                ChatGPT, Perplexity and AI Overviews describe your company from{' '}
                <span className="term">
                  what the press wrote
                  <span className="tip">
                    LLMs learn who you are from high-authority coverage. No earned media, and the
                    model either ignores you or makes it up.
                  </span>
                </span>
                , not your homepage.
              </div>
            </div>
            <div className="flow-item">
              <div className="flow-n">03</div>
              <div className="flow-name">Investors diligence in public</div>
              <div className="flow-line">
                Before any meeting, investors search you on Google, ChatGPT and X. What&apos;s
                written about you and your founders is the first data room.
              </div>
            </div>
          </div>
          <div>
            <p className="s-kicker" style={{ marginBottom: '1.8cqh' }}>
              Correlation with brand visibility in AI answers · ~75K brands · Ahrefs 2026
            </p>
            <div className="bars">
              <div className="bar-row">
                <span className="bar-name">Branded media mentions</span>
                <span className="bar-track">
                  <span className="bar-fill hi" style={{ width: '100%' }} />
                </span>
                <span className="bar-val">0.66</span>
              </div>
              <div className="bar-row">
                <span className="bar-name">Domain Rating</span>
                <span className="bar-track">
                  <span className="bar-fill" style={{ width: '50%' }} />
                </span>
                <span className="bar-val">0.33</span>
              </div>
              <div className="bar-row">
                <span className="bar-name">Backlinks</span>
                <span className="bar-track">
                  <span className="bar-fill" style={{ width: '33%' }} />
                </span>
                <span className="bar-val">0.22</span>
              </div>
            </div>
            <p className="s-lead" style={{ marginTop: '2cqh', fontSize: '1.5cqw', maxWidth: '64cqw' }}>
              Being <span className="acc">talked about</span> actively beats backlinks 3-to-1. PR
              is now an AI-distribution channel.
            </p>
          </div>
        </div>
      </>
    ),
  },
  // 03 · Who you're working with
  {
    node: (
      <>
        <div className="s-head">
          <h2 className="s-h2">
            Who you&apos;d be
            <br />
            working with.
          </h2>
          <span className="s-num">03 / 11</span>
        </div>
        <div className="s-body" style={{ justifyContent: 'center', gap: '4cqh' }}>
          <div className="stat-row">
            <div className="stat">
              <div className="stat-num">6+ yrs</div>
              <div className="stat-label">Leading PR and comms for AI and deep-tech companies</div>
            </div>
            <div className="stat">
              <div className="stat-num">15+</div>
              <div className="stat-label">
                AI and deep-tech clients including{' '}
                <a href="https://www.gaianet.ai" target="_blank" rel="noopener noreferrer">Gaia AI</a>,{' '}
                <a href="https://assisterr.ai" target="_blank" rel="noopener noreferrer">Assisterr</a>,{' '}
                <a href="https://daski.io" target="_blank" rel="noopener noreferrer">Daski AI</a>,{' '}
                <a href="https://chainbase.com" target="_blank" rel="noopener noreferrer">Chainbase</a>,{' '}
                <a href="https://perceptis.ai" target="_blank" rel="noopener noreferrer">Perceptis</a>{' '}
                and more
              </div>
            </div>
            <div className="stat">
              <div className="stat-num">200+</div>
              <div className="stat-label">
                Direct media and journalist relationships in the global and APAC markets
              </div>
            </div>
            <div className="stat">
              <div className="stat-num">5+</div>
              <div className="stat-label">
                Activations run on-ground during conferences like{' '}
                <a href="https://www.superai.com" target="_blank" rel="noopener noreferrer">
                  SuperAI Singapore
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  // 04 · Two incentives
  {
    node: (
      <>
        <div className="s-head">
          <h2 className="s-h2">
            Why founders
            <br />
            work with me.
          </h2>
          <span className="s-num">04 / 11</span>
        </div>
        <div className="s-body" style={{ justifyContent: 'center', gap: '3cqh' }}>
          <div className="flow" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '2cqh 3cqw' }}>
            <div className="flow-item">
              <div className="flow-n">Incentive 01</div>
              <div className="flow-name" style={{ fontSize: '2.4cqw' }}>
                I lead point on strategy and execution myself.
              </div>
              <div className="flow-line" style={{ fontSize: '1.4cqw' }}>
                The person you brief writes the narrative, drafts the pitch, manages the
                relationship with the journalist and follows up punctually.
              </div>
            </div>
            <div className="flow-item">
              <div className="flow-n">Incentive 02</div>
              <div className="flow-name" style={{ fontSize: '2.4cqw' }}>
                Direct media relationships in every regional market.
              </div>
              <div className="flow-line" style={{ fontSize: '1.4cqw' }}>
                I spent years building relationships in the local markets, so instead of hiring
                different agencies in different markets, you get one tight strategy. And since I
                control the strategy, the execution stays result-oriented.
              </div>
            </div>
          </div>
          <p className="s-lead" style={{ maxWidth: '62cqw' }}>
            Senior execution + market access, in one person. That&apos;s the crux.
          </p>
        </div>
      </>
    ),
  },
  // 05 · Organic vs paid
  {
    node: (
      <>
        <div className="s-head">
          <h2 className="s-h2">Earned PR vs. paid press release.</h2>
          <span className="s-num">05 / 11</span>
        </div>
        <div className="s-body">
          <div className="tiers">
            <div className="tier tier--exec">
              <div className="tier-name">Organic · earned coverage</div>
              <div className="tier-price">
                Hard<small> · and worth it</small>
              </div>
              <p className="tier-sub">An editor has to choose your story. That&apos;s the point.</p>
              <ul className="tier-list">
                <li>Real editorial, in the journalist&apos;s own voice</li>
                <li>Very high credibility &amp; brand authority</li>
                <li>Compounds, one story leads to the next</li>
                <li>The coverage AI models trust and cite</li>
                <li>Survives as a permanent, linkable proof point</li>
              </ul>
            </div>
            <div className="tier">
              <div className="tier-name">Paid press release</div>
              <div className="tier-price">
                Easy<small> · guaranteed · fast</small>
              </div>
              <p className="tier-sub">You pay, it publishes. And it reads that way.</p>
              <ul className="tier-list">
                <li>Live within a week</li>
                <li>Tagged “sponsored”, “press release” or syndicated wire copy</li>
                <li>Readers, journalists and AI models don&apos;t necessarily cite it</li>
                <li>Low brand authority and credibility</li>
              </ul>
            </div>
          </div>
          <p className="s-lead" style={{ marginTop: '2.4cqh', fontSize: '1.5cqw', maxWidth: '66cqw' }}>
            I work <span className="acc">organic-first</span> and craft paid media strategies if
            you insist on fast-tracking coverage.
          </p>
        </div>
      </>
    ),
  },
  // 06 · Founder profiling
  {
    node: (
      <>
        <div className="s-head">
          <h2 className="s-h2">
            Investors fund founders
            <br />
            they&apos;ve <span className="acc">already heard of.</span>
          </h2>
          <span className="s-num">06 / 11</span>
        </div>
        <div className="s-body" style={{ justifyContent: 'center', gap: '3.5cqh' }}>
          <div className="flow">
            <div className="flow-item">
              <div className="flow-n">Pre-raise</div>
              <div className="flow-name">Build the public track record</div>
              <div className="flow-line">
                Expert commentary, podcasts and op-eds put your thinking on record before the data
                room opens. Warm intros get warmer.
              </div>
            </div>
            <div className="flow-item">
              <div className="flow-n">The raise</div>
              <div className="flow-name">Your biggest press window</div>
              <div className="flow-line">
                A funding announcement is planned like a launch:{' '}
                <span className="term">
                  exclusive, embargo, tiered outreach
                  <span className="tip">
                    One outlet gets the exclusive, a second tier gets the embargo, everyone else
                    gets the release on the day. That sequencing is what turns one news item into a
                    wave.
                  </span>
                </span>
                .
              </div>
            </div>
            <div className="flow-item">
              <div className="flow-n">Post-raise</div>
              <div className="flow-name">Keep the story alive</div>
              <div className="flow-line">
                Vision op-eds, milestone and partnership press keeps the momentum going for your
                stakeholders, including potential partners, investors and customers.
              </div>
            </div>
          </div>
          <p className="s-lead" style={{ maxWidth: '62cqw' }}>
            If fundraising is anywhere on your roadmap,{' '}
            <span className="acc">founder profiling</span> is the highest-leverage PR you can do.
          </p>
        </div>
      </>
    ),
  },
  // 07 · Case study: Gaia
  {
    ink: true,
    node: (
      <>
        <div className="s-head">
          <p className="s-kicker">Case study · Gaia, decentralized AI infrastructure</p>
          <span className="s-num">07 / 11</span>
        </div>
        <div className="s-body" style={{ gap: '3cqh' }}>
          <h2 className="s-h2" style={{ fontSize: '3.4cqw' }}>
            14 earned placements &amp; interviews <span className="acc">in 4 months.</span>
          </h2>
          <div className="stat-row">
            <div className="stat">
              <div className="stat-num">14</div>
              <div className="stat-label">Placements &amp; interviews, Dec 2024 to Mar 2025</div>
            </div>
            <div className="stat">
              <div className="stat-num">8</div>
              <div className="stat-label">Podcasts &amp; video interviews secured</div>
            </div>
            <div className="stat">
              <div className="stat-num">2</div>
              <div className="stat-label">Founders profiled in parallel, CEO &amp; COO</div>
            </div>
            <div className="stat">
              <div className="stat-num">Forbes</div>
              <div className="stat-label">Plus The Boss Code and a podcast with Rug Radio</div>
            </div>
          </div>
          <div className="flow">
            <div className="flow-item">
              <div className="flow-n">Dec 2024 · Seed</div>
              <div className="flow-name" style={{ fontSize: '1.7cqw' }}>Founder commentary first</div>
              <div className="flow-line">
                Forbes: “AI Agents 101, the future of the agentic web.” A podcast with Rug Radio in
                the same month.
              </div>
            </div>
            <div className="flow-item">
              <div className="flow-n">Jan–Feb 2025 · Build</div>
              <div className="flow-name" style={{ fontSize: '1.7cqw' }}>Features follow</div>
              <div className="flow-line">
                The Boss Code: “This is how AI agents will replace everything”, plus exclusive
                founder interviews.
              </div>
            </div>
            <div className="flow-item">
              <div className="flow-n">Mar 2025 · Compound</div>
              <div className="flow-name" style={{ fontSize: '1.7cqw' }}>Milestones become news</div>
              <div className="flow-line">
                By month four, outlets are more open to accepting key announcements from the
                company.
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  // 08 · Outlets
  {
    node: (
      <>
        <div className="s-head">
          <h2 className="s-h2">
            A subset of my
            <br />
            <span className="acc">full publication list.</span>
          </h2>
          <span className="s-num">08 / 11</span>
        </div>
        <div className="s-body" style={{ justifyContent: 'center', gap: '3cqh' }}>
          <div className="outlets">
            <div className="outlet"><span className="outlet-name">Forbes</span><span className="outlet-tag">Business</span></div>
            <div className="outlet"><span className="outlet-name">Reuters</span><span className="outlet-tag">News</span></div>
            <div className="outlet"><span className="outlet-name">Bloomberg</span><span className="outlet-tag">Finance</span></div>
            <div className="outlet"><span className="outlet-name">Fortune</span><span className="outlet-tag">Business</span></div>
            <div className="outlet"><span className="outlet-name">The Verge</span><span className="outlet-tag">Tech</span></div>
            <div className="outlet"><span className="outlet-name">Fast Company</span><span className="outlet-tag">Business</span></div>
            <div className="outlet"><span className="outlet-name">TNW</span><span className="outlet-tag">Tech</span></div>
            <div className="outlet"><span className="outlet-name">VentureBeat</span><span className="outlet-tag">AI · Tech</span></div>
            <div className="outlet"><span className="outlet-name">Tech Times</span><span className="outlet-tag">Tech</span></div>
            <div className="outlet"><span className="outlet-name">Unite.AI</span><span className="outlet-tag">AI</span></div>
            <div className="outlet"><span className="outlet-name">Analytics Insight</span><span className="outlet-tag">AI · Data</span></div>
            <div className="outlet"><span className="outlet-name">The AI Journal</span><span className="outlet-tag">AI</span></div>
            <div className="outlet"><span className="outlet-name">TechBullion</span><span className="outlet-tag">Fintech</span></div>
            <div className="outlet"><span className="outlet-name">TechBuzz.ai</span><span className="outlet-tag">AI</span></div>
            <div className="outlet"><span className="outlet-name">Pulse 2.0</span><span className="outlet-tag">Business</span></div>
            <div className="outlet"><span className="outlet-name">CXO Digital Pulse</span><span className="outlet-tag">Enterprise</span></div>
            <div className="outlet"><span className="outlet-name">The SaaS News</span><span className="outlet-tag">SaaS</span></div>
          </div>
        </div>
      </>
    ),
  },
  // 09 · Engine
  {
    node: (
      <>
        <div className="s-head">
          <h2 className="s-h2">The monthly engine.</h2>
          <span className="s-num">09 / 11</span>
        </div>
        <div className="s-body" style={{ justifyContent: 'center' }}>
          <div className="flow" style={{ gap: '2.4cqh 2cqw' }}>
            <div className="flow-item">
              <div className="flow-n">01</div>
              <div className="flow-name">Narrative</div>
              <div className="flow-line">
                Positioning, messaging and a story bank the press actually wants.
              </div>
            </div>
            <div className="flow-item">
              <div className="flow-n">02</div>
              <div className="flow-name">Press materials</div>
              <div className="flow-line">
                Releases, op-eds, founder bios and pitch notes, drafted for each outlet.
              </div>
            </div>
            <div className="flow-item">
              <div className="flow-n">03</div>
              <div className="flow-name">Targeted pitching</div>
              <div className="flow-line">
                Journalist-by-journalist outreach curated according to the product.
              </div>
            </div>
            <div className="flow-item">
              <div className="flow-n">04</div>
              <div className="flow-name">Founder profiling</div>
              <div className="flow-line">
                Podcasts, expert commentary, op-eds and speaker spots for your founders.
              </div>
            </div>
            <div className="flow-item">
              <div className="flow-n">05</div>
              <div className="flow-name">Localisation</div>
              <div className="flow-line">
                Regional angles and translated materials for the markets of Korea, China, Japan,
                Vietnam, Singapore, India and the broader Southeast Asia.
              </div>
            </div>
            <div className="flow-item">
              <div className="flow-n">06</div>
              <div className="flow-name">Monitor &amp; report</div>
              <div className="flow-line">
                Coverage tracker, share of voice, and what we pitch next, reported every month.
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  // 10 · Engagement
  {
    node: (
      <>
        <div className="s-head">
          <h2 className="s-h2">How we&apos;d work.</h2>
          <span className="s-num">10 / 11</span>
        </div>
        <div className="s-body">
          <div className="tiers">
            <div className="tier tier--exec">
              <div className="tier-name">Organic PR retainer</div>
              <div className="tier-price">
                $4k–7k<small> / month</small>
              </div>
              <p className="tier-sub">Scoped by cadence and founder-profiling depth.</p>
              <ul className="tier-list">
                <li>Narrative, messaging &amp; press kit</li>
                <li>Monthly targeted pitching, done by me</li>
                <li>Founder profiling, podcasts, op-eds, commentary</li>
                <li>Press for global markets</li>
                <li>Coverage tracker &amp; monthly reporting</li>
                <li>* For APAC markets, custom plans to be provided</li>
              </ul>
            </div>
            <div className="tier">
              <div className="tier-name">Fast-track add-on · optional</div>
              <div className="tier-price">
                At cost<small> · per outlet</small>
              </div>
              <p className="tier-sub">Paid placements, only if you want to fast-track a moment.</p>
              <ul className="tier-list">
                <li>Quoted transparently, outlet by outlet</li>
                <li>Used to drive traction to a launch or announcement</li>
                <li>Never a substitute for earned coverage</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    ),
  },
  // 11 · CTA
  {
    ink: true,
    node: (
      <>
        <div className="s-head">
          <span className="s-wordmark">
            Shilika<span className="slash">/</span>Jain
          </span>
          <span className="s-num">11 / 11</span>
        </div>
        <div className="s-body" style={{ justifyContent: 'center' }}>
          <span className="s-stamp" style={{ alignSelf: 'flex-start', marginBottom: '2.5cqh' }}>
            Organic-first
          </span>
          <h1 className="s-h1" style={{ fontSize: '5.4cqw' }}>
            Let&apos;s make your AI startup
            <br />
            <span className="acc">the story.</span>
          </h1>
          <p className="s-lead" style={{ marginTop: '3cqh' }}>
            A 30-minute call: bring your goals with PR or driving credibility, may it be a launch
            or a fundraise timeline, and I&apos;ll map the strategy on how to move ahead.
          </p>
          <p className="s-kicker" style={{ marginTop: '3cqh' }}>
            <a className="cta-link" href="https://calendly.com/shilikajain/30min" target="_blank" rel="noopener noreferrer">
              calendly.com/shilikajain/30min
            </a>{' '}
            ·{' '}
            <a className="cta-link" href="https://www.shilikajain.com" target="_blank" rel="noopener noreferrer">
              shilikajain.com
            </a>{' '}
            ·{' '}
            <a className="cta-link" href="https://t.me/shilika3" target="_blank" rel="noopener noreferrer">
              t.me/shilika3
            </a>
          </p>
        </div>
      </>
    ),
  },
];

const SLIDE_COUNT = SLIDES.length;

export function Deck({ print = false }: { print?: boolean }) {
  const [index, setIndex] = useState(0);
  const [notesOpen, setNotesOpen] = useState(false);

  const go = useCallback((next: number) => {
    setIndex(Math.max(0, Math.min(SLIDE_COUNT - 1, next)));
  }, []);

  useEffect(() => {
    if (print) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        setIndex((i) => Math.min(SLIDE_COUNT - 1, i + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        setIndex((i) => Math.max(0, i - 1));
      } else if (e.key === 'Home') {
        setIndex(0);
      } else if (e.key === 'End') {
        setIndex(SLIDE_COUNT - 1);
      } else if (e.key.toLowerCase() === 'n') {
        setNotesOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [print]);

  if (print) {
    return (
      <div className="deck is-print">
        {SLIDES.map((s, i) => (
          <div className="deck-stage" key={i}>
            <div className={`slide is-active${s.ink ? ' slide--ink' : ''}`}>{s.node}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="deck">
      <div className="deck-hint">
        ← → move
        <br />N notes
      </div>

      <div className="deck-stage">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={`slide${index === i ? ' is-active' : ''}${s.ink ? ' slide--ink' : ''}`}
            aria-hidden={index !== i}
          >
            {s.node}
          </div>
        ))}
      </div>

      <div className="deck-nav">
        <button aria-label="Previous slide" onClick={() => go(index - 1)}>
          ← Prev
        </button>
        <span className="divider" />
        <div className="deck-dots">
          {Array.from({ length: SLIDE_COUNT }, (_, i) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <i key={i} className={i === index ? 'active' : ''} onClick={() => go(i)} />
          ))}
        </div>
        <span className="count">
          {String(index + 1).padStart(2, '0')} / {SLIDE_COUNT}
        </span>
        <span className="divider" />
        <button className={notesOpen ? 'on' : ''} onClick={() => setNotesOpen((o) => !o)}>
          Notes
        </button>
        <span className="divider" />
        <button aria-label="Next slide" onClick={() => go(index + 1)}>
          Next →
        </button>
      </div>

      <div className={`notes${notesOpen ? ' open' : ''}`}>
        <h4>Speaker notes · slide {index + 1}</h4>
        {NOTES[index].map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </div>
  );
}
