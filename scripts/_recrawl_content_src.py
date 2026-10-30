#!/usr/bin/env python3
"""Source for data/recrawl-content.json (GSC 'Crawled - currently not indexed' remediation, 2026-10-30).

Run: python3 -I scripts/_recrawl_content_src.py  -> writes data/recrawl-content.json
Tweets are quoted verbatim from the Notion X archive (Shilika_jain); URLs stripped.
"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
X = "https://x.com/Shilika_jain/status/"

TW = {
 "2105242115676729669": ("30 Sep 2026", "helping a cybersecurity x blockchain team drive initial coverage for their protocol + technology\nspeaking to a weapons security solution company as they're looking to change their PR partner"),
 "1696202115914555517": ("28 Aug 2023", "Mature startups should focus on the following:\n\n• viral marketing campaigns\n• growth funnels - ads to analytics \n• comprehensive PR strategy through earned coverage \n• strategic partnerships & initiatives"),
 "1688469757086113794": ("7 Aug 2023", "whenever you’re working w clients/companies, try selling value as opposed to services. \n\n- show them the results you can bring in\n- show them the impact it’s going to create\n- educate them about how the processes work \n- manage expectations \n- honest & transparent communication at the apex!"),
 "1792549151420641436": ("20 May 2024", "founders spending lot on infra + innovation but frugal in marketing approach are ngmi!\n\n* subjective to the product you’re building, although certain level of marketing is always required!"),
 "1897761960667795958": ("6 Mar 2025", "more projects need organic PR than paid kol shills & campaigns! \n\nwho should explain this to founders? open to discussing the pros & cons✨"),
 "2067877945834914101": ("19 Jun 2026", "we are in an AI loop, here's what's happening:\n\n- back then, we used to write creative content without AI\n- then all of us saw the potential of AI, and started using AI to write content \n- now brands need folks that could write old-school original content without using AI"),
 "2051920876019585301": ("6 May 2026", "Most crypto founders confuse press releases with PR. That’s why they get ignored."),
 "1821525226489839760": ("8 Aug 2024", "Early stage web3 founders part of different L1/L2 ecosystems aren’t aware about  what PR entails! \n\nAbout 3 founders i spoke to told me that they use wire services because it’s easy to get coverage! \n\nEcosystems + VCs must take proactive initiatives to educate their portcos!"),
 "1981639794414452947": ("24 Oct 2025", "i don’t think one person can do it all! \n\nexpecting someone to do everything is so senseless."),
 "1720506842231796060": ("3 Nov 2023", "web3 hiring is stupid and broken! \n\nfolks that couldn’t hire me full time have now started working w me signing long term contracts."),
 "1604786959368740864": ("19 Dec 2022", "people don’t pay for content instead they pay for organised content!"),
 "1605933584501440512": ("22 Dec 2022", "Storytelling is a dead-killer skill you must have irrespective of working in crypto or not!\n\nHere’s how you can become a great storyteller:\n\n• Cut the crap,nail the hook\n• Structured stories do the magic\n• Include information\n• Make the story meaty\n• Understand your audience"),
 "1884601481028108302": ("29 Jan 2025", "web3 will actually win when we’re not running behind airdrop farming & whitelists lol"),
 "1578265370837676032": ("7 Oct 2022", "In #Web3, projects don’t acquire users but rather they acquire bots!"),
 "1717631830059610195": ("26 Oct 2023", "web3 onboarding is shitty and current questing platforms are bot-ty"),
 "1947998504049418574": ("23 Jul 2025", "The web3/crypto industry won’t grow by chasing shiny campaigns & hype quests.\n\nIt’ll grow when we start building projects that actually make money.\n\nRevenue > vibes."),
 "1610184367879643138": ("3 Jan 2023", "people just don’t but NFTs for flipping, it’s also about fun, culture, community, vibes & so much more!"),
 "1583115281127198723": ("20 Oct 2022", "the problem w the NFT space is that too many marketplaces with little differentiation!"),
 "1623987776730574848": ("10 Feb 2023", "It’s very important to control your story and actively shape it before it’s lost!"),
 "1723024943313494112": ("10 Nov 2023", "journalists get tons of pitches everyday!\n\nsometimes it’s more that what an average investors get!!"),
 "1692190607714685026": ("17 Aug 2023", "being in PR just makes you used to rejections & ghosting🥲"),
 "1717132399086280886": ("25 Oct 2023", "responding and answering journalists’ query is PR 101!"),
 "1586415550887997440": ("29 Oct 2022", "one of the stupidest things early stage founders do is trying to do everything on their own. \n\nyou can provide solution + servicing in the best way if you don’t bring the right talent & learn to delegate."),
 "1655630226586767360": ("8 May 2023", "PR professionals are not magicians, they are just communication experts:)"),
 "2055524495641985466": ("16 May 2026", "so many AI companies raising crazy $$$ but so bad PR, this needs to change!!"),
 "1844810665459884246": ("11 Oct 2024", "wanna activate PR for a major launch/announcement? here’s a quick strategy:\n\n- Create active thought leadership 1-2 month before the launch\n- Secure 1-2 podcasts/interviews 1 month before the launch\n-AMA - 15 days before the launch\n- Embargo press outreach: week before the launch"),
 "1600088442519420928": ("6 Dec 2022", "Web3 funda: BUIDL local, promote global."),
 "1978553792418488699": ("15 Oct 2025", "web3 projects must focus on localization pro max!"),
 "1614170713619038208": ("14 Jan 2023", "Freelancing is a tougher job than a full-time one!\n\nYou take calls at odd times,deliver the project to clients within strict deadlines,managing schedules, continuously upskilling,facing competition, lack of financial security, social isolation, balancing payments & so much more!"),
 "2061476232034996344": ("1 Jun 2026", "weird thing that I noticed w a potential client today: \n\ncompanies hire agencies w/o asking too many questions or hard bounding them on the KPIs because those agencies are famous, but when they don't deliver they hardbound freelancers or small contractors for all the things that they agency couldn't achieve!!"),
 "1978353560719945907": ("15 Oct 2025", "there was a time in web3 when I used to reach out to this KOL to promote the projects i was working with but he was too choosy👀\n\ncut to today, he’s reaching out to me to offer his marketing to the projects im working with rn\n\nthe market humbles you in ways you can’t imagine🤯😅"),
 "2014687376166281613": ("23 Jan 2026", "Is TGE in this market a good idea or bad idea?"),
 "1697279930776846765": ("31 Aug 2023", "me when my web3 PR clients ask me if i can get them earned coverage on Cointelegraph, Coindesk, TheBlock, Bloomberg, Blockworks, Forbes in next 1 month🥲"),
 "2036450889838522539": ("24 Mar 2026", "still can't believe, it's 2026 and people think PR is all about just getting a Coindesk article LOL!"),
 "1633048797986308096": ("7 Mar 2023", "you don’t need a digital business card but instead a powerful person brand to succeed:)"),
 "1863120041132126516": ("1 Dec 2024", "personal brand is everything in web3!"),
 "1783022374167953908": ("24 Apr 2024", "noobs will say that you can secure top tier coverage on day1 of your Web3 PR activations!"),
 "1730970021894258726": ("2 Dec 2023", "early stage project who think they can pay for PR and get top tier coverage without any strong news are NGMI"),
 "1908499569916125588": ("5 Apr 2025", "i see so many DePIN & Bitcoin focused projects doing paid press releases even though there’s opportunity for some good earned coverage!!\n\nit’s honestly stupid, let’s chat!"),
 "1741558180780634455": ("31 Dec 2023", "Since the time I started working in the crypto/web3 space, I’ve always been a huge proponent of projects that are building stuff that normies can use!\n\nstuff that’s tangible, in-real real world application!"),
 "1729571063846363359": ("28 Nov 2023", "Glad to share that I’d be supporting @PowerloomHQ on everything PR + Comms. \n\nExcited to build the future of decentralized data with them."),
 "1876592952937525753": ("7 Jan 2025", "for those who think PR is easy, it’s so hard to get journalist’s attention fml😅"),
 "2070043456257532411": ("25 Jun 2026", "lot of PR folks are only focused on driving coverage, only a handful focus on building genuine media relationships"),
}

def q(*ids): return list(ids)

P = {}

# ---------- /pages : security cluster (four near-neighbour pages, each gets a distinct answer + routing) ----------
P["/pages/cybersecurity-pr-agency"] = dict(
  quotes=q("2105242115676729669"),
  eyebrow="From the field, October 2026",
  h2="What security PR conversations look like right now",
  paras=[
   "On 30 September 2026 I wrote up one week of tech PR conversations. Two were security: a cybersecurity and blockchain team that wanted initial coverage for its protocol and technology, and a weapons security company reviewing its PR partner. They sit at opposite ends of the market, and I work them the same way: pin down the technical claim, find who outside the company can verify it, pick the desks that cover that class of claim, then write the pitch.",
   "This page covers the general service, scope and price of cybersecurity PR. If your story starts from a vulnerability or coordinated disclosure, read the <a href=\"/pages/infosec-pr-agency\">InfoSec PR page</a>. If your buyers and press sit in the United States, read the <a href=\"/pages/cybersecurity-pr-agency-usa\">US cybersecurity PR page</a>. If you sell threat feeds or reports, read <a href=\"/pages/threat-intelligence-pr-agency\">threat intelligence PR</a>. Analyst briefings are a different audience again, covered in the <a href=\"/playbook/cybersecurity-analyst-relations-2026\">analyst relations playbook</a>."],
  faq=dict(q="Which cybersecurity PR page should I read first?",
           a="Start here for scope, pricing and how an engagement runs. Go to the InfoSec page when the story comes from vulnerability research and disclosure timing, to the US page when your buyers and press are American, and to the threat intelligence page when the product is intel. Analyst relations (Gartner, Forrester, IDC) is a separate audience with its own playbook."))

P["/pages/cybersecurity-pr-agency-usa"] = dict(
  quotes=q(),
  eyebrow="Choosing the right page",
  h2="US security PR versus the other security pages",
  paras=[
   "The United States is where most enterprise security budgets are signed, which changes the work in three practical ways: the trade desks that matter (Dark Reading, SC Media, The Register), the time windows around Black Hat, RSA and Gartner cycles, and the expectation that every claim arrives with a named customer or a named researcher behind it. I plan US security campaigns backwards from those three constraints.",
   "If you want the general scope and pricing, read <a href=\"/pages/cybersecurity-pr-agency\">cybersecurity PR</a>. If the story is a vulnerability or a CVE brief, the <a href=\"/pages/infosec-pr-agency\">InfoSec PR page</a> explains disclosure timing. If something has already gone wrong, start with the <a href=\"/playbook/cybersecurity-breach-crisis-comms-2026\">breach and crisis communications playbook</a> instead."],
  faq=dict(q="Do I need a US-based agency for US security press?",
           a="No. US trade desks respond to a clear technical claim, a verifiable source and sensible timing around the major conference calendar, not to an agency postcode. What matters is that the person pitching can explain the claim well enough to defend it with a reporter."))

P["/pages/infosec-pr-agency"] = dict(
  quotes=q(),
  eyebrow="Choosing the right page",
  h2="When the story starts from research",
  paras=[
   "Research-led security stories fail for boring reasons. The vendor has not been patched, the embargo is looser than anyone admits, or the finding is real but the headline claims more than the evidence supports. I check those three things before any pitch goes out, because a security desk that catches an overreach once stops reading you.",
   "This page is about turning research and disclosures into coverage. For the general service and price, see <a href=\"/pages/cybersecurity-pr-agency\">cybersecurity PR</a>. For the American market specifically, see <a href=\"/pages/cybersecurity-pr-agency-usa\">cybersecurity PR in the US</a>. For intel products and reports, see <a href=\"/pages/threat-intelligence-pr-agency\">threat intelligence PR</a>, and for incidents that are already public, the <a href=\"/playbook/cybersecurity-breach-crisis-comms-2026\">breach communications playbook</a>."],
  faq=dict(q="What should be settled before pitching a vulnerability story?",
           a="Three things: the fix status, the embargo terms agreed with the affected vendor, and a headline that the evidence fully supports. If any of these is open, hold the pitch. A security editor who spots an overstated claim will discount everything else you send."))

# ---------- other /pages ----------
P["/pages/b2b-saas-pr-agency"] = dict(
  quotes=q("1792549151420641436"),
  eyebrow="From the field",
  h2="Why B2B SaaS marketing stalls without earned media",
  paras=[
   "In May 2024 I posted that founders who spend heavily on infrastructure and innovation but stay frugal on marketing are heading for trouble, with the caveat that it depends on the product. For B2B SaaS the caveat matters: a product sold to a buying committee needs third-party proof, and that proof comes from coverage, analyst mentions and customer stories rather than from more ads.",
   "That is the brief I take on for SaaS companies: decide which two or three outlets and analysts your buyers already trust, build the story around a measurable customer outcome, and repeat it across earned coverage, founder posts and sales material. For the adjacent options, compare the <a href=\"/pages/b2b-tech-pr-agency\">B2B tech PR page</a>, which covers the broader category, and the <a href=\"/pages/pr-agency-for-tech-startups\">PR agency for tech startups page</a>, which covers early-stage selection."],
  faq=dict(q="When does a B2B SaaS company need PR rather than more demand generation?",
           a="When pipeline is leaking at the trust stage: prospects reach the demo but ask for proof, or competitors with weaker products win on reputation. Earned coverage and analyst presence are cheapest to build before a funding round or a category-defining launch, not after."))

P["/pages/b2b-tech-pr-agency"] = dict(
  quotes=q("1696202115914555517"),
  eyebrow="From the field",
  h2="What changes between early-stage and mature tech PR",
  paras=[
   "In August 2023 I laid out how I think about growth stages. Early-stage companies lean on partnerships, brand building and community. Mature ones add funnels, viral campaigns and a comprehensive PR strategy built on earned coverage. The practical point for B2B tech is that earned media only compounds once there is a customer story and a clear category to attach it to.",
   "If you are earlier than that, the <a href=\"/pages/pr-agency-for-tech-startups\">PR agency for tech startups page</a> is the better starting point. If you sell software to a buying committee, see <a href=\"/pages/b2b-saas-pr-agency\">B2B SaaS PR</a>. If your product is AI infrastructure sold to large enterprises, see <a href=\"/pages/enterprise-ai-pr-agency\">enterprise AI PR</a>."],
  faq=dict(q="At what stage should a B2B tech company invest in earned media?",
           a="Once you have at least one named customer outcome and a category you can describe in a sentence. Before that, partnerships, founder content and community usually return more per dollar. After that, earned coverage turns those assets into third-party validation that sales can reuse."))

P["/pages/pr-agency-for-tech-startups"] = dict(
  quotes=q("1688469757086113794"),
  eyebrow="From the field",
  h2="How to judge a PR agency before you sign",
  paras=[
   "In August 2023 I posted what I tell anyone selling PR: sell value, not services. Show the results you can bring, show the impact, explain how the process works, manage expectations and keep communication honest. Turn that around and it is a checklist for the buyer. Ask the agency which outcomes it is willing to be measured on, who does the pitching day to day, and how it handles a quiet month.",
   "In June 2026 I also noticed a pattern with a potential client: famous agencies are hired without hard questions on KPIs, while small contractors get held to every miss. Ask the hard questions of everyone. For related reading, see <a href=\"/playbook/fractional-vs-agency\">fractional versus agency</a> and the <a href=\"/pages/b2b-tech-pr-agency\">B2B tech PR page</a>. If you are weighing named firms, I compare myself with <a href=\"/compare/shilika-jain-vs-highwire-pr\">Highwire PR</a>, <a href=\"/compare/shilika-jain-vs-bospar\">Bospar</a>, <a href=\"/compare/shilika-jain-vs-inkhouse\">Inkhouse</a> and <a href=\"/compare/shilika-jain-vs-hotwire\">Hotwire</a> on who pitches, markets covered and cost."],
  faq=dict(q="What should a tech startup ask a PR agency before hiring?",
           a="Ask who will do the pitching, which three outlets they expect to target and why, how success is measured in the first 90 days, and what happens if a launch window slips. Vague answers on any of these usually mean junior staff will do the work you thought a senior would."))

P["/pages/crypto-influencer-marketing-agency"] = dict(
  quotes=q("1897761960667795958"),
  eyebrow="From the field",
  h2="What I look for in an influencer before spending anything",
  paras=[
   "I respect creators who research protocols properly, because it takes time, energy and patience, and the audience can tell. That is the first filter: does this person understand the product well enough to explain it to someone who has never used it? If the answer is no, the reach is rented attention.",
   "The second filter is the one in my March 2025 post: many projects need organic PR more than paid shill campaigns. Influencer budgets work best as a layer on top of real news and real users, with attribution defined up front. For pricing context, see <a href=\"/playbook/crypto-influencer-pricing-rates-2026\">KOL pricing and rates</a> and the guide to <a href=\"/playbook/how-to-vet-crypto-kols-2026\">vetting crypto KOLs</a>. If you are comparing influencer-led agencies, see <a href=\"/compare/shilika-jain-vs-coinbound\">Shilika Jain versus Coinbound</a>."],
  faq=dict(q="How should a project measure crypto influencer results?",
           a="Agree the metric before the first post: tracked sign-ups, wallet connections or first transactions from a unique link, not impressions. If a creator cannot support tracked links or will not share audience data, treat the spend as awareness only and size it accordingly."))

P["/pages/enterprise-ai-pr-agency"] = dict(
  quotes=q("2067877945834914101"),
  eyebrow="From the field",
  h2="Why original writing matters more as AI content floods the feed",
  paras=[
   "In June 2026 I described the loop we are in: brands once wrote without AI, then everyone adopted AI to write, and now brands need people who can produce original writing. For enterprise AI that has a concrete consequence. A CIO or analyst reading a vendor article can usually tell when nobody with real technical knowledge wrote it, and they discount the whole company.",
   "My approach for enterprise AI is to anchor every story in a named deployment, a measured outcome and a person willing to be quoted. Related reading: <a href=\"/pages/b2b-tech-pr-agency\">B2B tech PR</a> for the wider category, <a href=\"/playbook/ai-product-launch-pr-2026\">PR for an AI product launch</a> for launch timing, and the <a href=\"/playbook/ai-thought-leadership-pr-2026\">AI thought leadership playbook</a> for founder-led authority."],
  faq=dict(q="What makes enterprise AI PR different from consumer AI PR?",
           a="The audience is a buying committee that reads trade and analyst content, not a launch-day crowd. Stories need a named deployment, a measured outcome and security and governance answers ready. Reach matters less than whether the right twenty people trust the claim."))

P["/pages/crypto-press-release-service"] = dict(
  quotes=q("2051920876019585301","1821525226489839760"),
  eyebrow="From the field",
  h2="What a press release can and cannot do",
  paras=[
   "In May 2026 I wrote that most crypto founders confuse press releases with PR, and that is why they get ignored. In August 2024 I mentioned that three early-stage founders had told me they use wire services because coverage is easy to get. Distribution is easy. Attention is not, because a wire release reaches inboxes but gives a reporter no reason to open it.",
   "So I write releases for the jobs they do well: a record for exchanges and partners, a source document for reporters you have already briefed, and a citation target. For the pitch that decides whether anyone covers you, see the <a href=\"/playbook/op-eds-vs-press-releases\">op-eds versus press releases playbook</a>. For distribution mechanics, see <a href=\"/pages/crypto-press-release-distribution-service\">press release distribution</a> and the <a href=\"/playbook/crypto-press-release-distribution-2026\">distribution guide</a>. For volume-based placement, see <a href=\"/compare/shilika-jain-vs-marketacross\">Shilika Jain versus MarketAcross</a>."],
  faq=dict(q="Is a press release enough to get crypto coverage?",
           a="No. A release is a record and a source document. Coverage comes from a pitch to a specific reporter with a reason to care, usually sent before or alongside the release. Treat the release as support for that pitch, not a substitute for it."))

P["/pages/fractional-cmo-web3"] = dict(
  quotes=q("1981639794414452947","1720506842231796060"),
  eyebrow="From the field",
  h2="What a fractional leader can and cannot cover",
  paras=[
   "In October 2025 I wrote that one person cannot do everything, and expecting that is senseless. It is the most honest limit on any fractional arrangement. A fractional lead can set the narrative, choose channels, brief the team and own the press relationships, but they cannot also run community, design and paid media. Decide what you need owned and what you need executed.",
   "In November 2023 I noted that people who could not hire me full time started working with me on long-term contracts. That pattern is why fractional works when scope is clear. For the cheaper, narrower option, compare <a href=\"/pages/fractional-pr-consultant-web3\">fractional PR for Web3</a>, and for the decision logic see <a href=\"/playbook/fractional-pr-vs-in-house-hire-2026\">fractional PR versus an in-house hire</a>."],
  faq=dict(q="When is fractional PR enough and a fractional CMO not needed?",
           a="If the problem is visibility, press relationships and narrative, fractional PR is usually enough and costs less. A fractional CMO fits when you also need channel strategy, budget allocation and a plan across paid, content and community."))

P["/pages/crypto-content-marketing-agency"] = dict(
  quotes=q("1604786959368740864","1605933584501440512"),
  eyebrow="From the field",
  h2="Organised content beats more content",
  paras=[
   "In December 2022 I posted that people do not pay for content, they pay for organised content. Years on, that is still the clearest brief I can give a crypto content team. One good explainer linked to a glossary entry, a playbook and a proof point does more than ten disconnected posts, for readers and for the AI engines that quote them.",
   "Days later I wrote down the storytelling rules I use: nail the hook, give the story structure, include real information, make it meaty and know the audience. For where content meets search, see the <a href=\"/playbook/aeo-vs-seo-startups-2026\">AEO versus SEO playbook</a>, and for founder-led writing the <a href=\"/pages/founder-essay-ghostwriting\">founder essay ghostwriting page</a>."],
  faq=dict(q="What does crypto content marketing need to include to be cited by AI engines?",
           a="A direct answer in the first paragraph, specific named entities and numbers, a visible author with a track record, and clear headings that match real questions. Structure and sourcing matter more than volume."))

P["/pages/airdrop-marketing-agency"] = dict(
  quotes=q("1884601481028108302","1578265370837676032","1717631830059610195"),
  eyebrow="From the field",
  h2="Why I plan airdrops around real users, not farmers",
  paras=[
   "I have been saying the same thing for years. In October 2022 I wrote that web3 projects often acquire bots rather than users. In January 2025 I wrote that web3 wins when it stops running behind airdrop farming and whitelists. The commercial problem is plain: you pay for activity that disappears the day rewards end, and press can smell it.",
   "So the campaigns I build start with the story of who the product is for and why they would stay, then use incentives as a thank-you rather than the hook. For the narrative side, see the <a href=\"/playbook/crypto-airdrop-pr-strategy-2026\">airdrop PR strategy playbook</a> and <a href=\"/playbook/post-tge-pr-first-90-days-2026\">the first 90 days after TGE</a>."],
  faq=dict(q="How do you keep an airdrop from attracting only farmers?",
           a="Tie eligibility to behaviour that only real users do, announce the logic publicly, and brief press on the user story before the claim window opens. Pair the airdrop with a retention plan for the weeks after, because that is when farmers leave."))

P["/pages/memecoin-marketing-agency"] = dict(
  quotes=q("1947998504049418574"),
  eyebrow="From the field",
  h2="The credibility floor under a memecoin",
  paras=[
   "In July 2025 I posted that the industry will not grow by chasing shiny campaigns and hype quests, but by building projects that make money. Memecoins sit at the sharpest end of that argument. Attention is the product, yet attention without a floor of credibility disappears and takes your community with it.",
   "That floor is what I add: clear disclosures, a team and treasury story journalists can verify, and a plan for the quiet weeks after launch. For context on how earned and paid attention differ, see <a href=\"/playbook/earned-vs-paid-media-web3-2026\">earned versus paid media</a>, and for how exchange and KOL conversations work, see the <a href=\"/pages/crypto-influencer-marketing-agency\">influencer marketing page</a>."],
  faq=dict(q="Can a memecoin get legitimate press coverage?",
           a="Sometimes, when there is a verifiable story such as a notable community, a real integration or a market event. Coverage depends on transparency about the team, supply and risks. Without that, reporters treat the project as promotion and decline."))

P["/pages/nft-pr-agency"] = dict(
  quotes=q("1610184367879643138","1583115281127198723"),
  eyebrow="From the field",
  h2="Culture first, then utility",
  paras=[
   "In January 2023 I wrote that people do not buy NFTs only to flip them, it is also about fun, culture, community and vibes. In October 2022 I wrote that the NFT space had too many marketplaces with little differentiation. Both points shape how I pitch NFT projects: the story is the community and the IP, and the angle must differ from the last ten launches a reporter has seen.",
   "I have worked with NFT teams including Rarible and the Rari Foundation. For the narrative frame, see <a href=\"/playbook/web3-narrative-positioning-strategy-2026\">narrative and positioning</a>, and for community-led growth see the <a href=\"/pages/crypto-community-growth-agency\">community growth page</a>."],
  faq=dict(q="What makes an NFT project newsworthy?",
           a="A real partnership, a measurable community milestone, a new use of the IP or a change in how holders benefit. Floor price and mint sell-outs are market data, not news. Reporters need an angle that stands without the price."))

# ---------- /playbook ----------
P["/playbook/cybersecurity-breach-crisis-comms-2026"] = dict(
  quotes=q("1623987776730574848"),
  eyebrow="From the field",
  h2="Two rules I keep returning to in a crisis",
  paras=[
   "In February 2023 I wrote that it is very important to control your story and actively shape it before it is lost. In November 2025, watching a public dispute unfold, I wrote that when an investigative journalist reaches out several times with specific questions, it makes sense to answer sooner rather than later. After a breach both rules apply twice as hard: the first account sets the frame, and silence reads as evasion.",
   "Pair this playbook with <a href=\"/playbook/crypto-crisis-communications-2026\">crypto crisis communications</a> for the general sequence and <a href=\"/pages/cybersecurity-pr-agency-usa\">US cybersecurity PR</a> if the incident involves American customers or regulators."],
  faq=dict(q="Should a company respond to a journalist who keeps asking about a breach?",
           a="Yes, with a short, accurate, on-the-record statement that corrects what is wrong and confirms what is known. Repeated questions from an investigative reporter signal the story will run regardless. Replying early keeps your version in the first draft."))

P["/playbook/how-to-get-covered-the-block-blockworks-2026"] = dict(
  quotes=q("1723024943313494112","1692190607714685026","1717132399086280886"),
  eyebrow="From the field",
  h2="What pitching crypto reporters feels like from the sender's side",
  paras=[
   "In November 2023 I wrote that journalists get tons of pitches every day, sometimes more than an average investor does. In August 2023 I wrote that PR makes you used to rejection and ghosting. Both explain why most outreach fails: the reporter has seconds, and the pitch does not make the case for their audience.",
   "The fix I use is the one in October 2023: answering a journalist's query is PR 101. Reply fast, give the number or document they asked for, and do not pitch the same story to a second desk in the same hour. For the wider relationship picture, see the <a href=\"/playbook/crypto-media-relations-guide-2026\">crypto media relations guide</a>."],
  faq=dict(q="What should I do if a crypto reporter ghosts me after saying yes?",
           a="Wait two working days, then send one short follow-up with the new fact or document that makes the story stronger. If there is still no reply, move on and keep the relationship warm. Chasing daily usually ends the conversation."))

P["/playbook/affordable-pr-tech-startup-2026"] = dict(
  quotes=q("1586415550887997440","1655630226586767360"),
  eyebrow="From the field",
  h2="Where a small PR budget should and should not go",
  paras=[
   "In October 2022 I wrote that one of the most common early-stage mistakes is trying to do everything alone and not delegating to the right talent. On a small budget the opposite error is just as common: paying for activity instead of outcomes. The answer is to buy a few specific things, such as a story, a target list and a first-pitch cycle, rather than a retainer that covers everything thinly.",
   "In May 2023 I also wrote that PR professionals are communication experts, not magicians. That is the right expectation for a lean budget. See <a href=\"/pages/pr-agency-for-tech-startups\">PR agency for tech startups</a> and <a href=\"/playbook/founder-led-diy-pr-2026\">founder-led DIY PR</a> for the two ends of the spectrum."],
  faq=dict(q="What is the smallest PR spend that still produces results?",
           a="A scoped sprint for one story, with a defined target list and a limited number of pitches, usually works better than a thin monthly retainer. Spend on the narrative and the first cycle, then decide whether to continue based on what reporters actually said."))

P["/playbook/ai-product-launch-pr-2026"] = dict(
  quotes=q("2055524495641985466","1844810665459884246"),
  eyebrow="From the field",
  h2="The launch timeline I use, and why AI companies need it",
  paras=[
   "In May 2026 I posted that many AI companies raise large rounds but have poor PR. In October 2024 I shared the sequence I use for a major launch: thought leadership one to two months out, podcasts or interviews a month out, an AMA fifteen days out and embargoed press outreach in the final week. It works because each stage warms the audience for the next.",
   "For the AI-specific details, use this playbook together with <a href=\"/playbook/ai-series-a-funding-announcement-pr-2026\">funding announcement PR for AI companies</a> and the <a href=\"/pages/enterprise-ai-pr-agency\">enterprise AI PR page</a> if your buyer is a large company."],
  faq=dict(q="How far ahead should an AI product launch PR plan start?",
           a="About two months. Build founder thought leadership first, secure one or two podcast or interview slots a month before, run a community Q&A around fifteen days before, and brief press under embargo in the final week."))

P["/playbook/apac-press-windows-2026"] = dict(
  quotes=q("1600088442519420928","1978553792418488699"),
  eyebrow="From the field",
  h2="Build local, promote global",
  paras=[
   "In December 2022 I wrote a one-line rule: build local, promote global. In October 2025 I added that web3 projects must focus on localization even harder. Timing is the part most teams miss. An announcement that lands in US hours reaches Asian readers a day late, and a translated copy of the same release rarely reads like local news.",
   "Use the three windows in this playbook for timing, then adapt the angle for each market. See the <a href=\"/playbook/crypto-pr-korea-2026\">Korea PR playbook</a>, the <a href=\"/apac\">APAC overview</a> and <a href=\"/pages/apac-token-launch-pr\">APAC token launch PR</a> for market detail."],
  faq=dict(q="Should an APAC announcement be translated or rewritten?",
           a="Rewritten. Translate the facts, but change the angle, the quotes and the proof points to match what local readers care about, and send it inside the local press window."))

P["/playbook/best-fractional-pr-consultant-tech-2026"] = dict(
  quotes=q("1614170713619038208","2061476232034996344"),
  eyebrow="From the field",
  h2="What I tell founders who are comparing consultants",
  paras=[
   "In January 2023 I wrote that freelancing is harder than full-time work: odd-hour calls, strict deadlines, no financial cushion and constant upskilling. I mention it because founders sometimes assume a consultant is the cheap option. In June 2026 I noticed the reverse: famous agencies get hired without hard KPIs, while freelancers are blamed for everything the agency missed.",
   "Compare consultants on the same questions you would put to an agency. See <a href=\"/playbook/fractional-vs-agency\">fractional versus agency</a>, <a href=\"/playbook/fractional-pr-vs-in-house-hire-2026\">fractional PR versus an in-house hire</a> and the <a href=\"/pages/fractional-pr-consultant\">fractional PR consultant page</a>. To see how a fractional operator stacks up against agencies, read <a href=\"/compare/shilika-jain-vs-melrose-pr\">Shilika Jain versus Melrose PR</a> for US business press and <a href=\"/compare/shilika-jain-vs-luna-pr\">versus Luna PR</a> for the Gulf and MENA."],
  faq=dict(q="How do I compare fractional PR consultants fairly?",
           a="Ask each for the same three things: a sample target list, the first 90-day plan and one reference you can call. Judge on specificity, not on brand names."))

P["/playbook/crypto-influencer-pricing-rates-2026"] = dict(
  quotes=q("1978353560719945907"),
  eyebrow="From the field",
  h2="How KOL pricing looks from where I sit",
  paras=[
   "In March 2025 I wrote that some KOLs were asking for more than 500k in tokens to support a project, and the real question is whether they bring real users and buyers. In October 2025 I described a KOL who once refused to promote my clients now offering his marketing to them. Both posts say the same thing: pricing follows market mood more than audience quality.",
   "Use the rates in this playbook as a range, then negotiate on deliverables and tracked results. See <a href=\"/pages/crypto-influencer-marketing-agency\">crypto influencer marketing</a> and <a href=\"/playbook/how-to-vet-crypto-kols-2026\">how to vet KOLs</a>."],
  faq=dict(q="Should KOL fees be paid in tokens or cash?",
           a="Prefer cash or a vesting structure tied to delivery. Large token allocations to promoters create sell pressure and weak alignment, so agree vesting and disclosure rules before any post goes out."))

P["/playbook/crypto-presale-launchpad-marketing-2026"] = dict(
  quotes=q("2014687376166281613"),
  eyebrow="From the field",
  h2="The retention problem behind presale marketing",
  paras=[
   "In October 2023 I wrote that education, onboarding, engagement and retention are badly broken in web3, and that value often accrues by users hopping chains to chase rewards. A presale or launchpad campaign faces that problem directly: the people most excited at launch are often the first to leave.",
   "In January 2026 I asked whether a TGE in a weak market is a good idea. My answer is that timing matters less than readiness. See <a href=\"/playbook/post-tge-pr-first-90-days-2026\">the first 90 days after TGE</a> and <a href=\"/pages/crypto-presale-marketing-agency\">presale marketing</a> for planning."],
  faq=dict(q="Is launching a token in a weak market a bad idea?",
           a="Not necessarily. A weak market gives quieter competition and cheaper attention, but it demands a stronger story and a user base that holds. If the product has no clear audience yet, waiting is cheaper than a failed launch."))

P["/playbook/how-to-get-bloomberg-crypto-coverage-2026"] = dict(
  quotes=q("1697279930776846765","2036450889838522539"),
  eyebrow="From the field",
  h2="The request I hear most, and my answer",
  paras=[
   "In August 2023 I posted a joke that is also the real conversation: clients asking for earned coverage on Cointelegraph, CoinDesk, The Block, Bloomberg, Blockworks and Forbes within a month. In March 2026 I wrote that people still think PR is just getting a CoinDesk article. Bloomberg is the hardest of that list, and the one where a single sourced, newsworthy fact matters most.",
   "That is why this playbook starts with what Bloomberg reporters can verify, not with how to pitch them. For the stepping stones, read <a href=\"/playbook/tier-1-pr-trap\">the tier-1 PR trap</a> and <a href=\"/playbook/crypto-media-relations-guide-2026\">the media relations guide</a>."],
  faq=dict(q="How long does it take to earn Bloomberg crypto coverage?",
           a="There is no fixed timeline, and a one-month target is unrealistic for most companies. Coverage follows a sourced, verifiable development such as a regulated product, a significant raise with named backers or measurable adoption, plus a relationship built over months."))

P["/playbook/personal-brand-startup-founder-2026"] = dict(
  quotes=q("1633048797986308096","1863120041132126516"),
  eyebrow="From the field",
  h2="Why consistency is the moat",
  paras=[
   "In August 2025 I wrote that showing up every day is the moat in building a personal brand. In March 2023 I wrote that you do not need a digital business card, you need a strong personal brand. I made writing on X every day a goal for 2023, and X is where my own personal brand, first client and first talk came from, which is the practical case for the habit.",
   "A founder brand works when it is specific, repeated and backed by proof. For the Web3 version, see <a href=\"/playbook/personal-brand-crypto-founder-2026\">personal brand for crypto founders</a> and <a href=\"/playbook/how-to-build-founder-thought-leadership-2026\">founder thought leadership</a>."],
  faq=dict(q="How often should a startup founder post to build a personal brand?",
           a="Daily is ideal on one platform, but weekly with real substance beats daily filler. Choose one channel where your buyers or investors already are, share specific lessons from your work and keep going for at least six months before judging."))

P["/playbook/token-launch-pr-mistakes-2026"] = dict(
  quotes=q("1783022374167953908","1730970021894258726"),
  eyebrow="From the field",
  h2="The mistake I see first",
  paras=[
   "In December 2023 I wrote that early-stage projects that think they can pay for PR and get top-tier coverage without strong news are not going to make it. In April 2024 I added that anyone promising top-tier coverage on day one of a Web3 PR activation is naive. Both describe the same error: treating coverage as something purchased rather than earned from news.",
   "The mistakes below follow from that. For the corrective sequence, see the <a href=\"/playbook/tier-1-pr-trap\">tier-1 PR trap</a> and <a href=\"/pages/token-launch-pr-agency\">token launch PR</a>."],
  faq=dict(q="Can paying for PR guarantee tier-1 coverage at a token launch?",
           a="No. Reputable outlets do not sell editorial coverage. You can pay for strategy, preparation and relationships, but coverage depends on whether the news is strong enough for that outlet's readers."))

P["/playbook/depin-pr-strategy-2026"] = dict(
  quotes=q("1908499569916125588","1741558180780634455","1729571063846363359"),
  eyebrow="From the field",
  h2="Why DePIN stories suit earned coverage",
  paras=[
   "In April 2025 I wrote that many DePIN and Bitcoin projects were running paid press releases when good earned coverage was available. The reason is straightforward: DePIN has physical devices, real locations and measurable usage, which are the facts reporters want. In December 2023 I wrote about being a proponent of projects building things normal people can use. I began supporting Powerloom, a decentralized data project, on PR and comms in November 2023.",
   "Lead with the number of active devices, the real-world service and the customer, not the token. See <a href=\"/pages/depin-pr-agency\">DePIN PR</a>, <a href=\"/pages/depin-marketing-agency\">DePIN marketing</a> and <a href=\"/playbook/web3-infrastructure-pr-2026\">Web3 infrastructure PR</a>."],
  faq=dict(q="What should a DePIN press story lead with?",
           a="Measurable network facts: active devices, locations, usage and revenue if available, plus the customer or community that depends on it. Token mechanics belong lower in the story."))

P["/playbook/cybersecurity-analyst-relations-2026"] = dict(
  quotes=q(),
  eyebrow="Choosing the right page",
  h2="Analyst relations is a different job from press",
  paras=[
   "Press and analysts read for different reasons. A reporter wants a story that is new this week. An analyst wants a coherent product position, customer evidence and a roadmap they can place in a market model. The same security company usually needs both, on separate calendars and with different materials.",
   "Use this playbook for Gartner, Forrester and IDC. For press, see <a href=\"/pages/cybersecurity-pr-agency\">cybersecurity PR</a>, <a href=\"/pages/infosec-pr-agency\">InfoSec PR</a> and the <a href=\"/playbook/cybersecurity-breach-crisis-comms-2026\">breach communications playbook</a>."],
  faq=dict(q="Should a security startup do analyst relations or press first?",
           a="Press first for most early-stage companies, because it is faster and cheaper and builds the proof analysts later ask for. Add analyst briefings once you have named customers and a defined category."))

P["/playbook/how-to-build-ai-search-visibility-geo-2026"] = dict(
  quotes=q(),
  eyebrow="From the field",
  h2="How I apply this on my own site",
  paras=[
   "This playbook is not only theory. The pages on this site open with a direct answer, carry a visible author and date, name specific outlets and numbers, and keep their structured data in step with the visible FAQ. Blog posts also publish a markdown version for AI crawlers. I run the same index and citation checks on my own site that I run for clients, and when a page fails them I add first-hand material rather than more filler.",
   "For the strategic frame, see the <a href=\"/playbook/aeo-vs-seo-startups-2026\">AEO versus SEO playbook</a> and the <a href=\"/pages/geo-aeo-agency-crypto\">GEO and AEO agency page</a>. The work in practice is on the <a href=\"/services/ai-seo/web3-ai-startups\">AI SEO for Web3 and AI startups</a>, <a href=\"/services/ai-seo/industrial-inbound\">industrial inbound</a> and <a href=\"/services/ai-seo/case-studies\">case study</a> pages, and you can check your own crawl rules with the free <a href=\"/tools/robots-txt-sitemap-generator\">robots.txt and sitemap generator</a>."],
  faq=dict(q="Why would a page be crawled but not indexed?",
           a="Google fetched it and chose not to store it, usually because the page adds little that other pages do not already provide, or because the site overall lacks trust signals. Adding first-hand experience, unique data and a clear author usually helps."))

P["/playbook/exchange-listing-pr-best-practices-2026"] = dict(
  quotes=q(),
  eyebrow="Field note",
  h2="What a listing announcement can honestly claim",
  paras=[
   "I worked at CoinMarketCap from 2021, a site built around listings and market data. That is why I treat a listing announcement as a trading-access update, not a milestone. Reporters know the difference, and exchange communities react badly to overclaiming.",
   "Lead with what changed for users: new pairs, regions, custody or liquidity. Keep the exchange's own approval and timing in view. See <a href=\"/pages/crypto-exchange-listing-pr\">exchange listing PR</a>, <a href=\"/pages/binance-listing-pr-agency\">Binance listing PR</a> and <a href=\"/pages/crypto-exchange-pr-agency\">exchange PR</a>."],
  faq=dict(q="What should a token listing announcement include?",
           a="The exchange name, trading pair and start time, supported regions, deposit and withdrawal availability, and what users should know about risks. Add one line on why the listing matters for access, not a price prediction."))

P["/playbook/how-to-get-covered-the-information-2026"] = dict(
  quotes=q("1876592952937525753","2070043456257532411"),
  eyebrow="From the field",
  h2="Relationships first, coverage second",
  paras=[
   "In January 2025 I wrote that anyone who thinks PR is easy has never tried to get a journalist's attention. In June 2026 I wrote that many PR people focus only on driving coverage and only a handful on building genuine media relationships. The Information sharpens both points: it publishes few stories and trusts people who have been reliable over time.",
   "Treat a pitch there as the end of a relationship, not the start. Read the reporter's last ten stories and offer something they cannot get elsewhere. See also <a href=\"/playbook/crypto-media-relations-guide-2026\">crypto media relations</a> and <a href=\"/playbook/how-to-get-covered-the-block-blockworks-2026\">The Block and Blockworks</a>."],
  faq=dict(q="Can a startup realistically get covered by The Information?",
           a="Sometimes, if it has a genuine scoop with named sources, such as a funding round, a leadership change or hard data. Announcements and product updates rarely qualify, so pitch only when the story would matter to a paying subscriber."))

json.dump(dict(tweets={k:dict(date=v[0],text=v[1],url=X+k) for k,v in TW.items()}, pages=P),
          open(os.path.join(ROOT,"data","recrawl-content.json"),"w",encoding="utf-8"),ensure_ascii=False,indent=1)
print(len(P),"pages",len(TW),"tweets")
