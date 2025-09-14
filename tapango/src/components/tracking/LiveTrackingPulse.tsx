import React, { useEffect } from 'react';
import { AccessibilityInfo, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  cancelAnimation,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Circle } from '../../ui';

const ANIMATION_DURATION = 2000;
const MIN_SCALE = 1;
const MAX_SCALE = 1.5;
const MAX_OPACITY = 0.8;
const MIN_OPACITY = 0.1;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    pointerEvents: 'none',
  },
});

interface LiveTrackingPulseProps {
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export function LiveTrackingPulse({
  size = 60,
  color = 'rgba(79, 195, 247, 0.3)',
  style,
}: LiveTrackingPulseProps) {
  const pulseAnimation = useSharedValue(0);

  useEffect(() => {
    let isSubscribed = true;

    const startAnimation = () => {
      if (isSubscribed) {
        pulseAnimation.value = withRepeat(
          withTiming(1, { duration: ANIMATION_DURATION }),
          -1,
          false
        );
      }
    };

    const checkMotionPreference = async () => {
      const isReduceMotionEnabled = await AccessibilityInfo.isReduceMotionEnabled();
      if (!isReduceMotionEnabled && isSubscribed) {
        startAnimation();
      }
    };

    void checkMotionPreference();

    return () => {
      isSubscribed = false;
      cancelAnimation(pulseAnimation);
    };
  }, [pulseAnimation]); // pulseAnimation is stable and needed for cleanup

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      pulseAnimation.value,
      [0, 1],
      [MIN_SCALE, MAX_SCALE],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      pulseAnimation.value,
      [0, 1],
      [MAX_OPACITY, MIN_OPACITY],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[styles.container, style, animatedStyle]}
      accessibilityRole='none'
      testID='live-tracking-pulse'
    >
      <Circle size={size} backgroundColor={color} accessibilityElementsHidden={true} />
    </Animated.View>
  );
}
