import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';

export default function ScanModal() {
  const [value, setValue] = useState('TPG123456789');

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Scan QR to Track</Text>
        <Text style={styles.help}>Camera integration coming soon. For now, paste or type a tracking ID and continue.</Text>

        <TextInput
          value={value}
          onChangeText={setValue}
          autoCapitalize="characters"
          placeholder="TPG#########"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
        />

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityHint="Open tracking screen"
          style={styles.primary}
          onPress={() => router.replace(`/(tabs)/tracking?id=${encodeURIComponent(value)}`)}
        >
          <Text style={styles.primaryText}>Track</Text>
        </TouchableOpacity>

        <TouchableOpacity accessibilityRole="button" style={styles.close} onPress={() => router.back()}>
          <Text style={styles.closeText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center', padding: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, width: '100%' },
  title: { fontSize: 18, fontWeight: '800', marginBottom: 8 },
  help: { color: '#6B7280', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 12, backgroundColor: '#fff', marginBottom: 12 },
  primary: { backgroundColor: '#007AFF', borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
  primaryText: { color: '#fff', fontWeight: '700' },
  close: { marginTop: 12, alignItems: 'center' },
  closeText: { color: '#374151', fontWeight: '600' },
});
