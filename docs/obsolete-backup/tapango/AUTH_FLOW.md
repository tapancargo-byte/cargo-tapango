# Authentication Flow with Role Selection

This app routes users through a Role Selection step to choose between Customer
and Driver experiences before authentication.

## Screens and Routes

- Role Selection: `(auth)/role`
  - Customer → `(auth)/sign-in` (Clerk)
  - Driver → `(driver)/sign-in` (Supabase)

### Entry Points

- Onboarding step 3 finish → `(auth)/role`
- Welcome screen “Sign In” and “Create Account” → `(auth)/role`
- Splash remains unchanged: if already signed in with Clerk, goes to `/(tabs)`

## Local Persistence

- The selected role is stored in AsyncStorage under the key `selected_role`.
- Helpers:
  - `StorageService.setSelectedRole('customer' | 'driver')`
  - `StorageService.getSelectedRole()` → `'customer' | 'driver' | null`

## Behavior Notes

- Customer uses Clerk-based auth screens (email/password).
- Driver uses Supabase-based sign-in under the `(driver)` route group.
- If storage writes fail, navigation proceeds anyway (non-blocking).

## Files Touched

- Added: `app/(auth)/role.tsx`
- Updated: `app/(auth)/_layout.tsx`, `app/(onboarding)/onboarding/three.tsx`,
  `app/welcome.tsx`, `app/_layout.tsx`, `src/utils/storage.ts`

## QA Checklist

- Onboarding → finish → Role screen appears.
- Choosing Customer goes to Clerk sign-in; choosing Driver goes to Driver
  sign-in.
- `selected_role` updates correctly in AsyncStorage.
- Signed-in Clerk users still go directly to `/(tabs)` from splash.
