# Design Tokens Reference

Single source of truth for design values. Implemented in
`src/design-system/tokens.ts`.

## Colors (Semantic)

- background / surface / surfaceVariant
- primary / secondary / accent / info / success / warning / danger
- text / textSecondary / textOnPrimary / border / borderFocus / overlay / shadow

Light and dark themes provided with WCAG-compliant pairs.

## Spacing

- 0, 0.5, 1, 1.5, 2 … 20, 24, 28, 32 (dp)

## Radius

- xs, sm, md, lg, xl, 2xl, 3xl, full

## Typography

- Sizes: caption (12), subtitle (14), body (16), section (18), title (24),
  headline (32), display (40)
- Weights: 400, 500, 600, 700, 800

## Shadows

- level1, level2 (light/dark specific rgba)

## Motion

- durations: fast (150), base (250), slow (350)
- easing: standard (cubic-bezier-like via Reanimated Easing presets)
