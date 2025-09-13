-- Enable RLS and add basic policies for anon read + insert via anon for offers/track (adjust per need)

-- tracking_events: allow read to anon
alter table public.tracking_events enable row level security;
create policy if not exists tracking_events_select_anon on public.tracking_events
for select using (true);

-- orders: allow select to anon (read-only)
alter table public.orders enable row level security;
create policy if not exists orders_select_anon on public.orders
for select using (true);

-- driver_offers: allow insert to anon, no select (or allow select if needed)
alter table public.driver_offers enable row level security;
create policy if not exists driver_offers_insert_anon on public.driver_offers
for insert with check (true);
create policy if not exists driver_offers_select_anon on public.driver_offers
for select using (true);

-- Storage policies for bucket "kyc"
-- Run in Storage Policies section if using dashboard; here is SQL form:
-- Ensure bucket exists:
-- select * from storage.buckets where id = 'kyc';
-- if not exists, create via Dashboard. Then:

create policy if not exists kyc_read on storage.objects for select
  using ( bucket_id = 'kyc' );
create policy if not exists kyc_insert on storage.objects for insert
  with check ( bucket_id = 'kyc' );
create policy if not exists kyc_update on storage.objects for update
  using ( bucket_id = 'kyc' );
create policy if not exists kyc_delete on storage.objects for delete
  using ( bucket_id = 'kyc' );
