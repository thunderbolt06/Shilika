import { AdminShell } from '@/components/admin/AdminShell';
import { PostsClient } from './PostsClient';

export const dynamic = 'force-dynamic';

export default function PostsPage() {
  return (
    <AdminShell current="/admin/blog/posts">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-ink/60">Catalog</p>
        <h1 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">
          Blog posts
        </h1>
        <p className="mt-3 max-w-2xl text-ink/70">
          Every row in <code className="rounded bg-ink/5 px-1.5">blog_posts</code>. Edit metadata,
          publish or unpublish, regenerate hero images, delete.
        </p>
      </div>
      <PostsClient />
    </AdminShell>
  );
}
