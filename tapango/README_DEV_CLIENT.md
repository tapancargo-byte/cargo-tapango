# Expo Dev Client setup (optional)

This project runs in Expo Go by default. To enable native toasts/sheets (e.g., Tamagui Toasts and fully animated Sheets), you can use a Dev Client. This is optional and gated by scripts and envs.

Steps
1. Install the dev client once (per platform):
   - Android: `expo run:android`
   - iOS: `expo run:ios`
2. Start the app with the dev client target:
   - `npm run start:dev` (or `pnpm start:dev` / `yarn start:dev`)
3. Gate native-only features in code using:
   ```ts
   const isDevClient = process.env.EXPO_DEV_CLIENT === '1'
   ```
   Then conditionally render native toasts/sheets.

Environment
- Add to `.env` (or your shell): `EXPO_DEV_CLIENT=1`

Notes
- Keep Expo Go compatibility: never require native-only packages at module top-level. Use dynamic `import()` guarded by the flag.
- For CI builds, use EAS build as usual.
