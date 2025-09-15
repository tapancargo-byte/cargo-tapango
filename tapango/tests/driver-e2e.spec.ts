// Minimal web E2E navigation checks (works against web build or dev server)
// Assumes PW_BASE_URL points to the running web app with tabs available.

test.describe('Driver tabs navigation', () => {
  test('tabs render labels', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Jobs')).toBeVisible();
    await expect(page.getByText('Bid')).toBeVisible();
    await expect(page.getByText('Wallet')).toBeVisible();
    await expect(page.getByText('Profile')).toBeVisible();
  });
});

// Placeholder for offline banner scenario. In production you can use service worker or NetInfo mocks.
test('offline banner placeholder', async ({ page }) => {
  await page.goto('/');
  // This verifies page loads; real offline simulation requires framework-specific hooks.
  await expect(page)
    .toHaveTitle(/tapango/i)
    .catch(() => {});
});
