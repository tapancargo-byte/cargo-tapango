import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSignIn } from '@clerk/clerk-expo';
import { AuthInput, AuthButton } from '../../src/ui/auth';
import { colors } from '../../src/styles/colors';
import { spacing, borderRadius, shadows } from '../../src/styles/spacing';
import { textStyles, typography } from '../../src/styles/typography';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { signIn, setActive, isLoaded } = useSignIn();

  const [email, setEmail] = React.useState('');
  const [code, setCode] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [step, setStep] = React.useState<'request' | 'code' | 'password' | 'success'>('request');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string>('');

  // Stable animation instance to avoid disappearing content on re-render
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleSendEmailCode = async () => {
    if (!isLoaded || isLoading) return;

    if (!email) {
      setError('Email is required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email.trim(),
      } as any);
      setStep('code');
    } catch (err: any) {
      const message = err?.errors?.[0]?.message || 'Failed to start password reset';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!isLoaded || isLoading) return;
    if (!code) {
      setError('Verification code is required');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code: code.trim(),
      } as any);

      if (result.status === 'needs_new_password') {
        setStep('password');
      } else if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        setStep('success');
        setTimeout(() => router.replace('/(tabs)'), 1200);
      } else {
        setError('Additional steps required to reset your password.');
      }
    } catch (err: any) {
      const message = err?.errors?.[0]?.message || 'Invalid or expired code';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitNewPassword = async () => {
    if (!isLoaded || isLoading) return;
    if (!newPassword || newPassword.length < 8) {
      setError('Please enter a new password of at least 8 characters');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const result = await signIn.resetPassword({ password: newPassword } as any);
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        setStep('success');
        setTimeout(() => router.replace('/(tabs)'), 1200);
      } else {
        setError('Additional steps required to complete password reset.');
      }
    } catch (err: any) {
      const message = err?.errors?.[0]?.message || 'Failed to set new password';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.backgroundContainer}>
          <View style={[styles.content, { paddingTop: insets.top }]}>
            <Animated.View style={[styles.successContainer, { opacity: fadeAnim }]}>
              <View style={styles.successIconContainer}>
                <Ionicons name="checkmark-circle" size={80} color={colors.status.success} />
              </View>
              <Text style={styles.successTitle}>Password updated</Text>
              <Text style={styles.successMessage}>
                You will be redirected shortly...
              </Text>
            </Animated.View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />
      
      <View style={styles.backgroundContainer}>
        <View style={[styles.content, { paddingTop: insets.top }]}>
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Reset Password</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Form */}
          <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
            <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <Ionicons name="lock-closed" size={32} color="white" />
              </View>
            </View>

            {step === 'request' && (
              <>
                <Text style={styles.title}>Forgot your password?</Text>
                <Text style={styles.subtitle}>
                  Enter your email address and we'll send you a verification code.
                </Text>

                <AuthInput
                  label="Email Address"
                  icon="mail"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (error) setError('');
                  }}
                  error={error}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCorrect={false}
                  returnKeyType="send"
                />

                <AuthButton
                  title={isLoading ? 'Sending...' : 'Send Code'}
                  onPress={handleSendEmailCode}
                  loading={isLoading}
                  disabled={isLoading}
                  icon="paper-plane"
                />
              </>
            )}

            {step === 'code' && (
              <>
                <Text style={styles.title}>Check your email</Text>
                <Text style={styles.subtitle}>
                  Enter the 6-digit code sent to {email}
                </Text>

                <AuthInput
                  label="Verification Code"
                  icon="key"
                  value={code}
                  onChangeText={(t) => {
                    setCode(t);
                    if (error) setError('');
                  }}
                  keyboardType="number-pad"
                  maxLength={6}
                  autoCorrect={false}
                  returnKeyType="go"
                  error={error}
                />

                <AuthButton
                  title={isLoading ? 'Verifying...' : 'Verify Code'}
                  onPress={handleVerifyCode}
                  loading={isLoading}
                  disabled={isLoading}
                  icon="checkmark-circle"
                />
              </>
            )}

            {step === 'password' && (
              <>
                <Text style={styles.title}>Set a new password</Text>
                <Text style={styles.subtitle}>
                  Choose a strong password for your account.
                </Text>

                <AuthInput
                  label="New Password"
                  icon="lock-closed"
                  value={newPassword}
                  onChangeText={(t) => {
                    setNewPassword(t);
                    if (error) setError('');
                  }}
                  error={error}
                  isPassword
                  autoCorrect={false}
                  returnKeyType="go"
                />

                <AuthButton
                  title={isLoading ? 'Updating...' : 'Update Password'}
                  onPress={handleSubmitNewPassword}
                  loading={isLoading}
                  disabled={isLoading}
                  icon="refresh"
                />
              </>
            )}

            <TouchableOpacity
              style={styles.backToSignInContainer}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <Text style={styles.backToSignInText}>
                Remember your password? Sign in
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001A36',
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#001A36',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing['3xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    ...textStyles.heading,
    fontSize: typography.fontSize.xl,
    color: 'white',
    fontWeight: typography.fontWeight.semibold,
  },
  placeholder: {
    width: 44,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: spacing['4xl'],
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary.blue,
    justifyContent: 'center',
    alignItems: 'center',
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 8px 16px rgba(30, 64, 175, 0.30)' }
      : { ...shadows.lg, shadowColor: 'rgba(30, 64, 175, 0.3)' } as any),
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
  backToSignInContainer: {
    alignItems: 'center',
    marginTop: spacing['3xl'],
    paddingVertical: spacing.lg,
  },
  backToSignInText: {
    ...textStyles.body,
    color: 'rgba(255, 255, 255, 0.7)',
    textDecorationLine: 'underline',
  },
  footer: {
    justifyContent: 'flex-end',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  successIconContainer: {
    marginBottom: spacing['3xl'],
  },
  successTitle: {
    ...textStyles.title,
    fontSize: typography.fontSize['3xl'],
    color: 'white',
    textAlign: 'center',
    marginBottom: spacing.lg,
    fontWeight: typography.fontWeight.bold,
  },
  successMessage: {
    ...textStyles.bodyLarge,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing['2xl'],
  },
  autoReturnText: {
    ...textStyles.caption,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
