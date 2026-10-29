/** Shape of GET /api/tools/page-scan?url=... (see app/api/tools/page-scan/route.ts). */

export interface PageScanOk {
  ok: true;
  url: string;
  finalUrl: string;
  https: boolean;
  lang: string | null;
  meta: {
    title: string;
    description: string | null;
    canonical: string | null;
    robots: string | null;
    viewport: string | null;
    og: {
      title: string | null;
      description: string | null;
      image: string | null;
      url: string | null;
      siteName: string | null;
      type: string | null;
    };
    twitter: {
      card: string | null;
      title: string | null;
      description: string | null;
      image: string | null;
      site: string | null;
    };
    favicon: string | null;
  };
  headings: { h1: string[]; h2: string[]; h3: string[] };
  jsonLdTypes: string[];
  content: {
    words: number;
    paragraphs: number;
    firstParagraph: string;
    lists: number;
    tables: number;
    images: number;
    imagesWithAlt: number;
    questionHeadings: number;
    internalLinks: number;
    externalLinks: number;
  };
  signals: { author: string | null; datePublished: string | null; dateModified: string | null };
  robots: { found: boolean; blocked: Record<string, boolean>; sitemap: boolean };
  llmsTxt: boolean;
}

export interface PageScanErr {
  ok: false;
  error: string;
}

export type PageScan = PageScanOk | PageScanErr;

/** Call our own scanner. Always resolves; network failures become { ok: false }. */
export async function scanPage(url: string, signal?: AbortSignal): Promise<PageScan> {
  try {
    const res = await fetch(`/api/tools/page-scan?url=${encodeURIComponent(url.trim())}`, { signal });
    const data = (await res.json().catch(() => null)) as PageScan | null;
    if (!data) return { ok: false, error: `The scanner returned HTTP ${res.status}.` };
    return data;
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') return { ok: false, error: 'Cancelled.' };
    return { ok: false, error: 'Could not reach the scanner. Check your connection and try again.' };
  }
}
