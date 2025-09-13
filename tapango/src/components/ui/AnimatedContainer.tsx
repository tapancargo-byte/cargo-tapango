import React, { useEffect } from 'react';
import { Animated, ViewProps } from 'react-native';

interface AnimatedContainerProps extends ViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  animationType?: 'fadeIn' | 'slideUp' | 'scaleIn';
}

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  delay = 0,
  duration = 600,
  animationType = 'fadeIn',
  style,
  ...props
}) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [animatedValue, delay, duration]);

  const getAnimatedStyle = () => {
    switch (animationType) {
      case 'fadeIn':
        return {
          opacity: animatedValue,
        };
      case 'slideUp':
        return {
          opacity: animatedValue,
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0],
              }),
            },
          ],
        };
      case 'scaleIn':
        return {
          opacity: animatedValue,
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
          ],
        };
      default:
        return { opacity: animatedValue };
    }
  };

  return (
    <Animated.View style={[getAnimatedStyle(), style]} {...props}>
      {children}
    </Animated.View>
  );
};
