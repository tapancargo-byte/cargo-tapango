import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useColors } from '../styles/ThemeProvider'

export interface AppIconProps {
  name: keyof typeof Ionicons.glyphMap
  size?: number
  color?: string
  tintFallback?: keyof ReturnType<typeof useColors>
}

export const AppIcon: React.FC<AppIconProps> = ({ name, size = 18, color, tintFallback }) => {
  const colors = useColors()
  return <Ionicons name={name} size={size} color={color || (tintFallback ? (colors as any)[tintFallback] : colors.textSecondary)} />
}

