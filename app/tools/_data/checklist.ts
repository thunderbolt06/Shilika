import type { ChannelId } from './channels';

export interface ChecklistItem {
  id: string;
  text: string;
}

export interface ChecklistSection {
  id: string;
  title: string;
  kind: 'phase' | 'channel';
  channelId?: ChannelId;
  summary: string;
  items: ChecklistItem[];
}

function section(
  id: string,
  title: string,
  kind: 'phase' | 'channel',
  summary: string,
  items: string[],
  channelId?: ChannelId,
): ChecklistSection {
  return {
    id,
    title,
    kind,
    channelId,
    summary,
    items: items.map((text, i) => ({ id: `${id}-${i + 1}`, text })),
  };
}

export const PHASES: ChecklistSection[] = [
  section('foundations', 'Foundations', 'phase', 'Get the basics right before spending on reach.', [
    'Write a one-sentence positioning statement: who it is for, the problem, and why you over the default alternative.',
    'Interview at least 8 target users and save their exact words for the problem in a shared doc.',
    'Define your ideal customer profile with firmographics (or user traits) and 3 disqualifiers.',
    'Pick one activation event or qualified-lead definition and agree on it across the founding team.',
    'Set up analytics (product events, website analytics, UTMs) and test that a signup is tracked end to end.',
    'Create a CRM or spreadsheet that records lead source for every signup and meeting.',
    'Write a messaging house: headline, 3 proof pillars, and the objections each pillar answers.',
    'Prepare a press kit: founder bios, headshots, logo files, product screenshots and a short company fact sheet.',
  ]),
  section('pre-launch', 'Pre-launch', 'phase', 'Build demand and assets in the 4 to 6 weeks before launch day.', [
    'Set a launch date tied to a real milestone (public beta, GA, mainnet, funding) and work backwards.',
    'Open a waitlist with a reason to join early (access, pricing, founding-member badge).',
    'Line up 3 to 5 customers or beta users willing to be quoted, with written approval.',
    'Draft the launch announcement, FAQ, demo video and social posts, and get legal review where needed.',
    'Build a list of 25 to 50 reporters, newsletters and podcasts that covered your category in the last 90 days.',
    'Offer one exclusive to a priority outlet 1 to 2 weeks before launch, with a clear embargo time.',
    'Brief partners, investors and advisors with ready-to-post copy and the exact launch time.',
    'Load-test signup, onboarding and payment flows for a traffic spike.',
  ]),
  section('launch-week', 'Launch week', 'phase', 'Concentrate every channel on the same few days.', [
    'Publish the announcement on your site first, then share the canonical link everywhere.',
    'Founder posts the story on X and LinkedIn, and the team replies to every comment on day one.',
    'Launch on Product Hunt, Show HN or relevant launch directories on the same or adjacent day.',
    'Email the waitlist with a direct path to activation, not just a blog link.',
    'Send coverage and posts to investors and partners so they can amplify within the first hours.',
    'Staff a live channel (Discord, Slack, chat) for questions and bugs throughout launch week.',
    'Log every mention, signup spike and source in one sheet for the post-launch review.',
  ]),
  section('first-90-days', 'First 90 days', 'phase', 'Turn the launch spike into a repeatable engine.', [
    'Run a launch retro: which channels drove activated users or qualified pipeline, not just traffic.',
    'Pick 2 channels to double down on and pause the rest for one quarter.',
    'Publish at least 2 customer stories with a before and after number.',
    'Ship an onboarding email or in-app sequence tied to the activation event.',
    'Turn the top 5 sales or support questions into public pages for search and AI answers.',
    'Set monthly targets for leads, activation and pipeline by channel, and review them every week.',
    'Plan the next news moment (feature, integration, data report) 60 to 90 days out.',
  ]),
  section('always-on', 'Always-on', 'phase', 'The habits that keep marketing compounding.', [
    'Founder publishes on one social channel at least 3 times a week.',
    'Update the top 10 pages on the site every quarter with fresh numbers and screenshots.',
    'Review what ChatGPT, Perplexity and Google AI Overviews say about your brand and competitors every month.',
    'Keep a running doc of customer quotes, wins and objections that marketing can reuse.',
    'Refresh your press kit and boilerplate after every funding round or major hire.',
    'Review channel CAC and payback monthly and move budget toward what works.',
    'Keep a crisis comms plan: holding statement, approvers and a 2-hour response rule.',
  ]),
];

export const CHANNEL_SECTIONS: ChecklistSection[] = [
  section('ch-seo', 'SEO', 'channel', 'Rank for the searches buyers make when they are ready to choose.', [
    'Build a keyword list of 30 bottom-of-funnel terms: "[competitor] alternative", "[category] pricing", "[job] tool".',
    'Publish comparison and alternative pages with honest trade-offs and a clear recommendation.',
    'Fix technical basics: unique titles and descriptions, sitemap, fast load on mobile, no broken internal links.',
    'Add internal links from every blog post to one relevant product or use-case page.',
    'Track rankings and organic signups monthly, not just traffic.',
  ], 'seo'),
  section('ch-geo', 'GEO / AI search', 'channel', 'Show up in answers from ChatGPT, Perplexity, Gemini and Google AI Overviews.', [
    'List 30 questions buyers ask AI assistants about your category and test them monthly.',
    'Note which sources each AI cites and get your brand mentioned on those pages (reviews, lists, publications).',
    'Write answer-first pages: the direct answer in the first two sentences, then the detail.',
    'Add structured data (Organization, Product, FAQ) and keep facts consistent across your site and profiles.',
    'Publish an llms.txt file and a clear "about" page with founding facts AI models can quote.',
  ], 'geo'),
  section('ch-google-ads', 'Google Ads', 'channel', 'Capture existing demand with high-intent search.', [
    'Start with exact and phrase match on problem and competitor terms only.',
    'Send each ad group to a matching landing page, not the homepage.',
    'Import offline conversions (qualified leads, closed deals) so bidding optimises for quality.',
    'Add negative keywords weekly from the search terms report.',
    'Set a kill rule: pause any campaign above 2x target cost per qualified lead after enough spend to judge.',
  ], 'google-ads'),
  section('ch-meta-ads', 'Meta Ads', 'channel', 'Paid social for consumer and prosumer audiences.', [
    'Install the pixel and Conversions API and verify events in Events Manager.',
    'Test at least 6 creative hooks (short video first) against one broad audience.',
    'Optimise for activation or purchase, not clicks or landing page views.',
    'Refresh creative every 2 to 3 weeks before frequency drives costs up.',
  ], 'meta-ads'),
  section('ch-linkedin-ads', 'LinkedIn Ads', 'channel', 'Reach B2B buyers by company and role.', [
    'Upload a named account list and target by function and seniority within it.',
    'Run thought leader ads from the founder or exec profile rather than only the company page.',
    'Use lead gen forms with 3 fields or fewer and sync them to your CRM within minutes.',
    'Retarget video viewers and page visitors with a proof asset (case study, report).',
  ], 'linkedin-ads'),
  section('ch-reddit', 'Reddit', 'channel', 'Earn trust in the communities where buyers vent and compare.', [
    'Identify 5 subreddits where your buyer discusses the problem, and read the rules of each.',
    'Answer questions from a real, named account for at least 4 weeks before sharing links.',
    'Disclose that you work on the product whenever you mention it.',
    'Track which threads rank on Google and in AI answers, and keep those answers updated.',
  ], 'reddit'),
  section('ch-x-organic', 'X / Twitter organic', 'channel', 'Build founder visibility in tech and crypto conversations.', [
    'Optimise the founder bio with what you build, for whom, and one proof point.',
    'Post daily: one build update, one category opinion, one reply thread.',
    'Reply thoughtfully to 10 larger accounts in your niche every day.',
    'Pin a thread that explains the product with a demo clip.',
    'Host or join an X Space once a month with partners or customers.',
  ], 'x-organic'),
  section('ch-linkedin-organic', 'LinkedIn organic', 'channel', 'Founder-led credibility with business buyers.', [
    'Rewrite the founder headline around the customer problem, not the job title.',
    'Post 3 times a week using a mix of stories, data and opinions.',
    'Comment on posts from 20 target buyers each week before asking for anything.',
    'Turn your best-performing posts into a newsletter or carousel.',
  ], 'linkedin-organic'),
  section('ch-youtube', 'YouTube', 'channel', 'Searchable, evergreen demos and education.', [
    'Publish tutorials titled with the exact phrase people search for.',
    'Add chapters, a clear thumbnail and a link to the relevant docs or signup page.',
    'Embed each video on the matching page of your site.',
    'Review retention graphs and cut slow intros in the next video.',
  ], 'youtube'),
  section('ch-tiktok', 'TikTok / Shorts', 'channel', 'Short vertical video for reach and consumer signups.', [
    'Batch-film 20 clips in one session to remove the daily production bottleneck.',
    'Lead with the result in the first second, then show how.',
    'Cross-post to TikTok, Instagram Reels and YouTube Shorts with native captions.',
    'Turn the top 3 organic clips into paid ads or creator briefs.',
  ], 'tiktok'),
  section('ch-email', 'Email', 'channel', 'Owned channel for onboarding, nurture and launches.', [
    'Authenticate your sending domain (SPF, DKIM, DMARC) before any campaign.',
    'Write an onboarding sequence that pushes users to the activation event.',
    'Send a monthly product or insight email to every lead who has not converted.',
    'Segment by role or use case once you pass 1,000 contacts.',
    'Track replies and conversions, not just opens.',
  ], 'email'),
  section('ch-whatsapp', 'WhatsApp', 'channel', 'Direct, high-open messaging in markets where buyers live on it.', [
    'Use the WhatsApp Business app or API with a verified business profile.',
    'Collect explicit opt-in before sending any broadcast.',
    'Use a channel or broadcast list for launch alerts and event reminders, not daily promotions.',
    'Route replies to a person who can answer within business hours.',
  ], 'whatsapp'),
  section('ch-communities', 'Communities', 'channel', 'Discord, Slack, Telegram and forums where users help each other.', [
    'Choose one home platform and write a welcome message with 3 rules and a first action.',
    'Run a weekly ritual such as office hours, a demo, or a challenge.',
    'Moderate actively: remove spam and scam bots daily, especially in crypto communities.',
    'Recognise top helpers publicly and give them early access.',
    'Share community wins and quotes outside the community.',
  ], 'communities'),
  section('ch-product-hunt', 'Product Hunt / launch sites', 'channel', 'Concentrated launch-day reach with early adopters.', [
    'Prepare the listing: tagline, gallery, maker comment and a short demo video.',
    'Brief 50 supporters in advance with the launch time and ask for honest comments, not upvote requests.',
    'Submit to Show HN, BetaList and niche directories in the same week.',
    'Reply to every comment within the first 6 hours.',
  ], 'product-hunt'),
  section('ch-pr', 'PR / earned media', 'channel', 'Third-party credibility that sales, investors and AI search all reuse.', [
    'Build a media list of reporters who covered your category in the last 90 days.',
    'Pitch a story (data, trend, contrarian view, milestone), not a product feature list.',
    'Offer exclusives to one priority outlet before going wide.',
    'Prepare the founder with 3 key messages and answers to the 5 hardest questions.',
    'Repurpose every piece of coverage on the site, in sales decks and in investor updates.',
  ], 'pr'),
  section('ch-podcasts', 'Podcasts', 'channel', 'Long-form founder credibility with niche audiences.', [
    'List 15 to 30 shows your buyers listen to, prioritising niche over size.',
    'Pitch each host 3 specific episode angles tied to their recent episodes.',
    'Prepare 3 stories with numbers the founder can tell in under 2 minutes each.',
    'Clip each appearance into 3 to 5 short videos and share them.',
  ], 'podcasts'),
  section('ch-influencers', 'Influencers / KOLs', 'channel', 'Borrowed trust from creators and key opinion leaders.', [
    'Shortlist creators by audience overlap and engagement quality, not follower count.',
    'Check past sponsored posts for disclosure and audience reaction.',
    'Brief creators on the outcome to show, not a script to read.',
    'Give each creator a unique link or code and pay a bonus on activations.',
    'For crypto KOLs, require clear disclosure and stagger posts instead of one coordinated blast.',
  ], 'influencers'),
  section('ch-partnerships', 'Partnerships & integrations', 'channel', 'Distribution through tools and companies your buyers already trust.', [
    'Rank 20 partners by audience overlap and integration effort.',
    'Ship one integration and get listed in the partner’s marketplace or docs.',
    'Agree on a joint launch: blog post, email to both lists, and a shared webinar or Space.',
    'Give each partner a named owner and a quarterly pipeline target.',
  ], 'partnerships'),
  section('ch-events', 'Events / conferences', 'channel', 'In-person trust and pipeline with high-value buyers.', [
    'Pick 2 to 3 events a year where your buyers already go, rather than many small ones.',
    'Host a side event or dinner instead of buying a booth when budget is limited.',
    'Book meetings 2 to 3 weeks before the event.',
    'Follow up every conversation within 48 hours with a specific next step.',
  ], 'events'),
  section('ch-referral', 'Referral programs', 'channel', 'Turn happy users into an acquisition channel.', [
    'Trigger the referral ask at the moment users get value, not at signup.',
    'Offer a two-sided reward that matters to both people.',
    'Make sharing one click with a prefilled message and personal link.',
    'Track invites sent and accepted per active user every week.',
  ], 'referral'),
];

export const ALL_SECTIONS: ChecklistSection[] = [...PHASES, ...CHANNEL_SECTIONS];
