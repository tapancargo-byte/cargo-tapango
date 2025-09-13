-- DEV-ONLY: Open read access to orders for easier demos
-- DO NOT RUN IN PRODUCTION

alter table public.orders enable row level security;

-- Keep existing policies; this adds an additional permissive select for dev
create policy if not exists orders_select_anon_dev on public.orders
for select using (true);
