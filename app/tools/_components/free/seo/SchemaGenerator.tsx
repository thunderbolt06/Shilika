'use client';

import { useMemo, useRef, useState } from 'react';
import { CopyButton, DownloadButton, Verdict, useToolResult } from '../kit';
import { SelectField, Tabs, TextArea, TextField } from './ui';
import './seo.css';

type SchemaType = 'faq' | 'article' | 'person' | 'org';
type ArticleKind = 'Article' | 'BlogPosting' | 'NewsArticle';
type Hint = { level: 'good' | 'warn' | 'bad'; text: string };
type Json = { [k: string]: unknown };

const TYPE_TABS: { value: SchemaType; label: string }[] = [
  { value: 'faq', label: 'FAQ' },
  { value: 'article', label: 'Article' },
  { value: 'person', label: 'Person' },
  { value: 'org', label: 'Organization' },
];

/** Drop empty strings, empty arrays and empty objects, recursively. */
function clean(value: unknown): unknown {
  if (Array.isArray(value)) {
    const arr = value.map(clean).filter((v) => v !== undefined);
    return arr.length ? arr : undefined;
  }
  if (value && typeof value === 'object') {
    const out: Json = {};
    for (const [k, v] of Object.entries(value as Json)) {
      const c = clean(v);
      if (c !== undefined) out[k] = c;
    }
    const keys = Object.keys(out).filter((k) => k !== '@type' && k !== '@context');
    return keys.length ? out : undefined;
  }
  if (typeof value === 'string') return value.trim() ? value.trim() : undefined;
  return value ?? undefined;
}

function lines(s: string): string[] {
  return s
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

function list(s: string): string[] {
  return s
    .split(',')
    .map((l) => l.trim())
    .filter(Boolean);
}

function isUrl(s: string): boolean {
  if (!s.trim()) return true;
  try {
    const u = new URL(s.trim());
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
}

type FaqRow = { id: number; q: string; a: string };

export default function SchemaGenerator() {
  const [type, setType] = useState<SchemaType>('faq');
  const nextId = useRef(3);

  const [faqs, setFaqs] = useState<FaqRow[]>([
    {
      id: 1,
      q: 'How long does a PR campaign take to show results?',
      a: 'Most campaigns land first coverage in 4 to 8 weeks. Search and AI visibility usually build over 3 to 6 months as citations add up.',
    },
    {
      id: 2,
      q: 'Do you work with pre-seed startups?',
      a: 'Yes. Pre-seed teams usually start with founder profiling and two or three targeted stories before a funding announcement.',
    },
  ]);

  const [article, setArticle] = useState({
    kind: 'BlogPosting' as ArticleKind,
    headline: 'How to get cited by ChatGPT in 2026',
    description: 'A practical guide to earning citations in ChatGPT, Perplexity and Google AI Overviews.',
    image: 'https://www.shilikajain.com/assets/ad-display-1200x628-dark.png',
    authorName: 'Shilika Jain',
    authorUrl: 'https://www.shilikajain.com/about',
    publisher: 'Shilika Jain',
    logo: '',
    datePublished: '2026-01-15',
    dateModified: '2026-09-20',
    url: 'https://www.shilikajain.com/playbook/how-to-get-cited-by-chatgpt-2026',
  });

  const [person, setPerson] = useState({
    name: 'Maya Chen',
    jobTitle: 'Founder and CEO',
    employer: 'Northwind AI',
    url: 'https://example.com/about',
    image: '',
    description: 'Maya builds evaluation tools for enterprise AI teams.',
    sameAs: 'https://www.linkedin.com/in/example\nhttps://x.com/example',
    knowsAbout: 'machine learning, AI safety, developer tools',
  });

  const [org, setOrg] = useState({
    name: 'Northwind AI',
    legalName: 'Northwind AI Inc.',
    url: 'https://example.com',
    logo: 'https://example.com/logo.png',
    description: 'Evaluation tools for enterprise AI teams.',
    email: 'hello@example.com',
    phone: '',
    foundingDate: '2024-03-01',
    sameAs: 'https://www.linkedin.com/company/example\nhttps://x.com/example',
    street: '',
    city: '',
    region: '',
    postal: '',
    country: '',
  });

  const setA = (k: keyof typeof article) => (v: string) => setArticle((s) => ({ ...s, [k]: v }));
  const setP = (k: keyof typeof person) => (v: string) => setPerson((s) => ({ ...s, [k]: v }));
  const setO = (k: keyof typeof org) => (v: string) => setOrg((s) => ({ ...s, [k]: v }));

  const { data, hints } = useMemo(() => {
    const h: Hint[] = [];
    let obj: Json = {};
    if (type === 'faq') {
      const rows = faqs.filter((f) => f.q.trim() && f.a.trim());
      obj = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: rows.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      };
      if (!rows.length) h.push({ level: 'bad', text: 'Add at least one question with an answer. FAQPage needs one or more.' });
      else h.push({ level: 'good', text: `${rows.length} question${rows.length === 1 ? '' : 's'} included.` });
      if (faqs.some((f) => (f.q.trim() && !f.a.trim()) || (!f.q.trim() && f.a.trim())))
        h.push({ level: 'warn', text: 'Rows with a question but no answer (or the reverse) are left out.' });
      h.push({ level: 'warn', text: 'The same questions and answers must be visible on the page itself.' });
      h.push({
        level: 'warn',
        text: 'Google shows FAQ rich results mostly for government and health sites since 2023. AI engines still read FAQPage markup.',
      });
    } else if (type === 'article') {
      const a = article;
      obj = {
        '@context': 'https://schema.org',
        '@type': a.kind,
        headline: a.headline,
        description: a.description,
        image: a.image ? [a.image] : undefined,
        author: { '@type': 'Person', name: a.authorName, url: a.authorUrl },
        publisher: {
          '@type': 'Organization',
          name: a.publisher,
          logo: a.logo ? { '@type': 'ImageObject', url: a.logo } : undefined,
        },
        datePublished: a.datePublished,
        dateModified: a.dateModified,
        mainEntityOfPage: a.url ? { '@type': 'WebPage', '@id': a.url } : undefined,
      };
      if (!a.headline.trim()) h.push({ level: 'bad', text: 'Add a headline.' });
      else if (a.headline.length > 110) h.push({ level: 'warn', text: `Headline is ${a.headline.length} characters. Keep it under 110.` });
      else h.push({ level: 'good', text: 'Headline set.' });
      h.push(a.image ? { level: 'good', text: 'Image set.' } : { level: 'warn', text: 'Google recommends an image. Use at least 1200 px wide.' });
      h.push(a.authorName ? { level: 'good', text: 'Author set.' } : { level: 'warn', text: 'Google recommends an author. Add a name and profile URL.' });
      if (a.authorName && !a.authorUrl) h.push({ level: 'warn', text: 'Add an author URL so search engines can tie the article to a real person.' });
      h.push(
        a.datePublished
          ? { level: 'good', text: 'Publish date set.' }
          : { level: 'warn', text: 'Google recommends datePublished.' },
      );
      if (!a.dateModified) h.push({ level: 'warn', text: 'Add dateModified when you update the piece. AI engines favour fresh pages.' });
      if (a.datePublished && a.dateModified && a.dateModified < a.datePublished)
        h.push({ level: 'bad', text: 'dateModified is earlier than datePublished.' });
      if (![a.image, a.authorUrl, a.logo, a.url].every(isUrl)) h.push({ level: 'bad', text: 'One of the URLs is not valid. Use full https:// links.' });
    } else if (type === 'person') {
      const p = person;
      obj = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: p.name,
        jobTitle: p.jobTitle,
        worksFor: p.employer ? { '@type': 'Organization', name: p.employer } : undefined,
        url: p.url,
        image: p.image,
        description: p.description,
        sameAs: lines(p.sameAs),
        knowsAbout: list(p.knowsAbout),
      };
      h.push(p.name ? { level: 'good', text: 'Name set.' } : { level: 'bad', text: 'Add a name.' });
      h.push(
        lines(p.sameAs).length >= 2
          ? { level: 'good', text: 'sameAs links help engines match you to one entity.' }
          : { level: 'warn', text: 'Add at least two sameAs profiles (LinkedIn, X, Crunchbase, Wikipedia).' },
      );
      if (!p.image) h.push({ level: 'warn', text: 'Add a headshot URL.' });
      if (!list(p.knowsAbout).length) h.push({ level: 'warn', text: 'knowsAbout tells AI engines which topics you are an expert on.' });
      if (![p.url, p.image, ...lines(p.sameAs)].every(isUrl)) h.push({ level: 'bad', text: 'One of the URLs is not valid. Use full https:// links.' });
    } else {
      const o = org;
      const hasAddress = [o.street, o.city, o.region, o.postal, o.country].some((x) => x.trim());
      obj = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: o.name,
        legalName: o.legalName,
        url: o.url,
        logo: o.logo,
        description: o.description,
        email: o.email,
        telephone: o.phone,
        foundingDate: o.foundingDate,
        sameAs: lines(o.sameAs),
        address: hasAddress
          ? {
              '@type': 'PostalAddress',
              streetAddress: o.street,
              addressLocality: o.city,
              addressRegion: o.region,
              postalCode: o.postal,
              addressCountry: o.country,
            }
          : undefined,
      };
      h.push(o.name ? { level: 'good', text: 'Name set.' } : { level: 'bad', text: 'Add the organisation name.' });
      h.push(o.url ? { level: 'good', text: 'URL set.' } : { level: 'warn', text: 'Google recommends url.' });
      h.push(
        o.logo
          ? { level: 'good', text: 'Logo set. Use at least 112 x 112 px.' }
          : { level: 'warn', text: 'Google recommends a logo for the knowledge panel.' },
      );
      if (lines(o.sameAs).length < 2) h.push({ level: 'warn', text: 'Add your LinkedIn, X and Crunchbase pages as sameAs.' });
      if (![o.url, o.logo, ...lines(o.sameAs)].every(isUrl)) h.push({ level: 'bad', text: 'One of the URLs is not valid. Use full https:// links.' });
    }
    return { data: (clean(obj) as Json | undefined) ?? { '@context': 'https://schema.org' }, hints: h };
  }, [type, faqs, article, person, org]);

  const json = JSON.stringify(data, null, 2);
  const script = `<script type="application/ld+json">\n${json}\n</script>`;
  useToolResult(script);

  function updateFaq(id: number, key: 'q' | 'a', v: string) {
    setFaqs((rows) => rows.map((r) => (r.id === id ? { ...r, [key]: v } : r)));
  }

  return (
    <div className="ft-grid">
      <div className="ft-card">
        <Tabs label="Schema type" value={type} onChange={setType} options={TYPE_TABS} />

        {type === 'faq' && (
          <div className="ft-stack">
            {faqs.map((f, i) => (
              <fieldset key={f.id} className="seo-repeat">
                <legend className="ft-label">Question {i + 1}</legend>
                <TextField label="Question" value={f.q} onChange={(v) => updateFaq(f.id, 'q', v)} />
                <TextArea label="Answer" value={f.a} rows={3} onChange={(v) => updateFaq(f.id, 'a', v)} />
                <button
                  type="button"
                  className="tool-btn tool-btn-small"
                  onClick={() => setFaqs((rows) => rows.filter((r) => r.id !== f.id))}
                  disabled={faqs.length === 1}
                >
                  Remove
                </button>
              </fieldset>
            ))}
            <div>
              <button
                type="button"
                className="tool-btn tool-btn-small"
                onClick={() => setFaqs((rows) => [...rows, { id: nextId.current++, q: '', a: '' }])}
              >
                Add question
              </button>
            </div>
          </div>
        )}

        {type === 'article' && (
          <div>
            <SelectField
              label="Type"
              value={article.kind}
              onChange={(v) => setArticle((s) => ({ ...s, kind: v }))}
              options={[
                { value: 'Article', label: 'Article' },
                { value: 'BlogPosting', label: 'BlogPosting' },
                { value: 'NewsArticle', label: 'NewsArticle' },
              ]}
            />
            <TextField label="Headline" value={article.headline} onChange={setA('headline')} />
            <TextArea label="Description" value={article.description} rows={2} onChange={setA('description')} />
            <TextField label="Image URL" type="url" value={article.image} onChange={setA('image')} />
            <div className="ft-row">
              <TextField label="Author name" value={article.authorName} onChange={setA('authorName')} />
              <TextField label="Author URL" type="url" value={article.authorUrl} onChange={setA('authorUrl')} />
            </div>
            <div className="ft-row">
              <TextField label="Publisher" value={article.publisher} onChange={setA('publisher')} />
              <TextField label="Logo URL" type="url" value={article.logo} onChange={setA('logo')} />
            </div>
            <div className="ft-row">
              <TextField label="Published" type="date" value={article.datePublished} onChange={setA('datePublished')} />
              <TextField label="Modified" type="date" value={article.dateModified} onChange={setA('dateModified')} />
            </div>
            <TextField label="Page URL" type="url" value={article.url} onChange={setA('url')} />
          </div>
        )}

        {type === 'person' && (
          <div>
            <div className="ft-row">
              <TextField label="Name" value={person.name} onChange={setP('name')} />
              <TextField label="Job title" value={person.jobTitle} onChange={setP('jobTitle')} />
            </div>
            <div className="ft-row">
              <TextField label="Employer" value={person.employer} onChange={setP('employer')} />
              <TextField label="URL" type="url" value={person.url} onChange={setP('url')} />
            </div>
            <TextField label="Image URL" type="url" value={person.image} onChange={setP('image')} />
            <TextArea label="Description" value={person.description} rows={2} onChange={setP('description')} />
            <TextArea label="sameAs (one URL per line)" value={person.sameAs} rows={3} onChange={setP('sameAs')} />
            <TextField label="Knows about (comma list)" value={person.knowsAbout} onChange={setP('knowsAbout')} />
          </div>
        )}

        {type === 'org' && (
          <div>
            <div className="ft-row">
              <TextField label="Name" value={org.name} onChange={setO('name')} />
              <TextField label="Legal name" value={org.legalName} onChange={setO('legalName')} />
            </div>
            <div className="ft-row">
              <TextField label="URL" type="url" value={org.url} onChange={setO('url')} />
              <TextField label="Logo URL" type="url" value={org.logo} onChange={setO('logo')} />
            </div>
            <TextArea label="Description" value={org.description} rows={2} onChange={setO('description')} />
            <div className="ft-row-3">
              <TextField label="Email" type="email" value={org.email} onChange={setO('email')} />
              <TextField label="Phone" type="tel" value={org.phone} onChange={setO('phone')} />
              <TextField label="Founded" type="date" value={org.foundingDate} onChange={setO('foundingDate')} />
            </div>
            <TextArea label="sameAs (one URL per line)" value={org.sameAs} rows={3} onChange={setO('sameAs')} />
            <details className="seo-details">
              <summary>Address (optional)</summary>
              <TextField label="Street" value={org.street} onChange={setO('street')} />
              <div className="ft-row">
                <TextField label="City" value={org.city} onChange={setO('city')} />
                <TextField label="Region" value={org.region} onChange={setO('region')} />
              </div>
              <div className="ft-row">
                <TextField label="Postal code" value={org.postal} onChange={setO('postal')} />
                <TextField label="Country code" value={org.country} placeholder="US" onChange={setO('country')} />
              </div>
            </details>
          </div>
        )}
      </div>

      <div className="ft-stack">
        <div className="ft-card">
          <p className="ft-label">JSON-LD</p>
          <pre className="ft-output" aria-live="polite">
            {script}
          </pre>
          <div className="ft-actions">
            <CopyButton text={script} label="Copy script tag" />
            <CopyButton text={json} label="Copy JSON" />
            <DownloadButton filename="schema.json" content={json} mime="application/ld+json" label="Download .json" />
          </div>
          <div className="ft-actions">
            <a className="tool-btn tool-btn-small" href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer">
              Rich Results Test
            </a>
            <a className="tool-btn tool-btn-small" href="https://validator.schema.org/" target="_blank" rel="noopener noreferrer">
              Schema validator
            </a>
          </div>
          <p className="ft-hint seo-gap">Paste the script tag inside the page&apos;s &lt;head&gt; or at the end of &lt;body&gt;.</p>
        </div>
        <div className="ft-card">
          <p className="ft-label">Checks</p>
          <ul className="ft-checks">
            {hints.map((h, i) => (
              <li key={i}>
                <Verdict level={h.level}>{h.level === 'good' ? 'OK' : h.level === 'warn' ? 'Tip' : 'Fix'}</Verdict>
                <span>{h.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
