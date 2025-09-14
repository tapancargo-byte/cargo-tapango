import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import * as Haptics from 'expo-haptics';
import { fetchQuote, QuotePayload, QuoteResponse } from '../services/quote';
import { formatINR } from '../utils/currency';

type Props = {
  payload: QuotePayload;
  onSuccess?: (q: QuoteResponse) => void;
};

export const QuoteCard: React.FC<Props> = ({ payload, onSuccess }) => {
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationFn: () => fetchQuote(payload),
    onSuccess: (q) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
      onSuccess?.(q);
    },
  });

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Instant Quote</Text>
      {!data && (
        <TouchableOpacity accessibilityRole='button' onPress={() => mutate()} style={styles.cta}>
          {isPending ? (
            <ActivityIndicator color='#fff' />
          ) : (
            <Text style={styles.ctaText}>Get Quote</Text>
          )}
        </TouchableOpacity>
      )}

      {isError && (
        <Text style={styles.error}>
          Error: {(error as any)?.message ?? 'Failed to fetch quote'}
        </Text>
      )}

      {data && (
        <View style={styles.result}>
          <Text style={styles.amount}>{formatINR(data.amount)}</Text>
          {data.breakdown?.map((b) => (
            <View key={b.label} style={styles.row}>
              <Text style={styles.label}>{b.label}</Text>
              <Text style={styles.value}>{formatINR(b.amount)}</Text>
            </View>
          ))}
          <Text style={styles.quoteId}>Quote ID: {data.quoteId}</Text>
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
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 8, color: '#111827' },
  cta: {
    marginTop: 8,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  ctaText: { color: '#fff', fontWeight: '700' },
  error: { color: '#B91C1C', marginTop: 8 },
  result: { marginTop: 8 },
  amount: { fontSize: 22, fontWeight: '800', color: '#0369A1', marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  label: { color: '#6B7280' },
  value: { color: '#111827', fontWeight: '600' },
  quoteId: { color: '#6B7280', marginTop: 8, fontSize: 12 },
});
