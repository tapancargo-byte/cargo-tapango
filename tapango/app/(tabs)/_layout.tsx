import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { Redirect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@clerk/clerk-expo';
import { useColors } from '../../src/styles/ThemeProvider';

/**
 * Tabs Layout
 *
 * Restores bottom tabs with icons and hides the default header.
 */
export default function TabsLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const colors = useColors();

  // Wait for Clerk to load to avoid flicker/loops
  if (!isLoaded) {
    return null;
  }

  // Redirect to auth if not signed in
  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border, borderTopWidth: 1 },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="booking"
          options={{
            title: 'Book',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="tracking"
          options={{
            title: 'Track',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="location" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: 'Orders',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
        {/* Hidden developer tools screen (navigable but not in tab bar) */}
        {__DEV__ ? <Tabs.Screen name="developer" options={{ href: null }} /> : null}
      </Tabs>
    </View>
  );
}
