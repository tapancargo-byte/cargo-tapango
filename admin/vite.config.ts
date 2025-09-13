import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { sentryVitePlugin } from '@sentry/vite-plugin';

const sentryEnabled = !!(process.env.SENTRY_AUTH_TOKEN && process.env.SENTRY_ORG && process.env.SENTRY_PROJECT);

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    ...(sentryEnabled
      ? [
          sentryVitePlugin({
            org: process.env.SENTRY_ORG!,
            project: process.env.SENTRY_PROJECT!,
            authToken: process.env.SENTRY_AUTH_TOKEN!,
          }),
        ]
      : []),
  ],
  server: {
    port: 5173,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/setupTests.ts'],
  },
  build: {
    sourcemap: true,
  },
});
