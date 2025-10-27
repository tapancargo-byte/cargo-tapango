import { supabase } from './supabaseClient';

export type DriverJob = {
  id: string;
  tracking_id: string;
  origin: string;
  destination: string;
  payout_inr: number;
  distance_km?: number | null;
  eta_minutes?: number | null;
  status: 'available' | 'assigned' | 'active' | 'completed' | 'cancelled';
};

const JOBS_TABLE = process.env.EXPO_PUBLIC_JOBS_TABLE || 'driver_jobs';
const JOBS_RPC = process.env.EXPO_PUBLIC_JOBS_RPC || 'driver_get_jobs';

export async function fetchDriverJobs(): Promise<DriverJob[] | null> {
  if (!supabase) return null;
  // Prefer RPC if available
  try {
    // @ts-ignore RPC may not exist in every environment
    const { data, error } = await (supabase as any).rpc(JOBS_RPC);
    if (!error && data) {
      return (data ?? []) as DriverJob[];
    }
  } catch {}

  try {
    const { data, error } = await supabase
      .from(JOBS_TABLE)
      .select(
        'id, tracking_id, origin, destination, payout_inr, distance_km, eta_minutes, status'
      )
      .order('created_at', { ascending: false });
    if (error) return null;
    return (data ?? []) as DriverJob[];
  } catch {
    return null;
  }
}

export type WalletTxn = {
  id: string;
  title: string;
  amount_inr: number;
  type: 'credit' | 'debit';
  occurred_at: string;
};

const WALLET_TABLE =
  process.env.EXPO_PUBLIC_WALLET_TXNS_TABLE || 'wallet_transactions';
const WALLET_RPC =
  process.env.EXPO_PUBLIC_WALLET_TXNS_RPC || 'driver_get_wallet_txns';

export async function fetchWalletTransactions(
  userId?: string
): Promise<WalletTxn[] | null> {
  if (!supabase) return null;

  // Prefer RPC if available
  try {
    // @ts-ignore RPC may not exist in every environment
    const { data, error } = await (supabase as any).rpc(WALLET_RPC, {
      p_user_id: userId ?? null,
    });
    if (!error && data) {
      return (data ?? []) as WalletTxn[];
    }
  } catch {}

  try {
    let q = supabase
      .from(WALLET_TABLE)
      .select('id, title, amount_inr, type, occurred_at');
    if (userId) q = q.eq('user_id', userId);
    const { data, error } = await q.order('occurred_at', { ascending: false });
    if (error) return null;
    return (data ?? []) as WalletTxn[];
  } catch {
    return null;
  }
}
