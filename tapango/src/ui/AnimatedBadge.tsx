import React from 'react';
import { Animated, Easing } from 'react-native';
import { InlineBadge } from './InlineBadge';

export const AnimatedBadge: React.FC<{
  text: string;
  tone?: 'info' | 'success' | 'warning' | 'error';
}> = ({ text, tone = 'info' }) => {
  const key = text;
  const opacity = React.useRef(new Animated.Value(1)).current;
  const scale = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    opacity.setValue(0);
    scale.setValue(0.95);
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 160,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 6, tension: 120 }),
    ]).start();
  }, [key]);

  return (
    <Animated.View style={{ opacity, transform: [{ scale }] }}>
      <InlineBadge text={text} tone={tone} />
    </Animated.View>
  );
};
