'use client';

/**
 * Shared building blocks for the free tools under /tools/[slug].
 *
 * Every tool publishes a plain-text version of its current output with
 * useToolResult(). The page-level EmailResult box reads it so a visitor can
 * email the result to themselves (and become a lead) without a login.
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type ResultCtx = { result: string; setResult: (s: string) => void };

const Ctx = createContext<ResultCtx>({ result: '', setResult: () => {} });

export function ResultProvider({ children }: { children: ReactNode }) {
  const [result, setResult] = useState('');
  return <Ctx.Provider value={{ result, setResult }}>{children}</Ctx.Provider>;
}

/** Publish the tool's current output as plain text. Pass '' when there is nothing yet. */
export function useToolResult(text: string) {
  const { setResult } = useContext(Ctx);
  useEffect(() => {
    setResult(text);
  }, [text, setResult]);
}

export function useCurrentResult() {
  return useContext(Ctx).result;
}

export function CopyButton({ text, label = 'Copy', className }: { text: string; label?: string; className?: string }) {
  const [done, setDone] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setDone(true);
    window.setTimeout(() => setDone(false), 1400);
  }
  return (
    <button type="button" className={className ?? 'tool-btn tool-btn-small'} onClick={copy} disabled={!text}>
      {done ? 'Copied' : label}
    </button>
  );
}

export function downloadFile(filename: string, content: string | Blob, mime = 'text/plain;charset=utf-8') {
  const blob = typeof content === 'string' ? new Blob([content], { type: mime }) : content;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function DownloadButton({
  filename,
  content,
  mime,
  label = 'Download',
}: {
  filename: string;
  content: string;
  mime?: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      className="tool-btn tool-btn-small"
      onClick={() => downloadFile(filename, content, mime)}
      disabled={!content}
    >
      {label}
    </button>
  );
}

/** Parse a numeric input value. Empty or invalid returns the fallback. */
export function num(v: string, fallback = 0): number {
  const n = Number(String(v).replace(/,/g, ''));
  return v.trim() !== '' && Number.isFinite(n) ? n : fallback;
}

/** Status pill used by checkers: good / warn / bad. */
export function Verdict({ level, children }: { level: 'good' | 'warn' | 'bad'; children: ReactNode }) {
  return <span className={`ft-verdict is-${level}`}>{children}</span>;
}

/**
 * Horizontal meter. Default mode is a count against a limit (near or over the
 * limit is a warning). mode="score" flips it: higher is better.
 */
export function Meter({
  value,
  max,
  label,
  mode = 'limit',
}: {
  value: number;
  max: number;
  label: string;
  mode?: 'limit' | 'score';
}) {
  const pct = max ? Math.min(100, (value / max) * 100) : 0;
  const level =
    mode === 'score'
      ? pct >= 70 ? 'good' : pct >= 45 ? 'warn' : 'bad'
      : value > max ? 'bad' : value > max * 0.9 ? 'warn' : 'good';
  return (
    <div className={`ft-meter is-${level}`}>
      <div className="ft-meter-top">
        <span>{label}</span>
        <span className="mono">
          {value.toLocaleString('en-US')} / {max.toLocaleString('en-US')}
        </span>
      </div>
      <div className="ft-meter-bar" role="meter" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}>
        <span style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/** Big circular-free score readout. */
export function Score({ value, label }: { value: number; label: string }) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  const level = v >= 70 ? 'good' : v >= 45 ? 'warn' : 'bad';
  return (
    <div className={`ft-score is-${level}`}>
      <span className="ft-score-num">{v}</span>
      <span className="ft-score-label">{label}</span>
    </div>
  );
}
