import React, { useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Button, Input } from '../../src/ui';
import { notifyBookingCreated } from '../../src/utils/notifications';
import { sendSmsToExternalId, isSmsEnabled } from '../../src/services/sms';
import { useColors } from '../../src/styles/ThemeProvider';
import * as Haptics from 'expo-haptics';
import { supaBooking, type BookingPayload } from '../../src/services/api';
import { useUser } from '@clerk/clerk-expo';

// A minimal, robust redesign of the booking screen using plain React Native layout primitives.
// Goals:
// - No overlapping content
// - Predictable spacing and scroll behavior
// - Keyboard-safe inputs
// - Simple, accessible stepper

const STEP_LABELS = ['Route', 'Cargo', 'Review'] as const;

type Step = 0 | 1 | 2;

type BookingForm = {
  pickupAddress: string;
  deliveryAddress: string;
  cargoType: string;
  weight: string;
  urgency: string;
  specialInstructions: string;
  contactPhone: string;
};

export default function BookingScreen() {
  const colors = useColors();
  const { user } = useUser();

  const [step, setStep] = useState<Step>(0);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<BookingForm>({
    pickupAddress: '',
    deliveryAddress: '',
    cargoType: '',
    weight: '',
    urgency: '',
    specialInstructions: '',
    contactPhone: '',
  });

  const styles = useMemo(() => makeStyles(colors), [colors]);

  const update = (k: keyof BookingForm, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const next = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (step === 0) {
      if (!form.pickupAddress || !form.deliveryAddress) {
        Alert.alert('Missing info', 'Please fill pickup and delivery addresses.');
        return;
      }
      setStep(1);
    } else if (step === 1) {
      if (!form.cargoType || !form.weight || !form.urgency || !form.contactPhone) {
        Alert.alert('Missing info', 'Cargo type, weight, urgency and contact phone are required.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      submit();
    }
  };

  const back = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setStep((s) => (s === 0 ? 0 : ((s - 1) as Step)));
  };

  const submit = async () => {
    setSubmitting(true);
    try {
      const payload: BookingPayload = {
        pickupAddress: form.pickupAddress,
        deliveryAddress: form.deliveryAddress,
        cargoType: form.cargoType,
        weight: form.weight,
        dimensions: '',
        urgency: form.urgency,
        specialInstructions: form.specialInstructions,
        contactPhone: form.contactPhone,
        pickupDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        userId: user?.id,
      };

      const result = await supaBooking(payload);
      if (result?.success) {
        try {
          await notifyBookingCreated(result.trackingNumber);
        } catch {}
        // Attempt to send an SMS via OneSignal (server-side) if the user is identified
        try {
          if (isSmsEnabled() && user?.id && result?.trackingNumber) {
            await sendSmsToExternalId(
              user.id,
              `Your TAPANGO booking was created. Tracking #${result.trackingNumber}`
            );
          }
        } catch {}
        Alert.alert('Booked!', `Tracking Number: ${result.trackingNumber}`, [
          { text: 'View Orders', onPress: () => router.push('/(tabs)/orders') },
          { text: 'Done' },
        ]);
        setStep(0);
        setForm({
          pickupAddress: '',
          deliveryAddress: '',
          cargoType: '',
          weight: '',
          urgency: '',
          specialInstructions: '',
          contactPhone: '',
        });
      } else {
        throw new Error(result?.message || 'Failed to book');
      }
    } catch (e: any) {
      Alert.alert('Booking failed', e?.message ?? 'Unknown error');
    } finally {
      setSubmitting(false);
    }
  };

  const Stepper = () => (
    <View style={styles.stepper}>
      {STEP_LABELS.map((label, i) => {
        const active = i === step;
        return (
          <View key={label} style={[styles.step, active && styles.stepActive]}>
            <Text style={[styles.stepText, active && styles.stepTextActive]}>{label}</Text>
          </View>
        );
      })}
    </View>
  );

  const RouteForm = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Route</Text>
      <Input
        label='Pickup address'
        value={form.pickupAddress}
        onChangeText={(v) => update('pickupAddress', v)}
        placeholder='Street, City'
      />
      <Input
        label='Delivery address'
        value={form.deliveryAddress}
        onChangeText={(v) => update('deliveryAddress', v)}
        placeholder='Street, City'
      />
    </View>
  );

  const CargoForm = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Cargo</Text>
      <Input
        label='Cargo type'
        value={form.cargoType}
        onChangeText={(v) => update('cargoType', v)}
        placeholder='e.g., electronics'
      />
      <Input
        label='Weight (kg)'
        value={form.weight}
        onChangeText={(v) => update('weight', v)}
        keyboardType='numeric'
        placeholder='0.0'
      />
      <Input
        label='Urgency'
        value={form.urgency}
        onChangeText={(v) => update('urgency', v)}
        placeholder='standard / express / urgent'
      />
      <Input
        label='Contact phone'
        value={form.contactPhone}
        onChangeText={(v) => update('contactPhone', v)}
        keyboardType='phone-pad'
        placeholder='+91 9xxxx xxxxx'
      />
      <Input
        label='Special instructions'
        value={form.specialInstructions}
        onChangeText={(v) => update('specialInstructions', v)}
        placeholder='Optional notes'
        multiline
        numberOfLines={3}
      />
    </View>
  );

  const Review = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Review</Text>
      {(
        [
          ['Pickup', form.pickupAddress],
          ['Delivery', form.deliveryAddress],
          ['Cargo', form.cargoType],
          ['Weight', `${form.weight} kg`],
          ['Urgency', form.urgency],
          ['Phone', form.contactPhone],
          ['Notes', form.specialInstructions || '—'],
        ] as const
      ).map(([k, v]) => (
        <View key={k} style={styles.row}>
          <Text style={styles.rowLabel}>{k}</Text>
          <Text style={styles.rowValue}>{v}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container]} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps='handled'>
          <Text style={styles.title}>Book Shipment</Text>
          <Stepper />
          {step === 0 && <RouteForm />}
          {step === 1 && <CargoForm />}
          {step === 2 && <Review />}
        </ScrollView>
        <View style={styles.footer}>
          <Button
            variant='secondary'
            onPress={back}
            disabled={step === 0}
            style={{ marginRight: 8 }}
          >
            Back
          </Button>
          <Button variant='primary' onPress={next} loading={submitting} flex={1}>
            {step === 2 ? 'Confirm Booking' : 'Continue'}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function makeStyles(colors: any) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    scroll: { padding: 16 },
    title: { fontSize: 24, fontWeight: '800', color: colors.text, marginBottom: 12 },
    stepper: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 4,
      marginBottom: 16,
    },
    step: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
      borderRadius: 8,
    },
    stepActive: { backgroundColor: colors.primary + '22' },
    stepText: { color: colors.textSecondary, fontWeight: '600' },
    stepTextActive: { color: colors.primary, fontWeight: '800' },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 8 },
    row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
    rowLabel: { color: colors.textSecondary },
    rowValue: { color: colors.text, fontWeight: '600', marginLeft: 8, flex: 1, textAlign: 'right' },
    footer: {
      flexDirection: 'row',
      padding: 12,
      backgroundColor: colors.surface,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
  });
}
