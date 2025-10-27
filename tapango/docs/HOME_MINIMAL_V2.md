# Home Minimal V2 (Sticky Actions)

This document summarizes the final design and implementation decisions for the
minimalist Home screen.

Highlights

- Scrollable layout with a sticky Top Actions Carousel (Create, Track, Orders)
- Greeting with Supabase-backed profile name and robust client fallbacks
- Lightweight status chips and de‑emphasized Network Overview Lottie
- Recent Shipments simplified with clear hierarchy

Feature flag

- EXPO_PUBLIC_HOME_MINIMAL_V2=true (default)
- Disable to hide the sticky actions carousel if needed

Key files

- app/(tabs)/index.tsx — Home container, sticky header indices
- src/components/home/TopActionsCarousel.tsx — snapping horizontal actions
- src/services/profile.ts — Supabase profile helpers (RPC + fallbacks)
- src/utils/analytics.ts — minimal analytics wrapper

Accessibility

- All primary actions have accessibility labels and ≥44px targets
- High-contrast gradients and subtle shadows; labels are screen-reader friendly

Performance

- Sticky header uses native ScrollView stickyHeaderIndices
- Lottie plays within a contained card; heavy work is off the critical header
  path

Testing

- tests/home/TopActionsCarousel.test.tsx — unit test verifying render and
  callbacks

Rollout & QA

- Stage with the feature flag; observe engagement on Create/Track/Orders actions
- Monitor performance and click-through using analytics and Sentry breadcrumbs

Future improvements

- Add shimmer skeletons for chips and recent shipments
- Add FAB as an optional affordance for quick-create on long lists
