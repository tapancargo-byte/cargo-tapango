import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './storybook/tests',
  use: {
    baseURL: 'http://localhost:6006',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});
