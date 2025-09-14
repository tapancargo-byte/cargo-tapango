import { test, expect } from '@playwright/test';

// Minimal visual regression check against Button and Card stories.
// These tests assume Storybook is running at http://localhost:6006.

const sb = 'http://localhost:6006';

// Helper to navigate to a story's isolated iframe (avoids scanning Storybook UI)
async function openStory(page, storyId) {
  await page.goto(`${sb}/iframe.html?id=${storyId}`);
  await page.waitForSelector('body', { state: 'visible' });
  await page.waitForTimeout(300);
}

// Button visual snapshot
// Story IDs are derived from titles in stories; adjust if different in your environment.
test('Button - All Variants (light)', async ({ page }) => {
  await openStory(page, 'design-system-button--all-variants');
  await expect(page).toHaveScreenshot('button-all-variants-light.png');
});

// Dark mode via globals
test('Button - All Variants (dark)', async ({ page }) => {
  await page.goto(
    `${sb}/iframe.html?id=design-system-button--all-variants&globals=mode:dark`
  );
  await page.waitForTimeout(300);
  await expect(page).toHaveScreenshot('button-all-variants-dark.png');
});

// Card visual snapshot
// Story ID based on title 'Design System/Card' -> 'design-system-card--variants'
test('Card - Variants', async ({ page }) => {
  await openStory(page, 'design-system-card--variants');
  await expect(page).toHaveScreenshot('card-variants.png');
});

// BottomTabBar visual snapshot (light)
// storyId is based on "title: 'Navigation/BottomTabBar'" + export "Light"
// => navigation-bottomtabbar--light
test('BottomTabBar - Light', async ({ page }) => {
  await openStory(page, 'navigation-bottomtabbar--light');
  await expect(page).toHaveScreenshot('bottomtabbar-light.png');
});

// BottomTabBar visual snapshot (dark)
// Force global mode=dark via query param
test('BottomTabBar - Dark', async ({ page }) => {
  await page.goto(
    `${sb}/iframe.html?id=navigation-bottomtabbar--dark&globals=mode:dark`
  );
  await page.waitForTimeout(300);
  await expect(page).toHaveScreenshot('bottomtabbar-dark.png');
});

// BottomTabBar with badge (light)
// => navigation-bottomtabbar--orders-badge
test('BottomTabBar - Orders Badge', async ({ page }) => {
  await openStory(page, 'navigation-bottomtabbar--orders-badge');
  await expect(page).toHaveScreenshot('bottomtabbar-orders-badge-light.png');
});

// BottomTabBar with badge (dark)
// => navigation-bottomtabbar--orders-badge-dark
test('BottomTabBar - Orders Badge Dark', async ({ page }) => {
  await page.goto(
    `${sb}/iframe.html?id=navigation-bottomtabbar--orders-badge-dark&globals=mode:dark`
  );
  await page.waitForTimeout(300);
  await expect(page).toHaveScreenshot('bottomtabbar-orders-badge-dark.png');
});
