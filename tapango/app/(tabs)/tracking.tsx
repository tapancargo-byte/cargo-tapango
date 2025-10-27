import React, { useState, useEffect } from 'react';
import { RefreshControl, Platform, KeyboardAvoidingView, Pressable } from 'react-native';
import { formatDateTime } from '../../src/utils/format';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, router } from 'expo-router';
import { Input } from '../../src/ui';
import { StatusVariant } from '../../src/ui/StatusBadge';
import { YStack, XStack, Text, ScrollView } from 'tamagui';
import {
  Button,
  StatusPill,
  AppIcon,
  Screen,
  FadeIn,
  OutlinedCard,
  LoadingSpinner,
} from '../../src/ui';
import { font } from '../../src/ui/tokens';
import { useColors } from '../../src/styles/ThemeProvider';
import { t } from '../../src/i18n';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

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
                  <Text fontSize={24} fontWeight='800' color={palette.text} lineHeight={30}>
                    Track Shipment
                  </Text>
                  <Text fontSize={15} color={palette.textSecondary} fontWeight='400'>
                    Enter a tracking number to see latest updates
                  </Text>
                </YStack>
              </YStack>

              {/* Minimal Search Card */}
              <OutlinedCard padding='$3' borderRadius={14} backgroundColor={palette.surface}>
                <YStack space='$4'>
                  <YStack space='$3'>
                    <Text fontSize={16} fontWeight='800' color={palette.text}>
                      Track your shipment
                    </Text>
                    <Text fontSize={12} color={palette.textSecondary}>
                      Enter tracking number or scan QR code
                    </Text>
                  </YStack>

                  <Input
                    label='Tracking number'
                    value={trackingNumber}
                    onChangeText={onChangeTracking}
                    placeholder='TPG123456789'
                    error={error ?? undefined}
                    variant='outlined'
                    borderRadius={12}
                    rightIcon={
                      <Pressable
                        accessibilityLabel='Scan QR'
                        onPress={() => router.push('/(modals)/scan')}
                        hitSlop={10}
                      >
                        <AppIcon name='qr-code' size={18} color={palette.textSecondary} />
                      </Pressable>
                    }
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
                      size='md'
                      onPress={handleTrack}
                      variant='primary'
                      borderRadius={12}
                      backgroundColor={palette.primary}
                      pressStyle={{
                        backgroundColor: palette.primaryPress,
                        transform: [{ scale: 0.98 }],
                      }}
                    >
                      <XStack alignItems='center' space='$3'>
                        <AppIcon name='search' size={18} color='white' />
                        <Text color='white' fontWeight='700' fontSize={16}>
                          View Status
                        </Text>
                      </XStack>
                    </Button>
                  )}
                </YStack>
              </OutlinedCard>

              {/* Premium Shipment Results */}
              {shipment && (
                <Animated.View entering={FadeInDown.duration(600)}>
                  <YStack space='$4'>
                    {/* Shipment Header (minimal) */}
                    <OutlinedCard variant='outlined'>
                      <XStack alignItems='center' justifyContent='space-between'>
                        <YStack flex={1}>
                          <XStack alignItems='center' space='$2'>
                            <Text fontSize={14} fontWeight='800' color={palette.text}>
                              {shipment.trackingNumber}
                            </Text>
                          </XStack>
                          <XStack alignItems='center' space='$2' marginTop='$1'>
                            <StatusPill status={shipment.status as any} />
                            <Text fontSize={11} color={palette.textSecondary}>
                              Updated{' '}
                              {formatDateTimeLocal(
                                shipment.events[shipment.events.length - 1]?.timestamp || ''
                              )}
                            </Text>
                          </XStack>
                        </YStack>

                        <Button
                          size='sm'
                          variant='outline'
                          onPress={handleRefresh}
                          borderRadius={10}
                        >
                          <AppIcon name='refresh' size={16} />
                        </Button>
                      </XStack>
                    </OutlinedCard>

                    {/* Shipment Summary (minimal) */}
                    <OutlinedCard>
                      <YStack space='$2'>
                        <XStack alignItems='center' justifyContent='space-between'>
                          <Text fontSize={12} color={palette.textSecondary}>
                            From
                          </Text>
                          <Text fontSize={14} color={palette.text} fontWeight='600'>
                            {shipment.origin}
                          </Text>
                        </XStack>
                        <XStack alignItems='center' justifyContent='space-between'>
                          <Text fontSize={12} color={palette.textSecondary}>
                            To
                          </Text>
                          <Text fontSize={14} color={palette.text} fontWeight='600'>
                            {shipment.destination}
                          </Text>
                        </XStack>
                        <XStack alignItems='center' justifyContent='space-between'>
                          <Text fontSize={12} color={palette.textSecondary}>
                            Estimated delivery
                          </Text>
                          <Text fontSize={14} color={palette.text} fontWeight='600'>
                            {formatDateTimeLocal(shipment.estimatedDelivery)}
                          </Text>
                        </XStack>
                      </YStack>
                    </OutlinedCard>

                    {/* Updates List (minimal) */}
                    <OutlinedCard>
                      <YStack space='$2'>
                        <XStack alignItems='center' justifyContent='space-between'>
                          <Text fontSize={14} fontWeight='800' color={palette.text}>
                            Updates
                          </Text>
                          <Text fontSize={11} color={palette.textSecondary}>
                            {shipment.events.length} events
                          </Text>
                        </XStack>

                        <YStack space='$2'>
                          {shipment.events.map((event, index) => (
                            <Animated.View key={event.id} entering={FadeInUp.delay(index * 60)}>
                              <XStack
                                alignItems='flex-start'
                                justifyContent='space-between'
                                space='$2'
                              >
                                <Text fontSize={11} color={palette.textSecondary}>
                                  {formatDateTimeLocal(event.timestamp)}
                                </Text>
                                <YStack flex={1} minWidth={0}>
                                  <Text
                                    fontSize={13}
                                    fontWeight='600'
                                    color={palette.text}
                                    numberOfLines={1}
                                  >
                                    {event.location}
                                  </Text>
                                  <Text
                                    fontSize={12}
                                    color={palette.textSecondary}
                                    numberOfLines={2}
                                  >
                                    {event.description}
                                  </Text>
                                </YStack>
                              </XStack>
                            </Animated.View>
                          ))}
                        </YStack>
                      </YStack>
                    </OutlinedCard>
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
