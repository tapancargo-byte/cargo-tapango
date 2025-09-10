import React from 'react';
import { Pressable, Text, PressableProps, ActivityIndicator, ViewStyle, StyleProp } from 'react-native';
import { styles } from './Button.styles';

export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  /** Button text content */
  title: string;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  /** Button size */
  size?: 'small' | 'medium' | 'large';
  /** Loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Icon to display before text */
  leftIcon?: React.ReactNode;
  /** Icon to display after text */
  rightIcon?: React.ReactNode;
  /** Custom style */
  style?: StyleProp<ViewStyle>;
}

/**
 * Native button component following TAPANGO design system
 * 
 * Built exclusively with React Native components, no external UI libraries.
 * Supports multiple variants, sizes, loading states, and accessibility features.
 * 
 * @example
 * ```tsx
 * <Button 
 *   title="Save Changes" 
 *   variant="primary" 
 *   onPress={handleSave}
 *   loading={isLoading}
 * />
 * ```
 * 
 * @example
 * ```tsx
 * <Button 
 *   title="Delete Item" 
 *   variant="danger" 
 *   size="small"
 *   leftIcon={<TrashIcon />}
 *   onPress={handleDelete}
 * />
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  ...pressableProps
}) => {
  const isDisabled = disabled || loading;
  
  return (
    <Pressable
      style={[
        styles.base,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{
        disabled: isDisabled,
        busy: loading
      }}
      accessibilityLabel={loading ? `Loading ${title}` : title}
      {...pressableProps}
    >
      {({ pressed }) => (
        <>
          {leftIcon && !loading && (
            <Text style={[styles.icon, styles.leftIcon]}>{leftIcon}</Text>
          )}
          
          {loading ? (
            <ActivityIndicator
              size="small"
              color={styles[`${variant}Text`].color}
              style={styles.spinner}
            />
          ) : (
            <Text 
              style={[
                styles.text, 
                styles[`${variant}Text`],
                styles[`${size}Text`],
                pressed && styles.pressedText
              ]}
            >
              {title}
            </Text>
          )}
          
          {rightIcon && !loading && (
            <Text style={[styles.icon, styles.rightIcon]}>{rightIcon}</Text>
          )}
        </>
      )}
    </Pressable>
  );
};

// Memoize component for performance
export default React.memo(Button);
