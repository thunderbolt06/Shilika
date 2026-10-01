import { EditorialScripts } from '@/components/site/EditorialScripts';
import { EditorialShell } from '@/components/site/EditorialChrome';
import MarketingChecklist from '../_components/MarketingChecklist';
import { JsonLd, ToolCta, ToolFaq, ToolHero, ToolHowTo } from '../_components/ToolSections';
import { ALL_SECTIONS } from '../_data/checklist';
import { toolJsonLd, toolMetadata, type Faq } from '../_lib/seo';
import '../../blog/blog.css';
import '../tools.css';

const PATH = '/tools/marketing-checklist';
const NAME = 'Startup Marketing Checklist';
const ITEM_COUNT = ALL_SECTIONS.reduce((a, s) => a + s.items.length, 0);
const DESCRIPTION = `Free interactive startup marketing checklist with ${ITEM_COUNT} items across foundations, pre-launch, launch week, the first 90 days, always-on habits and 20 channels. Progress saves in your browser.`;

export const metadata = toolMetadata({
  path: PATH,
  title: 'Startup Marketing Checklist: Launch Phases and 20 Channels',
  description: DESCRIPTION,
  ogTitle: NAME,
});

const FAQS: Faq[] = [
  {
    q: 'What should a startup do before launching marketing?',
    a: 'Lock a one-sentence positioning, interview at least 8 target users, define one activation event or qualified-lead definition, and make sure every signup is tracked to a source. The Foundations section covers the full list.',
  },
  {
    q: 'Do I need to do every channel on this checklist?',
    a: 'No. Most early-stage teams should run two or three channels well. Use the channel sections to check you have the basics covered for the channels you pick, and ignore the rest until those work.',
  },
  {
    q: 'Where is my progress saved?',
    a: 'In your browser using local storage. It stays on this device and browser, nothing is sent to a server, and the reset button clears it.',
  },
  {
    q: 'How long before launch should I start?',
    a: 'Four to six weeks is a workable minimum for a launch with press, partners and a waitlist. Foundations can take another two to four weeks before that if positioning is not settled.',
  },
];

export default function MarketingChecklistPage() {
  return (
    <>
      <JsonLd id="marketing-checklist-jsonld" data={toolJsonLd({ path: PATH, name: NAME, description: DESCRIPTION, faqs: FAQS })} />
      <EditorialShell active="playbook">
        <main className="blog-page tool-page">
          <div className="blog-page-inner">
            <ToolHero kicker={`Free tool · ${ITEM_COUNT} items`} title={<>Ship it, <em>checked</em>.</>}>
              <p>
                Everything a startup marketing launch needs, from positioning to launch week to the habits that
                keep it compounding, plus a short list of concrete basics for each of the 20 channels founders ask
                about.
              </p>
            </ToolHero>
            <ToolHowTo
              steps={[
                'Start with Foundations. Skipping it is the most common reason launches underperform.',
                'Use the Show filter to focus on one phase or one channel at a time.',
                'Tick items as you go. Progress saves automatically in this browser.',
                'Print the list or save it as a PDF to share with your team.',
              ]}
            />
            <MarketingChecklist />
            <ToolFaq faqs={FAQS} />
            <ToolCta />
          </div>
        </main>
      </EditorialShell>
      <EditorialScripts />
    </>
  );
}
