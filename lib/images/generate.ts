import 'server-only';
import { GoogleGenAI } from '@google/genai';

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

const DEFAULT_MODEL = 'gemini-2.5-flash-image-preview';
const IMAGEN_FALLBACK_MODEL = 'imagen-3.0-generate-002';

export async function generateHeroImage(opts: GenerateOptions): Promise<ImageBytes> {
  if (process.env.IMAGE_GEN_PROVIDER === 'stub' || !process.env.GOOGLE_GENAI_API_KEY) {
    return stub();
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });
  const model = opts.model || process.env.IMAGE_GEN_MODEL || DEFAULT_MODEL;

  // Path A — Gemini "Nano Banana" image-capable Flash model. Returns inline
  // image bytes inside a candidate's parts.
  if (model.startsWith('gemini')) {
    const response = await ai.models.generateContent({
      model,
      contents: opts.prompt,
      config: {
        responseModalities: ['IMAGE'],
      },
    });
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
    // Fall through to Imagen if Gemini didn't return an inline image.
  }

  // Path B — Imagen 3 production model. The SDK shape differs by version;
  // be defensive and tolerate both `generatedImages[0].image.imageBytes`
  // (older) and `images[0].imageBytes` (newer).
  const imagenModel = model.startsWith('imagen') ? model : IMAGEN_FALLBACK_MODEL;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imagen: any = ai.models;
  if (typeof imagen.generateImages === 'function') {
    const out = await imagen.generateImages({
      model: imagenModel,
      prompt: opts.prompt,
      config: { numberOfImages: 1, aspectRatio: '16:9' },
    });
    const candidate = out.generatedImages?.[0]?.image?.imageBytes ?? out.images?.[0]?.imageBytes;
    if (candidate) {
      return { bytes: new Uint8Array(Buffer.from(candidate, 'base64')), mimeType: 'image/png' };
    }
  }

  // Last-resort stub so the pipeline never wedges on an opaque provider error.
  console.warn('[image-gen] provider returned no image; using stub');
  return stub();
}
