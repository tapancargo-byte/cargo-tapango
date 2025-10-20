# Contributing – Lint and Android validation

## Lint batches

We’re cleaning up lint in small PRs to avoid disruption:

- Batch 1: easy wins in tabs, merged to main.
- Batch 2: tabs cleanup + Android validation README (PR open).
- Batch 3: continue easy fixes (unused imports, missing awaits, avoid `require`
  patterns where possible).

Run locally:

```
pwsh path=null start=null
npm run format
npm run lint
```

Pre-commit runs `prettier` only. CI runs Storybook guards and an RNW shadow
guard.

## Android edge-to-edge validation

See README for device/emulator setup and checks. Use Android 15 (API 35) and
run:

```
pwsh path=null start=null
npm run android
```
