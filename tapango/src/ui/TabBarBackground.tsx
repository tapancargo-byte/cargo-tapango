import React from 'react';
import { YStack } from 'tamagui';
import { useColors } from '../styles/ThemeProvider';

export const TabBarBackground: React.FC = () => {
  const colors = useColors();
  return (
    <YStack
      position='absolute'
      left={0}
      right={0}
      top={0}
      bottom={0}
      backgroundColor={colors.surface}
      opacity={0.98}
    />
  );
};
