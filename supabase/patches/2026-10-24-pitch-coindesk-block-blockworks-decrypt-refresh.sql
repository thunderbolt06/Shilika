-- Run 98 (2026-10-24): accuracy + title fix for /blog/how-to-pitch-coindesk-the-block-blockworks-decrypt-2026
-- Not a migration. Run once in the Supabase SQL editor (production). Safe to re-run: aborts if any target text is missing.
-- Fixes: truncated title ("...in 2026: A"), description that left out Blockworks, adds the June 2026 Messari deal, dated update note.
begin;

do $patch$
declare b text;
begin
  select body into b from blog_posts where slug = 'how-to-pitch-coindesk-the-block-blockworks-decrypt-2026' for update;
  if b is null then raise exception 'post not found'; end if;
  if position($o0$The company is expanding its Blockworks Intelligence and data platform, aiming to become a primary data destination for digital asset professionals.$o0$ in b) = 0 then raise exception 'target 0 not found (already applied?)'; end if;
  b := replace(b, $o0$The company is expanding its Blockworks Intelligence and data platform, aiming to become a primary data destination for digital asset professionals.$o0$, $n0$In June 2026 it bought the crypto research firm Messari ([The Defiant](https://thedefiant.io/news/infrastructure/blockworks-acquires-messari-crypto-data-consolidation)), and it now sells data, investor-relations and disclosure products alongside its shows. None of that is a newsroom you can pitch a story to.$n0$);
  if position($o1$That is the whole framework. Everything else is execution.$o1$ in b) = 0 then raise exception 'target 1 not found (already applied?)'; end if;
  b := replace(b, $o1$That is the whole framework. Everything else is execution.$o1$, $n1$That is the whole framework. Everything else is execution.

For the full Blockworks podcast, newsletter and events route, see [How to Get Covered by The Block and Blockworks in 2026](/playbook/how-to-get-covered-the-block-blockworks-2026).

*Updated 24 October 2026. Blockworks closed its news division on 29 October 2025 ([Blockhead](https://www.blockhead.co/2025/10/30/blockworks-shuts-down-news-division-lays-off-journalists-in-pivot-to-data-business/)). Reporters move often, so check a byline is current before you pitch.*$n1$);
  update blog_posts set
    title = $t$How to Pitch CoinDesk, The Block, Blockworks and Decrypt in 2026$t$,
    description = $d$Beat map and pitch formula for CoinDesk, The Block and Decrypt in 2026, plus what to pitch Blockworks now that its news desk is closed.$d$,
    body = b,
    updated_at = now()
  where slug = 'how-to-pitch-coindesk-the-block-blockworks-decrypt-2026';
end
$patch$;

-- Check: title no longer truncated, Messari line present
select slug, title, updated_at, position('Messari' in body) > 0 as messari_line from blog_posts where slug = 'how-to-pitch-coindesk-the-block-blockworks-decrypt-2026';

commit;
