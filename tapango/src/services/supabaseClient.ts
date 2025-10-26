import { createClient } from '@supabase/supabase-js';

export type GetAccessTokenFunction = () => Promise<string | null>;

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
      })
    : null;

export function createAuthenticatedSupabaseClient(_accessToken: string) {
  // For now, we rely on anon-key access with permissive RLS for public/mobile flows.
  // If we later bridge Clerk -> Supabase JWT, we can attach Authorization headers here.
  return supabase;
}

export function createAutoAuthenticatedSupabaseClient(
  _getAccessToken: GetAccessTokenFunction
) {
  return supabase;
}
