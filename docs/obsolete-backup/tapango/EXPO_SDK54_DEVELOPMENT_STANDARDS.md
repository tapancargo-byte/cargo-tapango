# TAPANGO Expo SDK 54 Development Standards

> **CRITICAL**: These standards MUST be followed for all UI development in the
> TAPANGO mobile app to ensure proper functionality across all devices and
> screen sizes.

## Table of Contents

1. [Safe Area Handling](#safe-area-handling)
2. [Layout and Spacing Standards](#layout-and-spacing-standards)
3. [Color Scheme Implementation](#color-scheme-implementation)
4. [ScrollView Best Practices](#scrollview-best-practices)
5. [Responsive Design Patterns](#responsive-design-patterns)
6. [Component Structure Rules](#component-structure-rules)
7. [Testing and Validation](#testing-and-validation)

## Safe Area Handling

### ✅ REQUIRED: Safe Area Provider Configuration

**Rule**: SafeAreaProvider MUST be configured at the app root level.

```tsx
// ✅ CORRECT - Already implemented in app/_layout.tsx
<SafeAreaProvider>
  <YourAppContent />
</SafeAreaProvider>
```

### ✅ REQUIRED: useSafeAreaInsets Hook Usage

**Rule**: ALL screens MUST use `useSafeAreaInsets()` for precise safe area
control.

```tsx
// ✅ CORRECT
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MyScreen() {
  const insets = useSafeAreaInsets();

  // Calculate safe padding that accounts for device-specific safe areas
  const horizontalPadding = Math.max(16, insets.left, insets.right);
  const topPadding = Math.max(16, insets.top);
  const bottomPadding = Math.max(60, insets.bottom + 60); // Account for tab bar

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: horizontalPadding,
        paddingTop: topPadding,
        paddingBottom: bottomPadding,
      }}
    >
      {/* Content */}
    </ScrollView>
  );
}
```

### ❌ FORBIDDEN: Hardcoded Safe Area Values

```tsx
// ❌ WRONG - Never hardcode safe area values
<View style={{ paddingTop: 44 }}> // iPhone specific, breaks on other devices

// ❌ WRONG - Using fixed padding without safe area consideration
<ScrollView style={{ padding: 16 }}> // Can be clipped by notches/status bars
```

### ✅ REQUIRED: Safe Area Edge Cases

**Rule**: Handle ALL edge cases for safe areas:

- **Landscape orientation**: Safe areas change when device rotates
- **Notched devices**: iPhone X+ series, Android devices with cutouts
- **Tablets**: Different safe area requirements
- **Foldable devices**: Dynamic safe areas when folding/unfolding

## Layout and Spacing Standards

### ✅ REQUIRED: Design System Token Usage

**Rule**: ALWAYS use design system tokens for spacing, never hardcoded values.

```tsx
// ✅ CORRECT - Using design system tokens
import { getTokens } from '../../src/design-system/tokens';

const tokens = getTokens(isDark ? 'dark' : 'light');

<YStack space='$6' padding='$4'>
  {' '}
  // Tamagui tokens
  <YStack space='$4'>
    {' '}
    // Section spacing
    <Card>
      <YStack space='$3'>
        {' '}
        // Content spacing inside cards
        {/* Content */}
      </YStack>
    </Card>
  </YStack>
</YStack>;
```

### ✅ REQUIRED: Consistent Spacing Hierarchy

**Rule**: Follow this spacing hierarchy:

- `space='$6'` - Between major sections
- `space='$4'` - Between sub-sections or related groups
- `space='$3'` - Within cards/containers
- `space='$2'` - Between closely related elements
- `space='$1'` - Between labels and values

### ✅ REQUIRED: Responsive Layout Patterns

**Rule**: ALL layouts MUST be responsive and work on different screen sizes.

```tsx
// ✅ CORRECT - Responsive button layout
<XStack space='$2' flexWrap='wrap' justifyContent='flex-start'>
  <Button minWidth={80} size='sm'>Action 1</Button>
  <Button minWidth={80} size='sm'>Action 2</Button>
  <Button minWidth={80} size='sm'>Action 3</Button>
</XStack>

// ✅ CORRECT - Responsive card grid
<XStack space='$2' flexWrap='wrap'>
  <YStack flex={1} minWidth={140}>
    <Card>{/* Content */}</Card>
  </YStack>
  <YStack flex={1} minWidth={140}>
    <Card>{/* Content */}</Card>
  </YStack>
</XStack>
```

## Color Scheme Implementation

### ✅ REQUIRED: Proper Color Scheme Detection

**Rule**: Use React Native's `useColorScheme()` hook for system theme detection.

```tsx
// ✅ CORRECT
import { useColorScheme } from 'react-native';

export default function MyScreen() {
  const systemColorScheme = useColorScheme();
  const isDark = useIsDark(); // Your app's theme state
  const tokens = getTokens(isDark ? 'dark' : 'light');
  const colors = tokens.colors;

  // Use colors from tokens, not hardcoded values
  return <Text color={colors.text}>Content</Text>;
}
```

### ✅ REQUIRED: App Config Settings

**Rule**: Ensure `userInterfaceStyle: 'automatic'` is set in app.config.js (✅
Already configured).

### ✅ REQUIRED: Token-Based Colors

**Rule**: NEVER use hardcoded colors. ALWAYS use design system tokens.

```tsx
// ✅ CORRECT
<Text color={colors.text}>Primary text</Text>
<Text color={colors.textSecondary}>Secondary text</Text>
<View backgroundColor={colors.surface}>Content</View>

// ❌ WRONG
<Text style={{ color: '#000000' }}>Text</Text> // Breaks in dark mode
<View style={{ backgroundColor: 'white' }}>Content</View> // No theme support
```

## ScrollView Best Practices

### ✅ REQUIRED: Proper ScrollView Configuration

**Rule**: Follow React Native ScrollView documentation exactly.

```tsx
// ✅ CORRECT - Proper ScrollView setup
<Screen scroll={false} padding='$0'>
  <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
      paddingHorizontal: horizontalPadding,
      paddingTop: topPadding,
      paddingBottom: bottomPadding,
    }}
  >
    <YStack space='$6'>
      {/* Content */}
    </YStack>
  </ScrollView>
</Screen>

// ❌ WRONG - Don't use nested ScrollViews
<ScrollView>
  <ScrollView> // This will break scrolling
    {/* Content */}
  </ScrollView>
</ScrollView>
```

### ✅ REQUIRED: ContentContainerStyle Usage

**Rule**: Use `contentContainerStyle` for ScrollView padding, NOT `style` prop.

```tsx
// ✅ CORRECT
<ScrollView contentContainerStyle={{ padding: 16 }}>

// ❌ WRONG
<ScrollView style={{ padding: 16 }}> // This won't work as expected
```

### ✅ REQUIRED: Bounded Height

**Rule**: Ensure ScrollView has bounded height by setting `flex: 1` on parent
containers.

```tsx
// ✅ CORRECT
<View style={{ flex: 1 }}>
  <ScrollView>{/* Unbounded content */}</ScrollView>
</View>
```

## Responsive Design Patterns

### ✅ REQUIRED: Screen Size Awareness

**Rule**: Always check screen dimensions and adapt layout accordingly.

```tsx
// ✅ CORRECT
import { Dimensions } from 'react-native';

export default function ResponsiveScreen() {
  const windowData = Dimensions.get('window');
  const isSmallScreen = windowData.width < 375;
  const availableWidth = windowData.width - horizontalPadding * 2;

  return (
    <YStack space={isSmallScreen ? '$3' : '$4'}>
      {/* Adjust spacing based on screen size */}
    </YStack>
  );
}
```

### ✅ REQUIRED: Minimum Touch Targets

**Rule**: All interactive elements MUST have minimum 44x44pt touch targets.

```tsx
// ✅ CORRECT
<Button minWidth={44} minHeight={44} size='sm'>
  Action
</Button>

// ❌ WRONG
<Button size='xs'> // May be too small to tap reliably
  Action
</Button>
```

### ✅ REQUIRED: Flexible Layouts

**Rule**: Use `flexWrap='wrap'` for button groups and card grids.

```tsx
// ✅ CORRECT - Buttons wrap to new line on smaller screens
<XStack space='$2' flexWrap='wrap'>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
  <Button>Button 3</Button>
</XStack>
```

## Component Structure Rules

### ✅ REQUIRED: Import Order

**Rule**: Follow this exact import order:

```tsx
// 1. React and React Native core
import React from 'react';
import { Alert, ScrollView, useColorScheme, Dimensions } from 'react-native';

// 2. Third-party libraries
import { YStack, XStack, Text } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// 3. Internal UI components
import {
  Screen,
  Button,
  Card,
  // ... other UI components
} from '../../src/ui';

// 4. Design system and utilities
import { getTokens } from '../../src/design-system/tokens';
import { useIsDark } from '../../src/styles/ThemeProvider';

// 5. Local utilities and services
import { StorageService } from '../../src/utils/storage';
```

### ✅ REQUIRED: Component Function Structure

**Rule**: Follow this exact structure in function components:

```tsx
export default function MyScreen() {
  // 1. Hooks (in this order)
  const isDark = useIsDark();
  const systemColorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const windowData = Dimensions.get('window');

  // 2. Derived values and calculations
  const tokens = getTokens(isDark ? 'dark' : 'light');
  const colors = tokens.colors;
  const horizontalPadding = Math.max(16, insets.left, insets.right);
  const availableWidth = windowData.width - horizontalPadding * 2;

  // 3. Event handlers
  const handleAction = () => {
    // Handle action
  };

  // 4. Component helpers (if needed)
  const LocalComponent = () => <Text>Helper</Text>;

  // 5. Render
  return (
    <Screen scroll={false} padding='$0'>
      {/* Content */}
    </Screen>
  );
}
```

### ✅ REQUIRED: Local Helper Components

**Rule**: Keep helper components local to the file, use proper TypeScript types.

```tsx
// ✅ CORRECT - Local helper with proper typing
const Chip: React.FC<{
  label: string;
  tone?: 'neutral' | 'info' | 'success' | 'warning' | 'danger';
}> = ({ label, tone = 'neutral' }) => {
  const isDark = useIsDark();
  const tokens = getTokens(isDark ? 'dark' : 'light');
  // Component implementation
};
```

## Testing and Validation

### ✅ REQUIRED: Device Testing Checklist

**Rule**: Test on ALL these device types before deploying:

- [ ] iPhone SE (small screen)
- [ ] iPhone 12/13/14 (notched)
- [ ] iPhone 12/13/14 Plus (large screen)
- [ ] iPad (tablet)
- [ ] Android phone (various sizes)
- [ ] Android tablet
- [ ] Both portrait and landscape orientations
- [ ] Light and dark modes
- [ ] System font scaling (accessibility)

### ✅ REQUIRED: Layout Validation

**Rule**: For every screen, verify:

- [ ] No content is clipped by status bar
- [ ] No content is clipped by navigation bar/tab bar
- [ ] No content is clipped by device notches/cutouts
- [ ] Buttons are properly sized (minimum 44pt touch targets)
- [ ] Text is readable in both light and dark modes
- [ ] Layout adapts properly to different screen sizes
- [ ] ScrollView scrolls properly without performance issues
- [ ] Safe areas are respected on all devices

### ✅ REQUIRED: Performance Validation

**Rule**: Ensure smooth performance:

- [ ] ScrollView doesn't lag or stutter
- [ ] No unnecessary re-renders
- [ ] Proper use of React.memo() for expensive components
- [ ] Images are properly optimized
- [ ] Animations are smooth (60fps)

## Error Handling

### ✅ REQUIRED: Graceful Degradation

**Rule**: Handle edge cases gracefully:

```tsx
// ✅ CORRECT - Handle missing data
const systemColorScheme = useColorScheme();
const safeSystemScheme = systemColorScheme || 'light';

// ✅ CORRECT - Handle safe area edge cases
const safeInsets = useSafeAreaInsets();
const safePadding = Math.max(16, safeInsets.top || 0);
```

### ✅ REQUIRED: Development Debug Information

**Rule**: Include debug information in development builds:

```tsx
// ✅ CORRECT - Debug info for development
const toggleTheme = () => {
  Alert.alert(
    'Theme Debug',
    `Current: ${isDark ? 'Dark' : 'Light'}\n` +
      `System: ${systemColorScheme || 'unknown'}\n` +
      `Screen: ${screenData.width}x${screenData.height}\n` +
      `Window: ${windowData.width}x${windowData.height}\n` +
      `Safe Areas: T:${insets.top} R:${insets.right} B:${insets.bottom} L:${insets.left}`
  );
};
```

## Enforcement

### Code Review Requirements

**All pull requests MUST:**

- [ ] Follow ALL standards in this document
- [ ] Include screenshots from multiple device types
- [ ] Pass automated tests
- [ ] Be tested on both iOS and Android
- [ ] Support both light and dark modes

### Automated Checks

The following will be automatically validated:

- TypeScript compilation
- ESLint rules compliance
- Safe area implementation
- Token usage (no hardcoded colors/spacing)

---

**⚠️ IMPORTANT**: Violation of these standards will result in PR rejection. When
in doubt, refer to the official
[Expo SDK 54 documentation](https://docs.expo.dev/versions/latest/) and
[React Native documentation](https://reactnative.dev/docs/getting-started).

**Last updated**: September 13, 2025 **Version**: 1.0.0 **Expo SDK**: 54.0.7
**React Native**: 0.81.4
