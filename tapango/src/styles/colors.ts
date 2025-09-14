export const colors = {
  primary: {
    blue: '#1E40AF', // Primary blue
    lightBlue: '#3B82F6', // Lighter blue for accents
    darkBlue: '#1E3A8A', // Darker blue for depth
    navy: '#0F172A', // Deep navy for contrast
    orange: '#F97316', // Orange for accents and CTAs
  },
  secondary: {
    lightBlue: '#EFF6FF', // Very light blue background
    skyBlue: '#DBEAFE', // Sky blue for highlights
    indigo: '#6366F1', // Indigo for variety
    cyan: '#06B6D4', // Cyan for success states
  },
  neutral: {
    darkGray: '#1F2937',
    mediumGray: '#6B7280',
    lightGray: '#F3F4F6',
    white: '#FFFFFF',
    black: '#000000',
    slate: '#64748B',
  },
  gradients: {
    primary: ['#1E40AF', '#3B82F6', '#60A5FA'], // Enhanced blue gradient
    secondary: ['#EFF6FF', '#DBEAFE'], // Light blue gradient
    service: ['#1E3A8A', '#1E40AF'], // Dark blue gradient
    dark: ['#0F172A', '#1F2937'], // Dark gradient
    accent: ['#6366F1', '#3B82F6'], // Accent gradient
    premium: ['#667EEA', '#764BA2'], // Premium purple-blue
    sunset: ['#FF6B6B', '#4ECDC4'], // Sunset colors
    ocean: ['#2193B0', '#6DD5ED'], // Ocean gradient
    elegant: ['#134E5E', '#71B280'], // Elegant teal
    modern: ['#667EEA', '#764BA2', '#F093FB'], // Modern multi-color
  },
  opacity: {
    transparent: 'transparent',
    semiTransparent: 'rgba(30, 64, 175, 0.5)', // Blue semi-transparent
    lightTransparent: 'rgba(255, 255, 255, 0.1)',
    darkTransparent: 'rgba(15, 23, 42, 0.1)', // Navy transparent
    blueTransparent: 'rgba(59, 130, 246, 0.1)', // Light blue transparent
    glassMorphism: 'rgba(255, 255, 255, 0.25)', // Glass-morphism effect
    cardOverlay: 'rgba(255, 255, 255, 0.95)', // Card overlay with blur
    backdrop: 'rgba(0, 0, 0, 0.3)', // Backdrop overlay
  },
  status: {
    success: '#10B981', // Emerald green
    warning: '#F59E0B', // Amber
    error: '#EF4444', // Red
    info: '#3B82F6', // Blue (consistent with theme)
  },
} as const;

export type ColorPalette = typeof colors;
