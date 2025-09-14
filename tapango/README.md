# TAPANGO Mobile — Notifications & SMS Setup

What's Implemented

- A consolidated list of major features and systems is available in
  docs/IMPLEMENTED_FEATURES.md.
- Latest release summary: docs/RELEASE_NOTES_2025-09-14.md.

## Environment variables (.env)

Set these client-safe variables:

```
EXPO_PUBLIC_ONESIGNAL_APP_ID=YOUR_ONESIGNAL_APP_ID
EXPO_PUBLIC_PRIVACY_URL=https://www.privacypolicies.com/live/1485f8a9-f52f-4c73-a826-d2b51c4b4f23
EXPO_PUBLIC_PUSH_REGISTER_URL=https://ehlzbibwyqxowhwxpuoh.supabase.co/functions/v1/register-push
```

## Supabase Edge Function: register-push (server)

This function stores Expo push tokens.

- Code: `supabase/functions/register-push/index.ts`
- Table migration: `supabase/migrations/20250914_create_push_tokens.sql`

Environment (server):

- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY

## Supabase Edge Function: send-sms (server)

Securely sends SMS via OneSignal using server-side credentials.

- Code: `supabase/functions/send-sms/index.ts`
- URL: `https://<project-ref>.supabase.co/functions/v1/send-sms`

Required project secrets (never commit these):

- ONESIGNAL_APP_ID
- ONESIGNAL_API_KEY
- Optional: ONESIGNAL_SMS_FROM (default sender configured in OneSignal)

Example (PowerShell):

```
supabase secrets set ONESIGNAL_APP_ID="{{ONESIGNAL_APP_ID}}" --project-ref "$env:SUPABASE_PROJECT_REF"
supabase secrets set ONESIGNAL_API_KEY="{{ONESIGNAL_API_KEY}}" --project-ref "$env:SUPABASE_PROJECT_REF"
# Optional sender number
# supabase secrets set ONESIGNAL_SMS_FROM="+1XXXXXXXXXX" --project-ref "$env:SUPABASE_PROJECT_REF"

supabase functions deploy send-sms --project-ref "$env:SUPABASE_PROJECT_REF"
```

Client usage (uses EXPO_PUBLIC_SMS_SEND_URL and anon key):

```
import { sendSmsToExternalId, sendSmsToPhone } from './src/services/sms';
await sendSmsToExternalId('user_123', 'Your booking was created');
// or
await sendSmsToPhone('+919876543210', 'Your driver is arriving');
```

## Development build (required for push & OneSignal)

Expo Go does not support native push or OneSignal. Use a development build:

```
npx expo run:ios
# or
npx expo run:android

# then
npx expo start --dev-client
```

## India-only SMS

- Profile > SMS Alerts:
  - Validates +91 and 10 digit numbers
  - Persists consent timestamp
  - Adds OneSignal tags: `sms_opt_in=true`, `sms_region=IN`
  - Reply STOP to unsubscribe, START to re-subscribe (text shown in UI)

## OTA Updates

`src/utils/updates.ts` uses expo-updates for startup and foreground checks.

## Notes

- OneSignal initialization is guarded to avoid crashes in Expo Go and web.
- Push token retrieval is skipped in Expo Go and when projectId is missing.

# TAPANGO Mobile – Android Edge-to-Edge Validation

## Validate on Android 15 (device or emulator)

1. Install Android Studio and create an Android 15 emulator (API 35).
2. Start the emulator or connect a device with USB debugging enabled.
3. From the project root:

```
pwsh path=null start=null
npm ci
npx expo install expo-build-properties
npm run android
```

If you see “No Android connected device found,” ensure the emulator is running
or your device is connected and authorized.

## What to verify

- Status bar is translucent and content draws behind it.
- Navigation bar is immersive with overlay-swipe and has a transparent
  background.
- Screens that need insets use the `Screen` component’s edgeToEdge props (e.g.,
  `edgeToEdge`, `statusBarPadding`, `navigationBarPadding`).

## Troubleshooting

- If prebuild fails due to missing notification icon, we removed the icon
  reference in `app.config.js` to avoid ENOENT issues.
- If dependency conflicts occur, append `--legacy-peer-deps` to npm install
  commands.

## Notes

- Pre-commit runs format only; CI enforces Storybook guard/build and RNW shadow
  guard. Full ESLint is available locally via `npm run lint`.

# TAPANGO Mobile App

Mobile application for the TAPANGO Cargo Logistics Platform.

## Getting Started

1. Install dependencies:

```bash
npm ci
```

2. Start the development server:

```bash
npm start
```

## Development

### Environment Setup

Make sure you have the following installed:

- Node.js >= 18.0.0
- npm >= 8.0.0
- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli`

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser
- `npm run build` - Build using EAS
- `npm run submit` - Submit to app stores

## Dependency Policy

We maintain strict dependency management to ensure stability and consistency
across all environments. Before making any changes to dependencies:

### 1. Check Project Health

Run the dependency check command:

```bash
npm run deps:check
```

This runs:

- expo doctor: Verifies Expo configuration
- npm outdated: Lists outdated dependencies

### 2. Clean Installation

Always use clean installs when updating dependencies:

```bash
npm run clean     # Remove node_modules and .expo
npm run reinstall # Fresh install with exact versions
```

### 3. Security Audit

Check for security vulnerabilities:

```bash
npm run audit
```

### Important Dependencies

#### Tamagui

Our UI framework is configured according to the official setup guide. The babel
plugin is configured in babel.config.js with proper extraction settings.

#### React Native Reanimated

The Reanimated babel plugin is configured as the last plugin in babel.config.js
to ensure proper operation.

#### React Native Safe Area Context

This dependency is managed by Expo SDK to ensure compatibility with Expo's
managed workflow. We have explicitly removed it from our direct dependencies to
avoid version conflicts.

## Deployment

### EAS Build Configuration

Environment variables required for builds:

- `EXPO_TOKEN`: For authentication with EAS
- `APPLE_ID`: Apple Developer account email
- `APPLE_TEAM_ID`: Apple Developer Team ID
- `ASC_APP_ID`: App Store Connect App ID
- `GOOGLE_SERVICE_ACCOUNT_KEY`: Base64 encoded service account key for Android
  deployment

### Submitting to App Stores

The submit process is configured in eas.json with separate configurations for
beta and production channels. Required credentials should be set as environment
variables in your CI environment.

## Security

- All dependency versions in devDependencies are pinned to exact versions
- Regular security audits are enforced
- Automated dependency updates via Dependabot for security patches

## Contributing

1. Create a branch: `git checkout -b feature/your-feature`
2. Make changes and test thoroughly
3. Run all checks:
   ```bash
   npm run typecheck
   npm run lint
   npm run format:check
   ```
4. Submit a PR with detailed description

## License

Proprietary - All rights reserved
