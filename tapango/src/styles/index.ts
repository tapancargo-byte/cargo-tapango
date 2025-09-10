import { colors } from './colors';
import { typography, textStyles } from './typography';
import { spacing, borderRadius, shadows, layout } from './spacing';

export { colors } from './colors';
export { typography, textStyles } from './typography';
export { spacing, borderRadius, shadows, layout } from './spacing';

export type { ColorPalette } from './colors';
export type { Typography, TextStyles } from './typography';
export type { Spacing, BorderRadius, Shadows, Layout } from './spacing';

// Combined theme object
export const theme = {
  colors,
  typography,
  textStyles,
  spacing,
  borderRadius,
  shadows,
  layout,
} as const;

export type Theme = typeof theme;
