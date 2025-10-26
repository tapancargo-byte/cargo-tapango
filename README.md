# TAPANGO - Cargo Logistics Platform

[![CI/CD Pipeline](https://github.com/tapango/tapango/workflows/CI/badge.svg)](https://github.com/tapango/tapango/actions)
[![Coverage Status](https://codecov.io/gh/tapango/tapango/branch/main/graph/badge.svg)](https://codecov.io/gh/tapango/tapango)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Modern cargo logistics platform built with React Native, Next.js, and Supabase

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Documentation](#documentation)

## 🎯 Overview

TAPANGO is a comprehensive cargo logistics platform that connects customers with drivers for efficient delivery services. Built with modern technologies and best practices, it provides:

### Core Features
- **Mobile-First Design** - React Native app with Expo SDK 53
- **Real-Time Tracking** - GPS tracking with live location updates
- **Admin Dashboard** - Next.js-powered management interface
- **Secure Payments** - Integrated payment processing
- **Role-Based Access** - Customer, Driver, Admin, and Dispatcher roles
- **Multi-Platform** - iOS, Android, and Web support

### Technology Stack
- **Frontend**: React Native (Expo SDK 53), Next.js 14, TypeScript
- **Backend**: Supabase (PostgreSQL, Real-time, Auth, Storage)
- **State Management**: Zustand, React Query
- **UI Components**: 100% Native (no external UI libraries)
- **Maps & Location**: React Native Maps, Expo Location
- **Testing**: Jest, React Testing Library, Detox
- **CI/CD**: GitHub Actions, EAS Build

## 🏗️ Architecture

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

### Database Schema
- **Profiles**: User management with role-based access
- **Orders**: Delivery requests with pickup/delivery details
- **Tracking**: Real-time GPS location data
- **Payments**: Payment processing and history
- **Reviews**: Driver rating and feedback system

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- Git
- Supabase account

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/tapango/tapango.git
   cd tapango
   ```

2. **Install dependencies**
   ```bash
   # Mobile app
   cd tapango
   npm install
   
   # Admin dashboard
   cd ../admin
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy example environment files
   cp tapango/.env.example tapango/.env
   cp admin/.env.local.example admin/.env.local
   
   # Configure your Supabase credentials
   ```

4. **Initialize database**
   ```bash
   # Run Supabase migrations
   npx supabase db reset
   ```

5. **Start development servers**
   ```bash
   # Mobile app
   cd tapango
   npm start
   
   # Admin dashboard (in another terminal)
   cd admin
   npm run dev
   ```

### Environment Variables

#### Mobile App (`tapango/.env`)
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
EXPO_PUBLIC_API_BASE_URL=your_api_url
```

#### Admin Dashboard (`admin/.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 📁 Project Structure

```
tapango/
├── tapango/                 # Mobile app (React Native + Expo)
│   ├── app/                # Expo Router v5 - File-based routing
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   │   ├── ui/        # Base UI components (Native only)
│   │   │   ├── business/  # Business logic components
│   │   │   ├── forms/     # Form components
│   │   │   └── layout/    # Layout components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── stores/        # Zustand state stores
│   │   ├── services/      # Business services (API, auth, etc.)
│   │   ├── utils/         # Pure utility functions
│   │   ├── types/         # TypeScript type definitions
│   │   └── theme/         # Design system and theming
│   ├── assets/            # Static assets
│   └── tests/             # Test files
├── admin/                  # Admin dashboard (Next.js)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Next.js pages
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/          # Utilities and configurations
│   │   └── types/        # TypeScript definitions
│   └── public/           # Static assets
├── supabase/              # Database and backend
│   ├── migrations/       # Database migrations
│   └── seed/            # Seed data
└── docs/                 # Project documentation
```

## 🛠️ Development

### Code Standards
- **TypeScript Strict Mode** - Zero `any` types allowed
- **ESLint + Prettier** - Automated code formatting
- **100% Native UI** - No external UI libraries
- **90% Test Coverage** - Comprehensive testing required
- **Performance First** - Sub-2-second startup, 60fps animations

### Git Workflow
```bash
# Feature development
git checkout -b feature/TASK-123-add-payment-system
git commit -m "feat(payment): add payment processing system

- Add payment table and API endpoints
- Implement Stripe integration
- Add payment status tracking
- Include comprehensive tests

Closes TASK-123"
```

### Available Scripts

#### Mobile App (`tapango/`)
```bash
npm start           # Start Expo development server
npm run android     # Run on Android device/emulator
npm run ios         # Run on iOS device/simulator
npm test            # Run unit tests
npm run test:e2e    # Run end-to-end tests
npm run lint        # Run ESLint
npm run typecheck   # Run TypeScript type checking
npm run build       # Build for production
```

#### Admin Dashboard (`admin/`)
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm test            # Run unit tests
npm run lint        # Run ESLint
npm run typecheck   # Run TypeScript type checking
```

### Development Guidelines

#### Component Development
```typescript
// ✅ Good: Native components only
import { View, Text, Pressable } from 'react-native';

// ❌ Bad: External UI libraries
import { Button } from 'react-native-elements';
```

#### State Management
```typescript
// ✅ Good: Zustand for global state
const useAuthStore = create<AuthState>((set) => ({...}));

// ✅ Good: React Query for server state
const { data, isLoading } = useQuery(['orders'], fetchOrders);
```

#### Performance Optimization
```typescript
// ✅ Good: Memoized components
export const Button = React.memo<ButtonProps>(({ ... }) => {
  // Component implementation
});

// ✅ Good: Optimized selectors
const isAuthenticated = useAuthStore(state => !!state.user);
```

### Resetting Onboarding State for Testing

During development, you may want to reset the onboarding state to test the onboarding flow multiple times. Here are several ways to do this:

#### Option 1: Use the Development Helper Button
- Make sure you are running in development mode (`__DEV__ = true`)
- Look for a "Reset Onboarding" button in the splash screen
- Tap the button and confirm the reset

#### Option 2: Clear App Data (Most Reliable)
- iOS Simulator: Device > Erase All Content and Settings
- Android Emulator: Settings > Apps > TAPANGO > Clear Storage
- Physical Device: Settings > Apps > TAPANGO > Clear Storage

#### Option 3: Use the Reset Button on Index Screen
- The index screen now has buttons to either:
  - Go directly to the splash screen
  - Reset onboarding state and then go to splash screen

After resetting, restart the app to see the onboarding screens.

## 🧪 Testing

### Testing Philosophy
- **Unit Tests**: 90%+ coverage for all components and services
- **Integration Tests**: API endpoints and database operations
- **E2E Tests**: Critical user flows and business processes
- **Performance Tests**: Component render times and memory usage

### Running Tests
```bash
# Unit tests
npm test

# With coverage
npm run test:coverage

# Watch mode
npm run test:watch

# End-to-end tests
npm run test:e2e

# Performance tests
npm run test:performance
```

### Test Structure
```
tests/
├── unit/                 # Unit tests
│   ├── components/      # Component tests
│   ├── hooks/           # Hook tests
│   ├── services/        # Service tests
│   └── utils/           # Utility tests
├── integration/         # Integration tests
│   ├── api/            # API integration tests
│   └── database/       # Database tests
├── e2e/                # End-to-end tests
│   ├── mobile/         # Mobile E2E tests
│   └── web/            # Web E2E tests
└── performance/        # Performance tests
```

## 🚀 Deployment

### Mobile App Deployment
```bash
# Build for development
npx eas build --profile development

# Build for production
npx eas build --profile production

# Submit to app stores
npx eas submit
```

### Admin Dashboard Deployment
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel deploy

# Deploy to custom server
npm run start
```

### Environment Setup
- **Development**: Local development with hot reloading
- **Staging**: Testing environment with production-like data
- **Production**: Live environment with real users

## 🤝 Contributing

### Development Process
1. **Fork** the repository
2. **Create** a feature branch
3. **Implement** changes following coding standards
4. **Write** comprehensive tests
5. **Update** documentation
6. **Submit** a pull request

### Code Review Requirements
- Minimum 2 reviewers required
- All tests must pass
- Performance impact assessed
- Security implications reviewed
- Documentation updated

### Commit Message Format
```
type(scope): brief description

Detailed description of the changes made.

- Change 1
- Change 2
- Change 3

Closes #issue-number
```

## 📚 Documentation

### Available Documentation
- [Consolidated Documentation](DOCUMENTATION.md) - Single source of truth
- [API Documentation](docs/api.md) - REST API endpoints and usage
- [Component Library](docs/components.md) - UI component documentation
- [Architecture Guide](docs/architecture.md) - System architecture overview
- [Database Schema](docs/database.md) - Database structure and relationships
- [Deployment Guide](docs/deployment.md) - Production deployment instructions
- [Troubleshooting](docs/troubleshooting.md) - Common issues and solutions

### Additional Resources
- [Project Rules](PROJECT_RULES.md) - Coding standards and guidelines
- [Change Log](CHANGELOG.md) - Version history and changes
- [Contributing Guide](CONTRIBUTING.md) - Contribution guidelines

## 📊 Performance Targets

| Metric | Target | Current |
|--------|---------|---------|
| App Startup Time | < 2 seconds | TBD |
| Component Render | < 100ms | TBD |
| Animation FPS | 60fps | TBD |
| Test Coverage | > 90% | TBD |
| Build Size | < 5MB | TBD |

## 🔒 Security

- **Row Level Security (RLS)** - Database-level access control
- **JWT Authentication** - Secure token-based authentication
- **Input Validation** - All inputs validated with Zod schemas
- **HTTPS Only** - All communications encrypted
- **Regular Audits** - Automated security scanning

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check our comprehensive docs
- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Join community discussions
- **Email**: Contact support@tapango.com

---

**Built with ❤️ by the TAPANGO Team**

*Last Updated: 2024-12-01*