-- Enforce per-user prefix for KYC uploads
-- Only authenticated users may upload to bucket 'kyc', and object name must start with auth.uid() || '/'

-- Drop previous insert policy if it exists
drop policy if exists kyc_insert_authenticated on storage.objects;

create policy kyc_insert_authenticated_prefix on storage.objects
for insert with check (
  bucket_id = 'kyc'
  and auth.role() = 'authenticated'
  and left(name, length(auth.uid()::text) + 1) = auth.uid()::text || '/'
);
