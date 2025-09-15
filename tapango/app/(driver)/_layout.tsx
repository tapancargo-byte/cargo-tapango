import React from 'react';
import { Stack, Tabs, useSegments, useRouter } from 'expo-router';
import { BottomTabBar } from '../../src/ui';
import { supabase } from '../../src/services/supabaseClient';

export default function DriverLayout() {
  const [loading, setLoading] = React.useState(true);
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const router = useRouter();
  const segments = useSegments();

  React.useEffect(() => {
    // E2E bypass: enable driver tabs without auth during web E2E
    const BYPASS_ENV = process.env.EXPO_PUBLIC_E2E_BYPASS_AUTH === '1';
    let BYPASS_QP = false as boolean;
    try {
      const g: any = typeof globalThis !== 'undefined' ? (globalThis as any) : undefined;
      const search = g?.location?.search as string | undefined;
      if (typeof search === 'string' && search.length > 0) {
        const p = new URLSearchParams(search);
        BYPASS_QP = p.get('e2e') === '1';
      }
    } catch {}
    if (BYPASS_ENV || BYPASS_QP) {
      setIsSignedIn(true);
      setLoading(false);
      return;
    }

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

  // Keep path consistent with auth state to avoid flicker/not-found when the navigator switches
  // Route groups are removed from URL pathnames; useSegments reveals them for logic
  const lastTargetRef = React.useRef<string | null>(null);
  React.useEffect(() => {
    if (loading) return; // do nothing until initial auth state is known

    const leaf = segments[segments.length - 1] || '';
    const isAuthScreen = ['sign-in', 'sign-up', 'forgot-password'].includes(leaf);

    let target: string | null = null;
    if (isSignedIn && isAuthScreen) {
      target = '/(driver)/index';
    } else if (!isSignedIn && !isAuthScreen) {
      target = '/(driver)/sign-in';
    }

    // Only navigate if target changed to prevent loops
    if (target && target !== lastTargetRef.current) {
      lastTargetRef.current = target;
      try {
        router.replace(target as any);
      } catch {}
    }
  }, [isSignedIn, loading, segments, router]);

  if (loading) return null;

  if (!isSignedIn) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        {/* Include 'index' so navigation to /(driver)/index never breaks during auth race */}
        <Stack.Screen name='index' />
        <Stack.Screen name='sign-in' />
        <Stack.Screen name='sign-up' />
        <Stack.Screen name='forgot-password' />
      </Stack>
    );
  }

  return (
    <Tabs
      // Use our Tamagui bottom tab bar for a consistent look
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Jobs',
        }}
      />
      <Tabs.Screen
        name='bid'
        options={{
          title: 'Bid',
        }}
      />
      <Tabs.Screen
        name='wallet'
        options={{
          title: 'Wallet',
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
        }}
      />
      {/* KYC merged into Profile; tab removed */}
    </Tabs>
  );
}
