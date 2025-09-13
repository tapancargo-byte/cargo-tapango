-- KYC reviews table and policies (demo-friendly; tighten in production)
create table if not exists public.kyc_reviews (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  status text not null check (status in ('pending','approved','rejected')) default 'pending',
  reviewed_by text,
  reviewed_at timestamptz not null default now()
);
create index if not exists kyc_reviews_path_idx on public.kyc_reviews(path);

alter table public.kyc_reviews enable row level security;
create policy if not exists kyc_reviews_select_anon on public.kyc_reviews for select using (true);
create policy if not exists kyc_reviews_insert_anon on public.kyc_reviews for insert with check (true);
create policy if not exists kyc_reviews_update_anon on public.kyc_reviews for update using (true) with check (true);
