import 'server-only';
import { codeToHtml } from 'shiki';

const ESCAPE: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ESCAPE[c]);
}

function applyInline(s: string): string {
  // Order matters: code first (so other syntax doesn't fire inside it), then links, then bold/italic.
  return s
    .replace(/`([^`]+?)`/g, (_, code) => `<code>${escapeHtml(code)}</code>`)
    .replace(
      /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)/g,
      (_, alt, src, title) =>
        `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}"${title ? ` title="${escapeHtml(title)}"` : ''} loading="lazy" />`,
    )
    .replace(
      /\[([^\]]+)\]\(([^)\s]+)\)/g,
      (_, text, href) => {
        const safe = escapeHtml(href);
        const isExternal = /^https?:\/\//.test(href);
        const rel = isExternal ? ' rel="noopener" target="_blank"' : '';
        return `<a href="${safe}"${rel}>${text}</a>`;
      },
    )
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');
}

type Block = string;

function splitBlocks(md: string): Block[] {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('```')) {
      const fence: string[] = [line];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        fence.push(lines[i]);
        i++;
      }
      if (i < lines.length) {
        fence.push(lines[i]);
        i++;
      }
      blocks.push(fence.join('\n'));
      continue;
    }

    if (!line.trim()) {
      i++;
      continue;
    }

    const start = i;
    while (i < lines.length && lines[i].trim() && !lines[i].startsWith('```')) {
      i++;
    }
    blocks.push(lines.slice(start, i).join('\n'));
  }
  return blocks;
}

async function renderBlock(block: Block): Promise<string> {
  if (block.startsWith('```')) {
    const newline = block.indexOf('\n');
    const fenceLine = block.slice(3, newline === -1 ? undefined : newline).trim();
    const code = newline === -1 ? '' : block.slice(newline + 1, block.lastIndexOf('```')).replace(/\n$/, '');
    const lang = fenceLine || 'text';
    try {
      return await codeToHtml(code, {
        lang,
        theme: 'github-dark-dimmed',
      });
    } catch {
      return `<pre><code>${escapeHtml(code)}</code></pre>`;
    }
  }

  const headerMatch = block.match(/^(#{1,6})\s+(.*)$/);
  if (headerMatch && !block.includes('\n')) {
    const level = headerMatch[1].length;
    const id = headerMatch[2]
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    return `<h${level} id="${id}">${applyInline(headerMatch[2])}</h${level}>`;
  }

  if (/^>\s/.test(block)) {
    const inner = block
      .split('\n')
      .map((l) => l.replace(/^>\s?/, ''))
      .join(' ');
    return `<blockquote>${applyInline(inner)}</blockquote>`;
  }

  const lines = block.split('\n');
  if (lines.every((l) => /^\s*[-*]\s+/.test(l))) {
    const items = lines.map((l) => `<li>${applyInline(l.replace(/^\s*[-*]\s+/, ''))}</li>`);
    return `<ul>${items.join('')}</ul>`;
  }
  if (lines.every((l) => /^\s*\d+\.\s+/.test(l))) {
    const items = lines.map((l) => `<li>${applyInline(l.replace(/^\s*\d+\.\s+/, ''))}</li>`);
    return `<ol>${items.join('')}</ol>`;
  }

  return `<p>${applyInline(lines.join(' '))}</p>`;
}

export async function renderMarkdown(markdown: string): Promise<string> {
  const blocks = splitBlocks(markdown);
  const html = await Promise.all(blocks.map(renderBlock));
  return html.join('\n');
}

export function readingTimeMinutes(markdown: string): number {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
