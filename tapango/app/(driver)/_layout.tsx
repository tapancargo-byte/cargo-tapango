import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function DriverTabs() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        headerStyle: { backgroundColor: '#007AFF' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Jobs', tabBarIcon: ({ color, size }) => <Ionicons name="briefcase" color={color} size={size} /> }} />
      <Tabs.Screen name="bid" options={{ title: 'Bid', tabBarIcon: ({ color, size }) => <Ionicons name="pricetag" color={color} size={size} /> }} />
      <Tabs.Screen name="wallet" options={{ title: 'Wallet', tabBarIcon: ({ color, size }) => <Ionicons name="wallet" color={color} size={size} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} /> }} />
      <Tabs.Screen name="kyc" options={{ title: 'KYC', tabBarIcon: ({ color, size }) => <Ionicons name="id-card" color={color} size={size} /> }} />
    </Tabs>
  );
}
