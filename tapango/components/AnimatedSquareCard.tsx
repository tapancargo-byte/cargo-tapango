import React, { PropsWithChildren, useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

export interface AnimatedSquareCardProps extends PropsWithChildren {
  style?: ViewStyle;
}

/**
 * Simple square-ish card with subtle elevation and enter animation.
 * - 6 px radius
 * - 8% black shadow
 * - 12 px blur-ish via elevation
 */
export default function AnimatedSquareCard({ children, style }: AnimatedSquareCardProps) {
  const scale = useSharedValue(0.96);
  const translateY = useSharedValue(30);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 14 });
    translateY.value = withTiming(0, { duration: 300 });
    opacity.value = withTiming(1, { duration: 250 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
    opacity: opacity.value,
  }));

  return <Animated.View style={[styles.card, animatedStyle, style]}>{children}</Animated.View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
