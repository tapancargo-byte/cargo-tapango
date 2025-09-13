import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatINR } from '../../src/utils/currency';

export default function DriverWallet() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet</Text>
      <View style={styles.card}>
        <Text style={styles.row}>Earnings today</Text>
        <Text style={styles.amount}>{formatINR(1850)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F8FAFC' },
  title: { fontSize: 24, fontWeight: '800', color: '#111827' },
  card: { marginTop: 12, backgroundColor: '#fff', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E5E7EB' },
  row: { color: '#6B7280' },
  amount: { color: '#0369A1', fontWeight: '800', fontSize: 20, marginTop: 6 },
});
