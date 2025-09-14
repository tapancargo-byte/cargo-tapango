import React from 'react';
import { Text, YStack } from 'tamagui';
import { useColors, useIsDark } from '../styles/ThemeProvider';
import { font } from './tokens';

export interface InlineBadgeProps {
  text: string;
  tone?: 'info' | 'success' | 'warning' | 'error';
}

export const InlineBadge: React.FC<InlineBadgeProps> = ({ text, tone = 'info' }) => {
  const c = useColors();
  const isDark = useIsDark();
  // Choose backgrounds that meet or exceed 4.5:1 contrast in light mode with our palette
  // and readable translucent tints in dark mode.
  const light = {
    info: { bg: '#E3F2FD', fg: c.info || c.primary }, // blue tint
    success: { bg: '#E8F5E9', fg: c.success }, // green tint
    warning: { bg: '#FFF4E5', fg: c.warning }, // warm amber tint
    error: { bg: '#FFEBEE', fg: c.error }, // red tint
  } as const;
  const dark = {
    info: { bg: 'rgba(79,195,247,0.18)', fg: c.info || c.primary },
    success: { bg: 'rgba(78,205,196,0.20)', fg: c.success },
    warning: { bg: 'rgba(255,217,61,0.22)', fg: c.warning },
    error: { bg: 'rgba(255,107,107,0.22)', fg: c.error },
  } as const;
  // Compute accessible foreground: if brand fg doesn't reach 4.5:1, fall back to text color
  const toRgb = (cstr: string) => {
    if (cstr.startsWith('#')) {
      const hex = cstr.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return { r, g, b };
    }
    const match = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(cstr);
    if (match) {
      const [, rStr, gStr, bStr] = match;
      const r = rStr ? +rStr : 0;
      const g = gStr ? +gStr : 0;
      const b = bStr ? +bStr : 0;
      return { r, g, b };
    }
    return { r: 0, g: 0, b: 0 };
  };
  const sRGB = (c: number) => {
    const x = c / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  };
  const luminance = ({ r, g, b }: { r: number; g: number; b: number }) =>
    0.2126 * sRGB(r) + 0.7152 * sRGB(g) + 0.0722 * sRGB(b);
  const ratio = (fg: string, bg: string) => {
    const L1 = luminance(toRgb(fg));
    const L2 = luminance(toRgb(bg));
    const br = Math.max(L1, L2);
    const dk = Math.min(L1, L2);
    return (br + 0.05) / (dk + 0.05);
  };

  const map = isDark ? dark : light;
  const t = map[tone];
  const desiredFg = t.fg;
  const fallback = isDark ? c.text : c.text;
  const finalFg = ratio(desiredFg, t.bg) >= 4.5 ? desiredFg : fallback;

  return (
    <YStack paddingHorizontal='$2' paddingVertical='$1' borderRadius='$2' backgroundColor={t.bg}>
      <Text fontSize={font.caption} fontWeight='700' color={finalFg} textTransform='uppercase'>
        {text}
      </Text>
    </YStack>
  );
};
