import React from 'react';
import Animated, {
  BounceIn,
  Easing,
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  FlipInXUp,
  FlipInYLeft,
  interpolate,
  LightSpeedInRight,
  RotateInDownLeft,
  runOnJS,
  SlideInDown,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import { Pressable } from 'react-native';

// Advanced spring configurations
export const SpringConfigs = {
  gentle: { damping: 20, stiffness: 90 },
  medium: { damping: 15, stiffness: 120 },
  snappy: { damping: 12, stiffness: 150 },
  bouncy: { damping: 8, stiffness: 100 },
  energetic: { damping: 10, stiffness: 200 },
};

// Timing configurations
export const TimingConfigs = {
  fast: { duration: 200, easing: Easing.out(Easing.quad) },
  normal: { duration: 300, easing: Easing.out(Easing.ease) },
  slow: { duration: 500, easing: Easing.out(Easing.ease) },
  smooth: { duration: 350, easing: Easing.bezier(0.25, 0.1, 0.25, 1) },
};

// Screen entrance animations
export const ScreenEntrances = {
  slideFromRight: SlideInRight.duration(400).easing(Easing.out(Easing.ease)),
  slideFromLeft: SlideInLeft.duration(400).easing(Easing.out(Easing.ease)),
  slideFromBottom: SlideInDown.duration(400).easing(Easing.out(Easing.ease)),
  slideFromTop: SlideInUp.duration(400).easing(Easing.out(Easing.ease)),
  fadeIn: FadeIn.duration(300),
  zoomIn: ZoomIn.duration(350).easing(Easing.out(Easing.back(1.2))),
  bounceIn: BounceIn.duration(600),
  flipIn: FlipInXUp.duration(500),
  rotateIn: RotateInDownLeft.duration(600),
  lightSpeed: LightSpeedInRight.duration(500),
};

// List item animations
export const ListItemAnimations = {
  staggeredFadeIn: (index: number) => FadeInDown.delay(index * 100).duration(400),
  staggeredSlideIn: (index: number) => SlideInLeft.delay(index * 80).duration(350),
  cascadeZoom: (index: number) =>
    ZoomIn.delay(index * 120)
      .duration(500)
      .easing(Easing.out(Easing.back(1.1))),
};

// Interactive element animations
export const useInteractiveAnimation = (
  config: {
    scale?: number;
    rotation?: number;
    opacity?: number;
    duration?: number;
  } = {}
) => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);

  const {
    scale: targetScale = 0.95,
    rotation: targetRotation = 0,
    opacity: targetOpacity = 0.8,
    duration = 150,
  } = config;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
    opacity: opacity.value,
  }));

  const onPressIn = () => {
    scale.value = withTiming(targetScale, { duration });
    rotation.value = withTiming(targetRotation, { duration });
    opacity.value = withTiming(targetOpacity, { duration });
  };

  const onPressOut = () => {
    scale.value = withSpring(1, SpringConfigs.snappy);
    rotation.value = withSpring(0, SpringConfigs.snappy);
    opacity.value = withSpring(1, SpringConfigs.snappy);
  };

  return {
    animatedStyle,
    onPressIn,
    onPressOut,
  };
};

// Animated pressable component
export const AnimatedPressable: React.FC<{
  children: React.ReactNode;
  onPress?: () => void;
  style?: any;
  animationConfig?: Parameters<typeof useInteractiveAnimation>[0];
}> = ({ children, onPress, style, animationConfig }) => {
  const { animatedStyle, onPressIn, onPressOut } = useInteractiveAnimation(animationConfig);

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    </Pressable>
  );
};

// Loading animations
export const useLoadingAnimation = (isLoading: boolean) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
  }));

  React.useEffect(() => {
    if (isLoading) {
      rotation.value = withRepeat(withTiming(360, { duration: 1000, easing: Easing.linear }), -1);
      scale.value = withRepeat(
        withSequence(withTiming(1.1, { duration: 500 }), withTiming(1, { duration: 500 })),
        -1,
        true
      );
    } else {
      rotation.value = withTiming(0, TimingConfigs.fast);
      scale.value = withTiming(1, TimingConfigs.fast);
    }
  }, [isLoading]);

  return animatedStyle;
};

// Pulse animation hook
export const usePulseAnimation = (
  options: {
    scale?: number;
    duration?: number;
    repeat?: number;
  } = {}
) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const { scale: targetScale = 1.2, duration = 1000, repeat = -1 } = options;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  React.useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(targetScale, { duration: duration / 2 }),
        withTiming(1, { duration: duration / 2 })
      ),
      repeat,
      true
    );

    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: duration / 2 }),
        withTiming(1, { duration: duration / 2 })
      ),
      repeat,
      true
    );
  }, []);

  return animatedStyle;
};

// Floating animation hook
export const useFloatingAnimation = (
  options: {
    translateY?: number;
    duration?: number;
  } = {}
) => {
  const translateY = useSharedValue(0);

  const { translateY: maxTranslateY = -10, duration = 2000 } = options;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  React.useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(maxTranslateY, { duration: duration / 2, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: duration / 2, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  return animatedStyle;
};

// Success/Error feedback animation
export const useFeedbackAnimation = () => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  const triggerSuccess = (onComplete?: () => void) => {
    scale.value = withSequence(
      withTiming(1.2, { duration: 150 }),
      withTiming(1, { duration: 150 }),
      withTiming(1.1, { duration: 100 }),
      withTiming(1, { duration: 100 }, (finished) => {
        if (finished && onComplete) {
          runOnJS(onComplete)();
        }
      })
    );
  };

  const triggerError = (onComplete?: () => void) => {
    rotation.value = withSequence(
      withTiming(-10, { duration: 100 }),
      withTiming(10, { duration: 100 }),
      withTiming(-10, { duration: 100 }),
      withTiming(0, { duration: 100 }, (finished) => {
        if (finished && onComplete) {
          runOnJS(onComplete)();
        }
      })
    );
  };

  return {
    animatedStyle,
    triggerSuccess,
    triggerError,
  };
};

// Card flip animation
export const useCardFlipAnimation = () => {
  const rotateY = useSharedValue(0);
  const isFlipped = useSharedValue(false);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotateY.value, [0, 180], [0, 180]);
    const opacity = interpolate(rotateY.value, [0, 90, 180], [1, 0, 0]);

    return {
      transform: [{ rotateY: `${rotateValue}deg` }],
      opacity,
      backfaceVisibility: 'hidden',
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotateY.value, [0, 180], [180, 360]);
    const opacity = interpolate(rotateY.value, [0, 90, 180], [0, 0, 1]);

    return {
      transform: [{ rotateY: `${rotateValue}deg` }],
      opacity,
      backfaceVisibility: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
  });

  const flip = () => {
    isFlipped.value = !isFlipped.value;
    rotateY.value = withSpring(isFlipped.value ? 180 : 0, SpringConfigs.medium);
  };

  return {
    frontAnimatedStyle,
    backAnimatedStyle,
    flip,
    isFlipped: isFlipped.value,
  };
};

// Export all animation utilities
export {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
  withRepeat,
  interpolate,
  runOnJS,
  Easing,
  Animated,
};
