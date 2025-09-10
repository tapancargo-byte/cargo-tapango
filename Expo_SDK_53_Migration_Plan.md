# TAPANGO Migration Plan - Expo SDK 53 Native UI Edition

## 📋 Executive Summary

### Migration Philosophy
Transform TAPAN-GO into an enterprise-grade cargo logistics platform using **100% Expo SDK 53 Native UI components** - no external UI libraries, leveraging React 19, New Architecture, and modern React Native patterns.

### Key Technical Pillars
- ✅ **Pure Expo SDK 53 UI** - Zero external UI dependencies
- ✅ **New Architecture** - Fabric renderer and TurboModules
- ✅ **React 19** - Suspense, use() hook, and concurrent features
- ✅ **TypeScript 5.8.3** - Latest type safety and performance
- ✅ **Edge-to-Edge Design** - Modern Android 16+ compliance

---

## 🎯 Technical Foundation Analysis

### Current State Assessment

#### TAPAN-GO (Current - Basic Starter)
```typescript
// Current limited stack
{
  "expo": "53.0.22",
  "react": "19.0.0", 
  "react-native": "0.79.5",
  "components": "3 basic components",
  "ui_library": "minimal custom components"
}
```

#### Target State (Expo SDK 53 Enterprise)
```typescript
// Target enterprise stack
{
  "expo": "^53.0.0",
  "react": "19.0.0",
  "react-native": "0.79.5", 
  "expo-router": "~4.0.0",
  "typescript": "~5.8.3",
  "ui_strategy": "100% Expo SDK 53 Native UI",
  "architecture": "New Architecture enabled",
  "features": "React 19 + Suspense + use() hook"
}
```

### Expo SDK 53 Native UI Component Inventory

#### Core React Native Components (Available)
```typescript
// Primary UI Building Blocks
import { 
  View, Text, Button, Pressable, TextInput,
  Image, ScrollView, FlatList, SectionList,
  Modal, Alert, ActivityIndicator, Switch,
  Slider, KeyboardAvoidingView, SafeAreaView,
  StatusBar, RefreshControl, Animated
} from 'react-native';

// Expo SDK 53 Enhanced Components
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { CameraView } from 'expo-camera';
import { LocationObject } from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
```

#### Missing UI Components (To Build with Native Components)
```typescript
// Components we need to build using native primitives
❌ Card component (build with View + styling)
❌ Input component (build with TextInput + enhancements)
❌ Button variants (build with Pressable + styling)
❌ Loading states (build with ActivityIndicator + View)
❌ Navigation components (build with native navigation)
❌ Form components (build with TextInput + validation)
❌ List components (build with FlatList + enhancements)
```

---

## 🚀 Comprehensive Migration Plan

### Phase 1: Foundation & New Architecture Setup (Week 1 - 5 Days)

#### Day 1-2: Project Foundation
```bash
# 1. Create new Expo SDK 53 project
npx create-expo-app@latest tapango-sdk53 --template expo-template-blank-typescript

# 2. Verify SDK 53 installation
cd tapango-sdk53
npx expo install --fix

# 3. Confirm New Architecture
npx expo config --type prebuild
```

#### New Architecture Configuration
```json
// app.json - New Architecture enabled by default in SDK 53
{
  "expo": {
    "name": "Tapango SDK 53",
    "slug": "tapango-sdk53",
    "version": "1.0.0",
    "platforms": ["ios", "android"],
    "newArchEnabled": true,
    "plugins": [
      [
        "expo-build-properties",
        {
          "android": {
            "newArchEnabled": true,
            "enableProguardInReleaseBuilds": true,
            "enableShrinkResourcesInReleaseBuilds": true
          },
          "ios": {
            "newArchEnabled": true
          }
        }
      ]
    ]
  }
}
```

#### Day 3: Edge-to-Edge Implementation
```typescript
// app/_layout.tsx - Edge-to-edge with New Architecture
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      // Android 16+ edge-to-edge preparation
      NavigationBar.setBackgroundColorAsync('transparent');
      NavigationBar.setButtonStyleAsync('light');
    }
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="splash" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="role-selection" />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
```

#### Day 4-5: Design System with Native Components
```typescript
// src/theme/design-system.ts - Pure Expo SDK 53 Design System
export const TapangoDesignSystem = {
  // Color palette optimized for cargo logistics
  colors: {
    // Primary brand colors
    primary: {
      50: '#E3F2FD',
      100: '#BBDEFB', 
      500: '#1A237E', // Main brand color
      600: '#1565C0',
      700: '#0D47A1',
      900: '#0D47A1',
    },
    
    // Cargo logistics semantic colors
    cargo: {
      air: '#FF5722',      // Air freight orange
      truck: '#4CAF50',    // Ground transport green
      express: '#F44336',  // Express red
      standard: '#2196F3', // Standard blue
    },
    
    // Status colors for logistics
    status: {
      pending: '#FF9800',
      confirmed: '#2196F3',
      pickedUp: '#9C27B0',
      inTransit: '#FF5722',
      delivered: '#4CAF50',
      cancelled: '#F44336',
    },
    
    // UI colors
    background: '#FFFFFF',
    surface: '#F8F9FA',
    surfaceVariant: '#F1F3F4',
    outline: '#E0E0E0',
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#BDBDBD',
      inverse: '#FFFFFF',
    },
  },
  
  // Spacing system (8dp grid)
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  
  // Typography scale
  typography: {
    // Display styles
    displayLarge: { fontSize: 57, fontWeight: '400', lineHeight: 64 },
    displayMedium: { fontSize: 45, fontWeight: '400', lineHeight: 52 },
    displaySmall: { fontSize: 36, fontWeight: '400', lineHeight: 44 },
    
    // Headline styles  
    headlineLarge: { fontSize: 32, fontWeight: '400', lineHeight: 40 },
    headlineMedium: { fontSize: 28, fontWeight: '400', lineHeight: 36 },
    headlineSmall: { fontSize: 24, fontWeight: '400', lineHeight: 32 },
    
    // Title styles
    titleLarge: { fontSize: 22, fontWeight: '400', lineHeight: 28 },
    titleMedium: { fontSize: 16, fontWeight: '500', lineHeight: 24 },
    titleSmall: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
    
    // Body styles
    bodyLarge: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
    bodyMedium: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
    bodySmall: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
    
    // Label styles
    labelLarge: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
    labelMedium: { fontSize: 12, fontWeight: '500', lineHeight: 16 },
    labelSmall: { fontSize: 11, fontWeight: '500', lineHeight: 16 },
  },
  
  // Border radius system
  borderRadius: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 28,
    full: 9999,
  },
  
  // Elevation system
  elevation: {
    level0: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    level1: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    level2: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    level3: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
  },
} as const;
```

### Phase 2: Core UI Components with Native Primitives (Week 1-2 - 7 Days)

#### Day 6-7: Button Component System
```typescript
// src/components/ui/Button.tsx - Pure React Native implementation
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TapangoDesignSystem } from '../../theme/design-system';

type ButtonVariant = 'filled' | 'outlined' | 'text' | 'elevated';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonColor = 'primary' | 'secondary' | 'cargo-air' | 'cargo-truck' | 'error';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = 'filled',
  size = 'medium',
  color = 'primary',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
}: ButtonProps) {
  const theme = TapangoDesignSystem;
  
  // Color mapping
  const colorMap = {
    primary: theme.colors.primary[500],
    secondary: theme.colors.primary[100],
    'cargo-air': theme.colors.cargo.air,
    'cargo-truck': theme.colors.cargo.truck,
    error: theme.colors.status.cancelled,
  };
  
  // Variant styles
  const variantStyles = {
    filled: {
      backgroundColor: colorMap[color],
      borderWidth: 0,
    },
    outlined: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colorMap[color],
    },
    text: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    elevated: {
      backgroundColor: colorMap[color],
      borderWidth: 0,
      ...theme.elevation.level2,
    },
  };
  
  // Size styles
  const sizeStyles = {
    small: {
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.md,
      minHeight: 32,
    },
    medium: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.lg,
      minHeight: 40,
    },
    large: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.xl,
      minHeight: 48,
    },
  };
  
  // Text color based on variant
  const textColor = variant === 'outlined' || variant === 'text' 
    ? colorMap[color] 
    : theme.colors.text.inverse;
  
  const iconSize = size === 'small' ? 16 : size === 'medium' ? 20 : 24;
  
  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        sizeStyles[size],
        disabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      <View style={styles.content}>
        {icon && iconPosition === 'left' && (
          <Ionicons 
            name={icon} 
            size={iconSize} 
            color={textColor} 
            style={styles.iconLeft}
          />
        )}
        
        <Text style={[
          theme.typography.labelLarge,
          { color: textColor },
          textStyle,
        ]}>
          {loading ? 'Loading...' : title}
        </Text>
        
        {icon && iconPosition === 'right' && (
          <Ionicons 
            name={icon} 
            size={iconSize} 
            color={textColor} 
            style={styles.iconRight}
          />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: TapangoDesignSystem.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: TapangoDesignSystem.spacing.xs,
  },
  iconRight: {
    marginLeft: TapangoDesignSystem.spacing.xs,
  },
  disabled: {
    opacity: 0.38,
  },
  pressed: {
    opacity: 0.8,
  },
});
```

#### Day 8-9: Card Component System
```typescript
// src/components/ui/Card.tsx - Material Design 3 inspired card
import { View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { TapangoDesignSystem } from '../../theme/design-system';

type CardVariant = 'elevated' | 'filled' | 'outlined';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  onPress?: () => void;
  style?: ViewStyle;
}

export function Card({ 
  children, 
  variant = 'elevated', 
  onPress, 
  style 
}: CardProps) {
  const theme = TapangoDesignSystem;
  
  const variantStyles = {
    elevated: {
      backgroundColor: theme.colors.surface,
      ...theme.elevation.level1,
      borderWidth: 0,
    },
    filled: {
      backgroundColor: theme.colors.surfaceVariant,
      ...theme.elevation.level0,
      borderWidth: 0,
    },
    outlined: {
      backgroundColor: theme.colors.background,
      ...theme.elevation.level0,
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
  };
  
  const CardComponent = onPress ? Pressable : View;
  
  return (
    <CardComponent
      style={[
        styles.base,
        variantStyles[variant],
        style,
      ]}
      onPress={onPress}
    >
      {children}
    </CardComponent>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: TapangoDesignSystem.borderRadius.lg,
    padding: TapangoDesignSystem.spacing.md,
  },
});
```

#### Day 10-12: Input Component System
```typescript
// src/components/ui/TextInput.tsx - Enhanced TextInput component
import { 
  TextInput as RNTextInput, 
  View, 
  Text, 
  StyleSheet, 
  ViewStyle,
  TextInputProps as RNTextInputProps,
  Pressable
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TapangoDesignSystem } from '../../theme/design-system';

interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  leadingIcon?: keyof typeof Ionicons.glyphMap;
  trailingIcon?: keyof typeof Ionicons.glyphMap;
  onTrailingIconPress?: () => void;
  containerStyle?: ViewStyle;
  variant?: 'outlined' | 'filled';
}

export function TextInput({
  label,
  helperText,
  errorText,
  leadingIcon,
  trailingIcon,
  onTrailingIconPress,
  containerStyle,
  variant = 'outlined',
  secureTextEntry,
  ...textInputProps
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const theme = TapangoDesignSystem;
  
  const hasError = Boolean(errorText);
  const isPasswordField = secureTextEntry;
  
  const containerStyles = {
    outlined: {
      borderWidth: 1,
      borderColor: hasError 
        ? theme.colors.status.cancelled
        : isFocused 
        ? theme.colors.primary[500]
        : theme.colors.outline,
      backgroundColor: theme.colors.background,
    },
    filled: {
      borderWidth: 0,
      backgroundColor: theme.colors.surfaceVariant,
      borderBottomWidth: 1,
      borderBottomColor: hasError
        ? theme.colors.status.cancelled
        : isFocused
        ? theme.colors.primary[500]
        : theme.colors.outline,
    },
  };
  
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[
          styles.label,
          theme.typography.bodySmall,
          { color: hasError ? theme.colors.status.cancelled : theme.colors.text.primary }
        ]}>
          {label}
        </Text>
      )}
      
      <View style={[
        styles.inputContainer,
        containerStyles[variant],
        isFocused && styles.focused,
      ]}>
        {leadingIcon && (
          <Ionicons
            name={leadingIcon}
            size={24}
            color={theme.colors.text.secondary}
            style={styles.leadingIcon}
          />
        )}
        
        <RNTextInput
          style={[
            styles.input,
            theme.typography.bodyLarge,
            { color: theme.colors.text.primary }
          ]}
          placeholderTextColor={theme.colors.text.secondary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPasswordField && !showPassword}
          {...textInputProps}
        />
        
        {isPasswordField && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={styles.trailingIcon}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color={theme.colors.text.secondary}
            />
          </Pressable>
        )}
        
        {trailingIcon && !isPasswordField && (
          <Pressable onPress={onTrailingIconPress} style={styles.trailingIcon}>
            <Ionicons
              name={trailingIcon}
              size={24}
              color={theme.colors.text.secondary}
            />
          </Pressable>
        )}
      </View>
      
      {(helperText || errorText) && (
        <Text style={[
          styles.helperText,
          theme.typography.bodySmall,
          { color: hasError ? theme.colors.status.cancelled : theme.colors.text.secondary }
        ]}>
          {errorText || helperText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: TapangoDesignSystem.spacing.md,
  },
  label: {
    marginBottom: TapangoDesignSystem.spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: TapangoDesignSystem.borderRadius.md,
    minHeight: 56,
    paddingHorizontal: TapangoDesignSystem.spacing.md,
  },
  focused: {
    borderWidth: 2,
  },
  input: {
    flex: 1,
    paddingVertical: TapangoDesignSystem.spacing.sm,
  },
  leadingIcon: {
    marginRight: TapangoDesignSystem.spacing.sm,
  },
  trailingIcon: {
    marginLeft: TapangoDesignSystem.spacing.sm,
    padding: TapangoDesignSystem.spacing.xs,
  },
  helperText: {
    marginTop: TapangoDesignSystem.spacing.xs,
    marginLeft: TapangoDesignSystem.spacing.md,
  },
});
```

### Phase 3: Authentication Flow with React 19 (Week 2 - 5 Days)

#### Day 13-15: Splash & Onboarding with Suspense
```typescript
// app/splash.tsx - React 19 Suspense implementation
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useEffect, useRef, Suspense } from 'react';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { TapangoDesignSystem } from '../src/theme/design-system';

function SplashContent() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  
  useEffect(() => {
    // Animate splash screen
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Navigate after animation
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <LinearGradient
      colors={[TapangoDesignSystem.colors.primary[500], TapangoDesignSystem.colors.primary[700]]}
      style={styles.container}
    >
      <Animated.View style={[
        styles.content,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }
      ]}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>📦</Text>
        </View>
        
        <Text style={[
          styles.appName,
          TapangoDesignSystem.typography.displayMedium,
          { color: TapangoDesignSystem.colors.text.inverse }
        ]}>
          Tapango
        </Text>
        
        <Text style={[
          styles.tagline,
          TapangoDesignSystem.typography.bodyLarge,
          { color: TapangoDesignSystem.colors.text.inverse }
        ]}>
          Premium cargo logistics
        </Text>
      </Animated.View>
    </LinearGradient>
  );
}

export default function SplashScreen() {
  return (
    <Suspense fallback={<View style={styles.fallback} />}>
      <SplashContent />
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: TapangoDesignSystem.spacing.lg,
  },
  logo: {
    fontSize: 80,
  },
  appName: {
    marginBottom: TapangoDesignSystem.spacing.sm,
    textAlign: 'center',
  },
  tagline: {
    textAlign: 'center',
    opacity: 0.9,
  },
  fallback: {
    flex: 1,
    backgroundColor: TapangoDesignSystem.colors.primary[500],
  },
});
```

#### Day 16-17: Onboarding Flow
```typescript
// app/onboarding.tsx - Multi-screen onboarding
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  ScrollView,
  Pressable,
  Animated
} from 'react-native';
import { useState, useRef } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { TapangoDesignSystem } from '../src/theme/design-system';
import { Button } from '../src/components/ui/Button';

const { width } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

const onboardingData: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Fast Delivery',
    subtitle: 'Imphal ↔ Delhi',
    description: 'Lightning-fast cargo delivery between Imphal and New Delhi with real-time tracking',
    icon: 'rocket',
    color: TapangoDesignSystem.colors.cargo.air,
  },
  {
    id: '2',
    title: 'Secure Transport',
    subtitle: 'Professional Drivers',
    description: 'Your cargo is safe with our verified drivers and secure transport methods',
    icon: 'shield-checkmark',
    color: TapangoDesignSystem.colors.cargo.truck,
  },
  {
    id: '3',
    title: 'Real-time Tracking',
    subtitle: 'Always Connected',
    description: 'Track your shipments in real-time with precise location updates',
    icon: 'location',
    color: TapangoDesignSystem.colors.primary[500],
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;
  
  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
      
      // Animate progress
      Animated.timing(progressAnim, {
        toValue: nextIndex / (onboardingData.length - 1),
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      router.replace('/role-selection');
    }
  };
  
  const handleSkip = () => {
    router.replace('/role-selection');
  };
  
  const currentSlide = onboardingData[currentIndex];
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleSkip} style={styles.skipButton}>
          <Text style={[
            TapangoDesignSystem.typography.labelMedium,
            { color: TapangoDesignSystem.colors.text.secondary }
          ]}>
            Skip
          </Text>
        </Pressable>
      </View>
      
      {/* Content */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={styles.scrollView}
      >
        {onboardingData.map((slide, index) => (
          <View key={slide.id} style={styles.slide}>
            <LinearGradient
              colors={[slide.color + '20', slide.color + '10']}
              style={styles.iconContainer}
            >
              <Ionicons
                name={slide.icon}
                size={80}
                color={slide.color}
              />
            </LinearGradient>
            
            <Text style={[
              styles.title,
              TapangoDesignSystem.typography.headlineMedium,
              { color: TapangoDesignSystem.colors.text.primary }
            ]}>
              {slide.title}
            </Text>
            
            <Text style={[
              styles.subtitle,
              TapangoDesignSystem.typography.titleMedium,
              { color: slide.color }
            ]}>
              {slide.subtitle}
            </Text>
            
            <Text style={[
              styles.description,
              TapangoDesignSystem.typography.bodyLarge,
              { color: TapangoDesignSystem.colors.text.secondary }
            ]}>
              {slide.description}
            </Text>
          </View>
        ))}
      </ScrollView>
      
      {/* Footer */}
      <View style={styles.footer}>
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <Animated.View style={[
              styles.progressFill,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              }
            ]} />
          </View>
        </View>
        
        {/* Next Button */}
        <Button
          title={currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          variant="filled"
          color="primary"
          size="large"
          icon="arrow-forward"
          iconPosition="right"
          style={styles.nextButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TapangoDesignSystem.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: TapangoDesignSystem.spacing.lg,
    paddingVertical: TapangoDesignSystem.spacing.md,
  },
  skipButton: {
    padding: TapangoDesignSystem.spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: TapangoDesignSystem.spacing.xl,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: TapangoDesignSystem.spacing.xl,
  },
  title: {
    textAlign: 'center',
    marginBottom: TapangoDesignSystem.spacing.sm,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: TapangoDesignSystem.spacing.lg,
  },
  description: {
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: TapangoDesignSystem.spacing.lg,
    paddingBottom: TapangoDesignSystem.spacing.lg,
  },
  progressContainer: {
    marginBottom: TapangoDesignSystem.spacing.lg,
  },
  progressTrack: {
    height: 4,
    backgroundColor: TapangoDesignSystem.colors.outline,
    borderRadius: 2,
  },
  progressFill: {
    height: 4,
    backgroundColor: TapangoDesignSystem.colors.primary[500],
    borderRadius: 2,
  },
  nextButton: {
    width: '100%',
  },
});
```

### Phase 4: Navigation & Tab System (Week 2-3 - 5 Days)

#### Day 18-20: Advanced Tab Navigation
```typescript
// app/(tabs)/_layout.tsx - Enhanced tab navigation
import { Tabs } from 'expo-router';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TapangoDesignSystem } from '../../src/theme/design-system';
import { BlurView } from 'expo-blur';

interface TabBarIconProps {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
  focused: boolean;
}

function TabBarIcon({ name, color, size, focused }: TabBarIconProps) {
  return (
    <View style={[styles.iconContainer, focused && styles.iconFocused]}>
      <Ionicons name={name} size={size} color={color} />
      {focused && <View style={[styles.indicator, { backgroundColor: color }]} />}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: TapangoDesignSystem.colors.primary[500],
        tabBarInactiveTintColor: TapangoDesignSystem.colors.text.secondary,
        tabBarStyle: {
          backgroundColor: TapangoDesignSystem.colors.background,
          borderTopWidth: 1,
          borderTopColor: TapangoDesignSystem.colors.outline,
          height: 80,
          paddingBottom: 20,
          paddingTop: 8,
        },
        tabBarLabelStyle: [
          TapangoDesignSystem.typography.labelSmall,
          { marginTop: 4 }
        ],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon 
              name="home" 
              color={color} 
              size={size} 
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: 'Book',
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon 
              name="add-circle" 
              color={color} 
              size={size} 
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tracking"
        options={{
          title: 'Track',
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon 
              name="location" 
              color={color} 
              size={size} 
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon 
              name="list" 
              color={color} 
              size={size} 
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon 
              name="person" 
              color={color} 
              size={size} 
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  iconFocused: {
    transform: [{ scale: 1.1 }],
  },
  indicator: {
    position: 'absolute',
    bottom: -6,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});
```

#### Day 21-22: Enhanced Home Screen
```typescript
// app/(tabs)/index.tsx - Home screen with React 19 features
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Pressable,
  RefreshControl,
  Dimensions
} from 'react-native';
import { Suspense, use, useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { TapangoDesignSystem } from '../../src/theme/design-system';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';

const { width } = Dimensions.get('window');

// Mock data fetching functions
async function fetchUserData() {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    name: 'John Doe',
    totalOrders: 24,
    activeOrders: 3,
    completedOrders: 21,
  };
}

async function fetchRecentOrders() {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  return [
    { id: '1', awb: 'TG001234', status: 'in-transit', route: 'Imphal → Delhi' },
    { id: '2', awb: 'TG001235', status: 'delivered', route: 'Delhi → Imphal' },
    { id: '3', awb: 'TG001236', status: 'pending', route: 'Imphal → Delhi' },
  ];
}

// Components using React 19 Suspense and use() hook
function UserStats({ userPromise }: { userPromise: Promise<any> }) {
  const user = use(userPromise);
  
  return (
    <LinearGradient
      colors={[TapangoDesignSystem.colors.primary[500], TapangoDesignSystem.colors.primary[700]]}
      style={styles.heroSection}
    >
      <Text style={[
        TapangoDesignSystem.typography.headlineSmall,
        { color: TapangoDesignSystem.colors.text.inverse }
      ]}>
        Welcome back, {user.name}!
      </Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[
            TapangoDesignSystem.typography.displaySmall,
            { color: TapangoDesignSystem.colors.text.inverse }
          ]}>
            {user.totalOrders}
          </Text>
          <Text style={[
            TapangoDesignSystem.typography.bodySmall,
            { color: TapangoDesignSystem.colors.text.inverse, opacity: 0.8 }
          ]}>
            Total Orders
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[
            TapangoDesignSystem.typography.displaySmall,
            { color: TapangoDesignSystem.colors.text.inverse }
          ]}>
            {user.activeOrders}
          </Text>
          <Text style={[
            TapangoDesignSystem.typography.bodySmall,
            { color: TapangoDesignSystem.colors.text.inverse, opacity: 0.8 }
          ]}>
            Active
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[
            TapangoDesignSystem.typography.displaySmall,
            { color: TapangoDesignSystem.colors.text.inverse }
          ]}>
            {user.completedOrders}
          </Text>
          <Text style={[
            TapangoDesignSystem.typography.bodySmall,
            { color: TapangoDesignSystem.colors.text.inverse, opacity: 0.8 }
          ]}>
            Completed
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

function RecentOrders({ ordersPromise }: { ordersPromise: Promise<any[]> }) {
  const orders = use(ordersPromise);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return TapangoDesignSystem.colors.status.pending;
      case 'in-transit': return TapangoDesignSystem.colors.status.inTransit;
      case 'delivered': return TapangoDesignSystem.colors.status.delivered;
      default: return TapangoDesignSystem.colors.text.secondary;
    }
  };
  
  return (
    <View style={styles.section}>
      <Text style={[
        TapangoDesignSystem.typography.titleLarge,
        { color: TapangoDesignSystem.colors.text.primary }
      ]}>
        Recent Orders
      </Text>
      
      {orders.map((order) => (
        <Card key={order.id} variant="outlined" style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <Text style={[
              TapangoDesignSystem.typography.titleMedium,
              { color: TapangoDesignSystem.colors.text.primary }
            ]}>
              {order.awb}
            </Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(order.status) + '20' }
            ]}>
              <Text style={[
                TapangoDesignSystem.typography.labelSmall,
                { color: getStatusColor(order.status) }
              ]}>
                {order.status.toUpperCase()}
              </Text>
            </View>
          </View>
          
          <Text style={[
            TapangoDesignSystem.typography.bodyMedium,
            { color: TapangoDesignSystem.colors.text.secondary }
          ]}>
            {order.route}
          </Text>
        </Card>
      ))}
    </View>
  );
}

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [userPromise, setUserPromise] = useState(() => fetchUserData());
  const [ordersPromise, setOrdersPromise] = useState(() => fetchRecentOrders());
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setUserPromise(fetchUserData());
    setOrdersPromise(fetchRecentOrders());
    setTimeout(() => setRefreshing(false), 1000);
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Hero Section with User Stats */}
        <Suspense fallback={
          <View style={[styles.heroSection, styles.loadingHero]}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        }>
          <UserStats userPromise={userPromise} />
        </Suspense>
        
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[
            TapangoDesignSystem.typography.titleLarge,
            { color: TapangoDesignSystem.colors.text.primary }
          ]}>
            Quick Actions
          </Text>
          
          <View style={styles.actionsGrid}>
            <Card variant="filled" style={styles.actionCard}>
              <Ionicons 
                name="add-circle" 
                size={32} 
                color={TapangoDesignSystem.colors.cargo.air} 
              />
              <Text style={[
                TapangoDesignSystem.typography.labelLarge,
                { color: TapangoDesignSystem.colors.text.primary }
              ]}>
                Book Cargo
              </Text>
            </Card>
            
            <Card variant="filled" style={styles.actionCard}>
              <Ionicons 
                name="location" 
                size={32} 
                color={TapangoDesignSystem.colors.cargo.truck} 
              />
              <Text style={[
                TapangoDesignSystem.typography.labelLarge,
                { color: TapangoDesignSystem.colors.text.primary }
              ]}>
                Track Order
              </Text>
            </Card>
            
            <Card variant="filled" style={styles.actionCard}>
              <Ionicons 
                name="calculator" 
                size={32} 
                color={TapangoDesignSystem.colors.primary[500]} 
              />
              <Text style={[
                TapangoDesignSystem.typography.labelLarge,
                { color: TapangoDesignSystem.colors.text.primary }
              ]}>
                Price Calculator
              </Text>
            </Card>
            
            <Card variant="filled" style={styles.actionCard}>
              <Ionicons 
                name="headset" 
                size={32} 
                color={TapangoDesignSystem.colors.status.pending} 
              />
              <Text style={[
                TapangoDesignSystem.typography.labelLarge,
                { color: TapangoDesignSystem.colors.text.primary }
              ]}>
                Support
              </Text>
            </Card>
          </View>
        </View>
        
        {/* Recent Orders */}
        <Suspense fallback={
          <View style={styles.section}>
            <Text>Loading orders...</Text>
          </View>
        }>
          <RecentOrders ordersPromise={ordersPromise} />
        </Suspense>
        
        {/* CTA Section */}
        <View style={styles.section}>
          <Card variant="elevated" style={styles.ctaCard}>
            <Text style={[
              TapangoDesignSystem.typography.titleMedium,
              { color: TapangoDesignSystem.colors.text.primary }
            ]}>
              Need to ship something?
            </Text>
            <Text style={[
              TapangoDesignSystem.typography.bodyMedium,
              { color: TapangoDesignSystem.colors.text.secondary, marginVertical: 8 }
            ]}>
              Get instant quotes for Imphal ↔ Delhi cargo delivery
            </Text>
            <Button
              title="Book Now"
              onPress={() => {}}
              variant="filled"
              color="primary"
              icon="arrow-forward"
              iconPosition="right"
            />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TapangoDesignSystem.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    padding: TapangoDesignSystem.spacing.lg,
    margin: TapangoDesignSystem.spacing.md,
    borderRadius: TapangoDesignSystem.borderRadius.xl,
  },
  loadingHero: {
    backgroundColor: TapangoDesignSystem.colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    height: 160,
  },
  loadingText: {
    ...TapangoDesignSystem.typography.bodyMedium,
    color: TapangoDesignSystem.colors.text.secondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: TapangoDesignSystem.spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  section: {
    padding: TapangoDesignSystem.spacing.md,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: TapangoDesignSystem.spacing.md,
  },
  actionCard: {
    width: (width - 48) / 2 - 8,
    alignItems: 'center',
    paddingVertical: TapangoDesignSystem.spacing.lg,
    marginBottom: TapangoDesignSystem.spacing.md,
  },
  orderCard: {
    marginTop: TapangoDesignSystem.spacing.sm,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: TapangoDesignSystem.spacing.xs,
  },
  statusBadge: {
    paddingHorizontal: TapangoDesignSystem.spacing.sm,
    paddingVertical: TapangoDesignSystem.spacing.xs,
    borderRadius: TapangoDesignSystem.borderRadius.sm,
  },
  ctaCard: {
    padding: TapangoDesignSystem.spacing.lg,
  },
});
```

### Phase 5: Advanced Features & Location Services (Week 3-4 - 5 Days)

#### Day 23-25: Location Services Integration
```typescript
// src/services/location.ts - Enhanced location services
import * as Location from 'expo-location';
import { LocationObject, LocationAccuracy } from 'expo-location';

export interface LocationPermissionStatus {
  granted: boolean;
  canAskAgain: boolean;
  status: Location.PermissionStatus;
}

export interface AddressComponent {
  street?: string;
  city?: string;
  district?: string;
  region?: string;
  country?: string;
  postalCode?: string;
  formattedAddress: string;
}

export class LocationService {
  private static instance: LocationService;
  private watchSubscription: Location.LocationSubscription | null = null;
  
  public static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }
  
  /**
   * Request location permissions with detailed status
   */
  async requestPermissions(): Promise<LocationPermissionStatus> {
    try {
      const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
      
      return {
        granted: status === Location.PermissionStatus.GRANTED,
        canAskAgain,
        status,
      };
    } catch (error) {
      throw new Error(`Failed to request location permissions: ${error}`);
    }
  }
  
  /**
   * Get current location with high accuracy
   */
  async getCurrentLocation(): Promise<LocationObject> {
    const permissions = await this.requestPermissions();
    
    if (!permissions.granted) {
      throw new Error('Location permission denied');
    }
    
    try {
      return await Location.getCurrentPositionAsync({
        accuracy: LocationAccuracy.High,
        timeInterval: 5000,
        distanceInterval: 10,
      });
    } catch (error) {
      throw new Error(`Failed to get current location: ${error}`);
    }
  }
  
  /**
   * Start watching location changes
   */
  async startLocationTracking(
    callback: (location: LocationObject) => void,
    errorCallback?: (error: Error) => void
  ): Promise<void> {
    const permissions = await this.requestPermissions();
    
    if (!permissions.granted) {
      throw new Error('Location permission denied');
    }
    
    try {
      this.watchSubscription = await Location.watchPositionAsync(
        {
          accuracy: LocationAccuracy.High,
          timeInterval: 10000, // Update every 10 seconds
          distanceInterval: 50, // Update when moved 50 meters
        },
        callback
      );
    } catch (error) {
      errorCallback?.(new Error(`Failed to start location tracking: ${error}`));
    }
  }
  
  /**
   * Stop location tracking
   */
  stopLocationTracking(): void {
    if (this.watchSubscription) {
      this.watchSubscription.remove();
      this.watchSubscription = null;
    }
  }
  
  /**
   * Get address from coordinates with enhanced formatting
   */
  async getAddressFromCoords(
    latitude: number, 
    longitude: number
  ): Promise<AddressComponent> {
    try {
      const addresses = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      
      if (addresses.length === 0) {
        throw new Error('No address found for coordinates');
      }
      
      const address = addresses[0];
      
      return {
        street: address.street || undefined,
        city: address.city || undefined,
        district: address.district || undefined,
        region: address.region || undefined,
        country: address.country || undefined,
        postalCode: address.postalCode || undefined,
        formattedAddress: this.formatAddress(address),
      };
    } catch (error) {
      throw new Error(`Failed to get address: ${error}`);
    }
  }
  
  /**
   * Get coordinates from address
   */
  async getCoordsFromAddress(address: string): Promise<LocationObject> {
    try {
      const locations = await Location.geocodeAsync(address);
      
      if (locations.length === 0) {
        throw new Error('No coordinates found for address');
      }
      
      const location = locations[0];
      
      return {
        coords: {
          latitude: location.latitude,
          longitude: location.longitude,
          altitude: null,
          accuracy: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        },
        timestamp: Date.now(),
      };
    } catch (error) {
      throw new Error(`Failed to get coordinates: ${error}`);
    }
  }
  
  /**
   * Calculate distance between two points (in kilometers)
   */
  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  
  /**
   * Check if location is within Imphal or Delhi service areas
   */
  isWithinServiceArea(latitude: number, longitude: number): {
    inService: boolean;
    city: 'imphal' | 'delhi' | 'unknown';
    distance?: number;
  } {
    const imphalCenter = { lat: 24.8170, lng: 93.9368 };
    const delhiCenter = { lat: 28.6139, lng: 77.2090 };
    
    const distanceToImphal = this.calculateDistance(
      latitude,
      longitude,
      imphalCenter.lat,
      imphalCenter.lng
    );
    
    const distanceToDelhi = this.calculateDistance(
      latitude,
      longitude,
      delhiCenter.lat,
      delhiCenter.lng
    );
    
    // Service area radius: 25km for Imphal, 50km for Delhi
    if (distanceToImphal <= 25) {
      return { inService: true, city: 'imphal', distance: distanceToImphal };
    }
    
    if (distanceToDelhi <= 50) {
      return { inService: true, city: 'delhi', distance: distanceToDelhi };
    }
    
    return { inService: false, city: 'unknown' };
  }
  
  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
  
  private formatAddress(address: Location.LocationGeocodedAddress): string {
    const components = [
      address.name,
      address.street,
      address.city,
      address.region,
      address.country,
    ].filter(Boolean);
    
    return components.join(', ');
  }
}

// Export singleton instance
export const locationService = LocationService.getInstance();
```

#### Day 26-27: Camera Integration for Package Photos
```typescript
// src/components/camera/PackageCamera.tsx - Camera component for package photos
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  Alert,
  Dimensions
} from 'react-native';
import { useState, useRef } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { TapangoDesignSystem } from '../../theme/design-system';
import { Button } from '../ui/Button';

const { width, height } = Dimensions.get('window');

interface PackageCameraProps {
  onPhotoTaken: (uri: string) => void;
  onClose: () => void;
}

export function PackageCamera({ onPhotoTaken, onClose }: PackageCameraProps) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  
  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Loading camera...</Text>
      </View>
    );
  }
  
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.permissionContainer}>
        <Text style={[
          styles.permissionText,
          TapangoDesignSystem.typography.titleMedium
        ]}>
          Camera permission required
        </Text>
        <Text style={[
          styles.permissionDescription,
          TapangoDesignSystem.typography.bodyMedium
        ]}>
          We need access to your camera to take photos of packages
        </Text>
        <Button
          title="Grant Permission"
          onPress={requestPermission}
          variant="filled"
          color="primary"
          style={styles.permissionButton}
        />
      </View>
    );
  }
  
  const takePicture = async () => {
    if (!cameraRef.current || isCapturing) return;
    
    setIsCapturing(true);
    
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
        exif: true,
      });
      
      if (photo) {
        // Save to media library
        await MediaLibrary.saveToLibraryAsync(photo.uri);
        onPhotoTaken(photo.uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo. Please try again.');
      console.error('Camera error:', error);
    } finally {
      setIsCapturing(false);
    }
  };
  
  const pickFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets[0]) {
        onPhotoTaken(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image from gallery.');
      console.error('Gallery error:', error);
    }
  };
  
  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };
  
  return (
    <View style={styles.container}>
      <CameraView 
        ref={cameraRef}
        style={styles.camera} 
        facing={facing}
        ratio="4:3"
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={onClose} style={styles.headerButton}>
            <Ionicons 
              name="close" 
              size={24} 
              color={TapangoDesignSystem.colors.text.inverse} 
            />
          </Pressable>
          
          <Text style={[
            styles.headerTitle,
            TapangoDesignSystem.typography.titleMedium,
            { color: TapangoDesignSystem.colors.text.inverse }
          ]}>
            Take Package Photo
          </Text>
          
          <Pressable onPress={toggleCameraFacing} style={styles.headerButton}>
            <Ionicons 
              name="camera-reverse" 
              size={24} 
              color={TapangoDesignSystem.colors.text.inverse} 
            />
          </Pressable>
        </View>
        
        {/* Camera Guidelines */}
        <View style={styles.guidelines}>
          <View style={styles.guideline} />
        </View>
        
        {/* Footer Controls */}
        <View style={styles.footer}>
          <Pressable onPress={pickFromGallery} style={styles.galleryButton}>
            <Ionicons 
              name="images" 
              size={32} 
              color={TapangoDesignSystem.colors.text.inverse} 
            />
          </Pressable>
          
          <Pressable 
            onPress={takePicture} 
            style={[styles.captureButton, isCapturing && styles.capturingButton]}
            disabled={isCapturing}
          >
            <View style={styles.captureButtonInner} />
          </Pressable>
          
          <View style={styles.placeholder} />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: TapangoDesignSystem.colors.background,
    padding: TapangoDesignSystem.spacing.lg,
  },
  permissionText: {
    textAlign: 'center',
    marginBottom: TapangoDesignSystem.spacing.md,
    color: TapangoDesignSystem.colors.text.primary,
  },
  permissionDescription: {
    textAlign: 'center',
    marginBottom: TapangoDesignSystem.spacing.xl,
    color: TapangoDesignSystem.colors.text.secondary,
  },
  permissionButton: {
    minWidth: 200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: TapangoDesignSystem.spacing.lg,
    paddingBottom: TapangoDesignSystem.spacing.md,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    textAlign: 'center',
  },
  guidelines: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideline: {
    width: width * 0.8,
    height: width * 0.6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: TapangoDesignSystem.borderRadius.lg,
    borderStyle: 'dashed',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: TapangoDesignSystem.spacing.xl,
    paddingBottom: 40,
  },
  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: TapangoDesignSystem.colors.text.inverse,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  capturingButton: {
    backgroundColor: TapangoDesignSystem.colors.primary[500],
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: TapangoDesignSystem.colors.text.inverse,
  },
  placeholder: {
    width: 50,
    height: 50,
  },
});
```

### Phase 6: Performance Optimization & Polish (Week 4 - 3 Days)

#### Day 28-30: Performance Optimizations & Final Polish
```typescript
// src/hooks/usePerformanceMonitor.ts - Performance monitoring hook
import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

interface PerformanceMetrics {
  screenLoadTime: number;
  memoryUsage?: number;
  renderCount: number;
  lastRenderTime: number;
}

export function usePerformanceMonitor(screenName: string) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    screenLoadTime: 0,
    renderCount: 0,
    lastRenderTime: 0,
  });
  
  const startTime = useRef(Date.now());
  const renderCount = useRef(0);
  const appStateRef = useRef(AppState.currentState);
  
  useEffect(() => {
    // Track screen load time
    const loadTime = Date.now() - startTime.current;
    setMetrics(prev => ({
      ...prev,
      screenLoadTime: loadTime,
    }));
    
    // Log performance metrics in development
    if (__DEV__) {
      console.log(`[Performance] ${screenName} loaded in ${loadTime}ms`);
    }
  }, [screenName]);
  
  useEffect(() => {
    // Track render count
    renderCount.current += 1;
    setMetrics(prev => ({
      ...prev,
      renderCount: renderCount.current,
      lastRenderTime: Date.now(),
    }));
  });
  
  useEffect(() => {
    // Monitor app state changes
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (appStateRef.current.match(/inactive|background/) && nextAppState === 'active') {
        // App has come to the foreground
        if (__DEV__) {
          console.log(`[Performance] ${screenName} resumed`);
        }
      }
      appStateRef.current = nextAppState;
    });
    
    return () => subscription?.remove();
  }, [screenName]);
  
  return metrics;
}

// src/components/optimization/LazyImage.tsx - Optimized image component
import { Image, ImageProps, View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { TapangoDesignSystem } from '../../theme/design-system';

interface LazyImageProps extends Omit<ImageProps, 'source'> {
  source: { uri: string } | number;
  placeholder?: React.ReactNode;
  fadeDuration?: number;
}

export function LazyImage({ 
  source, 
  placeholder, 
  fadeDuration = 300,
  style,
  ...props 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const handleLoad = () => {
    setIsLoaded(true);
    setIsError(false);
  };
  
  const handleError = () => {
    setIsError(true);
    setIsLoaded(false);
  };
  
  if (isError) {
    return (
      <View style={[styles.placeholder, style]}>
        {placeholder || (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Failed to load image</Text>
          </View>
        )}
      </View>
    );
  }
  
  return (
    <View style={style}>
      {!isLoaded && (
        <View style={[StyleSheet.absoluteFill, styles.placeholder]}>
          {placeholder || <View style={styles.defaultPlaceholder} />}
        </View>
      )}
      
      <Image
        source={source}
        style={[style, { opacity: isLoaded ? 1 : 0 }]}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: TapangoDesignSystem.colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultPlaceholder: {
    backgroundColor: TapangoDesignSystem.colors.outline,
    opacity: 0.3,
  },
  errorContainer: {
    padding: TapangoDesignSystem.spacing.md,
  },
  errorText: {
    ...TapangoDesignSystem.typography.bodySmall,
    color: TapangoDesignSystem.colors.text.secondary,
    textAlign: 'center',
  },
});

// src/utils/performance.ts - Performance utilities
export class PerformanceUtils {
  private static metrics: Map<string, number> = new Map();
  
  static startTimer(key: string): void {
    this.metrics.set(key, Date.now());
  }
  
  static endTimer(key: string): number {
    const startTime = this.metrics.get(key);
    if (!startTime) {
      console.warn(`Timer ${key} was not started`);
      return 0;
    }
    
    const duration = Date.now() - startTime;
    this.metrics.delete(key);
    
    if (__DEV__) {
      console.log(`[Performance] ${key}: ${duration}ms`);
    }
    
    return duration;
  }
  
  static measureAsync<T>(
    key: string, 
    asyncFn: () => Promise<T>
  ): Promise<T> {
    this.startTimer(key);
    return asyncFn().finally(() => {
      this.endTimer(key);
    });
  }
  
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }
  
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
}
```

---

## 📊 Success Metrics & KPIs

### Technical Excellence Metrics
```typescript
// Performance benchmarks for Expo SDK 53
const PERFORMANCE_TARGETS = {
  appStartup: 2000,        // < 2 seconds
  screenTransition: 300,   // < 300ms
  bundleSize: 5000000,     // < 5MB
  memoryUsage: 100000000,  // < 100MB
  frameRate: 55,           // > 55fps
  crashFreeRate: 0.995,    // > 99.5%
};

// Component library metrics
const COMPONENT_METRICS = {
  totalComponents: 25,      // 25+ reusable components
  nativeUIPercentage: 100,  // 100% Expo SDK 53 UI
  accessibilityScore: 95,   // > 95% WCAG compliance
  designSystemCoverage: 90, // > 90% design token usage
};
```

### User Experience Metrics
```typescript
const UX_TARGETS = {
  onboardingCompletion: 0.85,  // > 85%
  featureAdoption: 0.70,       // > 70%
  userRetention7d: 0.70,       // > 70%
  appStoreRating: 4.5,         // > 4.5 stars
  supportTicketReduction: 0.30, // > 30% reduction
};
```

---

## 🔄 Migration Timeline Summary

| Phase | Duration | Key Deliverables | Dependencies |
|-------|----------|------------------|--------------|
| **Phase 1** | 5 days | Foundation, New Architecture, Edge-to-edge | Expo SDK 53 setup |
| **Phase 2** | 7 days | Core UI components, Design system | Phase 1 complete |
| **Phase 3** | 5 days | Authentication, React 19 Suspense | Phase 2 complete |
| **Phase 4** | 5 days | Navigation, Enhanced tabs | Phase 3 complete |
| **Phase 5** | 5 days | Location services, Camera integration | Phase 4 complete |
| **Phase 6** | 3 days | Performance optimization, Polish | Phase 5 complete |
| **Total** | **30 days** | **Complete enterprise app** | **Sequential phases** |

---

## 🎯 Implementation Strategy

### Week 1: Foundation & Core UI
- Days 1-5: New Architecture setup, design system, core components
- Focus: Establishing solid technical foundation with pure Expo SDK 53 UI

### Week 2: Authentication & Navigation  
- Days 6-12: Authentication flow, React 19 features, navigation system
- Focus: User experience flow and modern React patterns

### Week 3: Advanced Features
- Days 13-19: Location services, camera integration, enhanced functionality
- Focus: Cargo logistics specific features

### Week 4: Optimization & Launch Prep
- Days 20-22: Performance optimization, testing, final polish
- Focus: Production readiness and performance excellence

---

## ✅ Final Recommendations

### 1. **Pure Expo SDK 53 UI Strategy**
- Build all components using native React Native primitives
- Leverage Expo SDK 53's enhanced components (LinearGradient, BlurView, CameraView)
- Create comprehensive design system with native styling
- Ensure 100% compatibility with New Architecture

### 2. **React 19 Implementation**
- Use Suspense for loading states throughout the app
- Implement use() hook for data fetching
- Leverage concurrent features for smooth UX
- Optimize rendering with React 19 performance improvements

### 3. **New Architecture Optimization**
- Enable Fabric renderer for better performance
- Use TurboModules for native functionality
- Optimize for edge-to-edge display on Android 16+
- Implement proper memory management

### 4. **Performance Excellence**
- Target < 2s app startup time
- Maintain > 55fps frame rate
- Keep bundle size < 5MB
- Implement comprehensive performance monitoring

This migration plan transforms TAPAN-GO into a world-class cargo logistics platform using 100% Expo SDK 53 Native UI, positioning it as a showcase for modern React Native development with the New Architecture and React 19 features.
