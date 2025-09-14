import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useColors } from '../styles/ThemeProvider';

export const KycProgress: React.FC<{ percent: number }> = ({ percent }) => {
  const colors = useColors();
  const clamped = Math.max(0, Math.min(100, Math.round(percent)));

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.progressContainer}>
        <View style={[styles.barBg, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.barFill,
              {
                width: `${clamped}%`,
                backgroundColor: colors.success,
              },
            ]}
          />
        </View>
        <Text style={[styles.caption, { color: colors.textSecondary }]}>{clamped}% completed</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  progressContainer: {
    gap: 8,
  },
  barBg: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: 8,
    borderRadius: 4,
    // Note: CSS transitions are not supported in React Native
  },
  caption: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
  },
});
