import React from 'react';
import { Text, XStack, YStack } from 'tamagui';
import { useColors, useIsDark } from '../styles/ThemeProvider';
import { font } from './tokens';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  paddingHorizontal?: any;
  withShadow?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  right,
  paddingHorizontal = '$4',
  withShadow = false,
}) => {
  const colors = useColors();
  const isDark = useIsDark();
  const elevation = withShadow ? (isDark ? 1 : 2) : 0;
  return (
    <YStack elevation={elevation} backgroundColor={withShadow ? '$background' : undefined}>
      <XStack
        alignItems='center'
        justifyContent='space-between'
        paddingHorizontal={paddingHorizontal}
        paddingVertical='$2'
      >
        <YStack>
          <Text fontSize={font.section} fontWeight='700'>
            {title}
          </Text>
          {subtitle ? (
            <Text color={colors.textSecondary} fontSize={font.caption}>
              {subtitle}
            </Text>
          ) : null}
        </YStack>
        {right}
      </XStack>
    </YStack>
  );
};
