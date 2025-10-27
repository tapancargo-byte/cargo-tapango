import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { sentryVitePlugin } from '@sentry/vite-plugin';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      tsconfigPaths(),
      // Enable Sentry sourcemap upload only when env is provided
      ...(process.env.SENTRY_AUTH_TOKEN
        ? [
            sentryVitePlugin({
              url: 'https://de.sentry.io',
              org: process.env.SENTRY_ORG,
              project: process.env.SENTRY_PROJECT,
              authToken: process.env.SENTRY_AUTH_TOKEN,
              sourcemaps: { assets: './dist/**' },
            }),
          ]
        : []),
    ],
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL || ''),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY || ''),
      'import.meta.env.VITE_SENTRY_DSN': JSON.stringify(env.VITE_SENTRY_DSN || ''),
      'import.meta.env.VITE_SENTRY_ENVIRONMENT': JSON.stringify(env.VITE_SENTRY_ENVIRONMENT || ''),
      'import.meta.env.MODE': JSON.stringify(mode),
    },
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
  };
});
