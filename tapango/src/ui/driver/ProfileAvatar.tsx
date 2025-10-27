import React from 'react';
import { Text } from 'tamagui';
import { Circle } from '../Primitives';
import { useColors } from '../../styles/ThemeProvider';

export const ProfileAvatar: React.FC<{ size?: number; name?: string; uri?: string }> = ({
  size = 64,
  name,
}) => {
  const colors = useColors();
  const initial = (name?.trim()?.[0] || 'U').toUpperCase();
  return (
    <Circle
      size={size}
      backgroundColor={colors.primary}
      alignItems='center'
      justifyContent='center'
    >
      <Text color='white' fontWeight='800' fontSize={size / 2.5}>
        {initial}
      </Text>
    </Circle>
  );
};
