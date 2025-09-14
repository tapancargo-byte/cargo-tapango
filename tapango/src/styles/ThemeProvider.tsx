import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { textStyles, typography } from './typography';
import { borderRadius, shadows, spacing } from './spacing';
import { type DesignTokens, getTokens } from '../design-system/tokens';

export type ColorScheme = 'light' | 'dark' | 'system';

interface Theme {
  tokens: DesignTokens;
  colors: DesignTokens['colors'];
  typography: typeof typography;
  textStyles: typeof textStyles;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  shadows: typeof shadows;
  isDark: boolean;
}

// Derive Theme colors directly from unified design tokens to keep parity with Tamagui
const lightTokens = getTokens('light');
const darkTokens = getTokens('dark');

const lightTheme: Theme = {
  tokens: lightTokens,
  colors: lightTokens.colors,
  typography,
  textStyles,
  spacing,
  borderRadius,
  shadows,
  isDark: false,
};

const darkTheme: Theme = {
  tokens: darkTokens,
  colors: darkTokens.colors,
  typography,
  textStyles,
  spacing,
  borderRadius,
  shadows,
  isDark: true,
};

interface ThemeContextType {
  theme: Theme;
  colorScheme: ColorScheme;
  toggleColorScheme: (scheme: ColorScheme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@tapango_color_scheme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  // Default to light theme for premium feel
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  // Load saved color scheme on mount
  useEffect(() => {
    const loadColorScheme = async () => {
      try {
        const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (saved && ['light', 'dark', 'system'].includes(saved)) {
          setColorScheme(saved as ColorScheme);
        } else {
          // No saved preference: remain on default 'light'
          setColorScheme('light');
        }
      } catch (error) {
        console.warn('Failed to load color scheme preference:', error);
      }
    };
    loadColorScheme();
  }, []);

  const toggleColorScheme = async (scheme: ColorScheme) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, scheme);
      setColorScheme(scheme);
    } catch (error) {
      console.warn('Failed to save color scheme preference:', error);
      setColorScheme(scheme); // Still update in memory
    }
  };

  // Determine effective theme
  const effectiveScheme = colorScheme === 'system' ? systemColorScheme : colorScheme;
  const isDark = effectiveScheme === 'dark';
  const theme = isDark ? darkTheme : lightTheme; // colors are unified with Tamagui tokens

  const contextValue: ThemeContextType = {
    theme,
    colorScheme,
    toggleColorScheme,
    isDark,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Convenience hooks
export const useColors = () => {
  const { theme } = useTheme();
  return theme.colors;
};

export const useIsDark = () => {
  const { isDark } = useTheme();
  return isDark;
};

// Style helpers for common patterns
export const createThemedStyles = <T extends Record<string, any>>(
  styleFactory: (theme: Theme) => T
) => {
  return (theme: Theme): T => styleFactory(theme);
};

// WCAG 2.2 AA compliance helpers
export const getContrastRatio = (color1: string, color2: string): number => {
  // Simple contrast ratio calculation
  // In production, you'd use a more sophisticated color library
  const getLuminance = (color: string): number => {
    // Simplified luminance calculation
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    return 0.299 * r + 0.587 * g + 0.114 * b;
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};

export const isAccessible = (foreground: string, background: string): boolean => {
  return getContrastRatio(foreground, background) >= 4.5;
};
