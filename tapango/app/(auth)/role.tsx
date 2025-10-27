import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { AppIcon, Card } from '../../src/ui';
import { StorageService } from '../../src/utils/storage';

export default function RoleSelectionScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);

  const selectRole = async (role: 'customer' | 'driver') => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
      await StorageService.setSelectedRole(role);
    } catch (e) {
      // non-blocking
    } finally {
      // Route based on role
      if (role === 'customer') router.replace('/(auth)/sign-in');
      else router.replace('/(driver)/sign-in');
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.title}>Choose your role</Text>
        <Text style={styles.subtitle}>Pick how you want to use TAPANGO</Text>
      </View>

      <View style={styles.cards}>
        <TouchableOpacity
          testID='role-customer'
          accessibilityRole='button'
          onPress={() => selectRole('customer')}
          activeOpacity={0.9}
          disabled={submitting}
        >
          <Card style={styles.card}>
            <View style={styles.iconWrap}>
              <AppIcon name='cart' size={28} color='#1E40AF' />
            </View>
            <Text style={styles.cardTitle}>Customer</Text>
            <Text style={styles.cardText}>Shipments, quotes, tracking, delivery</Text>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          testID='role-driver'
          accessibilityRole='button'
          onPress={() => selectRole('driver')}
          activeOpacity={0.9}
          disabled={submitting}
        >
          <Card style={styles.card}>
            <View style={styles.iconWrapDriver}>
              <AppIcon name='truck' size={28} color='#065F46' />
            </View>
            <Text style={styles.cardTitle}>Driver</Text>
            <Text style={styles.cardText}>Jobs, bidding, KYC, wallet</Text>
          </Card>
        </TouchableOpacity>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Text style={styles.footnote}>
          Customer uses Clerk sign-in; Driver uses Supabase sign-in.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#001A36' },
  header: { alignItems: 'center' },
  title: {
    marginTop: 8,
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 6,
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
  },
  cards: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    gap: 16,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 6px 16px rgba(30,64,175,0.18)' }
      : ({ shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 12, elevation: 4 } as any)),
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(30,64,175,0.12)',
  },
  iconWrapDriver: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(6,95,70,0.12)',
  },
  cardTitle: { marginTop: 12, fontSize: 18, fontWeight: '700', color: '#0F172A' },
  cardText: { marginTop: 4, fontSize: 14, color: '#475569' },
  footer: { alignItems: 'center' },
  footnote: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
});
