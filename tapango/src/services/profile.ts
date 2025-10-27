import { supabase } from './supabaseClient';

export type Profile = {
  id: string;
  email: string;
  name: string | null;
  full_name?: string | null;
};

// Fetch a profile by email. Returns null if not found or on error.
export async function getProfileByEmail(
  email: string
): Promise<Profile | null> {
  if (!supabase) return null;
  // Prefer RPC to avoid RLS issues and return only first name if needed
  try {
    const { data: rpcData, error: rpcError } = await (supabase as any).rpc(
      'get_first_name_by_email',
      {
        p_email: email,
      }
    );
    if (!rpcError && rpcData) {
      // Construct a minimal profile from RPC
      return {
        id: 'rpc',
        email,
        name: rpcData as string,
        full_name: rpcData as string,
      } as Profile;
    }
  } catch {}
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, name, full_name')
      .eq('email', email)
      .limit(1)
      .maybeSingle();
    if (error) return null;
    return (data as Profile) ?? null;
  } catch {
    return null;
  }
}

export async function getOrCreateFirstName(
  email: string,
  fallback?: string
): Promise<string | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await (supabase as any).rpc(
      'get_or_create_first_name',
      {
        p_email: email,
        p_fallback: fallback ?? null,
      }
    );
    if (error) return null;
    return (data as string) ?? null;
  } catch {
    return null;
  }
}

export async function ensureProfileByEmail(
  email: string,
  name?: string
): Promise<Profile | null> {
  // Keep legacy path as fallback when needed
  const first = await getOrCreateFirstName(email, name);
  if (first) {
    return { id: 'rpc', email, name: first, full_name: first } as Profile;
  }
  if (!supabase) return null;
  const existing = await getProfileByEmail(email);
  if (existing) return existing;
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert({ email, name: name ?? null })
      .select('id, email, name, full_name')
      .single();
    if (error) return null;
    return (data as Profile) ?? null;
  } catch {
    return null;
  }
}

export function firstNameFromProfile(p?: Profile | null): string | null {
  const n = p?.name || p?.full_name || null;
  if (!n) return null;
  const parts = String(n).trim().split(/\s+/);
  return parts[0] || null;
}

export async function upsertProfileNameByEmail(
  email: string,
  fullName: string
): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('profiles')
      .upsert({ email, name: fullName }, { onConflict: 'email' });
    return !error;
  } catch {
    return false;
  }
}
