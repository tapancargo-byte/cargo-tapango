import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Circle } from '../../ui';

interface IconCircleProps {
  size: number;
  backgroundColor: string;
  borderWidth?: number;
  borderColor?: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconSize: number;
  iconColor?: string;
  testID?: string;
}

export function IconCircle({
  size,
  backgroundColor,
  borderWidth,
  borderColor,
  iconName,
  iconSize,
  iconColor = 'white',
  testID,
}: IconCircleProps) {
  return (
    <Circle
      size={size}
      backgroundColor={backgroundColor}
      borderWidth={borderWidth}
      borderColor={borderColor}
      testID={testID}
    >
      <Ionicons name={iconName} size={iconSize} color={iconColor} />
    </Circle>
  );
}