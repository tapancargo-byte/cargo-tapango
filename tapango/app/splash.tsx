import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useAuth } from '@clerk/clerk-expo';
import LottieView from 'lottie-react-native';

// Lottie animation for splash
const SplashAnimation = require('../assets/lottie/splash.json');

/**
 * In-app splash screen used as a transition.
 * Shows branded Lottie for 5 seconds, then:
 *  - If user is not signed in => onboarding
 *  - If user is signed in => tabs
 */
export default function SplashRoute() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const navigated = useRef(false);

  useEffect(() => {
    // Hide native splash as soon as this route mounts
    SplashScreen.hideAsync().catch(() => {});

    const DURATION_MS = 5000; // 5 seconds
    let t = setTimeout(() => {
      if (!navigated.current && isLoaded) {
        navigated.current = true;
        if (!isSignedIn) router.replace('/onboarding');
        else router.replace('/(tabs)');
      }
    }, DURATION_MS);

    return () => clearTimeout(t);
  }, [isLoaded, isSignedIn, router]);

  return (
    <View style={styles.container}>
      <View style={styles.content} accessibilityLabel="TAPANGO is loading">
        <LottieView
          source={SplashAnimation}
          autoPlay
          loop
          style={styles.lottie}
          resizeMode="contain"
          speed={0.9}
        />
        <View style={styles.brandWrap}>
          <Text style={styles.brand}>TAPANGO</Text>
          <Text style={styles.tag}>Northeast India's Cargo Network</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001A36',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    width: 260,
    height: 260,
  },
  brandWrap: {
    marginTop: 12,
    alignItems: 'center',
  },
  brand: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
  },
  tag: {
    marginTop: 6,
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
  },
});

