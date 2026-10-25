'use client';

/* eslint-disable @next/next/no-img-element */

import { useId, useMemo, useState, type FormEvent } from 'react';
import { CopyButton, Verdict, useToolResult } from '../kit';
import { scanPage } from './scanTypes';
import { SelectField, TextArea, TextField, hostOf, normaliseUrl } from './ui';
import './seo.css';

type Card = 'summary_large_image' | 'summary';
type Fields = { title: string; description: string; image: string; siteName: string; url: string; card: Card; twitterSite: string };

const SAMPLE: Fields = {
  title: 'Shilika Jain | Fractional PR for AI and Web3 founders',
  description: 'PR, founder profiling and AI search visibility for AI and Web3 startups. Coverage in the outlets your buyers and investors read.',
  image: 'https://www.shilikajain.com/assets/ad-display-1200x628-dark.png',
  siteName: 'Shilika Jain',
  url: 'https://www.shilikajain.com',
  card: 'summary_large_image',
  twitterSite: '',
};

function attr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function Img({ src, className, alt }: { src: string; className: string; alt: string }) {
  const [failed, setFailed] = useState('');
  if (!src || failed === src) {
    return (
      <div className={`${className} seo-img-fallback`} role="img" aria-label="No image">
        {src ? 'Image failed to load' : 'No image'}
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} loading="lazy" referrerPolicy="no-referrer" onError={() => setFailed(src)} />;
}

export default function OgPreview() {
  const urlId = useId();
  const [target, setTarget] = useState('https://www.shilikajain.com');
  const [f, setF] = useState<Fields>(SAMPLE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetched, setFetched] = useState('');

  const set = (k: keyof Fields) => (v: string) => setF((s) => ({ ...s, [k]: v }));

  async function fetchTags(e?: FormEvent) {
    e?.preventDefault();
    if (!target.trim()) return;
    setLoading(true);
    setError('');
    const res = await scanPage(normaliseUrl(target));
    setLoading(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    const { og, twitter, title, description } = res.meta;
    let image = og.image ?? twitter.image ?? '';
    try {
      if (image) image = new URL(image, res.finalUrl).toString();
    } catch {
      // keep as is
    }
    setF({
      title: og.title ?? twitter.title ?? title ?? '',
      description: og.description ?? twitter.description ?? description ?? '',
      image,
      siteName: og.siteName ?? '',
      url: og.url ?? res.finalUrl,
      card: twitter.card === 'summary' ? 'summary' : 'summary_large_image',
      twitterSite: twitter.site ?? '',
    });
    const missing: string[] = [];
    if (!og.title) missing.push('og:title');
    if (!og.description) missing.push('og:description');
    if (!og.image) missing.push('og:image');
    if (!twitter.card) missing.push('twitter:card');
    setFetched(missing.length ? `Fetched. Missing on the page: ${missing.join(', ')}.` : 'Fetched. All core tags found.');
  }

  const domain = hostOf(f.url) || 'example.com';

  const warnings = useMemo(() => {
    const w: { level: 'good' | 'warn' | 'bad'; text: string }[] = [];
    const t = f.title.trim().length;
    const d = f.description.trim().length;
    if (!f.image.trim()) w.push({ level: 'bad', text: 'Missing og:image. Most platforms show a bare link without it. Use 1200 x 630 px.' });
    else if (!/^https:\/\//i.test(f.image.trim())) w.push({ level: 'warn', text: 'Image URL is not https. Some platforms will not load it.' });
    if (!t) w.push({ level: 'bad', text: 'Missing title.' });
    else if (t > 70) w.push({ level: 'bad', text: `Title is ${t} characters. X and LinkedIn cut it after about 70.` });
    else if (t > 60) w.push({ level: 'warn', text: `Title is ${t} characters. Aim for 60 or fewer.` });
    if (!d) w.push({ level: 'warn', text: 'Missing description.' });
    else if (d > 200) w.push({ level: 'bad', text: `Description is ${d} characters. Keep it under 200.` });
    else if (d > 160) w.push({ level: 'warn', text: `Description is ${d} characters. Aim for 160 or fewer.` });
    if (!f.card) w.push({ level: 'warn', text: 'Missing twitter:card.' });
    if (!w.length) w.push({ level: 'good', text: 'Looks good on every platform.' });
    return w;
  }, [f]);

  const tags = useMemo(() => {
    const out: string[] = [];
    const add = (prop: string, val: string, key: 'property' | 'name' = 'property') => {
      if (val.trim()) out.push(`<meta ${key}="${prop}" content="${attr(val.trim())}" />`);
    };
    add('og:type', 'website');
    add('og:title', f.title);
    add('og:description', f.description);
    add('og:image', f.image);
    add('og:url', f.url);
    add('og:site_name', f.siteName);
    add('twitter:card', f.card, 'name');
    add('twitter:title', f.title, 'name');
    add('twitter:description', f.description, 'name');
    add('twitter:image', f.image, 'name');
    add('twitter:site', f.twitterSite, 'name');
    return out.join('\n');
  }, [f]);

  useToolResult(
    tags ? `${tags}\n\nChecks:\n${warnings.map((w) => `- ${w.text}`).join('\n')}` : '',
  );

  const title = f.title.trim() || 'Untitled page';
  const desc = f.description.trim();

  return (
    <div className="ft-stack">
      <form className="ft-card seo-fetch" onSubmit={fetchTags}>
        <div className="ft-field">
          <label htmlFor={urlId}>Page URL</label>
          <input id={urlId} type="url" inputMode="url" value={target} onChange={(e) => setTarget(e.target.value)} spellCheck={false} />
        </div>
        <button type="submit" className="tool-btn tool-btn-primary" disabled={loading || !target.trim()}>
          {loading ? 'Fetching' : 'Fetch'}
        </button>
        <p className="ft-hint seo-fetch-msg" aria-live="polite">
          {error ? <span className="seo-error">{error}</span> : fetched || 'Fetch a live page, or edit the fields below by hand.'}
        </p>
      </form>

      <div className="ft-grid">
        <div className="ft-card">
          <TextField label={`Title (${f.title.length})`} value={f.title} onChange={set('title')} />
          <TextArea label={`Description (${f.description.length})`} value={f.description} rows={3} onChange={set('description')} />
          <TextField label="Image URL" type="url" value={f.image} onChange={set('image')} />
          <div className="ft-row">
            <TextField label="Site name" value={f.siteName} onChange={set('siteName')} />
            <TextField label="Page URL" type="url" value={f.url} onChange={set('url')} />
          </div>
          <div className="ft-row">
            <SelectField
              label="Twitter card"
              value={f.card}
              onChange={(v) => setF((s) => ({ ...s, card: v }))}
              options={[
                { value: 'summary_large_image', label: 'Large image' },
                { value: 'summary', label: 'Summary' },
              ]}
            />
            <TextField label="X handle" value={f.twitterSite} placeholder="@yourbrand" onChange={set('twitterSite')} />
          </div>
          <ul className="ft-checks" aria-live="polite">
            {warnings.map((w, i) => (
              <li key={i}>
                <Verdict level={w.level}>{w.level === 'good' ? 'OK' : w.level === 'warn' ? 'Check' : 'Fix'}</Verdict>
                <span>{w.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="ft-stack">
          <section className="ft-card" aria-label="Facebook and LinkedIn preview">
            <p className="ft-label">Facebook and LinkedIn</p>
            <div className="seo-og-fb">
              <Img src={f.image} className="seo-og-img-wide" alt="" />
              <div className="seo-og-fb-body">
                <span className="seo-og-domain">{domain.toUpperCase()}</span>
                <strong className="seo-clamp-2">{title}</strong>
                {desc && <span className="seo-clamp-1 seo-muted">{desc}</span>}
              </div>
            </div>
          </section>

          <section className="ft-card" aria-label="X preview">
            <p className="ft-label">X ({f.card === 'summary' ? 'summary' : 'large image'})</p>
            {f.card === 'summary_large_image' ? (
              <div className="seo-og-x">
                <div className="seo-og-x-media">
                  <Img src={f.image} className="seo-og-img-wide" alt="" />
                  <span className="seo-og-x-title">{title}</span>
                </div>
                <span className="seo-og-x-from">From {domain}</span>
              </div>
            ) : (
              <div className="seo-og-x-small">
                <Img src={f.image} className="seo-og-img-sq" alt="" />
                <div>
                  <span className="seo-muted">{domain}</span>
                  <strong className="seo-clamp-1">{title}</strong>
                  {desc && <span className="seo-clamp-2 seo-muted">{desc}</span>}
                </div>
              </div>
            )}
          </section>

          <section className="ft-card" aria-label="Slack preview">
            <p className="ft-label">Slack</p>
            <div className="seo-og-slack">
              <strong>{f.siteName.trim() || domain}</strong>
              <span className="seo-og-slack-title">{title}</span>
              {desc && <span className="seo-clamp-3">{desc}</span>}
              {f.image.trim() && <Img src={f.image} className="seo-og-img-slack" alt="" />}
            </div>
          </section>

          <section className="ft-card" aria-label="WhatsApp and iMessage preview">
            <p className="ft-label">WhatsApp and iMessage</p>
            <div className="seo-og-chat">
              <Img src={f.image} className="seo-og-img-sq" alt="" />
              <div>
                <strong className="seo-clamp-2">{title}</strong>
                {desc && <span className="seo-clamp-1 seo-muted">{desc}</span>}
                <span className="seo-muted">{domain}</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="ft-card">
        <p className="ft-label">Meta tags</p>
        <pre className="ft-output">{tags}</pre>
        <div className="ft-actions">
          <CopyButton text={tags} label="Copy tags" />
        </div>
      </div>
    </div>
  );
}
