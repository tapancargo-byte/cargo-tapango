/**
 * Shared UI component prop types for consistent interfaces across design system
 *
 * This file defines common prop types used by Card, Button, Typography, and other
 * UI components to ensure consistency between Tamagui and custom components.
 */

import type { ComponentProps, ReactNode } from 'react';
import type { Pressable, Text, View } from 'react-native';

// ============= SPACING TYPES =============

/**
 * Spacing values that can be either numbers (pixels) or Tamagui space tokens
 */
export type SpaceValue =
  | number
  | '$0'
  | '$1'
  | '$2'
  | '$3'
  | '$4'
  | '$5'
  | '$6'
  | '$8'
  | '$10'
  | '$12'
  | '$16'
  | '$20'
  | '$24';

/**
 * Individual padding/margin props
 */
export interface SpacingProps {
  // Padding
  padding?: SpaceValue;
  p?: SpaceValue;
  paddingHorizontal?: SpaceValue;
  px?: SpaceValue;
  paddingVertical?: SpaceValue;
  py?: SpaceValue;
  paddingTop?: SpaceValue;
  pt?: SpaceValue;
  paddingRight?: SpaceValue;
  pr?: SpaceValue;
  paddingBottom?: SpaceValue;
  pb?: SpaceValue;
  paddingLeft?: SpaceValue;
  pl?: SpaceValue;

  // Margin
  margin?: SpaceValue;
  m?: SpaceValue;
  marginHorizontal?: SpaceValue;
  mx?: SpaceValue;
  marginVertical?: SpaceValue;
  my?: SpaceValue;
  marginTop?: SpaceValue;
  mt?: SpaceValue;
  marginRight?: SpaceValue;
  mr?: SpaceValue;
  marginBottom?: SpaceValue;
  mb?: SpaceValue;
  marginLeft?: SpaceValue;
  ml?: SpaceValue;
}

// ============= COLOR TYPES =============

/**
 * Color values that can be hex colors or semantic token names
 */
export type ColorValue = string;

// ============= SIZE AND RADIUS TYPES =============

/**
 * Border radius values
 */
export type RadiusValue =
  | number
  | '$1'
  | '$2'
  | '$3'
  | '$4'
  | '$5'
  | '$6'
  | '$8'
  | '$10'
  | '$12'
  | '$16';

/**
 * Component sizes
 */
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Typography variants
 */
export type TypographyVariant =
  | 'display'
  | 'headline'
  | 'title'
  | 'subtitle'
  | 'body'
  | 'caption'
  | 'overline';

/**
 * Text weight options
 */
export type FontWeight =
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800';

// ============= COMPONENT VARIANT TYPES =============

/**
 * Card component variants
 */
export type CardVariant = 'flat' | 'outlined' | 'elevated' | 'glass';

/**
 * Button component variants
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive';

// ============= ACCESSIBILITY TYPES =============

/**
 * Common accessibility props
 */
export interface AccessibilityProps {
  accessibilityLabel?: string | undefined;
  accessibilityHint?: string | undefined;
  accessibilityRole?: ComponentProps<typeof Pressable>['accessibilityRole'];
  accessibilityState?: ComponentProps<typeof Pressable>['accessibilityState'];
  accessible?: boolean | undefined;
}

// ============= ICON TYPES =============

/**
 * Icon props for components that support icons
 */
export interface IconProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  icon?: ReactNode;
}

// ============= LAYOUT TYPES =============

/**
 * Flex layout props
 */
export interface FlexProps {
  flex?: number;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
}

// ============= BASE COMPONENT PROPS =============

/**
 * Base props shared across all UI components
 */
export interface BaseComponentProps extends SpacingProps, AccessibilityProps {
  children?: ReactNode;
  testID?: string | undefined;
}

/**
 * Props for components that support theming
 */
export interface ThemedProps {
  backgroundColor?: ColorValue;
  borderColor?: ColorValue;
  borderRadius?: RadiusValue;
  borderWidth?: number;
}

// ============= UTILITY FUNCTIONS =============

/**
 * Convert spacing value to pixels for React Native styles
 * @param value - Spacing value (number or token)
 * @returns Number of pixels
 */
export const toPixels = (value: SpaceValue): number => {
  if (typeof value === 'number') {
    return value;
  }

  // Convert Tamagui space tokens to pixel values
  const tokenMap: Record<string, number> = {
    $0: 0,
    $1: 4,
    $2: 8,
    $3: 12,
    $4: 16,
    $5: 20,
    $6: 24,
    $8: 32,
    $10: 40,
    $12: 48,
    $16: 64,
    $20: 80,
    $24: 96,
  };

  return tokenMap[value] ?? 16; // Default to 16px if unknown token
};

/**
 * Convert radius value to pixels
 * @param value - Radius value (number or token)
 * @returns Number of pixels
 */
export const toRadius = (value: RadiusValue): number => {
  if (typeof value === 'number') {
    return value;
  }

  const tokenMap: Record<string, number> = {
    $1: 2,
    $2: 4,
    $3: 6,
    $4: 8,
    $5: 12,
    $6: 16,
    $8: 20,
    $10: 24,
    $12: 28,
    $16: 32,
  };

  return tokenMap[value] ?? 8; // Default to 8px if unknown token
};

/**
 * Extract spacing props from component props
 * @param props - Component props object
 * @returns Spacing props and remaining props
 */
export const extractSpacingProps = <T extends SpacingProps>(
  props: T
): { spacingProps: SpacingProps; otherProps: Omit<T, keyof SpacingProps> } => {
  const {
    padding,
    p,
    paddingHorizontal,
    px,
    paddingVertical,
    py,
    paddingTop,
    pt,
    paddingRight,
    pr,
    paddingBottom,
    pb,
    paddingLeft,
    pl,
    margin,
    m,
    marginHorizontal,
    mx,
    marginVertical,
    my,
    marginTop,
    mt,
    marginRight,
    mr,
    marginBottom,
    mb,
    marginLeft,
    ml,
    ...otherProps
  } = props;

  const spacingProps: Partial<SpacingProps> = {};

  // Only add defined values
  if (padding !== undefined) {
    spacingProps.padding = padding;
  }
  if (p !== undefined) {
    spacingProps.p = p;
  }
  if (paddingHorizontal !== undefined) {
    spacingProps.paddingHorizontal = paddingHorizontal;
  }
  if (px !== undefined) {
    spacingProps.px = px;
  }
  if (paddingVertical !== undefined) {
    spacingProps.paddingVertical = paddingVertical;
  }
  if (py !== undefined) {
    spacingProps.py = py;
  }
  if (paddingTop !== undefined) {
    spacingProps.paddingTop = paddingTop;
  }
  if (pt !== undefined) {
    spacingProps.pt = pt;
  }
  if (paddingRight !== undefined) {
    spacingProps.paddingRight = paddingRight;
  }
  if (pr !== undefined) {
    spacingProps.pr = pr;
  }
  if (paddingBottom !== undefined) {
    spacingProps.paddingBottom = paddingBottom;
  }
  if (pb !== undefined) {
    spacingProps.pb = pb;
  }
  if (paddingLeft !== undefined) {
    spacingProps.paddingLeft = paddingLeft;
  }
  if (pl !== undefined) {
    spacingProps.pl = pl;
  }
  if (margin !== undefined) {
    spacingProps.margin = margin;
  }
  if (m !== undefined) {
    spacingProps.m = m;
  }
  if (marginHorizontal !== undefined) {
    spacingProps.marginHorizontal = marginHorizontal;
  }
  if (mx !== undefined) {
    spacingProps.mx = mx;
  }
  if (marginVertical !== undefined) {
    spacingProps.marginVertical = marginVertical;
  }
  if (my !== undefined) {
    spacingProps.my = my;
  }
  if (marginTop !== undefined) {
    spacingProps.marginTop = marginTop;
  }
  if (mt !== undefined) {
    spacingProps.mt = mt;
  }
  if (marginRight !== undefined) {
    spacingProps.marginRight = marginRight;
  }
  if (mr !== undefined) {
    spacingProps.mr = mr;
  }
  if (marginBottom !== undefined) {
    spacingProps.marginBottom = marginBottom;
  }
  if (mb !== undefined) {
    spacingProps.mb = mb;
  }
  if (marginLeft !== undefined) {
    spacingProps.marginLeft = marginLeft;
  }
  if (ml !== undefined) {
    spacingProps.ml = ml;
  }

  return { spacingProps: spacingProps as SpacingProps, otherProps };
};
