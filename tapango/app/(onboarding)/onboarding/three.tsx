import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { StorageService } from '../../../src/utils/storage';
import LottieView from 'lottie-react-native';
import { AppIcon } from '../../../src/ui';

const TrackingAnimation = require('../../../assets/lottie/real_time_tracking.json');

export default function OnboardingStep3() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const back = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace('/onboarding/two' as any);
  };

  const finish = async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await StorageService.setOnboardingCompleted(true);
    router.replace('/(auth)/role');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={back} style={styles.backBtn} accessibilityRole='button'>
          <AppIcon name='chevron-back' size={24} color='#fff' />
        </TouchableOpacity>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.body}>
        <View style={styles.card}>
          <LottieView
            source={TrackingAnimation}
            autoPlay
            loop
            style={{ width: 180, height: 180 }}
          />
        </View>

        <Text style={styles.overline}>Real-Time Monitoring</Text>
        <Text style={styles.title}>Live tracking, 99% on-time</Text>
        <Text style={styles.sub}>
          GPS updates, push alerts, direct driver chat – all in one place.
        </Text>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
        </View>
        <TouchableOpacity style={styles.cta} onPress={finish} accessibilityRole='button'>
          <Text style={styles.ctaText}>Get started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#001A36' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  backBtn: { padding: 8 },
  body: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
  overline: { color: 'rgba(255,255,255,0.8)', fontSize: 16, marginTop: 24 },
  title: { color: '#fff', fontSize: 28, fontWeight: '800', marginTop: 8 },
  sub: { color: 'rgba(255,255,255,0.9)', fontSize: 16, lineHeight: 24, marginTop: 12 },
  footer: { paddingHorizontal: 24 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    alignSelf: 'center',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  dotActive: {
    backgroundColor: '#ffffff',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  cta: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    alignItems: 'center',
    paddingVertical: 16,
  },
  ctaText: { color: '#001A36', fontSize: 17, fontWeight: '700' },
});
