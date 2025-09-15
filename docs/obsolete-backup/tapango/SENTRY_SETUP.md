# Sentry Setup – Release Tracking & Sourcemaps (QP0)

This repo includes a lightweight init (src/utils/sentry.ts). It activates only
when EXPO_PUBLIC_SENTRY_DSN is set and `sentry-expo` is installed.

Steps

1. Install dependency (managed Expo):
   - npm i -D sentry-expo
   - or yarn add -D sentry-expo
2. Configure app.json (or app.config.js): { "plugins": [ ["sentry-expo",
   { "project": "tapango-mobile" }] ] }
3. Add EAS Secret:
   - Name: EXPO_PUBLIC_SENTRY_DSN
4. CI sourcemaps upload:
   - eas build (plugin uploads automatically)
5. Verify in Sentry: crash-free sessions metric ≥ 99.8%

Note

- If the DSN isn’t set or the package is missing, initSentry() no-ops and the
  app builds/runs normally.
