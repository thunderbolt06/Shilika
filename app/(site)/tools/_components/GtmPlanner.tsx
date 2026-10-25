'use client';

import { useMemo, useState } from 'react';
import { CHANNELS, type ChannelId } from '../_data/channels';
import {
  BUYERS,
  BUYER_BY_ID,
  CATEGORIES,
  CATEGORY_BY_ID,
  MISMATCHES,
  MOTIONS,
  MOTION_BY_ID,
  STAGES,
  STAGE_BY_ID,
  type BuyerId,
  type CategoryId,
  type MotionId,
  type StageId,
} from '../_data/gtm';
import { formatUsd } from './format';

interface RankedChannel {
  id: ChannelId;
  name: string;
  score: number;
  pct: number;
  amount: number;
  reasons: string[];
  play: string;
}

const PHASE_LABELS: { key: 'w1' | 'w3' | 'w5' | 'w9'; label: string; theme: string }[] = [
  { key: 'w1', label: 'Weeks 1 to 2', theme: 'Foundations and measurement' },
  { key: 'w3', label: 'Weeks 3 to 4', theme: 'Core assets and first channel' },
  { key: 'w5', label: 'Weeks 5 to 8', theme: 'Proof and second channel' },
  { key: 'w9', label: 'Weeks 9 to 12', theme: 'Scale what works, cut the rest' },
];

function rankChannels(
  category: CategoryId,
  stage: StageId,
  buyer: BuyerId,
  motion: MotionId,
  budget: number,
): RankedChannel[] {
  const cat = CATEGORY_BY_ID[category];
  const st = STAGE_BY_ID[stage];
  const by = BUYER_BY_ID[buyer];
  const mo = MOTION_BY_ID[motion];

  const scored = CHANNELS.map((ch, order) => {
    const base = cat.channels[ch.id] ?? 2;
    const b = by.channels[ch.id] ?? 0;
    const m = mo.channels[ch.id] ?? 0;
    const s = st.channels[ch.id] ?? 0;
    let budgetAdj = 0;
    if (ch.paid && budget < 2000) budgetAdj -= 3;
    if (ch.id === 'events' && budget < 5000) budgetAdj -= 2;
    if (ch.id === 'linkedin-ads' && budget < 4000) budgetAdj -= 2;

    const reasons: string[] = [];
    if (base >= 7) reasons.push(`core channel for ${cat.label}`);
    if (b >= 2) reasons.push(`${by.label.toLowerCase()} check claims here`);
    if (m >= 2) reasons.push(`fits a ${mo.label.toLowerCase()} motion`);
    if (s >= 2) reasons.push(`gains weight at ${st.label}`);
    if (reasons.length === 0) reasons.push('solid all-round fit for this mix');

    return { ch, order, score: base + b + m + s + budgetAdj, reasons };
  });

  scored.sort((a, b) => b.score - a.score || a.order - b.order);
  const top = scored.slice(0, 5);
  const weights = top.map((t) => Math.pow(Math.max(t.score, 1), 1.5));
  const total = weights.reduce((a, b) => a + b, 0);
  const pcts = weights.map((w) => Math.round((w / total) * 100));
  const drift = 100 - pcts.reduce((a, b) => a + b, 0);
  pcts[0] += drift;

  return top.map((t, i) => ({
    id: t.ch.id,
    name: t.ch.name,
    score: t.score,
    pct: pcts[i],
    amount: Math.round((budget * pcts[i]) / 100),
    reasons: t.reasons,
    play: t.ch.play,
  }));
}

export default function GtmPlanner() {
  const [category, setCategory] = useState<CategoryId>('b2b-ai-saas');
  const [stage, setStage] = useState<StageId>('seed');
  const [buyer, setBuyer] = useState<BuyerId>('business');
  const [motion, setMotion] = useState<MotionId>('founder-led');
  const [budgetInput, setBudgetInput] = useState('10000');
  const [copied, setCopied] = useState(false);

  const budget = Math.max(0, Number(budgetInput) || 0);

  const plan = useMemo(() => {
    const cat = CATEGORY_BY_ID[category];
    const st = STAGE_BY_ID[stage];
    const by = BUYER_BY_ID[buyer];
    const mo = MOTION_BY_ID[motion];
    const channels = rankChannels(category, stage, buyer, motion, budget);
    const early = stage === 'pre-seed' || stage === 'seed';

    const statement =
      `For ${by.phrase} who ${cat.pain}, [Product] is the ${cat.frame} that [one measurable outcome]. ` +
      `Unlike ${cat.alternative}, [Product] [the one thing you do that they cannot]. ` +
      `We prove it with ${cat.proof}. ${mo.angle}`;

    const aiPrompt =
      `Act as a B2B positioning strategist. I run a ${st.label} ${cat.label} company selling to ${by.phrase} through a ${mo.label.toLowerCase()} motion. ` +
      `Our buyers ${cat.pain}. Their default alternative is ${cat.alternative}. They verify claims through ${by.verifies}. ` +
      `Ask me the 5 questions you need answered, then write 3 positioning statements in the format: For [buyer] who [problem], [product] is the [category] that [outcome]. Unlike [alternative], we [differentiator]. ` +
      `Score each statement on clarity, proof available today, and how hard it is for a bigger competitor to copy.`;

    const phases = PHASE_LABELS.map((p) => {
      const tasks = [...st.plan[p.key], ...cat.plan[p.key], ...mo.plan[p.key]];
      if (p.key === 'w3' && channels[0]) tasks.push(`Stand up ${channels[0].name} (${formatUsd(channels[0].amount)}/mo): ${channels[0].play}`);
      if (p.key === 'w5' && channels[1]) tasks.push(`Add ${channels[1].name} (${formatUsd(channels[1].amount)}/mo): ${channels[1].play}`);
      if (p.key === 'w9' && channels[2]) {
        tasks.push(`Test ${channels[2].name} (${formatUsd(channels[2].amount)}/mo): ${channels[2].play}`);
        tasks.push(`Score all 5 channels against the north-star metric. Keep the top 2, fix or cut the bottom 2, and reset the budget split for the next quarter.`);
      }
      return { ...p, tasks };
    });

    const mismatch = MISMATCHES.find((x) => x.buyer === buyer && x.motion === motion);
    const risks = [cat.risks[early ? 0 : 1], mismatch ? mismatch.risk : mo.risk];
    if (budget > 0 && budget < 3000) {
      risks.push(
        `At ${formatUsd(budget)} a month, five channels will each get too little to produce a clear signal. Put about 70% into the top two and run the rest on founder time, not spend.`,
      );
    } else {
      risks.push(st.risk);
    }

    const metrics = [cat.metrics[0], cat.metrics[1], mo.metric, st.metric];

    return { cat, st, by, mo, channels, statement, aiPrompt, phases, risks, metrics };
  }, [category, stage, buyer, motion, budget]);

  function buildMarkdown(): string {
    const p = plan;
    const lines: string[] = [];
    lines.push(`# AI Startup GTM Plan`);
    lines.push('');
    lines.push(`Category: ${p.cat.label} | Stage: ${p.st.label} | Buyer: ${p.by.label} | Motion: ${p.mo.label} | Budget: ${formatUsd(budget)}/month`);
    lines.push(`Focus this quarter: ${p.st.focus}.`);
    lines.push('');
    lines.push('## Positioning');
    lines.push('');
    lines.push(p.statement);
    lines.push('');
    lines.push('Questions to answer before you lock it:');
    p.cat.questions.forEach((q) => lines.push(`- ${q}`));
    lines.push('');
    lines.push('AI assistant prompt:');
    lines.push('');
    lines.push(p.aiPrompt);
    lines.push('');
    lines.push('## Channel mix (top 5)');
    lines.push('');
    p.channels.forEach((c, i) =>
      lines.push(`${i + 1}. ${c.name}: ${c.pct}% (${formatUsd(c.amount)}/month). Why: ${c.reasons.join('; ')}. First move: ${c.play}`),
    );
    lines.push('');
    lines.push('## 90-day plan');
    p.phases.forEach((ph) => {
      lines.push('');
      lines.push(`### ${ph.label}: ${ph.theme}`);
      ph.tasks.forEach((t) => lines.push(`- [ ] ${t}`));
    });
    lines.push('');
    lines.push('## Metrics');
    lines.push('');
    lines.push(`North star: ${p.cat.northStar.metric}. ${p.cat.northStar.why}`);
    p.metrics.forEach((m) => lines.push(`- ${m}`));
    lines.push('');
    lines.push('## Top 3 risks');
    lines.push('');
    p.risks.forEach((r, i) => lines.push(`${i + 1}. ${r}`));
    lines.push('');
    lines.push('Built with the free AI Startup GTM Planner by Shilika Jain: https://www.shilikajain.com/tools/gtm-planner');
    return lines.join('\n');
  }

  function download() {
    const blob = new Blob([buildMarkdown()], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gtm-plan-${category}-${stage}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(plan.aiPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="tool-layout">
      <form className="tool-panel tool-inputs no-print" onSubmit={(e) => e.preventDefault()} aria-label="Plan inputs">
        <p className="tool-section-label">Your startup</p>
        <div className="tool-field">
          <label htmlFor="gtm-category">Category</label>
          <select id="gtm-category" value={category} onChange={(e) => setCategory(e.target.value as CategoryId)}>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div className="tool-field">
          <label htmlFor="gtm-stage">Stage</label>
          <select id="gtm-stage" value={stage} onChange={(e) => setStage(e.target.value as StageId)}>
            {STAGES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="tool-field">
          <label htmlFor="gtm-buyer">Primary buyer</label>
          <select id="gtm-buyer" value={buyer} onChange={(e) => setBuyer(e.target.value as BuyerId)}>
            {BUYERS.map((b) => (
              <option key={b.id} value={b.id}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
        <div className="tool-field">
          <label htmlFor="gtm-motion">Go-to-market motion</label>
          <select id="gtm-motion" value={motion} onChange={(e) => setMotion(e.target.value as MotionId)}>
            {MOTIONS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
        <div className="tool-field">
          <label htmlFor="gtm-budget">Monthly marketing budget (USD)</label>
          <input
            id="gtm-budget"
            type="number"
            inputMode="numeric"
            min={0}
            step={500}
            value={budgetInput}
            onChange={(e) => setBudgetInput(e.target.value)}
            aria-describedby="gtm-budget-hint"
          />
          <span id="gtm-budget-hint" className="tool-hint">
            Programs and tools only. Leave salaries out.
          </span>
        </div>
        <div className="tool-actions">
          <button type="button" className="tool-btn tool-btn-primary" onClick={download}>
            Download plan
          </button>
          <button type="button" className="tool-btn" onClick={() => window.print()}>
            Print / save as PDF
          </button>
        </div>
      </form>

      <div className="tool-output" aria-live="polite">
        <div className="print-only tool-print-head">
          <strong>AI Startup GTM Plan</strong>
          <span>
            {plan.cat.label} | {plan.st.label} | {plan.by.label} | {plan.mo.label} | {formatUsd(budget)}/month
          </span>
        </div>

        <section className="tool-panel tool-block">
          <p className="tool-section-label">01 · Positioning prompt</p>
          <p className="tool-statement">{plan.statement}</p>
          <p className="tool-sub">Answer these before you lock it:</p>
          <ul className="tool-list">
            {plan.cat.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
            <li>
              {plan.by.label} check claims through {plan.by.verifies}. Make sure your proof lives there.
            </li>
          </ul>
          <details className="tool-details">
            <summary>Prompt to paste into your AI assistant</summary>
            <p className="tool-code">{plan.aiPrompt}</p>
            <button type="button" className="tool-btn tool-btn-small no-print" onClick={copyPrompt}>
              {copied ? 'Copied' : 'Copy prompt'}
            </button>
          </details>
        </section>

        <section className="tool-panel tool-block">
          <p className="tool-section-label">02 · Channel mix (top 5 of 20)</p>
          {budget === 0 && <p className="tool-hint">Add a monthly budget to see dollar amounts.</p>}
          <ol className="tool-channels">
            {plan.channels.map((c, i) => (
              <li key={c.id} className="tool-channel">
                <div className="tool-channel-head">
                  <span className="tool-rank">{String(i + 1).padStart(2, '0')}</span>
                  <span className="tool-channel-name">{c.name}</span>
                  <span className="tool-channel-amt">
                    {c.pct}% · {formatUsd(c.amount)}/mo
                  </span>
                </div>
                <div className="tool-bar" aria-hidden>
                  <span style={{ width: `${c.pct}%` }} />
                </div>
                <p className="tool-channel-why">Why: {c.reasons.join('; ')}.</p>
                <p className="tool-channel-play">{c.play}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="tool-panel tool-block">
          <p className="tool-section-label">03 · 90-day plan</p>
          <p className="tool-sub">Focus this quarter: {plan.st.focus}.</p>
          <div className="tool-phases">
            {plan.phases.map((ph) => (
              <div key={ph.key} className="tool-phase">
                <h3>
                  {ph.label}
                  <span>{ph.theme}</span>
                </h3>
                <ul className="tool-list">
                  {ph.tasks.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="tool-panel tool-block">
          <p className="tool-section-label">04 · Metrics</p>
          <div className="tool-northstar">
            <span className="tool-mini">North star</span>
            <strong>{plan.cat.northStar.metric}</strong>
            <p>{plan.cat.northStar.why}</p>
          </div>
          <ul className="tool-metric-grid">
            {plan.metrics.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </section>

        <section className="tool-panel tool-block">
          <p className="tool-section-label">05 · Top 3 risks</p>
          <ol className="tool-risks">
            {plan.risks.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
