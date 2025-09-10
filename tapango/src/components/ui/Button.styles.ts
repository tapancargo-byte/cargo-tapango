import { StyleSheet } from 'react-native';

// Theme would be imported from theme system
const theme = {
  colors: {
    primary: '#007AFF',
    primaryDark: '#0056CC',
    secondary: '#F2F2F7',
    secondaryDark: '#E5E5EA',
    danger: '#FF3B30',
    dangerDark: '#D70015',
    white: '#FFFFFF',
    black: '#000000',
    gray: '#8E8E93',
    disabled: '#C7C7CC',
    text: '#000000',
    textSecondary: '#8E8E93',
    border: '#C6C6C8',
  },
  spacing: {
    xs: 4,
    small: 8,
    medium: 16,
    large: 24,
    xl: 32,
  },
  borderRadius: {
    small: 6,
    medium: 8,
    large: 12,
  },
  fontSize: {
    small: 14,
    medium: 16,
    large: 18,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

export const styles = StyleSheet.create({
  // Base button styles
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
    minHeight: 44, // iOS accessibility guideline
  },
  
  // Full width variant
  fullWidth: {
    width: '100%',
  },
  
  // Button variants
  primary: {
    backgroundColor: theme.colors.primary,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  
  secondary: {
    backgroundColor: theme.colors.secondary,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  
  danger: {
    backgroundColor: theme.colors.danger,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  ghost: {
    backgroundColor: 'transparent',
  },
  
  // Button sizes
  small: {
    paddingHorizontal: theme.spacing.small,
    paddingVertical: theme.spacing.xs,
    minHeight: 32,
  },
  
  medium: {
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
    minHeight: 44,
  },
  
  large: {
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.medium,
    minHeight: 52,
  },
  
  // Text styles
  text: {
    fontWeight: theme.fontWeight.semibold,
    textAlign: 'center',
    fontSize: theme.fontSize.medium,
  },
  
  // Text variants
  primaryText: {
    color: theme.colors.white,
  },
  
  secondaryText: {
    color: theme.colors.text,
  },
  
  dangerText: {
    color: theme.colors.white,
  },
  
  ghostText: {
    color: theme.colors.primary,
  },
  
  // Text sizes
  smallText: {
    fontSize: theme.fontSize.small,
  },
  
  mediumText: {
    fontSize: theme.fontSize.medium,
  },
  
  largeText: {
    fontSize: theme.fontSize.large,
  },
  
  // Pressed state
  pressedText: {
    opacity: 0.8,
  },
  
  // Disabled state
  disabled: {
    backgroundColor: theme.colors.disabled,
    opacity: 0.6,
    shadowOpacity: 0,
    elevation: 0,
  },
  
  // Icons
  icon: {
    fontSize: theme.fontSize.medium,
  },
  
  leftIcon: {
    marginRight: theme.spacing.xs,
  },
  
  rightIcon: {
    marginLeft: theme.spacing.xs,
  },
  
  // Loading spinner
  spinner: {
    marginHorizontal: theme.spacing.xs,
  },
});
