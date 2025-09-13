import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type TimelineItem = {
  id: string;
  timestamp: string; // ISO
  location: string;
  description: string;
  status: 'pending' | 'confirmed' | 'in-transit' | 'delivered' | 'delayed' | 'cancelled';
};

export const StatusTimeline: React.FC<{ items: TimelineItem[] }> = ({ items }) => {
  return (
    <View style={styles.timeline}>
      {items.map((event, index) => (
        <View key={event.id} style={styles.item} accessibilityRole="text" accessibilityLabel={`${event.description} at ${event.location}`}> 
          <View style={styles.markerWrap}>
            <View style={[styles.dot, index === 0 && styles.dotCurrent]} />
            {index < items.length - 1 && <View style={styles.vertical} />}
          </View>
          <View style={styles.content}>
            <View style={styles.headerRow}>
              <Text style={styles.time}>{formatTime(event.timestamp)}</Text>
              <Text style={[styles.status, statusColor(event.status)]}>{event.status}</Text>
            </View>
            <Text style={styles.location}>{event.location}</Text>
            <Text style={styles.desc}>{event.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function statusColor(status: TimelineItem['status']) {
  switch (status) {
    case 'confirmed': return { color: '#059669' };
    case 'in-transit': return { color: '#2563EB' };
    case 'delivered': return { color: '#1D4ED8' };
    case 'delayed': return { color: '#D97706' };
    case 'cancelled': return { color: '#DC2626' };
    default: return { color: '#6B7280' };
  }
}

const styles = StyleSheet.create({
  timeline: { marginTop: 8 },
  item: { flexDirection: 'row', marginBottom: 12 },
  markerWrap: { alignItems: 'center', width: 18 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#9CA3AF', marginTop: 2 },
  dotCurrent: { backgroundColor: '#2563EB' },
  vertical: { width: 2, flex: 1, backgroundColor: '#E5E7EB', marginTop: 2, marginBottom: -2 },
  content: { flex: 1, marginLeft: 6 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between' },
  time: { color: '#6B7280', fontSize: 12 },
  status: { fontSize: 12, fontWeight: '700' },
  location: { fontWeight: '700', color: '#111827', marginTop: 2 },
  desc: { color: '#374151', marginTop: 2 },
});
