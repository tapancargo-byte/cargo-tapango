import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const sb = 'http://localhost:6006'

async function openStory(page, id: string, globals?: string) {
  const url = globals ? `${sb}/iframe.html?id=${id}&globals=${globals}` : `${sb}/iframe.html?id=${id}`
  await page.goto(url)
  await page.waitForTimeout(300)
}

// Utility color helpers
function sRGB(c: number) { const x = c / 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4) }
function luminance({ r, g, b }: { r: number; g: number; b: number }) { const R = sRGB(r), G = sRGB(g), B = sRGB(b); return 0.2126*R + 0.7152*G + 0.0722*B }
function contrastRatio(fg: { r: number; g: number; b: number }, bg: { r: number; g: number; b: number }) { const L1 = luminance(fg); const L2 = luminance(bg); const brightest = Math.max(L1, L2); const darkest = Math.min(L1, L2); return (brightest + 0.05) / (darkest + 0.05) }
const parseRgb = (str: string) => { const m = /rgba?\(\s*(\d+)\s*[\s,]+\s*(\d+)\s*[\s,]+\s*(\d+)/.exec(str); return m ? { r: +m[1], g: +m[2], b: +m[3] } : { r: 0, g: 0, b: 0 } }

// a11y for StatusPill AllStatuses (light/dark)
for (const mode of ['light','dark'] as const) {
  test(`a11y: design-system-statuspill--all-statuses (${mode})`, async ({ page }) => {
    await openStory(page, 'design-system-statuspill--all-statuses', mode === 'dark' ? 'mode:dark' : undefined)
    // Include each pill container by test id
    let builder = new AxeBuilder({ page })
    const ids = ['pending','confirmed','in-transit','delivered','cancelled','delayed']
    let found = false
    for (const id of ids) {
      const sel = `[data-testid="statuspill-${id}"]`
      await page.waitForSelector(sel, { timeout: 1000 }).catch(() => {})
      const el = await page.$(sel)
      if (el) { builder = builder.include(sel); found = true }
    }
    if (!found) return
    const results = await builder.analyze()
    const filtered = results.violations.filter(v => !['meta-viewport','page-has-heading-one','region','landmark-one-main'].includes(v.id))
    expect(filtered).toEqual([])
  })
}

// Contrast checks for StatusPill Playground (text vs badge background)
for (const mode of ['light','dark'] as const) {
  test(`contrast: StatusPill Playground (${mode})`, async ({ page }) => {
    await openStory(page, 'design-system-statuspill--playground', mode === 'dark' ? 'mode:dark' : undefined)
    const target = '[data-testid="statuspill-playground"]'
    await page.waitForSelector(target)
    const { color, backgroundColor } = await page.$eval(target, (root: HTMLElement) => {
      const textEl = root.querySelector('span, strong, div') as HTMLElement || root
      const nodeCs = getComputedStyle(textEl)
      // Walk up to find nearest non-transparent background
      let p: HTMLElement | null = textEl
      let bg = 'rgba(0,0,0,0)'
      while (p) {
        const pcs = getComputedStyle(p)
        bg = pcs.backgroundColor
        if (!bg.includes('0)')) break
        p = p.parentElement
      }
      return { color: nodeCs.color, backgroundColor: bg }
    })
    const fg = parseRgb(color)
    const bg = parseRgb(backgroundColor)
    const ratio = contrastRatio(fg, bg)
    expect(ratio).toBeGreaterThanOrEqual(4.5)
  })
}

// Visual and contrast for CardExamples.WithContent
for (const mode of ['light','dark'] as const) {
  test(`visual: design-system-card-examples--with-content (${mode})`, async ({ page }) => {
    await openStory(page, 'design-system-card-examples--with-content', mode === 'dark' ? 'mode:dark' : undefined)
    await expect(page).toHaveScreenshot(`card-examples-with-content-${mode}.png`)
  })
  test(`contrast: design-system-card-examples--with-content (${mode})`, async ({ page }) => {
    await openStory(page, 'design-system-card-examples--with-content', mode === 'dark' ? 'mode:dark' : undefined)
    const targets = ['[data-testid="example-elevated-title"]','[data-testid="example-elevated-body"]','[data-testid="example-glass-title"]','[data-testid="example-glass-body"]']
    for (const sel of targets) {
      const el = await page.locator(sel).first()
      if (!(await el.count())) continue
      const handle = await el.elementHandle()
      const { color, backgroundColor } = await handle!.evaluate((node: HTMLElement) => {
        const cs = getComputedStyle(node)
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
      const fg = parseRgb(color)
      const bg = parseRgb(backgroundColor)
      const ratio = contrastRatio(fg, bg)
      expect(ratio).toBeGreaterThanOrEqual(4.5)
    }
  })
}
