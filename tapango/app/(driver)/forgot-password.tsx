import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { AuthInput, AuthButton } from '../../src/ui/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../src/styles/colors';
import { spacing, borderRadius, shadows } from '../../src/styles/spacing';
import { textStyles, typography } from '../../src/styles/typography';
import { supabase } from '../../src/services/supabaseClient';
import { Feather } from '@expo/vector-icons';

export default function DriverForgotPasswordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const fade = React.useRef(new Animated.Value(0)).current;

  // Guard: redirect if already signed in
  React.useEffect(() => {
    let unsub: (() => void) | undefined;
    (async () => {
      try {
        const client = supabase;
        if (!client) return;
        const { data } = await client.auth.getSession();
        if (data?.session) {
          router.replace('/(driver)/index' as any);
          return;
        }
        const { data: sub } = client.auth.onAuthStateChange((_e, session) => {
          if (session) router.replace('/(driver)/index' as any);
        });
        unsub = () => sub.subscription.unsubscribe();
      } catch {}
    })();
    return () => {
      try {
        unsub?.();
      } catch {}
    };
  }, [router]);

  React.useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, [fade]);

  const onReset = async () => {
    setError(null);
    if (!email) return setError('Email is required');
    setLoading(true);
    try {
      const client = supabase;
      if (!client) {
        setError('Supabase is not configured');
        return;
      }
      const { error } = await client.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: 'tapango://reset-password',
      });
      if (error) setError(error.message);
      else router.back();
    } catch (e: any) {
      setError(e?.message || 'Failed to request reset');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style='light' />
      <View style={[styles.content, { paddingTop: Math.max(insets.top, 12) }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.placeholder} />
          <Text style={styles.headerTitle}>Reset Password</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Form */}
        <Animated.View style={[styles.formContainer, { opacity: fade }]}>
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Feather name='lock' size={32} color='white' />
            </View>
          </View>

          <Text style={styles.title}>Forgot your password?</Text>
          <Text style={styles.subtitle}>
            Enter your email and we'll send you a link to reset your password.
          </Text>

          <AuthInput label='Email Address' icon='mail' value={email} onChangeText={setEmail} />

          {error ? (
            <View style={styles.generalErrorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <AuthButton
            title={loading ? 'Sending...' : 'Send reset email'}
            onPress={onReset}
            loading={loading}
          />

          <View style={styles.linksRow}>
            <Text style={styles.link} onPress={() => router.back()}>
              Back to sign in
            </Text>
          </View>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#001A36' },
  content: { flex: 1, paddingHorizontal: spacing['3xl'] },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  headerTitle: {
    ...textStyles.heading,
    fontSize: typography.fontSize.xl,
    color: 'white',
    fontWeight: typography.fontWeight.semibold,
  },
  placeholder: { width: 44 },
  formContainer: { flex: 1, justifyContent: 'center', paddingVertical: spacing['4xl'] },
  iconContainer: { alignItems: 'center', marginBottom: spacing['3xl'] },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary.blue,
    justifyContent: 'center',
    alignItems: 'center',
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 8px 16px rgba(30, 64, 175, 0.30)' }
      : ({ ...shadows.lg, shadowColor: 'rgba(30, 64, 175, 0.3)' } as any)),
  },
  title: {
    ...textStyles.title,
    fontSize: typography.fontSize['3xl'],
    color: 'white',
    textAlign: 'center',
    marginBottom: spacing.lg,
    fontWeight: typography.fontWeight.bold,
  },
  subtitle: {
    ...textStyles.body,
    fontSize: typography.fontSize.lg,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing['4xl'],
    paddingHorizontal: spacing.md,
  },
  generalErrorContainer: {
    backgroundColor: 'rgba(254,226,226,0.9)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.status.error,
  },
  errorText: { ...textStyles.body, color: colors.status.error },
  link: { ...textStyles.body, color: 'rgba(255, 255, 255, 0.7)', textDecorationLine: 'underline' },
  linksRow: { alignItems: 'center', marginTop: spacing.lg },
});
