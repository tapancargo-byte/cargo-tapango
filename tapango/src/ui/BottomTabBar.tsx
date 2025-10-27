import React from 'react';
import { Stack, Text, XStack, YStack } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors, useIsDark } from '../styles/ThemeProvider';
import { Platform, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { Feather } from '@expo/vector-icons';
import { useCounts } from '../contexts/CountsContext';
// Avoid hard dependency on bottom-tabs type in typecheck
type BottomTabBarProps = any;

const ICON_SIZE = 22; // 22dp — matches Feather default weight well

// Routes that should never appear in the bottom tab bar (even if Expo Router adds them
// to the navigator for linking). This prevents auth or dev screens from leaking into the UI.
const HIDDEN_ROUTE_NAMES = new Set<string>(['developer', 'sign-in', 'sign-up', 'forgot-password']);

function getFeatherName(routeName: string): React.ComponentProps<typeof Feather>['name'] {
  switch (routeName) {
    case 'index':
      return 'home';
    case 'booking':
      return 'plus-circle';
    case 'tracking':
      return 'map-pin';
    case 'orders':
      return 'list';
    case 'profile':
      return 'user';
    // Driver routes
    case 'bid':
      return 'tag';
    case 'wallet':
      return 'credit-card';
    default:
      return 'home';
  }
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const isDark = useIsDark();
  const counts = useCounts?.() as any; // safe if provider missing

  const horizontalMargin = 12;
  // Keep a very small cushion below the pill while honoring the home indicator
  const bottomInset = Math.max(insets.bottom - 10, 0);
  const radius = 14;

  // Compute visible routes defensively: filter out any screen marked with href: null
  // and any route in the HIDDEN_ROUTE_NAMES set
  const visibleRoutes = state.routes.filter((route: any) => {
    if (HIDDEN_ROUTE_NAMES.has(route.name)) return false;
    const options = descriptors[route.key]?.options ?? {};
    // Expo Router uses href: null to hide a route from linking/navigation UIs
    if (options?.href === null) return false;
    // If a custom tabBarButton hides the route, also exclude
    if (options?.tabBarButton === null || options?.tabBarButton === (() => null)) return false;
    // If explicit "tabBarStyle: { display: 'none' }", treat it as hidden
    if (options?.tabBarStyle && options?.tabBarStyle.display === 'none') return false;
    return true;
  });

  const focusedKey = state.routes[state.index]?.key;

  return (
    <YStack position='relative' paddingHorizontal={horizontalMargin} paddingBottom={bottomInset}>
      <YStack
        position='relative'
        overflow='hidden'
        borderRadius={radius}
        borderWidth={1}
        borderColor={colors.border}
        // Subtle shadow/elevation for depth
        elevation={2}
        style={{
          shadowColor: '#000',
          shadowOpacity: 0.12,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
        }}
      >
        {/* Background: blur on native, solid fallback on web */}
        {Platform.OS !== 'web' ? (
          <BlurView
            style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            tint={isDark ? 'dark' : 'light'}
            intensity={25}
          />
        ) : (
          <YStack
            position='absolute'
            left={0}
            right={0}
            top={0}
            bottom={0}
            backgroundColor={colors.surface}
            opacity={0.98}
          />
        )}

        <YStack paddingTop={4} paddingBottom={4}>
          <XStack alignItems='center' justifyContent='space-between' paddingHorizontal={14}>
            {visibleRoutes.map((route: any) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? (options.tabBarLabel as string)
                  : options.title !== undefined
                    ? (options.title as string)
                    : route.name;

              const isFocused = route.key === focusedKey;
              const iconName = getFeatherName(route.name as string);

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  if (Platform.OS !== 'web') {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                  }
                  navigation.navigate(route.name);
                }
              };

              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };

              // Badge (dynamic): use Orders active count if available; fallback to static options
              let badge = options.tabBarBadge as number | string | undefined;
              if (badge === undefined && route.name === 'orders') {
                const active = Number(counts?.ordersActive ?? 0);
                if (active > 0) {
                  badge = active;
                }
              }

              return (
                <Stack key={route.key} alignItems='center' justifyContent='center' flex={1}>
                  <Pressable
                    accessibilityRole='tab'
                    accessibilityState={{ selected: isFocused }}
                    accessibilityLabel={label}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 6,
                      minWidth: 56,
                    }}
                  >
                    {/* Feather icon (bundled via @expo/vector-icons) */}
                    <Feather
                      name={iconName}
                      size={ICON_SIZE}
                      color={isFocused ? colors.primary : colors.textSecondary}
                    />

                    {/* Badge (optional) */}
                    {badge !== undefined ? (
                      <YStack
                        position='absolute'
                        top={2}
                        right={18}
                        minWidth={16}
                        height={16}
                        borderRadius={8}
                        backgroundColor={colors.danger}
                        alignItems='center'
                        justifyContent='center'
                        paddingHorizontal={4}
                      >
                        <Text color={colors.textOnPrimary} fontSize={10} numberOfLines={1}>
                          {String(badge)}
                        </Text>
                      </YStack>
                    ) : null}

                    {/* Label */}
                    <Text
                      fontSize={11}
                      color={isFocused ? colors.primary : colors.textSecondary}
                      marginTop={4}
                      accessibilityLabel={label}
                      accessibilityRole='text'
                    >
                      {label}
                    </Text>

                    {/* Active indicator */}
                    <YStack
                      height={3}
                      width={18}
                      borderRadius={2}
                      backgroundColor={isFocused ? colors.primary : 'transparent'}
                      marginTop={4}
                    />
                  </Pressable>
                </Stack>
              );
            })}
          </XStack>
        </YStack>
      </YStack>
    </YStack>
  );
};
