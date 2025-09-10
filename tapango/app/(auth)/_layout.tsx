import React from 'react';
import { Stack } from 'expo-router';
import { Redirect } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

/**
 * Auth layout for authentication screens following Clerk + Expo Router best practices
 * 
 * This layout provides the navigation structure for:
 * - Sign in screen  
 * - Sign up screen
 * - Forgot password screen
 * 
 * If user is already signed in, redirects to main app (tabs)
 */
export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  // Show loading while Clerk loads
  if (!isLoaded) {
    return null;
  }

  // If already signed in, go directly to main app
  // Don't redirect to splash to avoid navigation loops
  if (isSignedIn) {
    return <Redirect href="/(tabs)" />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Remove all headers for clean authentication UI
      }}
    >
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in-working" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    </Stack>
  );
}
