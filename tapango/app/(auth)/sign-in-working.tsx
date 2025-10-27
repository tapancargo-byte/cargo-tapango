import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppIcon } from '../../src/ui';
import React, { useState } from 'react';
import { colors } from '../../src/styles/colors';

const { width, height } = Dimensions.get('window');

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded || isLoading) return;

    // Basic validation
    if (!emailAddress.trim()) {
      Alert.alert('Validation Error', 'Please enter your email address');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Validation Error', 'Please enter your password');
      return;
    }

    setIsLoading(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        console.log('✅ Sign-in successful, redirecting to main app');
        router.replace('/(tabs)');
      } else {
        console.error('Sign-in incomplete:', JSON.stringify(signInAttempt, null, 2));
        Alert.alert('Sign-in Error', 'Sign-in process incomplete. Please try again.');
      }
    } catch (err: any) {
      console.error('Sign-in error:', JSON.stringify(err, null, 2));
      const errorMessage =
        err?.errors?.[0]?.longMessage || err?.message || 'An error occurred during sign-in';
      Alert.alert('Sign-in Failed', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle='light-content' backgroundColor={colors.primary.blue} />

      <LinearGradient
        colors={colors.gradients.primary}
        style={styles.gradientContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.headerSection}>
              <View style={styles.logoContainer}>
                <AppIcon name='car-outline' size={48} color={colors.neutral.white} />
              </View>
              <Text style={styles.title}>Welcome back</Text>
              <Text style={styles.subtitle}>Sign in to your TAPANGO account</Text>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              <View style={styles.inputContainer}>
                <AppIcon name='mail-outline' size={20} color='#9CA3AF' style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  keyboardType='email-address'
                  value={emailAddress}
                  placeholder='Email address'
                  placeholderTextColor='#9CA3AF'
                  onChangeText={setEmailAddress}
                  editable={!isLoading}
                />
              </View>

              <View style={styles.inputContainer}>
                <AppIcon
                  name='lock-closed-outline'
                  size={20}
                  color='#9CA3AF'
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  value={password}
                  placeholder='Password'
                  placeholderTextColor='#9CA3AF'
                  secureTextEntry={!isPasswordVisible}
                  onChangeText={setPassword}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <AppIcon
                    name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color='#9CA3AF'
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[styles.signInButton, isLoading && styles.signInButtonDisabled]}
                onPress={onSignInPress}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Text style={styles.signInButtonText}>Signing in...</Text>
                ) : (
                  <Text style={styles.signInButtonText}>Sign in</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Footer Section */}
            <View style={styles.footerSection}>
              <Text style={styles.footerText}>
                Don't have an account?{' '}
                <Link href='/(auth)/sign-up'>
                  <Text style={styles.footerLink}>Sign up</Text>
                </Link>
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary.blue,
  },
  gradientContainer: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },

  // Header Section
  headerSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.neutral.white,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontWeight: '400',
  },

  // Form Section
  formSection: {
    flex: 3,
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 4,
    marginBottom: 16,
    minHeight: 56,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    // Modern shadow
    ...(Platform.OS !== 'web'
      ? {
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 5,
        }
      : {}),
    ...(Platform.OS === 'web' ? { boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' } : {}),
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    paddingVertical: 16,
    fontWeight: '500',
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    padding: 4,
  },
  signInButton: {
    backgroundColor: colors.neutral.white,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 24,
    // Modern shadow
    ...(Platform.OS !== 'web'
      ? {
          shadowColor: 'rgba(0, 0, 0, 0.15)',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.15,
          shadowRadius: 16,
          elevation: 8,
        }
      : {}),
    ...(Platform.OS === 'web' ? { boxShadow: '0px 6px 16px rgba(0,0,0,0.15)' } : {}),
  },
  signInButtonDisabled: {
    opacity: 0.7,
  },
  signInButtonText: {
    color: colors.primary.blue,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Footer Section
  footerSection: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  footerLink: {
    fontSize: 16,
    color: colors.neutral.white,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
