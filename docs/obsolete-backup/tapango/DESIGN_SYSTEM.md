# TapanGo App Design System & Lottie Animation Guidelines

## Overview

This document outlines the design principles, color palette, typography, and
animation guidelines for the TapanGo delivery application, focusing on creating
clean, modern, and minimalist user experiences.

## Design Philosophy

- **Clean & Minimalist**: Emphasize whitespace and simple geometric shapes
- **Modern**: Use contemporary UI patterns and micro-interactions
- **Professional**: Maintain trust and reliability through consistent branding
- **User-Centric**: Focus on intuitive navigation and clear visual hierarchy

## Color Palette

### Primary Colors

```
Primary Orange: #F68F1D (RGB: 246, 143, 29)
Primary Red: #D22D2C (RGB: 210, 45, 44)
Primary Brown: #B25D17 (RGB: 178, 93, 23)
```

### Secondary Colors

```
Light Blue: #E1F4FF (RGB: 225, 244, 255)
Light Orange: #F5E6D3 (RGB: 245, 230, 211)
Warm Beige: #B28F6F (RGB: 178, 143, 111)
```

### Neutral Colors

```
Dark Gray: #383838 (RGB: 56, 56, 56)
Medium Gray: #666666 (RGB: 102, 102, 102)
Light Gray: #F5F5F5 (RGB: 245, 245, 245)
Pure White: #FFFFFF (RGB: 255, 255, 255)
```

## Typography Guidelines

### Font Hierarchy

- **Headings**: Bold, 24-32px
- **Subheadings**: SemiBold, 18-22px
- **Body Text**: Regular, 14-16px
- **Caption**: Regular, 12-14px

### Recommended Font Families

- **iOS**: SF Pro Display / SF Pro Text
- **Android**: Roboto / Open Sans
- **Cross-platform**: Inter / Poppins

## Animation Principles

### Timing & Easing

- **Duration**: 200-300ms for micro-interactions, 800-1200ms for onboarding
- **Easing**: Ease-out for entrances, ease-in for exits
- **Staggered animations**: 100-200ms delays between elements

### Performance Guidelines

- Keep Lottie files under 100KB when possible
- Use 30fps for smooth animations
- Optimize vector paths and reduce complexity
- Implement proper loading states

## Screen Design Specifications

### Splash Screen Design

```
Layout Structure:
├── Background (Gradient or Solid Color)
├── Logo/Brand Animation (Center)
├── Loading Indicator (Bottom)
└── Version/Copyright (Bottom Corner)

Animation Sequence:
1. Background fade-in (300ms)
2. Logo scale-in with bounce (800ms)
3. Tagline fade-in (400ms)
4. Loading animation start
```

### Onboarding Screen Design

```
Layout Structure:
├── Navigation Indicators (Top)
├── Main Illustration/Animation (Center-Top)
├── Headline Text (Center)
├── Description Text (Center-Bottom)
├── Action Buttons (Bottom)
└── Skip Option (Top-Right)

Screen Flow:
1. Welcome & Brand Introduction
2. How It Works (Booking Process)
3. Fast & Reliable Service
4. Get Started (Sign Up/Login)
```

## Lottie Animation Integration Guide

### Current Animation Assets Mapping

#### Splash Screen

- **Primary**: `splash.json` (Airplane animation)
- **Alternative**: `tapango.json` (Brand animation)
- **Background Elements**: `hero.json` (Hero section)

#### Onboarding Screens

1. **Screen 1 - Welcome**: `tapango.json` + `hero.json`
2. **Screen 2 - Easy Booking**: `easy-booking.json`
3. **Screen 3 - Fast Service**: `fast-and-reliable.json` + `delivery-van.json`
4. **Screen 4 - Get Started**: `profile.json` + `customer.json`

#### Feature Highlights

- **Delivery Process**: `order-animation.json` + `boxes.json`
- **Driver Network**: `driver.json`
- **Customer Experience**: `customer.json`

### Animation Implementation Best Practices

#### 1. Loading States

```typescript
// Proper loading implementation
const [isLoading, setIsLoading] = useState(true);
const [animationData, setAnimationData] = useState(null);

useEffect(() => {
  import('../assets/lottie/splash.json').then((data) => {
    setAnimationData(data.default);
    setIsLoading(false);
  });
}, []);
```

#### 2. Memory Optimization

```typescript
// Cleanup animations
useEffect(() => {
  return () => {
    if (animationRef.current) {
      animationRef.current.destroy();
    }
  };
}, []);
```

#### 3. Responsive Scaling

```css
.lottie-container {
  width: 100%;
  max-width: 300px;
  height: auto;
  aspect-ratio: 1:1;
}

@media (max-width: 768px) {
  .lottie-container {
    max-width: 250px;
  }
}
```

## Component Specifications

### Splash Screen Component

```typescript
interface SplashScreenProps {
  onAnimationComplete: () => void;
  minimumDisplayTime?: number;
}

const SplashScreen: React.FC<SplashScreenProps> = ({
  onAnimationComplete,
  minimumDisplayTime = 2000,
}) => {
  // Implementation with proper timing
};
```

### Onboarding Screen Component

```typescript
interface OnboardingScreenProps {
  screens: OnboardingScreen[];
  onComplete: () => void;
  onSkip: () => void;
}

interface OnboardingScreen {
  id: string;
  animation: string;
  title: string;
  description: string;
  backgroundColor?: string;
}
```

## Accessibility Guidelines

### Animation Considerations

- Respect `prefers-reduced-motion` setting
- Provide alternative static images
- Ensure sufficient color contrast
- Include proper alt text and labels

### Implementation Example

```css
@media (prefers-reduced-motion: reduce) {
  .lottie-animation {
    animation-duration: 0.01s !important;
    animation-iteration-count: 1 !important;
  }
}
```

## Quality Assurance Checklist

### Design Review

- [ ] Consistent color usage across all screens
- [ ] Proper typography hierarchy
- [ ] Adequate spacing and margins
- [ ] Responsive design implementation

### Animation Review

- [ ] Smooth 30fps playback
- [ ] Proper loop settings
- [ ] Optimized file sizes
- [ ] Cross-platform compatibility

### Performance Review

- [ ] Fast loading times (<2 seconds)
- [ ] Smooth transitions
- [ ] Memory usage optimization
- [ ] Battery usage consideration

## File Organization

### Recommended Structure

```
assets/lottie/
├── splash/
│   ├── splash.json
│   └── splash-light.json
├── onboarding/
│   ├── welcome.json
│   ├── booking.json
│   ├── delivery.json
│   └── signup.json
├── features/
│   ├── order-animation.json
│   ├── tracking.json
│   └── payment.json
└── shared/
    ├── loading.json
    ├── success.json
    └── error.json
```

## Implementation Timeline

### Phase 1: Foundation (Week 1)

- Set up design system
- Create base components
- Implement splash screen

### Phase 2: Onboarding (Week 2)

- Design onboarding flow
- Integrate Lottie animations
- Add navigation logic

### Phase 3: Polish (Week 3)

- Optimize animations
- Accessibility improvements
- Performance testing

### Phase 4: Testing (Week 4)

- Cross-platform testing
- User experience validation
- Final optimizations

---

## Contact & Updates

For design system updates and questions, please refer to:

- Design System Documentation
- Component Library
- Animation Asset Repository

Last Updated: $(Get-Date -Format "yyyy-MM-dd") Version: 1.0.0
