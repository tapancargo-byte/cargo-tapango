# Project status and Supabase policy posture (development vs production)

This document summarizes what has been implemented across the apps (customer,
driver, admin), the current Supabase schema and Row Level Security (RLS)
posture, and how we will harden the database when moving to production. For now,
the project is in development, so a dev-only policy is enabled to simplify
demos.

## Current status (high level)

- Customer Mobile App

  - Booking with Google Places autocomplete and geocoding (feature-flagged via
    EXPO_PUBLIC_FEATURE_PLACES)
  - Quote requests via Supabase RPC with fallback
  - Tracking screen via secured tracking events RPC
  - Orders screen fetches Orders; prompts optional Supabase sign-in for
    user-scoped access
  - Offline queue support and basic accessibility improvements

- Driver Mobile App

  - Tabs scaffold: Jobs, Bid, Wallet, Profile, KYC
  - Driver offers: offline queuing and sync to Supabase
  - KYC photo uploads queued and stored in Supabase bucket
  - Supabase auth (email/password) with queue draining after sign-in

- Admin Web App

  - Dashboard scaffold including Live Map and Usage monitor
  - KYC review queue requiring admin role (app_role = admin)
  - Signed URL previews, approve/reject flows

- Backend: Supabase schema and security

  - Core tables: orders, tracking_events, driver_offers, kyc_reviews
  - RLS progressively hardened (details below)
  - Public tracking via security-definer RPC: get_tracking_events_public(text)

- Tests and CI
  - Unit tests for driver offers offline enqueueing and tracking RPC fallback
  - Playwright admin KYC UI tests; Detox E2E scaffold (disabled in CI for now)

## Supabase environment

- Project URL: https://ehlzbibwyqxowhwxpuoh.supabase.co
- Mobile env vars
  - EXPO_PUBLIC_SUPABASE_URL
  - EXPO_PUBLIC_SUPABASE_ANON_KEY
- Admin env vars
  - VITE_SUPABASE_URL
  - VITE_SUPABASE_ANON_KEY
  - VITE_GOOGLE_MAPS_API_KEY

## Migrations applied

The following migrations were applied (in this order):

1. 20250910_enable_extensions

- Ensures pgcrypto (and uuid-ossp) for gen_random_uuid()/gen_random_bytes()

2. 20250910_core_tables

- Creates tables: tracking_events, orders, driver_offers
- Adds RPC: get_quote(...)

3. 20250910_kyc_reviews

- Creates kyc_reviews table with demo-friendly policies (later hardened)

4. 20250910_policies

- Initial permissive policies (anon reads; anon insert for driver_offers;
  storage policies for kyc bucket)

5. 20250910_policies_hardening

- KYC: admin-only read/update/delete; authenticated insert to kyc bucket

6. 20250910_policies_hardening_phase2

- Orders: allow select by owner (user_id = auth.uid()) or admin
- Driver offers: only authenticated insert; admin can read/update/delete

7. 20250910_tracking_events_access

- Drops anon-wide read on tracking_events; adds security-definer RPC
  get_tracking_events_public(text)
- Admin can read all tracking_events

8. 20250910_policies_hardening_phase3_storage_prefix

- Enforces per-user path prefix for kyc bucket inserts (name must start with
  auth.uid() || "/")

9. 20250910_dev_orders_open (dev only)

- Adds orders_select_anon_dev to permit anonymous SELECT on public.orders for
  development/demo

Notes

- Ensure a storage bucket named kyc exists in your project, since policies
  target that bucket.

## Current development posture (intended)

- Orders
  - Effective policies: owners (auth.uid()) or admins can read; PLUS dev-only
    orders_select_anon_dev allowing anonymous reads for demos
- Driver offers
  - Authenticated users can insert; admins can read/update/delete
- Tracking events
  - Public read available only through RPC get_tracking_events_public(text)
  - Admin can read all directly
- KYC (table and storage)
  - kyc_reviews table is admin-only for read/write
  - storage.objects policies (bucket = 'kyc'): admin read/update/delete;
    authenticated inserts only, and object names must be prefixed by auth.uid()/

## Production hardening plan (to execute before release)

- Remove dev-only Orders policy
  - Ensure the following policy is NOT present in production:
    orders_select_anon_dev
- Keep hardened RLS
  - Orders: owners or admins only
  - Driver offers: authenticated insert; admin read/update/delete
  - Tracking events: admin read; public read via RPC only
  - KYC: admin-only table access; storage inserts restricted to user prefix
- Admin role claim
  - Ensure admin users carry app_metadata.app_role = 'admin' so policies
    evaluate correctly
- Validate storage
  - Confirm bucket 'kyc' exists and policies behave as expected with per-user
    path prefix
- Re-run security and performance advisors after changes
- Regenerate TypeScript types to ensure client types are in sync

## How to toggle development vs production posture

- Development (current)
  - Keep orders_select_anon_dev to allow demos without requiring sign-in
- Production (hardened)
  - Drop orders_select_anon_dev and rely on user_id and admin-scoped access only

Example SQL (drop dev policy when hardening)

```sql path=null start=null
drop policy if exists orders_select_anon_dev on public.orders;
```

## Optional commands and checks

- Apply migrations via CLI

```bash path=null start=null
# Login (non-interactive example uses env var)
# $env:SUPABASE_ACCESS_TOKEN = "{{SUPABASE_ACCESS_TOKEN}}"
# npx supabase --version
# npx supabase link --project-ref {{PROJECT_REF}}
# npx supabase db push
```

- Regenerate TypeScript types for clients

```bash path=null start=null
# Typically via management tooling, or generate via CLI if configured
# npx supabase gen types typescript --project-id {{PROJECT_REF}} > supabase.types.ts
```

- Advisor checks (security and performance)

```bash path=null start=null
# Run through Supabase management/advisory tools to detect missing RLS, unused indexes, etc.
```

## Verification checklist

- Orders
  - Dev: anonymous SELECT returns demo data
  - Prod: only owner/admin can read orders
- Driver offers
  - Anonymous insert should fail; authenticated insert should succeed
  - Admin can list/update/delete
- Tracking events
  - Public RPC get_tracking_events_public returns only by tracking_id
  - Direct table SELECT requires admin
- KYC
  - Only admins see and update kyc_reviews
  - Storage uploads require authenticated user; object name must be
    auth.uid()/...

## Related documentation

- docs/SUPABASE_SETUP_GUIDE.md
- docs/GOOGLE_PLACES_KEY_SETUP.md
- PRODUCTION_SETUP.md
- QUICK_PRODUCTION_UPGRADE.md

If you want, we can add a small script to automatically drop the dev-only policy
as part of a release workflow, or guard it behind an environment-specific
migration path.
