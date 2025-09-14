import React from 'react';
import { Alert, ScrollView, useColorScheme, Dimensions } from 'react-native';
import { YStack, XStack, Text } from 'tamagui';
import { useUser } from '@clerk/clerk-expo';
import { notifyBookingCreated, presentLocal, getPushToken } from '../../src/utils/notifications';
import { checkForOTAUpdate } from '../../src/utils/updates';
import { useAppToast } from '../../src/ui/tg/ToastHost';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Screen,
  Button,
  Card,
  ElevatedCard,
  OutlinedCard,
  FlatCard,
  GlassCard,
  Title,
  Subtitle,
  SectionTitle,
  Caption,
  Circle,
  LoadingSpinner,
  Input,
} from '../../src/ui';
import { getTokens } from '../../src/design-system/tokens';
import { isSmsEnabled, sendSmsToExternalId } from '../../src/services/sms';
import { useIsDark, useTheme } from '../../src/styles/ThemeProvider';
import { StorageService } from '../../src/utils/storage';

// Local helper components for QA playground
const Chip: React.FC<{
  label: string;
  tone?: 'neutral' | 'info' | 'success' | 'warning' | 'danger';
}> = ({ label, tone = 'neutral' }) => {
  const isDark = useIsDark();
  const tokens = getTokens(isDark ? 'dark' : 'light');
  const { colors } = tokens;
  const map = {
    neutral: { bg: colors.primaryContainer, fg: colors.text },
    info: { bg: colors.infoContainer, fg: colors.text },
    success: { bg: colors.successContainer, fg: colors.text },
    warning: { bg: colors.warningContainer, fg: colors.text },
    danger: { bg: colors.dangerContainer, fg: colors.text },
  } as const;
  const { bg, fg } = map[tone];
  return (
    <XStack
      paddingHorizontal='$2'
      paddingVertical='$1.5'
      borderRadius='$3'
      backgroundColor={bg}
      alignItems='center'
    >
      <Caption color={fg}>{label}</Caption>
    </XStack>
  );
};

const EmptyStateExample: React.FC<{
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  onPress?: () => void;
}> = ({ title, subtitle, ctaLabel, onPress }) => {
  const isDark = useIsDark();
  const tokens = getTokens(isDark ? 'dark' : 'light');
  const { colors } = tokens;
  return (
    <OutlinedCard>
      <YStack space='$3' alignItems='center' padding='$4'>
        <Circle size={48} backgroundColor={colors.primaryContainer} />
        <YStack space='$1' alignItems='center'>
          <Text fontSize={tokens.typography.body} fontWeight='600' color={colors.text}>
            {title}
          </Text>
          {!!subtitle && <Caption color={colors.textSecondary}>{subtitle}</Caption>}
        </YStack>
        {!!ctaLabel && onPress && (
          <Button variant='primary' size='sm' onPress={onPress}>
            {ctaLabel}
          </Button>
        )}
      </YStack>
    </OutlinedCard>
  );
};

export default function DeveloperScreen() {
  const { user } = useUser();
  const isDark = useIsDark();
  const { colorScheme, toggleColorScheme } = useTheme();
  const tokens = getTokens(isDark ? 'dark' : 'light');
  const colors = tokens.colors;
  const insets = useSafeAreaInsets();
  const systemColorScheme = useColorScheme();
  const screenData = Dimensions.get('screen');
  const windowData = Dimensions.get('window');

  // Calculate safe horizontal padding
  const horizontalPadding = Math.max(16, insets.left, insets.right);
  const availableWidth = windowData.width - horizontalPadding * 2;

  const reset = async () => {
    await StorageService.resetOnboardingForTesting?.();
    Alert.alert('Onboarding reset', 'Restart the app to see onboarding again.');
  };

  const toast = useAppToast();

  const showThemeDebug = () => {
    Alert.alert(
      'Theme Debug Info',
      `App Theme: ${isDark ? 'Dark' : 'Light'}\n` +
        `Color Scheme Setting: ${colorScheme}\n` +
        `System: ${systemColorScheme || 'unknown'}\n` +
        `Screen: ${screenData.width}x${screenData.height}\n` +
        `Window: ${windowData.width}x${windowData.height}\n` +
        `Available Width: ${Math.round(availableWidth)}px\n` +
        `Safe Areas: T:${insets.top} R:${insets.right} B:${insets.bottom} L:${insets.left}`
    );
  };

  return (
    <Screen scroll={false} padding='$0'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: horizontalPadding,
          paddingTop: Math.max(16, insets.top),
          paddingBottom: Math.max(80, insets.bottom + 60), // Account for tab bar
        }}
      >
        <YStack space='$6'>
          {/* Header */}
          <ElevatedCard>
            <YStack space='$3' alignItems='center'>
              <Title color={colors.text}>QA Playground</Title>
              <Subtitle color={colors.textSecondary}>
                Manually verify compact typography, illustrations, badges, and StatusBar
              </Subtitle>
              <XStack space='$2' alignItems='center'>
                <Circle size={12} backgroundColor={colors.primary} />
                <Caption color={colors.textSecondary}>Theme: {isDark ? 'Dark' : 'Light'}</Caption>
              </XStack>
            </YStack>
          </ElevatedCard>

          {/* Theme Controls */}
          <YStack space='$4'>
            <SectionTitle color={colors.text}>Theme</SectionTitle>
            <Card>
              <YStack space='$4'>
                {/* Quick QA: Notifications */}
                <YStack space='$2'>
                  <Caption color={colors.textSecondary}>Notifications</Caption>
                  <XStack space='$2' flexWrap='wrap'>
                    <Button
                      size='sm'
                      variant='outline'
                      onPress={() =>
                        presentLocal({ title: 'Test notification', body: 'Hello from TAPANGO' })
                      }
                    >
                      Test Notification
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      onPress={() => notifyBookingCreated('TPG-DEMO-123')}
                    >
                      Simulate Booking Created
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      onPress={async () => {
                        toast.show('Checking for updates...');
                        await checkForOTAUpdate({
                          onDownloaded: () => toast.show('Update downloaded', 'Applying update...'),
                          onUpToDate: () => toast.show('Up to date', 'No updates available'),
                          onError: () =>
                            toast.show('Update check failed', 'Please try again later'),
                        });
                      }}
                    >
                      Check Updates Now
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      onPress={async () => {
                        const t = await getPushToken(true);
                        toast.show(t ? 'Push token refreshed' : 'No token available');
                      }}
                    >
                      Sync Push Token
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      onPress={async () => {
                        if (!isSmsEnabled()) {
                          toast.show(
                            'SMS disabled',
                            'Set EXPO_PUBLIC_ENABLE_BOOKING_SMS=true to enable'
                          );
                          return;
                        }
                        if (!user?.id) {
                          toast.show('Not signed in', 'Sign in to test SMS');
                          return;
                        }
                        const res = await sendSmsToExternalId(
                          user.id,
                          'TAPANGO test SMS: hello from Developer screen'
                        );
                        toast.show(
                          res.ok ? 'SMS sent' : 'SMS failed',
                          res.ok ? undefined : res.error || ''
                        );
                      }}
                    >
                      Send Test SMS
                    </Button>
                  </XStack>
                </YStack>
                {/* Current theme info */}
                <YStack space='$2'>
                  <Text fontSize={tokens.typography.body} color={colors.text}>
                    Current: {isDark ? 'dark' : 'light'} • isDark: {String(isDark)}
                  </Text>
                  <Caption color={colors.textSecondary}>
                    System: {systemColorScheme || 'unknown'} • Available width:{' '}
                    {Math.round(availableWidth)}px
                  </Caption>
                </YStack>

                {/* Theme toggle buttons - stacked on smaller screens */}
                <YStack space='$2'>
                  <Caption color={colors.textSecondary}>Theme Controls:</Caption>
                  <XStack space='$2' flexWrap='wrap' justifyContent='flex-start'>
                    <Button
                      variant={colorScheme === 'light' ? 'primary' : 'secondary'}
                      size='sm'
                      onPress={() => toggleColorScheme('light')}
                      minWidth={80}
                    >
                      Light
                    </Button>
                    <Button
                      variant={colorScheme === 'dark' ? 'primary' : 'secondary'}
                      size='sm'
                      onPress={() => toggleColorScheme('dark')}
                      minWidth={80}
                    >
                      Dark
                    </Button>
                    <Button
                      variant={colorScheme === 'system' ? 'primary' : 'outline'}
                      size='sm'
                      onPress={() => toggleColorScheme('system')}
                      minWidth={80}
                    >
                      System
                    </Button>
                  </XStack>

                  {/* Debug button */}
                  <XStack marginTop='$2'>
                    <Button variant='ghost' size='xs' onPress={showThemeDebug}>
                      📊 Debug Info
                    </Button>
                  </XStack>
                </YStack>
              </YStack>
            </Card>
          </YStack>

          {/* Typography */}
          <YStack space='$4'>
            <SectionTitle color={colors.text}>Headings</SectionTitle>
            <Card>
              <YStack space='$3'>
                <Caption color={colors.textSecondary}>They should be compact and bold</Caption>
                <Text fontSize={tokens.typography.display} fontWeight='800' color={colors.text}>
                  $title heading
                </Text>
                <Text fontSize={tokens.typography.section} fontWeight='700' color={colors.text}>
                  $section heading
                </Text>
                <Text fontSize={tokens.typography.body} color={colors.text}>
                  $body text
                </Text>
                <Text fontSize={tokens.typography.caption} color={colors.textSecondary}>
                  $caption secondary text
                </Text>
              </YStack>
            </Card>
          </YStack>

          {/* Badges */}
          <YStack space='$4'>
            <SectionTitle color={colors.text}>Badges</SectionTitle>
            <Card>
              <YStack space='$3'>
                <Caption color={colors.textSecondary}>Check contrast in dark and light</Caption>
                <XStack space='$2' flexWrap='wrap'>
                  <Chip label='INFO' tone='info' />
                  <Chip label='SUCCESS' tone='success' />
                  <Chip label='WARN' tone='warning' />
                  <Chip label='ERROR' tone='danger' />
                </XStack>
              </YStack>
            </Card>
          </YStack>

          {/* Empty States */}
          <YStack space='$4'>
            <SectionTitle color={colors.text}>Empty State</SectionTitle>
            <YStack space='$3'>
              <Caption color={colors.textSecondary}>With themed illustration</Caption>
              <YStack space='$2'>
                <EmptyStateExample
                  title='No data yet'
                  subtitle='This is how empty states should look in both themes.'
                />
                <EmptyStateExample
                  title='No results'
                  subtitle='Adjust your filters and try again.'
                  ctaLabel='Action'
                  onPress={() => Alert.alert('Pressed')}
                />
              </YStack>
            </YStack>
          </YStack>

          {/* Buttons */}
          <YStack space='$4'>
            <SectionTitle color={colors.text}>Buttons</SectionTitle>
            <Card>
              <YStack space='$3'>
                <Caption color={colors.textSecondary}>Sizes and variants</Caption>
                <YStack space='$3'>
                  <XStack space='$2' flexWrap='wrap'>
                    <Button variant='primary' size='md'>
                      Primary
                    </Button>
                    <Button variant='secondary' size='md'>
                      Secondary
                    </Button>
                    <Button variant='outline' size='md'>
                      Outline
                    </Button>
                    <Button variant='ghost' size='md'>
                      Ghost
                    </Button>
                  </XStack>
                  <XStack space='$2' flexWrap='wrap'>
                    <Button variant='primary' size='xs'>
                      XS
                    </Button>
                    <Button variant='primary' size='sm'>
                      SM
                    </Button>
                    <Button variant='primary' size='md'>
                      MD
                    </Button>
                    <Button variant='primary' size='lg'>
                      LG
                    </Button>
                  </XStack>
                </YStack>
              </YStack>
            </Card>
          </YStack>

          {/* Card Variants */}
          <YStack space='$4'>
            <SectionTitle color={colors.text}>Card Variants</SectionTitle>
            <YStack space='$3'>
              <XStack space='$2' flexWrap='wrap'>
                <YStack flex={1} minWidth={140} space='$2'>
                  <Card>
                    <Caption color={colors.textSecondary}>Default Card</Caption>
                    <Text fontSize={tokens.typography.body} color={colors.text}>
                      Standard surface
                    </Text>
                  </Card>
                </YStack>
                <YStack flex={1} minWidth={140} space='$2'>
                  <ElevatedCard>
                    <Caption color={colors.textSecondary}>Elevated Card</Caption>
                    <Text fontSize={tokens.typography.body} color={colors.text}>
                      With shadow
                    </Text>
                  </ElevatedCard>
                </YStack>
              </XStack>
              <XStack space='$2' flexWrap='wrap'>
                <YStack flex={1} minWidth={140} space='$2'>
                  <OutlinedCard>
                    <Caption color={colors.textSecondary}>Outlined Card</Caption>
                    <Text fontSize={tokens.typography.body} color={colors.text}>
                      With border
                    </Text>
                  </OutlinedCard>
                </YStack>
                <YStack flex={1} minWidth={140} space='$2'>
                  <FlatCard>
                    <Caption color={colors.textSecondary}>Flat Card</Caption>
                    <Text fontSize={tokens.typography.body} color={colors.text}>
                      Surface variant
                    </Text>
                  </FlatCard>
                </YStack>
              </XStack>
            </YStack>
          </YStack>

          {/* Interactive Elements */}
          <YStack space='$4'>
            <SectionTitle color={colors.text}>Interactive Elements</SectionTitle>
            <Card>
              <YStack space='$3' alignItems='center'>
                <LoadingSpinner size='sm' />
                <LoadingSpinner size='md' />
                <LoadingSpinner size='lg' />
                <Caption color={colors.textSecondary}>Loading states</Caption>
              </YStack>
            </Card>
          </YStack>

          {/* Utilities */}
          <YStack space='$4'>
            <SectionTitle color={colors.text}>Utilities</SectionTitle>
            <Card>
              <XStack space='$2'>
                <Button variant='secondary' onPress={reset}>
                  Reset Onboarding
                </Button>
              </XStack>
            </Card>
          </YStack>
        </YStack>
      </ScrollView>
    </Screen>
  );
}
