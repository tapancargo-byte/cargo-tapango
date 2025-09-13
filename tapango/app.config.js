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
      backgroundColor: '#FFFFFF'
    },
    assetBundlePatterns: [
      '**/*'
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.tapango.mobile'
      // SDK 54: Add Liquid Glass icon support when ready
      // icon: './assets/app.icon' 
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff'
      },
      package: 'com.tapango.mobile',
      // SDK 54: Android 16 features
      predictiveBackGestureEnabled: true, // Enable predictive back gesture
      navigationBar: {
        enforceContrast: true // Replaces react-native-edge-to-edge
      }
    },
    web: {
      favicon: './assets/favicon.png'
    },
    scheme: 'tapango',
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          backgroundColor: '#FFFFFF',
          image: './assets/splash-icon.png',
          dark: {
            image: './assets/splash-icon-dark.png',
            backgroundColor: '#0B0B0B'
          },
          imageWidth: 150,
          resizeMode: 'contain'
        }
      ],
      [
        'expo-notifications',
        {
          icon: './assets/notification-icon.png',
          color: '#ffffff'
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    // SDK 54: Performance improvements
    buildCacheProvider: "eas" // Enable build cache for faster builds
  }
};
