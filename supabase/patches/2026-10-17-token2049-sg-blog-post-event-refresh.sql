-- Run 90 (2026-10-17): post-event accuracy refresh for /blog/token2049-singapore-pr-playbook-earned-media
-- Not a migration. Run once in the Supabase SQL editor (production). Safe to re-run: aborts if any target text is missing.
-- Fixes: truncated title + description, future-tense Token2049 2026 lines, unsourced 2025 stats, adds a post-event section.
begin;

do $patch$
declare b text;
begin
  select body into b from blog_posts where slug = 'token2049-singapore-pr-playbook-earned-media' for update;
  if b is null then raise exception 'post not found'; end if;
  if position($o0$The math is simple. Token2049 Singapore returns to Marina Bay Sands on **October 7–8, 2026**, anchoring a full Token2049 Week (October 5–11). The 2025 edition sold out at 25,000 attendees from over 160 countries, with 500+ exhibitors and 300+ speakers on five stages.$o0$ in b) = 0 then raise exception 'target 0 not found (already applied?)'; end if;
  b := replace(b, $o0$The math is simple. Token2049 Singapore returns to Marina Bay Sands on **October 7–8, 2026**, anchoring a full Token2049 Week (October 5–11). The 2025 edition sold out at 25,000 attendees from over 160 countries, with 500+ exhibitors and 300+ speakers on five stages.$o0$, $n0$The math is simple. Token2049 Singapore 2026 ran on **7 to 8 October** at Marina Bay Sands, anchoring a full Token2049 Week (5 to 11 October). It sold out at 25,000 attendees from 160 countries, with 500 exhibitors and 250 speakers, per the [organiser's press release](https://coingape.com/press-releases/token2049-singapore-2026-sells-out-drawing-25000-attendees-to-the-worlds-largest-crypto-event/). The 2027 dates are not published yet, so treat this playbook as the template for the next edition.$n0$);
  if position($o1$If you are pursuing a panel slot for the 2026 edition, your window for influence opened months ago.$o1$ in b) = 0 then raise exception 'target 1 not found (already applied?)'; end if;
  b := replace(b, $o1$If you are pursuing a panel slot for the 2026 edition, your window for influence opened months ago.$o1$, $n1$If you want a panel slot at the next edition, your window for influence opens months before the agenda goes public.$n1$);
  if position($o2$Token2049 runs Wednesday and Thursday in 2026; plan lift timing$o2$ in b) = 0 then raise exception 'target 2 not found (already applied?)'; end if;
  b := replace(b, $o2$Token2049 runs Wednesday and Thursday in 2026; plan lift timing$o2$, $n2$In 2026 Token2049 ran Wednesday and Thursday; plan lift timing$n2$);
  if position($o3$October 7 morning is when journalist attention$o3$ in b) = 0 then raise exception 'target 3 not found (already applied?)'; end if;
  b := replace(b, $o3$October 7 morning is when journalist attention$o3$, $n3$The first morning (7 October in 2026) is when journalist attention$n3$);
  if position($o4$the six weeks before October 7 building$o4$ in b) = 0 then raise exception 'target 4 not found (already applied?)'; end if;
  b := replace(b, $o4$the six weeks before October 7 building$o4$, $n4$the six weeks before the opening day building$n4$);
  if position($o5$*Token2049 Singapore 2026 runs October 7–8 at Marina Bay Sands, anchoring Token2049 Week (October 5–11). Speaking applications and media accreditation processes have their own timelines. Confirm directly with organizers at token2049.com.*$o5$ in b) = 0 then raise exception 'target 5 not found (already applied?)'; end if;
  b := replace(b, $o5$*Token2049 Singapore 2026 runs October 7–8 at Marina Bay Sands, anchoring Token2049 Week (October 5–11). Speaking applications and media accreditation processes have their own timelines. Confirm directly with organizers at token2049.com.*$o5$, $n5$## Token2049 Singapore 2026 Is Over: What to Do Now

If you met reporters at the 2026 edition, the recap window is closing. Send your follow-ups this week, each with one data point or asset. Then turn the theme you raised on-site into a bylined op-ed within 30 days. The next Singapore news hook is Singapore FinTech Festival on 18 to 20 November 2026, which suits RWA, stablecoin and regulated projects. After that, Consensus Hong Kong (1 to 3 February 2027) and Token2049 Dubai (21 to 22 April 2027) are the next regional tentpoles. For how to pick a Singapore PR partner, see [Best Crypto PR Agencies in Singapore in 2026](/playbook/best-crypto-pr-agency-singapore-2026).

*Updated 17 October 2026. Token2049 Singapore 2026 ran 7 to 8 October at Marina Bay Sands. 2027 dates are not published yet. Confirm with the organisers at token2049.com.*$n5$);
  update blog_posts set
    title = $t$Token2049 Singapore PR Playbook: Before, During and After$t$,
    description = $d$Token2049 Singapore packs crypto and mainstream press into one venue for 48 hours. The 6-week pre-event sequence, on-site access and post-event follow-up.$d$,
    body = b,
    updated_at = now()
  where slug = 'token2049-singapore-pr-playbook-earned-media';
end
$patch$;

-- Check: expect 0 rows of future-tense text left
select slug, title, updated_at, position('returns to Marina Bay Sands' in body) as old_line_left from blog_posts where slug = 'token2049-singapore-pr-playbook-earned-media';

commit;
