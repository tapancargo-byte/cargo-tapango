import { createTamagui } from 'tamagui'
import { defaultConfig } from '@tamagui/config/v4'
import { getUnifiedTheme, toTamaguiTheme } from './src/design-system/theme'

// TAPANGO Premium Design System
const brand = {
  // Primary palette - Rich blues
  blue: '#0D47A1',
  blueLight: '#42A5F5',
  blueDark: '#01579B',
  cyan: '#4FC3F7',
  
  // Secondary palette - Premium purples
  indigo: '#5E35B1',
  purple: '#7B1FA2',
  purpleLight: '#B39DDB',
  
  // Accent colors
  amber: '#FF8F00',
  orange: '#FF6D00',
  teal: '#00BCD4',
  
  // Surface colors
  surface: '#FFFFFF',
  surfaceAlt: '#FAFBFF',
  surfaceVariant: '#F1F5FF',
  
  // Text colors
  text: '#1A1C1E',
  textMuted: '#5F6368',
  textLight: '#9E9E9E',
  
  // Status colors
  success: '#388E3C',
  warning: '#F57C00',
  danger: '#D32F2F',
  info: '#1976D2',
  
  // Gradients (as CSS strings)
  gradientPrimary: 'linear-gradient(135deg, #0D47A1 0%, #42A5F5 100%)',
  gradientSecondary: 'linear-gradient(135deg, #5E35B1 0%, #B39DDB 100%)',
  gradientSuccess: 'linear-gradient(135deg, #388E3C 0%, #66BB6A 100%)',
  gradientDanger: 'linear-gradient(135deg, #D32F2F 0%, #EF5350 100%)',
}

const themes = {
  ...defaultConfig.themes,
  tapango_light: {
    ...defaultConfig.themes.light,
    ...toTamaguiTheme(getUnifiedTheme('light')),
  },
  tapango_dark: {
    ...defaultConfig.themes.dark,
    ...toTamaguiTheme(getUnifiedTheme('dark')),
  },
}

const tokens = {
  ...(defaultConfig as any).tokens,
  // NOTE: We preserve default tokens and add/override only what app expects
  color: {
    ...(defaultConfig as any).tokens?.color,
    danger: brand.danger,
    success: brand.success,
    warning: brand.warning,
    info: brand.info,
    primary: brand.blue,
    secondary: brand.indigo,
  },
  radius: {
    ...defaultConfig.tokens.radius,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
  },
  size: {
    ...(defaultConfig as any).tokens?.size,
    caption: 12,
    subtitle: 14,
    body: 16,
    section: 18,
    title: 24,
    headline: 32,
    display: 40,
    buttonSm: 36,
    buttonMd: 44,
    buttonLg: 52,
    buttonXl: 60,
    iconXs: 16,
    iconSm: 20,
    iconMd: 24,
    iconLg: 32,
    iconXl: 40,
  },
  fontSize: {
    ...(defaultConfig as any).tokens?.fontSize,
    caption: 12,
    subtitle: 14,
    body: 16,
    section: 18,
    title: 24,
    headline: 32,
    display: 40,
  },
  space: {
    ...(defaultConfig as any).tokens?.space,
    0: 0,
    0.5: 2,
    1: 4,
    1.5: 6,
    2: 8,
    2.5: 10,
    3: 12,
    3.5: 14,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    24: 96,
    28: 112,
    32: 128,
  },
}

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  themes,
  tokens,
})

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

