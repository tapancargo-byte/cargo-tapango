import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from './colors';
import { typography, textStyles } from './typography';
import { spacing, borderRadius, shadows } from './spacing';

export type ColorScheme = 'light' | 'dark' | 'system';

interface Theme {
  colors: {
    background: string;
    surface: string;
    surfaceVariant: string;
    primary: string;
    primaryContainer: string;
    secondary: string;
    secondaryContainer: string;
    text: string;
    textSecondary: string;
    textOnPrimary: string;
    border: string;
    borderFocus: string;
    error: string;
    errorContainer: string;
    success: string;
    warning: string;
    info: string;
    overlay: string;
    shadow: string;
  };
  typography: typeof typography;
  textStyles: typeof textStyles;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  shadows: typeof shadows;
  isDark: boolean;
}

// WCAG 2.2 AA compliant color themes
const lightTheme: Theme = {
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceVariant: '#F8FAFC',
    primary: colors.primary.blue,
    primaryContainer: '#EFF6FF',
    secondary: colors.secondary.indigo,
    secondaryContainer: '#E0E7FF',
    text: '#0F172A',           // 4.5:1 contrast on white
    textSecondary: '#475569',  // 4.5:1 contrast on white
    textOnPrimary: '#FFFFFF',
    border: '#E2E8F0',
    borderFocus: colors.primary.blue,
    error: colors.status.error,
    errorContainer: '#FEE2E2',
    success: colors.status.success,
    warning: colors.status.warning,
    info: colors.status.info,
    overlay: 'rgba(15, 23, 42, 0.5)',
    shadow: 'rgba(15, 23, 42, 0.1)',
  },
  typography,
  textStyles,
  spacing,
  borderRadius,
  shadows,
  isDark: false,
};

const darkTheme: Theme = {
  colors: {
    background: '#0F172A',     // Dark navy
    surface: '#1E293B',       // Lighter navy
    surfaceVariant: '#334155', // Even lighter
    primary: '#60A5FA',       // Lighter blue for dark mode
    primaryContainer: '#1E3A8A',
    secondary: '#818CF8',     // Lighter indigo
    secondaryContainer: '#3730A3',
    text: '#F8FAFC',          // Near white, high contrast
    textSecondary: '#CBD5E1',  // Light gray, 4.5:1 contrast
    textOnPrimary: '#0F172A',
    border: '#334155',
    borderFocus: '#60A5FA',
    error: '#F87171',         // Lighter red for dark mode
    errorContainer: '#7F1D1D',
    success: '#34D399',       // Lighter green
    warning: '#FBBF24',       // Lighter amber
    info: '#60A5FA',
    overlay: 'rgba(0, 0, 0, 0.7)',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
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
  const [colorScheme, setColorScheme] = useState<ColorScheme>('system');

  // Load saved color scheme on mount
  useEffect(() => {
    const loadColorScheme = async () => {
      try {
        const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (saved && ['light', 'dark', 'system'].includes(saved)) {
          setColorScheme(saved as ColorScheme);
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
  const theme = isDark ? darkTheme : lightTheme;

  const contextValue: ThemeContextType = {
    theme,
    colorScheme,
    toggleColorScheme,
    isDark,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
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
