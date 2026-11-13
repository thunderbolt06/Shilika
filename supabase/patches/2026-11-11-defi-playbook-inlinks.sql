-- Run 114 (2026-11-11), 30d D08: add one in-body link to /playbook/best-defi-pr-agency-2026 in 6 live blog posts.
-- NOT APPLIED. Not a migration. Run once in the Supabase SQL editor (production) after review. Safe to re-run.
-- Why: keyword-ownership.md (DeFi PR family) names these posts as link sources for the DeFi owner page, which has
-- 1,136 impressions and 0 clicks at #8.8 (GSC 10 Aug to 7 Nov). Anchors come from that map.
-- Each update appends one sentence to an existing paragraph, matched on its exact closing sentence as read on 2026-11-11.
-- A row is skipped if that sentence is gone or the post already links to the playbook.
-- updated_at is kept as-is: an added internal link is not a content update, so dateModified stays honest.
begin;

alter table blog_posts disable trigger trg_set_updated_at;

update blog_posts set body = replace(body, $o$with the wrong angle (defense rather than insight).$o$, $n$with the wrong angle (defense rather than insight). If you are choosing outside help for the rebuild, see how the main [DeFi PR](/playbook/best-defi-pr-agency-2026) options compare.$n$)
where slug = 'web3-protocol-post-hack-trust-recovery-90-day-communications-playbook'
  and position($o$with the wrong angle (defense rather than insight).$o$ in body) > 0
  and position('/playbook/best-defi-pr-agency-2026' in body) = 0;

update blog_posts set body = replace(body, $o$before a competitor writes the first draft of your story for you.$o$, $n$before a competitor writes the first draft of your story for you. If you are deciding who should run that, here is how each type of [DeFi PR agency](/playbook/best-defi-pr-agency-2026) compares.$n$)
where slug = 'restaking-protocol-pr-narrative-journalists'
  and position($o$before a competitor writes the first draft of your story for you.$o$ in body) > 0
  and position('/playbook/best-defi-pr-agency-2026' in body) = 0;

update blog_posts set body = replace(body, $o$You don't get to reclaim the first narrative once it's been written for you.$o$, $n$You don't get to reclaim the first narrative once it's been written for you. Pick your [DeFi PR agency](/playbook/best-defi-pr-agency-2026) or lead before you need one, not during the exploit.$n$)
where slug = 'defi-exploit-communications-first-72-hours'
  and position($o$You don't get to reclaim the first narrative once it's been written for you.$o$ in body) > 0
  and position('/playbook/best-defi-pr-agency-2026' in body) = 0;

update blog_posts set body = replace(body, $o$What adoption metrics look like quarter over quarter.$o$, $n$What adoption metrics look like quarter over quarter. For that crypto press track, here is how the main [DeFi PR agencies](/playbook/best-defi-pr-agency-2026) compare.$n$)
where slug = 'stablecoin-payments-pr-genius-act-communications-playbook'
  and position($o$What adoption metrics look like quarter over quarter.$o$ in body) > 0
  and position('/playbook/best-defi-pr-agency-2026' in body) = 0;

update blog_posts set body = replace(body, $o$not in terms of on-chain yield optimization.$o$, $n$not in terms of on-chain yield optimization. For the crypto press half of the launch, the [DeFi PR](/playbook/best-defi-pr-agency-2026) options are compared here.$n$)
where slug = 'stablecoin-rwa-pr-bloomberg-ft-institutional-press'
  and position($o$not in terms of on-chain yield optimization.$o$ in body) > 0
  and position('/playbook/best-defi-pr-agency-2026' in body) = 0;

update blog_posts set body = replace(body, $o$Their readers hold tokens, run nodes, and monitor TVL dashboards.$o$, $n$Their readers hold tokens, run nodes, and monitor TVL dashboards. Our comparison of [DeFi PR agencies](/playbook/best-defi-pr-agency-2026) covers who is built for this room.$n$)
where slug = 'stablecoin-rwa-pr-institutional-bloomberg-ft-wsj'
  and position($o$Their readers hold tokens, run nodes, and monitor TVL dashboards.$o$ in body) > 0
  and position('/playbook/best-defi-pr-agency-2026' in body) = 0;

alter table blog_posts enable trigger trg_set_updated_at;

commit;
