import React from 'react';
import { Alert } from 'react-native';
import { YStack, XStack, Text, Separator } from 'tamagui';
import { Screen, AppHeader, Button, Card, SectionHeader, InlineBadge, EmptyState, AppIcon } from '../../src/ui';
import { useTheme, useColors } from '../../src/styles/ThemeProvider';
import { StorageService } from '../../src/utils/storage';

export default function DeveloperScreen() {
  const { colorScheme, toggleColorScheme, isDark } = useTheme();
  const colors = useColors();

  const reset = async () => {
    await StorageService.resetOnboardingForTesting?.();
    Alert.alert('Onboarding reset', 'Restart the app to see onboarding again.');
  };

  return (
    <Screen scroll padding="$0" header={<AppHeader title="QA Playground" subtitle="Manually verify compact typography, illustrations, badges, and StatusBar" />}>
      <YStack padding="$4" space="$4">
        <Card>
          <XStack justifyContent="space-between" alignItems="center">
            <YStack>
              <Text fontSize={require('../../src/ui/tokens').font.body}>Theme</Text>
              <Text fontSize={require('../../src/ui/tokens').font.caption} color={colors.textSecondary}>Current: {colorScheme} • isDark: {String(isDark)}</Text>
            </YStack>
            <XStack space="$2">
              <Button variant="secondary" onPress={() => toggleColorScheme('light')}>Light</Button>
              <Button variant="secondary" onPress={() => toggleColorScheme('dark')}>Dark</Button>
              <Button variant="secondary" onPress={() => toggleColorScheme('system')}>System</Button>
            </XStack>
          </XStack>
        </Card>

        <Card>
          <SectionHeader title="Headings" subtitle="They should be compact and bold" paddingHorizontal={0} />
          <YStack space="$2">
            <Text fontSize={require('../../src/ui/tokens').font.title} fontWeight="700">$title heading</Text>
            <Text fontSize={require('../../src/ui/tokens').font.section} fontWeight="700">$section heading</Text>
            <Text fontSize={require('../../src/ui/tokens').font.body}>$body text</Text>
            <Text fontSize={require('../../src/ui/tokens').font.caption} color={colors.textSecondary}>$caption secondary text</Text>
          </YStack>
        </Card>

        <Card>
          <SectionHeader title="Badges" subtitle="Check contrast in dark and light" paddingHorizontal={0} />
          <XStack space="$2" alignItems="center">
            <InlineBadge text="INFO" tone="info" />
            <InlineBadge text="SUCCESS" tone="success" />
            <InlineBadge text="WARN" tone="warning" />
            <InlineBadge text="ERROR" tone="error" />
          </XStack>
        </Card>

        <Card>
          <SectionHeader title="Empty State" subtitle="With themed illustration" paddingHorizontal={0} />
          <EmptyState title="No data yet" subtitle="This is how empty states should look in both themes." actionLabel="Action" onAction={() => Alert.alert('Pressed')} icon="image-outline" />
        </Card>

        <Card>
          <SectionHeader title="Buttons" subtitle="Sizes and variants" paddingHorizontal={0} />
          <XStack space="$2">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost" accessibilityLabel="Search"><AppIcon name="search-outline" /></Button>
          </XStack>
        </Card>

        <Card>
          <SectionHeader title="Utilities" paddingHorizontal={0} />
          <XStack space="$2">
            <Button variant="secondary" onPress={reset}>Reset Onboarding</Button>
          </XStack>
        </Card>
      </YStack>
    </Screen>
  );
}

