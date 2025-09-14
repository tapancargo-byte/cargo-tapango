import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'pending_bookings_v1';

export type PendingBooking = {
  payload: any;
  queuedAt: number;
};

export async function enqueueBooking(payload: any) {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    const list: PendingBooking[] = raw ? JSON.parse(raw) : [];
    list.push({ payload, queuedAt: Date.now() });
    await AsyncStorage.setItem(KEY, JSON.stringify(list));
    try {
      (await import('../stores/queueStore')).useQueueStore
        .getState()
        .setBookings(list.length);
    } catch {}
  } catch {}
}

export async function loadPendingBookings(): Promise<PendingBooking[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PendingBooking[]) : [];
  } catch {
    return [];
  }
}

export async function clearPendingBookings() {
  try {
    await AsyncStorage.removeItem(KEY);
    try {
      (await import('../stores/queueStore')).useQueueStore
        .getState()
        .setBookings(0);
    } catch {}
  } catch {}
}

export async function drainPendingBookings(
  onDrain?: (count: number) => Promise<void> | void
) {
  const list = await loadPendingBookings();
  if (list.length === 0) {
    return;
  }
  // Simulate sending to server (replace with real API later)
  await new Promise((r) => setTimeout(r, 500));
  await clearPendingBookings();
  try {
    await onDrain?.(list.length);
  } catch {}
  try {
    (await import('../stores/queueStore')).useQueueStore
      .getState()
      .setBookings(0);
  } catch {}
}
