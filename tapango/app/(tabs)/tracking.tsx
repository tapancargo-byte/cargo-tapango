import React, { useState, useEffect } from 'react';
import { RefreshControl, Share, Platform, KeyboardAvoidingView } from 'react-native';
import { formatDateTime } from '../../src/utils/format';
// AppIcon is already imported from '../../src/ui' in the grouped import below.
import * as Haptics from 'expo-haptics';

// Platform-specific map imports - temporarily disabled for web compatibility
let MapView: any = null;
let Marker: any = null;
let PROVIDER_GOOGLE: string | null = null;
let Polyline: any = null;

// TODO: Re-enable maps with proper web bundling exclusion
// Maps functionality temporarily disabled to fix web build
// if (Platform.OS !== 'web') {
//   try {
//     const maps = require('react-native-maps');
//     MapView = maps.default;
//     Marker = maps.Marker;
//     PROVIDER_GOOGLE = maps.PROVIDER_GOOGLE;
//     Polyline = maps.Polyline;
//   } catch (error) {
//     console.warn('Failed to load react-native-maps:', error);
//   }
// }
import { useLocalSearchParams } from 'expo-router';
import { Input } from '../../src/ui';
import { StatusVariant } from '../../src/ui/StatusBadge';
import { YStack, XStack, Text, ScrollView, Stack, Separator } from 'tamagui';
import { Circle } from '../../src/ui';
import {
  Button,
  Card,
  Skeleton,
  SkeletonText,
  StatChip,
  SectionHeader,
  ProgressBar,
  StatusPill,
  AppIcon,
  AppHeader,
  Screen,
  AnimatedBadge,
  FadeIn,
  GlassCard,
  ElevatedCard,
  LoadingSpinner,
  Title,
  SectionTitle,
  Subtitle,
  Overline,
} from '../../src/ui';
import { font } from '../../src/ui/tokens';
import { useColors } from '../../src/styles/ThemeProvider';
import { t } from '../../src/i18n';
import Animated, {
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

interface TrackingEvent {
  id: string;
  timestamp: string;
  location: string;
  description: string;
  status: StatusVariant;
}

interface Shipment {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  status: StatusVariant;
  estimatedDelivery: string;
  currentLocation: string;
  cargoType: string;
  weight: string;
  events: TrackingEvent[];
}

/**
 * Cargo Tracking Screen
 *
 * Allows users to track their cargo shipments with real-time updates
 */
export default function TrackingScreen() {
  const palette = useColors();
  const [trackingNumber, setTrackingNumber] = useState('');

  const sanitizeTrackingNumber = (txt: string): string => {
    if (!txt) return '';
    const cleaned = txt.toUpperCase().replace(/[^TPG0-9]/g, '');
    return cleaned
      ? (cleaned.startsWith('TPG') ? cleaned : `TPG${cleaned.replace(/^TPG/, '')}`).slice(0, 12)
      : '';
  };

  const onChangeTracking = (txt: string) => {
    setTrackingNumber(sanitizeTrackingNumber(txt));
  };
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const params = useLocalSearchParams<{ id?: string }>();

  // TAPANGO Mock shipment data for Imphal-Delhi route
  const mockShipment: Shipment = {
    id: '1',
    trackingNumber: 'TPG123456789',
    origin: 'Imphal, Manipur',
    destination: 'New Delhi, Delhi',
    status: 'in-transit',
    estimatedDelivery: '2024-01-15T14:00:00Z',
    currentLocation: 'Guwahati, Assam',
    cargoType: 'Electronics & IT Equipment',
    weight: '18.5 kg',
    events: [
      {
        id: '1',
        timestamp: '2024-01-10T09:30:00Z',
        location: 'Imphal Hub, Manipur',
        description: 'Shipment picked up from TAPANGO Imphal Hub',
        status: 'confirmed',
      },
      {
        id: '2',
        timestamp: '2024-01-10T15:45:00Z',
        location: 'Imphal Airport, Manipur',
        description: 'Package processed and loaded for air transport',
        status: 'confirmed',
      },
      {
        id: '3',
        timestamp: '2024-01-11T08:20:00Z',
        location: 'Guwahati Hub, Assam',
        description: 'In transit via Northeast corridor',
        status: 'in-transit',
      },
      {
        id: '4',
        timestamp: '2024-01-12T14:10:00Z',
        location: 'Lucknow Junction, UP',
        description: 'Package in transit to Delhi NCR',
        status: 'in-transit',
      },
      {
        id: '5',
        timestamp: '2024-01-13T10:30:00Z',
        location: 'New Delhi Hub',
        description: 'Arrived at TAPANGO New Delhi distribution center',
        status: 'in-transit',
      },
    ],
  };

  // Premium animated pulse component for live tracking
  const LiveTrackingPulse = () => {
    const pulseAnimation = useSharedValue(0);

    useEffect(() => {
      pulseAnimation.value = withRepeat(withTiming(1, { duration: 2000 }), -1, false);
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
      const scale = interpolate(pulseAnimation.value, [0, 1], [1, 1.5]);
      const opacity = interpolate(pulseAnimation.value, [0, 1], [0.8, 0.1]);

      return {
        transform: [{ scale }],
        opacity,
      };
    });

    return (
      <Animated.View style={[{ position: 'absolute' }, animatedStyle]}>
        <Circle size={60} backgroundColor='rgba(79, 195, 247, 0.3)' />
      </Animated.View>
    );
  };

  useEffect(() => {
    if (params?.id && typeof params.id === 'string') {
      setTrackingNumber(sanitizeTrackingNumber(params.id));
    }
  }, [params?.id]);

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setError(t('enterTrackingNumber'));
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // Try Supabase tracking first
      try {
        const { supaTracking } = await import('../../src/services/api');
        let events = await supaTracking(trackingNumber);
        if (events && events.length) {
          // Sort events by timestamp in descending order
          events = events.sort(
            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          // Map into local Shipment shape (basic)
          const latest = events[0] as any;
          setShipment({
            id: 'supa',
            trackingNumber,
            origin: events[events.length - 1]?.location || 'Origin',
            destination: latest?.location || 'Destination',
            status: (latest?.status as any) ?? 'in-transit',
            estimatedDelivery: new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString(),
            currentLocation: latest?.location || '—',
            cargoType: 'General',
            weight: '—',
            events: events as any,
          });
          setIsLoading(false);
          return;
        }
      } catch (e) {
        console.warn('Supabase tracking failed:', e instanceof Error ? e.message : 'Unknown error');
      }

      // Fallback mock
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (trackingNumber === 'TPG123456789') {
        // Sort mock events by timestamp in descending order
        const sortedEvents = [...mockShipment.events].sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setShipment({ ...mockShipment, events: sortedEvents });
        setIsLoading(false);
        return;
      }

      setError(t('trackingNotFound'));
      setShipment(null);
      setIsLoading(false);
      return;
    } catch (error) {
      console.error(
        'Tracking fetch failed:',
        error instanceof Error ? error.message : 'Unknown error'
      );
      setError(t('trackingFetchFailed'));
      setShipment(null);
      setIsLoading(false);
      return;
    }
  };

  const handleRefresh = async () => {
    if (!shipment || !trackingNumber) return;
    setRefreshing(true);
    try {
      // Try to fetch updated tracking data
      try {
        const { supaTracking } = await import('../../src/services/api');
        let events = await supaTracking(trackingNumber);
        if (events && events.length) {
          // Sort events by timestamp in descending order
          events = events.sort(
            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );

          // Update shipment with refreshed data
          const latest = events[0] as any;
          const updatedShipment = {
            ...shipment,
            status: (latest?.status as any) ?? shipment.status,
            currentLocation: latest?.location || shipment.currentLocation,
            events: events as any,
            // Update estimated delivery if needed
            estimatedDelivery: latest?.estimated_delivery || shipment.estimatedDelivery,
          };

          setShipment(updatedShipment);

          // Show success feedback
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } else {
          // No new data, just provide haptic feedback
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      } catch (apiError) {
        console.warn('Failed to refresh tracking data:', apiError);

        // If API fails, still simulate refresh with current data
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        // Optionally show a subtle indication that data couldn't be refreshed
        // but don't show an error to avoid disrupting UX
      }
    } catch (error) {
      console.error('Refresh error:', error);
      // Silent failure - just provide haptic feedback
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } finally {
      setRefreshing(false);
    }
  };

  const formatDateTimeLocal = (timestamp: string): string => {
    return formatDateTime(timestamp);
  };

  const getProgressPercentage = (status: StatusVariant): number => {
    switch (status) {
      case 'pending':
        return 10;
      case 'confirmed':
        return 25;
      case 'in-transit':
        return 60;
      case 'delivered':
        return 100;
      case 'cancelled':
        return 0;
      case 'delayed':
        return 40;
      default:
        return 0;
    }
  };

  return (
    <Screen scroll={false} padding='$0' safeTop={true} safeBottom={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
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
            <YStack space='$5' paddingHorizontal='$4' paddingTop='$4' paddingBottom={24}>
              {/* Modern Header */}
              <YStack space='$3'>
                <YStack space='$2'>
                  <Text fontSize={28} fontWeight='800' color={palette.text} lineHeight={34}>
                    Live Tracking
                  </Text>
                  <XStack alignItems='center' justifyContent='space-between'>
                    <Text fontSize={15} color={palette.textSecondary} fontWeight='400'>
                      Imphal ⟷ New Delhi Express Route
                    </Text>
                    <XStack alignItems='center' space='$2'>
                      <Circle size={8} backgroundColor={palette.success} />
                      <Text
                        fontSize={13}
                        color={palette.success}
                        fontWeight='600'
                        textTransform='uppercase'
                      >
                        LIVE
                      </Text>
                      <Circle size={40} backgroundColor={palette.primary + '12'}>
                        <AppIcon name='location' size={20} color={palette.primary} />
                      </Circle>
                    </XStack>
                  </XStack>
                </YStack>
              </YStack>

              {/* Modern Search Card */}
              <ElevatedCard padding='$5' borderRadius={20} backgroundColor={palette.surface}>
                <YStack space='$4'>
                  <YStack space='$3'>
                    <XStack alignItems='center' space='$4'>
                      <Circle size={48} backgroundColor={palette.info + '15'}>
                        <AppIcon name='search' size={22} color={palette.info} />
                      </Circle>
                      <YStack flex={1}>
                        <Text fontSize={20} fontWeight='800' color={palette.text} lineHeight={24}>
                          Track Your Shipment
                        </Text>
                        <Text fontSize={14} color={palette.textSecondary} fontWeight='400'>
                          Enter tracking number or scan QR code
                        </Text>
                      </YStack>
                    </XStack>
                  </YStack>

                  <Input
                    label='Tracking Number'
                    value={trackingNumber}
                    onChangeText={onChangeTracking}
                    placeholder='TPG123456789'
                    error={error ?? undefined}
                    variant='outlined'
                    borderRadius={12}
                    rightIcon={<AppIcon name='qr-code' size={18} color={palette.textSecondary} />}
                  />

                  {isLoading ? (
                    <Button
                      size='lg'
                      disabled
                      borderRadius={16}
                      backgroundColor={palette.surfaceVariant}
                    >
                      <LoadingSpinner size='sm' />
                      <Text marginLeft='$3' color={palette.textSecondary}>
                        Searching...
                      </Text>
                    </Button>
                  ) : (
                    <Button
                      size='lg'
                      onPress={handleTrack}
                      variant='primary'
                      borderRadius={16}
                      backgroundColor={palette.primary}
                      pressStyle={{
                        backgroundColor: palette.primaryPress,
                        transform: [{ scale: 0.98 }],
                      }}
                    >
                      <XStack alignItems='center' space='$3'>
                        <AppIcon name='search' size={18} color='white' />
                        <Text color='white' fontWeight='700' fontSize={16}>
                          Track Package
                        </Text>
                      </XStack>
                    </Button>
                  )}
                </YStack>
              </ElevatedCard>

              {/* Premium Shipment Results */}
              {shipment && (
                <Animated.View entering={FadeInDown.duration(600)}>
                  <YStack space='$4'>
                    {/* Shipment Header */}
                    <ElevatedCard variant='elevated' animation='slide'>
                      <XStack alignItems='center' justifyContent='space-between'>
                        <YStack flex={1}>
                          <XStack alignItems='center' space='$2'>
                            <Text fontSize={font.section} fontWeight='700' color={palette.text}>
                              {shipment.trackingNumber}
                            </Text>
                            <Circle size={8} backgroundColor={palette.success} />
                          </XStack>
                          <XStack alignItems='center' space='$2' marginTop='$1'>
                            <StatusPill status={shipment.status as any} />
                            <Text fontSize={font.caption} color={palette.textSecondary}>
                              Last updated:{' '}
                              {formatDateTimeLocal(
                                shipment.events[shipment.events.length - 1]?.timestamp || ''
                              )}
                            </Text>
                          </XStack>
                        </YStack>

                        <XStack space='$2'>
                          <Button size='sm' variant='outline' onPress={handleRefresh}>
                            <AppIcon name='refresh' size={16} />
                          </Button>
                          <Button
                            size='sm'
                            variant='ghost'
                            onPress={async () => {
                              const message = `Track TAPANGO shipment: ${shipment.trackingNumber} - ${shipment.origin} to ${shipment.destination}`;
                              await Share.share({ message });
                            }}
                          >
                            <AppIcon name='share' size={16} />
                          </Button>
                        </XStack>
                      </XStack>
                    </ElevatedCard>

                    {/* Live Route Map */}
                    <ElevatedCard variant='elevated'>
                      <YStack space='$3'>
                        <XStack alignItems='center' justifyContent='space-between'>
                          <XStack alignItems='center' space='$3'>
                            <Stack position='relative'>
                              <LiveTrackingPulse />
                              <Circle
                                size={40}
                                backgroundColor={palette.primary}
                                borderWidth={2}
                                borderColor='white'
                              >
                                <AppIcon name='location' size={20} color='white' />
                              </Circle>
                            </Stack>
                            <YStack>
                              <Text fontSize={font.section} fontWeight='700' color={palette.text}>
                                Live Route Map
                              </Text>
                              <Text fontSize={font.caption} color={palette.textSecondary}>
                                Real-time location tracking
                              </Text>
                            </YStack>
                          </XStack>

                          <Overline color={palette.success}>LIVE</Overline>
                        </XStack>

                        <Stack
                          height={250}
                          borderRadius='$3'
                          overflow='hidden'
                          backgroundColor={palette.surfaceVariant}
                        >
                          {MapView ? (
                            <MapView
                              style={{ flex: 1 }}
                              provider={PROVIDER_GOOGLE}
                              initialRegion={{
                                latitude: 26.0, // Midpoint between Imphal and Delhi
                                longitude: 85.0,
                                latitudeDelta: 10.0,
                                longitudeDelta: 20.0,
                              }}
                            >
                              {/* Route polyline */}
                              <Polyline
                                coordinates={[
                                  { latitude: 24.817, longitude: 93.9368 }, // Imphal
                                  { latitude: 26.1445, longitude: 91.7362 }, // Guwahati
                                  { latitude: 26.8467, longitude: 80.9462 }, // Lucknow
                                  { latitude: 28.7041, longitude: 77.1025 }, // Delhi
                                ]}
                                strokeColor={palette.primary}
                                strokeWidth={3}
                              />

                              {/* Origin Marker */}
                              <Marker
                                coordinate={{ latitude: 24.817, longitude: 93.9368 }}
                                title='Origin'
                                description={shipment.origin}
                              >
                                <Circle
                                  size={20}
                                  backgroundColor={palette.success}
                                  borderWidth={2}
                                  borderColor='white'
                                >
                                  <AppIcon name='business' size={10} color='white' />
                                </Circle>
                              </Marker>

                              {/* Current Location (animated) */}
                              <Marker
                                coordinate={{ latitude: 26.1445, longitude: 91.7362 }} // Guwahati
                                title='Current Location'
                                description={shipment.currentLocation}
                              >
                                <Stack position='relative'>
                                  <LiveTrackingPulse />
                                  <Circle
                                    size={16}
                                    backgroundColor={palette.primary}
                                    borderWidth={2}
                                    borderColor='white'
                                  >
                                    <AppIcon name='car' size={8} color='white' />
                                  </Circle>
                                </Stack>
                              </Marker>

                              {/* Destination Marker */}
                              <Marker
                                coordinate={{ latitude: 28.7041, longitude: 77.1025 }}
                                title='Destination'
                                description={shipment.destination}
                              >
                                <Circle
                                  size={20}
                                  backgroundColor={palette.warning}
                                  borderWidth={2}
                                  borderColor='white'
                                >
                                  <AppIcon name='flag' size={10} color='white' />
                                </Circle>
                              </Marker>
                            </MapView>
                          ) : (
                            // Fallback for web - show route info
                            <YStack flex={1} alignItems='center' justifyContent='center' space='$3'>
                              <Circle size={80} backgroundColor={palette.primary + '20'}>
                                <AppIcon name='navigate' size={40} color={palette.primary} />
                              </Circle>
                              <SectionTitle color={palette.text}>Live Route Tracking</SectionTitle>
                              <Subtitle color={palette.textSecondary}>
                                Interactive map available on mobile app
                              </Subtitle>

                              {/* Route Progress Visualization */}
                              <YStack width='100%' maxWidth={280} space='$3'>
                                <XStack alignItems='center' justifyContent='space-between'>
                                  <Circle size={32} backgroundColor={palette.success}>
                                    <AppIcon name='business' size={16} color='white' />
                                  </Circle>
                                  <Stack
                                    flex={1}
                                    marginHorizontal='$3'
                                    height={4}
                                    backgroundColor={palette.primary}
                                    borderRadius={2}
                                  />
                                  <Stack position='relative'>
                                    <LiveTrackingPulse />
                                    <Circle size={24} backgroundColor={palette.primary}>
                                      <AppIcon name='car' size={12} color='white' />
                                    </Circle>
                                  </Stack>
                                  <Stack
                                    flex={1}
                                    marginHorizontal='$3'
                                    height={4}
                                    backgroundColor={palette.surfaceVariant}
                                    borderRadius={2}
                                  />
                                  <Circle size={32} backgroundColor={palette.warning}>
                                    <AppIcon name='flag' size={16} color='white' />
                                  </Circle>
                                </XStack>

                                <XStack alignItems='center' justifyContent='space-between'>
                                  <Text fontSize={10} color={palette.textSecondary}>
                                    Origin
                                  </Text>
                                  <Text fontSize={10} color={palette.primary} fontWeight='600'>
                                    Current
                                  </Text>
                                  <Text fontSize={10} color={palette.textSecondary}>
                                    Destination
                                  </Text>
                                </XStack>
                              </YStack>
                            </YStack>
                          )}
                        </Stack>
                      </YStack>
                    </ElevatedCard>

                    {/* Shipment Details */}
                    <ElevatedCard variant='elevated'>
                      <YStack space='$3'>
                        <SectionTitle color={palette.text}>Shipment Details</SectionTitle>

                        <YStack space='$3'>
                          <XStack alignItems='center' justifyContent='space-between'>
                            <XStack alignItems='center' space='$2'>
                              <AppIcon name='location' size={16} color={palette.primary} />
                              <Text fontSize={font.subtitle} color={palette.textSecondary}>
                                From:
                              </Text>
                            </XStack>
                            <Text
                              fontSize={font.subtitle}
                              color={palette.text}
                              fontWeight='600'
                              flex={1}
                              textAlign='right'
                            >
                              {shipment.origin}
                            </Text>
                          </XStack>

                          <ProgressBar
                            value={getProgressPercentage(shipment.status)}
                            height={8}
                            backgroundColor={palette.surfaceVariant}
                          />

                          <XStack alignItems='center' justifyContent='space-between'>
                            <XStack alignItems='center' space='$2'>
                              <AppIcon name='flag' size={16} color={palette.success} />
                              <Text fontSize={font.subtitle} color={palette.textSecondary}>
                                To:
                              </Text>
                            </XStack>
                            <Text
                              fontSize={font.subtitle}
                              color={palette.text}
                              fontWeight='600'
                              flex={1}
                              textAlign='right'
                            >
                              {shipment.destination}
                            </Text>
                          </XStack>

                          <Separator />

                          <XStack space='$4'>
                            <YStack flex={1} space='$2'>
                              <Text
                                fontSize={font.caption}
                                color={palette.textSecondary}
                                textTransform='uppercase'
                              >
                                Current Location
                              </Text>
                              <Text fontSize={font.subtitle} color={palette.text} fontWeight='600'>
                                {shipment.currentLocation}
                              </Text>
                            </YStack>

                            <YStack flex={1} space='$2'>
                              <Text
                                fontSize={font.caption}
                                color={palette.textSecondary}
                                textTransform='uppercase'
                              >
                                Est. Delivery
                              </Text>
                              <Text fontSize={font.subtitle} color={palette.text} fontWeight='600'>
                                {formatDateTimeLocal(shipment.estimatedDelivery)}
                              </Text>
                            </YStack>
                          </XStack>

                          <XStack space='$4'>
                            <YStack flex={1} space='$2'>
                              <Text
                                fontSize={font.caption}
                                color={palette.textSecondary}
                                textTransform='uppercase'
                              >
                                Cargo Type
                              </Text>
                              <Text fontSize={font.subtitle} color={palette.text} fontWeight='600'>
                                {shipment.cargoType}
                              </Text>
                            </YStack>

                            <YStack flex={1} space='$2'>
                              <Text
                                fontSize={font.caption}
                                color={palette.textSecondary}
                                textTransform='uppercase'
                              >
                                Weight
                              </Text>
                              <Text fontSize={font.subtitle} color={palette.text} fontWeight='600'>
                                {shipment.weight}
                              </Text>
                            </YStack>
                          </XStack>
                        </YStack>
                      </YStack>
                    </ElevatedCard>

                    {/* Enhanced Timeline */}
                    <ElevatedCard padding='$5' borderRadius={20} backgroundColor={palette.surface}>
                      <YStack space='$4'>
                        <YStack space='$3'>
                          <XStack alignItems='center' space='$4'>
                            <Circle size={48} backgroundColor={palette.secondary + '15'}>
                              <AppIcon name='time' size={22} color={palette.secondary} />
                            </Circle>
                            <YStack flex={1}>
                              <Text
                                fontSize={20}
                                fontWeight='800'
                                color={palette.text}
                                lineHeight={24}
                              >
                                Tracking Timeline
                              </Text>
                              <Text fontSize={14} color={palette.textSecondary} fontWeight='400'>
                                {shipment.events.length} tracking events • Real-time updates
                              </Text>
                            </YStack>
                          </XStack>
                        </YStack>

                        <YStack space='$4'>
                          {shipment.events.map((event, index) => (
                            <Animated.View
                              key={event.id}
                              entering={FadeInUp.delay(index * 100).duration(400)}
                            >
                              <XStack space='$4'>
                                <YStack alignItems='center'>
                                  <Circle
                                    size={32}
                                    backgroundColor={
                                      index === 0
                                        ? palette.success
                                        : index === shipment.events.length - 1
                                          ? palette.primary
                                          : palette.warning
                                    }
                                    borderWidth={3}
                                    borderColor={palette.surface}
                                    style={{
                                      shadowColor: palette.shadow,
                                      shadowOffset: { width: 0, height: 2 },
                                      shadowOpacity: 0.1,
                                      shadowRadius: 4,
                                      elevation: 2,
                                    }}
                                  >
                                    <AppIcon
                                      name={
                                        index === 0
                                          ? 'checkmark'
                                          : index === shipment.events.length - 1
                                            ? 'car'
                                            : 'location'
                                      }
                                      size={14}
                                      color='white'
                                    />
                                  </Circle>
                                  {index < shipment.events.length - 1 && (
                                    <Stack
                                      width={3}
                                      height={48}
                                      backgroundColor={palette.border}
                                      borderRadius={2}
                                      marginVertical='$2'
                                    />
                                  )}
                                </YStack>

                                <YStack
                                  flex={1}
                                  paddingBottom={index < shipment.events.length - 1 ? '$4' : 0}
                                >
                                  <XStack alignItems='flex-start' justifyContent='space-between'>
                                    <YStack flex={1} space='$2'>
                                      <Text fontSize={16} fontWeight='700' color={palette.text}>
                                        {event.location}
                                      </Text>
                                      <Text
                                        fontSize={14}
                                        color={palette.textSecondary}
                                        lineHeight={20}
                                      >
                                        {event.description}
                                      </Text>
                                    </YStack>
                                    <YStack alignItems='flex-end' space='$1'>
                                      <Text
                                        fontSize={12}
                                        color={palette.textSecondary}
                                        fontWeight='500'
                                      >
                                        {formatDateTimeLocal(event.timestamp)}
                                      </Text>
                                      <Text
                                        fontSize={10}
                                        color={
                                          index === 0
                                            ? palette.success
                                            : index === shipment.events.length - 1
                                              ? palette.primary
                                              : palette.warning
                                        }
                                        textTransform='uppercase'
                                        fontWeight='600'
                                      >
                                        {event.status.replace('-', ' ')}
                                      </Text>
                                    </YStack>
                                  </XStack>
                                  <Text
                                    fontSize={font.caption}
                                    color={palette.textSecondary}
                                    marginTop='$1'
                                  >
                                    {event.description}
                                  </Text>
                                </YStack>
                              </XStack>
                            </Animated.View>
                          ))}
                        </YStack>
                      </YStack>
                    </ElevatedCard>
                  </YStack>
                </Animated.View>
              )}
            </YStack>
          </FadeIn>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
