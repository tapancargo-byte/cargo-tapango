import React from 'react';
import { Platform } from 'react-native';
import { YStack, XStack, Text } from 'tamagui';
import { useColors } from '../styles/ThemeProvider';
import { Button } from './tg/Button';
import { AppIcon } from './AppIcon';
import { font } from './tokens';

// Platform-specific map imports - temporarily disabled for web compatibility
let MapView: any = null;
let Marker: any = null;
let PROVIDER_GOOGLE: any = null;

// TODO: Re-enable maps with proper web bundling exclusion
// Maps functionality temporarily disabled to fix web build
// if (Platform.OS !== 'web') {
//   try {
//     const maps = require('react-native-maps');
//     MapView = maps.default;
//     Marker = maps.Marker;
//     PROVIDER_GOOGLE = maps.PROVIDER_GOOGLE;
//   } catch (e) {
//     console.warn('Failed to load react-native-maps:', e);
//   }
// }

export interface MapCardProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  region: { latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number };
  markers?: { id: string; latitude: number; longitude: number; title?: string }[];
}

export const MapCard: React.FC<MapCardProps> = ({ title, subtitle, onPress, region, markers }) => {
  const colors = useColors();
  return (
    <YStack
      borderRadius='$4'
      overflow='hidden'
      borderWidth={1}
      borderColor={colors.border}
      backgroundColor={colors.surface}
    >
      <YStack height={200} backgroundColor={colors.surfaceVariant}>
        {MapView ? (
          <MapView
            style={{ flex: 1 }}
            initialRegion={region}
            provider={PROVIDER_GOOGLE}
            liteMode
            scrollEnabled={false}
            zoomEnabled={false}
            pitchEnabled={false}
            rotateEnabled={false}
          >
            {(markers || []).map((m) => (
              <Marker
                key={m.id}
                coordinate={{ latitude: m.latitude, longitude: m.longitude }}
                title={m.title || ''}
              />
            ))}
          </MapView>
        ) : (
          // Web fallback
          <YStack flex={1} alignItems='center' justifyContent='center' space='$2'>
            <AppIcon name='map' size={32} color={colors.textSecondary} />
            <Text fontSize={14} color={colors.textSecondary}>
              Map view available on mobile app
            </Text>
          </YStack>
        )}
      </YStack>
      <XStack
        alignItems='center'
        justifyContent='space-between'
        padding='$3'
        borderTopWidth={1}
        borderColor={colors.border}
      >
        <YStack>
          <Text color={colors.textSecondary} fontSize={font.caption}>
            {subtitle || 'Live Tracking'}
          </Text>
          <Text fontSize={font.section} fontWeight='700'>
            {title}
          </Text>
        </YStack>
        {onPress ? (
          <Button
            variant='secondary'
            size='sm'
            onPress={onPress}
            accessibilityLabel='Open tracking'
          >
            <AppIcon name='open-outline' size={16} color={colors.textSecondary} />
          </Button>
        ) : null}
      </XStack>
    </YStack>
  );
};
