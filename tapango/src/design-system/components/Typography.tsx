import React from 'react';
import { Text as TText } from 'tamagui';
import { getTokens, type ThemeMode } from '../tokens';
import { useIsDark } from '../../styles/ThemeProvider';
import { type BaseComponentProps, type FontWeight } from '../../ui/types';

export interface TypographyProps extends BaseComponentProps {
  mode?: ThemeMode;
  children?: React.ReactNode;
  color?: string;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  align?: 'left' | 'center' | 'right';
  // Additional props for direct styling support
  fontSize?: number;
  fontWeight?: FontWeight;
  fontFamily?: string;
  lineHeight?: number;
  letterSpacing?: number;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  textDecorationLine?: 'none' | 'underline' | 'line-through';
  numberOfLines?: number;
  selectable?: boolean;
  onPress?: () => void;
}

const weightMap = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const;

export const Typography: React.FC<TypographyProps> = ({ children }) => <>{children}</>;

// Resolve effective mode: if explicit `mode` prop is provided, prefer it.
// Otherwise, try ThemeProvider's isDark; if unavailable, default to 'light'.
const useEffectiveMode = (explicitMode?: ThemeMode): ThemeMode => {
  if (explicitMode) {
    return explicitMode;
  }
  try {
    const isDark = useIsDark();
    return isDark ? 'dark' : 'light';
  } catch {
    return 'light';
  }
};

const makeType =
  (key: keyof ReturnType<typeof getTokens>['typography']) =>
  ({
    children,
    mode,
    color,
    weight = 'regular',
    align = 'left',
    fontSize,
    fontWeight,
    fontFamily,
    lineHeight,
    letterSpacing,
    textTransform,
    textDecorationLine,
    numberOfLines,
    selectable,
    onPress,
    ...rest
  }: TypographyProps) => {
    const effectiveMode = useEffectiveMode(mode);
    const t = getTokens(effectiveMode);
    const defaultSize = (t.typography as any)[key] as number;
    const fw = (weightMap as any)[weight];

    const baseProps: Record<string, unknown> = {
      fontSize: fontSize || defaultSize,
      fontWeight: fontWeight || fw,
      textAlign: align as any,
      fontFamily,
      lineHeight,
      letterSpacing,
      textTransform,
      textDecorationLine,
      numberOfLines,
      selectable,
      onPress,
      ...rest,
    };

    // If an explicit color is provided, use it; otherwise let Tamagui theme color apply
    if (color) {
      (baseProps as any).color = color;
    }

    // Remove undefined values
    Object.keys(baseProps).forEach((key) => {
      if ((baseProps as any)[key] === undefined) {
        delete (baseProps as any)[key];
      }
    });

    return <TText {...(baseProps as any)}>{children}</TText>;
  };

export const Display = makeType('display');
export const Headline = makeType('headline');
export const Title = makeType('title');
export const Section = makeType('section');
export const Body = makeType('body');
export const Subtitle = makeType('subtitle');
export const Caption = makeType('caption');
export const Overline = ({ children, mode, color, fontSize, ...rest }: TypographyProps) => {
  const effectiveMode = useEffectiveMode(mode);
  const t = getTokens(effectiveMode);
  const props: Record<string, unknown> = {
    fontSize: fontSize || t.typography.caption,
    textTransform: 'uppercase',
    ...rest,
  };
  if (color) {
    (props as any).color = color;
  }

  // Remove undefined values
  Object.keys(props).forEach((key) => {
    if ((props as any)[key] === undefined) {
      delete (props as any)[key];
    }
  });

  return <TText {...(props as any)}>{children}</TText>;
};
