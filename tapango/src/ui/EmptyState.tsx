import React from 'react'
import { YStack, Text, Button as TButton } from 'tamagui'
import { useColors } from '../styles/ThemeProvider'
import { Ionicons } from '@expo/vector-icons'
import { Illustration } from './Illustration'
import { font } from './tokens'

interface EmptyStateProps {
  title: string
  subtitle?: string
  actionLabel?: string
  onAction?: () => void
  icon?: keyof typeof Ionicons.glyphMap
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle, actionLabel, onAction, icon = 'cube-outline' }) => {
  const colors = useColors();
  return (
    <YStack alignItems="center" justifyContent="center" padding="$6" space="$3">
      <Illustration icon={icon} size={72} />
      <Text fontSize={font.headline} fontWeight="700" color={colors.textSecondary} textAlign="center">{title}</Text>
      {subtitle ? (
        <Text fontSize={font.caption} opacity={0.8} textAlign="center" maxWidth={360}>{subtitle}</Text>
      ) : null}
      {actionLabel && onAction ? (
        <TButton onPress={onAction} marginTop="$2">{actionLabel}</TButton>
      ) : null}
    </YStack>
  )
}
