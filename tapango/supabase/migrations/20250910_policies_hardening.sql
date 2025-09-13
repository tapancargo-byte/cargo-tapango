-- RLS Hardening for production: tighten access using JWT app_role claims
-- This migration drops permissive demo policies and adds admin-scoped rules.
-- Requirement: Admin users must have app_metadata.app_role = 'admin' in Supabase Auth.

-- KYC reviews table: admin-only read/write
alter table public.kyc_reviews enable row level security;

drop policy if exists kyc_reviews_select_anon on public.kyc_reviews;
drop policy if exists kyc_reviews_insert_anon on public.kyc_reviews;
drop policy if exists kyc_reviews_update_anon on public.kyc_reviews;

create policy kyc_reviews_select_admin on public.kyc_reviews
for select using ( coalesce((auth.jwt() -> 'app_metadata' ->> 'app_role'), '') = 'admin' );

create policy kyc_reviews_insert_admin on public.kyc_reviews
for insert with check ( coalesce((auth.jwt() -> 'app_metadata' ->> 'app_role'), '') = 'admin' );

create policy kyc_reviews_update_admin on public.kyc_reviews
for update using ( coalesce((auth.jwt() -> 'app_metadata' ->> 'app_role'), '') = 'admin' )
with check ( coalesce((auth.jwt() -> 'app_metadata' ->> 'app_role'), '') = 'admin' );

-- Storage policies for bucket "kyc":
-- Admins can list/update/delete. Any authenticated user may upload (recommended for drivers).
-- Note: Once driver auth is rolled out, consider tightening insert to enforce path prefix per auth.uid().

-- Ensure RLS is on for storage.objects (it is by default in Supabase projects)

-- Drop permissive demo policies if present
drop policy if exists kyc_read on storage.objects;
drop policy if exists kyc_insert on storage.objects;
drop policy if exists kyc_update on storage.objects;
drop policy if exists kyc_delete on storage.objects;

-- Admin-only read/update/delete
create policy kyc_select_admin on storage.objects
for select using (
  bucket_id = 'kyc'
and coalesce((auth.jwt() -> 'app_metadata' ->> 'app_role'), '') = 'admin'
);

create policy kyc_update_admin on storage.objects
for update using (
  bucket_id = 'kyc'
and coalesce((auth.jwt() -> 'app_metadata' ->> 'app_role'), '') = 'admin'
);

create policy kyc_delete_admin on storage.objects
for delete using (
  bucket_id = 'kyc'
and coalesce((auth.jwt() -> 'app_metadata' ->> 'app_role'), '') = 'admin'
);

-- Authenticated uploads (drivers)
create policy kyc_insert_authenticated on storage.objects
for insert with check (
  bucket_id = 'kyc'
  and auth.role() = 'authenticated'
);
