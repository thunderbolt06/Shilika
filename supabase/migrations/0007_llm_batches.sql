-- =====================================================================
-- llm_batches: tracks Anthropic Message Batches API submissions.
--
-- The writer and topic-research agents no longer call the Messages API
-- synchronously. Instead a "submit" cron enqueues an async batch and
-- records a row here; a "poll" cron (/api/cron/batch-poller) later
-- retrieves the results and finalizes them (draft + hero image, or
-- inserted content ideas).
--
--   request_map  custom_id -> context, e.g. { "idea-42": { "ideaId": 42 } }
--   status       pending  -> processed | failed | canceled
-- =====================================================================

create table if not exists llm_batches (
  id            bigserial primary key,
  provider      text not null default 'anthropic',
  kind          text not null check (kind in ('writer', 'topic_research')),
  batch_id      text not null unique,
  status        text not null default 'pending'
                  check (status in ('pending', 'processed', 'failed', 'canceled')),
  request_map   jsonb not null default '{}'::jsonb,
  meta          jsonb,
  result_summary jsonb,
  error         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  processed_at  timestamptz
);

create index if not exists llm_batches_status_created_idx
  on llm_batches (status, created_at);

alter table llm_batches enable row level security;
-- service-role only — no anon policy
