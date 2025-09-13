# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Overview

**Repository:** Admin Dashboard for TapanGo  
**Framework:** React 19 + Vite + TypeScript  
**State Management:** TanStack Query + Zustand  
**UI:** Tailwind CSS + Radix UI + Lucide Icons  
**Database:** Supabase (PostgreSQL)  
**Testing:** Vitest (Unit) + Playwright (E2E)  
**Package Manager:** npm  
**Node Version:** LTS recommended  

This is a role-based admin dashboard for managing orders, drivers, customers, invoices, and analytics with authentication via Supabase.

---

## Quick Start

PowerShell (Windows):
```powershell
# Install dependencies
npm install

# Set up environment (copy and configure)
Copy-Item .env.example .env.local

# Start development server
npm run dev
```

bash/zsh:
```bash
npm install
cp .env.example .env.local
npm run dev
```

The app runs at `http://localhost:5173` by default.

---

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server (port 5173) |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview production build locally |
| `npm run typecheck` | TypeScript type checking |
| `npm run typecheck:watch` | TypeScript type checking in watch mode |
| `npm run test` | Run unit tests with Vitest |
| `npm run test:e2e` | Run Playwright E2E tests (against preview on port 4173) |
| `npm run test:e2e:headed` | Run E2E tests in headed browser |
| `npm run test:e2e:install` | Install Playwright browsers |
| `npm run preview:e2e` | Build and start preview server for E2E tests |

### Running a single test
- Vitest (by file): `npm run test -- src/pages/Orders.test.tsx`
- Vitest (by name/pattern): `npm run test -- -t "orders page renders"`
- Playwright (single file): `npm run test:e2e -- e2e/orders.spec.ts`
- Playwright (by name): `npm run test:e2e -- -g "orders page shows filters"`

### Common Development Workflows

```bash
# Full check before committing
npm run typecheck
npm run test
npm run build

# E2E testing setup
npm run test:e2e:install
npm run test:e2e
```

---

## Architecture & Structure

### Core Application Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── charts/         # Data visualization components  
│   ├── layout/         # Layout components (sidebar, header)
│   ├── tables/         # Data table components
│   └── ui/             # Base UI components (shadcn/ui style)
├── config/             # Configuration files
├── data/               # Mock data and fixtures
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── pages/              # Page components (route-level)
├── providers/          # React context providers
└── types/              # TypeScript type definitions
```

### Key Architectural Patterns

#### Provider Hierarchy
```
App
├── ErrorBoundary
├── ThemeProvider
├── QueryProvider (TanStack Query)
├── AuthProvider (Supabase auth)
└── Router + Layout
```

#### Route Protection
- `AuthGuard`: Ensures user is authenticated
- `AdminGuard`: Requires admin role  
- `SuperAdminGuard`: Requires super admin role
- `PermissionGuard`: Generic role-based access control

#### Data Layer
- **TanStack Query** for server state management with 5-minute stale time
- **Custom hooks** for data operations (`useOrders`, `useDrivers`, etc.)
- **Supabase client** for database operations and real-time subscriptions
- **Error handling** with automatic retries (except 401/403)

---

## Authentication System

### Supabase Authentication Flow

1. **Login**: Email/password via Supabase Auth
2. **Profile**: User profile fetched from `profiles` table with role information
3. **Authorization**: Role-based access (`user`, `admin`, `super_admin`)
4. **Session**: Automatic token refresh and persistence

### Development Authentication

For local development and E2E testing, there's an emergency bypass system:

```typescript
// Enable emergency mode in .env
VITE_DEV_EMERGENCY_ADMIN=1

// In tests or localStorage (dev only)
localStorage.setItem('EMERGENCY_SIGNED_IN', '1')
```

This creates a fallback admin profile without requiring real Supabase connection.

### Role-Based Access

```typescript
// Example usage in components
const { isAdmin, isSuperAdmin } = useAuth();

// Route-level protection
<AdminGuard>
  <KycPage />
</AdminGuard>
```

**Role Hierarchy:**
- `user`: Basic access
- `admin`: Administrative functions (KYC, role management)
- `super_admin`: Full system access

---

## Environment Configuration

### Required Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# Supabase (Required for production)
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key

# Sentry (Optional)
REACT_APP_SENTRY_DSN=your_sentry_dsn
REACT_APP_SENTRY_ENVIRONMENT=development

# Development (Optional)
VITE_DEV_EMERGENCY_ADMIN=1  # Enable auth bypass for testing
```

### Vite Environment Variables
- Prefix with `VITE_` for client-side access in Vite
- Legacy `REACT_APP_` prefixes are supported for compatibility

---

## Testing Strategy

### Unit Tests (Vitest)
- **Location**: `src/**/*.test.{ts,tsx}`
- **Setup**: `src/setupTests.ts`
- **Environment**: jsdom for DOM testing
- **Coverage**: Run with `npm run test`

### E2E Tests (Playwright)
- **Location**: `e2e/` directory
- **Config**: `playwright.config.ts`
- **Server**: Tests run against production build (`vite preview`)
- **Authentication**: Uses emergency bypass for admin flows

#### E2E Test Patterns

```typescript
// For admin-required tests
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('EMERGENCY_SIGNED_IN', '1');
  });
});

// Standard test with diagnostics
test('feature test', async ({ page }) => {
  await page.goto('/feature');
  await page.waitForLoadState('networkidle');
  await expect(page.getByTestId('feature-element')).toBeVisible();
});
```

#### Running E2E Tests
```bash
# Install browsers (first time only)
npm run test:e2e:install

# Run headless
npm run test:e2e

# Run with browser UI
npm run test:e2e:headed
```

---

## Key Technologies & Patterns

### State Management
- **TanStack Query**: Server state, caching, background updates
- **Zustand**: Client state (minimal usage, prefer React Query)
- **React Context**: Auth state, theme

### UI Components
- **Base**: Radix UI primitives with Tailwind styling
- **Icons**: Lucide React
- **Charts**: Recharts + MUI X-Charts
- **Forms**: React Hook Form + Zod validation
- **Tables**: TanStack Table for advanced data tables

### Styling
- **Tailwind CSS**: Utility-first styling
- **CSS Variables**: Theme system with dark mode support
- **Component Variants**: class-variance-authority for component APIs

### Data Fetching Patterns

```typescript
// Custom hook example
export function useOrders(filters?: OrderFilters) {
  return useQuery({
    queryKey: ['orders', filters],
    queryFn: () => fetchOrders(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Mutation with invalidation
const updateOrder = useMutation({
  mutationFn: (data) => supabase.from('orders').update(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['orders'] });
  },
});
```

---

## Development Workflows

### Adding New Pages
1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation item in `src/components/layout/AppSidebar.tsx`
4. Wrap with appropriate guards (`AdminGuard`, etc.)

### Creating Data Hooks
1. Define types in `src/lib/supabase.ts`
2. Create hook in `src/hooks/use[Entity].ts`
3. Use TanStack Query patterns with proper error handling

### Adding UI Components
- Use Radix UI primitives from `src/components/ui/`
- Follow shadcn/ui patterns for consistency
- Add to component library with proper TypeScript types

---

## Code Organization

### Path Aliases (tsconfig.paths.json)
```json
{
  "@/*": ["./src/*"],
  "@/components/*": ["./src/components/*"],
  "@/lib/*": ["./src/lib/*"],
  "@/hooks/*": ["./src/hooks/*"],
  "@/data/*": ["./src/data/*"]
}
```

### File Naming Conventions
- **Components**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (`useOrderData.ts`)
- **Utilities**: camelCase (`formatCurrency.ts`)
- **Types**: PascalCase (`OrderStatus.ts`)

### Import Organization
1. React/external libraries
2. Internal components (using path aliases)
3. Types/interfaces
4. Relative imports

---

## Build & Deployment

### Production Build
```bash
npm run build
# Outputs to dist/

# Preview production build
npm run preview
```

### Key Build Features
- **Vite**: Fast development and optimized production builds
- **TypeScript**: Full type checking during build
- **Sentry**: Source map upload when configured
- **Path resolution**: Automatic alias resolution

---

## Troubleshooting

### Common Issues

**Port 5173 in use**
```bash
# Kill process using port
npx kill-port 5173
# Or specify different port
npm run dev -- --port 3000
```

**TypeScript errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run typecheck
```

**E2E tests failing**
- Ensure `VITE_DEV_EMERGENCY_ADMIN=1` in playwright config
- Check if preview server is running on correct port (4173)
- Verify test data-testid attributes are present

**Supabase connection issues in dev**
- App falls back to development mode without real connection
- Use emergency auth bypass for testing: `localStorage.setItem('EMERGENCY_SIGNED_IN', '1')`

---
### Project-Specific Notes

### Emergency Auth Bypass
- **Purpose**: Allows development/testing without Supabase connection
- **Activation**: Set `VITE_DEV_EMERGENCY_ADMIN=1` + localStorage flag
- **Security**: Only works in development, disabled in production builds

### Role-Based Features
- **KYC Page**: Admin+ only
- **Role Management**: Admin+ only  
- **Super Admin Panel**: Super admin only
- **Analytics**: Available to all authenticated users

### CSV Export Pattern
Most data tables support CSV export with date filtering:
```typescript
const exportCSV = (data, filename) => {
  // Implementation in src/lib/csv.ts
};
```

---

## CI/CD Overview

### GitHub Actions Workflow
The project uses GitHub Actions for continuous integration (`.github/workflows/admin-ci.yml`):

**Trigger conditions:**
- Push to paths: `src/**`, `vite.config.ts`, `package.json`, `tsconfig.json`
- Pull requests
- Manual workflow dispatch

**CI Pipeline:**
```bash
# Steps run on ubuntu-latest with Node.js 20
npm ci                    # Install dependencies
npm run typecheck         # TypeScript validation
npm test -- --run         # Unit tests (non-watch mode)
npm run build             # Production build
# Optional: Supabase type generation (if secrets configured)
```

**Artifacts:**
- `admin-dist`: Production build output from `dist/` directory

**Secrets required (optional):**
- `SUPABASE_PROJECT_REF`: For automatic type generation
- `SUPABASE_ACCESS_TOKEN`: For Supabase CLI access

### Local CI Simulation
Run the same steps locally:
```bash
npm ci
npm run typecheck
npm test
npm run build
```

**Note:** E2E tests are not currently included in the CI pipeline. Consider adding:
```yaml
# Add to CI after build step
- name: E2E tests
  run: npm run test:e2e:ci
  env:
    VITE_DEV_EMERGENCY_ADMIN: '1'
```

---

**Last Updated**: 2025-09-12
**Maintained By**: TapanGo Development Team