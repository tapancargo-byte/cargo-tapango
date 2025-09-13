import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../../src/ui';
import { submitKyc } from '../../src/services/kyc';

export default function DriverKyc() {
  const [rcUri, setRcUri] = useState<string | null>(null);
  const [licenseUri, setLicenseUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pick = async (setter: (uri: string) => void) => {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8 });
    if (!res.canceled && res.assets?.[0]?.uri) setter(res.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KYC Upload</Text>
      <View style={styles.row}>
        <Button variant="secondary" onPress={() => pick((u) => setRcUri(u))}>
          {rcUri ? 'Replace RC' : 'Upload RC'}
        </Button>
        {rcUri && <Image source={{ uri: rcUri }} style={styles.preview} />}
      </View>
      <View style={styles.row}>
        <Button variant="secondary" onPress={() => pick((u) => setLicenseUri(u))}>
          {licenseUri ? 'Replace License' : 'Upload License'}
        </Button>
        {licenseUri && <Image source={{ uri: licenseUri }} style={styles.preview} />}
      </View>
      <Button
        variant="primary"
        onPress={async () => {
          setLoading(true);
          try {
            const res = await submitKyc({ rcUri, licenseUri, userId: 'driver' });
            Alert.alert(res.queued ? 'Queued' : 'Uploaded', res.queued ? 'KYC will sync when online.' : 'KYC uploaded successfully.');
          } catch {
            Alert.alert('Error', 'Failed to submit KYC');
          } finally { setLoading(false); }
        }}
        fullWidth
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit KYC'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F8FAFC' },
  title: { fontSize: 24, fontWeight: '800', color: '#111827', marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  preview: { width: 60, height: 60, borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB' },
});
