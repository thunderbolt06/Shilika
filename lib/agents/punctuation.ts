// Run 100 (2026-10-27): deterministic em-dash removal for writer-agent output.
// docs/humanization-guide.md bans em-dashes, but checkHumanization() only records
// violations (non-fatal), and title/description were never checked. 45 live posts
// and 6 descriptions shipped with 380+ em-dashes. This runs at parse time so new
// drafts never reach Supabase with one. Same rules as the Run 100 SQL backfill.
// Blockquotes are left verbatim: they hold real quotes (e.g. Shilika's X posts).

const CONJ = new Set([
  'but', 'and', 'or', 'so', 'yet', 'which', 'who', 'plus', 'with', 'not', 'even',
  'especially', 'including', 'while', 'because', 'although', 'though', 'then', 'often',
  'usually', 'unless', 'if', 'when', 'where', 'whether', 'instead', 'rather', 'just',
  'only', 'sometimes', 'ideally', 'typically',
]);

const DASH = /\s*—\s*/g;

function fixSentence(sent: string): string {
  const n = (sent.match(/—/g) ?? []).length;
  if (n === 0) return sent;
  let s = sent;
  if (n === 2) {
    s = s.replace(/\s*—\s*(.*?)\s*—\s*/, (_m, inner: string) =>
      inner.includes(',') ? ` (${inner}) ` : `, ${inner}, `,
    );
    s = s.replace(/ \( /g, ' (').replace(/\) ([.,:;!?])/g, ')$1');
  } else if (n > 2) {
    s = s.replace(DASH, ', ');
  } else {
    s = s.replace(DASH, (m, offset: number) => {
      const next = /^\s*([A-Za-z]+)/.exec(s.slice(offset + m.length));
      const w = next ? next[1].toLowerCase() : '';
      return CONJ.has(w) || s.slice(0, offset).includes(':') ? ', ' : ': ';
    });
  }
  return s.replace(/,\s*,/g, ',').replace(/:,/g, ':').replace(/ ([.!?])/g, '$1');
}

function fixLine(line: string): string {
  if (!line.includes('—')) return line;
  if (line.trimStart().startsWith('>')) return line;
  // Inside code spans (pitch subject lines etc.) a spaced hyphen reads right.
  let s = line.replace(/`[^`]*`/g, (c) => c.replace(/ — /g, ' - ').replace(/—/g, '-'));
  if (s.trimStart().startsWith('|')) {
    return s.replace(/\|\s*—\s*\|/g, '| - |').replace(/ — /g, ': ').replace(/—/g, '-');
  }
  s = s.replace(/^(\s*(?:Hi|Hey|Hello|Dear) [^—]{1,40}?)\s*—\s*$/, '$1,');
  const li = /^(\s*(?:[-*]|\d+\.)\s+.*?)\s*—\s*/.exec(s);
  if (li && (li[1].includes('](') || li[1].trimEnd().endsWith('**'))) {
    s = `${li[1].trimEnd()}: ${s.slice(li[0].length)}`;
  }
  if (s.trimStart().startsWith('#')) s = s.replace(/\s*—\s*/, ': ');
  s = s.replace(/\*\*\s*—\s*/g, '**: ');
  return s
    .split(/(?<=[.!?])(\s+)/)
    .map(fixSentence)
    .join('');
}

export function stripEmDashes<T>(v: T): T {
  if (typeof v !== 'string' || !v.includes('—')) return v;
  return v.split('\n').map(fixLine).join('\n') as unknown as T;
}
