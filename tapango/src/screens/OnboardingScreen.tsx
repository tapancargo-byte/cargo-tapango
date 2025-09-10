import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

// Import Lottie animations
import SplashAnimation from '../../assets/lottie/splash.json';
// Import blue theme colors
import { colors } from '../styles/colors';

interface OnboardingScreen {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  primaryAnimation: any;
  secondaryAnimation?: any;
  backgroundColor: readonly [string, string] | readonly [string, string, string];
  textColor: string;
}

interface OnboardingScreensProps {
  onComplete: () => void;
  onSkip: () => void;
}

const { width, height } = Dimensions.get('window');

const onboardingData: OnboardingScreen[] = [
  {
    id: 'welcome',
    title: 'Welcome to TAPANGO',
    subtitle: 'Northeast India\'s Premier Cargo Network',
    description: 'Connecting Imphal to New Delhi with professional logistics services. Experience seamless cargo transportation with real-time tracking and trusted drivers.',
    primaryAnimation: SplashAnimation,
    backgroundColor: colors.gradients.primary,
    textColor: colors.neutral.white,
  },
  {
    id: 'booking',
    title: 'Smart Booking System',
    subtitle: 'Book Your Cargo in Under 2 Minutes',
    description: 'Simply enter pickup and delivery locations, select cargo type, and confirm. Our AI-powered system instantly matches you with the best available driver.',
    primaryAnimation: SplashAnimation,
    backgroundColor: colors.gradients.secondary,
    textColor: colors.primary.darkBlue,
  },
  {
    id: 'service',
    title: 'Real-Time Tracking',
    subtitle: '99.2% On-Time Delivery Record',
    description: 'Monitor your cargo\'s journey with live GPS tracking, receive instant notifications, and communicate directly with your assigned driver throughout the delivery.',
    primaryAnimation: SplashAnimation,
    backgroundColor: colors.gradients.accent,
    textColor: colors.neutral.white,
  },
  {
    id: 'getstarted',
    title: 'Ready to Ship?',
    subtitle: '5,000+ Successful Deliveries This Month',
    description: 'Join businesses and individuals who trust TAPANGO for reliable cargo logistics. Competitive rates, insured shipments, and 24/7 customer support.',
    primaryAnimation: SplashAnimation,
    backgroundColor: colors.gradients.dark,
    textColor: colors.neutral.white,
  },
];

const OnboardingScreens: React.FC<OnboardingScreensProps> = ({
  onComplete,
  onSkip,
}) => {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLastScreen, setIsLastScreen] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Update progress animation
    Animated.timing(progressAnim, {
      toValue: currentIndex / (onboardingData.length - 1),
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsLastScreen(currentIndex === onboardingData.length - 1);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      animateTransition(() => {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        scrollViewRef.current?.scrollTo({
          x: nextIndex * width,
          animated: true,
        });
      });
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      animateTransition(() => {
        const prevIndex = currentIndex - 1;
        setCurrentIndex(prevIndex);
        scrollViewRef.current?.scrollTo({
          x: prevIndex * width,
          animated: true,
        });
      });
    }
  };

  const handleComplete = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onComplete();
    });
  };

  const animateTransition = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    
    setTimeout(callback, 150);
  };

  const handleScroll = (event: any) => {
    const { contentOffset } = event.nativeEvent;
    const index = Math.round(contentOffset.x / width);
    if (index !== currentIndex && index >= 0 && index < onboardingData.length) {
      setCurrentIndex(index);
    }
  };

  const renderScreen = (screen: OnboardingScreen, index: number) => {
    return (
      <View key={screen.id} style={[styles.screenContainer, { width }]}>
        <LinearGradient
          colors={screen.backgroundColor}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Main Animation */}
          <View style={styles.animationContainer}>
            <LottieView
              source={screen.primaryAnimation}
              autoPlay
              loop
              style={styles.primaryAnimation}
              resizeMode="contain"
            />
            
          </View>

          {/* Content */}
          <View style={styles.contentContainer}>
            <Text style={[styles.subtitle, { color: screen.textColor }]}>
              {screen.subtitle}
            </Text>
            <Text style={[styles.title, { color: screen.textColor }]}>
              {screen.title}
            </Text>
            <Text style={[styles.description, { color: screen.textColor }]}>
              {screen.description}
            </Text>
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle={currentIndex === 1 ? "dark-content" : "light-content"}
        backgroundColor={onboardingData[currentIndex]?.backgroundColor[0]}
        translucent={false}
      />

      <Animated.View style={[styles.wrapper, { opacity: fadeAnim }]}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top }]}>
          {/* Skip Button */}
          {!isLastScreen && (
            <TouchableOpacity
              style={styles.skipButton}
              onPress={onSkip}
              activeOpacity={0.7}
            >
              <Text style={[styles.skipText, { color: onboardingData[currentIndex]?.textColor }]}>
                Skip
              </Text>
            </TouchableOpacity>
          )}

          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                    backgroundColor: onboardingData[currentIndex]?.textColor,
                  },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: onboardingData[currentIndex]?.textColor }]}>
              {currentIndex + 1} / {onboardingData.length}
            </Text>
          </View>
        </View>

        {/* Screens */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          scrollEventThrottle={16}
          style={styles.scrollView}
        >
          {onboardingData.map((screen, index) => renderScreen(screen, index))}
        </ScrollView>

        {/* Footer */}
        <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
          {/* Page Indicators */}
          <View style={styles.pageIndicators}>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.pageIndicator,
                  {
                    backgroundColor: index === currentIndex 
                      ? onboardingData[currentIndex]?.textColor 
                      : onboardingData[currentIndex]?.textColor + '40',
                    transform: [{ scale: index === currentIndex ? 1.2 : 1 }],
                  },
                ]}
              />
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            {currentIndex > 0 && (
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.previousButton,
                  { borderColor: onboardingData[currentIndex]?.textColor },
                ]}
                onPress={handlePrevious}
                activeOpacity={0.8}
              >
                <Text style={[styles.buttonText, { color: onboardingData[currentIndex]?.textColor }]}>
                  Previous
                </Text>
              </TouchableOpacity>
            )}

            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.nextButton,
                  { backgroundColor: onboardingData[currentIndex]?.textColor },
                ]}
                onPress={handleNext}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.buttonText,
                  styles.nextButtonText,
                  { color: onboardingData[currentIndex]?.backgroundColor[0] }
                ]}>
                  {isLastScreen ? 'Get Started' : 'Next'}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.blue,
  },
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    zIndex: 1,
  },
  skipButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
  },
  progressContainer: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 20,
  },
  progressTrack: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.8,
  },
  scrollView: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
  },
  animationContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  primaryAnimation: {
    width: Math.min(width * 0.6, 280),
    height: Math.min(width * 0.6, 280),
  },
  contentContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
    opacity: 0.9,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 1,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    opacity: 0.9,
    paddingHorizontal: 10,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    zIndex: 1,
  },
  pageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  pageIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  previousButton: {
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  nextButton: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  nextButtonText: {
    fontWeight: 'bold',
  },
});

export default OnboardingScreens;
