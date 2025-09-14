import {
  getTokens,
  tokensLight,
  tokensDark,
  type ThemeMode,
  type DesignTokens,
} from './tokens';

// Bridge to Tamagui theme shape used across the app
export const toTamaguiTheme = (tokens: DesignTokens) => ({
  background: tokens.colors.background,
  backgroundStrong: tokens.colors.surface,
  color: tokens.colors.text,
  colorPress: tokens.colors.textSecondary,
  primary: tokens.colors.primary,
  primaryPress: tokens.colors.primary,
  secondary: tokens.colors.secondary,
  secondaryPress: tokens.colors.secondary,
  accent: tokens.colors.accent,
  accentPress: tokens.colors.accent,
  success: tokens.colors.success,
  warning: tokens.colors.warning,
  danger: tokens.colors.danger,
  info: tokens.colors.info,
  backgroundTransparent:
    tokens.mode === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(26, 31, 46, 0.8)',
  backgroundBlur:
    tokens.mode === 'light' ? 'rgba(250,251,255,0.9)' : 'rgba(10, 14, 26, 0.9)',
  borderColor: tokens.colors.border,
  borderColorFocus: tokens.colors.borderFocus,
  borderColorHover: tokens.mode === 'light' ? '#42A5F5' : '#4FC3F7',
  shadowColor: tokens.shadows.level1,
  shadowColorStrong: tokens.shadows.level2,
});

export const getUnifiedTheme = (mode: ThemeMode) => getTokens(mode);
export const unifiedLight = tokensLight;
export const unifiedDark = tokensDark;
