import { Label, Input as TInput, type InputProps, YStack, Text, XStack, Stack } from 'tamagui'
import { useColors } from '../../styles/ThemeProvider'
import { memo, useState } from 'react'
import { Platform } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated'

const AnimatedYStack = Animated.createAnimatedComponent(YStack) as any
const AnimatedTInput = Animated.createAnimatedComponent(TInput) as any

export interface PremiumInputProps extends InputProps {
  label?: string
  helper?: string
  error?: string | undefined
  required?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'default' | 'filled' | 'outlined' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Input = memo<PremiumInputProps>(({ 
  label,
  helper,
  error,
  required,
  leftIcon,
  rightIcon,
  variant = 'default',
  size = 'md',
  ...props 
}) => {
  const colors = useColors()
  const [isFocused, setIsFocused] = useState(false)
  
  const borderColor = useSharedValue(colors.border)
  const scale = useSharedValue(1)
  
  const animatedBorderStyle = useAnimatedStyle(() => {
    return {
      borderColor: borderColor.value,
      transform: [{ scale: scale.value }],
    }
  })
  
  const handleFocus = () => {
    setIsFocused(true)
    borderColor.value = withTiming(error ? colors.error : colors.borderFocus, { duration: 200 })
    scale.value = withSpring(1.02, { damping: 15, stiffness: 200 })
  }
  
  const handleBlur = () => {
    setIsFocused(false)
    borderColor.value = withTiming(error ? colors.error : colors.border, { duration: 200 })
    scale.value = withSpring(1, { damping: 15, stiffness: 200 })
  }
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'filled':
        return {
          backgroundColor: '$surfaceVariant',
          borderWidth: 0,
          borderColor: 'transparent',
        }
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: error ? '$danger' : isFocused ? '$borderColorFocus' : '$borderColor',
        }
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
          borderColor: 'transparent',
        }
      default:
        return {
          backgroundColor: '$backgroundStrong',
          borderWidth: 1,
          borderColor: error ? '$danger' : isFocused ? '$borderColorFocus' : '$borderColor',
        }
    }
  }
  
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          height: 36,
          paddingHorizontal: 12,
          fontSize: 14, // Fixed: Direct numeric value instead of '$subtitle'
        }
      case 'lg':
        return {
          height: 52,
          paddingHorizontal: 20,
          fontSize: 18, // Fixed: Direct numeric value instead of '$section'
        }
      default:
        return {
          height: 44,
          paddingHorizontal: 16,
          fontSize: 16, // Fixed: Direct numeric value instead of '$body'
        }
    }
  }
  
  const inputStyles = {
    borderRadius: '$3',
    ...getVariantStyles(),
    ...getSizeStyles(),
  }
  
  // Web-only subtle shadow via CSS, avoids RNW shadow warnings
  const webShadow = Platform.OS === 'web' ? { boxShadow: isFocused ? '0px 2px 8px rgba(0,0,0,0.12)' : '0px 1px 4px rgba(0,0,0,0.08)' } : undefined
  
  return (
<AnimatedYStack space="$2" asChild={false}>
      {label && (
        <Label 
          fontSize={14}
          fontWeight="600" 
          color={error ? '$danger' : isFocused ? '$primary' : '$color'}
        >
          {label}
          {required && <Text color="$danger"> *</Text>}
        </Label>
      )}
      
      <XStack alignItems="center" position="relative">
        {leftIcon && (
          <Stack 
            position="absolute" 
            left="$3" 
            zIndex={1}
            opacity={isFocused ? 1 : 0.6}
          >
            {leftIcon}
          </Stack>
        )}
        
        <AnimatedTInput
          style={[animatedBorderStyle as any, webShadow as any]}
          {...inputStyles}
          paddingLeft={leftIcon ? '$10' : 0}
          paddingRight={rightIcon ? '$10' : 0}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={colors.textSecondary}
          {...props}
        />
        
        {rightIcon && (
          <Stack 
            position="absolute" 
            right="$3" 
            zIndex={1}
            opacity={isFocused ? 1 : 0.6}
          >
            {rightIcon}
          </Stack>
        )}
      </XStack>
      
      {error ? (
<Animated.View>
          <Text fontSize={12} color="$danger" fontWeight="500">
            {error}
          </Text>
        </Animated.View>
      ) : helper ? (
        <Text fontSize={12} color="$colorPress" opacity={0.8}>
          {helper}
        </Text>
      ) : null}
    </AnimatedYStack>
  )
})

