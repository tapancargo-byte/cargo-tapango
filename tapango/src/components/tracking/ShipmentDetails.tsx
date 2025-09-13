import React from 'react';
import { XStack, YStack, Text, Separator } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { ElevatedCard, ProgressBar } from '../../ui';
import { useColors } from '../../styles/ThemeProvider';

export enum ShipmentStatus {
  Confirmed = 'confirmed',
  InTransit = 'in-transit',
  Delayed = 'delayed',
  Cancelled = 'cancelled',
  Pending = 'pending',
  Delivered = 'delivered'
}

interface KeyValueRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  label: string;
  value: string;
  testIDPrefix: string;
}

interface StatPairProps {
  leftLabel: string;
  leftValue: string;
  rightLabel: string;
  rightValue: string;
  testIDPrefix: string;
}

// Style objects for consistent text styles
const styles = {
  label: {
    fontSize: "$subtitle",
    color: "$textSecondary"
  },
  value: {
    fontSize: "$subtitle",
    color: "$text",
    fontWeight: "600",
    numberOfLines: 1,
    ellipsizeMode: "tail"
  },
  caption: {
    fontSize: "$caption",
    color: "$textSecondary",
    textTransform: "uppercase"
  }
} as const;

interface ShipmentDetailsProps {
  origin: string;
  destination: string;
  currentLocation: string;
  estimatedDelivery: string;
  cargoType: string;
  weight: string;
  status: ShipmentStatus;
  progressPercentage: number;
  formatDateTime: (timestamp: string) => string;
}

function KeyValueRow({ icon, iconColor, label, value, testIDPrefix }: KeyValueRowProps) {
  return (
    <XStack alignItems="center" justifyContent="space-between">
      <XStack alignItems="center" space="$2">
        <Ionicons 
          name={icon} 
          size={16} 
          color={iconColor}
          accessibilityRole="image"
          accessibilityLabel={`${label} icon`}
        />
        <Text 
          {...styles.label}
          testID={`${testIDPrefix}-label`}
        >
          {label}:
        </Text>
      </XStack>
      <Text 
        {...styles.value}
        testID={`${testIDPrefix}-value`}
        accessibilityLabel={value}
      >
        {value}
      </Text>
    </XStack>
  );
}

function StatPair({ leftLabel, leftValue, rightLabel, rightValue, testIDPrefix }: StatPairProps) {
  return (
    <XStack space="$4">
      <YStack flexShrink={1} space="$2">
        <Text 
          {...styles.caption}
          testID={`${testIDPrefix}-left-label`}
        >
          {leftLabel}
        </Text>
        <Text 
          {...styles.value}
          testID={`${testIDPrefix}-left-value`}
          accessibilityLabel={leftValue}
        >
          {leftValue}
        </Text>
      </YStack>
      
      <YStack flexShrink={1} space="$2">
        <Text 
          {...styles.caption}
          testID={`${testIDPrefix}-right-label`}
        >
          {rightLabel}
        </Text>
        <Text 
          {...styles.value}
          testID={`${testIDPrefix}-right-value`}
          accessibilityLabel={rightValue}
        >
          {rightValue}
        </Text>
      </YStack>
    </XStack>
  );
}

export function ShipmentDetails({
  origin,
  destination,
  currentLocation,
  estimatedDelivery,
  cargoType,
  weight,
  status,
  progressPercentage,
  formatDateTime
}: ShipmentDetailsProps) {
  const palette = useColors();

  return (
    <ElevatedCard 
      variant="elevated" 
      accessibilityRole="region" 
      accessibilityLabel="Shipment details"
      testID="shipment-details-card"
    >
      <YStack space="$3">
        <Text 
          fontSize="$section" 
          fontWeight="700" 
          color={palette.text}
          accessibilityRole="header"
          testID="shipment-details-title"
        >
          Shipment Details
        </Text>
        
        <YStack space="$3">
          <KeyValueRow
            icon="location"
            iconColor={palette.primary}
            label="From"
            value={origin}
            testIDPrefix="origin"
          />
          
          <ProgressBar 
            value={progressPercentage} 
            height={8} 
            backgroundColor={palette.surfaceVariant}
            aria-label={`Shipment progress: ${progressPercentage}%`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progressPercentage}
            testID="shipment-progress"
          />
          
          <KeyValueRow
            icon="flag"
            iconColor={palette.success}
            label="To"
            value={destination}
            testIDPrefix="destination"
          />
          
          <Separator />
          
          <StatPair
            leftLabel="Current Location"
            leftValue={currentLocation}
            rightLabel="Est. Delivery"
            rightValue={formatDateTime(estimatedDelivery)}
            testIDPrefix="location-delivery"
          />
          
          <StatPair
            leftLabel="Cargo Type"
            leftValue={cargoType}
            rightLabel="Weight"
            rightValue={weight}
            testIDPrefix="cargo-weight"
          />
        </YStack>
      </YStack>
    </ElevatedCard>
  );
}