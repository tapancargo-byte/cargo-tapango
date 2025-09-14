// @ts-nocheck
import React from 'react';
import type { Preview } from '@storybook/react';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../tamagui.config';
import '../tamagui-web.css';
import { ThemeProvider } from '../src/styles/ThemeProvider';

// Ensure favicon is referenced for dev servers that don’t auto-detect it
if (typeof document !== 'undefined') {
  const hasFavicon = document.querySelector('link[rel="icon"]');
  if (!hasFavicon) {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = '/favicon.svg';
    document.head.appendChild(link);
  }
}

// Simple global decorator to toggle design-system mode via globals
const preview: Preview = {
  parameters: {
    docs: { disable: true },
    controls: { expanded: true },
  },
  globalTypes: {
    mode: {
      name: 'Mode',
      description: 'Theme mode',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const mode = context.globals.mode || 'light';
      const defaultTheme = mode === 'dark' ? 'tapango_dark' : 'tapango_light';
      const mergedContext = {
        ...context,
        args: { ...(context.args || {}), mode },
      };
      return React.createElement(
        TamaguiProvider,
        { config: tamaguiConfig as any, defaultTheme },
        React.createElement(
          ThemeProvider as any,
          null,
          React.createElement(Story, mergedContext)
        )
      );
    },
  ],
};

export default preview;
