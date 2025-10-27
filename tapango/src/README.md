# TAPANGO Mobile App - Source Directory

This directory contains all the source code for the TAPANGO mobile application
built with React Native and Expo SDK 53.

## 📁 Directory Structure

```
src/
├── components/          # Reusable React components
│   ├── ui/             # Base UI components (Native only)
│   ├── business/       # Business logic components
│   ├── forms/          # Form components
│   └── layout/         # Layout components
├── hooks/              # Custom React hooks
├── stores/             # Zustand state stores
├── services/           # Business services (API, auth, etc.)
├── utils/              # Pure utility functions
├── types/              # TypeScript type definitions
└── theme/              # Design system and theming
```

## 🎯 Architecture Principles

### Component Organization

- **UI Components**: Pure, reusable components with no business logic
- **Business Components**: Components that contain business logic
- **Form Components**: Form-specific components with validation
- **Layout Components**: Page layouts and navigation components

### State Management

- **Zustand Stores**: Global state management
- **React Query**: Server state caching and synchronization
- **Local State**: Component-level state with hooks

### Services Layer

- **API Services**: HTTP client and endpoint definitions
- **Auth Service**: Authentication and authorization logic
- **Storage Service**: Local storage management
- **Location Service**: GPS and location tracking

## 🔧 Development Guidelines

### Import Order

```typescript
// 1. React and React Native
import React from 'react';
import { View, Text } from 'react-native';

// 2. Third-party libraries
import { router } from 'expo-router';

// 3. Internal modules (absolute paths)
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

// 4. Relative imports
import { styles } from './Component.styles';
```

### File Naming

- **Components**: `PascalCase.tsx`
- **Hooks**: `camelCase.ts` (prefixed with `use`)
- **Services**: `camelCase.ts`
- **Types**: `PascalCase.ts`
- **Utilities**: `camelCase.ts`

### Testing

- Every component must have a corresponding `.test.tsx` file
- Services must have `.test.ts` files
- Minimum 90% test coverage required

## 📋 Code Standards

- **TypeScript Strict Mode**: All files must pass strict type checking
- **ESLint Compliance**: No warnings allowed
- **Prettier Formatting**: Consistent code formatting enforced
- **Performance**: Sub-100ms component render times
- **Accessibility**: Full accessibility support required

## 🚀 Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm start
   ```

3. **Run Tests**

   ```bash
   npm test
   ```

4. **Type Check**

   ```bash
   npm run typecheck
   ```

5. **Lint Code**
   ```bash
   npm run lint
   ```

## UI Guidelines (Typography and Theming)

- Use numeric tokens via src/ui/tokens for text sizes:
  - headline, title, section, body, subtitle, caption
- Do not use H1/H2/H4 components in new code; prefer Text with token sizes.
- Secondary text should mostly use caption with reduced opacity in context.
- Badges and pills adapt to theme; for new badges use InlineBadge for contrast
  in dark mode.
- Cards and surfaces must use $background and token border colors; avoid
  hardcoded colors.

## 📚 Documentation

- Project status and Supabase posture: see `docs/PROJECT_STATUS_AND_SUPABASE.md`
- Supabase setup and migrations: see `docs/SUPABASE_SETUP_GUIDE.md`

Each directory contains specific documentation about its contents and usage
patterns. Refer to individual README files for detailed information.
