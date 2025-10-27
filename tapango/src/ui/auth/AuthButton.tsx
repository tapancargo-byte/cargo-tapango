import React from 'react';
import { Button } from '../tg/Button';
import { AppIcon } from '../AppIcon';
import { colors } from '../../styles/colors';

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
      leftIcon={
        icon ? (
          <AppIcon
            name={icon as any}
            size={20}
            color={colors.primary.blue}
            tintFallback={'primary'}
          />
        ) : undefined
      }
      onPress={onPress}
      disabled={disabled}
    >
      {title}
    </Button>
  );
}
