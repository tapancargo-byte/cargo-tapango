import { Stack, Text } from 'tamagui';
import { Circle } from './Primitives';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { useColors } from '../styles/ThemeProvider';
import { useEffect } from 'react';

const AnimatedStack = Animated.createAnimatedComponent(Stack) as any;
const AnimatedCircle = Animated.createAnimatedComponent(Circle as any) as any;

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'dots' | 'pulse';
  color?: string;
}

export const LoadingSpinner = ({
  size = 'md',
  variant = 'primary',
  color,
}: LoadingSpinnerProps) => {
  const colors = useColors();
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  const getSizeValue = () => {
    switch (size) {
      case 'sm':
        return 16;
      case 'md':
        return 24;
      case 'lg':
        return 32;
      case 'xl':
        return 48;
      default:
        return 24;
    }
  };

  const spinnerColor = color || colors.primary;
  const sizeValue = getSizeValue();

  useEffect(() => {
    if (variant === 'pulse') {
      scale.value = withRepeat(
        withSequence(withTiming(1.2, { duration: 600 }), withTiming(1, { duration: 600 })),
        -1,
        false
      );
    } else {
      rotation.value = withRepeat(withTiming(360, { duration: 1000 }), -1, false);
    }
  }, [variant]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
    };
  });

  if (variant === 'dots') {
    return (
      <Stack flexDirection='row' alignItems='center' gap='$2'>
        {[0, 1, 2].map((index) => {
          const dotScale = useSharedValue(1);

          useEffect(() => {
            dotScale.value = withRepeat(
              withSequence(withTiming(1.3, { duration: 400 }), withTiming(1, { duration: 400 })),
              -1,
              false
            );
          }, []);

          const dotAnimatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: dotScale.value }],
          }));

          return (
            <AnimatedStack key={index} style={dotAnimatedStyle}>
              <Circle size={sizeValue / 3} backgroundColor={spinnerColor} />
            </AnimatedStack>
          );
        })}
      </Stack>
    );
  }

  if (variant === 'pulse') {
    return (
      <AnimatedStack style={animatedStyle}>
        <Circle size={sizeValue} backgroundColor={spinnerColor} opacity={0.6} />
      </AnimatedStack>
    );
  }

  return (
    <AnimatedStack style={animatedStyle}>
      <Circle
        size={sizeValue}
        borderWidth={2}
        borderColor={spinnerColor}
        borderTopColor='transparent'
      />
    </AnimatedStack>
  );
};

export const LoadingOverlay = ({
  visible = true,
  text = 'Loading...',
}: {
  visible?: boolean;
  text?: string;
}) => {
  const colors = useColors();

  if (!visible) return null;

  return (
    <Stack
      position='absolute'
      top={0}
      left={0}
      right={0}
      bottom={0}
      backgroundColor={colors.overlay}
      alignItems='center'
      justifyContent='center'
      zIndex={9999}
    >
      <Stack
        backgroundColor={colors.surface}
        padding='$6'
        borderRadius='$4'
        alignItems='center'
        gap='$4'
        // Keep RN-native shadow props for native; Storybook web will rely on CSS boxShadow via style prop
        style={{
          boxShadow: '0px 8px 16px rgba(0,0,0,0.12)',
        }}
      >
        <LoadingSpinner size='lg' />
        <Text fontSize={16} color={colors.text} fontWeight='500'>
          {text}
        </Text>
      </Stack>
    </Stack>
  );
};
