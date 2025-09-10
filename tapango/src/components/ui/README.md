# UI Components

**100% Expo SDK 53 Native UI Components Only**

This directory contains all base UI components built exclusively with native React Native and Expo SDK 53 components. No external UI libraries are permitted.

## 🎯 Component Philosophy

### Native-First Approach
- Use only `react-native` and `expo` components
- Follow iOS and Android design guidelines
- Optimize for performance and native feel
- Ensure accessibility compliance

### Design System Compliance
- All components follow TAPANGO design system
- Consistent spacing, typography, and colors
- Support for dark/light themes
- Responsive design patterns

## 📋 Component Catalog

### Core Components
- **Button** - Primary, secondary, and danger button variants
- **Text** - Typography component with theme support  
- **Input** - Text input with validation states
- **Card** - Container component for content grouping
- **Avatar** - User profile image component
- **Badge** - Status and notification badges
- **Spinner** - Loading indicators
- **Modal** - Overlay dialogs and sheets

### Layout Components
- **Container** - Main content wrapper
- **Stack** - Vertical layout component
- **Row** - Horizontal layout component
- **Spacer** - Flexible spacing component
- **Divider** - Visual content separator

### Form Components
- **FormField** - Input field with label and validation
- **Checkbox** - Boolean input component
- **RadioButton** - Single selection input
- **Switch** - Toggle component
- **Slider** - Range input component
- **Picker** - Dropdown selection component

## 🔧 Component Template

```typescript
// src/components/ui/Button.tsx
import React from 'react';
import { Pressable, Text, PressableProps } from 'react-native';
import { styles } from './Button.styles';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  /** Button text content */
  title: string;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Button size */
  size?: 'small' | 'medium' | 'large';
  /** Loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

/**
 * Native button component following TAPANGO design system
 * 
 * @example
 * <Button 
 *   title="Save Changes" 
 *   variant="primary" 
 *   onPress={handleSave}
 * />
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  ...pressableProps
}) => {
  return (
    <Pressable
      style={[
        styles.base,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        style
      ]}
      disabled={disabled || loading}
      {...pressableProps}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>
        {loading ? 'Loading...' : title}
      </Text>
    </Pressable>
  );
};
```

## 🧪 Testing Requirements

Every component must include:

```typescript
// Button.test.tsx
describe('Button Component', () => {
  it('renders with correct title', () => { /* ... */ });
  it('calls onPress when pressed', () => { /* ... */ });
  it('shows loading state', () => { /* ... */ });
  it('is disabled when disabled prop is true', () => { /* ... */ });
  it('supports accessibility', () => { /* ... */ });
  it('renders within performance budget', () => { /* ... */ });
});
```

## 🎨 Styling Guidelines

### StyleSheet Usage
```typescript
// Button.styles.ts
import { StyleSheet } from 'react-native';
import { theme } from '@/theme';

export const styles = StyleSheet.create({
  base: {
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  // ... more styles
});
```

### Theme Integration
- Use theme values for colors, spacing, and typography
- Support both light and dark modes
- Ensure high contrast ratios for accessibility
- Test on both iOS and Android devices

## ⚡ Performance Standards

- Component render time < 100ms
- Smooth 60fps animations
- Optimized re-renders with React.memo
- Efficient event handling
- Minimal memory usage

## ♿ Accessibility Requirements

All components must support:
- Screen readers (VoiceOver/TalkBack)
- Keyboard navigation
- High contrast mode
- Dynamic type scaling
- Focus management

## 📚 Documentation Standards

Every component requires:
- TSDoc comments with examples
- Props interface documentation
- Usage examples
- Performance considerations
- Accessibility notes

## 🚫 Prohibited Dependencies

**DO NOT USE:**
- react-native-elements
- react-native-ui-lib
- react-native-paper
- nativebase
- shoutem-ui
- Any other external UI library

**ONLY USE:**
- react-native core components
- expo-* SDK components
- Custom components in this directory
