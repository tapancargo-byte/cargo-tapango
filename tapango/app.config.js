export default {
  expo: {
    name: 'TAPANGO',
    slug: 'tapango-mobile',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true, // SDK 54: New Architecture is now default

    // Expo Updates: use appVersion-based runtime, and check on every launch.
    runtimeVersion: { policy: 'appVersion' },
    updates: {
      checkAutomatically: 'ALWAYS',
    },

    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#FAFBFF', // Match design system background
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.tapango.mobile',
      // SDK 54: Add Liquid Glass icon support when ready
      // icon: './assets/app.icon'
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FAFBFF', // Match design system
      },
      package: 'com.tapango.mobile',
      // SDK 54+ predictive back gesture (opt-in)
      enablePredictiveBackGesture: true,
    },
    androidStatusBar: {
      translucent: true,
      backgroundColor: '#FAFBFF', // Match splash and design system
      barStyle: 'dark-content', // Better contrast with light background
    },
    // RN 0.81: navigation bar options are available without extra packages
    androidNavigationBar: {
      backgroundColor: '#FAFBFF',
      barStyle: 'dark-content',
      behavior: 'inset-swipe', // works with edge-to-edge & predictive back
      enforceContrast: true,
    },

    web: {
      favicon: './assets/favicon.png',
    },
    scheme: 'tapango',
    plugins: [
      [
        'onesignal-expo-plugin',
        {
          mode:
            process.env.NODE_ENV === 'production'
              ? 'production'
              : 'development',
        },
      ],
      'expo-router',
      // expo-navigation-bar removed for Expo Go development
      // Will be re-added for production builds
      [
        'expo-build-properties',
        {
          android: {
            compileSdkVersion: 35,
            targetSdkVersion: 35,
          },
        },
      ],
      [
        'expo-splash-screen',
        {
          backgroundColor: '#FAFBFF', // Match design system
          image: './assets/splash-icon.png',
          dark: {
            image: './assets/splash-icon-dark.png',
            backgroundColor: '#0A0E1A', // Match dark theme background
          },
          imageWidth: 150,
          resizeMode: 'contain',
        },
      ],
      [
        'expo-notifications',
        {
          color: '#ffffff',
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    // SDK 54: Performance improvements
    buildCacheProvider: 'eas', // Enable build cache for faster builds

    // Public runtime values available via Constants.expoConfig.extra
    extra: {
      api: {
        // Optional: set EXPO_PUBLIC_PUSH_REGISTER_URL to enable push token upload
        pushRegisterUrl: process.env.EXPO_PUBLIC_PUSH_REGISTER_URL || null,
        // Optional: set EXPO_PUBLIC_SMS_SEND_URL to enable server-side SMS sending via Supabase Edge Function
        smsSendUrl: process.env.EXPO_PUBLIC_SMS_SEND_URL || null,
      },
      // Feature flags (client-visible)
      features: {
        // Gate SMS sends to avoid accidental usage in development
        enableBookingSms:
          String(
            process.env.EXPO_PUBLIC_ENABLE_BOOKING_SMS || ''
          ).toLowerCase() === 'true',
      },
      // Read at runtime via Constants.expoConfig.extra.oneSignalAppId
      oneSignalAppId: process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID || null,
      privacyPolicyUrl: process.env.EXPO_PUBLIC_PRIVACY_URL || null,
    },
  },
};
