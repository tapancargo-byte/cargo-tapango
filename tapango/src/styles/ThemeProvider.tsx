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
    background: '#FAFBFF',        // Subtle blue-tinted background
    surface: '#FFFFFF',           // Pure white cards
    surfaceVariant: '#F1F5FF',    // Light blue variant
    primary: '#0D47A1',           // Rich royal blue
    primaryContainer: '#E3F2FD',  // Light primary container
    secondary: '#5E35B1',         // Premium purple
    secondaryContainer: '#EDE7F6',
    text: '#1A1C1E',              // Rich dark text
    textSecondary: '#5F6368',     // Medium gray text
    textOnPrimary: '#FFFFFF',
    border: '#E8EAF6',            // Light border
    borderFocus: '#0D47A1',       // Primary focus border
    error: '#D32F2F',             // Material red
    errorContainer: '#FFEBEE',
    success: '#388E3C',           // Material green
    warning: '#F57C00',           // Material orange
    info: '#1976D2',              // Material blue
    overlay: 'rgba(26, 28, 30, 0.6)',
    shadow: 'rgba(26, 28, 30, 0.08)',
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
    background: '#0A0E1A',        // Deep space blue
    surface: '#1A1F2E',          // Dark surface with blue tint
    surfaceVariant: '#252D3F',    // Variant surface
    primary: '#4FC3F7',           // Bright cyan for dark mode
    primaryContainer: '#0D47A1',
    secondary: '#B39DDB',         // Light purple
    secondaryContainer: '#4527A0',
    text: '#F8FAFF',              // Off-white with blue tint
    textSecondary: '#B3C5EF',     // Light blue-gray
    textOnPrimary: '#0A0E1A',     // Dark text on bright primary
    border: '#37415A',            // Subtle blue-gray border
    borderFocus: '#4FC3F7',       // Bright focus border
    error: '#FF6B6B',             // Softer red for dark mode
    errorContainer: '#5D1A1A',
    success: '#4ECDC4',           // Turquoise success
    warning: '#FFD93D',           // Bright warning yellow
    info: '#4FC3F7',              // Primary info color
    overlay: 'rgba(10, 14, 26, 0.8)',
    shadow: 'rgba(0, 0, 0, 0.4)',
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
  return theme.colors as any as {
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
