-- Create table to store Expo push tokens associated with a user
-- This migration is safe to run multiple times

create table if not exists public.push_tokens (
  id uuid primary key default gen_random_uuid(),
  user_external_id text, -- e.g., Clerk user id or app-specific external id
  token text not null unique,
  platform text check (platform in ('ios','android','web')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists push_tokens_user_external_id_idx on public.push_tokens (user_external_id);

-- Updated_at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_push_tokens_updated_at
before update on public.push_tokens
for each row execute procedure public.set_updated_at();
