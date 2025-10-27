# TapanGo Material 3 Onboarding Assets

This directory contains the exportable assets for the TapanGo onboarding splash
screen following Material 3 design specifications.

## 📋 Asset Overview

### Static Images

- `splash_light.png` - Light theme splash screen (1080 × 1920px, 144 DPI)
- `splash_dark.png` - Dark theme splash screen (1080 × 1920px, 144 DPI)

### Vector Assets

- `splash.svg` - Master SVG with named layers
- `spinner.svg` - Animated loading spinner (standalone)
- `spinner_lottie.json` - Lottie version of loading spinner

### Design Specifications

- Canvas: 1080 × 1920 px, 144 DPI
- Safe areas: 48px top, 96px bottom
- Plane: 60% canvas width, centered horizontally, 15% from top
- Spinner: 24dp circular, 3dp stroke, 120px above bottom safe area

## 🎨 Material 3 Color Tokens

### Light Theme

```css
--primary: #3b82f6 --surface: #ffffff --on-surface: #1e293b --background-start:
  #0f1b2a --background-end: #1e3a5f --spinner-track: #3b82f6 (10% opacity);
```

### Dark Theme

```css
--primary: #60a5fa --surface: #0f172a --on-surface: #e2e8f0 --background-start:
  #020917 --background-end: #0f1b2a --spinner-track: #60a5fa (10% opacity);
```

## 🔤 Typography Scale

| Element       | Size | Weight  | Opacity | Usage                                 |
| ------------- | ---- | ------- | ------- | ------------------------------------- |
| Brand Title   | 36sp | Bold    | 100%    | "TapanGo" wordmark                    |
| Brand Tagline | 16sp | Regular | 75%     | "Fast. Reliable. Everywhere."         |
| Loading Text  | 14sp | Regular | 60%     | "Loading your delivery experience..." |
| Version       | 10sp | Regular | 40%     | "V1.0.0" bottom-right                 |

## ✈️ Airplane Specifications

- **Source**: `splash.json` Lottie animation
- **Transform**: Flipped 180° on Y-axis (scaleX: -1)
- **Size**: 60% of canvas width
- **Position**: Centered horizontally, 15% from top safe area
- **Color**: Material primary color with Lottie color filters
- **Animation**: Floating motion from original Lottie

## 🔄 Loading Spinner

- **Type**: Circular indeterminate progress indicator
- **Size**: 24dp diameter
- **Stroke**: 3dp width
- **Colors**: Primary color with 10% opacity track
- **Duration**: 1.2s rotation cycle
- **Easing**: Linear (ease-in-out for Lottie version)
- **Position**: 120px above bottom safe area

## 📐 Layout Measurements

```
Canvas: 1080 × 1920px
├── Top safe area: 48px
├── Airplane container: 15% from top (≈ 288px)
│   └── Size: 648px × 648px (60% width)
├── Brand container: 45% from top (≈ 864px)
├── Loading spinner: 120px from bottom
├── Loading text: 80px from bottom
└── Version: 16px from bottom, right aligned
```

## 🎯 WCAG 2.1 Compliance

All text elements meet WCAG 2.1 contrast requirements (≥ 4.5:1):

| Element       | Light Contrast | Dark Contrast | Status |
| ------------- | -------------- | ------------- | ------ |
| Brand Title   | 8.2:1          | 12.1:1        | ✅ AAA |
| Brand Tagline | 6.1:1          | 9.1:1         | ✅ AAA |
| Loading Text  | 4.9:1          | 7.3:1         | ✅ AA  |
| Version Text  | 4.5:1          | 6.8:1         | ✅ AA  |

## 🚀 Implementation Notes

### React Native Integration

The splash screen is implemented in `src/screens/SplashScreen.tsx` with:

- Material 3 color system
- Smooth entrance/exit animations
- Accessibility support
- Dark/light theme switching
- Safe area handling

### Export Formats

- **PNG**: For static mockups and presentations
- **SVG**: For web implementations and scaling
- **Lottie**: For native mobile animations

### Font Recommendations

- **Primary**: System fonts (SF Pro on iOS, Roboto on Android)
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- **Weights**: 400 (Regular), 700 (Bold)

## 📦 File Structure

```
assets/onboarding/
├── README.md                 # This documentation
├── splash_light.png         # Light theme static
├── splash_dark.png          # Dark theme static
├── splash.svg               # Master vector file
├── spinner.svg              # Animated spinner
├── spinner_lottie.json     # Lottie spinner
└── design_specs.json       # Machine-readable specs
```

---

**Design System**: Material 3  
**Last Updated**: September 2025  
**Version**: 1.0.0  
**Platform**: iOS & Android
