import React from 'react';
import { View, StyleSheet } from 'react-native';

interface PaginationProps {
  total: number;
  index: number;
}

export default function Pagination({ total, index }: PaginationProps) {
  return (
    <View style={styles.row} accessibilityRole="progressbar" accessibilityValue={{ min: 1, max: total, now: index + 1 }}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={[styles.dot, i === index ? styles.dotActive : styles.dotInactive]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 2,
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
  },
  dotInactive: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
});

