import 'server-only';
import { getAdminSupabase, getServerSupabase } from './supabase/server';
import type { Author, BlogPost } from './supabase/types';

export async function listPublishedPosts(): Promise<BlogPost[]> {
  const supabase = await getServerSupabase();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as BlogPost[];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await getServerSupabase();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();
  if (error) throw error;
  return (data as BlogPost | null) ?? null;
}

export async function getRelatedPosts(slugs: string[]): Promise<BlogPost[]> {
  if (!slugs.length) return [];
  const supabase = await getServerSupabase();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .in('slug', slugs)
    .eq('published', true);
  if (error) throw error;
  return (data ?? []) as BlogPost[];
}

export async function getAuthor(slug: string | null): Promise<Author | null> {
  if (!slug) return null;
  const supabase = await getServerSupabase();
  const { data, error } = await supabase
    .from('authors')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return (data as Author | null) ?? null;
}

export async function listAllPublishedSlugs(): Promise<{ slug: string; updated_at: string }[]> {
  const supabase = getAdminSupabase();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .eq('published', true);
  if (error) throw error;
  return (data ?? []) as { slug: string; updated_at: string }[];
}
