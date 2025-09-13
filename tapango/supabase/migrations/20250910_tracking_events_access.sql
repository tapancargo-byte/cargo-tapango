-- Tracking events access tightening while preserving public tracking via RPC
-- Drops anon-wide select policy and adds a SECURITY DEFINER RPC for per-tracking-id reads.

alter table public.tracking_events enable row level security;

-- Drop permissive policy if present
drop policy if exists tracking_events_select_anon on public.tracking_events;

-- Admins may read all tracking events
drop policy if exists tracking_events_select_admin on public.tracking_events;
create policy tracking_events_select_admin on public.tracking_events
for select using ( coalesce((auth.jwt() -> 'app_metadata' ->> 'app_role'), '') = 'admin' );

-- Public RPC for reading a single tracking id's events
create or replace function public.get_tracking_events_public(p_tracking_id text)
returns setof public.tracking_events
language sql
security definer
set search_path = public
as $$
  select *
  from public.tracking_events
  where tracking_id = p_tracking_id
  order by timestamp desc;
$$;

grant execute on function public.get_tracking_events_public(text) to anon, authenticated;
