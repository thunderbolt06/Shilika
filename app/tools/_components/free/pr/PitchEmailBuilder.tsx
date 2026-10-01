'use client';

import { useMemo, useState } from 'react';
import { CopyButton, Verdict, useToolResult } from '../kit';
import { AreaField, TextField, bare, countWords, joinList, safeUrl, sentence } from './shared';
import './pr.css';

type Offer = 'exclusive' | 'briefing' | 'interview' | 'data' | 'comment';
type VariantId = 'exclusive' | 'data' | 'founder';

const OFFERS: { id: Offer; label: string }[] = [
  { id: 'exclusive', label: 'Exclusive' },
  { id: 'briefing', label: 'Embargoed briefing' },
  { id: 'interview', label: 'Founder interview' },
  { id: 'data', label: 'Data' },
  { id: 'comment', label: 'Comment' },
];

const VARIANTS: { id: VariantId; label: string }[] = [
  { id: 'exclusive', label: 'Exclusive offer' },
  { id: 'data', label: 'Data-led' },
  { id: 'founder', label: 'Founder story' },
];

const TIPS: { ok: boolean; text: string }[] = [
  { ok: true, text: 'Name their recent story so they know this is not a blast.' },
  { ok: true, text: 'Make one clear ask they can answer with yes or no.' },
  { ok: false, text: 'No attachments. Link to a press kit instead.' },
  { ok: false, text: 'Skip "Hope you are well" and get to the news in line one.' },
  { ok: false, text: 'Do not follow up more than once, and never call to check.' },
];

type Email = { subjects: string[]; body: string; signature: string };

export default function PitchEmailBuilder() {
  const [first, setFirst] = useState('Maya');
  const [outlet, setOutlet] = useState('TechPulse');
  const [article, setArticle] = useState('Why most AI agents never make it past the pilot');
  const [beat, setBeat] = useState('enterprise AI');
  const [short, setShort] = useState('an AI agent that closes IT tickets');
  const [hook, setHook] = useState(
    'Northwind AI is launching Relay, an AI agent that closes tier-one IT tickets inside Slack with no human handoff',
  );
  const [whyNow, setWhyNow] = useState(
    'IT budgets for 2027 are flat while ticket volumes keep climbing, so teams are being told to automate before they hire',
  );
  const [proof, setProof] = useState(
    'In a 90-day pilot across 14 companies, Relay closed 62% of tickets on its own and cut resolution time from 9 hours to 4 minutes',
  );
  const [offers, setOffers] = useState<Offer[]>(['exclusive', 'interview']);
  const [embargo, setEmbargo] = useState('Tuesday, October 13 at 9am ET');
  const [spokes, setSpokes] = useState('Dana Okafor');
  const [spokesTitle, setSpokesTitle] = useState('CEO');
  const [name, setName] = useState('Priya Raman');
  const [title, setTitle] = useState('Head of Communications');
  const [company, setCompany] = useState('Northwind AI');
  const [link, setLink] = useState('https://northwind.example/press');
  const [tab, setTab] = useState<VariantId>('exclusive');

  function toggleOffer(id: Offer) {
    setOffers((prev) => (prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]));
  }

  const emails = useMemo(() => {
    const F = first.trim() || 'there';
    const O = outlet.trim() || 'your outlet';
    const B = beat.trim() || 'your beat';
    const sFirst = spokes.trim().split(/\s+/)[0] || 'our founder';
    const sFull = spokes.trim() || 'Our founder';
    const C = company.trim() || 'our company';
    const S = bare(short) || 'our news';
    const hookS = sentence(hook);
    const proofS = sentence(proof);
    const whyS = sentence(whyNow);
    const emb = embargo.trim();
    const embClause = emb ? ` under embargo until ${emb}` : '';
    const art = bare(article).replace(/^["“]|["”]$/g, '');

    const offerText: Record<Offer, string> = {
      exclusive: 'the exclusive',
      briefing: 'an embargoed briefing',
      interview: `a 20-minute interview with ${sFirst}`,
      data: 'the full dataset',
      comment: `comment from ${sFirst} for related stories`,
    };
    const offerList = (skip: Offer[], lead?: Offer) => {
      const xs = offers.filter((o) => !skip.includes(o));
      if (lead && !xs.includes(lead)) xs.unshift(lead);
      return joinList(xs.map((o) => offerText[o]));
    };

    const url = safeUrl(link);
    const signature = [name.trim(), [title.trim(), C].filter(Boolean).join(', '), url].filter(Boolean).join('\n');

    // 1. Exclusive offer
    const exPersonal = art
      ? `Your piece "${art}" is the reason I am writing to you first.`
      : `You cover ${B}, so I wanted you to see this before anyone else.`;
    const exExtras = offerList(['exclusive', 'briefing']);
    const exclusive: Email = {
      subjects: [
        `Exclusive for ${O}: ${S}`,
        `${F}, first look at ${S}?`,
        emb ? `Embargoed exclusive: ${S} (${C})` : `Exclusive: ${S} from ${C}`,
      ],
      body: [
        `Hi ${F},`,
        exPersonal,
        `${hookS} ${proofS}`,
        whyS,
        `I'd like to offer ${O} the exclusive${embClause}${exExtras ? `, plus ${exExtras}` : ''}. Is this one for you?`,
      ]
        .filter((l) => l.trim())
        .join('\n\n'),
      signature,
    };

    // 2. Data-led
    const dataPersonal = art
      ? `You wrote "${art}" recently, so this number may be useful.`
      : `A number for your ${B} coverage.`;
    const dataExtras = offerList(['data']);
    const data: Email = {
      subjects: [
        `New data: ${S}`,
        `${F}, a number for your next ${B} story`,
        `The numbers behind ${S}`,
      ],
      body: [
        `Hi ${F},`,
        proofS,
        `${dataPersonal} ${hookS}`,
        whyS,
        `I can share the full dataset and how we measured it${embClause}.${dataExtras ? ` Happy to offer ${dataExtras} too.` : ''} Want me to send it over?`,
      ]
        .filter((l) => l.trim())
        .join('\n\n'),
      signature,
    };

    // 3. Founder story or comment
    const fPersonal = art
      ? `Your piece "${art}" raised a question ${sFirst} gets asked every week.`
      : `You cover ${B}, and ${sFirst} has a view worth hearing.`;
    const fAsk = offers.includes('comment') && !offers.includes('interview')
      ? `${sFirst} is available for comment on ${B} stories you are working on`
      : `${sFirst} is free for a 20-minute interview${emb ? ` ahead of the news on ${emb}` : ' this week or next'}${offers.includes('comment') ? ', or for comment on other stories' : ''}`;
    const founder: Email = {
      subjects: [
        `${sFirst} from ${C} on ${B}`,
        `Interview: ${sFull}, ${spokesTitle.trim() || 'founder'} at ${C}`,
        `${F}, a founder view on ${S}`,
      ],
      body: [
        `Hi ${F},`,
        `${fPersonal} ${whyS}`,
        `${sFull}${spokesTitle.trim() ? `, ${spokesTitle.trim()} of ${C},` : ''} sees it up close. ${hookS} ${proofS}`,
        `${fAsk}. Worth a conversation?`,
      ]
        .filter((l) => l.trim())
        .join('\n\n'),
      signature,
    };

    return { exclusive, data, founder } as Record<VariantId, Email>;
  }, [article, beat, company, embargo, first, hook, link, name, offers, outlet, proof, short, spokes, spokesTitle, title, whyNow]);

  const active = emails[tab];
  const bodyWords = countWords(active.body);
  const fullEmail = `Subject: ${active.subjects[0]}\n\n${active.body}\n\n${active.signature}`;

  const followUp = useMemo(() => {
    const F = first.trim() || 'there';
    const emb = embargo.trim();
    return [
      `Subject: Re: ${active.subjects[0]}`,
      '',
      `Hi ${F},`,
      '',
      `Bumping this in case it got buried. Quick recap: ${sentence(hook)} ${sentence(proof)}`,
      '',
      `${emb ? `The embargo lifts ${emb}, so there is still time. ` : ''}If it is not a fit, a quick no is helpful too, and I will not chase again.`,
      '',
      name.trim(),
    ].join('\n');
  }, [active.subjects, embargo, first, hook, name, proof]);

  const allText = useMemo(
    () =>
      VARIANTS.map((v) => {
        const e = emails[v.id];
        return `${v.label.toUpperCase()}\nSubject options:\n${e.subjects.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n${e.body}\n\n${e.signature}`;
      }).join('\n\n\n') + `\n\n\nFOLLOW-UP (send 3 to 4 days later)\n${followUp}`,
    [emails, followUp],
  );

  useToolResult(allText);

  return (
    <div className="ft-grid ft-grid-wide">
      <div className="ft-card no-print">
        <p className="ft-label">The journalist</p>
        <div className="ft-row">
          <TextField label="First name" value={first} onChange={setFirst} />
          <TextField label="Outlet" value={outlet} onChange={setOutlet} />
        </div>
        <TextField label="Their recent article" value={article} onChange={setArticle} placeholder="Optional, for the opening line" />
        <TextField label="Beat" value={beat} onChange={setBeat} />

        <p className="ft-label pr-section-gap">Your story</p>
        <AreaField label="News hook" value={hook} onChange={setHook} rows={3} />
        <TextField label="Short version" value={short} onChange={setShort} hint="Five or six words, for subject lines." />
        <AreaField label="Why now" value={whyNow} onChange={setWhyNow} rows={3} />
        <AreaField label="Key data point or proof" value={proof} onChange={setProof} rows={3} />
        <div className="ft-field" role="group" aria-label="What you can offer">
          <span>What you can offer</span>
          <div className="ft-chips">
            {OFFERS.map((o) => (
              <button
                key={o.id}
                type="button"
                className="ft-chip"
                aria-pressed={offers.includes(o.id)}
                onClick={() => toggleOffer(o.id)}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
        <TextField label="Embargo" value={embargo} onChange={setEmbargo} placeholder="Optional, e.g. Tuesday at 9am ET" />
        <div className="ft-row">
          <TextField label="Spokesperson" value={spokes} onChange={setSpokes} />
          <TextField label="Their title" value={spokesTitle} onChange={setSpokesTitle} />
        </div>

        <p className="ft-label pr-section-gap">You</p>
        <div className="ft-row">
          <TextField label="Your name" value={name} onChange={setName} />
          <TextField label="Your title" value={title} onChange={setTitle} />
        </div>
        <TextField label="Company" value={company} onChange={setCompany} />
        <TextField label="Press kit link" type="url" value={link} onChange={setLink} />
      </div>

      <div className="ft-stack">
        <div className="ft-card">
          <div className="ft-tabs" role="group" aria-label="Pitch angle">
            {VARIANTS.map((v) => (
              <button key={v.id} type="button" aria-pressed={tab === v.id} onClick={() => setTab(v.id)}>
                {v.label}
              </button>
            ))}
          </div>

          <p className="ft-label">Subject lines</p>
          <ol className="pr-subjects">
            {active.subjects.map((s) => (
              <li key={s}>
                {s}
                <CopyButton text={s} />
              </li>
            ))}
          </ol>

          <div className="pr-head">
            <p className="ft-label">Email</p>
            <Verdict level={bodyWords > 150 ? 'bad' : bodyWords > 130 ? 'warn' : 'good'}>
              {bodyWords} / 150 words
            </Verdict>
          </div>
          <pre className="ft-prose" aria-live="polite" style={{ margin: 0 }}>
            {active.body}
            {'\n\n'}
            {active.signature}
          </pre>
          {bodyWords > 150 ? (
            <p className="ft-hint" style={{ marginTop: 8 }}>
              Over 150 words. Trim the why-now line or the proof point.
            </p>
          ) : null}
          <div className="ft-actions">
            <CopyButton text={`${active.body}\n\n${active.signature}`} label="Copy email" className="tool-btn tool-btn-primary" />
            <CopyButton text={fullEmail} label="Copy with subject" />
            <CopyButton text={allText} label="Copy all angles" />
          </div>
        </div>

        <div className="ft-card">
          <p className="ft-label">Follow-up (send 3 to 4 days later)</p>
          <pre className="ft-prose" style={{ margin: 0 }}>
            {followUp}
          </pre>
          <div className="ft-actions">
            <CopyButton text={followUp} label="Copy follow-up" />
          </div>
        </div>

        <div className="ft-card">
          <p className="ft-label">Before you hit send</p>
          <ul className="pr-tips">
            {TIPS.map((t) => (
              <li key={t.text}>
                <Verdict level={t.ok ? 'good' : 'bad'}>{t.ok ? 'Do' : "Don't"}</Verdict>
                <span>{t.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
