# TapanGo Splash & Onboarding Implementation Guide

## Overview

This guide provides step-by-step instructions for implementing the TapanGo splash screen and onboarding flow with Lottie animations, following modern design principles and best practices.

## Prerequisites

### Required Dependencies

```bash
npm install --save lottie-react-native
npm install --save react-native-safe-area-context
npm install --save react-native-linear-gradient
npm install --save @react-native-async-storage/async-storage
```

### iOS Setup (for react-native-lottie)
```bash
cd ios && pod install
```

### Android Setup
Add to `android/app/build.gradle`:
```gradle
android {
  ...
  packagingOptions {
    pickFirst '**/libc++_shared.so'
    pickFirst '**/libjsc.so'
  }
}
```

## File Structure

```
src/
├── screens/
│   ├── SplashScreen.tsx
│   └── OnboardingScreen.tsx
├── components/
│   ├── LottieAnimation.tsx
│   └── AnimatedButton.tsx
├── utils/
│   ├── storage.ts
│   └── animations.ts
├── styles/
│   ├── colors.ts
│   ├── typography.ts
│   └── spacing.ts
└── assets/
    └── lottie/
        ├── splash.json
        ├── tapango.json
        ├── hero.json
        ├── easy-booking.json
        ├── fast-and-reliable.json
        ├── delivery-van.json
        ├── profile.json
        └── customer.json
```

## Implementation Steps

### Step 1: Create Color System

Create `src/styles/colors.ts`:
```typescript
export const colors = {
  primary: {
    orange: '#F68F1D',
    red: '#D22D2C',
    brown: '#B25D17',
  },
  secondary: {
    lightBlue: '#E1F4FF',
    lightOrange: '#F5E6D3',
    warmBeige: '#B28F6F',
  },
  neutral: {
    darkGray: '#383838',
    mediumGray: '#666666',
    lightGray: '#F5F5F5',
    white: '#FFFFFF',
  },
  gradients: {
    primary: ['#F68F1D', '#D22D2C'],
    secondary: ['#E1F4FF', '#F5E6D3'],
    service: ['#B25D17', '#F68F1D'],
    dark: ['#383838', '#666666'],
  },
};
```

### Step 2: Create Typography System

Create `src/styles/typography.ts`:
```typescript
import { Platform } from 'react-native';

export const typography = {
  fontFamily: {
    regular: Platform.select({
      ios: 'SF Pro Text',
      android: 'Roboto',
    }),
    medium: Platform.select({
      ios: 'SF Pro Text Medium',
      android: 'Roboto Medium',
    }),
    bold: Platform.select({
      ios: 'SF Pro Display Bold',
      android: 'Roboto Bold',
    }),
  },
  fontSize: {
    caption: 12,
    body: 14,
    bodyLarge: 16,
    subheading: 18,
    heading: 24,
    title: 28,
    largeTitle: 32,
  },
  lineHeight: {
    caption: 16,
    body: 20,
    bodyLarge: 24,
    subheading: 26,
    heading: 32,
    title: 36,
    largeTitle: 40,
  },
};
```

### Step 3: Create Animation Utilities

Create `src/utils/animations.ts`:
```typescript
import { Animated, Easing } from 'react-native';

export const animationConfig = {
  timing: {
    short: 200,
    medium: 300,
    long: 500,
    splash: 2500,
  },
  easing: {
    easeIn: Easing.in(Easing.ease),
    easeOut: Easing.out(Easing.ease),
    easeInOut: Easing.inOut(Easing.ease),
    spring: Easing.elastic(1),
  },
};

export const createFadeAnimation = (
  value: Animated.Value,
  toValue: number,
  duration: number = animationConfig.timing.medium
) => {
  return Animated.timing(value, {
    toValue,
    duration,
    easing: animationConfig.easing.easeOut,
    useNativeDriver: true,
  });
};

export const createScaleAnimation = (
  value: Animated.Value,
  toValue: number,
  duration: number = animationConfig.timing.medium
) => {
  return Animated.spring(value, {
    toValue,
    tension: 50,
    friction: 8,
    useNativeDriver: true,
  });
};

export const createSlideAnimation = (
  value: Animated.Value,
  toValue: number,
  duration: number = animationConfig.timing.medium
) => {
  return Animated.timing(value, {
    toValue,
    duration,
    easing: animationConfig.easing.easeOut,
    useNativeDriver: true,
  });
};
```

### Step 4: Create Storage Utilities

Create `src/utils/storage.ts`:
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  ONBOARDING_COMPLETED: 'onboarding_completed',
  FIRST_LAUNCH: 'first_launch',
  USER_PREFERENCES: 'user_preferences',
};

export const StorageService = {
  async setOnboardingCompleted(completed: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.ONBOARDING_COMPLETED,
        JSON.stringify(completed)
      );
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  },

  async getOnboardingCompleted(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
      return value ? JSON.parse(value) : false;
    } catch (error) {
      console.error('Error reading onboarding status:', error);
      return false;
    }
  },

  async setFirstLaunch(isFirst: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.FIRST_LAUNCH,
        JSON.stringify(isFirst)
      );
    } catch (error) {
      console.error('Error saving first launch status:', error);
    }
  },

  async isFirstLaunch(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.FIRST_LAUNCH);
      return value ? JSON.parse(value) : true;
    } catch (error) {
      console.error('Error reading first launch status:', error);
      return true;
    }
  },
};
```

### Step 5: Create Reusable Lottie Component

Create `src/components/LottieAnimation.tsx`:
```typescript
import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

interface LottieAnimationProps {
  source: any;
  style?: any;
  autoPlay?: boolean;
  loop?: boolean;
  speed?: number;
  onAnimationFinish?: () => void;
  resizeMode?: 'contain' | 'cover' | 'center';
  reduceMotion?: boolean;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  source,
  style,
  autoPlay = true,
  loop = true,
  speed = 1,
  onAnimationFinish,
  resizeMode = 'contain',
  reduceMotion = false,
}) => {
  const animationRef = useRef<LottieView>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      animationRef.current?.pause();
    }
    
    return () => {
      if (animationRef.current) {
        animationRef.current.reset();
      }
    };
  }, [reduceMotion]);

  const handleAnimationFinish = () => {
    onAnimationFinish?.();
  };

  return (
    <View style={style}>
      <LottieView
        ref={animationRef}
        source={source}
        autoPlay={autoPlay && !reduceMotion}
        loop={loop && !reduceMotion}
        speed={reduceMotion ? 0 : speed}
        onAnimationFinish={handleAnimationFinish}
        resizeMode={resizeMode}
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  animation: {
    width: '100%',
    height: '100%',
  },
});

export default LottieAnimation;
```

### Step 6: Create Main App Navigator

Create `src/navigation/AppNavigator.tsx`:
```typescript
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreens from '../screens/OnboardingScreens';
import MainApp from '../screens/MainApp';
import { StorageService } from '../utils/storage';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [initialRoute, setInitialRoute] = useState<string>('Splash');

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      const isFirstLaunch = await StorageService.isFirstLaunch();
      const onboardingCompleted = await StorageService.getOnboardingCompleted();

      if (isFirstLaunch || !onboardingCompleted) {
        setShowOnboarding(true);
        await StorageService.setFirstLaunch(false);
      }
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  };

  const handleSplashComplete = () => {
    if (showOnboarding) {
      setInitialRoute('Onboarding');
    } else {
      setInitialRoute('Main');
    }
    setIsLoading(false);
  };

  const handleOnboardingComplete = async () => {
    await StorageService.setOnboardingCompleted(true);
    setInitialRoute('Main');
  };

  const handleOnboardingSkip = async () => {
    await StorageService.setOnboardingCompleted(true);
    setInitialRoute('Main');
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash">
          {() => (
            <SplashScreen
              onAnimationComplete={handleSplashComplete}
              minimumDisplayTime={2500}
            />
          )}
        </Stack.Screen>
        
        {showOnboarding && (
          <Stack.Screen name="Onboarding">
            {() => (
              <OnboardingScreens
                onComplete={handleOnboardingComplete}
                onSkip={handleOnboardingSkip}
              />
            )}
          </Stack.Screen>
        )}
        
        <Stack.Screen
          name="Main"
          component={MainApp}
          options={{
            gestureEnabled: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
```

## Performance Optimization

### 1. Lottie Animation Optimization

```typescript
// Optimize Lottie files
// - Keep file sizes under 100KB
// - Use 30fps for smooth performance
// - Minimize the number of layers and effects
// - Use vector shapes instead of bitmap images

const optimizedLottieConfig = {
  speed: 1,
  loop: true,
  autoplay: true,
  renderer: 'svg', // Better performance on most devices
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
    progressiveLoad: true,
    hideOnTransparent: true,
  },
};
```

### 2. Memory Management

```typescript
// Properly cleanup animations
useEffect(() => {
  return () => {
    // Cleanup animations when component unmounts
    if (animationRef.current) {
      animationRef.current.reset();
      animationRef.current = null;
    }
  };
}, []);
```

### 3. Lazy Loading

```typescript
// Lazy load animations
const LazyLottieAnimation = React.lazy(() => import('./LottieAnimation'));

// Use with Suspense
<Suspense fallback={<ActivityIndicator />}>
  <LazyLottieAnimation source={animationSource} />
</Suspense>
```

## Accessibility Implementation

### 1. Reduced Motion Support

```typescript
import { AccessibilityInfo } from 'react-native';

const [reduceMotionEnabled, setReduceMotionEnabled] = useState(false);

useEffect(() => {
  AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotionEnabled);
  
  const subscription = AccessibilityInfo.addEventListener(
    'reduceMotionChanged',
    setReduceMotionEnabled
  );
  
  return () => subscription?.remove();
}, []);
```

### 2. Screen Reader Support

```typescript
// Add accessibility labels
<View
  accessible={true}
  accessibilityLabel="Welcome to TapanGo delivery service"
  accessibilityHint="Swipe right to continue to next screen"
  accessibilityRole="button"
>
  <LottieAnimation source={animation} />
</View>
```

### 3. Voice Over Support

```typescript
// Announce screen changes
import { AccessibilityInfo } from 'react-native';

useEffect(() => {
  AccessibilityInfo.announceForAccessibility(
    `Screen ${currentIndex + 1} of ${totalScreens}. ${screenTitle}`
  );
}, [currentIndex]);
```

## Testing

### Unit Testing
```typescript
// SplashScreen.test.tsx
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import SplashScreen from '../SplashScreen';

describe('SplashScreen', () => {
  it('should call onAnimationComplete after minimum display time', async () => {
    const mockOnComplete = jest.fn();
    
    render(
      <SplashScreen 
        onAnimationComplete={mockOnComplete}
        minimumDisplayTime={1000}
      />
    );
    
    await waitFor(
      () => {
        expect(mockOnComplete).toHaveBeenCalled();
      },
      { timeout: 2000 }
    );
  });
});
```

### Integration Testing
```typescript
// OnboardingFlow.test.tsx
import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import OnboardingScreens from '../OnboardingScreens';

describe('OnboardingScreens', () => {
  it('should navigate through all screens', async () => {
    const mockOnComplete = jest.fn();
    const { getByText } = render(
      <OnboardingScreens onComplete={mockOnComplete} onSkip={() => {}} />
    );
    
    // Navigate through screens
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Get Started'));
    
    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalled();
    });
  });
});
```

## Troubleshooting

### Common Issues

1. **Lottie animations not playing**
   - Check file format (should be JSON)
   - Verify animation paths in import statements
   - Ensure animations are optimized for mobile

2. **Performance issues**
   - Reduce animation complexity
   - Use smaller file sizes
   - Implement proper cleanup

3. **Navigation issues**
   - Check AsyncStorage permissions
   - Verify navigation stack setup
   - Test on different device sizes

4. **Android-specific issues**
   - Update gradle configuration
   - Check ProGuard settings
   - Verify native dependencies

### Debug Mode

```typescript
// Add debug logging
const DEBUG_MODE = __DEV__;

if (DEBUG_MODE) {
  console.log('Animation loaded:', animationSource);
  console.log('Current screen:', currentIndex);
  console.log('Onboarding completed:', onboardingCompleted);
}
```

## Production Checklist

- [ ] All animations are optimized and under 100KB
- [ ] Accessibility features are implemented
- [ ] Performance testing completed
- [ ] Cross-platform testing done
- [ ] AsyncStorage permissions configured
- [ ] Proper error handling implemented
- [ ] Debug logs removed
- [ ] Bundle size analysis completed

---

For additional support and updates, refer to the main documentation and component library.

**Version**: 1.0.0  
**Last Updated**: $(Get-Date -Format "yyyy-MM-dd")  
**Compatibility**: React Native 0.70+
