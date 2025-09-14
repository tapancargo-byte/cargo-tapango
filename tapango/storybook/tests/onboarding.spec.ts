import { test, expect } from '@playwright/test';

const sb = 'http://localhost:6006';

async function openStory(page, id, globals) {
  const url = globals
    ? `${sb}/iframe.html?id=${id}&globals=${globals}`
    : `${sb}/iframe.html?id=${id}`;
  await page.goto(url);
  await page.waitForTimeout(250);
}

test('visual: Onboarding Welcome', async ({ page }) => {
  await openStory(page, 'app-onboarding-welcome--welcome');
  await expect(page).toHaveScreenshot('onboarding-welcome.png');
});
