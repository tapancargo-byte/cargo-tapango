import React from 'react';
import { Tabs } from 'expo-router';
import { useColors } from '../styles/ThemeProvider';

export const getTabOptions = (title: string) => {
  const colors = useColors();
  return {
    title,
    tabBarLabel: title,
    // Additional screen-level options can be provided here if needed
  } as const;
};
