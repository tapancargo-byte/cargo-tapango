import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { useAuthenticatedSupabase, useSupabase } from '../../contexts/AuthenticatedSupabaseContext';

/**
 * Example component demonstrating how to use the authenticated Supabase client
 * This shows how Clerk-authenticated users can safely access Supabase data
 */
export function AuthenticatedSupabaseExample() {
  const { isSignedIn, isLoaded } = useAuth();
  const { supabase, isLoading, error } = useAuthenticatedSupabase();
  const [userData, setUserData] = useState<any>(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  // Test the authenticated connection
  const testConnection = async () => {
    if (!supabase || !isSignedIn) {
      Alert.alert('Error', 'Not authenticated or Supabase client not ready');
      return;
    }

    setIsTestingConnection(true);
    try {
      // Example: Fetch user profile from Supabase
      // This will use the Clerk access token for authentication
      const { data, error } = await supabase
        .from('profiles') // Assumes you have a profiles table
        .select('*')
        .limit(1);

      if (error) {
        console.error('Supabase query error:', error);
        Alert.alert('Query Error', error.message);
        return;
      }

      setUserData(data);
      Alert.alert('Success', `Successfully fetched ${data?.length || 0} records from Supabase!`);
    } catch (err) {
      console.error('Connection test error:', err);
      Alert.alert('Error', err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsTestingConnection(false);
    }
  };

  // Alternative approach using the useSupabase hook (more concise but with error handling)
  const testConnectionWithHook = async () => {
    setIsTestingConnection(true);
    try {
      // This will throw an error if not authenticated or client not ready
      const authenticatedSupabase = useSupabase();

      const { data, error } = await authenticatedSupabase.from('profiles').select('*').limit(1);

      if (error) throw error;

      setUserData(data);
      Alert.alert('Success (Hook)', `Successfully fetched ${data?.length || 0} records!`);
    } catch (err) {
      console.error('Hook connection test error:', err);
      Alert.alert('Error (Hook)', err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsTestingConnection(false);
    }
  };

  if (!isLoaded) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Loading Clerk authentication...</Text>
      </View>
    );
  }

  if (!isSignedIn) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Please sign in to access Supabase data.</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        Authenticated Supabase Example
      </Text>

      <View style={{ marginBottom: 15 }}>
        <Text>Authentication Status:</Text>
        <Text>• Clerk Signed In: {isSignedIn ? '✅' : '❌'}</Text>
        <Text>• Supabase Loading: {isLoading ? '⏳' : '✅'}</Text>
        <Text>• Supabase Error: {error ? `❌ ${error}` : '✅'}</Text>
        <Text>• Supabase Client Ready: {supabase ? '✅' : '❌'}</Text>
      </View>

      {supabase && (
        <View style={{ gap: 10 }}>
          <Button
            title={isTestingConnection ? 'Testing...' : 'Test Connection (Context)'}
            onPress={testConnection}
            disabled={isTestingConnection}
          />

          <Button
            title={isTestingConnection ? 'Testing...' : 'Test Connection (Hook)'}
            onPress={testConnectionWithHook}
            disabled={isTestingConnection}
          />
        </View>
      )}

      {userData && (
        <View style={{ marginTop: 20, padding: 10, backgroundColor: '#f0f0f0' }}>
          <Text style={{ fontWeight: 'bold' }}>Last Query Result:</Text>
          <Text>{JSON.stringify(userData, null, 2)}</Text>
        </View>
      )}
    </View>
  );
}

/**
 * Hook example showing how to use authenticated Supabase in custom hooks
 */
export function useUserProfile() {
  const { supabase, isLoading: isClientLoading } = useAuthenticatedSupabase();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!supabase || isClientLoading) {
        setIsLoading(true);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const { data, error: queryError } = await supabase.from('profiles').select('*').single(); // Get single profile for current user

        if (queryError) {
          throw queryError;
        }

        setProfile(data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, [supabase, isClientLoading]);

  return { profile, isLoading, error };
}
