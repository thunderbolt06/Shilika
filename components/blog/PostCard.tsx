import Link from 'next/link';
import type { BlogPost } from '@/lib/supabase/types';

export function PostCard({ post }: { post: BlogPost }) {
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block border-b border-ink/10 py-8 transition hover:border-ink"
    >
      <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-ink/60">
        <span>{date}</span>
        {post.tags.slice(0, 2).map((t) => (
          <span key={t} className="rounded-full border border-ink/20 px-3 py-1">
            {t}
          </span>
        ))}
      </div>
      <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ink md:text-4xl">
        {post.title}
      </h2>
      <p className="mt-3 max-w-prose text-ink/70">{post.description}</p>
      <span className="mt-4 inline-block font-mono text-xs uppercase tracking-widest text-rust group-hover:text-ink">
        Read playbook →
      </span>
    </Link>
  );
}
