import { test, expect } from '@playwright/test';

const sb = 'http://localhost:6006';

async function openStory(page, id, globals) {
  const url = globals
    ? `${sb}/iframe.html?id=${id}&globals=${globals}`
    : `${sb}/iframe.html?id=${id}`;
  await page.goto(url);
  await page.waitForTimeout(250);
}

// Simple contrast test for primary & secondary buttons (light/dark)
// We fetch computed colors for the text span inside each button and the button's background.
function hexToRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return null;
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}
function sRGB(c) {
  const x = c / 255;
  return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}
function luminance({ r, g, b }) {
  const R = sRGB(r),
    G = sRGB(g),
    B = sRGB(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}
function contrastRatio(fg, bg) {
  const L1 = luminance(fg);
  const L2 = luminance(bg);
  const brightest = Math.max(L1, L2);
  const darkest = Math.min(L1, L2);
  return (brightest + 0.05) / (darkest + 0.05);
}

async function getColors(page, selector) {
  const { color, backgroundColor } = await page.$eval(selector, (el) => {
    const span = el.querySelector('span') || el;
    const cs = getComputedStyle(span);
    const cb = getComputedStyle(el);
    return { color: cs.color, backgroundColor: cb.backgroundColor };
  });
  const parseRgb = (str) => {
    // rgb(a,b,c) or rgba
    const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(str);
    return m ? { r: +m[1], g: +m[2], b: +m[3] } : hexToRgb(str);
  };
  return { fg: parseRgb(color), bg: parseRgb(backgroundColor) };
}

for (const mode of ['light', 'dark']) {
  test(`contrast: Button primary/secondary (${mode})`, async ({ page }) => {
    await openStory(
      page,
      'design-system-button--all-variants',
      mode === 'dark' ? 'mode:dark' : undefined
    );
    // Select by aria-label set in the story
    const primary = 'button[aria-label="button-primary"]';
    const secondary = 'button[aria-label="button-secondary"]';

    // Wait until both buttons appear
    await page.waitForSelector(primary);
    await page.waitForSelector(secondary);

    const p = await getColors(page, primary);
    const s = await getColors(page, secondary);

    const pr = contrastRatio(p.fg, p.bg);
    const sr = contrastRatio(s.fg, s.bg);

    // Assert AA for normal text
    expect(pr).toBeGreaterThanOrEqual(4.5);
    expect(sr).toBeGreaterThanOrEqual(4.5);
  });
}
