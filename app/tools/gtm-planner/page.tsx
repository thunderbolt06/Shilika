import { EditorialScripts } from '@/components/site/EditorialScripts';
import { EditorialShell } from '@/components/site/EditorialChrome';
import GtmPlanner from '../_components/GtmPlanner';
import { JsonLd, ToolCta, ToolFaq, ToolHero, ToolHowTo } from '../_components/ToolSections';
import { toolJsonLd, toolMetadata, type Faq } from '../_lib/seo';
import '../../blog/blog.css';
import '../tools.css';

const PATH = '/tools/gtm-planner';
const NAME = 'AI Startup GTM Planner';
const DESCRIPTION =
  'Free GTM planner for AI and Web3 startups. Pick your category, stage, buyer, motion and budget to get a positioning prompt, a ranked channel mix, a 90-day plan, metrics and risks.';

export const metadata = toolMetadata({
  path: PATH,
  title: 'AI Startup GTM Planner: Free 90-Day Go-to-Market Plan Tool',
  description: DESCRIPTION,
  ogTitle: NAME,
});

const FAQS: Faq[] = [
  {
    q: 'How does the GTM planner pick channels?',
    a: 'Each of the 20 channels gets a fit score for your category, then the score moves up or down based on where your buyer checks claims, your sales motion, your stage and your budget. The top 5 are shown with a share of budget weighted by score.',
  },
  {
    q: 'Is a 90-day GTM plan enough for an AI startup?',
    a: 'Ninety days is long enough to set up measurement, ship core assets and get a real signal from two or three channels, and short enough to change course before you burn a quarter of runway. Treat it as the first cycle, then rerun the plan with your own numbers.',
  },
  {
    q: 'What budget should I enter?',
    a: 'Enter what you can spend on programs and tools each month, without salaries. If you are pre-seed with no budget, enter a small number and the planner will favour founder-led and organic channels over paid media.',
  },
  {
    q: 'Does the planner store my inputs?',
    a: 'No. Everything runs in your browser. The download and print buttons create the file on your device and nothing is sent to a server.',
  },
];

export default function GtmPlannerPage() {
  return (
    <>
      <JsonLd id="gtm-planner-jsonld" data={toolJsonLd({ path: PATH, name: NAME, description: DESCRIPTION, faqs: FAQS })} />
      <EditorialShell active="playbook">
        <main className="blog-page tool-page">
          <div className="blog-page-inner">
            <ToolHero kicker="Free tool · GTM planner" title={<>GTM, <em>planned</em>.</>}>
              <p>
                A go-to-market plan for AI and Web3 startups in about two minutes. Pick your category, stage, buyer,
                motion and monthly budget, and the plan rewrites itself: positioning, channel mix, a 90-day plan,
                metrics and the risks most likely to sink it.
              </p>
            </ToolHero>
            <ToolHowTo
              steps={[
                'Choose the category closest to what you sell and the stage you are at today, not the one you are raising for.',
                'Pick the buyer who signs or swipes the card, and the motion you actually run this quarter.',
                'Enter a realistic monthly budget for programs and tools. The plan updates as you type.',
                'Download the plan as a markdown file or print it to PDF, then edit it with your own numbers.',
              ]}
            />
            <GtmPlanner />
            <ToolFaq faqs={FAQS} />
            <ToolCta />
          </div>
        </main>
      </EditorialShell>
      <EditorialScripts />
    </>
  );
}
