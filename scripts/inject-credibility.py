#!/usr/bin/env python3
"""Inject homepage-derived credibility/UX sections into every /pages landing
partial: an "As featured in" press strip (real article links) and a real
testimonials section. Idempotent via the 'lp-press' marker. Run AFTER landing
generation so all 100 partials get the sections uniformly.
"""
import glob, re, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CSS = """
.lp-press { padding: 64px var(--pad); border-top: 1px solid var(--line); }
.lp-press .lp-sec-inner { max-width: 1040px; margin: 0 auto; }
.lp-press-grid { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
.lp-press-item { display: inline-flex; align-items: center; padding: 10px 16px; border: 1px solid var(--line); border-radius: 100px; background: var(--paper); font-family: var(--font-mono); font-size: 12px; letter-spacing: .04em; color: var(--ink); text-decoration: none; transition: transform .3s var(--ease-out-quart), border-color .3s, background .3s, color .3s; }
.lp-press-item:hover { transform: translateY(-2px); border-color: var(--ink); background: var(--ink); color: var(--paper); }
.lp-press-quote { margin-top: 30px; font-family: var(--font-display); font-style: italic; font-size: clamp(20px, 2.2vw, 30px); line-height: 1.3; color: var(--ink); max-width: 60ch; }
.lp-press-quote em { color: var(--lime-deep); }
.lp-tst { padding: 84px var(--pad); background: var(--paper-2); }
.lp-tst .lp-sec-inner { max-width: 1040px; margin: 0 auto; }
.lp-tst-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 36px; }
@media (max-width: 780px) { .lp-tst-grid { grid-template-columns: 1fr; } }
.lp-tst-card { background: var(--paper); border: 1px solid var(--line); border-radius: 16px; padding: 28px; position: relative; }
.lp-tst-card::before { content: '\\201C'; position: absolute; top: 6px; right: 22px; font-family: var(--font-display); font-size: 64px; color: var(--lime); line-height: 1; }
.lp-tst-q { font-size: 16px; line-height: 1.62; color: var(--ink-2); }
.lp-tst-who { margin-top: 18px; display: flex; flex-direction: column; }
.lp-tst-who strong { font-family: var(--font-display); font-style: italic; font-size: 20px; font-weight: 400; }
.lp-tst-who span { font-family: var(--font-mono); font-size: 11px; letter-spacing: .06em; color: var(--muted); text-transform: uppercase; margin-top: 4px; }
.lp-tst-cta { margin-top: 28px; }
.lp-tst-cta a { font-family: var(--font-mono); font-size: 12px; letter-spacing: .08em; text-transform: uppercase; color: var(--ink); text-decoration: underline; text-decoration-color: var(--lime); text-underline-offset: 3px; }
"""

PRESS = """
<section class="lp-press" data-reveal>
  <div class="lp-sec-inner">
    <p class="lp-eyebrow">As featured in</p>
    <h2 class="lp-h2">Where the <em>stories</em> land.</h2>
    <div class="lp-press-grid">
      <a class="lp-press-item" href="https://www.forbes.com/sites/clorischen/2024/12/23/ai-agents-101-the-future-of-agentic-web-and-onchain-ai/" target="_blank" rel="noopener">Forbes</a>
      <a class="lp-press-item" href="https://www.coindesk.com/business/2024/03/19/mantra-chain-raises-11m-for-rwa-tokenization-with-middle-east-tint/" target="_blank" rel="noopener">CoinDesk</a>
      <a class="lp-press-item" href="https://cointelegraph.com/news/everything-tokenized-ceo-mantra-john-mullin" target="_blank" rel="noopener">Cointelegraph</a>
      <a class="lp-press-item" href="https://decrypt.co/297060/gaia-is-building-living-knowledge-systems-for-ai-agents" target="_blank" rel="noopener">Decrypt</a>
      <a class="lp-press-item" href="https://www.theblock.co/post/273833/rari-foundation-launches-rari-chain-mainnet-on-arbitrum-to-help-protect-nft-royalties" target="_blank" rel="noopener">The Block</a>
      <a class="lp-press-item" href="https://blockworks.co/news/web3auth-waas-firebase-wallet-extension" target="_blank" rel="noopener">Blockworks</a>
      <a class="lp-press-item" href="https://thedefiant.io/rari-chain-launches-mainnet" target="_blank" rel="noopener">The Defiant</a>
      <a class="lp-press-item" href="https://www.benzinga.com/markets/cryptocurrency/25/02/43919492/gaia-co-founder-identifies-centralized-models-data-access-as-key-roadblocks-to-decentralized-ai-shift" target="_blank" rel="noopener">Benzinga</a>
      <a class="lp-press-item" href="https://finance.yahoo.com/news/trust-wallet-partners-web3auth-simplify-180500670.html" target="_blank" rel="noopener">Yahoo Finance</a>
      <a class="lp-press-item" href="https://bloomingbit.io/feed/news/69869" target="_blank" rel="noopener">BloomingBit</a>
      <a class="lp-press-item" href="https://www.tokenpost.kr/playbook/228601" target="_blank" rel="noopener">TokenPost</a>
      <a class="lp-press-item" href="https://inc42.com/buzz/metaverse-startup-bullieverse-raises-funding-to-build-play-to-earn-games/" target="_blank" rel="noopener">Inc42</a>
      <a class="lp-press-item" href="https://e27.co/global-microsoft-outage-demonstrates-the-need-for-depin-computing-20240902/" target="_blank" rel="noopener">e27</a>
    </div>
    <p class="lp-press-quote">"I don't pitch products. I pitch <em>inevitabilities</em>, the kind of stories editors save for Monday morning."</p>
  </div>
</section>
"""

TST = """
<section class="lp-tst" data-reveal>
  <div class="lp-sec-inner">
    <p class="lp-eyebrow">Testimonials</p>
    <h2 class="lp-h2">What founders say <em>after</em> the dust settles.</h2>
    <div class="lp-tst-grid">
      <article class="lp-tst-card">
        <p class="lp-tst-q">Shilika is one of the most impressive PR experts I've worked with. She deeply understands her clients, knows how to craft narratives that genuinely land, and brings a rare mix of strategic thinking and relentless execution. She's built strong relationships with top journalists and publications around the world, which gives her a real edge when it comes to getting stories placed.</p>
        <div class="lp-tst-who"><strong>Nicole Rochette</strong><span>Web3 BD · FCMO · Ex-Dapper Labs</span></div>
      </article>
      <article class="lp-tst-card">
        <p class="lp-tst-q">I highly recommend Shilika for anyone needing PR support in Web3. What sets her apart is a deep, genuine understanding of blockchain, not just the buzzwords. Her network is outstanding: outlets that once felt out of reach became regular coverage, both in crypto and mainstream tech media. If you're in Web3 and want PR that actually delivers, Shilika is the one to call.</p>
        <div class="lp-tst-who"><strong>Gafoor Khan</strong><span>Entrepreneur · Web3, AI · Advisor &amp; Angel Investor</span></div>
      </article>
    </div>
    <div class="lp-tst-cta"><a href="/testimonials">Read all 19 recommendations &rarr;</a></div>
  </div>
</section>
"""

def inject(path: str) -> str:
    s = open(path).read()
    if 'lp-press' in s:
        return 'skip'
    orig = s
    # 1) CSS before the first </style>
    if '</style>' in s:
        s = s.replace('</style>', CSS + '\n</style>', 1)
    # 2) press strip after the trust section
    m = re.search(r'(<section class="trust">.*?</section>)', s, flags=re.S)
    if m:
        s = s[:m.end()] + '\n' + PRESS + s[m.end():]
    else:
        # fallback: after the hero header
        m2 = re.search(r'(</header>)', s)
        if m2:
            s = s[:m2.end()] + '\n' + PRESS + s[m2.end():]
    # 3) testimonials before the lead form
    idx = s.find('<section class="lead-section"')
    if idx != -1:
        s = s[:idx] + TST + '\n' + s[idx:]
    if s == orig:
        return 'noanchor'
    open(path, 'w').write(s)
    return 'ok'

if __name__ == '__main__':
    files = sorted(glob.glob(os.path.join(ROOT, 'app/_partials/pages__*-body.html')))
    counts = {}
    for f in files:
        r = inject(f)
        counts[r] = counts.get(r, 0) + 1
    print('files:', len(files), '->', counts)
