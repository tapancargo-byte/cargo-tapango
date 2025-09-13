import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Input } from '../../src/ui';
import { Button } from '../../src/ui';
import { submitDriverOffer } from '../../src/services/driverOffers';

export default function DriverBid() {
  const [trackingId, setTrackingId] = useState('TPG123456789');
  const [amount, setAmount] = useState('1500');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const { queued, id } = await submitDriverOffer({ trackingId, amountINR: Number(amount) || 0, note });
      if (queued) {
        Alert.alert('Queued', 'Offer saved offline and will be synced when online.');
      } else {
        Alert.alert('Offer Submitted', `Offer ID: ${id ?? 'N/A'}`);
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to submit offer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Place an Offer</Text>
      <Input label="Tracking ID" value={trackingId} onChangeText={setTrackingId} placeholder="TPG#########" />
      <Input label="Amount (₹)" value={amount} onChangeText={setAmount} keyboardType="numeric" placeholder="1500" />
      <Input label="Note" value={note} onChangeText={setNote} placeholder="Optional note" />
      <Button onPress={onSubmit} variant="primary" fullWidth disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Offer'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F8FAFC' },
  title: { fontSize: 24, fontWeight: '800', color: '#111827', marginBottom: 12 },
});
