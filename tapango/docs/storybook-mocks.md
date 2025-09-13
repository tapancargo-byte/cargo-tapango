# Storybook mocks and web runtime conventions

This project uses Storybook (Vite) to render React Native/Expo components on the web. To keep builds stable and avoid RNW-specific runtime issues, follow these rules:

- JSX runtime
  - All Storybook code uses the automatic JSX runtime. In Storybook, `.storybook/tsconfig.json` explicitly sets `"jsx": "react-jsx"` and `"jsxImportSource": "react"`.
  - You generally do NOT need `import React from 'react'` in Storybook files, but importing it is harmless.

- Mocks and shims
  - If a module is native-only (e.g., `expo-haptics`, `@expo/vector-icons`, `lottie-react-native`, `react-native-reanimated`, etc.), create a stub in `storybook/mocks/` and wire an alias in `storybook/main.ts`.
  - If a mock returns JSX, the file MUST be `.tsx` and should work with the automatic JSX runtime.
  - Avoid `jest.mock(...)` or `vi.mock(...)` in files that run in Storybook; use Vite aliases instead.

- React Native Web shadow props
  - `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius` are deprecated on web.
  - Use `Platform` guards and provide a CSS `boxShadow` on web, while keeping native shadows for iOS/Android:

```ts
import { Platform } from 'react-native'

const style = {
  // native
  ...(Platform.OS !== 'web' ? {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  } : {}),
  // web
  ...(Platform.OS === 'web' ? { boxShadow: '0px 8px 16px rgba(0,0,0,0.2)' } : {}),
}
```

- AsyncStorage in Storybook
  - The Storybook mock provides `getItem`, `setItem`, `removeItem`, `clear`, `getAllKeys`, `multiGet`, `multiSet`, `multiRemove` with an in-memory Map. Use it for stories only.

- Favicons/static assets
  - Storybook serves static files from `.storybook/public`. Place `favicon.svg` there. The preview also injects a `<link rel="icon">` if missing.

- Production build
  - We alias `@expo/vector-icons` to a stub to prevent JSX inside node_modules from breaking the Vite build.
  - `viteFinal` sets esbuild’s `jsx: 'automatic'` and provides sane `define` values for `process`.

- Do’s and Don’ts
  - Do prefer small, focused shims in `storybook/mocks/`.
  - Do keep mock files in TSX if they return JSX.
  - Don’t import or use `window.React` or rely on a global `React`.
  - Don’t use testing-framework mocks (`jest.mock`) in Storybook runtime code.
