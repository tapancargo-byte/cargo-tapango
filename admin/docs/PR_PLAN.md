# PR: Admin Dashboard stability and Supabase alignment

## Summary
- Fixes profile loading hang by eliminating recursive RLS and provisioning profile first (provisional UI state; non-blocking ensure).
- Aligns Supabase schema: created_at on tracking_events, FK names for embeds, admin/read policies, owner-scoped policies, helper functions.
- Adds error instrumentation across data hooks and centralized logger.
- Adds ToastProvider and viewport for surfacing UI errors.
- Adds performance indexes on common list views.
- Adds PowerShell smoke tests to verify endpoints (with x-request-id).
- Generates Supabase TypeScript types and switches the codebase to use src/types/supabase.gen.ts.

## Changes
- admin/src/providers/AuthProvider.tsx: provisional profile now gated behind VITE_ALLOW_PROVISIONAL_ADMIN (default off), ensure-first, ignore INITIAL_SESSION, non-blocking fetch, logs.
- admin/src/App.tsx: ToastProvider + ToastViewport; route-level code-splitting via React.lazy.
- admin/src/lib/supabase.ts: logSupabaseError helper.
- admin/src/hooks/*: instrument errors with context.
- admin/scripts/supabase-smoke-tests.ps1: endpoint checks; logs x-request-id.
- admin/src/types/supabase.gen.ts: generated DB types.
- DB migrations (applied via MCP):
  - tracking_events.created_at + index
  - policies for profiles (claim-based), orders, invoices, notifications, drivers, tracking_events
  - helper functions (non-recursive)
  - indexes for profiles/created_at, orders, invoices, notifications

## Test Plan
- Sign in as admin: dashboard renders immediately, AuthGuard shows isSuperAdmin=true.
- No console 400/500; lists load.
- Run smoke tests (PowerShell):
  $env:SUPABASE_URL=https://<project>.supabase.co
  $env:SUPABASE_ANON_KEY={{SUPABASE_ANON_KEY}}
  $env:SUPABASE_BEARER_TOKEN={{BEARER_TOKEN}}
  ./scripts/supabase-smoke-tests.ps1

## Follow-ups
- RLS verification with non-admin session.
- Remove provisional admin logic once production auth flows are finalized.
- Optional: add UI to show last x-request-id for failed requests.
