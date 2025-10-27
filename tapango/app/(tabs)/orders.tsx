import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useColors } from '../../src/styles/ThemeProvider';
import { formatINR } from '../../src/utils/currency';

// Minimal redesign of Orders screen:
// - No overlapping layers
// - Simple header, filters, and list
// - Plain RN views for robust layout across devices

type Order = {
  id: string;
  route: string;
  status: 'Active' | 'Past';
  price: number;
  updatedAt: string;
};

const MOCK_ORDERS: Order[] = [
  {
    id: 'TPG2024001',
    route: 'Imphal → New Delhi',
    status: 'Active',
    price: 15500,
    updatedAt: '2025-01-12T14:30:00Z',
  },
  {
    id: 'TPG2024002',
    route: 'New Delhi → Imphal',
    status: 'Past',
    price: 12800,
    updatedAt: '2025-01-10T09:15:00Z',
  },
  {
    id: 'TPG2024003',
    route: 'Imphal → New Delhi',
    status: 'Active',
    price: 18900,
    updatedAt: '2025-01-11T16:45:00Z',
  },
];

export default function OrdersScreen() {
  const colors = useColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const params = useLocalSearchParams();
  const initialSegment = (params.segment === 'Past' ? 'Past' : 'Active') as 'Active' | 'Past';
  const [segment, setSegment] = useState<'Active' | 'Past'>(initialSegment);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');

  const data = MOCK_ORDERS.filter((o) => o.status === segment)
    .filter((o) =>
      query ? `${o.id} ${o.route}`.toLowerCase().includes(query.toLowerCase()) : true
    )
    .sort((a, b) =>
      sortBy === 'amount'
        ? b.price - a.price
        : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

  const Segment = () => (
    <View style={styles.segment}>
      {(['Active', 'Past'] as const).map((label) => (
        <TouchableOpacity
          key={label}
          onPress={() => setSegment(label)}
          style={[styles.segBtn, segment === label && styles.segBtnActive]}
        >
          <Text style={[styles.segLabel, segment === label && styles.segLabelActive]}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const Filters = () => (
    <View style={styles.searchCard}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder='Search orders or routes'
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
      />
    </View>
  );

  const OrderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity
      style={styles.orderRow}
      activeOpacity={0.7}
      onPress={() => router.push(`/(tabs)/tracking?id=${item.id}` as any)}
    >
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text style={styles.orderId} numberOfLines={1}>
          {item.id}
        </Text>
        <Text style={styles.orderRoute} numberOfLines={1}>
          {item.route}
        </Text>
        <Text style={styles.orderDate}>{new Date(item.updatedAt).toLocaleString()}</Text>
      </View>
      <View style={{ alignItems: 'flex-end', marginLeft: 8 }}>
        <Text style={styles.amount}>{formatINR(item.price)}</Text>
        <Text style={styles.viewText}>View →</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>Orders</Text>
        <Text style={styles.subtitle}>All shipments between Imphal and New Delhi</Text>
      </View>
      <Segment />
      <Filters />
      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        renderItem={OrderItem}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        ListEmptyComponent={
          <Text style={{ color: colors.textSecondary, textAlign: 'center', marginTop: 24 }}>
            No {segment.toLowerCase()} orders
          </Text>
        }
      />
    </SafeAreaView>
  );
}

function makeStyles(colors: any) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { paddingHorizontal: 16, paddingTop: 12 },
    title: { fontSize: 24, fontWeight: '800', color: colors.text },
    subtitle: { color: colors.textSecondary, marginTop: 4 },
    segment: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      margin: 16,
      padding: 4,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    segBtn: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 8 },
    segBtnActive: { backgroundColor: colors.primary + '22' },
    segLabel: { color: colors.textSecondary, fontWeight: '600' },
    segLabelActive: { color: colors.primary, fontWeight: '800' },
    searchCard: {
      backgroundColor: colors.surface,
      marginHorizontal: 16,
      marginBottom: 8,
      borderRadius: 10,
      padding: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 8,
      color: colors.text,
      fontSize: 14,
    },
    orderRow: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      marginHorizontal: 16,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
    },
    orderId: { fontSize: 14, fontWeight: '800', color: colors.text },
    orderRoute: { color: colors.textSecondary, marginTop: 2, fontSize: 13 },
    orderDate: { color: colors.textSecondary, marginTop: 2, fontSize: 11 },
    amount: { color: colors.primary, fontWeight: '800', fontSize: 14 },
    viewText: { color: colors.textSecondary, fontSize: 11, marginTop: 4 },
  });
}
