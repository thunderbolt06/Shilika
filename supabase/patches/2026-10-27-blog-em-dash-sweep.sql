-- Run 100 (2026-10-27): remove em-dashes from 48 live blog posts (bodies + 6 descriptions).
-- Not a migration. Run once in the Supabase SQL editor (production), AFTER the Run 98 and Run 99 patches. Safe to re-run.
-- Why: docs/humanization-guide.md bans em-dashes (the strongest AI-writing tell), but the writer agent only logged
-- the violation. 380+ em-dashes shipped across 45 bodies and 6 meta descriptions (which feed og:description,
-- Article JSON-LD and the .md copies AI crawlers read). Google's gen-AI content guidance (updated 1 Oct 2026
-- with rater-guideline language) asks for content made for people, not templated output.
-- Rules: list-item / bold-label dash -> colon; paired dashes -> commas, or parentheses when the aside has commas;
-- single dash -> colon, or comma before a conjunction; table cells and code spans -> hyphen.
-- Blockquotes and quotes of Shilika's real X posts are left verbatim.
-- Each update is guarded by md5 of the text snapshotted on 2026-10-27, so a row edited since then is skipped, not clobbered.
-- updated_at is kept as-is: punctuation is not a content update, so dateModified stays honest.
begin;

alter table blog_posts disable trigger trg_set_updated_at;

update blog_posts set body = $b100$# Web3 Crisis Communications Playbook: From Rug Pull Allegations to Community Trust

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

- [Web3 PR Embargo Strategy 2026: How to Coordinate Tier-1 Press Without Breaking the Story](/blog/web3-pr-embargo-strategy): the relationship work you do before the crisis arrives
- [Tier-1 Crypto Media Outreach: How to Build Web3 Journalist Relationships That Actually Land Coverage](/blog/web3-tier1-journalist-relations): who you call when the crisis needs a measured story
- [Cybersecurity PR](/services/cybersecurity-pr): the protocol overlap when the crisis is a security incident

If you are watching a thread escalate right now, the booking link below routes to a 30-minute teardown call. Same response sequence, faster than email.
$b100$
where slug = 'web3-crisis-communications' and md5(body) = '8d17a76412e98b8955714bbb54fe73fa';

update blog_posts set body = $b100$# Tier-1 Crypto Media Outreach: How to Build Web3 Journalist Relationships That Actually Land Coverage

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

- [Web3 PR Embargo Strategy 2026: How to Coordinate Tier-1 Press Without Breaking the Story](/blog/web3-pr-embargo-strategy): how the relationship work converts into clean launch coverage
- [Web3 Crisis Communications Playbook: From Rug Pull Allegations to Community Trust](/blog/web3-crisis-communications): what the relationship work is worth when something goes wrong
- [Founder Profiling & Op-Eds](/services/founder-profiling): the productized version of the personal entity build described above

If you want a teardown of your current tier-1 outreach plan and a specific reporter shortlist for your stage and category, the booking link below is the fastest path.
$b100$
where slug = 'web3-tier1-journalist-relations' and md5(body) = '80ffb35b694259c7665cc85f3a1ad501';

update blog_posts set body = $b100$# Web3 PR Embargo Strategy 2026: How to Coordinate Tier-1 Press Without Breaking the Story

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

- [Tier-1 Crypto Media Outreach: How to Build Web3 Journalist Relationships That Actually Land Coverage](/blog/web3-tier1-journalist-relations): the relationship work that makes embargoes hold
- [Web3 Crisis Communications Playbook: From Rug Pull Allegations to Community Trust](/blog/web3-crisis-communications): what to run when an embargo break is the smallest of your problems
- [APAC Localisation & Access](/services/apac-pr): how the embargo window gets retuned for Korean, Japanese, and Indian press

If you are about to run an embargoed announcement and want a second set of eyes on the outlet list and the angle map, the booking link below will get you a 30-minute teardown call.
$b100$
where slug = 'web3-pr-embargo-strategy' and md5(body) = '7ab72e44e87e4cb1c1b60fd26cc08e0e';

update blog_posts set description = $b100$Token unlocks are high-stakes IR moments. Most teams go silent or post a terse on-chain update: both erode holder trust. Here's the full communications sequence.$b100$
where slug = 'crypto-token-unlock-pr-vesting-cliff-supply-event-communications' and md5(description) = 'f11adcefae978a71cc9d1dc36e3e32ff';

update blog_posts set description = $b100$Bloomberg, FT, and WSJ want Web3 security and AI safety stories, but founders keep pitching them wrong. Here's the reframe that actually lands tier-1 coverage.$b100$
where slug = 'pitch-web3-security-ai-safety-bloomberg-ft-wsj-mainstream-press-2026' and md5(description) = '4a9b60cd7df2fe15cece001409a7804a';

update blog_posts set body = $b100$# The Crypto Pitch Subject Line Formula That Gets CoinDesk and The Block to Open

The subject line is the single most consequential 60 characters in a crypto PR campaign. Everything you've spent weeks building (the narrative, the data, the embargo coordination, the founder interview prep) lives or dies on whether a reporter at CoinDesk or The Block bothers to click.

I've pitched across six years and 50+ Web3 campaigns. The pitches that got opened at tier-1 outlets weren't the ones with the most impressive announcements. They were the ones that answered a journalist's triage question in under three seconds: *is this story for me, right now?*

No Web3-specific resource has actually mapped the subject line formulas that work for crypto journalists. General PR guides get you partway there. But crypto journalists aren't general journalists, and the subject lines that earn opens at CoinDesk and The Block have distinct patterns.

---

## Why the crypto inbox is different

CoinDesk, The Block, and Decrypt each receive hundreds of pitches a day. The open-to-coverage ratio is somewhere around 2 to 3 percent. That's not a problem you solve with a better product announcement or a higher round size.

Crypto journalists are faster to dismiss than general tech journalists because they're more expert. A reporter who covers DeFi infrastructure all day can spot a vague or hype-laden subject line in a glance. They know "revolutionary L2 launch" means nothing. They know "strategic partnership announcement" is filler. And they've seen so many "industry-first" claims that the phrase has stopped meaning anything at all.

This is actually useful information if you flip it: crypto journalists respond to precision and specificity faster than almost any other beat.

---

## The four formulas that earn opens

### Formula 1: The data lead

Structure: `[Specific stat] - [outlet name] exclusive`

Examples that work:
- `66% of crypto users back self-custody - exclusive data for CoinDesk`
- `$500M DeFi volume, zero exploits in 18 months - The Block research`
- `2-in-3 NFT creators lost royalties in 2023 - new chain-level data`

What makes these land: the number is in the subject line, not buried in paragraph three. The reporter can assess newsworthiness without opening. And at CoinDesk in particular, original data is the most reliable path to editorial coverage: it gives the reporter the spine of a story they can actually write.

Notice I'm not writing `66.4%` or `66.3%`: I'm rounding to a clean figure that reads fast. The precision lives in the body of the pitch. The subject line's job is to make the journalist curious about that number.

What doesn't work: `New research reveals crypto custody trends`. That tells the reporter nothing they couldn't have guessed. No number, no outlet-specific hook, no reason to open.

When I ran the Tangem self-custody campaign in 2026, the headline stat ("two-thirds of crypto users support self-custody") was in every pitch subject line across English, Korean, and Japanese editions. The story traveled without a separate custom pitch per market because the number was sticky enough to carry itself.

### Formula 2: The exclusivity signal

Structure: `[EXCLUSIVE] [plain-language announcement], [founder interview available]`

Examples:
- `[EXCLUSIVE] Rari Chain mainnet on Arbitrum - founder interview available`
- `[EXCLUSIVE] $12M raise closes Tuesday - one outlet gets first interview`
- `[EXCLUSIVE] Fluence mainnet data - embargo until [date], interview available`

The word `[EXCLUSIVE]` in brackets is a convention, not clickbait. Crypto journalists, especially at CoinDesk and The Block, respond to it because they're competing with each other. An exclusive gives them something their peers can't publish the same day. You're not just pitching news: you're pitching scarcity.

Two rules apply here. First: only use `[EXCLUSIVE]` if you're actually offering one outlet first access. If you're sending the same subject line to eight journalists simultaneously, you've just burned the word and the relationship. Second: the exclusivity offer has to be real and time-bounded. "Embargo until Tuesday 9 AM ET, one outlet gets first interview" is a credible offer. "First to publish gets an exclusive follow-up" is vague enough to be useless.

### Formula 3: The beat-specific hook

Structure: `[Beat tag]: [one-line story summary, 8–12 words]`

Examples:
- `DeFi: ParaSwap adds intent-based routing - TVL data for your piece`
- `Infrastructure: Fluence DePIN compute network live on mainnet`
- `Regulation: Stablecoin guidance draft - our legal team available to comment`

This one is underused in crypto PR and it works especially well for Decrypt, which has distinct desks for DeFi, NFTs, gaming, and AI-cross-crypto. A reporter who covers only gaming and NFTs does not want to open a generic pitch. A subject line that signals their beat in the first word tells them this email was sent to *them*, not to a list.

The Block is research-led and rewards substance. Beat tagging a pitch for The Block's protocol desk, something like `Infrastructure: Rootstock BTC L2 - on-chain metrics available`, signals that you understand they're not a general news outlet. It's the difference between pitching a reporter and pitching the right reporter.

### Formula 4: The newsjacking angle

Structure: `[Recent headline they covered] - [your angle adds to it]`

Examples:
- `Your Microsoft outage piece - here's the DePIN infrastructure argument`
- `Re: your Ethereum L2 fee compression story - Arbitrum data point`
- `Follow-up to your stablecoin regulation piece - founder available for comment`

This is the subject line that proves you've done the work. It references something the journalist wrote recently, which signals two things: you actually read their bylines, and your pitch is relevant to a story they're already invested in.

When I placed Fluence's co-founder Tom Trowbridge in e27 in September 2024, the pitch hooked into the Microsoft global outage that had happened two weeks earlier. The newsjacking angle, "DePIN compute makes this kind of outage structurally less likely", was in the subject line. The reporter didn't need to guess whether it connected to something their readers cared about.

The timing window on this one is short. A newsjacking pitch sent 48 hours after a story breaks has a different open rate than one sent two weeks later. Your CRM should flag which journalists recently published pieces you can hook into. If you're not tracking recent bylines, you can't run this formula.

---

## What kills the subject line before the reporter reads it

**Company name in the opening position.** Starting with your project name tells the journalist nothing about the story. They don't know your project. `[Project Name] announces mainnet launch` is the subject line equivalent of a press release opener. Lead with the news, not the source.

**Vague adjectives.** "Exciting," "revolutionary," "industry-first," "game-changing": every one of these is a signal to the reporter that the pitch body will be worse. They function as negative trust signals in the crypto press specifically, because the beat has been saturated with overpromising projects for years.

**Character count over 60.** On mobile, anything over about 60 characters gets cut mid-sentence. If your key descriptor disappears in the preview, the subject line isn't doing its job. Keep the news value front-loaded and left-aligned.

**Generic outlet routing.** Sending a pitch to `press@coindesk.com` with a subject line that doesn't name a specific beat is a near-guarantee of no response. CoinDesk, The Block, and Decrypt all expect named reporters. A direct email to the reporter who covers your specific beat, with a subject line matched to their recent work, has a materially higher open rate than anything going to a general inbox.

**"FOR IMMEDIATE RELEASE" as a subject line prefix.** It marks the sender as someone who doesn't understand how journalism works, and the reporter's delete reflex fires before they've read a word.

---

## Timing the send

The subject line formula matters. The send time matters almost as much.

Pitch Tuesday through Thursday, 8 to 9 AM in the journalist's timezone. Crypto journalists, especially those at US-based outlets like CoinDesk and The Block, have morning routines built around catching up on Asian market moves from overnight. Their inbox is freshest in the early morning window before they're mid-story or on deadline.

For APAC-based journalists at outlets like Blockworks or Decrypt's Asia desk, adjust for Singapore or Tokyo time. I've seen pitches to APAC reporters that land at midnight their time because the sender is in New York and didn't account for the time zone. That's a Friday-morning inbox clearout that gets your pitch archived without reading.

Embargo announcements have a different logic. Those go out with enough runway for the reporter to do their homework, typically 48 to 96 hours before publication. The subject line on an embargo pitch carries an extra signal: `[UNDER EMBARGO - [Date, Time, Timezone]] [Announcement in plain language]`. That structure tells the reporter this is a real exclusive with a real deadline, not a vague "heads up" that means nothing.

---

## The three-second triage test

Before any pitch subject line leaves your drafts folder, apply this test: could a reporter at your target outlet, scanning their inbox on a busy morning, tell within three seconds whether this story is for them?

If the answer involves them opening the email to find out: you've already lost. The subject line failed.

The formula is simple enough to memorize:

1. Lead with the news (a number, an exclusive signal, or a beat tag)
2. Keep it under 60 characters
3. Name the outlet or beat if you're running an exclusive
4. Kill every adjective that doesn't carry factual weight

I post about pitching mechanics and what's actually landing in crypto newsrooms on X. If you want to talk through a specific pitch before you send it, or debrief after a campaign that didn't produce the coverage you expected, book a session below.

---

> life of a PR manager:
> - eat breakfast
> - edit pitches
> - eat lunch
> - pitch pitches
> - eat dinner
> - follow up on pitches
> - go to sleep
> - dream about pitches getting accepted
>
> [Shilika Jain on X, 23 May 2024](https://x.com/Shilika_jain/status/1793552164058734697)

The subject line is the edit that matters most. Every other refinement is secondary.

---

**Book a 30-min teardown with Shilika**: bring your pitch subject line and I'll tell you exactly why it's not opening, and what to replace it with: [https://calendly.com/shilikajain/30min/](https://calendly.com/shilikajain/30min/)
$b100$
where slug = 'crypto-pitch-subject-line-formula' and md5(body) = 'cbca0cc05bc7ac0cd686443d25be57c1';

update blog_posts set description = $b100$The exact subject line formulas that get crypto pitches opened at CoinDesk, The Block, and Decrypt, with annotated good and bad examples from real campaigns.$b100$
where slug = 'crypto-pitch-subject-line-formula' and md5(description) = '844a5532afec2e6505446940fd3bc7d3';

update blog_posts set body = $b100$# Stablecoin Issuer PR After the GENIUS Act

<invoke name="submit_draft">
The GENIUS Act moved payment stablecoins from an enforcement-driven grey zone into a federal regulatory framework on July 18, 2025. The compliance deadline, the date by which every permitted payment stablecoin issuer must hold a federal or state license, is January 18, 2027. That gives you, right now, roughly three months to get your communications posture right before the licensing window closes and the market decides who reads as institutional infrastructure and who reads as legacy.

Most of the content on this topic covers what the Act requires legally. None of it covers what it requires communicatively. That gap is what this post fills.

## What actually changed for stablecoin communications

Before the federal framework, stablecoin issuers communicated defensively. Every press statement was written with one eye on enforcement risk. The language was hedged, classification was contested, and the default posture was to say as little as possible about the regulatory picture.

A federal framework inverts that entirely.

Compliance is no longer a liability to be managed quietly. It's a commercial signal. Institutions evaluating which stablecoin to hold for treasury management, corporates choosing settlement rails, payment processors deciding which stablecoin to integrate: they now have a federal standard to benchmark against. Issuers that communicate their position relative to that standard clearly and early will own the institutional default. Issuers still writing in the old defensive register will be read as legacy.

The market has also restructured the competitive set in ways that PR now has to reflect. Circle's USDC, with its GENIUS Act alignment and MiCA authorization, is the institutional default in regulated venues globally. Tether's USDT, which holds about 60% of a $310 billion market, has structural exclusion from regulated US institutional contexts because it hasn't sought GENIUS Act compliance. That split (compliant issuers gaining institutional share, non-compliant issuers retaining retail and emerging-market share) is the central narrative of the stablecoin market right now. Where your issuer sits in that split is the first question your comms strategy has to answer.

## The three-track communications posture

A serious stablecoin issuer PR program runs three distinct tracks simultaneously. Most founders conflate them or run only one. That's the fastest way to get ignored by the audiences that actually matter.

**Track 1: Product voice.** This is the story for your end users, payment partners, and DeFi integrations. The frame is settlement infrastructure: speed, programmability, interoperability, redemption policy. The outlets that carry this story are CoinDesk, The Block, Blockworks, Decrypt, and Cointelegraph. These are the publications your technical and crypto-native stakeholders read. The product voice track should be running continuously, not just at launch.

**Track 2: Policy voice.** This is the story for the legislators, Treasury staff, OCC rulemakers, and policy analysts who are still writing the implementing regulations that will govern your operating model. As of October 2026, the regulatory agencies missed their July 18, 2026 statutory rulemaking deadline and every rule is still a proposal. That means you still have a window to shape the final framework. The outlets for policy voice are Politico, Axios Pro Policy, Punchbowl News, and The Hill. These are not crypto publications. Their readers are Congressional staff, financial regulators, and Washington policy shops. If you're not placing op-eds and expert commentary in this tier, you're absent from the conversation where your operating rules are being written.

**Track 3: Institutional press.** This is the story for the banks, asset managers, treasury teams, and payment networks evaluating your stablecoin as settlement infrastructure. Bloomberg, The Wall Street Journal, Financial Times, Reuters, and Forbes Digital Assets. This tier shapes institutional allocation decisions, ETF flows, and the broader political environment in which your license applications get reviewed. For any issuer at or approaching the $10 billion threshold that triggers mandatory federal regulation, this tier is not optional.

These three tracks are not interchangeable. A product story placed in Blockworks does nothing for a Treasury analyst reading Politico. A policy op-ed in Punchbowl News won't help the corporate treasurer who reads Bloomberg to decide which stablecoin rail to adopt. You need all three, sequenced and staffed separately.

## Turning compliance into a buying message

This is the specific narrative shift that most issuers get wrong. They disclose their compliance posture in legal boilerplate: buried in the footer of a press release, stripped of commercial context. That's not communications. That's document management.

The compliance story for a GENIUS Act-aligned issuer has four components, each of which speaks to a different audience:

**Reserve composition, disclosed monthly.** The Act requires monthly reports attested by a PCAOB-registered accounting firm and certified by the CEO or CFO. That's not a burden: it's a differentiation signal. An institutional treasurer deciding between your stablecoin and a non-attested competitor has a concrete reason to choose you. Say so in your press materials, not just in your compliance documentation.

**Not a security, not a commodity.** The GENIUS Act clarified that payment stablecoins are neither securities under federal securities law nor commodities under the Commodity Exchange Act. For institutional buyers who spent three years asking their legal teams whether holding a stablecoin triggered securities-law exposure, this is a buying signal. That sentence needs to be in your pitches to Bloomberg and the WSJ, not just in your legal FAQ.

**Federal oversight as credibility.** For the institutional press tier, OCC oversight or state banking regulator supervision is a credibility marker, not a constraint. Frame it as such. The question isn't "we comply with federal rules." The question is "we're the issuer whose reserve composition is verified monthly by a Big Four firm and examined by the OCC." That's a different sentence and it lands differently with a Reuters reporter covering the banking desk than it does with a crypto-native journalist covering DeFi.

**Redemption reliability.** Consumer and market protections under the GENIUS Act give payment stablecoin holders first priority in insolvency. That's a specific risk-management claim your payment and corporate partners can put in front of their own boards. Write it in those terms.

## The outlet split in practice

Founders often ask me which outlets to prioritize when they're running a lean PR program. Here's the honest answer: it depends entirely on where your immediate commercial risk lives.

If you're a smaller issuer under the $10 billion threshold, your most urgent press need right now is policy voice. The implementing regulations are still being finalized and you have 90 days to make your perspective known. A well-placed op-ed in Axios Pro Policy or a quoted comment in a Politico piece on the rulemaking process will do more for your long-term operating environment than a Cointelegraph product feature.

If you're at or approaching the $10 billion threshold and mandatory federal supervision, your urgent press need is institutional. The banks and payment networks that will become your primary distribution channels read Bloomberg and the WSJ. A single institutional-tier placement that positions you as the compliant settlement layer for corporate treasurers is worth more to your pipeline than ten trade publications.

Pre-launch or early-stage issuers generally need product voice first: you need crypto-native stakeholders to understand the use case and technical differentiation before you pitch institutional press on the compliance story. But don't wait longer than six months to start building the policy voice track. The rulemaking is happening now.

## Pitfalls specific to the post-GENIUS environment

I've run enough regulatory PR cycles to know the mistakes that trip up technically competent teams.

**Overclaiming compliance status.** The GENIUS Act is law but not yet in force. As of today, no stablecoin has been formally approved under the Act because no final rules have been issued. If your PR materials say your stablecoin is "GENIUS Act-approved" or "federally licensed under the GENIUS Act," you're making a claim no regulator has conferred. That will blow up in a Bloomberg fact-check. Use "GENIUS Act-aligned" or "structured to comply with the GENIUS Act framework" until you hold an actual license.

**Confusing policy press with trade press.** A Politico reporter covering financial regulation is not the same as a Decrypt reporter covering DeFi. They work from different story frames, they have different source networks, and they respond to completely different pitch angles. Sending a product launch pitch to a Politico policy reporter will get you ignored. Sending a Congressional testimony summary to a Cointelegraph reporter will get you placed in the wrong story. Know which track you're pitching before you pitch.

**Missing the comment period window.** Treasury published its Notice of Proposed Rulemaking on the GENIUS Act Section 3 framework with a public comment deadline of October 19, 2026. If you didn't file comments, you gave up your clearest on-record opportunity to shape the implementing rules. Going forward, every rulemaking comment period is also a PR opportunity: a formal statement to Treasury or the OCC is quotable, citable, and searchable. File them. Quote them in your press materials.

**Treating reserve disclosure as compliance theater.** Some issuers publish their monthly attestation reports in a PDF buried on a legal page. That's leaving signal on the table. Surface the key figures (reserve composition, total stablecoins in circulation, attestation firm) in your press releases and investor communications. The reporters at Bloomberg and Reuters who cover the banking desk are looking for exactly this data.

**Ignoring the foreign issuer question.** Section 3(b)(2) of the Act applies from the effective date. Foreign-issued stablecoins may not be offered to US persons unless the issuer has the technological capability to comply with lawful orders. If you're an APAC or European issuer with US distribution, that's a specific communications risk: you either need a safe harbor determination from Treasury or a clear statement that you're not offering to US persons. Not addressing this in your PR leaves your US distribution partners in a compliance ambiguity they will resolve by dropping your stablecoin.

## The narrative the market is actually running

Watch what Circle is doing and understand it as a PR case study, not just a competitive benchmark. USDC's communications posture is: reserve credibility backed by monthly Deloitte attestations, regulatory alignment across both the GENIUS Act and MiCA, and institutional positioning built through Bloomberg and FT coverage of the IPO process rather than through crypto trade publications. That's a three-track program running in sync.

The market dynamic it's exploiting: Tether retains retail and emerging-market dominance through geographic expansion, but faces structural exclusion from regulated US institutional contexts and EU regulated platforms. Circle's institutional media coverage frames USDC as the default for any institution that needs a stablecoin it can put in front of its compliance team. The compliance story is the product story.

Your job is to figure out where your issuer sits in that narrative and build a PR posture that makes it legible to each of the three audiences. Product users want interoperability and settlement speed. Policy audiences want AML rigor and reserve transparency. Institutional audiences want OCC oversight, PCAOB attestations, and legal clarity on their books.

Those three things can be true about the same stablecoin. Very few issuers are saying all three, to all three audiences, in the right outlets.

The January 18, 2027 deadline is a communications deadline as much as it's a licensing deadline. Issuers that have built recognizable institutional credibility before that date will be in a materially different position when the implementing rules take effect and the market decides which stablecoins belong on regulated rails.

---

**Book a 30-min teardown with Shilika**: bring your current comms setup and I'll tell you exactly where the gaps are and which track to build first: [calendly.com/shilikajain/30min](https://calendly.com/shilikajain/30min/)
$b100$
where slug = 'stablecoin-issuer-pr-genius-act-playbook' and md5(body) = '4dd8b79271ea17f22f4a78114b516bed';

update blog_posts set body = $b100$# Crypto Media Map 2026: Where to Pitch After Blockworks Shut Its Newsroom

If you built your PR strategy around a 2024 outlet map, it's broken. Two of the most distinctive newsrooms in crypto journalism are gone within eight months of each other, and the coverage gap they left is not being filled the way most founders assume.

<invoke name="web_search">

On October 29, 2025, Blockworks co-founder Jason Yanowitz announced the closure of the company's news division and the layoff of its journalism team. The newsroom had launched in 2021 and quickly built a reputation for institutional-grade reporting that earned citations from Bloomberg, Reuters, and The Wall Street Journal. Then in May 2026, DL News, the investigative outlet built alongside DefiLlama, announced it was also closing, citing AI-driven search collapse and the commercial impossibility of running journalism at scale without meaningful audience distribution.

Two quality newsrooms. Gone within one cycle. Your media strategy needs an update.

## What Blockworks Actually Was (And Why Its Loss Matters to You)

Blockworks was not just another crypto outlet. It was the publication that translated DeFi and institutional macro for a reader who came from traditional finance. The Empire newsletter, the Unchained-adjacent podcast network, the Digital Asset Summit: these built a genuinely distinct audience: allocators, analysts, and senior operators who did not read Cointelegraph for their primary market context.

When I was placing clients like Web3Auth and Fluence, Blockworks occupied a specific slot in the sequencing. A Blockworks placement signalled to institutional readers and crypto-native VCs in a way that CoinDesk or Cointelegraph alone did not. It was the outlet that made a story feel legitimate to TradFi-adjacent readers without requiring a Bloomberg pick-up.

The company chose to exit the newsroom while it was still profitable, Yanowitz confirmed record revenues in 2025 and projections for another record year in 2026, because the data and analytics business had grown faster and commanded a higher multiple. The move was rational for Blockworks. For your media strategy, it created a real hole.

Senior news editor Katherine Ross, crypto policy reporter Casey Wagner, and senior reporter Ben Strack were among the journalists who confirmed their departures. Yanowitz publicly encouraged the industry to hire them. That talent is now scattered: some at other outlets, some at protocols, some building independent platforms.

Blockworks itself is still alive. Its newsletters, its Empire podcast, and the Digital Asset Summit (now expanding to Abu Dhabi) continue. But you can't pitch a newsroom that no longer has reporters.

## The Second Domino: DL News Closes in May 2026

DL News launched in 2022 as the news arm of DefiLlama. It built a reputation for investigative DeFi coverage that other outlets did not do with the same rigour. In May 2026, it announced closure, stating bluntly that traffic across crypto and tech media had "contracted severely" and that AI had "accelerated the collapse of search distribution."

The shutdown was not for lack of journalism quality. DL Research, its commercial research arm launched in 2024, grew revenue 270% in 2025 and crossed seven figures in annual sales. The editorial side could not carry itself without the distribution scale.

This matters for your pitch sequencing because DL News occupied a specific lane: serious investigative reporting on DeFi protocols, enforcement actions, and ecosystem failures. That coverage was harder to replicate than a news brief. The outlets that remain are largely not investing in that same beat at the same depth.

## The 2026 Outlet Map: What You're Actually Working With

Here is the honest picture of where to pitch in 2026, by tier and use case.

### Tier 1: The Core Four

**CoinDesk** remains the institutional benchmark. It's the oldest and most credible publication in the space, owned by Bullish, and it covers regulation, markets, policy, and Ethereum ecosystem with editorial standards that most outlets don't match. If your story has a regulatory angle, a major funding round, or institutional adoption, CoinDesk is your first call. Reporters including Ian Allison, Danny Nelson, and Nikhilesh De are worth tracking specifically.

**The Block** has explicitly moved to fill the institutional coverage gap. In April 2026, it appointed Steve Chung as CEO to accelerate what it describes as "institutional expansion at the intersection of crypto, finance, and AI." Larry Cermak, previously CEO, moved to President and now oversees research and product. The Block is positioning itself as the primary information platform for institutional investors, market participants, and policymakers: exactly the space Blockworks vacated. Foresight committed an additional $10 million in growth capital to support this phase. For founders raising from institutional players or launching products aimed at TradFi crossover, The Block is now your Blockworks replacement.

**Cointelegraph** is the highest-traffic crypto outlet in the world by most measures. Volume, reach, and time-zone spread are its strengths. It covers altcoins, Layer 2s, regulation, and DeFi with a publishing cadence that no other outlet matches. The editorial bar for news coverage is real. The bar for op-eds and expert commentary is lower than many founders assume: they run several contributed pieces per week, and a good DeFi or infrastructure angle can get through.

**Decrypt** sits at the intersection of crypto and culture. Consumer apps, NFTs, gaming, ecosystem adoption, and the Decrypt AI desk (which I've placed Fluence commentary through) are its natural homes. If your story is about real-world usage rather than institutional market structure, Decrypt is often the right primary outlet.

### Tier 1.5: The Institutional Hole-Fillers

**Bitcoin Magazine**: Bitcoin-only, deep on policy and adoption, increasingly relevant as treasury allocation stories dominate the institutional narrative. If your story touches BTC in any meaningful way, Bitcoin Magazine belongs in your pitch sequence.

**Unchained** (Laura Shin): long-form investigative journalism, podcast with genuine reach among sophisticated readers. This is not where you pitch a product launch. It's where a founder goes to explain a complex narrative, respond to a controversy in depth, or establish an investigative track record. Laura Shin and her team are genuinely selective. A pitch that wastes their time once ends the relationship.

**The Defiant** (Camila Russo): the strongest DeFi-native outlet still operating. Founded in 2019, it's the publication that covers liquidity crises, governance attacks, and protocol deep-dives before mainstream crypto media gets there. If you're building in DeFi, The Defiant needs to be on your list. Its newsletter, podcast, and video content each reach different segments of the DeFi participant audience.

### The Investigation Layer

**Protos** covers the stories other outlets soften: scam allegations, exchange controversies, protocol failures, and media criticism. For a PR operator, this matters in two ways. One, never underestimate them: their coverage of negative stories travels fast. Two, their presence in the ecosystem means the community has a skepticism-first outlet that can verify your claims independently. Build your narrative to hold up under their scrutiny.

### Mainstream Crossover

**Bloomberg Crypto**, **Reuters Digital Assets**, and **TechCrunch** remain the mainstream crossover targets for significant funding rounds, regulatory moments, or AI startup angles. These are not pitches you send on a timeline. They come from a relationship built over months and a story angle that genuinely serves a non-crypto reader.

## What This Means for Your Outreach Sequencing

The structural change is this: the institutional-trade press tier has consolidated from four credible outlets (CoinDesk, Blockworks, The Block, DL News) to two (CoinDesk and The Block). Every founder building a 2026 media strategy needs to account for that.

In practice, the sequencing I run for clients now looks like this:

**Funding rounds and major protocol launches:** CoinDesk or The Block as the primary (embargo, one exclusive), Cointelegraph and Decrypt for same-day tier-2 simultaneous release, Bitcoin Magazine if the story has BTC adjacency.

**DeFi protocol stories:** The Defiant as the primary, with Unchained for long-form follow-up if the story has investigative depth. Cointelegraph for broader distribution.

**Founder thought leadership / op-eds:** CoinDesk opinion desk, Decrypt, Cointelegraph. Unchained for podcast placement if the founder has a genuine point of view on something the market is debating.

**Institutional crossover stories (RWA, ETFs, treasury adoption):** The Block as primary, Bloomberg Crypto and Reuters for simultaneous mainstream outreach.

One thing I've said publicly and still believe:

> me when my web3 PR clients ask me if i can get them earned coverage on Cointelegraph, Coindesk, TheBlock, Bloomberg, Blockworks, Forbes in next 1 month
>
> [Shilika Jain on X, 31 Aug 2023](https://x.com/Shilika_jain/status/1697279930776846765)

That post was about timeline, not about the outlets themselves. A month is not enough time to build the relationships that make tier-1 pitches land. But with Blockworks gone from the pitching map, the timeline pressure at The Block has intensified. Fewer doors means each relationship matters more.

## The Pitch Volume Trap

The response most founders have to a smaller outlet pool is to pitch more aggressively to the outlets that remain. This is exactly wrong.

CoinDesk and The Block both have fewer editorial desks than they did two years ago, but their inbox volume has not gone down: it's gone up, because every founder who used to pitch Blockworks is now redirecting to them. The signal-to-noise ratio for undifferentiated pitches has gotten worse.

What cuts through in 2026 is the same as what always cut through: a specific reporter who covers your beat, a story angle they haven't written, and a source relationship that makes your founder the go-to when that angle needs a quote. That's not a mass-pitch problem. It's a relationship problem.

> builders build, PR's pitch lol
>
> [Shilika Jain on X, 28 Mar 2025](https://x.com/Shilika_jain/status/1905715877187838364)

The Blockworks shutdown matters to your strategy. But the more important variable is whether you have a reporter at The Block or CoinDesk who knows your founder's name before the announcement goes out.

## What About Blockworks' Remaining Surfaces?

The company is not dead. Its newsletters and podcasts continue. The Empire newsletter and Blockworks-branded content still reach the institutional-adjacent audience that made the brand valuable. The Digital Asset Summit is expanding to Abu Dhabi in 2026.

For PR purposes, these surfaces are now more like sponsorship and content partnership opportunities than earned media. The Empire newsletter takes guest content and the podcast network takes guests. These are not free placements, they're either paid partnership slots or relationship-driven bookings, but if you're targeting institutional crypto readers, they're still worth understanding.

## The AI Citation Layer You're Probably Missing

One outcome of the Blockworks closure is that its URLs still exist in the training data of every major AI assistant. Stories placed on Blockworks.com between 2021 and 2025 still get cited. The domain has not been wiped from Perplexity or ChatGPT's context window.

This matters because your 2024 Blockworks coverage is still generating citations in AI-assisted searches. And it means that getting placed in The Block, CoinDesk, and The Defiant today is not just about the immediate readership: it's about building the source record that AI assistants pull from in six to twelve months. Coverage you place this quarter will be cited as context in founder and investor research queries well into 2027.

## The Honest Summary

In 2026, the institutional-trade press tier for crypto PR has two primary outlets where it had four. The Block explicitly wants to be the Blockworks replacement and has the capital to execute it. CoinDesk remains the broadest institutional benchmark. The Defiant owns DeFi. Unchained owns long-form. Protos owns skepticism.

Your pitch list is shorter. Your relationships with individual reporters matter more. The timeline pressure to build those relationships before your next announcement is higher than it has ever been.

If you're running a campaign right now without a reporter relationship at The Block or CoinDesk, that's the gap to close first: before you write a press release, before you brief your investors, before you set an announcement date.

---

**Book a 30-min teardown with Shilika** to map your current media strategy against the 2026 outlet landscape and identify exactly which reporter relationships you need to build before your next announcement: [calendly.com/shilikajain/30min](https://calendly.com/shilikajain/30min/)
$b100$
where slug = 'crypto-media-map-2026-after-blockworks' and md5(body) = 'd1e50d1535867f3c31f376218d5fa289';

update blog_posts set body = $b100$# The Web3 Press Kit: What to Build Before You Pitch CoinDesk, The Block, or Bloomberg

A journalist at The Block gets hundreds of pitches a week. They delete most of them in under thirty seconds. Not because the project is bad. Because the pitch arrived without anything a reporter could actually use to write a story.

A pitch is an ask. A press kit is the infrastructure that makes a "yes" possible.

Most Web3 founders confuse the two. They spend weeks crafting the perfect cold email and attach a 40-page whitepaper. The journalist has six other pitches open. They close yours.

I've run PR campaigns for 50+ protocols, placed stories in CoinDesk, The Block, Cointelegraph, Forbes, and Blockworks, and the single most common thing that kills a pitch that deserved to land is the same every time: the founder had nothing journalist-ready sitting behind it.

This is what you actually need to build before you send a single outreach email.

---

## What a Web3 press kit is (and what it isn't)

A press kit is not your whitepaper. It's not your pitch deck. It's not your tokenomics doc.

It's a structured set of materials that lets a journalist write a story about you without sending a single follow-up question. That's the only test that matters.

Generic press kit guides will tell you to include a company overview, leadership bios, and a logo. That's baseline. For a Web3 or AI startup pitching a beat reporter who covers DeFi infrastructure or on-chain governance, that's not enough. The bar is higher because the beat is harder to verify.

After FTX, the tier-1 crypto press became significantly more skeptical of founder claims. That's actually good for legitimate projects. A CoinDesk piece that cites your smart contract audit, includes actual on-chain data, and quotes an independent source carries more weight with investors and in LLM training data than any paid placement. But you have to give journalists the materials to do it.

The difference between a generic press kit and a Web3 press kit is the verification layer.

---

## The seven components of a functional Web3 press kit

### 1. The journalist-ready fact sheet

One page. Not your about page. Not your whitepaper intro. A fact sheet purpose-built for media.

It should include:

- **What the project does** in two sentences. If you need more than two sentences, your narrative isn't ready.
- **Chain and stack**: what blockchain you're built on, what protocol category (L1, L2, DeFi, infrastructure, tooling, etc.)
- **Founded date and incorporated entity name**: reporters need the legal entity for accuracy
- **Headquarters and key operating regions**: especially relevant if you're doing APAC outreach
- **Funding raised**: total, round name, named investors if they're on record
- **Key metrics**: TVL, active wallets, daily transactions, or relevant KPIs for your category. Live numbers, not projections.
- **Token details**: ticker, chain, contract address (publicly verifiable), circulating supply if applicable
- **Three bullet-point milestones**: the things that are actually newsworthy

This is the doc a reporter scans first when they open your email. It should be a PDF that takes ninety seconds to read.

The Block rewards substance and is unforgiving of hype. CoinDesk wants a clear news hook, a verifiable claim, and access to a named executive. Bloomberg's crypto desk wants the same things the finance desk wants: hard numbers, named investors, and a story that would matter to institutional readers. Your fact sheet is where all of that lives.

### 2. The media-ready executive bio

Two lengths: a 50-word version for quick mentions and a 150-word version for feature pieces.

Write both in third person. Journalists copy and paste directly from bios. If yours is in first person, they have to rewrite it, and they won't.

The 50-word version covers: current role, one credential that establishes authority on the topic you're pitching, and one prior role or outcome that signals legitimacy. The 150-word version adds the full arc: where they came from, what they built before, relevant domain expertise, and one quote-ready statement on why this project matters.

The bio should also include confirmation of interview availability and the best contact method. Reporters are working on deadline. "Available for comment via Telegram" is not a contact method.

### 3. On-chain data links

This is the element that almost every generic press kit guide skips, and it's the one that separates a Web3 kit from everything else.

Attach direct links to:

- The project's primary smart contract(s) on a public explorer (Etherscan, Solscan, etc.)
- A Dune Analytics dashboard or equivalent showing activity metrics
- The token contract address and deployment date if applicable
- Any on-chain governance proposals or DAO votes if relevant to the story

You're essentially giving the reporter the ability to verify your claims without relying on you. That's exactly what a tier-1 reporter wants. It also signals that you have nothing to hide, which in the current media environment is itself a signal.

If your on-chain data doesn't match what you're claiming in the fact sheet, fix the fact sheet before you pitch. Reporters check.

### 4. Audit references and security documentation

For any project handling user funds or running smart contracts, this is non-negotiable.

Include:

- The audit firm name(s) and the date(s) of the most recent audit
- A direct link to the public audit report
- A one-line summary of scope (which contracts were audited, what was found, what was remediated)
- Bug bounty program details if you have one

This is not optional for DeFi, bridging, or custody-adjacent products. A reporter at CoinDesk or The Block covering a protocol announcement will ask about it. If you don't have the answer ready, the story stalls or gets reframed around the gap.

A CoinDesk feature that cites your audit is worth infinitely more than one that doesn't mention it because you buried the information.

### 5. High-resolution brand assets

This one should be obvious but it's consistently wrong.

Provide:

- Logo in SVG and PNG, white and dark background variants
- Minimum 1200x628px product screenshot or feature image cleared for editorial use
- A short product demo video link (optional but useful for tech reporters covering launches)

No watermarks. No "please credit us." Editorial teams don't use assets that come with conditions they didn't agree to.

If the assets aren't in the kit, a designer at the outlet will use whatever they find on your Twitter profile. You don't want that.

### 6. A boilerplate that doesn't read like a token sale

The boilerplate is the two-to-three sentence company description that appears at the bottom of a press release and gets used in the "About [Company]" paragraph in coverage. It's small. It matters more than founders think.

Most Web3 boilerplates fail one of two ways. Either they're generic ("a leading decentralized protocol building the future of finance") or they're legally questionable ("holders will earn guaranteed yields through our proprietary staking model").

A functional boilerplate:

- States what the product does and who it's for in plain language
- Mentions the chain or ecosystem
- Does not make claims about token performance, yield guarantees, or speculative outcomes
- Ends with the website URL

That's it. No moon language. No "revolutionizing." No "-Fi" portmanteau.

When I launched Rari Chain's mainnet PR in January 2024, the boilerplate focused on a single sharp operational fact: this is an Arbitrum chain built to protect NFT creator royalties at the contract level. That one sentence anchored coverage in CoinDesk's Protocol newsletter, The Block, and Cointelegraph in the same week. The boilerplate didn't try to do everything. It did one thing precisely.

### 7. A named media contact who actually responds

This should be the easiest part and it's consistently the one that costs deals.

The contact in your press kit needs to be:

- A named person, not press@
- Someone who checks their email daily, not weekly
- Someone who can answer technical follow-up questions or immediately route them to someone who can
- Available during the embargo window if you're pitching under embargo

If you don't have a PR lead, put the founder on it. A journalist waiting 48 hours for a follow-up response will write the story without your quote, or will move on to the next pitch. Both outcomes are worse than being prepared.

---

## The pre-pitch checklist: build this in a day

If you're two weeks out from a funding announcement, a mainnet launch, or a major partnership, here's what to build before outreach starts:

| Asset | Format | Owner | Ready? |
|---|---|---|---|
| Fact sheet | 1-page PDF | Founder / PR | |
| Executive bio (50w + 150w) | Google Doc | Founder | |
| On-chain data links | URL list | Dev / Protocol | |
| Audit report link | URL | Dev / Security | |
| Logo (SVG + PNG) | Zip file | Design | |
| Product image (1200x628+) | PNG | Design | |
| Boilerplate (2-3 sentences) | Text doc | Founder / PR | |
| Media contact (named person) | Text doc | PR lead | |

Build it all in a shared folder, not a Notion doc that requires sign-up, not a Google Drive link that expires. A Dropbox link or a press page on your own domain at `/press` or `/media` is standard. Update it every time something material changes.

---

## What the kit does not fix

A great press kit does not manufacture a news hook. It's infrastructure for a story that already exists.

If you don't have genuinely newsworthy material (a verifiable funding round, a mainnet launch, a partnership with named parties, original data that reporters can't get elsewhere) the kit can't change that. The press kit removes friction for a story that's already there. It doesn't create the story.

This is also why timing matters. I posted a launch PR strategy that's worth keeping next to your press kit:

> wanna activate PR for a major launch/announcement? here's a quick strategy:
> - Create active thought leadership 1-2 month before the launch
> - Secure 1-2 podcasts/interviews 1 month before the launch
> - AMA - 15 days before the launch
> - Embargo press outreach: week before the launch
>
> [Shilika Jain on X, 11 Oct 2024](https://x.com/Shilika_jain/status/1844810665459884246)

Your press kit should be ready by the time the embargo window opens, not assembled the morning you hit send.

---

## The difference between pre-seed and Series A

The press kit structure above works at any stage. What changes is the weight of each component.

At pre-seed, you probably don't have TVL metrics or an institutional audit from Certik or Trail of Bits. That's fine. Lead with what you do have: on-chain proof of concept, named angels, a precise technical claim that a reporter can verify independently. The kit is thinner but it has to be accurate. One unverifiable claim at pre-seed kills credibility more efficiently than at any later stage.

At Series A or B, the bar flips. You should have 12 months of on-chain data, named lead investors, an audit trail, and concrete user metrics. If your kit doesn't have numbers at that stage, reporters assume you're hiding them. They're usually right.

The common mistake across both stages is the same: sending materials that are built for investors, not journalists. Investor decks answer "can this return capital?" Journalist-ready materials answer "is this a story my readers will care about tomorrow?" Those are different questions and they require different documents.

---

## Building the kit vs. hiring someone to build it

You can assemble this kit yourself in one full working day if the underlying materials exist. The fact sheet takes two hours if you already know your numbers. The bios take an hour each. The asset collection is an afternoon.

What takes longer is the narrative work that underpins the kit: figuring out what the news hook actually is, writing a boilerplate that doesn't accidentally create a securities issue, and knowing which of your metrics will resonate at CoinDesk versus which belong at Cointelegraph versus which are better suited for a Bloomberg terminal brief.

That's where a senior operator earns their place.

> PR is the launchpad to build authentic & genuine reputation. Advice to web3 companies: do your PR right — build genuine relationships & trust.
>
> [Shilika Jain on X, 11 Jul 2025](https://x.com/Shilika_jain/status/1943724382121341431)

The kit is the minimum. The relationship is what gets you picked up.

---

**Book a 30-min teardown with Shilika**: bring your press kit draft (or the announcement you're trying to land) and walk away with a concrete plan: [https://calendly.com/shilikajain/30min/](https://calendly.com/shilikajain/30min/)
$b100$
where slug = 'web3-press-kit-what-journalists-need' and md5(body) = 'ef1b5face1794e082da3c12849af613f';

update blog_posts set body = $b100$# Crypto Layoff PR: Cut Staff Without Tanking Token Price or Community Trust

When you run a workforce reduction at a crypto company, you are managing three crises at once: an HR event, a token sentiment event, and a community trust event. Miss the sequencing on any one of them and the other two get worse fast.

In the first half of 2026, more than 7,000 disclosed positions were cut across 47 crypto and crypto-adjacent companies. Algorand Foundation cut 25% of its staff in March. Crypto.com cut 12% the following day. Coinbase cut 14% in May. Each handled communications differently. The fallout was measurably different too.

This is the playbook I wish existed when founders started calling me mid-announcement, asking why their Discord had gone quiet or why their token was sliding on no new news. You can run this yourself. If you want a senior operator running it with you, that option is at the bottom.

## Why Crypto Layoff PR Is Different From Regular Layoff PR

Standard layoff comms advice tells you to notify employees first, announce externally second, stay empathetic. That is all true and still necessary. But it leaves out the three variables that make crypto uniquely difficult.

**Token markets respond in minutes, not days.** When Algorand announced on March 18, 2026, ALGO dropped roughly 5% within the announcement window. The price had already been sliding with the broader market, but the announcement accelerated selling. The Foundation framed the news carefully enough that the token stabilized within 48 hours at around $0.089 rather than entering a freefall. Framing was not the only variable, but it was not irrelevant either.

**Your community holds tokens, not just job titles.** Employees who get laid off are also often token holders. Discord members and Telegram followers are definitely token holders. When they read your announcement, they are reading it as both people who trusted your team and people calculating whether to sell. A single dismissive phrase in the CEO announcement can flip that calculation.

**The AI pivot framing trap is real and recent.** Crypto.com's CEO Kris Marszalek announced the 12% cut by writing that "companies that do not make this pivot immediately will fail" and "companies that move slowly will be left behind." The community backlash was immediate. Critics called it AI washing. Former employees pointed out the framing implied individual failure rather than a company decision. The public response across social media platforms was, by most accounts, largely negative. Compare that with how Algorand described departing team members as "best-in-class contributors to this ecosystem." Same industry, same week, very different community reading.

## The Notification Sequence: Who Finds Out When

Get this sequence wrong and the news leaks in the worst possible order.

**T-72 hours: Legal and executive alignment.** Your legal team needs to have signed off on severance terms, jurisdiction-specific notice requirements, and the communications plan before any manager is briefed. In APAC jurisdictions especially (Singapore, Japan, Korea) local labor law shapes what you can say and when. Do not skip this step to move faster.

**T-24 hours: Senior leadership briefing.** The people who will field questions from their teams need to be briefed the afternoon before, not the morning of. They need time to process the news themselves before they are expected to hold space for others.

**Day of, morning: Manager notification scripts distributed.** Managers should have a written script before any individual conversations start. Not because you want them to read verbatim from a page, but because consistency of message across 10 or 20 simultaneous conversations is only possible if everyone is working from the same facts. The script should cover: what is happening, why, severance terms, timeline, and the one phrase they should not say (more on that below).

**Day of, individual conversations first.** Every affected employee should hear the news from their direct manager before it appears anywhere public. This is non-negotiable. The cost of a news leak is real; the cost of an employee finding out from Twitter is worse.

**Day of, public announcement after internal all-hands.** Not simultaneously. After.

## Choosing Your Channel and Spokesperson

In Web3, the CEO is almost always the right spokesperson. Not the communications team. Not a press release wire. The CEO, in their own voice, on the channels the community already follows.

Coinbase CEO Brian Armstrong posted the full employee email directly to X on May 5, 2026, the same day he sent it internally. That transparency, showing the community the same message that employees received, did material work to contain the narrative. He named the two forces driving the decision clearly. He specified severance: US employees would receive a minimum of 16 weeks of base pay plus two weeks for every year of service, plus six months of healthcare continuation. Concrete numbers reduce speculation. Speculation is what tanks tokens.

The channel split for a typical Web3 announcement looks like this:

| Channel | What goes there | Timing |
|---|---|---|
| X / CEO post | Full announcement, personal voice | Same hour as internal all-hands |
| Discord | Founder or community lead addresses token holders directly | Within 2 hours of X post |
| Telegram | Mirror of Discord post, slightly shorter | Same window |
| Press release | Factual summary for media pickup | Issued simultaneously with CEO post |
| Tier-1 trade press | Optional embargo with CoinDesk, The Block, or Cointelegraph | Only if you have a strong forward narrative |

The last row deserves a flag. Embargoed media coverage for a layoff announcement is only worth pursuing if you have a genuinely compelling forward story: a product launch, a partnership, or a structural change that reframes the cuts as resource reallocation rather than retreat. Without that, an embargoed story just gives a tier-1 reporter time to find the one former employee who will go on record with a negative quote. Skip the embargo unless the forward narrative is real.

## The AI Pivot Trap: What to Say Instead

The temptation to frame a workforce reduction as an AI pivot is understandable. It sounds forward-looking. It shifts the framing from "we're in trouble" to "we're evolving." And in 2026, every other company is doing it.

The problem is that the community is watching, and the framing has become a tell. When Crypto.com's CEO wrote that roles eliminated were ones that "do not adapt in our new world," critics pointed out that this located the problem in individual employees rather than in a business decision made by leadership. That framing drew more scrutiny, not less.

What works instead is the dual-force structure that Coinbase used: acknowledge the market reality and acknowledge the operational evolution, without using one to hide the other. Something like "our revenue is under pressure from market conditions, and AI tooling means a smaller team can now do the work a larger team was doing" is honest about both. It does not pretend the market is fine. It does not imply employees who were cut failed to adapt.

Three phrases to remove from your draft before publishing:

- "Roles that do not adapt to our new world" (implies individual failure)
- "We are excited about this transition" (nothing about a layoff is exciting for the people losing their jobs)
- "This positions us well for the future" as a standalone sentence without specifics (vague optimism reads as spin)

Three things to add instead:

- Specific severance terms, on the record, in the announcement itself
- A sentence acknowledging what the departing team built (name a product or milestone, not a generic adjective)
- A forward statement tied to something concrete: a roadmap item, a protocol upgrade, a partnership already in motion

## Protecting Token Sentiment During the Announcement Window

The 6-to-48-hour window after a layoff announcement is the highest-risk period for token price. This is when speculation runs ahead of information.

The best protection is information density. The more specific your announcement is, the less room there is for the market to fill the gap with fear. Algorand's announcement cited "uncertain global macroeconomic conditions" and "a broader downturn in crypto markets," framed departing staff positively, stated the foundation's continued mission explicitly, and noted that blockchain infrastructure and network operations were unaffected. ALGO dropped about 5% on the announcement day, then stabilized. That is a contained reaction.

What accelerates a token drop during a layoff announcement:

- Vague or delayed communication that leaves the scope of cuts unknown
- No statement about protocol or product continuity
- Social media silence from the core team in the hours after the announcement
- Community moderators who are not briefed and cannot answer basic questions

What slows it:

- The CEO being visibly active on X and Discord in the first 4 hours
- A community Q&A scheduled for within 48 hours of the announcement
- A specific statement about treasury runway or operational continuity (if your numbers allow it)
- Named contributors who are staying and what they are working on

On the treasury point: if your foundation's financials are public anyway, getting ahead of questions with a clear runway statement is almost always better than staying silent and letting the market infer. Algorand's transparency report showed roughly $38 million in fiat reserves and 1.1 million ALGO tokens, which was already in the public domain. Citing that context in the announcement, rather than waiting for analysts to find it, would have reduced speculation further.

## Scenario Map: Pre-Seed Through Series B

The playbook shifts slightly depending on where you are in your trajectory.

**Early-stage (pre-seed or seed):** Your layoffs are small in absolute number, but you are cutting from a tiny team. A 25% cut at a 12-person startup is 3 people. Your community probably knows those 3 people by name. Personalize the announcement. Name what those people built. The generic corporate template lands badly when your Discord has 2,000 members who have been in AMAs with the person who just left.

**Series A (20-100 people, post-TGE or approaching one):** This is where sequencing matters most. If you have a TGE within 90 days, a layoff announcement carries token launch risk. You need a PR operator thinking about both simultaneously. The forward narrative in your announcement has to connect directly to the token launch story: "We are tightening the team around the core protocol so we can ship X by [date]" is a sentence that does both jobs. Abstract cost-cutting language does neither.

**Series B or beyond (100+ people, token live):** Your token holders are a public. Treat the announcement like an investor communication, not just an HR event. That means the substance should mirror what would appear in a regulatory filing: clear reason, clear scope, clear forward plan. Coinbase had its SEC filing and its CEO's X post running in parallel. The consistency between the two was itself a trust signal.

## The Phrase That Decides Whether This Becomes a Crisis

I've watched enough crypto company announcements to know that a single line in the CEO message determines whether the community reads this as honest leadership or spin. The line is usually somewhere in the middle of the announcement, after the hard news has landed, before the forward-looking section.

The bad version: something that sounds like the layoff is actually good news. "This is an exciting moment for us as we realign around our core mission."

The good version: a sentence that shows the CEO understands what is being lost, without catastrophizing. "These are people who shipped [specific product]. That work matters and their contributions are part of what this protocol is built on."

The difference between those two sentences is the difference between a community that gives you the benefit of the doubt and one that starts a thread asking whether leadership knew this was coming for months.

## What to Do in the 30 Days After

The announcement is the start, not the end.

Book a community call for the week after. Not a press event, a community call. The people who hold your token and have followed your project for years deserve a direct conversation with leadership. Keep it unscripted enough to feel real.

Watch for the secondary narrative. After a layoff, trade media will sometimes return 2 to 4 weeks later with a follow-up story: "sources say the cuts were deeper than disclosed" or "the team has lost key protocol contributors." Designate someone to track coverage daily and flag anything that requires a response. Silence to a follow-up story reads as confirmation.

Recommit to your content cadence. One of the fastest ways to signal that the company is still building is to resume your normal developer updates, ecosystem newsletters, and founder posts on a normal schedule. Going quiet for 6 weeks while the market fills the gap with speculation is a common mistake.

---

If you are working through a reduction right now and need a senior operator to build the communications plan, sequence the internal and external notifications, and brief journalists before the news breaks, that is exactly what a fractional engagement covers. No agency overhead, no junior account team, just direct work on the thing that matters.

[Book a 30-min teardown with Shilika](https://calendly.com/shilikajain/30min/)
$b100$
where slug = 'crypto-layoff-announcement-pr-playbook' and md5(body) = '04fa9ca4cf5919794891d99c12303458';

update blog_posts set body = $b100$# Hong Kong Web3 PR Playbook: SFC VASP, Forkast, and the China-Bridge Narrative

If you're choosing between domiciling in Hong Kong and Singapore, the PR strategy is different depending on which you pick. Not "somewhat different." Structurally different. The media landscape, the story frame, and the journalists who'll actually take your call are three separate decisions, and they don't overlap cleanly between the two cities.

Hong Kong has pulled ahead of Singapore in attracting crypto treasury companies and Web3 HQ relocations, with multiple blockchain experts pointing to its regulatory stack as the primary pull factor. The SFC's VASP licensing regime has been operating since 2023. The Stablecoins Ordinance came into force on 1 August 2025. The ASPIRe roadmap, published at Consensus 2025, laid out a 12-initiative framework across five pillars (Access, Safeguards, Products, Infrastructure, and Relationships) covering custody, OTC, staking, and professional-investor token listings. No other APAC jurisdiction has published anything that specific.

That regulatory stack creates a distinct earned-media opportunity. It's compliance-forward, institutional-facing, and explicitly positions Hong Kong as a bridge to Greater China markets. That's a PR angle Singapore, Dubai, and Tokyo can't replicate.

I was on the ground in Hong Kong for DePIN Day in March 2025, working on coverage for Fluence and Titan Network, and the energy in the room was not the general "crypto is back" vibes of 2021. It was infrastructure executives, compliance lawyers, and family office capital. That tells you what story you need to be pitching.

## Why the Hong Kong media landscape is not just "APAC tier-2"

The most common mistake founders make is treating Hong Kong as a regional supplement to a Singapore-first PR plan. It's not. The Hong Kong press ecosystem serves a completely different reader and serves a completely different function in the capital formation chain.

South China Morning Post (SCMP) is not a crypto publication. It's one of Asia's most-read English-language newspapers of record, with a fintech and blockchain desk that covers regulatory and institutional angles. A SCMP placement is read by Hong Kong-domiciled family offices, traditional finance executives, and the government officials who attend FinTech Week. It's not the same reader as someone who found your CoinTelegraph piece through a Twitter repost. SCMP's blockchain reporter Matt Haldane has covered Consensus HK extensively, and the paper's Xinmei Shen has been the go-to byline for Hong Kong regulatory scoops. These are journalists who care about the SFC circular that dropped last Tuesday, not about your TGE narrative.

Forkast is the essential Hong Kong-HQ English-language crypto outlet. Founded in 2018 by former Bloomberg anchor Angie Lau, it focuses on blockchain, cryptocurrency, and emerging technologies from an APAC perspective, and it's specifically designed to bridge Asian market intelligence to a global audience. Placement in Forkast signals to international institutional readers that your project is serious about the Hong Kong market. It's also frequently cited by other outlets covering the Asia angle, if Forkast has your story, Reuters and Bloomberg's Asia desks notice.

Then there's the Chinese-language press, and this is where most non-Chinese founders get it badly wrong.

Direct Mainland China coverage is essentially closed to non-Chinese projects. The accessible Chinese-language crypto press sits in Hong Kong and Singapore, writing for a Mandarin-reading global diaspora. ChainCatcher, PANews, TechFlow, Jinse, and Blocktempo are the five outlets that matter most for this diaspora reach. ChainCatcher has over 1.2 million users and 1.8 billion total views, and it has hosted 60+ events in Singapore, Korea, Vietnam, and Hong Kong. PANews is based in Hong Kong, founded in 2018, covers Web3 in both Chinese and English, and targets entrepreneurs and institutional participants across Asia-Pacific. Jinse operates as a cross-border hub, blending mainland Chinese readership with Hong Kong's global-facing editorial openness.

These outlets are not niche. They are the primary source of record for Mandarin-reading Web3 investors and professionals globally, and they run active on-the-ground programs in Hong Kong. If your project has VASP licensing or a stablecoin angle, ChainCatcher will want to write about it. The story writes itself in Chinese-language media: a compliance-backed Western project bridging into Greater China capital.

## What the SFC's regulatory stack actually gives you as a PR narrative

The ASPIRe roadmap is a gift to anyone who knows how to use it for media. The SFC published a five-pillar framework that does the work of framing your narrative for you, if you're positioned correctly to sit inside it.

Pillar A (Access) covers new licensing frameworks for OTC trading and custody services. If your protocol is building custody infrastructure or an OTC desk aimed at the institutional Hong Kong market, you're not just a Web3 startup anymore. You're a regulated financial services provider in one of the world's most credible jurisdictions. That's a completely different pitch to a SCMP financial services editor than "we're a DeFi protocol."

Pillar P (Products) includes staking: the SFC and HKMA issued guidance on 7 April 2025 allowing licensed VATPs to offer staking services. If you're a protocol where staking is a product, that guidance is a newsjacking hook. You can write an op-ed for CoinDesk or Decrypt's Asia desk: "What the SFC's staking circular means for DeFi yield products."

The Stablecoins Ordinance is the biggest single news hook in the Hong Kong stack right now. It came into force on 1 August 2025. The HKMA had received 36 applications by end of September 2025, and the first two licences, to Anchorpoint and HSBC, were granted in April 2026. If you're building anything touching payments, stablecoin infrastructure, or cross-border settlement, you have months of press hooks as that licensing pipeline runs.

The frame that lands in SCMP and Forkast: Hong Kong as the "regulatory sandbox" for institutional crypto that Mainland China will eventually watch and potentially adopt. Analysts and regulatory commentators have made this observation explicitly. Your PR angle is not "we're compliant." It's "we're building in the jurisdiction that will define the institutional standard for Greater China crypto."

## How to build the media strategy in practice

**Tier 1 (English-language institutional):** SCMP fintech desk, Forkast, CoinDesk Asia, The Block, Bloomberg Crypto. These outlets respond to regulatory announcements, funding news with institutional names attached, and expert commentary from founders who have something concrete to say about SFC policy. If your founder can write a 700-word op-ed on what the OTC dealer consultation means for institutional liquidity, Forkast will run it.

**Tier 2 (English-language crypto trade):** Cointelegraph, Decrypt (Asia desk), Blockworks, Bitcoin Magazine. These are the same outlets you'd pitch from Singapore, but the angle needs to land differently. In Hong Kong, lead with the regulatory frame before the product story. These reporters have covered thirty TGE narratives this quarter. The SFC custody regime is fresh air.

**Tier 3 (Chinese-language diaspora):** ChainCatcher, PANews, TechFlow, Jinse, Blocktempo. I've secured Chinese pickups across ChainCatcher, TechFlow, Jinse, PANews, and Blocktempo for clients running DePIN announcements out of Hong Kong. The Chinese-language press responds to localised, Mandarin-written press releases far more reliably than to English materials with a translation note. They also respond to in-person event presence, if your team is at the Hong Kong Web3 Festival or FinTech Week, show up to ChainCatcher's side events. These outlets run their own community programs and they're accessible on the ground.

A useful frame for the Chinese-language tier: think of it as two-wave PR. Wave 1 is English coverage in SCMP or Forkast. Wave 2 is ChainCatcher and PANews picking that up and writing their own angle for the Mandarin-reading audience. That second wave is not guaranteed from a press release. It's accelerated by having the English coverage to point to, plus a direct relationship with an editor at each outlet.

## What makes a Hong Kong pitch land vs. get ignored

A few patterns I've seen work and fail, across multiple client campaigns:

**What lands:** Regulatory alignment as the lede. "We just received our VASP licence" or "our custody structure is being designed to meet the SFC's ASPIRe custody framework": this is the kind of sentence that earns a reply from a SCMP fintech editor. It signals you understand the city's agenda.

**What lands:** The Greater China bridge angle. Mainland Chinese capital flows into Hong Kong-domiciled vehicles. Anything that positions your project as the compliant on-ramp for Greater China institutional capital (RWA tokenisation, fund administration, stablecoin settlement for cross-border trade) is a story these outlets are actively trying to tell.

**What gets ignored:** Generic "we're expanding to Asia" language. Every Western project says this. It means nothing in Hong Kong specifically. "We're expanding to Asia" is not a Hong Kong story. "We're applying for a VASP licence and positioning as the first SFC-regulated custody layer for Ethereum restaking" is a Hong Kong story.

**What gets ignored:** Treating the Chinese-language outlets as a translation exercise. ChainCatcher and PANews are not wire services waiting to repackage your English press release. They have editorial standards and they write original analysis. Pitch them with a localized hook and a Mandarin-language version of the release. If you send them an English PDF with a note that says "please translate," they won't run it.

**The pitfall no one warns you about:** SCMP and Forkast are both read closely by the SFC's communications team. A story that misrepresents the regulatory framework, claims a licence that hasn't been granted, or uses language that implies SFC endorsement where none exists can create a compliance problem, not just a PR problem. I've seen projects burn a SCMP relationship by over-claiming regulatory status. Check every compliance claim in your press materials with your Hong Kong legal counsel before you pitch.

## What this looks like at different stages

**Pre-seed / seed:** You don't have a VASP licence and you don't need to pretend you do. The Hong Kong story at this stage is ecosystem positioning: attending events, getting your founder quoted as a commentary source on SFC announcements, publishing op-eds on Forkast about what the ASPIRe roadmap means for your category. Build the relationship with the Forkast editorial team before you have a product announcement. When your Series A drops, they'll already know who you are.

**Series A / token launch:** This is when the VASP narrative is most powerful. If you can time your announcement with an SFC policy moment (a new consultation, a licensing batch announcement) you have a natural news hook that lets you attach your story to something editors are already covering. Embargo your funding news to SCMP and Forkast simultaneously, 72 hours before the lift. Give each a slightly different angle: SCMP gets the institutional/regulatory frame, Forkast gets the product and technology detail.

**Post-TGE / growth stage:** Now the Chinese-language press becomes critical. ChainCatcher and PANews are the outlets that will drive the Mandarin-speaking investor and developer communities to your ecosystem. At this stage you want monthly presence in the Chinese-language tier, not one-off press releases.

## The APAC localisation reality

When I led APAC at CoinMarketCap, one of the clearest patterns I saw was this: projects that treated Hong Kong as a box to check ("we got one Forkast placement, done") never built the sustained presence that converted into real capital or partnerships. Projects that understood the two-layer strategy (English institutional tier plus Chinese-language diaspora tier, running in parallel, both with locally relevant hooks) built reputations that outlasted individual announcements.

Hong Kong is not Singapore. It's not Dubai. It's the one APAC jurisdiction where compliance credibility is the story, not a footnote to the story. The founders who get that early are the ones who land in SCMP's fintech section instead of being passed over for the fifth time.

If you're building out your Hong Kong PR plan and you want a second opinion on the narrative and outlet strategy, book a 30-minute teardown and I'll tell you exactly what's working in this market right now.

---

[Book a 30-min teardown with Shilika](https://calendly.com/shilikajain/30min/)
$b100$
where slug = 'hong-kong-web3-pr-playbook-sfc-vasp-media' and md5(body) = '060fbae0c7ca3f7f1bb9a73e7c62dff4';

update blog_posts set body = $b100$# Fractional PR for Cybersecurity Startups vs. Agency: An Honest Comparison

A cybersecurity startup's PR problem is not a generic PR problem. The buyer you're trying to reach (the CISO, the VP of Security Engineering, the SOC manager) does not read TechCrunch and get persuaded. They read Dark Reading, SecurityWeek, and CyberScoop. They check what Gartner and Forrester have written about your category before they book a demo. They've seen a hundred "zero-trust" and "AI-powered" claims and they're immunized against them.

That specificity matters when you're deciding between hiring a full-service cybersecurity PR agency and embedding a fractional senior operator. The decision looks like a budget question. It's actually a question about who does the work and what they know.

## What a full-service cybersecurity PR agency actually costs

The published numbers in 2026 are fairly consistent. A specialist cybersecurity agency retainer for a Series A or Series B company runs $12,000 to $25,000 per month. The median for a funded Series B security company (once you factor in analyst relations, crisis readiness, and media training) sits around $23,500 per month. Enterprise programs at firms like Ironwood or the named security practices at mid-size agencies run $22,000 to $45,000.

Most agencies also attach a six-month minimum. If you sign in January, you're committed through June regardless of whether the coverage lands, the narrative evolves, or your funding timeline shifts.

What that retainer typically covers at the Series A tier: media strategy, ongoing journalist outreach, press release writing, spokesperson preparation, and regular reporting. Analyst relations with Gartner, Forrester, and IDC often costs extra: a separate $5,000 to $10,000 monthly line item. Major event campaigns at RSA Conference or Black Hat are scoped as separate project fees, typically $25,000 to $75,000 on top of the retainer.

So if you want genuine analyst relations and an RSA campaign in year one, you're often looking at $30,000 to $40,000 per month all-in. For a company that just closed a $6M Series A, that's a meaningful slice of runway.

## What a fractional senior operator covers for less

A fractional cybersecurity PR operator runs $5,000 to $12,000 per month. That's the same strategic layer (narrative architecture, journalist relationships, analyst briefing calendar, crisis prep) without the account-team overhead.

What you get is one senior person who built the strategy and is also doing the work. No account executive filtering the brief. No junior coordinator sending the pitch. The founder talks directly to the operator, and the operator talks directly to the reporter.

That matters in cybersecurity specifically because the pitch requires technical comprehension. You can't sell a Dark Reading story on your endpoint detection product without understanding why your detection approach is actually novel. A junior team running a "cybersecurity" playbook built for a generic enterprise SaaS product will produce generic pitches that get ignored.

I posted something a few years back that still holds for this conversation:

> there's nothing crazy about working with big PR agencies!! they deliver the same work what boutique agencies or PR consultants deliver but at a higher cost. what matters is the way they communicate and how invested are they in your project. mind you, hire your PR manager based on that alone
>
> [Shilika Jain on X, 16 Aug 2026](https://x.com/Shilika_jain/status/2088910120847864151)

The investment level is the key variable. A full-service agency with 20 active clients and a junior account team running your account isn't more invested just because the contract is bigger. A fractional operator whose business model depends on placements and renewals is structurally more invested.

## The five surfaces where fractional wins in cybersecurity

**1. Analyst briefings at Gartner, Forrester, IDC, and KuppingerCole**

This is where most generic PR fails cybersecurity founders. Analyst relations in security is load-bearing. Magic Quadrant inclusion shapes enterprise shortlists for 18 months. A Forrester Wave position shapes procurement conversations the PR team never sees. An analyst with no file on your company is a silent veto.

A fractional operator who knows the Gartner covering analyst for your category by name (who understands what that analyst has been writing about, what questions they're likely to ask, how to position a 45-minute briefing so it doesn't sound like a sales call) delivers outsized value versus a junior coordinator sending the same briefing deck every quarter.

The briefing calendar should be mapped to the Magic Quadrant and Forrester Wave cycles for your specific category. Vendor briefing decks need to be written against the questions analysts actually ask, not repurposed from the sales deck. Inquiry sessions need a founder or CTO who can handle technical questions cold.

That preparation is senior operator work.

**2. Threat research amplification**

In cybersecurity, the news engine is not product launches. It's threat intelligence: CVEs, botnet teardowns, incident data, novel attack techniques. When your threat research team publishes a report on a new attack vector, the amplification window is 24 to 72 hours before the story goes cold. A Dark Reading reporter needs a real relationship and a technically credible pitch, not a wire press release.

A fractional operator who covers your beat full-time maintains those relationships continuously, not just around major announcements.

**3. Coordinated disclosure and breach communications**

This is the domain where getting it wrong becomes the story. When you find a CVE in your own product, or when you're breached, the PR handling determines whether you're the company that handled it well or the company that made it worse. The improvised response becomes the headline.

Breach comms and disclosure protocols need to be scoped and drafted before anything happens, not assembled under pressure. A fractional operator working closely with the founder builds that playbook in the first 60 days of an engagement, not after the incident.

**4. RSA and Black Hat media programs**

The major security conferences have a specific PR playbook. The window for locking named-reporter meetings at Dark Reading, SecurityWeek, SC Media, and The Record opens four to six weeks before the event. Pre-briefing select reporters under embargo so day-one stories are ready to publish at announcement is standard operating procedure. The agencies that know this run it every year. The ones that don't run it generically.

A fractional operator who has run security conference PR before doesn't need to learn this on your budget.

**5. AI-search visibility for security buyers**

CISOs and security procurement teams are increasingly researching vendors in ChatGPT, Perplexity, and Google's AI Overview before they engage a sales team. The content layer that determines whether your startup shows up in those results is the same layer that earns trade press coverage. Security buyer intent queries ("best CNAPP vendors for Series B infrastructure," "endpoint detection vendors in Gartner Magic Quadrant") need to be answered in content your company publishes and in coverage that cites your founders as authoritative voices.

A fractional operator who understands GEO (generative engine optimization) and AEO (answer engine optimization) treats this as part of the communications function, not a separate SEO project.

## Where a full-service agency still makes sense

This is not an argument that fractional always wins. There are specific scenarios where an agency's infrastructure and headcount actually matters.

**Multi-regional coordinated launches.** If you're announcing a major Series B with simultaneous press drops in North America, EMEA, and APAC, you need bodies in multiple time zones working in parallel. A fractional operator's bandwidth has limits; an agency has regional practices.

**High-volume crisis management.** A live breach with active media inquiry across three continents, regulatory notifications, and customer communications happening simultaneously needs a team, not one person. Fractional operators can anchor the crisis strategy and messaging, but an agency's 24/7 bench is built for that kind of sustained execution.

**Post-Series C scale.** Once you're running coordinated global analyst programs, major conference sponsorships, quarterly earnings communications, and a high-volume executive visibility program all at once, you need the bandwidth. The fractional model fits a company that has a real story but doesn't yet need a five-person PR department running it.

## The fit-check for founders choosing right now

Here's a simple filter for where you are:

| Your situation | Model that fits |
|---|---|
| Pre-Series A or Series A, 1–2 news moments per quarter, founder-led narrative | Fractional senior operator |
| Series B, active Gartner/Forrester cycle, 1 major conference per year | Fractional operator with project-scoped add-ons |
| Series B+, multi-region, sustained news volume, large exec team | Agency retainer, possibly with a fractional strategic overlay |
| Post-Series C, public-market prep, global comms function | Full in-house team with agency support |

The clearest signal is this: if the work requires a senior brain doing the work directly, fractional beats an agency at the same budget. If the work requires coordinated execution across multiple people and time zones simultaneously, the math flips.

## What the fractional model does not cover

Being honest about scope matters.

A fractional operator does not come with a junior team to handle volume outreach to 40 outlets at once. That kind of distribution is rarely the right spend for a security startup anyway: Dark Reading and SecurityWeek are what matter, not a wire-blasted list of 300 contacts.

It also doesn't include proprietary media databases, built-in event logistics staff, or the administrative layer an agency provides. Those things can be added project by project. They're not in the base retainer.

And a fractional operator won't promise a Magic Quadrant position. No honest operator does. The program earns the briefing. The product earns the score.

## On the fractional model itself

Freelancing and fractional work gets romanticized in both directions: either as the future of work or as a sign you couldn't land a full-time role. I wrote something about this a few years ago that I still think is accurate:

> Freelancing is a tougher job than a full-time one! You take calls at odd times, deliver the project to clients within strict deadlines, managing schedules, continuously upskilling, facing competition, lack of financial security, social isolation, balancing payments & so much more!
>
> [Shilika Jain on X, 14 Jan 2023](https://x.com/Shilika_jain/status/1614170713619038208)

That's the tradeoff the fractional operator accepts. In exchange, you get someone structurally motivated to produce results on your timeline, not someone billing hours toward a retainer that auto-renews.

For a cybersecurity founder pre-Series B who needs the analyst briefing prep, the Dark Reading byline, and the RSA media list owned by the same senior operator who knows your product cold: that tradeoff looks very good.

---

**Book a 30-min teardown with Shilika** → [https://calendly.com/shilikajain/30min/](https://calendly.com/shilikajain/30min/)

Bring your current PR setup (or the lack of one) and I'll tell you exactly what model fits your stage and what the next 90 days should look like.
$b100$
where slug = 'fractional-pr-cybersecurity-startup-vs-agency' and md5(body) = '3bc212167323e79037c74164cf0d53f1';

update blog_posts set body = $b100$# Breach Disclosure PR Timing: The 72-Hour Comms Sequence

A breach hits your client at 2 AM. Your phone lights up. The security team has confirmed unauthorized access. Legal is already awake. Someone in the executive team is drafting a tweet.

Stop. Put the phone down. What happens in the next four hours determines whether this stays a contained incident or becomes the story.

I'm writing this from a communications operator's perspective, not a legal one. Your lawyers can tell you what to file and when. What they can't always tell you is what to say, to whom, in what order, and what will blow the story open before you're ready. That's the job.

## Why this disclosure moment is different from every other crisis

Most corporate crises have some lead time. A funding round that falls through, a co-founder departure, a regulator asking uncomfortable questions. You have hours or days to prep. A breach gives you none of that.

Three regulatory clocks start the moment awareness is confirmed, and they overlap in ways that most comms teams aren't ready for.

GDPR requires notification to the relevant supervisory authority within 72 hours of becoming aware of a personal data breach. The SEC's Item 1.05 on Form 8-K requires public companies to disclose a material cybersecurity incident within four business days of the materiality determination, not from discovery, but from the moment the company determines the incident is material. Most U.S. state laws require individual consumer notification within 30 days of discovery.

The clock that trips most companies: the GDPR 72-hour window starts running from the moment your organization "becomes aware", which under EDPB guidance means when you have a reasonable degree of certainty that a breach of personal data has occurred. Early detection means an early clock start. If your European security team flags an intrusion on Monday morning, your 72-hour supervisory authority notification window opened Monday morning, not when your CEO gets briefed Tuesday afternoon.

The SEC clock is slightly different. It starts at the materiality determination, not at discovery. But the SEC is explicit that companies cannot sit on an incident to avoid starting the clock. The materiality call must happen "without unreasonable delay" after discovery.

The comms implication: your narrative cannot wait for a clean forensic picture. You will never have one in 72 hours.

## The two failure modes that turn a contained breach into a reputational crisis

I've seen both kill companies that survived the breach itself.

**Failure mode 1: Saying too much too early.** The pressure to reassure stakeholders is intense in the first six hours. Executives want to project control. Legal wants to prevent class action exposure. Communications teams, trained to fill information vacuums, reach for specificity that doesn't exist yet. So someone says "no sensitive data was accessed" before forensics has confirmed scope. Or "we've contained the situation" before the third-party IR team has even started. When the investigation proves those claims wrong, and it often does, you're not managing a breach story anymore. You're managing a cover-up story.

Uber discovered a 2016 breach affecting 57 million riders and drivers and stayed silent for over a year, only disclosing in November 2017. The delay led to a $148 million settlement and a criminal conviction for the company's former security chief.

**Failure mode 2: Saying too little too late.** Silence reads as concealment. When a trade reporter emails your press inbox asking about a "major breach" (and they will, often because someone leaked internally or it surfaced on a breach monitoring forum) no response is a story in itself. Staying silent for the first 12 hours while you figure things out is a communications void that speculation fills immediately. By the time you issue your holding statement, the narrative frame is already set, and you're reacting to someone else's version.

As I posted back in February 2023:

> It's very important to control your story and actively shape it before it's lost!
>
> [Shilika Jain on X, 10 Feb 2023](https://x.com/Shilika_jain/status/1623987776730574848)

A breach is the moment where that maxim is tested hardest. The companies that handle it well understand that "controlling the story" does not mean suppressing it. It means owning the sequence.

## The stakeholder sequence: who hears what and when

This is where most playbooks skip the hard part. Legal briefings, regulatory notifications, IR calls, customer emails, press statements: they all have dependencies. Get the order wrong and you create either a selective disclosure problem (IR violation) or a spokesperson inconsistency problem (PR crisis).

**Hour 0 to 2: Internal containment, single incident commander**

Before any external communication, one person owns the response. Incident commander is not a PR role at this stage. It's typically CISO or CTO with the general counsel in the room. The communications lead should be in the first briefing call to understand scope and take forensic status notes, but no external statement goes out until legal clears the factual frame.

The first PR task is to freeze all scheduled social content immediately. This sounds obvious. It's missed more than you'd think. A scheduled "Cybersecurity Awareness Month" post during a live breach is the kind of own-goal that ends careers.

**Hour 2 to 6: Board and audit committee, outside counsel retained**

The board chair and audit committee chair need to be briefed verbally before any formal disclosure decision is made. For public companies, the general counsel needs outside counsel engaged at this stage, both for the attorney-client privilege protection over the response and for command of the disclosure requirements across jurisdictions. Outside counsel has a better grip on the intersection of state notification laws, GDPR, SEC Item 1.05, and any sector-specific regimes (HIPAA, NYDFS Part 500, PCI DSS) than in-house counsel typically does.

The communications team drafts the holding statement during this window. Not after. During. You want it ready before a reporter emails.

**Hour 6 to 12: The holding statement goes external**

The holding statement is not a press release. It does not explain the breach. It does not speculate on cause, scope, or attribution. It does six things:

1. Acknowledges the incident plainly, without euphemism
2. Confirms that investigation is active and ongoing
3. States what protective steps are immediately underway
4. Tells affected people what action, if any, they should take right now
5. Names a single point of contact for media inquiries
6. Commits to a specific time for the next update

What the holding statement does not do: it does not say "no evidence of widespread impact." It does not say the breach was contained. It does not attribute the incident to a nation-state or specific threat actor. Those claims require forensic certainty you don't have.

For a public company, this holding statement goes out simultaneously with (or just after) the SEC Form 8-K filing if the materiality determination has already been made. Do not issue a press release before the 8-K is filed. The SEC has been explicit that Item 1.05 disclosure should precede or coincide with public comms, not follow them.

**Hour 12 to 48: Regulators, customers, cyber insurer**

Regulatory notifications should be under legal coordination, not communications coordination. But the communications team has a role: the language used in regulatory notifications often becomes the language of subsequent press releases. Align the narrative across documents now rather than after a reporter identifies inconsistencies between your 8-K language and your customer notification email.

Customer notification timing is governed by state law (30 days in most U.S. states) and GDPR's phased notification model. On the GDPR point: the rules allow phased notification. You submit what you know within 72 hours, flag what you don't, and update the supervisory authority as investigation matures. This is not weakness. It's the model the regulation was written to accommodate.

Notify the cyber insurer within their contractual window, typically 24 to 72 hours from incident awareness. Failure to notify promptly can result in coverage denial. This matters for communications because your insurer may provide crisis PR resources as part of the policy. Know this before the breach.

**Hour 48 to 72: Secondary stakeholder communications**

This is the window for broader stakeholder comms: employee communications (with explicit guidance that staff do not speculate publicly), enterprise customer briefings via account teams, and partner notifications under contractual disclosure terms. Each of these audiences needs a version of the same core narrative, calibrated to what they need to know and what they need to do.

A single communications operator should own the narrative document that all of these channel-specific messages are drawn from. Inconsistency between what the IR team tells analysts and what the customer success team tells enterprise clients creates the "conflicting reports" headline you're trying to avoid.

**Hour 72 to 96: Press briefings and full public statement**

For public companies, this window is the close of the SEC four-business-day window from materiality determination. By this point you should have:

- A filed 8-K with full disclosure of what is known
- A press release distributed through BusinessWire or PR Newswire with the same core facts
- A named spokesperson, either the CEO or the CISO depending on breach type, available for trade press
- Pre-scheduled briefings with key security trade reporters within the filing-plus-two to filing-plus-eight hour window

The media target list for cybersecurity incidents is more specific than a standard tech announcement. Security trade press (Dark Reading, SC Media, SecurityWeek, Bleeping Computer for technical audiences), business press (Wall Street Journal, Financial Times), and sector-specific press based on the breach type. A healthcare data breach calls for reporters covering health tech and HIPAA compliance. A financial institution breach leads with WSJ and CNBC.

## The spokesperson question

Do not send legal to do the talking. Statements that read as liability shields, vague in language and empty of empathy, are standard practice and standard failure. The general counsel's job is to approve what the spokesperson says, not to be the spokesperson.

For a cybersecurity company, the spokesperson is almost always the CISO. Their technical credibility is the only thing that can hold ground with a skeptical security trade reporter who has already read your 8-K filing and spotted three ambiguities. The CEO speaks to the human impact and the business response. The CISO speaks to the technical facts.

For a non-security company that suffered a breach, the CEO is typically primary. Their message is simpler: what happened to customers, what the company is doing about it, and what it's putting in place to prevent recurrence.

One spokesperson. One approved messaging document. Every employee who might receive media contact (customer support, sales, operations) gets a single line: "We are not in a position to comment beyond our official statement. I can direct you to our media contact."

## What the 30-day window means for sustained comms

State notification to affected consumers typically runs on a 30-day window from discovery. That is not a 30-day blackout on further press engagement. After the initial disclosure cycle settles, around day five to ten, the story enters its second phase: remediation, accountability, and the "what are you doing differently" question.

This is where a cybersecurity company's communications record becomes either an asset or a liability. A company that disclosed promptly, communicated clearly, and followed through with specific remediation steps has a reputational recovery path. A company that delayed, minimized, or put legal language where empathy belonged spends the next quarter in reactive mode.

As I noted when thinking about the crypto market crisis year of 2022, which had more breach and rug events than most industries see in a decade:

> Transparency is the key to successful web3 business. Medias have emerged as the strongest source of truth this season.
>
> [Shilika Jain on X, 18 Nov 2022](https://x.com/Shilika_jain/status/1593473255125397504)

That applies directly here. In a breach, media are the strongest source of narrative correction, and they will fill the void with whatever information they have. Give them verified facts or they work with what they can find.

## A note for private companies and startups

Most of this post addresses public companies because the SEC 4-day rule only applies to them. If you're pre-IPO or private:

- Your SEC obligation is zero. Your reputational obligation is identical.
- GDPR still applies if you handle EU personal data, regardless of your incorporation status.
- State breach notification laws apply regardless of listing status.
- Your investors, enterprise customers, and enterprise prospects are all public company IR teams watching how you handle this.

The standard you hold yourself to in breach disclosure is a direct signal to your eventual Series B or Series C investors about how you run governance. Companies that handle breaches transparently, fast, and on a documented sequence attract better capital than companies that bury incidents until they surface in due diligence.

## What pre-built infrastructure looks like

The companies that handle breaches well are not smarter or luckier. They have pre-built infrastructure:

- A holding statement drafted for 3 to 4 likely breach scenarios before any incident occurs
- A named incident commander with a defined decision chain
- Outside counsel already engaged and briefed on the company's jurisdictional profile
- A cyber insurer with the policy notification requirements documented
- A spokesperson with existing media relationships in the security trade press

That last item matters more than people realize. A CISO with a byline history in Dark Reading or SecurityWeek, who has spoken at Black Hat or RSA, is a credible source when a trade reporter is on deadline. A CISO with zero public presence is a stranger making claims that can't be verified.

Building that spokesperson profile is a PR function, not a security function. And it's work that has to happen before the breach.

---

If you're building out a cybersecurity communications program, or you need a PR operator who understands how the regulatory and media tracks intersect during an incident, [book a 30-min teardown with Shilika](https://calendly.com/shilikajain/30min/).
$b100$
where slug = 'breach-disclosure-pr-timing-first-72-hours' and md5(body) = 'c5739284617a767b1861fdd2f54ac661';

update blog_posts set body = $b100$# The Op-Ed Pitch Email That Gets Commissioned by CoinDesk, Cointelegraph, and Decrypt

Most founder op-ed pitches read like press releases with the company name swapped for "I." That is why 90% of them get deleted before the opinion editor even reaches the argument line.

I've placed founder op-eds in CoinDesk Opinion, Cointelegraph Expert Take, and Decrypt Opinion across 50+ protocols over six years. The pitch email that gets a "yes" is almost always under 150 words. It has four parts, in a specific order, and it does one thing the PR brief version never does: it gives the editor a complete picture of the argument without making them dig for it.

This post breaks down each part, shows you why the order matters, and walks through three worked examples from real pitches I've sent: client names scrubbed, argument structures intact.

## Why the pitch email is a different document than the article

Founders who write good op-eds often write terrible pitch emails because they treat the pitch as a summary of the article. It is not. The pitch is an editorial proposal, not a teaser. You are answering two questions the editor is asking the moment your email lands in their inbox:

1. Is this argument worth 800 words of my outlet's opinion real estate?
2. Is this person credible enough to put in front of my readers?

If your pitch makes the editor hunt for either answer, it is already dead.

The other trap: pitching the topic instead of the argument. "I'd like to write about stablecoin regulation" is a topic. "The EU's MiCA framework will make US stablecoin issuers structurally uncompetitive by Q4 2026 unless Congress acts in the next two legislative sessions" is an argument. Editors commission arguments. They pass on topics.

## The four-part structure of a pitch that lands

**Part 1: The argument line (one sentence)**

This is the subject line and the first line of the email body, and they should say the same thing in different words. The subject line is the argument compressed into eight to twelve words. The first body sentence is the argument with one clause of context added.

A subject line that works: *DePIN can solve tech's reliance on hyperscaler infrastructure, a counterintuitive case*

A subject line that does not: *Thoughts on DePIN and the future of compute*

The second version is a topic. The first is a position. Opinion editors run 30 to 50 pitches a week across their inbox. They are scanning for the one that has something to say, not the one that says it nicely.

**Part 2: The news peg (one to two sentences)**

The news peg is your reason to move now. It connects your argument to something that already exists in the editorial conversation: a regulatory development, a market event, a recent story the outlet ran, a data point that just dropped.

CoinDesk Opinion does not require a news peg the way the news desk does. But editors at every opinion desk are still asking "why this week?" A pitch without a peg can land, but it is competing against every pitch that has one. Give them a reason to move.

The peg should be specific and verifiable. "Given recent regulatory uncertainty" fails this test. "Given the SEC's Wells notice to [named issuer] last Tuesday" passes it. One fact, one date, and the editor can place your argument in their editorial calendar.

**Part 3: The argument sketch (two to three sentences)**

This is where founders go wrong most often. They either write the whole article (too long, the editor stops reading at sentence four) or they stay vague ("I'll explore the implications of X for the industry"). Neither works.

The argument sketch should give the editor the structure without giving away the prose. Three sentences: the claim, the main evidence or mechanism, and the conclusion. If your piece has a counterargument you are going to address, flag it. Opinion editors want contested ground, not consensus.

A working example: *The claim is that on-chain compliance infrastructure can replace traditional KYC within three years for retail transactions under $10K. The mechanism is programmable compliance rules at the wallet layer, which removes the need for the centralised data collection that makes KYC expensive and breach-prone. The conclusion is that financial regulators who are framing this as a compliance vs. privacy debate are arguing about the wrong variable.*

That is 65 words. The editor now knows exactly what they are getting and whether it fits their current editorial mix.

**Part 4: The byline justification (one sentence, maximum two)**

This is the "why this founder and not anyone else" line. It is not a bio. It is a standing claim: one sentence that explains why this particular person has the standing to make this particular argument.

The credentials that matter to a CoinDesk or Decrypt opinion editor are the credentials that are directly relevant to the argument. A DePIN op-ed benefits from "co-founder of a protocol currently running X nodes across Y countries." A stablecoin regulation piece benefits from "formerly led compliance at [named institution] before founding [company]." Your Series A raise does not make you qualified to write about market microstructure. Your background as a market maker does.

One thing I always add that most pitches skip: a one-sentence proof of prior publication. "My prior bylines include [outlet] and [outlet]" takes five words and answers the editor's silent question about whether you can actually write.

## The 150-word pitch, assembled

Here is what the full structure looks like in practice. Everything under 150 words.

---

**Subject:** KYC is structurally broken for retail crypto, on-chain compliance is the fix

Hi [Editor first name],

On-chain programmable compliance can replace traditional KYC for retail transactions under $10K within three years, and the regulators debating this are focused on the wrong question.

The Senate's stablecoin bill last week reignited the compliance vs. privacy framing, but neither side is addressing the structural cost problem: centralized KYC data collection is expensive because it has to be stored and it creates breach liability. Wallet-layer compliance removes both.

My piece makes the technical case, addresses the counterargument that on-chain data is less reliable than identity docs, and closes on what a realistic three-year adoption curve looks like given current wallet penetration rates.

[Founder name] is co-founder of [Protocol], which has processed $X in on-chain transactions under programmable compliance rules since [date]. Prior bylines in Cointelegraph and Decrypt.

Happy to send the full draft.

[Name]

---

Under 150 words. Four parts. One argument. The editor can tell in 30 seconds whether this is for them.

## How the structure shifts by outlet

CoinDesk Opinion wants a contested position. The more your argument contradicts received wisdom in the space, the better your chances. Argued, institutional, referenced. If your piece agrees with everything CoinDesk has been saying all year, it is not an op-ed, it is a comment.

Cointelegraph Expert Take wants practical and technical. Their opinion section runs shorter pieces (700 to 1,000 words) and their readers are builders and traders, not policy analysts. The argument line in your pitch should be concrete and applied. Abstract takes on "the future of Web3" do not land here.

Decrypt Opinion wants the culturally fluent version of your argument. Broader register, less jargon, often with a human or consumer angle attached. If your argument only makes sense to someone running a validator node, it is probably not the right fit.

For Forbes Councils or Forbes Opinion, you generally need a warm intro or an existing Forbes contributor relationship. Cold pitches to Forbes Opinion from a crypto founder land rarely. The right approach is building the CoinDesk and Cointelegraph record first, then using that clip record when you do have a Forbes connection to activate.

## Three worked examples

**Example 1: The newsjacking pitch**

A DePIN compute protocol I work with had a technical argument about infrastructure resilience that was interesting but hard to place on its own. Then the Microsoft Azure outage hit in summer 2024, taking down airline booking systems, hospital records, and thousands of SaaS products globally.

The pitch became: "The Azure outage is the best argument DePIN has ever had: here is why centralized compute is structurally fragile and what the fix looks like." Peg: the outage, named, with the specific sectors it hit. Argument: infrastructure concentration creates correlated failure risk. Byline justification: the founder had been building decentralized compute since before "DePIN" was an acronym.

The piece placed in Decrypt. The peg gave the editor a reason to move within the news cycle. Without the peg, the same argument might have placed eventually. With it, the turnaround was days, not weeks.

**Example 2: The regulatory thesis pitch**

An RWA tokenization protocol had a founder with a background in institutional settlement infrastructure. He had a specific view about why the tokenization frameworks being proposed in the US were designed around equity settlement assumptions that did not apply to real-world assets.

The pitch led with the argument (one sentence), pegged it to a named Treasury report on tokenization published that quarter, sketched the technical case in two sentences, and closed with the founder's settlement background as the standing claim. No "I'm excited to share my thoughts." No "the space is rapidly evolving."

The piece placed in CoinDesk Opinion because the argument was genuinely contested (it contradicted the policy consensus) and the founder's standing was impossible to dispute.

**Example 3: The category-definition pitch**

Before "DePIN" was a recognized beat, a co-founder I worked with wanted to argue that decentralized physical infrastructure was a real category and not a meme. The pitch acknowledged the skepticism directly: "The counterargument is that DePIN is just rebranded IoT with a token attached. My piece explains why that is wrong and what makes the economic model structurally different."

Naming the counterargument in the pitch does two things: it signals you have thought about this seriously, and it tells the editor that the piece will have tension in it. Tension is what makes opinion journalism worth publishing. CoinDesk ran the piece. It became one of the most-cited DePIN pieces of that cycle.

## What kills a pitch before the editor reads word one

Sending to a general inbox instead of a named editor. The CoinDesk Opinion editor is not the same person as the CoinDesk news desk. Decrypt Opinion is not the same inbox as the main Decrypt tip line. Pitching the wrong desk is the single most common mistake, and it signals immediately that you did not do your homework.

Attaching a draft without being asked. Some outlets want the full draft. Most do not. Lead with the pitch. Offer to send the draft. The editor will ask if they want it.

CCing your PR firm. I pitch on behalf of founders and I never CC myself. The editor is having a conversation with the founder's voice, not with a PR operator. CC lines make pitches feel coordinated, not genuine.

Sending the same pitch to five outlets simultaneously. Opinion desks want first-run exclusivity. Pitching CoinDesk, Cointelegraph, and Decrypt with the same pitch on the same day and waiting to see who responds first is a fast way to burn three relationships at once. Pick the right outlet for the argument, pitch that one, and give them a reasonable response window before you move.

## The pitch is not the hard part

Writing the 150-word email is the easy half. The harder half is having an argument sharp enough that the four-part structure holds. Founders who cannot write the subject line in eight to twelve words without getting vague usually do not have the argument locked yet.

Start there. Get the subject line to a single contested claim. If you can do that, the rest of the pitch follows.

If you want a review of a pitch you're working on, or help developing the argument before you send it, [book a 30-min teardown](https://calendly.com/shilikajain/30min/). I'll tell you whether it's ready and what the right outlet is.
$b100$
where slug = 'op-ed-pitch-email-coindesk-cointelegraph-decrypt' and md5(body) = 'f46cc92f76ee8b3360053a81a59120b5';

update blog_posts set body = $b100$# APAC Crypto KOL Strategy: Why Your US Creator Roster Fails in Korea, Japan, and Southeast Asia

Nine of the top 20 countries in Chainalysis' 2026 Global Crypto Adoption Index are in APAC. Japan at #4, South Korea at #5, Thailand at #8, Indonesia at #14, Vietnam at #18. The retail capital in this region is enormous and structurally different from anything in the US or Europe.

And yet the single most common mistake I see from Western founders planning an APAC token launch is pulling their existing English-language KOL roster and sending the same brief. Same messaging. Same CTA structure. Same X-and-YouTube mix. Different continent.

It doesn't work. Not because the content is bad. Because the infrastructure is wrong.

I've run APAC campaigns from my time leading partnerships and PR at CoinMarketCap, and across 50+ protocols since then at Myosin and as a fractional operator. Korea, Japan, Vietnam, Singapore: each one is a separate media market with its own platform layer, its own creator hierarchy, and its own regulatory ceiling. Copy-pasting a US campaign into any of them burns budget and credibility simultaneously.

This post maps the structural differences so you stop making the $30K mistake.

---

## The frame that changes everything

Most KOL strategy assumes a simple funnel: reach a creator's audience, drive awareness, convert. That logic holds in the US and UK, where X and YouTube function as relatively unified public squares.

APAC doesn't work that way.

Each market has a primary discovery layer (often not X), a trust-validation layer (often not YouTube), and a coordination layer where actual buying decisions happen. If your campaign only hits one of those three, it surfaces and dies. The creator without a presence in the coordination layer gets ignored regardless of follower count.

I wrote about this pattern back in 2023:

> one of the biggest mistakes marketers make is using the same marketing gimmicks or strategies while trying to penetrate in different markets (demographically). If you try applying a strategy that won in the US into an Indian/Korean market, it probably won't give you any results!
>
> [Shilika Jain on X, 11 Aug 2023](https://x.com/Shilika_jain/status/1689892253274370048)

That was two years ago. The gap between English-language KOL campaigns and the reality of APAC distribution has only widened since.

---

## Korea: YouTube analysts, Naver research, KakaoTalk coordination

Korea is the market where the gap between Western KOL assumptions and local reality is most expensive.

The Korean crypto community researches on Naver, coordinates in KakaoTalk OpenChats and Telegram, and watches Korean-language YouTube. That's three distinct layers, and a global creator without a Korean-language presence doesn't exist in any of them.

**The creator tier looks like this:**

- **Top tier: YouTube analysts.** Long-form videos, typically 10 to 30 minutes, marked as sponsored, from accounts that audiences treat as researchers rather than entertainers. These drive initial conviction.
- **Mid tier: Naver bloggers and cafe operators.** This is the due-diligence layer. Korean retail searches Naver before buying. A project that doesn't appear there in Korean reads as unvetted.
- **Coordination tier: KakaoTalk OpenChat and Telegram.** This is where trading decisions happen. KakaoTalk sits on more than 90% of Korean phones, and its OpenChat groups are where retail crypto discusses live positions. Telegram is growing fast, especially among younger traders.

The press layer reinforces this. Bloomingbit (5M monthly visitors, part of the Hankyung Media Group: Korea's largest financial media conglomerate), TokenPost (2.6M), CoinNess, Blockmedia, and CoinReaders form the media backbone. Coverage in these outlets signals legitimacy to retail and to exchanges evaluating listing applications.

When I ran localisation work for clients across Korea, the lesson that came back every time: Korean reach comes from Naver-syndicated mainstream outlets plus Telegram-driven apps like CoinNess, not from translating an English press release and hoping. For the Tangem self-custody report, one data stat (two-thirds of crypto users support self-custody) travelled across English, Korean, and Japanese editions of Bloomingbit without requiring a separate pitch per market. But that required a Korean-language Bloomingbit placement in the first place, not a translated English release.

**Compliance note:** The Virtual Asset User Protection Act has been in force since July 2024. Paid promotions require disclosure language in Hangul. The Korean Fair Trade Commission's paid-promotion tag needs to appear in Korean, not transliterated. A creator brief that uses the English "AD" disclosure fails.

---

## Japan: compliance framing first, conversion later

Japan is the market that most founders underestimate on the compliance dimension and overestimate on conversion speed.

Japanese crypto KOLs will not post content that creates regulatory ambiguity. Full stop. Outlets like CryptoTimes JP and CoinPost will rewrite your pitch around JFSA implications even if you didn't include them. The creator who agrees to post something that could conflict with Financial Services Agency framing isn't a Japanese tier-1 creator. They're a creator you don't want.

The platform map in Japan is structurally different from Korea:

| Platform | Role in Japan |
|---|---|
| X (Japanese-language) | Core discovery and discourse. Anonymous analyst culture. Threads and Spaces move sentiment. |
| note.com | Long-form trust layer. Project deep-dives. The highest-leverage AI-search citation unlock per dollar. |
| LINE | Daily messaging. LINE OpenChat for closed-community amplification. |
| YouTube | Mainstream education. Slower, older audience. Strong for exchange-adjacent content. |
| Discord | NFT and gaming community home. Expected for consumer and gaming projects. |

The KOL dynamic in Japan is also different. A Japanese KOL is a trigger, not the close. They open private research. Conversion happens later, quietly, after a user has read the note.com deep-dive and the X thread. Korean retail moves as a bloc within hours. Japanese audiences lurk, validate, then act: on a longer cycle.

Japanese creator contracts require the JFTC stealth-marketing disclosure tag (PR or 広告 inside the post). Post-2026, following FIEA reclassification updates, KOLs increasingly require partner-bank or trust-stablecoin verification before signing. If your legal setup isn't in order, Japanese tier-1 creators simply won't work with you, and the fact that you can't close them tells the market something.

For APAC-wide campaigns I've run, Japan coverage meant CryptoTimes JP and BeInCrypto JP, framed around regulatory compliance and institutional legitimacy, not token upside. That framing difference is the whole game.

---

## Vietnam: YouTube and Telegram, with a community-first trust structure

Vietnam consistently ranks in the top five globally for grassroots crypto adoption. Triple-A data puts Vietnamese crypto ownership at around 31% of the population, the highest nationally-reported rate globally. This is a retail-first, high-frequency trading market where KOLs aren't commentators: they're hands-on mentors guiding users through positions, risk management, and airdrop strategies.

The platform stack:

- **YouTube:** Long-form analysis and education, some creators running channels since 2017 with 100K+ subscribers. The primary conviction-building format.
- **Telegram:** High-frequency, community-led. Large groups run by individual creators act as combined media outlets and trading rooms. Some have 50,000+ members.
- **Facebook:** Still relevant for education and community building, especially for older retail audiences and for gaming/GameFi crossover.
- **TikTok:** Growing, particularly for airdrop campaigns and token awareness with younger demographics.

The critical structural point: Vietnamese retail runs almost entirely in Vietnamese-language communities. An English-only campaign, or a campaign run through creators whose audience is primarily from other APAC markets, effectively doesn't reach them. The community has a language wall, and projects that don't cross it get a fraction of the engagement of local-voice campaigns.

The content style also differs from Korea. Vietnamese KOLs are "live trading" voices: they share real positions, real wins and losses, and audiences trust that personal exposure. A brief that asks for controlled, sanitized messaging reads as inauthentic and gets watered down or ignored. Briefing Vietnamese creators requires a looser hand than briefing Japanese ones.

For DePIN and GameFi projects, Vietnam and the broader Southeast Asian market (Thailand, Indonesia, Philippines) are the highest-volume retail audiences. If your token has gaming utility or airdrop mechanics, skipping SEA means leaving users on the table.

---

## Singapore: not a KOL market: an institutional credibility market

This is the one that surprises founders most.

Singapore is not a KOL market for crypto. The Monetary Authority of Singapore has barred Digital Payment Token Service Providers from marketing or advertising DPT services to the general public since January 2022. Permitted channels are restricted to a firm's own corporate website, its own app, and its official social media accounts. Public advertising, influencer promotions, sign-up bonuses, and referral rewards are all prohibited.

A regional KOL campaign targeting APAC audiences needs geographic controls. Any creator with significant Singapore audience overlap is a compliance risk, not an asset. The MAS imposed penalties exceeding S$12 million across enforcement actions in 2024: this isn't theoretical exposure.

What Singapore does offer: institutional credibility. Events like TOKEN2049 Singapore are the right surface for founder visibility, press relationship-building with regional journalists, and partnership conversations with exchanges that hold MAS licences. Coinbase, OKX, Crypto.com, and Upbit all operate under MAS licensing. Those conversations happen at events and over introductions, not through KOL drops.

If your APAC campaign goal includes Singapore, budget for event presence and earned press, not creator spend.

---

## The briefing differences that kill APAC campaigns

Beyond platform selection, the brief itself has to change by market. I've seen founders get the channel right and then blow the execution because the brief was written for a US creator.

**Korea:** Disclosure must be in Hangul. Korean audiences expect project-specific technical depth in YouTube content, not lifestyle framing. Briefing for a KOL campaign in Korea means providing Korean-language talking points, not English bullets that get machine-translated.

**Japan:** The brief should lead with regulatory legitimacy, then product. Japanese creators will not post a CTA that implies guaranteed returns. Anything that reads as pump-adjacent will get softened by the creator anyway, so don't write it in. Brief for analysis-first, conversion-second.

**Vietnam:** Give Vietnamese creators room to run. A tight script sounds like an ad. An open brief that explains the product mechanics and lets the creator frame it in their voice performs better. Airdrop mechanics, yield mechanics, and chain incentives are what the audience wants explained: brief to that.

**Cross-market timing:** Korea and Vietnam can run simultaneously in the week before a listing. Japan should run 7 to 10 days before, because the research cycle is longer and the community won't have read the note.com piece by day one. Don't align Japan's drop timing to Korea's.

---

## A market-by-market comparison

| Market | Primary KOL format | Key platforms | Compliance floor | Best for |
|---|---|---|---|---|
| Korea | YouTube long-form (10–30 min) | YouTube, KakaoTalk, Naver, Telegram | VAUPA + KFTC disclosure in Hangul | DeFi, DePIN, exchange listings |
| Japan | X threads + note.com deep-dives | X, note.com, LINE, YouTube | JFSA framing required; JFTC 広告 tag | Infrastructure, institutional crossover |
| Vietnam | YouTube + Telegram community | YouTube, Telegram, Facebook, TikTok | No VASP framework yet; local norms | GameFi, DePIN, airdrop campaigns |
| Singapore | Earned press + event presence | Owned channels only for crypto firms | MAS prohibition on influencer promotions | Institutional credibility, exchange relationships |

---

## What a multi-market APAC KOL wave actually looks like

For a token launch targeting Korea, Japan, and Vietnam simultaneously, the operational sequence I run:

1. **T-21 days:** Finalise Korean and Vietnamese-language creator briefs with native-speaker QA. Japanese brief goes to creators at T-21 because of the longer validation cycle.
2. **T-14 days:** Japanese note.com pieces go live. X thread campaign from Japanese accounts begins.
3. **T-7 days:** Korean YouTube analysis videos go live. Naver blog placements publish. KakaoTalk and Telegram seeding begins.
4. **T-3 days:** Vietnamese Telegram communities and YouTube drops. Facebook seeding for gaming/GameFi angles.
5. **Day 0:** Coordinated announcement across all markets. Exchange-side listing announcement timed to Korean morning (when Upbit volume peaks).

That's not a single campaign. It's four separate campaigns running on a shared narrative with market-specific executions. The English-language X campaign you ran at Series A is one input into the brief, not the template.

---

## The fake-engagement problem in APAC is real

One more thing nobody talks about enough: KOL fraud is structurally worse in some APAC markets than in the West because the ecosystem developed faster than the audit infrastructure.

Before signing any Korean or Vietnamese creator, ask for wallet-attributed referral data from campaigns in the last six months, not just view counts or subscriber numbers. Creators who can't produce campaign-level conversion data usually don't have it. Naver blog placement volume and KakaoTalk group size are both easily inflated.

For Japanese creators, the due-diligence question is different: ask for their compliance checklist. Japanese tier-1 creators who work in the post-JFSA environment have one. The ones who don't are operating below the risk threshold you actually want.

---

## What to do now

If you're planning a regional token launch or product campaign in APAC in the next 90 days and you don't have native-language creator relationships in at least Korea and Vietnam, you're already behind.

The KOL infrastructure takes 3 to 4 weeks to build properly: native-language briefs, compliance-reviewed creator contracts, on-chain attribution setup, and coordinated timing across markets. A single senior operator who has run this before is faster than an agency spinning up a new APAC desk, and cheaper than the $30K experiment that confirms what this post already told you.

[Book a 30-min teardown with Shilika](https://calendly.com/shilikajain/30min/) to map your APAC KOL strategy before the campaign brief goes out.
$b100$
where slug = 'apac-crypto-kol-strategy-korea-japan-southeast-asia' and md5(body) = '96d3fac540624a0439eff4ca4ccb8462';

update blog_posts set body = $b100$# AI Startup PR for Non-Technical Founders: How to Make Your LLM, Agent, or Infrastructure Story Land with Journalists

If you didn't study computer science and you're building an AI company, there's a specific kind of PR dread I see constantly. You know the product works. Your design partners are already paying. But when a journalist asks "what makes this technically different," your stomach drops because you're afraid anything you say will either lose them in the jargon or sound thin next to the researchers at Cohere or Together AI.

You don't need a PhD to get tier-1 coverage. You need a story architecture. That's a different skill, and it's the one I actually help founders build.

## Why "technically advanced" is not a pitch

Journalists covering AI in 2026 are not short on technically advanced products. VentureBeat, TechCrunch, Forbes, Decrypt's AI desk, AI Magazine, and The Information are all covering AI. The volume of pitches landing in their inboxes from well-funded, technically sophisticated teams is at an all-time high.

What most non-technical founders get wrong is assuming they're losing the coverage race because they can't go deep on model architecture or inference latency numbers. That's almost never why pitches fail.

Pitches fail because they lead with capability instead of consequence. A journalist covering AI doesn't care that your agent uses a fine-tuned LLM with retrieval-augmented generation. They care that a mid-sized law firm running your agent cut contract review time from four days to six hours. The architecture is the "how." The six-hour turnaround is the story.

You're not at a disadvantage as a non-technical founder. In most cases, you're better positioned to pitch the business outcome story because you came at the product from the buyer's problem, not from the model architecture. Use that.

## The translation rule I use for every AI pitch

Every technical claim in an AI pitch needs to run through a simple filter: "so what, for whom?"

"Our system uses a multi-agent orchestration layer", so what, for whom?

"Our agents can hand off complex tasks between each other without human intervention": getting closer. So what, for whom?

"An ops team of three can now handle the workload that used to require eight contractors, and we have a customer who's been doing exactly that for six months": that's the sentence that goes in the pitch.

Run every technical claim until you've landed on a named category of buyer and a before-and-after outcome. If you can't get there, the product isn't ready to pitch. If you can, the technical architecture becomes supporting detail, not the lead.

This is true regardless of whether you're pitching LLM tooling, AI agents, or infrastructure. The journalist's reader is not a model architect. They're a business leader, an investor, a curious professional. They want to know what changed and for whom.

## What journalists covering AI actually want in 2026

The outlets worth targeting break into roughly three tiers for an AI startup, and each tier wants something different.

**Forbes** (enterprise, investor, and mainstream crossover) runs AI stories when there's a business stakes angle: a named enterprise customer, a market size claim that can be independently verified, or a founder with a personal story that explains why they're the right person to build this. Forbes contributor coverage on AI agents ran throughout late 2024 and into 2025 with a consistent frame: what does agentic AI mean for how work gets done? That frame is still open.

**TechCrunch** covers AI business and policy, not just product launches. Rebecca Bellan, senior reporter at TechCrunch, covers the business, policy, and emerging trends shaping AI. An infrastructure story lands there when it connects to a policy question, a competitive dynamic, or a clear "this changes how the industry works" claim.

**VentureBeat** is organized around three primary beats: artificial intelligence and machine learning, data infrastructure and enterprise analytics, and cybersecurity. Carl Franzen covers AI and infrastructure; the DataDecisionMakers section accepts guest contributions from practitioners who can write about real deployments, not marketing. If you have a VP of Engineering from a named enterprise who'll co-author with you, that's a viable path even before you have a PR retainer.

**Decrypt's AI desk** and **AI Magazine** cover AI-meets-crypto and B2B agentic plays respectively. Both are more accessible for earlier-stage founders because the volume of competing pitches is lower and the beat reporters there are actively building their coverage area.

The lesson: match your story to the outlet's actual reader, not to the outlet's brand prestige. A $1M pre-seed AI infrastructure product probably doesn't belong in Forbes yet. It might belong in VentureBeat's DataDecisionMakers, an AI-specific Substack with 80,000 subscribers, or a trade publication for the specific vertical you're solving.

## The six-to-twelve-month foundation you can't skip

The founders who get tier-1 coverage when their Series A closes didn't start the PR work the week they signed the term sheet. They started six to twelve months earlier, building what I call the named-entity footprint: a set of credible references to the founder's name and company that a journalist can find during the five-minute background check they do before agreeing to an interview.

If a journalist searches your name and finds nothing but your LinkedIn and a Crunchbase stub, they're less likely to commit an hour to an interview. If they find a bylined piece in a vertical trade publication, two podcast appearances, a Substack quote from a credible operator in your space, and your company's own data report, the interview becomes a much easier yes.

Building that footprint doesn't require a PR agency. It requires consistency. The practical calendar for an AI startup in the six months before a funding or product announcement looks like this:

- One bylined op-ed per quarter in a relevant trade publication (vertical AI press, enterprise tech press, or the specific industry you serve)
- Two to three podcast appearances in sector-relevant shows where your ICP actually listens
- One original research or benchmark data piece that produces a statistic you own

That last point matters more than most founders realize.

## Original data: the pitch asset non-technical founders can actually own

One of the most effective PR moves for an AI startup is running a focused survey or benchmark study and publishing the findings. Not because it proves technical credibility, but because it gives journalists a stat they can lead with and can't get anywhere else.

When I worked on the Tangem self-custody report in 2026, a single headline statistic (two-thirds of crypto users support self-custody) traveled across English, Korean, Japanese, and Dutch outlets without a separate pitch per market. One stat. Multiple markets. Months of coverage from a single asset.

The same logic applies in AI. If you run a benchmark study showing how your agent performs against manual workflows, or you survey 500 enterprise buyers about their AI deployment timeline, you own data that a journalist can cite. You become the source. That's a fundamentally different relationship with the press than "company pitches reporter about its own product."

The survey doesn't need to be large. A well-designed 300 to 500 respondent study in a specific vertical is enough to produce three to five unique statistics. Each stat becomes a pitch hook. The findings become a landing page, a LinkedIn post series, a bylined piece, and the anchor claim in your funding announcement pitch.

Non-technical founders can run this playbook without a research team. There are survey tools, analyst firms that will design the methodology for a flat fee, and PR people (like me) who can turn the raw data into a press-ready report. You don't need to understand how a transformer works to understand that your buyers are blocked on AI adoption because of data governance concerns. You just need to ask them, tabulate the answer, and put a number on it.

## How to pitch without getting lost in the jargon trap

The most common mistake I see in AI startup pitch emails is the technical credibility overcorrection. The founder has been burned by journalists who asked hard technical questions, so they front-load the pitch with architecture details to prove legitimacy. The result reads like a white paper introduction and gets deleted after two sentences.

The pitch should follow this order:

1. The problem, stated in the language of the buyer (one sentence)
2. The before state (what the buyer was doing and why it was painful)
3. The after state (what changed with your product, with a specific metric or named customer)
4. Why this is happening now (what changed in the market or technology that makes this the right moment for the story)
5. Your ask (an interview, a briefing, an exclusive)

The technical architecture belongs in the second or third paragraph if it belongs anywhere in the pitch at all. For most non-technical stories, it doesn't need to appear in the pitch at all. It goes in the background material you send after the journalist says yes.

A pitch I'd write for a non-technical AI agent founder might read:

*"Procurement teams at mid-market manufacturers still spend 12 to 15 hours per week on supplier qualification: pulling data from six or seven disconnected systems, re-entering it, chasing approvals. [Company] cuts that to under two hours using an agent that connects the systems and handles the approval routing. A client in the industrial supply chain sector went from 14 days to complete a supplier audit to under 48 hours. Happy to connect you with the VP of Procurement who ran the pilot."*

No mention of LLMs, orchestration layers, or inference infrastructure. The journalist covering enterprise AI for VentureBeat knows what's under the hood. They don't need you to explain it. They need the story.

I had a version of this conversation with GAIA's co-founder Shashank Sripada when I was working on his coverage during Consensus Hong Kong in early 2025. GAIA is building decentralized AI infrastructure, which is technically dense. The coverage that landed in Decrypt and Forbes wasn't about the architecture. It was about what happens when AI knowledge systems live on-chain: the "living knowledge systems" frame gave Decrypt a headline, and the "Stripe for AI agents" analogy gave Forbes contributors a business stakes peg. Both stories came from the outcome frame, not the architecture.

> "agree w this 100%, it's a relationship game"
>
> [Shilika Jain on X, 13 Aug 2025](https://x.com/Shilika_jain/status/1955609025514778823)

The quote above was in response to a PR colleague pointing out that landing a Tier-1 placement in 30 minutes looks easy from the outside, but it's built on months or years of reporter relationship-building. You're not paying for the pitch. You're paying for the moment when the right reporter picks up the phone because they trust the source.

That's what the six-to-twelve-month foundation is actually buying you.

## The common pitfalls that kill AI startup pitches

**Pitching the category instead of the product.** "AI agents are transforming enterprise workflows" is not a pitch. It's a trend piece. Trend pieces get written by journalists, not fed to them by founders. Your pitch should be a specific product with specific customers doing a specific thing.

**The credibility-by-association trap.** "We use the same model architecture as [big lab]" does not make you a story. It makes you a footnote. Journalists cover differentiation, not similarity.

**Timing the pitch to the funding close.** By the time you sign your Series A term sheet, it's too late to start building the journalist relationship. The exclusive pitch for your announcement needs to go to a reporter who already knows who you are. If they're meeting you for the first time in the embargo email, your chances of an independent editorial story (rather than a republished press release) drop significantly.

**Treating APAC as an afterthought.** If you have any enterprise traction in Japan, Korea, Singapore, or India, there are trade reporters in those markets actively looking for AI infrastructure stories. Bloomingbit, TechCrunch Japan, and regional enterprise tech press in those markets are often easier entry points for early-stage founders than US Tier-1. Getting placed in those markets also builds the international credibility signal that US journalists notice during their background checks.

**Pitching LLM infrastructure to a reporter who covers AI consumer apps.** Beat matching is non-negotiable. A reporter covering consumer AI products doesn't want your enterprise inference optimization story. Read their last ten articles before you write the first word of the pitch.

## What the fractional model gives you that an agency doesn't

Most non-technical founders who come to me have already tried one of two things: DIY pitching (inconsistent, burns relationships, produces no footprint) or a full-service agency (expensive, runs through a junior account team that doesn't know the reporters, produces press releases instead of placements).

The fractional model is different because the senior operator who pitches for you is the same person who builds the journalist relationships, edits the op-eds, and shapes the narrative. There are no handoffs to a junior account coordinator. When I pitch a tier-1 trade reporter on a GAIA story or a Fluence op-ed, I'm doing it directly. That's what gets the reply.

For AI founders specifically, the value of having someone who's already placed stories at Forbes, Decrypt, and CoinDesk is that you're not cold-calling the reporter. You're getting a warm introduction through a PR contact they already open emails from.

> "instant gratification expectations w PR is illogical & stupid. PR works when you have a long term approach, work on building relationships, carving out the brand, sharing your story, ongoing convos w journos"
>
> [Shilika Jain on X, 26 Jul 2023](https://x.com/Shilika_jain/status/1684288075827150848)

PR isn't magic. It's a compounding asset. The founders who come to me six months before a launch with a clear ICP, a strong operator narrative, and one owned data point will always outperform the ones who show up two weeks before close asking for miracle placements.

Start the conversation now, not when you need the coverage.

---

**Book a 30-min teardown with Shilika** and get a specific action plan for your AI startup's PR: which outlets to target, what narrative needs to be built first, and what timeline is realistic. [Book here](https://calendly.com/shilikajain/30min/)
$b100$
where slug = 'ai-startup-pr-non-technical-founder-media-pitching' and md5(body) = 'e4ff12823753755de72a2867c9842108';

update blog_posts set body = $b100$# The Web3 Founder Pre-Interview Brief for Tier-1 Media

A tier-1 interview is not the time to figure out what you believe. It is the time to deliver what you already prepared. The founders who walk out of a CoinDesk, The Block, or Bloomberg session with a clean story and no regrets spent two hours the night before doing something most founders skip entirely: the brief.

This is not the full media training curriculum. That exists elsewhere. This is the document you run through the night before the call: the five things that kill tier-1 interviews, the precise language to use when the conversation goes sideways, and the two phrases that will end your relationship with a reporter faster than any bad story will.

I have run hundreds of pre-interview briefs across APAC and global campaigns, from early-stage DePIN protocols to AI infrastructure companies chasing Forbes placement. The mistakes are almost always the same ones. And almost none of them are about the content.

## The on-the-record line is not where you think it is

Most founders believe the interview starts when the journalist asks the first question. It starts the moment you and the journalist are in the same room, channel, or call. That includes the two minutes of small talk before the recording is flagged as live, the hallway after the session, and the Telegram DM you send the next morning to "clarify something."

There is no ambient off-the-record zone. If you say it to a journalist in any medium after you have been introduced as the person being interviewed, assume it is on the record.

The off-the-record designation is also not something you can declare unilaterally after the fact. It requires the journalist to agree to it before you say the thing. If you share a sensitive detail and then add "that was off the record by the way," you have given the journalist a fact they now know. Whether they publish it depends on their judgment, their outlet's editorial policy, and the relationship you have with them. You cannot retroactively invoke a rule the other party never agreed to.

The working rule: if you do not want to see it in the article, do not say it. Not as colour, not as background, not as "just between us."

Before the interview, brief yourself on three things:

- What is the single story I want this article to tell?
- What are the three facts or claims I will not give a number on because I can not fully defend them in print?
- What is the one topic I will redirect if asked?

That last one matters more in crypto than in any other sector, and it takes us directly to the second mistake.

## How to deflect a token price question without sounding evasive

A CoinDesk reporter or a Bloomberg markets journalist will ask about token price. Not always directly, but it will arrive: as "what do you think this development means for token value," or "how has the market responded," or "investors are clearly watching the price action, what's your read?"

The wrong answer is a prediction. Any price figure you put on record reads as promotion and can attract regulatory attention regardless of how it was framed. The question is not really about what to say. It is about how to redirect without looking like you are hiding something.

The pattern that works is acknowledgment plus category frame. You are not ignoring the question. You are answering the question you should have been asked.

A workable structure: "Token price reflects market sentiment at a specific moment, and that moment changes. What I can speak to is the underlying metric that actually validates whether this protocol is working: [insert your real number: active nodes, daily active developers, TVL growth rate, revenue, whatever your proof point is]. That's the signal I track."

You have answered the spirit of the question (is this real?) without speculating on price. The journalist gets a number they can use. You stay on the right side of securities-adjacent language.

What does not work: "I can't comment on price." Full stop. That reads as evasive because it is evasive. The journalist hears "the founder knows something uncomfortable about price." You have created the exact implication you were trying to avoid.

What also does not work: the philosophical detour. Three sentences about why price is the wrong metric for crypto projects, followed by a pivot to your vision. Reporters at The Block and CoinDesk have heard this speech. It does not land. It burns thirty seconds of interview time and generates zero quotable material.

Acknowledge the question. Give them a better number. Move on.

## How to correct a factual error mid-interview without creating a worse headline

This is the scenario nobody prepares for: the journalist states something as background context (about your protocol, your raise amount, your team, your category) and they have it wrong. Not opinion-wrong. Fact-wrong.

The instinct is to let it go, to not seem difficult, to not disrupt the flow of the interview. That instinct will cost you. The journalist has now incorporated a wrong premise into the story frame, and their follow-up questions will build on it. By the time the article publishes, the wrong fact is scaffolded into several paragraphs you had no chance to correct.

The correction has to happen in the moment. The framing that works is additive, not adversarial: "One thing worth getting exactly right here: [correct fact]. I want to make sure you have the precise figure because the distinction matters for the story."

You are not accusing them of being wrong. You are positioning yourself as a helpful source who cares about accuracy. That is a role reporters welcome. A factual correction offered that way almost always gets received well. The same correction delivered as "actually that's not right" tends to create friction and occasionally becomes the story.

The harder scenario is when the journalist mischaracterises a quote mid-interview: they paraphrase back to you something you said earlier in the session, but the paraphrase has shifted the meaning. Same approach: correct it immediately, additive framing. "I want to make sure I was clear: what I meant was [restatement]. Let me say that again so you have the precise version."

The version you cannot take back is the one you let stand.

## The two phrases that reliably kill a tier-1 interview

These are not dramatic. They do not generate controversies like the one that happened to Charles Hoskinson on a Block podcast earlier this year, where his mid-interview outburst over a question about his Ethereum history generated more coverage than the interview itself. They are quieter failures.

**Phrase one: "We don't comment on that."**

This is a PR agency reflex, and it has no place in a founder interview. Founders who use it at tier-1 outlets get characterised in the story as reluctant or guarded. The reporter's instinct is to write around it, which usually produces a worse result than if you had just answered. If there is a legitimate legal or regulatory reason you cannot speak to something, say so: "Legal has us constrained on that specific point until [date/milestone]." That is a real answer. "We don't comment on that" is a signal you have something to protect.

**Phrase two: "What I'd really like to talk about is..."**

This is the pivot bypass: the attempt to skip the journalist's question entirely and jump to your talking point. It works in a press conference with fifty cameras. It does not work in a one-on-one with a reporter who has done their research. The journalist notices the skip. They log it. And in my experience, they often come back to the skipped question at the end of the interview, framed harder.

The discipline is to answer the question that was asked, briefly and directly, and then bridge. Not to reroute before you arrive.

> "there are no tier 1 companies in web3, it's all tier 1 founders"
>
> [Shilika Jain on X, 30 Dec 2024](https://x.com/Shilika_jain/status/1873798962156879950)

This matters for the interview brief because a tier-1 reporter at CoinDesk or Decrypt is not primarily writing about your protocol. They are writing about you: your thesis, your credibility, your willingness to be direct about hard questions in your category. The product is evidence. You are the story.

That means "We don't comment" and "What I'd really like to talk about" both commit the same fundamental error: they signal that the founder is not actually present in the conversation.

## What the brief looks like in practice

Twenty-four hours before the interview, run through five checks:

**1. Read the journalist's last ten bylines.** Not their profile. Their actual published work in the last 60 days. What beat are they working? What is the angle that seems to interest them right now? The interview you are preparing for is a function of where they are editorially today, not what their title says.

**2. Identify your three owned proof points.** These are the three specific, defensible claims that support your narrative. Not mission statements. Not vision. Hard numbers or specific events: user count you can verify on-chain, TVL figure with a source, strategic partnership that is already announced, a specific regulatory filing. You need three. If you cannot produce three, the interview will drift to speculation.

**3. Know your two no-go zones.** Token price speculation. Any unannounced detail that would constitute material non-public information. Write these down. Practice saying "that is something we will announce formally when [milestone]" out loud until it is automatic.

**4. Prepare your misquote correction phrase.** Literally write it down. "One thing worth getting exactly right here" or "Let me make sure I was clear on that point." Practise saying it without defensiveness. The first time you use it under pressure it will feel strange. The second time it will feel like control.

**5. Decide on your one pivot.** One topic you will acknowledge and then redirect from, with a specific bridge to a proof point. Not three topics. One. Three is a politician's answer. One is a founder who knows what matters.

## After the interview ends, the record is not closed

The conversation does not close when the journalist says thank you. The follow-up email asking you to confirm a figure is still on the record. The LinkedIn message two days later where they flag they are adding context to the piece: still on the record. The off-the-cuff reply you send from your phone at 11pm: still on the record.

Send a brief post-interview note. Something like: "Good to connect. Happy to verify any figures or add context before you file, just send them over." Two sentences. This is not asking to review the article. Reporters will decline that request and you will have used up goodwill. This is positioning yourself as a helpful, accurate source. Reporters come back to helpful, accurate sources.

And when the piece runs and something is wrong (factually wrong, not just framed in a way you do not prefer) reach out the same day. Not to argue the framing. To offer the correction with evidence. A short email, professional tone, specific error, specific correct figure. Most tier-1 reporters at CoinDesk, The Block, and Bloomberg will correct a provable factual error. None of them will rewrite a frame they have already chosen.

The brief is not a guarantee of a good story. It is the removal of the self-inflicted errors that turn a neutral story into a damaging one.

---

**Book a 30-min teardown with Shilika** to run a pre-interview brief before your next tier-1 session: [calendly.com/shilikajain/30min](https://calendly.com/shilikajain/30min/)
$b100$
where slug = 'web3-founder-media-interview-brief-tier-1' and md5(body) = 'f7ab0a98f35bb20d4bb69c367e8b4386';

update blog_posts set description = $b100$Five mistakes founders make before and during a CoinDesk, The Block, or Bloomberg interview, and exactly what to say instead. Your pre-interview brief.$b100$
where slug = 'web3-founder-media-interview-brief-tier-1' and md5(description) = '8468b527755e782d075c811b5247ed56';

update blog_posts set body = $b100$# AI Startup Series A PR: How to Turn a Funding Round Into a 6-Month Category Positioning Campaign

A Series A announcement gives you roughly 48 hours of peak journalist attention. Then it disappears unless you built the campaign before the announcement hit, and wired in the content engine that runs for the 24 weeks after.

Most AI startup founders I talk to treat the Series A like a finish line: close the round, send the release, post on LinkedIn. That's the worst possible frame. The announcement is the on-ramp. Category ownership is the destination. The six months after close are when you either lock in the positioning or let it drift into noise.

This post covers the full architecture: pre-funding narrative seeding, exclusive vs. embargo decision, investor amplification mechanics, the post-announcement content pipeline, and the analyst briefing sequence that converts funding coverage into enterprise pipeline. I'll also flag where this differs from a Web3 funding playbook, because the outlets, proof requirements, and buying cycles are genuinely different.

---

## Why You Need to Start Before the Round Closes

The mistake I see repeatedly: a founder closes a $10M Series A, calls a PR operator the week before the announcement, and expects a TechCrunch exclusive. Journalists covering AI aren't cold-pitchable at T-7 days on a name they've never heard. They've been covering this category for two years. They have their trusted sources. If you're not already in those relationships, you're not getting the exclusive: you're getting a brief wire mention at best.

The pre-funding window is when narrative seeding happens. That means getting your founder voice in front of the reporters who will cover your round before they know a round is coming.

**What "narrative seeding" actually looks like:**

- A bylined op-ed in TechCrunch, Forbes, VentureBeat, or The Information, pitched 8 to 12 weeks before close, on a category-defining thesis. Not a product pitch. A genuine point of view on why the current approach to your problem is broken.
- One or two podcast appearances on shows that your target journalists actually listen to (not the biggest show: the right show for your vertical).
- LinkedIn activity from the founder at a real cadence: 3 posts per week minimum, each anchored to a specific operational insight, not general AI optimism.
- A short data piece or research note from the company blog, structured to be citable by AI assistants and searchable by enterprise buyers researching your category.

When a reporter gets your embargo pitch four weeks later, they already have context. The story writes itself faster. You get a more substantive piece, not just a "Company X raises $Ym" line item.

---

## Exclusive vs. Embargo: How to Actually Decide

There is no universal right answer, but there is a framework. For an AI startup at Series A, I default toward a single exclusive plus a simultaneous embargo to 3 to 4 other tier-1 outlets, lifted at the same moment.

**Go exclusive-only if:**

- The round is large enough ($20M+) that one outlet's coverage will pull the rest along organically within 24 hours.
- Your story has a genuinely unique angle (a named enterprise customer, a breakthrough benchmark, a founder with name recognition) that makes one outlet want to own it.
- You have an existing relationship with a specific reporter who covers your category closely.

**Go embargo with one preferred outlet if:**

- Your round is in the $5M to $15M range (competitive with dozens of other AI Series As closing every week).
- You need simultaneous coverage in multiple outlets to hit enterprise buyers, developer communities, and investor audiences at once.
- Your lead investor doesn't have the name recognition to drive organic follow-on coverage.

For the GAIA campaign I ran across late 2024 and into 2025, the approach that worked was building a steady cadence of founder interviews around a single tight narrative (decentralized AI agents, node count as proof) before any funding announcement. By the time coverage needed to run, Forbes and Decrypt already had founder context. That's the compound effect of narrative seeding.

When you go to embargo, the mechanics matter. Issue the embargo 5 to 7 days before lift. Include a factual press release, a founder quote that isn't generic ("We're thrilled" is not a quote), a lead investor quote, 3 to 5 traction metrics the reporter can verify, and an offer for a 20-minute call. Follow up at T-48h if you haven't heard back. Set a hard lift time (typically Tuesday through Thursday, 6 AM ET) and hold it.

---

## The Announcement Asset Stack

Before the release goes live, you need more than a press release. The press release is the factual anchor. What runs the campaign for the next six months are the assets built around it.

**Core announcement day:**
- Press release (800 to 1,000 words, on your newsroom, wired via Business Wire or PR Newswire for Series A+)
- Company blog post (longer, shows use of funds, roadmap, customer perspective)
- Founder LinkedIn post (personal voice, different from the official statement)
- Lead investor post (brief them two days before lift so they post within the hour)

**Week-one follow-ons:**
- A customer or design partner quote piece placed as a contributed article in a trade publication your ICP reads
- A short video from the founder, 90 seconds, on why the category matters now: distributed on X and LinkedIn
- Email to your list with the round narrative contextualized for customers, not investors

None of this is complicated. The failure mode is building none of it and spending all pre-announcement energy on the press release.

---

## The 6-Month Post-Announcement Content Pipeline

This is where most AI startup PR programs fall apart. Coverage lands on day one, the team celebrates, and the PR activity goes quiet for two months while everyone focuses on hiring. By month three, you've lost the momentum. The analyst briefings haven't happened. The follow-on op-eds never got drafted. Your category thesis is exactly where you left it on announcement day.

The post-announcement period has three phases.

**Months 1 to 2: Proof of thesis**

The round announcement said you're building something important. Months one and two are for showing you were right. This means:

- One founder op-ed placed in a tier-1 outlet, timed to a relevant news hook (a competitor's stumble, a new regulation, an industry data release). Not a product announcement. A point of view.
- Two to three podcast bookings, ideally at shows where enterprise buyers or VCs are the primary audience.
- Active newsjacking: when relevant AI news breaks, your founder is available for comment. A tier-1 trade reporter on deadline needs a smart, quotable source within 2 hours. Being that source earns relationships and coverage that no pitch ever will.

I've seen this work directly with Fluence's Tom Trowbridge: an op-ed tying the Microsoft global outage to the need for decentralized compute ran in e27 and drove more conversation than the original product coverage. Newsjacking isn't opportunism: it's demonstrating that your thesis is relevant to what's actually happening.

**Months 3 to 4: Analyst briefings**

Enterprise buyers don't make purchasing decisions on TechCrunch coverage alone. They consult Gartner, Forrester, IDC. The Series A is the credibility event that makes an analyst briefing request credible. Use it.

Start analyst outreach in month 2 so briefings land in months 3 to 4. Forrester typically schedules within 3 to 4 weeks of a request; Gartner can run 2 to 3 months out. Plan accordingly.

Briefings are free. You don't need to be a paying client to request one. What you do need: a clear articulation of what category you belong in, 3 to 5 enterprise customer references, and a crisp explanation of how you differ from whoever is already in the Magic Quadrant or Wave for your adjacent category.

A critical thing most founders miss: in 2026, the sequence has changed. Enterprise buyers increasingly run an AI search query before they open an analyst report. That means your GEO (generative engine optimization) work (being cited cleanly in ChatGPT, Perplexity, and Google AI Overviews for your category query) now happens before the analyst briefing has any effect. The two motions are complementary, not competing. But the AI visibility comes first.

**Months 5 to 6: Category consolidation**

By month five, you should have a recognizable founder voice in your category, a handful of analyst mentions, and a body of earned coverage you can point a sales prospect toward. Month five and six are for consolidating this into pipeline-generative assets.

This means:
- A co-authored or co-branded report with a respected voice in your category (an analyst firm, a trade publication research desk, or a well-known investor) that makes your thesis citable at scale.
- A speaker slot at one major industry conference (not a crypto conference if you're enterprise AI: the audiences don't overlap).
- A case study in a named outlet, sourced from a design partner or early customer, showing specific metrics.

If your enterprise sales cycle is 90 days, the coverage and analyst mentions from months 3 to 4 should be feeding inbound pipeline by month 5 to 6. That's the conversion arc you're building.

---

## How This Differs From a Web3 Funding Playbook

Worth stating explicitly because I work across both categories and the differences trip founders up.

**Proof requirements are higher for AI.** In Web3, a funding announcement with a token narrative, a notable VC name, and a community angle can run in CoinDesk or Cointelegraph without any enterprise traction. AI reporters at Forbes, The Information, and TechCrunch are asking: who are your customers, what are they paying, and what does the model actually do? Journalists covering AI in 2026 are deeply skeptical of demo-stage narratives. You need at least 3 to 5 named design partners or paying customers before you pitch tier-1 outlets.

**The outlet set is different.** For Web3 funding, you're targeting CoinDesk, Cointelegraph, Decrypt, Blockworks, The Block. For AI Series A, the primary outlets are TechCrunch, Forbes, The Information, VentureBeat, AI Magazine, and vertical trade press that your ICP actually reads (HealthTech for medical AI, FinTech Global for financial AI). The journalist relationships you need are completely different, and no Web3 specialist who doesn't have those AI beats covered will get you the coverage you need.

**Enterprise vs. community audience.** Web3 coverage builds community credibility and token holder confidence. AI Series A coverage builds enterprise buyer credibility and recruiter confidence. Different audiences require different narrative angles, different proof points, and different follow-on activity.

**Analyst relations matter more.** In Web3, there are no Gartner Magic Quadrants gating a $500K enterprise deal. In AI, there are. Skipping analyst relations for an enterprise AI startup means leaving sales velocity on the table.

---

## A Framework for Prioritizing

If I'm onboarding an AI startup founder right after Series A close, here's the sequence I run:

| Timeline | Priority |
|---|---|
| T-8 weeks (pre-close) | Narrative seeding: op-ed pitches, podcast outreach, founder LinkedIn |
| T-2 weeks | Embargo outreach to 4 to 5 target reporters, asset stack built |
| Day 0 | Embargo lift, wire distribution, investor amplification |
| Week 1 | Follow-on customer story, founder video, email to list |
| Month 1 to 2 | Op-ed placement, newsjacking, 2 to 3 podcast bookings |
| Month 2 | Analyst briefing requests submitted (Gartner, Forrester, IDC) |
| Month 3 to 4 | Analyst briefings completed, GEO audit and citation tracking |
| Month 5 to 6 | Co-authored report, conference speaker slot, customer case study |

The single biggest reason Series A PR programs fail: they stop after month one. The announcement is the on-ramp. Category ownership requires the full six-month build.

---

I work with AI founders at exactly this stage: round closed or closing, no PR infrastructure, needing to make the next six months count. If you want to map the specific outlets, reporters, and content sequence for your category, book a 30-minute teardown below.

[Book a 30-min teardown with Shilika](https://calendly.com/shilikajain/30min/)
$b100$
where slug = 'ai-startup-series-a-pr-6-month-category-campaign' and md5(body) = '8b7413c13a96c5ba05455c2764fb1ce4';

update blog_posts set body = $b100$# KOL Marketing vs Earned PR in Crypto: How to Allocate Your Communications Budget Without Wasting Both

KOL spend and earned PR answer different questions for your audience. KOLs answer "should I ape in?" Earned PR answers "is this project real?"

You need both answers in circulation. The mistake most founders make is funding only the first one.

I've watched this play out across dozens of campaigns. A project puts 70 to 80% of its communications budget into a KOL wave, gets the launch-week spike, watches the price chart react to influencer unlock schedules, and then wonders why tier-1 journalists still won't reply and why institutional allocators are cold. The KOL push did its job. The credibility layer was never built. So there's nothing for the market to hold onto after the noise fades.

This post maps what each channel actually does, where they overlap, and how to sequence the spend across three stages of a launch so neither line item is wasted.

## What KOLs Actually Buy You

KOL spend is a distribution purchase. You're buying access to an audience that is already crypto-native and already primed to act on token information. Done well, it creates attention density in a specific window.

The mechanics are fast and legible. You write a scope, sign a contract, and within two weeks posts are live. That is genuinely useful during a launch window when attention is the constraint.

But attention density is time-bounded. A KOL post has a half-life of 24 to 72 hours on X. The community moves on. If a journalist or fund analyst goes looking for third-party validation of your project two weeks after the wave, they find sponsored posts, not editorial coverage. That gap is what earns media exists to fill.

One more thing I'll say plainly: the KOL market is not clean. I'm in OTC deal chats where KOLs are asking over $500K in tokens to support a project. The real question to ask is whether they're bringing in real users and buyers, or just manufacturing the appearance of momentum.

> bc im in some of the otc deals chats w kols, and they're asking over 500k in tokens to support a project!!! the real question to ask is that are kols bringing in real users + buyers?
>
> [Shilika Jain on X, 25 Mar 2025](https://x.com/Shilika_jain/status/1904457737721024959)

At those prices, the ROI math only works if KOLs are actually converting wallets, not just impressions. Most projects never audit that distinction.

## What Earned PR Actually Buys You

Earned PR is not amplification. It's the third-party credibility signal that journalists, investors, and exchange listing teams look for when they're evaluating whether a project is worth taking seriously.

A placement in CoinDesk, The Block, or Cointelegraph does several things a KOL post cannot:

- It tells an institutional allocator that an editorial team considered the project newsworthy enough to publish
- It gives a listing application a credibility anchor
- It creates a permanent, indexed record that survives a bear market
- It generates backlinks and AI citation signals that compound over time

The thing that trips founders up is that earned PR does not "pump your token." Let me be direct about what it is and isn't.

> Earned PR ≠ Paid articles / Earned PR ≠ Won't pump your token / Earned PR ≠ Won't grow your TVL / Earned PR ≠ Doesn't guarantee coverage / Earned PR ≠ Growth Marketing
>
> [Shilika Jain on X, 19 Nov 2024](https://x.com/Shilika_jain/status/1858726846755389463)

Earned PR builds the durable credibility layer that makes the next raise easier, the next exchange listing conversation faster, and the next journalist pitch more likely to land. It works on a six-to-twelve week horizon, not a 48-hour horizon. That's the trade-off, and it's why it keeps getting deprioritized in favor of KOL spend that produces visible results faster.

## The Three-Stage Framework

Here's how I think about sequencing KOL and earned PR spend across a token launch. The job changes at each stage, and so should the allocation.

### Stage 1: Pre-TGE (T-12 weeks to T-4 weeks)

At this stage, you're building the narrative foundation. Your target audience is not retail. It's journalists who will decide whether your launch is a story, investors doing due diligence, and exchange listing teams evaluating your credibility profile.

KOLs cannot do this work. No exchange listings team is looking at a Twitter thread from a paid influencer and calling that third-party validation. Journalists are not sitting in KOL comment sections sourcing their story ideas.

**Recommended split:** 60 to 70% earned PR, 20 to 30% content infrastructure, 10% selective KOL relationship-building (no paid activation yet).

In this window, you want a media footprint that actually exists before the launch moment hits. That means op-ed placements for the founder, expert commentary on industry news, and a couple of well-placed features that establish the category your project occupies. When launch day comes and a journalist gets your press release, they should be able to search your project and find editorial coverage, not just sponsored posts.

The RARI Foundation launch I worked on followed this shape. The campaign framed Rari Chain's mainnet around a single sharp angle, protecting NFT creator royalties at the chain level, and built that narrative through editorial coverage before the launch moment. That framing is what landed placements in CoinDesk's Protocol newsletter, The Block, and Cointelegraph in the same week. KOL amplification followed the coverage; it didn't replace it.

### Stage 2: TGE Window (T-2 weeks to T+2 weeks)

This is the only stage where KOL spend earns its highest weight in the mix. You've got a live event, a specific launch date, and a community of people who want to see social proof that others are paying attention.

**Recommended split:** 50% KOL, 35% earned PR (launch-day embargo lift, exchange listing coverage), 15% paid amplification.

The earn PR work at this stage is about coordinated coverage with maximum syndication. A well-executed embargo means four to six tier-1 outlets publish within a few hours of each other on launch day. That creates the impression of a significant market event, because it is one. KOL waves can run in parallel to amplify that coverage back to crypto-native audiences.

The mistake I see is projects doing KOLs only during this window because they skipped Stage 1 entirely. They've got social noise but no editorial anchor. Journalists can tell the difference.

### Stage 3: Post-TGE Tail (T+2 weeks onward)

This stage is where most projects go completely dark, and it's the stage that determines whether you're building something durable or just executing a launch-and-dump cycle.

**Recommended split:** 70% earned PR, 20% community content, 10% KOL (selective, anchor relationships only).

After the launch window closes, KOL spend has sharply diminishing returns. You're paying for reach to an audience that already heard about you. The higher-value work is building the editorial narrative for the next chapter: TVL milestones, protocol upgrades, ecosystem partnerships, the second funding round.

Institutional investors and serious builders track what a project is publishing six months after launch. A PR retainer in this phase costs a fraction of the TGE-week KOL wave and compounds at a rate that KOL spend simply does not.

## The 70-80% KOL Problem

I said at the top that projects allocating 70 to 80% of communications spend to KOLs get a spike, then a vacuum. Let me explain the mechanism.

When KOL spend dominates the budget, two things happen simultaneously. First, the project's communication with the outside world becomes a function of paid content schedules. When the KOL contracts expire, there's nothing organic left. Second, journalists see the wall of sponsored posts and categorize the project as a promotable, not a story. Getting legitimate editorial coverage after a KOL-heavy launch is harder than doing it before, because you've already signaled what category you're in.

The vacuum is predictable. It's not bad luck. It's what happens when the only communications infrastructure you built was time-limited and commercially flagged.

> more projects need organic PR than paid kol shills & campaigns! who should explain this to founders? open to discussing the pros & cons
>
> [Shilika Jain on X, 6 Mar 2025](https://x.com/Shilika_jain/status/1897761960667795958)

## A Decision Framework for What to Spend Where

Before I split a client budget, I ask four questions:

**1. Who are you trying to convince, and on what timeline?**
Retail traders with a 24-hour horizon: KOLs. Institutional allocators or journalists with a two-week research cycle: earned PR.

**2. Do you have any news?**
Earned PR needs a hook. A funding round, a mainnet launch, a meaningful partnership, a data report, an op-ed angle. If you have no news and you try to force PR coverage, you get nowhere and it looks desperate. If you have no news, KOL awareness campaigns are the only lever available, but run them knowing they're buying time, not credibility.

**3. What does your existing coverage footprint look like?**
If you search your project name and the first three pages are sponsored content and press releases, an investor is going to price that credibility gap into their decision. Fix that before you do another KOL wave.

**4. What stage are you at?**
Early stage projects should be growth-hacking through quality partnerships, community building, and strategic influencer marketing. Mature projects should be running comprehensive earned PR strategies and viral campaigns. Those are different playbooks, not the same one.

That framework comes from something I posted in 2023 but stands up:

> Early stage startups should growth hack in following ways: quality partnerships, brand building initiatives, community building & growth, strategic paid press + content, influencer marketing. Mature startups should focus on: viral marketing campaigns, growth funnels - ads to analytics, comprehensive PR strategy through earned coverage, strategic partnerships & initiatives.
>
> [Shilika Jain on X, 28 Aug 2023](https://x.com/Shilika_jain/status/1696202115914555517)

The point isn't that KOLs are for early stage and PR is for later. It's that the weight shifts as the product and reputation mature.

## Common Pitfalls

**Buying the KOL wave without the embargo.** KOLs amplify what exists. If there's no editorial coverage to amplify, you're just buying temporary attention with nothing underneath it. The sequence is: build the PR layer first, then amplify it.

**Treating paid articles as earned PR.** This one is rampant in crypto. Sponsored placements on CoinDesk or CoinTelegraph are not the same product as earned editorial coverage, and experienced journalists and investors know the difference. Don't spend your PR budget on sponsored content and call it earned media.

**KOL fraud.** Bot-inflated engagement, zero wallet conversions, follow-for-follow networks presenting as organic audiences. If you're paying for reach, you need to be tracking wallet activations and on-chain activity, not impressions. A portfolio of 15 micro-KOLs with verified engagement will consistently outperform a single macro placement on cost-per-conversion.

**No PR retainer during the post-TGE tail.** The cheapest time to get editorial coverage is not during launch week when every other project is pitching journalists simultaneously. It's the six weeks after launch, when you actually have TVL data, user numbers, and ecosystem traction to talk about.

**Skipping APAC entirely.** KOL networks in Korea, Japan, and Vietnam operate on different platforms and through different community structures. A single English-language KOL wave does not translate. APAC PR and KOL activations need their own allocation and their own sequencing.

## What a Sensible Split Looks Like Across the Full Campaign

Here's a rough allocation table for a funded project running a full TGE campaign. Treat this as directional, not a fixed formula.

| Stage | Earned PR | KOL | Content + Paid Amplification |
|---|---|---|---|
| Pre-TGE (T-12 to T-4 weeks) | 60-70% | 10-20% | 20% |
| TGE window (T-2 to T+2 weeks) | 35% | 50% | 15% |
| Post-TGE tail (T+2 weeks onward) | 65-70% | 10% | 20-25% |

Across the full campaign, earned PR should average 50 to 60% of the communications budget. Not the 10 to 15% it typically gets when the spreadsheet is built backwards from KOL quotes.

The market shifts. KOL rates fluctuate with sentiment cycles. But editorial coverage in CoinDesk, Blockworks, or Decrypt doesn't evaporate when the bear market hits. That's the asymmetry most founders miss until they're in the bear market trying to raise a new round with nothing in their press folder except sponsored articles and KOL posts that aged out of relevance.

PR professionals are not magicians. The work compounds when it's done consistently and sequenced properly. The mistake isn't spending on KOLs. It's spending on KOLs while treating earned media as optional.

---

**Book a 30-min teardown with Shilika** to map out the right communications split for your stage and budget.
[Book here](https://calendly.com/shilikajain/30min/)
$b100$
where slug = 'kol-marketing-vs-earned-pr-crypto-budget' and md5(body) = '1aac405a02fd13a6c7e1147b1dbf1736';

update blog_posts set body = $b100$# VentureBeat, Fast Company, and Wired: A Submission Map for Web3 and AI Founders

Founders ask me this question more than almost any other: "I'm getting coverage in CoinDesk, Cointelegraph, and Decrypt. When do I graduate to mainstream tech press, and how?"

The short answer: you don't wait until you feel ready. You build the entity signal while the crypto coverage is still running, and you do it outlet by outlet, with a different approach for each publication. VentureBeat, Fast Company, and Wired each have a documented submission path. Each one is different. Most guides tell you "have a great story and build relationships," which is accurate and nearly useless. This post gives you the actual mechanics.

## Why mainstream tech press matters now, even if you're crypto-native

If you're running a Web3 or AI project and your entire press footprint lives inside crypto-native media, you have a real ceiling problem. Investors who don't read Blockworks won't know your name. Enterprise buyers who need to justify a procurement decision won't find you. And increasingly, AI assistants like Perplexity and ChatGPT draw on publications like VentureBeat and Wired when someone asks which companies are worth paying attention to in a given category. Coverage in those outlets builds entity authority in ways that even fifty CoinDesk placements can't fully replicate.

This doesn't mean abandoning your existing press relationships. Crypto-native coverage is still valuable for community trust, exchange relationships, and token-adjacent announcements. But if you're building something with enterprise potential or selling to a mainstream buyer, you need to show up in mainstream publications, and you need to start before your Series B, not during it.

## VentureBeat: the DataDecisionMakers path

VentureBeat is, practically speaking, the most accessible tier-1 tech publication for a founder who wants to place something themselves without a warm journalist relationship. The reason is DataDecisionMakers.

DataDecisionMakers is VentureBeat's community section for practitioners. It accepts unsolicited guest articles from qualified contributors. The editorial guidelines are published and specific: VentureBeat is looking for technical deep-dives on AI and machine learning, data infrastructure and enterprise analytics, and security. More granularly, they want content aimed at LLM decision-makers focused on rapid deployment and fine-tuning, AI orchestrators who build and maintain models, data infrastructure managers, and security professionals.

What that means for you practically:

- Your article needs to be from the practitioner's seat. "Here is what we built and what we learned" beats "here is the state of the market."
- No promotional content in the body. Self-promotion belongs in the one-sentence bio at the end, and a link to your company belongs there too. If a VentureBeat editor suspects vested interest, the piece won't run. If there's minor promotional material in an otherwise strong piece, they'll strip it before publishing.
- AI-written content is rejected. They check. Write it yourself or have it ghostwritten by someone who knows the difference between a practitioner piece and a content-marketing brief.
- The piece must be original to VentureBeat. Don't submit something that already ran somewhere else.

The submission form is at venturebeat.com/guest-posts. Do not send press releases, interview requests, or news tips through that form.

**The angle that works for Web3 and AI founders specifically:** lead with infrastructure. If you're building a decentralized compute network, the piece isn't about your token. It's about what enterprise AI teams get wrong when they assume centralized inference is the only path. If you're building AI agents, the article isn't a product overview. It's a practitioner-level piece on the architectural tradeoffs in agent memory and context management, drawn from what you've actually built. The GAIA team I worked with went deep on what it takes to build knowledge systems that evolve over time: that framing, grounded in real implementation, is the kind of thing VentureBeat's editors flag as worth reading.

**Realistic timeline:** submit and expect a response within two to three weeks if the piece is accepted. No response within that window usually means a pass.

## Fast Company: the Work Life submission

Fast Company is harder to slot than VentureBeat because the submission path that's open to outside contributors (Work Life) covers a different topic set than what most Web3 and AI founders naturally want to write about.

Work Life covers productivity, creativity, career development, hiring, work culture, entrepreneurship, and innovation. That's the formal brief. The editorial team wants pieces that read like journalism from an industry insider, not like a case study or brand story. They explicitly want content written by a person, not a PR department.

The submission mechanics:

- Send a complete, unpublished article of 600 to 900 words to submissions@fastcompany.com
- Do not send a pitch, an abstract, an outline, or a press release. They won't read it.
- No phone calls.
- Submissions are reviewed approximately once a week. If you don't hear back within a week, the piece wasn't selected. Following up won't change anything.

The editorial team wants writing that is lively, specific, and personal. It has to advance a conversation, not summarize one. Fast Company describes this in its own guidelines as "op-ed rather than content marketing." Draw on your experiences to support a broader argument, not to promote your company.

**How a Web3 or AI founder breaks in:** the angle has to be about the human dimension of building in a fast-moving category, not the category itself. A piece about what it's like to hire engineers who've never worked with blockchain infrastructure has a real shot. A piece about how your org structure changed when you deployed AI agents internally, and what you learned about human-AI collaboration, fits squarely in what they run. A product announcement dressed up as leadership advice does not.

Fast Company is also less receptive to pure B2B or financial services topics unless there's a clear cultural or societal angle. If your project is consumer-facing or has a genuine workforce-related dimension, that's your opening.

One more thing: Fast Company's Most Innovative Companies list is a separate, annual process. Applications typically open in late summer and close in early fall. If you're building something with a genuinely defensible "most innovative" claim in your category, apply. No PR relationship gets you onto that list. Every entry is evaluated individually by Fast Company's editorial team.

## Wired: the hardest door, the clearest rules

Wired is the outlet founders want most and prepare for least. The ambition is there. The groundwork usually isn't.

Wired does not run opinion pieces in the traditional contributed-article sense. Its pitch guidelines are explicit: reported essays are rare and breaking-news pitches are rarely accepted. What Wired wants is a narrative. A real story with characters, chronology, scenes, original reporting, and a clear reason it belongs in Wired right now.

The op-ed path technically exists via opinion@wired.com, with "Op-Ed Pitch:" in the subject line followed by your thesis. Pieces should be no longer than 1,000 words. But the bar for what Wired considers an opinion worth running is high. They want arguments that push back on prevailing tech-industry consensus, or make the case that a technology trend is misunderstood by the mainstream. "Decentralized AI is the future" is not an argument. "Centralized model providers are creating a structural dependency that will cost enterprises more than they realize by 2028, and here's the specific evidence" is closer.

For news or features, Wired's guidelines are clear: pitch a tale you're going to tell, not a topic you want to explore. Who are the characters? What's the chronology you're reconstructing? What scenes can they see? A pitch email that reads like a press release is a direct rejection.

Wired also checks whether a story has been covered elsewhere. If it has, you need to explain specifically how your version advances what's already been written.

**What this means for Web3 and AI founders:** your path to Wired is almost never a direct pitch from zero. It's building the entity authority and press history that makes a Wired editor take the email seriously. A founder with bylines in VentureBeat, a Forbes profile, and a credible institutional backstory is a fundamentally different pitch than a founder arriving cold.

## The sequencing model that actually works

This is the part most guides skip. Each outlet above works better with preparation. Here's how I think about sequencing for a Web3 or AI founder trying to break into mainstream press from a crypto-native base:

**Months 1 to 3:** Lock your narrative. Not a funding announcement, not a product feature list. A portable thesis your founder can defend across every press interaction. For GAIA, that was "decentralized AI agents as the architecture that prevents centralized model capture." Everything downstream (podcast appearances, Decrypt features, the Forbes placement) reinforced that one frame.

**Months 3 to 6:** Build the mid-tier base. Benzinga, Entrepreneur, The Information's newsletters, Forbes contributor placements, trade publications specific to your vertical. These are not consolation prizes. They are the entity graph you're building so that when a tier-1 reporter or editor Googles your name, they see a consistent narrative backed by credible external sources.

**Months 6 to 9:** DataDecisionMakers at VentureBeat, a Fast Company Work Life submission if the angle fits, and sustained outreach to Wired beat reporters (not cold-pitch, warm reporter relationship built over time).

The Fast Company and VentureBeat steps work independently of journalist relationships. You can do them yourself with the right article. Wired at the feature level requires a genuine story and usually a warm contact or an intermediary who knows the right editor.

## The pitfall that kills most attempts

Founders send the same article to three outlets. Don't do this. Each publication has a different editorial audience, a different voice, and a different definition of what makes a piece worth running. VentureBeat readers are enterprise decision-makers focused on implementation. Fast Company readers are business professionals thinking about leadership and culture. Wired readers want a story that changes how they think about technology and society. The same "thought leadership" article cannot serve all three.

The second most common mistake: confusing category excitement with editorial access. Every AI infrastructure founder thinks their space is inherently interesting to Wired. It may be. But "AI infrastructure is at an inflection point" is not a story. An infrastructure founder who has documentation of something that failed spectacularly and what it revealed about where the whole category is heading: that's a story.

## What makes a placement stick in 2026

A tier-1 placement in VentureBeat or Fast Company is no longer just a distribution event. It feeds the entity graph that AI assistants draw on when someone asks which companies or founders matter in a given category. Coverage in trusted publications builds the citation authority that makes your company show up when a Perplexity user or a Claude user asks who's worth talking to in decentralized AI, or agentic infrastructure, or whatever category you're creating.

That compounds over months, not days. Generic announcement coverage decays in 48 hours. Category-creation coverage in VentureBeat or Wired keeps signaling for much longer.

If you want a concrete read on where your current press footprint sits and what the fastest path to mainstream tech press looks like for your specific situation, I'm happy to do a 30-minute teardown.

[Book a 30-min teardown with Shilika](https://calendly.com/shilikajain/30min/)
$b100$
where slug = 'venturebeat-fast-company-wired-submission-map-web3-ai-founders' and md5(body) = '6639131fc2aa745fa395c6b5a45b2756';

update blog_posts set body = $b100$# How to Write a Founder Bio That Journalists Actually Use

The bio sitting in your press kit right now is probably killing your chances with both audiences who read it. Journalists skim it looking for one credential that lets them slot you as a source. Conference programmers scan it for proof you have a specific point of view, not a job title. And podcast hosts want to answer one question before they say yes: "will this person be interesting for 40 minutes?"

Most Web3 founder bios fail all three tests. They're either a LinkedIn-style credential list ("co-founder of X, previously at Y, board member of Z, Forbes 30 Under 30...") or they read like a company pitch deck with the founder's face attached. Neither tells the journalist what she needs to know. Neither tells the conference programmer what he needs to hear.

I've written and workshopped bios for founders across Fluence, GAIA, WalletConnect, RARI Foundation, and a dozen others. The bios that land press quotes and speaking slots share a specific structure. The ones that don't land almost always fail for the same three reasons.

---

## The job your bio is actually doing

Your bio isn't a resume. It isn't a sales page. It's a credibility shortcut.

A tier-1 trade reporter at CoinDesk has 200 emails in her inbox today. She's writing a piece on DePIN compute. She needs a source who can say something beyond the press release. When she lands on your bio, she has one question: "Is this person worth a 15-minute call?"

Your bio has to answer that in 60 words or fewer.

A conference programmer for TOKEN2049 is reviewing 400 speaker submissions. He's not building an education program. He's building a lineup that makes people want to attend. Your bio has to tell him: "This person has a non-obvious point of view and an audience that will fill seats."

Two different readers. Two different jobs. One bio template can't serve both.

This is the core mistake. Founders write one bio and paste it everywhere. A journalist-facing bio and a conference-facing bio have different structures, different emphasis, different word counts. You need both, and you need to know when to send which.

---

## The four bio formats and when to use each

**The long bio (250-300 words).** Goes on your press kit page and your speaker page. This is the one that gets lightly reused when a publication writes a profile. It has room for a founding story, a credential or two, and a human detail. Don't mistake length for license to list everything.

**The short bio (75-100 words).** This is your workhorse. It goes in pitch emails, in the speaker submission form, in podcast booking notes. A journalist will copy-paste 40-60 words of this into their piece. Write it so those 40-60 words are accurate and quotable even out of context.

**The one-liner (25-35 words).** Used in Twitter/X bios, article author tags, panel program books. One sentence. One credential. One category claim.

**The headshot brief.** Not a bio in the traditional sense, but it lives adjacent to your bio and kills more opportunities than founders realise. I'll cover it last.

---

## What goes in the journalist-facing bio

A journalist-facing bio has three components and three only:

1. What you built or led (one specific thing, not a list)
2. Why that makes you a credible source on the topic the journalist is covering
3. A single data point that proves scale

That's it. No founding story. No vision statement. No "passionate about decentralization."

When I was placing Tom Trowbridge at Fluence for DePIN coverage at CoinDesk and Decrypt, the bio that worked wasn't about Fluence's roadmap. It was about what Tom had seen at the protocol level across DePIN infrastructure projects, framed around the specific question journalists were trying to answer: does DePIN actually generate revenue, or is it just TVL theater? The bio positioned him as someone who had data on that question. The call requests came in.

For GAIA's founders, the bio that unlocked the Forbes piece framed CEO Matt Wright not as "founder of a decentralized AI platform" but as someone operating AI agent infrastructure at scale, with a node count that gave the claim teeth. The journalist had a data point she could put in the lede.

The formula, plainly stated: **[Name] [verb] [specific thing] at [company], where [credentialing phrase that connects to the journalist's story topic]. [One number that proves it.]**

"Tom Trowbridge co-founded Fluence, a DePIN compute network that connects 3,000+ independent data centers for cloud-alternative workloads."

That's a journalist bio. Not a company bio with Tom's name in it.

---

## What goes in the conference-facing bio

Conference programmers are reading for argument, not achievement. They want to know what position the speaker will defend on stage.

> Value addition >>>>> Fancy titles or bio's
>
> [Shilika Jain on X, 13 Apr 2022](https://x.com/Shilika_jain/status/1514176891707527171)

I wrote that five years ago and it's still the sharpest way I know to say this. Conference programmers have seen every credential. They're not shortlisting you because you're a co-founder. They're shortlisting you because you have something to say that the other 399 applicants don't.

Your conference bio should do this:

1. One sentence: your current role + company (the credential)
2. One sentence: the specific claim you'll make on stage or defend in the panel
3. One sentence: the proof that you've done the work behind the claim (published op-ed, protocol you built, specific dataset you hold)

That's 3 sentences. Not 3 paragraphs.

"[Name] is co-founder of [X], a [category] protocol with [number] in [metric]. She has argued publicly that [specific contestable claim] and will defend that position at [event name]. Her op-ed on this topic ran in CoinDesk in [month]."

The linked prior talk or published piece is not optional. Programmers for TOKEN2049, Consensus, and ETHDenver all want evidence you can hold an argument under live pressure. A YouTube link to a 10-minute panel is worth more than three paragraphs of bio.

---

## The one-liner: hardest format, most used

Your one-liner will be copy-pasted into more places than any other version: article bylines, Twitter bios, the caption on the stage photo that 400 people will see. It has to work as a standalone credential claim.

The failure mode is vagueness: "Building the future of decentralized AI." The success mode is specificity with a category claim: "Co-founder at GAIA, building decentralized AI agent infrastructure. 400K+ nodes."

One trick I use with founders: write the one-liner as if a journalist had to describe you in 25 words for a roundup. Would those 25 words make a reader want to click on your name? If not, rewrite.

---

## The headshot brief

Your headshot is doing PR work before your bio gets read. A blurry photo from a conference after-party, a pixelated crop from a group shot, or a hyper-produced corporate head-and-shoulders against a white wall all send signals before the journalist opens the bio.

For press kit headshots, what you want:
- Minimum 1600px square, JPEG, clean background
- Shot that reads well at 80x80px (thumbnail in article bylines) and at 400x400px (profile feature)
- No logo watermarks on the photo itself
- A version in color and a version that works in black-and-white for print

For conference submissions, the headshot often goes live on the event website two months before the event. It's the face on the promotional artwork. Every senior person reviewing your submission sees it. "Professional" isn't the bar. "Recognizable and consistent with your online presence" is.

Keep one canonical headshot across your press kit, your conference submission folder, your LinkedIn, and your X profile. Inconsistency makes you look like a different person on each platform, which is a small friction that adds up when a programmer is Googling you at 11pm.

---

## The three most common bio mistakes in Web3

**Listing protocols instead of outcomes.** "Previously at Polygon, Starknet, and Ethereum Foundation" is a list of logos, not a credential. What did you do there? What did you ship? What can you say on the record about what you learned?

**Writing the company bio with your name in it.** This is the most common error I see in press kits. The bio reads: "Jane co-founded XYZ Protocol, which is building the leading infrastructure for [category]." That's not Jane's bio. That's the company boilerplate with Jane's name attached. Journalists can see the difference in one sentence. The bio has to be about Jane's point of view, not about the company's positioning.

**Burying the credential.** A surprising number of founders hide the most citable fact in the fourth sentence. A journalist's eyes stop reading after sentence two if nothing has caught her attention. If your credential is "built the first DePIN compute marketplace with real revenue," that goes first. Not last.

---

## Building the asset library

A bio that works doesn't exist in isolation. It lives alongside a short quote, a headshot, a link to a prior talk or op-ed, and a two-sentence pitch on what you can comment on.

I build this as a single-page press asset doc for every founder I work with. Four sections: long bio, short bio, one-liner, and a "comment topics" list. The comment topics list is three to five specific questions the founder can answer on the record. When I pitch a journalist on an expert commentary placement, I send the short bio plus two comment topics. The journalist can see instantly whether this source is useful for her piece.

> most projects think that PR is asking a media to publish an article about their company
> what it actually is - creating a storyline, working on the messaging & narrative, pitching to targeted journalists, reaching out to them with well-curated pitches, following up & more!
>
> [Shilika Jain on X, 13 Apr 2023](https://x.com/Shilika_jain/status/1646381477620482054)

The bio is the narrative's anchor. Everything else in a pitch, a speaker submission, or a media kit flows from the credibility that bio either establishes or doesn't. Get that anchor wrong, and the rest of the packet doesn't matter.

---

## What good looks like: side-by-side

Most bios I see for the first time in a new client engagement look like this:

**Before:** "Jane Doe is the co-founder and CEO of XYZ Protocol, a groundbreaking blockchain infrastructure platform revolutionizing the way developers build decentralized applications. With 10+ years in tech, Jane previously worked at multiple leading companies in the fintech and crypto space. She is a thought leader in Web3 and a frequent speaker at major industry events."

Zero credentials a journalist can use. Zero argument a conference programmer can shortlist. Every sentence is either vague or a product pitch.

**After:** "Jane Doe co-built XYZ Protocol's fee-sharing infrastructure, now processing $40M in monthly developer payouts across 12 L2 networks. Before XYZ, she led developer relations at [Named Protocol] for three years. She writes on protocol revenue models for CoinDesk."

Four times fewer words. Four times more useful. A journalist writing about L2 economics has a source. A conference programmer knows exactly what Jane will argue on stage.

The rewrite takes 20 minutes. The placement opportunities it unlocks can take years off your PR timeline.

---

If you want a bio review, I run a 30-minute teardown call where we work through your current assets (bio, pitch doc, headshot brief) and identify exactly what's blocking placement. No deck. No proposal. Just the work.

[Book a 30-min teardown with Shilika](https://calendly.com/shilikajain/30min/)
$b100$
where slug = 'founder-bio-journalists-conference-programmers' and md5(body) = 'b269f562cc3edc66bff7e952ec9e829c';

update blog_posts set body = $b100$# Web3 PR Beyond Singapore: How to Earn Media in Vietnam, Indonesia, and Thailand

Most Web3 PR strategies for Southeast Asia are really Singapore strategies. A Forbes Asia mention, a Cointelegraph piece, maybe a slot at TOKEN2049. That covers the English-language gatekeepers and the expat crypto crowd. It does not touch the 17 million Vietnamese holders, the 22-plus million Indonesian crypto accounts, or the 56,000-plus Thai community following Bitcoin Addict Thailand on X.

These three markets are not smaller versions of Singapore. They each have a distinct local media stack, distinct regulatory sensitivities right now, and distinct community behaviors that determine whether your pitch lands or dies in an inbox. A Singapore-only playbook misses all three.

I've spent six years running APAC PR campaigns, including earlier as APAC Lead at CoinMarketCap and now leading APAC PR and Partnerships at Myosin. I've placed projects across Korean, Japanese, Vietnamese, and Chinese-language media. The lesson that keeps repeating: local language is the credential.

I said it bluntly on X a few weeks back:

> hate companies who do geo based pay v/s talent based pay!!! south east asia is one of the greatest hub for talent

> [Shilika Jain on X, 10 Sep 2026](https://x.com/Shilika_jain/status/2098075980065911133)

The same logic applies to PR. Southeast Asia is not a cost-reduced market. It is a high-velocity market with its own information architecture. Treat it accordingly.

## Why 2026 Is the Right Moment for This Expansion

The regulatory calendar has created a set of live news hooks that do not come around often.

Vietnam passed its Law on Digital Technology Industry in June 2025, which took effect on January 1, 2026, formally bringing crypto assets under government oversight for the first time. The government's first regulated crypto market pilot started accepting exchange license applications in January 2026, with five companies reportedly clearing the first qualification stage by early Q2. Vietnam's deputy Finance Minister publicly targeted Q3 2026 for the first official activity in the regulated market.

That is not background context. That is a news cycle. Any protocol with a genuine Vietnam story (local users, a Vietnamese team member, a liquidity integration with an emerging licensed exchange) has a real editorial reason to pitch local Vietnamese media right now.

Indonesia's story is equally strong. As of July 2026, Indonesian crypto accounts had reached 22.93 million, according to OJK data, with transaction volumes hitting IDR 171 trillion across the first seven months of the year. Regulatory oversight transferred from the commodity regulator Bappebti to the financial services authority OJK in early 2025, a structural shift that makes Indonesia's crypto market look increasingly like a conventional financial market to the press outlets that cover it.

Thailand just approved rules for spot Bitcoin and Ether ETFs on the Stock Exchange of Thailand, effective October 16, 2026. That is the biggest crypto regulatory development Thailand has seen in years, and local media is hungry for expert commentary on what it means for projects operating under the Thai SEC's licensed exchange framework.

Three markets. Three live regulatory stories. Three separate press ecosystems to understand before you pitch any of them.

## Vietnam: The Venture-Media Complex

Vietnam's crypto media landscape is not organized like Western markets. The dominant model is what analysts call a venture-media complex: media and VC money merge into one funnel.

Coin68 and its parent ecosystem are central to this. Blogtienao, founded in Ho Chi Minh City in 2017, is one of the top three crypto media outlets by website traffic in Vietnam alongside Coin98 Insights and Coin68. IVY Group partners with over 50 KOLs and independent outlets including Blogtienao, effectively operating as Vietnam's only structured crypto media consortium.

What that means for your pitch: in Vietnam, you are not just pitching a journalist. You are pitching an entity that may have investment interests, KOL relationships, and community management arms all connected. That is not necessarily bad. It means the path to coverage is often through relationship-first engagement rather than cold pitching.

A few practical points:

- **Pitch in Vietnamese.** Not a machine-translated brief. A proper Vietnamese-language pitch written by someone who actually reads Coin68. Google Translate pitches get spotted immediately and kill credibility.
- **Telegram is the primary crypto community channel**, not Zalo. Zalo skews toward stock investors and faces government surveillance concerns that make the crypto community wary.
- **KOLs carry more weight than editorial coverage** for retail reach. Vietnam's crypto community makes decisions through community proof: 76% of Vietnamese crypto holders report making decisions based on recommendations from friends or community figures, according to Kyros Ventures research. A respected local voice endorsing your project moves more than a Coin98 write-up without community follow-through.
- **Facebook groups are not outdated in Vietnam.** The crypto conversation lives disproportionately on Facebook and Telegram. English-only campaigns routed through X and Discord miss most of the market.

The regulatory moment also creates a specific editorial angle for Vietnam right now. Projects that can speak to compliance, licensed exchange integration, or what the five-year pilot means for their category will get editorial traction that pure product pitches won't. Local editors want stories that connect global protocols to the domestic regulatory moment.

One thing to hold in your head: Vietnam's OG community is skeptical of hype. Post-2022, users are more focused on fundamentals and faster to call out red flags publicly. IVY Group's editorial standards reportedly include prohibiting writers from covering tokens they hold. Credibility is earned by showing up consistently, not by buying a placement.

## Indonesia: The Exchange-Anchored Ecosystem

Indonesia's media landscape runs on a different logic. Rather than venture-media complexes, it operates through exchange-anchored ecosystems: exchanges and large infrastructure players fund media, own local brands, and shape information flow from investment through to listing.

Coinvestasi is the reference outlet. It describes itself as reaching 4 million-plus users monthly and operates as the media arm of Indonesia Crypto Network (ICN), which also runs the CoinDesk Indonesia license and the Coinfest Asia event franchise. If you are pitching Indonesia, you are very likely pitching Coinvestasi at some point.

Cryptonews.co.id (running as cryptonews.co.id in local URLs) and BeInCrypto Indonesia round out the tier-1 local media stack. BeInCrypto runs a proper Indonesian-language editorial team, not a translation feed, so it operates with some editorial independence from the exchange ecosystem.

Practical considerations:

- **Content must be in Bahasa Indonesia** for anything targeting retail crypto investors. English coverage gets syndicated but does not drive the community engagement that converts to users.
- **The regulatory angle is OJK, not Bappebti.** Supervision transferred to OJK in January 2025, moving crypto under the same regulatory roof as banks and securities. Pitches that reference Bappebti as the current authority signal that you haven't done your homework.
- **Coinfest Asia** is Indonesia's largest Web3 conference, run by ICN. If you're planning a regional event presence, this is the anchor event in market. Media presence there is earned through Coinvestasi relationships.
- **RWA tokenization is a live editorial beat** in Indonesia right now. The Project Wira report estimated an $88 billion market potential for asset tokenization in the country. If your project touches RWA, Indonesia is a priority pitch market, not an afterthought.

The exchange-anchored media model also means that sponsored content is more normalized here than in Japan or South Korea. That is not a shortcut to earned coverage: it is a different budget line that sits alongside earned outreach. Don't conflate the two. A paid placement in Coinvestasi does not mean you've built editorial credibility; it means you've bought a placement.

Indonesia also has a scale difference that founders underestimate. With a population exceeding 280 million, 185 million internet users, and a crypto user base that has doubled within two years, this is not a niche market you cover with a single Indonesian-language press release. It needs a sustained presence.

## Thailand: The SEC-Shaped Story

Thailand's press environment sits between Vietnam's community-driven model and Indonesia's exchange-anchored one. It is more institutionally influenced than Vietnam, but the media is not as concentrated around exchange ecosystems as Indonesia.

Bitcoin Addict Thailand is the reference outlet and community hub. It describes itself as Thailand's largest crypto media group and community, with a following of over 56,000 on X and a network that reportedly manages around 90% of all KOLs in Thailand. It also runs the largest ICO and trading community through Telegram and Facebook. Bitcoin Addict's parent organization holds SEC-licensed digital asset fund management credentials in Thailand, which gives it an institutional positioning that most regional crypto media outlets don't have.

The Thai media landscape is also shaped by Bitkub, the country's dominant licensed exchange. Unlike in Vietnam or Indonesia, Thailand's SEC has been comparatively explicit about licensing: exchanges that operated without licenses (including major global names) were shut down under the amended Digital Asset Business Act effective April 2025.

What that regulatory strictness means for your PR:

- **Compliance framing is not optional in Thailand.** Coverage that doesn't address Thai SEC licensing, or worse, implies your project is accessible to retail Thai users through an unlicensed route, will not run on reputable Thai media. Thai editors are not trying to get their publication shut down.
- **Thai-first messaging wins.** Regional brand language that feels "imported" consistently underperforms with Thai audiences. This applies to the editorial tone, not just translation. Locally natural phrasing, Thai-first messaging, and locally positioned spokespeople matter.
- **LINE is the consumer channel.** Thai users' primary messaging app is LINE, not WhatsApp or Telegram (though Telegram is used in the crypto community). Event announcements, community updates, and secondary distribution often run through LINE channels that require specific local access.
- **The ETF news hook is live right now.** Thailand's SEC finalized rules for spot Bitcoin and Ether ETFs on October 8, 2026, taking effect October 16. Any project with an institutional or asset-management angle has a live editorial hook to pitch Bitcoin Addict and Thai financial media simultaneously.

## The Three-Country Sequencing Framework

Running Vietnam, Indonesia, and Thailand simultaneously without three separate agency retainers is possible, but it requires a specific sequencing logic rather than a simultaneous blast.

The framework I use is: regulatory hook first, then media placement, then KOL amplification.

**Step 1: Identify your regulatory hook per market.**
Each of the three markets has a live regulatory story. Vietnam's first licensed exchange launch, Indonesia's OJK transition and RWA wave, Thailand's new ETF framework. Your pitch does not need to be about regulation, but it needs to connect to the regulation narrative in that market to earn editorial real estate. A DeFi protocol can comment on what licensed exchanges mean for on-chain liquidity. An infrastructure play can tie to what OJK's regulatory sandbox means for interoperability.

**Step 2: Translate for intent, not words.**
This sounds obvious and gets skipped constantly. Machine-translated pitches are caught immediately. Each market pitch should be written by someone who reads the target outlet. For Vietnam, that means Coin68 and Blogtienao. For Indonesia, Coinvestasi. For Thailand, Bitcoin Addict. The framing changes by market. A restaking story is a yield story in Vietnam, a security infrastructure story in Indonesia, and a compliance story in Thailand.

**Step 3: KOLs amplify, they don't replace.**
Local KOLs in all three markets are more influential than editorial coverage for retail reach. But credibility flows from editorial to KOL, not the other way around. A KOL amplifying a Coinvestasi article carries different weight than a KOL posting without any supporting coverage. Run them in sequence: editorial first, then KOL amplification within 48 hours of the article going live.

**Step 4: Time your three-country push across four weeks, not one.**
Launching all three markets in the same week means you can't react to how each piece performs. Week one: Vietnam (highest adoption, most community-reactive). Week two: Indonesia (highest user count, exchange-anchored follow-on). Week three: Thailand (institutional angle, SEC-compliant framing). Week four: cross-market syndication and KOL follow-through across all three.

## What a Singapore-Only Strategy Costs You

The existing SERP for Southeast Asia Web3 PR is full of agency lists and generic "localize your content" advice. None of it tells you that Vietnam's media is a venture-media complex, that Indonesia just transferred regulatory oversight to OJK, or that Bitcoin Addict Thailand holds an SEC license.

Those details are the difference between a pitch that lands and one that marks you as a foreign project that didn't bother to understand the market.

I've run APAC localization across Korea, Japan, China, and Vietnam for clients including work through Myosin and prior campaigns where a single owned data report traveled into Korean, Japanese, and Vietnamese editions without a separate pitch per market. The core lesson from those campaigns: one regional narrative with three local execution layers beats three regional campaigns every time. You don't need three retainers. You need one operator who actually reads the outlets.

That is what a fractional APAC PR engagement covers. If you're planning a Southeast Asia push in the next 90 days and want to map out which markets hit first and which press angles have the best chance of landing, book a call.

---

[Book a 30-min teardown with Shilika](https://calendly.com/shilikajain/30min/)
$b100$
where slug = 'web3-pr-southeast-asia-vietnam-indonesia-thailand' and md5(body) = '144cfb4c10beb3bb2e81b0e53e473bce';

update blog_posts set description = $b100$A founder's guide to earning media in Vietnam, Indonesia, and Thailand: three distinct press ecosystems that a Singapore-only PR strategy misses entirely.$b100$
where slug = 'web3-pr-southeast-asia-vietnam-indonesia-thailand' and md5(description) = '1543c77a022df25136a03bb6b613ad82';

update blog_posts set body = $b100$# AI Hallucination Crisis PR: The 72-Hour Playbook

Your AI product generated a confident, publicly visible wrong answer. Someone screenshotted it. It's on X. A journalist just emailed asking for comment.

This is not a data breach. There's no personal data at risk, no regulatory clock ticking, and no immediate legal liability. But in terms of narrative damage, it can hit harder, because the story writes itself: "AI company's AI doesn't work." The irony is too clean. Journalists don't need to exaggerate. The screenshot does the work.

I've run PR for AI and Web3 founders through a range of crises. The hallucination scenario is uniquely dangerous because founders misread it as a technical problem when it's a communications problem with a very short window. What you say in the first 6 hours determines whether this is a two-day story or a two-week story.

## Why AI product errors are a different kind of crisis

A normal product bug is either invisible to the user or visibly broken. An AI hallucination is a third thing: it's wrong with total confidence. The model doesn't stutter. It doesn't say "I'm not sure." It produces a clean, authoritative wrong answer that looks indistinguishable from a correct one.

That's what makes it screenshot-worthy. The wrongness is funny, or alarming, or damning, depending on your product category. If your AI is in healthcare or legal or finance, "confident and wrong" is not a PR nuisance. It's an existential question about whether the product should exist.

<cite index="2-1">A Syracuse University study published in January 2026 tested crisis statements across scapegoating, excuse, and apology scenarios with AI disclosure as a variable, and found that AI-sourced messages produced lower perceived organizational credibility and higher perceptions of injustice than the same messages attributed to a human source.$b100$
where slug = 'ai-hallucination-crisis-pr-72-hour-playbook' and md5(body) = '7278265b86c42482ae11a55ed3087411';

update blog_posts set body = $b100$# The Cybersecurity Founder Thought Leadership Stack

Most cybersecurity founders treat thought leadership as a single tactic: write one op-ed when a reporter calls, submit one conference talk on a whim, record one podcast episode when a friend asks. Then wonder why nobody knows their name six months later.

Category authority in security doesn't come from a single hit. It comes from a coordinated stack of bylines, conference speaking, podcast appearances, and LinkedIn content that compounds over 12 months. Each surface reinforces the others. A Dark Reading column gives you a credibility signal when you pitch an RSA session. An RSA slot gives you a hook when you pitch a podcast. The podcast episode gives you content for LinkedIn. LinkedIn content warms the next byline pitch. The loop closes, then repeats.

I've been helping a cybersecurity x blockchain team get initial coverage for their protocol and technology, and the challenge is always the same: too much product thinking, not enough positioning work done in public before the launch window opens. This post maps the full 12-month calendar so you can stop doing one-off tactics and start running a program.

## The Four Surfaces and Why You Need All of Them

Before the calendar, understand what each surface does:

**Dark Reading and SC Media bylines** reach the practitioner audience: CISOs, security architects, and DevSecOps leads who buy tools and recommend vendors. A byline in Dark Reading isn't marketing copy. It's the credential that makes the next PR pitch land faster.

**RSA Conference and Black Hat speaking** reach the community of communities. RSA is where enterprise buyers congregate. Black Hat is where researchers and technically-minded security professionals go. Speaking at either signals that your thinking passed peer review, which is worth more than a sponsored session or a booth.

**Security practitioner podcasts** reach the commuter audience: practitioners who consume content while traveling, training, or otherwise away from a screen. SC Media's Security Weekly network, the SANS Cyber Leaders podcast, and similar shows deliver engaged, niche audiences that trade publications can't replicate.

**LinkedIn content** is the connective tissue. It's where journalists see what you're saying between placements, where conference program chairs find speaker candidates, and where potential customers form an opinion before they ever visit your site.

The mistake most founders make is treating these as separate activities. They're not. One core idea, published across all four surfaces in a single quarter, does more than four separate ideas published once each across four separate years.

## The 12-Month Calendar

### Q4 (October to December): Build the Foundation

This is planning season. It's also RSA Conference CFP season, which most founders miss entirely.

**October (deadline-critical):** The RSA Conference 2027 CFP closed October 15, 2026. If you missed it, note it for next year: the CFP opens in mid-summer and closes in mid-October, with speaker notifications in January. Last year, more than 2,900 proposals went in front of over 80 program committee members. Over half of the speakers selected were new to RSAC. That statistic matters: RSAC isn't a closed club. Your proposal needs a clear argument, a non-vendor angle, and data or case study evidence behind it.

Black Hat Asia 2027 CFP for Briefings closes October 20, 2026, with notifications by January 5, 2027. Black Hat USA 2027 runs July 31 to August 5 at Mandalay Bay in Las Vegas: its CFP typically opens in November and closes in January. Set a calendar reminder now.

**November:** Build your topic inventory. Your 12-month thought leadership program needs 3 to 4 core ideas, not 12. The ideas should reflect genuine research, operational experience, or a contrarian position on a trend. Each idea will get published across multiple surfaces. You're not producing new ideas every month; you're publishing the same ideas in different formats to different audiences.

**December:** Write your first Dark Reading submission. Dark Reading takes contributed Commentary in three formats: Opinion, Tech Talk (how-to), and Ask the Expert (Q&A). Tech Talk and Ask the Expert pieces should be 700 to 800 words. Opinion pieces run up to 1,000 words. Submit to darkreadingsubmissions@informa.com as plain text pasted into the email body, not as an attachment. They do not publish AI-generated content and they will know if you try. Allow three weeks for a response.

### Q1 (January to March): Get on Stage

Conference speaking season starts with RSA notifications arriving in January. If you submitted in October and got accepted, this is when prep begins.

**January:** If your RSA CFP was accepted, draft your session. Track sessions at RSA run 50 minutes including Q&A, in either solo or panel format. If you submitted a panel, confirm your co-speakers now. The program committee watches for first-time speakers who drop commitments close to the show.

If you weren't accepted at RSA, pivot to satellite events. RSA week in San Francisco runs dozens of side events, partner briefings, and adjacent gatherings where speaking slots are easier to secure. A strong session at an RSAC side event in front of 80 practitioners often delivers more business value than the main stage in front of 40,000 attendees you can't filter.

**February:** Your first Dark Reading byline should be live or close. Use the publication to warm your Black Hat USA submission in March. Black Hat's review board looks for original, unpublished research. If your Dark Reading piece introduces a concept, the Black Hat submission goes deeper: technical breakdown, tooling, data. The byline is the public abstract; the Black Hat session is the proof.

**March:** Black Hat Asia 2027 runs March 2-3 at Marina Bay Sands, Singapore. If you're APAC-positioned, this is a tier-1 stage. The APAC security community is different from the US one: more government and critical infrastructure representation, different threat model conversations. A Black Hat Asia slot gives you regional credibility that a Las Vegas session can't replicate.

### Q2 (April to June): Podcast Season and RSA Week

**April:** RSA Conference 2027 is April 5-8 in San Francisco. Whether you're speaking or attending, book podcast interviews to publish in the surrounding two weeks. Security show hosts record live at RSAC and fill their editorial calendars around the conference. SC Media runs CyberRisk TV live from the venue. Pitch two to three shows targeting an interview window of April 1-15.

The pre-RSA window (two to three weeks out) is one of the best podcast pitch windows of the year. Hosts are looking for guests with a perspective on conference themes. You don't need to be a speaker to get a podcast slot around RSAC: you need a clear opinion on a topic the host's audience cares about.

**May:** Write your second Dark Reading piece. The best cadence for Dark Reading is one submission per quarter. More than that and you risk appearing repetitive; less and the editorial relationship doesn't develop. Use Q2's piece to newsjack a trend that emerged from RSA week. Commentary tied to a recent industry conversation gets faster responses from the editorial team.

**June:** Black Hat USA CFP typically closes in late January for the August show. If you submitted in January, notifications come in late March or early April. By June, you should be in session prep. The Black Hat review board favors submissions with original research, new tooling, vulnerability disclosures, or white papers attached. If your submission is purely narrative, it's competing against researchers with technical proof of work.

### Q3 (July to September): Black Hat Week and Content Flush

**July/August:** Black Hat USA 2027 runs July 31 to August 5 at Mandalay Bay. If you're speaking, record your session video for LinkedIn in the week before. Dark Reading's News Desk runs live from the floor: it's a media window comparable to RSAC. Pitch a briefing or interview slot with the Dark Reading team even if you're not a speaker. Their editorial team schedules on-floor conversations weeks in advance.

If you're not speaking, attend anyway. The networking value of Black Hat's Business Hall and Arsenal is significant for early-stage security founders. More important: use the week to pitch your Q4 Dark Reading piece. Conference season gives you a natural hook. "What I saw at Black Hat and why it changes how we think about X" is an editorial angle editors accept.

**September:** Your podcast cadence should be two to three appearances per quarter by now. SC Media's Founder Stories is a direct-to-audience format worth targeting for cybersecurity startup founders. SANS Cyber Leaders covers practitioners. Security Weekly (now part of SC Media) covers technical topics for the practitioner audience. Each show has a different audience profile: don't pitch the same angle to all three.

### Q4 (Year Two): Compound the Stack

By October of year two, you have a track record: two to three Dark Reading bylines, one to two conference credits, six to nine podcast appearances, and a LinkedIn content trail. That's the credibility stack that makes the next RSA CFP submission a warm pitch rather than a cold one.

## The Repurposing Framework

One idea, four surfaces, one quarter:

1. **Dark Reading commentary (700-800 words)**: introduce the argument, practitioner-focused, no product mentions
2. **RSA or Black Hat CFP abstract (300 words)**: same argument, framed as a session with data backing
3. **Podcast talking points (3 to 5 bullets)**: same argument, conversational, with one counterintuitive takeaway for the host
4. **LinkedIn thread (5 to 8 posts over 2 weeks)**: same argument, serialized, with engagement bait at the end of each post

The LinkedIn thread runs first, two weeks before the Dark Reading piece goes live. It warms your audience and gives you engagement data. If one angle in the thread gets strong responses, that's the angle you lead with in the Dark Reading submission.

## The Pitfalls That Kill Cybersecurity Thought Leadership Programs

**Vendor-washing your bylines.** Dark Reading's editorial guidelines are explicit: no product pitches, even indirect ones. A column about "why zero-trust matters" that conveniently supports your product category will get rejected. Write about the problem your customers face, not the solution you sell.

**Missing the CFP windows.** RSA CFP closes in mid-October for an April conference. That's a six-month lead time. Black Hat USA's CFP closes in January for an August show. These are not forgiving deadlines. Build CFP submissions into your October and November calendar as fixed commitments, not aspirational goals.

**Confusing activity with strategy.** One podcast appearance, one byline, and one conference submission in a year is activity. A coordinated program where each surface feeds the others is strategy. The compounding only happens when you run all four surfaces simultaneously.

**Skipping LinkedIn because it feels beneath you.** Security founders who post consistently on LinkedIn don't just build audiences: they signal to journalists, program chairs, and podcast hosts that they have something to say. Dark Reading's editorial team reads LinkedIn. RSA program committee members are on LinkedIn. Your next podcast host is on LinkedIn. The platform is distribution infrastructure, not a vanity metric.

## The Founder With a Cybersecurity x Blockchain Company

The challenge is sharper when your company sits at an intersection: cybersecurity and blockchain, security and AI, or any other compound category. You're pitching to two editorial communities with different vocabularies and different trust signals.

At Dark Reading, the blockchain context is background. The security argument is the foreground. At Decrypt or a crypto-native outlet, it's reversed. Running both simultaneously means two sets of talking points, two sets of media relationships, and two LinkedIn content tracks. It's doable. I'm working through exactly this with a security protocol team right now.

The principle holds regardless of the compound: map your audience, assign a surface, build the calendar, and don't skip the CFP windows.

---

**Book a 30-min teardown with Shilika**: we'll map your thought leadership calendar, identify which surface to lead with, and figure out which CFP you should be submitting to right now.

[Book here](https://calendly.com/shilikajain/30min/)
$b100$
where slug = 'cybersecurity-founder-thought-leadership-12-month-calendar' and md5(body) = '4dca8bd4e478d656744c325e7617ac8b';

update blog_posts set body = $b100$# The AI Startup Stealth-to-Launch PR Timeline: What to Do in Each of the 12 Weeks Before You Go Public

Most AI founders treat PR like a launch-day switch. They build for 18 months, then spend two weeks trying to get TechCrunch on the phone. It doesn't work. The 12 weeks before you go public are where the campaign is won or lost, and I've watched too many well-funded teams waste them.

What follows is the week-by-week playbook I run for AI founders. Not phases. Not vague principles. The actual work, in order, with the founder deliverables called out so you know exactly what I need from you and when.

The goal by launch day: 4 to 6 committed stories from tier-1 outlets, not a press release and a hope.

---

## Why 12 weeks, not 4

If you're inside four weeks of launch, you're already too late for tier-1 earned coverage. A journalist at Forbes, TechCrunch, or The Information needs time to run down sources, test your demo, brief their editor, and write a story that isn't just a reformat of your press release. That takes two to three weeks minimum from first contact. Which means you need the relationship in place before you ever send the pitch.

Twelve weeks gives you four things that a last-minute sprint can't manufacture: a founder editorial trail that gives a journalist context before you pitch them; a working demo that doesn't embarrass you; customer or design-partner quotes that you own; and an embargo sequence with enough committed outlets that launch day generates compounding noise rather than one story.

The AI press landscape adds one more wrinkle. Coverage in Forbes, TechCrunch, VentureBeat, and Decrypt's AI desk feeds directly into whether you appear in ChatGPT or Perplexity when an investor or enterprise buyer researches your category. If you're not in those AI-generated summaries, you effectively don't exist to a meaningful slice of your buyer pool. That's a PR problem that takes weeks to solve, not days.

---

## The 12-week map at a glance

| Window | Focus | Primary owner |
|---|---|---|
| Weeks 12–10 | Narrative, positioning, journalist list | PR operator |
| Weeks 9–7 | Founder editorial presence, podcast seeding | Founder + PR operator |
| Weeks 6–5 | Demo prep, customer proof, analyst briefings | Product + PR operator |
| Week 4 | Op-ed placed, community seeding begins | PR operator + ghostwriter |
| Week 3 | First embargo pitches, exclusives offered | PR operator |
| Week 2 | Embargo locks confirmed, asset distribution | PR operator |
| Week 1 | Final rehearsal, T-72h checks, team briefing | PR operator |
| Launch day | Embargo lifts, social amplification, secondary wave | PR operator + founder |

---

## Weeks 12–10: Narrative and journalist mapping

Nothing else matters until you've answered one question: what category does your product own?

Not what it does. What it replaces, why that replacement matters now, and why your team is the only one who can do it. That's the category frame. Everything in the next 11 weeks gets built on top of it.

I spend the first two weeks here. Category positioning doc. A one-sentence contrarian thesis that a journalist can put in a headline. Three talking points that prove the thesis. A list of what you're explicitly *not* (this is usually more useful than what you are).

The journalist list comes next. For an AI startup, the relevant desk reporters at Forbes Tech Council, TechCrunch AI, VentureBeat, The Information, AI Magazine, Decrypt's AI desk, and Wired. Mapped by beat, recent coverage, and angle affinity. Not a generic list of 200 names. Fifteen to twenty reporters who would genuinely care about this specific story.

**Founder deliverable this window:** A 30-minute working session to stress-test the category frame. You've been inside the product too long to see it the way a journalist will.

---

## Weeks 9–7: Building the founder's editorial trail

A journalist who receives your pitch at week 3 will immediately Google you. If they find nothing, the pitch lands differently than if they find a Forbes Tech Council piece, three substantive X threads on the AI problem you're solving, and a podcast appearance from six weeks ago. The editorial trail does not need to exist before you launched. It needs to exist before you pitch.

Weeks 9 through 7 are where I build it.

Back in 2024, when I was running founder profiling for GAIA's CEO and COO, the approach was a steady cadence of founder interviews around one narrative, decentralized AI agents and node count as proof, that compounded into tier-1 pickup at Forbes and Decrypt. The same principle applies here. You don't need volume. You need consistency around a single thesis.

Concretely: one op-ed or byline placed in a relevant trade outlet (AI Magazine, VentureBeat, a sector-specific Substack with real readership). Two to three podcast bookings confirmed, with at least one publishing before launch week. An active founder voice on X and LinkedIn commenting on category-level news, not just your own product updates.

One thing I've said publicly about launch timing still holds:

> wanna activate PR for a major launch/announcement? here's a quick strategy:
> - Create active thought leadership 1-2 month before the launch
> - Secure 1-2 podcasts/interviews 1 month before the launch
> - AMA - 15 days before the launch
> - Embargo press outreach: week before the launch
>
> [Shilika Jain on X, 11 Oct 2024](https://x.com/Shilika_jain/status/1844810665459884246)

The sequencing still works. The AI-specific version adds analyst briefings at week 6 and a demo proof requirement at week 5 that general startup PR skips.

**Founder deliverable this window:** Draft the op-ed. I'll shape and place it, but the first draft needs to come from you. Generic ghostwriting without your specific technical insight doesn't pass editorial review at the outlets that matter.

---

## Weeks 6–5: Demo proof, customer quotes, analyst briefings

This window is where most AI startups fall down.

By week 5, you need a demo that runs in under eight minutes from cold start to visible outcome. The input should be something a journalist will recognize as real. The output should be on screen and screenshot-able. You should be able to explain what the product is doing at each step without jargon. A customer or design partner should be available to speak to a reporter independently.

If your demo isn't there yet, this is the moment to know that, not launch week.

Customer quotes are non-negotiable. Two to three customers or design partners who will go on record with specific, non-generic claims. "We reduced X by 40%" beats "the product is really impressive" every time. I collect these, draft them for the customers to approve, and get sign-off before the embargo pitches go out.

Analyst briefings are the AI-specific move that most startup PR playbooks skip. Gartner, Forrester, IDC, and smaller specialist firms like Moor Insights or Cambrian AI Research all keep coverage notes on AI infrastructure and vertical AI categories. A 30-minute analyst briefing at T-40 days doesn't generate immediate press coverage, but it does two things: it sharpens your narrative before you pitch journalists (analysts will tell you directly what's weak), and it seeds the category conversation that journalists will reference when they do their own analyst calls.

For enterprise-facing AI products, analyst credibility can also feed directly into the buyer diligence cycle. Skip it if you're pure consumer. Prioritize it if you're selling into healthcare, legal, fintech, or security.

**Founder deliverable this window:** Complete the demo to the standard above. Schedule and run analyst briefings yourself; analysts want founder access, not PR-filtered access.

---

## Week 4: Op-ed live, community seeding starts

By T-28, the op-ed should be live and indexed. This is the piece that pre-sets the category frame before any journalist receives a pitch. It should be in the outlet a tier-1 reporter would see or respect, not on your own blog.

Community seeding starts here too. For AI startups, the relevant communities are specific: Hacker News, relevant Discord and Slack communities, AI-focused subreddits, developer forums if your product has an API. The goal isn't promotion: it's a trail of authentic engagement that a reporter can find when they're digging your background.

If you have a waitlist, this week is also when the drip sequence gets written. Pre-launch email subscribers who get a substantive, non-spammy update two weeks before launch become amplifiers on launch day. A 5,000-person engaged list outperforms a 50,000-person cold list every time.

---

## Week 3: First embargo pitches, exclusive sequencing

This is the most operationally specific week in the entire timeline. Get it wrong and you lose your shot at the tier-1 placements you spent 10 weeks building toward.

I pitch the top two or three tier-1 reporters first. Exclusive offers go to one reporter at a time, in priority order, with a 48-hour decision window. If the first reporter declines, the exclusive moves to the next. Only after the exclusive is placed do I pitch the remaining outlets under standard embargo terms.

The embargo pitch is a short, specific email. Category claim, evidence (metric or customer name), demo access, available date for a founder call, embargo lift time. It's not the press release. The press release comes later. The embargo pitch is the hook that earns the reporter's attention.

Two things AI founders get wrong at this stage:

First, they pitch too many outlets simultaneously and create an exclusivity problem. A reporter who discovers you offered the "exclusive" to four others will drop the story. The exclusivity offer has to be real.

Second, they go dark after pitching. A reporter who can't get five minutes on the phone with the founder will produce a softer story or no story. When a reporter responds to the embargo pitch, I get the founder on a call within 24 hours. No exceptions.

**Founder deliverable this window:** Be available for media calls on one hour's notice. Block the calendar.

---

## Week 2: Embargo locks and asset distribution

By T-14, I want four to six embargo confirmations in writing. "Confirmed" means the reporter has accepted the embargo time, their editor is aware, and fact-check questions are in flight. Verbal interest doesn't count as a confirmed story.

The press release gets finalized and locked this week. Not the generic boilerplate version: a version with the customer quotes, the specific metric claims, and the one sentence that a journalist could use as a lede. Short quotes from the founder. No "we are excited to announce" language anywhere.

Asset distribution to confirmed reporters: high-res product screenshots, logo files, demo video link, a press kit URL, approved customer contact details for independent quotes.

If you have a wire release scheduled (optional for AI startups: see my post on the wire service trap), it goes under review this week but doesn't publish until launch day.

---

## Week 1: The T-72h rehearsal

Seventy-two hours before embargo lift, I run a final check on every confirmed story. Are the reporters still on track? Have any editorial priorities shifted? Is the embargo time confirmed down to the hour and timezone? Has any reporter broken ranks and published early?

This is also when I brief the full team: founders, co-founders, investors, design partners. Everyone who will be amplifying on launch day gets the timeline, the approved talking points, and explicit instructions on what *not* to say before the embargo lifts. One loose tweet from an excited team member has destroyed more than one well-run campaign.

The founder's launch day X thread gets drafted and reviewed this week. So does the LinkedIn post. Social copy that reads like a marketing announcement gets ignored. Social copy that reads like a founder talking directly to their community gets shared.

---

## Launch day: compounding, not hoping

When embargo lifts (typically between 6am and 9am ET on a Tuesday, Wednesday, or Thursday) the stories should already be written. Your job is amplification, not creation.

The sequence: founder thread on X goes live. Lead investor amplifies. Confirmed design partners and customers post their own takes (you briefed them in week 2). The wire release publishes (if you're using one). Secondary pitches go to tier-2 and vertical trade outlets who weren't in the embargo.

For AI startups, this window is also when you push for AI search visibility. The launch day content (your post, your site update, your press release) should be structured for GEO: clear declarative sentences, citable claims, no marketing fluff. The tier-1 coverage that runs today will become what ChatGPT and Perplexity cite when someone asks about your category tomorrow.

Days 2 through 14 post-launch: follow-on feature pitches to outlets who ran wire coverage but didn't run a feature. Podcast appearances pre-booked to publish in this window. Regional syndication for APAC, India, or MENA if relevant.

---

## The scenarios that change the playbook

**Pre-seed or seed, no customers yet.** Compress analyst briefings, lean harder on design-partner quotes rather than full customer case studies. The op-ed matters more here because it's often the only third-party signal of founder credibility. Target trade and developer-focused outlets (VentureBeat, The New Stack, Hacker News front page) over broad tech press.

**Series A, enterprise-facing.** Analyst briefings are mandatory. The exclusive pitch goes to The Information or Bloomberg first, not TechCrunch. Customer proof needs to be on-record with named companies, not anonymized "Fortune 500" references.

**AI-native product with a consumer angle.** Decrypt's AI desk, Wired, Fast Company, and niche AI newsletters (Latent Space, The Rundown) carry more weight with your buyer than Forbes or TechCrunch. Build the outlet list accordingly.

**Coming out of stealth with a simultaneous funding announcement.** The funding story and the product story are two different pitches, often to two different reporters. Don't conflate them. The funding exclusive goes to one reporter on the business desk. The product story goes to a separate reporter on the AI or product beat.

---

## What you actually need to run this

Twelve weeks. A founder who will commit 30 to 45 minutes per week to deliverables. A demo that works. Two or three customers willing to go on record.

That's it. The rest is execution.

If you're inside 12 weeks from your launch date right now, book a 30-minute call and I'll tell you exactly where you are on this timeline and what to prioritize given the time you have left.

[Book a 30-min teardown with Shilika](https://calendly.com/shilikajain/30min/)
$b100$
where slug = 'ai-startup-stealth-to-launch-pr-timeline-12-weeks' and md5(body) = '2b1836aed50c4498f08cf006d5757895';

update blog_posts set body = $b100$# AI Founder Thought Leadership: Build a POV That LLMs Cite

The single biggest irony in AI startup PR right now: the founders most eager to establish thought leadership are producing content that LLM answer engines are trained to skip. If your op-eds sound like a GPT-4 draft, Perplexity has no reason to cite you over the next person who wrote the same thing. You're not a source. You're noise.

A sharp, defensible point of view is the only antidote. This post explains how to develop one, and then how to operationalize it across bylines, podcasts, and X so that ChatGPT, Perplexity, and Google's AI Overviews start reaching for you when they're constructing answers.

## Why Generic AI Thought Leadership Gets Ignored

I put this question to myself after spending months on founder profiling campaigns: what actually gets cited by AI answer engines, versus what gets produced and promptly buried?

The answer is uncomfortable. Most founder content fails on three dimensions simultaneously.

First, it's uncredentialed. A hot take from a founder without external validation is just another LinkedIn post. LLMs weight multi-source consensus, meaning the same claim needs to appear across your site, trade media, podcast transcripts, and community threads before it registers as citable. A single blog post on your own domain doesn't move that needle.

Second, it's too vague. Vague claims don't get quoted: by journalists or by machines. "AI is transforming how enterprises operate" is not a citable claim. "Enterprise AI deployments that skip the data-governance layer fail within 18 months because the compliance cost arrives faster than the productivity gain" is. Specificity gives LLMs something to extract.

Third, the structure fights the reader. AI systems extract information in roughly 40-60 word chunks. They pull from the first 30% of a page disproportionately. If your most citable claim is buried in paragraph eight, Perplexity never gets there.

I noticed this same pattern when I observed the gap between the coverage we earned and the coverage that failed to get traction. The difference was almost never quality of product. It was almost always sharpness of POV and how that POV was packaged for extraction.

## What a Citable Founder POV Actually Looks Like

A citable POV has three ingredients: it contains a specific, falsifiable claim; it has a named mechanism that explains why the claim is true; and it can be stated in under 60 words.

Test yours against that. "Decentralized AI agents will outperform centralized models for latency-sensitive applications by 2027, because edge inference eliminates the round-trip to centralized inference infrastructure" is citable. "The future of AI is decentralized" is not.

The frameworks I've seen compound best across media tend to have these shapes:

- **The counter-consensus take.** You disagree with the dominant industry assumption and can back it up with data from your own deployments. Yann LeCun has built an entire public identity around disagreeing with LLM orthodoxy. You don't need his platform -- you need his posture.
- **The proprietary dataset.** Original numbers that don't exist anywhere else. When we ran the GAIA founder profiling campaign, the metric that kept getting pulled into coverage was 400,000+ nodes. It was verifiable, it was specific, and nobody else had it. One original data point will do more for your citation rate than ten polished essays.
- **The named framework.** If you have a process or a mental model with a name, that name becomes the entity LLMs can attach to you. "The Stripe for AI agents" is a framework. "We simplify AI payments" is a category description nobody will cite.

The mechanism matters as much as the claim. LLMs reward specificity and penalize generality. If you can't say why your claim is true in the next sentence, it's not a claim -- it's a sentiment.

## The AI Loop Problem and How It Kills Founder Credibility

I said this publicly in June 2026 and it keeps being true:

> we are in an AI loop, here's what's happening:
> - back then, we used to write creative content without AI
> - then all of us saw the potential of AI, and started using AI to write content
> - now brands need folks that could write old-school original content without using AI
> creativity is literally f now due to excessive use of AI
>
> [Shilika Jain on X, 19 Jun 2026](https://x.com/Shilika_jain/status/2067877945834914101)

The loop is especially acute for AI founders. You're building with AI, you're writing with AI, and you're producing content that is indistinguishable from any other AI founder's content. Journalists and LLMs alike are trained on this stuff. They can smell it.

The fix is not to stop using AI tools. It's to use them on outputs that start with your proprietary inputs: your deployment data, your friction observations from customer conversations, your actual contrarian read on where the category is wrong. Feed the model something only you have. That's what makes the output yours.

## Operationalizing the POV: The Three Surfaces That Actually Move Citation Rates

Building a POV in isolation doesn't work. The citation signal LLMs look for is multi-source consensus: the same claim, attributed to the same founder, appearing across independent domains. Three surfaces are non-negotiable.

**Trade bylines.** A single Forbes or Decrypt placement does more for your LLM citation rate than a hundred LinkedIn posts, because LLMs weight domain authority. The placement also generates a durable URL on a high-trust domain that crawlers return to. For AI founders specifically, the outlets worth prioritizing are Forbes, TechCrunch's AI desk, The Information, Decrypt's AI coverage, and AI Magazine. A byline in one of those, anchored to your specific framework, is the highest-leverage single action you can take. The pitch needs to center your proprietary data or your counter-consensus claim -- not your product launch.

**Podcasts.** Podcast transcripts are indexed. They create another independent domain where your claim appears. And because podcasts are conversational, your claim often gets stated in a more compressed, quotable form than you'd write in an op-ed. When I ran founder profiling for GAIA's Matt Wright and Shashank Sripada, the podcast cadence across shows like Rug Radio, Web3 with Sam Kamani, and Crypto Coin Show produced a steady stream of indexed audio content that reinforced the core narrative (decentralized AI agents, 400K nodes, living knowledge systems) across multiple independent sources. That multi-source pattern is exactly what LLMs reward.

**X, used as a citation-generating engine.** Most founders use X to broadcast. The founders who get cited use it to make claims. There's a difference. A thread that opens with a falsifiable assertion ("here's why centralized AI inference loses to edge inference at anything under 100ms latency, with numbers from our deployments") gives LLMs something to pull. A thread that opens with "excited to announce" gives them nothing. Your X posts also seed your email list, brief journalists before a pitch, and prime interview hosts. Think of X as the first draft of your POV, not the output.

## Formatting for Extraction: The Structural Rules

Your content can contain a brilliant original insight and still go uncited if it's structured wrong. AI systems don't read posts front to back the way a patient human does. They scan for extractable units.

Four structural rules that matter:

**Answer first.** The direct answer to the implied question goes in the first 40-60 words after your H2 heading, not after three paragraphs of setup. If your section is titled "Why enterprise AI deployments fail," the first sentence after the heading should state the reason. LLMs pull from the first 30% of a page at disproportionately high rates.

**Self-contained sections.** Each H2 should be citable on its own, without context from the rest of the post. LLMs extract individual sections. If your section requires the reader to have read the three sections before it, it won't get cited in isolation.

**Named entities throughout.** Mention specific companies, specific tools, specific researchers, specific numbers. Named entities give LLMs confidence that the content is factual and verifiable. Generic claims get skipped.

**Fresh timestamps.** Perplexity cites pages under 30 days old at significantly higher rates than older content. This doesn't mean rewriting everything constantly, but it does mean updating your cornerstone content quarterly with new data and refreshed examples.

## The Compounding Stack: How Tier-1 Coverage and LLM Citations Reinforce Each Other

There's a flywheel that most founders don't see until it's already spinning.

A tier-1 placement (Forbes, CoinDesk, Decrypt) creates a high-authority URL. That URL gets crawled. When someone asks Perplexity "who are the leading voices on decentralized AI," Perplexity is more likely to surface the Forbes piece than your own blog, because Forbes has the domain authority signal. But the Forbes piece cites you, links to you, and quotes your framework by name. That's when the citation lands on you as the entity, not just on Forbes as the domain.

This is why byline placement strategy matters more than publication frequency. One byline in Decrypt's AI coverage with your named framework, backed by a proprietary data point, will drive more LLM citation authority than twelve generic LinkedIn articles. The goal is not content volume. The goal is citation node density: enough independent, high-authority mentions of your specific claim that LLMs build a stable entity association between your name and your idea.

The GAIA campaign illustrated this cleanly. The coverage wasn't about GAIA the product. The coverage was about a specific claim (decentralized AI agents operating as living knowledge systems, with 400K nodes as proof) attached to specific names. Each new outlet that picked up the story added another node to the citation graph. By the time the Crypto Coin Show episode went live, Perplexity already had the narrative locked to the founders' names from the Forbes and Decrypt placements.

## What Pre-Seed vs Series A Founders Should Prioritize

If you're pre-seed, you don't have the domain authority for a Forbes byline yet, and that's fine. Your job at this stage is to build the claim, name the framework, and get it indexed across medium-authority domains: industry newsletters, podcast transcripts, community forums, and your own blog with proper schema markup. Reddit threads and Hacker News comments where you make your specific claim in a non-promotional way also carry weight with LLMs, because those platforms are heavily indexed.

If you're Series A or beyond, you have proof: customer deployments, usage numbers, comparative data against the prior state. That's when you should be pushing tier-1 bylines, because you now have the data to anchor a falsifiable claim. A Series A founder with deployment data can walk into a pitch to a Forbes or TechCrunch contributor with something a pre-seed founder can't: "here's what we observed at scale, and it contradicts the consensus view." That's a story. Unsupported counter-consensus is just contrarianism.

## The Prompt Audit You Should Run This Week

Before you write another word of content, open ChatGPT, Perplexity, and Google's AI Mode. Type the query your ideal customer is asking when they have your problem. Not your company name -- the problem statement. See who appears. See which claims get cited. See which frameworks get named.

That audit tells you three things: where your category's citation graph is concentrated right now, which claims are already owned by competitors, and where the gaps are. Your POV should target a gap, not reinforce a crowded claim.

Then run the same prompts with your name and company name. If you don't appear, you know what to build. If you do appear, you know what's working and can double down.

The founders who are getting cited by LLMs in 2026 are not the ones with the most content. They're the ones with the most citable claims, distributed across the most independent high-authority domains, formatted for extraction. That's a PR problem as much as a content problem. And it's solvable.

---

If you want to audit your current thought leadership footprint and build a citation strategy that actually compounds, book a 30-min teardown with me.

[Book a 30-min teardown with Shilika](https://calendly.com/shilikajain/30min/)
$b100$
where slug = 'ai-founder-thought-leadership-llm-citations-2026' and md5(body) = 'fee118c0a706ac0e37d9a916fb8296ef';

update blog_posts set body = $b100$# Embargo, Exclusive, Briefing: Which One to Use Before Every Announcement

Three tools. Founders conflate them constantly. Journalists notice every time.

I've run PR for 50+ protocols and watched the same mistake repeat itself across funding rounds, mainnet launches, and TGEs: a founder or their agency pitches a journalist and calls something an "exclusive" that they're also sending to 12 other outlets. Or they slap "EMBARGO" on a routine partnership update and wonder why their open rates crater. Or they brief a reporter on background, then expect the reporter not to use any of it.

Each of those mistakes signals to a journalist that you don't understand how media works. And in a space as small as crypto, where the Cointelegraph beat reporter and the Blockworks editor know each other, that signal travels.

Before you plan any announcement, you need to know what each of these three tactics actually is, when to use it, and what happens when you get it wrong.

## What an Embargo Actually Is

An embargo is a timing agreement. You share news with multiple journalists before the public release date, under the explicit condition that nothing gets published until a pre-agreed date and time. That's the whole mechanism. No legal enforcement. No binding contract. Pure professional trust.

The original use case was government and academic disclosure. A research journal would brief health reporters a week before publication so they could produce accurate coverage rather than scrambling for 30 minutes on a complex paper. The crypto industry borrowed the format but frequently abandoned the underlying logic.

The problem DL News editors documented publicly before the outlet closed in 2026 was that crypto PR had turned embargoes into a hype lever. Teams would embargo routine announcements, blast 30 outlets simultaneously, then chase those same journalists with follow-ups three days before lift. Editors began treating embargoed crypto pitches as a signal that the news wasn't strong enough to stand on its own.

An embargo is appropriate when:
- The news is complex enough that a reporter needs 48 to 96 hours to prepare an accurate story
- You want simultaneous coverage across multiple outlets, because the announcement has market or community implications
- The story is genuinely significant: a funding round, mainnet launch, protocol upgrade with tokenomics impact, or TGE timing

An embargo is not appropriate for: minor partnership announcements, ecosystem grant updates, product UX improvements, or anything a reporter can write accurately in 20 minutes from a press release.

The consent sequence matters more than almost anything else. Get explicit written agreement from each journalist before sending embargoed materials. Do not assume silence equals agreement. A journalist who receives embargoed materials without consenting is under no professional obligation to hold them.

## What an Exclusive Actually Is

An exclusive is a different category of trade entirely.

You offer one journalist or one outlet the sole right to break the story first. Nobody else gets the news before that piece publishes. In exchange, you typically get more editorial space, a better angle, and a deeper relationship with that reporter going forward.

The key distinction: an exclusive does not necessarily carry a publication timestamp. You're not coordinating a lift time across a list of outlets. The outlet decides when to run it, usually in coordination with you, but the timing is their call.

When I see my clients positioning a $5M seed round, an exclusive with the right tier-2 trade reporter consistently outperforms a wide embargo blast. The piece runs longer, the reporter has more context, and the relationship built through that interaction pays dividends on the next announcement. For a $5M round, a 600-word CoinDesk brief from an embargo blast is less valuable than a 1,200-word Decrypt feature from an exclusive.

An exclusive is appropriate when:
- The news is mid-tier, strong enough for one good piece but not broad enough to warrant simultaneous multi-outlet coverage
- You're seeking a substantial feature rather than a news brief
- Your relationship with a specific journalist is established enough to make the trade credible
- You're targeting a specific outlet's audience and want editorial depth

One risk founders consistently underestimate: if the reporter passes after you've briefed them exclusively, you've often burned your news window. You can't immediately pivot to a wide embargo without telling the next journalist they're a fallback. That conversation is awkward. It also reduces your leverage. The exclusive offer only works if you're genuinely comfortable with that outlet having it alone.

I watch founders call something an exclusive when they're also sending it to a dozen other contacts. Reporters compare notes. When they find out, they never tell you they've stopped reading your pitches. The damage accumulates quietly.

## What a Background Briefing Is

A briefing is not a pitch. It's a different mode of communication with a journalist entirely.

When you go on background, you're providing a reporter with information they can use to inform their coverage, but they cannot attribute it to you by name. They might write "a source familiar with the matter" or "a protocol founder speaking on condition of anonymity." The content is publishable. Your identity isn't.

Deep background is stricter: the reporter can use the information but cannot attribute it to any source at all. They write it as if it's their own analysis.

Off the record is the most restrictive: nothing from the conversation can appear in print. The reporter hears it for situational awareness only.

Founders in crypto often misuse background briefings in two directions. Some think going on background means nothing they say can ever appear anywhere. It can. The other mistake is treating a casual conversation with a journalist at a conference as an on-the-record interview, then being surprised when quotes appear.

Background briefings are appropriate when:
- You want to help a journalist understand a complex technical situation without being quoted on a specific detail
- You're managing a crisis and need a reporter to have accurate context before they publish
- You're seeding a narrative you want a journalist to develop independently
- Regulatory or legal constraints prevent you from making a formal statement

The rule: agree on terms before you say anything. "Can we go on background for this part?" must come before the sentence that follows it. Retroactive off-the-record requests don't bind journalists. Many will decline them if the information is newsworthy.

## The Decision Framework

Before any announcement, run through this sequence:

**Question 1: How many outlets do I need to cover this simultaneously?**

If the answer is more than one, an exclusive is off the table. You're running an embargo.

If the answer is one, an exclusive is probably the stronger move.

**Question 2: Is this news complex enough that a reporter genuinely needs prep time?**

If yes, an embargo makes sense. The 48-to-96-hour window lets them conduct interviews, verify data, and write something accurate.

If no, consider whether you need an embargo at all. Routine news can go out as an immediate-release press release plus direct outreach.

**Question 3: What is the announcement category?**

| Announcement type | Recommended tactic |
|---|---|
| Major funding round ($20M+) | Wide embargo, 4 to 6 tier-1 outlets |
| Seed round ($3M to $8M) | Exclusive with one relevant trade reporter |
| Mainnet launch with market implications | Tiered embargo: one tier-1 gets 24h head start, wider list publishes at T-zero |
| Token launch (TGE) | Wide embargo coordinated across crypto and financial press, often 72h window |
| Protocol upgrade, governance vote | Background briefing for key reporters, no embargo |
| Partnership announcement (major) | Exclusive or narrow embargo (2 to 3 outlets) |
| Minor product update | Immediate release, no embargo needed |
| Crisis response | Background briefing first, on-record statement to follow |

**Question 4: How established is my relationship with the reporter?**

An exclusive only works if the reporter trusts that you're actually offering them something unique. If you've burned three journalists in the past year by calling non-exclusives "exclusives," nobody will take your exclusive offers seriously.

A wide embargo only works if you have the journalist relationships to manage consent across that list. Blasting embargoed materials to a cold list of 30 reporters is not an embargo strategy. It's a press release with extra steps, and reporters treat it exactly that way.

## The Risks Worth Taking Seriously

**Breaking an embargo** is not an awkward moment. It's a relationship-ending event. A journalist who holds your embargo and then watches a competing outlet publish 12 hours early will not work with you again. They'll tell their editor. Their editor will tell other editors. The crypto journalism community is genuinely small: beat reporters at Cointelegraph, The Block, Blockworks, and CoinDesk all know each other.

The moment you discover a breach (whether from a careless VC tweet, a community Discord leak, or a competing outlet) the only correct move is to immediately email every embargoed journalist and tell them the embargo is broken. Let them publish now. The reporters who held the embargo need to be protected. Trying to hold the line after a breach punishes the journalists who honored the agreement.

**Burning an exclusive** has a different damage profile. The story doesn't necessarily leak early. But if the reporter discovers you offered the same "exclusive" to multiple outlets, they won't confront you directly. They'll just stop trusting your pitches. And they'll tell their colleagues.

**Misusing background briefings** is the subtlest mistake. Founders often brief reporters on background during crisis moments, then assume the conversation is sealed. It isn't. The reporter has the information. They can seek corroboration from other sources and publish what they verify independently, regardless of what you told them on background.

## How This Plays Out in Practice

When I run embargo coordination for a token launch, the sequencing looks like this: consent outreach goes to the shortlisted journalists 5 to 7 days before the lift. Materials go out only after explicit confirmation. The lift time is set in the morning of a weekday, in the timezone relevant to the primary audience, which for a global launch usually means accounting for both ET and SGT. APAC outlets get a 24-hour buffer because Korean and Japanese journalists operating in their business hours often can't accept an embargo that drops at 9pm local time.

For an exclusive on a funding round, the process is simpler but the bet is bigger. I identify the reporter whose beat and audience most closely match the announcement. I pitch the exclusive offer before sending any materials. If they confirm interest, they get the full package with a publication window. If they pass, I move to the next option, but now I've lost 48 to 72 hours of my news cycle.

That's the tradeoff that founders don't always compute in advance. An exclusive offer has a deadline on the other side. Know what your fallback position is before you make the call.

One more thing worth saying plainly: a background briefing before a major announcement, separate from any embargo strategy, is almost always worth doing. Briefing 2 to 3 key trade reporters on the broader narrative context, before you send the embargoed materials, means their coverage lands with more depth. They've already thought about the story. They're not starting from the press release.

That's the layer that most PR guides skip. The tactic you use to distribute news is one decision. The context you build in journalists' minds before that distribution happens is a different decision. Both matter.

---

Book a 30-min teardown with Shilika: [https://calendly.com/shilikajain/30min/](https://calendly.com/shilikajain/30min/)
$b100$
where slug = 'embargo-exclusive-briefing-web3-pr-decision-framework' and md5(body) = 'ef23b79f575ae64ca52156a8ef55ae94';

update blog_posts set body = $b100$# How to Write a Cybersecurity Analyst Briefing Deck That Changes How Gartner and Forrester Think About Your Category

A Gartner analyst accepts roughly 23,000 vendor briefings a year across every technology category. The ones they remember, the ones that end up shaping how they frame a market in a Magic Quadrant or a Wave, share one property: the vendor understood what the analyst was actually trying to accomplish in that 45 minutes.

Most cybersecurity vendors don't. They walk in with a deck that would work at a prospect call and wonder why the analyst doesn't seem to move on them.

This post is about the communications craft behind a briefing that lands. I'll cover what the first five minutes must establish, how to present customer evidence without triggering skepticism, how to position against named competitors without getting defensive, and what follow-up materials keep your file active between cycles.

## What an Analyst Is Actually Doing in That 45 Minutes

Before you write a single slide, you need to internalize this: the analyst is not evaluating your product. They're evaluating whether your company belongs in a category, whether your differentiation holds up to scrutiny, and whether your customer evidence is real enough to cite in research they'll put their name on.

A briefing document addresses a professional skeptic who has seen your competitors' equivalent deck, is mentally scoring against published criteria, and has nothing to buy. That's the reader. Most cybersecurity vendors write their briefing deck as though the reader has never heard of the space and needs to be convinced.

The analyst also has a research agenda. They're building toward a thesis: about where the market is moving, which vendors have durable positions, what the enterprise buying problem actually looks like. Every fact you give them either feeds that thesis or doesn't. The vendors who get cited well are the ones who bring data the analyst didn't have.

## The First Five Minutes: Category Before Company

The most common failure mode I see in cybersecurity briefing decks is an opening that front-loads company history, employee count, funding rounds, and founding story. Analysts don't need the origin myth. They need to know, within the first three slides, where you sit in the landscape they're already tracking.

The first five minutes should answer three questions in order:

1. **What category do you occupy?** Not "we're building the future of security" but "we're a cloud-native DSPM vendor addressing data exposure across IaaS environments": a framing the analyst can file into an existing or emerging bucket.
2. **Who is the buyer and what specific problem are they bringing to you?** The more precisely you describe the buyer ("enterprise security architects at companies post-cloud migration, whose CISO has a board-level mandate on data governance") the more the analyst trusts that you actually know your customer.
3. **What claim do you make about your differentiation, in one sentence?** Say it plainly. "We do X that the established players can't do because they're built on Y architecture" is the sentence. You'll support it with evidence later. But saying it up front gives the analyst a hook to hang the rest of the briefing on.

One critical thing to avoid: don't teach the analyst about the market problem. They know it better than you do. Going deep on "why cybersecurity matters" or "the current threat landscape" in a Gartner briefing is the fastest way to lose the room. Start at the category claim and earn every minute from there.

## Slide Sequence That Works for Cybersecurity

A tight 45-minute briefing runs on roughly 14 to 18 slides. Any more and you're covering for unclear thinking. Any fewer and you've probably skipped the evidence.

Here's the sequence I'd back for a cybersecurity vendor in 2026:

**Slide 1: Category claim and buyer definition.** One sentence each. Skip the logo slide as an opener.

**Slides 2–3: Market context, your way.** You're not educating the analyst on the macro threat picture. You're giving them your specific take on why existing solutions fail for your buyer. "SIEM vendors solve for detection at the log layer; our buyers have a fundamentally different problem: unknown data exposure before an incident." That's a positioning argument, not a market-size slide.

**Slide 4: Your differentiation claim, stated plainly.** What you do that the named alternatives don't. You'll substantiate this; first, just state it.

**Slides 5–7: Product capability, enough to believe the claim.** A short architecture diagram and two or three capability walkthrough points. This is not a demo. It's enough product to make your differentiation claim credible.

**Slides 8–11: Customer evidence.** This is the most valuable section of any briefing and the most consistently underprepared. More on this below.

**Slide 12: Competitive landscape as you see it.** Named competitors, where you win and why. Handled carefully: more on this too.

**Slide 13: Revenue trajectory and market traction.** ARR band, growth rate, number of enterprise accounts if those numbers are favorable. Analysts put significantly more weight on enterprise customers than SMB logos; if your story is enterprise, show the named accounts you're allowed to name.

**Slide 14: Roadmap direction.** Where the product is heading at the category level, not a feature list. You're painting a picture of where the market is going and why your strategy gets you there.

**Slide 15: Ask and next step.** What you want from this relationship: quarterly update cadence, RFI participation when relevant, a referral to the covering analyst for an adjacent category if applicable.

## Customer Evidence: How to Present It Without Sounding Like a Pitch

This section is where most cybersecurity vendors underinvest and why it costs them. Customer evidence is the only part of a briefing the analyst can actually cite in their research. Everything else is your claim. Customer stories are proof.

The instinct is to lead with large logos and impressive-sounding outcomes. The problem is that "a Fortune 500 financial services company reduced incident response time by 60%" is exactly what every vendor in a contested category says. Analysts have tuned it out.

What works instead is specificity at the problem level. "A 6,000-employee manufacturing company came to us after a cloud migration left 2.3 million unclassified records exposed in S3: they couldn't use their existing DLP because it had no cloud data-layer coverage." The analyst now has a real problem, a real buyer profile, and context to evaluate whether your solution genuinely fits.

For a formal evaluation cycle, you'll need to provide named references who agree to a separate analyst call. Forrester contacts those references directly; they're not relay points for your talking points. Prepare your references with outcome data, not praise. An analyst calling your reference wants to hear what problem the reference had, what they evaluated, why they chose you, and what changed after deployment. Coach your references to answer those four questions specifically.

A few things to avoid in how you present customer evidence:

- Don't cite a large number of customers and then say you can't name any of them. It signals either that the relationships are shaky or the outcomes aren't there.
- Don't cherry-pick exclusively large-enterprise logos if your actual base is mid-market. Analysts notice the mismatch when your product story doesn't match your customer profile.
- Don't confuse customer count with customer depth. Two named enterprise references with detailed deployment stories outperform a generic slide claiming 200 customers.

## Competitive Positioning Without Triggering Defensiveness

Analysts ask about competitors. Always. "We have no real competition" is not an answer; it's a credibility problem. The analyst has briefed your competitors and knows exactly what the landscape looks like. Claiming no competition either signals that you don't understand your own market or that you're avoiding the question.

The framing that works is: name the category leaders, describe where they win, and then describe the specific scenario where you win and they don't. This is not a takedown. It's a positioning argument.

"CrowdStrike and SentinelOne are the dominant EDR vendors. Enterprises with a high-velocity SOC and existing investment in their ecosystems should stay there. Our buyer is a security engineering team that has already deployed EDR but has a persistent blind spot at the cloud workload identity layer that neither platform covers in their current architecture. That's the gap we close."

That framing does three things. It shows the analyst you understand the competitive landscape honestly. It defines your ICP precisely. And it makes a falsifiable claim the analyst can test against their own buyer conversations.

What doesn't work: a slide that shows your logo in the center of a competitive landscape with every competitor positioned as inferior. Analysts see this layout in every briefing. It signals either that you can't acknowledge your weaknesses or that you've drawn the landscape to make yourself look good. Either reading kills your credibility.

One rule I hold to strictly: don't show a competitor's analyst research back to the analyst. If you're briefing Forrester, don't open a slide with Gartner data. It's amateur, and it irritates the room.

## The Follow-Up That Keeps Your File Active

The briefing itself opens a file on you inside the analyst firm. What keeps that file live between cycles is a sustained cadence of substantive updates, not check-in emails.

Aim for 3 to 4 meaningful touches per covering analyst per year. Each one should bring something the analyst doesn't already have: a new named deployment with an outcome story, a capability the roadmap has crossed off, a shift in how your buyers are using the product that signals market movement.

After each briefing, send the deck within 24 hours with a short note flagging what's under NDA. Separate the confidential slides from the shareable version so the analyst can use what they can use. If the briefing was with Gartner, the recording stays accessible to the analyst community for 28 days: meaning analysts who weren't on the call can review it. Your deck needs to stand alone.

For a Forrester Wave evaluation specifically, Forrester will send a draft questionnaire before the formal process starts. Responding to that draft is not optional if you want to influence how the criteria are set. Miss that window and you're being scored against criteria you didn't help shape.

One often-skipped move: after a quarterly update briefing, ask the analyst what's on their current research agenda. You don't need to be a paying advisory client to ask a factual question about what they're publishing next. If they tell you they're covering a category adjacent to yours, that's your signal to connect them with a customer reference who can speak to that adjacent problem.

## A Note on Timing Relative to Publication Cycles

The full cycle from first briefing to a published Magic Quadrant placement is commonly 12 to 18 months for a vendor entering a new category. Vendors who show up at the RFI stage having briefed the analyst twice in the past year are in a fundamentally different position from vendors who appear cold at the nomination window.

Most cybersecurity startups I talk to want Magic Quadrant or Wave visibility on a timeline that doesn't match how those cycles actually work. The answer isn't to skip the briefing process: it's to start it earlier and hold a consistent cadence. First briefings are about raising analyst awareness. Subsequent briefings are where the actual relationship gets built.

If you're pre-Series A and don't yet have the enterprise customer depth to support an MQ submission, the right goal for early briefings is to be in the analyst's file with a clear category claim, so that when your customer base catches up, you're not starting from scratch.

## Two Scenarios: What Changes by Stage

**Early-stage vendor (pre-Series A / Series A):** Your goal isn't an MQ placement. Your goal is to be remembered. Bring 2 to 3 specific customer deployments with named outcomes, a sharp category claim, and a concrete thesis about where the market is moving. Leave a one-page summary document the analyst can file. Don't ask for feedback the analyst isn't allowed to give; ask for their next research publication date and whether they'd accept a follow-up in 90 days.

**Growth-stage vendor (Series B and beyond):** You have the customer base to support a formal evaluation and potentially a paying advisory relationship that gives you inquiry time. Now the work is coordinating your internal team (product, sales, and customer success) around a unified AR narrative. The deck is the easy part. The hard part is making sure the story your product team tells in the demo, the story your customers tell on reference calls, and the story your CEO tells in the briefing all point to the same differentiation claim. Inconsistency between those three signals is the most common reason a growth-stage vendor underperforms its actual product quality in a Wave evaluation.

## What Makes the Deck Different From the Sales Deck

The clearest signal that a cybersecurity vendor has sent the wrong material to an analyst is the deck that's been stripped of the pricing slide and submitted unchanged. Analysts recognize this instantly.

A sales deck addresses someone deciding whether to buy. A briefing document addresses a professional skeptic who has seen your competitors' equivalent and is scoring against published criteria. The narrative architecture is different. The sales deck moves from problem to solution to ROI. The briefing deck moves from category claim to differentiation evidence to customer proof to market direction.

If you're building the briefing deck from scratch and you're pressed for time: start with your positioning statement, your best two customer stories at the outcome level, and your honest view of where you win and lose against three named competitors. That's the minimum viable briefing. You can build the surrounding slides from there.

---

If you're preparing for a first Gartner or Forrester briefing, or you've had a few that didn't move the needle, I work with cybersecurity founders and comms teams on exactly this. The deck, the prep, the reference coordination, the post-briefing cadence. [Book a 30-min teardown with Shilika](https://calendly.com/shilikajain/30min/) and we'll scope what your AR program actually needs right now.$b100$
where slug = 'cybersecurity-analyst-briefing-deck-gartner-forrester' and md5(body) = '3a9ba2d468d69c211d65cda50a3a3d58';

update blog_posts set body = $b100$# The Crypto Podcast Pitch That Actually Gets You Booked

A short email, a clear argument, and a specific episode reference. That's the entire formula. The problem isn't that Web3 founders don't know it: it's that almost nobody executes it correctly when pitching the shows that actually matter.

I've booked founder clients onto shows at every tier, from Rug Radio to GAIA's CEO Matt Wright getting spotlighted at Agents Unleashed Denver and onto multiple interview slots across 2024 and 2025. The pitches that land share exactly the same structure. The ones that don't land fall into three predictable failure modes. I'll show you both.

## Why the Generic Pitch Template Doesn't Work Here

Most podcast pitch advice is written for coaches, consultants, and SaaS founders who want to land any show with a few hundred listeners. Send a flattering opener, cite your credentials, propose three vague topics, sign off.

That approach fails for crypto-native shows because the editorial bar is genuinely different. Laura Shin is a journalist. Nic Carter and Matt Walsh of On The Brink are investors with a very specific thesis about public blockchains. The Epicenter hosts have been doing technical deep-dives since 2014. Frank Chaparro built The Scoop as an interview show rooted in breaking news and institutional finance angles. None of these people are looking for a feel-good founder story. They're looking for something their specific audience hasn't heard yet.

Send a generic pitch to any of these shows and you're not just ignored: you're quietly flagged as someone who doesn't listen.

## Know the Show Before You Write One Word

Before you draft anything, audit the last 10 episodes of whatever show you're targeting. Not to flatter the host. To understand the pattern.

**Unchained** (Laura Shin) covers regulation, market structure, and policy. The guests who get booked have a point of view on how rules affect builders or investors, not just a product announcement. If your angle is "my protocol does X," that's not enough. If your angle is "why the GENIUS Act creates a compliance gap that no stablecoin issuer has solved," you have something to work with.

**Bankless** (David Hoffman, Ryan Sean Adams) is Ethereum-aligned and leans into protocols, DeFi mechanics, and the broader crypto economy thesis. Guests are typically at the intersection of technical depth and narrative. You need to move the Ethereum or DeFi story forward in a way listeners haven't heard. Your L2 announcement isn't the angle; your specific bet on how intent-based architecture changes liquidity fragmentation is.

**Epicenter** is the oldest serious crypto podcast still running, and its guest bar is calibrated for architects and researchers. You need to talk about mechanism design, adversarial models, or protocol trade-offs at a level that goes past buzzwords. If your co-founder can't go two hours on how your system works under stress, this isn't your first target.

**On The Brink with Castle Island** (Matt Walsh, Nic Carter, Wyatt Lonergan) books builders and investors who are working at the frontier of public blockchains. Recent guests include founders from Squads, DoubleZero, Monad, and Ethena. The through-line is founders who are actively shipping something with a strong opinion about why it matters. DeFi mechanics, stablecoin infrastructure, and financial services convergence are recurring themes.

**The Scoop** (The Block, historically Frank Chaparro) is tied to The Block's newsroom. Guests land here because they have something adjacent to a news cycle: a big raise, an institutional partnership, a market-structure take that connects to current events. It's the show where you bring data or a contrarian read on a story that's already running.

Knowing this, you can immediately see why the generic pitch fails: it doesn't speak to the specific editorial logic of any show.

## The Three Failure Modes

**1. Leading with your credentials instead of the argument.**

"I'm the CEO of [protocol] and we've raised $X" is not a podcast pitch. It's a press release. What the host needs to know is: what will your audience learn that they can't get from five other episodes? Your title and funding round tell them nothing about that.

**2. Proposing topics so broad they could fit any show.**

"I can talk about DeFi, Web3 adoption, and the future of finance" is a pitch for zero shows. Bankless gets 50 emails a week from people who can talk about the future of finance. You need a specific argument with a specific tension. "Why the current batch of DePIN projects are measuring the wrong metric and why it's going to cost them in the next cycle": that's a topic, not a category.

**3. No episode reference hook.**

The first line of your pitch needs to prove you actually listen to the show. Not with flattery, with specificity. Reference an episode by name, cite a specific point the host made, and connect it to your angle. This is the single fastest signal that separates founders who are genuine about the show from the ones mass-pitching a list.

## The Pitch Structure That Works

Keep the whole email under 150 words. Yes, 150.

Hosts at tier-1 shows read these on a phone. They're not reading essays. The pitch is a door-opener, not the conversation. Here's the structure:

**Subject line:** one clear hook. No "guest pitch" in the subject. That's admin language, not editorial. Something like: "Angle for Epicenter: why DePIN's revenue metric is broken"

**Para 1: Episode reference hook (2 sentences max):** Name a specific recent episode. Draw a direct line to your angle.

**Para 2: The argument (3 sentences max):** State the specific, debatable point you'd make on air. Not your product. The argument your product or experience gives you standing to make.

**Para 3: Why this audience (2 sentences max):** What do Bankless listeners, or Epicenter listeners, or On The Brink listeners specifically get from this that they don't get elsewhere? Ground it in something about their audience, not about your goals.

**Sign-off:** Who you are in one line. A link to a previous interview or media hit. Nothing else.

## The Worked Template

---

**Subject:** Angle for On The Brink: stablecoin rails are solving the wrong layer

Hi Wyatt,

Caught your episode with Brandon Arvanaghi on banking AI agents. The part on how financial services need to evolve to service LLMs got me thinking about a gap that nobody's talking about publicly.

Argument: the current stablecoin infrastructure build-out is optimizing for issuance and compliance, but the actual bottleneck in cross-border payments is settlement finality on the receivables side, and the protocols that solve finality first will capture the market before the issuance race matters. I've been sitting inside this specific problem with [client] for 18 months and have the data to show where the actual friction is.

This would be useful for your audience because the investors and builders who follow the show are making capital allocation decisions right now on stablecoin infrastructure, and most of them are looking at the wrong layer.

[Name], co-founder of [protocol]: backed by [fund]. Previous interview: [link].

---

**What makes this work:**

- The episode reference in line one proves you listened to the Meow episode (EP.715). Wyatt recorded it. That's specific.
- The argument is debatable. A host can push back on it, which makes for a better episode than a product announcement.
- The audience bridge is concrete: investors making allocation decisions is the exact listener profile On The Brink serves. You're not saying "your audience will love this." You're identifying what they're trying to figure out.
- The bio is one line plus one link. That's all you need.

## Targeting by Founder Stage

**Pre-seed to $5M seed:** Don't cold-pitch Unchained or Bankless. Your name recognition isn't there yet and their queues for non-celebrity guests run three to six months if they book at all. Target niche shows with 2,000 to 20,000 listeners per episode where you match the audience profile exactly. A DePIN founder should be on DePIN-native shows before Bankless. A DeFi protocol on a chain-specific podcast before The Scoop. Build your interview backlog, then use it as social proof.

**$10M–$30M Series A, working product:** You can now pitch mid-tier shows credibly. A previous interview link in your pitch is worth more than your funding round. Shows like Web3 with Sam Kamani, Rug Radio, and chain ecosystem podcasts (Solana-focused, Cosmos-focused) should be the volume layer. Target two to three per month.

**Post-Series A with tier-1 coverage:** Now the cold pitch to Bankless or On The Brink can work, but only if the angle is tied to something news-adjacent. A new ecosystem integration, a data release, a contrarian take on something that's happening in the market this week. Bankless books around narratives that move the Ethereum roadmap conversation forward. If you can be that conversation, the pitch lands. If you're announcing a feature, it doesn't.

## The Part Nobody Talks About: Timing and Follow-up

The episode reference hook ages. An episode you cite from two months ago signals you're working from a stale list. Keep your target list live and update your reference hook before sending each batch. If the host published something on X that's related to your angle in the last two weeks, that's a better hook than an episode from six weeks ago.

One follow-up is fine. One. Send it five to seven business days after the first email. Keep it to two sentences: "Following up on the pitch below. Happy to share a brief overview if it'd be easier to assess." That's it. A second follow-up turns you into noise.

## What I Said About PR in General Applies Double Here

> builders build, PR's pitch lol
>
> [Shilika Jain on X, 28 Mar 2025](https://x.com/Shilika_jain/status/1905715877187838364)

The pitch is craft. Most founders don't think of it that way because they're used to telling their own story and expecting it to land. Podcast pitching is different from fundraising, where you're the one being evaluated. In a podcast pitch, you're pitching a product for the host's audience. The product is the episode. You are not the point. The episode is.

Internalize that, and the rest of the structure follows logically.

## The GAIA Example

When I was running founder profiling for GAIA in late 2024 and into 2025, the approach that compounded was not one big booking: it was a steady cadence of placements anchored to one narrative (decentralized AI agents, node count as the proof metric) that gave each pitch a news hook. By the time the Crypto Coin Show episode went live around GAIA hitting 400,000 nodes, the earlier interviews on Rug Radio and Francesco Andreoli had built enough reference points that booking tier-1 slots became markedly easier. The pitch didn't change: the social proof stack behind it did.

That's the play for a pre-Series-A Web3 founder. Don't spend six months trying to crack Bankless. Build the interview backlog on niche shows with the right audience profile, and let that stack become the credential you lead with when you do pitch up.

The pitch template is a tool. The strategy behind it is what actually moves you up the tier ladder.

---

If you want a teardown of your current pitch draft or a podcast target list built to your stage and category, [book a 30-min call with me](https://calendly.com/shilikajain/30min/) and we'll work through it together.
$b100$
where slug = 'crypto-podcast-pitch-template-web3-founders' and md5(body) = '65bbbb49f4d5477ce8930eeb51a69b90';

update blog_posts set body = $b100$# Web3 Reputational Risk Register: 12 Crises to Plan For

A reputational risk register is not a crisis plan. It is the document that makes a crisis plan possible. You build the register before anything happens, mapping each risk by likelihood and potential impact. Then you write holding statements, assign owners, and decide which channels carry which message. When something actually goes sideways, you are not starting from scratch at 2 a.m.

Most Web3 founders have neither. What they have is a vague understanding that hacks are bad and a commitment to "be transparent" that was never stress-tested.

I have run crisis communications across more than 50 Web3 protocols over six years. The projects that survived a bad event almost always had at least informal preparation. The ones that didn't survive often had the same fundamental problem: they treated the first hour as a technical problem and only remembered it was also a communications problem when the community was already spiraling.

This post is the register I build at the start of every client engagement. Fork it, customize it, and add the scenarios specific to your architecture, team composition, and investor base.

---

## How to Read This Register

Each scenario entry has four fields:

- **What it is**: a one-line description of the trigger event
- **Who it involves**: the stakeholder tiers that need differentiated messaging
- **Which channels**: where the response lands first, second, and third
- **Tone**: the specific register your statement needs, and what to avoid

Severity ratings are approximate. Every project's risk profile is different.

---

## Scenario 1: Smart Contract Exploit or Bridge Hack

**Severity: Critical**

The scenario everyone plans for, and still botches. Funds are at risk or already gone. On-chain sleuths are posting before you've finished reading the incident report.

**Who it involves**: Users with funds at risk, token holders, auditors, legal counsel, the security researcher community, tier-1 media.

**Channels**: X (project account, not founder's personal account) within 15 to 30 minutes. Discord/Telegram second. Blog post with technical detail within 2 to 4 hours. Media briefing under embargo if the dollar figure is above $5 million.

**Tone**: Factual and controlled. Acknowledge the incident. State what you know and what you don't. Give a timestamp for the next update. Do not say "all funds are safe" until you have verified it. The phrase has become a meme for a reason: it breaks trust the moment it turns out to be false.

---

## Scenario 2: Rug Pull Allegation

**Severity: Critical**

Your project is not a rug pull. But a single influential account with 50,000 followers says it is, and the screenshot is already circulating in three Telegram groups.

**Who it involves**: Retail community, KOL network, journalists covering the story, on-chain analysts.

**Channels**: X first, then a dedicated blog post with the on-chain proof bundle (vesting contract links, audit links, wallet transparency). Discord/Telegram for community-direct reassurance. The founder on a Twitter Space or video call within 48 hours.

**Tone**: Direct and specific. Vague denials do not work. You need an on-chain proof bundle, not a feelings statement. Doxxed founders have a faster path to credibility recovery; pseudonymous founders need a trusted third-party co-signer.

The allegation has a long tail. Even after you survive the first news cycle, the screenshot resurfaces every few months with new community members. Build a permanent, linkable URL with the full forensics. You will reference it for years.

---

## Scenario 3: Token Unlock Controversy

**Severity: High**

A team or investor unlock window approaches and the community notices. On-chain wallets show tokens moving to exchanges. Price starts dropping. Someone posts a graphic overlaying your unlock schedule with the price chart. The narrative writes itself.

**Who it involves**: Token holders, retail community, market makers, exchanges, investors whose unlocks are driving the concern.

**Channels**: Governance forum and project blog first. X thread with the data. Discord AMA within 48 hours.

**Tone**: Pre-emptive is infinitely better than reactive. Post your unlock schedule publicly before it becomes news. If large-wallet movements were legitimate (e.g., an investor exercising a planned exit), say so factually. If they were not communicated in advance, own that. The worst version of this scenario is silence while on-chain analysts fill the void with speculation.

---

## Scenario 4: Co-Founder Departure

**Severity: High**

In a normal company, a co-founder leaving is a talent story. In Web3, during a fundraising round, a token unlock window, or a governance vote, it becomes a narrative crisis within hours. The departure often leaks on X before any official statement exists, and former team members make vague statements that read as dysfunction.

**Who it involves**: Investors, employees, media covering the beat, community moderators, KOL partners, potential hires.

**Channels**: Investors get a personal call before anything is public. Employees get a direct message or video call. X announcement and blog post go out simultaneously, same day.

**Tone**: Neutral and forward-looking. "Mutual decision," "pursuing a new chapter," "grateful for what we built together" are fine and true enough in most cases. What kills you is the asymmetric story: one party vague-posting on LinkedIn, the other saying nothing. Align the narrative before anyone speaks publicly. No subtweets. No thinly veiled "growth opportunities."

---

## Scenario 5: Regulator Subpoena or Wells Notice

**Severity: High to Critical (depends on jurisdiction and project type)**

A regulatory letter arrives. Maybe it is an SEC Wells Notice. Maybe it is a CFTC subpoena. Maybe it is a foreign regulator inquiry from a market where your token trades. The story leaks: it always leaks.

**Who it involves**: Legal counsel (immediately), investors, exchange partners, board, then media.

**Channels**: No public statement until legal approves every word. Investor disclosure first. A terse, legally reviewed blog post if and when required. Media inquiries get a holding statement: "We are aware of the inquiry and are cooperating fully with regulators."

**Tone**: Spare and factual. Do not speculate. Do not explain the legal theory. Do not put your founder in front of a microphone without legal co-sign on every sentence. The investors you will lose by going dark are fewer than the ones you will lose by over-explaining on X.

---

## Scenario 6: Exchange Delisting

**Severity: Medium to High**

A tier-1 or tier-2 exchange removes your token. The community interprets this as institutional rejection and a death signal. Price drops. Social sentiment goes negative fast.

**Who it involves**: Token holders, retail traders, current exchange partners, potential listing targets.

**Channels**: X from the project account, within 2 hours of the announcement. Telegram and Discord for community-direct. A short blog post with context.

**Tone**: Matter-of-fact and forward-looking. Explain what happened if you can (compliance update, volume thresholds, strategic decision). Name where the token still trades. Announce any new listings in the pipeline if they are confirmed. What the community needs is confidence that the project continues; give them the facts that justify it.

---

## Scenario 7: KOL Betrayal or Token Dump

**Severity: Medium to High**

A KOL you paid in tokens promotes the project loudly, then dumps their allocation within 72 hours. On-chain analytics surfaces the wallet. The screenshots go everywhere. Your project is now associated with the word "paid shill."

**Who it involves**: Retail community, other KOL partners (who will be watching how you handle this), journalists, token holders.

**Channels**: X statement from the project account acknowledging the on-chain facts. Do not defend the KOL. Do not attack them publicly either.

**Tone**: Honest and clean. Say what the terms of the arrangement were. Say whether they violated them. If there was a lockup agreement and it was broken, state that and note any legal remediation. The community respects founders who name what happened: they don't respect founders who perform ignorance about a wallet that is publicly visible on Etherscan.

Prevention is better than any response: run on-chain wallet checks before committing to any KOL. Token compensation with short lockups is structurally misaligned with your project's interests.

---

## Scenario 8: Validator Slashing Event (PoS / Restaking Protocols)

**Severity: Medium to High (depends on user exposure)**

If your protocol involves staking, restaking, or node operation, a slashing event is a foreseeable risk. A validator misconfiguration, a node provider outage, or a software bug causes slashing. Users lose a percentage of staked assets.

**Who it involves**: Stakers and delegators with direct financial exposure, node operators, developers who built integrations, auditors.

**Channels**: Technical status page first (within 30 minutes of confirmation). X thread with plain-English explanation. Discord for affected-user support. Blog post with root cause analysis and remediation plan within 24 hours.

**Tone**: Technical and accountable. Name the cause as specifically as you know it. State what percentage of stake was affected and what the total user exposure is. If you are compensating affected users, say how and when. Vague reassurance is worse than accurate bad news.

---

## Scenario 9: Treasury Concern or Runway Alarm

**Severity: Medium to High**

A community member, an on-chain analyst, or a journalist notices that your treasury wallet has been declining. They post a thread. The narrative: "This project is going to run out of money." Price drops. Core contributors get DMs asking if they're still employed.

**Who it involves**: Community, existing investors, potential investors you are approaching, partners with revenue-share arrangements, media covering the beat.

**Channels**: Governance forum (if applicable) or a project blog post with a transparent treasury breakdown. X thread linking to it. AMA for community Q&A.

**Tone**: Proactive and specific. Post your runway data before you're forced to. If the runway concern is accurate, say what you're doing to extend it (grants, new funding, product revenue, cost reductions). Silence on a treasury concern reads as confirmation.

---

## Scenario 10: DAO Governance Attack or Hostile Vote

**Severity: Medium to High**

A large token holder or a coordinated group acquires enough voting power to pass a governance proposal that redirects treasury funds, changes protocol parameters, or effectively seizes control. The attack may be partially or fully on-chain before your core team realizes what's happening.

**Who it involves**: Token holders and delegators, protocol partners, media covering DeFi governance, legal (if funds were misappropriated).

**Channels**: Governance forum immediately. X for community alert. Blog post with timeline and the team's position within 12 hours.

**Tone**: Urgent and transparent. Explain what happened, what the current state of the proposal is, and what governance mechanisms exist to respond. If you disagree with the vote, say so clearly and explain the reasoning. Do not go dark on your governance forum while an active attack is unfolding: silence will be read as complicity.

---

## Scenario 11: Partnership Collapse or Integration Failure

**Severity: Low to Medium**

A flagship integration breaks, or a headline partnership falls apart before it delivered anything. The announcement was big; the silence afterward is noticeable. Community members start asking. Someone runs a thread titled "What happened to X?"

**Who it involves**: Community, integration partners, media who covered the original announcement, investors who cited the partnership in their thesis.

**Channels**: A brief, honest blog post or X thread. Investor update (private).

**Tone**: Factual and brief. If the partnership dissolved because of the partner's side (acquisition, product pivot, legal issues), say that with appropriate tact. If it dissolved because of your side, own it. Do not let the narrative sit unanswered for weeks: the community will fill the void.

---

## Scenario 12: Founder Personal Controversy

**Severity: Variable, potentially Critical**

The founder's personal conduct becomes news. A past statement resurfaces. A sexual harassment allegation is made. A public argument on X escalates into a story about the project's culture. A founder from another project calls yours out by name.

**Who it involves**: Core team, investors, media, community, talent pipeline (anyone thinking of joining watches this closely).

**Channels**: Depends entirely on whether the conduct is separable from the brand. For most Web3 projects, it is not: the founder is the brand. That makes this scenario more dangerous than it would be at a mature company with institutional identity.

**Tone**: No improvised X responses. No quote-tweeting allegations with a defensive thread. If the allegation has merit, the response must include concrete action (step-back, third-party review), not just words. If it doesn't, a single, factual statement from the project account followed by silence is better than a running argument. Board or investor calls before anything public.

---

## The Infrastructure Behind the Register

The register is only useful if you maintain four operational pieces alongside it:

**1. Pre-drafted holding statements.** For each scenario, draft a 3-sentence holding statement that can go out within 30 minutes. It acknowledges the situation, confirms you are investigating or responding, and gives a timestamp for the next update. Legal reviews these when nothing is happening, not during the incident.

**2. A stakeholder contact tree.** Who gets called first, second, and third? Investors before media. Employees before Twitter. Exchanges before community. The tree should have phone numbers, not just email.

**3. A channel ownership map.** Who posts to X? Who manages Discord? Who briefs journalists? Do not discover during a live incident that three people are drafting conflicting statements.

**4. A 90-day rebuild plan template.** Most PR thinking about crises stops at the initial response. The rebuild (the earned-media strategy, the governance transparency cadence, the community-trust work) is where reputation is actually repaired. Build a template for it before you need it.

---

## How This Differs at Different Stages

**Pre-seed / seed.** Your risk register is shorter but not nonexistent. Rug pull allegation, co-founder departure, and KOL betrayal are your most likely scenarios. You probably don't have a validator slashing risk yet. Build a 4-scenario register and hold it in a shared doc.

**Series A / post-TGE.** Every scenario on this list is plausible. You have media relationships that can amplify a crisis and a community large enough to self-organize against you. Build the full register, pre-draft holding statements for all 12 scenarios, and add a named PR contact to the incident response tree.

**Mature protocol.** Add regulatory risk and governance attack as tier-1 priorities. These are not hypothetical at your scale.

---

The most expensive part of a crisis is not the legal fees or the consultant retainer you call in at 3 a.m. It's the two to four hours of silence at the start, while your team argues about what to say, while the community fills the void with the worst possible interpretation.

The register is the work that buys you those hours back.

If you want a session to map this to your specific architecture and team composition, [book a 30-min teardown with Shilika](https://calendly.com/shilikajain/30min/).
$b100$
where slug = 'web3-reputational-risk-register-12-crisis-scenarios' and md5(body) = 'e9e30fef380bb64fe65f27ecffbe1e6f';

update blog_posts set body = $b100$# Vietnam Web3 PR Playbook: The Licensed-Exchange Window

Vietnam ranked fourth in the 2025 Chainalysis Global Crypto Adoption Index, behind only India, the United States, and Pakistan. Roughly 17 million Vietnamese hold digital assets today, and annual crypto volume is estimated near $120 billion, nearly all of it flowing through offshore platforms like Binance and Bybit. That is the context for what just changed legally, and why a narrow earned-media window has opened for global protocols that can credibly engage with the new framework.

The Law on Digital Technology Industry (Law No. 71/2025/QH15, passed June 2025) took effect January 1, 2026. It is the first Vietnamese law to legally recognize and define crypto assets as property. Not legal tender, trading is still settled in Vietnamese dong and crypto payments remain prohibited, but holding and trading now have a proper legal foundation. Resolution 05/2025/NQ-CP runs alongside it: a five-year pilot that licenses a small number of domestic exchanges under strict supervision, with a minimum charter capital requirement of around $380–400 million and a foreign ownership cap of 49%.

In March 2026, five companies passed initial qualification: affiliates of Techcombank, VPBank, and LPBank, alongside stockbroker VIX Securities and conglomerate Sun Group. Those five names matter for PR strategy, not just for compliance. The Vietnamese press is actively covering this story right now, and any global project that can honestly attach itself to the "regulated market opens up" narrative has a genuine angle.


## Why this moment is different from every previous Vietnam crypto story

Most global Web3 projects have been told "Vietnam is important" for the last three years without a clear hook for earned coverage. The market was huge by adoption metrics but legally murky, which made local journalists cautious about institutional legitimacy narratives. That changed on January 1, 2026.

Vietnamese journalists and editors at Coin68, Blogtienao, and the local tech desk of CafeF can now write about crypto market infrastructure without tiptoeing around legality questions. The story has shifted from "is this legal" to "who is building the infrastructure and who is ready for it." That is a fundamentally different pitch environment.

The media-venture complex that runs much of Vietnamese crypto coverage operates differently from any other APAC market. Coin68 is the dominant daily news platform and functions as required reading for Vietnamese crypto users. Blogtienao runs a broader blog format with a Facebook following above 170,000. The IVY Group has structured what started as community blogs, including Blogtienao, into a consortium that partners with more than 50 KOLs and independent outlets. Coin98 Insights (the media arm of Ninety Eight, builder of the Coin98 wallet and DeFi ecosystem) produces research and market education aimed at Vietnamese retail traders.

These outlets are not wire-service feeders. They do not pick up your English press release and translate it. They write original Vietnamese-language analysis for an audience that consumes crypto content in Vietnamese, on Telegram channels and in Facebook groups, not on Bloomberg terminals.


## The outlet map: what each one actually covers

**Coin68** is the highest-traffic Vietnamese crypto publication and covers market news, project updates, funding rounds, and regulatory developments. Its daily readership skews toward active traders and DeFi participants. The coverage that lands here is timely and news-driven: funding announcements, mainnet launches, partnership news that has a clear Vietnamese angle. If your project has a Vietnamese community lead, a Ho Chi Minh City co-founder, or a partnership with one of the five licensed exchange applicants, Coin68 will cover it as a local news story rather than a paid placement.

**Blogtienao** (Blog Tiền Ảo, literally "virtual currency blog") runs longer educational and analytical pieces alongside news. It is Facebook-heavy and indexes well for Vietnamese search queries. Good for explainers about how your protocol works in practice, and for "why we chose Vietnam as our APAC anchor market" founder narratives.

**Coin98 Insights** is the research and editorial arm of the Ninety Eight ecosystem, which also runs the Coin98 wallet and a $25M Asia-focused ecosystem fund. Coverage here is more analytical, covering on-chain data, protocol mechanics, and ecosystem comparisons. If your project can provide Vietnamese-language on-chain data commentary or has a DeFi angle, Coin98 Insights is the strongest credibility placement in the market.

**CafeF** is a mainstream Vietnamese financial media outlet, not a crypto-native publication. It covers stock markets, real estate, macroeconomics, and increasingly, digital assets under the new regulatory framework. A placement in CafeF reaches Vietnamese retail investors and businesspeople who are just starting to understand what the new law means for their savings. This is the outlet for your "what does the regulated market mean for Vietnamese investors" founder op-ed. It is also the hardest to earn without a credible Vietnamese partner.

**Cointelegraph Vietnam** syndicates and localises content from the global Cointelegraph network but also commissions original Vietnamese-language pieces. It runs somewhere between Coin68 and an international outlet in editorial tone. Useful for funding announcements and technical milestone coverage that has been written with global framing but needs a local angle added.


## The community layer: where the real audience lives

The press follows the community in Vietnam, not the other way around. Tiger Research found that 76% of Vietnamese crypto holders make investment decisions based on recommendations from their community network. That number explains why a Coin68 article about your project matters less than a 120,000-member Telegram group deciding your token is worth attention.

The community infrastructure runs on three platforms: Telegram for trading signals and project news, Facebook groups for broader retail reach, and TikTok for reaching younger users through short-form educational content. YouTube remains the channel for longer analysis and project deep-dives. Discord shows up mainly in developer and builder communities.

Effective Vietnam PR is not a press release followed by community activation. It is community activation that earns press coverage as a second-order effect. The sequencing matters. An AMA with a vetted Vietnamese KOL whose Telegram channel has 50,000 members generates more verifiable community proof than a translated press release. Coin68 writers read those Telegrams. When they see real community reaction, they write the news story.

This is why, when I've run campaigns across APAC for projects from L1s to RWA platforms, the Vietnam activation always starts with identifying two or three credible Vietnamese voices who can speak to why the project is relevant for the local market. Not English-language KOLs doing translated content. Vietnamese-language voices who have built trust in the communities your users actually inhabit.


## The messaging angles that Vietnamese journalists are covering in 2026

Vietnamese editors are currently interested in four story shapes:

**1. Regulatory-framework alignment.** Any global project that can demonstrate it meets or exceeds the AML, cybersecurity, and compliance standards set by the new law has a natural news angle. The Vietnamese press is covering the transition from offshore gray market to licensed domestic market extensively. If your protocol is non-custodial, if you've passed a third-party audit, if you have FATF-compliant KYC infrastructure, those are now editorial angles rather than just compliance footnotes.

**2. Licensed exchange partnerships.** The five exchange applicants (CAEX (VPBank-linked, with OKX Ventures and HashKey Capital backing), TCEX (Techcombank), VIXEX (VIX Securities), SCEX (LPBank), and the Sun Group venture) are the only legal on-ramps into the Vietnamese regulated market. Any DeFi protocol, infrastructure layer, or token project that can credibly position itself as a tool or integration partner for these exchanges has a story that Coin68 will cover. The angle writes itself: "X protocol is working with Y exchange applicant to bring Z capability to Vietnamese retail users."

**3. Vietnamese builder stories.** Axie Infinity, Coin98, and Kyber Network are the names that made Vietnam famous in Web3. Vietnamese journalists want to cover the next chapter of that story. If your protocol has Vietnamese co-founders, advisors, or if it was incubated in Ho Chi Minh City or Hanoi, that founder-origin angle is the strongest cultural hook you have. It is not sufficient on its own, but combined with a product milestone, it is a Tier-1 Vietnamese outlet story.

**4. Remittance, savings, and financial inclusion framing.** Vietnam has one of the highest rates of crypto adoption among populations without strong traditional banking access. Stories that frame crypto tools as alternatives to high-fee remittance services or as USD-denominated savings instruments resonate with CafeF's mainstream financial readership in a way that "DeFi TVL" stories do not.


## What the pitch mechanics look like

The mechanics for pitching Coin68 or Blogtienao differ from pitching CoinDesk or The Block in three important ways.

First, the lead time is short. Vietnamese crypto publications run on a news cycle closer to 24 to 48 hours than the 5 to 7 day windows you'd use for a US Tier-1. Have your announcement materials ready in Vietnamese before you reach out, not after. A translated version produced overnight by a machine translation tool reads exactly like machine translation and editors can tell.

Second, the pitch needs a named Vietnamese touchpoint. "Global project launches in Vietnam" is a weaker hook than "Vietnam community lead [name], formerly of Ninety Eight, joins [project] to lead Southeast Asia expansion." A Vietnamese co-author on an op-ed, a partnership with a local community, a Vietnamese ambassador: these are the details that convert a PR note into a published piece.

Third, the relationship is with the ecosystem, not just the journalist. In Korea, I know that Korean reach comes from Naver-syndicated outlets and Telegram-driven apps rather than translated English releases. Vietnam has its own equivalent structure: the IVY Group consortium means that building a relationship with one outlet can generate coverage across multiple community channels simultaneously. Going directly to individual outlets without understanding the underlying media network produces patchy results.

The influencer compliance environment tightened further in 2026, with new advertising law provisions requiring KOLs to verify product claims before promoting them. For crypto, this means your KOL brief needs to include the technical documentation, audit results, and regulatory status of your project. It is not a burden if you're running a legitimate protocol. It is a filter that removes the projects you don't want to be associated with anyway.


## The two founder types who should prioritise Vietnam right now

**You're a global DeFi or infrastructure protocol with 6-figure Vietnamese user numbers.** You already have a community there; you just haven't activated it for press. The licensed-exchange window gives you a specific news angle ("we're ready for the regulated market") that justifies a press push. Start with Coin68 and a Telegram AMA series with 3 to 4 vetted Vietnamese voices, then pitch Blogtienao on the founder op-ed. Time the campaign to coincide with any exchange licensing news from the five approved applicants.

**You're pre-launch and Vietnam is in your APAC roadmap.** Don't wait for launch to build Vietnamese media relationships. The current regulatory conversation is the single best moment to establish your project as a credible participant in the new framework before the licensed exchanges go live and everyone else rushes in with the same "we're Vietnam-ready" announcement. A well-timed founder commentary piece in Coin98 Insights or CafeF, published 6 to 8 weeks before your token launch, is worth more than five launch-day press releases.

One thing I'd caution either type against: treating Vietnam as a single market because it appears as a single country. Ho Chi Minh City (formerly Saigon) has a different media culture and community ecosystem from Hanoi. HCMC is the DeFi-native, startup-led crypto capital. Hanoi is where the regulatory conversation happens. If you have one announcement, pitch it in both cities with different frames.


## The window and when it closes

The five-year pilot is deliberately restrictive. Roughly five licensed exchanges, a $380M+ capital bar, all trades in Vietnamese dong, foreign ownership capped at 49%. Once those exchanges go live, the story will shift from "new market opens" to "established market competition." That is when the earned-media window for "global project enters Vietnam" narratives narrows considerably.

The Q3 2026 exchange launch timeline has slipped in analyst estimates. Vietnam's Vo Dinh Tri at University of Economics Ho Chi Minh City put the odds of a fully operational exchange within the first 12 months at very low, citing capital, security certification, and disclosure requirements. The regulatory inflection already happened in January 2026. But the market activation window is running. Projects that build Vietnamese media relationships now, before the licensed exchanges dominate the news cycle, will have a structural PR advantage over those who arrive later with a bigger budget and a generic pitch.

---

If your project has a Vietnam angle and you're figuring out how to activate it, I work with protocols at exactly this stage. A 30-minute teardown call usually produces a clear view of which outlets make sense, which community approach fits your timeline, and what the messaging architecture needs to look like for it to actually land.

[Book a 30-min teardown with Shilika](https://calendly.com/shilikajain/30min/)
$b100$
where slug = 'vietnam-web3-pr-playbook-2026' and md5(body) = '7f366c27f3f5c60c1e33e7f2778ead89';

update blog_posts set body = $b100$# DeFi Exploit Comms: The First 72 Hours After a Hack

The first thing most DeFi teams do after an exploit is nothing. They go dark on X while Discord floods with "rug pull," "team has left the building," and a wave of panicked wallet revocations. By the time they post something, the narrative is already set, and not by them.

I've said it before and it stays true: "comms is so underrated in web3 but that's everything! How you communicate with your community, stakeholders, customers, retail users, airdrop hunters, journos is literally everything—it's not an important thing, but it's everything that can make or break your brand."

> comms is so underrated in web3 but that's everything!
> how you communicate w your community, stakeholders, customers, retail users, airdrop hunters, journos is literally everything!
> it's not imp thing, but it's everything that can make or break your brand
>
> [Shilika Jain on X, 3 Jun 2025](https://x.com/Shilika_jain/status/1929941601503326277)

DeFi protocols lost at least $1.3 billion to exploits in the first eight months of 2026 alone, with compromised private keys overtaking smart contract bugs as the leading attack vector. Two attacks in April 2026, Drift Protocol ($285 million) and KelpDAO ($292 million), accounted for the majority of that total, and both exposed a pattern that goes beyond code: the communications failure that turns a recoverable exploit into a permanent TVL exit.

This is not a technical post-mortem guide. There are plenty of those. This is a communications playbook: the exact sequence of statements, briefings, and updates that determines whether users stay through the recovery or withdraw permanently.

## Why the First 72 Hours Set the Narrative for Good

Crypto Twitter moves faster than any journalist. On-chain data is public. The moment the exploit transaction hits, aggregator bots flag the anomalous fund flow, security researchers start reverse-engineering the attack vector, and your Discord starts asking questions. You have roughly 20 to 40 minutes before the story is fully in public circulation without your voice in it.

I wrote in late 2022, during the worst quarter in crypto history:

> Learnings from the crypto market 2022:
> Nobody is too big to fail.
> Every action has its own reaction & ripple effect
> Transparency is the key to successful web3 business
> Medias have emerged as the strongest source of truth this season
>
> [Shilika Jain on X, 18 Nov 2022](https://x.com/Shilika_jain/status/1593473255125397504)

That observation landed when FTX, Genesis, and Gemini were dominating headlines. The same principle governs a DeFi exploit. Media and community fill the silence. You don't get to reclaim the first narrative once it's been written for you.

The 72-hour window is specifically where the story hardens. Reporters file. Community moderators decide whether to defend or abandon you. LPs make their exit decisions. Bridge operators decide whether to pause integrations. Every hour without your voice is an hour someone else's voice is heard instead.

## The Three Exploit Types and Why They Change Your Comms

Not all DeFi crises communicate the same way. The exploit type determines what you can say, when, and to whom.

**Smart contract vulnerability** (reentrancy, oracle manipulation, flash loan attack): The bug is in code you deployed. The liability implication is significant. You own the error. Your comms must acknowledge the technical failure without making specific legal admissions before counsel has reviewed the scope. The upside: the attack vector is usually identifiable and explainable within hours.

**Bridge failure** (cross-chain verification exploit, single-DVN configuration attack): KelpDAO lost $292 million in April 2026 through a single compromised verifier on its LayerZero bridge. The attack looked valid on-chain: every transaction was technically well-formed. Bridge exploits are especially dangerous for comms because users on downstream protocols that held wrapped assets are also affected. Your disclosure has to account for the extended blast radius, not just your own TVL.

**Compromised private keys or social engineering** (admin key theft, multisig manipulation): The Drift Protocol hack drained $285 million in 128 seconds after attackers spent months social engineering their way to an admin key. The comms challenge here is different: the protocol code wasn't broken, your operational security was. That framing matters enormously to users who want to know whether to trust the remaining infrastructure.

The type shapes the legal caution required, the technical detail you can safely include in early statements, and the compensation framing that is realistic to commit to.

## Hour 0 to 1: The Holding Statement

You have one job in the first 60 minutes: acknowledge, contain, name a spokesperson, and stop all scheduled content.

The first post goes on X. It is short. It does not speculate. It should go out within 30 minutes of internal confirmation.

**Template (adapt, don't copy verbatim):**

*"We are aware of an incident affecting [protocol name]. We have paused [specific functions]. No further funds are currently at risk. Investigation is underway. We will update in [60/90] minutes. One point of contact for updates: [X handle or Discord announcement channel]."*

Four things this does right: it confirms awareness (so users know the team hasn't vanished), it states the containment action already taken, it gives a specific time for the next update, and it names exactly where to go for information. Four things you do not include: a damage estimate (you don't know yet and a wrong number destroys credibility), a root cause (same reason), a compensation commitment (your legal counsel hasn't reviewed), or any language that implies the funds are fully secure when they may not be.

Simultaneously: lock Discord and Telegram to announcement-only mode. Assign one person to moderate. Every rogue team member posting a half-formed opinion in the community channel is a liability and a screenshot waiting to misrepresent your position.

Pause all scheduled marketing posts, email sends, and social content. A token reward campaign going live during a live exploit is a brand crisis stacked on top of a security crisis.

## Hour 1 to 6: On-Chain Disclosure and Partner Notifications

While the technical team works the exploit, comms has two parallel tracks running.

**Track 1: On-chain disclosure.** Publish the exploit transaction hash and the affected contract addresses in your next public update. This matters for two reasons. First, it shows you're not hiding the mechanics, which is the fastest way to lose community trust. Second, on-chain data is already public; naming it yourself signals confidence and control rather than concealment. Users need this to revoke approvals. Give them specific instructions: the exact contract to revoke, the tools to use (Revoke.cash, etherscan, or your own approval manager), and the steps to check their own exposure.

**Track 2: Direct partner notifications.** If other protocols hold your wrapped tokens, use your bridge, or have active liquidity positions dependent on your price feeds, they need to know before they see it on Crypto Twitter. Call, don't tweet. This is the category of communication most teams skip entirely. You need a pre-built contact list, security leads at 5 to 10 integration partners, before an exploit happens, not during it. If you're doing this cold during the crisis, you're already behind.

The on-chain forensics firms also get called during this window. Chainalysis, TRM Labs, and Halborn have incident response teams that work exploit recoveries. Getting them on retainer before a crisis is ideal. Engaging them within the first few hours of an exploit is the next best option. They are not just for law enforcement coordination; they also produce the kind of verified technical output that gives your subsequent statements credibility.

## Hour 6 to 24: The Structured Update and the Legal Constraint

By hour 6, you should have enough technical information to publish a substantive update. This is where most teams either recover or collapse.

The structured update includes: a factual timeline of what happened (block number, transaction hash, function exploited), the current scope of losses with an explicit caveat that numbers are still being confirmed, what the team has done in containment, what users should do right now, and the next milestone with a specific time attached.

What you do not include in any public statement before your legal counsel has reviewed the exploit scope: the word "compensation," a specific dollar figure for reimbursement, any language that admits negligence, or attribution of the attack to a specific actor unless law enforcement has made that attribution. I've seen teams post "we believe this was a whitehat" in the first three hours, then have to walk it back when it turned out not to be. Walking back a statement in a live crisis is worse than not making it.

The legal constraint is real but narrow. It mostly governs two things: how you describe the root cause (negligence vs. attack) and what compensation commitments you make publicly before understanding whether your treasury, insurance, or legal position can actually support them. Everything else (the technical facts, the containment status, the next update time) you can and should publish freely.

## Hour 24 to 72: The Journalist Briefing and the Preliminary Post-Mortem

At the 24-hour mark, if you haven't already, you need to brief 2 to 3 journalists who cover DeFi security. Not with a press release. With a call.

The reporters covering this beat at CoinDesk, The Block, and Blockworks work exploit stories differently than funding announcements. They're already reporting the story. The question is whether you're a source or a subject. If you call them before they publish their first piece, give them what you know, acknowledge what you don't, and tell them your next milestone, you become a source. If you go silent and they piece it together from on-chain data and community Discord screenshots, you become the protocol that went dark.

The briefing should be handled by the founder or a named comms lead, not a PR middleman reading from a sheet. Reporters can tell the difference. The message is simple: here's what we know, here's what we're doing, here's when you'll hear from us next, and here's my direct line if something breaks before then.

At 48 to 72 hours, you publish the preliminary post-mortem. Not a full root-cause report (that takes weeks), but a public commitment document that covers: the technical mechanism of the exploit, the current verified loss figure, the containment steps taken, the third-party security firms engaged, and the framework for user compensation, even if the specific amounts aren't finalized.

Euler Finance set the standard here. Their team imposed a communications blackout during the negotiation period after their $197 million exploit, a deliberately strategic choice that protected their ability to recover funds. It worked: the attacker ultimately returned the full amount. The lesson isn't "go dark": it's that every communications decision has a strategic rationale, and sometimes that rationale is "we can't say anything publicly while negotiations are live." The protocols that fail don't make strategic decisions; they just panic-post or vanish.

## The Mistakes That Accelerate TVL Exit

I see these across exploit responses, regardless of protocol size.

**Posting a compensation promise you can't honor.** "We will make all users whole" sounds reassuring in the first hour. If your treasury doesn't cover the losses and you don't have exploit insurance, that statement is a future legal and reputational problem. Say instead: "We are assessing all options for affected users and will publish a compensation framework within [X hours]." That's honest and it doesn't overcommit.

**The founder disappearing from X.** The community will interpret this as abandonment, regardless of whether you're heads-down on recovery. A 20-word update every 4 hours from the founder's own account costs nothing and signals that the team hasn't exited.

**Treating the post-mortem as a legal document instead of a trust document.** The legal team wants to minimize exposure. The community wants to understand what happened and why it won't happen again. The best post-mortems, like Euler's, are technically specific, avoid individual blame, and show exactly which control failed and how you're fixing it. Euler's post-mortem explicitly avoided naming individuals, instead identifying the missing health check in the donateToReserves function. That's the model: blameless toward people, specific about systems.

**Resuming normal marketing before the recovery is complete.** A token rewards campaign or a partnership announcement within a week of an exploit signals that you've moved on before users have been made whole. It's one of the fastest ways to permanently lose the community members who were on your side.

**Communicating through intermediaries only.** A statement from your PR agency or community manager is fine for routine updates. For an exploit, users want to hear from the team directly. If the technical lead or founder can't put their name on the updates, it reads as distancing. Distance is the wrong signal.

## The Decision Matrix: What Changes by Exploit Size

| Loss range | Journalist briefing | Legal review urgency | Compensation commitment timing |
|---|---|---|---|
| Under $5M | Optional, respond if asked | 24 to 48 hours | Can commit framework within 72 hours |
| $5M to $50M | Brief 2 to 3 key outlets within 24 hours | Immediate | Framework only until legal clears amounts |
| Over $50M | Proactive briefing within 12 hours | Immediate, bring in specialist crypto counsel | No public number until legal and treasury review complete |
| Bridge failure with downstream protocols affected | Briefing within 6 to 12 hours, notify partner protocols first | Immediate | Separate statements per affected ecosystem |

The size of the loss also changes your APAC comms obligations if you have significant Korean, Japanese, or Vietnamese user bases. Those communities get information fastest through local Telegram channels and local reporters, and they need translated updates, not just English posts. If you don't have a regional comms contact already, you'll be six hours behind the Korean Telegram mods who are already circulating their own narrative.

## What Transparency Actually Buys You

Protocols that publish thorough, technically credible post-mortems recover TVL faster than those that don't. This isn't sentiment: it's the mechanism by which capital returns. Users can't evaluate whether to trust you again if they don't understand what failed. The post-mortem is the document that makes re-depositing a rational decision rather than a leap of faith.

It takes years to build reputation and credibility. One wrong move and it's gone. But the inverse is also true: a well-run crisis response, one where the team was present, honest, and specific, genuinely does recover community trust. Euler relaunched as V2 after running 45 audits with 13 security firms over seven months. That's not a comeback story about the exploit. It's a story about what they did after it.

The 72-hour window doesn't close your recovery. It closes your chance to own the narrative. After that, you're responding to someone else's version of events. Get the comms right in the first three days, and the recovery story is yours to write.

---

If you're building a crisis comms protocol before you need it, or you're mid-incident and need a senior operator on the call tonight, [book a 30-min teardown with me](https://calendly.com/shilikajain/30min/).
$b100$
where slug = 'defi-exploit-communications-first-72-hours' and md5(body) = '55c3f1252a69db64a2c5213b4cf066fb';

update blog_posts set body = $b100$# Crypto KOL Waves: The Whisper-Tease-Shout Sequence That Actually Drives Wallet Activations

The whisper-tease-shout framework is not a new idea. Surgence Labs wrote it up cleanly; a handful of other agencies have borrowed the framing. What those write-ups skip is the operational layer: which tier posts in which wave, what the brief contains, how the KOL sequence meshes with the press embargo, and how you attribute a wallet activation back to a specific creator rather than to "the campaign."

That's what this post covers.

I've run influencer and KOL coordination for 50+ Web3 protocols across six years, including APAC activations across Korea, Japan, Vietnam, Singapore, India and the UAE. My network sits at 200+ vetted creators. The operational notes below come from that work.

## Why One Drop Doesn't Convert

The instinct on most launch teams is to synchronize everything: every KOL posts on the same day, the press release goes out at the same moment, the community manager pins an announcement, and the Discord lights up. It feels coordinated.

The problem is that a potential buyer who sees fifteen creators mention the same token in the same 12-hour window reads that pattern as a paid push, not organic interest. They're right. Noise without prior context doesn't convert.

I posted something similar after watching this play out repeatedly:

> crypto marketers will launch another massive marketing campaign but can't tell if the product they're marketing will actually bring adoption or not lol
>
> [Shilika Jain on X, 23 Dec 2024](https://x.com/Shilika_jain/status/1871071594686435356)

The three-wave model works because it mirrors how credibility actually forms. Wave 1 builds the frame. Wave 2 amplifies a launch that already has context. Wave 3 converts attention into committed community. Compress them and you lose the sequencing that makes the thing work.

## Wave 1: Whisper (T-72h to T-24h)

**Who posts:** 3 to 5 technical credibility anchors. Not the biggest follower counts on your list. The voices your target buyer set already trusts: a named protocol researcher, an ecosystem lead at a partner chain, the founder of a complementary project. These aren't paid impressions in the traditional sense; they are weighted-credibility posts that set the interpretive frame the rest of the launch lands inside.

**What they publish:** A genuine deep-dive. Thread analysis of the architecture. An honest take on what's interesting and what still needs proving. This content should feel like something the creator would have written unprompted.

This is why I have deep respect for creators who actually do the work:

> massive respect to influencers who research the f**k out of protocols! consumes a lot of time, energy and needs patience!
>
> [Shilika Jain on X, 12 Jan 2024](https://x.com/Shilika_jain/status/1745809725479170512)

**The brief:** Give Wave 1 creators an embargoed read of the whitepaper, tokenomics, and one exclusive piece of context the public doesn't have yet. Make the brief a conversation, not a script. Creator briefs that require draft-by-draft approval slow the campaign and dilute the creator's voice. Tell them the narrative you're building; let them express it in their own register.

**The embargo coordination:** Wave 1 posts sit under a soft embargo until T-24h. That gives the press cycle room to run first if you have a CoinDesk or Cointelegraph exclusive dropping at T-0. The credibility anchors confirm what the journalists just published; the journalists don't get undercut by influencer posts that went live 48 hours early.

**APAC note:** If Korea is in scope, the Wave 1 brief needs to be ready in Korean. Korean retail crypto is among the most narrative-sensitive audiences in the world, and Korean outlets on BloomingBit or TokenPost won't pick up a translated English release and call it a scoop. Budget 7 to 10 working days of lead time for Korean localization before Wave 1 even begins.

## Wave 2: Tease (T-24h to T+4h)

**Who posts:** 10 to 20 mid-tier creators, 50K to 500K followers, in the niches adjacent to your protocol. This is where most "micro vs macro" content on the internet starts and stops: engagement rate is more important than follower count. A DeFi educator with 80K highly engaged followers in your sector is worth more at this wave than a general crypto account with 400K passive followers.

**What they publish:** Comparative analysis, AMA previews, specific product mechanics explained. The content should be specific but incomplete. Signal that something is happening; leave questions that turn into signups and pre-deposits.

**Timing:** Posts stagger across the 24-hour window before launch, not all at once. A follower in Seoul who sees a creator they trust post about the project at 09:00 KST, then sees a different creator pick it up at 14:00 KST, reads that as two independent validations. That's the effect you're building.

**What to brief for Wave 2:**

- The core narrative in one sentence (not the tagline, the actual differentiating claim)
- Two or three specific product mechanics they can explain in their own words
- The launch date and how to participate
- A unique tracked claim URL or referral code: one per creator, set up before the first post goes live
- Disclosure language that matches jurisdiction requirements (SEC in the US, MiCA in EU, FCA in UK)

**Common mistake:** Teams brief Wave 2 with the same document they gave Wave 1. The audiences are different. Wave 2 is broader and needs more context on why the product matters to a mid-level DeFi user, not just a protocol architect.

## Wave 3: Shout (T+0 to T+7d)

**Who posts:** The full roster. Launch-day broad activation from the macro accounts you've been holding back, plus 5 to 10 long-form creators who ship deep-dives in the seven days after launch.

**The launch-day layer:** One or two macro accounts (200K+ followers) post at or within hours of TGE. The macro post's job is reach, not depth. It should link out to the Wave 1 credibility content and the Wave 2 comparative threads that are already live. It confirms what the buyer has already been hearing; it doesn't arrive cold.

**The post-launch deep-dive layer:** YouTube creators with research-grade audiences, podcast appearances tied to the launch, one or two long-form Substack pieces that anchor the citation graph. This content is what AI engines index against in the weeks after launch. If you skip Wave 3's long-form layer, you get a price chart with no tail.

**The brief for Wave 3:** Macro accounts need a punchy one-liner, the tracked link, and the disclosure. Long-form creators need the full technical brief plus the Week 1 performance data if you can share it. Showing early wallet activation numbers in the creator brief converts a "here's a sponsored post" into "here's a narrative with proof."

## On-Chain Attribution: The Part Everyone Skips

Most KOL campaigns are measured on vanity metrics: likes, retweets, impressions. None of those map to wallet activations or protocol revenue. The attribution setup has to be live before the first Wave 1 post goes up.

The mechanics that work:

- **Unique tracked claim URLs per creator.** Routes the click to a landing page with a source parameter attached, captures wallet address and downstream on-chain behavior. Tools like Cookie3 and Spindl handle the off-chain-to-on-chain stitching.
- **Referral codes for CEX-adjacent campaigns.** If the launch includes an exchange listing, mirror the attribution into the exchange's native referral program. The CEX handles the conversion event reporting.
- **Wallet cohort analysis after the campaign.** Pull wallets that interacted with the protocol during the campaign window on Nansen or Dune. Cross-reference against the referral-tracked wallets to catch assisted conversions: buyers who discovered the project through a KOL post but claimed via a different path.

The metric that matters is cost per qualified wallet: total KOL spend divided by wallets that completed their first meaningful on-chain action. Not cost per click. Not cost per impression. First action.

A useful secondary metric: retention cohort by creator. Which creators drove wallets that came back in 30 days versus wallets that connected once and vanished? The creators who drive retained users are the ones to lock into your next campaign under long-term deal structures.

## The APAC Layer Most Western Campaigns Miss

Running the whisper-tease-shout sequence exclusively on English-language X and YouTube leaves a significant portion of the addressable crypto retail market untouched. Korea alone accounts for roughly 50% of APAC crypto-native traffic. Japan's on-chain value received grew over 100% in the twelve months to mid-2025.

The APAC KOL market is structurally different from English CT:

- Korean coverage runs through Kakao channels, Naver blogs, and Korean crypto YouTube, not just X
- Japanese coverage runs through BloomingBit, TokenPost Japan, and CryptoTimes JP
- Korean and Japanese audiences are skeptical of obvious promotion; Wave 1 credibility anchors matter more here than anywhere else

Korean KOL rates for comparable audience size run 20 to 40% above US baseline because the content must be native-language and because the audience is highly retail-active. Budget accordingly. A Wave 2 mid-tier Korean creator costs $1,000 to $8,000 per coordinated post; a Japanese macro account runs $10,000 to $30,000. Those are separate line items from your English CT roster.

There's also a compliance wrinkle. Singapore's MAS has explicitly restricted crypto marketing to the general public, including through social media influencers. A KOL campaign that works across Southeast Asia is a compliance problem the moment it reaches Singapore audiences if it isn't structured correctly. Know the jurisdiction of every creator's primary audience before you brief them.

## Vetting Before You Brief

None of the above sequencing works if the creators are inflating their metrics. Bot rates on mid-tier crypto accounts are not a fringe problem. A credible vetting process checks:

- Engagement rate on the last 20 posts (under 0.5% on an account above 100K followers is a flag)
- Comment quality: real communities ask technical questions, push back, and argue. Comments that read "Great project!" in a row are a signal.
- Follower growth curve: organic accounts grow steadily with spikes tied to viral content. A sudden gain of 50,000 followers with no obvious catalyst is a flag.
- On-chain wallet verification: ask the creator to sign a message from a wallet with transaction history. Creators who stall or send a fresh empty wallet usually don't have a real on-chain audience.
- Past campaign performance: referral link click-through data and wallet counts from recent campaigns. Creators who won't share this data typically don't have data worth sharing.

Vetting takes 3 to 7 days per creator when done manually. At 200+ vetted relationships built over six years, the time-to-brief is materially shorter because the due diligence is already done.

## What the Brief Template Actually Contains

Every creator brief, regardless of wave, has the same five sections:

1. **The narrative in one sentence.** Not marketing copy. The actual differentiating claim: "A perp DEX where idle margin earns yield" is useful. "The most innovative DeFi solution" is not.
2. **Product mechanics in plain language.** Two to three specific things the creator can explain in their own words.
3. **The participation mechanic.** What should their audience do: connect wallet, join waitlist, pre-deposit, claim allowlist.
4. **The tracked link or referral code.** One per creator. Non-negotiable.
5. **Disclosure language.** Jurisdiction-specific, written out in full. Don't leave this to the creator's interpretation.

The wave dictates depth, not structure. Wave 1 gets the full technical brief plus embargo context. Wave 2 gets narrative and mechanics. Wave 3 macro gets a punchy one-liner and the tracked link. Wave 3 long-form gets the full technical brief again plus Week 1 performance data.

## Two Launch Scenarios

**Pre-seed or early-stage protocol:** Skip the macro accounts entirely. Run Wave 1 with 3 technical credibility anchors (protocol researcher, adjacent ecosystem lead, one respected educator in your sector). Run Wave 2 with 8 to 12 mid-tier creators. Skip Wave 3's macro layer and put the budget into two or three long-form deep-dives that build the citation graph. Total creator spend in the $15K to $40K range. Attribution setup via Cookie3 or Spindl. Expect 300 to 800 attributed wallet activations if the product is real.

**Series A / TGE with exchange listing:** Run all three waves with the full roster. Wave 1: 5 credibility anchors under embargo. Wave 2: 15 to 25 mid-tier creators across English CT, Korean, and at minimum one more APAC market. Wave 3: 2 macro posts at TGE window, 7 to 10 long-form deep-dives over the following week. Budget $80K to $200K+ depending on tier and region. Attribution setup must include exchange native referral program integration. Expect wallet activations in the thousands if the narrative holds.

The difference between those two scenarios isn't ambition. It's the available narrative surface area and the size of the audience that already knows the project exists. Spending macro KOL budget on a project with no prior community is how you generate an impressive launch-day spike and a 90% chart decline in Week 2.

---

If you want a read on whether your current KOL plan matches your launch stage and narrative, book a 30-min teardown. I'll tell you what's missing before the first brief goes out, not after.

[Book a 30-min teardown with Shilika](https://calendly.com/shilikajain/30min/)
$b100$
where slug = 'crypto-kol-waves-whisper-tease-shout' and md5(body) = '4bc6ab87b10cae8bed0b037df2d2b0b5';

update blog_posts set body = $b100$# Crypto Exchange Listing PR: The 30-Day Sequence Before Trading Goes Live

You've got confirmation. Trading opens in 30 days. Most founders either freeze or fire off a press release two hours before the announcement drops. Both are wrong.

A tier-1 exchange listing is the single most newsworthy moment most crypto projects will have in a calendar year. Binance, OKX, Coinbase: these names carry editorial weight with reporters at CoinDesk, The Block, and Blockworks, and they create a window where journalists are genuinely receptive. That window is narrow, roughly 72 hours wide at maximum potency. Whether you land a feature or a two-line news brief depends entirely on what you did in the 28 days before that window opened.

I've run listing PR across dozens of protocols, from DePIN infrastructure to NFT chains to DeFi rails. What follows is the actual sequence, week by week, with the decisions that move outcomes and the mistakes that flatten them.

---

## Why most listing PR fails before it starts

The majority of projects treat the listing announcement as the beginning of PR. It's the end. By the time the announcement drops, every piece of media infrastructure should already be in place: embargo relationships confirmed, press kit approved, regional assets translated, KOL briefs drafted.

If you're starting media outreach the week of the listing, you're calling journalists who don't know the project and asking them to turn a feature in 24 hours. They can't. You get a brief, if you get anything at all.

The 30-day window exists precisely so you don't have to do that.

---

## The four-week operating sequence

### Week 1: Lock the internals before anything goes external

Nothing published, everything prepared. This week is coordination work, not media work.

**Confirm embargo parameters with the exchange.** Before any journalist is briefed or any press release is drafted, get three things in writing from your exchange liaison: the exact embargo end time in UTC, the approved copy and token name the exchange will use in its own announcement, and whether the exchange's official channels will tag the project when they post. Binance, OKX, and Coinbase all publish content guidelines for listing partners. Read them. Violating them doesn't just risk a pulled announcement; it can damage the relationship at the moment it matters most.

**Build the press kit.** This means the announcement press release, a founder quote that frames the listing as proof of a thesis rather than just good news, a trading FAQ covering pairs and deposit timelines, and a two-page background brief on the project for journalists encountering it for the first time. That last document is often skipped. Don't skip it. A reporter writing a feature needs context to write more than a rehash of your press release. Give them the context.

**Set the narrative frame.** A listing announcement is news because a fact happened, not because the token is going up. Every piece of material in this press kit needs to be free of price projections, return comparisons, and language implying the listing is a price catalyst. "Undervalued," "100x potential," "moon": strip all of it. Position this as a liquidity and accessibility event. That's what will pass legal review and what tier-1 journalists will actually run.

---

### Week 2: Build the tier-1 embargo list and brief under NDA

This is where the PR work actually begins.

I've run hundreds of embargoes, and the rule is consistent: fewer outlets briefed, better coverage produced. For a Binance, OKX, or Coinbase listing, you're offering one tier-1 outlet a 24-to-48-hour exclusive. That outlet is typically CoinDesk, The Block, or Blockworks. The choice depends on your project's vertical: for a DePIN or infrastructure token, the reporters on the infrastructure and tokenomics beat at CoinDesk and The Block are the right targets. For a gaming or consumer token, Decrypt and Blockworks have more relevant readerships.

What you're offering in the embargo pitch is not the listing itself but the story around it. What does this listing unlock for the project? What milestone does it validate? Where is the team going next? A reporter who receives a full exclusive briefing in Week 2 has 10 to 14 days to research, ask follow-up questions, and write a rich feature. The result is substantively different from a news brief filed against a wire release.

The background brief you built in Week 1 goes in this pitch. So does a direct offer of founder access for a 30-minute call. Reporters who have time prepare better questions. Better questions produce better features. Better features run higher in the outlet's editorial hierarchy.

As I said on X after watching another listing disappear into the noise:

> my biggest flex is that when i see a launch announcement i can exactly tell you which publications + reporters would cover that first.
>
> [Shilika Jain on X, 29 Sept 2026](https://x.com/Shilika_jain/status/2104764974526808223)

That's relationship capital. It takes years to build and about two weeks to deploy at listing time. If you're starting from zero, a fractional PR operator with those relationships already warm is worth the cost.

**Brief two to three additional tier-2 or regional outlets simultaneously** under the same embargo agreement. For a global listing with APAC traction, this is where you add Cointelegraph, BloomingBit (Korea), TokenPost (Korea), CryptoTimes JP (Japan), or Inc42 (India), depending on your strongest market. These outlets get the same press kit, the same embargo date, but no exclusive framing. They publish when the embargo lifts, alongside the tier-1 feature.

---

### Week 3: Seed context without revealing the listing

This week runs parallel to the embargo management and has one job: make sure the project is findable before announcement day.

Any journalist assigned to write a listing story will spend 15 minutes searching the project name. If the only results are self-published press releases and a whitepaper, they have nothing to reference. If they find two or three independent editorial pieces, a founder op-ed, and a podcast interview, they can build context and write more ambitiously.

For the RARI Foundation mainnet launch I ran in early 2024, we had this foundation in place before the announcement. CoinDesk, Cointelegraph, and The Block all ran independent features in the same week because each reporter could verify the project's activity independently. A single sharp narrative framing, royalties guaranteed at the chain level, made every placement point in the same direction without coordination. That's what good pre-listing seeding produces.

If you don't have existing coverage, Week 3 is where you place two or three short, factual stories about product milestones through whatever editorial relationships you have. Not hype pieces. Just verifiable updates that create a searchable footprint: a new partnership, an on-chain metric, a technical upgrade.

**Founder commentary placements** are particularly useful here. Pitch the founder as a reactive source on any macro story touching the project's vertical. A new DePIN report drops? Your founder has a data point. A major exchange adds support for a new asset class? Your founder has context. Reactive commentary gets into CoinDesk and Decrypt without the project being the news itself.

---

### Week 4 (T-7 to T-0): The launch sequence

This is the operational window. By the time you're here, the heavy lifting is done. Now it's execution.

**T-7 days:** Confirm with every embargoed outlet that they're still publishing on the agreed date. Confirm the embargo end time with the exchange one more time. Finalize KOL briefs.

**T-72 hours:** Brief KOLs under written embargo. This is not optional. Front-running a Binance listing, even accidentally, is a compliance and reputational risk for both the project and the KOL. The brief should include the UTC embargo timestamp, approved talking points, and an explicit instruction that nothing goes live before that timestamp. Stagger the KOL activation plan across the first 48 hours after the embargo lifts rather than firing everything simultaneously. A wave of identical posts at the exact listing moment reads as coordinated and gets discounted.

**T-48 to T-24 hours:** Wire distribution is queued. Community assets, the Discord announcement, the Telegram post, the blog post with full FAQ, are all drafted and staged. The founder's X post and LinkedIn post are pre-approved and scheduled. None of this goes live until the embargo lifts.

**Announcement day:** The tier-1 exclusive breaks. Within the same hour, the press release goes out on wire and to the simultaneous tier-2 list. Community channels go live. KOL Wave 1 posts in regional time zones. Regional translated releases deploy in Korean, Japanese, or whichever markets matter for the project. The founder is available for any reporter clarifications that come in the first 24 hours.

**T+24 to T+48 hours:** Follow up with every outlet that received the embargo brief. Thank reporters who ran the story. Offer follow-on angles for any who didn't file yet. Check secondary syndication across CoinMarketCap, Binance Square, and Google News to understand amplification reach.

---

## The mistakes that kill listing PR

**Starting the media relationship at T-7.** Journalists need 10 to 14 days to turn a feature. At T-7, the best they can do is a news brief. Longer relationship equals longer, better coverage.

**Sending the same press release to 40 outlets simultaneously.** I see this constantly. Mass distribution without exclusivity produces commodity coverage: short, generic, and cited by nobody. Pick one outlet for the exclusive, brief two or three additional outlets under embargo, and let everyone else pick up the wire release after the lift.

**Treating the listing as the full story.** The listing confirms something. What does it confirm? If you can't answer that in one sentence, the press release isn't ready. "Token X listed on Binance" is not a story. "Token X lists on Binance as DePIN infrastructure reaches 400K active nodes" is.

**Skipping the regional assets.** An OKX listing without Korean and Japanese materials is a significant coverage gap. BloomingBit, TokenPost, and Cointelegraph Korea have active readerships that don't read English-language releases. Translating isn't enough; re-angling is the step most projects miss. What's the most relevant trading pair for the Korean market? Which regional fund or partner can be mentioned? Those questions need answers before regional materials go out.

**KOL front-running.** Briefing KOLs without a written embargo agreement and clear UTC timestamp is how listings become compliance incidents. At minimum, this is embarrassing. At worst, it triggers exchange scrutiny.

---

## The exchange co-announcement opportunity

One thing most PR guides skip entirely: the exchange's own channels are a distribution asset.

Binance's official X account has over 10 million followers. OKX and Coinbase have comparable reach. Most projects never ask whether the exchange will tag the project in its own announcement post. The answer is often yes for projects with clean narratives and positioning the exchange is proud to co-amplify. Ask your exchange liaison explicitly and ask early, before announcement week.

If the exchange does co-post, coordinate the timing exactly. Your posts, your KOL wave, and the exchange post should all land within the same 2-hour window on announcement day to create maximum signal density in the feeds.

---

## Two scenarios: funded round vs. pure listing

The 30-day sequence above applies to a standalone exchange listing. If the listing coincides with a funding announcement, the media strategy changes.

For a dual announcement, the funding round is the exclusive angle. The listing is the supporting proof of momentum. Offer CoinDesk or The Block an exclusive on the funding round, with the listing as material context. The headline becomes "Protocol X raises $20M ahead of Binance listing" rather than two separate, weaker stories. One rich story with two data points beats two thin stories that compete for the same reporter's bandwidth.

For a project doing its first major listing post-TGE, the listing is evidence that the original token launch thesis held. That's the angle: what has changed on-chain since the TGE, and why does a tier-1 exchange listing now make sense? That framing gives reporters a narrative arc rather than just a fact.

---

## What the 30 days actually costs you if you skip it

I'm going to be direct: I have watched more than one project get confirmed for a Binance or OKX listing and still land zero tier-1 editorial coverage because the PR run-up was treated as an afterthought.

The listing happens regardless. The price pops for 48 hours regardless. But without the editorial foundation, there's no feature in CoinDesk to send to institutional contacts, no The Block piece to reference when the next exchange partnership conversation comes up, and no credibility layer that persists past the first price cycle.

Token listings that compound into durable awareness all have one thing in common: the media infrastructure was built before anyone could see the listing coming.

If your trading start date is already on the calendar and you're reading this with fewer than 30 days left, you can still run a shortened version of this sequence. Brief one outlet under a 48-to-72-hour embargo. Prioritize that over everything else. One good feature beats ten wire pickups.

If you have more runway, use all four weeks. The difference shows up in the coverage quality, the follow-on story opportunities, and the way your project is positioned when the next announcement cycle starts.

---

**Book a 30-min teardown with Shilika** to map out the specific outlets, embargo timing, and KOL sequence for your listing: [https://calendly.com/shilikajain/30min/](https://calendly.com/shilikajain/30min/)
$b100$
where slug = 'crypto-exchange-listing-pr-30-day-sequence' and md5(body) = '83801f1090af5ce3614c68b859110208';

update blog_posts set body = $b100$# Turn Your Crypto Raise Into a 6-Month Media Footprint

Most founders treat a funding announcement as the finish line. You close the round, coordinate the embargo, watch four Cointelegraph articles and a Blockworks brief publish on the same Tuesday morning, then go back to building. Two weeks later the coverage has scrolled off everyone's feed and journalists have stopped replying.

That's not a PR campaign. That's a press event. They're different things.

I've run funding announcement campaigns for Web3 teams ranging from a $4M metaverse gaming round to later-stage infrastructure raises. The pattern I see again and again: founders who treat the close date as the culmination get a one-day spike. Founders who treat the close date as the starting pistol for a six-month media runway end up with compounding authority, a warmer pipeline, and journalists who pitch *them* by month four.

This post maps the full sequence. Use it whether you're planning the campaign yourself or deciding what to ask from a PR operator.

---

## Why the announcement day is the least important day

Announcement day produces volume, not authority. A coordinated embargo across CoinDesk, The Block, Decrypt, and Blockworks on a Tuesday morning will get you four solid pieces of coverage. That's real, and it matters. But all four stories are reporting the same fact: the amount, the lead investor, the use of funds. Every competing raise from the same week gets the same coverage shape.

What actually builds category authority is the interpretive layer that comes after. The op-ed that argues *why* your round reflects something true about the market. The podcast interview where the founder unpacks what the investors saw. The analyst briefing that seeds the idea with Messari or Delphi Digital before they write their sector report. The 90-day update that proves you're deploying capital, not hoarding it.

None of that happens automatically. It requires a deliberate sequence. Here's what that sequence looks like.

---

## Phase One: Narrative seeding (T-8 weeks to T-4 weeks before close)

The biggest mistake in funding PR is starting the media relationship the week before you announce. By that point you're a cold pitch. The journalists covering your sector have heard the "we're raising and we'd love to tell you about it" email a hundred times.

I posted something about this dynamic years ago that still holds:

> gonna build a massive database of publications covering topics related to web3, blockchain, and crypto  
> will deep dive into web3 niches, PR narratives, mainstream finance  
> it will be a comprehensive list including regional publications & mainstream medias
>
> [Shilika Jain on X, 10 Jul 2023](https://x.com/Shilika_jain/status/1678298645811310592)

The reason I was building that database wasn't to spam journalists. It was to understand which reporters were covering which angles, so I could be useful to them weeks before I needed anything. That's the posture that makes the eventual pitch work.

Starting 6 to 8 weeks before close, brief 3 to 5 journalists at tier-1 outlets as a *source*, not as a subject. You're offering market data, sector commentary, and informed perspective on what you're seeing in the space. No announcement yet. No press release. Just the founder being a useful signal in the reporter's inbox.

When the raise closes and the embargo goes out, those reporters already know who you are. You're not a cold pitch. You're someone they've spoken to.

---

## Phase Two: Pre-close thought leadership (T-4 weeks to T-1 week)

With the round nearing close, start the content layer that frames the announcement before it arrives.

A well-timed op-ed pitch to CoinDesk Opinion, Cointelegraph, or Decrypt is not an announcement vehicle. It's a category argument. The topic should be something you believe about the market that a journalist wouldn't just write for you on their own: a counter-intuitive take on your sector, a structural observation about where capital is flowing, a claim about what breaks at scale that others in the space are too polite to say.

The Fluence campaign is the cleanest example I can point to. Tom Trowbridge's CoinDesk Opinion byline positioned DePIN as a serious category before most mainstream coverage was using the term at all. That piece wasn't announcing anything. It was claiming intellectual territory. When the Fluence funding news landed, there was already a named, bylined framework for readers to slot it into.

That's the sequencing play: the op-ed lands 2 to 3 weeks before the raise, the raise lands into an audience that already has context.

A few hard rules on op-ed pitching for this phase:

- CoinDesk Opinion and Cointelegraph Expert Take want argued positions on regulation, market structure, or protocol design. They reject announcements outright.
- Pitch the op-ed as a standalone piece with no mention of the upcoming raise. The raise doesn't justify the pitch; the argument does.
- Target a 800 to 1,200 word length. Shorter signals you don't have enough to say; longer tests editorial patience.

Also in this window: line up 1 to 2 podcast bookings. A founder interview on a respected sector podcast releases in the same week as the announcement or just after, extending the coverage moment without a second press release.

---

## Phase Three: Embargo and announcement day (T-72h to Day 0)

I've written separately about [which journalists accept crypto news under embargo](/blog/which-journalists-accept-crypto-news-under-embargo) and how to structure the pitch. The short version:

- Offer your top 1 to 2 outlets a genuine exclusive window: a call with the CEO and the lead investor, differentiated angles, 48 to 72 hours to research and write. A journalist who has been briefed and has had time to research writes a substantially richer piece than one who receives a press release at 9 AM and needs to file by noon.
- Brief a middle tier of 4 to 6 outlets simultaneously with the embargo package: full data (round size, investor names, use of funds, product metrics, any proprietary data that gives context), and a clear embargo time in the subject line.
- Lift on Tuesday to Thursday, 8 to 10 AM ET. Monday inboxes are full; Friday afternoon is where news goes to die.

What almost no one does: prepare differentiated angles for different reporters. The Blockworks reporter cares about institutional signal and the investors on the cap table. The Decrypt reporter wants the technology bet. A CoinDesk reporter covering policy will care about what the round means for regulatory positioning if that's relevant. Don't send the same pitch to all six.

On announcement day itself: wire distribution goes live simultaneously with the embargo lift, the founder posts on X, the community Discord gets the news through a proper founder AMA thread, not just a one-line announcement. The AMA matters because the questions and answers generate authentic quotes and community content that journalists surface in follow-up pieces.

---

## Phase Four: The 30-day follow-on (Days 1 to 30)

This is where 90% of funded founders go quiet and lose all the momentum they built. Don't do this.

In the first 30 days post-close, you have four natural follow-on opportunities that each generate a distinct media moment:

**Wave two analyst pieces.** Messari, Delphi Digital, and sector-specific newsletters often write interpretive pieces on rounds in the week or two after announcement. These are not press releases; they're independent analysis. But you can brief the analysts proactively the moment your embargo lifts, giving them your data and founder access before they file. A Messari piece citing your metrics has a different kind of credibility than an announcement placement.

**The podcast moment.** The 1 to 2 podcasts you booked in Phase Two publish in this window. Sequence them so one drops in week 1 and one in week 2 or 3. Each one gives existing community members a new artifact to share, and each one introduces the project to an audience that missed the announcement day coverage.

**The follow-on byline.** A second op-ed isn't a second announcement. It's a deepening of the argument. If the first piece planted a claim about the market, the second piece can test it against a recent data point, a competitor's move, or a policy development. CoinDesk Opinion accepts repeat contributors. So does Cointelegraph Expert Take.

**The community milestone post.** At day 30, publish a "30 days after the announcement" update: what the capital is being deployed toward, what early signals the team is seeing, what changed in the market since the close. Share this on X, link it in Discord, and email it to your investor list. It generates a second wave of social sharing without requiring a new announcement.

---

## Phase Five: Months 2 to 6: the compounding cadence

This is the part the competing agency pitch decks don't show you, because it requires actually running the account, not just delivering a launch package.

The pattern I use with clients is a monthly earned media beat with a rotating angle focus:

| Month | Angle focus | Primary vehicle |
|---|---|---|
| 1 | The raise rationale, category context | Announcement coverage, CoinDesk op-ed |
| 2 | Technical progress, what got built first | Tier-2 feature, founder podcast |
| 3 | Market validation: data, partners, traction | Tier-1 exclusive, analyst briefing |
| 4 | Thought leadership, sector position | Second op-ed, speaking placement |
| 5 | Community and ecosystem growth | Regional press, developer media |
| 6 | 6-month milestone and next catalyst | Tier-1 exclusive, newsletter feature |

Each month has one primary placement target, one secondary, and one owned-channel output that keeps the story visible in between. The principle is that you're always in the feed of the 10 to 15 journalists who matter most for your sector, not because you're flooding them with press releases, but because you're being a credible source on the topics they're already covering.

One thing I said early in my work that I still believe:

> the only web3 companies that should do PR:  
> - who understand what PR actually is (earned v/s paid)  
> - who understand how to create a long term narrative & build a brand  
> - who understand that PR is news heavy  
> - who understand that web3 PR is different than Web2
>
> [Shilika Jain on X, 19 Jan 2024](https://x.com/Shilika_jain/status/1748365003508318305)

The "news heavy" point is the one that trips up founders in this phase. Months 3, 4, and 5 don't have a funding announcement to anchor to. You need to find or create news: a product milestone, a partnership that has real content behind it, a dataset from your protocol that a journalist can build an independent story around, or a newsjacking moment where your technology is directly relevant to something breaking.

If you can't find news, you manufacture thought leadership. If you can't manufacture thought leadership, you're probably not deploying the capital fast enough to have anything to say.

---

## What this looks like for different raise profiles

**Sub-$5M seed:** Don't expect tier-1 coverage at announcement unless you have a remarkable founder background or a genuinely novel technical angle. Use the round to seed relationships rather than chase coverage. Focus the six-month runway on founder profiling and category positioning so you're known when the Series A arrives.

**$5M to $20M Series A:** This is the tier where embargo coordination to 4 to 6 tier-1 outlets is realistic. One CoinDesk or The Block exclusive, plus a wider release. The six-month play focuses on analyst briefings, founder op-eds, and 2 to 3 podcast placements.

**$20M+ Series B and above:** The announcement itself is more likely to get mainstream finance coverage alongside crypto. Bloomberg, Fortune Crypto, Forbes. The follow-on cadence shifts toward institutional narrative: Gartner briefings, Forbes contributor pieces, speaking at Consensus or Token2049 where the announcement can be reinforced in person.

---

## The one thing that kills this entire sequence

Treating the PR function as a launch task rather than a retainer relationship.

A single-event announcement package delivers the Tuesday morning coverage and then stops. The analyst briefings, the wave-two op-eds, the monthly earned beat, the relationship maintenance with the reporters who covered you on day one: all of that requires someone who is embedded in the account month over month.

This is the specific case for fractional embedded PR versus a launch package. A launch package optimises day zero. An embedded operator optimises the 180-day window where category authority actually gets built.

The founders I've seen compound their coverage most effectively are the ones who stop thinking about PR as "getting coverage" and start thinking about it as "building a public record that reflects what we actually believe about the market." The funding announcement gives you the opening. Everything after is how you use it.

---

*Book a 30-min teardown with Shilika to map out your announcement sequence and the 6-month runway that follows: [calendly.com/shilikajain/30min](https://calendly.com/shilikajain/30min/)*
$b100$
where slug = 'crypto-fundraise-6-month-media-footprint' and md5(body) = '0c83198bad7ddc1435bb005c27a15fc3';

update blog_posts set body = $b100$# Community Trust After a Web3 Crisis: The 90-Day Sequence

Surviving a Web3 crisis and rebuilding from one are two completely different jobs. You might get through the first 72 hours with a statement, an on-chain proof-of-funds thread, and a founder AMA. The news cycle moves on. Your community does not.

The people still in your Discord, still holding your token, still watching your X account: they watched how you behaved under pressure. They know what you said, how fast you said it, and whether you disappeared afterward. What you do over the next 90 days either confirms their decision to stay or vindicates the ones who already left.

I pulled together this sequence after working through crisis comms across multiple Web3 protocols. The pattern that fails is almost always the same: a credible initial statement, followed by silence for three weeks, followed by a "we're back" post that the community correctly reads as premature. The pattern that works has six moving parts across three phases. None of them are optional.

Back in late 2022, amid the FTX collapse and the Genesis and Gemini fallout, I wrote this:

> Transparency is the key to successful web3 business. Medias have emerged as the strongest source of truth this season.
>
> [Shilika Jain on X, 18 Nov 2022](https://x.com/Shilika_jain/status/1593473255125397504)

That observation holds even more in 2025 and 2026. Communities have on-chain analysts, wallet trackers, and ZachXBT-style investigators dissecting your treasury in real time. Opacity is not a viable option. What follows is the comms sequence for founders who already know that.

## Days 1 to 7: Presence Over Polish

The single most important thing you can do in week one is stay visible. Not with polished press releases. Visible means the founder is posting daily, the core team members are named and active, and every meaningful decision being made gets narrated in public.

This is not about damage control. It is about demonstrating that the operation is still running. When communities fill silence with speculation, that speculation is always worse than the truth. The truth (even if it is "we don't have the full picture yet, here's what we know at 6pm UTC") is better than nothing.

Specific commitments in week one that matter:

- A dedicated incident page on your domain. Not just a Discord pin or a tweet thread. A URL you can link to forever that has the timeline, the known facts, the amount affected, and the next update time.
- A stated update cadence: "We will post an update every 48 hours until this is resolved." Then actually do it.
- The founder on camera. A 10-minute Loom or a recorded call where a real person looks into a lens and explains what happened. The community can smell a statement drafted by committee. A founder who shows up in person signals something different.

What not to do in week one: publish a legal-reviewed statement full of hedged language and zero accountability. Communities read those as "the lawyers got involved." That reading is always accurate and never helps.

## Days 8 to 30: The Transparency Report

By day 8, you need a format for your transparency reporting and you need to commit to it publicly. The format matters less than the consistency. I've seen protocols recover with Notion docs, Substack posts, and governance forum threads. What doesn't recover is the project that publishes one detailed update and then nothing for five weeks.

A transparency report in this context has four components:

**1. What happened.** A clear, non-hedged account of the incident. If it was an exploit, say how much, which contracts, and what vector. If it was a governance failure, say who made which decision and when. Vague incident descriptions read as cover-ups, even when they aren't.

**2. What you've done since.** Specific actions. If you paused the contract, say which one. If you brought in an external security firm, name them. If you changed the multi-sig threshold, show the on-chain transaction hash.

**3. What you're doing next.** A specific timeline. "We will complete the security audit by [date]" outperforms "we are committed to security" by a measurable margin. One of the clearest signals of a recovery-trajectory project versus a collapse-trajectory project is whether their communications are time-bound.

**4. Treasury status.** A publicly verifiable snapshot of the treasury. Wallet addresses, balances, vesting schedules if relevant. I've seen MANTRA publish wallet addresses and token holdings after the OM crash specifically to address insider trading allegations. That level of granularity felt excessive to some; to the community and to journalists covering the story, it was exactly what was needed.

The cadence I'd suggest: weekly updates for the first 30 days, bi-weekly through day 60, monthly from day 61 onward. Every update goes in the same place. The URL doesn't move.

## Days 15 to 45: The Independent Audit

You need third-party verification. An internal post-mortem is useful for your team. It does nothing for your community's trust, because the party doing the assessment has an obvious conflict of interest.

Commission an external security firm to audit whatever failed. If it was a smart contract exploit, get a code audit from a credible firm and publish the full report, not a summary, the report. If it was treasury mismanagement, bring in a third-party financial auditor and publish the findings. If it was a governance or access-control failure, get an organizational security audit.

The credibility of the auditor matters. A firm the community has heard of carries more weight than an unknown consultancy with "blockchain security" in its name. This is not the moment to optimize for cost.

Publish the audit result regardless of what it says. A report that surfaces additional vulnerabilities, handled transparently, does more for community trust than a clean-bill-of-health from a firm nobody has heard of. The community will find the other vulnerabilities anyway.

## Days 30 to 60: Structural Changes and Treasury Actions

Whatever structural change the crisis implied, you need to make it visible and verifiable between days 30 and 60. New multi-sig signers added to the contract. A bug bounty program launched with a funded pool. A vesting schedule extension that keeps team tokens locked longer. A new independent board member or advisor who has real authority, not just a name on a website.

Token buybacks as a trust signal are a separate conversation and they need to be treated carefully. A buyback announced two weeks after a crisis can read as an attempt to prop the price rather than a genuine commitment to the ecosystem. Done right (funded from protocol revenue, disclosed in advance, with a public on-chain execution schedule) a buyback signals that the protocol has real economic activity and is choosing to return value to the community rather than hold it in treasury. Done wrong, it looks desperate.

A few things that make buybacks land as a trust signal rather than a price manipulation play:

- They're funded from protocol revenue, not from a new token allocation
- The execution is on-chain and verifiable, not "we bought X tokens" with no proof
- They're announced before execution, not used to explain a token price pump after the fact
- The scale is proportionate. A protocol with $5M in monthly revenue announcing a $50K buyback reads differently than one announcing $50K with no revenue

Vesting changes are often more impactful than buybacks and less complicated. Extending team and investor vesting periods post-crisis signals that the people running the protocol are not looking for an exit. It's an alignment signal. The community can verify it on-chain.

## Days 45 to 75: Community Calls

Not one community call. A series. At least once every two weeks through this phase, and ideally weekly.

The format matters. An AMA in Discord where you read pre-submitted questions and skip the hard ones will be noticed and punished. The calls that rebuild trust are ones where:

- The founder is present, not a community manager proxy
- Questions are taken live, not pre-screened
- Difficult questions get answered directly, even if the answer is "we don't know yet"
- Specific people on the team are named and take ownership of specific workstreams in public

I've seen community calls become the turning point in a recovery arc. A founder who shows up on a call with 400 community members and spends 90 minutes answering hard questions without deflecting is doing something that no amount of press coverage can replicate. The community is watching for honesty under pressure. If you passed the test once, during the crisis, you need to pass it again here.

The calls also serve a functional PR purpose: they generate real content. A recording of a founder owning a mistake directly is a more credible media asset than any press release.

## Days 60 to 90: Re-engaging KOLs Without Looking Desperate

This is where most recovery efforts stumble. You're 60 days out from the crisis. Token price has stabilized or partially recovered. You want to get back on the content cycle. So you reach out to KOLs who went quiet during the incident.

The mistake is re-engaging them the same way you would in a launch cycle: pitching coverage, offering token allocations, asking for posts about your roadmap. KOLs who have audiences worth reaching watch how you treat them during a crisis. If they went quiet because they were genuinely uncertain about the project's health, pitching them on your "recovery momentum" before you've demonstrated it is a fast way to get a polite pass.

The re-engagement sequence that works:

**First contact: no ask.** Share the transparency report. Share the audit. Tell them where things stand. Let them arrive at their own assessment.

**Second contact: a story, not a pitch.** Not "we're back." A specific narrative about what you built or changed since the crisis. The community call recording. The new multi-sig setup. The bug bounty program. Give them something substantive to look at before you ask them to talk about you publicly.

**Third contact: a low-commitment engagement.** An invite to a community call, not a request for a promotional post. A product demo, not a pitch deck. Let them ask questions directly to your team.

KOLs have long memories and communities that trust them precisely because they're selective. As I put it earlier this year:

> comms is so underrated in web3 but that's everything! how you communicate w your community, stakeholders, customers, retail users, airdrop hunters, journos is literally everything!
>
> [Shilika Jain on X, 3 Jun 2025](https://x.com/Shilika_jain/status/1929941601503326277)

The KOLs you want re-engaged are the ones with real audiences, not the ones asking for $500K in tokens to post. The selectivity that makes them worth engaging is the same selectivity that will cause them to pass if you pitch them before you've earned it. Move through the transparency and structural change phases first. The KOL re-engagement is a day 60 action, not a day 15 action.

One operational note on KOL screening: I've been in OTC deal chats where KOLs ask for token amounts that would be absurd under normal conditions, let alone post-crisis. Be especially skeptical of any KOL who comes back to the table immediately after a crisis event. The ones worth re-engaging will take longer to respond, ask harder questions, and make a smaller initial commitment.

## The Pitfall That Kills Recovery Programs

The most common failure mode I've seen across recovery attempts is treating the 90 days as a communications exercise rather than an operational one. You can have perfect cadence on your transparency reports and still lose the community if the structural changes you announced on day 15 visibly haven't happened by day 60.

Every commitment you make publicly becomes a new trust test. Miss the audit timeline and the community doesn't think "they got delayed." They think "they lied again." The recovery arc depends on your operational team actually executing the changes in the stated timeframe. If you're not confident a change will happen by the date you're announcing, don't announce the date.

The other failure mode: resuming your growth comms cycle before the recovery arc is done. Launching a new product feature announcement or a partnership press release on day 45 when your community is still waiting for an audit result sends a clear signal that you've moved on before they have.

## What Success Looks Like at Day 90

A community that has been through a properly run 90-day recovery doesn't necessarily feel the same as one that was never stressed. But it has specific markers. Active holders who stayed are more informed about your protocol than they were before the crisis. Your governance participation has likely increased. Your transparency reporting has set a new baseline expectation that the community will hold you to. KOLs who came back have done so because they chose to, not because you paid them to.

That last part matters for the long run. Paid-in KOLs who disappear the moment something goes wrong are a liability, not an asset. The ones you re-engage through honest communication are worth ten times that.

The playbook here is not complicated. It's just consistent. Presence in week one. Transparency reporting through month one. An independent audit you publish regardless of what it finds. Structural changes that are verifiable on-chain. Community calls where the founder takes hard questions. KOL re-engagement that starts with giving before it asks. Ninety days, executed in that order, without shortcuts.

---

If you're in the middle of a crisis recovery and you're not sure where your comms are falling short, [book a 30-min teardown with Shilika](https://calendly.com/shilikajain/30min/), I'll tell you exactly where the sequence is breaking down.
$b100$
where slug = 'web3-crisis-community-trust-rebuild-90-day' and md5(body) = '1d1ca6f49d6c87d57bfa94425892e531';

update blog_posts set body = $b100$# Web3 Security Startup PR: How Audit Firms, Bug Bounty Platforms, and Chain-Monitoring Companies Win Tier-1 Coverage

Web3 security companies have more compelling raw material than almost any other category in crypto. Live exploit data. On-chain forensic trails. Multi-million-dollar bug payouts. A $1.5 billion breach at Bybit that made Bloomberg, CNBC, and Wired in a single news cycle.

And yet most security firms default to publishing audit PDFs on their own blog and hoping someone finds them.

The problem is structural. The best proof points are locked behind client confidentiality. Vulnerability disclosures are embargoed with the affected protocol. Bug bounty payouts are private. Forensic conclusions belong to a client who may be mid-litigation. The data exists. The PR strategy to extract value from it without burning client relationships: that's what's missing.

This post covers exactly that. I'm going to walk through the four press hooks that actually land Web3 security companies in Wired, TechCrunch, Dark Reading, and the tier-1 crypto trade press, and the common mistakes that burn the opportunity.

---

## Why the Category Has Never Had More Leverage

The numbers make the case plainly. The Web3 security market was valued at $2.3 billion in 2023 and is projected to reach $15.8 billion by 2032, growing at a 26.4% CAGR. CertiK's annual security report put total losses across 630 on-chain incidents at over $3.3 billion in 2025 alone: a 37% increase from 2024.

Every one of those incidents is a news event. Every one generates five to ten follow-up stories in the week that follows. The security firms that land in those stories as named technical sources are building a media asset that compounds over time.

Chainalysis quotes land in the Financial Times and Wall Street Journal. CertiK reports get cited in Forbes. Elliptic findings run in Bloomberg and Reuters. These companies did not get there by sending press releases. They got there by becoming the researcher-grade sources that journalists call when something breaks.

That is the model. Build it deliberately, not reactively.

---

## The Four Press Hooks That Actually Work

### 1. Annual and Semi-Annual Threat Reports

The single highest-leverage PR move for any Web3 security firm is an original data report published on a predictable schedule.

Look at what this category has done: Chainalysis publishes its Crypto Crime Report annually and generates coverage in mainstream business press every single time. CertiK's Hack3d report runs twice a year and lands in Forbes, CoinDesk, and Cointelegraph. Elliptic's cross-chain crime report generates wire pickup and cited commentary.

The mechanism is simple. A report containing original statistics gives every journalist covering crypto security a citable number they can't get anywhere else. That number gets embedded in their stories. Your company name appears next to it. That compounds into brand recognition with every publication that covers the beat.

For an audit firm or chain-monitoring company, the data you already generate internally (incident frequency, attack vector distribution, protocol category loss rates, average time-to-exploit) is the raw material. Package it with a finding frame ("smart contract vulnerabilities accounted for X% of losses") and a forward implication ("the shift toward operational failures over code bugs means audits alone are insufficient"), and you have a story with three distinct news pegs: the headline finding, the trend angle, and the industry implication.

Time the release for Q1 (capturing prior-year totals) or Q3 (capturing half-year data). Both windows see high journalist interest because editors are building their annual and mid-year analysis packages.

One practical note: place the embargo early. A T-72h embargo to 4 to 6 tier-1 outlets with a clear lift time lets reporters prepare context, which means longer, more considered coverage rather than a brief news item. CoinDesk, The Block, Decrypt, and relevant vertical outlets like Dark Reading for the security trade angle are the right targets for simultaneous embargo distribution.

### 2. Exploit Commentary and Rapid-Response Pitching

When a major exploit breaks, the CoinDesk Protocol desk and The Block research team are looking for on-record technical sources within two to four hours. The window is short. The firms that land in those stories are the ones with a pre-built reporter relationship and a ready protocol for rapid response.

The Bybit breach in February 2025 generated massive coverage. Blockchain security firm Halborn had its co-founder quoted in Bloomberg within hours of the news breaking. That placement wasn't luck. It was a product of Halborn already being a known technical source, available to comment on deadline, with someone senior enough to speak on record.

For most Web3 security founders, rapid-response PR requires two things: a short-list of eight to twelve journalists covering the security beat at tier-1 crypto and mainstream outlets, and an internal protocol for approving commentary within ninety minutes of a significant incident. If your approval chain takes four hours, you miss the first wave. By the second wave, five other firms have already been quoted.

What makes a rapid-response pitch work is specificity about mechanism. "We believe this was a multisig manipulation attack similar to the Safe infrastructure compromise" is quotable. "This underscores the importance of security in crypto" is not. Journalists want technical detail they can explain to a reader. Give them that, in two to three sentences, in the pitch itself.

### 3. Vulnerability Disclosures and Zero-Day Embargo Strategy

This is the highest-risk, highest-reward press hook in the category, and the one most founders either avoid entirely or execute badly.

A coordinated vulnerability disclosure, done correctly, lands a Wired or TechCrunch story on the day of publication. Done incorrectly, it burns a client relationship, creates a legal exposure, or tips off bad actors before a patch is deployed.

The mechanics of a responsible disclosure PR strategy:

- The vulnerability is reported to the affected protocol privately, with a standard 30 to 90-day remediation window. This is the coordinated disclosure model.
- Once a patch is confirmed deployed, the security firm prepares a technical write-up and notifies one journalist under a strict pre-publication embargo. The embargo lifts simultaneously with the public disclosure.
- The journalist gets an exclusive. Your firm gets a tier-1 byline. The affected protocol gets a chance to co-announce a fix rather than absorbing unilateral coverage of a live vulnerability.

The common mistake: pitching the story before the patch is live. That is not PR. That is creating a live exploit scenario with a news countdown attached. Any journalist worth pitching will not touch it, and if they do, you've created a reputational and legal mess.

The second common mistake: treating the disclosure as a marketing announcement. Wired and MIT Technology Review want technical depth, not promotional framing. The pitch should read like a researcher briefing a colleague, not a product launch announcement. If your write-up mentions your own product before it mentions the vulnerability mechanics, rewrite it.

Bug bounty platforms face a related challenge: the payout is often confidential. The press hook isn't the payout amount. It's the category of vulnerability discovered, the protocol protected, and what it says about the state of that attack surface. Frame it from the research angle and you have a story. Frame it from the bounty amount and you get a brief mention in a roundup, if that.

### 4. Founder Thought Leadership on Systemic Risk

Security founders who establish a point of view on structural failure modes, not just individual incidents, become the sources that journalists quote for industry context. That's a different kind of coverage than incident response, and it's the one that drives analyst briefings, speaking slots, and eventually the category-defining narrative.

What works here is counterintuitive specificity. "DeFi needs better security" is not a point of view. "The industry is overcorrecting toward smart contract audits while operational security failures (key management, multisig governance, third-party infrastructure) now account for a larger share of losses" is a point of view. It's the kind of framing that gets a Blockworks interview, a CoinDesk opinion byline, or a Dark Reading contributed piece.

I've seen this play out in client work. When we positioned Web3Auth's commentary around the specific failure modes in wallet onboarding (not generic security concerns, but the concrete tension between UX friction and key custody models) it landed in Cointelegraph and Blockworks with named commentary, not just brand mentions.

The op-ed placement is the highest-leverage format for this. A founder byline on CoinDesk Opinion seeding a thesis about a systemic risk creates a citable anchor that journalists pull from for months. It also functions as a GEO asset: AI assistants cite short, declarative, well-structured claims from high-authority publications. One well-placed op-ed can generate citations across dozens of subsequent news stories without any additional outreach.

---

## The Three Mistakes Web3 Security Firms Make in PR

**Treating audit reports as press releases.** An audit completion is not inherently news. "Protocol X engaged us for a smart contract audit" is a client announcement, not a media story. The news is in the finding, the scale of the risk avoided, or the category implication. If you don't have a compelling finding angle, hold the announcement and stack it with the next one that does.

**Pitching the wrong outlet for the angle.** Wired and MIT Technology Review want systemic risk, institutional impact, and researcher-grade sourcing. Dark Reading and SC Media want practitioner detail and CISO relevance. CoinDesk and The Block want market implications and on-chain data. Decrypt wants accessible explanations of complex events. Sending a systemic-risk story to Dark Reading gets you a trade brief. Sending that same story to Wired with the right technical frame gets you a feature. Know the editorial context before you pitch.

**Going quiet between incidents.** The firms that own the security beat in crypto are producing content consistently: monthly data updates, researcher commentary threads on X, contributed analysis when related incidents break. The ones who only appear when there's a crisis don't accumulate source credibility. Journalists track back to sources they've cited before. If you're not in the record before the crisis, you're not the call they make during one.

---

## What the Outlet Matrix Looks Like

| Outlet | Angle that lands | Format |
|---|---|---|
| Wired | Systemic failure modes, state-sponsored attacks, institutional risk | Feature, expert source |
| TechCrunch | Startup angle, funding news, vulnerability with named protocol | News item, exclusive |
| Dark Reading | Practitioner detail, CISO-relevant findings, attack technique analysis | Contributed piece, expert source |
| CoinDesk | On-chain data, protocol-level findings, market implications | Protocol desk, opinion byline |
| The Block | Research-backed findings, funding, technical post-mortems | News item, research piece |
| Blockworks | DeFi and institutional angles | Interview, expert commentary |
| SC Media | Enterprise security buyer angle | Contributed piece, news source |

---

## Pre-Seed vs Series A: Where to Start

If you're pre-seed or seed stage, you don't have the data volume for an annual threat report yet. The right entry point is rapid-response commentary and two to three founder op-eds seeding a specific thesis. Build the reporter relationships before you need them. A single well-executed commentary placement in CoinDesk's Protocol newsletter at seed stage does more for your next fundraise than five wire-service press releases.

At Series A, you have 12 to 18 months of incident data and a client roster that validates your methodology. That's when the threat report becomes viable. That's also when the thought leadership program should be running consistently enough that you're getting inbound journalist requests, not just outbound pitches.

The Series B security firm should be in analyst relations alongside media: Gartner, Forrester, IDC, and KuppingerCole all track the Web3 and blockchain security space and publish vendor evaluations that influence enterprise procurement decisions. Analyst placement and media placement compound each other. A Gartner mention gives a CoinDesk reporter a reference point for your credibility. A CoinDesk feature gives an analyst a reason to include you in their next coverage cycle.

---

## Why Trust Is the Commercial Differentiator

Earlier this year I was in conversation with a cybersecurity and blockchain team trying to drive initial coverage for their protocol and technology: one of seven PR conversations I was having in a single week across the AI and Web3 security space. The common thread in all of them: these were teams with genuinely strong technical product and essentially no media presence.

That's not a coincidence. Security is a category where trust is the entire commercial proposition. A CISO doesn't buy from a firm they've never heard of. An enterprise protocol doesn't run an audit with a team whose methodology has never been publicly validated. The PR investment is the trust investment.

The founders who understand this earliest build the biggest market position. Not because they're louder. Because they're on the record, consistently, with specific and accurate technical content: before the crisis that would have introduced them anyway.

If you're a founder of an audit firm, bug bounty platform, or chain-monitoring company trying to figure out where to start, the answer is almost always the same: pick one press hook from this list, pick two journalists who cover the beat, and build one reporter relationship before you need coverage. Everything else follows from that.

---

**Book a 30-min teardown with Shilika** to map out which press hooks fit your stage and what your first three pitches should look like: [https://calendly.com/shilikajain/30min/](https://calendly.com/shilikajain/30min/)$b100$
where slug = 'web3-security-startup-pr-audit-bug-bounty-monitoring' and md5(body) = '11d9e8f9f8a69c487bb82c17da2b2fa8';

update blog_posts set body = $b100$# The Web3 Founder Speaker Reel: Build One Before You Have a Single Stage Appearance

Every founder applying for a speaking slot at Consensus, Token2049, or Permissionless hits the same wall about 90 seconds into filling out the application. There's a field asking for a speaker video. You don't have one. You've never been booked on a main stage because nobody books you on a main stage until you have a video proving you can hold one.

That's the chicken-and-egg problem this post is about. I've sat on both sides of it: as a founder trying to land panels and as someone who has placed clients on stages from India Blockchain Week to DePIN Day Singapore. The founders who break out of the loop aren't the ones who wait for the big stage. They're the ones who manufacture credible video proof before anyone gives them permission.

## Why the programmer actually needs the video

Conference programmers at Token2049 and Consensus are managing live events with real reputational risk. A poorly prepared speaker wasting 25 minutes of main stage time in front of 15,000 attendees is a disaster for them, not just for you. So when they ask for a speaker reel, they're not running a box-ticking exercise. They're answering three specific questions:

1. Can you communicate clearly and confidently on camera, under a little pressure?
2. Do you have an actual point of view, or will you fill the slot with company announcements dressed as insight?
3. Is there an audience that will show up for you, or are we the only ones who've heard of you?

A 90-second reel that answers all three doesn't need a Consensus backdrop. It needs to show you thinking in public.

## The four raw material sources that actually work

### X Spaces recordings

X Spaces is the most underused speaker-reel asset in Web3. The platform records sessions natively when the host enables it, and the audio quality from a proper setup (a USB condenser mic, headphones, a quiet room) is better than the ambient capture from a half-empty hotel ballroom.

Host a Space with 300 to 800 listeners, bring on two or three credible guests from your ecosystem, and make an argument. Not a product demo. An argument. Something the audience could push back on. Then screen-record the session simultaneously so you have video of the interface, or use a tool to download the audio and drop it into a talking-head video recorded the same day. Clips of you clearly handling a pointed question, "but doesn't your approach just recreate the same centralisation risk?", will do more for a programmer than a polished intro reel from a sponsored slot.

A single X Space with a notable co-host and 500+ listeners is also useful social proof for the credibility-stack section of your submission. It shows you can pull an audience.

### Side events and satellite programming

Every major conference (Token2049 Singapore, Consensus, ETHDenver) generates a week of satellite events that run on sponsored venues, hotel rooftops, and co-working spaces. These events are easier to speak at and, crucially, they film their speakers. You can get on three or four of them in the same week.

Getting on a side event in the four to six weeks before the main conference is realistic for any founder with a clear angle. Reach out to the organiser directly, offer a 15-minute presentation on a specific topic, not "Web3 trends," but something like "why on-chain compute pricing will break DePIN in the next 18 months." Side-event organisers are usually desperate for speaker content that isn't a VC flex. Give them something educational.

Bring your own camera operator. Hire a local videographer for three to four hours, or find a community member who shoots. Tell them you need two angles: a medium shot from the front that shows your face and hands, and a wider shot that captures audience reaction. The audience reaction shots are not optional: they're what converts a programmer watching your reel. A clip of 40 people leaning forward or laughing at a sharp observation reads as evidence of stage presence even if the room had 40 people in it.

### University blockchain clubs and hackathons

University blockchain societies (not just MIT or Stanford, but solid programs at NUS, IIT, Seoul National University, and anywhere with an active crypto or DeFi research group) run speaker series all year and almost always record them. The video quality varies, but the credibility signal is cleaner than you'd expect. Programmers see "spoke at the NUS Blockchain Society" as evidence that you can hold a non-crypto audience, which is actually harder to do and marks you as a more versatile panellist.

Hackathons are another underused source. Demo day presentations at ETHGlobal events or regional hackathons put you on a small stage with a live audience, a microphone, and often a recording setup. The format is 10 to 15 minutes, which is exactly what you need to show you can structure and land an argument under time pressure.

Reach out directly to the club president or hackathon lead. Offer to talk about something practical: fundraising mechanics for token projects, how DePIN protocols are pricing compute differently from cloud, what the RARI Foundation's royalties-at-chain-level approach changes for creator economics. Specific. Useful. No product pitch.

### Internal demo days and ecosystem events

If you're part of an accelerator (Outlier Ventures, Alliance, Binance Labs, a16z crypto) you will have internal demo days and cohort presentations. Most of these are recorded. Get the recording. Even if the video quality is rough, a polished 3-minute excerpt showing you walking a room of serious investors and builders through your thesis is legitimate reel material.

Ecosystem events from your own protocol's community work the same way. A town hall, a developer day, an ecosystem summit. You're on home territory, the audience knows the context, and you can film it properly because you control the logistics.

## The three-clip structure that answers the programmer's questions

Don't send a 7-minute unedited recording of your talk. Send a 90-second to 2-minute reel structured around the three questions every programmer needs answered.

**Clip 1 (20 to 30 seconds): You making a specific, contestable argument.** Not an intro, not a company overview. The sharpest 25 seconds from your best talk where you say something someone could disagree with. This answers question one, communication, and question two, point of view, simultaneously.

**Clip 2 (20 to 25 seconds): You handling a live question or pushback.** This is the section most first-time reels miss. Pull the moment where someone in the audience challenged you, or where a co-host pushed back in a Space, and you handled it cleanly. Programmers know that the Q&A is where most speakers lose the room. Showing you can hold your ground without going defensive is worth more than any polished prepared statement.

**Clip 3 (20 to 30 seconds): Audience or room signal.** Reaction shots. People nodding, leaning in, applauding, laughing. If you hosted a Space with 600 listeners and the listener count is visible in a recording, show that. If you have a clip of 50 people at a side event paying attention, use it. This answers question three: do you have an audience.

Then add five to eight seconds at the start with your name, topic, and one social proof line: "200+ nodes at launch" or "placed in Forbes, Decrypt, CoinDesk" or "DePIN track speaker at India Blockchain Week 2024." Not a slide show. A fast lower-third graphic over existing footage.

Total runtime: 90 seconds to 2 minutes. Anything longer signals you don't know what you're selling.

## What you do not do

**Don't use Zoom webinar recordings as your primary clip.** A flat screen share of your face in a small box against a cluttered background tells the programmer you've never been in a live room. Zoom clips can supplement a reel that already has live footage, but they can't anchor one.

**Don't send a produced but fake "stage."** Some speaker-development agencies offer studio simulations where you speak on a mock stage to a green screen. Programmers who book 250+ speakers a year recognise it immediately. You are better off with authentic footage from a 40-person side event than a polished fake from a studio.

**Don't send an unedited recording with a timestamp in the subject line.** "My talk starts at 14:22" is not a speaker reel. It tells the programmer they have to do work for you, which means they won't. The 90-second cut is table stakes.

**Don't open with your company logo or a title card.** You have 10 seconds before the programmer moves on. Start with you talking. The title graphic lives at the end or as a lower third.

## The compound play: use the reel to get the next piece of reel

The first reel gets you the side-event slot. The side-event footage gets you the regional conference slot. The regional conference footage gets you the Tier-1 application. This is a 6 to 12 month arc, not a one-shot play.

When I was on the ground at India Blockchain Week 2024, running the DePIN Day Singapore side event, the founders who showed up with any video evidence of public speaking had a measurably easier time getting into the lineup for the next event. Not because the video was polished. Because it proved they existed outside their own Telegram group.

> Build such unique and famous anonymous identities that medias want to doxx you!
>
> [Shilika Jain on X, 9 Feb 2022](https://x.com/Shilika_jain/status/1491361564246814729)

I wrote that in a different context, but the principle holds. Build a public identity specific enough and credible enough that programmers are the ones finding you. A speaker reel is one node in that identity graph. The op-ed is another. The podcast appearance is another. The X Space is another. None of them work alone. Together they create the impression that makes a cold submission feel like a warm one.

## The submission moment

When you send the application, the reel link goes in the video field. But the work that makes the reel land is the paragraph you write alongside it: one sentence on the argument you'll make, one sentence on why you can make it better than anyone else on this topic, one sentence on why the audience needs to hear it at this specific event and moment.

The reel proves you can hold a room. The paragraph earns you the room in the first place.

You don't need Consensus footage to apply to Consensus. You need enough evidence that you've thought in public, held an argument under pressure, and built enough of an audience that booking you is not a risk. The reel is just the format through which you show all three.

---

**Book a 30-min teardown with Shilika** to map out the fastest path from where you are to a credible speaker stack: reel, bylines, podcast credits, and submission strategy included. [Book here.](https://calendly.com/shilikajain/30min/)$b100$
where slug = 'web3-founder-speaker-reel-no-stage' and md5(body) = '5e3ad8d8aa46cf062e857b42f2630071';

update blog_posts set body = $b100$# How to Measure KOL Marketing ROI in Crypto: The Metrics That Go Beyond Impressions

If your KOL campaign report leads with impressions and likes, you're reading the wrong numbers. Impressions are easy to inflate and impossible to deposit. The metrics that actually tell you whether a campaign worked are cost per qualified wallet, first-action conversion rate, and on-chain behaviour during the campaign window, and none of those show up on a standard agency deck unless you demand them in writing before the campaign starts.

I've run KOL campaigns across 200+ Web3 creators, across APAC markets and globally, and the single pattern I see in failed campaigns is the same every time: attribution was never set up. The team briefed five KOLs, paid invoices, watched the numbers go up on posting day, and then had no idea whether those numbers connected to actual protocol users, token holders, or anyone who mattered.

This post builds the full measurement framework. What to set up before any post goes live. Which on-chain attribution tools to use. How to calculate cost-per-wallet. And what a good result looks like against each benchmark.

---

## Why impressions and engagement are not KPIs for a Web3 campaign

Engagement rate and follower counts are what agencies report because they're easy to screenshot. They're also the easiest numbers to fake. Bot networks make up a significant portion of followers on many mid-tier accounts, so engagement that looks impressive often isn't coming from anyone who would ever connect a wallet.

More importantly: even genuine engagement does not equal conversion in Web3. A user can watch a KOL video, genuinely enjoy it, share it, and never touch your protocol. The gap between reach and on-chain activity is enormous, and most crypto projects fall into it.

I said something close to this publicly in late 2022 and the problem hasn't gone away:

> crypto marketers will launch another massive marketing campaign but can't tell if the product they're marketing will actually bring adoption or not lol
>
> [Shilika Jain on X, 23 Dec 2024](https://x.com/Shilika_jain/status/1871071594686435356)

The metrics that correlate with actual business outcomes are on-chain: wallet connections, TVL increases, and cohort retention at 30 days. Impressions can exist alongside a campaign that drove zero wallets. Cost-per-wallet, by contrast, gives you a number you can compare against LTV and decide whether the channel is worth running again.

---

## The five metrics that actually matter

Before briefing a single KOL, document which of these metrics you're tracking. You can't backfill attribution retroactively.

**1. Attributed wallet sign-ups**
The number of unique wallet addresses that came through a UTM-tagged or referral-coded link tied to a specific creator. One link per KOL, minimum. This is the most direct signal of reach-to-action conversion.

**2. First-action conversion rate**
Of the wallets that connected through a KOL's link, how many completed the first meaningful action: first trade, first deposit, first stake, first position? Sign-ups alone are too easy to inflate. One wallet connect is curiosity. A second on-chain transaction is intent.

**3. Cost per qualified wallet (CPW)**
Total KOL spend divided by wallets that completed first action. This is the single number that tells you whether a creator is efficient. A KOL charging $5,000 who drives 200 first-action wallets costs you $25 per qualified wallet. A KOL charging $2,000 who drives 8 costs you $250. The cheaper invoice was the worse deal.

**4. D7 and D30 wallet retention**
How many wallets acquired through the campaign are still active on-chain at 7 days and 30 days? This is the metric that separates campaigns that brought genuine users from campaigns that brought people who wanted to flip a launch bonus. Campaigns optimised for this metric specifically brief creators to attract users who understand the product, not just the token.

**5. Mindshare shift (for larger campaigns)**
Tools like Kaito measure share of attention: what percentage of total conversation in your category now mentions your protocol versus competitors. This is relevant for Series A and above, where brand positioning matters alongside user acquisition, and where you want to know whether a KOL wave actually moved the narrative or just generated volume.

---

## What to set up before any post goes live

Attribution requires infrastructure. Set this up at the briefing stage, not after you see disappointing numbers.

**Unique UTM links per creator.** Every KOL gets a distinct tracking URL. Not one link shared across five people. The structure should capture source (the creator's handle or ID), medium (the platform: X, YouTube, Telegram), and campaign name. This lets you compare creators directly and cut the ones who are underperforming mid-campaign.

**Referral codes where UTMs break.** On Telegram and some native mobile flows, UTM parameters get dropped. Use unique referral codes built into your dApp or landing page as a fallback. The code maps to the creator, so when a wallet uses that code, you know the source.

**A wallet-connect event capture.** Your front-end needs to log the referral source at the moment of wallet connection and bind it to the wallet address. If your dev team hasn't done this, Cookie3 or Formo can be integrated to handle it. Without this step, UTM data dies at the browser level and never maps to a wallet identity.

**Agreed measurement window.** Decide before launch: are you measuring first-action conversions in the 48 hours after posting, or over 7 days? Campaign windows affect the numbers significantly. Document the window in the KOL contract and don't extend it retroactively to make numbers look better.

**A baseline.** Pull your protocol's average daily wallet connections for the 14 days before the campaign. Market rallies lift every protocol's metrics. You need to know how much of a spike is attributable to your campaign versus broader market movement. Agencies that don't separate these two are claiming credit for price action, not their work.

---

## On-chain attribution tools worth knowing

You don't need all of these. Pick one or two depending on where you're building.

**Cookie3** is purpose-built for KOL campaign tracking. It correlates social engagement data with wallet-level on-chain activity, assigns authenticity scores to KOL audiences (including bot detection), and surfaces which creators are actually driving conversions rather than impressions. If KOL attribution is your primary measurement need, Cookie3 is the most direct fit.

**Spindl** (now part of the Base ecosystem after Coinbase's acquisition in early 2025) is strong for end-to-end funnel tracking: connecting off-chain marketing events to on-chain conversions via UTM-style tagging and fingerprinting. Best for projects building on Base or running performance campaigns where you need the full click-to-smart-contract attribution chain.

**Dune Analytics** is the most flexible option. You write SQL queries against raw on-chain data, build custom dashboards, and track wallet cohort behaviour at scale. It doesn't have native off-chain attribution (no click tracking), but it's the right tool for building a retention dashboard that shows you D7 and D30 activity for wallets acquired from your campaign. Pair it with Cookie3 or Spindl for the full picture.

**Formo** handles chain-agnostic UTM-to-wallet mapping and funnel analysis if you're not building on Base and want something that isn't Cookie3. It supports EVM chains and Solana.

Most mature campaigns use a combination: Cookie3 or Spindl for KOL attribution at the point of wallet connect, Dune for post-acquisition cohort retention analysis.

---

## Calculating cost per qualified wallet: the worked example

Take a mid-market token launch. You brief four KOLs across two tiers:

| Creator | Fee | Platform | Attributed wallet sign-ups | First-action wallets | CPW |
|---|---|---|---|---|---|
| KOL A (250K followers, X) | $4,000 | X | 380 | 90 | $44 |
| KOL B (180K followers, YouTube) | $6,000 | YouTube | 420 | 160 | $37.50 |
| KOL C (90K followers, Telegram) | $1,500 | Telegram | 140 | 35 | $43 |
| KOL D (400K followers, X) | $8,000 | X | 500 | 55 | $145 |

KOL D had the biggest follower count and the most attributed sign-ups. But their CPW was $145 versus KOL B's $37.50 on YouTube. If you're optimising for efficient user acquisition, you double your YouTube budget for the next wave and don't renew KOL D.

This is the table your agency should be producing. If they're not, you're paying for impressions.

---

## Good versus poor campaign benchmarks

These are operational benchmarks, not guarantees. They shift with market conditions, product type, and the quality of the brief.

**Cost per qualified wallet:** Under $50 is good for a DeFi protocol with any complexity. Under $100 is acceptable for a cold-start TGE where brand awareness is low. Above $150 consistently means your creator selection, brief quality, or product-market fit needs review before you spend more.

**First-action conversion rate:** Healthy campaigns see 15% to 30% of wallet sign-ups completing a first meaningful action. Below 10% suggests the KOL's audience isn't aligned with your product, or the product experience post-click is breaking down. Above 40% usually means the creator has a tight, highly aligned audience and you should find more creators like them.

**D30 wallet retention:** 20% to 35% of wallets still active at 30 days is a reasonable baseline for a DeFi or gaming protocol. Below 15% is a sign that you attracted people who came for a launch bonus and left. This is one of the most common failure modes I see in TGE campaigns that look great on day one and terrible by week four.

---

## The pre-TGE scenario versus the ongoing growth scenario

The measurement framework doesn't change much between these two contexts, but the priorities do.

**Pre-TGE:** Your primary goal is whitelist quality and committed holders, not raw wallet count. Measure the ratio of wallets that participate in the TGE within 48 hours of the event against total campaign-attributed wallets. That ratio tells you whether KOL audiences were genuinely interested or just collecting for the sake of it. Discord or Telegram join rate from campaign links is a useful secondary signal: community members who stuck around after the posting window have higher intent than those who bounced.

**Ongoing growth:** Here you care more about D30 retention and downstream protocol participation, transaction frequency, TVL contribution, repeat swap volume. Shift your Dune dashboard to track cohort behaviour over 60 to 90 days. A campaign that looks weak on CPW sometimes reveals strong downstream LTV if the creator's audience is experienced DeFi users rather than first-time entrants.

---

## The most common mistakes I see in KOL measurement

**Agreeing metrics after the campaign starts.** Attribution infrastructure takes 24 to 72 hours to set up properly. If you brief a KOL on Monday and they post on Tuesday, you've missed your window. Measurement setup belongs in the initial brief, not in the post-campaign debrief.

**Using one link across multiple creators.** I've seen teams hand the same referral code to four KOLs because it was easier. You've now made it impossible to identify which creator drove which wallets. Every creator gets their own link. No exceptions.

**Taking token-allocation deals without setting conversion floors.** Token allocations to KOLs are high-risk because the creator's incentive is to pump price on posting day rather than drive genuine long-term holders. If you're running token compensation, build in a vesting cliff tied to D30 retention numbers. Pay them for users who stayed, not just for impressions that spiked.

**Conflating market movement with campaign impact.** If your campaign runs during a broader market rally, your wallet connection numbers will look better than they are. Pull the baseline. Compare your campaign cohort's conversion rate against the baseline daily conversion rate. Anything above baseline is attributable to the campaign.

**Reporting impressions to investors because the wallet numbers are disappointing.** This is how you end up funding a second bad campaign. If the CPW numbers are poor, identify why (wrong creators, wrong brief, wrong product experience post-click) and fix that before the next wave. A $10,000 spend that drives 400 qualified wallets is worth more than a $50,000 spend that drives 50.

---

## What a measurement-first campaign brief looks like

Before any creator is contracted, your brief document should include:

- The tracking link or referral code assigned to that creator
- The measurement window (start and end date/time)
- The primary KPI (attributed first-action wallets) and the secondary KPI (community join rate)
- The baseline wallet connection rate for your protocol over the prior 14 days
- Which tool you're using for attribution (Cookie3, Formo, Spindl, or custom Dune dashboard)
- The reporting format you expect back, and who has read access to the dashboards

That last point matters. If you're working with an agency, read access to attribution dashboards should be standard, not a premium add-on. If they hesitate on that, you have your answer about whether you can trust their campaign reports.

KOL marketing is one of the highest-leverage growth channels in Web3 when it's run against real metrics. When it's run against impressions, it's one of the most expensive ways to get screenshots.

---

**Book a 30-min teardown with Shilika** to audit your KOL measurement setup or build the attribution framework before your next campaign. [Book here.](https://calendly.com/shilikajain/30min/)
$b100$
where slug = 'crypto-kol-campaign-roi-metrics' and md5(body) = '7bff17c03d3030d8b465a305c9dcb053';

update blog_posts set description = $b100$A stage-gated framework mapping what PR can and can't do at pre-seed, seed, Series A, and TGE, plus the cost floor and the signals that tell you you're ready.$b100$
where slug = 'when-to-hire-pr-web3-ai-startup-stage-framework' and md5(description) = 'e3d2197d348d370a17bae6afe27fb48f';

update blog_posts set body = $b100$# The Crypto KOL Brief Template That Gets Good Content

Most crypto KOL briefs fail in one of two ways. Either they're so thin the creator has to guess what you want, and they produce generic shill content that tanks their own credibility. Or they're so over-scripted the audience can tell a marketing team wrote every word, and engagement collapses.

I've run KOL campaigns across 200+ vetted creators in Web3, from early token launches to exchange integrations to NFT mainnet deployments. The brief is where most founders either set the campaign up to succeed or guarantee it will disappoint. What follows is the template I actually use, along with the reasoning behind every section.

---

## Why generic influencer briefs don't work in crypto

Consumer influencer briefs were designed for lifestyle products. Send a bag of protein powder, include a discount code, ask for a story. The stakes are low and the compliance requirements are minimal.

Crypto is different on every axis.

Payment often involves token allocations, KOL rounds, or vesting schedules in addition to cash. Attribution works on-chain through wallet signatures, referral smart contracts, and unique claim URLs rather than checkout pixels. The audience is highly informed and will forensically dismantle technical claims within hours of publication. And you're operating under a multi-jurisdiction regulatory environment where a single undisclosed paid post can cost you and the creator real money.

A generic brief doesn't address any of this. It produces content the crypto community spots as paid promotion from the first sentence, and it leaves you exposed if the creator makes claims you didn't sanction.

I said it plainly on X a while back:

> more projects need organic PR than paid kol shills & campaigns!  
> who should explain this to founders? open to discussing the pros & cons✨
>
> [Shilika Jain on X, 6 Mar 2025](https://x.com/Shilika_jain/status/1897761960667795958)

That's still true. Paid KOL content works when the brief forces the creator to actually understand the product and gives them room to communicate it honestly. It fails when the brief is a list of talking points that reads like a pitch deck.

---

## The eight-section brief template

### Section 1: Campaign context (one paragraph)

Tell the creator what's happening and why it matters *now*. Not the full company backstory. One tight paragraph that answers: what are we launching, when is it live, and why does this matter to your audience in particular?

**Template copy:**

> **Campaign:** [Product/token name] is launching [mainnet / TGE / product feature] on [date]. We're activating creators in the [week/two weeks] leading up to launch.  
> **Why now:** [One sentence on the timing hook. E.g., "We're going live on Arbitrum the same week Arbitrum's total TVL crossed $20B, which makes the timing newsworthy."]  
> **Your audience relevance:** [One sentence connecting the product to the creator's niche. E.g., "Your DeFi-native audience are the exact users who would benefit from sub-$0.01 gas on a creator royalty protocol."]

Don't use this section to sell the creator on your project. If you've reached the brief stage, they've already agreed to work with you. This section is for orientation, not persuasion.

### Section 2: The one-sentence take

This is the most important line in the brief. Every piece of content, regardless of platform or format, should leave the audience with one clear thought. Write it here.

**Template:**

> **The audience must walk away thinking:** [One sentence, maximum 20 words, active voice, no jargon.]

For example: "LightLink makes gas fees invisible for app users so they never have to think about on-chain costs."

If you can't write this in 20 words, you don't have a clear enough narrative yet. Solve that before you brief anyone.

### Section 3: Must-say claims

These are factual claims you want included in the content. Keep the list to five items or fewer. More than five and the creator can't naturally work them all in, so they end up listing them robotically, which signals sponsored content to any experienced reader.

**Template format:**

| # | Claim | Evidence / source link |
|---|-------|------------------------|
| 1 | [Specific factual claim] | [Link to documentation, audit, press release] |
| 2 | [Specific factual claim] | [Link] |
| 3 | [Specific factual claim] | [Link] |

Always attach a source link. Creators who get facts wrong because you gave them unverified claims are your problem. If the claim isn't documentable, don't include it.

### Section 4: Must-avoid claims (the compliance guardrails)

This section protects you and the creator. Specify exactly what cannot appear in the content, and explain the regulatory reason so the creator understands this isn't arbitrary.

**Non-negotiable must-avoids for any crypto campaign:**

- **Price predictions.** No "could reach $X," no "analysts predict," no "$[token] is undervalued." This is the fastest way to attract SEC scrutiny in the US.
- **Guaranteed returns.** Any language implying the reader will profit from holding or staking. This falls under the anti-fraud provisions of both the FTC and Securities Act §17(b).
- **"This is not financial advice" as a disclaimer that unlocks bad claims.** The disclaimer doesn't sanitize what precedes it. The SEC is explicit on this.
- **Unverified technical claims.** If your smart contract hasn't been audited by a named firm, don't have creators claim it has.
- **Competitor comparisons by name.** These invite legal responses and usually read as desperation.

Add any project-specific avoids. For a token with active vesting schedules, add "no claims about token price at unlock." For an exchange with pending regulatory approval in a specific market, add "no claims about availability in [jurisdiction]."

### Section 5: Deliverables by platform and format

Specify exactly what you're paying for. Vague deliverable scopes are how disputes start.

**Template:**

| Platform | Format | Minimum specs | Window |
|----------|--------|---------------|--------|
| X (Twitter) | Thread (4–8 tweets) | First tweet: hook + disclosure | T-48h to T+0 |
| X | Single post | 280 chars, disclosure in first 50 chars | TGE day |
| YouTube | Long-form review | 8–15 min, verbal + on-screen disclosure, UTM link in description | T-7d to T-3d |
| Telegram | Channel post | 150–300 words, disclosure + unique referral link | T+0 |
| YouTube Shorts / TikTok | Short-form | 60–90 sec, verbal disclosure in first 10 sec | T+0 to T+3d |

Include the attribution link in this table. Each creator gets a unique UTM-tagged URL or referral code. Not a shared link. If you use a shared link, you can't attribute conversions to individual creators and you can't measure ROI per creator.

For DeFi products, the conversion chain you want to track is: creator link > landing page view > wallet connect > first on-chain action. Build the tracking before the brief goes out. If attribution isn't live before the first post publishes, you've lost that data permanently.

### Section 6: Required disclosure language

This is the section most briefs skip or underspecify. Don't.

**Disclosure requirements by jurisdiction:**

**US (FTC + SEC):**
- Written text: "#ad" or "Sponsored by [Project Name]" must appear in the caption's first visible characters, before any "more" truncation point on X or Instagram.
- Video content: spoken aloud in the first 10 seconds AND displayed on screen during the disclosure callout. "Thanks to [brand]" or "collab" do not satisfy the requirement.
- If your token could be classified as a security: the creator must also disclose compensation amount and that the content isn't investment advice. The SEC's anti-touting provision under Securities Act §17(b) requires disclosure of the nature, source, and amount of compensation, which is stricter than the FTC standard.

**EU (MiCA, in force since 2023):**
- The communication must be clearly identifiable as a marketing communication.
- Claims must be consistent with the published white paper.
- Where a white paper exists, the communication must state that one has been published and direct readers to where they can find it.
- "Fair, clear and not misleading" applies to every creator post, not just brand-published content.

**UK (FCA):**
- Crypto financial promotions to UK consumers must be approved by an FCA-authorized person before publication unless the project holds its own authorization.

**Template disclosure text to drop into the brief:**

> "This post is sponsored by [Project Name]. I received [compensation type - cash/tokens/both] for creating this content. This is not financial advice. Crypto assets are volatile; you may lose the amount you invest. Do your own research."

Require this text verbatim, or a natural-language equivalent that contains the same elements. Do not let creators paraphrase it into "I may hold tokens mentioned" and call it done.

### Section 7: Approval process

Two rounds maximum. More than two and you've killed the creator's voice and your timeline.

**Template:**

> **Draft deadline:** Creator submits draft content to [contact name and email] by [date, ideally T-5d from planned publish].  
> **Review window:** 48 hours for feedback. We will not ask for wording changes that alter the creator's voice. We will flag: factual inaccuracies, compliance violations, missing disclosure language.  
> **Final approval:** Creator publishes after written sign-off from [name]. No changes permitted after sign-off without mutual agreement.  
> **Kill-fee clause:** If we request significant changes after the first round, or if we pull the content for reasons unrelated to compliance, [X]% of the agreed fee is payable regardless.

That last clause matters. If you kill a piece of content because your token price moved or your exchange listing got delayed, the creator still spent time producing it. Kill fees maintain the relationship and your reputation in the creator community. This is a small market. Founders who burn creators get known for it.

### Section 8: Off-script protection clause

This is the clause that protects you legally if the creator publishes something you didn't sanction.

**Template (get this reviewed by counsel before use):**

> Creator agrees that any claims made in the content not approved in writing by [Project Name] ("Off-Script Claims") are the sole responsibility of the creator. Creator indemnifies [Project Name] against any regulatory action, civil claim, or reputational harm arising directly from Off-Script Claims. [Project Name] reserves the right to request takedown of any content containing Off-Script Claims within 24 hours of publication. Creator agrees to comply with any such request within 6 hours.

Put this in the contract, not just the brief. The brief is a working document. The contract is the legal instrument. Both should reference compliance with FTC, SEC, and MiCA requirements, and both should require the creator to maintain records of the live post, the disclosure, and payment for at least three years.

---

## What good looks like in practice

When I ran the RARI Foundation's Rari Chain mainnet launch on Arbitrum, the angle was sharp before a single creator was briefed: the chain existed to protect NFT creator royalties at the protocol level, not as a UI feature that could be toggled off. That single-sentence take shaped every piece of content. Creators could explain it in their own voice because the logic was simple and verifiable. Coverage landed in CoinDesk, The Block, and Cointelegraph the same week.

The brief didn't tell creators what to write. It told them what the audience must understand when they're done reading.

---

## The three signs a brief will fail

**It describes the product, not the audience's problem.** "We are a layer-2 with sub-cent gas fees" is a product description. "Your audience pays $15 in gas every time they want to move assets on mainnet; this eliminates that" is a problem framing. Creators can turn problem framings into content. Product descriptions read like press releases.

**It has no must-avoids section.** If a creator doesn't know what they can't say, they'll say something they shouldn't. Crypto has too many compliance tripwires for a brief that only covers the positive case.

**The attribution link is missing or shared.** A single link across 20 creators isn't attribution. It's a conversion count with no per-creator breakdown. You'll never know which creator drove results and which didn't, which means you'll make the same mistakes with the same roster next campaign.

---

Finding good crypto writers and creators has always been harder than founders expect:

> Finding real good #crypto writers is quite a task.  
> Does anyone else feel the same?
>
> [Shilika Jain on X, 26 Feb 2022](https://x.com/Shilika_jain/status/1497617125430951937)

That hasn't changed. A great brief doesn't fix a weak creator selection. But a weak brief ruins a great creator selection. Get the brief right first.

---

[Book a 30-min teardown with Shilika](https://calendly.com/shilikajain/30min/), bring your existing brief or your upcoming campaign, and we'll build the compliance-ready version together.$b100$
where slug = 'crypto-kol-brief-template-web3' and md5(body) = 'dcd679589a8dc3134ceff62e6dd08c1a';

update blog_posts set body = $b100$# DePIN PR Playbook: How to Turn Node Counts Into a Category-Defining Tier-1 Narrative

The DePIN sector now has more than 1,500 active projects globally, over 13 million devices contributing daily, and $72 million in verified onchain revenue for 2025. By any objective measure, this is a real industry. Yet most DePIN founders I talk to can explain proof-of-coverage mechanics in granular detail and still can't give a Forbes editor a reason to run the story this week.

That's the gap this post closes.

I've spent the last two years building Fluence Network's press position across CoinDesk, Cointelegraph, Decrypt, Benzinga and e27, and the pattern I keep seeing is this: DePIN is a category that earns coverage when the founder stops explaining the protocol and starts arguing a position about the world. Node counts, uptime figures, and tokenomics structures don't make a story. The thesis behind them does.

---

## The Two-Audience Problem Nobody Talks About

Before you pitch a single journalist, you need to get honest about who you're actually talking to. DePIN has two distinct audiences that read completely different press and respond to completely different framings.

**Audience one: node operators.** They live on Telegram, Discord, and YouTube. They care about yield, setup costs, hardware ROI, and whether the network is adding locations that matter to their deployment. The press they read is crypto-native: CoinDesk, Cointelegraph, Blockworks, token-specific newsletters. They want numbers that tell them whether it's worth plugging in another device.

**Audience two: enterprise demand-side.** An AWS customer evaluating whether to route workloads to a decentralized compute network reads TechCrunch and Wired. A logistics company evaluating a sensor network reads trade verticals specific to their industry. They don't understand what a proof-of-coverage mechanism is and don't need to. They want to know whether this is cheaper, faster, or more resilient than what they already use.

Most DePIN PR campaigns fail because they write for audience one and try to place it with outlets that serve audience two, or vice versa. Sorting that out before you touch a pitch template saves you three months of dead-end outreach.

The coverage map, roughly, looks like this:

| Audience | Primary outlets | What they need from the story |
|---|---|---|
| Node operators / crypto-native | CoinDesk, Cointelegraph, Blockworks, Messari Research, Decrypt | Network data, token economics, technical credibility |
| Enterprise demand-side | TechCrunch, Forbes, Wired, industry trade press | Business case, cost delta vs incumbents, named customers |
| APAC regional | Bloomingbit, TokenPost, CoinNess (Korea); CryptoTimes JP; ChainCatcher, PANews (China) | Localized deployment numbers, regional node operator communities |

---

## Analogy First, Technical Detail Never

The single most important thing I do when I pick up a new DePIN client is try to kill their whitepaper abstract. Every DePIN founder arrives with a sentence like "a decentralized protocol leveraging cryptographic proofs to incentivize physical hardware deployment for distributed compute workloads." That sentence is accurate. It will never make a story.

Every technical primitive lands in the press through an analogy. The one that worked for Fluence: *the cloud is the last centralized chokepoint in a decentralized stack, and DePIN is the fix.* Simple enough for a Forbes editor to repeat. Defensible enough that a CoinDesk reporter could hang a 700-word analysis on it.

DePIN-native framings you can steal and adapt:

- Compute DePIN: "Airbnb for GPU capacity" or "the AWS alternative that no single company can switch off"
- Wireless DePIN: "Helium proved a community can build a carrier. We're doing it for [specific geography / use case]."
- Storage DePIN: "S3 pricing with no AWS lock-in" (only works if your pricing backs it up)
- Sensor / data DePIN: "The oracle layer for physical-world data that no single company controls"

The analogy isn't dumbing the technology down. It's choosing the frame that lets a journalist file the story without misrepresenting what you built. An editor who doesn't understand the protocol can still run "AWS challenger backed by 40,000 node operators posts $1M ARR." That's a story.

---

## Why Revenue Is the Only Number That Moves a Tier-1 Editor

Here's a thing I've said in dozens of pitch strategy calls: node count is a supply-side metric. It tells an editor how many people are earning tokens. It says nothing about whether anyone is buying the product.

When I was building the narrative for Fluence, the first question I had to answer was not "how many nodes do you have?" It was "do you have revenue?" Fluence had a $1M ARR trajectory in 2025. That number was the floor under every argument we made. A category-creation pitch built on a thesis nobody is paying for collapses the moment an editor checks usage.

> i see so many DePIN & Bitcoin focused projects doing paid press releases even though there's opportunity for some good earned coverage!! it's honestly stupid, let's chat!
>
> [Shilika Jain on X, 5 Apr 2025](https://x.com/Shilika_jain/status/1908499569916125588)

That post came out of frustration. Projects with genuine traction hiding behind wire services when a well-crafted pitch to one CoinDesk reporter would have landed something that actually moves the needle.

The hierarchy of numbers that actually move editorial decisions, ranked:

1. **Revenue (ARR or run-rate)**: the only number that closes the "is this real" question
2. **Named enterprise customers or partnerships**: a recognizable brand as a demand-side reference
3. **Active node count with a use-rate attached**: 40,000 nodes with 60% utilization is a story; 40,000 nodes with 2% utilization is not
4. **Cost comparison**: percentage cheaper than AWS / Google Cloud at equivalent SLAs
5. **Raw node count alone**: useful for community coverage; rarely sufficient for tier-1

If you don't have revenue yet, the story has to be different. More on that below.

---

## The Category-Voice Playbook: What We Did for Fluence

The mandate from Fluence wasn't "get us coverage." It was: make DePIN a category the press files into, and make Tom Trowbridge the person editors call when they need a DePIN take.

That's a meaningfully harder brief. It's also the one that compounds.

The sequencing mattered as much as the assets:

**Asset one: the CoinDesk Opinion column.** The argument, "DePIN is not a meme, it can take crypto mainstream," was published in April 2025. A founder opinion piece at CoinDesk carries institutional weight that a news mention doesn't. It puts Tom's name in the Opinion desk's system. It becomes a citable primary source for anyone reporting on DePIN going forward. That piece is the foundation everything else sits on.

**Asset two: the Cointelegraph "Hashing It Out" feature.** A podcast-plus-article format on DePIN's role in the next cycle. Different format, different audience segment, same thesis reinforced. Cointelegraph reaches a crypto-native audience that CoinDesk Opinion doesn't fully capture.

**Asset three: Decrypt analysis.** Decrypt's editorial DNA is translating crypto into language a mainstream reader can follow. The framing for the Decrypt piece was "why DePIN solves tech's biggest issues," which is a different argument than the CoinDesk contrarian frame but compatible with it.

**Asset four: the newsjack.** When the July 2024 global Microsoft outage happened, I had an e27 piece ready within 48 hours connecting the outage to the structural argument for DePIN compute. Newsjacking a mainstream event gave an infrastructure story a reason to run outside crypto media. A DePIN founder who can articulate *why the AWS outage is their problem to solve* earns mainstream press in a way no product announcement ever will.

The sequence matters. The founder defines the category in a bylined piece, the news announcements land inside that frame, and the reporter can cite the founder as the person who called the shift. Trying to skip straight to the CoinDesk Opinion without building any of the underlying credibility just means an email that doesn't get returned.

---

## Embargo Timing for DePIN Announcements

DePIN project milestones that are embargoed well outperform the ones that hit the wire and hope.

My standard approach for a mainnet launch or major partnership announcement:

- **T-minus 96 to 72 hours**: Exclusive offer to one tier-1 outlet. CoinDesk or The Block for infrastructure stories. Decrypt if the story has a consumer or enterprise angle that plays to their editorial voice. One outlet, one reporter, one exclusive. Not a blast.
- **T-minus 48 hours**: Secondary briefings under embargo to 3 to 4 additional outlets: Cointelegraph, Blockworks, and one APAC outlet if you have deployment in the region.
- **T-zero**: Wire distribution and regional language press simultaneously with embargo lift.
- **T-plus 24 to 48 hours**: KOL waves. Node operators and ecosystem accounts first. Macro crypto accounts second.

The embargo break is the most common DePIN PR disaster I see. It usually happens because someone on the founding team posts on X before the lift time, or because a KOL you briefed early shares ahead of schedule. The fix is a single, written embargo confirmation from every person briefed, and a briefing doc that has the lift time in the first line in bold.

If you're in APAC, the time zone maths matters. A 9am EST embargo lift is midnight in Singapore. Regional reporters in Korea and Japan won't catch it until morning their time, by which point the story has already circulated in English. Build in a 24-hour APAC window or coordinate a simultaneous regional lift in local-language outlets like Bloomingbit or CryptoTimes JP.

---

## Pre-Revenue DePIN: A Different Story, Not No Story

Most DePIN projects I see are pre-revenue. They have node counts. They have community. They don't yet have customers paying for the output.

That's not a reason to wait. It's a reason to tell a different story.

The pre-revenue DePIN narrative has to do three things:

1. **Establish the supply-side proof point.** Node count with utilization rate, geographic distribution, and hardware specifics. "12,000 nodes across 47 countries, 65% active in the last 30 days" is defensible. "Thousands of nodes globally" is not.
2. **Make the demand case structural, not speculative.** Point at the market you're displacing with real pricing data. "Enterprise GPU compute at $0.40 per hour vs AWS at $3.20" is a number a reporter can put in a story.
3. **Name the analogues that worked.** Helium proved that a community-operated wireless network can reach carrier scale. Filecoin demonstrated that decentralized storage can pass enterprise due diligence. Your protocol doesn't have to be the first to prove the category; it has to credibly occupy a sub-category that isn't already owned.

Pre-revenue DePIN is also where founder profiling earns its keep. Before you have revenue to anchor a news cycle, you need a founder who is cited as a category voice. That's an op-ed in Cointelegraph's Innovation section, a Blockworks podcast, a Decrypt interview that puts a name to the thesis before the mainnet announcement.

---

## The Journalist Targeting Map for DePIN in 2026

Not every DePIN story belongs in every outlet. Precision on the beat is the single biggest unlock in pitching.

- **CoinDesk**: Infrastructure stories with a technical argument and real numbers. The Opinion desk for founder theses that make a contrarian claim. Pitch to the infrastructure or technology beat, not the markets desk.
- **Blockworks**: DePIN economics, token mechanics, the node operator perspective. Blockworks readers are sophisticated about crypto-economic models. You can go deeper on tokenomics here than anywhere else in tier-1.
- **Decrypt**: The translation layer. Pitch Decrypt when you can explain why DePIN matters to a person, not a node. Enterprise demand-side stories, consumer applications, human-interest angles on node operators.
- **Cointelegraph**: Podcast formats (Hashing It Out, others), Innovation section bylines, broader ecosystem pieces. Good for category-setting narratives.
- **Forbes (crypto / tech verticals)**: Founder profiles and funding announcements with a business story attached. Forbes needs a business case and a recognizable-name reference. A revenue number and a named investor or customer are the minimum.
- **TechCrunch, Wired**: Demand-side stories with enterprise relevance. Newsjacking mainstream outages or AI compute shortages. These outlets won't cover the protocol; they'll cover the problem the protocol solves if the timing is right.

> there are no tier 1 companies in web3, it's all tier 1 founders
>
> [Shilika Jain on X, 30 Dec 2024](https://x.com/Shilika_jain/status/1873798962156879950)

That's the frame that makes DePIN PR make sense. The protocol is the vehicle. The founder arguing the category thesis is the story. Editors at CoinDesk and Forbes aren't covering Fluence; they're covering Tom Trowbridge's argument that DePIN is the infrastructure layer that makes the decentralized web actually work. The protocol gets named in the byline.

---

## Common Pitfalls

**Pitching node count without utilization.** An editor who has covered three DePIN projects this year has seen 100,000-node announcements that don't have a single paying customer. The node count is now a credibility hurdle, not a hook. Always attach utilization rate.

**Sending the same pitch to CoinDesk and Cointelegraph simultaneously.** These are tier-1 peers who occasionally compete for the same stories. Giving both the same exclusive pitch means neither will run it as an exclusive. Sequence them.

**The "DePIN explains itself" fallacy.** Founders who assume that if they explain the technical architecture clearly enough, the story will be obvious. It won't. A journalist on deadline doesn't have 20 minutes to understand proof-of-coverage before they decide whether to file. The narrative has to arrive pre-assembled.

**KOL campaigns without tier-1 earned coverage first.** KOL amplification works on community conviction. If there's no tier-1 article for KOLs to share, you're asking them to do all the credibility-building work themselves. The sequence is editorial first, KOL amplification second.

**Treating APAC as a translation task.** Korean DePIN coverage doesn't come from translating an English press release and sending it to a Korean outlet. It comes from understanding that Korean reach flows through Naver-syndicated mainstream outlets like Hankyung and E-Daily alongside Telegram-heavy apps like CoinNess. Japan requires CryptoTimes JP and BeInCrypto JP, with localized framing around the specific geographic deployment data that's relevant to Japanese readers. Different market, different pitch.

---

## What This Looks Like Operationally

To summarize the process in order:

1. **Revenue check**: Do you have it? If yes, it anchors everything. If not, what's the strongest proxy metric (utilization, named pilot customers, verifiable cost delta)?
2. **Analogy first**: One sentence that translates the protocol into a frame a non-crypto editor won't misrepresent.
3. **Audience map**: Node operators, enterprise demand-side, or both? Which outlets serve each?
4. **Founder positioning**: Op-ed or podcast before the news announcement, so the reporter has a named source to cite.
5. **Tier-1 exclusive**: One outlet, one reporter, 72 to 96 hours before lift. Not a blast.
6. **Newsjack calendar**: What mainstream events (AI compute shortages, cloud outages, data sovereignty regulations) could accelerate your story into non-crypto press?
7. **APAC window**: If you have regional deployment, coordinate local-language coverage separately.
8. **KOL waves**: After tier-1 coverage lands, not before.

The most important X post I made in 2022 still holds for DePIN in 2026:

> Storytelling is a dead-killer skill you must have irrespective of working in crypto or not! Cut the crap, nail the hook. Structured stories do the magic. Include information. Make the story meaty. Understand your audience.
>
> [Shilika Jain on X, 22 Dec 2022](https://x.com/Shilika_jain/status/1605933584501440512)

DePIN is a real industry with $72M in verified revenue and more devices contributing daily than most people realize. The projects that earn tier-1 coverage aren't the ones with the most nodes. They're the ones whose founders can argue a position about the world that makes the protocol the proof point.

That's the whole playbook.

---

**[Book a 30-min teardown with Shilika](https://calendly.com/shilikajain/30min/)**: bring your current narrative, your target outlets, and the milestone you're building toward. I'll tell you what's working and what isn't before you burn the relationship with a pitch that wasn't ready.$b100$
where slug = 'depin-pr-playbook-node-counts-tier-1-narrative' and md5(body) = '0378813e64140b3ff0a67e9a1f99bfb9';

update blog_posts set body = $b100$# AI Security Startup PR: How to Pitch a Company That Sits Between Cybersecurity and AI to Both Beats Simultaneously

If you're building a company that secures AI systems, uses AI agents to run security operations, or detects AI-generated threats, you're not just a security startup. You're not just an AI startup either. You're both, and that creates a PR problem most operators aren't equipped for.

The security beat and the AI beat are two distinct editorial cultures with different story criteria, different analyst maps, and different things that make a reporter pick up the phone. When you send the same pitch to Dark Reading and TechCrunch AI, one of two things happens: the security journalist thinks your pitch sounds like product marketing with no threat data, or the AI journalist thinks you're too deep in the weeds of CVE analysis to be relevant to their enterprise reader. Both ignore you.

Running PR for an AI security company requires two genuinely different pitches, built from the same underlying story, operating on the same timeline. That's what this post covers.

## Why 2026 Is the Year This Problem Gets Expensive

AI security isn't a niche anymore. At Black Hat USA 2026, 35 of 121 briefings focused on AI security, AI red teaming, or LLM-assisted offensive techniques: 29% of every talk at the world's largest enterprise security conference. An exhibitor analysis found that 235 of 450 vendors on the show floor marketed AI or agentic capabilities. Seven of the ten RSAC 2026 Innovation Sandbox finalists either secured AI systems, used AI as a core security engine, or addressed attacks amplified by AI.

This means journalists on both the AI beat and the security beat are swimming in pitches from companies claiming to be at this intersection. The category is noisy. The journalists covering it have seen every variation of "we use AI to stop AI threats" from 200 startups this quarter. Getting through requires understanding that these two groups of reporters are not the same person with different email addresses. They're different audiences with different professional incentives, different editorial constraints, and different definitions of "a good story."

## What the Security Beat Actually Wants

Security journalists at Dark Reading, The Record, CyberScoop, SecurityWeek, and SC Media are serving readers who are CTOs, security architects, and CISOs. The editorial culture is practitioner-first. These reporters are interested in novel applications, technical breakthroughs, significant research findings, and real proof points. They connect that interest to very specific types of evidence.

The highest-value asset you can hand a security journalist is original threat research. A report on a previously undocumented attack technique, a newly tracked threat actor, or a dataset that quantifies a risk most defenders aren't measuring. Vendors who conduct and publish original research get contacted by journalists. Vendors who only comment on other people's research wait in line.

What doesn't work: a pitch that says your product uses AI to detect threats faster, without a single MITRE ATT&CK mapping, no IOC list, no CISO quote from a production deployment. Security journalists see through vendor positioning immediately, and frankly they've been burned by it enough times that a pitch without hard proof gets deleted before they finish reading. A Dark Reading reporter wants the MITRE ATT&CK mapping and the IOC list. A Forbes security desk reporter wants a business-impact number and a company name. Those are different pitches even within the security beat.

Useful proof point types for security-beat pitches:

- Original threat research with quantified scope
- CVE commentary tied to a vulnerability class your product addresses
- Coordinated disclosure narratives where you discovered the vulnerability
- CISO-attributed case studies with specifics (threat reduced, time saved, incident avoided)
- Red team or pen test findings from production environments
- Incident response datasets your team generated

One thing I've been saying directly to founders I work with: if your security PR program can't point to at least one original research asset per quarter, you don't have a security PR program. You have a press release function. Those are different things.

## What the AI Beat Actually Wants

AI reporters at TechCrunch, MIT Technology Review, The Information, Decrypt's AI desk, and Wired are operating with a completely different editorial lens. Their readers want to understand what AI can and can't do, who is winning the race to deploy it at scale, and what the real-world consequences look like at the enterprise level.

For an AI security company, the angle that lands on the AI beat is usually about AI system behavior, not about the attackers targeting it. It's about how AI agents behave in production, what goes wrong when they're misconfigured, and what governance looks like when you have hundreds of AI agents running across HR, CRM, file storage, and communication platforms simultaneously. The Microsoft Black Hat keynote framed this well: when an AI agent is trusted across your entire infrastructure stack, compromising that agent isn't one breach.

AI reporters care about:

- Capability benchmarks with honest comparisons (don't oversell)
- Enterprise deployment realities, not proof-of-concept demos
- The governance and compliance story behind autonomous AI systems
- Policy implications when AI makes consequential security decisions without human review
- Research that reveals how AI systems fail, not just how they succeed

MIT Technology Review has been explicitly bolstering its AI and security coverage, and its editorial guidelines are clear that their reporters need scoops, deep enterprise reporting, and sharp analysis. Commentary-only pitches go nowhere. You need a real finding or a real story to offer. The Information is even more demanding: they're looking for market intelligence that their subscriber base, mostly institutional investors and senior operators, can act on.

The gotcha nobody warns you about: AI reporters at most tier-1 outlets will fact-check your capability claims against public benchmarks and academic papers. If you claim your model performs 40% better than the baseline, they will ask which baseline, against what dataset, with what methodology. If you can't answer that, you've damaged the relationship and you're not getting a second chance.

## Building the Dual-Track Pitch Program

The mechanics of running these two tracks simultaneously without the message falling apart come down to a single discipline: shared narrative, divergent proof points.

The shared narrative is the one true thing your company believes about the state of AI security that competitors aren't saying. It's not a tagline. It's a specific claim about the world that your data or your product existence proves. Geordie AI at RSAC 2026 built their narrative around "air traffic control for AI agents." That claim works in a Dark Reading context (here's how agents get exploited without visibility) and in a TechCrunch context (here's why enterprises need a governance layer before they can scale agentic AI). Same company. Two legitimate stories from the same core position.

Once the shared narrative is locked, you build out divergent proof points for each beat:

**Security track proof package:**
- Threat research report with original data
- CISO reference who will speak on the record about a specific incident or risk reduction
- Technical brief with MITRE ATT&CK or equivalent framework mapping
- Incident timeline or case study with enough specificity that the reporter can independently verify the attack pattern

**AI track proof package:**
- Benchmark data with clear methodology disclosure
- Enterprise deployment case study with scale numbers (number of agents monitored, volume of decisions made, false positive rate)
- Policy or governance angle tying your product to regulatory developments (EU AI Act, NIST AI RMF, SEC disclosure rules)
- A researcher or founder who can articulate a systemic point of view, not just a product pitch

The pitch you send to Dark Reading mentions the CISO proof point in paragraph one. The pitch you send to TechCrunch AI mentions the deployment scale and governance angle in paragraph one. The reporter at each outlet gets a pitch that reads like it was written for them, because it was.

## The Embargo and Timing Problem

Running two simultaneous PR tracks means you're managing embargo coordination with reporters who don't know each other, have different publication cycles, and are competing against each other for some of the same audience. A security journalist at The Record and an AI reporter at TechCrunch are both publishing to enterprise technology buyers. If your embargo drops to both at the same time and both stories run on the same day, you've actually helped both outlets. The coverage confirms the story from two angles.

Where founders get into trouble is treating embargoes as the same thing across both beats. Security reporters are accustomed to standard 48-to-72-hour embargo windows for threat research, often structured as a two-page journalist brief with the one-sentence finding, affected scope, researcher credibility, and patch status. AI reporters are more variable. Some want an exclusive window. Some prefer a briefing call with no written material in advance. Some at The Information will only run proprietary market intelligence they've independently confirmed.

The practical move: brief both tracks during the same 72-to-96-hour embargo window, but brief them separately, with tailored versions of the material. Never send the security brief to the AI reporter and vice versa. A security-dense brief full of CVE references landing in the inbox of an AI journalist who covers enterprise deployments reads as the wrong company for their beat.

## Common Pitfalls That Kill Dual-Track Programs

**Leading with the product on both sides.** Security journalists don't write about products. They write about threats and defenses. AI journalists don't write about products. They write about capabilities, deployments, and consequences. If your pitch leads with "our platform uses AI to provide real-time threat detection," both reporters will stop reading. Lead with the finding or the story, not the product.

**Using AI-generated commentary pitches.** I'll be direct about this one: a cybersecurity reporter at Cybersecurity Dive said publicly that AI-generated or AI-assisted commentary is immediately visible, and it "harms you, it harms us, it harms our readers." The security beat skews technical and experienced. These reporters have read enough vendor pitches to recognize templated AI output on sight. Sending it doesn't just get your pitch ignored. It tags you as someone not worth engaging with next time.

**Conflating the analyst audience.** Gartner, Forrester, and IDC cover cybersecurity with dedicated practices. They want to understand where you fit in the security ecosystem, what you integrate with, and what use cases you address. They're not the same audience as Kuppinger Cole or the AI-focused analysts at IDC's AI practice. Running analyst relations for an AI security company requires mapping which firm covers your category, not just which firms are "big."

**Treating APAC as a single market.** If your company has any presence or ambition in Asia, both beats fracture further. Japanese security media cares about METI compliance angles. Korean security coverage skews toward critical infrastructure. Indian enterprise media wants the business transformation story, not the threat research deep-dive. The dual-track problem becomes a six-track problem, and that's before you account for the fact that some Asian security reporters cover cybersecurity from a policy angle, not a practitioner angle.

**Calling it a "game-changer" anywhere in the pitch.** Both communities have high tolerance for technical detail and low tolerance for marketing language. If that word appears in your pitch, the reporter has already decided you don't understand their beat.

## What the Best-Positioned AI Security Companies Do

The companies that earn coverage on both tracks in the same quarter share one operational practice: they produce original research on a cadence. Not a product announcement dressed up as research. Actual new findings their team generated from production data or controlled testing. That research gives security reporters something to report, gives AI reporters a dataset to interrogate, and gives you legitimate authority on both sides simultaneously.

The GAIA case from my own client work is instructive here, even though GAIA operates in decentralized AI rather than enterprise security. We drove placement in Forbes, Decrypt, and Benzinga from the same founder story by building out divergent proof points for each outlet. Forbes wanted the vision of what decentralized AI agents could do for the broader internet. Decrypt wanted the technical architecture and the node count as validation. Neither pitch shared more than the narrative spine. That's the discipline.

For an AI security company, the equivalent looks like this: your original threat research lands in Dark Reading and SecurityWeek. Your enterprise deployment story with CISO attribution lands in TechCrunch and The Information. Your founder's systemic point of view on AI governance lands in MIT Technology Review or Wired as a bylined piece. Three placements, three different story angles, one coherent underlying company position.

> builders build, PR's pitch lol
>
> [Shilika Jain on X, 28 Mar 2025](https://x.com/Shilika_jain/status/1905715877187838364)

That's flippant but it's also exact. Your job as a founder is to build the company and generate the evidence: the threat data, the CISO relationships, the deployment metrics. The PR job is to translate that evidence into story angles that fit two editorial cultures simultaneously, without making the company sound like a different company to each audience.

That translation is not trivial, and it's not something a generalist agency that also handles SaaS and consumer apps will execute cleanly. The security beat requires pre-existing reporter relationships and a demonstrated understanding of how threat research moves through that community. The AI beat requires knowing which reporters are covering enterprise deployment versus model research versus policy, and pitching accordingly. Running both from the same desk, without sacrificing quality on either side, is exactly the kind of work where embedded fractional support outperforms a junior account team at a large agency.

If you're six to ten weeks away from a funding announcement, a product launch, or a major research drop, and you haven't yet mapped which reporters on both beats will receive your pitch and why, that's the gap worth closing first.

---

**Book a 30-min teardown with Shilika:** [https://calendly.com/shilikajain/30min/](https://calendly.com/shilikajain/30min/)
$b100$
where slug = 'ai-security-startup-pr-dual-track-pitch' and md5(body) = 'ecd733c69a6e6e361d46e0a8c60973da';

update blog_posts set body = $b100$# Web3 PR for Chinese Diaspora: PANews, ChainCatcher, and Beyond

The Chinese-speaking crypto audience is one of the largest, most capital-dense, and most strategically underserved in Web3 PR. Founders running global campaigns consistently treat it as an afterthought: translating an English press release at 11 PM, pasting it into a Telegram group, and calling it APAC coverage.

That approach doesn't work. Not because the outlets are hard to reach, but because you're sending the wrong signal, to the wrong person, in the wrong format, at the wrong time.

I've worked across APAC for the better part of six years (APAC Lead at CoinMarketCap, now leading APAC PR at Myosin) and the Chinese diaspora media market is genuinely different from every other region I operate in. This post breaks down why, and what to do about it.

---

## Why Chinese diaspora media is not a translation problem

The first mistake is calling it "Chinese media" as a monolith. There's no New York Times of Chinese crypto. What exists instead is a collection of outlet clusters, each with a different ownership structure, different editorial incentives, and a different reader profile.

The outlets serving the Chinese diaspora (Hong Kong, Singapore, Taiwan, and overseas Mandarin-speaking communities) publish in simplified or traditional Chinese, distribute across Telegram channels and WeChat Official Accounts, and operate on editorial rhythms that peak between 18:00 and 21:00 CST (that's 10 PM Singapore, well after your US-timed launch has already faded from timelines).

The second mistake is assuming these outlets work like CoinDesk or The Block. Many Chinese crypto media properties operate within exchange-anchored ecosystems. Exchanges act as distribution layers: listings, integrations, and partnerships shape which stories get visibility. Ignoring this reality means you'll miss reach and misread why some pitches land and others don't.

None of this means coverage is pay-to-play. The editorial teams at PANews and ChainCatcher run serious research operations. But you need to understand the ecosystem before you approach it.

---

## The outlets: what they actually cover and who reads them

**PANews** is the outlet I'd call the research anchor of Chinese-language Web3 media. Founded in March 2018 and co-founded by two Forbes Asia "30 Under 30" listers, PANews functions more like a think tank than a news wire. Its team has an international background, and its content combines overseas market trends with local interpretation for Chinese readers. If you're looking for where serious institutional Chinese investors go to read analysis of funding rounds, ecosystem development, and macro positioning, PANews is it. It co-hosts Ethereum events alongside organizations like Wanxiang Blockchain Labs. That context matters: a pitch that reads like a news release will get filtered; a pitch with a genuine analytical angle has a real shot.

**ChainCatcher** was founded in 2018 and sits at roughly 300,000 monthly visits, with a readership made up primarily of professional investors and industry insiders. Its reports are known for depth and unique perspective. It also runs its own data services and industry events, which means it's not purely editorial: there are sponsorship and partnership pathways that matter for event-heavy announcements. For my client RiskLayer's builders-round funding, we secured pickups across ChainCatcher alongside TechFlow, Jinse, PANews, and Blocktempo. The common thread in that run: the story had genuine on-chain data, a named institutional backer, and a clear DeFi security angle that the Chinese DePIN and restaking audience cared about.

**BlockBeats** (律动) is the fast-moving amplifier. Founded in 2018, it was the first Chinese media outlet to introduce concepts like "fat protocol" and Web3.0 to Chinese internet readers. It publishes across China, Taiwan, Hong Kong, and Singapore, and its 600,000 to 700,000 monthly visits skew toward active traders and protocol-native readers. The Newsflash format makes it ideal for time-sensitive announcements. If something breaks in Western crypto media at 2 PM EST, BlockBeats will typically have a Chinese-language summary up within an hour. You want to be the one briefing them before they translate your competitor.

**TechFlow** is where the founders and developers read. It positions itself explicitly as a think-tank media for blockchain technology entrepreneurs, with a focus on the intersection of Web3 and AI. If you're an infrastructure protocol, a DePIN project, or an AI-blockchain hybrid, TechFlow's editorial team will engage with technical depth that most other outlets won't bother with.

**Jinse Finance** (金色财经) is the highest-volume outlet in the group: founded in 2017, millions of monthly visitors, comprehensive market news coverage across Bitcoin, blockchain, and crypto. Jinse syndicates into Tencent, Sina, and Toutiao, which means placements there reach readers outside the crypto-native audience. It's the right outlet for mainstream-crossover narratives: exchange listings, major funding rounds, Hong Kong SFC regulatory milestones.

**Odaily** is backed by 36Kr (China's leading tech media group), which gives it mainstream distribution credibility. It runs 500,000 to 1 million monthly users and has strong coverage of NFTs and DeFi. The 36Kr backing means Odaily editors often think about how a Web3 story translates to a broader tech-investor audience: a frame you can use in your pitch.

**Blocktempo** serves Taiwan specifically. It's the country's leading crypto media platform, and it's the outlet to prioritize for anything with a Taiwanese exchange, VC, or developer ecosystem angle. ChainCatcher and Blocktempo co-produced the 2024 Asia-Pacific Crypto VC Research Report, which tells you how seriously the Taiwanese audience takes cross-strait institutional credibility.

**A note on Forkast:** Forkast News was founded in Hong Kong in 2018, served as the region's defining English-language bridge to the Asian crypto audience, and wound down its editorial operations in late 2023 after merging with CryptoSlam to form Forkast Labs. The gap it left in English-language APAC crypto coverage is real. CoinDesk Asia and several newer outlets have moved to fill it, but there's no direct replacement. If someone tells you to pitch Forkast for crypto news, update their media list.

---

## How the distribution actually moves

Most English-language PR guides treat publication as the end of the funnel. In Chinese diaspora media, it's the beginning.

An article in PANews or BlockBeats will typically be picked up and redistributed across Telegram channels within minutes of publication. Chinese crypto media outlets maintain their own Telegram newsflash channels with tens of thousands of subscribers: BlockBeats' Telegram channel in particular is one of the most-watched real-time sources for Chinese-speaking traders globally. After the exchange-crackdown years that drove crypto communities off WeChat, Telegram became the primary distribution layer for Chinese diaspora crypto news.

WeChat still matters, but differently. WeChat Official Accounts function as owned media for projects and protocols: controlled newsletters that reach existing community members. For organic editorial pickup, you're not pitching WeChat directly; you're pitching the outlets that then get redistributed through WeChat channels.

The practical sequence looks like this:

1. Your pitch lands at BlockBeats, PANews, or ChainCatcher via Telegram DM or email.
2. An article publishes (ideally between 18:00 and 21:00 CST for maximum engagement).
3. The outlet distributes via its own Telegram newsflash channel.
4. Traders and community managers in WeChat groups share the link.
5. KOLs with followings on Chinese X (Twitter) amplify with commentary.

If you're not coordinating steps 2 through 5, you're leaving most of the reach on the table.

---

## The Hong Kong SFC licensing narrative: how it travels

Hong Kong's regulatory posture has become the single most powerful credibility signal in the Chinese diaspora market. The SFC has issued a growing number of crypto trading licenses since mid-2024, and its ASPIRe roadmap, which now allows licensed exchanges to integrate their order books with global platforms, positions Hong Kong as the compliance gateway to Greater China capital.

For founders with an SFC-licensed narrative, that's a tier-1 angle with the Chinese diaspora press. PANews readers are institutional. ChainCatcher readers are professional investors. These audiences care whether your protocol can be accessed through a licensed venue, whether you're integrated with one of the seven-plus SFC-licensed exchanges, and whether your compliance posture is compatible with Hong Kong's framework.

If your project is seeking institutional Chinese capital but doesn't yet have an HK regulatory hook, the alternative is to build the story around a named Hong Kong-based investor, an advisor with SFC-relevant credibility, or a listed partnership with an SFC-licensed exchange. The absence of regulatory clarity is exactly the signal that gets your pitch deprioritized.

This isn't just theory. When I worked on DePIN Day Hong Kong for Fluence x Titan Network, the Chinese-language pickup in Blocktempo came because the event was anchored in Hong Kong, there was a named local partner, and the compute narrative spoke directly to infrastructure interests the Chinese tech investor community already tracked.

---

## Structuring a bilingual press strategy

A single English-language press release with a machine-translated Chinese version is not a bilingual strategy. It's a credibility problem.

The Chinese-language version needs to be:

- **Written in simplified Chinese for mainland diaspora audiences** (PANews, ChainCatcher, BlockBeats, TechFlow, Jinse, Odaily) or traditional Chinese for Taiwan and Hong Kong (Blocktempo, some HK outlets).
- **Re-angled, not just translated.** The English version might lead with total funding raised. The Chinese version should lead with which APAC ecosystem partners are involved, which exchange listing follows, and which institutional Chinese investors participated, because that's what drives editorial interest in these markets.
- **Shorter in the body, with a stronger data hook.** Chinese crypto editors, especially at PANews and ChainCatcher, are more likely to pull statistics and on-chain data as their editorial spine than the founder quote that dominates English-language coverage.

The pitch itself should go via Telegram DM to named editors, not to a generic press inbox. Most Chinese crypto outlets have Telegram channels where their editors are active and accessible. A three-sentence pitch in Chinese, with a link to the bilingual release, works far better than a formal email sent to a form address.

> Networking and outreach skills are so so important in web3! Irrespective of whether you're working in BD, partnerships, PR, devrel or community — being able to network and reach out to new folks in time can work wonders.
>
> [Shilika Jain on X, 10 Aug 2023](https://x.com/Shilika_jain/status/1689666475773296641)

That holds in every language. The Chinese diaspora media market specifically rewards warm introductions: from a shared investor, from an exchange partner, from another founder who has already placed coverage. Cold outreach to a PANews editor with no prior relationship can work, but a warm intro from someone they already trust cuts the response time from weeks to hours.

---

## Common mistakes that kill Chinese diaspora pitches

**Pitching in English only.** Even at outlets with bilingual team members, an English-only pitch signals that Chinese readers are an afterthought. Some editors will pass; most won't reply.

**Leading with token price or return projections.** Chinese crypto editors are sophisticated. Anything that reads like a pump signal gets filtered immediately, both because it damages their credibility and because it's not a story: it's a press release for a marketing team.

**Sending on a US timeline.** A press release embargoed to lift at 8 AM EST lands at 9 PM CST. Chinese editorial cycles peak in early evening CST. You'll miss the first-day cycle entirely, which means you don't get the BlockBeats Telegram newsflash pickup, and the story is already two days old by the time Chinese editors revisit their inboxes.

**Using the same angle for every outlet.** PANews wants analytical depth and market positioning. Jinse wants a quick news hook for high volume. TechFlow wants the technical architecture story. BlockBeats wants a fast summary with a data point. One pitch, one angle, sent to all four simultaneously: that's four rejections.

**Neglecting Blocktempo for Taiwan.** Founders running an APAC campaign who exclude Taiwan lose access to one of the most crypto-active and technically sophisticated investor markets in the region. Taiwan's crypto adoption per capita is genuinely high, and Blocktempo has established itself as the credible editorial voice for that audience.

---

## What the competitive landscape on the English SERP doesn't tell you

Every English-language guide to Chinese crypto media gives you outlet names and monthly visit numbers. Almost none of them tell you the exchange-media relationships that shape what actually gets covered, the editorial preferences by outlet, the CST timing issue, or the difference between a PANews research pitch and a Jinse news-flash pitch.

That gap is the operational problem. You can build a media list from a PANews article on Chinese crypto outlets. You can't build a working pitch strategy from one.

If you're running a global campaign with Chinese diaspora coverage as a meaningful objective, the move is to bring in someone who has the Telegram relationships, the bilingual pitch capability, and the track record of placements in this specific cluster of outlets, not someone who has placed CoinDesk articles and assumes the same approach transfers.

It doesn't.

---

[Book a 30-min teardown with Shilika](https://calendly.com/shilikajain/30min/), we'll look at your current narrative, which Chinese outlets it's right for, and what the bilingual pitch should actually say.
$b100$
where slug = 'chinese-diaspora-crypto-media-panews-chaincatcher' and md5(body) = 'b9f07ae9a4cc8bc6ad659bc22bb4f911';

update blog_posts set body = $b100$# Holding Statement Templates for Web3 Crises: Hacks, Exploits, Depegs and Rug Pull Allegations

A holding statement is the first thing you publish when something goes wrong and you don't yet have all the facts. It's not your full postmortem. It's not a denial. It's proof of life: you're aware, you're moving, and you're not hiding.

The templates on TextExpander, PRLab, Workshop and every other generic source cover "product recall" and "environmental incident." None of them are built for a protocol whose TVL just dropped 60% on-chain in real time while Crypto Twitter is already writing your obituary.

This post gives you five pre-mapped holding statements for the crisis types I see most often in Web3. Each one comes with channel-specific variants so you're not copy-pasting the same paragraph into Discord and your status page and hoping for the best.

---

## Why generic holding statement templates don't work in Web3

The standard enterprise template runs something like: *"We are aware of an issue. We are investigating. We will share more soon."* That's fine when you're a bank dealing with a customer data breach.

It fails in Web3 for three reasons.

First, your community is already on-chain. They can see the attacker wallet draining funds before you've finished your internal triage call. By the time you post the generic "we are investigating" statement, the community has read the Etherscan transaction and filled every gap with speculation. Your holding statement has to acknowledge the on-chain reality, not pretend it doesn't exist.

Second, you have five channels running simultaneously. X, Discord, Telegram, your blog and your status page each have different audiences, different character constraints and different trust registers. A Discord pin from a mod reads differently from an X thread from the founder. You need channel-specific language, not one blob of text.

Third, rug pull allegations are a category that doesn't exist in enterprise PR. The reputational accusation can hit before any technical failure. Your holding statement has to function as a denial and an evidence commitment at the same time.

> "It takes years to build reputation and credibility! One wrong move and boom, everything's into the ashes!"
>
> [Shilika Jain on X, 19 May 2023](https://x.com/Shilika_jain/status/1659474429011976198)

I wrote that during Ledger's 2023 recovery key controversy. The principle holds for every crisis type below.

---

## The anatomy of a Web3 holding statement

Every holding statement, regardless of incident type, needs four things:

1. **Acknowledgment**: what happened, stated plainly, without euphemism
2. **Action**: what your team is doing right now
3. **Authority**: where the community should go for official updates (your X handle, your Discord announcements channel, your status page)
4. **Timeline**: a specific time by which you will say more

What it does not need: root cause, attribution, blame, compensation details, legal conclusions. None of that belongs in a holding statement. You do not have it yet, and if you speculate in the first statement, you'll spend the next 48 hours correcting yourself.

One more thing: once the holding statement is published, lock down individual team member accounts. No one on the team posts anything until the full update is ready. Founder tweets during a live crisis almost always make it worse. Centralize all messaging on the project account.

---

## Crisis type 1: Smart contract exploit

**What it looks like:** On-chain analytics (PeckShield, Chainalysis, Rekt News) flags anomalous fund movements. Your TVL is dropping. Users are asking what's happening. You are mid-triage and don't know scope yet.

**Time pressure:** 60 minutes from internal confirmation to public statement. Not 2 hours. Not "when we know more." Sixty minutes.

**Holding statement template:**

> We are aware of an ongoing incident affecting [protocol name] on [chain]. Our team is actively investigating the affected contracts and we have [paused contract functionality / halted deposits and withdrawals] as a precaution while we assess the situation. We are working with [security partner name, or "our security partners"] to determine scope. Do not interact with the protocol until further notice. We will publish a full update at [specific time, e.g., 18:00 UTC]. All official updates will come from this account and our Discord announcements channel only.

**X variant (280 characters):** Cut to the first two sentences and the update time. Pin it. Do not add context in replies yet.

**Discord variant:** Post the full template in #announcements with @everyone. Lock the general channel or activate slowmode to stop speculation from drowning out the update. Mods should sticky a message: "Please wait for the official update at [time]. Do not share unofficial links."

**Status page / blog:** Post the holding statement as-is. Add a timestamp. This becomes the canonical reference every journalist and analytics account links to.

**Telegram:** Mirror the X variant exactly. Pin it. Tell the moderators to direct all questions to the status page link.

---

## Crisis type 2: Hot wallet compromise

**What it looks like:** A hot wallet tied to the treasury, operations or a team member is drained. This might be a phishing incident, a compromised private key or a SIM swap. Funds are gone. The question is whether the protocol itself is at risk.

**The communication challenge:** You need to separate "hot wallet compromise" from "smart contract exploit" clearly and quickly, or the community treats them as the same thing. One threatens protocol security; the other is a contained loss.

**Holding statement template:**

> We are aware that [treasury hot wallet / team operational wallet] address [0x...] has been compromised and drained of [amount, if known]. This is an isolated incident affecting a single hot wallet. The [protocol's smart contracts / cold storage / main treasury multisig] are not affected and remain secure. We have immediately [revoked permissions / moved remaining assets / notified exchange partners to flag the attacker address]. We are working with [security firm] on attribution and will file a report with [relevant authorities]. Full update by [time] at [status page URL].

**What to stress:** The word "isolated." If it genuinely is isolated, say it early and say it clearly. If you're not sure yet, don't say it. "We have no evidence of broader contract exposure" is acceptable if it's accurate.

**Channel note:** For a hot wallet compromise, the status page and blog carry more weight than Discord. The technical audience you need to reassure is reading on-chain data and will want a link to the specific wallet addresses and your technical statement. Get the blog post up fast.

---

## Crisis type 3: Oracle failure or manipulation

**What it looks like:** A price feed is manipulated or fails, triggering incorrect liquidations, inflated collateral values, or a flash loan attack. Users have lost funds through no fault of their own. The mechanism is technical and hard to explain quickly.

**The communication challenge:** Most of your community doesn't understand what an oracle is. You're trying to explain a technical failure to people who are watching their balances drop. Don't lean on jargon in the holding statement. Explain the effect first, the mechanism second.

**Holding statement template:**

> We have identified an issue with the price feed used by [protocol name] that caused [brief effect: incorrect liquidations / inflated collateral ratios / unauthorized borrowing]. We have paused affected markets to prevent further impact. No user action is required at this time. Do not attempt to interact with [specific pool/function]. We are working with [oracle provider name, or "our oracle provider"] and [security firm] to understand the full scope. Affected users will be identified and we will communicate a remediation path in our full update at [time]. All official communication is on this account and at [status page URL].

**What not to do:** Don't name the oracle provider as the cause until you have confirmed it. "A price feed issue" is accurate without assigning blame before you've verified the technical report.

**X variant:** Lead with the effect and the pause. "We have paused [markets] due to a price feed issue. No action needed. Update at [time]." Two sentences. People will read the rest in the linked blog post.

---

## Crisis type 4: Stablecoin depeg

**What it looks like:** Your stablecoin, or a stablecoin you're relying on as collateral, has broken peg. Price is at $0.85 and falling. Redemption queues are building. The community wants to know if this is a Terra/Luna situation.

**The communication challenge:** Every depeg looks like a potential death spiral to people who lived through May 2022. Your holding statement has to address the mechanism of the depeg and the state of reserves, even if preliminary.

**Holding statement template:**

> [Token name] is currently trading below peg at approximately $[price]. We are aware of the situation and are actively monitoring [peg mechanisms / redemption queues / collateral ratios]. [Insert one factual sentence about current collateral status, e.g., "Current protocol reserves stand at $X, covering Y% of outstanding supply as of this statement."] This is not a Terra-type algorithmic failure. The peg mechanism is [brief description, e.g., "backed by overcollateralized on-chain assets"]. We have [activated redemption / paused new mints / contacted market makers] to support the peg. Full technical update at [time]. Official updates only via [channels].

**Why the Terra reference matters:** You have to say it. "This is not a Terra-type failure" sounds defensive in any other industry. In Web3 after May 2022, not saying it is worse. Your community is already thinking it. Address it in the holding statement.

**Status page:** Post the collateral ratio number and update it every 30 minutes until the peg recovers or you've published the full update. Real-time numbers calm people more than any amount of reassuring language.

---

## Crisis type 5: Rug pull allegation

**What it looks like:** A wallet analytics account or crypto journalist posts a thread alleging insider token dumps, back-door contract functions, or suspicious liquidity removals. You're not down bad on-chain, but the allegation is spreading fast and the token is already dumping on sentiment.

**The communication challenge:** This is a reputational crisis, not a technical one. Your holding statement is a denial and an evidence commitment rolled into one. It has to sound like a team that has nothing to hide, not a team reading from a legal script.

> "founders are naturally born FUD-fighters."
>
> [Shilika Jain on X, 27 Feb 2023](https://x.com/Shilika_jain/status/1630273600132644864)

True. But fighting FUD effectively requires discipline. Emotional denials make things worse. What works is evidence, fast.

**Holding statement template:**

> We are aware of the allegations circulating about [token/project]. Our team is actively reviewing the specific claims and we take this seriously. We will publish a full response with on-chain evidence, including complete team wallet histories and vesting contract addresses, by [specific time, e.g., 6 hours from now]. All official updates will come from this account and our Discord announcements channel only. Legal counsel is engaged. We are not going anywhere.

**What to avoid:** Emotional denials. Attacking the accuser by name. Technical detail you haven't verified. Promises you can't keep within the stated window.

**X variant:** Post this verbatim. Pin it. Founder account goes quiet until the full response is ready.

**Discord variant:** Post the holding statement in #announcements. Do not delete critical comments: doing so accelerates distrust faster than almost anything else.

**The follow-through:** The holding statement buys you 4 to 6 hours. You need to use that window to assemble the on-chain proof bundle: team wallet addresses, vesting contract transactions, full token distribution data. Publish it as a full blog post with linked Etherscan entries, then thread it on X. The holding statement is only as good as the evidence you publish after it.

---

## The decision matrix: which template, when

| Crisis type | First channel | Hold duration | Named evidence required in hold? |
|---|---|---|---|
| Smart contract exploit | X + Discord simultaneously | 60 min max | No |
| Hot wallet compromise | Status page + X | 90 min max | Yes (wallet address) |
| Oracle failure | X + blog | 60 min max | No |
| Stablecoin depeg | Status page (live data) | 30-min update cadence | Yes (collateral ratio) |
| Rug pull allegation | X + Discord simultaneously | 4–6 hours max | No (saves for full response) |

---

## Three mistakes that turn a holding statement into a liability

**Publishing too late.** Every hour of silence is an hour the community fills with speculation. If you wait until you have the full picture, Rekt News and Crypto Twitter have already written the story for you.

**Over-lawyering the language.** Legal teams write holding statements that protect against liability but communicate nothing. The result is a statement that reads as evasion. Lawyers should review your holding statement, not write it. Communicators write it.

**Inconsistent channel versions.** The Discord says one thing, the X thread says another, the blog contradicts both. Message fragmentation is itself a crisis amplifier. One canonical statement, distributed verbatim (with format-appropriate edits for character count), across every channel simultaneously.

---

## Pre-build these before you need them

The worst time to write a holding statement is during the crisis.

The right time is in a quiet week before any launch. Identify your top 3 to 5 reputational risk scenarios, draft a holding statement for each, get legal to review them, and store them somewhere your entire team can access in under two minutes at 2am on a Sunday.

If you want a senior operator to do that with you, including mapping your specific protocol's risk register and building the full channel response plan, that's exactly the kind of work I do on a fractional retainer.

> "comms is so underrated in web3 but that's everything! how you communicate w your community, stakeholders, customers, retail users, airdrop hunters, journos is literally everything!"
>
> [Shilika Jain on X, 3 Jun 2025](https://x.com/Shilika_jain/status/1929941601503326277)

Crises don't give you prep time. The preparation is the work.

---

**Book a 30-min teardown with Shilika** to map your protocol's top risk scenarios and build pre-approved holding statement templates before you need them. [Book here](https://calendly.com/shilikajain/30min/)
$b100$
where slug = 'web3-crisis-holding-statement-templates' and md5(body) = '283bd8a3b4c49a46bc0ffb591b4d5a70';

update blog_posts set body = $b100$# The Web3 PR Agency RFP: A Line-by-Line Template for Founders Who Have Been Burned Before

Most founders approach agency selection by requesting pitch decks and comparing vibes. They hop on a 45-minute call, hear about tier-1 relationships and "comprehensive narrative strategies," and sign a 6-month retainer. Three months later, they have a wire distribution report, two Benzinga pickups, and a $20,000 invoice.

The RFP, Request for Proposal, is the document that prevents that outcome. A well-written RFP forces every agency to respond to the same specific questions, commit to the same measurable deliverables, and expose the contract clauses that protect them at your expense.

Generic PR RFP templates exist (Prezly has one, DesignRush has one). They're fine for a B2B SaaS company hiring a consumer PR firm. They will not surface the things that kill Web3 PR engagements: vague outlet tiers, undisclosed KOL pass-through markups, no crisis hour banks, and auto-renewal clauses written so you can't leave.

I've run hundreds of campaigns across CoinDesk, Cointelegraph, Decrypt, Forbes, and Blockworks. I've seen what bad agency contracts look like from both sides of the table. This is the RFP I'd want if I were a founder evaluating agencies today.

---

## Before You Write the RFP: Know What You're Actually Buying

PR in Web3 isn't one service. It's at least five distinct things an agency might or might not include in a retainer:

- **Earned media**: journalist pitching that produces editorial coverage with no payment
- **Wire distribution**: press release distribution to aggregator sites (Benzinga, Yahoo Finance, Cryptonews)
- **Sponsored content**: paid placements labeled or unlabeled, billed as "coverage"
- **KOL / influencer activation**: creator campaigns, often subcontracted
- **Crisis communications**: reactive work when something breaks

Every single one of these has a different cost structure and a different value to your business. Many agencies bundle them under "comprehensive PR" and let you discover the distinction on your third invoice. Your RFP needs to pull these apart by name.

---

## Section 1: Your Company Brief

Keep this tight. Agencies that can't pitch you with limited information will drown you in fluff when you give them too much.

**What to include:**

- Company name, stage (pre-seed through Series B or token-stage), and one-sentence product description
- Target audiences: crypto-native retail, institutional investors, developers, mainstream financial press
- Current press coverage, if any: include links
- Up to three named outlets where you want coverage in the next 90 days (not "tier-1 publications": named outlets)
- Launch events on the calendar: funding round, token launch, mainnet, product release, exchange listing
- Budget range: state a band, not an open question. Agencies that won't share pricing until they know your max are the ones who'll price to it.

Your brief is also a test. Agencies that respond with a generic deck clearly didn't read it. The ones who reference your specific outlets and named events in their proposal read it.

---

## Section 2: Deliverable Requirements (The Part Most Founders Skip)

This is the section that protects you. Generic templates ask for "a list of deliverables." That produces answers like "media pitching, content creation, and strategic counsel", which means nothing.

**For each deliverable category, require the agency to specify:**

### Earned Media Placements

- Minimum number of editorial placements per month at Tier-1 outlets (define Tier-1 explicitly: CoinDesk, Cointelegraph, Decrypt, The Block, Blockworks, Forbes, Bloomberg Crypto, TechCrunch)
- Minimum number at Tier-2 (Cryptonews, Coindesk APAC, BeInCrypto, Bitcoin Magazine, Benzinga editorial, not sponsored)
- Whether wire distribution placements are counted toward these numbers (they should not be)
- How a "placement" is defined: editorial byline only, or do sponsored and press release pickups count?

Require the agency to state this explicitly in their proposal. If they resist, that tells you everything.

### Press Release and Content Production

- Number of press releases written per month
- Number of pitch documents (story angles, founder bios, backgrounders) included
- Turnaround time from brief to first draft
- Number of revision rounds included before additional fees trigger

### Reporting Cadence

- Weekly or biweekly pipeline update: pitches sent, journalist responses, pending placements
- Monthly coverage report: named publications, journalist names, story angles, estimated reach, link to every placement
- Quarterly narrative review: is the current positioning landing, and what needs to change?

Agencies that deliver screenshots as reporting are hiding weak results. Require named journalists, named publications, and dates for every placement claim.

---

## Section 3: KOL and Influencer Pass-Through Terms

If PR and KOL marketing are bundled in the retainer, you need to understand the pass-through economics. This is where founders get surprised the most.

**Require the agency to disclose:**

- Whether KOL fees are billed at cost or marked up, and by what percentage
- Whether the agency has equity, token, or revenue-sharing agreements with any KOL on the proposed creator list
- Which creators are "direct relationships" (the agency has a signed agreement) vs. "network" (the agency will reach out cold)
- Disclosure standards: will every sponsored post be labeled as paid content, or does the agency operate in a gray zone?
- Content approval rights: do you see and approve the brief before it goes to the creator, or does the agency run that independently?

An agency that won't share its KOL markup structure is an agency whose margin depends on you not knowing it. Ask directly. If they hedge, walk.

---

## Section 4: Crisis Communication Hour Bank

This one almost never appears in generic RFP templates. It's the clause that matters most when something actually goes wrong.

Crypto crises move in hours, not weeks. A rug pull allegation hitting Crypto Twitter at 11pm requires a response before the morning. A smart contract exploit needs a draft statement before the protocol's Discord fills with panic. If your agency's retainer doesn't include a crisis hour bank, you will be paying per-hour emergency rates during the worst possible moment.

**Require the agency to specify:**

- Number of crisis-designated hours included in the monthly retainer (minimum 4 to 8 hours for any active project)
- Response time SLA: how quickly does a senior team member respond to a declared crisis? (Acceptable: within 2 hours during business hours, within 4 hours off-hours)
- Definition of a "crisis event" that triggers the bank
- Overage rate if hours are exceeded
- Whether unused crisis hours roll over month to month

If an agency hasn't thought about crisis hour banks, they haven't run a crypto account under pressure. Push on this.

---

## Section 5: Embargo and Announcement Coordination

Embargo management is a distinct skill set. For a funding round announcement or a TGE, you'll be coordinating 4 to 6 tier-1 outlets simultaneously, holding each journalist to a specific lift time, and managing the risk that one outlet breaks early and invalidates the others.

A common mistake: agencies that treat embargo management as a single email blast. A proper embargo involves individual journalist agreements, staggered briefing calls, and a clear escalation plan for early breaks. I've managed embargoes where one outlet's backend published a draft article accidentally at T-24h: that scenario needs a plan before it happens, not after.

**Require the agency to specify:**

- Their embargo management process, step by step
- How many journalist embargoes they can coordinate simultaneously
- Their protocol when an outlet breaks embargo early
- Whether they have existing relationships with editors at your target outlets who can escalate quickly if needed
- Who on their team runs embargo day (must be a named senior person, not "the team")

---

## Section 6: Staffing (The Most Ignored Section)

The person who pitches you during the agency selection process will almost certainly not be the person running your account. This is not unique to Web3: it's true across the whole PR industry. Your RFP should close this gap before you sign.

**Require the agency to name:**

- The account lead: the person who will be your primary contact, their years of experience in crypto PR, and their existing journalist relationships at your target outlets
- Whether that person is full-time at the agency or a contractor
- The policy on account lead replacement: do they need your approval before switching the lead on your account?
- The policy on account lead handoff if the named person leaves the agency during your contract term

The language to watch for: "our team," "our dedicated team," "senior-level attention." None of these commit a named human to your account. Require a name and a bio, and get it into the contract, not just the proposal.

---

## Section 7: The Three Contract Clauses That Tell You Everything

You've read the proposal. The case studies look good. The named account lead is impressive. Now you're reviewing the contract. These three clauses reveal how the agency will behave when things get hard.

### 1. The Auto-Renewal Clause

Healthy version: "This agreement renews on [date] unless either party provides [30/60]-day written notice of non-renewal."

Bad version: "This agreement auto-renews for successive 6-month terms unless the client provides 90-day written notice prior to the renewal date."

The second version means you can be locked into another 6 months because you missed a 90-day window, even if the campaign has been underperforming for months. Require 30-day notice for non-renewal, maximum. If they push back, that tells you about their confidence in retaining clients on merit.

### 2. The Deliverable Commitment Clause

Healthy version: "Agency will deliver a minimum of [X] editorial placements per month at Tier-1 outlets as defined in Exhibit A. Failure to meet this baseline for two consecutive months entitles the client to terminate without penalty."

Bad version: "Agency will use commercially reasonable efforts to secure media coverage on behalf of Client." (This is every bad contract's wording. "Commercially reasonable efforts" commits to nothing.)

No credible agency can guarantee specific editorial placements: journalists decide, not agencies. But they can commit to a floor of activity and a consequence for missing it. Effort-based language without any floor means you have no recourse regardless of outcome.

### 3. The Exit Clause

Healthy version: "Either party may terminate this agreement with 30 days written notice for any reason. Upon termination, Agency will provide all work-in-progress files, journalist contact logs, and media list exports within 5 business days."

Bad version: "Client may terminate this agreement for material breach only, subject to a 30-day cure period. In the event of early termination, Client shall pay the remaining balance of the contract term."

The second version traps you. "Material breach" is hard to prove and expensive to litigate. And the remaining balance clause means a 6-month contract at $15,000/month could cost you $90,000 to exit, even if the agency has done nothing. Never sign a contract without a for-convenience exit clause with 30-day notice.

---

## How to Score the Responses

Once proposals are in, score them on these dimensions rather than on the quality of the deck design:

| Criterion | Weight | What "good" looks like |
|---|---|---|
| Named outlet commitments | 25% | Minimum placements at named Tier-1 outlets, clearly stated |
| Account lead named + credentialed | 20% | Specific person, crypto-native journalist relationships listed |
| Crisis hour bank included | 15% | 4+ hours per month, clear response SLA |
| KOL economics disclosed | 15% | Pass-through markup stated, disclosure standards clear |
| Exit clause is reasonable | 15% | 30-day for-convenience exit, work-product return required |
| Reporting specificity | 10% | Named journalists + placements, not screenshots |

A proposal that scores well on deck design but fails on named outlet commitments and exit clause terms is a proposal from an agency that knows it can't back its pitch with accountability.

---

## One More Thing: Call the References

I've posted this observation before and it holds every time:

> Funded web3 projects run behind mainstream PR agencies so that they can get substantial coverages. But what they don't realise is that these PR agencies are at max capacity with clients & already diluting the attention of their journalists.
>
> [Shilika Jain on X, 16 Dec 2022](https://x.com/Shilika_jain/status/1603803857431076864)

The proposal tells you what the agency wants you to believe. The references tell you what the account actually looked like month three. Ask for two or three client references in your target tier: funded protocols, not enterprise brands. Ask them specifically: was the account lead the same person from month one? Did the agency meet its placement commitments? What happened when something went wrong?

If an agency won't provide references, or provides references who won't take your call, you have your answer.

---

## The Full RFP Outline (Copy and Use)

**Section 1: Company Brief**
Company name, stage, product description, target audiences, current coverage, target outlets (named), upcoming launch events, budget band

**Section 2: Earned Media Deliverables**
Minimum Tier-1 editorial placements per month (named outlets), minimum Tier-2, definition of a "placement," whether wire distribution counts

**Section 3: Content and Production**
Press releases per month, pitch documents included, turnaround SLA, revision rounds before fees trigger

**Section 4: Reporting Requirements**
Weekly pipeline update format, monthly coverage report format (named journalists required), quarterly narrative review

**Section 5: KOL and Influencer Terms**
Pass-through markup disclosure, equity/token agreements disclosure, direct vs. network creators, disclosure standards, content approval rights

**Section 6: Crisis Communication**
Monthly crisis hour bank (minimum), response time SLA, crisis definition, overage rate, rollover policy

**Section 7: Embargo Management**
Step-by-step process, simultaneous embargo capacity, early-break protocol, named senior lead on embargo day

**Section 8: Staffing**
Named account lead with bio, contractor vs. full-time status, account lead replacement policy, handoff terms

**Section 9: Contract Terms to Submit**
Auto-renewal notice period (require 30 days), deliverable commitment language (require a measurable floor), exit clause (require for-convenience exit at 30 days), work-product return terms

**Submission deadline:** [Date, typically 10 to 14 days from RFP issue]

**Finalist presentations:** [Date, typically 5 to 7 days after submission deadline]

---

If you're a pre-Series A team with a launch in the next 60 to 90 days and you don't have time to run a full RFP process, a fractional PR engagement gets you a senior operator embedded directly without the six-month agency lock-in. The scope is built around your actual calendar, not a templated retainer.

[Book a 30-min teardown with Shilika](https://calendly.com/shilikajain/30min/), we'll audit your current situation and map out what a scoped engagement actually looks like for your stage and timeline.$b100$
where slug = 'web3-pr-agency-rfp-template' and md5(body) = '3d7c2274d90e893be317b0719495e7cd';

update blog_posts set body = $b100$# Pitching Agentic AI to Journalists Who've Seen It All

If your pitch subject line contains the words "AI agent," you're already losing. Not because the category isn't real or interesting, it is, but because every journalist covering AI has spent the last 18 months drowning in agentic product announcements that all say the same thing. Autonomous. Multi-step. Transformative.

I placed GAIA's founders in Forbes and Decrypt during the thick of the 2024-2025 agent hype wave. We got the placements not because GAIA had the loudest "AI agent" story, but because we ditched that frame entirely. What landed was a story about decentralized knowledge systems and node count as a trust signal. The word "agent" appeared in the article. It just wasn't the pitch.

That's the whole game right now. Not "we built an AI agent." But "here's what our system does that no one else can measure, prove, or explain."

## Why the Standard Pitch Fails in 2026

<cite index="1-1">Pitches that start with "AI startup" often go straight to the bin.$b100$
where slug = 'agentic-ai-startup-pr-pitch-journalists-2026' and md5(body) = '722c2f25389e5e10a4a2056aeb17a7f2';

update blog_posts set body = $b100$# Open Source AI Model PR: The Dual-Audience Launch Playbook

When you release an open-weight model, you're not running one launch. You're running two simultaneous ones that share a timestamp but almost nothing else.

Developers will pull your weights, inspect your benchmark methodology, and post their findings on Hacker News before the journalist who covered your story has filed their expense report. Mainstream business press reporters need a non-technical story hook, a founder quote, and a market angle: by morning. Get the sequencing wrong in either direction and you get one of two outcomes: your launch gets torn apart by the technical community for overclaiming, or it gets ignored by trade press because nobody packaged a story they could print.

I've spent six years placing technical founders into Forbes, CoinDesk, Cointelegraph, and Decrypt. An open-weight model release is one of the most operationally demanding launches I work on because you genuinely can't merge the two audiences into one message. You have to run parallel communications tracks that are coherent with each other but optimized for completely different readers.

This is the architecture that makes both tracks work.

---

## Why the dual-audience problem is structurally different for AI

Most product launches have one primary audience. A DeFi protocol targets on-chain users and crypto traders. A B2B SaaS launch targets enterprise buyers. The press strategy narrows from there.

An open-weight model release has no such narrowing. <cite index="19-5,19-6,19-7">Every open source AI announcement has to serve two very different primary audiences, and their expectations pull in opposite directions. Developers want depth: architecture details, benchmark methodology, fine-tuning instructions, licensing clarity, and honest limitations. They will read your model card, check your GitHub repository, and run their own evaluations within hours of release.$b100$
where slug = 'open-source-ai-model-launch-pr-dual-audience-playbook' and md5(body) = '42ce908bc5d6acbb524c1ccaaf34c34c';

alter table blog_posts enable trigger trg_set_updated_at;

commit;

-- Check: expect 3 rows at most (blockquotes / real X quotes kept on purpose:
-- web3-press-kit-what-journalists-need, defi-exploit-communications-first-72-hours, chinese-diaspora-crypto-media-panews-chaincatcher).
-- Description count should be 0.
select slug, (length(body) - length(replace(body, '—', ''))) as body_em, position('—' in description) > 0 as desc_em
from blog_posts where published and (position('—' in body) > 0 or position('—' in description) > 0);
