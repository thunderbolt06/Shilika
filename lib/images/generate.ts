import 'server-only';
import { GoogleGenAI } from '@google/genai';
import { withRetry } from '@/lib/retry';

/**
 * Image generation provider abstraction.
 *
 *  - "nano-banana-2" (default): Gemini 2.5 Flash Image / Imagen-style model
 *    reachable via the @google/genai SDK with model id
 *    `gemini-2.5-flash-image-preview` (Google's "Nano Banana 2") or
 *    `imagen-3.0-generate-002` (Imagen 3 production).
 *  - "stub": returns a deterministic placeholder PNG buffer so the writer
 *    pipeline can be exercised end-to-end without a real API key.
 *
 * The provider is chosen by env vars at call time:
 *   GOOGLE_GENAI_API_KEY      → enables Gemini
 *   IMAGE_GEN_MODEL           → overrides the model id
 *   IMAGE_GEN_PROVIDER=stub   → forces the stub
 */

export type ImageBytes = { bytes: Uint8Array; mimeType: 'image/png' | 'image/jpeg' };

const STUB_PNG_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

function stub(): ImageBytes {
  return {
    bytes: new Uint8Array(Buffer.from(STUB_PNG_BASE64, 'base64')),
    mimeType: 'image/png',
  };
}

export type GenerateOptions = {
  prompt: string;
  width?: number;
  height?: number;
  model?: string;
};

const DEFAULT_MODEL = 'gemini-3-pro-image';
const GEMINI_OVERLOAD_FALLBACK_MODEL = 'gemini-2.5-flash-image';
const IMAGEN_FALLBACK_MODEL = 'imagen-3.0-generate-002';

function isOverloadError(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false;
  const e = err as Record<string, unknown>;
  const status =
    (typeof e.status === 'number' && e.status) ||
    (typeof e.statusCode === 'number' && e.statusCode) ||
    0;
  if (status === 503 || status === 429 || status === 529) return true;
  const msg = typeof e.message === 'string' ? e.message : '';
  return /\b(503|429|529)\b|UNAVAILABLE|overloaded|high demand/i.test(msg);
}

async function callGeminiImage(
  ai: GoogleGenAI,
  model: string,
  prompt: string,
): Promise<ImageBytes | null> {
  const response = await withRetry(
    () =>
      ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseModalities: ['IMAGE'],
        },
      }),
    { label: `gemini:${model}` },
  );
  const parts = response.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inline = (part as any).inlineData;
    if (inline?.data) {
      return {
        bytes: new Uint8Array(Buffer.from(inline.data, 'base64')),
        mimeType: (inline.mimeType as 'image/png' | 'image/jpeg') ?? 'image/png',
      };
    }
  }
  return null;
}

export async function generateHeroImage(opts: GenerateOptions): Promise<ImageBytes> {
  if (process.env.IMAGE_GEN_PROVIDER === 'stub' || !process.env.GOOGLE_GENAI_API_KEY) {
    return stub();
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });
  const model = opts.model || process.env.IMAGE_GEN_MODEL || DEFAULT_MODEL;

  // Path A — Gemini "Nano Banana" image-capable Flash model. Returns inline
  // image bytes inside a candidate's parts. If the primary model is
  // overloaded after retries, fall back to gemini-2.5-flash-image before
  // dropping to Imagen.
  if (model.startsWith('gemini')) {
    try {
      const img = await callGeminiImage(ai, model, opts.prompt);
      if (img) return img;
      // No inline image returned — try the fallback model before Imagen.
      if (model !== GEMINI_OVERLOAD_FALLBACK_MODEL) {
        console.warn(`[image-gen] ${model} returned no image; trying ${GEMINI_OVERLOAD_FALLBACK_MODEL}`);
        const fb = await callGeminiImage(ai, GEMINI_OVERLOAD_FALLBACK_MODEL, opts.prompt);
        if (fb) return fb;
      }
    } catch (err) {
      if (isOverloadError(err) && model !== GEMINI_OVERLOAD_FALLBACK_MODEL) {
        console.warn(
          `[image-gen] ${model} overloaded after retries; falling back to ${GEMINI_OVERLOAD_FALLBACK_MODEL}`,
        );
        try {
          const fb = await callGeminiImage(ai, GEMINI_OVERLOAD_FALLBACK_MODEL, opts.prompt);
          if (fb) return fb;
        } catch (fbErr) {
          console.warn('[image-gen] fallback model also failed:', fbErr);
        }
      } else {
        throw err;
      }
    }
    // Fall through to Imagen if neither Gemini model returned an inline image.
  }

  // Path B — Imagen 3 production model. The SDK shape differs by version;
  // be defensive and tolerate both `generatedImages[0].image.imageBytes`
  // (older) and `images[0].imageBytes` (newer).
  const imagenModel = model.startsWith('imagen') ? model : IMAGEN_FALLBACK_MODEL;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imagen: any = ai.models;
  if (typeof imagen.generateImages === 'function') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const out: any = await withRetry(
      () =>
        imagen.generateImages({
          model: imagenModel,
          prompt: opts.prompt,
          config: { numberOfImages: 1, aspectRatio: '16:9' },
        }),
      { label: `imagen:${imagenModel}` },
    );
    const candidate = out.generatedImages?.[0]?.image?.imageBytes ?? out.images?.[0]?.imageBytes;
    if (candidate) {
      return { bytes: new Uint8Array(Buffer.from(candidate, 'base64')), mimeType: 'image/png' };
    }
  }

  // Last-resort stub so the pipeline never wedges on an opaque provider error.
  console.warn('[image-gen] provider returned no image; using stub');
  return stub();
}
