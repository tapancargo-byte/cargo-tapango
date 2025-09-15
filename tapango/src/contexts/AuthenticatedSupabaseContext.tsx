import React, { createContext, useContext, useEffect, useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { useAuth } from '@clerk/clerk-expo';
import { createAuthenticatedSupabaseClient } from '../services/supabaseClient';

interface AuthenticatedSupabaseContextType {
  supabase: SupabaseClient | null;
  isLoading: boolean;
  error: string | null;
}

const AuthenticatedSupabaseContext = createContext<AuthenticatedSupabaseContextType | undefined>(
  undefined
);

interface AuthenticatedSupabaseProviderProps {
  children: React.ReactNode;
}

/**
 * Provider that creates an authenticated Supabase client using Clerk access tokens
 * This enables seamless integration between Clerk authentication and Supabase data access
 */
export function AuthenticatedSupabaseProvider({ children }: AuthenticatedSupabaseProviderProps) {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initializeSupabase = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!isLoaded) {
          // Clerk is still loading, keep loading state
          setIsLoading(true);
          return;
        }

        if (!isSignedIn) {
          // User is not signed in, clear the client
          setSupabase(null);
          setIsLoading(false);
          return;
        }

        // Get the Clerk access token
        const token = await getToken();

        if (!isMounted) return;

        if (!token) {
          throw new Error('Unable to retrieve access token from Clerk');
        }

        // Create authenticated Supabase client
        const authenticatedClient = createAuthenticatedSupabaseClient(token);

        if (!authenticatedClient) {
          throw new Error('Failed to create authenticated Supabase client');
        }

        setSupabase(authenticatedClient);
      } catch (err) {
        if (!isMounted) return;
        console.error('Error initializing authenticated Supabase client:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setSupabase(null);
      } finally {
        if (isMounted && isLoaded) {
          setIsLoading(false);
        }
      }
    };

    initializeSupabase();

    return () => {
      isMounted = false;
    };
  }, [getToken, isSignedIn, isLoaded]);

  // Periodically refresh the client to ensure fresh tokens
  useEffect(() => {
    if (!supabase || !isSignedIn) return;

    const refreshInterval = setInterval(
      async () => {
        try {
          const token = await getToken();
          if (token) {
            const freshClient = createAuthenticatedSupabaseClient(token);
            if (freshClient) {
              setSupabase(freshClient);
            }
          }
        } catch (err) {
          console.warn('Failed to refresh Supabase client token:', err);
          // Don't set error here as it's a background refresh
        }
      },
      10 * 60 * 1000
    ); // Refresh every 10 minutes

    return () => clearInterval(refreshInterval);
  }, [supabase, isSignedIn, getToken]);

  const value: AuthenticatedSupabaseContextType = {
    supabase,
    isLoading,
    error,
  };

  return (
    <AuthenticatedSupabaseContext.Provider value={value}>
      {children}
    </AuthenticatedSupabaseContext.Provider>
  );
}

/**
 * Hook to access the authenticated Supabase client
 * This client automatically includes the current user's Clerk access token in requests
 *
 * @returns Object containing the Supabase client, loading state, and any errors
 */
export function useAuthenticatedSupabase(): AuthenticatedSupabaseContextType {
  const context = useContext(AuthenticatedSupabaseContext);

  if (context === undefined) {
    throw new Error(
      'useAuthenticatedSupabase must be used within an AuthenticatedSupabaseProvider'
    );
  }

  return context;
}

/**
 * Hook that provides a ready-to-use authenticated Supabase client
 * Throws an error if the client is not available (user not signed in, loading, or error state)
 *
 * @returns The authenticated Supabase client
 */
export function useSupabase(): SupabaseClient {
  const { supabase, isLoading, error } = useAuthenticatedSupabase();

  if (isLoading) {
    throw new Error('Supabase client is still loading. Please wait.');
  }

  if (error) {
    throw new Error(`Supabase client error: ${error}`);
  }

  if (!supabase) {
    throw new Error('Supabase client is not available. User may not be authenticated.');
  }

  return supabase;
}
