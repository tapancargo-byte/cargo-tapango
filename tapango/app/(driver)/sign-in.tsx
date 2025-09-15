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

export default function DriverSignInScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const fade = React.useRef(new Animated.Value(0)).current;

  // Guard: if already authenticated, don't show auth UI
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

  const onSignIn = async () => {
    if (loading) return;
    setErrors({});
    if (!email) return setErrors((e) => ({ ...e, email: 'Email is required' }));
    if (!password) return setErrors((e) => ({ ...e, password: 'Password is required' }));
    setLoading(true);
    try {
      const client = supabase;
      if (!client) {
        setErrors((e) => ({ ...e, general: 'Supabase is not configured' }));
        return;
      }
      const { error } = await client.auth.signInWithPassword({ email: email.trim(), password });
      if (error) {
        setErrors((e) => ({ ...e, general: error.message }));
      } else {
        router.replace('/(driver)' as any);
      }
    } catch (e: any) {
      setErrors((ee) => ({ ...ee, general: e?.message || 'Failed to sign in' }));
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
          <Text style={styles.headerTitle}>Sign In</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Form */}
        <Animated.View style={[styles.formContainer, { opacity: fade }]}>
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Feather name='log-in' size={32} color='white' />
            </View>
          </View>

          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to your TAPANGO account to continue.</Text>

          <AuthInput
            label='Email Address'
            icon='mail'
            value={email}
            onChangeText={(t) => {
              setEmail(t);
              if (errors.email) setErrors(({ email, ...rest }) => rest);
            }}
            error={errors.email}
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
            autoComplete='email'
            autoCorrect={false}
          />

          <AuthInput
            label='Password'
            icon='lock-closed'
            value={password}
            onChangeText={(t) => {
              setPassword(t);
              if (errors.password) setErrors(({ password, ...rest }) => rest);
            }}
            error={errors.password}
            isPassword
            textContentType='password'
            autoComplete='password'
            returnKeyType='go'
            onSubmitEditing={onSignIn}
            autoCorrect={false}
          />

          {errors.general ? (
            <View style={styles.generalErrorContainer}>
              <Text style={styles.errorText}>{errors.general}</Text>
            </View>
          ) : null}

          <AuthButton
            title={loading ? 'Signing in...' : 'Sign in'}
            onPress={onSignIn}
            loading={loading}
          />

          <View style={styles.linksRow}>
            <Text style={styles.link} onPress={() => router.push('/(driver)/forgot-password')}>
              Forgot your password?
            </Text>
          </View>

          <View style={styles.linksRow}>
            <Text style={styles.link} onPress={() => router.push('/(driver)/sign-up')}>
              Don't have an account? Sign up
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
