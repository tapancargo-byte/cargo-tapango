import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button } from '../../src/components/ui/Button';
import { StorageService } from '../../src/utils/storage';

export default function DeveloperScreen() {
  const reset = async () => {
    await StorageService.resetOnboardingForTesting();
    Alert.alert('Onboarding reset', 'Restart the app to see onboarding again.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Developer Tools</Text>
      <Text style={styles.sub}>Diagnostics and safe utilities. Not visible to end-users.</Text>

      <Button title="Reset Onboarding" variant="secondary" onPress={reset} fullWidth style={{ marginTop: 16 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24 },
  title: { fontSize: 22, fontWeight: '800', color: '#111827' },
  sub: { fontSize: 14, color: '#6b7280', marginTop: 6 },
});

