import React from 'react';
import { TextInput, ViewStyle, StyleProp, TextInputProps } from 'react-native';
import { Text, XStack, YStack, Stack } from 'tamagui';
import { getTokens, type ThemeMode } from '../tokens';
import { useIsDark } from '../../styles/ThemeProvider';

export type InputVariant = 'default' | 'filled' | 'outlined' | 'ghost';

export interface InputProps
  extends Omit<
    TextInputProps,
    'style' | 'onChangeText' | 'value' | 'placeholder' | 'secureTextEntry' | 'keyboardType'
  > {
  label?: string;
  value?: string;
  placeholder?: string;
  onChangeText?: (t: string) => void;
  error?: string | undefined;
  variant?: InputVariant;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  mode?: ThemeMode;
  required?: boolean;
  style?: StyleProp<ViewStyle>;
  secureTextEntry?: boolean;
  keyboardType?: any;
  borderRadius?: number;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  placeholder,
  onChangeText,
  error,
  variant = 'default',
  leftIcon,
  rightIcon,
  mode = 'light',
  required,
  style,
  secureTextEntry,
  keyboardType,
  borderRadius,
  ...rest
}) => {
  const isDark = (() => {
    try {
      return useIsDark();
    } catch {
      return mode === 'dark';
    }
  })();
  const t = getTokens(isDark ? 'dark' : 'light');

  const bg = variant === 'filled' ? t.colors.surfaceVariant : 'transparent';
  const borderWidth = variant === 'outlined' ? 1 : 1;
  const borderColor = error ? t.colors.danger : t.colors.border;

  return (
    <YStack space='$1'>
      {label ? (
        <Text fontSize={t.typography.subtitle} fontWeight='600' color={t.colors.text}>
          {label} {required ? <Text color={t.colors.danger}>*</Text> : null}
        </Text>
      ) : null}
      <XStack
        alignItems='center'
        borderRadius={borderRadius ?? 12}
        paddingHorizontal='$3'
        backgroundColor={bg}
        borderWidth={borderWidth}
        borderColor={borderColor}
        style={style as any}
      >
        {leftIcon ? <Stack marginRight='$2'>{leftIcon}</Stack> : null}
        <TextInput
          style={{ flex: 1, height: 44, color: t.colors.text }}
          placeholder={placeholder}
          placeholderTextColor={t.colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          accessible
          accessibilityLabel={label}
          {...rest}
        />
        {rightIcon ? <Stack marginLeft='$2'>{rightIcon}</Stack> : null}
      </XStack>
      {error ? (
        <Text fontSize={t.typography.caption} color={t.colors.danger}>
          {error}
        </Text>
      ) : null}
    </YStack>
  );
};
