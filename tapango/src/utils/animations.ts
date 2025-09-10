import { Animated, Easing } from 'react-native';

export const animationConfig = {
  timing: {
    short: 200,
    medium: 300,
    long: 500,
    splash: 2500,
    onboarding: 800,
  },
  easing: {
    easeIn: Easing.in(Easing.ease),
    easeOut: Easing.out(Easing.ease),
    easeInOut: Easing.inOut(Easing.ease),
    spring: Easing.elastic(1),
    bounce: Easing.bounce,
  },
} as const;

export const createFadeAnimation = (
  value: Animated.Value,
  toValue: number,
  duration: number = animationConfig.timing.medium
): Animated.CompositeAnimation => {
  return Animated.timing(value, {
    toValue,
    duration,
    easing: animationConfig.easing.easeOut,
    useNativeDriver: true,
  });
};

export const createScaleAnimation = (
  value: Animated.Value,
  toValue: number,
  tension: number = 50,
  friction: number = 8
): Animated.CompositeAnimation => {
  return Animated.spring(value, {
    toValue,
    tension,
    friction,
    useNativeDriver: true,
  });
};

export const createSlideAnimation = (
  value: Animated.Value,
  toValue: number,
  duration: number = animationConfig.timing.medium
): Animated.CompositeAnimation => {
  return Animated.timing(value, {
    toValue,
    duration,
    easing: animationConfig.easing.easeOut,
    useNativeDriver: true,
  });
};

export const createSequentialAnimation = (
  animations: Animated.CompositeAnimation[]
): Animated.CompositeAnimation => {
  return Animated.sequence(animations);
};

export const createParallelAnimation = (
  animations: Animated.CompositeAnimation[]
): Animated.CompositeAnimation => {
  return Animated.parallel(animations);
};

export const createStaggeredAnimation = (
  animationFunction: () => Animated.CompositeAnimation,
  staggerDelay: number,
  count: number
): Animated.CompositeAnimation => {
  const animations: Animated.CompositeAnimation[] = [];
  
  for (let i = 0; i < count; i++) {
    animations.push(
      Animated.sequence([
        Animated.delay(i * staggerDelay),
        animationFunction(),
      ])
    );
  }
  
  return Animated.parallel(animations);
};

// Lottie animation configuration
export const lottieConfig = {
  defaultProps: {
    autoPlay: true,
    loop: true,
    speed: 1,
    resizeMode: 'contain' as const,
  },
  splash: {
    autoPlay: true,
    loop: false,
    speed: 1,
    resizeMode: 'contain' as const,
  },
  onboarding: {
    autoPlay: true,
    loop: true,
    speed: 1,
    resizeMode: 'contain' as const,
  },
} as const;

// Animation presets
export const animationPresets = {
  fadeIn: {
    opacity: { from: 0, to: 1 },
    duration: animationConfig.timing.medium,
  },
  fadeOut: {
    opacity: { from: 1, to: 0 },
    duration: animationConfig.timing.medium,
  },
  slideInUp: {
    transform: { translateY: { from: 50, to: 0 } },
    opacity: { from: 0, to: 1 },
    duration: animationConfig.timing.medium,
  },
  slideInDown: {
    transform: { translateY: { from: -50, to: 0 } },
    opacity: { from: 0, to: 1 },
    duration: animationConfig.timing.medium,
  },
  slideInLeft: {
    transform: { translateX: { from: -50, to: 0 } },
    opacity: { from: 0, to: 1 },
    duration: animationConfig.timing.medium,
  },
  slideInRight: {
    transform: { translateX: { from: 50, to: 0 } },
    opacity: { from: 0, to: 1 },
    duration: animationConfig.timing.medium,
  },
  scaleIn: {
    transform: { scale: { from: 0.8, to: 1 } },
    opacity: { from: 0, to: 1 },
    duration: animationConfig.timing.medium,
  },
  bounceIn: {
    transform: { scale: { from: 0.3, to: 1 } },
    duration: animationConfig.timing.long,
    easing: animationConfig.easing.bounce,
  },
} as const;

export type AnimationConfig = typeof animationConfig;
export type LottieConfig = typeof lottieConfig;
export type AnimationPresets = typeof animationPresets;
