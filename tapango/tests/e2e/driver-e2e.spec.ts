import { test, expect } from '@playwright/test';

// Minimal web E2E navigation checks (works against web build or dev server)
// Assumes PW_BASE_URL points to the running web app with tabs available.

test.describe('Driver tabs navigation', () => {
  test('tabs render labels and navigate', async ({ page }) => {
    await page.goto('/bid?e2e=1');
    await expect(page.getByText('Jobs')).toBeVisible();
    await expect(page.getByText('Bid')).toBeVisible();
    await expect(page.getByText('Wallet')).toBeVisible();
    await expect(page.getByText('Profile')).toBeVisible();

    // On Bid screen
    await expect(page.getByText('Place an Offer')).toBeVisible();

    // Navigate to Wallet and assert heading
    await page.getByRole('tab', { name: 'Wallet' }).click();
    await expect(page.getByText('Wallet')).toBeVisible();

    // Navigate to Profile and assert heading
    await page.getByRole('tab', { name: 'Profile' }).click();
    await expect(page.getByText('Driver Profile')).toBeVisible();
  });
});

// Placeholder for offline banner scenario. In production you can use service worker or NetInfo mocks.
test('offline banner placeholder', async ({ page }) => {
  await page.goto('/bid?e2e=1');
  // This verifies page loads; real offline simulation requires framework-specific hooks.
  await expect(page.getByText(/Jobs|Bid|Wallet|Profile/)).toBeVisible();
});
