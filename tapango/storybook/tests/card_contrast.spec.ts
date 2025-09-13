import { test, expect } from '@playwright/test'

const sb = 'http://localhost:6006'

async function openStory(page, id, globals) {
  const url = globals ? `${sb}/iframe.html?id=${id}&globals=${globals}` : `${sb}/iframe.html?id=${id}`
  await page.goto(url)
  await page.waitForTimeout(250)
}

// Check caption text contrast in Card variants (light/dark)
function sRGB(c: number) { const x = c / 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4) }
function luminance({ r, g, b }: { r: number; g: number; b: number }) { const R = sRGB(r), G = sRGB(g), B = sRGB(b); return 0.2126*R + 0.7152*G + 0.0722*B }
function contrastRatio(fg: { r: number; g: number; b: number }, bg: { r: number; g: number; b: number }) { const L1 = luminance(fg); const L2 = luminance(bg); const brightest = Math.max(L1, L2); const darkest = Math.min(L1, L2); return (brightest + 0.05) / (darkest + 0.05) }

async function getColors(page, elementSelector: string) {
  const { color, backgroundColor } = await page.$eval(elementSelector, (el: HTMLElement) => {
    const cs = getComputedStyle(el)
    const parentBg = getComputedStyle(el.parentElement as HTMLElement)
    return { color: cs.color, backgroundColor: parentBg.backgroundColor }
  })
  const parseRgb = (str: string) => { const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(str); return m ? { r: +m[1], g: +m[2], b: +m[3] } : { r: 0, g: 0, b: 0 } }
  return { fg: parseRgb(color), bg: parseRgb(backgroundColor) }
}

for (const mode of ['light','dark'] as const) {
  test(`contrast: Card variant captions (${mode})`, async ({ page }) => {
    await openStory(page, 'design-system-card--variants', mode === 'dark' ? 'mode:dark' : undefined)
    // Select the labels by their exact text nodes rendered in the story grid
    const targets = [
      '[data-testid="card-caption-default"]',
      '[data-testid="card-caption-elevated"]',
      '[data-testid="card-caption-glass"]',
      '[data-testid="card-caption-outlined"]',
      '[data-testid="card-caption-flat"]'
    ]
    for (const sel of targets) {
      const el = await page.locator(sel).first()
      const count = await el.count()
      if (!count) continue
      const handle = await el.elementHandle()
      const { color, backgroundColor } = await handle!.evaluate((node: HTMLElement) => {
        const cs = getComputedStyle(node)
        // Walk up until we find a background that is not transparent
        let p: HTMLElement | null = node
        let bg = 'rgba(0,0,0,0)'
        while (p) {
          const pcs = getComputedStyle(p)
          bg = pcs.backgroundColor
          if (!bg.includes('0)')) break
          p = p.parentElement
        }
        return { color: cs.color, backgroundColor: bg }
      })
      const parseRgb = (str: string) => {
        const m = /rgba?\(\s*(\d+)\s*[\s,]+\s*(\d+)\s*[\s,]+\s*(\d+)/.exec(str)
        return m ? { r: +m[1], g: +m[2], b: +m[3] } : { r: 0, g: 0, b: 0 }
      }
      const fg = parseRgb(color)
      const bg = parseRgb(backgroundColor)
      const ratio = contrastRatio(fg, bg)
      expect(ratio).toBeGreaterThanOrEqual(4.5)
    }
  })
}
