import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useColors } from '../styles/ThemeProvider';
import { Input } from '../ui';
import { geocodePlace, PlacePrediction, usePlacesAutocomplete } from '../hooks/usePlacesAutocomplete';
import { addRecentAddress, getRecentAddresses, AddressKind } from '../utils/addressHistory';

export type AddressSelection = {
  formatted: string;
  placeId: string;
  lat?: number;
  lng?: number;
  pin?: string;
  city?: string;
  state?: string;
};

type Props = {
  label: string;
  placeholder?: string;
  onSelect: (sel: AddressSelection) => void;
  initialValue?: string;
  required?: boolean;
  country?: string;
  kind?: AddressKind; // for recents storage
};

export const AddressAutocomplete: React.FC<Props> = ({
  label,
  placeholder,
  onSelect,
  initialValue = '',
  required,
  country = 'IN',
  kind = 'pickup',
}) => {
  const [value, setValue] = useState(initialValue);
  const { predictions, loading } = usePlacesAutocomplete(value, { country, language: 'en-IN', debounceMs: 400 });
  const [recents, setRecents] = useState<AddressSelection[]>([]);

  useEffect(() => {
    getRecentAddresses(kind).then(setRecents);
  }, [kind]);

  const handlePick = async (p: PlacePrediction) => {
    const geo = await geocodePlace(p.place_id);
    const formatted = geo?.formatted || p.description;
    const sel: AddressSelection = {
      formatted,
      placeId: p.place_id,
      ...(typeof geo?.lat === 'number' ? { lat: geo!.lat } : {}),
      ...(typeof geo?.lng === 'number' ? { lng: geo!.lng } : {}),
      ...(geo?.pin ? { pin: geo.pin } : {}),
      ...(geo?.city ? { city: geo.city } : {}),
      ...(geo?.state ? { state: geo.state } : {}),
    };
    setValue(formatted);
    onSelect(sel);
    addRecentAddress(kind, sel).then(() => getRecentAddresses(kind).then(setRecents));
  };

  const palette = useColors();
  return (
    <View style={styles.container}>
      <Input
        label={label}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder ?? 'Start typing address…'}
        required={!!required}
        returnKeyType="search"
      />
      {loading && (
        <View style={styles.loadingRow}>
          <ActivityIndicator size="small" color={palette.primary} />
          <Text style={[styles.loadingText, { color: palette.textSecondary }]}>Searching…</Text>
        </View>
      )}
      {!value && recents.length > 0 && (
        <View style={styles.recentsWrap}>
          <Text style={[styles.recentsTitle, { color: palette.textSecondary }]}>Recent</Text>
          <View style={styles.chipsRow}>
            {recents.map((r) => (
              <TouchableOpacity key={r.formatted} style={[styles.chip, { backgroundColor: palette.surfaceVariant }]} onPress={() => {
                setValue(r.formatted);
                onSelect(r);
              }} accessibilityRole="button">
                <Text style={[styles.chipText, { color: palette.text }]} numberOfLines={1}>{r.formatted}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {predictions.length > 0 && (
        <View style={[styles.listContainer, { borderColor: palette.border, backgroundColor: palette.surface }]}>
          <FlatList
            data={predictions}
            keyExtractor={(item) => item.place_id}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.item, { borderBottomColor: palette.surfaceVariant }]} onPress={() => handlePick(item)} accessibilityRole="button" accessibilityHint="Select this address">
                <Text style={[styles.itemMain, { color: palette.text }]}>{item.structured_formatting?.main_text ?? item.description}</Text>
                <Text style={[styles.itemSecondary, { color: palette.textSecondary }]}>{item.structured_formatting?.secondary_text ?? ''}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  loadingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 4, paddingBottom: 8 },
  loadingText: { color: '#6b7280', fontSize: 14 },
  recentsWrap: { paddingVertical: 4 },
  recentsTitle: { fontSize: 12, color: '#6b7280', marginBottom: 4, paddingHorizontal: 4 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#F3F4F6', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 8, maxWidth: '100%' },
  chipText: { color: '#374151', fontSize: 12, maxWidth: 240 },
  listContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  item: { padding: 12, minHeight: 44, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  itemMain: { fontSize: 16, fontWeight: '600', color: '#111827' },
  itemSecondary: { fontSize: 12, color: '#6b7280', marginTop: 2 },
});
