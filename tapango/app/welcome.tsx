import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../src/components/ui/Button';
import { useRouter } from 'expo-router';
import { colors } from '../src/styles/colors';

/**
 * Welcome screen - Entry point after onboarding completion
 * 
 * This screen displays the app welcome and allows users to:
 * - Sign in to existing account
 * - Create new account
 * - Continue as guest
 */
export default function WelcomeScreen() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/(auth)/sign-in');
  };

  const handleSignUp = () => {
    router.push('/(auth)/sign-up');
  };

  const handleGuestMode = () => {
    router.push('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TAPANGO</Text>
        <Text style={styles.subtitle}>Cargo Logistics Platform</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Connect with professional drivers for fast, reliable cargo delivery
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            title="Sign In"
            variant="primary"
            onPress={handleSignIn}
            style={styles.button}
          />

          <Button
            title="Create Account"
            variant="secondary"
            onPress={handleSignUp}
            style={styles.button}
          />

          <Button
            title="Continue as Guest"
            variant="ghost"
            onPress={handleGuestMode}
            style={styles.button}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Built with React Native & Expo SDK 53
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary.lightBlue,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary.blue,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.neutral.mediumGray,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.neutral.darkGray,
    marginBottom: 48,
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    marginVertical: 0, // Overridden by gap
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  footerText: {
    fontSize: 12,
    color: colors.neutral.mediumGray,
  },
});
