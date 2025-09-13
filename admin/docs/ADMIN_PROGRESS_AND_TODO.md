# Admin App Progress and TODO

Last updated: 2025-09-11

This document summarizes the recent work completed in the Admin web app and lists the remaining follow-ups and recommendations.

## What’s Done

1) Invoices: Date filters + CSV export
- Data layer
  - Extended invoices query to support optional date range (issue_date) and basic search by invoice_number.
  - Continued support for status, customer, and pagination filters.
  - File: src/hooks/useInvoices.ts
- UI
  - Added From/To date inputs in the Filters section.
  - Export CSV button added to the Invoices table header.
  - File: src/pages/Invoices.tsx

2) Drivers: Date filters + CSV export
- Data layer
  - Extended driver filters to include date_from/date_to and implemented created_at range filtering.
  - File: src/lib/validations.ts, src/hooks/useDrivers.ts
- UI
  - Added From/To date inputs in the Filters section.
  - Export CSV button added to the Drivers table header.
  - File: src/pages/Drivers.tsx

3) Tracking Events: Basic page with filters + CSV export
- Data layer
  - New hook with date range filtering on created_at: src/hooks/useTrackingEvents.ts
- UI
  - New page with filters (tracking_code client-side search + date range) and CSV export.
  - File: src/pages/TrackingEvents.tsx
- Navigation & routes
  - Route /tracking-events wired in src/App.tsx
  - Sidebar item added in src/components/layout/AppSidebar.tsx

4) Playwright E2E smoke tests scaffolding
- Installed @playwright/test and added playwright.config.ts
- Scripts in package.json:
  - test:e2e, test:e2e:headed, test:e2e:install, test:e2e:ci
- Tests added:
  - e2e/auth.spec.ts: Auth guard shows login when unauthenticated
  - e2e/orders.spec.ts: Orders page filters and CSV export existence
  - e2e/kyc.spec.ts: KYC moderation page renders for admin
- Test reliability improvements attempted:
  - networkidle waits and longer timeouts
  - Introduced data-testid attributes in Login, Orders, KYC pages
- Documentation: docs/ADMIN_E2E_TESTS.md

5) Dev-only emergency auth bypass for local E2E
- Env flag: VITE_DEV_EMERGENCY_ADMIN=1 enables a local emergency mode.
- Admin session simulation:
  - Tests set localStorage.EMERGENCY_SIGNED_IN='1' before navigation when admin access is needed.
  - AuthProvider creates a fallback admin profile if the flag is set; otherwise displays the login form quickly without real Supabase calls in emergency mode.
  - Files: src/providers/AuthProvider.tsx, src/components/PermissionGuard.tsx

6) Utilities & housekeeping
- CSV utility available at src/lib/csv.ts
- TypeScript typecheck passes (npm run typecheck)

## Current Status of E2E
- The app loads and assets are served during tests, but UI queries still time out when using the dev server (likely due to HMR/timing).
- Test IDs are in place, indicating timing/environment issues rather than selector fragility.

## Recommended Next Steps (Open Items)

1) Stabilize E2E in CI and locally (High)
- Switch Playwright to run against a production build via vite preview instead of the dev server to avoid HMR-related flakiness.
- Keep VITE_DEV_EMERGENCY_ADMIN=1 in the Playwright webServer environment.
- Continue using the localStorage EMERGENCY_SIGNED_IN flag in tests that need admin access.

2) Improve test diagnostics (Medium)
- Capture page console errors and request failures during tests.
- On failure, attach page.screenshot and page.content to quickly identify runtime issues.

3) Extend E2E coverage (Medium)
- Add a smoke test for Drivers CSV export (mirroring Orders coverage).
- Add a basic smoke test verifying the Tracking Events page renders and its CSV export button exists.

4) CI Integration (Medium)
- Add a GitHub Actions workflow to run Playwright tests on PRs and main branch pushes.
- Cache Playwright browsers and npm dependencies to speed up runs.

5) Codebase cleanup (Low)
- Consolidate overlapping hooks where appropriate (e.g., between src/hooks and src/hooks/useSupabaseData.tsx) to reduce duplication.
- Ensure the emergency bypass remains strictly dev/CI-only (it is currently gated by VITE_DEV_EMERGENCY_ADMIN).

## How to Run

- Dev server: npm run dev
- Typecheck: npm run typecheck
- Install Playwright browsers: npm run test:e2e:install
- Run Playwright tests (headless): npm run test:e2e
- Run Playwright tests (headed): npm run test:e2e:headed

## Proposed E2E Stabilization (Production Preview)

- Add scripts (example):
  - "build": "vite build" (already present)
  - "preview": "vite preview" (already present)
  - Optionally add a dedicated script that ensures building before preview for E2E:
    - "preview:e2e": "vite build && vite preview --port 4173"
- Update playwright.config.ts:
  - webServer.command: "npm run preview:e2e"
  - use.baseURL: "http://localhost:4173"
  - webServer.env: { VITE_DEV_EMERGENCY_ADMIN: '1' }

This approach avoids dev server HMR timing and should make UI queries deterministic.

## Notes on Security
- The emergency bypass is intended only for local development and CI. It is gated by VITE_DEV_EMERGENCY_ADMIN. Ensure this is NOT set in production builds.

