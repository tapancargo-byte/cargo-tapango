// @ts-nocheck
import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

// Storybook config for web preview of design-system components
const config: StorybookConfig = {
  stories: ['./stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  staticDirs: [{ from: '../.storybook/public', to: '/' }],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    // Ensure .js files can contain JSX (RN packages ship JSX in .js)
    config.optimizeDeps = config.optimizeDeps || {};
    (config.optimizeDeps as any).esbuildOptions =
      (config.optimizeDeps as any).esbuildOptions || {};
    (config.optimizeDeps as any).esbuildOptions.loader = {
      ...(config as any).optimizeDeps?.esbuildOptions?.loader,
      '.js': 'jsx',
    };

    // Alias RN modules to web-friendly or local stubs
    config.resolve = config.resolve || {};
    const existingAlias = (config.resolve.alias || {}) as any;
    const aliasArray = Array.isArray(existingAlias)
      ? existingAlias
      : Object.entries(existingAlias).map(([find, replacement]) => ({
          find,
          replacement,
        }));

    aliasArray.push(
      { find: 'react-native$', replacement: 'react-native-web' },
      { find: 'react-native', replacement: 'react-native-web' },
      {
        find: 'expo-blur',
        replacement: path.resolve(__dirname, './mocks/expo-blur.tsx'),
      },
      {
        find: 'react-native-reanimated',
        replacement: path.resolve(__dirname, './mocks/reanimated.tsx'),
      },
      {
        find: 'expo-modules-core',
        replacement: path.resolve(__dirname, './mocks/expo-modules-core.ts'),
      },
      {
        find: 'expo-constants',
        replacement: path.resolve(__dirname, './mocks/empty.ts'),
      },
      {
        find: 'expo-application',
        replacement: path.resolve(__dirname, './mocks/empty.ts'),
      },
      {
        find: 'expo-haptics',
        replacement: path.resolve(__dirname, './mocks/expo-haptics.ts'),
      },
      {
        find: 'expo-image',
        replacement: path.resolve(__dirname, './mocks/empty.ts'),
      },
      {
        find: 'expo-linear-gradient',
        replacement: path.resolve(
          __dirname,
          './mocks/expo-linear-gradient.tsx'
        ),
      },
      {
        find: 'expo-asset',
        replacement: path.resolve(__dirname, './mocks/empty.ts'),
      },
      {
        find: 'expo-font',
        replacement: path.resolve(__dirname, './mocks/empty.ts'),
      },
      {
        find: 'react-native-safe-area-context',
        replacement: path.resolve(__dirname, './mocks/safe-area-context.ts'),
      },
      {
        find: '@react-native-async-storage/async-storage',
        replacement: path.resolve(__dirname, './mocks/async-storage.ts'),
      },
      {
        find: 'lottie-react-native',
        replacement: path.resolve(__dirname, './mocks/lottie.tsx'),
      },
      // Route all @expo/vector-icons imports (including deep paths) to a web stub
      {
        find: /^@expo\/vector-icons(\/.*)?$/,
        replacement: path.resolve(__dirname, './mocks/expo-vector-icons.tsx'),
      }
    );

    config.resolve.alias = aliasArray;

    // Provide basic Node globals for packages expecting process/global
    (config as any).define = {
      ...(config as any).define,
      global: 'globalThis',
      // Use valid JSON expressions for esbuild define replacements
      process: '{"env":{}}',
      'process.env': '{}',
    };

    // Ensure automatic JSX runtime so mocks don’t require global React
    (config as any).esbuild = {
      ...(config as any).esbuild,
      jsx: 'automatic',
      jsxImportSource: 'react',
    };

    return config;
    // (react-vite preset adds react-docgen; we disable parsing to skip babel on RN libs)
    (config as any).plugins = (config as any).plugins || [];
    return config;
  },
  docs: { autodocs: false },
  typescript: { reactDocgen: false },
};
export default config;
