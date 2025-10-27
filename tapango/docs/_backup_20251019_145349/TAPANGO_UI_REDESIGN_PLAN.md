# TAPANGO UI/UX Redesign Master Plan

This document serves as the blueprint for transforming TAPANGO into a premium,
enterprise-grade experience, aligning design, architecture, accessibility, and
performance.

## Goals

- Consolidate theming and tokens into a single source of truth (SSOT)
- Standardize component APIs and variants across app
- Elevate visuals: glassmorphism, depth, motion, branded minimalism
- Ensure WCAG 2.2 AA accessibility throughout
- Improve performance (animation system, rendering, asset optimization)
- Establish Storybook for documentation and QA
- Provide a clear migration path from legacy components

## Current Issues (Summary)

- Theme fragmentation between Tamagui config and custom ThemeProvider
- Inconsistent typography and token usage (hard-coded values)
- Component variant mismatches (e.g. undefined variants like secondaryContainer)
- Mixed animation systems (old Animated vs Reanimated)
- Accessibility gaps (contrast, semantics, focus)
- Responsiveness issues due to fixed dimensions

## Strategy Overview

1. Unified design system under src/design-system (tokens, theme, animations,
   components)
2. Compatibility barrel under src/ui that re-exports new components while legacy
   remains available
3. Gradual screen migrations (Home/Dashboard, Profile, Booking, Tracking,
   Orders)
4. Add docs for Accessibility, Tokens, and Migration
5. Introduce Storybook with example stories
6. Tighten typing and design tokens coverage

## Phases

- Phase 1: Foundations
  - Add tokens.ts (light/dark), theme.ts bridge, animations.ts
  - Introduce Button, Card, Input, Typography (new)
  - Update src/ui barrel to export new components
- Phase 2: Migrations
  - Migrate tabs screens to new components (incremental)
  - Replace hard-coded styles with tokens
  - Normalize variant names
- Phase 3: Documentation & QA
  - Storybook setup and stories
  - Accessibility guidelines and audits
  - Component migration guide
- Phase 4: Cleanup
  - Remove legacy-only variants
  - Optionally rename src/ui → src/ui-legacy and point src/ui to design-system
    only (when safe)

## Deliverables in this PR

- src/design-system (tokens/theme/animations/components)
- src/ui/index.ts updated to re-export new components
- docs: ACCESSIBILITY_GUIDELINES.md, COMPONENT_MIGRATION_GUIDE.md,
  DESIGN_TOKENS_REFERENCE.md
- storybook scaffold (config + example stories)

## Non-Goals in this PR

- Full migration of every screen (will be incremental)
- Replacing all legacy UI files immediately

## Notes

- New design tokens align with tamagui.config.ts brand definitions
- Theme bridging preserves current ThemeProvider behavior while enabling
  convergence
- All new components are typed, variant-driven, and token-based
