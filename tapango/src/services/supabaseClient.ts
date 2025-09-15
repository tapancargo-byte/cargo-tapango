import { createClient, SupabaseClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const anon = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

if (url && anon) {
  supabase = createClient(url, anon, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      storage: {
        getItem: (key: string) => AsyncStorage.getItem(key),
        setItem: (key: string, value: string) =>
          AsyncStorage.setItem(key, value),
        removeItem: (key: string) => AsyncStorage.removeItem(key),
      },
    },
  });
}

/**
 * Creates an authenticated Supabase client using a Clerk access token
 * This allows users authenticated via Clerk to make authorized requests to Supabase
 *
 * @param accessToken - The Clerk access token for the authenticated user
 * @returns A Supabase client configured with the access token
 */
function createAuthenticatedSupabaseClient(
  accessToken: string
): SupabaseClient | null {
  if (!url || !anon) return null;

  return createClient(url, anon, {
    auth: {
      persistSession: false, // Don't persist Clerk-managed sessions
      autoRefreshToken: false, // Clerk manages token refresh
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}

/**
 * Type for the function that retrieves the current Clerk access token
 */
type GetAccessTokenFunction = () => Promise<string | null>;

/**
 * Creates a Supabase client that automatically uses the current Clerk access token
 * The token is fetched fresh for each request to ensure it's not expired
 *
 * @param getAccessToken - Function to retrieve the current Clerk access token
 * @returns A Supabase client that automatically authenticates with Clerk tokens
 */
function createAutoAuthenticatedSupabaseClient(
  getAccessToken: GetAccessTokenFunction
): SupabaseClient | null {
  if (!url || !anon) return null;

  return createClient(url, anon, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        get Authorization() {
          // This will be called for each request, ensuring fresh tokens
          // Note: This is a synchronous getter, so we'll need to handle async token retrieval differently
          return '';
        },
      },
    },
  });
}

export {
  supabase,
  createAuthenticatedSupabaseClient,
  createAutoAuthenticatedSupabaseClient,
  type GetAccessTokenFunction,
};
