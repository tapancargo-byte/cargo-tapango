# Admin E2E Smoke Tests

This project includes a minimal Playwright setup to run end-to-end smoke tests for critical admin flows.

What’s covered
- Authentication guard redirects unauthenticated users to the login form
- Orders page renders basic filters and supports CSV export
- KYC moderation page renders for an admin session

Prerequisites
- Node.js LTS installed
- Dev server ports 5173 available on your machine

Install browsers
```
npm run test:e2e:install
```

Run tests (headless)
```
npm run test:e2e
```

Run tests in headed browser
```
npm run test:e2e:headed
```

How authentication is handled in tests
- The app has a dev-only emergency bypass that is enabled when VITE_DEV_EMERGENCY_ADMIN=1. The Playwright webServer is started with this env var set.
- Tests that need an admin user set a localStorage flag EMERGENCY_SIGNED_IN=1 before navigating. This triggers a local, non-persistent admin profile suitable for smoke testing only.
- This bypass does not affect production builds and should not be used outside local dev or CI.

Notes
- CSV export tests verify a download is triggered; the content is not validated in detail.
- If you want to disable the emergency sign-in for tests, remove EMERGENCY_SIGNED_IN from the test init script and set VITE_DEV_EMERGENCY_ADMIN to 0 in playwright.config.ts.

