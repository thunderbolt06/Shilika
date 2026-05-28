-- =====================================================================
-- Seed long-tail query candidates for the topic-research agent.
-- These are the user-provided queries from the original brief.
-- The agent reads kind='long_tail_seed' rows on every queue-filler run.
--
-- Each entry's body is a newline-separated list of variant phrasings.
-- The topic-research agent splits them, scores each, and proposes
-- content_ideas with documented source_signals.
-- =====================================================================

insert into knowledge_base (title, kind, body, tags, metadata)
values
(
  'Embargo strategy for Web3 PR — operational long-tails',
  'long_tail_seed',
  $body$how to coordinate embargoed press releases for blockchain funding rounds
best practices for embargo timing in Web3 PR campaigns
which journalists accept crypto news under embargo
how do I manage multiple outlet embargoes for token launch
when should I lift embargo for DeFi protocol announcement
what are the risks of embargo breaks in cryptocurrency PR
what does a good embargo strategy look like for crypto announcements
crypto news embargo coordination services$body$,
  array['embargo', 'web3', 'tier-1', 'token-launch'],
  '{"source": "user-supplied initial seed batch"}'::jsonb
),
(
  'Crisis comms long-tails for Web3 founders',
  'long_tail_seed',
  $body$rug pull allegation reputation management
community trust rebuilding after Web3 crisis
crisis communications management for crypto companies$body$,
  array['crisis-comms', 'rug-pull', 'reputation-management'],
  '{"source": "user-supplied initial seed batch"}'::jsonb
),
(
  'Tier-1 outreach + journalist relationship long-tails',
  'long_tail_seed',
  $body$Web3 journalist relationship management
tier-1 crypto media outreach and journalist relations
enterprise blockchain media coverage campaigns$body$,
  array['tier-1', 'journalist-relations', 'web3'],
  '{"source": "user-supplied initial seed batch"}'::jsonb
),
(
  'AI startup PR + content writing long-tails',
  'long_tail_seed',
  $body$AI startup PR and media relations services
content writing services for Web3 and blockchain companies$body$,
  array['ai-pr', 'content-writing'],
  '{"source": "user-supplied initial seed batch"}'::jsonb
)
on conflict do nothing;
