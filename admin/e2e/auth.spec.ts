import { test, expect } from '@playwright/test';

// Diagnostics hooks

test.beforeEach(async ({ page }) => {
  page.on('console', (msg) => console.log(`[browser:${msg.type()}]`, msg.text()));
  page.on('pageerror', (error) => console.log('[pageerror]', error.message));
  page.on('requestfailed', (req) => console.log('[requestfailed]', req.url(), req.failure()?.errorText));
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const html = await page.content();
    await testInfo.attach('page-content', { body: Buffer.from(html), contentType: 'text/html' });
    await testInfo.attach('url', { body: Buffer.from(page.url()), contentType: 'text/plain' });
    const screenshot = await page.screenshot();
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  }
});

// Unauthenticated users should see the login form when visiting protected routes
// We DO NOT set the EMERGENCY_SIGNED_IN flag in this test.
test('auth guard shows login on protected route', async ({ page }) => {
  await page.goto('/orders');
  await page.waitForLoadState('networkidle');
  await expect(page.getByTestId('login-title')).toBeVisible({ timeout: 20000 });
  await expect(page.getByTestId('login-email')).toBeVisible({ timeout: 20000 });
  await expect(page.getByTestId('login-password')).toBeVisible({ timeout: 20000 });
});

