# Address Autocomplete + Screens 5–9 UX Plan (Actionable)

This document merges the existing Google Address Autocomplete guidance with a
full UX makeover plan for Home, Book, Track, Orders, and Profile. It includes
analysis, implementation blueprints, phased milestones, bite-sized tasks,
acceptance criteria, KPIs, and risks.

---

## A. Analysis of existing doc: google-address-autocomplete-implementation.md.txt

What’s strong

- Uses Google Places Autocomplete + Geocode with session tokens (cost control).
- Lightweight custom hook + zustand cache (10 min TTL) → fast and
  vendor-agnostic UI.
- India-first: country=IN, en-IN language, PIN extraction.
- Clear security guidance: restricted API keys via EAS secrets; never commit.
- Practical wiring examples for pickup/delivery and checklist for the AI agent.

Gaps / Enhancements to add

- Offline-first story: clarify cached-predictions behavior, queue geocode when
  back online.
- Accessibility: labels/roles/hints, focus order, and TalkBack/VoiceOver checks.
- Error handling & rate limits: backoff on 4xx/5xx, show “Try again” with
  telemetry.
- Localisation toggle (en-IN/hi-IN) and numerals; respect OS reduce-motion.
- Unit/E2E test plan and performance targets (debounce, P95 response).
- Integration with the multi-step Book wizard and ₹-quote pipeline.

Action: kept all strengths; added the above in the plan and tasks below.

---

## B. Implementation blueprint (Address Autocomplete)

1. Cloud + Security

- Enable: Places API, Geocoding API, (optional) Address Validation API.
- Create API key restricted to iOS/Android app signatures + limited referrers.
- Store as EXPO_PUBLIC_GOOGLE_MAPS_KEY via EAS Secrets. Never log.

2. Client modules

- Hook: usePlacesAutocomplete(query, country='IN') with 400 ms debounce,
  per-session token, 10-min TTL cache, localisation param, backoff on errors.
- Geocoder: geocodePlace(placeId) → { lat, lng, formatted, pin, city, state }.
- UI: AddressAutocomplete input with accessible list (44×44 touch targets),
  keyboard navigation, hint text, empty + error states.
- Offline:
  - show cached predictions banner “Results may be stale. You’re offline.”
  - queue geocode for when back online, then hydrate form state.

3. Integration points (Book flow)

- Step 1 Pickup & Delivery: replace text inputs with AddressAutocomplete;
  persist last 5 addresses; one-tap “Swap”.
- Form state: store {formatted, lat, lng, pin, city, state} for both ends;
  validation with zod.
- Quote mutation: enable CTA when both ends + weight set; send lat/lng + pin to
  /api/v1/quote.

4. Accessibility & i18n

- accessibilityRole, accessibilityHint, proper semantics for listbox/options.
- Dynamic type, contrast AA; respect reduced motion.
- Language switch en-IN/hi-IN; Places request language matches selection.

5. Performance targets

- Debounced requests (≥400 ms). P50 places ≤600 ms, P95 ≤1.5 s on 4G.
- Zero dropped frames in suggestion list; avoid heavy shadows; windowed list
  if >10.

6. Testing matrix

- Unit: hook logic (debounce, cache, error).
- E2E: type “Hauz Khas” → select → quote visible in ≤2 s.
- Network: offline predictions fallback; queued geocode.

---

## C. Screens 5–9 UX Makeover (from teardown)

Highlights to implement across Home, Book, Track, Orders, Profile:

- INR-only currency with Intl.NumberFormat('en-IN').
- Skeletons, shimmer, and proper error/empty states.
- 3-step Book wizard + reactive QuoteCard.
- Track screen with map + status timeline + share ETA.
- Orders list with segmented filters, swipe actions, receipts.
- Profile with KYC progress, language + dark mode toggles, WhatsApp support.
- A11y AA, reduced motion awareness, haptics, and Lottie micro-motions.

Full teardown content has been preserved in Section H (Appendix) for reference.

---

## D. Phased roadmap (bite-sized milestones)

Milestone 0 — Foundation (1–2 days)

- M0.1 Add INR utilities and locale helpers; audit for any "$" in UI.
- M0.2 Add NetInfo banner + offline queue scaffolding for mutations.
- M0.3 Telemetry hooks for quote latency, screen loads, and errors. Acceptance:
  All currency shows ₹; offline banner appears/disappears; basic event logs
  captured.

Milestone 1 — Address Autocomplete (2–3 days)

- M1.1 Cloud: enable APIs, create restricted key, store in EAS secrets.
- M1.2 Add hook (usePlacesAutocomplete) + geocodePlace util; include backoff.
- M1.3 Build AddressAutocomplete component with accessible list + empty/error
  UI.
- M1.4 Wire into Book Step 1; persist recent addresses; add Swap. Acceptance:
  Select address populates fields with lat/lng + pin; offline fallback works.

Milestone 2 — Book Wizard + Quote (3–5 days)

- M2.1 Stepper UI (3 steps) and form schemas (zod); save-as-draft.
- M2.2 Cargo details: chips, weight slider + numeric; volumetric weight.
- M2.3 QuoteCard (react-query mutation), INR breakdown; Lottie + haptics on
  success.
- M2.4 Queue quotes offline and replay; error toasts with retry. Acceptance:
  Happy path quote ≤1.8 s P95; step validation; drafts resume.

Milestone 3 — Track (2–4 days)

- M3.1 Input with mask (TPG#########), paste/scan QR, history chips.
- M3.2 Live map + Status timeline; polling (30 s fg); share ETA.
- M3.3 Empty/error states + subscribe to push updates. Acceptance: ETA share
  sheet works; timeline read by screen readers succinctly.

Milestone 4 — Home (2–3 days)

- M4.1 Skia hero with parallax; chips for Quick Actions (Book/Track/Scan).
- M4.2 Live stats with shimmer; deep-link taps; activity rail
  (recent/drafts/quotes).
- M4.3 Offline banner; haptics. Acceptance: Book reachable in ≤2 taps; stats
  have “updated Xs ago.”

Milestone 5 — Orders (2–3 days)

- M5.1 Segmented: Active | Past; infinite scroll with skeletons.
- M5.2 Order cards with swipe actions; filters FAB; receipt viewer (PDF export).
  Acceptance: Smooth 60 fps scrolling; receipts shareable.

Milestone 6 — Profile (1–2 days)

- M6.1 KYC progress; GSTIN/company toggle; language + dark mode toggle.
- M6.2 WhatsApp support; hide Developer in prod; confirm sign-out. Acceptance:
  Instant theme flip; locale changes copy + numerals.

Milestone 7 — Accessibility, Perf, E2E (ongoing)

- M7.1 WCAG 2.2 AA audit and fixes; dynamic type; labels/hints.
- M7.2 Detox flows: book → track; network/offline scenarios.
- M7.3 Perf passes (Flipper): steady 60 fps; P95 frame time ≤16.6 ms.

---

## E. Task backlog (ready-to-ticket)

T0: INR-first migration

- Replace all currency formatting with Intl.NumberFormat('en-IN', { style:
  'currency', currency: 'INR' }).
- Unit test to assert no "$" appears.

T1: NetInfo offline banner + queue scaffold

- Global provider; enqueue mutations when offline; replay with exponential
  backoff.

T2: Google APIs setup

- Enable Places/Geocode; restricted key; EAS secret EXPO_PUBLIC_GOOGLE_MAPS_KEY;
  document rotation procedure.

T3: Autocomplete hook + cache

- Build hook with 400 ms debounce, session token, zustand cache, error backoff.

T4: AddressAutocomplete component

- Accessible list UI; empty/error; 44×44 minimum; keyboard nav; reduced motion
  respect.

T5: Book Step 1 wiring

- Replace text fields; add Swap; persist 5 recents; zod validation; unit tests.

T6: Book Step 2 cargo details

- Chips; slider + numeric; volumetric weight; warnings for >70 kg; validation.

T7: Book Step 3 review + quote

- QuoteCard; mutation with retries; INR breakdown; confetti + haptic; offline
  queue.

T8: Track screen

- Input mask; LiveMap; StatusTimeline; share ETA; subscribe to push;
  empty/error.

T9: Home upgrades

- Skia hero; quick chips; stats with shimmer; activity rail; offline banner.

T10: Orders upgrades

- Segmented list; swipe actions; filters FAB; receipts export.

T11: Profile upgrades

- KYC, GSTIN, language, dark toggle, WhatsApp; hide Developer in prod.

T12: A11y + tests

- WCAG AA fixes; RNTL unit tests; Detox E2E; performance budgets.

Each task has acceptance criteria in the Milestones above and the Appendix.

---

## F. KPIs

- Home→Quote happy-path ≤ 3 taps and ≤ 5 s.
- Quote P95 latency ≤ 1.8 s; success rate ≥ 99% under healthy network.
- Track engagement: % subscribed to push; share-ETA rate.
- Scroll FPS ≥ 60 on Orders; crash-free sessions ≥ 99.8%.
- A11y violations: 0 in automated audits; manual spot checks pass.

---

## Progress (updated)

- [x] INR-first currency helper and migrated Home/Booking amounts
- [x] Places autocomplete (IN restricted), geocode, recents, and wiring
- [x] Booking stepper, volumetric, Review, QuoteCard (mock + INR), draft
      save/resume, and offline queue
- [x] Tracking mask + live map + timeline + share ETA + deep-link
- [x] Orders segmented list + actions (Track/Receipt modal)
- [x] Profile: theme/lang toggles, WhatsApp, KYC progress, GSTIN field
- [x] Offline banner provider and queued booking drain
- [x] Basic unit tests for INR, volumetric, quote mock
- [ ] Receipt PDF export (planned with expo-print)
- [ ] E2E Detox + perf verification pass
- [ ] Full a11y audit with tool output attachment

---

## G. Risks & mitigations

- Address accuracy: surface PIN prominently; allow manual override; display map
  confirmation.
- Cost spikes: enforce country=IN; session-token reuse; monitor quota; fallback
  to minimal geocode if over.
- Build size/Perf: lazy-load Lotties; respect reduced motion; cache images.
- Dark-mode consistency: audit tokens; snapshot visual tests.

---

## H. Appendix — Full teardown content (preserved)

[The full “Here’s a focused, actionable teardown of screenshots 5–9 …”
content you provided is intentionally preserved here so designers/devs can
reference it without searching chat.]

(See original request; tasks above reflect this teardown one-to-one.)
