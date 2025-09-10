# TAPANGO Project Index

## Overview
TAPANGO is a comprehensive cargo logistics platform built with React Native (Expo SDK 53), Next.js (admin dashboard), and Supabase backend. The project follows a pure native UI philosophy with no external UI libraries.

## Project Structure

```
cargo/
├── admin/                  # Admin Dashboard (Next.js)
│   ├── build/
│   ├── public/
│   └── src/
│       ├── components/     # React components
│       ├── config/         # Configuration files
│       ├── data/           # Mock data and JSON files
│       ├── hooks/          # Custom React hooks
│       ├── lib/            # Utilities and Supabase integration
│       ├── pages/          # Next.js pages/routes
│       ├── providers/      # React context providers
│       └── types/          # TypeScript type definitions
├── supabase/               # Database and Backend
│   ├── migrations/         # Database schema migrations
│   └── seed/               # Development seed data
├── tapango/                # Mobile App (React Native + Expo)
│   ├── app/                # Expo Router file-based routing
│   │   ├── (auth)/         # Authentication screens
│   │   ├── (tabs)/         # Main tab navigation
│   │   └── components/     # App-specific components
│   ├── assets/             # Static assets
│   ├── docs/               # Mobile app documentation
│   ├── src/                # Core application logic
│   │   ├── components/     # Reusable UI components
│   │   ├── content/        # Content and copy
│   │   ├── hooks/          # Custom React hooks
│   │   ├── navigation/     # Navigation components
│   │   ├── screens/        # Screen components
│   │   ├── services/       # Business services
│   │   ├── stores/         # Zustand state stores
│   │   ├── styles/         # Theme and styling
│   │   └── utils/          # Utility functions
│   └── tests/              # Test files
└── docs/                   # General project documentation
```

## Key Components

### Mobile App (tapango/)
- **Framework**: React Native with Expo SDK 53
- **Navigation**: Expo Router v5 (file-based routing)
- **State Management**: Zustand
- **Authentication**: Clerk with Expo SecureStore
- **Location Services**: Expo Location and Maps
- **UI Components**: 100% Native (no external libraries)
- **Animations**: Lottie and Reanimated

#### Main Screens
1. Splash Screen (`app/splash.tsx`) - Displays for minimum 5 seconds
2. Onboarding (`app/onboarding.tsx`) - 3-slide onboarding experience
3. Authentication (`app/(auth)/`)
   - Sign In (`sign-in.tsx`)
   - Sign Up (`sign-up.tsx`)
   - Forgot Password (`forgot-password.tsx`)
4. Main Tabs (`app/(tabs)/`)
   - Home (`index.tsx`)
   - Booking (`booking.tsx`)
   - Tracking (`tracking.tsx`)
   - Orders (`orders.tsx`)
   - Profile (`profile.tsx`)

#### Core Services
- Authentication Service (`src/services/authService.ts`)
- Storage Service (`src/utils/storage.ts`) - AsyncStorage wrapper with onboarding helpers
- Theme System (`src/styles/`)

### Admin Dashboard (admin/)
- **Framework**: Next.js with TypeScript
- **UI Library**: Material-UI (MUI)
- **State Management**: React Query
- **Authentication**: Supabase Auth
- **Charts**: Recharts and MUI X Charts

#### Main Pages
1. Dashboard (`src/pages/Dashboard.tsx`)
2. Orders Management (`src/pages/Orders.tsx`)
3. Drivers Management (`src/pages/Drivers.tsx`)
4. Customers Management (`src/pages/Customers.tsx`)
5. Analytics (`src/pages/Analytics.tsx`)
6. Invoices (`src/pages/Invoices.tsx`)
7. Notifications (`src/pages/Notifications.tsx`)
8. Role Management (`src/pages/RoleManagement.tsx`)
9. Super Admin (`src/pages/SuperAdmin.tsx`)
10. Settings (`src/pages/Settings.tsx`)

#### Core Libraries
- Supabase Client (`src/lib/supabase.ts`)
- Database Types (`src/lib/database.types.ts`)
- Custom Hooks (`src/hooks/`)
- UI Components (`src/components/`)
- Providers (`src/providers/`)

### Backend (supabase/)
- **Database**: PostgreSQL with PostGIS
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Real-time
- **Storage**: Supabase Storage

#### Database Schema
1. Profiles (`profiles`) - User management
2. Drivers (`drivers`) - Driver information
3. Orders (`orders`) - Delivery requests
4. Invoices (`invoices`) - Billing information
5. Payments (`payments`) - Payment processing
6. Notifications (`notifications`) - User notifications
7. Push Tokens (`push_tokens`) - Push notification tokens
8. App Settings (`app_settings`) - Application configuration
9. Roles (`roles`) - Role-based access control
10. User Roles (`user_roles`) - User-role assignments

#### Migrations
1. `001_initial_schema.sql` - Core schema
2. `002_rls_policies.sql` - Row Level Security policies
3. `003_seed_data.sql` - Initial seed data
4. `004_fix_admin_compatibility.sql` - Admin compatibility fixes
5. `005_add_roles_tables.sql` - Role management tables
6. `006_enhanced_tracking_schema.sql` - Enhanced tracking features

## Technology Stack

### Frontend
- **Mobile**: React Native, Expo SDK 53, TypeScript
- **Web**: Next.js, React, TypeScript
- **UI**: 100% Native (mobile), Material-UI (admin)
- **State Management**: Zustand (mobile), React Query (admin)
- **Routing**: Expo Router (mobile), Next.js Router (admin)

### Backend
- **Database**: PostgreSQL with PostGIS
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Real-time
- **Storage**: Supabase Storage

### Development Tools
- **Language**: TypeScript
- **Build Tool**: Expo CLI (mobile), Next.js (admin)
- **Testing**: Jest, React Testing Library
- **Linting**: ESLint, Prettier
- **CI/CD**: GitHub Actions
- **Deployment**: EAS Build (mobile), Vercel (admin)

## Key Features

### Mobile App
- User authentication (customer/driver)
- Cargo booking system
- Real-time GPS tracking
- Order management
- Profile management
- Push notifications
- Onboarding flow with 3 screens
- Splash screen with 5-second minimum display time

### Admin Dashboard
- User and role management
- Order tracking and management
- Driver management
- Customer analytics
- Invoice generation
- System monitoring
- Super admin controls

### Backend
- Role-based access control
- Real-time data synchronization
- Geospatial data handling
- Secure authentication
- Row-level security
- Audit logging

## Documentation
1. [README.md](README.md) - Project overview and getting started
2. [PROJECT_RULES.md](PROJECT_RULES.md) - Coding standards and guidelines
3. [TAPANGO_COMPLETE_DOCUMENTATION.md](TAPANGO_COMPLETE_DOCUMENTATION.md) - Complete technical documentation
4. [UNIFIED_TAPANGO_DOCUMENTATION.md](UNIFIED_TAPANGO_DOCUMENTATION.md) - Unified documentation
5. Migration Plans and Technical Blueprints

## Environment Configuration
- Mobile App: `tapango/.env`
- Admin Dashboard: `admin/.env.local`
- Supabase Config: `supabase/config.toml`

## Performance Targets
- App Startup Time: < 2 seconds
- Component Render: < 100ms
- Animation FPS: 60fps
- Test Coverage: > 90%
- Build Size: < 5MB

## Security Features
- Row Level Security (RLS)
- JWT Authentication
- Input Validation (Zod)
- HTTPS Only
- Regular Security Audits

## Development Guidelines
- TypeScript Strict Mode
- ESLint + Prettier
- 100% Native UI
- 90%+ Test Coverage
- Performance First Approach

## Testing and Development Helpers
- Reset onboarding state for testing (`StorageService.resetOnboardingForTesting()`)
- Development-only reset button on index screen
- Test reset scripts (`test-reset.js`, `reset-onboarding.js`)

This index provides a comprehensive overview of the TAPANGO project structure, components, and key features.