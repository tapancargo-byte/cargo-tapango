import 'react-native-gesture-handler'
import 'react-native-reanimated'
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { View, Text, ActivityIndicator, useColorScheme, Platform } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { ClerkProvider } from '@clerk/clerk-expo';
import { ReactQueryProvider } from '../src/utils/reactQuery';
import { OfflineBanner } from '../src/components/OfflineBanner';
import { drainPendingBookings } from '../src/utils/offlineQueue';
import { ThemeProvider, useIsDark } from '../src/styles/ThemeProvider';
import { TamaguiProvider, Theme } from 'tamagui';
import tamaguiConfig from '../tamagui.config';
import * as SecureStore from 'expo-secure-store';
import { AppToastProvider } from '../src/ui/tg/ToastHost';
import { enable as enableEdgeToEdge } from 'react-native-edge-to-edge';
import * as NavigationBar from 'expo-navigation-bar';
import { GlobalErrorCatcher } from '../src/components/GlobalErrorCatcher';

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
SplashScreen.preventAutoHideAsync()
  .catch(e => console.warn('Error preventing auto hide of splash screen:', e));

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
        if (Platform.OS === 'android') {
          try {
            // Enable true edge-to-edge on Android 14/15+
            enableEdgeToEdge?.();
            // Make navigation bar transparent and immersive
            await NavigationBar.setBackgroundColorAsync('transparent').catch(() => {});
            await NavigationBar.setVisibilityAsync('immersive').catch(() => {});
            await NavigationBar.setBehaviorAsync('overlay-swipe').catch(() => {});
          } catch {}
        }
        // Load locale preference
        try {
          const { loadLocaleFromStorage } = await import('../src/i18n')
          await loadLocaleFromStorage()
        } catch {}

        // Pre-load any fonts or resources here
        // await Font.loadAsync({
        //   'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        // });
        
        // Minimal initialization for smooth startup
        await new Promise(resolve => setTimeout(resolve, 200));
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
      <View style={{
        flex: 1, 
        backgroundColor: '#1E40AF',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator size="large" color="white" />
        <Text style={{
          color: 'white',
          marginTop: 16,
          fontSize: 16,
          fontWeight: '500'
        }}>Loading TAPANGO...</Text>
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
  return (
    <Theme name={isDark ? 'tapango_dark' : 'tapango_light'}>
      <AppToastProvider>
        <SafeAreaProvider>
          <StatusBar style={isDark ? 'light' : 'dark'} backgroundColor="transparent" translucent={true} />
          <GlobalErrorCatcher />
          <OfflineBanner />
          <AppNavigator />
        </SafeAreaProvider>
      </AppToastProvider>
    </Theme>
  );
}

function AppNavigator() {
  const { CountsProvider } = require('../src/contexts/CountsContext');
  return (
    <CountsProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(modals)" options={{ presentation: 'modal', headerShown: false }} />
      </Stack>
    </CountsProvider>
  );
}
