import type { FreeTool } from './types';

export const CALCULATOR_TOOLS: FreeTool[] = [
  {
    slug: 'roi-roas-calculator',
    name: 'Marketing ROI and ROAS Calculator',
    group: 'calculators',
    blurb: 'ROAS, marketing ROI, net profit and the break-even ROAS for your margin.',
    title: 'Free ROAS and Marketing ROI Calculator',
    description:
      'Free ROAS and marketing ROI calculator. Enter revenue, ad spend, other costs and margin to get ROAS, ROI, net profit and break-even ROAS. No signup needed.',
    h1: ['Is the campaign ', 'paying', ' off?'],
    intro:
      'Work out return on ad spend, true marketing ROI after margin and costs, and the ROAS you need to hit a profit target. Built for founders and marketers who sign off ad budgets.',
    howto: [
      'Enter campaign revenue, ad spend and any agency, creative or tool costs.',
      'Set your gross margin so profit reflects what you actually keep.',
      'Compare your ROAS with the break-even line and the target ROI table.',
    ],
    faqs: [
      {
        q: 'What is a good ROAS?',
        a: 'It depends on your margin. Break-even ROAS is 1 divided by gross margin, so a 50% margin business needs 2x just to cover ad spend. Most ecommerce brands aim for 3x to 4x, while SaaS with 75% or higher margins can scale profitably at 2x to 3x once lifetime value is counted.',
      },
      {
        q: 'What is the difference between ROAS and ROI?',
        a: 'ROAS is revenue divided by ad spend and ignores every other cost. Marketing ROI subtracts all campaign costs from gross profit and divides by those costs. A 4x ROAS can still be a negative ROI if margins are thin or agency and creative costs are high.',
      },
      {
        q: 'How do I calculate break-even ROAS?',
        a: 'Divide 1 by your gross margin as a decimal. At a 60% margin, break-even ROAS is 1 / 0.6, or about 1.67x. If you also pay agency or creative fees, the true break-even is total campaign cost divided by ad spend times margin.',
      },
    ],
    related: [
      { href: '/playbook/how-to-measure-pr-roi-2026', label: 'How to measure PR ROI' },
      { href: '/tools/marketing-budget-calculator', label: 'Marketing budget calculator' },
      { href: '/services', label: 'Services' },
    ],
    category: 'BusinessApplication',
  },
  {
    slug: 'cpm-cpc-ctr-calculator',
    name: 'CPM, CPC and CTR Calculator',
    group: 'calculators',
    blurb: 'Ad metrics, solve for any missing number, and 2026 platform benchmarks.',
    title: 'Free CPM, CPC and CTR Calculator (2026)',
    description:
      'Free CPM, CPC and CTR calculator. Get CPA, CVR and ROAS, solve for any missing metric, plan a budget and compare with 2026 ad benchmarks. No signup needed.',
    h1: ['Know your ', 'ad', ' numbers.'],
    intro:
      'Turn spend, impressions and clicks into CPM, CPC, CTR, CPA and ROAS, solve for a missing figure, or plan what a budget will buy. Includes rough benchmark ranges for the main ad platforms.',
    howto: [
      'Enter spend, impressions and clicks from your ads manager.',
      'Add conversions and revenue to see CVR, CPA and ROAS.',
      'Use Solve or Plan to fill a gap or forecast a new budget.',
    ],
    faqs: [
      {
        q: 'How do you calculate CPM?',
        a: 'CPM is cost divided by impressions, multiplied by 1,000. If you spend $500 for 40,000 impressions, CPM is $12.50. It tells you the price of reach, so compare it between platforms and audiences rather than in isolation.',
      },
      {
        q: 'What is a good CTR for ads in 2026?',
        a: 'Google Search ads often see 3% to 7% CTR because people are already searching. Meta usually sits around 0.9% to 1.6%, LinkedIn 0.4% to 0.7%, and display 0.3% to 0.6%. Beating your own baseline matters more than any industry average.',
      },
      {
        q: 'What is the difference between CPC and CPA?',
        a: 'CPC is what you pay for each click. CPA is what you pay for each conversion, such as a signup or sale. CPA equals CPC divided by your conversion rate, so a $2 CPC at a 4% conversion rate gives a $50 CPA.',
      },
    ],
    related: [
      { href: '/tools/marketing-budget-calculator', label: 'Marketing budget calculator' },
      { href: '/playbook/linkedin-strategy-founders-2026', label: 'LinkedIn strategy for founders' },
      { href: '/services/kol-marketing', label: 'KOL marketing' },
    ],
    category: 'BusinessApplication',
  },
  {
    slug: 'ltv-cac-calculator',
    name: 'Customer Lifetime Value and CAC Calculator',
    group: 'calculators',
    blurb: 'LTV, CAC, LTV:CAC ratio and payback months, with a sensitivity table.',
    title: 'Free LTV to CAC Ratio Calculator for SaaS',
    description:
      'Free LTV:CAC calculator for SaaS and startups. Get customer lifetime value, CAC, payback months and a clear verdict on your unit economics. No signup needed.',
    h1: ['Check your ', 'unit', ' economics.'],
    intro:
      'Calculate customer lifetime value, acquisition cost, the LTV:CAC ratio and CAC payback in one place. Made for SaaS and subscription founders preparing a board update or a raise.',
    howto: [
      'Enter revenue per customer, gross margin and monthly churn or lifetime.',
      'Add sales and marketing spend and the new customers it brought in.',
      'Read the ratio, payback and how churn and CAC changes move it.',
    ],
    faqs: [
      {
        q: 'What is a good LTV to CAC ratio?',
        a: 'A ratio of 3:1 or better is the usual SaaS benchmark, meaning each customer brings back three times what it cost to win them in gross profit. Below 1:1 you lose money on every customer. Above 5:1 often means you are underspending on growth.',
      },
      {
        q: 'How do you calculate customer lifetime value?',
        a: 'A simple SaaS formula is average revenue per account per month, times gross margin, divided by monthly churn. At $400 a month, 75% margin and 3% churn, LTV is $400 x 0.75 / 0.03, or $10,000.',
      },
      {
        q: 'What is a good CAC payback period?',
        a: 'Under 12 months is strong for most SaaS companies, and 12 to 18 months is common for mid-market. Over 24 months ties up a lot of cash before a customer becomes profitable. Payback is CAC divided by monthly gross profit per customer.',
      },
    ],
    related: [
      { href: '/tools/marketing-budget-calculator', label: 'Marketing budget calculator' },
      { href: '/tools/gtm-planner', label: 'GTM planner' },
      { href: '/services/ai-startup-pr', label: 'AI startup PR' },
    ],
    category: 'BusinessApplication',
  },
  {
    slug: 'ab-test-significance-calculator',
    name: 'Conversion Rate and A/B Test Significance Calculator',
    group: 'calculators',
    blurb: 'Is your A/B test result real? Significance, sample size and conversion rate.',
    title: 'Free A/B Test Significance Calculator',
    description:
      'Free A/B test significance calculator. Get p-value, confidence, uplift and the sample size you need, plus a conversion rate calculator. No signup needed.',
    h1: ['Is the ', 'winner', ' real?'],
    intro:
      'Check whether an A/B test result is statistically significant, plan how many visitors a test needs, and work out conversion rates. For marketers testing landing pages, emails and ads.',
    howto: [
      'Enter visitors and conversions for variant A and variant B.',
      'Pick a confidence level and read the p-value, uplift and verdict.',
      'Before your next test, use Sample size to plan how long to run it.',
    ],
    faqs: [
      {
        q: 'What does statistically significant mean in an A/B test?',
        a: 'It means the difference between variants is unlikely to come from chance alone. At 95% confidence, a p-value under 0.05 is significant. It does not mean the uplift is large, only that it is probably real.',
      },
      {
        q: 'How many visitors do I need for an A/B test?',
        a: 'It depends on your baseline conversion rate and the smallest lift you care about. Detecting a 15% relative lift on a 3% baseline at 95% confidence and 80% power needs about 24,000 visitors per variant. Smaller lifts need far more traffic.',
      },
      {
        q: 'How long should an A/B test run?',
        a: 'Run it until you reach the sample size you planned, and for at least one or two full weeks to cover weekday and weekend behaviour. Stopping as soon as a result looks significant inflates false positives.',
      },
    ],
    related: [
      { href: '/tools/marketing-checklist', label: 'Marketing checklist' },
      { href: '/playbook/how-to-measure-pr-roi-2026', label: 'How to measure PR ROI' },
      { href: '/services/content-writing', label: 'Content writing' },
    ],
    category: 'BusinessApplication',
  },
  {
    slug: 'ad-budget-planner',
    name: 'Ad Budget Planner',
    group: 'calculators',
    blurb: 'Work back from leads or revenue to a total and daily ad budget by channel.',
    title: 'Free Ad Budget Planner and Calculator',
    description:
      'Free ad budget planner. Work back from a lead, sales or revenue goal to total and daily ad spend, then split it across Google, Meta, LinkedIn, X and TikTok.',
    h1: ['Plan the ', 'spend', ' backwards.'],
    intro:
      'Start from the leads, sales or revenue you need and work back to clicks, total budget and daily spend. Then split it across channels and download the plan as a CSV.',
    howto: [
      'Pick a goal and enter the target, campaign length and expected CPC.',
      'Add landing page conversion rate, and close rate or order value if you know them.',
      'Choose a channel preset, adjust the split, then copy or download the plan.',
    ],
    faqs: [
      {
        q: 'How do I calculate an ad budget?',
        a: 'Work backwards from your goal. Divide the leads or sales you need by your landing page conversion rate to get clicks, then multiply clicks by your expected CPC. 200 leads at a 5% conversion rate and a $4 CPC needs 4,000 clicks and $16,000.',
      },
      {
        q: 'How much should a startup spend on ads per day?',
        a: 'Enough for each campaign to exit the learning phase, which on Meta is roughly 50 conversions a week. In practice that often means $50 to $150 a day per campaign for B2C and more for B2B, where clicks cost $5 to $12 on LinkedIn.',
      },
      {
        q: 'How should I split budget across ad channels?',
        a: 'Put most of it where intent or your audience already is. B2B often starts around 40% Google Search and 40% LinkedIn, B2C leans on Meta and Google, and Web3 launches lean on X and community channels. Keep 10% to 20% for testing.',
      },
    ],
    related: [
      { href: '/tools/marketing-budget-calculator', label: 'Marketing budget calculator' },
      { href: '/playbook/crypto-pr-small-budget-2026', label: 'Crypto PR on a small budget' },
      { href: '/services/token-launch-pr', label: 'Token launch PR' },
    ],
    category: 'BusinessApplication',
  },
  {
    slug: 'break-even-calculator',
    name: 'Break-Even Calculator',
    group: 'calculators',
    blurb: 'Break-even units, revenue and ROAS for your business or a single campaign.',
    title: 'Free Break-Even Calculator with Chart',
    description:
      'Free break-even calculator. Find break-even units, revenue and contribution margin for your business, or the sales and ROAS a campaign needs. No signup needed.',
    h1: ['Find your ', 'break-even', ' point.'],
    intro:
      'See how many units or sales you need to cover fixed costs or a campaign, with a chart of revenue against cost. Useful for pricing, launch planning and sanity-checking ad spend.',
    howto: [
      'Enter fixed monthly costs, price per unit and variable cost per unit.',
      'Read break-even units and revenue, and add a profit target if you have one.',
      'Switch to Campaign to see the sales and ROAS a single campaign needs.',
    ],
    faqs: [
      {
        q: 'How do you calculate the break-even point?',
        a: 'Divide fixed costs by contribution margin per unit, which is price minus variable cost. With $25,000 of fixed costs, a $99 price and $19 variable cost, break-even is 25,000 / 80, or 313 units a month.',
      },
      {
        q: 'What is contribution margin?',
        a: 'Contribution margin is what each sale leaves after variable costs, available to cover fixed costs and then profit. The contribution margin ratio is that amount divided by price. Software products often run 70% to 90%, physical goods far lower.',
      },
      {
        q: 'How do I work out break-even ROAS for a campaign?',
        a: 'Break-even ROAS is 1 divided by your margin on each sale. At an 80% margin you need 1.25x, so every $1 of campaign cost must bring in $1.25 of revenue. At a 30% margin you need about 3.33x.',
      },
    ],
    related: [
      { href: '/tools/marketing-budget-calculator', label: 'Marketing budget calculator' },
      { href: '/tools/gtm-planner', label: 'GTM planner' },
      { href: '/services', label: 'Services' },
    ],
    category: 'BusinessApplication',
  },
];
