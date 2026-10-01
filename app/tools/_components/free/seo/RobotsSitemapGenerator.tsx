'use client';

import { useMemo, useState } from 'react';
import { CopyButton, DownloadButton, Verdict, useToolResult } from '../kit';
import { SelectField, Tabs, TextArea, TextField } from './ui';
import './seo.css';

type Mode = 'robots' | 'sitemap';
type Use = 'training' | 'search' | 'user';
type Bot = { id: string; owner: string; use: Use; note: string };

const BOTS: Bot[] = [
  { id: 'GPTBot', owner: 'OpenAI', use: 'training', note: 'Collects pages to train OpenAI models.' },
  { id: 'OAI-SearchBot', owner: 'OpenAI', use: 'search', note: 'Indexes pages for ChatGPT search results and citations.' },
  { id: 'ChatGPT-User', owner: 'OpenAI', use: 'user', note: 'Opens a page when a ChatGPT user asks about it.' },
  { id: 'ClaudeBot', owner: 'Anthropic', use: 'training', note: 'Collects pages to train Claude models.' },
  { id: 'Claude-User', owner: 'Anthropic', use: 'user', note: 'Opens a page when a Claude user asks about it.' },
  { id: 'Claude-SearchBot', owner: 'Anthropic', use: 'search', note: 'Indexes pages for Claude search answers.' },
  { id: 'PerplexityBot', owner: 'Perplexity', use: 'search', note: 'Indexes pages for Perplexity answers and citations.' },
  { id: 'Perplexity-User', owner: 'Perplexity', use: 'user', note: 'Opens a page when a Perplexity user asks about it.' },
  { id: 'Google-Extended', owner: 'Google', use: 'training', note: 'Controls Gemini training. Does not affect Google Search or AI Overviews.' },
  { id: 'Applebot-Extended', owner: 'Apple', use: 'training', note: 'Controls Apple AI training. Siri and Spotlight search still work.' },
  { id: 'CCBot', owner: 'Common Crawl', use: 'training', note: 'Open web archive used in many AI training sets.' },
  { id: 'Bytespider', owner: 'ByteDance', use: 'training', note: 'Collects pages for ByteDance models.' },
  { id: 'Meta-ExternalAgent', owner: 'Meta', use: 'training', note: 'Collects pages to train Meta AI models.' },
  { id: 'Amazonbot', owner: 'Amazon', use: 'training', note: 'Crawls for Alexa answers and Amazon AI models.' },
];

const USE_LABEL: Record<Use, string> = { training: 'Training', search: 'Search', user: 'User fetch' };

type BotState = Record<string, boolean>; // true = allowed

const allAllowed: BotState = Object.fromEntries(BOTS.map((b) => [b.id, true]));
const searchOnly: BotState = Object.fromEntries(BOTS.map((b) => [b.id, b.use !== 'training']));
const noneAllowed: BotState = Object.fromEntries(BOTS.map((b) => [b.id, false]));

const FREQS = ['', 'always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'] as const;
type Freq = (typeof FREQS)[number];
const PRIORITIES = ['', '1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1', '0.0'] as const;
type Priority = (typeof PRIORITIES)[number];
const MAX_URLS = 50000;

function xmlEscape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function sameBots(a: BotState, b: BotState) {
  return BOTS.every((x) => a[x.id] === b[x.id]);
}

export default function RobotsSitemapGenerator() {
  const [mode, setMode] = useState<Mode>('robots');

  // robots.txt
  const [policy, setPolicy] = useState<'allow' | 'block'>('allow');
  const [disallow, setDisallow] = useState('/admin/\n/api/');
  const [delay, setDelay] = useState('');
  const [sitemapUrl, setSitemapUrl] = useState('https://example.com/sitemap.xml');
  const [bots, setBots] = useState<BotState>(searchOnly);

  // sitemap.xml
  const [urls, setUrls] = useState(
    'https://example.com/\nhttps://example.com/pricing\nhttps://example.com/blog/benchmarking-agents\nhttps://example.com/pricing\nhttps://example.com/about',
  );
  const [freq, setFreq] = useState<Freq>('weekly');
  const [priority, setPriority] = useState<Priority>('');
  const [lastmod, setLastmod] = useState('2026-09-30');

  const robots = useMemo(() => {
    const paths = disallow
      .split(/\r?\n/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => (p.startsWith('/') || p.startsWith('*') ? p : `/${p}`));
    const d = delay.trim() && Number(delay) > 0 ? `Crawl-delay: ${Number(delay)}` : '';
    const baseRules = policy === 'block' ? ['Disallow: /'] : paths.length ? paths.map((p) => `Disallow: ${p}`) : ['Allow: /'];
    const out: string[] = ['User-agent: *', ...baseRules];
    if (d) out.push(d);

    const allowed = BOTS.filter((b) => bots[b.id]);
    const blocked = BOTS.filter((b) => !bots[b.id]);
    if (allowed.length) {
      // A named group replaces the * group for that bot, so repeat the path rules here.
      out.push('', '# AI crawlers allowed', ...allowed.map((b) => `User-agent: ${b.id}`));
      out.push('Allow: /', ...paths.map((p) => `Disallow: ${p}`));
    }
    if (blocked.length) {
      out.push('', '# AI crawlers blocked', ...blocked.map((b) => `User-agent: ${b.id}`), 'Disallow: /');
    }
    if (sitemapUrl.trim()) out.push('', `Sitemap: ${sitemapUrl.trim()}`);
    return out.join('\n') + '\n';
  }, [policy, disallow, delay, sitemapUrl, bots]);

  const sitemap = useMemo(() => {
    const raw = urls
      .split(/\r?\n/)
      .map((u) => u.trim())
      .filter(Boolean);
    const invalid: string[] = [];
    const seen = new Set<string>();
    const valid: string[] = [];
    let dupes = 0;
    let host = '';
    const otherHost: string[] = [];
    for (const r of raw) {
      let u: URL;
      try {
        u = new URL(r);
        if (u.protocol !== 'https:' && u.protocol !== 'http:') throw new Error('scheme');
      } catch {
        invalid.push(r);
        continue;
      }
      const href = u.toString();
      if (seen.has(href)) {
        dupes++;
        continue;
      }
      seen.add(href);
      if (!host) host = u.host;
      else if (u.host !== host) otherHost.push(href);
      valid.push(href);
    }
    const capped = valid.slice(0, MAX_URLS);
    const extra: string[] = [];
    if (lastmod) extra.push(`    <lastmod>${xmlEscape(lastmod)}</lastmod>`);
    if (freq) extra.push(`    <changefreq>${freq}</changefreq>`);
    if (priority) extra.push(`    <priority>${priority}</priority>`);
    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...capped.map((u) => ['  <url>', `    <loc>${xmlEscape(u)}</loc>`, ...extra, '  </url>'].join('\n')),
      '</urlset>',
      '',
    ].join('\n');
    return { xml, count: capped.length, invalid, dupes, otherHost, host, over: valid.length - capped.length };
  }, [urls, freq, priority, lastmod]);

  const output = mode === 'robots' ? robots : sitemap.count ? sitemap.xml : '';
  useToolResult(output);

  const preset = sameBots(bots, searchOnly) ? 'search' : sameBots(bots, allAllowed) ? 'all' : sameBots(bots, noneAllowed) ? 'none' : '';

  return (
    <div>
      <Tabs
        label="File"
        value={mode}
        onChange={setMode}
        options={[
          { value: 'robots', label: 'robots.txt' },
          { value: 'sitemap', label: 'sitemap.xml' },
        ]}
      />

      {mode === 'robots' ? (
        <div className="ft-grid">
          <div className="ft-card">
            <SelectField
              label="Default policy"
              value={policy}
              onChange={setPolicy}
              options={[
                { value: 'allow', label: 'Allow all crawlers' },
                { value: 'block', label: 'Block all crawlers' },
              ]}
            />
            <TextArea label="Disallow paths (one per line)" value={disallow} rows={3} onChange={setDisallow} />
            <div className="ft-row">
              <TextField
                label="Crawl-delay (seconds)"
                type="number"
                inputMode="numeric"
                value={delay}
                onChange={setDelay}
                hint="Optional. Google ignores it."
              />
              <TextField label="Sitemap URL" type="url" value={sitemapUrl} onChange={setSitemapUrl} />
            </div>

            <p className="ft-label seo-gap">AI crawlers</p>
            <div className="ft-chips" role="group" aria-label="AI crawler presets">
              <button type="button" className="ft-chip" aria-pressed={preset === 'search'} onClick={() => setBots(searchOnly)}>
                Allow AI search, block training
              </button>
              <button type="button" className="ft-chip" aria-pressed={preset === 'all'} onClick={() => setBots(allAllowed)}>
                Allow all AI
              </button>
              <button type="button" className="ft-chip" aria-pressed={preset === 'none'} onClick={() => setBots(noneAllowed)}>
                Block all AI
              </button>
            </div>
            <ul className="seo-bots">
              {BOTS.map((b) => (
                <li key={b.id}>
                  <div>
                    <strong className="mono">{b.id}</strong> <span className="seo-muted">{b.owner}</span>{' '}
                    <span className={`seo-tag is-${b.use}`}>{USE_LABEL[b.use]}</span>
                    <p className="ft-hint">{b.note}</p>
                  </div>
                  <div className="ft-tabs seo-toggle" role="group" aria-label={`${b.id} access`}>
                    <button type="button" aria-pressed={bots[b.id]} onClick={() => setBots((s) => ({ ...s, [b.id]: true }))}>
                      Allow
                    </button>
                    <button type="button" aria-pressed={!bots[b.id]} onClick={() => setBots((s) => ({ ...s, [b.id]: false }))}>
                      Block
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="ft-card seo-sticky">
            <p className="ft-label">robots.txt</p>
            <pre className="ft-output" aria-live="polite">
              {robots}
            </pre>
            <div className="ft-actions">
              <CopyButton text={robots} />
              <DownloadButton filename="robots.txt" content={robots} label="Download robots.txt" />
            </div>
            <p className="ft-hint seo-gap">
              Upload to your site root so it loads at /robots.txt. Blocking search bots removes you from ChatGPT, Claude and Perplexity
              citations.
            </p>
          </div>
        </div>
      ) : (
        <div className="ft-grid">
          <div className="ft-card">
            <TextArea label="URLs (one per line)" value={urls} tall onChange={setUrls} />
            <div className="ft-row-3">
              <SelectField
                label="Changefreq"
                value={freq}
                onChange={setFreq}
                options={FREQS.map((f) => ({ value: f, label: f || 'None' }))}
              />
              <SelectField
                label="Priority"
                value={priority}
                onChange={setPriority}
                options={PRIORITIES.map((p) => ({ value: p, label: p || 'None' }))}
              />
              <TextField label="Lastmod" type="date" value={lastmod} onChange={setLastmod} />
            </div>
            <ul className="ft-checks" aria-live="polite">
              <li>
                <Verdict level={sitemap.count ? 'good' : 'bad'}>{sitemap.count.toLocaleString('en-US')} URLs</Verdict>
                <span>{sitemap.count ? 'Ready to export.' : 'Add at least one full URL.'}</span>
              </li>
              {sitemap.dupes > 0 && (
                <li>
                  <Verdict level="warn">Dupes</Verdict>
                  <span>
                    Removed {sitemap.dupes} duplicate{sitemap.dupes === 1 ? '' : 's'}.
                  </span>
                </li>
              )}
              {sitemap.invalid.length > 0 && (
                <li>
                  <Verdict level="bad">Invalid</Verdict>
                  <span>
                    Skipped {sitemap.invalid.length} line{sitemap.invalid.length === 1 ? '' : 's'}. Use full URLs with https://.
                  </span>
                  <p className="mono">{sitemap.invalid.slice(0, 3).join(', ')}</p>
                </li>
              )}
              {sitemap.otherHost.length > 0 && (
                <li>
                  <Verdict level="warn">Host</Verdict>
                  <span>
                    {sitemap.otherHost.length} URL{sitemap.otherHost.length === 1 ? ' is' : 's are'} not on {sitemap.host}. A sitemap should
                    list one host only.
                  </span>
                </li>
              )}
              {sitemap.over > 0 && (
                <li>
                  <Verdict level="bad">Limit</Verdict>
                  <span>
                    Capped at 50,000 URLs. Split the other {sitemap.over.toLocaleString('en-US')} into a second sitemap.
                  </span>
                </li>
              )}
            </ul>
          </div>
          <div className="ft-card seo-sticky">
            <p className="ft-label">sitemap.xml</p>
            <pre className="ft-output">{sitemap.xml}</pre>
            <div className="ft-actions">
              <CopyButton text={sitemap.count ? sitemap.xml : ''} />
              <DownloadButton
                filename="sitemap.xml"
                content={sitemap.count ? sitemap.xml : ''}
                mime="application/xml;charset=utf-8"
                label="Download sitemap.xml"
              />
            </div>
            <p className="ft-hint seo-gap">Google ignores changefreq and priority. An accurate lastmod matters more.</p>
          </div>
        </div>
      )}
    </div>
  );
}
