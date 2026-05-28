import 'server-only';

/**
 * Perplexity API integration. Optional — enabled when PERPLEXITY_API_KEY
 * is configured.
 *
 * Used for two signal types:
 *   1. Related questions — Perplexity exposes the related questions it
 *      shows users alongside its answer. These are a high-signal proxy
 *      for "people also ask" phrasings.
 *   2. Citation domains — the URLs Perplexity cites for a given query.
 *      Useful as a competitor scan ("who answers this question well
 *      enough that Perplexity prefers them").
 */

const ENDPOINT = 'https://api.perplexity.ai/chat/completions';

type PerplexityChoice = {
  message?: { content?: string };
};

type PerplexityResponse = {
  choices?: PerplexityChoice[];
  citations?: string[];
  related_questions?: string[];
};

export type PerplexitySignal = {
  answer: string;
  related_questions: string[];
  citations: string[];
};

export function perplexityEnabled(): boolean {
  return Boolean(process.env.PERPLEXITY_API_KEY);
}

const MODEL = process.env.PERPLEXITY_MODEL || 'sonar';

export async function perplexitySignals(query: string): Promise<PerplexitySignal> {
  if (!process.env.PERPLEXITY_API_KEY) {
    throw new Error('PERPLEXITY_API_KEY not configured');
  }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content:
            "Answer in 2 short sentences. Always include 5 related follow-up questions a real user might ask next, even if your answer is brief.",
        },
        { role: 'user', content: query },
      ],
      return_related_questions: true,
      return_citations: true,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Perplexity ${res.status}: ${text.slice(0, 240)}`);
  }
  const data = (await res.json()) as PerplexityResponse;
  return {
    answer: data.choices?.[0]?.message?.content ?? '',
    related_questions: data.related_questions ?? [],
    citations: data.citations ?? [],
  };
}

/**
 * Run perplexitySignals across an array of queries. Each call is independent
 * so we use Promise.allSettled — one failure does not poison the batch.
 */
export async function perplexityBatch(
  queries: string[],
): Promise<Record<string, PerplexitySignal | { error: string }>> {
  const results = await Promise.allSettled(
    queries.slice(0, 25).map((q) => perplexitySignals(q)),
  );
  const out: Record<string, PerplexitySignal | { error: string }> = {};
  results.forEach((r, i) => {
    const query = queries[i];
    if (r.status === 'fulfilled') {
      out[query] = r.value;
    } else {
      out[query] = { error: r.reason?.message ?? String(r.reason) };
    }
  });
  return out;
}
