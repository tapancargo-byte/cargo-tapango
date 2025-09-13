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
