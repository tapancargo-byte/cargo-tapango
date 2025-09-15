# Supabase MCP Server – Setup Guide

This guide gets your Supabase (MCP) backend ready for the Tapango apps
(Customer/Driver) and Admin dashboard.

For a current overview of what’s implemented and our development vs production
RLS posture, see `docs/PROJECT_STATUS_AND_SUPABASE.md`.

## 1) Create project & get keys

- Create a new Supabase project.
- Get URL and anon key.
- For mobile set:
  - EXPO_PUBLIC_SUPABASE_URL
  - EXPO_PUBLIC_SUPABASE_ANON_KEY
- For Admin set:
  - VITE_SUPABASE_URL
  - VITE_SUPABASE_ANON_KEY

## 2) Apply migrations & seeds

Use the SQL editor or the Supabase CLI to run the SQL in these files:

- supabase/migrations/20250910_core_tables.sql
- supabase/migrations/20250910_policies.sql (demo policies)
- supabase/seeds/20250910_demo_data.sql (optional demo rows)
- supabase/migrations/20250910_policies_hardening.sql (production hardening: KYC
  storage + kyc_reviews)
- supabase/migrations/20250910_policies_hardening_phase2.sql (production
  hardening: orders + driver_offers)
- supabase/migrations/20250910_tracking_events_access.sql (tighten
  tracking_events; public RPC for per-tracking-id reads)
- supabase/migrations/20250910_policies_hardening_phase3_storage_prefix.sql
  (enforce per-user storage prefix for KYC uploads)
- supabase/migrations/20250910_dev_orders_open.sql (DEV-ONLY: open Orders select
  for demos)

CLI example:

```
supabase db push  # if configured, or paste files in SQL editor
```

## 3) Create storage bucket for KYC

- In Storage > Create bucket named "kyc" (public or with signed URLs based on
  your policy).
- The policies in 20250910_policies.sql grant basic select/insert/update/delete
  for the 'kyc' bucket.

## 4) Optional RPC for quotes

- The core migration adds public.get_quote RPC for quick demos. Adjust logic
  inside as needed.

## 5) Verify tables

- tracking_events (status:
  pending/confirmed/in-transit/delivered/delayed/cancelled)
- orders (status: Active/Past)
- driver_offers
- storage bucket: kyc

## 6) Wire the apps

- Mobile Customer
  - Quotes try Supabase RPC first, then fallback to HTTP/mock.
  - Tracking loads events from tracking_events when available.
  - Orders page lists orders from Supabase.
- Driver
  - Offers insert into driver_offers; queues offline if no network.
  - KYC uploads to Storage 'kyc'; queues offline if no network.
- Admin
  - Live Map uses Google Maps JS (VITE_GOOGLE_MAPS_API_KEY) and can pull data
    later.
  - Usage and KYC queue pages present basic UIs. With VITE*SUPABASE*\* set, KYC
    queue lists objects from bucket.

## 7) Security notes (adjust per production)

- Demo policies are permissive. Apply `20250910_policies_hardening.sql` to
  enforce admin-only access to KYC storage and kyc_reviews. Drivers must be
  authenticated to upload.
- Enforce per-user storage prefix for KYC: apply
  `20250910_policies_hardening_phase3_storage_prefix.sql`. The mobile app
  uploads to `${auth.uid()}/...` when signed in.
- Admin users require a custom JWT claim: set `app_metadata.app_role = "admin"`
  for the admin account in Supabase Auth. The Admin UI now requires sign-in and
  checks this claim.
- Tracking events: apply `20250910_tracking_events_access.sql`. Public reads are
  via RPC `get_tracking_events_public(tracking_id)`, while admins can query all
  rows directly.
- Orders in Customer app: by default, Orders are RLS-protected. For demos
  without Customer Supabase auth, either rely on the app’s demo fallback list or
  run `20250910_dev_orders_open.sql` in non-production to enable public selects
  temporarily.
- For storage, signed URLs are used for preview/download and only allowed for
  admins by policy.

## 8) Seeds to test quickly

- TPG123456789 has events seeded (tracking works immediately).
- Orders seeded for demo (Active + Past).

## 9) Troubleshooting

- CORS: Supabase JS with admin app should work out of the box; ensure project
  URL is reachable.
- Policies: if queries return 0 rows with no error, verify RLS + policies. For
  KYC listing, ensure you are signed in as admin and that
  `app_metadata.app_role = 'admin'`.
- Admin claim: Set via Dashboard > Auth > Users > Edit JSON (app_metadata) or
  via Admin API on your backend.
- Missing RPC: quotes fall back to mock if get_quote doesn't exist.
