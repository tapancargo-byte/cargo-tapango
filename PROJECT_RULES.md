# TAPANGO Project Rules & Standards
## Version 2.0.0 - Based on UNIFIED_TAPANGO_DOCUMENTATION.md

---

## 📋 Table of Contents

1. [Project Philosophy](#project-philosophy)
2. [Code Standards](#code-standards)
3. [Architecture Rules](#architecture-rules)
4. [File Organization](#file-organization)
5. [Naming Conventions](#naming-conventions)
6. [Component Development](#component-development)
7. [State Management](#state-management)
8. [Database Design](#database-design)
9. [Testing Requirements](#testing-requirements)
10. [Performance Standards](#performance-standards)
11. [Security Guidelines](#security-guidelines)
12. [Documentation Requirements](#documentation-requirements)

---

## 🎯 Project Philosophy

### Core Principles
- **100% Expo SDK 53 Native UI** - Zero external UI libraries
- **New Architecture First** - Built for Fabric renderer and TurboModules
- **TypeScript Everything** - 100% TypeScript coverage required
- **Performance Excellence** - Sub-2-second startup, 60fps animations
- **Security First** - Production-ready security from day one
- **Test-Driven Development** - 90%+ test coverage mandatory

### Quality Gates
- **No merge without tests** - All PRs must include tests
- **No performance regression** - Performance must improve or maintain
- **TypeScript strict mode** - Zero any types allowed
- **ESLint compliance** - All warnings must be resolved

---

## 💻 Code Standards

### TypeScript Configuration
```typescript
// Required tsconfig.json settings
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true
  }
}
```

### ESLint Rules
```javascript
// Required .eslintrc.js rules
{
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/jsx-key": "error"
  }
}
```

### Import Organization
```typescript
// Required import order
// 1. React and React Native
import React from 'react';
import { View, Text } from 'react-native';

// 2. Third-party libraries
import { supabase } from '@supabase/supabase-js';
import { router } from 'expo-router';

// 3. Internal modules (absolute paths)
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

// 4. Relative imports
import './styles.css';
```

---

## 🏗️ Architecture Rules

### Mobile App (tapan-go) Structure
```
tapan-go/
├── app/                    # Expo Router v5 - File-based routing ONLY
├── src/
│   ├── components/        # Reusable components
│   │   ├── ui/           # Base UI components (Native only)
│   │   ├── business/     # Business logic components
│   │   ├── forms/        # Form components
│   │   └── layout/       # Layout components
│   ├── hooks/            # Custom React hooks
│   ├── stores/           # Zustand state stores
│   ├── services/         # Business services (API, auth, etc.)
│   ├── utils/            # Pure utility functions
│   ├── types/            # TypeScript type definitions
│   └── theme/            # Design system and theming
├── assets/               # Static assets
├── tests/                # Test files
└── docs/                 # Component documentation
```

### Admin Dashboard Structure
```
admin/
├── src/
│   ├── components/       # React components
│   │   ├── ui/          # Base UI components
│   │   ├── charts/      # Data visualization
│   │   ├── forms/       # Form components
│   │   └── layout/      # Layout components
│   ├── pages/           # Route pages
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilities and configurations
│   ├── providers/       # Context providers
│   └── types/           # TypeScript definitions
├── public/              # Static assets
└── tests/               # Test files
```

### Component Architecture Rules
1. **Single Responsibility** - One component, one purpose
2. **Composition over Inheritance** - Use composition patterns
3. **Props Interface** - Always define props interface
4. **Default Props** - Use default parameters, not defaultProps
5. **Error Boundaries** - All major components wrapped in error boundaries

---

## 📁 File Organization

### File Naming Conventions
```
PascalCase:     Components, Types, Interfaces
camelCase:      Functions, variables, hooks
kebab-case:     Files that aren't components
UPPER_CASE:     Constants, environment variables
```

### File Extension Rules
```
.tsx:           React components with JSX
.ts:            TypeScript without JSX
.test.tsx:      Component tests
.test.ts:       Unit tests
.spec.ts:       Integration tests
.d.ts:          Type definitions only
```

### Directory Structure Rules
```
index.ts:       Export barrel files only
README.md:      Required for each major directory
.gitkeep:       Empty directories that need tracking
```

---

## 🏷️ Naming Conventions

### Components
```typescript
// ✅ Correct
export const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  return <View>...</View>;
};

// ❌ Wrong
export const userProfileCard = () => { ... };
export const UserProfile = () => { ... }; // Too generic
```

### Hooks
```typescript
// ✅ Correct
export const useUserProfile = (userId: string) => { ... };
export const useAuthenticatedUser = () => { ... };

// ❌ Wrong
export const userProfile = () => { ... };
export const getUser = () => { ... };
```

### Types and Interfaces
```typescript
// ✅ Correct
export interface UserProfile {
  id: string;
  name: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'delivered';

// ❌ Wrong
export interface IUserProfile { ... } // No 'I' prefix
export type orderStatus = 'pending'; // Not PascalCase
```

### Constants
```typescript
// ✅ Correct
export const API_ENDPOINTS = {
  USERS: '/api/users',
  ORDERS: '/api/orders'
} as const;

export const DEFAULT_TIMEOUT = 5000;

// ❌ Wrong
export const apiEndpoints = { ... }; // Not UPPER_CASE
```

---

## 🎨 Component Development

### Component Template
```typescript
// src/components/ui/Button.tsx
import React from 'react';
import { Pressable, Text, PressableProps } from 'react-native';
import { styles } from './Button.styles';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  /** Button text content */
  title: string;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Button size */
  size?: 'small' | 'medium' | 'large';
  /** Loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

/**
 * Native button component following TAPANGO design system
 * 
 * @example
 * <Button 
 *   title="Save Changes" 
 *   variant="primary" 
 *   onPress={handleSave}
 * />
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  ...pressableProps
}) => {
  return (
    <Pressable
      style={[
        styles.base,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        style
      ]}
      disabled={disabled || loading}
      {...pressableProps}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>
        {loading ? 'Loading...' : title}
      </Text>
    </Pressable>
  );
};
```

### Component Testing Template
```typescript
// src/components/ui/Button.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with correct title', () => {
    render(<Button title="Test Button" onPress={jest.fn()} />);
    expect(screen.getByText('Test Button')).toBeOnTheScreen();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(<Button title="Test" onPress={onPress} />);
    
    fireEvent.press(screen.getByText('Test'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button title="Test" loading onPress={jest.fn()} />);
    expect(screen.getByText('Loading...')).toBeOnTheScreen();
  });

  it('is disabled when disabled prop is true', () => {
    const onPress = jest.fn();
    render(<Button title="Test" disabled onPress={onPress} />);
    
    fireEvent.press(screen.getByText('Test'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
```

---

## 🗃️ State Management

### Zustand Store Template
```typescript
// src/stores/authStore.ts
import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';

export interface AuthState {
  // State
  user: User | null;
  session: Session | null;
  loading: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  session: null,
  loading: true,
  
  // Actions
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ loading }),
  clearAuth: () => set({ 
    user: null, 
    session: null, 
    loading: false 
  })
}));

// Selectors (for performance)
export const selectAuthUser = (state: AuthState) => state.user;
export const selectAuthLoading = (state: AuthState) => state.loading;
```

### Hook Integration
```typescript
// src/hooks/useAuth.ts
import { useAuthStore } from '@/stores/authStore';
import { supabase } from '@/services/supabase';

export const useAuth = () => {
  const { user, session, loading, setUser, setSession, setLoading } = useAuthStore();
  
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };
  
  const signOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
    } finally {
      setLoading(false);
    }
  };
  
  return {
    user,
    session,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!user
  };
};
```

---

## 🗄️ Database Design

### Migration Rules
```sql
-- All migrations must include:
-- 1. Descriptive comment
-- 2. Rollback instructions
-- 3. Index creation
-- 4. RLS policies

-- Example: 007_add_payment_system.sql
-- Add payment processing tables and related functionality
-- Rollback: DROP TABLE payments CASCADE; DROP TABLE invoices CASCADE;

BEGIN;

-- Create payment tables
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
  status payment_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_created_at ON payments(created_at DESC);

-- Add RLS policies
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = payments.order_id 
      AND orders.customer_id = auth.uid()
    )
  );

-- Add triggers for updated_at
CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

COMMIT;
```

### Type Generation
```typescript
// types/database.ts - Auto-generated from Supabase
export interface Database {
  public: {
    Tables: {
      payments: {
        Row: {
          id: string;
          order_id: string;
          amount: number;
          status: PaymentStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          order_id: string;
          amount: number;
          status?: PaymentStatus;
        };
        Update: {
          amount?: number;
          status?: PaymentStatus;
        };
      };
    };
  };
}
```

---

## 🧪 Testing Requirements

### Test Coverage Rules
- **Unit Tests**: 95% coverage required
- **Integration Tests**: All API endpoints must be tested
- **E2E Tests**: All critical user flows must be covered
- **Performance Tests**: All components under 100ms render time

### Test File Organization
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

### Required Test Types
```typescript
// Every component must have:
describe('ComponentName', () => {
  it('renders correctly', () => { /* ... */ });
  it('handles props correctly', () => { /* ... */ });
  it('handles user interactions', () => { /* ... */ });
  it('handles error states', () => { /* ... */ });
  it('is accessible', () => { /* ... */ });
});

// Every service must have:
describe('ServiceName', () => {
  it('handles success cases', () => { /* ... */ });
  it('handles error cases', () => { /* ... */ });
  it('validates input parameters', () => { /* ... */ });
  it('maintains proper state', () => { /* ... */ });
});
```

---

## ⚡ Performance Standards

### Mobile Performance Targets
```typescript
const PERFORMANCE_TARGETS = {
  APP_STARTUP: 2000,        // < 2 seconds
  COMPONENT_RENDER: 100,    // < 100ms
  ANIMATION_FPS: 60,        // 60fps consistent
  MEMORY_USAGE: 100,        // < 100MB
  BUNDLE_SIZE: 5            // < 5MB
} as const;
```

### Optimization Rules
1. **React.memo** - All pure components must use React.memo
2. **useMemo/useCallback** - Expensive calculations must be memoized
3. **Image Optimization** - All images must be optimized and lazy-loaded
4. **Bundle Splitting** - Routes must be code-split
5. **List Virtualization** - Lists > 50 items must be virtualized

### Performance Testing
```typescript
// Required performance tests
describe('Performance Tests', () => {
  it('renders within performance budget', async () => {
    const startTime = performance.now();
    render(<ComponentName />);
    const endTime = performance.now();
    
    expect(endTime - startTime).toBeLessThan(100);
  });
  
  it('handles large datasets efficiently', () => {
    // Test with 1000+ items
  });
});
```

---

## 🔒 Security Guidelines

### Authentication Rules
1. **JWT Tokens** - Always validate tokens on server side
2. **Session Management** - Implement proper session timeouts
3. **Password Security** - Minimum 8 characters, special chars required
4. **Biometric Auth** - Enable for supported devices

### API Security
```typescript
// All API calls must include proper error handling
const apiCall = async () => {
  try {
    const { data, error } = await supabase
      .from('table_name')
      .select('*')
      .eq('user_id', user.id); // Always filter by user
    
    if (error) throw error;
    return data;
  } catch (error) {
    // Never expose internal errors to user
    console.error('Internal error:', error);
    throw new Error('Operation failed');
  }
};
```

### Data Protection
1. **Input Validation** - All inputs must be validated with Zod
2. **SQL Injection** - Use parameterized queries only
3. **XSS Protection** - Sanitize all user inputs
4. **HTTPS Only** - No HTTP communications allowed

---

## 📚 Documentation Requirements

### Component Documentation
```typescript
/**
 * User profile display component with edit capabilities
 * 
 * Features:
 * - Display user information
 * - Edit mode toggle
 * - Avatar upload
 * - Real-time updates
 * 
 * @example
 * ```tsx
 * <UserProfile 
 *   userId="123" 
 *   editable 
 *   onSave={handleSave}
 * />
 * ```
 * 
 * @see {@link UserProfileProps} for prop definitions
 * @since v1.2.0
 */
export const UserProfile: React.FC<UserProfileProps> = ({ ... }) => {
  // Implementation
};
```

### API Documentation
```typescript
/**
 * Fetches user profile data
 * 
 * @param userId - Unique user identifier
 * @param options - Additional query options
 * @returns Promise resolving to user profile data
 * 
 * @throws {ValidationError} When userId is invalid
 * @throws {NotFoundError} When user doesn't exist
 * @throws {PermissionError} When user lacks access
 * 
 * @example
 * ```typescript
 * const profile = await getUserProfile('123', { 
 *   includePreferences: true 
 * });
 * ```
 */
export const getUserProfile = async (
  userId: string, 
  options?: GetUserProfileOptions
): Promise<UserProfile> => {
  // Implementation
};
```

### Required Documentation Files
```
README.md           # Project overview and setup
CHANGELOG.md        # Version history and changes
CONTRIBUTING.md     # Contribution guidelines
API.md             # API documentation
DEPLOYMENT.md      # Deployment instructions
TROUBLESHOOTING.md # Common issues and solutions
```

---

## 🔄 Development Workflow

### Git Workflow
```bash
# Feature branches
git checkout -b feature/TASK-123-add-payment-system
git checkout -b bugfix/TASK-456-fix-auth-error
git checkout -b hotfix/TASK-789-critical-security-patch

# Commit messages
git commit -m "feat(payment): add payment processing system

- Add payment table and API endpoints
- Implement Stripe integration
- Add payment status tracking
- Include comprehensive tests

Closes TASK-123"
```

### Code Review Rules
1. **Minimum 2 reviewers** required
2. **All tests must pass** before merge
3. **Performance impact** must be assessed
4. **Security implications** must be reviewed
5. **Documentation** must be updated

### Quality Gates
```yaml
# Required checks before merge
- name: TypeScript Check
  run: npm run typecheck
  
- name: ESLint
  run: npm run lint
  
- name: Unit Tests
  run: npm run test
  
- name: E2E Tests
  run: npm run test:e2e
  
- name: Performance Tests
  run: npm run test:performance
  
- name: Security Scan
  run: npm run security:scan
```

---

## 📊 Metrics and Monitoring

### Required Metrics
```typescript
const REQUIRED_METRICS = {
  performance: {
    appStartupTime: 'App startup duration',
    componentRenderTime: 'Component render performance',
    apiResponseTime: 'API call duration',
    memoryUsage: 'Memory consumption'
  },
  business: {
    userEngagement: 'User session duration',
    featureUsage: 'Feature adoption rates',
    errorRate: 'Application error frequency',
    conversionRate: 'User goal completion'
  },
  security: {
    authFailures: 'Authentication failures',
    apiErrors: 'API security errors',
    dataBreaches: 'Security incidents'
  }
} as const;
```

### Monitoring Requirements
1. **Real-time Dashboards** - Key metrics visible in real-time
2. **Automated Alerts** - Critical issues trigger immediate alerts
3. **Performance Budgets** - Automatic alerts when budgets exceeded
4. **User Experience** - Monitor user satisfaction metrics

---

## ✅ Compliance Checklist

Before any release, ensure:

### Code Quality
- [ ] All TypeScript errors resolved
- [ ] ESLint warnings addressed
- [ ] Code coverage above 90%
- [ ] Performance tests passing
- [ ] Security scan clean

### Documentation
- [ ] Component documentation complete
- [ ] API documentation updated
- [ ] README.md accurate
- [ ] CHANGELOG.md updated

### Testing
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] E2E tests passing
- [ ] Performance tests within budget
- [ ] Security tests passing

### Deployment
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Monitoring configured
- [ ] Rollback plan prepared

---

## 🚀 Enforcement

These rules are enforced through:

1. **Automated Tools**
   - ESLint configuration
   - TypeScript strict mode
   - Pre-commit hooks
   - CI/CD pipeline checks

2. **Code Reviews**
   - Mandatory peer reviews
   - Architecture review for major changes
   - Security review for sensitive changes

3. **Continuous Monitoring**
   - Performance monitoring
   - Error tracking
   - Security scanning
   - Code quality metrics

---

**Last Updated**: 2025-09-08  
**Version**: 2.0.0  
**Next Review**: 2025-10-08  

*These rules are living documents and should be updated as the project evolves.*
