import React from 'react';
import { Text, XStack, YStack } from 'tamagui';
import { useColors } from '../styles/ThemeProvider';
import { font } from './tokens';

export interface ListRowProps {
  left?: React.ReactNode;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  onPress?: () => void;
}

export const ListRow: React.FC<ListRowProps> = ({ left, title, subtitle, right, onPress }) => {
  const colors = useColors();
  return (
    <XStack
      alignItems='center'
      justifyContent='space-between'
      padding='$3'
      borderRadius='$4'
      backgroundColor={colors.surface}
      borderWidth={1}
      borderColor={colors.border}
      onPress={onPress as any}
    >
      <XStack alignItems='center' space='$3'>
        {left}
        <YStack>
          <Text fontSize={font.body} fontWeight='600'>
            {title}
          </Text>
          {subtitle ? (
            <Text fontSize={font.caption} color={colors.textSecondary}>
              {subtitle}
            </Text>
          ) : null}
        </YStack>
      </XStack>
      {right}
    </XStack>
  );
};
