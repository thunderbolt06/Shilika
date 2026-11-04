#!/usr/bin/env python3
"""Build data/seo-30d/keyword-ownership.{csv,md} from saved GSC pulls + DataForSEO crawl.

Read-only on the site. Run scripts/gsc-ownership-map.py data/seo-30d/gsc-l90 first.
Decisions below are hand-written; numbers are computed. Validation prints warnings for
301 targets that are not indexed/200, chains, or 301s of URLs with >= 20 impressions
that are not flagged as exceptions.
"""
import csv, re, os, sys, collections
sys.path.insert(0, os.path.dirname(__file__))
from keyword_ownership_data import *

OUT = os.path.join(ROOT, 'data/seo-30d')
GEO_WORDS = r'india|indian|singapore|dubai|uae|mena|abu dhabi|saudi|korea|korean|japan|japanese|\buk\b|london|united kingdom|\busa\b|\bus\b|america|vietnam|apac|asia'
K, M, D = 'KEEP', 'MERGE-301', 'DIFFERENTIATE'
O = 'OWNER'

# family: key, label, query regex, query-exclusion regex, owner, owner_note, members [(url, rec, target, reason)], anchors, link_rx
FAMILIES = [
 dict(key='crypto-pr-agency', label='Crypto PR agency / firm',
  qrx=r'\b(crypto|cryptocurrency)\b.*\b(pr|public relations|publicist)\b|\b(pr|public relations)\b.*\bcrypto', qex=r'press release|kol|' + GEO_WORDS,
  owner='/playbook/best-web3-pr-agencies-2026',
  owner_note=("No URL earns impressions for 'crypto pr agency' itself (0 matched rows in 90 days; DataForSEO 3 Nov: not in US top 30), so this owner is chosen on intent, "
              "not on a GSC win. The US SERP is listicles ('Top 11 Web3 & Crypto PR Agencies', 'Best Crypto PR Agencies') plus agency homepages. "
              "best-web3-pr-agencies-2026 is the strongest commercial-listicle URL on the site (573 impr, #17, 37 real inlinks, named firms) and already wins the "
              "web3 twin of this term, so crypto and web3 PR agency share ONE owner. Required change is additive only (top-page rule): add 'and Crypto' to title/H1 "
              "(e.g. 'Best Web3 & Crypto PR Agencies in 2026') and a 'Crypto PR agencies' H2 section. If S rejects any title edit on this top page, fallback owner = "
              "/services/web3-pr-campaigns (the transactional page; sitewide nav already points to it)."),
  members=[
   ('/services/web3-pr-campaigns', D, '/playbook/best-web3-pr-agencies-2026', "Transactional companion: keep for 'web3/crypto PR services' and 'pr for web3 startup' (25@13). Add a 'compare agencies' link to the owner; owner links back with 'crypto PR services'. Inlinks 831 = sitewide nav, not an editorial signal."),
   ('/playbook/crypto-pr-cost-2026', K, '', "Pricing intent ('crypto pr pricing' #11, 'crypto pr packages'). Top page: only add. Also holds the bare 'crypto pr' impressions (#72-75) - leave them."),
   ('/playbook/crypto-pr-vs-ai-pr', D, '', "101 impr, almost all bare 'crypto pr' at #83-84. Comparison intent; keep, make title clearly 'vs AI PR', add link to owner."),
   ('/playbook/crypto-pr-agency-comparison-2026', K, '', "Evaluation/how-to-compare intent (18 impr). Receives the checklist 301 below; links to owner."),
   ('/playbook/how-to-choose-web3-pr-agency-checklist-2026', M, '/playbook/crypto-pr-agency-comparison-2026', "3 impr, near-duplicate flag; same 'how to choose/compare an agency' intent as the comparison playbook."),
   ('/playbook/web3-pr-agency-mistakes', K, '', "Distinct intent (mistakes), 22 inlinks. Link to owner."),
   ('/playbook/web3-pr-agency-reviews-clutch-2026', K, '', "309 impr on Clutch-review queries; distinct intent."),
   ('/pages/best-crypto-pr-agency', M, '/playbook/best-web3-pr-agencies-2026', "1 impr, near-duplicate; identical 'best crypto PR agency' intent as owner."),
   ('/pages/crypto-pr-agency-for-startups', M, '/services/web3-pr-campaigns', "12 impr, near-duplicate. Its only query 'pr for crypto startup' (9@24) is the twin of 'pr for web3 startup' which the service page already holds at #13."),
   ('/pages/affordable-crypto-pr-agency', M, '/playbook/crypto-pr-small-budget-2026', "4 impr; budget intent = small-budget playbook (not dup-flagged, 10 inlinks)."),
   ('/pages/crypto-pr-agency-small-budget', M, '/playbook/crypto-pr-small-budget-2026', "1 impr; same budget intent."),
   ('/playbook/crypto-pr-small-budget-2026', K, '', "Budget-intent owner; link it to crypto-pr-cost-2026."),
   ('/pages/crypto-pr-consultant', M, '/services/web3-pr-campaigns', "2 impr, near-duplicate; 'hire a senior crypto PR consultant' = the service page (title already 'Senior Operator')."),
   ('/pages/crypto-publicist', M, '/playbook/crypto-publicist-vs-agency-2026', "1 impr, near-duplicate; same publicist intent as the publicist-vs-agency playbook (indexed, not dup)."),
   ('/playbook/crypto-publicist-vs-agency-2026', K, '', "Publicist-vs-agency comparison; receives /pages/crypto-publicist."),
  ],
  anchors=['crypto PR agencies', 'best Web3 PR agencies', 'crypto PR agency', 'Web3 PR firms', 'top Web3 and crypto PR agencies', 'blockchain PR agencies'],
  link_rx=r'crypto-pr|web3-pr|pr-agenc|agency-|retainer|rfp|fractional-pr-vs|publicist', must=r'crypto|web3|defi|blockchain|token'),

 dict(key='web3-pr-agency', label='Web3 PR agency / firm',
  qrx=r'\bweb ?3\b.*\b(pr|public relations)\b|\b(pr|public relations)\b.*\bweb ?3\b', qex=r'kol|fractional|' + GEO_WORDS,
  owner='/playbook/best-web3-pr-agencies-2026',
  owner_note="Wins the family outright: 'web3 pr firms' 34@28, 'web3 pr agencies', 'top web3 pr agency' (#3-17). Same owner as crypto PR agency.",
  members=[
   ('/services/web3-pr-campaigns', D, '/playbook/best-web3-pr-agencies-2026', "Holds 'web3 public relations' (#72) and 'pr for web3 startup' (#13). Keep as the hire/services page; don't retitle toward 'agency'."),
   ('/pages/web3-pr-agency', D, '/playbook/best-web3-pr-agencies-2026', "29 impr (>=20) and it outranks the owner on its own long-tail ('web3 pr firm' #2, 'web3 pr firms' #3). Not a 301 now: retitle away from 'Best Web3 PR Agency' (that's the owner's title) to a 'fractional alternative to a Web3 PR firm' angle, link to owner. Re-check 28 Nov; 301 to owner if it stops earning its own queries."),
   ('/playbook/web3-pr-agency-reviews-clutch-2026', K, '', "Clutch-review intent."),
   ('/blog/web3-pr-agency-rfp-template', K, '', "RFP template intent; link to owner."),
   ('/blog/web3-pr-retainer-scope-of-work-breakdown-2026', K, '', "Retainer scope intent; link to owner."),
  ],
  anchors=['Web3 PR agencies', 'best Web3 PR firms', 'Web3 PR agency', 'top Web3 PR agencies'],
  link_rx=r'web3-pr|crypto-pr|agency|retainer|rfp', must=r'crypto|web3|defi|blockchain|token'),

 dict(key='blockchain-pr', label='Blockchain PR',
  qrx=r'\bblockchain\b.*\b(pr|public relations)\b|\b(pr|public relations)\b.*\bblockchain\b', qex=r'kol|' + GEO_WORDS,
  owner='/playbook/best-web3-pr-agencies-2026',
  owner_note="Only 18 matched impressions; the one real query is a cost question (owned by crypto-pr-cost-2026). 'blockchain pr agency' is the same listicle intent as crypto/web3 PR agency, so it shares that owner (add 'blockchain' to the owner's intro copy, not its title).",
  members=[
   ('/playbook/crypto-pr-cost-2026', K, '', "'what's the typical cost for blockchain pr services?' 12 impr - pricing intent stays here."),
   ('/pages/blockchain-gaming-pr-agency', M, '/playbook/blockchain-gaming-pr-2026', "0 impr, near-duplicate; gaming PR intent = blockchain-gaming playbook."),
   ('/pages/layer2-pr-agency', M, '/blog/l1-l2-blockchain-pr-narrative-differentiation-playbook', "2 impr, near-duplicate; L2 PR intent = the L1/L2 PR playbook post."),
  ],
  anchors=['blockchain PR agencies', 'blockchain PR firms'], link_rx=r'blockchain|web3-pr|l1-l2'),

 dict(key='ai-pr', label='AI PR agency / AI startup PR / PR for AI startups',
  qrx=r'\bai\b.*\b(pr|publicist|public relations)\b|\b(pr|publicist|public relations)\b.*\bai\b', qex=r'generator|bio|enterprise|' + GEO_WORDS,
  owner='/services/ai-startup-pr',
  owner_note=("With geo-tagged queries excluded, the service page narrowly leads on family impressions (54 @60 vs the India playbook's 52 @10). The India playbook ranks far better but its intent is geo (India) and its generic-query impressions are likely India-localised; "
              "retitling it global would break the top-page rule. /services/ai-startup-pr is the only commercial, non-geo URL ranking for the head term and the ONLY "
              "shilikajain.com URL in any US top 30 in the 3 Nov DataForSEO check ('pr for ai startups' #29). It needs links with exact anchors (it sits #55-64 in GSC). "
              "'enterprise ai pr' (95@11) is a separate sub-intent owned by /playbook/enterprise-ai-pr-2026."),
  members=[
   ('/playbook/ai-startup-pr-agency-india-2026', K, '', "Geo-India owner (249 impr, 3 clicks; 'ai-powered pr agency in india'). Keep its India title; add a link to the owner with 'AI startup PR'."),
   ('/playbook/enterprise-ai-pr-2026', K, '', "Owns 'enterprise ai pr' (95@11). Distinct buyer (enterprise)."),
   ('/playbook/ai-startup-pr-2026', D, '/services/ai-startup-pr', "165 impr, 31 inlinks, near-dup flag. Guide intent: keep, make the title clearly a how-to guide, link to owner."),
   ('/pages/ai-pr-agency', M, '/services/ai-startup-pr', "EXCEPTION (21 impr): same commercial intent as the owner, and Google already dropped it (Crawled - currently not indexed on 30 Oct), so the 21 impressions are historical."),
   ('/pages/generative-ai-pr-agency', M, '/services/ai-startup-pr', "18 impr, near-duplicate; generative-AI PR = AI startup PR intent."),
   ('/pages/ai-startup-pr-agency', M, '/services/ai-startup-pr', "11 impr, near-duplicate; identical intent to owner."),
   ('/pages/ai-pr-consultant', M, '/services/ai-startup-pr', "6 impr (1 click), near-duplicate; hire-a-consultant intent = service page."),
   ('/pages/ai-publicist', M, '/playbook/what-is-an-ai-publicist-2026', "10 impr, near-duplicate; publicist intent = the AI publicist playbook (40 impr)."),
   ('/playbook/what-is-an-ai-publicist-2026', K, '', "AI publicist explainer; receives /pages/ai-publicist."),
   ('/pages/enterprise-ai-pr-agency', M, '/playbook/enterprise-ai-pr-2026', "3 impr, near-duplicate, not indexed; enterprise AI PR intent."),
   ('/pages/healthcare-ai-pr-agency', M, '/services/ai-startup-pr', "1 impr, near-duplicate; no healthcare-AI page with impressions."),
   ('/pages/ai-pr-agency-india', M, '/playbook/ai-startup-pr-agency-india-2026', "5 impr; same India AI PR intent as the India playbook."),
   ('/pages/fintech-ai-pr-agency', K, '', "16 impr incl. its own query ('ai-native pr agency for fintech' 7@6). Distinct vertical."),
   ('/playbook/ai-pr-agency-pricing-packages-2026', K, '', "Pricing intent (53 impr)."),
  ],
  anchors=['AI startup PR', 'PR for AI startups', 'AI PR agency', 'AI startup PR agency', 'PR for AI companies'],
  link_rx=r'(^|[/-])ai([/-]|$)|llm|agentic|genai', must=r'(^|[/-])ai([/-]|$)|llm|agentic|genai'),

 dict(key='cybersecurity-pr', label='Cybersecurity PR',
  qrx=r'cyber ?security.*\b(pr|public relations|marketing)\b|\binfosec\b|\b(pr|marketing)\b.*cyber ?security', qex=r'professionals',
  owner='/services/cybersecurity-pr',
  owner_note="Wins on impressions (319 family impr: 'cybersecurity pr' 173, 'cyber security pr' 54, 'pr for cybersecurity company' 34) but at #51-68. The playbook has 49 family impr at #11 ('cybersecurity pr firm' 41@10). Owner stays the service page (audit item 7): it needs exact-anchor links from the playbook and blogs.",
  members=[
   ('/playbook/cybersecurity-pr-2026', D, '/services/cybersecurity-pr', "49 family impr at #11 ('cybersecurity pr firm' 41@10). Keep (>=20, top-page). Retitle toward 'guide' and add 'cybersecurity PR firm' link to the owner."),
   ('/pages/cybersecurity-marketing-agency', D, '', "50 impr; owns 'marketing' variants (37 impr). Distinct from PR; keep, link to owner for PR."),
   ('/playbook/best-cybersecurity-marketing-agencies-2026', K, '', "Listicle for marketing agencies (75 impr). Keep."),
   ('/pages/infosec-pr-agency', D, '/services/cybersecurity-pr', "22 impr incl. 'infosec pr agency/firm'. Keep (>=20, own term), retitle around 'InfoSec PR', link to owner."),
   ('/pages/cybersecurity-pr-agency', M, '/services/cybersecurity-pr', "2 impr, near-duplicate; identical intent."),
   ('/pages/cybersecurity-pr-agency-usa', M, '/services/cybersecurity-pr', "1 impr at #62; US is the default market for the owner."),
   ('/pages/cybersecurity-analyst-relations-agency', K, '', "Analyst relations is a distinct service (27 impr)."),
   ('/pages/threat-intelligence-pr-agency', K, '', "Distinct niche (threat-research PR), not dup-flagged."),
  ],
  anchors=['cybersecurity PR', 'cybersecurity PR firm', 'cybersecurity PR agency', 'cyber security PR'],
  link_rx=r'cyber|security|infosec|threat|rsa|black-hat|kuppingercole|ciso'),

 dict(key='defi-pr', label='DeFi PR',
  qrx=r'\bdefi\b.*\b(pr|public relations|marketing)\b|\b(pr|public relations)\b.*\bdefi\b', qex=r'',
  owner='/playbook/best-defi-pr-agency-2026',
  owner_note="Clear winner: 1,092 of 1,196 family impressions ('defi pr agency' 578, 'defi pr' 502) at #9-11.",
  members=[
   ('/pages/defi-pr-agency', M, '/playbook/best-defi-pr-agency-2026', "EXCEPTION (110 impr): ranks for the SAME queries ('defi pr agency', 'defi pr agencies') at the SAME #11 as the owner, so the two split one SERP slot; plan week 2 names this exact pair. Merge its unique copy into the owner first, then 301. S approves."),
   ('/playbook/defi-protocol-pr-strategy-2026', K, '', "Strategy/how-to intent."),
   ('/blog/defi-exploit-communications-first-72-hours', K, '', "Crisis-comms intent."),
  ],
  anchors=['DeFi PR agency', 'DeFi PR agencies', 'DeFi PR'], link_rx=r'defi|restaking|stablecoin|rwa|exploit|post-hack|liquid-staking', must=r'defi|restaking|stablecoin|rwa|exploit|post-hack|protocol|liquid-staking'),

 dict(key='kol', label='Crypto KOL / KOL marketing',
  qrx=r'\bkols?\b|crypto influencer|influencer marketing.*(crypto|web3)', qex=r'',
  owner='/services/kol-marketing',
  owner_note="Split signal: the listicle has more family impressions (180@24 vs 118@27) but the service page has 1,067 total impressions, the only clicks (3), no near-dup flag, and wins the web3 variants ('web3 kol marketing' 47@21, 'web3 kol' 40@27). Owner = service page; listicle keeps the 'best agencies' comparison intent.",
  members=[
   ('/playbook/best-crypto-kol-marketing-agencies-2026', D, '/services/kol-marketing', "180 family impr ('crypto kol marketing agency' 48@26). >=20 so not a 301. Keep as the 'best crypto KOL agencies' listicle; link to owner with 'crypto KOL marketing'."),
   ('/pages/crypto-kol-marketing-agency', M, '/services/kol-marketing', "15 impr; hire-an-agency intent identical to the service page."),
   ('/pages/web3-kol-agency', D, '/services/kol-marketing', "20 impr (at threshold), no visible queries. Hold: re-check 28 Nov, 301 to owner if no own queries."),
   ('/pages/crypto-influencer-marketing-agency', M, '/services/kol-marketing', "9 impr, not indexed; influencer = KOL intent."),
   ('/pages/crypto-twitter-kol-marketing', M, '/services/kol-marketing', "9 impr, not indexed; X/Twitter KOL is part of the service."),
   ('/pages/crypto-youtube-influencer-agency', K, '', "Distinct channel (YouTube), indexed, 14 impr."),
   ('/pages/crypto-kol-agency-korea', M, '/pages/korea-kol-marketing-agency', "8 impr; twin of the Korea KOL page (9 impr)."),
   ('/pages/korea-kol-marketing-agency', K, '', "Korea KOL transactional page; receives its twin."),
   ('/playbook/crypto-kol-marketing-korea-2026', K, '', "Korea KOL guide (28 impr, 1 click)."),
   ('/pages/crypto-kol-agency-japan', K, '', "Only Japan KOL page."),
   ('/playbook/how-to-vet-crypto-kols-2026', K, '', "Vetting intent."),
  ],
  anchors=['crypto KOL marketing', 'Web3 KOL marketing', 'KOL marketing agency', 'crypto KOL agency', 'KOL campaigns'],
  link_rx=r'kol|influencer|token-launch|airdrop'),

 dict(key='token-launch', label='Token launch / TGE marketing',
  qrx=r'token launch|\btge\b|token generation event|presale|launchpad', qex=r'depin|eigenlayer|referral',
  owner='/playbook/best-token-launch-marketing-agencies-2026',
  owner_note="124 family impr ('hire token launch marketing agency' 25@9, 'token launch marketing agency' 25@14), 3 clicks. /services/token-launch-pr keeps the PR sub-intent ('crypto pr for token launch' 6@13). The 158-impr 'depin wearable token launch playbook' query is DePIN intent and stays on /playbook/depin-pr-strategy-2026 (note: that page was 'Crawled - currently not indexed' on 30 Oct).",
  members=[
   ('/services/token-launch-pr', D, '', "Owns 'token launch PR / TGE PR'. Keep; link to owner for 'marketing agency' intent."),
   ('/pages/token-launch-marketing-agency', M, '/playbook/best-token-launch-marketing-agencies-2026', "EXCEPTION (24 impr): exact owner intent ('token launch marketing agency for startups') at #16-63 vs owner #9-14; its biggest query is junk ('token launch referral' #63)."),
   ('/pages/crypto-token-launch-marketing-agency', M, '/playbook/best-token-launch-marketing-agencies-2026', "1 impr; identical intent."),
   ('/pages/token-launch-pr-agency', M, '/services/token-launch-pr', "3 impr; token launch PR = service page."),
   ('/pages/tge-pr-agency', M, '/services/token-launch-pr', "3 impr; TGE PR = service page."),
   ('/pages/apac-token-launch-pr', M, '/services/token-launch-pr', "1 impr; token launch PR intent."),
   ('/pages/crypto-presale-marketing-agency', M, '/playbook/crypto-presale-launchpad-marketing-2026', "3 impr; presale marketing intent = presale playbook (22 impr)."),
   ('/pages/ico-ido-marketing-agency', D, '', "Ranks #8 for 'hire token launch marketing agency' (8 impr) - better than owner. Keep, keep ICO/IDO framing, link to owner."),
   ('/playbook/depin-pr-strategy-2026', K, '', "DePIN intent; fix its indexing (not indexed 30 Oct despite 169 impr)."),
   ('/pages/token-launch-pr-agency-india', K, '', "Geo India token PR (12 impr)."),
  ],
  anchors=['token launch marketing agency', 'token launch marketing agencies', 'TGE marketing', 'token launch marketing'],
  link_rx=r'token|tge|airdrop|presale|exchange-listing|launchpad', must=r'token|tge|airdrop|presale|exchange-listing|launchpad'),

 dict(key='fractional', label='Fractional PR / CMO / head of PR',
  qrx=r'fractional', qex=r'cybersecurity and growth',
  owner='/playbook/fractional-vs-agency',
  owner_note="Wins: 209 family impr at #5.9 ('fractional pr vs pr agency cost' 155@4, 'fractional pr' 32@11, 'fractional pr services' 21@12). Sub-owner for 'web3 fractional cmo' is /playbook/fractional-cmo-web3-2026 (91@7).",
  members=[
   ('/playbook/fractional-cmo-web3-2026', K, '', "Owns 'web3 fractional cmo' (91@7). Distinct role (CMO)."),
   ('/pages/fractional-cmo-web3', M, '/playbook/fractional-cmo-web3-2026', "EXCEPTION (20 impr): same query 'web3 fractional cmo' at #16 vs playbook #7; plan names this pair."),
   ('/blog/fractional-head-of-pr-vs-agency-vs-in-house', D, '/playbook/fractional-vs-agency', "27 impr, ranks #5 next to owner (#4) on the same query; double listing may help, so keep. Retitle toward the 'head of PR' role comparison; link to owner."),
   ('/pages/fractional-head-of-pr', K, '', "39 impr; role term 'fractional head of PR' (queries anonymised)."),
   ('/playbook/fractional-pr-cost-pricing-2026', K, '', "Pricing intent (40 impr)."),
   ('/playbook/fractional-pr-vs-in-house-hire-2026', K, '', "In-house comparison (20 impr)."),
   ('/blog/fractional-pr-vs-crypto-agency-retainer-web3', K, '', "16 impr; crypto-agency-retainer angle."),
   ('/blog/fractional-pr-vs-crypto-pr-agency-cost-benefit', M, '/playbook/fractional-vs-agency', "4 impr, near-duplicate; same 'fractional vs agency cost' intent as owner."),
   ('/pages/fractional-pr-consultant-web3', M, '/playbook/best-fractional-pr-consultant-web3-2026', "3 impr, near-duplicate; same 'fractional PR consultant web3' intent."),
   ('/pages/fractional-pr-consultant', K, '', "3 impr, not dup-flagged; leave."),
  ],
  anchors=['fractional PR vs agency', 'fractional PR', 'fractional PR services', 'fractional PR vs PR agency cost'],
  link_rx=r'fractional|agency|retainer|in-house|hire'),

 dict(key='web3-marketing-agency', label='Web3 / crypto marketing agency',
  qrx=r'(web ?3|crypto|blockchain) marketing (agenc|firm|compan|service)|marketing agenc\w* (for )?(web ?3|crypto)', qex=r'token launch|kol|market$',
  owner='/playbook/top-crypto-marketing-agencies-2026',
  owner_note="Thin family (most 'web3 marketing' impressions are 'apac web3 marketing market', a market-sizing query on /apac). The listicle has the most matched impressions and the only click (101 impr, 1 click, #10.8).",
  members=[
   ('/pages/best-web3-marketing-agency', D, '/playbook/top-crypto-marketing-agencies-2026', "74 impr (>=20), mostly 'web3 kol agency' queries. Keep; retitle toward 'Web3 KOL & growth agency', link to owner and to /services/kol-marketing."),
   ('/pages/web3-marketing-agency', M, '/playbook/top-crypto-marketing-agencies-2026', "4 impr, near-duplicate; same agency-shopping intent."),
   ('/pages/top-crypto-marketing-agency', M, '/playbook/top-crypto-marketing-agencies-2026', "0 impr; identical title intent to owner."),
   ('/playbook/web3-marketing-agency-guide-2026', M, '/playbook/top-crypto-marketing-agencies-2026', "2 impr, near-duplicate; same agency-choice intent."),
   ('/blog/web3-agency-truths-before-you-sign', K, '', "Vetting intent, 23 inlinks."),
   ('/pages/crypto-marketing-agency-india', K, '', "Geo India."),
  ],
  anchors=['crypto marketing agencies', 'top crypto marketing agencies', 'Web3 marketing agency'], link_rx=r'marketing|growth|agenc|kol', must=r'crypto|web3|token|kol|blockchain|defi'),

 dict(key='crypto-press-release', label='Crypto press release',
  qrx=r'(crypto|web ?3|token|blockchain|chainwire|cointelegraph|coindesk).*press release|press release.*(crypto|token|web ?3|blockchain|cointelegraph)|chainwire|wire distribution', qex=r'cointelegraph submit press release',
  owner='/playbook/best-crypto-press-release-services-2026',
  owner_note="Most matched impressions at the best position ('best crypto press release distribution services 2026' #2, 'chainwire vs pr newswire' #4). 'cointelegraph submit press release' (3,204 impr) is a navigational query owned by the top page /playbook/how-to-pitch-cointelegraph-2026 and is excluded so it doesn't decide this owner (no change to that page).",
  members=[
   ('/playbook/crypto-press-release-distribution-2026', D, '', "65 impr; overlaps on 'chainwire vs pr newswire'. Keep as the how-distribution-works guide, link to owner for 'services'."),
   ('/pages/crypto-press-release-distribution-service', M, '/playbook/crypto-press-release-distribution-2026', "6 impr; 'crypto wire distribution' intent = distribution playbook."),
   ('/pages/crypto-press-release-service', M, '/playbook/best-crypto-press-release-services-2026', "0 impr, not indexed; same services intent."),
   ('/playbook/how-to-write-crypto-press-release-2026', K, '', "Writing intent, 16 inlinks."),
   ('/playbook/how-to-pitch-cointelegraph-2026', K, '', "Top page; owns the navigational 'cointelegraph submit press release' (3,204 impr). Only add."),
  ],
  anchors=['crypto press release services', 'crypto press release distribution services', 'best crypto press release services'],
  link_rx=r'press-release|wire-service|distribution|cointelegraph|coindesk|announcement|embargo', must=r'crypto|web3|token|blockchain|cointelegraph|coindesk|airdrop|defi|press-release'),
]

GEO = [
 ('india', 'India', r'india|indian', '/playbook/best-web3-pr-agency-india-2026',
  "Best-positioned PR-intent URL (45 impr, #7, 1 click). /india has 1,257 impr but it is market-sizing traffic ('india blockchain ai market') at #49, 1 click.",
  [('/india', D, '', "Hub: market-research impressions. Retarget title/H1 to 'Web3 & crypto PR in India' (audit item 8) and link to owner."),
   ('/pages/web3-pr-agency-india', M, '/playbook/best-web3-pr-agency-india-2026', "16 impr; same India agency intent."),
   ('/pages/india-crypto-pr-agency', M, '/playbook/best-web3-pr-agency-india-2026', "2 impr; same intent."),
   ('/blog/india-web3-pr-playbook-inc42-et-tech-business-standard', K, '', "Outlet playbook.")]),
 ('singapore', 'Singapore', r'singapore', '/playbook/best-crypto-pr-agency-singapore-2026',
  "68 impr, 1 click, #16; the only Singapore URL with PR-intent clicks.",
  [('/singapore', D, '', "Hub: 'web 3 singapore' market traffic at #36. Retarget H1 to PR-in-Singapore; link to owner."),
   ('/pages/crypto-pr-agency-singapore', M, '/playbook/best-crypto-pr-agency-singapore-2026', "4 impr; same intent."),
   ('/blog/singapore-web3-pr-mas-dtsp-token2049-playbook', K, '', "Regulatory/event angle.")]),
 ('korea', 'Korea', r'korea', '/pages/crypto-pr-agency-korea',
  "Near tie on impressions (playbook 15 vs /pages twins 14 each); /pages/crypto-pr-agency-korea has the better position (#5.9 vs #10.8), the only click and no near-dup flag, so it owns the agency term. Only its twin is redirected.",
  [('/korea', D, '', "Hub: market-sizing traffic. Retarget to 'crypto PR in Korea'; link to owner."),
   ('/playbook/crypto-pr-korea-2026', D, '/pages/crypto-pr-agency-korea', "15 impr, near-dup flag, 11 inlinks. Keep as the Korea outlets/KOL guide; link to owner."),
   ('/pages/korea-crypto-pr-agency', M, '/pages/crypto-pr-agency-korea', "14 impr; twin of the owner (same title intent), worse position (#7.4)."),
   ('/pages/korea-japan-crypto-pr', M, '/services/apac-pr', "8 impr; multi-market intent = APAC service.")]),
 ('japan', 'Japan', r'japan', '/playbook/crypto-pr-japan-2026', "46 impr at #15, most of any Japan PR URL.",
  [('/japan', D, '', "Hub: 'japan web3 in retail market' traffic. Retarget; link to owner."),
   ('/pages/crypto-pr-agency-japan', M, '/playbook/crypto-pr-japan-2026', "7 impr; same intent."),
   ('/pages/japan-crypto-pr-agency', M, '/playbook/crypto-pr-japan-2026', "3 impr; twin page."),
   ('/blog/japan-web3-pr-coinpost-crypto-times-fsa-2026', K, '', "Outlet guide (impressions are mostly scraper queries).")]),
 ('dubai-mena', 'Dubai / UAE / MENA', r'dubai|uae|mena|abu dhabi|saudi', '/playbook/crypto-pr-dubai-mena-2026',
  "Playbook preferred (6 impr at #4.3, 6 inlinks). The /blog service post has more impressions (17) but at #16 and is a blog; the hub is #57 market traffic.",
  [('/dubai-mena', D, '', "Hub; retarget to 'crypto PR in Dubai & MENA'; link to owner."),
   ('/blog/dubai-mena-crypto-pr-service', D, '/playbook/crypto-pr-dubai-mena-2026', "17 impr; service-description post. Keep, link to owner."),
   ('/pages/crypto-pr-agency-dubai', M, '/playbook/crypto-pr-dubai-mena-2026', "2 impr, near-duplicate."),
   ('/pages/mena-crypto-pr-agency', M, '/playbook/crypto-pr-dubai-mena-2026', "2 impr; same intent."),
   ('/pages/web3-pr-agency-uae', M, '/playbook/crypto-pr-dubai-mena-2026', "3 impr; same intent."),
   ('/blog/mena-crypto-pr-playbook-uae-saudi-token2049-dubai', M, '/playbook/crypto-pr-dubai-mena-2026', "6 impr, near-duplicate of the owner playbook.")]),
 ('uk', 'UK', r'\buk\b|london|united kingdom|britain', '/pages/crypto-pr-agency-uk', "Only UK URL (5 impr, #5.6). Keep as-is.", []),
 ('usa', 'USA', r'\busa?\b|america|united states', '/playbook/best-web3-pr-agency-usa-2026', "26 impr at #10.",
  [('/pages/web3-pr-agency-usa', M, '/playbook/best-web3-pr-agency-usa-2026', "5 impr; same intent.")]),
 ('vietnam', 'Vietnam', r'vietnam', '/playbook/crypto-pr-vietnam-2026', "24 impr at #5.8.",
  [('/pages/crypto-pr-agency-vietnam', M, '/playbook/crypto-pr-vietnam-2026', "5 impr; same intent."),
   ('/blog/vietnam-web3-pr-playbook-2026', K, '', "143 impr but ~all scraper queries ('web3 \"community lead\" @gmail'); near-dup flag. Keep; review in prune."),
   ('/blog/web3-pr-southeast-asia-vietnam-indonesia-thailand', K, '', "SEA angle.")]),
 ('apac', 'APAC (multi-market)', r'apac|asia', '/services/apac-pr', "Service page for multi-market APAC PR (175 impr).",
  [('/apac', D, '', "611 impr, near-dup flag, mostly 'apac web3 marketing market'. Keep; link to owner."),
   ('/pages/apac-crypto-pr-agency', M, '/services/apac-pr', "3 impr; same intent.")]),
]
for key, label, gx, owner, note, members in GEO:
    FAMILIES.append(dict(key='geo-' + key, label=f'Geo: crypto/web3 PR + {label}',
        qrx=rf'(?=.*\b({gx}))(?=.*\b(crypto|web ?3|blockchain)\b)(?=.*\b(pr|public relations|agenc\w*|firms?|publicist|media|press|outlets?)\b)',
        qex=r'kol|market\b', owner=owner, owner_note=note, members=members,
        anchors=[f'crypto PR in {label.split(" ")[0]}', f'Web3 PR agency in {label.split(" ")[0]}'], link_rx=gx.replace('|', '|').replace(' ', '-')))

FAMILIES.append(dict(key='other-near-dups', label='Other near-duplicate /pages (no family above)', qrx=r'^$', qex='', owner='', owner_note="No shared head term; each mapped to its closest stronger URL.",
  members=[
   ('/pages/b2b-saas-pr-agency', M, '/playbook/best-b2b-saas-pr-agencies-2026', "0 impr, near-duplicate; listicle has 1,128 impr."),
   ('/pages/b2b-tech-pr-agency', M, '/playbook/b2b-tech-pr-guide-2026', "6 impr, near-duplicate; B2B tech PR guide has 25 impr at #5.6."),
   ('/pages/pr-agency-for-tech-startups', M, '/playbook/pr-for-tech-startups-guide-2026', "0 impr, near-duplicate; same intent."),
   ('/pages/op-ed-ghostwriting-service', M, '/playbook/op-ed-ghostwriting-executives-2026', "7 impr, near-duplicate; op-ed ghostwriting playbook has 15 impr, 13 inlinks."),
   ('/pages/founder-personal-branding-agency', D, '/services/founder-profiling', "21 impr (>=20). Keep; link to /services/founder-profiling; avoid 'agency' overlap with /playbook/best-founder-personal-branding-agencies-2026."),
  ], anchors=[], link_rx=r'^$'))

# best-X playbooks with no named firms (crawl h2s: no numbered firm headings). Plan weeks 10-12 rebuilds or redirects them.
NO_FIRMS = {
 '/playbook/best-defi-pr-agency-2026': 'none - 1,139 impr top page: must be rebuilt, not redirected. Hold the /pages/defi-pr-agency 301 until the rebuild is committed.',
 '/playbook/best-token-launch-marketing-agencies-2026': '/services/token-launch-pr',
 '/playbook/top-crypto-marketing-agencies-2026': '/pages/best-web3-marketing-agency',
 '/playbook/best-crypto-press-release-services-2026': '/playbook/crypto-press-release-distribution-2026',
 '/playbook/best-crypto-pr-agency-singapore-2026': '/singapore',
 '/playbook/best-web3-pr-agency-india-2026': '/india',
 '/playbook/best-web3-pr-agency-usa-2026': '/playbook/best-web3-pr-agencies-2026',
 '/playbook/best-fractional-pr-consultant-web3-2026': '/playbook/fractional-vs-agency',
 '/playbook/best-b2b-saas-pr-agencies-2026': 'none - 1,128 impr top page: must be rebuilt, not redirected.',
 '/playbook/best-crypto-kol-marketing-agencies-2026': '/services/kol-marketing',
}
BACKFILL = ['/playbook/best-web3-pr-agencies-2026', '/services/web3-pr-campaigns', '/playbook/crypto-pr-cost-2026', '/playbook/crypto-pr-agency-comparison-2026', '/playbook/web3-pr-agency-mistakes', '/services/apac-pr']
# ---------------------------------------------------------------- compute
rows_out, fam_stats, warnings = [], [], []
redirect_from = {}
for f in FAMILIES:
    for u, rec, tgt, why in f['members']:
        if rec == M: redirect_from[u] = (tgt, why, f['key'])

def link_sources(f, n=10):
    rows = family_rows(f['qrx'])
    fam = fam_by_url([r for r in rows if not (f['qex'] and re.search(f['qex'], r['query'], re.I))])
    member_urls = {m[0] for m in f['members']}
    pool = []
    for u, c in crawl.items():
        if LOCALE.match(u) or u == f['owner'] or u in redirect_from or not indexed(u) or c.get('status_code') != 200: continue
        if u in ('/', '/blog', '/playbook', '/services') or u.startswith('/tools') or u.startswith('/services'): continue
        rel_hit = bool(re.search(f['link_rx'], u)) if f['link_rx'] != '^$' else False
        if not re.search(f.get('must', '.'), u): continue
        fi = fam.get(u, {}).get('impr', 0)
        if not (rel_hit or fi): continue
        s = pstat(u)
        score = fi * 3 + (60 if u in member_urls else 0) + min(s['impressions'], 150) + (80 if rel_hit else 0)
        pool.append((score, u, s['impressions']))
    pool.sort(reverse=True)
    seeds = []
    for u, rec, tgt, why in f['members']:
        if u in redirect_from or u == f['owner']: continue
        if rec == D or re.search(r'link (it )?to (the )?owner|links? to owner|link to the owner', why, re.I):
            seeds.append((10**6, u, pstat(u)['impressions']))
    out = seeds + [p for p in pool if p[1] not in {x[1] for x in seeds}]
    if f['key'].startswith('geo-') and len(out) < 5:
        hub = {'geo-india': '/india', 'geo-singapore': '/singapore', 'geo-korea': '/korea', 'geo-japan': '/japan', 'geo-dubai-mena': '/dubai-mena', 'geo-apac': '/apac'}.get(f['key'])
        for u in ([hub] if hub else []) + BACKFILL:
            if u and u != f['owner'] and u not in {x[1] for x in out}: out.append((0, u, pstat(u)['impressions']))
            if len(out) >= 5: break
    return out[:n]

for f in FAMILIES:
    rows = family_rows(f['qrx'])
    if f['qex']: rows = [r for r in rows if not re.search(f['qex'], r['query'], re.I)]
    fam = fam_by_url(rows)
    listed = [f['owner']] if f['owner'] else []
    listed += [m[0] for m in f['members'] if m[0] != f['owner']]
    recs = {m[0]: m[1:] for m in f['members']}
    if f['owner']: recs.setdefault(f['owner'], (O, '', f['owner_note']))
    for u in sorted(fam, key=lambda u: -fam[u]['impr']):
        if u not in recs and not LOCALE.match(u):
            listed.append(u)
            recs[u] = (K, '', 'Incidental: earns family queries but its primary intent differs; add a link to the owner if relevant.')
    table = []
    for u in listed:
        s = pstat(u); a = fam.get(u)
        rec, tgt, why = recs[u]
        if u == f['owner']: rec, why = O, 'Owner. ' + f['owner_note']
        tq = a['queries'][:3] if a else top_queries(u, 3)
        r = dict(family=f['key'], url=u, impressions=s['impressions'], clicks=s['clicks'],
                 position=round(s['position'], 1) if s['position'] else '', fam_impr=a['impr'] if a else 0,
                 fam_pos=a['pos'] if a else '', inlinks=s['inlinks'] if s['inlinks'] is not None else '',
                 near_duplicate=s['near_duplicate'] if s['near_duplicate'] is not None else '', coverage=s['coverage'],
                 recommendation=rec, target_url=tgt, reason=why,
                 top_queries='; '.join(f'{q} {i}@{p:.0f}' for q, i, p in tq), from_family=bool(a))
        table.append(r)
        if rec == M:
            t = pstat(tgt)
            if not indexed(tgt) or t['status'] != 200: warnings.append(f'{u} -> {tgt}: target not indexed/200 ({t["coverage"]}, {t["status"]})')
            if tgt in redirect_from: warnings.append(f'{u} -> {tgt}: CHAIN, target is also redirected')
            if s['impressions'] >= 20 and 'EXCEPTION' not in why: warnings.append(f'{u}: {s["impressions"]} impr >= 20 without EXCEPTION note')
        if s['status'] is None and u not in page: warnings.append(f'{u}: not in crawl or GSC')
    rows_out += table
    o = pstat(f['owner']) if f['owner'] else None
    oa = fam.get(f['owner'], {}) if f['owner'] else {}
    fam_stats.append(dict(f=f, table=table, owner=o, oa=oa, total=sum(a['impr'] for a in fam.values()),
                          n_comp=len([r for r in table if r['url'] != f['owner']]), n301=len([r for r in table if r['recommendation'] == M]),
                          links=link_sources(f) if f['owner'] else []))

# dedupe check: same URL different recs across families
seen = collections.defaultdict(set)
for r in rows_out: seen[r['url']].add((r['recommendation'], r['target_url']))
for u, v in seen.items():
    recs = {x[0] for x in v} - {K}
    if M in recs and len(v) > 1: warnings.append(f'{u}: conflicting recs {v}')

# ---------------------------------------------------------------- CSV
with open(os.path.join(OUT, 'keyword-ownership.csv'), 'w', newline='') as fh:
    w = csv.writer(fh)
    w.writerow(['family', 'url', 'impressions', 'clicks', 'position', 'inlinks', 'near_duplicate', 'recommendation', 'target_url', 'reason',
                'family_impressions', 'family_position', 'coverage_2026_10_30'])
    for r in rows_out:
        w.writerow([r['family'], r['url'], r['impressions'], r['clicks'], r['position'], r['inlinks'], r['near_duplicate'],
                    r['recommendation'], r['target_url'], r['reason'], r['fam_impr'], r['fam_pos'], r['coverage']])

# ---------------------------------------------------------------- MD
def esc(s): return str(s).replace('|', '\\|')
L = []
L.append('# Keyword-to-URL ownership map (shilikajain.com)\n')
L.append(f"GSC `sc-domain:shilikajain.com`, web search, **{meta['start']} to {meta['end']}** (90 days, dataState final), pulled 4 Nov 2026 by `scripts/gsc-ownership-map.py`; "
         "raw pulls in `data/seo-30d/gsc-l90/`. Crawl (inlinks, near-duplicate flag) from the DataForSEO crawl of 3 Nov 2026. Coverage from the 30 Oct URL-inspection CSV. "
         "Built by `scripts/keyword-ownership-build.py`. **Proposal only: nothing on the site was changed.**\n")
L.append('## How to read this\n')
L.append('- **Page impr / clicks / pos** = page totals from GSC (all queries, including anonymised ones). These drive the ">= 20 impressions = not a 301" rule.')
L.append('- **Fam impr @ pos** = impressions on queries matching the family regex only (query x page rows; GSC hides low-volume queries, so this undercounts). These drive the owner choice.')
L.append("- Scraper/operator queries (quoted operators, `@gmail`, `open to work`) and very long prompt-style queries are excluded from every family; ordinary questions ('how much do crypto pr agencies charge?') are kept. They inflate several pages' totals (`/blog/vietnam-web3-pr-playbook-2026`, `/playbook/best-web3-pr-agencies-2026`, `/blog/japan-web3-pr-...`).")
L.append('- Inlinks 831 (`/services/*`) and 737 (hubs, `/services`) are sitewide nav/footer links, not editorial signals. The near-duplicate flag on `/services/*` and hubs is likely template similarity.')
L.append('- **KEEP** = distinct intent, no change. **DIFFERENTIATE** = has impressions but overlaps: keep, retitle/re-angle, link to owner. **MERGE-301** = move any unique copy into the target, then 301. "EXCEPTION" marks the few 301s of URLs with >= 20 impressions, each with its reason. All 301 targets are indexed 200 URLs that are not themselves redirected (no chains).\n')
L.append('## Summary\n')
L.append('| Family | Owner URL | Owner page impr / clicks / pos | Owner fam impr @ pos | Family impr (matched) | # competing URLs | # 301s |')
L.append('|---|---|---|---|---|---|---|')
for s in fam_stats:
    f, o, oa = s['f'], s['owner'], s['oa']
    if not f['owner']:
        L.append(f"| {f['label']} | (none) | | | | {s['n_comp']} | {s['n301']} |"); continue
    L.append(f"| {f['label']} | `{f['owner']}` | {o['impressions']} / {o['clicks']} / {round(o['position'],1) if o['position'] else '-'} | {oa.get('impr',0)} @ {oa.get('pos') or '-'} | {s['total']} | {s['n_comp']} | {s['n301']} |")
total301 = sorted({(u, t) for u, (t, w, k) in redirect_from.items()})
L.append(f"\n**Total 301s proposed: {len(total301)}** (from {len(redirect_from)} URLs; {sum(1 for u,(t,w,k) in redirect_from.items() if 'EXCEPTION' in w)} are flagged exceptions with >= 20 impressions).\n")

for s in fam_stats:
    f = s['f']
    L.append(f"## {f['label']}  (`{f['key']}`)\n")
    if f['owner']:
        L.append(f"**Owner: `{f['owner']}`.** {f['owner_note']}\n")
        L.append(f"Query regex: `{esc(f['qrx'])}`" + (f" (excluding `{esc(f['qex'])}`)" if f['qex'] else '') + '\n')
    L.append('| URL | Page impr | Clicks | Pos | Fam impr @ pos | Inlinks | Near-dup | Coverage 30 Oct | Rec | Target | Top family queries (impr@pos) | Reason |')
    L.append('|---|---|---|---|---|---|---|---|---|---|---|---|')
    for r in s['table']:
        L.append(f"| `{r['url']}` | {r['impressions']} | {r['clicks']} | {r['position'] or '-'} | {r['fam_impr']} @ {r['fam_pos'] or '-'} | {r['inlinks']} | {'yes' if r['near_duplicate'] is True else 'no' if r['near_duplicate'] is False else '-'} | {r['coverage'].replace('Submitted and indexed','indexed')} | **{r['recommendation']}** | {('`'+r['target_url']+'`') if r['target_url'] else ''} | {esc(r['top_queries'])} | {esc('Owner (see note above).' if r['recommendation'] == O else r['reason'])} |")
    L.append('')

L.append('## Proposed redirect map\n')
L.append('Add to `next.config.ts` `redirects()` as `permanent: true` in one deploy (plan week 3-4), after moving any unique copy into the target. S approves rows marked EXCEPTION.\n')
L.append('Tier A = 0-5 impressions (near-zero). Tier B = 6-19 (low; same intent as a stronger URL). Tier C = EXCEPTION (>= 20, reason given; S approves). **Before deploy, check Bing Webmaster Tools: per plan weeks 3-4, do not redirect any URL that holds a Bing top-10 position** (no Bing data was available for this map). 301s that carry clicks: ' + (', '.join(f'`{u}` ({pstat(u)["clicks"]})' for u in redirect_from if pstat(u)['clicks']) or 'none') + '.\n')
L.append('| Tier | From | To | 90d impr (from) | Clicks | Family | To = family owner? | Reason |')
L.append('|---|---|---|---|---|---|---|---|')
owners = {x['f']['owner'] for x in fam_stats}
def tier(u, why):
    i = pstat(u)['impressions']
    return 'C' if 'EXCEPTION' in why else ('A' if i <= 5 else 'B')
for u, (t, why, k) in sorted(redirect_from.items(), key=lambda x: (tier(x[0], x[1][1]), x[1][2], x[0])):
    s = pstat(u)
    flag = ' NOTE: target is a best-X page with no named firms (see dependency section).' if t in NO_FIRMS else ''
    L.append(f"| {tier(u, why)} | `{u}` | `{t}` | {s['impressions']} | {s['clicks']} | {k} | {'yes' if t in owners else 'no (intent-matched sibling)'} | {esc(why + flag)} |")
L.append('')
L.append('## Dependency on the best-X rebuild (plan weeks 10-12)\n')
L.append('Only `/playbook/best-web3-pr-agencies-2026` names firms (numbered firm h2s in the 3 Nov crawl). The plan rebuilds the "best X" playbooks that name no firms, or redirects any that cannot be sourced honestly. The URLs below are owners or 301 targets in this map, so they must be **rebuilt, not redirected**, or the map must switch to the fallback (otherwise redirects chain and owners orphan).\n')
L.append('| URL | Role in this map | Fallback if it is redirected |')
L.append('|---|---|---|')
for u, fb in NO_FIRMS.items():
    roles = sorted({('owner: ' + x['f']['key']) for x in fam_stats if x['f']['owner'] == u} | {('301 target from ' + str(sum(1 for t in redirect_from.values() if t[0] == u)) + ' URL(s)')} if any(t[0] == u for t in redirect_from.values()) else {('owner: ' + x['f']['key']) for x in fam_stats if x['f']['owner'] == u} or {'member (DIFFERENTIATE/KEEP)'})
    L.append(f"| `{u}` | {'; '.join(roles)} | {fb if fb.startswith('none') else '`'+fb+'`'} |")
L.append('')
L.append('## Internal links to add\n')
L.append("For each owner: existing pages indexed on 30 Oct (not proposed for a 301), ranked by family-query impressions, then topical match, then page impressions. "
         "Add one contextual in-body link per source with the anchor shown (rotate anchors; don't use the same exact-match anchor on every source). Check each source doesn't already link to the owner before adding.\n")
seen_owner = set()
for s in fam_stats:
    f = s['f']
    if f['owner'] in seen_owner or not f['owner']: continue
    if not s['links']:
        L.append(f"### {f['label']} -> `{f['owner']}`\n\n- (no indexed on-topic sources found; link from `/playbook/best-web3-pr-agencies-2026` and `/services/web3-pr-campaigns`)\n"); seen_owner.add(f['owner']); continue
    seen_owner.add(f['owner'])
    shared = [x['f']['key'] for x in fam_stats if x['f']['owner'] == f['owner']]
    L.append(f"### {f['label']} -> `{f['owner']}`" + (f" (also owner for: {', '.join(shared[1:])})" if len(shared) > 1 else '') + '\n')
    for i, (score, u, imp) in enumerate(s['links']):
        L.append(f"- `{u}` ({imp} impr) - anchor: \"{f['anchors'][i % len(f['anchors'])]}\"")
    L.append('')
L.append('## Notes and caveats\n')
L.append("- GSC query x page data only covers non-anonymised queries; most `/pages/*` URLs show page impressions but no queries. Their intent was read from slug/title/H1.")
L.append("- Pages 'Crawled - currently not indexed' on 30 Oct that still had impressions: `/playbook/depin-pr-strategy-2026` (169), `/playbook/crypto-influencer-pricing-rates-2026` (228), `/pages/ai-pr-agency` (21). Fix the first two via indexing requests; they are not consolidation candidates.")
L.append("- Re-check DIFFERENTIATE-hold rows (`/pages/web3-pr-agency`, `/pages/web3-kol-agency`) on 28 Nov with fresh GSC; 301 them to their owner if they stop earning their own queries.")
L.append("- Geo families: 0 matched queries combine crypto/web3 + a market + PR/agency wording in 90 days. All geo impressions in GSC are market-sizing queries ('india blockchain ai market', 'web 3 singapore') landing on the hubs at #20-57 with ~0 clicks, so geo owners were picked on page totals, position and intent.")
L.append("- Respect the content freeze: every change here edits or redirects existing URLs; no new `/pages` URLs.")
open(os.path.join(OUT, 'keyword-ownership.md'), 'w').write('\n'.join(L) + '\n')

print(f'rows {len(rows_out)}  301s {len(redirect_from)}')
for w_ in warnings: print('WARN', w_)
