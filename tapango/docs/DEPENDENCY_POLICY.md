# Dependency Management Policy

## Overview

This document outlines the policy for managing dependencies in the Tapango Mobile project. Following these guidelines helps maintain consistency and avoid issues when upgrading or adding dependencies.

## Before Making Changes to Dependencies

1. Check project health:
   ```bash
   npm run deps:check     # Runs expo doctor and npm outdated
   ```

2. Ensure clean installation:
   ```bash
   npm run clean         # Removes node_modules and .expo
   npm run reinstall     # Runs npm ci for clean install
   ```

3. Run security audit:
   ```bash
   npm run audit        # Checks for security vulnerabilities
   ```

## Adding New Dependencies

1. Verify compatibility with Expo SDK version
2. Check bundle size impact
3. Review license compatibility
4. Test in both dev and production builds

## Version Control

- All dependency versions in devDependencies are pinned to exact versions
- Package-lock.json must be committed
- Breaking changes require discussion in PR

## Critical Dependencies

### react-native-safe-area-context
Project uses the version specified in package.json rather than Expo's managed version to ensure consistent behavior across all builds.

### sentry-expo
Included in main dependencies (not devDependencies) as it's required for production error tracking. Configure Sentry environment variables in your CI/EAS build settings.

### Tamagui and Reanimated
Verify babel plugin configuration for optimal performance. Reanimated plugin should be the last entry in the babel plugins list.

## Automated Updates

Dependency updates are automated via Dependabot with the following rules:
- Security updates: Immediate
- Minor updates: Weekly
- Major updates: Manual review required

## Scripts

- `npm run deps:check`: Validates dependency health
- `npm run audit`: Checks for security issues
- `npm run clean`: Removes dependency artifacts
- `npm run reinstall`: Clean installation

## Required Global CLIs

- expo-cli: `npm install -g expo-cli`
- eas-cli: `npm install -g eas-cli`

## Environment Variables

- EXPO_TOKEN: Required for CI/CD builds
- SENTRY_AUTH_TOKEN: Required for error tracking
- SENTRY_ORG: Your Sentry organization
- SENTRY_PROJECT: Your Sentry project name