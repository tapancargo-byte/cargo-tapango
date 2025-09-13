import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useColors } from '../styles/ThemeProvider'
import { YStack } from 'tamagui'

export const Illustration: React.FC<{ icon?: keyof typeof Ionicons.glyphMap; size?: number }>
  = ({ icon = 'image-outline', size = 64 }) => {
  const c = useColors()
  return (
    <YStack width={size + 24} height={size + 24} alignItems="center" justifyContent="center" borderRadius={size} backgroundColor={c.surfaceVariant}>
      <Ionicons name={icon} size={size} color={c.textSecondary} />
    </YStack>
  )
}
