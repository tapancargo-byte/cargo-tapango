// New unified design system exports
export { Button } from '../design-system/components/Button';
export {
  Card,
  GlassCard,
  ElevatedCard,
  OutlinedCard,
  FlatCard,
} from '../design-system/components/Card';
export { Input } from '../design-system/components/Input';
export {
  Typography,
  Display,
  Headline,
  Title,
  Section as SectionTitle,
  Body as BodyText,
  Subtitle,
  Caption,
  Overline,
} from '../design-system/components/Typography';

// Back-compat named exports mapped from legacy Typography
export { Typography as TypographyBase } from '../design-system/components/Typography';
export {
  ErrorText,
  SuccessText,
  WarningText,
  InfoText,
  CenteredText,
  RightText,
} from './Typography';

// Legacy exports retained for compatibility (to be migrated incrementally)
export { ActionSheet } from './tg/Sheet';
export { EmptyState } from './EmptyState';
export { Select, type SelectOption } from './tg/Select';
export { Skeleton, SkeletonText } from './tg/Skeleton';
export { SectionHeader } from './SectionHeader';
export { StatChip } from './StatChip';
export { ProgressBar } from './ProgressBar';
// export { MapCard } from './MapCard' // Commented out for web compatibility
export { ListRow } from './ListRow';
export { Screen } from './Screen';
export { AppIcon } from './AppIcon';
export { InlineBadge } from './InlineBadge';
export { Circle } from './Primitives';
export { StatusPill } from './StatusPill';
export { AppHeader } from './AppHeader';
export { AnimatedBadge } from './AnimatedBadge';
export { FadeIn } from './FadeIn';
export { LoadingSpinner, LoadingOverlay } from './LoadingSpinner';
export { StatusBadge, type StatusVariant } from './StatusBadge';
export { AuthButton, AuthInput } from './auth';
export { BottomTabBar } from './BottomTabBar';
