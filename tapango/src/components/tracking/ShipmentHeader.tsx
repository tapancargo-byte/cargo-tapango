import React from 'react';
import { Share, Alert } from 'react-native';
import { XStack, YStack, Text, Theme } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { ElevatedCard, Button, StatusPill, Circle } from '../../ui';
import { useColors } from '../../styles/ThemeProvider';
import { StatusVariant } from '../../ui/StatusBadge';
import { t } from '../../i18n';

interface TrackingInfoProps {
  trackingNumber: string;
  status: StatusVariant;
  lastUpdate: string;
}

interface ActionButtonsProps {
  onRefresh: () => Promise<void>;
  onShare: () => Promise<void>;
  isRefreshing?: boolean;
}

interface ShipmentHeaderProps {
  /** Unique tracking identifier for the shipment */
  trackingNumber: string;
  /** Current status of the shipment */
  status: StatusVariant;
  /** ISO timestamp of the last status update */
  lastUpdate: string;
  /** Callback to refresh shipment data */
  onRefresh: () => Promise<void>;
  /** Origin location of the shipment */
  origin: string;
  /** Destination location of the shipment */
  destination: string;
}

const ICON_SIZE = 16;
const CIRCLE_SIZE = 8;

const formatLastUpdate = (timestamp: string): string => {
  try {
    return new Date(timestamp).toLocaleString();
  } catch {
    return timestamp;
  }
};

/** Displays tracking information and status */
function TrackingInfo({ trackingNumber, status, lastUpdate }: TrackingInfoProps) {
  const { text, textSecondary, success } = useColors();
  
  return (
    <YStack flexShrink={1}>
      <XStack alignItems="center" space="$2">
        <Text 
          fontSize="$section" 
          fontWeight="700" 
          color={text}
          numberOfLines={1}
          ellipsizeMode="tail"
          accessibilityRole="text"
          testID="tracking-number"
        >
          {trackingNumber}
        </Text>
        <Circle 
          size={CIRCLE_SIZE} 
          backgroundColor={success}
          accessibilityRole="image"
          accessibilityLabel="Active shipment indicator"
        />
      </XStack>
      <XStack alignItems="center" space="$2" marginTop="$1">
        <StatusPill status={status as 'pending' | 'in-transit' | 'delivered' | 'delayed'} />
        <Text 
          fontSize="$caption" 
          color={textSecondary}
          numberOfLines={1}
          ellipsizeMode="tail"
          accessibilityRole="text"
          testID="last-update"
        >
          {t('Last updated')}: {formatLastUpdate(lastUpdate)}
        </Text>
      </XStack>
    </YStack>
  );
}

/** Action buttons for refreshing and sharing */
function ActionButtons({ onRefresh, onShare, isRefreshing }: ActionButtonsProps) {
  const { text } = useColors();
  
  return (
    <XStack space="$2">
      <Button 
        size="sm" 
        variant="outline" 
        onPress={onRefresh}
        disabled={isRefreshing || false}
        accessibilityLabel={t('Refresh shipment status')}
        accessibilityRole="button"
        testID="refresh-button"
      >
        <Ionicons name="refresh" size={ICON_SIZE} color={text} />
      </Button>
      <Button 
        size="sm" 
        variant="ghost" 
        onPress={onShare}
        accessibilityLabel={t('Share shipment details')}
        accessibilityRole="button"
        testID="share-button"
      >
        <Ionicons name="share" size={ICON_SIZE} color={text} />
      </Button>
    </XStack>
  );
}

/** Header component displaying shipment tracking information and actions */
export function ShipmentHeader({
  trackingNumber,
  status,
  lastUpdate,
  onRefresh,
  origin,
  destination
}: ShipmentHeaderProps) {
  const handleShare = async () => {
    try {
      const message = t('track_shipment_share_message', {
        trackingNumber,
        origin,
        destination
      });
      await Share.share({ message });
      Alert.alert(
        t('Success'),
        t('Shipment details have been shared successfully')
      );
    } catch (error) {
      console.error('Share error:', error);
      Alert.alert(
        t('Error'),
        t('Failed to share shipment details')
      );
    }
  };

  return (
    <ElevatedCard 
      variant="elevated" 
      animation="slide"
      accessibilityRole="header"
      testID="shipment-header"
    >
      <XStack alignItems="center" justifyContent="space-between">
        <TrackingInfo 
          trackingNumber={trackingNumber}
          status={status}
          lastUpdate={lastUpdate}
        />
        <ActionButtons 
          onRefresh={onRefresh}
          onShare={handleShare}
        />
      </XStack>
    </ElevatedCard>
  );
}