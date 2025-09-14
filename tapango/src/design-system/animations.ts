import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export const easings = {
  standard: Easing.out(Easing.cubic),
  inOut: Easing.inOut(Easing.cubic),
};

export const durations = {
  fast: 150,
  base: 250,
  slow: 350,
};

export const usePressableScale = (pressedScale = 0.97) => {
  const scale = useSharedValue(1);
  const onPressIn = () => {
    scale.value = withSpring(pressedScale, { damping: 15 });
  };
  const onPressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
  };
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  return { animatedStyle, onPressIn, onPressOut };
};

export const fadeIn = (duration = durations.base) => ({
  from: { opacity: 0 },
  to: { opacity: 1 },
  duration,
  easing: easings.standard,
});
