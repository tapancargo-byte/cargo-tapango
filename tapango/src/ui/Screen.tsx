import React from 'react';
import { YStack, ScrollView } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsDark } from '../styles/ThemeProvider';
import { RefreshControl } from 'react-native';

export interface ScreenProps {
  children: React.ReactNode;
  scroll?: boolean;
  padding?: number | string;
  safeTop?: boolean;
  safeBottom?: boolean;
  gap?: number | string;
  header?: React.ReactNode;
  headerSticky?: boolean;
  headerShadow?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  // Edge-to-edge controls
  edgeToEdge?: boolean;
  statusBarPadding?: boolean; // when edgeToEdge, apply top inset
  navigationBarPadding?: boolean; // when edgeToEdge, apply bottom inset
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  scroll = false,
  padding = '$4',
  safeTop = true,
  safeBottom = true,
  gap,
  header,
  headerSticky = true,
  headerShadow = true,
  refreshing = false,
  onRefresh,
  edgeToEdge = false,
  statusBarPadding = true,
  navigationBarPadding = true,
}) => {
  const insets = useSafeAreaInsets();
  const isDark = useIsDark();
  const headerElevation = headerShadow ? (isDark ? 1 : 3) : 0;
  const content = (
    <YStack flex={1} backgroundColor='$background' padding={padding} space={gap}>
      {children}
    </YStack>
  );
  // Respect edge-to-edge overrides
  const padTop = safeTop && (!edgeToEdge || statusBarPadding) ? insets.top : 0;
  const padBottom = safeBottom && (!edgeToEdge || navigationBarPadding) ? insets.bottom : 0;

  if (scroll) {
    return (
      <YStack flex={1} backgroundColor='$background'>
        {header ? (
          headerSticky ? (
            <YStack elevation={headerElevation}>{header}</YStack>
          ) : null
        ) : null}
        <ScrollView
          style={{ backgroundColor: 'transparent' }}
          contentContainerStyle={{ paddingTop: padTop, paddingBottom: padBottom }}
          refreshControl={
            onRefresh ? (
              <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} />
            ) : undefined
          }
        >
          {!headerSticky && header ? (
            <YStack elevation={headerShadow ? 2 : 0}>{header}</YStack>
          ) : null}
          {content}
        </ScrollView>
      </YStack>
    );
  }
  return (
    <YStack flex={1} backgroundColor='$background' paddingTop={padTop} paddingBottom={padBottom}>
      {header ? <YStack elevation={headerElevation}>{header}</YStack> : null}
      {content}
    </YStack>
  );
};
