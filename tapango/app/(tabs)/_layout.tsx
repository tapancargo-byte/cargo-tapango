import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { Redirect } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { useColors } from '../../src/styles/ThemeProvider';
import { BottomTabBar } from '../../src/ui/BottomTabBar';
import { CountsProvider } from '../../src/contexts/CountsContext';

/**
 * Tabs Layout
 *
 * Clean, modern Tamagui-based bottom tab bar with custom SVG icons.
 */
export default function TabsLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  useColors(); // ensure theme context is resolved

  // Wait for Clerk to load to avoid flicker/loops
  if (!isLoaded) {
    return null;
  }

  // Redirect to auth if not signed in
  if (!isSignedIn) {
    return <Redirect href='/(auth)/sign-in' />;
  }
  return (
    <View style={{ flex: 1 }}>
      <CountsProvider>
        {/* Ensure icon font is loaded before rendering Tabs to avoid missing glyphs */}
        <Tabs
          // Use our custom Tamagui tab bar (navigator-level prop)
          tabBar={(props) => <BottomTabBar {...props} />}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name='index'
            options={{
              title: 'Home',
            }}
          />
          <Tabs.Screen
            name='booking'
            options={{
              title: 'Book',
            }}
          />
          <Tabs.Screen
            name='tracking'
            options={{
              title: 'Track',
            }}
          />
          <Tabs.Screen
            name='orders'
            options={{
              title: 'Orders',
            }}
          />
          <Tabs.Screen
            name='profile'
            options={{
              title: 'Profile',
            }}
          />
          {/* Hidden developer tools screen (navigable but not in tab bar) */}
          {__DEV__ ? (
            <Tabs.Screen
              name='developer'
              options={{
                href: null,
                headerShown: false,
              }}
            />
          ) : null}
        </Tabs>
      </CountsProvider>
    </View>
  );
}
