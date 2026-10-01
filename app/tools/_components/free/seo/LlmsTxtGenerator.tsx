'use client';

import { useMemo, useRef, useState } from 'react';
import { CopyButton, DownloadButton, useToolResult } from '../kit';
import { TextArea, TextField, normaliseUrl } from './ui';
import './seo.css';

type Link = { id: number; title: string; url: string; note: string };
type Section = { id: number; name: string; links: Link[] };

const INITIAL: Section[] = [
  {
    id: 1,
    name: 'Docs',
    links: [
      { id: 2, title: 'Quickstart', url: '/docs/quickstart', note: 'Install the SDK and run your first evaluation in five minutes' },
      { id: 3, title: 'API reference', url: '/docs/api', note: 'Every endpoint, parameter and error code' },
    ],
  },
  {
    id: 4,
    name: 'Services',
    links: [
      { id: 5, title: 'Pricing', url: '/pricing', note: 'Plans, limits and enterprise options' },
      { id: 6, title: 'Security', url: '/security', note: 'SOC 2 report, data handling and retention' },
    ],
  },
  {
    id: 7,
    name: 'Blog',
    links: [{ id: 8, title: 'How we benchmark LLM agents', url: '/blog/benchmarking-agents', note: 'Method and results from 40 models' }],
  },
];

const INITIAL_OPTIONAL: Link[] = [{ id: 9, title: 'Changelog', url: '/changelog', note: '' }];

function resolve(url: string, base: string): string {
  const u = url.trim();
  if (!u) return '';
  try {
    return new URL(u, normaliseUrl(base) || undefined).toString();
  } catch {
    return u;
  }
}

function linkLines(links: Link[], base: string): string[] {
  return links
    .filter((l) => l.title.trim() && l.url.trim())
    .map((l) => `- [${l.title.trim().replace(/[[\]]/g, '')}](${resolve(l.url, base)})${l.note.trim() ? `: ${l.note.trim()}` : ''}`);
}

function LinkRows({
  links,
  onChange,
  onRemove,
}: {
  links: Link[];
  onChange: (id: number, key: 'title' | 'url' | 'note', v: string) => void;
  onRemove: (id: number) => void;
}) {
  return (
    <>
      {links.map((l) => (
        <div key={l.id} className="seo-link-row">
          <div className="ft-row">
            <TextField label="Title" value={l.title} onChange={(v) => onChange(l.id, 'title', v)} />
            <TextField label="URL" value={l.url} onChange={(v) => onChange(l.id, 'url', v)} />
          </div>
          <TextField label="Note (optional)" value={l.note} onChange={(v) => onChange(l.id, 'note', v)} />
          <button type="button" className="tool-btn tool-btn-small" onClick={() => onRemove(l.id)}>
            Remove link
          </button>
        </div>
      ))}
    </>
  );
}

export default function LlmsTxtGenerator() {
  const nextId = useRef(20);
  const [name, setName] = useState('Northwind AI');
  const [site, setSite] = useState('https://example.com');
  const [summary, setSummary] = useState(
    'Northwind AI makes evaluation tools that help enterprise teams test, compare and monitor large language models before and after launch.',
  );
  const [details, setDetails] = useState('Founded in 2024. Based in San Francisco. Customers include fintech and healthcare teams.');
  const [sections, setSections] = useState<Section[]>(INITIAL);
  const [useOptional, setUseOptional] = useState(true);
  const [optional, setOptional] = useState<Link[]>(INITIAL_OPTIONAL);

  const id = () => nextId.current++;

  const output = useMemo(() => {
    const out: string[] = [`# ${name.trim() || 'Site name'}`, ''];
    if (summary.trim()) out.push(`> ${summary.trim().replace(/\s*\n\s*/g, ' ')}`, '');
    if (details.trim()) out.push(details.trim(), '');
    for (const s of sections) {
      const ls = linkLines(s.links, site);
      if (!s.name.trim() || !ls.length) continue;
      out.push(`## ${s.name.trim()}`, '', ...ls, '');
    }
    if (useOptional) {
      const ls = linkLines(optional, site);
      if (ls.length) out.push('## Optional', '', ...ls, '');
    }
    return out.join('\n').trimEnd() + '\n';
  }, [name, site, summary, details, sections, useOptional, optional]);

  useToolResult(output);

  function patchSection(sid: number, fn: (s: Section) => Section) {
    setSections((all) => all.map((s) => (s.id === sid ? fn(s) : s)));
  }

  return (
    <div className="ft-grid">
      <div className="ft-card">
        <div className="ft-row">
          <TextField label="Site name" value={name} onChange={setName} />
          <TextField label="Site URL" type="url" value={site} onChange={setSite} />
        </div>
        <TextArea label="Summary" value={summary} rows={3} onChange={setSummary} hint="One short paragraph. Becomes the > blockquote." />
        <TextArea label="Details (optional)" value={details} rows={2} onChange={setDetails} />

        <div className="ft-stack">
          {sections.map((s) => (
            <fieldset key={s.id} className="seo-repeat">
              <legend className="ft-label">Section</legend>
              <TextField label="Section name" value={s.name} onChange={(v) => patchSection(s.id, (x) => ({ ...x, name: v }))} />
              <LinkRows
                links={s.links}
                onChange={(lid, key, v) =>
                  patchSection(s.id, (x) => ({ ...x, links: x.links.map((l) => (l.id === lid ? { ...l, [key]: v } : l)) }))
                }
                onRemove={(lid) => patchSection(s.id, (x) => ({ ...x, links: x.links.filter((l) => l.id !== lid) }))}
              />
              <div className="ft-actions">
                <button
                  type="button"
                  className="tool-btn tool-btn-small"
                  onClick={() => patchSection(s.id, (x) => ({ ...x, links: [...x.links, { id: id(), title: '', url: '', note: '' }] }))}
                >
                  Add link
                </button>
                <button
                  type="button"
                  className="tool-btn tool-btn-small"
                  onClick={() => setSections((all) => all.filter((x) => x.id !== s.id))}
                >
                  Remove section
                </button>
              </div>
            </fieldset>
          ))}
          <div>
            <button
              type="button"
              className="tool-btn tool-btn-small"
              onClick={() => setSections((all) => [...all, { id: id(), name: '', links: [{ id: id(), title: '', url: '', note: '' }] }])}
            >
              Add section
            </button>
          </div>

          <label className="ft-check">
            <input type="checkbox" checked={useOptional} onChange={(e) => setUseOptional(e.target.checked)} />
            Include an &quot;Optional&quot; section
          </label>
          {useOptional && (
            <fieldset className="seo-repeat">
              <legend className="ft-label">Optional</legend>
              <p className="ft-hint">Links an AI tool can skip when it needs a shorter context.</p>
              <LinkRows
                links={optional}
                onChange={(lid, key, v) => setOptional((ls) => ls.map((l) => (l.id === lid ? { ...l, [key]: v } : l)))}
                onRemove={(lid) => setOptional((ls) => ls.filter((l) => l.id !== lid))}
              />
              <div className="ft-actions">
                <button
                  type="button"
                  className="tool-btn tool-btn-small"
                  onClick={() => setOptional((ls) => [...ls, { id: id(), title: '', url: '', note: '' }])}
                >
                  Add link
                </button>
              </div>
            </fieldset>
          )}
        </div>
      </div>

      <div className="ft-card">
        <p className="ft-label">llms.txt</p>
        <pre className="ft-output" aria-live="polite">
          {output}
        </pre>
        <div className="ft-actions">
          <CopyButton text={output} />
          <DownloadButton filename="llms.txt" content={output} mime="text/markdown;charset=utf-8" label="Download llms.txt" />
        </div>
        <p className="ft-hint seo-gap">
          Upload it to your site root so it loads at /llms.txt. Put the full text of key pages in /llms-full.txt if you want AI tools to
          read everything in one file.
        </p>
      </div>
    </div>
  );
}
