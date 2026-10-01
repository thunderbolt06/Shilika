'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import '../deck.css';

const NOTES: string[][] = [
  [
    'This is my plan to make your Web3 project the one the press, the exchanges and the community talk about. Hover any dotted term on screen for my talking point.',
    'Everything in this deck is real: real placements, real outlets, real timelines from campaigns I ran personally.',
  ],
  [
    'Crypto runs on narratives. DePIN, RWA, AI agents: categories get hot, and coverage decides which projects get to define them.',
    'And after every rug and hack, readers discount what you say about yourself. Earned editorial is the strongest trust signal left in this industry.',
  ],
  [
    'Quick background: six-plus years in Web3 comms, from writing for protocols to building CoinMarketCap\'s APAC PR function from the ground up, 2021 to 2023.',
    'Fifty-plus protocols shaped, from Ripple and NEAR to MANTRA and RARI. The list matters less than the pattern: hard technical stories, translated into coverage that compounds.',
  ],
  [
    'Two things clients say they hired me for. First: I lead point on strategy and execution myself, including the journalist relationships and punctual follow-ups. Second: direct media relationships in the regional markets that actually move tokens, one tight strategy instead of an agency per market.',
  ],
  [
    'Organic is hard: an editor has to choose your story. That is exactly why it carries credibility and brand authority.',
    'Paid is easy: you pay, a wire syndicates it within a week, it says "press release", and readers, journalists and AI models discount it accordingly. I work organic-first, and craft paid media strategies only if you insist on fast-tracking coverage.',
  ],
  [
    'If a raise, a listing or a TGE is anywhere on your roadmap, founder profiling is the highest-leverage PR you can do. Investors and exchanges diligence founders in public long before the data room opens.',
  ],
  [
    'MANTRA came to me with a number: an 11 million dollar raise. We built the story first, institutional RWA tokenization with a Middle East angle, then sequenced the wave.',
    'CoinDesk took the exclusive, the follow-ons landed the same day, and the raise became a platform: the CEO\'s standalone Cointelegraph profile and the Milk Road podcast.',
  ],
  [
    'The playbook repeats. RARI\'s mainnet launch hit 11 tier-1 placements simultaneously with coordinated APAC translations. Fluence turned DePIN into a beat tier-1 reporters cover. Web3Auth\'s Google Cloud story went from Blockworks to Yahoo Finance with localised European placements.',
  ],
  [
    'This is the moat: the APAC wave. Korea\'s biggest business and tech outlets, tens of millions of monthly readers, plus Japan, Greater China, Vietnam and India, pitched to regional editors in their own language, not just syndicated.',
  ],
  [
    'This is a subset of my full publication list, the crypto-native tier plus the business press, through relationships, not a paid wire.',
  ],
  [
    'This is the monthly engine. Nothing exotic, the edge is senior execution at every step and punctual follow-through with individual journalists.',
  ],
  [
    'One retainer, scoped by markets, cadence and founder-profiling depth. Paid placements and KOL amplification are optional add-ons, quoted transparently.',
  ],
  [
    'Bring your PR and credibility goals to the call, whether that is a TGE, a raise or a mainnet launch, and I will map the strategy on how to move ahead before you commit to anything.',
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
          <span className="s-stamp">Digital PR · Web3</span>
        </div>
        <div className="s-body" style={{ justifyContent: 'center' }}>
          <p className="s-kicker" style={{ marginBottom: '2cqh' }}>
            A digital PR plan for your Web3 project
          </p>
          <h1 className="s-h1">
            In Web3, hype is cheap.
            <br />
            <span className="acc">Credibility compounds.</span>
          </h1>
          <p className="s-lead" style={{ marginTop: '3cqh' }}>
            Organic, earned media for Web3 projects - global and APAC, executed personally.
          </p>
        </div>
      </>
    ),
  },
  // 02 · Why digital PR in Web3
  {
    node: (
      <>
        <div className="s-head">
          <h2 className="s-h2">
            Why digital PR,
            <br />
            why now.
          </h2>
          <span className="s-num">02 / 13</span>
        </div>
        <div className="s-body" style={{ justifyContent: 'center', gap: '3.5cqh' }}>
          <div className="flow">
            <div className="flow-item">
              <div className="flow-n">01</div>
              <div className="flow-name">Narratives move markets</div>
              <div className="flow-line">
                DePIN, RWA, AI agents: categories get hot, and{' '}
                <span className="term">
                  coverage decides
                  <span className="tip">
                    When Fluence needed DePIN to matter, we made it a beat tier-1 reporters cover,
                    and anchored the founder as the category&apos;s go-to voice.
                  </span>
                </span>{' '}
                which projects get to define them.
              </div>
            </div>
            <div className="flow-item">
              <div className="flow-n">02</div>
              <div className="flow-name">Readers are skeptical by default</div>
              <div className="flow-line">
                After every rug and hack, people discount what you say about yourself. Earned
                editorial is the strongest trust signal left.
              </div>
            </div>
            <div className="flow-item">
              <div className="flow-n">03</div>
              <div className="flow-name">Everyone diligences in public</div>
              <div className="flow-line">
                VCs, exchanges, communities and AI answers all check what&apos;s written about you
                and your founders. Coverage is the first data room.
              </div>
            </div>
          </div>
          <p className="s-lead" style={{ maxWidth: '64cqw', fontSize: '1.9cqw' }}>
            Most crypto companies think PR = announcements. The best brands build{' '}
            <span className="acc">narratives so strong</span> that every announcement becomes news.
          </p>
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
          <span className="s-num">03 / 13</span>
        </div>
        <div className="s-body" style={{ justifyContent: 'center', gap: '4cqh' }}>
          <div className="stat-row">
            <div className="stat">
              <div className="stat-num">6+ yrs</div>
              <div className="stat-label">Leading PR and comms for Web3 and deep-tech companies</div>
            </div>
            <div className="stat">
              <div className="stat-num">50+</div>
              <div className="stat-label">
                Protocols shaped, including{' '}
                <a href="https://ripple.com" target="_blank" rel="noopener noreferrer">Ripple</a>,{' '}
                <a href="https://near.org" target="_blank" rel="noopener noreferrer">NEAR</a>,{' '}
                <a href="https://polygon.technology" target="_blank" rel="noopener noreferrer">Polygon</a>,{' '}
                <a href="https://walletconnect.network" target="_blank" rel="noopener noreferrer">WalletConnect</a>,{' '}
                <a href="https://mantrachain.io" target="_blank" rel="noopener noreferrer">MANTRA</a>,{' '}
                <a href="https://rari.foundation" target="_blank" rel="noopener noreferrer">RARI</a>{' '}
                and more
              </div>
            </div>
            <div className="stat">
              <div className="stat-num">200+</div>
              <div className="stat-label">
                Direct media, journalist and KOL relationships in the global and APAC markets
              </div>
            </div>
            <div className="stat">
              <div className="stat-num">CMC</div>
              <div className="stat-label">
                Built CoinMarketCap&apos;s APAC PR &amp; partnerships function, 2021 to 2023
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
          <span className="s-num">04 / 13</span>
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
                Korea, Japan, Greater China, Vietnam, India: the markets that move tokens. I spent
                years building these relationships, so you get one tight strategy instead of an
                agency per market, and the execution stays result-oriented.
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
          <span className="s-num">05 / 13</span>
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
                <li>The coverage exchanges, VCs and AI models trust</li>
                <li>Survives as a permanent, linkable proof point</li>
              </ul>
            </div>
            <div className="tier">
              <div className="tier-name">Paid press release</div>
              <div className="tier-price">
                Easy<small> · guaranteed · fast</small>
              </div>
              <p className="tier-sub">You pay, the wire syndicates it. And it reads that way.</p>
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
          <span className="s-num">06 / 13</span>
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
                A funding or TGE announcement is planned like a launch:{' '}
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
            If a raise, a listing or a TGE is anywhere on your roadmap,{' '}
            <span className="acc">founder profiling</span> is the highest-leverage PR you can do.
          </p>
        </div>
      </>
    ),
  },
  // 07 · Case study: MANTRA
  {
    ink: true,
    node: (
      <>
        <div className="s-head">
          <p className="s-kicker">Case study · MANTRA Chain, RWA layer-1</p>
          <span className="s-num">07 / 13</span>
        </div>
        <div className="s-body" style={{ gap: '3cqh' }}>
          <h2 className="s-h2" style={{ fontSize: '3.4cqw' }}>
            An $11M raise, turned into <span className="acc">one coordinated wave.</span>
          </h2>
          <div className="stat-row">
            <div className="stat">
              <div className="stat-num">$11M</div>
              <div className="stat-label">Raise announced with a Middle East RWA narrative</div>
            </div>
            <div className="stat">
              <div className="stat-num">CoinDesk</div>
              <div className="stat-label">Exclusive business story on announcement day</div>
            </div>
            <div className="stat">
              <div className="stat-num">5+</div>
              <div className="stat-label">Placements &amp; interviews in the launch wave</div>
            </div>
            <div className="stat">
              <div className="stat-num">CEO</div>
              <div className="stat-label">
                Standalone Cointelegraph profile, plus the Milk Road podcast
              </div>
            </div>
          </div>
          <div className="flow">
            <div className="flow-item">
              <div className="flow-n">Step 01 · Narrative</div>
              <div className="flow-name" style={{ fontSize: '1.7cqw' }}>The angle before the number</div>
              <div className="flow-line">
                An $11M raise is a number. “Institutional RWA tokenization, with a Middle East
                angle” is a story. We built the angle first.
              </div>
            </div>
            <div className="flow-item">
              <div className="flow-n">Step 02 · The wave</div>
              <div className="flow-name" style={{ fontSize: '1.7cqw' }}>Exclusive, then embargo</div>
              <div className="flow-line">
                CoinDesk took the exclusive. Follow-ons landed the same day: CryptoDaily,
                CryptoPotato and more.
              </div>
            </div>
            <div className="flow-item">
              <div className="flow-n">Step 03 · Momentum</div>
              <div className="flow-name" style={{ fontSize: '1.7cqw' }}>The raise becomes a platform</div>
              <div className="flow-line">
                The CEO&apos;s “Everything tokenized” Cointelegraph profile and the Milk Road
                podcast kept the story running for weeks.
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  // 08 · The pattern repeats
  {
    node: (
      <>
        <div className="s-head">
          <h2 className="s-h2">The pattern repeats.</h2>
          <span className="s-num">08 / 13</span>
        </div>
        <div className="s-body" style={{ justifyContent: 'center', gap: '3.5cqh' }}>
          <div className="flow">
            <div className="flow-item">
              <div className="flow-n">RARI Foundation</div>
              <div className="flow-name">NFT infrastructure</div>
              <div className="flow-line">
                RARI Chain mainnet on Arbitrum:{' '}
                <span className="term">
                  11 simultaneous tier-1 placements
                  <span className="tip">
                    The Block, Cointelegraph, The Defiant, CoinDesk and more, on the same day, with
                    coordinated APAC translations.
                  </span>
                </span>{' '}
                with coordinated APAC translations.
              </div>
            </div>
            <div className="flow-item">
              <div className="flow-n">Fluence</div>
              <div className="flow-name">DePIN compute</div>
              <div className="flow-line">
                Made DePIN a beat tier-1 reporters cover: CoinDesk opinion, Cointelegraph&apos;s
                Hashing It Out podcast, Benzinga exclusive, e27.
              </div>
            </div>
            <div className="flow-item">
              <div className="flow-n">Web3Auth</div>
              <div className="flow-name">Wallet infrastructure</div>
              <div className="flow-line">
                Drove the Google Cloud × Firebase story into Blockworks, CoinDesk, Yahoo Finance
                and Benzinga, with localised FR, IT and ES placements.
              </div>
            </div>
          </div>
          <p className="s-lead" style={{ maxWidth: '62cqw' }}>
            Different stories, same engine: narrative, founder voice, features, milestones covered
            on their own.
          </p>
        </div>
      </>
    ),
  },
  // 09 · APAC wave
  {
    node: (
      <>
        <div className="s-head">
          <h2 className="s-h2">
            The APAC wave
            <br />
            most agencies <span className="acc">can&apos;t reach.</span>
          </h2>
          <span className="s-num">09 / 13</span>
        </div>
        <div className="s-body" style={{ justifyContent: 'center', gap: '3cqh' }}>
          <div>
            <p className="s-kicker" style={{ marginBottom: '1.8cqh' }}>
              Korean outlets I place into · monthly visitors · SimilarWeb
            </p>
            <div className="bars">
              <div className="bar-row">
                <span className="bar-name">Hankyung</span>
                <span className="bar-track">
                  <span className="bar-fill hi" style={{ width: '100%' }} />
                </span>
                <span className="bar-val">37.7M</span>
              </div>
              <div className="bar-row">
                <span className="bar-name">E-Daily</span>
                <span className="bar-track">
                  <span className="bar-fill" style={{ width: '30%' }} />
                </span>
                <span className="bar-val">11.3M</span>
              </div>
              <div className="bar-row">
                <span className="bar-name">CoinReaders</span>
                <span className="bar-track">
                  <span className="bar-fill" style={{ width: '14.6%' }} />
                </span>
                <span className="bar-val">5.5M</span>
              </div>
              <div className="bar-row">
                <span className="bar-name">Bloomingbit</span>
                <span className="bar-track">
                  <span className="bar-fill" style={{ width: '13.3%' }} />
                </span>
                <span className="bar-val">5.0M</span>
              </div>
              <div className="bar-row">
                <span className="bar-name">ZDNet Korea</span>
                <span className="bar-track">
                  <span className="bar-fill" style={{ width: '10.6%' }} />
                </span>
                <span className="bar-val">4.0M</span>
              </div>
              <div className="bar-row">
                <span className="bar-name">Tokenpost</span>
                <span className="bar-track">
                  <span className="bar-fill" style={{ width: '6.9%' }} />
                </span>
                <span className="bar-val">2.6M</span>
              </div>
            </div>
          </div>
          <p className="s-lead" style={{ fontSize: '1.5cqw', maxWidth: '66cqw' }}>
            Plus{' '}
            <span className="term">
              CoinNess
              <span className="tip">
                The Web3 media with the largest number of actual users in Korea, and the most
                influential feed in the Korean crypto community&apos;s Telegram channels.
              </span>
            </span>
            , Japan (Cointelegraph JP, CryptoTimes), Greater China (ChainCatcher, TechFlow,
            Jinse), Vietnam and India (Economic Times, Inc42, YourStory), pitched to regional
            editors in their own language, not just syndicated.
          </p>
        </div>
      </>
    ),
  },
  // 10 · Publications
  {
    node: (
      <>
        <div className="s-head">
          <h2 className="s-h2">
            A subset of my
            <br />
            <span className="acc">full publication list.</span>
          </h2>
          <span className="s-num">10 / 13</span>
        </div>
        <div className="s-body" style={{ justifyContent: 'center', gap: '3cqh' }}>
          <div className="outlets">
            <div className="outlet"><span className="outlet-name">CoinDesk</span><span className="outlet-tag">Crypto</span></div>
            <div className="outlet"><span className="outlet-name">Cointelegraph</span><span className="outlet-tag">Crypto</span></div>
            <div className="outlet"><span className="outlet-name">The Block</span><span className="outlet-tag">Crypto</span></div>
            <div className="outlet"><span className="outlet-name">Decrypt</span><span className="outlet-tag">Crypto</span></div>
            <div className="outlet"><span className="outlet-name">Blockworks</span><span className="outlet-tag">Finance</span></div>
            <div className="outlet"><span className="outlet-name">The Defiant</span><span className="outlet-tag">DeFi</span></div>
            <div className="outlet"><span className="outlet-name">Bitcoin Magazine</span><span className="outlet-tag">Bitcoin</span></div>
            <div className="outlet"><span className="outlet-name">Forbes</span><span className="outlet-tag">Business</span></div>
            <div className="outlet"><span className="outlet-name">Benzinga</span><span className="outlet-tag">Markets</span></div>
            <div className="outlet"><span className="outlet-name">Yahoo Finance</span><span className="outlet-tag">Finance</span></div>
            <div className="outlet"><span className="outlet-name">CryptoSlate</span><span className="outlet-tag">Crypto</span></div>
            <div className="outlet"><span className="outlet-name">CryptoNews</span><span className="outlet-tag">Crypto</span></div>
            <div className="outlet"><span className="outlet-name">CryptoPotato</span><span className="outlet-tag">Crypto</span></div>
            <div className="outlet"><span className="outlet-name">CryptoDaily</span><span className="outlet-tag">Crypto</span></div>
            <div className="outlet"><span className="outlet-name">NewsBTC</span><span className="outlet-tag">Crypto</span></div>
            <div className="outlet"><span className="outlet-name">e27</span><span className="outlet-tag">SEA · Tech</span></div>
            <div className="outlet"><span className="outlet-name">TechInAsia</span><span className="outlet-tag">SEA · Tech</span></div>
            <div className="outlet"><span className="outlet-name">Economic Times</span><span className="outlet-tag">India</span></div>
          </div>
        </div>
      </>
    ),
  },
  // 11 · Engine
  {
    node: (
      <>
        <div className="s-head">
          <h2 className="s-h2">The monthly engine.</h2>
          <span className="s-num">11 / 13</span>
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
                Journalist-by-journalist outreach curated according to the product, funding,
                listing and partnership news.
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
  // 12 · Engagement
  {
    node: (
      <>
        <div className="s-head">
          <h2 className="s-h2">How we&apos;d work.</h2>
          <span className="s-num">12 / 13</span>
        </div>
        <div className="s-body">
          <div className="tiers">
            <div className="tier tier--exec">
              <div className="tier-name">Organic PR retainer</div>
              <div className="tier-price">
                $4k–7k<small> / month</small>
              </div>
              <p className="tier-sub">Scoped by markets, cadence and founder-profiling depth.</p>
              <ul className="tier-list">
                <li>Narrative, messaging &amp; press kit</li>
                <li>Monthly targeted pitching, done by me</li>
                <li>Founder profiling, podcasts, op-eds, commentary</li>
                <li>Token launch, funding &amp; partnership announcement comms</li>
                <li>APAC localisation &amp; regional outreach</li>
                <li>Coverage tracker &amp; monthly reporting</li>
              </ul>
            </div>
            <div className="tier">
              <div className="tier-name">Fast-track add-ons · optional</div>
              <div className="tier-price">
                At cost<small> · per outlet</small>
              </div>
              <p className="tier-sub">Only if you want to fast-track a moment.</p>
              <ul className="tier-list">
                <li>Paid placements, quoted transparently, outlet by outlet</li>
                <li>KOL amplification through 200+ vetted Web3 creators</li>
                <li>Used to drive traction to a launch or announcement</li>
                <li>Never a substitute for earned coverage</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    ),
  },
  // 13 · CTA
  {
    ink: true,
    node: (
      <>
        <div className="s-head">
          <span className="s-wordmark">
            Shilika<span className="slash">/</span>Jain
          </span>
          <span className="s-num">13 / 13</span>
        </div>
        <div className="s-body" style={{ justifyContent: 'center' }}>
          <span className="s-stamp" style={{ alignSelf: 'flex-start', marginBottom: '2.5cqh' }}>
            Organic-first
          </span>
          <h1 className="s-h1" style={{ fontSize: '5.4cqw' }}>
            Let&apos;s make your Web3 project
            <br />
            <span className="acc">the story.</span>
          </h1>
          <p className="s-lead" style={{ marginTop: '3cqh' }}>
            A 30-minute call: bring your goals with PR or driving credibility, may it be a TGE, a
            raise or a mainnet launch, and I&apos;ll map the strategy on how to move ahead.
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
