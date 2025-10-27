import React from 'react';
import { Dimensions, Platform, Pressable, ScrollView, View } from 'react-native';
import { XStack, YStack, Text, Stack } from 'tamagui';
import { Button, ElevatedCard, OutlinedCard, AppIcon, Circle } from '../../ui';

export interface TopActionsCarouselProps {
  colors: any;
  onNewOrder: () => void;
  onTrack: () => void;
  onViewOrders: () => void;
}

const GAP = 12;
const { width } = Dimensions.get('window');
const COMPACT = width < 380;
// Unified item width so all CTAs visually match
const ITEM_W = Math.min((width - 32 - GAP) / 2, 260);
const PRIMARY_W = ITEM_W;
const SECONDARY_W = ITEM_W;
const TILE_H = 64;

export const TopActionsCarousel: React.FC<TopActionsCarouselProps> = ({
  colors,
  onNewOrder,
  onTrack,
  onViewOrders,
}) => {
  return (
    <View style={{ backgroundColor: colors.background }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={PRIMARY_W + GAP}
        decelerationRate='fast'
        snapToAlignment='start'
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8, gap: GAP }}
      >
        {/* Primary card */}
        {/* Primary as outlined/elevated card to match others */}
        <OutlinedCard
          padding='$3'
          style={{ width: COMPACT ? 56 : PRIMARY_W, height: TILE_H, justifyContent: 'center' }}
        >
          <Pressable
            accessibilityRole='button'
            accessibilityLabel='Create new shipment'
            onPress={onNewOrder}
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >
            {COMPACT ? (
              <Circle size={36} backgroundColor={colors.primary + '22'}>
                <AppIcon name='add' size={16} color={colors.primary} />
              </Circle>
            ) : (
              <XStack alignItems='center' space='$3' style={{ width: '100%' }}>
                <Circle size={36} backgroundColor={colors.primary + '22'}>
                  <AppIcon name='add' size={16} color={colors.primary} />
                </Circle>
                <YStack alignItems='flex-start' style={{ flexShrink: 1, minWidth: 0 }}>
                  <Text
                    color={colors.text}
                    fontSize={15}
                    fontWeight='800'
                    lineHeight={20}
                    numberOfLines={2}
                  >
                    Create New Shipment
                  </Text>
                  <Text
                    color={colors.textSecondary}
                    fontSize={12}
                    lineHeight={16}
                    numberOfLines={1}
                  >
                    Book and track your cargo
                  </Text>
                </YStack>
              </XStack>
            )}
          </Pressable>
        </OutlinedCard>

        {/* Secondary: Track */}
        <OutlinedCard
          padding='$3'
          style={{ width: COMPACT ? 56 : SECONDARY_W, height: TILE_H, justifyContent: 'center' }}
        >
          <Pressable
            accessibilityRole='button'
            accessibilityLabel='Track package'
            onPress={onTrack}
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >
            {COMPACT ? (
              <Circle size={36} backgroundColor={colors.primary + '22'}>
                <AppIcon name='search' size={16} color={colors.primary} />
              </Circle>
            ) : (
              <XStack alignItems='center' space='$3' style={{ width: '100%' }}>
                <Circle size={36} backgroundColor={colors.primary + '22'}>
                  <AppIcon name='search' size={16} color={colors.primary} />
                </Circle>
                <YStack alignItems='flex-start' style={{ flexShrink: 1, minWidth: 0 }}>
                  <Text
                    fontSize={15}
                    fontWeight='800'
                    color={colors.text}
                    lineHeight={20}
                    numberOfLines={1}
                  >
                    Track Package
                  </Text>
                  <Text fontSize={12} color={colors.textSecondary} numberOfLines={1}>
                    Find shipment status
                  </Text>
                </YStack>
              </XStack>
            )}
          </Pressable>
        </OutlinedCard>

        {/* Secondary: Orders */}
        <OutlinedCard
          padding='$3'
          style={{ width: COMPACT ? 56 : SECONDARY_W, height: TILE_H, justifyContent: 'center' }}
        >
          <Pressable
            accessibilityRole='button'
            accessibilityLabel='View orders'
            onPress={onViewOrders}
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >
            {COMPACT ? (
              <Circle size={36} backgroundColor={colors.accent + '22'}>
                <AppIcon name='list' size={16} color={colors.accent} />
              </Circle>
            ) : (
              <XStack alignItems='center' space='$3' style={{ width: '100%' }}>
                <Circle size={36} backgroundColor={colors.accent + '22'}>
                  <AppIcon name='list' size={16} color={colors.accent} />
                </Circle>
                <YStack alignItems='flex-start' style={{ flexShrink: 1, minWidth: 0 }}>
                  <Text
                    fontSize={15}
                    fontWeight='800'
                    color={colors.text}
                    lineHeight={20}
                    numberOfLines={1}
                  >
                    View Orders
                  </Text>
                  <Text fontSize={12} color={colors.textSecondary} numberOfLines={1}>
                    See all shipments
                  </Text>
                </YStack>
              </XStack>
            )}
          </Pressable>
        </OutlinedCard>
      </ScrollView>
    </View>
  );
};
