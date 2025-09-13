-- Supabase migration: Core tables and RPC
-- Tracking events table
create table if not exists public.tracking_events (
  id uuid primary key default gen_random_uuid(),
  tracking_id text not null,
  timestamp timestamptz not null default now(),
  location text not null,
  description text not null,
  status text not null check (status in ('pending','confirmed','in-transit','delivered','delayed','cancelled'))
);
create index if not exists tracking_events_tracking_id_idx on public.tracking_events(tracking_id);

-- Orders table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  route text not null,
  price numeric not null,
  updated_at timestamptz not null default now(),
  status text not null check (status in ('Active','Past'))
);
create index if not exists orders_user_id_idx on public.orders(user_id);

-- Driver offers table
create table if not exists public.driver_offers (
  id uuid primary key default gen_random_uuid(),
  tracking_id text not null,
  amount_inr numeric not null,
  note text,
  created_at timestamptz not null default now()
);
create index if not exists driver_offers_tracking_idx on public.driver_offers(tracking_id);

-- KYC storage bucket (create via dashboard) expected as 'kyc'

-- RPC: get_quote (demo computation; adjust to your logic)
create or replace function public.get_quote(
  p_pickup jsonb,
  p_delivery jsonb,
  p_weightkg numeric,
  p_dims jsonb,
  p_cargotype text
) returns jsonb
language plpgsql
as $$
declare
  v_base numeric := greatest(p_weightkg, coalesce((p_dims->>'l')::numeric * (p_dims->>'w')::numeric * (p_dims->>'h')::numeric / 5000, 0));
  v_amount numeric := round(coalesce(v_base,0) * 50 * 1.2, 2); -- base ₹50/kg with factor
begin
  return jsonb_build_object(
    'quoteId', encode(gen_random_bytes(6), 'hex'),
    'amount', v_amount,
    'currency', 'INR',
    'breakdown', jsonb_build_array(
      jsonb_build_object('label','Base (₹50/kg)','amount', round(coalesce(v_base,0)*50,2)),
      jsonb_build_object('label','Factor','amount', round(v_amount - round(coalesce(v_base,0)*50,2),2))
    )
  );
end;
$$;
