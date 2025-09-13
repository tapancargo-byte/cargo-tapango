import React from 'react'
import { XStack, YStack, Text, Square } from 'tamagui'
import { Ionicons } from '@expo/vector-icons'
import { useColors } from '../styles/ThemeProvider'

import { Animated, Pressable } from 'react-native'

export interface StatChipProps {
  icon: keyof typeof Ionicons.glyphMap
  label: string
  value: string
  tint?: string
  onPress?: () => void
}

export const StatChip: React.FC<StatChipProps> = ({ icon, label, value, tint, onPress }) => {
  const colors = useColors()
  const scale = React.useRef(new Animated.Value(1)).current as Animated.Value

  const pressIn = () => {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, friction: 6, tension: 140 }).start()
  }
  const pressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 6, tension: 140 }).start()
  }

  const content = (
    <XStack alignItems="center" space="$3" padding="$3" borderRadius="$4" backgroundColor={colors.surface} borderWidth={1} borderColor={colors.border}>
      <Square size={44} borderRadius="$3" backgroundColor={colors.surfaceVariant} alignItems="center" justifyContent="center">
        <Ionicons name={icon} size={20} color={tint || colors.primary} />
      </Square>
      <YStack>
        <Text color={colors.textSecondary}>{label}</Text>
        <Text fontSize={18} fontWeight="700">{value}</Text>
      </YStack>
    </XStack>
  )

  if (!onPress) {
    return <Animated.View style={{ transform: [{ scale }] }}>{content}</Animated.View>
  }
  return (
    <Pressable onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}>
      <Animated.View style={{ transform: [{ scale }] }}>{content}</Animated.View>
    </Pressable>
  )
}

