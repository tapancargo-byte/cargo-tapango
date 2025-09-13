import * as React from 'react'
import { Text, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Dimensions, Animated } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AuthInput, AuthButton } from '../../src/ui/auth'
import { colors } from '../../src/styles/colors'
import { spacing, borderRadius, shadows } from '../../src/styles/spacing'
import { textStyles, typography } from '../../src/styles/typography'

const { width, height } = Dimensions.get('window');

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()
  const insets = useSafeAreaInsets()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [errors, setErrors] = React.useState<{email?: string; password?: string; general?: string}>({})
  // Stabilize animated values across re-renders
  const fadeAnim = React.useRef(new Animated.Value(0)).current
  const slideAnim = React.useRef(new Animated.Value(50)).current

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start()
  }, [fadeAnim, slideAnim])

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded || isLoading) return
    setErrors({})

    if (!emailAddress) {
      setErrors((e) => ({ ...e, email: 'Email is required' }))
      return
    }
    if (!password) {
      setErrors((e) => ({ ...e, password: 'Password is required' }))
      return
    }
    if (password.length < 8) {
      setErrors((e) => ({ ...e, password: 'Password must be at least 8 characters' }))
      return
    }

    setIsLoading(true)

    try {
      await signUp.create({
        emailAddress: emailAddress.trim(),
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      setErrors((e) => ({ ...e, general: err?.errors?.[0]?.message || 'Sign-up failed. Please try again.' }))
    } finally {
      setIsLoading(false)
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded || isLoading) return
    setErrors({})

    if (!code) {
      setErrors((e) => ({ ...e, general: 'Verification code is required' }))
      return
    }

    setIsLoading(true)

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/(tabs)')
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
        setErrors((e) => ({ ...e, general: 'Additional steps required to complete verification.' }))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      setErrors((e) => ({ ...e, general: err?.errors?.[0]?.message || 'Verification failed. Please try again.' }))
    } finally {
      setIsLoading(false)
    }
  }

  if (pendingVerification) {
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
                onPress={() => setPendingVerification(false)}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Verify Account</Text>
              <View style={styles.placeholder} />
            </View>

            {/* Form */}
            <Animated.View style={[styles.formContainer, { 
              opacity: fadeAnim, 
              transform: [{ translateY: slideAnim }] 
            }]}>
              <View style={styles.iconContainer}>
                <View style={styles.iconCircle}>
                  <Ionicons name="mail" size={32} color="white" />
                </View>
              </View>

              <Text style={styles.title}>Check your email</Text>
              <Text style={styles.subtitle}>
                We sent a verification code to {emailAddress}. Enter it below to verify your account.
              </Text>

              <AuthInput
                label="Verification Code"
                icon="key"
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                maxLength={6}
                autoCorrect={false}
                placeholder="Enter 6-digit code"
                returnKeyType="go"
              />

              {errors.general && (
                <View style={styles.generalErrorContainer}>
                  <Ionicons name="warning" size={20} color={colors.status.error} />
                  <Text style={styles.errorText}>{errors.general}</Text>
                </View>
              )}

              <AuthButton
                title={isLoading ? 'Verifying...' : 'Verify Account'}
                onPress={onVerifyPress}
                loading={isLoading}
                disabled={isLoading}
                icon="checkmark-circle"
              />

              <TouchableOpacity style={styles.resendContainer}>
                <Text style={styles.resendText}>
                  Didn't receive the code? Resend
                </Text>
              </TouchableOpacity>
            </Animated.View>

            <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]} />
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />
      
      <View style={styles.backgroundContainer}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.content, { paddingTop: insets.top }]}>
            
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.placeholder} />
              <Text style={styles.headerTitle}>Sign Up</Text>
              <View style={styles.placeholder} />
            </View>

            {/* Form */}
            <Animated.View style={[styles.formContainer, { 
              opacity: fadeAnim, 
              transform: [{ translateY: slideAnim }] 
            }]}>
              <View style={styles.iconContainer}>
                <View style={styles.iconCircle}>
                  <Ionicons name="person-add" size={32} color="white" />
                </View>
              </View>

              <Text style={styles.title}>Create account</Text>
              <Text style={styles.subtitle}>
                Join TAPANGO and start shipping today. Create your account below.
              </Text>

              <AuthInput
                label="Email Address"
                icon="mail"
                value={emailAddress}
                onChangeText={(text) => {
                  setEmailAddress(text)
                  if (errors.email) {
                    const newErrors = { ...errors }
                    delete newErrors.email
                    setErrors(newErrors)
                  }
                }}
                error={errors.email}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                returnKeyType="next"
              />

              <AuthInput
                label="Password"
                icon="lock-closed"
                value={password}
                onChangeText={(text) => {
                  setPassword(text)
                  if (errors.password) {
                    const newErrors = { ...errors }
                    delete newErrors.password
                    setErrors(newErrors)
                  }
                }}
                error={errors.password}
                isPassword
                autoCorrect={false}
                placeholder="Minimum 8 characters"
                returnKeyType="go"
              />

              {/* Password Strength Indicator */}
              <View style={styles.passwordStrengthContainer}>
                <Text style={styles.passwordStrengthTitle}>Password strength:</Text>
                <View style={styles.passwordStrengthBar}>
                  <View style={[
                    styles.passwordStrengthFill,
                    { width: password.length >= 8 ? '100%' : `${Math.min((password.length / 8) * 100, 100)}%` },
                    { backgroundColor: password.length >= 8 ? colors.status.success : password.length >= 4 ? colors.status.warning : colors.status.error }
                  ]} />
                </View>
                <Text style={[styles.passwordStrengthText, {
                  color: password.length >= 8 ? colors.status.success : password.length >= 4 ? colors.status.warning : colors.status.error
                }]}>
                  {password.length >= 8 ? 'Strong' : password.length >= 4 ? 'Medium' : 'Weak'}
                </Text>
              </View>

              {errors.general && (
                <View style={styles.generalErrorContainer}>
                  <Ionicons name="warning" size={20} color={colors.status.error} />
                  <Text style={styles.errorText}>{errors.general}</Text>
                </View>
              )}

              <AuthButton
                title={isLoading ? 'Creating account...' : 'Create account'}
                onPress={onSignUpPress}
                loading={isLoading}
                disabled={isLoading}
                icon="person-add"
              />

              {/* Terms and Privacy */}
              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  By creating an account, you agree to our{' '}
                  <Text style={styles.termsLink}>Terms of Service</Text>
                  {' '}and{' '}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
              </View>
            </Animated.View>
          </View>

          <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
            <TouchableOpacity
              style={styles.signInContainer}
              onPress={() => router.push('/(auth)/sign-in')}
              activeOpacity={0.7}
            >
              <Text style={styles.signInText}>
                Already have an account? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
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
  scrollContent: {
    flexGrow: 1,
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
    paddingVertical: spacing['2xl'],
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
  passwordStrengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  passwordStrengthText: {
    ...textStyles.caption,
    fontSize: 12,
    fontWeight: typography.fontWeight.medium,
  },
  generalErrorContainer: {
    backgroundColor: 'rgba(254, 226, 226, 0.9)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.status.error,
    ...(Platform.OS === 'web' ? { boxShadow: '0px 1px 4px rgba(0,0,0,0.18)' } : { ...shadows.sm } as any),
  },
  errorText: {
    ...textStyles.body,
    color: colors.status.error,
    marginLeft: spacing.sm,
    flex: 1,
  },
  termsContainer: {
    marginTop: spacing['2xl'],
    paddingHorizontal: spacing.sm,
  },
  termsText: {
    ...textStyles.caption,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: typography.fontWeight.medium,
    textDecorationLine: 'underline',
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: spacing['3xl'],
    paddingVertical: spacing.lg,
  },
  resendText: {
    ...textStyles.body,
    color: 'rgba(255, 255, 255, 0.7)',
    textDecorationLine: 'underline',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: spacing['3xl'],
    paddingTop: spacing.xl,
  },
  signInContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  signInText: {
    ...textStyles.body,
    color: 'rgba(255, 255, 255, 0.7)',
    textDecorationLine: 'underline',
  },
});
