import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function DriverJobs() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Jobs</Text>
      <Text style={styles.subtitle}>This is a lightweight scaffold of the Driver app.</Text>
      <TouchableOpacity accessibilityRole="button" accessibilityHint="Go to wallet" onPress={() => router.push('/(driver)/wallet' as any)} style={styles.btn}>
        <Text style={styles.btnText}>Go to Wallet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F8FAFC' },
  title: { fontSize: 24, fontWeight: '800', color: '#111827' },
  subtitle: { color: '#6B7280', marginTop: 8 },
  btn: { marginTop: 16, backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
});
