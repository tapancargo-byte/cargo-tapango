-- RLS Hardening Phase 2: orders and driver_offers
-- Tighten policies using auth.uid() and app_role claim

-- ORDERS: user can read their own orders; admins can read all
alter table public.orders enable row level security;

drop policy if exists orders_select_anon on public.orders;

create policy orders_select_self_or_admin on public.orders
for select using (
coalesce((auth.jwt() -> 'app_metadata' ->> 'app_role'), '') = 'admin'
  or user_id = auth.uid()
);

-- DRIVER_OFFERS: only authenticated can insert; only admins can read/update/delete
alter table public.driver_offers enable row level security;

drop policy if exists driver_offers_insert_anon on public.driver_offers;
drop policy if exists driver_offers_select_anon on public.driver_offers;

create policy driver_offers_insert_authenticated on public.driver_offers
for insert with check ( auth.role() = 'authenticated' );

create policy driver_offers_select_admin on public.driver_offers
for select using ( coalesce((auth.jwt() -> 'app_metadata' ->> 'app_role'), '') = 'admin' );

create policy driver_offers_update_admin on public.driver_offers
for update using ( coalesce((auth.jwt() -> 'app_metadata' ->> 'app_role'), '') = 'admin' )
with check ( coalesce((auth.jwt() -> 'app_metadata' ->> 'app_role'), '') = 'admin' );

create policy driver_offers_delete_admin on public.driver_offers
for delete using ( coalesce((auth.jwt() -> 'app_metadata' ->> 'app_role'), '') = 'admin' );
