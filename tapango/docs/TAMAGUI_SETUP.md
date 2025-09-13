# TAPANGO Tamagui Setup Guide

## Overview

This guide provides instructions for integrating Tamagui UI components into the TAPANGO mobile logistics platform. Tamagui offers optimized, cross-platform UI components that work seamlessly with Expo Router.

## Prerequisites

- Node.js 18.0.0 or greater
- Yarn 4.4.0 or greater (recommended) or npm 8.0.0+
- Expo CLI installed globally
- Existing TAPANGO project structure

## Installation

### 1. Install Tamagui Dependencies

```bash
# Core Tamagui packages
npm install @tamagui/config/v4 tamagui

# Babel plugin for optimizations
npm install --save-dev @tamagui/babel-plugin

# Font packages (optional but recommended)
npm install @tamagui/font-inter

# Animation support (if using Reanimated)
npm install react-native-reanimated
```

### 2. Configure Babel

Update your `babel.config.js` to include Tamagui optimizations:

```js
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development',
        },
      ],
      // Enable if using react-native-reanimated
      'react-native-reanimated/plugin',
    ],
  };
};
```

### 3. Create Tamagui Configuration

Create a `tamagui.config.ts` file in your project root:

```typescript
// tamagui.config.ts
import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui } from 'tamagui';

// Customize the default config for TAPANGO brand colors
const config = createTamagui({
  ...defaultConfig,
  themes: {
    ...defaultConfig.themes,
    // Add TAPANGO custom themes
    tapango_light: {
      ...defaultConfig.themes.light,
      background: '#FFFFFF',
      color: '#0F172A',
      primary: '#1E40AF', // TAPANGO Blue
      secondary: '#6366F1', // TAPANGO Indigo
      accent: '#F59E0B', // TAPANGO Amber
      success: '#059669',
      warning: '#D97706',
      error: '#DC2626',
    },
    tapango_dark: {
      ...defaultConfig.themes.dark,
      background: '#0F172A',
      color: '#F8FAFC',
      primary: '#60A5FA', // Lighter blue for dark mode
      secondary: '#818CF8', // Lighter indigo
      accent: '#FBBF24', // Lighter amber
      success: '#34D399',
      warning: '#FBBF24',
      error: '#F87171',
    },
  },
});

export const tamaguiConfig = config;
export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
```

### 4. Update Root Layout

Modify your `app/_layout.tsx` to include the TamaguiProvider:

```tsx
// app/_layout.tsx
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { TamaguiProvider, useColorScheme } from 'tamagui';
import { ReactQueryProvider } from '../src/utils/reactQuery';
import { ThemeProvider } from '../src/styles/ThemeProvider';
import { OfflineBanner } from '../src/components/OfflineBanner';
import { drainPendingBookings } from '../src/utils/offlineQueue';
import { initSentry } from '../src/utils/sentry';
import { tamaguiConfig } from '../tamagui.config';
import * as SecureStore from 'expo-secure-store';

// ... existing tokenCache and publishableKey setup ...

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    initSentry();
    
    async function prepare() {
      try {
        // Load custom fonts if needed
        // await Font.loadAsync({
        //   Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
        //   InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
        // });
        
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (e) {
        console.warn('Error during app preparation:', e);
      } finally {
        setAppIsReady(true);
        drainPendingBookings().catch(() => {});
      }
    }

    prepare();
  }, []);

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
          defaultTheme={colorScheme === 'dark' ? 'tapango_dark' : 'tapango_light'}
        >
          <ThemeProvider>
            <SafeAreaProvider>
              <StatusBar style="auto" />
              <OfflineBanner />
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="splash" options={{ headerShown: false }} />
                <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(modals)" options={{ presentation: 'modal', headerShown: false }} />
              </Stack>
            </SafeAreaProvider>
          </ThemeProvider>
        </TamaguiProvider>
      </ReactQueryProvider>
    </ClerkProvider>
  );
}
```

### 5. Font Loading (Optional)

If you want to use custom fonts, install the font package and load them:

```bash
npx expo install expo-font
npm install @tamagui/font-inter
```

```tsx
// In your root component
import { useFonts } from 'expo-font';

const [loaded] = useFonts({
  Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
  InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
});

useEffect(() => {
  if (loaded) {
    // Fonts loaded, can proceed
  }
}, [loaded]);
```

## Web Support

### 1. Configure Metro for Web

Create a `tamagui-web.css` file in your project root:

```css
/* tamagui-web.css */
html {
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

body {
  margin: 0;
  padding: 0;
}
```

### 2. Import CSS in Layout

Add the CSS import to your `app/_layout.tsx`:

```tsx
import '../tamagui-web.css';
// ... rest of your imports
```

## Using Tamagui Components

### Basic Example

```tsx
// Example: Using Tamagui components in a screen
import React from 'react';
import { YStack, XStack, Button, Text, Card, H2 } from 'tamagui';

export default function ExampleScreen() {
  return (
    <YStack flex={1} padding="$4" space="$4" backgroundColor="$background">
      <H2>TAPANGO Logistics</H2>
      
      <Card elevate bordered padding="$4">
        <YStack space="$3">
          <Text fontSize="$5">Quick Actions</Text>
          
          <XStack space="$2">
            <Button flex={1} theme="primary">
              New Booking
            </Button>
            <Button flex={1} theme="secondary">
              Track Order
            </Button>
          </XStack>
        </YStack>
      </Card>
    </YStack>
  );
}
```

### Integration with Existing Components

You can gradually migrate existing components to use Tamagui:

```tsx
// Before (React Native)
import { View, TouchableOpacity, Text } from 'react-native';

const OldButton = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ padding: 16, backgroundColor: '#1E40AF' }}>
      <Text style={{ color: 'white' }}>{title}</Text>
    </View>
  </TouchableOpacity>
);

// After (Tamagui)
import { Button } from 'tamagui';

const NewButton = ({ title, onPress }) => (
  <Button onPress={onPress} theme="primary">
    {title}
  </Button>
);
```

## Development Scripts

Update your `package.json` scripts for optimal development:

```json
{
  "scripts": {
    "start": "expo start -c",
    "start:dev": "expo start --dev-client -c",
    "start:tunnel": "expo start --tunnel -c",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "web": "expo start --web -c"
  }
}
```

## Best Practices for TAPANGO

### 1. Theme Integration

- Use Tamagui themes alongside your existing ThemeProvider
- Create custom theme variants for TAPANGO brand colors
- Maintain consistency with your current design system

### 2. Performance Optimization

- Enable the Babel plugin for production builds
- Use `disableExtraction: process.env.NODE_ENV === 'development'` for faster development
- Leverage Tamagui's tree-shaking capabilities

### 3. Component Migration Strategy

1. Start with new components using Tamagui
2. Gradually migrate existing UI components
3. Maintain backward compatibility during transition
4. Test thoroughly on both native and web platforms

### 4. Responsive Design

```tsx
// Use Tamagui's responsive props for different screen sizes
<YStack
  padding="$2" // Small screens
  $gtSm={{ padding: '$4' }} // Medium screens and up
  $gtMd={{ padding: '$6' }} // Large screens and up
>
  {/* Content */}
</YStack>
```

## Troubleshooting

### Common Issues

1. **Metro Cache Issues**: Always start with `expo start -c` after installing Tamagui
2. **Font Loading**: Ensure fonts are properly loaded before rendering components
3. **Web Compatibility**: Test web builds after adding Tamagui components
4. **Theme Conflicts**: Ensure Tamagui themes don't conflict with your existing theme system

### Clear Cache Command

```bash
# Clear all caches and restart
npx expo start -c --reset-cache
```

## Next Steps

1. Install Tamagui dependencies
2. Configure Babel and create config file
3. Update root layout with TamaguiProvider
4. Start migrating components gradually
5. Test on all target platforms (iOS, Android, Web)
6. Optimize for production builds

For more detailed documentation, visit the [official Tamagui documentation](https://tamagui.dev/).

## TAPANGO-Specific Notes

- Maintain the existing theme structure while adding Tamagui support
- Ensure logistics-specific components (tracking, booking, etc.) work seamlessly
- Test thoroughly with offline functionality
- Consider the impact on bundle size for mobile users
- Keep accessibility in mind for logistics operators using the app

---

*This guide is specifically tailored for the TAPANGO logistics platform. For general Tamagui documentation, refer to the official docs.*
