import React from 'react';
import { Pressable } from 'react-native';
import { XStack, YStack, Text } from 'tamagui';
import { ElevatedCard } from '../../design-system/components/Card';
import { AppIcon } from '../AppIcon';
import { useColors } from '../../styles/ThemeProvider';

export interface JobCardProps {
  id: string;
  origin: string;
  destination: string;
  payoutINR?: number;
  distance?: string;
  eta?: string;
  status?: 'available' | 'assigned' | 'active';
  onPress?: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  origin,
  destination,
  payoutINR,
  distance,
  eta,
  status = 'available',
  onPress,
}) => {
  const colors = useColors();
  const statusText =
    status === 'assigned' ? 'Assigned' : status === 'active' ? 'Active' : 'Available';
  return (
    <ElevatedCard padding={'$4' as any} hover>
      <Pressable accessibilityRole='button' onPress={onPress}>
        <YStack space={'$2' as any}>
          <YStack>
            <Text fontSize={16} fontWeight='700' color={colors.text}>
              {origin} → {destination}
            </Text>
            <Text fontSize={12} color={colors.textSecondary}>
              {statusText}
            </Text>
          </YStack>

          <XStack space={'$3' as any} alignItems='center'>
            {distance ? (
              <XStack alignItems='center' space={'$1' as any}>
                <AppIcon name='map-pin' size={14} color={colors.textSecondary} />
                <Text fontSize={12} color={colors.textSecondary}>
                  {distance}
                </Text>
              </XStack>
            ) : null}
            {eta ? (
              <XStack alignItems='center' space={'$1' as any}>
                <AppIcon name='clock' size={14} color={colors.textSecondary} />
                <Text fontSize={12} color={colors.textSecondary}>
                  {eta}
                </Text>
              </XStack>
            ) : null}
          </XStack>

          <XStack alignItems='center' justifyContent='space-between'>
            <Text fontSize={20} fontWeight='800' color={colors.primary}>
              {typeof payoutINR === 'number' ? `₹${payoutINR.toLocaleString('en-IN')}` : '—'}
            </Text>
            <XStack alignItems='center' space={'$1' as any}>
              <Text color={colors.primary} fontWeight='700'>
                Bid
              </Text>
              <AppIcon name='chevron-forward' size={16} color={colors.primary} />
            </XStack>
          </XStack>
        </YStack>
      </Pressable>
    </ElevatedCard>
  );
};
