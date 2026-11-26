// Classifies AI crawler hits and AI referrals for the middleware log.
// Pure string checks only, so it is safe and cheap on the edge runtime.

export type AiTrafficEvent = {
  event: 'ai_traffic';
  kind: 'crawler' | 'referral';
  // Crawler name (GPTBot, ClaudeBot...) or referring engine (chatgpt, perplexity...).
  source: string;
  path: string;
  refHost?: string;
  ua?: string;
};

// Order matters: specific tokens first. Google-Extended is a robots.txt token
// and rarely shows up as a user agent, but it is listed in case it does.
const CRAWLERS: [name: string, needle: string][] = [
  ['OAI-SearchBot', 'oai-searchbot'],
  ['ChatGPT-User', 'chatgpt-user'],
  ['GPTBot', 'gptbot'],
  ['Perplexity-User', 'perplexity-user'],
  ['PerplexityBot', 'perplexitybot'],
  ['Claude-SearchBot', 'claude-searchbot'],
  ['Claude-User', 'claude-user'],
  ['ClaudeBot', 'claudebot'],
  ['Google-Extended', 'google-extended'],
  ['Bingbot', 'bingbot'],
  ['Googlebot', 'googlebot'],
];

const REFERRERS: [name: string, host: string][] = [
  ['chatgpt', 'chatgpt.com'],
  ['chatgpt', 'chat.openai.com'],
  ['perplexity', 'perplexity.ai'],
  ['gemini', 'gemini.google.com'],
  ['claude', 'claude.ai'],
  ['copilot', 'copilot.microsoft.com'],
];

export function matchCrawler(userAgent: string | null | undefined): string | null {
  if (!userAgent) return null;
  const ua = userAgent.toLowerCase();
  for (const [name, needle] of CRAWLERS) {
    if (ua.includes(needle)) return name;
  }
  return null;
}

function matchHost(host: string): string | null {
  const h = host.toLowerCase().replace(/^www\./, '');
  for (const [name, domain] of REFERRERS) {
    if (h === domain || h.endsWith(`.${domain}`)) return name;
  }
  return null;
}

// Checks the Referer header first, then utm_source (ChatGPT adds
// utm_source=chatgpt.com to outbound links, and some apps strip the referrer).
export function matchReferral(
  referer: string | null | undefined,
  utmSource: string | null | undefined,
): { source: string; refHost: string } | null {
  if (referer) {
    try {
      const host = new URL(referer).hostname;
      const source = matchHost(host);
      if (source) return { source, refHost: host };
    } catch {
      // Malformed referrer: fall through to utm_source.
    }
  }
  if (utmSource) {
    const source = matchHost(utmSource);
    if (source) return { source, refHost: `utm:${utmSource.toLowerCase()}` };
  }
  return null;
}

export function classifyAiTraffic(input: {
  userAgent: string | null | undefined;
  referer: string | null | undefined;
  utmSource: string | null | undefined;
  path: string;
}): AiTrafficEvent | null {
  const crawler = matchCrawler(input.userAgent);
  if (crawler) {
    return {
      event: 'ai_traffic',
      kind: 'crawler',
      source: crawler,
      path: input.path,
      ua: (input.userAgent ?? '').slice(0, 200),
    };
  }
  const referral = matchReferral(input.referer, input.utmSource);
  if (referral) {
    return {
      event: 'ai_traffic',
      kind: 'referral',
      source: referral.source,
      path: input.path,
      refHost: referral.refHost,
    };
  }
  return null;
}

// Fire-and-forget log. Always writes one JSON line to stdout (readable in
// Vercel logs). Also sends to Axiom when the env vars are set. Never throws.
export async function logAiTraffic(event: AiTrafficEvent): Promise<void> {
  const row = { _time: new Date().toISOString(), ...event };
  console.log(JSON.stringify(row));

  const token = process.env.AXIOM_TOKEN;
  const dataset = process.env.AXIOM_DATASET;
  if (!token || !dataset) return;
  const host = process.env.AXIOM_HOST ?? 'api.axiom.co';
  try {
    await fetch(`https://${host}/v1/datasets/${encodeURIComponent(dataset)}/ingest`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([row]),
      signal: AbortSignal.timeout(3000),
    });
  } catch {
    // Logging must never affect the response.
  }
}
