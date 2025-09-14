import React from 'react';
import { YStack, useTheme } from 'tamagui';
import { Animated, Easing } from 'react-native';
import { useColors } from '../../styles/ThemeProvider';

export const Skeleton: React.FC<
  { height?: number; width?: number; radius?: number } & React.ComponentProps<typeof YStack>
> = ({ height = 16, width = '100%' as any, radius = 8, ...rest }) => {
  const colors = useColors();
  const opacity = React.useRef(new Animated.Value(0.6)).current;

  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.6,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View style={{ opacity }}>
      <YStack
        backgroundColor={colors.surfaceVariant}
        borderRadius={radius}
        height={height}
        width={width as any}
        {...rest}
      />
    </Animated.View>
  );
};

export const SkeletonText: React.FC<{ lines?: number; lineHeight?: number; gap?: number }> = ({
  lines = 3,
  lineHeight = 14,
  gap = 8,
}) => {
  return (
    <YStack space={gap}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={lineHeight}
          width={i === lines - 1 ? ('60%' as any) : ('100%' as any)}
        />
      ))}
    </YStack>
  );
};
