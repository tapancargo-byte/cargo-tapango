import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';
import { textStyles, typography } from '../../styles/typography';
import { spacing, borderRadius, shadows } from '../../styles/spacing';

const { width } = Dimensions.get('window');

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: string;
  fullWidth?: boolean;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  icon,
  fullWidth = true,
}) => {
  const scaleValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const isDisabled = disabled || loading;

  const getButtonStyle = () => {
    const baseStyle = [
      styles.button,
      fullWidth && styles.fullWidth,
      isDisabled && styles.disabled,
    ];

    switch (variant) {
      case 'secondary':
        return [...baseStyle, styles.secondaryButton];
      case 'outline':
        return [...baseStyle, styles.outlineButton];
      default:
        return baseStyle;
    }
  };

  const getTextColor = () => {
    if (isDisabled) return colors.neutral.mediumGray;
    switch (variant) {
      case 'outline':
        return colors.primary.blue;
      default:
        return 'white';
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContent}>
          <ActivityIndicator 
            color={variant === 'outline' ? colors.primary.blue : 'white'} 
            size="small" 
          />
          <Text style={[styles.buttonText, { color: getTextColor(), marginLeft: spacing.sm }]}>
            Loading...
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.buttonContent}>
        {icon && (
          <Ionicons
            name={icon as any}
            size={20}
            color={getTextColor()}
            style={styles.buttonIcon}
          />
        )}
        <Text style={[styles.buttonText, { color: getTextColor() }]}>
          {title}
        </Text>
      </View>
    );
  };

  if (variant === 'primary' && !isDisabled) {
    return (
      <Animated.View style={[{ transform: [{ scale: scaleValue }] }, fullWidth && { width: '100%' }]}>
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={isDisabled}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={loading ? [colors.neutral.mediumGray, colors.neutral.mediumGray] : colors.gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.button, styles.gradientButton, fullWidth && styles.fullWidth]}
          >
            {renderContent()}
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[{ transform: [{ scale: scaleValue }] }, fullWidth && { width: '100%' }]}>
      <TouchableOpacity
        style={getButtonStyle()}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        activeOpacity={0.7}
      >
        {renderContent()}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing['2xl'],
    ...shadows.lg,
    shadowColor: 'rgba(30, 64, 175, 0.3)',
  },
  fullWidth: {
    width: '100%',
  },
  gradientButton: {
    borderWidth: 0,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor: colors.neutral.lightGray,
  },
  outlineButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
  },
  disabled: {
    opacity: 0.5,
    ...shadows.none,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    ...textStyles.button,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
  },
  buttonIcon: {
    marginRight: spacing.sm,
  },
});
