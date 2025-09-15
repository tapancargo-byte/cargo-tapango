# Expo Router Navigation Best Practices - TAPANGO

## Key Principles to Prevent Navigation Loops

### 1. useSegments vs usePathname for Route Groups

**Use `useSegments()` instead of `usePathname()` for group-aware navigation
logic.**

- Route groups like `(auth)`, `(tabs)`, `(driver)` are **removed from URL
  pathnames**
- `usePathname()` returns the actual URL path without group information
- `useSegments()` includes group names in the segments array for proper logic

```tsx
// ✅ CORRECT: Group-aware detection
const segments = useSegments();
const inDriverGroup = segments[0] === '(driver)';

// ❌ WRONG: Group names are not in pathname
const pathname = usePathname();
const inDriverGroup = pathname.startsWith('/(driver)'); // Always false
```

**Official Quote**: _"Route groups are removed from URL pathnames; useSegments
reveals them for logic"_

### 2. Loading State Management

**Return `null` while loading, use `Redirect` only when state is known.**

```tsx
// ✅ CORRECT: Wait for auth state
function Layout() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null; // Prevent premature navigation
  }

  if (!isSignedIn) {
    return <Redirect href='/sign-in' />;
  }

  return <Stack />;
}

// ❌ WRONG: Can cause loops if state changes
function Layout() {
  const { isSignedIn } = useAuth(); // isLoaded not checked

  if (!isSignedIn) {
    return <Redirect href='/sign-in' />; // May redirect prematurely
  }

  return <Stack />;
}
```

**Official Quote**: _"You can keep the splash screen open, or render a loading
screen like we do here."_

### 3. Initial Route Configuration

**Use `unstable_settings.initialRouteName` to avoid index→splash hops.**

```tsx
// ✅ CORRECT: Direct to splash as initial route
export const unstable_settings = {
  initialRouteName: 'splash',
};

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='splash' />
      <Stack.Screen name='(tabs)' />
      <Stack.Screen name='(auth)' />
    </Stack>
  );
}
```

**Official Quote**: _"Ensure any route can link back to `/` by setting
initialRouteName"_

### 4. Preventing Navigation Loops

**Only navigate when target differs, debounce repeated replace calls.**

```tsx
// ✅ CORRECT: Guard against redundant navigation
function AuthGuard() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const lastTargetRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const leaf = segments[segments.length - 1] || '';
    const isAuthScreen = ['sign-in', 'sign-up'].includes(leaf);

    let target: string | null = null;
    if (isSignedIn && isAuthScreen) {
      target = '/(tabs)';
    } else if (!isSignedIn && !isAuthScreen) {
      target = '/sign-in';
    }

    // Only navigate if target changed
    if (target && target !== lastTargetRef.current) {
      lastTargetRef.current = target;
      router.replace(target as const);
    }
  }, [isLoaded, isSignedIn, segments]);

  return null;
}
```

### 5. Timing and Race Conditions

**Ensure state is known before redirecting, use microtasks for render-safe
navigation.**

```tsx
// ✅ CORRECT: Microtask prevents synchronous navigation during render
useEffect(() => {
  const target = computeTarget();
  const t = setTimeout(() => router.replace(target), 0);
  return () => clearTimeout(t);
}, [dependencies]);

// ✅ CORRECT: Timer starts after auth loads
useEffect(() => {
  if (!isLoaded) return;

  const timer = setTimeout(() => {
    // Navigate based on known auth state
    router.replace(isSignedIn ? '/(tabs)' : '/onboarding');
  }, 5000);

  return () => clearTimeout(timer);
}, [isLoaded, isSignedIn]);
```

## Common Anti-Patterns to Avoid

### ❌ Pathname-based group detection

```tsx
const pathname = usePathname();
if (pathname.startsWith('/(driver)')) {
  /* Never true */
}
```

### ❌ Navigation without loading checks

```tsx
if (!isSignedIn) {
  router.replace('/sign-in'); // May execute before auth loads
}
```

### ❌ Redundant navigation calls

```tsx
useEffect(() => {
  router.replace('/target'); // Called on every render
}, [someState]);
```

### ❌ Synchronous navigation during render

```tsx
if (condition) {
  router.replace('/target'); // Can cause render loop
}
```

## Expo Router 6.x + SDK 54 Specific Notes

- Route groups `(name)` are **not included** in URL pathnames
- `useSegments()` returns an array including group names: `['(tabs)', 'index']`
- `unstable_settings.initialRouteName` prevents extra routing hops
- Auth state must be fully loaded before making navigation decisions
- Use `Redirect` component for deterministic render-time navigation
- Use `router.replace()` in effects for conditional navigation

## References

- [Expo Router Authentication Patterns](https://docs.expo.dev/router/advanced/authentication/)
- [useSegments Hook Documentation](https://docs.expo.dev/router/reference/typed-routes/#usesegments)
- [Route Groups Guide](https://docs.expo.dev/router/advanced/shared-routes/)
- [Initial Route Configuration](https://docs.expo.dev/router/advanced/router-settings/)
