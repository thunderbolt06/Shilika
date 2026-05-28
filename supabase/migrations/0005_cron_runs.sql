-- =====================================================================
-- cron_runs: ledger of every cron invocation.
-- Used by /admin/cron to show last-run / last-error / cadence.
-- =====================================================================

create table if not exists cron_runs (
  id           bigserial primary key,
  name         text not null,
  started_at   timestamptz not null,
  finished_at  timestamptz,
  status       text not null check (status in ('success', 'partial', 'error')),
  summary      jsonb,
  error        text,
  created_at   timestamptz not null default now()
);

create index if not exists cron_runs_name_started_idx
  on cron_runs (name, started_at desc);

alter table cron_runs enable row level security;
-- service-role only — no anon policy
