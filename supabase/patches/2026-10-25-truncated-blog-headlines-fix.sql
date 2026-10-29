-- Run 99 (2026-10-25): repair 16 blog headlines that the writer agent cut mid-sentence.
-- Not a migration. Run once in the Supabase SQL editor (production). Safe to re-run.
-- Cause: lib/agents/writer.ts trimmed titles over 80 chars at the last space, leaving
-- endings like "and", "to", "in", "The" or a trailing comma (fixed in the same run).
-- The broken title shows in the H1, og:title, twitter:title, Article JSON-LD headline,
-- breadcrumb and the .md copy that AI crawlers read.
-- updated_at is kept as-is on purpose: a headline repair is not a content update,
-- so dateModified should not move (honest freshness).
-- how-to-pitch-coindesk-the-block-blockworks-decrypt-2026 is not here: Run 98's patch covers it.
begin;

alter table blog_posts disable trigger trg_set_updated_at;

with fix(slug, title) as (values
  ('ai-agentic-infrastructure-pr-developer-investor-regulator', $t$AI Agentic Infrastructure PR: Speaking to Developers, Investors and Regulators$t$),
  ('ai-crypto-pr-pitch-agentic-web3-mainstream-press', $t$AI x Crypto PR: Pitching Agentic Web3 Projects to Crypto and Mainstream Press$t$),
  ('cybersecurity-analyst-briefing-deck-gartner-forrester', $t$Cyber Analyst Briefing Decks That Change How Gartner and Forrester See You$t$),
  ('cybersecurity-startup-pr-dark-reading-the-record-bleepingcomputer', $t$Cybersecurity Startup PR: Dark Reading, The Record and BleepingComputer$t$),
  ('geo-ai-search-visibility-web3-founders', $t$AI Search Visibility for Web3 Founders: Getting Cited in ChatGPT and Perplexity$t$),
  ('original-research-pr-asset-web3-ai-founder-data-pitch', $t$Original Research as a PR Asset: A Data Pitch Guide for Web3 and AI Founders$t$),
  ('pitch-web3-security-ai-safety-bloomberg-ft-wsj-mainstream-press-2026', $t$Pitching Web3 Security and AI Safety Stories to Bloomberg, FT and WSJ in 2026$t$),
  ('pre-launch-media-footprint-series-a-investor-pr-playbook-web3-ai', $t$Pre-Launch Media Footprint: The Series A Investor PR Playbook for Web3 and AI$t$),
  ('regulatory-announcement-pr-sec-mica-genius-act-web3-founders', $t$Regulatory Announcement PR: Responding to SEC, MiCA and GENIUS Act News$t$),
  ('stablecoin-rwa-pr-bloomberg-ft-institutional-press', $t$Stablecoin and RWA PR: Positioning a Tokenization Project for Bloomberg and FT$t$),
  ('tge-communications-compliance-mica-genius-act-sec-2026', $t$TGE Comms Compliance in 2026: MiCA, the GENIUS Act and SEC/CFTC Guidance$t$),
  ('web3-conference-appearance-30-days-earned-media-post-event-pr-playbook', $t$How to Turn a Web3 Conference Appearance Into 30 Days of Earned Media$t$),
  ('web3-founder-diy-thought-leadership-content-extraction-framework', $t$Web3 Founder Thought Leadership Without a Ghostwriter: A DIY Framework$t$),
  ('web3-founder-ghostwriting-bylined-op-ed-coindesk-decrypt-forbes', $t$Web3 Founder Ghostwriting: Bylined Op-Eds in CoinDesk, Decrypt and Forbes$t$),
  ('web3-founder-personal-brand-pr-operating-system-2026', $t$Web3 Founder Personal Brand PR in 2026: LinkedIn, X and Tier-1 Press$t$),
  ('web3-gaming-pr-playbook-decrypt-naavik-mainstream-press', $t$Web3 Gaming PR Playbook: Earning Coverage in Decrypt, Naavik and Gaming Press$t$)
)
update blog_posts p set title = fix.title
from fix
where p.slug = fix.slug and p.title is distinct from fix.title;

-- One description on this list carried an em dash. Replace it with plain punctuation.
update blog_posts
set description = $d$Bloomberg, FT and WSJ want Web3 security and AI safety stories, but founders keep pitching them wrong. Here is the reframe that lands tier-1 coverage.$d$
where slug = 'pitch-web3-security-ai-safety-bloomberg-ft-wsj-mainstream-press-2026'
  and position('—' in description) > 0;

alter table blog_posts enable trigger trg_set_updated_at;

-- Check: expect 0 rows. Any row here is a headline that still ends on a dangling word or comma.
select slug, title from blog_posts
where published
  and (title ~ '[,:;]\s*$'
       or title ~* '\s(a|an|the|and|or|of|to|for|in|with|vs|on|at|by|from|is|your)\s*$');

commit;
