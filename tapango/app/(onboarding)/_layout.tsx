import React from 'react';
import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="onboarding/index" />
      <Stack.Screen name="onboarding/two" />
      <Stack.Screen name="onboarding/three" />
    </Stack>
  );
}

