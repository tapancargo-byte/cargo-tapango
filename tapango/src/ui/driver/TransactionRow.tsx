import React from 'react';
import { XStack, YStack, Text } from 'tamagui';
import { AppIcon } from '../AppIcon';
import { useColors } from '../../styles/ThemeProvider';

export interface TransactionRowProps {
  title: string;
  subtitle?: string;
  date?: string; // ISO
  amountINR: number;
  type?: 'credit' | 'debit';
}

export const TransactionRow: React.FC<TransactionRowProps> = ({
  title,
  subtitle,
  date,
  amountINR,
  type = 'credit',
}) => {
  const c = useColors();
  const amountColor = type === 'credit' ? c.success : c.danger;
  return (
    <XStack
      alignItems='center'
      justifyContent='space-between'
      padding={'$3' as any}
      backgroundColor={c.surface}
      borderWidth={1}
      borderColor={c.border}
      borderRadius={'$4' as any}
    >
      <XStack alignItems='center' space={'$3' as any}>
        <AppIcon
          name={type === 'credit' ? 'arrow-down-circle' : 'arrow-up-circle'}
          size={18}
          color={amountColor}
        />
        <YStack>
          <Text fontWeight='700' color={c.text}>
            {title}
          </Text>
          {subtitle ? (
            <Text fontSize={12} color={c.textSecondary}>
              {subtitle}
            </Text>
          ) : null}
        </YStack>
      </XStack>
      <YStack alignItems='flex-end'>
        <Text fontWeight='800' color={amountColor}>
          ₹{amountINR.toLocaleString('en-IN')}
        </Text>
        {date ? (
          <Text fontSize={12} color={c.textSecondary}>
            {new Date(date).toLocaleString()}
          </Text>
        ) : null}
      </YStack>
    </XStack>
  );
};
