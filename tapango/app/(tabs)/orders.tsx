import React, { useCallback, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { RefreshControl } from 'react-native';
import { formatINR } from '../../src/utils/currency';
import { supabase } from '../../src/services/supabaseClient';
import { YStack, XStack, Text, Tabs, Stack, ScrollView as TScrollView } from 'tamagui';
import { Circle } from '../../src/ui';
import { Button, Card, Skeleton, SkeletonText, ListRow, EmptyState, StatusPill, Screen, AppHeader, AppIcon, AnimatedBadge, FadeIn, Input, ElevatedCard, GlassCard, LoadingSpinner, Title, SectionTitle, Subtitle } from '../../src/ui';
import { StorageService } from '../../src/utils/storage';
import { formatDateTime } from '../../src/utils/format';
import { useColors as useAppColors } from '../../src/styles/ThemeProvider';
import { t } from '../../src/i18n';
import { useCounts } from '../../src/contexts/CountsContext';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated';

/**
 * Orders Screen
 * Shows list of user's orders
 */

type Order = {
  id: string;
  route: string;
  status: 'Active' | 'Past';
  price: number;
  updatedAt: string;
};

// TAPANGO Mock orders for Imphal-Delhi operations
const MOCK_ORDERS: Order[] = [
  { id: 'TPG2024001', route: 'Imphal → New Delhi', status: 'Active', price: 15500, updatedAt: '2025-01-12T14:30:00Z' },
  { id: 'TPG2024002', route: 'New Delhi → Imphal', status: 'Past', price: 12800, updatedAt: '2025-01-10T09:15:00Z' },
  { id: 'TPG2024003', route: 'Imphal → New Delhi', status: 'Active', price: 18900, updatedAt: '2025-01-11T16:45:00Z' },
  { id: 'TPG2024004', route: 'New Delhi → Imphal', status: 'Past', price: 9200, updatedAt: '2025-01-08T11:20:00Z' },
  { id: 'TPG2024005', route: 'Imphal → New Delhi', status: 'Active', price: 22100, updatedAt: '2025-01-13T08:00:00Z' },
  { id: 'TPG2024006', route: 'New Delhi → Imphal', status: 'Past', price: 14500, updatedAt: '2025-01-05T13:30:00Z' },
];

export default function OrdersScreen() {
  const [segment, setSegment] = useState<'Active' | 'Past'>('Active');
  // restore last segment
  React.useEffect(() => {
    (async () => {
      try {
        const saved = await StorageService.getItem?.('ordersSegment')
        if (saved === 'Active' || saved === 'Past') setSegment(saved)
      } catch {}
    })()
  }, [])
  const [remote, setRemote] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDemoBanner, setShowDemoBanner] = useState(false);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    try {
      const { supaOrders } = await import('../../src/services/api');
      let userId: string | undefined = undefined;
      try {
        if (supabase) {
          const { data } = await supabase.auth.getUser();
          userId = (data as any)?.user?.id ?? undefined;
        }
      } catch {}
      const o = await supaOrders(userId);
      if (o) {
        setRemote(o.map(r => ({ id: r.id, route: r.route, price: r.price, updatedAt: r.updated_at, status: r.status })));
        setShowDemoBanner(false);
      } else {
        if (supabase) setShowDemoBanner(true);
      }
    } catch {
      if (supabase) setShowDemoBanner(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadOrders(); }, [loadOrders]);

  useFocusEffect(
    useCallback(() => {
      loadOrders();
      try {
        const { useCounts } = require('../../src/contexts/CountsContext');
        const counts = useCounts?.();
        counts?.refresh?.();
      } catch {}
    }, [loadOrders])
  );

  const source = remote ?? MOCK_ORDERS;
  const data = source.filter(o => o.status === segment);
  const palette = useAppColors();

  const counts = useCounts();
  const totalOrders = counts?.ordersTotal ?? source.length;
  const triggerRefresh = () => {
    counts?.refresh?.();
  };

  // Enhanced local search and filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All'|'Active'|'Past'>('All');
  const [routeFilter, setRouteFilter] = useState<'All'|'To Delhi'|'To Imphal'>('All');
  const [sortBy, setSortBy] = useState<'date'|'amount'|'route'>('date');
  const [refreshing, setRefreshing] = useState(false);
  
  const filteredData = data.filter((it) => {
    const matchQ = search ? (`${it.id} ${it.route}`.toLowerCase().includes(search.toLowerCase())) : true;
    const matchStatus = statusFilter === 'All' ? true : (it.status === statusFilter);
    const matchRoute = routeFilter === 'All' ? true : 
      routeFilter === 'To Delhi' ? it.route.includes('New Delhi') : 
      it.route.includes('Imphal');
    return matchQ && matchStatus && matchRoute;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'amount':
        return b.price - a.price;
      case 'route':
        return a.route.localeCompare(b.route);
      default:
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
  });
  
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadOrders();
    setTimeout(() => setRefreshing(false), 500);
  }, [loadOrders]);

  const screenCounts = counts;

  const PremiumOrderCard = ({ order }: { order: Order }) => {
    const isActive = order.status === 'Active'
    const isToDelhi = order.route.includes('New Delhi')
    
    return (
      <Animated.View entering={FadeInDown.delay(Math.random() * 200).duration(400)}>
        <ElevatedCard variant="elevated" hover>
          <YStack space="$3">
            <XStack alignItems="center" justifyContent="space-between">
              <XStack alignItems="center" space="$3">
                <Circle size={40} backgroundColor={isActive ? palette.primary + '20' : palette.success + '20'}>
                  <Ionicons 
                    name={isActive ? 'car' : 'checkmark-circle'} 
                    size={20} 
                    color={isActive ? palette.primary : palette.success} 
                  />
                </Circle>
                <YStack flex={1}>
                  <XStack alignItems="center" space="$2">
                    <Text fontSize="$body" fontWeight="700" color={palette.text}>
                      {order.id}
                    </Text>
                    <StatusPill status={isActive ? 'in-transit' : 'delivered'} />
                  </XStack>
                  <XStack alignItems="center" space="$2">
                    <Ionicons 
                      name={isToDelhi ? 'arrow-forward' : 'arrow-back'} 
                      size={14} 
                      color={palette.textSecondary} 
                    />
                    <Text fontSize="$subtitle" color={palette.textSecondary}>
                      {order.route}
                    </Text>
                  </XStack>
                </YStack>
              </XStack>
              
              <YStack alignItems="flex-end">
                <Text fontSize="$section" fontWeight="800" color={palette.primary}>
                  {formatINR(order.price)}
                </Text>
                <Text fontSize="$caption" color={palette.textSecondary}>
                  {formatDateTime(order.updatedAt)}
                </Text>
              </YStack>
            </XStack>
            
            <XStack space="$2">
              <Button 
                flex={1} 
                size="sm" 
                variant="ghost" 
                onPress={() => router.push(`/(tabs)/tracking?id=${order.id}` as any)}
                leftIcon={<Ionicons name="location" size={14} />}
              >
                Track
              </Button>
              <Button 
                flex={1} 
                size="sm" 
                variant="outline" 
                onPress={() => router.push(`/(modals)/receipt?id=${order.id}&amount=${order.price}` as any)}
                leftIcon={<Ionicons name="document-text" size={14} />}
              >
                Receipt
              </Button>
            </XStack>
          </YStack>
        </ElevatedCard>
      </Animated.View>
    )
  }
  
  return (
<Screen scroll={false} padding="$0">
      <TScrollView 
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
          <YStack space="$4" paddingHorizontal="$4" paddingTop="$4" paddingBottom={120}>
            {/* Premium Header */}
            <ElevatedCard variant="elevated" animation="slide">
              <XStack alignItems="center" justifyContent="space-between">
                <YStack>
                  <Title color={palette.text} weight="bold">
                    Order Management
                  </Title>
                  <Subtitle color={palette.textSecondary}>
                    Imphal ⟷ New Delhi Express Operations
                  </Subtitle>
                </YStack>
                <XStack alignItems="center" space="$2">
                  <AnimatedBadge text={`${totalOrders}`} tone="info" />
                  <Circle size={48} backgroundColor={palette.primary + '20'}>
                    <Ionicons name="list" size={20} color={palette.primary} />
                  </Circle>
                </XStack>
              </XStack>
            </ElevatedCard>
            
            {/* Status Tabs */}
            <Tabs value={segment} onValueChange={(v: string) => { setSegment(v as any); StorageService.setItem?.('ordersSegment', v); }}>
              <GlassCard variant="glass">
                <Tabs.List space="$3">
                  <Tabs.Tab value="Active" flex={1}>
                    <XStack alignItems="center" space="$2">
                      <Circle size={24} backgroundColor={palette.primary + '20'}>
                        <Ionicons name="car" size={12} color={palette.primary} />
                      </Circle>
                      <YStack alignItems="center">
                        <Text fontSize="$subtitle" fontWeight="600" color={segment === 'Active' ? palette.primary : palette.textSecondary}>
                          Active
                        </Text>
                        <Text fontSize="$caption" color={palette.textSecondary}>
                          {counts?.ordersActive ?? source.filter(o => o.status === 'Active').length}
                        </Text>
                      </YStack>
                    </XStack>
                  </Tabs.Tab>
                  
                  <Tabs.Tab value="Past" flex={1}>
                    <XStack alignItems="center" space="$2">
                      <Circle size={24} backgroundColor={palette.success + '20'}>
                        <Ionicons name="checkmark-circle" size={12} color={palette.success} />
                      </Circle>
                      <YStack alignItems="center">
                        <Text fontSize="$subtitle" fontWeight="600" color={segment === 'Past' ? palette.primary : palette.textSecondary}>
                          Completed
                        </Text>
                        <Text fontSize="$caption" color={palette.textSecondary}>
                          {counts?.ordersPast ?? source.filter(o => o.status === 'Past').length}
                        </Text>
                      </YStack>
                    </XStack>
                  </Tabs.Tab>
                </Tabs.List>
              </GlassCard>

              <Tabs.Content value={segment}>
                <YStack space="$4">
                  {showDemoBanner && (
                    <GlassCard variant="glass">
                      <XStack alignItems="center" space="$3">
                        <Circle size={40} backgroundColor={palette.warning + '20'}>
                          <Ionicons name="information-circle" size={20} color={palette.warning} />
                        </Circle>
                        <YStack flex={1}>
                          <Subtitle color={palette.text} weight="semibold">
                            Demo Mode
                          </Subtitle>
                          <Text fontSize="$caption" color={palette.textSecondary}>
                            Showing sample TAPANGO orders
                          </Text>
                        </YStack>
                        <Button variant="outline" size="sm" onPress={() => router.push('/(auth)/supabase-sign-in' as any)}>
                          Sign In
                        </Button>
                      </XStack>
                    </GlassCard>
                  )}
                  
                  {/* Advanced Filters */}
                  <ElevatedCard variant="elevated">
                    <YStack space="$3">
                      <XStack alignItems="center" space="$3">
                        <Circle size={32} backgroundColor={palette.secondary + '20'}>
                          <Ionicons name="filter" size={16} color={palette.secondary} />
                        </Circle>
                <SectionTitle color={palette.text}>
                  Advanced Filters
                </SectionTitle>
                      </XStack>
                      
                      {/* Search Bar */}
                      <Input 
                        placeholder="Search orders, routes, or tracking numbers"
                        value={search} 
                        onChangeText={setSearch}
                        variant="filled"
                        leftIcon={<Ionicons name="search" size={16} color={palette.textSecondary} />}
                      />
                      
                      {/* Filter Pills */}
                      <YStack space="$2">
                        <Subtitle color={palette.text} weight="semibold">Route Direction</Subtitle>
                        <XStack space="$2" flexWrap="wrap">
                          <Button 
                            variant={routeFilter === 'All' ? 'primary' : 'outline'} 
                            size="sm" 
                            onPress={() => setRouteFilter('All')}
                          >
                            All Routes
                          </Button>
                          <Button 
                            variant={routeFilter === 'To Delhi' ? 'primary' : 'outline'} 
                            size="sm" 
                            onPress={() => setRouteFilter('To Delhi')}
                            leftIcon={<Ionicons name="arrow-forward" size={12} />}
                          >
                            To Delhi
                          </Button>
                          <Button 
                            variant={routeFilter === 'To Imphal' ? 'primary' : 'outline'} 
                            size="sm" 
                            onPress={() => setRouteFilter('To Imphal')}
                            leftIcon={<Ionicons name="arrow-back" size={12} />}
                          >
                            To Imphal
                          </Button>
                        </XStack>
                      </YStack>
                      
                      {/* Sort Options */}
                      <YStack space="$2">
                        <Subtitle color={palette.text} weight="semibold">Sort By</Subtitle>
                        <XStack space="$2" flexWrap="wrap">
                          <Button 
                            variant={sortBy === 'date' ? 'primary' : 'outline'} 
                            size="sm" 
                            onPress={() => setSortBy('date')}
                            leftIcon={<Ionicons name="calendar" size={12} />}
                          >
                            Date
                          </Button>
                          <Button 
                            variant={sortBy === 'amount' ? 'primary' : 'outline'} 
                            size="sm" 
                            onPress={() => setSortBy('amount')}
                            leftIcon={<Ionicons name="cash" size={12} />}
                          >
                            Amount
                          </Button>
                          <Button 
                            variant={sortBy === 'route' ? 'primary' : 'outline'} 
                            size="sm" 
                            onPress={() => setSortBy('route')}
                            leftIcon={<Ionicons name="location" size={12} />}
                          >
                            Route
                          </Button>
                        </XStack>
                      </YStack>
                    </YStack>
                  </ElevatedCard>
                  
                  {/* Results */}
                  {loading ? (
                    <YStack space="$3">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <ElevatedCard key={i} variant="elevated">
                          <YStack space="$2">
                            <Skeleton height={20} width={'70%' as any} />
                            <SkeletonText lines={2} />
                            <Skeleton height={8} width={'40%' as any} />
                          </YStack>
                        </ElevatedCard>
                      ))}
                    </YStack>
                  ) : filteredData.length === 0 ? (
                    <ElevatedCard variant="elevated">
                      <EmptyState
                        icon="cube-outline"
                        title={`No ${segment} Orders Found`}
                        subtitle={search ? 'Try adjusting your search or filters' : `No ${segment.toLowerCase()} orders available`}
                        actionLabel="Book New Shipment"
                        onAction={() => router.push('/(tabs)/booking' as any)}
                      />
                    </ElevatedCard>
                  ) : (
                    <YStack space="$3">
                      <XStack alignItems="center" justifyContent="space-between">
                        <SectionTitle color={palette.text}>
                          {filteredData.length} {segment} Orders
                        </SectionTitle>
                        <Text fontSize="$caption" color={palette.textSecondary}>
                          Total: {formatINR(filteredData.reduce((sum, order) => sum + order.price, 0))}
                        </Text>
                      </XStack>
                      
                      {filteredData.map((order, index) => (
                        <PremiumOrderCard key={order.id} order={order} />
                      ))}
                    </YStack>
                  )}
                </YStack>
              </Tabs.Content>
            </Tabs>
          </YStack>
        </FadeIn>
      </TScrollView>
    </Screen>
  );
}
