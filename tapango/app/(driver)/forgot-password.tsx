import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { AuthInput, AuthButton } from '../../src/ui/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../src/styles/colors';
import { spacing, borderRadius } from '../../src/styles/spacing';
import { textStyles, typography } from '../../src/styles/typography';
import { supabase } from '../../src/services/supabaseClient';

export default function DriverForgotPasswordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onReset = async () => {
    setError(null);
    if (!email) return setError('Email is required');
    if (!supabase) return setError('Supabase not configured');
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
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
      <View style={[styles.content, { paddingTop: Math.max(insets.top, 12) }]}>
        <Text style={styles.headerTitle}>Reset password</Text>
        <Text style={styles.subtitle}>We'll send a link to reset your password.</Text>
        <AuthInput label='Email Address' icon='mail' value={email} onChangeText={setEmail} />
        {error ? (
          <View style={styles.generalErrorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
        <AuthButton
          title={loading ? 'Sending…' : 'Send reset email'}
          onPress={onReset}
          loading={loading}
        />
        <View style={{ alignItems: 'center', marginTop: spacing.lg }}>
          <Text style={styles.link} onPress={() => router.back()}>
            Back
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
