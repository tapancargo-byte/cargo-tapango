import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { AuthInput, AuthButton } from '../../src/ui/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../src/styles/colors';
import { spacing, borderRadius, shadows } from '../../src/styles/spacing';
import { textStyles, typography } from '../../src/styles/typography';
import { supabase } from '../../src/services/supabaseClient';

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

  React.useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, [fade]);

  const onSignIn = async () => {
    if (loading) return;
    setErrors({});
    if (!email) return setErrors((e) => ({ ...e, email: 'Email is required' }));
    if (!password) return setErrors((e) => ({ ...e, password: 'Password is required' }));
    setLoading(true);
    try {
      if (!supabase) throw new Error('Supabase not configured');
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) {
        setErrors((e) => ({ ...e, general: error.message }));
      } else {
        router.replace('/(driver)');
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
      <View style={[styles.content, { paddingTop: Math.max(insets.top, 12) }]}>
        <Animated.View style={{ opacity: fade }}>
          <Text style={styles.headerTitle}>Driver Sign In</Text>
          <Text style={styles.subtitle}>Sign in to access jobs, bidding, wallet and profile.</Text>

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
          />

          {errors.general ? (
            <View style={styles.generalErrorContainer}>
              <Text style={styles.errorText}>{errors.general}</Text>
            </View>
          ) : null}

          <AuthButton
            title={loading ? 'Signing in…' : 'Sign in'}
            onPress={onSignIn}
            loading={loading}
          />

          <View style={{ alignItems: 'center', marginTop: spacing.lg }}>
            <Text style={styles.link} onPress={() => router.push('/(driver)/forgot-password')}>
              Forgot your password?
            </Text>
          </View>

          <View style={{ alignItems: 'center', marginTop: spacing.lg }}>
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
  headerTitle: {
    ...textStyles.heading,
    fontSize: typography.fontSize.xl,
    color: 'white',
    fontWeight: typography.fontWeight.semibold,
  },
  subtitle: {
    ...textStyles.body,
    fontSize: typography.fontSize.lg,
    color: 'rgba(255,255,255,0.8)',
    marginTop: spacing.xs,
    marginBottom: spacing['2xl'],
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
  link: { ...textStyles.body, color: 'rgba(255,255,255,0.8)', textDecorationLine: 'underline' },
});
