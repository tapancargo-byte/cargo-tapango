# Accessibility Guidelines (WCAG 2.2 AA)

This guide establishes accessibility standards for TAPANGO. All new components in src/design-system implement these rules.

## Color and Contrast
- Minimum 4.5:1 for normal text, 3:1 for large text (≥18pt regular or 14pt bold)
- Use semantic tokens (e.g., colors.text, colors.textSecondary, colors.primary) and ensure sufficient contrast
- Avoid pure low-opacity text on busy backgrounds; prefer solid or layered backgrounds

## Keyboard and Focus
- All focusable elements must be reachable via keyboard (or D-pad)
- Visible focus indicators for all interactive controls
- Maintain logical tab order and avoid focus traps

## Screen Readers
- Provide accessible labels for icons and controls (accessibilityLabel)
- Use roles and states appropriately (accessibilityRole, accessibilityState)
- Group related content and provide headings/landmarks

## Motion and Animation
- Respect reduced motion settings where possible
- Avoid excessive parallax or sudden large-scale motion
- Provide timing/easing that favors readability (200–400ms typical)

## Touch Targets
- Minimum 44x44 dp target size
- Adequate spacing to avoid accidental taps

## Forms
- Associate labels with inputs
- Show error messages adjacent to the field
- Do not rely solely on color to convey state

## Testing Checklist
- Contrast checks for primary screens
- Keyboard navigation through primary flows
- Screen reader sweep of forms and nav
- Motion preference honored (if applicable)

