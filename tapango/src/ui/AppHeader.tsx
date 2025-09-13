import React from 'react'
import { YStack, XStack, Text } from 'tamagui'
import { useColors } from '../styles/ThemeProvider'
import { font } from './tokens'

export interface AppHeaderProps {
  title: string
  subtitle?: string
  right?: React.ReactNode
  bottom?: React.ReactNode
}

export const AppHeader: React.FC<AppHeaderProps> = ({ title, subtitle, right, bottom }) => {
  const c = useColors()
  return (
    <YStack padding="$4" paddingBottom="$2" backgroundColor="$background" borderBottomWidth={1} borderColor={c.border}>
      <XStack justifyContent="space-between" alignItems="center">
        <YStack>
          <Text fontSize={font.title} fontWeight="700">{title}</Text>
          {subtitle ? <Text color={c.textSecondary} fontSize={font.subtitle}>{subtitle}</Text> : null}
        </YStack>
        {right}
      </XStack>
      {bottom ? <YStack marginTop="$2">{bottom}</YStack> : null}
    </YStack>
  )
}
