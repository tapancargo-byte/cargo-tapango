import React, { useState, useCallback } from 'react';
import { RefreshControl, Dimensions, Platform, Pressable } from 'react-native';
import { ScrollView as RNScrollView } from 'react-native';
import { router } from 'expo-router';
import { track } from '../../src/utils/analytics';
import { YStack, XStack, Text, Stack } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Button,
  Card,
  Skeleton,
  SkeletonText,
  ProgressBar,
  Screen,
  FadeIn,
  ElevatedCard,
  OutlinedCard,
  GlassCard,
  Title,
  SectionTitle,
  Subtitle,
  Caption,
  Circle,
  AnimatedBadge,
  AppIcon,
  StatChip,
} from '../../src/ui';
import { formatDate } from '../../src/utils/format';
import { loadBookingDraft } from '../../src/utils/drafts';
import { getRecentAddresses } from '../../src/utils/addressHistory';
import { StorageService } from '../../src/utils/storage';
import { MCPTestComponent } from '../../src/components/MCPTestComponent';
// Use AppIcon for consistent cross-family icon mapping
import { useColors as useAppColors } from '../../src/styles/ThemeProvider';
import { useIsDark } from '../../src/styles/ThemeProvider';
import { getTokens } from '../../src/design-system/tokens';
import { useUser } from '@clerk/clerk-expo';
import { useFocusEffect } from '@react-navigation/native';
import { useCounts } from '../../src/contexts/CountsContext';
import Animated, { FadeInDown } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import Constants from 'expo-constants';
import { TopActionsCarousel } from '../../src/components/home/TopActionsCarousel';

// Platform-specific map imports - temporarily disabled for web compatibility
let MapView: any = null;
let Marker: any = null;
let PROVIDER_GOOGLE: any = null;

// TODO: Re-enable maps with proper web bundling exclusion
// Maps functionality temporarily disabled to fix web build
// if (Platform.OS !== 'web') {
//   try {
//     const maps = require('react-native-maps');
//     MapView = maps.default || maps;
//     Marker = maps.Marker;
//     PROVIDER_GOOGLE = maps.PROVIDER_GOOGLE;
//   } catch (e) {
//     console.warn('Failed to load react-native-maps:', e);
//   }
// }

const { width: screenWidth } = Dimensions.get('window');

/**
 * Dashboard Home Screen (redesigned)
 * - Hero map card with live overview
 * - Horizontal stats chips
 * - Recent shipments list with progress and skeleton loaders
 * - Keeps Drafts + Recent Addresses section
 */

type Shipment = {
  id: string;
  status: 'in-transit' | 'delivered' | 'pending' | 'delayed';
  origin: string;
  destination: string;
  estimatedDelivery: string; // ISO date
  progress: number; // 0-100
  priority?: 'standard' | 'express' | 'urgent';
  cargoType?: string;
  weight?: string;
};

// TAPANGO operates between Imphal and New Delhi
const mockRecentShipments: Shipment[] = [
  {
    id: 'TPG-2024-001',
    status: 'in-transit',
    origin: 'Imphal',
    destination: 'New Delhi',
    estimatedDelivery: '2024-01-20',
    progress: 75,
    priority: 'express',
    cargoType: 'Electronics',
    weight: '25 kg',
  },
  {
    id: 'TPG-2024-002',
    status: 'delivered',
    origin: 'New Delhi',
    destination: 'Imphal',
    estimatedDelivery: '2024-01-18',
    progress: 100,
    priority: 'standard',
    cargoType: 'Documents',
    weight: '2 kg',
  },
  {
    id: 'TPG-2024-003',
    status: 'pending',
    origin: 'Imphal',
    destination: 'New Delhi',
    estimatedDelivery: '2024-01-22',
    progress: 5,
    priority: 'urgent',
    cargoType: 'Medical Supplies',
    weight: '18 kg',
  },
  {
    id: 'TPG-2024-004',
    status: 'in-transit',
    origin: 'New Delhi',
    destination: 'Imphal',
    estimatedDelivery: '2024-01-21',
    progress: 40,
    priority: 'standard',
    cargoType: 'General Cargo',
    weight: '45 kg',
  },
];

// Build stats chip data from counts and local fallbacks
function buildStatsData(counts: ReturnType<typeof useCounts> | null) {
  const { formatINR } = require('../../src/utils/currency');
  const shipmentsActive =
    counts?.shipmentsActive ?? mockRecentShipments.filter((s) => s.status === 'in-transit').length;
  const ordersPast =
    counts?.ordersPast ?? mockRecentShipments.filter((s) => s.status === 'delivered').length;
  const tiles: any[] = [
    {
      label: require('../../src/i18n').t('statActive'),
      value: String(shipmentsActive),
      iconName: 'car-outline' as const,
      tint: '#3B82F6',
    },
    {
      label: require('../../src/i18n').t('statDelivered'),
      value: String(ordersPast),
      iconName: 'cube-outline' as const,
      tint: '#10B981',
    },
  ];
  if (counts?.savedAmountInr != null)
    tiles.push({
      label: require('../../src/i18n').t('statSaved'),
      value: formatINR(counts.savedAmountInr),
      iconName: 'cash-outline' as const,
      tint: '#8B5CF6',
    });
  if (counts?.onTimePercent != null)
    tiles.push({
      label: require('../../src/i18n').t('statOnTime'),
      value: `${counts.onTimePercent}%`,
      iconName: 'stats-chart-outline' as const,
      tint: '#F59E0B',
    });
  return tiles;
}

const ModernHeroSection = ({
  user,
  tokens,
  colors,
  onNewOrder,
  onTrackShipment,
  onViewOrders,
  firstNameOverride,
}: any) => {
  return (
    <YStack space='$6'>
      {/* Welcome Header - Clean and Minimal */}
      <YStack space='$3'>
        <Caption
          color={colors.textSecondary}
          fontSize={14}
          textTransform='uppercase'
          letterSpacing={1}
        >
          Welcome to TAPANGO
        </Caption>
        <YStack space='$2'>
          <Title fontSize={32} fontWeight='800' color={colors.text} lineHeight={38}>
            {firstNameOverride && firstNameOverride.trim().length > 0
              ? `Hello, ${firstNameOverride}`
              : user?.firstName?.trim()
              ? `Hello, ${user.firstName}`
              : 'Hello'}
          </Title>
          <Subtitle fontSize={16} color={colors.textSecondary} fontWeight='400' lineHeight={24}>
            Connecting Imphal and New Delhi Through Efficient Cargo Solutions
          </Subtitle>
        </YStack>
      </YStack>
    </YStack>
  );
};

const StatsChips = ({ shipments, colors }: any) => {
  const inTransit = shipments.filter((s: Shipment) => s.status === 'in-transit').length;
  const delivered = shipments.filter((s: Shipment) => s.status === 'delivered').length;
  const pending = shipments.filter((s: Shipment) => s.status === 'pending').length;
  const urgent = shipments.filter((s: Shipment) => s.priority === 'urgent').length;

  const chips = [
    { label: 'In Transit', value: String(inTransit), icon: 'car', tint: colors.primary },
    {
      label: 'Delivered',
      value: String(delivered),
      icon: 'checkmark-circle',
      tint: colors.success,
    },
    { label: 'Pending', value: String(pending), icon: 'time', tint: colors.warning },
    { label: 'Urgent', value: String(urgent), icon: 'alert-circle', tint: colors.danger },
  ];

  return (
    <YStack space='$3'>
      <YStack space='$1'>
        <SectionTitle fontSize={20} fontWeight='700' color={colors.text}>
          Status at a Glance
        </SectionTitle>
        <Caption color={colors.textSecondary}>Real-time shipment status across the network</Caption>
      </YStack>

      <RNScrollView horizontal showsHorizontalScrollIndicator={false}>
        <XStack space='$2' paddingRight='$4'>
          {chips.map((c) => (
            <StatChip
              key={c.label}
              icon={c.icon}
              label={c.label}
              value={c.value}
              tint={c.tint}
              onPress={() => {
                const segment = c.label === 'Delivered' ? 'Past' : 'Active';
                track('status_chip_clicked', { label: c.label, segment });
                router.push(`/(tabs)/orders?segment=${segment}` as any);
              }}
            />
          ))}
        </XStack>
      </RNScrollView>
    </YStack>
  );
};

const RouteMapCard = ({ colors }: any) => {
  return (
    <ElevatedCard variant='elevated'>
      <YStack space='$3'>
        <XStack alignItems='center' justifyContent='space-between'>
          <YStack>
            <SectionTitle color={colors.text}>Network Overview</SectionTitle>
            <Text fontSize={12} color={colors.textSecondary}>
              Seamless cargo movement across corridors
            </Text>
          </YStack>
        </XStack>

        <Stack
          height={200}
          borderRadius='$3'
          overflow='hidden'
          backgroundColor={colors.surfaceVariant}
        >
          <LottieView
            source={require('../../assets/lottie/home-section.json')}
            autoPlay
            loop
            style={{ width: '100%', height: '100%' }}
            resizeMode='cover'
          />
        </Stack>
      </YStack>
    </ElevatedCard>
  );
};

export default function DashboardScreen() {
  const palette = useAppColors();
  const { user } = useUser();
  const [supaFirstName, setSupaFirstName] = React.useState<string | null>(null);

  const deriveFirstNameFromUser = (u: any): string | null => {
    const clerkFirst = u?.firstName?.trim();
    if (clerkFirst) return clerkFirst;
    const email: string | undefined = u?.emailAddresses?.[0]?.emailAddress;
    if (!email) return null;
    const local = email.split('@')[0] || '';
    const token =
      local
        .replace(/[^a-zA-Z]+/g, ' ')
        .trim()
        .split(/\s+/)[0] || '';
    if (!token) return null;
    return token.charAt(0).toUpperCase() + token.slice(1).toLowerCase();
  };
  const [refreshing, setRefreshing] = useState(false);

  // Actions
  const handleNewOrder = () => {
    track('top_action_clicked', { action: 'create_shipment' });
    router.push('/(tabs)/booking');
  };
  const safeName = (supaFirstName || user?.firstName || '').trim();
  const handleViewOrders = () => {
    track('top_action_clicked', { action: 'view_orders' });
    router.push('/(tabs)/orders');
  };
  const handleTrackShipment = () => {
    track('top_action_clicked', { action: 'track_package' });
    router.push('/(tabs)/tracking');
  };

  // Drafts + recent addresses
  const [hasDraft, setHasDraft] = React.useState(false);
  const [recentPickups, setRecentPickups] = React.useState<string[]>([]);
  const [recentDeliveries, setRecentDeliveries] = React.useState<string[]>([]);

  // Shipments (mocked for now) with skeleton during initial load
  const [shipments, setShipments] = React.useState<Shipment[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [shipmentsSegment, setShipmentsSegment] = React.useState<'Active' | 'Past'>('Active');

  React.useEffect(() => {
    (async () => {
      const d = await loadBookingDraft();
      setHasDraft(!!d);
      const pickups = await getRecentAddresses('pickup');
      const deliveries = await getRecentAddresses('delivery');
      setRecentPickups(pickups.map((p: any) => p.formatted));
      setRecentDeliveries(deliveries.map((p: any) => p.formatted));
    })();
  }, []);

  React.useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setShipments(mockRecentShipments);
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  // Fetch profile name from Supabase by email (via anon key + RLS)
  React.useEffect(() => {
    (async () => {
      try {
        const email = user?.emailAddresses?.[0]?.emailAddress;
        if (!email) {
          setSupaFirstName(null);
          return;
        }
        const { getOrCreateFirstName } = await import('../../src/services/profile');
        const first = await getOrCreateFirstName(
          email,
          [user?.firstName, user?.lastName].filter(Boolean).join(' ').trim() || undefined
        );
        setSupaFirstName(first || null);
      } catch {
        setSupaFirstName(null);
      }
    })();
  }, [user?.emailAddresses?.[0]?.emailAddress]);

  // Refresh counts when this screen gets focus
  const counts = useCounts();
  useFocusEffect(
    useCallback(() => {
      counts?.refresh?.();
    }, [counts?.refresh])
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setRefreshing(false);
      counts?.refresh?.();
    }, 1000);
  }, [counts]);

  // Map focused on TAPANGO operational corridor: Imphal to New Delhi
  const mapRegion = {
    latitude: 26.8467, // Midpoint between Imphal (24.8170°N) and New Delhi (28.7041°N)
    longitude: 79.4589, // Midpoint between Imphal (93.9368°E) and New Delhi (77.1025°E)
    latitudeDelta: 8.0, // Show both cities in view
    longitudeDelta: 20.0, // Cover the operational corridor
  };

  const MinimalShipmentCard = ({ shipment, colors }: { shipment: Shipment; colors: any }) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'in-transit':
          return colors.primary;
        case 'delivered':
          return colors.success;
        case 'pending':
          return colors.warning;
        case 'delayed':
          return colors.error;
        default:
          return colors.textSecondary;
      }
    };

    return (
      <OutlinedCard variant='outlined' animation='fade' padding='$3'>
        <Pressable
          onPress={() => router.push(`/(tabs)/tracking?id=${shipment.id}` as any)}
          accessibilityRole='button'
          accessibilityLabel={`Track ${shipment.id}`}
        >
          <YStack space='$2'>
            <XStack alignItems='center' justifyContent='space-between'>
              <XStack alignItems='center' space='$2' flex={1} minWidth={0}>
                <Circle size={8} backgroundColor={getStatusColor(shipment.status)} />
                <YStack flex={1} minWidth={0}>
                  <Text fontSize={14} fontWeight='800' color={colors.text} numberOfLines={1}>
                    {shipment.id}
                  </Text>
                  <Text fontSize={12} color={colors.textSecondary} numberOfLines={1}>
                    {shipment.origin} → {shipment.destination}
                  </Text>
                </YStack>
              </XStack>

              <XStack alignItems='center' space='$1'>
                <AppIcon name='time' size={11} color={colors.textSecondary} />
                <Text fontSize={11} color={colors.textSecondary}>
                  {formatDate(shipment.estimatedDelivery)}
                </Text>
                <AppIcon name='chevron-forward' size={12} color={colors.textTertiary} />
              </XStack>
            </XStack>

            {shipment.status !== 'delivered' && (
              <ProgressBar
                value={shipment.progress}
                height={3}
                backgroundColor={colors.surfaceVariant}
              />
            )}
          </YStack>
        </Pressable>
      </OutlinedCard>
    );
  };

  const screenCounts = counts;

  const filteredRecent = React.useMemo(
    () =>
      shipments
        .filter((s) =>
          shipmentsSegment === 'Active' ? s.status !== 'delivered' : s.status === 'delivered'
        )
        .slice(0, 3),
    [shipments, shipmentsSegment]
  );

  const segmentCount = React.useMemo(
    () =>
      shipments.filter((s) =>
        shipmentsSegment === 'Active' ? s.status !== 'delivered' : s.status === 'delivered'
      ).length,
    [shipments, shipmentsSegment]
  );

  const segmentCounts = React.useMemo(() => {
    const active = shipments.filter((s) => s.status !== 'delivered').length;
    const past = shipments.filter((s) => s.status === 'delivered').length;
    return { active, past };
  }, [shipments]);

  return (
    <Screen scroll={false} padding='$0' safeTop={true} safeBottom={true}>
      {/* analytics: home_opened */}
      {React.useMemo(() => {
        track('home_opened');
        return null;
      }, [])}
      {/* Scrollable body (including hero/actions) */}
      <RNScrollView
        style={{ backgroundColor: 'transparent' }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={palette.primary}
          />
        }
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior='automatic'
        stickyHeaderIndices={[1]}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* 0: Hero section */}
        <FadeIn>
          <YStack space='$4' paddingHorizontal='$4' paddingTop='$4' paddingBottom={12}>
            <ModernHeroSection
              user={user}
              colors={palette}
              tokens={getTokens('light')}
              onNewOrder={handleNewOrder}
              onTrackShipment={handleTrackShipment}
              onViewOrders={handleViewOrders}
              firstNameOverride={supaFirstName ?? deriveFirstNameFromUser(user)}
            />
          </YStack>
        </FadeIn>

        {/* 1: Sticky top actions carousel (gated by feature flag) */}
        {(Constants as any)?.expoConfig?.extra?.features?.homeMinimalV2 ?? true ? (
          <YStack backgroundColor='$background'>
            <TopActionsCarousel
              colors={palette}
              onNewOrder={handleNewOrder}
              onTrack={handleTrackShipment}
              onViewOrders={handleViewOrders}
            />
          </YStack>
        ) : null}

        {/* 2: Rest of content */}
        <FadeIn>
          <YStack space='$4' paddingHorizontal='$4' paddingTop='$4' paddingBottom={24}>
            {/* Status chips */}
            <StatsChips shipments={shipments} colors={palette} />

            {/* Network Overview Animation */}
            <RouteMapCard colors={palette} />

            {/* Recent Shipments Section */}
            <YStack space='$3'>
              <XStack alignItems='center' justifyContent='space-between'>
                <SectionTitle color={palette.text}>Recent Shipments</SectionTitle>
                {/* Minimal segmented toggle */}
                <XStack
                  alignItems='center'
                  borderWidth={1}
                  borderColor={palette.border}
                  borderRadius={9999}
                  paddingHorizontal='$1'
                  paddingVertical='$1'
                  backgroundColor={palette.surface}
                >
                  {(['Active', 'Past'] as const).map((label) => {
                    const selected = shipmentsSegment === label;
                    const count = label === 'Active' ? segmentCounts.active : segmentCounts.past;
                    return (
                      <Pressable key={label} onPress={() => setShipmentsSegment(label)}>
                        <XStack
                          paddingHorizontal='$2'
                          paddingVertical={6}
                          borderRadius={9999}
                          backgroundColor={selected ? palette.primary + '15' : 'transparent'}
                        >
                          <Text
                            fontSize={12}
                            fontWeight={selected ? '800' : '600'}
                            color={selected ? palette.primary : palette.textSecondary}
                          >
                            {`${label} (${count})`}
                          </Text>
                        </XStack>
                      </Pressable>
                    );
                  })}
                </XStack>
              </XStack>

              {loading ? (
                <YStack space='$3'>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <OutlinedCard key={i} variant='outlined'>
                      <YStack space='$2'>
                        <Skeleton height={16} width={'60%' as any} />
                        <SkeletonText lines={2} />
                        <Skeleton height={6} radius={3} />
                      </YStack>
                    </OutlinedCard>
                  ))}
                </YStack>
              ) : (
                <YStack space='$2'>
                  {filteredRecent.length === 0 ? (
                    <Text color={palette.textSecondary} fontSize={13}>
                      No shipments in this segment
                    </Text>
                  ) : (
                    <>
                      {filteredRecent.map((shipment) => (
                        <MinimalShipmentCard
                          key={shipment.id}
                          shipment={shipment}
                          colors={palette}
                        />
                      ))}
                      <Button
                        variant='ghost'
                        size='sm'
                        onPress={handleViewOrders}
                        style={{ alignSelf: 'flex-end' }}
                      >
                        <XStack alignItems='center' space='$1'>
                          <Text color={palette.primary} fontSize={13}>
                            See all ({segmentCount})
                          </Text>
                          <AppIcon name='chevron-forward' size={13} color={palette.primary} />
                        </XStack>
                      </Button>
                    </>
                  )}
                </YStack>
              )}
            </YStack>

            {/* Quick Actions Section */}
            {(hasDraft || recentPickups.length > 0 || recentDeliveries.length > 0) && (
              <ElevatedCard variant='elevated'>
                <YStack space='$3'>
                  <XStack alignItems='center' space='$3'>
                    <Circle size={40} backgroundColor={palette.secondary + '20'}>
                      <AppIcon name='flash' size={20} color={palette.secondary} />
                    </Circle>
                    <YStack>
                      <SectionTitle color={palette.text}>Quick Actions</SectionTitle>
                      <Text fontSize={12} color={palette.textSecondary}>
                        Resume drafts and recent locations
                      </Text>
                    </YStack>
                  </XStack>

                  {hasDraft && (
                    <Button
                      variant='outline'
                      onPress={() => router.push('/(tabs)/booking?resumeDraft=1' as any)}
                      leftIcon={<AppIcon name='document-text' size={16} />}
                    >
                      Resume Last Draft
                    </Button>
                  )}

                  {(recentPickups.length > 0 || recentDeliveries.length > 0) && (
                    <YStack space='$2'>
                      <SectionTitle color={palette.text}>Recent Addresses</SectionTitle>
                      <RNScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <XStack space='$2'>
                          {[...recentPickups, ...recentDeliveries]
                            .slice(0, 5)
                            .map((address, index) => (
                              <Card key={index} variant='flat'>
                                <Text fontSize={12} numberOfLines={1} maxWidth={120}>
                                  {address}
                                </Text>
                              </Card>
                            ))}
                        </XStack>
                      </RNScrollView>
                    </YStack>
                  )}
                </YStack>
              </ElevatedCard>
            )}

            {/* Active Shipments Alert */}
            {shipments.some((s) => s.status === 'in-transit') && (
              <GlassCard variant='glass' animation='slide'>
                <XStack alignItems='center' space='$3'>
                  <Circle size={40} backgroundColor={palette.primary + '20'}>
                    <AppIcon name='car' size={20} color={palette.primary} />
                  </Circle>
                  <YStack flex={1}>
                    <Text fontSize={16} fontWeight='700' color={palette.text}>
                      {shipments.filter((s) => s.status === 'in-transit').length} Active Shipments
                    </Text>
                    <Subtitle color={palette.textSecondary}>
                      Tap to view live tracking updates
                    </Subtitle>
                  </YStack>
                  <Button variant='primary' size='sm' onPress={handleTrackShipment}>
                    Track Live
                  </Button>
                </XStack>
              </GlassCard>
            )}

            {/* MCP Integration Test Component - Development Only */}
            {process.env.NODE_ENV === 'development' && <MCPTestComponent />}
          </YStack>
        </FadeIn>
      </RNScrollView>
    </Screen>
  );
}
