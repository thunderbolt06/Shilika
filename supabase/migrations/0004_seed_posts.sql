-- =====================================================================
-- Seed 3 SEO-optimised playbook posts.
-- Idempotent: upsert by slug.
-- =====================================================================

insert into blog_posts (
  slug, title, description, body, image, author, author_slug,
  tags, related_posts, cta_label, cta_url,
  published, published_at
) values (
  'web3-pr-embargo-strategy',
  $title$Web3 PR Embargo Strategy 2026: How to Coordinate Tier-1 Press Without Breaking the Story$title$,
  $desc$How to coordinate embargoed press releases for blockchain funding rounds. Embargo timing, journalist relationships, and recovery from embargo breaks in Web3 PR.$desc$,
  $body$# Web3 PR Embargo Strategy 2026: How to Coordinate Tier-1 Press Without Breaking the Story

A bad embargo costs you the announcement. The good ones compound into the next launch. Here's the operating model I use across the 50+ Web3 protocols I've taken to market.

Most founders treat the embargo as a calendar event. Send the press release at T-72h, ask the journalist to "please hold until Tuesday 9am ET," wait, and hope. It works often enough that the failure mode looks like bad luck. It is not bad luck. It is structural.

The Web3 trade press is small. Forbes, CoinDesk, Cointelegraph, Decrypt, The Block, Blockworks, Bitcoin Magazine, plus the regional outlets in Korea, Japan and India that move price action. The reporters at each of those outlets know each other. When an embargo breaks, every other reporter on the list reads it inside 90 seconds. Your exclusive becomes a race to publish a worse version of the story while the angle you wanted is already poisoned.

I have run hundreds of embargoes in this category. The pattern that compounds is not "send earlier" or "be more polite in the email." It is a small set of operational moves that I'll walk through below.

## What an embargo actually is in 2026

The textbook definition is a request to delay publication until a specified time. The operating definition is a small piece of trust you and a reporter share for 24 to 96 hours. Trust is the asset. When it works, you both get a clean story. When it fails, the reporter publishes anyway and the trust transfers to whoever the leaker decides to credit next time.

Embargoes work best when:

- The story is genuinely newsworthy on its own. Reporters break embargoes most often when they suspect the embargo exists because the story is weak and the founder is trying to game release timing.
- The list of outlets is small (3 to 6 for a Series A or token launch, 6 to 12 for a TGE).
- Every outlet has a different angle. Two outlets writing the same story from the same press release will race each other.
- You have a relationship with the assigning editor, not just the reporter.

Embargoes fail when you are running an unsegmented blast to 30 outlets, or when an outlet's competitive pressure to scoop a story outweighs the value of preserving a relationship with you specifically.

## The 4-stage embargo timeline

Working backward from the announcement moment T:

**T-10 days: outreach.** Send a tight pre-pitch (3 sentences) to the assigning editor, not the reporter. Ask if they want the story under embargo, and confirm the embargo window. Get a yes before the press kit moves.

**T-7 days: press kit and exclusive negotiation.** Send the full package only to outlets that opted in. Negotiate angle, not embargo. Each tier-1 reporter gets a slightly different angle: Forbes wants the founder story, CoinDesk wants the protocol metrics, The Block wants the funder names and round structure, Decrypt wants the user impact. The angle differentiation is what makes the embargo hold. No two reporters are writing the same article.

**T-72h: confirmation pass.** Re-confirm the embargo time with each reporter. Send the exact ISO timestamp in your reply, plus the timezone in plain English. This is the moment to also share the asset bundle: hero image at 2400x1260, logo SVG, founder portrait at 1200x1500, and a one-page fact sheet. Reporters are working on deadlines. The cleaner the assets, the cleaner the story.

**T-0: lift.** Publish your own announcement on your channels at exactly the embargo lift moment. Many founders forget this and end up with the press telling a story before the project's own social accounts have acknowledged it.

The 10-day arc is for funding rounds. For TGE coordination the arc compresses to 5 days with a tighter list and an exchange-listing dependency layered on. For pre-product narrative launches, the arc can stretch to 14 days with one or two embedded reporters who are writing longer features.

## Which journalists actually accept crypto news under embargo

Tier-1 crypto reporters who reliably honor embargoes share three traits: they have a beat (DeFi, infrastructure, gaming, RWA), they have been on the beat for at least 18 months, and they have a relationship with you that predates the current story.

A pre-existing relationship is non-negotiable. The first time you email a tier-1 reporter, asking for an embargo is the wrong opening move. The right opening move is to comment intelligently on three of their recent stories over a six-week window. Then ask for a 20-minute background call with no story attached. Then, eight weeks later, when you have actual news, you can pitch under embargo.

This sounds slow. It is. The compounding effect is that by the time you have placed 12 stories with the same reporter, the embargo is almost automatic and the questions shift from "is this real" to "what angle do you want me to take."

The journalists I work with most often, segmented by category:

- **Macro / capital / structure**: Forbes Crypto, Bloomberg Crypto, The Information's crypto desk, Fortune Crypto
- **Trade**: CoinDesk, Cointelegraph, Decrypt, The Block, Blockworks
- **DeFi-native**: The Defiant, Crypto Briefing, Wu Blockchain
- **Regional**: BloomingBit and TokenPost (Korea), CryptoTimes JP and Coinpost (Japan), ChainCatcher and PANews (Greater China), Inc42 and Economic Times (India), Arabian Business and Cointelegraph Arabic (MENA)

The relationship work matters more than the outlet ranking. A Tier-2 outlet reporter who likes you and has covered you twice will hold an embargo better than a Tier-1 reporter you cold-emailed last week.

## How to manage multiple outlet embargoes for a token launch

Token launches break the embargo pattern that works for funding rounds. The reasons are price action, exchange listings, and exchange-listed competitors who pay attention to your news cycle.

The model I use for TGE PR:

1. **Three-wave structure.** Wave one is the embargoed announcement to 4 to 6 tier-1 trade outlets. Wave two is the broad distribution to 20 to 30 mid-tier and regional outlets. Wave three is the KOL push starting at T+24h.

2. **Wave one writes the canonical narrative.** What the project is, why it matters, what the round was, who led. Tier-1 outlets need a 24-hour head start to publish before the broad wave hits.

3. **Wave two amplifies, does not duplicate.** Mid-tier outlets get a package that explicitly references the tier-1 stories. This is the difference between distribution and content collision.

4. **Wave three is for sustained coverage.** KOLs and regional voices for the 72 hours after launch. This is where you fight off the natural attention decay curve.

The risk in TGE coordination is the exchange angle. CEX listings often arrive with their own embargo timing that may or may not align with your announcement. If Binance is listing the token at 12:00 UTC and your trade press embargo lifts at 09:00 UTC, the trade press has a 3-hour window where the story is live and the token is not tradeable. That is a footgun. Align the windows.

Another footgun is the simultaneous TGE on multiple exchanges. Listing windows often shift by 30 to 90 minutes between exchanges. Your embargo lift should be tuned to the slowest exchange, not the fastest.

## When to lift the embargo on a DeFi protocol announcement

The default is to lift on a Tuesday or Wednesday at 09:00 ET. Mondays underperform because reporters are catching up on the weekend's news. Fridays underperform because the engagement curve dies into the weekend. Tuesday at 09:00 ET is when the US trade press is most active, when European trade press has a full afternoon to amplify, and when APAC has the next morning to localize.

There are three exceptions:

- **Macro news days.** If FOMC is announcing the same day, push to the next available Tuesday. Your news will be drowned out.
- **Competitor news cycles.** If a category competitor is publishing the same week, fight for a slot 48 hours apart. Same-day collisions hurt both sides.
- **Conference adjacency.** If your launch ties to Consensus, Token2049, or ETHDenver, lift the embargo on the second morning of the conference. The first morning is crowded; the second morning has hallway-debrief energy.

Time-zone-wise, lifting at 09:00 ET means:

- 14:00 UK
- 22:00 JST
- 21:30 KST
- 06:00 PT
- 21:30 IST

The KST and JST numbers matter for [APAC localization runs](/services/apac-pr). The regional press has a 5 to 8 hour window to translate, place, and amplify before US morning starts. That window is the difference between an APAC-bolted-on announcement and an APAC-native one.

## What good embargo strategy looks like, written down

A working embargo strategy has six visible artifacts:

1. **An outlet list with reporter names, angles, and relationship history.** Not a press release distribution list. A relationship map.
2. **A pre-pitch template** that runs three sentences and asks for the embargo conversation rather than asking the reporter to commit to anything.
3. **A confirmation sequence** at T-72h that re-states the embargo time as an ISO timestamp and asks for an explicit acknowledgment in writing.
4. **A press kit** that bundles hero image, logo, founder portrait, fact sheet, and an FAQ that anticipates the questions the reporter is most likely to ask.
5. **A go / no-go protocol** for when one outlet breaks embargo early.
6. **A debrief** within seven days that catalogs which outlets held, which broke, what the spread of coverage looked like, and what the sentiment markers were.

Most founder-led teams have one or two of these. The teams that compound coverage over multiple cycles have all six.

## What to do when an embargo breaks

It will happen. The question is what you do in the next 30 minutes.

Three moves, in order:

1. **Notify the other outlets immediately.** "Outlet X has gone live. Embargo is lifted. Your piece can publish whenever you are ready." This is the move that preserves the relationship with everyone who held. Reporters remember who told them first when the embargo broke.
2. **Publish your own channels.** Founder X post, project X post, blog, Discord. Within five minutes of the lift you should own the canonical narrative on your own channels.
3. **Do not retaliate against the outlet that broke.** Tempting, especially if you suspect it was deliberate. Wrong move. Every other outlet is watching how you handle it. Going cold on the breaker is the right move; going public about it is not.

The cost of one broken embargo is usually one cycle of coverage. The cost of the wrong post-break response is the next twelve months of coverage.

If you are facing a moment where the embargo break also involves an allegation about your project, the playbook shifts into [crisis communications territory](/blog/web3-crisis-communications). The first 30 minutes are the same. The next 72 hours are not.

## Related playbooks

- [Tier-1 Crypto Media Outreach: How to Build Web3 Journalist Relationships That Actually Land Coverage](/blog/web3-tier1-journalist-relations) — the relationship work that makes embargoes hold
- [Web3 Crisis Communications Playbook: From Rug Pull Allegations to Community Trust](/blog/web3-crisis-communications) — what to run when an embargo break is the smallest of your problems
- [APAC Localisation & Access](/services/apac-pr) — how the embargo window gets retuned for Korean, Japanese, and Indian press

If you are about to run an embargoed announcement and want a second set of eyes on the outlet list and the angle map, the booking link below will get you a 30-minute teardown call.
$body$,
  null,
  'Shilika Jain',
  'shilika-jain',
  ARRAY['embargo', 'web3', 'tier-1', 'token-launch', 'journalist-relations']::text[],
  ARRAY['web3-crisis-communications', 'web3-tier1-journalist-relations']::text[],
  'Book a 30-min teardown with Shilika',
  'https://calendly.com/shilikajain/30min/',
  true,
  now()
)
on conflict (slug) do update
  set title = excluded.title,
      description = excluded.description,
      body = excluded.body,
      tags = excluded.tags,
      related_posts = excluded.related_posts,
      cta_label = excluded.cta_label,
      cta_url = excluded.cta_url,
      author_slug = excluded.author_slug,
      published = true,
      published_at = coalesce(blog_posts.published_at, now());

insert into blog_posts (
  slug, title, description, body, image, author, author_slug,
  tags, related_posts, cta_label, cta_url,
  published, published_at
) values (
  'web3-crisis-communications',
  $title$Web3 Crisis Communications Playbook: From Rug Pull Allegations to Community Trust$title$,
  $desc$Crisis communications management for crypto companies. Rug pull allegation reputation management and community trust rebuilding after a Web3 crisis.$desc$,
  $body$# Web3 Crisis Communications Playbook: From Rug Pull Allegations to Community Trust

A Web3 crisis is different from a traditional corporate crisis. The accusations are public. The escalation curve is faster. The audience writing the next chapter is the same audience that bought the token. You cannot wait for the news cycle to move on, because the news cycle is your community, and they are not moving on.

Most founders facing a first crisis make the same three mistakes. They go silent because legal told them to. They post a generic "we are aware of the situation" tweet that does not address the actual claim. Then they wait two days, hope it dies down, and re-emerge with a long-form explanation when the community has already written its own version of the story.

I have run crisis comms for protocols hit with rug pull allegations, smart contract exploit accusations, insider-trading rumors, regulatory threats, and the standard founder-Twitter implosion. The lessons compound. Here is the operating model.

## The first 30 minutes decide the next six months

The community is going to form a narrative about what happened with or without you in the room. The half-life on a Web3 crisis tweet is 90 minutes before it is screenshotted and reposted by 40 unrelated accounts. Once the screenshot circulates, your version of events is competing with the screenshot, not with the original tweet.

In the first 30 minutes you need to do four things:

1. **Acknowledge the existence of the claim.** Not the claim's validity. Just that you are aware. "We are aware of [specific claim]. We are gathering facts and will share a substantive update by [specific time]."
2. **Set a deadline for the substantive response.** Two hours, four hours, six hours, depending on the complexity. Do not say "soon."
3. **Stop the founder's personal account.** Founder posts during a live crisis almost always make it worse. Centralize messaging on the project account. The founder can come back in 24 to 48 hours with the prepared statement.
4. **Open the back channel with the loudest accuser.** If a single account is driving the allegation, getting on a DM with that account within the first hour changes the trajectory more than any public statement.

The deadline you set in step 2 is non-negotiable. If you say "an update in four hours" and you ship in five, the community treats the delay as proof you are hiding something. Set deadlines you will hit.

## Rug pull allegation reputation management

The rug pull accusation is the highest-frequency crisis in Web3. It usually starts with a single Twitter thread asserting that the team has drained liquidity, that the smart contract has a back door, or that the team is anonymous and uncontactable.

The defense is forensic.

**On-chain proof.** The first response in the public timeline should be a link to an on-chain explorer showing the actual contract state, the liquidity status, and any time-lock or multi-sig that controls it. Etherscan, Solscan, Polygonscan, depending on the chain. The screenshot of a transaction is more credible than 2,000 words of denial.

**Independent verification.** Within 24 hours, get an independent on-chain analyst to publicly verify your contract state. Names like ZachXBT, Lookonchain, or Arkham analysts move the needle if they will engage. If they will not engage publicly, a smaller verified analyst is still better than self-attestation.

**Founder-on-camera.** Within 48 hours, the founder needs to appear on Spaces or on a video call hosted by a respected community voice. Doxxed founders have an easier path. Pseudonymous founders need to demonstrate provenance through other vectors: a previous project, on-chain history, or a co-founder willing to vouch publicly.

**Documented process.** A timeline of what happened, who knew what when, and what the actual cause of the trigger event was. The timeline must be publishable and verifiable.

The rug pull accusation has a long tail. Even after you survive the first cycle, it will resurface every few months in screenshots passed around new community members. The fix is a permanent landing page on your domain with the forensics, the independent verification, the founder appearance recording, and the timeline. This is the page you link to forever when the accusation re-emerges.

## Community trust rebuilding after a Web3 crisis

Surviving the initial 72 hours is not the same as recovering. The community has watched you under stress. They have watched what you said, how fast, and whether you stayed visible. Recovery is a 90-day arc.

The work in those 90 days:

**Days 1 to 7: presence.** The founder posts daily. Not generic updates. Specific work being done, specific decisions being made, specific people on the team being credited. The community needs to see the team is still operating, not in damage control.

**Days 8 to 30: explanation.** A long-form post-mortem published on your blog, structured the way Cloudflare or Stripe publish theirs. What happened, why, what you are doing about it, what you have already done. The post-mortem becomes the canonical reference point. Every future question on the topic gets a link to this post.

**Days 31 to 60: structural changes.** Whatever structural change was implied by the crisis. New multi-sig signers, a treasury audit, a bug bounty program, a new advisor. The structural change needs to be visible and verifiable, not announced and then quietly de-prioritized.

**Days 61 to 90: forward narrative.** A new story that does not reference the crisis. A roadmap update, a partnership, a product launch. The point is to give the community something to talk about that is not the crisis. This is the moment to also re-engage [tier-1 trade press](/blog/web3-tier1-journalist-relations) with a positive story.

If you skip any of these steps the community treats the recovery as superficial. The teams I have seen recover well over multiple cycles all run a version of this arc.

## Crisis communications management for crypto companies, structured

The internal operating model that prevents crisis collisions:

1. **A pre-written response library.** Templates for the 8 most common crisis types in Web3: rug pull allegation, smart contract exploit, insider trading rumor, exchange delisting, regulatory inquiry, founder controversy, treasury concern, partnership collapse. Each template has a 30-minute acknowledgment, a 6-hour substantive response, and a 24-hour follow-up.
2. **A spokesperson rotation.** The founder is the primary voice for founder-level crises. The CTO for technical crises. A community lead for community-level disputes. The wrong voice on the wrong crisis is itself a crisis amplifier.
3. **A pre-built monitoring dashboard.** Tweetdeck, X advanced search, Telegram bots, Discord webhooks. The team needs to see the volume curve in real time. Most teams discover the crisis 90 minutes late because they are watching the wrong feeds.
4. **A relationship with three tier-1 reporters who will run a quote on short notice.** The reporters who covered you under embargo last quarter are the same reporters who will help you get a measured story out during a crisis. The embargo relationships compound into crisis assets.
5. **Legal pre-clearance for the most common phrases.** "Cooperating with law enforcement," "no evidence of," "an isolated incident." Pre-cleared phrases save 4 hours per crisis.
6. **A 90-day recovery roadmap template** for after the immediate response is done. Without the roadmap, the team drifts back to operations and the trust recovery work never ships.

Most founder teams have one or two of these. The teams that survive multiple crises with their brand intact have all six.

## What not to do

Common mistakes I have watched destroy projects in real time:

- **Going legal-first in public.** "We are taking legal action against the accuser." Almost always misread by the community as an admission. Take legal action quietly. Do not announce it.
- **Promising specific compensation under pressure.** Anything you promise in a crisis becomes a commitment you have to deliver, often before you have the structural ability to deliver it. Be vague about remediation in the first 48 hours.
- **Replying to every accusation individually.** A single substantive post that addresses the core claim is stronger than 40 individual replies. Replies amplify.
- **Letting the founder argue with critics on Twitter.** Even if the founder is right. Especially if the founder is right.
- **Treating the crisis as over because Twitter moved on.** It is not over until you have run the 90-day recovery arc.

## A note on prevention

The best crisis comms strategy is one you never have to execute. The work that prevents crises is the same work that makes you investable: a clear cap table, a multi-sig that is not founder-controlled, doxxed key roles, an audit cadence, a transparent treasury report, and a community manager who knows how to spot a thread turning bad 8 hours before it explodes.

Prevention is unsexy. It is also why the projects that have stayed off the rug pull lists for three or four years all share the same boring operational hygiene.

## When to bring in outside crisis comms

Three signals:

- The first response did not land and the community is now writing a worse version of the story than the actual one.
- A tier-1 outlet is preparing a story and you do not have a relationship with the reporter.
- The founder is emotionally compromised and posting on personal channels.

Any of those three, get external counsel inside 12 hours. The cost of an outside operator for two weeks is a fraction of the cost of letting a recoverable crisis become an unrecoverable one.

## Related playbooks

- [Web3 PR Embargo Strategy 2026: How to Coordinate Tier-1 Press Without Breaking the Story](/blog/web3-pr-embargo-strategy) — the relationship work you do before the crisis arrives
- [Tier-1 Crypto Media Outreach: How to Build Web3 Journalist Relationships That Actually Land Coverage](/blog/web3-tier1-journalist-relations) — who you call when the crisis needs a measured story
- [Cybersecurity PR](/services/cybersecurity-pr) — the protocol overlap when the crisis is a security incident

If you are watching a thread escalate right now, the booking link below routes to a 30-minute teardown call. Same response sequence, faster than email.
$body$,
  null,
  'Shilika Jain',
  'shilika-jain',
  ARRAY['crisis-comms', 'web3', 'rug-pull', 'community-trust', 'reputation-management']::text[],
  ARRAY['web3-pr-embargo-strategy', 'web3-tier1-journalist-relations']::text[],
  'Book a 30-min teardown with Shilika',
  'https://calendly.com/shilikajain/30min/',
  true,
  now()
)
on conflict (slug) do update
  set title = excluded.title,
      description = excluded.description,
      body = excluded.body,
      tags = excluded.tags,
      related_posts = excluded.related_posts,
      cta_label = excluded.cta_label,
      cta_url = excluded.cta_url,
      author_slug = excluded.author_slug,
      published = true,
      published_at = coalesce(blog_posts.published_at, now());

insert into blog_posts (
  slug, title, description, body, image, author, author_slug,
  tags, related_posts, cta_label, cta_url,
  published, published_at
) values (
  'web3-tier1-journalist-relations',
  $title$Tier-1 Crypto Media Outreach: How to Build Web3 Journalist Relationships That Actually Land Coverage$title$,
  $desc$Tier-1 crypto media outreach and Web3 journalist relationship management. AI startup PR, enterprise blockchain media coverage, content writing services.$desc$,
  $body$# Tier-1 Crypto Media Outreach: How to Build Web3 Journalist Relationships That Actually Land Coverage

The fastest path to a Forbes byline is not a press release. It is six months of operating like the founder the Forbes reporter would want to put on the page. The press release is the last step, not the first.

This is the work that founders skip and PR people fake. The fake version produces one mention in CryptoSlate's news roundup, then nothing. The real version produces compounding coverage where one tier-1 placement lifts the next, the reporter starts emailing you when they need a quote, and your inbound becomes the warm version of what your outbound was a year ago.

I have spent six years running this loop across 50+ Web3 and AI protocols. The pattern is consistent enough that I can describe it as a system.

## What "tier-1 crypto media" actually means in 2026

Tier-1 in this category is not just "outlets people have heard of." It is outlets with three properties:

1. **Editorial gatekeeping.** A real editor decides what runs. Press releases do not auto-publish.
2. **Beat reporters with longevity.** Reporters who have covered the same beat for 18+ months and have opinions about the category, not just access to it.
3. **Traffic that converts.** A mention in this outlet drives action: investor inbound, exchange interest, KOL pickup, hiring inbound.

By that definition, the tier-1 list in 2026 is:

- **Global trade**: CoinDesk, Cointelegraph, Decrypt, The Block, Blockworks, The Defiant
- **Mainstream business**: Forbes (Crypto / Innovation desks), Bloomberg Crypto, Fortune Crypto, The Information's crypto desk
- **Long-form / analytical**: Wu Blockchain, Crypto Briefing's research arm, On The Brink podcast
- **Regional tier-1**: BloomingBit and TokenPost (Korea), CryptoTimes JP and Coinpost (Japan), ChainCatcher and PANews (China diaspora), Inc42 (India)

Below this list is what I call "credibility tier-2": outlets that count for SEO and signal, do not count for moving the market. CryptoSlate, BeInCrypto, U.Today, AMBCrypto, CoinGape. Useful for volume, not for narrative.

The mistake most founders make is treating these tiers as a target list. They are not a target list. They are a relationship map.

## How to build a relationship with a tier-1 reporter

Six steps, executed over four to six months. None of them are optional.

**Step 1: read everything they have written in the last 12 months.** Their angle, their stylistic preferences, the specific projects they have covered, the projects they have written critically about, the projects they have written about twice. This work takes 4 to 6 hours per reporter. Skip it and your first email reads like every other founder's first email.

**Step 2: comment intelligently on three of their stories over six weeks.** Twitter quote posts, LinkedIn comments, replies that add information rather than thank the reporter. The objective is for the reporter to see your name three or four times before you ever email them.

**Step 3: send a context email with no ask.** Specific reference to their work, a piece of useful intel they probably do not have, no pitch, no calendar link, no CTA. The end of the email is "happy to talk if useful, otherwise glad you are covering this beat." 80% of these emails go unanswered. The 20% that get a reply become real relationships.

**Step 4: take the background call.** When the reporter agrees to a 20-minute call, do not pitch. Brief them on the category, share your point of view, answer their questions, and leave with no commitment from them. This call is the inflection point. If it goes well, the reporter remembers you the next time they have a story in your category.

**Step 5: offer help on stories you are not in.** Sources, intros, market data, on-the-record commentary on competitors. Reporters keep a mental list of founders who help with stories. You want to be on that list before you ask for one of your own.

**Step 6: pitch when you have actual news.** Six months in, when you have a fundable announcement, the pitch is short and lands. "We are announcing X next Tuesday. Want the exclusive?" The answer is much more often "yes" than it would have been at month one.

This is slow. It is also the only model that produces compounding coverage. The fast model, mass press release distribution, produces one news roundup mention and zero relationships.

## Web3 journalist relationship management as a system

Treating journalist outreach as a system rather than a campaign:

- **A CRM column per reporter.** Last contact, last story they wrote, beat focus, embargo history, relationship temperature.
- **A weekly cadence of touches.** Five reporters per week. Mix of comments, intel shares, intros, no-ask context emails. Five touches per week is 250 per year, which is enough to maintain real coverage of the tier-1 list.
- **A monthly review.** Which reporters are warming, which are cold, which have moved beats. Reporters move beats more often than founders expect. Catching the move within a week is worth more than the journalist relationship that survived for the previous two years.
- **A quarterly visibility metric.** Number of unique reporters who have written about you. Mentions per cycle. Inbound rate from cold reporters. These are the metrics that matter, not impressions.

This is not glamorous work. It also does not show up in any PR proposal deck. It is the work that separates the fractional senior operators from the agency teams that hand the relationship work to a junior account executive who cycles out of the firm before the relationship matures.

## AI startup PR and media relations services: same model, different list

The model transfers cleanly to AI. The list is different.

For AI founders, the tier-1 list in 2026:

- AI Magazine
- Forbes AI / Tech
- The Information's AI desk
- TechCrunch's AI vertical
- Wired AI coverage
- VentureBeat AI
- Semafor's tech desk
- The Verge's AI reporting
- Decrypt's AI coverage (the crypto-AI overlap)

The relationship-building work is identical. The angles are different. Forbes AI wants the founder narrative and the product moat. The Information wants the technical architecture and the investor commentary. AI Magazine wants the deployment customer story. TechCrunch wants the funding number and the differentiation.

I run [AI startup PR](/services/ai-startup-pr) the same way I run Web3 PR: 6-month relationship build, segmented angles per outlet, embargo coordination on the announcement moment, and a 90-day sustained follow-up cycle.

## Content writing services for Web3 and blockchain companies

The content writing question is downstream of the journalist relationship question. The right way to think about it:

- **Op-eds in tier-1 outlets** under the founder's byline. CoinDesk Opinion, Cointelegraph Opinion, Decrypt commentary, Forbes Councils. These are the highest leverage placements per word.
- **Whitepapers** that establish category authority. 8 to 12 pages. Published on your domain with a downloadable PDF. Cited by analysts and reporters when the category comes up.
- **LinkedIn essays** under the founder's voice. Lower bar to publish, higher frequency, builds the personal entity Google associates with your work.
- **X threads** as the canonical short form. One thread per major moment, archived to the blog.

The pattern across all four is that the writing is in the founder's voice, not the agency's. Ghostwriting that smells like ghostwriting is worse than no ghostwriting. The work product I ship looks like the founder wrote it on a slightly more disciplined Sunday afternoon than usual.

[Content writing for Web3 and AI founders](/services/content-writing) is structured as three productized offers so the cost is predictable: founder essay package, whitepaper sprint, op-ed of the month. The relationship work in the trade press is what makes the op-eds place. The op-eds are what make the founder citable when AI Overview, Perplexity, or ChatGPT generate answers about the category.

## Enterprise blockchain media coverage campaigns

Enterprise blockchain is its own category and the playbook diverges from token-launch coverage. The audience is different: CIOs, procurement, compliance, and the analyst community.

The outlets that matter for enterprise blockchain:

- Forbes Innovation
- CIO.com
- ZDNet
- VentureBeat Enterprise
- IBM Institute for Business Value's analyst pieces
- Gartner research notes
- Forrester reports
- KuppingerCole's quarterly category reviews

The relationship work is similar but the timeline stretches. Analyst relations in enterprise tech runs on a quarterly briefing cycle. Each briefing is a 30 to 45 minute call covering company update, customer wins, product roadmap, and category outlook. Get on the analyst's briefing list and you are part of the next category report.

The mistake enterprise-blockchain founders make is running the campaign on the consumer-crypto cadence. Forbes Innovation does not run "we raised a Series A" the way Decrypt runs "we raised a Series A." Enterprise outlets run customer wins, category trends, and analyst commentary. Tune the calendar to the audience.

## The compound effect over 12 months

The teams that run this loop for a full year see the following pattern in month nine onward:

- Inbound reporter requests for quote on category stories outpace outbound pitches
- The founder gets invited to be on conference panels they did not apply to
- Investor inbound increases at the seed-to-Series A transition because investors saw the founder cited three times in trade press they were already reading
- AI assistants start citing the founder's commentary in answers about the category, which feeds the search-engine-versus-AI-answer compounding effect described in the [embargo strategy playbook](/blog/web3-pr-embargo-strategy)

This is what I mean by compounding coverage. The relationship work in months one through six does not show up in metrics. The compounding shows up in months six through twelve and becomes the moat by month eighteen.

## Related playbooks

- [Web3 PR Embargo Strategy 2026: How to Coordinate Tier-1 Press Without Breaking the Story](/blog/web3-pr-embargo-strategy) — how the relationship work converts into clean launch coverage
- [Web3 Crisis Communications Playbook: From Rug Pull Allegations to Community Trust](/blog/web3-crisis-communications) — what the relationship work is worth when something goes wrong
- [Founder Profiling & Op-Eds](/services/founder-profiling) — the productized version of the personal entity build described above

If you want a teardown of your current tier-1 outreach plan and a specific reporter shortlist for your stage and category, the booking link below is the fastest path.
$body$,
  null,
  'Shilika Jain',
  'shilika-jain',
  ARRAY['tier-1', 'journalist-relations', 'web3', 'ai-pr', 'content-writing']::text[],
  ARRAY['web3-pr-embargo-strategy', 'web3-crisis-communications']::text[],
  'Book a 30-min teardown with Shilika',
  'https://calendly.com/shilikajain/30min/',
  true,
  now()
)
on conflict (slug) do update
  set title = excluded.title,
      description = excluded.description,
      body = excluded.body,
      tags = excluded.tags,
      related_posts = excluded.related_posts,
      cta_label = excluded.cta_label,
      cta_url = excluded.cta_url,
      author_slug = excluded.author_slug,
      published = true,
      published_at = coalesce(blog_posts.published_at, now());

