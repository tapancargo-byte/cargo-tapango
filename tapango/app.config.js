export default {
  expo: {
    name: 'TAPANGO',
    slug: 'tapango-mobile',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true, // SDK 54: New Architecture is now default
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#FFFFFF',
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
        backgroundColor: '#ffffff',
      },
      package: 'com.tapango.mobile',
      // SDK 54: Android 16 features
      predictiveBackGestureEnabled: true, // Enable predictive back gesture
      softwareKeyboardLayoutMode: 'resize',
      navigationBar: {
        enforceContrast: true, // Keep contrast for accessibility
        backgroundColor: '#00000000', // Transparent nav bar for edge-to-edge
      },
    },
    androidStatusBar: {
      translucent: true,
      backgroundColor: '#00000000',
      barStyle: 'light-content',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    scheme: 'tapango',
    plugins: [
      'expo-router',
      [
        'expo-navigation-bar',
        {
          backgroundColor: '#00000000',
          barStyle: 'light',
          visibility: 'immersive',
          behavior: 'overlay-swipe',
          position: 'absolute',
        },
      ],
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
          backgroundColor: '#FFFFFF',
          image: './assets/splash-icon.png',
          dark: {
            image: './assets/splash-icon-dark.png',
            backgroundColor: '#0B0B0B',
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
  },
};
