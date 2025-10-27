# TypeScript Errors - Categorized Fix Plan

## Error Categories (50 total errors)

### 1. Design System Padding Props (14 errors)

**Issue**: String padding props ('$4', '$5') passed to components expecting
number **Files**: booking.tsx, orders.tsx, profile.tsx, tracking.tsx, index.tsx
**Examples**:

- `<ElevatedCard padding='$4'>` → expects number
- `<Button padding='$4'>` → expects number

**Specific errors**:

- booking.tsx:54,412 - ElevatedCard padding props
- orders.tsx:209 - ElevatedCard padding props
- profile.tsx:116,207,294,320,345 - ElevatedCard padding props
- tracking.tsx:381,762 - ElevatedCard padding props
- index.tsx:314,356 - ElevatedCard padding props
- index.tsx:200 - Button padding props

### 2. Typography Component Props (7 errors)

**Issue**: fontSize, fontWeight props not accepted by Typography component
**Files**: index.tsx **Examples**:

- `<Caption fontSize={14}>` → fontSize prop doesn't exist
- `<Title fontSize={32} fontWeight='800'>` → props don't exist

**Specific errors**:

- index.tsx:170,175,183,295 - fontSize prop errors

### 3. Button Component Props (7 errors)

**Issue**: Invalid props being passed to Button component **Files**:
developer.tsx, index.tsx, tracking.tsx **Examples**:

- `minWidth` prop doesn't exist on Button
- `borderColor`, `backgroundColor` props don't exist on Button

**Specific errors**:

- developer.tsx:167,175,183 - minWidth prop
- index.tsx:225,242 - borderColor prop
- tracking.tsx:415,426 - backgroundColor prop

### 4. Navigation/Router Type Issues (6 errors)

**Issue**: Expo router navigation type mismatches **Files**: orders.tsx
**Examples**:

- `router.push('/(tabs)/tracking?id=${order.id}' as Href<string>)` → type
  constraint issues

**Specific errors**:

- orders.tsx:264,264,275,275,518,518 - router.push type issues

### 5. Variable Hoisting/Declaration (2 errors)

**Issue**: Variable used before declaration in dependency array **Files**:
orders.tsx **Examples**:

- `counts` used in useFocusEffect dependency before declaration

**Specific errors**:

- orders.tsx:148,148 - counts variable hoisting

### 6. Input Component Props (1 error)

**Issue**: borderRadius prop not accepted by Input component **Files**:
tracking.tsx

**Specific errors**:

- tracking.tsx:406 - borderRadius prop

### 7. Function Call Arguments (2 errors)

**Issue**: Missing required arguments for getTokens function **Files**:
index.tsx

**Specific errors**:

- index.tsx:727,733 - getTokens() missing mode argument

### 8. Accessibility/UI Manager (2 errors)

**Issue**: Missing methods on UIManagerStatic type **Files**:
AccessibilityHelper.tsx

**Specific errors**:

- AccessibilityHelper.tsx:25,25 - sendAccessibilityEvent,
  AccessibilityEventTypes

### 9. React Native Style Transitions (2 errors)

**Issue**: CSS transition property not valid in React Native styles **Files**:
KycProgress.tsx, Card.tsx

**Specific errors**:

- KycProgress.tsx:46 - transition in StyleSheet
- Card.tsx:100 - transition in BlurView style

### 10. MapWrapper Export Conflicts (6 errors)

**Issue**: Duplicate exports and type mismatches **Files**: MapWrapper.tsx

**Specific errors**:

- MapWrapper.tsx:98,137,240,240,240,240 - duplicate exports and type issues

### 11. Monitoring/Performance Types (1 error)

**Issue**: Optional property type strictness **Files**: PerformanceMonitor.tsx

**Specific errors**:

- PerformanceMonitor.tsx:29 - metadata optional property

### 12. Theme Manager (2 errors)

**Issue**: react-native-reanimated type imports and array includes **Files**:
ThemeManager.tsx

**Specific errors**:

- ThemeManager.tsx:20,44 - SharedValue import and includes type

## Fix Priority Order

1. **High Priority** (blocks basic functionality):

   - Design System Padding Props (14 errors)
   - Variable Hoisting (2 errors)
   - Typography Props (7 errors)

2. **Medium Priority** (affects user experience):

   - Button Component Props (7 errors)
   - Navigation Type Issues (6 errors)
   - Input Component Props (1 error)

3. **Low Priority** (cleanup and polish):
   - Function Call Arguments (2 errors)
   - Style Transitions (2 errors)
   - MapWrapper conflicts (6 errors)
   - Accessibility (2 errors)
   - Monitoring (1 error)
   - Theme Manager (2 errors)

## Action Items

- [ ] Fix padding prop types in design system components
- [ ] Resolve variable hoisting in orders.tsx
- [ ] Update Typography component prop interface
- [ ] Fix Button component prop mismatches
- [ ] Type-safe router navigation
- [ ] Clean up style transition properties
- [ ] Resolve MapWrapper export conflicts
- [ ] Update accessibility helper types
- [ ] Fix performance monitoring types
- [ ] Update theme manager imports
