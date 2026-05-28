-- =====================================================================
-- Storage bucket: blog media (hero images, screenshots, knowledge attachments)
-- =====================================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  10485760,    -- 10 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- ---------------------------------------------------------------------
-- Policies
--   - anon can read any object in `media` (it's a public bucket anyway)
--   - only the service role can write (admin uploads, cron jobs)
-- The service role bypasses RLS, so no explicit insert/update/delete
-- policies are needed for admin paths.
-- ---------------------------------------------------------------------
drop policy if exists media_anon_read on storage.objects;
create policy media_anon_read
  on storage.objects for select to anon
  using (bucket_id = 'media');
