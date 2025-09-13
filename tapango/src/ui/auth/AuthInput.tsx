import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Input } from '../tg/Input';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';
import { typography, textStyles } from '../../styles/typography';
import { spacing, borderRadius, shadows } from '../../styles/spacing';
import { TextInputProps } from 'react-native';

interface AuthInputProps extends TextInputProps {
  label: string;
  icon: string;
  error?: string | undefined;
  isPassword?: boolean;
  onChangeText: (text: string) => void;
  value: string;
}

/**
 * AuthInput Component
 * 
 * A specialized input component for authentication forms with icon support
 * and password visibility toggle.
 */
export function AuthInput({
  label,
  icon,
  error,
  isPassword = false,
  onChangeText,
  value,
  ...textInputProps
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <View style={styles.container}>
      <View style={[styles.inputWrapper, error && styles.inputError]}>
        <View style={styles.iconContainer}>
          <Ionicons 
            name={icon as any} 
            size={20} 
            color={colors.primary.blue}
          />
        </View>
        <Input
          label={label}
          value={value}
          onChangeText={onChangeText}
          error={error}
          leftIcon={null}
          rightIcon={isPassword ? (
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)}
              style={styles.passwordToggle}
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color={colors.neutral.mediumGray}
              />
            </TouchableOpacity>
          ) : null}
          secureTextEntry={isPassword && !showPassword}
          {...textInputProps}
        />
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={16} color={colors.status.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    minHeight: 60,
    position: 'relative',
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