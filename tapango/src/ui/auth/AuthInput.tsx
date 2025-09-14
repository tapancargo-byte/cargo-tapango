import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Input } from '../tg/Input';
import { AppIcon } from '../AppIcon';
import { colors } from '../../styles/colors';
import { textStyles } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import { TextInputProps } from 'react-native';

interface AuthInputProps extends TextInputProps {
  label: string;
  icon: string;
  error?: string | undefined;
  isPassword?: boolean;
  onChangeText: (text: string) => void;
  value: string;
}

// Simplified AuthInput that delegates layout entirely to the shared Input component.
// This avoids nested backgrounds and misalignment, and ensures consistent paddings.
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
    <View style={{ marginBottom: spacing.lg }}>
      <Input
        label={label}
        value={value}
        onChangeText={onChangeText}
        error={error}
        leftIcon={<AppIcon name={icon as any} size={18} color={colors.primary.blue} />}
        rightIcon={
          isPassword ? (
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              accessibilityRole='button'
              accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
            >
              <AppIcon
                name={showPassword ? 'eye-off' : 'eye'}
                size={18}
                color={colors.neutral.mediumGray}
              />
            </TouchableOpacity>
          ) : undefined
        }
        secureTextEntry={isPassword && !showPassword}
        variant='filled'
        // Ensure inputs expand and align with icons
        style={{ width: '100%' }}
        labelColor='rgba(255,255,255,0.92)'
        // Forward best-practice defaults unless explicitly overridden
        autoCapitalize={(textInputProps as any)?.autoCapitalize ?? (isPassword ? 'none' : 'none')}
        autoCorrect={(textInputProps as any)?.autoCorrect ?? false}
        textContentType={
          (textInputProps as any)?.textContentType ?? (isPassword ? 'password' : 'emailAddress')
        }
        autoComplete={(textInputProps as any)?.autoComplete ?? (isPassword ? 'password' : 'email')}
        keyboardType={
          (textInputProps as any)?.keyboardType ?? (isPassword ? 'default' : 'email-address')
        }
        {...textInputProps}
      />
      {error ? (
        <View style={styles.errorRow}>
          <AppIcon name='alert-circle' size={14} color={colors.status.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    paddingHorizontal: 4,
  },
  errorText: {
    ...textStyles.caption,
    color: colors.status.error,
    marginLeft: 6,
    flex: 1,
  },
});
