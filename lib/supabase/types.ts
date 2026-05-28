// Hand-written types for Phase 1. Run `pnpm db:types` after migration to
// regenerate from the live schema once supabase CLI is wired up.

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  image: string | null;
  author: string;
  author_slug: string | null;
  tags: string[];
  related_posts: string[];
  cta_label: string | null;
  cta_url: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ContentIdea = {
  id: number;
  title: string;
  description: string | null;
  body: string | null;
  status:
    | 'idea'
    | 'draft'
    | 'ready_for_review'
    | 'approved'
    | 'published'
    | 'archived';
  product_id: number | null;
  content_type: string | null;
  tags: string[];
  priority: number;
  image_url: string | null;
  slug: string | null;
  related_posts: string[];
  notes: string | null;
  parent_content_id: number | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  published_url: string | null;
  source_signals: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
};

export type Author = {
  slug: string;
  name: string;
  title: string;
  bio: string;
  image_url: string | null;
  url: string;
  same_as: string[];
  created_at: string;
  updated_at: string;
};

export type KnowledgeEntry = {
  id: string;
  title: string;
  kind:
    | 'case_study'
    | 'human_note'
    | 'transcript'
    | 'snippet'
    | 'brand_voice'
    | 'long_tail_seed';
  body: string;
  tags: string[];
  source_url: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
};

export type SearchConsoleRow = {
  query: string;
  page: string | null;
  impressions: number;
  clicks: number;
  ctr: number;
  avg_position: number;
  date: string;
};

export type ContentMetric = {
  content_id: number | null;
  post_id: string | null;
  page_path: string;
  sessions: number;
  engaged_sessions: number;
  avg_session_duration: number;
  signups_attributed: number;
  date: string;
};
