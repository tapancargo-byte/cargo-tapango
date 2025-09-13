import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '../tg/Button';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: string;
  fullWidth?: boolean;
}

/**
 * AuthButton Component
 * 
 * A specialized button component for authentication forms with icon support
 * and loading states.
 */
export function AuthButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  icon,
  fullWidth = true,
}: AuthButtonProps) {
  return (
    <Button
      variant={variant}
      fullWidth={fullWidth}
      loading={loading}
      leftIcon={icon ? (
        <Ionicons 
          name={icon as any} 
          size={20} 
          color={colors.primary.blue} 
          style={styles.buttonIcon} 
        />
      ) : undefined}
      onPress={onPress}
      disabled={disabled}
    >
      {title}
    </Button>
  );
}

const styles = StyleSheet.create({
  // Keep only the style actually used to avoid RNW shadow warnings in Storybook
  buttonIcon: {
    marginRight: spacing.sm,
  },
});
