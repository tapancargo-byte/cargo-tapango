import React from 'react';
import { AppIcon, Circle } from '../../ui';

interface IconCircleProps {
  size: number;
  backgroundColor: string;
  borderWidth?: number;
  borderColor?: string;
  // Accept generic names; AppIcon will map appropriately to the active family
  iconName: string;
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
      <AppIcon name={iconName} size={iconSize} color={iconColor} />
    </Circle>
  );
}
