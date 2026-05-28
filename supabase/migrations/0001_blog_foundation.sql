-- =====================================================================
-- Phase 1 schema: blog publishing + content pipeline + analytics + KB
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- authors: real human bylines for E-E-A-T
-- ---------------------------------------------------------------------
create table if not exists authors (
  slug         text primary key check (slug ~ '^[a-z0-9-]+$'),
  name         text not null,
  title        text not null default '',
  bio          text not null default '',
  image_url    text,
  url          text not null,
  same_as      text[] not null default '{}',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- blog_posts: source of truth for the public site
-- ---------------------------------------------------------------------
create table if not exists blog_posts (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null check (slug ~ '^[a-z0-9-]+$'),
  title           text not null,
  description     text not null,
  body            text not null,                  -- markdown
  image           text,                            -- public storage URL
  author          text not null default 'Shilika Jain',
  author_slug     text references authors(slug) on delete set null,
  tags            text[] not null default '{}',
  related_posts   text[] not null default '{}',   -- array of slugs
  cta_label       text default 'Book a 30-min teardown with Shilika',
  cta_url         text default 'https://calendly.com/shilikajain/30min/',
  published       boolean not null default false,
  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists blog_posts_published_idx
  on blog_posts (published, published_at desc);
create index if not exists blog_posts_slug_idx on blog_posts (slug);
create index if not exists blog_posts_tags_idx on blog_posts using gin (tags);

-- ---------------------------------------------------------------------
-- content_ideas: pipeline state (idea → draft → review → approved → published)
-- ---------------------------------------------------------------------
create table if not exists content_ideas (
  id                 bigserial primary key,
  title              text not null,
  description        text,
  body               text,
  status             text not null default 'idea'
    check (status in ('idea', 'draft', 'ready_for_review', 'approved', 'published', 'archived')),
  product_id         int,
  content_type       text default 'blog_post',
  tags               text[] not null default '{}',
  priority           int not null default 3,
  image_url          text,
  slug               text,
  related_posts      text[] not null default '{}',
  notes              text,
  parent_content_id  bigint references content_ideas(id) on delete set null,
  reviewed_by        text,
  reviewed_at        timestamptz,
  published_url      text,
  source_signals     jsonb,                       -- GSC/competitor/community signals that triggered the idea
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index if not exists content_ideas_status_priority_idx
  on content_ideas (status, priority);
create index if not exists content_ideas_parent_idx on content_ideas (parent_content_id);

-- ---------------------------------------------------------------------
-- knowledge_base: case studies + human notes + brand voice + long-tail seeds
-- This is what the agents read to ground topic selection and writing.
-- ---------------------------------------------------------------------
create table if not exists knowledge_base (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  kind        text not null
    check (kind in ('case_study', 'human_note', 'transcript', 'snippet', 'brand_voice', 'long_tail_seed')),
  body        text not null,
  tags        text[] not null default '{}',
  source_url  text,
  metadata    jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists knowledge_base_kind_idx on knowledge_base (kind);
create index if not exists knowledge_base_tags_idx on knowledge_base using gin (tags);

-- ---------------------------------------------------------------------
-- analytics_search_console: GSC daily pull
-- ---------------------------------------------------------------------
create table if not exists analytics_search_console (
  query         text not null,
  page          text,
  impressions   int not null default 0,
  clicks        int not null default 0,
  ctr           numeric(6,4) not null default 0,
  avg_position  numeric(6,2) not null default 0,
  date          date not null,
  primary key (query, page, date)
);

create index if not exists gsc_page_date_idx
  on analytics_search_console (page, date desc);
create index if not exists gsc_date_impressions_idx
  on analytics_search_console (date desc, impressions desc);

-- ---------------------------------------------------------------------
-- content_metrics: per-page GA data joined to blog rows
-- ---------------------------------------------------------------------
create table if not exists content_metrics (
  content_id            bigint references content_ideas(id) on delete set null,
  post_id               uuid references blog_posts(id) on delete set null,
  page_path             text not null,
  sessions              int not null default 0,
  engaged_sessions      int not null default 0,
  avg_session_duration  numeric(8,2) not null default 0,
  signups_attributed    int not null default 0,
  date                  date not null,
  primary key (page_path, date)
);

create index if not exists content_metrics_post_date_idx
  on content_metrics (post_id, date desc);

-- ---------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

do $$
declare
  t text;
begin
  foreach t in array array['authors', 'blog_posts', 'content_ideas', 'knowledge_base']
  loop
    execute format(
      'drop trigger if exists trg_set_updated_at on %I; ' ||
      'create trigger trg_set_updated_at before update on %I ' ||
      'for each row execute function set_updated_at();',
      t, t
    );
  end loop;
end$$;

-- ---------------------------------------------------------------------
-- RLS: anon reads published content + author profiles only.
-- Everything else is service-role only (the secret key bypasses RLS).
-- ---------------------------------------------------------------------
alter table authors                  enable row level security;
alter table blog_posts               enable row level security;
alter table content_ideas            enable row level security;
alter table knowledge_base           enable row level security;
alter table analytics_search_console enable row level security;
alter table content_metrics          enable row level security;

-- authors: anon read
drop policy if exists authors_anon_read on authors;
create policy authors_anon_read on authors for select to anon using (true);

-- blog_posts: anon reads only published rows
drop policy if exists blog_posts_anon_read_published on blog_posts;
create policy blog_posts_anon_read_published
  on blog_posts for select to anon
  using (published = true);

-- (no anon policies for the other tables — service role only)
