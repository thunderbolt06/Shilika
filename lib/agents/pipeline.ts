import 'server-only';
import { generateAndStoreHero } from '@/lib/images/pipeline';
import { getAdminSupabase } from '@/lib/supabase/server';
import { writeDraftForIdea, type WriterResult } from './writer';

export type PipelineResult = {
  ideaId: number;
  draft: WriterResult['draft'];
  imageUrl: string | null;
  imageSizeKb: number | null;
  humanizationPasses: number;
  finalViolations: number;
};

/**
 * End-to-end "idea → ready_for_review" pipeline:
 *   1. Mark the idea as in-flight
 *   2. Run the writer (Claude + humanization loop)
 *   3. Generate the hero image
 *   4. Write the result back to content_ideas with status='ready_for_review'
 *
 * Idempotent on idempotent inputs — re-running on the same idea overwrites
 * the previous draft. Failures roll the status back to 'idea' with a note.
 */
export async function runDraftPipeline(ideaId: number): Promise<PipelineResult> {
  const supabase = getAdminSupabase();

  // Stake a claim on the row so a parallel writer doesn't pick the same idea.
  await supabase
    .from('content_ideas')
    .update({ status: 'draft', notes: 'writer started' })
    .eq('id', ideaId);

  try {
    const writerResult = await writeDraftForIdea(ideaId);

    let imageUrl: string | null = null;
    let imageSizeKb: number | null = null;
    try {
      const heroSlug = writerResult.draft.slug;
      const img = await generateAndStoreHero({
        slug: heroSlug,
        prompt: writerResult.imagePrompt,
      });
      imageUrl = img.url;
      imageSizeKb = img.sizeKb;
    } catch (err) {
      // Image gen failures are non-fatal; the draft still ships for review.
      console.warn('[pipeline] hero image failed:', err);
    }

    const { error } = await supabase
      .from('content_ideas')
      .update({
        body: writerResult.draft.body,
        slug: writerResult.draft.slug,
        title: writerResult.draft.title,
        description: writerResult.draft.description,
        tags: writerResult.draft.tags,
        related_posts: writerResult.draft.related_posts,
        image_url: imageUrl,
        status: 'ready_for_review',
        notes: `humanization: ${writerResult.finalViolations} violations in ${writerResult.passes} pass(es)${
          imageUrl ? `; image ${imageSizeKb}kb` : '; no image'
        }`,
      })
      .eq('id', ideaId);
    if (error) throw new Error(`failed to save draft: ${error.message}`);

    return {
      ideaId,
      draft: writerResult.draft,
      imageUrl,
      imageSizeKb,
      humanizationPasses: writerResult.passes,
      finalViolations: writerResult.finalViolations,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await supabase
      .from('content_ideas')
      .update({
        status: 'idea',
        notes: `writer failed: ${message.slice(0, 480)}`,
      })
      .eq('id', ideaId);
    throw err;
  }
}
