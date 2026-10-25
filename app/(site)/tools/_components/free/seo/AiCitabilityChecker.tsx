'use client';

import { useId, useMemo, useRef, useState, type FormEvent } from 'react';
import { CopyButton, Meter, Score, Verdict, useToolResult } from '../kit';
import { scanPage, type PageScanOk } from './scanTypes';
import { normaliseUrl } from './ui';
import './seo.css';

type Level = 'good' | 'warn' | 'bad';
type CatId = 'access' | 'structure' | 'schema' | 'answer' | 'trust';
type Check = { cat: CatId; pts: number; level: Level; label: string; fix: string };

const CATS: { id: CatId; label: string; weight: number }[] = [
  { id: 'access', label: 'Access', weight: 25 },
  { id: 'structure', label: 'Structure', weight: 20 },
  { id: 'schema', label: 'Schema', weight: 20 },
  { id: 'answer', label: 'Answer-readiness', weight: 20 },
  { id: 'trust', label: 'Trust', weight: 15 },
];

const SEARCH_BOTS = ['OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot'];
const ORG_TYPES = ['Organization', 'Corporation', 'LocalBusiness', 'ProfessionalService', 'Person', 'NGO', 'EducationalOrganization'];
const ARTICLE_TYPES = ['Article', 'BlogPosting', 'NewsArticle', 'TechArticle', 'Report', 'ScholarlyArticle'];
const CREDIT: Record<Level, number> = { good: 1, warn: 0.5, bad: 0 };

function wordCount(s: string) {
  return s.trim() ? s.trim().split(/\s+/).length : 0;
}

function evaluate(s: PageScanOk, now: number): Check[] {
  const c: Check[] = [];
  const add = (cat: CatId, pts: number, level: Level, label: string, fix: string) => c.push({ cat, pts, level, label, fix });

  // Access
  add('access', 3, s.https ? 'good' : 'bad', s.https ? 'Served over HTTPS' : 'Not served over HTTPS', 'Install a TLS certificate and redirect http to https.');
  const noindex = /noindex/i.test(s.meta.robots ?? '');
  add('access', 4, noindex ? 'bad' : 'good', noindex ? 'Page is set to noindex' : 'Page is indexable', 'Remove noindex from the meta robots tag.');
  const blocked = Object.entries(s.robots.blocked).filter(([, b]) => b).map(([n]) => n);
  const blockedSearch = blocked.filter((b) => SEARCH_BOTS.includes(b));
  add(
    'access',
    6,
    blockedSearch.length ? 'bad' : blocked.length ? 'warn' : 'good',
    blockedSearch.length
      ? `robots.txt blocks AI search bots: ${blockedSearch.join(', ')}`
      : blocked.length
        ? `robots.txt blocks AI training bots: ${blocked.join(', ')}`
        : 'AI crawlers are allowed in robots.txt',
    blockedSearch.length
      ? 'Allow OAI-SearchBot, ChatGPT-User and PerplexityBot. Blocking them removes you from AI answers.'
      : 'Blocking training bots is a fair choice. Allowing them can help models learn your brand.',
  );
  add(
    'access',
    1,
    s.robots.found && s.robots.sitemap ? 'good' : 'warn',
    s.robots.found ? (s.robots.sitemap ? 'robots.txt lists a sitemap' : 'robots.txt has no Sitemap line') : 'No robots.txt found',
    'Publish /robots.txt with a Sitemap: line pointing at your sitemap.xml.',
  );
  add('access', 2, s.llmsTxt ? 'good' : 'warn', s.llmsTxt ? 'llms.txt found' : 'No llms.txt found', 'Publish /llms.txt with a summary and links to your key pages.');

  // Structure
  const h1 = s.headings.h1.length;
  add('structure', 3, h1 === 1 ? 'good' : h1 > 1 ? 'warn' : 'bad', h1 === 1 ? 'One H1' : h1 > 1 ? `${h1} H1 headings` : 'No H1', 'Use exactly one H1 that states the page topic.');
  const h2 = s.headings.h2.length;
  add('structure', 3, h2 >= 3 ? 'good' : h2 > 0 ? 'warn' : 'bad', `${h2} H2 section${h2 === 1 ? '' : 's'}`, 'Break the page into at least three H2 sections AI can lift as answers.');
  const q = s.content.questionHeadings;
  add('structure', 3, q >= 2 ? 'good' : q === 1 ? 'warn' : 'bad', `${q} question-style heading${q === 1 ? '' : 's'}`, 'Phrase some H2s as the questions buyers ask, like "How much does X cost?".');
  const lt = s.content.lists + s.content.tables;
  add('structure', 2, lt > 0 ? 'good' : 'warn', lt ? `${s.content.lists} lists, ${s.content.tables} tables` : 'No lists or tables', 'Add a bulleted list or comparison table. AI answers quote them often.');
  add('structure', 1, s.lang ? 'good' : 'warn', s.lang ? `Language set (${s.lang})` : 'No lang attribute', 'Add lang="en" (or your language) to the <html> tag.');

  // Schema
  const types = s.jsonLdTypes.filter((t) => t !== '(invalid JSON-LD)');
  const invalid = s.jsonLdTypes.includes('(invalid JSON-LD)');
  add('schema', 3, types.length ? 'good' : 'bad', types.length ? `JSON-LD found: ${types.slice(0, 6).join(', ')}` : 'No JSON-LD structured data', 'Add JSON-LD schema. Start with Organization and Article.');
  if (invalid) add('schema', 2, 'bad', 'A JSON-LD block does not parse', 'Fix the broken JSON-LD. Test it in the Rich Results Test.');
  const hasOrg = types.some((t) => ORG_TYPES.includes(t));
  add('schema', 3, hasOrg ? 'good' : 'bad', hasOrg ? 'Organization or Person schema' : 'No Organization or Person schema', 'Add Organization schema with logo and sameAs links to your profiles.');
  const hasArticle = types.some((t) => ARTICLE_TYPES.includes(t));
  add('schema', 2, hasArticle ? 'good' : 'warn', hasArticle ? 'Article schema' : 'No Article or BlogPosting schema', 'On articles, add Article schema with author and dates.');
  const hasFaq = types.includes('FAQPage');
  add('schema', 2, hasFaq ? 'good' : 'warn', hasFaq ? 'FAQPage schema' : 'No FAQPage schema', 'Add an FAQ block with FAQPage schema that matches the visible Q&A.');

  // Answer-readiness
  const fp = wordCount(s.content.firstParagraph);
  add(
    'answer',
    3,
    fp >= 30 && fp <= 80 ? 'good' : fp > 0 ? 'warn' : 'bad',
    fp ? `First paragraph is ${fp} words` : 'No clear opening paragraph',
    'Open with a direct 30 to 80 word answer to the page question.',
  );
  const w = s.content.words;
  add('answer', 3, w >= 600 ? 'good' : w >= 300 ? 'warn' : 'bad', `${w.toLocaleString('en-US')} words of main content`, 'Expand to 600+ words with specifics: numbers, examples, steps.');
  const md = (s.meta.description ?? '').trim().length;
  add(
    'answer',
    2,
    md >= 70 && md <= 160 ? 'good' : md ? 'warn' : 'bad',
    md ? `Meta description is ${md} characters` : 'No meta description',
    'Write a 70 to 160 character meta description that answers the query.',
  );
  add('answer', 2, s.signals.author ? 'good' : 'warn', s.signals.author ? 'Author found' : 'No author signal', 'Name a real author with a bio page, in the byline and in schema.');
  const mod = Date.parse(s.signals.dateModified ?? s.signals.datePublished ?? '');
  const ageDays = Number.isFinite(mod) ? (now - mod) / 86_400_000 : NaN;
  add(
    'answer',
    2,
    Number.isFinite(ageDays) ? (ageDays <= 365 ? 'good' : 'warn') : 'bad',
    Number.isFinite(ageDays) ? (ageDays <= 365 ? 'Updated in the last 12 months' : `Last dated ${Math.round(ageDays / 30)} months ago`) : 'No published or modified date',
    'Show datePublished and dateModified, and refresh key pages at least yearly.',
  );

  // Trust
  const ext = s.content.externalLinks;
  add('trust', 3, ext >= 2 ? 'good' : ext === 1 ? 'warn' : 'bad', `${ext} external link${ext === 1 ? '' : 's'}`, 'Cite at least two credible sources: data, studies or press.');
  const imgs = s.content.images;
  const ratio = imgs ? s.content.imagesWithAlt / imgs : 1;
  add(
    'trust',
    2,
    ratio >= 0.9 ? 'good' : ratio >= 0.5 ? 'warn' : 'bad',
    imgs ? `${s.content.imagesWithAlt} of ${imgs} images have alt text` : 'No images to check',
    'Add descriptive alt text to every content image.',
  );
  add('trust', 2, s.meta.canonical ? 'good' : 'warn', s.meta.canonical ? 'Canonical URL set' : 'No canonical URL', 'Add <link rel="canonical"> pointing at the preferred URL.');

  return c;
}

function score(checks: Check[]) {
  const cats = CATS.map((cat) => {
    const cs = checks.filter((c) => c.cat === cat.id);
    const max = cs.reduce((a, c) => a + c.pts, 0);
    const got = cs.reduce((a, c) => a + c.pts * CREDIT[c.level], 0);
    return { ...cat, value: max ? Math.round((got / max) * 100) : 0, max };
  });
  const overall = cats.reduce((a, c) => a + (c.value * c.weight) / 100, 0);
  const top = checks
    .filter((c) => c.level !== 'good')
    .map((c) => {
      const cat = cats.find((x) => x.id === c.cat)!;
      return { ...c, lost: (c.pts * (1 - CREDIT[c.level]) * cat.weight) / (cat.max || 1) };
    })
    .sort((a, b) => b.lost - a.lost)
    .slice(0, 3);
  return { cats, overall: Math.round(overall), top };
}

export default function AiCitabilityChecker() {
  const urlId = useId();
  const [url, setUrl] = useState('https://www.shilikajain.com');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [scan, setScan] = useState<{ data: PageScanOk; at: number } | null>(null);
  const ctrl = useRef<AbortController | null>(null);

  async function run(e?: FormEvent) {
    e?.preventDefault();
    if (!url.trim()) return;
    ctrl.current?.abort();
    const ac = new AbortController();
    ctrl.current = ac;
    setLoading(true);
    setError('');
    const res = await scanPage(normaliseUrl(url), ac.signal);
    if (ac.signal.aborted) return;
    setLoading(false);
    if (!res.ok) {
      setError(res.error);
      setScan(null);
      return;
    }
    setScan({ data: res, at: Date.now() });
  }

  const result = useMemo(() => {
    if (!scan) return null;
    const checks = evaluate(scan.data, scan.at);
    return { checks, ...score(checks) };
  }, [scan]);

  const text = result && scan
    ? [
        `AI citability score for ${scan.data.finalUrl}: ${result.overall}/100`,
        ...result.cats.map((c) => `${c.label}: ${c.value}/100`),
        '',
        'Top fixes:',
        ...result.top.map((t, i) => `${i + 1}. ${t.fix}`),
        '',
        'All checks:',
        ...result.checks.map((c) => `[${c.level === 'good' ? 'pass' : c.level === 'warn' ? 'warn' : 'fail'}] ${c.label}${c.level === 'good' ? '' : `. Fix: ${c.fix}`}`),
      ].join('\n')
    : '';
  useToolResult(text);

  const botRows = scan ? Object.entries(scan.data.robots.blocked) : [];

  return (
    <div className="ft-stack">
      <form className="ft-card seo-fetch" onSubmit={run}>
        <div className="ft-field">
          <label htmlFor={urlId}>Page URL</label>
          <input id={urlId} type="url" inputMode="url" value={url} onChange={(e) => setUrl(e.target.value)} spellCheck={false} />
        </div>
        <button type="submit" className="tool-btn tool-btn-primary" disabled={loading || !url.trim()}>
          {loading ? 'Checking' : 'Check'}
        </button>
        <p className="ft-hint seo-fetch-msg">Scans one page plus the site&apos;s robots.txt and llms.txt. Check your key pages one by one.</p>
      </form>

      <div aria-live="polite">
        {loading ? (
          <div className="ft-card">
            <p className="ft-empty">Fetching the page, robots.txt and llms.txt. This takes a few seconds.</p>
          </div>
        ) : error ? (
          <div className="ft-card">
            <p className="seo-error">{error}</p>
            <p className="ft-hint">Check the URL is public and loads in a browser, then try again.</p>
          </div>
        ) : !result || !scan ? (
          <div className="ft-card">
            <p className="ft-empty">Enter a URL and press Check to see how ready the page is for ChatGPT, Perplexity and Google AI Overviews.</p>
          </div>
        ) : (
          <div className="ft-grid">
            <div className="ft-stack">
              <div className="ft-card">
                <Score value={result.overall} label="AI citability" />
                <p className="ft-hint seo-break">{scan.data.finalUrl}</p>
                <div className="ft-meters seo-gap">
                  {result.cats.map((c) => (
                    <Meter key={c.id} mode="score" value={c.value} max={100} label={`${c.label} (${c.weight}%)`} />
                  ))}
                </div>
              </div>
              <div className="ft-card">
                <p className="ft-label">Top 3 fixes</p>
                {result.top.length ? (
                  <ol className="seo-top">
                    {result.top.map((t) => (
                      <li key={t.label}>{t.fix}</li>
                    ))}
                  </ol>
                ) : (
                  <p className="ft-empty">Nothing urgent. This page is in good shape.</p>
                )}
                <div className="ft-actions">
                  <CopyButton text={text} label="Copy report" />
                </div>
              </div>
              <div className="ft-card">
                <p className="ft-label">AI crawlers in robots.txt</p>
                {scan.data.robots.found ? (
                  <ul className="seo-botstatus">
                    {botRows.map(([bot, isBlocked]) => (
                      <li key={bot}>
                        <span className="mono">{bot}</span>
                        <Verdict level={isBlocked ? (SEARCH_BOTS.includes(bot) ? 'bad' : 'warn') : 'good'}>{isBlocked ? 'Blocked' : 'Allowed'}</Verdict>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="ft-empty">No robots.txt found, so every crawler is allowed by default.</p>
                )}
              </div>
            </div>

            <div className="ft-card">
              {CATS.map((cat) => (
                <div key={cat.id} className="seo-cat">
                  <p className="ft-label">{cat.label}</p>
                  <ul className="ft-checks">
                    {result.checks
                      .filter((c) => c.cat === cat.id)
                      .map((c) => (
                        <li key={c.label}>
                          <Verdict level={c.level}>{c.level === 'good' ? 'Pass' : c.level === 'warn' ? 'Warn' : 'Fail'}</Verdict>
                          <span>{c.label}</span>
                          {c.level !== 'good' && <p>{c.fix}</p>}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
