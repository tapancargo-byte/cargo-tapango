import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { StorageService } from '../utils/storage';

type ThemeMode = 'light' | 'dark' | 'auto';
type ColorScheme = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  colorScheme: ColorScheme;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  isTransitioning: boolean;
  themeAnimationValue: any; // SharedValue<number>, typed loosely to avoid dependency on reanimated types
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeManagerProps {
  children: React.ReactNode;
}

export const ThemeManager: React.FC<ThemeManagerProps> = ({ children }) => {
  const systemColorScheme = useColorScheme() || 'light';
  const [mode, setMode] = useState<ThemeMode>('auto');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const themeAnimationValue = useSharedValue(0);

  // Determine effective color scheme based on mode
  const colorScheme: ColorScheme =
    mode === 'auto' ? systemColorScheme : mode === 'dark' ? 'dark' : 'light';

  // Load saved theme preference on mount
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedMode = await StorageService.getItem?.('theme_mode');
        if (savedMode && (['light', 'dark', 'auto'] as string[]).includes(String(savedMode))) {
          setMode(savedMode as ThemeMode);
          // Set animation value without animation on initial load
          themeAnimationValue.value = savedMode === 'dark' ? 1 : 0;
        }
      } catch (error) {
        console.warn('Failed to load theme preference:', error);
      }
    };

    loadThemePreference();
  }, []);

  // Update animation value when color scheme changes
  useEffect(() => {
    themeAnimationValue.value = withTiming(colorScheme === 'dark' ? 1 : 0, {
      duration: 300,
    });
  }, [colorScheme]);

  const setThemeMode = async (newMode: ThemeMode) => {
    try {
      setIsTransitioning(true);

      // Smooth transition animation
      themeAnimationValue.value = withSpring(newMode === 'dark' ? 1 : 0, {
        damping: 15,
        stiffness: 200,
      });

      // Save preference
      await StorageService.setItem?.('theme_mode', newMode);
      setMode(newMode);

      // Reset transitioning state after animation
      setTimeout(() => setIsTransitioning(false), 400);
    } catch (error) {
      console.error('Failed to set theme mode:', error);
      setIsTransitioning(false);
    }
  };

  const contextValue: ThemeContextType = {
    mode,
    colorScheme,
    setThemeMode,
    isTransitioning,
    themeAnimationValue,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export const useThemeManager = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeManager must be used within a ThemeManager');
  }
  return context;
};

// Animated theme transition hook
export const useThemeTransition = () => {
  const { themeAnimationValue, colorScheme, isTransitioning } = useThemeManager();

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      themeAnimationValue.value as number,
      [0, 1],
      ['#ffffff', '#1a1a1a'] // light to dark background
    );

    return {
      backgroundColor,
    };
  });

  const textStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      themeAnimationValue.value as number,
      [0, 1],
      ['#1a1a1a', '#ffffff'] // dark to light text
    );

    return {
      color,
    };
  });

  return {
    animatedStyle,
    textStyle,
    isTransitioning,
    colorScheme,
  };
};

// Theme-aware animated container
export const ThemeAnimatedContainer: React.FC<{
  children: React.ReactNode;
  style?: any;
}> = ({ children, style }) => {
  const { animatedStyle } = useThemeTransition();

  return <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>;
};

// Theme mode toggle component
export const ThemeModeToggle: React.FC<{
  onPress?: () => void;
}> = ({ onPress }) => {
  const { mode, setThemeMode, isTransitioning } = useThemeManager();
  const [showOptions, setShowOptions] = useState(false);

  const handleModeChange = async (newMode: ThemeMode) => {
    await setThemeMode(newMode);
    setShowOptions(false);
    onPress?.();
  };

  // RN-friendly placeholder using plain text; avoid DOM-specific tags in native/web shared code
  return (
    <Animated.View>
      {/* In real UI, replace with proper RN buttons/touchables */}
      <Animated.Text>
        {mode} theme {isTransitioning ? '(transitioning...)' : ''}
      </Animated.Text>
    </Animated.View>
  );
};

export default ThemeManager;
