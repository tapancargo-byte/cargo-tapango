# Component Migration Guide

This guide explains how to migrate from legacy components in src/ui to the new
design system in src/design-system.

## Mapping

- Buttons → design-system/components/Button (variants: primary, secondary,
  outline, ghost, gradient, danger, success; sizes: xs–xl)
- Cards → design-system/components/Card (variants: default, glass, elevated,
  outlined, flat)
- Inputs → design-system/components/Input (variants: default, filled, outlined,
  ghost)
- Typography → design-system/components/Typography (display, headline, title,
  section, body, subtitle, caption, overline)

## Steps

1. Replace imports from `src/ui` with `src/ui` (barrel now re-exports new
   components)
2. Align props to standardized variants and sizes
3. Remove hard-coded colors/sizes and use tokens
4. Verify accessibility (labels, roles, contrast)

## Examples

```tsx
// Before
import { Button } from '@/ui';

// After (same path, unified API)
import { Button } from '@/ui';

<Button variant='primary' size='md' leftIcon={<Icon />}>
  Continue
</Button>;
```

## Breaking Changes

- Some variant names are standardized; replace ad-hoc variants with listed ones
- Typography should use semantic components or variant props instead of numeric
  sizes

## Tips

- Migrate leaf components first, then higher-level screens
- Use Storybook to verify visual parity
