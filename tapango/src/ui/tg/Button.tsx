import { Stack } from 'tamagui';
import { memo } from 'react';
import { Pressable, View, Text, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export type Variant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'gradient'
  | 'danger'
  | 'success';
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

import { useColors } from '../../styles/ThemeProvider';

export interface AppButtonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  borderRadius?: any;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  gradient?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  [key: string]: any;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Premium Button with enhanced styling and animations
export const Button = memo<AppButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    fullWidth,
    borderRadius = '$3',
    loading = false,
    leftIcon,
    rightIcon,
    gradient = false,
    children,
    onPress,
    disabled,
    ...props
  }) => {
    const colors = useColors();
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
      };
    });

    const handlePressIn = () => {
      scale.value = withSpring(0.96, { damping: 15, stiffness: 200 });
      opacity.value = withTiming(0.8, { duration: 150 });
    };

    const handlePressOut = () => {
      scale.value = withSpring(1, { damping: 15, stiffness: 200 });
      opacity.value = withTiming(1, { duration: 150 });
    };

    const getVariantStyles = () => {
      switch (variant) {
        case 'primary':
          return {
            backgroundColor: colors.primary,
            color: colors.textOnPrimary,
            borderColor: colors.primary,
            borderWidth: 0,
            elevation: 3,
          };
        case 'secondary':
          return {
            backgroundColor: colors.surfaceVariant,
            color: colors.text,
            borderColor: colors.border,
            borderWidth: 1,
            elevation: 1,
          };
        case 'outline':
          return {
            backgroundColor: 'transparent',
            color: colors.primary,
            borderColor: colors.primary,
            borderWidth: 1.5,
          };
        case 'ghost':
          return {
            backgroundColor: 'transparent',
            color: colors.primary,
            borderColor: 'transparent',
            borderWidth: 0,
          };
        case 'gradient':
          return {
            backgroundColor: colors.primary, // Fallback
            color: colors.textOnPrimary,
            borderWidth: 0,
            elevation: 6,
          };
        case 'danger':
          return {
            backgroundColor: colors.error,
            color: colors.textOnPrimary,
            borderColor: colors.error,
            borderWidth: 0,
          };
        case 'success':
          return {
            backgroundColor: colors.success,
            color: colors.textOnPrimary,
            borderColor: colors.success,
            borderWidth: 0,
          };
        default:
          return {};
      }
    };

    const getSizeStyles = () => {
      switch (size) {
        case 'xs':
          return { height: 32, paddingHorizontal: 12, fontSize: 14 };
        case 'sm':
          return { height: 36, paddingHorizontal: 16, fontSize: 14 };
        case 'md':
          return { height: 44, paddingHorizontal: 20, fontSize: 16 };
        case 'lg':
          return { height: 52, paddingHorizontal: 24, fontSize: 18 };
        case 'xl':
          return { height: 60, paddingHorizontal: 32, fontSize: 20 };
        default:
          return { height: 44, paddingHorizontal: 20, fontSize: 16 };
      }
    };

    const buttonStyles = {
      ...getVariantStyles(),
      ...getSizeStyles(),
      borderRadius:
        typeof borderRadius === 'string' && borderRadius.startsWith('$') ? 8 : borderRadius,
      width: fullWidth ? ('100%' as const) : undefined,
      opacity: disabled ? 0.6 : 1,
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      gap: 8,
    };

    // Web-only boxShadow mapping per variant; native relies on elevation only
    const getWebShadowStyle = () => {
      if (Platform.OS !== 'web') return {};
      switch (variant) {
        case 'primary':
          return { boxShadow: '0px 2px 8px rgba(0,0,0,0.15)' };
        case 'secondary':
          return { boxShadow: '0px 1px 3px rgba(0,0,0,0.10)' };
        case 'gradient':
          return { boxShadow: '0px 4px 12px rgba(0,0,0,0.20)' };
        case 'danger':
          return { boxShadow: '0px 4px 12px rgba(211, 47, 47, 0.35)' };
        case 'success':
          return { boxShadow: '0px 4px 12px rgba(56, 142, 60, 0.30)' };
        default:
          return { boxShadow: '0px 1px 2px rgba(0,0,0,0.10)' };
      }
    };

    return (
      <AnimatedPressable
        style={animatedStyle}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={disabled || loading ? undefined : onPress}
        disabled={disabled || loading}
      >
        <View
          style={{
            backgroundColor: buttonStyles.backgroundColor,
            borderColor: buttonStyles.borderColor,
            borderWidth: buttonStyles.borderWidth,
            borderRadius: buttonStyles.borderRadius,
            height: buttonStyles.height,
            paddingHorizontal: buttonStyles.paddingHorizontal,
            width: buttonStyles.width,
            opacity: buttonStyles.opacity,
            flexDirection: buttonStyles.flexDirection,
            alignItems: buttonStyles.alignItems,
            justifyContent: buttonStyles.justifyContent,
            gap: buttonStyles.gap,
            ...(getWebShadowStyle() as any),
          }}
        >
          {loading ? (
            <Text style={{ color: buttonStyles.color, fontSize: buttonStyles.fontSize }}>
              Loading...
            </Text>
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              {leftIcon && <View>{leftIcon}</View>}
              <Text style={{ color: buttonStyles.color, fontSize: buttonStyles.fontSize }}>
                {children}
              </Text>
              {rightIcon && <View>{rightIcon}</View>}
            </View>
          )}
        </View>
      </AnimatedPressable>
    );
  }
);
