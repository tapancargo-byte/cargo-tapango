import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Screen, Button, Input, Title } from '../../src/ui';
import { useColors } from '../../src/styles/ThemeProvider';
import { submitDriverOffer } from '../../src/services/driverOffers';
import { useLocalSearchParams } from 'expo-router';
import { useAppToast } from '../../src/ui/tg/ToastHost';
import { OfflineBanner } from '../../src/components/OfflineBanner';

export default function DriverBid() {
  const colors = useColors();
  const params = useLocalSearchParams();
  const toast = useAppToast();
  const [trackingId, setTrackingId] = useState('');
  const [amount, setAmount] = useState('1500');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const t = String((params as any)?.trackingId || '').trim();
    if (t) setTrackingId(t);
  }, [params]);

  const onSubmit = async () => {
    setError(null);
    const amt = Number(amount);
    if (!trackingId.trim()) return setError('Tracking ID is required');
    if (!amt || amt <= 0) return setError('Enter a valid amount');
    setLoading(true);
    try {
      const { queued, id } = await submitDriverOffer({ trackingId, amountINR: amt, note });
      if (queued) {
        toast.show('Offer queued', 'Will sync when online');
      } else {
        toast.show('Offer submitted', `Offer ID: ${id ?? 'N/A'}`);
      }
    } catch (e) {
      setError('Failed to submit offer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scroll>
      <OfflineBanner />
      <Title>Place an Offer</Title>
      <Input
        label='Tracking ID'
        value={trackingId}
        onChangeText={setTrackingId}
        placeholder='TPG#########'
      />
      <Input
        label='Amount (₹)'
        value={amount}
        onChangeText={setAmount}
        keyboardType='numeric'
        placeholder='1500'
      />
      <Input
        label='Note'
        value={note}
        onChangeText={setNote}
        placeholder='Optional note'
        multiline
        numberOfLines={3}
      />
      {error ? (
        <Title fontSize={14} color={colors.danger}>
          {error}
        </Title>
      ) : null}
      <Button
        onPress={onSubmit}
        variant='primary'
        fullWidth
        disabled={loading}
        loading={loading}
        accessibilityHint='Submits your offer; queues if offline.'
      >
        Submit Offer
      </Button>
    </Screen>
  );
}
