import { Platform } from 'react-native';

export const typography = {
  fontFamily: {
    regular: Platform.select({
      ios: 'SF Pro Text',
      android: 'Roboto',
      default: 'System',
    }),
    medium: Platform.select({
      ios: 'SF Pro Text Medium',
      android: 'Roboto Medium',
      default: 'System',
    }),
    bold: Platform.select({
      ios: 'SF Pro Display Bold',
      android: 'Roboto Bold',
      default: 'System',
    }),
    semibold: Platform.select({
      ios: 'SF Pro Display Semibold',
      android: 'Roboto Medium',
      default: 'System',
    }),
  },
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 28,
    '5xl': 32,
    '6xl': 36,
  },
  lineHeight: {
    xs: 14,
    sm: 16,
    base: 20,
    lg: 24,
    xl: 26,
    '2xl': 28,
    '3xl': 32,
    '4xl': 36,
    '5xl': 40,
    '6xl': 44,
  },
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
    widest: 2,
  },
} as const;

// Text style presets
export const textStyles = {
  largeTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize['5xl'],
    lineHeight: typography.lineHeight['5xl'],
    fontWeight: typography.fontWeight.bold,
    letterSpacing: typography.letterSpacing.wide,
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize['4xl'],
    lineHeight: typography.lineHeight['4xl'],
    fontWeight: typography.fontWeight.bold,
    letterSpacing: typography.letterSpacing.normal,
  },
  heading: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize['3xl'],
    lineHeight: typography.lineHeight['3xl'],
    fontWeight: typography.fontWeight.semibold,
    letterSpacing: typography.letterSpacing.normal,
  },
  subheading: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.xl,
    lineHeight: typography.lineHeight.xl,
    fontWeight: typography.fontWeight.medium,
    letterSpacing: typography.letterSpacing.normal,
  },
  body: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.base,
    fontWeight: typography.fontWeight.normal,
    letterSpacing: typography.letterSpacing.normal,
  },
  bodyLarge: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.lg,
    lineHeight: typography.lineHeight.lg,
    fontWeight: typography.fontWeight.normal,
    letterSpacing: typography.letterSpacing.normal,
  },
  caption: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.sm,
    fontWeight: typography.fontWeight.normal,
    letterSpacing: typography.letterSpacing.normal,
  },
  button: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize.lg,
    lineHeight: typography.lineHeight.lg,
    fontWeight: typography.fontWeight.semibold,
    letterSpacing: typography.letterSpacing.normal,
  },
} as const;

export type Typography = typeof typography;
export type TextStyles = typeof textStyles;
