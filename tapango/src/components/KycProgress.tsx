import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const KycProgress: React.FC<{ percent: number }> = ({ percent }) => {
  const clamped = Math.max(0, Math.min(100, Math.round(percent)));
  return (
    <View style={styles.card}>
      <Text style={styles.title}>KYC Progress</Text>
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${clamped}%` }]} />
      </View>
      <Text style={styles.caption}>{clamped}% completed</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E5E7EB', margin: 16 },
  title: { fontWeight: '700', marginBottom: 8, color: '#111827' },
  barBg: { height: 10, borderRadius: 5, backgroundColor: '#E5E7EB', overflow: 'hidden' },
  barFill: { height: 10, backgroundColor: '#10B981' },
  caption: { color: '#6B7280', marginTop: 6 },
});
