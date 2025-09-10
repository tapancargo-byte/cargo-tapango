import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from '../../src/components/ui/Button';
import { router } from 'expo-router';

/**
 * Main Dashboard Home Screen
 * 
 * Shows overview of user's activity and quick actions
 */
export default function DashboardScreen() {
  const handleNewOrder = () => {
    console.log('New order pressed');
    router.push('/(tabs)/booking');
  };

  const handleViewOrders = () => {
    console.log('View orders pressed');
    router.push('/(tabs)/orders');
  };

  const handleTrackShipment = () => {
    console.log('Track shipment pressed');
    router.push('/(tabs)/tracking');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome to TAPANGO</Text>
        <Text style={styles.welcomeSubtitle}>
          Your cargo logistics platform
        </Text>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <View style={styles.actionButtons}>
          <Button
            title="Book New Shipment"
            variant="primary"
            onPress={handleNewOrder}
            fullWidth
          />
          
          <Button
            title="Track Shipment"
            variant="secondary"
            onPress={handleTrackShipment}
            fullWidth
          />
          
          <Button
            title="View My Orders"
            variant="ghost"
            onPress={handleViewOrders}
            fullWidth
          />
        </View>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Quick Stats</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Active Orders</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>$0</Text>
            <Text style={styles.statLabel}>Total Spent</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  welcomeSection: {
    padding: 24,
    backgroundColor: '#007AFF',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  quickActions: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 16,
  },
  actionButtons: {
    gap: 12,
  },
  statsSection: {
    padding: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
  },
});
