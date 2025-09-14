import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type StatusVariant =
  | 'pending'
  | 'confirmed'
  | 'in-transit'
  | 'delivered'
  | 'cancelled'
  | 'delayed';

interface StatusBadgeProps {
  status: StatusVariant;
  size?: 'small' | 'medium' | 'large';
}

/**
 * StatusBadge Component
 *
 * Displays order/shipment status with appropriate colors
 */
export function StatusBadge({ status, size = 'medium' }: StatusBadgeProps) {
  const statusConfig = {
    pending: {
      label: 'Pending',
      backgroundColor: '#FEF3C7',
      textColor: '#92400E',
    },
    confirmed: {
      label: 'Confirmed',
      backgroundColor: '#DBEAFE',
      textColor: '#1E40AF',
    },
    'in-transit': {
      label: 'In Transit',
      backgroundColor: '#E0E7FF',
      textColor: '#3730A3',
    },
    delivered: {
      label: 'Delivered',
      backgroundColor: '#D1FAE5',
      textColor: '#065F46',
    },
    cancelled: {
      label: 'Cancelled',
      backgroundColor: '#FEE2E2',
      textColor: '#991B1B',
    },
    delayed: {
      label: 'Delayed',
      backgroundColor: '#FED7AA',
      textColor: '#9A3412',
    },
  };

  const config = statusConfig[status];

  return (
    <View style={[styles.badge, styles[size], { backgroundColor: config.backgroundColor }]}>
      <Text style={[styles.text, styles[`${size}Text`], { color: config.textColor }]}>
        {config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginVertical: 2,
  },
  small: {
    minWidth: 60,
    height: 24,
  },
  medium: {
    minWidth: 80,
    height: 28,
  },
  large: {
    minWidth: 100,
    height: 32,
  },
  text: {
    fontWeight: 'bold',
    letterSpacing: 0.2,
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
});
