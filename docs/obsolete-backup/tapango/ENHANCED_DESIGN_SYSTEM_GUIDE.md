# TAPANGO Enhanced Design System Guide

## Overview

The TAPANGO Enhanced Design System provides a comprehensive set of design
tokens, components, and guidelines to ensure consistent, accessible, and premium
user experiences across the mobile application.

## 🎨 Design Principles

### 1. **Consistency**

- Unified color palette across light and dark themes
- Consistent spacing scale based on 4px base unit
- Standardized typography hierarchy
- Component variants follow established patterns

### 2. **Accessibility**

- WCAG 2.2 AA compliant color contrasts
- Semantic color meanings
- Screen reader friendly components
- Touch-friendly interaction targets (minimum 44px)

### 3. **Premium Experience**

- Glassmorphism effects with blur
- Elevated surfaces with proper shadows
- Smooth animations and haptic feedback
- Professional blue-based color palette

## 🌈 Color System

### Brand Colors

```typescript
// Light Theme
primary: '#0D47A1'; // Deep blue - primary actions
primaryContainer: '#E3F2FD'; // Light blue container
secondary: '#5E35B1'; // Purple accent
accent: '#FF8F00'; // Orange highlight

// Dark Theme
primary: '#4FC3F7'; // Light blue for dark theme
primaryContainer: '#0D47A1'; // Deep blue container
secondary: '#B39DDB'; // Light purple
accent: '#FFD93D'; // Gold accent
```

### Semantic Colors

```typescript
success: '#388E3C'; // Green for success states
warning: '#F57C00'; // Orange for warnings
danger: '#D32F2F'; // Red for errors
info: '#1976D2'; // Blue for information
```

### Text Colors

```typescript
text: primary text color (high contrast)
textSecondary: secondary text (medium contrast)
textTertiary: tertiary text (low contrast)
textDisabled: disabled state text
textOnPrimary: text on primary surfaces
```

## 📝 Typography Scale

Based on a 1.25 (major third) scale for clear hierarchy:

```typescript
display: 40px    // Hero text
headline: 32px   // Major headlines
title: 24px      // Page/card titles
section: 18px    // Section headers
body: 16px       // Base body text (optimal readability)
subtitle: 14px   // Secondary text
caption: 12px    // Small supporting text
```

### Font Weights

- `weightRegular: 400` - Body text
- `weightMedium: 500` - Emphasis
- `weightSemibold: 600` - Headings
- `weightBold: 700` - Strong emphasis
- `weightExtraBold: 800` - Display text

## 📏 Spacing Scale

4px base unit system for consistent spacing:

```typescript
// Usage: space="$4" or padding="$6"
$1 = 4px     // Tight spacing
$2 = 8px     // Extra small
$3 = 12px    // Small
$4 = 16px    // Medium (most common)
$6 = 24px    // Large
$8 = 32px    // Extra large
$12 = 48px   // XXL
$16 = 64px   // XXXL
$20 = 80px   // Section spacing
```

## 🧩 Component Library

### Button Component

```typescript
<Button
  variant="primary" | "secondary" | "outline" | "ghost" | "gradient" | "danger" | "success"
  size="xs" | "sm" | "md" | "lg" | "xl"
  loading={boolean}
  disabled={boolean}
  fullWidth={boolean}
  leftIcon={ReactNode}
  rightIcon={ReactNode}
>
  Button Text
</Button>
```

**Variants:**

- `primary` - Main call-to-action buttons
- `secondary` - Secondary actions
- `outline` - Subtle actions with border
- `ghost` - Minimal actions without background
- `gradient` - Premium highlight buttons
- `danger` - Destructive actions
- `success` - Positive confirmations

### Card Components

```typescript
// Standard card
<Card>Content</Card>

// Enhanced variants
<ElevatedCard>Content with shadow</ElevatedCard>
<GlassCard>Glassmorphism effect</GlassCard>
<OutlinedCard>Card with border</OutlinedCard>
<FlatCard>Surface variant background</FlatCard>
```

**Usage Guidelines:**

- Use `ElevatedCard` for primary content areas
- Use `GlassCard` for overlay content or premium features
- Use `OutlinedCard` for secondary content or list items
- Use `FlatCard` for subtle content differentiation

### Input Components

```typescript
<Input
  label="Field Label"
  placeholder="Placeholder text"
  variant="default" | "filled" | "outlined" | "ghost"
  error="Error message"
  required={boolean}
  leftIcon={ReactNode}
  rightIcon={ReactNode}
/>
```

## 🎯 Usage Guidelines

### Color Usage

**DO:**

- Use semantic colors for their intended purpose
- Maintain consistent contrast ratios
- Use primary colors for main actions
- Use container colors for backgrounds

**DON'T:**

- Hard-code color values
- Use danger colors for non-destructive actions
- Mix color systems from different themes

### Typography Usage

**DO:**

- Use appropriate hierarchy levels
- Maintain consistent line spacing
- Use semantic weights (medium for emphasis, bold for headings)
- Test readability at different sizes

**DON'T:**

- Skip hierarchy levels
- Use too many different font sizes on one screen
- Make text too small (minimum 12px for readability)

### Spacing Usage

**DO:**

- Use multiples of the base 4px unit
- Be consistent with spacing patterns
- Use larger spacing for visual separation
- Follow the spacing scale

**DON'T:**

- Use arbitrary spacing values
- Crowd interface elements
- Mix spacing systems

## 🛠️ Implementation

### Accessing Design Tokens

```typescript
import { getTokens } from '../design-system/tokens';
import { useIsDark } from '../styles/ThemeProvider';

const MyComponent = () => {
  const isDark = useIsDark();
  const tokens = getTokens(isDark ? 'dark' : 'light');
  const colors = tokens.colors;

  return (
    <View style={{ backgroundColor: colors.surface }}>
      <Text style={{ color: colors.text, fontSize: tokens.typography.body }}>
        Content
      </Text>
    </View>
  );
};
```

### Using Design System Components

```typescript
import { Button, Card, Input, ElevatedCard } from '../ui';

const MyScreen = () => (
  <Screen padding="$4">
    <ElevatedCard>
      <YStack space="$4">
        <Input label="Email" placeholder="Enter your email" />
        <Button variant="primary" fullWidth>
          Sign In
        </Button>
      </YStack>
    </ElevatedCard>
  </Screen>
);
```

## 🎨 Dark Theme Support

All components automatically adapt to dark theme using the unified token system:

```typescript
// Tokens automatically switch based on theme
const colors = tokens.colors; // Adapts to light/dark
```

**Dark Theme Enhancements:**

- Higher contrast for better readability
- Adjusted glass effects for dark surfaces
- Semantic colors optimized for dark backgrounds
- Proper shadow colors for dark theme

## 📱 Mobile Optimizations

### Touch Targets

- Minimum 44px tap targets for accessibility
- Adequate spacing between interactive elements
- Visual feedback for all interactive states

### Performance

- Optimized animations using Reanimated
- Efficient glass effects with proper blur
- Lazy loading for complex components

### Platform Considerations

- iOS-optimized shadows and effects
- Platform-appropriate haptic feedback
- Responsive sizing for different screen sizes

## 🔄 Migration Guide

### From Legacy Components

1. **Replace hard-coded colors:**

   ```typescript
   // Old
   backgroundColor: '#1E40AF';

   // New
   backgroundColor: colors.primary;
   ```

2. **Update typography:**

   ```typescript
   // Old
   fontSize: 16, fontWeight: '600'

   // New
   fontSize: tokens.typography.body, fontWeight: tokens.typography.weightSemibold
   ```

3. **Use spacing tokens:**

   ```typescript
   // Old
   marginTop: 16, paddingHorizontal: 12

   // New
   marginTop: '$4', paddingHorizontal: '$3'
   ```

### Component Updates

```typescript
// Old Button
<TouchableOpacity style={styles.button}>
  <Text style={styles.buttonText}>Action</Text>
</TouchableOpacity>

// New Button
<Button variant="primary" size="md">Action</Button>
```

## 🎯 Best Practices

### Component Composition

- Build complex UIs by composing simple components
- Use consistent spacing between elements
- Maintain visual hierarchy with proper typography

### State Management

- Use proper loading states with LoadingSpinner
- Provide visual feedback for user interactions
- Handle error states with appropriate styling

### Accessibility

- Use semantic HTML elements where possible
- Provide proper accessibility labels
- Test with screen readers
- Maintain sufficient color contrast

## 🚀 Advanced Usage

### Custom Theming

```typescript
// Extend tokens for custom components
const customTokens = {
  ...tokens,
  customColors: {
    brand: colors.primary,
    highlight: colors.accent,
  },
};
```

### Animation Integration

```typescript
import { usePressableScale } from '../design-system/animations';

const MyButton = () => {
  const { animatedStyle, onPressIn, onPressOut } = usePressableScale();

  return (
    <Animated.View style={animatedStyle}>
      <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
        {/* Content */}
      </Pressable>
    </Animated.View>
  );
};
```

## 📊 Design System Metrics

### Coverage

- ✅ 15+ reusable components
- ✅ 60+ design tokens
- ✅ Light + Dark theme support
- ✅ WCAG 2.2 AA compliance
- ✅ Mobile-first responsive design

### Performance

- ⚡ < 100ms interaction response
- 🎨 Optimized glass effects
- 🔄 Smooth 60fps animations
- 📱 Touch-optimized interactions

---

## 🎉 Conclusion

The TAPANGO Enhanced Design System provides a solid foundation for building
consistent, accessible, and premium mobile experiences. By following these
guidelines and using the provided components and tokens, we ensure our
application delivers a cohesive and professional user experience across all
screens and interactions.

For questions or suggestions, please refer to the design system demo component
or reach out to the design team.
