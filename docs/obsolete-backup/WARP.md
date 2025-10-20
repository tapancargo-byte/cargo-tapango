# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**TAPANGO** is a comprehensive cargo logistics platform connecting customers with drivers for efficient delivery services across Northeast India. The project consists of:

- **Mobile App**: React Native (Expo SDK 54) with TypeScript
- **Admin Dashboard**: Next.js 14 with React, TypeScript, and Vite
- **Backend**: Supabase (PostgreSQL, Real-time, Auth, Storage)
- **Development**: Monorepo structure with shared services

## Common Development Commands

### Mobile App (`tapango/`)
```bash
# Development
npm start                    # Start Expo development server
npm run start:dev            # Start with development client
npm run start:tunnel         # Start with tunnel for physical devices
npm run ios                  # Run on iOS simulator/device
npm run web                  # Run web version

# Code Quality
npm run lint                 # Run ESLint with custom rules
npm run lint:fix             # Auto-fix linting issues
npm run typecheck            # TypeScript type checking
npm run format               # Format code with Prettier
npm run format:check         # Check code formatting

# Database & Backend
npm run db:apply             # Push database migrations to Supabase
npm run db:login             # Login to Supabase CLI
npm run db:version           # Check Supabase CLI version

# Building & Deployment
npm run build                # Build with EAS
npm run build:ios            # Build for iOS specifically
npm run submit              # Submit to app stores via EAS
npm run prebuild             # Generate native code (Expo prebuild)

# Utilities
npm run clean                # Clean node_modules and .expo
npm run reinstall            # Clean install dependencies
npm run audit                # Security audit
npm run deps:check           # Check for outdated dependencies

# UI Development
npm run storybook            # Start Storybook for component development
npm run storybook:build      # Build Storybook
npm run test:ui              # Run Playwright UI tests
npm run test:ui:update       # Update Playwright snapshots

# Development Helpers
npm run fonts:scan           # Scan available fonts
```

### Admin Dashboard (`admin/`)
```bash
# Development
npm run dev                  # Start Vite development server
npm run start                # Same as dev
npm run build                # Build for production
npm run preview              # Preview production build

# Testing
npm test                     # Run Vitest unit tests
npm run test:e2e             # Run Playwright E2E tests
npm run test:e2e:headed      # Run E2E tests in headed mode
npm run test:e2e:install     # Install Playwright browsers
npm run test:e2e:ci          # Run E2E tests in CI mode

# Code Quality  
npm run typecheck            # TypeScript type checking
npm run typecheck:watch      # TypeScript checking in watch mode
```

### Database Operations
```bash
# From project root or tapango/
npx supabase db reset        # Reset database with fresh migrations
npx supabase db push         # Push schema changes to remote
npx supabase db pull         # Pull schema changes from remote
npx supabase start           # Start local Supabase instance
npx supabase stop            # Stop local Supabase instance
```

## Architecture Overview

### System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Mobile App    │    │ Admin Dashboard │    │   Supabase      │
│  (React Native) │    │    (Next.js)    │    │   Backend       │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • Customer UI   │    │ • Order Mgmt    │    │ • PostgreSQL    │
│ • Driver UI     │    │ • Analytics     │    │ • Real-time     │
│ • Real-time GPS │    │ • User Mgmt     │    │ • Authentication│
│ • Notifications │    │ • Reports       │    │ • Row Level Sec │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Mobile App Structure (`tapango/`)
- **`app/`**: Expo Router v6 file-based routing system
  - **`(onboarding)/`**: Onboarding flow screens
  - **`(tabs)/`**: Main tab navigation (customer/driver modes)
  - **`(auth)/`**: Authentication screens
  - **`(modals)/`**: Modal presentations
- **`src/`**: Core application logic
  - **`components/`**: Reusable React components (100% native, no external UI libs)
    - **`ui/`**: Base design system components
    - **`business/`**: Domain-specific components
    - **`forms/`**: Form components with validation
  - **`stores/`**: Zustand state management stores
  - **`services/`**: Business services (API, auth, notifications)
  - **`hooks/`**: Custom React hooks
  - **`utils/`**: Pure utility functions
  - **`types/`**: TypeScript type definitions

### Admin Dashboard Structure (`admin/`)
- **`src/pages/`**: React Router pages
- **`src/components/`**: Reusable React components
- **`src/providers/`**: Context providers (Auth, Query, Theme)
- **`src/hooks/`**: Custom hooks for data fetching
- **`src/lib/`**: Utilities and configurations

### Key Technologies & Patterns

#### State Management
- **Zustand**: Global client state
- **React Query (@tanstack/react-query)**: Server state, caching, and synchronization
- **Supabase Real-time**: Live data updates

#### UI Framework
- **Mobile**: 100% React Native components (no external UI libraries)
- **Theming**: Tamagui for design system + custom theme provider
- **Admin**: Radix UI + Tailwind CSS + shadcn/ui components

#### Navigation
- **Mobile**: Expo Router v6 with file-based routing
- **Admin**: React Router Dom with programmatic navigation

#### Authentication
- **Clerk**: Primary auth provider with JWT tokens
- **Supabase Auth**: Backend user management with Row Level Security (RLS)

#### Key Features
- **Multi-role system**: Customer, Driver, Admin, Super Admin
- **Real-time tracking**: GPS with live location updates
- **Offline support**: Queued operations with automatic sync
- **Push notifications**: OneSignal integration
- **OTA updates**: Expo Updates for instant app updates

## Development Guidelines

### Code Standards
- **TypeScript Strict Mode**: Zero `any` types allowed
- **Performance First**: Sub-2-second startup, 60fps animations
- **100% Native UI**: No external UI libraries (mobile app)
- **Component Naming**: PascalCase for components, camelCase for functions
- **File Naming**: PascalCase for components, camelCase for utilities

### Key Development Patterns

#### Mobile App Patterns
```typescript
// ✅ State Management
const useAuthStore = create<AuthState>((set) => ({...}));
const { data, isLoading } = useQuery(['orders'], fetchOrders);

// ✅ Component Structure  
export const Button = React.memo<ButtonProps>(({ ... }) => {
  // Component implementation
});

// ✅ Native Components Only
import { View, Text, Pressable } from 'react-native';
// ❌ Avoid: import { Button } from 'react-native-elements';
```

#### Onboarding State Management
- Use `StorageService.resetOnboardingForTesting()` to reset onboarding during development
- Onboarding completion tracked in AsyncStorage
- Development reset button available in splash screen when `__DEV__ = true`

#### Theme System
- Supports light/dark/system themes
- Use `useIsDark()` and `useTheme()` hooks
- Theme tokens available via `getTokens()`
- StatusBar automatically adapts to theme

### Testing Environment Setup

#### Onboarding Reset (Development)
```typescript
// Option 1: Use development helper
// Look for "Reset Onboarding" button in splash screen (dev mode only)

// Option 2: Programmatic reset
await StorageService.resetOnboardingForTesting();

// Option 3: Clear app data
// iOS: Device > Erase All Content and Settings
// Android: Settings > Apps > TAPANGO > Clear Storage
```

### Environment Variables

#### Mobile App (`.env`)
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
EXPO_PUBLIC_API_BASE_URL=your_api_url
EXPO_PUBLIC_ENABLE_BOOKING_SMS=true
```

#### Admin Dashboard (`.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Performance & Quality Targets

| Metric | Target | Notes |
|--------|---------|-------|
| App Startup Time | < 2 seconds | Critical for user experience |
| Component Render | < 100ms | Smooth interactions |
| Animation FPS | 60fps | Native performance |
| Test Coverage | > 90% | Comprehensive testing |
| Build Size | < 5MB | Optimized bundle |

## Deployment

### Mobile App
```bash
# Development builds
npx eas build --profile development

# Production builds  
npx eas build --profile production

# App store submission
npx eas submit
```

### Admin Dashboard
```bash
# Production build
npm run build

# Deploy (configured for Vercel)
vercel deploy
```

## Security Notes

- **Row Level Security (RLS)** enforced at database level
- **JWT Authentication** with secure token storage
- **Input Validation** using Zod schemas throughout
- **HTTPS Only** for all communications
- **Regular Security Audits** via `npm audit`

## Common Issues & Solutions

### Build Issues
- **Metro bundler cache**: `npx expo start --clear`  
- **Node modules**: `npm run clean && npm run reinstall`
- **iOS build**: Ensure Xcode and iOS SDK are updated

### Development Environment
- **Expo Go limitations**: Some features require development builds
- **OneSignal**: Requires development build for push notifications
- **Camera/Location**: Requires device testing (not simulator)

### Database Issues
- **Migration conflicts**: `npx supabase db reset` to start fresh
- **RLS policies**: Check user permissions in Supabase dashboard
- **Real-time not working**: Verify RLS policies allow reads

This architecture supports rapid development while maintaining production-quality standards through comprehensive testing, automated deployment, and robust error handling.