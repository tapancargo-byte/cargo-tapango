# Clerk + Supabase Integration

This guide explains how to use the authenticated Supabase client with Clerk
integration in the TAPANGO app.

## Overview

The app now supports using Clerk access tokens to authenticate requests to
Supabase. This allows users who authenticate with Clerk to securely access
Supabase data without needing separate Supabase authentication.

## Setup

The integration is automatically set up in the root layout (`app/_layout.tsx`)
with the `AuthenticatedSupabaseProvider` wrapper.

## Usage

### 1. Using the Context Hook (Recommended)

```typescript
import { useAuthenticatedSupabase } from '../contexts/AuthenticatedSupabaseContext';

function MyComponent() {
  const { supabase, isLoading, error } = useAuthenticatedSupabase();

  const fetchData = async () => {
    if (!supabase) return;

    const { data, error } = await supabase
      .from('your_table')
      .select('*');

    // Handle data...
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!supabase) return <NotAuthenticated />;

  return (
    // Your component JSX
  );
}
```

### 2. Using the Direct Hook (For Simple Cases)

```typescript
import { useSupabase } from '../contexts/AuthenticatedSupabaseContext';

function MyComponent() {
  const supabase = useSupabase(); // Throws error if not ready

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('your_table')
      .select('*');

    // Handle data...
  };

  return (
    // Your component JSX
  );
}
```

### 3. Custom Hooks Pattern

```typescript
import { useAuthenticatedSupabase } from '../contexts/AuthenticatedSupabaseContext';

export function useUserBookings() {
  const { supabase, isLoading: isClientLoading } = useAuthenticatedSupabase();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBookings() {
      if (!supabase || isClientLoading) return;

      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setBookings(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBookings();
  }, [supabase, isClientLoading]);

  return { bookings, isLoading, error };
}
```

## Migration from Old Supabase Usage

### Before (using anonymous Supabase client)

```typescript
import { supabase } from '../services/supabaseClient';

// This only works with public data or bypasses RLS
const { data } = await supabase.from('table').select('*');
```

### After (using authenticated client)

```typescript
import { useSupabase } from '../contexts/AuthenticatedSupabaseContext';

function MyComponent() {
  const supabase = useSupabase();

  // This includes the user's Clerk token and works with RLS
  const { data } = await supabase.from('table').select('*');
}
```

## How It Works

1. **Token Management**: The `AuthenticatedSupabaseProvider` automatically
   fetches the current user's Clerk access token
2. **Client Creation**: A Supabase client is created with the token in the
   Authorization header
3. **Automatic Refresh**: Tokens are refreshed periodically to prevent
   expiration
4. **RLS Support**: Supabase Row Level Security (RLS) can use the Clerk user ID
   from the JWT token

## Row Level Security (RLS) Integration

To use Clerk user IDs in your Supabase RLS policies:

```sql
-- Example RLS policy that uses Clerk user ID
CREATE POLICY "Users can only see their own data" ON profiles
FOR SELECT USING (auth.jwt() ->> 'sub' = id::text);

-- The 'sub' claim in the Clerk JWT contains the user ID
-- You may need to adjust based on your Clerk configuration
```

## Error Handling

The authenticated client will throw descriptive errors:

- **Not authenticated**: User is not signed in with Clerk
- **Token unavailable**: Could not retrieve access token from Clerk
- **Client loading**: Supabase client is still being initialized
- **Network errors**: Standard Supabase connection issues

## Best Practices

1. **Always check authentication state** before making requests
2. **Use the context hook** for components that need loading states
3. **Use the direct hook** for simple operations where you want to fail fast
4. **Implement proper error boundaries** for authentication errors
5. **Test both authenticated and unauthenticated states**

## Security Considerations

- Clerk access tokens are automatically included in requests
- Tokens are refreshed periodically to maintain security
- Never store tokens manually - let the context handle this
- Ensure your Supabase RLS policies properly validate the JWT claims

## Debugging

To debug authentication issues:

```typescript
const { supabase, isLoading, error } = useAuthenticatedSupabase();

console.log('Supabase Debug:', {
  hasClient: !!supabase,
  isLoading,
  error,
});
```

## Examples

See `src/components/examples/AuthenticatedSupabaseExample.tsx` for a complete
working example.
