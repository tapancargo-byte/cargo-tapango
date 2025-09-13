import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddressSelection } from '../components/AddressAutocomplete';

export type BookingDraft = {
  form: {
    pickupAddress: string;
    deliveryAddress: string;
    cargoType: string;
    weight: string;
    dimensions: string;
    urgency: string;
    specialInstructions: string;
    contactPhone: string;
    pickupDate: string;
    deliveryDate: string;
  };
  pickupSel?: AddressSelection | null;
  deliverySel?: AddressSelection | null;
  savedAt: number;
};

const KEY = 'booking_draft_v1';

export async function saveBookingDraft(draft: BookingDraft) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(draft));
  } catch (e) {
    console.warn('Failed to save draft', e);
  }
}

export async function loadBookingDraft(): Promise<BookingDraft | null> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as BookingDraft) : null;
  } catch (e) {
    console.warn('Failed to load draft', e);
    return null;
  }
}

export async function clearBookingDraft() {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch {}
}
