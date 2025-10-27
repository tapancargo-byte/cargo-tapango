import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { YStack } from 'tamagui';
import { useColors } from '../styles/ThemeProvider';
import { Circle } from '../ui';
import { AppIcon } from '../ui';

// Type definitions for react-native-maps
interface MapViewProps {
  style?: any;
  initialRegion?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  provider?: any;
  children?: React.ReactNode;
  liteMode?: boolean;
  scrollEnabled?: boolean;
  zoomEnabled?: boolean;
  pitchEnabled?: boolean;
  rotateEnabled?: boolean;
}

interface MarkerProps {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

interface PolylineProps {
  coordinates: {
    latitude: number;
    longitude: number;
  }[];
  strokeColor?: string;
  strokeWidth?: number;
}

// Dynamic import function for react-native-maps
const loadMapComponents = async () => {
  try {
    if (Platform.OS === 'web') {
      // Return null for web to avoid bundling issues
      return {
        MapView: null,
        Marker: null,
        Polyline: null,
        PROVIDER_GOOGLE: null,
      };
    }

    // Dynamic import for native platforms
    const mapModule = await import('react-native-maps');
    return {
      MapView: mapModule.default,
      Marker: mapModule.Marker,
      Polyline: mapModule.Polyline,
      PROVIDER_GOOGLE: mapModule.PROVIDER_GOOGLE,
    };
  } catch (error) {
    console.warn('Failed to load react-native-maps:', error);
    return {
      MapView: null,
      Marker: null,
      Polyline: null,
      PROVIDER_GOOGLE: null,
    };
  }
};

// Map loading state
interface MapState {
  MapView: React.ComponentType<MapViewProps> | null;
  Marker: React.ComponentType<MarkerProps> | null;
  Polyline: React.ComponentType<PolylineProps> | null;
  PROVIDER_GOOGLE: any;
  isLoading: boolean;
  error: string | null;
}

// Context for map components
const MapContext = React.createContext<MapState>({
  MapView: null,
  Marker: null,
  Polyline: null,
  PROVIDER_GOOGLE: null,
  isLoading: true,
  error: null,
});

// Map provider component
export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mapState, setMapState] = React.useState<MapState>({
    MapView: null,
    Marker: null,
    Polyline: null,
    PROVIDER_GOOGLE: null,
    isLoading: true,
    error: null,
  });

  React.useEffect(() => {
    loadMapComponents()
      .then((components) => {
        setMapState({
          ...components,
          isLoading: false,
          error: null,
        });
      })
      .catch((error) => {
        setMapState({
          MapView: null,
          Marker: null,
          Polyline: null,
          PROVIDER_GOOGLE: null,
          isLoading: false,
          error: error.message,
        });
      });
  }, []);

  return <MapContext.Provider value={mapState}>{children}</MapContext.Provider>;
};

// Hook to access map components
export const useMapComponents = () => {
  const context = React.useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMapComponents must be used within a MapProvider');
  }
  return context;
};

// Fallback component for when maps are not available
const MapFallback: React.FC<{
  height?: number;
  title?: string;
  subtitle?: string;
}> = ({
  height = 200,
  title = 'Map View',
  subtitle = 'Interactive map available on mobile app',
}) => {
  const colors = useColors();

  return (
    <View style={[styles.fallbackContainer, { height, backgroundColor: colors.surfaceVariant }]}>
      <YStack alignItems='center' justifyContent='center' space='$3' padding='$4'>
        <Circle size={64} backgroundColor={`${colors.primary}20`}>
          <AppIcon name='map' size={32} color={colors.primary} />
        </Circle>
        <YStack alignItems='center' space='$2'>
          <Text style={[styles.fallbackTitle, { color: colors.text }]}>{title}</Text>
          <Text style={[styles.fallbackSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
        </YStack>
      </YStack>
    </View>
  );
};

// Wrapper component for MapView
export const MapView: React.FC<
  MapViewProps & {
    fallbackTitle?: string;
    fallbackSubtitle?: string;
  }
> = ({ fallbackTitle, fallbackSubtitle, style, ...props }) => {
  const { MapView: NativeMapView, isLoading, error } = useMapComponents();

  if (isLoading) {
    return <MapFallback height={style?.height || 200} title='Loading Map...' />;
  }

  if (error || !NativeMapView) {
    return (
      <MapFallback
        height={(style?.height as number) || 200}
        title={fallbackTitle ?? 'Map View'}
        subtitle={fallbackSubtitle ?? 'Interactive map available on mobile app'}
      />
    );
  }

  return <NativeMapView style={style} {...props} />;
};

// Wrapper component for Marker
export const Marker: React.FC<MarkerProps> = (props) => {
  const { Marker: NativeMarker } = useMapComponents();

  if (!NativeMarker) {
    return null;
  }

  return <NativeMarker {...props} />;
};

// Wrapper component for Polyline
export const Polyline: React.FC<PolylineProps> = (props) => {
  const { Polyline: NativePolyline } = useMapComponents();

  if (!NativePolyline) {
    return null;
  }

  return <NativePolyline {...props} />;
};

// Export PROVIDER_GOOGLE constant
export const PROVIDER_GOOGLE = 'google';

// Styles
const styles = StyleSheet.create({
  fallbackContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  fallbackTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  fallbackSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

// Export map components with proper bundling
// Consumers can import MapProvider and useMapComponents directly from this module
export default MapView;
