import React from 'react'
import { ViewStyle, StyleProp } from 'react-native'
import { YStack } from 'tamagui'
import { BlurView } from 'expo-blur'
import Animated from 'react-native-reanimated'
import { getTokens, type ThemeMode } from '../tokens'
import { useIsDark } from '../../styles/ThemeProvider'
import { Platform } from 'react-native'

export type CardVariant = 'default' | 'glass' | 'elevated' | 'outlined' | 'flat'

export interface CardProps {
  children?: React.ReactNode
  variant?: CardVariant
  style?: StyleProp<ViewStyle>
  padding?: number
  hover?: boolean
  animation?: string
  mode?: ThemeMode
  // passthrough layout props
  [key: string]: any
}

// Prefer explicit mode prop; otherwise fall back to ThemeProvider; finally default to light.
const useEffectiveMode = (explicitMode?: ThemeMode): ThemeMode => {
  if (explicitMode) return explicitMode
  try {
    const isDark = useIsDark()
    return isDark ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

const BaseCard: React.FC<CardProps> = ({ children, style, padding = 12, mode, ...rest }) => {
  const effectiveMode = useEffectiveMode(mode)
  const tokens = getTokens(effectiveMode)
  return (
    <YStack
      backgroundColor={tokens.colors.surface}
      borderRadius={12}
      padding={padding}
      borderWidth={0}
      {...rest}
      style={style as any}
    >
      {children}
    </YStack>
  )
}

export const Card: React.FC<CardProps> = (props) => {
  const { variant = 'default', mode } = props
  const effectiveMode = useEffectiveMode(mode)
  const tokens = getTokens(effectiveMode)

  if (variant === 'glass') return <GlassCard {...props} />
  if (variant === 'elevated') return <ElevatedCard {...props} />
  if (variant === 'outlined') return <OutlinedCard {...props} />
  if (variant === 'flat') return <FlatCard {...props} />

  return (
    <YStack backgroundColor={tokens.colors.surface} borderRadius={12} padding={props.padding ?? 12} style={props.style as any}>
      {props.children}
    </YStack>
  )
}

export const GlassCard: React.FC<CardProps> = ({ children, style, padding = 12, mode, ...rest }) => {
  const effectiveMode = useEffectiveMode(mode)
  const tokens = getTokens(effectiveMode)
  return (
    <YStack borderRadius={12} overflow="hidden" {...rest}>
      <BlurView intensity={50} tint={effectiveMode === 'dark' ? 'dark' : 'light'} style={{ borderRadius: 12 }}>
        <YStack padding={padding} backgroundColor={tokens.mode === 'light' ? 'rgba(255,255,255,0.6)' : 'rgba(26,31,46,0.4)'} style={style as any}>
          {children}
        </YStack>
      </BlurView>
    </YStack>
  )
}

export const ElevatedCard: React.FC<CardProps> = ({ children, style, padding = 12, mode, ...rest }) => {
  const effectiveMode = useEffectiveMode(mode)
  const tokens = getTokens(effectiveMode)
  const shadowStyle = Platform.OS === 'web'
    ? ({ boxShadow: '0px 8px 16px rgba(0,0,0,0.15)' } as any)
    : ({ shadowColor: tokens.shadows.level2, shadowOpacity: 0.2, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 8 } as any)
  return (
    <YStack
      backgroundColor={tokens.colors.surface}
      borderRadius={12}
      padding={padding}
      style={[shadowStyle, style as any]}
      {...rest}
    >
      {children}
    </YStack>
  )
}

export const OutlinedCard: React.FC<CardProps> = ({ children, style, padding = 12, mode, ...rest }) => {
  const effectiveMode = useEffectiveMode(mode)
  const tokens = getTokens(effectiveMode)
  return (
    <YStack backgroundColor={tokens.colors.surface} borderRadius={12} padding={padding} borderWidth={1} borderColor={tokens.colors.border} style={style as any} {...rest}>
      {children}
    </YStack>
  )
}

export const FlatCard: React.FC<CardProps> = ({ children, style, padding = 12, mode, ...rest }) => {
  const effectiveMode = useEffectiveMode(mode)
  const tokens = getTokens(effectiveMode)
  return (
    <YStack backgroundColor={tokens.colors.surfaceVariant} borderRadius={12} padding={padding} style={style as any} {...rest}>
      {children}
    </YStack>
  )
}
