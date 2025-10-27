import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import Lottie animation
import SplashAnimation from '../../assets/lottie/splash.json';
// Import storage for dev purposes
import { StorageService } from '../utils/storage';
// Import brand colors
import { colors } from '../styles/colors';

// Prevent the splash screen from auto-hiding (Expo SDK 53 best practice)
SplashScreen.preventAutoHideAsync();

// Set splash screen animation options
SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

interface SplashScreenProps {
  onAnimationComplete: () => void;
  minimumDisplayTime?: number;
}

const { width, height } = Dimensions.get('window');

const TapangoSplashScreen: React.FC<SplashScreenProps> = ({
  onAnimationComplete,
  minimumDisplayTime = 3000,
}) => {
  const insets = useSafeAreaInsets();
  const [appIsReady, setAppIsReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  // Loading states for better UX - Logistics focused
  const loadingStates = [
    { text: 'Starting logistics engine...', duration: 800 },
    { text: 'Connecting to driver network...', duration: 600 },
    { text: 'Loading real-time tracking...', duration: 700 },
    { text: 'Preparing your dashboard...', duration: 500 },
    { text: 'Ready for delivery!', duration: 400 },
  ];

  useEffect(() => {
    async function prepareApp() {
      try {
        // Simulate loading states with progress
        let currentProgress = 0;

        for (let i = 0; i < loadingStates.length; i++) {
          const state = loadingStates[i];
          if (state) {
            setLoadingText(state.text);

            // Animate progress
            const targetProgress = ((i + 1) / loadingStates.length) * 100;
            const progressStep = (targetProgress - currentProgress) / 20;

            for (let j = 0; j < 20; j++) {
              currentProgress += progressStep;
              setLoadingProgress(Math.min(currentProgress, 100));
              await new Promise((resolve) => setTimeout(resolve, state.duration / 20));
            }
          }
        }

        // Ensure minimum display time
        const elapsed = Date.now();
        const remaining = minimumDisplayTime - elapsed;
        if (remaining > 0) {
          await new Promise((resolve) => setTimeout(resolve, remaining));
        }
      } catch (error) {
        console.warn('Splash screen preparation error:', error);
      } finally {
        setAppIsReady(true);
      }
    }

    prepareApp();
  }, [minimumDisplayTime]);

  // Handle layout root view - this is where we hide the Expo splash screen
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      try {
        // Hide the native splash screen once our custom splash is ready
        await SplashScreen.hideAsync();

        // Small delay before transitioning to main app
        setTimeout(() => {
          onAnimationComplete();
        }, 500);
      } catch (error) {
        console.warn('Error hiding splash screen:', error);
        onAnimationComplete();
      }
    }
  }, [appIsReady, onAnimationComplete]);

  // Don't render anything until app is ready
  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar
        barStyle='light-content'
        backgroundColor={colors.primary.blue}
        translucent={false}
      />

      {/* Modern Blue Gradient Background */}
      <LinearGradient
        colors={colors.gradients.primary}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Main Content Container */}
        <View style={[styles.content, { paddingTop: insets.top }]}>
          {/* Logo Section */}
          <View style={styles.logoSection}>
            {/* Animated Logo Container */}
            <View style={styles.logoContainer}>
              <View style={styles.logoIconContainer}>
                <LottieView
                  source={SplashAnimation}
                  autoPlay
                  loop
                  style={styles.logoIcon}
                  resizeMode='contain'
                  colorFilters={[
                    {
                      keypath: '**',
                      color: colors.neutral.white,
                    },
                  ]}
                />
              </View>

              {/* Brand Name */}
              <Text style={styles.brandTitle}>TAPANGO</Text>
              <Text style={styles.brandTagline}>Northeast India's Cargo Network</Text>
            </View>
          </View>

          {/* Loading Section */}
          <View style={styles.loadingSection}>
            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressTrack}>
                <View style={[styles.progressBar, { width: `${loadingProgress}%` }]} />
              </View>
              <Text style={styles.progressText}>{Math.round(loadingProgress)}%</Text>
            </View>

            {/* Loading Status */}
            <View style={styles.statusContainer}>
              <ActivityIndicator
                size='small'
                color={colors.neutral.white}
                style={styles.loadingIndicator}
              />
              <Text style={styles.loadingText}>{loadingText}</Text>
            </View>
          </View>

          {/* Bottom Section */}
          <View style={[styles.bottomSection, { paddingBottom: insets.bottom + 16 }]}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
            <Text style={styles.poweredByText}>Powered by Expo SDK 53</Text>

            {/* Development Helper */}
            {__DEV__ && (
              <TouchableOpacity
                style={styles.devButton}
                onPress={async () => {
                  try {
                    await StorageService.clearOnboardingState();
                    console.log('🔄 Onboarding state cleared!');
                  } catch (error) {
                    console.error('Failed to clear onboarding state:', error);
                  }
                }}
              >
                <Text style={styles.devButtonText}>Reset Onboarding</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.blue,
  },
  backgroundGradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },

  // Logo Section - takes up most of the screen
  logoSection: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIconContainer: {
    width: 140,
    height: 140,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 70,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    // Native elevation (no RN shadow* on native to satisfy web lint)
    ...(Platform.OS !== 'web' ? { elevation: 10 } : {}),
    // Web-only CSS shadow to avoid RNW shadow* warnings
    ...(Platform.OS === 'web' ? { boxShadow: '0px 12px 20px rgba(15, 23, 42, 0.2)' } : {}),
  },
  logoIcon: {
    width: 90,
    height: 90,
  },
  brandTitle: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.neutral.white,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 3,
    // Avoid textShadow* props in Storybook web; use CSS shadow via style on web if needed
  },
  brandTagline: {
    fontSize: 18,
    color: colors.neutral.white,
    textAlign: 'center',
    fontWeight: '400',
    opacity: 0.9,
    letterSpacing: 1,
    // Avoid textShadow* props in Storybook web
  },

  // Loading Section
  loadingSection: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 24,
  },

  // Progress Container
  progressContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  progressTrack: {
    width: width * 0.7,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
    ...(Platform.OS !== 'web' ? { elevation: 2 } : {}),
    ...(Platform.OS === 'web' ? { boxShadow: '0px 2px 4px rgba(15, 23, 42, 0.1)' } : {}),
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.neutral.white,
    borderRadius: 3,
    ...(Platform.OS !== 'web' ? { elevation: 4 } : {}),
    ...(Platform.OS === 'web' ? { boxShadow: '0 0 6px rgba(255,255,255,0.6)' } : {}),
  },
  progressText: {
    fontSize: 16,
    color: colors.neutral.white,
    fontWeight: '600',
    opacity: 0.9,
  },

  // Status Container
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  loadingIndicator: {
    marginRight: 12,
  },
  loadingText: {
    fontSize: 16,
    color: colors.neutral.white,
    textAlign: 'center',
    fontWeight: '500',
    opacity: 0.85,
  },

  // Bottom Section
  bottomSection: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
    paddingTop: 16,
  },
  versionText: {
    fontSize: 13,
    color: colors.neutral.white,
    opacity: 0.7,
    textAlign: 'center',
    fontWeight: '500',
  },
  poweredByText: {
    fontSize: 11,
    color: colors.neutral.white,
    opacity: 0.6,
    textAlign: 'center',
    fontWeight: '400',
    marginBottom: 8,
  },
  devButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    marginTop: 8,
  },
  devButtonText: {
    fontSize: 13,
    color: colors.neutral.white,
    opacity: 0.9,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default TapangoSplashScreen;
