import { supabase } from './supabaseClient';
import { QuotePayload, QuoteResponse } from './quote';

export async function supaQuote(payload: QuotePayload): Promise<QuoteResponse | null> {
  if (!supabase) return null;
  try {
    // Prefer an RPC if available
    // @ts-ignore - RPC may not exist in every project
    const { data, error } = await (supabase as any).rpc('get_quote', {
      p_pickup: payload.pickup,
      p_delivery: payload.delivery,
      p_weightkg: payload.weightKg,
      p_dims: payload.dimsCm,
      p_cargotype: payload.cargoType ?? null,
    });
    if (error) return null;
    if (data) return data as QuoteResponse;
  } catch {}
  return null;
}

export type TrackingEvent = { id: string; timestamp: string; location: string; description: string; status: string };
export async function supaTracking(trackingId: string): Promise<TrackingEvent[] | null> {
  if (!supabase) return null;
  try {
    // Prefer secure RPC if available (works with tightened RLS)
    // @ts-ignore rpc may not exist yet in some environments
    const rpc = await (supabase as any).rpc('get_tracking_events_public', { p_tracking_id: trackingId });
    if (!rpc.error && rpc.data) {
      return (rpc.data ?? []) as TrackingEvent[];
    }
  } catch {}
  try {
    const { data, error } = await supabase
      .from('tracking_events')
      .select('*')
      .eq('tracking_id', trackingId)
      .order('timestamp', { ascending: false });
    if (error) return null;
    return (data ?? []) as TrackingEvent[];
  } catch {
    return null;
  }
}

export type OrderRow = { id: string; route: string; price: number; updated_at: string; status: 'Active'|'Past' };
export async function supaOrders(userId?: string): Promise<OrderRow[] | null> {
  if (!supabase) return null;
  try {
    let q = supabase.from('orders').select('id, route, price, updated_at, status');
    if (userId) q = q.eq('user_id', userId);
    const { data, error } = await q.order('updated_at', { ascending: false });
    if (error) return null;
    return (data ?? []) as OrderRow[];
  } catch {
    return null;
  }
}
