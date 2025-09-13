import React, { useState, useCallback } from 'react';
import { Alert, Dimensions, RefreshControl } from 'react-native';
import { ScrollView as RNScrollView } from 'react-native';
// Conditional import for react-native-maps (not available on web)
let MapView: any = null
let Marker: any = null
let PROVIDER_GOOGLE: any = null
try {
  const maps = require('react-native-maps')
  MapView = maps.default
  Marker = maps.Marker
  PROVIDER_GOOGLE = maps.PROVIDER_GOOGLE
} catch {
  // Maps not available on web
}
import { router } from 'expo-router';
import { YStack, XStack, Text, ScrollView, Stack } from 'tamagui';
import { Circle } from '../../src/ui';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Card, Skeleton, SkeletonText, StatChip, SectionHeader, ProgressBar, StatusPill, AppIcon, AppHeader, Screen, AnimatedBadge, FadeIn, GlassCard, ElevatedCard, LoadingSpinner, Title, SectionTitle, Subtitle, Overline } from '../../src/ui';
import { formatDate } from '../../src/utils/format';
import { loadBookingDraft, clearBookingDraft } from '../../src/utils/drafts';
import { getRecentAddresses } from '../../src/utils/addressHistory';
import { StorageService } from '../../src/utils/storage';
import { Ionicons } from '@expo/vector-icons';
import { useColors as useAppColors } from '../../src/styles/ThemeProvider';
import { useUser } from '@clerk/clerk-expo';
import { t } from '../../src/i18n';
import { useFocusEffect } from '@react-navigation/native';
import { useCounts } from '../../src/contexts/CountsContext';
import Animated, { FadeInDown, FadeInUp, SlideInRight } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

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
    weight: '25 kg'
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
    weight: '2 kg'
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
    weight: '18 kg'
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
    weight: '45 kg'
  },
];

// Build stats chip data from counts and local fallbacks
function buildStatsData(counts: ReturnType<typeof useCounts> | null) {
  const { formatINR } = require('../../src/utils/currency');
  const shipmentsActive = counts?.shipmentsActive ?? mockRecentShipments.filter((s) => s.status === 'in-transit').length;
  const ordersPast = counts?.ordersPast ?? mockRecentShipments.filter((s) => s.status === 'delivered').length;
  const tiles: any[] = [
    { label: require('../../src/i18n').t('statActive'), value: String(shipmentsActive), iconName: 'car-outline' as const, tint: '#3B82F6' },
    { label: require('../../src/i18n').t('statDelivered'), value: String(ordersPast), iconName: 'cube-outline' as const, tint: '#10B981' },
  ];
  if (counts?.savedAmountInr != null) tiles.push({ label: require('../../src/i18n').t('statSaved'), value: formatINR(counts.savedAmountInr), iconName: 'cash-outline' as const, tint: '#8B5CF6' });
  if (counts?.onTimePercent != null) tiles.push({ label: require('../../src/i18n').t('statOnTime'), value: `${counts.onTimePercent}%`, iconName: 'stats-chart-outline' as const, tint: '#F59E0B' });
  return tiles;
}

const PremiumHeroCard = ({ user, colors, onNewOrder, onTrackShipment }: any) => {
  return (
    <GlassCard variant="glass" blur animation="fade">
      <Stack position="relative" overflow="hidden">
        {/* Background Gradient Overlay */}
        <LinearGradient
          colors={[colors.primary + '20', colors.secondary + '10']}
          start={[0, 0]}
          end={[1, 1]}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
          }}
        />
        
        <YStack space="$4" padding="$1">
          {/* Welcome Section */}
          <XStack alignItems="center" justifyContent="space-between">
            <YStack flex={1}>
              <Overline color={colors.textSecondary}>
                Welcome to TAPANGO
              </Overline>
              <Title color={colors.text} weight="bold">
                {user?.firstName ? `Hello, ${user.firstName}!` : 'Your Logistics Hub'}
              </Title>
              <Subtitle color={colors.textSecondary}>
                Imphal ⟷ New Delhi Express Corridor
              </Subtitle>
            </YStack>
            
            <Circle size={60} backgroundColor={colors.primary + '20'} borderWidth={2} borderColor={colors.primary}>
              <Ionicons name="business" size={24} color={colors.primary} />
            </Circle>
          </XStack>
          
          {/* Quick Action Buttons */}
          <XStack space="$3">
            <Button 
              flex={1} 
              variant="primary" 
              size="lg" 
              onPress={onNewOrder}
              leftIcon={<Ionicons name="add-circle" size={20} color="white" />}
            >
              New Shipment
            </Button>
            <Button 
              flex={1} 
              variant="secondary" 
              size="lg" 
              onPress={onTrackShipment}
              leftIcon={<Ionicons name="location" size={20} />}
            >
              Track
            </Button>
          </XStack>
        </YStack>
      </Stack>
    </GlassCard>
  )
}

const OperationalStatsGrid = ({ shipments, colors }: any) => {
  const activeShipments = shipments.filter((s: Shipment) => s.status === 'in-transit').length
  const deliveredToday = shipments.filter((s: Shipment) => s.status === 'delivered').length
  const pendingPickup = shipments.filter((s: Shipment) => s.status === 'pending').length
  const urgentShipments = shipments.filter((s: Shipment) => s.priority === 'urgent').length
  
  return (
    <YStack space="$3">
      <XStack alignItems="center" justifyContent="space-between">
        <SectionTitle color={colors.text}>
          Operational Overview
        </SectionTitle>
        <Circle size={32} backgroundColor={colors.info + '20'}>
          <Ionicons name="analytics" size={16} color={colors.info} />
        </Circle>
      </XStack>
      
      <XStack space="$3">
        <ElevatedCard flex={1} variant="elevated" animation="slide">
          <YStack alignItems="center" space="$2">
            <Circle size={48} backgroundColor={colors.primary + '20'}>
              <Ionicons name="car" size={20} color={colors.primary} />
            </Circle>
            <Text fontSize={24} fontWeight="800" color={colors.primary}>
              {activeShipments}
            </Text>
            <Text fontSize={12} color={colors.textSecondary} textAlign="center">
              In Transit
            </Text>
          </YStack>
        </ElevatedCard>
        
        <ElevatedCard flex={1} variant="elevated" animation="slide">
          <YStack alignItems="center" space="$2">
            <Circle size={48} backgroundColor={colors.success + '20'}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            </Circle>
            <Text fontSize={24} fontWeight="800" color={colors.success}>
              {deliveredToday}
            </Text>
            <Text fontSize={12} color={colors.textSecondary} textAlign="center">
              Delivered
            </Text>
          </YStack>
        </ElevatedCard>
      </XStack>
      
      <XStack space="$3">
        <ElevatedCard flex={1} variant="elevated" animation="slide">
          <YStack alignItems="center" space="$2">
            <Circle size={48} backgroundColor={colors.warning + '20'}>
              <Ionicons name="time" size={20} color={colors.warning} />
            </Circle>
            <Text fontSize={24} fontWeight="800" color={colors.warning}>
              {pendingPickup}
            </Text>
            <Text fontSize={12} color={colors.textSecondary} textAlign="center">
              Pending
            </Text>
          </YStack>
        </ElevatedCard>
        
        <ElevatedCard flex={1} variant="elevated" animation="slide">
          <YStack alignItems="center" space="$2">
            <Circle size={48} backgroundColor={colors.error + '20'}>
              <Ionicons name="alert-circle" size={20} color={colors.error} />
            </Circle>
            <Text fontSize={24} fontWeight="800" color={colors.error}>
              {urgentShipments}
            </Text>
            <Text fontSize={12} color={colors.textSecondary} textAlign="center">
              Urgent
            </Text>
          </YStack>
        </ElevatedCard>
      </XStack>
    </YStack>
  )
}

const RouteMapCard = ({ mapRegion, shipments, colors }: any) => {
  return (
    <ElevatedCard variant="elevated">
      <YStack space="$3">
        <XStack alignItems="center" justifyContent="space-between">
          <YStack>
            <SectionTitle color={colors.text}>
              Live Route Map
            </SectionTitle>
            <Text fontSize={12} color={colors.textSecondary}>
              Imphal ⟷ New Delhi Corridor
            </Text>
          </YStack>
          <Circle size={32} backgroundColor={colors.secondary + '20'}>
            <Ionicons name="map" size={16} color={colors.secondary} />
          </Circle>
        </XStack>
        
        <Stack height={200} borderRadius="$3" overflow="hidden" backgroundColor={colors.surfaceVariant}>
          {MapView ? (
            <MapView 
              style={{ flex: 1 }}
              provider={PROVIDER_GOOGLE}
              initialRegion={mapRegion}
            >
              {/* Imphal Marker */}
              <Marker
                coordinate={{ latitude: 24.8170, longitude: 93.9368 }}
                title="Imphal Hub"
                description="TAPANGO Northeast Operations"
              >
                <Circle size={20} backgroundColor={colors.primary} borderWidth={2} borderColor="white">
                  <Ionicons name="business" size={10} color="white" />
                </Circle>
              </Marker>
              
              {/* New Delhi Marker */}
              <Marker
                coordinate={{ latitude: 28.7041, longitude: 77.1025 }}
                title="New Delhi Hub"
                description="TAPANGO Central Operations"
              >
                <Circle size={20} backgroundColor={colors.secondary} borderWidth={2} borderColor="white">
                  <Ionicons name="business" size={10} color="white" />
                </Circle>
              </Marker>
              
              {/* Active Shipment Markers */}
              {shipments.filter((s: Shipment) => s.status === 'in-transit').map((shipment: Shipment, index: number) => {
                // Simulate positions along the route
                const progress = shipment.progress / 100
                const lat = 24.8170 + (28.7041 - 24.8170) * progress
                const lng = 93.9368 + (77.1025 - 93.9368) * progress
                
                return (
                  <Marker
                    key={shipment.id}
                    coordinate={{ latitude: lat, longitude: lng }}
                    title={shipment.id}
                    description={`${shipment.origin} → ${shipment.destination}`}
                  >
                    <Circle size={16} backgroundColor={colors.warning} borderWidth={1} borderColor="white">
                      <Ionicons name="car" size={8} color="white" />
                    </Circle>
                  </Marker>
                )
              })}
            </MapView>
          ) : (
            // Fallback for web - show a placeholder with route info
            <YStack flex={1} alignItems="center" justifyContent="center" space="$2">
              <Circle size={80} backgroundColor={colors.primary + '20'}>
                <Ionicons name="map" size={40} color={colors.primary} />
              </Circle>
              <Text fontSize={16} fontWeight="600" color={colors.text}>
                Live Route Tracking
              </Text>
              <Text fontSize={12} color={colors.textSecondary} textAlign="center">
                Interactive map available on mobile app
              </Text>
              <XStack space="$3" marginTop="$2">
                <XStack alignItems="center" space="$1">
                  <Circle size={12} backgroundColor={colors.primary} />
                  <Text fontSize={12} color={colors.textSecondary}>Imphal</Text>
                </XStack>
                <XStack alignItems="center" space="$1">
                  <Circle size={12} backgroundColor={colors.secondary} />
                  <Text fontSize={12} color={colors.textSecondary}>New Delhi</Text>
                </XStack>
              </XStack>
            </YStack>
          )}
        </Stack>
        
        <XStack alignItems="center" justifyContent="space-between" paddingTop="$2">
          <Text fontSize={12} color={colors.textSecondary}>
            {shipments.filter((s: Shipment) => s.status === 'in-transit').length} active shipments
          </Text>
          <Button variant="ghost" size="sm" onPress={() => router.push('/(tabs)/tracking')}>
            View All
          </Button>
        </XStack>
      </YStack>
    </ElevatedCard>
  )
}

export default function DashboardScreen() {
  const palette = useAppColors();
  const { user } = useUser();
  const [refreshing, setRefreshing] = useState(false)
  
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
    setRefreshing(true)
    // Simulate refresh delay
    setTimeout(() => {
      setRefreshing(false)
      counts?.refresh?.()
    }, 1000)
  }, [counts]);

  // Map focused on TAPANGO operational corridor: Imphal to New Delhi
  const mapRegion = {
    latitude: 26.8467, // Midpoint between Imphal (24.8170°N) and New Delhi (28.7041°N)
    longitude: 79.4589, // Midpoint between Imphal (93.9368°E) and New Delhi (77.1025°E)
    latitudeDelta: 8.0,   // Show both cities in view
    longitudeDelta: 20.0, // Cover the operational corridor
  };

  const PremiumShipmentCard = ({ shipment, colors }: { shipment: Shipment; colors: any }) => {
    const getPriorityColor = (priority?: string) => {
      switch (priority) {
        case 'urgent': return colors.error
        case 'express': return colors.warning
        default: return colors.textSecondary
      }
    }
    
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'in-transit': return colors.primary
        case 'delivered': return colors.success
        case 'pending': return colors.warning
        case 'delayed': return colors.error
        default: return colors.textSecondary
      }
    }
    
    return (
      <ElevatedCard variant="elevated" animation="slide" hover>
        <YStack space="$3">
          <XStack alignItems="center" justifyContent="space-between">
            <YStack flex={1}>
              <XStack alignItems="center" space="$2">
                <Text fontSize={16} fontWeight="700" color={colors.text}>
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
            
            <YStack alignItems="flex-end">
              <Circle size={32} backgroundColor={getStatusColor(shipment.status) + '20'}>
                <Ionicons 
                  name={shipment.status === 'delivered' ? 'checkmark' : shipment.status === 'in-transit' ? 'car' : 'time'} 
                  size={14} 
                  color={getStatusColor(shipment.status)} 
                />
              </Circle>
            </YStack>
          </XStack>
          
          <YStack space="$2">
            <XStack alignItems="center" justifyContent="space-between">
              <Text fontSize={12} color={colors.textSecondary}>
                Progress: {shipment.progress}%
              </Text>
              <Text fontSize={12} color={getPriorityColor(shipment.priority)} textTransform="uppercase" fontWeight="600">
                {shipment.priority || 'Standard'}
              </Text>
            </XStack>
            
            <ProgressBar value={shipment.progress} height={6} backgroundColor={colors.surfaceVariant} />
            
            <XStack alignItems="center" justifyContent="space-between">
              <XStack alignItems="center" space="$2">
                <Ionicons name="cube" size={12} color={colors.textSecondary} />
                <Text fontSize={12} color={colors.textSecondary}>
                  {shipment.cargoType} • {shipment.weight}
                </Text>
              </XStack>
              <Text fontSize={12} color={colors.textSecondary}>
                ETA: {formatDate(shipment.estimatedDelivery)}
              </Text>
            </XStack>
          </YStack>
          
          <XStack space="$2">
            <Button 
              flex={1} 
              variant="ghost" 
              size="sm" 
              onPress={() => router.push(`/(tabs)/tracking?id=${shipment.id}` as any)}
              leftIcon={<Ionicons name="location" size={14} />}
            >
              Track
            </Button>
            <Button 
              flex={1} 
              variant="outline" 
              size="sm" 
              onPress={() => router.push(`/(modals)/receipt?id=${shipment.id}` as any)}
              leftIcon={<Ionicons name="document" size={14} />}
            >
              Receipt
            </Button>
          </XStack>
        </YStack>
      </ElevatedCard>
    )
  }

  const screenCounts = counts;
  return (
<Screen scroll padding="$0">
      <RNScrollView 
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={handleRefresh}
            tintColor={palette.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <FadeIn>
        <YStack space="$4" paddingHorizontal="$4" paddingBottom={120}>
          {/* Premium Hero Card */}
          <PremiumHeroCard 
            user={user}
            colors={palette}
            onNewOrder={handleNewOrder}
            onTrackShipment={handleTrackShipment}
          />

          {/* Operational Stats Grid */}
          <OperationalStatsGrid shipments={shipments} colors={palette} />
          
          {/* Route Map Card */}
          <RouteMapCard mapRegion={mapRegion} shipments={shipments} colors={palette} />
          
          {/* Recent Shipments Section */}
          <YStack space="$3">
            <XStack alignItems="center" justifyContent="space-between">
              <SectionTitle color={palette.text}>
                Recent Shipments
              </SectionTitle>
              <XStack alignItems="center" space="$2">
                <AnimatedBadge text={`${shipments.length}`} tone="info" />
                <Button variant="ghost" size="sm" onPress={handleViewOrders}>
                  <XStack alignItems="center" space="$1">
                    <Text color={palette.primary} fontSize={14}>View All</Text>
                    <Ionicons name="chevron-forward" size={14} color={palette.primary} />
                  </XStack>
                </Button>
              </XStack>
            </XStack>
            
            {loading ? (
              <YStack space="$3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <ElevatedCard key={i} variant="elevated">
                    <YStack space="$2">
                      <Skeleton height={16} width={'60%' as any} />
                      <SkeletonText lines={2} />
                      <Skeleton height={6} radius={3} />
                    </YStack>
                  </ElevatedCard>
                ))}
              </YStack>
            ) : (
              <YStack space="$3">
                {shipments.slice(0, 4).map((shipment) => (
                  <PremiumShipmentCard 
                    key={shipment.id} 
                    shipment={shipment} 
                    colors={palette} 
                  />
                ))}
              </YStack>
            )}
          </YStack>

          {/* Quick Actions Section */}
          {(hasDraft || recentPickups.length > 0 || recentDeliveries.length > 0) && (
            <ElevatedCard variant="elevated">
              <YStack space="$3">
                <XStack alignItems="center" space="$3">
                  <Circle size={40} backgroundColor={palette.secondary + '20'}>
                    <Ionicons name="flash" size={20} color={palette.secondary} />
                  </Circle>
                  <YStack>
                    <SectionTitle color={palette.text}>
                      Quick Actions
                    </SectionTitle>
                    <Text fontSize={12} color={palette.textSecondary}>
                      Resume drafts and recent locations
                    </Text>
                  </YStack>
                </XStack>
                
                {hasDraft && (
                  <Button 
                    variant="outline" 
                    onPress={() => router.push('/(tabs)/booking?resumeDraft=1' as any)}
                    leftIcon={<Ionicons name="document-text" size={16} />}
                  >
                    Resume Last Draft
                  </Button>
                )}
                
                {(recentPickups.length > 0 || recentDeliveries.length > 0) && (
                  <YStack space="$2">
                    <SectionTitle color={palette.text}>
                      Recent Addresses
                    </SectionTitle>
                    <RNScrollView horizontal showsHorizontalScrollIndicator={false}>
                      <XStack space="$2">
                        {[...recentPickups, ...recentDeliveries].slice(0, 5).map((address, index) => (
                          <Card key={index} variant="flat">
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
          {shipments.some(s => s.status === 'in-transit') && (
            <GlassCard variant="glass" animation="slide">
              <XStack alignItems="center" space="$3">
                <Circle size={40} backgroundColor={palette.primary + '20'}>
                  <Ionicons name="car" size={20} color={palette.primary} />
                </Circle>
                <YStack flex={1}>
                  <Text fontSize={16} fontWeight="700" color={palette.text}>
                    {shipments.filter(s => s.status === 'in-transit').length} Active Shipments
                  </Text>
                  <Subtitle color={palette.textSecondary}>
                    Tap to view live tracking updates
                  </Subtitle>
                </YStack>
                <Button variant="primary" size="sm" onPress={handleTrackShipment}>
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
