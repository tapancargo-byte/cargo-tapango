# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Repository layout (big picture)

- tapango/ — Expo React Native mobile app (Expo SDK 54), TypeScript, expo-router, Tamagui design system, Zustand + TanStack Query, OneSignal, Supabase, Sentry. Includes Storybook and Playwright UI tests against web build.
- admin/ — React 19 + Vite web admin app, TypeScript, MUI + Radix, React Router, Zustand + TanStack Query. Unit tests via Vitest and E2E via Playwright.
- docs/ — Reference documentation (many files archived under docs/obsolete-backup/).

## Tooling decisions

- Package manager: npm (lockfiles present). Use `npm ci` for reproducible installs.
- Node versions: tapango CI uses Node 18; admin CI uses Node 20. Local dev works with Node 20 across both; if you hit Expo tooling issues, switch to Node 18 for tapango.

## Commands you’ll use most

### Mobile app: tapango/

- Install and run

```bash path=null start=null
npm ci
npm start                  # Expo dev server (Expo Go)
npm run start:dev         # Dev Client target (after npx expo run:* once)
npm run web               # Web dev server
```

- Tests

```bash path=null start=null
npm run test:unit                         # Jest (passes with no tests)
# Run a single Jest test file or test name:
npx jest src/path/to/foo.test.ts -- -t "pattern"   

# Playwright E2E (web)
# Option A: run against dev server
npm run web &                             # start web dev server (separate terminal is fine)
npm run test:ui                           # runs against http://localhost:8081 by default
# Option B: run against static export (CI-style)
npx expo export --platform web --output-dir web-build
npx http-server -p 8081 web-build &
npm run test:ui
# Override base URL (PowerShell):
$env:PW_BASE_URL="http://localhost:19006"; npm run test:ui
# Run a single Playwright spec or test title:
npm run test:ui -- tests/example.spec.ts
npm run test:ui -- -g "exact test name"
```

- Lint/format/typecheck

```bash path=null start=null
npm run lint
npm run lint:fix
npm run typecheck
npm run format
npm run format:check
```

- Storybook

```bash path=null start=null
npm run storybook:dev     # local Storybook at :6006
npm run storybook:build   # outputs storybook-static/
```

- Build and utilities

```bash path=null start=null
npm run build             # EAS Build (requires EAS CLI login)
npm run prebuild          # Expo prebuild (generates native projects)
npm run clean && npm run reinstall
npm run deps:check        # expo doctor + npm outdated
npm run audit             # npm security audit
```

- Environment notes used during dev/tests

```bash path=null start=null
# E2E auth bypass (web tests)
EXPO_PUBLIC_E2E_BYPASS_AUTH=1   # or use ?e2e=1 in URL
# Notifications / URLs (client-safe)
EXPO_PUBLIC_ONESIGNAL_APP_ID=...
EXPO_PUBLIC_PRIVACY_URL=...
EXPO_PUBLIC_PUSH_REGISTER_URL=...
# Core client envs
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=...
# Dev Client gating (optional native-only features)
EXPO_DEV_CLIENT=1
```

- Push/OneSignal requires a Dev Client (Expo Go won’t work)

```bash path=null start=null
npx expo run:android   # or: npx expo run:ios
npm run start:dev
```

### Admin app: admin/

- Dev/build/preview

```bash path=null start=null
npm ci
npm run dev            # or: npm start
npm run build
npm run preview
```

- Tests

```bash path=null start=null
npm test                                # Vitest
# Run a single Vitest file or test name:
npm test -- src/path/to/foo.test.ts
npm test -- -t "pattern"

npm run test:e2e                        # Playwright
npm run test:e2e:headed                 # headed Chromium
# Install browsers for CI/local first-time:
npm run test:e2e:install
# Run a single Playwright spec or test title:
npm run test:e2e -- tests/example.spec.ts
npm run test:e2e -- -g "exact test name"
```

- Typecheck

```bash path=null start=null
npm run typecheck
npm run typecheck:watch
```

## High-level architecture and conventions

- Backend/services
  - Supabase for data, auth, storage, and edge functions; see tapango/ docs for envs and RPC/table names used by Jobs/Wallet features.
  - Sentry used for error/perf; mobile includes optional MCP-based workflows in docs.
- Mobile (tapango/)
  - Routing: expo-router (file-based) in app/; app segments for onboarding, auth, tabs, and modals.
  - src/ contains components (ui, business, forms, layout), services (API/auth/storage/location/notifications), hooks, stores (Zustand), utils, theme.
  - Design system via Tamagui; Storybook configured for component/dev UX and visual tests (Playwright against storybook-static).
  - Testing: Jest for unit, Playwright for web UI flows; CI builds a static web export and runs E2E with PW_BASE_URL and EXPO_PUBLIC_E2E_BYPASS_AUTH.
- Admin (admin/)
  - React + Vite app with MUI/Radix UI; React Router; TanStack Query/Table; Zustand for app state.
  - Testing: Vitest for unit, Playwright for E2E.

## CI/CD highlights

- tapango/.github/workflows
  - ci.yml: npm ci → test:unit → export web → install Playwright → serve web-build → run test:ui; also builds Storybook and runs RNW shadow guard via lint:ci.
  - eas-build.yml: EAS build/submit with EXPO_TOKEN and app store credentials.
  - production-harden.yml: optional Supabase hardening SQL on releases/tags.
  - supabase-maintenance.yml: generate Supabase types artifact and optional PR.
- admin/.github/workflows/admin-ci.yml
  - npm ci → typecheck → vitest → build; optionally generates Supabase types when secrets exist.

## Scripts

- Smoke tests (PowerShell):
  - Set env and run admin/scripts/supabase-smoke-tests.ps1 (requires {{SUPABASE_ANON_KEY}} and a runtime {{BEARER_TOKEN}} from an authenticated session)
  - RLS checks: admin/scripts/supabase-rls-tests.ps1 (requires admin and non-admin bearer tokens)

## Pointers to important docs

- tapango/README.md — commands for unit/E2E, env vars for notifications/SMS, Dev Client notes, and Android edge-to-edge validation.
- tapango/docs/_backup_... — archived but detailed UI/architecture/status reports.
- tapango/storybook/ and storybook/tests — visual testing via Playwright.
- tapango/src/README.md and src/services/README.md — source layout, service patterns, and testing conventions.

## Notes on archived WARP.md (docs/obsolete-backup/WARP.md)

- Update framework names: admin is a Vite React app (not Next.js); mobile is Expo SDK 54.
- Align Storybook commands to storybook:dev and storybook:build (no plain storybook script).
- Keep architecture big-picture but avoid prescriptive rules (e.g., “100% native UI, no external UI libs”) that conflict with current Tamagui usage.
