import { Platform } from 'react-native';

export type ThemeMode = 'light' | 'dark';

export interface ColorTokens {
  // Background Colors
  background: string;
  backgroundElevated: string;
  surface: string;
  surfaceVariant: string;
  surfaceElevated: string;

  // Brand Colors
  primary: string;
  primaryContainer: string;
  primaryHover: string;
  primaryPress: string;
  primaryDisabled: string;

  secondary: string;
  secondaryContainer: string;
  secondaryHover: string;
  secondaryPress: string;

  accent: string;
  accentContainer: string;

  // Semantic Colors
  info: string;
  infoContainer: string;
  success: string;
  successContainer: string;
  warning: string;
  warningContainer: string;
  danger: string;
  dangerContainer: string;
  error: string; // Alias for danger
  errorContainer: string;

  // Text Colors
  text: string;
  textSecondary: string;
  textTertiary: string;
  textDisabled: string;
  textOnPrimary: string;
  textOnSecondary: string;
  textOnDark: string;
  textOnLight: string;

  // Border Colors
  border: string;
  borderFocus: string;
  borderHover: string;
  borderDisabled: string;

  // Interactive Colors
  overlay: string;
  backdrop: string;
  shadow: string;
  shadowElevated: string;

  // Glass & Transparency
  glass: string;
  glassBorder: string;
  transparent: string;
  semiTransparent: string;
}

export interface TypographyTokens {
  caption: number;
  subtitle: number;
  body: number;
  section: number;
  title: number;
  headline: number;
  display: number;
  weightRegular: string | number;
  weightMedium: string | number;
  weightSemibold: string | number;
  weightBold: string | number;
  weightExtraBold: string | number;
}

export interface SpacingTokens {
  [k: string]: number;
}

export interface RadiusTokens {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  full: number;
}

export interface ShadowTokens {
  level1: string;
  level2: string;
}

export interface MotionTokens {
  durations: { fast: number; base: number; slow: number };
  // Easing is provided by Reanimated's Easing, referenced in animations.ts
}

export interface DesignTokens {
  mode: ThemeMode;
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  shadows: ShadowTokens;
  motion: MotionTokens;
}

const typographyBase: TypographyTokens = {
  caption: 12,
  subtitle: 14,
  body: 16,
  section: 18,
  title: 24,
  headline: 32,
  display: 40,
  weightRegular: Platform.select({
    ios: '400',
    android: '400',
    default: '400',
  }),
  weightMedium: Platform.select({
    ios: '500',
    android: '500',
    default: '500',
  }),
  weightSemibold: Platform.select({
    ios: '600',
    android: '600',
    default: '600',
  }),
  weightBold: Platform.select({ ios: '700', android: '700', default: '700' }),
  weightExtraBold: Platform.select({
    ios: '800',
    android: '800',
    default: '800',
  }),
};

const spacingBase: SpacingTokens = {
  // Base unit: 4px - Modern 8px grid system
  0: 0,
  0.5: 2, // 0.5 * 4px
  1: 4, // 1 * 4px - Minimal
  1.5: 6, // 1.5 * 4px
  2: 8, // 2 * 4px - XS (8px grid base)
  3: 12, // 3 * 4px - Small (internal spacing)
  4: 16, // 4 * 4px - Medium (card padding)
  5: 20, // 5 * 4px
  6: 24, // 6 * 4px - Large (section spacing)
  7: 28, // 7 * 4px
  8: 32, // 8 * 4px - XL (major sections)
  10: 40, // 10 * 4px - XXL (screen padding)
  12: 48, // 12 * 4px - 3XL (header/footer)
  16: 64, // 16 * 4px - 4XL (major spacing)
  20: 80, // 20 * 4px - 5XL (hero sections)
  24: 96, // 24 * 4px - 6XL (large margins)
  32: 128, // 32 * 4px - 7XL (page sections)
  40: 160, // 40 * 4px - 8XL (large gaps)
  48: 192, // 48 * 4px - 9XL (huge spacing)
  64: 256, // 64 * 4px - 10XL (maximum spacing)
};

const radiusBase: RadiusTokens = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

const motionBase: MotionTokens = {
  durations: { fast: 150, base: 250, slow: 350 },
};

export const tokensLight: DesignTokens = {
  mode: 'light',
  colors: {
    // Background Colors
    background: '#FAFBFF',
    backgroundElevated: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceVariant: '#F1F5FF',
    surfaceElevated: '#FFFFFF',

    // Brand Colors - Professional Blue Palette
    primary: '#0D47A1', // Deep blue
    primaryContainer: '#E3F2FD',
    primaryHover: '#1565C0',
    primaryPress: '#0D47A1',
    primaryDisabled: '#BBDEFB',

    secondary: '#5E35B1', // Purple accent
    secondaryContainer: '#EDE7F6',
    secondaryHover: '#7E57C2',
    secondaryPress: '#4527A0',

    accent: '#FF8F00', // Orange highlight
    accentContainer: '#FFF3E0',

    // Semantic Colors
    info: '#1976D2',
    infoContainer: '#E3F2FD',
    success: '#388E3C',
    successContainer: '#E8F5E8',
    warning: '#F57C00',
    warningContainer: '#FFF3E0',
    danger: '#D32F2F',
    dangerContainer: '#FFEBEE',
    error: '#D32F2F',
    errorContainer: '#FFEBEE',

    // Text Colors
    text: '#1A1C1E',
    textSecondary: '#5F6368',
    textTertiary: '#9AA0A6',
    textDisabled: '#BDC1C6',
    textOnPrimary: '#FFFFFF',
    textOnSecondary: '#FFFFFF',
    textOnDark: '#FFFFFF',
    textOnLight: '#1A1C1E',

    // Border Colors
    border: '#E8EAF6',
    borderFocus: '#0D47A1',
    borderHover: '#1976D2',
    borderDisabled: '#E0E0E0',

    // Interactive Colors
    overlay: 'rgba(26, 28, 30, 0.6)',
    backdrop: 'rgba(0, 0, 0, 0.3)',
    shadow: 'rgba(26, 28, 30, 0.08)',
    shadowElevated: 'rgba(26, 28, 30, 0.12)',

    // Glass & Transparency
    glass: 'rgba(255, 255, 255, 0.85)',
    glassBorder: 'rgba(255, 255, 255, 0.2)',
    transparent: 'transparent',
    semiTransparent: 'rgba(26, 28, 30, 0.5)',
  },
  typography: typographyBase,
  spacing: spacingBase,
  radius: radiusBase,
  shadows: {
    level1: 'rgba(26, 28, 30, 0.08)',
    level2: 'rgba(26, 28, 30, 0.16)',
  },
  motion: motionBase,
};

export const tokensDark: DesignTokens = {
  mode: 'dark',
  colors: {
    // Background Colors
    background: '#0A0E1A',
    backgroundElevated: '#1A1F2E',
    surface: '#1A1F2E',
    surfaceVariant: '#252D3F',
    surfaceElevated: '#2A3441',

    // Brand Colors - Premium Dark Palette
    primary: '#4FC3F7', // Light blue for dark theme
    primaryContainer: '#0D47A1',
    primaryHover: '#81D4FA',
    primaryPress: '#29B6F6',
    primaryDisabled: '#37415A',

    secondary: '#B39DDB', // Light purple
    secondaryContainer: '#4527A0',
    secondaryHover: '#CE93D8',
    secondaryPress: '#9C27B0',

    accent: '#FFD93D', // Gold accent
    accentContainer: '#FF8F00',

    // Semantic Colors
    info: '#4FC3F7',
    infoContainer: '#0D47A1',
    success: '#4ECDC4',
    successContainer: '#1B5E20',
    warning: '#FFD93D',
    warningContainer: '#E65100',
    danger: '#FF6B6B',
    dangerContainer: '#C62828',
    error: '#FF6B6B',
    errorContainer: '#C62828',

    // Text Colors
    text: '#F8FAFF',
    textSecondary: '#B3C5EF',
    textTertiary: '#8A9BB8',
    textDisabled: '#5F6B7A',
    textOnPrimary: '#0A0E1A',
    textOnSecondary: '#FFFFFF',
    textOnDark: '#FFFFFF',
    textOnLight: '#1A1C1E',

    // Border Colors
    border: '#37415A',
    borderFocus: '#4FC3F7',
    borderHover: '#81D4FA',
    borderDisabled: '#2A3441',

    // Interactive Colors
    overlay: 'rgba(10, 14, 26, 0.8)',
    backdrop: 'rgba(0, 0, 0, 0.6)',
    shadow: 'rgba(0, 0, 0, 0.4)',
    shadowElevated: 'rgba(0, 0, 0, 0.6)',

    // Glass & Transparency
    glass: 'rgba(26, 31, 46, 0.85)',
    glassBorder: 'rgba(79, 195, 247, 0.2)',
    transparent: 'transparent',
    semiTransparent: 'rgba(248, 250, 255, 0.5)',
  },
  typography: typographyBase,
  spacing: spacingBase,
  radius: radiusBase,
  shadows: {
    level1: 'rgba(0, 0, 0, 0.3)',
    level2: 'rgba(0, 0, 0, 0.5)',
  },
  motion: motionBase,
};

export const getTokens = (mode: ThemeMode): DesignTokens =>
  mode === 'dark' ? tokensDark : tokensLight;
