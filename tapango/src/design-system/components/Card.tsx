import React from 'react';
import { Platform, StyleProp, ViewStyle } from 'react-native';
import { YStack } from 'tamagui';
import { BlurView } from 'expo-blur';
import Animated from 'react-native-reanimated';
import { getTokens, type ThemeMode } from '../tokens';
import { useIsDark } from '../../styles/ThemeProvider';
import {
  type BaseComponentProps,
  type CardVariant as CardVariantType,
  type SpaceValue,
  type ThemedProps,
  toPixels,
} from '../../ui/types';

export type CardVariant = 'default' | 'glass' | 'elevated' | 'outlined' | 'flat';

export interface CardProps extends BaseComponentProps, ThemedProps {
  children?: React.ReactNode;
  variant?: CardVariant;
  style?: StyleProp<ViewStyle>;
  padding?: SpaceValue; // Accept number or Tamagui token string
  p?: SpaceValue;
  px?: SpaceValue;
  py?: SpaceValue;
  pt?: SpaceValue;
  pr?: SpaceValue;
  pb?: SpaceValue;
  pl?: SpaceValue;
  hover?: boolean;
  animation?: string;
  mode?: ThemeMode;
}

// Prefer explicit mode prop; otherwise fall back to ThemeProvider; finally default to light.
const useEffectiveMode = (explicitMode?: ThemeMode): ThemeMode => {
  if (explicitMode) {
    return explicitMode;
  }
  try {
    const isDark = useIsDark();
    return isDark ? 'dark' : 'light';
  } catch {
    return 'light';
  }
};

// Helper to get the effective padding (handling both number and token strings)
const getEffectivePadding = (padding?: SpaceValue): number => {
  if (padding === undefined) {
    return 12;
  } // Default padding
  return toPixels(padding);
};

const BaseCard: React.FC<CardProps> = ({
  children,
  style,
  padding,
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  mode,
  ...rest
}) => {
  const effectiveMode = useEffectiveMode(mode);
  const tokens = getTokens(effectiveMode);

  // Convert any string token padding to number
  const paddingValue = getEffectivePadding(padding || p);
  const paddingHorizontal = px !== undefined ? toPixels(px) : undefined;
  const paddingVertical = py !== undefined ? toPixels(py) : undefined;
  const paddingTop = pt !== undefined ? toPixels(pt) : undefined;
  const paddingRight = pr !== undefined ? toPixels(pr) : undefined;
  const paddingBottom = pb !== undefined ? toPixels(pb) : undefined;
  const paddingLeft = pl !== undefined ? toPixels(pl) : undefined;

  return (
    <YStack
      backgroundColor={tokens.colors.surface}
      borderRadius={12}
      padding={paddingValue}
      paddingHorizontal={paddingHorizontal}
      paddingVertical={paddingVertical}
      paddingTop={paddingTop}
      paddingRight={paddingRight}
      paddingBottom={paddingBottom}
      paddingLeft={paddingLeft}
      borderWidth={0}
      {...rest}
      style={style as any}
    >
      {children}
    </YStack>
  );
};

export const Card: React.FC<CardProps> = (props) => {
  const { variant = 'default', mode, padding, p, px, py, pt, pr, pb, pl } = props;
  const effectiveMode = useEffectiveMode(mode);
  const tokens = getTokens(effectiveMode);

  if (variant === 'glass') {
    return <GlassCard {...props} />;
  }
  if (variant === 'elevated') {
    return <ElevatedCard {...props} />;
  }
  if (variant === 'outlined') {
    return <OutlinedCard {...props} />;
  }
  if (variant === 'flat') {
    return <FlatCard {...props} />;
  }

  // Convert any string token padding to number
  const paddingValue = getEffectivePadding(padding || p);
  const paddingHorizontal = px !== undefined ? toPixels(px) : undefined;
  const paddingVertical = py !== undefined ? toPixels(py) : undefined;
  const paddingTop = pt !== undefined ? toPixels(pt) : undefined;
  const paddingRight = pr !== undefined ? toPixels(pr) : undefined;
  const paddingBottom = pb !== undefined ? toPixels(pb) : undefined;
  const paddingLeft = pl !== undefined ? toPixels(pl) : undefined;

  return (
    <YStack
      backgroundColor={tokens.colors.surface}
      borderRadius={tokens.radius.lg}
      padding={paddingValue}
      paddingHorizontal={paddingHorizontal}
      paddingVertical={paddingVertical}
      paddingTop={paddingTop}
      paddingRight={paddingRight}
      paddingBottom={paddingBottom}
      paddingLeft={paddingLeft}
      minHeight={44} // Minimum touch target
      style={props.style as any}
      {...props}
    >
      {props.children}
    </YStack>
  );
};

export const GlassCard: React.FC<CardProps> = ({
  children,
  style,
  padding,
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  mode,
  hover,
  ...rest
}) => {
  const effectiveMode = useEffectiveMode(mode);
  const tokens = getTokens(effectiveMode);
  const colors = tokens.colors;

  return (
    <YStack borderRadius={tokens.radius.lg} overflow='hidden' minHeight={44} {...rest}>
      <BlurView
        intensity={effectiveMode === 'dark' ? 70 : 60} // Increased intensity for better effect
        tint={effectiveMode === 'dark' ? 'dark' : 'light'}
        style={{
          borderRadius: tokens.radius.lg,
          // Remove transition - not supported in RN styles
          ...(Platform.OS === 'web' && hover ? { transition: 'all 200ms ease-out' } : {}),
        }}
      >
        <YStack
          padding={getEffectivePadding(padding || p)}
          paddingHorizontal={px !== undefined ? toPixels(px) : undefined}
          paddingVertical={py !== undefined ? toPixels(py) : undefined}
          paddingTop={pt !== undefined ? toPixels(pt) : undefined}
          paddingRight={pr !== undefined ? toPixels(pr) : undefined}
          paddingBottom={pb !== undefined ? toPixels(pb) : undefined}
          paddingLeft={pl !== undefined ? toPixels(pl) : undefined}
          backgroundColor={colors.glass}
          borderWidth={1.5}
          borderColor={colors.glassBorder}
          style={style as any}
        >
          {children}
        </YStack>
      </BlurView>
    </YStack>
  );
};

export const ElevatedCard: React.FC<CardProps> = ({
  children,
  style,
  padding,
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  mode,
  hover,
  ...rest
}) => {
  const effectiveMode = useEffectiveMode(mode);
  const tokens = getTokens(effectiveMode);

  // Modern shadow system with multiple layers
  const shadowStyle =
    Platform.OS === 'web'
      ? ({
          boxShadow: `0px 1px 3px ${tokens.colors.shadow}, 0px 6px 16px ${tokens.colors.shadowElevated}`,
          transition: hover ? 'all 200ms ease-out' : undefined,
        } as any)
      : ({
          elevation: 4,
          shadowColor: tokens.colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
        } as any);

  const hoverStyle =
    hover && Platform.OS === 'web'
      ? {
          ':hover': {
            transform: 'translateY(-2px)',
            boxShadow: `0px 4px 8px ${tokens.colors.shadow}, 0px 12px 24px ${tokens.colors.shadowElevated}`,
          },
        }
      : {};

  return (
    <YStack
      backgroundColor={tokens.colors.surfaceElevated}
      borderRadius={tokens.radius.lg} // Slightly larger radius for modern look
      padding={getEffectivePadding(padding || p)}
      paddingHorizontal={px !== undefined ? toPixels(px) : undefined}
      paddingVertical={py !== undefined ? toPixels(py) : undefined}
      paddingTop={pt !== undefined ? toPixels(pt) : undefined}
      paddingRight={pr !== undefined ? toPixels(pr) : undefined}
      paddingBottom={pb !== undefined ? toPixels(pb) : undefined}
      paddingLeft={pl !== undefined ? toPixels(pl) : undefined}
      minHeight={44} // Minimum touch target
      style={[shadowStyle, hoverStyle, style as any]}
      {...rest}
    >
      {children}
    </YStack>
  );
};

export const OutlinedCard: React.FC<CardProps> = ({
  children,
  style,
  padding,
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  mode,
  hover,
  ...rest
}) => {
  const effectiveMode = useEffectiveMode(mode);
  const tokens = getTokens(effectiveMode);

  const hoverStyle =
    hover && Platform.OS === 'web'
      ? {
          ':hover': {
            borderColor: tokens.colors.borderHover,
            backgroundColor: `${tokens.colors.surfaceVariant}50`, // Subtle background change
          },
        }
      : {};

  return (
    <YStack
      backgroundColor={tokens.colors.surface}
      borderRadius={tokens.radius.lg}
      padding={getEffectivePadding(padding || p)}
      paddingHorizontal={px !== undefined ? toPixels(px) : undefined}
      paddingVertical={py !== undefined ? toPixels(py) : undefined}
      paddingTop={pt !== undefined ? toPixels(pt) : undefined}
      paddingRight={pr !== undefined ? toPixels(pr) : undefined}
      paddingBottom={pb !== undefined ? toPixels(pb) : undefined}
      paddingLeft={pl !== undefined ? toPixels(pl) : undefined}
      borderWidth={1.5} // Slightly thicker border for better definition
      borderColor={tokens.colors.border}
      minHeight={44}
      style={[hoverStyle, style as any]}
      {...rest}
    >
      {children}
    </YStack>
  );
};

export const FlatCard: React.FC<CardProps> = ({
  children,
  style,
  padding,
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  mode,
  hover,
  ...rest
}) => {
  const effectiveMode = useEffectiveMode(mode);
  const tokens = getTokens(effectiveMode);

  const hoverStyle =
    hover && Platform.OS === 'web'
      ? {
          ':hover': {
            backgroundColor: tokens.colors.surfaceElevated,
          },
        }
      : {};

  return (
    <YStack
      backgroundColor={tokens.colors.surfaceVariant}
      borderRadius={tokens.radius.lg}
      padding={getEffectivePadding(padding || p)}
      paddingHorizontal={px !== undefined ? toPixels(px) : undefined}
      paddingVertical={py !== undefined ? toPixels(py) : undefined}
      paddingTop={pt !== undefined ? toPixels(pt) : undefined}
      paddingRight={pr !== undefined ? toPixels(pr) : undefined}
      paddingBottom={pb !== undefined ? toPixels(pb) : undefined}
      paddingLeft={pl !== undefined ? toPixels(pl) : undefined}
      minHeight={44}
      style={[hoverStyle, style as any]}
      {...rest}
    >
      {children}
    </YStack>
  );
};
