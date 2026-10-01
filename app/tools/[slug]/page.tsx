import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EditorialScripts } from '@/components/site/EditorialScripts';
import { EditorialShell } from '@/components/site/EditorialChrome';
import { TOOL_COMPONENTS } from '../_components/free/components';
import ToolFrame from '../_components/free/ToolFrame';
import { JsonLd, ToolFaq, ToolHero, ToolHowTo } from '../_components/ToolSections';
import { FREE_TOOL_BY_SLUG, FREE_TOOLS, GROUPS } from '../_data/free';
import { toolJsonLd, toolMetadata } from '../_lib/seo';
import '../../blog/blog.css';
import '../tools.css';
import '../free-tools.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return FREE_TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = FREE_TOOL_BY_SLUG[slug];
  if (!tool) return {};
  return toolMetadata({ path: `/tools/${slug}`, title: tool.title, description: tool.description, ogTitle: tool.name });
}

export default async function FreeToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = FREE_TOOL_BY_SLUG[slug];
  const Tool = TOOL_COMPONENTS[slug];
  if (!tool || !Tool) notFound();

  const path = `/tools/${slug}`;
  const group = GROUPS.find((g) => g.id === tool.group);
  const siblings = FREE_TOOLS.filter((t) => t.group === tool.group && t.slug !== slug).slice(0, 4);
  const [before, italic, after] = tool.h1;

  return (
    <>
      <JsonLd
        id={`${slug}-jsonld`}
        data={toolJsonLd({
          path,
          name: tool.name,
          description: tool.description,
          faqs: tool.faqs,
          category: tool.category,
        })}
      />
      <EditorialShell active="playbook">
        <main className="blog-page tool-page ft-page">
          <div className="blog-page-inner">
            <ToolHero
              kicker={`Free · ${group?.label ?? 'Tool'}`}
              title={
                <>
                  {before}
                  <em>{italic}</em>
                  {after}
                </>
              }
            >
              <p>{tool.intro}</p>
            </ToolHero>

            <ToolFrame slug={slug} name={tool.name}>
              <Tool />
            </ToolFrame>

            <ToolHowTo steps={tool.howto} />

            <section className="ft-cta no-print" aria-label="Work with Shilika">
              <p>
                Want this done for you? I run PR and growth for AI and Web3 founders.{' '}
                <a href="/contact" data-magnet>
                  Book a free 30-minute teardown →
                </a>
              </p>
            </section>

            <ToolFaq faqs={tool.faqs} />

            <nav className="ft-related no-print" aria-label="Related">
              <div>
                <p className="tool-section-label">Related</p>
                <ul>
                  {tool.related.map((r) => (
                    <li key={r.href}>
                      <a href={r.href}>{r.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="tool-section-label">More {group?.label.toLowerCase()} tools</p>
                <ul>
                  {siblings.map((t) => (
                    <li key={t.slug}>
                      <a href={`/tools/${t.slug}`}>{t.name}</a>
                    </li>
                  ))}
                  <li>
                    <a href="/tools">All free tools</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </main>
      </EditorialShell>
      <EditorialScripts />
    </>
  );
}
