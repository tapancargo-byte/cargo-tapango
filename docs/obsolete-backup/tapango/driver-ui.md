# Driver UI Redesign

This document summarizes the Driver app redesign using the shared Tamagui design
system.

## Information architecture

- Jobs: list of available/assigned jobs with payout and quick Bid CTA.
- Bid: offer form (tracking ID, amount, note) with offline queueing.
- Wallet: earnings stats and transactions list.
- Profile: account details, integrated KYC (RC + License upload), theme
  settings, sign out.

## Components

- Shared: Button, Card/Elevated/Outlined/Glass, Input, Typography, Screen,
  AppIcon, BottomTabBar, Skeleton.
- Driver-specific: JobCard, TransactionRow, ProfileAvatar, KycUploader.

## Offline behavior

- Global OfflineBanner is mounted from the root layout.
- Offer and KYC submissions use services that queue when offline; users get
  clear feedback.

## Accessibility

- 44x44 minimum touch size.
- Clear accessibilityLabels on key actions (JobCard, Submit buttons).
- Contrast and spacing driven by theme tokens.

## Theming

- ThemeProvider supports light/dark/system; the Driver Profile includes a Theme
  section with persistent selection.

## Testing and QA checklist

- Jobs -> Bid prefill: opening a Job navigates to Bid with trackingId set.
- Submit Offer offline: should show “Offer queued” toast and appear once online.
- KYC uploads offline: “Queued” message and sync later.
- Wallet list shows skeletons while loading; empty state when no data.
- Profile theme toggle switches app theme immediately and persists across
  restarts.

## File map (key changes)

- app/(driver)/\_layout.tsx: custom Tamagui BottomTabBar.
- app/(driver)/index.tsx: Jobs with skeletons and navigation to Bid.
- app/(driver)/bid.tsx: Validated offer form with toast feedback and param
  prefill.
- app/(driver)/wallet.tsx: Stats card + transactions with skeletons/empty.
- app/(driver)/profile.tsx: Account + KYC + Theme settings.
- src/ui/driver/\*: Driver building blocks (JobCard, TransactionRow,
  ProfileAvatar, KycUploader).
