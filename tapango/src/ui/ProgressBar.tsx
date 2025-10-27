import React from 'react';
import { YStack } from 'tamagui';
import { useColors } from '../styles/ThemeProvider';

export interface ProgressBarProps extends React.AriaAttributes {
  value: number; // 0..100
  height?: number;
  backgroundColor?: string;
  testID?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  height = 6,
  backgroundColor,
  testID,
  ...ariaProps
}) => {
  const colors = useColors();
  return (
    <YStack
      height={height}
      backgroundColor={backgroundColor ?? colors.border}
      borderRadius={9999}
      overflow='hidden'
      role='progressbar'
      testID={testID}
      {...ariaProps}
    >
      <YStack
        height={height}
        width={`${Math.max(0, Math.min(100, value))}%`}
        backgroundColor={colors.primary}
      />
    </YStack>
  );
};
