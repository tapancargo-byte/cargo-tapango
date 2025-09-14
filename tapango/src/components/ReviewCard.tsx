import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatINR } from '../utils/currency';

export type ReviewData = {
  pickup?: string;
  delivery?: string;
  cargoType?: string;
  weightKg?: number;
  amountINR?: number;
};

export const ReviewCard: React.FC<{ data: ReviewData }> = ({ data }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Review</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Pickup</Text>
        <Text style={styles.value}>{data.pickup ?? '-'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Delivery</Text>
        <Text style={styles.value}>{data.delivery ?? '-'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Cargo</Text>
        <Text style={styles.value}>{data.cargoType ?? '-'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Billable</Text>
        <Text style={styles.value}>{(data.weightKg ?? 0).toFixed(1)} kg</Text>
      </View>
      {typeof data.amountINR === 'number' && (
        <View style={styles.row}>
          <Text style={styles.label}>Amount</Text>
          <Text style={[styles.value, styles.amount]}>{formatINR(data.amountINR)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 8, color: '#111827' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  label: { color: '#6B7280' },
  value: { color: '#111827', fontWeight: '600', textAlign: 'right', flexShrink: 1, marginLeft: 8 },
  amount: { color: '#0369A1' },
});
