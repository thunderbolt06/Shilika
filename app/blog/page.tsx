import type { Metadata } from 'next';
import { listPublishedPosts } from '@/lib/blog';
import type { BlogPost } from '@/lib/supabase/types';
import { PostCard } from '@/components/blog/PostCard';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Playbooks — field notes on Web3 PR, AI PR, and embargo strategy',
  description:
    'Field notes from inside Web3 and AI PR — embargo strategy, tier-1 placement playbooks, APAC localisation, crisis comms, and KOL wave design.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Shilika Jain — Playbooks',
    description:
      'Field notes from inside Web3 and AI PR. Tier-1 placement, embargo strategy, KOL waves, APAC.',
    url: `${SITE_URL}/blog`,
    type: 'website',
  },
};

export default async function BlogIndexPage() {
  let posts: BlogPost[] = [];
  try {
    posts = await listPublishedPosts();
  } catch {
    // Supabase unreachable at build/runtime — render empty state.
  }

  return (
    <div className="mx-auto max-w-4xl px-6 pb-20 pt-16">
      <p className="font-mono text-xs uppercase tracking-widest text-ink/60">
        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-rust align-middle" />
        Field notes
      </p>
      <h1 className="mt-4 font-serif text-5xl leading-none tracking-tight md:text-7xl">
        Playbooks for founders building in <em>public</em>.
      </h1>
      <p className="mt-6 max-w-prose text-lg text-ink/70">
        Embargo strategy, tier-1 placement playbooks, APAC localisation, crisis communications,
        and KOL wave design — drawn from six years and 50+ launches.
      </p>

      <div className="mt-16">
        {posts.length === 0 ? (
          <p className="font-mono text-sm uppercase tracking-widest text-ink/50">
            New playbooks are being prepped. Check back soon.
          </p>
        ) : (
          posts.map((p) => <PostCard key={p.id} post={p} />)
        )}
      </div>
    </div>
  );
}
