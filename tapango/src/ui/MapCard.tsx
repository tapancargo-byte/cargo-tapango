import React from 'react'
import { YStack, XStack, Text } from 'tamagui'
import MapView, { Marker, PROVIDER_GOOGLE, MapViewProps } from 'react-native-maps'
import { useColors } from '../styles/ThemeProvider'
import { Button } from './tg/Button'
import { Ionicons } from '@expo/vector-icons'
import { font } from './tokens'

export interface MapCardProps {
  title: string
  subtitle?: string
  onPress?: () => void
  region: { latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number }
  markers?: { id: string; latitude: number; longitude: number; title?: string }[]
}

export const MapCard: React.FC<MapCardProps> = ({ title, subtitle, onPress, region, markers }) => {
  const colors = useColors()
  return (
    <YStack borderRadius="$4" overflow="hidden" borderWidth={1} borderColor={colors.border} backgroundColor={colors.surface}>
      <YStack height={200}>
        <MapView style={{ flex: 1 }} initialRegion={region} provider={PROVIDER_GOOGLE} liteMode scrollEnabled={false} zoomEnabled={false} pitchEnabled={false} rotateEnabled={false}>
          {(markers || []).map(m => (
            <Marker key={m.id} coordinate={{ latitude: m.latitude, longitude: m.longitude }} title={m.title || ''} />
          ))}
        </MapView>
      </YStack>
      <XStack alignItems="center" justifyContent="space-between" padding="$3" borderTopWidth={1} borderColor={colors.border}>
        <YStack>
          <Text color={colors.textSecondary} fontSize={font.caption}>{subtitle || 'Live Tracking'}</Text>
          <Text fontSize={font.section} fontWeight="700">{title}</Text>
        </YStack>
        {onPress ? (
          <Button variant="secondary" size="sm" onPress={onPress} accessibilityLabel="Open tracking">
            <Ionicons name="open-outline" size={16} color={colors.textSecondary} />
          </Button>
        ) : null}
      </XStack>
    </YStack>
  )
}

