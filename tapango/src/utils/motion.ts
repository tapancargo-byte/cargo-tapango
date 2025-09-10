import { Animated, Easing } from 'react-native';
import * as Haptics from 'expo-haptics';

// Motion timing constants following the redesign specifications
export const MotionConfig = {
  // Duration constants (in ms)
  fast: 200,
  normal: 300,
  slow: 600,
  
  // Easing functions
  easing: {
    ease: Easing.bezier(0.4, 0.0, 0.2, 1),
    easeIn: Easing.bezier(0.4, 0.0, 1, 1),
    easeOut: Easing.bezier(0.0, 0.0, 0.2, 1),
    easeInOut: Easing.bezier(0.4, 0.0, 0.2, 1),
    spring: Easing.elastic(1.2),
  },
  
  // Scale values for press animations
  scale: {
    pressed: 0.96,
    normal: 1.0,
    expanded: 1.04,
  },
} as const;

// Haptic feedback helpers
export const HapticFeedback = {
  // Light impact for button presses
  light: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  
  // Medium impact for important actions
  medium: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
  
  // Heavy impact for critical actions
  heavy: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
  
  // Success notification
  success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  
  // Warning notification
  warning: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
  
  // Error notification
  error: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
  
  // Selection changed (iOS only)
  selection: () => Haptics.selectionAsync(),
} as const;

// Pre-built animation helpers
export const AnimationHelpers = {
  // Standard button press animation
  buttonPress: (animatedValue: Animated.Value) => {
    return Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: MotionConfig.scale.pressed,
        duration: 100,
        easing: MotionConfig.easing.easeOut,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: MotionConfig.scale.normal,
        duration: 100,
        easing: MotionConfig.easing.easeOut,
        useNativeDriver: true,
      }),
    ]);
  },
  
  // Fade in animation
  fadeIn: (animatedValue: Animated.Value, duration = MotionConfig.normal) => {
    return Animated.timing(animatedValue, {
      toValue: 1,
      duration,
      easing: MotionConfig.easing.ease,
      useNativeDriver: true,
    });
  },
  
  // Fade out animation
  fadeOut: (animatedValue: Animated.Value, duration = MotionConfig.normal) => {
    return Animated.timing(animatedValue, {
      toValue: 0,
      duration,
      easing: MotionConfig.easing.ease,
      useNativeDriver: true,
    });
  },
  
  // Slide up animation (from bottom)
  slideUp: (animatedValue: Animated.Value, distance = 50, duration = MotionConfig.normal) => {
    return Animated.timing(animatedValue, {
      toValue: 0,
      duration,
      easing: MotionConfig.easing.ease,
      useNativeDriver: true,
    });
  },
  
  // Scale in animation
  scaleIn: (animatedValue: Animated.Value, duration = MotionConfig.normal) => {
    return Animated.spring(animatedValue, {
      toValue: 1,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    });
  },
  
  // Staggered animation helper
  stagger: (animations: Animated.CompositeAnimation[], delay = 100) => {
    return Animated.stagger(delay, animations);
  },
  
  // Loading spinner rotation
  spin: (animatedValue: Animated.Value) => {
    return Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
  },
} as const;

// Page transition animations
export const PageTransitions = {
  // Slide from right (iOS style)
  slideFromRight: (animatedValue: Animated.Value) => {
    return Animated.timing(animatedValue, {
      toValue: 1,
      duration: MotionConfig.normal,
      easing: MotionConfig.easing.ease,
      useNativeDriver: true,
    });
  },
  
  // Fade transition
  fade: (animatedValue: Animated.Value) => {
    return Animated.timing(animatedValue, {
      toValue: 1,
      duration: MotionConfig.fast,
      easing: MotionConfig.easing.ease,
      useNativeDriver: true,
    });
  },
} as const;

// Form field animations
export const FormAnimations = {
  // Error shake animation
  shake: (animatedValue: Animated.Value) => {
    return Animated.sequence([
      Animated.timing(animatedValue, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(animatedValue, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(animatedValue, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(animatedValue, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]);
  },
  
  // Field focus animation
  focus: (animatedValue: Animated.Value) => {
    return Animated.timing(animatedValue, {
      toValue: 1,
      duration: MotionConfig.fast,
      easing: MotionConfig.easing.ease,
      useNativeDriver: false, // Border color changes require layout
    });
  },
  
  // Field blur animation
  blur: (animatedValue: Animated.Value) => {
    return Animated.timing(animatedValue, {
      toValue: 0,
      duration: MotionConfig.fast,
      easing: MotionConfig.easing.ease,
      useNativeDriver: false, // Border color changes require layout
    });
  },
} as const;

// Success/Error feedback animations
export const FeedbackAnimations = {
  // Success checkmark animation
  success: (animatedValue: Animated.Value) => {
    return Animated.sequence([
      Animated.spring(animatedValue, {
        toValue: 1.2,
        tension: 100,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(animatedValue, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]);
  },
  
  // Error pulse animation
  error: (animatedValue: Animated.Value) => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1.1,
          duration: 300,
          easing: MotionConfig.easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 300,
          easing: MotionConfig.easing.ease,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 3 }
    );
  },
} as const;

// Utility function to combine haptic feedback with animations
export const animateWithHaptic = (
  animation: Animated.CompositeAnimation,
  hapticType: keyof typeof HapticFeedback = 'light'
) => {
  HapticFeedback[hapticType]();
  return animation;
};

// Utility to create responsive motion based on device capabilities
export const createResponsiveMotion = (
  normalDuration: number,
  reducedMotionDuration: number = normalDuration * 0.5
) => {
  // In a real app, you'd check for reduced motion preferences
  // For now, we'll use the normal duration
  return normalDuration;
};
