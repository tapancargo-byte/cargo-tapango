import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, AccessibilityInfo, ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';
import { lottieConfig } from '../utils/animations';

export interface LottieAnimationProps {
  source: any;
  style?: ViewStyle;
  autoPlay?: boolean;
  loop?: boolean;
  speed?: number;
  onAnimationFinish?: () => void;
  resizeMode?: 'contain' | 'cover' | 'center';
  reduceMotion?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
  progress?: number;
  duration?: number;
  colorFilters?: any[];
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  source,
  style,
  autoPlay = true,
  loop = true,
  speed = 1,
  onAnimationFinish,
  resizeMode = 'contain',
  reduceMotion,
  accessibilityLabel,
  accessibilityHint,
  testID,
  progress,
  duration,
  colorFilters,
}) => {
  const animationRef = useRef<LottieView>(null);
  const [isMotionReduced, setIsMotionReduced] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if motion should be reduced
    const checkReduceMotion = async () => {
      try {
        const reduceMotionEnabled = await AccessibilityInfo.isReduceMotionEnabled();
        setIsMotionReduced(reduceMotion || reduceMotionEnabled);
      } catch (error) {
        console.warn('Error checking reduce motion:', error);
        setIsMotionReduced(reduceMotion || false);
      }
    };

    checkReduceMotion();

    // Listen for accessibility changes
    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      (reduceMotionEnabled: boolean) => {
        setIsMotionReduced(reduceMotion || reduceMotionEnabled);
      }
    );

    return () => {
      subscription?.remove();
      if (animationRef.current) {
        animationRef.current.reset();
      }
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (animationRef.current && isMotionReduced) {
      animationRef.current.pause();
    } else if (animationRef.current && !isMotionReduced && autoPlay) {
      animationRef.current.play();
    }
  }, [isMotionReduced, autoPlay]);

  const handleAnimationFinish = () => {
    setIsLoaded(true);
    onAnimationFinish?.();
  };

  const handleLoadAnimation = () => {
    setIsLoaded(true);
  };

  const play = () => {
    if (!isMotionReduced) {
      animationRef.current?.play();
    }
  };

  const pause = () => {
    animationRef.current?.pause();
  };

  const reset = () => {
    animationRef.current?.reset();
  };

  const playFromProgress = (startProgress: number, endProgress: number) => {
    if (!isMotionReduced) {
      animationRef.current?.play(startProgress, endProgress);
    }
  };

  return (
    <View
      style={[styles.container, style]}
      accessible={!!accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole='image'
      testID={testID}
    >
      <LottieView
        ref={animationRef}
        source={source}
        autoPlay={autoPlay && !isMotionReduced}
        loop={loop && !isMotionReduced}
        speed={isMotionReduced ? 0 : speed}
        onAnimationFinish={handleAnimationFinish}
        onAnimationLoaded={handleLoadAnimation}
        resizeMode={resizeMode}
        style={styles.animation}
        progress={progress}
        duration={duration}
        colorFilters={colorFilters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});

export default LottieAnimation;
