#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const projectRoot = process.cwd()
const targets = [
  path.join(projectRoot, 'storybook'),
  path.join(projectRoot, '.storybook'),
]

const IGNORE_DIRS = new Set(['node_modules', 'storybook-static', 'public', 'tests'])

/** @param {string} dir */
function* walk(dir) {
  const entries = fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }) : []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.has(entry.name)) yield* walk(full)
    } else if (entry.isFile()) {
      yield full
    }
  }
}

/** Simple file scanner for patterns */
function scanFile(file) {
  const text = fs.readFileSync(file, 'utf8')
  const rel = path.relative(projectRoot, file)
  const ext = path.extname(file)
  const errors = []

  // 1) Forbid jest.mock / vi.mock in Storybook runtime
  if (/\b(jest|vi)\.mock\(/.test(text)) {
    errors.push(`[forbidden mock] ${rel}: avoid jest/vi.mock in Storybook runtime`) 
  }

  // 2) Forbid JSX in .ts / .js under storybook (should be .tsx/.jsx)
  // Heuristic: match real JSX tags like <View> or <div>, not TS generics like Map<string>
  // Use negative lookbehind to ensure '<' is not preceded by an identifier character
  const jsxTag = /(?<![A-Za-z0-9_])<\s*[A-Za-z][A-Za-z0-9]*(\s|\/?>)/
  if ((ext === '.ts' || ext === '.js') && jsxTag.test(text)) {
    errors.push(`[jsx-in-non-jsx] ${rel}: JSX detected in ${ext} file (rename to .tsx/.jsx)`) 
  }

  // 3) Forbid window.React
  if (/window\.React\b/.test(text)) {
    errors.push(`[window-react] ${rel}: window.React reference is not allowed`) 
  }

  // 4) Bare React usage without import
  // If React. appears but there is no import React from 'react' nor import * as React
  if (/\bReact\./.test(text) && !/import\s+React\s+from\s+'react'/.test(text) && !/import\s+\*\s+as\s+React\s+from\s+'react'/.test(text)) {
    errors.push(`[react-without-import] ${rel}: uses React.* without importing React`) 
  }

  return errors
}

let allErrors = []
for (const base of targets) {
  for (const file of walk(base)) {
    // Skip images, JSON, CSS
    if (/\.(png|jpe?g|gif|svg|ico|json|md|css|d\.ts)$/i.test(file)) continue
    const errs = scanFile(file)
    if (errs.length) allErrors.push(...errs)
  }
}

if (allErrors.length) {
  console.error('\nStorybook runtime guard found issues:')
  for (const e of allErrors) console.error(' -', e)
  process.exit(1)
} else {
  console.log('Storybook runtime guard: OK')
}