import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Animated,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { AuthInput, AuthButton } from '../../src/ui/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../src/styles/colors';
import { spacing, borderRadius, shadows } from '../../src/styles/spacing';
import { textStyles, typography } from '../../src/styles/typography';
import { supabase } from '../../src/services/supabaseClient';
import { Feather } from '@expo/vector-icons';

export default function DriverSignUpScreen() {
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
  const slide = React.useRef(new Animated.Value(50)).current;

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
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(slide, { toValue: 0, tension: 40, friction: 8, useNativeDriver: true }),
    ]).start();
  }, [fade, slide]);

  const onSignUp = async () => {
    if (loading) return;
    setErrors({});
    if (!email) return setErrors((e) => ({ ...e, email: 'Email is required' }));
    if (!password) return setErrors((e) => ({ ...e, password: 'Password is required' }));
    if (password.length < 8)
      return setErrors((e) => ({ ...e, password: 'Password must be at least 8 characters' }));
    setLoading(true);
    try {
      const client = supabase;
      if (!client) {
        setErrors((e) => ({ ...e, general: 'Supabase is not configured' }));
        return;
      }
      const { data, error } = await client.auth.signUp({
        email: email.trim(),
        password,
        options: { data: { role: 'driver' } },
      });
      if (error) {
        setErrors((e) => ({ ...e, general: error.message }));
      } else {
        if (data.session) router.replace('/(driver)' as any);
        else Alert.alert('Check your email', 'We sent you a verification link to finish sign-up.');
      }
    } catch (e: any) {
      setErrors((ee) => ({ ...ee, general: e?.message || 'Failed to sign up' }));
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
          <Text style={styles.headerTitle}>Sign Up</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Form */}
        <Animated.View
          style={[styles.formContainer, { opacity: fade, transform: [{ translateY: slide }] }]}
        >
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Feather name='user-plus' size={32} color='white' />
            </View>
          </View>

          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>Join TAPANGO and start driving today.</Text>

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
            textContentType='newPassword'
            autoComplete='password-new'
            autoCorrect={false}
            placeholder='Minimum 8 characters'
          />

          {/* Password strength indicator */}
          <View style={styles.passwordStrengthContainer}>
            <Text style={styles.passwordStrengthTitle}>Password strength:</Text>
            <View style={styles.passwordStrengthBar}>
              <View
                style={[
                  styles.passwordStrengthFill,
                  {
                    width:
                      password.length >= 8
                        ? '100%'
                        : `${Math.min((password.length / 8) * 100, 100)}%`,
                  },
                  {
                    backgroundColor:
                      password.length >= 8
                        ? colors.status.success
                        : password.length >= 4
                          ? colors.status.warning
                          : colors.status.error,
                  },
                ]}
              />
            </View>
            <Text
              style={[
                styles.passwordStrengthText,
                {
                  color:
                    password.length >= 8
                      ? colors.status.success
                      : password.length >= 4
                        ? colors.status.warning
                        : colors.status.error,
                },
              ]}
            >
              {password.length >= 8 ? 'Strong' : password.length >= 4 ? 'Medium' : 'Weak'}
            </Text>
          </View>

          {errors.general ? (
            <View style={styles.generalErrorContainer}>
              <Text style={styles.errorText}>{errors.general}</Text>
            </View>
          ) : null}

          <AuthButton
            title={loading ? 'Creating account...' : 'Create account'}
            onPress={onSignUp}
            loading={loading}
          />

          <View style={styles.linksRow}>
            <Text style={styles.link} onPress={() => router.push('/(driver)/sign-in')}>
              Already have an account? Sign in
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
  formContainer: { flex: 1, justifyContent: 'center', paddingVertical: spacing['2xl'] },
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
  passwordStrengthContainer: {
    marginTop: -spacing.sm,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.xs,
  },
  passwordStrengthTitle: {
    ...textStyles.caption,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: spacing.xs,
  },
  passwordStrengthBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  passwordStrengthFill: { height: '100%', borderRadius: 2 },
  passwordStrengthText: {
    ...textStyles.caption,
    fontSize: 12,
    fontWeight: typography.fontWeight.medium,
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
