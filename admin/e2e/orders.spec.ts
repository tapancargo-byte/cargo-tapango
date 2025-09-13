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

// Use emergency admin bypass to access the app without real auth in dev
// This relies on VITE_DEV_EMERGENCY_ADMIN=1 and localStorage flag.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('EMERGENCY_SIGNED_IN', '1');
  });
});

test('orders page shows filters and allows CSV export', async ({ page }) => {
  await page.goto('/orders');
  await page.waitForLoadState('networkidle');
  await expect(page.getByTestId('orders-filters')).toBeVisible({ timeout: 20000 });
  await expect(page.getByTestId('orders-export')).toBeVisible({ timeout: 20000 });

  const [ download ] = await Promise.all([
    page.waitForEvent('download'),
    page.getByTestId('orders-export').click(),
  ]);
  const suggested = download.suggestedFilename();
  expect(suggested).toMatch(/orders\.csv$/);
});

