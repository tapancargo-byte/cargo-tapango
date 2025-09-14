import React from 'react';
import { Stack, Tabs } from 'expo-router';
import { AppIcon } from '../../src/ui';
import { supabase } from '../../src/services/supabaseClient';

export default function DriverLayout() {
  const [loading, setLoading] = React.useState(true);
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  React.useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    (async () => {
      try {
        if (supabase) {
          const { data } = await supabase.auth.getSession();
          setIsSignedIn(!!data.session);
          const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
            setIsSignedIn(!!session);
          });
          unsubscribe = () => sub.subscription.unsubscribe();
        } else {
          setIsSignedIn(false);
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      try {
        unsubscribe?.();
      } catch {}
    };
  }, []);

  if (loading) return null;

  if (!isSignedIn) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='sign-in' />
        <Stack.Screen name='sign-up' />
        <Stack.Screen name='forgot-password' />
      </Stack>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        headerStyle: { backgroundColor: '#007AFF' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Jobs',
          tabBarIcon: ({ color, size }) => <AppIcon name='briefcase' color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name='bid'
        options={{
          title: 'Bid',
          tabBarIcon: ({ color, size }) => <AppIcon name='pricetag' color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name='wallet'
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color, size }) => <AppIcon name='wallet' color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <AppIcon name='person' color={color} size={size} />,
        }}
      />
      {/* Auth routes hidden from tab bar */}
      <Tabs.Screen name='sign-in' options={{ href: null }} />
      <Tabs.Screen name='sign-up' options={{ href: null }} />
      <Tabs.Screen name='forgot-password' options={{ href: null }} />
      {/* KYC merged into Profile; tab removed */}
    </Tabs>
  );
}
