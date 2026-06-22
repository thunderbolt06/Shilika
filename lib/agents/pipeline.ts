import 'server-only';
import { generateAndStoreHero } from '@/lib/images/pipeline';
import { getAdminSupabase } from '@/lib/supabase/server';
import type { DraftEnvelope } from './writer';

export type FinalizeResult = {
  ideaId: number;
  draft: DraftEnvelope;
  imageUrl: string | null;
  imageSizeKb: number | null;
  finalViolations: number;
};

/**
 * Mark an idea as claimed by a submitted writer batch so a parallel submit
 * doesn't pick it again. Called at batch-submit time.
 */
export async function claimIdeaForWriter(ideaId: number): Promise<void> {
  const supabase = getAdminSupabase();
  await supabase
    .from('content_ideas')
    .update({ status: 'draft', notes: 'writer batch submitted' })
    .eq('id', ideaId);
}

/** Roll a claimed idea back to 'idea' when its batch request failed. */
export async function rollbackIdea(ideaId: number, reason: string): Promise<void> {
  const supabase = getAdminSupabase();
  await supabase
    .from('content_ideas')
    .update({ status: 'idea', notes: `writer batch failed: ${reason.slice(0, 480)}` })
    .eq('id', ideaId);
}

/**
 * Finalize a writer batch result: generate + store the hero image, then write
 * the draft back to content_ideas as ready_for_review. This is the post-writer
 * half that used to live inline in runDraftPipeline; image generation (Gemini)
 * stays synchronous and runs here, inside the batch-poller cron.
 *
 * Image-gen failures are non-fatal — the draft still ships for review.
 */
export async function finalizeWriterDraft(args: {
  ideaId: number;
  draft: DraftEnvelope;
  imagePrompt: string;
  finalViolations: number;
}): Promise<FinalizeResult> {
  const { ideaId, draft, imagePrompt, finalViolations } = args;
  const supabase = getAdminSupabase();

  let imageUrl: string | null = null;
  let imageSizeKb: number | null = null;
  try {
    const img = await generateAndStoreHero({ slug: draft.slug, prompt: imagePrompt });
    imageUrl = img.url;
    imageSizeKb = img.sizeKb;
  } catch (err) {
    console.warn('[pipeline] hero image failed:', err);
  }

  const { error } = await supabase
    .from('content_ideas')
    .update({
      body: draft.body,
      slug: draft.slug,
      title: draft.title,
      description: draft.description,
      tags: draft.tags,
      related_posts: draft.related_posts,
      image_url: imageUrl,
      status: 'ready_for_review',
      notes: `humanization: ${finalViolations} violations (single-pass batch)${
        imageUrl ? `; image ${imageSizeKb}kb` : '; no image'
      }`,
    })
    .eq('id', ideaId);
  if (error) throw new Error(`failed to save draft: ${error.message}`);

  return { ideaId, draft, imageUrl, imageSizeKb, finalViolations };
}
