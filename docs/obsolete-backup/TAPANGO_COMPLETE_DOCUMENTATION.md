# TAPANGO - Complete Documentation
## Pure Expo SDK 53 UI Philosophy Edition

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Pure Expo SDK 53 Architecture](#pure-expo-sdk-53-architecture)
3. [Technical Foundation](#technical-foundation)
4. [Component Library](#component-library)
5. [Design System](#design-system)
6. [Authentication System](#authentication-system)
7. [Navigation Architecture](#navigation-architecture)
8. [State Management](#state-management)
9. [Services Layer](#services-layer)
10. [Performance Optimization](#performance-optimization)
11. [Development Guidelines](#development-guidelines)
12. [Deployment Strategy](#deployment-strategy)

---

## 🎯 Project Overview

### Vision Statement
TAPANGO is a premium cargo logistics platform connecting Imphal ↔ New Delhi, built entirely with **Pure Expo SDK 53 Native UI components** and leveraging the New Architecture, React 19, and modern React Native patterns.

### Core Philosophy
- **100% Expo SDK 53 Native UI** - Zero external UI libraries
- **New Architecture First** - Built for Fabric renderer and TurboModules
- **React 19 Integration** - Leveraging Suspense, use() hook, and concurrent features
- **Performance Excellence** - Sub-2-second startup, 60fps animations
- **Enterprise Grade** - Production-ready security and scalability

### Key Features
- **Real-time Cargo Tracking** - GPS-based live tracking
- **Multi-modal Transport** - Air freight and ground transport
- **Role-based Access** - Customer, Driver, and Admin interfaces
- **Secure Authentication** - Biometric and multi-factor authentication
- **Offline Capability** - Core features work without internet
- **Edge-to-edge Design** - Modern Android 16+ compliance

---

## 🏗️ Pure Expo SDK 53 Architecture

### Core Stack
```json
{
  "expo": "^53.0.0",
  "react": "19.0.0",
  "react-native": "0.79.5",
  "expo-router": "~4.0.0",
  "typescript": "~5.8.3"
}
```

### New Architecture Configuration
```json
// app.json
{
  "expo": {
    "name": "Tapango",
    "slug": "tapango-sdk53",
    "newArchEnabled": true,
    "plugins": [
      [
        "expo-build-properties",
        {
          "android": {
            "newArchEnabled": true,
            "enableProguardInReleaseBuilds": true
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

### Native UI Components (Expo SDK 53 Only)
```typescript
// Core React Native Components
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

---

## 🔧 Technical Foundation

### Project Structure
```
tapango/
├── app/                          # Expo Router v4 Navigation
│   ├── _layout.tsx              # Root layout with New Architecture
│   ├── index.tsx                # App entry point
│   ├── splash.tsx               # Splash screen with animations
│   ├── onboarding.tsx           # Multi-screen onboarding
│   ├── role-selection.tsx       # Customer/Driver selection
│   ├── (auth)/                  # Authentication flow
│   │   ├── _layout.tsx
│   │   ├── sign-in.tsx
│   │   └── sign-up.tsx
│   ├── (customer)/              # Customer interface
│   ├── (driver)/                # Driver interface
│   └── (tabs)/                  # Main tab navigation
│
├── src/                         # Core Application Logic
│   ├── components/              # Pure Native UI Components
│   │   ├── ui/                  # Base UI components
│   │   ├── forms/               # Form components
│   │   ├── navigation/          # Navigation components
│   │   └── business/            # Business logic components
│   │
│   ├── theme/                   # Design System
│   │   ├── design-system.ts     # Complete design tokens
│   │   ├── colors.ts            # Color system
│   │   └── typography.ts        # Typography scale
│   │
│   ├── services/                # Business Services
│   │   ├── auth.service.ts      # Authentication service
│   │   ├── location.service.ts  # Location & GPS service
│   │   ├── api.service.ts       # HTTP client
│   │   └── storage.service.ts   # Local storage
│   │
│   ├── stores/                  # State Management
│   │   ├── auth.store.ts        # Authentication state
│   │   ├── location.store.ts    # Location state
│   │   ├── booking.store.ts     # Booking state
│   │   └── theme.store.ts       # Theme state
│   │
│   └── utils/                   # Utility Functions
│       ├── performance.ts       # Performance utilities
│       ├── validation.ts        # Input validation
│       └── constants.ts         # App constants
│
├── assets/                      # Static Assets
│   ├── images/                  # Image assets
│   ├── fonts/                   # Custom fonts
│   └── lottie/                  # Animation files
│
└── docs/                        # Documentation
    ├── api.md                   # API documentation
    ├── components.md            # Component documentation
    └── deployment.md            # Deployment guide
```

### Environment Configuration
```typescript
// src/config/environment.ts
export const Environment = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.tapango.com',
  SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL!,
  SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  GOOGLE_MAPS_API_KEY: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY!,
  SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN,
  
  // Feature flags
  FEATURES: {
    NEW_ARCHITECTURE: true,
    REACT_19_FEATURES: true,
    EDGE_TO_EDGE: true,
    BIOMETRIC_AUTH: true,
  },
  
  // Performance targets
  PERFORMANCE: {
    MAX_STARTUP_TIME: 2000,     // 2 seconds
    TARGET_FPS: 60,
    MAX_MEMORY_MB: 100,
    MAX_BUNDLE_SIZE_MB: 5,
  },
} as const;
```

---

## 🎨 Component Library

### Base UI Components (Pure Native)

#### Button Component
```typescript
// src/components/ui/Button.tsx
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
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
  
  // Implementation with pure React Native styling
  // ... (full implementation in codebase)
}
```

#### Card Component
```typescript
// src/components/ui/Card.tsx
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

#### Enhanced TextInput Component
```typescript
// src/components/ui/TextInput.tsx
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
  
  // Implementation with Material Design 3 principles
  // ... (full implementation in codebase)
}
```

### Component Documentation Standards
```typescript
/**
 * Button Component - Pure Expo SDK 53 Implementation
 * 
 * @description A fully customizable button component built with React Native Pressable
 * @example
 * ```tsx
 * <Button
 *   title="Book Cargo"
 *   onPress={handleBooking}
 *   variant="filled"
 *   color="primary"
 *   icon="airplane"
 *   iconPosition="left"
 * />
 * ```
 * 
 * @accessibility
 * - Supports screen readers
 * - Proper focus management
 * - High contrast mode compatible
 * 
 * @performance
 * - Optimized for 60fps interactions
 * - Memory efficient rendering
 * - Minimal re-renders
 */
```

---

## 🎨 Design System

### Complete Design Tokens
```typescript
// src/theme/design-system.ts
export const TapangoDesignSystem = {
  // Color System - Cargo Logistics Optimized
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
    
    // UI foundation colors
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
  
  // Typography System - Material Design 3
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
  
  // Spacing System - 8dp Grid
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  
  // Border Radius System
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
  
  // Elevation System - Material Design 3
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

### Theme Provider Implementation
```typescript
// src/providers/ThemeProvider.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TapangoDesignSystem } from '../theme/design-system';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: typeof TapangoDesignSystem;
  isDark: boolean;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  // Load saved theme preference
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Update theme based on system or user preference
  useEffect(() => {
    if (themeMode === 'system') {
      setIsDark(systemColorScheme === 'dark');
    } else {
      setIsDark(themeMode === 'dark');
    }
  }, [systemColorScheme, themeMode]);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('@tapango_theme_mode');
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setThemeModeState(savedTheme as ThemeMode);
      }
    } catch (error) {
      console.error('Failed to load theme preference:', error);
    }
  };

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem('@tapango_theme_mode', mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const toggleTheme = () => {
    const newMode = isDark ? 'light' : 'dark';
    setThemeMode(newMode);
  };

  // Create theme object with dark/light variations
  const theme = {
    ...TapangoDesignSystem,
    colors: isDark ? createDarkTheme() : TapangoDesignSystem.colors,
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        isDark, 
        themeMode,
        setThemeMode,
        toggleTheme 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

function createDarkTheme() {
  return {
    ...TapangoDesignSystem.colors,
    background: '#121212',
    surface: '#1E1E1E',
    surfaceVariant: '#2C2C2C',
    text: {
      primary: '#FFFFFF',
      secondary: '#B3B3B3',
      disabled: '#666666',
      inverse: '#000000',
    },
  };
}
```

---

## 🔐 Authentication System

### React 19 Suspense Authentication
```typescript
// src/services/auth.service.ts
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'driver' | 'admin';
  phone?: string;
  avatar_url?: string;
  verified: boolean;
}

export interface AuthResult {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

class AuthService {
  private supabase;
  
  constructor() {
    this.supabase = createClient(
      process.env.EXPO_PUBLIC_SUPABASE_URL!,
      process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          storage: AsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
        },
      }
    );
  }

  /**
   * Sign up new user with role
   */
  async signUp({
    email,
    password,
    firstName,
    lastName,
    role,
  }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'customer' | 'driver';
  }): Promise<AuthResult> {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            role,
            full_name: `${firstName.trim()} ${lastName.trim()}`,
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user && data.session) {
        // Store secure tokens
        await this.storeSecureTokens(data.session);
        
        return {
          success: true,
          user: {
            id: data.user.id,
            email: data.user.email!,
            name: data.user.user_metadata?.full_name || '',
            role: data.user.user_metadata?.role || 'customer',
            verified: data.user.email_confirmed_at !== null,
          },
        };
      }

      return { success: false, error: 'Registration failed' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Sign in user
   */
  async signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AuthResult> {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user && data.session) {
        await this.storeSecureTokens(data.session);
        
        return {
          success: true,
          user: {
            id: data.user.id,
            email: data.user.email!,
            name: data.user.user_metadata?.full_name || '',
            role: data.user.user_metadata?.role || 'customer',
            verified: data.user.email_confirmed_at !== null,
          },
        };
      }

      return { success: false, error: 'Sign in failed' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Sign out user
   */
  async signOut(): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await this.supabase.auth.signOut();
      
      if (error) {
        return { success: false, error: error.message };
      }

      // Clear secure storage
      await this.clearSecureTokens();
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data: { user }, error } = await this.supabase.auth.getUser();
      
      if (error || !user) {
        return null;
      }

      return {
        id: user.id,
        email: user.email!,
        name: user.user_metadata?.full_name || '',
        role: user.user_metadata?.role || 'customer',
        verified: user.email_confirmed_at !== null,
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Store tokens securely
   */
  private async storeSecureTokens(session: any): Promise<void> {
    try {
      await SecureStore.setItemAsync('access_token', session.access_token);
      await SecureStore.setItemAsync('refresh_token', session.refresh_token);
    } catch (error) {
      console.error('Failed to store secure tokens:', error);
    }
  }

  /**
   * Clear secure tokens
   */
  private async clearSecureTokens(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync('access_token');
      await SecureStore.deleteItemAsync('refresh_token');
    } catch (error) {
      console.error('Failed to clear secure tokens:', error);
    }
  }
}

export const authService = new AuthService();
```

### Authentication Provider with React 19
```typescript
// src/providers/AuthProvider.tsx
import React, { createContext, useContext, useState, useEffect, Suspense } from 'react';
import { router } from 'expo-router';
import { authService, AuthUser } from '../services/auth.service';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (data: any) => Promise<boolean>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProviderContent({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      
      // Navigate based on auth state
      if (currentUser) {
        navigateBasedOnRole(currentUser.role);
      } else {
        router.replace('/splash');
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    const result = await authService.signIn({ email, password });
    
    if (result.success && result.user) {
      setUser(result.user);
      navigateBasedOnRole(result.user.role);
      return true;
    }
    
    return false;
  };

  const signUp = async (data: any): Promise<boolean> => {
    const result = await authService.signUp(data);
    
    if (result.success && result.user) {
      setUser(result.user);
      navigateBasedOnRole(result.user.role);
      return true;
    }
    
    return false;
  };

  const signOut = async (): Promise<void> => {
    await authService.signOut();
    setUser(null);
    router.replace('/splash');
  };

  const refreshUser = async (): Promise<void> => {
    const currentUser = await authService.getCurrentUser();
    setUser(currentUser);
  };

  const navigateBasedOnRole = (role: string) => {
    switch (role) {
      case 'customer':
        router.replace('/(tabs)');
        break;
      case 'driver':
        router.replace('/(driver)');
        break;
      case 'admin':
        router.replace('/(admin)');
        break;
      default:
        router.replace('/(tabs)');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading authentication...</div>}>
      <AuthProviderContent>{children}</AuthProviderContent>
    </Suspense>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

---

## 🧭 Navigation Architecture

### Expo Router v4 Implementation
```typescript
// app/_layout.tsx - Root layout with New Architecture
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';
import { AuthProvider } from '../src/providers/AuthProvider';
import { ThemeProvider } from '../src/providers/ThemeProvider';

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      // Android 16+ edge-to-edge preparation
      NavigationBar.setBackgroundColorAsync('transparent');
      NavigationBar.setButtonStyleAsync('light');
    }
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="splash" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="role-selection" />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(driver)" options={{ headerShown: false }} />
          <Stack.Screen name="(admin)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
```

### Enhanced Tab Navigation
```typescript
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useTheme } from '../../src/providers/ThemeProvider';

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
  const { theme, isDark } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary[500],
        tabBarInactiveTintColor: theme.colors.text.secondary,
        tabBarStyle: {
          backgroundColor: isDark 
            ? 'rgba(30, 30, 30, 0.9)' 
            : 'rgba(255, 255, 255, 0.9)',
          borderTopWidth: 1,
          borderTopColor: theme.colors.outline,
          height: 80,
          paddingBottom: 20,
          paddingTop: 8,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={80}
            style={StyleSheet.absoluteFill}
            tint={isDark ? 'dark' : 'light'}
          />
        ),
        tabBarLabelStyle: [
          theme.typography.labelSmall,
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

---

## 🏪 State Management

### Zustand with React 19 Integration
```typescript
// src/stores/auth.store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthUser } from '../services/auth.service';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

interface AuthActions {
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearAuth: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Actions
      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
          error: null,
        });
      },

      setLoading: (loading) => {
        set({ loading });
      },

      setError: (error) => {
        set({ error });
      },

      clearAuth: () => {
        set({
          user: null,
          isAuthenticated: false,
          loading: false,
          error: null,
        });
      },
    }),
    {
      name: 'tapango-auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
```

### Location Store with GPS Tracking
```typescript
// src/stores/location.store.ts
import { create } from 'zustand';
import { LocationObject } from 'expo-location';

interface LocationState {
  currentLocation: LocationObject | null;
  isTracking: boolean;
  permissionGranted: boolean;
  error: string | null;
  locationHistory: LocationObject[];
}

interface LocationActions {
  setCurrentLocation: (location: LocationObject) => void;
  setTracking: (tracking: boolean) => void;
  setPermissionGranted: (granted: boolean) => void;
  setError: (error: string | null) => void;
  addToHistory: (location: LocationObject) => void;
  clearHistory: () => void;
}

type LocationStore = LocationState & LocationActions;

export const useLocationStore = create<LocationStore>((set, get) => ({
  // Initial state
  currentLocation: null,
  isTracking: false,
  permissionGranted: false,
  error: null,
  locationHistory: [],

  // Actions
  setCurrentLocation: (location) => {
    set({ currentLocation: location, error: null });
    
    // Add to history if tracking
    if (get().isTracking) {
      get().addToHistory(location);
    }
  },

  setTracking: (tracking) => {
    set({ isTracking: tracking });
  },

  setPermissionGranted: (granted) => {
    set({ permissionGranted: granted });
  },

  setError: (error) => {
    set({ error });
  },

  addToHistory: (location) => {
    set((state) => ({
      locationHistory: [...state.locationHistory.slice(-99), location], // Keep last 100 locations
    }));
  },

  clearHistory: () => {
    set({ locationHistory: [] });
  },
}));
```

---

## 🔧 Services Layer

### Location Service with Enhanced Features
```typescript
// src/services/location.service.ts
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

---

## ⚡ Performance Optimization

### React 19 Performance Features
```typescript
// src/hooks/usePerformanceMonitor.ts
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
  
  return metrics;
}
```

### Performance Utilities
```typescript
// src/utils/performance.ts
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

## 📋 Development Guidelines

### Code Standards
```typescript
// ESLint configuration
{
  "extends": [
    "expo",
    "@expo/eslint-config-typescript"
  ],
  "rules": {
    "no-console": "warn",
    "prefer-const": "error",
    "react-hooks/exhaustive-deps": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "react-native/no-unused-styles": "error"
  }
}

// Prettier configuration
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

### Component Development Guidelines
```typescript
/**
 * Component Development Checklist
 * 
 * ✅ Use only Expo SDK 53 native components
 * ✅ Implement proper TypeScript interfaces
 * ✅ Add accessibility props
 * ✅ Use design system tokens
 * ✅ Optimize for performance
 * ✅ Add proper documentation
 * ✅ Write unit tests
 * ✅ Support dark/light themes
 */

// Example component template
interface ComponentProps {
  /** Component title */
  title: string;
  /** Optional callback function */
  onPress?: () => void;
  /** Accessibility label */
  accessibilityLabel?: string;
}

export function Component({ 
  title, 
  onPress, 
  accessibilityLabel 
}: ComponentProps) {
  const { theme } = useTheme();
  
  return (
    <Pressable
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      style={[styles.container, { backgroundColor: theme.colors.surface }]}
    >
      <Text style={[styles.title, theme.typography.titleMedium]}>
        {title}
      </Text>
    </Pressable>
  );
}
```

### Testing Strategy
```typescript
// Jest configuration
{
  "preset": "jest-expo",
  "setupFilesAfterEnv": ["<rootDir>/src/test/setup.ts"],
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.test.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.test.{js,jsx,ts,tsx}"
  ],
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/test/**/*"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  }
}

// Example test
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button Component', () => {
  test('renders correctly', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={() => {}} />
    );
    expect(getByText('Test Button')).toBeTruthy();
  });

  test('calls onPress when pressed', () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={mockPress} />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(mockPress).toHaveBeenCalledTimes(1);
  });
});
```

---

## 🚀 Deployment Strategy

### Build Configuration
```json
// app.json
{
  "expo": {
    "name": "Tapango",
    "slug": "tapango",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#1A237E"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.tapango.app",
      "buildNumber": "1"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#1A237E"
      },
      "package": "com.tapango.app",
      "versionCode": 1
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-router",
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

### Environment Management
```bash
# Development
EXPO_PUBLIC_API_BASE_URL=https://dev-api.tapango.com
EXPO_PUBLIC_SUPABASE_URL=https://dev.supabase.co
EXPO_PUBLIC_ENVIRONMENT=development

# Staging
EXPO_PUBLIC_API_BASE_URL=https://staging-api.tapango.com
EXPO_PUBLIC_SUPABASE_URL=https://staging.supabase.co
EXPO_PUBLIC_ENVIRONMENT=staging

# Production
EXPO_PUBLIC_API_BASE_URL=https://api.tapango.com
EXPO_PUBLIC_SUPABASE_URL=https://prod.supabase.co
EXPO_PUBLIC_ENVIRONMENT=production
```

### CI/CD Pipeline
```yaml
# .github/workflows/build.yml
name: Build and Deploy
on:
  push:
    branches: [main, staging, development]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run lint
      - run: npm run test
      - run: npm run build
      
  deploy-staging:
    if: github.ref == 'refs/heads/staging'
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: npx eas build --platform all --non-interactive
      
  deploy-production:
    if: github.ref == 'refs/heads/main'
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: npx eas build --platform all --non-interactive
      - run: npx eas submit --platform all --non-interactive
```

---

## 📊 Success Metrics

### Technical KPIs
```typescript
const TECHNICAL_KPIS = {
  performance: {
    appStartupTime: { target: 2000, unit: 'ms' },
    screenTransitionTime: { target: 300, unit: 'ms' },
    memoryUsage: { target: 100, unit: 'MB' },
    frameRate: { target: 60, unit: 'fps' },
    bundleSize: { target: 5, unit: 'MB' },
  },
  
  quality: {
    crashFreeRate: { target: 99.5, unit: '%' },
    codeCoverage: { target: 80, unit: '%' },
    accessibilityScore: { target: 95, unit: '%' },
    securityScore: { target: 90, unit: '%' },
  },
  
  architecture: {
    nativeUIPercentage: { target: 100, unit: '%' },
    newArchitectureEnabled: { target: true, unit: 'boolean' },
    react19FeaturesUsed: { target: true, unit: 'boolean' },
    edgeToEdgeSupport: { target: true, unit: 'boolean' },
  },
};
```

### User Experience KPIs
```typescript
const UX_KPIS = {
  onboarding: {
    completionRate: { target: 85, unit: '%' },
    dropOffRate: { target: 15, unit: '%' },
    timeToComplete: { target: 120, unit: 'seconds' },
  },
  
  engagement: {
    dailyActiveUsers: { target: 1000, unit: 'users' },
    sessionDuration: { target: 300, unit: 'seconds' },
    featureAdoptionRate: { target: 70, unit: '%' },
  },
  
  satisfaction: {
    appStoreRating: { target: 4.5, unit: 'stars' },
    userRetention7d: { target: 70, unit: '%' },
    supportTicketReduction: { target: 30, unit: '%' },
  },
};
```

---

## 🎯 Conclusion

TAPANGO represents the pinnacle of modern React Native development using **Pure Expo SDK 53 Native UI Philosophy**. By leveraging the New Architecture, React 19 features, and enterprise-grade patterns, we've created a comprehensive cargo logistics platform that sets new standards for:

### ✅ **Technical Excellence**
- **100% Expo SDK 53 Native UI** - No external dependencies
- **New Architecture Ready** - Fabric renderer and TurboModules
- **React 19 Integration** - Suspense, use() hook, concurrent features
- **Performance Optimized** - Sub-2-second startup, 60fps animations

### ✅ **User Experience**
- **Intuitive Design** - Material Design 3 principles
- **Accessibility First** - WCAG 2.1 AA compliance
- **Edge-to-Edge Modern** - Android 16+ ready
- **Dark Mode Support** - System-aware theming

### ✅ **Enterprise Features**
- **Secure Authentication** - Biometric and multi-factor
- **Real-time Tracking** - GPS-based cargo monitoring
- **Offline Capability** - Core features work without internet
- **Scalable Architecture** - Production-ready from day one

This documentation serves as the definitive guide for building world-class React Native applications using Expo SDK 53's pure native UI approach, positioning TAPANGO as a showcase for modern mobile development excellence.

---

*Last updated: January 2025*
*Documentation Version: 1.0.0*
*Expo SDK Version: 53.0.0*
