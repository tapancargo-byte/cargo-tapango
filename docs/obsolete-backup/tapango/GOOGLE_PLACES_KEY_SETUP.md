# Google Places/Geocoding Key – Setup (TA0)

Goal: a single restricted key (shared pool) for Customer + Driver apps and Admin
web, stored as EAS secret EXPO_PUBLIC_GOOGLE_MAPS_KEY.

1. Enable APIs (Google Cloud Console)

- Places API
- Geocoding API
- (Optional) Address Validation API

2. Create API Key and restrict

- Application restrictions:
  - iOS: Bundle IDs (e.g., com.tapango.customer, com.tapango.driver)
  - Android: SHA‑1 package signatures + package names
  - Web (Admin): HTTP referrers (admin.tapango.app) – for Maps JS only
- API restrictions: allow only Places API, Geocoding API, (optional) Address
  Validation

3. Store as EAS Secret (do not commit)

- Name: EXPO_PUBLIC_GOOGLE_MAPS_KEY
- Rotate quarterly; document in runbook

4. App usage (already wired in hooks)

- Read via process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY
- Never log the key; avoid baking it into code

5. Cost controls

- Enforce country=IN
- Use session tokens across autocomplete + geocode
- Cache predictions (10 min TTL)
- Add Admin quota alerts at 80%

6. Troubleshooting

- 403: check bundle signatures and API restrictions
- OVER_QUERY_LIMIT: add backoff and cache; verify quotas
