// FAQPage structured data for dedicated FAQ posts (slug ending in `-faq`, or tagged `faq`).
// Questions are the `###` headings that end in "?", answers are the text under each one, so the
// markup always mirrors what the page shows (Google requires schema and visible content to match).

export type FaqEntry = { question: string; answer: string };

export function isFaqPost(slug: string, tags: string[]): boolean {
  return /(^|-)faq$/.test(slug) || tags.some((t) => t.toLowerCase() === 'faq');
}

function toPlainText(md: string): string {
  return md
    .split('\n')
    .map((line) => {
      const t = line.trim();
      if (/^\|?\s*:?-{3,}/.test(t)) return ''; // table divider row
      if (t.startsWith('|')) {
        const cells = t
          .replace(/^\||\|$/g, '')
          .split('|')
          .map((c) => c.trim());
        return `${cells.join(', ')};`;
      }
      return t.replace(/^[-*]\s+(\[[ xX]\]\s+)?/, '').replace(/^\d+\.\s+/, '');
    })
    .filter(Boolean)
    .join(' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractFaqEntries(body: string): FaqEntry[] {
  const entries: FaqEntry[] = [];
  let question: string | null = null;
  let buf: string[] = [];
  let inFence = false;

  const flush = () => {
    if (question) {
      const answer = toPlainText(buf.join('\n'));
      if (answer) entries.push({ question, answer });
    }
    question = null;
    buf = [];
  };

  for (const line of body.replace(/\r\n/g, '\n').split('\n')) {
    if (line.startsWith('```')) inFence = !inFence;
    const heading = inFence ? null : /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (heading) {
      flush();
      if (heading[1].length === 3 && heading[2].endsWith('?')) {
        question = toPlainText(heading[2]);
      }
      continue;
    }
    if (question) buf.push(line);
  }
  flush();
  return entries;
}

export function faqPageNode(url: string, entries: FaqEntry[]) {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    url,
    mainEntity: entries.map((e) => ({
      '@type': 'Question',
      name: e.question,
      acceptedAnswer: { '@type': 'Answer', text: e.answer },
    })),
  };
}
