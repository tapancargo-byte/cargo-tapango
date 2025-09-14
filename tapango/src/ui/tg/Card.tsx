import { type CardProps, Stack, Card as TCard, YStack } from 'tamagui';
import { memo } from 'react';
import { BlurView } from 'expo-blur';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Platform } from 'react-native';

export interface PremiumCardProps extends CardProps {
  variant?: 'default' | 'glass' | 'elevated' | 'outlined' | 'flat';
  blur?: boolean;
  animation?: 'fade' | 'slide' | 'none';
  hover?: boolean;
  gradient?: boolean;
}

const AnimatedView = Animated.createAnimatedComponent((props: any) => <YStack {...props} />) as any;
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

// Premium Card with glassmorphism and animations
export const Card = memo<PremiumCardProps>(
  ({
    variant = 'default',
    blur = false,
    animation = 'fade',
    hover = false,
    gradient = false,
    children,
    ...props
  }) => {
    const getVariantStyles = () => {
      switch (variant) {
        case 'glass':
          return {
            backgroundColor: '$backgroundTransparent',
            borderColor: '$borderColor',
            borderWidth: 1,
            elevation: 8,
          };
        case 'elevated':
          return {
            backgroundColor: '$backgroundStrong',
            borderColor: 'transparent',
            borderWidth: 0,
            elevation: 12,
          };
        case 'outlined':
          return {
            backgroundColor: 'transparent',
            borderColor: '$borderColor',
            borderWidth: 1.5,
            elevation: 0,
          };
        case 'flat':
          return {
            backgroundColor: '$backgroundStrong',
            borderColor: 'transparent',
            borderWidth: 0,
            elevation: 0,
          };
        default:
          return {
            backgroundColor: '$backgroundStrong',
            borderColor: '$borderColor',
            borderWidth: 0.5,
            elevation: 3,
          };
      }
    };

    const getAnimationProps = () => {
      switch (animation) {
        case 'slide':
          return {
            entering: FadeInUp.duration(600).springify().damping(15).stiffness(150),
          };
        case 'fade':
          return {
            entering: FadeInDown.duration(400).springify().damping(20).stiffness(100),
          };
        default:
          return {};
      }
    };

    const cardStyles = {
      borderRadius: '$4',
      overflow: 'hidden' as const,
      ...getVariantStyles(),
      ...(hover && {
        pressStyle: {
          scale: 0.98,
          opacity: 0.9,
        },
        hoverStyle:
          Platform.OS === 'web'
            ? ({ boxShadow: '0px 16px 40px rgba(0,0,0,0.20)' } as any)
            : ({ elevation: 16 } as any),
      }),
    };

    if (blur && variant === 'glass') {
      return (
        <AnimatedView {...getAnimationProps()}>
          <TCard {...cardStyles} backgroundColor='transparent' {...props}>
            <AnimatedBlurView
              intensity={20}
              tint='light'
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />
            <YStack padding='$4' space='$3' position='relative'>
              {children}
            </YStack>
          </TCard>
        </AnimatedView>
      );
    }

    return (
      <AnimatedView {...getAnimationProps()}>
        <TCard {...cardStyles} {...props}>
          <YStack padding='$4' space='$3'>
            {children}
          </YStack>
        </TCard>
      </AnimatedView>
    );
  }
);

// Specialized card variants for common use cases
export const GlassCard = (props: Omit<PremiumCardProps, 'variant'>) => (
  <Card variant='glass' {...props} />
);

export const ElevatedCard = (props: Omit<PremiumCardProps, 'variant'>) => (
  <Card variant='elevated' {...props} />
);

export const OutlinedCard = (props: Omit<PremiumCardProps, 'variant'>) => (
  <Card variant='outlined' {...props} />
);

export const FlatCard = (props: Omit<PremiumCardProps, 'variant'>) => (
  <Card variant='flat' {...props} />
);
