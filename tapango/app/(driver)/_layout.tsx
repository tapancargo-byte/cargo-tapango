import React from 'react';
import { Tabs } from 'expo-router';
import { AppIcon } from '../../src/ui';

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
      <Tabs.Screen
        name='index'
        options={{
          title: 'Jobs',
          tabBarIcon: ({ color, size }) => <AppIcon name='briefcase' color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name='bid'
        options={{
          title: 'Bid',
          tabBarIcon: ({ color, size }) => <AppIcon name='pricetag' color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name='wallet'
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color, size }) => <AppIcon name='wallet' color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <AppIcon name='person' color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name='kyc'
        options={{
          title: 'KYC',
          tabBarIcon: ({ color, size }) => <AppIcon name='id-card' color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
