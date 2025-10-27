import React from 'react';
import { useColors } from '../styles/ThemeProvider';
import { YStack } from 'tamagui';
import { AppIcon } from './AppIcon';

export const Illustration: React.FC<{ icon?: string; size?: number }> = ({
  icon = 'image-outline',
  size = 64,
}) => {
  const c = useColors();
  return (
    <YStack
      width={size + 24}
      height={size + 24}
      alignItems='center'
      justifyContent='center'
      borderRadius={size}
      backgroundColor={c.surfaceVariant}
    >
      <AppIcon name={icon} size={size} color={c.textSecondary} />
    </YStack>
  );
};
