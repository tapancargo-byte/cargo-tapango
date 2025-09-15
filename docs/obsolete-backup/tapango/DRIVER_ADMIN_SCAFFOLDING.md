# Driver & Admin Scaffolding

This repo now includes:

- Driver app route group (Expo Router): `app/(driver)` with tabs: Jobs, Wallet,
  Profile
- Admin web scaffold (Vite + React + MUI Joy) in `/admin`

Run admin locally:

```
cd admin
npm i
npm run dev
```

Notes:

- Requires env for optional Supabase wiring: EXPO_PUBLIC_SUPABASE_URL,
  EXPO_PUBLIC_SUPABASE_ANON_KEY.
- Driver offers will queue offline when Supabase is not configured and sync
  automatically when online.
- Driver app re-uses INR helper and can be extended with offers/KYC.
- Admin live-map is placeholder; swap with Google Maps JS or Mapbox as needed.
