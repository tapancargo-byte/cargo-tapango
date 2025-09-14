import React, { useState, useCallback } from 'react';
import { RefreshControl, Dimensions, Platform } from 'react-native';
import { ScrollView as RNScrollView } from 'react-native';
import { router } from 'expo-router';
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
} from '../../src/ui';
import { formatDate } from '../../src/utils/format';
import { loadBookingDraft } from '../../src/utils/drafts';
import { getRecentAddresses } from '../../src/utils/addressHistory';
import { StorageService } from '../../src/utils/storage';
// Use AppIcon for consistent cross-family icon mapping
import { useColors as useAppColors } from '../../src/styles/ThemeProvider';
import { useIsDark } from '../../src/styles/ThemeProvider';
import { getTokens } from '../../src/design-system/tokens';
import { useUser } from '@clerk/clerk-expo';
import { useFocusEffect } from '@react-navigation/native';
import { useCounts } from '../../src/contexts/CountsContext';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

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

const ModernHeroSection = ({ user, tokens, colors, onNewOrder, onTrackShipment }: any) => {
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
            {user?.firstName ? `Hello, ${user.firstName}` : 'Your Logistics Hub'}
          </Title>
          <Subtitle fontSize={16} color={colors.textSecondary} fontWeight='400' lineHeight={24}>
            Seamless cargo delivery between Imphal and New Delhi
          </Subtitle>
        </YStack>
      </YStack>

      {/* Primary Actions - Modern Button Design */}
      <YStack space='$4'>
        <Button
          size='lg'
          variant='primary'
          onPress={onNewOrder}
          borderRadius={16}
          padding='$4'
          backgroundColor={colors.primary}
          pressStyle={{ backgroundColor: colors.primaryPress, transform: [{ scale: 0.98 }] }}
        >
          <XStack alignItems='center' space='$3' flex={1} justifyContent='center'>
            <Circle size={32} backgroundColor='rgba(255,255,255,0.2)'>
              <AppIcon name='add' size={16} color='white' />
            </Circle>
            <YStack alignItems='flex-start'>
              <Text fontSize={16} fontWeight='600' color='white'>
                Create New Shipment
              </Text>
              <Text fontSize={12} color='rgba(255,255,255,0.8)'>
                Book and track your cargo
              </Text>
            </YStack>
          </XStack>
        </Button>

        <XStack space='$3'>
          <Button
            flex={1}
            variant='outline'
            onPress={onTrackShipment}
            borderRadius={12}
            borderColor={colors.border}
            backgroundColor={colors.surface}
            pressStyle={{ backgroundColor: colors.surfaceVariant }}
          >
            <XStack alignItems='center' space='$2'>
              <AppIcon name='search' size={16} color={colors.primary} />
              <Text fontSize={14} fontWeight='500' color={colors.text}>
                Track Package
              </Text>
            </XStack>
          </Button>

          <Button
            flex={1}
            variant='outline'
            onPress={() => router.push('/(tabs)/orders')}
            borderRadius={12}
            borderColor={colors.border}
            backgroundColor={colors.surface}
            pressStyle={{ backgroundColor: colors.surfaceVariant }}
          >
            <XStack alignItems='center' space='$2'>
              <AppIcon name='list' size={16} color={colors.primary} />
              <Text fontSize={14} fontWeight='500' color={colors.text}>
                View Orders
              </Text>
            </XStack>
          </Button>
        </XStack>
      </YStack>
    </YStack>
  );
};

const ModernStatsOverview = ({ shipments, colors, tokens }: any) => {
  const stats = [
    {
      label: 'In Transit',
      value: shipments.filter((s: Shipment) => s.status === 'in-transit').length,
      icon: 'car',
      color: colors.primary,
      bgColor: colors.primary + '12',
    },
    {
      label: 'Delivered',
      value: shipments.filter((s: Shipment) => s.status === 'delivered').length,
      icon: 'checkmark-circle',
      color: colors.success,
      bgColor: colors.success + '12',
    },
    {
      label: 'Pending',
      value: shipments.filter((s: Shipment) => s.status === 'pending').length,
      icon: 'time',
      color: colors.warning,
      bgColor: colors.warning + '12',
    },
    {
      label: 'Urgent',
      value: shipments.filter((s: Shipment) => s.priority === 'urgent').length,
      icon: 'alert-circle',
      color: colors.danger,
      bgColor: colors.danger + '12',
    },
  ];

  return (
    <YStack space='$4'>
      {/* Section Header */}
      <YStack space='$1'>
        <SectionTitle fontSize={20} fontWeight='700' color={colors.text}>
          Overview
        </SectionTitle>
        <Caption color={colors.textSecondary}>Real-time shipment status across the network</Caption>
      </YStack>

      {/* Stats Grid - 2x2 layout */}
      <YStack space='$3'>
        <XStack space='$3'>
          {stats.slice(0, 2).map((stat, index) => (
            <Animated.View
              key={stat.label}
              entering={FadeInDown.delay(index * 100)}
              style={{ flex: 1 }}
            >
              <ElevatedCard hover padding='$4' borderRadius={16} backgroundColor={colors.surface}>
                <YStack space='$3' alignItems='flex-start'>
                  <XStack alignItems='center' justifyContent='space-between' width='100%'>
                    <Circle size={40} backgroundColor={stat.bgColor}>
                      <AppIcon name={stat.icon as any} size={18} color={stat.color} />
                    </Circle>
                    <Text fontSize={28} fontWeight='800' color={stat.color} lineHeight={32}>
                      {stat.value}
                    </Text>
                  </XStack>
                  <Text
                    fontSize={13}
                    fontWeight='500'
                    color={colors.textSecondary}
                    textTransform='uppercase'
                    letterSpacing={0.5}
                  >
                    {stat.label}
                  </Text>
                </YStack>
              </ElevatedCard>
            </Animated.View>
          ))}
        </XStack>

        <XStack space='$3'>
          {stats.slice(2, 4).map((stat, index) => (
            <Animated.View
              key={stat.label}
              entering={FadeInDown.delay((index + 2) * 100)}
              style={{ flex: 1 }}
            >
              <ElevatedCard hover padding='$4' borderRadius={16} backgroundColor={colors.surface}>
                <YStack space='$3' alignItems='flex-start'>
                  <XStack alignItems='center' justifyContent='space-between' width='100%'>
                    <Circle size={40} backgroundColor={stat.bgColor}>
                      <AppIcon name={stat.icon as any} size={18} color={stat.color} />
                    </Circle>
                    <Text fontSize={28} fontWeight='800' color={stat.color} lineHeight={32}>
                      {stat.value}
                    </Text>
                  </XStack>
                  <Text
                    fontSize={13}
                    fontWeight='500'
                    color={colors.textSecondary}
                    textTransform='uppercase'
                    letterSpacing={0.5}
                  >
                    {stat.label}
                  </Text>
                </YStack>
              </ElevatedCard>
            </Animated.View>
          ))}
        </XStack>
      </YStack>
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
  const [refreshing, setRefreshing] = useState(false);

  // Actions
  const handleNewOrder = () => router.push('/(tabs)/booking');
  const handleViewOrders = () => router.push('/(tabs)/orders');
  const handleTrackShipment = () => router.push('/(tabs)/tracking');

  // Drafts + recent addresses
  const [hasDraft, setHasDraft] = React.useState(false);
  const [recentPickups, setRecentPickups] = React.useState<string[]>([]);
  const [recentDeliveries, setRecentDeliveries] = React.useState<string[]>([]);

  // Shipments (mocked for now) with skeleton during initial load
  const [shipments, setShipments] = React.useState<Shipment[]>([]);
  const [loading, setLoading] = React.useState(true);

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

  const PremiumShipmentCard = ({ shipment, colors }: { shipment: Shipment; colors: any }) => {
    const getPriorityColor = (priority?: string) => {
      switch (priority) {
        case 'urgent':
          return colors.error;
        case 'express':
          return colors.warning;
        default:
          return colors.textSecondary;
      }
    };

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
      <ElevatedCard variant='elevated' animation='slide' hover>
        <YStack space='$3'>
          <XStack alignItems='center' justifyContent='space-between'>
            <YStack flex={1}>
              <XStack alignItems='center' space='$2'>
                <Text fontSize={16} fontWeight='700' color={colors.text}>
                  {shipment.id}
                </Text>
                {shipment.priority === 'urgent' && (
                  <Circle size={6} backgroundColor={colors.error} />
                )}
              </XStack>
              <Text fontSize={14} color={colors.textSecondary}>
                {shipment.origin} → {shipment.destination}
              </Text>
            </YStack>

            <YStack alignItems='flex-end'>
              <Circle size={32} backgroundColor={getStatusColor(shipment.status) + '20'}>
                <AppIcon
                  name={
                    shipment.status === 'delivered'
                      ? 'checkmark'
                      : shipment.status === 'in-transit'
                        ? 'car'
                        : 'time'
                  }
                  size={14}
                  color={getStatusColor(shipment.status)}
                />
              </Circle>
            </YStack>
          </XStack>

          <YStack space='$2'>
            <XStack alignItems='center' justifyContent='space-between'>
              <Text fontSize={12} color={colors.textSecondary}>
                Progress: {shipment.progress}%
              </Text>
              <Text
                fontSize={12}
                color={getPriorityColor(shipment.priority)}
                textTransform='uppercase'
                fontWeight='600'
              >
                {shipment.priority || 'Standard'}
              </Text>
            </XStack>

            <ProgressBar
              value={shipment.progress}
              height={6}
              backgroundColor={colors.surfaceVariant}
            />

            <XStack alignItems='center' justifyContent='space-between'>
              <XStack alignItems='center' space='$2'>
                <AppIcon name='cube' size={12} color={colors.textSecondary} />
                <Text fontSize={12} color={colors.textSecondary}>
                  {shipment.cargoType} • {shipment.weight}
                </Text>
              </XStack>
              <Text fontSize={12} color={colors.textSecondary}>
                ETA: {formatDate(shipment.estimatedDelivery)}
              </Text>
            </XStack>
          </YStack>

          <XStack space='$2'>
            <Button
              flex={1}
              variant='ghost'
              size='sm'
              onPress={() => router.push(`/(tabs)/tracking?id=${shipment.id}` as any)}
              leftIcon={<AppIcon name='location' size={14} />}
            >
              Track
            </Button>
            <Button
              flex={1}
              variant='outline'
              size='sm'
              onPress={() => router.push(`/(modals)/receipt?id=${shipment.id}` as any)}
              leftIcon={<AppIcon name='document' size={14} />}
            >
              Receipt
            </Button>
          </XStack>
        </YStack>
      </ElevatedCard>
    );
  };

  const screenCounts = counts;
  return (
    <Screen scroll={false} padding='$0' safeTop={true} safeBottom={true}>
      {/* Non-scrollable header */}
      <FadeIn>
        <YStack space='$4' paddingHorizontal='$4' paddingTop='$4' paddingBottom={12}>
          <ModernHeroSection
            user={user}
            colors={palette}
            tokens={getTokens('light')}
            onNewOrder={handleNewOrder}
            onTrackShipment={handleTrackShipment}
          />
        </YStack>
      </FadeIn>

      {/* Scrollable body */}
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
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <FadeIn>
          <YStack space='$4' paddingHorizontal='$4' paddingTop='$2' paddingBottom={24}>
            {/* Modern Stats Overview */}
            <ModernStatsOverview
              shipments={shipments}
              colors={palette}
              tokens={getTokens('light')}
            />

            {/* Network Overview Animation */}
            <RouteMapCard colors={palette} />

            {/* Recent Shipments Section */}
            <YStack space='$3'>
              <XStack alignItems='center' justifyContent='space-between'>
                <SectionTitle color={palette.text}>Recent Shipments</SectionTitle>
                <XStack alignItems='center' space='$2'>
                  <AnimatedBadge text={`${shipments.length}`} tone='info' />
                  <Button variant='ghost' size='sm' onPress={handleViewOrders}>
                    <XStack alignItems='center' space='$1'>
                      <Text color={palette.primary} fontSize={14}>
                        View All
                      </Text>
                      <AppIcon name='chevron-forward' size={14} color={palette.primary} />
                    </XStack>
                  </Button>
                </XStack>
              </XStack>

              {loading ? (
                <YStack space='$3'>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <ElevatedCard key={i} variant='elevated'>
                      <YStack space='$2'>
                        <Skeleton height={16} width={'60%' as any} />
                        <SkeletonText lines={2} />
                        <Skeleton height={6} radius={3} />
                      </YStack>
                    </ElevatedCard>
                  ))}
                </YStack>
              ) : (
                <YStack space='$3'>
                  {shipments.slice(0, 4).map((shipment) => (
                    <PremiumShipmentCard key={shipment.id} shipment={shipment} colors={palette} />
                  ))}
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
          </YStack>
        </FadeIn>
      </RNScrollView>
    </Screen>
  );
}
