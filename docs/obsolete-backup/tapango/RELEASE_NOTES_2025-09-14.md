# Release Notes — TAPANGO Mobile

Date: 2025-09-14

Summary

- A major modernization of the TAPANGO mobile app delivering a cleaner UI,
  smoother onboarding/authentication, reliable notifications, and
  production-ready foundations.

What’s new

- Redesigned experience across core screens (Home, Book, Track, Orders, Profile)
- Polished Splash and Onboarding (3 concise slides with haptics)
- Modern Authentication UI with floating labels and better feedback
- Notifications overhaul (Expo local notifications); OneSignal integration
  guarded for safety
- Server-side SMS via Supabase Edge Functions (secure OneSignal usage)
- OTA updates enabled (checks on startup and foreground)
- Android edge-to-edge conformance (status/nav bars)

Performance & quality

- Faster, smoother animations and transitions
- Strong accessibility baseline (contrast, touch targets, labels)
- TypeScript error reduction: 50 → 14 (72% improvement), remaining are
  low-impact

Integrations

- OneSignal (app-safe usage with environment-based guards)
- Supabase (schema + Edge Functions for push token storage and SMS)
- Google Places (autocomplete + geocoding) with cost controls
- Sentry (optional, gated by DSN)

Known limitations

- Minor, non-blocking issues remain (e.g., a duplicate export in MapWrapper,
  cosmetic type notes). Core user journeys are unaffected.

Where to learn more

- Technical details and file references: docs/IMPLEMENTED_FEATURES.md
- Setup and environment: README.md and linked docs (SENTRY_SETUP,
  GOOGLE_PLACES_KEY_SETUP, PRODUCTION_SETUP)
