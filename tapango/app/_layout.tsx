import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { View, Text, ActivityIndicator, useColorScheme, Platform } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Feather } from '@expo/vector-icons';
import { ClerkProvider } from '@clerk/clerk-expo';
import { ReactQueryProvider } from '../src/utils/reactQuery';
import { OfflineBanner } from '../src/components/OfflineBanner';
import { drainPendingBookings } from '../src/utils/offlineQueue';
import { ThemeProvider, useIsDark } from '../src/styles/ThemeProvider';
import { TamaguiProvider, Theme } from 'tamagui';
import * as SystemUI from 'expo-system-ui';
import tamaguiConfig from '../tamagui.config';
import * as SecureStore from 'expo-secure-store';
import { AppToastProvider, useAppToast } from '../src/ui/tg/ToastHost';
import { checkForOTAUpdate, startUpdateListener } from '../src/utils/updates';
import { GlobalErrorCatcher } from '../src/components/GlobalErrorCatcher';
import { initNotifications } from '../src/utils/notifications';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { initOneSignal, loginOneSignal, logoutOneSignal } from '../src/integrations/onesignal';

// Clerk token cache configuration
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  );
}

// Suppress development key warnings in development (optional)
if (__DEV__ && publishableKey.startsWith('pk_test_')) {
  // This is expected during development - the warning is informational
  console.log('ℹ️  Using Clerk development keys (expected during development)');
}

// Keep the splash screen visible while we fetch resources (Expo SDK 53 best practice)
SplashScreen.preventAutoHideAsync().catch((e) =>
  console.warn('Error preventing auto hide of splash screen:', e)
);

// Note: SplashScreen.setOptions is not available in Expo Go
// Use development builds or remove for Expo Go compatibility

import { initSentry } from '../src/utils/sentry';

/**
 * Root layout for the TAPANGO mobile app following Expo Router best practices
 *
 * This layout provides:
 * - Expo Router Stack navigation
 * - Global providers and context
 * - Font loading and splash screen management
 * - Status bar configuration
 */

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const systemColorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';

  useEffect(() => {
    // Initialize Sentry (no-op if DSN/package not present)
    initSentry();

    async function prepare() {
      try {
        // Android-specific edge-to-edge code removed for Expo Go
        // Will be re-added for production builds
        // Load locale preference
        try {
          const { loadLocaleFromStorage } = await import('../src/i18n');
          await loadLocaleFromStorage();
        } catch {}

        // Pre-load icon fonts to ensure @expo/vector-icons render reliably on first paint (iOS/Android)
        try {
          // Use library-provided loader for reliability
          await Feather.loadFont();
        } catch {}

        // Minimal initialization for smooth startup
        await new Promise((resolve) => setTimeout(resolve, 200));
      } catch (e) {
        console.warn('Error during app preparation:', e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        // Best-effort drain queued bookings
        drainPendingBookings().catch(() => {});
        // Note: splash screen hiding is controlled by the splash.tsx screen
        // Do not call SplashScreen.hideAsync() here
      }
    }

    prepare();
  }, []);

  // Show loading screen while app is preparing
  if (!appIsReady) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#1E40AF',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size='large' color='white' />
        <Text
          style={{
            color: 'white',
            marginTop: 16,
            fontSize: 16,
            fontWeight: '500',
          }}
        >
          Loading TAPANGO...
        </Text>
      </View>
    );
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ReactQueryProvider>
        <TamaguiProvider
          config={tamaguiConfig}
          defaultTheme={systemColorScheme === 'dark' ? 'tapango_dark' : 'tapango_light'}
        >
          <ThemeProvider>
            <ThemedApp />
          </ThemeProvider>
        </TamaguiProvider>
      </ReactQueryProvider>
    </ClerkProvider>
  );
}

function ThemedApp() {
  const isDark = useIsDark();
  const background = isDark ? '#0A0E1A' : '#FAFBFF';
  const surface = isDark ? '#1A1F2E' : '#FFFFFF';

  // Ensure the OS-rendered safe areas (status bar/notch/home indicator) use our theme color
  React.useEffect(() => {
    SystemUI.setBackgroundColorAsync(background).catch(() => {});
  }, [background]);

  // Moved startup effects into a child mounted inside AppToastProvider

  return (
    <Theme name={isDark ? 'tapango_dark' : 'tapango_light'}>
      <AppToastProvider>
        <SafeAreaProvider>
          <StatusBar
            style={isDark ? 'light' : 'dark'}
            backgroundColor={background}
            translucent={false}
          />
          {/* Fill the screen; individual screens manage their own safe areas. */}
          <GlobalErrorCatcher />
          <OfflineBanner />
          {/* Mount startup side-effects where toast context is available */}
          <StartupEffects />
          <AppNavigator />
        </SafeAreaProvider>
      </AppToastProvider>
    </Theme>
  );
}

// Mounted inside AppToastProvider so we can safely use toast context
function StartupEffects() {
  const toast = useAppToast();
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  // Initialize OneSignal native SDK once on startup
  React.useEffect(() => {
    try {
      initOneSignal();
    } catch {}
  }, []);

  React.useEffect(() => {
    // Initialize notifications (permissions + token)
    initNotifications();

    // OTA checks (startup + foreground) with in-app toast messaging
    checkForOTAUpdate({
      onDownloaded: () => toast.show('Update downloaded', 'Applying update...'),
    });
    const stop = startUpdateListener({
      onDownloaded: () => toast.show('Update downloaded', 'Applying update...'),
    });
    return stop;
  }, [toast]);

  // Auto-link OneSignal identity based on Clerk auth state
  React.useEffect(() => {
    try {
      if (isSignedIn) {
        const externalId =
          user?.id || (user as any)?.primaryEmailAddress?.emailAddress || undefined;
        loginOneSignal(externalId);
      } else {
        logoutOneSignal();
      }
    } catch {}
  }, [isSignedIn, user?.id]);

  return null;
}

function AppNavigator() {
  const { CountsProvider } = require('../src/contexts/CountsContext');
  return (
    <CountsProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='splash' options={{ headerShown: false }} />
        <Stack.Screen name='(onboarding)' options={{ headerShown: false }} />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        <Stack.Screen name='(driver)' options={{ headerShown: false }} />
        <Stack.Screen name='(modals)' options={{ presentation: 'modal', headerShown: false }} />
      </Stack>
    </CountsProvider>
  );
}
