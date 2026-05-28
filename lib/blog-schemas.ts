import { z } from 'zod';

const SLUG = z.string().regex(/^[a-z0-9-]+$/, 'lowercase letters, numbers, hyphens only');

export const BlogPostInsert = z.object({
  slug: SLUG.min(3).max(80),
  title: z.string().min(8).max(160),
  description: z.string().min(40).max(300),
  body: z.string().min(200),
  image: z.string().url().nullable().optional(),
  author: z.string().default('Shilika Jain'),
  author_slug: z.string().nullable().optional(),
  tags: z.array(z.string().min(1)).max(8).default([]),
  related_posts: z.array(SLUG).max(6).default([]),
  cta_label: z.string().nullable().optional(),
  cta_url: z.string().url().nullable().optional(),
  published: z.boolean().default(false),
  published_at: z.string().datetime().nullable().optional(),
});

export const BlogPostUpdate = BlogPostInsert.partial();

export const ContentIdeaInsert = z.object({
  title: z.string().min(4).max(300),
  description: z.string().nullable().optional(),
  body: z.string().nullable().optional(),
  status: z
    .enum(['idea', 'draft', 'ready_for_review', 'approved', 'published', 'archived'])
    .default('idea'),
  tags: z.array(z.string().min(1)).max(8).default([]),
  priority: z.number().int().min(0).max(5).default(3),
  slug: SLUG.nullable().optional(),
  related_posts: z.array(SLUG).max(6).default([]),
  notes: z.string().nullable().optional(),
  parent_content_id: z.number().int().nullable().optional(),
  source_signals: z.record(z.string(), z.unknown()).nullable().optional(),
});

export const ContentIdeaUpdate = ContentIdeaInsert.partial();
