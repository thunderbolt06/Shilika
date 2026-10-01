'use client';

import { useMemo, useState } from 'react';
import { CopyButton, Verdict, useToolResult } from '../kit';
import { AreaField, SelectField, TextField, bare, countWords, joinList, lines, lowerFirst, sentence, upperFirst } from './shared';
import './pr.css';

type Pronoun = 'she' | 'he' | 'they' | 'name';
type Tone = 'authoritative' | 'warm' | 'bold';
type Use = 'speaker' | 'podcast' | 'website' | 'linkedin' | 'press' | 'conference';

const PRONOUNS: { value: Pronoun; label: string }[] = [
  { value: 'she', label: 'She / her' },
  { value: 'he', label: 'He / him' },
  { value: 'they', label: 'They / them' },
  { value: 'name', label: 'Use name only' },
];
const TONES: { value: Tone; label: string }[] = [
  { value: 'authoritative', label: 'Authoritative' },
  { value: 'warm', label: 'Warm' },
  { value: 'bold', label: 'Bold' },
];
const USES: { value: Use; label: string }[] = [
  { value: 'speaker', label: 'Speaker intro' },
  { value: 'podcast', label: 'Podcast intro' },
  { value: 'website', label: 'Website about page' },
  { value: 'linkedin', label: 'LinkedIn About' },
  { value: 'press', label: 'Press or byline' },
  { value: 'conference', label: 'Conference program' },
];

type VersionId = 'one' | 'short' | 'medium' | 'long' | 'first' | 'intro';
const BEST_FOR: Record<Use, VersionId> = {
  speaker: 'intro',
  podcast: 'intro',
  website: 'long',
  linkedin: 'first',
  press: 'one',
  conference: 'medium',
};

/** Grammar for one way of referring to the person. */
type G = {
  s: string; // subject: she / they / Dana
  p: string; // possessive: her / their / Dana's
  plural: boolean; // they takes plural verbs
  first: boolean; // first person
};

const IRREGULAR_PAST = new Set([
  'built', 'led', 'grew', 'wrote', 'ran', 'won', 'sold', 'took', 'made', 'spoke', 'became', 'began', 'brought',
  'drove', 'taught', 'oversaw', 'held', 'sat', 'spent', 'set', 'cut', 'put', 'got', 'gave', 'saw', 'kept', 'met',
  'paid', 'read', 'went', 'won', 'shot', 'told', 'thought', 'felt', 'found', 'left', 'lost', 'rebuilt', 'co-wrote',
]);

const PRESENT: Record<string, string> = {
  writes: 'write', hosts: 'host', 'co-hosts': 'co-host', advises: 'advise', sits: 'sit', serves: 'serve',
  teaches: 'teach', leads: 'lead', runs: 'run', mentors: 'mentor', invests: 'invest', speaks: 'speak',
  publishes: 'publish', chairs: 'chair', holds: 'hold', coaches: 'coach', manages: 'manage', has: 'have',
  lectures: 'lecture', edits: 'edit', builds: 'build', helps: 'help', works: 'work',
  owns: 'own', organises: 'organise', organizes: 'organize', supports: 'support', 'co-leads': 'co-lead',
};

function isPast(w: string) {
  return IRREGULAR_PAST.has(w) || (/ed$/.test(w) && w.length > 3);
}

function verb(g: G, sing: string, plur: string, firstForm?: string) {
  if (g.first) return firstForm ?? plur;
  return g.plural ? plur : sing;
}

/** Turn "Scaled X to $40M" into "She scaled X to $40M." (or "I scaled..."). */
function proofSentence(line: string, g: G, also = false): string {
  const t = bare(line);
  if (!t) return '';
  const [w0, ...rest] = t.split(/\s+/);
  const lw = w0.toLowerCase();
  const tail = rest.join(' ');
  const S = upperFirst(g.s);
  const a = also ? ' also' : '';
  if (isPast(lw)) return sentence(`${S}${a} ${lw} ${tail}`);
  if (lw === 'is') return sentence(`${S} ${verb(g, 'is', 'are', 'am')}${a} ${tail}`);
  if (PRESENT[lw]) return sentence(`${S}${a} ${g.first || g.plural ? PRESENT[lw] : lw} ${tail}`);
  return sentence(t);
}

function makeG(pronoun: Pronoun, ref: string): G {
  if (pronoun === 'she') return { s: 'she', p: 'her', plural: false, first: false };
  if (pronoun === 'he') return { s: 'he', p: 'his', plural: false, first: false };
  if (pronoun === 'they') return { s: 'they', p: 'their', plural: true, first: false };
  return { s: ref, p: /s$/i.test(ref) ? `${ref}'` : `${ref}'s`, plural: false, first: false };
}

const FIRST: G = { s: 'I', p: 'my', plural: false, first: true };

export default function BrandBioWriter() {
  const [name, setName] = useState('Dana Okafor');
  const [pronoun, setPronoun] = useState<Pronoun>('she');
  const [role, setRole] = useState('CEO and co-founder');
  const [company, setCompany] = useState('Northwind AI');
  const [focus, setFocus] = useState('building AI agents that clear IT ticket queues for mid-size companies');
  const [expertise, setExpertise] = useState('AI agents, IT automation, enterprise SaaS');
  const [years, setYears] = useState('15');
  const [proof, setProof] = useState(
    "Scaled Fabrikam's service desk product from launch to $40M in annual revenue\nWrites Agent Ops, a weekly newsletter read by 22,000 IT leaders\nHolds two patents in automated ticket routing",
  );
  const [past, setPast] = useState('Fabrikam, Contoso Labs');
  const [basedIn, setBasedIn] = useState('Austin');
  const [outside, setOutside] = useState('coaching youth soccer or restoring old road bikes');
  const [tone, setTone] = useState<Tone>('warm');
  const [use, setUse] = useState<Use>('speaker');

  const versions = useMemo(() => {
    const N = name.trim() || 'Your Name';
    const parts = N.split(/\s+/);
    const ref = tone === 'authoritative' ? parts[parts.length - 1] : parts[0];
    const g = makeG(pronoun, ref);
    const S = upperFirst(g.s);
    const P = upperFirst(g.p);
    const C = company.trim() || 'their company';
    const R = role.trim();
    const roleAt = R ? `${R} ${/\b(of|at)\b/i.test(R) ? 'at' : 'of'} ${C}` : `at ${C}`;
    const isRole = R ? `is ${roleAt}` : `works ${roleAt}`;
    const F = bare(lowerFirst(focus));
    const exps = expertise.split(/[,;\n]/).map((x) => x.trim()).filter(Boolean);
    const expAll = joinList(exps);
    const exp2 = joinList(exps.slice(0, 2));
    const Y = years.trim().replace(/\+$/, '');
    const pasts = past.split(/[,;\n]/).map((x) => x.trim()).filter(Boolean);
    const proofs = lines(proof);
    const town = bare(basedIn);
    const away = bare(outside);
    const isV = (gg: G) => verb(gg, 'is', 'are', 'am');
    const hasV = (gg: G) => verb(gg, 'has', 'have', 'have');

    // One-liner, by tone.
    let one: string;
    if (tone === 'bold') one = `${N} is ${F || `rethinking ${exp2 || 'how work gets done'}`} as ${roleAt}.`;
    else if (tone === 'warm')
      one = `${N} ${isRole}, where ${g.s} ${verb(g, 'spends', 'spend')} most days ${F || `working on ${exp2 || 'hard problems'}`}.`;
    else one = `${N} ${isRole}${Y && exp2 ? ` and has spent ${Y} years in ${exp2}` : F ? `, ${F}` : ''}.`;

    const expSentence = exps.length
      ? tone === 'authoritative' || !Y
        ? `${P} work focuses on ${expAll}.`
        : `${S} ${hasV(g)} spent ${Y} years working on ${expAll}.`
      : '';
    const pastSentence = pasts.length ? `Before ${C}, ${g.s} worked at ${joinList(pasts)}.` : '';
    const focusSentence = tone === 'authoritative' && F ? `At ${C}, ${g.s} ${isV(g)} focused on ${F}.` : '';
    const proofLines = proofs.map((l, i) => proofSentence(l, g, i === 1));
    const personal = [
      town ? `${S} ${isV(g)} based in ${town}.` : '',
      away ? `Away from work, ${g.s} ${isV(g)} usually ${away}.` : '',
    ];
    const personalLong =
      town && away
        ? `${S} ${verb(g, 'lives', 'live')} in ${town} and, away from work, ${isV(g)} usually ${away}.`
        : personal.filter(Boolean).join(' ');
    const closer =
      use === 'press'
        ? exp2
          ? `${S} ${isV(g)} available for interviews and comment on ${exp2}.`
          : ''
        : use === 'speaker' || use === 'conference'
          ? exp2
            ? `${S} ${verb(g, 'speaks', 'speak')} about ${exp2}.`
            : ''
          : '';

    const join = (xs: string[]) => xs.filter(Boolean).join(' ');

    const short = join([one, expSentence, proofLines[0] ?? '']);
    const medium = join([
      one,
      expSentence,
      ...proofLines.slice(0, 2),
      pastSentence,
      tone === 'warm' ? personal[1] || personal[0] : '',
    ]);
    const long = join([one, focusSentence, expSentence, pastSentence, ...proofLines, closer, personalLong]);

    // First person.
    const f = FIRST;
    const firstLead =
      tone === 'bold'
        ? `I'm ${F || `rethinking ${exp2}`} as ${roleAt}.`
        : tone === 'warm'
          ? `I'm ${R ? roleAt : `at ${C}`}, where I spend most days ${F || `working on ${exp2}`}.`
          : `I'm ${R ? roleAt : `at ${C}`}${Y && exp2 ? ` and have spent ${Y} years in ${exp2}` : ''}.`;
    const firstShort = join([
      firstLead,
      exps.length ? (Y && tone !== 'authoritative' ? `I've spent ${Y} years working on ${expAll}.` : `My work focuses on ${expAll}.`) : '',
      proofs[0] ? proofSentence(proofs[0], f) : '',
      town ? `I'm based in ${town}.` : '',
    ]);

    // Spoken intro: hold the name until the end.
    const podcast = use === 'podcast';
    const gi: G = pronoun === 'name' ? { s: podcast ? 'our guest' : 'our speaker', p: podcast ? "our guest's" : "our speaker's", plural: false, first: false } : g;
    const opener = podcast ? 'My guest today' : 'Our next speaker';
    const intro = join([
      Y && expAll
        ? `${opener} has spent ${Y} years working on ${expAll}.`
        : expAll
          ? `${opener} works on ${expAll}.`
          : '',
      `These days ${gi.s} ${R ? `${isV(gi)} ${roleAt}` : `${verb(gi, 'works', 'work')} ${roleAt}`}${F ? `, ${F}` : ''}.`,
      proofs[0] ? proofSentence(proofs[0], gi) : '',
      proofs[1] ? proofSentence(proofs[1], gi, true) : '',
      pasts.length ? `Before that, ${gi.s} worked at ${joinList(pasts)}.` : '',
      away ? `And away from work, ${gi.s} ${isV(gi)} usually ${away}.` : '',
      podcast ? `${parts[0]}, welcome to the show.` : use === 'speaker' ? `Please join me in welcoming ${N}.` : `Please welcome ${N}.`,
    ]);

    return [
      { id: 'one' as VersionId, label: 'One-liner', text: one, target: 25 },
      { id: 'short' as VersionId, label: 'Short bio', text: short, target: 50 },
      { id: 'medium' as VersionId, label: 'Medium bio', text: medium, target: 100 },
      { id: 'long' as VersionId, label: 'Long bio', text: long, target: 200 },
      { id: 'first' as VersionId, label: 'First person, short', text: firstShort, target: 50 },
      { id: 'intro' as VersionId, label: podcast ? 'Podcast intro (read aloud)' : 'Speaker intro (read aloud)', text: intro, target: 120 },
    ];
  }, [basedIn, company, expertise, focus, name, outside, past, pronoun, proof, role, tone, use, years]);

  const allText = versions.map((v) => `${v.label.toUpperCase()}\n${v.text}`).join('\n\n');
  useToolResult(allText);

  const best = BEST_FOR[use];

  return (
    <div className="ft-grid ft-grid-wide">
      <div className="ft-card no-print">
        <p className="ft-label">About you</p>
        <div className="ft-row">
          <TextField label="Name" value={name} onChange={setName} />
          <SelectField label="Pronouns" value={pronoun} onChange={setPronoun} options={PRONOUNS} />
        </div>
        <div className="ft-row">
          <TextField label="Role" value={role} onChange={setRole} />
          <TextField label="Company" value={company} onChange={setCompany} />
        </div>
        <TextField
          label="What you are working on"
          value={focus}
          onChange={setFocus}
          hint="Start with an -ing verb: building, helping, fixing."
        />
        <TextField label="Known for" value={expertise} onChange={setExpertise} hint="Comma separated." />
        <TextField label="Years of experience" type="number" value={years} onChange={setYears} />
        <AreaField
          label="Proof points (one per line)"
          value={proof}
          onChange={setProof}
          rows={4}
          hint="Start each with a verb: Scaled, Led, Wrote, Holds. Use numbers."
        />
        <TextField label="Past companies or credentials" value={past} onChange={setPast} hint="Comma separated." />
        <div className="ft-row">
          <TextField label="Based in" value={basedIn} onChange={setBasedIn} placeholder="Optional" />
          <TextField label="Away from work" value={outside} onChange={setOutside} placeholder="Optional, e.g. running trails" />
        </div>
        <div className="ft-row">
          <SelectField label="Tone" value={tone} onChange={setTone} options={TONES} />
          <SelectField label="Where it will be used" value={use} onChange={setUse} options={USES} />
        </div>
      </div>

      <div className="ft-stack" aria-live="polite">
        {versions.map((v) => {
          const n = countWords(v.text);
          const over = v.id === 'one' ? n > 25 : n > v.target * 1.3;
          return (
            <div className="ft-card" key={v.id}>
              <div className="pr-head">
                <p className="ft-label">{v.label}</p>
                <span style={{ display: 'inline-flex', gap: 6, flexWrap: 'wrap' }}>
                  {v.id === best ? <Verdict level="good">Best for this use</Verdict> : null}
                  <Verdict level={over ? 'warn' : 'good'}>
                    {n} words{v.id === 'intro' ? '' : ` / ${v.target}`}
                  </Verdict>
                </span>
              </div>
              <p className="ft-prose" style={{ margin: 0 }}>
                {v.text}
              </p>
              {v.id === 'long' && n < v.target * 0.75 ? (
                <p className="ft-hint" style={{ marginTop: 8 }}>
                  Add more proof points or past roles for a fuller long bio.
                </p>
              ) : null}
              <div className="ft-actions">
                <CopyButton text={v.text} />
              </div>
            </div>
          );
        })}
        <div className="ft-actions">
          <CopyButton text={allText} label="Copy all" className="tool-btn tool-btn-primary" />
        </div>
      </div>
    </div>
  );
}
