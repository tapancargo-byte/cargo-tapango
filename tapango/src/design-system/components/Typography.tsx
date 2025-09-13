import React from 'react'
import { Text as TText } from 'tamagui'
import { getTokens, type ThemeMode } from '../tokens'
import { useIsDark } from '../../styles/ThemeProvider'

export interface TypographyProps {
  mode?: ThemeMode
  children?: React.ReactNode
  color?: string
  weight?: 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold'
  align?: 'left' | 'center' | 'right'
}

const weightMap = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const

export const Typography: React.FC<TypographyProps> = ({ children }) => <>{children}</>

// Resolve effective mode: if explicit `mode` prop is provided, prefer it.
// Otherwise, try ThemeProvider's isDark; if unavailable, default to 'light'.
const useEffectiveMode = (explicitMode?: ThemeMode): ThemeMode => {
  if (explicitMode) return explicitMode
  try {
    const isDark = useIsDark()
    return isDark ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

const makeType = (key: keyof ReturnType<typeof getTokens>['typography']) =>
  ({ children, mode, color, weight = 'regular', align = 'left' }: TypographyProps) => {
    const effectiveMode = useEffectiveMode(mode)
    const t = getTokens(effectiveMode)
    const size = (t.typography as any)[key] as number
    const fw = (weightMap as any)[weight]
    const baseProps: any = { fontSize: size, fontWeight: fw, textAlign: align as any }
    // If an explicit color is provided, use it; otherwise let Tamagui theme color apply
    if (color) baseProps.color = color
    return (
      <TText {...baseProps}>
        {children}
      </TText>
    )
  }

export const Display = makeType('display')
export const Headline = makeType('headline')
export const Title = makeType('title')
export const Section = makeType('section')
export const Body = makeType('body')
export const Subtitle = makeType('subtitle')
export const Caption = makeType('caption')
export const Overline = ({ children, mode, color }: { children?: React.ReactNode; mode?: ThemeMode; color?: string }) => {
  const effectiveMode = useEffectiveMode(mode)
  const t = getTokens(effectiveMode)
  const props: any = { fontSize: t.typography.caption, textTransform: 'uppercase' }
  if (color) props.color = color
  return (
    <TText {...props}>
      {children}
    </TText>
  )
}
