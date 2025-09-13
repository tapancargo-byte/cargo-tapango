#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const TARGET_DIRS = ['src', 'app']
const PATTERNS = [
  /\bshadowColor\b/,
  /\bshadowOffset\b/,
  /\bshadowOpacity\b/,
  /\bshadowRadius\b/,
]

const IGNORE_DIRS = new Set(['node_modules', 'storybook', '.storybook', 'storybook-static'])

function* walk(dir) {
  const entries = fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }) : []
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (!IGNORE_DIRS.has(e.name)) yield* walk(full)
    } else if (e.isFile()) {
      yield full
    }
  }
}

let issues = []
for (const base of TARGET_DIRS) {
  const abs = path.join(ROOT, base)
  for (const file of walk(abs)) {
    if (!/\.(tsx|ts|jsx|js)$/.test(file)) continue
    const text = fs.readFileSync(file, 'utf8')
    const rel = path.relative(ROOT, file)

    // Heuristic: Only warn for files likely to run on web (used in Storybook or under ui/screens/components, or Expo router screens)
    const mightRunOnWeb = /(^src\/|^app\/\(.*\)\/|^app\/.*\.tsx$|ui|screens|components)/.test(rel)
    if (!mightRunOnWeb) continue

    for (const re of PATTERNS) {
      if (re.test(text)) {
        issues.push(`${rel}: contains RN shadow* prop. Use Platform guard + boxShadow on web.`)
        break
      }
    }
  }
}

if (issues.length) {
  console.log('\nRN Web shadow props found:')
  for (const msg of issues) console.log(' -', msg)
  process.exitCode = 1
} else {
  console.log('RN Web shadow lint: OK')
}