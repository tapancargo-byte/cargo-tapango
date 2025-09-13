import { Platform } from 'react-native'

export type ThemeMode = 'light' | 'dark'

export interface ColorTokens {
  background: string
  surface: string
  surfaceVariant: string
  primary: string
  primaryContainer: string
  secondary: string
  secondaryContainer: string
  accent: string
  info: string
  success: string
  warning: string
  danger: string
  text: string
  textSecondary: string
  textOnPrimary: string
  border: string
  borderFocus: string
  overlay: string
  shadow: string
}

export interface TypographyTokens {
  caption: number
  subtitle: number
  body: number
  section: number
  title: number
  headline: number
  display: number
  weightRegular: string | number
  weightMedium: string | number
  weightSemibold: string | number
  weightBold: string | number
  weightExtraBold: string | number
}

export interface SpacingTokens {
  [k: string]: number
}

export interface RadiusTokens {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  '2xl': number
  '3xl': number
  full: number
}

export interface ShadowTokens {
  level1: string
  level2: string
}

export interface MotionTokens {
  durations: { fast: number; base: number; slow: number }
  // Easing is provided by Reanimated's Easing, referenced in animations.ts
}

export interface DesignTokens {
  mode: ThemeMode
  colors: ColorTokens
  typography: TypographyTokens
  spacing: SpacingTokens
  radius: RadiusTokens
  shadows: ShadowTokens
  motion: MotionTokens
}

const typographyBase: TypographyTokens = {
  caption: 12,
  subtitle: 14,
  body: 16,
  section: 18,
  title: 24,
  headline: 32,
  display: 40,
  weightRegular: Platform.select({ ios: '400', android: '400', default: '400' })!,
  weightMedium: Platform.select({ ios: '500', android: '500', default: '500' })!,
  weightSemibold: Platform.select({ ios: '600', android: '600', default: '600' })!,
  weightBold: Platform.select({ ios: '700', android: '700', default: '700' })!,
  weightExtraBold: Platform.select({ ios: '800', android: '800', default: '800' })!,
}

const spacingBase: SpacingTokens = {
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
}

const radiusBase: RadiusTokens = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
}

const motionBase: MotionTokens = {
  durations: { fast: 150, base: 250, slow: 350 },
}

export const tokensLight: DesignTokens = {
  mode: 'light',
  colors: {
    background: '#FAFBFF',
    surface: '#FFFFFF',
    surfaceVariant: '#F1F5FF',
    primary: '#0D47A1',
    primaryContainer: '#E3F2FD',
    secondary: '#5E35B1',
    secondaryContainer: '#EDE7F6',
    accent: '#FF8F00',
    info: '#1976D2',
    success: '#388E3C',
    warning: '#F57C00',
    danger: '#D32F2F',
    text: '#1A1C1E',
    textSecondary: '#5F6368',
    textOnPrimary: '#FFFFFF',
    border: '#E8EAF6',
    borderFocus: '#0D47A1',
    overlay: 'rgba(26, 28, 30, 0.6)',
    shadow: 'rgba(26, 28, 30, 0.08)',
  },
  typography: typographyBase,
  spacing: spacingBase,
  radius: radiusBase,
  shadows: {
    level1: 'rgba(26, 28, 30, 0.08)',
    level2: 'rgba(26, 28, 30, 0.16)',
  },
  motion: motionBase,
}

export const tokensDark: DesignTokens = {
  mode: 'dark',
  colors: {
    background: '#0A0E1A',
    surface: '#1A1F2E',
    surfaceVariant: '#252D3F',
    primary: '#4FC3F7',
    primaryContainer: '#0D47A1',
    secondary: '#B39DDB',
    secondaryContainer: '#4527A0',
    accent: '#FFD93D',
    info: '#4FC3F7',
    success: '#4ECDC4',
    warning: '#FFD93D',
    danger: '#FF6B6B',
    text: '#F8FAFF',
    textSecondary: '#B3C5EF',
    textOnPrimary: '#0A0E1A',
    border: '#37415A',
    borderFocus: '#4FC3F7',
    overlay: 'rgba(10, 14, 26, 0.8)',
    shadow: 'rgba(0, 0, 0, 0.4)',
  },
  typography: typographyBase,
  spacing: spacingBase,
  radius: radiusBase,
  shadows: {
    level1: 'rgba(0, 0, 0, 0.3)',
    level2: 'rgba(0, 0, 0, 0.5)',
  },
  motion: motionBase,
}

export const getTokens = (mode: ThemeMode): DesignTokens => (mode === 'dark' ? tokensDark : tokensLight)
