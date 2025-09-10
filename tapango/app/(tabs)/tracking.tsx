import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '../../src/components/ui/Input';
import { Button } from '../../src/components/ui/Button';
import { StatusBadge, StatusVariant } from '../../src/components/ui/StatusBadge';

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
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock shipment data
  const mockShipment: Shipment = {
    id: '1',
    trackingNumber: 'TPG123456789',
    origin: 'New York, NY',
    destination: 'Los Angeles, CA',
    status: 'in-transit',
    estimatedDelivery: '2024-01-15T14:00:00Z',
    currentLocation: 'Phoenix, AZ',
    cargoType: 'Electronics',
    weight: '15.5 kg',
    events: [
      {
        id: '1',
        timestamp: '2024-01-10T09:30:00Z',
        location: 'New York, NY',
        description: 'Package picked up from sender',
        status: 'confirmed',
      },
      {
        id: '2',
        timestamp: '2024-01-10T15:45:00Z',
        location: 'New York, NY',
        description: 'Package processed at sorting facility',
        status: 'confirmed',
      },
      {
        id: '3',
        timestamp: '2024-01-11T08:20:00Z',
        location: 'Chicago, IL',
        description: 'In transit to next hub',
        status: 'in-transit',
      },
      {
        id: '4',
        timestamp: '2024-01-12T14:10:00Z',
        location: 'Phoenix, AZ',
        description: 'Package arrived at Phoenix distribution center',
        status: 'in-transit',
      },
    ],
  };

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (trackingNumber === 'TPG123456789') {
        setShipment(mockShipment);
      } else {
        setError('Tracking number not found. Please check and try again.');
        setShipment(null);
      }
    } catch (error) {
      setError('Failed to fetch tracking information. Please try again.');
      setShipment(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!shipment) return;
    
    setRefreshing(true);
    // TODO: Refresh shipment data
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const formatDateTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getProgressPercentage = (status: StatusVariant): number => {
    switch (status) {
      case 'pending': return 10;
      case 'confirmed': return 25;
      case 'in-transit': return 60;
      case 'delivered': return 100;
      case 'cancelled': return 0;
      case 'delayed': return 40;
      default: return 0;
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.searchSection}>
        <Text style={styles.title}>Track Your Shipment</Text>
        <Text style={styles.subtitle}>
          Enter your tracking number to get real-time updates
        </Text>

        <View style={styles.searchContainer}>
          <Input
            label="Tracking Number"
            value={trackingNumber}
            onChangeText={setTrackingNumber}
            placeholder="Enter tracking number (e.g., TPG123456789)"
            error={error ?? undefined}
          />

          <Button
            title={isLoading ? "Tracking..." : "Track Package"}
            variant="primary"
            onPress={handleTrack}
            fullWidth
            disabled={isLoading}
          />
        </View>
      </View>

      {shipment && (
        <View style={styles.trackingResults}>
          <View style={styles.shipmentHeader}>
            <View style={styles.shipmentInfo}>
              <Text style={styles.trackingNumberText}>
                {shipment.trackingNumber}
              </Text>
              <StatusBadge status={shipment.status} size="large" />
            </View>
            
            <TouchableOpacity 
              style={styles.refreshButton}
              onPress={handleRefresh}
            >
              <Ionicons name="refresh" size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.routeCard}>
            <View style={styles.routeHeader}>
              <Text style={styles.routeTitle}>Route Information</Text>
            </View>
            
            <View style={styles.routeDetails}>
              <View style={styles.routePoint}>
                <Ionicons name="location" size={16} color="#10B981" />
                <View>
                  <Text style={styles.routeLabel}>From</Text>
                  <Text style={styles.routeLocation}>{shipment.origin}</Text>
                </View>
              </View>
              
              <View style={styles.routeDivider}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${getProgressPercentage(shipment.status)}%` }
                    ]} 
                  />
                </View>
              </View>
              
              <View style={styles.routePoint}>
                <Ionicons name="location" size={16} color="#EF4444" />
                <View>
                  <Text style={styles.routeLabel}>To</Text>
                  <Text style={styles.routeLocation}>{shipment.destination}</Text>
                </View>
              </View>
            </View>

            <View style={styles.shipmentDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Current Location:</Text>
                <Text style={styles.detailValue}>{shipment.currentLocation}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Estimated Delivery:</Text>
                <Text style={styles.detailValue}>
                  {formatDateTime(shipment.estimatedDelivery)}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Cargo Type:</Text>
                <Text style={styles.detailValue}>{shipment.cargoType}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Weight:</Text>
                <Text style={styles.detailValue}>{shipment.weight}</Text>
              </View>
            </View>
          </View>

          <View style={styles.timelineSection}>
            <Text style={styles.timelineTitle}>Tracking Timeline</Text>
            
            <View style={styles.timeline}>
              {shipment.events.map((event, index) => (
                <View key={event.id} style={styles.timelineItem}>
                  <View style={styles.timelineMarker}>
                    <View style={[
                      styles.timelineDot,
                      index === 0 && styles.currentDot
                    ]} />
                    {index < shipment.events.length - 1 && (
                      <View style={styles.timelineLine} />
                    )}
                  </View>
                  
                  <View style={styles.timelineContent}>
                    <View style={styles.timelineHeader}>
                      <Text style={styles.timelineTimestamp}>
                        {formatDateTime(event.timestamp)}
                      </Text>
                      <StatusBadge status={event.status} size="small" />
                    </View>
                    
                    <Text style={styles.timelineLocation}>{event.location}</Text>
                    <Text style={styles.timelineDescription}>
                      {event.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  searchSection: {
    padding: 24,
    backgroundColor: '#007AFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 24,
  },
  searchContainer: {
    gap: 16,
  },
  trackingResults: {
    padding: 24,
  },
  shipmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  shipmentInfo: {
    flex: 1,
  },
  trackingNumberText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  refreshButton: {
    padding: 8,
  },
  routeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  routeHeader: {
    marginBottom: 20,
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
  },
  routeDetails: {
    marginBottom: 20,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  routeLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  routeLocation: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  routeDivider: {
    marginVertical: 16,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  shipmentDetails: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  timelineSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 20,
  },
  timeline: {
    paddingLeft: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineMarker: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D1D5DB',
  },
  currentDot: {
    backgroundColor: '#007AFF',
  },
  timelineLine: {
    width: 2,
    height: 40,
    backgroundColor: '#E5E7EB',
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  timelineTimestamp: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  timelineLocation: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  timelineDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});
