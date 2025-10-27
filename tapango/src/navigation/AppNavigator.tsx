import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreens from '../screens/OnboardingScreen';
import MainApp from '../screens/MainApp';

// Utilities
import { StorageService } from '../utils/storage';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [appInitialized, setAppInitialized] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<keyof RootStackParamList>('Splash');
  const [splashCompleted, setSplashCompleted] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      const isFirstLaunch = await StorageService.isFirstLaunch();
      const onboardingCompleted = await StorageService.getOnboardingCompleted();

      console.log('First launch:', isFirstLaunch);
      console.log('Onboarding completed:', onboardingCompleted);

      if (isFirstLaunch || !onboardingCompleted) {
        setShowOnboarding(true);
        await StorageService.setFirstLaunch(false);
      } else {
        setShowOnboarding(false);
      }

      setAppInitialized(true);
    } catch (error) {
      console.error('Error initializing app:', error);
      // If there's an error, show onboarding to be safe
      setShowOnboarding(true);
      setAppInitialized(true);
    }
  };

  const handleSplashComplete = () => {
    console.log('Splash complete, show onboarding:', showOnboarding);
    setSplashCompleted(true);

    // Set the next screen based on onboarding status
    if (showOnboarding) {
      setCurrentScreen('Onboarding');
    } else {
      setCurrentScreen('Main');
    }
  };

  const handleOnboardingComplete = async () => {
    console.log('Onboarding completed');
    try {
      await StorageService.setOnboardingCompleted(true);
      setCurrentScreen('Main');
    } catch (error) {
      console.error('Error saving onboarding completion:', error);
    }
  };

  const handleOnboardingSkip = async () => {
    console.log('Onboarding skipped');
    try {
      await StorageService.setOnboardingCompleted(true);
      setCurrentScreen('Main');
    } catch (error) {
      console.error('Error saving onboarding skip:', error);
    }
  };

  // Don't render navigation until app is initialized
  if (!appInitialized) {
    return null;
  }

  // Show splash screen first
  if (!splashCompleted) {
    return <SplashScreen onAnimationComplete={handleSplashComplete} minimumDisplayTime={2500} />;
  }

  // After splash completion, show appropriate screen
  if (currentScreen === 'Onboarding') {
    return (
      <OnboardingScreens onComplete={handleOnboardingComplete} onSkip={handleOnboardingSkip} />
    );
  }

  // Default to main app
  return <MainApp />;
};

export default AppNavigator;
