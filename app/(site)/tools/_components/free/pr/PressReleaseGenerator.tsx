'use client';

import { useId, useMemo, useState } from 'react';
import { CopyButton, DownloadButton, Verdict, useToolResult } from '../kit';
import {
  AreaField,
  SelectField,
  TextField,
  aOrAn,
  bare,
  countWords,
  fileSlug,
  lines,
  longDate,
  lowerFirst,
  sentence,
  titleCase,
} from './shared';
import './pr.css';

type ReleaseType = 'launch' | 'funding' | 'partnership' | 'token' | 'hire' | 'milestone' | 'event';

const TYPES: { value: ReleaseType; label: string }[] = [
  { value: 'launch', label: 'Product launch' },
  { value: 'funding', label: 'Funding round' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'token', label: 'Token launch / TGE' },
  { value: 'hire', label: 'New hire' },
  { value: 'milestone', label: 'Milestone or metric' },
  { value: 'event', label: 'Event' },
];

type TypeFields = {
  product: string;
  descriptor: string;
  amount: string;
  round: string;
  lead: string;
  others: string;
  useOfFunds: string;
  partner: string;
  partnerGoal: string;
  tokenName: string;
  ticker: string;
  network: string;
  listing: string;
  person: string;
  role: string;
  previously: string;
  metric: string;
  event: string;
  eventWhen: string;
};

const DEFAULT_TF: TypeFields = {
  product: 'Relay',
  descriptor: 'AI agent that resolves tier-one IT tickets inside Slack and Teams',
  amount: '$18 million',
  round: 'Series A',
  lead: 'Halcyon Ventures',
  others: 'Bluefin Capital and existing investors',
  useOfFunds: 'expand its agent platform and double its engineering team',
  partner: 'Fabrikam Cloud',
  partnerGoal: 'bring AI ticket resolution to 4,000 managed service providers',
  tokenName: 'Northwind Network',
  ticker: 'NWN',
  network: 'Ethereum and Base',
  listing: '',
  person: 'Lena Brooks',
  role: 'Chief Revenue Officer',
  previously: 'grew enterprise revenue at Contoso Cloud from $30 million to $210 million',
  metric: '1 Million IT Tickets Resolved',
  event: 'Agent Ops Summit',
  eventWhen: 'on November 18 in San Francisco',
};

type Example = { news: string; details: string; availability: string; url: string };

const EXAMPLES: Record<ReleaseType, Example> = {
  launch: {
    news: 'Northwind AI today launched Relay, an AI agent that resolves tier-one IT tickets such as password resets, access requests and software installs inside Slack and Microsoft Teams, with no human in the loop.',
    details:
      'In a 90-day pilot with 14 mid-size companies, Relay resolved 62% of incoming tickets with no human handoff.\nMedian time to resolution fell from 9 hours to 4 minutes.\nRelay handles password resets, access requests, software installs and device checks. Anything else goes to a person, with the full context attached.\nIT admins decide what Relay can and cannot do, and every action is logged and reversible.\nRelay connects to Okta, Google Workspace, Jamf and Microsoft Entra ID in under an hour.\nPricing starts at $8 per employee per month, with no setup fee.',
    availability:
      'Relay is available today with a free 30-day trial for teams of any size. Teams can connect it to a test workspace first and roll it out company-wide when they are ready.',
    url: 'https://northwind.example/relay',
  },
  funding: {
    news: 'Northwind AI, the company behind the Relay IT support agent, today announced an $18 million Series A led by Halcyon Ventures, with participation from Bluefin Capital and existing investors.',
    details:
      'The round brings total funding to $24 million.\nRelay now resolves more than 60% of tier-one tickets for 120 customers.\nRevenue grew fourfold in the past 12 months.',
    availability: 'Northwind AI is hiring across engineering, sales and customer success.',
    url: 'https://northwind.example/careers',
  },
  partnership: {
    news: "Northwind AI today announced a partnership with Fabrikam Cloud that makes Relay, its AI agent for IT support, available to the 4,000 managed service providers on Fabrikam's platform.",
    details:
      'Fabrikam partners can switch Relay on for their clients from the Fabrikam console, with no separate contract.\nThe integration covers ticket routing, identity checks and audit logs.\nEarly access partners cut first-response times by more than 80%.',
    availability: 'Relay is available to Fabrikam partners from today.',
    url: 'https://northwind.example/fabrikam',
  },
  token: {
    news: 'Northwind AI today announced the token generation event for NWN, the native token of the Northwind Network, which pays independent operators to run and verify AI agent tasks.',
    details:
      'The token generation event takes place on November 4.\n40% of supply is reserved for operators and community programmes, unlocking over four years.\nThe network processed 3.2 million agent tasks during its testnet phase.',
    availability: 'Eligibility rules, the full token schedule and the audit report are published in the Northwind docs.',
    url: 'https://northwind.example/token',
  },
  hire: {
    news: 'Northwind AI today appointed Lena Brooks as Chief Revenue Officer. She will lead sales, partnerships and customer success as the company expands into Europe.',
    details:
      'Brooks will build the company’s first sales team in London.\nThe appointment follows Northwind AI’s $18 million Series A in June.\nThe company has grown from 30 to 120 customers in the past year.',
    availability: 'Northwind AI is hiring sales and customer success roles in London and New York.',
    url: 'https://northwind.example/careers',
  },
  milestone: {
    news: 'Northwind AI today announced that Relay, its AI agent for IT support, has resolved more than 1 million tickets in its first year, saving customers an estimated 380,000 hours of IT staff time.',
    details:
      'Relay now serves 120 companies across North America and Europe.\nThe share of tickets resolved with no human handoff has risen from 41% to 64%.\nPassword resets, access requests and software installs make up 70% of resolved tickets.',
    availability: 'Relay is available with a free 30-day trial.',
    url: 'https://northwind.example/relay',
  },
  event: {
    news: 'Northwind AI today announced Agent Ops Summit, a one-day conference for IT leaders running AI agents in production, taking place on November 18 in San Francisco.',
    details:
      'Speakers include IT and security leaders from 20 mid-size and enterprise companies.\nSessions cover agent security, audit trails and how to measure ticket deflection.\nAttendance is free for IT practitioners, with 300 places available.',
    availability: 'Registration is open now.',
    url: 'https://northwind.example/summit',
  },
};

type Block = { k: 'meta' | 'headline' | 'subhead' | 'p' | 'h' | 'end'; t: string; draft?: boolean };

const DRAFT_NOTE = '[Draft quote. Replace with a real one.]';

function splitSentences(s: string): string[] {
  return (s.trim().match(/[^.!?]+[.!?]+["'’)]*\s*|[^.!?]+$/g) || []).map((x) => x.trim()).filter(Boolean);
}

/** AP-style quote: "First sentence," said Name, Title of Company. "The rest." */
function formatQuote(text: string, name: string, title: string, company: string): string {
  const parts = splitSentences(text.replace(/^["“]|["”]$/g, ''));
  if (!parts.length || !name.trim()) return '';
  let first = parts[0];
  if (/\.$/.test(first)) first = `${first.slice(0, -1)},`;
  else if (!/[!?,]$/.test(first)) first = `${first},`;
  const t = title.trim();
  const c = company.trim();
  const role = t && c ? `${t}${/\b(of|at)\s/i.test(t) ? ' at' : ' of'} ${c}` : t || c;
  const rest = parts.slice(1).join(' ');
  return `"${first}" said ${name.trim()}${role ? `, ${role}` : ''}.${rest ? ` "${rest}"` : ''}`;
}

function firstName(full: string): string {
  return full.trim().split(/\s+/)[0] ?? '';
}

function lastName(full: string): string {
  const p = full.trim().split(/\s+/);
  return p[p.length - 1] ?? '';
}

/** "Unveils Relay to Resolve IT Tickets" when the descriptor has a "that <verb>s" clause. */
function unveil(C: string, P: string, d: string): string {
  const m = /\bthat\s+(\w+?)(es|s)\s+(.+)$/i.exec(d);
  if (m) {
    const verb = m[2] === 'es' && /(ch|sh|ss|x|z|o)$/i.test(m[1]) ? m[1] : m[2] === 'es' ? `${m[1]}e` : m[1];
    return `${C} Unveils ${P} to ${verb} ${m[3]}`;
  }
  return `${C} Unveils ${P}, Its New ${d}`;
}

function headlinesFor(type: ReleaseType, company: string, tf: TypeFields): string[] {
  const C = company.trim() || 'Company';
  const d = bare(tf.descriptor);
  const P = tf.product.trim() || 'New Product';
  switch (type) {
    case 'launch':
      return [
        `${C} Launches ${P}, ${aOrAn(d)} ${d}`,
        unveil(C, P, d),
        `${P} Is Live: ${C} Ships ${aOrAn(d)} ${d}`,
      ];
    case 'funding':
      return [
        `${C} Raises ${tf.amount} ${tf.round} Led by ${tf.lead}`,
        `${C} Secures ${tf.amount} to ${bare(tf.useOfFunds)}`,
        `${tf.lead} Leads ${tf.amount} ${tf.round} in ${C}`,
      ];
    case 'partnership':
      return [
        `${C} and ${tf.partner} Partner to ${bare(tf.partnerGoal)}`,
        `${tf.partner} Selects ${C} to ${bare(tf.partnerGoal)}`,
        `${C} Partners With ${tf.partner} on ${P}`,
      ];
    case 'token':
      return [
        `${C} Announces ${tf.ticker} Token Generation Event on ${tf.network}`,
        `${tf.tokenName} Token ${tf.ticker} Goes Live${tf.listing.trim() ? ` With Listing on ${tf.listing}` : ` on ${tf.network}`}`,
        `${C} Launches ${tf.ticker} to Reward the People Who Run ${tf.tokenName}`,
      ];
    case 'hire':
      return [
        `${C} Appoints ${tf.person} as ${tf.role}`,
        `${tf.person} Joins ${C} as ${tf.role}`,
        `${C} Names ${tf.person} ${tf.role} to Lead Its Next Phase`,
      ];
    case 'milestone':
      return [
        `${C} Passes ${tf.metric}`,
        `${P} by ${C} Reaches ${tf.metric}`,
        `${tf.metric}: ${C} Marks a Growth Milestone`,
      ];
    case 'event':
      return [
        `${C} to Host ${tf.event} ${tf.eventWhen}`,
        `${C} Announces ${tf.event}, ${tf.eventWhen.replace(/^on\s/i, '')}`,
        `Registration Opens for ${tf.event} by ${C}`,
      ];
  }
}

function draftQuote(type: ReleaseType, tf: TypeFields): string {
  const P = tf.product.trim() || 'the product';
  switch (type) {
    case 'launch':
      return `Customers kept telling us the same thing: the routine work never stops, and it crowds out the work that matters. We built ${P} to take that load off them, and the teams in our pilot got hours back every week.`;
    case 'funding':
      return `Customers have pulled us forward faster than we planned. This funding lets us ${bare(tf.useOfFunds).replace(/\bits\b/gi, 'our')}. ${tf.lead} has backed companies through this exact stage, and that experience matters as much as the capital.`;
    case 'partnership':
      return `${tf.partner} already works with the customers we want to reach, and they have been asking for this. Together we can ${bare(tf.partnerGoal)} far faster than either of us could alone.`;
    case 'token':
      return `${tf.ticker} gives the people who run and use ${tf.tokenName} a real stake in how it grows. We built the network first and the token second, so it starts life with real usage behind it.`;
    case 'hire':
      return `${tf.person} has done this job at scale, and that is what we need right now. ${firstName(tf.person)} will help us turn strong early demand into a repeatable way of winning and keeping customers.`;
    case 'milestone':
      return `We did not get here through marketing. Customers kept using ${P} and telling their peers about it. The next milestone is about depth, not volume.`;
    case 'event':
      return `We wanted a room where practitioners can compare notes honestly, including what has not worked. ${tf.event} is that room.`;
  }
}

function typeParagraph(type: ReleaseType, company: string, tf: TypeFields, news: string): string {
  const C = company.trim() || 'The company';
  switch (type) {
    case 'funding':
      return [
        tf.round && tf.lead && !news.includes(tf.lead.trim())
          ? `The ${tf.round} round was led by ${tf.lead}${tf.others.trim() ? `, with participation from ${tf.others.trim()}` : ''}.`
          : '',
        tf.useOfFunds.trim() ? `${C} will use the funding to ${bare(tf.useOfFunds)}.` : '',
      ]
        .filter(Boolean)
        .join(' ');
    case 'token':
      return tf.ticker && tf.network && !news.includes(bare(tf.network))
        ? `${tf.ticker} will launch on ${bare(tf.network)}${tf.listing.trim() ? `, with trading available on ${bare(tf.listing)}` : ''}.`
        : '';
    case 'hire':
      return tf.person && tf.previously.trim()
        ? `${lastName(tf.person)} previously ${bare(lowerFirst(tf.previously))}.`
        : '';
    default:
      return '';
  }
}

function formatEmbargo(v: string, tz: string): string {
  const m = /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})/.exec(v);
  if (!m) return '[date and time]';
  let h = Number(m[2]);
  const ap = h >= 12 ? 'p.m.' : 'a.m.';
  h = h % 12 || 12;
  return `${longDate(m[1])}, ${h}:${m[3]} ${ap}${tz.trim() ? ` ${tz.trim()}` : ''}`;
}

function chunk<T>(xs: T[], n: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < xs.length; i += n) out.push(xs.slice(i, i + n));
  return out;
}

export default function PressReleaseGenerator() {
  const [type, setType] = useState<ReleaseType>('launch');
  const [company, setCompany] = useState('Northwind AI');
  const [city, setCity] = useState('San Francisco');
  const [date, setDate] = useState('');
  const [headline, setHeadline] = useState('');
  const [subhead, setSubhead] = useState(
    'The agent works inside the chat tools employees already use and resolved 62% of tickets on its own in a 90-day pilot',
  );
  const [news, setNews] = useState(EXAMPLES.launch.news);
  const [details, setDetails] = useState(EXAMPLES.launch.details);
  const [problem, setProblem] = useState(
    'IT teams at mid-size companies spend up to 40% of their week on repetitive requests, while ticket volumes grow faster than headcount. Most of those requests follow a script, yet they still sit in a queue until a person picks them up. For employees, that means hours lost waiting for access to the tools they need to do their jobs.',
  );
  const [tf, setTf] = useState<TypeFields>(DEFAULT_TF);
  const [spokesName, setSpokesName] = useState('Dana Okafor');
  const [spokesTitle, setSpokesTitle] = useState('CEO and co-founder');
  const [quote, setQuote] = useState('');
  const [q2Name, setQ2Name] = useState('Marcus Hale');
  const [q2Title, setQ2Title] = useState('VP of IT');
  const [q2Company, setQ2Company] = useState('Brightline Health');
  const [q2Text, setQ2Text] = useState(
    'We went into the pilot expecting to automate password resets. Within a month Relay was handling most of our access requests too, and my team finally had time for the projects we kept pushing back.',
  );
  const [availability, setAvailability] = useState(EXAMPLES.launch.availability);
  const [url, setUrl] = useState(EXAMPLES.launch.url);
  const [boilerplate, setBoilerplate] = useState(
    'Northwind AI builds AI agents that take repetitive work off IT teams. Its first product, Relay, resolves tier-one support tickets inside Slack and Microsoft Teams for more than 120 companies. The company was founded in 2023 by Dana Okafor and Sam Whitlock, who previously built service desk software at Fabrikam. Northwind AI is based in San Francisco and backed by Halcyon Ventures and Bluefin Capital. Learn more at northwind.example.',
  );
  const [contactName, setContactName] = useState('Priya Raman');
  const [contactEmail, setContactEmail] = useState('press@northwind.example');
  const [embargoOn, setEmbargoOn] = useState(false);
  const [embargoAt, setEmbargoAt] = useState('');
  const [embargoTz, setEmbargoTz] = useState('ET');
  const embargoId = useId();

  const setField = (k: keyof TypeFields) => (v: string) => setTf((prev) => ({ ...prev, [k]: v }));

  function changeType(next: ReleaseType) {
    const prev = EXAMPLES[type];
    const ex = EXAMPLES[next];
    // Swap in the example copy for the new type, but never overwrite the user's own text.
    if (news === prev.news) setNews(ex.news);
    if (details === prev.details) setDetails(ex.details);
    if (availability === prev.availability) setAvailability(ex.availability);
    if (url === prev.url) setUrl(ex.url);
    setType(next);
  }

  const alts = useMemo(() => headlinesFor(type, company, tf).map(titleCase), [type, company, tf]);

  const { blocks, isDraft } = useMemo(() => {
    const C = company.trim() || 'The company';
    const out: Block[] = [];
    out.push({
      k: 'meta',
      t: embargoOn ? `EMBARGOED UNTIL ${formatEmbargo(embargoAt, embargoTz).toUpperCase()}` : 'FOR IMMEDIATE RELEASE',
    });
    out.push({ k: 'headline', t: headline.trim() || alts[0] });
    if (subhead.trim()) out.push({ k: 'subhead', t: bare(subhead) });

    const dateline = `${city.trim() || '[City]'}, ${longDate(date) || '[Month D, YYYY]'} --`;
    out.push({ k: 'p', t: `${dateline} ${sentence(news) || `${C} today announced [the news].`}` });

    const tp = typeParagraph(type, company, tf, news);
    if (tp) out.push({ k: 'p', t: tp });
    if (problem.trim()) out.push({ k: 'p', t: sentence(problem) });

    const draft = !quote.trim();
    const q1 = formatQuote(draft ? draftQuote(type, tf) : quote, spokesName, spokesTitle, C);
    if (q1) out.push({ k: 'p', t: q1, draft });

    for (const group of chunk(lines(details).map(sentence), 2)) out.push({ k: 'p', t: group.join(' ') });

    const q2 = formatQuote(q2Text, q2Name, q2Title, q2Company);
    if (q2) out.push({ k: 'p', t: q2 });

    const avail = [sentence(availability), url.trim() ? `More information is available at ${url.trim()}.` : '']
      .filter(Boolean)
      .join(' ');
    if (avail) out.push({ k: 'p', t: avail });

    if (boilerplate.trim()) {
      out.push({ k: 'h', t: `About ${C}` });
      out.push({ k: 'p', t: boilerplate.trim() });
    }
    if (contactName.trim() || contactEmail.trim()) {
      out.push({ k: 'h', t: 'Media contact' });
      out.push({ k: 'p', t: [contactName.trim(), contactEmail.trim()].filter(Boolean).join('\n') });
    }
    out.push({ k: 'end', t: '###' });
    return { blocks: out, isDraft: draft && !!q1 };
  }, [
    alts, availability, boilerplate, city, company, contactEmail, contactName, date, details, embargoAt, embargoOn,
    embargoTz, headline, news, problem, q2Company, q2Name, q2Text, q2Title, quote, spokesName, spokesTitle, subhead,
    tf, type, url,
  ]);

  const text = useMemo(
    () =>
      blocks
        .map((b) => (b.draft ? `${b.t} ${DRAFT_NOTE}` : b.t))
        .join('\n\n')
        .trim(),
    [blocks],
  );

  const markdown = useMemo(
    () =>
      blocks
        .map((b) => {
          if (b.k === 'meta') return `**${b.t}**`;
          if (b.k === 'headline') return `# ${b.t}`;
          if (b.k === 'subhead') return `*${b.t}*`;
          if (b.k === 'h') return `**${b.t}**`;
          if (b.k === 'end') return '\\#\\#\\#';
          const t = b.t.replace(/\n/g, '  \n');
          return b.draft ? `${t} *${DRAFT_NOTE}*` : t;
        })
        .join('\n\n'),
    [blocks],
  );

  const bodyWords = useMemo(
    () => countWords(blocks.filter((b) => b.k === 'p' || b.k === 'h').map((b) => b.t).join(' ')),
    [blocks],
  );
  const ledeWords = countWords(news);
  const wordLevel: 'good' | 'warn' | 'bad' =
    bodyWords >= 400 && bodyWords <= 600 ? 'good' : bodyWords < 300 || bodyWords > 800 ? 'bad' : 'warn';
  const wordTip =
    bodyWords < 400
      ? 'Under 400 words. Add a proof point, a customer detail or a second quote.'
      : bodyWords > 600
        ? 'Over 600 words. Cut background and keep the strongest facts.'
        : 'Right length for a news release.';

  useToolResult(text);
  const file = fileSlug(`${company}-press-release`, 'press-release');

  return (
    <div className="ft-grid ft-grid-wide">
      <div className="ft-card no-print">
        <p className="ft-label">The news</p>
        <SelectField label="Announcement type" value={type} onChange={changeType} options={TYPES} />
        <div className="ft-row">
          <TextField label="Company" value={company} onChange={setCompany} />
          <TextField label="City" value={city} onChange={setCity} />
        </div>
        <TextField label="Release date" type="date" value={date} onChange={setDate} />

        {type === 'launch' || type === 'milestone' || type === 'partnership' ? (
          <TextField label="Product name" value={tf.product} onChange={setField('product')} />
        ) : null}
        {type === 'launch' ? (
          <TextField
            label="What it is"
            value={tf.descriptor}
            onChange={setField('descriptor')}
            hint="A short noun phrase, e.g. AI agent that resolves IT tickets."
          />
        ) : null}
        {type === 'funding' ? (
          <>
            <div className="ft-row">
              <TextField label="Amount" value={tf.amount} onChange={setField('amount')} />
              <TextField label="Round" value={tf.round} onChange={setField('round')} />
            </div>
            <TextField label="Lead investor" value={tf.lead} onChange={setField('lead')} />
            <TextField label="Other investors" value={tf.others} onChange={setField('others')} />
            <TextField
              label="Use of funds"
              value={tf.useOfFunds}
              onChange={setField('useOfFunds')}
              hint="Start with a verb: expand, hire, launch."
            />
          </>
        ) : null}
        {type === 'partnership' ? (
          <>
            <TextField label="Partner name" value={tf.partner} onChange={setField('partner')} />
            <TextField
              label="Partnership goal"
              value={tf.partnerGoal}
              onChange={setField('partnerGoal')}
              hint="Start with a verb: bring, give, make."
            />
          </>
        ) : null}
        {type === 'token' ? (
          <>
            <div className="ft-row">
              <TextField label="Network or project" value={tf.tokenName} onChange={setField('tokenName')} />
              <TextField label="Ticker" value={tf.ticker} onChange={setField('ticker')} />
            </div>
            <div className="ft-row">
              <TextField label="Chain" value={tf.network} onChange={setField('network')} />
              <TextField label="Exchange listing" value={tf.listing} onChange={setField('listing')} placeholder="Optional" />
            </div>
          </>
        ) : null}
        {type === 'hire' ? (
          <>
            <div className="ft-row">
              <TextField label="New hire" value={tf.person} onChange={setField('person')} />
              <TextField label="Role" value={tf.role} onChange={setField('role')} />
            </div>
            <TextField
              label="Previously"
              value={tf.previously}
              onChange={setField('previously')}
              hint="Past tense: led, built, grew."
            />
          </>
        ) : null}
        {type === 'milestone' ? (
          <TextField label="The milestone" value={tf.metric} onChange={setField('metric')} />
        ) : null}
        {type === 'event' ? (
          <div className="ft-row">
            <TextField label="Event name" value={tf.event} onChange={setField('event')} />
            <TextField label="When and where" value={tf.eventWhen} onChange={setField('eventWhen')} />
          </div>
        ) : null}

        <AreaField
          label="The news in one sentence"
          value={news}
          onChange={setNews}
          rows={4}
          hint={
            ledeWords > 40 ? (
              <Verdict level="warn">{ledeWords} words. Ledes read best under 35.</Verdict>
            ) : (
              'Who, what, when and where. This becomes your lede.'
            )
          }
        />
        <AreaField label="Key facts (one per line)" value={details} onChange={setDetails} rows={5} />
        <AreaField label="The problem it solves" value={problem} onChange={setProblem} rows={3} />
        <TextField
          label="Headline"
          value={headline}
          onChange={setHeadline}
          placeholder={alts[0]}
          hint="Leave blank to use the first suggestion."
        />
        <TextField label="Subhead" value={subhead} onChange={setSubhead} placeholder="Optional" />

        <p className="ft-label pr-section-gap">Quotes</p>
        <div className="ft-row">
          <TextField label="Spokesperson" value={spokesName} onChange={setSpokesName} />
          <TextField label="Title" value={spokesTitle} onChange={setSpokesTitle} />
        </div>
        <AreaField
          label="Quote"
          value={quote}
          onChange={setQuote}
          rows={4}
          placeholder="Leave blank for a draft you can edit"
          hint="Good quotes give opinion and context, not facts already in the release."
        />
        <details className="pr-more" open>
          <summary>Second quote (customer, partner or investor)</summary>
          <div className="ft-row">
            <TextField label="Name" value={q2Name} onChange={setQ2Name} />
            <TextField label="Title" value={q2Title} onChange={setQ2Title} />
          </div>
          <TextField label="Company" value={q2Company} onChange={setQ2Company} />
          <AreaField label="Quote" value={q2Text} onChange={setQ2Text} rows={3} />
        </details>

        <p className="ft-label pr-section-gap">Close</p>
        <AreaField label="Availability or next step" value={availability} onChange={setAvailability} rows={2} />
        <TextField label="Link" type="url" value={url} onChange={setUrl} />
        <AreaField label="About the company" value={boilerplate} onChange={setBoilerplate} rows={4} />
        <div className="ft-row">
          <TextField label="Media contact" value={contactName} onChange={setContactName} />
          <TextField label="Contact email" type="email" value={contactEmail} onChange={setContactEmail} />
        </div>
        <label className="ft-check" htmlFor={embargoId}>
          <input id={embargoId} type="checkbox" checked={embargoOn} onChange={(e) => setEmbargoOn(e.target.checked)} />
          Embargoed
        </label>
        {embargoOn ? (
          <div className="ft-row">
            <TextField label="Embargo until" type="datetime-local" value={embargoAt} onChange={setEmbargoAt} />
            <TextField label="Time zone" value={embargoTz} onChange={setEmbargoTz} />
          </div>
        ) : null}
      </div>

      <div className="ft-stack">
        <div className="ft-card">
          <p className="ft-label">Headline options</p>
          <ul className="pr-alts">
            {alts.map((a) => (
              <li key={a}>
                <span>{a}</span>
                <button type="button" className="tool-btn tool-btn-small" onClick={() => setHeadline(a)}>
                  Use
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="ft-card">
          <div className="pr-head">
            <p className="ft-label">Your release</p>
            <Verdict level={wordLevel}>{bodyWords} words</Verdict>
          </div>
          <p className="ft-hint" style={{ marginBottom: 12 }}>
            {wordTip} {isDraft ? 'The quote is a draft. Get a real one from your spokesperson.' : ''}
          </p>
          <div className="pr-doc" aria-live="polite">
            {blocks.map((b, i) => {
              if (b.k === 'meta') return <p key={i} className="pr-meta">{b.t}</p>;
              if (b.k === 'headline') return <p key={i} className="pr-headline">{b.t}</p>;
              if (b.k === 'subhead') return <p key={i} className="pr-subhead">{b.t}</p>;
              if (b.k === 'h') return <p key={i} className="pr-h">{b.t}</p>;
              if (b.k === 'end') return <p key={i} className="pr-end">{b.t}</p>;
              return (
                <p key={i} style={{ whiteSpace: 'pre-line' }}>
                  {b.t}
                  {b.draft ? (
                    <>
                      {' '}
                      <span className="pr-draft">{DRAFT_NOTE}</span>
                    </>
                  ) : null}
                </p>
              );
            })}
          </div>
          <div className="ft-actions">
            <CopyButton text={text} label="Copy release" className="tool-btn tool-btn-primary" />
            <DownloadButton filename={`${file}.txt`} content={text} label="Download .txt" />
            <DownloadButton filename={`${file}.md`} content={markdown} mime="text/markdown;charset=utf-8" label="Download .md" />
          </div>
        </div>
      </div>
    </div>
  );
}
