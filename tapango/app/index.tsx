import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

/**
 * App entry gate (no fake splash).
 * - Hides native splash ASAP.
 * - Immediately routes to splash screen for auth handling.
 */
export default function IndexScreen() {
  const router = useRouter();
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
