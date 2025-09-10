import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Animated,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import { colors, textStyles, spacing, borderRadius, shadows } from '../styles';

export interface AnimatedButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  activeOpacity?: number;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  activeOpacity = 0.8,
  testID,
  accessibilityLabel,
  accessibilityHint,
  icon,
  iconPosition = 'left',
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
        tension: 150,
        friction: 4,
      }),
      Animated.timing(opacityAnim, {
        toValue: activeOpacity,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 150,
        friction: 4,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const getButtonStyles = (): ViewStyle => {
    const baseStyles: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: borderRadius.xl,
    };

    // Size variants
    const sizeStyles: Record<string, ViewStyle> = {
      small: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        minHeight: 36,
      },
      medium: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
        minHeight: 44,
      },
      large: {
        paddingHorizontal: spacing['2xl'],
        paddingVertical: spacing.lg,
        minHeight: 52,
      },
    };

    // Color variants
    const colorStyles: Record<string, ViewStyle> = {
      primary: {
        backgroundColor: disabled ? colors.neutral.mediumGray : colors.primary.orange,
        ...shadows.md,
      },
      secondary: {
        backgroundColor: disabled ? colors.neutral.lightGray : colors.secondary.lightBlue,
        ...shadows.sm,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: disabled ? colors.neutral.mediumGray : colors.primary.orange,
      },
      ghost: {
        backgroundColor: 'transparent',
      },
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...colorStyles[variant],
    };
  };

  const getTextStyles = (): TextStyle => {
    const baseTextStyles: TextStyle = {
      ...textStyles.button,
      textAlign: 'center',
    };

    // Size variants
    const sizeTextStyles: Record<string, TextStyle> = {
      small: {
        fontSize: 14,
        lineHeight: 18,
      },
      medium: {
        fontSize: 16,
        lineHeight: 22,
      },
      large: {
        fontSize: 18,
        lineHeight: 24,
      },
    };

    // Color variants
    const colorTextStyles: Record<string, TextStyle> = {
      primary: {
        color: disabled ? colors.neutral.white : colors.neutral.white,
      },
      secondary: {
        color: disabled ? colors.neutral.mediumGray : colors.primary.orange,
      },
      outline: {
        color: disabled ? colors.neutral.mediumGray : colors.primary.orange,
      },
      ghost: {
        color: disabled ? colors.neutral.mediumGray : colors.primary.orange,
      },
    };

    return {
      ...baseTextStyles,
      ...sizeTextStyles[size],
      ...colorTextStyles[variant],
    };
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Text style={[getTextStyles(), textStyle]}>
          Loading...
        </Text>
      );
    }

    if (icon && iconPosition === 'left') {
      return (
        <>
          <View style={{ marginRight: spacing.sm }}>
            {icon}
          </View>
          <Text style={[getTextStyles(), textStyle]}>
            {title}
          </Text>
        </>
      );
    }

    if (icon && iconPosition === 'right') {
      return (
        <>
          <Text style={[getTextStyles(), textStyle]}>
            {title}
          </Text>
          <View style={{ marginLeft: spacing.sm }}>
            {icon}
          </View>
        </>
      );
    }

    return (
      <Text style={[getTextStyles(), textStyle]}>
        {title}
      </Text>
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      testID={testID}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: disabled || loading }}
    >
      <Animated.View
        style={[
          getButtonStyles(),
          style,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        {renderContent()}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default AnimatedButton;
