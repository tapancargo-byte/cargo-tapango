# TAPANGO - Comprehensive Documentation

*Last Updated: September 15, 2025*

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)  
3. [Repository Layout](#3-repository-layout)
4. [Setup & Environment](#4-setup--environment)
5. [Expo React Native SDK 54 Specifics](#5-expo-react-native-sdk-54-specifics)
6. [How to Run](#6-how-to-run)
7. [Architecture & Routing](#7-architecture--routing)
8. [Theming & Colors](#8-theming--colors)
9. [Admin Dashboard](#9-admin-dashboard)
10. [APIs & Contracts](#10-apis--contracts)
11. [CI/CD & Deployment](#11-cicd--deployment)
12. [Testing & QA](#12-testing--qa)
13. [Troubleshooting & Known Issues](#13-troubleshooting--known-issues)
14. [Changelog & Migration Notes](#14-changelog--migration-notes)
15. [How to Contribute](#15-how-to-contribute)

---

## 1. Project Overview

**TAPANGO** is a comprehensive cargo logistics platform connecting customers with drivers for efficient delivery services across Northeast India (Imphal ↔ Delhi corridor). The platform features real-time GPS tracking, multi-role access control, and integrated payment processing.

### Core Features

- **Mobile-First Design** - React Native app with Expo SDK 54
- **Real-Time Tracking** - GPS tracking with live location updates  
- **Admin Dashboard** - Vite-powered React management interface
- **Secure Payments** - Integrated payment processing
- **Role-Based Access** - Customer, Driver, Admin, Super Admin roles
- **Multi-Platform** - iOS, Android, and Web support
- **Offline Support** - Queued operations with automatic sync
- **Push Notifications** - OneSignal integration with SMS fallback

---

## 2. Tech Stack

### Core Technologies

| Component | Technology | Version |
|-----------|------------|---------|
| Mobile Framework | Expo React Native | 54.0.7 |
| Admin Frontend | React + Vite | 7.1.5 |
| UI Framework (Mobile) | Tamagui | 1.132.23 |
| UI Framework (Admin) | Radix UI + Tailwind CSS | Latest |
| Backend | Supabase | - |
| Database | PostgreSQL (Supabase) | - |
| Authentication | Clerk + Supabase Auth | 2.14.30 |
| State Management | Zustand | 5.0.0+ |
| Server State | TanStack React Query | 5.56.2+ |
| Language | TypeScript | 5.9.2+ |
| Package Manager | npm | 8.0.0+ |
| Node.js | >= 18.0.0 | - |

### Development Tools

- **Build System**: EAS Build, Vite
- **Testing**: Jest, React Testing Library, Playwright
- **Linting**: ESLint + Prettier
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry
- **Maps**: React Native Maps + Expo Location

---

## 3. Repository Layout

```
C:\cargo/
├── admin/                      # Admin Dashboard (Vite + React)
│   ├── src/
│   │   ├── components/         # React components  
│   │   ├── pages/             # Route components
│   │   ├── providers/         # Context providers
│   │   ├── hooks/             # Custom hooks
│   │   └── lib/               # Utilities
│   ├── dist/                  # Production build output
│   └── public/                # Static assets
├── tapango/                   # Mobile App (Expo + React Native)
│   ├── app/                   # Expo Router v6 file-based routing
│   │   ├── (onboarding)/      # Onboarding flow
│   │   ├── (tabs)/            # Main tab navigation  
│   │   ├── (auth)/            # Authentication screens
│   │   ├── (driver)/          # Driver-specific screens
│   │   └── (modals)/          # Modal presentations
│   ├── src/
│   │   ├── components/        # Reusable components (100% native)
│   │   ├── stores/            # Zustand stores
│   │   ├── services/          # API services
│   │   ├── utils/             # Utilities
│   │   ├── ui/                # Design system components
│   │   └── types/             # TypeScript definitions
│   ├── assets/                # Static assets
│   ├── android/               # Android-specific files
│   ├── ios/                   # iOS-specific files (when built)
│   └── storybook/             # Component documentation
├── supabase/                  # Database & Backend
│   ├── functions/             # Edge functions
│   ├── migrations/            # Database migrations
│   └── config.toml            # Supabase configuration
└── docs/                      # Project documentation (archived)
```

---

## 4. Setup & Environment

### Prerequisites

- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0  
- **Git**: Latest
- **Expo CLI**: `npm install -g @expo/cli`
- **EAS CLI**: `npm install -g eas-cli`
- **Supabase CLI**: For database operations
- **Android Studio**: For Android development
- **Xcode**: For iOS development (macOS only)

### Environment Variables

#### Mobile App (`tapango/.env`)
```env
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Clerk Authentication
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# OneSignal Push Notifications
EXPO_PUBLIC_ONESIGNAL_APP_ID=your_onesignal_app_id

# API Configuration
EXPO_PUBLIC_API_BASE_URL=your_api_base_url
EXPO_PUBLIC_PUSH_REGISTER_URL=https://your-project.supabase.co/functions/v1/register-push
EXPO_PUBLIC_SMS_SEND_URL=https://your-project.supabase.co/functions/v1/send-sms

# Feature Flags
EXPO_PUBLIC_ENABLE_BOOKING_SMS=true
EXPO_PUBLIC_E2E_BYPASS_AUTH=0  # Set to 1 for E2E testing

# Privacy & Legal
EXPO_PUBLIC_PRIVACY_URL=https://your-privacy-policy-url
```

#### Admin Dashboard (`admin/.env.local`)
```env
# Supabase Configuration  
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Build Configuration
VITE_SOME_KEY=value_if_needed
```

#### Supabase Secrets (Server-side)
```bash
# Set via Supabase CLI
supabase secrets set ONESIGNAL_APP_ID="your_onesignal_app_id"
supabase secrets set ONESIGNAL_API_KEY="your_onesignal_api_key"
supabase secrets set ONESIGNAL_SMS_FROM="+1234567890"  # Optional
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tapango/tapango.git
   cd cargo
   ```

2. **Install dependencies**
   ```bash
   # Mobile app
   cd tapango
   npm ci
   
   # Admin dashboard  
   cd ../admin
   npm ci
   ```

3. **Set up environment files**
   ```bash
   # Copy example files and configure
   cp tapango/.env.example tapango/.env
   cp admin/.env.local.example admin/.env.local
   ```

4. **Initialize database**
   ```bash
   # Run Supabase migrations
   cd tapango
   npx supabase db reset
   ```

---

## 5. Expo React Native SDK 54 Specifics

### Migration Checklist

✅ **Completed Migrations**
- Upgraded to Expo SDK 54.0.7
- Updated React Native to 0.81.4
- Migrated to Expo Router v6
- Updated all Expo modules to compatible versions
- Implemented edge-to-edge Android support
- Updated TypeScript to 5.9.2

### Breaking Changes Addressed

1. **Expo Router v6**
   - File-based routing with `app/` directory
   - New navigation patterns
   - Updated layout components

2. **React Native 0.81.4**  
   - New architecture compatibility
   - Updated native dependencies
   - Performance improvements

3. **Android Edge-to-Edge**
   - Translucent status bar
   - Navigation bar handling
   - Safe area implementation

### Development Build Requirements

Certain features require a development build (not Expo Go):

- Push notifications (OneSignal)
- Camera functionality
- Native modules
- Custom native code

**Build command:**
```bash
cd tapango
npx expo run:ios     # For iOS
npx expo run:android # For Android
```

---

## 6. How to Run

### Mobile App

```bash
cd tapango

# Start development server
npm start

# Run on specific platforms
npm run ios          # iOS simulator/device
npm run android      # Android emulator/device  
npm run web          # Web browser

# Development build (required for push notifications)
npm run start:dev    # Start with development client
```

### Admin Dashboard

```bash
cd admin

# Development server
npm run dev          # Start Vite dev server (usually localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
```

### Database Operations

```bash
cd tapango

# Supabase operations
npm run db:apply     # Push schema changes
npm run db:login     # Login to Supabase CLI
npm run db:version   # Check Supabase CLI version

# Direct Supabase commands
npx supabase start   # Start local instance
npx supabase stop    # Stop local instance
npx supabase db reset # Reset with fresh migrations
```

---

## 7. Architecture & Routing

### System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Mobile App    │    │ Admin Dashboard │    │   Supabase      │
│  (Expo RN SDK54)│    │   (Vite React)  │    │   Backend       │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • Customer UI   │    │ • Order Mgmt    │    │ • PostgreSQL    │
│ • Driver UI     │    │ • Analytics     │    │ • Real-time     │
│ • Real-time GPS │    │ • User Mgmt     │    │ • Authentication│
│ • Notifications │    │ • Reports       │    │ • Edge Functions│
│ • Offline Sync  │    │ • Role Mgmt     │    │ • Row Level Sec │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Mobile App Routing (Expo Router v6)

**Route Structure:**
- `/` - Index/root screen
- `/splash` - Splash screen
- `/(onboarding)/` - Onboarding flow (3 steps)
- `/(tabs)/` - Main app (customer/driver mode)
  - `/dashboard` - Main dashboard
  - `/jobs` - Available jobs (driver)
  - `/bookings` - User bookings
  - `/profile` - User profile
- `/(auth)/` - Authentication screens
  - `/sign-in` - Login
  - `/sign-up` - Registration  
  - `/forgot-password` - Password reset
- `/(driver)/` - Driver-specific screens
  - `/bid` - Bid on jobs
  - `/wallet` - Driver wallet
  - `/kyc` - KYC verification
- `/(modals)/` - Modal presentations

### Admin Dashboard Routing (React Router)

**Route Structure:**
- `/` - Dashboard overview
- `/orders` - Order management
- `/customers` - Customer management
- `/drivers` - Driver management  
- `/invoices` - Invoice management
- `/analytics` - Analytics & reporting
- `/roles` - Role management (Admin only)
- `/super-admin` - Super admin tools
- `/notifications` - Notification center
- `/settings` - Application settings

---

## 8. Theming & Colors

### Mobile App Theming (Tamagui)

**Theme System:**
- Light/Dark theme support
- System theme detection
- Custom design tokens
- 100% native components (no external UI libraries)

**Key Hooks:**
```typescript
import { useIsDark, useTheme } from '../src/styles/ThemeProvider';

const isDark = useIsDark();
const { colorScheme, toggleColorScheme } = useTheme();
```

**Design Tokens:**
```typescript
import { getTokens } from '../src/design-system/tokens';

const tokens = getTokens(isDark ? 'dark' : 'light');
const { colors, typography, spacing } = tokens;
```

### Color Standards

**Avoid hardcoded colors.** Use design tokens:

```typescript
// ✅ Good: Use design tokens
backgroundColor: colors.primary

// ❌ Bad: Hardcoded colors  
backgroundColor: '#1E40AF'
```

### Admin Dashboard Theming

**Theme System:**
- Tailwind CSS + Radix UI
- Dark/Light mode toggle
- CSS custom properties
- Component variants

---

## 9. Admin Dashboard

### Architecture

The admin dashboard is a **Vite-powered React application** (not a backend service) that provides a management interface for the TAPANGO platform.

**Key Technologies:**
- **Build Tool**: Vite 7.1.5
- **Framework**: React 19.1.1
- **Routing**: React Router Dom v7.8.2  
- **UI Components**: Radix UI + Tailwind CSS
- **State Management**: Zustand + TanStack React Query
- **Authentication**: Supabase Auth
- **Data Fetching**: Supabase client

### Features

- **Order Management**: View, update, and track orders
- **User Management**: Manage customers and drivers
- **Analytics Dashboard**: Performance metrics and reporting
- **Role-Based Access**: Admin and Super Admin permissions
- **Real-time Updates**: Live order status updates
- **Invoice Generation**: Automated billing
- **Notification System**: Alert management
- **KYC Management**: Driver verification

### Development

```bash
cd admin

# Development
npm run dev                 # Start dev server
npm run build              # Production build
npm run preview            # Preview build

# Testing  
npm run test               # Unit tests
npm run test:e2e           # End-to-end tests
npm run test:e2e:headed    # E2E with browser UI

# Code Quality
npm run typecheck          # TypeScript checking
```

### Deployment

The admin dashboard is deployed as a static site (typically on Vercel):

```bash
npm run build              # Creates `dist/` folder
# Deploy `dist/` folder to your hosting provider
```

---

## 10. APIs & Contracts

### Supabase Database Schema

**Core Tables:**
- `profiles` - User profiles with role-based access
- `orders` - Delivery requests and tracking
- `driver_jobs` - Available jobs for drivers  
- `wallet_transactions` - Driver payment history
- `push_tokens` - Device push notification tokens
- `reviews` - Driver ratings and feedback

**Row Level Security (RLS):**
- All tables have RLS policies
- Role-based data access
- User can only see their own data

### Supabase Edge Functions

1. **register-push** - Store push notification tokens
   - Endpoint: `/functions/v1/register-push`
   - Method: POST
   - Body: `{ token: string, userId: string }`

2. **send-sms** - Send SMS via OneSignal
   - Endpoint: `/functions/v1/send-sms`  
   - Method: POST
   - Body: `{ externalId: string, message: string }` or `{ phoneNumber: string, message: string }`

### API Services

**Mobile App Services:**
- `supabaseClient.ts` - Supabase client configuration
- `authService.ts` - Authentication helpers
- `notificationService.ts` - Push notification handling
- `smsService.ts` - SMS sending utilities
- `driverData.ts` - Driver-specific data operations

---

## 11. CI/CD & Deployment

### Mobile App Deployment (EAS)

```bash
cd tapango

# Build for development
npx eas build --profile development

# Build for production
npx eas build --profile production --platform all

# Submit to app stores
npx eas submit --platform all
```

### Admin Dashboard Deployment

```bash
cd admin

# Build for production
npm run build

# Deploy to Vercel (or similar)
vercel deploy

# Or deploy to any static hosting provider using the `dist/` folder
```

### CI/CD Pipeline

**GitHub Actions Workflow:**
- Automated testing on pull requests
- Linting and type checking
- Build verification
- Storybook deployment
- Production deployment on merge to main

**Quality Gates:**
- ESLint passing
- TypeScript type checking
- Unit tests > 90% coverage
- E2E tests passing
- Performance benchmarks met

---

## 12. Testing & QA

### Mobile App Testing

```bash
cd tapango

# Unit Tests
npm run test:unit           # Jest unit tests

# UI Tests  
npm run test:ui             # Playwright E2E tests
npm run test:ui:update      # Update test snapshots

# Linting & Type Checking
npm run lint                # ESLint + custom rules
npm run typecheck           # TypeScript checking
npm run format:check        # Prettier formatting
```

### Admin Dashboard Testing

```bash  
cd admin

# Unit Tests
npm test                    # Vitest unit tests

# E2E Tests
npm run test:e2e           # Playwright E2E tests
npm run test:e2e:headed    # E2E with browser UI
npm run test:e2e:install   # Install Playwright browsers

# Code Quality
npm run typecheck          # TypeScript checking
```

### Testing Strategy

- **Unit Tests**: 90%+ coverage for components and services
- **Integration Tests**: API endpoints and database operations  
- **E2E Tests**: Critical user flows and business processes
- **Performance Tests**: Component render times and memory usage
- **Accessibility Tests**: WCAG compliance validation

### QA Environment

**Mobile E2E Testing:**
- Web: `npm run web` then `npm run test:ui`
- Auth bypass: Set `EXPO_PUBLIC_E2E_BYPASS_AUTH=1` or add `?e2e=1` to URL
- Base URL override: `$env:PW_BASE_URL="http://localhost:19006"; npm run test:ui`

---

## 13. Troubleshooting & Known Issues

### Common Build Issues

1. **Metro bundler cache issues**
   ```bash
   npx expo start --clear
   npm run clean && npm run reinstall
   ```

2. **iOS build failures**
   - Ensure Xcode and iOS SDK are updated
   - Check iOS simulator availability
   - Clear Xcode derived data

3. **Android build issues**
   - Ensure Android Studio and SDK are updated
   - Check emulator availability
   - Clear Gradle cache

### Development Environment Issues

1. **Expo Go limitations**  
   - Push notifications require development build
   - Camera/Location require device testing
   - OneSignal requires development build

2. **Database connection issues**
   - Check Supabase environment variables
   - Verify RLS policies allow access
   - Check network connectivity

3. **Authentication issues**
   - Verify Clerk and Supabase keys
   - Check token expiration
   - Validate RLS policies

### Performance Issues

1. **Slow app startup**
   - Target: < 2 seconds
   - Check bundle size
   - Review initialization code

2. **Poor animation performance**
   - Target: 60fps
   - Use native components
   - Optimize re-renders

### Dependency Conflicts

**Current Known Conflicts:**
- React: admin (19.1.1) vs tapango (19.1.0)
- TypeScript: admin (5.4.0) vs tapango (5.9.2)
- Supabase: admin (2.56.0) vs tapango (2.45.4)
- TanStack Query: admin (5.85.5) vs tapango (5.56.2)

**Resolution Strategy:**
- Unify to latest compatible versions
- Test thoroughly after version updates
- Consider workspace-level dependency management

---

## 14. Changelog & Migration Notes

### Version History

**2025-09-15 - Current State**
- ✅ Expo SDK 54.0.7 migration completed
- ✅ React Native 0.81.4 upgrade
- ✅ Expo Router v6 implementation
- ✅ Edge-to-edge Android support
- ✅ TypeScript 5.9.2 upgrade
- ✅ Push notification system (OneSignal)
- ✅ SMS integration
- ✅ Driver UI implementation
- ✅ Admin dashboard (Vite)

### Breaking Changes

1. **Expo Router Migration**
   - File-based routing in `app/` directory
   - Layout components use `_layout.tsx` naming
   - Route groups use `(groupName)` syntax

2. **Android Edge-to-Edge**
   - Status bar is translucent
   - Navigation bar is immersive  
   - Screen components must handle safe areas

3. **TypeScript Strict Mode**
   - Zero `any` types allowed
   - Strict null checking enforced
   - All components must be properly typed

---

## 15. How to Contribute

### Development Process

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/TASK-123-description
   ```
3. **Make changes following coding standards**
4. **Write comprehensive tests**  
5. **Update documentation**
6. **Submit a pull request**

### Code Standards

- **TypeScript Strict Mode** - Zero `any` types
- **ESLint + Prettier** - Automated formatting
- **100% Native UI** - No external UI libraries (mobile)  
- **90% Test Coverage** - Comprehensive testing
- **Performance First** - 60fps animations, <2s startup

### Commit Message Format

```
type(scope): brief description

Detailed description of changes made.

- Change 1
- Change 2  
- Change 3

Closes #issue-number
```

### Code Review Requirements

- Minimum 2 reviewers required
- All tests must pass
- Performance impact assessed
- Security implications reviewed
- Documentation updated

### Performance Targets

| Metric | Target | Current Status |
|--------|---------|---------------|
| App Startup Time | < 2 seconds | ✅ Met |
| Component Render | < 100ms | ✅ Met |
| Animation FPS | 60fps | ✅ Met |
| Test Coverage | > 90% | 🔄 In Progress |
| Build Size | < 5MB | ✅ Met |

---

## Security Notes

- **Row Level Security (RLS)** enforced at database level
- **JWT Authentication** with secure token storage  
- **Input Validation** using Zod schemas throughout
- **HTTPS Only** for all communications
- **Regular Security Audits** via `npm audit`
- **Environment Variables** properly secured
- **API Keys** stored in secure environment/secrets

---

*This documentation consolidates information from 50+ scattered markdown files across the repository. For historical reference, see `docs/obsolete-backup/` directory.*