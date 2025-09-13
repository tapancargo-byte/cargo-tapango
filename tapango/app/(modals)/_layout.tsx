import { Stack } from 'expo-router';

/**
 * Modals Layout
 * 
 * Provides stack navigation for modal screens
 */
export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: 'modal',
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="receipt"
        options={{
          title: 'Receipt',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="scan"
        options={{
          title: 'Scan QR Code',
          headerShown: true,
        }}
      />
    </Stack>
  );
}
