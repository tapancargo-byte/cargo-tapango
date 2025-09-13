import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './supabaseClient';

const QUEUE_KEY = 'driver_offers_queue_v1';

export type DriverOffer = {
  trackingId: string;
  amountINR: number;
  note?: string;
  createdAt?: string;
};

export async function submitDriverOffer(offer: DriverOffer): Promise<{ queued: boolean; id?: string }> {
  // If Supabase configured, try to insert
  if (supabase) {
    try {
      const { data, error } = await supabase.from('driver_offers').insert({
        tracking_id: offer.trackingId,
        amount_inr: offer.amountINR,
        note: offer.note ?? null,
      }).select().single();
      if (!error) return { queued: false, id: data?.id };
    } catch {}
  }
  // Fallback to local queue
  try {
    const raw = await AsyncStorage.getItem(QUEUE_KEY);
    const list: DriverOffer[] = raw ? JSON.parse(raw) : [];
    list.push({ ...offer, createdAt: new Date().toISOString() });
await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(list));
    try { (await import('../stores/queueStore')).useQueueStore.getState().setOffers(list.length); } catch {}
  } catch {}
  return { queued: true };
}

export async function drainDriverOffers(): Promise<number> {
  if (!supabase) return 0;
  try {
    const raw = await AsyncStorage.getItem(QUEUE_KEY);
    const list: DriverOffer[] = raw ? JSON.parse(raw) : [];
    if (list.length === 0) return 0;
    const rows = list.map(o => ({ tracking_id: o.trackingId, amount_inr: o.amountINR, note: o.note ?? null }));
    const { error } = await supabase.from('driver_offers').insert(rows);
if (!error) {
      await AsyncStorage.removeItem(QUEUE_KEY);
      try { (await import('../stores/queueStore')).useQueueStore.getState().setOffers(0); } catch {}
      return rows.length;
    }
  } catch {}
  return 0;
}
