import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';
import { typography, textStyles } from '../../styles/typography';
import { spacing, borderRadius, shadows } from '../../styles/spacing';

interface AuthInputProps extends TextInputProps {
  label: string;
  icon: string;
  error?: string | undefined;
  isPassword?: boolean;
  onChangeText: (text: string) => void;
  value: string;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  label,
  icon,
  error,
  isPassword = false,
  onChangeText,
  value,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // Stable animated values to prevent flicker or disappearance on re-renders
  const animatedLabelPosition = React.useRef(new Animated.Value(value ? 1 : 0)).current;
  const animatedBorderColor = React.useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedLabelPosition, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(animatedBorderColor, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(animatedLabelPosition, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    Animated.timing(animatedBorderColor, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  // Keep label in correct position if value changes programmatically
  React.useEffect(() => {
    Animated.timing(animatedLabelPosition, {
      toValue: value ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [value, animatedLabelPosition]);

  const labelStyle = {
    position: 'absolute' as const,
    left: 48,
    top: animatedLabelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 4],
    }),
    fontSize: animatedLabelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedLabelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.neutral.mediumGray, colors.primary.blue],
    }),
    backgroundColor: 'white',
    paddingHorizontal: 4,
    zIndex: 1,
  };

  const borderColor = animatedBorderColor.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.neutral.lightGray, colors.primary.blue],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.inputWrapper, { borderColor }, error ? styles.inputError : null]}>
        <View style={styles.iconContainer}>
          <Ionicons 
            name={icon as any} 
            size={20} 
            color={isFocused ? colors.primary.blue : colors.neutral.mediumGray} 
          />
        </View>
        
        <Animated.Text style={labelStyle}>
          {label}
        </Animated.Text>
        
        <TextInput
          style={[styles.input, { paddingTop: value || isFocused ? 20 : 8 }]}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={isPassword && !showPassword}
          {...textInputProps}
        />
        
        {isPassword && (
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color={colors.neutral.mediumGray}
            />
          </TouchableOpacity>
        )}
      </Animated.View>
      
      {error && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={16} color={colors.status.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1.5,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    minHeight: 60,
    position: 'relative',
    ...shadows.md,
    shadowColor: 'rgba(30, 64, 175, 0.1)',
  },
  inputError: {
    borderColor: colors.status.error,
    backgroundColor: 'rgba(255, 245, 245, 0.95)',
  },
  iconContainer: {
    marginRight: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.regular,
    color: colors.neutral.darkGray,
    paddingBottom: 8,
    paddingLeft: spacing.xs,
  },
  passwordToggle: {
    padding: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  errorText: {
    ...textStyles.caption,
    color: colors.status.error,
    marginLeft: spacing.xs,
    flex: 1,
  },
});
