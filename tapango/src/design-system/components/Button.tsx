import React from 'react';
import { Platform, Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import { Stack, Text, XStack } from 'tamagui';
import * as Haptics from 'expo-haptics';
import Animated from 'react-native-reanimated';
import { getTokens, type ThemeMode } from '../tokens';
import { usePressableScale } from '../animations';
import { useIsDark } from '../../styles/ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import {
  type BaseComponentProps,
  type IconProps,
  type SpaceValue,
  type ThemedProps,
  toPixels,
} from '../../ui/types';

// Loosen BaseComponentProps to allow optional accessibility strings
type LooseBaseProps = Omit<BaseComponentProps, 'accessibilityLabel' | 'accessibilityHint'> & {
  accessibilityLabel?: string | undefined;
  accessibilityHint?: string | undefined;
};

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'gradient'
  | 'danger'
  | 'success';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps
  extends Omit<PressableProps, 'onPress' | 'style'>,
    LooseBaseProps,
    ThemedProps,
    IconProps {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: () => void | Promise<void>;
  style?: StyleProp<ViewStyle>;
  mode?: ThemeMode; // defaults to light; consumers typically get colors from ThemeProvider
  flex?: number;
  loading?: boolean;
  animation?: string;
  title?: string;
  marginTop?: SpaceValue;
  borderRadius?: number;
  // Additional props to support existing usage
  minWidth?: number;
  padding?: SpaceValue;
  pressStyle?: {
    backgroundColor?: string;
    transform?: { scale?: number; translateY?: number }[];
    scale?: number;
    opacity?: number;
  };
}

const sizeStyles: Record<
  ButtonSize,
  { height: number; paddingHorizontal: number; fontSize: number; icon: number }
> = {
  xs: { height: 28, paddingHorizontal: 10, fontSize: 12, icon: 12 },
  sm: { height: 36, paddingHorizontal: 12, fontSize: 14, icon: 14 },
  md: { height: 44, paddingHorizontal: 16, fontSize: 16, icon: 16 },
  lg: { height: 52, paddingHorizontal: 18, fontSize: 16, icon: 18 },
  xl: { height: 60, paddingHorizontal: 20, fontSize: 18, icon: 20 },
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth,
  disabled,
  leftIcon,
  rightIcon,
  onPress,
  style,
  mode = 'light',
  flex,
  loading,
  animation,
  title,
  marginTop,
  borderRadius,
  // Additional props
  minWidth,
  padding,
  backgroundColor,
  borderColor,
  pressStyle,
  ...rest
}) => {
  const isDark = (() => {
    try {
      return useIsDark();
    } catch {
      return mode === 'dark';
    }
  })();
  const tokens = getTokens(isDark ? 'dark' : 'light');
  const { animatedStyle, onPressIn, onPressOut } = usePressableScale(disabled ? 1.0 : 0.97);
  const dims = sizeStyles[size];

  const colors = tokens.colors;

  // Enhanced color logic with proper theming
  const getButtonColors = () => {
    if (disabled) {
      return {
        background: colors.primaryDisabled,
        text: colors.textDisabled,
        border: colors.borderDisabled,
      };
    }

    switch (variant) {
      case 'primary':
        return {
          background: colors.primary,
          text: colors.textOnPrimary,
          border: colors.primary,
        };
      case 'secondary':
        return {
          background: colors.secondary,
          text: colors.textOnSecondary,
          border: colors.secondary,
        };
      case 'outline':
        return {
          background: colors.transparent,
          text: colors.primary,
          border: colors.primary,
        };
      case 'ghost':
        return {
          background: colors.transparent,
          text: colors.text,
          border: colors.transparent,
        };
      case 'gradient':
        return {
          background: colors.primary, // LinearGradient will override
          text: colors.textOnPrimary,
          border: colors.transparent,
        };
      case 'danger':
        return {
          background: colors.danger,
          text: colors.textOnPrimary,
          border: colors.danger,
        };
      case 'success':
        return {
          background: colors.success,
          text: colors.textOnPrimary,
          border: colors.success,
        };
      default:
        return {
          background: colors.primary,
          text: colors.textOnPrimary,
          border: colors.primary,
        };
    }
  };

  const buttonColors = getButtonColors();

  const handlePress = async () => {
    if (disabled || loading) {
      return;
    }
    try {
      await Haptics.selectionAsync();
    } catch {}
    await onPress?.();
  };

  const resolvedMarginTop = marginTop ? toPixels(marginTop) : undefined;

  return (
    <Animated.View
      style={[
        { width: fullWidth ? '100%' : undefined, flex, marginTop: resolvedMarginTop },
        animatedStyle,
      ]}
    >
      <Pressable
        onPressIn={disabled ? undefined : onPressIn}
        onPressOut={disabled ? undefined : onPressOut}
        onPress={handlePress}
        disabled={disabled || loading}
        style={[
          {
            height: dims.height,
            minWidth,
            paddingHorizontal: padding ? toPixels(padding) : dims.paddingHorizontal,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: backgroundColor || buttonColors.background,
            borderRadius: borderRadius ?? tokens.radius.md,
            borderWidth: buttonColors.border === colors.transparent ? 0 : 1.5,
            borderColor: borderColor || buttonColors.border,
            overflow: 'hidden',
            // Enhanced shadow for premium feel
            ...(Platform.OS === 'ios' && variant !== 'ghost' && variant !== 'outline' && !disabled
              ? {
                  shadowColor: colors.shadow,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                }
              : {}),
            ...(Platform.OS === 'android' &&
            variant !== 'ghost' &&
            variant !== 'outline' &&
            !disabled
              ? {
                  elevation: 2,
                }
              : {}),
          },
          style as any,
        ]}
        accessibilityRole={rest.accessibilityRole ?? 'button'}
        accessibilityState={{ disabled: disabled || loading }}
        {...rest}
      >
        {variant === 'gradient' ? (
          <LinearGradient
            colors={[colors.primary, colors.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />
        ) : null}

        <XStack alignItems='center' justifyContent='center' space='$2' opacity={loading ? 0.7 : 1}>
          {loading ? (
            <LoadingSpinner size='sm' color={buttonColors.text} />
          ) : (
            <>
              {leftIcon ? <Stack>{leftIcon}</Stack> : null}
              <Text color={buttonColors.text} fontWeight='700' fontSize={dims.fontSize}>
                {children ?? title}
              </Text>
              {rightIcon ? <Stack>{rightIcon}</Stack> : null}
            </>
          )}
        </XStack>
      </Pressable>
    </Animated.View>
  );
};
