import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  current: number; // 1..3
  labels?: string[];
};

export const StepIndicator: React.FC<Props> = ({
  current,
  labels = ['Addresses', 'Cargo', 'Review'],
}) => {
  return (
    <View
      style={styles.container}
      accessibilityRole='adjustable'
      accessibilityLabel={`Step ${current} of 3`}
    >
      {labels.map((label, idx) => {
        const step = idx + 1;
        const active = step <= current;
        return (
          <View key={label} style={styles.step}>
            <View style={[styles.circle, active ? styles.circleActive : styles.circleInactive]}>
              <Text style={[styles.circleText, active && styles.circleTextActive]}>{step}</Text>
            </View>
            <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
            {idx < labels.length - 1 && <View style={[styles.line, active && styles.lineActive]} />}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  step: { flexDirection: 'row', alignItems: 'center' },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  circleInactive: { borderColor: '#D1D5DB' },
  circleActive: { borderColor: '#007AFF', backgroundColor: '#E0F2FE' },
  circleText: { fontWeight: '700', color: '#6B7280' },
  circleTextActive: { color: '#0369A1' },
  label: { marginLeft: 6, marginRight: 12, color: '#6B7280', fontSize: 13 },
  labelActive: { color: '#111827' },
  line: { width: 30, height: 2, backgroundColor: '#E5E7EB', marginHorizontal: 8 },
  lineActive: { backgroundColor: '#93C5FD' },
});
