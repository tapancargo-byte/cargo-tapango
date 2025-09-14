import React, { memo } from 'react';
import { AppIcon } from '../../ui';
import { StyleSheet } from 'react-native';
import { Stack, Text, XStack, YStack } from 'tamagui';
import { LiveTrackingPulse } from '@/components/tracking/LiveTrackingPulse';
import { IconCircle } from '@/components/tracking/IconCircle';
import { ElevatedCard, LoadingSpinner } from '../../ui';
import { font } from '../../ui/tokens';
import { useColors } from '../../styles/ThemeProvider';

// Helper function to create alpha colors
const withAlpha = (color: string, alpha: number): string => {
  const hexAlpha = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, '0');
  return `${color}${hexAlpha}`;
};

const MarkerIconCircle = memo(
  ({
    size,
    color,
    iconName,
    iconSize,
  }: {
    size: number;
    color: string;
    iconName: string;
    iconSize: number;
  }) => (
    <IconCircle
      size={size}
      backgroundColor={color}
      borderWidth={2}
      borderColor='white'
      iconName={iconName}
      iconSize={iconSize}
      testID={`marker-${String(iconName)}`}
    />
  )
);

type MapsModule = {
  default?: React.ComponentType<any>;
  Marker?: React.ComponentType<any>;
  Polyline?: React.ComponentType<any>;
  PROVIDER_GOOGLE?: string;
};

let MapView: React.ComponentType<any> | null = null;
let Marker: React.ComponentType<any> | null = null;
let PROVIDER_GOOGLE: string | null = null;
let Polyline: React.ComponentType<any> | null = null;

try {
  // Use dynamic import to avoid bundling on web
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  const maps = require('react-native-maps') as unknown as MapsModule;

  if (maps?.default) {
    MapView = maps.default;
  }
  if (maps?.Marker) {
    Marker = maps.Marker;
  }
  if (maps?.PROVIDER_GOOGLE) {
    PROVIDER_GOOGLE = maps.PROVIDER_GOOGLE;
  }
  if (maps?.Polyline) {
    Polyline = maps.Polyline;
  }

  if (!MapView || !Marker || !PROVIDER_GOOGLE || !Polyline) {
    console.warn('Some react-native-maps components failed to load properly');
  }
} catch (error) {
  console.warn(
    'Failed to load react-native-maps:',
    error instanceof Error ? error.message : 'Unknown error'
  );
}

// Constants for map configuration
const INITIAL_REGION = {
  latitude: 26.0,
  longitude: 85.0,
  latitudeDelta: 10.0,
  longitudeDelta: 20.0,
};

const ROUTE_COORDINATES = [
  { latitude: 24.817, longitude: 93.9368 }, // Imphal
  { latitude: 26.1445, longitude: 91.7362 }, // Guwahati
  { latitude: 26.8467, longitude: 80.9462 }, // Lucknow
  { latitude: 28.7041, longitude: 77.1025 }, // Delhi
];

const MAP_STYLES = {
  container: { flex: 1 },
  mapContainer: {
    height: 250,
    borderRadius: '$3',
    overflow: 'hidden',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
  },
};

interface LiveMapProps {
  origin: string;
  destination: string;
  currentLocation: string;
}

export function LiveMap({ origin, destination, currentLocation }: LiveMapProps) {
  const palette = useColors();
  const [isMapReady, setIsMapReady] = React.useState(false);

  const rnStyles = StyleSheet.create({
    hidden: { display: 'none' },
  });

  const MapSection: React.FC<{
    MapView: React.ComponentType<any>;
    Marker: React.ComponentType<any>;
    Polyline: React.ComponentType<any>;
  }> = ({ MapView, Marker, Polyline }) => (
    <>
      {!isMapReady && (
        <YStack {...MAP_STYLES.loadingContainer}>
          <LoadingSpinner size='lg' />
          <Text fontSize={font.caption} color={palette.textSecondary} marginTop='$2'>
            Loading map...
          </Text>
        </YStack>
      )}
      <MapView
        style={[MAP_STYLES.container, !isMapReady ? rnStyles.hidden : undefined]}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        onMapReady={() => setIsMapReady(true)}
      >
        <Polyline coordinates={ROUTE_COORDINATES} strokeColor={palette.primary} strokeWidth={3} />

        <Marker coordinate={ROUTE_COORDINATES[0]} title='Origin' description={origin}>
          <MarkerIconCircle size={20} color={palette.success} iconName='business' iconSize={10} />
        </Marker>

        <Marker
          coordinate={ROUTE_COORDINATES[1]}
          title='Current Location'
          description={currentLocation}
        >
          <Stack position='relative'>
            <LiveTrackingPulse />
            <MarkerIconCircle size={16} color={palette.primary} iconName='car' iconSize={8} />
          </Stack>
        </Marker>

        <Marker coordinate={ROUTE_COORDINATES[3]} title='Destination' description={destination}>
          <MarkerIconCircle size={20} color={palette.warning} iconName='flag' iconSize={10} />
        </Marker>
      </MapView>
    </>
  );

  return (
    <ElevatedCard variant='elevated'>
      <YStack space='$3'>
        <XStack alignItems='center' justifyContent='space-between'>
          <XStack alignItems='center' space='$3'>
            <Stack position='relative'>
              <LiveTrackingPulse />
              <IconCircle
                size={40}
                backgroundColor={palette.primary}
                borderWidth={2}
                borderColor='white'
                iconName='location'
                iconSize={20}
              />
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

          <Text
            fontSize={font.caption}
            color={palette.success}
            fontWeight='600'
            textTransform='uppercase'
          >
            LIVE
          </Text>
        </XStack>

        <Stack {...MAP_STYLES.mapContainer} backgroundColor={palette.surfaceVariant}>
          {MapView && Marker && Polyline ? (
            <MapSection
              MapView={MapView as React.ComponentType<any>}
              Marker={Marker as React.ComponentType<any>}
              Polyline={Polyline as React.ComponentType<any>}
            />
          ) : (
            // Fallback for web - show route info
            <YStack flex={1} alignItems='center' justifyContent='center' space='$3'>
              <IconCircle
                size={80}
                backgroundColor={withAlpha(palette.primary, 0.1)}
                iconName='navigate'
                iconSize={40}
                iconColor={palette.primary}
                testID='fallback-icon'
              />
              <Text
                fontSize={16}
                fontWeight={'600'}
                color={palette.text}
                accessibilityRole='header'
              >
                Live Route Tracking
              </Text>
              <Text
                fontSize={12}
                color={palette.textSecondary}
                textAlign='center'
                accessibilityRole='text'
              >
                Interactive map available on mobile app
              </Text>

              <YStack width='100%' maxWidth={280} space='$3'>
                <XStack alignItems='center' justifyContent='space-between'>
                  <MarkerIconCircle
                    size={32}
                    color={palette.success}
                    iconName='business'
                    iconSize={16}
                  />
                  <Stack
                    flex={1}
                    marginHorizontal='$3'
                    height={4}
                    backgroundColor={palette.primary}
                    borderRadius={2}
                  />
                  <Stack position='relative'>
                    <LiveTrackingPulse />
                    <MarkerIconCircle
                      size={24}
                      color={palette.primary}
                      iconName='car'
                      iconSize={12}
                    />
                  </Stack>
                  <Stack
                    flex={1}
                    marginHorizontal='$3'
                    height={4}
                    backgroundColor={palette.surfaceVariant}
                    borderRadius={2}
                  />
                  <MarkerIconCircle
                    size={32}
                    color={palette.warning}
                    iconName='flag'
                    iconSize={16}
                  />
                </XStack>

                <XStack alignItems='center' justifyContent='space-between'>
                  <Text fontSize={10} color={palette.textSecondary} accessibilityRole='text'>
                    Origin
                  </Text>
                  <Text
                    fontSize={10}
                    color={palette.primary}
                    fontWeight='600'
                    accessibilityRole='text'
                  >
                    Current
                  </Text>
                  <Text fontSize={10} color={palette.textSecondary} accessibilityRole='text'>
                    Destination
                  </Text>
                </XStack>
              </YStack>
            </YStack>
          )}
        </Stack>
      </YStack>
    </ElevatedCard>
  );
}
