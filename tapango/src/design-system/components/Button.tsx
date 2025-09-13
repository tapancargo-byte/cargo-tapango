import React from 'react'
import { Pressable, ViewStyle, StyleProp, PressableProps } from 'react-native'
import { Text, XStack, Stack } from 'tamagui'
import * as Haptics from 'expo-haptics'
import Animated from 'react-native-reanimated'
import { getTokens, type ThemeMode } from '../tokens'
import { usePressableScale } from '../animations'
import { useIsDark } from '../../styles/ThemeProvider'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'danger' | 'success'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface ButtonProps extends Omit<PressableProps, 'onPress' | 'style'> {
  children?: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  disabled?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onPress?: () => void | Promise<void>
  style?: StyleProp<ViewStyle>
  mode?: ThemeMode // defaults to light; consumers typically get colors from ThemeProvider
  flex?: number
  loading?: boolean
  animation?: string
  title?: string
  marginTop?: number | string
  borderRadius?: number
}

const sizeStyles: Record<ButtonSize, { height: number; paddingHorizontal: number; fontSize: number; icon: number }> = {
  xs: { height: 28, paddingHorizontal: 10, fontSize: 12, icon: 12 },
  sm: { height: 36, paddingHorizontal: 12, fontSize: 14, icon: 14 },
  md: { height: 44, paddingHorizontal: 16, fontSize: 16, icon: 16 },
  lg: { height: 52, paddingHorizontal: 18, fontSize: 16, icon: 18 },
  xl: { height: 60, paddingHorizontal: 20, fontSize: 18, icon: 20 },
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth,
  disabled,
  leftIcon,
  rightIcon,
  onPress,
  style,
  mode = 'light',
  flex,
  loading,
  animation,
  title,
  marginTop,
  borderRadius,
  ...rest
}) => {
  const isDark = (() => {
    try { return useIsDark() } catch { return mode === 'dark' }
  })()
  const tokens = getTokens(isDark ? 'dark' : 'light')
  const { animatedStyle, onPressIn, onPressOut } = usePressableScale()
  const dims = sizeStyles[size]

  const palette = tokens.colors
  const baseColor =
    variant === 'primary' ? palette.primary :
    variant === 'secondary' ? palette.secondary :
    variant === 'danger' ? palette.danger :
    variant === 'success' ? palette.success :
    palette.primary

  const backgroundColor =
    variant === 'outline' || variant === 'ghost' ? 'transparent' : baseColor

  const textColor =
    variant === 'outline' || variant === 'ghost'
      ? (isDark ? palette.text : palette.text)
      : palette.textOnPrimary

  const borderColor = variant === 'outline' ? baseColor : 'transparent'
  const opacity = disabled ? 0.6 : 1

  const handlePress = async () => {
    if (disabled) return
    try {
      await Haptics.selectionAsync()
    } catch {}
    await onPress?.()
  }

  const resolvedMarginTop = typeof marginTop === 'string' && marginTop.startsWith('$')
    ? (() => { try { return (tokens.spacing as any)[marginTop.slice(1)] ?? 0 } catch { return 0 } })()
    : (typeof marginTop === 'number' ? marginTop : undefined)

  return (
    <Animated.View style={[{ width: fullWidth ? '100%' : undefined, flex, marginTop: resolvedMarginTop }, animatedStyle]}>
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={handlePress}
        disabled={disabled}
        style={[
          {
            height: dims.height,
            paddingHorizontal: dims.paddingHorizontal,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor,
            borderRadius: borderRadius ?? 12,
            borderWidth: borderColor === 'transparent' ? 0 : 1,
            borderColor,
            opacity,
          },
          style as any,
        ]}
        accessibilityRole={rest.accessibilityRole ?? 'button'}
        {...rest}
      >
        <XStack alignItems="center" justifyContent="center" space="$2">
          {leftIcon ? <Stack>{leftIcon}</Stack> : null}
          <Text color={textColor} fontWeight="700" fontSize={dims.fontSize}>
            {children ?? title}
          </Text>
          {rightIcon ? <Stack>{rightIcon}</Stack> : null}
        </XStack>
      </Pressable>
    </Animated.View>
  )
}
