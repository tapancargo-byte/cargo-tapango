import { test, expect } from '@playwright/test'

// Minimal visual regression check against Button and Card stories.
// These tests assume Storybook is running at http://localhost:6006.

const sb = 'http://localhost:6006'

// Helper to navigate to a story's isolated iframe (avoids scanning Storybook UI)
async function openStory(page, storyId) {
  await page.goto(`${sb}/iframe.html?id=${storyId}`)
  await page.waitForSelector('body', { state: 'visible' })
  await page.waitForTimeout(300)
}

// Button visual snapshot
// Story IDs are derived from titles in stories; adjust if different in your environment.
test('Button - All Variants (light)', async ({ page }) => {
  await openStory(page, 'design-system-button--all-variants')
  await expect(page).toHaveScreenshot('button-all-variants-light.png')
})

// Dark mode via globals
test('Button - All Variants (dark)', async ({ page }) => {
  await page.goto(`${sb}/iframe.html?id=design-system-button--all-variants&globals=mode:dark`)
  await page.waitForTimeout(300)
  await expect(page).toHaveScreenshot('button-all-variants-dark.png')
})

// Card visual snapshot
test('Card - Variants', async ({ page }) => {
  await openStory(page, 'design-system-card--variants')
  await expect(page).toHaveScreenshot('card-variants.png')
})
