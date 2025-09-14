import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnimatedSquareCard from '../../../components/AnimatedSquareCard';
import Pagination from '../../../components/Pagination';
import * as Haptics from 'expo-haptics';
import LottieView from 'lottie-react-native';

const WelcomeAnimation = require('../../../assets/lottie/welcome.json');

export default function OnboardingStep1() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const goNext = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace('/onboarding/two' as any);
  };

  const skip = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace('/onboarding/three' as any);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={{ width: 44 }} />
        <TouchableOpacity accessibilityRole='button' onPress={skip} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <AnimatedSquareCard>
          <LottieView source={WelcomeAnimation} autoPlay loop style={{ width: 180, height: 180 }} />
        </AnimatedSquareCard>

        <Text style={styles.overline}>Northeast India's premier cargo network</Text>
        <Text style={styles.title}>Welcome to TAPANGO</Text>
        <Text style={styles.sub}>
          Connect Imphal ↔ Delhi with trusted drivers and real‑time tracking.
        </Text>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
        <Pagination total={3} index={0} />
        <TouchableOpacity style={styles.cta} onPress={goNext} accessibilityRole='button'>
          <Text style={styles.ctaText}>Next</Text>
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
  skipBtn: { padding: 8 },
  skipText: { color: 'rgba(255,255,255,0.9)', fontSize: 16, fontWeight: '600' },
  body: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
  overline: { color: 'rgba(255,255,255,0.8)', fontSize: 16, marginTop: 24 },
  title: { color: '#fff', fontSize: 28, fontWeight: '800', marginTop: 8 },
  sub: { color: 'rgba(255,255,255,0.9)', fontSize: 16, lineHeight: 24, marginTop: 12 },
  footer: { paddingHorizontal: 24 },
  cta: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    alignItems: 'center',
    paddingVertical: 16,
  },
  ctaText: { color: '#001A36', fontSize: 17, fontWeight: '700' },
});
