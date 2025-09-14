import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { AuthInput, AuthButton } from '../../src/ui/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../src/styles/colors';
import { spacing, borderRadius } from '../../src/styles/spacing';
import { textStyles, typography } from '../../src/styles/typography';
import { supabase } from '../../src/services/supabaseClient';

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

  const onSignUp = async () => {
    if (loading) return;
    setErrors({});
    if (!email) return setErrors((e) => ({ ...e, email: 'Email is required' }));
    if (!password) return setErrors((e) => ({ ...e, password: 'Password is required' }));
    if (!supabase) return setErrors((e) => ({ ...e, general: 'Supabase not configured' }));
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { data: { role: 'driver' } },
      });
      if (error) {
        setErrors((e) => ({ ...e, general: error.message }));
      } else {
        if (data.session) router.replace('/(driver)');
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
      <View style={[styles.content, { paddingTop: Math.max(insets.top, 12) }]}>
        <Text style={styles.headerTitle}>Create Driver Account</Text>
        <Text style={styles.subtitle}>Join as a driver to access jobs, bidding and payouts.</Text>

        <AuthInput
          label='Email Address'
          icon='mail'
          value={email}
          onChangeText={(t) => setEmail(t)}
          error={errors.email}
          autoCapitalize='none'
          keyboardType='email-address'
        />
        <AuthInput
          label='Password'
          icon='lock-closed'
          value={password}
          onChangeText={(t) => setPassword(t)}
          error={errors.password}
          isPassword
          textContentType='newPassword'
        />

        {errors.general ? (
          <View style={styles.generalErrorContainer}>
            <Text style={styles.errorText}>{errors.general}</Text>
          </View>
        ) : null}

        <AuthButton
          title={loading ? 'Creating account…' : 'Create account'}
          onPress={onSignUp}
          loading={loading}
        />

        <View style={{ alignItems: 'center', marginTop: spacing.lg }}>
          <Text style={styles.link} onPress={() => router.push('/(driver)/sign-in')}>
            Already have an account? Sign in
          </Text>
        </View>
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
