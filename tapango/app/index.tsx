import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useAuth } from '@clerk/clerk-expo';
import { StorageService } from '../src/utils/storage';

/**
 * App entry gate (no fake splash).
 * - Hides native splash ASAP.
 * - Routes to onboarding if not seen.
 * - Otherwise waits for Clerk and routes to tabs or auth.
 */
export default function IndexScreen() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const navigatedRef = useRef(false);
  const [hidden, setHidden] = useState(false);

  // Hide native splash immediately on mount
  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.hideAsync();
        setHidden(true);
      } catch {}
    })();
  }, []);

  // Always start via splash route to include it in the flow
  useEffect(() => {
    if (navigatedRef.current) return;
    navigatedRef.current = true;
    router.replace('/splash' as any);
  }, [router]);

  // Render nothing; the native splash covers this during first tick
  return <View style={{ flex: 1, backgroundColor: '#001A36' }} />;
}
