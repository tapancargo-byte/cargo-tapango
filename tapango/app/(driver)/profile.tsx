import React from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { Button } from '../../src/ui';
import { supabase } from '../../src/services/supabaseClient';
import { drainDriverOffers } from '../../src/services/driverOffers';
import { drainKycUploads } from '../../src/services/kyc';
import { router } from 'expo-router';

export default function DriverProfile() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userId, setUserId] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!supabase) return;
    let unsubscribe: (() => void) | undefined;
    (async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUserId((data as any)?.user?.id ?? null);
      } catch {}
      try {
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_evt: unknown, session: any) => {
          setUserId((session as any)?.user?.id ?? null);
        });
        unsubscribe = () => subscription.unsubscribe();
      } catch {}
    })();
    return () => {
      try {
        unsubscribe?.();
      } catch {}
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Profile</Text>
      <Text style={styles.subtitle}>Sign in with Supabase to sync offers and KYC uploads.</Text>

      {!supabase && (
        <Text style={[styles.subtitle, { marginTop: 12 }]}>
          Supabase not configured. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY.
        </Text>
      )}

      {supabase && (
        <View style={{ marginTop: 16 }}>
          {userId ? (
            <View>
              <Text style={styles.signedIn}>Signed in as: {userId}</Text>
              <Button
                variant='secondary'
                onPress={async () => {
                  setLoading(true);
                  try {
                    await supabase!.auth.signOut();
                    Alert.alert('Signed out');
                  } catch (e: any) {
                    Alert.alert('Error', e?.message ?? 'Failed to sign out');
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                {loading ? 'Signing out...' : 'Sign out'}
              </Button>
            </View>
          ) : (
            <View>
              <Text style={{ fontWeight: '600', marginBottom: 8 }}>Supabase Sign-in</Text>
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
              <Button
                variant='primary'
                onPress={async () => {
                  if (!supabase) return;
                  setLoading(true);
                  try {
                    const { error } = await supabase.auth.signInWithPassword({
                      email: email.trim(),
                      password,
                    });
                    if (error) Alert.alert('Error', error.message);
                    else {
                      // Try to drain any queued items now that we're authenticated
                      try {
                        await drainDriverOffers();
                      } catch {}
                      try {
                        await drainKycUploads();
                      } catch {}
                      Alert.alert('Signed in', 'You can now sync KYC and offers.');
                    }
                  } catch (e: any) {
                    Alert.alert('Error', e?.message ?? 'Failed to sign in');
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
              <Button
                variant='secondary'
                onPress={() => router.push('/(driver)/sign-in' as any)}
                fullWidth
                style={{ marginTop: 8 }}
              >
                Open sign-in screen
              </Button>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F8FAFC' },
  title: { fontSize: 24, fontWeight: '800', color: '#111827' },
  subtitle: { color: '#6B7280', marginTop: 8 },
  signedIn: { color: '#065F46', fontWeight: '600', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
});
