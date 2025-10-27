// @ts-nocheck
import React from 'react';

// Minimal but visual stub for @expo/vector-icons in Storybook web
// Draws lightweight SVGs for a handful of Feather names we use in stories/app
export const createIconSet = () => Icon;

function FeatherGlyph({ name, size, color }: { name?: string; size: number; color: string }) {
  // Normalize props
  const stroke = color || '#666';
  const s = size || 24;

  // Render a few useful Feather-like glyphs inline as SVG (not exact, but close)
  switch (name) {
    case 'home':
      return (
        <svg
          width={s}
          height={s}
          viewBox='0 0 24 24'
          fill='none'
          stroke={stroke}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M3 12L12 3l9 9' />
          <path d='M9 21V12h6v9' />
          <path d='M3 12v9h6M21 12v9h-6' />
        </svg>
      );
    case 'plus-circle':
      return (
        <svg
          width={s}
          height={s}
          viewBox='0 0 24 24'
          fill='none'
          stroke={stroke}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle cx='12' cy='12' r='9' />
          <path d='M12 8v8M8 12h8' />
        </svg>
      );
    case 'map-pin':
      return (
        <svg
          width={s}
          height={s}
          viewBox='0 0 24 24'
          fill='none'
          stroke={stroke}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10z' />
          <circle cx='12' cy='11' r='2.5' />
        </svg>
      );
    case 'list':
      return (
        <svg
          width={s}
          height={s}
          viewBox='0 0 24 24'
          fill='none'
          stroke={stroke}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M8 6h12M8 12h12M8 18h12' />
          <circle cx='4' cy='6' r='1' />
          <circle cx='4' cy='12' r='1' />
          <circle cx='4' cy='18' r='1' />
        </svg>
      );
    case 'user':
      return (
        <svg
          width={s}
          height={s}
          viewBox='0 0 24 24'
          fill='none'
          stroke={stroke}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle cx='12' cy='8' r='4' />
          <path d='M4 20c2.2-3 6-4 8-4s5.8 1 8 4' />
        </svg>
      );
    default:
      // Generic placeholder (small rounded square) for other icon names
      return (
        <div
          title={name}
          style={{
            display: 'inline-block',
            width: s,
            height: s,
            background: 'linear-gradient(135deg, rgba(200,200,220,0.35), rgba(160,160,190,0.2))',
            borderRadius: 4,
          }}
        />
      );
  }
}

export function Icon(props) {
  const { name, size = 24, color = '#666', style } = props || {};
  return (
    <span
      title={name}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        ...style,
      }}
    >
      <FeatherGlyph name={name} size={size} color={color} />
    </span>
  );
}

// Export common icon set names that apps often import directly
export const AntDesign = Icon;
export const Entypo = Icon;
export const EvilIcons = Icon;
export const Feather = Icon;
export const FontAwesome = Icon;
export const FontAwesome5 = Icon;
export const FontAwesome6 = Icon;
export const Fontisto = Icon;
export const Foundation = Icon;
export const Ionicons = Icon;
export const MaterialIcons = Icon;
export const MaterialCommunityIcons = Icon;
export const Octicons = Icon;
export const SimpleLineIcons = Icon;
export const Zocial = Icon;

export default {
  createIconSet,
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
};
