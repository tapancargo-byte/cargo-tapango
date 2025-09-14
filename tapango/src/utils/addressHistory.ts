import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddressSelection } from '../components/AddressAutocomplete';

export type AddressKind = 'pickup' | 'delivery';

const KEYS: Record<AddressKind, string> = {
  pickup: 'recent_pickups',
  delivery: 'recent_deliveries',
};

export async function addRecentAddress(
  kind: AddressKind,
  addr: AddressSelection
) {
  try {
    const key = KEYS[kind];
    const raw = await AsyncStorage.getItem(key);
    const list: AddressSelection[] = raw ? JSON.parse(raw) : [];
    const deduped = [
      addr,
      ...list.filter((x) => x.formatted !== addr.formatted),
    ];
    const top5 = deduped.slice(0, 5);
    await AsyncStorage.setItem(key, JSON.stringify(top5));
  } catch (e) {
    console.warn('Failed to save recent address:', e);
  }
}

export async function getRecentAddresses(
  kind: AddressKind
): Promise<AddressSelection[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS[kind]);
    return raw ? (JSON.parse(raw) as AddressSelection[]) : [];
  } catch (e) {
    console.warn('Failed to load recent addresses:', e);
    return [];
  }
}
