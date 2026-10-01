import { EditorialScripts } from '@/components/site/EditorialScripts';
import { EditorialShell } from '@/components/site/EditorialChrome';
import BudgetCalculator from '../_components/BudgetCalculator';
import { JsonLd, ToolCta, ToolFaq, ToolHero, ToolHowTo } from '../_components/ToolSections';
import { toolJsonLd, toolMetadata, type Faq } from '../_lib/seo';
import '../../blog/blog.css';
import '../tools.css';

const PATH = '/tools/marketing-budget-calculator';
const NAME = 'Startup Marketing Budget Calculator';
const DESCRIPTION =
  'Free startup marketing budget calculator. Set your budget from burn or directly, split it across people, programs and tools, allocate it to 20 channels, and estimate leads, CAC, LTV:CAC and payback.';

export const metadata = toolMetadata({
  path: PATH,
  title: 'Startup Marketing Budget Calculator: Channels, CAC and Payback',
  description: DESCRIPTION,
  ogTitle: NAME,
});

const FAQS: Faq[] = [
  {
    q: 'How much should a startup spend on marketing?',
    a: 'A common starting point is 10% of monthly burn at pre-seed, 15% at seed, 20% at Series A and 25% at Series B. These are defaults, not rules. Product-led and consumer companies often spend more; sales-led companies put more into people.',
  },
  {
    q: 'How is CAC calculated here?',
    a: 'Each channel gets a share of the programs budget based on your goal. Estimated leads come from your cost-per-lead range, and customers come from your lead-to-customer conversion rate. Blended CAC divides the full monthly budget, including people and tools, by estimated new customers.',
  },
  {
    q: 'Are the cost-per-lead numbers benchmarks?',
    a: 'No. They are rough planning ranges so the calculator works out of the box. Every cell is editable, and you should replace them with your own data as soon as you have a month of results.',
  },
  {
    q: 'What is a good LTV:CAC ratio and payback period?',
    a: 'Many SaaS investors look for LTV:CAC of 3 to 1 or better and CAC payback under 12 months. Early-stage companies are often below that while they test channels. The calculator flags when your assumptions fall under break-even.',
  },
];

export default function BudgetCalculatorPage() {
  return (
    <>
      <JsonLd id="budget-calculator-jsonld" data={toolJsonLd({ path: PATH, name: NAME, description: DESCRIPTION, faqs: FAQS })} />
      <EditorialShell active="playbook">
        <main className="blog-page tool-page">
          <div className="blog-page-inner">
            <ToolHero kicker="Free tool · Budget calculator" title={<>Budget, <em>sized</em>.</>}>
              <p>
                Work out what to spend on marketing at your stage, where it should go, and what it is likely to
                return. Every assumption is visible and editable, so you can swap our estimates for your own numbers.
              </p>
            </ToolHero>
            <ToolHowTo
              steps={[
                'Pick your stage and enter monthly burn, or switch to entering the budget directly.',
                'Adjust the people and tools share. Programs get the rest.',
                'Choose a goal and the channels you plan to run. Allocation is weighted by how well each channel serves that goal.',
                'Edit the cost-per-lead ranges and unit economics, then export the plan as a CSV.',
              ]}
            />
            <BudgetCalculator />
            <ToolFaq faqs={FAQS} />
            <ToolCta />
          </div>
        </main>
      </EditorialShell>
      <EditorialScripts />
    </>
  );
}
