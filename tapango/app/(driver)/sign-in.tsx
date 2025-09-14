import React from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { Button } from '../../src/ui';
import { supabase } from '../../src/services/supabaseClient';

export default function DriverSupabaseSignIn() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onSignIn = async () => {
    if (!supabase) {
      Alert.alert(
        'Not configured',
        'Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY.'
      );
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) Alert.alert('Error', error.message);
      else {
        Alert.alert('Signed in', 'You are now signed in.');
        router.replace('/(driver)/profile' as any);
      }
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Sign-in (Supabase)</Text>
      <Text style={styles.subtitle}>Sign in to sync offers and KYC uploads securely.</Text>

      <TextInput
        placeholder='driver@example.com'
        autoCapitalize='none'
        keyboardType='email-address'
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder='Password'
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button variant='primary' onPress={onSignIn} fullWidth disabled={loading}>
        {loading ? 'Signing in...' : 'Sign in'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F8FAFC' },
  title: { fontSize: 24, fontWeight: '800', color: '#111827' },
  subtitle: { color: '#6B7280', marginTop: 8, marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
});
