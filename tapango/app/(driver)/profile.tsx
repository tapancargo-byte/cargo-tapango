import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { Button } from '../../src/ui';
import { supabase } from '../../src/services/supabaseClient';
import { submitKyc } from '../../src/services/kyc';

export default function DriverProfile() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rcUri, setRcUri] = useState<string | null>(null);
  const [licenseUri, setLicenseUri] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    let unsub: (() => void) | undefined;
    (async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUserId((data as any)?.user?.id ?? null);
      } catch {}
      try {
        const { data: sub } = supabase.auth.onAuthStateChange((_e, s: any) => {
          setUserId(s?.user?.id ?? null);
        });
        unsub = () => sub.subscription.unsubscribe();
      } catch {}
    })();
    return () => {
      try {
        unsub?.();
      } catch {}
    };
  }, []);

  if (!supabase) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Driver Profile</Text>
        <Text style={styles.subtitle}>
          Supabase not configured. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <Text style={styles.title}>Driver Profile</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Account</Text>
        <Text style={styles.muted}>Signed in as:</Text>
        <Text style={styles.bold}>{userId}</Text>
        <Button
          variant='secondary'
          onPress={async () => {
            setLoading(true);
            try {
              await supabase.auth.signOut();
              Alert.alert('Signed out');
            } catch (e: any) {
              Alert.alert('Error', e?.message ?? 'Failed to sign out');
            } finally {
              setLoading(false);
            }
          }}
          style={{ marginTop: 8 }}
        >
          {loading ? 'Signing out…' : 'Sign out'}
        </Button>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>KYC</Text>
        <Text style={styles.muted}>Upload your RC and Driver’s License</Text>
        <View style={styles.row}>
          <Button
            variant='secondary'
            onPress={async () => {
              const picker = await import('expo-image-picker');
              const res = await picker.launchImageLibraryAsync({
                mediaTypes: picker.MediaTypeOptions.Images,
                quality: 0.8,
              });
              if (!res.canceled && res.assets?.[0]?.uri) setRcUri(res.assets[0].uri);
            }}
          >
            {' '}
            {rcUri ? 'Replace RC' : 'Upload RC'}{' '}
          </Button>
          {rcUri ? <Image source={{ uri: rcUri }} style={styles.preview} /> : null}
        </View>
        <View style={styles.row}>
          <Button
            variant='secondary'
            onPress={async () => {
              const picker = await import('expo-image-picker');
              const res = await picker.launchImageLibraryAsync({
                mediaTypes: picker.MediaTypeOptions.Images,
                quality: 0.8,
              });
              if (!res.canceled && res.assets?.[0]?.uri) setLicenseUri(res.assets[0].uri);
            }}
          >
            {' '}
            {licenseUri ? 'Replace License' : 'Upload License'}{' '}
          </Button>
          {licenseUri ? <Image source={{ uri: licenseUri }} style={styles.preview} /> : null}
        </View>
        <Button
          variant='primary'
          onPress={async () => {
            setLoading(true);
            try {
              const res = await submitKyc({ rcUri, licenseUri, userId });
              Alert.alert(
                res.queued ? 'Queued' : 'Uploaded',
                res.queued ? 'KYC will sync when online.' : 'KYC uploaded successfully.'
              );
            } catch {
              Alert.alert('Error', 'Failed to submit KYC');
            } finally {
              setLoading(false);
            }
          }}
          fullWidth
          disabled={loading}
        >
          {loading ? 'Submitting…' : 'Submit KYC'}
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 16 },
  title: { fontSize: 24, fontWeight: '800', color: '#111827', marginBottom: 12 },
  subtitle: { color: '#6B7280', marginTop: 8 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  cardTitle: { fontWeight: '700', color: '#111827', marginBottom: 8 },
  bold: { fontWeight: '700', color: '#111827' },
  muted: { color: '#6B7280', marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  preview: { width: 60, height: 60, borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB' },
});
