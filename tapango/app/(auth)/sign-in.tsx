import React from 'react'
import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { 
  Text, 
  TouchableOpacity, 
  View, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  Dimensions,
  Animated 
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AuthInput } from '../../src/components/ui/AuthInput'
import { AuthButton } from '../../src/components/ui/AuthButton'
import { colors } from '../../src/styles/colors'
import { spacing, borderRadius, shadows } from '../../src/styles/spacing'
import { textStyles, typography } from '../../src/styles/typography'

const { width, height } = Dimensions.get('window');

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const insets = useSafeAreaInsets()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [errors, setErrors] = React.useState<{email?: string; password?: string; general?: string}>({})
  // Use stable Animated.Value instance so re-renders (e.g. toggling password visibility) don't reset opacity
  const fadeAnim = React.useRef(new Animated.Value(0)).current

  // Handle the submission of the sign-in form
  // Add a loading check
  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.backgroundContainer}>
          <View style={[styles.loadingContainer, { paddingTop: insets.top }]}>
            <Animated.View style={[styles.loadingLogo, { transform: [{ scale: fadeAnim }] }]}>
              <Ionicons name="car" size={40} color="white" />
            </Animated.View>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </View>
      </View>
    )
  }

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  const onSignInPress = async () => {
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

    setIsLoading(true)

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress.trim(),
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/(tabs)')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
        setErrors((e) => ({ ...e, general: 'Additional steps required to complete sign-in.' }))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      setErrors((e) => ({ ...e, general: err?.errors?.[0]?.message || 'Sign-in failed. Please try again.' }))
    } finally {
      setIsLoading(false)
    }
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
            <View style={styles.placeholder} />
            <Text style={styles.headerTitle}>Sign In</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Form */}
          <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
            <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <Ionicons name="log-in" size={32} color="white" />
              </View>
            </View>

            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>
              Sign in to your TAPANGO account to continue shipping.
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
              returnKeyType="go"
            />

            {errors.general && (
              <View style={styles.generalErrorContainer}>
                <Ionicons name="warning" size={20} color={colors.status.error} />
                <Text style={styles.errorText}>{errors.general}</Text>
              </View>
            )}

            <AuthButton
              title={isLoading ? 'Signing in...' : 'Sign in'}
              onPress={onSignInPress}
              loading={isLoading}
              disabled={isLoading}
              icon="log-in"
            />

            <TouchableOpacity 
              style={styles.forgotPasswordContainer}
              onPress={() => router.push('/(auth)/forgot-password')}
              activeOpacity={0.7}
            >
              <Text style={styles.forgotPasswordText}>
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
            <TouchableOpacity
              style={styles.signUpContainer}
              onPress={() => router.push('/(auth)/sign-up')}
              activeOpacity={0.7}
            >
              <Text style={styles.signUpText}>
                Don't have an account? Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
  headerTitle: {
    ...textStyles.heading,
    fontSize: typography.fontSize.xl,
    color: 'white',
    fontWeight: typography.fontWeight.semibold,
  },
  placeholder: {
    width: 44,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingLogo: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  loadingText: {
    ...textStyles.bodyLarge,
    color: 'white',
    textAlign: 'center',
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
    ...shadows.lg,
    shadowColor: 'rgba(30, 64, 175, 0.3)',
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
    backgroundColor: 'rgba(254, 226, 226, 0.9)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.status.error,
    ...shadows.sm,
  },
  errorText: {
    ...textStyles.body,
    color: colors.status.error,
    marginLeft: spacing.sm,
    flex: 1,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginTop: spacing['3xl'],
    paddingVertical: spacing.lg,
  },
  forgotPasswordText: {
    ...textStyles.body,
    color: 'rgba(255, 255, 255, 0.7)',
    textDecorationLine: 'underline',
  },
  footer: {
    justifyContent: 'flex-end',
  },
  signUpContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  signUpText: {
    ...textStyles.body,
    color: 'rgba(255, 255, 255, 0.7)',
    textDecorationLine: 'underline',
  },
});
